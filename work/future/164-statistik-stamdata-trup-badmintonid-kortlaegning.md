# Opgave 164 — stamdata for GSB-spillere: navne, aliaser og ID'er på tværs af kilderne (kun læsning)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** — (kan køres nu) · **Netværk:** ingen

**Trin:** Forberedelse til alle kort, der skal slå en spiller op: 163, 169, 173, 186. Løser også det åbne spørgsmål om "vores side" (BESLUTNINGER 2026-10-04).

## Gren
`arbejde/164-statistik-stamdata-trup-badmintonid-kortlaegning`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Samme person står under flere navne og ID'er: Resultater bruger BD-navne, Dream Team har en 44-navns facit-liste (`data/navne-alias.json`, `apps/netlify-prod/netlify/lib/navne.js`), `national-spillere.db` har spiller-ID'er (kort 116–120), ranglisten har et `playerid` (fx 329159 i 158b), og den normaliserede DB har sine egne spiller-rækker.
- Ukendt: om rangliste-`playerid` er det samme tal som BadmintonID i `national-spillere.db`. 149 og 155 efterlod spørgsmålet åbent. Ukendt: hvordan man strukturelt afgør, hvilken side i en kamp der er GSB, uden en navneliste (BESLUTNINGER 2026-10-04 "vores side").
- Kort 016 (spiller-id-kobling), 032 (navnematch-risiko) og 036 (navnematch-audit) er læst før dette kort skrives; resultaterne skal bruges, ikke laves om.

## Mål
1. Læs 016, 032, 036, 116, `data/navne-alias.json`, `rangliste-point.db`, `national-spillere.db` og normalized DB (alle read-only). Lav en stamdatatabel pr. person: kanonisk navn, aliaser, rangliste-`playerid`, `national-spillere`-ID, normalized-DB-ID'er, klub (ranglistens klubfelt), køn, fødselsår/aldersgruppe hvis kilden har det, aktiv 2025/26 og 2026/27.
2. Klassificér hver kobling: **entydig på ID**, **navn+klub** (markér uafklaret), **kun navn**, **ingen**. Tæl hver klasse. Udtræk alle navnekonflikter (to personer, samme navn; én person, to navne) som liste.
3. Afgør med evidens, om rangliste-`playerid` = BadmintonID: sammenlign for alle personer, der findes begge steder. Resultat: ja/nej/delvist, med tal og tre eksempler.
4. "Vores side": for GSB-kampene i 2025/26 i normalized DB (271 ungdomsholdkampe, 1.582 individuelle rækker, jf. 155), undersøg om siden kan udledes strukturelt (holdets klub-ID, hjemme/ude og hold-ID) uden navneliste. Tal: andel kampe/rækker, hvor det kan, og hvor det ikke kan, med årsagsfordeling.
5. Anbefaling: hvilken tabelstruktur (`stamdata`, `alias`, `id_kobling`) en senere database skal have, og hvad der skal til for at stamdata kan vedligeholdes (kilde, ejer, opdateringsfrekvens). Kun forslag, ingen oprettelse.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only: `mode=ro`, `PRAGMA query_only=ON`), `data/navne-alias.json`, `apps/netlify-prod/`, 136-parseren, regelbogen.

## Output
- `statistik/scripts/164-stamdata-kortlaegning.mjs`
- `statistik/results/164-stamdata.md/.json/.csv`
- `statistik/results/164-navnekonflikter.csv`

## Kontrol
- **Målet:** Koblingsklasserne summer til antal personer; navnekonfliktlisten findes som CSV; spørgsmålet om rangliste-`playerid` = BadmintonID har et ja/nej/delvist med tal; "vores side"-andelen er målt. Alle tal står i både `.md` og `.json`.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). Nul netværkskald (tallet 0 skrives i rapporten). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om anbefalingen i punkt 5 er konkret nok til, at et senere kort kan bygge stamdata uden at gætte.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Er to kilder uenige om en persons køn eller fødselsår, så vælg ikke; list begge. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
