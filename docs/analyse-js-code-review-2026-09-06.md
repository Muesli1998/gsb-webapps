# Code review — `analyse.js`, 2026-09-06

Kørt af en Opus-subagent efter Chris' eksplicitte go-ahead, som opfølgning på det strategiske
review samme dag (se `claude/gsb-roadmap.md`). Fokuseret scope: dedup, aggregering, walkover-
robusthed, grundspil/slutspil-filtrering — ikke en fuld gennemgang af hele filen. Intet er rettet,
intet skrevet til projektet.

**VIGTIGT FORBEHOLD:** Den gennemgåede kopi af `analyse.js` i projektet er fra 2026-08-30 og
mangler `ikkeSlutspilHold`-mekanismen samt `matrix`/`byHoldCategory`-felterne, som ifølge
driftloggens "Niende runde" (2026-09-03) blev tilføjet direkte i den rigtige
`netlify-tool-prod\netlify\functions\analyse.js`. Scope-punktet om `ikkeSlutspilHold`-robusthed
kunne derfor IKKE reviewes. Alle øvrige fund gælder logik der efter alt at dømme er uændret i
prod (dedup, spiller-/hold-/kategori-optælling, `Vinder`-fortolkning) — men **bør verificeres mod
den rigtige prod-fil før noget rettes.** Der har været præcis denne forveksling mellem arbejdskopi
og produktionsmappe før (jf. "RETTELSE 2026-09-03" i driftloggen).

---

## F1 — `Vinder`-kolonnen kollapses binært: alt der ikke er præcis "Hjemme" bliver til en udesejr

**Linje 73:** `const hjemmeWon = vinder === 'Hjemme';`

Der findes ingen tredje tilstand. Enhver anden værdi — `'?'`, tom, `'Uafgjort'`, `'Hjemme '` med
mellemrum, `'hjemme'` med lille h, eller en manglende kolonne — giver `hjemmeWon = false`, hvilket
fortolkes som "udesiden vandt", ikke som "ukendt".

Konsekvens ved en walkover i dag: `hent-resultater.js` (linje 148-154) producerer `Vinder: '?'`
ved `"Ikke fremmødt"`. Med `'?'` i kolonnen: spillede GSB hjemme og modstanderen udeblev (GSB
burde vinde) → registreres som **tabt**. Spillede GSB ude og vandt på walkover → registreres
tilfældigvis korrekt, ren held. Ingen fejl, ingen `null`, intet flag — stille forkerte tal, med
ca. 50% sandsynlighed for at være vendt på hovedet pr. walkover.

Rammer også de 2 kendte 24/25-kampe (HD, GSB 2, runde 4 og 8) hvor alle sæt er tomme uden
`"Ikke fremmødt"`-markør — bevidst ekskluderet fra rekonstruktionen som "kan ikke afgøres", men
denne kode ville tælle dem som udesejre.

De eksisterende, manuelt rettede 25/26-walkoverrækker håndteres korrekt. Problemet er rent
fremadrettet — hver ny rundeimport i 26/27.

**Alvor: høj. Sandsynlighed: høj** (så snart en walkover importeres uden manuel rettelse). Hænger
sammen med roadmap-punkt 2 — Walkover-håndtering (walkover-fix i `hent-resultater.js`) — bør rettes samtidig, ellers
retter man kun halvdelen af kæden.

---

## F2 — `seenMatches.add()` sker FØR der tjekkes om nogen af siderne er "vores"

**Linje 95-97 vs. 100 og 107.** Nøglen forbruges ubetinget ved første forekomst af et board. Er
den første række for et board et ukendt navn på begge sider, forbruges nøglen uden at der tælles
noget, og partner-rækken afvises som duplikat. Boardet forsvinder sporløst fra hold-/kategorital
(`teamStats[hold]` oprettes stadig, så holdet dukker op med en manglende kamp).

Rammer garanteret ved en walkover hvor det er vores side der er "Ikke fremmødt" (den streng står
aldrig i `Spillerpoint`), en reserve/ungdomsspiller uden opslag i `Spillerpoint`, eller en
navnevariant fra `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` (12 alias alene for 25/26).

Fix: flyt `seenMatches.add()` ind i den betingede blok.

**Alvor: mellem-høj. Sandsynlighed: mellem i dag, høj når 24/25 importeres.**

---

## F3 — To boards med ulige rækkeantal i samme gruppe æder hinanden

`boardPosition` udledes af en løbende rækketæller pr. `runde|hold|kategori`, ikke af noget på
rækken selv. Simuleret for double (`rowsPerBoard = 2`): ét ulige board (fx 1+2+2) er harmløst. To
ulige boards i samme gruppe (fx 1+1+2, 2+1+1) koster et helt board i hold-/kategorital; tre
rækker i ét board (3+2+2) tælles som 4 af 3 boards, delvist med forkert resultat.

Realistisk scenarie: et modstanderhold der afgiver flere boards i samme kategori — ikke eksotisk.
Kontrollerbart nu: tjek om eksisterende 25/26-walkoverrækker i en double-kategori står som én
eller to rækker.

**Alvor: mellem-høj. Sandsynlighed: lav i dag, mellem så snart walkovers importeres automatisk.**

---

## F4 — Board-positionen afhænger af arkets rækkefølge, intet valideres

Sortering af `Resultater`-fanen, en fejlplaceret manuel rettelse, eller en delvist dobbeltimporteret
runde scrambler board-positioner stille. Ingen assertion om at gruppens rækkeantal er deleligt med
`rowsPerBoard`, intet krydstjek af at parrede rækker faktisk hører sammen (samme `Vinder`, samme
modstanderpar). Billige sanity-checks ville have fanget F3 og lignende ved kørsel i stedet for
reaktivt.

**Alvor: mellem. Sandsynlighed: lav-mellem** (kræver manuel handling i arket, men arket er
manuelt vedligeholdt).

---

## F5 — Ingen dedup på kampniveau: en dobbeltimporteret runde dobbelttæller alt

`seenMatches` deduper kun inden for én gruppe via positionstælleren — ingen `matchId`-baseret
dedup nogen steder. Spiller-niveau har slet ingen dedup (var kun "beskyttet" tidligere fordi den
gamle sæt-score-bug duplikerede mellem to *forskellige* partnernavne). Ved en ægte duplikeret
række dobbelttælles direkte. Simulation af "hele runden importeret to gange": 6 talte boards af 3
fysiske.

Ikke teoretisk: `NEMBADMINTON_API_NOTES.md` dokumenterer at ét fysisk hold (GSB 2, 25/26) optræder
under to forskellige `leagueGroupId`'er (grundspil + oprykningsspil) — en automatiseret B3-sync
der går alle grupper igennem vil hente overlappende kampe.

**Alvor: høj hvis det sker. Sandsynlighed: lav i dag (manuel import), høj for B3's automatiske
sync.** Værd at tjekke om `hent-resultater.js` deduper på skrivetidspunktet.

---

## F6 — Point-kolonnerne (`ptH`/`ptU`) læses, men bruges aldrig

De destrukureres men indgår ikke i beregningen. Både `GSB_DREAM_TEAM_PROJECT_BRIEF.md` og kodens
egen kommentar fastslår at `Point (Hjemme)`/`Point (Ude)` altid er korrekt udfyldt — det er dem
Dream Teams scoring bygger på, og derfor har Dream Team aldrig haft de bugs Statistik-siden har
haft. Statistik udleder i stedet sejr/nederlag af fritekstkolonnen `Vinder`, hvilket er den
direkte årsag til F1.

**Fælde hvis det rettes:** arket er dansk-lokaliseret med komma som decimal (`1,5`).
`Number('1,5')` er `NaN` — en naiv brug af `ptH`/`ptU` ville stille nulstille alle 1,5-points
(GSB 3/4's sejre). Kræver komma-tolerant parsing eller `valueRenderOption: 'UNFORMATTED_VALUE'`.

**Alvor: mellem (som årsag til F1). Sandsynlighed: n/a — designbeslutning, ikke en udløst fejl.**

---

## F7 — `knownPlayers` er en hård gate, cap på 199 navne, ingen alias-normalisering

`Spillerpoint!A2:A200`. Klassifikationen "er denne side vores?" hænger på eksakt strengmatch.
Cap på 199 spillere er fint for én seniortrup, ikke for B3 (skal dække hele klubben inkl. ungdom/
veteran) — navn nr. 200+ ryger ud uden fejl, og deres kampe bliver usynlige (jf. F2). Ingen
case-folding, intet alias-opslag mod `GSB_NAVNE_ALIAS_OG_ANOMALIER.json`, ingen håndtering af
ø/ö-varianter (filen dokumenterer selv "Bergström" vs. "Bergstrøm", "Holmlykke" vs. "Holmslykke").

**Alvor: lav i dag, høj for B3. Sandsynlighed: høj når 24/25 eller klub-bred data kommer ind.**

---

## F8 — Runde-filtrering fejler stille ved ikke-numeriske runder/dårlige parametre

`Number(r[0])` på en ikke-numerisk runde (`"Kval"`, `"Finale"`, `"8A"`) → `NaN` → rækken
filtreres stille væk. `rundeMax` defaulter til hardkodet `'11'` — 24/25 havde 12 runder for
GSB 1, så runde 12 forsvinder uden `rundeMax` i kaldet. `parseInt('abc', 10)` → `NaN` → alle
rækker filtreres væk, endpointet svarer 200 OK med tomme lister i stedet for en fejl.

**Alvor: lav-mellem. Sandsynlighed: mellem** (playoff-runder er den realistiske trigger).

---

## F9 — `SINGLES_KATS` kender kun `HS`/`DS`, API'ets enum har flere kategorier

`NEMBADMINTON_API_NOTES.md` dokumenterer enum'en `LEVEL, DD, DS, MxD, HD, HS, MxH`. Kommer en
kategori ind som `MxH` (eller lowercase), klassificeres den som double → halvdelen af boardsene
forsvinder. Arket bruger i dag `MD`, som tilfældigvis er korrekt håndteret, men mappingen mellem
API-enum og ark-kategori er implicit og udokumenteret. Direkte relevant for B3 (henter fra API'et).

**Alvor: høj hvis udløst, lav i dag. Sandsynlighed: lav nu, mellem-høj for B3.**

---

## F10 — Begge sider "individuelle" håndteres vilkårligt (B3-forward)

Er begge sider genkendte GSB-spillere, vælges hjemmesiden vilkårligt som "os" på holdniveau
(spillerniveau er upåvirket). Sker ikke i dag (Dream Team er kun GSB mod eksterne), men sker
garanteret i B3 (GSB-hold mod hinanden i ungdomsrækker). `matchKey` har heller ingen
sæson-komponent — harmløst nu, men bryder hvis B3 aggregerer flere sæsoner serverside.

**Alvor: lav i dag, mellem for B3.**

---

## F11 — (NY, 2026-09-06) Board droppes fra hold-/kategoritotaler hvis kun FØRSTE fysiske række i et double-board mangler genkendelse, selvom partner-rækken har en kendt spiller

**Fundet ved en direkte facit-verifikation af den RIGTIGE, live `analyse.js` (2026-09-03-versionen,
med `ikkeSlutspilHold`) mod Chris' egne holdkamp-facit-tal for 25/26 (kørt af en Sonnet-agent,
efterset/presset af en Opus-agent — se metodenote nederst).** Dette er en distinkt bug fra F2 —
F2 beskriver at `seenMatches.add()` sker ubetinget FØR genkendelses-tjekket; denne bug er den
konkrete konsekvens for double-kategorier specifikt: fordi `seenMatches` kun konsulteres/sættes
på boardets FØRSTE fysiske række (boardPosition er den samme for begge rækker i et par), er det
udelukkende FØRSTE rækkes `hjemmeIsIndividual || udeIsIndividual` der afgør om hele boardets
sejr/tab overhovedet tælles i `teamStats`/`categoryStats`/`matrixStats` — anden rækkes egen
genkendelse (og evt. kendte spillernavn) bliver aldrig konsulteret for dette formål, selvom den
opdaterer spillerens EGNE personlige stats korrekt og uafhængigt.

**Kvantificeret på rigtig 25/26-data:** af 14 oprindeligt observerede "droppede boards" for
GSB 3/GSB 4 (runde 8-11) var **8 reelt kun maskeret af denne specifikke bug** — boardets anden
række indeholdt faktisk en kendt Spillerpoint-spiller (fx "Lene Sørensen", "Tina Skov Mikkelsen",
"Christoffer Ring", "Yiting Chen", "Jakob Lebeck Frederiksen", "Adnan Bacic") som aldrig blev
konsulteret, fordi boardets første række ("Molly Hong-Minh"/"Jesper Hyldal" el. lign.) allerede
havde forbrugt `seenMatches`-nøglen uden at tælle noget. De resterende 6 af de 14 er separate,
ægte problemer (se nedenfor).

**Effekt i dag, verificeret mod facit:** GSB 4 viser 104 boards i Statistik-aggregeringen mod et
facit på 117 (9 holdkampe × 13 boards — Dream Team tæller alle 9, inkl. holdkampen mod det senere
udmeldte modstanderhold, i modsætning til BD's officielle 8). GSB 3 viser 90 mod facit 91. Denne
specifikke maskerings-bug (F11) står for 8 af GSB 4's manglende 13 og hele GSB 3's manglende 1 —
resten (6 for GSB 4) er to andre, adskilte årsager:
- **3 er en walkover-håndtering** (samme underliggende problemstilling som F1/F6, se nedenfor).
- **3 er reelt ukendte enkeltspillernavne** (kun HS-kategori, som ikke har en partner-række at
  blive maskeret bag) — bl.a. en ny spiller (Oskar Isbosethsen/"Oskar Osbo") der kom til klubben
  midt i sæsonen, efter Spillerpoint-listen/Dream Team-holdene blev låst ved sæsonstart.

**Fix:** i stedet for kun at tjekke genkendelse på boardets FØRSTE fysiske række, bør
genkendelses-tjekket ske på TVÆRS af begge rækker i boardets gruppe (fx: saml begge rækker for et
`boardPosition` først, tjek derefter om NOGEN af de op til 4 involverede navne (2 pr. side × 2
rækker) matcher `knownPlayers`, før boardet afgøres droppet). Hænger sammen med F2/F3/F4 —
samme underliggende skrøbelighed i board-position/gruppe-logikken.

**Prioritet: LAV, bevidst nedprioriteret (Chris' beslutning 2026-09-06).** Rammer udelukkende
Statistik-sidens (`analyse.html`) hold-/kategori-/matrix-tal — Dream Teams egen pointberegning er
100% uberørt, da den kører via Spillerpoint-arkets SUMIFS direkte mod spillernavne i Resultater,
uafhængigt af `analyse.js`s `knownPlayers`/dedup-logik (bekræftet tidligere, se
`gsb-statistik-idebank.md`). I den faktiske facit-verifikation var GSB 1 og GSB 2 (topholdene)
100% rene — 143/143 uden en eneste droppet bane. Chris' beslutning: kun værd at rette hvis samme
mønster nogensinde ses for GSB 1/2, ikke aktivt for GSB 3/4 lige nu.

---

## F12 — (NY, 2026-09-06) Walkover ("(Ikke fremmødt)") dropper hele boardet, selvom arkets `Vinder`/Point-kolonner allerede har det korrekte resultat

Samme facit-verifikation fandt 3 boards (runde 5, GSB 4: 2×DS, 1×DD) hvor modstanderfeltet er
den bogstavelige tekst `"(Ikke fremmødt)"`. I modsætning til F1 (som handler om at
`hent-resultater.js` kan skrive en ukorrekt `'?'`-værdi ved en walkover) er dette et RENT
`analyse.js`-problem: `Vinder`-kolonnen for disse tre rækker er allerede korrekt udfyldt
("Hjemme"), og `Point (Hjemme)`/`Point (Ude)`-kolonnerne bekræfter det (1,5/0) — der er ingen
tvetydighed i selve dataen om hvem der vandt. Boardet droppes udelukkende fordi
`"(Ikke fremmødt)"` aldrig kan matche `knownPlayers`, og (i to af de tre tilfælde) fordi
hjemmesidens spiller ("Kristine Eskesen Møller", "Pia Larsen" — begge optræder KUN i denne ene
runde, ingen andre steder i sæsonens data, og ingen af dem er i Spillerpoint-listen) heller ikke
genkendes.

**Fix, hvis det besluttes relevant:** når modstanderfeltet er en kendt walkover-markørtekst,
kunne boardet tælles direkte fra `Vinder`/Point-kolonnen uden at kræve navnegenkendelse på begge
sider — men kræver stadig at hjemmesidens spiller er i `knownPlayers` for at kunne kreditere den
rigtige spiller (rammer kun hold-/kategori-total, ikke spiller-niveau, hvis spilleren i sig selv
mangler fra listen).

**Prioritet: LAV, samme begrundelse som F11** — ramte kun GSB 4, topholdene upåvirket, ingen
effekt på Dream Team-point.

---

## Mindre observationer

- `teamStats[hold]` oprettes ubetinget — et hold hvor alle rækker afvises af F2/F7 dukker op med
  `0/0` og `winPct: null`. Bruges som canary: færre kampe end forventet et sted peger på F2/F3.
- Spillerniveau er immunt over for F3/F4, men fuldt eksponeret for F5.
- Kan ikke verificeres herfra: tjek i `analyse.html` om sæson-sammenligning aggregerer som
  `sum(wins)/sum(wins+losses)` eller som gennemsnit af `winPct` — det sidste er et uvægtet, forkert
  gennemsnit, og denne fil eksponerer bekvemt (men forkert) `winPct` direkte.
- **Metodenote til F11/F12 (2026-09-06):** verifikationen der fandt disse to punkter kørte den
  RIGTIGE, aktuelle prod-version af `analyse.js` (med `ikkeSlutspilHold`) mod virkelige
  Sheets-eksporter (`resultater_2526.csv`, `spillerpoint_2526.csv`) og Chris' egne holdkamp-facit
  (13 boards/holdkamp; GSB 1: 11, GSB 2: 11, GSB 3: 7, GSB 4: 9 holdkampe i 25/26). Sekundært
  krydstjekket mod en rekonstrueret 24/25-datasæt (lavere tillid, kun brugt som støttende
  evidens, ikke selvstændigt bevisgrundlag) — der bekræftede en tredje, allerede-kendt fejltype
  (F3/F4's rækkeantal-desync) i 3 runder for GSB 2, adskilt fra F11/F12.

## Prioritering

1. **F1** — rettes samtidig med det planlagte `hent-resultater.js`-walkover-fix (roadmap punkt 2 — Walkover-håndtering).
2. **F2** — én linjes flytning, fjerner en hel kategori af stille bortfald.
3. **F5** — tjek først om `hent-resultater.js` deduper på skrivning.
4. **F3/F4** — to billige sanity-checks (rækkeantal deleligt med `rowsPerBoard`; parrede rækker
   har samme `Vinder`) gør board-mekanismen selv-diagnosticerende.
5. **F7/F9/F10** — ikke hastende for Dream Team, men bør være designforudsætninger for B3 fremfor
   arvet gæld.
6. **F11/F12** — LAV prioritet, bevidst nedprioriteret af Chris (2026-09-06): rammer kun
   Statistik-sidens hold-/kategori-tal for GSB 3/4, ingen effekt på Dream Team-point. Genoptages
   kun hvis samme mønster nogensinde observeres for GSB 1/2.
