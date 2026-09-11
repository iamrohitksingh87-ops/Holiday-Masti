import type { ImageKey } from './images';

export type Day = { day: string; title: string; text: string };

export type Journey = {
  slug: string;
  title: string;
  region: string;
  nights: string;
  tagline: string;
  intro: string;
  standfirst: string;
  from: string;
  best: string;
  pace: string;
  hero: ImageKey;
  card: ImageKey;
  gallery: ImageKey[];
  itinerary: Day[];
  stays: { name: string; place: string; note: string }[];
  moments: string[];
  includes: string[];
  excludes: string[];
};

export const journeys: Journey[] = [
  {
    slug: 'rajasthan',
    title: 'Rajasthan',
    region: 'Udaipur · Jodhpur · Jaisalmer',
    nights: '07 Nights',
    tagline: 'Lakes, forts, and one night with no roof over you.',
    standfirst: 'Three cities, one desert, and the good sense to move slowly between them.',
    intro:
      'Rajasthan is usually sold as a checklist of forts. This is the other version: fewer places, longer in each, and the drives timed so you arrive when the stone is warm and the light is doing something. It ends on a dune, well past the last road, which is the only honest way to end it.',
    from: '₹1,86,000',
    best: 'October — March',
    pace: 'Unhurried',
    hero: 'udaipur-night',
    card: 'stepwell',
    gallery: ['udaipur-day', 'arch-view', 'thar-dunes', 'palace-interior'],
    itinerary: [
      { day: '01', title: 'Arrive Udaipur', text: 'Met at the airport, across the lake by boat rather than by road. Nothing planned for the evening except dinner on a roof.' },
      { day: '02', title: 'The city from the water', text: 'City Palace early, before the buses. Afternoon free. A long, slow ferry at dusk when the whole thing turns gold.' },
      { day: '03', title: 'Into the hills', text: 'A day out to the marble temples at Ranakpur and a lunch nobody expects to be that good.' },
      { day: '04', title: 'Drive to Jodhpur', text: 'Five hours with two stops that are worth the stopping. Mehrangarh in the late afternoon, from the inside out.' },
      { day: '05', title: 'Jodhpur, on foot', text: 'The old city with somebody who grew up in it. Textiles, a stepwell, and the roof again at night.' },
      { day: '06', title: 'West to Jaisalmer', text: 'The land empties out as you go. Arrive to the fort lit from below, still lived in, still noisy.' },
      { day: '07', title: 'Out into the Thar', text: 'Camels at four, camp by six, dinner cooked on a fire, and a sky with nothing in the way of it.' },
      { day: '08', title: 'Depart', text: 'Back to Jaisalmer for breakfast, then onward — or stay another two nights, which most people do.' },
    ],
    stays: [
      { name: 'A lake-facing haveli', place: 'Udaipur', note: 'Nine rooms, family-run, the best water view in the old city.' },
      { name: 'A restored merchant house', place: 'Jodhpur', note: 'Blue lanes on three sides, the fort on the fourth.' },
      { name: 'Desert camp', place: 'Thar', note: 'Canvas, proper beds, no generator after ten.' },
    ],
    moments: ['Dusk crossing of Lake Pichola', 'Mehrangarh before opening hours', 'A night in the dunes'],
    includes: [
      'Seven nights in hand-picked heritage stays',
      'Private car and driver throughout',
      'Local guides in each city',
      'Breakfast daily, three set dinners',
      'Camel crossing and desert camp',
      'A phone number that answers, all trip',
    ],
    excludes: ['International and domestic flights', 'Visa and travel insurance', 'Lunches and remaining dinners', 'Camera fees at monuments', 'Anything you decide on at the last minute'],
  },
  {
    slug: 'kerala',
    title: 'Kerala',
    region: 'Kochi · Munnar · Alappuzha',
    nights: '06 Nights',
    tagline: 'Down from the tea hills to the water, and no further.',
    standfirst: 'A journey that loses altitude for six days and gets slower the whole way.',
    intro:
      'Kerala rewards doing less. This runs downhill — from a colonial port to the tea at two thousand metres, then all the way down to a boat you will not want to get off. Three places in six nights. The rest is deliberately empty.',
    from: '₹1,42,000',
    best: 'September — March',
    pace: 'Slow',
    hero: 'kerala-houseboat-sunset',
    card: 'kerala-houseboat-palms',
    gallery: ['munnar-mist', 'tea-pickers', 'kerala-reflections'],
    itinerary: [
      { day: '01', title: 'Fort Kochi', text: 'Arrive and walk. Chinese nets at sunset, a Jew Town bookshop, and a Kathakali rehearsal rather than the show.' },
      { day: '02', title: 'Up to Munnar', text: 'Four hours climbing through spice country. Arrive to cloud sitting in the valleys.' },
      { day: '03', title: 'Tea, early', text: 'Out at six with a picker, then a working factory, then nothing at all until dinner.' },
      { day: '04', title: 'Down to the water', text: 'The long descent to Alappuzha. Board in the afternoon; the boat moves while you have tea.' },
      { day: '05', title: 'On the backwaters', text: 'A full day of channels barely wider than the boat. Lunch caught that morning.' },
      { day: '06', title: 'Marari', text: 'A quiet beach an hour north, for people who want one more day of nothing.' },
      { day: '07', title: 'Depart', text: 'Transfer to Kochi. Ninety minutes, mostly along the coast.' },
    ],
    stays: [
      { name: 'A Dutch-era townhouse', place: 'Fort Kochi', note: 'Courtyard, ceiling fans, six rooms.' },
      { name: 'A planter’s bungalow', place: 'Munnar', note: 'Above the cloud line most mornings.' },
      { name: 'Private houseboat', place: 'Alappuzha', note: 'Two cabins, one cook, one very good one.' },
    ],
    moments: ['Six a.m. in the tea', 'The first hour on the water', 'Dinner cooked on the deck'],
    includes: [
      'Six nights, including a private houseboat',
      'Private car and driver throughout',
      'All meals aboard the boat',
      'Tea estate walk with a picker',
      'Breakfast daily',
      'Airport transfers both ends',
    ],
    excludes: ['Flights', 'Visa and insurance', 'Meals ashore', 'Spa and treatments', 'Tips'],
  },
  {
    slug: 'himalayan-escape',
    title: 'Himalayan Escape',
    region: 'Leh · Nubra · Pangong',
    nights: '08 Nights',
    tagline: 'Thin air, empty roads, and monasteries on the edge of things.',
    standfirst: 'Eight days above three thousand metres, paced so the altitude never wins.',
    intro:
      'The Ladakh trip everybody wants to do badly. Two full days doing nothing in Leh first, because that is what makes the rest of it possible. Then over the passes, into Nubra, and out to the lake — with enough time at each to actually be there.',
    from: '₹2,24,000',
    best: 'June — September',
    pace: 'Measured',
    hero: 'mountain-road',
    card: 'road-motorcycle',
    gallery: ['snow-peaks', 'road-motorcycle', 'mountain-road'],
    itinerary: [
      { day: '01', title: 'Leh', text: 'Land at seven in the morning and do absolutely nothing. This is not a wasted day; it is the whole plan.' },
      { day: '02', title: 'Still Leh', text: 'A short walk to Shanti Stupa and back. Early night.' },
      { day: '03', title: 'The old monasteries', text: 'Thiksey at dawn prayers, Hemis after. Back down for the afternoon.' },
      { day: '04', title: 'Over Khardung La', text: 'Up over the pass and down into Nubra. Sand dunes at ten thousand feet, which never stops being strange.' },
      { day: '05', title: 'Nubra', text: 'Turtuk, close enough to the border to feel it. Apricots, if the season is right.' },
      { day: '06', title: 'Across to Pangong', text: 'The long way, over Shyok. Rough road, no traffic, and then the lake.' },
      { day: '07', title: 'Pangong', text: 'A day at the water. The colour changes hourly and there is nothing else to report.' },
      { day: '08', title: 'Back to Leh', text: 'Via Chang La. An afternoon free for the bazaar.' },
      { day: '09', title: 'Depart', text: 'Early flight out, over the range.' },
    ],
    stays: [
      { name: 'A Ladakhi family house', place: 'Leh', note: 'Courtyard, poplar beams, thick walls.' },
      { name: 'Canvas camp', place: 'Nubra', note: 'Heated, dark, and quiet by nine.' },
      { name: 'Lakeside cottages', place: 'Pangong', note: 'Basic on purpose. The view is the room.' },
    ],
    moments: ['Dawn prayers at Thiksey', 'Cresting Khardung La', 'The first sight of Pangong'],
    includes: [
      'Eight nights including two acclimatisation days',
      'Inner Line Permits arranged',
      'Private vehicle and mountain driver',
      'Oxygen and a satellite phone in the car',
      'Breakfast and dinner daily',
      'Airport transfers',
    ],
    excludes: ['Flights to Leh', 'Lunches on the road', 'Insurance covering altitude', 'Anything bought in the bazaar'],
  },
  {
    slug: 'goa',
    title: 'Goa',
    region: 'South coast · Chorão · Divar',
    nights: '05 Nights',
    tagline: 'The Goa that people who live there actually use.',
    standfirst: 'Five nights south of the noise, half of them nowhere near the beach.',
    intro:
      'Goa has a reputation it earned in the wrong decade. Skip the strip entirely: the south coast, the river islands, the old Portuguese quarters at siesta hour, and a stretch of sand that has one shack on it. Very little is planned, which is the point.',
    from: '₹98,000',
    best: 'November — February',
    pace: 'Horizontal',
    hero: 'goa-shore-dark',
    card: 'goa-sunset-sea',
    gallery: ['goa-sunset-sea', 'goa-shore-dark'],
    itinerary: [
      { day: '01', title: 'Arrive south', text: 'Straight from the airport to the quiet end. Nothing after that.' },
      { day: '02', title: 'The coast road', text: 'A motorcycle if you want one, a car if you do not. Coves, in order, going south.' },
      { day: '03', title: 'The river islands', text: 'Ferry to Divar and Chorão. Empty churches, bird sanctuary, lunch in somebody’s front room.' },
      { day: '04', title: 'Old Goa and Panjim', text: 'Early, before the heat. Fontainhas at siesta, which is when it looks best.' },
      { day: '05', title: 'Nothing at all', text: 'Deliberately blank. Most people spend it in the sea.' },
      { day: '06', title: 'Depart', text: 'Late checkout, short transfer.' },
    ],
    stays: [
      { name: 'A shoreline guesthouse', place: 'South Goa', note: 'Seven rooms, sand at the gate.' },
      { name: 'A Portuguese townhouse', place: 'Fontainhas', note: 'Azulejo tiles and a very slow ceiling fan.' },
    ],
    moments: ['The ferry across to Divar', 'A cove with one shack', 'Fontainhas at four in the afternoon'],
    includes: ['Five nights on the quiet coast', 'Airport transfers', 'A day with a local guide', 'Breakfast daily', 'Motorcycle or car hire arranged'],
    excludes: ['Flights', 'Most meals', 'Fuel', 'Insurance'],
  },
  {
    slug: 'varanasi-agra',
    title: 'Varanasi + Agra',
    region: 'Varanasi · Agra · Delhi',
    nights: '06 Nights',
    tagline: 'The oldest city in the country, and the most photographed building in it.',
    standfirst: 'Two enormous places, both seen at the hour when they are almost empty.',
    intro:
      'These two are usually rushed. Here they get three nights and two, with the overnight train between them because that is the honest way to travel this stretch — and because it is the best part. Everything is timed for first light.',
    from: '₹1,54,000',
    best: 'November — March',
    pace: 'Early',
    hero: 'ganges-dawn-boats',
    card: 'varanasi-ghats-wide',
    gallery: ['aarti-dawn', 'varanasi-ghats-boat', 'taj-mahal', 'carriage-motion'],
    itinerary: [
      { day: '01', title: 'Arrive Varanasi', text: 'Settle in. Evening aarti watched from a boat rather than from the crush on the steps.' },
      { day: '02', title: 'Dawn on the river', text: 'On the water at five. Back for breakfast. The rest of the day is yours, and you will need it.' },
      { day: '03', title: 'Sarnath', text: 'Where the first sermon was given. Quiet, green, and half an hour out of the city.' },
      { day: '04', title: 'The night train', text: 'Boarded after dinner. A berth, a window, and the whole Gangetic plain going past in the dark.' },
      { day: '05', title: 'Agra', text: 'The Taj at opening, from the far bank first. Then Itmad-ud-Daulah, which almost nobody visits.' },
      { day: '06', title: 'Fatehpur Sikri', text: 'An abandoned Mughal capital on the way to Delhi. Three hours there, three hours on.' },
      { day: '07', title: 'Depart Delhi', text: 'Old Delhi at breakfast if the flight allows it.' },
    ],
    stays: [
      { name: 'A ghat-side house', place: 'Varanasi', note: 'Steps to the river, rooftop above the noise.' },
      { name: 'First-class berth', place: 'On the train', note: 'Two-berth cabin, linen, and a door that locks.' },
      { name: 'A garden hotel', place: 'Agra', note: 'Ten minutes from the east gate.' },
    ],
    moments: ['Five a.m. on the Ganges', 'A night train berth', 'The Taj before the gates get busy'],
    includes: [
      'Six nights including one aboard the train',
      'First-class rail berth, booked early',
      'Private boat, twice',
      'Guides in Varanasi and Agra',
      'Breakfast daily',
      'All transfers',
    ],
    excludes: ['Flights', 'Monument entry fees', 'Lunches and dinners', 'Visa and insurance'],
  },
];

export const journeyBySlug = (slug: string) => journeys.find((j) => j.slug === slug);
