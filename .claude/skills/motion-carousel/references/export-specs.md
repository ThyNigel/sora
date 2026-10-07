# Export specs (checked 2026-10-07)

| Output | Size | Format | Notes |
|---|---|---|---|
| Instagram carousel slide | 1080x1350 (4:5) | PNG still or MP4 loop | 8 to 12 slides. Mix MP4 and PNG. All slides same aspect. |
| Instagram MP4 slide | 1080x1350 | H.264, yuv420p, 30fps CFR, CRF 16, faststart, no audio | 5 to 6s loops. First and last frames match (pose returns to beat 0). |
| TikTok photo mode | 1080x1920 (9:16) | PNG | one per slide |
| TikTok video | 1080x1920 | H.264, yuv420p, 30fps CFR | the whole sequence, about 45s. Segments joined without re-encode. |

## Safe zones (in 1080-wide pixels)

| Platform | Top | Bottom | Left | Right | Why |
|---|---|---|---|---|---|
| Instagram 4:5 | 92 | 92 | 84 | 84 | page counter top right, profile grid crops 4:5 to 3:4 (about 34px per side) |
| TikTok 9:16 | 210 | 480 | 76 | 168 | top tabs, caption and music bar at the bottom, like/comment/share column on the right |

The red rail sits at y=1176 (IG) and y=1372 (TikTok) on every slide so it carries across the swipe.

## Captions

| | Instagram | TikTok |
|---|---|---|
| Hashtags | 5 max per post (enforced since Dec 2025) | 5 (rolling out since Dec 2025, use 5) |
| Caption | 2,200 characters, first ~125 show | description up to 4,000 in app, photo mode title 90 |

Re-check these limits every few months. They change.
