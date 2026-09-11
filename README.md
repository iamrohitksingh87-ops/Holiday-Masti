# Holiday Masti

**India is not a destination. It's a feeling.**

A cinematic, editorial site for an Indian travel studio. React + TypeScript + Vite,
GSAP/ScrollTrigger for motion, Lenis for scroll feel, hand-written CSS with a token
system. No UI framework, no card grids, no blue.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle into dist/
npm run preview
```

---

## The idea

The site opens as a night train and ends as a question. Everything between is
arranged as a film reel rather than a brochure: a held opening, a transition that
widens instead of cutting, six emotional registers, a horizontal gallery driven by
ordinary vertical scrolling, and a last frame you sit inside.

## Design system

| | |
|---|---|
| Display | Instrument Serif — used enormous, tight, often past the measure |
| Text / UI | Archivo — small caps metadata at `0.2em` tracking |
| Ground | ivory `#FCFAF1`, parchment `#F6EBDD`, sand `#ECDCC6` |
| Ink | espresso `#33201D`, `#1D0D0C`, soot `#120807` |
| Accent | terracotta `#A44528`, ember `#D3612F` |

Tokens live in `src/styles/tokens.css`. Dark passages opt in with `.on-dark` /
`.on-espresso`, which re-point the semantic variables rather than adding overrides.
There is no blue anywhere in the interface.

**Photographic grade.** Every picture runs through one filter
(`--grade` in `tokens.css`) — slightly desaturated, slightly warm, slightly
contrastier. It makes thirty-odd photographers read as one edit and keeps an open
sky from fighting the earth palette. `.fig--ungraded` opts out.

## Structure

```
src/
  components/
    navigation/   Nav + full-screen mobile panel
    hero/         Hero, HeroFilm, SoundToggle, ScrollCursor
    sections/     Feelings (+ the opening transition), InMotion,
                  MeetIndia, Why, Stories, FinalCta
    experiences/  the pinned horizontal gallery
    journeys/     the journey index with the trailing frame
    search/       the package search
    modes/        ModeSection + Flights + Trains
    footer/  ui/  Figure, Logo, Footer
    loader/
  data/           content, separated from presentation
  lib/            motion helpers, hooks, ambience, smooth scroll
  pages/          Home, JourneyPage, NotFound
  styles/         tokens + base
tools/shoot.mjs   headless design-review harness (see below)
```

## Flights and Trains

Each is a `ModeSection` — its own photograph in a cinematic frame, its own
headline, and its own search bar underneath. Both import `search/search.css`, so
the three search bars on the site are the same design by construction rather than
by copy-paste, and none of them shares state with the others:

| | Fields |
|---|---|
| Packages (`#plan`) | Where / neighbourhood / dates / travellers, with Flights–Trains–Hotels tabs |
| Flights (`#flights`) | From, To, Departure, Return, Travellers |
| Trains (`#trains`) | From station, To station, Journey date, Travellers |

Below 760px the frame stops being a background and becomes a picture above the
text, which is the only way a 76vh overlay reads on a phone.

## Brand mark

`public/brand/holiday-masti-logo-white.png` is the supplied lockup, used as-is —
white artwork on transparency, so the aspect ratio and the artwork are untouched.
`Logo.tsx` sizes it by height only. The navigation bar is the one light surface on
the site, so when it settles the same file is inverted in CSS rather than swapped
for a second asset that could drift out of sync.

## Decisions worth knowing

**The hero is a film cut from stills, not a video.** The brief asked for cinematic
night-train footage. The free stock that exists is flat and touristy, and using it
would have undercut everything else. So `HeroFilm` cuts six frames the way a title
sequence does — long dissolves, a slow push on each, grain and a tungsten wash over
the top. It reads as film, weighs a fraction of a video, and cannot fail to play.

When real footage exists, it drops straight in:

```tsx
<HeroFilm shots={SHOTS} videoSrc="/media/hero.mp4" poster="/img/station-night-1920.webp" />
```

Nothing else in the hero changes.

**The sound is synthesised.** `lib/ambience.ts` builds the rail bed in Web Audio —
filtered brown noise for rumble, scheduled double knocks for bogies over joints, a
thin layer of air, and a distant horn every minute or so. It is about 2kB instead of
2MB, never loops audibly, and starts only on a click. Pass `createAmbience({ src })`
to use a real recording instead. Volume peaks at 0.15 and the choice is remembered
for the session.

**The horizontal gallery never takes the scroll.** ScrollTrigger pins the stage and
adds a spacer exactly as tall as the horizontal distance, so the wheel is untouched,
the page can always keep going, the last panel clears the viewport before the section
ends, and nothing empty is left underneath. Below 1024px the mechanism is dropped
entirely for a vertical read.

**Imagery is local, not hot-linked.** 38 photographs at 640/1280/1920 (2560 for
full-bleed) as WebP, each with a 24px blurred placeholder, in `public/img`. Every one
was checked by eye against the caption it carries — an early draft had a Swedish
freight train captioned as Madhya Pradesh, which is exactly the failure this pass
exists to prevent. The flight frame was likewise re-picked to remove a foreign
airline's livery from an India specialist's hero.

Most frames come from Unsplash under its licence. **The Lucknow Charbagh hero is
the exception: Wikimedia Commons, CC BY-SA 4.0, by Ravi Dwivedi** — so the footer
names the photographer and links the file page, which that licence requires.
`tools/add-images.mjs` re-encodes Commons JPEGs to WebP through headless Chrome's
canvas, since Commons serves JPEG only.

**Testimonials show a frame from the trip, not a face.** Putting a stock portrait
next to an invented quote and a real-sounding name is a small lie. The stories carry
a photograph from the journey instead.

**Vite config.** `resolve.preserveSymlinks` and `server.fs.strict: false` are there
because this project was built inside a Windows folder that is reparsed to another
location; without them Vite resolves module ids to the real path, decides they are
outside the project root, and serves TSX untransformed. Harmless anywhere else.

## Accessibility & motion

- Semantic landmarks, one `h1` per page, skip link, visible focus rings on a
  4.5:1-plus palette.
- `prefers-reduced-motion` removes the smooth scroller, the custom cursor, the
  drifting frames and every scroll-linked scene. Crucially, every element whose
  resting state is "hidden until animated" is listed in one reduced-motion block in
  `base.css`, so nothing can ever be left invisible because its animation did not run.
- The custom cursor is pointer-devices-only and disappears the moment you scroll.
- The horizontal gallery becomes a vertical list rather than a trap.

## Design review harness

`tools/shoot.mjs` drives a headless system Chrome against the dev server, captures
each section at each breakpoint, and reports console errors, horizontal overflow and
failed images.

```bash
node tools/shoot.mjs --sizes 1440x900,390x844 --sections --out .review
node tools/shoot.mjs --sizes 1440x900 --reduced --sections     # reduced-motion pass
node tools/shoot.mjs --url http://localhost:5173/journeys/kerala --shots 0,1200
node tools/nav-check.mjs                # clicks every nav link, asserts it lands
node tools/nav-check.mjs --mobile       # same, through the mobile panel
node tools/a11y.mjs                     # landmarks, headings, alt, labels
```

Set `CHROME_PATH` if Chrome is not at the default Windows location.

## Not wired up

The search form and the enquiry CTAs are real, labelled, validated markup with a
success state, but they post nowhere — replace the `onSubmit` in
`components/search/TravelSearch.tsx` with a call to your booking API. Prices,
itineraries and traveller stories in `src/data` are placeholder content written to
the right shape and voice.
