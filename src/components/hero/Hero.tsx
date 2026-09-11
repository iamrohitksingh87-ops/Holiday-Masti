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

  useIsoLayoutEffect(() => {
    if (!ready || !root.current) return;

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap
          .timeline({ delay: 0.15 })
          .to('[data-hero-line] > span', {
            y: '0%',
            duration: 1.35,
            ease: 'expo.out',
            stagger: 0.085,
          })
          .to(
            '[data-hero-fade]',
            { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09 },
            '-=0.85'
          );

        // The frame keeps sinking as you leave it, so the hero hands over to
        // the next section instead of just scrolling away.
        gsap.to('[data-hero-film]', {
          yPercent: 12,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to('[data-hero-content]', {
          yPercent: -18,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: '18% top',
            end: 'bottom top',
            scrub: true,
          },
        });
      } else {
        gsap.set('[data-hero-line] > span, [data-hero-fade]', { y: 0, opacity: 1 });
      }
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section className="hero on-dark" ref={root} id="top">
      <div className="hero__film" data-hero-film>
        <HeroFilm shots={SHOTS} onShotChange={onShotChange} />
      </div>

      <ScrollCursor active={ready} />

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
