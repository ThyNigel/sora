// motion-carousel templates. Each template takes slide data and returns DOM,
// then registers pure t -> pixels animators on MC. Add a template by adding a
// function to TEMPLATES (see references/add-template.md).

(function () {
  const MC = window.MC;
  const FORMATS = {
    ig: { W: 1080, H: 1350, safe: { top: 92, bottom: 92, left: 84, right: 84 }, seamY: 1176 },
    tt: { W: 1080, H: 1920, safe: { top: 210, bottom: 480, left: 76, right: 168 }, seamY: 1372 },
  };

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const hash = (s) => {
    let h = 2166136261;
    for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return h >>> 0;
  };
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  // **word** -> <mark>, *word* -> <em>
  const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>').replace(/\*(.+?)\*/g, '<em>$1</em>');

  // shrink font until every line fits the safe width. Never below min.
  function fit(node, maxW, min) {
    let size = parseFloat(node.style.fontSize);
    const widest = () => Math.max(...[...node.querySelectorAll('.cut-line')].map((l) => l.scrollWidth), node.scrollWidth > maxW + 1 ? node.scrollWidth : 0);
    while (widest() > maxW && size > min) { size -= 2; node.style.fontSize = size + 'px'; }
    return size;
  }
  const safeW = (fmt) => fmt.W - fmt.safe.left - fmt.safe.right;

  // pose helper: a -> b at s1, back to a at s2 (loop close). Pure in t.
  function pose(t, s1, s2, a, b, preset) {
    return a + (b - a) * (MC.spring(t - s1, preset) - MC.spring(t - s2, preset));
  }

  // ---------- shared frame ----------
  function frame(ctx) {
    const { fmt, data, slide } = ctx;
    const root = el('div', 'frame');
    const s = fmt.safe;
    root.style.cssText = `--W:${fmt.W}px;--H:${fmt.H}px;--sl:${s.left}px;--sr:${s.right}px;--st:${s.top}px;--sb:${s.bottom}px;--distress:url('${data.distressURI || data.assets + '/plates/distress.png'}')`;
    const plate = el('div', 'layer plate');
    plate.style.backgroundImage = `url('${data.assets}/plates/concrete-${fmt.W}x${fmt.H}.png')`;
    const smokeA = el('div', 'layer smoke');
    smokeA.style.backgroundImage = `url('${data.assets}/plates/smoke-${fmt.W}x${fmt.H}.png')`;
    smokeA.style.right = '-400px';
    const embers = el('div', 'layer');
    const shade = el('div', 'layer shade');
    const safe = el('div', 'safe');
    const grain = el('div', 'layer grain');
    grain.style.backgroundImage = `url('${data.assets}/plates/grain.png')`;
    const vig = el('div', 'layer vignette');
    root.append(plate, smokeA, shade, embers, safe, grain, vig);

    // top bar: series label + page counter
    const bar = el('div', 'topbar');
    const left = el('div', 'mono', `<b>${esc(data.series)}</b>&nbsp;&nbsp;${esc(slide.kicker || '')}`);
    const right = el('div', 'mono', `${String(ctx.index + 1).padStart(2, '0')} / ${String(ctx.count).padStart(2, '0')}`);
    bar.append(left, right);
    safe.append(bar);

    // embers: periodic in L so loops close
    const rnd = MC.rng(hash(slide.id) ^ data.seed);
    const L = ctx.L;
    const list = [];
    const n = 14;
    for (let i = 0; i < n; i++) {
      const e = el('div', 'ember');
      const size = 2 + Math.round(rnd() * 4);
      e.style.width = e.style.height = size + 'px';
      embers.append(e);
      list.push({ e, x0: rnd() * fmt.W, y0: rnd() * fmt.H, rise: (1 + Math.floor(rnd() * 2)) * fmt.H * 0.18, sway: 6 + rnd() * 8, ph: rnd() * 6.283, op: 0.45 + rnd() * 0.4 });
    }
    MC.on((t) => {
      const k = (t % L) / L;
      plate.style.transform = `scale(1.06) translate(${MC.px(Math.sin(k * 6.283) * 8)}, ${MC.px(Math.cos(k * 6.283) * 5)})`;
      smokeA.style.transform = `translate(${MC.px(-200 + Math.sin(k * 6.283) * 60)}, ${MC.px(Math.cos(k * 6.283) * 10)})`;
      for (const p of list) {
        let y = p.y0 - p.rise * k * (p.rise > fmt.H * 0.2 ? 1 : 1);
        y = ((y % fmt.H) + fmt.H) % fmt.H;
        const x = p.x0 + Math.sin(k * 6.283 * 2 + p.ph) * p.sway;
        p.e.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        p.e.style.opacity = (p.op * (0.88 + 0.12 * Math.sin(k * 6.283 * 3 + p.ph))).toFixed(3);
      }
      grain.style.backgroundPosition = `${(Math.floor(t * 12) * 97) % 256}px ${(Math.floor(t * 12) * 61) % 256}px`;
    });
    return { root, safe, left };
  }

  // red line with seam support. x in frame coords. seamIn: starts at x=0
  // fully drawn (continuation from previous slide). seamOut: runs to W.
  function redline(ctx, root, opts) {
    const { fmt } = ctx;
    const y = opts.y != null ? opts.y : fmt.seamY;
    const x0 = opts.seamIn ? 0 : opts.x0;
    const x1 = opts.seamOut ? fmt.W : opts.x1;
    const line = el('div', 'redline');
    line.style.left = x0 + 'px';
    line.style.top = y + 'px';
    line.style.width = x1 - x0 + 'px';
    root.append(line);
    const start = opts.start || 0.3;
    MC.on((t) => {
      // seam continuation is already there on frame 0. Own segment draws on.
      const k = opts.seamIn && !opts.drawFull ? 1 : ctx.still ? 1 : MC.spring(t - start, 'snappy');
      line.style.transform = `scaleX(${Math.max(0, k).toFixed(4)})`;
    });
    return line;
  }

  function typeOn(ctx, node, text, start) {
    const cursor = '<span class="cursor"></span>';
    MC.on((t) => {
      if (ctx.still) return void (node.innerHTML = text);
      const n = Math.max(0, Math.floor((t - start) / 0.028));
      const shown = text.slice(0, n);
      const done = n >= text.length;
      const blink = done && t - start - text.length * 0.028 < 0.8 && Math.floor((t - start - text.length * 0.028) / 0.2) % 2 === 0;
      node.innerHTML = esc(shown) + (!done || blink ? cursor : '');
    });
  }

  // ---------- HOOK: CUTOUT ----------
  function hook(ctx) {
    const { fmt, slide } = ctx;
    const f = frame(ctx);
    // label hangs under the top bar, the hook block sits on the red rail
    const wrap = el('div');
    wrap.style.cssText = `position:absolute;left:0;right:0;bottom:${fmt.H - fmt.safe.bottom - fmt.seamY + 44}px`;
    const label = el('div', 'mono');
    label.style.cssText = 'position:absolute;left:0;top:64px';
    const h = el('div', 'display distress');
    h.style.fontSize = (fmt.H > 1500 ? slide.sizeTT || 230 : slide.sizeIG || 230) + 'px';
    const rnd = MC.rng(hash(slide.id + 'cut'));
    const letters = [];
    let order = 0;
    slide.lines.forEach((line) => {
      const ln = el('span', 'cut-line');
      line.split(' ').forEach((word, wi) => {
        const isAccent = slide.accent && word.replace(/[^\w$]/g, '') === slide.accent;
        const w = el('span', 'cut-word' + (isAccent ? ' accent' : ''));
        for (const ch of word) {
          const s = el('span', 'cut-letter', esc(ch));
          w.append(s);
          letters.push({ s, i: order++, accent: isAccent, rot0: (rnd() - 0.5) * 14, rest: (rnd() - 0.5) * 3, jit: rnd() });
        }
        if (wi) ln.append(document.createTextNode(' '));
        ln.append(w);
        order += 2; // word gap
      });
      h.append(ln);
    });
    const sub = el('div', 'sub');
    sub.style.marginTop = '44px';
    sub.style.maxWidth = '860px';
    sub.style.fontSize = (fmt.H > 1500 ? 42 : 38) + 'px';
    sub.innerHTML = rich(slide.sub || '');
    wrap.append(h, sub);
    f.safe.append(label, wrap);
    typeOn(ctx, label, slide.label || '', 0.1);

    MC.on((t) => {
      for (const L of letters) {
        let y, r, sh;
        if (ctx.still) {
          y = 0; r = L.rest; sh = 6;
        } else {
          const s1 = 0.2 + L.i * 0.045 * (0.9 + L.jit * 0.2) + (L.accent ? 0.35 : 0);
          const s2 = ctx.loop ? ctx.L - 0.9 + L.i * 0.01 : 1e9;
          const preset = L.accent ? 'heavy' : 'settle';
          const lift = L.accent ? -44 : -30;
          y = pose(t, s1, s2, lift, 0, preset);
          r = pose(t, s1, s2, L.rot0, L.rest, preset);
          sh = pose(t, s1, s2, 14, 6, preset);
        }
        L.s.style.transform = `translateY(${Math.round(y)}px) rotate(${r.toFixed(2)}deg)`;
        L.s.style.filter = `drop-shadow(${Math.round(sh * 0.66)}px ${Math.round(sh)}px 0 rgba(0,0,0,0.55))`;
      }
    });

    ctx.after(() => {
      let size = fit(h, safeW(fmt), 96);
      // and shrink until the block clears the label
      const floor = () => label.getBoundingClientRect().bottom + 48;
      while (wrap.getBoundingClientRect().top < floor() && size > 96) { size -= 4; h.style.fontSize = size + 'px'; }
      redline(ctx, f.root, { x0: fmt.safe.left, seamOut: true, start: 1.3 });
    });
    return f.root;
  }

  // ---------- BENCHMARK ----------
  function benchmark(ctx) {
    const { fmt, slide } = ctx;
    const f = frame(ctx);
    const wrap = el('div');
    wrap.style.cssText = `position:absolute;left:0;right:0;top:${fmt.H > 1500 ? 230 : 150}px`;
    const label = el('div', 'mono');
    label.style.marginBottom = '22px';
    const fig = el('div', 'fig distress');
    const size = fmt.H > 1500 ? slide.sizeTT || 560 : slide.sizeIG || 500;
    fig.style.fontSize = size + 'px';
    const cols = [];
    const rnd = MC.rng(hash(slide.id + 'fig'));
    for (const ch of slide.figure) {
      if (/\d/.test(ch)) {
        const col = el('span', 'col');
        col.style.height = size * 0.86 + 'px';
        const strip = el('span', 'strip');
        for (let d = 0; d <= 9; d++) strip.append(el('span', '', String(d)));
        col.append(strip);
        fig.append(col);
        cols.push({ strip, d: +ch, off: 3 + Math.floor(rnd() * 5), i: cols.length });
      } else {
        const sym = el('span', /[$%]/.test(ch) ? 'accent' : '', esc(ch));
        fig.append(sym);
      }
    }
    if (slide.unit) {
      const u = el('span', 'accent', esc(slide.unit));
      u.style.fontSize = '0.42em';
      u.style.marginLeft = '18px';
      u.style.lineHeight = '1.4';
      fig.append(u);
    }
    const claimWrap = el('div', 'claim-wrap sub');
    const cfs = fmt.H > 1500 ? 46 : 42;
    claimWrap.style.cssText += `;height:${Math.ceil((slide.claimLines || 2) * cfs * 1.3)}px;margin-top:40px;max-width:${safeW(fmt)}px;font-size:${cfs}px`;
    const claims = slide.claims.map((c) => {
      const n = el('div', 'claim', rich(c));
      claimWrap.append(n);
      return n;
    });
    const body = el('div', 'body');
    body.style.cssText = `margin-top:34px;max-width:870px;color:var(--cream-dim);font-size:${fmt.H > 1500 ? 38 : 34}px`;
    body.innerHTML = rich(slide.body || '');
    wrap.append(label, fig, claimWrap, body);
    f.safe.append(wrap);
    typeOn(ctx, label, slide.label || '', 0.1);
    const lh = size * 0.86;
    MC.on((t) => {
      for (const c of cols) {
        const target = -c.d * lh;
        let y;
        if (ctx.still) y = target;
        else {
          const from = -((c.d + c.off) % 10) * lh;
          const s2 = ctx.loop ? ctx.L - 0.8 : 1e9;
          y = pose(t, 0.15 + c.i * 0.06, s2, from, target, 'heavy');
        }
        c.strip.style.transform = `translateY(${Math.round(y)}px)`;
      }
      // rotate claims: A, B, (C), back to A
      const n = claims.length;
      const slot = ctx.still ? 0 : Math.max(0, t - 1.4);
      const per = 1.5;
      claims.forEach((node, i) => {
        let pos;
        if (ctx.still || n === 1) pos = i === 0 ? 0 : 1;
        else {
          const idx = Math.floor(slot / per);
          const cur = idx % (ctx.loop ? n : n);
          const local = slot - idx * per;
          const prev = (cur - 1 + n) % n;
          const k = idx === 0 ? 1 : MC.spring(local, 'snappy');
          if (i === cur) pos = 1 - k;
          else if (i === prev && idx > 0) pos = -k;
          else pos = 1;
          if (ctx.loop && t > ctx.L - 0.6) pos = i === 0 ? 1 - MC.spring(t - (ctx.L - 0.6), 'snappy') : i === cur ? -MC.spring(t - (ctx.L - 0.6), 'snappy') : 1;
        }
        node.style.transform = `translateY(${Math.round(pos * 60)}px)`;
        node.style.opacity = Math.abs(pos) < 0.98 ? 1 : 0;
      });
    });
    ctx.after(() => {
      redline(ctx, f.root, { seamIn: true, seamOut: true });
    });
    return f.root;
  }

  // ---------- proof card renderers ----------
  function proofCard(ctx, proof, w, h) {
    const card = el('div', 'card');
    if (proof.kind === 'image') {
      card.innerHTML = `<div class="card-head"><span class="dom">${esc(proof.domain || '')}</span><span class="tag">${esc(proof.tag || 'SCREENSHOT')}</span></div>`;
      const img = el('img', 'shot');
      img.src = proof.src;
      card.append(img);
    } else if (proof.kind === 'ai') {
      card.innerHTML = `<div class="card-head"><span class="dom">${esc(proof.tool)}</span><span class="tag">${esc(proof.tag || 'REAL OUTPUT')}</span></div>`;
      const body = el('div', 'card-body');
      body.innerHTML = `<div class="ai-prompt"><span class="lbl">MY PROMPT</span>${rich(proof.prompt)}</div><div class="ai-out"><span class="lbl">WHAT IT SAID</span></div>`;
      const out = body.querySelector('.ai-out');
      const lines = proof.output.map((l) => {
        const n = el('span', 'ln' + (l.startsWith('!') ? ' hl' : ''), l.replace(/^!/, '').split(' | ').map(rich).join('<span class="sep"> | </span>'));
        out.append(n);
        return n;
      });
      card.append(body);
      MC.on((t) => {
        lines.forEach((n, i) => {
          const s = 1.5 + i * 0.32;
          const v = ctx.still ? 1 : MC.clamp((t - s) / 0.1);
          n.style.opacity = v >= 1 ? 1 : v.toFixed(2);
        });
      });
    } else if (proof.kind === 'quotes') {
      card.innerHTML = `<div class="card-head"><span class="dom">${esc(proof.domain)}</span><span class="tag">${esc(proof.tag || 'OFFICIAL TEXT')}</span></div>`;
      const body = el('div', 'card-body');
      body.innerHTML = proof.quotes.map((q) => `<div class="qrow"><span class="who">${esc(q.who)}</span>\u201c${rich(q.text)}\u201d</div>`).join('');
      card.append(body);
    } else {
      card.innerHTML = `<div class="card-head"><span class="dom">${esc(proof.domain)}</span><span class="tag">${esc(proof.tag || 'OFFICIAL TEXT')}</span></div>`;
      const body = el('div', 'card-body', `<span class="q">“</span>${rich(proof.quote)}`);
      card.append(body);
    }
    if (proof.foot) card.append(el('div', 'card-foot', esc(proof.foot)));
    return card;
  }

  // ---------- TIP: RIFFLE + paper stack ----------
  function tip(ctx) {
    const { fmt, slide } = ctx;
    const tall = fmt.H > 1500;
    const f = frame(ctx);
    const col = el('div');
    col.style.cssText = `position:absolute;left:0;right:0;top:${tall ? 96 : 76}px`;
    const title = el('div', 'display distress');
    title.style.fontSize = (tall ? slide.titleTT || 104 : slide.titleIG || 96) + 'px';
    title.innerHTML = slide.title.map((l) => `<span class="cut-line">${esc(l).replace(new RegExp(`(${slide.accent || '^$'})`), '<span class="accent">$1</span>')}</span>`).join('');
    const action = el('div', 'body');
    action.style.cssText = `margin-top:${tall ? 34 : 26}px;max-width:900px;font-size:${tall ? 38 : 34}px`;
    action.innerHTML = rich(slide.action);
    col.append(title, action);
    f.safe.append(col);

    // deck + card, positioned in frame coords
    const deck = el('div', 'deck');
    const cw = tall ? safeW(fmt) : slide.cardW || 880;
    let ch = 0;
    const cx = tall ? fmt.safe.left : (fmt.W - cw) / 2;
    let cy = 0;
    deck.style.cssText = `left:${cx}px;width:${cw}px`;
    const rnd = MC.rng(hash(slide.id + 'deck'));
    const sheets = [0, 1, 2].map((i) => {
      const s = el('div', 'sheet');
      deck.append(s);
      return { s, i, x: (rnd() - 0.5) * 6 + 8 + i * 6, y: 6 + i * 5, r: (rnd() - 0.5) * 3.2 + (i % 2 ? 1.2 : -0.6) };
    });
    sheets.reverse().forEach((s) => deck.append(s.s));
    const card = proofCard(ctx, slide.proof, cw, ch);
    deck.append(card);
    f.root.insertBefore(deck, f.root.querySelector('.grain'));
    const restR = slide.cardRot != null ? slide.cardRot : -0.8;

    const src = el('div', 'mono');
    src.style.cssText = `position:absolute;left:${fmt.safe.left}px;top:${fmt.seamY + 22}px;right:${fmt.safe.right}px;white-space:nowrap`;
    f.root.insertBefore(src, f.root.querySelector('.grain'));
    typeOn(ctx, src, slide.sourceLine || '', 0.5);

    MC.on((t) => {
      const close = ctx.loop ? ctx.L - 0.8 : 1e9;
      sheets.forEach((s) => {
        let y = s.y, r = s.r;
        if (!ctx.still) {
          const st = 0.3 + s.i * 0.05;
          const flick = MC.spring(t - st, 'snappy') - MC.spring(t - st - 0.16, 'snappy');
          y = s.y - 30 * flick;
          r = s.r + (s.i % 2 ? 4 : -3) * flick;
        }
        s.s.style.transform = `translate(${Math.round(s.x)}px, ${Math.round(y)}px) rotate(${r.toFixed(2)}deg)`;
      });
      let x = 0, y = 0, r = restR, sh = 6;
      if (!ctx.still) {
        // card slides out from under the stack, lifts, lands
        x = pose(t, 0.75, close, -46, 0, 'settle');
        const lift = MC.spring(t - 0.75, 'snappy') - MC.spring(t - 1.05, 'settle');
        y = -10 * lift;
        r = pose(t, 0.75, close, -3, restR, 'settle');
        sh = 6 + 6 * Math.max(0, lift);
      }
      card.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px) rotate(${r.toFixed(2)}deg)`;
      card.style.boxShadow = `${Math.round(sh * 0.66)}px ${Math.round(sh)}px 0 rgba(0,0,0,0.5), 0 18px 40px rgba(0,0,0,0.35)`;
      // title lines rise in, snapped to whole px
      [...title.children].forEach((ln, i) => {
        // loops keep the title still so frame 0 reads. The sequence gets the rise.
        const v = ctx.still || ctx.loop ? 0 : pose(t, 0.05 + i * 0.07, 1e9, 26, 0, 'snappy');
        ln.style.transform = `translateY(${Math.round(v)}px)`;
      });
    });
    ctx.after(() => {
      fit(title, safeW(fmt), 64);
      const fr = f.root.getBoundingClientRect();
      cy = Math.round(action.getBoundingClientRect().bottom - fr.top + (tall ? 64 : 44));
      ch = fmt.seamY - 26 - cy;
      deck.style.top = cy + 'px';
      deck.style.height = ch + 'px';
      // shrink proof text until the card holds it, floor 24px
      const body = card.querySelector('.card-body');
      if (body) {
        let fs = parseFloat(getComputedStyle(body).fontSize);
        const foot = card.querySelector('.card-foot');
        const room = () => ch - (foot ? foot.offsetHeight : 0) - card.querySelector('.card-head').offsetHeight;
        const setFs = (v) => { body.style.fontSize = v + 'px'; body.querySelectorAll('.ai-prompt').forEach((n) => (n.style.fontSize = Math.max(24, v - 3) + 'px')); };
        const max = tall ? 40 : 36;
        while (body.scrollHeight <= room() - 24 && fs < max) { fs += 1; setFs(fs); }
        while (body.scrollHeight > room() && fs > 24) { fs -= 1; setFs(fs); }
      }
      redline(ctx, f.root, { seamIn: true, seamOut: true });
    });
    return f.root;
  }

  // ---------- CLOSE ----------
  function close(ctx) {
    const { fmt, slide } = ctx;
    const tall = fmt.H > 1500;
    const f = frame(ctx);
    const col = el('div');
    col.style.cssText = `position:absolute;left:0;right:0;top:${tall ? 120 : 90}px`;
    const h = el('div', 'display distress');
    h.style.fontSize = (tall ? 200 : 170) + 'px';
    h.innerHTML = slide.lines.map((l) => `<span class="cut-line">${esc(l).replace(new RegExp(`(${slide.accent || '^$'})`), '<span class="accent">$1</span>')}</span>`).join('');
    const sub = el('div', 'sub');
    sub.style.cssText = `margin-top:30px;max-width:880px;font-size:${tall ? 42 : 38}px`;
    sub.innerHTML = rich(slide.sub || '');
    const list = el('div', 'index-list');
    list.style.marginTop = tall ? '64px' : '44px';
    list.innerHTML = (slide.index || []).map((x, i) => `<div><b>${String(i + 1).padStart(2, '0')}</b>&nbsp;&nbsp;${esc(x)}</div>`).join('');
    col.append(h, sub, list);
    f.safe.append(col);
    const nfa = el('div', 'nfa');
    nfa.style.cssText = 'position:absolute;left:0;right:0;bottom:0';
    nfa.innerHTML = rich(slide.nfa || '');
    f.safe.append(nfa);
    MC.on((t) => {
      [...h.children].forEach((ln, i) => {
        const v = ctx.still ? 0 : pose(t, 0.1 + i * 0.08, ctx.loop ? ctx.L - 0.7 : 1e9, 30, 0, 'settle');
        ln.style.transform = `translateY(${Math.round(v)}px)`;
      });
      [...list.children].forEach((ln, i) => {
        const v = ctx.still ? 1 : MC.clamp((t - 0.6 - i * 0.07) / 0.12);
        ln.style.opacity = v.toFixed(2);
      });
    });
    ctx.after(() => {
      fit(h, safeW(fmt), 90);
      redline(ctx, f.root, { seamIn: true, x1: Math.round(fmt.W * 0.42) });
    });
    return f.root;
  }

  const TEMPLATES = { hook, benchmark, tip, close };

  // ---------- mount ----------
  MC.mount = function ({ data, slideId, format, mode }) {
    const fmt = FORMATS[format];
    const index = data.slides.findIndex((s) => s.id === slideId);
    const slide = data.slides[index];
    const afters = [];
    const ctx = {
      data, slide, fmt, index, count: data.slides.length,
      L: slide.duration || 5, loop: mode === 'loop', still: mode === 'still',
      after: (fn) => afters.push(fn),
    };
    MC.duration = ctx.L;
    document.body.style.width = fmt.W + 'px';
    document.body.style.height = fmt.H + 'px';
    const node = TEMPLATES[slide.type](ctx);
    document.body.append(node);
    afters.forEach((fn) => fn());
    MC.seek(ctx.still ? ctx.L : 0);
    return { W: fmt.W, H: fmt.H, duration: ctx.L, safe: fmt.safe };
  };
  MC.FORMATS = FORMATS;
})();
