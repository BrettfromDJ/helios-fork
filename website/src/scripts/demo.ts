// Shared engine for the scripted product walkthroughs (ProductDemo, SqlDemo).
// A demo is a fixed-size `.canvas` scaled to its container's width, with a
// fake cursor (DemoCursor.astro) that a `run` script moves and clicks. The
// script loops while the demo is on screen and is cancelled when it leaves.

export type Pt = { x: number; y: number };

export interface DemoKit {
  /** Element under the demo root (throws if missing) */
  $: (sel: string) => HTMLElement;
  /** Point inside an element, in canvas units */
  at: (el: Element, fx?: number, fy?: number) => Pt;
  pos: Pt;
  place: () => void;
  sleep: (ms: number, gen: number) => Promise<void>;
  moveTo: (to: Pt, ms: number, gen: number, easing?: (t: number) => number) => Promise<void>;
  click: (el: HTMLElement | null, gen: number) => Promise<void>;
}

interface Options {
  /** Canvas width in px; the canvas is scaled so this fills the container */
  width: number;
  /** Put every screen back to its first state */
  reset: (kit: DemoKit) => void;
  /** One pass of the walkthrough. Every await must pass `gen` through. */
  run: (kit: DemoKit, gen: number) => Promise<void>;
  /** Called whenever the cursor moves (e.g. for hover effects) */
  onMove?: (kit: DemoKit) => void;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function setupDemo(demo: HTMLElement, opts: Options) {
  const canvas = demo.querySelector<HTMLElement>('.canvas')!;
  const cursor = demo.querySelector<HTMLElement>('[data-cursor]')!;
  const ripple = demo.querySelector<HTMLElement>('[data-ripple]')!;

  let scale = 1;
  const fit = () => {
    scale = demo.clientWidth / opts.width;
    canvas.style.transform = `scale(${scale})`;
  };
  new ResizeObserver(fit).observe(demo);
  fit();

  // Reduced motion: the first screen stays as a still image
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let running = false;
  let generation = 0;

  const kit: DemoKit = {
    $: (sel) => demo.querySelector<HTMLElement>(sel)!,
    at: (el, fx = 0.5, fy = 0.5) => {
      const r = el.getBoundingClientRect();
      const c = canvas.getBoundingClientRect();
      return { x: (r.left - c.left + r.width * fx) / scale, y: (r.top - c.top + r.height * fy) / scale };
    },
    pos: { x: 0, y: 0 },
    place: () => {
      cursor.style.transform = `translate(${kit.pos.x}px, ${kit.pos.y}px)`;
      opts.onMove?.(kit);
    },
    sleep: (ms, gen) =>
      new Promise((res, rej) => setTimeout(() => (gen === generation ? res() : rej('stop')), ms)),
    moveTo: (to, ms, gen, easing = ease) =>
      new Promise((res, rej) => {
        const from = { ...kit.pos };
        const start = performance.now();
        const step = (now: number) => {
          if (gen !== generation) return rej('stop');
          const t = Math.min(1, (now - start) / ms);
          const e = easing(t);
          kit.pos.x = from.x + (to.x - from.x) * e;
          kit.pos.y = from.y + (to.y - from.y) * e;
          kit.place();
          t < 1 ? requestAnimationFrame(step) : res();
        };
        requestAnimationFrame(step);
      }),
    click: async (el, gen) => {
      cursor.classList.add('down');
      ripple.classList.remove('go');
      void ripple.offsetWidth; // restart the animation
      ripple.classList.add('go');
      el?.classList.add('pressed');
      await kit.sleep(160, gen);
      cursor.classList.remove('down');
      el?.classList.remove('pressed');
    },
  };

  const reset = () => {
    canvas.classList.remove('fade');
    opts.reset(kit);
    kit.place();
  };

  const loop = async () => {
    while (running) {
      const gen = generation;
      try {
        reset();
        await opts.run(kit, gen);
        // Fade out, then start over
        canvas.classList.add('fade');
        await kit.sleep(700, gen);
      } catch {
        return; // stopped or restarted
      }
    }
  };

  // Only play while on screen
  new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      if (visible && !running) {
        running = true;
        generation++;
        loop();
      } else if (!visible && running) {
        running = false;
        generation++;
        reset();
      }
    },
    { threshold: 0.3 },
  ).observe(demo);
}
