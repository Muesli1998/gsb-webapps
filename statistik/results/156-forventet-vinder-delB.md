# 156 Del B — back-test: forudsiger ranglistepoint vinderen? (2025/26, GSB-ungdom)

Kørt af Claude (ikke Codex) på læsekopier af `gsb-statistik-normalized.db` (SHA-256 49BC62AC…1B41E) og `rangliste-point.db` (DABE3A12…D1B9), begge uændrede. Ingen netværkskald. Script: `statistik/scripts/156-backtest.py`, datasæt: `statistik/results/156-datasaet.csv`. **Del A (rang på liste 287) er ikke kørt.**

## Metode
- 1.576 individuelle kampe i de 269 holdkampe, der både står i behovsregistret og i normaliseret DB (14 af 283 kampe i registret findes ikke i normaliseret DB).
- Spillere kobles til point via kamp-ID og normaliseret navn (individual_match_players bruger mest `name:`-nøgler, ikke spiller-ID). Version = den, `ranking_needs` har valgt (strengt før kampdagen).
- Liste efter disciplin: S/DS/HS → 288, D/DD/HD → 289, MD → 292.
- Pointforskel = hjemmeside minus udeside. Single: spillerens point. Double: gennemsnit af parrets point (sum og laveste er testet; gennemsnit er bedst eller lige god).
- Model: P(vinder) = 1 / (1 + 10^(−d/s)), s tilpasset ved log-loss (grid, ikke krydsvalideret).

## Dækning
| | Kampe |
|---|---:|
| Individuelle kampe i registrets holdkampe | 1.576 |
| Med point på alle spillere (bruges) | 1.103 (70 %) |
| Udeladt: spiller uden point (fraværende på listen) | 172 |
| Udeladt: blandet fraværende/ufuldstændig søgning | 130 |
| Udeladt: identity_review | 44 |
| Udeladt: manglende dato | 29 |
| Udeladt: incomplete_search | 24 |
| Udeladt: spiller ikke i behovsregister | 49 |
| Udeladt: ingen vinder (967 rækker uden winner_side i hele DB; 25 her) | 25 |

Vigtigt: de udeladte er især spillere uden point. De er sandsynligvis svagere eller nye, så tallene nedenfor gælder kampe mellem to spillere med point og kan være for pæne for helheden.

## Hitrate (siden med højest gennemsnitspoint vandt)
| Gruppe | Kampe | Hitrate | 95 % interval |
|---|---:|---:|---:|
| Alle | 1.094 (+9 ens) | 73,9 % | 71–76 % |
| Single | 705 | 76,2 % | 73–79 % |
| Double | 389 | 69,7 % | 65–74 % |
| S | 497 | 75,5 % | 71–79 % |
| DS | 108 | 76,9 % | 68–84 % |
| HS | 100 | 79,0 % | 70–86 % |
| D | 213 | 67,6 % | 61–74 % |
| DD | 48 | 87,5 % | 75–94 % |
| HD | 54 | 77,8 % | 65–87 % |
| **MD** | 74 | **58,1 %** | 47–69 % |
| U09 | 5 | (for lille) | |
| U11 | 91 | 79,1 % | 70–86 % |
| U13 | 491 | 74,9 % | 71–79 % |
| U15 | 421 | 72,7 % | 68–77 % |
| U17/U19 | 86 | 68,6 % | 58–77 % |

## Kalibrering (s = 160, alle kampe, pointforskel i gennemsnit)
| |Forskel| | Kampe | Forudsagt | Faktisk |
|---|---:|---:|---:|
| 0–25 | 266 | 54,3 % | 56,4 % |
| 25–50 | 209 | 62,6 % | 65,6 % |
| 50–100 | 286 | 74,2 % | 76,2 % |
| 100–200 | 253 | 87,1 % | 86,6 % |
| 200+ | 89 | 97,3 % | 97,8 % |

Brier 0,177 mod 0,25 for 50/50; log-loss 0,528 mod 0,693. Single: s ≈ 150 (Brier 0,165). Double (gennemsnit): s ≈ 170 (Brier 0,199). MD: s ≈ 560 og Brier 0,243, altså næsten ingen forudsigelseskraft (74 kampe).

## Tærskler for den stærkeste side
Forskel ≥ 50 point: 83 % (628 kampe). ≥ 100: 89,5 % (342). ≥ 150: 94,6 % (166). ≥ 200: 97,8 % (89).

## Stabilitet
1. halvdel (til 2026-02-01): 74,0 %, 2. halvdel: 73,7 %. Stabilt.

## Overraskelser (største pointforskel, svageste vandt)
Kamp-ID 506719 (2026-04-11, HS, 1612 mod 1345, ude vandt), 506729 (2026-04-12, S, 1831 mod 2041, hjemme vandt), 489569 (2026-01-11, MD, 1148 mod 1346, hjemme vandt), 494085, 506124, 493430, 506661, 487720, 487679, 493897. Alle ti står i datasættet.

## Forbehold
- Udvælgelsesbias (se Dækning). Singletallene er mest solide.
- Navnekobling kan i sjældne tilfælde forbinde forkert; spiller-ID er ikke brugt, fordi `individual_match_players` mest har `name:`-nøgler.
- s er tilpasset på samme data som den evalueres på. Kalibreringen ser pæn ud, men er ikke krydsvalideret.
- Hjemme/ude er ikke korrigeret for evt. hjemmebanefordel.
- MD er svag; vi ved ikke, om det skyldes få point i MD-listen eller par, der ikke svarer til listen.
- Uafklaret om versionsreglen "strengt før kampdagen" er optimal; ikke testet her.
