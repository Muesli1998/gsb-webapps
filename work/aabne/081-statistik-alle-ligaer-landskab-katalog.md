# Opgave 081 — katalog over ALLE ligaer/turneringer i Nembadminton, 2010-2026 (ikke kun GSB)

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
