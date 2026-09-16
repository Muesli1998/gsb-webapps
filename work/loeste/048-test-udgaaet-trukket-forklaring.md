# Opgave 048 — test om "udgået"/"trukket" (eget hold eller modstander) forklarer de uforklarede stillingsafvigelser

**Trin:** Test & Validation (genbesøg af en tidligere lukket, dokumenteret undtagelse — samme kategori som opgave 047)

**Gren:** `opgave-048-udgaaet-trukket-hypotese`, jf. AGENTS.md.

**Baggrund:** opgave 047 bekræftede at ingen af de 21 uforklarede
stillingsafvigelser (kampantal, ikke point — se
`statistik/results/015-stillingskontrol.md`) skyldes ungdoms-holdtype-
kollisionen. Chris rejste to nye, konkrete hypoteser efter at have
kigget selve kildetabellen igennem:

**Hypotese 1 — eget hold udgået/trukket:** hvis GSB's EGET hold er
markeret "udgået" eller "trukket" i den officielle stilling, viser
stillingen 0 kampe uanset hvor mange kampe holdet faktisk nåede at
spille før udmeldelsen. Kigger man i `015-stillingskontrol.md`s data,
matcher dette mønster allerede flere rækker direkte: fx "2014, pulje
4267, Gladsaxe Søborg 2 udgået, Stilling 0, DB 7" og "2016, pulje 7644,
Gladsaxe Søborg 4 trukket, Stilling 0, DB 9". Chris: "det kan vi
konkludere."

**Hypotese 2 — modstanderhold udgået/trukket i puljen:** hvis et ANDET
hold i samme pulje trækker sig midt i sæsonen, kan den officielle
stilling se anderledes ud for de resterende hold end det rå kampantal i
databasen — GSB kan sagtens have nået at spille mod det udgåede hold
FØR det trak sig, hvilket giver GSB én kamp mere i databasen end
stillingen tæller med. Chris' konkrete eksempel: "GSB 3 2016 Senior
mangler 1 kamp mellem stilling og rigtig, men det er fordi et hold de
har spillet mod har trukket sig senere."

**Chris' svar (2026-09-16):** "Kan vi prøve at teste for det?"

---

## Mål

**Hypotese 1 (eget hold):**
1. For hver af de 21 rækker: tjek om GSB's `team_name_raw` (i
   `standings`) indeholder "udgået"/"trukket"/"(O)" eller lignende
   markør. Tæl hvor mange af de 21 dette gælder for, og bekræft for
   hver af dem at `Stilling = 0` mens `DB > 0` (samme mønster som
   eksemplerne ovenfor).
2. Marker disse som forklaret af Hypotese 1 — vis en klar liste.

**Hypotese 2 (modstanderhold):**
3. For de RESTERENDE rækker (dem der ikke er dækket af Hypotese 1): find
   ud af om databasen indeholder information om ØVRIGE holds status i
   samme pulje/`competition_id` — check `standings`-tabellen for om den
   gemmer rækker for ALLE hold i puljen (ikke kun GSB), og om nogen af
   dem er markeret udgået/trukket. Hvis `standings` kun gemmer GSB's
   egen række, undersøg om `team_matches.home_name_raw`/`away_name_raw`
   for GSB's kampe i den pulje/sæson indeholder en modstander med
   "udgået"/"trukket" i navnet — det ville bekræfte at GSB rent faktisk
   spillede mod et hold der senere udgik.
4. For hver resterende uforklaret række: tæl hvor mange af GSB's kampe
   i den pulje/sæson var mod en modstander der er markeret udgået/
   trukket. Sammenlign dette tal med selve afvigelsen (fx: er
   afvigelsen 1, og GSB spillede præcis 1 kamp mod et senere udgået
   hold, er det stærkt forklarende).
5. Marker disse som forklaret af Hypotese 2 — vis en klar liste med
   hvilken specifik modstanderkamp der forklarer afvigelsen.

**Opsummering:**
6. Efter begge hypoteser: hvor mange af de 21 er nu forklaret (Hypotese
   1 + Hypotese 2 tilsammen), og hvor mange forbliver genuint
   uforklarede? Vis et eksplicit tal, ikke en vurdering.

## Kontekst

Dette er en tredje runde på samme 21-rækkers-population (efter opgave
020 og 047) — men denne gang med to konkrete, testbare hypoteser fra
Chris, ikke en åben undersøgelse. Gæt ikke på om en kamp var mod et
udgået hold — det skal stå i data (enten i `standings` for andre hold i
puljen, eller i selve modstandernavnet i `team_matches`).

## Afgrænsning

**Må røres:** nyt script/resultat i `statistik/scripts/`/
`statistik/results/` (fx `048-udgaaet-trukket-test.mjs`/`.md`/`.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). De eksisterende
015/020/047-resultatfiler ændres ikke. `docs/statistik-plan.md` og
`docs/BESLUTNINGER.md` røres IKKE i denne opgave — hvis nogen af de 21
nu forklares, er det en selvstændig efterfølgende beslutning for Chris
om planen skal opdateres. Stop og spørg i så fald.

## Kontrol

**Målet:** et eksplicit tal for hver hypotese (X forklaret af Hypotese
1, Y forklaret af Hypotese 2), en liste over hvilke konkrete rækker det
gælder, og et opdateret "forbliver genuint uforklaret"-tal.

**Værnet:** ingen ændringer i databasen eller i eksisterende
resultatfiler/planer.

**Resultatnoten skal angive tal, ikke vurderinger.**

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*

## Resultat
Hypotese 1: 5 af 21 forklaret (0 stillingskampe, 6-9 DB-kampe). Hypotese 2: 13 af 16 resterende rækker forklaret; 3 fortsat uforklarede. Modstanderstatus blev matchet ved at fjerne suffixet udgået/trukket fra standings-navnet og sammenligne med kampnavnet. Eksempel: 2016/pulje 7640, kamp 238585 mod Charlottenlund 5; standings har Charlottenlund 5 udgået. Samlet: 18 forklaret af 21, 3 uforklarede.`r`n
