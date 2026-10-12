// Scroll-triggered reveals and count-ups. Does nothing unless <html> has the
// .motion class (set in Layout when reduced motion is off).

const STAGGER_MS = 90;

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || el.dataset.counted) return;
  el.dataset.counted = 'true';
  const duration = 1600;
  const start = performance.now();
  const format = (n: number) => Math.round(n).toLocaleString('en-US');
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format(target * eased);
    if (t < 1) requestAnimationFrame(tick);
  };
  el.textContent = format(0);
  requestAnimationFrame(tick);
}

export function initMotion() {
  if (!document.documentElement.classList.contains('motion')) return;

  // Children of a stagger group reveal one after another
  for (const group of document.querySelectorAll<HTMLElement>('[data-stagger]')) {
    const base = Number(group.dataset.stagger) || 0;
    [...group.children].forEach((child, i) => {
      const el = child as HTMLElement;
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
      el.style.setProperty('--reveal-delay', String(base + i * STAGGER_MS));
    });
  }

  for (const el of document.querySelectorAll<HTMLElement>('[data-reveal][data-delay]')) {
    el.style.setProperty('--reveal-delay', el.dataset.delay ?? '0');
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        el.classList.add('in');
        // A stagger group reveals all its items together (with their delays),
        // so items clipped by a card edge still appear.
        if (el.hasAttribute('data-stagger')) {
          for (const child of el.children) child.classList.add('in');
        }
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
        if (el.dataset.count) countUp(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  const groups = [...document.querySelectorAll<HTMLElement>('[data-stagger]')];
  const inGroup = (el: Element) => groups.some((g) => g !== el && el.parentElement === g);
  document
    .querySelectorAll<HTMLElement>('[data-reveal], [data-count], [data-stagger]')
    .forEach((el) => {
      if (!inGroup(el)) observer.observe(el);
    });
}
