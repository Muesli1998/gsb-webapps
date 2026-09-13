const q=`query { badmintonPlayerTeamFights(input:{clubId:1093,season:2025,ageGroupId:13,leagueGroupId:17963,clubName:"Gladsaxe Søborg 2"}){matchId teams} }`;const r=await fetch('https://app.nembadminton.dk/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:q})});console.log(await r.text());

