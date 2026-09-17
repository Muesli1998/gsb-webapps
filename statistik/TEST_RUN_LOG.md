# Samlet testlog

Sidst opdateret: 2026-09-12

Dette er den samlede log over de read-only undersøgelser, der er kørt for GSB-
statistikprojektet. API-fejl er ikke fortolket som bevis på, at data mangler.
Uverificerede fortolkninger er markeret som ukendte.

## 2026-09-16 — Opgave 047 kvalitetstjek

Verificerede 043 efter 046: 980 modstanderidentiteter, 7.599 spillere,
67.196 relationer og top-25-karriereudvalg. Genbesøgte alle 21 uforklarede
stillingsrækker; 0/21 skyldtes ungdoms-holdtypekollision. Ingen tidligere
resultat- eller plandokumenter blev ændret.

## 2026-09-16 — Opgave 046 ungdom holdtype/niveau

Parserede ungdomscompetitions med 12 age_group_id-værdier og 85
holdtype/niveau/point-kombinationer. 34 DMU-fasegrupper kollapser med lokal
identitet; 19 tvetydige pointafvigelser blev fundet (18 med spillerdata, 1
tekstparsing alene). Rapporter 042/043 genkørt med finkornet ungdomsidentitet;
senior/veteran-logik urørt.

## 2026-09-16 — Opgave 045 finmasket holdidentitet

SQL bekræftede 12 age_group_id-værdier, 59 navn+årgang-identiteter og 70
multi-competition-grupper. Rapporter 042/043 genkørt med specifik numerisk
age_group_id: 58 registrerede holdidentiteter og 980 modstanderidentiteter.
Databasen og den brede fire-buckets age()-brug blev ikke ændret.

## 2026-09-15 — Opgave 042 Results-rapport v1

Kørte `scripts/042-results-rapport.mjs` read-only mod normalized DB. Genererede
rapport i markdown/JSON med 16 sæsoner, 11 GSB-hold, 7.599 unikke spillere og
67.196 spillerrelationer. Kendte huller: 18 audit-kandidater, 21 uforklarede
stillingsrækker, 205 ungdomsholdkampe uden individuelle rækker (46 uden
kategorisektion/afbud). Databasen blev ikke ændret.

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

## 2026-09-13 – ungdomskørsel afsluttet og feltsynkronisering
- `scripts/run-youth-browser-fallback.mjs` gennemførte 1.022 køposter. 1.020 blev dynamisk verificeret; 2 (505217 og 505219, begge 2025 U09/U15-spor) viste ingen kampdetalje og står som dokumenterede huller.
- `scripts/sync-youth-browser-matches.mjs` synkroniserede 1.020/1.020 verificerede ungdomspayloads til `team_matches`. Ingen kamp-ID'er manglede i databasen.
- De tidligere 56 browserpayloads blev gen-synkroniseret: 56/56 opdateret.
- Efter synkronisering: 998 `browser_verified`, 39 `browser_verified_no_result` (resultatfeltet er eksplicit `-`), 186 `api_error`, 174 `missing_players`, 1.374 `complete`, 47 `corona_suspended`.
- Faktisk felt-dækning: 1.737 mangler stadig resultatfelt, 366 mangler hjemme/ude; de verificerede browserpayloads har reduceret manglende hjemme/ude fra 1.386 til 366.
- `results/browser-recovery-candidates.md` er regenereret og viser 0 yderligere dokumenterbare felter i de payloads, der allerede er synkroniseret.
- Coverage-rapporten tæller nu både almindeligt `verified` og `youth_verified`: 1.440/1.444 køposter verificeret, 2 uden matchdetalje, 2 corona-suspenderede.
- Walkoverkontrol: ungdomspayloads indeholder 863 eksplicitte W.O.-markeringer; den samlede normaliserede tabel har fortsat kun 3 walkoverfelter, fordi individuelle kampdata endnu ikke er fuldt parseret ind.
- Walkovermarkering blev efterkontrolleret: teksten `Vinder W.O.` alene er en tabeloverskrift og tælles ikke som walkover. Kun den eksplicitte tekst `(Ikke fremmødt)` tælles. Det gav 58 dokumenterede ungdoms-walkovers; 57 havde en entydig vinder ud fra den viste holdscore. Samlet er 64 kø-walkovers og 57 med vinder; SQLite har nu 61 rækker med walkoverfelt.
- Coverage-rapporten er opdateret efter ungdoms- og walkover-synkronisering.
- API-gap audit blev gjort reproducerbar med `scripts/run-api-gap-audit.mjs`; sæsontabellen tæller nu manglende hjemme/ude som manglende rækker (ikke dobbelt som felter).

## 2026-09-13 – metode dokumenteret til senere skill
- Arbejdsgangen for dynamisk browser-fallback er samlet i `results/COMPLETE_RESULT_FALLBACK_METHOD.md`.
- Dokumentet beskriver URL, render-gate, label-parser, walkover-evidens, genoptagelse/idempotens, COALESCE-synkronisering, corona-statusbevarelse og efterfølgende kvalitetstjek.
- Vigtig fejlforebyggelse: `Vinder W.O.` er kun kolonneoverskrift. Kun `(Ikke fremmødt)` tælles som eksplicit walkover.
- Den aktive fulde resultatrunde kører via `scripts/run-complete-result-fallback.mjs`; hver kamp gemmes løbende i `results/browser-fallback-complete/` og kan senere importeres med `scripts/sync-browser-field-gaps.mjs` efter tilpasning til outputmappen.

## 2026-09-13 – komplet resultat-fallback afsluttet
- `scripts/run-complete-result-fallback.mjs` forsøgte 1.374 `complete`-rækker uden resultat: 1.372 dynamiske kampdetaljer, 2 uden dynamisk detalje, 0 browserfejl.
- En parserfejl i første synkroniseringsforsøg blev opdaget: complete-filer bruger `external_match_id`, mens køfiler bruger `matchId`. Synkroniseringsscriptet blev rettet til begge feltnavne og kørt igen.
- Efter korrekt synkronisering og corona-genoprettelse: kun 6 rækker mangler resultat i SQLite — 4 U09-kampe uden dynamisk detalje (505217, 505219, 506407, 506413) og 2 eksplicit corona-suspenderede kampe (387862, 387864). Kun de fire U09-sager er tekniske hentehuller.
- Kun 6 rækker mangler hjemme/ude, de samme fire U09-sager plus de to corona-suspenderede. Ingen manglende spillerdata-statusser er tilbage i normaliseret tabel.
- SQLite har 2.818 unikke team_matches, ingen foreign-key- eller ID-dubletter, 2.682 browser_verified, 85 browser_verified_no_result og 47 corona_suspended.
- Fallbackresultatet er opsummeret i `results/complete-result-fallback-report.md`; metodebeskrivelsen står i `results/COMPLETE_RESULT_FALLBACK_METHOD.md`.
- De to standardrute-huller 1884 og 1888 blev undersøgt med fem fragmentvarianter. `#5,...,1,1,,{matchId},1093,` gav fuld dynamisk detalje, selv om `#5,...,1,8,,...` ikke gjorde. Begge blev importeret med resultaterne 10-3 og 7-6 via `scripts/sync-legacy-route-probe.mjs`.
- Efter legacy-fallback er effektiv resultatdækning 2.818/2.818 for alle rækker, der ikke er eksplicit corona-suspenderede eller U09-sider uden kampdetalje.

## 2026-09-13 – audit af no-result og mulig corona-lukning
- En separat audit (`scripts/audit-no-result-matches.mjs`) gennemgår alle 2.818 `team_matches` og udvælger rækker med `result_raw` lig med `NULL`, tomt, `-` eller `0-0`.
- Auditten korrigerer for en vigtig fejlkilde: datoer som `22-03` må ikke tælles som sætscores. Scores søges derfor kun efter `Resultat`-feltet i den dynamiske kamptekst.
- Der blev fundet 137 no-result-rækker i alt. 133 har ingen individuelle kategorier eller scores i den gemte side, 1 har eksplicit teksten `Afgjort uden kamp (afbud/udeblivelse)`, 1 har navngivne ungdomsspillere men ingen scores, og 2 har ingen browserpayload.
- I et udvidet observationsvindue for de to coronaramte sæsoner (sæson 2019: 2020-03-15–2020-06-30; sæson 2020: 2020-11-01–2021-06-30) ligger 129 rækker: 18 fra sæson 2019 og 111 fra sæson 2020. 126 af de 129 har ingen individuel evidens på siden, 1 har spilleropstilling uden scores, og 2 mangler payload.
- Det er stærk evidens for at disse sider ikke indeholder registrerede delkampe, men `-` alene beviser ikke om årsagen var corona-suspension, afbud, manglende indtastning eller anden administrativ status. Ingen database-status blev ændret af auditen.
- Kamp 452835 er et separat, direkte dokumenteret eksempel uden for coronavinduet: `0-0`, `Point 0-0` og teksten `Afgjort uden kamp (afbud/udeblivelse)`.
- Kamp 395200 har ungdomsopstilling uden scores og uden holdresultat; den skal behandles som `no_result`/uafklaret, ikke som spillet kamp.
- Maskinlæsbar og læsbar rapport: `results/corona-no-result-audit.json` og `results/corona-no-result-audit.md`.

### Rute-kontrol af mistanken om forkert indlæsning
- Seks repræsentative no-result-kampe (384292, 365220, 387380, 395109, 395200 og 395153) blev åbnet via den normale kampfragmentrute og de alternative `1,1`-fragmentvarianter, der tidligere fandt kampene 1884/1888.
- De ruter, der faktisk viste kampdetaljen, viste fortsat `Resultat -` og ingen individuelle scores. Ingen alternativ rute afslørede et skjult holdresultat eller en skjult individuel kamp.
- 384292 gav ved én kort 1,8 sekunders prøve et tomt standardsvar, men viste efter 7 sekunders ventetid den korrekte kamp med `Resultat -`; det var en renderingsforsinkelse, ikke et skjult resultat. Derfor er render-gate fortsat nødvendig, men den ændrer ikke no-result-fundene.
- Ruteprøven er reproducerbar via `scripts/probe-no-result-routes.mjs`; den ændrer ikke databasen.

## 2026-09-13 – reparation af API-individuelscores
- `scripts/audit-individual-db.mjs` viste, at SQLite før reparation havde 14.216 individuelle rækker, men alle 14.216 havde samme tekst i `home_score_raw` og `away_score_raw`, fordi den oprindelige import skrev den samlede scoretekst til begge kolonner.
- Dry-run af `scripts/repair-api-individual-scores.mjs` matchede alle 14.216 rækker mod 1.374 gemte API-kampdetaljer uden uoverensstemmende kamp/kategori-nøgler.
- 13.290 rækker blev repareret fra de dokumenterede `homePoints`/`guestPoints`-sæt; `winner_side` blev beregnet ud fra flest vundne sæt. 926 rækker havde ingen numeriske scores (`- - -`) og blev ikke ændret.
- Efter reparation har 13.256 rækker et vinderfelt. 933 rækker har stadig identiske hjemme/ude-tekster: 926 med `- - -` samt 7 med lave administrative værdier (`0-0`, `2-2` eller `3-3`), som kræver separat semantisk afklaring og ikke bruges som almindelige badminton-scores.
- En backup ligger i `data/backups/gsb-statistik-normalized-pre-score-repair.db`. Reparationen ændrede ikke holdkampfelter, stillinger eller de dokumenterede no-result-statusser.
- Rapporten er gemt i `results/api-individual-score-repair.json`, `results/api-individual-score-repair.md` og `results/individual-db-audit.md`.

## 2026-09-13 – browserparser, Golden Set og 0-0-markører
- \`scripts/parse-browser-individual-payloads.mjs\` blev gjort strengere: et scoresignal skal være tab/NBSP-afgrænset, så datoer i spillernavne som \`27/04-62\` ikke læses som sætresultater.
- Parseren deler nu også en særskilt \`Golden Set\`-sektion ud fra den foregående kategori. Der blev fundet 138 Golden Set-sektioner, hvor 133 har scores.
- Dry-run mod SQLite viste 6.103 nye kategorier uden scorekonflikter mod de eksisterende API-rækker. 27 tidligere rapporterede forskelle var alene spillernavne/orden/ukendt-spiller-markeringer; ingen havde scoreforskel.
- 6.103 browserkategorier blev importeret i en transaktion med 17.210 spillerrelationer og 2.556 nye spillernavne. Backup ligger i \`data/backups/gsb-statistik-normalized-pre-browser-individual-import.db\`.
- \`individual_matches.result_marker_raw\` blev tilføjet til skemaet. Markørteksten gemmes ordret, og 0-0-kategorier med markør sættes til status \`browser_zero_score\`, så de ikke forveksles med spillede sæt.
- Efter import: 20.319 individuelle rækker, 67.196 spillerrelationer, 7.599 spillere, 2.367 holdkampe med individuelle rækker. 315 holdkampe med holdresultat mangler fortsat individuelle rækker.
- Efterkontrol: ingen foreign-key-fejl eller ID-dubletter; holdkampenes 2.818-rækkers status/feltdækning er uændret. 8 individuelle kategorier har dokumenterede 0-0-sæt, og 309 har rå resultatmarkør.

## 2026-09-13 – audit af resterende individuelle dækningshuller
- audit-individual-coverage-gaps.mjs sammenholder alle holdkampe med et registreret holdresultat mod de parserede browserpayloads.
- Der er 315 holdkampe uden individuelle SQLite-rækker.
- 257 payloads indeholder ingen kategorisektioner overhovedet. 58 indeholder kategorier, men ingen scores.
- Af de 58 uden scores har 57 eksplicit no-play-/walkovertekst. Den ene uafklarede række er kamp 340495.
- Der blev ikke fundet en gap-række med scorede kategorier, som importøren havde overset.
- Fordelingen er gemt i results/individual-coverage-gap-audit.json og .md; rapporten er evidens for sidens indhold, ikke en antagelse om årsagen til manglende delkampe.

## 2026-09-13 – bemærkninger, protester og afgørelser
- 80 gemte browserpayloads indeholder feltet Bemærkning. Det gemmes nu ordret i team_matches.remark_raw.
- Nøgleordstælling: protest 20, kendelse 5, afbud 6, corona 1, ændret/ændring 22. Tællingerne overlapper, og markørerne fortolkes ikke automatisk.
- Gap-auditen fandt fire holdkampe med Bemærkning, men uden individuelle scores: 340495 (resultat ændret efter protest), 429571 (modstander mødte ikke op), 429790 (spiller indsat efter registrering) og 446325 (afbud).
- Kamp 340495 er dermed dokumenteret som en administrativ afgørelse, ikke som en skjult scoremangel.
- Rapporten ligger i results/team-match-remarks-audit.json/.md og results/individual-coverage-gap-audit.json/.md.

## 2026-09-14 – opgave 014: afklaring af kamp 340495

- Rå databaseevidens: kamp 340495 er `browser_verified`, med holdresultat `0-6`, point `0-3` og den ordrette Bemærkning "Resultatet ændret jf. kendelse i protest. Kurt Mehlsen 10.03.2019".
- Coverage-auditens gemte browserudtræk har seks kategorier og 22 spillere, men ingen kategoriscores og ingen eksplicit no-playtekst.
- Statusnotens to tidligere udsagn er forenet: protestafgørelsen afklarer holdresultatet, mens manglende individuelle scores fortsat er et afgrænset dækningshul. Databasen blev ikke ændret.

## 2026-09-13 – alternativ ruteprøve for 315 gaps
- scripts/probe-individual-gap-routes.mjs udvalgte 16 repræsentative kampe og fem kendte fragmentvarianter.
- Browserkonteksten kunne ikke startes i denne runtime (Playwright spawn EPERM). Scriptet afsluttede kontrolleret, gemte fejlen og ændrede ikke databasen.
- De eksisterende gemte payloads er fortsat den autoritative evidens for gap-auditen. Ruteprøven skal genkøres, når browser-runtime er tilgængelig.

## 2026-09-13 – samlet audit af holdresultat mod individuelle resultater
- `scripts/audit-team-vs-individual-results.mjs` sammenholder holdets registrerede resultat med vinderfelterne fra de importerede individuelle kategorier.
- Seneste kørsel: 2.367 holdkampe sammenlignet; 1.909 eksakte samsvar; 458 afvigelser; 313 kampe har mindst én uafklaret kategori; 121 Golden Sets blev medtaget, når de udfyldte holdresultatets forventede kampantal.
- 39 afvigelser har ordret `Bemærkning`, og 18 af disse er uden uafklarede kategorier. Afvigelserne er audit-signaler: de kan skyldes administrative afgørelser, markeringer, manglende kategorier eller forskellige kampantal. De fortolkes ikke automatisk som parserfejl.
- Rå resultatmarkører (`G`, `F`, `D`, m.fl.) gemmes ordret i `individual_matches.result_marker_raw`; deres betydning er ikke gættet.
- De 8 dokumenterede 0-0-kategorier med markør er fortsat markeret `browser_zero_score` og tælles ikke som almindelige spillede sæt.
- Browser-ruteprøven for repræsentative dækningshuller kunne ikke starte i denne runtime på grund af Playwright `spawn EPERM`; forsøget er gemt uden databaseændringer.

## 2026-09-13 – reproduceret kvalitetstjek før pause
- `check-normalized-db.mjs`, `audit-individual-db.mjs`, `audit-individual-coverage-gaps.mjs`, `audit-team-vs-individual-results.mjs` og `run-data-quality-check.mjs` blev kørt igen mod den aktuelle SQLite-fil.
- Resultaterne er konsistente med den gemte status: ingen foreign-key-fejl eller ID-dubletter; 2.818 holdkampe; 20.319 individuelle rækker; 315 dækningshuller; 458 hold/individ-afvigelser; 47 corona-suspenderede; 6 rækker med manglende resultat/sider.
- Audit-JSON/Markdown-filerne er regenereret med ny kørselstid og gemmes sammen med dokumentationen.

## 2026-09-14 – opgave 012: corona-sæsontælling

- `scripts/analyze-corona-seasons.mjs` sammenholder registrerede holdkampe, `corona_suspended`, de 315 individuelle dækningshuller og de 458 hold/individ-afvigelser pr. sæson uden at ændre SQLite.
- Sæson 2019 (2019/20) har 125 registrerede kampe, 18 corona-suspenderede, ét dækningshul og 18 afvigelser; sæson 2020 (2020/21) har 162, 29, nul og 10.
- Alle 47 allerede markerede corona-suspenderede kampe ligger dermed i de to corona-sæsoner. En lokal, officiel kampplan mangler, så et ukendt antal aldrig-registrerede aflysninger kan ikke kvantificeres.

## 2026-09-14 – opgave 013: 257 payloads uden kategorisektioner

- En sæsonstratificeret stikprøve på 20 af de 257 bruger kun gemte browserpayloads og henter ikke nye kampe.
- Alle 20 renderede kilder viste ingen kategorisektion; prøven indeholder både 148-sættets eksplicitte afbud og kampe med holdresultat uden afbudstekst.
- De 257 behandles som et dokumenteret kildehul i det bevarede materiale. En ny manuel indhentning er ikke påbegyndt og kræver en særskilt opgave.
# 005 — stillingskilde, 2026-09-14

- Nembadminton-discovery indeholder kampe og gruppe-ID'er, ikke dokumenteret
  slutstilling.
- De eksisterende 736 standingsrækker kommer fra BadmintonPlayer `Stilling`
  via browser-snapshots; 96 rækker er GSB.
- Playoff placering afledes af kampresultater, fordi semifinaler/finale/
  bronze ikke udgør en almindelig puljestilling.
- Se `results/005-stillingskilde.md`.

## 2026-09-14 – 006 reklassifikation af tidligere manglende kategori

- De 222 tidligere `manglende kategori`-rækker blev reklassificeret ud fra de allerede gemte kategoriobjekter og rå scorefelter.
- Ny fordeling: `category_present_no_score` 1, `complete_match_all_categories_without_score` 34 og `partial_match_missing_category_result` 187.
- De fire øvrige kategorier er uændrede: administrativ bemærkning/protest 39, Golden Set 12, rå resultatmarkør 90 og reel uoverensstemmelse 95.
- Summen er fortsat 458; databasen blev ikke ændret.
# 006 — afvigelsesklassifikation, 2026-09-14

- 458 afvigelser klassificeret uden databaseændring: 39 administrative,
  12 Golden Set, 222 manglende kategori, 90 rå resultatmarkør og 95 reelle.
- Se `results/006-afvigelse-klassifikation.md` og JSON-evidensen.

## 2026-09-14 – opgave 008: syv historiske, identiske lavscores

- `scripts/analyze-ambiguous-identical-scores.mjs` læser den bevarede Nembadminton-payload, den aktuelle SQLite-fil read-only og de lokale BadmintonPlayer-payloads; den ændrer ikke databasen.
- Den dokumenterer syv unikke kamp/kategori-nøgler: fem `0-0`, én `2-2` og én `3-3`. De fem `0-0` overlapper fem af de otte nuværende `browser_zero_score`-rækker; opgavekortets påstand om ingen overlap matcher ikke den bevarede rådata.
- Alle syv står som uafklarede: rå markører (`G`, `R`, `L`, `D`) bevares og `Vinder W.O.` fortolkes ikke som walkover uden eksplicit `(Ikke fremmødt)`-tekst.
- Efterkontrol viste fortsat 20.319 individuelle rækker og 936 identiske hjemme/ude-scoretekster. SQLite blev ikke ændret.

# 004 — udtræksvej, 2026-09-14

- Baseline: `check-normalized-db.mjs` gav ingen FK-fejl eller dubletter.
- A: Playwright/Chromium startede lokalt; den tidligere EPERM var miljøspecifik.
- B: Kamp 337416 gav kun cookie-/standardskal i frisk Playwright-kontekst og
  fejlede render-gaten (ingen kamp-ID, intet `Resultat`).
- C: Frisk callback gav HTTP 200 for turneringswebservices, men proxyen
  eksponerede ingen holdkampmetode.
- Konklusion: ingen automatiseret masseudtræksvej er valideret; se
  `results/004-udtraeksvej.md`.
## 2026-09-14 – opgave 015: stillingskontrol

- `scripts/check-standing-match-counts.mjs` sammenlignede de 98 gemte GSB-stillingsrækker med holdkampe i samme sæson/pulje i SQLite, uden at åbne databasen til skrivning.
- 24 rækker havde samme kampantal; 74 afveg. Af de 74 ligger 28 i sæson 2019/20 eller 2020/21; corona-status forklarer kun de rækker hvor den rå statusfordeling viser `corona_suspended`.
- Rapporten skelner eksplicit mellem ingen linkede kampe i den aktuelle database og øvrige uforklarede afvigelser. Databasen var urørt.

## 2026-09-14 – opgave 016: audit af spiller-ID-kobling

- `scripts/audit-player-id-coverage.mjs` læste spillerrelationerne read-only og ændrede ikke SQLite.
- 67.196 relationer: 57.270 med eksternt BadmintonPlayer-ID (85,2 %) og 9.926 uden (14,8 %). 7.599 spillere: 5.043 med ID og 2.556 uden.
- Manglende ID'er blev ikke gættet eller koblet i denne opgave; rapporten markerer det som en separat byggeopgave.

## 2026-09-14 – opgave 017: ajourfør valideringsstatus og rækkefølge

- Statusdatoen og de dokumenterede resultater fra opgave 012–016 er samlet i `results/CURRENT_VALIDATION_STATUS.md`.
- `docs/statistik-plan.md` markerer 004, 006/008, 016 og 015 med deres faktiske status; stillingskontrollen står som udført, men ikke bestået (24/98 eksakte).
- `RESEARCH_BACKLOG.md` markerer den gamle stillingskilde-test som afklaret af 005 og bevarer manuel indhentning af de 257 payloads fra 013 som en ikke-besluttet mulighed.
- Ingen databasefelter eller databasefiler blev ændret.

## 2026-09-14 – opgave 018: afklar no-linked standings

- `scripts/audit-no-linked-standings.mjs` prøvede for hver af de 24 rækker først samme pulje, derefter samme sæson + normaliseret holdnavn og til sidst bred sæsonbaseret GSB-søgning.
- Alle 24 havde alternativ kamp-evidens i samme sæson; 24 klassificeres derfor som koblings-fejl i 015's snævre konkurrence-/labelnøgle og 0 som reelt hul. Ingen kobling blev rettet, og SQLite var read-only.

## 2026-09-15 – opgave 019: forsøgt rettelse af matching-nøgle, lukket uden løsning

- Matching-nøglen i `check-standing-match-counts.mjs` blev forsøgt rettet til `season_id + league_group_id + normaliseret holdnavn`, jf. opgavekortets instruks. Genkørsel gav samme resultat som før: Eksakt 24, Afvigende 74, no_linked 24 — ingen ændring.
- Diagnoserapport `results/019-diagnose-raa-navne.md` viser rå, unormaliserede hjemme-/udeholdnavne i `team_matches` for alle 24 "no_linked"-puljer. Mønster: stillingens holdnummer matcher stort set aldrig noget rå holdnavn i samme pulje, hverken før eller efter normalisering.
- To eksempler verificeret manuelt: 2011/pulje 60 (stilling "Gladsaxe Søborg 2" vs. team_matches udelukkende "Gladsaxe Søborg 3", kamp 1717) og 2025/pulje 18733 (stilling "Gladsaxe Søborg 1"/"2" vs. team_matches udelukkende "Gladsaxe Søborg 3", kamp 506441 — et aktivt 2025/26-hold).
- Konklusion: årsagen er ikke en matching-key-bug, men et uafklaret spørgsmål om GSB's holdnummerering er en stabil identitet på tværs af BadmintonPlayers-stillinger og Nembadminton-holdkampe. Ingen databaseændring foretaget. Opgaven lukkes som dokumenteret nej; opfølgning logget i `RESEARCH_BACKLOG.md`.
# 2026-09-15 — Opgave 020: undersøg uforklarede stillingsafvigelser

Read-only gennemgang af alle 31 rækker med `unexplained_from_current_material`
fra 015. 10 havde konkret gemt evidens (9 `browser_verified_no_result` med
rå `-`/`-`, 1 protestbemærkning); 21 forblev uforklarede. Databasen var
urørt. Rapport: `statistik/results/020-unexplained-standings.md`.
# 2026-09-15 — Opgave 021: stoppet efter første CUA-stikprøve

Forsøgte kamp 2286 samt seks yderligere tilgængelige ikke-afbuds-rækker med
den validerede browser/CUA-metode. Alle syv viste standardskallen; 0 godkendt,
0 nye kategorisektioner. Ingen databaseændringer. Rapport:
`statistik/results/021-genindhentning.md`.

## 2026-09-15 – opgave 021: lukket — de 257 forbliver dokumenteret kildehul

- De 7 forsøgte rækker var den FULDE tilgængelige kandidatpopulation — opgave 013 gemte kun konkrete kamp-ID/URL-felter for en stikprøve på 20, ikke for alle 109/257. De øvrige ~102 kan ikke forsøges uden en ny udtrækning fra kilden.
- Alle 7 forsøg gav bekræftet tom kilde-side (bekræftet manuelt af Chris for kamp 2286). Peger på en generel kildebegrænsning hos BD, ikke en GSB- eller metodespecifik fejl.
- Besluttet at lukke opgaven her fremfor at bygge den fulde kandidatliste: manuel CUA-genhentning skalerer ikke til en fremtidig alle-klubber-udvidelse. Se `docs/BESLUTNINGER.md` (2026-09-15) og `RESEARCH_BACKLOG.md`. Opgave 030 (holdnummer-stabilitet) prioriteres i stedet højere, fordi den bliver mere kritisk, ikke mindre, ved skalering.
# 2026-09-15 — Opgave 030: holdnummer-stabilitet

Read-only analyse: 24 no-linked-rækker, 13 numeriske nummerpar og 12
kontrolrækker. No-linked-forskydninger: +1=9, +2=1, -1=1, -2=1, -3=1;
rå nummer matchede 0/13. Kontroludsnittet matchede 7/7. `league_raw` havde
ingen holdnummerfelt. Database og validerede scripts var urørte.
# 2026-09-15 — komplet individuel dækningsoptælling

Read-only SQL: 2.818 team_matches; 2.367 med individuelle rækker og 451
uden. Aritmetisk opdeling med dokumenterede audit-tal: 2.367 + 257 + 58 +
6 + 130 = 2.818. De 130 er en ærligt navngivet rest, fordi 013 ikke gemmer
komplette ID-lister til overlapkontrol. Database urørt. Rapport:
`statistik/results/031-komplet-individuel-daekning.md`.
# 2026-09-15 — kontrol af 130-resten

Read-only SQL bekræftede 100 %: de 130 består af 85
`browser_verified_no_result` plus 45 `corona_suspended` efter ID 387862 og
387864 er undtaget. Ingen øvrige statusgrupper indgår i de 130.
# 2026-09-15 — Opgave 032: spiller-navnematch-risiko

Read-only SQL-stikprøve af 25 højvolumen-spillere uden external_player_id.
0 dubletter på players.name_normalized. Ingen konkret navnekollision påvist;
navnesplittelse mellem forskellige stavemåder kræver ekstern kilde. Rapport:
`statistik/results/032-spiller-navnematch-risiko.md`.
# 2026-09-15 — Opgave 032 runde 2: adfærdsmæssig navnematch-audit

Read-only script `audit-player-name-behavior.mjs` kørte på 25 højvolumen-navne.
7 spillere havde registreringer på to GSB-hold samme dato (22 kampforekomster),
og 25/25 havde mere end ét age_group_id. Fundene er mistænkte kollisioner,
ikke bekræftede uden ekstern kilde. Database urørt.
# 2026-09-15 — Opgave 032 runde 3: række-/kamptypekontrol

De seks resterende samme-dato-fund blev genkørt med league_raw og name_raw.
0/6 lå i samme række/kamptype; alle var forskellige ungdomsrækker. Dermed
er ingen af runde 2's syv fund fortsat kollisionsbevis i gemte data.
# 2026-09-15 — Opgave 033 ungdomsscope

Read-only måling med `scripts/033-ungdom-scope.mjs`: 1.207 ungdomsholdkampe
(age_group_id 2–5), 1.002 med individuelle rækker og 205 uden. De 205 er
162 `browser_verified`, 39 `browser_verified_no_result` og 4 `api_error`.
Spillerrelationer: 17.114 i alt, 8.255 med external ID og 8.859 uden.
Der findes ingen uafhængig, gemt Nembadminton-discovery-total, så manglende
ungdomskampe kan ikke estimeres uden nyt eksternt kald. Databasen var
read-only; senior-dokumentation urørt.
# 2026-09-15 — Opgave 039 overlapkontrol

035's 162 ID'er blev sammenholdt med de bevarede klassifikationsartefakter.
013 har kun 20 gemte stikprøverækker, hvoraf 5 overlapper (2286, 96231,
2365, 2396, 2509); 006's 458-rækkers JSON har 0 overlap. Den fulde 257-ID-
liste er ikke bevaret, så komplet 162-mod-257+58-overlap kan ikke afgøres
uden at gætte. Opgave 039 stoppede derfor før plan-/beslutningsrettelser.

# 2026-09-15 — Opgave 039 frisk aldersfri optælling

Ny SQL uden aldersfilter fandt 451 holdkampe uden individuelle rækker:
205 U09–U15 og 246 øvrige aldersgrupper. De 205 ungdomsrækker består af
035's 162 `browser_verified` plus 39 `browser_verified_no_result` og 4
`api_error`. Dette er den aktuelle datamængde, ikke en rekonstruktion af
013's tabte 257-ID-liste.
# 2026-09-15 — Opgave 040 aldersfordeling

Read-only kontrol: 458 afvigelser fordeler sig på senior 129, U09–U15 155,
U17/U19 16 og veteran 158. 98 stillingsrækker fordeler sig på senior 20,
ungdom 27 og veteran 51. De 21 genuint uforklarede stillingsrækker rummer
6 ungdomsrækker (4 U17, 2 U09). Ingen eksisterende status eller målefil blev
ændret.
# 2026-09-15 — Opgave 041 fuld ungdoms-dubletimport-audit

Read-only audit af 9.691 ungdomsrelationer (`age_group_id` 2,3,4,5,6,18),
inkl. både ID'ede og ID-løse spillere. 0 grupper med samme dato og samme
league_raw/name_raw på flere GSB-hold; dermed (a) 0, (b) 0, (c) 0.

## 2026-09-16 — Opgave 048
Read-only test af udgået/trukket-hypoteser: Hypotese 1 forklarede 5/21, hypotese 2 0/21, 16 fortsat uforklarede.

## 2026-09-17 — Opgave 049
Sammenligning af seks uforklarede standings-rækker mod gemte browserkilder; mismatch-omfang beregnet reproducerbart.
