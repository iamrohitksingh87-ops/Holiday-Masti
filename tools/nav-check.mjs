/**
 * Clicks every primary navigation link and asserts the target section
 * actually arrives at the top of the viewport. Catches the classic SPA
 * failure where a hash link changes the URL but never scrolls.
 *
 *   node tools/nav-check.mjs [--mobile]
 */
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const MOBILE = process.argv.includes('--mobile');
const URL = 'http://localhost:5173/';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport(MOBILE ? { width: 390, height: 844 } : { width: 1440, height: 900 });
await page.goto(URL, { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 3000));

const results = [];

for (const target of ['journeys', 'flights', 'trains', 'india', 'experiences', 'about', 'plan']) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 700));

  if (MOBILE) {
    // Open the panel first; it is the only way in at this width.
    await page.click('.nav__toggle');
    await new Promise((r) => setTimeout(r, 600));
  }

  const selector = MOBILE
    ? `.nav__panel a[href="/#${target}"]`
    : `.nav__links a[href="/#${target}"], .nav__plan[href="/#${target}"]`;

  const link = await page.$(selector);
  if (!link) {
    results.push({ target, ok: false, why: 'link not found' });
    if (MOBILE) await page.keyboard.press('Escape');
    continue;
  }

  await link.click();
  await new Promise((r) => setTimeout(r, 2200));

  const check = await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return { found: false };
    const top = el.getBoundingClientRect().top;
    return { found: true, top: Math.round(top), scrollY: Math.round(window.scrollY), hash: location.hash };
  }, target);

  results.push({
    target,
    ok: check.found && Math.abs(check.top) < 120 && check.scrollY > 10,
    ...check,
  });
}

await browser.close();

const bad = results.filter((r) => !r.ok);
console.log((MOBILE ? 'MOBILE' : 'DESKTOP') + ' nav');
for (const r of results) {
  console.log(` ${r.ok ? 'PASS' : 'FAIL'}  #${r.target}  top=${r.top ?? '-'}  scrollY=${r.scrollY ?? '-'}  ${r.why ?? ''}`);
}
process.exitCode = bad.length ? 1 : 0;
