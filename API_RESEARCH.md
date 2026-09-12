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
## Evidensregel

Statistik og klassifikation må kun bygge på dokumenterede observationer. Ukendte
eller usikre værdier skal markeres eksplicit som `unknown` eller `unverified`.
Der må ikke gættes på betydningen af et ID, et liganavn, et resultat eller en
fejltype. Enhver afledt klassifikation skal kunne spores til den konkrete
API-post, BadmintonPlayer-visning eller en manuel, dokumenteret verifikation.

## Test: `teams`-rækkefølge

Kørt 2026-09-12 på 462 grupper fra den historiske GSB-discovery. I 2.811 kampe stod GSB-holdet i `teams[0]` eller `teams[1]`; i 7 kampe stod det i `teams[2]`. De 7 observationer er:

- 2024, gruppe 17849, kamp 484777: `Badminton Esbjerg | Kolding BK | Gladsaxe Søborg`
- 2020, gruppe 13328, kampe 388606, 388609, 402365, 402367, 388870, 388873: blandede holdnavne og klubnavne

Det viser, at array-positionen ikke er stabil nok til alene at definere hjemmehold/udehold. Rå `teams` skal derfor bevares, og hjemme-/udehold skal valideres særskilt mod synlige kampvisninger.

Maskinresultatet ligger i `results/teams-order-test.json`, og testen kan gentages med `node test-teams-order.mjs`.
## GraphQL-resultat for turneringssporet

Schema-probe kørt 2026-09-12 mod `https://app.nembadminton.dk/graphql`.

Query-felter med turnerings-/resultatrelaterede navne er begrænset til:

- `tournamentGroups(seasonId, phaseType, order)`
- `tournamentTiers(order)`
- holdturneringsfelter som `badmintonPlayerTeamMatch`, `badmintonPlayerTeamMatches` og `teamMatchesFormattedForValidation`

Schemaets typer med turneringsnavn er kun `TournamentGroupOption` og
`TournamentTierOption`. Der blev ikke fundet en offentlig GraphQL-type for
turneringsprogram, individuel turneringskamp eller spillerresultat.

Konklusion: GraphQL kan levere række-/tier-kataloget, men vi har ikke evidens
for, at selve `VisResultater/#115342,490920` kan hentes gennem den offentlige
GraphQL-schema. Turneringsresultater skal derfor indtil videre undersøges via
BadmintonPlayer-sidens egne browserkald eller dokumenterede netværkskald.
# Genoptagelsesnote

Holdturneringssporet er dokumenteret gennem GraphQL-kæden `badmintonPlayerTeams` → `badmintonPlayerTeamFights` → match-ID’er. 2010/11 er ældste observerede sæson. 1.444/2.818 detaljekald fejlede. Turneringssporet har offentlige `tournamentTiers`/`tournamentGroups`, men sæsonlisten kræver login; browserens webservice-metoder er fundet, mens direkte replay endnu giver HTTP 500. Fortsæt med browser-/webserviceparametre, og markér ukendt i stedet for at gætte.
## Reproduceret browser-webservicekald

Med `SR_CallbackContext` fra sidens HTML lykkedes `GetTournamentEvents` direkte:

- `tournamentclassid=115342`
- events: 490920 herresingle, 490921 damesingle, 490922 herredouble, 490923 damedouble, 490924 mixdouble

`SearchTournamentMatches` lykkedes også for event `490920` og returnerede HTML med klub-ID’er, spiller-ID’er og resultater. Kaldet bruger `tournamentclassid`, `tournamenteventid`, klub-/spillerfilter samt tab-/gruppe-/lokationsnumre.

Dette er første direkte reproduktion af turneringskald uden manuel klikning. Callback-konteksten kommer fra den aktuelle side og kan udløbe; den skal derfor hentes på ny ved en senere kørsel.

## Detaljeret reproduktion af turneringskald

**Servicebase:** `https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/`

**1. Hent events for en turnering**

Metode: `GetTournamentEvents` (POST, `content-type: application/json; charset=utf-8`).

På reference `tournamentclassid=115342` returnerede kaldet disse events:

- `490920` MensSingles
- `490921` WomensSingles
- `490922` MensDoubles
- `490923` WomensDoubles
- `490924` MixedDoubles

Responsen indeholder både HTML-fragmenter (`Info`, `Html`) og strukturerede `Events` med `tournamentID`, `tournamentClassID`, `tournamentEventID`, `playerCount` og `discipline`.

**2. Hent kampe for et event**

Metode: `SearchTournamentMatches` med `tournamentclassid`, `tournamenteventid`, klub-/spillerfilter samt `tabnumber`, `groupnumber` og `locationnumber`. Responsen indeholder et HTML-fragment med klub-ID’er, spiller-ID’er og kamprækker.

**3. Callback-kontekst**

`callbackcontextkey` læses fra `SR_CallbackContext` i den friske turneringsside. Værdien er sessions-/sidebunden og må ikke gemmes i repo eller genbruges efter timeout. Scripts kræver derfor miljøvariablen `SR_CALLBACK_CONTEXT`.

**Faktisk testresultat:** Begge metoder returnerede HTTP 200 med reference-ID’erne. Før callback-konteksten blev fundet, returnerede samme typer kald HTTP 500.

**Genoptagelse:** Hent en frisk `VisResultater`-side, udlæs ny `SR_CallbackContext`, kald `GetTournamentEvents`, iterér `Events`, og kald derefter `SearchTournamentMatches` pr. event og eventuelt pr. klub/spillerfilter. Parseren skal gemme både rå HTML og strukturerede felter.
## Reproduceret spillerprofilkald

Med en frisk `SR_CallbackContext` fra `/DBF/Spiller/VisSpiller/#84737` lykkedes `GetPlayerProfile` direkte med `seasonid=2025` og `playerid=84737`.

Responsen indeholder strukturerede stamdata (`playerid`, `playernumber`, `playername`, `clubid`, `clubnumber`, `clubname`) samt et HTML-fragment med sæsonvælger, ranglistestatus, licensstatus og spillerens holdkampe. Holdkampstabellen indeholder kampdato, række, hold, modstander og direkte kamp-/pulje-URL’er.

Dette er dokumenteret evidens for, at spillerprofiler kan hentes uden manuel klikning. Det er endnu ikke evidens for, at individuelle turneringsresultater ligger i samme profilkald.
## Spillerprofilens turneringsdata

`GetPlayerProfile` blev testet for spiller `84737` med en frisk callback-kontekst og sæson-ID’erne 2025, 2024, 2020 og 2010.

- 2025: responsen indeholder primært holdkampe.
- 2024: responsen indeholder primært holdkampe.
- 2020: ingen holdkamp-/turneringstabel i HTML-fragmentet.
- 2010: responsen indeholder en eksplicit `Turneringer`-sektion med dato, arrangør, række og links til `VisResultater`, eksempelvis turnering `22644`, `410`, `373` og `647`.

Det er første direkte evidens for, at spillerprofilkaldet kan levere historiske individuelle turneringsdeltagelser. Der skal stadig testes, om nyere sæsoner bruger en anden struktur eller kun viser data, når spilleren har registrerede turneringer.
## 2025-turneringer fra spillerprofil

For spiller `84737` og `seasonid=2025` indeholder `GetPlayerProfile` en eksplicit `Turneringer`-tabel med 6 poster:

- 27-09-2025, SAIF Kbh., turnering `110017`, SEN A
- 29-11-2025, KSI Badmintonklub Kbh., turnering `112803`, SEN A
- 17-01-2026, Badminton Roskilde, turnering `111328`, SEN A
- 14-02-2026, Farum, turnering `112497`, SEN A
- 14-03-2026, Holte, turnering `113361`, SEN A
- 11-04-2026, Greve, turnering `111133`, SEN A

Dette bekræfter, at profilen kan bruges som discovery-kilde til spillerens turnerings-ID’er i en sæson. Datoerne kan ligge i kalenderåret efter sæson-ID’et.

## Brugerbekræftet betydning af pointfeltet

Brugeren har bekræftet, at pointene ud for spillerne i `GetPlayerRankingListPoints` er de præcise point, spillerne havde på den rangliste, der var gældende på spilletidspunktet. Dette skal behandles som en domænebekræftet fortolkning og ikke som en modelantagelse. Selve API-responsen viser kun kolonnen `Point`.
## Historiske ranglistepoint efter sæsonskift

Testet 2026-09-12 med spiller `84737` og season-ID’erne 2025, 2024, 2023, 2020 og 2010. Kun den aktuelle profilvisning (2026/2027) indeholder `ShowRankingListPoints(...)`-links med rankinglistplayer-ID’er. Tidligere profilvisninger indeholder turneringer/holdkampe, men ingen tilsvarende ranglistehistorik. Et direkte `GetPlayerRankingListPoints`-kald med `seasonid=2025` og aktuelle rankinglistplayer-ID’er returnerede HTTP 500.

Konklusion: Vi har endnu ingen dokumenteret metode til at rekonstruere tidligere sæsoners ranglistepoint efter sommeropdateringen. Den sikre fremtidige løsning er at gemme ranglistepoint løbende før hvert sæsonskift. Historiske point kræver en separat arkivkilde eller en allerede gemt eksport.

## Korrektion af historiske ranglistepoint

En tidligere note konkluderede for kategorisk, at historiske point ikke kan findes. Brugeren har oplyst, at de generelle ranglistearkiver indeholder ranglister fra alle sæsoner, så historiske point kan muligvis rekonstrueres derfra. Dette er endnu ikke maskinelt verificeret i projektet og skal behandles som næste researchtest.
## Ranglistehistorik: versionskald

Webservicen har en særskilt metode `GetRankingListVersions(callbackcontextkey, rankinglistagegroupid, rankinglistid, seasonid)`. Med spiller `84737`, `seasonid=2026` og `rankinglistid=288` returnerede den HTTP 200 og en liste af historiske ranglistedatoer fra 01-07-2026 til 11-09-2026 samt månedlige ranglister.

Det bekræfter, at ranglistedatoer kan enumereres maskinelt. Det efterfølgende `GetRankingListPlayers`-kald kræver yderligere præcise filterværdier; vores første generiske parameterpakke gav HTTP 500. Næste test skal aflæse disse værdier fra ranglistesidens egen JavaScript.
## Ranglisteparameter: status

`GetRankingListVersions` er reproduceret og returnerer ranglistedatoer.
`GetRankingListPlayers` er forsøgt med callback fra både spillerprofil og ranglisteside samt kombinationer af rangliste-/aldersgruppe-ID; alle generiske forsøg returnerede HTTP 500. De præcise værdier skal sandsynligvis komme fra sidens postback eller dens interne kald med flere serverfelter.

Ranglistesiden viser dog direkte, at historiske versioner kan vælges, med versionstekst, dato og periode. Derfor er sporet ikke afvist, men den nuværende direkte replay-metode er en blind vej, indtil request-parametrene kan aflæses fra browserens netværk.

## Nembadminton-ranglistedata: vurdering

Nembadminton er verificeret som en mulig støttekilde: `highestPointGain` kan
returnere pointudvikling, og `memberStats`/`membersStats` findes i skemaet.
`rankingProgression` var dog `null` i det testede `clubhouseStats`-svar.

Der er endnu ikke dokumenteret et Nembadminton-kald, som returnerer historiske
ranglisteversioner eller en spillers point pr. dato. Sporet kan derfor bruges
til spiller-/klubkatalog og sanity checks, men BadmintonPlayers ranglistearkiv
er fortsat den primære kandidat til historiske point før holdkampe. Det skal
ikke antages, at Nembadminton kan erstatte arkivet, før et dateret kald er
maskinelt verificeret.

## Tilbage til holdkamp-hovedsporet

Query-overfladen indeholder også `teamRound`, `teamRounds` og `teams`.
`teamRounds` tager `clubhouseId`, datointerval, sortering og pagination, så det
er en relevant kandidat til gruppe-/runde- og eventuelle stillingsdata. Den er
endnu ikke testet med et faktisk svar for GSB og skal behandles som
uafklaret/login-spor, indtil et konkret kald er gennemført.

### `teamRounds`-test

Skemaet blev testet direkte med `clubhouseId: 331`, `first: 100` og `page: 1`.
`teamRounds` findes og returnerer typen `TeamRound`, hvis felter blandt andet
er `id`, `name`, `round`, `gameDate`, `season`, `squads`, `receiver` og
`clubhouse`. Det faktiske kald returnerede `Unauthenticated` med guard `api`.

Konklusionen er derfor, at `teamRounds` er en lovende kandidat til runde-/
stillingsdata, men ikke kan bruges uden login i den nuværende test. Råsvaret
er gemt i `results/team-rounds-probe.json`. Næste valg er enten en test i
brugerens aktive session eller fortsat fallback via BadmintonPlayer.

### BadmintonPlayer-stilling: autentificeret test

Den aktive browser-session var autentificeret og kunne søge på `Gladsaxe
Søborg`. Gruppe-linket brugte
`ShowStanding('2', '2026', '18861', '1', '', '', '', '1093', '')` og åbnede
Danmarksserien Pulje 8. Tabellen viste position, hold, kampe, sejre, score,
sæt, point og sætpoin​t. Resultatet er gemt i
`results/browser-standing-2026-18861.json`.

Det bekræfter, at slutstillinger kan hentes via BadmintonPlayer-browseren med
gruppe-ID, sæson, aldersgruppe og klub-ID. Det er en verificeret fallback-
kilde; automatiseret råkald/HTML-parser er næste tekniske trin.

Parallel fallback-gennemgang bekræftede, at kamp `486396` kan læses i den
autentificerede browser som et eksplicit afbud/walkover med resultat 12-0 og
point 2-0. Terminal-`fetch` returnerer kun en dynamisk skal, så browser-
rendering er nødvendig for denne type data. Walkovers skal gemmes som særskilt
status og ikke fortolkes som almindelige sætresultater.

## Terra-review: alternativ ranglistevej

Terra vurderer, at de alternative ASMX-metoder (`GetRankingListPlayersSenior` og `GetRankingListPlayersHide`) ikke løser problemet med kendte parametre; gentagne kald og parameter-grid gav HTTP 500. Den nye SPA-endpoint `/api/RangkingListVersion` er ikke offentlig (401).

Anbefalet vej er browserens offentlige ranglisteside med hash-parametre, eksempelvis kategori 288 og sæson 2025. UI’en har historiske versioner (Terra observerede 159 datoer i 2025/26). En fremtidig beriger skal åbne ranglistesiden, vælge seneste version <= kampdato, læse tabellen og gemme HTML/screenshot samt valgt version som provenance. Det er ikke endnu bevist, at versionen kan sættes sikkert direkte via URL eller rå request.

Dette researchspor er en fremtidig enrichment og ikke en kritisk afhængighed for holdkampdatabasen.
