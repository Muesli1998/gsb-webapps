# Audit af spiller-ID-kobling

Genereret: 2026-09-14T19:41:58.808Z

Metode: Read-only aggregation of players.external_player_id through individual_match_players; no name matching or new ID resolution performed.

- Spillere i tabellen: **7599**; med eksternt ID: **5043 (66.4%)**; uden: **2556**.
- Spillerrelationer: **67196**; med eksternt ID: **57270 (85.2%)**; uden: **9926 (14.8%)**.

| Sæson | Relationer | Med ID | Uden ID | Dækning |
|---:|---:|---:|---:|---:|
| 2010 | 436 | 315 | 121 | 72.2% |
| 2011 | 400 | 400 | 0 | 100.0% |
| 2012 | 3804 | 3450 | 354 | 90.7% |
| 2013 | 4126 | 3787 | 339 | 91.8% |
| 2014 | 4023 | 3690 | 333 | 91.7% |
| 2015 | 4392 | 4212 | 180 | 95.9% |
| 2016 | 4128 | 3795 | 333 | 91.9% |
| 2017 | 4060 | 3740 | 320 | 92.1% |
| 2018 | 4586 | 4300 | 286 | 93.8% |
| 2019 | 3590 | 3368 | 222 | 93.8% |
| 2020 | 1341 | 1127 | 214 | 84.0% |
| 2021 | 4822 | 3988 | 834 | 82.7% |
| 2022 | 5572 | 4321 | 1251 | 77.5% |
| 2023 | 5829 | 4837 | 992 | 83.0% |
| 2024 | 7018 | 5437 | 1581 | 77.5% |
| 2025 | 9069 | 6503 | 2566 | 71.7% |

## Konklusion

Kriteriet om at bruge ID er delvist opfyldt for de gemte relationer, men ikke fuldt dækkende. De 9.926 relationer uden eksternt ID og de 2.556 spillere uden ID kræver en separat koblingsopgave, hvis fuld ID-dækning ønskes. Denne audit har ikke forsøgt at koble dem.
