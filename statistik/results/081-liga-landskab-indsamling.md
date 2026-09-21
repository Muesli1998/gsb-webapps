# Opgave 081 — fuld liga-/turneringsindsamling

Kørsel: 2026-09-21, `GetLeagueStanding` via `WebService1.asmx`.

## Indeksfase

| Måling | Antal |
|---|---:|
| Forventede kombinationer (17 sæsoner × 29 aldersgrupper × 33 regioner) | 16.269 |
| Kald udført | 16.269 |
| `ok` | 16.269 |
| `empty` | 0 |
| `error` | 0 |
| Puljereferencer før deduplikering | 59.127 |
| Unikke puljer (sæson + aldersgruppe + `leagueGroupID`) | 18.546 |
| Regionstilknytninger til puljer | 59.127 |

## Detaljefase

| Måling | Antal |
|---|---:|
| Unikke puljekald | 18.546 |
| `ok` | 18.546 |
| `empty` | 0 |
| `error` | 0 |
| Importerede holdrækker | 96.823 |
| Holdrækker med numeriske stillingsfelter | 90.480 |
| Holdrækker uden numeriske felter (kildetekst som fx `Holdet trukket`) | 6.343 |
| Tomme `leagueGroupTeamID` | 0 |
| Fejllogsrækker | 0 |

Alle råsvar er gemt i `standing_indexes` og `league_group_details`, så parseren kan genkøres uden nye kald. Den separate database er `statistik/data/liga-landskab.db`; `gsb-statistik-normalized.db` blev ikke ændret.

## Primærnøgle for `league_group_teams`

Efter den fulde kørsel havde alle 96.823 holdrækker et `leagueGroupTeamID`, og der var ingen tilfælde hvor samme pulje-ID havde flere holdnavne. Derfor er `team_name_raw` ikke nødvendig som identitets-fallback i det indsamlede datasæt. Skemaet er migreret til primærnøglen `(season_id, age_group_id, league_group_id, league_group_team_id)`; `team_name_raw` bevares som felt til visning og historisk sammenligning.

## Sideordnet regelsæt-test

`GetLeagueStanding` `subPage=2` viser puljestilling og hold-ID'er, men indeholder ikke et `leagueMatchID`. `subPage=4` giver en matchliste med et match-ID-link, så ét ekstra puljekald er tilstrækkeligt til at finde et eksempel. Tre faktiske testkald:

| `leagueGroupID` | Første `leagueMatchID` | Holdscore i puljelisten | Eksempel på kampsæt-score fra `subPage=5` |
|---:|---:|---:|---|
| 18888 | 508170 | 7-6 | 15-10, 15-8 |
| 18872 | 507745 | 3-6 | 13-15, 15-12, 15-11 |
| 18833 | 507270 | 7-2 | 15-7, 10-15, 11-15 |

Det dokumenterer en billig vej: ca. ét `subPage=4`-kald pr. unik pulje for at finde ét match-ID, plus ét `subPage=5`-kald for selve kampresultatet. For 18.546 puljer er det ca. 18.546 ekstra kald for ID-listen og op til 18.546 for kampdetaljen (37.092 i alt), hvis regelsætklassifikationen skal gemmes for alle puljer. Det er ikke bygget ind i 081-indsamlingen.
