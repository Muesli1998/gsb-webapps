import { mkdir, readFile, appendFile, writeFile } from 'node:fs/promises';

const endpoint = 'https://app.nembadminton.dk/graphql';
const season = 2025;
const concurrency = 8;
const batchSize = 50;
const resultsDir = new URL('./results/', import.meta.url);
const jsonlPath = new URL('./results/club-scan-2025.jsonl', import.meta.url);
const summaryPath = new URL('./results/club-scan-2025-summary.json', import.meta.url);
const csvPath = new URL('./results/club-scan-2025.csv', import.meta.url);

const query = (clubId) => `query { badmintonPlayerTeams(input: { clubId: ${clubId}, season: ${season} }) { leagueGroupId ageGroupId name league } }`;

async function gql(q) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: q }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join(' / '));
  return json.data;
}

await mkdir(resultsDir, { recursive: true });
let clubs = (await gql('query { clubs { id name1 badmintonPlayerId initialized } }')).clubs ?? [];
clubs = clubs.filter((c) => Number.isInteger(Number(c.id)) && Number(c.id) > 0);

let done = new Set();
try {
  const old = await readFile(jsonlPath, 'utf8');
  for (const line of old.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try { done.add(String(JSON.parse(line).clubId)); } catch {}
  }
} catch {}

const pending = clubs.filter((c) => !done.has(String(c.id)));
let completed = done.size;
let cursor = 0;

async function worker() {
  while (true) {
    const club = pending[cursor++];
    if (!club) return;
    const result = { season, clubId: Number(club.id), name: club.name1, badmintonPlayerId: club.badmintonPlayerId, initialized: club.initialized, status: 'ok', teams: [] };
    try {
      result.teams = (await gql(query(Number(club.id)))).badmintonPlayerTeams ?? [];
    } catch (error) {
      result.status = 'error';
      result.error = String(error.message || error);
    }
    await appendFile(jsonlPath, JSON.stringify(result) + '\n');
    completed++;
    if (completed % batchSize === 0 || completed === clubs.length) {
      await writeFile(summaryPath, JSON.stringify({ season, totalClubs: clubs.length, completed, remaining: clubs.length - completed, updatedAt: new Date().toISOString() }, null, 2) + '\n');
      console.log(JSON.stringify({ completed, total: clubs.length, remaining: clubs.length - completed }));
    }
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));

const lines = (await readFile(jsonlPath, 'utf8')).trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const csv = ['clubId,name,badmintonPlayerId,initialized,status,teamCount,error', ...lines.map((r) => [r.clubId, r.name, r.badmintonPlayerId, r.initialized, r.status, r.teams?.length ?? 0, r.error ?? ''].map((v) => `"${String(v).replaceAll('"', '""')}"`).join(','))].join('\n') + '\n';
await writeFile(csvPath, csv);
await writeFile(summaryPath, JSON.stringify({ season, totalClubs: clubs.length, completed: lines.length, ok: lines.filter((r) => r.status === 'ok').length, errors: lines.filter((r) => r.status !== 'ok').length, clubsWithTeams: lines.filter((r) => r.teams?.length).length, totalTeamRows: lines.reduce((n, r) => n + (r.teams?.length ?? 0), 0), updatedAt: new Date().toISOString() }, null, 2) + '\n');
console.log(JSON.stringify({ complete: true, clubs: lines.length }));
