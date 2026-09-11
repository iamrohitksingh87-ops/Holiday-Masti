import { Hero } from '../components/hero/Hero';
import { Feelings } from '../components/sections/Feelings';
import { InMotion } from '../components/sections/InMotion';
import { MeetIndia } from '../components/sections/MeetIndia';
import { Experiences } from '../components/experiences/Experiences';
import { Journeys } from '../components/journeys/Journeys';
import { TravelSearch } from '../components/search/TravelSearch';
import { Flights } from '../components/modes/Flights';
import { Trains } from '../components/modes/Trains';
import { Why } from '../components/sections/Why';
import { Stories } from '../components/sections/Stories';
import { FinalCta } from '../components/sections/FinalCta';

export function Home({ ready }: { ready: boolean }) {
  return (
    <>
      <Hero ready={ready} />
      <Feelings />
      <InMotion />
      <MeetIndia />
      <Experiences />
      <Journeys />
      <TravelSearch />
      <Flights />
      <Trains />
      <Why />
      <Stories />
      <FinalCta />
    </>
  );
}
