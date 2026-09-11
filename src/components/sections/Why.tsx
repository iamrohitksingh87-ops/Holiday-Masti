import { useRef } from 'react';
import { Figure } from '../ui/Figure';
import { revealIn } from '../../lib/motion';
import { useIsoLayoutEffect } from '../../lib/hooks';
import './why.css';

const PRINCIPLES = [
  {
    label: 'Fewer places',
    text: 'Most itineraries are too full. We cut them until what is left can actually be enjoyed, then we protect the gaps.',
  },
  {
    label: 'The right hour',
    text: 'Half of what makes a place unforgettable is when you stand in it. We plan around light and crowds, not around opening times.',
  },
  {
    label: 'People, not suppliers',
    text: 'A guide in Varanasi who grew up on those steps. A driver in Ladakh who has done that pass three hundred times. We use the same ones every trip.',
  },
  {
    label: 'Rooms with a reason',
    text: 'Nine-room havelis, planters’ bungalows, a boat with two cabins. Occasionally a big hotel, when the big hotel is genuinely the best thing there.',
  },
  {
    label: 'Someone awake',
    text: 'One number, one person, your whole trip — in your timezone when you land and in ours when you need something at four in the morning.',
  },
];

export function Why() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    return revealIn(root.current);
  }, []);

  return (
    <section className="why section on-espresso" ref={root} id="about" aria-labelledby="why-title">
      <div className="shell why__grid">
        <div className="why__lede">
          <p className="meta" data-reveal="up">
            Why Holiday Masti
          </p>
          <h2 className="display display--tight why__title" id="why-title" data-reveal="mask">
            <span>Not more</span>
            <span>trips.</span>
            <span className="italic">Better memories.</span>
          </h2>
          <p className="lead why__lead" data-reveal="up" data-reveal-delay="0.1">
            We are a small studio in India that plans a limited number of journeys a year. That is
            the whole business model, and everything else follows from it.
          </p>
        </div>

        <figure className="why__plate why__plate--tall" data-reveal="up">
          <Figure name="portrait-woman" sizes="(min-width: 900px) 30vw, 88vw" ratio="3 / 4" />
          <figcaption className="meta">Bundi, on the way to somewhere else</figcaption>
        </figure>

        <dl className="why__list">
          {PRINCIPLES.map((item, i) => (
            <div className="why__item" key={item.label} data-reveal="up" data-reveal-delay={i * 0.04}>
              <dt>
                <span className="why__no meta">{String(i + 1).padStart(2, '0')}</span>
                <span className="why__label display">{item.label}</span>
              </dt>
              <dd className="copy">{item.text}</dd>
            </div>
          ))}
        </dl>

        <figure className="why__plate why__plate--wide" data-reveal="up">
          <Figure name="alley-mist" sizes="(min-width: 900px) 44vw, 88vw" ratio="16 / 10" />
          <figcaption className="meta">Fort Kochi, a little after six</figcaption>
        </figure>

        <p className="why__closing display" data-reveal="up">
          Masti isn’t noise. It’s the part of a trip you didn’t plan and can’t stop describing when
          you get home.
        </p>
      </div>
    </section>
  );
}
