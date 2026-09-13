# Evidens-audit: API og historisk statistik

Dato: 2026-09-12  
Scope: `gsb-statistik-test` samt de relevante Claude-noter i
`GSB Webapp Zip/files/claude`. Produktionsmappen er ikke læst eller ændret som
led i denne audit. `2026 Post Uni` og Obsidian-materiale er udeladt.

## Metode og klassifikation

- **verified**: underbygget af en gemt rå resultatfil eller en reproducerbar
  test, og påstanden er ikke bredere end evidensen.
- **inference**: en rimelig fortolkning af data, men ikke direkte bevist.
- **unverified**: påstanden kan være sand, men den nødvendige rå observation
  eller reproducerbare test mangler i dette repository.
- **incorrect**: påstanden modsiges af de gemte data eller er formuleret
  bredere end data tillader.

En API-fejl er aldrig evidens for fravær af data. Et `ageGroupId` er aldrig et
aldersgruppenavn uden en konkret række-observation.

## Vigtigste konklusioner

1. Discovery-kæden er solidt dokumenteret for GSB i API-sæsonerne 2010--2025:
   holdposter, gruppeposter og 2.818 deduplikerede kampoversigter er gemt.
2. Det er **ikke** dokumenteret, at 2010/11 er den absolut ældste tilgængelige
   sæson. Den er den ældste, der blev observeret med den testede kæde. 2009 og
   ældre returnerer `Internal server error`, ikke et positivt tomt svar.
3. Kampdetalje-endpointet har dokumenterede fejl, men rapporten må ikke kalde
   dem manglende kampe. De to konkrete BadmintonPlayer-eksempler viser netop,
   at en GraphQL-fejl kan dække over en eksisterende kamp.
4. Browserfallbacken er endnu ikke automatiseret eller reproducérbar i denne
   mappe. Den eksisterende Node-test henter kun den dynamiske sides HTML-skal.
5. Hjemme/ude kan være korrekt for mange rækker, men den nuværende berigelse
   antager uden generel validering at `teams[0]` er hjemmehold, `teams[1]` er
   udehold og `teams[2]` er arrangør.

## Audit af test-repository

| Status | Påstand | Evidens / begrænsning | Retning for rettelse |
|---|---|---|---|
| verified | `badmintonPlayerTeams` -> `badmintonPlayerTeamFights` giver GSB discovery-data. | `results/gsb-historical-2025-2000.jsonl` indeholder hold, grupper og kampe pr. sæson; fx 2010 på linje 16. `API_RESEARCH.md:13-16` beskriver de testede kald. | Bevar formuleringen, men referér altid til den konkrete kørsel og dens dato. |
| verified | Den historiske kørsel indeholder 16 sæsoner med hold, 462 grupper og 2.818 unikke kampe. | `results/historical-test-summary.json` (`gsb.seasonsWithTeams`, `totalGroups`, `totalUniqueMatches`). | Skriv "i kørsel 2026-09-12" ved tal, fordi API-data kan ændre sig. |
| incorrect | "2010/11 er den ældste sæson tilgængelig, punktum". | `gsb-historical-2025-2000.jsonl:17-26` har `status: error` med `Internal server error` for 2009--2000. Det er ikke et tomt datasvar. | Erstat med: "2010/11 er den ældste sæson observeret via den testede GraphQL-discovery-kæde; ældre sæsoner kunne ikke afgøres, da kaldet fejlede." |
| verified | 1.374 af 2.818 detaljeopslag var `ok`, og 1.444 var `error` i fuldkørslen. | `results/gsb-match-detail-errors-summary.json` har `total:2818`, `ok:1374`, `errors:1444`. | Kald statusen "GraphQL-detaljeopslag lykkedes/fejlede", ikke "komplet/ufuldstændig kamp". |
| verified | De to observerede GraphQL-fejltekster var 1.085 `Internal server error` og 359 `Could not find any players on match`. | `results/gsb-error-analysis-stratified.json:116-124`. | Bevar som et resultat af netop denne kørsel. Gem fremover rå GraphQL `errors` sammen med hvert forsøg. |
| inference | Høje fejlprocenter i 2010/11 skyldes ældre scraper-/datamodelproblemer. | `results/gsb-error-analysis.md:3-5` har kun en fordeling; den viser ingen årsag. | Skriv "mønster foreneligt med historiske eller endpoint-specifikke problemer; årsag ukendt". |
| inference | Fejlene er gruppebaserede snarere end modstanderbaserede. | En gruppeanalyse eksisterer, men ingen kontrolleret sammenligning eller årsagsprøve dokumenterer mekanismen. | Behandl det som prioriteringshypotese for fallback, ikke som forklaring. |
| inference | `teams[0]` = hjemmehold, `teams[1]` = udehold, `teams[2]` = arrangør for alle kampe. | `enrich-errors-with-teams.mjs` gør præcis denne positionsantagelse uden at validere den. Kamp 487423 passer med brugerens skærmbillede, men det er kun et konkret eksempel. | Omdøb felterne til `teamsRaw[0..2]` indtil en stikprøve på tværs af sæsoner, aldersgrupper og hjemme/ude bekræfter mappingen. Gem derefter `homeAwayConfidence`. |
| verified (begrænset) | 1.440 af 1.444 fejlposter fik en afledt modstander; fire kunne ikke matches. | `enrich-errors-with-teams.mjs` skriver disse felter, og `results/gsb-match-errors-with-opponents.json` har 1.444 poster. | Kald `opponent` afledt, ikke kildens oprindelige felt, indtil positionsmappingen er valideret. |
| verified (kun konkrete eksempler) | Kamp 486396 er en SEN40+-walkover med resultat 12-0; 487423 er SEN60+ med resultat 8-0 og individuelle resultater. | Begge er dokumenteret af de brugerleverede BadmintonPlayer-skærmbilleder i denne chat. Fejlrapporten bekræfter matchId, deltagende hold og GraphQL-fejl. | Gem et struktureret browserudtræk eller en kildehenvisning pr. verificeret kamp. Ingen generalisering fra to kampe. |
| unverified | Browserfallbacken kan automatisk hente vinder, resultat, point, walkover, spillere og sæt for fejlede kampe. | `run-direct-badmintonplayer-test.mjs` bruger almindelig `fetch` og registrerer kun HTTP-status, HTML-længde og titel. Den udfører ikke JavaScript og parser ingen kampdata. | Byg først en browserautomatiseret extractor, gem output + URL + tidspunkt + parser-version, og test mindst de to referencekampe. |
| inference | BadmintonPlayers `Stilling` er en autoritativ slutstilling. | `API_RESEARCH.md:172-174` er uden gemt stillingstabel eller test efter sæsonafslutning. En stilling kan være foreløbig. | Gem "current standings" med hentetid. Markér kun `final` når sæson/pulje er verificeret afsluttet eller siden eksplicit angiver slutstilling. |
| inference | `leagueGroupId` er den konkrete pulje/gruppe. | De gemte data viser tydeligt flere grupper pr. hold/sæson, men nogle er kvalifikation, slutspil eller oversidder-runder; de er ikke alle almindelige puljer. | Brug det neutrale navn `competitionStageGroupId` eller dokumentér `groupType` særskilt. |
| incorrect | Det nuværende label-katalog er en sikker mapping af `ageGroupId` til aldersgruppe. | `agegroup-labels.json` har brede labels såsom `9: VETERAN A / SEN40+` og `18: U17/U19 ungdom`; de skjuler variation og er ikke knyttet til konkrete observationer. ID 7, 10, 14 og 15 mangler helt. | Erstat med et evidenskatalog med `ageGroupId`, `observedRawLeague`, `observedSeason`, `label`, `evidenceStatus`. Brug `unknown` som standard, ikke en gættet global label. |
| verified (observation) | I 2025/26 forekommer ID 2 sammen med U09-rækker, 3 med U11, 4 med U13, 5 med U15 og 6 med U17 i GSB-data. | Rå `league`-tekst i `gsb-historical-2025-2000.jsonl:1`; aggregeret i `gsb-error-analysis-stratified.json:70-114`. | Formulér "observeret sammen med" i stedet for "betyder". Udvid verificeringen på tværs af sæsoner før normalisering. |
| unverified | Alle relevante datapunkter er nu med. | Discovery-data mangler kildens resultat, holdpoint, walkovermarkering og sikre hjemme/ude-felter for fejlramte detaljer. | Hold en dataordbog med felt, kilde, dækningsgrad, status og fallback. |

## Audit af relevante Claude-noter

| Status | Påstand | Kilde / begrænsning | Retning for rettelse |
|---|---|---|---|
| verified (begrænset) | 2024/25-rekonstruktionen fandt GSB 1--3 via discovery-kæden og sammenlignede 30 holdkampe. | `GSB Webapp Zip/files/claude/gsb-statistik-idebank.md:254-265` indeholder metode og tællinger. Den tilhørende rå CSV og API-svar ligger ikke i audit-scope, så eksakt kampindhold er ikke reproduceret her. | Link fra noten til rå CSV, inputliste, script og output-hash. |
| inference | Kæden "beviste" at alle klubbens holdkampe, inkl. U9--U19, kan auto-importeres fuldt. | Claude-noten `:225-229` blander discovery (som er dokumenteret) og fuld kampdetaljeimport (som den nye kørsel viser fejler for 1.444/2.818). | Del påstanden: "kan opdage kampoversigter" vs. "kan hente fulde detaljer". Sidstnævnte kræver fallback. |
| unverified i dette repository | `Ikke fremmødt` identificerer walkover-vinderen ved at vælge den modsatte side. | Claude-noten `:288-297` beskriver observationen, men rå API-posten og rekonstrueret CSV findes ikke her. | Bevar som dokumenteret tidligere observation, men tilføj matchId, rå payload-udsnit og testcases før det bliver produktionsregel. |
| inference | To tomme-sæt-kampe er en reel mangel i Nembadmintons datagrundlag. | Claude-noten `:294-297` konkluderer årsag ud fra fravær af data. | Ret til "kan ikke afgøres af den tilgængelige payload". |
| unverified / out of scope | Den eksisterende production-import vil altid give `Vinder: '?'` ved nye walkovers, og eksisterende Sheets-rækker er manuelt rettet. | Claude-noten `:300-314` refererer til production-kode og Sheets-historik, som ikke er rereviewet i denne audit. | Gennemgå separat mod den aktuelle production-version, når brugeren beder om det. |

## Prioriterede rettelser før yderligere statistik

1. Ret sprog og metadata: `observed`, `derived`, `unknown` og `verified` skal
   være separate felter. Fjern formuleringer som "ældste tilgængelige" og
   "autoritative slutstillinger" indtil de kan bevises.
2. Bevar rå `teams` som array og stop med at præsentere hjemme/ude/arrangør som
   kildefakta, før positionsmappingen er valideret på et stratificeret udsnit.
3. Erstat det globale aldersgruppe-kort med et evidenskatalog. Manglende ID'er
   skal eksplicit have status `unknown`; de må ikke udledes fra rækkenavne i
   andre sæsoner uden observation.
4. Byg og test en rigtig browserextractor før den kaldes fallback. Den skal
   kunne gemme en normaliseret kamp og en reproducerbar kildepost for 486396 og
   487423.
5. Tilføj en datakomplethedsrapport pr. felt og sæson, før der laves officielle
   klub- eller spillerstatistikker.

## Reviewgate

Før en statistik offentliggøres, skal en reviewer godkende: rå kilde, parser-
version, afledte felter, dækningsgrad og mindst ét manuelt stikprøveopslag pr.
sæson/aldersgruppe/rækketype, der indgår i statistikken.
# Genoptagelsesnote

Reviewerens hovedkonklusioner: 2010/11 er observeret cutoff, ikke absolut bevis; `teams`-arrayposition er ikke stabil; alderslabels skal være kildebaserede; browserfallback er endnu ikke masseautomatiseret; 1.444/2.818 detaljekald fejlede. Brug auditten som review-gate før officiel statistik eller databaseimport.
