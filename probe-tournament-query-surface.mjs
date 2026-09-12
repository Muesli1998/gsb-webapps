const query = `query { __schema { queryType { fields { name args { name } } } } }`;
const response = await fetch('https://app.nembadminton.dk/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query})});
const j=await response.json();
const fields=j.data?.__schema?.queryType?.fields||[];
console.log(JSON.stringify(fields.filter(f=>/tournament|result|program|match|event|player/i.test(f.name)),null,2));
