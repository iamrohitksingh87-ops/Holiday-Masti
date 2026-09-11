import { useId, useRef, useState } from 'react';
import { revealIn } from '../../lib/motion';
import { useIsoLayoutEffect } from '../../lib/hooks';
import './search.css';

type Mode = 'flights' | 'trains' | 'stays';

const MODES: { id: Mode; label: string; a: string; b: string; date: string }[] = [
  { id: 'flights', label: 'Flights', a: 'From', b: 'To', date: 'When' },
  { id: 'trains', label: 'Trains', a: 'From', b: 'To', date: 'When' },
  { id: 'stays', label: 'Hotels', a: 'Where', b: 'Neighbourhood', date: 'Check in' },
];

/**
 * The practical half of the site.
 *
 * It opens as one sentence with four blanks in it. Focus anything and a second
 * line of refinements slides open — no modal, no widget chrome, no boxes. The
 * form is real markup with real labels; wiring it to an inventory API is a
 * matter of replacing the submit handler.
 */
export function TravelSearch() {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>('flights');
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const uid = useId();
  const current = MODES.find((m) => m.id === mode)!;

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    return revealIn(root.current);
  }, []);

  return (
    <section className="find" ref={root} id="plan" aria-labelledby="find-title">
      <div className="shell">
        <div className="find__head">
          <div>
            <p className="meta" data-reveal="up">
              Flights · Trains · Hotels
            </p>
            <h2 className="display display--tight find__title" id="find-title" data-reveal="mask">
              <span>Where are you</span>
              <span className="italic">going?</span>
            </h2>
          </div>

          <div className="find__modes" role="tablist" aria-label="What to search">
            {MODES.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={mode === m.id}
                className={`find__mode meta${mode === m.id ? ' is-on' : ''}`}
                onClick={() => setMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <form
          className={`find__form${open ? ' is-open' : ''}`}
          onFocus={() => setOpen(true)}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="find__row">
            <div className="find__field">
              <label className="meta" htmlFor={`${uid}-a`}>
                {current.a}
              </label>
              <input
                id={`${uid}-a`}
                name="origin"
                autoComplete="off"
                placeholder={mode === 'stays' ? 'Udaipur' : 'Mumbai'}
                required
              />
            </div>

            <div className="find__field">
              <label className="meta" htmlFor={`${uid}-b`}>
                {current.b}
              </label>
              <input
                id={`${uid}-b`}
                name="destination"
                autoComplete="off"
                placeholder={mode === 'stays' ? 'Lake Pichola' : 'Jaisalmer'}
              />
            </div>

            <div className="find__field">
              <label className="meta" htmlFor={`${uid}-when`}>
                {current.date}
              </label>
              <input id={`${uid}-when`} name="when" type="date" required />
            </div>

            <div className="find__field find__field--who">
              <label className="meta" htmlFor={`${uid}-who`}>
                Who
              </label>
              <select id={`${uid}-who`} name="who" defaultValue="2">
                <option value="1">1 traveller</option>
                <option value="2">2 travellers</option>
                <option value="3">3 travellers</option>
                <option value="4">4 travellers</option>
                <option value="5">5 or more</option>
              </select>
            </div>

            <button className="find__go" type="submit">
              Let’s go <span className="cta__arrow">→</span>
            </button>
          </div>

          <div className="find__more" hidden={!open}>
            <div className="find__field">
              <label className="meta" htmlFor={`${uid}-back`}>
                {mode === 'stays' ? 'Check out' : 'Coming back'}
              </label>
              <input id={`${uid}-back`} name="return" type="date" />
            </div>

            <div className="find__field">
              <label className="meta" htmlFor={`${uid}-class`}>
                {mode === 'stays' ? 'Room' : mode === 'trains' ? 'Class' : 'Cabin'}
              </label>
              <select id={`${uid}-class`} name="class" defaultValue="best">
                <option value="best">Whatever’s best</option>
                {mode === 'stays' ? (
                  <>
                    <option value="double">Double</option>
                    <option value="suite">Suite</option>
                    <option value="heritage">Heritage room</option>
                  </>
                ) : mode === 'trains' ? (
                  <>
                    <option value="1a">First AC</option>
                    <option value="2a">Second AC</option>
                    <option value="cc">Chair car</option>
                  </>
                ) : (
                  <>
                    <option value="economy">Economy</option>
                    <option value="premium">Premium economy</option>
                    <option value="business">Business</option>
                  </>
                )}
              </select>
            </div>

            <div className="find__field find__field--wide">
              <label className="meta" htmlFor={`${uid}-note`}>
                Anything we should know
              </label>
              <input
                id={`${uid}-note`}
                name="note"
                autoComplete="off"
                placeholder="Slow trip, one long stop, no early starts…"
              />
            </div>
          </div>

          <p className="find__status meta" role="status">
            {sent
              ? 'Noted. Someone from the studio will come back to you within one working day.'
              : 'Or tell us the feeling and we’ll build the route.'}
          </p>
        </form>
      </div>
    </section>
  );
}
