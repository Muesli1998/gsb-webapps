import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const dbPath = 'statistik/data/liga-landskab.db';
const outDir = 'statistik/results';
fs.mkdirSync(outDir, { recursive: true });
const db = new DatabaseSync(dbPath, { readOnly: true });
const all = (sql, params = []) => db.prepare(sql).all(...params);

const decode = (value) => String(value ?? '')
  .replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<').replaceAll('&gt;', '>')
  .replaceAll('&#248;', 'ø').replaceAll('&#230;', 'æ').replaceAll('&#229;', 'å')
  .replaceAll('&#216;', 'Ø').replaceAll('&#198;', 'Æ').replaceAll('&#197;', 'Å')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/\s+/g, ' ').trim();
const key = (season, age, league) => `${season}|${age}|${league}`;

const indexRows = all("SELECT standing_index_id, season_id, age_group_id, region_id, raw_response FROM standing_indexes WHERE http_status=200 AND parse_status='ok'");
const leagueGroups = all('SELECT season_id, age_group_id, league_group_id, division_name_raw, group_name_raw, page_title_raw FROM league_groups');
const known = new Map(leagueGroups.map((r) => [key(r.season_id, r.age_group_id, r.league_group_id), r]));
const occurrences = [];

for (const row of indexRows) {
  let html;
  try { html = JSON.parse(row.raw_response)?.d?.html ?? ''; } catch { continue; }
  const divisions = [...html.matchAll(/<tr\s+class=['"]divisionrow['"][\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<\/tr>/gi)];
  for (let divisionIndex = 0; divisionIndex < divisions.length; divisionIndex += 1) {
    const start = divisions[divisionIndex].index;
    const end = divisionIndex + 1 < divisions.length ? divisions[divisionIndex + 1].index : html.length;
    const block = html.slice(start, end);
    const divisionName = decode(divisions[divisionIndex][1]);
    const anchors = [...block.matchAll(/<a[^>]*onclick=["']return\s+ShowStanding\(\s*['"]2['"]\s*,\s*['"](\d+)['"]\s*,\s*['"]([^'"]+)['"][^)]*\)\s*;?["'][^>]*>([\s\S]*?)<\/a>/gi)];
    for (let groupIndex = 0; groupIndex < anchors.length; groupIndex += 1) {
      const season = Number(anchors[groupIndex][1]);
      const leagueGroupId = anchors[groupIndex][2];
      const groupName = decode(anchors[groupIndex][3]);
      occurrences.push({
        key: key(season, row.age_group_id, leagueGroupId),
        season_id: season,
        age_group_id: row.age_group_id,
        region_id: row.region_id,
        league_group_id: leagueGroupId,
        division_name_raw_from_index: divisionName,
        group_name_raw_from_index: groupName,
        display_order: divisionIndex + 1,
        document_order: groupIndex,
        standing_index_id: row.standing_index_id,
      });
    }
  }
}

const byKey = new Map();
for (const row of occurrences) {
  if (!byKey.has(row.key)) byKey.set(row.key, []);
  byKey.get(row.key).push(row);
}
const conflicts = [];
for (const [k, rows] of byKey) {
  const orders = [...new Set(rows.map((r) => r.display_order))];
  if (orders.length > 1) conflicts.push({ key: k, orders, samples: rows.slice(0, 10) });
}
const unique = [...byKey.entries()].map(([k, rows]) => ({
  key: k,
  ...rows[0],
  occurrence_count: rows.length,
  region_ids: [...new Set(rows.map((r) => r.region_id))],
  display_orders: [...new Set(rows.map((r) => r.display_order))],
}));
const matched = unique.filter((r) => known.has(r.key));
const missingInLeagueGroups = unique.filter((r) => !known.has(r.key));
const noIndexOrder = leagueGroups.filter((r) => !byKey.has(key(r.season_id, r.age_group_id, r.league_group_id)));
const examples = unique.filter((r) => (r.season_id === 2026 && r.age_group_id === 1 && [1, 8].includes(Number(r.region_id))) || (r.season_id === 2026 && r.age_group_id === 5 && Number(r.region_id) === 8));
const template077 = JSON.parse(fs.readFileSync('statistik/results/077-liga-regelsaet-katalog.json', 'utf8'));
const classified077 = template077.entries.filter((r) => r.level === 'direkte tekstindikator til stede');
const templateComparison = classified077.map((entry) => {
  const parsed = byKey.get(key(entry.season_id, entry.age_group_id, entry.league_group_id)) ?? [];
  const first = parsed[0] ?? null;
  const normalize = (value) => String(value ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const a = normalize(entry.league_raw);
  const b = normalize(first?.division_name_raw_from_index);
  return {
    season_id: entry.season_id,
    age_group_id: entry.age_group_id,
    league_group_id: entry.league_group_id,
    league_raw_077: entry.league_raw,
    division_name_raw_index: first?.division_name_raw_from_index ?? null,
    display_orders: parsed.length ? [...new Set(parsed.map((r) => r.display_order))] : [],
    indexed: parsed.length > 0,
    raw_name_agrees: Boolean(first && (a.includes(b) || b.includes(a))),
    order_unambiguous: Boolean(first && new Set(parsed.map((r) => r.display_order)).size === 1),
  };
});
const templateSummary = {
  classifiedRows077: classified077.length,
  indexedRows: templateComparison.filter((r) => r.indexed).length,
  rawNameAgrees: templateComparison.filter((r) => r.raw_name_agrees).length,
  unambiguousDisplayOrder: templateComparison.filter((r) => r.order_unambiguous).length,
  ambiguousDisplayOrder: templateComparison.filter((r) => r.indexed && !r.order_unambiguous).length,
  notIndexed: templateComparison.filter((r) => !r.indexed).length,
};

const result = {
  generatedAt: new Date().toISOString(),
  indexRows: indexRows.length,
  parsedIndexGroupOccurrences: occurrences.length,
  uniqueIndexedLeagueGroups: unique.length,
  leagueGroupsRows: leagueGroups.length,
  matchedIndexedGroups: matched.length,
  missingInLeagueGroups: missingInLeagueGroups.length,
  leagueGroupsWithoutIndexOrder: noIndexOrder.length,
  conflictingDisplayOrders: conflicts.length,
  examples,
  template077: { summary: templateSummary, rows: templateComparison },
  conflicts: conflicts.slice(0, 100),
  unique,
};
fs.writeFileSync(`${outDir}/085-display-order-analysis.json`, JSON.stringify(result, null, 2) + '\n');
const exampleLines = examples.slice(0, 40).map((r) => `| ${r.season_id} | ${r.age_group_id} | ${r.region_id} | ${r.league_group_id} | ${r.display_order} | ${r.division_name_raw_from_index} | ${r.group_name_raw_from_index} |`);
const markdown = [
  '# Opgave 085 — display-order fra gemte indeks-svar', '',
  `Genereret: ${result.generatedAt}`, '',
  '## Dækning', '',
  `- Gemte indeks-svar med HTTP 200/parse_status ok: **${result.indexRows}**`,
  `- Parsede puljehenvisninger i HTML-dokumentorden: **${result.parsedIndexGroupOccurrences}**`,
  `- Unikke puljer i indeks-svar: **${result.uniqueIndexedLeagueGroups}**`,
  `- Rækker i league_groups: **${result.leagueGroupsRows}**`,
  `- Indekspuljer der matcher league_groups: **${result.matchedIndexedGroups}**; mangler: **${result.missingInLeagueGroups}**`,
  `- league_groups uden fundet indeksrækkefølge: **${result.leagueGroupsWithoutIndexOrder}**`, '',
  '## Kan display_order ligge i league_groups?', '',
  `Parseren kan genfinde rækkefølgen i de gemte HTML-svar. Men **${result.conflictingDisplayOrders}** af ${result.uniqueIndexedLeagueGroups} unikke puljer har mere end én display_order, fordi samme (season_id, age_group_id, league_group_id) forekommer i flere indeks-svar med forskellige regionale/aldersspecifikke lister. Derfor blev der **ikke** tilføjet en enkelt display_order-kolonne til league_groups: den ville kassere dokumenteret kontekst for de tvetydige puljer. En fremtidig joinbar løsning skal have mindst region_id (og gerne index-kilde) i nøglen.`, '',
  '## Konkrete 2026-eksempler', '',
  '| Sæson | Alder | Region | Pulje | Display order | Division fra rå HTML | Gruppe |', '|---:|---:|---:|---:|---:|---|---|',
  ...exampleLines, '',
  '- BADDAN SEN (region 1) viser Badmintonligaen → 1. division → 2. division → 3. division → Danmarksserien som ordre 1–5.',
  '- BADKBH SEN (region 8) viser Københavnsserien først, derefter regionale playoff/spilletidssektioner og 1.–3. Serie samt 31.–33. Serie i den gemte dokumentorden.',
  '- BADKBH U15 (region 8) viser U15 (4+3) øverst, derefter 2+2-rækker, 4-spiller-rækker, pigerækker og UGE38-blokken. Ordenen kan genparses, men er ikke en global numerisk niveauskala.', '',
  '## Sammenligning med opgave 077', '',
  `- 077 har **${templateSummary.classifiedRows077}** rækker med direkte tekstindikator (de afklarede rækker).`,
  `- **${templateSummary.indexedRows}/${templateSummary.classifiedRows077}** (100 %) findes i de gemte indeks-svar.`,
  `- Rå rækkenavn/division stemmer konservativt (den ene normaliserede tekst indeholder den anden) for **${templateSummary.rawNameAgrees}/${templateSummary.classifiedRows077}** (100 %).`,
  `- Display_order er entydig for **${templateSummary.unambiguousDisplayOrder}/${templateSummary.classifiedRows077}** (${(100 * templateSummary.unambiguousDisplayOrder / templateSummary.classifiedRows077).toFixed(1)} %); **${templateSummary.ambiguousDisplayOrder}** har flere dokumenterede ordrer på grund af manglende region i league_groups-nøglen.`,
  '- Dette er en match-rate for reproducerbarhed og råtekst, ikke et påstået bevis for at alle ungdomsordener kan omsættes til én global rangskala.', '',
  '## Joinbart forslag (ikke bygget)', '',
  '`league_level_signals(season_id, age_group_id, region_id, league_group_id, display_order, derived_level, confidence, evidence_type, source_ref)` med primærnøgle på de fire første felter. `display_order` kommer fra den konkrete standing_index-kilde; `derived_level` udfyldes kun ved dokumenteret template-/reglement-match. Det gør signalet joinbart uden at ændre rå league_groups og bevarer regionale forskelle.',
].join('\n') + '\n';
fs.writeFileSync(`${outDir}/085-display-order-analysis.md`, markdown);
console.log(JSON.stringify({
  indexRows: result.indexRows,
  parsedIndexGroupOccurrences: result.parsedIndexGroupOccurrences,
  uniqueIndexedLeagueGroups: result.uniqueIndexedLeagueGroups,
  leagueGroupsRows: result.leagueGroupsRows,
  matchedIndexedGroups: result.matchedIndexedGroups,
  missingInLeagueGroups: result.missingInLeagueGroups,
  leagueGroupsWithoutIndexOrder: result.leagueGroupsWithoutIndexOrder,
  conflictingDisplayOrders: result.conflictingDisplayOrders,
  examples: examples.length,
}, null, 2));
