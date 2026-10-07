// motion-carousel renderer.
// node render.mjs <carousel-dir> [--only ig|tt] [--slides id1,id2] [--no-video]
// Reads <carousel-dir>/carousel.json, writes <carousel-dir>/export/...
// Every frame is produced by seeking the pure timeline, so there are no
// dropped or duplicated frames regardless of machine speed.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dir = path.resolve(args[0]);
const opt = (k) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : null; };
const only = opt('--only');
const onlySlides = opt('--slides') ? opt('--slides').split(',') : null;
const noVideo = args.includes('--no-video');
const FPS = 30;

const data = JSON.parse(fs.readFileSync(path.join(dir, 'carousel.json'), 'utf8'));
data.assets = pathToFileURL(path.join(dir, 'assets')).href;
// masks need same-origin images, so the distress texture goes in as a data URI
data.distressURI = 'data:image/png;base64,' + fs.readFileSync(path.join(dir, 'assets/plates/distress.png')).toString('base64');
// real source screenshots (capture_sources.mjs) replace the quote card on single-source slides
for (const sl of data.slides) {
  const shot = path.join(dir, 'assets/sources', `${sl.id}-0.png`);
  if (sl.proof && sl.proof.capture && sl.proof.capture.length === 1 && fs.existsSync(shot)) {
    sl.proof = { kind: 'image', src: pathToFileURL(shot).href, domain: sl.proof.domain, tag: 'Screenshot', foot: sl.proof.foot, quotes: sl.proof.quotes };
  }
}
const exp = path.join(dir, 'export');

function ffmpeg(out, W, H) {
  const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-vsync', 'cfr',
    '-movflags', '+faststart', '-s', `${W}x${H}`, out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => p.on('close', (c) => (c ? rej(new Error('ffmpeg ' + c)) : res())));
  return { write: (b) => new Promise((r) => (p.stdin.write(b) ? r() : p.stdin.once('drain', r))), end: () => { p.stdin.end(); return done; } };
}

async function open(browser, slideId, format, mode) {
  const fmt = format === 'tt' ? { W: 1080, H: 1920 } : { W: 1080, H: 1350 };
  const page = await browser.newPage({ viewport: { width: fmt.W, height: fmt.H }, deviceScaleFactor: 1 });
  await page.addInitScript((input) => { window.__MC_INPUT = input; }, { data, slideId, format, mode });
  await page.goto(pathToFileURL(path.join(here, 'slide.html')).href);
  await page.waitForFunction(() => window.__MC_READY === true, null, { timeout: 30000 });
  await page.evaluate(async () => {
    await Promise.all(['Anton', 'JetBrains Mono', 'Inter'].map((f) => document.fonts.load(`40px "${f}"`)));
    await document.fonts.ready;
  });
  return { page, fmt };
}

async function frames(page, duration, sink, { offset = 0 } = {}) {
  const n = Math.round(duration * FPS);
  for (let i = 0; i < n; i++) {
    await page.evaluate((t) => window.MC.seek(t), offset + i / FPS);
    await sink.write(await page.screenshot({ type: 'png' }));
  }
  return n;
}

const browser = await chromium.launch();
const manifest = { rendered: new Date().toISOString(), fps: FPS, files: [] };
const formats = only ? [only] : ['ig', 'tt'];
const CONC = Number(opt('--jobs') || 3);
const jobs = [];
const tmp = path.join(exp, '.segments');

for (const format of formats) {
  const outDir = path.join(exp, format === 'ig' ? 'instagram' : 'tiktok');
  fs.mkdirSync(outDir, { recursive: true });
  for (const [i, s] of data.slides.entries()) {
    if (onlySlides && !onlySlides.includes(s.id)) continue;
    const base = `${String(i + 1).padStart(2, '0')}-${s.id}`;
    jobs.push(async () => {
      const { page } = await open(browser, s.id, format, 'still');
      const f = path.join(outDir, `${base}.png`);
      await page.screenshot({ path: f, type: 'png' });
      manifest.files.push({ format, slide: s.id, kind: 'png', file: path.relative(dir, f) });
      await page.close();
      console.log('png', format, base);
    });
    if (format === 'ig' && s.motion && !noVideo) jobs.push(async () => {
      const { page, fmt } = await open(browser, s.id, format, 'loop');
      const f = path.join(outDir, `${base}.mp4`);
      const sink = ffmpeg(f, fmt.W, fmt.H);
      const n = await frames(page, s.duration || 5, sink);
      await sink.end();
      manifest.files.push({ format, slide: s.id, kind: 'mp4', file: path.relative(dir, f), frames: n });
      await page.close();
      console.log('mp4', f, n, 'frames');
    });
  }
}
// TikTok: one 9:16 MP4 of the whole sequence, rendered as per-slide segments
// with identical encoder settings, then joined without re-encoding.
const seq = formats.includes('tt') && !noVideo && !onlySlides;
const segs = [];
if (seq) {
  fs.mkdirSync(tmp, { recursive: true });
  for (const [i, s] of data.slides.entries()) {
    const seg = path.join(tmp, `${String(i).padStart(2, '0')}.mp4`);
    segs.push({ seg, n: Math.round((s.seqDuration || s.duration || 4) * FPS) });
    jobs.push(async () => {
      const { page } = await open(browser, s.id, 'tt', 'seq');
      const sink = ffmpeg(seg, 1080, 1920);
      await frames(page, s.seqDuration || s.duration || 4, sink);
      await sink.end();
      await page.close();
      console.log('segment', s.id);
    });
  }
}
let next = 0;
await Promise.all(Array.from({ length: CONC }, async () => { while (next < jobs.length) await jobs[next++](); }));
if (seq) {
  const list = path.join(tmp, 'list.txt');
  fs.writeFileSync(list, segs.map((x) => `file '${x.seg}'`).join('\n'));
  const f = path.join(exp, 'tiktok', `${data.id}-full-9x16.mp4`);
  await new Promise((res, rej) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', f], { stdio: 'inherit' })
    .on('close', (c) => (c ? rej(new Error('concat ' + c)) : res())));
  fs.rmSync(tmp, { recursive: true, force: true });
  manifest.files.push({ format: 'tt', kind: 'mp4-sequence', file: path.relative(dir, f), frames: segs.reduce((a, x) => a + x.n, 0) });
  console.log('sequence', f);
}
await browser.close();
const mf = path.join(exp, 'manifest.json');
let prev = { files: [] };
try { prev = JSON.parse(fs.readFileSync(mf, 'utf8')); } catch {}
const keep = prev.files.filter((p) => !manifest.files.some((m) => m.file === p.file));
manifest.files = [...keep, ...manifest.files].sort((a, b) => a.file.localeCompare(b.file));
fs.writeFileSync(mf, JSON.stringify(manifest, null, 2));
console.log('done', manifest.files.length, 'files');
