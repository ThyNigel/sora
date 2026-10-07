# QA checklist

## Automated (`node engine/qa.mjs <dir>`, must be 0 FAIL)

- Banned words, em and en dashes, semicolons (slides and CAPTION.md)
- Every number on a slide found in RESEARCH.md or a real AI output file
- Every `claimIds` entry exists in the ledger
- AI excerpts verbatim, quote cards present in RESEARCH.md
- All text at least 24px at export size, inside the platform safe zone, not clipped, not ellipsized, proof text above the card footer
- Accent count (warn above 2 accent runs)
- Stills exact size, videos H.264 yuv420p 30fps constant with the exact expected frame count (proves no dropped frames)
- Instagram has 8 to 12 slides and mixes MP4 and PNG
- Phone-size renders written to qa/phone (390px wide, laid out at 1080 and rasterized by Chromium)

The checker was negative-tested on 2026-10-07: planted banned word, dash, semicolon, unsourced number, fake quote, overlong title and overflowing card were all caught.

## Manual (open the files and look)

1. Read each phone render at arm's length. Can you get the slide in under 3 seconds?
2. Scrub every MP4. Nothing jitters, nothing floats, letters land with weight, loops close without a pop.
3. Swipe the IG stills in order. The red rail lines up edge to edge.

## Anti-slop pass

Fail and redo if any slide:
- looks like a Canva or "AI carousel" template (centered stack, icon grid, gradient card, emoji bullets)
- has blue glow, purple, gradient fills, glass, neon
- has motion without a reason, blur-in text, linear fades on everything, uniform staggers
- has stock people or a fake UI
- says something RESEARCH.md cannot back
- uses AI-sounding phrasing ("in today's world", "unlock", "game-changer", rule of three filler)
