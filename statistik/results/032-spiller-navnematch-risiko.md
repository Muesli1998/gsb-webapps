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

## Runde 2 — adfærdsmæssig evidens

Runde 1's tautologiske `name_normalized`-tjek er ikke brugt som bevis.
I samme 25-personers højvolumen-stikprøve fandt SQL:

- **7** spillere med kampe registreret for to GSB-hold på samme dato, fordelt
  på **22** kampforekomster: Lasse Bjerregaard Kirt (282799/282912), Konrad
  Kunckel (467888/471218), Norr Bagge Køhler (505213/505246/505248/505215/
  505234/505236), Pelle Emil Jessing Schjøtt (421933/414577), Kasper Gorm
  (282797/290427), Lasse Friberg Andersen (493940/493941/494106/494107) og
  Sebastian Larsen Lund (samme-dato fund).
- **25/25** spillere optræder i mere end ét `age_group_id`; de konkrete ID'er
  er bevaret i script-outputtet. Det er ikke i sig selv en kollision, fordi
  aldersskift over flere sæsoner kan være legitimt.
- Der blev ikke fundet en pålidelig navnesplittelse fra de gemte felter alene.

Samtidige kampe på to GSB-hold er konkret adfærdsmæssig evidens, men kan også
skyldes fejlagtig spillerkobling eller dobbeltregistrering. Uden eksterne
spillerprofiler klassificeres de derfor som **mistænkte kollisioner, kræver
ekstern kilde**, ikke som bekræftede fysiske personer.

## Manuel opfølgning (Chris, 2026-09-15): Konrad Kunckel afkræftet

Kamp 467888/471218 (begge U15, 27-10-2024, samme runde) er tjekket manuelt
mod badmintonplayer.dk. Det er **ikke** en kollision: kampene ligger i to
forskellige rækker/kamptyper (U15 B 5400 blandet hold vs. U15 C 4800
drengehold), og det er ifølge Chris normal praksis i ungdomsrækkerne at
spille flere holdkampe samme dag på tværs af kamptyper for at samle
holdkampweekender.

Det svækker "samme dato, to hold" som kollisionssignal specifikt for U15
og yngre — hvilket i øvrigt ligger uden for dette tekniske trins scope
(se `docs/statistik-plan.md`). De øvrige 6 fund (Lasse Bjerregaard Kirt,
Norr Bagge Køhler, Pelle Emil Jessing Schjøtt, Kasper Gorm, Lasse Friberg
Andersen, Sebastian Larsen Lund) er endnu ikke tjekket for samme mønster
eller for om de også ligger i U15-rækker.


