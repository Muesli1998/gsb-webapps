# Corona- og no-result-audit

Genereret: 2026-09-13T07:09:34.492Z

Denne rapport undersøger rækker hvor resultatet er NULL, tomt, `-` eller `0-0`. Den bruger et separat analysevindue for de to berørte sæsoner: 2019/20 fra 15. marts til 30. juni 2020 og 2020/21 fra 1. november 2020 til 30. juni 2021. Vinduet er et evidensfilter og ændrer ikke automatisk status.

## Fund

- Alle no-result-rækker: **137**.
- I det udvidede sæsonvindue: **129** (18 i sæson 2019 og 111 i sæson 2020).
- Sider med direkte teksten `Afgjort uden kamp (afbud/udeblivelse)` eller `(Ikke fremmødt)`: **0** i vinduet.
- Sider uden individuelle kategorier eller scores: **126** i vinduet.
- Sider med spilleropstilling men ingen scores: **1** i vinduet.
- Rækker uden gemt browserpayload: **2** i vinduet.

## Hvad det betyder

De 126 sider uden individuel evidens viser kun holdoplysninger og `Resultat -`/`Point -` i den hentede HTML. Det er stærk evidens for, at siden ikke indeholder registrerede spillede delkampe, men kilden angiver ikke i alle tilfælde årsagen. De skal derfor gemmes som `no_result`/`unresolved`, indtil en eksplicit bemærkning eller anden kilde dokumenterer afbud, suspension eller walkover.

Kampen **452835** er det tydelige ikke-spillede eksempel: siden indeholder `0-0`, `Point 0-0` og teksten `Afgjort uden kamp (afbud/udeblivelse)`. Kampen **395200** har navngivne ungdomsspillere, men ingen scores og intet holdresultat; den er derfor ikke automatisk tællelig som spillet.

## No-result pr. dato i det udvidede vindue

| Dato | Antal | Klassifikationer | Kamp-ID'er |
|---|---:|---|---|
| 2020-03-21 | 1 | no_individual_content_evidence: 1 | 384292 |
| 2020-03-22 | 13 | no_individual_content_evidence: 13 | 385098, 365220, 365416, 365483, 365545, 365512, 365718, 365749, 365774, 365803, 366979, 366944, 366893 |
| 2020-04-05 | 4 | no_individual_content_evidence: 4 | 365224, 365548, 366986, 366948 |
| 2020-11-15 | 1 | no_individual_content_evidence: 1 | 395109 |
| 2020-12-06 | 4 | player_roster_without_scores: 1, no_individual_content_evidence: 3 | 395200, 402365, 395139, 395140 |
| 2020-12-13 | 8 | no_individual_content_evidence: 8 | 387380, 387689, 387712, 387814, 387849, 387878, 387902, 388044 |
| 2021-01-10 | 10 | no_individual_content_evidence: 10 | 387385, 387628, 387692, 387717, 387815, 387854, 387879, 387907, 388014, 388049 |
| 2021-01-31 | 10 | no_individual_content_evidence: 10 | 387390, 387633, 387694, 387719, 387821, 387858, 387884, 387909, 388019, 388054 |
| 2021-02-07 | 2 | no_individual_content_evidence: 2 | 388870, 388873 |
| 2021-02-14 | 4 | no_individual_content_evidence: 3, no_payload_available: 1 | 387634, 387825, 387862, 388020 |
| 2021-03-14 | 11 | no_individual_content_evidence: 11 | 395153, 395154, 394647, 394648, 405371, 405372, 394411, 394412, 394533, 394534, 394553 |
| 2021-03-21 | 12 | no_individual_content_evidence: 11, no_payload_available: 1 | 387399, 387638, 387697, 387725, 387568, 387829, 387864, 387887, 387915, 388024, 388063, 404672 |
| 2021-03-28 | 8 | no_individual_content_evidence: 8 | 395213, 395215, 395132, 395134, 405378, 395024, 395025, 394554 |
| 2021-04-11 | 16 | no_individual_content_evidence: 16 | 405423, 405424, 405435, 405437, 405548, 405550, 404165, 404174, 404185, 404201, 404137, 404142, 404143, 404147, 403990, 403998 |
| 2021-04-25 | 17 | no_individual_content_evidence: 17 | 405418, 405419, 405496, 405497, 405474, 405527, 404111, 404171, 404176, 404189, 404203, 404138, 404710, 404714, 403996, 404003, 403986 |
| 2021-05-08 | 2 | no_individual_content_evidence: 2 | 405615, 405591 |
| 2021-05-09 | 1 | no_individual_content_evidence: 1 | 404761 |
| 2021-05-29 | 2 | no_individual_content_evidence: 2 | 405622, 405598 |
| 2021-05-30 | 1 | no_individual_content_evidence: 1 | 404764 |
| 2021-06-02 | 2 | no_individual_content_evidence: 2 | 405625, 405601 |

## Begrænsning og næste validering

Et `-`-resultat alene kan ikke skelne mellem aflyst, suspenderet, manglende indtastning og teknisk fejl. Næste validering er derfor at sammenholde disse IDs med puljens stilling/kalender og eventuelle bemærkninger. Ingen status i databasen er ændret af denne audit.
