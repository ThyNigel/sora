// motion-carousel runtime
// Every animation is a pure function of time t (seconds). Nothing reads the
// wall clock, so a renderer can seek to any frame and get the same pixels.
// That is what makes exports frame-drop free.

(function () {
  const MC = (window.MC = {});

  // ---------- springs ----------
  // Analytic damped harmonic oscillator, 0 -> 1. Same math as a physics
  // spring, solved in closed form so it can be sampled at any t.
  MC.SPRINGS = {
    snappy: { mass: 1, stiffness: 400, damping: 30 }, // labels, chips, UI
    settle: { mass: 1, stiffness: 170, damping: 18 }, // paper letters, cards
    heavy: { mass: 2.5, stiffness: 260, damping: 34 }, // giant figures
    drift: { mass: 1, stiffness: 20, damping: 9 }, // slow plates, parallax
  };

  MC.spring = function (t, preset) {
    const p = typeof preset === 'string' ? MC.SPRINGS[preset] : preset || MC.SPRINGS.settle;
    if (t <= 0) return 0;
    const w0 = Math.sqrt(p.stiffness / p.mass);
    const zeta = p.damping / (2 * Math.sqrt(p.stiffness * p.mass));
    if (zeta < 1) {
      const wd = w0 * Math.sqrt(1 - zeta * zeta);
      return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
    }
    // critically damped or over: treat as critical, it never overshoots
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  };

  // spring that starts at `start` seconds, mapped from a to b
  MC.sp = function (t, start, a, b, preset) {
    return a + (b - a) * MC.spring(t - start, preset);
  };

  MC.clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  MC.lerp = (a, b, k) => a + (b - a) * k;
  // cubic out, for opacity only. Positions always use springs.
  MC.fade = function (t, start, dur) {
    const k = MC.clamp((t - start) / dur);
    return 1 - Math.pow(1 - k, 3);
  };

  // ---------- seeded randomness ----------
  MC.rng = function (seed) {
    let s = seed >>> 0 || 1;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      let r = Math.imul(s ^ (s >>> 15), 1 | s);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  };

  // snap to whole device pixels so text never shimmers between frames
  MC.px = (v) => Math.round(v) + 'px';

  // ---------- registry ----------
  const animators = [];
  MC.on = function (fn) {
    animators.push(fn);
  };
  MC.duration = 5;
  MC.seek = function (t) {
    for (const fn of animators) fn(t);
    MC.t = t;
  };

  // HyperFrames-compatible handle: a paused "timeline" whose seek drives us.
  window.__timelines = window.__timelines || {};
  window.__timelines['motion-carousel'] = {
    paused: true,
    seek: (t) => MC.seek(t),
    duration: () => MC.duration,
  };
  window.__seek = (t) => MC.seek(t);
})();
