#!/usr/bin/env node
// Skriver KUN i afsnittene "Spørgsmål" eller "Resultat" i en kortfil. Alt andet bevares byte for byte
// (BOM, UTF-8, linjeskift). Fejler lukket og rører ikke kortet, hvis noget ikke stemmer.
//
// Brug (fra repo-roden): node tools/skriv-kort-afsnit.mjs <work/aabne/NNN-navn.md> <Spørgsmål|Resultat> <tekstfil|-> [--tilfoej]
//   Tekstfilen skal ligge inde i repoet (fx work/koersler/<nr>/tekst.md), eller være - for stdin.
//   Kortstien skal være repo-relativ. Repo-roden er mappen over denne fil (tools/..), ikke arbejdsmappen.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const TILLADTE = ['Spørgsmål', 'Resultat'];
const fejl = m => { console.error('SKRIV-KORT-AFSNIT: ' + m + '\nSkriv ikke hele kortfilen som fallback. Stop og rapportér fejlen.'); process.exit(1); };

const args = process.argv.slice(2);
const tilfoej = args.includes('--tilfoej');
const [fil, afsnit, kilde] = args.filter(a => a !== '--tilfoej');
if (!fil || !afsnit || !kilde) fejl('Brug: node tools/skriv-kort-afsnit.mjs <work/aabne/NNN-navn.md> <Spørgsmål|Resultat> <tekstfil|-> [--tilfoej]');
if (!TILLADTE.includes(afsnit)) fejl(`Afsnittet skal være ét af: ${TILLADTE.join(', ')}`);

// --- Sti: kun repo-relativ, og den opløste sti (efter symlinks/junctions) skal ligge i repoets work/-mapper.
const ROD = fs.realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
if (path.isAbsolute(fil) || /^[A-Za-z]:/.test(fil) || fil.startsWith('\\\\')) fejl('Kortstien skal være repo-relativ (fx work/aabne/172-….md), ikke absolut.');
const rel = fil.replace(/\\/g, '/').replace(/^\.\//, '');
if (rel.split('/').includes('..')) fejl('Kortstien må ikke indeholde "..".');
if (!/^work\/(aabne|future|arkiv)\/\d+-[^/]*\.md$/.test(rel)) fejl('Kortstien skal være work/aabne|future|arkiv/<nummer>-<navn>.md');
const maal = path.join(ROD, ...rel.split('/'));
let rigtig;
try { rigtig = fs.realpathSync(maal); } catch { fejl('Kortfilen findes ikke: ' + rel); }
const iRod = p => { const x = path.relative(ROD, p); return x !== '' && !x.startsWith('..') && !path.isAbsolute(x); };
const tilladtRod = ['aabne', 'future', 'arkiv'].map(d => fs.existsSync(path.join(ROD, 'work', d)) ? fs.realpathSync(path.join(ROD, 'work', d)) : null).filter(r => r && iRod(r));
const indenfor = tilladtRod.some(r => { const x = path.relative(r, rigtig); return x && !x.startsWith('..') && !path.isAbsolute(x) && !x.includes(path.sep); });
if (!indenfor) fejl('Den opløste sti ligger uden for repoets work/aabne|future|arkiv (symlink/junction?): ' + rigtig);
if (!fs.statSync(rigtig).isFile()) fejl('Kortet er ikke en almindelig fil.');

const strikt = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
const dekod = b => { try { return strikt.decode(b); } catch { fejl('Ugyldig UTF-8; afbrudt uden at ændre noget.'); } };
const hash = b => crypto.createHash('sha256').update(b).digest('hex');

const orig = fs.readFileSync(rigtig);
const tekst = dekod(orig);

// --- Find H2-overskrifter (positioner i den originale streng).
const overskrifter = [];
const reg = /^(## [^\r\n]*?)[ \t]*(\r\n|\n|$)/gm;
let m;
while ((m = reg.exec(tekst)) !== null) {
  overskrifter.push({ navn: m[1].slice(3), start: m.index, slutLinje: m.index + m[0].length, eol: m[2] });
  if (m[0].length === 0) reg.lastIndex++;
}
const mine = overskrifter.filter(o => o.navn === afsnit);
if (mine.length !== 1) fejl(`Forventede præcis én overskrift "## ${afsnit}", fandt ${mine.length}; afbrudt uden at ændre noget.`);
const o = mine[0];
const naeste = overskrifter[overskrifter.indexOf(o) + 1];
const slut = naeste ? naeste.start : tekst.length;
const krop = tekst.slice(o.slutLinje, slut);
const eol = o.eol || (tekst.match(/\r\n|\n/) || ['\n'])[0];

let kildeSti = 0;
if (kilde !== '-') {
  let kr; try { kr = fs.realpathSync(path.resolve(kilde)); } catch { fejl('Tekstfilen findes ikke: ' + kilde); }
  if (!iRod(kr) || !fs.statSync(kr).isFile()) fejl('Tekstfilen skal være en almindelig fil inde i repoet (fx work/koersler/<nr>/…) eller - for stdin.');
  kildeSti = kr;
}
let nyTekst = dekod(fs.readFileSync(kildeSti)).replace(/^﻿/, '').replace(/\r\n?|\n/g, '\n').replace(/\s+$/, '');
if (!nyTekst) fejl('Den nye tekst er tom; afbrudt.');
if (/^## /m.test(nyTekst)) fejl('Den nye tekst må ikke indeholde en linje der starter med "## ".');
nyTekst = nyTekst.replace(/\n/g, eol);

let nyKrop = tilfoej ? ((krop.replace(/\s+$/, '')) ? krop.replace(/\s+$/, '') + eol : '') + nyTekst : nyTekst;
nyKrop += naeste ? eol + eol : eol;
const nyBytes = Buffer.from(tekst.slice(0, o.slutLinje) + (o.eol ? '' : eol) + nyKrop + tekst.slice(slut), 'utf8');

const foer = Buffer.from(tekst.slice(0, o.slutLinje), 'utf8');
const efter = Buffer.from(tekst.slice(slut), 'utf8');
const uaendret = b => b.subarray(0, foer.length).equals(orig.subarray(0, foer.length)) &&
  b.subarray(b.length - efter.length).equals(orig.subarray(orig.length - efter.length));
if (!uaendret(nyBytes)) fejl('Kontrol af uændrede bytes fejlede; afbrudt uden at ændre noget.');

// --- Skriv via unik tempfil i samme mappe, med oprydning ved enhver fejl.
const tmp = path.join(path.dirname(rigtig), `.skriv-kort-${process.pid}-${crypto.randomBytes(4).toString('hex')}.tmp`);
const ryd = () => { try { fs.unlinkSync(tmp); } catch {} };
try {
  fs.writeFileSync(tmp, nyBytes, { flag: 'wx' });
  if (!fs.readFileSync(tmp).equals(nyBytes)) { ryd(); fejl('Tempfilen blev ikke skrevet korrekt; kortet er urørt.'); }
  // Er kortet ændret af andre, siden vi læste det? Så skriver vi ikke.
  if (hash(fs.readFileSync(rigtig)) !== hash(orig)) { ryd(); fejl('Kortet er ændret af andre, mens scriptet kørte; afbrudt og kortet er urørt. Prøv igen.'); }
  fs.renameSync(tmp, rigtig);
} catch (e) { ryd(); fejl('Skrivning fejlede: ' + e.message); }

// --- Genlæs efter udskiftningen.
const slutBytes = fs.readFileSync(rigtig);
if (!slutBytes.equals(nyBytes) || !uaendret(slutBytes)) fejl('ADVARSEL: kortet ser ikke ud som forventet efter udskiftningen. Kontrollér med git diff.');
console.log(`OK: "## ${afsnit}" opdateret i ${rel}. Bytes uden for afsnittet er uændrede (BOM ${orig[0] === 0xef ? 'bevaret' : 'ingen'}).`);
