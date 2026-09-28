/* motion.js — works on top of any site (React/Vite included). No libraries needed.
   Edit CONFIG to change what animates. */
(() => {
  'use strict';

  const CONFIG = {
    // Elements that fade/blur in as you scroll. Adjust after inspecting your page.
    reveal: [
      'section h2', 'section h2 + p', 'section h3',
      'section article', 'section [class*="card"]', 'section [class*="project"]',
      'section form', 'footer'
    ],
    // Floating objects. size = px, x/y = start position in % of screen,
    // speed = drift speed (bigger = faster). Add "img" to use a transparent PNG instead of a sphere.
    orbs: [
      { size: 110, x: 6,  y: 20, speed: 0.30 },
      { size: 60,  x: 88, y: 40, speed: 0.55 },
      { size: 150, x: 80, y: 85, speed: 0.20 },
      { size: 40,  x: 22, y: 70, speed: 0.75 },
      { size: 80,  x: 55, y: 10, speed: 0.42 }
      // { size: 140, x: 70, y: 30, speed: 0.3, img: '/assets/my-3d-object.png' }
    ]
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('mo-on');

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('mo-in');
      io.unobserve(el);
      setTimeout(() => el.style.setProperty('--d', '0ms'), 1600); // no delay on hover later
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  function setupReveal() {
    const found = [...document.querySelectorAll(CONFIG.reveal.join(','))]
      .filter((el) => !el.dataset.mo && !el.closest('#home'));
    const set = new Set(found);
    const targets = found.filter((el) => {
      if (el.parentElement && el.parentElement.closest('.mo-reveal')) return false;
      for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
      return true;
    });
    const counts = new Map();
    targets.forEach((el) => {
      el.dataset.mo = '1';
      const n = counts.get(el.parentElement) || 0;
      counts.set(el.parentElement, n + 1);
      el.style.setProperty('--d', Math.min(n * 90, 450) + 'ms');
      el.classList.add('mo-reveal');
      io.observe(el);
    });
  }

  /* ---------- Floating orbs ---------- */
  const wrap = document.createElement('div');
  wrap.className = 'mo-orbs';
  const orbs = CONFIG.orbs.map((o) => {
    const el = document.createElement('div');
    el.className = 'mo-orb';
    el.style.width = el.style.height = o.size + 'px';
    el.style.left = o.x + '%';
    if (o.img) { const im = new Image(); im.src = o.img; im.alt = ''; el.appendChild(im); }
    else el.appendChild(document.createElement('i'));
    wrap.appendChild(el);
    return { el, ...o };
  });
  document.body.appendChild(wrap);

  /* ---------- Scroll loop ---------- */
  let ticking = false;
  function frame() {
    ticking = false;
    const y = window.scrollY, vh = window.innerHeight;
    const hero = document.querySelector('#home');
    if (hero) hero.style.setProperty('--p', Math.min(Math.max(y / (vh * 0.9), 0), 1).toFixed(3));
    orbs.forEach((o) => {
      const span = vh + o.size * 2;
      const py = ((((o.y / 100) * vh - y * o.speed) % span) + span) % span - o.size;
      o.el.style.transform = `translate3d(0, ${py.toFixed(1)}px, 0)`;
    });
  }
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  addEventListener('resize', frame);

  /* ---------- Init (also catches content React renders late) ---------- */
  setupReveal();
  frame();
  let t;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(setupReveal, 150); })
    .observe(document.body, { childList: true, subtree: true });
})();
