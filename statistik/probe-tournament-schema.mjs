const q='{__schema{queryType{fields{name args{name type{kind name ofType{kind name}}}}} types{name kind}}}';
const r=await fetch('https://app.nembadminton.dk/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:q})});
const j=await r.json(); const s=JSON.stringify(j); console.log(JSON.stringify({http:r.status,errors:j.errors||[],matches:s.match(/.{0,80}(ournament|urnering|ompetition|vent).{0,120}/gi)||[]},null,2));
