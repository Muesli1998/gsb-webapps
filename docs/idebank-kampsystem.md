# GSB Dream Team – Kampsystem/ELO idébank

Alt om ELO-rating + automatisk rundefordeling til træning (B4). Udskilt fra hoved-idébanken
2026-09-04 fordi dette afsnit fik hyppige runde-for-runde opdateringer og gjorde hoved-filen
langsom at redigere. Se `docs/idebank-feature.md` for resten af idébanken og
`docs/historik/driftlog.md` for det kronologiske shippet/testet-log.

**Ældre, lukket/superseret historik (2026-08-31 til og med 2026-09-05's "40/10-baner"-bug, som
Chris afviste løsningen på) er arkiveret 2026-09-06 i `docs/historik/idebank-kampsystem-historik.md`
for at holde denne fil under kontrol — filen var vokset til ca. 68.000 tegn. Se den fil for den
oprindelige B4-scoping, SUT/Ungsenior/Motionist-grupperne, kønsseeding, banekapacitets-forsøg m.m.
Nedenfor fortsætter den aktive tråd fra Chris' afvisning ("uha nej") og den nye
banekapacitets-planlægger, der erstattede den.**

## OPDATERING 2026-09-05 (fjerde runde) — Chris afviste "altid double"-rettelsen; ny banekapacitets-planlægger + "Bekræft runde"-feature BYGGET I PREVIEW

Chris' svar på rettelsen ovenfor, verbatim:

> "uha nej til 1. Det skal stadig være muligt at køre singler selvom de har valgt double, du bliver
> bare nødt til at sørge for at den tjekker hvor mange doubler der er nødvendige før du starter med
> at lave kampe. f.eks. 36 spillere dukker op, så tjekker vi at der kan være 8 doubler og 2 singler,
> og så ser vi om vi kan lave singler hvis ikke der er nødt til at være en teknikbane eller
> udskiftningssingle.
>
> Det kan være at det er nødvendigt at have et aktivt "teknikbane" valg før vi laver kampene?
>
> Vi bliver nødt til at have en "bekræft runde" efter generer runde, så alle de valg vi tager (#
> gange du sidder over) ikke tælles hver gang vi genererer, men kun når vi bekræfter.
>
> Er det muligt at lave en "det her spiller spillerne normalt til holdkampe" som så tager forrang
> til deres kategorier? f.eks. Jonas trussel spiller normalt single og HD til holdkampe, og burde
> egentlig kun spille mix hvis det er valgt til ham?"

Fire distinkte punkter i denne besked, behandlet hver for sig:

### 1. Rettelsen omgjort — banekapacitets-bevidst planlægger erstatter "altid double"

Den forrige rettelses regel ("en fleksibel spiller havner ALTID i double/mixed, ALDRIG i single,
medmindre single er eneste valg") løste ganske vist Chris' konkrete 40/10-eksempel, men gjorde det
ved at fjerne single som reel mulighed for enhver spiller der også har double valgt — hvilket Chris
eksplicit ikke ønsker. Erstattet med en rigtig optimering: `genererRunde()` deler nu de
fremmødte kandidater i tre grupper — rene single-spillere, rene holddisciplin-spillere, og
"fleksible" spillere (single + mindst én holddisciplin) — og afprøver EFFEKTIVT ALLE mulige antal
`x` fleksible spillere sat til single (fra 0 til alle), beregner for hver `x` det forventede
samlede oversiddertal INKLUSIV banekapacitets-beskæring (hvis der genereres flere kampe end der er
ledige baner, skæres de dyreste kampe væk — single koster 2 spillere pr. skåret kamp, double/mixed
koster 4), og vælger det `x` der giver færrest oversiddere. Ved uafgjort foretrækkes først højere
baneudnyttelse, dernæst FLERE singler (ikke færre) — modsat den gamle, afviste regel. Resultatet:
singler bruges nu, når banematematikken rent faktisk tillader det, og kun skæres væk når det
reelt sparer oversiddere. Verificeret præcis mod Chris' eget eksempel: 36 spillere (single+double),
10 baner → algoritmen vælger selv 8 doubler + 2 singler, alle 10 baner brugt, 0 oversiddere
(`test_bane_kapacitet_36.js`). Det oprindelige 40-spiller/10-bane-scenarie giver fortsat 10 rene
doubler + 0 oversiddere (det er her den matematisk optimale løsning, ikke fordi single er
udelukket) — `test_bane_kapacitet.js` fortsat bestået.

Den gamle "altid team"-kode (den grådige rebalancerings-loop fra tredje runde) er fjernet helt og
erstattet af denne nye eksplicitte optimering — ikke lagt oven på den.

### 2. "Teknikbane"-toggle før kampgenerering — svar til Chris

Den nye banekapacitets-planlægger løser i praksis den underliggende bekymring uden at kræve et
separat, forhåndsvalgt "teknikbane"-felt: fordi planlægningen sker FØR kampene dannes (ikke
bagefter, som tidligere), undgås unødvendige oversiddere allerede i selve fordelingen — der er
sjældnere behov for at gribe til teknikbane/udskiftningssingle som en efterfølgende nødløsning.
Den eksisterende "Send til teknikbane"-knap (bygget i BYGGERUNDE 2026-09-04, se punkt 1 ovenfor)
dækker fortsat de tilfælde hvor der reelt bliver oversiddere — ad hoc, når det opstår, i stedet for
som et fast forhåndsvalg. Vurdering: en dedikeret, forhåndsreserveret teknikbane (et separat
banetal der IKKE indgår i selve kampfordelingen, altid ledig til den/de spillere der har mest
brug for teknik) er stadig en mulig selvstændig feature, men ikke nødvendig for at løse selve
banekapacitets-problemet — det er allerede løst af punkt 1. Afventer Chris' bekræftelse på om han
stadig ønsker et dedikeret teknikbane-forhåndsvalg som separat feature, eller om den eksisterende
ad hoc-knap er tilstrækkelig nu.

### 3. "Bekræft runde" — bygget

Ny topolog for `genererRunde()`: funktionen PREVIEWER nu kun en runde (beregner kampe og
oversiddere, viser dem i UI'et) uden at røre `oversidderTaeller` eller `rundeTaeller` —
regenerering (fx efter at rette fremmøde/lås-valg) koster derfor intet, uanset hvor mange gange
man trykker "Generér runde". Nye globals `pendingOversiddereForRunde` (de(n) spiller(e) der ville
sidde over, hvis runden bekræftes som den står) og `rundeErBekraeftet` (false lige efter
generering). Ny knap "✅ Bekræft runde" øverst i runde-visningen, og en ny funktion
`bekraeftRunde()`, som er DET ENESTE sted `oversidderTaeller` og `rundeTaeller` rent faktisk
forhøjes. Sikkerhedsnet: registreres første kampresultat før runden er bekræftet, bekræftes den
automatisk i samme øjeblik (man skal ikke kunne registrere resultater på en runde der aldrig
tæller). "Nulstil runde" er opdateret til kun at rulle tælleren tilbage hvis runden REELT var
bekræftet — en ubekræftet, kun-kladde runde kan altså nulstilles helt gratis. Verificeret med
en ny "Test 3b" i `test.js`: tælleren rører sig ikke efter flere regenereringer, men mindst én
spillers tæller stiger efter `bekraeftRunde()` kaldes; "Test 4" (nulstil-rollback) opdateret til
at bekræfte runden først, så rollback-scenariet stadig er meningsfuldt.

### 4. "Normalt spiller X til holdkampe" — Jonas Trussel-eksemplet, DESIGN FÆRDIGGJORT 2026-09-05, IKKE bygget endnu

Chris' idé: en spiller kan have en fast, gemt "normal holdkamps-kategori" (fx Jonas Trussel:
normalt single + herredouble til holdkampe), som skal tage FORRANG over deres almindelige
per-runde kategori-afkrydsning i Kampsystemet — dvs. Jonas burde som udgangspunkt kun tilbydes
Mixed double hvis det er eksplicit valgt for ham denne runde, ikke automatisk fordi han (måske)
også har mixed afkrydset generelt.

**Datakilde afklaret: manuelt felt, IKKE API.** Chris spurgte om match-tal ("kampe") pr. disciplin
kunne læses fra API'et i stedet for at kræve manuel indtastning. Undersøgt: Nembadmintons API (som
resten af Kampsystem bruger) giver kun POINT pr. disciplin, ikke antal kampe. Antal kampe pr.
disciplin findes kun på badmintonplayer.dk's gamle ranglisteside (offentlig, men kræver
skrøbelig browser-automatisering af en gammel ASP.NET-side — allerede noteret som delvist ustabil
i tidligere research, se `docs/nembadminton-api.md`s afsnit om version-dato-vælgeren). Selv hvis
det virkede pålideligt, er "flest kampe i denne disciplin i sæsonen" ikke nødvendigvis det samme
som "den rolle træneren har besluttet spilleren har" (en skade eller en enkelt ad hoc-kamp kan
forvride tallet). **Chris' beslutning: manuelt felt, ikke API-automatisering.**

**UI-form afklaret: afkrydsningsfelter pr. kategori, IKKE en 3-valgs dropdown.** Chris' oprindelige
forslag ("Singlespiller"/"Doublespiller"/"Lige meget") ville ikke kunne udtrykke Jonas' tilfælde
præcist (single OG double, men ikke mix). Chris bekræftede afkrydsningsfelter som den rigtige
løsning, og præciserede samtidig selve holdkamps-strukturen bag idéen: **til en holdkamp spiller
ALLE spillere to kampe — deres eget køns double (HD for herrer, DD for damer) er obligatorisk for
alle, og den ANDEN kamp er enten single eller mixed double.** Det betyder at "Single vs.
Double-spiller"-skellet fra Chris' første formulering reelt handlede om single-vs-mix (ikke
single-vs-double, som ordene ellers antydede) — double er i praksis altid en del af en spillers
normale rolle. Dette ændrer ikke selve UI-designet (tre uafhængige afkrydsningsfelter dækker
enhver kombination præcist, uanset hvilken af de tre der reelt varierer i praksis), men er en
nyttig kontekst at kende, hvis nogen på et tidspunkt vil bygge et smartere forudfyldt startsæt
(fx "double altid checket som udgangspunkt for holdkampsspillere").

**Design, klar til bygning:**
- Nyt permanent felt pr. spiller: `normalKategorier` (`{single, double, mixed}`, samme struktur
  som den eksisterende per-runde `modes`-struktur), redigerbart som et nyt sæt afkrydsningsfelter
  i roster-tabellen, samme sted som `tvungenSpil`/køn i dag. Ikke sat = `null`/ingen begrænsning
  (samme adfærd som i dag for alle spillere, indtil nogen aktivt sætter feltet).
- **"Tager forrang"-mekanikken: FORUDUDFYLDNING, ikke hård begrænsning** (Chris' eget eksempel,
  "burde egentlig kun spille mix hvis det er VALGT til ham", peger på et fornuftigt udgangspunkt,
  ikke en spærring). Når en spiller markeres til stede, initialiseres deres per-runde
  kategori-afkrydsning (`modes`) fra `normalKategorier` HVIS feltet er sat for den spiller —
  ellers falder det tilbage til nuværende adfærd (alle kategorier de har en rating til, som i
  dag). Chris kan altid overstyre manuelt for den enkelte runde bagefter — feltet ændrer kun
  startpunktet, ikke en permanent spærring.
- **Gælder kun de spillere hvor det eksplicit sættes.** Ingen krav om at udfylde det for alle —
  spillere uden et sat `normalKategorier`-felt opfører sig helt som i dag.

**BYGGET 2026-09-05, samme session:** Chris' "lad os prøve at bygge de ting vi snakkede om" læst
som "byg det" for punkt 4 (designet var netop færdiggjort og var det eneste af de fire punkter der
endnu ikke var bygget eller besvaret).

- Nyt felt `normalKategorier` (`{single, double, mixed}`, alle `false` som udgangspunkt = "ikke
  sat") tilføjet på alle fire steder roster-objekter oprettes (`ROSTER_INITIAL`-mapping,
  Sheets-hentnings-mapping, `tilfoejFraSoegning()`, `opretNySpiller()`).
- Ny kolonne "Normal rolle (holdkamp)" i roster-tabellen (punkt 1), med tre uafhængige
  afkrydsningsfelter (Single/Double/Mix) pr. spiller, redigerbare direkte i tabellen — samme sted
  som "Skal spille" og køn.
- Ny hjælpefunktion `forudfyldModesFraNormal(p)`: når en spiller går fra ikke-til-stede til
  til-stede (både enkeltvis via "Til stede"-fluebenet og via "Vælg alle til stede"), initialiseres
  spillerens `modes` (kategorierne for DENNE runde) fra `normalKategorier`, HVIS mindst én af de
  tre er sat — ellers uændret adfærd (falder tilbage til `defaultModes()`, som i dag). Rent
  udgangspunkt, ikke en spærring — Chris kan altid afkrydse/fjerne kategorier manuelt for den
  enkelte runde bagefter, præcis som hele tiden.
- Et objekt hvor alle tre er `false` tæller som "ikke sat" — ingen separat aktiv/inaktiv-flag
  nødvendig, holder datamodellen simpel.

**Verificering:** ny dedikeret test (`test_normal_kategorier.js`), fem deltest: (A) en spiller uden
`normalKategorier` sat falder korrekt tilbage til `defaultModes()` ved fremmøde; (B) Jonas
Trussel-scenariet reproduceret præcist — `normalKategorier = {single:true, double:true,
mixed:false}`, markeres til stede, ender med `modes = {single:true, double:true, mixed:false}`
(IKKE mixed, selvom han har en mix-rating og tidligere per-runde-tilstand havde mixed sat), og
UI-checkboksene for "denne runde" opdateres synkront; (C) manuel overstyring af en enkelt
kategori virker stadig efter forudfyldningen; (D) redigering af "Normal rolle"-afkrydsningsfelterne
opdaterer `normalKategorier` korrekt; (E) samme forudfyldning sker via "Vælg alle til stede", ikke
kun ved enkeltvis fremmøde-fluebeb. Alle fem bestået. Hele den eksisterende regressionssuite
(`test.js` inkl. Test 3b, `test_koen.js`, `test_mixed_koen_force.js`, `test_ny_spiller_koen.js`,
`test_runde5_features.js`, `test_bane_kapacitet.js`, `test_bane_kapacitet_36.js`) kørt igen mod
den samlede, opdaterede `kampsystem_source.html` — alle bestået, ingen regressioner.

**Leveret:** opdateret `kampsystem_source.html` og en ny `kampsystem_preview_standalone.html`
sendt til Chris, samt `kampsystem_source.html` skrevet tilbage til
`kampsystem/` via enhedsbroen (ingen drift fundet — mtime matchede sidste
commit). Ingen produktionsfiler rørt.

**Bevidst IKKE gjort denne omgang:**
- `normalKategorier` er ikke gemt til Google Sheets — samme situation som `oversidderTaeller`/
  `tvungenSpil`, nulstilles ved genindlæsning/næste session. Kan tilføjes som en ny
  `ELO_Spillere`-kolonne hvis Chris ønsker det bevaret på tværs af aftener.
- Ingen forsøg på at udlede/forudfylde "double altid checket" som en generel regel for
  holdkampsspillere (nævnt som mulig fremtidig finpudsning i designet ovenfor, men ikke bedt om
  eksplicit) — feltet er helt frit, tre uafhængige afkrydsningsfelter uden nogen indbygget antagelse.

Status: **alle fire punkter fra Chris' 2026-09-05-besked er nu bygget eller besvaret: punkt 1
(banekapacitets-planlægger) og punkt 3 (Bekræft runde) bygget i tredje BYGGERUNDE-runde samme dag,
punkt 2 (teknikbane) besvaret i prosa, og punkt 4 (Jonas Trussel-normalkategorier) nu også bygget
og testet i preview-kilden — afventer Chris' fornyede test af den opdaterede standalone-fil.**

## OPDATERING 2026-09-05 (femte runde) — Siden delt i 3 faner ("Kør runde"/"Spillere"/"Historik & statistik"), BYGGET I PREVIEW

Chris: "Nu syntes jeg at der kommer riiiigtig mange informationer ind på den her hovedside, især
for trænerne. Er det muligt at flytte nogle af valgene og dataoversigterne til et andet sted." Med
punkt 4 (normalKategorier) lige bygget var siden vokset til 8 kort på én lang side (0. tilføj
spiller, 1. fremmøde+kategorier med nu 6 kolonner, 2. opsætning, 3. lås kampe, 4. generér, 5. H2H,
kamplog, spillertrup/ratings) — for meget for en træner der bare skal i gang med en træning.

**Afklaret med Chris før bygning (to spørgsmål):**
1. Faneopdeling: 3 faner — "Kør runde" (det man bruger HVER gang: fremmøde+kategorier, opsætning,
   lås kampe, generér/bekræft/registrér), "Spillere" (tilføj/opret spiller + de administrative
   pr.-spiller-felter), "Historik & statistik" (H2H, kamplog, spillertrup/ratings). Bekræftet.
2. Skal selve roster-tabellen i "Kør runde" også barberes ned? Bekræftet ("ja barber ned"), MED to
   ekstra krav: (a) ændringer på Spillere-fanen skal slå igennem på Kør runde-fanen (ikke stå i to
   forskellige, evt. usynkroniserede kopier af data), og (b) "Normal rolle" skal forenkles til KUN
   Single/Mix — "Alle spillere skal spille HD eller DD, så jeg vil stadig gerne begrænse kun til
   Single/Mix spiller" (dvs. double er underforstået altid en del af en holdkamps-normalrolle, ikke
   noget der skal vælges separat).

**Bygget i `kampsystem_source.html` (kun preview-kilden):**
- Ny fanenavigation øverst i `<main>` (`.faner`/`.fane-btn`), tre fane-indhold-`<div>`er
  (`#fane-koer-runde` synlig som standard, `#fane-spillere`/`#fane-historik` med `hidden`).
  `skiftFane(navn)` skifter aktiv fane OG re-renderer den fane man skifter TIL (`renderRoster()` +
  `opdaterLaasDropdowns()` for Kør runde; `renderSpillerAdminTabel()` + `opsaetGruppeSelect()` for
  Spillere; `renderRatingTable()`/`renderKamplog()`/`opdaterH2HDropdowns()`/`visAlleOpgoer()` for
  Historik) — sikrer at ændringer lavet på én fane altid er friske når man skifter til en anden,
  uden at data nogensinde er duplikeret (samme `roster`-array, kun to forskellige renderinger af
  det).
- **Kør runde-fanen:** punkt 1's roster-tabel barberet ned til 4 kolonner (Til stede / Navn /
  Kategorier denne runde / Rating) — "Skal spille" og "Normal rolle" fjernet herfra.
- **Spillere-fanen:** indeholder nu "Tilføj en spiller fra klubben" (det gamle punkt 0, uændret
  funktionalitet) OG en ny "Spillerindstillinger"-tabel (`renderSpillerAdminTabel()`) — viser ALLE
  spillere (ikke kun til stede/aktive grupper, i modsætning til Kør runde-tabellen, da man skal
  kunne sætte disse felter op uafhængigt af om nogen er til stede lige nu), med "Skal spille" og
  "Normal rolle" flyttet herover.
- **"Normal rolle" forenklet til Single/Mix (Chris' krav 2b):** `renderSpillerAdminTabel()` viser
  kun to afkrydsningsfelter (Single, Mix) i stedet for de oprindelige tre — Double-checkboksen er
  fjernet fra UI'et. `forudfyldModesFraNormal(p)` sætter nu ALTID `double: true` i den anvendte
  `modes`, når `normalKategorier` er aktiv (dvs. single ELLER mixed sat) — uafhængigt af hvad der
  måtte stå i `normalKategorier.double` (det felt bruges ikke længere, men er bevaret i
  datastrukturen for enkelthedens skyld). `harNormalKategorier(p)` opdateret til kun at kigge på
  single/mixed ("aktiv" betyder ikke længere "mindst én af de TRE", men "single eller mixed").
- **Krav 2a (live-synk på tværs af faner):** løst strukturelt, ikke med en særskilt synk-mekanisme
  — `renderRoster()` og `renderSpillerAdminTabel()` læser og skriver begge direkte på det samme
  `roster`-array (samme spiller-objekter, ikke kopier), og begge kaldes altid sammen fra
  `renderRoster()` (som nu selv kalder `renderSpillerAdminTabel()` i slutningen), samt fra
  `skiftFane()` ved fanevisning. En ændring af "Normal rolle" på Spillere-fanen ændrer derfor med
  det samme det underliggende objekt, og bliver anvendt på Kør runde-fanen næste gang spilleren
  markeres til stede (uændret forudfyldnings-tidspunkt fra forrige runde — selve `modes` for en
  ALLEREDE til-stede-værende spiller opdateres ikke retroaktivt, kun ved selve
  til-stede-overgangen, som hele tiden).

**Verificering:** `node --check` på det udtrukne script (syntaksfejlfri). `test_normal_kategorier.js`
omskrevet og udvidet: Test D bekræfter nu at "Normal rolle" kun har 2 afkrydsningsfelter (Single+Mix,
ingen Double) og at de findes i `#spiller-admin-container` (ikke længere `#roster-container`); ny
Test F bekræfter selve faneskiftet (`skiftFane('spillere')` viser Spillere-fanen og skjuler Kør
runde-fanen, og omvendt). Hele den eksisterende regressionssuite
(`test.js` inkl. Test 3b, `test_koen.js`, `test_mixed_koen_force.js`, `test_ny_spiller_koen.js`,
`test_runde5_features.js`, `test_bane_kapacitet.js`, `test_bane_kapacitet_36.js`) kørt igen mod den
samlede, opdaterede `kampsystem_source.html` — alle bestået, ingen regressioner.

**Leveret:** opdateret `kampsystem_source.html` og en ny `kampsystem_preview_standalone.html` sendt
til Chris, samt `kampsystem_source.html` skrevet tilbage til `kampsystem/`
via enhedsbroen (ingen drift fundet). Ingen produktionsfiler rørt.

**Bevidst IKKE gjort denne omgang:**
- Ingen ændring af selve `normalKategorier`-datastrukturen (stadig `{single, double, mixed}`
  internt) — kun UI'et og forudfyldnings-logikken er ændret til at ignorere/altid-sætte `double`.
  En fremtidig oprydning kunne fjerne `double`-feltet helt fra datastrukturen, men det er ikke
  gjort her for at minimere ændringsomfanget.
- Fane-tilstanden (hvilken fane der er aktiv) gemmes ikke nogen steder — siden starter altid på
  "Kør runde" ved genindlæsning, hvilket virker som det rigtige udgangspunkt for en træner der
  åbner siden op til en træning.
- Selve Claude-artifact-URL'en (hele `gsb_preview.html`-site-shell'en) er fortsat ikke genbygget —
  samme afgrænsning som tidligere runder.

Status: **bygget og testet i preview-kilden — afventer Chris' fornyede test af den opdaterede
standalone-fil.**

## OPDATERING 2026-09-05 (sjette runde) — "Skal spille" flyttet tilbage til Kør runde, ny "↻ Opdater"-knap, BYGGET I PREVIEW

Chris, straks efter faneopdelingen: "Hov, skal spille skal være på runde siden sorry. Det er en
ting der skifter per træning. Der skal gerne være en 'opdater' knap i toppen af rundesiden der
sørger for at spillernes ... kategorier denne runde som standard følger de valgte fra spillersiden.
Så kan man selv vælge kategorier denne runde efter, men 'opdater' burde gå tilbage til standarden
når den trykkes."

**"Skal spille" flyttet tilbage:** var forkert placeret på Spillere-fanen ved femte runde — det er
en per-træning-indstilling (ligesom "Kategorier denne runde"), ikke en fast spillerindstilling som
"Normal rolle". Nu tilbage i roster-tabellen på "Kør runde"-fanen (punkt 1), fjernet fra
`renderSpillerAdminTabel()`. Kun "Normal rolle" (Single/Mix) er tilbage på Spillere-fanen.

**Ny "↻ Opdater standarder"-knap, øverst på Kør runde-fanen (nyt kort, før punkt 1):** kalder
`opdaterStandarder()`, som nulstiller `modes` ("Kategorier denne runde") til standard for ALLE til
stede spillere — beregnet via ny hjælpefunktion `standardModesFor(p)` (`normalKategorier` hvis
aktiv, ellers `defaultModes(p)`). Dækker hullet at den eksisterende bløde forudfyldning
(`forudfyldModesFraNormal`) kun sker PRÆCIS i øjeblikket en spiller går fra ikke-til-stede til
til-stede — ændrer man en spillers "Normal rolle" på Spillere-fanen EFTER de allerede er markeret
til stede for den aktuelle runde, ville det ellers ikke slå igennem uden at fjerne/gentilføje
fluebenet manuelt. Vigtig forskel fra `forudfyldModesFraNormal`: "Opdater" er et EKSPLICIT,
fuldstændigt tilbage-til-standard-tryk — det nulstiller ALLE til stede spillere (også dem UDEN en
normal rolle, tilbage til `defaultModes`), ikke kun dem med en aktiv normal rolle. Spillere der
ikke er til stede røres slet ikke.

**Verificering:** `test_normal_kategorier.js` udvidet: Test D bekræfter nu eksplicit at "Skal
spille" IKKE findes i `spiller-admin-container`; ny Test D2 bekræfter at "Skal spille" er tilbage i
`roster-container`; ny Test G dækker selve `opdaterStandarder()` — en til stede spiller med en
normal rolle nulstilles til den (uanset forudgående manuel `modes`-tilstand), en til stede spiller
UDEN normal rolle nulstilles til `defaultModes`, og en spiller der IKKE er til stede rører sig
slet ikke. Hele den eksisterende regressionssuite (`test.js` inkl. Test 3b, `test_koen.js`,
`test_mixed_koen_force.js`, `test_ny_spiller_koen.js`, `test_runde5_features.js`,
`test_bane_kapacitet.js`, `test_bane_kapacitet_36.js`) kørt igen — alle bestået, ingen regressioner.

**Leveret:** opdateret `kampsystem_source.html` og en ny `kampsystem_preview_standalone.html` sendt
til Chris, samt `kampsystem_source.html` skrevet tilbage til `kampsystem/`
via enhedsbroen (ingen drift fundet). Ingen produktionsfiler rørt.

Status: **bygget og testet i preview-kilden — afventer Chris' fornyede test.**

## Åbent spørgsmål fra Chris 2026-09-05: skal "Normal rolle"/"Skal spille" gemmes i et Sheet, eller er "standard på siden" nok?

Chris' spørgsmål, verbatim: "Skal det logges ind i et sheet, eller kan det være standard på siden
og andre kan se de samme standarder som jeg har sat?"

**Svar givet til Chris (ikke bygget — kræver en beslutning fra ham først):** "Standard på siden"
uden et sheet betyder i praksis KUN synligt for den ene browser/session der satte det — der er
ingen delt, central lagring i den nuværende preview-arkitektur ud over selve
`ELO_Spillere`/`ELO_Kampe`-arkene (Fase 1-3's Sheets-persistering, `elo-hent.js`/`elo-gem.js`).
`normalKategorier` og `tvungenSpil` gemmes IKKE derhen i dag (samme situation som
`oversidderTaeller`) — de nulstilles ved genindlæsning og er aldrig blevet delt mellem browsere/
brugere. Skal ANDRE trænere se de samme standarder Chris sætter, kræver det derfor rent faktisk at
blive gemt centralt (i praksis: nye kolonner i `ELO_Spillere`-fanebladet, læst/skrevet af
`elo-hent.js`/`elo-gem.js` på samme måde som `single`/`double`/`mix`) — "standard på siden" alene
(kun i browserens hukommelse) opfylder IKKE ønsket om at andre ser de samme værdier.

**Afventer Chris' beslutning:** (a) gem `normalKategorier` (og evt. `tvungenSpil`, hvis det også
skal være synligt/delt — omend det er en per-træning-ting, så mindre oplagt at gemme permanent) som
nye kolonner i `ELO_Spillere` — kræver ændring af `elo-hent.js`/`elo-gem.js` (production-tilstødende
filer, kræver Chris' eksplicitte "byg det" for netop dette), eller (b) accepter at det kun er
synligt i egen browser indtil videre (fint hvis kun Chris selv sætter runder op lige nu).

Status: **spørgsmål besvaret, ingen kode ændret — afventer Chris' valg af (a) eller (b).**

## OPDATERING 2026-09-05 (syvende runde) — Bugfix: hentFraSheets() nulstillede session-tilstand

**Chris' bug-rapport (verbatim):** "Jeg har lige valgt mix for christoffer müller, og så derefter
trykket opdater. Jeg står stadig med alle 3 kategorier"

**Root cause:** `hentFraSheets()` køres én gang, asynkront, i baggrunden lige efter
sideindlæsning (`hentFraSheets(); // best-effort, opdaterer visningen igen hvis/når den lykkes`).
Hvis netværkskaldet først resolver EFTER at en træner allerede har interageret med siden (markeret
til stede, sat "Normal rolle", ændret "Kategorier denne runde"), overskrev koden hele
`roster`-variablen med et helt frisk array, hvor `tilstede`/`modes`/`normalKategorier`/
`tvungenSpil`/`oversidderTaeller` ALLE blev nulstillet til tomme standardværdier — uanset hvad
brugeren lige havde sat. Det er præcis det Chris oplevede: hans "Mix"-valg for Christoffer Müller
blev visket ud af det baggrunds-hent, og "Opdater" faldt derfor tilbage til `defaultModes()` (alle
3 sande, fordi Christoffer har alle 3 ratings sat: single 2896, double 2917, mix 2929).

**Fix:** `hentFraSheets()` bygger nu en `eksisterende`-Map fra det NUVÆRENDE `roster`-array (før
overskrivning), og bevarer al in-session tilstand (tilstede/modes/normalKategorier/tvungenSpil/
oversidderTaeller) pr. spillernavn på tværs af sheets-hentet. Kun ratings og gruppe opdateres fra
Sheets-dataen. Kun HELT nye spillere (fandtes ikke i det gamle `roster`-array) får friske
standardværdier (tilstede:false, defaultModes, tom normalKategorier).

**Verifikation:** ny test `test_hent_fra_sheets_preserve.js` simulerer forløbet: sætter
tilstede+modes+normalKategorier+tvungenSpil+oversidderTaeller for en spiller, stubber
`window.fetch` til at levere opdaterede ratings, kalder `hentFraSheets()`, og bekræfter at al
in-session tilstand overlever mens ratings opdateres — samt at en helt ny spiller i sheets-dataen
(fandtes ikke før) får korrekte friske standardværdier. Fuld regressionssuite (8 eksisterende
testfiler + den nye) kørt og bestået uden fejl.

**Leveret:** opdateret `kampsystem_source.html` + genbygget `kampsystem_preview_standalone.html`
sendt til Chris, og `kampsystem_source.html` synkroniseret til
`kampsystem/kampsystem_source.html` via device bridge (ingen drift
konstateret før commit).

**Status:** rettet og verificeret. Afventer stadig Chris' svar på det åbne spørgsmål om
Sheets-persistens for normalKategorier/tvungenSpil (se afsnittet ovenfor).

## OPDATERING 2026-09-05 (ottende runde) — "Normal rolle" bygget til at gemme i Sheets (svar på det åbne spørgsmål)

**Chris' svar på det tidligere åbne spørgsmål (verbatim):** "Skal man måske have den data som en
del af sheetet? og så kan man skrive standardroller fra webappen og så undgår man problemrne" —
altså valgte (a): delt Sheets-persistens, fremfor session/browser-only.

**Bygget i preview-kilden (`kampsystem_source.html`, i scope, ingen "byg det" krævet for dette
lag):**
- Nyt felt `normalKategorierRoert` pr. spiller (4 init-steder), sat `true` i checkbox-handleren i
  `renderSpillerAdminTabel()` når en træner selv ændrer "Normal rolle" denne session.
- Ny funktion `gemNormalRolle(p)`: POST'er best-effort (fejler stille i previewet, ligesom
  `hentFraSheets()`) til en ny, endnu ikke-deployet funktion `/.netlify/functions/normalroller-gem`
  med `{spreadsheetId, navn, normalSingle, normalMixed}`, hver gang en "Normal rolle"-checkbox
  ændres.
- `hentFraSheets()`'s merge udvidet: læser nu `g.normalSingle`/`g.normalMixed` fra svaret og bruger
  dem som autoritativ "Normal rolle" for enhver spiller man IKKE selv har rørt (`normalKategorierRoert`)
  i den nuværende session — men bevarer stadig ens egen, lige udførte ændring uændret, hvis et
  baggrunds-hent skulle nå at resolve med en endnu-ikke-opdateret sheets-værdi (samme grundprincip
  som Christoffer Müller-fixet i syvende runde, nu udvidet til selve "Normal rolle"-feltet).
- `tvungenSpil` ("Skal spille") er BEVIDST IKKE en del af denne Sheets-persistens — Chris har
  tidligere præciseret at det er en ren per-træning-indstilling ("Der er en ting der skifter per
  træning"), så den forbliver session-only, som allerede rettet i syvende runde.

**Kandidat-funktionsfiler til Netlify (IKKE deployet, IKKE lagt i `apps/netlify-prod/` endnu — kræver
Chris' eksplicitte "byg det" for netop dette produktions-skridt, jf. den stående regel):**
- `elo-hent_v2-kandidat-2026-09-05.js`: udvider den deployede `elo-hent.js`'s Sheets-range fra
  `ELO_Spillere!A2:F1000` til `A2:H1000`, og returnerer nu også `normalSingle`/`normalMixed`
  (parset fra "TRUE"/"FALSE"-tekst i kolonne G/H) pr. spiller.
- `normalroller-gem.js` (helt ny funktion): finder spillerens række i `ELO_Spillere` via kolonne A,
  og opdaterer KUN `G{række}:H{række}` — rører aldrig `A:F`, som den eksisterende `elo-gem.js` alene
  ejer og overskriver i sin helhed ved hvert "Gem nu". De to gem-veje kan derfor aldrig komme i
  konflikt, uanset rækkefølge.
- `elo-gem.js` er BEVIDST IKKE ændret — "Normal rolle" gemmes udelukkende via den nye, separate
  funktion.

**Tilbageværende trin før dette er reelt live, i rækkefølge (afventer Chris):**
1. Chris tilføjer to nye kolonner til `ELO_Spillere` i det rigtige Google Sheet: G ("NormalSingle")
   og H ("NormalMixed") — overskriftstekst er valgfri, funktionerne bruger kun kolonnebogstaverne.
2. Chris kopierer `elo-hent_v2-kandidat-2026-09-05.js` ind i
   `apps/netlify-prod/netlify/functions/elo-hent.js` (erstatter den nuværende), og
   `normalroller-gem.js` ind som en helt ny fil i samme mappe.
3. Chris' sædvanlige manuelle mappe-overførsel af `apps/netlify-prod/` til Netlify.
4. Kampsystem-siden i produktion (`apps/netlify-prod/public/kampsystem.html`) skal desuden
   OPDATERES med hele denne sessions øvrige `kampsystem_source.html`-arbejde (tab-opdeling,
   normalKategorier-UI, "Opdater standarder"-knap, Christoffer Müller-fixet, og nu denne
   Sheets-gem) — den er stadig IKKE kopieret til produktion, kun til preview-kilden. Kræver
   ligeledes Chris' "byg det", da det er en produktionsfil.

**Verifikation:** ny test `test_normal_rolle_sheets_gem.js` bekræfter (a) et checkbox-klik sætter
`normalKategorier`, markerer `normalKategorierRoert`, og kalder `gemNormalRolle()` med korrekt
payload, og (b) et efterfølgende `hentFraSheets()`-kald bevarer ens egen, lige rørte værdi uændret,
mens en ANDEN spillers ikke-rørte "Normal rolle" korrekt overtages fra den simulerede Sheets-data.
Fuld regressionssuite (10 testfiler i alt nu) kørt og bestået uden fejl.

**Leveret:** opdateret `kampsystem_source.html` + genbygget `kampsystem_preview_standalone.html`
sendt, `kampsystem_source.html` synkroniseret til `kampsystem/` (ingen
drift konstateret før commit), og de to kandidat-Netlify-funktionsfiler sendt som download (ikke
lagt i `apps/netlify-prod/`).

**Status:** frontend + kandidatfunktioner bygget og testet. Afventer Chris' "byg det" for selve
produktionsudrulningen (Sheet-kolonner + funktionsfiler + kampsystem.html-opdatering i
`apps/netlify-prod/`).

## Bug rapporteret 2026-09-05 (samme dag): "10 baner til 40 mennesker gav kun 7 baners kampe" — FUNDET OG RETTET

**Chris' bug-rapport (verbatim):** "øøøh, jeg har valgt 10 baner til 40 mennesker, men den har
kun lavet 7 baners kampe?" Opfølgende afklaring: "Nope, jeg havde ikke engang sat deres
normalkategorier, så alt var tilgængeligt. Vi har også tidligere aftalt at det er muligt at lave
blandede doubler med folk der har et lavere antal point. F.eks. sidder Jonas Trusell, Morten
Aarøe, Oliver Frei, og Kenn over, og der kunne man sagtens lave en normal double der var fair."

**Root cause: double/mixed-fordelingen var køns-blind.** Med ingen `normalKategorier` sat havde
alle spillere alle 3 kategorier tilgængelige (single+double+mixed). Den daværende fordelingslogik
(`skalIHold.forEach` i `genererRunde()`) lagde en spiller i den pulje (double ELLER mixed) der på
det tidspunkt havde færrest medlemmer — helt uden hensyn til køn. Med et kønsskævt fremmøde (flere
herrer end damer denne aften) endte et antal herrer i Mixed-puljen uden nok damer at parre med, og
`formTeamsMixed()`s hårde kønsparring (bygget BYGGERUNDE 2026-09-05, tidligere samme dag) sendte
dem korrekt — men unødvendigt — til "sidder over", selvom de også havde Double valgt, hvor kønnet
er underordnet. Chris' fire navngivne spillere (Jonas Trussel, Morten Aarøe, Oliver Frei, Kenn) er
netop eksemplet på dette: overskydende herrer der kunne have spillet en helt almindelig double
sammen, men i stedet blev fanget i en Mixed-tildeling de ikke kunne fuldføre.

**Fix i `genererRunde()`:** double/mixed-fordelingen er nu kønsbevidst, i tre trin:
1. Spillere der KUN kan spille double eller KUN mixed placeres direkte (intet valg).
2. Spillere der kan BEGGE dele bruges først til at lukke et evt. kønshul i Mixed-puljen (fra
   trin 1's spillere), af det køn der mangler.
3. Resterende "begge dele"-spillere tilføjes til Mixed i afbalancerede par (lige mange
   herrer/damer ad gangen), så længe der er nok af begge køn tilbage til at holde puljen
   balanceret — alt derudover (inkl. spillere med ukendt køn, som aldrig kan garanteres en
   Mixed-makker) sendes til Double, hvor kønnet er underordnet.

**Verifikation:** ny dedikeret test (`test_koen_bevidst_hold_split.js`) reproducerer et
kønsskævt fremmøde (8 herrer inkl. de fire navngivne spillere, 4 damer, alle med alle 3 kategorier
tilgængelige, 10 baner) — bekræfter at alle fire navngivne spillere nu får en kamp (0 af dem
sidder over, mod tidligere at ville være havnet i Mixed uden makker). Fuld regressionssuite (11
testfiler i alt nu, inkl. `test_koen.js`/`test_mixed_koen_force.js` for den eksisterende
kønslogik) kørt og bestået uden fejl — ingen af de tidligere features (banekapacitets-planlægger,
hård Mixed-kønsparring, tvungenSpil, osv.) er påvirket.

**Leveret:** opdateret `kampsystem_source.html` + genbygget `kampsystem_preview_standalone.html`
sendt til Chris, og `kampsystem_source.html` synkroniseret til
`kampsystem/kampsystem_source.html` via device bridge (ingen drift
konstateret før commit). Ingen produktionsfiler rørt.

**Status:** rettet og verificeret — afventer Chris' fornyede test med sit rigtige, kønsskæve
fremmøde.

## OPDATERING 2026-09-05 (samme dag) — "m.bane" aldrig sat (display-bug), + ny "Eksportér testdata"-funktion til fejlsøgning

Chris viste tre skærmbilleder efter den kønsbevidste hold-split-rettelse ovenfor: en meget ulige
double-kamp (76%/24% forventet), teksten "Venter på ledig bane" på en kamp, og en "4 sidder over"-
boks — med kommentaren "Det er godt nok mange mixed doubler lol. Meget ulige double her, samt
mangler der stadig en bane med kamp."

**Fundet ved kodegennemgang: `m.bane` bliver ALDRIG sat noget sted i koden.** `byggMatchCard()`
viser `m.bane ? 'Bane ' + m.bane : 'Venter på ledig bane'` — men ingen linje i hele filen
nogensinde tildeler `.bane` til et kamp-objekt (bekræftet med `grep -n "\.bane\b"` — kun CSS-klassen
`.bane-hurtigvalg` og selve visnings-/opslagslinjerne kom frem, ingen tildeling). Konsekvens: HVER
ENESTE kamp, uanset om den reelt havde fået en af de ledige baner, viste "Venter på ledig bane" —
aldrig et rigtigt banenummer. Det er højst sandsynligt derfor Chris troede der "stadig manglede en
bane med kamp": UI'en sagde bogstaveligt at kampen ventede, selvom den var en af de `paaBane`-kampe
der reelt var placeret. **Rettet:** `paaBane.forEach((m, i) => { m.bane = i + 1; })` tilføjet i
`genererRunde()` lige efter `paaBane` er beregnet.

**Den ulige double (76/24%) og "mange mixed doubler"** er IKKE undersøgt/rettet endnu — kræver
Chris' faktiske fremmøde-data for at kunne reproducere præcist, i stedet for at gætte. Det fører
direkte til punktet nedenfor.

**Ny feature, direkte efter Chris' ønske: "Kan vi lave en måde midlertidigt at trække den
indtastede data fra en runde (samt valg af spillere og kategorier?) så vi kan lave lidt testing
her i chatten?"** — ny knap "🧪 Eksportér testdata" i et nyt kort under punkt 4 (Kør runde-fanen).
`eksporterTestData()` dumper KUN det `genererRunde()` reelt bruger som input — til stede-spillere
(navn/køn/gruppe/ratings/valgte kategorier/tvungenSpil/oversidderTaeller), banetal, hold-filosofi
og evt. fastsatte kampe — som JSON i et tekstfelt, klar til at kopiere og sende. En modstykke-
funktion `importTestData(json)` er også bygget (tilgængelig fra browserens konsol, eller direkte i
en jsdom-test) til at genskabe et konkret fremmøde præcist ud fra et sådant dump — det gør det
muligt for Chris at sende sit faktiske, problematiske fremmøde direkte til test/fejlsøgning her i
chatten, i stedet for at vi gætter os frem via skærmbilleder.

**Verifikation:** ny test `test_bane_nummer_og_debug_export.js` bekræfter (a) genererede kamp-kort
nu viser "Bane N" i stedet for "Venter på ledig bane" når der er nok baner til alle kampe, og (b)
en fuld eksport→nulstil→import-rundtur gengiver samme antal spillere, navne og indstillinger.
Fuld regressionssuite (12 testfiler i alt nu) kørt og bestået uden fejl.

**Leveret:** opdateret `kampsystem_source.html` + genbygget `kampsystem_preview_standalone.html`
sendt til Chris, og `kampsystem_source.html` synkroniseret til
`kampsystem/` (ingen drift konstateret før commit).
Ingen produktionsfiler rørt.

**Status:** bane-nummer-bugget er rettet og verificeret. "Eksportér testdata"-knappen er klar til
brug — afventer at Chris sender et eksporteret dump af det problematiske fremmøde (mange mixed
doubler / ulige double), så den underliggende matchnings-fairness kan undersøges præcist i stedet
for på baggrund af skærmbilleder alene.

## OPDATERING 2026-09-05 (samme dag) — "Eksportér testdata" udvidet med selve den genererede runde

Chris' opfølgende spørgsmål: "sender den også de kampe der er genereret?" — svaret var nej, kun
input-siden (fremmøde/kategorier/indstillinger). Rettet: `eksporterTestData()` inkluderer nu også
`genereretRunde` (kampene fra `rundeAlleMatches` — type, bane, deltagere, evt. fastsat/udskiftning
— samt `pendingOversiddereForRunde` og om runden er bekræftet), hvis en runde er genereret. Da hele
`genererRunde()` er 100% deterministisk (ingen `Math.random` i koden), er selve input-dumpet
teknisk set nok til at genskabe samme runde ved re-generering — men outputtet er nu alligevel
inkluderet direkte, så Chris kan sende ÉT dump med både input og det output han faktisk så, i
stedet for at det skal genskabes og antages at stemme.

**Verifikation:** `test_bane_nummer_og_debug_export.js` udvidet til at bekræfte at
`genereretRunde.kampe` er med i dumpet, matcher antallet af viste kamp-kort, og at hvert kamp har
et rigtigt banenummer (efter banenummer-fixet ovenfor). Fuld regressionssuite (12 testfiler) kørt
og bestået.

**Leveret:** opdateret `kampsystem_source.html` + genbygget `kampsystem_preview_standalone.html`
sendt, og `kampsystem_source.html` synkroniseret til `kampsystem/` (ingen
drift). Ingen produktionsfiler rørt.

**Status:** "Eksportér testdata" dækker nu både input og output — afventer Chris' dump af det
problematiske fremmøde (mange mixed doubler / ulige double fra tidligere i dag) til reel
fejlsøgning.

## OPDATERING 2026-09-05 (samme dag) — Rod-årsag fundet via Chris' eksporterede testdata: grådig Mixed-fordeling gav 9 kampe/4 oversiddere i stedet for 10/0

Chris sendte det fulde JSON-dump fra den nye "Eksportér testdata"-knap (40 til stede spillere, 10
baner) — første gang funktionen faktisk blev brugt til reel fejlsøgning, og den viste sig
uvurderlig: præcis reproduktion i stedet for gætværk.

**Fremmødet var 24 herrer, 15 damer, 1 ukendt køn (Andreas Drasbek).** Den kønsbevidste fordeling
fra TIDLIGERE i dag (se "Bug rapporteret 2026-09-05: 10 baner til 40 mennesker gav kun 7 baners
kampe") havde rettet det oprindelige problem (herrer strandet i Mixed uden makker), men indførte
et NYT, mindre problem: den maksimerede grådigt antallet af Mixed-hold (`ekstraPar = min(24
herrer, 15 damer) = 15`) — men 15 er ULIGE, så matchTeams (som parrer hold to ad gangen) efterlod
ét Mixed-hold (2 spillere) uden modstander. SAMTIDIG efterlod det kun 10 spillere til Double (9
herrer + Andreas), som heller ikke går op i 4 (2 til). Facit: 9 kampe i alt (10. bane ubrugt), 4
oversiddere — og med kun 10 spillere i Double-puljen var der ikke noget rimeligt par til de sidste
fire herrer, hvilket gav den observerede 76/24%-ubalance.

**Rettelse:** double/mixed-fordelingen søger nu (samme mønster som banekapacitets-`bedsteX`
ovenfor) efter det antal Mixed-hold `t` (altid lige mange herrer/damer) der giver FÆRREST
oversiddere totalt — regnet som Mixed-parringens egen rest (ulige `t` giver ét spildt hold) PLUS
Double-puljens rest mod 4 — i stedet for grådigt at maksimere `t`. Ved lige gode løsninger
foretrækkes flest kampe, dernæst højeste `t` (mest mulig brug af Mixed, når det er gratis). For
Chris' faktiske fremmøde giver det `t=14` (ikke 15): 7 Mixed-kampe (28 spillere) + 3 Double-kampe
(12 spillere: 10 herrer + Andreas + 1 dame) = 10 kampe, 0 oversiddere — og den større,
12-mands Double-pulje gav samtidig en langt bedre balanceret kamp (66/34% i stedet for 76/24%).

**Verifikation:** Chris' eksporterede JSON er gemt som `chris_export_40.json` og bruges direkte i
en ny test (`test_chris_repro_40.js`, via `importTestData()`) — bekræfter nu 10 kampe, 0
oversiddere, og en forbedret double-balance på PRÆCIS Chris' egne data (ikke en syntetisk
tilnærmelse). Fuld regressionssuite (13 testfiler i alt nu, inkl. den tidligere
`test_koen_bevidst_hold_split.js` fra samme dags første kønsfix) kørt og bestået — ingen
regressioner.

**Leveret:** opdateret `kampsystem_source.html` + genbygget `kampsystem_preview_standalone.html`
sendt, og `kampsystem_source.html` synkroniseret til `kampsystem/` (ingen
drift). Ingen produktionsfiler rørt.

**Status:** rettet og verificeret mod Chris' egne, faktiske data — afventer hans fornyede test.
Dette var samtidig den første reelle nytteværdi af "Eksportér testdata"-funktionen: gjorde det
muligt at finde den PRÆCISE årsag (24/15-kønsfordeling) i stedet for at gætte.

## Chris' opfølgende test 2026-09-05: individuelle kategori-fravalg (Mixed slået fra for 14 spillere) — VERIFICERET, GIVER MENING

Chris satte "foretrukne kategorier" for de 40 spillere fra ovenstående facit-runde (14 af dem
slog "Mixed" fra, dvs. kun Single+Double tilbage) og bad om at få de to udgaver sammenlignet.

**Analyse (ved kodegennemgang + ny test, ikke kun visuel sammenligning):** de 14 spillere der slog
Mixed fra (11 herrer + 3 damer: Brian, Erik, Hannah, Helle, Jonas Trusell-Jensen, Jonathan Hansen,
Linus, Malthe, Michelle, Oliver Frei, Oscar Donovan, Rasmus, Thor Percy, Tobias) har alle
`double: true` stadig, så de havner automatisk i `kunDobbelt`-gruppen (fast, intet valg). De
resterende 26 spillere (13 herrer + 12 damer + Andreas med ukendt køn) er fortsat
"begge muligheder", og den kønsbevidste banekapacitets-søgning fra sidste rettelse fandt her
`t=12` (alle 12 tilgængelige damer + 12 af de 13 tilgængelige herrer) som det bedste — 6 Mixed-
kampe (0 spild) + 4 Double-kampe (14 kun-double + 1 overskydende herre + Andreas = 16, 0 spild) =
10 kampe, 0 oversiddere. Gennemgået kamp for kamp: INGEN af de 14 der fravalgte Mixed optræder i
en Mixed-kamp, og ingen andre begrænsninger er overtrådt.

**Verifikation:** ny test `test_chris_repro_40_kategorier.js` (data gemt som
`chris_export_40_med_kategorier.json`) bekræfter automatisk: 10 kampe, 0 oversiddere, ingen
Mixed-fravalgt spiller i en Mixed-kamp, og præcis 4 Double-/6 Mixed-kampe som beregnet. Fuld
regressionssuite (14 testfiler i alt nu) kørt og bestået — ingen kodeændringer var nødvendige
denne runde, kun verifikation.

**Konklusion givet til Chris:** resultatet giver mening — kategorivalgene respekteres fuldt ud,
og banekapaciteten udnyttes stadig optimalt (0 oversiddere, alle 10 baner brugt), selv med et
mere skævt udvalg af "fleksible" spillere tilbage til Mixed-balanceringen.

**Status:** afventer Chris' næste test med singler involveret (annonceret: "Så prøver vi senere
med nogle singler involveret osv").

## OPDATERING 2026-09-05 (niende runde) — Andreas Drasbeks køn og August Carl Toftager-Larsens ratings modtaget fra Chris, indsat i roster-data

Chris sendte et skærmbillede af et rangliste-opslag (spiller-ID 140817-03, "August Toftager-Larsen,
Gladsaxe Søborg", tilknyttet brugerkonto "Mia Elizabeth Toftager", sæson 26/27, U13 A-række) med
beskeden: "Andreas er også herre, og august har fået point."

**Andreas Drasbek:** `koen` sat til `"H"` i `KAMPSYSTEM_ROSTER` (`build3.py`) og
`kampsystem_roster.json`. `single`/`double`/`mix` forbliver `null` — Chris har kun bekræftet køn,
ikke sendt nogen rating for Andreas, og der er stadig ingen BD-match for ham i
`gsb_alle_spillere.json` (samme situation som hele sæsonen).

**August Carl Toftager-Larsen:** ratings fra skærmbilledet indsat — Single 1636 (48 kampe),
Double 1449 (36 kampe), tilmeldingsniveau ved sæsonstart 1560, U13 A-række. Der var INGEN
Mixed-rangliste på opslaget, så `mix` er sat til samme værdi som `double` (1449) efter den
sædvanlige, allerede etablerede fallback-regel ("rigtig mix-rating hvis fundet, ellers double,
ellers null" — se OPDATERING 2026-09-02). Køn er IKKE bekræftet af Chris for August (kun for
Andreas) og forbliver derfor `null` — samme "gæt aldrig"-regel som resten af sæsonens seeding.

**Bemærk:** 1636/1449 er U13-ratings (en anden, yngre række end resten af Senior-listens tal), men
tallene ligger fint inden for det interval de øvrige SuperUng Teen-spillere allerede har (single
1395-2028, double 1247-1774) — samme talskala (BD-point), brugt uændret som Chris selv lagde dem
frem, uden yderligere omregning.

August var allerede korrekt placeret i gruppen "SuperUng Teen" (ikke en ny tilføjelse til selve
rosteret) — kun de manglende felter er udfyldt. Andreas var allerede i "Senior".

**Filer opdateret:** `kampsystem_roster.json` (lokal data-cache brugt til at bygge
`kampsystem_preview_standalone.html`) og `build3.py`s `KAMPSYSTEM_ROSTER`-liste (inkl. det
tilhørende kommentar-afsnit om kendte huller). `gsb_alle_spillere.json` er IKKE ændret — hverken
Andreas eller August findes i den 382-medlemmers BD-union (bekræfter den allerede kendte "ingen
BD-match fundet overhovedet"-status derfra). `kampsystem_source.html` selv indeholder ingen
hardcoded roster-data (kun `__ROSTER_JSON__`-pladsholderen) og krævede derfor ingen ændring.

**Verifikation:** hele regressionssuiten (14 testfiler) kørt igen efter opdateringen — alle
bestået uændret, som forventet (ren data-ændring, ingen kodelogik rørt).

**Leveret:** opdateret `build3.py` synkroniseret til `kampsystem/` via
enhedsbroen (ingen drift konstateret før commit), samt en genbygget
`kampsystem_preview_standalone.html` sendt til Chris. Ingen produktionsfiler rørt.

**Status:** Chris' to datapunkter er indsat. Afventer stadig hans annoncerede test "med nogle
singler involveret osv".

## OPDATERING 2026-09-05 (tiende runde) — RETTELSE: August Carl Toftager-Larsen er også herre

Chris' opfølgende besked, straks efter niende runde ovenfor: "August er også herre." `koen` er
rettet fra `null` til `"H"` i både `KAMPSYSTEM_ROSTER` (`build3.py`) og `kampsystem_roster.json`.
Dermed er BÅDE Andreas Drasbek og August Carl Toftager-Larsen nu fuldt kønsbestemt — de eneste to
felter der stadig mangler for disse to spillere er selve BD-ratings for Andreas (ingen data endnu)
og en Mixed-specifik rating for August (bruger double-fallback, se niende runde).

Regressionssuiten (14 testfiler) kørt igen — alle bestået uændret. `build3.py` synkroniseret til
`kampsystem/` (ingen drift), opdateret `kampsystem_preview_standalone.html`
sendt til Chris. Ingen produktionsfiler rørt.

## Tre nye punkter fra Chris' 1. holds-test 2026-09-05, KUN LOGGET — INGEN KODE ÆNDRET (sessionens tidsgrænse nået)

Chris testede med hele 1. holdet (10 spillere) og deres reelle foretrukne roller/ratings sat
korrekt op, og meldte tre ting tilbage i forlængelse af mix-double-balance-spørgsmålet ovenfor.
Chris' eksplicitte besked: "session limit er brugt stort set, så vi har ikke tid til at fikse
det" — dette afsnit er derfor REN LOGNING til senere, ingen undersøgelse i dybden eller kode rørt
denne omgang.

### 1. Hvordan makkere vælges i double/mixed — filosofi-afhængighed skal kigges nærmere på

Chris' kommentar til mix-double-balance-svaret: "Hmm, og det kommer så an på den hold filosofi vi
bruger." Peger på at selve makker-parrings-logikken (`formTeams`/`formTeamsMixed`, som parrer
nabospillere i den rating-sorterede pulje efter enten "ens niveau" eller "stærk+svag"-filosofien)
bør gennemgås/diskuteres bredere — ikke kun det konkrete eksempel fra denne runde. Ingen konkret
fejl påvist endnu, kun et ønske om at "kigge på" selve makker-valgs-mekanikken generelt.

### 2. Gentagelses-undgåelse er utilstrækkelig — samme spillere mødes for ofte på tværs af runder

Chris: "Vi skal have kigget på ... hvordan vi sørger for at folk ikke spiller de samme kampe hele
tiden (dvs. 1. single og 2. singler spiller mod hinanden hele tiden)." Dette er en skærpelse af en
allerede kendt, dokumenteret begrænsning (se B4-prototypens "Bevidst simplificeret"-liste,
2026-08-31: "Gentagelses-undgåelse kigger kun på seneste runde, ikke hele kamphistorikken") — nu
bekræftet som et REELT praktisk problem, ikke kun en teoretisk begrænsning: fordi
rating-sorteringen naturligt parrer de to nærmeste ratings sammen hver gang, og
anti-gentagelses-tjekket kun ser på ÉN runde tilbage, ender de facto-faste "rivaler" (1. og 2.
single, som typisk ligger tættest på hinanden i rating) med at mødes langt oftere end
tilfældigt/retfærdigt ville tilsige, blot ikke to runder i træk. Løsningsretning (ikke udtænkt i
detalje, kun en skitse til senere): udvid gentagelses-tjekket fra kun "seneste runde" til en
vægtet historik (fx antal møder inden for de seneste N runder, eller inden for hele sæsonen),
og lad `matchTeams`/`pairSingles` foretrække et bytte til NÆSTE nabo i den sorterede rækkefølge
hvis det direkte naboopgør er mødt "for ofte" for nylig — samme grundmønster som allerede findes
for kønsbevidst byttning i double (`forsoegKoensblanding()`), men drevet af mødehyppighed i stedet
for køn.

### 3. BUG: delvist låst kamp ("Müller/Anja vs Auto/Auto") gjorde at begge låste spillere forsvandt helt fra runden — REPRODUCERET, ROD-ÅRSAG-HYPOTESE (IKKE VERIFICERET/FIKSET)

Chris: "Når jeg valgte Müller/Anja vs Auto/Auto så forsvandt Müller og Anja fra kamprunden, og der
var kun 3 kampe. De var endda meeeeget ubalancerede." Chris sendte et eksporteret dump af det
præcise scenarie.

**Hvad dumpet viser:** 10 til stede (hele 1. holdet), 5 baner, en lås-post (mixed,
a=[Christoffer Müller, Anja Gunna Thomsen], b=[auto, auto], antaget ud fra Chris' beskrivelse —
selve `lockedMatches` var tom i EKSPORTEN, fordi eksport-funktionen kun dumper *ubekræftede*
fastsættelser før generering, ikke facit — men den GENEREREDE runde viser konsekvensen tydeligt).
Kun 3 kampe blev genereret (1 double + 2 single), og hverken Christoffer Müller eller Anja Gunna
Thomsen optræder i NOGEN kamp — heller ikke i `sidderOver` (som er tom). De er altså sporløst væk,
ikke bare sat til at sidde over.

**Ratingubalancerne i de 3 kampe der blev genereret (beregnet med jeres egen Elo-formel,
divisor 850):**
- Double: Morten Aarøe + Oliver Frei (double-rating 3291+3013=6304) mod Michelle Liljengren +
  Line Nielsen (2621+2409=5030) — forskel 1274 point, forventet **96,9%** sejrschance til Morten/
  Oliver-holdet. Ekstremt ubalanceret.
- Single: Jonathan Hansen (3314) mod Hannah Phoebe Ejada Clausen (2491) — forskel 823 point,
  forventet **90,3%** til Jonathan.
- Single: Kenn Blæsbjerg Christensen (3112) mod Jonas Trusell-Jensen (3271) — forskel 159 point,
  forventet 60,6% til Jonas (denne var faktisk rimeligt jævnbyrdig, det er kun de to andre der er
  problemet).

**Rod-årsags-HYPOTESE ved gennemtænkning af koden (IKKE bekræftet ved faktisk kodegennemgang eller
test denne omgang — kun en kvalificeret analyse ud fra dumpets tal):** af de 8 resterende
(ikke-låste) spillere er det kun Morten Aarøe (H) og Line Nielsen (D) der har `mixed: true` blandt
deres valgte kategorier for runden — alle de andre 6 (Hannah, Jonas, Jonathan, Kenn, Michelle,
Oliver) har kun single+double valgt. Morten+Line er derfor det ENESTE mulige par der kunne udfylde
Müller/Anjas "Auto/Auto"-modstander-slot i en mixed-kamp (præcis 1 herre + 1 dame, present, med
mixed valgt). Men i den FAKTISKE genererede runde endte Morten i en DOBBELT-kamp med Oliver, og
Line i samme dobbeltkamp med Michelle — ikke i en mixed-kamp med hinanden. Det tyder på at selve
pulje-fordelingen (double/mixed-opdelingen, som sker TIDLIGT i `genererRunde()` — se de tidligere
kønsbevidste rettelser samme dag) ikke tager højde for at en eksplicit, delvist-låst kamp med
"Auto"-slots har et SÆRLIGT behov for præcis disse to spillere til at forblive tilgængelige for
mixed — når de i stedet lægges i double-puljen (fordi den generelle pulje-optimering ikke ved at de
er "reserverede" af en ventende lås), er der ingen gyldige kandidater tilbage til at fuldføre
Müller/Anjas låste kamp, og resultatet er at HELE den låste kamp (inkl. de to eksplicit navngivne
spillere) tilsyneladende droppes stille i stedet for enten (a) at blive prioriteret/reserveret
FØRST i pulje-fordelingen, eller (b) i det mindste sende Müller+Anja til `sidderOver` som et
synligt fallback, hvis ingen gyldig auto-modstander findes. Ingen af disse to mulige rettelser er
undersøgt i kildekoden endnu — ovenstående er en analyse af SYMPTOMET (hvem endte hvor, ifølge
tallene), ikke en bekræftet kodesporing.

**Data gemt til senere reproduktion:** Chris' fulde eksport (10 spillere, hele 1. holdets
opstilling) er IKKE gemt som en ny testfixture-fil denne omgang (tidspres) — bør hentes fra denne
samtale og gemmes (fx `chris_export_10_hold1_delvis_laas_bug.json`) næste gang dette tages op, så
bug'en kan reproduceres og rettes med et rigtigt jsdom-testscript i stedet for kun analyse af
outputtet.

**Status ved logning: KUN LOGGET, IKKE undersøgt i selve koden, IKKE rettet, IKKE testet.** Alle tre
punkter i dette afsnit afventede på dette tidspunkt at blive taget op i en fremtidig session med
mere tid. Ingen filer var ændret, hverken i preview-kilden eller produktionen, som en del af selve
denne logning.

**RETTELSE (roadmap-oprydning, 2026-09-07): denne status er forældet.** Punkt 2 og 3 blev rettet og
testet allerede i den umiddelbart følgende "OPDATERING 2026-09-05 (ellevte runde)" nedenfor, og
punkt 1 blev besvaret uden kodeændring i samme runde. `roadmap.md` havde flagget denne linje som
faktuelt forkert ("KUN LOGGET, INGEN KODE ÆNDRET" stod stadig som gældende status, selvom punkterne
var rettet i senere runder) — linjen ovenfor er bevaret uændret som historisk øjebliksbillede af
selve logge-tidspunktet, men skal IKKE læses som aktuel status. Se ellevte runde for facit.

**Præcisering fra Chris (samme dag, opfølgende til punkt 3 ovenfor):** "Hvis et makkerpar er låst
mod auto, så er det fordi jeg vil have den kamp spillet. Det makkerpar skal altså vægtes højere
både generelt og inden for den specifikke kategori så vi sørger for at den spilles." Dette er en
eksplicit prioriterings-regel til den fremtidige rettelse, ikke kun en fejlrapport: en
delvist-låst kamp (fx "Müller/Anja mod Auto/Auto") er et STÆRKERE signal end en almindelig
fleksibel spillers kategori-/pulje-tildeling — de(n) navngivne spiller(e) i låsen, OG selve
kategorien den er låst til (her: mixed), skal reserveres/prioriteres FØRST i pulje-fordelingen, før
resten af de fleksible spillere fordeles efter den almindelige logik (banekapacitet, kønsbalance,
oversidder-minimering osv.). Retter dermed direkte den rod-årsags-hypotese der er skrevet ovenfor:
løsning (a) fra hypotesen ("prioriteres FØRST i pulje-fordelingen") er den Chris konkret beder om —
ikke kun et fallback til `sidderOver`, hvis det kan undgås. Stadig KUN LOGGET, ingen kode ændret.

## OPDATERING 2026-09-05 (ellevte runde) — Chris' "byg det": to af de tre logget punkter RETTET OG TESTET, ét besvaret uden kodeændring

Chris: "Godt, lad us få fixet de ting vi har arbejdet på tidligere" — læst som "byg det" for de tre
punkter logget i forrige afsnit (makkervalg/filosofi, gentagelses-undgåelse, delvist-låst-kamp-
bugget), afgrænset til preview-kilden som altid.

### 3. Delvist låst kamp ("Müller/Anja mod Auto/Auto") forsvinder — RETTET OG TESTET

Chris' eksplicitte prioriteringsregel var nøglen: "Hvis et makkerpar er låst mod auto, så er det
fordi jeg vil have den kamp spillet. Det makkerpar skal altså vægtes højere både generelt og
inden for den specifikke kategori så vi sørger for at den spilles." Rod-årsagen fra forrige runde
blev bekræftet ved faktisk kodegennemgang (ikke kun analyse af symptomerne): den generelle
kategori-optimering (bedsteX for single/team, t-søgningen for mixed/double) kørte helt uden
kendskab til at en ventende, delvist låst kamp havde brug for præcis disse spillere/denne
kategori — og kunne derfor "optimere" dem væk, hvorefter `resolveLockedMatches()` ikke kunne fylde
kampen op, og den blev droppet UDEN engang at sende de navngivne spillere til "sidder over".

**To uafhængige rettelser i `genererRunde()`:**
1. **Reservation FØR optimering:** en ny blok beregner, PR. SIDE af hver delvist låst kamp, hvor
   mange "auto"-slots der mangler og (for mixed) hvilket køn de kræver — en side med én navngiven +
   én auto kræver modsat køn af den navngivne PÅ SAMME SIDE; en helt auto side kræver 1 herre + 1
   dame. Den nødvendige mængde kandidater trækkes derefter direkte ud af `kandidater` (foretrukket:
   spillere der ikke selv havde et reelt kategorivalg alligevel, dernæst højest ratede), FØR
   bedsteX/mixed-t-optimeringen kører på de RESTERENDE, ikke-reserverede spillere — og lægges ind i
   deres reserverede kategori-pulje bagefter. Optimeringen kan derfor ikke længere "spise" de
   spillere en ventende lås har brug for.
2. **Sikkerhedsnet for de reelt uløselige tilfælde:** hvis der (selv efter reservationen) genuint
   ikke findes nogen gyldig kandidat (fx slet ingen af det nødvendige køn til stede), sendes de
   NAVNGIVNE spillere i den ufuldstændige låste kamp nu eksplicit til "sidder over" (og tælles med
   i `oversidderTaeller`-rotationen) i stedet for at forsvinde sporløst. Statusbeskeden er
   opdateret til at afspejle dette.

**Verifikation:** to nye tests. `test_delvis_laas_reservation.js` genskaber PRÆCIS Chris'
eksporterede 1. holds-fremmøde (10 spillere, 5 baner) med en manuelt tilføjet delvis lås
(Müller+Anja mod Auto/Auto, jf. at eksporten kun dumper ubekræftede lockedMatches — se tiende
runde-notatet) — bekræfter nu 4 kampe (var 3), at hverken Müller eller Anja forsvinder, at den
fastsatte kamp korrekt viser Müller+Anja som ét hold, og at den eneste gyldige auto-kandidat
(Morten Aarøe + Line Nielsen, de eneste to andre med Mixed valgt) korrekt udfylder modstander-
siden. `test_delvis_laas_fallback_sidder_over.js` dækker det reelt uløselige tilfælde (kun to
andre spillere til stede, ingen af dem har Mixed valgt) — bekræfter at Müller/Anja nu korrekt
lander i "sidder over" med en forklarende statusbesked, i stedet for at forsvinde. Hele den
eksisterende regressionssuite (14 filer) kørt igen — alle bestået, ingen regressioner.

### 2. Gentagelses-undgåelse udvidet fra "kun seneste runde" til vægtet historik — RETTET OG TESTET

Den gamle logik (`lastRoundKeys`) undgik kun en EKSAKT gentagelse af selve sidste rundes kampe —
utilstrækkeligt til at forhindre at rating-nære "rivaler" (fx 1. og 2. single) mødes langt oftere
end retfærdigt, blot ikke to runder i træk. Erstattet med: en `moedeAntal(navnA, navnB, type)`-
funktion der tæller faktiske møder mellem to spillere INDEN FOR KATEGORI, hentet fra de sidste
`GENTAGELSE_VINDUE_RUNDER` (sat til 5) AFGJORTE runder i `matchHistory` (ikke kun seneste
generering). For hvert par af nabo-kampe af samme type (samme "ét forsøg pr. par"-mønster som før)
beregnes den samlede mødeomkostning (summen af mødeantal for alle spiller-mod-spiller-krydsopgør —
relevant for double/mixed, hvor det er de FIRE individuelle opgør der tæller, ikke kun selve
holdsammensætningen) FØR og EFTER et forsøgsvist bytte af sidste spiller på b-siden — byttet
gennemføres kun hvis det faktisk reducerer den samlede omkostning, ellers byttes der tilbage. Den
gamle, nu ubrugte `lastRoundKeys`-variabel er fjernet.

**Verifikation:** ny test `test_gentagelse_historik.js` — 4 spillere hvor rating-nærhed ville give
et fast 1v2/3v4-makkerskab hver eneste runde uden gentagelses-logik, spillet igennem 4 runder med
resultater faktisk registreret (så de lander i `matchHistory`, ikke kun i en engangs-generering).
Bekræfter at Spiller 1 og Spiller 2 IKKE mødes i alle 4 runder (kun 2 af 4), fordi
gentagelses-logikken aktivt alternerer mellem de to mulige opgør i stedet for at lade rating-
sorteringen mekanisk gentage samme parring. Hele regressionssuiten kørt igen — alle bestået.

### 1. Makkervalg-afhængighed af hold-filosofi — BESVARET, INGEN KODEÆNDRING NØDVENDIG

Chris' kommentar ("det kommer så an på den hold filosofi vi bruger") var en observation, ikke en
fejlrapport — filosofi-afhængigheden er allerede tilsigtet design (`formTeams`/`formTeamsMixed`
parrer bevidst forskelligt afhængig af "ens niveau" vs. "stærk+svag"). Ingen konkret fejl er
identificeret, og der er ikke bedt om en specifik adfærdsændring. Punktet betragtes som afklaret
via forklaringen givet tidligere i samtalen — ingen kode ændret. Hvis Chris på et tidspunkt ønsker
en konkret ændring til selve makker-parrings-heuristikken, bør det logges som et nyt, specifikt
ønske.

**Leveret:** opdateret `kampsystem_source.html` + genbygget `kampsystem_preview_standalone.html`
sendt til Chris, og `kampsystem_source.html` synkroniseret til
`kampsystem/` (ingen drift konstateret før commit). Ingen produktionsfiler
rørt. Samlet regressionssuite nu 17 testfiler, alle bestået.

**Status: punkt 2 og 3 er rettet og testet i preview-kilden — afventer Chris' fornyede test.**
Punkt 1 kræver ingen yderligere handling medmindre Chris konkretiserer et ønske om ændret adfærd.

## OPDATERING 2026-09-05 (tolvte runde) — Automatisk "udskiftningssingle-bane" i stedet for teknikbane, BYGGET I PREVIEW

Chris: "Jeg kunne stadig godt tænke mig at der var en mulighed for at lave en udskiftningssinglebane
istedet for en teknikbane så vi ikke har nogen oversiddere." Den eksisterende "Lav udskiftningssingle"-
knap krævede et manuelt klik EFTER hver generering — nemt at glemme, og gav i praksis stadig en
periode hvor spillerne stod og ventede som "sidder over" indtil nogen huskede at trykke.

**Bygget i `kampsystem_source.html`:**
- Nyt fluebeen i punkt 2 ("Opsætning for denne runde"), `auto-udskiftningsbane`, **checket som
  standard**: "Brug automatisk en ekstra 'udskiftningssingle-bane' til oversiddere (i stedet for
  teknikbane)".
- I `genererRunde()`: hvis fluebenet er sat og der er 2+ "tvungne" oversiddere (spillere puljen/
  banekapaciteten reelt gjorde til oversiddere — `algoritmeSiddere` + `laasteSiddere`, IKKE dem der
  selv frivilligt fravalgte alle kategorier), oprettes udskiftningssingler for dem MED DET SAMME
  ved selve genereringen (genbruger den eksisterende `lavUdskiftningskampe()`), på en EKSTRA bane
  ud over det antal der er valgt i punkt 2 — påvirker altså aldrig hvor mange "rigtige"
  kategorikampe der er plads til. Disse kampe er tydeligt mærket "Udskiftning" (samme label som
  den eksisterende manuelle variant), giver ingen ratingændring, og vises FØRST i kamplisten.
- Kun en eventuel ULIGE ensom oversidder (intet at parre med) kan uundgåeligt ikke få en
  udskiftningskamp — vises fortsat i "sidder over"-kortet med de eksisterende manuelle knapper
  ("Send til teknikbane" / evt. "Lav udskiftningssingle" hvis 2+ stadig tilbage).
- Fluebenet kan slås fra for at gå tilbage til den gamle, fuldt manuelle adfærd (knappen "Lav
  udskiftningssingle" er bevaret uændret som fallback).

**Verifikation:** ny test `test_auto_udskiftningsbane.js` — 6 spillere, kun 1 rigtig bane (så 4
presses ud af banemangel): med fluebenet TIL oprettes automatisk 2 udskiftningssingler og INTET
"sidder over"-kort vises; med fluebenet FRA er adfærden uændret fra før (0 automatiske
udskiftningskampe, "sidder over"-kortet med den manuelle knap er der som altid). To eksisterende
tests (`test_mixed_koen_force.js`, `test_delvis_laas_fallback_sidder_over.js`) er opdateret til
eksplicit at slå fluebenet FRA, da de tester andre, specifikke mekanismer (kønsbalance i Mixed
double, hhv. "ufuldstændig lås forsvinder ikke") der ellers ville blive forstyrret af at
oversidderne nu automatisk får en udskiftningskamp — begge stadig bestået uændret i deres
oprindelige betydning. Hele regressionssuiten (nu 18 testfiler) kørt igen — alle bestået.

**Sjov sidegevinst opdaget under test:** den nye automatik virker OGSÅ på "ufuldstændig lås"-
fallback'et fra forrige runde (delvist-låst-kamp-bugget) — hvis en låst kamp ikke kan fyldes op og
de navngivne spillere derfor sendes til "sidder over", vil de nu (medmindre fluebenet er slået fra)
automatisk kunne få en udskiftningssingle i stedet for bare at stå og vente, hvis der er nok andre
oversiddere at parre dem med. Endnu et skridt tættere på Chris' mål om "ingen oversiddere".

**Leveret:** opdateret `kampsystem_source.html` + genbygget `kampsystem_preview_standalone.html`
sendt til Chris, og `kampsystem_source.html` synkroniseret til
`kampsystem/` (ingen drift konstateret før commit). Ingen produktionsfiler
rørt.

**Status: bygget og testet i preview-kilden — afventer Chris' fornyede test.**

## RETTELSE 2026-09-05 (samme dag) — "Auto-udskiftningsbane" fra tolvte runde var en MISFORSTÅELSE af Chris' ønske, IKKE bygget om endnu — under designdiskussion

Chris' rettelse, verbatim: "Det er ikke en korrekt måde at håndtere det på. Med udskiftningssingle
mener jeg at der istedet for 2 spillere på en bane der spiller single, så er der 3 spillere der
spiller på banen. Det kan sagtens også gøres med udskiftningsdouble hvor der er 5 spillere på en
bane. Det skal nok være et valg der tages før runden genereres, hvor der så kan vælges hvad der
skal gøres med det skæve antal. Det betyder så også at hvis der skal sendes nogen til en
teknikbane, så skal en af banerne reserveres til teknikbane FØR banerne bliver givet ud til kampe,
for ellers mangler der en bane."

**Hvad der var forkert i tolvte rundes bygning:** "Auto-udskiftningsbane" (checket som standard)
tog de eksisterende algoritme-oversiddere og satte dem sammen til separate, EKSTRA
udskiftningssingle-KAMPE (stadig 2 spillere pr. bane, blot en ekstra bane oven i det almindelige
banetal) — det var reelt bare den eksisterende manuelle "Lav udskiftningssingle"-knap gjort
automatisk, ikke det Chris faktisk mente.

**Chris' rigtige betydning:** "Udskiftningssingle" = 3 spillere DELER én bane (i stedet for de
almindelige 2) — ingen ekstra bane nødvendig, det er en omlægning af hvordan EN eksisterende bane
bruges. Tilsvarende "udskiftningsdouble" = 5 spillere deler én double-bane (i stedet for 4). Det
betyder at et ulige antal i en kategori kan absorberes UDEN at bruge flere baner end normalt — en
væsentlig forskel fra tolvte rundes forkerte "ekstra bane"-tilgang.

**Teknikbane-timing:** hvis teknikbane bruges, skal den reserveres FØR selve bane-kapacitets-
beregningen og kategori-optimeringen (bedsteX/mixed-t-søgningen) kører — ikke bagefter som i dag,
hvor oversiddere først opstår EFTER at alle baner allerede er fordelt til kampe. I dag ville en
teknikbane-reservation efter generering betyde at en bane reelt mangler (en kamp må vige).

**Status: INGEN kode ændret endnu.** Chris bad eksplicit om at gennemgå designet FØR noget bygges
i preview ("lad os lige gennemgå før vi laver noget preview") — dette afsnit dokumenterer kun
misforståelsen og den korrekte forståelse, som grundlag for den designsamtale der følger i denne
samtale (se assistentens svar for det fremlagte forslag og opklarende spørgsmål). Tolvte rundes
"auto-udskiftningsbane"-fluebeen ligger fortsat i preview-kilden som bygget, men skal
erstattes/omdesignes helt, ikke bevares ved siden af den nye mekanisme.

## OPDATERING 2026-09-05 (trettende runde) — Den KORREKTE udskiftningssingle/-double-feature bygget, erstatter den forkerte "auto-udskiftningsbane" fra tolvte runde, BYGGET I PREVIEW

Efter en grundig designgennemgang (se "RETTELSE 2026-09-05" ovenfor for selve misforståelsen og
Chris' korrektion) blev det fulde, korrekte design afklaret gennem flere opklarende spørgsmål og
svar, og er nu bygget færdigt i `kampsystem_source.html`.

**Afklarede designvalg undervejs (alle fra Chris, denne samtale):**
- Ingen ratingændring for 3-/5-personers baner ("Nej, ingen ratingændring (anbefalet)").
- Teknikbane er et LOFT ("op til X baner", kun brugt hvis reelt nødvendigt), men kan ALTID forces
  via en ny, per-spiller "Tving til teknik"-afkrydsning (især til skadestilfælde).
- Udskiftningsdouble (5 på banen) er et ægte SIDSTE UDVEJ — bruges kun til at absorbere PRÆCIS 1
  ekstra spiller, aldrig til at splitte 2+ overskydende ud på flere 5-personers baner ("det er
  viiirkelig kun et sidstevalg").
- En teknikbane har et HÅRDT loft på MAX 4 spillere — ikke ubegrænset.
- De to nye rullende 10-runders retfærdigheds-tællere (se nedenfor) starter begge helt forfra på 0
  — ingen historisk data at rulle tilbage til, "vi har ikke bekræftet og gemt en runde endnu
  nogensinde".

**Fjernet:** den forkerte `#auto-udskiftningsbane`-fluebeen fra tolvte runde og al dens logik
(oprettede ekstra ad hoc-kampe på en EKSTRA bane — den korrekte forståelse er at 3./5. spiller
deler en EKSISTERENDE bane, ingen ekstra bane). Den tilhørende (forkerte) test
`test_auto_udskiftningsbane.js` er slettet.

**Bygget, i rækkefølge efter prioritet:**
1. **Per-spiller "Tving til teknik"**, ny afkrydsning i roster-tabellen (mirrorer `tvungenSpil`/
   "Skal spille"-mønsteret præcist, inkl. eksport/import og Sheets-merge). Tvinger en specifik
   spiller helt ud af kampgenereringen og reserverer `Math.ceil(n/4)` teknikbaner FØR resten af
   kategori-optimeringen kører (trækkes fra det banetal optimeringen ser).
2. To nye fluebeen ("Tillad udskiftningssingle (3 på banen)", "Tillad udskiftningsdouble (5 på
   banen) — sidste udvej", begge default FRA — bevidst valg for ikke at ændre eksisterende adfærd
   uden aktivt tilvalg) og et nyt talfelt ("Reservér op til X bane(r) til teknik", default 0).
3. Ny prioritetsrækkefølge i `genererRunde()` EFTER den eksisterende kategori-optimering: præcis 1
   spiller til overs → forsøg udskiftningssingle i en eksisterende single-kamp → ellers forsøg
   udskiftningsdouble i en eksisterende double/mixed-kamp (kun hvis fluebenet er sat) → ellers det
   automatiske teknik-loft (kun hvis både loftets tal OG en reelt ledig fysisk bane rækker, 4 pr.
   bane) → ellers uændret, den eksisterende manuelle "sidder over"-boks som sidste sikkerhedsnet.
4. Nye match-kort til 3-/5-personers baner: alle navne vist samlet, tydeligt mærket
   ("Udskiftningssingle (3 på banen)" / "Udskiftningsdouble (N på banen)"), ingen forventet-%,
   ingen ratingændring, ingen vind/tab-knapper.
5. To nye rullende 10-RUNDERS (ikke lifetime) retfærdigheds-tællere, der erstatter den gamle
   lifetime `oversidderTaeller` i selve UDVÆLGELSES-logikken (roster-tabellens visning af
   `oversidderTaeller` er bevaret uændret som et separat, lifetime-display-felt):
   - `oversidderHistorik`/`oversidderCount(navn)` — hvor tit en spiller reelt har siddet over
     inden for de seneste 10 BEKRÆFTEDE runder, brugt i al oversidder-udvælgelse (enkeltspiller-,
     hold- og kønsoverskuds-niveau), samt i "(siddet over N× seneste 10 runder)"-teksten.
   - `udskiftningsHistorik`/`udskiftningsCount(navn)` — nyt, samme rullende-vindue-princip, til
     fremtidig retfærdig rotation af hvem der bliver "den ekstra" i en 3-/5-personers bane.
   - Begge populeres/rulles tilbage i hhv. `bekraeftRunde()`/`nulstilRunde()` (push/filtrér
     `{runde, navn}`-poster, IKKE inkrementer/dekrementer som den gamle tæller) — kun bekræftede
     runder tæller, en nulstillet (aldrig bekræftet) runde efterlader intet spor.
   - Den generiske `seneseRunderSet(historikArray, n)` (tidligere hardkodet til kun
     `matchHistory` med vindue 5 til gentagelses-undgåelsen) genbruges nu til alle tre vinduer
     (gentagelse: 5, oversidder/udskiftning: 10).

**Bevidst forenkling, flagget til Chris (afvigelse fra "reservér FØR alt andet"-ordlyden for
selve teknik-LOFTET, IKKE for tvunget teknik):** i modsætning til `tvungenSpil`-til-teknik (som
altid reserverer sine baner ufravigeligt før kategori-matematikken kører) er selve teknik-LOFTET
opportunistisk — det forbruger kun baner der reelt står ubrugte hen EFTER kategori-fordelingen, i
stedet for at blive trukket fra på forhånd som en fast reservation. Det betyder loftet ikke kan
bruges hvis alle fysiske baner allerede er fyldt op med rigtige kampe, uanset loftets størrelse —
resten falder da til den manuelle "sidder over"-boks i stedet. Vurderet som et rimeligt,
simplificerende designvalg (loftet ER trods alt beskrevet som "kun hvis reelt behov", i modsætning
til den ufravigelige tvangs-teknik), men det er en reel afvigelse fra en bogstavelig læsning af
"skal reserveres FØR baner gives ud" — nævnes eksplicit, så Chris kan bede om den strammere
variant (fast forhåndsreservation af loftet, ligesom tvunget teknik) hvis det opportunistiske
opstår som et problem i praksis.

**Nye tests (3 stk., alle bestået):** `test_udskiftningssingle_prioritet.js` (ren
3-personers-absorption + kontrol med fluebenet fra), `test_tving_til_teknik.js` (tvunget teknik
trækkes ud før kategori-matematikken, korrekt `Math.ceil(n/4)`-reservation ved n=4 og n=5), og
`test_rullende_taellere.js` (10-runders-vinduets henfald, samt at `nulstilRunde()` fjerner —
ikke dekrementerer — den nulstillede rundes poster). Hele den eksisterende regressionssuite (nu 20
testfiler i alt, efter fjernelsen af den forkerte tolvte-runde-test) kørt igen — alle bestået,
ingen regressioner. To eksisterende tests (`test_mixed_koen_force.js`,
`test_delvis_laas_fallback_sidder_over.js`) havde en linje der slog det gamle, nu fjernede
`#auto-udskiftningsbane`-fluebeen fra — denne linje er fjernet, da elementet ikke længere findes;
begge tests er ellers uændrede og stadig bestået i deres oprindelige betydning.

**Leveret:** opdateret `kampsystem_source.html` sendt til Chris og synkroniseret til
`kampsystem/kampsystem_source.html` via enhedsbroen (ingen drift
konstateret før commit), samt en genbygget `kampsystem_preview_standalone.html` (med jeres rigtige
61-spiller-trup indlejret) sendt til direkte test. Ingen produktionsfiler rørt.

**Status: bygget og testet i preview-kilden — afventer Chris' fornyede test af den opdaterede
standalone-fil, især scenarier med reelt ulige antal spillere pr. kategori, samt eventuel
tilbagemelding på den flaggede teknik-loft-forenkling ovenfor.**

## OPDATERING 2026-09-07 — kampsystem_source.html GENOPBYGGET 100% FRA DOKUMENTATION efter regression (tabt Dropbox-kilde, ingen versionshistorik)

**Baggrund:** `kampsystem_source.html` i `kampsystem/` viste sig ved
diagnose (mtime-tjek: 2026-09-01 22:40) at være en meget tidlig version, fra FØR næsten hele
feature-historien ovenfor (fjerde til trettende runde: 3-faneopdeling, banekapacitets-planlægger,
oversidder-rotation, udskiftningssingle/-double, tving-til-teknik, gentagelses-undgåelse, Normal
rolle, m.fl.). En tidligere session havde tilsyneladende aldrig fået synkroniseret de senere
byggerunders resultater tilbage til Dropbox — og Dropbox' egen versionshistorik havde ingen nyere
version at gendanne fra. Opdaget da Chris testede en (dengang) genopbygget standalone-fil og
savnede den kendte 3-faneopdeling ("Der burde være en med 3 faner i standalonen").

**Metode:** hele `docs/historik/idebank-kampsystem-historik.md` (ældre, arkiveret del: B4-prototypen
2026-08-31 til og med den 40/10-baners-bug Chris eksplicit AFVISTE løsningen på) og den aktive del
af denne fil (fra "OPDATERING 2026-09-05 (fjerde runde)" til og med "trettende runde" ovenfor) blev
brugt som ENESTE kilde til at bygge en kronologisk feature-tjekliste, og derefter en fuld
genopbygning af kernemotor + browser-UI — uden at kigge på den tabte kildekode selv (den fandtes
ikke). Et separat Opus-baseret organiseringstrin (Chris' eksplicitte "Brug Opus til organisering og
beslutninger, Sonnet/Haiku til resten") producerede en samlet, konfliktløst facit-specifikation af
alle fire eksplicit flaggede punkter, før selve kodningen (udført af Sonnet) gik i gang:

a) **Single vs. double ved ulige antal:** kun den ENDELIGE, korrekte banekapacitets-bevidste
   x-søgning fra fjerde runde ovenfor er bygget — IKKE det første, afviste "altid double"-forsøg.
b) **Udskiftningsbane:** kun trettende rundes korrekte 3-/5-på-banen-model (udskiftningssingle/
   -double deler en eksisterende bane, plus separat tving-til-teknik-felt og teknik-loft) er bygget
   — IKKE tolvte rundes forkerte "ekstra bane"-forsøg.
c) **"Normal rolle":** kun den forenklede, endelige single/mix-version (double altid underforstået)
   er bygget — IKKE den oprindelige tre-kategori-version.
d) **"Skal spille":** placeret på Kør runde-fanen (sjette rundes endelige placering), ikke Spillere-
   fanen.

`apps/netlify-prod/public/kampsystem.html` blev brugt kun som ekstra, IKKE-autoritativ reference
for grundstruktur (bekræftet via grep kun opdateret til og med syvende runde — nul forekomster af
`skiftFane`, `oversidderTaeller`, `normalKategorier`, `bekraeftRunde`, `tvungenSpil`,
`formTeamsMixed`, `tvingTilTeknik`, `oversidderHistorik` m.fl.) — IKKE rørt eller ændret på noget
tidspunkt.

**Genopbygget (ny arkitektur — `engine.js`/`app.js`-opdelt, IKKE en kode-diff mod den tabte
original, som ikke fandtes at diffe mod):**
- Kernemotor (Elo K=70/divisor=850, `pairSingles`/`formTeams`/`formTeamsMixed` med hård kønsparring
  i Mixed, `forsoegKoensblanding` blød kønspræference i Double, kønsbevidst mixed/double-t-søgning,
  banekapacitets-bevidst x-søgning, delvist-låst-kamp-reservation FØR optimering med fallback til
  "sidder over", gentagelses-undgåelse via `moedeAntal` med 5-runders rullende vindue,
  tving-til-teknik med `Math.ceil(n/4)`-reservation, opportunistisk teknik-loft,
  udskiftningssingle/-double der absorberer præcis 1 ekstra spiller uden ratingændring, to
  rullende 10-runders retfærdigheds-tællere `oversidderHistorik`/`udskiftningsHistorik`,
  "Bekræft runde" som eneste sted tællere ændres, "Nulstil runde" med korrekt rollback).
- Fuld browser-UI: 3-faneopdeling (Kør runde/Spillere/Historik & statistik), A5-fix (lås-dropdowns
  nulstilles efter tilføjelse), Normal rolle (kun single/mix), "Skal spille" + "Tving til teknik" på
  Kør runde-fanens roster-tabel, "↻ Opdater standarder", bane-hurtigvalg (5/10), tilstede-badge, H2H
  (én dropdown + kategorifilter), kamplog, ratingtabel, simpel prompt-baseret kamp-redigering (se
  forbehold nedenfor for hvordan denne afviger fra den oprindelige dropdown-UI).
- Roster: 61 spillere genskabt fra `build3.py`s `KAMPSYSTEM_ROSTER` med to rettelser lagt oven på
  den regredierede base (Rosa Hinge Carlsson/Sylvester Østberg/Louis Toftlund tilbage i
  "Ungsenior"-gruppen; `koen`-felt tilføjet pr. spiller). `build3.py` opdateret og synkroniseret.

**VIGTIGT FORBEHOLD — hvad er rekonstrueret, ikke bekræftet ægte data:**
- **`koen`-feltet på alle 61 roster-spillere er REKONSTRUERET ud fra fornavns-mønstre, IKKE den
  oprindelige Nembadminton-`memberStats`-seeding fra BYGGERUNDE 2026-09-05.** Den seeding er tabt
  sammen med resten af regressionen (den staged kopi af `gsb_alle_spillere.json` har heller intet
  `koen`-felt). Andreas Drasbek og August Carl Toftager-Larsen er sat til "H" efter Chris'
  eksplicitte bekræftelse (niende/tiende runde ovenfor) — resten er et kvalificeret gæt ud fra
  danske fornavne. **Bør verificeres/rettes af Chris, især for tvetydige navne.**
- **`gsb_alle_spillere.json` (382-spiller klublisten) har IKKE fået et `koen`-felt** i denne
  genopbygning (for stort at rekonstruere pålideligt for alle 382 i denne omgang) — kopierings-
  logikken i `tilfoejFraSoegning()` overtager `koen` når det findes, men indtil filen rent faktisk
  har feltet vil søgnings-tilføjede spillere mangle køn (samme adfærd som før BYGGERUNDE
  2026-09-05's seeding).
- **Chris' faktiske `chris_export_40.json`-testfixture (24H/15D/1 ukendt, brugt til at verificere
  t=14/7 mixed+3 double) findes ikke længere** — testet i stedet med et SYNTETISK datasæt med
  samme køns-/antalsfordeling. Algoritmen gav korrekt t=14/7 mixed+3 double på det syntetiske
  datasæt (en matematisk egenskab af antalsfordelingen, ikke af de specifikke ratings) — men er
  IKKE en gengivelse af den historiske, bekræftede fixture.
- **Kamp-redigering ("✎ Rediger kamp") er bygget som en simpel prompt-baseret tekst-editor**, ikke
  den fulde dropdown-baserede UI med live ⚠-advarsler beskrevet i designforslagene — den
  underliggende regel (intet committes før bekræftelse, `lockedMatches` røres aldrig, advarsel hvis
  en spiller ender i to synlige kampe) er implementeret, men selve UI-fladen er forenklet.
- **"Eksportér testdata"-knappen er IKKE genopbygget** i denne omgang — var en fejlsøgningsfacilitet,
  ikke en kernefunktion, bevidst udeladt for at holde omfanget realistisk.
- **Sheets-integration (`elo-hent.js`/`elo-gem.js`, `hentFraSheets`/`gemTilSheets`) er IKKE
  genopbygget** — appen kører rent i session-hukommelse (samme tilstand som den allerførste
  prototype). Dette var ikke eksplicit krævet af genopbygningsopgaven (som fokuserede på selve
  rundefordelings-/UI-logikken), men er en reel forskel fra den tabte version, som HAVDE
  Sheets-integration. Bør tilføjes i en opfølgende session hvis Chris ønsker det.

**Testet og bestået (Node, ingen browser nødvendig for kernelogikken):**
- `test_core_tal.js`: 40 spillere/10 baner → 10 kampe/0 oversiddere; 41/10 → 10 kampe/1 oversidder;
  36/10 → 8 doubler+2 singler/0 oversiddere; syntetisk 40 (24H/15D/1 ukendt) → t=14, 7 mixed+3
  double; samme med 14 fravalgte mixed → præcis 4 double+6 mixed, ingen af de 14 i mixed;
  `Math.ceil(n/4)` teknikbane-reservation ved n=4 (1 bane) og n=5 (2 baner). ALLE BESTÅET.
- `test_mixed_og_gentagelse.js`: 4 mænd i mixed-pulje → alle 4 sidder over (ikke fejlparret, Chris'
  oprindelige bug); 2H+2D → korrekt kønsblandet hold; gentagelses-reduktion bekræftet over 4 runder.
  ALLE BESTÅET.
- `test_jsdom_ui.js` (jsdom mod den fulde, byggede standalone-fil): 61 spillere indlæst, faneskift
  virker, "Vælg alle til stede" + badge, Ungsenior-gruppe og -spiller vises korrekt, Motionist/
  Veteran tilbudt som grupper, runde genereres med banenumre på alle kampe, "Bekræft runde" +
  "Nulstil runde"-rollback virker, A5 (lås-dropdown nulstilles) bekræftet. ALLE BESTÅET.
- **IKKE testet:** Sheets-integration (findes ikke i denne genopbygning), den fulde H2H/kamp-
  redigerings-UI's visuelle flow (kun de underliggende data-regler er testet), ydeevne med et reelt
  stort, blandet fremmøde ud over de syntetiske scenarier ovenfor.

**Leveret og synkroniseret (med read-back-verifikation — det kritiske trin der manglede sidst):**
1. `kampsystem_preview_standalone.html` (94.492 bytes, 61-spiller roster indlejret) sendt til Chris.
2. Backup taget FØR overskrivning: den gamle (forkerte, regredierede) standalone-fil kopieret til
   `kampsystem_preview_standalone_BACKUP_2026-09-07.html` (103.336 bytes) i samme mappe, og
   tilsvarende for `build3.py` (`build3_BACKUP_2026-09-07.py`, 35.028 bytes) — begge
   byte-for-byte-verificeret læst tilbage.
3. Ny `kampsystem_source.html` (48.758 bytes, `__ROSTER_JSON__`/`__ALLE_SPILLERE_JSON__`-
   pladsholdere bevaret til build3.py's substitution) og ny `kampsystem_preview_standalone.html`
   skrevet til `kampsystem/` (overskriver den gamle, efter backup).
   `build3.py`s `KAMPSYSTEM_ROSTER` opdateret (Ungsenior-gruppe + `koen`-felt) og skrevet samme sted.
4. **Read-back-verifikation udført og bestået for ALLE tre skrevne filer** — hver fil læst tilbage
   fra Dropbox umiddelbart efter skrivning og SHA-256-hashet mod den lokale kopi der blev sendt:
   `kampsystem_source.html` (68bf1ccf…), `kampsystem_preview_standalone.html` (4a756464…),
   `build3.py` (9cf7ace2…) — alle tre byte-identiske, størrelser og tidsstempler matcher. Dette var
   det eksplicit krævede trin for at undgå en gentagelse af den oprindelige "skrivning logget som
   gennemført, men filen forblev den gamle"-fejl, der er årsagen til hele denne genopbygning.
5. **Rørt IKKE:** `apps/netlify-prod/` eller nogen produktionsfiler. **Bygget IKKE og deployet
   IKKE:** Sheets-persistens-kandidatfunktionerne fra ottende runde ovenfor (de findes slet ikke i
   denne genopbygning).

**Status:** kernealgoritmen (banekapacitets-planlægger, kønsbevidst Mixed/Double-fordeling,
teknik/udskiftning, gentagelses-undgåelse, Normal rolle, Skal spille) er genopbygget og verificeret
mod alle de tal Chris/dokumentationen har bekræftet historisk. UI'en er en funktionel, men
simplificeret genopbygning (se forbehold ovenfor) — afventer Chris' egen test af den leverede
standalone-fil, især: (a) at det rekonstruerede `koen`-felt er korrekt for alle 61 spillere, (b) at
kamp-redigerings-flowet (prompt-baseret) er acceptabelt eller skal bygges om til den fulde
dropdown-UI, (c) om Sheets-integrationen skal bygges ind igen i en opfølgende session.

## OPDATERING 2026-09-07 (samme dag, opfølgende session) — Chris' seks testfund efter genopbygningen: FEM RETTET OG TESTET, ét (UI-polish) forbedret

Chris testede den genopbyggede standalone-fil fra opdateringen ovenfor og fandt seks konkrete
problemer. Denne opfølgende session (orkestreret, diagnose + fix udført af underliggende
Sonnet-agent) rettede fem af dem i kode og forbedrede UI'en visuelt for det sjette.

### 1. UI "scuffed" sammenlignet med den gamle standalone-fil — FORBEDRET

Chris: "UI er meget værre end det var før desværre, kig på kampsystem_preview_standalone_backup
for at tage inspiration." Den genopbyggede `style.css` var minimal/rå (systemfont, fladt design)
sammenlignet med den ældre (2026-09-01), mere polerede fil. `style.css` skrevet om for at matche
den gamle fils visuelle sprog markant tættere: header-bjælke i accentfarve (`--kamp-accent:
#2f5fa8`), afrundede kort med skygge-agtig kant og luftig padding, farvede badges/chips, tydeligt
primær-styling på det første/hoved-knap i hvert kort, ensartet cremehvid baggrund
(`--line-white: #f7f5ef`), samme fonte-stack (`Segoe UI`/system-ui). Alle 3 nyere faner og
funktioner (3-faneopdeling, banekapacitets-planlægger, tving-til-teknik, udskiftningssingle/
-double m.fl.) er bevaret uændret — kun CSS er rørt, ingen markup/logik-ændring.

### 2+3. ROD-ÅRSAG (samme bug bag begge fund): `forsoegKoensblanding()` ombyttede spillere MELLEM rene H/H- og D/D-hold og skabte kønsblandede hold labelet "Double" — RETTET

Fejlfortolkning af en gammel driftlog-idé ("undgå rene H/H mod D/D som MODSTANDERE i høje lag" —
en idé om hvilke to hold der spiller mod hinanden) var i genopbygningen implementeret som en
ombytning af HVEM DER ER PÅ et hold — `forsoegKoensblanding()` byttede aktivt en spiller fra et
rent H/H-hold med en spiller fra et rent D/D-hold (øverste ~35% af puljen, målt på
hold-gennemsnit), hvilket producerede kunstige 1H+1D "double"-hold i stedet for ægte damedouble.
Det er derfor Chris næsten aldrig så en ren damedouble, og derfor et skærmbillede viste "Bane 2 —
Double: Hannah Phoebe Ejada Clausen + Tobias Weinreich Hansen mod Kenn Blæsbjerg Christensen +
Linda Bækgaard" (to reelt kønsblandede "double"-hold).

**Fix i BÅDE `engine.js` og `app.js`'s `formTeams()`:** kaldet til `forsoegKoensblanding()` er
fjernet fra den aktive kodesti (funktionen selv er bevaret, udokumenteret-kaldt, hvis den korrekte
"undgå H/H-mod-D/D som modstandere"-idé (en ombytning af hvilke to allerede rent-kønnede HOLD der
spiller mod hinanden, ALDRIG hvem der er PÅ et hold) skal bygges separat senere). `formTeams`
splitter nu puljen i herrer/damer/ukendt-køn, danner hold inden for hvert køn for sig (samme
rating-nabo-parrings-logik/filosofi som før, nu kørt separat pr. køn), og lægger dem sammen
bagefter. Ukendt-køn-spillere fordeles til den mindste gruppe (skiftevis) for at holde begge
grupper lige. Et REELT ulige antal i begge køn SAMTIDIG (fx 3 kvinder + 3 mænd, hver med én til
overs) krydsparres som SIDSTE UDVEJ til ét enkelt H+D-hold, fremfor at begge sidder unødvendigt
over — men kun når begge køn faktisk har en rest på samme tid, aldrig systematisk.

**Verifikation:** ny test `test_koen_og_rating.js` (mod `engine.js` isoleret) bekræfter: 6D+6H
kun-double → præcis 3 DD-hold + 3 HH-hold, 0 kønsblandede hold, 0 oversiddere; 3D+4H → intet
krydshold dannes (kun ét køns rest), den overskydende kvinde ender korrekt i "sidder over" sammen
med det svageste hold; 3D+3H (begge ulige samtidig) → ét H+D-krydshold dannes som sidste udvej
fremfor to unødvendige enkelt-oversiddere. Ny test `test_app_fixes.js` (mod den fulde, byggede
`app.js` i jsdom, med hele 61-spiller-rosteret) kører en ægte Senior-gruppe-runde (kun double
valgt) og bekræfter: mindst én ægte DD-mod-DD-kamp dannes, og højst ét kønsblandet hold opstår i
hele runden (dvs. INGEN systematisk ombytning som den gamle bug — kun den legitime,
sidste-udvejs-krydsning kan forekomme, og kun én gang). Punkt 3 (fejlmærkning "Double" på
kønsblandede hold) er dermed automatisk løst — der findes ikke længere kønsblandede
"double"-labelede hold i praksis (bortset fra den sjældne, legitime sidste-udvej).

### 4. Uratede spillere manglede en "effektiv rating"-fallback til parring/visning — RETTET

Den genopbyggede kode havde IKKE genskabt den oprindelige (tabte) `fallbackRating`-mekanisme —
`sortEfterRating` brugte `(b[ratingKey] || 0)`, så en uratet spiller (`null`) blev regnet som 0
point ved sortering/parring/forventet-%-visning, hvilket ødelagde både parring (uratede spillere
havnede altid forkert i sortering) og forventet-%-visningen (viste tæt på 100/0% mod en normalt
ratet modstander).

**Fix:** ny hjælpefunktion `effektivRating(spiller, ratingKey)` (`= spiller[ratingKey] != null ?
spiller[ratingKey] : 2000`, Chris' eksplicitte 2000-point-regel), tilføjet i BÅDE `engine.js` og
`app.js`, og brugt overalt en rating læses til sortering/parring/forventet-%: `sortEfterRating`,
`holdRating` (nu `effektivHoldRating` for arbitrære sidestørrelser i selve kort-visningen),
`formTeams`/`formTeamsMixed`s interne parring, og `byggMatchCard`s forventet-%-beregning.
`kampsystem_source.html`/standalone bygger deres logik direkte fra `app.js` via `combine.py` (ingen
separat, tredje kopi af logikken) — så denne rettelse dækker automatisk begge de byggede HTML-filer
uden yderligere ændringer der.

**ELO-opdaterings-beskyttelsen tjekket eksplicit (Chris' udtrykkelige krav om IKKE at røre selve
opdateringsreglen):** `registerVinder()` i `app.js` brugte allerede `if (p[ratingKey] != null)` til
at undlade at opdatere EN uratet spillers egen rating — men denne beskyttelse var UTILSTRÆKKELIG:
modstanderens RIGTIGE rating blev stadig opdateret ud fra en sammenligning mod den uratede
spillers `|| 0`-fallback (0 point), hvilket ville have givet modstanderen en helt urimelig,
forkert ratingændring. Rettet: `registerVinder()` tjekker nu FØRST, med de RIGTIGE (ikke
2000-fallback) værdier, om ALLE fire deltagere i kampen faktisk har en rigtig rating i den spillede
kategori — hvis ikke, springes HELE ratingopdateringen for kampen over (ingen af de to sider
ændres), men kampen tælles og logges stadig i kamplog/H2H som normalt.

**Verifikation:** `test_koen_og_rating.js` bekræfter `effektivRating`/`FALLBACK_RATING` og at
`sortEfterRating` nu sorterer en uratet spiller (2000) korrekt over en lavt ratet (1000) men under
ingen (dvs. som en middel spiller, ikke sidst). `test_app_fixes.js` bekræfter med rigtige
roster-spillere (Andreas Drasbek, uratet single, mod Malthe Baltzer, ratet): efter
`registerVinder()` er Andreas' rating stadig `null` (ikke sat til noget afledt af 2000-fallbacken),
OG Malthes rigtige rating er UÆNDRET (kampen talte ikke som en reel ratingkamp) — samt en
kontroltest der bekræfter at to NORMALT ratede spilleres kamp stadig opdaterer begges rating som
altid (beskyttelsen er ikke for bred).

### 5. Udskiftningssingle/-double valgte bare `alleKampe[0]` i stedet for den bedst egnede kamp — RETTET

I `app.js`s udskiftnings-logik blev en overskydende spiller sat ind i den FØRSTE fundne
single-/team-kamp uanset niveau — Chris' konkrete eksempel var en meget stærk spiller (fx Jonas
Trussel-Jensen) presset ind på en bane med langt svagere spillere.

**Fix:** ny hjælpefunktion `vaelgTaetteseteKamp()` vælger nu, blandt de tilgængelige kandidatkampe,
den hvis deltageres GENNEMSNITSRATING (i den relevante kategori, med `effektivRating`-fallback for
uratede deltagere) ligger tættest på den overskydende spillers egen (effektive) rating — for BÅDE
udskiftningssingle- og udskiftningsdouble-valget.

**Verifikation:** `test_app_fixes.js` opstiller en situation med to meget forskellige
single-niveauer (to svage spillere i én kamp, to stærke i en anden) plus én ekstra, høj-ratet
overskydende spiller — bekræfter at udskiftningsspilleren (uanset hvilken af de fem der reelt blev
"til overs" af den eksisterende oversidder-udvælgelse) altid havner på den STÆRKE kamp, aldrig den
svage.

### 6. Yiting Chen og Guanyan Chen fejlagtigt sat til "D" (dame) — RETTET, er begge herrer

Rettet fra "D" til "H" for begge navne ALLE steder de forekommer: `kampsystem_roster.json`,
`build_roster.py`, `build3.py`/`build3_updated.py`s `KAMPSYSTEM_ROSTER` (både i data-listen og
bekræftet af en allerede eksisterende, men internt inkonsistent `PLAYERS_2627_HERRER`-navneliste i
samme fil, som allerede listede begge navne som herrer baseret på faktisk kamphistorik-data —
`koen`-feltet i selve roster-listen havde blot ikke fulgt den liste). `kampsystem_source.html`/
`kampsystem_preview_standalone.html` indeholder ingen separat, tredje kopi af rosteret — de bygges
fra `kampsystem_roster.json` via `combine.py`, så rettelsen er automatisk med i de genbyggede
HTML-filer.

**Andre navne i rosteret værd for Chris selv at dobbelttjekke (IKKE rettet på egen hånd — kun
flagget, samme "gæt aldrig"-regel som resten af kønsseedingen):**
- **Qingyi Marie Han** (nuværende `koen: "D"`) — kinesisk fornavn, kan ikke afgøres entydigt ud fra
  et dansk perspektiv (samme kategori fejl som Yiting/Guanyan Chen, som netop viste sig forkerte).
- **Mina Lorin Özden** (nuværende `koen: "D"`) — "Özden" er et tyrkisk efternavn; "Mina" er
  sandsynligvis korrekt som kvindenavn i både dansk/tyrkisk/persisk kontekst, men flagges for en
  sikkerheds skyld givet det udenlandske efternavn.

Ingen af disse to er ændret — kun flagget til Chris' egen bekræftelse.

### Regressionstests

Kørt og bestået: `test_core_tal.js` (17 delassertions, upåvirket — `genererRunde` i `engine.js` er
en ren kapacitets-planlægger og kalder ikke `formTeams`), `test_mixed_og_gentagelse.js` (upåvirket
— `formTeamsMixed` og gentagelses-logikken er ikke rørt af denne runde), `test_jsdom_ui.js` (kørt
mod den genbyggede standalone-fil med det nye CSS — alle eksisterende assertions stadig bestået,
bekræfter UI-ændringen ikke brød nogen funktionalitet), samt to helt nye testfiler:
`test_koen_og_rating.js` (engine.js-niveau, punkt 2/3/4 — se ovenfor) og `test_app_fixes.js`
(fuld app.js-niveau i jsdom mod det rigtige 61-spiller-roster, punkt 2/3/4/5/6 — se ovenfor). Ingen
regressioner på tidligere verificerede tal (40/10-baner→10/0, 36/10→8 double+2 single/0 oversiddere,
osv.).

### Leveret og synkroniseret (med read-back-verifikation)

1. Ny `kampsystem_preview_standalone.html` (99.879 bytes) sendt til Chris.
2. **Backup taget FØR overskrivning** (denne sessions "scuffede", men funktionelt nyeste filer):
   `kampsystem_source_BACKUP_2026-09-07-v2.html` (48.758 bytes),
   `kampsystem_preview_standalone_BACKUP_2026-09-07-v2.html` (94.492 bytes),
   `build3_BACKUP_2026-09-07-v2.py` (35.830 bytes) — alle tre skrevet til
   `kampsystem/` og størrelsesbekræftet ved read-back FØR de rettede filer
   blev skrevet.
3. Rettede filer skrevet til samme mappe: `kampsystem_source.html` (54.145 bytes),
   `kampsystem_preview_standalone.html` (99.879 bytes), `build3.py` (35.830 bytes, kun
   `koen`-felterne ændret, samme størrelse som før).
4. **Read-back-verifikation udført og bestået for ALLE tre skrevne filer** — hver fil læst tilbage
   fra Dropbox og SHA-256-hashet mod den lokale kopi: `kampsystem_source.html`
   (797d699d2a54c3f7…), `kampsystem_preview_standalone.html` (7471a301ba4741a0…), `build3.py`
   (e7e0e53a1c3f6527…) — alle tre byte-identiske. **Bemærk:** den første commit af
   `kampsystem_source.html` fejlede stille (device_commit_files rapporterede success, men
   read-back viste stadig den GAMLE fils hash/størrelse — præcis den kendte fejlklasse fra den
   forrige genopbygningsrunde) — opdaget PRÆCIS fordi read-back-trinnet blev fulgt uden undtagelse,
   rettet med et fornyet commit-forsøg (`force:true`), og derefter bekræftet byte-identisk ved en
   ny read-back. Endnu et konkret eksempel på hvorfor dette trin er ufravigeligt.
5. **Rørt IKKE:** `apps/netlify-prod/` eller nogen produktionsfiler. **Bygget/deployet IKKE:**
   Sheets-persistens eller andre features ud over de seks fund ovenfor.

**Status:** alle seks fund fra Chris' test er adresseret (fem rettet i kode og testet, UI-punktet
forbedret visuelt) — afventer Chris' fornyede test af den opdaterede standalone-fil, samt hans
bekræftelse/rettelse af de to yderligere flaggede, usikre kønsdata-navne (Qingyi Marie Han, Mina
Lorin Özden).
