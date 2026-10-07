---
name: motion-carousel
description: Build a researched, verified motion carousel for Instagram and TikTok in The Peace Stack "Split World" style, from tip research to exported MP4/PNG slides with Playwright QA. Use whenever the request is for a carousel, slides for social, a swipe post, an Instagram carousel, a TikTok carousel or photo-mode post, a "Money Moves" post, or turning tips/research into swipeable slides. Not for slide decks for meetings (use a deck tool for those).
---

# motion-carousel

Makes one carousel end to end: research, proof assets, copy, motion, export, QA. Output goes to
`/Users/oreo/workspace/content-system/carousels/<YYYY-MM-DD>-<pillar>/` (in a cloud session:
`<repo>/content-system/carousels/...`, then copy over with `install.sh`).

The bar: it must not look or read like AI slop. Every claim is traceable. Every proof is real.

## Read first (in this order)

1. `references/brand-tokens.md` : Split World look, voice, banned words. Locked. Do not re-decide.
2. `references/research-rules.md` : what counts as verified, the claims ledger, AI-run rules.
3. `references/pillar-map.md` : which templates and slide mix each pillar uses.
4. `references/motion-library.md` : CUTOUT, BENCHMARK, RIFFLE, springs, seams. Principles only.
5. `references/export-specs.md` : sizes, codecs, safe zones, caption and hashtag limits.
6. `references/asset-rules.md` and `references/qa-checklist.md`.

## Workflow

1. **Inventory tools** (2 min). Check: Playwright (`/opt/node22/lib/node_modules/playwright` or global), ffmpeg, web search, which source domains the network can actually reach (`curl -sS -o /dev/null -w "%{http_code}" https://www.irs.gov/`), Higgsfield (atmosphere only), Canva, `claude -p` for real AI runs. Write down what is blocked. Plan around it, never fake around it.
2. **Research** (parallel subagent). 25+ candidates, score, keep 6 to 8. Write `RESEARCH.md` with a Claims Ledger (C1, C2...). Rules in `references/research-rules.md`.
3. **Motion research** (parallel subagent) only if the library needs a new recipe. Otherwise reuse `references/motion-library.md`.
4. **Proof assets.** Run every AI tip for real: sample document (fictional, labeled SAMPLE) + exact prompt through `claude -p --tools "" --system-prompt "<plain assistant>"`. Save prompt, output, run record. `engine/capture_transcript.mjs` makes the light-mode transcript screenshot. Official pages: `engine/capture_sources.mjs` (needs network access to them). Write `ASSETS.md`.
5. **Copy.** 5 hook options, pick one, record why. One tip per slide, readable in under 3 seconds. Caption per platform in `CAPTION.md`. Not-financial-advice line in caption and last slide.
6. **Data.** Write `carousel.json` (schema below). Every slide lists `claimIds`. AI excerpts must be verbatim cells or sentences from the output file.
7. **Plates.** `python3 engine/plates.py <dir>/assets/plates 7` (procedural concrete, smoke, grain, distress mask).
8. **Render.** `node engine/render.mjs <dir> --jobs 4`. Stills for every slide and format, loop MP4s for `motion: true` IG slides, one full 9:16 TikTok MP4.
9. **QA.** `node engine/qa.mjs <dir>`. Must be 0 FAIL. Then open `qa/phone/*.png` and actually look. Run the anti-slop pass in `references/qa-checklist.md` and redo anything that fails.
10. **Never post, schedule or publish.** Hand Nigel the folder and a numbered review list.

## carousel.json schema (short)

```json
{ "id": "2026-10-07-money-moves", "pillar": "money-moves", "series": "MONEY MOVES", "seed": 7,
  "slides": [
    { "id": "hook", "type": "hook", "motion": true, "duration": 5, "seqDuration": 3.6, "kicker": "...", "label": "...",
      "lines": ["7 MONEY", "MOVES"], "accent": "7", "sub": "..." },
    { "id": "x", "type": "benchmark", "figure": "4", "unit": "FILES", "claims": ["A", "B", "C"], "body": "...", "claimIds": ["C1"] },
    { "id": "y", "type": "tip", "title": ["LINE 1", "LINE 2"], "accent": "WORD", "action": "Use *word* for a red underline.",
      "sourceLine": "IRS.GOV. CHECKED 07 OCT 2026",
      "proof": { "kind": "quotes|ai|image", "domain": "...", "quotes": [{ "who": "...", "text": "**highlight**" }],
                 "capture": [{ "url": "...", "find": "sentence fragment" }] }, "claimIds": ["C5"] },
    { "id": "close", "type": "close", "lines": ["SAVE THIS."], "accent": "SAVE", "index": ["..."], "nfa": "Not financial advice..." } ] }
```

`**text**` = ember highlight inside proof cards. `*text*` = red underline in body copy. One saturated accent per frame.

## Engine files

| File | Job |
|---|---|
| `engine/runtime.js` | Analytic springs (snappy, settle, heavy, drift), seeded RNG, seekable timeline. HyperFrames compatible (`window.__timelines`). |
| `engine/templates.js` | hook (CUTOUT), benchmark (BENCHMARK), tip (RIFFLE + paper stack), close. Auto-fit type, red rail seam. |
| `engine/styles.css` | Brand tokens. Change the look here only. |
| `engine/slide.html` | Mount point. Open by hand: `slide.html?carousel=<json>&slide=<id>&format=ig|tt&mode=loop`. |
| `engine/render.mjs` | Frame-exact export by seeking time. No dropped frames on any machine. |
| `engine/qa.mjs` | Copy gates, truth trace, layout and safe-zone checks, phone renders, video checks. |
| `engine/plates.py` | Procedural Split World plates. |
| `engine/capture_sources.mjs`, `engine/capture_transcript.mjs` | Real proof screenshots. |

Adding a template: `references/add-template.md`. Lessons from past runs: `references/lessons.md`.
