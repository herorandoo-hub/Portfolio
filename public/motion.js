/* motion.js — scroll animation modeled on the Pinterest reference video.
   Drop-in replacement for /public/motion.js. No libraries, content untouched.
   What it does:
   - Scroll-scrubbed reveal: blocks blur + rise + scale in as they enter, and soften as they leave
   - Hero zoom-in intro + parallax (styles in motion.css)
   - Floating 3D objects (rings, orbs, sparkles, chat bubble) drifting at different depths,
     spinning with scroll and reacting slightly to the mouse */
(() => {
  'use strict';

  const CONFIG = {
    // Anything matching this (outside #home) gets the scrubbed reveal.
    reveal: '.reveal, footer',
    // type: ring | orb | spark | bubble
    // size px, x = % of screen width, y = start % of screen height,
    // speed = scroll drift (bigger = moves faster = feels closer), depth 0..1 (1 = nearest)
    orbs: [
      { type: 'ring',   size: 140, x: 3,  y: 24, speed: 0.34, depth: 0.7, spin: 0.10 },
      { type: 'ring',   size: 76,  x: 91, y: 60, speed: 0.62, depth: 0.9, spin: -0.16, red: true },
      { type: 'orb',    size: 64,  x: 93, y: 18, speed: 0.48, depth: 0.6 },
      { type: 'orb',    size: 46,  x: 8,  y: 78, speed: 0.82, depth: 1,   dark: true },
      { type: 'spark',  size: 28,  x: 30, y: 42, speed: 0.70, depth: 0.5 },
      { type: 'spark',  size: 18,  x: 72, y: 12, speed: 0.44, depth: 0.3 },
      { type: 'bubble', size: 72,  x: 86, y: 90, speed: 0.26, depth: 0.5 },
      { type: 'ring',   size: 54,  x: 48, y: 96, speed: 0.90, depth: 1,   spin: 0.22, blur: 1.5 }
    ]
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.classList.add('mo-on');

  const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const SPARK = '<svg viewBox="0 0 24 24"><path fill="#f3e6c8" d="M12 0c.8 7 5 11.2 12 12-7 .8-11.2 5-12 12-.8-7-5-11.2-12-12 7-.8 11.2-5 12-12z"/></svg>';

  let vh = innerHeight, vw = innerWidth;
  let raf = 0;
  let mx = 0, my = 0, tmx = 0, tmy = 0;

  /* ---------- Scroll-scrubbed reveal ---------- */
  const items = new Map(); // el -> { v, ty, idx }

  function write(el, s) {
    if (s.v >= 0.995 && Math.abs(s.ty) < 0.3) {
      el.style.opacity = '1';
      el.style.translate = '';
      el.style.scale = '';
      el.style.filter = '';
    } else {
      el.style.opacity = clamp(s.v).toFixed(3);
      el.style.translate = '0 ' + s.ty.toFixed(1) + 'px';
      el.style.scale = (0.94 + 0.06 * clamp(s.v)).toFixed(4);
      el.style.filter = 'blur(' + ((1 - clamp(s.v)) * 14).toFixed(1) + 'px)';
    }
  }

  function setupReveal() {
    items.forEach((_, el) => { if (!el.isConnected) items.delete(el); });
    const counts = new Map();
    document.querySelectorAll(CONFIG.reveal).forEach((el) => {
      if (el.closest('#home') || items.has(el)) return;
      if (el.parentElement && el.parentElement.closest('.mo-item')) return; // no nesting
      const n = counts.get(el.parentElement) || 0;
      counts.set(el.parentElement, n + 1);
      const s = { v: 0, ty: 60, idx: n % 3 };
      items.set(el, s);
      el.classList.add('mo-item');
      write(el, s);
    });
    kick();
  }

  /* ---------- Floating 3D objects ---------- */
  const wrap = document.createElement('div');
  wrap.className = 'mo-orbs';
  const orbs = CONFIG.orbs.map((o, i) => {
    const el = document.createElement('div');
    el.className = 'mo-orb mo-orb-' + o.type + (o.dark ? ' mo-dark' : '') + (o.red ? ' mo-red' : '');
    el.style.width = el.style.height = o.size + 'px';
    el.style.left = o.x + '%';
    const blur = o.blur != null ? o.blur : (1 - o.depth) * 2.5;
    if (blur > 0.2) el.style.filter = 'blur(' + blur.toFixed(1) + 'px)';
    if (o.depth < 0.6) el.style.opacity = '.75';
    const bob = document.createElement('div');
    bob.className = 'mo-bob';
    bob.style.animationDelay = (-i * 0.9) + 's';
    const body = document.createElement('div');
    body.className = 'mo-body';
    if (o.type === 'spark') body.innerHTML = SPARK;
    if (o.type === 'bubble') body.innerHTML = '<i></i><i></i><i></i>';
    bob.appendChild(body);
    el.appendChild(bob);
    wrap.appendChild(el);
    return { el, body, i, ...o };
  });
  document.body.appendChild(wrap);

  /* ---------- Frame loop ---------- */
  function frame() {
    raf = 0;
    let busy = false;
    const y = window.scrollY;

    const hero = document.querySelector('#home');
    if (hero) hero.style.setProperty('--p', clamp(y / (vh * 0.9)).toFixed(3));

    items.forEach((s, el) => {
      const r = el.getBoundingClientRect();
      // Off-screen and settled: skip the work.
      const off = r.top > vh * 1.4 || r.bottom < -vh * 0.6;
      const stagger = s.idx * 0.035 * vh;
      const e = easeOut(clamp((vh * 0.98 - stagger - r.top) / (vh * 0.30)));
      const x = clamp((vh * 0.22 - r.bottom) / (vh * 0.22));
      const tv = e * (1 - 0.85 * x);
      const tty = (1 - e) * 60 - x * 28;
      if (off && Math.abs(s.v - tv) < 0.002 && Math.abs(s.ty - tty) < 0.2) return;
      s.v += (tv - s.v) * 0.16;
      s.ty += (tty - s.ty) * 0.16;
      if (Math.abs(tv - s.v) > 0.002 || Math.abs(tty - s.ty) > 0.2) busy = true;
      else { s.v = tv; s.ty = tty; }
      write(el, s);
    });

    mx += (tmx - mx) * 0.08;
    my += (tmy - my) * 0.08;
    if (Math.abs(tmx - mx) > 0.003 || Math.abs(tmy - my) > 0.003) busy = true;

    orbs.forEach((o) => {
      const span = vh + o.size * 2;
      const py = ((((o.y / 100) * vh - y * o.speed) % span) + span) % span - o.size;
      const sway = Math.sin(y * 0.0022 + o.i * 1.7) * 28 * o.depth;
      const px = sway + mx * 34 * o.depth;
      const pyy = py + my * 22 * o.depth;
      o.el.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + pyy.toFixed(1) + 'px,0)';
      if (o.type === 'ring') {
        const rx = 58 + Math.sin(y * 0.0018 + o.i) * 26 + my * 10;
        const ry = y * (o.spin || 0.12) + mx * 14;
        o.body.style.transform = 'rotateX(' + rx.toFixed(1) + 'deg) rotateY(' + ry.toFixed(1) + 'deg)';
      } else if (o.type === 'bubble' || o.type === 'orb') {
        o.body.style.transform = 'rotate(' + (Math.sin(y * 0.0015 + o.i) * 10).toFixed(1) + 'deg)';
      }
    });

    if (busy) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }

  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', () => { vh = innerHeight; vw = innerWidth; kick(); });
  addEventListener('pointermove', (ev) => {
    tmx = (ev.clientX / vw - 0.5) * 2;
    tmy = (ev.clientY / vh - 0.5) * 2;
    kick();
  }, { passive: true });

  /* ---------- Init (also catches content React renders late, e.g. portfolio filters) ---------- */
  setupReveal();
  kick();
  let t;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(setupReveal, 120); })
    .observe(document.body, { childList: true, subtree: true });
})();
