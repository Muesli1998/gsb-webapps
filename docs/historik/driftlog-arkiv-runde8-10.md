# GSB Dream Team – driftlog, arkiv: ottende-tiende runde (2026-09-03)

Arkiveret 2026-09-06 fra `claude/gsb-driftlog.md`, som var vokset for stort til at redigere trygt
og hurtigt (rule om ~1.500 ords-grænse, se `claude/START-HER.md`). Indholdet her er UÆNDRET i
forhold til originalen — kun flyttet til denne fil. Se `claude/gsb-driftlog.md` for ellevte runde
og fremefter (den fortsatte, aktive log).

## Nav/IA-omlægning shippet til produktion (2026-09-03, ottende runde)

**Baggrund:** lige efter kampsystem-status-gennemgangen sagde Chris "Hov, kampsystemet skal da være
en del af hele GSB webappen" — pegede på at `kampsystem.html` var bygget som en isoleret side uden
nogen nav-integration med resten af sitet (samme mangel allerede noteret i statusgennemgangen som
"Ingen nav-integration"). Spurgt eksplicit om omfang (kun tilføje simple links vs. den fulde
tre-lags nav/IA-omlægning der allerede var bygget i previewet vs. bare logge det som en to-do) —
**Chris valgte den fulde tre-lags-model, til produktion, nu.** Dette er et eksplicit, utvetydigt
"byg det"-signal for netop dette punkt.

**Vigtig arkitektonisk forskel fra preview-implementeringen:** previewets nav (`shell_template2.html`)
er bygget til én artifact med 7 sider som iframes, styret via `postMessage`. De rigtige produktionssider
er separate, selvstændige HTML-filer på hver sin URL — der er intet overordnet "shell"-dokument at
placere navigationen i. Løsningen (allerede identificeret som den rigtige, fremtidige tilgang i
`gsb-feature-idebank.md`s ældre nav/IA-afsnit) er ÉT fælles nav-script efter samme mønster som `seasons.js`:
en ny fil `gsb-nav.js` i `public/`, inkluderet med `<script src="/gsb-nav.js" defer></script>` i hver
sides `<head>`, som ved kørsel indsætter en rigtig to-lags navigationsbjælke (apps-række + sider-række)
som ægte DOM med rigtige `<a href>`-links — browseren navigerer mellem hele sider, ingen iframes eller
postMessage.

**Sådan er det bygget:**
- **`public/gsb-nav.js`** (ny fil): definerer `APPS`-listen (Forside, GSB Dream Team med undersider
  Tilmelding/Statistik/Historisk stilling/Admin-pille, Ungdomssparring, Kampsystem), renderer nav-baren
  ind i et `<div id="gsb-nav-root">` (placeret som det første i `<body>` på hver side), highlighter
  aktiv app/side ud fra et `data-gsb-page="..."`-attribut sat på hver sides `<body>`-tag, og indeholder
  en genbrugelig kode-gate-mekanisme (`sessionStorage`-baseret, samme princip som previewets gate).
  Kampsystem er den ENESTE app der er låst i produktion (kode `kamp2026`) — Admin/index.html vises som
  en almindelig, ulåst pille i navigationen, fordi siden i forvejen kun er reelt beskyttet server-side
  (via `ADMIN_PASSWORD` tjekket inde i selve `hent-resultater.js`, jf. Project Brief punkt 8) — der er
  altså ingen grund til også at klient-side-låse selve SIDEVISNINGEN af Admin, kun selve skrive-kaldet
  er (og skal være) beskyttet.
  Søndagstræning er BEVIDST UDELADT fra produktions-nav'en (findes slet ikke i produktion endnu, kun
  preview-eksempeldata) — skal tilføjes til `APPS`-listen den dag den rigtige backend/side bygges.
- **Ny fil `public/forside.html`:** rigtig landing-side/app-vælger, adapteret fra previewets
  `landing_source.html` men med rigtige `<a href>`-links (ingen `postMessage`) og UDEN
  Søndagstræning-kortet (samme begrundelse som ovenfor). Tre app-kort (GSB Dream Team, Ungdomssparring,
  Kampsystem — sidstnævnte tydeligt markeret "🔒 Kræver kode (trænere)") plus en dæmpet
  Admin-genvej nederst.
- **`netlify.toml`:** tilføjet en `[[redirects]]`-regel, `from = "/"` → `to = "/forside.html"`,
  `status = 200` (rewrite, ikke en synlig redirect — browserens adresselinje viser stadig "/"). Dette
  betyder `index.html` (Data-indskrivning/Admin) FORBLIVER uændret på sin egen URL `/index.html` — der
  er IKKE omdøbt eller flyttet nogen eksisterende fil (i overensstemmelse med at Claude aldrig omdøber/
  sletter filer på Chris' maskine), kun tilføjet en ny rewrite-regel og en ny fil.
- **De 6 eksisterende rigtige sider** (`index.html`, `tilmelding.html`, `analyse.html`, `stilling.html`,
  `senior-ungdom-tilmelding.html`, `kampsystem.html`) fik alle tre samme ændringer: (1) tilføjet
  `<script src="/gsb-nav.js" defer></script>` i `<head>`, (2) `<body>`-tagget fik et
  `data-gsb-page="..."`-attribut, (3) `<div id="gsb-nav-root"></div>` indsat som det første i `<body>`.
  De 5 sider der havde en gammel, flad `<nav>...</nav>`-blok indlejret i deres `<header>` (alle undtagen
  `kampsystem.html`, som aldrig havde nogen nav) fik denne blok fjernet, så der ikke er dobbelt
  navigation — `gsb-nav.js`s bjælke er nu den ENE navigationskilde på tværs af hele sitet.
  `kampsystem.html` fik nu, for første gang, sin egen kode-gate (kamp2026) direkte i selve siden (ikke
  kun i nav-baren) — tidligere havde den rigtige, deployede `kampsystem.html` INGEN adgangsbeskyttelse
  overhovedet (kun preview-shell'en havde en gate, som ikke fandtes i selve den udtrukne produktionsfil)
  — dette lukker det hul.
- **Verificeret med et automatiseret jsdom-testscript** (kørt mod alle 6 ændrede sider + de 2 nye filer,
  `gsb-nav.js` inlinet i test'en for at omgå jsdoms manglende ekstern-script-fetch): nav-baren renderer
  korrekt på alle sider med rigtig aktiv-app/aktiv-side-markering (inkl. Admin-pillen der markeres aktiv
  på `index.html`), Kampsystem-fanen viser låse-ikon i navigationen på tværs af alle sider, selve
  Kampsystem-siden viser en fuldskærms kode-gate ved indlæsning der IKKE kan omgås med forkert kode men
  låser rigtigt op med `kamp2026` (og sætter `sessionStorage`, så genindlæsning inden for samme fane ikke
  kræver koden igen), gamle `<nav>`-blokke er væk fra alle 5 sider der havde dem, og hver sides eget
  funktionelle indhold (fx `tilmelding.html`s tilmeld-knap, `index.html`s import-knap,
  `senior-ungdom-tilmelding.html`s ugekalender-legend) er uændret og intakt. Forsiden viser korrekt kun
  de tre reelt live apps (ingen Søndagstræning-kort).
- **9 filer i alt skrevet direkte til `D:\Dropbox\netlify-tool-prod\`** via enhedsbroen: de 6 ændrede
  sider, de 2 nye filer (`gsb-nav.js`, `forside.html`), og den opdaterede `netlify.toml`. Alle 9 blev
  bekræftet skrevet uden afvisninger.

**Bevidst IKKE gjort/besluttet i denne runde:**
- Ingen ændring af den eksisterende CSS i `senior-ungdom-tilmelding.html` for den nu-ubrugte
  `nav.sitenav`-styling (selve `<nav>`-elementet er fjernet, men CSS-reglerne for klassen ligger
  stadig ubrugt i filens `<style>`-blok) — harmløst (ingen synlig effekt), men kunne ryddes op senere.
- Ingen ændring af Kampsystem-appens fremtidige "Statistik"-underfane eller anden funktionalitet — kun
  selve nav-integrationen og den nye kode-gate blev tilføjet, resten af Kampsystem-siden er urørt.
- URL'en `/forside.html` er valgt fremfor at omdøbe eksisterende filer — hvis Chris hellere vil have en
  anden landing-URL-struktur senere, kræver det stadig hans egen omdøbning (Claude omdøber/sletter aldrig
  filer på hans maskine).

Status: **shippet til de rigtige `netlify-tool-prod`-filer 2026-09-03, verificeret med automatiserede
tests.** Afventer stadig Chris' sædvanlige manuelle mappe-overførsel til Netlify (se rettelsen ovenfor —
intet git-trin er nødvendigt) før det er live for rigtige besøgende.

## RETTELSE 2026-09-03 (niende runde) — dokumentations-fejl fundet: win%-dedup/ikkeSlutspilHold var IKKE rent faktisk i den rigtige, shippede analyse.js

Ved gennemgang af `D:\Dropbox\netlify-tool-prod\netlify\functions\analyse.js` direkte (læst linje for
linje denne runde) blev det bekræftet at filen STADIG havde den gamle, buggede
`matchKey = [runde, hold, kategori, s1, s2, s3, vinder].join('|')` og INGEN `ikkeSlutspilHold`/
`ROUND_FILTER_EXEMPT_HOLD`-mekanisme — modsat hvad `gsb-feature-idebank.md`s Board-position-afsnits
tidligere status-tekst antydede ("rettet i den rigtige, shippede `netlify/functions/analyse.js`").
Årsagen til forvirringen: den tidligere rettelse blev rent faktisk kun lavet i en UPLOADET Dropbox-KOPI
(`netlify-tool/netlify/functions/analyse.js`, i sessionens uploads-mappe), ikke i selve
`D:\Dropbox\netlify-tool-prod`-mappen Chris rent faktisk overfører til Netlify. De to filer så ud til at
være "den rigtige fil" men var det ikke — en reel forveksling mellem en uploadet arbejdskopi og
produktionsmappen. Board-position-afsnittets tekst i `gsb-feature-idebank.md` er bevidst IKKE rettet
(bevaret som historik for hvordan fejlen opstod), men denne rettelse her er den autoritative, korrekte status.

**Konsekvens:** begge fixes (win%-dedup via boardposition, samt `ikkeSlutspilHold`-baseret
grundspil/slutspil-eksemption for GSB 3/4) var reelt ALDRIG shippet til den rigtige, deployede kode før
denne (niende) runde — se næste afsnit for hvor de nu faktisk er landet.

## Niende runde (2026-09-03) — seks konkrete rettelser shippet til de rigtige netlify-tool-prod-filer, milestone gemt

**Baggrund:** efter nav/IA-omlægningen (ottende runde) rapporterede Chris seks konkrete problemer med den
shippede version og bad om at få dem rettet. Før rettelserne blev den daværende, fungerende version gemt
som en milestone-mappekopi (Chris' eget "primitive versionskontrol"-workflow, manuel mappekopiering):
hele `netlify-tool-prod`-mappen (20 filer) kopieret 1:1 til `D:\Dropbox\GSB-Dream-Ung-Kamp\` — en
antaget, ikke eksplicit bekræftet fortolkning af "denne version skal gemmes som 'GSB-Dream-Ung-Kamp' som
et opnået delmål", valgt fordi den matcher Chris' egen etablerede workflow og er ikke-destruktiv.

**De seks rettelser, alle shippet til `D:\Dropbox\netlify-tool-prod\` denne runde:**

1. **Forside viste Tilmelding i stedet for app-vælgeren.** Roden af sitet omdirigerede kun via
   `netlify.toml`s `[[redirects]]`, som visse manuelle deploy-metoder (drag-and-drop af `public/`-mappen)
   ikke nødvendigvis læser. Tilføjet en `public/_redirects`-fil (`/  /forside.html  200`) som en
   defensiv duplikering af samme regel — virker uanset deploy-metode.
2. **Podieplaceringer/Hall of Fame manglede på Historisk stilling.** `public/stilling.html` var stadig
   den ældre, enkle version uden podie — erstattet med den fulde version portet fra previewets
   `stilling_source.html` (podie m. guld/sølv/bronze-medaljeemoji, "Vis hold"-udvidelse pr. sæson).
3. **Statistik krævede tryk på "Hent statistik", og sæsonvælgeren var en dropdown i stedet for
   valgbare bokse.** `public/analyse.html` erstattet med previewets version: sæson-"pills"
   (afkrydsningsbokse, ikke dropdown — første sæson forudvalgt, indlæser automatisk uden ekstra klik,
   understøtter valg af flere sæsoner til sammenligning).
4. **Tilmelding manglede spillerinformation i dropdown-menuerne.** Root cause: `spillere.js` læste
   udelukkende fra `Spillerpoint`-arket, som for 26/27 stadig er tomt (ingen kampe spillet endnu) — gav 0
   spillere i dropdownsne. Rettet: `spillere.js` bruger nu den kendte, kønsopdelte 26/27-seniortrup
   (27 herrer, 16 damer, fra Zakobo-eksporten) som bundliste, sammenflettet med hvad `Spillerpoint`
   faktisk indeholder (så det automatisk retter sig selv når sæsonen får rigtige kampe).
5. **Tilmelding manglede betalt/gratis-information.** Ny betalt/gratis-vælger tilføjet i
   `tilmelding.html` (MobilePay-boks `1572BU`, spærrer tilmeld-knappen indtil et valg er truffet);
   `tilmeld.js` udvidet til at validere og gemme valget i en ny kolonne F i `Tilmeldinger`-arket.
6. **De to bug-fixes fra `gsb-feature-idebank.md`s Board-position-afsnit var reelt aldrig landet i den
   rigtige `analyse.js`** (se rettelsen ovenfor) — `netlify/functions/analyse.js` er nu fuldstændig genskrevet ud fra den
   bekræftede, validerede `runAnalyse()`-logik fra previewets `build3.py`: boardposition-baseret dedup
   (retter den kunstigt inflaterede double-kamptal/vindprocent), `ikkeSlutspilHold`-baseret eksemption for
   GSB 3/4 (deres tal er nu stabile uanset runde-preset), samt de nye `matrix`/`byHoldCategory`-felter der
   driver den klikbare hold×kategori-matrix og spiller-drilldown/board-tendens i den nye `analyse.html`.
   `public/seasons.js` opdateret til at matche (ny `ikkeSlutspilHold`-konfiguration pr. sæson, nye
   runde-presets inkl. "Playoff"). **Ved samme lejlighed rettet en tidligere fejlagtig
   placeholder-indsættelse:** 2024/25-sæsonens `spreadsheetId` blev midlertidigt (fejlagtigt) skrevet som
   en pladsholder-streng under selve udviklingsarbejdet, men rettet tilbage til det rigtige, eksisterende
   ID (`1YYNv2DDxvyFEZLMO4A64tsaIQ6Hyr_mWQu-dyKzf4Bo`) før filen blev sendt/committet — ingen
   pladsholder-data endte i den leverede fil.

**Verificeret før levering:** et jsdom-testscript (samme mønster som ottende rundes nav-verificering,
med `gsb-nav.js` og `seasons.js` inlinet for at omgå jsdoms manglende ekstern-script-fetch, mockede
`fetch`-svar for `spillere`/`analyse`/`stilling`-endpoints) bekræftede: Tilmelding — kønsopdelte
dropdowns, betalings-UI og spærret/frigivet tilmeld-knap virker; Statistik — sæson-pills, automatisk
indlæsning uden klik, matrix og board-tendens vises; Stilling — podie, medaljeemoji og
detalje-tabel indlæses automatisk. Alle tre sider viser korrekt nav-integrationen fra ottende runde
(aktiv app/side, gammel `<nav>` fjernet).

**8 filer skrevet direkte til `D:\Dropbox\netlify-tool-prod\`:**
`netlify/functions/analyse.js`, `netlify/functions/spillere.js`, `netlify/functions/tilmeld.js`,
`public/seasons.js`, `public/tilmelding.html`, `public/analyse.html`, `public/stilling.html`,
`public/_redirects` (ny fil). Alle bekræftet skrevet uden afvisninger (mtime-guards på de eksisterende
filer holdt, ingen af dem var ændret siden ottende rundes shipment).

**Chris' åbne spørgsmål besvaret denne runde — "er der flere ting der ikke er opdateret, udover
Søndagstræning?":**
- **`hent-resultater.js`:** diffet den uploadede preview-kopi mod den rigtige `netlify-tool-prod`-fil —
  100% identiske. Ingen gap.
- **Podie-filtrering efter betalingsstatus + "Honorable mentions" på Stilling (del af B5):** IKKE bygget
  endnu, heller ikke i previewet — kun tilmeldings-UI'et (betalt/gratis-valg) er bygget. Podie-filtreringen
  og Honorable mentions-sektionen kræver videre design/byg af `stilling.js`/`stilling.html` — se B5 i
  `gsb-planlagte-features-spec.md`. Ikke en regression fra denne runde, bare stadig ubygget.
- **B1 (Kampkalender) og B3 (Klubstatistik/ungdom+senior+veteran):** begge kun designet/aftalt i
  spec-filen, intet kodet nogen steder (hverken preview eller produktion).
- **Kampsystem:** allerede kendt og under egen udrulning (se ottende/niende rundes Kampsystem-afsnit) —
  afventer stadig Chris' manuelle mappe-overførsel til Netlify.
- **Søndagstræning:** bekræftet stadig kun eksempeldata i previewet, bevidst udeladt fra produktions-nav,
  som Chris allerede ved.

**Ikke gjort/besluttet denne runde:**
- Ikke bekræftet med Chris om milestone-mappenavnet ("GSB-Dream-Ung-Kamp") skulle forstås som en ren
  mappekopi — handlet ud fra bedste fortolkning, ikke-destruktivt og reversibelt.
- Selve Netlify-deploy (Chris' manuelle mappe-overførsel) er IKKE udført af Claude — filerne ligger klar
  i `netlify-tool-prod`, men er ikke nødvendigvis live endnu.

Status: **seks rettelser shippet og verificeret i `netlify-tool-prod` 2026-09-03.** Afventer Chris'
sædvanlige manuelle mappe-overførsel til Netlify før det er live for rigtige besøgende.

## Tiende runde (2026-09-03) — B5-resten shippet: podie-filtrering efter betaling + "Honorable mentions" på Stilling

**Baggrund:** Chris bad om at få resten af B5 bygget til de rigtige Netlify-filer, efter niende
rundes seks rettelser. Niende rundes status-note ovenfor ("Podie-filtrering ... IKKE bygget endnu")
er nu forældet — se dette afsnit for den aktuelle status.

**Sådan er det bygget, efter designet i `gsb-planlagte-features-spec.md` B5:**
- **`netlify/functions/stilling.js`:** slår nu Betaling op pr. deltager i `Tilmeldinger!B2:F`
  (kolonne F, tilføjet i niende runde af `tilmeld.js`) og returnerer et `podieBerettiget`-flag samt
  den rå `betaling`-værdi pr. deltager. Reglen (case-insensitiv): "Ja"/"Betalt" og BLANK/manglende
  match tæller som podie-berettiget; alt andet ("Gratis", "Nej", enhver anden note) udelukker fra
  podiet. Opslaget er fejl-tolerant — findes `Tilmeldinger`-fanen ikke, eller mangler kolonne F for en
  ældre sæson (24/25, dele af 25/26), falder alle tilbage til podie-berettiget, præcis som aftalt i
  spec'en. Selve pointberegningen (Stilling-fanen, Spillerpoint, Beregning) er fuldstændig urørt —
  `podieBerettiget` er udelukkende et nyt, ekstra felt på hver deltager i svaret.
- **`public/stilling.html`:**
  - Podiet (både den fremhævede nuværende sæson og hver historisk sæson i Hall of Fame-listen) viser nu
    kun podie-berettigede deltagere — en gratis-deltager der reelt ligger nr. 1 springes over på selve
    podiet, og den næste podie-berettigede rykker op i stedet. Guld/sølv/bronze er dermed "hvem der
    reelt vandt blandt de betalende", ikke nødvendigvis den samme som den øverste linje i den fulde
    tabel.
  - Ny **"🌟 Honorable mentions"**-boks: alle gratis-deltagere hvis rigtige (ufiltrerede) pointtotal
    ville have placeret dem i sæsonens samlede top 5, med deres faktiske ville-have-været-placering
    vist eksplicit (fx "38 point — ville have været nr. 5"). Vist under podiet på den nuværende sæsons
    kort; en tilsvarende kompakt linje under hver historiske sæson i Hall of Fame-listen. Boksen vises
    kun når der reelt er en kvalificeret gratis-deltager for den sæson (ellers ingen boks) — de to
    resterende, ikke-blokerende visningsspørgsmål fra spec'en (vis altid vs. kun ved kvalifikation; nævn
    den konkrete placering) er dermed afgjort som hhv. "kun ved kvalifikation" og "ja, vis placeringen".
  - Den fulde, runde-filtrerede deltagertabel (nederst, "Hent stilling") beholder alle deltageres
    RIGTIGE plads/point uændret, som krævet — en lille "Gratis"-badge er tilføjet ved siden af navnet
    på ikke-podie-berettigede deltagere, så det er synligt i den fulde tabel også, uden at ændre
    rækkefølgen eller tallene.
- **Ikke rørt:** `tilmeld.js` (kolonnen findes allerede fra niende runde), Holdoversigt/Spillerpoint/
  Beregning, selve pointberegningskæden.

**Verificeret før levering:** et jsdom-testscript med seks eksempeldeltagere (en gratis "vinder" i
nr. 1, en betalt i nr. 2, en med BLANK betaling i nr. 3, en betalt i nr. 4, en gratis i nr. 5, en
betalt i nr. 6 uden for top 5) bekræftede: guld går til den betalte nr. 2 (ikke den gratis nr. 1),
sølv til BLANK-deltageren i nr. 3 (blank = berettiget, som aftalt), bronze til den betalte nr. 4;
Honorable mentions-boksen lister både gratis-deltagerne i nr. 1 og nr. 5, men IKKE den gratis-lignende
deltager uden for top 5; den fulde tabel viser alle 6 deltagere med korrekt rigtig plads, og præcis to
"Gratis"-badges (de to reelt gratis-markerede).

**2 filer skrevet direkte til `D:\Dropbox\netlify-tool-prod\`:**
`netlify/functions/stilling.js`, `public/stilling.html`. Begge bekræftet skrevet uden afvisninger
(mtime-guards holdt, ingen af dem ændret siden niende rundes shipment).

**Chris' spørgsmål om manglende Sheet-forbindelser/26-27-spillerliste, besvaret:**
Der mangler ingen Sheet-forbindelse som sådan — det rigtige 26/27 Google Sheet
(`1naV601-lJWqXJ9XZ5ovRwfuaKFWVYaflnLpwf5OUrW4`) er allerede korrekt sat op i `seasons.js` og bruges af
ALLE funktioner (Tilmeldinger, Holdoversigt, Stilling, Spillerpoint, Resultater). Den ene reelle
nuance: der findes ikke en dedikeret "spillerliste"-fane i sheetet i dag — `spillere.js` henter navne
fra `Spillerpoint`-fanen, som først fyldes automatisk når kampe er importeret. Indtil da bruger
`spillere.js` (siden niende runde) en hardkodet 26/27-seniortrup (43 navne, kønsopdelt) som bundliste.
Det er en bevidst fallback, ikke et hul — men hvis Chris hellere vil have en rigtig, redigerbar
spillerliste i selve sheetet (fx en ny fane "Spillere" han selv kan rette i, i stedet for at Claude
skal opdatere en hardkodet liste i koden når spillere til-/framelder sig), er det en mulig fremtidig
forbedring — ikke bygget, kun nævnt som mulighed.

Status: **B5 er nu bygget fuldt ud og shippet til `netlify-tool-prod` 2026-09-03.** Afventer Chris'
sædvanlige manuelle mappe-overførsel til Netlify før det er live. Chris' egen opgave fra spec'en
(dobbelttjekke tidligere sæsoners betalingsstatus mod MobilePay-boks `1572BU` og udfylde/rette
"Betaling"-kolonnen for 24/25 og 25/26 direkte i Tilmeldinger-fanen) er fortsat ikke gjort — uden det
vil ældre sæsoner vise alle som podie-berettigede (blank-fallback), som forventet og aftalt.
