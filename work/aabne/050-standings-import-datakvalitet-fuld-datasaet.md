# Opgave 050 — ret standings-importens to fundne fejl for HELE datasættet, ikke kun GSB

**Trin:** Test & Validation / infrastruktur (rettelse af to konkrete importfejl fundet i opgave 049 — denne gang skaleret til hele datasættet, fordi fejlene kan påvirke fuld dataintegritet uafhængigt af GSB)

**Gren:** `opgave-050-standings-import-datakvalitet`, jf. AGENTS.md.

**Baggrund:** Opgave 049 undersøgte 6 GSB-specifikke uforklarede
stillingsrækker og fandt, ved at læse de allerede gemte
`statistik/results/browser-standings/*.json`-snapshotfiler (INGEN ny
live-hentning nødvendig), to reelle, generelle fejl i importpipelinen:

**Fejl 1 — `league_group_id` er ikke globalt unikt på tværs af
aldersgrupper/rækketyper.** Eksempel: `competition_id=450` (sæson 2011,
`league_group_id="71"`) er i `competitions`-tabellen mærket "Danmarksserien
Øst pulje 2", Senior (`age_group_id=1`). Men den gemte kildefil for
præcis dette ID (`2011-71.json`, `sourceUrl`
`.../Stilling/#2,2011,71,1,,,,1093,`) har selve sidetitlen indbygget i
den rå hentede tekst: **"BADKBH U17 2011/2012 — U17 2. Serie"**. Det er en
helt anden turnering (ungdoms-pulje i København-regionen, ikke senior
Danmarksserien). Samme mønster fundet i `2021-13965.json`: DB siger
"SEN+70 1. Serie P1 Pulje 1", kildens sidetitel siger **"BADKBH SEN+60
2021/2022 — SEN+60 1. Serie Pulje 1"** (forkert aldersgruppe, 60 vs. 70).

**Fejl 2 — standings-parseren dropper rækker i "Holdet trukket"-format.**
Eksempel: `2013-2693.json`s gemte rå tabel har 8 rækker, hvoraf én ser
sådan ud: `['', 'KFUM Badminton Kbh. *Trukket', 'Holdet trukket']` — ingen
placering, ingen kamp/point-tal, kun teksten "Holdet trukket" i stedet for
de normale kolonner. Vores `standings`-tabel for denne competition har kun
7 rækker — denne 8. række er aldrig importeret, formentlig fordi
importscriptet forventer numeriske kolonner i et fast format.

**Chris' svar (2026-09-17):** "Generelt skal vi sørge for at ting der kan
fucke med en fuld integrering af AL data skal fikses, selvom det måske har
minimal indvirkning på GSB." — dvs. denne opgave er IKKE afgrænset til de
6 GSB-rækker fra opgave 048/049. Begge fejl skal findes og rettes for
HELE det gemte datasæt (alle klubber, alle sæsoner, alle aldersgrupper),
fordi de er generiske pipeline-fejl, ikke GSB-specifikke.

---

## Mål

**Del A — kortlæg omfanget af Fejl 1 (forkert pulje-identitet), read-only:**
1. For HVER gemt fil i `statistik/results/browser-standings/*.json`: udtræk
   sidetitlen fra `rawText` (mønstret er "SÆSONNAVN ÅÅÅÅ/ÅÅÅÅ" +
   "RÆKKENAVN", se eksemplerne ovenfor) og sammenlign med den tilsvarende
   `competitions`-rækkes `league_raw`/`age_group_id`/`season_id` (match via
   `season_id`+`league_group_id`, samme opslag som i
   `import-browser-standings.mjs`).
2. Byg en komplet liste over ALLE competitions hvor sidetitlen ikke
   stemmer overens med det DB har registreret (aldersgruppe, rækkenavn,
   eller sæson passer ikke). Angiv et eksplicit samlet tal (X af Y
   sammenlignede competitions er mismatch), ikke kun for GSB's rækker.
3. **Stop her — ret IKKE selv `competitions`-tabellens `league_raw`/
   `age_group_id` for de fundne mismatches.** At afgøre den korrekte
   identitet kræver enten en ny (manuel) kildehentning eller en
   vurdering af hvilken af de to modstridende identiteter der er
   rigtig — det er ikke en mekanisk rettelse. Præsentér listen som
   forslag til Chris.

**Del B — ret parseren for Fejl 2 (droppede "trukket"-rækker), for hele
datasættet:**
4. Ret `import-browser-standings.mjs` (eller det script der faktisk
   bygger `standings`-tabellen fra de gemte JSON-snapshots) til at
   genkende og importere rækker uden numeriske kolonner, hvor teksten
   indeholder "trukket" (eller lignende, fx "udgået" i samme
   uregelmæssige format — undersøg om det forekommer i samme
   ikke-numeriske form andre steder). Sæt `matches_played=0` (eller NULL
   med en tydelig markør) for disse rækker, og bevar holdnavnet inkl.
   "*Trukket"-suffiks.
5. Genkør importen for HELE datasættet (alle gemte browser-standings-
   snapshots, ikke kun GSB's), og rapportér: hvor mange nye rækker blev
   tilføjet til `standings` i alt, og hvor mange competitions blev
   påvirket. Dette MÅ skrives til databasen, fordi det er en ren
   tilføjelse af tidligere droppet data (ingen eksisterende rækker
   overskrives) — men lav en sikkerhedskopi af `standings`-tabellens
   indhold (fx en `.sql`-dump) FØR ændringen, så den kan rulles tilbage.
6. Bekræft at de eksisterende 042/043/047/048-rapporter (som er baseret
   på `team_matches`, ikke `standings`) IKKE er påvirket af denne
   ændring — vis dette eksplicit, gæt ikke.

## Kontekst

Del A og B er bevidst adskilt: Del A er en ren identitetsspørgsmål der
kræver et menneskeligt/domænemæssigt valg (hvilken kilde er "rigtig"), og
skal IKKE forsøges løst automatisk eller ved yderligere kildeopslag under
denne opgave — lever med usikkerheden, rapportér den, og stop. Del B er en
ren mekanisk parser-bug (data der allerede findes i de gemte filer, men
ikke er importeret) og kan rettes og udrulles fuldt ud.

**Stopkriterium (vigtigt, lært af opgave 049):** hvis du under Del A
støder på en gemt snapshot-fil hvor sidetitlen er tvetydig, ufuldstændig,
eller kræver en ny live-hentning for at afgøre — spring den enkelte fil
over, notér den som "ikke afgørbar fra gemte data", og fortsæt til
næste. Forsøg IKKE at hente noget fra internettet, og brug ikke tid på at
forsone modstridende kilder — det er ikke denne opgaves formål. Opgaven
er færdig når ALLE gemte filer er gennemgået én gang, uanset hvor mange
der ender i "ikke afgørbar"-kategorien.

## Afgrænsning

**Må røres:** `statistik/scripts/import-browser-standings.mjs` (eller
tilsvarende), nyt undersøgelsesscript/resultat for Del A (fx
`050-standings-import-datakvalitet.md`/`.json`), `standings`-tabellen (KUN
for Del B's tilføjelser, med forudgående sikkerhedskopi),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `competitions`-tabellens `league_raw`/`age_group_id`/
`league_group_id` (Del A er kun rapportering). De eksisterende
042/043/047/048-resultatfiler ændres ikke. `docs/statistik-plan.md`/
`docs/BESLUTNINGER.md` røres ikke i denne opgave.

## Kontrol

**Målet:** Del A: et eksplicit tal for hvor mange competitions (af hvor
mange undersøgt) har en sidetitel der ikke matcher DB'ens registrerede
identitet, med den fulde liste. Del B: et eksplicit tal for hvor mange nye
standings-rækker blev tilføjet på tværs af hele datasættet, og bekræftelse
af at 042/043/047/048 er upåvirkede.

**Værnet:** ingen ændringer i `competitions`-identitetsfelter. Sikkerheds-
kopi af `standings` taget før Del B's skrivning.

**Resultatnoten skal angive konkrete tal for hele datasættet, ikke kun for
GSB, og skal IKKE forsøge at afgøre tvetydige tilfælde — dem lister den
bare.**

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
