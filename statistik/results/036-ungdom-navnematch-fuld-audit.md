# Opgave 036 — fuld audit af ungdoms-navnematch

Kørt 2026-09-15 på `opgave-036-ungdom-navnematch-fuld-audit` med
`scripts/036-ungdom-navnematch-fuld-audit.mjs`. Databasen blev kun læst.
Populationen er alle ungdomsrelationer (`age_group_id` 2–5) hvor
`players.external_player_id IS NULL`.

## Resultat

| Måling | Antal |
|---|---:|
| Navnematch-relationer | 8.859 |
| Distinkte spillere | 2.256 |
| Dubletter på `name_normalized` | 0 |
| Samme dato + samme `league_raw`/`name_raw` på flere GSB-hold | 0 grupper |
| Spillere med dette signal | 0 |

Ingen relationer gav den adfærdsmæssige kollisionsindikator, når
`league_raw` og `name_raw` var med i nøglen fra starten. Den fulde rå liste
ligger i `036-ungdom-navnematch-fuld-audit.json`.

## Sæsonstratificering

| Sæson | Relationer | Spillere | Mistænkte spillere | Rate |
|---:|---:|---:|---:|---:|
| 2012 | 306 | 124 | 0 | 0 % |
| 2013 | 258 | 100 | 0 | 0 % |
| 2014 | 326 | 114 | 0 | 0 % |
| 2015 | 180 | 63 | 0 | 0 % |
| 2016 | 279 | 101 | 0 | 0 % |
| 2017 | 303 | 125 | 0 | 0 % |
| 2018 | 233 | 63 | 0 | 0 % |
| 2019 | 192 | 77 | 0 | 0 % |
| 2020 | 198 | 84 | 0 | 0 % |
| 2021 | 792 | 285 | 0 | 0 % |
| 2022 | 1.121 | 355 | 0 | 0 % |
| 2023 | 871 | 287 | 0 | 0 % |
| 2024 | 1.425 | 472 | 0 | 0 % |
| 2025 | 2.375 | 648 | 0 | 0 % |
| **I alt** | **8.859** | **2.256** | **0** | **0 %** |

Sæson 2011 har ingen ungdoms-navnematch-relationer i databasen og indgår
derfor ikke i tabellen.

## Kontrol

Alle 8.859/8.859 relationer er med i auditten. Senior-resultater og
`statistik/data/*.db` er uændrede. En navnesplittelse mellem næsten-identiske
stavemåder kan ikke påvises eller afkræftes med de gemte felter alene.
