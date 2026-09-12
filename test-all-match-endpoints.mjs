const E='https://app.nembadminton.dk/graphql';const ids=[486396,487423];
async function c(name,q){try{const r=await fetch(E,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:q})});return {name,http:r.status,body:await r.json()};}catch(e){return{name,error:e.message}}}
const out=[];
out.push(await c('schema',`query { a:__type(name:"ImportTeam"){fields{name type{kind name ofType{kind name}}}} b:__type(name:"Division"){fields{name type{kind name ofType{kind name}}}} }`));
for(const id of ids){out.push(await c(`teamMatch-${id}`,`query { badmintonPlayerTeamMatch(input:{leagueMatchId:${id},season:2025}){home{name} guest{name}} }`));}
const lm=ids.map(id=>`{id:${id},teamNameHint:"Gladsaxe Søborg",league:"1. Serie Pulje 1"}`).join(',');
out.push(await c('teamMatches-bulk',`query { badmintonPlayerTeamMatches(input:{clubId:1093,season:2025,version:"2025-09-21",leagueMatches:[${lm}]}){name leagueMatchId side } }`));
out.push(await c('apiTeamMatches',`query { badmintonPlayerApiTeamMatches(input:{clubId:1093}) }`));
out.push(await c('validation',`query { teamMatchesFormattedForValidation(input:{clubId:1093,version:"2025-09-21",matchIds:[486396,487423]}) }`));
console.log(JSON.stringify(out,null,2));
