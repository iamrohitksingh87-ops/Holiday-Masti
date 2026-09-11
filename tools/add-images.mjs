/**
 * Add frames to public/img at the responsive widths the site expects.
 *
 * Unsplash frames come straight off their CDN as WebP. Wikimedia frames are
 * only served as JPEG, so they are re-encoded to WebP through headless Chrome's
 * canvas — which keeps the whole library one format without pulling in a
 * native image toolchain.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.resolve('public/img');
const UA = 'HolidayMastiSiteBuild/1.0 (asset pipeline)';

// `flight-dusk` and `train-dusk` were sourced here originally; both are now
// supplied as local files below, so nothing remote claims those keys.
const UNSPLASH = {};

const COMMONS = {
  'lucknow-junction': { file: 'Charbagh Railway.jpg', wide: true },
};

/**
 * Frames supplied as local files. Same Chrome canvas re-encode as Commons, so
 * the whole library stays one format and one set of widths.
 *
 * `wide` is only ever set when the source is genuinely at least 2560px across —
 * generating a 2560 variant from a smaller original would ship a bigger file
 * with no more detail in it.
 */
const LOCAL = {
  'flight-dusk': {
    path: 'C:\\Users\\LENOVO\\Downloads\\ivan-shimko-tCp2K2sYpFg-unsplash.jpg',
    wide: true, // 4608 × 3072
  },
  'train-dusk': {
    path: 'C:\\Users\\LENOVO\\Downloads\\ChatGPT Image Sep 11, 2026, 10_45_02 AM.png',
    wide: false, // 1983 × 793 — tops out below 2560
  },
};

const widths = (wide) => (wide ? [640, 1280, 1920, 2560] : [640, 1280, 1920]);

await fs.mkdir(OUT, { recursive: true });

/** Only touch the sources named on the command line, if any were. */
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const wanted = (name) => only.length === 0 || only.includes(name);

/* ---- Unsplash --------------------------------------------------------- */
for (const [name, { id, wide }] of Object.entries(UNSPLASH).filter(([n]) => wanted(n))) {
  for (const w of widths(wide)) {
    const url = `https://images.unsplash.com/${id}?fm=webp&q=${w > 1500 ? 68 : 74}&w=${w}&fit=max&auto=compress`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${name} ${w}: HTTP ${r.status}`);
    await fs.writeFile(path.join(OUT, `${name}-${w}.webp`), Buffer.from(await r.arrayBuffer()));
  }
  const r = await fetch(`https://images.unsplash.com/${id}?fm=webp&q=35&w=24&fit=max&blur=20`);
  await fs.writeFile(path.join(OUT, `${name}-lqip.webp`), Buffer.from(await r.arrayBuffer()));
  console.log('unsplash', name, 'ok');
}

/* ---- Wikimedia Commons ------------------------------------------------ */
const commonsThumb = async (file, width) => {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent('File:' + file)}` +
    `&prop=imageinfo&iiprop=url|size&iiurlwidth=${width}&format=json&formatversion=2`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  const j = await r.json();
  const ii = j?.query?.pages?.[0]?.imageinfo?.[0];
  if (!ii?.thumburl) throw new Error('no thumb for ' + file);
  return ii.thumburl;
};

const commonsEntries = Object.entries(COMMONS).filter(([n]) => wanted(n));
const localEntries = Object.entries(LOCAL).filter(([n]) => wanted(n));

if (commonsEntries.length || localEntries.length) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();

  /** Re-encode one source buffer to WebP at every width the site asks for. */
  const encode = async (name, wide, mime, buffer) => {
    for (const w of [...widths(wide), 24]) {
      const b64 = buffer.toString('base64');
      const dataUrl = await page.evaluate(
        async (payload, type, targetWidth, quality) => {
          const img = new Image();
          img.src = `data:${type};base64,` + payload;
          await img.decode();
          const scale = targetWidth / img.naturalWidth;
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = Math.round(img.naturalHeight * scale);
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL('image/webp', quality);
        },
        b64,
        mime,
        w,
        w > 1500 ? 0.68 : w === 24 ? 0.4 : 0.74
      );
      const dest = w === 24 ? `${name}-lqip.webp` : `${name}-${w}.webp`;
      await fs.writeFile(path.join(OUT, dest), Buffer.from(dataUrl.split(',')[1], 'base64'));
    }
  };

  for (const [name, { file, wide }] of commonsEntries) {
    // Pull the largest thumbnail once, then resize locally like any other source.
    const src = await commonsThumb(file, Math.max(...widths(wide)));
    const res = await fetch(src, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
    await encode(name, wide, 'image/jpeg', Buffer.from(await res.arrayBuffer()));
    console.log('commons', name, 'ok');
  }

  for (const [name, { path: src, wide }] of localEntries) {
    const buffer = await fs.readFile(src);
    const mime = src.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
    await encode(name, wide, mime, buffer);
    console.log('local', name, 'ok', wide ? '(640/1280/1920/2560)' : '(640/1280/1920)');
  }

  await browser.close();
}

const files = await fs.readdir(OUT);
console.log('library now holds', files.length, 'files');
