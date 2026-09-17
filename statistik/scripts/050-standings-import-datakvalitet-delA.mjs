import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
const db=new DatabaseSync('statistik/data/gsb-statistik-normalized.db');
const q=db.prepare('select distinct league_raw,age_group_id,season_id,league_group_id from competitions where season_id=? and cast(league_group_id as integer)=?');
const files=fs.readdirSync('statistik/results/browser-standings').filter(f=>f.endsWith('.json'));
const norm=s=>String(s||'').replace(/\s+/g,' ').trim().toUpperCase();
const token=s=>(norm(s).match(/U\d+|SEN\+?\d+/)||[])[0]||'';
const out=[];
for(const f of files){const [season,group]=f.replace('.json','').split('-').map(Number);const o=JSON.parse(fs.readFileSync('statistik/results/browser-standings/'+f));const lines=String(o.rawText||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);const i=lines.findIndex(x=>/^BAD[A-ZÆØÅ0-9+ -]+\d{4}\/\d{4}/i.test(x));const title=i>=0?lines[i]:null;const league=i>=0?lines[i+1]:null;const dbRows=q.all(season,group);const sourceToken=token(title);const dbTokens=[...new Set(dbRows.map(r=>token(r.league_raw)))].filter(Boolean);const mismatch=!!title&&sourceToken&&dbTokens.length>0&&!dbTokens.includes(sourceToken);out.push({file,title,league,db:dbRows,mismatch,undetermined:!title});}
const result={files:files.length,compared:out.filter(x=>!x.undetermined).length,mismatches:out.filter(x=>x.mismatch).length,undetermined:out.filter(x=>x.undetermined).length,rows:out};fs.writeFileSync('statistik/results/050-standings-import-datakvalitet-delA.json',JSON.stringify(result,null,2));fs.writeFileSync('statistik/results/050-standings-import-datakvalitet-delA.md','# Opgave 050 Del A — titelkontrol\n\n- Filer gennemgået: **'+result.files+'**\n- Fuld sidetitel udtrukket: **'+result.compared+'**\n- Identitetsmismatch (alders-/rækketoken): **'+result.mismatches+'**\n- Ikke afgørbare: **'+result.undetermined+'**\n\nMismatches er listet i JSON. Ingen competitions- eller standings-rækker er ændret.');db.close();
