import {readFile,writeFile} from 'node:fs/promises';
const endpoint='https://app.nembadminton.dk/graphql';
const rows=(await readFile(new URL('./results/gsb-historical-2025-2000.jsonl',import.meta.url),'utf8')).trim().split(/\r?\n/).map(JSON.parse);
const sample=rows.flatMap(r=>r.matches.filter(x=>Number(x.ageGroupId)===1).slice(0,2).map(m=>({season:r.season,...m}))).filter(m=>m.matchId).slice(0,32);
async function gql(q){const r=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:q})});const j=await r.json();if(!r.ok||j.errors?.length)throw Error(j.errors?.map(e=>e.message).join(' / ')||`HTTP ${r.status}`);return j.data;}
const out=[]; for(const m of sample){const row={season:m.season,matchId:m.matchId,source:{league:m.league,teamName:m.teamName,roundDate:m.roundDate||m.gameTime},status:'ok'}; try{const q=`query { badmintonPlayerTeamMatch(input:{leagueMatchId:${m.matchId},season:${m.season}}){home{name} guest{name}} }`; const d=(await gql(q)).badmintonPlayerTeamMatch; row.home=d?.home?.name; row.guest=d?.guest?.name; row.categories=[...(d?.home?.squad?.categories??[])].map((c,i)=>({category:c.category,name:c.name,homeResults:c.results,homePlayers:c.players,guestResults:d?.guest?.squad?.categories?.[i]?.results,guestPlayers:d?.guest?.squad?.categories?.[i]?.players})); row.hasPlayers=row.categories.some(c=>c.homePlayers?.length||c.guestPlayers?.length); row.hasScores=row.categories.some(c=>c.homeResults?.length||c.guestResults?.length); }catch(e){row.status='error';row.error=e.message;} out.push(row); console.log(`${m.season}/${m.matchId}: ${row.status}`); }
await writeFile(new URL('./results/gsb-match-detail-sample.json',import.meta.url),JSON.stringify({sampleSize:out.length,results:out},null,2)+'\n');



