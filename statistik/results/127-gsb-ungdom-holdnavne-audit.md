# Opgave 127 — Del 1: audit af mulige GSB-ungdomsholdnavne

## Metode og dækningsgrad

Scannet alle 32837 hold-puljeposter for 126's ungdomsaldersgruppe-ID'er (2, 3, 4, 5, 6, 7, 18). Holdnavne kommer fra `league_group_teams.team_name_raw`; puljekontekst fra `league_groups` via den sammensatte nøgle `season_id + age_group_id + league_group_id`. Kandidatsøgningen ser efter Gladsaxe, Søborg/Soborg/Soeborg eller BC37. Den er kun en navneaudit.

`club_registry` har `club_id` og `club_name_raw`, men `league_group_teams` har hverken klub-ID eller registry-ID, og har ingen FK til registry. Der findes derfor ingen direkte identitetskobling; tekstlig lighed beviser ikke, at et hold tilhører registry-klubben. Navnene nedenfor er kandidater, ikke bekræftede identiteter.

## Club registry-varianter

| club_id | club_name_raw | region_id | postal_code | auditstatus |
| --- | --- | --- | --- | --- |
| 1087 | Badmintonklubben af 1937 (BC 37) |  | 2300 | tvetydig-lignende-klub |
| 1093 | Gladsaxe Søborg Badmintonklub |  | 2860 | GSB-navnekandidat |
| 1232 | Søborg S.G.& I.F., Badmintonafd. |  | 3230 | tvetydig-lignende-klub |

| Rå holdnavn | Poster | Fysiske puljer | Sæsonspænd | Auditstatus |
| --- | --- | --- | --- | --- |
| Gladsaxe Søborg | 28 | 28 | 2011–2026 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg *udgået* | 1 | 1 | 2011–2011 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 1 | 77 | 77 | 2016–2026 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 10 | 1 | 1 | 2025–2025 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 2 | 63 | 63 | 2011–2026 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 2 *Trukket | 1 | 1 | 2013–2013 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 2 *udgået* | 1 | 1 | 2011–2011 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 2 trukket | 1 | 1 | 2012–2012 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 2 udgået | 2 | 2 | 2014–2017 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 3 | 39 | 39 | 2011–2026 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 3 *udgået* | 1 | 1 | 2011–2011 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 4 | 22 | 22 | 2021–2026 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 4 *trukket* | 1 | 1 | 2011–2011 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 4 *udgået* | 1 | 1 | 2011–2011 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 5 | 16 | 16 | 2021–2026 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 5 (2+2 B) | 1 | 1 | 2025–2025 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 6 | 8 | 8 | 2022–2026 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 7 | 6 | 6 | 2024–2026 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 8 | 4 | 4 | 2024–2025 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg 9 | 2 | 2 | 2024–2025 | GSB-navnekandidat-ikke-verificeret |
| Gladsaxe Søborg udgået | 3 | 3 | 2014–2015 | GSB-navnekandidat-ikke-verificeret |

## Tvetydige lignende varianter — kræver Christoffers afgørelse

Disse forekommer i kildens navnerum, men kan ikke knyttes sikkert til GSB ud fra de tilgængelige ID'er:

### Holdnavne

| Rå holdnavn | Poster | Fysiske puljer | Sæsonspænd | Auditstatus |
| --- | --- | --- | --- | --- |
| BC37 Amager | 24 | 24 | 2011–2021 | tvetydig-lignende-holdvariant |
| BC37 Amager 1 | 70 | 70 | 2017–2026 | tvetydig-lignende-holdvariant |
| BC37 Amager 2 | 56 | 56 | 2017–2026 | tvetydig-lignende-holdvariant |
| BC37 Amager 2 trukket | 1 | 1 | 2015–2015 | tvetydig-lignende-holdvariant |
| BC37 Amager 3 | 30 | 30 | 2018–2026 | tvetydig-lignende-holdvariant |
| BC37 Amager 4 | 22 | 22 | 2018–2026 | tvetydig-lignende-holdvariant |
| BC37 Amager 5 | 15 | 15 | 2018–2026 | tvetydig-lignende-holdvariant |
| BC37 Amager 6 | 3 | 3 | 2019–2021 | tvetydig-lignende-holdvariant |
| BC37 Amager trukket | 2 | 2 | 2014–2015 | tvetydig-lignende-holdvariant |
| BC37 Amager udgået | 2 | 2 | 2012–2015 | tvetydig-lignende-holdvariant |
| BC37/Dragør 1 | 2 | 2 | 2019–2020 | tvetydig-lignende-holdvariant |
| BC37/Dragør 2 | 1 | 1 | 2019–2019 | tvetydig-lignende-holdvariant |
| BC37/Gladsaxe Søborg 1 | 1 | 1 | 2020–2020 | tvetydig-flere-klubreferencer |
| BC37/IBB 1 | 4 | 4 | 2025–2026 | tvetydig-lignende-holdvariant |
| BC37/KMB2010 Amager 1 | 1 | 1 | 2019–2019 | tvetydig-lignende-holdvariant |
| BC37/NBK Amager 1 | 1 | 1 | 2020–2020 | tvetydig-lignende-holdvariant |
| IBB/BC37 Amager 1 | 1 | 1 | 2019–2019 | tvetydig-lignende-holdvariant |
| NBK/BC 37 Amager 1 | 1 | 1 | 2019–2019 | tvetydig-lignende-holdvariant |

### Registry-klubber

| club_id | club_name_raw | region_id | postal_code | Auditstatus |
| --- | --- | --- | --- | --- |
| 1087 | Badmintonklubben af 1937 (BC 37) |  | 2300 | tvetydig-lignende-klub |
| 1232 | Søborg S.G.& I.F., Badmintonafd. |  | 3230 | tvetydig-lignende-klub |

## Andre klubber i puljer med højeste format

**Samme verificerede klubmapping kan ikke genbruges for alle klubber.** Registry-id kan ikke føres over til holdrækker via databasekolonner/FK. 092/101's tekstbaserede identitetslogik bruger senior-only data (`age_group_id=1`), ikke en verificeret ungdomsmapping for samtlige klubber. Trin 1 giver derfor ikke grundlag for at vise klubber i højeste format; det kræver en godkendt ungdoms- og klubkobling.

## Databaseværn

- liga-landskab.db: SHA-256 `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c` → `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c` (uændret)
  Rækketal før/efter: `{"age_groups":29,"club_registry":796,"fetch_errors":0,"group_type_katalog":8928,"league_group_details":18546,"league_group_match_counts":18546,"league_group_regions":59127,"league_group_teams":96823,"league_groups":18546,"league_match_groups":310137,"league_match_requests":221558,"league_matches":203012,"match_categories":1300474,"match_games":2636258,"regions":33,"standing_indexes":16269}` / `{"age_groups":29,"club_registry":796,"fetch_errors":0,"group_type_katalog":8928,"league_group_details":18546,"league_group_match_counts":18546,"league_group_regions":59127,"league_group_teams":96823,"league_groups":18546,"league_match_groups":310137,"league_match_requests":221558,"league_matches":203012,"match_categories":1300474,"match_games":2636258,"regions":33,"standing_indexes":16269}`
- gsb-statistik-normalized.db: SHA-256 `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e` → `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e` (uændret)
  Rækketal før/efter: `{"clubs":1,"competitions":462,"extraction_errors":1444,"individual_match_players":67196,"individual_matches":20319,"players":7599,"raw_payloads":2874,"seasons":26,"standings":751,"team_matches":2818,"teams":472}` / `{"clubs":1,"competitions":462,"extraction_errors":1444,"individual_match_players":67196,"individual_matches":20319,"players":7599,"raw_payloads":2874,"seasons":26,"standings":751,"team_matches":2818,"teams":472}`

Ingen database blev skrevet. Hashes og alle tabelrækketal er identiske før og efter.
