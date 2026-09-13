import { DatabaseSync } from 'node:sqlite';
const db=new DatabaseSync('data/gsb-statistik-normalized.db');
const rows=[['505216','5-0','3-0','Afgjort uden kamp (afbud/udeblivelse)','Gladsaxe Søborg 1'],['492129','6-0','4-0','Afgjort uden kamp (afbud/udeblivelse)','Gladsaxe Søborg 2'],['492136',null,null,'Afgjort uden kamp (afbud/udeblivelse)','Charlottenlund 1'],['492138','1-5','0-4',null,'Drive 3']];
for(const [id,result,points,text,winner] of rows){db.prepare(`UPDATE team_matches SET result_raw=COALESCE(?,result_raw),points_raw=COALESCE(?,points_raw),walkover_text_raw=COALESCE(?,walkover_text_raw),status='browser_verified' WHERE external_match_id=?`).run(result,points,text,id);}
console.log(db.prepare("SELECT external_match_id,home_name_raw,away_name_raw,result_raw,points_raw,walkover_text_raw,status FROM team_matches WHERE external_match_id IN ('505216','492129','492136','492138')").all()); db.close();
