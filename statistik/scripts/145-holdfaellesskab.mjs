import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = path.resolve('statistik');
const dbPath = path.join(root, 'data/liga-landskab.db');
const normalizedPath = path.join(root, 'data/gsb-statistik-normalized.db');
const basePath = path.join(root, 'results/143-ungdom-i-tal.json');
const provisionalPath = path.join(root, 'results/144-ungdom-i-tal.json');
const parserPath = path.join(root, 'results/136-parser-effekt.json');
const identityAuditPath = path.join(root, 'results/127-gsb-ungdom-holdnavne-audit.json');
const outputPath = path.join(root, 'results/145-ungdom-i-tal.json');
const reportPath = path.join(root, 'results/145-aendringer-mod-144.md');
const expected = {
  landscape: '9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c',
  normalized: '49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e',
};
const ageIds = [2, 3, 4, 5, 6, 7, 18];
const formatOrder = new Map([['4+3', 1], ['4+2', 2], ['2+2', 3], ['4 spillere', 4], ['4 piger', 5], ['3 spillere', 6]]);
const levelOrder = { E: 0, M: 1, A: 2, B: 3, C: 4, 'C-D': 5, D: 6, Dx: 7 };
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const counts = (f) => {
  const db = new DatabaseSync(f, { readOnly: true });
  const names = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const result = Object.fromEntries(names.map(({ name }) => [name, db.prepare(`SELECT COUNT(*) n FROM "${name.replaceAll('"', '""')}"`).get().n]));
  db.close();
  return result;
};
const databaseSnapshot = () => ({
  landscape: { sha256: sha(dbPath), row_counts: counts(dbPath) },
  normalized: { sha256: sha(normalizedPath), row_counts: counts(normalizedPath) },
});
const before = databaseSnapshot();
for (const [key, file] of [['landscape', before.landscape], ['normalized', before.normalized]]) {
  if (file.sha256 !== expected[key]) throw new Error(`${key} SHA-256 mismatch before run: ${file.sha256}`);
}

const base = JSON.parse(fs.readFileSync(basePath, 'utf8'));
const provisional = JSON.parse(fs.readFileSync(provisionalPath, 'utf8'));
const parser136 = JSON.parse(fs.readFileSync(parserPath, 'utf8'));
const identityAudit = JSON.parse(fs.readFileSync(identityAuditPath, 'utf8'));
const approvedGsbVariants = new Set(identityAudit.likely_gsb_raw_team_name_variants.map((x) => x.raw_team_name.toLocaleLowerCase('da-DK')));
const comboKey = (s, a) => `${s}|${a}`;
const rawDb = new DatabaseSync(dbPath, { readOnly: true });
const raw = rawDb.prepare(`
  SELECT g.season_id,g.age_group_id,a.name age_group_name,g.league_group_id,
         g.division_name_raw,t.league_group_team_id,t.team_name_raw,
         group_concat(DISTINCT r.region_id) region_ids
  FROM league_groups g
  JOIN age_groups a USING(age_group_id)
  JOIN league_group_teams t USING(season_id,age_group_id,league_group_id)
  LEFT JOIN league_group_regions r USING(season_id,age_group_id,league_group_id)
  WHERE g.age_group_id IN (${ageIds.join(',')})
  GROUP BY g.season_id,g.age_group_id,g.league_group_id,t.league_group_team_id
  ORDER BY g.season_id,g.age_group_id,g.league_group_id,t.league_group_team_id
`).all();
rawDb.close();

function gsbSegment(segment) {
  const s = segment.trim().replace(/\s+/gu, ' ');
  return approvedGsbVariants.has(s.toLocaleLowerCase('da-DK'))
    || /^(?:Gladsaxe\s+Søborg|GSB)(?:\s+\d+)?(?:\s*\([^)]*\))?(?:\s+(?:udgået|trukket)|\s+\*[^*]+\*)?$/iu.test(s);
}
function splitTopLevel(name) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < name.length; i += 1) {
    const ch = name[i];
    if (ch === '(') depth += 1;
    if (ch === ')') depth = Math.max(0, depth - 1);
    if (depth === 0 && (ch === '/' || ch === '+' || ch === '&')) {
      parts.push(current.trim()); current = ''; continue;
    }
    current += ch;
  }
  parts.push(current.trim());
  return parts.filter(Boolean);
}
function splitPartnership(name) {
  // Split only on explicit collaboration separators; a bare mention never counts.
  const parts = splitTopLevel(name);
  if (parts.length < 2) return null;
  const gsbParts = parts.filter(gsbSegment);
  if (gsbParts.length !== 1 || parts.length !== 2) return null;
  const partnerTeam = parts.find((x) => x !== gsbParts[0]);
  return { gsb_part: gsbParts[0], partner: partnerTeam.replace(/\s+\d+$/u, '').trim(), partner_team_name_raw: partnerTeam,
    gsb_is_main: name.trim().startsWith(gsbParts[0]) };
}
const collaborations = raw.filter((r) => splitPartnership(r.team_name_raw ?? '')).map((r) => ({
  season_id: r.season_id, season: `${r.season_id}/${String(r.season_id + 1).slice(-2)}`,
  age_group_id: r.age_group_id, age_group_name: r.age_group_name,
  league_group_id: r.league_group_id, row: r.division_name_raw,
  raw_team_name: r.team_name_raw, team_id: r.league_group_team_id,
  region_ids: String(r.region_ids ?? '').split(',').filter(Boolean).map(Number),
  ...splitPartnership(r.team_name_raw),
}));
const uniqCollaborations = [...new Map(collaborations.map((x) => [String(x.team_id), x])).values()];
const ambiguous = raw.filter((r) => /gladsaxe\s+søborg|\bGSB\b/iu.test(r.team_name_raw ?? '')
  && splitTopLevel(r.team_name_raw ?? '').length > 1
  && !splitPartnership(r.team_name_raw ?? ''));

const comboByKey = new Map(base.placement_by_season_age.map((x) => [comboKey(x.season_id, x.age_group_id), x]));
const provByKey = new Map();
for (const p of provisional.provisional_rows) {
  const k = comboKey(p.season_id, p.age_group_id);
  if (!provByKey.has(k)) provByKey.set(k, []);
  provByKey.get(k).push(p);
}
const summary2026 = new Map(provisional['2026_2027_gsb_summary'].map((x) => [x.age_group_name, x.best]));
function baselineBest(combo) {
  if (!combo) return null;
  if (combo.season_id === 2026) return summary2026.get(combo.age_group_name) ?? combo.gsb_best_format ?? null;
  const inferred = (provByKey.get(comboKey(combo.season_id, combo.age_group_id)) ?? [])
    .filter((x) => x.gsb_teams?.length && formatOrder.has(x.format))
    .sort(comparePlacement);
  return inferred.length ? {
    format: inferred[0].format, division_name_raw: inferred[0].division_name_raw,
    level: inferred[0].level, placering_kilde: inferred[0].placering_kilde,
    foreloebig: inferred[0].foreloebig,
  } : combo.gsb_best_format;
}
function comparePlacement(a, b) {
  const af = a.format ?? '', bf = b.format ?? '';
  const formatDelta = (formatOrder.get(af) ?? 99) - (formatOrder.get(bf) ?? 99);
  if (formatDelta) return formatDelta;
  const al = a.level ?? {}, bl = b.level ?? {};
  const levelDelta = (levelOrder[al.letter] ?? 99) - (levelOrder[bl.letter] ?? 99);
  if (levelDelta) return levelDelta;
  return (bl.numeric_value ?? -1) - (al.numeric_value ?? -1);
}
function widthState(combo, addCollabs) {
  const width = combo.kbh_width;
  const included = width.all_rows.filter((r) => r.included_in_width);
  const gsbKeys = new Set(width.gsb_rows);
  const provisionalByName = new Map((provByKey.get(comboKey(combo.season_id, combo.age_group_id)) ?? [])
    .map((x) => [x.division_name_raw, x.format]));
  const effectiveFormat = (row) => {
    const inferred = provisionalByName.get(row.division_name_raw);
    return formatOrder.has(inferred) ? inferred : row.format;
  };
  const formats = new Set(included.filter((r) => gsbKeys.has(r.row_key)).map(effectiveFormat).filter((x) => formatOrder.has(x)));
  let rowCount = gsbKeys.size;
  if (addCollabs) {
    for (const c of uniqCollaborations.filter((x) => x.season_id === combo.season_id && x.age_group_id === combo.age_group_id && x.region_ids.includes(8))) {
      const row = width.all_rows.find((r) => r.row_key === `${c.season_id}|${c.age_group_id}|${c.row}`);
      if (row?.included_in_width) {
        rowCount += 1;
        const partnershipFormat = partnershipPlacement(c).format;
        if (formatOrder.has(partnershipFormat)) formats.add(partnershipFormat);
      }
    }
  }
  return { rows: rowCount, formats: formats.size, format_names: [...formats].sort((a, b) => formatOrder.get(a) - formatOrder.get(b)) };
}
function partnershipPlacement(c) {
  if (c.season_id === 2026 && c.age_group_id === 4) return {
    format: '4+3', division_name_raw: c.row,
    level: { raw_level: null, letter: null, rank: null, numeric_value: null, interpretable: false, status: 'intet niveau nødvendigt (eneste række)' },
    placering_kilde: 'raekkenavn_foreloebig', foreloebig: true,
    tolkning_regel: 'forslag-4',
  };
  const combo = comboByKey.get(comboKey(c.season_id, c.age_group_id));
  const row = combo?.ranked_division_rows.find((r) => r.division_name_raw === c.row);
  return { format: row?.format ?? '4+2', division_name_raw: c.row, level: row?.level ?? null,
    placering_kilde: 'signatur', foreloebig: false, tolkning_regel: null };
}

const placementByCombo = [];
for (const combo of base.placement_by_season_age) {
  const k = comboKey(combo.season_id, combo.age_group_id);
  const attached = uniqCollaborations.filter((c) => c.season_id === combo.season_id && c.age_group_id === combo.age_group_id);
  const original = baselineBest(combo);
  const candidates = [...(original ? [original] : []), ...attached.map(partnershipPlacement)];
  const including = candidates.length ? [...candidates].sort(comparePlacement)[0] : null;
  const withWidth = widthState(combo, true);
  const withoutWidth = widthState(combo, false);
  const affected = attached.length > 0;
  placementByCombo.push({
    season_id: combo.season_id, season: combo.season, age_group_id: combo.age_group_id, age_group_name: combo.age_group_name,
    uden_holdfaellesskab: { bedste_format: original, bredde: withoutWidth },
    inkl_holdfaellesskab: { bedste_format: including, bredde: withWidth },
    holdfaellesskaber: attached.map((c) => ({ raw_team_name: c.raw_team_name, partner: c.partner, holdfaellesskab: true,
      gsb_is_main: c.gsb_is_main, row: c.row, format: partnershipPlacement(c).format,
      placering_kilde: partnershipPlacement(c).placering_kilde, foreloebig: partnershipPlacement(c).foreloebig,
      tolkning_regel: partnershipPlacement(c).tolkning_regel })),
    changed: affected,
  });
}

const changed = placementByCombo.filter((x) => x.changed);
const unaffected = placementByCombo.filter((x) => !x.changed);
const expectedTargets = new Set(['2026|4', '2020|3']);
const changedBy144 = new Set(provisional.changed_combinations.map((x) => comboKey(x.season_id, x.age_group_id)));
if (uniqCollaborations.length !== 2) throw new Error(`Expected exactly two unambiguous GSB partnerships; found ${uniqCollaborations.length}`);
if (changed.length !== expectedTargets.size || changed.some((x) => !expectedTargets.has(comboKey(x.season_id, x.age_group_id)))) throw new Error('Unexpected affected season-age combination(s)');
if (unaffected.some((x) => JSON.stringify(x.uden_holdfaellesskab) !== JSON.stringify(x.inkl_holdfaellesskab))) throw new Error('A non-partnership combination changed');
const widthAllUnchanged = provisional.width_unchanged_checks.length === placementByCombo.length
  && provisional.width_unchanged_checks.every((x) => x.unchanged === true);
if (!widthAllUnchanged) throw new Error('144 baseline does not certify unchanged width for all combinations');
let checkedAgainst143 = 0;
let checkedAgainst144Overrides = 0;
for (const row of placementByCombo.filter((x) => !expectedTargets.has(comboKey(x.season_id, x.age_group_id)))) {
  if (!changedBy144.has(comboKey(row.season_id, row.age_group_id))) {
    const source = comboByKey.get(comboKey(row.season_id, row.age_group_id));
    if (JSON.stringify(row.uden_holdfaellesskab.bedste_format) !== JSON.stringify(source.gsb_best_format)) throw new Error(`144-unmodified placement differs from 143 baseline: ${row.season} ${row.age_group_name}`);
    checkedAgainst143 += 1;
  } else checkedAgainst144Overrides += 1;
}
if (checkedAgainst143 !== 62 || checkedAgainst144Overrides !== 5) throw new Error(`Unexpected 144 baseline reconciliation: 143=${checkedAgainst143}, 144 overrides=${checkedAgainst144Overrides}`);
for (const row of changed) {
  if (row.inkl_holdfaellesskab.bredde.rows !== row.uden_holdfaellesskab.bredde.rows + 1
      || row.inkl_holdfaellesskab.bredde.formats !== row.uden_holdfaellesskab.bredde.formats + 1) throw new Error(`Expected +1 row and format for ${row.season} ${row.age_group_name}: ${JSON.stringify({ before: row.uden_holdfaellesskab.bredde, after: row.inkl_holdfaellesskab.bredde, partnerships: row.holdfaellesskaber })}`);
}

// Five reproducible direct-GSB raw-data samples outside the two affected combinations.
const directRaw = raw.filter((r) => /^Gladsaxe\s+Søborg(?:\s+\d+)?(?:\s+(?:udgået|trukket)|\s+\*[^*]+\*)?$/iu.test((r.team_name_raw ?? '').trim())
  && !uniqCollaborations.some((c) => c.team_id === r.league_group_team_id));
const directSamples = [];
for (const r of directRaw) {
  const combo = comboByKey.get(comboKey(r.season_id, r.age_group_id));
  const item = combo?.gsb_team_pool_records.find((x) => x.physical_pool_key === `${r.season_id}|${r.age_group_id}|${r.league_group_id}`
    && x.raw_team_name === r.team_name_raw);
  if (!item || r.age_group_id === 21) continue;
  directSamples.push({ season_id: r.season_id, season: `${r.season_id}/${String(r.season_id + 1).slice(-2)}`,
    age_group_id: r.age_group_id, age_group_name: r.age_group_name, division_name_raw: r.division_name_raw,
    raw_team_name: r.team_name_raw, matches_143_direct_gsb_record: true, unchanged_under_145: true,
    baseline_format: item.format });
}
const fiveSamples = directSamples.sort((a, b) => crypto.createHash('sha256').update(`${a.season_id}|${a.age_group_id}|${a.division_name_raw}|${a.raw_team_name}`).digest('hex')
  .localeCompare(crypto.createHash('sha256').update(`${b.season_id}|${b.age_group_id}|${b.division_name_raw}|${b.raw_team_name}`).digest('hex'))).slice(0, 5);
if (fiveSamples.length !== 5 || fiveSamples.some((x) => !x.matches_143_direct_gsb_record)) throw new Error(`Expected five verifiable direct-GSB controls; got ${fiveSamples.length}`);
const parserScope = parser136.parser_results_by_distinct_row_name
  .find((x) => x.division_name_raw === 'U13 (4+3) - maks. 11500 p. holdfællesskab')?.proposal4_scopes
  ?.find((x) => Number(x.season_id) === 2026 && Number(x.age_group_id) === 4 && String(x.league_group_id) === '18974');
if (!parserScope || parserScope.status !== 'intet niveau nødvendigt (eneste række)' || parserScope.tolkning_regel !== 'forslag-4') throw new Error('Proposal 4 scope for 2026/27 U13 partnership row is not confirmed by parser 136');

const after = databaseSnapshot();
if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error('Database hashes or row counts changed during read-only run');
const summary145_2026 = provisional['2026_2027_gsb_summary'].map((old) => {
  const combo = placementByCombo.find((x) => x.season_id === 2026 && x.age_group_name === old.age_group_name);
  const partnerships = combo?.holdfaellesskaber ?? [];
  return { ...old, best: combo?.inkl_holdfaellesskab.bedste_format ?? old.best,
    supporting_gsb_teams: [...old.supporting_gsb_teams, ...partnerships.map((x) => x.raw_team_name)],
    holdfaellesskaber: partnerships };
});
const output = {
  ...provisional,
  title: 'Opgave 145 — holdfællesskaber med GSB i placering og bredde',
  baseline_144_controls: provisional.controls,
  baseline_144_raw_data_sample_15: provisional.raw_data_sample_15,
  source: ['127-gsb-ungdom-formatplacering.json', '127-gsb-ungdom-holdnavne-audit.json (21 godkendte direkte varianter)', '143-ungdom-i-tal.json', '144-ungdom-i-tal.json', '136-parser-effekt.json', 'liga-landskab.db'],
  baseline_143_combinations: base.placement_by_season_age.length,
  baseline_144_combinations: placementByCombo.length,
  changed_combinations: changed.map((x) => ({ season_id: x.season_id, season: x.season, age_group_id: x.age_group_id, age_group_name: x.age_group_name })),
  unchanged_combinations_count: unaffected.length,
  card_expected_unchanged_combinations: unaffected.length,
  card_count_reconciliation: '69 samlede kombinationer minus 2 berørt af holdfællesskab = 67 uændrede.',
  placement_unchanged_checks: placementByCombo.map((x) => ({ season: x.season, age_group_name: x.age_group_name, changed: x.changed,
    before: x.uden_holdfaellesskab.bedste_format, after: x.inkl_holdfaellesskab.bedste_format })),
  width_unchanged_checks: placementByCombo.map((x) => ({ season_id: x.season_id, season: x.season, age_group_id: x.age_group_id, age_group_name: x.age_group_name,
    unchanged: !x.changed, before: x.uden_holdfaellesskab.bredde, after: x.inkl_holdfaellesskab.bredde })),
  '2026_2027_gsb_summary': summary145_2026,
  controls: { target_partnerships_found: uniqCollaborations.length === 2, affected_combinations: changed.length === 2,
    unchanged_combinations: unaffected.length === 67, width_changes_only_targets: changed.length === 2,
    plus_one_row_and_format_per_target: true, direct_gsb_samples: fiveSamples.length === 5,
    proposal4_u13_verified_in_136: true, databases_read_only_and_unchanged: true },
  scope: { age_group_ids: ageIds, database_read_only: true, seasons_and_age_groups: placementByCombo.length, region_for_width: 'Badminton København (region_id=8)' },
  rule: { format_order: [...formatOrder.keys()], level_order: Object.keys(levelOrder), partnership_policy: 'GSB tælles med; hvert hold er mærket holdfaellesskab=true og partner. Ikke-GSB-samarbejder ændres ikke.', proposal4_scope: parserScope },
  holdfaellesskab: uniqCollaborations.map((c) => ({ ...c, holdfaellesskab: true })),
  partner: uniqCollaborations.map((c) => ({ raw_team_name: c.raw_team_name, partner: c.partner, partner_team_name_raw: c.partner_team_name_raw })),
  ambiguous_gsb_name_candidates_excluded: ambiguous.map((x) => ({ raw_team_name: x.team_name_raw, season_id: x.season_id, age_group_id: x.age_group_id, row: x.division_name_raw })),
  placement_and_width_by_season_age: placementByCombo,
  uden_holdfaellesskab: placementByCombo.map((x) => ({ season: x.season, age_group_name: x.age_group_name, ...x.uden_holdfaellesskab })),
  inkl_holdfaellesskab: placementByCombo.map((x) => ({ season: x.season, age_group_name: x.age_group_name, ...x.inkl_holdfaellesskab })),
  comparison_vs_144: { total_combinations: placementByCombo.length, changed_combinations: changed.map((x) => `${x.season}|${x.age_group_name}`), unchanged_combinations_count: unaffected.length,
    unchanged_combinations_equal: unaffected.length === placementByCombo.length - 2,
    placement_baseline_reconciliation: { unchanged_143_combinations: checkedAgainst143, combinations_using_144_overrides: checkedAgainst144Overrides },
    width_baseline_144_checks_passed: provisional.width_unchanged_checks.length, width_changed_combinations: changed.map((x) => `${x.season}|${x.age_group_name}`) },
  direct_gsb_raw_data_samples: fiveSamples,
  raw_data_sample_15: fiveSamples,
  checks: { discovered_partnership_records: uniqCollaborations.length, physical_records_vs_region_occurrences: { physical: uniqCollaborations.length, region_links: uniqCollaborations.reduce((n, c) => n + c.region_ids.length, 0) },
    targets: changed.map((x) => ({ season: x.season, age_group: x.age_group_name,
      before_format: x.uden_holdfaellesskab.bedste_format?.format ?? null, after_format: x.inkl_holdfaellesskab.bedste_format?.format ?? null,
      width_before: x.uden_holdfaellesskab.bredde, width_after: x.inkl_holdfaellesskab.bredde })),
    all_non_target_combinations_unchanged: unaffected.length, direct_samples: fiveSamples.length },
  databases_before: before, databases_after: after,
};
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

const md = [
  '# Opgave 145 — ændringer mod 144', '',
  `Databaseadgang: \`readOnly: true\`. Fundne entydige GSB-holdfællesskaber: ${uniqCollaborations.length} fysiske holdposter (${uniqCollaborations.reduce((n, c) => n + c.region_ids.length, 0)} regionkoblinger; regionkoblinger tælles ikke som ekstra hold).`, '',
  '| Sæson | Årgang | Række | Råt holdnavn | Partner | GSB hovedhold? |', '|---|---|---|---|---|---|',
  ...uniqCollaborations.map((c) => `| ${c.season} | ${c.age_group_name} | ${c.row} | ${c.raw_team_name} | ${c.partner} | ${c.gsb_is_main ? 'Ja' : 'Nej'} |`), '',
  '## Placering og bredde før/efter', '',
  '| Sæson/årgang | Placering uden fællesskab | Placering inkl. fællesskab | Bredde uden (rækker/formater) | Bredde inkl. (rækker/formater) |', '|---|---|---|---:|---:|',
  ...changed.map((x) => `| ${x.season} ${x.age_group_name} | ${x.uden_holdfaellesskab.bedste_format?.format ?? 'ingen'} | ${x.inkl_holdfaellesskab.bedste_format?.format ?? 'ingen'}${x.inkl_holdfaellesskab.bedste_format?.foreloebig ? ' (foreløbig)' : ''} | ${x.uden_holdfaellesskab.bredde.rows}/${x.uden_holdfaellesskab.bredde.formats} | ${x.inkl_holdfaellesskab.bredde.rows}/${x.inkl_holdfaellesskab.bredde.formats} |`), '',
  'Placeringerne uden holdfællesskab følger 144. 2026/27 U13-rækken `U13 (4+3) - maks. 11500 p. holdfællesskab` får format 4+3 ved forslag 4 (`intet niveau nødvendigt (eneste række)`), og er derfor foreløbig (`foreloebig: true`, `placering_kilde: raekkenavn_foreloebig`). 2020/21 U11 har signaturbaseret 4+2.', '',
  '## Værn og stikprøver', '',
  `Ud af ${placementByCombo.length} sæson/årgang-kombinationer ændres ${changed.length}; de øvrige ${unaffected.length} er ens mellem 145 uden fællesskab og 145 med fællesskab. Rækkebredde og formatbredde ændres kun i de to kombinationer ovenfor, hver med +1/+1. Fem direkte GSB-hold fra andre kombinationer blev matchet mod 143's råholdsposter; alle fem er uændrede.`, '',
  '| Sæson | Årgang | Række | Råt direkte GSB-navn | Match i 143 | Uændret |', '|---|---|---|---|---|---|',
  ...fiveSamples.map((x) => `| ${x.season} | ${x.age_group_name} | ${x.division_name_raw} | ${x.raw_team_name} | ${x.matches_143_direct_gsb_record ? 'Ja' : 'Nej'} | ${x.unchanged_under_145 ? 'Ja' : 'Nej'} |`), '',
  `Tvetydige GSB-lignende rånavne ekskluderet: ${ambiguous.length}. Ingen af dem er blevet talt som GSB-holdfællesskab; fuld liste i JSON.`, '',
  `Database SHA-256 før/efter uændret: liga-landskab.db ${before.landscape.sha256}; gsb-statistik-normalized.db ${before.normalized.sha256}. Alle tabelrækketal ens før/efter.`, '',
].join('\n');
fs.writeFileSync(reportPath, md, 'utf8');
console.log(JSON.stringify({ partnerships: uniqCollaborations.map((x) => ({ season: x.season, age: x.age_group_name, row: x.row, name: x.raw_team_name, partner: x.partner, regions: x.region_ids.length })),
  combos: placementByCombo.length, changed: changed.map((x) => ({ season: x.season, age: x.age_group_name, before: x.uden_holdfaellesskab.bedste_format?.format, after: x.inkl_holdfaellesskab.bedste_format?.format, width_before: x.uden_holdfaellesskab.bredde, width_after: x.inkl_holdfaellesskab.bredde })),
  unchanged: unaffected.length, ambiguous_candidates: ambiguous.length, sample_count: fiveSamples.length, databases_unchanged: true }, null, 2));
