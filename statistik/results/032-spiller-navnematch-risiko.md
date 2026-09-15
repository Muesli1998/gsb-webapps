# Opgave 032 — stikprøve af spiller-navnematch-risiko

Read-only SQL-stikprøve af de 2.556 spillere uden `external_player_id`.
De 25 spillere med flest gemte individuelle kampe blev prioriteret.

| Spiller | Kampe | Sæsoner | Holdnavne i gemte relationer |
|---|---:|---:|---|
| Anton Aavang Arvidson | 70 | 2021–2024 (4) | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| Hjalte Palmqvist | 61 | 2022–2024 (3) | GSB 1; GSB 2; GSB 3 |
| Lasse Bjerregaard Kirt | 61 | 2015–2020 (5) | Gladsaxe Søborg; GSB 1; GSB 2 |
| Jesper Yan | 57 | 2022–2025 (4) | GSB 1; GSB 2; GSB 4; GSB 6 |
| Ehan Shadat | 50 | 2020–2024 (5) | GSB 1; GSB 2; GSB 3 |
| Mads Kaarsberg Andersen | 47 | 2022–2025 (3) | GSB 1; GSB 2; GSB 3; GSB 5; GSB 6 |
| Konrad Kunckel | 45 | 2020–2025 (5) | GSB 1; GSB 2 |
| Norr Bagge Køhler | 44 | 2024–2025 (2) | GSB 1; GSB 2; GSB 3 |
| Pelle Emil Jessing Schjøtt | 44 | 2018–2021 (4) | GSB 1; GSB 2; GSB 3 |
| Kasper Gorm | 41 | 2015–2017 (3) | GSB; GSB 1; GSB 2 |
| Fabian Aagren | 40 | 2014–2018 (5) | GSB 2 |
| Lukas Glaring | 40 | 2023–2025 (3) | GSB 2; GSB 4; GSB 5; GSB 6 |
| Tobias Geil Christophersen | 40 | 2024–2025 (2) | GSB 1; GSB 3 |
| Georg Engedal Nielsen | 39 | 2024–2025 (2) | GSB 5; GSB 6; GSB 7 |
| Halfdan Olrik Fløistrup | 39 | 2024–2025 (2) | GSB 2; GSB 3; GSB 4 |
| Lasse Friberg Andersen | 38 | 2025 (1) | GSB 2; GSB 4; GSB 6 |
| Peter Holger Bjørndal Axelsen | 38 | 2020–2025 (5) | GSB 1; GSB 2; GSB 3 |
| Mads Baltzer | 37 | 2020–2022 (3) | GSB 1; GSB 2 |
| Smayan Kiran Vaddin | 37 | 2023–2025 (3) | GSB 2; GSB 4; GSB 6; GSB 7 |
| Frederik Fabricius Dahl | 36 | 2013–2016 (4) | GSB; GSB 2 |
| Vitus Reinholdt Amelung | 35 | 2024–2025 (2) | GSB 1; GSB 3 |
| Aarav Jha | 34 | 2021–2023 (3) | GSB 1; GSB 2; GSB 3 |
| Nikolas Yin | 34 | 2023–2025 (3) | GSB 2; GSB 3; GSB 5; GSB 7 |
| Rasmus Kimer Fogtmann | 33 | 2021–2024 (4) | GSB 1; GSB 2; GSB 4 |
| Sebastian Larsen Lund | 33 | 2023–2025 (3) | GSB 2; GSB 3; GSB 4; GSB 5 |

SQL fandt **0** dubletter på `players.name_normalized` (ingen to player_id'er
med samme normaliserede navn). I stikprøven er der derfor ingen konkret
evidens for navnekollision. Flere holdnumre for samme navn er ikke i sig selv
en kollision: relationerne ligger i forskellige sæsoner/hold og feltet
indeholder ingen fysisk spilleridentifikator. Navnesplittelse mellem næsten,
men ikke identiske, stavemåder kan ikke afgøres uden ekstern kilde og står
som usikkerhed.

**Vurdering:** Ingen påvist kollision i 25 højvolumen-navne; risikoen er ikke
kvantificeret for alle 2.556. En fuld ID-kobling er fortsat nødvendig før
per-spiller Results-tal kan kaldes identitetsmæssigt sikre.

