# Brand tokens: The Peace Stack, "Split World" (LOCKED)

Niche: "I build AI systems that buy back my time, then show you what I do with it."
Audience: regular people about 22 to 35 who want freedom and are curious about AI. Not developers.

This lock overrides `~/.claude/design/NIGELBUILDS_DESIGN.md` (blue primary, Space Grotesk) for Peace Stack social content. NigelBuilds business visuals keep that file.

## Look

| Token | Value | Rule |
|---|---|---|
| Plate | dark cracked concrete, smoke | `engine/plates.py`, never a gradient |
| `--ink` | #0c0b0a | page edges, shadows |
| `--cream` | #ede3cf | display hooks, body text on dark |
| `--ember` | #ff6a1a | THE one saturated accent per frame (one word, one figure, or one highlight) |
| `--red` | #d42a1f | the line accent. It points at the accent, it never competes |
| `--paper` | #fbf8f1 | light-mode proof cards. Screenshots are always light mode inside the frame |
| Display | Anton, uppercase, distress mask | hooks and titles |
| Mono | JetBrains Mono, uppercase, 0.16em tracking | labels, counters, source lines |
| Body | Inter 500 to 600 | actions, subs, proof text |
| Embers | 12 to 24 small particles, seeded | atmosphere, never the accent |

Banned visuals: blue glow or rim light, generic AI gradients, purple anything, stock-photo people, glassmorphism, neon, anything that reads as a template, laggy or floaty motion, blur-in text.

## Voice

Source: `VOICE_RULES.txt` and `content-system/REAL_NIGEL_EXAMPLES.txt` in the workspace, adapted for this audience.

- Short punchy lines. Vary length. Contractions.
- A little dark humor and sarcasm ("Nobody sends you a memo when your money gets a new weak spot.").
- Numbers written like "20k". Proper capitalization.
- Never mention the day job, family, or exact income numbers.
- No em dashes. No semicolons.
- Banned words: leverage, streamline, delve, holistic, game-changer, unlock, elevate, revolutionize, seamless, hustle, grind, "humbled to announce", utilize, synergy, cutting-edge, robust, optimize, comprehensive, innovative (full list enforced in `engine/qa.mjs`).
- Every carousel ends with a save/share CTA or a closing line of value, plus a short not-financial-advice line when money is involved.
