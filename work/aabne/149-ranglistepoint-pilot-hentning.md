# Opgave 149 — pilot: kan de samlede ranglister hentes, og kan spillerne kobles til kampdata?

**Trin:** Bygger på 148 (inventar). Dette kort må bruge netværk, men kun i en lille, afgrænset prøve. Formålet er at afgøre, om ranglistepoint for ALLE spillere (også modstandere) kan hentes, og om en spiller på ranglisten kan kobles til samme spiller i kampdata.

## Baggrund
148 viste: `points_at_match` er tomt overalt, `national-spillere.db` har ingen point/klub/medlems-ID, og 0 af 805 modstandere i ungdomskampene 2025/26–2026/27 kan kobles til point. Hentning af de samlede ranglister (liste-ID 288 single, 289 double, 292 mixdouble) er den eneste rute. Hash-parametrene på badmintonplayer.dk/DBF/Ranglister er ikke bevist som API-kontrakt, og `GetRankingListPlayers` gav HTTP 500 i tidligere forsøg.

Christoffers aflæsning af hashen (`#<liste>,<sæson>,<dato>,0,<aldersgruppe>,<køn>,<klub>,0,<region>,,,15,,,,0,,,,,,<disciplinkøn>`): 287 samlet, 288 single, 289 double, 292 mix; aldersgruppe 21 = ungdom samlet, 4 = U13, 5 = U15; køn M/K; klub 1093 = GSB; region 8 = København. Det skal bekræftes eller afvises her.

## Mål
1. **Find ruten.** Find ud af (ud fra de eksisterende scripts `call-ranking-*.mjs`, `API_RESEARCH.md` og de gemte svar), hvilket kald der returnerer en rangliste pr. liste, version, aldersgruppe og køn, og hvilke parametre der skal med. Hent kun det, der trin for trin er nødvendigt for at bekræfte ruten.
2. **Prøvehentning (maksimalt 30 forespørgsler i alt):**
   - Én nyere version (2026-09-02) og én ældre (en version fra sæson 2023/24): liste 288 for aldersgruppe U13 og U15, begge køn. Første side og, hvis der er flere sider, siderne frem til listens slutning for én af dem, så pagineringen er forstået.
   - Én kald for liste 289 og én for 292 for U15, én version.
   - Ingen andre kald. Ingen massehentning.
3. **Hvad står der i svaret?** For hvert svar: antal spillere, felter (navn, klub, point, placering, aldersgruppe, køn, spiller-ID af hvilken slags), og om spillerens ID er (a) Nembadminton-medlems-ID, (b) BadmintonPlayer-ID (som i `national-spillere.db`), eller (c) kun navn og klub.
4. **Kobling.** Afgør ud fra de hentede rækker og de lokale databaser: kan en spiller på ranglisten kobles entydigt til en spiller i `national-spillere.db` (på ID) eller i `gsb-statistik-normalized.db`? Tæl for 20 tilfældige modstandere fra GSB-ungdomskampe 2025/26 og 20 GSB-spillere: hvor mange kan kobles på ID, hvor mange kun på navn og klub (marker disse som uafklarede), hvor mange slet ikke.
5. **Hvor langt tilbage?** Kan der hentes versioner før august 2022? Test én kald for en version i 2019/20 eller 2020/21, hvis versionslisten viser en. Hvis ikke, skriv at ukendt.
6. **Plan for fuld hentning**, hvis ruten virker: antal kald, takt, pagination, hvilken database der oprettes, og hvad "forventet vinder" som minimum kræver. Hvis ruten ikke virker, skriv hvorfor og hvilke alternativer der findes (fx den offentlige side med browser, som Christoffer kan åbne manuelt).

## Regler for netværk
- Kun de samme værter og kald, som `call-ranking-*.mjs` allerede bruger (Nembadminton GraphQL og badmintonplayer.dk). Ingen andre sider.
- Maks. 30 forespørgsler i alt, sekventielt, mindst 1,5 sekunds pause, backoff ved 429/5xx, stop ved 3 på hinanden følgende fejl. Log hver forespørgsel (parametre, status, tid, hash af svar).
- Ingen CAPTCHA-omgåelse. Møder du en CAPTCHA eller et cookie-/adgangsværn, så stop og skriv det i "Spørgsmål".
- Ingen login, ingen konti, ingen personlige oplysninger ud over det, den offentlige rangliste viser.
- Rå svar gemmes som filer under `statistik/results/149-raa-svar/` (kun de prøvesvar, der er hentet). Ingen af de eksisterende databaser skrives til.

## Output
- `statistik/scripts/149-ranglistepilot.mjs`
- `statistik/results/149-ranglistepilot.md` (svar på punkt 1–6, tabeller, et uddrag af hvert svar)
- `statistik/results/149-ranglistepilot.json` (maskinlæsbart: forespørgselslog, felter, koblingstal)
- `statistik/results/149-raa-svar/` (rå prøvesvar)

## Kontrol
- **Målet:** Punkt 1–6 besvaret. Hvis ruten ikke kan bekræftes, står det klart, med den fejl der blev set.
- **Værnet:** Databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E). Alle databaser åbnes readOnly. Højst 30 forespørgsler (tallet står i loggen). `git status --short statistik/data/` tom. `git diff --check` uden fejl.
- **Skøn:** 5 tilfældige hentede rækker sammenholdt med den offentlige side (Christoffer tjekker manuelt, hvis han vil): navn, klub, point.

## Afgrænsning
- Ingen fuld indsamling. Ingen ny database i denne opgave. Ingen forventet-vinder-beregning.
- Ret ikke 136-parseren, 143–148-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.
- Ingen artifact.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke på, hvad et felt eller en parameter betyder; skriv at det er ukendt, og gem evidensen.

## Gren
`arbejde/149-ranglistepilot`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive `149-raa-svar/`. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
