import fs from 'node:fs';

const endpoint = 'https://app.nembadminton.dk/graphql';
const calls = [];

async function gql(label, query) {
  const retrievedAt = new Date().toISOString();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const body = await response.json();
  const result = { label, retrievedAt, httpStatus: response.status, query, body };
  calls.push(result);
  return result;
}

const quote = (value) => String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"');
const fightInputs = [
  { season: 2010, clubId: 1093, ageGroupId: 1, leagueGroupId: 417, clubName: 'Gladsaxe Søborg 1' },
  { season: 2025, clubId: 1093, ageGroupId: 2, leagueGroupId: 17963, clubName: 'Gladsaxe Søborg 2' },
];

for (const input of fightInputs) {
  const query = `query { badmintonPlayerTeamFights(input:{clubId:${input.clubId},season:${input.season},ageGroupId:${input.ageGroupId},leagueGroupId:${input.leagueGroupId},clubName:"${quote(input.clubName)}"}){matchId round roundDate gameTime teams} }`;
  await gql(`teamFights-${input.season}-${input.leagueGroupId}`, query);
}

for (const [season, matchId] of [[2010, 23219], [2020, 388606], [2025, 487423]]) {
  const query = `query { badmintonPlayerTeamMatch(input:{leagueMatchId:${matchId},season:${season}}){home{name} guest{name}} }`;
  await gql(`teamMatch-${season}-${matchId}`, query);
}

const schemaQuery = `query { __schema { queryType { fields { name type { kind name ofType { kind name ofType { kind name } } } } } } importTeamMatch: __type(name:"ImportTeamMatch") { name fields { name type { kind name ofType { kind name ofType { kind name } } } } } importTeam: __type(name:"ImportTeam") { name fields { name type { kind name ofType { kind name ofType { kind name } } } } } teamFight: __type(name:"BadmintonPlayerTeamFight") { name fields { name type { kind name ofType { kind name ofType { kind name } } } } } playerTeam: __type(name:"BadmintonPlayerTeam") { name fields { name type { kind name ofType { kind name ofType { kind name } } } } } }`;
await gql('schema-query-fields', schemaQuery);

fs.writeFileSync('results/081-opponent-identity-probe.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  endpoint,
  calls,
}, null, 2) + '\n');

const summaries = calls.map((call) => ({
  label: call.label,
  httpStatus: call.httpStatus,
  errors: call.body.errors ?? [],
  dataKeys: Object.keys(call.body.data ?? {}),
  teamsSamples: call.body.data?.badmintonPlayerTeamFights?.slice?.(0, 2)?.map((fight) => fight.teams) ?? [],
  home: call.body.data?.badmintonPlayerTeamMatch?.home?.name ?? null,
  guest: call.body.data?.badmintonPlayerTeamMatch?.guest?.name ?? null,
}));
console.log(JSON.stringify(summaries, null, 2));
