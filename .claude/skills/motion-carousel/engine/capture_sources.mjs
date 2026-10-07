// Screenshot every official source page listed in carousel.json proof.capture,
// light mode, cropped around the sentence the slide quotes.
// Run on a machine whose network can reach the sources:
//   node capture_sources.mjs <carousel-dir>
// Writes assets/sources/<slide-id>-<n>.png plus capture-log.json.
// Single-source slides then render the real screenshot instead of the quote card.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dir = path.resolve(process.argv[2]);
const data = JSON.parse(fs.readFileSync(path.join(dir, 'carousel.json'), 'utf8'));
const out = path.join(dir, 'assets/sources');
fs.mkdirSync(out, { recursive: true });
const log = [];
const browser = await chromium.launch();
for (const s of data.slides) {
  for (const [n, c] of ((s.proof && s.proof.capture) || []).entries()) {
    const page = await browser.newPage({ viewport: { width: 1000, height: 1200 }, deviceScaleFactor: 2, colorScheme: 'light' });
    const file = path.join(out, `${s.id}-${n}.png`);
    try {
      await page.goto(c.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(2500);
      const hit = page.getByText(c.find, { exact: false }).first();
      await hit.scrollIntoViewIfNeeded({ timeout: 10000 });
      const box = await hit.boundingBox();
      const y = Math.max(0, box.y - 260);
      await page.screenshot({ path: file, clip: { x: 0, y, width: 1000, height: 640 } });
      log.push({ slide: s.id, url: c.url, find: c.find, file: path.relative(dir, file), ok: true, at: new Date().toISOString() });
      console.log('ok', s.id, c.url);
    } catch (e) {
      log.push({ slide: s.id, url: c.url, find: c.find, ok: false, error: String(e.message).slice(0, 200), at: new Date().toISOString() });
      console.log('FAILED', s.id, c.url, '(the quote may have changed: open the page and check)');
    }
    await page.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(out, 'capture-log.json'), JSON.stringify(log, null, 2));
