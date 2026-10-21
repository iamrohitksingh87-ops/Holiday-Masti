import { useCallback, useRef, useState } from 'react';
import { HeroFilm, type Shot } from './HeroFilm';
import { SoundToggle } from './SoundToggle';
import { ScrollCursor } from './ScrollCursor';
import { gsap, ScrollTrigger } from '../../lib/motion';
import { useIsoLayoutEffect, useReducedMotion } from '../../lib/hooks';
import './hero.css';

const SHOTS: Shot[] = [
  { image: 'lucknow-junction', place: 'Lucknow · Charbagh', time: '23:40' },
  { image: 'platform-lamps', place: 'Platform four', time: '00:55' },
  { image: 'carriage-motion', place: 'Somewhere past Ratlam', time: '03:55' },
  { image: 'railyard-dawn', place: 'First light, Gangetic plain', time: '05:40' },
  { image: 'dunes-camel-dusk', place: 'Thar · Rajasthan', time: '06:18' },
  { image: 'ganges-dawn-boats', place: 'Varanasi · Ganges', time: '06:41' },
];

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [shot, setShot] = useState(0);
  const onShotChange = useCallback((i: number) => setShot(i), []);

  const [introDone, setIntroDone] = useState(false);

  // The nav waits off-screen until the opening shot hands over to the page.
  // Set before the loader lifts, so it never flashes in and out again.
  useIsoLayoutEffect(() => {
    if (reduced) return;
    const html = document.documentElement;
    html.classList.add('hm-intro');
    return () => html.classList.remove('hm-intro');
  }, [reduced]);

  useIsoLayoutEffect(() => {
    if (!ready || !root.current) return;
    const scope = root.current;

    if (reduced) {
      gsap.set(scope.querySelectorAll('[data-hero-line] > span, [data-hero-fade]'), { y: 0, opacity: 1 });
      setIntroDone(true);
      return;
    }

    /*
     * The opening shot, in film grammar:
     *   the loader (already an establishing shot on Lucknow) lifts onto a
     *   closed aperture  →  it parts to a letterbox on Lucknow Junction while
     *   the camera dollies in and the exposure lifts  →  title cards sit in
     *   the bars  →  the frame opens to full bleed and the headline arrives.
     *   About 3.5 seconds; any scroll, click or key fast-forwards it, so
     *   nobody is ever held hostage by it.
     */
    const H = window.innerHeight;
    const W = window.innerWidth;
    // Anamorphic 2.39:1 on landscape screens; on a portrait phone that band
    // would be a sliver, so the letterbox there is nearly square instead.
    const aspect = W > H ? 2.39 : 0.95;
    const barH = Math.max(H * 0.08, (H - W / aspect) / 2);
    const half = H * 0.505;
    scope.style.setProperty('--bar-h', `${barH}px`);

    const q = (sel: string) => Array.from(scope.querySelectorAll<HTMLElement>(sel));
    const bars = q('[data-bar]');
    const lens = q('[data-hero-lens]');
    const exposure = q('[data-hero-exposure]');
    const barCards = q('[data-card-bar]');
    const lines = q('[data-hero-line] > span');
    const fades = q('[data-hero-fade]');
    const nav = document.querySelector<HTMLElement>('.nav');
    const html = document.documentElement;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Aperture parts to letterbox; the camera pushes in through it.
      tl.to(bars, { scaleY: barH / half, duration: 1.5, ease: 'expo.inOut' }, 0.05)
        .fromTo(lens, { scale: 1.3 }, { scale: 1, duration: 3.4, ease: 'power2.out' }, 0.05)
        .fromTo(exposure, { opacity: 0.85 }, { opacity: 0, duration: 2.4, ease: 'power1.out' }, 0.15)

        // Title cards live in the bars, never over the picture.
        .fromTo(barCards, { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.14 }, 0.9)
        .to(barCards, { opacity: 0, duration: 0.45 }, 2.0)

        // Full frame.
        .to(bars, { scaleY: 0, duration: 1.2, ease: 'expo.inOut' }, 2.1)
        .to(lines, { y: '0%', duration: 1.35, ease: 'expo.out', stagger: 0.085 }, 2.45)
        .to(fades, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09 }, 2.75);

      if (nav) {
        tl.call(() => html.classList.remove('hm-intro'), undefined, 2.5).fromTo(
          nav,
          { autoAlpha: 0, y: -14 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
          2.5
        );
      }

      // Never trap the visitor: any intent to move on plays it out at speed.
      const hurry = () => tl.timeScale(6);
      const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
      events.forEach((e) => window.addEventListener(e, hurry, { passive: true, once: true }));
      tl.eventCallback('onComplete', () => {
        events.forEach((e) => window.removeEventListener(e, hurry));
        setIntroDone(true);
      });

      // Arriving on a deep link (/#flights …) means the visitor wants to be
      // somewhere else — land them on the finished frame, not the overture.
      if (window.location.hash) tl.progress(1);

      // The frame keeps sinking as you leave it, so the hero hands over to
      // the next section instead of just scrolling away.
      gsap.to('[data-hero-film]', {
        yPercent: 12,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('[data-hero-content]', {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: '18% top', end: 'bottom top', scrub: true },
      });

      return () => events.forEach((e) => window.removeEventListener(e, hurry));
    }, scope);

    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      html.classList.remove('hm-intro');
    };
  }, [ready, reduced]);

  return (
    <section className="hero on-dark" ref={root} id="top">
      <div className="hero__film" data-hero-film>
        <div className="hero__lens" data-hero-lens>
          <HeroFilm shots={SHOTS} onShotChange={onShotChange} playing={introDone} />
        </div>
        <div className="hero__exposure" data-hero-exposure />
      </div>

      {/* The opening shot: two bars that part to a letterbox, then open. */}
      <div className="hero__aperture" aria-hidden="true">
        <div className="hero__bar hero__bar--top" data-bar />
        <div className="hero__bar hero__bar--bottom" data-bar />
        <p className="hero__card hero__card--top meta" data-card-bar>
          Holiday Masti presents
        </p>
        <p className="hero__card hero__card--bottom meta" data-card-bar>
          Reel one · India in motion
        </p>
      </div>

      <ScrollCursor active={introDone} />

      <div className="hero__content shell" data-hero-content>
        <p className="hero__label meta" data-hero-fade>
          India / In Motion
        </p>

        <h1 className="hero__title display display--tight">
          <span className="hero__line" data-hero-line>
            <span>India</span>
          </span>
          <span className="hero__line" data-hero-line>
            <span>is not</span>
          </span>
          <span className="hero__line hero__line--wide" data-hero-line>
            <span>a destination.</span>
          </span>
        </h1>

        <p className="hero__coda display" data-hero-fade>
          It’s a <span className="italic">feeling</span>.
        </p>

        <p className="hero__note" data-hero-fade>
          Unhurried journeys, planned around light and hours — never around a checklist.
        </p>

        <div className="hero__actions" data-hero-fade>
          <a className="cta cta--solid" href="#journeys">
            Begin the journey <span className="cta__arrow">→</span>
          </a>
          <a className="cta" href="#india">
            Explore India
          </a>
        </div>
      </div>

      <div className="hero__foot shell">
        <p className="hero__slate meta" data-hero-fade>
          <span className="hero__slate-time">{SHOTS[shot].time}</span>
          <span className="hero__slate-sep" aria-hidden="true" />
          <span>{SHOTS[shot].place}</span>
        </p>
        <SoundToggle />
      </div>
    </section>
  );
}
