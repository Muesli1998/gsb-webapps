# Opgave 194 — personnøgle, runde 2: stærkere evidens og strammere regel for "sikker"

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10.
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** 191 (færdig) · **Netværk:** ingen

**Trin:** Kort 191 var for forsigtigt: 0 koblinger blev `sikker`, og ranglister, national-databasen og eventtabellerne blev ikke brugt som evidens. Kortet laver koblingen om med en eksplicit regel og afgrænser det, Christoffer skal afgøre manuelt. Det ændrer ingen database.

## Gren
`arbejde/194-personnoegle-runde-2`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Læs `statistik/results/191-personnoegle.md` og `191-personnoegle-kobling.csv` (7.599 rækker). Brug dem som udgangspunkt, ikke som facit.
- Normalized DB's `players.player_id` er navnebaseret og er ikke en person (kort 164: 0 numeriske profil-ID'er).
- Pseudo-spilleren "Ikke fremmødt" (`player_id` 176) er ikke en person. Den udelades fra koblingen og står i en egen række med klassen `ikke_person`.
- 7 trupnavne mangler valgt identitet (Christian Staal, Jonathan W. Hansen, Lene Sørensen, Line Nielsen, Sebastian Almeida Møller, Thor Pedersen, Yiting Chen). Linda Bækgaard har et ID, men er uafklaret. Christoffer afgør dem manuelt ud fra en tabel.
- Fødselsår, alder og køn må ikke gættes. "ukendt" er et gyldigt svar.

## Mål
1. **Regel for `sikker`** (skal skrives eksplicit i rapporten, og hver kobling skal angive, hvilken regel der gav den). Forslag, som Codex tester og kan stramme: normalized `player_id` kobles til ét rangliste-/national-ID, når (i) fuldt navn matcher entydigt blandt spillere i ranglistedatabasen/`national-spillere.db` i samme sæson, (ii) klubben på kampsiden matcher klubben i ranglisten/national-databasen i samme sæson, og (iii) ingen anden kandidat opfylder (i) og (ii). Alle tre skal være opfyldt. Brug også eventtabellerne (154/158/158b) som uafhængig evidens, hvor de findes.
2. **Afvisning.** To normalized ID'er, der står på hver sin side eller på to pladser i samme holdkamp, må ikke få samme personnøgle. Rapportér antal konflikter (mål: 0).
3. **Klasser:** som i kort 191 (`sikker`, `sandsynlig`, `uafklaret`, `navnebroedre`, `samme_person`) samt `ikke_person`. Skriv for hver klasse antal, og hvilken andel af GSB-kampene i 2025/26 der kan knyttes til en `sikker` person.
4. **Før/efter.** Sammenlign med 191: antal pr. klasse før og efter, og de 30 største ændringer.
5. **Omfang.** Alle spiller-ID'er på GSB-siden i alle sæsoner (289 i 2025/26); derefter alle øvrige ID'er, hvis det kan lade sig gøre.
6. **Manuel gennemgang.** Lav én CSV til Christoffer med kun de GSB-spillere i 2025/26, der stadig er `uafklaret` eller `navnebroedre`, plus de 8 trupnavne. Kolonner: navn, normalized ID, kandidat-ID'er, klubber, sæsoner, aldersgrupper, antal kampe, evidens, og en tom kolonne `christoffers_valg`. Vælg ikke for ham.
7. **Stikprøve.** Vis 15 tilfældige `sikker` og 15 `uafklaret` med evidens, og skriv, hvor mange af de 15 `sikker` du ved selvstændig kontrol (en anden vej end reglen) ikke kan afvise.
8. **Forslag til brug:** mappingtabel i normalized DB eller fil? Foreslå kun; ændr ingen database.

## Afgrænsning
- **Må røres:** nye filer: `statistik/scripts/194-personnoegle-runde2.mjs`, `statistik/results/194-personnoegle.md`, `statistik/results/194-personnoegle.json`, `statistik/results/194-personnoegle-kobling.csv`, `statistik/results/194-personnoegle-manuel-gennemgang.csv`; samt dette korts Spørgsmål og Resultat.
- **Må ikke røres:** alle databaser (åbnes read-only: `mode=ro` og `PRAGMA query_only=ON`), 164- og 191-filerne (kun læsning), `statistik/HASHES.txt`, `apps/netlify-prod/`, `docs/BESLUTNINGER.md`, rodens `AGENTS.md`.
- Ingen netværkskald. Ingen nye pakker.

## Output
- `statistik/scripts/194-personnoegle-runde2.mjs`
- `statistik/results/194-personnoegle.md` (regel, tal før/efter, konflikter, stikprøve, forslag til brug)
- `statistik/results/194-personnoegle.json`
- `statistik/results/194-personnoegle-kobling.csv` (id, navn, personnøgle, klasse, regel, evidens, kandidat-ID'er)
- `statistik/results/194-personnoegle-manuel-gennemgang.csv`

## Kontrol
- **Målet:** hvert GSB-spiller-ID i 2025/26 står præcis én gang i koblingen. Antal pr. klasse står i rapporten. Konflikttjekket giver 0, eller hver konflikt er listet. Pseudo-spilleren 176 har klassen `ikke_person`.
- **Værnet:** `node tools/tjek/db-hashes.mjs` afslutter med kode 0 (fem "ja"). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre. Nul netværkskald (skriv tallet 0 i rapporten).
- **Skøn:** (vurdering) om andelen af `sikker` er stor nok til, at spillertal kan vises uden forbehold.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.
Skriv `## Spørgsmål` og `## Resultat` i dette kort KUN med `node tools/skriv-kort-afsnit.mjs work/aabne/194-statistik-personnoegle-strammere-regler.md <Spørgsmål|Resultat> work/koersler/194/tekst.md` (gem teksten først i den fil; kortstien skal være præcis denne). Rediger aldrig kortfilen på anden måde. Fejler scriptet, så stop og skriv fejlen i dit slutsvar. Scripts og rapporter med æøå skrives som UTF-8.

## Ved tvivl
Gæt ikke. Er to ID'er muligvis samme person, så vælg `uafklaret` og skriv kandidaterne. Skriv i `## Spørgsmål`.

## Spørgsmål
Christoffer: udfyld `christoffers_valg` i `statistik/results/194-personnoegle-manuel-gennemgang.csv` for de 27 rækker. Alle otte trupnavne er med; der er ikke foretaget identitetsvalg. Rapportens eneste `sikker` kobling er normalized ID 66 til `id:330770` efter R1. Ingen øvrige afklaringsspørgsmål.

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
Gennemført på grenen `arbejde/194-personnoegle-runde-2`; ingen git-skrivekommandoer og ingen netværkskald (0). Oprettet script samt rapport, JSON, koblings-CSV og manuel CSV for opgave 194. Alle tre åbnede databaser var `mode=ro` med `PRAGMA query_only=ON`; ingen database blev ændret.

Koblingen har 7.599 rækker/unikke ID'er: 677 GSB-side-ID'er på tværs af sæsoner, heraf 289 i 2025/26, og 6.922 øvrige ID'er. Før/efter klasseantal: sikker 0→1, sandsynlig 617→616, uafklaret 6.982→6.923, navnebroedre 0→58, samme_person 0→0, ikke_person 0→1. De 30 viste ændringer står i rapporten; 30 yderligere er optalt. 2025/26 har 1 sikker, 261 sandsynlig, 26 navnebroedre, 0 uafklaret, 0 samme_person og 1 ikke_person. ID 176 er `ikke_person`. Konflikter: 0. Af 4.537 GSB-kampoptrædener i 2025/26 er 28 knyttet til sikker person (0,62 %).

Stikprøven: 1 tilgængelig sikker (af 15 ønskede) og 15 uafklarede; den separate konfliktkontrol afviste 0/1 sikre. Manuel CSV: 27 rækker, alle 8 trupnavne inkluderet, `christoffers_valg` tom. Netværkskald: 0. `node --check` og scriptkørsel afsluttede med kode 0; alle fem databasehashes var `ja`; `git diff --check` gav ingen fejl. Slutstatus viste alene dette kort og de fem nye script-/resultatfiler.
