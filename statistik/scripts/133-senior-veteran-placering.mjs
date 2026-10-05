import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = path.resolve('statistik');
const dbPath = path.join(root, 'data', 'liga-landskab.db');
const normalizedPath = path.join(root, 'data', 'gsb-statistik-normalized.db');
const jsonPath = path.join(root, 'results', '133-senior-veteran-placering.json');
const mdPath = path.join(root, 'results', '133-senior-veteran-placering.md');
const expected = {
  normalized: '49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e',
  landscape: '9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c',
};
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function rowCounts(file) {
  const db = new DatabaseSync(file, { readOnly: true });
  const names = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const counts = Object.fromEntries(names.map(({ name }) => [name, db.prepare(`SELECT COUNT(*) AS n FROM "${name.replaceAll('"', '""')}"`).get().n]));
  db.close();
  return counts;
}
const databaseState = () => ({
  normalized: { sha256: sha256(normalizedPath), row_counts: rowCounts(normalizedPath) },
  landscape: { sha256: sha256(dbPath), row_counts: rowCounts(dbPath) },
});
const before = databaseState();
if (before.normalized.sha256 !== expected.normalized || before.landscape.sha256 !== expected.landscape) {
  throw new Error(`Database baseline hash mismatch: ${JSON.stringify({ normalized: before.normalized.sha256, landscape: before.landscape.sha256 })}`);
}

const db = new DatabaseSync(dbPath, { readOnly: true });
const ageGroups = db.prepare("SELECT age_group_id,name FROM age_groups WHERE name='SEN' OR name LIKE 'SEN+%' ORDER BY age_group_id").all();
const ageById = new Map(ageGroups.map((row) => [row.age_group_id, row.name]));
const adultIds = ageGroups.map((row) => row.age_group_id);
const groups = db.prepare(`
  SELECT g.season_id,g.age_group_id,g.league_group_id,g.division_name_raw,g.group_name_raw,g.page_title_raw,
         a.name AS age_group_name,
         (SELECT COUNT(*) FROM league_group_teams t WHERE t.season_id=g.season_id AND t.age_group_id=g.age_group_id AND t.league_group_id=g.league_group_id) AS teams_in_pool,
         (SELECT MIN(t.standing_position) FROM league_group_teams t WHERE t.season_id=g.season_id AND t.age_group_id=g.age_group_id AND t.league_group_id=g.league_group_id AND t.team_name_raw LIKE 'Gladsaxe Søborg%') AS gsb_position,
         (SELECT group_concat(t.team_name_raw, ' | ') FROM league_group_teams t WHERE t.season_id=g.season_id AND t.age_group_id=g.age_group_id AND t.league_group_id=g.league_group_id AND t.team_name_raw LIKE 'Gladsaxe Søborg%') AS gsb_names,
         (SELECT group_concat(t.standing_position, ',') FROM league_group_teams t WHERE t.season_id=g.season_id AND t.age_group_id=g.age_group_id AND t.league_group_id=g.league_group_id AND t.team_name_raw LIKE 'Gladsaxe Søborg%') AS gsb_positions,
         (SELECT group_concat(r.region_id, ',') FROM league_group_regions r WHERE r.season_id=g.season_id AND r.age_group_id=g.age_group_id AND r.league_group_id=g.league_group_id) AS region_ids,
         (SELECT group_concat(reg.name, ' | ') FROM league_group_regions r LEFT JOIN regions reg ON reg.region_id=r.region_id WHERE r.season_id=g.season_id AND r.age_group_id=g.age_group_id AND r.league_group_id=g.league_group_id) AS region_names
  FROM league_groups g JOIN age_groups a USING(age_group_id)
  WHERE g.age_group_id IN (${adultIds.join(',')})
  ORDER BY g.season_id,g.age_group_id,g.division_name_raw,g.league_group_id
`).all();
const allTeams = db.prepare(`
  SELECT t.season_id,t.age_group_id,t.league_group_id,t.team_name_raw,t.standing_position,
         g.division_name_raw,g.group_name_raw
  FROM league_group_teams t JOIN league_groups g USING(season_id,age_group_id,league_group_id)
  WHERE t.age_group_id IN (${adultIds.join(',')}) AND t.team_name_raw LIKE 'Gladsaxe Søborg%'
  ORDER BY t.season_id,t.age_group_id,g.division_name_raw,t.league_group_id,t.standing_position
`).all();
const widthSource = db.prepare(`
  SELECT g.season_id,g.age_group_id,g.league_group_id,g.division_name_raw,
         EXISTS(SELECT 1 FROM league_group_teams t WHERE t.season_id=g.season_id AND t.age_group_id=g.age_group_id AND t.league_group_id=g.league_group_id AND t.team_name_raw LIKE 'Gladsaxe Søborg%') AS has_gsb
  FROM league_groups g JOIN league_group_regions r USING(season_id,age_group_id,league_group_id)
  WHERE r.region_id=8 AND g.age_group_id IN (${adultIds.join(',')})
`).all();
const regions = db.prepare('SELECT region_id,name,short_name FROM regions WHERE region_id=8').all();
db.close();
if (regions.length !== 1 || regions[0].name !== 'Badminton København') throw new Error(`Region 8 is not uniquely Badminton København: ${JSON.stringify(regions)}`);

function parseLevel(name, ageName) {
  const value = String(name ?? '').normalize('NFC').trim();
  const division = value.match(/\b(\d+)\s*\.\s*division\b/iu);
  if (division) return { family: /kvalifikation|oprykning|nedrykning/iu.test(value) ? 'divisionskvalifikation/slutspil' : 'division', number: Number(division[1]), order_within_family: Number(division[1]), interpretable: !/kvalifikation|oprykning|nedrykning/iu.test(value), basis: 'eksplicit divisionsnummer i rækkenavn' };
  if (/badmintonligaen/iu.test(value)) return { family: 'Badmintonligaen', number: null, order_within_family: null, interpretable: true, basis: 'eksplicit rækkenavn; ikke sammenordnet med serier/divisioner' };
  if (/danmarksserien/iu.test(value)) return { family: 'Danmarksserien', number: null, order_within_family: null, interpretable: true, basis: 'eksplicit rækkenavn; ikke sammenordnet med serier/divisioner' };
  const serie = value.match(/\b(\d+)\s*\.\s*serie\b/iu) || value.match(/\bserie\s*(\d+)\b/iu);
  if (serie) return { family: /veteran|\b\d+\s*\+/iu.test(value) || ageName !== 'SEN' ? 'alders-/veteranserie' : 'seniorserie', number: Number(serie[1]), order_within_family: Number(serie[1]), interpretable: true, basis: 'eksplicit serienummer; kun sammenligneligt inden for samme serie-familie' };
  if (/elite/iu.test(value)) return { family: 'elite-betegnelse', number: null, order_within_family: null, interpretable: true, basis: 'etiket fundet; relation til serienumre ikke fastlagt' };
  return { family: 'ikke fastlagt', number: null, order_within_family: null, interpretable: false, basis: 'rækkenavnet giver ikke en entydig rang i anvendt parser' };
}
const rowKey = (r) => `${r.season_id}|${r.age_group_id}|${r.division_name_raw ?? ''}`;
const poolsByRow = new Map();
for (const group of groups) {
  const key = rowKey(group);
  if (!poolsByRow.has(key)) poolsByRow.set(key, []);
  poolsByRow.get(key).push(group);
}
const gsbGroups = groups.filter((g) => g.gsb_names);
const gsbRows = gsbGroups.map((g) => {
  const rowPools = poolsByRow.get(rowKey(g));
  const pooled = rowPools.length > 1;
  const level = parseLevel(g.division_name_raw, g.age_group_name);
  const positions = String(g.gsb_positions ?? '').split(',').filter(Boolean).map(Number);
  return {
    season_id: g.season_id, season: `${g.season_id}/${String(g.season_id + 1).slice(-2)}`,
    target_group: g.age_group_name === 'SEN' ? 'senior' : 'veteran', age_group_id: g.age_group_id, age_group: g.age_group_name,
    division_name_raw: g.division_name_raw, group_name_raw: g.group_name_raw, league_group_id: g.league_group_id,
    gsb_team_names: String(g.gsb_names).split(' | '), gsb_positions: positions,
    placement_within_pool: positions.length === 1 ? positions[0] : null, teams_in_pool: g.teams_in_pool,
    pools_in_same_row: rowPools.length, teams_in_same_row: rowPools.reduce((sum, pool) => sum + pool.teams_in_pool, 0),
    row_place: pooled ? null : positions[0] ?? null,
    row_place_status: pooled ? 'ikke fastlagt: flere puljer i rækken; placeringen er kun pr. fysisk pulje' : positions[0] == null ? 'ikke fastlagt: standing_position mangler' : 'puljeplacering; rækken har én pulje',
    region_ids: String(g.region_ids ?? '').split(',').filter(Boolean).map(Number), region_names: String(g.region_names ?? '').split(' | '), level,
  };
});

const combos = new Map();
for (const team of allTeams) {
  const key = `${team.season_id}|${team.age_group_id}`;
  if (!combos.has(key)) combos.set(key, { season_id: team.season_id, season: `${team.season_id}/${String(team.season_id + 1).slice(-2)}`, target_group: team.age_group_id === 1 ? 'senior' : 'veteran', age_group_id: team.age_group_id, age_group: ageById.get(team.age_group_id), gsb_posts: 0, teams: [] });
  const combo = combos.get(key);
  combo.gsb_posts += 1;
  combo.teams.push({ team_name_raw: team.team_name_raw, division_name_raw: team.division_name_raw, group_name_raw: team.group_name_raw, league_group_id: team.league_group_id, standing_position: team.standing_position });
}
const widthCombos = new Map();
for (const row of widthSource) {
  const key = `${row.season_id}|${row.age_group_id}`;
  if (!widthCombos.has(key)) widthCombos.set(key, { season_id: row.season_id, season: `${row.season_id}/${String(row.season_id + 1).slice(-2)}`, age_group_id: row.age_group_id, age_group: ageById.get(row.age_group_id), row_names: new Set(), gsb_row_names: new Set(), pool_keys: new Set(), gsb_pool_keys: new Set() });
  const c = widthCombos.get(key);
  const division = String(row.division_name_raw ?? '');
  const pool = `${row.season_id}|${row.age_group_id}|${row.league_group_id}`;
  c.row_names.add(division); c.pool_keys.add(pool);
  if (row.has_gsb) { c.gsb_row_names.add(division); c.gsb_pool_keys.add(pool); }
}
const widths = [...widthCombos.values()].map((c) => ({ season_id: c.season_id, season: c.season, target_group: c.age_group_id === 1 ? 'senior' : 'veteran', age_group_id: c.age_group_id, age_group: c.age_group, region_id: 8, region_name: 'Badminton København', rows: { gsb: c.gsb_row_names.size, total: c.row_names.size, percent: c.row_names.size ? Number((100 * c.gsb_row_names.size / c.row_names.size).toFixed(1)) : null }, physical_pools: { gsb: c.gsb_pool_keys.size, total: c.pool_keys.size, percent: c.pool_keys.size ? Number((100 * c.gsb_pool_keys.size / c.pool_keys.size).toFixed(1)) : null } })).sort((a, b) => a.season_id - b.season_id || a.age_group_id - b.age_group_id);
const overallWidths = [...new Set(widths.map((w) => w.age_group_id))].map((ageId) => {
  const rows = widths.filter((w) => w.age_group_id === ageId);
  const add = (field) => ({ gsb: rows.reduce((n, r) => n + r[field].gsb, 0), total: rows.reduce((n, r) => n + r[field].total, 0) });
  const row = add('rows'), pools = add('physical_pools');
  return { age_group_id: ageId, age_group: ageById.get(ageId), seasons: rows.length, rows: { ...row, percent: Number((100 * row.gsb / row.total).toFixed(1)) }, physical_pools: { ...pools, percent: Number((100 * pools.gsb / pools.total).toFixed(1)) } };
});
const nonInterpretable = new Map();
for (const r of groups.filter((row) => !parseLevel(row.division_name_raw, row.age_group_name).interpretable)) {
  const key = r.division_name_raw ?? '(tomt rækkenavn)';
  if (!nonInterpretable.has(key)) nonInterpretable.set(key, { division_name_raw: key, physical_pool_rows: 0, gsb_pool_rows: 0, seasons: new Set(), age_groups: new Set() });
  const item = nonInterpretable.get(key); item.physical_pool_rows += 1; item.gsb_pool_rows += r.gsb_names ? 1 : 0; item.seasons.add(`${r.season_id}/${String(r.season_id + 1).slice(-2)}`); item.age_groups.add(r.age_group_name);
}
const unparsed = [...nonInterpretable.values()].map((x) => ({ ...x, seasons: [...x.seasons].sort(), age_groups: [...x.age_groups].sort() })).sort((a, b) => b.physical_pool_rows - a.physical_pool_rows || a.division_name_raw.localeCompare(b.division_name_raw, 'da'));
const sample = allTeams.filter((_, i) => i % Math.max(1, Math.floor(allTeams.length / 15)) === 0).slice(0, 15).map((t) => ({ season: `${t.season_id}/${String(t.season_id + 1).slice(-2)}`, age_group: ageById.get(t.age_group_id), league_group_id: t.league_group_id, division_name_raw: t.division_name_raw, group_name_raw: t.group_name_raw, team_name_raw: t.team_name_raw, standing_position: t.standing_position }));
const after = databaseState();
if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error('Database hash or table row counts changed during read-only run');
if (allTeams.length !== 248 || gsbRows.reduce((n, r) => n + r.gsb_team_names.length, 0) !== allTeams.length) throw new Error(`GSB post accounting mismatch: team rows=${allTeams.length}, pool-group total=${gsbRows.reduce((n, r) => n + r.gsb_team_names.length, 0)}`);

const result = {
  generated_at: new Date().toISOString(), source: 'liga-landskab.db (readOnly: true)',
  method: { gsb_identity: 'league_group_teams.team_name_raw starts with Gladsaxe Søborg', senior_age: 'age_groups.name = SEN', veteran_age: 'age_groups.name starts SEN+; only age groups with GSB posts appear in team totals', copenhagen_region: regions[0], row_unit: 'same season_id + age_group_id + exact division_name_raw', pool_unit: 'season_id + age_group_id + league_group_id', placement: 'standing_position is within physical league_group_id; when exact row has multiple pools, row_place is null (not inferred)' },
  database_before: before, database_after: after,
  totals: { gsb_team_pool_posts: allTeams.length, gsb_physical_pool_records: gsbGroups.length, gsb_season_age_combinations: combos.size, senior_posts: allTeams.filter((t) => t.age_group_id === 1).length, veteran_posts: allTeams.filter((t) => t.age_group_id !== 1).length, placed_within_pool: gsbRows.filter((r) => r.placement_within_pool != null).reduce((n, r) => n + r.gsb_team_names.length, 0), no_pool_position: gsbRows.filter((r) => r.placement_within_pool == null).reduce((n, r) => n + r.gsb_team_names.length, 0), uninterpretable_gsb_posts: gsbRows.filter((r) => !r.level.interpretable).reduce((n, r) => n + r.gsb_team_names.length, 0), all_uninterpretable_names: unparsed.length, all_uninterpretable_physical_pool_rows: unparsed.reduce((n, r) => n + r.physical_pool_rows, 0) },
  season_age: [...combos.values()].map((c) => ({ ...c, rows: gsbRows.filter((r) => r.season_id === c.season_id && r.age_group_id === c.age_group_id).sort((a, b) => a.level.family.localeCompare(b.level.family, 'da') || ((a.level.order_within_family ?? 999) - (b.level.order_within_family ?? 999)) || String(a.division_name_raw ?? '').localeCompare(String(b.division_name_raw ?? ''), 'da')) })).sort((a, b) => a.season_id - b.season_id || a.age_group_id - b.age_group_id),
  kbh_width: { per_season_age: widths, overall_by_age: overallWidths },
  uninterpretable_names: unparsed, sample_15: sample,
  limitations: ['Rækkeplacering på tværs af flere puljer kan ikke udledes af standing_position; rapporten viser derfor kun placering inden for fysisk pulje og lader samlet rækkeplacering stå som ikke fastlagt.', 'Niveaufamilier er adskilt; Danmarksserien, Badmintonligaen, lokale serie- og divisionsrækker sammenlignes ikke på tværs af familier uden direkte dataunderstøttelse.', 'Rækkenavne, der ikke gav en tydelig divisions-/serienummerstruktur, står som ikke fastlagt.'],
};
fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`);
const table = (headers, rows) => `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n${rows.map((row) => `| ${row.map((v) => String(v ?? '—').replaceAll('|', '/')).join(' | ')} |`).join('\n')}`;
const md = [
  '# Opgave 133 — senior- og veteranplacering', '',
  `Datakilde: liga-landskab.db, åbnet read-only. GSB-match er præcist team_name_raw der starter med “Gladsaxe Søborg”. Region 8 er ${regions[0].name} (${regions[0].short_name}).`, '',
  '## Optælling', '',
  `- GSB-hold-puljeposter: **${result.totals.gsb_team_pool_posts}** (${result.totals.senior_posts} SEN + ${result.totals.veteran_posts} SEN+-poster), fordelt på ${result.totals.gsb_physical_pool_records} fysiske puljeposter og ${result.totals.gsb_season_age_combinations} sæson/aldersgruppe-kombinationer.`,
  `- Placering inden for fysisk pulje kendt: ${result.totals.placed_within_pool}; position mangler: ${result.totals.no_pool_position}.`,
  `- GSB har ${result.totals.uninterpretable_gsb_posts} poster i rækker uden tolket niveau. Den fulde liste dækker ${result.totals.all_uninterpretable_names} distinkte rå rækkenavne og ${result.totals.all_uninterpretable_physical_pool_rows} fysiske puljer (heraf GSB-puljer angivet separat).`, '',
  '## Metode og hierarkigrænser', '',
  'Enheden for række er eksakt (sæson, aldersgruppe, division_name_raw); flere league_group_id under samme række samles. Puljeplacering og holdantal er bevaret hver for sig. Divisionstal og serienumre vises kun inden for deres navngivne familie; Danmarksserien, Badmintonligaen og andre lokale serier blandes ikke i ét påstået samlet hierarki. “Elite” og kvalifikations-/slutspilsnavne uden entydig placering står særskilt eller som ikke fastlagt. Dette er en navnebaseret gruppering af kildeteksten, ikke en påstand om officiel sportslig rang.', '',
  '## GSB-hold pr. sæson og aldersgruppe', '',
  ...result.season_age.map((c) => `### ${c.season} — ${c.age_group}\n\n${table(['Række','Pulje','GSB-hold','Puljeplacering','Hold i pulje','Puljer i række','Hold i række','Tolket niveau/familie'],c.rows.map((r)=>[r.division_name_raw,r.group_name_raw,r.gsb_team_names.join(', '),r.placement_within_pool==null?r.row_place_status:`${r.placement_within_pool}; kun i puljen`,r.teams_in_pool,r.pools_in_same_row,r.teams_in_same_row,r.level.interpretable?`${r.level.family}${r.level.number==null?'':' '+r.level.number}`:'ikke fastlagt']))}`),
  '', '## Bredde — Badminton København', '',
  'Hovedtal er unikke division_name_raw-rækker med GSB / alle rækker i samme sæson og aldersgruppe. Fysiske puljer er vist parallelt, så flere puljer i én række ikke tæller som flere ligaer.', '',
  table(['Sæson','Alder','Rækker GSB / alle','%','Puljer GSB / alle','%'],widths.map((w)=>[w.season,w.age_group,`${w.rows.gsb}/${w.rows.total}`,w.rows.percent,`${w.physical_pools.gsb}/${w.physical_pools.total}`,w.physical_pools.percent])),
  '', '### Samlet over tid pr. aldersgruppe', '',
  table(['Alder','Sæsoner','Rækker GSB / alle','%','Puljer GSB / alle','%'],overallWidths.map((w)=>[w.age_group,w.seasons,`${w.rows.gsb}/${w.rows.total}`,w.rows.percent,`${w.physical_pools.gsb}/${w.physical_pools.total}`,w.physical_pools.percent])),
  '', '## Rækkenavne uden tolket niveau', '',
  table(['Rækkenavn','Fysiske puljer','Heraf med GSB','Sæsoner','Aldersgrupper'],unparsed.map((x)=>[x.division_name_raw,x.physical_pool_rows,x.gsb_pool_rows,x.seasons.join(', '),x.age_groups.join(', ')])),
  '', '## 15 stikprøver mod rå hold-puljer', '',
  table(['Sæson','Alder','league_group_id','Række','Hold','standing_position'],sample.map((x)=>[x.season,x.age_group,x.league_group_id,x.division_name_raw,x.team_name_raw,x.standing_position])),
  '', '## Kontrol og begrænsninger', '',
  `Databasetælling af GSB-rækker summerer præcist: ${result.totals.gsb_team_pool_posts} = ${result.totals.senior_posts} senior + ${result.totals.veteran_posts} veteran. Hashes og tabelrækketal før/efter er identiske; SHA-256 landscape ${before.landscape.sha256}, normalized ${before.normalized.sha256}.`,
  ...result.limitations.map((x)=>`- ${x}`),
  '', 'De fulde hold-, række-, pulje- og databasefør/efter-oplysninger ligger i den tilhørende JSON.', '',
].join('\n');
fs.writeFileSync(mdPath, md);
console.log(JSON.stringify({ totals: result.totals, width_combinations: widths.length, unparsed_names: unparsed.length, output: [jsonPath, mdPath] }, null, 2));
