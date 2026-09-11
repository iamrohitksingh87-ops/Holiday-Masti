import type { ImageKey } from './images';

export type Story = {
  quote: string;
  name: string;
  from: string;
  journey: string;
  /** A frame from their trip — not a stock face standing in for a real person. */
  frame: ImageKey;
  place: string;
};

export const stories: Story[] = [
  {
    quote: 'India felt completely different because we never had to rush it.',
    name: 'Meera & Anand Rao',
    from: 'Bengaluru',
    journey: 'Kerala · 06 Nights',
    frame: 'kerala-reflections',
    place: 'Alappuzha, the second morning',
  },
  {
    quote:
      'They moved one drive by a day so we would reach the dunes at the right hour. Nobody told us. We just arrived, and there it was.',
    name: 'Farah Qureshi',
    from: 'Dubai',
    journey: 'Rajasthan · 07 Nights',
    frame: 'thar-dunes',
    place: 'An hour west of Jaisalmer',
  },
  {
    quote: 'Two days of doing nothing in Leh sounded like a waste. It was the reason the rest of it worked.',
    name: 'Thomas Berger',
    from: 'Zürich',
    journey: 'Himalayan Escape · 08 Nights',
    frame: 'snow-peaks',
    place: 'Above the Indus valley',
  },
];
