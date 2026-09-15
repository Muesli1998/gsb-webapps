# Opgave 040 — bekræft aldersfordeling for de 458 afvigelser og de 98 stillingsrækker

**Trin:** Test & Validation (grundlagsbekræftelse — afslutter 038/039's undersøgelse)

**Gren:** `opgave-040-bekraeft-458-og-stillinger`, jf. AGENTS.md.

**Baggrund:** opgave 038/039 bekræftede at databasens grundtal (2.818
holdkampe, 20.319 individuelle kategorier, 67.196 spillerrelationer) altid
har været klubbrede, og at ungdommens individuel-dækning (162 rækker) og
navnematch-risiko (8.859 relationer) er efterprøvet og stemmer med det
klubbrede billede uden modsigelser. To af de fem oprindelige Test &
Validation-kriterier er dog IKKE eftertjekket for aldersfordeling endnu:

1. **De 458 afvigelser** mellem holdresultat og individuelt resultat
   (klassificeret i opgave 006 i fem evidenskategorier).
2. **Stillingskontrollen** (98 rækker, 24 eksakte match, 19
   corona-forklarede, 24 holdnummer-ustabilitet, 21 genuint uforklarede —
   se `docs/statistik-plan.md`).

**Chris' svar (2026-09-15):** "Jeg vil riiigtig gerne have det bekræftet"
— begge punkter skal tjekkes, ikke antages lav-risiko.

---

## Mål

**Del A — de 458 afvigelser:**
1. Find de 458 rækker (samme population som opgave 006 klassificerede) og
   deres `age_group_id`. Brug samme fremgangsmåde som opgave 038/039: en
   frisk forespørgsel på nuværende data med samme kriterium som lå til
   grund for de 458, ikke en rekonstruktion af en gammel liste.
2. Tæl fordelingen: hvor mange af de 458 er U09-U15, U17/U19, veteran og
   senior.
3. Hvis nogen er ungdom: tjek om de allerede er dækket af opgave 006's
   fem evidenskategorier (administrativ bemærkning/protest, Golden Set,
   manglende kategori, rå resultatmarkør, reel uoverensstemmelse), eller
   om de kræver en selvstændig vurdering. Konklusionen skal være et tal,
   ikke en formodning.

**Del B — de 98 stillingsrækker:**
4. Find de 98 rækker (samme population som opgave 015/018/019/020/030
   arbejdede med) og deres `age_group_id` (via samme kobling som
   stillingskontrollen bruger — season/leagueGroup/holdnavn).
5. Tæl fordelingen: hvor mange af de 98 er ungdom vs. øvrige aldersgrupper.
6. Hvis nogen er ungdom: tjek specifikt om nogen af de 21 "genuint
   uforklarede" rækker er ungdom — det ville være særligt relevant, fordi
   `docs/statistik-plan.md` allerede har en note om at holdnummer-
   ustabiliteten "bliver en større risiko ved flere klubber" og bør
   revurderes ved skalering; hvis ungdom selv introducerer lignende
   ustabilitet, er det værd at vide nu.

## Kontekst

Dette er en bekræftelses-opgave, ikke en ny undersøgelse af ukendt
territorium — begge de øvrige tre kriterier (individuel dækning,
spilleridentitet, blivende undtagelser) er allerede eftervist i
opgave 033-039. Formålet er at lukke selv den sidste tvivl om at
"Test & Validation lukket" (2026-09-15) reelt holder, nu hvor det er
klart at hele grundlaget var klubbredt hele tiden.

## Afgrænsning

**Må røres:** nyt script i `statistik/scripts/` (fx
`040-bekraeft-458-og-stillinger.mjs`),
`statistik/results/040-bekraeft-aldersfordeling.md` (+ `.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). Ingen ændringer i
`docs/statistik-plan.md` eller `docs/BESLUTNINGER.md` i denne omgang — hvis
Del A eller B finder noget der reelt ændrer et af de fem kriteriers status,
er det en selvstændig opfølgende beslutning, ikke noget der skrives ind
stiltiende her. De eksisterende resultatfiler fra 006/015/018/019/020/030/
033-039 ændres ikke.

## Kontrol

**Målet:** en aldersfordelt optælling af både de 458 og de 98, med en
eksplicit konklusion for hver: "ingen ungdom involveret" / "X ungdomsrækker
fundet, allerede dækket af eksisterende klassifikation" / "X
ungdomsrækker fundet, kræver selvstændig vurdering".

**Værnet:** ingen af de eksisterende måletal (458, 98, 24/19/24/21-
fordelingen) ændres — kun aldersopdeles.

**Resultatnoten skal angive tal, ikke vurderinger.**

## Resultatnote

Kørt 2026-09-15 på `opgave-040-bekraeft-458-og-stillinger`.

**Del A — 458 afvigelser:** senior 129, U09–U15 155, U17/U19 16,
veteran 158 (i alt 458). De 171 ungdomsrækker er allerede en del af
opgave 006's eksisterende fem kategorier.

**Del B — 98 stillingsrækker:** senior 20, ungdom 27 (U09 4 og U17/U19
23), veteran 51 (i alt 98). Af de 21 genuint uforklarede er 6 ungdoms-
rækker: 4 U17 og 2 U09; de øvrige 15 er senior/veteran.

Konklusionen for begge dele er: ungdom fundet, allerede dækket af
eksisterende klassifikation/status; ingen selvstændig omvurdering blev
foretaget. Rå aldersfordeling ligger i
`statistik/results/040-afklar-aldersfordeling.json`.

**Commits:** afventer commit på denne gren.
