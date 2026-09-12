import { DatabaseSync } from 'node:sqlite';
const db=new DatabaseSync('data/gsb-statistik-normalized.db');
try{db.exec('ALTER TABLE team_matches ADD COLUMN walkover_winner_raw TEXT');}catch{}
for(const [id,w] of [['505216','Gladsaxe Søborg 1'],['492129','Gladsaxe Søborg 2'],['492136','Charlottenlund 1']]) db.prepare('UPDATE team_matches SET walkover_winner_raw=? WHERE external_match_id=?').run(w,id);
console.log(db.prepare("SELECT external_match_id,walkover_text_raw,walkover_winner_raw FROM team_matches WHERE walkover_text_raw IS NOT NULL").all()); db.close();
