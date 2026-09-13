import { mkdir, appendFile, readFile, writeFile } from 'node:fs/promises';

const endpoint = 'https://app.nembadminton.dk/graphql';
const seasons = Array.from({ length: 26 }, (_, i) => 2025 - i);
const clubId = 1093;
const outDir = new URL('./results/', import.meta.url);
const gsbPath = new URL('./results/gsb-historical-2025-2000.jsonl', import.meta.url);
const ligaPath = new URL('./results/badmintonligaen-2025-2000.jsonl', import.meta.url);
const summaryPath = new URL('./results/historical-test-summary.json', import.meta.url);

async function gql(query) {
  const res = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ query }) });
  const json = await res.json();
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join(' / '));
  return json.data;
}
const teamsQ = (id, season) => `query { badmintonPlayerTeams(input:{clubId:${id},season:${season}}){leagueGroupId ageGroupId name league} }`;
const fightsQ = (season, age, group, name, id = clubId) => `query { badmintonPlayerTeamFights(input:{clubId:${id},season:${season},ageGroupId:${age},leagueGroupId:${group},clubName:"${String(name).replaceAll('"','')}"}){matchId round roundDate gameTime} }`;
const loadDone = async (path) => { try { return new Set((await readFile(path, 'utf8')).split(/\r?\n/).filter(Boolean).map((x) => JSON.parse(x)).map((x) => x.key)); } catch { return new Set(); } };
await mkdir(outDir, { recursive: true });

// GSB historical discovery: one line per season with groups and unique matches.
const gsbDone = await loadDone(gsbPath);
for (const season of seasons) {
  const key = `gsb:${season}`;
  if (gsbDone.has(key)) continue;
  const row = { key, season, status: 'ok', teams: [], groups: [], matches: [], errors: [] };
  try {
    row.teams = (await gql(teamsQ(clubId, season))).badmintonPlayerTeams ?? [];
    const uniqueGroups = new Map(row.teams.map((t) => [`${t.ageGroupId}|${t.leagueGroupId}`, t]));
    for (const t of uniqueGroups.values()) {
      const group = { ...t, fights: [], status: 'ok' };
      try { group.fights = (await gql(fightsQ(season, t.ageGroupId, t.leagueGroupId, t.name))).badmintonPlayerTeamFights ?? []; }
      catch (e) { group.status = 'error'; group.error = String(e.message || e); row.errors.push({ leagueGroupId: t.leagueGroupId, message: group.error }); }
      row.groups.push(group);
      for (const f of group.fights) row.matches.push({ ...f, ageGroupId: t.ageGroupId, leagueGroupId: t.leagueGroupId, teamName: t.name, league: t.league });
    }
    const dedup = new Map(row.matches.map((m) => [String(m.matchId), m]));
    row.matches = [...dedup.values()];
  } catch (e) { row.status = 'error'; row.errors.push({ message: String(e.message || e) }); }
  await appendFile(gsbPath, JSON.stringify(row) + '\n');
  console.log(`GSB ${season}: ${row.teams.length} teams, ${row.matches.length} matches, ${row.errors.length} errors`);
}

// Badmintonligaen sanity: discover Ligaen groups among all clubs for each season.
const clubs = (await gql('query { clubs { id name1 badmintonPlayerId initialized } }')).clubs ?? [];
const positiveClubs = clubs.filter((c) => Number(c.id) > 0);
// Følg kun klubber, der faktisk har en Ligaen-post i 2025/26. Det holder
// sanity-testen målrettet og undgår tusindvis af irrelevante historiske kald.
let ligaClubIds = new Set();
try {
  const current = (await readFile(new URL('./results/club-scan-2025.jsonl', import.meta.url), 'utf8')).split(/\r?\n/).filter(Boolean).map(JSON.parse);
  for (const r of current) if ((r.teams || []).some((t) => /ligaen/i.test(t.league || '') && !/kvalifikation|kval/i.test(t.league || ''))) ligaClubIds.add(Number(r.clubId));
} catch {}
const ligaClubs = positiveClubs.filter((c) => ligaClubIds.has(Number(c.id)));
const ligaDone = await loadDone(ligaPath);
for (const season of seasons) {
  const key = `liga:${season}`;
  if (ligaDone.has(key)) continue;
  const row = { key, season, status: 'ok', clubsChecked: ligaClubs.length, ligaTeams: [], groups: [], matches: [], errors: [] };
  for (let i = 0; i < ligaClubs.length; i += 25) {
    const batch = ligaClubs.slice(i, i + 25);
    const responses = await Promise.all(batch.map(async (c) => {
      try { return { c, teams: (await gql(teamsQ(Number(c.id), season))).badmintonPlayerTeams ?? [] }; }
      catch (e) { return { c, error: String(e.message || e) }; }
    }));
    for (const r of responses) {
      if (r.error) { row.errors.push({ clubId: r.c.id, message: r.error }); continue; }
      for (const t of r.teams) if (/ligaen/i.test(t.league || '') && !/kvalifikation|kval/i.test(t.league || '')) row.ligaTeams.push({ ...t, clubId: Number(r.c.id), clubName: r.c.name1 });
    }
    if ((i + batch.length) % 100 === 0) console.log(`Liga ${season}: checked ${i + batch.length}/${ligaClubs.length}`);
  }
  const groups = new Map(row.ligaTeams.map((t) => [`${t.clubId}|${t.ageGroupId}|${t.leagueGroupId}`, t]));
  for (const t of groups.values()) {
    const g = { ...t, fights: [], status: 'ok' };
    try { g.fights = (await gql(fightsQ(season, t.ageGroupId, t.leagueGroupId, t.name, t.clubId))).badmintonPlayerTeamFights ?? []; }
    catch (e) { g.status = 'error'; g.error = String(e.message || e); row.errors.push({ clubId: t.clubId, leagueGroupId: t.leagueGroupId, message: g.error }); }
    row.groups.push(g);
    for (const f of g.fights) row.matches.push({ ...f, clubId: t.clubId, leagueGroupId: t.leagueGroupId, league: t.league });
  }
  row.matches = [...new Map(row.matches.map((m) => [String(m.matchId), m])).values()];
  await appendFile(ligaPath, JSON.stringify(row) + '\n');
  console.log(`Liga ${season}: ${row.ligaTeams.length} teams, ${row.matches.length} matches, ${row.errors.length} errors`);
}

const readLines = async (p) => (await readFile(p, 'utf8')).split(/\r?\n/).filter(Boolean).map(JSON.parse);
const gsb = await readLines(gsbPath); const liga = await readLines(ligaPath);
await writeFile(summaryPath, JSON.stringify({ updatedAt: new Date().toISOString(), gsb: { seasons: gsb.length, seasonsWithTeams: gsb.filter((r) => r.teams.length).length, totalGroups: gsb.reduce((n, r) => n + r.groups.length, 0), totalUniqueMatches: gsb.reduce((n, r) => n + r.matches.length, 0), errors: gsb.reduce((n, r) => n + r.errors.length, 0) }, badmintonligaen: { seasons: liga.length, seasonsWithTeams: liga.filter((r) => r.ligaTeams.length).length, totalLigaTeams: liga.reduce((n, r) => n + r.ligaTeams.length, 0), totalGroups: liga.reduce((n, r) => n + r.groups.length, 0), totalUniqueMatches: liga.reduce((n, r) => n + r.matches.length, 0), errors: liga.reduce((n, r) => n + r.errors.length, 0) } }, null, 2) + '\n');
console.log('COMPLETE');
