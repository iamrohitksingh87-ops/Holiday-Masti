/**
 * The Holiday Masti picture library.
 *
 * Every frame is stored locally at 640 / 1280 / 1920 (plus 2560 for the
 * full-bleed moments) with a 24px blurred placeholder for the fade-in.
 * `alt` is written for a reader, not for a search engine.
 *
 * Every picture in here was checked by eye against the caption it carries —
 * a beautiful photograph of the wrong country is worse than no photograph.
 */

export type ImageKey = keyof typeof library;

type Entry = {
  alt: string;
  /** Roughly where the subject sits, so crops never behead anyone. */
  focus?: string;
  wide?: true;
};

const library = {
  /* --- The night train ------------------------------------------------ */
  'lucknow-junction': {
    alt: 'Lucknow Charbagh Junction at night, its domes and towers lit amber against a black sky',
    focus: '50% 60%',
    wide: true,
  },
  'platform-lamps': {
    alt: 'Travellers waiting under warm platform lamps in the dark',
    focus: '50% 50%',
    wide: true,
  },
  'carriage-motion': {
    alt: 'The inside of a moving carriage pulled into streaks of colour',
    focus: '50% 50%',
    wide: true,
  },
  'railyard-dawn': {
    alt: 'Rails running away towards a low orange sun',
    focus: '50% 55%',
    wide: true,
  },
  'door-view': {
    alt: 'Two passengers sitting in an open carriage doorway watching green country go past',
    focus: '50% 50%',
  },

  /* --- Section heroes: flights and trains ------------------------------ */
  'flight-dusk': {
    alt: 'A widebody jet on stand, its wing and engine filling the apron beyond the terminal glass',
    // Weighted right and slightly high: the aircraft sits right of centre, and
    // the bottom of the frame is empty tarmac worth cropping away first.
    focus: '66% 46%',
    wide: true,
  },
  'train-dusk': {
    alt: 'A yellow and blue Indian Railways locomotive coming through dense green forest, seen from track level',
    focus: '45% 50%',
    // No `wide` here: the supplied landscape frame is 1983px across, so there
    // is no honest 2560 variant for the srcset to point at.
  },

  /* --- Desert ---------------------------------------------------------- */
  'dunes-camel-dusk': {
    alt: 'A camel and its rider crossing a dune ridge against a burning orange sky',
    focus: '50% 55%',
    wide: true,
  },
  'dunes-lone-figure': {
    alt: 'Low sun raking across the ripples of the Thar desert',
    focus: '50% 50%',
    wide: true,
  },
  'thar-dunes': {
    alt: 'Camel tracks curving away over warm sand',
    focus: '50% 60%',
  },
  'camel-man-dunes': {
    alt: 'A herder in white leading his camel across the dunes at midday',
    focus: '45% 55%',
  },

  /* --- The river ------------------------------------------------------- */
  'ganges-dawn-boats': {
    alt: 'Rowing boats crossing the Ganges under a low red sun',
    focus: '50% 50%',
    wide: true,
  },
  'aarti-dawn': {
    alt: 'Priests raising lamps in a row against the dawn at the river',
    focus: '50% 45%',
    wide: true,
  },
  'aarti-lamps': {
    alt: 'Tiered brass lamps burning during the evening aarti',
    focus: '50% 50%',
  },
  'varanasi-ghats-boat': {
    alt: 'The stepped ghats of Varanasi rising above a moored orange boat',
    focus: '50% 45%',
  },
  'varanasi-ghats-wide': {
    alt: 'Pilgrims gathered on the wide stone steps above the Ganges',
    focus: '50% 50%',
  },

  /* --- Rajasthan ------------------------------------------------------- */
  'udaipur-night': {
    alt: 'The City Palace lit gold and doubled in the still water of Lake Pichola',
    focus: '50% 50%',
    wide: true,
  },
  'udaipur-day': {
    alt: 'Udaipur City Palace along the lake shore in flat afternoon light',
    focus: '50% 50%',
  },
  'palace-interior': {
    alt: 'A lamplit palace corridor hung with portraits, everything the colour of amber',
    focus: '50% 50%',
  },
  stepwell: {
    alt: 'The inverted stone staircases of a Rajasthani stepwell descending into shadow',
    focus: '50% 50%',
  },
  'arch-view': {
    alt: 'A scalloped arch framing the haze over a fort city',
    focus: '50% 50%',
  },

  /* --- Mountains ------------------------------------------------------- */
  'mountain-road': {
    alt: 'An empty road running straight at a wall of snow mountains',
    focus: '50% 55%',
    wide: true,
  },
  'road-motorcycle': {
    alt: 'A lone motorcycle on a Himalayan road below the snowline',
    focus: '50% 66%',
  },
  'snow-peaks': {
    alt: 'A whitewashed monastery clinging to a ridge above a Himalayan valley',
    // Weighted low: the monastery is the subject, and a high crop fills the
    // frame with the one genuinely blue sky in the library.
    focus: '55% 72%',
  },

  /* --- The south ------------------------------------------------------- */
  'kerala-houseboat-sunset': {
    alt: 'A thatched houseboat holding still on the backwaters under a red sun',
    focus: '50% 50%',
    wide: true,
  },
  'kerala-reflections': {
    alt: 'Palms doubled in the glassy green water of a backwater channel',
    focus: '50% 50%',
  },
  'kerala-houseboat-palms': {
    alt: 'A houseboat moving between palm-lined banks in Alappuzha',
    focus: '50% 50%',
  },
  'munnar-mist': {
    alt: 'Mist lying in the folds of the Munnar tea hills at first light',
    focus: '50% 50%',
  },
  'tea-pickers': {
    alt: 'Pickers working a hillside of tea, seen from above',
    focus: '50% 50%',
  },
  'temple-corridor': {
    alt: 'A long colonnade of carved granite pillars receding into a temple',
    focus: '50% 50%',
  },
  'goa-shore-dark': {
    alt: 'A dark palm-backed cove on the Goan coast with the tide coming in',
    focus: '50% 55%',
    wide: true,
  },
  'goa-sunset-sea': {
    alt: 'The sun going down into a flat copper sea',
    focus: '50% 50%',
  },

  /* --- The middle ------------------------------------------------------ */
  'khajuraho-dusk': {
    alt: 'Khajuraho’s sandstone spires holding the last warm light of the day',
    focus: '50% 50%',
  },
  'taj-mahal': {
    alt: 'The Taj Mahal above its watercourse in early light',
    focus: '50% 45%',
  },

  /* --- People and streets ---------------------------------------------- */
  'street-dust': {
    alt: 'Rickshaws and figures dissolving into the dust of a morning street',
    focus: '50% 50%',
    wide: true,
  },
  'woman-road': {
    alt: 'A woman carrying a brass pot walking the roadside past grazing cattle',
    focus: '40% 50%',
  },
  'alley-mist': {
    alt: 'Bicycles leaning in a narrow lane full of low morning light',
    focus: '50% 50%',
  },
  'portrait-woman': {
    alt: 'A woman laughing, her jewellery catching the light',
    focus: '50% 38%',
  },
} as const satisfies Record<string, Entry>;

const WIDTHS = [640, 1280, 1920] as const;

export function imageSrc(key: ImageKey, width: 640 | 1280 | 1920 | 2560 = 1280) {
  return `/img/${key}-${width}.webp`;
}

export function imageSrcSet(key: ImageKey) {
  const widths: number[] = [...WIDTHS];
  if ((library[key] as Entry).wide) widths.push(2560);
  return widths.map((w) => `/img/${key}-${w}.webp ${w}w`).join(', ');
}

export function imageLqip(key: ImageKey) {
  return `/img/${key}-lqip.webp`;
}

export function imageAlt(key: ImageKey) {
  return library[key].alt;
}

export function imageFocus(key: ImageKey) {
  return (library[key] as Entry).focus ?? '50% 50%';
}

export const imageKeys = Object.keys(library) as ImageKey[];
