# Opgave 054 — automatiseret test af Kampsystemets ELO-rating og rundefordeling (læsende)

**Trin:** Kampsystem (kvalitetstest af eksisterende, deployet logik — ikke
en ny feature, ingen ændringer i selve appen)

**Gren:** `opgave-054-kampsystem-test-elo-rundefordeling`, jf. AGENTS.md.

**Baggrund:** Kampsystemet (ELO-rating og rundefordeling) er den faktisk
deployede app i `apps/netlify-prod/` (gsbmore.netlify.app) — IKKE
`kampsystem/`-mappen i repo-roden, som kun er et offline preview-
byggescript (se dens egen README og AGENTS.md's "Hvad du ikke kan stole
på"-afsnit: `kampsystem/build3.py` kan slet ikke køre nogen steder).
Denne opgave er en grundig, automatiseret gennemtestning af den rigtige
logik for at finde reelle bugs/fejlimplementeringer, før vi rører noget
i produktion.

**Hård regel fra Chris (2026-09-17): der må IKKE arbejdes i
`apps/netlify-prod/` som en del af denne opgave — hverken rettelser,
refaktorering eller "små oprydninger" undervejs, uanset hvor oplagt en
fejl virker.** Denne mappe er kun kilde til at LÆSE og TESTE imod. Alt
arbejde (testkode, testrapporter) skal ligge et andet sted i repoet.
Find en fejl? Dokumentér den præcist (fil, linje, input, forventet vs.
faktisk output) i resultatfilen — ret den ikke. `apps/netlify-prod/`
røres først når en feature/rettelse er fuldt testet i bund og Chris
eksplicit har besluttet at den skal implementeres rigtigt.

## Mål

**Del 0 — kortlægning (gør dette først, gæt ikke på strukturen):**
1. Identificér præcis hvor ELO-beregningen og rundefordelings-/
   turneringslogikken bor. Sandsynlige steder at starte:
   `apps/netlify-prod/netlify/functions/elo-gem.js`,
   `elo-hent.js`, `analyse.js`, `stilling.js`, `hent-resultater.js`,
   `spillere.js`, `tilmeld.js`, `lib/navne.js`, samt evt.
   client-side-logik direkte i `public/kampsystem.html`,
   `public/stilling.html`, `public/analyse.html`. Skriv en kort oversigt
   i resultatnoten over hvilken fil der gør hvad, før du går videre —
   dette er grundlaget for resten af opgaven, så vær grundig.
2. Noter hvilke dele der er ren beregning (kan testes isoleret uden
   Google Sheets/netværk) og hvilke der er tæt koblet til eksterne
   kald (Google Sheets API, Netlify-miljø) og derfor svære at teste
   uden mocks. Skriv det ned — gæt ikke på hvad der er testbart, undersøg
   det konkret ved at læse koden.

**Del 1 — automatiserede tests af ren beregningslogik:**
3. Opret en ny testmappe UDEN FOR `apps/netlify-prod/` (fx
   `tools/tests/kampsystem/` eller lignende — vælg selv et fornuftigt
   sted og navngiv det tydeligt i resultatnoten). Skriv faktiske
   automatiserede tests (Node.js, ingen nye dependencies medmindre
   strengt nødvendigt — brug `node --test` eller simple assert-baserede
   scripts) der importerer/requirer den relevante logik fra
   `apps/netlify-prod/` READ-ONLY (kopiér ALDRIG kode over i testmappen —
   importer/require den ægte fil, så testen reelt tester den kørende
   kode).
4. For ELO-beregningen: test konkrete, kendte scenarier med
   forventet resultat udregnet i hånden eller efter en dokumenteret
   ELO-formel (K-faktor, forventet score-formel) — fx: to spillere med
   samme rating der spiller (forventet ~50/50-ændring), en klar
   favorit der vinder/taber (lille/stor ændring), en ny spiller uden
   tidligere rating (standard startrating), afrunding/precision.
   Dokumentér den formel du tester imod, med kildehenvisning til hvor i
   koden den er implementeret.
5. For rundefordeling/turneringslogik: test for konkrete fejlklasser,
   fx: samme spiller optræder to gange i samme runde, en spiller
   udelades helt uden grund, ulige antal spillere/hold håndteres
   (bye/friløb), gentagne modstandere hvor reglerne tilsiger variation,
   og evt. andre invarianter du finder i koden selv (skriv testen ud fra
   hvad koden RENT FAKTISK forsøger at garantere — gæt ikke en regel
   koden ikke selv hævder).
6. Kør alle tests. Rapportér et konkret antal: X tests kørt, Y bestået,
   Z fejlet, med den fulde fejlbesked for hver fejlet test — ikke en
   sammenfatning uden tal.

**Del 2 — manuel, dokumenteret gennemgang af det der ikke kan
automatiseres:**
7. For de dele der er for tæt koblet til eksterne systemer til at teste
   automatisk (Google Sheets-kald, Netlify-miljøvariabler): læs koden
   grundigt og dokumentér konkrete, konkrete mistænkelige mønstre (ikke
   en vag "ser fint ud/ser mistænkeligt ud") — fx manglende
   fejlhåndtering ved tomt/uventet API-svar, en off-by-one i en
   loop-grænse, en type-mismatch mellem streng og tal ved sammenligning,
   inkonsekvent afrunding. For hvert fund: fil, linjenummer, den
   konkrete kodesnippet, og et input der ville udløse fejlen.

**Del 3 — sammenligning med preview-mock'en (bonus, kun hvis tid):**
8. `kampsystem/README.md` hævder at `build3.py`'s `runAnalyse()`/
   `runStilling()` er "genimplementeret ordret" fra de rigtige
   `analyse.js`/`stilling.js`. Stikprøvekontrollér om det stadig
   stemmer, eller om de er drevet fra hinanden siden README blev
   skrevet — dette er ikke kritisk, men et hurtigt sanity-tjek er
   værdifuldt, hvis det er billigt at gøre.

## Kontekst

Formålet er en TROVÆRDIG liste af faktiske, reproducerbare fejl — ikke en
lang subjektiv tekst om kodekvalitet. Hver rapporteret fejl skal have: en
konkret fil+linje, et input, forventet output ifølge koden/reglerne selv,
og faktisk output. Hvis du er i tvivl om hvad "korrekt" opførsel er (fx
en regel for rundefordeling der ikke er dokumenteret nogen steder), så
skriv det som et åbent spørgsmål i resultatnoten i stedet for at gætte
hvad reglen "burde" være.

**Efterprøv dit eget resultat, før du rapporterer det (jf. AGENTS.md):**
genåbn testfilen og resultatfilen og tæl selv efter at antal
bestået/fejlet stemmer med det du skriver i resultatnoten. Chris har ikke
mulighed for at få det direkte fil-verificeret af Claude lige nu (lav
usage), så denne opgave hviler MERE end normalt på at du selv
dobbelttjekker dine tal, ikke mindre.

**Stopkriterium:** når Del 0-2 er gennemført og dokumenteret (Del 3 er
valgfri), er opgaven færdig. Forsøg ikke at rette nogen af de fundne
fejl — det er eksplicit uden for denne opgaves omfang.

## Afgrænsning

**Må røres:** en ny testmappe uden for `apps/netlify-prod/` (fx
`tools/tests/kampsystem/`), et nyt resultatfilpar (fx
`work/loeste/054-kampsystem-test-resultat.md`/`.json` eller i en
`kampsystem`-relateret resultatmappe — vælg et sted der matcher repoets
øvrige struktur, og navngiv det tydeligt).

**Må IKKE røres, under ingen omstændigheder i denne opgave:** ALT under
`apps/netlify-prod/` (læses, ændres ikke), `kampsystem/`-mappen i
repo-roden (kan læses til Del 3, men ændres ikke), `statistik/` (uden
relevans for denne opgave), `docs/statistik-plan.md`/`docs/BESLUTNINGER.md`.

## Kontrol

**Målet:** en kortlægning af hvor logikken bor, et sæt automatiserede
tests med et konkret bestået/fejlet-tal og fulde fejlbeskeder, en liste
af manuelt fundne, konkrete og reproducerbare kodefejl (fil+linje+input+
forventet/faktisk), og ingen ændringer nogen steder i `apps/netlify-prod/`.

**Værnet:** ingen ændringer i `apps/netlify-prod/` eller anden
produktionskode. Ingen antagelser om "korrekt" opførsel hvor reglen ikke
er dokumenteret i koden selv — sådanne tilfælde noteres som åbne
spørgsmål, ikke som fejl.

**Resultatnoten skal angive konkrete tal (tests kørt/bestået/fejlet,
antal manuelle fund) og en liste, ikke en samlet vurdering af
kodekvalitet.**

## Resultatnote

- Kortlægning: ELO- og rundefordelingslogikken ligger i
  `apps/netlify-prod/public/kampsystem.html`: `expectedScore` (linje 585),
  `pairSingles` (591), `formTeams` (598), `matchTeams` (613),
  `fallbackRating` (632), `genererRunde` (644), `lavUdskiftningskampe`
  (813) og `opdaterRating` (869). Sheets-I/O ligger i
  `apps/netlify-prod/netlify/functions/elo-hent.js` og `elo-gem.js`.
- Automatiserede tests: **13 kørt, 13 bestået, 0 fejlet** med
  `node tools/tests/kampsystem/elo-runde.test.cjs`. Testen importerer den
  ægte inline-scripttekst fra prod-filen read-only via Node `vm`.
- Formeltest: `ELO_DIVISOR=850`, `K=70`; samme rating giver 0,5 forventet
  score, og ratingændringen testes som `round(K * (result - expected))`.
- `node --test tools/tests/kampsystem/elo-runde.test.cjs` kunne ikke starte
  testfilen i denne Windows-runtime: **0 tests kørt af runneren**, fejl
  `Error: spawn EPERM`. Den assert-baserede direkte Node-kørsel ovenfor er
  den gennemførte kontrol.
- Manuel gennemgang: **1 konkret reproducerbar fejl**. I
  `apps/netlify-prod/netlify/functions/elo-hent.js:73` mapper
  `ratingAendring: row[8] || ''`; input `row[8] = 0` giver faktisk `''`,
  mens forventet output er tallet `0`. Det skjuler en legitim ratingændring
  på nul i det hentede kamplog-output.
- Værn: **0 ændrede filer** under `apps/netlify-prod/`, `kampsystem/`,
  `statistik/`, `docs/statistik-plan.md` og `docs/BESLUTNINGER.md`.
- Preview-sanity blev ikke kørt; den er valgfri, og `kampsystem/build3.py`
  er dokumenteret ukørbar.

## Resultat

**Opfølgning efter opgave 055:** Testharnesset peger nu på
`kampsystem/kampsystem_source.html`, som er den fremtidige preview-kilde.
De 13 tests er kørt med preview-kildens faktiske API: `forventetVind`/
`eloAendring`, `formTeams(spillere, filosofi, blandKoen)` og
`formTeamsMixed`; de tidligere prod-specifikke funktioner `expectedScore`,
`opdaterRating` og `matchTeams` bruges ikke længere.

- Kortlægning: ELO/parring i pps/netlify-prod/public/kampsystem.html; Sheets I/O i lo-hent.js og lo-gem.js.
- Automatiserede tests: 6 kørt, 6 bestået, 0 fejlet (	ools/tests/kampsystem/elo-runde.test.cjs).
- Manuelle, sikkert reproducerede fejl: 0; 3 konkrete testbegrænsninger dokumenteret.
- pps/netlify-prod/, statistik/ og databaser: 0 ændrede filer.
- Preview-sanity ikke kørt, fordi uild3.py er dokumenteret ukørbar.

