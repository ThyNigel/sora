# Motion Library: Money Moves (Split World)

Checked 2026-10-07. Formats: Instagram carousel 1080x1350 (4:5) and TikTok 1080x1920 (9:16). Render at 30fps.

This library holds principles and recipes written in our own words. Nothing here is copied from motionin.design or savee.com. motionin.design sells each section as a paid spec file. We did not see, buy or reproduce any spec, prompt, code or asset. Where only a gallery item name was visible, the technique is described from general motion-design knowledge and labeled "principle, own words".

Brand frame for every recipe: dark cracked concrete plate, slow smoke, floating ember orange particles, cream distressed condensed display type for hooks, mono type for labels, one red line accent. Screenshots sit inside frames in light mode.

## 0. What the public sources showed (short)

- motionin.design positions its gallery as "premium interactive web sections" that are physics-based and cursor-responsive, sold as spec files (search snippet of the home page).
- Public snippets say the sections are theme-aware, keyboard and touch driven, honor prefers-reduced-motion, and pause off-screen. We adopt that last pair as a rule (see Section 9).
- "Cutout" has one public line: a photographer's cutting mat that asks how photos should feel and answers it in paper. That is the only description we saw. Our CUTOUT recipe takes the idea of paper as the material and nothing else.
- "Benchmark" and "Riffle" appear only as names in a search snippet. No description was visible. Both recipes below are "principle, own words".
- savee.com was blocked by the egress proxy. Public snippets only confirm it is a visual bookmarking and inspiration board tool with a color filter. No motion principles were extracted from it.

## 1. SPRING SYSTEM (shared presets, used everywhere)

Every moving thing in the carousel uses one of four presets. No ad-hoc easing. No linear tweens on position, scale or rotation. Opacity may use a short linear ramp (max 100ms) only as a helper to a spring.

| Preset | mass | stiffness | damping | zeta (approx) | overshoot | settle to 0.5% | Use for |
|---|---|---|---|---|---|---|---|
| snappy | 1 | 400 | 30 | 0.75 | about 3% | about 300ms | labels, chips, small UI, red line end caps |
| settle | 1 | 170 | 18 | 0.69 | about 5% | about 500ms | letters, cards, screenshots landing |
| heavy | 2.5 | 260 | 34 | 0.67 | about 6% | about 650ms | giant numbers, paper stacks, anything that should feel weighty |
| drift | 1 | 20 | 9 | 1.0 (critical) | none | about 1000ms | smoke parallax, ember lanes, ambient camera |

Formulas: omega0 = sqrt(k / m). zeta = c / (2 * sqrt(k * m)). Settle time is roughly 4 / (zeta * omega0) for the underdamped case.

GSAP equivalent: do not use the built-in elastic or back eases as stand-ins. Sample the analytic spring below at 60 points over its settle time and feed them to CustomEase (or CSS `linear()` with the same points). The tween duration equals the settle time from the table. This keeps GSAP previews and the seek renderer identical.

### 1.1 Deterministic spring (seek by time, no requestAnimationFrame)

Frames are rendered by seeking to t = frameIndex / 30. Each property is a pure function of time. No integration, no accumulated state, no dependence on wall clock or rAF.

```js
// value at time t (seconds) for a spring from `from` to `to`
// v0 is initial velocity in units per second (usually 0)
export function spring(t, from, to, { mass = 1, stiffness = 170, damping = 18, v0 = 0 } = {}) {
  if (t <= 0) return from
  const w0 = Math.sqrt(stiffness / mass)
  const zeta = damping / (2 * Math.sqrt(stiffness * mass))
  const d0 = from - to            // initial displacement
  const u0 = v0                   // initial velocity of displacement
  let y
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta)
    const B = (u0 + zeta * w0 * d0) / wd
    y = Math.exp(-zeta * w0 * t) * (d0 * Math.cos(wd * t) + B * Math.sin(wd * t))
  } else if (zeta === 1) {
    y = Math.exp(-w0 * t) * (d0 + (u0 + w0 * d0) * t)
  } else {
    const s = Math.sqrt(zeta * zeta - 1)
    const r1 = -w0 * (zeta - s)
    const r2 = -w0 * (zeta + s)
    const c2 = (u0 - r1 * d0) / (r2 - r1)
    const c1 = d0 - c2
    y = c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t)
  }
  return to + y
}

export const PRESETS = {
  snappy: { mass: 1, stiffness: 400, damping: 30 },
  settle: { mass: 1, stiffness: 170, damping: 18 },
  heavy:  { mass: 2.5, stiffness: 260, damping: 34 },
  drift:  { mass: 1, stiffness: 20, damping: 9 },
}

// delayed start, still pure
export const at = (t, startMs, from, to, preset) =>
  spring(t - startMs / 1000, from, to, PRESETS[preset])
```

Rules for the renderer:
- Seed every random choice (see 1.2). Same seed and same t must give the same pixels.
- Snap final translate values to whole pixels once the spring is within 0.5px of rest. This kills fractional-pixel shimmer on type.
- For loops, compute t modulo the loop length before calling any spring that belongs to the looping layer.

### 1.2 Seeded randomness

```js
export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
```

Seed per slide from a fixed string hash (for example the slide id) so a re-render never reshuffles letters or embers.

## 2. CUTOUT (paper-cut letter release for the hook)

Source note: only the public one-line description of motionin's Cutout was visible (paper as the medium for a photo cutting mat). Everything below is principle, own words.

Purpose: make the hook feel physical and handmade, the opposite of a template. Each letter is a cut or torn cream paper piece pinned over the concrete, then released so it drops and settles.

When to use: slide 1 hook only. Max 6 words. Once per carousel.

Construction:
- Each glyph is a cream shape with a slightly irregular edge (a seeded jitter of 1 to 3px on the outline, torn edge on 1 or 2 sides only).
- Hard drop shadow, not soft glow: offset 6px down and 4px right, near-black at 55% opacity, blur 2px max. Shadow offset grows to 14px while the letter is "lifted" and shrinks back to 6px as it lands. That shadow change sells depth more than any scale change.
- One saturated accent: exactly one word (the money word, for example a figure or "FREE") is cut from ember orange paper. Every other letter stays cream.

Choreography (hook slide, 30fps):

| Beat | Time (ms) | What happens | Preset |
|---|---|---|---|
| 0 | 0 to 200 | Letters already visible, lifted 18px up, rotated by seeded values between -6 and 6 degrees, shadow offset 14px. Readable from frame 0. | none |
| 1 | 200 to 900 | Release in reading order, stagger 45ms per letter, 90ms extra gap between words. Each letter springs y to 0 and rotation to a small resting tilt between -1.5 and 1.5 degrees. | settle |
| 2 | 900 to 1300 | Accent word lands last with a stronger drop (28px) and slight 2% scale overshoot. | heavy |
| 3 | 1300 to 1700 | Red line draws under the accent word (see 6.3). | snappy |
| 4 | 1700 to loop end | Hold. Only ambient layers move (embers, smoke). | drift |

Bridge across swipe: the red underline continues off the right edge as a seam element (see 6.6) and lands on slide 2 as the rule above the first tip label.

Reads as AI template when: every letter has identical rotation, the shadow is a soft blurry glow, letters fade in from 0 opacity, all letters bounce at once, the paper edge is perfectly smooth, or more than one word is orange.

Still fallback (PNG and reduced motion): rest state. Letters at resting tilt, shadow offset 6px, accent word in orange, red underline fully drawn. No motion blur, no lifted letters.

## 3. BENCHMARK (giant figure plus rotating claim)

Source note: "Benchmark" was visible only as a name. Principle, own words.

Purpose: one huge verified number owns the frame. A short claim line under it rotates through 2 or 3 phrasings so the viewer gets the same fact from different angles inside one loop.

Hard rule: only verified numbers. Each figure must have a source line in the content brief (publisher, date, exact figure). No source, no Benchmark slide. Never round in a way that changes meaning. Show the unit and the timeframe ("per year", "in 2025").

Construction:
- Figure set in the cream condensed display at 55 to 65% of frame width. Tabular figures so digits do not jitter in width.
- Each digit is an odometer column (0 to 9 stacked, clipped). Columns roll, they do not crossfade.
- Mono label above the figure for the source tag ("SOURCE: BLS, 2025"). Mono claim line below.

Choreography:

| Beat | Time (ms) | What happens | Preset |
|---|---|---|---|
| 0 | 0 to 150 | Figure already at its final value on frame 0 for the still. In video, columns start offset by seeded 3 to 7 digits below. | none |
| 1 | 150 to 1100 | Columns roll to target with a 60ms stagger from left to right, so the leftmost (most significant) digit locks first and the rightmost finishes last. Use the heavy spring on each column's y. | heavy |
| 2 | 1100 to 1400 | Unit symbol ($, %) springs in from 12px left. | snappy |
| 3 | 1400 to 4400 | Claim line rotates: phrasing A holds 1500ms, then B. Each swap is a vertical roll of 24px with clip, outgoing up, incoming from below. | snappy |
| 4 | 4400 to 5000 | Returns to phrasing A so first frame equals last frame. | snappy |

Count-up note: if you prefer a count-up instead of an odometer, interpolate an integer with the heavy spring and floor it. Never show decimals that the source did not publish.

Bridge across swipe: the figure's baseline rule (thin red line) runs out the right edge as a seam and becomes the top rule of the next slide.

Reads as AI template when: the number has a glow or gradient fill, digits blur while counting, it counts up linearly from 0 over 3 seconds, the claim rotates with a fade, or the number is unsourced or suspiciously round.

Still fallback: final figure, unit, source tag, and claim phrasing A. No rolling digits mid-frame.

## 4. RIFFLE (deck morph between tips)

Source note: "Riffle" was visible only as a name. Principle, own words.

Purpose: tips arrive as a physical deck. Cards or light-mode screenshots riffle like a thumbed stack, then the top card morphs into the next layout. This creates continuity from tip to tip instead of hard cuts.

When to use: slides 2 to N-1 (the tips), especially when each tip has a proof screenshot.

Construction:
- Deck of 4 to 6 cards, each a light-mode screenshot in a cream paper frame with a 2px torn edge on one side.
- Cards are offset by seeded small values: x within 3px, y 4px per card, rotation within 2 degrees. Never a perfect fan.
- Hard shadow per card (offset 3px down, 2px right) so stacking is legible.

Choreography (tip slide loop, 5000ms):

| Beat | Time (ms) | What happens | Preset |
|---|---|---|---|
| 0 | 0 to 300 | Deck at rest, top card shows this tip's proof. Mono label already present. | none |
| 1 | 300 to 900 | Riffle: cards 2 to 5 flick up 30px one after another, stagger 50ms, each with a 3 to 5 degree rotation, then fall back. Reads like a thumb across a deck. | snappy |
| 2 | 900 to 1500 | Top card lifts 12px, shadow grows, and morphs: its frame resizes to the tip layout (width, height, corner) while its screenshot crops to the highlighted region. | settle |
| 3 | 1500 to 4200 | Hold for reading. Red line draws under the key value inside the screenshot. | snappy |
| 4 | 4200 to 5000 | Card settles back into the deck at its beat 0 pose so the loop closes. | settle |

Morph rule: interpolate frame rect (x, y, w, h, radius) with springs. Never crossfade two screenshots. If content must change, the next card slides out from under the top card.

Bridge across swipe: the bottom card of the deck sits as a seam element across the right edge. On slide N+1 that same card is now the top card. Same seed, same rotation, so the eye tracks it through the swipe.

Reads as AI template when: cards fan in a perfect arc, rotate in 3D with perspective glow, all cards move in unison, screenshots crossfade, or the deck floats with no shadow and no contact.

Still fallback: morphed state (beat 3). Top card at tip layout, deck visible beneath, red line drawn.

## 5. Timing budget and loops

- Hook readable in under 3 seconds. Rule: the hook text is legible on frame 0. Motion adds energy but never gates reading. CUTOUT finishes its last landing by 1300ms and the underline by 1700ms.
- Tip slide loop: 4000 to 6000ms. Default 5000ms (150 frames).
- Benchmark loop: 5000ms with the claim returning to phrasing A.
- Frame rate: 30fps exactly. All beat boundaries round to whole frames (multiples of 33.33ms). Export at 30fps constant frame rate.
- Loop-ability for IG video slides: frame 0 and frame N must match pixel for pixel on every layer. Ambient layers (embers, smoke) use periodic motion with a period that divides the loop length. Foreground beats return to their beat 0 pose before the loop ends.
- TikTok 9:16: same recipes, extra 285px of plate top and bottom. Keep text inside the center 1080x1350 zone plus 120px margins so UI overlays do not cover it.

## 6. Supporting motions

### 6.1 Ember drift particles

- Count: 12 to 24 per frame. Never hundreds.
- Size 2 to 6px, ember orange at 60 to 90% opacity, with a 1px warmer core. No bloom, no blue.
- Motion: each ember rises 40 to 120px per loop with a sine sway of 6 to 14px. Phase and lane come from mulberry32(slideSeed). Position is a pure function of (t mod loop), so the loop is seamless: y = y0 - speed * (t mod L), wrapped inside the frame.
- Flicker: opacity varies by at most 15% on a period that divides L.
- Ember orange is the brand ambient color, not the frame's saturated accent. Keep embers small and sparse so the accent word or figure still wins.

Fallback: 8 to 12 embers frozen at seeded positions.

### 6.2 Smoke plate parallax

- Two smoke layers over the concrete plate. Back layer moves 0.25x, front layer 0.6x of a slow pan of 24px per loop. Drift preset only.
- Loop by moving along a closed path (a small ellipse) so start and end match.
- Smoke never crosses over hook text at more than 20% opacity.

Fallback: plate and smoke at the loop's frame 0.

### 6.3 Red line accent draw-on

- One line per frame, 3 to 5px, red, slightly rough edge.
- Draw via stroke-dashoffset (or clip width) driven by the snappy spring over about 300ms. Start cap leads, a tiny 1 to 2px overshoot past the end then settles back.
- Direction follows reading direction, left to right.

Fallback: fully drawn.

### 6.4 Mono label type-on

- Mono labels (source tags, step numbers, "TIP 03") type on at 28ms per character with a block cursor that blinks twice (each blink 400ms) then disappears.
- Characters appear whole. No per-character fade, no blur, no scramble effect unless the label is literally a code.
- Max 32 characters, so typing ends under 900ms.

Fallback: full label, no cursor.

### 6.5 Proof screenshot slide-in from paper stack

- Screenshot (light mode) lives on a cream paper card that sits in a stack of 2 or 3 blank sheets.
- The card slides out from under the stack: x from -40px to 0 relative to the stack, y lift of 8px then down, rotation from -3 to the resting -0.8 degrees. Settle preset, about 500ms.
- Shadow offset tracks lift (3px resting, 9px lifted).
- Screenshot content stays sharp at all times. No zoom-in on the screenshot itself during the slide.

Fallback: card resting on stack, slightly offset so the stack still reads.

### 6.6 Seam element (Instagram cross-slide continuity)

Purpose: an element that straddles the right edge of slide N and the left edge of slide N+1, so swiping reveals the rest of it. This is the strongest swipe driver on IG.

Construction:
- Render adjacent slides as one 2160x1350 canvas. Place the seam element centered on x = 1080. Crop to two 1080x1350 slides afterwards. This guarantees the halves line up to the pixel.
- Good seam elements: the red line, a torn paper strip, the bottom deck card, a screenshot corner, a large ember orange numeral.
- Keep at least 35% of the element on each side. Under 35% reads as a cropping mistake.
- Avoid placing text across the seam. A word cut in half reads as an error, a shape cut in half reads as an invitation.
- In video slides both halves must be at the same phase at every frame. Both slides use the same loop length and the seam layer is computed from the shared canvas time.
- Keep seams out of the bottom 180px (IG dots and caption overlay).

TikTok: photo-mode swipes do not show adjacent slides side by side reliably. Degrade the seam to an edge bleed: the element touches the right edge on slide N and reappears at the left edge on N+1 with matching color and angle.

Fallback: the still frame shows both halves exactly as cropped from the shared canvas.

## 7. One saturated accent per frame

- Each frame has exactly one saturated accent: the ember orange word in CUTOUT, the figure's key digit or unit in BENCHMARK, or the highlighted region in a RIFFLE card.
- The red line is the accent's partner. It points to the accent and never introduces a second focal point.
- Everything else lives in the cream, concrete grey, near-black and smoke range. Embers stay small and sparse so they read as atmosphere, not as a second accent.
- If a screenshot contains a loud brand color, desaturate the frame around it or crop tighter so the accent rule still holds.

## 8. Anti-slop rules

- No blue glow, no neon edges, no lens flares.
- No generic gradients (purple to blue, mesh blobs). The plate is concrete and smoke.
- No floaty lerp-everything. Every move uses a named spring preset with a reason.
- No motion without reason. Each move must reveal, point, connect or close a loop. If it does none, delete it.
- No blur-in on text. Text is sharp on every frame it is visible.
- No fractional-pixel shimmer. Snap resting positions to whole pixels and avoid sub-pixel drift on text layers.
- Motion blur only when physically justified (a card flicked faster than about 1500px per second for one or two frames). Never on type at rest.
- Nothing laggy or unrealistic: no slow-motion ease-out tails longer than the settle time, no objects that ignore weight (a heavy number must not bounce like a chip).
- No uniform staggers. Seeded variation of 10 to 20% on stagger and rotation so it feels hand placed.
- No 3D spinning cards, no particle explosions, no typewriter on hooks.
- Readability first: if a test viewer cannot read the hook in a 3 second glance, cut motion before cutting words.

## 9. Reduced motion and stills

- Every recipe defines a still frame (listed above). The PNG export for each slide is that still, rendered by the same code at the recipe's rest time.
- The carousel ships stills as the default for any placement where video slides are not supported.
- Inspired by the public note that motionin's sections honor reduced motion and pause off-screen: our web previews read prefers-reduced-motion and render the still. Anything off-screen in a preview does not animate.

## 10. Recipe map for this carousel

| Slide | Recipe | Seam out | Accent |
|---|---|---|---|
| 1 Hook | CUTOUT | red underline | money word in ember orange |
| 2 Stat | BENCHMARK | red baseline rule | key figure |
| 3 to N-1 Tips | RIFFLE plus 6.4 and 6.5 | bottom deck card | highlighted value in screenshot |
| N Close | CUTOUT short (one line, 3 words) | none | call to action word |

## Sources and access log

| Source | URL | Date checked | Method | Result | What we took |
|---|---|---|---|---|---|
| motionin.design home | https://www.motionin.design/ | 2026-10-07 | WebFetch | EGRESS_BLOCKED by proxy | nothing directly |
| savee.com home | https://savee.com/ | 2026-10-07 | WebFetch | EGRESS_BLOCKED by proxy | nothing directly |
| motionin.design home (snippet) | https://www.motionin.design/ | 2026-10-07 | WebSearch snippet | visible | positioning: physics-based, cursor-responsive sections sold as spec files |
| motionin.design gallery list (snippet) | https://www.motionin.design/ | 2026-10-07 | WebSearch extended | visible | names Pantheon, Benchmark, Aperture, Formation, Revolver, Riffle, Console. Theme-aware, keyboard and touch driven, honors prefers-reduced-motion, pauses off-screen |
| motionin Cutout (snippet) | https://www.motionin.design/ | 2026-10-07 | WebSearch extended | one line visible | paper cutting mat concept only |
| motionin Benchmark | not found as a page | 2026-10-07 | WebSearch | name only | recipe is principle, own words |
| motionin Riffle | not found as a page | 2026-10-07 | WebSearch | name only | recipe is principle, own words |
| motionin gallery pages listed (Aperture, Moments, Atelier, Aurora, Cipher, Revolver, Aster, Pixels) | https://www.motionin.design/gallery/aperture and siblings | 2026-10-07 | WebSearch titles | titles only | nothing used |
| savee interview | https://inspire.savee.it/interview-with-karina-sirqueira/ | 2026-10-07 | WebSearch snippet | visible | savee is an inspiration board tool with a color filter. No motion principles |
| savee developer docs | https://docs.savee.com/api/skill | 2026-10-07 | WebSearch snippet | visible | public API needs a bearer token. Boards not reachable without login and proxy access |
| Spring math | general physics (damped harmonic oscillator) | 2026-10-07 | own knowledge | n/a | formulas in Section 1.1 |

Not seen: any motionin spec file, prompt, code, video or asset. Any savee board or saved item. No paid content was accessed.
