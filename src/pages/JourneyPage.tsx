import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Figure } from '../components/ui/Figure';
import { journeys, journeyBySlug } from '../data/journeys';
import { gsap, revealIn } from '../lib/motion';
import { useIsoLayoutEffect, useReducedMotion } from '../lib/hooks';
import { NotFound } from './NotFound';
import './journey.css';

export function JourneyPage() {
  const { slug } = useParams();
  const journey = slug ? journeyBySlug(slug) : undefined;
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (journey) document.title = `${journey.title} · ${journey.nights} — Holiday Masti`;
    return () => {
      document.title = "Holiday Masti — India is not a destination. It's a feeling.";
    };
  }, [journey]);

  useIsoLayoutEffect(() => {
    if (!root.current || !journey) return;
    const cleanup = revealIn(root.current);
    if (reduced) return cleanup;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 })
        .to('[data-jp-line] > span', { y: '0%', duration: 1.2, ease: 'expo.out', stagger: 0.08 })
        .to('[data-jp-fade]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, '-=0.7');

      gsap.to('[data-jp-hero] img', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '[data-jp-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);

    return () => {
      ctx.revert();
      cleanup();
    };
  }, [journey, reduced]);

  if (!journey) return <NotFound />;

  const next = journeys[(journeys.findIndex((j) => j.slug === journey.slug) + 1) % journeys.length];

  return (
    <div className="jp" ref={root}>
      <header className="jp__hero on-dark">
        <div className="jp__hero-frame" data-jp-hero>
          <Figure name={journey.hero} sizes="100vw" priority />
          <div className="jp__hero-veil" />
          <div className="grain" />
        </div>

        <div className="shell jp__hero-body">
          <Link to="/#journeys" className="meta jp__back" data-jp-fade>
            ← All journeys
          </Link>

          <h1 className="display display--tight jp__title">
            <span className="jp__line" data-jp-line>
              <span>{journey.title}</span>
            </span>
          </h1>

          <p className="jp__tagline display" data-jp-fade>
            {journey.tagline}
          </p>

          <dl className="jp__facts" data-jp-fade>
            <div>
              <dt className="meta">Route</dt>
              <dd>{journey.region}</dd>
            </div>
            <div>
              <dt className="meta">Duration</dt>
              <dd>{journey.nights}</dd>
            </div>
            <div>
              <dt className="meta">Best</dt>
              <dd>{journey.best}</dd>
            </div>
            <div>
              <dt className="meta">Pace</dt>
              <dd>{journey.pace}</dd>
            </div>
            <div>
              <dt className="meta">From</dt>
              <dd className="jp__price">{journey.from}</dd>
            </div>
          </dl>

          <a className="cta cta--solid jp__cta" href="#enquire" data-jp-fade>
            Plan this journey <span className="cta__arrow">→</span>
          </a>
        </div>
      </header>

      <section className="section jp__intro" aria-label="Introduction">
        <div className="shell jp__intro-grid">
          <p className="display jp__standfirst" data-reveal="up">
            {journey.standfirst}
          </p>
          <p className="copy jp__intro-copy" data-reveal="up" data-reveal-delay="0.08">
            {journey.intro}
          </p>
        </div>
      </section>

      <section className="jp__gallery" aria-label="Gallery">
        <ul>
          {journey.gallery.map((image, i) => (
            <li key={image} className={`jp__plate jp__plate--${i % 3}`} data-reveal="up">
              <Figure name={image} sizes="(min-width: 900px) 44vw, 88vw" />
            </li>
          ))}
        </ul>
      </section>

      <section className="section jp__days on-espresso" aria-labelledby="jp-itinerary">
        <div className="shell">
          <div className="jp__section-head">
            <p className="meta" data-reveal="up">
              Day by day
            </p>
            <h2 className="display jp__h2" id="jp-itinerary" data-reveal="up">
              The shape of it.
            </h2>
          </div>

          <ol className="jp__day-list">
            {journey.itinerary.map((day) => (
              <li className="jp__day" key={day.day} data-reveal="up">
                <span className="meta jp__day-no">Day {day.day}</span>
                <h3 className="display jp__day-title">{day.title}</h3>
                <p className="copy jp__day-copy">{day.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section jp__stays" aria-labelledby="jp-stays">
        <div className="shell">
          <div className="jp__section-head">
            <p className="meta" data-reveal="up">
              Where you sleep
            </p>
            <h2 className="display jp__h2" id="jp-stays" data-reveal="up">
              Rooms with a reason.
            </h2>
          </div>

          <ul className="jp__stay-list">
            {journey.stays.map((stay) => (
              <li key={stay.name} data-reveal="up">
                <p className="meta jp__stay-place">{stay.place}</p>
                <h3 className="display jp__stay-name">{stay.name}</h3>
                <p className="copy">{stay.note}</p>
              </li>
            ))}
          </ul>

          <div className="jp__moments" data-reveal="up">
            <p className="meta">Three things you’ll describe afterwards</p>
            <ul>
              {journey.moments.map((moment) => (
                <li key={moment} className="display">
                  {moment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section jp__terms on-dark" id="enquire" aria-labelledby="jp-terms">
        <div className="shell jp__terms-grid">
          <div className="jp__terms-col" data-reveal="up">
            <h2 className="meta" id="jp-terms">
              Included
            </h2>
            <ul>
              {journey.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="jp__terms-col" data-reveal="up" data-reveal-delay="0.06">
            <h2 className="meta">Not included</h2>
            <ul className="jp__terms-col--out">
              {journey.excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="jp__book" data-reveal="up" data-reveal-delay="0.12">
            <p className="meta">From</p>
            <p className="display jp__book-price">{journey.from}</p>
            <p className="jp__book-note">
              Per person, twin share, land only. Rebuilt around your dates, your pace and your
              budget — the number moves with the plan.
            </p>
            <a className="cta cta--solid" href="/#plan">
              Plan this journey <span className="cta__arrow">→</span>
            </a>
            <a className="cta jp__book-alt" href="mailto:hello@holidaymasti.in">
              Or email the studio
            </a>
          </div>
        </div>
      </section>

      <Link to={`/journeys/${next.slug}`} className="jp__next on-espresso">
        <div className="shell jp__next-inner">
          <span className="meta">Next journey</span>
          <span className="display jp__next-name">
            {next.title} <span className="cta__arrow">→</span>
          </span>
          <span className="meta jp__next-nights">{next.nights}</span>
        </div>
      </Link>
    </div>
  );
}
