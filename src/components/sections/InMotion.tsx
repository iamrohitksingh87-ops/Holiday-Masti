import { useRef } from 'react';
import { Figure } from '../ui/Figure';
import { gsap, parallaxImage, revealIn } from '../../lib/motion';
import { useIsoLayoutEffect, useReducedMotion } from '../../lib/hooks';
import './in-motion.css';

/**
 * The travelling section. Three plates at different depths drift past each
 * other as the page scrolls, and a line of place names slides the other way —
 * the visual grammar of looking out of a window, without moving the scrollbar.
 */
export function InMotion() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    const cleanups = [revealIn(root.current)];

    if (!reduced) {
      const ctx = gsap.context(() => {
        root.current?.querySelectorAll<HTMLElement>('[data-drift]').forEach((el) => {
          const img = el.querySelector<HTMLElement>('img');
          if (img) cleanups.push(parallaxImage(img, Number(el.dataset.drift ?? 10)));
        });

        gsap.fromTo(
          '[data-ribbon]',
          { xPercent: 4 },
          {
            xPercent: -34,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
            },
          }
        );
      }, root);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [reduced]);

  return (
    <section className="motion on-espresso" ref={root} aria-labelledby="motion-title">
      <div className="shell motion__head">
        <h2 className="display display--tight motion__title" id="motion-title" data-reveal="mask">
          <span>You don’t</span>
          <span>just visit</span>
          <span>India.</span>
        </h2>
      </div>

      <div className="motion__plates">
        <figure className="motion__plate motion__plate--a" data-drift="16">
          <div className="fig-frame">
            <Figure name="street-dust" sizes="(min-width: 900px) 48vw, 88vw" className="fig--parallax" />
          </div>
          <figcaption className="meta">Old Delhi · 07:15</figcaption>
        </figure>

        <figure className="motion__plate motion__plate--b" data-drift="26">
          <div className="fig-frame">
            <Figure name="woman-road" sizes="(min-width: 900px) 34vw, 66vw" className="fig--parallax" />
          </div>
          <figcaption className="meta">Grand Trunk Road · 09:20</figcaption>
        </figure>

        <figure className="motion__plate motion__plate--c" data-drift="10">
          <div className="fig-frame">
            <Figure name="door-view" sizes="(min-width: 900px) 30vw, 60vw" className="fig--parallax" />
          </div>
          <figcaption className="meta">Konkan Railway · 11:40</figcaption>
        </figure>
      </div>

      <div className="shell motion__foot">
        <h3 className="display display--tight motion__title motion__title--end" data-reveal="mask">
          <span>You move</span>
          <span className="italic">through it.</span>
        </h3>
        <p className="copy motion__copy" data-reveal="up">
          Nine hundred kilometres of coastline by train. A ferry that takes four minutes and costs
          nothing. A road that climbs to five thousand metres and then simply stops. In India the
          distance between two places is rarely the dull part of the trip — so we build the moving
          into the itinerary rather than trying to get it over with.
        </p>
      </div>

      <div className="motion__ribbon" aria-hidden="true">
        <p className="display" data-ribbon>
          Ratlam · Kota · Sawai Madhopur · Bharatpur · Mathura · Agra · Tundla · Kanpur · Prayagraj ·
          Mughalsarai ·
        </p>
      </div>
    </section>
  );
}
