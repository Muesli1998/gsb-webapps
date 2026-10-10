import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { opretKlient, skrivAtomisk, tilfoejLinje, genoptag, vurderSvar } from './hent.mjs';

const temp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'hent-test-'));
const fakeFetch = (...responses) => { let i = 0; return async () => { const r = responses[Math.min(i++, responses.length - 1)]; return { status: r.status ?? 200, text: async () => r.text }; }; };
const noSleep = async () => {};

test('a) råsvar og log gemmes før parserfejl', async () => {
  const dir = temp(); const client = opretKlient({ mappe: dir, loft: 2, minPauseMs: 0, fetchFn: fakeFetch({ text: 'data' }), sovFn: noSleep });
  await assert.rejects(client.post('Eksempel', { id: 1 }, 'parser', () => { throw Error('parse'); }), /parse/);
  assert.match(fs.readFileSync(path.join(dir, 'calls.jsonl'), 'utf8'), /"label":"parser"/);
});

test('b) skrivAtomisk klarer tre EBUSY', async () => {
  const dir = temp(), original = fs.writeFileSync; let failures = 3;
  const fake = Object.create(fs); fake.writeFileSync = (...args) => { if (failures--) { const e = Error(); e.code = 'EBUSY'; throw e; } return original(...args); };
  await skrivAtomisk(path.join(dir, 'a'), 'ok', { fsFn: fake, sovFn: noSleep });
  assert.equal(fs.readFileSync(path.join(dir, 'a'), 'utf8'), 'ok');
});

test('c) seks EBUSY fejler uden at ødelægge calls.jsonl', async () => {
  const dir = temp(), log = path.join(dir, 'calls.jsonl'); await tilfoejLinje(log, { ok: 1 });
  const fake = Object.create(fs); fake.writeFileSync = () => { const e = Error(); e.code = 'EBUSY'; throw e; };
  await assert.rejects(skrivAtomisk(path.join(dir, 'a'), 'x', { fsFn: fake, sovFn: noSleep }));
  assert.equal(JSON.parse(fs.readFileSync(log, 'utf8')).ok, 1);
});

test('d) 429 giver backoff og derefter 200', async () => {
  const dir = temp(), waits = []; let calls = 0;
  const client = opretKlient({ mappe: dir, loft: 3, minPauseMs: 0, fetchFn: async () => ({ status: calls++ ? 200 : 429, text: async () => 'ok' }), sovFn: async ms => waits.push(ms) });
  await client.post('X', {}, 'backoff'); assert.ok(waits.includes(1000)); assert.equal(calls, 2);
});

test('e) reCAPTCHA-konfiguration og Cookiebot er ikke stopårsager', () => {
  assert.equal(vurderSvar({ status: 200, text: 'RECAPTCHA_SITE_KEY Cookiebot captcha robot' }).stop, false);
});

test('f) challenge-platform stopper med årsag og uddrag', () => {
  const result = vurderSvar({ status: 200, text: 'abc challenge-platform xyz' });
  assert.equal(result.stop, true); assert.match(result.aarsag, /udfordringsside/); assert.match(result.uddrag, /challenge-platform/);
});

test('g) identiske svar for forskellige felter stopper', async () => {
  const dir = temp(), client = opretKlient({ mappe: dir, loft: 4, minPauseMs: 0, fetchFn: fakeFetch({ text: 'same' }), sovFn: noSleep });
  await client.post('X', { filter: 'a' }, 'samme-label');
  await assert.rejects(client.post('X', { filter: 'b' }, 'samme-label'), /filteret virker ikke/);
});

test('h) kaldloft kontrolleres før fetch', async () => {
  let sent = 0; const client = opretKlient({ mappe: temp(), loft: 1, tidligereKald: 1, minPauseMs: 0, fetchFn: async () => { sent++; }, sovFn: noSleep });
  await assert.rejects(client.post('X', {}, 'loft'), /Kaldloft/); assert.equal(sent, 0);
});

test('i) minimumspause mellem kald er 2100 ms', async () => {
  let clock = 0; const starts = [];
  const client = opretKlient({ mappe: temp(), loft: 3, fetchFn: async () => { starts.push(clock); return { status: 200, text: async () => 'ok' }; },
    sovFn: async ms => { clock += ms; }, nowFn: () => clock });
  await client.post('X', {}, 'en'); await client.post('X', {}, 'to'); assert.ok(starts[1] - starts[0] >= 2100);
});

test('j) genoptagelse springer gyldige labels over og gentager korrupte', async () => {
  const dir = temp(); await fs.promises.writeFile(path.join(dir, 'ok.gz'), zlib.gzipSync('valid'));
  await fs.promises.writeFile(path.join(dir, 'bad.gz'), 'broken');
  await tilfoejLinje(path.join(dir, 'calls.jsonl'), { label: 'ok', saved_file: 'ok.gz' });
  await tilfoejLinje(path.join(dir, 'calls.jsonl'), { label: 'bad', saved_file: 'bad.gz' });
  const done = await genoptag(dir, text => text === 'valid'); assert.deepEqual([...done], ['ok']);
});

test('k) context value is absent from all persisted files', async () => {
  const dir = temp(), secret = 'private-context-value';
  const client = opretKlient({ mappe: dir, loft: 2, minPauseMs: 0, fetchFn: fakeFetch({ text: `var SR_CallbackContext = '${secret}';` }), sovFn: noSleep });
  await client.hentKontekst(); await client.afslut();
  for (const file of fs.readdirSync(dir)) assert.equal(fs.readFileSync(path.join(dir, file)).includes(secret), false, file);
});

test('l) arkiverede GET-svar uden allerede redigeret kontekst giver ikke stop', () => {
  const root = process.cwd();
  const files = [
    ['statistik/results/158-raa-svar/kald-002-get.txt.gz', true],
    ['statistik/results/149-raa-svar/01-rangliste-page-redacted.html', false],
    ['statistik/results/158b-raa-svar/call-005.json.gz', true]
  ];
  for (const [relative, gzip] of files) {
    const bytes = fs.readFileSync(path.join(root, relative)); const text = gzip ? zlib.gunzipSync(bytes).toString('utf8') : bytes.toString('utf8');
    assert.equal(vurderSvar({ status: 200, method: 'GET', url: 'https://badmintonplayer.dk/DBF/Ranglister/', text, kraevKontekst: false }).stop, false, relative);
  }
});
