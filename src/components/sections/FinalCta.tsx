import { useRef } from 'react';
import { Figure } from '../ui/Figure';
import { gsap, revealIn } from '../../lib/motion';
import { useIsoLayoutEffect, useReducedMotion } from '../../lib/hooks';
import './final-cta.css';

/** The last scene: one frame, held long, with the type sitting inside it. */
export function FinalCta() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    const cleanup = revealIn(root.current, { start: 'top 78%' });
    if (reduced) return cleanup;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-end-frame] img',
        { scale: 1.18, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, root);

    return () => {
      ctx.revert();
      cleanup();
    };
  }, [reduced]);

  return (
    <section className="end on-dark" ref={root} aria-labelledby="end-title">
      <div className="end__frame" data-end-frame>
        <Figure name="dunes-lone-figure" sizes="100vw" />
        <div className="end__veil" />
        <div className="grain" />
      </div>

      <div className="shell end__content">
        <h2 className="display display--tight end__title" id="end-title" data-reveal="mask">
          <span>Your India</span>
          <span className="italic">is waiting.</span>
        </h2>

        <div className="end__foot">
          <p className="meta end__ask" data-reveal="up">
            Ready to feel it?
          </p>
          <a className="cta cta--solid end__cta" href="#plan" data-reveal="up" data-reveal-delay="0.08">
            Plan my journey <span className="cta__arrow">→</span>
          </a>
          <p className="end__note" data-reveal="up" data-reveal-delay="0.14">
            Tell us the month and the feeling. We’ll send a route back within a day.
          </p>
        </div>
      </div>
    </section>
  );
}
