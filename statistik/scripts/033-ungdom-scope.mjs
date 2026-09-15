import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const youth = [2, 3, 4, 5];
const ph = youth.map(() => '?').join(',');
const q = (sql, params = []) => db.prepare(sql).all(...params);
const one = (sql, params = []) => db.prepare(sql).get(...params);

const totals = one(`SELECT COUNT(DISTINCT tm.team_match_id) AS matches,
  COUNT(DISTINCT CASE WHEN EXISTS (SELECT 1 FROM individual_matches im WHERE im.team_match_id=tm.team_match_id) THEN tm.team_match_id END) AS with_individuals,
  COUNT(DISTINCT CASE WHEN NOT EXISTS (SELECT 1 FROM individual_matches im WHERE im.team_match_id=tm.team_match_id) THEN tm.team_match_id END) AS without_individuals
  FROM team_matches tm JOIN competitions c ON c.competition_id=tm.competition_id
  WHERE c.age_group_id IN (${ph})`, youth);
const bySeasonAge = q(`SELECT tm.season_id, c.age_group_id, COUNT(DISTINCT tm.team_match_id) matches,
  COUNT(DISTINCT CASE WHEN EXISTS (SELECT 1 FROM individual_matches im WHERE im.team_match_id=tm.team_match_id) THEN tm.team_match_id END) with_individuals,
  COUNT(DISTINCT CASE WHEN NOT EXISTS (SELECT 1 FROM individual_matches im WHERE im.team_match_id=tm.team_match_id) THEN tm.team_match_id END) without_individuals
  FROM team_matches tm JOIN competitions c ON c.competition_id=tm.competition_id
  WHERE c.age_group_id IN (${ph}) GROUP BY tm.season_id,c.age_group_id ORDER BY tm.season_id,c.age_group_id`, youth);
const statuses = q(`SELECT tm.status, COUNT(DISTINCT tm.team_match_id) matches FROM team_matches tm JOIN competitions c ON c.competition_id=tm.competition_id WHERE c.age_group_id IN (${ph}) GROUP BY tm.status ORDER BY tm.status`, youth);
const playerIds = one(`SELECT COUNT(*) relations, COUNT(CASE WHEN p.external_player_id IS NOT NULL THEN 1 END) with_external_id, COUNT(CASE WHEN p.external_player_id IS NULL THEN 1 END) without_external_id FROM individual_match_players imp JOIN players p ON p.player_id=imp.player_id JOIN individual_matches im ON im.individual_match_id=imp.individual_match_id JOIN team_matches tm ON tm.team_match_id=im.team_match_id JOIN competitions c ON c.competition_id=tm.competition_id WHERE c.age_group_id IN (${ph})`, youth);
const standing = q(`SELECT c.season_id,c.age_group_id,COUNT(DISTINCT s.competition_id) competitions,COUNT(*) rows FROM standings s JOIN competitions c ON c.competition_id=s.competition_id WHERE c.age_group_id IN (${ph}) GROUP BY c.season_id,c.age_group_id ORDER BY c.season_id,c.age_group_id`, youth);
const payloadYouth = one(`SELECT COUNT(*) payloads FROM raw_payloads r WHERE EXISTS (SELECT 1 FROM team_matches tm JOIN competitions c ON c.competition_id=tm.competition_id WHERE tm.raw_payload_id=r.raw_payload_id AND c.age_group_id IN (${ph}))`, youth);
const out = { generatedAt:new Date().toISOString(), youthAgeGroupIds:youth, totals, bySeasonAge, statuses, playerIds, standing, payloadYouth };
fs.writeFileSync('results/033-ungdom-scope-maaling.json', JSON.stringify(out,null,2));
console.log(JSON.stringify(out,null,2));
db.close();
