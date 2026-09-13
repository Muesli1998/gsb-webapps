import {mkdir,writeFile} from 'node:fs/promises';
const cases=[{matchId:486396,season:2025,leagueGroupId:17955,ageGroupId:9,clubId:1093,teamName:'Gladsaxe Søborg 4'},{matchId:487423,season:2025,leagueGroupId:17963,ageGroupId:13,clubId:1093,teamName:'Gladsaxe Søborg 2'}];
const bases=['https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/']; const out=[];
for(const c of cases){const fragment=`#5,${c.season},${c.leagueGroupId},1,8,,${c.matchId},${c.clubId},`;const row={...c,fragment,attempts:[]};for(const base of bases){const url=base+fragment;try{const r=await fetch(url,{headers:{'user-agent':'Mozilla/5.0'} });const text=await r.text();row.attempts.push({url,status:r.status,contentType:r.headers.get('content-type'),length:text.length,hasMatchId:text.includes(String(c.matchId)),title:(text.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]||'').trim()});}catch(e){row.attempts.push({url,error:e.message});}}out.push(row);}
await mkdir(new URL('./results/',import.meta.url),{recursive:true});await writeFile(new URL('./results/direct-badmintonplayer-test.json',import.meta.url),JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2));

