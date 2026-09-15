# Opgave 033 — ungdomsdækning

Genereret 2026-09-15 fra `gsb-statistik-normalized.db` med scriptet
`scripts/033-ungdom-scope.mjs`. Ungdom er afgrænset evidensbaseret til
`age_group_id` 2–5 (U09, U11, U13 og U15 i de importerede competitions).
Databasen blev kun læst.

## Holdkampe i databasen

| Måling | Antal |
|---|---:|
| Ungdomsholdkampe i alt | 1.207 |
| Med mindst én individuel række | 1.002 |
| Uden individuelle rækker | 205 |
| Dækning med individuel række | 83,02 % |

De 205 uden individuelle rækker fordeler sig efter det statusfelt, der er
gemt på holdkampen:

| Status | Antal |
|---|---:|
| `browser_verified` | 162 |
| `browser_verified_no_result` | 39 |
| `api_error` | 4 |
| **I alt** | **205** |

`browser_verified_no_result` og `api_error` er dokumenterede manglende
resultater i materialet. De 162 `browser_verified`-rækker uden individuelle
rækker kræver særskilt klassifikation; denne opgave ændrer ikke deres status.

## Fordeling pr. sæson og årgang

| Sæson | Age group | Holdkampe | Med indiv. | Uden indiv. |
|---:|---:|---:|---:|---:|
| 2011 | 3 | 28 | 0 | 28 |
| 2011 | 4 | 32 | 0 | 32 |
| 2011 | 5 | 22 | 0 | 22 |
| 2012 | 3 | 6 | 6 | 0 |
| 2012 | 4 | 16 | 7 | 9 |
| 2012 | 5 | 20 | 16 | 4 |
| 2013 | 3 | 13 | 13 | 0 |
| 2013 | 4 | 7 | 7 | 0 |
| 2013 | 5 | 20 | 14 | 6 |
| 2014 | 3 | 13 | 9 | 4 |
| 2014 | 4 | 14 | 14 | 0 |
| 2014 | 5 | 14 | 14 | 0 |
| 2015 | 3 | 17 | 7 | 10 |
| 2015 | 4 | 16 | 12 | 4 |
| 2015 | 5 | 6 | 6 | 0 |
| 2016 | 3 | 12 | 11 | 1 |
| 2016 | 4 | 7 | 6 | 1 |
| 2016 | 5 | 17 | 16 | 1 |
| 2017 | 3 | 7 | 7 | 0 |
| 2017 | 4 | 12 | 12 | 0 |
| 2017 | 5 | 18 | 18 | 0 |
| 2018 | 3 | 16 | 14 | 2 |
| 2018 | 4 | 10 | 8 | 2 |
| 2019 | 3 | 5 | 4 | 1 |
| 2019 | 4 | 5 | 5 | 0 |
| 2019 | 5 | 10 | 10 | 0 |
| 2020 | 2 | 6 | 1 | 5 |
| 2020 | 3 | 22 | 8 | 14 |
| 2020 | 4 | 16 | 6 | 10 |
| 2020 | 5 | 21 | 12 | 9 |
| 2021 | 2 | 12 | 12 | 0 |
| 2021 | 3 | 24 | 23 | 1 |
| 2021 | 4 | 29 | 28 | 1 |
| 2021 | 5 | 25 | 24 | 1 |
| 2022 | 2 | 6 | 6 | 0 |
| 2022 | 3 | 48 | 45 | 3 |
| 2022 | 4 | 29 | 28 | 1 |
| 2022 | 5 | 41 | 39 | 2 |
| 2023 | 2 | 8 | 6 | 2 |
| 2023 | 3 | 51 | 48 | 3 |
| 2023 | 4 | 36 | 34 | 2 |
| 2023 | 5 | 44 | 42 | 2 |
| 2024 | 2 | 25 | 24 | 1 |
| 2024 | 3 | 50 | 45 | 5 |
| 2024 | 4 | 71 | 69 | 2 |
| 2024 | 5 | 29 | 29 | 0 |
| 2025 | 2 | 48 | 43 | 5 |
| 2025 | 3 | 36 | 32 | 4 |
| 2025 | 4 | 88 | 84 | 4 |
| 2025 | 5 | 79 | 78 | 1 |

## De fem validation-kriterier for ungdom

| Kriterium | Talmæssig status i dette materiale |
|---|---|
| Individuel dækning | 1.002/1.207 holdkampe har individuelle rækker; 205 har ikke. |
| Afvigelsesklassifikation | Ingen separat ungdomskørsel af 458-klassifikationen; kan ikke udledes uden ny klassifikation. |
| Spilleridentitet | 17.114 relationer: 8.255 med external ID, 8.859 uden (48,24 % / 51,76 %). |
| Stillingskontrol | 28 standings-rækker i 2 ungdomskonkurrencer (begge 2025/U09); fuld kontrol kan ikke beregnes for øvrige ungdomspuljer med aktuelt materiale. |
| Blivende undtagelser | 4 `api_error`-holdkampe er registreret; ingen yderligere undtagelser antaget. |

## Dækningsestimat mod Nembadminton

Den lokale database indeholder 1.207 ungdomsholdkampe og 1.207 tilknyttede
rå payloads. Der findes ingen gemt, komplet discovery-snapshot for
klub-ID-kæden med et uafhængigt forventningstal i denne opgave. Derfor kan
et tal for ungdomskampe hos Nembadminton, som ikke er i databasen, ikke
beregnes uden et nyt eksternt discovery-kald. Det er et uafklaret
dækningsestimat, ikke sat til nul.

## Kontrol

Scriptet skrev kun `results/033-ungdom-scope-maaling.json`; ingen
`statistik/data/*.db` blev ændret. Senior-tallene i `docs/statistik-plan.md`
blev ikke ændret.
