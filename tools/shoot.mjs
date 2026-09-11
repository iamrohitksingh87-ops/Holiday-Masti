/**
 * Design-review harness.
 *
 * Drives the local dev server in a headless system Chrome, captures each
 * breakpoint at a set of scroll positions (and optionally the whole page),
 * and reports console errors, horizontal overflow and image failures.
 *
 *   node tools/shoot.mjs [--url http://localhost:5173/] [--out .review]
 *                        [--sizes 1440x900,390x844] [--full] [--shots 0,1200,...]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const flag = (name) => process.argv.includes(`--${name}`);

const URL = arg('url', 'http://localhost:5173/');
const OUT = path.resolve(arg('out', '.review'));
const SIZES = arg('sizes', '1440x900')
  .split(',')
  .map((s) => {
    const [w, h] = s.split('x').map(Number);
    return { w, h, label: s };
  });
const SHOTS = arg('shots', '')
  .split(',')
  .filter(Boolean)
  .map(Number);

const CHROME =
  process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

await fs.mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--force-device-scale-factor=1', '--disable-lcd-text'],
});

const report = [];

for (const size of SIZES) {
  const page = await browser.newPage();
  await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 1 });

  if (flag('reduced')) {
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  }
  if (flag('nojs')) await page.setJavaScriptEnabled(false);

  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 300)));
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 300)));
  page.on('requestfailed', (r) => errors.push('REQFAIL ' + r.url().slice(-70)));

  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  // Let the loader finish and the opening beat settle.
  await new Promise((r) => setTimeout(r, 2600));

  const tag = `${size.label}`;

  if (flag('full')) {
    // Walk the page once so lazy images and scroll-linked scenes all commit.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 260));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 700));
    });
    await page.screenshot({ path: path.join(OUT, `${tag}-full.png`), fullPage: true });
  }

  if (flag('sections')) {
    const marks = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('section, .opening').forEach((el, i) => {
        const name =
          el.id || (el.className || '').toString().split(' ')[0].replace(/[^a-z0-9_-]/gi, '') || `s${i}`;
        // A pinned section reports its own height, not the scroll distance it
        // occupies — measure the spacer ScrollTrigger wrapped it in instead.
        const box = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
        const top = box.getBoundingClientRect().top + window.scrollY;
        const h = box.getBoundingClientRect().height;
        out.push({ name: `${String(i).padStart(2, '0')}-${name}`, top: Math.round(top), h: Math.round(h) });
      });
      return out;
    });

    for (const m of marks) {
      // Sample the top of each section, and its middle when it is a tall one.
      const stops = m.h > size.h * 1.8 ? [m.top + 40, m.top + m.h * 0.5, m.top + m.h - size.h] : [m.top + 40];
      for (let k = 0; k < stops.length; k++) {
        await page.evaluate((to) => window.scrollTo(0, to), Math.max(0, Math.round(stops[k])));
        await new Promise((r) => setTimeout(r, 1400));
        await page.screenshot({ path: path.join(OUT, `${tag}-${m.name}-${k}.png`) });
      }
    }
  }

  for (const y of SHOTS) {
    await page.evaluate((to) => window.scrollTo(0, to), y);
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUT, `${tag}-y${y}.png`) });
  }

  const audit = await page.evaluate(() => {
    const de = document.documentElement;
    const overflowing = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > de.clientWidth + 2 || r.left < -2);
      })
      .slice(0, 12)
      .map((el) => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`);

    const broken = [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src);

    return {
      docWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      height: document.body.scrollHeight,
      horizontalOverflow: de.scrollWidth > de.clientWidth + 1,
      overflowing: [...new Set(overflowing)],
      brokenImages: broken,
      images: document.images.length,
    };
  });

  report.push({ size: size.label, errors: [...new Set(errors)], ...audit });
  await page.close();
}

await browser.close();
await fs.writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
