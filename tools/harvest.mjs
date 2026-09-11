/**
 * Pull candidate frames from Wikimedia Commons for a query, save thumbnails
 * under public/__cand and lay them out for a look. Commons is the reliable
 * source for a specific named landmark, where Unsplash search is not.
 *
 *   node tools/harvest.mjs "Charbagh railway station Lucknow" [limit]
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const UA = 'HolidayMastiSiteBuild/1.0 (design research)';
const QUERIES = process.argv[2].split('|');
const LIMIT = Number(process.argv[3] ?? 10);

const DIR = path.resolve('public/__cand');
await fs.rm(DIR, { recursive: true, force: true });
await fs.mkdir(DIR, { recursive: true });

const found = [];
for (const q of QUERIES) {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&generator=search` +
    `&gsrsearch=${encodeURIComponent(q + ' filetype:bitmap')}&gsrnamespace=6&gsrlimit=${LIMIT}` +
    `&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=520&format=json&formatversion=2`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) continue;
  const j = await r.json();
  for (const p of j?.query?.pages ?? []) {
    const ii = p.imageinfo?.[0];
    if (!ii || ii.width < 1600 || ii.width / ii.height < 0.9) continue;
    found.push({
      q,
      title: p.title.replace(/^File:/, ''),
      thumb: ii.thumburl,
      full: ii.url,
      w: ii.width,
      h: ii.height,
      license: ii.extmetadata?.LicenseShortName?.value ?? '',
      artist: (ii.extmetadata?.Artist?.value ?? '').replace(/<[^>]*>/g, '').trim().slice(0, 60),
    });
  }
}

const kept = [];
for (const c of found) {
  const id = String(kept.length).padStart(2, '0');
  try {
    const r = await fetch(c.thumb, { headers: { 'User-Agent': UA } });
    if (!r.ok) continue;
    await fs.writeFile(path.join(DIR, `${id}.jpg`), Buffer.from(await r.arrayBuffer()));
    kept.push({ id, ...c });
  } catch {}
  process.stdout.write('.');
}

await fs.writeFile(path.resolve('public/__cand.json'), JSON.stringify(kept, null, 1));
await fs.writeFile(
  path.resolve('public/__cand.html'),
  `<!doctype html><meta charset=utf-8><style>body{background:#111;margin:0;padding:8px}
  .g{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}figure{margin:0}
  img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;background:#333}
  figcaption{color:#ffd479;font:12px system-ui;padding:2px 0;white-space:nowrap;overflow:hidden}</style>
  <div class=g>${kept
    .map(
      (c) =>
        `<figure><img src="/__cand/${c.id}.jpg"><figcaption><b style="font-size:14px">${c.id}</b> ${c.w}×${c.h} ${c.title.slice(0, 40)}</figcaption></figure>`
    )
    .join('\n')}</div>`
);
console.log('\nkept', kept.length);
