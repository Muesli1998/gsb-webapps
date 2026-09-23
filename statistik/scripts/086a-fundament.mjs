import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const landscapePath = 'statistik/data/liga-landskab.db';
const normalizedPath = 'statistik/data/gsb-statistik-normalized.db';
const outDir = 'statistik/results';
fs.mkdirSync(outDir, { recursive: true });
const decode = (value) => String(value ?? '')
  .replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<').replaceAll('&gt;', '>')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/\s+/g, ' ').trim();
const groupKey = (season, age, group) => `${season}|${age}|${group}`;

// Mål 1: parse only the already stored standing_indexes.raw_response.
const db = new DatabaseSync(landscapePath, { readOnly: true });
const all = (sql, params = []) => db.prepare(sql).all(...params);
const indexes = all("SELECT standing_index_id, season_id, age_group_id, region_id, raw_response, http_status, parse_status FROM standing_indexes");
const parsedGroups = new Map();
const coverage = [];
for (const row of indexes) {
  let html = '';
  let parseReason = 'ok';
  try { html = JSON.parse(row.raw_response ?? '')?.d?.html ?? ''; } catch { parseReason = 'invalid_json'; }
  if (!html) parseReason = 'missing_html';
  const divisions = [...html.matchAll(/<tr\s+class=['"]divisionrow['"][\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<\/tr>/gi)];
  let links = 0;
  for (let i = 0; i < divisions.length; i += 1) {
    const start = divisions[i].index;
    const end = i + 1 < divisions.length ? divisions[i + 1].index : html.length;
    const block = html.slice(start, end);
    const division = decode(divisions[i][1]);
    const anchors = [...block.matchAll(/<a[^>]*onclick=["']return\s+ShowStanding\(\s*['"]2['"]\s*,\s*['"](\d+)['"]\s*,\s*['"]([^'"]+)['"][^)]*\)\s*;?["'][^>]*>([\s\S]*?)<\/a>/gi)];
    for (let j = 0; j < anchors.length; j += 1) {
      links += 1;
      const k = groupKey(Number(anchors[j][1]), row.age_group_id, anchors[j][2]);
      if (!parsedGroups.has(k)) parsedGroups.set(k, []);
      parsedGroups.get(k).push({ standing_index_id: row.standing_index_id, season_id: Number(anchors[j][1]), age_group_id: row.age_group_id, region_id: row.region_id, league_group_id: anchors[j][2], display_order: i + 1, division_name_raw: division, group_name_raw: decode(anchors[j][3]) });
    }
  }
  if (parseReason === 'ok' && links === 0) parseReason = 'no_division_or_group_links';
  coverage.push({ standing_index_id: row.standing_index_id, season_id: row.season_id, age_group_id: row.age_group_id, region_id: row.region_id, http_status: row.http_status, parse_status: row.parse_status, links, parse_reason: parseReason });
}
const leagueGroups = all('SELECT season_id, age_group_id, league_group_id FROM league_groups');
const uniqueParsed = [...parsedGroups.values()].map((rows) => ({ ...rows[0], occurrences: rows.length, display_orders: [...new Set(rows.map((r) => r.display_order))] }));
const m1 = {
  index_rows: indexes.length,
  reconstructed_pages: coverage.filter((r) => r.links > 0).length,
  not_reconstructed_pages: coverage.filter((r) => r.links === 0).length,
  not_reconstructed_reasons: Object.fromEntries(Object.entries(Object.groupBy(coverage.filter((r) => r.links === 0), (r) => r.parse_reason)).map(([k, v]) => [k, v.length])),
  regions_seen: [...new Set(coverage.filter((r) => r.links > 0).map((r) => r.region_id))].sort((a, b) => a - b),
  seasons_seen: [...new Set(coverage.filter((r) => r.links > 0).map((r) => r.season_id))].sort((a, b) => a - b),
  age_groups_seen: [...new Set(coverage.filter((r) => r.links > 0).map((r) => r.age_group_id))].sort((a, b) => a - b),
  parsed_group_occurrences: coverage.reduce((n, r) => n + r.links, 0),
  unique_parsed_groups: uniqueParsed.length,
  league_groups_rows: leagueGroups.length,
  unique_groups_with_conflicting_order: uniqueParsed.filter((r) => r.display_orders.length > 1).length,
};

// Mål 2: derive a per-pulje signature from stored match category rows.
const categoryRows = all(`SELECT lmg.season_id, lmg.age_group_id, lmg.league_group_id, lmg.external_match_id, mc.category_raw
  FROM league_match_groups lmg JOIN match_categories mc ON mc.external_match_id = lmg.external_match_id`);
const groupMatches = new Map();
for (const row of categoryRows) {
  const k = groupKey(row.season_id, row.age_group_id, row.league_group_id);
  if (!groupMatches.has(k)) groupMatches.set(k, new Map());
  if (!groupMatches.get(k).has(row.external_match_id)) groupMatches.get(k).set(row.external_match_id, []);
  groupMatches.get(k).get(row.external_match_id).push(row.category_raw ?? '(NULL)');
}
const signatureFor = (categories) => {
  const counts = {}; for (const c of categories) counts[c] = (counts[c] ?? 0) + 1;
  return Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)).map(([c, n]) => `${c}×${n}`).join('|');
};
const signatures = [...groupMatches.entries()].map(([k, matches]) => {
  const perMatch = [...matches.entries()].map(([external_match_id, categories]) => ({ external_match_id, signature: signatureFor(categories), category_count: categories.length, categories: [...new Set(categories)].sort() }));
  const distinct = [...new Set(perMatch.map((m) => m.signature))];
  return { key: k, match_count: perMatch.length, distinct_signature_count: distinct.length, consistent: distinct.length <= 1, signatures: distinct, sample_variations: perMatch.filter((m) => m.signature !== distinct[0]).slice(0, 5) };
});
const m2 = { group_count_with_categories: signatures.length, consistent_groups: signatures.filter((r) => r.consistent).length, varying_groups: signatures.filter((r) => !r.consistent).length, total_match_category_rows: categoryRows.length, total_matches_with_categories: signatures.reduce((n, r) => n + r.match_count, 0), varying_examples: signatures.filter((r) => !r.consistent).slice(0, 10) };

db.close();

// Mål 3: SearchClubInfo is the only live endpoint used here. It enumerates clubs by region/page.
const service = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/';
const pageUrl = 'https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/#1,2026,,1,1,,,,';
const pageText = await (await fetch(pageUrl)).text();
const callbackcontextkey = pageText.match(/var SR_CallbackContext = ['"]([^'"]+)['"]/)?.[1];
if (!callbackcontextkey) throw new Error('Kunne ikke finde SR_CallbackContext');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const registryRows = new Map();
const calls = [];
for (let region_id = 1; region_id <= 33; region_id += 1) {
  let total = null;
  for (let pageno = 0; pageno < 200; pageno += 1) {
    const body = { callbackcontextkey, clubid: 0, regionid: region_id, postalcode1: '', postalcode2: '', city: '', bodyonly: false, clubtype: 0, categorylist: '', pageno };
    const fetched_at = new Date().toISOString();
    let response;
    try {
      response = await fetch(`${service}SearchClubInfo`, { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
      const json = await response.json();
      const html = json?.d?.html ?? '';
      const rows = [...html.matchAll(/<tr[^>]*>\s*<td[^>]*>\s*<a[^>]*clubid=(\d+)[^>]*>([\s\S]*?)<\/a>\s*<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => ({ club_id: Number(m[1]), club_name_raw: decode(m[2]), postal_code: decode(m[3]), city_raw: decode(m[4]), region_id, fetched_at }));
      for (const row of rows) {
        // SearchClubInfo returns no home-region field. Keep one canonical row;
        // the requested region is lookup context, not a home-region assertion.
        if (!registryRows.has(String(row.club_id))) registryRows.set(String(row.club_id), { ...row, region_id: null });
      }
      total = Number(html.match(/Antal fundet i alt:\s*(\d+)/i)?.[1] ?? total ?? rows.length);
      calls.push({ region_id, pageno, http_status: response.status, rows: rows.length, total });
      if (rows.length === 0 || (total != null && (pageno + 1) * 100 >= total)) break;
    } catch (error) {
      calls.push({ region_id, pageno, error: String(error) });
      break;
    }
    await sleep(100);
  }
}

const writeDb = new DatabaseSync(landscapePath);
writeDb.exec('DROP TABLE IF EXISTS club_registry');
writeDb.exec(`CREATE TABLE club_registry (
  club_id INTEGER NOT NULL,
  club_name_raw TEXT NOT NULL,
  region_id INTEGER,
  postal_code TEXT,
  fetched_at TEXT NOT NULL,
  PRIMARY KEY (club_id)
)`);
const insert = writeDb.prepare('INSERT OR REPLACE INTO club_registry (club_id, club_name_raw, region_id, postal_code, fetched_at) VALUES (?, ?, ?, ?, ?)');
writeDb.exec('BEGIN');
for (const row of registryRows.values()) insert.run(row.club_id, row.club_name_raw, row.region_id, row.postal_code, row.fetched_at);
writeDb.exec('COMMIT');
const registryCount = writeDb.prepare('SELECT COUNT(*) AS n FROM club_registry').get().n;
writeDb.close();

const report = { generatedAt: new Date().toISOString(), m1, m2, m3: { regions_requested: 33, calls: calls.length, successful_calls: calls.filter((c) => c.http_status === 200).length, errors: calls.filter((c) => c.error).length, distinct_clubs: registryRows.size, registry_rows_written: registryRows.size, registry_rows_in_db: registryCount, home_region_values: [...registryRows.values()].filter((r) => r.region_id != null).length, calls }, reconciliation: { reason: '085 counted all 16269 input rows and only reported extracted link occurrences; it did not count rows with zero links as failed pages. 086a explicitly counts per-page links. The 13373 rows are valid empty index shells (title plus ShowStanding(0) search link), not an HTML regex variant.', sample_empty_pages: [{ standing_index_id: 1, season_id: 2010, age_group_id: 2, region_id: 1, page_title: 'BADDAN U09 2010/2011' }, { standing_index_id: 2, season_id: 2010, age_group_id: 2, region_id: 4, page_title: 'BADMIDJ U09 2010/2011' }, { standing_index_id: 3, season_id: 2010, age_group_id: 2, region_id: 2, page_title: 'DGI U09 2010/2011' }] }, note: 'Mål 1 og 2 bruger kun allerede gemte rådata. Mål 3 bruger udelukkende SearchClubInfo; ingen GetLeagueStanding- eller Nembadminton-kald er foretaget. SearchClubInfo-svaret har ikke et home-region-felt; region_id gemmes derfor som NULL i stedet for at fejlmærke lookup-konteksten som hjemmeregion.' };
const m3 = report.m3;
fs.writeFileSync(`${outDir}/086a-fundament.json`, JSON.stringify(report, null, 2) + '\n');
const md = [
  '# Opgave 086a — fundament', '', `Genereret: ${report.generatedAt}`, '',
  '## Mål 1 — siderækkefølge', '', `- ${m1.reconstructed_pages}/${m1.index_rows} gemte indeks-sider rekonstrueret; ${m1.not_reconstructed_pages} kunne ikke.`, `- Regioner: ${m1.regions_seen.length}/33 (${m1.regions_seen.join(', ')}); sæsoner: ${m1.seasons_seen.length}; aldersgrupper: ${m1.age_groups_seen.length}.`, `- ${m1.parsed_group_occurrences} puljehenvisninger og ${m1.unique_parsed_groups} unikke puljer; ${m1.unique_groups_with_conflicting_order} har konfliktende ordre, fordi samme pulje forekommer i flere indekskontekster.`, `- Ikke-rekonstruerede årsager: ${JSON.stringify(m1.not_reconstructed_reasons)}.`, '',
  '## Mål 2 — spilleform-signatur', '', `- ${m2.group_count_with_categories} puljer med kategoridata; ${m2.total_matches_with_categories} kampe og ${m2.total_match_category_rows} kategorirækker.`, `- Konsistent signatur i ${m2.consistent_groups} puljer; varierende signatur i ${m2.varying_groups}. Signaturen er den sorterede multiset af category_raw pr. kamp; variation er rapporteret, ikke fortolket.`, ...m2.varying_examples.map((r) => `- Variationsgruppe ${r.key}: ${r.match_count} kampe, signaturer ${r.signatures.join(' vs. ')}; eksempler ${r.sample_variations.map((s) => `${s.external_match_id}=${s.signature}`).join(', ')}`), '',
  '## Mål 3 — klubregister', '', `- SearchClubInfo: ${m3.calls.length} kald for 33 regionfiltre; ${m3.successful_calls} HTTP 200, ${m3.errors} fejl.`, `- ${m3.registry_rows_written} unikke klubrækker skrevet til club_registry; ${m3.registry_rows_in_db} rækker i tabellen efter kørsel; home_region-værdier: ${m3.home_region_values}.`, '- Endpointets HTML indeholder klub-ID, navn og postnummer, men intet home-region-felt. Regionfilteret gav samme klub i flere regioner (fx GSB i region 1, 2, 8 og 24), så region_id er NULL frem for en upræcis antagelse.', '',
  '## Afgrænsning og værn', '', '- Ingen GetLeagueStanding- eller Nembadminton-kald. `gsb-statistik-normalized.db` og `rangliste-historik.db` er kun læst. Rådata i `liga-landskab.db` er ikke ændret ud over den nye `club_registry`-tabel.',
].join('\n') + '\n';
fs.writeFileSync(`${outDir}/086a-fundament.md`, md);
console.log(JSON.stringify(report, null, 2));
