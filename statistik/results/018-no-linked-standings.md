# Opgave 018 – afklaring af no-linked stillinger

Genereret: 2026-09-14T20:00:31.899Z

- Rækker undersøgt: **24**
- Kobling-fejl: **24**
- Reelle huller: **0**

Metode: Read-only alternatives to opgave 015: same competition, then same season + normalized team name, then same season + broad GSB labels and same leagueGroupId where available.

| Sæson | Pulje | Hold i stilling | Officiel kampe | Samme pulje | Samme sæson/navn | Samme sæson/GSB | Konklusion | Evidens |
|---:|---:|---|---:|---:|---:|---:|---|---|
| 2010 | 417 | Gladsaxe Søborg *udgået* | 6 | 4 | 0 | 11 | kobling-fejl | same sæson + samme leagueGroupId gav 4 kamp(er) |
| 2011 | 110 | Gladsaxe Søborg 3 | 6 | 8 | 42 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 8 kamp(er) |
| 2011 | 58 | Gladsaxe Søborg | 7 | 7 | 64 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2011 | 60 | Gladsaxe Søborg 2 | 7 | 7 | 42 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2011 | 74 | Gladsaxe Søborg 3 | 7 | 7 | 42 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2011 | 77 | Gladsaxe Søborg | 7 | 7 | 64 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2011 | 79 | Gladsaxe Søborg 2 | 7 | 7 | 42 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2011 | 82 | Gladsaxe Søborg 3 | 7 | 6 | 42 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 6 kamp(er) |
| 2011 | 86 | Gladsaxe Søborg 3 | 7 | 6 | 42 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 6 kamp(er) |
| 2011 | 87 | Gladsaxe Søborg 4 | 6 | 7 | 21 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2011 | 88 | Gladsaxe Søborg | 7 | 7 | 64 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2011 | 91 | Gladsaxe Søborg 2 | 7 | 7 | 42 | 169 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2012 | 1285 | Gladsaxe Søborg | 4 | 7 | 60 | 131 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2012 | 1301 | Gladsaxe Søborg 3 | 6 | 7 | 27 | 131 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2014 | 4247 | Gladsaxe Søborg 3 | 6 | 7 | 21 | 144 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2017 | 9288 | Gladsaxe Søborg 1 | 8 | 6 | 21 | 133 | kobling-fejl | same sæson + samme leagueGroupId gav 6 kamp(er) |
| 2019 | 12589 | Gladsaxe Søborg 1 | 6 | 7 | 48 | 125 | kobling-fejl | same sæson + samme leagueGroupId gav 7 kamp(er) |
| 2021 | 13790 | Gladsaxe Søborg 1 | 6 | 4 | 62 | 186 | kobling-fejl | same sæson + samme leagueGroupId gav 4 kamp(er) |
| 2021 | 13959 | Gladsaxe Søborg | 4 | 6 | 11 | 186 | kobling-fejl | same sæson + samme leagueGroupId gav 6 kamp(er) |
| 2021 | 13961 | Gladsaxe Søborg 3 | 6 | 5 | 41 | 186 | kobling-fejl | same sæson + samme leagueGroupId gav 5 kamp(er) |
| 2021 | 13966 | Gladsaxe Søborg 4 | 5 | 6 | 19 | 186 | kobling-fejl | same sæson + samme leagueGroupId gav 6 kamp(er) |
| 2023 | 15897 | Gladsaxe Søborg 3 | 6 | 8 | 46 | 255 | kobling-fejl | same sæson + samme leagueGroupId gav 8 kamp(er) |
| 2025 | 18733 | Gladsaxe Søborg 1 | 6 | 4 | 73 | 396 | kobling-fejl | same sæson + samme leagueGroupId gav 4 kamp(er) |
| 2025 | 18733 | Gladsaxe Søborg 2 | 6 | 4 | 89 | 396 | kobling-fejl | same sæson + samme leagueGroupId gav 4 kamp(er) |

## Fortolkning

Alle rækker har alternativ evidens for kampe i den samme sæson. Det viser, at 015's nulresultat ikke betyder, at hele sæsonen mangler kampe. For de fleste rækker findes kampene under samme sæson og normaliserede holdnavn, men uden den officielle puljekobling; den alternative søgning beviser derfor en koblingsfejl i 015's snævre nøgle, men retter ikke koblingen i denne opgave.
