# Nembadminton API-undersøgelse

Sidst opdateret: 2026-09-12

Dette er en løbende, versionsstyret log over read-only undersøgelser. Ingen
Google Sheets eller produktionsfiler ændres af undersøgelserne.

## Bekræftet uden login

- Endpoint: `POST https://app.nembadminton.dk/graphql`
- GSB badmintonplayer.dk `clubId`: `1093`
- GSB Nembadminton `clubhouseId`: `331`
- `badmintonPlayerTeams({ clubId, season })` virker.
- `badmintonPlayerTeamsBulk([...])` virker med flere sæsoner.
- `badmintonPlayerTeamFights({ clubId, season, ageGroupId, leagueGroupId, clubName })` virker.
- `badmintonPlayerTeamFightsBulk([...])` virker.
- `badmintonPlayerTeamMatch({ leagueMatchId, season })` virker.
- `calendarEvents({ clubIds: [1093] })` svarer med kalenderposter.
- `clubhouseStats(id: 331)` svarer med `ClubhouseInfo`.

## Historisk test

Antal holdposter fra `badmintonPlayerTeams`:

```text
2025: 77   2024: 53   2023: 42   2022: 42
2021: 34   2020: 24   2019: 20   2018: 21
2017: 23   2016: 26   2015: 22   2014: 21
2013: 22   2012: 19   2011: 24   2010: 2
```

2009 og bagud returnerede ingen reelle holdrækker i den første test.
Sæsonværdien `2025` svarer til 2025/26.

## Schemafund

Skemaet viser også `badmintonPlayerTeamsBulk`, `badmintonPlayerTeamFightsBulk`,
`badmintonPlayerTeamMatches`, `badmintonPlayerApiTeamMatches`,
`teamMatchesFormattedForValidation`, `highestPointGain`, `memberStats`,
`membersStats`, `clubhouseStats`, `calendarEvents`, `clubsSearch` og flere
interne felter.

`badmintonPlayerTeamFights` returnerer felterne `matchId`, `gameTime`, `round`,
`roundDate` og `teams`. Der findes ikke et direkte `opponent`-felt.

## Loginbegrænsede kald

`me`, `seasons` og `teams` gav `Unauthenticated` uden login. Flere interne
medlems-, runde- og logkald forventes at have samme begrænsning.

## Fejl og forbehold

- `teamMatchesFormattedForValidation` gav `Internal server error` med den
  første testede inputkombination.
- API'et er uofficielt og reverse-engineered.
- `roundDate` og `gameTime` kan være forskellige i ældre data; begge skal
  bevares i en fremtidig discovery-rapport.
