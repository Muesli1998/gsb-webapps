import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Anonymous official WordPress media API index plus a polite Wayback CDX probe.
// The index finds candidates; every candidate still needs manual scope review.
const terms = [
  'reglement', 'holdturnering', 'ungdomshold', 'veteran', 'serie', 'kredsserie',
  'DH-reglement', 'senior', 'indbydelse', 'tillæg',
  'ungdomsholdturnering', 'holdturneringsreglement', 'veteranholdturnering',
];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const batches = [];
for (const term of terms) {
  const url = new URL('https://badminton.dk/wp-json/wp/v2/media');
  url.searchParams.set('search', term);
  url.searchParams.set('per_page', '100');
  const response = await fetch(url, { headers: { 'User-Agent': 'gsb-webapps-regulation-discovery/130 (public metadata only)' }, signal: AbortSignal.timeout(15000) });
  const total = Number(response.headers.get('x-wp-total') ?? 0);
  const pages = Math.max(1, Number(response.headers.get('x-wp-totalpages') ?? 1));
  const items = [];
  if (response.ok) {
    for (let page = 1; page <= pages; page++) {
      if (page > 1) {
        const next = new URL(url);
        next.searchParams.set('page', String(page));
        const pageResponse = await fetch(next, { headers: { 'User-Agent': 'gsb-webapps-regulation-discovery/130 (public metadata only)' }, signal: AbortSignal.timeout(15000) });
        if (!pageResponse.ok) { items.push({ listing_error: `HTTP ${pageResponse.status}`, page }); break; }
        items.push(...(await pageResponse.json()).map(x => ({ date: x.date, title: x.title?.rendered ?? '', source_url: x.source_url, mime_type: x.mime_type })));
      } else {
        items.push(...(await response.json()).map(x => ({ date: x.date, title: x.title?.rendered ?? '', source_url: x.source_url, mime_type: x.mime_type })));
      }
      await wait(700);
    }
  }
  batches.push({ term, status: response.status, reported_total: total, reported_pages: pages, candidates: items.filter(x => /hold|reglement|turnering|veteran|ungdom|dmu/i.test(x.title ?? '')) });
  await wait(700);
}
let wayback;
try {
  const url = 'https://web.archive.org/cdx/search/cdx?url=badminton.dk/holdturneringsregler/&output=json&filter=statuscode%3A200&collapse=urlkey';
  const response = await fetch(url, { headers: { 'User-Agent': 'gsb-webapps-regulation-discovery/130 (public archive query)' }, signal: AbortSignal.timeout(10000) });
  const body = await response.text();
  wayback = { url, status: response.status, response_excerpt: body.slice(0, 2000), usable_snapshots: response.ok && body.length > 2 };
} catch (error) {
  wayback = { status: 'request_failed_or_timed_out', error: String(error) };
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'results');
await mkdir(root, { recursive: true });
const waybackDirectProbes = [
  'https://web.archive.org/web/20190701000000id_/https://badminton.dk/holdturneringsregler/',
  'https://web.archive.org/web/20200115193749id_/https://badminton.dk/wp-content/uploads/2020/01/F%C3%A6lles-reglement-for-ungdomsholdturneringen-2019-2020.pdf',
  'https://web.archive.org/web/20240701000000id_/https://www.badmintonkoebenhavn.dk/holdturnering',
  'https://web.archive.org/web/20200801000000id_/https://badminton.dk/wp-content/uploads/',
];
const directResults = [];
for (const url of waybackDirectProbes) {
  try {
    const response = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'gsb-webapps-regulation-discovery/130 (public archive request)' }, signal: AbortSignal.timeout(12000) });
    const bytes = Buffer.from(await response.arrayBuffer());
    directResults.push({ url, status: response.status, final_url: response.url, content_type: response.headers.get('content-type'), bytes: bytes.length, pdf_signature: bytes.subarray(0, 5).toString() === '%PDF-', sha256: bytes.subarray(0, 5).toString() === '%PDF-' ? createHash('sha256').update(bytes).digest('hex') : undefined });
  } catch (error) { directResults.push({ url, status: 'request_failed_or_timed_out', error: String(error) }); }
  await wait(1000);
}
const output = { generated_at: new Date().toISOString().slice(0, 10), method: 'Unauthenticated metadata query; no page scraping, cookies, login, or robot restrictions bypassed. Candidates require manual validation and do not constitute completeness.', official_wordpress_media_searches: batches, wayback_cdx_probe: wayback, wayback_direct_probes: directResults };
await writeFile(path.join(root, '130-source-discovery.json'), `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ output: 'statistik/results/130-source-discovery.json', queries: batches.map(x => ({ term: x.term, status: x.status, total: x.reported_total, candidates: x.candidates.length })), wayback: { status: wayback.status, usable_snapshots: wayback.usable_snapshots ?? false } }, null, 2));
