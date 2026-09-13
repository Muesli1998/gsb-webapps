# Samlet testlog

Sidst opdateret: 2026-09-12

Dette er den samlede log over de read-only undersøgelser, der er kørt for GSB-
statistikprojektet. API-fejl er ikke fortolket som bevis på, at data mangler.
Uverificerede fortolkninger er markeret som ukendte.

## Nembadminton GraphQL

Endpoint testet: `POST https://app.nembadminton.dk/graphql`.

- GSB-identitet verificeret: BadmintonPlayer `clubId=1093`, Nembadminton
  `clubhouseId=331`.
- `badmintonPlayerTeams` testet for sæsonerne 2010–2025.
- `badmintonPlayerTeamsBulk` testet med flere sæsoner.
- `badmintonPlayerTeamFights` testet for GSB-grupper.
- `badmintonPlayerTeamFightsBulk` testet med flere grupper.
- 16 sæsoner med reelle GSB-holddata: 2010–2025.
- 462 grupper og 2.818 deduplicerede kamp-ID’er fundet.
- 2000–2009 gav ingen reelle discovery-data i den testede kæde; det er et
  API-resultat og ikke bevis på historisk fravær.
- `badmintonPlayerTeamMatch` testet på repræsentative kampe.
- 1.374 kampdetaljer lykkedes.
- 1.444 kampdetaljer fejlede:
  - 1.085 `Internal server error`
  - 359 `Could not find any players on match`
- Fejlene er analyseret pr. sæson, aldersgruppe, hold og modstander.
- Kendte kamp-ID’er 486396 og 487423 fejler fortsat i Nembadminton.
- Alternative matchkald er skema-testet, men gav ikke en generel løsning på
  fejlene.
- `teams`-rækkefølge testet: GSB står ikke altid i samme array-position.
- `matchId`, `round`, `roundDate` og `gameTime` er bevaret i rådata.
- `teamRounds` og `teamRound` findes i skemaet.
- `teamRounds(clubhouseId=331, first=100, page=1)` returnerede `Unauthenticated`
  med guard `api`.
- `highestPointGain` virker uden login.
- `memberStats`/`membersStats` findes i skemaet.
- `rankingProgression` var `null` i det testede `clubhouseStats`-svar.
- `seasons` returnerede `Unauthenticated` uden login.
- Klublistekald gav 1.428 BadmintonPlayer-klubber og 1.159 poster i det andet
  klubkald.

## Aldersgrupper og rækker

- Evidenskatalog bygget fra konkrete rå rækketekster.
- Observerede ID’er: 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 13, 16, 17 og 18.
- ID 7, 10, 14 og 15 er fortsat `unknown`.
- `ageGroupId` gemmes altid sammen med sæson og rå rækketekst.
- Brugerbekræftede eksempler:
  - kamp 486396: SEN40+, ID 9
  - kamp 487423: SEN60+, ID 13
- Der er ikke oprettet et globalt aldersgruppekort baseret på gæt.

## Kampdetaljer og walkovers

- Repræsentative kampdetaljer testet for sæsonerne 2011–2025.
- 2010-prøvekampene fejlede.
- Kamp 486396 blev visuelt verificeret på BadmintonPlayer som:
  - Tingbjerg 2 – Gladsaxe Søborg 4
  - SEN+40
  - resultat 12-0, point 2-0
  - `Afgjort uden kamp (afbud/udeblivelse)`
- Walkoverstatus skal gemmes separat; manglende sætresultater må ikke tolkes
  som en almindelig kamp.
- Terminal-fetch returnerede kun dynamisk HTML-skal for kampvisningen.
  Browser-rendering viste de faktiske felter.
- En checkpoint-fejl, der kunne skrive dubletter ved genkørsel, blev rettet.
- Deduplikeret kampfil med 2.818 unikke kamp-ID’er er genereret.

## BadmintonPlayer browser og stillinger

- Login-session testet og verificeret som Christoffer Müller.
- GSB-søgning testet i holdturneringens stillingsvisning.
- Gruppekaldets dokumenterede JavaScript-format er:
  `ShowStanding(region, season, groupId, ageGroupId, ..., clubId, ...)`.
- Sæson 2026/27, Danmarksserien Pulje 8, gruppe 18861 hentet.
- Sæson 2025/26, Danmarksserien Pulje 7, gruppe 17922 hentet.
- Stillingerne indeholder position, hold, kampe, sejre, score, sæt, point og
  sætpoint.
- Historiske GSB-grupper og række-/fasekategorier vises i browseren.
- BadmintonPlayer er dermed verificeret som fallback-kilde for slutstillinger
  og kampdata.

## BadmintonPlayer webservice og turneringsdata

- `GetTournamentEvents` testet for turnering 115342.
- Events 490920–490924 fundet for single, double og mixdouble.
- `SearchTournamentMatches` testet for event 490920.
- Resultater indeholder kampnumre, faser, spillere, spiller-ID’er, klubber og
  scores.
- `GetPlayerProfile` testet for spiller 84737 i sæsonerne 2025 og 2026.
- `GetPlayerRankingListPoints` testet for single, double og mixdouble i den
  aktuelle sæson.
- `GetRankingListVersions` testet og returnerede historiske ranglistedatoer.
- `GetRankingListPlayers` og varianter gav HTTP 500 med de testede direkte
  parameterpakker.
- Direkte HTML-fetch af dynamiske sider gav ikke de renderede resultater.

## SQL og datakvalitet

- Lokal SQLite-struktur og prøveimport testet.
- Separat datakvalitetsanalyse kørt.
- 472 holdobservationer, 462 grupper og 2.818 kampobservationer i analysen.
- Ingen dubletter fundet på de analyserede hold-, gruppe- eller kampnøgler.
- 65 kampe mangler `round`.
- 66 kampe mangler `roundDate`.
- Forskelle mellem `roundDate` og datoen i `gameTime` er målt.
- Den fælles database er ikke ændret af disse analyser.

## Parallel testkørsel

Seneste parallelle kørsel dækkede:

1. Nembadminton discovery og kampfejl.
2. BadmintonPlayer-fallback og walkoverkontrol.
3. SQL-datakvalitet og skemaforslag.
4. Autentificeret browser-test af historiske stillinger.

Alle agenter skrev kun til afgrænsede testområder. `netlify-tool-prod` blev ikke
ændret.

## Åbne tests

- Automatisere BadmintonPlayer-stillinger for alle historiske GSB-grupper.
- Bruge fallback-metoden på alle 1.444 fejlende kampdetaljer.
- Teste `teamRounds` i Nembadminton med en separat Nembadminton-session.
- Finde ud af om `squads` indeholder flere stillingsfelter.
- Afklare de ukendte aldersgruppe-ID’er med konkrete observationer.
- Bygge den endelige rådata- og normaliserede SQL-model.
- Først derefter beregne avanceret statistik.

## Prioriteringsbeslutning: U15 og yngre udskudt

U9–U15-fallbackberigelse er midlertidigt udskudt. Rådata og fejlregistreringer bevares, men den aktive fallback-kø prioriterer senior- og veterangrupper. Køstatus `deferred_youth_u15` betyder udskudt efter denne beslutning, ikke at data mangler.

## 2026-09-12: screening for mulige tilbagetrækninger
- Tilføjet results/withdrawal-candidate-report.md.
- 0-point-rækker screenes som kandidater, aldrig som bekræftede trækninger.
- Nuværende browser-standing-filer gav ingen GSB-kandidat; stillingsdækningen er ufuldstændig.


## 2026-09-12: hentning og parsing af officielle stillinger

- Kilde: BadmintonPlayer Holdturnering/Stilling via lokal Playwright-browser.
- For hver unik sæson + leagueGroupId blev siden åbnet med URL-formatet `#2,{season},{leagueGroupId},1,,,,1093,`.
- Browseren ventede på dynamisk rendering og gemte både sidens fulde synlige tekst (`rawText`) og alle HTML-tabeller (`tables`).
- Der blev gemt én JSON-fil pr. pulje i `results/browser-standings/` med sæson, pulje-ID, kilde-URL, hentetidspunkt og status.
- Stillingskolonnerne er bevaret råt: placering, hold, kampe, vundne, score, sæt og point.
- Den efterfølgende analyse udtrækker GSB-rækker og beregner kandidater. Afledte flag må ikke erstatte rå kildedata.
- 97/97 puljer blev hentet uden browserfejl.
- Ved screening blev 0 point først behandlet som en kandidatindikator. Efter kontrol blev heuristikken korrigeret: score og sætscore skal vurderes, og eksplicit tekst som `trukket` eller `udgået` er stærkere evidens.

- Parser rettet til historiske stillingsoverskrifter med præfikser (K.Kampe, V.Vundne, P.Point). Pulje 2014/4247 er efterkontrolleret og importeret med 8 rækker.


## Playoff-stillinger uden aggregatfelter

Pulje 2016/9019 og 2022/15670 viser kun den endelige placeringsrækkefølge i tabellen. De er finaleslutspil, ikke almindelige puljer. Kampstrukturen ligger i kampoversigten: semifinaler, finale og bronzekamp. Derfor skal kampantal, sejre, score og sæt beregnes fra de tilknyttede kamp-ID'er, når de hentes. De manglende kolonner er et formatvalg på kilden, ikke nødvendigvis manglende historik.

- Via fungerende Holdturnering-visning (#6,2016,,,,,,1093,) blev kamp 278705 dokumenteret som Viborg 2 - Gladsaxe Søborg 1 3-4, og 278706 som Solrød Strand 2 - Gladsaxe Søborg 1 4-2. Resultaterne blev skrevet som browser_verified.


- Datoanalyse af alle 58 browser_no_match_id-kampe gemt i results/browser-no-match-dates.csv og results/browser-no-match-date-analysis.md. 23 er fra 2019-sæsonen (18 med dato i marts/april 2020), 31 fra 2020-sæsonen, 4 fra 2018.


- Officiel corona-kontekst fra Badminton Danmark tilføjet til datoanalysen med kildelinks. Datoer i marts/april 2020 og december 2020–april 2021 behandles som mulige suspenderede/aflyste kampe, ikke automatisk som datamangler.


- 45 genfundne kampe med Resultat '-' og dato i dokumenterede coronaperioder er markeret corona_suspended. Original status og råtekst er bevaret.


- Tilføjet backlogpunkt til fremtidig fuld klubimport: særskilt coronaklassifikation af suspenderede kampe og bevaring af rå evidens.


## Audit af samlet individuel ekstraktion

Efterkontrol viste, at de 420 filer fra den samlede kørsel teknisk blev skrevet uden exception, men browserindholdet var i praksis kun BadmintonPlayer-standardskallen. Alle 420 havde ingen kategorisektioner og ingen scorelinjer; hver havde kun en placeholder-spillerlink. De skal derfor ikke regnes som valide individuelle udtræk.

De tidligere 56 retry-filer, hvor kampdetaljer blev verificeret i den fungerende browserkontekst, er fortsat det valide testgrundlag. Den samlede 420-kørsel skal gentages med en renderingskontrol, der kræver Kampnr, Resultat og mindst én rigtig spiller-/kampsektion, før en fil accepteres.

# Status ved dagens afslutning – 2026-09-12

## Hvad der blev gennemført

- 97 sæson/pulje-stillinger blev hentet via lokal Playwright-browser og gemt med rå tekst, tabeller, URL og tidspunkt.
- Stillingsdata blev importeret til `data/gsb-statistik-normalized.db`; historiske kolonnevarianter som `K.Kampe`, `V.Vundne` og `P.Point` understøttes.
- 420 holdkampe blev browser-verificeret; 56 tidligere browserfejl blev genkørt med korrekt kampvisning.
- 45 kampe med resultat `-` i dokumenterede coronaperioder blev klassificeret som `corona_suspended`.
- 11 af de 56 havde faktisk resultat-/walkover-indhold.
- Kendte playoff-kampe 278705 og 278706 blev dokumenteret med holdresultater og hjemme/udehold.
- Rå browserpayloads blev gemt i SQLite `raw_payloads`.
- En samlet individuel ekstraktion for 420 kampe blev kørt, men audit viste at alle 420 filer kun indeholdt standardskallen. De må ikke bruges som gyldige spillerdata.
- Processen, usikkerheder og corona-reglen er skrevet i `TEST_RUN_LOG.md`, `RESEARCH_BACKLOG.md` og rapporterne under `results/`.

## Kendte fejl og begrænsninger

- Den samlede 420-kørsel skal gentages med streng renderingskontrol. Succes kræver Kampnr, Resultat og reel kamp-/spillersektion.
- De 56 retry-filer er det validerede browsergrundlag; de 420 bulkfiler er kun fejllog/arbejdsartefakt.
- Individuelle spillere og sæt er endnu ikke fuldt importeret til `individual_matches`/`individual_match_players`.
- To playoff-stillinger viser kun placering; kampene skal bruges til at beregne aggregater.
- U15 og yngre er fortsat udskudt.

## Næste Luna-steps

1. Ret browser-extractoren: afvis standardskal, vent på Kampnr/Resultat, og kræv mindst én reel kampsektion eller dokumenteret walkover.
2. Kør først på de 56 validerede referencekampe og sammenlign med kendte resultater.
3. Kør derefter på de resterende verificerede kampe i små genoptagelige batches.
4. Parse og importér individuelle kampe, spillere, makkere og sæt til SQLite.
5. Byg en dæknings-/afvigelsesrapport mod stillingernes kampantal.
6. Først derefter begyndes resultatoversigtens UI og filtre.

## Valideret browsersekvens fastholdt
- Den fungerende metode er nu beskrevet i results/VALIDATED_BROWSER_METHOD.md.
- Den kræver in-app-browser/CUA accessibility snapshot efter dynamisk rendering; statisk Playwright body/HTML alene er ikke et gyldigt succesflag.
- Gate: Kampnr + Resultat + hold + individuel sektion eller dokumenteret walkover.


## 2026-09-13 – parallel gap audit og ungdomsgenindlæsning
- Ungdomsgenindlæsningen kører resumérbart via `scripts/run-youth-browser-fallback.mjs` og gemmer hver dynamiske browserpayload separat i `results/browser-fallback-youth/`.
- En særskilt read-only audit (`scripts/audit-browser-recovery-candidates.mjs`) sammenholder de gemte payloads med `team_matches` og måler, hvilke manglende hjemme/ude-, resultat- og pointfelter der kan dokumenteres direkte.
- Ved første måling var 726 dynamiske kampdetaljer tilgængelige; 670 havde udfyldelige hjemme/ude-felter og 640 havde udfyldelige resultater/point. Tallene skal regenereres, når ungdomskørslen er færdig.
- API-/felt-auditten i `results/api-gap-audit.md` viser fortsat, at status `complete` ikke i sig selv dokumenterer udfyldte felter. Feltdækning skal derfor valideres særskilt.
