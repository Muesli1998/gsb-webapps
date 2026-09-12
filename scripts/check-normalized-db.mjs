import { DatabaseSync } from 'node:sqlite';
const db=new DatabaseSync('data/gsb-statistik-normalized.db');
console.log('fk',db.prepare('PRAGMA foreign_key_check').all());
console.log('dupes',db.prepare('SELECT external_match_id,COUNT(*) n FROM team_matches GROUP BY external_match_id HAVING n>1').all());
console.log('status',db.prepare('SELECT status,COUNT(*) n FROM team_matches GROUP BY status').all());
console.log('standings',db.prepare('SELECT season_id,league_group_id,COUNT(*) n FROM standings s JOIN competitions c USING(competition_id) GROUP BY season_id,league_group_id').all());
console.log('players',db.prepare('SELECT COUNT(DISTINCT player_id) n, COUNT(*) rel FROM individual_match_players').get());
db.close();
