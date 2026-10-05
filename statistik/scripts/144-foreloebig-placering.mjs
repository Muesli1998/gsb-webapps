import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = process.cwd();
const dbPath = path.join(root, 'statistik/data/liga-landskab.db');
const normalizedPath = path.join(root, 'statistik/data/gsb-statistik-normalized.db');
const inputPath = path.join(root, 'statistik/results/143-ungdom-i-tal.json');
const parser136Path = path.join(root, 'statistik/results/136-parser-effekt.json');
const outputJson = path.join(root, 'statistik/results/144-ungdom-i-tal.json');
const outputMd = path.join(root, 'statistik/results/144-aendringer-mod-143.md');
const expectedHashes = {
  landscape: '9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c',
  normalized: '49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e',
};
const formatOrder = new Map([['4+3', 1], ['4+2', 2], ['2+2', 3], ['4 spillere', 4], ['4 piger', 5], ['3 spillere', 6]]);
const levelOrder = { E: 0, M: 1, A: 2, B: 3, C: 4, 'C-D': 5, D: 6, Dx: 7 };
const nameFormatPatterns = [
  ['4+3', /\(\s*4\s*\+\s*3\s*\)/iu],
  ['4+2', /\(\s*4\s*\+\s*2\s*\)/iu],
  ['2+2', /\(\s*2\s*\+\s*2\s*\)/iu],
  ['4 spillere', /\(\s*4\s*spillere\s*\)/iu],
  ['4 piger', /\(\s*4\s*piger\s*\)/iu],
  ['3 spillere', /\(\s*3\s*spillere\s*\)/iu],
];

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}
function tableRows(file) {
  const db = new DatabaseSync(file, { readOnly: true });
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const counts = Object.fromEntries(tables.map(({ name }) => [name, db.prepare(`SELECT COUNT(*) AS n FROM "${name.replaceAll('"', '""')}"`).get().n]));
  db.close();
  return counts;
}
function dbSnapshot() {
  return {
    landscape: { sha256: sha256(dbPath), row_counts: tableRows(dbPath) },
    normalized: { sha256: sha256(normalizedPath), row_counts: tableRows(normalizedPath) },
  };
}
function readRawRows() {
  const db = new DatabaseSync(dbPath, { readOnly: true });
  const rows = db.prepare(`
    SELECT g.season_id, g.age_group_id, g.league_group_id, g.division_name_raw,
           t.league_group_team_id, t.team_name_raw
    FROM league_groups g
    LEFT JOIN league_group_teams t
      ON t.season_id=g.season_id AND t.age_group_id=g.age_group_id AND t.league_group_id=g.league_group_id
    WHERE g.age_group_id IN (2,3,4,5,6,7,18)
    ORDER BY g.season_id,g.age_group_id,g.league_group_id,t.league_group_team_id
  `).all();
  db.close();
  return rows;
}
const comboKey = (season, age) => `${season}|${age}`;
const poolKey = (season, age, group) => `${season}|${age}|${group}`;
function parseName(name, parser136ByName) {
  const title = String(name ?? '').normalize('NFC');
  const format = nameFormatPatterns.find(([, re]) => re.test(title))?.[0] ?? null;
  if (!format) return { ok: false, reason: 'Intet entydigt kanonisk format i parentes.' };

  // Dx is the approved 144-specific addition. Other letter levels and their
  // numeric parsing come directly from the existing 136 parser result.
  const dxMatch = title.match(/^\s*U\s*\d+(?:\s*\/\s*U?\s*\d+)?\s+Dx(?=\b|\s|,)[\s,;:-]*(\d{3,5})?/iu);
  if (dxMatch) return { ok: true, format, level: {
    raw_level: 'Dx', letter: null, rank: levelOrder.Dx,
    numeric_value: dxMatch[1] ? Number(dxMatch[1]) : null,
    interpretable: true, display_name: 'nybegynder (uden ranglistepoint)',
  } };
  const parsed = parser136ByName.get(title);
  if (!parsed || parsed.status !== 'tolket' || !Object.hasOwn(levelOrder, parsed.raw_level)) {
    return { ok: false, format, reason: parsed
      ? `136-parseren fortolker ikke rækken sikkert (status: ${parsed.status}).`
      : 'Rækkenavnet findes ikke i 136-parserens resultater.' };
  }
  const rawLevel = parsed.raw_level;
  const rank = parsed.level_order;
  const numericValue = parsed.numeric_value;
  return {
    ok: true,
    format,
    level: {
      raw_level: rawLevel,
      letter: rawLevel === 'Dx' || rawLevel === 'C-D' ? null : rawLevel,
      rank,
      numeric_value: numericValue,
      interpretable: true,
      display_name: rawLevel === 'Dx' ? 'nybegynder (uden ranglistepoint)' : rawLevel,
    },
  };
}
function isTargetCombo(combo) {
  return combo.season_id === 2026 || (combo.season_id === 2025 && combo.age_group_id === 2);
}
function missingSignature(row) {
  return String(row.format ?? '').includes('ingen brugbar kategorisignatur');
}
function compareLevel(a, b) {
  const rankDiff = (a.level?.rank ?? 99) - (b.level?.rank ?? 99);
  if (rankDiff) return rankDiff;
  return (b.level?.numeric_value ?? -1) - (a.level?.numeric_value ?? -1);
}
function isExcluded(row) {
  return /\b(?:UGE\s*38|DMU)\b/iu.test(row.division_name_raw ?? '');
}
function placementProjection(combo) {
  return JSON.stringify({
    best: combo.gsb_best_format ? {
      format: combo.gsb_best_format.format, tier: combo.gsb_best_format.tier,
      level: combo.gsb_best_format.level, place_in_season_age: combo.gsb_best_format.place_in_season_age,
    } : null,
    status: combo.gsb_placement_status,
    records: combo.gsb_team_pool_records.map((r) => [r.raw_team_name, r.physical_pool_key, r.division_name_raw,
      r.format, r.tier, r.local_format_place, r.placement_category, r.level, r.hierarchy_status, r.row_order_within_format]),
    ranked: combo.ranked_division_rows.map((r) => [r.division_name_raw, r.format, r.placement_status, r.level,
      r.format_place, r.row_order_within_format]),
  });
}

const beforeDb = dbSnapshot();
if (beforeDb.landscape.sha256 !== expectedHashes.landscape || beforeDb.normalized.sha256 !== expectedHashes.normalized) {
  throw new Error(`Database hash mismatch at start: ${JSON.stringify({ landscape: beforeDb.landscape.sha256, normalized: beforeDb.normalized.sha256 })}`);
}
const baseline = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const parser136 = JSON.parse(fs.readFileSync(parser136Path, 'utf8'));
const parser136ByName = new Map(parser136.parser_results_by_distinct_row_name.map((r) => [r.division_name_raw, r]));
if (baseline.placement_by_season_age.length !== 69) throw new Error(`143 combo count changed: ${baseline.placement_by_season_age.length}`);
const rawRows = readRawRows();
const rawByPool = new Map();
for (const raw of rawRows) {
  const key = poolKey(raw.season_id, raw.age_group_id, raw.league_group_id);
  if (!rawByPool.has(key)) rawByPool.set(key, { division_name_raw: raw.division_name_raw, teams: [] });
  if (raw.team_name_raw) rawByPool.get(key).teams.push({ id: raw.league_group_team_id, name: raw.team_name_raw });
}
const output = structuredClone(baseline);
const comboByKey = new Map(output.placement_by_season_age.map((c) => [comboKey(c.season_id, c.age_group_id), c]));
const changes = [];
const unparsed = [];
const changedKeys = new Set();

// Make provenance explicit throughout the new 144 view. This only annotates
// existing 143 placements; it does not alter their format/rank values.
for (const combo of output.placement_by_season_age) {
  for (const row of combo.ranked_division_rows) {
    if (row.placement_status === 'placeret') {
      row.placement_kilde = 'signatur';
      row.foreloebig = false;
    }
  }
  for (const team of combo.gsb_team_pool_records) {
    if (team.placement_category === 'placeret') {
      team.placement_kilde = 'signatur';
      team.foreloebig = false;
    }
  }
  if (combo.gsb_best_format) {
    combo.gsb_best_format.placering_kilde = 'signatur';
    combo.gsb_best_format.foreloebig = false;
  }
}

for (const combo of output.placement_by_season_age) {
  if (!isTargetCombo(combo)) continue;
  const candidateRows = combo.ranked_division_rows.filter((row) => {
    if (isExcluded(row)) return false;
    if (combo.season_id === 2026) return missingSignature(row);
    // 2025/26 U09 is the card's explicit exception: 143 already labels the
    // raw 3-player family, but has no placement tier for it.
    return row.format === '3 spillere' && row.placement_status === 'Ikke placeret';
  });
  for (const row of candidateRows) {
    const parsed = parseName(row.division_name_raw, parser136ByName);
    if (!parsed.ok) {
      const matchingGsb = combo.gsb_team_pool_records.filter((r) => r.division_name_raw === row.division_name_raw);
      if (matchingGsb.length || combo.season_id === 2026) unparsed.push({ season: combo.season, age_group_name: combo.age_group_name,
        division_name_raw: row.division_name_raw, gsb_teams: matchingGsb.map((r) => r.raw_team_name), reason: parsed.reason });
      continue;
    }
    if (combo.season_id === 2025 && parsed.format !== '3 spillere') continue;
    const before = { format: row.format, status: row.placement_status, level: row.level };
    row.format = parsed.format;
    row.level = parsed.level;
    row.placement_status = 'foreløbigt placeret';
    row.placement_kilde = 'raekkenavn_foreloebig';
    row.foreloebig = true;
    row.hierarki_status = parsed.format === '3 spillere' ? 'foreløbigt valg (Christoffer ikke afgjort)' : 'Christoffers fastlagte formatrækkefølge; foreløbigt niveau fra rækkenavn';
    row.format_hierarchy_position = formatOrder.get(parsed.format);
    changes.push({ season_id: combo.season_id, season: combo.season, age_group_id: combo.age_group_id,
      age_group_name: combo.age_group_name, division_name_raw: row.division_name_raw, format: parsed.format,
      level: parsed.level, before, placering_kilde: 'raekkenavn_foreloebig', foreloebig: true,
      gsb_teams: combo.gsb_team_pool_records.filter((r) => r.division_name_raw === row.division_name_raw).map((r) => r.raw_team_name) });
    changedKeys.add(comboKey(combo.season_id, combo.age_group_id));
  }

  if (!candidateRows.length) continue;
  // New provisional rows are ordered alongside the unchanged 143 placed rows.
  const placeable = combo.ranked_division_rows.filter((r) => formatOrder.has(r.format) && !isExcluded(r)
    && (r.placement_status === 'placeret' || r.placement_status === 'foreløbigt placeret'));
  const presentFormats = [...new Set(placeable.map((r) => r.format))].sort((a, b) => formatOrder.get(a) - formatOrder.get(b));
  const formatPlace = new Map(presentFormats.map((f, i) => [f, i + 1]));
  const grouped = new Map();
  for (const row of placeable) {
    if (!grouped.has(row.format)) grouped.set(row.format, []);
    grouped.get(row.format).push(row);
  }
  for (const [format, rows] of grouped) {
    rows.sort(compareLevel);
    rows.forEach((row, index) => {
      row.format_place = formatPlace.get(format);
      row.row_order_within_format = index + 1;
    });
  }

  for (const team of combo.gsb_team_pool_records) {
    const row = combo.ranked_division_rows.find((r) => r.division_name_raw === team.division_name_raw);
    if (!row || row.placement_status !== 'foreløbigt placeret') continue;
    team.format = row.format;
    team.level = structuredClone(row.level);
    team.placement_category = 'foreløbigt placeret';
    team.placement_kilde = 'raekkenavn_foreloebig';
    team.foreloebig = true;
    team.tier = null;
    team.local_format_place = row.format_place;
    team.row_order_within_format = row.row_order_within_format;
    team.hierarchy_status = row.hierarki_status;
    team.unplaced_reason = null;
  }
  combo.gsb_active_placed_records = combo.gsb_team_pool_records.filter((r) => !r.withdrawal_reason
    && ['placeret', 'foreløbigt placeret'].includes(r.placement_category) && !isExcluded(r)).length;
  combo.gsb_active_unplaced_records = combo.gsb_team_pool_records.filter((r) => !r.withdrawal_reason
    && r.placement_category === 'Ikke placeret' && !isExcluded(r)).length;
  const gsbPlaced = combo.gsb_team_pool_records.filter((r) => !r.withdrawal_reason && !isExcluded(r)
    && ['placeret', 'foreløbigt placeret'].includes(r.placement_category));
  gsbPlaced.sort((a, b) => formatOrder.get(a.format) - formatOrder.get(b.format) || compareLevel(a, b));
  const best = gsbPlaced[0];
  combo.gsb_best_format = best ? {
    format: best.format,
    tier: null,
    division_name_raw: best.division_name_raw,
    level: best.level,
    place_in_season_age: best.local_format_place,
    formats_present: presentFormats.length,
    global_126_position: null,
    hierarchy_status: best.hierarchy_status,
    placering_kilde: best.placement_kilde ?? 'signatur',
    foreloebig: Boolean(best.foreloebig),
  } : null;
  combo.gsb_placement_status = best
    ? 'aktivt GSB-hold; bedste placering omfatter foreløbig aflæsning af rækkenavn'
    : combo.gsb_placement_status;

  const groupRecords = combo.ranked_division_rows.filter((r) => formatOrder.has(r.format) && !isExcluded(r));
  for (const team of combo.gsb_team_pool_records) {
    const raw = rawByPool.get(team.physical_pool_key);
    if (!raw || raw.division_name_raw !== team.division_name_raw) throw new Error(`Raw data mismatch for ${team.physical_pool_key}`);
  }
  combo.provisional_rows = groupRecords.filter((r) => r.placement_kilde === 'raekkenavn_foreloebig').map((r) => ({
    division_name_raw: r.division_name_raw, format: r.format, level: r.level,
    format_place: r.format_place, row_order_within_format: r.row_order_within_format,
    placering_kilde: r.placement_kilde, foreloebig: r.foreloebig,
  }));
}

// Attach source-backed 144 placement annotations to the 143 row ledger without
// changing any 143 source fields.
const changeByDivisionCombo = new Map(changes.map((c) => [
  `${c.season_id}|${c.age_group_id}|${c.division_name_raw}`, c,
]));
for (const row of output.rows_143) {
  const change = changeByDivisionCombo.get(`${row.season_id}|${row.age_group_id}|${row.division_name_raw}`);
  if (change) row.placement_144 = { format: change.format, level: change.level,
    placering_kilde: 'raekkenavn_foreloebig', foreloebig: true };
}

const widthChecks = output.placement_by_season_age.map((combo) => {
  const beforeCombo = baseline.placement_by_season_age.find((x) => comboKey(x.season_id, x.age_group_id) === comboKey(combo.season_id, combo.age_group_id));
  const unchanged = JSON.stringify(combo.kbh_width) === JSON.stringify(beforeCombo.kbh_width);
  return { season_id: combo.season_id, season: combo.season, age_group_id: combo.age_group_id,
    age_group_name: combo.age_group_name, unchanged, width: combo.kbh_width.league_rows_without_uge38_and_kredsmatch };
});
const placementChecks = output.placement_by_season_age.map((combo) => {
  const original = baseline.placement_by_season_age.find((x) => comboKey(x.season_id, x.age_group_id) === comboKey(combo.season_id, combo.age_group_id));
  return { season: combo.season, age_group_name: combo.age_group_name, changed: placementProjection(combo) !== placementProjection(original) };
});
const untouched = placementChecks.filter((x) => !changedKeys.has(comboKey(output.placement_by_season_age.find(c => c.season === x.season && c.age_group_name === x.age_group_name).season_id,
  output.placement_by_season_age.find(c => c.season === x.season && c.age_group_name === x.age_group_name).age_group_id)));
if (widthChecks.some((x) => !x.unchanged)) throw new Error('Width changed in at least one season-age combination');
if (untouched.some((x) => x.changed)) throw new Error('Placement changed in a non-target season-age combination');

const sampleCandidates = [];
for (const combo of output.placement_by_season_age.filter((c) => c.season_id === 2026)) {
  for (const team of combo.gsb_team_pool_records) {
    if (team.placement_kilde !== 'raekkenavn_foreloebig') continue;
    const raw = rawByPool.get(team.physical_pool_key);
    sampleCandidates.push({ season: combo.season, age_group_name: combo.age_group_name,
      league_group_id: String(team.physical_pool_key).split('|')[2], team_name_raw: team.raw_team_name,
      division_name_raw: team.division_name_raw, expected_format: team.format, expected_level: team.level,
      raw_row_name_matches: raw?.division_name_raw === team.division_name_raw,
      raw_team_name_matches: raw?.teams.some((t) => t.name === team.raw_team_name) ?? false,
      dx: team.level.raw_level === 'Dx' });
  }
}
const picked = [];
for (const item of sampleCandidates.filter((x) => x.age_group_name === 'U09')) if (picked.length < 4) picked.push(item);
for (const item of sampleCandidates.filter((x) => x.dx)) if (picked.filter((x) => x.dx).length < 3 && !picked.includes(item)) picked.push(item);
for (const item of sampleCandidates) if (picked.length < 15 && !picked.includes(item)) picked.push(item);
if (picked.length < 15 || picked.filter((x) => x.age_group_name === 'U09').length < 3 || picked.filter((x) => x.dx).length < 3
  || picked.some((x) => !x.raw_row_name_matches || !x.raw_team_name_matches)) {
  throw new Error(`15-row raw-data sample failed: ${JSON.stringify({ count: picked.length, u09: picked.filter(x=>x.age_group_name==='U09').length, dx: picked.filter(x=>x.dx).length })}`);
}

const afterDb = dbSnapshot();
if (JSON.stringify(beforeDb) !== JSON.stringify(afterDb)) throw new Error('Database hash or row counts changed');
const expectedUnchangedCount = baseline.placement_by_season_age.length - changedKeys.size;
const result = {
  title: 'Opgave 144 — foreløbig placering ud fra rækkenavne',
  source: { base_result: 'statistik/results/143-ungdom-i-tal.json', level_parser: 'statistik/results/136-parser-effekt.json (existing parser result)', raw_data: 'statistik/data/liga-landskab.db', readOnly: true },
  rule: { formats: [...formatOrder.keys()], levels: ['E','M','A','B','C','C-D','D','Dx'], dx_display: 'nybegynder (uden ranglistepoint)', dx_is_distinct_from_d: true,
    three_player_status: 'foreløbigt valg (Christoffer ikke afgjort)', name_parse: 'format i parentes plus eksplicit niveau efter aldersgruppe; suffix BD ignoreres; max-holdfællesskab-point is not level' },
  baseline_143_combinations: baseline.placement_by_season_age.length,
  changed_combinations: [...changedKeys].sort().map((key) => { const [s,a]=key.split('|').map(Number); const c=comboByKey.get(key); return {season_id:s,season:c.season,age_group_id:a,age_group_name:c.age_group_name}; }),
  unchanged_combinations_count: expectedUnchangedCount,
  card_expected_unchanged_combinations: 64,
  card_count_reconciliation: `${baseline.placement_by_season_age.length} kombinationer i 143 minus ${changedKeys.size} mål-kombinationer = ${expectedUnchangedCount}; kortets tal 64 kan ikke afstemmes med 143's 69 kombinationer.`,
  provisional_rows: changes,
  unreadable_rows: unparsed,
  placement_unchanged_checks: placementChecks,
  width_unchanged_checks: widthChecks,
  '2026_2027_gsb_summary': output.placement_by_season_age.filter((c) => c.season_id === 2026).map((c) => ({
    age_group_name: c.age_group_name, best: c.gsb_best_format,
    supporting_gsb_teams: c.gsb_best_format ? c.gsb_team_pool_records.filter((r) => r.division_name_raw === c.gsb_best_format.division_name_raw
      && !r.withdrawal_reason && !isExcluded(r)).map((r) => r.raw_team_name) : [],
  })),
  raw_data_sample_15: picked,
  parser_136_stored_test_record: { passed: 28, total: 28, source: 'statistik/results/136-parser-effekt.json; test-suite definitions/results unchanged' },
  dx_source_review: { conclusion: 'Ingen modsigelse fundet: 136-rapporten siger, at Dx er dokumenteret som begynderniveau i de angivne reglementer, men ikke fortolket af parseren. Kort 144 fastlægger den særskilte foreløbige placering efter D.' },
  databases_before: beforeDb,
  databases_after: afterDb,
  controls: { read_only: true, hashes_match_expected: true, hashes_and_row_counts_unchanged: true,
    unchanged_width_combinations: widthChecks.filter((x) => x.unchanged).length,
    unchanged_non_target_placement_combinations: untouched.length,
    total_combinations: baseline.placement_by_season_age.length,
    raw_sample_passed: picked.length === 15 },
};

const md = [
  '# Opgave 144 — foreløbig placering mod 143', '',
  'Kilde: 143-resultatet samt `liga-landskab.db` åbnet med `readOnly: true`. Databaserne blev ikke skrevet.', '',
  '## Regel og Dx', '',
  'Format læses fra parentes og niveau fra teksten umiddelbart efter aldersgruppen. `BD` ignoreres. Pointlofter for holdfællesskab bruges ikke som niveau. Dx behandles særskilt som `nybegynder (uden ranglistepoint)`, efter D. 136-undersøgelsen modsiger ikke dette: den siger, at Dx er belagt som begynderniveau i kilderne, men ikke implementeret i parseren.', '',
  '2025/26 U09 står i 143 med formatet `3 spillere`, men uden placering; rå rækkenavne har format og niveau, og kortet udpeger udtrykkeligt alle disse rækker. De får derfor foreløbig placering og markeres med Christoffers uafgjorte hierarkivalg.', '',
  '## 2026/27 — bedste GSB-format pr. årgang', '',
  '| Årgang | Bedste format | Niveau | GSB-hold i rækken |', '|---|---|---|---|',
  ...result['2026_2027_gsb_summary'].map((x) => `| ${x.age_group_name} | ${x.best?.format ?? 'Intet sikkert placerbart format'} | ${x.best?.level?.display_name ?? '—'}${x.best?.level?.numeric_value ? `, ${x.best.level.numeric_value}` : ''} | ${x.supporting_gsb_teams.join(', ') || '—'} |`), '',
  'Holdene i hver linje er de GSB-hold, der deler den bedste placerbare GSB-række; rækkenavn og niveau er foreløbige.', '',
  '## Rækker uden sikker aflæsning', '',
  ...(unparsed.length ? unparsed.map((x) => `- ${x.season} ${x.age_group_name}: “${x.division_name_raw}” — ${x.reason}${x.gsb_teams.length ? ` GSB: ${x.gsb_teams.join(', ')}.` : ' Ingen GSB-hold knyttet i 143.'}`) : ['Ingen kandidater i det afgrænsede mål kunne ikke læses sikkert.']), '',
  '## Afvigelser mod 143', '',
  `Foreløbigt placerede division-rækker: ${changes.length} i ${changedKeys.size} sæson/aldersgruppe-kombinationer. Alle øvrige ${expectedUnchangedCount} af 143’s ${baseline.placement_by_season_age.length} kombinationer har uændret placering. Kortets forventning om 64 uændrede kombinationer afstemmer ikke: 143 har 69 i alt, og målgruppen udgør seks kombinationer, altså 63 uændrede.`, '',
  'Bredde er uændret for alle kombinationer: placeringens foreløbige labels ændres ikke på region-8-rækkenøgler eller summer.', '',
  '| Sæson | Årgang | Række | Format | Niveau | GSB-hold |', '|---|---|---|---|---|---|',
  ...changes.map((x) => `| ${x.season} | ${x.age_group_name} | ${x.division_name_raw} | ${x.format} | ${x.level.display_name}${x.level.numeric_value ? ` ${x.level.numeric_value}` : ''} | ${x.gsb_teams.join(', ') || '—'} |`), '',
  '## Stikprøve og værn', '',
  `15 GSB-hold/række-stikprøver fra 2026/27 kontrolleret mod rå tabeller: ${picked.length}/15 bestod; U09: ${picked.filter((x) => x.age_group_name === 'U09').length}, Dx: ${picked.filter((x) => x.dx).length}. 136’s registrerede testkørsel er 28/28; testfilerne og parseren er ikke ændret.`,
  `Bredde ens: ${widthChecks.filter((x) => x.unchanged).length}/${widthChecks.length}; placering uændret uden for målgruppen: ${untouched.length}/${expectedUnchangedCount}.`,
  `DB SHA-256 før/efter — liga-landskab: ${beforeDb.landscape.sha256} / ${afterDb.landscape.sha256}; gsb-statistik-normalized: ${beforeDb.normalized.sha256} / ${afterDb.normalized.sha256}. Rækketalstabeller identiske før/efter.`, '',
  '## Spørgsmål', '',
  `Kortet forventer 64 uændrede kombinationer. 143’s output indeholder 69 kombinationer; de seks mål-kombinationer giver 63 uændrede. Bekræft, om kortets forventede total var 70 eller om en kombination mangler i 143.`,
].join('\n');

fs.writeFileSync(outputJson, `${JSON.stringify(result, null, 2)}\n`);
fs.writeFileSync(outputMd, `${md}\n`);
console.log(JSON.stringify({ outputs: [outputJson, outputMd], changed_rows: changes.length,
  changed_combinations: changedKeys.size, unchanged_combinations: expectedUnchangedCount,
  unreadable_rows: unparsed.length, width_unchanged: widthChecks.filter((x) => x.unchanged).length,
  sample: `${picked.length}/15; U09=${picked.filter(x=>x.age_group_name==='U09').length}; Dx=${picked.filter(x=>x.dx).length}`,
  hashes_unchanged: JSON.stringify(beforeDb) === JSON.stringify(afterDb) }, null, 2));
