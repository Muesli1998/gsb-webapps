# Opgave 084 — række- og rangeringsoverblik

Genereret: 2026-09-22T05:58:39.130Z

## Datasæt

- `league_groups`-rækker: **18546**
- Distinkte division_name_raw-værdier: **3393**
- Distinkte group_name_raw-værdier: **3438**
- Distinkte page_title_raw-værdier: **1337**
- Den komplette katalogisering med forekomster pr. sæson og region ligger i `084-liga-landskab-rangering.json`.

## Faktiske rå navnemønstre

Råfelterne er ikke et entydigt hierarki: de blander divisionsnavne, regionale serier, alders-/pointformater og playoff/finaler. Regionerne findes i data som numeriske `region_id`-værdier; der er ikke et regionsnavn i `league_groups`-skemaet.

### Hyppigste division_name_raw

| Rå værdi | Forekomster | Sæsoner | Regioner |
|---|---:|---:|---:|
| Danmarksserien | 215 | 17 | 1 |
| U13 D 4 spillere | 186 | 6 | 17 |
| U11 D 4 spillere | 156 | 6 | 17 |
| U15 D 4 spillere | 138 | 6 | 17 |
| U15 C 4 spillere | 134 | 6 | 17 |
| U13 C 4 spillere | 122 | 6 | 17 |
| U15 - 4800 (4 spillere) | 122 | 4 | 17 |
| Serie 2 | 112 | 16 | 16 |
| 3. division | 108 | 16 | 1 |
| U13 - 3800 (4 spillere) | 94 | 4 | 18 |
| Serie 3 | 93 | 16 | 16 |
| U15 B 4 spillere | 92 | 6 | 16 |
| Serie 1 | 90 | 16 | 8 |
| Serie 1 Vest | 86 | 8 | 5 |
| U17/U19 C 4 spillere | 82 | 5 | 15 |
| Badmintonligaen | 81 | 17 | 1 |
| U13 - 3400 (4 spillere) | 70 | 2 | 18 |
| U13 B 4 spillere | 64 | 5 | 17 |
| U13 - 4400 (4 spillere) | 62 | 4 | 18 |
| U15 - 5600 (4 spillere) | 60 | 4 | 18 |
| U15 - 4200 (4 spillere) | 58 | 2 | 16 |
| U11 - 3000 (4 spillere) | 56 | 2 | 18 |
| U13 - 3500 (4 spillere) | 56 | 2 | 15 |
| DMU H - U13 3400 4 spillere | 54 | 1 | 2 |
| 2. division | 53 | 16 | 1 |

### Hyppigste group_name_raw

| Rå værdi | Forekomster | Sæsoner | Regioner |
|---|---:|---:|---:|
| Pulje 1 | 6368 | 16 | 25 |
| Pulje 2 | 2049 | 16 | 24 |
| Pulje 3 | 704 | 16 | 20 |
| Pulje 4 | 426 | 16 | 20 |
| Finale | 356 | 16 | 14 |
| Pulje 5 | 146 | 15 | 16 |
| SM-Finale | 124 | 2 | 6 |
| Pulje 6 | 110 | 15 | 18 |
| Bronzekamp | 104 | 12 | 3 |
| Finale slutspil (1. - 4. plads) | 78 | 3 | 2 |
| 5. - 8. plads | 76 | 7 | 3 |
| Pulje 7 | 64 | 14 | 18 |
| 5. - 6. plads | 60 | 9 | 3 |
| Pulje A | 57 | 10 | 12 |
| Pulje B | 57 | 11 | 12 |
| Finaleslutspil (1. - 4. plads) | 56 | 3 | 2 |
| 3. - 4. plads | 54 | 9 | 5 |
| Placeringskampe (5. - 8. plads) | 51 | 4 | 2 |
| Finale slutspil | 50 | 3 | 3 |
| Pulje 8 | 46 | 14 | 12 |

### Hyppigste page_title_raw

| Rå værdi | Forekomster | Sæsoner | Regioner |
|---|---:|---:|---:|
| DGI UNG 2024/2025 | 279 | 1 | 2 |
| DGI UNG 2023/2024 | 270 | 1 | 2 |
| BADDAN UNG 2022/2023 | 256 | 1 | 2 |
| DGI UNG 2025/2026 | 245 | 1 | 2 |
| DGI UNG 2021/2022 | 217 | 1 | 2 |
| DGI UNG 2017/2018 | 203 | 1 | 2 |
| DGI UNG 2018/2019 | 188 | 1 | 2 |
| DGI UNG 2016/2017 | 176 | 1 | 2 |
| DGI UNG 2014/2015 | 163 | 1 | 2 |
| DGI-&#216;ST UNG 2019/2020 | 145 | 1 | 14 |
| DGI UNG 2015/2016 | 142 | 1 | 2 |
| DGI-&#216;ST UNG 2017/2018 | 140 | 1 | 9 |
| DGI UNG 2020/2021 | 136 | 1 | 2 |
| DGI-&#216;ST UNG 2013/2014 | 134 | 1 | 14 |
| DGI-&#216;ST UNG 2020/2021 | 134 | 1 | 13 |
| DGI-&#216;ST UNG 2016/2017 | 131 | 1 | 11 |
| DGI-&#216;ST UNG 2021/2022 | 119 | 1 | 12 |
| DGI-MVS UNG 2024/2025 | 106 | 1 | 6 |
| DGI-&#216;ST UNG 2015/2016 | 105 | 1 | 11 |
| DGI-&#216;ST UNG 2018/2019 | 104 | 1 | 9 |

## GSB-udsigt og empirisk bevægelse

- GSB-koblede holdrækker med mindst én kamp: **455**; senior/veteran age_group_id 1 eller 9: **142**.
- Senior/veteran-rækker hvor råteksten eksplicit indeholder oprykning/nedrykning: **16**.
- Senior/veteran-rækker hvor råteksten indeholder kvalifikation: **13**.
- Dette er evidens for at op-/nedryknings- og kvalifikationsfaser kan identificeres som tekstlige hændelser. Det er ikke i sig selv et bevis på en stabil holdidentitet på tværs af sæsoner.
- GSB’s førstehold har i flere sæsoner en unummereret/varierende `team_name_raw` og flere rækker i samme sæson (hovedpulje plus kvalifikation eller nedrykning). Derfor behandles tværsæsonskobling som usikker, medmindre en særskilt identitetsnøgle eller manuel facitliste foreligger.

### Eksempel på kendt GSB-forløb (rå data)

| Sæson | Holdnavn | Rå række | Pulje-ID | Kampe |
|---:|---|---|---:|---:|
| 2010 | Gladsaxe Søborg 1 | Danmarksserien Øst pulje 4 | 431 | 7 |
| 2011 | Gladsaxe Søborg | Danmarksserien Øst pulje 2 | 71 | 7 |
| 2011 | Gladsaxe Søborg | Nedrykning fra Danmarksserien Pulje 3 | 983 | 4 |
| 2012 | Gladsaxe Søborg | Danmarksserien Øst pulje 3 | 1358 | 7 |
| 2013 | Gladsaxe Søborg | Danmarksserien Øst pulje 4 | 2620 | 7 |
| 2014 | Gladsaxe Søborg | Danmarksserien Øst pulje 1 | 4293 | 7 |
| 2015 | Gladsaxe Søborg | Danmarksserien Øst pulje 3 | 5946 | 7 |

## Officiel dokumentation

- Badminton Danmarks holdturneringsreglement beskriver divisionsstrukturen og geografiske grupper, herunder 3. division og Danmarksserien, samt oprykning/nedrykning: [Holdturneringsreglement for badminton i Danmark](https://badminton.dk/wp-content/uploads/2023/10/Holdturneringsreglement-for-badminton-i-Danmark-051023.pdf).
- De officielle DH-regler beskriver seniorstrukturen fra Badmintonligaen gennem 1.-3. division og Danmarksserien og har særskilte opryknings-/nedrykningsregler: [DH-reglement 2026](https://badminton.dk/wp-content/uploads/2026/02/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-02-25.pdf).
- Kilderne dokumenterer regler og bevægelsesmekanismer, men de giver ikke en maskinlæsbar historisk mapping af hvert råt `division_name_raw`/`page_title_raw`-token til ét globalt niveau. Den del må derfor kombineres af officielle regler, kildeårgang og empirisk validering.

## Foreslået model (ikke bygget)

1. Behold rå `league_groups` urørt og tilføj senere en separat afledt tabel `league_level_assignments` med `season_id`, `age_group_id`, `region_id`, `league_group_id`, normaliseret niveau, holdtype, confidence, evidence_type og source_ref.
2. Brug en separat `team_identity_links`-tabel til tværsæsonskoblinger med `identity_method` (eksplicit ID, alias, manuel), confidence og konfliktflag. Et råt holdnavn alene må ikke være en stabil identitetsnøgle.
3. Beregn rangerede lister i en materialiseret/afledt visning pr. sæson + aldersgruppe: først officielt niveau (hvis dokumenteret), derefter pulje/region, derefter kampresultat/sætdifference. Vis datadækning og usikkerhed sammen med rangeringen.
4. Hold kampdata adskilt fra fortolkningen, så regler eller navnealias kan forbedres uden at genindhente råkampe.

## Konklusion

Opgaven er gennemført som analyse. Rånavnene viser et reelt, heterogent landskab; officielle regler bekræfter en overordnet seniorstruktur, men ikke en komplet historisk tokenmapping. Oprykning/nedrykning kan bruges som valideringsevidens i et afgrænset, manuelt kontrolleret udsnit, men ikke som automatisk identitets- eller niveaualgoritme endnu.
