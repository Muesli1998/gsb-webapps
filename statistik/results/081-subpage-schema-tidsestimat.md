# Opgave 081 — subPage-kortlægning, kampdatastruktur og målt tidsestimat

Kørsel: 2026-09-21. Testkombination: sæson 2026, ageGroupID 1, region 1,
leagueGroupID 18888. Alle svar var HTTP 200.

## Faktisk subPage-indhold

| subPage | Faktisk svar |
|---:|---|
| 0 | Tomt svar |
| 1 | Indeks: divisioner/puljer og links til leagueGroupID |
| 2 | Puljestilling med holdnavne, leagueGroupTeamID og stillingsfelter |
| 3 | Holdets egen kampoversigt når leagueGroupTeamID er angivet; uden hold-ID returneres puljestillingen |
| 4 | Hele puljens kampoversigt med leagueMatchID, dato/tid, hjemme-/udehold og holdscore |
| 5 | Kampdetalje med spillere pr. kategori og sæt-for-sæt resultater |
| 6 | Tomt svar |
| 7 | Navigationsskal (links til stilling og kampoversigt), ingen kampdata |
| 8 | Tomt svar |
| 9–16 | Navigationsskal i den testede parameterkombination, ingen ekstra data |

Eksempel på subPage 3 med hold-ID 122163: seks kampe for Højbjerg 5 med
leagueMatchID 508172, 508174, 508181, 508184, 508187 og 508192. Eksempel på
subPage 5: kamp 508170 returnerede 39 resultatceller, 40 spillerprofil-links,
spillernavne, kategorier og sætresultater.

## Udvidet skema for kampdata

Behold puljekataloget og tilføj disse tabeller i den separate
liga-landskab.db:

```sql
league_matches(
  external_match_id PRIMARY KEY, season_id, age_group_id, league_group_id,
  home_team_id, home_name_raw, away_team_id, away_name_raw,
  match_datetime_raw, match_date, venue_raw, organizer_raw,
  team_score_raw, point_score_raw, source_url, raw_sha256, fetched_at
)
match_categories(
  external_match_id, category_order, category_raw,
  home_player_1_id, home_player_1_name_raw, home_player_2_id, home_player_2_name_raw,
  away_player_1_id, away_player_1_name_raw, away_player_2_id, away_player_2_name_raw,
  winner_side, walkover_marker, PRIMARY KEY(external_match_id, category_order)
)
match_games(
  external_match_id, category_order, game_number, home_points, away_points,
  raw_score, PRIMARY KEY(external_match_id, category_order, game_number)
)
```

Det bevarer både de rå tekster og normaliserbare felter. Kategorier og spil
skal være separate rækker, fordi en kamp har variabelt antal kategorier og
op til tre sæt pr. kategori. Råsvaret bør fortsat gemmes i en separat
provenance-tabel eller filhash, så parseren kan genkøres.

## Målt tidsestimat

Tiderne er læst fra første/sidste fetched_at i databasen:

| Fase | Kald | Første → sidste | Målt tid | Målt rate |
|---|---:|---|---:|---:|
| Indeks | 16.269 | 17:51:44.900 → 18:03:12.825 | 11m 27,925s | 1.418,96/min |
| Puljedetalje | 18.546 | 18:04:59.622 → 18:12:11.864 | 7m 12,242s | 2.574,39/min |
| Matchlisteoptælling | 18.546 | 18:30:46.838 → 18:31:58.195 | 1m 11,357s | 15.594,27/min |

Den fulde kampindsamling vil bruge 18.546 matchlistekald og 310.137
kampdetailkald. Med de målte fase-rater er det 71,4 sekunder for
matchlisterne plus ca. 120,5 minutter for kampdetaljerne: ca. 121,7 minutter
(2,03 timer) aktiv kaldetid. Hvis alle 53.361 tidligere kald i stedet
fremskrives med den samlede målte rate, bliver estimatet ca. 122,3 minutter
(2,04 timer). Ratebegrænsning/backoff var 120 ms + 4 samtidige for indeks,
30 ms + 8 samtidige i første detaljebatch, derefter 10 ms + 24 samtidige,
og 10 ms + 24 samtidige for matchlisteoptællingen.
