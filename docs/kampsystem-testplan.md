# Kampsystem — testplan (design, ikke implementering)

**Status:** planlægning. Ingen tests bygget endnu ud over opgave 054's
6 (`tools/tests/kampsystem/elo-runde.test.cjs`). Dette dokument beskriver
HVORDAN vi vil dække resten, så vi kan uddelegere det som veldefinerede
opgaver, når der er usage til at få det verificeret ordentligt.

**Hvorfor det her er vigtigt:** Kampsystemet bruges af trænerne live,
løbende — det er ikke et engangsværktøj. En fejl her rammer en træner
midt i en træning, ikke en statistikrapport ingen læser i timevis. Det
retfærdiggør en grundigere testrække end statistikprojektets.

**Regel der gælder for alt arbejde herfra:** ingen ændringer i
`apps/netlify-prod/` før en test/rettelse er fuldt afprøvet og Chris har
besluttet at den skal implementeres i produktion (jf. opgave 054's
afgrænsning). Test skrives et andet sted og importerer/requirer den
ægte kode read-only.

---

## 1. Fuldt funktionsoverblik

### `apps/netlify-prod/public/kampsystem.html` (klient, ren + DOM-blandet)

**Rene funktioner (ingen DOM, ingen netværk — testbare nu, ligesom
opgave 054's 6):**

- `expectedScore(rA, rB)` — ELO-sandsynlighedsformel. **Testet (opgave 054).**
- `teamAvg(spillere, ratingKey)` — gennemsnitsrating for et hold.
- `pairSingles(pool)` — parring af enkeltspillere. **Testet.**
- `formTeams(pool, filosofi)` — dobbelt/mixed-holddannelse ("ens"/"blandet"). **Testet.**
- `matchTeams(teams, type, ratingKey)` — parring af hold mod hinanden. **Testet.**
- `matchKey(m)` — nøgle brugt til gentagelses-undgåelse.
- `fallbackRating(kandidater, ratingKey)` — hvad en spiller uden rating får.
- `wrapForRound(p, ratingKey, fallback)` — forbereder en spiller til runden.
- `opdaterRating(m, vinderSide, ratingKey, rA, rB)` — **selve rating-
  opdateringen efter en kamp. IKKE testet i opgave 054 — højeste
  prioritet i næste runde, se afsnit 3.**
- `normaliserSoegetekst(s)`, `byNavn(navn)` — søgning/opslag i roster.
- `beskrivSlots(slots)` — tekstformatering af låste kampe.

**DOM-/state-blandede funktioner (kræver simuleret DOM eller
udtrækning af den rene beslutningslogik først):**

- `genererRunde()` — selve rundegenereringen: kategori-fordeling,
  pulje-bygning, låste kampe, gentagelses-swap. Den vigtigste
  enkeltfunktion i hele værktøjet, og den mest komplekse.
- `resolveLockedMatches(pools, fallbackByType)` — indfletning af manuelt
  fastsatte kampe.
- `lavUdskiftningskampe(spillere)` — kampe der ikke tæller på rating.
- `renderRoster`, `renderRunde`, `renderKamplog`, `renderRatingTable`,
  `renderLockedList`, `renderSoegeResultater` — ren visning, lav
  testprioritet (fejl her er synlige med det samme for brugeren, i
  modsætning til en forkert ratingberegning).
- `opretNySpiller`, `tilfoejFraSoegning`, `tilfoejLaastKamp`,
  `opdaterLaasDropdowns`, `vaelgAlleTilstede`, `opsaetGruppeSelect`,
  `opsaetTilfoejGruppeSelect` — bruger-inputhåndtering.
- `visH2H`, `opdaterH2HDropdowns` — head-to-head-opslag i historik.
- `visSyncStatus`, `nulstilEksempeldata` — status/reset, lav prioritet.

### `apps/netlify-prod/netlify/functions/*.js` (server, Sheets-afhængig)

Alle handlers (`elo-gem`, `elo-hent`, `analyse`, `stilling`,
`hent-resultater`, `spillere`, `tilmeld`) er tætte wrappers om
Google Sheets-kald — svære at teste uden en mock af Sheets-klienten.
Undtagelser med ren logik indeni, testbar uden Sheets:

- `lib/navne.js`: `normaliserNoegle(navn)`, `officieltNavn(raaNavn)` —
  navnealias/-normalisering, allerede eksporteret via `module.exports`,
  klar til direkte `require()` i en test.
- `stilling.js`: `erPodieBerettiget(betalingRaw)` — regel for hvem der
  tæller med i podie-opgørelsen.
- `hent-resultater.js`: `erWalkover(navne)`, `behandlKampData(d, runde, hint)`
  — parsing/klassificering af rå kampdata. `behandlKampData` er ikke
  eksporteret endnu (kun brugt internt i filen) — kræver enten en lille,
  ikke-adfærdsændrende eksport-tilføjelse (`module.exports`) for at
  kunne testes isoleret, ELLER test via `vm`-udtræk som opgave 054
  gjorde for `kampsystem.html` (samme mønster, ingen ændring af filen
  nødvendig).

---

## 2. Tre lag, tre strategier

**Lag 1 — rene funktioner (samme opskrift som opgave 054).** Udtræk
funktionen direkte fra kildefilen med `vm`-teknikken (eller `require()`
hvor den allerede er eksporteret), ingen mocks nødvendige. Billigst,
højst signal-til-støj. Her hører `opdaterRating`, `teamAvg`, `matchKey`,
`fallbackRating`, `wrapForRound`, `normaliserSoegetekst`, `byNavn`,
`normaliserNoegle`, `officieltNavn`, `erPodieBerettiget`, `erWalkover`
til, plus flere scenarier for de 5 der allerede er testet i opgave 054
(se afsnit 3 for konkrete cases).

**Lag 2 — DOM-orkestrering (`genererRunde` og venner).** Kræver enten:
(a) en letvægts-DOM (`jsdom` som ny dev-dependency — kræver npm, som
kun findes på den bærbare, jf. AGENTS.md), eller (b) at den rene
beslutningslogik i `genererRunde` udtrækkes til en ren funktion der
tager `(roster, aktivGrupper, explicitte, filosofi)` som argumenter og
returnerer kampe/siddere-over UDEN at røre DOM — hvilket er en reel
kodeændring i `apps/netlify-prod/`, og derfor kræver din eksplicitte
godkendelse FØRST, adskilt fra selve testarbejdet, jf. din regel om
ikke at røre produktionskoden uden en besluttet grund. Anbefaling: vent
med (b) til Lag 1 og Lag 3 er på plads og vi kan se om det stadig virker
nødvendigt — jsdom (a) er sandsynligvis nok til at teste orkestreringen
uden at ændre en linje i produktionskoden.

**Lag 3 — Sheets-afhængige handlers.** Mock selve Google Sheets-klienten
(det bibliotek `elo-gem.js`/`elo-hent.js`/osv. kalder) og test handleren
med en fake klient der returnerer forberedte rækker og registrerer hvad
den bliver bedt om at skrive. Det tester request/response-kontrakten
(rigtigt input → rigtigt Sheets-kald) uden at røre et rigtigt ark.
Højt prioriteret på trods af kompleksiteten, fordi det er her en fejl
gør mest skade (forkert/tabt data i det ark trænerne er afhængige af),
ikke fordi det er nemmest.

---

## 3. Konkrete testscenarier pr. funktionsområde

Dette er ikke en udtømmende liste — det er et udgangspunkt der viser
"flere forskellige måder" pr. funktion, som du bad om. Uddelegeres som
konkrete opgavekort, en batch ad gangen.

**ELO-rating (`expectedScore`, `opdaterRating`):**
- Lige ratings → 50/50, delta tæt på 0 ved uafgjort styrke.
- Klar favorit vinder → lille positiv delta til vinder.
- Klar underdog vinder ("upset") → stor positiv delta til vinder.
- Meget ekstreme ratingforskelle (fx 1000 vs. 2500) — sikrer ingen
  overflow/underflow eller urimelig delta.
- Udskiftningskamp (`m.udskiftning=true`) → ingen ratingændring,
  uanset resultat.
- En eller flere deltagere uden rating (`_hasRating===false`) → ingen
  ratingændring, `m.ratingOpdateret===false`.
- Rundttur-konsistens: A vinder over B → A's gevinst og B's tab er
  eksakt hinandens modsatte (nulsumsspil), for begge `ratingKey`
  (single/double/mixed).

**Rundefordeling (`pairSingles`, `formTeams`, `matchTeams`, og senere
`genererRunde` i Lag 2):**
- Lige/ulige antal spillere → korrekt antal kampe + korrekt antal
  "sidder over" (allerede delvist testet).
- 0 spillere, 1 spiller — grænsetilfælde der let giver en runtime-fejl
  hvis de ikke er tænkt ind.
- Meget stort antal spillere (fx 40+) — ydelses- og korrekthedstjek,
  ingen dubletter, ingen udeladte.
- "Ens" vs. "blandet" holdfilosofi giver forskellige, men hver for sig
  interne konsistente resultater.
- Gentagelses-undgåelse: en kamp identisk med sidste runde → swappes;
  to på hinanden følgende identiske kampe af samme type → begge forsøgt
  swappet uden at introducere en NY dublet et andet sted (den kendte,
  dokumenterede begrænsning fra opgave 054 — værd at gøre eksplicit med
  en test der VISER begrænsningen, ikke skjuler den).
- Låste kampe (`resolveLockedMatches`): en spiller låst i to kampe
  samtidig (skal fejle/advares, ikke stille accepteres); en låst kamp
  hvor for få spillere er tilgængelige til "auto"-siden.
- Spillere med flere valgte kategorier fordeles til den mindst fyldte
  pulje — test at fordelingen rent faktisk bliver mere jævn, ikke bare
  at koden kører uden fejl.

**Navnehåndtering (`normaliserNoegle`, `officieltNavn`,
`normaliserSoegetekst`, `byNavn`):**
- Danske tegn (æ/ø/å), stort/småt, ekstra mellemrum.
- Kendte aliaser fra `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` (statistik-
  projektets fund genbruges her som testdata — samme problem, to
  projekter).
- Navn der ikke findes → forventet fallback/fejlsvar, ikke en
  ukontrolleret undtagelse.

**Podie/walkover-regler (`erPodieBerettiget`, `erWalkover`):**
- De konkrete betalings-/navnetekster der udløser hhv. sandt/falsk —
  hentet fra faktiske eksempler i `resultater_2526.csv`/
  `resultater_2425.json`, ikke opdigtede.

---

## 4. Infrastruktur vi skal beslutte, før vi bygger

1. **Testrunner:** `node --test` er allerede brugt i opgave 054 og
   kræver ingen nye dependencies — foreslår vi holder fast i det.
2. **DOM-mock til Lag 2:** kun nødvendigt hvis vi vælger (a) frem for at
   udtrække ren logik. Kræver `npm install jsdom` — kun muligt på den
   bærbare (har node), ikke den stationære (jf. AGENTS.md). Skal
   besluttes eksplicit, ikke antages.
3. **Sheets-mock til Lag 3:** skal findes/skrives — undersøg først
   hvilket Google Sheets-bibliotek `elo-gem.js` osv. rent faktisk
   bruger, før vi vælger mock-strategi.
4. **Fixtures/golden files:** for funktioner uden en dokumenteret facit
   (fx præcis hvordan gentagelses-swap "bør" opføre sig ud over det
   README/kommentarer allerede siger) bruger vi ægte historiske
   data (`resultater_2526.csv`, `matchHistory`-eksempler) som
   regressionsgrundlag, ikke en opfundet regel.

## 5. Foreslået rækkefølge

1. **Lag 1, resten** — billigst, ingen infrastrukturbeslutninger
   nødvendige, kan uddelegeres som opgave 055 med det samme.
2. **Lag 3** — højst risiko ved fejl (data trænerne er afhængige af),
   men kræver først en beslutning om mock-strategi (punkt 4.3).
3. **Lag 2** — vent til 1+2 er på plads; beslut da om jsdom er nok,
   eller om der er en konkret grund til at overveje en kodeændring i
   `genererRunde` (som i så fald er en selvstændig beslutning, ikke en
   del af testarbejdet).

---

*Dette dokument er en plan, ikke en resultatnote — det opdateres
løbende efterhånden som lag 1-3 bygges og eventuelle beslutninger
(jsdom ja/nej, Sheets-mock-strategi, evt. refaktorering af
`genererRunde`) er truffet.*
