// motion-carousel QA. node qa.mjs <carousel-dir>
// Writes <dir>/qa/QA_REPORT.md, qa/qa.json and qa/phone/*.png. Exit 1 on any FAIL.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(process.argv[2]);
const data = JSON.parse(fs.readFileSync(path.join(dir, 'carousel.json'), 'utf8'));
data.assets = pathToFileURL(path.join(dir, 'assets')).href;
data.distressURI = 'data:image/png;base64,' + fs.readFileSync(path.join(dir, 'assets/plates/distress.png')).toString('base64');
// real source screenshots (capture_sources.mjs) replace the quote card on single-source slides
for (const sl of data.slides) {
  const shot = path.join(dir, 'assets/sources', `${sl.id}-0.png`);
  if (sl.proof && sl.proof.capture && sl.proof.capture.length === 1 && fs.existsSync(shot)) {
    sl.proof = { kind: 'image', src: pathToFileURL(shot).href, domain: sl.proof.domain, tag: 'Screenshot', foot: sl.proof.foot, quotes: sl.proof.quotes };
  }
}
const qaDir = path.join(dir, 'qa');
fs.mkdirSync(path.join(qaDir, 'phone'), { recursive: true });

const results = [];
const add = (level, area, msg) => results.push({ level, area, msg });

// ---------- copy gates ----------
const BANNED = ['leverage', 'streamline', 'delve', 'holistic', 'game-changer', 'game changer', 'unlock', 'elevate', 'revolutionize', 'seamless',
  'hustle', 'grind', 'humbled to announce', 'utilize', 'synergy', 'cutting-edge', 'robust', 'optimize', 'comprehensive', 'innovative'];
function gate(label, text) {
  const low = text.toLowerCase();
  for (const w of BANNED) if (new RegExp(`\\b${w}`, 'i').test(low)) add('FAIL', 'copy', `${label}: banned word "${w}"`);
  if (/—|–/.test(text)) add('FAIL', 'copy', `${label}: em or en dash`);
  if (/;/.test(text)) add('FAIL', 'copy', `${label}: semicolon`);
}
const slideText = (s) => [s.label, s.kicker, s.sub, s.body, s.action, s.sourceLine, s.nfa, ...(s.lines || []), ...(s.title || []), ...(s.claims || []), ...(s.index || []),
  s.proof && s.proof.domain, s.proof && s.proof.foot, s.proof && s.proof.prompt, ...((s.proof && s.proof.quotes) || []).map((q) => q.text), ...((s.proof && s.proof.output) || []), s.figure, s.unit]
  .filter(Boolean).join('\n').replace(/\*/g, '');
for (const s of data.slides) gate(`slide ${s.id}`, slideText(s));
const capF = path.join(dir, 'CAPTION.md');
if (fs.existsSync(capF)) gate('CAPTION.md', fs.readFileSync(capF, 'utf8').replace(/^#.*$/gm, '').replace(/`[^`]*`/g, ''));
else add('FAIL', 'copy', 'CAPTION.md missing');

// ---------- truth layer: every number on a slide must exist in a source ----------
const research = fs.readFileSync(path.join(dir, 'RESEARCH.md'), 'utf8');
const aiOut = data.slides.filter((s) => s.proof && s.proof.runFile).map((s) => fs.readFileSync(path.join(dir, s.proof.runFile), 'utf8')).join('\n');
const corpus = (research + '\n' + aiOut).replace(/\*\*/g, '');
const ledger = new Set([...research.matchAll(/^\| (C\d+a?|B\d+|AI-\d+) \|/gm)].map((m) => m[1]));
for (const s of data.slides) {
  for (const id of s.claimIds || []) if (!ledger.has(id)) add('FAIL', 'truth', `slide ${s.id}: claim ${id} not in RESEARCH.md ledger`);
  const text = slideText(s).replace(/0?7 OCT 2026|07 Oct 2026|MOVE \d\d/gi, '');
  for (const n of text.match(/\$?\d[\d,.]*\d|\$?\d/g) || []) {
    const bare = n.replace(/[$,]/g, '');
    if (/^(0?[1-9]|10)$/.test(bare) && (s.type === 'close' || /MOVE|^\d$/.test(n))) continue; // list and move numbers
    if (!corpus.includes(n) && !corpus.includes(bare)) add('FAIL', 'truth', `slide ${s.id}: number "${n}" not found in RESEARCH.md or AI output`);
  }
  if (s.proof && s.proof.kind === 'ai') {
    const out = fs.readFileSync(path.join(dir, s.proof.runFile), 'utf8').replace(/\*\*/g, '');
    for (const l of s.proof.output) for (const cell of l.replace(/^!/, '').split(' | ')) if (!out.includes(cell)) add('FAIL', 'truth', `slide ${s.id}: AI excerpt not verbatim: "${cell}"`);
  }
  if (s.proof && s.proof.kind === 'quotes') {
    for (const q of s.proof.quotes) if (!corpus.includes(q.text.replace(/\*\*/g, ''))) add('FAIL', 'truth', `slide ${s.id}: quote not in RESEARCH.md: "${q.text.slice(0, 50)}"`);
  }
}

// ---------- layout checks in the browser ----------
const browser = await chromium.launch();
async function open(slideId, format, scale) {
  const W = 1080, H = format === 'tt' ? 1920 : 1350;
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale });
  await page.addInitScript((input) => { window.__MC_INPUT = input; }, { data, slideId, format, mode: 'still' });
  await page.goto(pathToFileURL(path.join(here, 'slide.html')).href);
  await page.waitForFunction(() => window.__MC_READY === true);
  return page;
}
for (const format of ['ig', 'tt']) {
  for (const [i, s] of data.slides.entries()) {
    const page = await open(s.id, format, 1);
    const issues = await page.evaluate(() => {
      const out = [];
      const info = window.__MC_INFO;
      const tol = 6; // glyph side bearings and the hard paper shadow
      const safe = { l: info.safe.left - tol, r: info.W - info.safe.right + tol, t: info.safe.top - tol, b: info.H - info.safe.bottom + tol };
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const seen = new Set();
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent.trim()) continue;
        const e = node.parentElement;
        if (seen.has(e) || e.closest('script, style')) continue;
        // odometer digits off the window are hidden on purpose
        const col = e.closest('.col');
        if (col) { const cr = col.getBoundingClientRect(), er = e.getBoundingClientRect(); if (er.bottom <= cr.top + 1 || er.top >= cr.bottom - 1) continue; }
        seen.add(e);
        const cs = getComputedStyle(e);
        if (cs.opacity === '0' || cs.visibility === 'hidden') continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const r = range.getBoundingClientRect();
        const fsz = parseFloat(cs.fontSize);
        const label = node.textContent.trim().slice(0, 40);
        if (fsz < 24) out.push(['FAIL', `text under 24px (${fsz}px): "${label}"`]);
        if (r.left < safe.l || r.right > safe.r || r.top < safe.t || r.bottom > safe.b) out.push(['FAIL', `outside safe zone [${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.right)},${Math.round(r.bottom)}]: "${label}"`]);
        // clipped by an overflow:hidden ancestor
        let a = e.parentElement;
        while (a && a !== document.body) {
          const acs = getComputedStyle(a);
          if (acs.overflow === 'hidden' && !a.classList.contains('col') && !a.classList.contains('claim-wrap') && !a.classList.contains('frame')) {
            const ar = a.getBoundingClientRect();
            if (r.bottom > ar.bottom + 1 || r.right > ar.right + 1) out.push(['FAIL', `clipped by container: "${label}"`]);
          }
          a = a.parentElement;
        }
        if (cs.textOverflow === 'ellipsis' && e.scrollWidth > e.clientWidth) out.push(['FAIL', `ellipsis truncation: "${label}"`]);
      }
      // proof body must end above the footer
      for (const card of document.querySelectorAll('.card')) {
        const body = card.querySelector('.card-body');
        const foot = card.querySelector('.card-foot');
        if (body && foot) {
          const last = body.lastElementChild || body;
          if (last.getBoundingClientRect().bottom > foot.getBoundingClientRect().top + 1) out.push(['FAIL', 'proof text runs under the card footer']);
        }
      }
      // one saturated accent: count distinct accent-colored text runs
      const acc = [...document.querySelectorAll('.accent')].filter((n) => n.textContent.trim());
      if (acc.length > 2) out.push(['WARN', `${acc.length} accent-colored runs, rule is one accent per frame`]);
      return out;
    });
    for (const [lvl, msg] of issues) add(lvl, `layout ${format}`, `${String(i + 1).padStart(2, '0')}-${s.id}: ${msg}`);
    await page.close();
    // phone-size render: the browser lays out at 1080 and rasterizes at 390px wide
    const phone = await open(s.id, format, 390 / 1080);
    await phone.screenshot({ path: path.join(qaDir, 'phone', `${format}-${String(i + 1).padStart(2, '0')}-${s.id}.png`) });
    await phone.close();
  }
}
await browser.close();

// ---------- exports ----------
const mf = path.join(dir, 'export/manifest.json');
if (!fs.existsSync(mf)) add('FAIL', 'export', 'manifest.json missing, run render.mjs first');
else {
  const man = JSON.parse(fs.readFileSync(mf, 'utf8'));
  const ig = man.files.filter((f) => f.format === 'ig');
  const igSlides = new Set(ig.map((f) => f.slide));
  if (igSlides.size < 8 || igSlides.size > 12) add('FAIL', 'export', `Instagram has ${igSlides.size} slides, needs 8 to 12`);
  if (!ig.some((f) => f.kind === 'mp4') || !ig.some((f) => f.kind === 'png')) add('FAIL', 'export', 'Instagram must mix MP4 and PNG');
  for (const f of man.files) {
    const p = path.join(dir, f.file);
    if (!fs.existsSync(p)) { add('FAIL', 'export', `missing ${f.file}`); continue; }
    if (f.kind.startsWith('mp4')) {
      const pr = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate,avg_frame_rate,nb_read_frames,pix_fmt,codec_name', '-of', 'json', p]).toString()).streams[0];
      const ok = pr.r_frame_rate === '30/1' && pr.avg_frame_rate === '30/1' && +pr.nb_read_frames === f.frames && pr.pix_fmt === 'yuv420p' && pr.codec_name === 'h264';
      add(ok ? 'PASS' : 'FAIL', 'video', `${f.file}: ${pr.width}x${pr.height} ${pr.codec_name} ${pr.pix_fmt} ${pr.avg_frame_rate}fps, ${pr.nb_read_frames}/${f.frames} frames`);
    } else {
      const head = fs.readFileSync(p).subarray(16, 24);
      const w = head.readUInt32BE(0), h = head.readUInt32BE(4);
      const want = f.format === 'tt' ? '1080x1920' : '1080x1350';
      add(`${w}x${h}` === want ? 'PASS' : 'FAIL', 'still', `${f.file}: ${w}x${h}`);
    }
  }
}

const fails = results.filter((r) => r.level === 'FAIL');
const warns = results.filter((r) => r.level === 'WARN');
const lines = [`# QA Report: ${data.id}`, '', `Run: ${new Date().toISOString()}`, '', `**${fails.length} FAIL, ${warns.length} WARN, ${results.filter((r) => r.level === 'PASS').length} PASS**`, '',
  'Checks: banned words, em dashes, semicolons, every number traced to RESEARCH.md or a real AI output file, AI excerpts verbatim, quotes present in RESEARCH.md, text at least 24px, text inside platform safe zones, no clipped or truncated text, proof text above card footer, accent count, still sizes, video codec, 30fps constant, exact frame counts. Phone renders: qa/phone/.', '',
  '| Level | Area | Detail |', '|---|---|---|', ...results.map((r) => `| ${r.level} | ${r.area} | ${r.msg.replace(/\|/g, '/')} |`)];
fs.writeFileSync(path.join(qaDir, 'QA_REPORT.md'), lines.join('\n') + '\n');
fs.writeFileSync(path.join(qaDir, 'qa.json'), JSON.stringify(results, null, 2));
console.log(`${fails.length} FAIL, ${warns.length} WARN`);
for (const r of [...fails, ...warns]) console.log(r.level, r.area, r.msg);
process.exit(fails.length ? 1 : 0);
