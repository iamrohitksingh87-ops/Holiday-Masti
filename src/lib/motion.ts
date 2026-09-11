import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'power3.out', duration: 1 });

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The house reveal: content rises into place once, then stays put.
 * Elements are marked in JSX with `data-reveal` so the resting state lives
 * in CSS and the page still reads correctly if this never runs.
 */
export function revealIn(scope: HTMLElement, opts: { start?: string } = {}) {
  // Reduced motion is handled in CSS by simply showing everything; there is
  // no point building ScrollTriggers whose results would be overridden.
  if (prefersReducedMotion()) return () => undefined;

  const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope);
  const cleanups: Array<() => void> = [];

  targets.forEach((el) => {
    const kind = el.dataset.reveal;
    const delay = Number(el.dataset.revealDelay ?? 0);
    const tween =
      kind === 'mask'
        ? gsap.to(el.children, {
            y: '0%',
            duration: 1.15,
            delay,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: opts.start ?? 'top 88%', once: true },
            onStart: () => gsap.set(el, { opacity: 1 }),
          })
        : gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: opts.start ?? 'top 88%', once: true },
          });

    cleanups.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/** Slow counter-drift on a full-bleed image inside an overflow-hidden frame. */
export function parallaxImage(el: HTMLElement, amount = 12) {
  const tween = gsap.fromTo(
    el,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
