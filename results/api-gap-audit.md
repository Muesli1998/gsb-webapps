# API- og felt-dækning: read-only audit

Dato: 2026-09-13

## Omfang

Auditten læser `data/gsb-statistik-normalized.db` uden at ændre kø eller database. Den gennemgår `team_matches` efter status, sæson og faktisk udfyldte felter i den normaliserede tabel.

## Statusfordeling

| Status | Antal |
|---|---:|
| complete | 1.374 |
| api_error | 1.066 |
| missing_players | 314 |
| corona_suspended | 47 |
| browser_verified | 17 |
| **I alt** | **2.818** |

## Vigtige fund

- `result_raw` er tomt eller NULL for **2.757/2.818** rækker.
- `home_name_raw` mangler for **1.386/2.818** rækker.
- `away_name_raw` mangler for **1.386/2.818** rækker.
- Manglende hjemme- og udehold optræder altid sammen i den nuværende tabel. Det tyder på, at problemet ligger i samme ekstraktions-/synkroniseringsfelt, ikke at kun den ene side mangler.
- API-fejlene er koncentreret i nyere sæsoner: 2025 (237), 2024 (164), 2022 (131), 2023 (124), 2021 (96). Der findes også fejl i alle ældre sæsoner, ned til 2010 (11).
- 2020 har 41 `api_error`-rækker samt 29 `corona_suspended`-rækker; corona-status bør derfor holdes adskilt fra tekniske API-fejl.
- `complete` er ikke lig med komplet normaliseret række: alle 1.374 `complete`-rækker står stadig uden `result_raw` i den aktuelle tabel. Statusfeltet må derfor ikke bruges som bevis for feltdækning.

## Sæsonoversigt

| Sæson | I alt | Uden resultat | Uden hjemmehold | Uden udehold |
|---:|---:|---:|---:|---:|
| 2010 | 11 | 11 | 11 | 11 |
| 2011 | 169 | 169 | 159 | 159 |
| 2012 | 131 | 131 | 52 | 52 |
| 2013 | 134 | 134 | 43 | 43 |
| 2014 | 144 | 144 | 53 | 53 |
| 2015 | 156 | 156 | 48 | 48 |
| 2016 | 147 | 145 | 52 | 52 |
| 2017 | 133 | 133 | 45 | 45 |
| 2018 | 143 | 139 | 35 | 35 |
| 2019 | 125 | 102 | 20 | 20 |
| 2020 | 162 | 133 | 102 | 102 |
| 2021 | 186 | 186 | 100 | 100 |
| 2022 | 227 | 227 | 132 | 132 |
| 2023 | 255 | 255 | 127 | 127 |
| 2024 | 295 | 295 | 165 | 165 |
| 2025 | 400 | 397 | 242 | 242 |

## Fortolkning og næste tests

1. Brug de bevarede rå browserpayloads til at udfylde `home_name_raw`, `away_name_raw` og `result_raw` uden at ændre statuslogikken.
2. Lav en felt-dækningsrapport efter synkroniseringen; `complete`, `api_error` og `missing_players` skal rapporteres separat fra faktiske udfyldte felter.
3. Prioritér 2025→2021, fordi de har flest API-fejl og manglende sider.
4. Kontrollér særskilt 2010–2015, hvor ældre formatforskelle kan være en anden årsag end moderne API-fejl.
5. Sammenlign kampantal mod de importerede stillinger pr. `season_id` og `league_group_id`.
6. Bevar corona-suspenderede poster som en dokumenteret status og bland dem ikke sammen med manglende tekniske data.

## Begrænsning

Denne audit viser den aktuelle normaliserede database. Den beviser ikke, at en kamp ikke findes på BadmintonPlayer, når et felt mangler; den viser kun, at feltet endnu ikke er synkroniseret ind i tabellen. Råpayloads og browserkilder skal bruges til at afgøre, om et manglende felt kan udfyldes.
