const endpoint = 'https://app.nembadminton.dk/graphql';

async function gql(query) {
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query })
  });
  return { http: r.status, body: await r.json() };
}

const schema = await gql('{__schema{queryType{fields{name args{name type{kind name ofType{kind name}}}}}}}');
const fields = schema.body?.data?.__schema?.queryType?.fields ?? [];
const candidates = fields.filter(f => /teamRound|teamRounds/i.test(f.name));

let typeProbe;
for (const typeName of ['TeamRound', 'TeamRoundsResult', 'TeamRoundConnection']) {
  const result = await gql(`{__type(name:"${typeName}"){name fields{name type{kind name ofType{kind name}}}}}`);
  if (result.body?.data?.__type) {
    typeProbe = { typeName, result };
    break;
  }
}

const query = `query {
  teamRounds(clubhouseId: 331, first: 100, page: 1) {
    __typename
  }
}`;
const call = await gql(query);

console.log(JSON.stringify({
  querySurface: candidates,
  typeProbe: typeProbe ? { typeName: typeProbe.typeName, ...typeProbe.result } : null,
  call
}, null, 2));
