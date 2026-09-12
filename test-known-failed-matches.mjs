const endpoint='https://app.nembadminton.dk/graphql';
async function call(query){const r=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query})});return {http:r.status,body:await r.json()};}
const tests=[{id:486396,date:'2025-10-05'},{id:487423,date:'2025-09-21'}]; const out=[];
for(const t of tests){const base=`badmintonPlayerTeamMatch(input:{leagueMatchId:${t.id},season:2025`; for(const suffix of ['})',`,version:"${t.date}"})`]){const q=`query { ${base}${suffix}{home{name squad{categories{category name results{homePoints guestPoints} players{name}}}} guest{name squad{categories{category name results{homePoints guestPoints} players{name}}}}} }`; out.push({id:t.id,variant:suffix, ...(await call(q))});}}
console.log(JSON.stringify(out,null,2));
