import { useRef, useState } from 'react';
import { Figure } from '../ui/Figure';
import { experiences } from '../../data/experiences';
import { gsap, ScrollTrigger, revealIn } from '../../lib/motion';
import { useIsDesktop, useIsoLayoutEffect, useReducedMotion } from '../../lib/hooks';
import './experiences.css';

/**
 * The horizontal gallery.
 *
 * Vertical scrolling drives a horizontal stage, and that is the only trick in
 * it. The wheel is never intercepted: ScrollTrigger pins the stage and adds a
 * spacer exactly as tall as the horizontal distance, so the page keeps
 * scrolling normally, the last panel clears the viewport before the section
 * ends, and nothing empty is left underneath. Below 1024px the whole mechanism
 * is dropped for a vertical read.
 */
export function Experiences() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    const cleanupReveal = revealIn(root.current);
    if (!desktop || reduced || !track.current) return cleanupReveal;

    const el = track.current;
    const section = root.current;

    const ctx = gsap.context(() => {
      // Measured at refresh time, so resizing and late-loading images are safe.
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    }, root);

    // Panel widths depend on fonts and images; remeasure once both have landed.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
      cleanupReveal();
    };
  }, [desktop, reduced]);

  // Off the horizontal stage every panel is already on the page, so the
  // counter reports the whole set rather than a position in it.
  const horizontal = desktop && !reduced;
  const shown = horizontal
    ? Math.min(experiences.length, Math.floor(progress * experiences.length) + 1)
    : experiences.length;

  return (
    <section className="exp on-dark" ref={root} id="experiences" aria-labelledby="exp-title">
      <div className="exp__inner">
        <div className="shell exp__head">
          <div>
            <p className="meta" data-reveal="up">
              Five ways in
            </p>
            <h2 className="display display--tight exp__title" id="exp-title" data-reveal="mask">
              <span>How do you</span>
              <span>want to</span>
              <span className="italic">feel India?</span>
            </h2>
          </div>

          <div className="exp__progress" aria-hidden="true">
            <span className="meta">
              {String(shown).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
            </span>
            <span className="exp__bar">
              <i style={{ transform: `scaleX(${horizontal ? progress : 1})` }} />
            </span>
          </div>
        </div>

        <ol className="exp__track" ref={track}>
          {experiences.map((exp) => (
            <li className="exp__panel" key={exp.index}>
              <article>
                <div className="exp__frame">
                  <Figure name={exp.image} sizes="(min-width: 1024px) 46vw, 92vw" />
                  <span className="exp__hour meta">{exp.hour}</span>
                </div>
                <div className="exp__meta">
                  <p className="exp__index display">{exp.index}</p>
                  <div>
                    <h3 className="display exp__name">{exp.title}</h3>
                    <p className="meta exp__place">{exp.place}</p>
                    <p className="copy exp__copy">{exp.copy}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
