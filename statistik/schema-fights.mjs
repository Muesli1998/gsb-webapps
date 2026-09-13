const q='{__type(name:"BadmintonPlayerTeamFightTeam"){fields{name type{kind name ofType{kind name}}}}}';const r=await fetch('https://app.nembadminton.dk/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:q})});console.log(await r.text());

