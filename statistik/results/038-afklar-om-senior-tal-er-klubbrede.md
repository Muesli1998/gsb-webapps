# Opgave 038 — er senior-tallene klubbrede?

Kørt 2026-09-15 på `opgave-038-senior-tal-klubbred-check` med
`scripts/038-senior-tal-klubbred-check.mjs`. Databasen blev kun læst.

## Konklusion: (A) klubbrede totaler

De tre tal i `docs/statistik-plan.md` matcher præcis optællingen uden
aldersfilter:

| Datasæt | Optalt i databasen | Forventet tal | Match |
|---|---:|---:|---|
| `team_matches` | 2.818 | 2.818 | Ja |
| `individual_matches` (kategorier) | 20.319 | 20.319 | Ja |
| `individual_match_players` (relationer) | 67.196 | 67.196 | Ja |

Det er derfor **(A)**: totalerne er klubbrede og inkluderer alle gemte
`age_group_id`-værdier. De er ikke afgrænset til senior.

## Holdkampe pr. `age_group_id`

| ID | Holdkampe |
|---:|---:|
| 1 | 506 |
| 2 | 105 |
| 3 | 348 |
| 4 | 388 |
| 5 | 366 |
| 6 | 56 |
| 9 | 382 |
| 11 | 369 |
| 12 | 2 |
| 13 | 163 |
| 17 | 42 |
| 18 | 91 |
| **I alt** | **2.818** |

U09–U15 (`age_group_id` 2–5) udgør **1.207** holdkampe — præcis hele
opgave 033's population. De øvrige 1.611 kampe er andre aldersgrupper,
herunder senior, U17/U19 og veteran.

## Individuelle rækker og spillerrelationer pr. aldersgruppe

| ID | Individuelle rækker | Spillerrelationer |
|---:|---:|---:|
| 1 | 5.793 | 17.849 |
| 2 | 486 | 1.248 |
| 3 | 1.683 | 4.584 |
| 4 | 2.043 | 5.654 |
| 5 | 2.029 | 5.628 |
| 6 | 119 | 338 |
| 9 | 3.815 | 15.111 |
| 11 | 2.528 | 10.080 |
| 12 | 12 | 44 |
| 13 | 1.120 | 4.480 |
| 17 | 232 | 928 |
| 18 | 459 | 1.252 |
| **I alt** | **20.319** | **67.196** |

## Kontrol

Alle tre forventede totaler matcher 100 %. Opgave 033's 1.207 ungdoms-
holdkampe er allerede indeholdt i 2.818-totalen. Ingen resultatfiler,
planfiler eller databasefiler blev ændret af målingen.
