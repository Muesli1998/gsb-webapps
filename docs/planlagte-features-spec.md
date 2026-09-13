# GSB – Aftalte features, klar til byggekø (endnu IKKE bygget)

Denne fil er forskellig fra `docs/idebank-feature.md`: idébanken er rå brainstorm og
diskussion (skal vi overhovedet bygge det?), denne fil er de idéer der er blevet konkret
AFTALT i detalje med Chris (scope, arkitektur og tekniske valg lagt fast — spørgsmålet er nu
kun "hvordan/hvornår bygger vi det", ikke "skal vi").

**STANDING REGEL (samme som idébanken):** intet i denne fil må implementeres/kodes/deployes
før Chris eksplicit siger "byg det" (eller lignende utvetydigt go-ahead) for det specifikke
punkt. At noget står her betyder "vi er færdige med at diskutere designet", IKKE "gå i gang".

**Filen er opdelt i fire dele, i denne rækkefølge:**
- **DEL A — Skal testes/afklares:** KUN spørgsmål der endnu ikke er undersøgt, men hvor svaret
  ændrer hvordan noget skal bygges. Så snart et punkt herfra er testet, flyttes det til DEL 0.
- **DEL B — Klar til bygning:** ingen åbne datamæssige spørgsmål tilbage; venter kun på
  Chris' eksplicitte "byg det"-signal.
- **DEL C — Baggrundsviden:** ikke en feature, men kontekst (autentificering) værd at have
  liggende.
- **DEL 0 — Bekræftede tekniske fakta:** spørgsmål der ER blevet testet og afklaret, flyttet
  helt bagest efter Chris' ønske — B1's design henviser til punkterne herfra, men de behøver
  ikke læses igen for at følge med i hvad der stadig mangler.

**OPDATERING 2026-09-04 — vedligeholdelsesregel for denne fil, og en kendt rettelse:**
Denne fil opdateres IKKE altid lige så flittigt som `docs/idebank-feature.md`/
`docs/idebank-kampsystem.md`/`docs/historik/driftlog.md`, fordi opdateringer her kun sker når noget
flytter status mellem DEL A/B/C/0 — ikke ved hver lille fremdrift. Det betyder den kan blive
LOKALT forældet på enkelte punkter, selvom hoved-idébankerne er opdateret. Et konkret eksempel
fundet og rettet 2026-09-04: B4's Fase-plan nedenfor antog stadig at Chris bruger git
(commit/push) til at deploye — men Chris afklarede allerede 2026-09-03 (ottende runde, se
`docs/historik/driftlog.md`) at han overfører hele `apps/netlify-prod/`-mappen manuelt til Netlify, uden
git. Rettet nedenfor. **Fremadrettet tjek:** når et B-punkts deploy-status ændrer sig i
driftloggen (fx "nu kopieret til apps/netlify-prod/", "nu shippet", "nu testet live"), skal den
tilsvarende status-sætning her i spec-filen opdateres i SAMME session — ikke kun i driftloggen.

**OPDATERING 2026-09-04 (samme dag, senere) — dokument-omorganisering:** `docs/idebank-feature.md`
er splittet yderligere, og statistik-/spilleranalyse-relateret indhold (herunder A4's baggrund) er
flyttet til den nye `docs/idebank-statistik.md`. Ren API-teknik er flyttet/flettet ind i
`docs/nembadminton-api.md`. Henvisningerne nedenfor er opdateret til at pege på de rigtige filer.

---

# DEL A — Skal testes/afklares

## A1. Håndtering af aflysninger i Google Calendar-sync'en — RESOLVED 2026-09-03 (bevidst design-valg)

**Chris' beslutning 2026-09-03:** "Lad os ignorere aflyste kampe, og sætte den som klar til at
inkludere." I stedet for at undersøge/håndtere hvordan en aflyst kamp opfører sig i
`calendarEvents`/`teamFights`-dataen, er det nu et bevidst scope-valg: sync-logikken bygger
IKKE nogen særlig sletnings-/aflysningshåndtering i første version — en aflyst kamp behandles
ikke specielt (den forsvinder blot fra den næste sync-kørsel, ligesom enhver anden kamp der
ikke længere er i datasættet, uden at forsøge at skelne det fra "kampen er overstået"). Kan
udvides senere hvis det i praksis viser sig at være et problem.

**Konsekvens:** dette var den ENESTE tilbageværende blokering for B1 — B1 er derfor flyttet
fuldt over i DEL B nedenfor, klar til byg-signal (ingen åbne datamæssige spørgsmål tilbage).

Status: **afklaret ved beslutning, ikke ved teknisk test — B1 er nu ubetinget i DEL B.**

## A3. Cheftrænerens bekræftelse af fuld liste over ELO-trænings-skabeloner — LAGT VÆK 2026-09-04, IRRELEVANT

**Hvorfor det skulle afklares:** B4's `ELO_Traeningsskabeloner` skal som minimum dække
Plus+Super+Supertræn+Senior (16 konkrete træningsslots, aftalt 2026-08-31 — se B4), men Chris
havde spurgt cheftræneren om den fulde liste (skal fx Basis-niveauet, Veteran eller Motionist
også have en skabelon?).

**Chris' beslutning 2026-09-04 (delvist, om Veteran+Motionist):** "Veteran og Motionist skal også
have en, men den kan vi bygge selv fra spillerlisten og vores tilføj til gruppe." — dvs. disse to
får en DYNAMISK skabelon-type (standard-spillerliste = de spillere der aktuelt står i
Kampsystem-gruppen, opslået ved oprettelse af en konkret træning, i stedet for en tastet, fast
liste som de 16 øvrige hold-slots).

**Chris' opfølgende besked, samme dag: hele resten af A3 er nu irrelevant.** "A3 er irrelevant i
sidste ende i forhold til cheftræneren, jeg får adgang til klubbens holdliste i fremtiden, så den
kan bare lægges væk." Chris får altså selv adgang til klubbens FULDE, officielle holdliste på et
senere tidspunkt — når det sker, er den ægte kilde til hvilke hold der skal have en skabelon, og
der er derfor ingen grund til at vente på cheftrænerens uformelle tilbagemelding om resten af
listen (Mikroton/Miniton, Basis, Individuel Teknik/Styrke/Pige, Passive/GSB's Venner m.fl.).

Status: **lagt væk — ikke længere et åbent spørgsmål.** Veteran+Motionist-designet (dynamisk
skabelon) står fast og kan bygges som en del af Fase 4. Resten af skabelon-listen afgøres først
når Chris får adgang til den rigtige holdliste — intet at vente på fra cheftræneren i mellemtiden.

## A4. Automatiseret opslag af dato-præcise ranglistepoint for VILKÅRLIGE spillere (badmintonplayer.dk)

**Hvorfor det skal testes:** relevant for `docs/idebank-statistik.md`s "Trænerværktøj:
performance vs. ranglistepoint"-idé (rejst af Chris 2026-08-31) — en stat der viser om en
spillers kampresultater står mål med deres rangliste-niveau PÅ KAMPTIDSPUNKTET, også for
modstandere fra andre klubber. Nembadmintons GraphQL-API er en bekræftet blindgyde til dette
(ingen no-login vej til en anden klubs `clubhouseId`, se `docs/nembadminton-api.md`).

**Det der ER bekræftet, live testet 2026-08-31:** badmintonplayer.dk's egen offentlige
"Ranglister"-side (`/DBF/Ranglister/`, intet login) understøtter både klub-filtrering (samme
klub-ID-system som Nembadminton, fx Drive=1091, GSB=1093) OG en dato-præcis "Version"-vælger
(`DropDownListVersions`) — men kun når siden først er sat til den RIGTIGE sæson (skifter man
sæson, repopuleres version-listen med hele den sæsons historik, fx 159 datoer tilbage til
01-07-2025 for sæson 2025/2026, inkl. `19-09-2025` — dagen før en konkret GSB-kamp). Sæson+klub+
kategori kan sættes i ét hug ved at navigere direkte til sidens hash-URL-format (fx
`#288,2025,,0,,,1091,0,,,,15,,,,0,,,,,,` — position 1=kategori-ID, 2=sæson, 7=klub-ID), hvilket
gav korrekte, udfyldte pointtal med det samme (testet: Johan P. Philipsen, Drive, 3583
single-point for sæsonens sidste version).

**Hvad der mangler for at teste det færdigt:** at finde det korrekte hash-felt til selve DATOEN
(ikke kun sæson), så et helt opslag (klub+kategori+dato) kan laves i ét sideload — forsøg på i
stedet at sætte en specifik dato via `DropDownListVersions`-dropdown'ens egen
`DropDownVersionClick`-handler EFTER sideindlæsning gav gentagne gange en tom resultat-tabel,
årsag ikke fundet endnu (uklart om det er forkert rækkefølge/timing eller en reel begrænsning).

**Reel status som blokering:** blokerer IKKE B3 (Klubstatistik) eller nogen anden aftalt B-
feature — det er en forudsætning for at gøre "performance vs. ranglistepoint"-idéen fra ren
brainstorm til et konkret, byggeklart B-punkt. Kan afklares når som helst, ingen afhængighed af
Chris' input (ren teknisk efterforskning).

Status: **delvist testet — mekanismen (dato-præcise point, offentligt, uden login) er bekræftet
at eksistere, men automatiseringen af selve dato-opslaget er ikke færdig endnu.**

## A5. Kampsystem: lås/fastsæt-dropdown nulstiller ikke til "– auto –" efter en spiller er valgt — REPRODUCERET 2026-09-04, ROD-ÅRSAG FUNDET, IKKE RETTET

**Chris' rapport (2026-09-04):** i lås/fastsæt-panelet (punkt 3 i Kampsystem) er det muligt at
vælge den samme spiller i flere af de fire dropdown-felter (a1/a2/b1/b2), fordi en spillers navn
IKKE automatisk forsvinder fra/nulstilles til "– auto –" i de andre dropdowns, når vedkommende
lige er blevet valgt i én af dem.

**REPRODUCERET ved kodelæsning 2026-09-04 (identisk kode i `kampsystem_source.html` og
`apps/netlify-prod/public/kampsystem.html` — begge har buggen):**
- `opdaterLaasDropdowns()` bygger de fire dropdowns ud fra `lockedMatches` (kampe der ER
  bekræftet med "Tilføj kamp") — IKKE ud fra hvad der er valgt i de andre tre dropdowns lige nu.
  Der er heller ingen `change`-listener på selve a1/a2/b1/b2, så de fire felter opdaterer aldrig
  hinanden mens man udfylder panelet.
- Det direkte "dobbelt-valg i samme kamp"-tilfælde er faktisk allerede blokeret —
  `tilfoejLaastKamp()` tjekker `new Set(navngivne).size !== navngivne.length` og afviser med en
  fejlbesked. Så selve "samme spiller to gange i én kamp" kan reelt ikke gennemføres.
- Den ÆGTE bug: efter en kamp er tilføjet, nulstilles a1/a2/b1/b2's VALGTE VÆRDIER ikke til
  "– auto –" — kun options-listerne genopbygges. Fordi `opdaterLaasDropdowns()` bevidst bevarer
  `current`-værdien i netop det felt den blev valgt i (`p.navn === current`-undtagelsen, linje
  ~500 i source), står den nu-låste spillers navn stadig valgt i det felt. Forsøger man at
  tilføje endnu en fastsat kamp uden manuelt at nulstille alle fire felter først, rammer man
  fejlbeskeden "En af spillerne indgår allerede i en anden fastsat kamp" — forvirrende UX (ser ud
  som et gyldigt valg, er det ikke), men ikke en reel data-fejl.

**Anbefalet fix (afventer "byg det"):** i `tilfoejLaastKamp()`, lige efter
`lockedMatches.push(...)` og FØR `opdaterLaasDropdowns()` kaldes, sæt alle fire selects
(`lock-a1`, `lock-a2`, `lock-b1`, `lock-b2`) tilbage til `value = ""` eksplicit. Simpel,
lavrisiko ændring — ingen ny logik, kun en manglende reset-linje. Fjerner samtidig behovet for
`current`-særreglen i `opdaterLaasDropdowns()`s filter (kan forenkles bagefter, valgfrit).

**BYGGET 2026-09-04 (samme byggerunde som Kampsystem-designpunkterne 1/2/3/5/6, se
`docs/idebank-kampsystem.md`):** fixet præcis som anbefalet, i `kampsystem_source.html`
(preview-kilden). Verificeret med jsdom. **Kun i preview-kilden — IKKE kopieret til
produktionens `kampsystem.html` endnu**, afventer Chris' test af den leverede
standalone-testfil før noget går videre til produktion.

Status: **bygget og testet i preview-kilden, afventer Chris' godkendelse før kopiering til
produktion.**

## A6. Kampsystem: er `apps/netlify-prod/public/kampsystem.html` reelt identisk med den nuværende preview-kildekode? — DIFFET OG RETTET 2026-09-04

**Baggrund:** `kampsystem.html` blev kopieret til produktion i syvende runde (2026-09-03), ud
fra `kampsystem_source.html` som den så ud PÅ DET TIDSPUNKT.

**DIFFET 2026-09-04 — FUND: IKKE identisk, og afvigelsen gik MODSAT vej end forventet.** Begge
filer staget og sammenlignet direkte (funktionsnavne, nøglekonstanter, gruppe-filter-UI). Alle 37
funktionsnavne var identiske, og K/ELO-konstanterne (K=70, ELO_DIVISOR=850) matchede. MEN
produktionens gruppe-filter i punkt 1 var en helt anden, mere avanceret UI end den der fandtes i
preview-kilden på det tidspunkt:
- **Produktion** (`kampsystem.html`): `aktivGrupper` er et `Set` styret af et sæt CHECKBOKSE
  (`gruppe-checkboxes`-container) — man kan vælge FLERE grupper samtidig ("Senior + SuperUng Teen
  på én gang", fx).
- **Preview-kilde** (`kampsystem_source.html`, FØR rettelsen): `aktivGruppe` var en simpel STRING
  styret af ét `<select id="gruppe-select">` — kun ÉN gruppe (eller "Alle grupper") ad gangen.
- Produktion havde desuden en `MOTIONIST_GRUPPE = 'Motionist'`-konstant (fast tilgængelig
  mål-gruppe i "Tilføj til gruppe"-vælgeren) som slet ikke fandtes i preview-kilden.

**Årsagen blev fundet ved at krydstjekke `docs/idebank-kampsystem.md`s egen historik:**
multi-gruppe-checkboks-filteret og "Ungsenior"-gruppen blev bygget i PREVIEW i fjerde runde
2026-09-03, "Motionist" tilføjet i femte runde samme dag — og PRÆCIS denne version af
`kampsystem_source.html` blev kopieret til produktion i syvende runde. `kampsystem_source.html`
i `kampsystem/` var altså på et tidspunkt EFTER syvende runde blevet
regredieret/overskrevet med en ældre version — samme klasse fejl som 2026-08-31-lærestykket i
`docs/historik/dropbox-filstruktur.md` (forkert kilde antaget/brugt ved en genbygning), bare opdaget nu i
stedet for med det samme. Tidspunkt/årsag for selve regressionen er ikke undersøgt yderligere.

**RETTET 2026-09-04, samme session, på Chris' anmodning ("gotta fix A6 immediately"):**
`kampsystem_source.html` er opdateret til at matche produktionens gruppe-UI 1:1 — HTML-markup
(`.gruppe-checkboxes`-container i stedet for `<select id="gruppe-select">`), CSS, konstanten
`MOTIONIST_GRUPPE`, variablerne `aktivGrupper`/`kendteGrupper` (Set'er i stedet for
`aktivGruppe`-strengen), og alle fem steder i koden der brugte det gamle filter
(`opsaetGruppeSelect`, `renderRoster`, `vaelgAlleTilstede`, `opdaterLaasDropdowns`,
`genererRunde`, samt reset i `nulstilEksempeldata`). Verificeret med `node --check` på den
udtrukne JS (syntaksfejlfri) og en grep-gennemgang der bekræfter INGEN resterende referencer til
det gamle `aktivGruppe`/`gruppe-select`. Skrevet tilbage til
`kampsystem/kampsystem_source.html` via enhedsbroen (kun denne fil i
preview-kilde-mappen — INGEN produktionsfiler rørt, det var allerede kun produktion der havde den
rigtige version). A5-buggen findes fortsat identisk i begge filer (se A5) — ikke rørt af denne
rettelse.

**Ikke gjort som en del af denne rettelse, mulig opfølgning:** selve det publicerede
Claude-preview (`gsb_preview.html`/Artifact-URL'en) er IKKE genbygget/republiceret fra den nu
rettede kilde — uvist om det aktuelt kørende preview allerede havde multi-gruppe-UI'en (bygget
før regressionen ramte kildefilen) eller er blevet regredieret undervejs. Bør tjekkes/genbygges
hvis det bliver relevant, men var ikke en del af "fix A6" (som handlede om selve kildefilens
afvigelse fra produktion).

Status: **rettet — `kampsystem_source.html` matcher nu produktionens gruppe-UI. Preview-artifact-
status uverificeret, se note ovenfor.**

## A7. Fuld `ageGroupId`-tabel for ALLE ungdomsrækker (U9/U11 m.fl.) — TESTET 2026-09-04

**Baggrund:** 0.1's `ageGroupId`-tabel er bekræftet for SEN/U13/U15/U17-19/SEN+40/50/60/70, men
dækkede endnu ikke U9 og U11.

**Testet live 2026-09-04:** `badmintonPlayerTeams(clubId: 1093, season: 2026)` kaldt direkte
(via browseren, ingen login nødvendigt) — 31 hold returneret for GSB i 2026-sæsonen. Fund:
**GSB har INGEN U9- eller U11-hold tilmeldt i 2026-sæsonen** — ingen `league`-streng indeholder
"U9" eller "U11", og de eneste `ageGroupId`-værdier der optræder er de 8 allerede kendte fra 0.1
(1=SEN, 4=U13, 5=U15, 9=SEN+40, 11=SEN+50, 13=SEN+60, 17=SEN+70, 18=U17/U19) — ingen nye værdier
dukkede op. Dette er ikke en mangel i undersøgelsen, men et reelt, bekræftet fravær: klubben
fielder ikke et hold i de rækker denne sæson.

**Konsekvens for B3:** 0.1's 8-værdis `ageGroupId`-tabel er dermed reelt KOMPLET for alle
aldersgrupper klubben faktisk har hold i lige nu — B3 er ikke længere blokeret af manglende
U9/U11-data. Skulle GSB oprette et U9/U11-hold i en fremtidig sæson, skal tabellen udvides igen
på det tidspunkt (samme metode).

Status: **afsluttet — ingen U9/U11-hold at teste mod, tabellen er komplet for indeværende
sæson.**

---

# DEL B — Klar til bygning (design fastlagt, venter kun på byg-signal)

## B1. Kampkalender — webvisning (alle hold) + Google Calendar-sync (udvalgt scope) — AFTALT 2026-08-31, DATAKILDER + PROOF-OF-CONCEPT BEKRÆFTET 2026-08-31, IKKE LÆNGERE BLOKERET (A1 afklaret 2026-09-03)

**Baggrund:** Chris har i forvejen en manuel Google Calendar med en del holdkampe indlagt,
men Nembadminton flytter jævnligt kamptidspunkter, så kalenderen kræver konstant manuel
vedligehold. Løsning: automatisér både visningen i webappen og selve Google Calendar-eventerne.

**Scope — bevidst forskelligt for de to visninger:**
- **Web-visningen i GSB-appen:** viser ALLE klubbens holdkampe — ungdom (U9-U19), senior
  (alle hold, ikke kun GSB 1-4/1-7) og veteran (35+, 40+, 50+, 60+, 70+ osv.). Ingen
  filtrering her; det er den brede, "se alt"-visning.
- **Google Calendar-sync:** skriver KUN events for GSB 1-7 (`ageGroupId: 1`) samt 40+
  1.holdet (`ageGroupId: 9`, `leagueGroupId: 18910`) og 50+ 1.holdet (`ageGroupId: 11`,
  `leagueGroupId: 18916`). Begrundelse fra Chris: flere hold i selve Google Calendar ville
  gøre den "bloated" — det er en personlig kalender han skal kunne overskue, ikke et fuldt
  klub-dashboard.
- Begge visninger trækker fra samme underliggende datahentnings-mønster — kun filtreringen
  ved brug er forskellig.

**Datakilder — bekræftet live, se DEL 0.1/0.2 for detaljer og testdata:**
- **GSB 1-7 (senior, ageGroupId 1):** `calendarEvents(clubIds: [1093])` — ét hurtigt,
  login-frit kald, dækker alle 7 seniorhold.
- **40+ og 50+ 1.holdene:** `calendarEvents` dækker dem IKKE — hentes via
  `badmintonPlayerTeamFights` med de specifikke (ageGroupId, leagueGroupId)-par fundet i 0.1
  (9/18910 og 11/18916). Ét let kald pr. hold, ikke pr. kamp.
- **Alle øvrige hold (ungdom, øvrige veteranrækker) til web-visningen:** samme
  `badmintonPlayerTeams` → `badmintonPlayerTeamFights`-mønster, ét kald pr. hold/pulje (~31
  kombinationer i den nuværende sæson) — ingen `teamMatch`-kald nødvendige for kommende kampe
  (kun relevant for AFSLUTTEDE kampes resultater, jf. `docs/idebank-statistik.md`s
  ugentlige sync-forslag).
- **Nøglefelt til at opdage flytninger:** `gameTime` fra `teamFights`.

**Google Calendar-sync — teknisk design (Apps Script, ingen separat nøgle nødvendig) — GRUNDMEKANIKKEN ER PROOF-OF-CONCEPT-BEKRÆFTET (se 0.3):**
- Et Google Apps Script-projekt (samme grundteknologi som Ungdomssparrings eksisterende
  backend), der kører under Chris' eget Google-login og derfor IKKE kræver nogen separat nøgle
  eller deling af credentials med nogen — scriptet har adgang til Chris' kalender fordi det
  kører som ham. (Se DEL C for hvorfor dette blev valgt frem for en Netlify-funktion med en
  Google Cloud service-konto.)
- Henter kampe via `UrlFetchApp`: ét `calendarEvents`-kald + to `teamFights`-kald (40+, 50+).
- Opretter/opdaterer events i Chris' kalender via `CalendarApp`, filtreret til den aftalte
  holdliste.
- Genkendelse af "samme kamp, ny tid" (i stedet for dubletter): `matchId` gemmes som tag på
  hvert Calendar-event (via `event.setTag('nembadmintonMatchId', matchId)`, læses tilbage med
  `event.getTag(...)`); ændring i `gameTime` udløser en opdatering af eventets tidspunkt.
- Kørsel: Apps Scripts egne indbyggede "tidsstyrede triggere" (samme mekanisme som en cron
  job). Kan sættes til at køre hyppigt (fx dagligt) uden performance-bekymring.
- **Aflyste kampe — AFKLARET 2026-09-03 (Chris: "Lad os ignorere aflyste kampe"):** ingen
  særlig sletnings-/statusdetektions-logik bygges til aflyste kampe i første version — de
  behandles som enhver anden kamp der forsvinder fra det næste sync-svar. Kan genbesøges senere
  hvis det viser sig utilstrækkeligt i praksis.
- **Resterende arbejde til den fulde version (ikke testet i proof-of-concepten):** den reelle
  "find eksisterende event med dette matchId og opdater det i stedet for at oprette et nyt"
  -logik (kræver at iterere allerede-oprettede events og tjekke deres tag, da Apps Script ikke
  har en indbygget "søg efter tag"-funktion).

**DISCLAIMER — hvordan dette forholder sig til den "rigtige", shippede side:**
Dette er bevidst en ANDEN teknisk løsning end resten af Dream Team-sitet (som kører Netlify
Functions + Google Sheets, versionsstyret i Dropbox-kopien af koden). Vigtige konsekvenser at
have med, hvis/når dette skal shippes til produktion:
- **Ejerskab er personligt, ikke klub-institutionelt.** Fordi scriptet kører under Chris' eget
  Google-login (ligesom Ungdomssparrings Apps Script allerede gør), er det knyttet til hans
  konto — ikke en neutral, delt "klub-robot". Hvis Chris på et tidspunkt stopper som
  administrator, skal scriptet og dets triggere flyttes/genskabes under en ny konto (eller en
  fælles klub-Google-konto, hvis GSB opretter én) — det kan ikke bare overdrages med en
  adgangskode-ændring, sådan som en Netlify-miljøvariabel kunne.
- **Ikke versionsstyret sammen med resten af koden.** Netlify-funktionerne ligger i den samme
  Dropbox-mappe/git-lignende struktur som alt andet GSB-kode; et Apps Script-projekt lever
  inde i Google's egen editor, tilgængeligt via script.google.com under Chris' konto. Det bør
  jævnligt eksporteres/kopieres til Dropbox-mappen som backup/dokumentation, ligesom
  Ungdomssparrings script formentlig burde, så det ikke kun findes ét sted.
- **Egne kvoter, adskilt fra Netlify.** Apps Script har sine egne daglige kvoter for
  `UrlFetchApp`-kald og triggerkørsler (rigeligt til dette formål — én kalender-sync om dagen
  er langt under grænserne — men værd at kende, hvis brugen nogensinde udvides markant).
- **To parallelle Apps Script-projekter, ikke ét delt.** For at holde denne feature adskilt fra
  Ungdomssparrings tilmeldings-logik (så en fejl i det ene ikke kan påvirke det andet) foreslås
  et selvstændigt nyt Apps Script-projekt til kalender-sync'en, ikke en udvidelse af det
  eksisterende Ungdomssparring-script. Proof-of-concept-testen (0.3) blev allerede kørt i et
  sådant separat testprojekt, mod en dedikeret testkalender Chris oprettede specifikt for ikke
  at risikere sin eksisterende, håndlavede kalender.
- **Dette ændrer IKKE noget ved web-visningen af kalenderen** (den del af B1 der viser kampe
  inde i selve GSB-webappen) — det er stadig almindelig klientkode i de rigtige HTML/JS-filer,
  præcis som resten af sitet. Kun selve SKRIVNINGEN til den eksterne Google Calendar bruger
  Apps Script-tilgangen beskrevet ovenfor.

**Resterende, ikke-blokerende åbne spørgsmål:**
- Skal resultatet vises inline i kalenderen (score, vinder) eller kun et "resultat findes"-link
  med detaljer ved klik?
- Skal kalenderen være sin egen "app"/side i navigationen, eller en widget indlejret i
  eksisterende sider (landing, Statistik)?
- Skal den endelige version skrive til Chris' testkalender (omdøbt/gjort permanent) eller til
  en ny, tredje kalender? Ikke besluttet — testkalenderens ID er kendt og kan genbruges hvis
  Chris ønsker det.

Status: **design aftalt, datakilder bekræftet live, grundmekanikken (skrive, hente, tag-baseret
genkendelse) proof-of-concept-bekræftet, og aflysningshåndtering afklaret ved bevidst
scope-beslutning (2026-09-03: ignorér aflyste kampe).** INGEN tilbageværende blokerende
spørgsmål — kun eksplicit byg-signal mangler.

## B2. Ungdomssparring i previewet: skift fra synthetic mock til rigtig, live data — BYGGET I PREVIEW 2026-08-31

**Baggrund:** den RIGTIGE, live Ungdomssparring-side (`senior-ungdom-tilmelding.html`) har
allerede en fungerende Apps Script + Google Sheets-backend med rigtige tilmeldinger. Det var
kun Claude-**previewet** der viste opdigtede eksempelnavne (fem syntetiske signups indbagt af
build-scriptet), ikke selve produktionssiden.

**Sådan er det bygget:** previewets `senior_preview.html` kalder nu det samme, rigtige
`SCRIPT_URL` LIVE for LÆSNING (GET, listen af tilmeldinger) — samme login-frie kald som
produktionssiden selv bruger, direkte fra browseren, ingen hemmelig nøgle involveret.

**Bevidst afgrænsning — SKRIVNING (POST, "Tilmeld"-knappen) er stadig mocket:** B2's aftalte
scope handlede om at VISE rigtige data i previewet, ikke om at lade preview-besøgende skrive
rigtige tilmeldinger til det live Google Sheet/Apps Script ved et uheld. `build3.py` mocker
derfor kun POST-kald til `SCRIPT_URL`-fragmentet (returnerer en fake "ok" efter en kunstig
delay, skriver intet rigtigt sted), mens GET-kald går uændret igennem til det ægte endpoint.
Ikke aftalt eksplicit med Chris — flag det hvis write-siden også skal gå live.

Status: **bygget i Claude-previewet 2026-08-31**, læsning er live/rigtig, skrivning er fortsat
mocket. Intet rørt i de rigtige produktionsfiler (var allerede korrekt konfigureret der).

## B3. Klubstatistik — ny top-level side med al klubbens data (ungdom + senior + veteran), adskilt fra Dream Team — AFTALT 2026-08-31

**Baggrund:** trænerne (og evt. bestyrelsen) vil gerne kunne se statistik for HELE klubben,
ikke kun de fire Dream Team-hold (GSB 1-4) — særligt ungdom, som slet ikke er dækket i dag.
Uddyber og lander det tidligere forslag "Adskil Dream Team-statistik fra generel
GSB-klubstatistik", se `docs/idebank-statistik.md`.

**Grundprincip — to lag holdes fysisk adskilt, ikke bare visuelt filtreret:**
Dream Team-røret (Tilmeldinger → Holdoversigt → Resultater → Spillerpoint → Beregning →
Stilling) røres IKKE og fodres fortsat kun manuelt med GSB 1-4's kampe, præcis som i dag.
Klubstatistikken får sin egen, parallelle datakilde og pipeline — lærdommen fra
win%-dedup-bugget (se `docs/idebank-statistik.md`) er netop at koble et nyt formål oveni
det eksisterende Resultater-flow er det der skaber den slags fejl.

**Placering — AFTALT:** en helt ny, selvstændig top-level side i nav'ens øverste lag, ved siden
af Forside, GSB Dream Team, Ungdomssparring og Søndagstræning (ikke en filtreringsmulighed inde
i den eksisterende Statistik-side).

**Scope og filtrering — AFTALT:** ét samlet datasæt for HELE klubben (ungdom, senior, veteran —
inkl. GSB 1-4, som dermed optræder i begge lag, men fra hver sin uafhængige kilde), med en
Alle/Ung/Sen/Vet-opdeling som et klient-side filter/faneskift OVENPÅ det samme datasæt — ikke
separate datahentninger pr. afdeling. Afdelings-tagget pr. kamp udledes af `ageGroupId`
(tabellen i 0.1: 1=Sen, 4/5/18=Ungdom (U13/U15/U17-19), 9/11/13/17=Veteran) — denne tabel
dækker endnu ikke ALLE ungdomsrækker (fx U9/U11 er ikke selv testet/bekræftet endnu), så den
skal udvides ved bygning, men det er en ligetil opslags-udvidelse, ikke en åben designbeslutning.

**Datakilde og sync — teknisk design:**
- Nyt Google Sheets-faneblad, `AlleResultater`, samme rå rækkeformat som `Resultater` men for
  ALLE hold (ingen begrænsning til GSB 1-4), plus en `Afdeling`-kolonne udledt af `ageGroupId`.
- Ny Netlify **scheduled function** der bruger klub-ID-kæden (`badmintonPlayerTeams` →
  `badmintonPlayerTeamFights` → `badmintonPlayerTeamMatch`, alle bekræftet login-frie og
  fungerende for ungdom i 0.1/0.2, se `docs/nembadminton-api.md`) til automatisk at finde og
  hente ALLE klubbens spillede kampe — ingen manuel matchId-indtastning, i modsætning til Dream
  Team-siden.
- **Sync-tidspunkt — AFTALT 2026-08-31, generel regel:** kører ugentligt, mandag morgen, fordi
  Nembadmintons egne ranglister mv. opdateres kl. 00:00 natten til mandag — så sync'en fanger
  hele den forgangne uges kampe med opdaterede tal med det samme. Denne regel gælder generelt
  for alle fremtidige ugentlige sync-mekanismer i projektet, ikke kun denne feature.
- Bør fra dag ét håndtere `"Ikke fremmødt"`-walkovers korrekt (se
  `docs/idebank-statistik.md`s fund om at den eksisterende `hent-resultater.js` IKKE gør
  dette) — ny kode, ingen grund til at arve den bug.

**Statistik-siden selv:**
- Ny side, læser fra `AlleResultater` i stedet for `Resultater` — helt uafhængig af
  Spillerpoint/Dream Team-beregningen.
- Genbruger sandsynligvis det meste af den eksisterende `runAnalyse`-beregningslogik
  (winrate pr. spiller/hold/kategori, allerede bygget og valideret i previewet) mod det bredere
  datasæt, plus Alle/Ung/Sen/Vet-faneskiftet beskrevet ovenfor.

**Resterende, ikke-blokerende åbne spørgsmål (afklares ved bygning, ikke før):**
- Præcis navn/ikon til nav-kortet (fx "🏅 Klubstatistik").
- Skal GSB 1-4's kampe i `AlleResultater` (automatisk hentet) vises som separate fra Dream
  Team, eller er det tydeligt nok at det bare er "Senior"-fanens indhold uden yderligere
  markering af at nogle af de hold også spiller Dream Team?
- Fuld `ageGroupId`-tabel for alle ungdomsrækker (U9/U11 endnu ikke bekræftet) — ren
  opslags-udvidelse af 0.1, ikke en beslutning.
- **Mulig fremtidig statistik-tilføjelse, endnu ikke en del af scopet ovenfor:** "performance vs.
  ranglistepoint"-stat (se A4) — om en spillers resultater står mål med deres BD-niveau på
  kamptidspunktet. Kræver A4 løst (dato-præcist point-opslag for vilkårlige modstandere) før det
  kan blive et konkret B-underpunkt.

Status: **design aftalt (placering, scope, filtrering, datakilde, sync-tidspunkt) — klar til
DEL B.** Ingen kode rørt endnu, afventer eksplicit "byg det"-signal.

## B4. ELO-rating + automatisk rundefordeling til træning — RAMMER OG ALGORITME AFTALT 2026-08-31, AFVENTER A3

**Baggrund:** en af de andre trænere har bedt om et værktøj der kan generere trænings-runder/
matchups ud fra spillernes niveau, med "hukommelse" om tidligere spillede kampe/makkere —
inspireret af et lignende system en tidligere trænerkollega har bygget. Dette er arkitektonisk
anderledes end resten af projektet: et lille, LIVE planlægningsværktøj brugt UNDER selve
træningen (hurtig interaktion), ikke en "vis statistik"-side.

**Placering — AFTALT:** egen top-level app i navigationens øverste lag, sammen med
Forside/GSB Dream Team/Ungdomssparring/Søndagstræning.

**Ratingsystem — AFTALT:**
- Én delt, klubbred rating-pulje pr. disciplin (single/double) — IKKE opdelt efter hold eller
  niveau. Alle spillere er på samme skala, ligesom BDs egen rangliste dækker hele landet uanset
  niveau; en spiller der rykker fra fx Plus til Super tager sin rating med sig ind i det samme
  system.
- Seedes fra Badminton Danmarks eksisterende pointrækker, ikke frisk start. BD giver tre
  allerede adskilte rækker pr. spiller — Single, Double og Mixed — hvilket løser
  seedings-splitting-spørgsmålet direkte, uden at skulle gætte os frem til en opdeling.
- Kilde: `memberStats(id)`s `single`/`double`/`mix`-felter — Nembadmintons EGEN allerede
  gender-neutrale aggregering pr. disciplin, ikke de rå kønsopdelte HS/DS/HD/DD/MxH/MxD-kategorier.
  Struktur, friskhed og roster-opbygning er nu TESTET og bekræftet god, se **0.5**.

**ELO-formel — AFTALT som udgangspunkt (justerbar senere ud fra erfaring):**
- Standard Elo: `E_A = 1 / (1 + 10^((R_B - R_A)/400))`, `R_ny = R_gammel + K * (resultat - E_A)`.
- K-faktor: 32 som startværdi. **[Se opdatering nedenfor — genkalibreret til divisor 850/K=70
  2026-09-02, samt Chris' spørgsmål 2026-09-03 om at gøre K erfarings-afhængig som BD's eget
  system, se `docs/idebank-kampsystem.md`.]**
- Rating opdateres LØBENDE gennem sæsonen: træneren markerer vinder pr. bane umiddelbart efter
  hver kamp, hvorefter ratingen for de involverede spillere opdateres med det samme. Træneren
  kan altid overskrive/rette et indtastet resultat bagefter.
- Sætresultater kan også indtastes (valgfrit, ikke påkrævet for selve ELO-beregningen, som kun
  bruger vinder/taber) — bruges senere til at afgøre holdsætning til rigtige holdkampe, et
  separat, sekundært formål.

**Rundefordelings-algoritme — AFTALT som udgangspunkt (grådig heuristik, hurtig nok til det
5-10 minutters forberedelsesvindue trænerne reelt har til rådighed, ca. 1-3 runder pr. aften):**
1. Filtrér fremmødte spillere efter denne aftens valg (single/double/begge).
2. Træk trænerens låste/manuelt fastsatte kampe ud af puljen først.
3. Sortér resten efter rating inden for hver disciplin.
4. Byg kampe/hold: par spillere/hold så tæt i rating som muligt, med et blødt (ikke absolut)
   forsøg på at undgå modstandere/makkere fra HELE kamphistorikken (ikke kun aftenens) — en tung
   optimeringsalgoritme ville tage for lang tid til tidsvinduet, så det skal være en hurtig
   heuristik, ikke noget der regner sig frem til det matematisk perfekte match.
5. Fordel de færdige kampe på de ledige baner; roter automatisk hvem der sidder over, hvis flere
   spillere end plads tillader over flere runder.

Double-parringen i trin 4 bruger den filosofi (balanceret vs. jævnbyrdig par), træneren har
valgt for aftenen — begge understøttes, ikke hardkodet til én tilgang.

**[OPDATERING 2026-09-03, se `docs/idebank-kampsystem.md`:** Chris har rejst tre nye punkter der
ændrer trin 5 og double-parringen ovenfor, alle kun undersøgt/logget, IKKE bygget endnu: (a)
banetal skal begrænse hvor mange kampe der GENERERES fra start, ikke kun style visningen
bagefter (ingen "venter på bane"); (b) undgå så vidt muligt rene kønsopdelte double-hold (H/H
mod D/D) i de højere pointlag; (c) en "Nulstil runde"-knap der kun fortryder den aktuelle,
ikke-afgjorte runde, samt en tydeligere/mere fremtrædende oversidder-håndtering. Se
kampsystem-idébanken for detaljerne.]**

**Facilitet:** 2 haller á 5 baner (10 i alt), men nogle gange er 1 bane pr. hal en teknikbane og
dermed ikke spilbar — ledigt bane-antal er derfor et input træneren angiver pr. træning, ikke en
konstant.

**Gentagelses-undgåelse:** algoritmen kigger i hele kamphistorikken, men træneren kan altid
overside/låse specifikke kampe manuelt, uanset hvad algoritmen foreslår.

**Sæson-håndtering:** rating nulstilles/genseedes som udgangspunkt ÉN gang pr. sæson, med en
admin-mulighed for at "genindsætte"/manuelt justere enkelte spilleres rating uden for den
automatiske årlige reset.

**Datamodel — AFTALT, fem nye Google Sheets-faneblade:**
- `ELO_Spillere` — navn, single-/double-rating, kamptællere (single/double), BD-seed-værdi +
  dato, sæson for sidste reset, status (aktiv/inaktiv).
- `ELO_Kampe` — kamp-ID, dato + træning, type (single/double), deltagere (Spiller A1/A2, B1/B2),
  vinder, valgfrie sætresultat-kolonner (kan stå tomme), rating-ændring pr. spiller,
  låst-af-træner-flag. Dette er selve "hukommelsen" rundefordelings-algoritmen slår op i.
- `ELO_Traeningsskabeloner` — faste, tilbagevendende træninger: navn, ugedag + tid, kategori,
  standard-spillerliste, standard bane-antal.
- `ELO_Traeninger` — den konkrete træning på en given dato, oprettet ud fra en skabelon (eller
  ad-hoc): dato, hvilken skabelon, baner ledige den dag.
- `ELO_Fremmoede` — én række pr. spiller pr. konkret træning: status. KUN trænerstyret — ingen
  spiller-selvbetjening (spillerne er for det meste børn), i modsætning til
  Søndagstræning-appens spiller-selvbetjeningsmønster.

**Skabeloner — minimumsscope AFTALT 2026-08-31, afventer A3 for den fulde liste:** som minimum
alle hold i kategorierne Plus, Super, Supertræn og Senior — konkret disse 16 træningsslots
(fundet ved at gennemgå klubbens fulde 43-holds trænings-skema på gladsaxebadminton.dk/teams):

| Hold | Ugedag/tid | Hal |
|---|---|---|
| Plus Barn - Mandag | Mandag 15:30-17:00 | Hal 1 |
| Plus Barn - Torsdag | Torsdag 15:30-17:00 | Hal 1 |
| Plus Ung/Teen - Mandag | Mandag 17:00-18:30 | Hal 2 |
| Plus Ung/Teen - Tirsdag | Tirsdag 15:30-17:00 | Hal 2 |
| Plus Ung/Teen - Torsdag | Torsdag 18:00-19:30 | Hal 1 |
| Plus Ung/Teen 2 - Onsdag | Onsdag 17:00-18:30 | Hal 2 |
| Plus Ung/Teen 2 - Torsdag | Torsdag 16:45-18:15 | Hal 1 |
| Super Barn - Tirsdag | Tirsdag 15:30-17:00 | Hal 1 |
| Super Barn - Torsdag | Torsdag 15:30-17:15 | Hal 2 |
| Super Ung/Teen - Tirsdag | Tirsdag 16:45-18:30 | Hal 1 |
| Super Ung/Teen - Torsdag | Torsdag 17:15-19:15 | Hal 2 |
| Supertræn - Fredag | Fredag 16:30-18:30 | Hal 1 |
| Senior fællestræning 1 | Mandag 18:30-20:00 | Hal 1 |
| Senior fællestræning 2 | Mandag 20:00-21:30 | Hal 1 |
| Senior Turnering | Tirsdag 18:30-20:30 + Torsdag 19:00-21:00 | Hal 2 |
| Senior Turnering 2 | Mandag 18:30-20:00 | Hal 2 |

Ikke medtaget i minimumslisten (foreløbig vurdering, ikke endeligt afvist — afventer
cheftrænerens svar, se A3): Mikroton/Miniton (3-8 år), Basis-niveauet, Individuel
Teknik/Styrketræning/Pigetræning, Veteran 1-3, Motionist-holdene, samt
ikke-trænings-medlemskaberne Passive og GSB's Venner. Dette er kun en afgrænsning af hvor
VÆRKTØJET bruges — ikke en begrænsning af hvem der kan indgå i det fælles rating-system.
**[Bemærk: i selve Kampsystem-prototypen har Chris allerede 2026-09-03 tilføjet Motionist og
Veteran som frit tilgængelige, tomme grupper spillere kan tilføjes til (se
  `docs/idebank-kampsystem.md`) — det er en anden ting end skabelon-scopet her, som handler om
FASTE, tilbagevendende trænings-hold. Skaber ikke en modsigelse: en spiller kan sagtens tilføjes
manuelt til Kampsystemets Motionist-gruppe uden at der findes en fast ELO_Traeningsskabelon for
"Motionist" som helhed.]**

**Vigtig teknisk begrænsning fundet ved research (2026-08-31):** klubbens fulde trænings-skema
findes på gladsaxebadminton.dk/teams, som kører på Zakobo (klubbens tilmeldings-/
betalingsplatform) — IKKE Nembadminton. Ingen API-adgang til Zakobo; kun hold-navne/tider/haller
kunne læses direkte af siden i browseren, ikke de faktiske spillerlister (bag login). Standard-
spillerlisten pr. `ELO_Traeningsskabelon` skal derfor tastes ind manuelt i vores eget system,
ikke autohentes.

**Resterende, ikke-blokerende åbne spørgsmål:**
- Skal spillere kunne vælge "kun single"/"kun double" pr. spiller pr. given træning, eller er
  det underforstået at man spiller begge dele på skift inden for aftenen? Rejst af Chris,
  teknisk muligt men gør rundefordelings-algoritmen mere kompleks (to adskilte puljer pr.
  runde) — **AFKLARET 2026-09-02: løst pr. runde i stedet for pr. aften, se
  `docs/idebank-kampsystem.md`.**

Status: **rammer, ratingsystem, Elo-formel, rundefordelings-algoritme, datamodel, placering,
seeding-kilde (`memberStats`s `single`/`double`/`mix`-felter, se 0.5) og minimumsscope for
skabeloner er aftalt 2026-08-31.** A3 er lagt væk 2026-09-04 (se A3) — den fulde skabelon-liste
afgøres først når Chris får adgang til klubbens rigtige holdliste, ikke via cheftræneren. Selve
DEL B4's fulde trænings-skabelon-system (`ELO_Traeningsskabeloner` m.fl., Fase 4 nedenfor) står
derfor uden en blokerende afhængighed, men uden en endelig liste at bygge ud fra endnu — reelt
"afventer Chris" i stedet for "afventer en ekstern person". Selve rundefordelings-værktøjet
(Fase 1-3) er IKKE blokeret af nogen af delene — det er allerede bygget og shippet til
produktion, se Fase-planens status nedenfor.

### Fase-plan til at gøre Kampsystem-PROTOTYPEN live — aftalt scope 2026-09-01

Chris har bedt om den fulde rigtige version (Sheets-backend + BD-seeding), ikke bare
prototypen deployet med eksempeldata. **Bevidst afgrænset scope for "live" her: kun selve
rundefordelings-værktøjet (roster + ratings + kamphistorik, persisteret), IKKE hele B4's
trænings-skabelon-system** (`ELO_Traeningsskabeloner`/`ELO_Traeninger`/`ELO_Fremmoede` fra
datamodel-afsnittet ovenfor) — det er stadig blokeret af A3 og kan bygges som et selvstændigt
skridt senere, uden at det forsinker selve rundefordelingen. Fire faser, i rækkefølge:

**Fase 1 — Google Sheets-backend for roster + ratings + kamphistorik — DEPLOYET 2026-09-02,
FILERNE BEKRÆFTET I PRODUKTION 2026-09-03 (RETTET STATUS, se nedenfor).** To faneblade i det NYE,
separate Kampsystem-Google Sheet (spreadsheetId `12hIYb2roD2RjyeBX6eTY0ZBl91zXV1UuWhGmR58ga5c`,
bekræftet oprettet af Chris 2026-09-02 med rigtige headers og delt med service-kontoen):
`ELO_Spillere` (Navn, Gruppe, Single, Double, Mix, SidstOpdateret) og `ELO_Kampe` (Tidsstempel,
Runde, Type, A1, A2, B1, B2, Vinder, RatingÆndring, Sæt1, Sæt2, Sæt3). To Netlify-funktioner,
`elo-hent.js` (GET) og `elo-gem.js` (POST), er skrevet direkte ind i
`apps/netlify-prod/netlify/functions/` via repoet.

**RETTET STATUS (2026-09-04, jf. `docs/historik/driftlog.md`s ottende/syvende runde) — denne fils
oprindelige afsnit her nævnte at "Chris skal selv committe og pushe disse to nye filer til git,
så Netlify bygger og deployer dem". Det var baseret på en forkert antagelse: Chris bruger IKKE
git — han overfører hele `apps/netlify-prod/`-mappen manuelt til Netlify (hans eget udtryk:
"lidt primitiv versionskontrol"). Det reelle forløb siden da:**
- `elo-hent.js`/`elo-gem.js` blev bekræftet 2026-09-03 (syvende runde) at ligge byte-for-byte
  identisk i den rigtige `apps/netlify-prod/`-mappe (ingen genupload nødvendig).
- `kampsystem.html` (den produktionsklare version, uden preview-nav-script/banner) blev samme
  runde skrevet direkte ind i `apps/netlify-prod/public/kampsystem.html`.
- Ottende runde: Kampsystem blev integreret i den fælles produktions-nav (`gsb-nav.js`) med sin
  egen kode-gate (`kamp2026`), som en del af den bredere nav/IA-omlægning.
- Ellevte runde: Kampsystem blev testet LIVE på `gsbmore.netlify.app/kampsystem.html` — nav,
  gate, live Sheets-hentning og en rigtig ELO-ratingopdatering (±26 point, matcher K=70/divisor
  850) blev alle bekræftet at virke i produktion. Se `docs/historik/driftlog.md` for detaljerne.
- **Konsekvens: Fase 1 er dermed reelt FÆRDIG og LIVE**, ikke længere "afventer commit/push" —
  den eneste tilbageværende usikkerhed er om `ELO_Spillere`/`ELO_Kampe`-fanebladenes struktur i
  det rigtige Google Sheet er 100% som forventet (kan ikke tjekkes af Claude uden Sheets-adgang,
  men "Hentet fra Sheets"-tidsstemplet der blev set i ellevte rundes test tyder på at det virker).

**Fase 2 — BD-rangliste-seeding af start-ratings — STORT SET FÆRDIG efter anden rettelsesrunde
(2026-09-02).** Kørt live i den indbyggede browser (samme metode som 0.5): 6
`highestPointGain`-kald (union → 382 GSB-medlemmer) + ét batch `membersStats(ids:[...])`-kald for
de matchede, denne gang inkl. `mix`. Første runde matchede 54/61 rigtige spillere (43 senior + 18
SUT ungdom) med ægte single/double-point. Chris rettede herefter, ud fra 5 rangliste-screenshots
fra badmintonplayer.dk, de resterende 7 uafklarede punkter 2026-09-02: Michelle Liljengren hedder
nu Michelle Christensen (samme BadmintonID/refId 930609-21, bekræftet via opslag), og de 4
SUT-ungdomspiger (Emilie Reinholdt Amelung, Katia Lundby Bresemann, Qingyi Marie Han, Guanyan
Chen) er nu seedet direkte fra screenshottene. `mix` er samtidig blevet et RIGTIGT gemt felt i
stedet for et klient-beregnet gennemsnit: rigtig mix-rating hvor fundet, ellers double som
fallback (Chris' regel), ellers null. Alt er skrevet direkte ind i `build3.py`s
`KAMPSYSTEM_ROSTER` (ikke via `elo-gem` — Fase 1's Sheets-backend er endnu ikke koblet til).
Genuint stadig manglende (bevidst `null`, ikke et opdigtet tal, jf. Chris' regel "giv dem ikke en
værdi lige pt"): Andreas Drasbek og August Carl Toftager-Larsen (alle tre felter null — findes
ikke på ranglisten endnu), samt 6 seniorspillere der kun mangler SINGLE (Camilla Bagge, Christian
Staal, Kenneth Hasselby, Lene Sørensen, Line Nielsen, Signe Aarøe Jørgensen — har ikke spillet
single). `kampsystem_source.html` håndterer nu disse null-felter: viser "–" i rating-tabellen, og advarer
hvis en fremmødt spiller mangler rating til den valgte disciplin — de kan dog STADIG vælges og
spille (se den nye "spillere uden rating må spille"-regel nedenfor). Se
`data/navne-alias.json` for den fulde liste.

**Trup-scope endeligt fastlagt 2026-09-03 (Chris: "Vi holder os til SuperUng Teen samt Senior (og
Veteran)"):** Kampsystemets roster dækker Senior og SuperUng Teen som faste, forudfyldte grupper
(som hidtil). **Veteran er BEVIDST IKKE en færdig, forudfyldt gruppe** — de 8 fiktive
"Veteran (eksempel)"-navne er FJERNET fra `KAMPSYSTEM_ROSTER` (Chris 2026-09-03: "Veteran
eksemplet skal fjernes"). I stedet kan Chris selv bygge en rigtig veterangruppe op løbende, efter
behov, via Kampsystemets eget søg/tilføj-system (se nedenfor) — enten ved at søge en kendt spiller
ind fra klublisten, eller ved manuel oprettelse — og vælge "Veteran" som mål-gruppe. Ingen
hardkodet veteran-spillerliste i koden; gruppen findes kun i det omfang Chris selv har tilføjet
spillere til den i sin aktive preview-session.

**[OPDATERING 2026-09-04 — trup-scope er reelt udvidet siden ovenstående blev skrevet, se
`docs/idebank-kampsystem.md` for detaljerne:** 2026-09-03 (fjerde runde) blev en ny gruppe
"Ungsenior" tilføjet (3 spillere med bekræftet overlap mellem SuperUng Teen og Senior flyttet
hertil), og gruppe-filteret blev lavet om fra enkelt-valgs-dropdown til checkbokse så flere
grupper kan kombineres frit. Samme dag (femte runde) blev "Motionist" tilføjet som endnu en
altid-tilgængelig, tom gruppe (samme mønster som Veteran) efter Chris' ønske. Trup-scopet er
altså reelt: Senior, SuperUng Teen, Ungsenior (fast/forudfyldt) + Veteran, Motionist (tomme,
Chris bygger dem selv op via søg/tilføj) — bredere end "Senior + SuperUng Teen (og Veteran)".]**

**Per-spiller kategorivalg (1, 2 eller 3 kategorier) — BYGGET 2026-09-02, RETTET 2026-09-03.**
Aftalt af Chris 2026-09-02: "vi kører per runde istedet for per aften" gør det tidligere åbne
spørgsmål om "kun single/kun double pr. spiller pr. aften" irrelevant, fordi alt allerede er
pr.-runde-baseret. Den FØRSTE implementering (2026-09-02) lagde kategorivalget forkert på
RUNDE-niveau ("Denne runde spilles" med tre afkrydsningsfelter for hele runden). Chris rettede
dette 2026-09-03: "Det er ikke runden der skal kunne vælges på den måde, det er hver spillers
kategorier i runden der skal kunne vælges i 1, 2, eller 3." Rundeniveau-afkrydsningen ("Denne
runde spilles") er derfor helt FJERNET igen, og erstattet af tre uafhængige afkrydsningsfelter
PR. SPILLER i roster-tabellen (punkt 1) — en spiller kan vælge 1, 2 eller alle 3 kategorier de er
villige til at spille denne runde. Ved rundegenerering placeres hver spiller i højst én kamp,
fordelt fair på tværs af puljerne (spillere med kun ét valg placeres først; spillere med flere
valg lægges i den pulje der p.t. har færrest spillere, for at holde puljestørrelserne nogenlunde
lige). Standard er alle 3 kategorier valgt, UNDTAGEN for spillere der kun mangler en
single-rating mens de har både double- og mix-rating (fx Kenneth Hasselby, Lene Sørensen — Chris
2026-09-03: "de spiller aldrig single alligevel") — for dem er single fravalgt som standard,
resten af spillerne (også dem uden nogen som helst rating) har alle 3 valgt som standard. Samtidig
omdøbt: **"SUT Ungdom (eksempel)" hedder nu "SuperUng Teen"** (ikke længere markeret som
eksempel-data). Det gamle "⚠"-tegn ved kategorier uden BD-rating er erstattet af en farve på
selve label-teksten, så roster-rækkerne ikke bliver skæve/ujævne ned gennem tabellen (Chris: "lav
den en anden farve så det ikke er skævt ned igennem").

**Bænk/udskiftningssingle for oversiddende spillere — BYGGET 2026-09-03.** Chris: "Det skal være
muligt at enten sætte oversiddende spillere (ulige antal?) på bænken/teknik eller sige at der er
udskiftningssingle for de sidste (uden ranglisteændringer)." Ved ulige puljestørrelser (fx 7
double-spillere) viser Kampsystemet nu, ud over den eksisterende "Sidder over denne runde"-liste,
to knapper: "Sæt på bænken/teknik" (ren markering) og "Lav udskiftningssingle (ingen
ratingændring)" — sidstnævnte parrer de oversiddende sammen i ekstra single-kampe der ALDRIG
giver ratingændring for nogen deltager, uanset om de har en rigtig BD-rating (nyt `udskiftning`-
flag på kampen, tjekket allerførst i `opdaterRating()`). Disse kampe logges stadig i kamplog/
historik, tydeligt markeret som udskiftningskamp. **[Chris har 2026-09-03 (ellevte runde) bedt om
at denne mekanisme gøres mere fremtrædende/eksplicit — se `docs/idebank-kampsystem.md`, kun logget,
ikke bygget endnu.]**

**Manuel oprettelse af ny spiller + søg/tilføj spiller fra hele klubben — BYGGET 2026-09-02/03,
NU MED FÆLLES GRUPPEVALG (inkl. Veteran) — TILFØJET 2026-09-03.** Sektion 0 på Kampsystem-siden
har to indgange til at tilføje en spiller til roster'en, der nu begge bruger den SAMME "Tilføj
til gruppe"-vælger:
- **Søgning:** alle 382 GSB-medlemmer (navn + BD-rating i single/double/mix, hentet 2026-09-02
  via samme union-metode som Fase 2) er indlejret i previewet (`gsb_alle_spillere.json`) og
  søgbare. En fundet spiller trækkes ind med det samme, sat til stede, med deres rigtige rating
  hvis den findes (ellers null, håndteret af null-safe-reglen ovenfor).
- **Manuel oprettelse:** kan spilleren ikke findes i søgningen, kan man oprette en midlertidig
  spiller (kun navn) med `single/double/mix = null` — kan spille med det samme (jf. null-safe-
  reglen), og "indplaceres" med rigtige BD-point senere når/hvis de findes i klublisten. Chris:
  "hvis de ikke kan findes, så skal man kunne lave en spiller som senere kan indplaceres så
  pointene kan regnes ud."
- **Fælles gruppevalg (ny 2026-09-03):** begge indgange bruger nu samme "Tilføj til gruppe"-
  dropdown, som altid tilbyder "Ekstra (tilføjet)" (standard/hurtig midlertidig gruppe), "Gæst"
  og "Veteran" — plus enhver eksisterende gruppe i roster'en (Senior, SuperUng Teen, ...).
  Chris 2026-09-03: "i Kampsystemet skal der være mulighed for at tilføje spillere (enten fra
  søgning) eller som tilføjelse til en veterangruppe. Så kan jeg nemlig selv gå ind og sætte de
  veteraner der er nødvendige ind." Dette er den konkrete mekanisme der lader Chris selv bygge
  veterangruppen op løbende, se trup-scope-afsnittet ovenfor. En egentlig sondring mellem
  "permanent tilføjelse til den faste trup" og "kun denne træning" samt en "midlertidig
  gæst"-variant med automatisk rating-tilbagerulning er stadig ikke bygget — se
  `docs/idebank-kampsystem.md`.

**Punkt 3 (lås/fastsæt kampe manuelt) — dropdown-adfærd bekræftet korrekt 2026-09-03.** Chris
rejste kortvarigt en bekymring om at spiller-dropdown'ene i punkt 3 kun tilbød "– auto –", men
konkluderede selv at det var en fejlopfattelse ("det var bare mig der var et kvaj") — den
oprindelige, bevidste opførsel (kun spillere allerede krydset af som "til stede" i punkt 1 kan
vælges her) er bekræftet rigtig og uændret. Begrundelse: uden den begrænsning ville fx
ungdomsspillere dukke op som valgmulighed selvom kun seniorspillerne rent faktisk var mødt op.

**Spillere uden BD-rating må godt spille — ny regel, BYGGET 2026-09-02.** Chris' eksplicitte regel:
"Lad dem spille midlertidigt, men der skal ikke kunnes miste/give point når man spiller med en
spiller der har ingen point i den kategori man spiller. Det skal være muligt at udregne det når de
har fået point på BD ranglisten senere." Implementeret ved rundegenerering: en spiller uden rating
i den valgte disciplin får en MIDLERTIDIG "effektiv rating" (gennemsnittet af de andre kendte
ratings i samme pulje denne runde, eller en neutral standardværdi 1500 hvis ingen er kendte) —
udelukkende til selve parringen, aldrig skrevet til deres rigtige felt. Vinder en kamp med mindst
én sådan spiller registreres kampen stadig (så den kan "udregnes" senere), men INGEN af deltagernes
rating ændres — UI'et viser en tydelig advarsel før kampen og en note i kamplogen efter.

**K-faktor/divisor genkalibreret — BYGGET 2026-09-02 (Chris: "Fix det korrekt").** De rigtige
BD-point har et markant større spænd (~1395-3314 for single i den nuværende trup, dvs. ~1919) end
de gamle eksempeltal (~900) — cirka 2,13× større. Løsning: skalerede BÅDE Elo-formlens divisor
(400 → 850) OG K-faktoren (32 → 70) med samme forhold, så formlens *relative* følsomhed over for
en given rating-forskel er uændret på den nye skala — ren mekanisk oversættelse. **[Chris har
2026-09-03 (ellevte runde) spurgt om K-faktoren bør gøres erfarings-afhængig, inspireret af BD's
eget pointsystem (aftagende udslag jo flere kampe en spiller har spillet) — undersøgt og
sammenlignet, men IKKE besluttet/ændret endnu, se `docs/idebank-kampsystem.md`.]**

**Fase 3 — adgangsstyring — AFKLARET OG BYGGET 2026-09-02.** Kampsystem-appen er nu password-gated
med koden `kamp2026` (samme gate-mekanisme som Admin/Søndagstræning i preview-shell'en, og — siden
ottende runde — også i selve produktions-nav'en `gsb-nav.js`).

**Fase 4 — trænings-skabeloner (fuld B4-datamodel).** `ELO_Traeningsskabeloner` m.fl., blokeret
af A3 som hele tiden. Kan bygges helt uafhængigt af Fase 1-3 når A3 er afklaret — ingen grund
til at vente med at gå live med selve rundefordelingen.

Status: **Fase 1-3 er alle bygget OG (siden 2026-09-03, syvende/ottende/ellevte runde) reelt
LIVE i produktion, verificeret ved en live test på `gsbmore.netlify.app` (nav, kode-gate,
Sheets-hentning og en rigtig ELO-opdatering virkede alle korrekt) — se `docs/historik/driftlog.md` for den
fulde verifikation.** Kun Fase 4 (trænings-skabeloner) mangler, blokeret af A3.

**OPDATERING 2026-09-04 (byggerunde):** Chris' opfølgende ønsker fra live-testen er nu delvist
bygget — se A5 ovenfor og `docs/idebank-kampsystem.md`s "BYGGERUNDE 2026-09-04"-afsnit for det
fulde billede. Kort: bane-begrænset generering (venter-på-bane fjernet), oversidder-tæller +
rotation, kønsbevidst double-parring (kode klar, kræver en separat kønsseedings-kørsel før den
har effekt), "Nulstil runde" og den udvidede manuel-redigering (mulighed 3 + "Bekræft
ændringer") er alle bygget og testet i preview-kilden — kun K-faktor-erfaringsafhængighed er
fortsat parkeret (Chris: "det virker fornuftigt for nu"). **Intet af dette er kopieret til
produktion endnu** — afventer Chris' test af den leverede standalone-preview-fil.

## B5. Betalt vs. Gratis-tilmelding + MobilePay-betaling — AFTALT 2026-08-31, SHIPPET TIL PRODUKTION 2026-09-03 (se opdatering nedenfor)

**Baggrund:** Chris vil indføre et skel mellem betalende og gratis Dream Team-deltagere. Kun
betalende kan komme på podiet og vinde penge; gratis-deltagere ses stadig i stillingen med deres
rigtige placering/point, men er ikke i spil til podiet/gevinster.

**Status-mekanisme — AFTALT:** deltageren vælger selv "betalt" eller "gratis" i selve
tilmeldingsformularen (selverklæring). Chris bekræfter/retter det bagefter manuelt (fx ud fra
hvem der faktisk har sendt en MobilePay-betaling) — en deltager der vælger "betalt" uden at
betale, kan rettes til "gratis" inden podiet gøres op for sæsonen.

**UI — BYGGET I PREVIEW (2026-08-31), OG NU OGSÅ SHIPPET TIL PRODUKTION (niende runde,
2026-09-03, se `docs/historik/driftlog.md`):** en "Betaling"-sektion mellem spillervalget og selve
tilmeld-knappen: to klikbare valgmuligheder ("Jeg betaler kontingent" / "Jeg deltager gratis"),
MobilePay-boksen (`1572BU`) står altid synligt lige under, og "Tilmeld hold"-knappen er
deaktiveret indtil et valg er truffet.

**Datamodel — AFTALT OG SHIPPET:**
- **Tilmeldinger-fanen** har fået én ny kolonne, **F "Betaling"** (fritekst, ikke en valideret
  dropdown-celle — Chris kan altid overskrive manuelt ved korrektion). `tilmeld.js` er udvidet
  til at læse `betaling` fra request-body og skrive den med, range `A{row}:E{row}` →
  `A{row}:F{row}`. Shippet niende runde.
- **Tidsstemplet er allerede løst** — `tilmeld.js` sætter selv `tidsstempel` server-side ved
  hver indsendelse (kolonne A), uafhængigt af klienten.
- **Ingen ny fane, intet mirror til Holdoversigt.** Tilmeldinger er eneste kilde til
  betalingsstatus.
- **`stilling.js`/`stilling.html`** slår Betaling op pr. deltager og bruger det til
  podie-markering (guld/sølv/bronze) samt "Honorable mentions"-sektionen — **shippet tiende
  runde (2026-09-03), se `docs/historik/driftlog.md` for det fulde forløb og jsdom-verifikationen.**
  Beregning-, Spillerpoint- og pointberegningskæden er urørt — kun en visningsændring i Stilling.
- **Fortolkning af celleværdien:** case-insensitivt — "Ja"/"Betalt" (og BLANK) tæller som
  podie-berettiget; alt andet ("Gratis", "Nej", eller enhver anden note) udelukker fra podiet,
  men beholder deltagerens rigtige placering/point i tabellen.
- **Blank celle = podie-berettiget som standard.** Vigtigt for sæsoner der endnu ikke har fået
  kolonnen udfyldt (24/25, dele af 25/26).

**Vigtigt fund (2026-08-31) — 25/26 har allerede en betalt/ikke-betalt-liste, men i en helt
separat, manuel fane, IKKE synkroniseret med den rigtige pipeline:** `GSB DREAM TEAM 25-26
Final.xlsx`'s `Pivot`-fane (kolonne T-AH, tredje tabel) har en `Betalt?`-kolonne med reelle
værdier for 32 deltagere — 24 "Ja", 7 "Gratis", 1 "Nej" (Linus, formentlig en uafklaret/
påmindelses-status Chris brugte undervejs, ikke en tredje selvbetjenings-mulighed vi skal bygge
ind i selve tilmeldingsformularen). **Problemet:** denne liste bruger Chris' egne uformelle
kaldenavne (fx "Max", "Leila", "Christoffer", "jakob"), IKKE de officielle navne der bruges i
Tilmeldinger/Resultater/Spillerpoint — der er ingen automatisk sammenhæng mellem de to. Fordi
standardreglen ("blank = podie-berettiget") ikke stemmer overens med disse 7 kendte
Gratis-deltagere, viser 25/26-sæsonens podie dem indtil videre som berettigede.

> ⏰ **PÅMINDELSE TIL CHRIS (stadig ikke gjort pr. 2026-09-03, jf. `docs/historik/driftlog.md`s tiende
> runde):** dobbelttjek tidligere sæsoners betalingsstatus (24/25 og 25/26) mod din egen
> MobilePay-transaktionshistorik på boks `1572BU`, og ret/udfyld "Betaling"-kolonnen i de
> respektive sæsoners Tilmeldinger-fane derefter. Dette er en opgave for DIG i sheetet, ikke
> noget Claude skal bygge eller udlede automatisk.

**"Honorable mentions" — AFTALT 2026-08-31, SHIPPET tiende runde:** ALLE gratis-deltagere hvis
faktiske pointtotal (samme beregning, uændret, som resten af Stilling) ville placere dem i
sæsonens **samlede top 5** vises i en "🌟 Honorable mentions"-sektion på Stilling-siden, med
deres ville-have-været-placering vist eksplicit. Vises kun når der reelt er en kvalificeret
gratis-deltager for sæsonen (afgjort spørgsmål, se `docs/historik/driftlog.md`s tiende runde).

**Stadig ikke besluttet (mindre visningsdetaljer, allerede afgjort ved bygning — se
`docs/historik/driftlog.md`s tiende runde for de faktiske valg):**
- Skal 25/26's Pivot-fane-data (Chris' eget ansvar, se påmindelsen ovenfor) også bruges til at
  regne "Honorable mentions" korrekt for 25/26 med det samme, eller er det kun fremadrettet fra
  26/27? Stadig uafklaret — afhænger af hvornår Chris udfylder kolonnen.
- Præcis hvad tæller som "for sent" for tilmeldings-tidsstemplet — stadig kun visuelt/til Chris'
  eget skøn, ingen automatisk deadline-regel.

Status: **B5 er nu FULDT SHIPPET til de rigtige `apps/netlify-prod/`-filer (niende og tiende
runde, 2026-09-03) — ikke længere kun "klar til byg det".** Eneste tilbageværende, ikke-
blokerende opgave er Chris' egen gennemgang af tidligere sæsoners betalingsstatus (se
påmindelsen ovenfor). Afventer stadig Chris' sædvanlige manuelle mappe-overførsel til Netlify
for at være live for rigtige besøgende (samme som resten af niende/tiende/ellevte rundes
ændringer).

---

# DEL C — Baggrundsviden om autentificering (ikke en feature, men vigtig kontekst)

## C1. Om Google Calendar-nøglen — hvorfor den ikke kan leve i previewet eller deles med Claude

**OPDATERET 2026-08-31: dette afsnit er delvist forældet siden B1 skiftede til Apps Script**
(se B1's disclaimer) — Apps Script-tilgangen kræver slet ingen separat nøgle, så det meste af
nedenstående problem er reelt løst/omgået, og nu også proof-of-concept-bekræftet (0.3).
Afsnittet bevares fordi resonnementet stadig gælder generelt (fx hvis der på et tidspunkt
alligevel bliver brug for en service-konto til noget andet), og fordi det forklarer HVORFOR
Apps Script-løsningen blev valgt.

Chris spurgte om han bare kunne dele service-konto-nøglen med Claude nu og lade den køre i
selve previewet, siden en Calendar-nøgle (i modsætning til fx en betalingsnøgle) ikke kan
bruges til at trække penge. Vigtigt svar, fastholdt her så det ikke glemmes:

- **Strukturel grund, uafhængig af tillid:** Claude-previewet er en client-side, offentligt
  synlig HTML/JS-side (en Artifact). Enhver hemmelig nøgle indlejret der kan læses af hvem
  som helst der åbner browserens udviklerværktøjer — det gælder uanset hvor meget Chris
  stoler på Claude. En skrive-nøgle til en Google Calendar SKAL derfor ligge server-side (en
  Netlify-funktions miljøvariabel), aldrig i klientkoden.
- **Regel for Claude specifikt:** at indtaste/håndtere API-nøgler, adgangskoder eller tokens
  er en handling Claude aldrig udfører, heller ikke ved eksplicit tilladelse fra brugeren —
  det gælder generelt, ikke kun for denne nøgle. Nøglen skal oprettes af Chris selv og lægges
  direkte ind som miljøvariabel i Netlify, når den rigtige funktion skal deployes — den skal
  aldrig sendes til eller indtastes af Claude undervejs.
- **Hvad nøglen faktisk er, til reference:** en Google Cloud "service-konto" er en slags
  robot-identitet inden i Chris' Google Cloud-projekt, adskilt fra hans personlige Google-login.
  JSON-nøglefilen indeholder en privat nøgle der lader et program logge ind SOM den
  robot-identitet. Robotten har som udgangspunkt adgang til INGENTING — den skal eksplicit
  have en kalender "delt" med sig (ligesom man deler en kalender med en kollega), og får kun
  adgang til præcis dén kalender, ikke Gmail, Drev eller andre Google-tjenester. Den kan ikke
  logge ind som Chris' rigtige konto og har ingen adgang til betalingsoplysninger.

## C2. "Hvad hvis jeg laver en lokal .env/.txt-fil som previewet trækker fra?" — AFKLARET 2026-08-31

Chris spurgte om en lokal .env- eller tekstfil på hans egen computer kunne løse
nøgle-problemet, så previewet kunne trække live data. Svaret er todelt, fordi det dækker to
forskellige "live"-ønsker fra denne samtale:

- **For selve web-visningen (kommende kampe, Ungdomssparring-tilmeldinger) — INGEN nøgle
  nødvendig overhovedet, .env eller ej.** Både `calendarEvents`/`teamFights` og
  Ungdomssparrings `SCRIPT_URL` er allerede login-frie, offentlige endpoints. Previewet kan
  roligt kalde dem LIVE direkte fra browseren, helt uden hemmeligheder — det er allerede den
  aftalte plan i B1 og B2 ovenfor, ingen .env-fil krævet.
- **For Google Calendar-SKRIVE-nøglen — en lokal fil på Chris' computer virker desværre ikke,
  uanset filtype** (bemærk: dette punkt er nu mindre relevant efter B1's skift til Apps
  Script, som slet ikke bruger en nøgle af denne type — bevares som generel forklaring).
  Grunden er strukturel, ikke en regel om filformat: Claude-previewet er en side hostet på
  claude.ai's servere, som køres i BESØGENDES browsere — den har ingen adgang til at læse
  filer på Chris' egen computers harddisk, uanset om filen hedder `.env` eller `.txt`. Der er
  intet automatisk "rør" mellem en fil på hans skrivebord og en hostet webside. Selv hvis der
  var, ville det ikke løse hemmeligholdelses-problemet — enhver værdi der bliver en del af den
  offentlige sides kode, kan læses af enhver besøgende.
- **Hvor `.env`-mønsteret RENT FAKTISK hører hjemme:** for evt. fremtidige Netlify-baserede
  hemmeligheder (fx den ugentlige resultat-sync i `docs/idebank-statistik.md`s
  `AlleResultater`-forslag) — ikke en lokal fil Chris sender til Claude, men en miljøvariabel
  Chris selv indtaster direkte i Netlifys eget dashboard ("Environment variables") ved deploy.

Status: afklaring — ingen handling krævet.

---

# DEL 0 — Bekræftede tekniske fakta (testene er allerede kørt)

Placeret bagest efter Chris' ønske — DEL A/B/C henviser hertil, men denne del behøver ikke
læses igen for at følge med i hvad der stadig mangler.

## 0.1. Navnekonvention for 40+/50+ veteranhold i Nembadmintons data — TESTET 2026-08-31

**Testet live** mod `app.nembadminton.dk`s GraphQL-API med `badmintonPlayerTeams(clubId: 1093,
season: 2026)`, krydstjekket mod Chris' screenshots af 40+ og 50+ kampprogrammet.

**Fund: veteranhold har INGEN "40+"/"50+" i selve holdnavnet.** GSB's 40+ 1.hold hedder i
API'et præcis "Gladsaxe Søborg" — samme navn som GSB's SENIOR 1.hold, GSB's 50+ 1.hold, 60+
1.hold og 70+ 1.hold. Aldersgruppen ligger IKKE i `name`-feltet, men i `ageGroupId`:

| ageGroupId | Aldersgruppe |
|---|---|
| 1 | SEN (almindelig senior — GSB 1-7) |
| 4 | U13 |
| 5 | U15 |
| 9 | SEN+40 |
| 11 | SEN+50 |
| 13 | SEN+60 |
| 17 | SEN+70 |
| 18 | U17/U19 |

**Konsekvens:** filtrering af Google Calendar-scopet kan IKKE ske på holdnavnet
"Gladsaxe Søborg [1-7]" alene, fordi navnet genbruges på tværs af alle aldersgrupper.
Filtreringen sker i stedet på `ageGroupId` + `leagueGroupId`.

**Bekræftet mod Chris' konkrete kampnumre — 100% match:**
- **GSB 40+ 1.holdet** = `ageGroupId: 9`, `leagueGroupId: 18910`. Alle 7 kampnumre fra Chris'
  40+-screenshot (509062, 509077, 508986, 509083, 509086, 508998, 509073) fundet præcis her.
- **GSB 50+ 1.holdet** = `ageGroupId: 11`, `leagueGroupId: 18916`. Alle 7 kampnumre fra Chris'
  50+-screenshot (509134, 509138, 509141, 509145, 509151, 509154, 509160) matchede tilsvarende.

Bruges i: B1 (filterliste til Google Calendar-sync), B3 (Afdelings-tag pr. kamp).

**NB til B3:** tabellen dækker endnu ikke alle ungdomsrækker (fx U9/U11 er ikke testet) —
skal udvides ved bygning af B3, se B3's åbne punkter.

## 0.2. Dækker `calendarEvents` ungdoms- og veteranhold, eller kun senior? — TESTET 2026-08-31

**Testet live:** alle 53 kampe fra `calendarEvents(clubIds: [1093])` sammenlignet mod både de
14 bekræftede 40+/50+-kampnumre fra 0.1 OG 25 testede ungdomskampnumre (U13, U15, U17/19)
fundet via `teamFights`.

**Fund: 0 overlap i begge tests.** `calendarEvents` indeholder KUN kampe for `ageGroupId: 1`
(almindelig senior, GSB 1-7) — ingen ungdoms- eller veterankampe optræder overhovedet.

**Konsekvens:**
- Web-visningen ("alle klubbens hold") skal bruge `badmintonPlayerTeams` →
  `badmintonPlayerTeamFights`-mønster for alle hold uden for ageGroupId 1 — ét let kald pr.
  hold/pulje (~31 kombinationer i nuværende sæson), ikke ét kald pr. kamp.
- Google Calendar-syncen: GSB 1-7 hentes billigt via `calendarEvents`, men 40+/50+ 1.holdene
  skal hentes via `teamFights` (2 ekstra lette kald). 3 lette kald i alt — stadig ubetænkeligt
  at køre hyppigt.
- **Sidefund:** `teamFights` har både `roundDate` (oprindelig plan) og `gameTime` (faktisk,
  aktuelt planlagt tidspunkt) — allerede set afvige fra hinanden i testdata (matchId 509077).
  `gameTime` er feltet der skal overvåges for at opdage flytninger.

Bruges i: B1 (datakilde-design for både web-visning og Google Calendar-sync), B3 (samme
klub-ID-kæde er datakilden til `AlleResultater`-syncen).

## 0.3. Proof-of-concept: skrivning til Google Calendar via Apps Script — GENNEMFØRT OG BEKRÆFTET (2026-08-31)

**Alle tre trin kørt af Chris selv, i et separat testprojekt (`GSB Kalender-sync-test`) og en
dedikeret, tom testkalender oprettet specifikt til formålet, for ikke at risikere hans
eksisterende håndlavede kalender:**

1. **Skrive-test:** `CalendarApp.getCalendarById(testKalenderId).createEvent(...)` oprettede
   et testevent uden problemer. Eneste overraskelse undervejs: Google-godkendelsesvinduet blev
   først synligt efter at Chris manuelt tillod popups for script.google.com (var blokeret som
   standard) — værd at huske hvis dette skal gentages, fx i produktion.
2. **Hente-test:** `UrlFetchApp.fetch(...)` mod `calendarEvents` returnerede alle 53 kampe
   korrekt fra Apps Script-miljøet, samme resultat som testet direkte i browseren tidligere
   (se 0.2) — ingen CORS- eller netværksproblemer server-side.
3. **Kombineret test:** ét rigtigt, kommende GSB-kamp-event ("Køge VS Gladsaxe Søborg",
   matchId 507719) blev oprettet i testkalenderen direkte ud fra et live API-svar, med
   `matchId` gemt som tag via `event.setTag(...)` og bekræftet læst tilbage korrekt via
   `event.getTag(...)`.

**Konklusion:** hele grundmekanikken bag B1's Google Calendar-sync er nu bevist at virke —
Apps Script kan skrive til Chris' kalender uden nogen separat nøgle, kan nå Nembadmintons API,
og tag-baseret matchId-genkendelse virker som tiltænkt. Det eneste der IKKE er bygget/testet
endnu er selve "søg efter eksisterende event med dette tag og opdatér i stedet for at oprette
nyt"-logikken (ligetil at bygge, men ikke del af denne minimale proof-of-concept). Aflysnings-
håndtering er afklaret ved bevidst scope-beslutning, se A1 og B1.

Bruges i: B1 (bekræfter at det tekniske design er gennemførligt).

## 0.4. Generel driftsregel: ugentlige sync-mekanismer kører mandag morgen — AFTALT 2026-08-31

Nembadmintons egne ranglister og andre afledte tal opdateres kl. 00:00 natten til mandag.
Chris' generelle regel: ALT der skal opdateres ugentligt i GSB-projektet, skal derfor sync'e
mandag morgen (efter kl. 00:00), ikke på en vilkårlig anden ugedag — så data er friskest muligt
lige efter at ugens kampe/ranglister er landet. Gælder B3's `AlleResultater`-sync direkte, og
enhver fremtidig ugentlig sync-feature bør følge samme regel medmindre andet aftales specifikt.

Bruges i: B3 (sync-tidspunkt for `AlleResultater`).

## 0.5. ELO-seeding: roster-opbygning uden login + BD-kategoripoints friskhed — TESTET 2026-08-31 (afløser A2)

**Baggrund:** Chris spurgte om Nembadminton har en liste over alle klubbens registrerede
spillere (inkl. ungdom), som kunne bruges til at organisere ELO-seedingen systematisk i stedet
for at skulle kende spiller-ID'er på forhånd. Testet live mod `app.nembadminton.dk`'s API,
kørt i den indbyggede browser (login-fri hele vejen).

**Fund 1 — en direkte medlemsliste-query findes, men kræver login:**
`membersSearch(clubhouse, name, gender, inactive, hasPoints, first, page, ...)` returnerer en
paginerbar liste af `Member`-objekter (id, navn, køn, `vintage` (aldersgruppe), fødselsdato,
`points` (rå kategoriseret liste), status). Præcis den slags roster Chris efterspurgte — men
den er `@guard`-beskyttet ("Unauthenticated" ved test) og derfor IKKE brugbar til
no-login-automatisering, samme mønster som `teams`/`squadMember`/`clubhouse` (tidligere fundet
login-krævende).

**Fund 2 — no-login-alternativ til roster-opbygning: union af `highestPointGain` på tværs af
kategori og aldersgruppe.** `highestPointGain(clubhouseId, category, vintages, limit, orderBy)`
kræver IKKE login og kan bruges til at "opdage" alle registrerede spillere uden at kende deres
ID'er i forvejen: kør ét kald pr. kategori (`HS`, `DS`, `HD`, `DD`, `MxH`, `MxD` — `LEVEL` fejler
stadig med "Internal server error", samme kendte bug som tidligere dokumenteret, brug den ikke
her) med alle 7 `vintages` (`SEN`, `U9`-`U19`) og en høj nok `limit` (300-400 er rigeligt for
GSB — ingen af de 6 kald ramte loftet), og forén (union) medlems-ID'erne fra de 6 svar.

**Testet live for GSB (clubhouseId 331):** de 6 kald gav hhv. 209 (HS), 69 (DS), 264 (HD), 109
(DD), 193 (MxH), 101 (MxD) rækker — foreningsmængden af unikke medlems-ID'er er **377 registrerede
spillere i alt, på tværs af alle aldersgrupper, inkl. ungdom** (bekræftet med konkrete
U15-spillere i resultatet, fx "Ludvig Alexander Rosager Pedas" og "Anna Rudolph").

**Fund 3 — `memberStats(id)` har allerede færdig-aggregerede `single`/`double`/`mix`-felter,
adskilt fra det tidligere kendte rå `member.points`-felt:** ud over det allerede dokumenterede
`member.points` (typen `Point`, med et `category`-felt: `HS`/`DS`/`HD`/`DD`/`MxH`/`MxD`/`LEVEL`,
kønsopdelt), returnerer `memberStats(id)` OGSÅ tre selvstændige lister — `single`, `double`,
`mix` (typen `DataPoint`, kun `{points, version}`, INTET kategori-/kønsfelt). Dette er
Nembadmintons EGEN allerede sammenlagte, kønsneutrale version pr. disciplin — ikke noget vi selv
skal bygge en sammenlægnings-logik til.

**Fund 4 — friskhed BEKRÆFTET god, løser den tidligere staleness-bekymring:** testet på tre
spillere (én voksen mand, én ung mand U15/U17, én ung kvinde U15) — alle tre har
`single`/`double`/`mix`-værdier med `version: "2026-08-02"`, altså under en måned gammelt data
regnet fra i dag (31/8-2026). Den tidligere fundne staleness (Tilmeldingsniveau-snapshots der
stopper omkring 2024-07-01) gjaldt tilsyneladende kun det ældre, rå `category: null`/`LEVEL`-felt
— IKKE disse `single`/`double`/`mix`-felter, som ser ud til at blive opdateret løbende.

**Fund 5 — kønsskævheds-bekymringen er sandsynligvis IKKE et problem for disse felter:** da
`single`/`double`/`mix` allerede ER Nembadmintons egen sammenlægning af de kønsopdelte kategorier
(HS+DS → single, HD+DD → double, MxH+MxD → mix), testede vi direkte om en kvindelig og en mandlig
spiller på lignende niveau lander på samme skala: Anna Rudolph (kvinde, U15, single: 1739) og
Ludvig Alexander Rosager Pedas (mand, U15/U17, single: 1741) — praktisk talt identiske tal. Dette
er ikke en fuld statistisk bekræftelse af nul skævhed generelt, men det konkrete problem Chris
rejste (skal VI selv slå Double+Mixed sammen og risikere at skævvride kønnet rating) er løst,
fordi Nembadminton allerede har lavet denne sammenlægning centralt og konsistent for alle
spillere — B4 skal bare bruge `single`/`double`/`mix` direkte, ingen egen sammenlægnings-logik
nødvendig.

**Konsekvens for B4:** seeding-kilden er nu fastlagt og bekræftet brugbar: for hver spiller i
klubben, hent `memberStats(id).single/.double` (seed henholdsvis single- og double-ELO fra
seneste `points`-værdi i hver liste), og byg selve spillerlisten til `ELO_Spillere` ved at
forene resultatet af de 6 `highestPointGain`-kald beskrevet i Fund 2 (én engangs-opgave ved
opsætning, ikke noget der skal køre live i selve trænings-flowet).

Bruges i: B4 (seeding-kilde og roster-opbygning for `ELO_Spillere`).
