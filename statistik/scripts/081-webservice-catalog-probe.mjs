import {writeFile} from 'node:fs/promises';

const service = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/';
const pageUrls = [
  'https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/#1,2026,,1,1,,,,',
  'https://badmintonplayer.dk/DBF/Turnering/VisResultater/#115342',
  'https://badmintonplayer.dk/DBF/Spiller/VisSpiller/#84737,2026',
  'https://badmintonplayer.dk/DBF/Ranglister/#288',
];

async function get(url) {
  const response = await fetch(url);
  return {url, http: response.status, contentType: response.headers.get('content-type'), text: await response.text()};
}

async function post(method, body) {
  const response = await fetch(service + method, {
    method: 'POST',
    headers: {'content-type': 'application/json; charset=utf-8'},
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let responseBody;
  try { responseBody = JSON.parse(text); } catch { responseBody = text; }
  return {method, http: response.status, request: body, response: responseBody};
}

const wsdl = await get(service.slice(0, -1) + '?WSDL');
const proxy = await get(service.slice(0, -1) + '/js');
const methodPattern = /([A-Za-z_$][A-Za-z0-9_$]*):function\(([^)]*)\)/g;
const methods = [];
for (const match of proxy.text.matchAll(methodPattern)) {
  if (match[1] !== '_get_path') methods.push({name: match[1], signature: match[2]});
}

const pages = [];
const asmxRefs = new Set();
for (const pageUrl of pageUrls) {
  const page = await get(pageUrl);
  const scripts = [...page.text.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => new URL(m[1], pageUrl).href);
  const texts = [page.text];
  for (const scriptUrl of scripts) {
    try { texts.push((await get(scriptUrl)).text); } catch {}
  }
  for (const text of texts) {
    for (const match of text.matchAll(/https?:\/\/[^"'\s]+\.asmx(?:\/[^"'\s]*)?|[^"'\s<>]+\.asmx(?:\/[^"'\s]*)?/gi)) {
      asmxRefs.add(match[0]);
    }
  }
  const context = page.text.match(/var SR_CallbackContext = ['"]([^'"]+)['"]/);
  pages.push({url: pageUrl, http: page.http, htmlLength: page.text.length, callbackContextLength: context?.[1]?.length ?? null, scriptCount: scripts.length});
}

const standingContext = (await get(pageUrls[0])).text.match(/var SR_CallbackContext = ['"]([^'"]+)['"]/)[1];
const tournamentContext = (await get(pageUrls[1])).text.match(/var SR_CallbackContext = ['"]([^'"]+)['"]/)[1];

const probes = [];
probes.push(await post('SearchClub', {callbackcontextkey: standingContext, name: 'Gladsaxe', selectfunction: 'SelectClub', includeteams: true}));
probes.push(await post('SearchClubInfo', {callbackcontextkey: standingContext, clubid: 1093, regionid: 0, postalcode1: '', postalcode2: '', city: '', bodyonly: false, clubtype: 0, categorylist: '', pageno: 0}));
probes.push(await post('GetLeagueStanding', {callbackcontextkey: standingContext, subPage: 2, seasonID: 2026, leagueGroupID: 18894, ageGroupID: 1, regionID: 8, leagueGroupTeamID: null, leagueMatchID: null, clubID: null, playerID: null}));
probes.push(await post('GetSeasonPlan', {callbackcontextkey: standingContext, seasonid: 2026, regionids: '1', agegroupids: '1', classids: '', strfrom: '', strto: '', strweekno: '', strweekno2: '', georegionids: '', clubid: 0, disciplines: '', playerid: 0, birthdate: '', age: 0, points: 0, gender: 0, publicseasonplan: true, showleague: true, selectclientfunction: '', page: 1}));
probes.push(await post('SearchTournamentClass', {callbackcontextkey: tournamentContext, selectfunction: 'SelectTournamentClass', seasonid: 2026, agegroupid: 1, classid: 0, clubid: 0, fromdatestring: '', todatestring: '', selectopenonly: false, regionids: '1', adminclubid: 0}));
probes.push(await post('GetTournamentClassInfo', {callbackcontextkey: tournamentContext, instance: '1', tournamentclassid: 115342}));
probes.push(await post('GetTournamentEvents', {callbackcontextkey: tournamentContext, selecteventfunction: '', instance: '1', tournamentclassid: 115342, playerlistselectfunction: '', selectclassfunction: '', selectopenonly: false, clubid: 0, adminclubid: 0, selecteddisciplinecode: ''}));
probes.push(await post('SearchTournamentResults', {callbackcontextkey: tournamentContext, tournamentclassid: 115342, clientselectfunction: ''}));
probes.push(await post('SearchTournamentMatches', {callbackcontextkey: tournamentContext, tournamentclassid: 115342, tournamenteventid: 490920, clubid: 0, playerid: 0, tabnumber: 0, groupnumber: 0, locationnumber: 0, clientselectfunction: ''}));

function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, key === 'callbackcontextkey' ? '<redacted>' : redact(item)]));
  return value;
}

const output = {service, wsdl: {http: wsdl.http, contentType: wsdl.contentType, bodyPrefix: wsdl.text.slice(0, 500)}, proxy: {http: proxy.http, length: proxy.text.length, methods}, pages, asmxRefs: [...asmxRefs].sort(), probes: redact(probes)};
await writeFile('statistik/results/081-webservice-catalog-probe.json', JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify({wsdl: output.wsdl, methodCount: methods.length, methods, pages, asmxRefs: output.asmxRefs, probeStatuses: probes.map(p => ({method: p.method, http: p.http}))}, null, 2));
