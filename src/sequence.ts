import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const FRAME_PATH = (i: number) => `/sequence/frame_${String(i).padStart(3, '0')}.webp`;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

export function initSequence() {
  const canvas = document.getElementById('sequenceCanvas') as HTMLCanvasElement | null;
  const heroEl = document.getElementById('hero');
  if (!canvas || !heroEl) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const frames: HTMLImageElement[] = [];
  const state = { frame: 0 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas!.width = canvas!.clientWidth * dpr;
    canvas!.height = canvas!.clientHeight * dpr;
  }

  function draw(index: number) {
    const img = frames[index] || frames[0];
    if (!img || !img.naturalWidth) return;

    const cw = canvas!.width;
    const ch = canvas!.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;

    let dw = cw;
    let dh = ch;
    if (cr > ir) {
      dh = cw / ir;
    } else {
      dw = ch * ir;
    }
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx!.clearRect(0, 0, cw, ch);
    ctx!.drawImage(img, dx, dy, dw, dh);
  }

  resize();
  window.addEventListener('resize', () => {
    resize();
    draw(Math.round(state.frame));
  });

  const contentEl = document.querySelector<HTMLElement>('.hero-content');
  const toplineEl = document.querySelector<HTMLElement>('.hero-topline');

  // The pin (and its spacer, which every later section's scroll math depends
  // on) must exist synchronously, in the same tick as the rest of the page's
  // ScrollTriggers — so it's created before any image has loaded, and frames
  // simply draw in as they arrive.
  // Every hero-pinned animation (frame scrub + copy fade) lives on this one
  // ScrollTrigger: a second ScrollTrigger on the same pinned element resolves
  // its "top top" start against the post-pin layout, not the original one,
  // which desyncs the timing — so everything drives off a single progress value.
  ScrollTrigger.create({
    trigger: heroEl,
    start: 'top top',
    end: '+=160%',
    scrub: 0.4,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      state.frame = self.progress * (FRAME_COUNT - 1);
      draw(Math.round(state.frame));

      const fadeProgress = gsap.utils.clamp(0, 1, self.progress / 0.55);
      const fade = 1 - fadeProgress;
      gsap.set([contentEl, toplineEl], { opacity: fade, y: -40 * fadeProgress });
    },
  });

  // Load first frame immediately so the hero paints without a blank flash,
  // then stream in the rest of the orbit sequence in the background.
  loadImage(FRAME_PATH(1)).then((img) => {
    frames[0] = img;
    draw(Math.round(state.frame));
  });

  Array.from({ length: FRAME_COUNT - 1 }, (_, i) => i + 2).forEach((n, idx) => {
    loadImage(FRAME_PATH(n)).then((img) => {
      frames[idx + 1] = img;
    });
  });
}
