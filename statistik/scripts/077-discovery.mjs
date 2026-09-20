import fs from 'node:fs';

const endpoint = 'https://app.nembadminton.dk/graphql';
const out = 'results/077-discovery.jsonl';
const seasons = Array.from({ length: 16 }, (_, index) => 2010 + index);
const clubId = 1093;

const gql = async (query) => {
  const retrievedAt = new Date().toISOString();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (body.errors?.length) throw new Error(body.errors.map((error) => error.message).join(' / '));
  return { retrievedAt, query, body };
};
const quote = (value) => String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"');
const teamsQuery = (season) => `query { badmintonPlayerTeams(input:{clubId:${clubId},season:${season}}){leagueGroupId ageGroupId name league} }`;
const fightsQuery = (season, team) => `query { badmintonPlayerTeamFights(input:{clubId:${clubId},season:${season},ageGroupId:${team.ageGroupId},leagueGroupId:${team.leagueGroupId},clubName:"${quote(team.name)}"}){matchId round roundDate gameTime teams} }`;

fs.writeFileSync(out, '');
for (const season of seasons) {
  const seasonResult = { season, source: endpoint, status: 'ok', teams: null, groups: [], errors: [] };
  try {
    seasonResult.teams = await gql(teamsQuery(season));
    const teams = seasonResult.teams.body.data?.badmintonPlayerTeams ?? [];
    const groups = [...new Map(teams.map((team) => [`${team.ageGroupId}|${team.leagueGroupId}|${team.name}`, team])).values()];
    for (const team of groups) {
      const group = { input: team, status: 'ok', fights: null };
      try { group.fights = await gql(fightsQuery(season, team)); }
      catch (error) { group.status = 'error'; group.error = String(error.message || error); seasonResult.errors.push({ team, error: group.error }); }
      seasonResult.groups.push(group);
    }
  } catch (error) {
    seasonResult.status = 'error';
    seasonResult.errors.push({ error: String(error.message || error) });
  }
  fs.appendFileSync(out, JSON.stringify(seasonResult) + '\n');
  console.log(`${season}: ${seasonResult.teams?.body?.data?.badmintonPlayerTeams?.length ?? 0} team rows, ${seasonResult.groups.length} groups, ${seasonResult.errors.length} errors`);
}
