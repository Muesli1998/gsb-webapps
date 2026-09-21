import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const root = 'https://badmintonplayer.dk';
const api = `${root}/api`;
const pages = {
  holdturnering: `${root}/DBF/HoldTurnering/Stilling/`,
  turnering: `${root}/DBF/Turnering/VisResultater/#115342,`,
  spiller: `${root}/DBF/Spiller/VisSpiller/#84737,2026`,
  ranglister: `${root}/DBF/Ranglister/`,
  saesonplan: `${root}/DBF/Turnering/SaesonPlan/`,
};

const responseSummary = async (url) => {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  const text = await response.text();
  return {
    url,
    status: response.status,
    contentType: response.headers.get('content-type'),
    length: text.length,
    sha256: crypto.createHash('sha256').update(text).digest('hex'),
    bodyPrefix: text.slice(0, 600),
  };
};

const pageAssets = {};
for (const [name, url] of Object.entries(pages)) {
  const text = await (await fetch(url)).text();
  pageAssets[name] = {
    url,
    length: text.length,
    scripts: [...text.matchAll(/<script[^>]+src=["']([^"']+)/gi)].map((m) => m[1]),
  };
}

const v2Url = `${root}/DBF/v2-app.js`;
const v2 = await (await fetch(v2Url)).text();
const routeMethods = new Map();
const routeRe = /key:"([^"]+)",value:function\s+([^(]+)\([^)]*\)\{[^]{0,700}?url_=this\.baseUrl\+"([^"]+)"/g;
for (const match of v2.matchAll(routeRe)) {
  const [, exportedName, methodName, route] = match;
  if (!routeMethods.has(route)) routeMethods.set(route, []);
  routeMethods.get(route).push(`${exportedName}/${methodName}`);
}

const tests = [
  '/Seasons',
  '/Seasons/current',
  '/AgeGroup/Get',
  '/Region',
  '/GeoRegion/Get',
  '/RangkingListVersion?seasonId=2026',
  '/RangkingListVersion/id?rankingListVersionId=264866',
  '/versionDate?date=2026-09-01T00:00:00.000Z',
  '/versionDate?date=2025-09-01T00:00:00.000Z',
  '/Tournament',
  '/TournamentClass?tournamentClassId=115342',
  '/Tournament/id?tournamentClassId=115342',
  '/Tournament/info?tournamentClassId=115342',
  '/Tournament?tournamentClass=115342&tournamentEventId=490920',
  '/TournamentEventMatch/metadata',
  '/TournamentEventMatch?tournamentId=17558&start=0&take=10&pageType=0',
  '/TournamentLinks?tournamentClassId=115342',
  '/Players/84737',
];

const testsOut = [];
for (const path of tests) testsOut.push(await responseSummary(`${api}${path}`));

const output = {
  generatedAt: new Date().toISOString(),
  pages: pageAssets,
  v2App: {
    url: v2Url,
    length: v2.length,
    routeCount: routeMethods.size,
    routes: [...routeMethods.entries()].sort(([a], [b]) => a.localeCompare(b))
      .map(([route, methods]) => ({ route, methods: [...new Set(methods)] })),
  },
  tests: testsOut,
};

await fs.writeFile('statistik/results/082-api-overflade-probe.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({
  pages: Object.fromEntries(Object.entries(pageAssets).map(([k, v]) => [k, v.scripts.length])),
  routeCount: output.v2App.routeCount,
  tests: testsOut.map(({ url, status, length }) => ({ url, status, length })),
}, null, 2));
