# Opgave 087 — Metode A-kaskade, runde 3

Genereret: 2026-09-23T19:30:43.350Z

Kørsel på age_group_id=1 fra den read-only `liga-landskab.db`. En overgang bruger først entydigt canonicaliseret match på samme niveau; hvis der ikke findes et sådant match, forsøges entydigt match på næste niveau ned. Flere kandidater markeres som flertydige og bruges ikke som tvunget identitet.

## Niveau-for-niveau

| Niveaupar | Forsøg | Samme niveau | Tvang nedad | Tvang nedad / forsøg | Flertydige | Intet entydigt match |
|---|---:|---:|---:|---:|---:|---:|
| Badmintonligaen->1. division | 206 | 138 | 11 | 5.34% | 0 | 57 |
| 1. division->2. division | 241 | 121 | 17 | 7.05% | 0 | 103 |
| 2. division->3. division | 387 | 156 | 30 | 7.75% | 0 | 201 |
| 3. division->Danmarksserien | 763 | 285 | 50 | 6.55% | 0 | 428 |
| Danmarksserien->regional-local | 1091 | 483 | 68 | 6.23% | 0 | 540 |

## Kæder

- Liga-startpunkter: **206**
- Unikke kæder med mindst én tvungen nedadgående overgang: **34**
- Kæder der nåede Danmarksserien eller regional-local: **0**
- Flertydige overgange: **0**
- Rå kæder og flertydige eksempler findes i `087-round3-cascade.json`.

## Sammenligning med runde 2

Runde 2 fandt 68 ekstra hele-hierarki-canonical-spor og 1285 rækker uden sådant match. Den fulde kaskade rammer 4 af disse på samme sæson, niveau og canonicaliserede klub; tallet er et overlapstal, ikke en påstand om at alle identiteter er bevist.

Ingen database blev ændret, og der blev ikke foretaget API-kald.
