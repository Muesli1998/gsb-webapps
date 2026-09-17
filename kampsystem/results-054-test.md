# Opgave 054 — Kampsystem ELO/rundefordeling

## Del 0 — kortlægning

- `apps/netlify-prod/public/kampsystem.html`: ELO-formlen i `expectedScore` (585-587), parring i `pairSingles`, `formTeams` og `matchTeams` (589-610), ratingopdatering i `opdaterRating` (869-887), og samlet rundelogik i `genererRunde` (667 ff.).
- `netlify/functions/elo-hent.js`: læser og parser roster/ratings/kamphistorik fra Google Sheets.
- `netlify/functions/elo-gem.js`: skriver roster og kampe til Google Sheets.

Ren beregning kan testes isoleret; Sheets-funktioner og DOM-afhængig rundegenerering kræver browser-/Sheets-mocks.

## Del 1 — automatiserede tests

Testfilen `tools/tests/kampsystem/elo-runde.test.cjs` evaluerer de ægte funktioner direkte fra produktets HTML-kilde.

| Tests kørt | Bestået | Fejlet |
|---:|---:|---:|
| 6 | 6 | 0 |

Scenarier: lige ratings, favoritberegning, lige/ulige singles, ens doublepar, blandede doublepar og rating-sorteret holdparring. Koden bruger `1 / (1 + 10^((rB-rA)/850))` og afrunder ratingændring med `round(70 * (resultat - forventet))`.

## Del 2 — manuel gennemgang

Ingen sikkert reproduceret fejl blev fundet uden en dokumenteret regel at holde op imod. Konkrete begrænsninger: `teamAvg` forudsætter ikke-tomme wrapped hold; Sheets-fejlscenarier kræver mocks; gentagelsesundgåelsen udfører kun ét lokalt swap-forsøg og hævder ikke global optimering.

## Del 3 — preview-sanity

Ikke kørt, fordi `kampsystem/build3.py` er dokumenteret ukørbar på almindelig maskine. Ingen preview-filer er ændret.

## Værn

Ingen filer under `apps/netlify-prod/`, `statistik/` eller databaser er ændret.
