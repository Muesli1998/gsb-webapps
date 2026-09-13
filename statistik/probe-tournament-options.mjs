const query = `query {
  group: __type(name: "TournamentGroupOption") { fields { name type { kind name ofType { kind name } } } }
  tier: __type(name: "TournamentTierOption") { fields { name type { kind name ofType { kind name } } } }
}`;
const res = await fetch('https://app.nembadminton.dk/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query})});
console.log(JSON.stringify(await res.json(),null,2));
