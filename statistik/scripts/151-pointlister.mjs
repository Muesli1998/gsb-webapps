import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createReadStream } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const root = process.cwd();
const outDir = path.join(root, 'statistik/results/151-raa-svar');
const jsonPath = path.join(root, 'statistik/results/151-pointlister.json');
const mdPath = path.join(root, 'statistik/results/151-pointlister.md');
const cardPath = path.join(root, 'work/aabne/151-ranglistepoint-pointlister-og-filtre.md');
const pageUrl = 'https://badmintonplayer.dk/DBF/Ranglister/';
const apiUrl = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/GetRankingListPlayers';
const maxRequests = 100;
const pauseMs = 2100;
const expectedHashes = {
  'gsb-statistik-normalized.db': '49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E',
  'liga-landskab.db': '9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C',
  'rangliste-historik.db': '6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F',
  'national-spillere.db': '1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E',
};
const dbPaths = Object.fromEntries(Object.keys(expectedHashes).map((name) => [name, path.join(root, 'statistik/data', name)]));
const hashFile = async (file) => {
  const h = crypto.createHash('sha256');
  for await (const chunk of createReadStream(file)) h.update(chunk);
  return h.digest('hex').toUpperCase();
};
const hashText = (text) => crypto.createHash('sha256').update(text).digest('hex');
const digestAll = async () => Object.fromEntries(await Promise.all(Object.entries(dbPaths).map(async ([name, file]) => [name, await hashFile(file)])));
const clean = (s) => String(s ?? '').normalize('NFKC').toLocaleLowerCase('da-DK').trim().replace(/\s+/gu, ' ');
const isoDate = (value) => {
  let m = String(value ?? '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/u);
  if (m) return `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}`;
  m = String(value ?? '').match(/^(\d{4})-(\d{2})-(\d{2})$/u);
  return m ? m[0] : null;
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const requests = [];
const result = {
  title: 'Opgave 151 — pointlister og filtre', generated_at: new Date().toISOString(),
  request_limit: maxRequests, requests, status: 'kører', databases_before: null,
  databases_after: null, database_hashes_unchanged: null, questions: []
};
let callbackContext = null;
let lastRequestStarted = 0;
let consecutiveErrors = 0;
let stopped = false;
let local = null;
const probes = new Map();

function writeRequestCheckpoint() {
  const snapshot={...result,status:'in_progress',request_count:requests.length,request_limit:maxRequests,requests};
  const temporary=`${jsonPath}.tmp`;
  fs.writeFileSync(temporary,`${JSON.stringify(snapshot,null,2)}\n`);
  fs.renameSync(temporary,jsonPath);
}

function botGuard(text, status) {
  if ([401, 403].includes(status)) return `HTTP ${status} — adgang afvist`;
  const body = String(text ?? '');
  const checks = [
    [/verify\s+you\s+are\s+human|unusual\s+traffic|automated\s+requests|bot\s+detected|access\s+denied/iu, 'bot-/adgangsafvisning'],
    [/captcha\s+(?:required|needed|validation|verification)|g-recaptcha-response|h-captcha-response|challenge-platform/iu, 'CAPTCHA/udfordring'],
    [/bot.?token.{0,60}(?:required|missing|needed)|(?:required|missing|needed).{0,60}bot.?token/iu, 'bot-token-krav'],
    [/cookie\s+(?:required|missing|blocked)|consent\s+(?:required|missing)/iu, 'cookie-/samtykkekrav'],
  ];
  for (const [pattern, label] of checks) if (pattern.test(body)) return label;
  return null;
}
function redact(text) { return callbackContext ? String(text).split(callbackContext).join('[CALLBACK_CONTEXT_REDACTED]') : String(text); }
function unwrap(text) {
  let value;
  try { value = JSON.parse(text); } catch { return text; }
  for (let i = 0; i < 4; i++) {
    if (value && typeof value === 'object' && 'd' in value) value = value.d;
    else if (typeof value === 'string') { try { value = JSON.parse(value); } catch { break; } }
    else break;
  }
  return value;
}
function decodeEntities(value) {
  return String(value).replace(/&(#x[\da-f]+|#\d+|amp|nbsp|lt|gt|quot|#39);/giu, (entity, key) => {
    const k = key.toLowerCase();
    if (k === 'amp') return '&'; if (k === 'nbsp') return ' '; if (k === 'lt') return '<'; if (k === 'gt') return '>'; if (k === 'quot') return '"'; if (k === '#39') return "'";
    const cp = k.startsWith('#x') ? Number.parseInt(k.slice(2), 16) : Number.parseInt(k.slice(1), 10);
    return Number.isFinite(cp) ? String.fromCodePoint(cp) : entity;
  });
}
function parseRows(html) {
  return [...String(html ?? '').matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)].flatMap((rowMatch) => {
    const cells = [...rowMatch[1].matchAll(/<(td|th)\b([^>]*)>([\s\S]*?)<\/\1>/giu)].map((m) => ({
      attrs: m[2], html: m[3],
      text: decodeEntities(m[3].replace(/<[^>]+>/gu, ' ').replace(/\s+/gu, ' ').trim()),
      className: m[2].match(/\bclass\s*=\s*['"]([^'"]*)['"]/iu)?.[1] ?? ''
    }));
    const byClass = (token) => cells.find((c) => new RegExp(`(?:^|\\s)${token}(?:\\s|$)`, 'iu').test(c.className));
    const rankCell = byClass('rank');
    if (!rankCell || !/^\d+$/u.test(rankCell.text)) return [];
    const member = byClass('playerid');
    const nameCell = byClass('name')?.text ?? '';
    const comma = nameCell.lastIndexOf(', ');
    const pointsCell = cells.filter((c) => /(?:^|\s)points(?:\s|$)/iu.test(c.className)).map((c) => c.text).find((t) => /^-?\d+(?:[.,]\d+)?$/u.test(t)) ?? null;
    const href = rowMatch[1].match(/href\s*=\s*['"][^'"]*\/DBF\/Spiller\/VisSpiller\/#(\d+)/iu)?.[1] ?? null;
    return [{
      rank: Number(rankCell.text), member_number: member?.text ?? null,
      name: (comma >= 0 ? nameCell.slice(0, comma) : nameCell).trim(),
      club: comma >= 0 ? nameCell.slice(comma + 2).trim() : null,
      class: byClass('clas')?.text || null,
      points: pointsCell === null ? null : Number(pointsCell.replace(',', '.')),
      player_id: href
    }];
  });
}
function rowsFrom(data) { return data && typeof data === 'object' && typeof data.Html === 'string' ? parseRows(data.Html) : []; }
function versionList(data) {
  return Array.isArray(data?.Versions) ? data.Versions.map((v) => ({ label: v.Text ?? null, value: v.Value ?? null, selected: v.Selected ?? false })) : [];
}
function pagesFrom(data) {
  const idx = [...String(data?.Html ?? '').matchAll(/SelectRankingListPage\((\d+)\)/giu)].map((m) => Number(m[1]));
  return { page_count: idx.length ? Math.max(...idx) + 1 : 1, last_page_index: idx.length ? Math.max(...idx) : 0, links: [...new Set(idx)].sort((a, b) => a - b) };
}
function baseBody(ctx, listId = '288', param = 'M', changes = {}) {
  return {
    callbackcontextkey: ctx, rankinglistagegroupid: '15', rankinglistid: String(listId), seasonid: '2026',
    rankinglistversiondate: '', agegroupid: '', classid: '', gender: '', clubid: '', searchall: false,
    regionid: '', pointsfrom: '', pointsto: '', rankingfrom: '', rankingto: '', birthdatefromstring: '',
    birthdatetostring: '', agefrom: '', ageto: '', playerid: '', param, pageindex: '0', sortfield: '0',
    getversions: true, getplayer: true, ...changes
  };
}
async function request(method, url, body, label) {
  if (requests.length >= maxRequests) throw new Error(`STOP: max ${maxRequests} forespørgsler nået`);
  if (new URL(url).hostname !== 'badmintonplayer.dk') throw new Error(`STOP: vært uden for tilladelsen: ${url}`);
  const wait = Math.max(0, pauseMs - (Date.now() - lastRequestStarted));
  if (lastRequestStarted && wait) await delay(wait);
  lastRequestStarted = Date.now();
  const headers = method === 'GET'
    ? { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36', accept: 'text/html,application/xhtml+xml' }
    : { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36', 'content-type': 'application/json; charset=UTF-8', accept: '*/*', 'x-requested-with': 'XMLHttpRequest', origin: 'https://badmintonplayer.dk', referer: pageUrl };
  const baseline = body ? baseBody('[redacted]', body.rankinglistid, body.param, { seasonid: body.seasonid }) : null;
  const entry = {
    number: requests.length + 1, label, method, url, started_at: new Date(lastRequestStarted).toISOString(),
    fields_changed: body ? Object.fromEntries(Object.entries(body).filter(([k, v]) => k !== 'callbackcontextkey' && JSON.stringify(v) !== JSON.stringify(baseline[k]))) : null,
    request_fields: body ? Object.fromEntries(Object.entries(body).map(([k, v]) => [k, k === 'callbackcontextkey' ? '[REDACTED]' : v])) : null
  };
  requests.push(entry);
  writeRequestCheckpoint();
  try {
    const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined, redirect: 'manual', credentials: 'omit' });
    const text = await response.text();
    entry.status = response.status;
    entry.response_bytes = Buffer.byteLength(text);
    entry.response_sha256 = hashText(text);
    entry.content_type = response.headers.get('content-type');
    entry.redirect = response.status >= 300 && response.status < 400 ? response.headers.get('location') : null;
    const safe = redact(text);
    const suffix = method === 'GET' ? 'page.html' : `q${String(entry.number).padStart(2, '0')}-${label.replace(/[^a-z0-9]+/giu, '-')}.txt`;
    fs.writeFileSync(path.join(outDir, `${String(entry.number).padStart(2, '0')}-${suffix}`), safe);
    entry.saved_response = `statistik/results/151-raa-svar/${String(entry.number).padStart(2, '0')}-${suffix}`;
    const guard = botGuard(text, response.status);
    if (guard) { entry.stopped_on_guard = guard; stopped = true; result.stop_reason = `STOP: ${guard}`; writeRequestCheckpoint(); throw new Error(result.stop_reason); }
    if (entry.redirect) { stopped = true; result.stop_reason = `STOP: redirect ikke fulgt (${entry.redirect})`; writeRequestCheckpoint(); throw new Error(result.stop_reason); }
    if (!response.ok) {
      consecutiveErrors++;
      entry.error = `HTTP ${response.status}`;
      if (response.status === 429 || response.status >= 500) await delay(5000);
      if (consecutiveErrors >= 3) { stopped = true; result.stop_reason = 'STOP: tre HTTP-fejl i træk'; throw new Error(result.stop_reason); }
      writeRequestCheckpoint();
      return { entry, text, data: null, rows: [], versions: [], page: { page_count: null, last_page_index: null, links: [] } };
    }
    consecutiveErrors = 0;
    entry.completed_at = new Date().toISOString();
    const data = method === 'POST' ? unwrap(text) : text;
    const rows = method === 'POST' ? rowsFrom(data) : [];
    const versions = method === 'POST' ? versionList(data) : [];
    const page = method === 'POST' ? pagesFrom(data) : null;
    if (method === 'POST') entry.result_summary = { rows: rows.length, point_rows: rows.filter((r) => r.points !== null).length, classes: [...new Set(rows.map((r) => r.class).filter(Boolean))].sort(), page_count: page.page_count, dated_versions: versions.filter((v) => v.value).length };
    writeRequestCheckpoint();
    return { entry, text, data, rows, versions, page };
  } catch (error) {
    entry.error ??= String(error?.message ?? error);
    entry.completed_at = new Date().toISOString();
    writeRequestCheckpoint();
    if (/STOP:/u.test(entry.error)) throw error;
    consecutiveErrors++;
    if (consecutiveErrors >= 3) { stopped = true; result.stop_reason = 'STOP: tre netværksfejl i træk'; throw new Error(result.stop_reason); }
    return { entry, text: null, data: null, rows: [], versions: [], page: { page_count: null, last_page_index: null, links: [] } };
  }
}

function load150Response(report, label) {
  const entry = report.requests.find((r) => r.label === label);
  if (!entry?.saved_response) return null;
  const parsed = unwrap(fs.readFileSync(path.join(root, entry.saved_response), 'utf8'));
  return { label, source_request: entry.number, source_file: entry.saved_response, data: parsed, rows: rowsFrom(parsed), versions: versionList(parsed), page: pagesFrom(parsed) };
}
function restoreSavedProbes(saved) {
  probes.clear();
  const records = [];
  for (const entry of saved.requests) {
    if (entry.method !== 'POST' || entry.status !== 200 || !entry.saved_response) continue;
    const data = unwrap(fs.readFileSync(path.join(root, entry.saved_response), 'utf8'));
    const rowData = rowsFrom(data);
    const page = pagesFrom(data);
    const index = Number(entry.request_fields?.pageindex ?? 0);
    records.push({ label: entry.label, entry, rows: rowData, versions: versionList(data), page, data, pageIndices: [index] });
  }
  for (const rec of records) probes.set(rec.label, rec);
  for (const rec of records) {
    const baseGsb = rec.label.match(/^GSB (\d+) ([MK]) pageindex (\d+)$/u);
    const baseAge = rec.label.match(/^agegroupid (\d+) ([MK]) pageindex (\d+)$/u);
    if (baseGsb) {
      const target = probes.get(`GSB ${baseGsb[1]} ${baseGsb[2]}`);
      if (target) { target.allPages ??= [...target.rows]; target.allPages.push(...rec.rows); target.pageIndices.push(Number(baseGsb[3])); }
    }
    if (baseAge) {
      const target = probes.get(`agegroupid ${baseAge[1]} ${baseAge[2]}`);
      if (target) { target.allPages ??= [...target.rows]; target.allPages.push(...rec.rows); target.pageIndices.push(Number(baseAge[3])); }
    }
  }
  for (const label of ['GSB 288 M','GSB 288 K','GSB 289 M','GSB 289 K','GSB 292 M','GSB 292 K','agegroupid 4 M','agegroupid 4 K']) {
    const rec=probes.get(label); if(rec){rec.allPages ??= [...rec.rows];rec.pageIndices=[...new Set(rec.pageIndices)].sort((a,b)=>a-b);}
  }
}
function loadLocalData() {
  const norm = new DatabaseSync(dbPaths['gsb-statistik-normalized.db'], { readOnly: true });
  const nat = new DatabaseSync(dbPaths['national-spillere.db'], { readOnly: true });
  const hist = new DatabaseSync(dbPaths['rangliste-historik.db'], { readOnly: true });
  try {
    const youthAgeIds = [2, 3, 4, 5, 6, 7, 18];
    const matchRows = norm.prepare(`SELECT tm.team_match_id,tm.external_match_id,tm.season_id,tm.round_date,tm.home_name_raw,tm.away_name_raw,t.name_raw AS gsb_team,c.age_group_id
      FROM team_matches tm JOIN competitions c USING(competition_id) JOIN teams t ON t.team_id=tm.gsb_team_id
      WHERE tm.season_id IN (2025,2026) AND c.age_group_id IN (${youthAgeIds.join(',')}) ORDER BY tm.season_id,c.age_group_id,tm.round_date`).all();
    const timelineBySeason = Object.values(matchRows.reduce((acc, row) => {
      const key = String(row.season_id); acc[key] ??= { season_id: row.season_id, matches: 0, valid_dates: new Set(), undated_matches: 0 };
      acc[key].matches++;
      if (/^\d{4}-\d{2}-\d{2}$/u.test(row.round_date ?? '')) acc[key].valid_dates.add(row.round_date); else acc[key].undated_matches++;
      return acc;
    }, {})).map((x) => ({ ...x, distinct_dates: x.valid_dates.size, valid_dates: [...x.valid_dates].sort() }));
    const u13Matches = matchRows.filter((x) => x.season_id === 2025 && x.age_group_id === 4);
    const u13Ids = u13Matches.map((x) => String(x.external_match_id));
    const natMatches = new Map();
    const participants = [];
    for (let i = 0; i < u13Ids.length; i += 300) {
      const part = u13Ids.slice(i, i + 300); const marks = part.map(() => '?').join(',');
      nat.prepare(`SELECT external_match_id,home_team_raw,away_team_raw FROM matches WHERE external_match_id IN (${marks})`).all(...part).forEach((x) => natMatches.set(String(x.external_match_id), x));
      participants.push(...nat.prepare(`SELECT e.external_match_id,e.external_player_id,e.team_side,e.discipline_code,p.name_raw,p.gender_status
        FROM player_match_extras e JOIN players p USING(external_player_id) WHERE e.external_match_id IN (${marks})`).all(...part));
    }
    const opponentMap = new Map();
    let sideEvidenceMatches = 0;
    let exactNationalSideMatches = 0;
    let normalizedSideFallbackMatches = 0;
    let unmatchedSideMatches = 0;
    const participantsByMatch = new Map();
    for (const player of participants) {
      const key = String(player.external_match_id);
      if (!participantsByMatch.has(key)) participantsByMatch.set(key, []);
      participantsByMatch.get(key).push(player);
    }
    for (const match of u13Matches) {
      const homeIsGsb = clean(match.home_name_raw) === clean(match.gsb_team);
      const awayIsGsb = clean(match.away_name_raw) === clean(match.gsb_team);
      if (homeIsGsb === awayIsGsb) { unmatchedSideMatches++; continue; }
      const gsbSide = homeIsGsb ? 'home' : 'away';
      const sourceMatch = natMatches.get(String(match.external_match_id));
      if (!sourceMatch) { unmatchedSideMatches++; continue; }
      sideEvidenceMatches++;
      const sourceHomeIsGsb = clean(sourceMatch.home_team_raw) === clean(match.gsb_team);
      const sourceAwayIsGsb = clean(sourceMatch.away_team_raw) === clean(match.gsb_team);
      const nationalGsbSide = sourceHomeIsGsb !== sourceAwayIsGsb
        ? (sourceHomeIsGsb ? 'hjemme' : 'ude')
        : (gsbSide === 'home' ? 'hjemme' : 'ude');
      if (sourceHomeIsGsb !== sourceAwayIsGsb) exactNationalSideMatches++;
      else normalizedSideFallbackMatches++;
      const opponentSide = nationalGsbSide === 'hjemme' ? 'ude' : 'hjemme';
      const team = nationalGsbSide === 'hjemme' ? sourceMatch.away_team_raw : sourceMatch.home_team_raw;
      for (const player of participantsByMatch.get(String(match.external_match_id)) ?? []) {
        if (player.team_side !== opponentSide) continue;
        const key = player.external_player_id ? `id:${player.external_player_id}` : `name:${clean(player.name_raw)}|club:${clean(team)}`;
        if (!opponentMap.has(key)) opponentMap.set(key, { external_player_id: player.external_player_id ?? null, name: player.name_raw, club: team, example_match_id: String(match.external_match_id), gender_status: player.gender_status ?? 'ukendt', side_source: sourceHomeIsGsb !== sourceAwayIsGsb ? 'national match team-name exact' : 'normalized GSB home/away fallback' });
      }
    }
    const opponents = [...opponentMap.values()];
    const participantSideCounts = participants.reduce((acc, p) => { const side=p.team_side||'NULL'; acc[side]=(acc[side]??0)+1; return acc; }, {});
    const histCounts = hist.prepare('SELECT discipline,COUNT(*) AS rows,COUNT(DISTINCT version_date) AS versions,MIN(version_date) AS oldest,MAX(version_date) AS newest FROM ranking_snapshots GROUP BY discipline ORDER BY discipline').all();
    const normPlayerCount = norm.prepare('SELECT COUNT(*) AS n FROM players').get().n;
    const historyPlayerCount = hist.prepare('SELECT COUNT(DISTINCT nembadminton_member_id) AS n FROM ranking_snapshots').get().n;
    return {
      timelineBySeason, matches: matchRows, totalYouthMatches: matchRows.length,
      totalDatedMatches: matchRows.filter((x) => /^\d{4}-\d{2}-\d{2}$/u.test(x.round_date ?? '')).length,
      allDistinctMatchDates: [...new Set(matchRows.map((x) => x.round_date).filter((x) => /^\d{4}-\d{2}-\d{2}$/u.test(x ?? '')))].sort(),
      u13Matches: { count: u13Matches.length, distinctDates: [...new Set(u13Matches.map((x) => x.round_date).filter((x) => /^\d{4}-\d{2}-\d{2}$/u.test(x ?? '')))].sort(), missingDates: u13Matches.filter((x) => !/^\d{4}-\d{2}-\d{2}$/u.test(x.round_date ?? '')).length, opponents, opponentsCount: opponents.length, sideEvidenceMatches, exactNationalSideMatches, normalizedSideFallbackMatches, unmatchedSideMatches, participantSideCounts },
      rankingHistory: { disciplineCounts: histCounts, distinctLinkedPlayersWithSnapshots: historyPlayerCount },
      localPlayerCount: normPlayerCount,
    };
  } finally { norm.close(); nat.close(); hist.close(); }
}

function analyze() {
  const report150 = JSON.parse(fs.readFileSync(path.join(root, 'statistik/results/150-ranglistepilot.json'), 'utf8'));
  const unfilteredLabels = new Map([
    ['288', 'baseline liste 288 param=M version/current side 0'],
    ['289', 'list289 param=M'], ['292', 'list292 param=M']
  ]);
  const unfilteredM = [...unfilteredLabels].map(([listId, label]) => {
    const saved = load150Response(report150, label);
    return { list_id: listId, param: 'M', source: 'Opgave 150 første response', source_file: saved?.source_file ?? null, rows_page0: saved?.rows.length ?? null, pages: saved?.page.page_count ?? null, pages_first_response_only: true };
  });
  const unfilteredK = [288,289,292].map((listId) => {
    const x = probes.get(`baseline ${listId} K`);
    return { list_id: String(listId), param: 'K', source: 'Opgave 151 første response', request_number: x?.entry.number ?? null, status: x?.entry.status ?? null, rows_page0: x?.rows.length ?? null, pages: x?.page.page_count ?? null, pages_first_response_only: true };
  });
  const sixListMatrix = [288,289,292].flatMap((listId) => ['M','K'].map((param) => {
    const x = probes.get(`GSB ${listId} ${param}`);
    const base = (param === 'M' ? unfilteredM : unfilteredK).find((b) => b.list_id === String(listId));
    const all = x?.allPages ?? x?.rows ?? [];
    return {
      list_id: String(listId), param, unfiltered_pages: base?.pages ?? null, unfiltered_source: base?.source ?? null,
      gsb_rows_observed: all.length, gsb_pages_total: x?.page.page_count ?? null, gsb_pages_fetched: x?.pageIndices?.length ?? (x ? 1 : 0),
      gsb_points_rows: all.filter((r) => r.points !== null).length, gsb_profile_id_rows: all.filter((r) => r.player_id !== null).length,
      gsb_clubs: [...new Set(all.map((r) => r.club).filter(Boolean))].sort(), classes: [...new Set(all.map((r) => r.class).filter(Boolean))].sort(),
      first_five_rows: all.slice(0,5), status: x?.entry.status ?? null, response_pages_from_first: x?.page.page_count ?? null
    };
  }));
  const ageTests = [4,5,2,3,6,21].map((id) => {
    const x = probes.get(`agegroupid ${id} M`);
    return { agegroupid: String(id), gender: 'M', status: x?.entry.status ?? null, rows_page0: x?.rows.length ?? 0, pages: x?.page.page_count ?? null,
      pages_fetched: x?.pageIndices?.length ?? (x ? 1 : 0), classes: [...new Set((x?.allPages ?? x?.rows ?? []).map((r) => r.class).filter(Boolean))].sort(), class_labelled_rows_page0:x?.rows.filter(r=>r.class!==null).length??0,
      points_rows_page0: x?.rows.filter((r) => r.points !== null).length ?? 0, sample: (x?.rows ?? []).slice(0,5) };
  });
  const bestYouth = probes.get('agegroupid 21 M');
  const age4 = probes.get('agegroupid 4 M');
  const age4K = probes.get('agegroupid 4 K');
  const age4Rows = [...(age4?.allPages ?? age4?.rows ?? []), ...(age4K?.allPages ?? age4K?.rows ?? [])];
  const fetchedUnfilteredRows = [
    ...load150Response(report150, unfilteredLabels.get('288')).rows,
    ...unfilteredK.flatMap((x) => probes.get(`baseline ${x.list_id} K`)?.rows ?? [])
  ];
  const normalizeClub = (s) => clean(s).replace(/\s+\d+$/u,'').replace(/\s+\(g\)$/u,'').trim();
  const rankIndex = (rows) => ({
    ids: new Map(rows.filter((r) => r.player_id).map((r) => [String(r.player_id),r])),
    names: new Map(rows.map((r) => [`${clean(r.name)}|${normalizeClub(r.club)}`,r]))
  });
  const filteredIdx = rankIndex(age4Rows);
  const unfilteredIdx = rankIndex(fetchedUnfilteredRows);
  const opponentLinks = local.u13Matches.opponents.map((p) => {
    const byId = p.external_player_id ? filteredIdx.ids.get(String(p.external_player_id)) : null;
    const key = `${clean(p.name)}|${normalizeClub(p.club)}`;
    const nameCandidate = byId ? null : filteredIdx.names.get(key) ?? null;
    const unfilteredById = p.external_player_id ? unfilteredIdx.ids.get(String(p.external_player_id)) : null;
    const unfilteredByName = unfilteredById ? null : unfilteredIdx.names.get(key) ?? null;
    const matched = byId ?? nameCandidate;
    return {
      ...p, filtered_link: byId ? 'ID' : nameCandidate ? 'kun navn+klub — uafklaret' : 'ikke fundet i hentede aldersfilter-sider',
      matched_filtered_row: matched ?? null, found_in_sampled_unfiltered_only: !matched && Boolean(unfilteredById || unfilteredByName),
      sampled_unfiltered_row: unfilteredById ?? unfilteredByName ?? null,
      filtered_class: matched?.class ?? null,
    };
  });
  const counts=(items,key)=>items.reduce((a,x)=>(a[x[key]]=(a[x[key]]??0)+1,a),{});
  const versionLists = {};
  for (const season of [2025,2026]) {
    const label = season===2025 ? 'seasonid=2025 getversions' : null;
    const hist150Label = season===2025 ? 'seasonid=2025 getversions' : 'baseline liste 288 param=M version/current side 0';
    const saved = load150Response(report150,hist150Label);
    versionLists[season] = saved?.versions ?? [];
  }
  const versionMatches = local.matches.map((m) => {
    const values = (versionLists[m.season_id] ?? []).map((v) => ({...v, iso:isoDate(v.value)})).filter((v)=>v.iso && v.iso <= (m.round_date ?? ''));
    values.sort((a,b)=>a.iso.localeCompare(b.iso));
    return { external_match_id:String(m.external_match_id),season_id:m.season_id,age_group_id:m.age_group_id,match_date:m.round_date,
      selected_version:values.at(-1)?.value ?? null,selected_version_iso:values.at(-1)?.iso ?? null };
  });
  const selectedVersions = [...new Set(versionMatches.map((m)=>m.selected_version_iso).filter(Boolean))].sort();
  const coverage=opponentLinks;
  return {
    sixListMatrix, unfilteredK, unfilteredM, ageTests,
    pointLimit: probes.get('pointsto 1500') ? { status: probes.get('pointsto 1500').entry.status, rows: probes.get('pointsto 1500').rows.length, pages: probes.get('pointsto 1500').page.page_count, points_rows: probes.get('pointsto 1500').rows.filter((r)=>r.points!==null).length, min_point: Math.min(...probes.get('pointsto 1500').rows.map((r)=>r.points).filter(Number.isFinite)), max_point: Math.max(...probes.get('pointsto 1500').rows.map((r)=>r.points).filter(Number.isFinite)), sample: probes.get('pointsto 1500').rows.slice(0,5) } : null,
    ageRange: probes.get('agefrom 9 to 19') ? { status: probes.get('agefrom 9 to 19').entry.status, rows: probes.get('agefrom 9 to 19').rows.length, pages: probes.get('agefrom 9 to 19').page.page_count, classes:[...new Set(probes.get('agefrom 9 to 19').rows.map(r=>r.class).filter(Boolean))].sort(), sample:probes.get('agefrom 9 to 19').rows.slice(0,5) } : null,
    allYouthOn288M: { agegroupid:'21',status:bestYouth?.entry.status??null,rows_page0:bestYouth?.rows.length??0,pages:bestYouth?.page.page_count??null,pages_fetched:bestYouth?.pageIndices?.length??(bestYouth?1:0),classes:[...new Set((bestYouth?.allPages??bestYouth?.rows??[]).map(r=>r.class).filter(Boolean))].sort(), all_classes_youth:(()=>{const labels=[...new Set((bestYouth?.allPages??bestYouth?.rows??[]).map(r=>r.class).filter(Boolean))];return labels.length>0&&labels.every(c=>/^U(?:09|9|11|13|15|17|19)\b/iu.test(c));})() },
    historicalVersions: [2021,2020,2019].map((season)=>{
      const x=probes.get(`versions ${season}`); const values=(x?.versions??[]).map(v=>({...v,iso:isoDate(v.value)})).filter(v=>v.iso).sort((a,b)=>a.iso.localeCompare(b.iso));
      return {season_id:String(season),status:x?.entry.status??null,total_version_items:x?.versions.length??0,dated_versions:values.length,oldest:values[0]??null,newest:values.at(-1)??null};
    }),
    oldestGsb: (()=>{const x=probes.get('GSB oldest historical version');return x?{status:x.entry.status,request_fields:x.entry.request_fields,rows:x.rows.length,pages:x.page.page_count,points_rows:x.rows.filter(r=>r.points!==null).length,first_five:x.rows.slice(0,5)}:null;})(),
    localMatchVersionCoverage: { totalYouthMatches:local.totalYouthMatches,datedMatches:local.totalDatedMatches,undatedMatches:local.totalYouthMatches-local.totalDatedMatches,distinctDatedMatchDates:local.allDistinctMatchDates.length,dates:local.allDistinctMatchDates,uniqueVersionsSelected:selectedVersions.length,selectedVersions,bySeason:local.timelineBySeason,unmatchedToAnyVersion:versionMatches.filter(m=>!m.selected_version).length,matchAssignments:versionMatches },
    opponentLinkage: { u13Matches:local.u13Matches.count,distinctU13MatchDates:local.u13Matches.distinctDates.length,missingMatchDates:local.u13Matches.missingDates,sideEvidenceMatches:local.u13Matches.sideEvidenceMatches,exactNationalSideMatches:local.u13Matches.exactNationalSideMatches,normalizedSideFallbackMatches:local.u13Matches.normalizedSideFallbackMatches,unmatchedSideMatches:local.u13Matches.unmatchedSideMatches,participantSideCounts:local.u13Matches.participantSideCounts,uniqueOpponentPlayers:coverage.length,link_counts:counts(coverage,'filtered_link'),gender_counts:counts(coverage,'gender_status'),found_unfiltered_only:coverage.filter(x=>x.found_in_sampled_unfiltered_only).map(x=>({name:x.name,id:x.external_player_id,club:x.club,gender:x.gender_status,unfiltered_row:x.sampled_unfiltered_row})),foundFilteredButClassOutsideU13:coverage.filter(x=>x.matched_filtered_row&&x.filtered_class&&!/^U13\b/iu.test(x.filtered_class)).map(x=>({name:x.name,id:x.external_player_id,club:x.club,class:x.filtered_class,row:x.matched_filtered_row})),sample:coverage.slice(0,50),coverage_pages:{filter:'agegroupid=4, list=288, param M+K',fetched:(age4?.pageIndices?.length??(age4?1:0))+(age4K?.pageIndices?.length??(age4K?1:0)),total:(age4?.page.page_count??null)+(age4K?.page.page_count??null),by_param:{M:{fetched:age4?.pageIndices?.length??(age4?1:0),total:age4?.page.page_count??null},K:{fetched:age4K?.pageIndices?.length??(age4K?1:0),total:age4K?.page.page_count??null}}},rows_in_fetched_pages:age4Rows.length },
    historyComparison: compareToHistory(sixListMatrix.find((x)=>x.list_id==='288'&&x.param==='M')?.first_five_rows??[]),
    localDbSummary: {matches:local.totalYouthMatches,dated:local.totalDatedMatches,distinctDates:local.allDistinctMatchDates.length,rankingHistory:local.rankingHistory},
    filterComparison: { filteredOpponentCounts:counts(coverage,'filtered_link'), opponentsFoundOnlyInSampledUnfiltered:coverage.filter(x=>x.found_in_sampled_unfiltered_only).length },
  };
}

function compareToHistory(candidateRows) {
  const norm=new DatabaseSync(dbPaths['gsb-statistik-normalized.db'],{readOnly:true});
  const hist=new DatabaseSync(dbPaths['rangliste-historik.db'],{readOnly:true});
  try {
    const byExt=norm.prepare('SELECT player_id,name_raw,name_normalized FROM players WHERE external_player_id=?');
    const byName=norm.prepare('SELECT player_id,name_raw,name_normalized FROM players WHERE name_normalized=?');
    const links=hist.prepare('SELECT nembadminton_member_id,match_confidence,match_method FROM player_link WHERE gsb_player_id=?');
    const output=[]; const seen=new Set();
    for(const row of candidateRows){
      if(output.length>=3||row.points===null||!row.player_id||seen.has(row.player_id))continue;
      seen.add(row.player_id);
      let players=byExt.all(String(row.player_id)); let method='exact external_player_id';
      if(!players.length){players=byName.all(clean(row.name));method='exact normalized name';}
      if(players.length!==1){output.push({ranking_player:row.name,ranking_player_id:row.player_id,ranking_points:row.points,local_identity_candidates:players.length,history_status:players.length?'ambiguous local name':'no exact local identity',match_method:method});continue;}
      const linkRows=links.all(players[0].player_id);
      let history=null;
      for(const link of linkRows){
        const snap=hist.prepare("SELECT discipline,version_date,points,nembadminton_member_id FROM ranking_snapshots WHERE nembadminton_member_id=? AND discipline='raw:HS' ORDER BY version_date DESC LIMIT 1").get(link.nembadminton_member_id);
        if(snap){history={...snap,link_confidence:link.match_confidence,link_method:link.match_method};break;}
      }
      output.push({ranking_player:row.name,ranking_player_id:row.player_id,ranking_points:row.points,local_player_id:players[0].player_id,identity_match_method:method,history:history??null,delta_vs_history:history?row.points-history.points:null});
    }
    return {discipline:'raw:HS (historik-db)',comparison_rows:output,comparable_count:output.filter(x=>x.history).length,interpretation:'Kun direkte/entydige navne-ID-kæder med rå:HS-snapshot sammenlignes. Tre stikprøver kan vise forskelle, men ikke bevise en generel/systematisk skalaforskel.'};
  }finally{norm.close();hist.close();}
}

function loadCurrent150() {
  const report=JSON.parse(fs.readFileSync(path.join(root,'statistik/results/150-ranglistepilot.json'),'utf8'));
  const labels={ '288':'baseline liste 288 param=M version/current side 0','289':'list289 param=M','292':'list292 param=M' };
  const current={};
  for(const [id,label] of Object.entries(labels)){
    const entry=report.requests.find(r=>r.label===label); if(!entry?.saved_response)throw new Error(`Mangler gemt 150-baseline for liste ${id}`);
    const data=unwrap(fs.readFileSync(path.join(root,entry.saved_response),'utf8'));
    current[id]={entry,data,rows:rowsFrom(data),versions:versionList(data),page:pagesFrom(data)};
  }
  const season25Entry=report.requests.find(r=>r.label==='seasonid=2025 getversions');
  const season25=season25Entry?.saved_response?unwrap(fs.readFileSync(path.join(root,season25Entry.saved_response),'utf8')):null;
  return {report,current,versions:{2025:versionList(season25),2026:current['288'].versions}};
}

function createOutputs() {
  const findings=analyze();
  result.findings=findings;
  result.request_count=requests.length;
  const gaps=requests.slice(1).map((entry,index)=>(Date.parse(entry.started_at)-Date.parse(requests[index].started_at))/1000).filter(Number.isFinite);
  result.transport_summary={
    attempts:requests.length,
    http_responses:requests.filter(x=>Number.isInteger(x.status)).length,
    status_counts:requests.reduce((counts,x)=>{const key=String(x.status??'intet HTTP-svar');counts[key]=(counts[key]??0)+1;return counts;},{}),
    responses_with_sha256:requests.filter(x=>Boolean(x.response_sha256)).length,
    hosts:[...new Set(requests.map(x=>{try{return new URL(x.url).hostname;}catch{return 'ugyldig URL';}}))],
    minimum_interval_seconds:gaps.length?Math.min(...gaps):null,
    credentials:'omit; ingen cookies',
    bot_or_captcha_guard_seen:requests.some(x=>Boolean(x.stopped_on_guard))
  };
  const versionCount=findings.localMatchVersionCoverage.uniqueVersionsSelected;
  const gsbPages=findings.sixListMatrix.map(x=>x.gsb_pages_total).filter(Number.isFinite);
  const gsbPagesSum=gsbPages.reduce((a,b)=>a+b,0);
  const unfilteredPages=findings.sixListMatrix.map(x=>({list_id:x.list_id,param:x.param,pages:x.unfiltered_pages,source:x.unfiltered_source}));
  const unfilteredPagesSum=unfilteredPages.reduce((sum,x)=>sum+(Number.isFinite(x.pages)?x.pages:0),0);
  const youthPageCount=findings.allYouthOn288M.pages;
  const lowestFullPlanPagesPerList=1;
  result.plan={
    list_count:6,version_count_from_match_dates:versionCount,
    requests_lower_bound:6*versionCount*lowestFullPlanPagesPerList,
    minimum_pause_seconds_lower_bound:6*versionCount*lowestFullPlanPagesPerList*2,
    minimum_pause_hours_lower_bound:Number((6*versionCount*2/3600).toFixed(3)),
    observed_gsb_only_pages_sum_for_six_lists:gsbPagesSum,
    gsb_only_requests_for_each_used_version_if_all_six_GSB_page_ranges_were_complete:versionCount*gsbPagesSum,
    gsb_only_pause_hours_at_2_seconds:Number((versionCount*gsbPagesSum*2/3600).toFixed(3)),
    observed_unfiltered_pages_current_version:unfilteredPages,
    observed_unfiltered_pages_sum:unfilteredPagesSum,
    unfiltered_page_requests_for_each_used_version_at_current_page_counts:versionCount*unfilteredPagesSum,
    unfiltered_page_requests_plus_six_version_lists_at_current_page_counts:versionCount*unfilteredPagesSum+6,
    unfiltered_pause_hours_at_2_seconds_including_six_version_lists:Number(((versionCount*unfilteredPagesSum+6)*2/3600).toFixed(2)),
    observed_all_youth_pages_288M:{filter:'agegroupid=21, param=M',pages:youthPageCount,source:'Opgave 151 response'},
    full_expected_winner_estimate:'Ikke beregnelig endnu: agegroupid=21 blev kun målt for 288/M, og svarene viste ingen klasseetiketter. De 72 sider kan derfor ikke antages at være hele ungdommen. GSB-filteret udelader modstandere. Før fuld kørsel skal det valgte filter bekræftes og page_count måles for alle seks liste/køn-kombinationer samt relevante snapshots. Beregn derefter Σ(page_count[list,param,version]) + versionslistekald; pausetid = samlet antal kald × mindst 2 sekunder.',
    gsb_only_estimate_caveat:'99 sidekald (9 observerede sider × 11 brugte versioner) er kun et GSB-afgrænset regneeksempel, ikke fuld dækning. 289/M havde 3 sider, men kun side 0 blev hentet i denne prøve.',
    unfiltered_estimate_caveat:'4.395 kald er et aktuelt, ufiltreret regneeksempel (399 målte aktuelle sider × 11 versioner + seks versionlistekald). Sidetal kan ændre sig pr. historisk version; det er ikke et bindende totalestimat.',
    retrieval_logic:{
      modes:['--collect-probes (netværk; eksplicit opt-in)','--continue-u13-pages (netværk; eksplicit opt-in)','--reanalyze-saved (offline; ingen netværk)'],
      host:'badmintonplayer.dk alene',credentials:'credentials: omit; ingen cookies',
      pacing_ms:pauseMs,request_cap:maxRequests,checkpoint:'Gem råsvar og requestfelter/hash efter hvert svar; genoptag kun manglende pageindex-nøgler.',
      dedupe_key:['rankinglistid','param','rankinglistversiondate','pageindex'],
      row_key:['rankinglistid','param','rankinglistversiondate','player_id'],
      row_policy:'Bevar rå klasseetiket, rang, point, profil-ID, navn og klub; valider at alle sider for et snapshot er hentet, før snapshot markeres komplet.'
    },
    schedule:'Først hent/valider versionslister, så side 0 for hvert liste×køn×filter for at måle page_count; derefter hent sider sekventielt med mindst 2 s mellemrum. Efter hver side: hash, råsvar og checkpoint. Stop på botværn eller tre fejl i træk; genoptag fra manglende sider uden dubletter.',
    separate_database:'ranking_points(list_id,param,version_date,player_id,member_number,name,club,class,rank,points,fetched_at,response_sha256)',
    expected_winner_rule:'For hver kamp og disciplin vælg seneste snapshot med version_date <= match_date; kræv point på begge sider. Manglende dato/ID/klub-match forbliver eksplicit uafklaret.'
  };
  const oldNotices=[];
  if(stopped&&result.stop_reason)oldNotices.push(result.stop_reason);
  if(findings.localMatchVersionCoverage.undatedMatches)oldNotices.push(`${findings.localMatchVersionCoverage.undatedMatches} af ${findings.localMatchVersionCoverage.totalYouthMatches} kampdatoer er tomme/ugyldige og kan ikke tildeles en version.`);
  if(findings.sixListMatrix.some(x=>x.gsb_pages_fetched<x.gsb_pages_total))oldNotices.push('Ikke alle GSB-filtrerede sider for alle seks lister blev hentet; sideantal og stikprøve er skilt ad i rapporten.');
  if(findings.ageTests.some((x) => x.rows_page0 > 0 && x.classes.length === 0))oldNotices.push('Et aldersfilter gav rækker uden synlig klasseetiket; fortolkningen af det ID er derfor uafklaret.');
  result.questions=[
    ...oldNotices,
    `agegroupid=5 og øvrige afprøvede IDs: ${findings.ageTests.map(x=>`${x.agegroupid}→${x.classes.slice(0,8).join('/')||'ingen klasseetiketter'}`).join('; ')}. Hvis etiketterne krydser aldersgrupper, er den interne API-semantik ikke udledt.`,
    `Modstanderlink: ${findings.opponentLinkage.uniqueOpponentPlayers} unikke spillere; ${findings.opponentLinkage.link_counts.ID??0} fundet på ID i de hentede U13-filterlister, ${findings.opponentLinkage.link_counts['kun navn+klub — uafklaret']??0} kun navn+klub og ${findings.opponentLinkage.link_counts['ikke fundet i hentede aldersfilter-sider']??0} ikke fundet. Ingen af de sidste blev fundet i de hentede, ufiltrerede første-sider; de svar er kun stikprøver og afklarer ikke fravær fra hele ranglisten.`,
    `agegroupid=21 gav ${findings.allYouthOn288M.pages} sider på 288/M, men kun side 0 blev hentet, og klasseetiketterne var tomme. Det er ikke bekræftet, at filteret dækker alle ungdomsspillere.`,
    `pointsto=1500 gav ${findings.pointLimit?.pages??'ukendt'} sider, men udelukker spillere over grænsen; agefrom=9/ageto=19 gav ${findings.ageRange?.pages??'ukendt'} sider og viste også SEN-klasser. Ingen af dem kan bruges som dokumenteret komplet ungdomsfilter.`,
    'Den særskilte prøve agegroupid=5 med gender=K på liste 287 blev ikke sendt, før prøvekørslerne blev stoppet; den kombination er uafklaret. pointsfrom og birthdatefromstring/birthdatetostring blev ikke afprøvet.',
    `GSB-filteret 289/M har ${findings.sixListMatrix.find(x=>x.list_id==='289'&&x.param==='M')?.gsb_pages_total??'ukendt'} sider, men kun side 0 blev hentet.`,
    'Ældre versionssvar blev undersøgt til seasonid=2019 (ældste daterede version 01/07/2019); sæsoner før 2019 er ikke undersøgt.',
    '5 af 271 ungdomskampe har ingen brugbar kampdato og kan ikke tildeles en ranglisteversion.',
    findings.historyComparison.interpretation
  ];
  result.status=stopped?'stopped_on_guard_or_error_limit':'completed_bounded_probe';
  result.databases_after=null;
  return findings;
}

function writeOutputs() {
  result.request_count=requests.length;
  fs.writeFileSync(jsonPath,`${JSON.stringify(result,null,2)}\n`);
  const f=result.findings??{};
  const matrix=f.sixListMatrix??[];
  const summary=[
    '## Konklusioner (punkt 1–6)',
    '',
    '- `GetRankingListPlayers` giver pointlisterne 288, 289 og 292; 287 er ikke pointkilden ifølge den tidligere pilot. Profil-ID og point følger med de observerede rækker.',
    '- `param=M/K` opfører sig som herre-/kvinderangliste i de observerede GSB-rækker. Det er empirisk bekræftet for disse svar, ikke en formel skemabeskrivelse.',
    '- De seks aktuelle, ufiltrerede sidetal nedenfor er kun aflæst fra første svar. GSB-klubfilteret giver væsentligt færre sider, men henter ikke modstandere.',
    '',
    '| Liste | param | Ufiltreret sider | GSB sider total/hentet | GSB-rækker observeret | Rækker med point | Rækker med profil-ID |',
    '|---:|:---:|---:|---:|---:|---:|---:|',
    ...matrix.map(x=>`| ${x.list_id} | ${x.param} | ${x.unfiltered_pages??'ukendt'} | ${x.gsb_pages_total??'ukendt'}/${x.gsb_pages_fetched??0} | ${x.gsb_rows_observed} | ${x.gsb_points_rows} | ${x.gsb_profile_id_rows} |`),
    '',
    `- Aldersfilterprøver på 288/M: ${[...(f.ageTests??[])].map(x=>`ID ${x.agegroupid}: ${x.pages} sider, ${x.rows_page0} rækker på side 0, klasseetiket ${x.class_labelled_rows_page0?`${x.class_labelled_rows_page0} rækker`:'mangler'}`).join('; ')}. 288/M, agegroupid=4 og 288/K agegroupid=4 blev hentet fuldt: ${f.opponentLinkage?.coverage_pages?.fetched??0}/${f.opponentLinkage?.coverage_pages?.total??0} sider, ${f.opponentLinkage?.rows_in_fetched_pages??0} rækker.`,
    `- Andre filterprøver: pointsto=1500 → ${f.pointLimit?.pages??'ukendt'} sider (kan udelukke point over 1500); agefrom=9/ageto=19 → ${f.ageRange?.pages??'ukendt'} sider og viste klasseetiketter ${f.ageRange?.classes?.join(', ')??'ukendt'}, herunder senior. Intet af dette beviser komplet ungdomsdækning.`,
    `- Modstanderprøve: ${f.opponentLinkage?.uniqueOpponentPlayers??0} unikke modstandere i U13-kampene; ${f.opponentLinkage?.link_counts?.ID??0} ID-match, ${f.opponentLinkage?.link_counts?.['kun navn+klub — uafklaret']??0} kun navn+klub, ${f.opponentLinkage?.link_counts?.['ikke fundet i hentede aldersfilter-sider']??0} ikke fundet i de hentede alderssider. Ufiltrerede stikprøvesider gav ${f.filterComparison?.opponentsFoundOnlyInSampledUnfiltered??0} ekstra fund; det beviser ikke, at de resterende spillere ikke står på hele ranglisten.`,
    `- Kampdækning: ${f.localMatchVersionCoverage?.totalYouthMatches??0} ungdomskampe, ${f.localMatchVersionCoverage?.datedMatches??0} med dato, ${f.localMatchVersionCoverage?.distinctDatedMatchDates??0} forskellige datoer, ${f.localMatchVersionCoverage?.uniqueVersionsSelected??0} valgte snapshotversioner; ${f.localMatchVersionCoverage?.undatedMatches??0} uden dato.`,
    `- Historiske versioner: ${[...(f.historicalVersions??[])].map(x=>`${x.season_id}: ${x.dated_versions} daterede, ${x.oldest?.value??'—'}–${x.newest?.value??'—'}`).join('; ')}. Ældste GSB-prøve: ${f.oldestGsb?.rows??0} rækker, ${f.oldestGsb?.points_rows??0} med point.`,
    `- Henteestimat: ${result.plan?.unfiltered_page_requests_plus_six_version_lists_at_current_page_counts??'ukendt'} ufiltrerede side-/versionslistekald ved nuværende sidetal og ${result.plan?.version_count_from_match_dates??0} valgte versioner; cirka ${result.plan?.unfiltered_pause_hours_at_2_seconds_including_six_version_lists??'ukendt'} timers minimumspause. Dette er et øvre, ufiltreret regneeksempel, ikke et komplet historisk estimat.`,
    ''
  ];
  const log=[
    '# Opgave 151 — ranglistepoint, pointlister og filtre','',
    `Status: ${result.status}; ${result.analysis_mode??'netværksindsamling'}. Forespørgsler: ${requests.length}/${maxRequests}.`,
    '',
    ...summary,
    '', '## Forespørgselslog','',
    '| Nr. | Kald | Felter ændret | HTTP | Bytes | SHA-256 |','|---:|---|---|---:|---:|---|',
    ...requests.map(x=>`| ${x.number} | ${x.label} | \`${JSON.stringify(x.fields_changed??'—')}\` | ${x.status??'intet HTTP-svar'} | ${x.response_bytes??'—'} | ${x.response_sha256??'—'} |`),
    '', '## Kaldsikkerhed','',JSON.stringify(result.transport_summary??{},null,2),
    '', '## Resultater','',JSON.stringify(result.findings??{},null,2),
    '', '## Fuldhentningsplan','',JSON.stringify(result.plan??{},null,2),
    '', '## Databaser','',JSON.stringify({before:result.databases_before,after:result.databases_after,unchanged:result.database_hashes_unchanged,read_only:result.database_open_checks??null},null,2),
    '', '## Spørgsmål','',...(result.questions??[]),'',
  ];
  fs.writeFileSync(mdPath,log.join('\n'));
}

async function continueWithFullU13Pages() {
  const previous=JSON.parse(fs.readFileSync(jsonPath,'utf8'));
  requests.splice(0,requests.length,...previous.requests);
  Object.assign(result,previous);
  result.requests=requests;
  result.request_limit=maxRequests;
  result.status='kører';
  result.questions=[];
  result.stop_reason=null;
  result.continuation_runs=[...(previous.continuation_runs??[]),{at:new Date().toISOString(),authorization:'Christoffer tillod op til 100 samlede forespørgsler',purpose:'hent alle U13 aldersfilter-sider for M og K til fuld modstanderdækning'}];
  stopped=false;
  consecutiveErrors=0;
  const previousStart=requests.at(-1)?.started_at;
  lastRequestStarted=previousStart?Date.parse(previousStart):0;
  result.databases_before=await digestAll();
  for(const [name,expected] of Object.entries(expectedHashes))if(result.databases_before[name]!==expected)throw new Error(`STOP før fortsættelse: ${name} hash mismatch ${result.databases_before[name]}`);
  local=loadLocalData();
  result.database_open_checks=Object.entries(dbPaths).map(([name,file])=>{const db=new DatabaseSync(file,{readOnly:true});const readable=db.prepare('SELECT 1 AS readable').get().readable===1;db.close();return{database:name,readOnly:true,opened_and_readable:readable};});
  restoreSavedProbes(previous);
  const send=async(label,body)=>{
    if(stopped||requests.length>=maxRequests)return null;
    const res=await request('POST',apiUrl,body,label);
    const rec={label,entry:res.entry,rows:res.rows,versions:res.versions,page:res.page,data:res.data,pageIndices:[Number(body.pageindex??0)]};
    if(res.entry.status===200){
      probes.set(label,rec);
      if(/^GSB \d+ [MK]$/u.test(label)||/^agegroupid 4 [MK]$/u.test(label)){rec.allPages=[...rec.rows];}
    }
    return rec;
  };
  try{
    const get=await request('GET',pageUrl,null,'GET frisk callbackkontekst til fortsættelse');
    if(get.entry.status!==200){stopped=true;result.stop_reason??=`STOP: GET-status ${get.entry.status}`;throw new Error(result.stop_reason);}
    const marker='var SR_CallbackContext = ';const at=get.text.indexOf(marker);const q="'";
    const a=at>=0?get.text.indexOf(q,at+marker.length):-1;const b=a>=0?get.text.indexOf(q,a+1):-1;
    callbackContext=a>=0&&b>a?get.text.slice(a+1,b):null;
    if(!callbackContext){stopped=true;throw new Error('STOP: GET-siden indeholder ingen SR_CallbackContext');}
    const fetchAllPages=async(baseLabel,ageGroupId,param)=>{
      let base=probes.get(baseLabel);
      if(!base){
        base=await send(baseLabel,baseBody(callbackContext,'288',param,{agegroupid:String(ageGroupId)}));
        if(!base||base.entry.status!==200)return;
        base.allPages=[...base.rows];
      }
      base.allPages??=[...base.rows];
      base.pageIndices??=[0];
      const total=base.page.page_count;
      if(!Number.isFinite(total)){result.questions.push(`${baseLabel}: sidetal kunne ikke aflæses.`);return;}
      for(let i=0;i<total&&!stopped;i++){
        if(base.pageIndices.includes(i))continue;
        if(requests.length>=maxRequests){result.questions.push(`${baseLabel}: stoppede ved loftet ${maxRequests}/${maxRequests}; side ${i} af ${total} mangler.`);return;}
        const extra=await send(`${baseLabel} pageindex ${i}`,baseBody(callbackContext,'288',param,{agegroupid:String(ageGroupId),pageindex:String(i)}));
        if(extra?.entry.status===200){base.pageIndices.push(i);base.allPages.push(...extra.rows);}
        else if(extra?.entry.status!==200){result.questions.push(`${baseLabel} side ${i} fejlede med HTTP ${extra?.entry.status??'ukendt'}.`);return;}
      }
      base.pageIndices=[...new Set(base.pageIndices)].sort((a,b)=>a-b);
    };
    await fetchAllPages('agegroupid 4 M',4,'M');
    if(!stopped&&requests.length<maxRequests)await fetchAllPages('agegroupid 4 K',4,'K');
  }catch(error){
    result.stop_reason??=String(error?.message??error);
    result.questions.push(result.stop_reason);
  }
  createOutputs();
  result.databases_after=await digestAll();
  result.database_hashes_unchanged=JSON.stringify(result.databases_before)===JSON.stringify(result.databases_after);
  if(!result.database_hashes_unchanged)result.questions.push('STOP: en eller flere databasehashes ændrede sig; se før/efter i rapporten.');
  writeOutputs();
  console.log(JSON.stringify({status:result.status,requests:requests.length,limit:maxRequests,opponents:result.findings.opponentLinkage.uniqueOpponentPlayers,links:result.findings.opponentLinkage.link_counts,pages:result.findings.opponentLinkage.coverage_pages,hashesUnchanged:result.database_hashes_unchanged,stopReason:result.stop_reason??null},null,2));
}

async function reanalyzeSaved() {
  const previous=JSON.parse(fs.readFileSync(jsonPath,'utf8'));
  requests.splice(0,requests.length,...previous.requests);
  Object.assign(result,previous);
  result.requests=requests;
  result.request_limit=maxRequests;
  result.status='offline_reanalysis';
  result.analysis_mode='offline; ingen netværkskald';
  result.stop_reason=null;
  stopped=false;
  const before=await digestAll();
  for(const [name,expected] of Object.entries(expectedHashes))if(before[name]!==expected)throw new Error(`STOP: ${name} hash mismatch ${before[name]}`);
  result.databases_before=previous.databases_before??before;
  local=loadLocalData();
  result.database_open_checks=Object.entries(dbPaths).map(([name,file])=>{const db=new DatabaseSync(file,{readOnly:true});const readable=db.prepare('SELECT 1 AS readable').get().readable===1;db.close();return{database:name,readOnly:true,opened_and_readable:readable};});
  restoreSavedProbes(previous);
  createOutputs();
  result.status='completed_bounded_probe';
  result.analysis_mode='offline; ingen netværkskald';
  result.databases_after=await digestAll();
  result.database_hashes_unchanged=JSON.stringify(result.databases_before)===JSON.stringify(result.databases_after);
  if(!result.database_hashes_unchanged)result.questions.push('STOP: en eller flere databasehashes ændrede sig; se før/efter i rapporten.');
  writeOutputs();
  console.log(JSON.stringify({status:result.status,networkRequestsSent:0,recordedRequests:requests.length,plan:result.plan,hashesUnchanged:result.database_hashes_unchanged},null,2));
}

async function main() {
  if(process.argv.includes('--reanalyze-saved'))return reanalyzeSaved();
  if(process.argv.includes('--continue-u13-pages'))return continueWithFullU13Pages();
  if(!process.argv.includes('--collect-probes'))throw new Error('Ingen handling valgt. Brug --reanalyze-saved (offline) eller --collect-probes (netværk).');
  if(fs.existsSync(jsonPath))throw new Error('Der findes allerede et resultat. Brug --reanalyze-saved; automatisk ny netværkskørsel er blokeret.');
  fs.mkdirSync(outDir,{recursive:true});
  result.databases_before=await digestAll();
  for(const [name,expected] of Object.entries(expectedHashes))if(result.databases_before[name]!==expected)throw new Error(`STOP før forespørgsler: ${name} hash mismatch ${result.databases_before[name]}`);
  local=loadLocalData();
  const readChecks=[];
  for(const [name,file] of Object.entries(dbPaths)){const db=new DatabaseSync(file,{readOnly:true});const probe=db.prepare('SELECT 1 AS readable').get().readable;readChecks.push({database:name,readOnly:true,opened_and_readable:probe===1});db.close();}
  result.database_open_checks=readChecks;
  const current=loadCurrent150();
  try {
    const get=await request('GET',pageUrl,null,'frisk GET af ranglisteside til context');
    if(get.entry.status!==200){stopped=true;result.stop_reason??=`STOP: GET-status ${get.entry.status}`;throw new Error(result.stop_reason);}
    const marker='var SR_CallbackContext = ';const at=get.text.indexOf(marker);const q="'";
    const a=at>=0?get.text.indexOf(q,at+marker.length):-1;const b=a>=0?get.text.indexOf(q,a+1):-1;
    callbackContext=a>=0&&b>a?get.text.slice(a+1,b):null;
    if(!callbackContext){stopped=true;throw new Error('STOP: GET-siden indeholder ingen SR_CallbackContext');}
    const send=async(label,body)=>{
      if(stopped||requests.length>=maxRequests)return null;
      const res=await request('POST',apiUrl,body,label);
      const rec={label,entry:res.entry,rows:res.rows,versions:res.versions,page:res.page,data:res.data,pageIndices:[Number(body.pageindex??0)]};
      if(res.entry.status===200)probes.set(label,rec);
      return rec;
    };
    // The M unfiltered first pages/page counts are reused from the same-day, hashed Opgave 150 responses.
    for(const listId of [288,289,292]) await send(`baseline ${listId} K`,baseBody(callbackContext,String(listId),'K'));
    for(const listId of [288,289,292])for(const param of ['M','K']){
      const label=`GSB ${listId} ${param}`;const rec=await send(label,baseBody(callbackContext,String(listId),param,{clubid:'1093'}));
      if(rec)probes.get(label).allPages=[...rec.rows];
    }
    for(const id of [4,5,2,3,6,21])await send(`agegroupid ${id} M`,baseBody(callbackContext,'288','M',{agegroupid:String(id)}));
    await send('agegroupid 4 K',baseBody(callbackContext,'288','K',{agegroupid:'4'}));
    await send('pointsto 1500',baseBody(callbackContext,'288','M',{pointsto:'1500'}));
    await send('agefrom 9 to 19',baseBody(callbackContext,'288','M',{agefrom:'9',ageto:'19'}));
    for(const season of [2021,2020,2019])await send(`versions ${season}`,baseBody(callbackContext,'288','M',{seasonid:String(season),getversions:true}));
    const historical=[];
    for(const season of [2021,2020,2019])for(const v of (probes.get(`versions ${season}`)?.versions??[])){
      const iso=isoDate(v.value);if(iso)historical.push({season_id:String(season),...v,iso});
    }
    historical.sort((a,b)=>a.iso.localeCompare(b.iso));
    if(historical.length){
      const old=historical[0];
      await send('GSB oldest historical version',baseBody(callbackContext,'288','M',{seasonid:old.season_id,rankinglistversiondate:old.value,clubid:'1093'}));
    }else result.questions.push('Ingen dateret version i seasonid 2021, 2020 eller 2019; ældste-version-GSB-kald blev ikke sendt.');

    // Complete the explicitly requested 288 M GSB pages first, then use remaining budget for U13 M pages.
    const gsb288=probes.get('GSB 288 M');
    if(gsb288?.page.page_count){
      for(let i=1;i<gsb288.page.page_count&&requests.length<maxRequests&&!stopped;i++){
        const extra=await send(`GSB 288 M pageindex ${i}`,baseBody(callbackContext,'288','M',{clubid:'1093',pageindex:String(i)}));
        if(extra){gsb288.pageIndices.push(i);gsb288.allPages.push(...extra.rows);}
      }
    }
    for(const param of ['M','K']){
      const age4=probes.get(`agegroupid 4 ${param}`);
      if(age4?.page.page_count){
        age4.allPages=[...age4.rows];
        for(let i=1;i<age4.page.page_count&&requests.length<maxRequests&&!stopped;i++){
          const extra=await send(`agegroupid 4 ${param} pageindex ${i}`,baseBody(callbackContext,'288',param,{agegroupid:'4',pageindex:String(i)}));
          if(extra){age4.pageIndices.push(i);age4.allPages.push(...extra.rows);}
        }
      }
    }
  } catch(error) {
    result.stop_reason??=String(error?.message??error);
    result.questions.push(result.stop_reason);
  }
  createOutputs();
  result.databases_after=await digestAll();
  result.database_hashes_unchanged=JSON.stringify(result.databases_before)===JSON.stringify(result.databases_after);
  if(!result.database_hashes_unchanged)result.questions.push('STOP: en eller flere databasehashes ændrede sig; se før/efter i rapporten.');
  writeOutputs();
  console.log(JSON.stringify({status:result.status,requests:requests.length,limit:maxRequests,findings:{matches:result.findings.localMatchVersionCoverage.totalYouthMatches,matchDates:result.findings.localMatchVersionCoverage.distinctDatedMatchDates,versionsUsed:result.findings.localMatchVersionCoverage.uniqueVersionsSelected,opponents:result.findings.opponentLinkage.uniqueOpponentPlayers,age4Pages:result.findings.opponentLinkage.coverage_pages},hashesUnchanged:result.database_hashes_unchanged,stopReason:result.stop_reason??null},null,2));
}

await main();
