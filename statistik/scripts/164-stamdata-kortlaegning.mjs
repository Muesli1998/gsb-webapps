// Offline kortlægning. Kør fra repo-roden: node statistik/scripts/164-stamdata-kortlaegning.mjs
// Python-standardbibliotekets SQLite bruges for eksplicit URI mode=ro + query_only.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
function gitShow(reference) {
  const r = spawnSync('git', ['show', reference], { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`Historisk kilde kunne ikke læses: ${reference}`);
  return r.stdout;
}
const prior036Ref = '07d9a4c65dc204a67416583471b08aa1a3e8240d:statistik/results/036-ungdom-navnematch-fuld-audit.json';
const prior036Text = gitShow(prior036Ref);
const prior036 = JSON.parse(prior036Text);
const prior016 = JSON.parse(read('statistik/results/016-spiller-id-audit.json'));
assert(read('statistik/scripts/audit-player-id-coverage.mjs').includes('COUNT(external_player_id)'));
gitShow('07d9a4c65dc204a67416583471b08aa1a3e8240d:statistik/results/036-ungdom-navnematch-fuld-audit.md');
const out = p => path.join(root, 'statistik/results', p);
const key = s => String(s ?? '').normalize('NFC').replace(/\s+/gu, ' ').trim().toLocaleLowerCase('da-DK');
const unique = a => [...new Set(a)].sort((a, b) => String(a).localeCompare(String(b), 'da'));
const numeric = s => /^\d+$/u.test(String(s ?? ''));
const gsbClub = s => ['gladsaxe søborg', 'gladsaxe søborg (g)'].includes(key(s));
const gsbTeam = s => /^(?:gladsaxe søborg|gsb)(?: \d+)?$/u.test(key(s));
const classify = ['entydig på ID', 'navn+klub', 'kun navn', 'ingen'];
const legacy = JSON.parse(read('data/navne-alias.json'));
const navneText = read('apps/netlify-prod/netlify/lib/navne.js');
const officialAlias = vm.runInNewContext(`(${navneText.match(/const ALIAS_RAA = (\{[\s\S]*?\n\});/u)[1]})`);
const rosterText = read('apps/netlify-prod/netlify/functions/spillere.js');
const roster = ['HERRER', 'DAMER'].flatMap((sex, i) => vm.runInNewContext(rosterText.match(new RegExp(`const ${sex}_2627 = (\\[[\\s\\S]*?\\]);`, 'u'))[1]).map(name => ({ name, gender: i ? 'kvinde' : 'mand' })));
const aliasEdges = Object.entries(officialAlias).map(([a, b]) => ({ a, b, source: 'apps/netlify-prod/netlify/lib/navne.js:ALIAS_RAA' }));
for (const section of ['alias_2425', 'alias_2526', 'alias_2627_zakobo_vs_resultater']) {
  for (const [a, b] of Object.entries(legacy[section])) if (a !== 'beskrivelse') aliasEdges.push({ a, b, source: `data/navne-alias.json:${section}` });
}
aliasEdges.push({ a: 'Michelle Liljengren', b: 'Michelle Christensen', source: 'data/navne-alias.json:navneaendring_2026_09_02; refId 930609-21' });
assert(read('docs/BESLUTNINGER.md').includes('Andreas Ryun Drasbek'));
aliasEdges.push({ a: 'Andreas Drasbek', b: 'Andreas Ryun Drasbek', source: 'docs/BESLUTNINGER.md:2026-10-04, Spillerpoint A3' });
const adjacency = new Map();
for (const { a, b } of aliasEdges) for (const [x, y] of [[a, b], [b, a]]) {
  if (!adjacency.has(key(x))) adjacency.set(key(x), new Set());
  adjacency.get(key(x)).add(y);
}
const aliasGroup = name => {
  const names = new Set([name]), seen = new Set(), queue = [name];
  while (queue.length) {
    const n = queue.pop(), k = key(n); if (seen.has(k)) continue; seen.add(k);
    for (const other of adjacency.get(k) ?? []) { names.add(other); queue.push(other); }
  }
  return unique([...names]);
};
const canonical = name => {
  const group = aliasGroup(name), keys = new Set(group.map(key));
  const chosen = roster.filter(r => keys.has(key(r.name)));
  if (chosen.length === 1) return chosen[0].name;
  const official = Object.values(officialAlias).filter(n => keys.has(key(n)));
  return official.length ? unique(official)[0] : name.trim();
};
const ckey = name => key(canonical(name));
const python = code => {
  const r = spawnSync(process.env.PYTHON || 'python', ['-c', code], { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
  if (r.status !== 0) throw new Error(`SQLite-læsning fejlede: ${r.stderr}`);
  return JSON.parse(r.stdout);
};
async function hashes() {
  const result = [];
  for (const line of read('statistik/HASHES.txt').trim().split(/\r?\n/u)) {
    const [, expected, name] = line.match(/^([a-f\d]{64})\s{2}(.+)$/iu);
    const hash = crypto.createHash('sha256');
    for await (const chunk of fs.createReadStream(path.join(root, 'statistik/data', name))) hash.update(chunk);
    result.push({ database: name, expected: expected.toLowerCase(), actual: hash.digest('hex') });
  }
  return result;
}
console.log('164: SHA-256 før læsning');
const before = await hashes();
assert(before.every(x => x.expected === x.actual), 'Databasehash afviger før læsning');
console.log('164: SQLite mode=ro; PRAGMA query_only=ON');
const data = python(String.raw`
import sqlite3,pathlib,json,re
def db(name):
 c=sqlite3.connect(pathlib.Path('statistik/data',name).resolve().as_uri()+'?mode=ro',uri=True)
 c.execute('PRAGMA query_only=ON');assert c.execute('PRAGMA query_only').fetchone()[0]==1;c.row_factory=sqlite3.Row;return c
def rows(c,q,args=()):return [dict(r) for r in c.execute(q,args)]
r=db('rangliste-point.db'); n=db('gsb-statistik-normalized.db'); p=db('national-spillere.db')
d={'rank':rows(r,'select player_id,member_number,name,club,param,class,min(version_date) first_version,max(version_date) last_version,count(*) observations from ranking_points group by 1,2,3,4,5,6'),
 'national':rows(p,'select * from players'), 'normalized':rows(n,'select * from players'),
 'matches':rows(n,'''select tm.*,t.name_raw team_name,t.club_id,t.season_id team_season,t.competition_id team_competition,c.age_group_id,c.name_raw competition_name,c.league_raw league,
 (select count(*) from individual_matches i where i.team_match_id=tm.team_match_id) individual_rows
 from team_matches tm left join teams t on t.team_id=tm.gsb_team_id left join competitions c on c.competition_id=tm.competition_id'''),
 'relations':rows(n,'''select imp.player_id,imp.side,tm.team_match_id,count(*) relations from individual_match_players imp join individual_matches im using(individual_match_id) join team_matches tm using(team_match_id) group by 1,2,3'''),
 'youth_rows':rows(n,'''select im.individual_match_id,im.team_match_id,group_concat(distinct imp.side) sides,count(imp.player_id) player_relations from individual_matches im join team_matches tm using(team_match_id) join competitions c using(competition_id) left join individual_match_players imp using(individual_match_id) where tm.season_id=2025 and c.age_group_id in (2,3,4,5,6,18) group by 1,2'''),
 'national_matches':rows(p,'''select external_match_id,season_id,age_group_id,league_group_id,home_team_raw,away_team_raw,result_raw,render_gate from matches where home_team_raw like 'Gladsaxe Søborg%' or away_team_raw like 'Gladsaxe Søborg%' or home_team_raw like 'GSB%' or away_team_raw like 'GSB%' '''),
 'national_sides':[], 'national_names':[], 'read_only':{'mode':'ro','query_only':1}}
for m in d['national_matches']:
 d['national_sides']+=rows(p,'select external_match_id,external_player_id,slot,discipline_code,team_side,parse_status from player_match_extras where external_match_id=?',(m['external_match_id'],))
# player_matches har intet indeks med match-ID først. Ét scan, aldrig ét scan pr. kamp.
match_ids={m['external_match_id'] for m in d['national_matches']}
for snapshot_row in p.execute('select external_match_id,external_player_id,name_raw,discipline_code from player_matches'):
 if snapshot_row['external_match_id'] in match_ids:d['national_names'].append(dict(snapshot_row))
d['source_counts']={'ranking_points':r.execute('select count(*) from ranking_points').fetchone()[0],'national_players':p.execute('select count(*) from players').fetchone()[0],'normalized_players':n.execute('select count(*) from players').fetchone()[0]}
for c in [r,n,p]:c.close()
print(json.dumps(d,ensure_ascii=False))
`);

function matchSide(m) {
  if (!m.gsb_team_id || m.club_id !== 1093) return { side: 'ukendt', reason: 'manglende GSB-hold/klub-ID' };
  if (m.team_season !== m.season_id || m.team_competition !== m.competition_id) return { side: 'ukendt', reason: 'holdets sæson/pulje matcher ikke kampen' };
  if (!key(m.home_name_raw) || !key(m.away_name_raw)) return { side: 'ukendt', reason: 'tomme hjemme-/udehold; API-fejl eller suspenderet kamp' };
  const home = key(m.home_name_raw) === key(m.team_name), away = key(m.away_name_raw) === key(m.team_name);
  if (home && away) return { side: 'ukendt', reason: 'GSB-holdnavnet matcher begge sider' };
  if (!home && !away) return { side: 'ukendt', reason: 'GSB-holdnavnet matcher ingen side' };
  return { side: home ? 'home' : 'away', reason: 'GSB-hold-ID → klub-ID + sæson/pulje + eksakt holdnavn → hjemme/ude' };
}
const matches = new Map(data.matches.map(m => [m.team_match_id, { ...m, ...matchSide(m) }]));
const norm = new Map(data.normalized.map(p => [p.player_id, p]));
const nat = new Map(data.national.map(p => [p.external_player_id, p]));
const rankById = new Map();
for (const r of data.rank) { if (!rankById.has(r.player_id)) rankById.set(r.player_id, []); rankById.get(r.player_id).push(r); }
const normById = new Map();
for (const p of data.normalized) if (numeric(p.external_player_id)) {
  if (!normById.has(p.external_player_id)) normById.set(p.external_player_id, []);
  normById.get(p.external_player_id).push(p);
}
const gsbnorm = new Map(), gsbnat = new Map();
for (const relation of data.relations) {
  const m = matches.get(relation.team_match_id);
  if (m.side !== 'ukendt' && relation.side === m.side) {
    if (!gsbnorm.has(relation.player_id)) gsbnorm.set(relation.player_id, []);
    gsbnorm.get(relation.player_id).push({ ...relation, season_id: m.season_id, age_group_id: m.age_group_id, external_match_id: m.external_match_id });
  }
}
const natMatch = new Map(data.national_matches.map(m => [m.external_match_id, m]));
for (const e of data.national_sides) {
  const m = natMatch.get(e.external_match_id), header = e.team_side === 'hjemme' ? m.home_team_raw : e.team_side === 'ude' ? m.away_team_raw : '';
  if (e.parse_status === 'ok' && m.render_gate === 1 && gsbTeam(header)) {
    if (!gsbnat.has(e.external_player_id)) gsbnat.set(e.external_player_id, []);
    gsbnat.get(e.external_player_id).push({ ...e, season_id: m.season_id, age_group_id: m.age_group_id, team_name: header });
  }
}
const snapshots = new Map();
for (const p of data.national_names) { if (!snapshots.has(p.external_player_id)) snapshots.set(p.external_player_id, new Set()); snapshots.get(p.external_player_id).add(p.name_raw); }
// Numeriske ID'er er selvstændige identitetsankre. name:-ID'er er IKKE sådanne ankre.
const allIds = unique([...rankById.keys(), ...nat.keys(), ...normById.keys()]);
const idNames = new Map(allIds.map(id => [id, unique([...(rankById.get(id) ?? []).map(r => r.name), nat.get(id)?.name_raw, ...(normById.get(id) ?? []).map(p => p.name_raw), ...snapshots.get(id) ?? []].filter(Boolean))]));
const nameIds = new Map();
for (const [id, names] of idNames) for (const name of names) {
  if (!nameIds.has(ckey(name))) nameIds.set(ckey(name), new Set()); nameIds.get(ckey(name)).add(id);
}
const selected = new Set([...gsbnat.keys(), ...[...gsbnorm.keys()].map(id => norm.get(id).external_player_id).filter(numeric), ...data.rank.filter(r => gsbClub(r.club)).map(r => r.player_id)]);
const entities = new Map();
const unidentifiedSourceRecords = [...gsbnorm.keys()].filter(pid => key(norm.get(pid).name_raw) === '(ukendt spiller)').map(pid => ({ ...norm.get(pid), reason: 'Eksplicit placeholder, ikke en identificeret person', observations: gsbnorm.get(pid) }));
const unidentifiedIds = new Set(unidentifiedSourceRecords.map(p => p.player_id));
function entity(id, name) {
  if (!entities.has(id)) entities.set(id, { person_key: id, canonical_name: canonical(name), roster: [], normalized_candidates: [], candidate_numeric_ids: [], selection_evidence: [] });
  return entities.get(id);
}
for (const id of selected) {
  const name = (rankById.get(id) ?? []).filter(r => gsbClub(r.club)).sort((a, b) => b.last_version.localeCompare(a.last_version))[0]?.name ?? nat.get(id)?.name_raw ?? normById.get(id)?.[0]?.name_raw;
  assert(name, `Navn mangler for ${id}`);
  const e = entity(`id:${id}`, name);
  if (gsbnat.has(id)) e.selection_evidence.push('national: parse_status=ok, render_gate=1, team_side og GSB-holdoverskrift');
  if ((rankById.get(id) ?? []).some(r => gsbClub(r.club))) e.selection_evidence.push('rangliste: klubfelt Gladsaxe Søborg eller Gladsaxe Søborg (g)');
  if ((normById.get(id) ?? []).some(p => gsbnorm.has(p.player_id))) e.selection_evidence.push('normalized: numerisk ID på strukturelt udledt GSB-side');
}
for (const [pid] of gsbnorm) {
  if (unidentifiedIds.has(pid)) continue;
  const p = norm.get(pid); if (numeric(p.external_player_id)) continue;
  const candidates = [...nameIds.get(ckey(p.name_raw)) ?? []];
  const id = candidates.length === 1 ? `id:${candidates[0]}` : `name:${ckey(p.name_raw)}`;
  const e = entity(id, p.name_raw);
  e.normalized_candidates.push({ player_id: pid, external_player_id: p.external_player_id, name: p.name_raw, class: candidates.length === 1 && selected.has(candidates[0]) ? 'navn+klub' : candidates.length === 1 ? 'kun navn' : 'ingen', unresolved: true });
  e.candidate_numeric_ids = unique([...e.candidate_numeric_ids, ...candidates]);
  e.selection_evidence.push('normalized: navn uden profil-ID på strukturelt udledt GSB-side; identitet uafklaret');
}
for (const r of roster) {
  const candidates = [...nameIds.get(ckey(r.name)) ?? []];
  const id = candidates.length === 1 ? `id:${candidates[0]}` : `name:${ckey(r.name)}`;
  const e = entity(id, r.name); e.canonical_name = r.name; e.roster.push(r);
  e.candidate_numeric_ids = unique([...e.candidate_numeric_ids, ...candidates]);
  e.selection_evidence.push('Dream Team: manuelt bekræftet trup 2026/27; profilkobling kun navn');
}

const people = [];
for (const e of entities.values()) {
  const id = e.person_key.startsWith('id:') ? e.person_key.slice(3) : null;
  const ranks = rankById.get(id) ?? [], national = nat.get(id), exactNorm = normById.get(id) ?? [];
  const names = unique([e.canonical_name, ...idNames.get(id) ?? [], ...e.normalized_candidates.map(p => p.name), ...e.roster.map(r => r.name)].flatMap(aliasGroup));
  const links = [];
  if (ranks.length && national) links.push({ from: 'ranking.player_id', to: 'national.external_player_id', value: id, class: 'entydig på ID', unresolved: false });
  for (const p of exactNorm) if (ranks.length || national) links.push({ from: 'normalized.player_id', value: p.player_id, to: 'profil-ID', target_id: id, class: 'entydig på ID', unresolved: false });
  for (const p of e.normalized_candidates) links.push({ from: 'normalized.player_id', value: p.player_id, to: 'profil-ID', target_id: id ?? 'ukendt', candidates: e.candidate_numeric_ids, class: p.class, unresolved: true });
  for (const r of e.roster) links.push({ from: 'Dream Team', value: r.name, to: 'profil-ID', target_id: id ?? 'ukendt', candidates: e.candidate_numeric_ids, class: id ? (ranks.some(r => gsbClub(r.club)) || gsbnat.has(id) ? 'navn+klub' : 'kun navn') : 'ingen', unresolved: true });
  const personClass = classify.find(c => links.some(l => l.class === c)) ?? 'ingen';
  const genderEvidence = [...unique(ranks.map(r => r.param)).map(v => ({ source: 'ranking.param', raw: v, value: v === 'M' ? 'mand' : v === 'K' ? 'kvinde' : 'ukendt' })), ...(national ? [{ source: 'national.players.gender_status', raw: national.gender_status, value: ['mand', 'kvinde'].includes(national.gender_status) ? national.gender_status : 'ukendt' }] : []), ...e.roster.map(r => ({ source: 'Dream Team 2026/27', raw: r.gender, value: r.gender }))];
  const genders = unique(genderEvidence.map(g => g.value).filter(g => g !== 'ukendt'));
  const memberNumbers = unique(ranks.map(r => r.member_number).filter(Boolean));
  const ownRelations = [...exactNorm, ...e.normalized_candidates].flatMap(p => gsbnorm.get(p.player_id) ?? []);
  const natRelations = gsbnat.get(id) ?? [];
  const activity = {};
  for (const season of [2025, 2026]) {
    const nn = ownRelations.filter(x => x.season_id === season), pn = natRelations.filter(x => x.season_id === season);
    activity[`${season}/${String(season + 1).slice(-2)}`] = { value: nn.length || pn.length ? 'ja' : 'ukendt', definition: 'observeret GSB-kampdeltagelse; fravær er ikke inaktivitet', normalized_match_ids: unique(nn.map(x => x.external_match_id)), national_match_ids: unique(pn.map(x => x.external_match_id)), roster_member: season === 2026 && e.roster.length ? 'ja' : 'ukendt', identity_unresolved: nn.length > 0 && !pn.length && !exactNorm.some(p => (gsbnorm.get(p.player_id) ?? []).some(r => r.season_id === season)) };
  }
  people.push({ ...e, aliases: names.filter(n => n !== e.canonical_name), alias_evidence: aliasEdges.filter(a => names.some(n => key(n) === key(a.a))), profile_id: id ?? 'ukendt', ranking_playerid: ranks.length ? id : 'ukendt', national_player_id: national ? id : 'ukendt', normalized_db_ids: unique([...exactNorm, ...e.normalized_candidates].map(p => p.player_id)), normalized_records: [...exactNorm.map(p => ({ ...p, class: 'entydig på ID' })), ...e.normalized_candidates], ranking_clubs: unique(ranks.map(r => r.club)), ranking_classes: unique(ranks.map(r => r.class)), ranking_evidence: ranks, member_numbers: memberNumbers, gender: genders.length === 1 && national?.gender_status !== 'modstridende data' ? genders[0] : 'ukendt', gender_conflict: genders.length > 1 || national?.gender_status === 'modstridende data', gender_evidence: genderEvidence, birth_year: 'ukendt', age_groups: unique([...ownRelations, ...natRelations].map(r => `${r.season_id}:${r.age_group_id}`)), age_group_definition: 'kampens sæson:age_group_id; ikke dokumentation for personens fødselsår', active: activity, class: personClass, identity_status: links.some(l => l.unresolved) ? 'uafklarede navnekoblinger; se hver kobling' : id ? 'numerisk kildeidentitet' : 'ukendt fysisk identitet', links });
}
people.sort((a, b) => a.canonical_name.localeCompare(b.canonical_name, 'da') || a.person_key.localeCompare(b.person_key));
for (const p of people) p.candidate_profiles = p.candidate_numeric_ids.map(id => ({ id, names: idNames.get(id), national_gender: nat.get(id)?.gender_status ?? 'ukendt', ranking_clubs: unique((rankById.get(id) ?? []).map(r => r.club)), ranking_observations: rankById.get(id) ?? [], gsb_match_seasons: unique((gsbnat.get(id) ?? []).map(r => r.season_id)), status: 'uafklaret navnekandidat; metadata er ikke en bekræftet identitet' }));

// Uafhængigt navnematch som kontrol af ID-lighed; selve ID-intersektionen er ikke bevis alene.
const nameMap = (records, idField, nameField) => {
  const map = new Map();
  for (const r of records) { const k = ckey(r[nameField]); if (!map.has(k)) map.set(k, new Set()); map.get(k).add(r[idField]); }
  return map;
};
const rn = nameMap(data.rank, 'player_id', 'name'), pn = nameMap(data.national, 'external_player_id', 'name_raw');
const nameComparisons = [], ambiguousNames = [];
for (const [name, ids] of rn) if (pn.has(name)) {
  const other = pn.get(name);
  if (ids.size === 1 && other.size === 1) nameComparisons.push({ name, ranking_id: [...ids][0], national_id: [...other][0], equal: [...ids][0] === [...other][0] });
  else ambiguousNames.push({ name, ranking_ids: [...ids], national_ids: [...other] });
}
const idComparisons = [...rankById.keys()].filter(id => nat.has(id)).map(id => ({ id, ranking_names: unique(rankById.get(id).map(r => r.name)), national_name: nat.get(id).name_raw, name_agrees: rankById.get(id).some(r => ckey(r.name) === ckey(nat.get(id).name_raw)) }));
const same = nameComparisons.filter(c => c.equal), different = nameComparisons.filter(c => !c.equal);
const identityComparison = {
  result: different.length ? 'delvist' : same.length ? (ambiguousNames.length || idComparisons.some(c => !c.name_agrees) ? 'delvist' : 'ja') : 'ukendt',
  meaning: 'Numerisk rangliste-playerid sammenlignes med national.external_player_id (spillerprofilens URL-fragment). BadmintonID/member_number er et andet felt og en anden identifikator.',
  caveat: 'Entydighed i hver kildes navneliste beviser ikke samme fysiske person. Navnepar med forskellige IDer kan være navnebrødre, dublerede profiler eller navneændringer. Dette afgøres ikke her. Delvist betyder delvis bekræftelse af koblingerne, ikke et bevis for to forskellige numeriske ID-namespaces.',
  name_matched_unique_pairs: nameComparisons.length, equal_ids: same.length, different_ids: different.length, ambiguous_shared_names: ambiguousNames.length,
  numeric_id_intersection: idComparisons.length, intersection_names_agree: idComparisons.filter(c => c.name_agrees).length, intersection_names_differ: idComparisons.filter(c => !c.name_agrees).length,
  ranking_ids_without_national: [...rankById.keys()].filter(id => !nat.has(id)).length,
  gsb_numeric_intersection: people.filter(p => p.ranking_playerid !== 'ukendt' && p.national_player_id !== 'ukendt').length,
  examples: ['329159', '55454', ...same.map(c => c.ranking_id)].filter((id, i, a) => a.indexOf(id) === i && rankById.has(id) && nat.has(id)).slice(0, 3).map(id => ({ ranking_playerid: id, national_id: id, ranking_names: unique(rankById.get(id).map(r => r.name)), national_name: nat.get(id).name_raw, member_numbers: unique(rankById.get(id).map(r => r.member_number)) })),
  independent_name_comparisons: nameComparisons, ambiguous_names: ambiguousNames, mismatches: different, intersection_checks: idComparisons,
};

const conflicts = [];
for (const [name, ids] of nameIds) if (ids.size > 1) conflicts.push({ type: 'samme navn, flere profil-IDer', name, ids: [...ids], names: unique([...ids].flatMap(id => idNames.get(id))), scope: [...ids].some(id => people.some(p => p.profile_id === id || p.candidate_numeric_ids.includes(id))) ? 'GSB-relevant' : 'øvrige kilder', status: 'uafklaret: navnebrødre eller dublerede profiler; fysisk identitet ukendt', evidence: 'ranking_points + national.players + normalized.players + GSB player_matches' });
for (const [id, names] of idNames) if (names.length > 1) conflicts.push({ type: 'ét profil-ID, flere navne', name: names[0], ids: [id], names, scope: people.some(p => p.profile_id === id) ? 'GSB-relevant' : 'øvrige kilder', status: 'samme numeriske kildeidentitet; navnene bevares', evidence: 'kilderne har samme numeriske profil-ID' });
for (const p of people) if (p.aliases.length) conflicts.push({ type: 'dokumenteret alias eller navnekandidat', name: p.canonical_name, ids: p.profile_id === 'ukendt' ? [] : [p.profile_id], names: [p.canonical_name, ...p.aliases], scope: 'GSB-relevant', status: p.identity_status, evidence: JSON.stringify({ alias_evidence: p.alias_evidence, normalized_records: p.normalized_records }) });
for (const p of people) if (p.gender_conflict) conflicts.push({ type: 'modstridende køn', name: p.canonical_name, ids: [p.profile_id], names: [p.canonical_name], scope: 'GSB-relevant', status: 'ukendt; ingen værdi valgt', evidence: JSON.stringify(p.gender_evidence) });

const youth = [...matches.values()].filter(m => m.season_id === 2025 && [2, 3, 4, 5, 6, 18].includes(m.age_group_id));
const youthMap = new Map(youth.map(m => [m.team_match_id, m]));
const reasonCounts = new Map();
for (const m of youth) {
  if (!reasonCounts.has(m.reason)) reasonCounts.set(m.reason, { reason: m.reason, matches: 0, rows: 0 });
  const c = reasonCounts.get(m.reason); c.matches++; c.rows += m.individual_rows;
}
const rowChecks = data.youth_rows.map(r => {
  const m = youthMap.get(r.team_match_id), sides = (r.sides ?? '').split(',');
  return { ...r, gsb_side: m.side, can_resolve: m.side !== 'ukendt' && sides.includes(m.side) && sides.every(s => ['home', 'away'].includes(s)), reason: m.side === 'ukendt' ? m.reason : !sides.includes(m.side) ? 'ingen spillerrelation på GSB-side' : sides.some(s => !['home', 'away'].includes(s)) ? 'ukendt spiller-side' : 'holdets GSB-side + individual_match_players.side' };
});
const resolved = youth.filter(m => m.side !== 'ukendt'), resolvedRows = rowChecks.filter(r => r.can_resolve);
const percentage = (n, d) => d ? Number((100 * n / d).toFixed(4)) : null;
const ourSide = { season: '2025/26', club_id: 1093, age_group_ids: [2, 3, 4, 5, 6, 18], matches: youth.length, resolved_matches: resolved.length, unresolved_matches: youth.length - resolved.length, resolved_match_percent: percentage(resolved.length, youth.length), unresolved_match_percent: percentage(youth.length - resolved.length, youth.length), individual_rows: rowChecks.length, resolved_rows: resolvedRows.length, unresolved_rows: rowChecks.length - resolvedRows.length, resolved_row_percent: percentage(resolvedRows.length, rowChecks.length), unresolved_row_percent: percentage(rowChecks.length - resolvedRows.length, rowChecks.length), matches_with_rows: youth.filter(m => m.individual_rows > 0).length, resolved_matches_without_rows: resolved.filter(m => !m.individual_rows).length, home_matches: resolved.filter(m => m.side === 'home').length, away_matches: resolved.filter(m => m.side === 'away').length, reason_counts: [...reasonCounts.values()], matches_evidence: youth, row_evidence: rowChecks, purely_numeric_side: 'ukendt: schemaet har ikke home_team_id/away_team_id; løsningen bruger hold-ID/klub-ID og eksakt holdnavn, aldrig spillernavne', product_limit: 'Målingen gælder normalized DB. Dream Team Resultater-arket og hent-resultater.js er ikke målt eller ændret.' };

const classes = Object.fromEntries(classify.map(c => [c, people.filter(p => p.class === c).length]));
const linkClasses = Object.fromEntries(classify.map(c => [c, people.flatMap(p => p.links).filter(l => l.class === c).length]));
const conflictCounts = {};
for (const c of conflicts) conflictCounts[c.type] = (conflictCounts[c.type] ?? 0) + 1;
const summary = { person_records: people.length, physical_person_count: 'ukendt; navn-only import kan have sammenlagt personer', person_classes: classes, link_classes: linkClasses, links: people.reduce((n, p) => n + p.links.length, 0), unresolved_links: people.flatMap(p => p.links).filter(l => l.unresolved).length, roster_records: roster.length, roster_represented: people.reduce((n, p) => n + p.roster.length, 0), name_conflict_records: conflicts.length, conflict_classes: conflictCounts, gender_conflicts: people.filter(p => p.gender_conflict).length, birth_year_known: 0, activity: Object.fromEntries(['2025/26', '2026/27'].map(s => [s, { yes: people.filter(p => p.active[s].value === 'ja').length, unknown: people.filter(p => p.active[s].value === 'ukendt').length }])), unresolved_historical_team_matches: [...matches.values()].filter(m => m.side === 'ukendt').length, national_side_unresolved_rows_in_gsb_header_matches: data.national_sides.filter(e => e.parse_status !== 'ok').length, source_counts: data.source_counts, network_calls: 0 };
summary.unidentified_placeholder_records = unidentifiedSourceRecords.length;
summary.normalized_identity = { numeric_profile_ids: data.normalized.filter(p => numeric(p.external_player_id)).length, name_keys: data.normalized.filter(p => String(p.external_player_id).startsWith('name:')).length, missing_ids: data.normalized.filter(p => !p.external_player_id).length, other_ids: data.normalized.filter(p => p.external_player_id && !numeric(p.external_player_id) && !String(p.external_player_id).startsWith('name:')).length };
for (const season of ['2025/26', '2026/27']) summary.activity[season].yes_with_unresolved_identity = people.filter(p => p.active[season].value === 'ja' && p.active[season].identity_unresolved).length;

const priorWork = [
  { card: '016', evidence: 'statistik/results/016-spiller-id-audit.md; statistik/scripts/audit-player-id-coverage.mjs', finding: 'Rapportens historiske optælling genbruges som felttælling. Scriptet tæller COUNT(external_player_id)/IS NOT NULL uden at udelukke name:-nøgler; det er derfor ikke i sig selv bevis for numeriske spillerprofil-IDer. Den aktuelle fordeling af rå identifikatorer står i summary.normalized_identity. Årsagen til den tidligere påstand om profil-ID-dækning er ukendt. Ingen ny relationsdækningsaudit køres.', historical_result: prior016 },
  { card: '032', evidence: 'work/loeste/032-spiller-navnematch-risiko.md; statistik/results/032-spiller-navnematch-risiko.md, runde 3', finding: 'Import kan sammenlægge identiske navne. Forskellige rækker samme dato er ikke kollisionsbevis; nul navnedubletter beviser intet om fysiske personer.' },
  { card: '036', evidence: `work/loeste/036-ungdom-navnematch-fuld-audit.md; git show ${prior036Ref}`, finding: 'Rapporten mangler i checkout; genfundet i historikken med læsende git show. Den tidligere fulde audit fandt ingen samme-dato/samme-række-indikator; navnesplittelse kan stadig ikke afgøres. Resultatet genbruges, auditten køres ikke igen.', historical_result: prior036, historical_sha256: crypto.createHash('sha256').update(prior036Text).digest('hex') },
  { card: '116', evidence: 'work/loeste/116-national-spiller-id-mekanisme.md; statistik/results/116-national-spiller-id-mekanisme.md', finding: 'national.external_player_id er det numeriske spillerprofilfragment; ældre sider kan mangle links.' },
];
const recommendation = {
  status: 'forslag; ingen tabeller eller databaser oprettet',
  stamdata: { primary_key: 'person_id (intern stabil UUID eller integer; aldrig navn)', fields: ['canonical_name', 'owner', 'created_at', 'updated_at', 'review_status'], rule: 'Fødselsår, køn og aktivitet må kun materialiseres fra konfliktfrie dokumenterede observationer; ellers ukendt. Bevar kildeværdier separat.' },
  alias: { primary_key: 'alias_id', fields: ['person_id (nullable for uafklaret kandidat)', 'name_raw', 'name_key (NFC + whitespace + lowercase; behold diakritik)', 'source', 'season_id', 'observed_at', 'valid_from', 'valid_to', 'evidence_reference', 'approval_owner', 'status'], rule: 'Ingen UNIQUE(name_key): navnebrødre skal kunne eksistere. Alias er en observeret eller manuelt godkendt navnevariant, ikke automatisk identitetsbevis.' },
  id_kobling: { primary_key: 'binding_id', fields: ['person_id (nullable)', 'source_system', 'id_namespace', 'external_id (TEXT)', 'link_class', 'status (confirmed/candidate/rejected)', 'valid_from', 'valid_to', 'evidence_reference', 'evidence_sha256', 'observed_at', 'reviewed_by'], namespaces: ['badmintonplayer.profile (numerisk URL/rangliste-playerid)', 'badmintonplayer.member_number (BadmintonID/refId; behold rå tegn)', 'normalized.player_id (intern kilde-ID)', 'normalized.name_key (navnebaseret kandidat)'], rule: 'UNIQUE(namespace,external_id) for aktive bekræftede bindinger; kandidater gemmes separat og må ikke automatisk flette personer. Hver name:-række forbliver uafklaret indtil ekstern identitet er dokumenteret.' },
  supporting_observations: { fields: ['person_or_binding_id', 'attribute (gender/birth_year/club/activity/age_group)', 'value_raw', 'source', 'season_id', 'match_id_or_ranking_version', 'evidence_reference', 'observed_at', 'status'], rule: 'Kampens aldersgruppe er kontekst, ikke fødselsår. Klub gemmes med version og rolle (ranglisteklub vs kampklub). Aktivitet kræver GSB-side; fravær er ukendt.' },
  ownership: 'Foreslået ansvarlig: Christoffer for kanonisk navn, manuelle aliaser og konflikter. Automatisk indlæser ejer observationer, aldrig manuelle afgørelser.',
  cadence: 'Ved hver ugentlig kamp-/ranglisteopdatering indlæses nye IDer, navne, klub- og kønsobservationer. Truplisten gennemgås før hver sæson og ved nye reserver/navneændringer; konflikter sendes til manuel gennemgang.',
  sources: 'Ranglisteversioner med profil-ID, member_number og klub; national spillerlink + parse_status=ok; normalized hold-ID/klub-ID og side; Dream Team-facit og historiske aliaser med manuel proveniens.',
  prerequisites: 'Afklar navnebrødre og modstridende køn; godkend navnebaserede kandidater før de bruges som bekræftede personkoblinger. Afklar om produktets Resultater-ark gemmer hold-/sidefelter før tilsvarende ændring i appen. Kort 036 er genfundet i historikken og beviser kun fravær af den undersøgte indikator.',
};
console.log('164: SHA-256 efter læsning');
const after = await hashes();
assert.deepEqual(after, before, 'Databasehash ændret under læsning');
const report = { task: '164', generated_at: new Date().toISOString(), methodology: { scope: 'Union af historisk GSB-side i normalized/national, GSB-ranglisteklub og Dream Team-facit. Modstandere uden GSB-evidens er ikke stamdataposter. Globale kildekonflikter og ID-sammenligninger vises særskilt.', person_definition: 'Én post pr. numerisk profilanker eller uafklaret navnegruppe. Entydige navnekandidater vises samlet til review, men hver sådan kobling forbliver uafklaret; postantal er ikke bevist fysisk personantal. Eksplicit (Ukendt spiller)-placeholder holdes uden for personoptællingen og gemmes separat.', normalized_snapshot: 'Den aktuelle normalized.players-identifikatorfordeling står i summary.normalized_identity. Kort 016 beskriver et tidligere snapshot og må ikke bruges som dagens ID-dækning.', class_definition: 'Personklasse er den stærkeste eksisterende kobling: entydig på ID > navn+klub > kun navn > ingen. Hver kobling har egen klasse og uafklaret-flag; en sikker ID-kobling godkender ikke personens øvrige navnekandidater.', gender_definition: 'Rangliste param M/K, national gender_status og trup-køn; modstridende værdier vælges aldrig. Køn fra navnekandidater er ikke en bekræftet overførsel.', birth_year: 'ukendt. Ingen kilde har et eksplicit fødselsår. member_number bevares råt; ingen dato/århundrede udledes.', national_side: 'player_matches.team_side er tomt. Brug kun eksisterende player_match_extras med parse_status=ok og kampoverskrift; 136-parseren er ikke kørt eller ændret.', conflicts: 'Alle observerede konflikter i ranking_points, national.players, normalized.players og player_matches for GSB-holdoverskrifter. Uobserverede historiske navne og skjulte fysiske navnebrødre: ukendt.' }, prior_work: priorWork, summary, identity_comparison: identityComparison, our_side: ourSide, people, unidentified_source_records: unidentifiedSourceRecords, name_conflicts: conflicts, recommendation, safeguards: { network_calls: 0, sqlite: data.read_only, databases: before.map((x, i) => ({ ...x, after: after[i].actual, unchanged: true })), hash_guard_exit_code: 0 } };
assert.equal(Object.values(classes).reduce((a, b) => a + b, 0), people.length);
assert.equal(Object.values(linkClasses).reduce((a, b) => a + b, 0), summary.links);
assert.equal(summary.roster_represented, roster.length);
assert.equal(youth.length, 271); assert.equal(rowChecks.length, 1582);
assert.equal(youth.reduce((n, m) => n + m.individual_rows, 0), rowChecks.length);

const csv = (columns, rows) => '\uFEFF' + [columns, ...rows.map(r => columns.map(c => typeof r[c] === 'object' ? JSON.stringify(r[c]) : r[c] ?? 'ukendt'))].map(row => row.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n') + '\n';
fs.writeFileSync(out('164-stamdata.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
fs.writeFileSync(out('164-stamdata.csv'), csv(['person_key', 'canonical_name', 'aliases', 'ranking_playerid', 'national_player_id', 'normalized_db_ids', 'ranking_clubs', 'gender', 'gender_evidence', 'birth_year', 'age_groups', 'active', 'class', 'identity_status', 'links', 'member_numbers', 'candidate_numeric_ids', 'candidate_profiles'], people), 'utf8');
fs.writeFileSync(out('164-navnekonflikter.csv'), csv(['type', 'name', 'ids', 'names', 'scope', 'status', 'evidence'], conflicts), 'utf8');

const conciseComparison = Object.fromEntries(Object.entries(identityComparison).filter(([k]) => !['independent_name_comparisons', 'ambiguous_names', 'mismatches', 'intersection_checks'].includes(k)));
const conciseSide = Object.fromEntries(Object.entries(ourSide).filter(([k]) => !['matches_evidence', 'row_evidence'].includes(k)));
const quantitative = { summary, identity_comparison: conciseComparison, our_side: conciseSide, prior_016: prior016, prior_036: prior036, safeguards: report.safeguards };
const md = [
  '# 164 — stamdata for GSB-spillere', '',
  `Personposter: **${people.length}**; fysisk personantal: **ukendt**. Posterne er review-grundlag med kilde-IDer, ikke en færdig identitetsdatabase.`, '',
  '## Metode og tidligere arbejde', '',
  ...Object.entries(report.methodology).map(([k, v]) => `- **${k}:** ${v}`), '',
  ...priorWork.map(p => `- **${p.card}:** ${p.finding} Kilde: \`${p.evidence}\`.`), '',
  '## Koblingsklasser', '', '| Klasse | Personposter | Koblinger |', '|---|---:|---:|',
  ...classify.map(c => `| ${c} | ${classes[c]} | ${linkClasses[c]} |`), '',
  'Personklassen er den stærkeste kobling; alle navnebaserede koblinger er fortsat uafklarede. Filerne har separate kandidatfelter og evidens pr. kobling.', '',
  '## Rangliste-playerid og national-ID', '',
  `Resultat: **${identityComparison.result}** for det målte materiale. ${same.length}/${nameComparisons.length} uafhængigt navneparrede entydige kildeposter har samme numeriske ID; ${different.length} har forskellige IDer. ${ambiguousNames.length} fælles navne er flertydige og kan ikke parres sikkert.`, '',
  identityComparison.meaning, '', identityComparison.caveat, '',
  '| Rangliste-playerid | National-ID | Ranglistenavn | Nationalnavn | BadmintonID/member_number |', '|---|---|---|---|---|',
  ...identityComparison.examples.map(x => `| ${x.ranking_playerid} | ${x.national_id} | ${x.ranking_names.join('; ')} | ${x.national_name} | ${x.member_numbers.join('; ')} |`), '',
  'Alle par, ID-intersektioner, afvigere og flertydige navne står i JSON. ID-intersektion er en kontrol, ikke et uafhængigt identitetsbevis. Member_number er bevaret råt, også bindestregstypen.', '',
  '## Vores side', '',
  `GSB-side kan udledes for **${resolved.length}/${youth.length} holdkampe (${ourSide.resolved_match_percent} %)** og **${resolvedRows.length}/${rowChecks.length} individuelle rækker (${ourSide.resolved_row_percent} %)**.`, '',
  '| Årsag | Holdkampe | Individuelle rækker |', '|---|---:|---:|',
  ...ourSide.reason_counts.map(r => `| ${r.reason} | ${r.matches} | ${r.rows} |`), '',
  'Metoden slår gsb_team_id op i teams, kræver club_id=1093 samt samme sæson og pulje, og matcher derefter holdets eksakte navn mod home_name_raw/away_name_raw. individual_match_players.side giver spillersiden. Der bruges ingen spillernavneliste.', '',
  ourSide.purely_numeric_side, '', ourSide.product_limit, '',
  'Uafklarede holdkampe:', '',
  ...youth.filter(m => m.side === 'ukendt').map(m => `- ${m.external_match_id}: ${m.reason}; status=${m.status}; hjemme=${JSON.stringify(m.home_name_raw)}, ude=${JSON.stringify(m.away_name_raw)}.`), '',
  '## Navnekonflikter og manglende stamdata', '',
  `Konfliktlisten har ${conflicts.length} rækker og ligger i \`164-navnekonflikter.csv\`. Numeriske IDer med samme navn er uafklarede: de kan være navnebrødre eller dublerede profiler. Samme ID med flere navne og dokumenterede aliaser listes separat.`, '',
  `Modstridende køn: ${summary.gender_conflicts}; dokumenterede fødselsår: ${summary.birth_year_known}. Begge kønsværdier bevares ved konflikt; feltet er ukendt. Aldersgrupper er kampkontekst. Aktiv betyder observeret GSB-kampdeltagelse; manglende observation er ukendt. Trupmedlemskab står separat.`, '',
  '## Anbefalet struktur og vedligeholdelse (vurdering)', '',
  '```json', JSON.stringify(recommendation, null, 2), '```', '',
  'Vurdering: felter, identifikatorernes namespaces, kandidatstatus, konfliktregler og ansvar er konkrete nok til et senere bygge-kort. Afklaringerne i prerequisites skal løses før usikre koblinger bekræftes.', '',
  '## Alle målte totaler og værn', '',
  'Denne JSON-blok gengiver rapportens totale optællinger direkte fra samme objekt som .json-filen. Detailtal pr. person/kamp og alle sammenligningspar står i .json/.csv.', '',
  '```json', JSON.stringify(quantitative, null, 2), '```', '',
  'Netværkskald: **0**. Databaser: mode=ro og PRAGMA query_only=ON. SHA-256 før/efter matcher HASHES.txt for alle fem databaser. Ingen git-mutationer eller databaseændringer.', '',
];
// Komplet tabel: alle personfelter/tal er også læsbare i Markdown (rå evidens ligger i JSON).
md.push('## Stamdatatabel pr. person', '', '| Personnøgle | Kanonisk navn | Alias | Rangliste-ID | National-ID | Normalized-IDer | Klub | Køn | Fødselsår | Aldersgruppe (sæson:ID) | Aktiv 2025/26 | Aktiv 2026/27 | Trup 2026/27 | Klasse |', '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
const cell = v => String(Array.isArray(v) ? v.join('; ') || 'ukendt' : v).replaceAll('|', '\\|').replaceAll('\n', ' ');
const activityCell = a => a.value + (a.identity_unresolved ? ' (identitet uafklaret)' : '');
for (const p of people) md.push('| ' + [p.person_key, p.canonical_name, p.aliases, p.ranking_playerid, p.national_player_id, p.normalized_db_ids, p.ranking_clubs, p.gender, p.birth_year, p.age_groups, activityCell(p.active['2025/26']), activityCell(p.active['2026/27']), p.active['2026/27'].roster_member, p.class].map(cell).join(' | ') + ' |');
md.push('');
fs.writeFileSync(out('164-stamdata.md'), md.join('\n'), 'utf8');
// Genåbn alle output og verificér de centrale optællinger før statusmelding.
const reopened = JSON.parse(fs.readFileSync(out('164-stamdata.json'), 'utf8'));
const reopenedMd = fs.readFileSync(out('164-stamdata.md'), 'utf8');
assert.deepEqual(reopened.summary, summary); assert(reopenedMd.includes(JSON.stringify(quantitative, null, 2)));
assert.equal(fs.readFileSync(out('164-navnekonflikter.csv'), 'utf8').split('\n').length - 2, conflicts.length);
assert.equal(fs.readFileSync(out('164-stamdata.csv'), 'utf8').split('\n').length - 2, people.length);
console.log(JSON.stringify({ person_records: summary.person_records, classes, id_comparison: conciseComparison, our_side: conciseSide, conflicts: conflicts.length, gender_conflicts: summary.gender_conflicts, network_calls: 0, hash_guard_exit_code: 0 }, null, 2));
