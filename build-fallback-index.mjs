import fs from 'node:fs';
const lines=fs.readFileSync('results/gsb-historical-2025-2000.jsonl','utf8').trim().split(/\r?\n/);
const byId=new Map();
for(const line of lines){const s=JSON.parse(line); for(const m of (s.matches||[])){byId.set(String(m.matchId),{...m,season:s.season});}}
const errs=JSON.parse(fs.readFileSync('results/gsb-match-errors-with-opponents.json','utf8')).results;
const out=errs.map(e=>{const m=byId.get(String(e.matchId))||{}; const url=`https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,${m.season??e.season},${m.leagueGroupId??''},1,8,,${e.matchId},1093,`; return {...e,ageGroupId:m.ageGroupId??null,leagueGroupId:m.leagueGroupId??null,roundDate:m.roundDate??null,gameTime:m.gameTime??null,badmintonPlayerUrl:url};});
fs.writeFileSync('results/gsb-api-error-fallback-index.json',JSON.stringify({generatedAt:new Date().toISOString(),total:out.length,results:out},null,2));
const header='season,matchId,ageGroupId,leagueGroupId,teamName,opponent,homeAway,error,badmintonPlayerUrl\n';
const esc=v=>`"${String(v??'').replaceAll('"','""')}"`;
fs.writeFileSync('results/gsb-api-error-fallback-index.csv',header+out.map(x=>[x.season,x.matchId,x.ageGroupId,x.leagueGroupId,x.teamName,x.opponent,x.homeAway,x.error,x.badmintonPlayerUrl].map(esc).join(',')).join('\n'));
console.log(JSON.stringify({total:out.length,withGroup:out.filter(x=>x.leagueGroupId).length,withAge:out.filter(x=>x.ageGroupId).length},null,2));
