import {writeFile} from 'node:fs/promises';

const pageUrl = 'https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/#1,2026,,1,1,,,,';
const service = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/';

const pageResponse = await fetch(pageUrl);
const pageHtml = await pageResponse.text();
const contextMatch = pageHtml.match(/var SR_CallbackContext = '([^']+)'/);
if (!contextMatch) throw new Error('SR_CallbackContext was not found');
const callbackcontextkey = contextMatch[1];

async function call(method, body) {
  const response = await fetch(service + method, {
    method: 'POST',
    headers: {'content-type': 'application/json; charset=utf-8'},
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let json;
  try { json = JSON.parse(text); } catch { json = null; }
  return {
    method,
    http: response.status,
    request: body,
    response: json ?? text,
  };
}

const searchCases = [
  {name: '2026-region-1', seasonid: 2026, regionids: '1'},
  {name: '2026-region-8', seasonid: 2026, regionids: '8'},
  {name: '2025-region-1', seasonid: 2025, regionids: '1'},
];
const searchResults = [];
for (const test of searchCases) {
  const result = await call('SearchTournamentClass', {
    callbackcontextkey,
    selectfunction: 'SelectTournamentClass',
    seasonid: test.seasonid,
    agegroupid: 1,
    classid: 0,
    clubid: 0,
    fromdatestring: '',
    todatestring: '',
    selectopenonly: false,
    regionids: test.regionids,
    adminclubid: 0,
  });
  searchResults.push({...test, ...result});
}

const standingCases = [
  {name: '2026-region-1', subPage: 1, seasonID: 2026, leagueGroupID: null, ageGroupID: 1, regionID: 1},
  {name: '2026-region-8', subPage: 1, seasonID: 2026, leagueGroupID: null, ageGroupID: 1, regionID: 8},
  {name: '2025-region-1', subPage: 1, seasonID: 2025, leagueGroupID: null, ageGroupID: 1, regionID: 1},
];
const standingResults = [];
for (const test of standingCases) {
  const result = await call('GetLeagueStanding', {
    callbackcontextkey,
    subPage: test.subPage,
    seasonID: test.seasonID,
    leagueGroupID: test.leagueGroupID,
    ageGroupID: test.ageGroupID,
    regionID: test.regionID,
    leagueGroupTeamID: null,
    leagueMatchID: null,
    clubID: null,
    playerID: null,
  });
  standingResults.push({...test, ...result});
}

const redact = value => {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      key === 'callbackcontextkey' ? '<redacted>' : redact(item),
    ]));
  }
  return value;
};
const output = {
  pageUrl,
  pageHttp: pageResponse.status,
  callbackContextLength: callbackcontextkey.length,
  searchTournamentClass: redact(searchResults),
  getLeagueStanding: redact(standingResults),
};
await writeFile('statistik/results/081-route-probe.json', JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify(output, null, 2));
