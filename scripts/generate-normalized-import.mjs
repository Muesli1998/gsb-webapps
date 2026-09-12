import { readFile, writeFile } from 'node:fs/promises';

const esc = (v) => `'${String(v ?? '').replaceAll("'", "''")}'`;
const num = (v) => v === null || v === undefined || v === '' ? 'NULL' : String(Number(v));
const lines = (path) => readFile(new URL(path, import.meta.url), 'utf8').then(s => s.split(/\r?\n/).filter(Boolean).map(JSON.parse));
const seasons = await lines('../results/gsb-historical-2025-2000.jsonl');
const details = await lines('../results/gsb-match-details-all-dedup.jsonl');
const byMatch = new Map(details.map(x => [String(x.matchId), x]));
const sql = [await readFile(new URL('../sql/schema-normalized.sql', import.meta.url), 'utf8'), 'BEGIN;'];
const seenComp = new Map();
const seenTeam = new Map();
const seenClub = new Set();
const seenPlayer = new Map();
const push = (s) => sql.push(s);

push(`INSERT OR IGNORE INTO clubs(club_id,name_raw,name_normalized) VALUES (1093,'Gladsaxe Søborg','Gladsaxe Søborg');`);
for (const row of seasons) {
  const season = Number(row.season);
  push(`INSERT OR IGNORE INTO seasons(season_id,label) VALUES (${season},${esc(`${season}/${season + 1}`)});`);
  for (const t of (row.teams ?? [])) {
    const compKey = `${season}|${t.leagueGroupId}|${t.ageGroupId}`;
    if (!seenComp.has(compKey)) {
      seenComp.set(compKey, true);
      push(`INSERT OR IGNORE INTO competitions(season_id,league_group_id,age_group_id,name_raw,league_raw) VALUES (${season},${esc(t.leagueGroupId)},${num(t.ageGroupId)},${esc(t.name)},${esc(t.league)});`);
    }
    const teamKey = `${season}|${compKey}|${t.name}`;
    if (!seenTeam.has(teamKey)) {
      seenTeam.set(teamKey, true);
      push(`INSERT OR IGNORE INTO teams(club_id,season_id,competition_id,name_raw) SELECT 1093,${season},competition_id,${esc(t.name)} FROM competitions WHERE season_id=${season} AND league_group_id=${esc(t.leagueGroupId)} AND age_group_id=${num(t.ageGroupId)};`);
    }
  }
  for (const m of (row.matches ?? [])) {
    const id = String(m.matchId); const d = byMatch.get(id);
    const rawKey = `match:${season}:${id}`;
    push(`INSERT OR IGNORE INTO raw_payloads(external_key,source_system,endpoint_or_url,retrieved_at,payload_json) VALUES (${esc(rawKey)},'nembadminton_graphql','badmintonPlayerTeamMatch',CURRENT_TIMESTAMP,${esc(JSON.stringify(d ?? m))});`);
    const status = d?.status === 'ok' ? 'complete' : d?.error?.includes('players') ? 'missing_players' : 'api_error';
    const home = d?.home?.name ?? null; const away = d?.guest?.name ?? null;
    push(`INSERT OR IGNORE INTO team_matches(external_match_id,season_id,competition_id,gsb_team_id,round_number,round_date,game_time,home_name_raw,away_name_raw,status,source_status,raw_payload_id) SELECT ${esc(id)},${season},competitions.competition_id,teams.team_id,${num(m.round)},${esc(m.roundDate)},${esc(m.gameTime)},${esc(home)},${esc(away)},${esc(status)},${esc(d?.status ?? 'discovery')},raw_payloads.raw_payload_id FROM competitions JOIN teams ON teams.competition_id=competitions.competition_id LEFT JOIN raw_payloads ON raw_payloads.external_key=${esc(rawKey)} WHERE competitions.season_id=${season} AND competitions.league_group_id=${esc(m.leagueGroupId)} AND competitions.age_group_id=${num(m.ageGroupId)} AND teams.name_raw=${esc(m.teamName)};`);
    if (d?.status === 'ok') {
      const homeCats = d.home?.squad?.categories ?? [];
      const awayCats = d.guest?.squad?.categories ?? [];
      const cats = [...new Map([...homeCats, ...awayCats].map(c => [c.name, c])).values()];
      for (const c of cats) {
        const scores = (c.results ?? []).map(r => `${r.homePoints ?? ''}-${r.guestPoints ?? ''}`).join(' ');
        push(`INSERT INTO individual_matches(team_match_id,discipline_raw,game_number_raw,category_raw,home_score_raw,away_score_raw,status) SELECT team_match_id,${esc(c.category)},${esc(c.name)},${esc(c.name)},${esc(scores)},${esc(scores)},'complete' FROM team_matches WHERE external_match_id=${esc(id)};`);
        for (const side of ['home','away']) {
          const sc = side === 'home' ? homeCats.find(x => x.name === c.name) : awayCats.find(x => x.name === c.name);
          for (let i = 0; i < (sc?.players ?? []).length; i++) {
            const name = sc.players[i]?.name; if (!name) continue;
            const key = `name:${name.trim().toLowerCase()}`;
            if (!seenPlayer.has(key)) { seenPlayer.set(key, true); push(`INSERT OR IGNORE INTO players(external_player_id,name_raw,name_normalized) VALUES (${esc(key)},${esc(name)},${esc(name.trim().toLowerCase())});`); }
            push(`INSERT OR IGNORE INTO individual_match_players(individual_match_id,player_id,side,pair_number,role) SELECT individual_match_id,player_id,${esc(side)},1,${esc(i === 0 ? 'primary' : 'partner')} FROM individual_matches JOIN players ON players.external_player_id=${esc(key)} WHERE team_match_id=(SELECT team_match_id FROM team_matches WHERE external_match_id=${esc(id)}) AND game_number_raw=${esc(c.name)};`);
          }
        }
      }
    } else {
      push(`INSERT INTO extraction_errors(source_system,season_id,external_match_id,team_name_raw,error_type,error_message,retrieved_at) VALUES ('nembadminton_graphql',${season},${esc(id)},${esc(m.teamName)},${esc(status)},${esc(d?.error ?? 'No detail response')},CURRENT_TIMESTAMP);`);
    }
  }
}
// Verified browser standings snapshots; import every row while preserving source URL/provenance.
for (const file of ['../results/browser-standing-2025-17922.json','../results/browser-standing-2026-18861.json']) {
  try {
    const s = JSON.parse(await readFile(new URL(file, import.meta.url), 'utf8'));
    for (const r of (s.rows ?? [])) push(`INSERT OR IGNORE INTO standings(competition_id,team_name_raw,snapshot_date,snapshot_type,position,matches_played,wins,draws,losses,score_raw,sets_raw,points,set_points,source_url) SELECT competition_id,${esc(r[1])},${esc(s.verifiedAt)},'final',${num(r[0])},${num(r[2])},${num(r[3])},NULL,${num(r[2] - r[3])},${esc(r[4])},${esc(r[5])},${num(r[6])},${num(r[7])},${esc(`https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/${s.urlHash}`)} FROM competitions WHERE season_id=${num(s.season)} AND league_group_id=${esc(s.groupId)};`);
  } catch {}
}
push('COMMIT;');
await writeFile(new URL('../sql/normalized-import.sql', import.meta.url), sql.join('\n'));
console.log(JSON.stringify({ seasons: seasons.length, competitions: seenComp.size, teams: seenTeam.size, details: details.length, statements: sql.length }, null, 2));
