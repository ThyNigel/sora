# How to add a template

1. Write a function in `engine/templates.js`: `function name(ctx) { const f = frame(ctx); ... return f.root; }`.
   - `ctx`: `{ data, slide, fmt, index, count, L, loop, still, after }`.
   - Build DOM inside `f.safe` (the safe-zone box) for anything readable.
   - Register motion with `MC.on((t) => { ... })`. Must be a pure function of `t`. Use `pose(t, start, closeStart, from, to, preset)` so loops return to frame 0. Use `MC.spring` presets only.
   - Snap positions with `Math.round`. No blur on text.
   - `if (ctx.still)` render the rest pose (that is the PNG).
   - Measure in `ctx.after(() => ...)` (fonts are loaded by then). Use `fit()` for display type. Call `redline(ctx, f.root, { seamIn, seamOut })` so the rail continues across the swipe.
2. Add it to `TEMPLATES`.
3. Add any new text fields to `slideText()` in `engine/qa.mjs` so the copy and truth gates see them.
4. Add the recipe to `references/motion-library.md` (purpose, beats in ms, preset, seam, failure modes, still fallback).
5. Render one slide (`--slides <id>`), run QA, look at the phone render, then add it to `pillar-map.md`.
