import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
const db=new DatabaseSync('data/gsb-statistik-normalized.db');
const youth='2,3,4,5';
const rows=db.prepare(`SELECT p.player_id,p.name_raw,p.name_normalized,tm.season_id,tm.round_date,tm.gsb_team_id,tm.external_match_id,c.league_raw,c.name_raw AS competition_name
 FROM individual_match_players imp JOIN players p ON p.player_id=imp.player_id
 JOIN individual_matches im ON im.individual_match_id=imp.individual_match_id
 JOIN team_matches tm ON tm.team_match_id=im.team_match_id
 JOIN competitions c ON c.competition_id=tm.competition_id
 WHERE c.age_group_id IN (${youth}) AND p.external_player_id IS NULL`).all();
const relationCount=rows.length;
const players=[...new Map(rows.map(r=>[r.player_id,r])).values()];
const dup=db.prepare(`SELECT name_normalized,COUNT(*) AS player_count,GROUP_CONCAT(player_id) AS player_ids FROM players WHERE external_player_id IS NULL AND name_normalized IS NOT NULL AND player_id IN (SELECT DISTINCT p.player_id FROM individual_match_players imp JOIN players p ON p.player_id=imp.player_id JOIN individual_matches im ON im.individual_match_id=imp.individual_match_id JOIN team_matches tm ON tm.team_match_id=im.team_match_id JOIN competitions c ON c.competition_id=tm.competition_id WHERE c.age_group_id IN (${youth})) GROUP BY name_normalized HAVING COUNT(*)>1`).all();
const key=r=>`${r.player_id}|${r.round_date}|${r.league_raw??''}|${r.competition_name??''}`;
const groups=new Map(); for(const r of rows){if(!r.round_date)continue;const k=key(r);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(r)}
const sameDateSameType=[...groups.values()].filter(g=>new Set(g.map(x=>x.gsb_team_id)).size>1);
const suspiciousPlayers=[...new Set(sameDateSameType.flatMap(g=>g.map(x=>x.player_id)))];
const seasons={}; for(const r of rows){const s=seasons[r.season_id]??={relations:0,players:new Set(),sameDateSameTypePlayers:new Set()};s.relations++;s.players.add(r.player_id)}
for(const g of sameDateSameType)for(const r of g)seasons[r.season_id].sameDateSameTypePlayers.add(r.player_id);
const seasonTable=Object.entries(seasons).sort((a,b)=>a[0]-b[0]).map(([season,s])=>({season:Number(season),relations:s.relations,players:s.players.size,sameDateSameTypePlayers:s.sameDateSameTypePlayers.size,ratePercent:s.players.size?Number((100*s.sameDateSameTypePlayers.size/s.players.size).toFixed(2)):0}));
const out={generatedAt:new Date().toISOString(),relationCount,playerCount:players.length,duplicateNormalizedNames:dup,sameDateSameTypeGroupCount:sameDateSameType.length,suspiciousPlayerCount:suspiciousPlayers.length,seasonTable,sameDateSameType:sameDateSameType.map(g=>g.map(({player_id,name_raw,season_id,round_date,gsb_team_id,external_match_id,league_raw,competition_name})=>({player_id,name_raw,season_id,round_date,gsb_team_id,external_match_id,league_raw,competition_name})))};
fs.writeFileSync('results/036-ungdom-navnematch-fuld-audit.json',JSON.stringify(out,null,2)); console.log(JSON.stringify({relationCount,playerCount:players.length,duplicateNormalizedNames:dup.length,sameDateSameTypeGroupCount:sameDateSameType.length,suspiciousPlayerCount:suspiciousPlayers.length,seasonTable},null,2)); db.close();
