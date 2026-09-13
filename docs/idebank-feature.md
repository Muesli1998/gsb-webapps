# GSB Dream Team – idébank (ikke igangsat)

Features vi har diskuteret men bevidst udskudt. Læs denne før næste feature-runde.

**STANDING REGEL:** Intet i denne fil må implementeres/kodes før Chris eksplicit siger til.

**OPDATERET 2026-09-04 — filen er nu splittet i fem for at gøre løbende opdateringer hurtigere:**
- **`docs/idebank-feature.md`** (denne fil) — features der ikke er statistik/spilleranalyse og
  ikke Kampsystem: Tilmelding, nav/IA, Søndagstræning, Kampkalender, Betaling.
- **`docs/idebank-statistik.md`** (NY, udskilt 2026-09-04) — al statistik-/spilleranalyse-/
  rankings-relateret idéarbejde (Board-position, win%-dedup, "værdi"/"effektivitet"-ranking, 24/25-data-
  rekonstruktion, B3-baggrund m.m.) — samme type arbejde går igen på tværs af flere features, så det gav
  mere mening at samle det ét sted end at holde det spredt.
- **`docs/idebank-kampsystem.md`** — alt om ELO-rating/Kampsystem-appen (B4).
- **`docs/historik/driftlog.md`** — kronologisk log over hvad der er shippet/testet/rettet i
  produktionens `apps/netlify-prod/`-filer, runde for runde.
- **`docs/nembadminton-api.md`** (opdateret 2026-09-04) — al ren Nembadminton-API-teknisk-reference,
  inkl. den tidligere "Automatisk kamp-opdagelse" og "Fuld API-gennemgang" fra denne fil, flyttet dertil
  fordi det er reference-materiale der bruges på tværs af features, ikke en feature-idé i sig selv.

Indholdet der er tilbage her er uændret i selve teksten (kun de udskilte afsnit er flyttet/trimmet).

## Sæson 26/27: Tilmelding sat op i preview med den rigtige seniortrup — BYGGET I PREVIEW (2026-08-31)

**Baggrund:** Chris fik klubbens spillerliste for 26/27 fra en Zakobo-eksport i det eksterne dataarkiv (43 spillere) og bad om at få tilmeldingen sat op nu. Problemet: 26/27's `Spillerpoint`-ark i det rigtige Google Sheet er stadig tomt (ingen kampe spillet endnu), og `spillere.js` henter udelukkende navne derfra (`Spillerpoint!A2:A200`) — så de rigtige dropdown-menuer på `tilmelding.html` ville i dag vise 0 spillere.

**Afklaret med Chris (AskUserQuestion):** arket er allerede live i Google Sheets, men vi skal *kun* forberede i previewet indtil videre — ikke bygge/deploye til den rigtige side.

**Hvad blev lavet (kun i `kampsystem/build3.py` + `kampsystem/tilmelding_source.html`, ikke i `apps/netlify-prod/`):**
- Tilføjede en ny konstant `PLAYERS_2627` i `build3.py` med de 43 navne fra Zakobo-filen (kun navne — mail/tlf/adresse fra eksporten er bevidst IKKE taget med).
- Preview-mock'en for `tilmelding.html` (som opsnapper `fetch`-kaldet til `/.netlify/functions/spillere`) bruger nu `PLAYERS_2627` i stedet for den gamle 25/26-spillerliste (`KNOWN_PLAYERS_JSON`, som stadig bruges uændret til `analyse.html`s kamp-matching — det er en helt separat brug).
- Ny dedikeret preview-banner på tilmeldingssiden: "spillerlisten er den rigtige 26/27-seniortrup (Zakobo-eksport)" i stedet for den gamle "rigtige data fra 2025/26-arket"-tekst, så det er tydeligt for Chris hvilken sæsons data der vises.
- Rebuildet og genpubliceret Claude-previewet ("GSB Webapps Preview") med det opdaterede `tilmelding.html`.

**OPDATERING 2026-08-31 (samme dag) — kønsopdeling rettet:** Chris fangede at Herrer/Damer-dropdownsne
delte samme udifferentierede liste, så man kunne vælge en kvinde i en herre-slot og omvendt (en
pre-eksisterende svaghed i selve produktionssiden, ikke noget nyt introduceret af 26/27-arbejdet). Rettet
i previewet:
- `tilmelding_source.html`s `lastSpillere()` bruger nu `json.herrer`/`json.damer` (med fallback til
  `json.players` hvis en backend ikke leverer kønsopdelte lister — bagudkompatibelt).
- `build3.py`s mock leverer nu `PLAYERS_2627_HERRER` (27 spillere) og `PLAYERS_2627_DAMER` (16 spillere)
  i stedet for én fælles liste.
- **Køn udledt af rigtig kampdata:** Zakobo-filen har ingen kønskolonne, så køn er udledt ved at matche
  alle 43 navne mod 24/25+25/26 Resultater — HS/DS/HD/DD-kategorierne fortæller entydigt hvilket køn en
  spiller er, og MD (mixed double)-parringer er løst ved iterativ udelukkelse ift. allerede kendte køn.
  36 af 43 er bekræftet på denne måde. Undervejs krydstjekket mod
  `data/navne-alias.json` (Zakobo bruger fulde navne, Resultater ofte kortere/andre
  stavemåder) — fandt en hidtil udokumenteret variant af samme mønster: "Rasmus Holmlykke Andersen"
  (Zakobo) = "Rasmus Holmslykke Andersen" (Resultater), nu tilføjet til alias-filen.
- **7 spillere havde INGEN kamphistorik** (nye for 26/27) og blev derfor gættet ud fra dansk/skandinavisk
  navnekonvention: Andreas Drasbek (M), Camilla Bagge (K), Louis Toftlund (M), Michelle Liljengren (K,
  kendt fra tidligere sæsoner uden kampe), Sverre Stütz (M), Sylvester Østberg (M), Theodor Lumby (M).
  **Chris har 2026-08-31 bekræftet at alle 7 gæt er korrekte** — opdateret i `koen_2627_udledt` i
  `data/navne-alias.json`. Alle 43 spilleres køn er dermed nu bekræftet, ingen usikre gæt tilbage.
- Rebuildet og genpubliceret previewet igen.

**Ikke rørt:** den rigtige `tilmelding.html`/`spillere.js` i `apps/netlify-prod/`, det rigtige 26/27 Google
Sheet, ingen Netlify-deploy. **Bemærk:** den rigtige produktionsside har samme underliggende svaghed
(ingen kønsopdeling) som blev fundet i previewet — den er blot ikke synlig endnu fordi 26/27's
`Spillerpoint`-ark er tomt. Skal rettes i den rigtige `spillere.js`/`tilmelding.html` før 26/27-sæsonen
går live, men kræver en beslutning om hvor kønsdata skal ligge permanent (Zakobo-eksporten har det ikke,
og fremtidige nye spillere uden kamphistorik kan ikke udledes automatisk — kræver enten en manuel
kønskolonne et sted, eller at trænerne/tilmeldingsansvarlig bekræfter manuelt ved import af en ny sæson).

**OPDATERING 2026-09-04 — dette er nu faktisk shippet til produktion:** se `docs/historik/driftlog.md`,
"Niende runde", punkt 4/5 — den rigtige `spillere.js`/`tilmelding.html`/`tilmeld.js` har nu kønsopdelte
dropdowns (med den hardkodede 26/27-seniortrup som bundliste, sammenflettet med `Spillerpoint`) og
betalt/gratis-valg. Verificeret direkte mod de rigtige produktionsfiler 2026-09-04, se driftloggens
"Tolvte runde".

**Kendt begrænsning, ikke løst her:** hvis flere spillere tilmelder sig efter Zakobo-eksporten blev taget, eller nogen falder fra, er spillerlisten en snapshot og skal genopfriskes manuelt (ny eksport → opdater den hardkodede liste i `spillere.js` → deploy). Ingen automatisk synk mellem Zakobo og koden.

## Navigations-/informationsarkitektur: tre lag + app-landing — SHIPPET TIL PRODUKTION

Bygget først i Claude-previewet (tre-lags nav: app-vælger → sider inden for app → faner inden for side,
plus en ny landing-side), derefter shippet til de rigtige `apps/netlify-prod/`-filer 2026-09-03 som ét
fælles `gsb-nav.js`-script (samme mønster som `seasons.js`) — se `docs/historik/driftlog.md`, afsnittet
"Nav/IA-omlægning shippet til produktion", for den fulde byggehistorik og teknisk begrundelse.

Status: **shippet og verificeret live.** Ingen åben del af denne feature-idé tilbage — kun mindre,
usammenhængende to-dos (fx ubrugt `nav.sitenav`-CSS i `senior-ungdom-tilmelding.html`, nævnt i
driftloggen som harmløst).

## Søndagstræningstilmelding — NY APP, BYGGET I PREVIEW, IKKE SHIPPET

Chris bad om at tilføje en tredje, separat app (adskilt fra GSB Dream Team og Ungdomssparring): en
tilmeldings-/afbudsside til søndagstræning, en lukket træning for en udvalgt gruppe spillere. Der findes
allerede en Messenger-gruppechat til koordinering, men Chris ville gerne have en bedre måde at melde
afbud og se hvem der kommer end at holde styr på det i en chattråd.

**Aftalt mekanik:** et simpelt "denne uges hold"-view — fast liste over spillerne, hver kan sætte sig selv
til "Kommer"/"Afbud" (+valgfri kommentar ved afbud) for kommende søndag, og alle med adgang kan se den
aktuelle status for alle. Minder om `tilmelding.html`-mønsteret, men uge-baseret i stedet for
sæson-baseret, og uden dropdown-valg af andre spilleres navn (kun sit eget).

**Adgangsstyring — den del vi brugte mest tid på at afklare:** Chris ville ikke have et kodeord på selve
Søndagstræning-linket (det skal kunne linkes til udefra, fx i Messenger-gruppen), men spurgte om
"Admin"-idéen kunne udvides til en mere generel beskyttet-adgang-mekanisme, hvor et kodeord låser op for
adgang til bestemte undersider. Det er sådan det er bygget:
- Der findes nu én genbrugelig "gate"-komponent i preview-shell'en, som virker for BÅDE Søndagstræning og
  den eksisterende Admin/data-indskrivningsside. Klikker man på en låst app/side i navigationen, vises et
  kodeord-overlay før indholdet vises; er man først låst op, forbliver man låst op resten af
  preview-sessionen.
- Der bruges to SEPARATE demo-kodeord i previewet (`admin2026` til Admin, `sondag2026` til Søndagstræning
  — vises direkte i overlay'et, så det er nemt at teste) — bevidst valg, fordi Admin (kun Chris) og
  Søndagstræning (den udvalgte gruppe) reelt er to forskellige tillidsgrupper, og samme kode ville give
  den ene gruppe adgang til den andens område. Nemt at lave om til ét fælles kodeord senere, hvis Chris
  hellere vil det.
- **Vigtig begrænsning at huske til en rigtig implementering:** gaten i previewet er ren klient-side
  (JavaScript-tjek i browseren) — det er fint til at holde tilfældige forbipasserende ude (samme
  sikkerhedsniveau som resten af sitet har i dag), men er IKKE reel beskyttelse af selve dataen, da
  kildekoden altid kan læses. Hvis Søndagstræning på et tidspunkt får en rigtig backend (Netlify-funktion
  + Google Sheets-faneblad, som resten af sitet), bør selve skrive/læse-kaldet også tjekke kodeordet
  server-side — præcis det mønster `hent-resultater.js` allerede bruger med `ADMIN_PASSWORD`.

**Indhold i previewet lige nu:**
- Beregner automatisk "kommende søndag" (næste søndags dato) ud fra dags dato.
- 8 eksempelspillere (tydeligt mærket som eksempeldata, ikke rigtige medlemmer) med Kommer/Afbud-knapper.
- Opsummeringslinje øverst: antal Kommer / Afbud / Ikke svaret endnu.
- Status gemmes kun i browser-fanen (nulstilles ved genindlæsning) — ingen rigtig data-lagring endnu.

**Åbne spørgsmål til en rigtig version (ikke besluttet, ikke blokerende for previewet):**
- Hvor skal den rigtige spillerliste komme fra? Manuel liste i et Google Sheets-faneblad (nemmest, matcher
  resten af sitets arkitektur) vs. noget der forsøger at genbruge eksisterende Spillerpoint-data.
- Skal der være historik (hvem plejer at melde afbud), eller er "kun denne uge" nok? Previewet viser kun
  denne uge.
- Skal kodeordet være det samme for alle i gruppen, eller navngivet pr. person? Previewet antager ét
  fælles gruppekodeord (enklest, matcher at det er én lille, kendt gruppe).

**OPDATERING 2026-09-03 (ottende runde) — bekræftet stadig ikke en del af den rigtige produktions-nav:**
da nav/IA-omlægningen blev shippet til de rigtige filer, er Søndagstræning bevidst UDELADT fra den
rigtige nav-bar, fordi appen slet ikke findes i produktion endnu (kun preview-eksempeldata). Skal
tilføjes til `gsb-nav.js`s `APPS`-liste den dag den rigtige backend/side bygges. Chris har nævnt
(2026-09-03) at han på et tidspunkt vil have den færdiggjort med en rigtig spillerliste og backend — ikke
et "byg det"-signal, kun en fremtidig prioritet.

Status: **bygget og publiceret i Claude-previewet**, ren eksempeldata. Intet rørt i
produktionens Netlify-filer.

## Kampkalender-widget: kommende + afsluttede kampe, forskelligt hold-scope til Dream Team vs. Statistik — LANDET SOM B1

Idé rejst af Chris: en kalendervisning der viser både kommende og allerede spillede holdkampe, med
resultat på de spillede. Scope, datakilder (`calendarEvents` til kommende, klub-ID-kæden til afsluttede
— se `docs/nembadminton-api.md`) og ydelsesdesign (ugentlig scheduled-function-sync frem for on-demand)
er fuldt afklaret og flyttet til **B1** i `docs/planlagte-features-spec.md`. Aflysningshåndtering
(tidligere blokerende A1) er afklaret 2026-09-03: Chris besluttede at ignorere aflyste kampe helt, ikke
bygge særskilt detektions-/sletningslogik — B1 er dermed teknisk klar til byg-signal, men intet er
kodet endnu.

Direkte relateret til `docs/idebank-statistik.md`s B3-afsnit — den foreslåede `AlleResultater`-fane
kan meget vel blive samme datakilde som denne kalenders ugentlige past-match-sync.

Status: **AFKLARET, landet som B1** — se spec-filen for det aktuelle design. Intet bygget/deployet.

## GSB Dream Team — Betalt vs. Gratis-tilmelding + MobilePay-betaling — LANDET SOM B5, SHIPPET

UI'et blev først bygget i previewet, det fulde tekniske design blev aftalt som B5 i
`docs/planlagte-features-spec.md`, og hele B5 er nu shippet til produktion (niende og tiende
runde, se `docs/historik/driftlog.md`) — verificeret direkte mod de rigtige filer 2026-09-04
("Tolvte runde" i driftloggen). Kort status her for at undgå duplikering.

## GSB Dream Team — "Honorable mentions" for høj-scorende gratis-deltagere — LANDET SOM DEL AF B5, SHIPPET

Inklusionsreglen (alle gratis-deltagere hvis pointtotal ville placere dem i sæsonens samlede top 5 vises
i en "Honorable mentions"-sektion) er bygget og shippet sammen med resten af B5 — se
`docs/historik/driftlog.md`, "Tiende runde", for byggedetaljerne.

## GSB Dream Team forside — rækkefølge/prioritering af sider (opdatering 2026-08-31)

Se det tidligere afsnit "Navigations-/informationsarkitektur" for baggrunden om selve tre-lags
nav-strukturen. Chris har nu bekræftet at Tilmelding skal rykkes væk fra førstepladsen i Dream
Team-appens side-rækkefølge (lag 2, mellem-niveauet) — begrundelse: spillerlisten forventes i
dag, men runde 1 starter allerede torsdag, så tilmeldingsperioden bliver kort og overlapper
formentlig med selve runde 1's spilleperiode, hvilket gør det mindre oplagt at have Tilmelding
som det første man ser lige nu.

**Afgrænsning bekræftet:** ændringen skal KUN laves i Claude-previewet for nu, ikke i
produktionens Netlify-filer — Chris flytter evt. selv den rigtige side, når han er klar.

Foreslået ny rækkefølge (Claude-forslag, umiddelbart godkendt af Chris som "en god rækkefølge"):
Historisk stilling → Statistik → Tilmelding → Admin.

**VIGTIGT — TIMING, IKKE BYG ENDNU (2026-08-31):** Chris har eksplicit bedt om at vente — "det
lyder som en god rækkefølge, men ikke endnu. Lad mig sige til når tilmelding ikke skal være
først." Rækkefølgen er altså principielt godkendt, men skal IKKE ændres i previewet før Chris
selv giver et nyt, separat signal om at tilmeldingsperioden er slut/tæt på slut.

Status: rækkefølge og placering (kun preview) aftalt i princippet — afventer Chris' konkrete
"nu skal den ændres"-signal, endnu ikke bygget. **Bemærk:** dette handler om SIDE-rækkefølgen
inden for Dream Team-appen (undersiderne i `gsb-nav.js`s `pages`-liste), ikke om selve app-nav'en
der blev shippet 2026-09-03 — den ændring er separat og allerede lavet.
