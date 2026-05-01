/* ============================================================
   VICKI LIN PERSONAL WEBSITE — script.js
   Handles: nav scroll state, mobile menu, active link tracking,
            scroll-reveal animations, footer year.
   ============================================================ */

/* ── Fluid font-size (RAF-throttled) ─────────────────────── */
// Breakpoints mirror CSS layout breakpoints.
// Rates derived from anchor sizes: 16px@1440px, 15px@768px, 14px@480px.
function calcRootFontSize(vw) {
  if (vw <= 480) return vw * 2.9167 / 100;   // 14px @ 480px
  if (vw <= 768) return vw * 1.953125 / 100; // 15px @ 768px
  return vw * 1.111 / 100;                   // 16px @ 1440px
}

let _rafId = null;

function scheduleRootFontUpdate() {
  if (_rafId) return;
  _rafId = requestAnimationFrame(() => {
    document.documentElement.style.fontSize =
      calcRootFontSize(document.documentElement.clientWidth) + 'px';
    _rafId = null;
  });
}

window.addEventListener('resize', scheduleRootFontUpdate, { passive: true });
scheduleRootFontUpdate(); // run once on load


/* ── Footer: current year ────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ── Nav: add .scrolled class when page is scrolled ─────── */
const nav = document.getElementById('nav');

function handleNavScroll() {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load


/* ── Mobile menu toggle ──────────────────────────────────── */
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when any nav link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the nav
  document.addEventListener('click', e => {
    if (nav && !nav.contains(e.target)) closeMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

function closeMenu() {
  if (!navLinks || !burger) return;
  navLinks.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}


/* ── Active nav link (highlights current section) ───────── */
const sections = Array.from(document.querySelectorAll('section[id]'));
const navItems = Array.from(document.querySelectorAll('.nav__link'));

function updateActiveNav() {
  let current = '';

  sections.forEach(section => {
    // Trigger when the top of the section is within the upper 35% of viewport
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= window.innerHeight * 0.35) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();


/* ── Scroll Reveal ───────────────────────────────────────── */
// Elements with class .reveal fade in + slide up when they enter the viewport.
// Siblings within the same parent get a staggered delay for a cascade effect.

const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const parent = el.parentElement;

      // Stagger siblings that share the same parent
      const siblings = parent
        ? Array.from(parent.querySelectorAll(':scope > .reveal'))
        : [];

      const index = siblings.indexOf(el);
      const delay = index >= 0 ? index * 80 : 0; // 80ms per sibling

      setTimeout(() => {
        el.classList.add('visible');
      }, delay);

      revealObserver.unobserve(el);
    });
  }, {
    threshold:  0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach(el => revealObserver.observe(el));

} else {
  // Fallback for older browsers: just show everything immediately
  revealEls.forEach(el => el.classList.add('visible'));
}


/* ── Back to top button ──────────────────────────────────── */
(function () {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>`;
  document.body.appendChild(btn);

  function toggleBtn() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', toggleBtn, { passive: true });
  toggleBtn();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ── Smooth scroll for anchor links (fallback for older browsers) ── */
// Modern browsers handle this via CSS `scroll-behavior: smooth`,
// but this ensures consistent behaviour in older environments.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = nav ? nav.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});
