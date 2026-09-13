import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const matches = db.prepare("SELECT external_match_id, season_id, round_date, status, home_name_raw, away_name_raw, result_raw, points_raw FROM team_matches WHERE trim(result_raw)='-' OR trim(result_raw) IN ('0-0','0 – 0') OR result_raw IS NULL OR trim(result_raw)=''").all();
db.close();
const payloads = new Map();
for (const dir of ['results/browser-fallback', 'results/browser-fallback-youth', 'results/browser-fallback-complete']) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((x) => x.endsWith('.json') && !x.endsWith('.retry.json'))) {
    const o = JSON.parse(fs.readFileSync(`${dir}/${name}`, 'utf8'));
    const id = String(o.matchId ?? o.external_match_id ?? '');
    if (!id || !o.rawText) continue;
    const old = payloads.get(id);
    if (!old || String(o.rawText).length > String(old.rawText).length) payloads.set(id, { source: dir, rawText: o.rawText });
  }
}
function inCorona(date) {
  if (!date) return false;
  return (date >= '2020-03-15' && date <= '2020-06-30') || (date >= '2020-12-09' && date <= '2021-02-28');
}
const rows = matches.map((m) => {
  const p = payloads.get(String(m.external_match_id));
  const raw = String(p?.rawText ?? '');
  const categories = [...new Set((raw.match(/^\d+\.\s*[^\t\r\n]+/gm) ?? []).map((x) => x.trim()))];
  // Restrict score detection to the result/detail section. Whole-page
  // matching would count dates such as 22-03 as if they were game scores.
  const resultIndex = raw.search(/\nResultat\b/i);
  const detailRaw = resultIndex >= 0 ? raw.slice(resultIndex) : raw;
  const scores = detailRaw.match(/\b\d{1,2}\s*[-–]\s*\d{1,2}\b/g) ?? [];
  const explicitNoShow = /\(\s*Ikke fremmødt\s*\)/i.test(raw);
  const explicitNoPlay = /Afgjort uden kamp|afbud|udeblivelse/i.test(raw);
  const hasPlayerNames = categories.some((c) => { const i = raw.indexOf(c); return i >= 0 && raw.slice(i, i + 600).split(/\r?\n/).some((x) => /^[A-ZÆØÅ][A-Za-zÆØÅæøå'’.-]+(?:\s+[A-ZÆØÅ][A-Za-zÆØÅæøå'’.-]+)+$/.test(x.trim())); });
  const hasIndividualContent = categories.length > 0 && (scores.length > 1 || hasPlayerNames);
  return { ...m, source: p?.source ?? null, payloadFound: Boolean(p), categoryCount: categories.length, categories, scoreTokenCount: scores.length, explicitNoShow, explicitNoPlay, hasPlayerNames, coronaWindow: inCorona(m.round_date), interpretation: explicitNoShow || explicitNoPlay ? 'explicit_no_play' : hasIndividualContent ? 'page_has_individual_content' : 'no_individual_content_evidence' };
});
const report = { generatedAt: new Date().toISOString(), windows: ['2020-03-15..2020-06-30', '2020-12-09..2021-02-28'], total: rows.length, byInterpretation: Object.fromEntries([...new Set(rows.map((x) => x.interpretation))].map((k) => [k, rows.filter((x) => x.interpretation === k).length])), bySeason: Object.values(rows.reduce((a, x) => { const k = String(x.season_id); a[k] ??= { season: x.season_id, total: 0, coronaWindow: 0, explicitNoShow: 0, pageHasIndividualContent: 0, noIndividualContentEvidence: 0 }; const y = a[k]; y.total++; if (x.coronaWindow) y.coronaWindow++; if (x.explicitNoShow) y.explicitNoShow++; if (x.interpretation === 'page_has_individual_content') y.pageHasIndividualContent++; if (x.interpretation === 'no_individual_content_evidence') y.noIndividualContentEvidence++; return a; }, {})), rows };
fs.writeFileSync('results/no-result-match-audit.json', JSON.stringify(report, null, 2));
let md = `# Audit af holdkampe uden spillet resultat\n\nGenereret: ${report.generatedAt}\n\n- Rækker med NULL, tomt, \'-\' eller 0-0-resultat: **${report.total}**\n- Sider med eksplicit \'(Ikke fremmødt)\': **${report.byInterpretation.explicit_no_play ?? 0}**\n- Sider med individuel tekst/score, men uden holdresultat: **${report.byInterpretation.page_has_individual_content ?? 0}**\n- Sider uden individuel evidens: **${report.byInterpretation.no_individual_content_evidence ?? 0}**\n\nCorona-vinduerne er brugt som analysefilter: 2020-03-15–2020-06-30 og 2020-12-09–2021-02-28. Det er et filter, ikke en automatisk klassifikation af årsag.\n\n## Pr. sæson\n\n| Sæson | I alt | I corona-vindue | Eksplicit ikke fremmødt | Individuel tekst/score | Ingen individuel evidens |\n|---:|---:|---:|---:|---:|---:|\n`;
for (const x of report.bySeason.sort((a, b) => a.season - b.season)) md += `| ${x.season} | ${x.total} | ${x.coronaWindow} | ${x.explicitNoShow} | ${x.pageHasIndividualContent} | ${x.noIndividualContentEvidence} |\n`;
md += `\n## Fortolkning\n\n- \'-\' alene betyder ikke, at kampen var corona-lukket.\n- En side med spiller- og sætscore uden holdresultat skal bevares som en separat datatilstand; den må ikke tælles som en spillet holdkamp uden resultat.\n- Kun eksplicit \'(Ikke fremmødt)\' er direkte walkover-/no-show-evidens.\n`;
fs.writeFileSync('results/no-result-match-audit.md', md);
console.log(JSON.stringify({ total: report.total, byInterpretation: report.byInterpretation, bySeason: report.bySeason }, null, 2));
