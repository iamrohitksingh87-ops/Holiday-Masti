/**
 * Lay out Unsplash candidates for a look before anything is committed.
 *   node tools/harvest-unsplash.mjs ids.json
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const IDS = JSON.parse((await fs.readFile(process.argv[2], 'utf8')).replace(/^﻿/, ''));
const DIR = path.resolve('public/__cand');
await fs.rm(DIR, { recursive: true, force: true });
await fs.mkdir(DIR, { recursive: true });

const kept = [];
for (const id of IDS) {
  try {
    const r = await fetch(`https://images.unsplash.com/${id}?fm=webp&q=70&w=520&fit=max`);
    if (!r.ok) continue;
    await fs.writeFile(path.join(DIR, `${kept.length}.webp`), Buffer.from(await r.arrayBuffer()));
    kept.push(id);
  } catch {}
  process.stdout.write('.');
}

await fs.writeFile(path.resolve('public/__cand.json'), JSON.stringify(kept));
await fs.writeFile(
  path.resolve('public/__cand.html'),
  `<!doctype html><meta charset=utf-8><style>body{background:#111;margin:0;padding:8px}
  .g{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}figure{margin:0}
  img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#333}
  figcaption{color:#ffd479;font:14px system-ui;padding:2px 0}</style>
  <div class=g>${kept
    .map((_, n) => `<figure><img src="/__cand/${n}.webp"><figcaption>${n}</figcaption></figure>`)
    .join('\n')}</div>`
);
console.log('\nkept', kept.length);
