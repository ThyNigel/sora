// Renders a real AI run (prompt file + output markdown) as a light-mode
// transcript page and screenshots it. The output text is not edited.
// node capture_transcript.mjs <prompt.txt> <output.md> <out.png> "<label>"
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { marked } from 'marked';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const [promptF, outF, png, label] = process.argv.slice(2);
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
const html = `<!doctype html><meta charset=utf-8><style>
body{margin:0;background:#f7f5f0;font:17px/1.5 Inter,system-ui,sans-serif;color:#1d1b18}
.wrap{max-width:860px;margin:0 auto;padding:28px}
.lab{font:600 13px ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#7a7368;margin:0 0 10px}
.you{background:#ebe6dc;border-radius:14px;padding:16px 18px;white-space:pre-wrap;font-size:14px;max-height:none}
.ai{background:#fff;border:1px solid #e3ddd1;border-radius:14px;padding:6px 22px;margin-top:18px}
table{border-collapse:collapse;font-size:14px;margin:10px 0}td,th{border:1px solid #e3ddd1;padding:5px 8px;text-align:left}th{background:#f3efe6}
h1,h2{font-size:19px;margin:18px 0 6px}</style>
<div class=wrap><p class=lab>${esc(label)}</p><p class=lab>Prompt (sample document attached)</p>
<div class=you>${esc(fs.readFileSync(promptF, 'utf8'))}</div><p class=lab style="margin-top:18px">Output (unedited)</p>
<div class=ai>${marked.parse(fs.readFileSync(outF, 'utf8'))}</div></div>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 900, height: 800 }, deviceScaleFactor: 2, colorScheme: 'light' });
await p.setContent(html);
await p.screenshot({ path: png, fullPage: true });
await b.close();
console.log('wrote', png);
