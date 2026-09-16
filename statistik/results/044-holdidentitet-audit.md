# Opgave 044 — holdidentitet-audit

## Del A

| Måling | Tal |
|---|---:|
| Rækker i teams | 472 |
| Distinkte team_id | 472 |
| Distinkte name_raw | 11 |
| Navne med mere end ét team_id | 10 |
| Distinkte gsb_team_id i team_matches | 455 |
| Holdkampe med gsb_team_id | 2818 |
| team_id i sæson 2025 | 77 |

## Navne med kollision

- Gladsaxe Søborg 2: 125 team_id (2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025)
- Gladsaxe Søborg 1: 101 team_id (2010,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025)
- Gladsaxe Søborg: 89 team_id (2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025)
- Gladsaxe Søborg 3: 77 team_id (2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025)
- Gladsaxe Søborg 4: 44 team_id (2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025)
- Gladsaxe Søborg 5: 17 team_id (2015,2021,2022,2023,2024,2025)
- Gladsaxe Søborg 6: 7 team_id (2022,2024,2025)
- Gladsaxe Søborg 7: 5 team_id (2024,2025)
- Gladsaxe Søborg 8: 4 team_id (2024,2025)
- Gladsaxe Søborg 9: 2 team_id (2024,2025)
- Gladsaxe Søborg 10: 1 team_id (2025)

## Konklusion

11 hold i 042/043 var navnekollision: rapporterne grupperede på name_raw. teams indeholder 472 unikke team_id; 2025 har 77. Holdidentiteten er derfor rettet til rånavn + aldersgruppe.
