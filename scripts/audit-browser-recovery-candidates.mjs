import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const byId = new Map(db.prepare('SELECT external_match_id, home_name_raw, away_name_raw, result_raw, points_raw FROM team_matches').all().map((r) => [String(r.external_match_id), r]));

function field(raw, label) {
  const lines = String(raw ?? '').split(/\r?\n/).map((x) => x.trim());
  const i = lines.findIndex((x) => x.startsWith(label));
  if (i < 0) return null;
  const same = lines[i].slice(label.length).replace(/^[:\t ]+/, '').trim();
  return same || (lines[i + 1] ?? '').trim() || null;
}

const dirs = ['results/browser-fallback', 'results/browser-fallback-youth'];
const seen = new Set();
const rows = [];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const o = JSON.parse(fs.readFileSync(`${dir}/${name}`, 'utf8'));
    const id = String(o.matchId ?? '');
    const raw = String(o.rawText ?? '');
    if (!id || seen.has(id) || !raw.includes(id) || !/^Resultat\b/m.test(raw)) continue;
    seen.add(id);
    const dbRow = byId.get(id);
    rows.push({
      matchId: id,
      source: dir,
      queueStatus: o.status,
      dbFound: Boolean(dbRow),
      hasHome: Boolean(field(raw, 'Hjemmehold')),
      hasAway: Boolean(field(raw, 'Udehold')),
      hasResult: Boolean(field(raw, 'Resultat') && field(raw, 'Resultat') !== '-'),
      hasPoints: Boolean(field(raw, 'Point')),
      dbMissingHome: Boolean(dbRow && !dbRow.home_name_raw),
      dbMissingAway: Boolean(dbRow && !dbRow.away_name_raw),
      dbMissingResult: Boolean(dbRow && !dbRow.result_raw),
      dbMissingPoints: Boolean(dbRow && !dbRow.points_raw),
    });
  }
}
const count = (p) => rows.filter(p).length;
const report = {
  generatedAt: new Date().toISOString(),
  filesWithDynamicMatchDetail: rows.length,
  recoverableHomeAway: count((r) => r.dbFound && r.hasHome && r.hasAway && (r.dbMissingHome || r.dbMissingAway)),
  recoverableResult: count((r) => r.dbFound && r.hasResult && r.dbMissingResult),
  recoverablePoints: count((r) => r.dbFound && r.hasPoints && r.dbMissingPoints),
  bySource: dirs.map((source) => ({ source, count: rows.filter((r) => r.source === source).length })),
  rows,
};
fs.writeFileSync('results/browser-recovery-candidates.json', JSON.stringify(report, null, 2));
const md = `# Browser recovery audit\n\nGenereret: ${report.generatedAt}\n\n- Dynamiske kampdetaljer fundet lokalt: **${report.filesWithDynamicMatchDetail}**\n- Rækker hvor hjemme/ude kan udfyldes fra rådata: **${report.recoverableHomeAway}**\n- Rækker hvor resultat kan udfyldes fra rådata: **${report.recoverableResult}**\n- Rækker hvor point kan udfyldes fra rådata: **${report.recoverablePoints}**\n\nRapporten er read-only. Den ændrer ikke databasen; den viser kun, hvilke manglende felter der kan dokumenteres direkte fra gemte dynamiske browserpayloads.\n`;
fs.writeFileSync('results/browser-recovery-candidates.md', md);
console.log(JSON.stringify({ files: report.filesWithDynamicMatchDetail, recoverableHomeAway: report.recoverableHomeAway, recoverableResult: report.recoverableResult, recoverablePoints: report.recoverablePoints }, null, 2));
db.close();
