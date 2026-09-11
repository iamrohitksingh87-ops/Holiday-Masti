import type { ImageKey } from './images';

export type Feeling = {
  id: string;
  word: string;
  place: string;
  line: string;
  copy: string;
  image: ImageKey;
};

export const feelings: Feeling[] = [
  {
    id: 'slow',
    word: 'Slow',
    place: 'Alappuzha · Kerala',
    line: 'Nothing to be on time for.',
    copy: 'Six hours on a backwater and the only decision left is when to eat. The engine cuts. Somebody starts cooking. You stop checking the hour.',
    image: 'kerala-houseboat-sunset',
  },
  {
    id: 'wild',
    word: 'Wild',
    place: 'Thar · Rajasthan',
    line: 'The map runs out before the light does.',
    copy: 'Past the last village the sand takes over the road. You ride out an hour, stop, and the quiet is so complete it takes a while to trust it.',
    image: 'dunes-camel-dusk',
  },
  {
    id: 'royal',
    word: 'Royal',
    place: 'Udaipur · Rajasthan',
    line: 'Built to be looked at from the water.',
    copy: 'The palace was never meant to be entered from the road. Come across the lake at dusk, the way the court did, and the whole thing turns gold at once.',
    image: 'udaipur-night',
  },
  {
    id: 'sacred',
    word: 'Sacred',
    place: 'Varanasi · Uttar Pradesh',
    line: 'A city that has never once stopped.',
    copy: 'Downstream at five in the morning, before the crowds, before the lamps. Steps, smoke, and a few thousand years of people doing exactly this.',
    image: 'aarti-dawn',
  },
  {
    id: 'untamed',
    word: 'Untamed',
    place: 'Ladakh · Himalaya',
    line: 'Altitude changes what you notice.',
    copy: 'Nothing grows up here and nothing needs to. Thin air, a road with no traffic on it, and a horizon that keeps moving further away.',
    image: 'mountain-road',
  },
  {
    id: 'indulgent',
    word: 'Indulgent',
    place: 'Jodhpur · Rajasthan',
    line: 'Somebody has been doing this for two hundred years.',
    copy: 'A haveli with nine rooms and a family that still runs it. Dinner on the roof, no menu, and the fort lit up behind you the entire time.',
    image: 'palace-interior',
  },
];
