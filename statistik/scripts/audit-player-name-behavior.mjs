import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('data/gsb-statistik-normalized.db', { readOnly: true });
const top = db.prepare(`SELECT p.player_id,p.name_raw,COUNT(DISTINCT imp.individual_match_id) matches
 FROM players p JOIN individual_match_players imp ON imp.player_id=p.player_id
 WHERE p.external_player_id IS NULL GROUP BY p.player_id ORDER BY matches DESC,p.name_raw LIMIT 25`).all();
const out=[];
for (const p of top) {
 const rows=db.prepare(`SELECT tm.external_match_id,tm.round_date,tm.season_id,c.age_group_id,t.name_raw team
 FROM individual_match_players imp JOIN individual_matches im ON im.individual_match_id=imp.individual_match_id
 JOIN team_matches tm ON tm.team_match_id=im.team_match_id JOIN competitions c ON c.competition_id=tm.competition_id
 LEFT JOIN teams t ON t.team_id=tm.gsb_team_id WHERE imp.player_id=? GROUP BY tm.team_match_id`).all(p.player_id);
 const byDate=new Map(); for(const r of rows){if(!byDate.has(r.round_date))byDate.set(r.round_date,[]);byDate.get(r.round_date).push(r)}
 const sameDate=[...byDate.entries()].filter(([,v])=>new Set(v.map(x=>x.team)).size>1).flatMap(([date,v])=>v.map(x=>({date,...x})));
 out.push({name:p.name_raw,matches:p.matches,ageGroups:[...new Set(rows.map(x=>x.age_group_id))],seasons:[...new Set(rows.map(x=>x.season_id))],sameDate});
}
console.log(JSON.stringify({sampleSize:out.length,players:out},null,2));
