# Opgave 159 — tilmeldingsniveau: kønsfiltrerede 287-lister, 2026/27-reglement og ungdomsrækker

**Trin:** Bygger på 157 (officielt reglement 2023/24 fundet) og 156 (placering og bogstav). Lille, afgrænset hentning. Ingen skrivning til databaser.

## Hvad vi ved
- **Reglementet** (Fællesreglement for Ranglisten 2023/24, PDF 07-02-2024, se `statistik/results/157-tilmeldingsniveau.md`): tilmeldingsniveau er et vægtet gennemsnit af alle kategorier, man er aktiv i, hvor kategorien med flest point vægter højst; kampantal tæller ind (enkeltkampe i kategorien fra sæsonstart). Koefficienterne står ikke i dokumentet. Rækker vurderes **kvartalsvis**.
- **Voksenrækker** er placeringsintervaller **pr. køn** (2023/24): herrer E 1–40, E-M 41–200, M 201–400, M-A 401–700, A 701–2000, A-B 2001–2500, B 2501–3500, B-C 3501–4000, C 4001–5000, C-D 5001–6000, D >6000. Damer E 1–40, E-M 41–150, M 151–300, M-A 301–500, A 501–1000, A-B 1001–1200, B 1201–1700, B-C 1701–1900, C 1901–2400, C-D 2401–2600, D >2600. **Ungdomsrækker** er pointintervaller pr. køn og aldersgruppe (tabellen står i 157-rapporten, Appendiks A s. 9).
- **Hypotese fra Claude (ikke bevist):** den "samlede placering" i 287-svar, vi har set for GSB (uden kønsfilter), er en fælles liste for begge køn. Test: af 146 GSB SEN-rækker passede kun 65 med herrernes interval for rækken og 46 med damernes. Damer (fx M-A på samlet placering 2.463–2.595) passer ikke med damernes interval (301–500), men det kan skyldes, at intervallerne gælder placering i en liste kun med damer. Det er det, denne opgave skal afgøre.
- **Placering i filtrerede svar:** første tal er den lokale placering i filteret, tallet i parentes er den samlede placering på den liste, der er filtreret ud fra (156 Del A).

## Mål
1. **2026/27-reglementet.** Hent `https://badminton.dk/wp-content/uploads/2026/09/Reglement-for-Rangliste-2026-09-10.pdf` (højst 3 GET-kald til `badminton.dk` i alt; er URL'en forkert, så find linket fra `badminton.dk/rangliste`). Udtræk det samme som i 157 punkt 1: formlen for tilmeldingsniveau (og om koefficienter står i dokumentet), intervaller for ungdom (point) og voksne (placering) pr. køn, hvornår rækker vurderes, og hvad der er ændret siden 2023/24. Citer kort med side/paragraf.
2. **Kønsfiltrerede 287-lister, GSB (højst 10 kald).** Brug den fungerende request (kontekstnøgle fra GET af `/DBF/Ranglister/`, POST til `GetRankingListPlayers`), liste 287, aktuel version, `clubid` 1093, med `gender` K og derefter M. Læs sidetal fra første svar, og hent alle sider for hvert køn. For hver række: lokal placering, placering i parentes, række, navn, profil-ID. Aflæs, om placeringen i parentes for en kvinde nu er en kønsspecifik placering (fx om kvinder, der stod på 2.463–2.595 uden kønsfilter, nu står på ca. 300–500 med `gender` K), og om rækken passer med damernes henholdsvis herrernes placeringsinterval. Rapportér pr. række og køn: antal, og hvor mange der ligger i reglementets interval; list afvigere med afstand til intervallet.
3. **Samme spiller, to lister.** For mindst 5 kvinder og 5 mænd: placering uden kønsfilter (fra de gemte 150-svar, `10-q10-clubid-1093-list287` og `19-q19-clubid-1093-list287-pageindex-1`) mod placering med kønsfilter. Er forholdet systematisk (fx en fast forskydning)? Skriv, hvad data viser.
4. **Ufiltreret kønsliste, side 0 (2 kald).** Liste 287 med kun `gender` K og kun `gender` M, side 0, uden klubfilter. Skriv, hvem der står på 1–100, rækker og antal sider. Sammenlign med den fælles liste fra 150 (`18-q18-baseline-list287-current-page0`).
5. **`playerid` på 287 (højst 4 kald).** Giver et opslag med `playerid` samlet eller lokal placering, og følger det versionsdatoen? Brug én kvinde og én mand, begge på nuværende version, og én af dem med en tidligere version (fra kalenderen i 153/154, fx en dato i 2026-04). Skriv, hvilken placering der returneres, og om den passer med listens egen.
6. **U09 på 287 (højst 2 kald).** `agegroupid` 2 på 287: findes U09, og har de placering og række?
7. **Ungdomsrækker mod point (offline).** For GSB-ungdomsspillere på 287 (række, profil-ID fra de gemte 150-sider og nye GSB-sider): hent disciplinpoint fra `rangliste-point.db` (`ranking_points`, version 2026-10-07, liste 288/289/292, `param` M/K, `player_id`). Test pr. køn og aldersgruppe, om rækken passer med reglementets pointinterval, når man bruger (a) højeste point i en disciplin, (b) gennemsnit af disciplinerne med point, (c) gennemsnit vægtet med antal kampe fra `national-spillere.db` (readOnly, kun GSB-spillere og kun sæson 2025/26; hvis kampantal ikke kan hentes uden en tung forespørgsel, så udelad (c)). Brug 2026/27-skemaet fra punkt 1, hvis det findes, ellers 2023/24 med forbehold. Rapportér andel der passer pr. hypotese og afvigere.
8. **Anbefaling.** Hvad kan siges om tilmeldingsniveauet nu? Hvad kræver næste skridt (historiske versioner, flere klubber, koefficienter)?

## Regler
- Alle databaser readOnly (`mode=ro`, `PRAGMA query_only=ON`). Ingen skrivning, ingen import.
- Netværk: højst **3** kald til `badminton.dk` og højst **25** til `badmintonplayer.dk` (punkt 2: ≤10, punkt 4: 2, punkt 5: ≤4, punkt 6: ≤2, resten reserve og friske GET til kontekstnøgle). Sekventielt, mindst 2,1 sekunder, backoff ved 429/5xx, stop ved 3 fejl i træk eller botværn. Ingen login, cookies, CAPTCHA eller samtykkeklik. Gem rå svar uden kontekstnøgle i `statistik/results/159-raa-svar/`.
- Gæt ikke på formler, koefficienter eller feltbetydning. Skriv "ukendt", hvor noget ikke kan afgøres.

## Output
- `statistik/scripts/159-tilmeldingsniveau.mjs` (eller `.py`; skriv hvad der blev brugt)
- `statistik/results/159-tilmeldingsniveau.md` (punkt 1–8, tabeller, forespørgselslog med nr., felter ændret, status, bytes og svarhash)
- `statistik/results/159-tilmeldingsniveau.json`
- `statistik/results/159-raa-svar/`

## Kontrol
- **Målet:** Punkt 1–8 besvaret. For hvert køn står andelen af GSB SEN-spillere, hvis række passer med reglementets placeringsinterval, og for ungdom andelen, hvis række passer med hver pointhypotese, med antal.
- **Værnet:** Kaldtal pr. domæne (højst 3 og 25) i loggen med hash. Alle databasers SHA-256 uændrede: `gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E, `rangliste-point.db` DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9. `git diff --check` uden fejl.
- **Skøn:** Tre GSB-kvinder og tre GSB-mænd (navn, række, placering i kønsfiltreret liste), som Christoffer kan slå op på den offentlige side.

## Afgrænsning
- Kun aktuel version for 287 (plus én historisk version til punkt 5). Ingen bulkhentning af historiske 287-lister, ingen opdatering af ranglistedata, ingen artifact, ingen forventet-vinder-beregning.
- Ret ikke 136-parseren, 143–157-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/159-tilmeldingsniveau`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
Besvaret efter kørslen: `playerid` på 287 og U09 på 287 blev ikke afprøvet i 159 (kaldbudget) og er målt i kort 160 (`playerid` giver den fælles placering; `agegroupid` 2 viser kun U11-rækker).

## Tilbagefald
Slet de nye filer, inklusive `159-raa-svar/`. Ingen database er berørt.

## Resultat
Kørt af Claude, ikke Codex (Codex' shell kunne ikke starte, se `AGENTS.md`, afsnittet om Codex på Windows). Rapport: `statistik/results/159-tilmeldingsniveau.md`, data: `159-tilmeldingsniveau.json`, råsvar: `159-raa-svar/`, script: `statistik/scripts/159-hent287.py`.
- Voksenrækker er placering i den kønsspecifikke 287-liste: herrer 577 af 577 i reglementets interval, damer 833 af 837 (afvigerne står på delte placeringer, rang 501 og 1002).
- Reglement 2026/27 (10-09-2026): voksenintervallerne er uændrede siden 2023/24, koefficienterne til tilmeldingsniveau står ikke i teksten.
- Ungdomsrækker ud fra højeste disciplinpoint og 2026/27-skemaet: 123 af 132 (93 %). Gennemsnit: 123 af 134. Laveste: 97 af 135.
- Kald: 24 af 25 til badmintonplayer.dk, 1 hentning af reglementet fra badminton.dk.
