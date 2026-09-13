import { readFile, writeFile } from 'node:fs/promises';
const index = JSON.parse(await readFile(new URL('../results/gsb-api-error-fallback-index.json', import.meta.url), 'utf8'));
const out = index.results.map(x => ({
  key: `${x.season}:${x.matchId}`,
  season: x.season, matchId: x.matchId, teamName: x.teamName, opponent: x.opponent,
  ageGroupId: x.ageGroupId, leagueGroupId: x.leagueGroupId, roundDate: x.roundDate,
  url: x.badmintonPlayerUrl, status: 'pending', resultFile: `results/browser-fallback/${x.season}-${x.matchId}.json`
}));
await writeFile(new URL('../results/browser-fallback-queue.json', import.meta.url), JSON.stringify({generatedAt:new Date().toISOString(), total:out.length, results:out}, null, 2));
console.log(JSON.stringify({ total: out.length, pending: out.length, output: 'results/browser-fallback-queue.json' }, null, 2));
