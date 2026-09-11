import type { ImageKey } from './images';

export type Region = {
  id: string;
  name: string;
  sub: string;
  copy: string;
  image: ImageKey;
  /** Position on the constellation, in percent of the stage. Roughly true to the map. */
  x: number;
  y: number;
  season: string;
};

export const regions: Region[] = [
  {
    id: 'himalayas',
    name: 'Himalayas',
    sub: 'Ladakh · Spiti · Sikkim',
    copy: 'High desert above the treeline. Monasteries on rock, passes over five thousand metres, and light that makes everything look closer than it is.',
    image: 'snow-peaks',
    x: 30,
    y: 8,
    season: 'Jun — Sep',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    sub: 'Udaipur · Jodhpur · Jaisalmer',
    copy: 'Forts you can sleep in, stepwells that go down further than the buildings go up, and a desert that turns copper for twenty minutes each evening.',
    image: 'stepwell',
    x: 20,
    y: 33,
    season: 'Oct — Mar',
  },
  {
    id: 'north',
    name: 'North India',
    sub: 'Delhi · Agra · Amritsar',
    copy: 'The loud part, and worth it. Mughal marble, Old Delhi at breakfast, and the Taj at the hour when there is almost nobody standing in front of it.',
    image: 'taj-mahal',
    x: 38,
    y: 25,
    season: 'Oct — Mar',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    sub: 'The Ganges',
    copy: 'Older than most countries. Best understood from a boat, at dawn, with the whole city facing you across the water.',
    image: 'varanasi-ghats-boat',
    x: 52,
    y: 33,
    season: 'Nov — Mar',
  },
  {
    id: 'central',
    name: 'Central India',
    sub: 'Khajuraho · Orchha · Bandhavgarh',
    copy: 'Sandstone temples in open fields and the best odds in the country of seeing a tiger walk out of the sal forest.',
    image: 'khajuraho-dusk',
    x: 42,
    y: 44,
    season: 'Nov — Apr',
  },
  {
    id: 'goa',
    name: 'Goa',
    sub: 'The Konkan coast',
    copy: 'Ignore the strip. Go south, or go inland: Portuguese churches, river ferries, and coves with one shack and no name.',
    image: 'goa-shore-dark',
    x: 22,
    y: 62,
    season: 'Nov — Feb',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    sub: 'Backwaters · Munnar · Fort Kochi',
    copy: 'Green all the way down. Tea at altitude in the morning, a boat by the afternoon, and dinner cooked on the deck.',
    image: 'munnar-mist',
    x: 30,
    y: 84,
    season: 'Sep — Mar',
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    sub: 'Madurai · Thanjavur · Chettinad',
    copy: 'Living temples, not ruins. Granite corridors a kilometre long, still in daily use, still loud, still lit by oil.',
    image: 'temple-corridor',
    x: 42,
    y: 88,
    season: 'Nov — Feb',
  },
];
