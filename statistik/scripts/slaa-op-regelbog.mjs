import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bookPath = path.join(root, 'kilder', 'reglementer', 'regelbog-pr-saeson.json');

function usage() {
  console.error('Brug: node statistik/scripts/slaa-op-regelbog.mjs <sæson> <ungdom|senior|veteran> <område>');
  process.exitCode = 2;
}

const [season, group, ...areaParts] = process.argv.slice(2);
if (!season || !['ungdom', 'senior', 'veteran'].includes(group) || areaParts.length === 0) {
  usage();
} else {
  const area = areaParts.join(' ');
  const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
  const matches = book.entries.filter((entry) => entry.season === season && entry.target_group === group
    && (entry.area === area || (entry.omraade_varianter ?? []).includes(area)));
  const result = matches.length === 1 ? matches[0] : null;
  if (!result) {
    console.error(`Ingen matrixpost: ${season} / ${group} / ${area}`);
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(result, null, 2));
  }
}
