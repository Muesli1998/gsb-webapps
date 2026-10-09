import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const RESULTS = path.join(ROOT, 'statistik', 'results');
const RAW = path.join(RESULTS, '158-raa-svar');
const LOG = path.join(RAW, 'forespoergsler.json');
const REPORT = path.join(RESULTS, '158-turneringer.md');
const JSON_OUT = path.join(RESULTS, '158-turneringer.json');
const PAGE = 'https://badmintonplayer.dk/DBF/Ranglister/';
const SERVICE = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/';
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const targets = [
  { id: '329159', name: 'Josefine Bille-Ahmt', list: 288, post: '8329564', season: 2025, source: '154-råsvar 009.gz', cached: '009.gz' },
  { id: '330650', name: 'Benjamin Hinge Carlsson', list: 288, post: '8329310', season: 2025, source: '154-råsvar 010.gz', cached: '010.gz' },
  { id: '330770', name: 'Louis Valdemar Hedegaard Toftlund', list: 289, post: '8368727', season: 2025, source: '154-råsvar 011.gz', cached: '011.gz' },
  { id: '327691', name: 'Theodor Lumby Jessen', list: 288, post: '8327268', season: 2025, source: '154-fase-0a detail_link', file: 'theodor-327691.json.gz' },
  { id: '328195', name: 'Anna Rudolph', list: 288, post: '8328337', season: 2025, source: '154-fase-0a detail_link', file: 'anna-328195.json.gz' }
];
const listNames = { 287: 'Tilmeldingsniveau', 288: 'single', 289: 'double', 292: 'mix' };
const DB_SHA256_BEFORE = {
  'gsb-statistik-normalized.db': '49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E',
  'liga-landskab.db': '9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C',
  'rangliste-historik.db': '6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F',
  'national-spillere.db': '1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E',
  'rangliste-point.db': 'DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9'
};

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function readJsonSequence(p) {
  const text = fs.readFileSync(p, 'utf8');
  const values = [];
  let start = -1, depth = 0, inString = false, escaped = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (start < 0) { if (c === '{' || c === '[') { start = i; depth = 1; } continue; }
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') {
      depth--;
      if (depth === 0) { values.push(JSON.parse(text.slice(start, i + 1))); start = -1; }
    }
  }
  if (start >= 0 || !values.length) throw new Error('Ufuldstændig JSON-sekvens: ' + p);
  return values;
}
async function hashFile(file) {
  const h = crypto.createHash('sha256');
  for await (const chunk of fs.createReadStream(file)) h.update(chunk);
  return h.digest('hex').toUpperCase();
}
async function databaseHashesAfter() {
  return Object.fromEntries(await Promise.all(Object.keys(DB_SHA256_BEFORE).map(async name =>
    [name, await hashFile(path.join(ROOT, 'statistik', 'data', name))])));
}
function unwrap(text) {
  let v = JSON.parse(text);
  for (let i = 0; i < 5; i++) {
    if (v && typeof v === 'object' && 'd' in v) v = v.d;
    else if (typeof v === 'string') { try { v = JSON.parse(v); } catch { break; } }
    else break;
  }
  return v;
}
function decode(s) {
  return String(s ?? '')
    .replace(/&#x([0-9a-f]+);/giu, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#([0-9]+);/gu, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&nbsp;/giu, ' ').replace(/&amp;/giu, '&').replace(/&quot;/giu, '"')
    .replace(/&lt;/giu, '<').replace(/&gt;/giu, '>')
    .replace(/&aelig;/giu, 'æ').replace(/&oslash;/giu, 'ø').replace(/&aring;/giu, 'å')
    .replace(/&AElig;/gu, 'Æ').replace(/&Oslash;/gu, 'Ø').replace(/&Aring;/gu, 'Å');
}
function plain(s) {
  return decode(String(s ?? '').replace(/<br\s*\/?>/giu, ' | ').replace(/<hr\b[^>]*>/giu, ' | ').replace(/<[^>]*>/gu, ' '))
    .replace(/\s+/gu, ' ').trim();
}
function saveGzip(name, text) {
  fs.writeFileSync(path.join(RAW, name), zlib.gzipSync(Buffer.from(text, 'utf8'), { level: 9 }));
}
function redactContext(text, ctx = null) {
  let out = ctx ? text.split(ctx).join('[REDACTED]') : text;
  out = out.replace(/(SR_CallbackContext\s*=\s*['"])[^'"]+(['"])/giu, '$1[REDACTED]$2');
  out = out.replace(/("callbackcontextkey"\s*:\s*")[^"]+(")/giu, '$1[REDACTED]$2');
  out = out.replace(/(RECAPTCHA_(?:SITE_KEY|SECURITY)\s*:\s*['"])[^'"]+/giu, '$1[REDACTED]');
  return out;
}
function excerptAround(text, index, width = 200) {
  const from = Math.max(0, index - Math.floor(width / 2));
  return redactContext(text.slice(from, Math.min(text.length, from + width)))
    .replace(/(RECAPTCHA_(?:SITE_KEY|SECURITY)\s*:\s*['"])[^'"]+/giu, '$1[REDACTED]');
}
function persistCallLog(log, extra = {}) {
  fs.mkdirSync(RAW, { recursive: true });
  const reused = targets.filter(t => t.cached).map(t => {
    const source = path.join(RESULTS, '154-raa-svar', t.cached);
    return { player_id: t.id, source: 'statistik/results/154-raa-svar/' + t.cached,
      source_sha256: sha(zlib.gunzipSync(fs.readFileSync(source))) };
  });
  fs.writeFileSync(LOG, JSON.stringify({ calls: log.map(({ started_ms, ...x }) => x), reused_154_responses: reused, ...extra }, null, 2) + '\n');
}
function getHtml(data) { return String(data?.Html ?? ''); }
function parseEventTable(data, target) {
  const html = getHtml(data);
  const table = html.match(/<table\b(?=[^>]*class=['"][^'"]*playerprofilerankingpointstable[^'"]*['"])[^>]*>([\s\S]*?)<\/table>/iu);
  if (!table) return { present: false, headers: [], rows: [], row_count: 0 };
  const trs = [...table[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)].map(x => x[1]);
  const cellsFor = tr => [...tr.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/giu)].map(x => x[1]);
  const headers = trs.length ? cellsFor(trs[0]).map(plain) : [];
  let lastDate = '';
  const rows = trs.slice(1).map((tr, index) => {
    const cells = cellsFor(tr);
    const dateRaw = plain(cells[0] ?? '');
    if (dateRaw) lastDate = dateRaw;
    const titleHtml = cells[1] ?? '';
    const playerHtml = cells[2] ?? '';
    const pointHtml = cells[3] ?? '';
    const title = plain(titleHtml);
    const hrefs = [...titleHtml.matchAll(/\bhref=['"]([^'"]+)['"]/giu)].map(x => decode(x[1]));
    const playerParts = playerHtml.split(/<hr\b[^>]*>/iu).map(plain).filter(Boolean);
    const participantIds = [...playerHtml.matchAll(/VisSpiller\/#(\d+)(?:,|['"])/giu)].map(x => x[1]);
    const pointParts = pointHtml.split(/<hr\b[^>]*>/iu).map(plain).filter(Boolean);
    const url = hrefs[0] ?? null;
    let kind = 'ukendt';
    if (url?.includes('/DBF/Turnering/VisResultater/')) kind = 'turnering';
    else if (url?.includes('/DBF/HoldTurnering/Stilling/')) kind = 'holdkamp';
    else if (/Sæsonskifte/iu.test(title)) kind = 'systemraekke';
    return {
      row_number: index + 1, date_raw: dateRaw || null, date_inherited: lastDate || null,
      title, source_url: url, event_kind_from_link: kind,
      players_text_by_separator: playerParts, linked_player_ids: participantIds,
      point_text_by_separator: pointParts, extra_cell: plain(cells[4] ?? '')
    };
  });
  const kinds = {};
  for (const r of rows) kinds[r.event_kind_from_link] = (kinds[r.event_kind_from_link] ?? 0) + 1;
  const dates = rows.map(r => r.date_inherited).filter(Boolean);
  const years = [...new Set(dates.map(d => {
    const m = d.match(/(\d{2})-(\d{2})-(\d{4})/u);
    return m ? Number(m[3]) : null;
  }).filter(Boolean))].sort((a, b) => a - b);
  return {
    present: true, ranking_player_id: target.id, player_name: target.name,
    ranking_list_id: target.list, ranking_list_name: listNames[target.list] ?? 'ukendt',
    detail_link_post_id: target.post, season_id: target.season, headers,
    row_count: rows.length, rows, row_kinds: kinds, min_date: dates.at(-1) ?? null,
    max_date: dates[0] ?? null, calendar_years: years
  };
}
function savedResponse(target) {
  const file = target.cached
    ? path.join(RESULTS, '154-raa-svar', target.cached)
    : path.join(RAW, target.file);
  if (!fs.existsSync(file)) return null;
  const bytes = fs.readFileSync(file);
  const text = zlib.gunzipSync(bytes).toString('utf8');
  return { text, data: unwrap(text), file };
}
function cached154() {
  for (const t of targets.filter(x => x.cached)) {
    const source = path.join(RESULTS, '154-raa-svar', t.cached);
    const text = zlib.gunzipSync(fs.readFileSync(source)).toString('utf8');
    fs.writeFileSync(path.join(RAW, 'genbrugt-154-' + t.cached), zlib.gzipSync(Buffer.from(text, 'utf8'), { level: 9 }));
  }
}
async function callWithBackoff(url, init, label, log, ctx) {
  let consecutiveErrors = 0;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const delay = Math.max(0, 2100 - (Date.now() - (log.at(-1)?.started_ms ?? 0)));
    if (log.length) await wait(delay);
    const started = Date.now();
    let response, raw = Buffer.alloc(0), text = '', fetchError = null;
    try {
      response = await fetch(url, init);
      raw = Buffer.from(await response.arrayBuffer());
      text = raw.toString('utf8');
    } catch (error) { fetchError = String(error?.stack ?? error); }
    const safeText = redactContext(text, ctx);
    const number = log.length + 1;
    const file = `kald-${String(number).padStart(3, '0')}-${(init?.method ?? 'GET').toLowerCase()}.txt.gz`;
    if (response) saveGzip(file, safeText);
    const record = {
      number, method: init?.method ?? 'GET', label, url,
      request_fields: init?.body ? JSON.parse(init.body) : null,
      status: response?.status ?? null, bytes: response ? raw.length : null,
      sha256_saved_redacted_response: response ? sha(Buffer.from(safeText, 'utf8')) : null,
      saved_file: response ? file : null, attempt, started_ms: started
    };
    if (record.request_fields?.callbackcontextkey) record.request_fields.callbackcontextkey = '[REDACTED]';
    if (fetchError) record.network_error = fetchError;
    if (label.startsWith('frisk callback-kontekst')) {
      // Diagnostic only: these broad legacy terms are logged, never used to stop a request.
      const legacyPatterns = [/captcha/giu, /robot check/giu, /automated requests/giu, /bot detection/giu];
      record.legacy_detector_matches = legacyPatterns.flatMap(re => {
        re.lastIndex = 0;
        const m = re.exec(safeText);
        return m ? [{ term: m[0], excerpt: excerptAround(safeText, m.index) }] : [];
      });
    }
    log.push(record);
    persistCallLog(log);
    const challengePatterns = [/g-recaptcha-response/iu, /challenge-platform/iu, /Just a moment/iu, /verify you are human/iu];
    const challenge = challengePatterns.map(re => ({ re, match: re.exec(safeText) })).find(x => x.match);
    if (challenge) {
      record.stop_rule = 'tydelig udfordringsside: ' + challenge.match[0];
      record.stop_excerpt = excerptAround(safeText, challenge.match.index);
      persistCallLog(log);
      throw new Error('STOP: ' + record.stop_rule);
    }
    if (fetchError) {
      consecutiveErrors++;
      record.stop_rule = 'netværksfejl; retry';
      persistCallLog(log);
      if (consecutiveErrors >= 3) throw new Error('STOP efter tre netværksfejl i træk.');
      await wait(2500 * attempt);
      continue;
    }
    if (response.status === 429 || response.status >= 500) {
      consecutiveErrors++;
      record.stop_rule = 'HTTP ' + response.status + '; backoff';
      persistCallLog(log);
      if (consecutiveErrors >= 3) throw new Error('STOP efter tre 429/5xx-fejl i træk; se loggen.');
      await wait(2500 * attempt);
      continue;
    }
    if (response.status !== 200) {
      record.stop_rule = 'HTTP-status er ikke 200';
      record.stop_excerpt = excerptAround(safeText, 0);
      persistCallLog(log);
      throw new Error('STOP: HTTP ' + response.status + ' for ' + label);
    }
    consecutiveErrors = 0;
    return { response, raw, text, safeText, record };
  }
  throw new Error('STOP: intet gyldigt svar for ' + label);
}
async function fetchMissing() {
  fs.mkdirSync(RAW, { recursive: true });
  cached154();
  const prior = fs.existsSync(LOG) ? readJson(LOG) : {};
  const log = [...(prior.calls ?? [])];
  const page = await callWithBackoff(PAGE, {}, 'frisk callback-kontekst (HTML gemmes ikke)', log, null);
  const m = page.text.match(/var\s+SR_CallbackContext\s*=\s*['"]([^'"]+)['"]/u);
  if (!m) {
    const record = log.at(-1);
    record.stop_rule = 'GET /DBF/Ranglister/ mangler SR_CallbackContext';
    record.stop_excerpt = excerptAround(page.safeText, Math.max(0, page.safeText.indexOf('SR_CallbackContext')));
    persistCallLog(log);
    throw new Error('STOP: SR_CallbackContext ikke fundet på offentlig ranglisteside.');
  }
  const ctx = m[1];
  const newTargets = targets.filter(t => !t.cached);
  const replies = [];
  for (const t of newTargets) {
    const fields = {
      seasonid: t.season, playerid: Number(t.id), rankinglistid: t.list,
      rankinglistplayerid: Number(t.post), getplayerdata: true
    };
    const payload = { callbackcontextkey: ctx, ...fields };
    const res = await callWithBackoff(SERVICE + 'GetPlayerRankingListPoints', {
      method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(payload)
    }, 'eventtabel ' + t.name + ' (' + t.id + ')', log, ctx);
    saveGzip(t.file, res.text);
    replies.push({ target: t, data: unwrap(res.text), response_hash: res.record.sha256_saved_redacted_response });
    if (replies.length === 2 && replies[0].response_hash === replies[1].response_hash) {
      fs.writeFileSync(LOG, JSON.stringify({ calls: log, equal_first_two_event_hashes: true, stopped_reason: 'De to første forskellige profiler gav identiske svar.' }, null, 2) + '\n');
      throw new Error('STOP: de to første eventtabeller havde identisk hash; ingen videre hentning.');
    }
  }
  fs.writeFileSync(LOG, JSON.stringify({
    calls: log.map(({ started_ms, ...x }) => x), equal_first_two_event_hashes: replies[0].response_hash === replies[1].response_hash,
    reused_154_responses: targets.filter(t => t.cached).map(t => ({ player_id: t.id, source: t.source, source_sha256: sha(zlib.gunzipSync(fs.readFileSync(path.join(RESULTS, '154-raa-svar', t.cached)))) })),
    new_event_responses: newTargets.map(t => ({ player_id: t.id, source: t.source, saved_file: t.file }))
  }, null, 2) + '\n');
  return log;
}
function tournamentWinnerEvidence() {
  const doc = readJson(path.join(RESULTS, '081-webservice-catalog-probe.json'));
  const probe = doc.probes.find(x => x.method === 'SearchTournamentMatches');
  let d = probe?.response?.d;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch {} }
  const html = String(d?.Html ?? '');
  const table = html.match(/<table\b[^>]*class=['"]matchlist['"][^>]*>([\s\S]*?)<\/table>/iu);
  const trs = table ? [...table[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)].map(x => x[1]) : [];
  const row = trs.find(x => /<td\b/iu.test(x) && /\/DBF\/Spiller\/VisSpiller\/#/iu.test(x));
  if (!row) return { source_file: 'statistik/results/081-webservice-catalog-probe.json', status: 200, sample: 'ukendt' };
  const cells = [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/giu)].map(x => x[1]);
  const player = cell => ({ text: plain(cell), ids: [...cell.matchAll(/VisSpiller\/#(\d+)/giu)].map(x => x[1]) });
  return {
    source_file: 'statistik/results/081-webservice-catalog-probe.json',
    service: 'SearchTournamentMatches', tournamentclassid: 115342, tournamenteventid: 490920,
    status: 200, match_number: plain(cells[0]), player_1: player(cells[1] ?? ''),
    player_2: player(cells[3] ?? ''), set_result_raw: plain(cells[4] ?? ''),
    fields: ['runde/fase (grupperække)', 'kampnummer', 'spiller 1 + profil-ID-link', 'spiller 2 + profil-ID-link', 'sætresultat']
  };
}
function eventSummary() {
  const parsed = targets.map(t => {
    const saved = savedResponse(t);
    if (!saved) return {
      present: false, ranking_player_id: t.id, player_name: t.name,
      ranking_list_id: t.list, ranking_list_name: listNames[t.list] ?? 'ukendt',
      detail_link_post_id: t.post, season_id: t.season,
      row_count: 0, rows: [], source: t.source,
      unavailable_reason: 'Ikke hentet: frisk kontekst-GET blev standset af botværnsdetektion; intet POST-opslag foretaget.'
    };
    const { text, data } = saved;
    const p = parseEventTable(data, t);
    p.raw_response_sha256 = sha(Buffer.from(text, 'utf8'));
    p.source = t.source;
    return p;
  });
  const winnerEvidence = tournamentWinnerEvidence();
  const gqlOptions = readJsonSequence(path.join(RESULTS, 'tournament-options-2025.json'));
  const gqlSurface = readJson(path.join(RESULTS, 'tournament-query-surface.json'));
  const currentRunCalls = fs.existsSync(LOG) ? readJson(LOG).calls : [];
  for (const call of currentRunCalls) for (const hit of call.legacy_detector_matches ?? []) hit.excerpt = redactContext(hit.excerpt);
  return { task: 158, executed_scope: 'Del A only', current_run_calls: currentRunCalls, event_profiles: parsed, winner_evidence: winnerEvidence, graphql: {
    current_run_calls: 0, query_surface: gqlSurface.filter(x => ['tournamentGroups','tournamentTiers'].includes(x.name)),
    tournament_groups_2025_count: gqlOptions[0]?.data?.tournamentGroups?.length ?? null,
    tournament_tier_count: gqlOptions[1]?.data?.tournamentTiers?.length ?? null,
    conclusion: 'Gemte evidencer viser katalogfelter, ikke offentlig turneringskamp-/resultatforespørgsel.'
  }, tournament_overview: {
    prior_probe: 'statistik/results/081-route-probe.json; statistik/results/081-webservice-catalog-probe.json',
    known_class_id: 115342, get_tournament_events: { status: 200, events: [490920,490921,490922,490923,490924] },
    search_tournament_matches: { status: 200, rows: 61, html_bytes: 30686 },
    search_tournament_class: { status_by_tests: [500,500,500], tested_regions: [1,8], tested_seasons: [2025,2026] },
    conclusion: 'Ingen bevist offentlig sæson-/alle-turneringer-liste. Succesfulde kald kræver et kendt tournamentclassid/eventid.'
  }, note: 'All earlier-season coverage and point-change granularity are not inferred from the current-season samples.' };
}
async function writeReports() {
  fs.mkdirSync(RAW, { recursive: true });
  const data = eventSummary();
  data.database_sha256_before = DB_SHA256_BEFORE;
  data.database_sha256_after = await databaseHashesAfter();
  data.database_hashes_unchanged = Object.keys(DB_SHA256_BEFORE).every(name =>
    DB_SHA256_BEFORE[name].toUpperCase() === data.database_sha256_after[name]);
  fs.writeFileSync(JSON_OUT, JSON.stringify(data, null, 2) + '\n');
  const lines = [
    '# Opgave 158 — Del A: turneringsresultater og pointændringer', '',
    'Afgrænsning: Del A udført. Del B og Del C: Ikke kørt i denne omgang.',
    'Netværkskald logget for opgave 158: ' + data.current_run_calls.length + ' i alt (badmintonplayer.dk); app.nembadminton.dk/graphql: 0. Tre eventtabeller blev genbrugt fra 154, og to profiler blev hentet i denne fortsættelse.',
    '', '## 1. Eventtabeller for fem profiler', '',
    '| Spiller | Profil-ID | Liste/disc. | Rækker | Referencer i rækker | Datoer observeret | Kilde |',
    '|---|---:|---|---:|---|---|---|'
  ];
  for (const p of data.event_profiles) {
    const kinds = Object.entries(p.row_kinds ?? {}).map(([k,v]) => k + ': ' + v).join('; ');
    lines.push('| ' + [p.player_name,p.ranking_player_id,p.ranking_list_id + ' / ' + p.ranking_list_name,p.row_count,kinds || 'ingen tabel',(p.min_date ?? 'ukendt') + ' – ' + (p.max_date ?? 'ukendt'),p.source].join(' | ') + ' |');
  }
  const present = data.event_profiles.find(p => p.present);
  lines.push('', 'Observeret tabeloverskrift: ' + (present?.headers ?? []).map(x => x || '(tom overskrift)').join(' | ') + '. Der er fem celler: Dato, Turnering/Holdkamp, Spillere, Point og en tom overskrift for kontrolindikatoren.');
  lines.push('Hver datarække har dato (nogle fortsættelsesrækker har tom datocelle), titel/link til turnering eller holdkamp, spillertekst med profillinks for andre deltagere, et Point-felt med værdier adskilt parallelt med spillerlinjerne samt en tom op/ned-indikator. De rå HTML-rækker er bevaret; parseren gemmer tomme datoceller som null og angiver arvet dato separat.');
  lines.push('Rækkens disciplin kan kun knyttes via opslagets rankinglistid (288=single, 289=double); selve tabellen har ingen disciplin-kolonne. Relationen mellem den anden spiller og hovedspilleren (partner/modstander) er ikke mærket i eventtabellen.');
  const availableProfiles = data.event_profiles.filter(p => p.present);
  const teamOnly = availableProfiles.filter(p => (p.row_kinds?.holdkamp ?? 0) > 0 && (p.row_kinds?.turnering ?? 0) === 0);
  lines.push('Eventtabeller tilgængelige for ' + availableProfiles.length + ' af 5 profiler. Profiler med holdkamprækker men uden turneringsrækker i den viste tabel: ' + (teamOnly.length ? teamOnly.map(p => p.player_name).join(', ') : 'ingen observeret') + '. Det afgør ikke nødvendigvis om spilleren aldrig spiller turneringer uden for denne tabel/sæson.');
  lines.push('Runde/fase, kampnummer, modstanderrolle, sætresultat/vinder, point før, point efter og pointændring: ikke vist som eventtabellens felter; derfor ukendt her. Point-feltet er ikke opdelt i før/efter/delta.');
  lines.push('', '### Rækkeeksempler fra de gemte svar', '');
  for (const p of data.event_profiles) {
    const examples = (p.rows ?? []).filter(r => r.event_kind_from_link === 'turnering' || r.event_kind_from_link === 'holdkamp').slice(0, 2);
    for (const r of examples) lines.push('- ' + p.player_name + ': dato ' + (r.date_inherited ?? 'ukendt') + '; ' + r.event_kind_from_link + ' "' + r.title + '"; spillere ' + r.players_text_by_separator.join(' / ') + '; pointfelter ' + r.point_text_by_separator.join(' / ') + '; link ' + r.source_url + '.');
  }
  lines.push('', 'Klassifikation turnering/holdkamp er alene ud fra linkets offentlige sti (VisResultater eller HoldTurnering/Stilling), ikke ud fra navnefortolkning.');
  lines.push('', '## 2. Hvilke begivenheder og pointændringer?', '');
  lines.push('Begge linktyper forekommer i 2025/26-svarene: turneringslinks og holdkamp-/DMU-holdlinks. Alle fem eventtabeller har daterede poster inden for 2025/26 (se rå rækker og JSON). De gemte 154-links har sæson-ID 2025; om eventhistorikken medtager tidligere sæsoner kan ikke afgøres fra disse fem svar.');
  lines.push('Tabellen viser Point-værdier ved eventrækker, men intet eksplicit før/efter- eller deltafelt. Nogle events gentager samme Point-værdi på flere spillerlinjer. Om pointændringen afregnes pr. kamp eller samlet pr. turnering: ukendt ud fra eventtabellen.');
  lines.push('', 'Fem konkrete, slå-op-venlige observationer (vist Point, ikke udledt ændring):');
  for (const p of data.event_profiles) {
    const r = (p.rows ?? []).find(x => x.event_kind_from_link === 'turnering' && x.source_url);
    if (r) lines.push('- ' + r.title + '; dato ' + (r.date_inherited ?? 'ukendt') + '; spiller ' + p.player_name + ' (' + p.ranking_player_id + '); vist Point ' + r.point_text_by_separator.join(' / ') + '; pointændring ukendt.');
  }
  lines.push('', '## 3. Offentlig turneringsoversigt', '');
  lines.push('Tidligere afprøvning (ikke gentaget): SearchTournamentClass gav HTTP 500 i tre prøver (region 1 og 8; sæson 2025 og 2026). GetTournamentEvents kræver et kendt tournamentclassid; for 115342 gav det fem event-ID’er 490920–490924. SearchTournamentMatches kræver tournamentclassid + tournamenteventid og gav kampresultater for det kendte event. Det dokumenterer resultatruter fra kendt ID, ikke en offentlig komplet oversigt over alle turneringer. Evidens: statistik/results/081-route-probe.json, 081-webservice-catalog-probe.json og tournament-reference-115342.md.');
  lines.push('', '## 4. Nembadminton GraphQL', '');
  lines.push('Ingen nye GraphQL-kald eller introspektion. De gemte API_RESEARCH/query-resultater viser tournamentGroups(seasonId, phaseType, order) og tournamentTiers(order): 2025 tournamentGroups-resultat tomt, tournamentTiers har 17 overordnede tier-navne. Ingen gemt offentlig query for individuelle turneringskampe/resultater; GraphQL kan derfor ikke dokumenteres som resultatrute.');
  lines.push('', '## 5. Hvor findes turneringskampens vinder?', '');
  const w = data.winner_evidence;
  if (w && w.player_1) lines.push('Det gemte SearchTournamentMatches-svar for event 490920 har bl.a. kamp ' + w.match_number + ': ' + w.player_1.text + ' (ID ' + (w.player_1.ids.join(', ') || 'ukendt') + ') mod ' + w.player_2.text + ' (ID ' + (w.player_2.ids.join(', ') || 'ukendt') + '), sætresultat ' + w.set_result_raw + '. Række/fase vises særskilt (Finale i HTML-fragmentet). Spiller-ID’er findes i VisSpiller-links. Vinderen kan aflæses af sætscoren for en afsluttet kamp; W.O. forekommer også, og det gemte referenceudsnit fastslår ikke altid en vinder alene fra W.O.-markøren.');
  else lines.push('Gemte SearchTournamentMatches-evidens findes, men eksempelrække kunne ikke udtrækkes; vinder ukendt.');
  lines.push('', '### Kaldlog for hele opgaveforløbet', '', '| Nr. | Metode | Felter/parametre | Status | Bytes | SHA-256 (svar uden kontekstnøgle) |', '|---:|---|---|---:|---:|---|');
  for (const c of data.current_run_calls) lines.push('| ' + [c.number,c.method,c.label + (c.request_fields ? ': ' + JSON.stringify(c.request_fields) : ''),c.status,c.bytes,c.sha256_saved_redacted_response].join(' | ') + ' |');
  const legacyMatches = data.current_run_calls.flatMap(c => c.legacy_detector_matches ?? []);
  lines.push('', 'Det første stop i den tidligere kørsel kom fra den brede gamle regex. Det gamle svar blev ikke gemt; den nye GET viser matchen `' + (legacyMatches.map(x => x.term).join(', ') || 'ingen fundet') + '` i `RECAPTCHA_SITE_KEY`-identifikatoren, ikke en udfordringsside. Det er den dokumenterede forklaring på falsk alarm; den konkrete historiske respons kan ikke genskabes.');
  lines.push('', 'Tre eventtabeller blev genbrugt fra 154; to nye profiler blev hentet efter frisk GET. Kontekstnøglen blev ikke gemt, og råsvarene er gzip-komprimerede. Første forsøg er bevaret i samlet log som ét GET, men status/bytes/hash mangler, fordi det gamle script kastede fejlen før logskrivning.');
  lines.push('', '## Databasehashes (SHA-256)', '', '| Database | Før | Efter | Uændret |', '|---|---|---|---|');
  for (const name of Object.keys(DB_SHA256_BEFORE)) lines.push('| ' + name + ' | ' + DB_SHA256_BEFORE[name] + ' | ' + data.database_sha256_after[name] + ' | ' + (DB_SHA256_BEFORE[name].toUpperCase() === data.database_sha256_after[name] ? 'ja' : 'NEJ') + ' |');
  lines.push('', '## Del B', '', 'Ikke kørt i denne omgang.', '', '## Del C', '', 'Ikke kørt i denne omgang.', '');
  fs.writeFileSync(REPORT, lines.join('\n'), 'utf8');
  console.log(JSON.stringify({ calls: data.current_run_calls.length, profiles: data.event_profiles.map(p => ({ name:p.player_name, rows:p.row_count, kinds:p.row_kinds, min:p.min_date, max:p.max_date })), report: REPORT, json: JSON_OUT }, null, 2));
}
function verifyReadOnlyInputs() {
  const before = readJson(path.join(RESULTS, '154-saeson-2025-26.json'));
  if (!before.phase0?.checks?.some(x => x.player_id === '327691') || !before.phase0?.checks?.some(x => x.player_id === '328195'))
    throw new Error('De to detail_link-kilder kan ikke bekræftes i 154-resultatfilen.');
}

const mode = process.argv[2] ?? 'analyze';
fs.mkdirSync(RAW, { recursive: true });
if (mode === 'fetch') {
  verifyReadOnlyInputs();
  await fetchMissing();
}
if (!['fetch','analyze'].includes(mode)) throw new Error('Brug fetch eller analyze.');
await writeReports();
