import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
const db=new DatabaseSync('data/gsb-statistik-normalized.db');
const ageGroups=db.prepare(`SELECT c.age_group_id,COUNT(*) AS competitions,
 GROUP_CONCAT(DISTINCT c.league_raw) AS league_examples,
 GROUP_CONCAT(DISTINCT t.name_raw) AS team_examples
 FROM competitions c LEFT JOIN teams t ON t.competition_id=c.competition_id
 GROUP BY c.age_group_id ORDER BY c.age_group_id`).all();
const ids=['2286','96231','2365','2396','2509'];
const overlaps=db.prepare(`SELECT tm.external_match_id,tm.season_id,tm.round_date,c.age_group_id,c.league_group_id,c.league_raw,c.name_raw,tm.home_name_raw,tm.away_name_raw
 FROM team_matches tm JOIN competitions c ON c.competition_id=tm.competition_id WHERE tm.external_match_id IN (${ids.map(()=>'?').join(',')}) ORDER BY tm.external_match_id`).all(...ids);
const out={generatedAt:new Date().toISOString(),ageGroups,overlaps}; fs.writeFileSync('results/037-id-overlap-phase-a.json',JSON.stringify(out,null,2)); console.log(JSON.stringify(out,null,2)); db.close();
