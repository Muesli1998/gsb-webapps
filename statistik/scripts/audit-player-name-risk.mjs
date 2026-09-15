import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db', { readOnly: true });
const top = db.prepare(`
  SELECT p.player_id, p.name_raw, COUNT(DISTINCT imp.individual_match_id) AS matches,
         COUNT(DISTINCT tm.season_id) AS seasons,
         group_concat(DISTINCT tm.season_id) AS season_list,
         group_concat(DISTINCT t.name_raw) AS team_list
  FROM players p
  JOIN individual_match_players imp ON imp.player_id=p.player_id
  JOIN individual_matches im ON im.individual_match_id=imp.individual_match_id
  JOIN team_matches tm ON tm.team_match_id=im.team_match_id
  LEFT JOIN teams t ON t.team_id=tm.gsb_team_id
  WHERE p.external_player_id IS NULL
  GROUP BY p.player_id ORDER BY matches DESC, p.name_raw LIMIT 25`).all();
const duplicateNormalized = db.prepare(`SELECT name_normalized, COUNT(*) AS n
  FROM players GROUP BY name_normalized HAVING COUNT(*) > 1`).all();
console.log(JSON.stringify({ sampleSize: top.length, top, duplicateNormalized }, null, 2));
