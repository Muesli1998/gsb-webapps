import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
const db=new DatabaseSync('data/gsb-statistik-normalized.db');
const byAge=db.prepare(`SELECT c.age_group_id,COUNT(*) AS missing_matches,
 SUM(CASE WHEN tm.status='browser_verified' THEN 1 ELSE 0 END) AS browser_verified,
 SUM(CASE WHEN tm.status='browser_verified_no_result' THEN 1 ELSE 0 END) AS no_result,
 SUM(CASE WHEN tm.status='api_error' THEN 1 ELSE 0 END) AS api_error
 FROM team_matches tm JOIN competitions c ON c.competition_id=tm.competition_id
 WHERE NOT EXISTS (SELECT 1 FROM individual_matches im WHERE im.team_match_id=tm.team_match_id)
 GROUP BY c.age_group_id ORDER BY c.age_group_id`).all();
const total=db.prepare(`SELECT COUNT(*) AS missing_matches FROM team_matches tm WHERE NOT EXISTS (SELECT 1 FROM individual_matches im WHERE im.team_match_id=tm.team_match_id)`).get();
const youth=db.prepare(`SELECT COUNT(*) AS missing_matches,SUM(CASE WHEN tm.status='browser_verified' THEN 1 ELSE 0 END) AS browser_verified FROM team_matches tm JOIN competitions c ON c.competition_id=tm.competition_id WHERE c.age_group_id IN (2,3,4,5) AND NOT EXISTS (SELECT 1 FROM individual_matches im WHERE im.team_match_id=tm.team_match_id)`).get();
const out={generatedAt:new Date().toISOString(),total,byAge,youth,comparison:{op035BrowserVerified:162,op033YouthMissing:205,op035WithinCurrentYouthMissing:162,remainingYouthMissing:43}};
fs.writeFileSync('results/039-missing-individuals-age-breakdown.json',JSON.stringify(out,null,2)); console.log(JSON.stringify(out,null,2)); db.close();
