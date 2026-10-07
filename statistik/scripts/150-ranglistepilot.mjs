import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createReadStream } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const root = process.cwd();
const outDir = path.join(root, 'statistik/results/150-raa-svar');
const jsonPath = path.join(root, 'statistik/results/150-ranglistepilot.json');
const mdPath = path.join(root, 'statistik/results/150-ranglistepilot.md');
const pageUrl = 'https://badmintonplayer.dk/DBF/Ranglister/';
const apiUrl = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/GetRankingListPlayers';
const maxRequests = 20;
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
const hashObject = (s) => crypto.createHash('sha256').update(s).digest('hex');
const requests = [];
const result = { title: 'Opgave 150 — ranglistepilot med kendt request', generated_at: new Date().toISOString(), request_limit: maxRequests, requests, status: 'kører', databases_before: null, databases_after: null, database_hashes_unchanged: null };
let callbackContext = null;
let lastStart = 0;
let consecutiveErrors = 0;
let stopped = false;
let sample = null;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function botOrChallenge(text, status) {
  if ([401, 403].includes(status)) return `HTTP ${status}`;
  const s = String(text ?? '');
  const checks = [
    [/verify\s+you\s+are\s+human|unusual\s+traffic|automated\s+requests|bot\s+detected|access\s+denied/iu, 'bot-/adgangsafvisning'],
    [/captcha\s+(?:required|needed|validation|verification)|g-recaptcha-response|h-captcha-response|challenge-platform/iu, 'CAPTCHA/udfordring'],
    [/bot.?token.{0,60}(?:required|missing|needed)|(?:required|missing|needed).{0,60}bot.?token/iu, 'bot-token-krav'],
    [/cookie\s+(?:required|missing|blocked)|consent\s+(?:required|missing)/iu, 'cookie-/samtykkekrav'],
  ];
  for (const [pattern, label] of checks) if (pattern.test(s)) return label;
  return null;
}
function redact(text) { return callbackContext ? String(text).split(callbackContext).join('[CALLBACK_CONTEXT_REDACTED]') : String(text); }
async function request(method, url, body, label) {
  const options = method === 'GET'
    ? { method: 'GET', redirect: 'manual', credentials: 'omit', headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36', accept: 'text/html,application/xhtml+xml' } }
    : { method: 'POST', redirect: 'manual', credentials: 'omit', headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36', 'content-type': 'application/json; charset=UTF-8', accept: '*/*', 'x-requested-with': 'XMLHttpRequest', origin: 'https://badmintonplayer.dk', referer: pageUrl }, body: JSON.stringify(body) };
  for (let attempt = 1; attempt <= 3; attempt++) {
    if (requests.length >= maxRequests) throw new Error('20-forespørgselsgrænsen nået');
    const wait = Math.max(0, pauseMs - (Date.now() - lastStart));
    if (lastStart && wait) await delay(wait);
    lastStart = Date.now();
    const entry = { number: requests.length + 1, label: attempt === 1 ? label : `${label} retry ${attempt}`, method, url, attempt, request_fields: body ? Object.fromEntries(Object.entries(body).map(([k, v]) => [k, k === 'callbackcontextkey' ? '[REDACTED]' : v])) : null, started_at: new Date(lastStart).toISOString() };
    requests.push(entry);
    try {
      const response = await fetch(url, options);
      const responseText = await response.text();
      entry.status = response.status;
      entry.response_bytes = Buffer.byteLength(responseText);
      entry.response_sha256 = hashText(responseText);
      entry.content_type = response.headers.get('content-type');
      const safe = redact(responseText);
      const suffix = method === 'GET' ? 'page' : `q${String(entry.number).padStart(2, '0')}-${label.replace(/[^a-z0-9]+/giu, '-')}`;
      fs.writeFileSync(path.join(outDir, `${String(entry.number).padStart(2, '0')}-${suffix}.${method === 'GET' ? 'html' : 'txt'}`), safe);
      entry.saved_response = `statistik/results/150-raa-svar/${String(entry.number).padStart(2, '0')}-${suffix}.${method === 'GET' ? 'html' : 'txt'}`;
      entry.redirect = response.status >= 300 && response.status < 400 ? response.headers.get('location') : null;
      const guard = botOrChallenge(responseText, response.status);
      if (guard) { entry.stopped_on_guard = guard; stopped = true; throw new Error(`STOP: ${guard}`); }
      if (entry.redirect) { stopped = true; throw new Error(`STOP: redirect uden at følge den: ${entry.redirect}`); }
      if (!response.ok) {
        if (response.status >= 500 || response.status === 429) {
          consecutiveErrors++;
          entry.error = `HTTP ${response.status}`;
          if (consecutiveErrors >= 3) { stopped = true; throw new Error('STOP: tre server-/rate-limitfejl i træk'); }
          if (attempt < 3) { await delay(pauseMs * attempt); continue; }
        }
        throw new Error(`HTTP ${response.status}`);
      }
      consecutiveErrors = 0;
      entry.completed_at = new Date().toISOString();
      return responseText;
    } catch (error) {
      entry.error ??= String(error?.message ?? error);
      entry.completed_at = new Date().toISOString();
      if (/STOP:/u.test(entry.error)) throw error;
      if (!entry.status) {
        consecutiveErrors++;
        if (consecutiveErrors >= 3) { stopped = true; throw new Error('STOP: tre netværksfejl i træk'); }
        if (attempt < 3) { await delay(pauseMs * attempt); continue; }
      }
      throw error;
    }
  }
  throw new Error('Forespørgslen kunne ikke gennemføres efter tre forsøg');
}
function unwrap(text) {
  let x;
  try { x = JSON.parse(text); } catch { return text; }
  for (let i = 0; i < 4; i++) {
    if (x && typeof x === 'object' && 'd' in x) x = x.d;
    else if (typeof x === 'string') { try { x = JSON.parse(x); } catch { break; } }
    else break;
  }
  return x;
}
function scan(value, found = { arrays: [], dates: [], pageMeta: [] }, pathName = '$') {
  if (typeof value === 'string') {
    for (const m of value.matchAll(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./-]\d{1,2}[./-]\d{4})\b/gu)) found.dates.push({ value: m[0], path: pathName });
    return found;
  }
  if (Array.isArray(value)) {
    if (value.length && value.some((v) => v && typeof v === 'object')) found.arrays.push({ path: pathName, length: value.length, rows: value });
    value.forEach((v, i) => scan(v, found, `${pathName}[${i}]`));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (/page|total|record|count|version|rank|player/iu.test(k) && !Array.isArray(v)) found.pageMeta.push({ path: `${pathName}.${k}`, value: v });
      scan(v, found, `${pathName}.${k}`);
    }
  }
  return found;
}
function htmlRows(text) {
  const rows = [...String(text).matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)].map((m) => [...m[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/giu)].map((c) => c[1].replace(/<[^>]+>/gu, ' ').replace(/&nbsp;|&#160;/giu, ' ').replace(/&amp;/giu, '&').replace(/\s+/gu, ' ').trim()));
  return rows.filter((r) => r.length);
}
function decodeEntities(value) {
  return String(value).replace(/&(#x[\da-f]+|#\d+|amp|nbsp|lt|gt|quot|#39);/giu, (entity, key) => {
    const k = key.toLowerCase();
    if (k === 'amp') return '&'; if (k === 'nbsp') return ' '; if (k === 'lt') return '<'; if (k === 'gt') return '>'; if (k === 'quot') return '"'; if (k === '#39') return "'";
    const cp = k.startsWith('#x') ? Number.parseInt(k.slice(2), 16) : Number.parseInt(k.slice(1), 10);
    return Number.isFinite(cp) ? String.fromCodePoint(cp) : entity;
  });
}
function parseRankingRows(html) {
  return [...String(html).matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)].flatMap((m) => {
    const cells = [...m[1].matchAll(/<(td|th)\b([^>]*)>([\s\S]*?)<\/\1>/giu)].map((x) => ({ attrs: x[2], html: x[3], text: decodeEntities(x[3].replace(/<[^>]+>/gu, ' ').replace(/\s+/gu, ' ').trim()), className: x[2].match(/\bclass\s*=\s*['"]([^'"]*)['"]/iu)?.[1] ?? '' }));
    const byClass = (token) => cells.find((x) => new RegExp(`(?:^|\\s)${token}(?:\\s|$)`, 'iu').test(x.className));
    const rankCell = byClass('rank');
    const memberCell = byClass('playerid');
    const name = byClass('name');
    const classCell = byClass('clas');
    const points = cells.filter((x) => /(?:^|\s)points(?:\s|$)/iu.test(x.className));
    if (!rankCell || !/^\d+$/u.test(rankCell.text)) return [];
    const profileHref = m[1].match(/href\s*=\s*['"][^'"]*\/DBF\/Spiller\/VisSpiller\/#(\d+)/iu)?.[1] ?? null;
    const nameCell = name?.text ?? '';
    const comma = nameCell.lastIndexOf(', ');
    const rankIndex = cells.indexOf(rankCell);
    const memberIndex = memberCell ? cells.indexOf(memberCell) : -1;
    const priorRank = memberIndex > rankIndex + 1 ? cells[rankIndex + 1]?.text ?? null : null;
    const pointText = points.map((x) => x.text).find((x) => /^-?\d+(?:[.,]\d+)?$/u.test(x)) ?? null;
    return [{ rank: Number(rankCell.text), prior_rank: priorRank, member_number: memberCell?.text ?? null, name: (comma >= 0 ? nameCell.slice(0, comma) : nameCell).trim(), club: comma >= 0 ? nameCell.slice(comma + 2).trim() : null, class: classCell?.text ?? null, points: pointText === null ? null : Number(pointText.replace(',', '.')), player_id: profileHref }];
  });
}
function rankingDataRows(data) {
  if (data && typeof data === 'object' && typeof data.Html === 'string') return parseRankingRows(data.Html);
  return scan(data).arrays.sort((a, b) => b.length - a.length).find((a) => a.rows.some((r) => r && typeof r === 'object' && /player|name|point|rank/iu.test(Object.keys(r).join(' '))))?.rows ?? [];
}
function latestVersion(dates, year, month = 0) {
  const normalized = dates.map((d) => {
    let m = d.value.match(/^(\d{4})-(\d{2})-(\d{2})$/u);
    if (m) return { raw: d.value, iso: d.value };
    m = d.value.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/u);
    return m ? { raw: d.value, iso: `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` } : null;
  }).filter(Boolean).filter((d) => Number(d.iso.slice(0, 4)) === year && (month === 0 || Number(d.iso.slice(5, 7)) === month));
  return normalized.sort((a, b) => a.iso.localeCompare(b.iso)).at(-1)?.raw ?? null;
}
function makeBase(ctx) {
  return { callbackcontextkey: ctx, rankinglistagegroupid: '15', rankinglistid: '288', seasonid: '2026', rankinglistversiondate: '', agegroupid: '', classid: '', gender: '', clubid: '', searchall: false, regionid: '', pointsfrom: '', pointsto: '', rankingfrom: '', rankingto: '', birthdatefromstring: '', birthdatetostring: '', agefrom: '', ageto: '', playerid: '', param: 'M', pageindex: '0', sortfield: '0', getversions: true, getplayer: true };
}
function sampleLocalRows() {
  const normPath = dbPaths['gsb-statistik-normalized.db'];
  const natPath = dbPaths['national-spillere.db'];
  const norm = new DatabaseSync(normPath, { readOnly: true });
  const nat = new DatabaseSync(natPath, { readOnly: true });
  const ageIds = [2, 3, 4, 5, 6, 7, 18];
  const normRows = norm.prepare(`SELECT tm.season_id,c.age_group_id,tm.external_match_id,tm.round_date,tm.home_name_raw,tm.away_name_raw,t.name_raw AS gsb_team,imp.side,p.player_id,p.external_player_id,p.name_raw,im.discipline_raw
    FROM team_matches tm JOIN competitions c USING(competition_id) JOIN teams t ON t.team_id=tm.gsb_team_id
    JOIN individual_matches im USING(team_match_id) JOIN individual_match_players imp USING(individual_match_id) JOIN players p USING(player_id)
    WHERE tm.season_id=2025 AND c.age_group_id IN (${ageIds.join(',')})`).all();
  norm.close();
  const clean = (s) => String(s ?? '').normalize('NFKC').toLocaleLowerCase('da-DK').trim().replace(/\s+/gu, ' ');
  const gsbPlayers = new Map();
  const matchMap = new Map();
  for (const r of normRows) {
    const h = clean(r.home_name_raw) && clean(r.home_name_raw) === clean(r.gsb_team);
    const a = clean(r.away_name_raw) && clean(r.away_name_raw) === clean(r.gsb_team);
    if (h === a) continue;
    const gsbSide = h ? 'home' : 'away';
    const id = String(r.external_match_id);
    if (!matchMap.has(id)) matchMap.set(id, { ...r, gsb_side: gsbSide });
    if (r.side === gsbSide) gsbPlayers.set(String(r.player_id), { source_id: r.external_player_id, player_id: r.player_id, name: r.name_raw, season: r.season_id, age_group_id: r.age_group_id, match_id: id, date: r.round_date, discipline: r.discipline_raw, team: r.gsb_team });
  }
  const ids = [...matchMap.keys()];
  const matches = new Map();
  const participantRows = [];
  if (ids.length) {
    for (let i = 0; i < ids.length; i += 500) {
      const part = ids.slice(i, i + 500); const placeholders = part.map(() => '?').join(',');
      const m = nat.prepare(`SELECT external_match_id,home_team_raw,away_team_raw FROM matches WHERE external_match_id IN (${placeholders})`).all(...part);
      m.forEach((x) => matches.set(String(x.external_match_id), x));
      const ps = nat.prepare(`SELECT pm.external_match_id,pm.external_player_id,pm.name_raw,p.name_raw AS player_name,e.team_side
        FROM player_matches pm LEFT JOIN players p USING(external_player_id) LEFT JOIN player_match_extras e USING(external_match_id,external_player_id)
        WHERE pm.external_match_id IN (${placeholders})`).all(...part);
      participantRows.push(...ps);
    }
  }
  nat.close();
  const opponents = new Map();
  const gsbNationalIds = new Map();
  for (const r of participantRows) {
    const match = matches.get(String(r.external_match_id)); const normalized = matchMap.get(String(r.external_match_id));
    if (!match || !normalized) continue;
    const team = clean(normalized.gsb_team);
    let gsbSide = clean(match.home_team_raw) === team ? 'home' : clean(match.away_team_raw) === team ? 'away' : normalized.gsb_side;
    const gsbTag = gsbSide === 'home' ? 'hjemme' : 'ude';
    if (r.team_side === gsbTag) {
      const nameKey = clean(r.name_raw ?? r.player_name);
      if (nameKey) gsbNationalIds.set(nameKey, String(r.external_player_id));
    }
    const opponentSide = gsbSide === 'home' ? 'ude' : 'hjemme';
    if (r.team_side !== opponentSide) continue;
    const key = String(r.external_player_id);
    if (!opponents.has(key)) opponents.set(key, { source_id: key, name: r.name_raw ?? r.player_name, match_id: String(r.external_match_id), date: normalized.round_date, age_group_id: normalized.age_group_id, opponent_team: gsbSide === 'home' ? match.away_team_raw : match.home_team_raw });
  }
  const pick = (map, seed) => [...map.values()].sort((a, b) => hashObject(`${seed}:${a.source_id}`).localeCompare(hashObject(`${seed}:${b.source_id}`))).slice(0, 20);
  const pickedGsb = pick(gsbPlayers, '150-gsb').map((p) => ({ ...p, national_external_player_id: gsbNationalIds.get(clean(p.name)) ?? null }));
  return { gsb_players: pickedGsb, opponents: pick(opponents, '150-opponents'), counts: { gsb_youth_player_ids: gsbPlayers.size, gsb_names_with_national_external_id: gsbNationalIds.size, opponent_player_ids_with_side_evidence: opponents.size, gsb_match_ids_joined: ids.length, national_match_ids_found: matches.size } };
}
function openAllDatabasesReadOnly() {
  return Object.entries(dbPaths).map(([name, file]) => {
    const db = new DatabaseSync(file, { readOnly: true });
    const tableCount = db.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE type='table'").get().n;
    db.close();
    return { name, read_only: true, table_count: tableCount };
  });
}
function compareSamples(samples, responses) {
  const records = responses.flatMap((x) => x.records ?? []);
  const normName = (x) => String(x ?? '').normalize('NFKC').toLocaleLowerCase('da-DK').trim().replace(/\s+/gu, ' ');
  const normClub = (x) => normName(x).replace(/\s+(?:hold\s*)?\d+$/u, '').replace(/\s*\([^)]*\)$/u, '').trim();
  return samples.map((person) => {
    const candidateIds = [person.source_id, person.national_external_player_id].filter((x) => x != null).map(String);
    const idMatches = records.filter((row) => Object.entries(row).some(([k, v]) => /^(?:player_?id|external_?player_?id|member_?id|nembadminton_?member_?id|badmintonplayer_?id)$/iu.test(k) && candidateIds.includes(String(v))));
    const targetClub = normClub(person.team ?? person.opponent_team);
    const nameClubMatches = records.filter((row) => normName(row.name) === normName(person.name) && targetClub && normClub(row.club) === targetClub);
    const category = idMatches.length ? 'id_match' : nameClubMatches.length ? 'name_and_club_candidate' : 'not_found_in_pilot_responses';
    return { ...person, candidate_ids_checked: candidateIds, normalized_club_checked: targetClub || null, link_result: category, id_match_count: idMatches.length, name_club_candidate_count: nameClubMatches.length, sample_ranking_rows: (idMatches.length ? idMatches : nameClubMatches).slice(0, 2) };
  });
}
async function offlineReanalyze() {
  const saved = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  saved.databases_before = await digestAll();
  for (const [name, expected] of Object.entries(expectedHashes)) if (saved.databases_before[name] !== expected) throw new Error(`${name} hash mismatch during offline reanalysis`);
  saved.database_open_checks = openAllDatabasesReadOnly();
  saved.local_samples = sampleLocalRows();
  const baseline = saved.requests.find((x) => x.label.startsWith('baseline '));
  if (!baseline?.saved_response) throw new Error('Ingen gemt baseline at genanalysere.');
  const envelope = JSON.parse(fs.readFileSync(path.join(root, baseline.saved_response), 'utf8'));
  const data = envelope?.d ?? envelope;
  const rows = rankingDataRows(data);
  const versions = Array.isArray(data?.Versions) ? data.Versions.map((v) => ({ label: v.Text, value: v.Value, selected: v.Selected })) : [];
  const sentProbe = saved.requests.filter((x) => x.label.startsWith('version=') || x.label.startsWith('age=') || x.label.startsWith('clubid=') || x.label.startsWith('regionid=') || x.label.startsWith('list=') || x.label.startsWith('pageindex=') || x.label.startsWith('pre-2022'));
  saved.filter_results = (saved.probe_plan ?? []).map((p) => {
    const attempted = sentProbe.filter((x) => x.label.replace(/ retry \d+$/u, '') === p.label);
    return { filter: p.label, changed_fields: p.changed_fields, attempted: attempted.length > 0, http_statuses: attempted.map((x) => x.status), response_sha256: attempted.map((x) => x.response_sha256), result: attempted.some((x) => x.status === 200) ? 'HTTP 200; indhold kræver vurdering' : attempted.length ? 'HTTP-fejl; stop efter tre serverfejl' : 'ikke afprøvet, fordi kørslen stoppede før dette filter' };
  });
  saved.findings = {
    baseline_status: baseline.status,
    response_type: typeof data,
    top_level_keys: data && typeof data === 'object' ? Object.keys(data) : [],
    row_count_page_0: rows.length,
    rows_per_page: rows.length,
    first_row_fields: rows[0] ? Object.keys(rows[0]) : [],
    sample_rows: rows.slice(0, 5),
    page_count_from_html: Number(data?.Html?.match(/SelectRankingListPage\((\d+)\);?['"]?[^>]*>\s*Sidste/iu)?.[1] ?? data?.Html?.match(/SelectRankingListPage\((\d+)\);/giu)?.at(-1)?.match(/\((\d+)\)/u)?.[1] ?? NaN),
    versions_count: versions.length,
    versions_first: versions.slice(0, 5),
    versions_last: versions.slice(-5),
    versions_oldest: versions.at(-1) ?? null,
    versions_years_observed: [...new Set(versions.map((v) => String(v.value ?? '').match(/\/(\d{4})$/u)?.[1]).filter(Boolean))],
    versions_before_august_2022_observed: versions.some((v) => { const m = String(v.value ?? '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/u); return Boolean(m && (Number(m[3]) < 2022 || (Number(m[3]) === 2022 && Number(m[1]) < 8))); }),
    pagination_note: 'HTML viser rækker pr. side og sidevalgslink; separate pageindex-kald kunne ikke afprøves efter tre HTTP 500-fejl.'
  };
  saved.linkage = {
    gsb: compareSamples(saved.local_samples.gsb_players, [{ label: baseline.label, records: rows }]),
    opponents: compareSamples(saved.local_samples.opponents, [{ label: baseline.label, records: rows }]),
    rule: 'Sammenligning er kun mod den hentede baseline-side (HS-liste 288, side 0). API-profilet er udtrukket fra det offentlige VisSpiller-link; member_number er separat. Fravær på denne side er ikke bevis for fravær i øvrige lister/versioner. Exact match bruger player_id mod lokal source_id; navnematch er kun kandidat.',
    counts: {}
  };
  for (const group of ['gsb', 'opponents']) saved.linkage.counts[group] = Object.fromEntries(['id_match', 'name_and_club_candidate', 'not_found_in_pilot_responses'].map((k) => [k, saved.linkage[group].filter((x) => x.link_result === k).length]));
  saved.plan = {
    lists: [288, 289, 292],
    baseline_page_count_observed: saved.findings.page_count_from_html,
    rows_per_page_observed: rows.length,
    dated_versions_observed_in_this_request: versions.filter((v) => v.value).length,
    full_harvest_request_count: 'ukendt; filter, sidelængde og versionsdækning for de øvrige lister/sæsoner blev ikke afprøvet',
    pacing: 'sekventielt, mindst 2 sekunder mellem kald; stop ved CAPTCHA/botværn og efter tre serverfejl i træk',
    checkpoint: 'gem hver rå response med SHA-256 og requestparametre, afstem pr. liste/version/side før næste blok',
    storage: 'separat database, aldrig udvid de eksisterende databaser',
    expected_winner_minimum: 'mindst ét historisk ranglistepoint pr. spiller på begge sider i hver kamp og pr. disciplin; vælg kun versioner på eller før kampdatoen; uløste ID/navnematch forbliver manglende'
  };
  saved.questions = [
    'STOP: Den kendte request fik HTTP 200, men det første forsøg med rankinglistversiondate gav HTTP 500 tre gange i træk; yderligere kald blev derfor ikke sendt.',
    'Den returnerede Versions-liste har 42 elementer (41 med dato) for den afprøvede liste/sæson; observeret ældste dato er 01-07-2026. Ældre versioner kan ikke afgøres ud fra dette udsnit.',
    'Kun versionfilteret blev forsøgt. Aldersgruppe, køn, klub, region, lister 289/292 og pageindex-filtre er ikke afprøvet og står som ukendte.',
    'Rækken indeholder både et medlemsnummer og et numerisk ID i spillerprofilens URL-fragment. ID-typen og koblingen til kampdata kan ikke bekræftes fra dette ufuldstændige pilotudsnit.',
    'De 20+20 lokale stikprøver blev sammenlignet alene mod side 0 af senior-HS-listen 288; 0 ID-match, 0 navnekandidater og 20 ikke fundet pr. gruppe. Det siger ikke, at spillerne mangler på deres relevante ungdoms-/øvrige ranglister.'
  ];
  saved.offline_reanalysis = true;
  saved.databases_after = await digestAll();
  saved.database_hashes_unchanged = JSON.stringify(saved.databases_before) === JSON.stringify(saved.databases_after);
  Object.assign(result, saved);
  writeOutputs();
}
async function rebuildReport() {
  const saved = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  saved.databases_before = await digestAll();
  for (const [name, expected] of Object.entries(expectedHashes)) if (saved.databases_before[name] !== expected) throw new Error(`${name} hash mismatch during report rebuild`);
  saved.database_open_checks = openAllDatabasesReadOnly();
  saved.local_samples = sampleLocalRows();
  const parseLog = (entry) => {
    if (!entry?.saved_response) return null;
    const envelope = JSON.parse(fs.readFileSync(path.join(root, entry.saved_response), 'utf8'));
    const data = envelope?.d ?? envelope;
    return { data, rows: rankingDataRows(data), versions: Array.isArray(data?.Versions) ? data.Versions.map((v) => ({ label: v.Text, value: v.Value, selected: v.Selected })) : [] };
  };
  const successful = new Map();
  for (const entry of saved.requests.filter((x) => x.method === 'POST' && x.status === 200)) {
    const parsed = parseLog(entry);
    successful.set(entry.label, parsed);
    entry.result_summary = { rows: parsed.rows.length, classes: [...new Set(parsed.rows.map((x) => x.class).filter(Boolean))].length, clubs: [...new Set(parsed.rows.map((x) => x.club).filter(Boolean))].length, dated_versions: parsed.versions.filter((v) => v.value).length };
  }
  const pageMax = (data) => Math.max(0, ...[...String(data?.Html ?? '').matchAll(/SelectRankingListPage\((\d+)\)/giu)].map((m) => Number(m[1])));
  const signature = (rows) => rows.map((r) => `${r.player_id ?? ''}|${r.rank ?? ''}|${r.points ?? ''}`).join('\n');
  const compare = (a, b) => {
    const before = new Map(a.filter((x) => x.player_id).map((x) => [x.player_id, x]));
    const after = new Map(b.filter((x) => x.player_id).map((x) => [x.player_id, x]));
    const common = [...before.keys()].filter((id) => after.has(id));
    const changed = common.filter((id) => before.get(id).rank !== after.get(id).rank || before.get(id).points !== after.get(id).points);
    return {
      rows_a: a.length, rows_b: b.length,
      exact_same_order_and_values: signature(a) === signature(b),
      common_player_ids: common.length,
      ids_added_in_b: [...after.keys()].filter((id) => !before.has(id)).length,
      ids_removed_in_b: [...before.keys()].filter((id) => !after.has(id)).length,
      common_ids_with_rank_or_points_changed: changed.length,
      changed_examples: changed.slice(0, 5).map((id) => ({ player_id: id, before: { rank: before.get(id).rank, points: before.get(id).points }, after: { rank: after.get(id).rank, points: after.get(id).points } }))
    };
  };
  const evidence = [];
  for (const [label, parsed] of successful) {
    const entry = saved.requests.find((x) => x.label === label);
    const rows = parsed.rows;
    const clubs = [...new Set(rows.map((x) => x.club).filter(Boolean))].sort();
    const classes = [...new Set(rows.map((x) => x.class).filter(Boolean))].sort();
    let against = null;
    if (label.startsWith('version Value=')) against = successful.get('baseline liste 288 param=M version/current side 0')?.rows;
    else if (label === 'pageindex=1 baseline288') against = successful.get('baseline liste 288 param=M version/current side 0')?.rows;
    else if (label === 'agegroupid=5 gender=K list287' || label === 'regionid=8 list287' || label === 'clubid=1093 list287' || label === 'clubid=1093 list287 pageindex=1' || label === 'clubid=1093 list287 pageindex=2') against = successful.get('baseline list287 current page0')?.rows;
    else if (label === 'season2025 version Value=12/31/2025') against = successful.get('seasonid=2025 getversions')?.rows;
    else if (label === 'clubid=1093 list287 pageindex=1' || label === 'clubid=1093 list287 pageindex=2') against = successful.get('clubid=1093 list287')?.rows;
    evidence.push({
      label, request_number: entry.number, request_fields: entry.request_fields, status: entry.status, response_bytes: entry.response_bytes, response_sha256: entry.response_sha256,
      rows: rows.length, first_five_rows: rows.slice(0, 5), distinct_clubs: clubs, distinct_classes: classes, populated_point_rows: rows.filter((r) => r.points !== null).length,
      page_count_observed: pageMax(parsed.data) + 1, page_link_indices: [...new Set([...String(parsed.data?.Html ?? '').matchAll(/SelectRankingListPage\((\d+)\)/giu)].map((m) => Number(m[1])))].sort((a, b) => a - b),
      club_filter_only_gsb: label.startsWith('clubid=1093') ? rows.length > 0 && rows.every((r) => /gladsaxe|søborg|söborg|\bgsb\b/iu.test(r.club ?? '')) : null,
      versions_count: parsed.versions.length, dated_versions: parsed.versions.filter((v) => v.value).length,
      version_first: parsed.versions.find((v) => v.value) ?? null, version_last: [...parsed.versions].reverse().find((v) => v.value) ?? null,
      version_values_sample: parsed.versions.filter((v) => v.value).slice(0, 3),
      comparison: against ? compare(against, rows) : null
    });
  }
  const logByLabel = (label) => saved.requests.find((x) => x.label === label);
  const base288 = successful.get('baseline liste 288 param=M version/current side 0')?.rows ?? [];
  const base287 = successful.get('baseline list287 current page0')?.rows ?? [];
  const clubLabels = ['clubid=1093 list287', 'clubid=1093 list287 pageindex=1', 'clubid=1093 list287 pageindex=2'];
  const clubRows = [...new Map(clubLabels.flatMap((label) => successful.get(label)?.rows ?? []).map((r) => [r.player_id, r])).values()];
  const allRows = [...successful.values()].flatMap((x) => x.rows);
  saved.probe_evidence = evidence;
  saved.filter_results = saved.requests.filter((x) => x.method === 'POST').map((x) => ({ number: x.number, label: x.label, status: x.status ?? null, response_bytes: x.response_bytes ?? null, response_sha256: x.response_sha256 ?? null, request_fields: x.request_fields, result: x.status === 200 ? JSON.stringify(x.result_summary ?? {}) : `HTTP ${x.status ?? 'fejl'}` }));
  saved.linkage = {
    gsb: compareSamples(saved.local_samples.gsb_players, [{ label: 'clubid=1093 list287 pages 0-2', records: clubRows }]),
    opponents: compareSamples(saved.local_samples.opponents, [{ label: 'all successful pilot pages', records: allRows }]),
    rule: 'Eksakt ID-match mellem profilens player_id fra VisSpiller-link og enten statistikspillernes source-ID eller national-spillere.db external_player_id. Navn+klub-kandidat kræver begge felter efter normalisering. GSB-stikprøven sammenlignes med alle 3 GSB-filter-sider; modstanderstikprøven med alle hentede succesfulde sider. Ikke fundet er afgrænset til disse svar.',
    searched_rows: { list288_baseline_page0: base288.length, list287_baseline_page0: base287.length, gsb_club_rows_unique_pages0to2: clubRows.length, all_successful_response_rows: allRows.length },
    counts: {}
  };
  for (const group of ['gsb', 'opponents']) saved.linkage.counts[group] = Object.fromEntries(['id_match', 'name_and_club_candidate', 'not_found_in_pilot_responses'].map((k) => [k, saved.linkage[group].filter((x) => x.link_result === k).length]));
  const date2025 = successful.get('season2025 version Value=12/31/2025');
  const v2022 = successful.get('seasonid=2022 getversions')?.versions ?? [];
  const age = evidence.find((x) => x.label === 'agegroupid=5 gender=K list287');
  const clubAllGsb = evidence.filter((x) => x.label.startsWith('clubid=1093'));
  const versionRows = evidence.find((x) => x.label === 'version Value=10/01/2026');
  const page2 = evidence.find((x) => x.label === 'pageindex=1 baseline288');
  saved.findings = {
    baseline_list288: { rows: base288.length, pages: evidence.find((x) => x.label.startsWith('version Value='))?.page_count_observed ?? 99, points_populated: base288.filter((x) => x.points !== null).length, first_five: base288.slice(0, 5) },
    dated_version_value_test: { value: '10/01/2026', status: logByLabel('version Value=10/01/2026')?.status, rowset_changed_vs_baseline: versionRows ? !versionRows.comparison?.exact_same_order_and_values : null, common_player_ids: versionRows?.comparison?.common_player_ids, baseline_rows: base288.length, dated_rows: versionRows?.rows, differing_examples: versionRows?.comparison?.first_three_b },
    pagination: { request_pageindex: '1', status: logByLabel('pageindex=1 baseline288')?.status, page0_rows: base288.length, page1_rows: page2?.rows, rows_differ: page2 ? !page2.comparison?.exact_same_order_and_values : null, common_player_ids: page2?.comparison?.common_player_ids, last_page_index_linked_from_page0: 98, page_count_if_zero_based: 99 },
    list287_unfiltered: { rows: base287.length, pages: evidence.find((x) => x.label === 'baseline list287 current page0')?.page_count_observed, first_five: base287.slice(0, 5) },
    agegroup_filter: { requested_agegroupid: '5', requested_gender: 'K', rows: age?.rows, classes_returned: age?.distinct_classes, rowset_changed_vs_unfiltered287: Boolean(age && !age.comparison?.exact_same_order_and_values), all_rows_match_U15_label: Boolean(age?.distinct_classes?.length && age.distinct_classes.every((x) => /U15/iu.test(x))), comparison: age?.comparison },
    gsb_club_filter: { rows_by_page: clubAllGsb.map((x) => ({ label: x.label, rows: x.rows })), unique_rows_pages0to2: clubRows.length, pages_implied_by_response: clubAllGsb[0]?.page_count_observed, pages_retrieved: clubAllGsb.length, unfetched_pageindices: [3], only_gladsaxe_soborg_club_labels: clubAllGsb.every((x) => x.club_filter_only_gsb), distinct_clubs: [...new Set(clubRows.map((r) => r.club).filter(Boolean))].sort(), rows_with_numeric_points: clubRows.filter((r) => r.points !== null).length, rows_with_profile_player_id: clubRows.filter((r) => r.player_id !== null).length },
    region_filter: evidence.find((x) => x.label === 'regionid=8 list287') ? { rows: evidence.find((x) => x.label === 'regionid=8 list287').rows, distinct_clubs: evidence.find((x) => x.label === 'regionid=8 list287').distinct_clubs, comparison_vs_unfiltered287: evidence.find((x) => x.label === 'regionid=8 list287').comparison } : null,
    other_lists: ['list289 param=M', 'list292 param=M'].map((label) => { const x=evidence.find((e)=>e.label===label); return {label,status:logByLabel(label)?.status,rows:x?.rows,first_five:x?.first_five_rows}; }),
    season2025: { status: logByLabel('seasonid=2025 getversions')?.status, versions_count: successful.get('seasonid=2025 getversions')?.versions.length, dated_versions: successful.get('seasonid=2025 getversions')?.versions.filter((v)=>v.value).length, selected_value: '12/31/2025', selected_version_rows: date2025?.rows, changed_vs_current_season_baseline: date2025 ? !evidence.find((x)=>x.label==='season2025 version Value=12/31/2025')?.comparison?.exact_same_order_and_values : null },
    season2022: { status: logByLabel('seasonid=2022 getversions')?.status, versions_count: v2022.length, dated_versions: v2022.filter((v)=>v.value).length, newest: v2022.find((v)=>v.value) ?? null, oldest: [...v2022].reverse().find((v)=>v.value) ?? null }
  };
  saved.plan = { list_ids: [287, 288, 289, 292], known_page_counts: { list287_unfiltered_2026: saved.findings.list287_unfiltered.pages, list288_HS_M_2026: saved.findings.pagination.page_count_if_zero_based, list287_GSB_2026: saved.findings.gsb_club_filter.pages_implied_by_response }, gsb_pages_fetched: 3, gsb_pageindex3_fetched: false, observed_dated_version_counts: { season2026_list288: successful.get('baseline liste 288 param=M version/current side 0')?.versions.filter((v)=>v.value).length, season2025_list288: successful.get('seasonid=2025 getversions')?.versions.filter((v)=>v.value).length, season2022_list288: v2022.filter((v)=>v.value).length }, full_harvest_request_count: 'Præcist tal ukendt: versions- og sidetal varierer mellem liste/sæson. De afprøvede liste-288-versioner indeholdt 41, 158 og 137 daterede snapshots for hhv. seasonid 2026, 2025 og 2022; konkrete sidetal varierede også (bl.a. 99 sider for liste 288 HS/M 2026 og 212 for ufiltreret liste 287 2026). Før fuld estimering skal antal versioner og sider tælles pr. liste/sæson/filter. Beregn derefter summen af liste × snapshot × side, plus versionskald og eventuelle filtre.', pacing: 'sekventielt, mindst 2 sekunder mellem kald; gem og hash hvert svar; checkpoint pr. liste/version/side; stop ved botværn eller tre fejl i træk.', storage: 'ny separat rangliste-database, aldrig skriv til de fire eksisterende databaser.', expected_winner_minimum: 'ranglistepoint for begge hold/spillere på begge sider i hver kamp pr. disciplin, fra seneste versionsdato på eller før kampdato; uafklarede ID/navne/klub-koblinger må ikke gættes.' };
  saved.questions = [
    'rankinglistversiondate fungerer, når den præcise Value-formatstreng sendes: 10/01/2026 og 12/31/2025 gav HTTP 200. Den tidligere Text-formatstreng gav 3×HTTP 500.',
    `agegroupid=5 + gender=K ændrede rækkerne fra ufiltreret liste 287: ${age?.rows ?? 0} rækker blev returneret; klasseetiketterne skal læses i rapporten. Om ID 5 semantisk er U15 kan ikke bekræftes alene ud fra parameterens navn.`,
    `GSB-listen viser ${saved.findings.gsb_club_filter.pages_implied_by_response} sider, men kun sideindex 0–2 blev hentet inden 20-kaldsgrænsen; sideindex 3 er ikke undersøgt. De ${saved.linkage.counts.gsb.not_found_in_pilot_responses} ikke-fundne GSB-stikprøver er derfor kun ikke fundet i hentede sider.`,
    'Liste 287 returnerede profil-ID på de 300 hentede GSB-rækker, men ingen numeriske pointværdier i pointkolonnen. Liste 288 viste point, men det er ikke bevist, at dens tal erstatter de manglende point i liste 287.',
    'Samlet versionsoversigt viste seneste datoer for seasonid 2022; ældre end den ældste returnerede dato er ikke afprøvet.',
    `ID-kobling i de hentede prøver: GSB ${saved.linkage.counts.gsb.id_match} ID / ${saved.linkage.counts.gsb.name_and_club_candidate} navn+klub / ${saved.linkage.counts.gsb.not_found_in_pilot_responses} ikke fundet; modstandere ${saved.linkage.counts.opponents.id_match} / ${saved.linkage.counts.opponents.name_and_club_candidate} / ${saved.linkage.counts.opponents.not_found_in_pilot_responses}. Se afgrænsningen til de hentede sider i rapporten.`
  ];
  saved.status = 'completed_probe';
  saved.request_count = saved.requests.length;
  saved.databases_after = await digestAll();
  saved.database_hashes_unchanged = JSON.stringify(saved.databases_before) === JSON.stringify(saved.databases_after);
  saved.report_rebuilt_at = new Date().toISOString();
  Object.assign(result, saved);
  writeOutputs();
}
function writeOutputs(extra = {}) {
  const requestLog = result.requests ?? requests;
  result.request_count = requestLog.length;
  result.request_limit = maxRequests;
  result.status = stopped ? (result.stop_reason ?? 'stopped') : result.status;
  result.databases_after = extra.databases_after ?? result.databases_after;
  if (result.databases_before && result.databases_after) result.database_hashes_unchanged = JSON.stringify(result.databases_before) === JSON.stringify(result.databases_after);
  fs.writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`);
  const lines = ['# Opgave 150 — ranglistepilot', '', `Status: ${result.status}. Forespørgsler: ${requestLog.length}/${maxRequests}.`, '', '## Forespørgselslog', '', '| Nr. | Kald/filter | HTTP | Bytes | SHA-256 |', '|---:|---|---:|---:|---|', ...requestLog.map((r) => `| ${r.number} | ${r.label} | ${r.status ?? 'fejl'} | ${r.response_bytes ?? '—'} | ${r.response_sha256 ?? '—'} |`), '', '## Fund', '', JSON.stringify(result.findings ?? {}, null, 2), '', '## Filterresultater', '', JSON.stringify(result.filter_results ?? [], null, 2), '', '## ID-kobling (pilotens hentede udsnit)', '', JSON.stringify(result.linkage ?? {}, null, 2), '', '## Plan og afgrænsninger', '', JSON.stringify(result.plan ?? {}, null, 2), '', '## Databaser', '', JSON.stringify({ before: result.databases_before, after: result.databases_after, unchanged: result.database_hashes_unchanged }, null, 2), '', '## Spørgsmål', '', ...(result.questions ?? ['Ingen.']), ''];
  fs.writeFileSync(mdPath, lines.join('\n'));
}

if (process.argv.includes('--rebuild-report')) {
  await rebuildReport();
  console.log(JSON.stringify({ status: result.status, requests: result.request_count, findings: result.findings, linkage: result.linkage.counts, hashes_unchanged: result.database_hashes_unchanged }, null, 2));
  process.exit(0);
}
if (process.argv.includes('--offline')) {
  await offlineReanalyze();
  console.log(JSON.stringify({ offline_reanalysis: true, status: result.status, requests: result.requests.length, findings: result.findings, linkage: result.linkage.counts, hashes_unchanged: result.database_hashes_unchanged }, null, 2));
  process.exit(0);
}
async function continueRun() {
  const saved = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  requests.push(...saved.requests);
  Object.assign(result, saved, { requests, continuation_started_at: new Date().toISOString(), status: 'continuing', stop_reason: null, questions: [] });
  if (requests.length > maxRequests) throw new Error(`Eksisterende log overskrider grænsen: ${requests.length}/${maxRequests}`);
  result.databases_before = await digestAll();
  for (const [name, expected] of Object.entries(expectedHashes)) if (result.databases_before[name] !== expected) throw new Error(`${name} hash mismatch before continuation: ${result.databases_before[name]}`);
  result.database_open_checks = openAllDatabasesReadOnly();
  sample = sampleLocalRows();
  result.local_samples = sample;
  const rawPage = await request('GET', pageUrl, null, 'frisk GET til fortsættelse');
  const marker = 'var SR_CallbackContext = ';
  const markerAt = rawPage.indexOf(marker);
  const quote = String.fromCharCode(39);
  const contextStart = markerAt >= 0 ? rawPage.indexOf(quote, markerAt + marker.length) : -1;
  const contextEnd = contextStart >= 0 ? rawPage.indexOf(quote, contextStart + 1) : -1;
  callbackContext = contextStart >= 0 && contextEnd > contextStart ? rawPage.slice(contextStart + 1, contextEnd) : null;
  if (!callbackContext) { stopped = true; throw new Error('STOP: frisk side mangler SR_CallbackContext'); }

  const oldBaselineRequest = saved.requests.find((x) => x.label.startsWith('baseline '));
  const oldBaselineRaw = JSON.parse(fs.readFileSync(path.join(root, oldBaselineRequest.saved_response), 'utf8'));
  const oldBaseline = oldBaselineRaw?.d ?? oldBaselineRaw;
  const oldBaselineRows = rankingDataRows(oldBaseline);
  const list = (rankinglistid, param) => ({ ...makeBase(callbackContext), rankinglistid: String(rankinglistid), param });
  const base288M = list(288, 'M');
  const base287 = list(287, '');
  const signature = (rows) => rows.map((r) => `${r.player_id ?? ''}|${r.rank ?? ''}|${r.points ?? ''}`).join('\n');
  const compareRows = (a, b) => ({ rows_a: a.length, rows_b: b.length, exact_same_order_and_values: signature(a) === signature(b), common_player_ids: a.filter((x) => x.player_id && b.some((y) => y.player_id === x.player_id)).length, first_three_b: b.slice(0, 3) });
  const successful = [];
  const evidence = [];
  result.probe_evidence ??= [];
  result.continuation_probe_plan = [];
  const sendProbe = async (label, base, changes, compareTo = null) => {
    if (stopped || requests.length >= maxRequests) return null;
    const body = { ...base, ...changes };
    const plan = { label, changed_fields: changes };
    result.continuation_probe_plan.push(plan);
    try {
      const text = await request('POST', apiUrl, body, label);
      const data = unwrap(text);
      const rows = rankingDataRows(data);
      const versions = Array.isArray(data?.Versions) ? data.Versions.map((v) => ({ label: v.Text, value: v.Value, selected: v.Selected })) : [];
      const clubs = [...new Set(rows.map((r) => r.club).filter(Boolean))].sort();
      const item = { label, records: rows, data, versions };
      successful.push(item);
      const prior = compareTo === 'baseline288' ? oldBaselineRows : compareTo ? successful.find((x) => x.label === compareTo)?.records ?? [] : [];
      const rec = {
        label, request_number: requests.at(-1).number, request_fields: requests.at(-1).request_fields,
        status: requests.at(-1).status, response_bytes: requests.at(-1).response_bytes, response_sha256: requests.at(-1).response_sha256,
        response_keys: data && typeof data === 'object' ? Object.keys(data) : [], rows: rows.length, first_five_rows: rows.slice(0, 5), distinct_clubs: clubs,
        club_filter_only_gsb: label.startsWith('clubid=1093') ? rows.length > 0 && rows.every((r) => /gladsaxe|søborg|söborg|\bgsb\b/iu.test(r.club ?? '')) : null,
        versions_count: versions.length, dated_versions: versions.filter((v) => v.value).length, versions_sample: versions.slice(0, 5),
        comparison: compareTo ? compareRows(prior, rows) : null
      };
      requests.at(-1).result_summary = { rows: rows.length, first_row_fields: rows[0] ? Object.keys(rows[0]) : [], versions_count: versions.length, distinct_clubs: clubs.length };
      evidence.push(rec);
      return item;
    } catch (error) {
      result.stop_reason = String(error?.message ?? error);
      if (stopped) result.status = 'stopped_on_guard_or_error_limit';
      throw error;
    }
  };
  try {
    const baselineVersions = Array.isArray(oldBaseline?.Versions) ? oldBaseline.Versions : [];
    const newerValue = baselineVersions.find((v) => /oktober-ranglisten/iu.test(v.Text ?? ''))?.Value
      ?? baselineVersions.find((v) => v.Value === '10/01/2026')?.Value;
    if (!newerValue) throw new Error('STOP: versionsvaret har ikke en genkendt Value for oktober 2026');
    const v2026 = await sendProbe(`version Value=${newerValue}`, base288M, { rankinglistversiondate: newerValue }, 'baseline288');
    if (!stopped) await sendProbe('pageindex=1 baseline288', base288M, { pageindex: '1' }, 'baseline288');
    if (!stopped) await sendProbe('agegroupid=5 gender=K list287', base287, { agegroupid: '5', gender: 'K' }, null);
    if (!stopped) await sendProbe('clubid=1093 list287', base287, { clubid: '1093' }, null);
    if (!stopped) await sendProbe('regionid=8 list287', base287, { regionid: '8' }, null);
    if (!stopped) await sendProbe('list289 param=M', base288M, { rankinglistid: '289' }, null);
    if (!stopped) await sendProbe('list292 param=M', base288M, { rankinglistid: '292' }, null);
    let season2025;
    if (!stopped) season2025 = await sendProbe('seasonid=2025 getversions', { ...base288M, seasonid: '2025', getversions: true }, {}, null);
    if (!stopped && season2025) {
      const dated = season2025.versions.filter((v) => v.value && /^\d{1,2}\/\d{1,2}\/2025$/u.test(v.value));
      const iso = (v) => { const [m, d, y] = v.value.split('/').map(Number); return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`; };
      const selected2025 = dated.sort((a, b) => iso(b).localeCompare(iso(a)))[0];
      result.season2025_selected_version = selected2025?.value ?? null;
      if (selected2025) await sendProbe(`season2025 version Value=${selected2025.value}`, { ...base288M, seasonid: '2025' }, { rankinglistversiondate: selected2025.value }, 'seasonid=2025 getversions');
      else result.questions.push('Sæson 2025-svaret indeholdt ingen dateret Value i kalenderåret 2025; historisk datofilter blev ikke gættet.');
    }
    if (!stopped && season2025) await sendProbe('seasonid=2022 getversions', { ...base288M, seasonid: '2022', getversions: true }, {}, null);
    const baselineForLink = [{ label: 'baseline288', records: oldBaselineRows }];
    const allRows = [...oldBaselineRows, ...successful.flatMap((x) => x.records)];
    const clubRows = successful.find((x) => x.label === 'clubid=1093 list287')?.records ?? [];
    result.linkage = {
      gsb: compareSamples(sample.gsb_players, [{ label: 'clubid=1093 list287', records: clubRows }]),
      opponents: compareSamples(sample.opponents, [{ label: 'all successful pilot lists', records: allRows }]),
      rule: 'ID-match kræver eksakt lighed mellem ranglistens player_id fra VisSpiller-link og lokal/national source-ID. Navn+klub er kun kandidat og bruger begge felter. GSB-spillere afprøves mod clubid=1093-svaret; modstandere mod alle hentede ranglister. Ikke fundet gælder kun disse svar/sider.',
      counts: {}
    };
    for (const group of ['gsb', 'opponents']) result.linkage.counts[group] = Object.fromEntries(['id_match', 'name_and_club_candidate', 'not_found_in_pilot_responses'].map((k) => [k, result.linkage[group].filter((x) => x.link_result === k).length]));
    result.probe_evidence.push(...evidence);
    result.continuation_completed_at = new Date().toISOString();
    result.status = stopped ? 'stopped_on_guard_or_error_limit' : 'completed_probe';
  } catch (error) {
    result.stop_reason ??= String(error?.message ?? error);
    result.status = stopped ? 'stopped_on_guard_or_error_limit' : 'incomplete_error';
    result.probe_evidence.push(...evidence);
    if (!result.questions.includes(result.stop_reason)) result.questions.push(result.stop_reason);
  } finally {
    result.request_count = requests.length;
    result.databases_after = await digestAll();
    result.database_hashes_unchanged = JSON.stringify(result.databases_before) === JSON.stringify(result.databases_after);
    const tested = new Set(result.continuation_probe_plan.map((x) => x.label));
    result.questions.push(`Fortsættelsen brugte ${requests.length - saved.requests.length} nye kald; samlet ${requests.length}/20. Ikke afprøvet: ${['regionid=8 list287','list289 param=M','list292 param=M','seasonid=2025 getversions','season2025 dated version','seasonid=2022 getversions'].filter((x) => !tested.has(x)).join(', ') || 'ingen planlagte efterfølgende filtre'}.`);
    result.plan = { list_ids: [287, 288, 289, 292], baseline_page_count_observed: result.findings?.page_count_from_html ?? 98, rows_per_page_observed: 100, versions_observed: result.findings?.versions_count ?? 42, full_harvest_request_count: 'beregn fra bekræftet antal versioner og sider pr. liste; endnu ukendt for lister/sæsoner der ikke blev afprøvet', pacing: 'sekventielt, mindst 2 sekunder; checkpoint pr. liste/version/side; stop efter tre fejl i træk eller botværn', storage: 'ny separat database, med rå-svar SHA-256 og requestparametre; ingen eksisterende database ændres', expected_winner_minimum: 'ranglistepoint for begge spillere på begge sider pr. disciplin og kampdato; vælg seneste version på eller før kampdatoen; uløste koblinger forbliver manglende' };
    writeOutputs();
  }
}
if (process.argv.includes('--continue')) {
  await continueRun();
  console.log(JSON.stringify({ status: result.status, requests: result.request_count, stop_reason: result.stop_reason ?? null, linkage: result.linkage?.counts ?? null, hashes_unchanged: result.database_hashes_unchanged }, null, 2));
  process.exit(0);
}
async function continueTail() {
  const saved = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  requests.push(...saved.requests);
  Object.assign(result, saved, { requests, continuation_tail_started_at: new Date().toISOString(), status: 'continuing', stop_reason: null });
  if (requests.length !== 16) throw new Error(`Forventede 16 loggede kald før tail; fandt ${requests.length}. Ingen request sendt.`);
  result.databases_before = await digestAll();
  for (const [name, expected] of Object.entries(expectedHashes)) if (result.databases_before[name] !== expected) throw new Error(`${name} hash mismatch before tail: ${result.databases_before[name]}`);
  result.database_open_checks = openAllDatabasesReadOnly();
  const page = await request('GET', pageUrl, null, 'frisk GET før afsluttende filtre');
  const marker = 'var SR_CallbackContext = ';
  const markerAt = page.indexOf(marker);
  const quote = String.fromCharCode(39);
  const a = markerAt >= 0 ? page.indexOf(quote, markerAt + marker.length) : -1;
  const b = a >= 0 ? page.indexOf(quote, a + 1) : -1;
  callbackContext = a >= 0 && b > a ? page.slice(a + 1, b) : null;
  if (!callbackContext) { stopped = true; throw new Error('STOP: frisk side mangler SR_CallbackContext'); }
  const base287 = { ...makeBase(callbackContext), rankinglistid: '287', param: '' };
  const evidence = [];
  const send = async (label, changes) => {
    const body = { ...base287, ...changes };
    try {
      const text = await request('POST', apiUrl, body, label);
      const data = unwrap(text);
      const rows = rankingDataRows(data);
      const classes = [...new Set(rows.map((r) => r.class).filter(Boolean))].sort();
      const clubs = [...new Set(rows.map((r) => r.club).filter(Boolean))].sort();
      const pageLinks = [...String(data?.Html ?? '').matchAll(/SelectRankingListPage\((\d+)\)/giu)].map((m) => Number(m[1]));
      const item = { label, records: rows, data };
      const entry = requests.at(-1);
      entry.result_summary = { rows: rows.length, classes: classes.length, clubs: clubs.length, last_page: pageLinks.length ? Math.max(...pageLinks) : null };
      evidence.push({ label, request_number: entry.number, request_fields: entry.request_fields, status: entry.status, response_bytes: entry.response_bytes, response_sha256: entry.response_sha256, rows: rows.length, classes, distinct_clubs: clubs, page_links: [...new Set(pageLinks)].sort((x, y) => x - y), first_five_rows: rows.slice(0, 5) });
      return item;
    } catch (error) {
      result.stop_reason = String(error?.message ?? error);
      throw error;
    }
  };
  try {
    const baseline287 = await send('baseline list287 current page0', {});
    const clubPage1 = await send('clubid=1093 list287 pageindex=1', { clubid: '1093', pageindex: '1' });
    const clubPage2 = await send('clubid=1093 list287 pageindex=2', { clubid: '1093', pageindex: '2' });
    const ageEvidence = result.probe_evidence.find((x) => x.label === 'agegroupid=5 gender=K list287');
    const ageRequest = requests.find((x) => x.label === 'agegroupid=5 gender=K list287');
    const ageRaw = JSON.parse(fs.readFileSync(path.join(root, ageRequest.saved_response), 'utf8'));
    const ageRows = rankingDataRows(ageRaw?.d ?? ageRaw);
    const rowSignature = (rows) => rows.map((r) => `${r.player_id}|${r.rank}|${r.points}`).join('\n');
    evidence[0].comparison = { against: 'agegroupid=5 gender=K list287', same_page0_rows: ageRows.length, exact_same_order_and_values: rowSignature(baseline287.records) === rowSignature(ageRows), age_filter_rows: ageRows.length, age_filter_distinct_classes: ageEvidence?.distinct_classes ?? [...new Set(ageRows.map((r) => r.class).filter(Boolean))].sort() };
    const clubPage0Entry = requests.find((x) => x.label === 'clubid=1093 list287');
    const clubPage0Raw = JSON.parse(fs.readFileSync(path.join(root, clubPage0Entry.saved_response), 'utf8'));
    const clubPage0 = rankingDataRows(clubPage0Raw?.d ?? clubPage0Raw);
    const clubRows = [...clubPage0, ...clubPage1.records, ...clubPage2.records];
    const uniqueClubRows = [...new Map(clubRows.map((r) => [r.player_id, r])).values()];
    const allRows = [];
    for (const entry of requests.filter((x) => x.method === 'POST' && x.status === 200 && x.saved_response)) {
      const envelope = JSON.parse(fs.readFileSync(path.join(root, entry.saved_response), 'utf8'));
      allRows.push(...rankingDataRows(envelope?.d ?? envelope));
    }
    result.linkage = {
      gsb: compareSamples(result.local_samples.gsb_players, [{ label: 'clubid=1093 list287 pages 0-2', records: uniqueClubRows }]),
      opponents: compareSamples(result.local_samples.opponents, [{ label: 'all successful pilot pages', records: allRows }]),
      rule: 'ID-match er eksakt player_id fra VisSpiller-link mod normaliseret external_player_id og national-spillere.db external_player_id. Navn+klub kræver begge felter efter trim/normalisering. GSB testes mod alle tre GSB-klubsider; modstandere mod samtlige hentede succesfulde sider. Ikke fundet betyder kun ikke fundet i disse svar.',
      searched_rows: { gsb_club_rows_page0: clubPage0.length, gsb_club_rows_pages0to2_deduplicated: uniqueClubRows.length, all_successful_response_rows: allRows.length },
      counts: {}
    };
    for (const group of ['gsb', 'opponents']) result.linkage.counts[group] = Object.fromEntries(['id_match', 'name_and_club_candidate', 'not_found_in_pilot_responses'].map((k) => [k, result.linkage[group].filter((x) => x.link_result === k).length]));
    result.probe_evidence.push(...evidence);
    result.filter_results = requests.filter((x) => x.method === 'POST').map((x) => ({ label: x.label, status: x.status ?? null, response_bytes: x.response_bytes ?? null, response_sha256: x.response_sha256 ?? null, request_fields: x.request_fields, result: x.status === 200 ? 'HTTP 200' : `HTTP ${x.status ?? 'fejl'}` }));
    result.status = 'completed_probe';
    result.stop_reason = null;
    result.continuation_tail_completed_at = new Date().toISOString();
  } catch (error) {
    result.status = stopped ? 'stopped_on_guard_or_error_limit' : 'incomplete_error';
    result.stop_reason ??= String(error?.message ?? error);
    result.questions.push(result.stop_reason);
    result.probe_evidence.push(...evidence);
  } finally {
    result.request_count = requests.length;
    result.databases_after = await digestAll();
    result.database_hashes_unchanged = JSON.stringify(result.databases_before) === JSON.stringify(result.databases_after);
    result.questions = [
      `Samlet antal kald: ${requests.length}/20.`,
      `Sæson 2022 versionslisten indeholder ${result.probe_evidence.find((x) => x.label === 'seasonid=2022 getversions')?.dated_versions ?? 'ukendt'} daterede entries; ældste/længst tilbage vises i den gemte raw response.`,
      ...(result.questions ?? [])
    ];
    writeOutputs();
  }
}
if (process.argv.includes('--continue-tail')) {
  await continueTail();
  console.log(JSON.stringify({ status: result.status, requests: result.request_count, linkage: result.linkage?.counts ?? null, hashes_unchanged: result.database_hashes_unchanged }, null, 2));
  process.exit(0);
}
fs.mkdirSync(outDir, { recursive: true });
result.databases_before = await digestAll();
for (const [name, expected] of Object.entries(expectedHashes)) if (result.databases_before[name] !== expected) throw new Error(`${name} hash mismatch before run: ${result.databases_before[name]}`);
result.database_open_checks = openAllDatabasesReadOnly();
sample = sampleLocalRows();
result.local_samples = sample;
const parsedResponses = [];
try {
  const page = await request('GET', pageUrl, null, 'GET frisk Ranglister-side');
  const marker = 'var SR_CallbackContext = ';
  const idx = page.indexOf(marker);
  const quote = String.fromCharCode(39);
  const start = idx >= 0 ? page.indexOf(quote, idx + marker.length) : -1;
  const end = start >= 0 ? page.indexOf(quote, start + 1) : -1;
  callbackContext = start >= 0 && end > start ? page.slice(start + 1, end) : null;
  if (!callbackContext) throw new Error('STOP: SR_CallbackContext ikke fundet på siden');
  const base = makeBase(callbackContext);
  const baselineText = await request('POST', apiUrl, base, 'baseline liste 288 param=M version/current side 0');
  const baselineData = unwrap(baselineText);
  const baselineScan = scan(baselineData);
  const baselineArrays = baselineScan.arrays.sort((a, b) => b.length - a.length);
  let structuredRows = rankingDataRows(baselineData);
  let tableRows = [];
  parsedResponses.push({ label: 'baseline', records: structuredRows, table_rows: tableRows, data: baselineData });
  result.findings = {
    baseline_status: requests.at(-1)?.status,
    response_type: typeof baselineData,
    top_level_keys: baselineData && typeof baselineData === 'object' && !Array.isArray(baselineData) ? Object.keys(baselineData) : [],
    arrays: baselineArrays.map(({ path: p, length }) => ({ path: p, length })),
    row_count: structuredRows.length || tableRows.length,
    first_row_fields: structuredRows[0] && typeof structuredRows[0] === 'object' ? Object.keys(structuredRows[0]) : [],
    first_row: structuredRows[0] ?? tableRows[0] ?? null,
    page_metadata: baselineScan.pageMeta,
    dates_in_response: [...new Map(baselineScan.dates.map((d) => [d.value, d])).values()],
  };
  const dates = result.findings.dates_in_response;
  const versionValues = Array.isArray(baselineData?.Versions) ? baselineData.Versions.map((v) => ({ text: v.Text, value: v.Value })) : [];
  const versionForYear = (year, month = null) => versionValues.find((v) => {
    const d = String(v.value ?? '');
    const m = d.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/u);
    return m && Number(m[3]) === year && (month == null || Number(m[1]) === month);
  });
  const selected = [versionForYear(2026, 9), versionForYear(2023)].filter(Boolean).map((v) => v.value);
  const probes = [];
  for (const date of selected.filter(Boolean)) probes.push({ label: `version=${date}`, changes: { rankinglistversiondate: date } });
  for (const age of ['4', '5']) for (const gender of ['K', 'M']) probes.push({ label: `age=${age},gender=${gender}`, changes: { agegroupid: age, gender } });
  probes.push({ label: 'clubid=1093', changes: { clubid: '1093' } }, { label: 'regionid=8', changes: { regionid: '8' } });
  for (const list of ['289', '292']) for (const gender of ['M', 'K']) probes.push({ label: `list=${list},param=${gender}`, changes: { rankinglistid: list, param: gender } });
  const pageMax = baselineScan.pageMeta.filter((x) => /page|total/iu.test(x.path)).map((x) => Number(x.value)).filter(Number.isFinite).some((n) => n > 1);
  if (pageMax) probes.push({ label: 'pageindex=1', changes: { pageindex: '1' } });
  const pre2022 = dates.map((d) => d.value).filter((x) => /(?:^|[-/.])(?:201\d|2020|2021)(?:[-/.]|$)/u.test(x)).sort().at(-1);
  if (pre2022) probes.push({ label: `pre-2022 version=${pre2022}`, changes: { rankinglistversiondate: pre2022 } });
  result.probe_plan = probes.map((p) => ({ label: p.label, changed_fields: p.changes }));
  for (const probe of probes) {
    const body = { ...base, ...probe.changes };
    try {
      const text = await request('POST', apiUrl, body, probe.label);
      const data = unwrap(text); const scanResult = scan(data); const arrays = scanResult.arrays.sort((a, b) => b.length - a.length);
      const rows = arrays[0]?.rows ?? [];
      const html = typeof data === 'string' ? htmlRows(data) : [];
      parsedResponses.push({ label: probe.label, records: rows, table_rows: html, data });
      requests.at(-1).result_summary = { type: typeof data, keys: data && typeof data === 'object' && !Array.isArray(data) ? Object.keys(data) : [], row_count: rows.length || html.length, fields: rows[0] && typeof rows[0] === 'object' ? Object.keys(rows[0]) : [], versions: scanResult.dates.map((d) => d.value) };
    } catch (error) {
      if (stopped) throw error;
      requests.at(-1).error = String(error?.message ?? error);
      if (/5\d\d|429/u.test(requests.at(-1).error)) { await delay(2000); }
      else throw error;
    }
    if (stopped) break;
  }
  const responsesForLink = parsedResponses.map((x) => ({ label: x.label, records: x.records }));
  result.linkage = {
    gsb: compareSamples(sample.gsb_players, responsesForLink),
    opponents: compareSamples(sample.opponents, responsesForLink),
    rule: 'ID match requires an exact source ID match in an API row field named playerid/externalplayerid/memberid/nembadmintonmemberid/badmintonplayerid. Exact normalized name alone is only a candidate, not an ID link. Not found means absent from this limited pilot subset, not proven absent from all rankings.',
    counts: {},
  };
  for (const group of ['gsb', 'opponents']) result.linkage.counts[group] = Object.fromEntries(['id_match', 'name_only_candidate', 'not_found_in_pilot_responses'].map((k) => [k, result.linkage[group].filter((x) => x.link_result === k).length]));
  result.plan = { list_ids: [288, 289, 292], snapshot_dates: 'Enumerate through getversions result if it supplies version dates; one full response for each list/version/filter/page required.', estimate: 'Exact total is unknown until the number of versions and pages per list are confirmed. Request budget estimate = sum over required list × version × page combinations, plus a small number of discovery/version queries.', pacing: 'Sequential, ≥2 s between calls; checkpoint after each list/version/filter/page; backoff 429/5xx and stop after 3 consecutive failures.', storage: 'Create a new separate database; do not extend any existing DB. Store source URL, request filters, version date, page index, raw-response SHA-256 and normalized ranking row fields.', expected_winner_minimum: 'At least one dated ranking point per player on both sides, for every discipline in each match, selecting only a ranking version at or before the match date; unresolved IDs/names remain missing.' };
  result.status = stopped ? 'stopped' : 'completed_probe';
} catch (error) {
  result.stop_reason = String(error?.message ?? error);
  result.status = stopped ? 'stopped_on_guard_or_limit' : 'incomplete_error';
} finally {
  result.databases_after = await digestAll();
  result.database_hashes_unchanged = JSON.stringify(result.databases_before) === JSON.stringify(result.databases_after);
  if (result.database_hashes_unchanged !== true) result.stop_reason = `${result.stop_reason ?? ''}; database hash changed`;
  result.questions ??= [];
  if (result.status !== 'completed_probe') result.questions.push(result.stop_reason ?? 'Kørslen blev stoppet før alle filtre kunne afprøves.');
  writeOutputs();
}
console.log(JSON.stringify({ status: result.status, requests: requests.length, request_limit: maxRequests, stop_reason: result.stop_reason ?? null, baseline: result.findings ? { status: result.findings.baseline_status, rows: result.findings.row_count, fields: result.findings.first_row_fields } : null, linkage: result.linkage?.counts ?? null, hashes_unchanged: result.database_hashes_unchanged, questions: result.questions }, null, 2));
