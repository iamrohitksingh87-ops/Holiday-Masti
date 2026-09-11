import { ModeSection } from './ModeSection';

/**
 * Flights
 * Travelpayouts White Label flight search.
 *
 * The Travelpayouts loader is added globally in index.html.
 * The search and ticket containers below are populated by Travelpayouts.
 */
export function Flights() {
  return (
    <ModeSection
      id="flights"
      label="Flights"
      title={['Arrive while', 'the light is', 'still good.']}
      copy="We book the flight that makes the first day work — landing in daylight, with time to get somewhere before dark."
      image="flight-dusk"
      slate="Gate 14 · 18:05"
    >
      <div className="holiday-masti-flight-search">
        <p className="meta find__legend">
          Search flights — domestic and international
        </p>

        {/* Travelpayouts flight search */}
        <div id="tpwl-search"></div>

        {/* Travelpayouts flight results */}
        <div id="tpwl-tickets"></div>
      </div>
    </ModeSection>
  );
}