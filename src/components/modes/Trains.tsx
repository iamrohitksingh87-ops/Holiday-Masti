import { useId, useState } from 'react';
import { ModeSection } from './ModeSection';

/**
 * Trains: its own frame, its own words, and a train-only search — no flight or
 * package fields mixed in.
 */
export function Trains() {
  const uid = useId();
  const [sent, setSent] = useState(false);

  return (
    <ModeSection
      id="trains"
      label="Trains"
      title={['The best seat', 'in the country', 'is a window seat.']}
      copy="Sleeper berths, chair cars, and the two or three routes worth building a whole trip around. We book the moment the window opens, because the good ones are gone months ahead."
      image="train-dusk"
      slate="Platform 4 · 18:40"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <p className="meta find__legend">Search trains — Indian Railways</p>

        <div className="find__row">
          <div className="find__field">
            <label className="meta" htmlFor={`${uid}-from`}>
              From station
            </label>
            <input
              id={`${uid}-from`}
              name="fromStation"
              autoComplete="off"
              placeholder="Lucknow Charbagh (LKO)"
              required
            />
          </div>

          <div className="find__field">
            <label className="meta" htmlFor={`${uid}-to`}>
              To station
            </label>
            <input
              id={`${uid}-to`}
              name="toStation"
              autoComplete="off"
              placeholder="Varanasi Jn (BSB)"
              required
            />
          </div>

          <div className="find__field">
            <label className="meta" htmlFor={`${uid}-date`}>
              Journey date
            </label>
            <input id={`${uid}-date`} name="journeyDate" type="date" required />
          </div>

          <div className="find__field">
            <label className="meta" htmlFor={`${uid}-pax`}>
              Travellers
            </label>
            <select id={`${uid}-pax`} name="travellers" defaultValue="2">
              <option value="1">1 traveller</option>
              <option value="2">2 travellers</option>
              <option value="3">3 travellers</option>
              <option value="4">4 travellers</option>
              <option value="5">5 or more</option>
            </select>
          </div>

          <button className="find__go" type="submit">
            Search trains <span className="cta__arrow">→</span>
          </button>
        </div>

        <p className="find__status meta" role="status">
          {sent
            ? 'Noted. We’ll come back with berths — and which side of the carriage to ask for.'
            : 'Sleeper, 3A, 2A or first — we’ll advise once we know the route.'}
        </p>
      </form>
    </ModeSection>
  );
}
