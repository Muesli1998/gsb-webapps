import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('statistik/data/gsb-statistik-normalized.db');
const q = db.prepare('select distinct league_raw, age_group_id, season_id, league_group_id from competitions where season_id=? and cast(league_group_id as integer)=?');
const dir='statistik/results/browser-standings';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.json')).sort();
const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toUpperCase();
const ageToken=s=>{ const m=norm(s).match(/U\d+|SEN\+?\d+/); if(!m) return ''; return m[0].replace(/^U0+(\d+)/,'U$1'); };
const out=[];
for(const file of files){
  const [season,group]=file.replace('.json','').split('-').map(Number);
  const o=JSON.parse(fs.readFileSync(`${dir}/${file}`,'utf8'));
  const lines=String(o.rawText??'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const i=lines.findIndex(x=>/^BAD/i.test(x)&&/\b\d{4}\/\d{4}\b/.test(x));
  const title=i>=0?lines[i]:null;
  const league=i>=0?lines.slice(i+1).find(x=>!/^Vis (rækker|alle kampe)$/i.test(x))??null:null;
  const dbRows=q.all(season,group);
  const sourceToken=ageToken(title);
  const dbTokens=[...new Set(dbRows.map(r=>ageToken(r.league_raw)).filter(Boolean))];
  const mismatch=Boolean(title&&sourceToken&&dbTokens.length&& !dbTokens.includes(sourceToken));
  out.push({file,title,league,season,league_group_id:String(group),db:dbRows,mismatch,undetermined:!title});
}
const result={files:files.length,compared:out.filter(x=>!x.undetermined).length,mismatches:out.filter(x=>x.mismatch).length,undetermined:out.filter(x=>x.undetermined).length,rows:out};
fs.writeFileSync('statistik/results/050-standings-import-datakvalitet-delA.json',JSON.stringify(result,null,2));
const lines=['# Opgave 050 Del A — titelkontrol','',`- Gemte filer gennemgået: **${result.files}**`,`- Sammenlignelige sidetitler: **${result.compared}**`,`- Mismatches efter alders-/rækketoken: **${result.mismatches}**`,`- Ikke afgørbare uden entydig sidetitel: **${result.undetermined}**`,'','Sammenligningen bruger den fulde linje med BAD-prefiks og sæsoninterval fra rawText. Mismatches og ikke-afgørbare filer er fuldt listet i JSON. Ingen competitions- eller standings-rækker er ændret.'];
fs.writeFileSync('statistik/results/050-standings-import-datakvalitet-delA.md',lines.join('\n')+'\n');
db.close();



