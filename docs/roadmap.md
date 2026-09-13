# GSB Webapps — roadmap

*Opdateret 2026-09-07 (akut alias-korrektion, punkt 8). Levende dokument: opdateres ved fremtidige reviews og ved nye, akutte fund — ikke ved hver enkelt almindelig byggerunde.*

Filen er et tværgående overblik over næste skridt på tværs af alle initiativer (Kampsystem, Dream Team, Tilmelding/nav, Søndagstræning, Kampkalender, Klubstatistik, øvrigt). Den erstatter ikke idébankerne, spec-filen eller driftloggen — den samler kun hvad der står forrest lige nu, og hvad hvert punkt venter på.

**Roadmappen beslutter intet.** Rækkefølgen nedenfor er et forslag. Standing-reglen fra `START-HER.md` gælder uændret: intet bygges, kodes eller deployes uden Chris' eksplicitte "byg det"-signal for det specifikke punkt.

**Vedligehold af "Anbefalede næste skridt":** Sektionen viser kun fremadrettede,
ikke-afsluttede skridt. Når et punkt er lukket/bekræftet live, fjernes det HELT fra
sektionen i samme session — historikken lever i driftloggen og
`docs/preview-vs-live-status.md`, ikke her.

**Numre er permanente.** Et punkts nummer skifter aldrig betydning og genbruges aldrig.
Når et punkt fjernes, omnummereres resten IKKE — huller i rækkefølgen er normale og
forventede. Nye punkter får næste ubrugte tal over det hidtil højeste; bogstav-suffiks
(fx 4b) bruges kun til et ægte underpunkt af et eksisterende punkt. Grunden er, at andre
projekt-filer refererer til roadmap-punkter ved nummer.

Status-symboler følger `docs/preview-vs-live-status.md`: 🟢 live · 🟡 bygget i preview · ⚪ idé/spec · 🔴 regression (var live, virker bekræftet ikke længere).

---

## Anbefalede næste skridt

Prioriteret. Begrundelse er værdi vs. indsats, ikke rækkefølgen tingene blev nævnt i.

### 1a. ADMIN_PASSWORD ikke sat + ny anmodning om adgangskode-gate på Admin-siden
**Værdi: høj (sikkerhedshul). Indsats: lav (konfiguration) / lav-mellem (ny gate, ikke bygget). Status: ⚪ delvist under udbedring af Chris selv, delvist kun logget.**
Under diagnosen af punkt 1 opdagede Chris at der ikke findes nogen `ADMIN_PASSWORD`-environment variable på Netlify. `hent-resultater.js`'s adgangskontrol er `const expectedPassword = process.env.ADMIN_PASSWORD; if (expectedPassword && password !== expectedPassword) { return 401 }` — når `expectedPassword` er usat, springes hele tjekket over, og skrive-endpointet der henter kampresultater ind i Google Sheet er reelt ubeskyttet. Chris sætter selv en ny værdi i Netlifys environment-variable-indstillinger — det er en ren konfigurationsopgave, intet Claude-arbejde og ingen kodeændring nødvendig, da `index.html`'s adgangskodefelt blot poster den indtastede værdi til serveren uden noget hardkodet match at forholde sig til.

Chris påpegede samtidig at Admin-siden (`index.html`) i dag slet ikke har nogen klientside-adgangskode/kode-gate, i modsætning til Kampsystemet der har en synlig kode-gate (`kamp2026`) før man overhovedet kan bruge siden. Ønsket er en tilsvarende adgangskode-gate tilføjet til Admin-siden. **Ikke bygget — logget som nyt build-punkt, afventer "byg det".** Se Syttende runde i driftloggen.

**2026-09-07, enogtyvende runde:** Chris har bekræftet at han selv har sat en ny `ADMIN_PASSWORD`-værdi i Netlify og deployet — konfigurationsdelen af dette punkt er dermed lukket (bekræftet af Chris' egen besked, ikke uafhængigt verificeret mod selve Netlify-dashboardet). Selve klientside-adgangskode-gaten til Admin-siden er fortsat udelukkende logget, ikke bygget.
**Afventer:** byg-signal fra Chris for selve Admin-side-gaten.

### 2. Walkover-håndtering i den rigtige `hent-resultater.js`
**Værdi: høj. Indsats: lav. Status: 🟢 kodet og skrevet til `apps/netlify-prod/`, afventer Chris' Netlify-upload for at være live.**
"Ikke fremmødt" håndteres ikke i produktionens `hent-resultater.js`. Logikken er allerede kendt og verificeret fra 24/25-rekonstruktionen (walkover-fixet var det der bragte krydstjekket mod det gamle Pivot-ark op på næsten 100% match). Det er et lille, afgrænset fix på en kendt fejl — men det er ikke rettet i den kilde der bruges fremadrettet, så hver ny rundeimport i 26/27-sæsonen risikerer at lægge forkerte tal ind. Sæsonen er lige begyndt, så prisen for at vente stiger for hver runde. Hænger desuden sammen med F1/F2 i code review-rapporten fra 2026-09-06 (`analyse.js` kollapser `Vinder: '?'` til en udesejr) — bør rettes samtidig, ellers retter man kun halvdelen af kæden. **Bemærk (2026-09-07):** navnealias-fixet i punkt 8 er nu shippet til `hent-resultater.js` og `analyse.js` — walkover-fixet bygger derfor på et allerede normaliseret grundlag, som anbefalet.

**2026-09-07, enogtyvende runde — SHIPPET:** ny hjælpefunktion `erWalkover(navne)` i `hent-resultater.js` (matcher "ikke fremmødt" case-/mellemrums-/parentes-uafhængigt). Vinder-beregningen tjekker nu FØRST om én (og kun én) af siderne er en walkover — i så fald får modstanderen automatisk sejren, uden at det afhænger af sætoptællingen (0-0 ved en walkover). Er ingen af siderne walkover, er logikken uændret (ren sætoptælling). Er BEGGE sider walkover (teoretisk edge case), falder koden tilbage til den gamle `'?'`-adfærd. Verificeret med `node --check` og en isoleret unit-test af alle seks scenarier. Skrevet til `apps/netlify-prod/`, verificeret via enhedsbroen. F1/F2 i `analyse.js` (samme underliggende følsomhed, men i Statistik-siden) er IKKE rettet denne runde — kun `hent-resultater.js`. Allerede-importerede 26/27-runder med en walkover der fik `Vinder: '?'` FØR dette fix er ikke rettet med tilbagevirkende kraft.
**Afventer:** Chris' egen manuelle Netlify-upload for at gøre fixet live.

### 3. Chris' standalone-test af Kampsystemet + afklaring af teknikbane-designet
**Værdi: høj. Indsats: minimal (afklaring, ikke kode).**
En stor mængde Kampsystem-arbejde ligger færdigt i preview og kan ikke rykke videre, før Chris har testet standalone-filen. Ét spørgsmål bør besvares samtidig: teknikbane-loftet er bygget "opportunistisk" (banen forhåndsreserveres ikke, den tildeles kun hvis der er plads til overs efter den almindelige fordeling). Det er eksplicit flagget som en mulig afvigelse fra det Chris bad om. Se også edge case-noten i reviewrapporten fra 2026-09-06.
**Afventer:** Chris' test og et ja/nej på teknikbane-spørgsmålet. Låser punkt 4 og 5 op.

### 4. "Normal rolle" til produktion
**Værdi: mellem-høj. Indsats: lav-mellem. Status: 🟡.**
Fast holdkamps-kategori pr. spiller (Single/Mix) er bygget og gemmes til Google Sheets (nye kolonner G/H i `ELO_Spillere`). Kandidatfunktionerne er klar. Tilbage står tre mekaniske skridt: tilføje kolonnerne i det rigtige Sheet, kopiere kandidatfunktionerne, opdatere `kampsystem.html` i `apps/netlify-prod/public/`.
**Afventer:** byg-signal, samt at Chris tilføjer Sheet-kolonnerne (den del kan kun han).

### 5. Én samlet Kampsystem-deployrunde
**Værdi: høj. Indsats: mellem. Status: 🟡 → ⚪-gap.**
Der er nu ophobet seks-syv færdigbyggede Kampsystem-ting i preview som aldrig er kommet til produktion: lås-dropdown-fix (A5), bane-begrænset rundegenerering, kønsbevidst double-parring, oversidder-UI, manuel kamp-redigering, H2H-redesign, plus punkt 4 ovenfor. Anbefaling: ship dem i **én** planlagt runde efter Chris' test — ikke drypvist. Gappet mellem preview og produktion er allerede den største enkeltrisiko i projektet, og en samlet runde giver ét testvindue i stedet for seks.
**Afventer:** punkt 3 (test), derefter byg-signal for deployrunden som helhed.

### 6. B1 Kampkalender + Google Calendar-sync
**Værdi: høj lige nu. Indsats: mellem. Status: ⚪ (spec færdig).**
Fuldt specificeret i spec-filen, ingen tekniske blokeringer, aflysningshåndtering afklaret 2026-09-03 (aflyste kampe ignoreres, ingen særlig logik). Intet er kodet. Den sæsonmæssige værdi er størst nu, hvor 26/27 lige er startet og kampprogrammet er nyt for alle — en kalender der lander i november er markant mindre værd.
**Afventer:** udelukkende byg-signal.

### 7. B3 Klubstatistik
**Værdi: høj. Indsats: høj. Status: ⚪ (design aftalt).**
Designet er aftalt og landet i spec-filen, og begge rankingmetoder ("værdi" = total fantasy-point, "effektivitet" = Bayesiansk-justeret vindprocent) er valideret på rigtig data. Men metodevalget for "effektivitet" er ikke låst (Bayesiansk vs. Wilson vs. minimumsgrænse vs. fremtidig ELO fra B4), og det valg er ikke kosmetisk — se edge case-noten i reviewrapporten fra 2026-09-06. Bør ligge efter punkt 2 (og efter code review-fundene F1/F2/F5 er adresseret), da B3 læser videre på `analyse.js`-data. **Bemærk (2026-09-07):** punkt 8's navnealias-opslag er nu shippet — F7 (ingen alias-normalisering) er dermed løst, men den hårde cap på 199 kendte spillere (`Spillerpoint!A2:A200`) er stadig urørt og bør stadig adresseres før B3 skal skalere til hele klubben.
**Afventer:** metodevalg fra Chris, derefter byg-signal.

### 8. Navnealias-opslag — AKUT DEL SHIPPET og efterfølgende KORRIGERET/UDVIDET 2026-09-07 (kode-baseret, ikke Sheets-baseret), resten fortsat design/idé
**Værdi: høj (havde allerede kostet spillere point og skabt en synlig UI-fejl). Indsats brugt: lav (embedded alias-liste i kode, opdateret to gange samme dag). Resterende indsats: mellem (evt. Sheets-migrering senere). Status: 🟢 for den akutte del (dropdown-dublet + fremadrettet point-matching), nu verificeret programmatisk mod BD's egen API, ⚪ for Sheets-Stamdata-designet.**

**Baggrund:** ingen af de kørende `.js`-filer (`spillere.js`, `hent-resultater.js`, `analyse.js`) konsulterede noget alias-opslag før denne runde — navne blev matchet som rå strenge på tværs af Tilmeldinger, den hardkodede spillerliste, Resultater (BD/Nembadminton-scrapede navne) og Spillerpoint. Konkret skade i 26/27-sæsonen: "Hannah Clausen" (Nembadmintons korte form) dukkede forkert op i BÅDE herre- og dame-dropdown ved tilmelding, og flere `Resultater`-rækker krediterede ikke de rigtige spillere i Spillerpoint — reelt tabte point. Se `docs/dream-team-brief.md`s "Kendte faldgruber" #4 og `docs/historik/analyse-js-code-review-2026-09-06.md`s F7.

**2026-09-06/07, attende runde:** en Opus-subagent (Chris' go-ahead) leverede et fuldt teknisk design baseret på et nyt, sæson-uafhængigt Google Sheet ("GSB Stamdata") med en `Alias`-fane. Se driftloggens attende runde for hele designet ordret.

**2026-09-07, nittende runde — den akutte del SHIPPET:** fordi tilmeldingen allerede var offentligt åben og point reelt gik tabt, bad Chris om at få den akutte del bygget med det samme, uden at vente på Stamdata-arket eller svar på alle åbne edge cases. Bygget og skrevet til `apps/netlify-prod/`:
- Ny fil `apps/netlify-prod/netlify/lib/navne.js` — samme normaliserings-/opslagsprincip som designet (Unicode NFC, whitespace-collapse, case-fold, ingen diakritik-stripning, ukendt navn → pass-through), men alias-listen ligger som et embedded JS-objekt i selve filen i stedet for i et Google Sheet — den forenkling der gjorde det muligt at shippe samme dag. Bygget fra `data/navne-alias.json`s eksisterende alias-par, retning ensrettet (alias → officielt navn, matcher den hardkodede 26/27-trup).
- Chris rettede samtidig selve navnefejlen: det (dengang formodede) rigtige navn var **"Hannah Phoebejada Clausen"** (ikke den tidligere hardkodede "Hannah Phoebe Ejada Clausen") — rettet i `spillere.js`s `DAMER_2627`-liste, med alias-indgange for begge tidligere fejlstavninger plus Nembadmintons korte "Hannah Clausen". **Denne antagelse blev vist forkert samme dag i tyvende runde nedenfor — det korte "Hannah Clausen" er det rigtige facit-navn, ikke den lange form.**
- `spillere.js`: Spillerpoint-navne normaliseres nu før kønsklassifikation — retter dropdown-dubletbugget direkte.
- `hent-resultater.js`: individuelle spillernavne normaliseres FØR skrivning til Resultater — retter fejlen ved kilden for alle fremtidige runde-importer.
- `analyse.js`: `knownPlayers` og hjemme/ude-navne normaliseres begge — retter Statistik-sidens matching for både nye og allerede eksisterende Resultater-rækker (uden at røre selve arkets rå tekst).

**2026-09-07, tyvende runde (samme dag) — alias-listen og den hardkodede trup RETTET og UDVIDET efter krydstjek mod BD's egen API:** kort efter nittende rundes shipment spurgte Chris om navnene rent faktisk kom rigtigt med i tilmeldingerne, og oplyste at han allerede selv havde rettet navne manuelt i BÅDE Spillerpoint-arket og Tilmeldinger — hvilket rejste en risiko for at hans manuelle rettelser og kodens hardkodede facit-liste kunne komme til at pege forskellige veje. I stedet for at gætte blev hele 26/27-truppen krydstjekket direkte mod BD/Nembadmintons egne registrerede navne via den samme login-frie `highestPointGain`-API som `hent-resultater.js` selv bruger (kaldt fra den indbyggede browser for at omgå sandboxens netværksbegrænsning — se driftloggens tyvende runde for metoden), hvilket gav 382 unikke registrerede GSB-navne til sammenligning. Chris leverede derefter selv den definitive, bekræftede stavning for alle 44 spillere (inkl. én helt ny spiller) plus to eksempel-Tilmeldinger-rækker.

Resultatet af krydstjekket:
- **Hannah — retning vendt om:** BD's egen registrering, og det Chris rent faktisk vil bruge, er den KORTE form **"Hannah Clausen"** — ikke den lange "Hannah Phoebejada Clausen" fra nittende runde. Alle tre tidligere brugte lange former er nu aliaser der peger på den korte, officielle "Hannah Clausen".
- **Tre nye alias-fund:** "Camilla Bagge" → **"Camilla Steinmetz Bagge"** (bekræftet af Chris), "Theodor Lumby" → **"Theodor Lumby Jessen"**, "Louis Toftlund" → **"Louis Valdemar Hedegaard Toftlund"** (allerede kendt fra `data/navne-alias.json`s SUT-ungdomsnote).
- **Fem retninger vendt om ift. nittende rundes tabel** (Chris' facit viste den hardkodede "længere navn er altid officielt"-antagelse var forkert som generel regel): Anja, Jonathan, Sebastian, Thor og Rasmus har nu deres KORTERE/BD-registrerede form som facit, med den tidligere hardkodede form nedgraderet til alias. Louise, Nadia, Thøger, Linus, Dorthe, Holger og Lena var allerede korrekte og er uændrede.
- **Én helt ny spiller fundet og tilføjet: Shenai Antony** — fandtes ikke på den gamle 43-mands-liste, opdaget ved API-krydstjekket og bekræftet af Chris. Køn ("MEN") afklaret via et nyt, ikke tidligere dokumenteret login-frit `gender`-felt på API'ens `Member`-objekt.
- **Andreas Drasbek afklaret som IKKE en stavefejl:** findes slet ikke i BD's 382-navnes-liste, hverken eksakt eller ved token-overlap — konsistent med den allerede kendte anomali om at han reelt ikke er registreret/ranglisteret endnu.
- `spillere.js`s `HERRER_2627`/`DAMER_2627` er genskrevet fuldt ud til Chris' 44-navns facit-liste (28 herrer, 16 damer). `netlify/lib/navne.js`s `ALIAS_RAA` er genopbygget fra bunden med facit-listen som eneste kilde. `hent-resultater.js` og `analyse.js` krævede ingen kodeændringer denne runde — deres logik kalder allerede `officieltNavn()` generisk.
- **Stadig ikke gjort:** Chris' egne manuelle Sheet-rettelser er ikke verificeret linje for linje mod den nye facit-liste (hans to eksempel-Tilmeldinger-rækker viste selv én reel uoverensstemmelse: "Sebastian Møller" vs. facit-listens "Sebastian Almeida Møller" — præcis det alias-opslaget nu retter automatisk). Det nye `gender`-felt er endnu ikke tilføjet til `docs/nembadminton-api.md`. Ingen ny Netlify-deploy udløst.

**2026-09-07, enogtyvende runde:** Chris har bekræftet at `apps/netlify-prod/` nu er uploadet til Netlify, så nittende/tyvende rundes alias-fix (inkl. den korrigerede korte "Hannah Clausen") er live — bekræftet af Chris' egen besked, ikke uafhængigt verificeret mod selve den live URL i denne runde.

**Bevidst IKKE lavet (udskudt på Chris' anmodning — "ellers kan vi kigge på resten senere"):**
- Intet Google Sheet ("GSB Stamdata") oprettet — alias-listen kræver i dag en kodeændring, ikke en regnearks-redigering, for at udvide. Værd at genoverveje hvis alias-listen vokser meget, eller hvis Chris ønsker selv at kunne redigere den uden Claude.
- F7's cap-udvidelse (`Spillerpoint!A2:A200` → åbent interval) og F2 (rækkefølgefejl i `seenMatches`) er IKKE bundlet ind i denne akutte runde — kun selve alias-normaliseringen blev lavet i `analyse.js`.
- Walkover-fixet (punkt 2/F1) — se punkt 2 ovenfor, nu shippet, afventer Netlify-upload.
- **Allerede skrevne `Resultater`-rækker er IKKE rettet med tilbagevirkende kraft.** Spillerpoint-arkets SUMIFS-formler matcher stadig mod Resultater-arkets RÅ tekst — hvis en tidligere 26/27-runde allerede har en kendt stavevariant skrevet ind, mangler den spiller stadig sine point i selve Spillerpoint, indtil rækken rettes manuelt eller runden genimporteres. **Chris bør tjekke allerede-importerede 26/27-runder for dette.**
- Ingen alias-konflikt-håndtering, adgangsstyring eller Tilmeldinger-fritekst-normalisering — samme åbne spørgsmål som i attende runde, stadig uafklarede, blot ikke blokerende for den akutte fix.

**Afventer:** en linje-for-linje verificering af Chris' egne manuelle Sheet-rettelser mod den nye 44-navns facit-liste, samt et manuelt tjek af allerede-importerede 26/27-runder for tabte point. Beslutning om det nogensinde er værd at migrere til det fulde Sheets-Stamdata-design (kun relevant hvis alias-listen vokser meget, eller Chris selv vil redigere den) er fortsat åben, ikke akut.

---

## Bygget i preview, afventer produktionskopiering

Alt herunder er bygget og testet i preview-kilden, men findes ikke i `apps/netlify-prod/`. Ingen af dem kræver nyt designarbejde — kun et deploy-skridt og et byg-signal.

**Kampsystem (samles helst i én runde, jf. anbefaling 5):**
- Lås-dropdown-fix (A5) — fixet i preview, afventer Chris' test og kopiering.
- Bane-begrænset rundegenerering (banekapacitets-bevidst fordeling der minimerer oversiddere).
- Kønsbevidst double-/mixed-fordeling.
- Tydeligere oversidder-UI.
- Manuel kamp-redigering.
- H2H-redesign.
- "Normal rolle" med Sheets-persistens (kræver desuden nye Sheet-kolonner G/H).
- Udskiftningssingle/-double (3/5 spillere pr. bane) og teknikbane-loft — kopieres først når teknikbane-designspørgsmålet er afklaret.

**Søndagstræning:**
- Hele appen er bygget i preview med en genbrugelig kodeords-"gate"-komponent, men er bevidst udeladt af produktions-nav'en, fordi appen ikke findes i produktion. Bemærk at flere grundlæggende spørgsmål stadig er åbne (se "Længere ude") — den er ikke deploy-klar på samme måde som Kampsystem-punkterne.

**Statistik:**
- Board-position-tendens er allerede shippet 🟢. Ingen udestående statistik-deploys ud over walkover-fixet i anbefaling 2 og code review-fundene F1/F2/F5.

---

## Afventer Chris' beslutning/prioritering

Punkter hvor arbejdet ikke kan starte, før Chris har taget stilling. Ingen af dem er påbegyndt.

**De seks punkter fra ellevte runde** — undersøgt, men eksplicit ikke bygget:
1. BD-pointregler-sammenligning.
2. Tydeliggørelse af effektiv rating i %.
3. Bane-begrænset rundegenerering. *(Bemærk: dette er siden bygget i preview — punktet bør verificeres og lukkes ved næste gennemgang.)*
4. Kønsbevidst double-parring. *(Samme forbehold som punkt 3.)*
5. "Nulstil runde"-knap.
6. Tydeligere oversidder-UI. *(Samme forbehold.)*

Punkt 3 og 6 blev vurderet til at burde designes og bygges sammen. Punkt 1, 2 og 5 er stadig urørte og venter kun på prioritering.

**Designspørgsmål:**
- Teknikbanen: gulv eller loft? Skal banen altid forhåndsreserveres, eller kun tildeles hvis der er plads til overs? Nuværende implementering er det sidste, og det er flagget som en mulig misforståelse.
- Metodevalg for "effektivitet"-ranking (B3): Bayesiansk, Wilson, hård minimumsgrænse for antal kampe, eller vent på ELO fra B4.
- Fair sammenligning af holdsucces på tværs af sæsoner når hold skifter række — uløst, blokerer ikke B3, men vil dukke op igen.
- **Navnealias-opslagets resterende edge cases (se punkt 8 ovenfor og driftloggens attende/nittende/tyvende/enogtyvende runde):** håndtering af alias-konflikter, om historiske `Resultater`-rækker skal rettes med tilbagevirkende kraft, og om Tilmeldinger-fanens fritekstfelt også skal aliasnormaliseres. Ikke blokerende — kun relevant hvis/når et fuldt Sheets-Stamdata-design overvejes.

**Andre afventende beslutninger:**
- Dream Team forsidens siderækkefølge: principielt godkendt, men eksplicit sat på pause. Kræver et separat "nu skal den ændres"-signal.
- Runde-preset-antal er hardkodet pr. sæson. Skal det gøres sæson-konfigurerbart? Bliver først aktuelt ved sæsonskift — og sæsonskiftet er nu.
- Permanent placering af navnealias-listen: i dag et embedded JS-objekt i `netlify/lib/navne.js` (shippet 2026-09-07). Et dedikeret "GSB Stamdata"-Sheet er stadig designet og klar, hvis listen vokser meget eller Chris ønsker selv at redigere den uden Claude — se punkt 8.
- `alias_2425`-navnematching er ikke anvendt på det rekonstruerede 24/25-datasæt endnu.

**Chris' egen opgave (ikke Claude-arbejde):**
- Rette betalingsstatus for 24/25 og 25/26 i Tilmeldinger. Stadig ikke gjort.
- Skaffe klubbens rigtige holdliste — blokerer B4 Fase 4 (trænings-skabeloner), det eneste der mangler i B4.
- Verificere sine egne manuelle Sheet-rettelser (Spillerpoint + Tilmeldinger) mod den nye 44-navns facit-liste, og tjekke allerede-importerede 26/27-runder for tabte point pga. navnestavning.

---

## Længere ude / uafklaret

Idéer uden klar vej videre lige nu. Ikke afvist, bare ikke klar til at blive prioriteret.

- **Søndagstræning — grundspørgsmål ubesvarede:** hvor skal den rigtige spillerliste komme fra, skal der være historik, og skal adgangen være ét fælles kodeord eller personlige. Ikke blokerende for previewet, men appen kan ikke sættes i produktion før mindst spillerliste og kodeordsmodel er afklaret.
- **A4 — dato-præcist ranglistepoint-opslag** (trænerværktøj "performance vs. ranglistepoint"): teknisk gennembrud opnået via badmintonplayer.dk, men delvist ufuldendt. Blokerer ikke B3.
- **Reverse-engineering af Tilmeldingsniveau-formlen:** blokeret af manglende `clubhouseId`-adgang for andre klubber og lukket Shuttler.dk-adgang. Ingen kendt vej videre uden ny adgang.
- **`generel-idebank.md` som helhed:** ikke-GSB-tekniske kuriositeter. Intet planlagt, intet kodet. Bør blive liggende som ren "måske engang"-liste og ikke trække opmærksomhed i roadmappen.
- **BadmintonID/refId-baseret navnematching (mere robust end strengmatch)** — nævnt 2026-09-07 i forbindelse med navnealias-opgaven (punkt 8), men eksplicit IKKE en del af det: et større indgreb i den SUMIFS-baserede Spillerpoint-pipeline, kun relevant koblet til B3 Klubstatistik-arbejdet (jf. F7/F9/F10 i code review-rapporten). Kun en fremtidig idé, ikke designet.

---

## Kendt teknisk gæld / dokument-oprydning

Kort liste. Uddybes i reviewrapporten og code review-rapporten fra 2026-09-06, ikke her.

- `docs/idebank-kampsystem.md`: status-linjen "KUN LOGGET, INGEN KODE ÆNDRET" var faktuelt forkert — punkterne blev rettet i senere runder. **Rettet 2026-09-07 (enogtyvende runde):** en tydeligt mærket rettelsesnote er indsat lige efter den gamle linje, der peger frem mod ellevte runde for den faktiske facit-status. Den gamle linje er bevidst ikke slettet (korrekt historisk øjebliksbillede af selve logge-tidspunktet).
- `docs/idebank-kampsystem.md`: banekapacitets-mekanismen er beskrevet to gange (36- og 40-spiller-tilfældet) med voksende detaljegrad.
- `docs/historik/idebank-kampsystem-historik.md`: afsluttende "SUPERSERET"-afsnit gentager starten af hovedfilen.
- `docs/idebank-statistik.md`: afsnittet "Adskil Dream Team-statistik fra generel statistik" er overhalet af at B3 er landet i spec-filen.
- `docs/idebank-feature.md`: Tilmelding-afsnittet har tre lag opdateringer oven på originalteksten og er nu shippet — kandidat til den trimning `START-HER.md` foreskriver for færdige punkter.
- `docs/idebank-feature.md`: løs ende om ubrugt `nav.sitenav`-CSS hører hjemme i driftloggen, ikke idébanken.
- Kode: `normalKategorier` bevarer et ubrugt `double`-felt.
- Kode: publiceret Claude-preview-artifact er ikke regenereret efter kilderettelsen 2026-09-04 (manglende multi-gruppe-checkboks-filter).
- Kode: `analyse.js`-kopien i projektet er forældet (2026-08-30) — se code review-rapporten fra 2026-09-06 for det fulde forbehold og ti konkrete fund (F1-F10) i aggregerings-/dedup-logikken, flere direkte relevante for B3.
- `docs/dream-team-brief.md`: ikke opdateret siden 2026-08-29 og dækker under halvdelen af projektets nuværende scope. Se vurderingen i reviewrapporten fra 2026-09-06.
- Denne fil bør tilføjes til dokumentkortet i `START-HER.md`, ellers bliver den ikke læst i fremtidige sessioner. *(Gjort 2026-09-06.)*
