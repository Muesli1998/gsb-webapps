import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const endpoint = 'https://app.nembadminton.dk/graphql';
const outDir = process.env.OUT_DIR || 'statistik/results/155-raa-svar';
const delayMs = 2200;
const calls = [];
let previousStart = 0;

const waitForSpacing = async () => {
  const remaining = delayMs - (Date.now() - previousStart);
  if (previousStart && remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
};

async function gql(label, query) {
  await waitForSpacing();
  previousStart = Date.now();
  const retrievedAt = new Date().toISOString();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ query }),
    redirect: 'follow',
  });
  const bytes = Buffer.from(await response.arrayBuffer());
  const text = bytes.toString('utf8');
  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
  const captchaOrBot = /captcha|verify you are human|unusual traffic|access denied|bot detection/i.test(text);
  const record = { label, retrievedAt, url: endpoint, query, httpStatus: response.status, contentType: response.headers.get('content-type'), responseBytes: bytes.length, sha256, captchaOrBot, bodyText: text };
  calls.push(record);
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(`${outDir}/${String(calls.length).padStart(3, '0')}-${label}.json`, `${JSON.stringify(record, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ label, status: response.status, bytes: bytes.length, sha256, captchaOrBot }));
  if (captchaOrBot) throw new Error('Stop: bot-/CAPTCHA-response observeret; ingen yderligere kald.');
  if (!response.ok) throw new Error(`Stop: HTTP ${response.status}; ingen yderligere kald.`);
  let body;
  try { body = JSON.parse(text); } catch { throw new Error('Stop: svar var ikke JSON; ingen yderligere kald.'); }
  if (body.errors?.length) throw new Error(`Stop: GraphQL-fejl: ${body.errors.map((e) => e.message).join(' / ')}`);
  return body;
}

const quote = (value) => String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"');
const summary = { startedAt: new Date().toISOString(), endpoint, season: 2026, clubId: 1093, calls: [] };
try {
  const teamsQuery = 'query { badmintonPlayerTeams(input:{clubId:1093,season:2026}){leagueGroupId ageGroupId name league} }';
  const teamsBody = await gql('teams-2026', teamsQuery);
  summary.calls.push({ label: 'teams-2026', data: teamsBody.data });
  const teams = teamsBody.data?.badmintonPlayerTeams ?? [];
  const team = teams.find((row) => String(row.ageGroupId) === '5' && !/UGE\s*38/i.test(row.league ?? ''));
  if (!team) throw new Error('Stop: API-listen returnerede ikke en U15-pulje; ingen yderligere kald.');
  summary.selectedTeam = team;

  const fightsQuery = `query { badmintonPlayerTeamFights(input:{clubId:1093,season:2026,ageGroupId:${team.ageGroupId},leagueGroupId:${team.leagueGroupId},clubName:"${quote(team.name)}"}){matchId round roundDate gameTime teams} }`;
  const fightsBody = await gql(`fights-${team.leagueGroupId}`, fightsQuery);
  const fights = fightsBody.data?.badmintonPlayerTeamFights ?? [];
  summary.calls.push({ label: `fights-${team.leagueGroupId}`, count: fights.length, data: fights });
  const match = fights.find((row) => String(row.matchId) === '509892') ?? fights[0];
  if (!match) throw new Error('Stop: ingen kamp i valgt pulje matchede kendt spillet kamp 509892 eller datoen; ingen yderligere kald.');
  summary.selectedMatch = match;

  const matchQuery = `query { badmintonPlayerTeamMatch(input:{leagueMatchId:${match.matchId},season:2026}){home{name squad{categories{name category results{homePoints guestPoints} players{name}}}} guest{name squad{categories{name category results{homePoints guestPoints} players{name}}}}} }`;
  const detailBody = await gql(`match-${match.matchId}`, matchQuery);
  summary.calls.push({ label: `match-${match.matchId}`, data: detailBody.data });
} catch (error) {
  summary.stopReason = String(error.message || error);
} finally {
  summary.completedAt = new Date().toISOString();
  summary.requestCount = calls.length;
  summary.httpLog = calls.map(({ label, retrievedAt, httpStatus, contentType, responseBytes, sha256, captchaOrBot }) => ({ label, retrievedAt, httpStatus, contentType, responseBytes, sha256, captchaOrBot }));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(`${outDir}/index.json`, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  if (summary.stopReason) console.error(summary.stopReason);
}
