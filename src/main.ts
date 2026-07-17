import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initSequence } from './sequence.ts';

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------- smooth scroll ---------------------------------- */

const lenis = new Lenis({
  duration: 1.15,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* ---------------------------------- kinetic hero intro ---------------------------------- */

function splitLetters(el: Element) {
  const text = el.textContent ?? '';
  el.innerHTML = '';
  return [...text].map((char) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    span.textContent = char;
    el.appendChild(span);
    return span;
  });
}

function heroIntro() {
  const titleLine = document.querySelector('[data-line]');
  const letters = titleLine ? splitLetters(titleLine) : [];

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.from(letters, {
    yPercent: 130,
    rotate: 8,
    opacity: 0,
    duration: 1.1,
    stagger: 0.06,
  })
    .from(
      '.hero-topline .eyebrow',
      { opacity: 0, y: -12, duration: 0.7 },
      '-=0.7',
    )
    .from('.hero-sub', { opacity: 0, y: 16, duration: 0.8 }, '-=0.6')
    .from('.scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.4');
}

/* ---------------------------------- nav behaviour ---------------------------------- */

function navBehaviour() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastY = 0;

  lenis.on('scroll', ({ scroll }: { scroll: number }) => {
    nav.classList.toggle('nav-condensed', scroll > 40);
    if (scroll > lastY && scroll > 200) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastY = scroll;
  });

  const burger = document.getElementById('navBurger');
  const links = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    links?.classList.toggle('nav-links-open');
  });
  links?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      burger?.classList.remove('is-open');
      links.classList.remove('nav-links-open');
    }),
  );
}

/* ---------------------------------- stat counters ---------------------------------- */

function statCounters() {
  document.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
    const target = parseFloat(el.dataset.target ?? '0');
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const decimals = target % 1 !== 0 ? 1 : 0;
    const counter = { value: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
          },
        });
      },
    });
  });
}

/* ---------------------------------- pillars pinned reveal ---------------------------------- */

function pillarsReveal() {
  const stage = document.querySelector('.pillars-stage');
  const pillars = gsap.utils.toArray<HTMLElement>('.pillar');
  const screens = gsap.utils.toArray<HTMLElement>('.screen');
  if (!stage || !pillars.length) return;

  const screenBase = screens.map((_, i) => ({
    rotateY: i % 2 === 0 ? 10 : -10,
    rotateX: 4,
    y: -20,
  }));

  // Single ScrollTrigger driving both the active-pillar swap and the screen
  // parallax — see the note in sequence.ts on why a second trigger on the
  // same pinned element can't be trusted to share its timing.
  ScrollTrigger.create({
    trigger: '.pillars',
    start: 'top top',
    end: `+=${pillars.length * 60}%`,
    pin: stage,
    scrub: 0.5,
    onUpdate: (self) => {
      const idx = Math.min(
        pillars.length - 1,
        Math.floor(self.progress * pillars.length),
      );
      pillars.forEach((p, i) => p.classList.toggle('is-active', i === idx));

      screens.forEach((screen, i) => {
        const base = screenBase[i];
        gsap.set(screen, {
          rotateY: base.rotateY * self.progress,
          rotateX: base.rotateX * self.progress,
          y: base.y * self.progress,
        });
      });
    },
  });
}

/* ---------------------------------- project card tilt ---------------------------------- */

function projectTilt() {
  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
    const media = card.querySelector<HTMLElement>('.project-media');
    if (!media) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(media, {
        rotateX: py * -8,
        rotateY: px * 8,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(media, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    });
  });
}

/* ---------------------------------- closer parallax ---------------------------------- */

function closerParallax() {
  gsap.to('.closer-glow-l', {
    y: 120,
    ease: 'none',
    scrollTrigger: { trigger: '.closer', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
  });
  gsap.to('.closer-glow-r', {
    y: -120,
    ease: 'none',
    scrollTrigger: { trigger: '.closer', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
  });

  gsap.from('.closer-content', {
    scale: 0.86,
    opacity: 0,
    filter: 'blur(6px)',
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.closer', start: 'top 65%' },
  });
}

/* ---------------------------------- boot ---------------------------------- */

heroIntro();
navBehaviour();
projectTilt();

// Bebas Neue / Manrope swap in after first paint and reflow hero/heading
// sizes, which would desync every scroll-position measurement below if we
// built the ScrollTriggers before the fonts settle. Wait for them first.
document.fonts.ready.then(() => {
  requestAnimationFrame(() => {
    // hero's pin (and its spacer) must be created before anything below,
    // since every later trigger's scroll math is measured against it.
    initSequence();
    statCounters();
    pillarsReveal();
    closerParallax();
    ScrollTrigger.refresh();
  });
});

if (import.meta.env.DEV) {
  Object.assign(window, { __lenis: lenis, __ScrollTrigger: ScrollTrigger });
}
