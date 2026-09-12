const q='query{seasons{id seasonName}}';
const r=await fetch('https://app.nembadminton.dk/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:q})});
console.log(JSON.stringify(await r.json(),null,2));

