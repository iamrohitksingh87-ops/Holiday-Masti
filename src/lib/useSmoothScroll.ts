import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger, gsap } from './motion';

/**
 * Lenis earns its place here: the whole site is built on long scroll-linked
 * scenes, and native wheel stepping makes those look mechanical. It is turned
 * off entirely for reduced-motion visitors and never touches touch scrolling,
 * so nobody is trapped in a non-native scroller.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [enabled]);
}
