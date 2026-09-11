import type { ImageKey } from './images';

export type Experience = {
  index: string;
  title: string;
  place: string;
  copy: string;
  image: ImageKey;
  hour: string;
};

export const experiences: Experience[] = [
  {
    index: '01',
    title: 'Slow Mornings',
    place: 'Kerala · Backwaters',
    hour: '05:40',
    copy: 'Coffee on the deck before the mist lifts off the water. The boat has not started yet. Nobody suggests that it should.',
    image: 'kerala-reflections',
  },
  {
    index: '02',
    title: 'Royal Afterglow',
    place: 'Udaipur · Rajasthan',
    hour: '18:20',
    copy: 'The last ferry back across Pichola, timed so the palace lights come on while you are still out on the water.',
    image: 'udaipur-day',
  },
  {
    index: '03',
    title: 'Wild Horizons',
    place: 'Thar · Rajasthan',
    hour: '16:55',
    copy: 'Out past the last road, one camel, one guide who has crossed this sand his whole life, and a dune to watch the sun go down from.',
    image: 'camel-man-dunes',
  },
  {
    index: '04',
    title: 'India in Motion',
    place: 'Goa · Coast',
    hour: '19:05',
    copy: 'A borrowed motorcycle, the coastal road south, and a shack that starts cooking whenever you happen to turn up.',
    image: 'goa-sunset-sea',
  },
  {
    index: '05',
    title: 'Sacred Light',
    place: 'Varanasi · Ganges',
    hour: '18:45',
    copy: 'Lamps going up on the steps, bells, and half a million years of routine — watched from a boat, from a respectful distance.',
    image: 'aarti-lamps',
  },
];
