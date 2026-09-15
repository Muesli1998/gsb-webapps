import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const rows = db.prepare(`SELECT tm.team_match_id,tm.external_match_id,tm.season_id,tm.status,tm.round_date,
 c.age_group_id,c.league_group_id,c.league_raw,c.name_raw,r.endpoint_or_url
 FROM team_matches tm JOIN competitions c ON c.competition_id=tm.competition_id
 LEFT JOIN raw_payloads r ON r.raw_payload_id=tm.raw_payload_id
 WHERE c.age_group_id IN (2,3,4,5) AND tm.status='browser_verified'
 AND NOT EXISTS (SELECT 1 FROM individual_matches im WHERE im.team_match_id=tm.team_match_id)
 ORDER BY tm.season_id,tm.external_match_id`).all();
const dirs = ['results/browser-fallback','results/browser-fallback-youth','results/individual-browser-all'];
const byId = new Map();
for (const dir of dirs) if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (f.endsWith('.json')) {
  try { const o=JSON.parse(fs.readFileSync(`${dir}/${f}`,'utf8')); if (o.matchId && o.rawText) byId.set(String(o.matchId),o); } catch {}
}
const classified = rows.map(r => {
  const o=byId.get(String(r.external_match_id)); const text=o?.rawText||'';
  const hasCategory=/^\s*\d+\.\s*(?:S|D|M|MD|DD)\b/m.test(text) || /\b(?:Herresingle|Damesingle|Herredouble|Damedouble|Mixdouble)\b/i.test(text);
  const walkover=/Afgjort uden kamp|Ikke fremmødt|afbud|udeblivelse/i.test(text);
  const category = walkover ? 'explicit_forfeit_or_no_show' : hasCategory ? 'category_section_present_without_imported_rows' : 'no_category_section_no_explicit_forfeit';
  return { ...r, category, sourceFile:o?.resultFile||null, rawTextLength:text.length };
});
const counts=Object.fromEntries([...new Set(classified.map(x=>x.category))].map(c=>[c,classified.filter(x=>x.category===c).length]));
const out={generatedAt:new Date().toISOString(),total:classified.length,counts,rows:classified};
fs.writeFileSync('results/035-ungdom-klassificer-manglende.json',JSON.stringify(out,null,2));
console.log(JSON.stringify({total:out.total,counts,missingSource:classified.filter(x=>!x.sourceFile).length},null,2));
db.close();
