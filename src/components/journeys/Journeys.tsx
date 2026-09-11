import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Figure } from '../ui/Figure';
import { journeys } from '../../data/journeys';
import { revealIn } from '../../lib/motion';
import { useFinePointer, useIsDesktop, useIsoLayoutEffect, useReducedMotion } from '../../lib/hooks';
import './journeys.css';

/**
 * Five journeys as an index, not a card grid.
 *
 * On a pointer device the row you are reading brings its own frame with it,
 * trailing the cursor. On touch and on small screens the frame simply sits in
 * the row, because there is no cursor to trail and the picture should not be
 * hidden behind an interaction nobody can perform.
 */
export function Journeys() {
  const root = useRef<HTMLElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const fine = useFinePointer();
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const trailing = fine && desktop && !reduced;

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    return revealIn(root.current);
  }, []);

  useEffect(() => {
    if (!trailing) return;
    const el = peek.current;
    const section = root.current;
    if (!el || !section) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let seeded = false;

    const onMove = (e: PointerEvent) => {
      const box = section.getBoundingClientRect();
      targetX = e.clientX - box.left;
      targetY = e.clientY - box.top;
      if (!seeded) {
        x = targetX;
        y = targetY;
        seeded = true;
      }
    };

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    section.addEventListener('pointermove', onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [trailing]);

  const activeJourney = journeys.find((j) => j.slug === active);

  return (
    <section className="jrn section" ref={root} id="journeys" aria-labelledby="jrn-title">
      <div className="shell jrn__head">
        <p className="meta" data-reveal="up">
          Curated journeys
        </p>
        <h2 className="display display--tight jrn__title" id="jrn-title" data-reveal="mask">
          <span>Not just</span>
          <span>a holiday.</span>
          <span className="italic">A journey.</span>
        </h2>
        <p className="copy jrn__intro" data-reveal="up" data-reveal-delay="0.1">
          Five routes we run often enough to know them properly — which hour to arrive, which drive
          to break, which room to ask for. Every one of them can be pulled apart and rebuilt around
          you.
        </p>
      </div>

      <ol className="jrn__list shell" onPointerLeave={() => setActive(null)}>
        {journeys.map((journey, i) => (
          <li key={journey.slug} className={`jrn__row${active === journey.slug ? ' is-active' : ''}`}>
            <Link
              to={`/journeys/${journey.slug}`}
              className="jrn__link"
              onPointerEnter={() => setActive(journey.slug)}
              onFocus={() => setActive(journey.slug)}
              onBlur={() => setActive(null)}
            >
              <span className="jrn__no meta">{String(i + 1).padStart(2, '0')}</span>

              <span className="jrn__name display">{journey.title}</span>

              <span className="jrn__inline" aria-hidden={trailing}>
                <Figure name={journey.card} sizes="(min-width: 900px) 30vw, 92vw" ratio="16 / 10" />
              </span>

              <span className="jrn__about">
                <span className="jrn__region meta">{journey.region}</span>
                <span className="jrn__tag">{journey.tagline}</span>
              </span>

              <span className="jrn__nights meta">{journey.nights}</span>

              <span className="jrn__go meta">
                Explore journey <span className="cta__arrow">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {trailing && (
        <div className={`jrn__peek${activeJourney ? ' is-live' : ''}`} ref={peek} aria-hidden="true">
          {activeJourney && (
            <Figure key={activeJourney.slug} name={activeJourney.card} sizes="26vw" ratio="4 / 5" />
          )}
        </div>
      )}
    </section>
  );
}
