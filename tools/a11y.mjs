// A quick structural accessibility read: landmarks, heading order, alt text,
// accessible names on controls. Not a substitute for axe, but it catches the
// things that actually go wrong in a hand-built layout.
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URLS = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['http://localhost:5173/', 'http://localhost:5173/journeys/kerala'];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });

for (const url of URLS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2500));

  const audit = await page.evaluate(() => {
    const heads = [...document.querySelectorAll('h1,h2,h3,h4')].map(
      (h) => h.tagName + ' · ' + h.textContent.trim().replace(/\s+/g, ' ').slice(0, 40)
    );
    const named = (el) =>
      Boolean(
        el.textContent.trim() ||
          el.getAttribute('aria-label') ||
          el.getAttribute('title') ||
          el.querySelector('.sr-only')
      );
    return {
      lang: document.documentElement.lang,
      main: document.querySelectorAll('main').length,
      header: document.querySelectorAll('header').length,
      footer: document.querySelectorAll('footer').length,
      h1: document.querySelectorAll('h1').length,
      headings: heads,
      // A missing alt attribute is a bug; an explicitly empty one marks a
      // decorative image whose name comes from its wrapping link.
      imagesMissingAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
      imagesMarkedDecorative: [...document.images].filter((i) => i.getAttribute('alt') === '')
        .length,
      unnamedControls: [...document.querySelectorAll('button, a')].filter((e) => !named(e)).length,
      inputsWithoutLabel: [...document.querySelectorAll('input, select')].filter(
        (i) => !i.id || !document.querySelector(`label[for="${CSS.escape(i.id)}"]`)
      ).length,
      focusables: document.querySelectorAll(
        'a[href], button, input, select, [tabindex]:not([tabindex="-1"])'
      ).length,
    };
  });

  console.log('\n=== ' + url);
  console.log(JSON.stringify(audit, null, 1));
  await page.close();
}

await browser.close();
