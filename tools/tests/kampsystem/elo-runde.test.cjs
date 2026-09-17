const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('apps/netlify-prod/public/kampsystem.html','utf8');
function extract(name){ const start=html.indexOf(`function ${name}(`); if(start<0) throw Error(`missing ${name}`); let i=html.indexOf('{',start), d=0; for(;i<html.length;i++){if(html[i]==='{')d++; else if(html[i]==='}'&&--d===0)return html.slice(start,i+1);} throw Error(name); }
const ctx={Math}; vm.createContext(ctx); vm.runInContext(`const K=70,ELO_DIVISOR=850; ${extract('expectedScore')} ${extract('teamAvg')} ${extract('pairSingles')} ${extract('formTeams')} ${extract('matchTeams')}`,ctx);
const tests=[]; const t=(name,fn)=>{try{fn();tests.push([name,'PASS']);}catch(e){tests.push([name,'FAIL',e.message]);}};
t('equal ratings expected 50%',()=>assert.equal(ctx.expectedScore(1500,1500),0.5));
t('favorite expected probability',()=>assert.ok(ctx.expectedScore(1800,1500)>0.65));
t('pairSingles even and bye',()=>{let r=ctx.pairSingles([{id:1},{id:2},{id:3}]);assert.equal(r.matches.length,1);assert.equal(r.sidder.length,1);});
t('formTeams ens odd bye',()=>{let r=ctx.formTeams([{id:1},{id:2},{id:3}],'ens');assert.equal(r.teams.length,1);assert.equal(r.sidder.length,1);});
t('formTeams balanced pairs',()=>{let r=ctx.formTeams([{id:1},{id:2},{id:3},{id:4}],'blandet');assert.equal(JSON.stringify(r.teams.map(x=>x.map(p=>p.id))),JSON.stringify([[1,4],[2,3]]));});
t('matchTeams sorts and pairs',()=>{let r=ctx.matchTeams([[{single:1800,id:1}],[{single:1700,id:2}],[{single:1600,id:3}]],'single','single');assert.equal(r.matches.length,1);assert.equal(r.matches[0].a[0].id,1);assert.equal(r.sidder[0].id,3);});
console.log(JSON.stringify({tests,totals:{run:tests.length,passed:tests.filter(x=>x[1]==='PASS').length,failed:tests.filter(x=>x[1]==='FAIL').length}},null,2));

