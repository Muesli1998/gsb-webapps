import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const entries = fs.readFileSync(path.join(root, 'statistik', 'HASHES.txt'), 'utf8').trim().split(/\r?\n/u).map(line => {
  const match = line.match(/^([a-f\d]{64})\s{2}(.+)$/iu);
  if (!match) throw new Error(`Ugyldig linje i HASHES.txt: ${line}`);
  return { expected: match[1], name: match[2] };
});
let failed = false;
console.log('| Database | Forventet SHA-256 | Faktisk SHA-256 | Match |');
console.log('|---|---|---|---|');
for (const { expected, name } of entries) {
  const file = path.join(root, 'statistik', 'data', name);
  if (!fs.existsSync(file)) { console.log(`| ${name} | ${expected} | mangler | nej |`); failed = true; continue; }
  const hash = crypto.createHash('sha256');
  for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  const actual = hash.digest('hex');
  const ok = actual.toLowerCase() === expected.toLowerCase();
  console.log(`| ${name} | ${expected} | ${actual} | ${ok ? 'ja' : 'nej'} |`);
  if (!ok) failed = true;
}
if (failed) process.exitCode = 1;
