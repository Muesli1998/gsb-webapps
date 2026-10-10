import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

const PAGE = 'https://badmintonplayer.dk/DBF/Ranglister/';
const SERVICE = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const retryable = error => ['EPERM', 'EBUSY', 'EACCES', 'UNKNOWN'].includes(String(error?.code ?? '').toUpperCase());
const waitRetry = async (error, attempt, sovFn) => {
  if (!retryable(error) || attempt === 6) throw error;
  await sovFn(150 * attempt);
};

export async function skrivAtomisk(sti, indhold, { fsFn = fs, sovFn = sleep } = {}) {
  fsFn.mkdirSync(path.dirname(sti), { recursive: true });
  let error;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      fsFn.writeFileSync(`${sti}.tmp`, indhold);
      fsFn.renameSync(`${sti}.tmp`, sti);
      return;
    } catch (caught) {
      error = caught;
      try { fsFn.unlinkSync(`${sti}.tmp`); } catch {}
      await waitRetry(caught, attempt, sovFn);
    }
  }
  throw error;
}

export async function tilfoejLinje(sti, objekt, { fsFn = fs, sovFn = sleep } = {}) {
  fsFn.mkdirSync(path.dirname(sti), { recursive: true });
  const line = `${JSON.stringify(objekt)}\n`;
  let error;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try { fsFn.appendFileSync(sti, line, 'utf8'); return; }
    catch (caught) { error = caught; await waitRetry(caught, attempt, sovFn); }
  }
  throw error;
}

export function redigerSvar(text) {
  return String(text)
    .replace(/(\bSR_CallbackContext\s*=\s*['"])[^'"]*(['"])/giu, '$1[REDACTED]$2')
    .replace(/("callbackcontextkey"\s*:\s*")[^"]*(")/giu, '$1[REDACTED]$2')
    .replace(/(\bcallbackcontextkey\s*[:=]\s*['"])[^'"]*(['"])/giu, '$1[REDACTED]$2');
}

export function vurderSvar({ status, text, method = 'POST', url = '', kraevKontekst = true } = {}) {
  const body = String(text ?? '');
  let match;
  let aarsag = '';
  if (status !== 200 && status !== 429 && !(status >= 500 && status <= 599)) {
    aarsag = `Uventet HTTP-status ${status}`;
    match = body.slice(0, 200);
  } else if (method === 'GET' && url.includes('/DBF/Ranglister/') && kraevKontekst && !/\bSR_CallbackContext\s*=/iu.test(body)) {
    aarsag = 'GET /DBF/Ranglister/ mangler SR_CallbackContext';
    match = body.slice(0, 200);
  } else {
    const re = /challenge-platform|Just a moment|verify you are human|Attention Required|<form\b[^>]*>[\s\S]{0,5000}?g-recaptcha-response[\s\S]{0,5000}?<\/form>/iu;
    const found = re.exec(body);
    if (found) { aarsag = 'Tydelig udfordringsside'; match = found[0]; }
  }
  if (!aarsag) return { stop: false, aarsag: '', uddrag: '' };
  const at = Math.max(0, body.indexOf(match));
  return { stop: true, aarsag, uddrag: redigerSvar(body.slice(Math.max(0, at - 100), at + 100)) };
}

const digest = text => crypto.createHash('sha256').update(text).digest('hex');
const cleanFields = obj => Object.fromEntries(Object.entries(obj ?? {}).filter(([key]) => !/callbackcontextkey|sr_callbackcontext/iu.test(key)));

export async function genoptag(mappe, validerFn = () => true) {
  const file = path.join(mappe, 'calls.jsonl');
  const valid = new Set();
  if (!fs.existsSync(file)) return valid;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/u).filter(Boolean)) {
    let call;
    try { call = JSON.parse(line); } catch { continue; }
    if (!call.label || !call.saved_file) continue;
    try {
      const raw = zlib.gunzipSync(fs.readFileSync(path.join(mappe, call.saved_file))).toString('utf8');
      if (await validerFn(raw, call)) valid.add(call.label);
    } catch {}
  }
  return valid;
}

export function opretKlient({ mappe, loft, tidligereKald = 0, minPauseMs = 2100, fetchFn = fetch, sovFn = sleep, nowFn = Date.now } = {}) {
  if (!mappe || !Number.isFinite(loft)) throw new TypeError('mappe og numerisk loft kræves');
  fs.mkdirSync(mappe, { recursive: true });
  const callLog = path.join(mappe, 'calls.jsonl');
  let count = 0;
  let lastCallAt = null;
  let consecutiveErrors = 0;
  let checkpointDirty = false;
  const savedCalls = [];
  const contextFields = {};

  async function checkpoint(force = false) {
    if (!force && (!checkpointDirty || count % 10 !== 0)) return;
    try {
      await skrivAtomisk(path.join(mappe, 'state.json'), JSON.stringify({ calls: savedCalls }, null, 2) + '\n', { sovFn });
      checkpointDirty = false;
    } catch (error) { console.warn(`Checkpoint advarsel: ${error.message}`); }
  }

  async function perform({ method, url, label, fields = {}, body, parse = text => text, requireContext = false }) {
    let response;
    let text;
    let status;
    let record;
    let retry = 0;
    do {
      if (lastCallAt !== null) {
        const pauseMs = retry === 0 ? minPauseMs : Math.max(minPauseMs, 1000 * retry);
        await sovFn(Math.max(0, pauseMs - (nowFn() - lastCallAt)));
      }
      if (Number(tidligereKald) + count + 1 > loft) throw new Error(`Kaldloft overskredet (${loft}); anmodningen blev ikke sendt`);
      count++;
      lastCallAt = nowFn();
      response = await fetchFn(url, { method, ...(body === undefined ? {} : { headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) }) });
      status = response.status;
      text = await response.text();
      const redacted = redigerSvar(text);
      const filename = `call-${String(Number(tidligereKald) + count).padStart(3, '0')}.json.gz`;
      fs.writeFileSync(path.join(mappe, filename), zlib.gzipSync(redacted));
      record = { number: Number(tidligereKald) + count, timestamp: new Date().toISOString(), method, label, fields: cleanFields(fields), status, retry,
        bytes: Buffer.byteLength(redacted), sha256: digest(redacted), saved_file: filename };
      await tilfoejLinje(callLog, record, { sovFn });
      savedCalls.push(record); checkpointDirty = true;
      await checkpoint();
      const prior = status === 200 ? savedCalls.slice(0, -1).find(row => row.status === 200 && row.label === label && JSON.stringify(row.fields) !== JSON.stringify(record.fields)) : null;
      if (prior && prior.sha256.toLowerCase() === record.sha256.toLowerCase()) throw new Error('filteret virker ikke');
      if (status !== 429 && !(status >= 500 && status <= 599)) break;
      if (retry >= 2) break;
      retry++;
    } while (true);
    const redacted = redigerSvar(text);
    const verdict = vurderSvar({ status, text: redacted, method, url, kraevKontekst: requireContext });
    if (verdict.stop) {
      record.stop = verdict;
      await tilfoejLinje(callLog, { number: record.number, stop: verdict }, { sovFn });
      consecutiveErrors++;
      if (consecutiveErrors >= 3) throw new Error(`STOP efter 3 fejl i træk: ${verdict.aarsag}`);
      throw new Error(`STOP: ${verdict.aarsag}; ${verdict.uddrag}`);
    }
    if (status !== 200) {
      consecutiveErrors++;
      if (consecutiveErrors >= 3) throw new Error(`STOP efter 3 fejl i træk: HTTP ${status}`);
      throw new Error(`HTTP ${status}`);
    }
    consecutiveErrors = 0;
    return parse(text, { status, record });
  }

  async function hentKontekst() {
    return perform({ method: 'GET', url: PAGE, label: 'frisk offentlig kontekst', requireContext: true,
      parse(text) {
        const found = text.match(/\bSR_CallbackContext\s*=\s*['"]([^'"]+)['"]/iu);
        if (!found) throw new Error('SR_CallbackContext mangler efter gemt GET-svar');
        contextFields.callbackcontextkey = found[1];
        return found[1];
      } });
  }

  async function post(metode, krop, label, parse = text => text) {
    const fields = { ...(krop ?? {}) };
    delete fields.callbackcontextkey;
    const payload = { callbackcontextkey: contextFields.callbackcontextkey ?? '', ...fields };
    return perform({ method: 'POST', url: `${SERVICE}${metode}`, label, fields,
      body: payload, parse });
  }

  async function sammenlignForsteTo(label) {
    const rows = fs.readFileSync(callLog, 'utf8').split(/\r?\n/u).filter(Boolean).map(line => { try { return JSON.parse(line); } catch { return null; } })
      .filter(row => row?.label === label && row.status === 200 && row.sha256);
    if (rows.length < 2) throw new Error('Mindst to kald med samme label kræves');
    if (JSON.stringify(rows[0].fields) === JSON.stringify(rows[1].fields)) throw new Error('Kaldparametrene er ikke forskellige');
    if (rows[0].sha256.toLowerCase() === rows[1].sha256.toLowerCase()) throw new Error('filteret virker ikke');
    return true;
  }
  async function afslut() { await checkpoint(true); }
  return { hentKontekst, post, sammenlignForsteTo, afslut, get antalKald() { return count; } };
}
