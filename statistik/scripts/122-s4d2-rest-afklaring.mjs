import fs from 'node:fs'; import path from 'node:path'; import { DatabaseSync } from 'node:sqlite';
const landPath='statistik/data/liga-landskab.db', playersPath='statistik/data/national-spillere.db';
const outBase='statistik/results/122-s4d2-rest-afklaring';
const youth=[2,3,4,5,6,7,18];
function formatSignal(text=''){ const s=String(text).toLowerCase(); return /\b4\s*spillere\b/.test(s)||/\b4\s*piger\b/.test(s)||/\b3\s*spillere\b/.test(s)||/\b2\s*\+\s*2\b/.test(s)||/\b4\s*\+\s*2\b/.test(s)||/\b4\s*\+\s*3\b/.test(s)||/\bx[12]\b/.test(s); }
const db=new DatabaseSync(landPath,{readOnly:true});
const groups=new Map();
const q=`SELECT lg.season_id,lg.age_group_id,lg.league_group_id,lg.division_name_raw,lg.group_name_raw,lg.page_title_raw,lmg.external_match_id,mc.category_raw
FROM league_groups lg JOIN league_match_groups lmg ON lmg.season_id=lg.season_id AND lmg.age_group_id=lg.age_group_id AND lmg.league_group_id=lg.league_group_id
LEFT JOIN match_categories mc ON mc.external_match_id=lmg.external_match_id
WHERE lg.age_group_id IN (2,3,4,5,6,7,18)`;
for(const r of db.prepare(q).iterate()){ const key=`${r.season_id}|${r.age_group_id}|${r.league_group_id}`; let g=groups.get(key); if(!g){g={season_id:r.season_id,age_group_id:r.age_group_id,league_group_id:r.league_group_id,division_name_raw:r.division_name_raw||'',group_name_raw:r.group_name_raw||'',page_title_raw:r.page_title_raw||'',matches:new Set(),codes:new Set()};groups.set(key,g);} if(r.external_match_id)g.matches.add(String(r.external_match_id)); if(r.category_raw)g.codes.add(String(r.category_raw).trim()); }
for(const g of groups.values()){ const parsed=[...g.codes].map(x=>{const m=x.match(/^\d+\.\s*([A-Z]+)$/i);return m?m[1].toUpperCase():null}).filter(Boolean); g.sCount=[...g.codes].filter(x=>/^\d+\.\s*S$/i.test(x)).length; g.dCount=[...g.codes].filter(x=>/^\d+\.\s*D$/i.test(x)).length; g.signature=(g.sCount===4&&g.dCount===2&&parsed.length===6)?'S4/D2':'other'; g.text=[g.division_name_raw,g.group_name_raw,g.page_title_raw].join(' | '); g.hasKnownText=formatSignal(g.text); }
const s4=[...groups.values()].filter(g=>g.signature==='S4/D2'); const rest=s4.filter(g=>!g.hasKnownText), known=s4.filter(g=>g.hasKnownText);
const playerDb=new DatabaseSync(playersPath,{readOnly:true});
const matchQ=playerDb.prepare('SELECT external_player_id,team_side,discipline_code FROM player_matches WHERE external_match_id=?'); const playerName=playerDb.prepare('SELECT external_player_id,name_raw,gender_status FROM players WHERE external_player_id=?');
function inspect(g){ const ids=[...g.matches].sort(); const matchId=ids[0]; const rows=matchId?matchQ.all(matchId):[]; const by={}; for(const r of rows){const side=r.team_side||'ukendt_side'; (by[side]??=[]).push(r.external_player_id);} const teams=Object.fromEntries(Object.entries(by).map(([k,v])=>[k,{distinct_players:[...new Set(v)].length,genders:[...new Set(v)].map(id=>playerName.get(id)).filter(Boolean).reduce((a,p)=>(a[p.gender_status]=(a[p.gender_status]||0)+1,a),{})}])); return {season_id:g.season_id,age_group_id:g.age_group_id,league_group_id:g.league_group_id,match_id:matchId,match_count:g.matches.size,text:g.text,teams,player_rows:rows.length}; }
function spread(arr,n){if(arr.length<=n)return arr; const out=[]; for(let i=0;i<n;i++) out.push(arr[Math.floor(i*(arr.length-1)/(n-1))]); return out;}
const restSamples=spread(rest.sort((a,b)=>a.season_id-b.season_id||a.age_group_id-b.age_group_id||String(a.league_group_id).localeCompare(String(b.league_group_id))),60).map(inspect);
const knownSamples=spread(known.sort((a,b)=>a.season_id-b.season_id||a.age_group_id-b.age_group_id||String(a.league_group_id).localeCompare(String(b.league_group_id))),30).map(inspect);
const catalog=JSON.parse(fs.readFileSync('statistik/results/112-spilleformats-katalog-alle-aargange.json','utf8'));
const summary={source_group_count:groups.size,s4d2_group_count:s4.length,known_text_group_count:known.length,unknown_text_group_count:rest.length,control_groups_sampled:knownSamples.length,rest_groups_sampled:restSamples.length,raw_catalog_summary:catalog.summary,unique_key:'season_id + age_group_id + league_group_id; region rows are not part of the physical-pool key',youth_age_group_ids:youth,signature_definition:'exactly four distinct S codes and two distinct D codes across match_categories, no other code',known_text_definition:'same 046/112 text tokens: 4 spillere, 4 piger, 3 spillere, 2+2, 4+2, 4+3, X1/X2',national_player_side_note:'player_matches.team_side is inspected as stored; unknown_side is reported rather than inferred'};
const result={generated_at:new Date().toISOString(),summary,rest_samples:restSamples,control_samples:knownSamples};
fs.mkdirSync(path.dirname(outBase),{recursive:true}); fs.writeFileSync(outBase+'.json',JSON.stringify(result,null,2)+'\n');
const genderTotals=arr=>{const t={}; for(const x of arr)for(const y of Object.values(x.teams))for(const [k,v] of Object.entries(y.genders))t[k]=(t[k]||0)+v; return t;};
fs.mkdirSync(path.dirname(outBase),{recursive:true}); fs.writeFileSync(outBase+'.json',JSON.stringify(result,null,2)+'\n'); console.log(JSON.stringify(summary,null,2)); db.close(); playerDb.close();


