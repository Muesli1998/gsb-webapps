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

## Seneste read-only tests

- `clubhouseStats(331)` returnerede 496 spillere: 149 kvinder og 347 mænd.
  `rankingProgression` var `null` i dette svar.
- `calendarEvents([1093])` returnerede 53 kommende events med start/slut,
  titel, tekst og matchId. De viste både seniorhold og holdnumre, men dette er
  en kommende-kampe-kilde, ikke en historisk kilde.
- `highestPointGain(331, HS, 3, DESC, [SEN])` returnerede spiller-ID,
  navn og pointudvikling uden login.
- `badmintonPlayerTeamsBulk` virker med flere sæsoner i samme kald.
- `badmintonPlayerTeamFightsBulk` virker med flere gruppeinput i samme kald.
- `badmintonPlayerApiTeamMatches({ clubId: 1093 })` svarede korrekt, men med
  tom liste i den testede forespørgsel.
- `teamMatchesFormattedForValidation` gav `Internal server error` med første
  testede input og kræver en separat undersøgelse af inputformat/version.

## Klubliste og tværklubtest (sæson 2025 = 2025/26)

- `badmintonPlayerClubs { id name }` returnerede 1.428 poster. Listen er en
  offentlig BadmintonPlayer-klubliste og indeholder også negative/særlige
  pseudo-ID’er.
- `clubs { id name1 badmintonPlayerId initialized }` returnerede 1.159 poster.
  Et fuldt `clubs`-kald med `name2` fejlede på en null-værdi, så klienten bør
  behandle det felt som valgfrit.
- `clubsSearch` virker for nogle konkrete navne (fx `Søborg` → ID 1232 og
  `Køge` → ID 481), men gav 0 resultater for `Gladsaxe`, `Drive` og `Valby`.
  Den bør derfor ikke bruges som eneste metode til komplet klubinventar.
- `badmintonPlayerTeams` virkede på tværs af klubber: ID 1093 gav 77 hold,
  1097 gav 21, 1098 gav 19, 1102 gav 2 og 1103 gav 4 i 2025/26.

Dette er en metode-/kapacitetstest, ikke endnu en fuld scanning af alle 1.159
klubber. En komplet scanning bør køres batchvist med checkpoints og begrænset
parallelitet.

## Turneringer og ligaklassifikation

GSB's vigtigste turneringsfamilier er:

- DH: Ligaen, 1./2./3. division og Danmarksserien
- Badminton Sjælland: Sjællandsserien og underliggende serier
- Badminton København: Københavnsserien og underliggende serier
- Badminton Vest: Kredsserie Vest og underliggende serier

Bornholm og Lolland-Falster findes også, men er lavere prioritet i første
statistikarbejde.

Et liganavn som `1. Serie` eller `2. Serie` er ikke entydigt på tværs af
regioner. Den historiske rapport skal derfor altid gemme det rå `league`-felt,
`ageGroupId`, `leagueGroupId` og holdnavnet. En afledt turneringsfamilie skal
kun sættes automatisk, når den kan dokumenteres; ellers markeres den som
`unknown`/`ambiguous` frem for at gætte.

En senere klassifikator bør have mindst:

```text
rawLeague
competitionFamily
region
level
classificationConfidence
classificationReason
```

Det gør det muligt at måle sæsonkomplethed pr. turneringsfamilie uden at
ødelægge de oprindelige API-navne.

En turnering kan have mange parallelle grupper med samme liganavn. Eksempelvis
kan Danmarksserien bestå af otte grupper. `league` identificerer derfor kun
turnerings-/niveau-navnet; `leagueGroupId` er den konkrete pulje eller gruppe.
Historiske optællinger skal vise begge niveauer og må ikke deduplikere grupper
blot fordi deres `league`-tekst er ens.

## Greve historisk sanitytest (clubId 18)

En målrettet test af Greve fra API-sæson 2025 tilbage til 2000 er gemt i
`results/greve-historical-2025-2000.json` og `.csv`. API'et returnerer seniorhold
og kampe for 2010–2025, mens 2009 og ældre ikke gav holdrækker i denne kæde.

Greve bekræfter Ligaen-data i API-sæsonerne 2010, 2011 og 2012, i tråd med
10/11–12/13. Der findes separate `leagueGroupId` for grundspil og slutspil:

- 2010: gruppe 398 (9), 400 (1), 403 (3), 404 (1) — 14 unikke kampe
- 2011: gruppe 3 (9), 1075 (3), 1127 (1), 1160 (1) — 14 unikke kampe
- 2012: gruppe 1637 (9), 2183 (3), 2184 (1), 2186 (1), 2188 (1) — 15 unikke kampe

Ældre API-navne er uensartede, fx `Badmintonligaen Badmintonligaen`,
`Guldmatchen Guldmatchen` og blot `Semifinaler`. Klassifikation må derfor
bruge rå `league`, holdnavn, sæson og `leagueGroupId`; en streng søgning efter
ordet `Ligaen` vil overse nogle slutspilsgrupper.
## Seneste fund: browserfallback og datakomplethed

En fuld kørsel af 2.818 GSB-kampe gav 1.374 komplette kampdetaljeopslag og
1.444 fejl. Fejlene er gemt med sæson, hold og kamp-ID i
`results/gsb-match-detail-errors-summary.json`.

BadmintonPlayer.dk's dynamiske kampvisning kan vise data, som GraphQL-kaldet
ikke kan hente. Fungerende URL-form:

```text
https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,{season},{leagueGroupId},1,8,,{matchId},{clubId},
```

Verificerede eksempler: kamp 486396 (SEN40+, 12-0, afgjort uden kamp) og kamp
487423 (SEN60+, 8-0 med individuelle resultater).

Brug statusværdierne `nembadminton_complete`, `nembadminton_no_players`,
`nembadminton_error`, `badmintonplayer_verified` og `manual_verified`.

`ageGroupId` er intern og skal gemmes sammen med det viste rækkenavn. Observerede
2025/26-værdier omfatter 1=SEN, 8=VETERAN, 9=VETERAN A/SEN40+, 11=SEN50+,
12=SEN55+, 13=SEN60+, 17=SEN70+, 2=U9, 3=U11, 4=U13, 5=U15, 6=U17 og
18=U17/U19 ungdom. Mappingen skal stadig valideres pr. sæson.

BadmintonPlayer.dk's dynamiske `Stilling`-tabel viser puljens hold, kampe,
resultater, score, point og placering og bør bruges som autoritativ kilde til
slutstillinger og walkovers.
## Sammenholdt med Claude-resultater

Claude-materialet bekræfter de centrale fund: `badmintonPlayerTeams` og
`badmintonPlayerTeamFights` kan bruges til discovery, mens
`badmintonPlayerTeamMatch` bruges til fulde kampdetaljer. Claude havde allerede
identificeret walkover-teksten `Ikke fremmødt` som en særlig situation og havde
foreslået at afgøre vinderen ud fra modstandersiden, når ingen sæt er spillet.

Vores nye tests udvider dette på tre punkter:

1. Vi har kørt discovery historisk tilbage til API-sæson 2010/11 og fundet den
   ældste moderne sæson med GSB-data.
2. Vi har verificeret direkte browserdata fra BadmintonPlayer.dk for både en
   walkover og en kamp med fulde resultater, selv når GraphQL-detaljekaldet
   fejler.
3. Vi har dokumenteret, at `ageGroupId` ikke må fortolkes som blot senior/
   ungdom. Eksempelvis er 9=SEN40+ og 13=SEN60+ i 2025/26.

Claude-noterne markerede tidligere `ageGroupId`-tabellen som et åbent punkt.
Det er derfor stadig nødvendigt at gemme både rå ID og det viste række-/league-
navn og at validere mappingen pr. sæson.
## Reviewer-proces

Ved større milepæle skal en separat reviewer kontrollere både metode og
resultater, ikke kun kode. Det gælder især efter:

- komplette historiske API-kørsler
- ændringer i aldersgruppe- eller ligaklassifikation
- nye fallback-metoder mod BadmintonPlayer.dk
- databaseimporter og ændringer i datamodellen
- beregning af officielle statistikker

Reviewerens kontrol skal sammenholde rå input, scripts, aggregerede rapporter
og et stikprøveudvalg af synlige BadmintonPlayer-resultater. Små API-kald og
rene dokumentationsændringer kan fortsat håndteres uden særskilt review.
