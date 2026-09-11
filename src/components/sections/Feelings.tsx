import { useRef } from 'react';
import { Figure } from '../ui/Figure';
import { feelings } from '../../data/feelings';
import { gsap, revealIn } from '../../lib/motion';
import { useIsoLayoutEffect, useReducedMotion } from '../../lib/hooks';
import './feelings.css';

/**
 * The handover from the hero.
 *
 * A single frame opens out of a letterbox slit into full bleed while the
 * headline rises through it, so the film does not stop at the fold — it widens.
 * Everything is scrubbed off ordinary document scroll; nothing is pinned to the
 * visitor's wheel.
 */
function Opening() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    if (reduced) return;

    const scope = root.current;
    // Elements are resolved directly rather than through scoped selector
    // strings, so a combinator or a scoping rule can never quietly drop one.
    const frame = scope.querySelector<HTMLElement>('[data-opening-frame]');
    const picture = scope.querySelector<HTMLElement>('.opening__img');
    const words = Array.from(scope.querySelectorAll<HTMLElement>('[data-opening-line] > span'));
    if (!frame || !picture || words.length === 0) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            // The scope element itself — a gsap.context selector only ever
            // matches descendants, never the scope.
            trigger: scope,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          frame,
          { clipPath: 'inset(19% 13% 19% 13%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 1 }
        )
        .fromTo(picture, { scale: 1.22 }, { scale: 1.02, ease: 'power2.inOut', duration: 1 }, 0)
        // `y` with a percentage, not `yPercent`: the resting state is set in
        // CSS as translateY(118%), which GSAP reads back as a pixel offset —
        // animating yPercent would stack on top of it instead of replacing it.
        .fromTo(
          words,
          { y: '118%' },
          { y: '0%', ease: 'power3.out', stagger: 0.1, duration: 0.4 },
          0.05
        );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className="opening" ref={root} data-opening>
      <div className="opening__stage">
        <div className="opening__frame" data-opening-frame>
          {/* The push is driven by the scrub above, not by Figure. */}
          <Figure name="street-dust" sizes="100vw" className="opening__img" />
          <div className="opening__veil" />
          <div className="grain" />
        </div>

        <h2 className="opening__title display display--tight">
          <span className="opening__line" data-opening-line>
            <span>The way</span>
          </span>
          <span className="opening__line" data-opening-line>
            <span>India</span>
          </span>
          <span className="opening__line" data-opening-line>
            <span className="italic">feels.</span>
          </span>
        </h2>
      </div>
    </div>
  );
}

export function Feelings() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    const cleanup = revealIn(root.current);
    return cleanup;
  }, []);

  return (
    <section className="feelings on-dark" ref={root} id="feelings">
      <Opening />

      <div className="shell feelings__intro">
        <p className="meta" data-reveal="up">
          Six states of travel
        </p>
        <p className="lead feelings__lead" data-reveal="up" data-reveal-delay="0.08">
          India does not have one register. It has dozens, and they sit within a few hours of each
          other. Pick the one you actually need this year — the itinerary follows from that, not the
          other way round.
        </p>
      </div>

      <ol className="feelings__list">
        {feelings.map((feeling, i) => (
          <li className="feel" key={feeling.id}>
            <div className="shell feel__grid">
              <div className="feel__media" data-reveal="up">
                <div className="feel__frame">
                  <Figure
                    name={feeling.image}
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    ratio="4 / 5"
                  />
                </div>
                <span className="feel__word display" aria-hidden="true">
                  {feeling.word}
                </span>
              </div>

              <div className="feel__text">
                <p className="meta feel__index" data-reveal="up">
                  {String(i + 1).padStart(2, '0')} — {feeling.place}
                </p>
                <h3 className="display feel__line" data-reveal="up" data-reveal-delay="0.06">
                  {feeling.line}
                </h3>
                <p className="copy feel__copy" data-reveal="up" data-reveal-delay="0.12">
                  {feeling.copy}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
