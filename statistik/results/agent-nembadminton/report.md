# Spor 1 rapport: Nembadminton GraphQL for GSB holdkampe

Dato: 2026-09-12  
Klub: Gladsaxe Søborg, `clubId 1093`  
Endpoint: `POST https://app.nembadminton.dk/graphql`

## Resultat

Discovery-kæden er dokumenteret som:

`badmintonPlayerTeams` → `badmintonPlayerTeamFights` → `badmintonPlayerTeamMatch`

Den historiske GSB-kørsel dækker API-sæsonerne 2000–2025. Der er holddata i 16
sæsoner, 462 grupper og 2.818 unikke kampe. Den ældste sæson med dokumenterede
GSB-kampe er 2010. Sanitytesten for Badmintonligaen finder 423 Liga-holdposter,
423 grupper og 855 unikke kampe i de samme 16 sæsoner.

`badmintonPlayerTeamMatch(input: {leagueMatchId, season})` svarer med HTTP 200
og kan returnere hjemmehold, udehold, kategorier, spillere og sætresultater.
Match-detail-samplet dokumenterer 32 succesfulde svar, men samplets normaliserede
udtræk har tomme `categories`/spillerfelter; derfor bør fuldt råsvar bruges ved
implementering og ikke dette resume alene.

## Fejl og retries

Fejl er opdelt efter sæson og hold. Det samlede detailudtræk har 2.818 forsøg,
1.374 succeser og 1.444 fejl. Registrerede fejltekster omfatter `Internal server
error` og `Could not find any players on match`. Retry-udtrækket viser, at de to
testede varianter med og uden `version` ikke ændrede resultatet for match 486396;
match 487423 gav `Internal server error` i begge varianter. Retry bør kun bruges
ved timeout, HTTP-fejl eller midlertidig GraphQL-fejl.

## Age group, liga/række

Age-group-kataloget er evidensbaseret og mærker kun observerede labels. For
`ageGroupId: 1` findes rå ligaeksempler som Danmarksserien og Københavnsserien
på tværs af 2010–2025. Rå `league`-tekst og `leagueGroupId` skal bevares; Ligaen,
kvalifikation og slutspil må ikke sammenblandes ud fra et gæt eller kun et
normaliseret rækkenavn.

## TeamRounds

Schema introspection viser `teamRounds(clubhouseId, order, gameDate, first, page)`
samt `teamRound(id)` og `teamRoundReceiver(teamRoundId)`. `TeamRound` har felter
som `id`, `squads`, `name`, `round`, `gameDate`, `season` og `clubhouse`.
Et direkte `teamRounds(clubhouseId: 331, first: 100, page: 1)`-kald svarer HTTP
200 med GraphQL-fejlen `Unauthenticated.` og guard `api`. TeamRounds er derfor
ikke en login-fri datakilde i denne test.

## Filer med råsvar

- `team-rounds-probe.raw.json`
- `historical-summary.raw.json`
- `match-detail-errors.raw.json`
- `retry-known-matches.raw.json`
- `agegroup-evidence.raw.json`

De er kopieret uændret fra eksisterende read-only testresultater. Ingen fælles
database, Google Sheets eller produktionsmappe er ændret.
