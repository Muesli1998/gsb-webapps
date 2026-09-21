# Opgave 081 — katalog over ALLE ligaer/turneringer i Nembadminton, 2010-2026 (ikke kun GSB)

> **STATUS VED PAUSE (2026-09-20, sen aften) — læs dette først ved genoptagelse.**
> Opgaven er sat på pause af Christoffer for i aften, ikke afsluttet. Alt er committet og pushet
> (seneste commit `fab86375d541d82c2074478e084e37ae019dbd83` på `arbejde/081-statistik-alle-ligaer-landskab-katalog`).
>
> **Hvor vi er:** Den dyre klub-iterationsrute (~96.000+ kald) er IKKE valgt. I stedet er en langt
> billigere rute fundet og bekræftet: `WebService1.asmx`-metoden `GetLeagueStanding` giver BÅDE
> puljenavne OG hold-ID'er direkte for en (sæson, aldersgruppe, region)-kombination, uden
> klub-filter. Der findes ingen anden webservice end `WebService1.asmx` (43 eksponerede metoder,
> undersøgt via `/WebService1.asmx/js`). `SearchTournamentClass` og `GetSeasonPlan` fejler (HTTP
> 500) og er ikke brugbare ruter.
>
> **Kendt parameter-mapping indtil videre** (hash-format
> `#<subPage>,<seasonID>,,<ageGroupID>,<regionID>,,,,` på
> `badmintonplayer.dk/DBF/HoldTurnering/Stilling/`):
> - `regionID`: 1=national, 4=Midtjylland, 8=København, 10=Sjælland — resten ukendt.
> - `ageGroupID`: 1=Senior, 3=U11, 9=Sen40+, 21=Ungdom — resten ukendt.
> - Disse er IKKE fuldt kortlagt endnu — det er næste skridt.
>
> **Stadig åbent, ikke afklaret:**
> 1. Den fulde liste af gyldige `regionID`- og `ageGroupID`-værdier mangler stadig.
> 2. Midtjylland-senior-"snyderiet" (flere vestkredse viste angiveligt identiske puljer for
>    `ageGroupID=1`) er IKKE forklaret eller bekræftet — det er ikke samme fænomen som
>    vest-ungdom-sagen (den er afklaret: 2026/27-ungdomspuljer i vest er bare ikke sat op endnu).
> 3. Intet konkret kald-estimat for det fulde 2010-2026-udtræk med `GetLeagueStanding`-ruten er
>    lavet endnu — det bliver sandsynligvis lavt (region × aldersgruppe × sæson, ingen
>    klub-iteration), men skal beregnes, ikke antages.
> 4. Intet er gemt permanent endnu — det nye, separate datasæt (uden for
>    `gsb-statistik-normalized.db`) er ikke oprettet.
>
> **Næste skridt ved genoptagelse (ikke startet endnu):** kortlæg det fulde parameter-rum, afklar
> Midtjylland-mysteriet, giv et konkret kald-estimat, og få Christoffers godkendelse, før den fulde
> historiske indsamling og permanent lagring sættes i gang.

**Trin:** Udvidelse af opgave 077 (liga-katalog), på Christoffers eksplicitte ønske efter at have set
077's resultat — se `statistik/results/077-liga-regelsaet-katalog.md`.

**Gren:** `arbejde/081-statistik-alle-ligaer-landskab-katalog`, jf. `AGENTS.md`.

**Baggrund:** Opgave 077 kortlagde kun de ligaer GSB selv har spillet i, fordi discovery-kæden i
`statistik/CODEX_EXTRACTION_SKILL.md` §1 er bygget klub-scoped (`clubId=1093`,
`badmintonPlayerTeams` → `badmintonPlayerTeamFights` → `badmintonPlayerTeamMatch`). Christoffer vil
nu have et bredere billede: alle ligaer/turneringer for alle sæsoner 2010-2026, uanset om GSB har
spillet i dem, for at kunne se landskabet af kreds-ligaer (distrikts-niveau) og nationale ligaer og
dermed bedre vurdere hvor GSB's egne hold ligger niveaumæssigt.

**Vigtigt:** dette er sandsynligvis IKKE bare "kør 077's metode uden klub-filter" — discovery-kæden er
bygget til at starte fra en klubs spillere/hold, ikke til at liste alle competitions i systemet.
Der findes muligvis allerede relevante undersøgelser af dette i `statistik/results/`:
`club-scan-2025.csv`, `club-scan-2025-summary.json`, `tournament-query-surface.json`,
`tournament-options-2025.json`, `tournament-clientcalls.txt`. Læs disse FØRST — de kan enten løse
problemet direkte eller vise hvorfor det ikke er ligetil.

## Mål

Todelt: først afklaring, så udtræk. Byg IKKE i stor skala før trin 1 er afklaret.

1. **Afklar ruten.** Undersøg om der findes en dokumenteret eller findbar GraphQL-forespørgsel (eller
   anden endpoint) i Nembadminton-API'et der lister alle competitions/turneringer for en given sæson
   uden at kræve et `clubId`-filter — evt. et kreds-/distrikts-niveau og et nationalt niveau hver for
   sig. Genbrug det der allerede er fundet i de nævnte `statistik/results/`-filer og i
   `CODEX_EXTRACTION_SKILL.md` før noget nyt probes. Hvis ingen sådan rute findes, og eneste
   mulighed er at iterere gennem alle kendte klub-ID'er (dyrt, langsomt, mange API-kald): STOP og
   rapportér under "Spørgsmål" i stedet for at sætte det i gang — det er en beslutning Christoffer
   skal tage, ikke noget der skal gættes sig frem til.
2. **Byg kataloget — kun hvis trin 1 finder en brugbar rute.** Samme struktur som 077's katalog, men
   uden GSB-filter: alle ligaer/turneringer pr. sæson 2010-2026, med navn (rå tekst), aldersgruppe
   hvis den kan udledes, kreds/distrikt hvis det kan udledes af kilden, og niveau-indikation KUN hvor
   det direkte kan læses af kildeteksten (samme regel som 077 — "niveau uafklaret ud fra kildetekst
   alene" er en gyldig værdi, gæt aldrig en rangordning). Marker eksplicit hvilke af disse ligaer GSB
   selv har hold i (krydsreference til 077's katalog), så det ene dokument kan bruges til at se GSB's
   hold i kontekst af det fulde landskab.
3. Noter at "KS" i rå liga-tekster betyder "Københavnsserien" (bekræftet af Christoffer) — dette er en
   navneforklaring, ikke en niveau-afgørelse; brug det til at gøre kataloget mere læsbart hvor
   forkortelsen forekommer, men det ændrer ikke om noget er "uafklaret" niveaumæssigt.

## Kontekst

Se `statistik/CODEX_EXTRACTION_SKILL.md` (særligt §1 og §9), `work/loeste/077-statistik-liga-regelsaet-katalog.md`
og dens resultatnote, og de eksisterende probe-filer nævnt ovenfor. GSB's `clubId` er 1093, men denne
opgave handler netop om at komme UDENFOR det scope.

## Afgrænsning

**Må røres:** nyt katalogdokument (`statistik/results/081-alle-ligaer-landskab-katalog.md` + evt.
`.json`), nye scripts under `statistik/` hvis nødvendige for probes/udtræk, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`, `docs/historik/`.

## Kontrol

**Målet:**
```
Trin 1's konklusion er eksplicit dokumenteret: enten "fundet rute: <beskrivelse + evidens>" eller
  "ingen brugbar rute fundet uden dyr iteration — se Spørgsmål".
Hvis trin 2 udføres: kataloget dækker eksplicit angivne sæsoner/kredse — list dækning og huller.
Hver liga-entry har kilde (URL/tidspunkt) og ingen har fået et gættet niveau.
Antal ligaer der er fundet men IKKE er i 077's GSB-katalog er talt op og rapporteret — det er selve
  pointen med opgaven (at se det bredere landskab).
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/ apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
```

**Skøn:** ingen på niveau-vurderinger. Skøn er tilladt på HVORDAN ruten i trin 1 findes (hvilke
probes der afprøves), men ikke på OM den findes — det skal være dokumenteret, ikke antaget.

## Ved tvivl

Kræver en fungerende rute at iterere gennem et stort antal ukendte klub-ID'er eller på anden måde
sende et stort antal API-kald (fx flere hundrede+): stop og rapportér omfanget under "Spørgsmål" —
lad Christoffer beslutte om det er værd at køre, i stedet for selv at vurdere det. Er det uklart om
en liga hører til en kreds/distrikt eller er national: marker "kreds/national uafklaret" i stedet for
at gætte.

### Spørgsmål


**Christoffers svar (2026-09-20):** Kør den dyre iteration, men gør det smartere og gem resultatet
permanent, så vi ikke skal hente det igen:

1. Da hver holdkamp involverer 2 hold og en pulje typisk ~8 hold, kan et opslag på ét kendt klub-ID
   sandsynligvis afsløre modstander-hold/-klub-ID'er i samme pulje "gratis". Før den fulde iteration
   sættes i gang: **bekræft med et lille antal testkald** om `badmintonPlayerTeamFights`/
   `badmintonPlayerTeamMatch`-svarene rent faktisk indeholder modstanderens klub-/hold-ID (ikke kun
   navn). Hvis ja: byg en graf-baseret ("smitte") traversal der starter fra alle allerede kendte
   klub-ID'er (GSB + de 1.159 fra `club-scan-2025.csv`) og opdager nye klub-ID'er via modstandere, i
   stedet for blindt at iterere alle mulige klub-ID'er for alle 16 sæsoner.
2. Rapportér et konkret estimeret antal API-kald for den fulde 2010-2026-kørsel MED denne genvej,
   sammenlignet med uden, FØR den fulde kørsel sættes i gang — skriv estimatet under et nyt
   "Spørgsmål"-svar og vent på godkendelse, hvis det stadig er i tusinde-kald-størrelsen.
3. Graf-traversal fra kendte klubber dækker ikke nødvendigvis alle klubber i landet (isolerede
   kredse/klubber GSB og de kendte klubber aldrig møder). Rapportér et estimat af hvor stor
   restdækning (klubber ikke fundet via traversal) forventes at være, og lad Christoffer beslutte om
   restdækningen skal findes via blind iteration eller accepteres som et hul.
4. Gem RESULTATET permanent i et NYT, separat datasæt under `statistik/` (fx
   `statistik/data/liga-landskab.db` eller en JSON/CSV-samling under `statistik/results/`) — IKKE i
   `statistik/data/gsb-statistik-normalized.db`, som er forbeholdt de faktiske GSB-kampdata. Formålet
   er at kunne genindlæse hele landskabet uden nye API-kald i fremtiden.

Oprindeligt spørgsmål (nu besvaret ovenfor):

Trin 1 er afklaret, men trin 2 er ikke startet: Der er ikke fundet en
brugbar, dokumenteret rute til at liste alle ligaer/turneringer pr. sæson
uden klubfilter.

Nembadminton GraphQLs eksisterende evidens viser kun `tournamentGroups` og
`tournamentTiers` som turneringsrelaterede felter. `tournamentGroups`-svaret
for 2025 er tomt; `tournamentTiers` returnerer 17 generelle tier-navne.

BadmintonPlayer-sporet er også gennemgået i den eksisterende evidens:
`GetTournamentEvents` er verificeret for den allerede kendte
`tournamentclassid=115342` og returnerer fem events; `SearchTournamentMatches`
er verificeret for den allerede kendte event `490920`. De er derfor opslag
fra et kendt turnerings-ID, ikke en sæsonliste. WebService-proxyen nævner
`SearchTournamentClass`, men der ligger ingen gemt, succesfuld kørsel,
parameterbeskrivelse eller sæson-enumeration for det kald, så det kan ikke
bruges som bevist rute uden at gætte.

Den eneste dokumenterede fallback er at iterere klubscoped
`badmintonPlayerTeams`. Den eksisterende 2025-scanning indeholder 1.159
klub-ID'er og 4.838 holdrækker (1.157 succesfulde klubkald og 2 fejl). En
fuld 2010–2026-scanning vil derfor kræve mindst mange hundrede og i praksis
flere tusinde API-kald, før overlap og sæsoner er dækket. Det er netop den
dyre iteration, som kortet siger skal godkendes særskilt.

**Beslutning kræves:** Skal jeg sætte den dyre klub-ID-/sæson-iteration i
gang, eller skal opgave 081 afsluttes som "ingen brugbar rute uden dyr
iteration"?

**Trin 1-testresultat (2026-09-20):** Graf-genvejen virker ikke på de
afprøvede svar. To `badmintonPlayerTeamFights`-kald (2010/pulje 417 og
2025/pulje 17963) returnerede `teams` som navnestrenge; ingen klub-/hold-ID.
Tre `badmintonPlayerTeamMatch`-kald blev prøvet; det ene succesfulde svar
(2020/kamp 388606) havde kun `home.name` og `guest.name`, mens to returnerede
`Internal server error`. Schema-introspection bekræfter:

- `BadmintonPlayerTeamFight`: `teams`, `matchId`, `gameTime`, `round`,
  `roundDate`.
- `ImportTeamMatch`: `home`, `guest`, `playingPlace`, `playingAddress`,
  `playingZipCode`, `playingCity`.
- `ImportTeam`: `name`, `leagueMatchId`, `side`, `squad`.
- `BadmintonPlayerTeam` har `clubId`, men kun i det allerede klubscopede
  `badmintonPlayerTeams`-svar; det giver ikke et ID for modstanderen.

Derfor er der ingen verificeret graf-traversal. Uden genvejen er det konkrete
2025-baserede overslag for 16 sæsoner mindst `1.159 × 16 = 18.544`
`badmintonPlayerTeams`-kald plus `4.838 × 16 = 77.408`
`badmintonPlayerTeamFights`-kald, altså `95.952` kald **før** ét
`badmintonPlayerTeamMatch`-kald pr. unik kamp. Det faktiske match-detailtal
kan ikke estimeres ærligt fra de eksisterende 2025-klubscan-tal alene.

Grafens forventede restdækning kan heller ikke beregnes meningsfuldt: uden
modstander-ID’er opdager traversal 0 nye klubber, mens eventuelle isolerede
klubber uden for de 1.159 seeds er ukendte. Den fulde blinde iteration er
derfor stoppet og kræver en ny beslutning.

**Christoffers nye spor (2026-09-20):** Før den dyre blinde iteration
godkendes, skal to yderligere ruter afprøves — ingen af dem er faktisk
afprøvet endnu, kun konstateret som "ikke bevist" eller ikke undersøgt:

1. **`SearchTournamentClass`** i webservice-proxyen er set i schemaet, men
   aldrig faktisk kaldt med reelle parametre. Afprøv det med et par kendte
   sæson-/kreds-værdier og se om det returnerer en liste af turneringsklasser
   uden klubfilter. "Ikke bevist" er ikke det samme som "afprøvet og fejlet".
2. **Den offentlige hjemmeside.** Christoffer har fundet at
   `https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/#1,2026,,1,1,,,,`
   viser ALLE Badminton Danmarks seniorrækker for sæson 26/27, og
   `#1,2026,,1,8,,,,` viser Badminton Københavns seniorrækker — dvs. et
   hash-parameter-baseret filter på (mindst) sæson og kreds/union, uden at
   kræve et klub-ID. Siden er sandsynligvis en klient-side app der henter sit
   indhold via et bagvedliggende API-kald. Undersøg det ved at åbne siden i en
   browser og læse netværkstrafikken (fx med Playwright eller
   read_network_requests) for at finde det faktiske endpoint, parameterrækken
   (positionerne i hash'en — hvad er `1`, `2026`, tomt, `1`, `1`/`8` osv.?) og
   om svaret giver en fuld liste af puljer/rækker for en sæson/kreds uden
   klub-iteration. Hvis dette virker, er det sandsynligvis langt billigere end
   både graf-genvejen og den blinde iteration.

Rapportér resultatet af begge spor under et nyt "Spørgsmål"-svar, med
konkret evidens (URL, kald, svar), før noget besluttes om den dyre iteration.

**Svar på Christoffers nye spor (2026-09-20):** Begge ruter er nu faktisk
afprøvet. `SearchTournamentClass` blev kaldt via
`POST https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/SearchTournamentClass`
med frisk `SR_CallbackContext` fra
`https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/#1,2026,,1,1,,,,`.
Proxy-signaturen er verificeret som
`(callbackcontextkey, selectfunction, seasonid, agegroupid, classid, clubid,
fromdatestring, todatestring, selectopenonly, regionids, adminclubid)`.
Tre kombinationer blev prøvet: 2026/region 1, 2026/region 8 og 2025/region
1, med `agegroupid=1`, `classid=0`, `clubid=0`, tomme datofiltre,
`selectopenonly=false` og `selectfunction=SelectTournamentClass`. Alle tre
returnerede HTTP 500 med JSON-beskeden `There was an error processing the
request.` — ingen turneringsliste. Det er derfor en afprøvet, men ikke
brugbar rute med disse dokumenterede parametre; callback-tokenet er ikke
gemt i evidensfilen.

Hjemmesideruten virker. Sidens inline JavaScript kalder
`GetLeagueStanding` på samme WebService1-endpoint med hash-positionerne:
`subPage, seasonID, leagueGroupID, ageGroupID, regionID,
leagueGroupTeamID, leagueMatchID, clubID, playerID`. Friske POST-kald med
`subPage=1`, `ageGroupID=1` og alle øvrige ikke-relevante ID'er `null`
returnerede HTTP 200 og HTML-lister uden klubfilter:

- URL-hash `#1,2026,,1,1,,,,`: `BADDAN SEN 2026/2027`, 27 pulje-/gruppe-links
  under 7 overskrifter.
- URL-hash `#1,2026,,1,8,,,,`: `BADKBH SEN 2026/2027`, 13 pulje-/gruppe-links
  under 8 overskrifter.
- URL-hash `#1,2025,,1,1,,,,`: `BADDAN SEN 2025/2026`, 56 pulje-/gruppe-links
  under 14 overskrifter.

Eksempel på faktisk svar fra region 8 er `BADKBH SEN 2026/2027` med
`Københavnsserien`, `1. Serie`, `2. Serie`, `3. Serie`, `31. Serie`,
`32. Serie` og `33. Serie`; svarenes links indeholder de næste
`leagueGroupID`-værdier, fx `18894` og `18895`. Den brugbare rute er derfor
fundet: hent `GetLeagueStanding` pr. sæson, aldersgruppe og region, parse
HTML-svaret for liga-/puljenavne og `leagueGroupID`, og følg derefter de
konkrete gruppe-ID'er. Den fulde 2010–2026-indsamling er ikke startet endnu;
resultatet og eventuelle huller afventer separat planlægning af sæson- og
regiondækningen.

## Resultatnote

**Trin 1 — afklaring (færdig; trin 2 ikke startet):** Ingen brugbar,
dokumenteret klub-uafhængig sæsonliste blev fundet i den eksisterende
evidens. Konklusionen gælder både Nembadminton GraphQL og BadmintonPlayer.

- Nembadminton: `tournament-query-surface.json` viser kun
  `tournamentGroups(seasonId, phaseType, order)` og
  `tournamentTiers(order)` som relevante generelle felter.
  `tournament-options-2025.json` har `tournamentGroups: []` og 17
  `tournamentTiers`; tier-listen indeholder bl.a. `Københavnsserien`.
- BadmintonPlayer: `GetTournamentEvents` er succesfuldt dokumenteret for
  kendt `tournamentclassid=115342` med events `490920`–`490924`.
  `SearchTournamentMatches` er succesfuldt dokumenteret for kendt event
  `490920`. Ingen af de gemte kald enumererer turneringsklasser pr. sæson.
  `SearchTournamentClass` forekommer i den hentede WebService-proxy, men
  uden gemt succesfuldt kald eller verificeret input/uddata for en sådan
  enumeration.
- Dyr fallback: `club-scan-2025.csv` har 1.159 klub-ID'er, 1.157 succeser,
  2 fejl og 4.838 teamrækker. Det er kun sæson 2025; fuld historisk dækning
  ville kræve yderligere klub-/sæsoniteration.

Der er derfor ikke bygget katalog eller kørt fuld iteration. Trin 2 afventer
Christoffers beslutning i afsnittet **Spørgsmål**.

Read-only databasekontrol: SHA-256 før og efter var identisk,
`E6C5046A4B93A8518254BADF5D8F4529FB0B918AE4A31AF63919B5F70D620062`.
Beskyttede mapper `statistik/data/`, `apps/netlify-prod/`, `kampsystem/` og
`klubstatistik-preview/` havde ingen git-ændringer.

Efter den nye probe er konklusionen opdateret: Trin 1–3 er udført, men trin 4
er ikke startet. Den fulde iteration og det permanente landskabsdatasæt
afventer beslutning om mindst 95.952 kald plus et ukendt antal
kampdetailkald. Rå probeevidens ligger i
`statistik/results/081-opponent-identity-probe.json`, og den reproducerbare
probe i `statistik/scripts/081-opponent-identity-probe.mjs`.

WebService1/WSDL-undersøgelsen er nu også udført: WSDL gav HTTP 500, mens
JS-proxyen dokumenterede 43 metoder. `GetLeagueStanding` på et konkret
`leagueGroupID` returnerede 8 hold med hold-ID'er, og fire undersøgte sider
refererede kun til WebService1.asmx. Rå evidens ligger i
`statistik/results/081-webservice-catalog-probe.json`; fuld indsamling er
stadig ikke startet.

**Christoffers yderligere mapping (2026-09-20), fundet manuelt på**
`https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/#<subPage>,<seasonID>,,<ageGroupID>,<regionID>,,,,`:

| ageGroupID | regionID | Bekræftet indhold |
|---:|---:|---|
| 1 | 1 | Nationalt Senior |
| 1 | 4 | Midtjylland Senior — **NB: "snyder"**, andre vest-kredse gav samme puljer |
| 1 | 8 | København Senior |
| 3 | 8 | København U11 |
| 9 | 8 | København Sen+40 |
| 21 | 8 | København Ungdom |
| 21 | 10 | Sjælland Ungdom |

**Afklaret af Christoffer (2026-09-20):** "vest-ungdom er tom"-anomalien er IKKE en kode- eller
fallback-fejl. `#1,2025,,21,4,,,,` (Badminton Midtjylland Ungdom, sæson 2025/2026) viser faktiske
puljer — de findes for tidligere, afsluttede sæsoner. Grunden til at `#1,2026,,21,4,,,,` var tom er
at 2026/2027-ungdomspuljerne i Midtjylland (og sandsynligvis andre vestkredse) endnu ikke er sat op
på tidspunktet for denne undersøgelse — et sæson-tilblivelses-tidspunkt, ikke et datastrukturproblem.
**Konsekvens for opgaven:** når hele 2010-2026-perioden skal indsamles, er alle disse sæsoner
allerede afsluttede, så dette problem burde ikke opstå i praksis — men Codex skal stadig holde øje
med og rapportere hvis en (region, aldersgruppe, sæson)-kombination er reelt tom for en HISTORISK,
afsluttet sæson, fordi det ville være en ægte datamangel, ikke bare "ikke sat op endnu".

**Stadig uafklaret, skal undersøges — IKKE gættes:** Midtjylland-"snyderiet" for SENIOR
(`ageGroupID=1`) er ikke forklaret af sæson-tidspunktet (senior-sæson 26/27 er jo sat op og har data).
Flere vest-kredse gav angiveligt identiske puljer for senior. Bekræft ved at sammenligne den RÅ
respons (ikke kun den viste side) for mindst 3 forskellige vest-`regionID`'er med samme `ageGroupID=1`
— er de byte-for-byte identiske, er det en ægte fallback/deling af puljer (fx fordi Vestdanmark er
organiseret som én samlet kreds for senior, i modsætning til Øst der er delt op), ikke en fejl i
undersøgelsen. Afklar hvilken af de to det er.

**Ny undersøgelse ønsket (Christoffer, 2026-09-20):** ASMX-webservices eksponerer typisk deres fulde
metodeliste via `<endpoint>?WSDL` eller `?op=<MetodeNavn>` for enkelt-metode-beskrivelser. Hent
`WebService1.asmx?WSDL` (og evt. tilsvarende for andre allerede kendte ASMX-endpoints i
`CODEX_EXTRACTION_SKILL.md`/tidligere probes) og list ALLE tilgængelige metoder — ikke kun
`GetLeagueStanding` og `SearchTournamentClass` som allerede er kendt. Undersøg om nogen af de øvrige
metoder kan give os noget af det vi mangler billigere end nuværende plan, fx: en direkte
klub-/holdliste pr. pulje (i stedet for at parse HTML), en sæson-/regionliste (så vi ikke skal gætte
`regionID`/`ageGroupID`-rummet ved brute force), eller andet der reducerer antal kald. Rapportér hele
metodelisten og hvilke der er relevante, med begrundelse — gæt ikke hvad en metode gør ud fra dens
navn alene, afprøv den med et testkald og se det faktiske svar.

**Findes der flere webservices end `WebService1.asmx`?** Ukendt — "WebService1.asmx" er
standardnavnet Visual Studio giver en ny ASMX-service, hvis den ikke omdøbes, så det kan tyde på at
det er den eneste, men det skal IKKE antages. Undersøg: gennemgå den allerede indfangede
netværkstrafik/JS fra badmintonplayer.dk (fra denne opgaves egne probes og evt. tidligere
probe-filer i `statistik/results/`) for referencer til andre `.asmx`-filer eller andre webservice-
endpoints, og rapportér hvad der faktisk findes — ikke kun `WebService1.asmx`.

Yderligere åbne spørgsmål der skal afklares med evidens, ikke antagelse:
- Hvad er den fulde liste af gyldige `regionID`-værdier (kredse) og deres navne? Kendte indtil nu:
  1=national, 4=Midtjylland, 8=København, 10=Sjælland.
- Hvad er den fulde liste af gyldige `ageGroupID`-værdier og deres navne? Kendte indtil nu:
  1=Senior, 3=U11, 9=Sen40+, 21=Ungdom(samlet?).
- Giver `GetLeagueStanding`, når man følger et konkret `leagueGroupID` (fx `18894`/`18895` fra
  eksemplet), en liste af HOLD i puljen (klubnavne) — eller kun puljenavnet? Det er afgørende for om
  denne rute reelt kan erstatte klub-iterationen. Bekræft med et faktisk kald og vis svaret.

**Svar: fuld WebService1-metodeliste og endpoint-prober (2026-09-20):**
`https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx?WSDL`
blev hentet direkte og returnerede HTTP 500, `Content-Type: text/html`,
1208 bytes og en generisk `500 - Internal server error`-side. WSDL kunne
derfor ikke bruges som metodeliste. Den tilhørende offentlige klientproxy
`https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/js`
returnerede HTTP 200 og 49.586 bytes. Den indeholder 43 offentlige metoder
(`_get_path` er ikke medregnet):

```text
CheckLicense, AddLicense, ChangePaymentMethod, AddRegistration,
AddRegistrationOptions, GetRegistrationPlayerOptionsRequired,
AddRegistrationFromList, DeleteRegistrationFromList,
GetOrderRegistrationList, RemoveOrderItem, CompleteOrder, CancelOrder,
SearchPlayer, SearchPlayerDuplicate, SearchClub, SearchClubInfo, CreatePlayer,
AssignPlayer, GetPlayerProfile, GetPlayerRankingListPoints, UnassignPlayer,
UnassignPlayerMulti, MoveAssignPlayerMulti, CheckAssignPlayer,
SearchTournamentClass, GetTournamentClassInfo, GetTournamentEvents,
SearchRegistrations, DeleteRegistration, DeleteRegistrationClub,
ChangeRegistrationPartner, ConfirmRegistrationClub, SearchRegistrationsByClass,
SearchTournamentResults, SearchTournamentMatches, SearchTournamentInvitation,
GetLeagueStanding, GetRankingListPlayers, GetRankingListPlayersSenior,
GetRankingListPlayersHide, GetRankingListVersions, GetSeasonPlan, GetWeekNo
```

Relevante metoder blev afprøvet med friske callback-kontekster og faktiske
POST-svar. `SearchClub` med `name=Gladsaxe`, `includeteams=true` returnerede
HTTP 200 og én række: `Gladsaxe Søborg`, `clubId=1093`. `SearchClubInfo` med
`clubid=1093` returnerede HTTP 200 og én klub: `Gladsaxe Søborg
Badmintonklub`, postnummer 2860, Søborg. Begge er søge-/klubopslag, ikke en
landsdækkende sæsonliste.

`GetLeagueStanding` med `subPage=2`, `seasonID=2026`, `leagueGroupID=18894`,
`ageGroupID=1`, `regionID=8` returnerede HTTP 200 med puljen
`Københavnsserien Pulje 1` og 8 holdrækker. Svaret indeholder både holdnavne
og hold-ID'er i links, bl.a. `Dragør 2`/`122266`, `Gentofte 5`/`122267`,
`KMB2010 3`/`122264`, `Skovshoved 5`/`122268`, `KBK Kbh. 6`/`122265`,
`Charlottenlund 3`/`122263`, `NBK Amager`/`122261` og `SAIF Kbh. 2`/`122262`.
Det er en direkte klub-/holdliste pr. pulje og gør, at den fundne
region×aldersgruppe→pulje→hold-rute kan erstatte den dyre klub-ID-iteration
for katalogets formål.

`GetSeasonPlan` blev afprøvet med `seasonid=2026`, region 1,
aldersgruppe 1 og tomme øvrige filtre; det returnerede HTTP 500 med
`There was an error processing the request.` Ingen sæson-/regionsliste kan
derfor dokumenteres fra dette kald. `SearchTournamentClass` blev også
afprøvet med 2026/region 1 og returnerede HTTP 500 som i den tidligere probe.

De kendte turneringsmetoder blev afprøvet med `tournamentclassid=115342`:
`GetTournamentClassInfo` returnerede HTTP 200 med turneringen `29-08-2026
Jernløse`, `GetTournamentEvents` returnerede HTTP 200 med events 490920–490924,
`SearchTournamentResults` returnerede HTTP 200 med links til Herresingle,
Herredouble, Damedouble og Mixdouble, og `SearchTournamentMatches` returnerede
HTTP 200 med 30.686 bytes HTML og 61 rækker. De er alle opslag fra et kendt
turnerings-ID og reducerer ikke søgningen efter alle ligaer.

Der blev gennemgået fire relevante BadmintonPlayer-sider og alle deres
indlæste script-tekster: Holdturnering/Stilling, Turnering/VisResultater,
Spiller/VisSpiller og Ranglister. De eneste `.asmx`-referencer var
`WebService1.asmx` og dens `/js`-proxy (relative variationer af samme sti).
Den allerede indfangede repo-evidens (`*.html`, `*.json`, `*.txt` under
`statistik/results/`) indeholder heller ingen anden `.asmx`-service.
Der er således ingen evidens for flere webservices end `WebService1.asmx`
i det undersøgte materiale.

Rå, callback-redigeret evidens og den reproducerbare probe ligger i
`statistik/results/081-webservice-catalog-probe.json` og
`statistik/scripts/081-webservice-catalog-probe.mjs`. Der er ikke startet
fuld 2010–2026-indsamling eller skrevet til den normaliserede database.

**Svar på den yderligere parameterkortlægning (2026-09-21):** De direkte
katalogkald `GET /api/AgeGroup/Get` og `GET /api/Region` gav henholdsvis 29
aldersgrupper og 33 regioner med ID, navn, kort navn og parent-ID. Den fulde
liste står i `statistik/results/081-parameter-map-probe.md`, mens de rå HTTP-
svar og SHA-256-værdier ligger i den tilhørende `.json`.

Senior-anomalien blev testet med rå `GetLeagueStanding`-svar for region 4, 5,
6 og 7, både indekskald og samme pulje (`leagueGroupID=18888`). Svarene var
ikke byte-for-byte identiske (fire forskellige SHA-256-værdier), men det
konkrete puljesvar havde samme afkodede titel,
`BADMIDJ,BADNDRJ,BADSDRJ,BADFYN SEN 2026/2027`, og samme otte hold i alle fire
svar. Det er evidens for en reel delt vestlig seniorpulje, ikke en generisk
fallback eller en fejl i opslaget.

Det konkrete kaldestimat for indeksfasen er 16.269 kald for alle 33
katalogregioner (17 sæsoner × 29 aldersgrupper × 33 regioner), 4.437 for BD
plus de otte BD-kredse (9 regioner i alt), eller 13.311 for BD og alle DGI-
regioner (27 regioner). Hertil kommer ét puljekald pr. unik
`leagueGroupID`; det antal kan først tælles efter indeksfasen. Den historiske
indsamling er ikke startet, og databasen er urørt.

**Christoffers beslutning (2026-09-21):** Kør for ALLE 33 regioner (16.269
indekskald + detaljekald). Formålet er ikke kun et markdown-katalog — dataen
skal gemmes struktureret, så den senere kan bruges til at strukturere resten
af klubbens data (bl.a. Hold-fanens holdsammenlægning). Det skal derfor
gemmes så det er let at slå op på tværs af region, aldersgruppe, sæson,
liga/pulje, og hold/klubnavne — ikke bare som fritekst.

**Ny handling FØR den fulde indsamling sættes i gang:** Codex skal foreslå en
konkret datastruktur (skema) til det nye, permanente datasæt, baseret på hvad
`GetLeagueStanding` FAKTISK returnerer (ikke en antaget generisk struktur).
Mindst følgende skal kunne slås op efter hinanden: region → aldersgruppe →
sæson → liga/pulje (`leagueGroupID`, navn) → hold i puljen (klub-/holdnavn,
og `leagueGroupTeamID` hvis det findes i svaret). Foreslå om det skal være en
ny SQLite-fil (fx `statistik/data/liga-landskab.db`, adskilt fra
`gsb-statistik-normalized.db`) eller en anden struktureret form (JSON-filer
pr. sæson/region, CSV-tabeller osv.) — begrund valget. Skriv forslaget under
et nyt "Spørgsmål"-svar i dette kort og STOP der. Byg IKKE den fulde
indsamling før skemaforslaget er godkendt — det er dyrt at rette bagefter,
når 16.269+ kald er brugt.

**Svar: forslag til permanent datastruktur før indsamlingen (2026-09-21):**
Forslaget bygger på de gemte `GetLeagueStanding`-svar. `subPage=1`
returnerer callback-JSON med HTML, sæson-/alder-/regionsoverskrift,
divisionsnavne og links med `leagueGroupID`. `subPage=2` returnerer en
konkret pulje med puljeoverskrift og holdrækker. Holdrækkens link indeholder
`leagueGroupTeamID`, og den synlige række indeholder mindst holdnavn,
placering, kampe, vundne, score, sæt, point og sætpunkter.

Jeg anbefaler en separat SQLite-fil, fx `statistik/data/liga-landskab.db`,
adskilt fra `gsb-statistik-normalized.db`. Det er et katalog-/provenance-
datasæt med mange gentagne opslag, ikke en udvidelse af de normaliserede
GSB-kampdata. SQLite gør region → aldersgruppe → sæson → pulje → hold til
enkle indeksopslag, giver idempotente upserts og kan senere bruges af
Hold-fanen uden at blande kildens landskab med kampdatabasens semantik.

Foreslået skema:

```sql
regions(region_id PK, name, short_name, parent_id, source_endpoint,
        first_seen_at, last_seen_at)
age_groups(age_group_id PK, name, years_from, years_to,
           years_from_tournament, years_to_tournament, source_endpoint,
           first_seen_at, last_seen_at)
standing_indexes(standing_index_id PK, season_id, age_group_id, region_id,
                 requested_url, fetched_at, http_status, raw_sha256,
                 raw_response, parse_status, parser_version,
                 UNIQUE(season_id, age_group_id, region_id))
league_groups(season_id, age_group_id, league_group_id, division_name_raw,
              group_name_raw, page_title_raw, first_seen_index_id, fetched_at,
              PRIMARY KEY(season_id, age_group_id, league_group_id))
league_group_regions(season_id, age_group_id, league_group_id, region_id,
                     PRIMARY KEY(season_id, age_group_id, league_group_id,
                                 region_id))
league_group_teams(season_id, age_group_id, league_group_id,
                   league_group_team_id, team_name_raw, standing_position,
                   matches, wins, score_raw, sets_raw, points, set_points,
                   source_url, fetched_at,
                   PRIMARY KEY(season_id, age_group_id, league_group_id,
                               league_group_team_id, team_name_raw))
fetch_errors(request_key PK, season_id, age_group_id, region_id,
             league_group_id, requested_url, http_status, error_kind,
             response_sha256, response_text, first_seen_at, last_seen_at,
             attempts)
```

`league_group_regions` er nødvendig, fordi gruppe 18888 i de faktiske svar
optræder under region 4, 5, 6 og 7 med samme puljetitel og holdliste. Et
region-ID må derfor ikke indbygges som eneste identitet for en pulje.
Råsvaret gemmes i `standing_indexes`/`fetch_errors`, så parseren kan
genkøres, og historiske mismatches kan efterprøves uden et nyt API-kald.

For at gøre indsamlingen genoptagelig bør hver request have en deterministisk
nøgle, status (`pending`, `ok`, `empty`, `error`), forsøgstæller, HTTP-status,
SHA-256 og parser-version. Indeksfasen skal først upserte `standing_indexes`,
derefter lægge unikke pulje-ID'er i en kø, og til sidst hente hver pulje én
gang pr. sæson/alder/pulje. Ratebegrænsning, backoff, checkpointing og en
særskilt fejlrapport gør det muligt at fortsætte efter afbrydelser uden
dubletter. De rå snapshots kan senere genbruges til Hold-fanens
holdsammenlægning og til at opdage ændringer i kildens holdnummer/navne over
tid.

Dette er kun et skemaforslag. Den fulde 33-regioners indsamling er ikke
startet, og `gsb-statistik-normalized.db` er ikke ændret. Der afventes
godkendelse af skemaet før de 16.269+ detaljekald sættes i gang.

**Skemaet er godkendt (2026-09-21). Sæt indsamlingen i gang.** Ét åbent
spørgsmål fra godkendelsen: hvorfor `league_group_teams`s primærnøgle
indeholder både `league_group_team_id` OG `team_name_raw`, ikke kun
`league_group_team_id`. Svar det kort i næste "Spørgsmål"-afsnit — hvis
årsagen er at `league_group_team_id` kan mangle/være tom i nogle svar (så
`team_name_raw` er et nødvendigt fallback-element i nøglen), så er det fint
som det står; hvis det ikke er årsagen, så ret skemaet inden indsamlingen
starter, ikke bagefter.

**Sæt indeksfasen i gang for alle 33 regioner** (16.269 indekskald: 17
sæsoner × 29 aldersgrupper × 33 regioner), efterfulgt af ét detaljekald pr.
unik `leagueGroupID` fundet i indekset. Følg det idempotente, genoptagelige
design fra skemaforslaget ovenfor (deterministisk request-nøgle, status pr.
request, checkpointing, rate-limiting/backoff, separat fejlrapport). Kør
gerne i faser (fx indeksfasen helt færdig og rapporteret, før detaljefasen
startes) frem for ét langt kørsel uden statusrapportering undervejs — det er
en stor mængde kald, og det skal være muligt at afbryde og se fremdrift
undervejs, ikke kun ved slutrapporten.

Rapportér undervejs (eller mindst når indeksfasen er færdig): faktisk antal
kald brugt, antal `ok`/`empty`/`error`, og antal unikke `leagueGroupID` fundet
til detaljefasen — så det konkrete detaljekald-antal kan bekræftes før det
sættes i gang, i stedet for at blive antaget ud fra indeksfasens tal alene.

**Sideordnet, lille undersøgelse (ikke en del af den store indsamling, må
IKKE forsinke eller udvide indeks-/detaljefasen):** Christoffer vil vide om
regelsæt-typen (fx 9-kamp, 13-kamp) for en pulje kan udledes billigt, ved kun
at hente ÉT kampresultat pr. pulje (alle hold i en pulje spiller samme
regelsæt, så ét eksempel er nok — ikke alle kampe, det ville være dyrt).

Test konkret, på 2-3 allerede kendte puljer (fx `leagueGroupID=18888` eller
andre fra de allerede hentede probe-filer), om der findes en billig vej til
"ét kampresultat fra denne pulje":

1. Findes der i `GetLeagueStanding`s `subPage=2`-svar (puljesiden) allerede et
   link eller en reference til mindst ét `leagueMatchID` i puljen — uden et
   ekstra kald? Hvis ja: hent det ene kamp-svar og se om score-teksten kan
   klassificeres med samme metode som opgave 077 brugte.
2. Hvis nej: findes der en billig "liste kampe i denne pulje"-rute (ét kald
   pr. pulje) man kan bruge til at finde ét `leagueMatchID`, som derefter kan
   slås op? Test det faktiske kald og svar — gæt ikke ud fra endpoint-navnet.
3. Rapportér et konkret pris-estimat for at tilføje regelsæt-klassifikation
   til ALLE puljer i 081's datasæt: hvor mange ekstra kald (ca. 1-2 pr. unik
   `leagueGroupID`, hvis det virker som antaget), og om det med fordel kan
   bygges ind i den igangværende 081-kørsel, eller bør være et selvstændigt
   opfølgende kort.

Dette er en afklaring, ikke en godkendelse til at bygge det ind i den store
kørsel endnu — vent på Christoffers beslutning efter svaret er rapporteret.

### Spørgsmål

**Svar: fuld indsamling og sideordnet regelsæt-test (2026-09-21):**
Indeksfasen udførte 16.269/16.269 kald: 16.269 `ok`, 0 `empty`, 0 `error`.
Den fandt 59.127 puljereferencer og 18.546 unikke puljer. Detaljefasen udførte
18.546/18.546 kald: 18.546 `ok`, 0 `empty`, 0 `error`, med 96.823 holdrækker;
90.480 havde numeriske stillingsfelter, mens 6.343 var kildetekst som fx
`Holdet trukket`. Ingen af 96.823 rækkerne manglede `leagueGroupTeamID`, og
ingen pulje havde samme ID med flere holdnavne. Derfor er den dokumenterede
primærnøgle `(season_id, age_group_id, league_group_id, league_group_team_id)`;
`team_name_raw` er bevaret som datafelt, men er ikke identitetsfallback.

Den sideordnede test viste at `subPage=2` ikke indeholder match-ID, mens
`subPage=4` gør. Tre faktiske eksempler er 18888→508170, 18872→507745 og
18833→507270; `subPage=5` gav henholdsvis kampscorer 15-10/15-8,
13-15/15-12/15-11 og 15-7/10-15/11-15. En fuld regelsæt-udledning vil derfor
kræve ca. 18.546 matchlistekald plus op til 18.546 kampdetailkald (37.092 i
alt), og er ikke bygget ind i denne kørsel. Se
`statistik/results/081-liga-landskab-indsamling.md` og `.json` for fuld
rå optælling.
