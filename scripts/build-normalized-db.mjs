import { readFile, mkdir } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';

await mkdir(new URL('../data/', import.meta.url), { recursive: true });
const dbPath = new URL('../data/gsb-statistik-normalized.db', import.meta.url).pathname;
const db = new DatabaseSync(dbPath);
const sql = await readFile(new URL('../sql/normalized-import.sql', import.meta.url), 'utf8');
db.exec(sql);
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
const counts = {};
for (const { name } of tables) counts[name] = db.prepare(`SELECT COUNT(*) AS n FROM "${name}"`).get().n;
console.log(JSON.stringify({ dbPath, counts }, null, 2));
db.close();
