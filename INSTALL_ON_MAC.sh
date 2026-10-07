#!/bin/bash
# Copies this branch's output into the real places on Nigel's Mac.
# Never deletes or overwrites anything that already exists there.
#   bash INSTALL_ON_MAC.sh            (run from the root of this repo)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
skill_src="$here/.claude/skills/motion-carousel"
skill_dst="$HOME/.claude/skills/motion-carousel"
car_src="$here/content-system/carousels/2026-10-07-money-moves"
car_dst="/Users/oreo/workspace/content-system/carousels/2026-10-07-money-moves"

mkdir -p "$HOME/.claude/skills" "/Users/oreo/workspace/content-system/carousels"
rsync -a --ignore-existing --exclude node_modules "$skill_src/" "$skill_dst/"
rsync -a --ignore-existing "$car_src/" "$car_dst/"
(cd "$skill_dst/engine" && npm install --silent marked@14 >/dev/null 2>&1 || true)
echo "Skill:    $skill_dst"
echo "Carousel: $car_dst"
echo "Optional, real source screenshots: node \"$skill_dst/engine/capture_sources.mjs\" \"$car_dst\" && node \"$skill_dst/engine/render.mjs\" \"$car_dst\" --jobs 4 && node \"$skill_dst/engine/qa.mjs\" \"$car_dst\""
