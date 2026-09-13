# GSB – Statistik & spilleranalyse idébank

Al statistik-, spilleranalyse- og rankings-relateret idéarbejde på tværs af sitet — Dream Teams
Statistik-side (`analyse.html`), den fremtidige klub-brede statistik (B3), og alle
spilleranalyse-/rankings-metoder der undervejs har vist sig genbrugelige på tværs af flere features.
Udskilt fra `docs/idebank-feature.md` 2026-09-04, fordi det reelt er samme type arbejde
(pointberegning, sammenligning, ranking-metoder) der bliver relevant igen og igen for forskellige
features — det gav mere mening at samle det ét sted end at lade det ligge spredt i feature-specifikke
afsnit. Se `docs/idebank-feature.md` for selve feature-idéerne (Tilmelding, nav/IA, Søndagstræning
osv.), `docs/idebank-kampsystem.md` for ELO/Kampsystem, `docs/historik/driftlog.md` for hvad der
faktisk er shippet, og `docs/nembadminton-api.md` for ren teknisk API-reference (flyttet dertil samme
dag, af samme grund).

## Trænerværktøj: "performance vs. ranglistepoint" — er sejren "forventet"? (rejst + testet 2026-08-31)

**Idé rejst af Chris:** ikke nødvendigvis en Dream Team-stat — snarere noget der kunne være fedt for
TRÆNERNE at kunne se generelt. Hvis en spiller med fx 3000 rangliste-point vinder over modstandere med
2700, 2950 og 3100 point, hvordan viser man om spilleren er "effektiv" i den forstand — altså om
resultaterne står mål med rangliste-niveauet, eller om spilleren over-/underpræsterer sit eget niveau?

**Konceptet:** samme grundidé som Elos "expected score" (kendt fra B4s ELO-arbejde) — anvendt bagudrettet
på allerede spillede kampe i stedet for fremadrettet til rundefordeling. For hver kamp beregnes en
forventet vindsandsynlighed ud fra pointgabet mellem spiller og modstander (fx den logistiske Elo-formel,
skal formentlig kalibreres til BD's pointskala), og den faktiske sejr/tab-facit sammenlignes med det
forventede. Summeret/gennemsnitligt over en periode giver et "over/underperformance"-tal: positivt =
vinder mere end point tilsiger (spiller over niveau), negativt = taber mere end forventet. Simplere
alternativer: gennemsnitligt modstanderpoint for besejrede modstandere vs. eget point, eller en
skak-inspireret "performance rating" (hvilket pointniveau ville gøre den faktiske facit "forventet").

**Vigtig præcisering fra Chris:** rangliste-pointene skal tages fra den SENESTE liste inden den enkelte
holdkamp hver gang — altså et dato-nært snapshot pr. kamp, ikke et enkelt fast tal for hele sæsonen.

**Feasibility testet live 2026-08-31 — delvist løst, én begrænsning tilbage:** se
`docs/nembadminton-api.md`, afsnittet "Modstanderes rangliste-point (ANDRE klubber end GSB)" for det
fulde tekniske forløb. Kort opsummeret:
- Nembadmintons GraphQL-API kan IKKE bruges til at finde en vilkårlig modstanders point uden login (alle
  relevante queries kræver en `clubhouseId`, som ikke er opslåelig for andre klubber end GSB uden login).
- **Løsningen: badmintonplayer.dk's egen offentlige "Ranglister"-side** (det officielle Badminton
  Danmark-site, IKKE Nembadminton) virker uden login. Klub-filtrering + spillerprofil-opslag
  (`/DBF/Spiller/VisSpiller/#<id>`) giver de faktiske Single/Double/Mix-point for en vilkårlig spiller,
  hvilken som helst klub. Testet og BEKRÆFTET på en konkret Drive-spiller (Kasper Klitgaard) fra den
  konkrete kamp Chris bad om (kampid 486811, GSB2 mod Drive4, 20-09-2025) — spillerens `Holdkampe`-liste
  for 2025/2026-sæsonen viste netop denne kamp, hvilket beviser match mellem spiller-ID og datakilde.
- **Tilbageværende begrænsning:** profilsiden viser kun den FULDE Single/Double/Mix-pointopdeling for
  nuværende/default sæson — vælger man en ældre sæson (fx 2025/2026, som matchen faktisk blev spillet i),
  vises kun ét enkelt "Tilmeldingsniveau ved sæsonstart"-tal, ikke et dato-nært snapshot midt i sæsonen.
  Chris' krav om "seneste liste inden holdkampen" er derfor endnu ikke fuldt indfriet — kun tilnærmet
  (sæsonstart-niveau er tæt på for en tidlig-sæson-kamp som denne, men ikke generelt præcist). Ikke
  undersøgt: om en dybere side/visning på badmintonplayer.dk har uge-for-uge-historik.
- Kun én spiller (Kasper Klitgaard) er slået fuldt op i denne omgang — resten af de 5 relevante Drive-
  modstandere (2 mixdouble-makkere + herresingle 1/2/3, som Chris bad om) er identificeret i klub-
  ranglisten men ikke enkeltvist opslået endnu, tidsbegrænset test.

**OPDATERING 2026-08-31 (samme dag) — dato-præcisions-begrænsningen er stort set løst, se A4:**
badmintonplayer.dk's `/DBF/Ranglister/`-side har rent faktisk en dato-præcis "Version"-vælger, som VIRKER
for historiske sæsoner (fx 19-09-2025, dagen før GSB-kampen, er en valgbar dato). Kun selve
automatiseringen af at slå en SPECIFIK dato op (i modsætning til sæsonens seneste version) mangler at
blive løst. Det fulde tekniske forløb — hash-URL-format, klub-/kategori-/version-parametre, hvad der
virkede og hvad der ikke gjorde — er flyttet til `docs/planlagte-features-spec.md` DEL A som **A4**,
per proces-reglen i `docs/START-HER.md` (blokerende åbent spørgsmål får sit eget nummererede punkt).

Status: **teknisk gennembrud — se A4 i spec-filen for den fulde, opdaterede status.** Ikke bygget som
feature, og ikke bestemt om det bliver en Dream Team-stat, et separat trænerværktøj, eller begge dele.

## Board-position pr. kamp (HS1/HS2/HS3/HS4 osv.) — BYGGET I PREVIEW

Nembadminton-API'et (`badmintonPlayerTeamMatch`) returnerer allerede et `name`-felt pr. kategori-post
(fx `"1. HS"`, `"2. HS"`, `"3. HS"`, `"4. HS"`, `"1. DD"`, `"2. DD"` osv.) — det er badmintonplayer.dk's
egen officielle board-nummerering for den enkelte kamp, sat af holdlederen. `hent-resultater.js` henter
`name` med i sin GraphQL-query, men bruger kun `category` når rækken skrives til Resultater-arket —
`name` bliver læst og derefter smidt væk.

**STATUS-OPDATERING: bygget i Claude-previewet.** Chris gav go-ahead ("Du må gerne gå igang med at
involvere board positioner"). Positionen er udledt af eksisterende data — INGEN ændring af
`hent-resultater.js` eller arkets kolonner var nødvendig, præcis som forudset.

**Sådan er det bygget:** Statistik-sidens spiller-drilldown (klik en spiller i tabellen) viser nu, ud
over sejre/tab/winrate pr. hold·kategori, også en board-tendens, fx "Board 2→2→2→1→1" i kronologisk
runde-rækkefølge. Samme visning er også flettet ind i sammenlign-sæsoner-visningen ("Vis kategorier").

**Algoritmen (client-side i previewet, `runAnalyse` i `analyse.html`'s inline script):** for hver
(runde, hold, kategori)-gruppe tælles rækkerne i den rækkefølge de allerede står i Resultater-arket.
Singlekategorier (HS/DS) bidrager med 1 række pr. board; doublekategorier (HD/DD/MD) bidrager normalt
med 2 rækker pr. board (typisk én ægte resultat-række + én "partner-ekko"-række uden udfyldte sæt — se
data-kvalitets-noten nedenfor). Boardnummer = `Math.floor(række-index-i-gruppen / rækker-pr-board) + 1`.

**Valideret på rigtig 25/26-data (Python-simulation af algoritmen mod `real_data.json`):** maks.
board-position pr. kategori kom ud som HS: 4, HD: 3, DD/DS/MD: 2 — alt sammen plausible tal for et
klubhold. Stikprøve på Jonathan W. Hansen viste en meningsfuld, sammenhængende historie: HS board 1 hele
sæsonen (`1→1→1→1→1→1→1→1→1→1`), men HD board 2 de første 6 runder og board 3 de sidste 4
(`2→2→2→2→2→2→3→3→3→3`) — præcis den slags "rykker spilleren op/ned ad boardet"-historie Chris efterspurgte.

**Data-kvalitets-fund — UNDERSØGT TIL BUNDS OG RETTET (2026-08-29):** som noteret ovenfor har mange
doublekategori-boards to rækker i Resultater, hvor den ene har udfyldte sætresultater og den anden har
TOMME sæt-felter (men samme `Vinder`-værdi). Da Chris rejste bekymringen "Det er VIRKELIG vigtigt at der
ikke er rod i win% og statistik! for alt", blev dette undersøgt grundigt. Konklusionen i punktform:

- **Individuelle spilleres sejre/tab-tal har ALDRIG været berørt.** Hver spillers egen række tælles
  uafhængigt (`vinder`-feltet er altid korrekt udfyldt på hver enkelt række) — det er kun
  hold-/kategori-NIVEAU-optællingen i `runAnalyse` der havde problemet, beskrevet nedenfor.
- **Dream Teams RIGTIGE pointberegning har ALDRIG været berørt.** Bekræftet ved at genlæse
  `docs/dream-team-brief.md`'s arkitektur: Spillerpoint-arket beregnes med SUMIFS der matcher på
  spillernavn i Resultater' `Hjemme`/`Ude`-kolonner og summerer `Point (Hjemme)`/`Point (Ude)`
  (0/1-sejrsmarkører) — denne mekanisme læser IKKE sæt-score-kolonnerne (`Sæt 1-3`) overhovedet, og er
  derfor fuldstændig immun over for at nogle rækker har tomme sæt-felter. Dream Teams stilling/point har
  altid været korrekt.
- **Det faktiske problem var afgrænset til Statistik-sidens (`analyse.html`) hold- og
  kategori-niveau-aggregering.** Den gamle dedup-nøgle i `runAnalyse`
  (`runde|hold|kategori|sæt1|sæt2|sæt3|vinder`) brugte sæt-score-teksten til at genkende "samme kamp".
  Fordi den tomme-sæt-række har ANDRE sæt-værdier end partner-rækken med udfyldte sæt, fik de FORSKELLIGE
  nøgler og blev talt som TO separate kampe i stedet for én — det inflaterede holdenes og kategoriernes
  samlede kamptal (og dermed også vindprocenterne, om end mere beskedent) for doublekategorier
  specifikt, KUN i Statistik-sidens aggregerede hold-/kategori-/matrix-tal.
- **Omfang kvantificeret** (Python-analyse af `resultater_2526.csv`): andel doublerækker med tomt
  sæt-felt: DD 57,2%, HD 51,8%, MD 52,6% (singler stort set uberørt: DS 18,4%, HS 2,6%). Effekt på
  kamptal: fx GSB1's samlede kamptal faldt fra 190 til korrekte 143 efter fix; HD-kategoriens samlede
  "kampe" faldt fra 166 til korrekte 114. Vindprocenterne rykkede sig mere beskedent, typisk 1-3
  procentpoint pr. hold/kategori.
- **Rettet i previewet:** dedup-nøglen er ændret til at bruge boardposition i stedet for sæt-score-tekst
  (`runde|hold|kategori|boardPosition`, genbruger board-position-udledningen ovenfor) — robust uanset om
  sæt-felterne er tomme. Fixet er valideret end-to-end ved at trække den FAKTISKE byggede `runAnalyse`-kode
  ud af den publicerede preview-fil og køre den mod rigtig 25/26-data i Node.js. Korrigerede tal efter fix:
  hold GSB1 79S/64T/143 kampe (55,2%), GSB2 80S/63T/143 (55,9%), GSB3 53S/37T/90 (58,9%), GSB4 68S/36T/104
  (65,4%); kategorier DD 40S/35T/75 (53,3%), DS 38S/36T/74 (51,4%), HD 64S/46T/110 (58,2%), HS 92S/57T/149
  (61,7%), MD 46S/26T/72 (63,9%).
- **Hvorfor de tomme sæt-felter opstod i første omgang — kun et legacy-fænomen, ikke et nutidigt script-problem.**
  Live-verificeret mod Nembadmintons rigtige API (konkret `leagueMatchId 485648`, GSB mod Valby BC, runde
  1, sæson 2025): den CURRENT `hent-resultater.js` + den nuværende API-struktur producerer rene,
  korrekt-parrede rækker med IDENTISKE score/matchKey for begge doubleparter. Mønstret med tomme
  sæt-felter er altså et levn fra hvordan 25/26-arket oprindeligt blev udfyldt/konverteret historisk — det
  vil ikke gentage sig for data der importeres fremover med det nuværende script.
- **RETTET I DEN RIGTIGE, SHIPPEDE `apps/netlify-prod/netlify/functions/analyse.js` (2026-08-29):** Chris bad eksplicit om
  at få bekræftet og rettet det samme i produktionskoden ("Du må rigtig gerne kigge på det shippede kode
  for at se om det passer" → "Fix det gerne tak :)"). Læste den rigtige fil linje for linje: linje 76
  havde PRÆCIS samme sæt-score-baserede `matchKey` som previewets gamle, buggede version. Bekræftede også
  direkte i koden at spiller-niveau-stats (linje 64-73) slet ikke bruger dedup/matchKey overhovedet — de
  var aldrig i fare, uafhængigt bevis for samme konklusion som ovenfor. Rettelsen er identisk med
  preview-fixet: dedup-nøglen bruger nu boardposition (udregnet med samme algoritme som board-position-
  featuren) i stedet for sæt-score-tekst. Valideret ved at køre den FAKTISKE patchede handler-kode (ikke
  en reimplementering) mod de rigtige `resultater_2526.csv`/`spillerpoint_2526.csv`-filer via Node.js —
  output matcher tal-for-tal previewets validerede tal.
  **[Denne bug-fix er nu bekræftet reelt shippet til den rigtige, deployede `apps/netlify-prod/`-mappe —
  se `docs/historik/driftlog.md`, "Niende runde", punkt 6, for den autoritative status. Den oprindelige
  "rigtig, shippede fil"-formulering her var i første omgang fejlagtig (fixet lå kun i en uploadet
  arbejdskopi, ikke i selve produktionsmappen) — se "RETTELSE 2026-09-03 (niende runde)" i driftloggen
  for hele historikken bag den forveksling.]**

### Grundspil/slutspil-filtrering: hold uden slutspilsopdeling (GSB 3 og GSB 4) — RETTET (2026-08-29)

Chris opdagede at Statistik-sidens runde-preset-vælger (Grundspil 1-7 / Slutspil 8-11 / Alle runder) fik
GSB 3 og GSB 4's hold-vinrate til at ændre sig alt efter hvilket preset der var valgt — men GSB 3 og GSB 4
spiller IKKE en grundspil/slutspil-opdelt sæson (kun GSB 1 og GSB 2 gør), så deres tal skal altid vise
hele sæsonen, uanset preset.

**Sådan er det rettet — to steder, to lidt forskellige mekanismer:**
- **I previewet** fandtes der allerede en scaffoldet, ubrugt mekanisme til præcis dette fra tidligere i
  sessionen: `seasons_source.js` har et `ikkeSlutspilHold`-felt pr. sæson (tom liste = alle hold følger
  normal opdeling), som sendes med som query-parameter til `runAnalyse`, der ekskluderer de nævnte hold
  fra runde-filtreringen (altid inkluderet, uanset rundeMin/rundeMax). Feltet stod tomt for 2025/26 —
  udfyldt nu med `ikkeSlutspilHold: ['GSB 3', 'GSB 4']`. Rettelsen sker på RÆKKE-niveau (før spiller-,
  hold- og kategori-aggregering), så alle tre niveauer er automatisk konsistente.
- **I den rigtige, shippede `apps/netlify-prod/netlify/functions/analyse.js`** findes denne per-sæson-konfigurerbare
  mekanisme nu OGSÅ (se `docs/historik/driftlog.md`, "Niende runde", punkt 6 — den rigtige `analyse.js` bruger
  siden niende runde samme `ikkeSlutspilHold`-query-parameter-mønster som previewet, sammen med en ny
  multi-sæson `analyse.html`). Tidligere var der her en simplere, hardkodet
  `ROUND_FILTER_EXEMPT_HOLD = new Set(['GSB 3', 'GSB 4'])`-løsning i selve funktionen — den er siden
  erstattet af den fleksible query-parameter-mekanisme, jf. driftloggen.
- Valideret: kørte den rigtige patchede logik mod `resultater_2526.csv` for alle tre runde-presets — GSB 1
  og GSB 2 (som HAR en reel opdeling) ændrer sig korrekt mellem grundspil/slutspil/hele sæsonen, mens
  GSB 3 (53S/37T) og GSB 4 (68S/36T) nu står fuldstændig fast på hele-sæson-tallene uanset preset.

Status: **rettet i previewet OG i den rigtige, shippede `apps/netlify-prod/netlify/functions/analyse.js` (bekræftet live i
produktion, se driftloggen).**

## Relateret idé: sammenligning på tværs af sæsoner i Statistik

"Vis kategorier"/sammenlign-sæsoner-visningen i previewet er allerede godt rustet til dette, fordi hold-
og kategori-lister bygges dynamisk ud fra hvad der faktisk står i hver sæsons data (en sæson med kun 3
hold, som 24/25, viser bare 3 hold-kort uden nogen konfiguration). Én reel svaghed identificeret:
runde-presetterne (Grundspil/Slutspil/Alle runder) er hardkodede til at antage samme antal runder hver
sæson (11 eller 12 i den nuværende preview-konfiguration) — det holder ikke hvis en ældre sæson havde et
andet antal runder (24/25 havde fx 12 runder for GSB 1, kun 7 for GSB 3). Bør gøres sæson-specifikt
konfigurerbart på samme måde som `ikkeSlutspilHold` nu er, så "Alle runder" automatisk tilpasser sig den
enkelte sæsons faktiske rundeantal, når/hvis 24/25 (eller andre ældre sæsoner) kommer med i
sammenligningen.

Status: ren idé — intet bygget.

## Åbent spørgsmål (delvist løst): hvordan sammenlignes holdsucces fair på tværs af sæsoner, når et holds rækkeniveau ændrer sig?

Rejst af Chris i forbindelse med `ikkeSlutspilHold`-konfigurationen.

**Delvist løst (2026-08-29):** selve grundspil/slutspil-filtreringsbugget for hold UDEN slutspilsopdeling
(GSB 3, GSB 4 i 25/26) er nu rettet, se ovenfor — deres tal er korrekte og stabile uanset runde-preset.
Det oprindelige, bredere spørgsmål — hvordan man fair sammenligner et holds præstation på TVÆRS AF
SÆSONER når holdet selv rykker op/ned i række — er stadig ikke løst eller besluttet.

## Adskil Dream Team-statistik fra generel GSB-klubstatistik (inkl. ungdom)

Chris spurgte hvordan man bedst adskiller Dream Teams fantasy-specifikke statistik fra en bredere,
klub-generel statistik — særligt med henblik på at kunne involvere ungdomsspillere i den generelle del.

**Hvorfor de er filtret sammen i dag:** Resultater-fanen er lige nu BÅDE rådata til Statistik-siden OG
det eneste input til Dream Teams fantasy-pointberegning (Spillerpoint's SUMIFS). Og Resultater indeholder
kun de kampe Chris manuelt slår matchId op og indtaster for i data-indskrivningen (`index.html`) — i
praksis kun GSB 1-4 seniorholdenes kampe, fordi det er dem der er relevante for Dream Team. "Generel
statistik" i dag er derfor reelt "de kampe Chris gad taste ind af hensyn til fantasyligaen" — ikke et
fuldt billede af klubben, og slet ikke ungdom.

**AFKLARET OG LANDET 2026-08-31, se `docs/planlagte-features-spec.md` B3** for det fulde,
konkret aftalte design (placering i nav, Alle/Ung/Sen/Vet-filtrering, `AlleResultater`-fane,
scheduled sync mandag morgen). Afsnittet her er bevaret som baggrund/historik for selve idé-diskussionen.

**Anbefaling: hold de to lag fysisk adskilt, ikke bare visuelt filtreret.** Efter arbejdet med at rydde op
i win%-rodet (se Board-position-afsnittet ovenfor) er en klar lære at ikke koble et nyt formål oveni det
eksisterende Resultater/Spillerpoint-flow — det er præcis den slags kobling der gjorde de seneste
rettelser nødvendige, og enhver fremtidig ændring til "generel statistik" ville ellers risikere at røre
noget Dream Team-scoringen er afhængig af. I stedet:
- **Dream Team-laget forbliver urørt:** Tilmeldinger → Holdoversigt → Resultater → Spillerpoint →
  Beregning → Stilling, præcis som nu, kun fodret med de kampe der faktisk tæller i fantasyligaen.
- **Et nyt, separat lag til generel GSB-statistik** — fx en ny fane (`AlleResultater` el.lign.) med samme
  rå-format som Resultater, men uden begrænsning til kun de fire seniorhold. Dream Team-flowet læser
  ALDRIG fra denne fane, og omvendt.

**Ungdom kommer ind via allerede valideret groundwork:** klub-ID-kæden (`badmintonPlayerTeams` →
`badmintonPlayerTeamFights` → `badmintonPlayerTeamMatch`, se `docs/nembadminton-api.md`) beviste live at
ALLE klubbens holdkampe — inkl. en lang række U9-U19-ungdomshold — kan findes uden login. Det betyder det
nye generelle lag ikke behøver samme manuelle matchId-indtastning som Dream Team-siden — det kan i praksis
auto-importeres for hele klubben, ungdom inklusive, med en ny (separat) Netlify-funktion.

**Konkret forslag til opbygning:**
1. Nyt Google Sheets-faneblad (samme sæson-ark, ny fane) til den brede kampdata.
2. Ny Netlify-funktion der bruger klub-ID-kæden til at hente og skrive kampe for ALLE hold (senior +
   ungdom) til den fane — automatisk, ikke manuel matchId-indtastning.
3. Ny eller udvidet statistik-side der læser fra den nye fane i stedet for Resultater — helt uafhængig af
   Spillerpoint/Dream Team.
4. Resultater-fanen og hele Dream Team-pipelinen røres slet ikke i denne proces.

**Direkte relateret til kampkalender-idéen (se `docs/idebank-feature.md`, Kampkalender-widget/B1):**
den nye `AlleResultater`-fane kan meget vel være den SAMME datakilde som kalender-widgettens ugentlige
past-match-sync — én ugentlig sync-mekanisme, to formål: generel klubstatistik + kalendervisning.

Status: **AFKLARET og lagt fast som B3 i `docs/planlagte-features-spec.md` (2026-08-31)** — se den fil
for det aktuelle, konkrete design. Intet bygget endnu, afventer "byg det".

## 24/25-sæsonens Dream Team-data: rekonstrueret via API + krydstjekket mod det gamle ark — GENNEMFØRT (2026-08-29)

Baggrund (jf. PROJECT_BRIEF.md punkt 7): 24/25-sæsonens originale Excel-ark har brækkede formler
(`#REF!`) for runde 8+, og selv Pivot-fanens "facit" for de tidligere runder er hårdkodede, frosne tal
fra en tidligere, muligvis fejlbehæftet manuel udregning. Chris delte et skærmbillede af Pivot-fanens
"Med 3. Holdet"/"Uden 3. Holdet"-kategorioversigt for februar 2025 og bad om at få GSB 1-3's rå kampdata
for 24/25-sæsonen rekonstrueret via API'et og sammenlignet.

**Rekonstruktionen er gennemført via klub-ID-kæden, kørt live i den indbyggede browser** (denne sessions
cloud-sandkasse har ikke direkte netværksadgang til `app.nembadminton.dk` — kaldene blev i stedet kørt i
det Chrome-baserede browser-vindue på Chris' linkede computer, hvor CORS er åben):
1. `badmintonPlayerTeams(clubId: 1093, season: 2024)` → GSB 1 spillede i sæson 2024/25 på tværs af TRE
   `leagueGroupId`'er (Danmarksserien Pulje 8 → kvalifikation til 3. division → kvalkampe om oprykning),
   GSB 2 på to (Københavnsserien Pulje 2 → oprykningsspil til Danmarksserien), GSB 3 kun på ét
   (1. Serie Pulje 1 — bekræfter Chris' iagttagelse at GSB 3 ikke har en grundspil/slutspil-opdeling,
   samme mønster som allerede fundet for 25/26).
2. `badmintonPlayerTeamFights` pr. hold/leagueGroupId → 12 kampe for GSB 1, 11 for GSB 2, 7 for GSB 3
   (30 kampe i alt, runde 1-12 for GSB 1/2, runde 1-7 for GSB 3).
3. `badmintonPlayerTeamMatch` pr. kamp → fulde resultater, kørt gennem samme doublesplit/hjemme-ude-"os"-
   logik som `hent-resultater.js` bruger.

**Krydstjek mod skærmbilledet — meget tæt match, og selve metoden er nu bevist korrekt:** ved at teste
forskellige runde-cutoffs viste det sig at Chris' "februar"-skærmbillede præcist svarer til GSB 1 t/m
runde 9, GSB 2 t/m runde 9, GSB 3 t/m runde 6 (GSB 3's runde 7 blev først spillet 16. marts, altså efter
skærmbilledet er taget) — **de samlede kamptal (S-kolonnen) matcher 100% eksakt** ved dette cutoff, for
BÅDE "Med 3. Holdet" (312/312) og "Uden 3. Holdet" (234/234), fordelt helt korrekt på alle 5 kategorier.
Det er stærk uafhængig bekræftelse af at rekonstruktionen finder præcis de samme kampe/kategorier som det
gamle ark. Sejrstallene (V-kolonnen) matcher også tæt efter at et vigtigt fund blev rettet (se nedenfor):
"Med 3. Holdet" 149/312 (48,1%) rekonstrueret vs. 155/312 (50%) i skærmbilledet — en forskel på 6 sejre
ud af 312 kampe, hvoraf en del forklares af 2 kampe med reelt manglende/uregistrerede sætdata i
Nembadmintons database (se nedenfor) og resten sandsynligvis er den slags upræcision der allerede er
dokumenteret i det gamle Pivot-ark. Fuld sammenligningstabel:

| Kategori | Med 3. Holdet (skærmbillede) | Med 3. Holdet (rekonstrueret) | Uden 3. Holdet (skærmbillede) | Uden 3. Holdet (rekonstrueret) |
|---|---|---|---|---|
| MD | 21/48 (44%) | 21/48 (43,8%) | 17/36 (47%) | 18/36 (50%) |
| DS | 25/48 (52%) | 25/48 (52,1%) | 20/36 (56%) | 20/36 (55,6%) |
| HS | 53/96 (55%) | 50/96 (52,1%) | 45/72 (63%) | 45/72 (62,5%) |
| DD | 28/48 (58%) | 28/48 (58,3%) | 21/36 (58%) | 22/36 (61,1%) |
| HD | 28/72 (39%) | 25/70 (35,7%) | 24/54 (44%) | 24/52 (46,2%) |
| **Total** | **155/312 (50%)** | **149/310 (48,1%)** | **127/234 (54%)** | **129/232 (55,6%)** |

**Vigtigt fund undervejs — walkover-håndtering:** Nembadminton markerer en spiller der ikke mødte op som
`"Ikke fremmødt"` i stedet for at give normale sætresultater — den række har derfor tomme sæt-felter på
ALLE 3 sæt, ikke bare det tredje. Den første version af rekonstruktionen talte disse som tabte kampe for
"os" uanset hvem der reelt vandt (fordi 0 sæt vs. 0 sæt ikke afgør en vinder), hvilket undervurderede
sejrstallet. Rettet ved at tjekke `players`-listen for `"Ikke fremmødt"` og give modstanderen sejren i så
fald — det var netop denne rettelse der bragte tallene ovenfor så tæt på skærmbilledet. **2 kampe (begge
HD, GSB 2, runde 4 og 8 — "Uden 3. Holdet") kunne IKKE afgøres selv med denne rettelse:** begge sider
har rigtige spillernavne, men alle 3 sæt er tomme og ingen "Ikke fremmødt"-markør — sandsynligvis en
reel mangel i Nembadmintons datagrundlag for den kamp/board, ikke noget der kan udledes. De 2 kampe er
udeladt af totalerne (derfor 310/312 og 232/234 i stedet for præcis 312/234) og markeret tydeligt i den
leverede CSV.

**Konsekvens — samme walkover-gab findes formentlig i den RIGTIGE, live `hent-resultater.js`:** koden
(`apps/netlify-prod/netlify/functions/hent-resultater.js`, linje 148-154) beregner vinder udelukkende ud fra sætoptælling
(`homeSetWins > guestSetWins ? 'Hjemme' : guestSetWins > homeSetWins ? 'Ude' : '?'`) — ingen særlig
håndtering af `"Ikke fremmødt"`. Ved en walkover ville denne kode altså producere `Vinder: '?'`, hvilket
hverken matcher `"Hjemme"` eller `"Ude"` i noget efterfølgende logik (Point-kolonner, SUMIFS, dedup).
**Bemærkelsesværdigt: den RIGTIGE 25/26 Resultater-fane HAR allerede korrekt udfyldte walkover-rækker**
(fx runde 5 GSB4 mod "(Ikke fremmødt)" med `Vinder: Hjemme` og `Point (Hjemme): 1,5` korrekt sat) — men
disse ser ud til at være manuelt rettet af Chris i selve arket (bemærk parenteserne omkring
"(Ikke fremmødt)", som ikke er sådan Nembadminton selv formaterer navnet — sammenlign med den rå
"Ikke fremmødt" uden parenteser fundet direkte i API-svaret under denne undersøgelse), IKKE et resultat
af den nuværende kode. Det betyder koden formentlig stadig vil producere `Vinder: '?'` for enhver NY
walkover der importeres fremover, indtil den rettes til selv at genkende `"Ikke fremmødt"` og give
modstanderen sejren automatisk — en reel, endnu urettet risiko for fremtidige rundeimports, IKKE kun et
historisk 24/25-problem. **Ikke rettet endnu — kun fundet og flaget.** Chris bør spørges eksplicit om han
vil have dette rettet i den rigtige `hent-resultater.js`, ligesom de to tidligere bug-fixes.

**Leverance:** fuld rekonstrueret 24/25-datasæt for GSB 1-3 (594 rækker efter doublesplit, alle 30 kampe,
samme kolonneformat som Resultater-fanen, med en ekstra Note-kolonne der markerer walkover-rækker og de
2 uafgjorte kampe) sendt til Chris som CSV (`resultater_2425_gsb1-3_rekonstrueret.csv`).

**Ikke gjort endnu:**
- `alias_2425`-navnelisten fra `data/navne-alias.json` er IKKE anvendt på datasættet endnu —
  spillernavnene i CSV'en er de rå Nembadminton-navne, ikke matchet mod Tilmeldinger-formatet.
- Intet rigtigt 2024/25 Google Sheet er oprettet, og `seasons.js`'s 24/25-placeholder er urørt.
- Walkover-gabet i den rigtige `hent-resultater.js` er ikke rettet.

Status: **research gennemført og valideret, resultat leveret som fil.** Intet rørt i de rigtige
produktionsfiler under selve rekonstruktionsarbejdet (kun undersøgt/læst `hent-resultater.js` for at
sammenligne dens logik — ingen ændring foretaget).

## Brainstorm: spilleranalyse-/rankings-idéer og statistik-apps (uprioriteret, ikke besluttet)

Rejst efter Chris bad om flere idéer generelt — ingen af disse er aftalt eller igangsat, blot noteret så
de ikke går tabt.

**Til GSB Dream Team specifikt:**
- "Form"/momentum-stat: en spillers vindprocent over de seneste N kampe (rullende), ikke kun
  sæson-totalen — hvem er "hot" lige nu. Se også "Hot streak"-afsnittet nedenfor.
- Modstanderkontekst: Resultater indeholder allerede modstandernavne — kunne vise hvem en spiller
  typisk vinder/taber til, eller hvilke kategorier/modstandere de har det svært mod.
- **"Værdi"-ranking af spillere til fremtidige picks — BEKRÆFTET 2026-08-31, klar til brug i B3/Dream
  Team-statistik.** Idé: kombinér vindprocent med spillefrekvens (kun 8 af 10 picks tæller pr. runde, så
  en spiller der ofte er sat op er mere værd end en med højere vindprocent men sjælden deltagelse) — en
  anbefalingsliste til deltagere der skal vælge deres 10 til næste sæson.
  - **Metode (valideret):** rå sæsontotal-point (samme optælling som Dream Teams egen pointberegning —
    1 point pr. kategori-sejr, matchet på spillernavn i Resultater' Hjemme/Ude-kolonner) bruges direkte
    som værdi-score. Ingen separat vindprocent×frekvens-formel nødvendig — total point kombinerer
    allerede begge dele implicit, fordi en spiller kun optjener point ved BÅDE at vinde OG blive udtaget.
  - **Vigtigt metodefund undervejs:** den oprindelige 24/25-testkørsel brugte fejlagtigt et gammelt
    pivot-tal fra 24/25-arket (spillerens point GANGET med antal gange valgt på et hold) — en mærkelig,
    ubrugelig størrelse. Rettet ved at genberegne 24/25 direkte fra `3_Resultater.csv` med samme
    sejrs-optællingsmetode som ovenfor, hvilket bragte 24/25-tallene ned på samme skala som 25/26 (typisk
    single-digit til lave 20'ere pr. sæson) — det gør sæsonerne sammenlignelige og en samlet
    flersæsons-rangering meningsfuld.
  - **RETTELSE 2026-08-31 — manglede 1,5x-pointreglen for GSB 3./4. hold i 24/25-genberegningen.**
    `docs/dream-team-brief.md` fastslår Dream Teams officielle regel: "1 point pr. sejr ... 1,5
    point hvis spilleren er på GSB 3./4. hold". 25/26-tallene har altid været korrekte (de kommer fra det
    rigtige Spillerpoint-ark, som allerede regner med 1,5x — bekræftet direkte i `resultater_2526.csv`s
    `Point (Hjemme/Ude)`-kolonner: GSB 1/2 giver `1`, GSB 3/4 giver `1,5`). Men den manuelle
    24/25-genberegning (nødvendig fordi 24/25's egen Spillerpoint-fane var en ubrugelig pivot-stat, se
    ovenfor) gav fejlagtigt alle sejre 1 point uanset hold — GSB 3 fandtes i 24/25 (GSB 4 gjorde ikke).
    Rettet: 69 spillere fik deres 24/25-point opjusteret (fx Marie Gotfred Johansen 14→15, Helle
    Mathiasen 10→12, Oliver Guldbæk 11→12) — ingen ændringer for GSB 1/2-spillere.
  - **Testet på rigtig data (KORREKT, m. 1,5x-regel), top 8 herrer + top 6 damer, samlet 2024/25+2025/26:**
    Herrer: Jonas Trusell-Jensen (32, 14+18), Kenn Blæsbjerg Christensen (30, 15+15), Malthe Baltzer
    (28, 11+17), Oliver Frei (26, 15+11), Jonathan W. Hansen (24, 13+11), Kenneth Hasselby (23, 12+11),
    Oliver Guldbæk (22, 12+10), Holger Lindholm (18, KUN 25/26 — ⚠️ har kun spillet 1 sæson, ville
    formentlig ligge højere med data for begge).
    Damer: Line Nielsen (28, 18+10), Marie Gotfred Johansen (26, 15+11), Michelle Christensen (21, 16+5),
    Helle Mathiasen (19,5, 12+7,5), Simone Møller Jensen (19, 10+9), Signe Aarøe Jørgensen (17,5, 7+10,5).
  - **Konsekvens for en fremtidig implementering:** en spiller der kun har data for én sæson skal
    tydeligt markeres (fx "kun 1 sæson") i stedet for at blive skjult eller fejlagtigt ligne "svagere" end
    spillere med to sæsoners data — se Holger Lindholm-eksemplet ovenfor.
  - Status: metoden er bekræftet at virke godt på rigtig data. Ikke bygget som feature endnu — klar til
    at indgå i B3's statistik-katalog når/hvis Chris vil have den bygget.
- **"Effektivitet"-ranking (udnyttelsesgrad pr. kamp spillet) — BEKRÆFTET 2026-08-31, klar til brug i
  B3/Dream Team-statistik. Adskilt stat fra "værdi"-ranking ovenfor, måler noget andet.**
  - **Problemet Chris rejste:** rå sæsontotal-point (værdi-rankingen ovenfor) favoriserer spillere der
    får spillet flere kampe — en topholdsspiller (GSB 1/2, 11-12 runder) har simpelthen flere chancer for
    at optjene point end en bundholdsspiller (GSB 3/4, ned til 7 runder), uafhængigt af hvor god de er.
    Total-point måler altså "hvor meget værdi har spilleren leveret i praksis", ikke "hvor god er
    spilleren pr. kamp" — det er to forskellige og begge nyttige spørgsmål.
  - **Første forsøg — ren vindprocent (sejre/kampe) — VISTE SIG UPÅLIDELIG på små stikprøver:** testet
    på rigtig data, og toppen af listen domineres af spillere med kun 2 kampe og 100% sejr (fx Oliver
    Kirk, Mingrui Zhag, flere andre — alle 2/2). Statistisk støj, ikke et reelt signal om spillerkvalitet.
  - **Løsning — Bayesiansk-justeret vindprocent (regression mod ligagennemsnittet), testet og bekræftet
    fair på rigtig data:** `justeret% = (sejre + K × liga_gennemsnit) / (kampe + K)`, hvor
    liga_gennemsnit = 50% (naturligt, da hver kamp har præcis én vinder) og K er en "tillids-vægt" sat
    til 8 kampe i testen — en spiller med få kampe trækkes automatisk mod 50%, mens en spiller med mange
    kampe og en ægte høj vindprocent forbliver højt placeret. Løser præcis 2-kamps-100%-problemet uden en
    hård/vilkårlig minimums-kamp-grænse.
  - **Testet på rigtig data (24/25+25/26 samlet), top 8 herrer/top 6 damer efter justeret vindprocent:**
    Herrer: Holger Lindholm (78,6% justeret, rå 90,0%, 18/20 kampe), Kenn Blæsbjerg Christensen (73,9%,
    rå 78,9%, 30/38), Jonas Trusell-Jensen (66,7%, rå 69,6%, 32/46), Tobias Weinreich Hansen (65,6%, rå
    70,8%, 17/24) — bemærk hvordan flere spillere med kun 4 kampe og 100% rå vindprocent (fx Frederik
    Balmer Odgaard, Rasmus Jakobsen, Kasper Klitgaard) trækkes ned til en mere fair ~66,7% i stedet for
    at ligge øverst.
    Damer: Liselotte Seider (75,0% justeret, rå 100%, 8/8), Hanne Meinertz Hagendal (72,2%, rå 90%,
    9/10), Tina Skov Mikkelsen (70,0%, rå 83,3%, 10/12), Camilla Edfors Terkildsen (68,8%, rå 87,5%, 7/8).
  - **Note om 1,5x-pointreglen for GSB 3./4. hold:** effektivitets-stien ovenfor bruger sejre/kampe (ren
    kamp-udfald), IKKE fantasy-point — den er derfor uberørt af Dream Teams 1,5x-pointregel for GSB 3./4.
    hold (se rettelsen i værdi-ranking-punktet ovenfor). De to stats besvarer bevidst to forskellige
    spørgsmål: "værdi" måler fantasy-pointproduktion (hvor 1,5x-reglen hører hjemme, fordi det ER den
    officielle pointregel), "effektivitet" måler ren spillerkvalitet uafhængigt af hvilket hold/pointregel
    spilleren tilhører.
  - **Konklusion — de to stats supplerer hinanden, byg gerne begge:** "værdi" (total point) besvarer
    "hvem leverede mest i praksis givet den plads de fik", "effektivitet" (justeret vindprocent) besvarer
    "hvem er bedst pr. kamp, uanset holdplacering". En spiller kan sagtens ligge højt på den ene og lavere
    på den anden (fx en stærk bundholdsspiller med høj effektivitet men lav total-værdi pga. færre kampe).
  - **Åbent spørgsmål 2026-08-31 — er Bayesiansk shrinkage den bedste metode?** Chris spurgte om der er
    bedre alternativer. Sammenlignet på rigtig data (top 8 herrer): Bayesiansk (K=8), Wilson-nedre-grænse
    (95%-konfidensinterval, parameterfri ift. K, velkendt fra "fair ranking"-brug som Reddit/Steam-
    anmeldelser) og simpel minimumsgrænse (kun spillere med 15+ kampe, ren rå vindprocent). Alle tre gav
    nogenlunde samme top 3-4 (Holger Lindholm, Claus Christophersen, Kenn Blæsbjerg Christensen går igen),
    men rækkefølge og hvem der lige akkurat kommer med varierer. Minimumsgrænse er simplest at forklare
    men kasserer data og skaber en hård "klippe" ved grænsen; Wilson er stort set lige så simpel som
    Bayesiansk i en Sheets-formel og har ingen vilkårlig K-parameter at vælge. **Langsigtet, mest
    robuste svar: B4's ELO-ratingsystem** (se `docs/idebank-kampsystem.md`) — en ELO-rating
    håndterer i forvejen både kampantal (K-faktor-opdatering regner naturligt mod middelværdien ved få
    kampe) OG modstanderstyrke (i modsætning til alle tre ovenstående, som kun ser på sejr/tab, ikke hvor
    svær modstanderen var) — når/hvis B4 bygges, kunne den samme ELO-rating potentielt genbruges direkte
    som denne "effektivitet"-stat, i stedet for en separat beregning. Ikke besluttet hvilken metode der
    skal bruges endeligt — afventer Chris' valg.
  - Status: metode og formel bekræftet at virke godt på rigtig data, flere alternative metoder undersøgt
    og sammenlignet. Ikke bygget som feature endnu, og endeligt metodevalg ikke låst — klar til B3's
    statistik-katalog sammen med værdi-rankingen ovenfor, når Chris har valgt metode.
- Deltager-mod-deltager sammenligning: vælg to Dream Team-deltagere og se deres runde-for-runde
  pointudvikling direkte mod hinanden (linje-graf), ikke kun den samlede stillingstabel.
- Udnyttelsesgrad af egne picks: for en given deltager, hvor ofte bliver hver af deres 10 valgte
  spillere faktisk sat op og tæller med i top-8 — hjælper til at vurdere om ens hold er for tyndt/bredt.
- **Nye idéer tilføjet 2026-08-31, inspireret af andre fantasy-ligaer (amerikansk fodbold, baseball):**
  - Sejrs-/taberstreaks og rekordbog: længste vinderstreak/taberstreak for en spiller eller en
    Dream Team-deltager, højeste enkelt-runde-score nogensinde, "biggest blowout"-runde — en historisk
    rekordside der vokser sæson for sæson.
  - Head-to-head/rivalisering mellem Dream Team-deltagere: lifetime-rekord mellem to specifikke
    deltagere på tværs af sæsoner, hvem har historisk klaret sig bedst mod hvem.
  - Mest forbedrede spiller ("breakout"): størst positiv ændring i sæsonpoint fra én sæson til næste.
  - Konsistens vs. spike: andel runder en spiller ligger over sit eget gennemsnit (pålidelig spiller)
    vs. få kæmpestore runder men ellers lavt (boom/bust-spiller) — begge kan fremhæves forskelligt.
  - Aldersgruppe-sammenligning: gennemsnitspoint pr. runde for yngre vs. ældre spillere — kan kobles på
    B3's eksisterende Ung/Sen/Vet-filtrering.
- Klub-niveau stats uafhængigt af Dream Team: samlet vindprocent for klubben på tværs af alle hold i en
  sæson — kan være relevant specifikt for bestyrelsen, adskilt fra fantasy-ligaen. **Landet som B3, se
  planlagte-features-spec.md.**
- Automatisk afbudsregistrering via `cancellationCollectorPublic` (se `docs/nembadminton-api.md`) — hvis
  GSB opretter/allerede har en CancellationCollector i Nembadminton, kunne "manglende spillere pr. runde"
  potentielt trækkes automatisk i stedet for at blive vurderet manuelt.

**Andre potentielle statistik-apps (jf. app-vælger-idéen i `docs/idebank-feature.md`):**
- Ungdomsstatistik-app: nu hvor ungdomskampe kan hentes samme vej som seniorkampe (se
  `docs/nembadminton-api.md`), kunne en helt ny, separat app vise ungdomsspilleres resultater/udvikling
  på tværs af alle U9-U19-rækker — potentielt meget nyttigt for trænerne specifikt. **Landet som en del
  af B3 (Klubstatistik dækker nu ungdom, senior og veteran samlet).**
- Ranglistepoint-udvikling: `memberStats`/`highestPointGain` (se `docs/nembadminton-api.md`) kunne
  bruges til en simpel app der viser en spillers ranglistepoint over tid — uafhængig af Dream Team,
  relevant for både senior og ungdom. Bemærk: samme begrænsning som Tilmeldingsniveau (se
  `docs/idebank-generel.md`) kan gælde her — bør tjekkes om HS/HD/MxH-historikken også stopper for
  tidligt til at være retvisende som "aktuel" graf, eller om kun Tilmeldingsniveau-snapshottet er ramt.
- Kampkalender/-oversigt: **landet som B1**, se `docs/planlagte-features-spec.md`.

Status: rå brainstorm, ikke prioriteret, intet kodet.

## GSB Dream Team forside — "Hot streak"-visning (idé rejst 2026-08-31)

Chris vil gerne have en sjov "hot streak"-visning på GSB Dream Team's forside — hvem er "varm"
lige nu. Overlapper med den allerede eksisterende brainstorm-idé "Form"/momentum-stat ovenfor, men
denne gang eksplicit tænkt som noget synligt PÅ selve forsiden, ikke kun begravet inde i
Statistik-siden. Ikke udfoldet i detalje endnu — kunne være pr. Dream Team-deltager (fx ugens
højeste pointoptag) eller pr. spiller (vindprocent-stigning over de seneste runder) — afklares
senere.

Status: ren idé, ikke besluttet, intet bygget.
