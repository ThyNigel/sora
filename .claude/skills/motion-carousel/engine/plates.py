"""Procedural Split World plates: cracked concrete, smoke, grain.

Deterministic (seeded) so a carousel can be re-rendered pixel for pixel.
Usage: python3 plates.py <out_dir> [seed]
Writes concrete-<w>x<h>.png, smoke-<w>x<h>.png (RGBA), grain.png
"""
import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def fbm(w, h, rng, octaves=6, base=4, persistence=0.55):
    out = np.zeros((h, w), np.float32)
    amp, total = 1.0, 0.0
    for o in range(octaves):
        cells = base * (2 ** o)
        g = rng.random((max(2, int(cells * h / w)) + 1, cells + 1)).astype(np.float32)
        layer = Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
        out += amp * (np.asarray(layer, np.float32) / 255.0)
        total += amp
        amp *= persistence
    return out / total


def crack_paths(w, h, rng, n_main=3):
    paths = []

    def walk(x, y, ang, length, width, depth):
        pts = [(x, y)]
        step = 4
        heading = ang
        for _ in range(int(length / step)):
            # jagged locally, straight overall: noise plus pull back to heading
            ang += rng.normal(0, 0.55) + (heading - ang) * 0.35
            heading += rng.normal(0, 0.02)
            x += math.cos(ang) * step
            y += math.sin(ang) * step
            pts.append((x, y))
            if depth < 2 and rng.random() < 0.012:
                walk(x, y, ang + rng.choice([-1, 1]) * rng.uniform(0.5, 1.2),
                     length * rng.uniform(0.2, 0.45), max(1, width * 0.55), depth + 1)
        paths.append((pts, width))

    for i in range(n_main):
        x = rng.uniform(-0.1, 0.3) * w if i % 2 == 0 else rng.uniform(0.7, 1.1) * w
        y = rng.uniform(0.05, 0.95) * h
        ang = rng.uniform(-0.6, 0.6) if x < w / 2 else math.pi + rng.uniform(-0.6, 0.6)
        walk(x, y, ang, rng.uniform(0.7, 1.3) * max(w, h), rng.uniform(2.2, 3.6), 0)
    # hairlines
    for _ in range(14):
        walk(rng.uniform(0, w), rng.uniform(0, h), rng.uniform(0, 2 * math.pi),
             rng.uniform(80, 320), 1, 2)
    return paths


def concrete(w, h, seed):
    rng = np.random.default_rng(seed)
    n = fbm(w, h, rng, octaves=7, base=3)
    fine = fbm(w, h, rng, octaves=3, base=180, persistence=0.6)
    agg = fbm(w, h, rng, octaves=2, base=420, persistence=0.7)
    mott = fbm(w, h, rng, octaves=4, base=24, persistence=0.5)
    lum = 0.085 + 0.06 * n + 0.05 * (mott - 0.5) + 0.06 * (fine - 0.5) + 0.07 * (agg - 0.5)
    # pores
    pores = rng.random((h, w)) > 0.9975
    pores_img = Image.fromarray((pores * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
    lum -= 0.035 * (np.asarray(pores_img, np.float32) / 255.0)

    # raking light from upper left, falls off to near black
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    rake = np.clip(1.15 - (xx / w) * 0.75 - (yy / h) * 0.45, 0.25, 1.15)
    lum *= rake

    cracks = Image.new('L', (w, h), 0)
    edge = Image.new('L', (w, h), 0)
    dc, de = ImageDraw.Draw(cracks), ImageDraw.Draw(edge)
    for pts, width in crack_paths(w, h, rng):
        dc.line(pts, fill=255, width=int(round(width)), joint='curve')
        de.line([(x - 1.2, y - 1.6) for x, y in pts], fill=255, width=max(1, int(width * 0.6)))
    cr = np.asarray(cracks.filter(ImageFilter.GaussianBlur(0.8)), np.float32) / 255.0
    ed = np.asarray(edge.filter(ImageFilter.GaussianBlur(0.6)), np.float32) / 255.0
    lum = lum * (1 - 0.9 * cr) + 0.09 * ed * (1 - cr) * rake

    lum = np.clip(lum, 0, 1)
    warm = np.stack([lum * 1.0, lum * 0.93, lum * 0.86], -1)
    return Image.fromarray((warm * 255).astype(np.uint8), 'RGB')


def smoke(w, h, seed):
    rng = np.random.default_rng(seed + 11)
    n = fbm(w, h, rng, octaves=6, base=2, persistence=0.6)
    n2 = fbm(w, h, rng, octaves=4, base=5, persistence=0.5)
    s = np.clip((n * 0.7 + n2 * 0.3 - 0.45) * 2.4, 0, 1) ** 1.6
    yy = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    s *= np.clip(yy * 1.4 - 0.1, 0, 1)  # heavier near the floor
    a = (s * 120).astype(np.uint8)
    rgb = np.full((h, w, 3), (190, 182, 172), np.uint8)
    return Image.fromarray(np.dstack([rgb, a]), 'RGBA')


def grain(size, seed):
    rng = np.random.default_rng(seed + 23)
    g = rng.normal(128, 38, (size, size)).clip(0, 255).astype(np.uint8)
    return Image.fromarray(g, 'L')


def distress(size, seed):
    # mask for worn print: white = ink kept, transparent specks = worn
    rng = np.random.default_rng(seed + 31)
    n = fbm(size, size, rng, octaves=3, base=60, persistence=0.6)
    specks = rng.random((size, size))
    worn = (n > 0.66) & (specks > 0.55) | (specks > 0.9965)
    a = np.where(worn, 0, 255).astype(np.uint8)
    img = Image.fromarray(a, 'L').filter(ImageFilter.GaussianBlur(0.5))
    rgba = np.dstack([np.full((size, size, 3), 255, np.uint8), np.asarray(img)])
    return Image.fromarray(rgba, 'RGBA')


if __name__ == '__main__':
    out = sys.argv[1]
    seed = int(sys.argv[2]) if len(sys.argv) > 2 else 7
    os.makedirs(out, exist_ok=True)
    for w, h in [(1080, 1350), (1080, 1920)]:
        concrete(w, h, seed).save(os.path.join(out, f'concrete-{w}x{h}.png'))
        smoke(w + 400, h, seed).save(os.path.join(out, f'smoke-{w}x{h}.png'))
    grain(512, seed).save(os.path.join(out, 'grain.png'))
    distress(512, seed).save(os.path.join(out, 'distress.png'))
    print('plates written to', out)
