# Nembadminton API – research-noter

Konsolideret fra tidligere efterforskning. Genbrug disse i stedet for at gen-reverse-engineere API'et fra bunden.

**OPDATERET 2026-09-04:** flettet sammen med "Automatisk kamp-opdagelse" og "Fuld API-gennemgang"-
afsnittene fra `claude/gsb-feature-idebank.md` (samme oprydning der splittede statistik-idéerne ud i
`claude/gsb-statistik-idebank.md`) — al ren API/teknisk-reference hører hjemme ét sted, uanset hvilken
feature den oprindeligt blev fundet i forbindelse med.

## Kontekst
GSB's officielle Badmintonplayer.dk Public API-adgang (kræver godkendelse fra Badminton Danmark) er ikke opnået. I stedet bruges Nembadmintons (app.nembadminton.dk) uofficielle GraphQL-API, som selv scraper badmintonplayer.dk og eksponerer data uden login for visse queries.

## Endpoint
`POST https://app.nembadminton.dk/graphql`
Header: `Content-Type: application/json`
Body: `{"query": "..."}`

CORS: `Access-Control-Allow-Origin: *` — kan kaldes direkte fra browseren (client-side fetch), ingen backend-proxy nødvendig for selve dataadgangen. (Password-beskyttelsen i GSB's eget system er separat og handler om at beskytte SKRIVNING til Google Sheets, ikke om at tilgå Nembadminton.)

## GSB's clubhouseId
`331`

## GSB's clubId (badmintonplayer.dk-system, adskilt fra clubhouseId)
`1093`

## Queries der IKKE kræver login (bekræftet, ingen `@guard` i kildekoden)
- **`highestPointGain(clubhouseId, category, limit, orderBy, vintages)`** — ranglistepoint-stigning pr. spiller. `category`: `HS`/`DS`/`HD`/`DD`/`MxH`/`MxD` (enum `Category`, har også `LEVEL` som IKKE virker her, se fejl-mønster nedenfor). `vintages` (enum `Vintage`): `U9`/`U11`/`U13`/`U15`/`U17`/`U19`/`SEN`. `orderBy` er enum `SortOrder`: kun `ASC`/`DESC` (IKKE `LATEST`, som man kunne fristes til at gætte). Returnerer `{earliestPoints, latestPoints, totalIncrease, member{id,name}}`.
  - **Kan bruges til at bygge en fuld, login-fri spiller-roster** (se `memberStats`-afsnittet nedenfor for hvorfor det er nyttigt): kør ét kald pr. kategori (de 6 gyldige, ikke `LEVEL`) med alle 7 vintages og en høj `limit` (300-400 er rigeligt for en klub på GSB's størrelse — testet uden at ramme loftet), og forén medlems-ID'erne fra de 6 svar. Testet live for GSB (clubhouseId 331): 209/69/264/109/193/101 rækker for hhv. HS/DS/HD/DD/MxH/MxD → **377 unikke registrerede spillere i alt**, ungdom inklusive (bekræftet med konkrete U15-spillere i resultatet).
- **`memberStats(id)` / `membersStats(ids)`** — returnerer et `MemberStats`-objekt med FIRE felter, ikke bare ét `points`-felt som tidligere antaget:
  - `member` → `Member`-objektet, med et `points`-felt (type `Point`: `{id, points, position, category, vintage, version}`, hvor `category` er den rå, kønsopdelte enum `Category` — inkl. den skjulte `category: null`/`LEVEL`-post, tidligere brugt til at læse "Tilmeldingsniveau", se `claude/generel-idebank.md`).
  - `single`, `double`, `mix` → hver en liste af `DataPoint` (`{points, version}`, INTET kategori-/kønsfelt). **Dette er Nembadmintons EGEN allerede sammenlagte, kønsneutrale aggregering pr. disciplin** (single = HS+DS slået sammen, double = HD+DD, mix = MxH+MxD) — ikke noget en klient selv skal bygge sammenlægnings-logik til. Kun månedlige/uregelmæssige snapshots (dato i `version`, fx `"2026-08-02"`), IKKE kamp-for-kamp-resultater — duer ikke direkte til Dream Team-scoring, men er velegnet til at seede et eksternt ratingsystem (se GSB's `gsb-planlagte-features-spec.md` B4 for konkret brug).
  - **Friskhed testet og bekræftet god (2026-08-31):** `single`/`double`/`mix` havde `version: "2026-08-02"` for alle tre testede spillere (voksen mand, ung mand, ung kvinde) — under en måned gammelt. Det tidligere fund om at data stopper omkring 2024-07-01 gjaldt kun det ældre `category: null`/`LEVEL`-feltet i `member.points`, IKKE disse tre nyere felter.
  - **`membersStats(ids: [ID!]!)` er bulk-versionen** — samme data, men flere spillere i ét kald i stedet for ét kald pr. spiller. Testet live med to ID'er samtidig — virkede fint. Ren effektivitetsforbedring til alt arbejde der scanner mange spilleres point (fx Tilmeldingsniveau-sammenligningen i `claude/generel-idebank.md`, som lavede 91 separate kald — kunne i praksis være gjort i væsentligt færre kald med `membersStats`).
- **`badmintonPlayerTeamMatch(input: {leagueMatchId, season})`** — **DEN VIGTIGE QUERY.** Henter en holdkamps fulde resultat ved at scrape badmintonplayer.dk direkte. Returnerer `home`/`guest` med `squad.categories[]`, hver med `category` (HS/DS/HD/DD/MD), `results[]` (sætresultater som `{homePoints, guestPoints}`), og `players[]` (navne). Dette er datakilden bag `hent-resultater.js`.
- **`badmintonPlayerTeamMatches(input: {...})`** — samme scraper, flere kampe på én gang. **Testet, ikke fundet særligt nyttig i praksis:** kræver et mere kompliceret input (`teamNameHint`, `league`, `version` pr. kamp) end det man allerede har fra `badmintonPlayerTeamFights` — giver ikke nogen reel gevinst over at kalde enkelt-versionen `badmintonPlayerTeamMatch` i et loop, som `hent-resultater.js` allerede gør.
- **`badmintonPlayerTeams(input: { clubId, season })`** — lister SAMTLIGE hold en klub har tilmeldt en given sæson: `leagueGroupId`, `ageGroupId`, `name` (holdnavn, fx "Gladsaxe Søborg 3") og `league` (rækkenavn). Testet: 77 hold for GSB i 25/26-sæsonen alene — ikke kun seniorhold, men et stort antal ungdomshold på tværs af U9, U11, U13 osv. Dette er indgangen til hele klub-ID-kæden beskrevet nedenfor.
- **`badmintonPlayerTeamFights(input: { clubId, season, ageGroupId, leagueGroupId, clubName })`** — for ét specifikt hold (identificeret ved `leagueGroupId`+`ageGroupId` fra `badmintonPlayerTeams`), lister ALLE dets kampe med `matchId`, `round`, `roundDate`/`gameTime` og modstanderhold. Testet på et konkret U9-hold — returnerede en fuld, korrekt kampliste.
- **`calendarEvents(clubIds: [Int!]!)`** — returnerer klubbens KOMMENDE kampe som en færdig kalenderliste: `{ start, end, title, content, matchId }` pr. kamp, `title` allerede formateret som "Hjemmehold VS Udehold" inkl. holdnummer. Testet live med `clubIds: [1093]`: 53 planlagte kampe, matchId udfyldt for hver — ingen grund til selv at slå op i badmintonplayer.dk's kampprogram-side for kommende matchId'er. **Begrænsning:** dækker i den testede stikprøve kun senior-ligakampe for GSB (ingen ungdomskampe optrådte) — uklart om det er en generel grænse eller tilfældigt i stikprøven; bør testes eksplicit hvis en bred kalendervisning skal vise kommende ungdoms-/veterankampe. Dækker heller ikke AFSLUTTEDE kampe (alle 53 testede resultater lå i fremtiden) — til det skal `teams`→`teamFights`→`teamMatch`-kæden bruges i stedet. De to metoder supplerer altså hinanden: `calendarEvents` er en genvej specifikt til "hvad er planlagt fremover", `teams`/`teamFights`-kæden er den generelle metode (fortid og fremtid, alle hold inkl. ungdom).
- **`cancellationCollectorPublic(sharingId: String!)`** — Nembadmintons "afbud"-system (spillere melder afbud/skade til en bestemt runde). En `CancellationCollector` har `sharingId`, `email`, `clubhouse`, og en liste af `Cancellation`-poster, hver med `teamRoundId`, `message`, `member`, `dates` — kæder altså afbud sammen med et konkret hold/runde og medlem. Relevant for Dream Teams regel om at kun de 8 bedste af 10 valgte spillere tæller pr. runde ("grundet skader/holdsætning") — hvis GSB opretter en CancellationCollector til holdlederne i Nembadminton, kunne dette i teorien bruges til automatisk at se hvem der har meldt afbud, uden login. **Ikke offentligt opslåelig uden at kende `sharingId`** — testet med et gæt, gav `null` uden fejl (bekræfter selve kaldet er login-frit, men kræver den rigtige ID-streng). Chris skal selv finde/oprette denne under sin Nembadminton-klubadgang. Noteret som mulig fremtidig byggeklods, virker ikke ud af boksen endnu.
- **`clubsSearch(name, first)`** — fritekstsøgning efter klubnavne uden login (fx "Søborg" → finder klub-ID 1232). Returnerer kun `badmintonPlayerId`, ikke `clubhouseId` — løser altså ikke problemet med at finde andre klubbers interne Nembadminton-ID til `highestPointGain`/`memberStats`.

## Queries der KRÆVER login (bekræftet, `@guard` i skemaet — dødvej for no-login-automatisering)
- **`membersSearch(clubhouse, name, refId, gender, inactive, orderBy, whereCancellations, hasPoints, notOnSquad, first, page)`** — en direkte, pagineret medlemsliste-query (returnerer `Member`-objekter: id, navn, køn, `vintage`, fødselsdato, `points`, klubber, status). Ville have været den oplagte vej til en fuld roster, men fejler med "Unauthenticated" uden login — brug i stedet union-metoden via `highestPointGain` beskrevet ovenfor.
- `teams`, `teamRounds`, `teamRound`, `clubhouse`, `squadMember`, `seasons` — bekræftet login-krævende. Kunne ellers have været interessante (`teamRounds`/`squadMember` lugter af officiel holdopstilling/kampprogram-data, `clubhouse` af en rigere klub-profil end `clubhouseStats`) — men alle fire er en dødvej for et no-login-flow, medmindre Chris på et tidspunkt vil dele sine egne Nembadminton-login-oplysninger med Netlify-funktionerne (ikke foreslået, ikke undersøgt videre).
- `memberSearchPoints`, `memberSearchTeamFight`, `membersCancellationSearch` — fundet ved skema-gennemgang 2026-08-31, IKKE testet endnu om de er login-krævende (formodet ja, givet mønsteret, men ikke bekræftet).

## Relevante enums (fundet ved introspektion 2026-08-31)
- **`Category`**: `LEVEL`, `DD`, `DS`, `MxD`, `HD`, `HS`, `MxH`.
- **`Vintage`**: `U9`, `U11`, `U13`, `U15`, `U17`, `U19`, `SEN`.
- **`SortOrder`**: `ASC`, `DESC` (kun disse to — ikke `LATEST`/`EARLIEST` eller lignende).

## Vigtige detaljer om `badmintonPlayerTeamMatch`
- `leagueMatchId` findes i badmintonplayer.dk's URL for en given holdkamp (parameteren, fx `...,486829,...` i `#5,2025,17966,1,8,,486829,1093,`-strukturen).
- `season` er startåret for turneringen (efterår 2025/forår 2026 = `2025`).
- Hver kategori (MD/HS/DS/HD/DD) i `results[]` kan indeholde op til 3 sæt. Et match afgjort 2-0 kan nogle gange vise et "duplikeret" 3. sæt — men det viste sig i praksis ofte bare at være en ægte 3-sætter (se `hent-resultater.js`'s `sets.length === 3` dedup-logik, som kun trigger i det specifikke tilfælde hvor 2. og 3. sæt er identiske OG allerede afgørende — sjældent, men en sikkerhedsnet-logik der ikke skader).
- Hjemme/ude i denne data afspejler ægte banehold — GSB er IKKE altid hjemmehold. `hent-resultater.js` finder "vores" side ved at matche klub-navnet (`home.name`/`guest.name`) mod en hint-streng ("Gladsaxe Søborg"), og udtrækker holdnummer (GSB 1-4) fra et tal i slutningen af klubnavnet (fx "Gladsaxe Søborg 2" → "GSB 2").
- Kun "vores" side splittes til individuelle spillerrækker ved doubler (se punkt 5 i PROJECT_BRIEF.md).

## Klub-ID-kæde: alle klubbens hold og kampe (inkl. ungdom), uden login

Bekræftet 3-trins kæde, alle trin testet live og virkende:
1. `badmintonPlayerTeams(input: { clubId, season })` → alle hold klubben har tilmeldt den sæson.
2. `badmintonPlayerTeamFights(input: { clubId, season, ageGroupId, leagueGroupId, clubName })` → alle kampe for ét specifikt hold.
3. `badmintonPlayerTeamMatch(input: { leagueMatchId, season })` → selve resultatet (samme query `hent-resultater.js` allerede bruger).

**Vigtig nuance ved seniorholdene (GSB 1-4):** ét fysisk hold kan optræde med FLERE forskellige
`leagueGroupId`'er inden for samme sæson — fx var "Gladsaxe Søborg 2" i 25/26 registreret i BÅDE
"Københavnsserien Pulje 1" (leagueGroupId 17966) OG "Københavnsserien Oprykning til Danmarksserien"
(leagueGroupId 18490), altså grundspil-puljen og en separat oprykningsspil/slutspil-gruppe som to
forskellige leagueGroupId'er. For at hente ET holds ALLE kampe i en sæson skal `badmintonPlayerTeamFights`
derfor kaldes én gang PR. leagueGroupId holdet optræder i den sæson, ikke bare ét kald pr. hold —
resultaterne samles bagefter. Dette bekræfter uafhængigt at grundspil/slutspil-opdelingen (jf.
`ikkeSlutspilHold` i `claude/gsb-statistik-idebank.md`) er reel og synlig direkte i API'ets egen
datastruktur, ikke kun noget vi selv har antaget ud fra Chris' iagttagelser.

**Konsekvens:** hele den nuværende manuelle proces i `index.html`, hvor Chris hver runde selv finder og
indtaster matchId'er fra badmintonplayer.dk's URL'er, kan i princippet automatiseres væk — vælg sæson
(+evt. runde), og siden finder selv hvilke kampe der er spillet. Samme mekanisme åbner for en
ungdomsstatistik-gren, fordi ungdomsholdenes kampe er lige så tilgængelige som seniorholdenes (se B3 i
`claude/gsb-planlagte-features-spec.md`).

**Status:** ren undersøgelse/proof-of-concept via API-kald — intet kodet. Se B1 (Kampkalender) og B3
(Klubstatistik) i `claude/gsb-planlagte-features-spec.md` for hvor dette konkret er tænkt brugt.

## Kendt fejlmønster: "LEVEL-bugget"
`highestPointGain(category: LEVEL, ...)` og `rankingVersions` (uden "BP"/"Api"-suffiks) fejler begge med "Internal server error" — et generelt mønster i Nembadmintons backend, hvor bestemte "rå"/interne varianter af et felt er buggede, mens en alternativ variant (fx `single`/`double`/`mix` i stedet for `LEVEL`-kategorien) virker fint. Prøv en alternativ variant af feltnavnet/kategorien før du opgiver, hvis noget fejler med denne fejlbesked.

## Ikke fuldt undersøgt / mulige næste skridt
- `clubhouseStats(id)` → `ClubhouseInfo` med `rankingProgression` — ikke testet.
- `memberSearchPoints`, `memberSearchTeamFight`, `membersCancellationSearch` — fundet, ikke testet for login-krav eller nyttelast.
- Om der findes en tilsvarende query til individuelle turneringsresultater (Senior A, KSI, Farum osv.) — ikke fundet noget hidtil, kun holdkampe og ranglister.

### Manglende `external_player_id` er ikke bevis på manglende spillerprofil

Bekræftet 2026-09-14 ved manuelt visuelt dobbelttjek: spilleren Albert
Ørnskov (kamp 506363, Gladsaxe Søborg 1 – Hørning IF 1, 12-04-2026,
sæson 2025/26, pulje 18702) mangler `external_player_id` i vores
database, men har en fuld, offentlig spillerprofil på badmintonplayer.dk
med BadmintonID 130606-08. Han spiller for Hørning IF (modstanderholdet i
den kamp), ikke GSB.

Det bekræfter, at manglende `external_player_id` ikke betyder, at
spilleren ikke findes eller ikke har et ID. Det er en begrænsning i selve
`badmintonPlayerTeamMatch`-scrapingen, som ikke konsekvent får spiller-ID
eller `refId` med, særligt tilsyneladende for modstanderholdets spillere.
Det stemmer overens med den tidligere note om, at `refId` på
spillerobjektet i samme query i nogle tilfælde fejler med "Internal server
error".

## Modstanderes rangliste-point (ANDRE klubber end GSB) — TESTET 2026-08-31

**Problemet:** `memberStats`/`highestPointGain`/`memberSearchPoints` kræver alle en Nembadminton
`clubhouseId` — Nembadmintons EGET interne kunde-ID, kun kendt for GSB (`331`). Der er INGEN no-login
GraphQL-vej fundet til at slå en vilkårlig anden klubs (fx "Drive") `clubhouseId` op:
- `clubs`/`clubsSearch`/`badmintonPlayerClubs` giver alle kun `clubId`/`badmintonPlayerId` (samme
  ID-system som bruges til holdkamp-opslag), IKKE `clubhouseId`.
- `clubhouse(id)` (som ville kunne krydsreferere `clubId`→`clubhouseId` via sit `clubs`-felt) kræver
  login (`Unauthenticated`).
- `badmintonPlayerTeamMatch`s spillerfelter HAR faktisk et `points`-felt i skemaet (`ImportMember.points`
  → `ImportPoint{points, position, category, version, vintage}`) — ser lovende ud, men returnerer ALTID
  `null` i praksis for alle spillere, testet på kamp 486811 (Drive 4 mod Gladsaxe Søborg 2, 20-09-2025).
  Dødvej. (`gender`/`refId` på samme spillerobjekt fejler desuden med "Internal server error" —
  endnu et eksempel på LEVEL-bug-mønsteret.)
- **Konklusion: Nembadmintons GraphQL-API kan IKKE bruges til at finde en vilkårlig modstanders point
  uden login.**

**LØSNINGEN — brug badmintonplayer.dk's egen offentlige "Ranglister"-side i stedet (helt separat site
fra Nembadminton, kræver IKKE login):**
1. `https://www.badmintonplayer.dk/DBF/Ranglister/` er en gammel ASP.NET WebForms-side med AJAX-søgning.
   Klub-vælgeren har en klientside `TextboxSelectController`, men søgeknappernes `onclick`-handlere
   (`LinkButtonSearchClick`, `GetSearchPlayer1().SearchPlayer()`) returnerer altid `false` og udløser
   ALDRIG den påklistrede `__doPostBack`/link — reelt "dead code" i markup'et. Den rigtige mekanisme er
   ren AJAX, og skal kaldes direkte via JS-konsollen (kan ikke bare simuleres med klik/DOM-events):
   - Sæt klub: `window.SelectClubDropDown1_GetObject().set_clubById(clubId)` (clubId = samme ID som
     Nembadmintons `clubsSearch`/`clubs`-query giver, fx Drive = `1091`, GSB = `1093`) — IKKE nok bare at
     sætte tekstfeltets værdi, det giver kun `Name` uden `Id`, og `validate()` fejler så stille.
   - Kør selve søgningen: `window.GetParameters(); window.CallGetRankingListPlayers(true, true, true);`
   - Testet live: filtrerede korrekt til kun Drives spillere i ranglisten.
2. **Hver rangliste-række har et link til spillerens offentlige profil**
   (`/DBF/Spiller/VisSpiller/#<spillerId>`, fx `#69194` for Kasper Klitgaard) — spillerId her er
   badmintonplayer.dk's INTERNE side-ID, ikke det synlige BadmintonID (fx `950711-03`).
3. **Selve spillerprofilen viser de faktiske point, helt offentligt, ingen login:** testet på Kasper
   Klitgaard (Drive) — under "Ranglister" for den DEFAULT/nuværende sæson vises en tabel med
   `Rangliste Single/Double/Mix`: hver med `Række, Point, Kampe, Placering` (fx Single 3027p/2 kampe,
   Double 3147p/10 kampe, Mix 3078p/8 kampe). **Dette er PRÆCIS de tal Chris efterspurgte.**
4. **Sæson-vælger på profilen bekræfter datakvaliteten:** skifter man `Sæson`-dropdown til `2025/2026`,
   vises en `Holdkampe`-liste for spilleren DEN sæson — og den indeholder helt konkret kampen
   `20-09-2025 16:00 ... Drive 4 vs. Gladsaxe Søborg 2`, dvs. præcis den kamp Chris bad om at teste
   (kampid 486811). Beviser at spiller-ID'et og datakilden er korrekt matchet.
5. **BEGRÆNSNING FUNDET — ikke løst endnu:** når man vælger en TIDLIGERE sæson (fx `2025/2026`, i
   modsætning til default/nuværende visning), viser profilen KUN et enkelt tal
   ("Tilmeldingsniveau ved sæsonstart", fx 3077 for Kasper Klitgaard i 25/26) — IKKE den fulde
   Single/Double/Mix-opdeling for den sæson. Den detaljerede kategori-opdelte pointtabel ser ud til kun
   at vises for sæsonen siden er sat til som default (formentlig altid den nyeste/aktuelle sæson), ikke
   for en vilkårlig historisk sæson. **Konsekvens for Chris' ønske om "point fra den seneste liste inden
   holdkampen":** vi kan IKKE (endnu) hente et præcist dato-nært snapshot for en modstander på denne måde
   — kun (a) modstanderens NUVÆRENDE point (bruges til analyse af gamle kampe = upræcist, spilleren kan
   have udviklet sig siden), eller (b) et enkelt "niveau ved sæsonstart"-tal for en given sæson (ikke
   kategori-opdelt, men til gengæld tidsmæssigt tæt på en tidlig-sæson-kamp som den 20-09-2025-kamp).
   Ikke undersøgt endnu: om der findes en dybere URL/visning på badmintonplayer.dk med uge-for-uge
   pointhistorik for en spiller (analogt med Nembadmintons `version`-daterede snapshots for GSB's egne
   spillere) — næste skridt hvis denne stat skal bygges færdig.
6. **Identificerede Drive-spillere fra kamp 486811 (via klub-filtreret ranglisteopslag), klar til videre
   opslag:** Kasper Klitgaard (BadmintonID 950711-03, profil-ID 69194, Single 3027/Double 3147/Mix 3078
   pr. nu), samt Casper Simonsen, Johan Juel Andersen, Adam Toftman Kurtik, Nikolaj Harbo, Oliver
   Springborg — alle fundet i Drives HS/A-klasse ranglisteudtræk, men kun Kasper Klitgaards profil er
   slået op i denne omgang (tidsbegrænset test).

### OPDATERING 2026-08-31 (samme dag) — punkt 5's begrænsning er LØST: "Ranglister"-siden HAR en dato-præcis version-vælger

Chris opdagede selv (skærmbillede) at selve `/DBF/Ranglister/`-siden (IKKE kun spillerprofilen) har en
"Version"-dropdown der lister KONKRETE ranglistedatoer — præcis det der manglede. Bekræftet live:

- **`DropDownListVersions` er sæson-afhængig.** Med sæson sat til den AKTUELLE sæson (2026/2027) viser
  den kun ~21 nylige datoer (tilbage til 01-07-2026). **Men** skifter man sæson (se nedenfor), repopuleres
  den med HELE den sæsons historik — testet for 2025/2026: 159 datoer, tilbage til 01-07-2025, MED
  `19-09-2025` som en konkret valgbar version (dagen før kampen mod GSB, 20-09-2025) — dvs. præcis den
  granularitet Chris efterspurgte er faktisk til stede for historiske sæsoner, IKKE kun "niveau ved
  sæsonstart" som først antaget.
- **Sæsonskift virker via URL-hash, ikke UI-dropdown.** Sidens URL er et hash-baseret state-format, fx
  `#288,2025,,0,,,1091,0,,,,15,,,,0,,,,,,` — bekræftede felter: position 1 = rangliste-type-ID (287 =
  Tilmeldingsniveau, 288 = HS/Single — resten af HS/DS/HD/DD/MD-ID'erne ikke opslået endnu), position 2 =
  sæson-startår, position 7 = klub-ID (samme system som Nembadmintons `clubId`, fx Drive=1091, GSB=1093).
  At NAVIGERE direkte til en sådan hash-URL (frem for at klikke sig frem i UI'et) satte KORREKT både klub-
  filter, kategori OG fuld sæson-version-liste i én omgang, med rigtige udfyldte Point-tal med det samme
  (fx Johan P. Philipsen, Drive: 3583 Single-point, version 29-06-2026 = sæson-SLUT-værdien, da hash'en
  ikke havde en specifik dato-parameter, kun sæson).
- **IKKE løst endnu — reproducerbarhed af selve dato-skiftet midt i en session.** At vælge en SPECIFIK
  dato (`19-09-2025`) via `DropDownListVersions`-dropdown'ens egen `onchange`-handler
  (`DropDownVersionClick(this)`) EFTER siden allerede var indlæst, fik gentagne gange resultat-tabellen
  til at gå helt tom (0 rækker) ved efterfølgende søgning — uklart om det er en reel fejl, en async
  race condition i test-scriptet, eller om version-parameteren skal med i selve hash-URL'en fra start
  (ikke fundet det rigtige hash-felt til dette endnu) i stedet for sat via dropdown efter indlæsning.
  **Næste skridt, hvis denne stat skal bygges færdig:** find det korrekte hash-felt til dato/version (så
  hele opslaget — klub+kategori+dato — kan laves i ÉT sideload uden at røre UI-widgets bagefter), eller
  find den korrekte rækkefølge/timing for at sætte version via dropdown uden at nulstille resultatet.
- **Konklusion: mekanismen (dato-præcis rangliste-version, offentlig, uden login) findes og er bekræftet
  at eksistere for historiske sæsoner** — det er "kun" et scripting-/automatiserings-spørgsmål tilbage,
  ikke et princip-spørgsmål om data findes. Dette ændrer DEL A/B4-vurderingen positivt: en fuld
  "performance vs. rangliste-point på kamptidspunktet"-stat er reelt teknisk muligt at bygge.

## Forbehold
Uofficielt, reverse-engineered API. Kan ændre sig eller lukkes uden varsel. Brug ikke til noget forretningskritisk.
