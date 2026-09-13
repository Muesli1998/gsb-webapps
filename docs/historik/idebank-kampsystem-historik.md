# GSB Dream Team – Kampsystem/ELO idébank — HISTORIK (2026-08-31 til 2026-09-05, ottende bug-runde)

Arkiveret 2026-09-06 fra `claude/gsb-kampsystem-idebank.md` for at holde hovedfilen under kontrol
(hovedfilen var vokset til ca. 68.000 tegn / ~9.800 ord, langt over START-HER.md's ~1.500-ords
tommelfingerregel for hvornår en fil skal splittes/have ekstra pasning). Indholdet her er UÆNDRET i
forhold til originalen — kun flyttet til denne fil, ingen omskrivning eller sammenfatning.

Denne fil dækker den lukkede/superserede del af Kampsystem-udviklingen: fra B4-prototypens første
scoping (2026-08-31) frem til og med bug-rapporten "40 spillere + 10 baner gav 14 oversiddere i
stedet for 0", hvis løsning Chris eksplicit afviste ("uha nej") og som blev erstattet af en helt ny
tilgang i det følgende afsnit. Se `claude/gsb-kampsystem-idebank.md` for den fortsat aktive tråd
(fra "OPDATERING 2026-09-05 (fjerde runde)" og frem) samt for status/tilbageværende punkter.

## ELO-rating + automatisk rundefordeling til træning — DELVIST LANDET SOM B4 (2026-08-31)

**OPDATERING 2026-08-31: rammerne, ratingsystemet, ELO-formlen, rundefordelings-algoritmen,
datamodellen, placeringen og minimumsscopet for trænings-skabeloner er nu lagt fast og flyttet
til `claude/gsb-planlagte-features-spec.md` som B4.** B4 er blokeret af to nye DEL A-punkter
(A2: BD-kategoripoints friskhed + kønsskævhed; A3: cheftrænerens fulde skabelon-liste) før det
er helt klar til byg-signal, men resten af designet er aftalt. Se spec-filen for det aktuelle,
konkrete design. Afsnittet her nedenfor bevares som historik for selve idé-/scoping-diskussionen.

**OPDATERING 2026-08-31 (samme dag) — første fungerende prototype BYGGET I PREVIEW:** Chris bad
om at få kampsystemet ind som en 4. hovedkategori på webappen NU, testet KUN med senior + nogle
veteran-spillere (ungdom ikke med denne omgang). Sidestiller A3 for nu (A3 handler specifikt om
trænings-SKABELONER, ikke selve algoritmen/datamodellen — prototypen bruger ad hoc-fremmøde uden
skabeloner, så den er ikke blokeret af A3).

**Ny side `kampsystem.html`, egen top-level app i navigationen (⚡ Kampsystem):**
- Spillertrup: de 43 rigtige 26/27-seniorer (samme liste som tilmeldingens) + 8 OPDIGTEDE
  veteran-eksempelnavne (tydeligt mærket "(eksempel)" — vi har ingen rigtig veteranliste endnu).
  Ratings (single + double pr. spiller) er faste, deterministisk genererede eksempeltal, IKKE
  hentet fra Badminton Danmarks rangliste — det er stadig næste skridt (kræver `memberStats`-kald
  pr. spiller, se B4's seeding-kilde-afsnit).
- Fremmøde: flueben pr. spiller + valg af single/double for aftenen, med søgefilter.
- Opsætning: antal ledige baner, og hold-filosofi for double (ens niveau som makker / stærk+svag
  som makker for jævnbyrdige hold — begge understøttet, som aftalt i B4).
- Manuel override: træneren kan låse en specifik kamp (single eller double) før generering — de
  spillere holdes uden for den automatiske fordeling.
- "Generér runde": parrer resten efter rating inden for disciplin, bygger double-hold efter valgt
  filosofi, sorterer hold efter styrke og matcher naboer, fordeler på ledige baner (resten vises
  som "venter på bane"), og markerer hvem der sidder over. Simpel gentagelses-undgåelse ift.
  SENESTE runde (ikke hele historikken endnu — forenklet for prototypen).
- Viser forventet vind-% pr. kamp (Elo-formlen). Træner registrerer vinder pr. kamp → ratings
  opdateres med det samme (K=32), synligt i spillertrup-tabellen nederst.
- "Nulstil eksempeldata"-knap til at teste om og om igen uden at genindlæse hele siden.

**Bevidst simplificeret/ikke bygget endnu (kendte begrænsninger i denne første prototype):**
- Ingen rigtig BD-rangliste-seeding af ratings — rene eksempeltal.
- Ingen rigtig Google Sheets-backend (`ELO_Spillere`/`ELO_Kampe`/osv. fra B4's datamodel) —
  ratings nulstilles ved genindlæsning, ligesom Søndagstræning.
- Gentagelses-undgåelse kigger kun på seneste runde, ikke hele kamphistorikken.
- Ungdom er slet ikke med — kun senior + eksempel-veteraner, som Chris bad om.
- Ingen adgangsbeskyttelse (kode) på appen endnu — åben som Dream Team/Ungdomssparring, ikke
  gated som Søndagstræning. Ikke besluttet om det skal være det.

Status: **første fungerende prototype bygget og publiceret i Claude-previewet 2026-08-31.** Intet
rørt i de rigtige Dropbox/Netlify-filer. Resten af B4 (rigtig Sheets-datamodel, BD-seeding, fuld
historik-baseret gentagelses-undgåelse, trænings-skabeloner) afventer stadig A3 + videre bygning.

**OPDATERING 2026-08-31 (samme dag) — tre udvidelser bygget i preview, samme session:**
- **"Vælg alle til stede" / "Fjern alle"-knapper** over spillerlisten — hurtigere end at skulle
  klikke hver enkelt, som Chris efterspurgte.
- **Mixed double som tredje spilletype** (ud over single/double) — spillere der er specialiserede
  i mix kan nu vælges til "Mix" for aftenen. Fik desuden sin egen ratingdimension (`mix`), for nu
  beregnet som gennemsnit af single+double-eksempeltal (samme forenkling som resten af
  eksempeldataen — den rigtige BD `memberStats`-kilde har et ægte separat mix-felt, se B4).
- **Fleksibel manuel kamp-fastsættelse:** lås/fastsæt-panelet er redesignet så ALLE fire
  spiller-felter (a1/a2/b1/b2) kan stå på "– auto –" i stedet for at kræve alle fire navngivet.
  Det gør præcis det Chris bad om — man kan fastsætte KUN makkerparret (fx "Christoffer + Anja
  spiller mix sammen") og lade systemet finde en jævnbyrdig modstander automatisk, eller navngive
  én spiller på modstander-siden (fx "mod Morten Aarøe") og lade resten (Mortens makker) blive
  fyldt automatisk. Testet og verificeret med begge eksempler fra Chris' besked — begge gav
  korrekt resultat.
- **Kamplog + H2H-opslag (nyt):** hver registreret kamp logges nu (runde, type, deltagere,
  vinder). Ny sektion 5 lader træneren vælge to spillere og se deres indbyrdes rekord — tæller
  ALLE kampe hvor de to har stået på hver sin side, uanset hvem makkeren var i double/mix (præcis
  som Chris bad om: "ligegyldigt hvem makkeren er"). Der er også en simpel kronologisk kamplog
  under H2H-kortet til reference. Nulstilles ved genindlæsning/nulstil-knappen, som resten af
  prototypens data.
- Fandt og rettede undervejs en reel bug i den første version: spilleren der blev til overs ved
  selve hold-DANNELSEN (før modstander-matchning) blev droppet i stedet for at havne i
  "sidder over"-listen — rettet og verificeret med en automatiseret test før publicering.

**OPDATERING 2026-09-01 — fire fremtidige forbedringer logget, INGEN build denne omgang:** Chris bad
eksplicit om kun at få dette logget til senere ("Ingen aktuelle ændringer, bare log til fremtiden").

- **Søg/tilføj spiller til træningslisten, tre varianter:**
  1. **Midlertidig gæst** (fx en spiller på besøg fra en anden klub) — tilføjes kun for denne ene
     træning/runde, og trækkes ud igen bagefter (herunder at deres rating-påvirkning på de faste
     spillere formentlig skal kunne "trækkes tilbage"/ignoreres, ikke stå som en permanent del af
     nogens kamphistorik/rating-udvikling — præcis mekanik ikke udtænkt endnu).
  2. **Permanent tilføjelse fra databasen** — en spiller der findes i det fulde spillerkartotek, men
     ikke er en del af den faste træningsskabelon, tilføjes fast til fremtidige træninger.
  3. **Engangstræk fra databasen** — samme kilde som (2), men kun for denne ene trænings/runde, uden at
     ændre den faste skabelon.
  Kræver en søgefunktion (nok et tekstfelt med auto-complete/filter) ovenpå den faste fremmødeliste.
  Hænger sammen med `ELO_Traeningsskabeloner`-idéen ovenfor (fast spillerliste pr. skabelon) — dette er
  reelt undtagelses-mekanismen til den faste liste.
- **"Denne runde" i stedet for "I aften", + valgfri kategorier:** terminologien i UI'et skal ændres fra
  aften-baseret til runde-baseret (mere præcist, en aften kan have flere runder, og "denne runde" passer
  bedre til flowet). Samtidig skal man kunne vælge om en runde spiller 1, 2 eller alle 3 kategorier
  (single/double/mix) — alle 3 som standard, med mulighed for at fjerne de kategorier der ikke skal
  spilles den pågældende runde (fx en aften hvor der kun spilles double).
- **Ny sekundær fane "Statistik" under Kampsystem** (Kampsystem topniveau → Runder / Statistik,
  potentielt kun synlig for trænere — samme gate-mekanisme som Admin/Søndagstræning kunne genbruges).
  Første konkrete idé til indholdet: en **"forventet styrkerækkefølge"**-oversigt der løbende opdateres
  i takt med at spillerratings ændrer sig. Formålet: en spiller der ikke spiller mange turneringer (og
  derfor har et forældet/lavt BD-rangliste-tal), men konsekvent slår spillere med højere rating i
  Kampsystemets egne kampe, bør kunne "afsløres" af trænerne — fx via en rød/grøn markering ud for
  spillere der har byttet plads i styrkerækkefølgen (rykket op = grøn, rykket ned = rød, sammenlignet med
  en tidligere rækkefølge/snapshot). Skal kunne sorteres/filtreres på køn og kategori (single/double/mix),
  netop fordi mixdamer typisk ligger med lavere point end herrer i rå tal (samme kønsskævheds-problem som
  allerede noteret i B4's seeding-diskussion ovenfor) — en ufiltreret fælles liste ville derfor være
  misvisende.
- **Adgang til at redigere data — "admin"-knap overvejet:** grunddesignet er stadig at ALT ligger i et
  Google Sheet, som Chris/trænerne kan redigere direkte i manuelt (samme mønster som resten af GSB
  Dream Team). Men det skal logges at der måske skal være en "admin"-knap i selve UI'et til at redigere
  udvalgte ting derinde fra — nævnt konkret i sammenhæng med permanent tilføjelse af en spiller (punkt
  2 ovenfor), men formentlig relevant bredere efterhånden som Kampsystem får mere redigerbar data
  (skabeloner, spillerkartotek osv.). Ikke afgrænset i detalje endnu — hvilke felter, hvem har adgang,
  om det er samme gate som den eksisterende Admin-app eller en ny.

Status: **ren idé-logning, ingen build.** Ingen af de fire punkter er udtænkt i teknisk detalje endnu,
og intet er rørt i previewet eller de rigtige filer.

**OPDATERING 2026-09-02 — femte punkt tilføjet, udskudt eksplicit:**
- **ELO-udvikling over tid pr. spiller:** en graf/visning af hvordan en spillers rating har bevæget
  sig hen over sæsonen. Kræver INGEN ekstra Sheets-kolonner eller nyt faneblad — `ELO_Kampe`-loggen
  indeholder allerede alt der skal til (tidsstempel, type, deltagere, vinder, rating-ændring), så en
  spillers fulde historik kan udregnes ved at "spole" gennem deres kampe i kronologisk rækkefølge fra
  deres BD-seedede startværdi. Foretrukket frem for periodiske snapshots, fordi der kun er ét sted
  data kan afvige fra sig selv (selve kamploggen). Hører naturligt sammen med den allerede loggede
  "Statistik"-underfane-idé til Kampsystem (forventet styrkerækkefølge m.m. — se ovenfor). Eksplicit
  udskudt af Chris 2026-09-02 ("læg den ind som fremtidig feature") til fordel for at få selve
  rundefordelingen live med rigtig rating først.

**OPDATERING 2026-09-02 (samme dag, anden runde) — BD-rating-seeding stort set færdig:** Chris
sendte 5 screenshots fra badmintonplayer.dk's ranglister (single/double/mix) plus to
spillerprofiler, og rettede med det de sidste uafklarede punkter fra første seedings-runde:
Michelle Liljengren hedder nu Michelle Christensen (samme BadmintonID/refId 930609-21, bekræftet
via opslag blandt 3 "Christensen"-kandidater), og de 4 SUT-ungdomspiger (Emilie, Katia, Qingyi,
Guanyan) er nu seedet direkte fra screenshottene i stedet for at mangle helt. Chris' regel for de
fortsat genuint manglende felter: "Hvis de ikke har spillet single, så giv dem ikke en værdi lige
pt" — dvs. `null` i stedet for et opdigtet placeholder-tal, indtil en rigtig værdi findes. Samme
princip for mix: "Hvis de ikke har spillet mix, men har double point, så giv dem de samme i mix"
— `mix` er derfor blevet et rigtigt gemt felt (rigtig værdi, ellers double som fallback, ellers
null), ikke længere et klient-beregnet gennemsnit. `kampsystem_source.html` er opdateret til at
vise "–" for null-felter, deaktivere den manglende disciplin i "I aften"-vælgeren, og advare hvis
en fremmødt spiller mangler rating til sin valgte disciplin. Resterende genuint manglende data:
Andreas Drasbek og August Carl Toftager-Larsen (alle tre felter null), samt 6 seniorkvinder der
kun mangler SINGLE (Camilla Bagge, Christian Staal, Kenneth Hasselby, Lene Sørensen, Line
Nielsen, Signe Aarøe Jørgensen). Se `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` for detaljer. Elo-formlens
K-faktor/divisor-genkalibrering er stadig kun noteret, ikke implementeret (se spec-filens B4-afsnit).

**OPDATERING 2026-09-01 — ungdomstrup (SUT) tilføjet som ny gruppe i Kampsystem, BYGGET I PREVIEW:**
Chris uploadede `SUT 2627.xlsx` (21 navne, ét regneark uden rating/point-data — kun en 0/1-kolonne der
blev vurderet irrelevant og ignoreret) og bad om at få ungdom med i Kampsystem som en anden gruppe end
den eksisterende senior/veteran-trup.

- **Ny gruppevælger i UI'et:** roster-sektionen har nu en "Gruppe"-dropdown (Alle grupper / Senior /
  Veteran (eksempel) / SUT Ungdom (eksempel)). Vælges en enkelt gruppe, gælder det både visningen,
  "Vælg alle til stede"/"Fjern alle", lås-dropdownsne OG selve `genererRunde()` — spillere fra andre
  grupper blandes ikke ind, heller ikke selvom de tidligere er markeret til stede (filtreringen er
  aktiv i selve rundegenereringen, ikke kun i visningen).
- **18 nye SUT-ungdomsspillere** tilføjet til `KAMPSYSTEM_ROSTER` i `build3.py`, med samme
  deterministiske eksempel-rating-metode som senior/veteran-eksemplet (ingen rigtig BD-data for
  ungdom endnu).
- **Vigtigt fund undervejs — 3 navne gik igen på tværs af SUT-filen og den eksisterende 26/27
  senior-liste:** "Rosa Hinge Carlsson" og "Sylvester Østberg" er eksakte navnematch, og "Louis
  Valdemar Hedegaard Toftlund" matcher Senior-listens "Louis Toftlund" (samme for-/efternavn, ekstra
  mellemnavne). **BEKRÆFTET af Chris 2026-09-01:** "Det er de samme spillere, der er lidt overlap
  mellem de bedste ungdomsspillere og senior." **Disse 3 er derfor bevidst UDELADT fra den nye
  SUT-gruppe** (beholder kun deres eksisterende Senior-rating) for at undgå navnekollisioner i
  rundefordelingens spiller-opslag (`byNavn()` slår op på navn, ikke et unikt ID — to spillere med
  samme navn i to grupper ville give uforudsigelige/forkerte kamp-låsninger). Bekræftelsen er logget
  i `GSB_NAVNE_ALIAS_OG_ANOMALIER.json`, sektionen `alias_2627_senior_vs_sut_ungdom`.
- Header-teksten på Kampsystem-siden er opdateret (fjernet "ungdom er ikke med endnu").
- Rebuildet og genpubliceret Claude-previewet, samt synkroniseret `build3.py` og
  `kampsystem_source.html` til Dropbox-kildemappen (kun kildefilerne til selve preview-builden — ikke
  rørt i `netlify-tool-prod` eller de rigtige Google Sheets).

**Ikke løst/afklaret endnu:**
- Kun 18 af de 21 SUT-navne er reelt tilføjet (3 udeladt pga. bekræftet navnekollision, se ovenfor) —
  dette er nu et bevidst, endeligt valg (ikke en åben antagelse), da Chris har bekræftet at det er
  samme 3 personer.
- Ingen rigtig kobling til et Google Sheet med den faktiske SUT-spillerliste — ren eksempeldata som
  resten af Kampsystem-prototypen, nulstilles ved genindlæsning.
- Gruppevælgeren er kun bygget til at ADSKILLE grupper under rundefordeling — der er ingen mekanisme
  endnu til at lade to grupper spille MOD hinanden bevidst (fx en øvet ungdomsspiller mod en senior),
  hvis det på et tidspunkt bliver ønsket.

**OPDATERING 2026-09-03 (tredje runde) — navnekollisions-spørgsmålet lukket, ingen kodeændring:**
Chris bad om at få dette "punkt" færdiggjort. Ved gennemgang af `GSB_NAVNE_ALIAS_OG_ANOMALIER.json`
viste det sig at spørgsmålet reelt allerede var besvaret — Chris bekræftede selv de 3
navnekollisioner (Rosa Hinge Carlsson, Sylvester Østberg, Louis Toftlund/Louis Valdemar Hedegaard
Toftlund) den 2026-09-01, kort efter SUT-gruppen blev bygget, men idébank-teksten var ikke blevet
opdateret til at afspejle det og fremstod stadig som et åbent spørgsmål. Rettet ovenfor: teksten
markerer nu korrekt at bekræftelsen allerede foreligger, og "Ikke løst/afklaret endnu"-listen er
rettet til at afspejle at udeladelsen af de 3 spillere fra SUT-gruppen er et bevidst, endeligt valg —
ikke en åben antagelse. Ingen kode eller data er ændret, kun dokumentationen bragt i overensstemmelse
med den allerede givne bekræftelse.

**OPDATERING 2026-09-03 (fjerde runde) — ny "Ungsenior"-gruppe + gruppe-filter lavet om til
checkbokse, BYGGET I PREVIEW:** Opfølgning på ovenstående navnekollisions-afklaring. Chris' pointe:
"det er lidt dumt at skulle have senior gruppen tilvalgt når man bare skal have en ungdomstræning
hvor de tilfældigvis er med" — de 3 bekræftede overlap-spillere (Rosa Hinge Carlsson, Sylvester
Østberg, Louis Toftlund) sad fast under "Senior", så en ren ungdomstræning krævede at hele
Senior-gruppen (alle voksne) blev valgt med bare for at få dem tre. Chris spurgte om rådgivning, og
pegede selv på løsningen: en tredje klassifikation de kan flyttes til, plus at gruppe-filteret bør
være checkbokse i stedet for en enkelt-valgs-dropdown, så man selv kan sammensætte grupper.

- **Ny gruppe "Ungsenior"** i `KAMPSYSTEM_ROSTER` (`build3.py`) — de 3 spillere er flyttet fra
  `"gruppe": "Senior"` til `"gruppe": "Ungsenior"` (uændrede ratings). Gruppen er bevidst ikke en
  synkroniseret ekstern liste, ligesom Veteran — Chris flytter selv spillere ind/ud efter behov
  (fx når en ungdomsspiller "bliver god nok" til at rykke op i løbet af sæsonen, som han nævnte som
  det langsigtede behov). Indtil Fase 1's Sheets-backend er koblet på for alvor gøres det ved at
  redigere `gruppe`-feltet i `build3.py` (én linje pr. spiller, kræver ny build+publish); bagefter
  bliver det en almindelig celleredigering i Sheetet.
- **Gruppe-filteret i punkt 1 er lavet om fra én dropdown til checkbokse** (`kampsystem_source.html`)
  — coach kan nu frit vælge en hvilken som helst kombination af grupper (fx kun "SuperUng Teen" +
  "Ungsenior" til en ren ungdomstræning, eller "Senior" + "Ungsenior" til en seniortræning), i stedet
  for kun at kunne vise "Alle grupper" eller præcis én. Alle grupper er checket som udgangspunkt
  (samme adfærd som den gamle "Alle grupper"-default), og en helt NY gruppe (fx hvis Chris opretter
  en spiller i "Veteran" for første gang) bliver automatisk vist/checket, indtil man selv fravælger
  den. "Vælg alle til stede"/"Fjern alle" og selve rundegenereringen bruger de samme checkede grupper.
- Verificeret med et jsdom-testscript: alle grupper (inkl. "Ungsenior") vises som checkbokse,
  fravalg af "Senior" skjuler kun Senior-sektionen (Ungsenior og SuperUng Teen forbliver synlige og
  fremmøde-markerbare), gen-tilvalg viser Senior igen, og "Ungsenior" tilbydes korrekt i den delte
  "Tilføj til gruppe"-vælger fra punkt 0. Diffet mod den tidligere live-artifact-version bekræftede
  at kun Kampsystem-siden ændrede sig. Publiceret til samme Artifact-URL.
- **IKKE synkroniseret til Dropbox-kildemappen endnu** — Chris arbejder midlertidigt fra en anden
  PC uden linket enhed denne omgang, så `build3.py`/`kampsystem_source.html` er kun opdateret i
  denne clouds arbejdsmappe og i selve Claude-previewet (som ikke kræver Dropbox-adgang). Filerne
  skal sendes/kopieres til `D:\Dropbox\gsb-claude-preview-kilde\` næste gang sessionen er linket
  til Chris' faste computer, ellers er de midlertidigt "foran" den lokale Dropbox-kopi.

**OPDATERING 2026-09-03 (femte runde) — "Motionist" tilføjet som endnu en tilføjelig gruppe,
BYGGET I PREVIEW:** Chris spurgte hvor nemt det ville være at tilføje "Motionist" og "Veteran" som
grupper. Svaret var at Veteran allerede findes som en "altid tilgængelig, tom" gruppe (bygget
tidligere samme dag), og at Motionist kunne tilføjes på nøjagtig samme måde — Chris bekræftede at
det er præcis det han ville have: "Alle spillerne burde være skrevet ind som søgbare navne, så jeg
vil egentlig bare have motionist og veteran på som 2 grupper ligesom de andre." Ingen forudfyldt
kilde-liste nødvendig, da hele klublisten (382 medlemmer, `GSB_ALLE_SPILLERE`) allerede er søgbar
via det eksisterende søgesystem. Tilføjet en ny `MOTIONIST_GRUPPE = 'Motionist'`-konstant i
`kampsystem_source.html`, sat op på præcis samme måde som `VETERAN_GRUPPE` — vises altid som
mulighed i den delte "Tilføj til gruppe"-vælger i punkt 0, uanset om nogen allerede er i gruppen.
Chris bygger den op efter behov via søgning eller manuel oprettelse, ligesom Veteran. Verificeret
med jsdom: "Motionist" tilbydes i vælgeren, og efter at have tilføjet en testspiller til gruppen
dukker den korrekt op som ny checkboks i gruppe-filteret i punkt 1 (og som checket som
udgangspunkt). Diffet mod forrige live-artifact-version (kun Kampsystem ændret), publiceret til
samme Artifact-URL. Fortsat ikke synkroniseret til Dropbox — se punktet ovenfor.

**OPDATERING 2026-09-03 (sjette runde) — forberedelse til "byg det" af en rigtig Netlify-version af
Kampsystem, delvist gennemført (kun det der IKKE krævede Chris' bekræftelse eller enhedsadgang):**
Chris: "Du må gerne lave en netlify LIVE version, men jeg kan ikke sidde ved PC'en de næste par
timer. Så du skal helst kun lave det arbejde du kan uden bekræftelse fra mig (dvs. hvis du skal
bruge adgang til et nyt sheet, så springer du det bare over for nu)." Chris arbejdede desuden fra
en anden PC uden linket enhed på dette tidspunkt (bekræftet ved at `get_device_info` fejlede med
"device not connected"), hvilket lægger et ekstra, teknisk (ikke kun høflighedsmæssigt) loft over
hvor meget der reelt kunne færdiggøres:

- **Gjort uden at afvente Chris:**
  1. Rettet de to Sheets-fejlbesked-tekster i `kampsystem_source.html` (`hentFraSheets`/
     `gemTilSheets`), som tidligere antog konteksten altid var Claude-previewet ("forventet i
     Claude-previewet"). Nu neutrale, så de er retvisende BÅDE i previewet og på den rigtige side
     før regnearket er oprettet/delt (fejlen rammer begge steder lige nu, af to forskellige
     grunde — previewet kører på et andet domæne end funktionerne, den rigtige side mangler
     stadig selve regnearket).
  2. Bygget en ren, produktionsklar `kampsystem.html` — samme kildefil som previewet
     (`kampsystem_source.html`) med kun de to data-indsprøjtninger (roster + fuld klubliste), UDEN
     de to preview-specifikke tilføjelser build3.py ellers lægger på (nav-besked-scriptet der
     `postMessage`'r til preview-shell'ens forældre-vindue — ville gøre alle interne links
     virkningsløse på den rigtige side, som ikke har den shell — samt PREVIEW-bannerét). Verificeret
     med et jsdom-testscript kørt mod en simuleret rigtig-side-URL (ikke artifact-domænet): ingen
     PREVIEW-tekst eller nav-besked-script tilbage, alle grupper (inkl. Ungsenior/Motionist/Veteran)
     og hele rundegenererings-flowet virker uændret.
  3. Genlæst og sundhedstjekket de to allerede skrevne Netlify-funktioner
     (`netlify/functions/elo-hent.js`/`elo-gem.js`, oprindeligt skrevet 2026-09-02) — ingen fejl
     fundet, klar til brug som de er.
  4. Sendt alle tre filer (`kampsystem.html`, `elo-hent.js`, `elo-gem.js`) til Chris som download,
     så de ligger klar uanset hvornår han er tilbage ved sin computer.
  5. Rebuildet og genpubliceret Claude-previewet med den neutrale statustekst (punkt 1 ovenfor) —
     verificeret at kun Kampsystem-siden ændrede sig.

- **Bevidst IKKE gjort — reelle blokeringer, ikke kun forsigtighed:**
  1. **Filerne er ikke kopieret ind i `netlify-tool-prod`/committed/pushet.** Kan ikke gøres uden
     enten enhedsadgang (Chris' computer var ikke linket denne omgang) eller git/shell-adgang
     (denne session har aldrig haft det til Chris' maskine — kun fil-læs/skriv via enhedsbroen).
     Chris skal selv committe og pushe, uanset hvornår filerne kopieres ind.
  2. **Det rigtige Google Sheet til Kampsystem (`ELO_Spillere`/`ELO_Kampe`-faneblade) er hverken
     oprettet eller delt med service-kontoen** — eksplicit sprunget over efter Chris' instruks.
     Uden det vil `elo-hent`/`elo-gem` fejle på den rigtige side (samme "ingen forbindelse"-tilstand
     som i previewet), men appen fungerer stadig fint i ren session-hukommelse indtil da.
  3. Ingen forsøg på at integrere Kampsystem i en fælles navigation med de andre rigtige sider —
     `kampsystem.html` er bygget som en selvstændig side uden tværgående nav-menu, præcis som de
     eksisterende rigtige sider (`index.html`, `tilmelding.html` osv.) hver har deres egen enkle
     header uden delt nav. Den nye tre-lags nav/IA-omlægning findes fortsat kun i previewet.

**Tilbageværende trin for at gøre Kampsystem reelt "live", i rækkefølge, når Chris er tilbage:**
1. Opret og del det rigtige Google Sheet (kopiér evt. strukturen fra de andre ELO-faneblade/
   -kolonner beskrevet i `elo-hent.js`/`elo-gem.js`'s kommentarer: `ELO_Spillere!A2:F`,
   `ELO_Kampe!A2:L`) med service-kontoen, og sæt `KAMPSYSTEM_SPREADSHEET_ID` i
   `kampsystem_source.html`/den sendte `kampsystem.html` til det rigtige ID (der står allerede et
   ID i koden fra tidligere planlægning — bør dobbelttjekkes at det er det rigtige, færdige ark).
2. Kopiér `kampsystem.html` (den sendte fil, ikke `kampsystem_source.html` med
   `__ROSTER_JSON__`-pladsholderne) ind i `netlify-tool-prod/public/kampsystem.html`, og de to
   funktionsfiler ind i `netlify-tool-prod/netlify/functions/` — kræver enten at Chris gør det selv,
   eller at han linker sin computer til en session igen, så filerne kan kopieres via enhedsbroen.
3. Chris committer og pusher `netlify-tool-prod`-repoet (Claude har aldrig git/shell-adgang hertil).
4. Verificér på den rigtige, deployede URL at Kampsystem-siden loader, at "Gem nu" rent faktisk
   skriver til det nye ark, og at "Hent fra Sheets" ved sideindlæsning virker.
5. Overvej om/hvornår Kampsystem skal have et synligt link fra en af de andre rigtige sider — ingen
   af dem linker til den endnu, så den vil kun være tilgængelig via direkte URL indtil da.

**OPDATERING 2026-09-03 (syvende runde) — Chris linkede sin computer igen og delte det rigtige
regneark; trin 1-2 ovenfor er nu gennemført:**

- Chris delte URL'en til det rigtige Google Sheet:
  `docs.google.com/spreadsheets/d/12hIYb2roD2RjyeBX6eTY0ZBl91zXV1UuWhGmR58ga5c/...` — ID'et matcher
  PRÆCIS den `KAMPSYSTEM_SPREADSHEET_ID` der allerede stod i koden fra tidligere planlægning, så
  INGEN kodeændring var nødvendig for selve ID'et.
- Ved gennemgang af den rigtige `D:\Dropbox\netlify-tool-prod`-mappe (nu tilgængelig via den
  genlinkede enhedsbro) viste det sig at `elo-hent.js`/`elo-gem.js` allerede lå der (fra Fase 1,
  2026-09-02) — hentet ned og diffet byte-for-byte mod de versioner jeg gennemgik og sendte i sidste
  runde: **100% identiske**. Ingen genupload nødvendig for funktionerne.
- **`kampsystem.html` fandtes IKKE i `public/`-mappen endnu** — den produktionsklare fil (bygget i
  forrige runde, uden preview-nav-script/banner) er nu skrevet til
  `D:\Dropbox\netlify-tool-prod\public\kampsystem.html`.
- **Ikke verificeret (kan ikke tjekkes uden Google Sheets-adgang, som Claude ikke har):** at selve
  regnearket rent faktisk har de to faneblade `ELO_Spillere` (kolonner A-F: navn, gruppe, single,
  double, mix, sidst-opdateret) og `ELO_Kampe` (kolonner A-L: dato, runde, type, a1, a2, b1, b2,
  vinder, ratingÆndring, sæt1, sæt2, sæt3), begge med data fra række 2 (række 1 = header), og at
  service-kontoen (samme konto som resten af sitets Netlify-funktioner bruger,
  `GOOGLE_SERVICE_ACCOUNT_JSON`) har redigeringsadgang til arket. Chris bør selv bekræfte dette, da
  Claude ikke kan læse Google Sheets direkte.
- **Stadig manglende, kræver Chris:** git commit + push af den nye `kampsystem.html` (Claude har
  aldrig git/shell-adgang til denne mappe), og en efterfølgende verificering på den rigtige,
  deployede URL af at siden loader og at "Gem nu"/automatisk hent ved sideindlæsning rent faktisk
  virker mod det nye ark.

Status: **trin 1 (arket eksisterer, samme ID som koden) og trin 2 (filkopiering) er nu gennemført.**
Trin 3 (commit/push) og trin 4 (verificering) mangler stadig og kræver Chris' egen handling.

**OPDATERING 2026-09-03 (ottende runde) — RETTELSE: Chris' deploy-workflow bruger IKKE git.** Chris
afklarede: "jeg overfører bare mappen samlet til netlify hver gang... lidt primitiv versionskontrol
lol" — hele `netlify-tool-prod`-mappen overføres manuelt (ikke via git commit/push) til Netlify hver
gang. Al tidligere "Chris skal committe/pushe git"-vejledning i denne fil og i spec-filen er derfor
baseret på en forkert antagelse — den reelle sidste, manglende handling er blot Chris' sædvanlige
manuelle mappe-overførsel til Netlify, ikke noget git-relateret. `kampsystem.html`,
`elo-hent.js`/`elo-gem.js` lå alle korrekt i `netlify-tool-prod` på dette tidspunkt, klar til den
overførsel.

**OPDATERING 2026-09-04 — FUND ved A6-undersøgelsen, RETTET SAMME SESSION: `kampsystem_source.html`
var REGREDIERET siden syvende runde, manglede Ungsenior/Motionist/checkboks-gruppefilter.** Se A6 i
`claude/gsb-planlagte-features-spec.md` for det fulde diff-resultat. Kort fortalt: den
produktionsfil der blev kopieret ind i syvende runde (2026-09-03) HAVDE multi-gruppe-checkboks-
filteret og Motionist-gruppen (bygget i fjerde/femte runde samme dag) — men `kampsystem_source.html`
i `gsb-claude-preview-kilde` havde dem IKKE længere (kun en enkelt gruppe-dropdown, ingen
Motionist-konstant), mens produktion (`netlify-tool-prod/public/kampsystem.html`) fortsat havde
begge dele korrekt. Kilden var altså blevet overskrevet med en ældre version på et tidspunkt EFTER
syvende runde — årsag ikke undersøgt yderligere.

**RETTET 2026-09-04, samme session, på Chris' anmodning ("gotta fix A6 immediately"):**
`kampsystem_source.html` er skrevet om til at matche produktionens gruppe-UI 1:1 (HTML-markup,
CSS, `MOTIONIST_GRUPPE`-konstanten, `aktivGrupper`/`kendteGrupper`-Set'ene, og alle steder i koden
der brugte det gamle enkelt-gruppe-filter) og skrevet tilbage til
`D:\Dropbox\gsb-claude-preview-kilde\kampsystem_source.html` via enhedsbroen. Verificeret med
`node --check` (syntaksfejlfri) og en grep-gennemgang (ingen resterende referencer til det gamle
`aktivGruppe`/`gruppe-select`). **Kun preview-kilde-filen er rørt — ingen produktionsfiler
ændret**, da produktionen allerede havde den rigtige version. A5-buggen (se nedenfor) er IKKE en
del af denne rettelse og afventer stadig Chris' "byg det".

**Ikke gjort, mulig opfølgning:** det publicerede Claude-preview (`gsb_preview.html`/Artifact-
URL'en) er ikke genbygget/republiceret fra den rettede kilde — uvist om det aktuelt kørende
preview har multi-gruppe-UI'en eller er blevet regredieret undervejs. Kan tjekkes/genbygges hvis
relevant, men lå uden for selve "fix A6"-opgaven.

## A3 (skabelon-liste) lagt væk 2026-09-04 — se spec-filen

Chris: "A3 er irrelevant i sidste ende i forhold til cheftræneren, jeg får adgang til klubbens
holdliste i fremtiden, så den kan bare lægges væk." Veteran+Motionist-skabelonerne er dog stadig
besluttet (dynamisk type, bygget fra gruppemedlemskab i stedet for en tastet liste) — se A3 i
`claude/gsb-planlagte-features-spec.md` for den fulde tekst.

## Fire nye Kampsystem-punkter fra Chris, logget 2026-09-04 (IKKE bygget, ingen "byg det"-signal givet)

Fire yderligere ønsker til Kampsystem, alle udelukkende logget her efter standing-reglen (intet
bygges uden Chris' eksplicitte "byg det" for det specifikke punkt).

1. **Ulige antal spillere — konsolideret med det allerede loggede punkt fra ellevte runde.**
   Chris gentager/bekræfter ønsket om at kunne "gøre noget ved" ulige spillerantal — vælge
   teknik eller udskiftningskampe. Dette overlapper direkte med det ELLEVTE RUNDES punkt 6
   ("tydeligere ulige-antal-håndtering", se `gsb-feature-idebank.md`s driftlogs-æra — faktisk
   nu logget i denne fils historik, se OPDATERING 2026-09-03/04 om "Nulstil runde" +
   oversidder-UI) — selve mekanismen (bænk/udskiftningssingle) findes allerede i koden
   (`siddendeOver`, bygget 2026-09-03), men er reaktiv og let at overse. Denne besked bekræfter
   at det stadig er en ønsket feature, ikke en ny idé — konsolideret her som ét punkt fremover
   i stedet for at stå to steder. **Se designforslag nedenfor.**

2. **Manuel redigering af allerede-genererede kampe, uden at skulle nulstille hele runden.**
   Chris ønsker at kunne ændre en kamp EFTER den er genereret/sat (fx bytte en spiller ud, eller
   flytte en spiller til en anden kamp) uden at skulle nulstille og gen-generere hele runden
   fra bunden. Hænger direkte sammen med det allerede loggede "Nulstil runde i stedet for
   Nulstil eksempeldata"-punkt — de to sammen peger på at runden skal kunne REDIGERES i stedet
   for kun regenereres.
   - **Drag-and-drop — Chris spurgte direkte om det er for svært:** teknisk set er det ikke
     urealistisk (browserens indbyggede HTML5 drag-and-drop-API, eller et lille bibliotek som
     SortableJS, kan håndtere "træk en spiller-brik fra kamp A til kamp B"), men det er
     markant mere kompleks UI-kode end resten af Kampsystemet i dag (skal håndtere
     drop-validering — kan man droppe en single-spiller ind i en double-kamp? hvad sker der med
     spilleren der allerede stod der? — samt berøringsskærm-understøttelse hvis det bruges fra
     en tablet i hallen). **Anbefaling, ikke besluttet:** byg en simplere klik-baseret variant
     først (fx "byt spiller"-knap pr. kamp der åbner en dropdown med de andre til-stede
     spillere, eller klik-spiller-A-så-klik-spiller-B-for-at-bytte) — løser samme behov med
     langt mindre kode, og drag-and-drop kan tilføjes senere som en ren UI-forbedring oven på
     samme underliggende data-model, hvis den klik-baserede version viser sig for langsom i
     praksis. Ikke besluttet af Chris endnu hvilken af de to (eller begge) der skal bygges.
     **Se fuldt designforslag nedenfor.**
   - **Skift af kamptype (single ↔ double) på en allerede-sat kamp:** samme redigerings-flow
     skal også kunne ændre en kamps TYPE, ikke kun dens deltagere — fx en genereret single-kamp
     skal kunne gøres om til en double-kamp (kræver at tilføje 2 ekstra spillere) eller omvendt
     (kræver at fjerne 2 spillere og evt. sende dem til "sidder over" eller en anden kamp).
     Ikke udtænkt i teknisk detalje endnu — rejser spørgsmål om hvad der skal ske med
     rating-beregningen/forventet-%-visningen når typen ændres efter generering, men før kampen
     er afgjort (bør formentlig genberegnes, ligesom ved en helt ny generering).

3. **Head-to-head: fra "vælg 2 spillere" til "vælg 1 spiller, se alle deres H2H'er."** Den
   eksisterende H2H-sektion (bygget 2026-08-31, se OPDATERING samme dag ovenfor) kræver i dag at
   træneren vælger to specifikke spillere for at se deres indbyrdes rekord. Chris ønsker i
   stedet at kunne vælge ÉN spiller og se en liste over vedkommendes head-to-head-rekord mod
   ALLE modstandere de har mødt (ikke kun én ad gangen) — hurtigere overblik uden at skulle
   gætte/prøve sig frem til hvilken modstander man vil sammenligne med. Den eksisterende
   optællingslogik (tæller alle kampe hvor to spillere har stået på hver sin side, uanset
   makker i double/mix) kan formentlig genbruges direkte — det er kun UI-fladen (spillervalg →
   visning) der skal laves om, ikke selve beregningen. **Se designforslag nedenfor.**

4. **Kamplog synlig et sted pr. spiller, så træneren kan se seneste indbyrdes møder.** Hænger
   sammen med punkt 3 — ud over selve H2H-optællingen (X sejre, Y nederlag) ønsker Chris også at
   kunne se selve kamphistorikken (hvornår, hvilken type, hvem vandt) for at vurdere om to
   spillere har mødt hinanden FOR NYLIGT, ikke kun historisk totalt. Den kronologiske kamplog
   findes allerede i systemet (bruges til gentagelses-undgåelse i rundegenereringen), så dette
   er formentlig en visningsopgave (filtrér/vis den eksisterende logs rækker for én valgt
   spiller) snarere end ny datamodel. Ikke besluttet om dette skal vises samme sted som den
   omdesignede H2H-visning fra punkt 3 (mest oplagt, samme spillervalg kunne drive begge
   visninger) eller et helt separat sted. **Se designforslag nedenfor (kombineret med punkt 3).**

**Status:** alle fire punkter er udelukkende logget her — intet er bygget, hverken i previewet
eller i produktion. Punkt 1 er en konsolidering af et allerede eksisterende logget punkt; punkt
2, 3 og 4 er nye. `claude/gsb-preview-vs-live-status.md` opdateres IKKE med disse (de er ⚪ på
begge sider, ingen forskel at vise) — kun selve denne fil.

## Bug rapporteret 2026-09-04 — lås-dropdown nulstiller ikke, kan vælge samme spiller to gange — REPRODUCERET, ROD-ÅRSAG FUNDET

Chris: "Når man låser kampe selv, så er det muligt at vælge den spiller der lige er blevet
låst, fordi navnedropdown ikke automatisk går til auto, men beholder navnet på den der lige er
valgt." I lås/fastsæt-panelet (punkt 3) kan man altså ende med at låse en kamp med samme
spiller i to af de fire felter (a1/a2/b1/b2), fordi de andre dropdowns ikke opdaterer sig når én
er valgt.

Sat ind som **A5** i `claude/gsb-planlagte-features-spec.md` (Chris' regel 2026-09-04: alt der
mangler testning/verificering fra Claudes side skal stå som et DEL A-punkt der, ikke kun i denne
fil). **Opdateret 2026-09-04: reproduceret ved kodelæsning i BÅDE `kampsystem_source.html` og
`netlify-tool-prod/public/kampsystem.html` (identisk kode begge steder).** Selve "samme spiller
valgt to gange i én kamp" er faktisk allerede blokeret af en eksisterende tjek i
`tilfoejLaastKamp()` — den reelle bug er at de fire dropdowns (`lock-a1/a2/b1/b2`) ikke nulstilles
til "– auto –", hverken når man vælger en spiller i et andet af de fire felter, eller efter en
kamp er tilføjet — så en allerede-låst spillers navn bliver stående synligt valgt, hvilket giver
en forvirrende fejlbesked hvis man prøver at tilføje endnu en kamp uden manuelt at rydde felterne
først. Konkret fix identificeret: nulstil alle fire selects til `value = ""` lige efter
`lockedMatches.push(...)` i `tilfoejLaastKamp()`. Se A5 i spec-filen for det fulde
rod-årsag-resonnement.

**BYGGET 2026-09-04** som del af samme byggerunde som punkt 1/2/3/5/6 nedenfor — se
"BYGGERUNDE 2026-09-04"-afsnittet for detaljer og verificering.

## Designforslag til de seks (nu syv) Kampsystem-ønsker — GENNEMGÅET MED CHRIS 2026-09-04, IKKE bygget endnu

Chris har gennemgået alle syv udkast og givet feedback/præciseringer punkt for punkt (2026-09-04,
samme session som selve udkastene). Stadig IKKE "aftalt i detalje" i den forstand at intet er
flyttet til spec-filens DEL B eller bygget — men flere af de tidligere åbne spørgsmål er nu
afklaret nedenfor.

### 1. Bane-begrænset rundegenerering / ulige antal spillere — mere fremtrædende oversidder-UI, NU MED "COUNT" OG ROTATIONS-DESIGN — PRÆCISERET 2026-09-04

**Ønske (konsolideret):** i dag begrænser `genererRunde()` IKKE selve parringen til antal ledige
baner — alle mulige kampe dannes først (`autoMatches`), og FØRST bagefter fordeles de på baner
(`alleMatches.forEach((m, i) => { m.bane = i < baner ? i + 1 : null; })`) — overskydende kampe
vises blot som "venter på ledig bane" i stedet for at blive omdirigeret til "sidder over" fra
start. Samtidig er selve oversidder-mekanismen (`siddendeOver`, bænk-knap +
udskiftningssingle-knap) allerede bygget, men reaktiv og nem at overse (kun en lille tekstlinje
nederst i runde-visningen).

**Designforslag:**
- **Bane-bevidst pulje-fordeling:** i stedet for at generere kampe uafhængigt af banetal og
  fordele bagefter, bør antallet af ledige baner bruges TIDLIGT i `genererRunde()` til at
  begrænse hvor mange kampe der overhovedet dannes pr. kategori — resten sendes direkte i
  `siddendeOver` fra start, i stedet for at optræde som "venter på bane". Simplest mulige
  implementering: behold nuværende parrings-logik uændret, men efter `alleMatches` er dannet,
  flyt de kampe der ikke får en bane (`m.bane === null`) tilbage til `siddendeOver`-listen (som
  enkeltspillere, dvs. "fold" den ventende kamp ud til dens deltagere) i stedet for at vise dem
  som en ekstra kamp-kort med "Venter på ledig bane". Bevarer al eksisterende matchnings-logik —
  ændrer kun hvad der sker med overskuddet bagefter.
  - Åbent spørgsmål til Chris: skal "venter på bane" helt væk (alle uden bane bliver
    oversiddere), eller skal den bevares som en tredje tilstand ("kan spilles så snart en bane
    bliver ledig")? Nuværende kode antyder at Chris allerede bruger "venter på bane" aktivt (fx
    ved rul mellem kampe på samme aften) — så en mulig mellemvej er: behold "venter på bane" som
    er, men gør UI'et for at flytte en ventende kamp til "sidder over" (eller omvendt) til et
    bevidst, synligt valg i stedet for automatik.
- **Mere fremtrædende oversidder-UI, MED COUNT (tilføjet 2026-09-04 efter Chris' ønske):** flyt
  "Sidder over denne runde"-boksen fra en lille tekstlinje nederst til et tydeligt fremhævet kort
  ØVERST i runde-visningen (samme visuelle vægt som selve kampene, fx med samme `.card`-styling og
  en advarselsfarve hvis der er 2+ oversiddere klar til en udskiftningssingle). Overskriften på
  kortet viser et eksplicit ANTAL, fx "🪑 3 sidder over denne runde" i stedet for kun at liste
  navnene i løbende tekst — gør det muligt at se på ét blik, uden at tælle navne, om der er nok
  til en udskiftningssingle (2+) eller kun én ensom oversidder. De to eksisterende knapper ("Sæt
  på bænken/teknik", "Lav udskiftningssingle") bevares uændret — det er kun placering/synlighed
  og det nye tal der ændres.

**Kompleksitet:** lav-middel. Ingen ny datamodel, kun omrokering af eksisterende logik/markup +
en simpel `.length`-optælling til overskriften.

**Chris' svar 2026-09-04:** "Det er faktisk ligegyldigt hvor mange der sidder over i den nuværende
runde, men jeg tænkte på om man kunne sørge for at det ikke var den samme person hver gang med at
lave en lille 'oversidder #' til oversidderen så man ikke gør det for ofte." Dvs. selve
count-visningen fra ovenfor ("3 sidder over") er mindre vigtig end en PR.-SPILLER tæller, der
holder styr på hvor mange gange DENNE spiller har siddet over i alt, og bruges til at prioritere
retfærdigt.

**Designforslag — "oversidder #"-tæller pr. spiller + rotationsbevidst udvælgelse:**
- Nyt felt pr. spiller, `oversidderTaeller` (starter på 0, del af roster-objektet ligesom
  `single`/`double`/`mix` — gemmes i `ELO_Spillere` som en ny kolonne, eller nulstilles pr. sæson
  ligesom ratings, til afklaring ved bygning).
- Vist diskret ud for spillerens navn i roster-tabellen (punkt 1) og evt. i selve
  "sidder over"-kortet — fx "Anja (siddet over 2×)" — så det er synligt for træneren uden at skulle
  huske det.
- **Rotationslogik:** når `genererRunde()` skal vælge HVEM der bliver "til overs" i en pulje med
  ulige antal (i `pairSingles`/`formTeams`/`matchTeams`, samt ved den nye bane-begrænsning fra
  designforslaget ovenfor), skal valget IKKE længere kun være mekanisk "sidste spiller i den
  rating-sorterede liste". I stedet: blandt de spillere der reelt kan komme i betragtning til at
  sidde over (typisk bunden af puljen, eller alle hvis banetallet tvinger flere ud), vælg den/de
  med LAVEST `oversidderTaeller` til rent faktisk at sidde over denne gang — det er den der har
  siddet over færrest gange, der "er næste i køen". Spillere der allerede har siddet over meget
  bliver dermed automatisk skubbet tilbage på banen, uden at træneren skal holde styr på det
  manuelt. `oversidderTaeller` inkrementeres for de(n) valgte, med det samme runden genereres.
- **Samspil med "Nulstil runde" (punkt 3):** hvis en runde nulstilles før den er afgjort, skal de
  `oversidderTaeller`-forhøjelser der blev givet i den runde rulles tilbage igen (ligesom
  `rundeTaeller` dekrementeres) — ellers straffes en spiller uretmæssigt for en runde der reelt
  aldrig blev spillet. Simpel bogføring: gem hvilke spillere der fik tælleren forhøjet ved SIDSTE
  generering, og træk den fra igen hvis "Nulstil runde" trykkes før nogen kampe er afgjort.

**Chris' opfølgende spørgsmål: "Der skal forresten findes en måde at sørge for at alle er på
banerne enten ved at lave udskiftningskampe eller have en teknikbane. Hvordan gør vi det bedst
muligt?"**

**Anbefaling — kombination af to ting, én lille kodeændring + én praktisk/organisatorisk vane:**
- **Software:** når 2+ spillere ender i "sidder over", foreslå/fremhæv "Lav udskiftningssingle"
  som det primære valg frem for "Sæt på bænken/teknik" — fx ved at vise
  udskiftningssingle-knappen først/mere fremtrædende (den er allerede bygget og giver rigtige
  kampe uden ratingpåvirkning, så alle er faktisk i gang med at spille badminton, ikke bare stå og
  vente). Kun ved præcis ÉN ensom oversidder (intet at parre med til en udskiftningssingle) giver
  bænk/teknik reelt mening som eneste mulighed.
- **Ny, lille tilføjelse: en valgfri "teknikbane"-markering på banetal-feltet i punkt 2.** I dag er
  "Ledige baner" ét tal der udelukkende bruges til at afgøre hvor mange KAMPE der kan spilles.
  Forslag: lad Chris angive banerne som to tal — "kampbaner" og "teknikbane(r)" (kan være 0) — hvor
  teknikbanerne IKKE tæller med i selve kamp-fordelingen, men i stedet er der en fast, synlig plads
  hvor de aktuelle oversiddere automatisk foreslås sendt hen ("Send til teknikbane" i stedet for
  det nuværende "Sæt på bænken/teknik" — samme mekanik, bedre navn og en fast, tilbagevendende
  plads i stedet for en ad hoc-beslutning hver gang). Dette er en ren navngivnings-/UI-facelift af
  den eksisterende bænk-knap, ikke ny logik — men gør det til en fast del af rammen for træningen
  (nogen er altid på teknikbanen, andre roterer ind via `oversidderTaeller`) i stedet for noget der
  kun opdages runde for runde.
- Kombinationen betyder i praksis: 2+ oversiddere → udskiftningssingle (spiller rigtig badminton);
  1 ensom oversidder eller et bevidst valg → teknikbane (den faste, navngivne plads); og
  `oversidderTaeller` sikrer at det sjældent er den samme person, der ender i den ene eller anden
  situation uge efter uge.

**Kompleksitet:** lav-middel for selve tælleren og rotationslogikken (ny roster-kolonne + en
udvælgelsesregel i stedet for ren rating-sortering ved "hvem er til overs"). Teknikbane-feltet er
en ren UI/navngivnings-tilføjelse oven på eksisterende funktionalitet, ikke ny logik.

### 2. Kønsbevidst double-parring i højere pointlag — KØNSDATA-BLOKERINGEN LØST OG GODKENDT 2026-09-04

**Ønske:** en blød præference mod at undgå rene kønsopdelte double-par (H/H mod D/D) i de højere
ratinglag, hvor det formentlig er mere interessant/udfordrende at blande.

**Kønsdata BEKRÆFTET tilgængelig via Nembadmintons API, testet live 2026-09-04:**
`memberStats(id)`/`membersStats(ids)` har et `member.gender`-felt (enum `MEN`/`WOMEN`), som er
tilgængeligt UDEN login (samme mønster som resten af B4's seeding-kilde, se 0.5) — testet direkte
mod flere kendte GSB-spillere (mænd og kvinder, ungdom og senior), alle korrekte. Det tidligere
forslag om enten manuel indtastning eller et upræcist navnebaseret gæt er dermed IKKE nødvendigt
— kønnet kan hentes samtidig med resten af BD-seedingen (samme `memberStats`/`membersStats`-kald
som allerede henter `single`/`double`/`mix`), og lægges ind som et nyt `koen`-felt (`'H'`/`'D'`,
eller de rå `MEN`/`WOMEN`-værdier direkte) i `KAMPSYSTEM_ROSTER`.

**Chris' godkendelse 2026-09-04: "Super, alle spillerne skal bare have det så."** Kønsfeltet
sættes altså på HELE roster'en som en fast del af BD-seedingen (samme engangs-/løbende
seedings-proces som `single`/`double`/`mix`), ikke kun for de spillere der lige nu er relevante
for double-parring — det gør feltet klar til genbrug (fx en fremtidig kønsopdelt statistik-visning
uden at skulle seede det igen).

**Designforslag, opdateret:** `formTeams()` danner par ud fra ren rating-sortering i dag
(nabospillere i sorteret rækkefølge parres sammen), uden hensyn til køn. Med `koen`-feltet på
plads: når to nabospillere i den sorterede pulje har samme køn OG deres kombinerede rating er over
en tærskel (fx øverste 30-40% af puljen), forsøg først at bytte den ene med sin næste nabo af
modsat køn (kun hvis rating-forskellen efter byttet forbliver rimelig, samme "kun ét forsøg pr.
par"-filosofi som gentagelses-undgåelsen i `autoMatches.forEach`-blokken). "Blød præference"
betyder her: forsøg byttet, men accepter det oprindelige par uændret hvis intet rimeligt bytte
findes — aldrig en hård blokering.

**Kompleksitet:** middel (nedjusteret fra tidligere — kønsdata-forudsætningen er nu løst, kun
selve bytte-heuristikken i `formTeams()` mangler at designes færdig). **Stadig åbent spørgsmål
til Chris:** hvad er "højere pointlag" konkret — en fast tærskel, eller relativt til puljens egen
spredning den pågældende runde?

### 3. "Nulstil runde" i stedet for kun "Nulstil eksempeldata" — GODKENDT 2026-09-04, "Nulstil eksempeldata" SKAL FJERNES VED BYGNING

**Ønske:** en knap der kun fortryder den AKTUELLE, endnu ikke-afgjorte runde (nulstiller de kampe
brugeren lige har genereret, hvis fx en fejl i fremmøde/lås-valg opdages FØR nogen kampe er
afgjort), uden at nulstille hele ratinghistorikken/H2H/kamplog som `nulstilEksempeldata()` gør i
dag.

**Chris' godkendelse 2026-09-04: "Super, og husk at fjern 'nulstil eksempeldata'."** Når
"Nulstil runde" bygges, skal den gamle "Nulstil eksempeldata"-knap altså FJERNES helt fra UI'et
(punkt 4), ikke blot suppleres. Giver god mening nu hvor rundefordelingen er live med en rigtig
Sheets-backend (Fase 1-3) — "Nulstil eksempeldata" er et rent preview-prototype-levn fra dengang
alt data var midlertidigt eksempeldata, og det er et reelt farligt knap at beholde live (nulstiller
uigenkaldeligt roster/kamphistorik/H2H i den skarpe version, ikke kun i previewet).

**Designforslag (uændret fra udkastet):** en ny funktion `nulstilRunde()`, adskilt fra
`nulstilEksempeldata()` (som nu fjernes helt i stedet for at leve videre ved siden af):
- Rydder kun `runde-container`s indhold (`document.getElementById('runde-container').innerHTML =
  ''`) OG dekrementerer `rundeTaeller` tilbage (så en efterfølgende ny generering ikke springer et
  rundenummer over) — men rører IKKE `roster`, `lockedMatches`, `matchHistory`, `lastRoundKeys`.
- **Vigtig afgrænsning, variant (a) anbefalet og ikke anfægtet af Chris:** knappen er kun
  aktiv/synlig SÅ LÆNGE ingen kampe i runden er afgjort endnu — så snart første "vandt"-knap
  trykkes, forsvinder/deaktiveres "Nulstil runde"-knappen for den runde. Ingen
  rating-tilbagerulnings-logik nødvendig (den tungere variant (b) er ikke efterspurgt).
- Knappen erstatter "Nulstil eksempeldata" i punkt 4 (samme placering), ikke en ekstra knap ved
  siden af.

**Kompleksitet:** lav. Et af de billigste punkter at bygge — kandidat til at bygges sammen med
A5-fixet i samme runde.

### 4. K-faktor gjort erfarings-afhængig (BD-inspireret) — PARKERET 2026-09-04 ("virker fornuftigt for nu")

**Ønske:** Chris bad om konkrete regneeksempler på hvor meget rating ændrer sig ved forskellige
niveauer, for selv at vurdere om den nuværende faste K=70 giver rimelige udslag, eller om en
erfarings-afhængig K er nødvendig.

**Vigtig pointe FØR tallene:** med Elo-formlen afhænger rating-ÆNDRINGEN kun af FORSKELLEN mellem
de to spilleres rating — ikke af deres absolutte niveau. Det betyder 3000 mod 3000 giver PRÆCIS
samme udslag som 1500 mod 1500 (begge er "jævnbyrdige", forskel = 0), fordi Elo-formlen er
skala-uafhængig af natur — kun forskellen tæller. De tre eksempler du bad om, regnet med det
nuværende K=70/divisor=850:

| Opgør | Forventet vind-% for den højest-ratede | Hvis favoritten vinder | Hvis underdogen vinder (upset) |
|---|---|---|---|
| 3000 vs 3000 (jævnbyrdige) | 50% | Vinder +35p / taber −35p | Vinder +35p / taber −35p |
| 1500 vs 1500 (jævnbyrdige) | 50% | Vinder +35p / taber −35p | Vinder +35p / taber −35p |
| 3000 vs 1500 (forskel 1500p) | 98,3% for 3000-spilleren | 3000-spilleren +1p / 1500-spilleren −1p | 1500-spilleren (underdog) +69p / 3000-spilleren −69p |

**Uddybende tabel — udslaget ved stigende ratingforskel (samme mønster uanset hvilket
absolutte niveau de to spillere ligger på):**

| Ratingforskel | Hvis favoritten vinder | Hvis underdogen vinder |
|---|---|---|
| 0p (jævnbyrdige) | ±35p | ±35p |
| 100p | Favorit +30p | Underdog +40p |
| 250p | Favorit +24p | Underdog +46p |
| 500p | Favorit +14p | Underdog +56p |
| 750p | Favorit +8p | Underdog +62p |
| 1000p | Favorit +4p | Underdog +66p |
| 1250p | Favorit +2p | Underdog +68p |
| 1500p+ | Favorit +1p | Underdog +69p |

**Konsekvens for selve spørgsmålet (erfarings-afhængig K):** disse tal viser at systemet allerede
er "selv-korrigerende" på TVÆRS af niveauer — en kamp mellem to meget forskellige spillere flytter
næsten intet for favoritten men meget for underdogen, uanset om de er 1500-spillere eller
3000-spillere. Det oprindelige spørgsmål om erfarings-afhængig K handler om noget ANDET: om en
spiller med FÅ spillede kampe (uanset deres nuværende rating) bør have et større udsving end en
spiller med mange kampe, fordi deres nuværende tal er mindre pålideligt. Det er stadig et
reelt, separat spørgsmål — tabellerne ovenfor besvarer det ikke, men viser at det ikke handler om
et problem med selve niveau-skalaen (den er allerede fair).

**Chris' beslutning 2026-09-04: "Det virker fornuftigt for nu."** Punktet er parkeret — ingen
erfarings-afhængig K bygges lige nu. Designet ovenfor (kamptæller udledt af `matchHistory` + en
simpel trappefunktion) ligger klar hvis Chris på et senere tidspunkt observerer et konkret problem
med det nuværende faste K=70.

**Kompleksitet (hvis det alligevel skulle bygges senere):** lav-middel, uændret fra udkastet — kan
bygges uden ny datamodel (kamptæller kan udledes af `matchHistory`).

### 5. H2H-redesign: ÉN DROPDOWN + kategori-filter + ny "makker mest med"-stat — PRÆCISERET 2026-09-04

**Ønske, endeligt afklaret 2026-09-04:** Chris' første formulering ("trykke mellem de forskellige
muligheder") lød først som klikbare faner til at skifte mellem modstandere — men Chris har
efterfølgende forenklet kravet: **"Der skal være en enkelt dropdown menu til at vælge spilleren
man vil se data på. Det skal potentielt være muligt at sortere single / double."** Dvs. selve
faneinddelingen mellem modstandere er IKKE efterspurgt — kun ÉT enkelt dropdown-valg for
HOVEDSPILLEREN (i stedet for dagens to dropdowns), plus mulighed for at filtrere resultatet på
kategori. Simplere design end det oprindelige udkast, mindre kode.

**Designforslag, forenklet:**
- Erstat de to `h2h-a`/`h2h-b`-dropdowns i punkt 5 med ÉN dropdown (vælg hovedspilleren).
- Ny funktion `visAlleOpgoer(navn, kategori)`: løb `matchHistory` igennem ÉN gang, gruppér kampe
  efter "modstanderens navn" (samme a-mod-b-logik som i dag, men uden at kræve en forudvalgt
  modstander — modstanderen udledes af hvem der stod på den anden side af den valgte spiller i
  hver kamp). Byg et objekt `{ modstander: { sejre, nederlag, seneste: [kampe] } }`, og render det
  som en simpel liste (ikke faner) — én række pr. modstander, sorteret efter **seneste møde
  (nyeste først)**, som matcher Chris' oprindelige motivation ("se om to spillere har mødt
  hinanden for nyligt").
- **Kategori-filter (Chris' tilføjelse):** en lille radio-/knap-gruppe over listen — "Alle /
  Single / Double / Mix" — der filtrerer hvilke kampe der tælles med i optællingen og listen.
  Genbruger `matchHistory`s eksisterende `type`-felt, ingen ny datamodel — kun et ekstra filter i
  `visAlleOpgoer()`.
- **"Makker mest med"-stat:** en separat optælling af hvem den valgte spiller har stået PÅ SAMME
  SIDE som (makker i double/mix), ikke modstander — for hver kamp hvor spilleren indgår i et hold
  på 2, tæl den anden spiller i samme `a`/`b`-array som "makker denne kamp". Vises som en kort
  liste ved siden af eller under modstander-listen, fx "Oftest makker med: Anja (7 kampe), Morten
  (4 kampe)...". Bør også kunne filtreres af det samme kategori-filter (double vs. mix er reelt to
  forskellige makker-mønstre). Genbruger samme `matchHistory`-datakilde — ingen ny datamodel.
- Kamplog pr. spiller (punkt 4 fra "fire nye punkter"): en klap-ud/ekspanderbar sektion under hver
  modstander-række der viser selve kampene kronologisk (type, runde, vinder) — kan genbruge
  `renderKamplog()`s render-logik, filtreret til kampe der involverer den valgte spiller og
  modstander.

**Kompleksitet:** lav — simplere end det oprindelige fane-udkast. Ren liste + ét kategori-filter +
et ekstra loop til makker-optællingen, alt sammen billige beregninger over allerede eksisterende
`matchHistory`-data.

### 6. Manuel redigering af allerede-genererede kampe (byt spiller / skift type) — AFKLARET 2026-09-04: MULIGHED 3 + "BEKRÆFT ÆNDRINGER"

**Ønske:** redigere en genereret, endnu ikke afgjort kamp — bytte en deltager ud, eller ændre
kamptype (single ↔ double) — uden at nulstille/gen-generere hele runden.

**Hvad `lockedMatches` er, til reference:** det er IKKE "alle kampe i den aktuelle runde" — det
er kun de kampe DU eksplicit har fastsat i punkt 3's lås-panel FØR du trykkede "Generér runde"
(fx "Anja + Christoffer mod Morten"). Når runden genereres, kopieres disse ind i `alleMatches`
med et `locked: true`-flag, side om side med de AUTO-genererede kampe (som ikke har flaget). Selve
`lockedMatches`-arrayet lever videre EFTER runden er genereret — det er det samme array der
bruges til at holde en spiller "reserveret" i lås-dropdownsne (se A5), og det bliver KUN tømt ved
"Nulstil eksempeldata" (fremover "Nulstil runde", se punkt 3).

**Chris' spørgsmål 2026-09-04 til den oprindeligt anbefalede mulighed 2:** "hvad sker der hvis
man gerne vil flytte flere spillere mellem samme kamp, er den så blevet 'låst' ved første skift,
og så er man stoppet fra at flytte flere ved begrænsningen?" — et helt rigtigt problem. Mulighed 2
(auto-kamp bliver til en de-facto fastsat kamp ved første redigering, ved at få en ny
`lockedMatches`-post) risikerer netop dette hvis det implementeres naivt: så snart første bytte
sker, findes der en fersk `lockedMatches`-post for den kamp, og alt efter hvordan lås-dropdownsne
(se A5) og "samme spiller kun én gang pr. runde"-tjekket er skrevet, kunne det andet bytte i samme
kamp risikere at blive begrænset af sin egen første ændring (fx hvis den nyligt tilføjede
`lockedMatches`-post "reserverer" den først-tilføjede spiller, før du er færdig med at redigere).
Det er ikke uoverkommeligt at undgå i mulighed 2, men det kræver ekstra påpasselighed (opdatér hele
posten atomisk, ikke inkrementelt spiller for spiller) — og Chris' egen alternative forslag løser
problemet strukturelt i stedet for at patche det.

**Chris' forslag, og den valgte løsning: mulighed 3 + en ny "Bekræft ændringer"-knap.**
- Åbning af en kamps redigerings-panel går ind i en RENT LOKAL, ikke-committed redigeringstilstand
  for netop det kamp-kort — du kan bytte 1, 2, 3+ spillere ud og/eller skifte kamptype, alt sammen
  i UI-state, uden at noget af det rører `lockedMatches` eller det underliggende kamp-objekt i
  `alleMatches` undervejs.
- Kamp-kortet viser en "Bekræft ændringer"-knap mens redigeringstilstanden er åben. Først når du
  klikker den, skrives det redigerede resultat (endelige deltagere + kamptype) ind i kamp-objektet,
  kortet gen-rendres — og `lockedMatches` røres stadig ikke, uanset om kampen oprindeligt var
  auto-genereret eller fastsat.
- Det betyder at Chris' konkrete bekymring falder væk: der er intet "første skift låser kampen"-
  øjeblik, fordi INTET committes før "Bekræft ændringer" klikkes. Du kan frit flytte flere
  spillere mellem samme kamp i den lokale redigeringstilstand, og kun det endelige resultat
  gemmes, ikke hvert enkelt mellemtrin.
- Samme konsekvens som den oprindelige mulighed 3-beskrivelse: en regenerering er ikke muligt
  oven på en redigeret runde — "Nulstil runde" er stadig den eneste vej til at regenerere fra
  bunden. Det er en bevidst forenkling Chris har valgt frem for mulighed 2's ekstra bogholderi.

**Drag-and-drop:** fortsat vurderet som en ren UI-forbedring OVENPÅ denne datamodel — samme
"byt spiller"-funktion kunne senere trigges ved et drag-slip i stedet for et dropdown-valg, med
samme lokale redigeringstilstand + "Bekræft ændringer"-mønster. Anbefales fortsat udskudt til den
klik-baserede version er testet i praksis.

**Kompleksitet:** middel — lavere end oprindeligt vurderet, fordi mulighed 3 + "Bekræft ændringer"
undgår al `lockedMatches`-bogholderi. Stadig det forslag med mest UI-state (lokal redigeringsbuffer
pr. kamp-kort), så fortsat en kandidat til at bygges for sig selv.

**Fælles bemærkning til alle seks aktive forslag ovenfor** (punkt 4 er parkeret, se ovenfor):
ingen af dem er formelt "aftalt i detalje" endnu i den forstand at de er flyttet til spec-filens
DEL B — men punkt 1 (bane/oversidder + oversidder-tæller + teknikbane-anbefaling), punkt 2
(kønsdata-kilden, godkendt), punkt 3 (fuldt godkendt), punkt 5 (én dropdown + kategori-filter +
makker-stat) og punkt 6 (mulighed 3 + "Bekræft ændringer") har nu alle et klart nok design til at
kunne bygges, når du giver "byg det" for det enkelte punkt. Punkt 4 er parkeret og bygges ikke
lige nu.

## BYGGERUNDE 2026-09-04 — A5 + punkt 1/2/3/5/6 bygget i preview-kilden, IKKE i produktion endnu

Chris' signal: "Godt, saml alle de andre A og B punkter og lad os se om det kan bygges i vores
preview først, så tager vi det videre til live når det virker. Lad os begrænse os til at arbejde
på kampsystemet for nu." — læst som et samlet "byg det" for A5 + de fem ikke-parkerede
designpunkter (1, 2, 3, 5, 6), afgrænset til preview-kilden. To resterende åbne
underspørgsmål fra designudkastene blev afklaret med Chris via to hurtige spørgsmål inden
byggeriet: (a) "venter på bane" fjernes helt (i stedet for at bevares som en tredje tilstand),
(b) kønsbevidst parrings-tærsklen ("højere pointlag") er relativ til aftenens pulje (øverste
~35%), ikke et fast ratingtal.

**Bygget, i `kampsystem_source.html` (kun preview-kilden, `D:\Dropbox\gsb-claude-preview-kilde\`
— INGEN produktionsfiler rørt):**
- **A5:** `tilfoejLaastKamp()` nulstiller nu eksplicit alle fire lås-dropdowns til "– auto –" med
  det samme efter en kamp er tilføjet.
- **Punkt 1:** nyt `oversidderTaeller`-felt pr. spiller (vist i roster-tabellen som "(siddet over
  N×)"), rotation prioriterer laveste tæller i `pairSingles`/`formTeams`/`matchTeams` når nogen
  skal sidde over, "venter på bane" er fjernet (overskydende kampe opløses til deres enkelte
  deltagere og lægges i "sidder over" med det samme), "sidder over"-kortet er flyttet øverst i
  runde-visningen med et eksplicit antal i overskriften ("🪑 N sidder over"), og
  "Lav udskiftningssingle" vises nu som den primære (btn-primary) handling ved 2+ oversiddere;
  "Sæt på bænken/teknik" er omdøbt til "Send til teknikbane".
- **Punkt 2:** nyt `formTeams(..., ratingKey, blandKoen)`-signatur + `forsoegKoensblanding()` der
  forsøger ét bytte mellem to rent kønsopdelte double-hold i øverste ~35% af aftenens pulje (målt
  på hold-gennemsnit, ikke enkeltspilleres rating — rettet efter en fundet edge-case i test, se
  nedenfor), kun hvis det ikke skævvrider rating-balancen mellem holdene urimeligt. Kønsseedingen
  (`koen`-feltet) var ved denne runde endnu ikke kørt, se BYGGERUNDE 2026-09-05 nedenfor for
  fuldførelsen.
- **Punkt 3:** "Nulstil eksempeldata"-knappen er fjernet helt og erstattet af "Nulstil runde"
  (`nulstilRunde()`) — rydder kun den aktuelle runde og dekrementerer rundetælleren, deaktiveret
  så snart mindst ét resultat i runden er registreret, og ruller `oversidderTaeller`-forhøjelser
  fra den nulstillede runde tilbage.
- **Punkt 5:** H2H-sektionen har nu én dropdown (ikke to) + et kategori-filter
  (Alle/Single/Double/Mix), viser alle modstandere sorteret efter seneste møde (med en
  klap-ud kamplog pr. modstander) og en ny "Makker mest med"-liste.
- **Punkt 6:** hvert kamp-kort har en "✎ Rediger kamp"-knap der åbner en lokal, ikke-committed
  redigeringsboks (kamptype + spiller-dropdowns, der opdaterer hinandens valgmuligheder live —
  samme lektie som A5). Kun "Bekræft ændringer" skriver det redigerede resultat ind i kamp-kortet;
  `lockedMatches` røres aldrig.

**Verificering:** `node --check` på hele det udtrukne script (syntaksfejlfri), plus en jsdom-
funktionstest (9 deltest: roster-rendering, A5-nulstilling, oversidder-rotation +
bane-fold-til-oversidder, Nulstil runde + tæller-rollback, redigér kamp uden at røre
lockedMatches, resultat-registrering deaktiverer redigér/nulstil-knapperne, ny H2H-visning) —
alle bestået. En separat test af `forsoegKoensblanding()` afslørede at den oprindelige tærskel
(baseret på ENKELTSPILLERES rating) kunne ramme et hold der lå lige under grænsen, selvom begge
spilleres individuelle ratings var med til at beregne den — rettet til at bruge HOLD-gennemsnit
konsekvent, genverificeret med et scenarie hvor to rent kønsopdelte tophold (H+H, 3000/2950 og
D+D, 2900/2850) nu korrekt blev blandet til to blandede hold.

**Leveret til Chris:** en selvstændig, direkte-åbnelig `kampsystem_preview_standalone.html` (hele
`kampsystem_source.html` med den RIGTIGE nuværende roster — 61 spillere, Senior + SuperUng Teen —
og den fulde 382-spiller klubliste indlejret) sendt direkte i chatten til at klikke rundt i og
teste. Selve preview-kilde-filen `kampsystem_source.html` er også skrevet tilbage til
`D:\Dropbox\gsb-claude-preview-kilde\` (kun denne fil, ingen andre preview- eller
produktionsfiler rørt).

**Bevidst IKKE gjort denne omgang (se BYGGERUNDE 2026-09-05 for opfølgningen på de to første
punkter — begge nu løst):**
- **Selve Claude-artifact-URL'en (`gsb_preview.html`, hele site-shell'en med navigation til alle
  apps) er IKKE genbygget/republiceret.** Det ville kræve at genopbygge hele `build3.py`-
  pipelinen (som også indlæser `real_data.json`, `resultater_2425.json`,
  `stilling_2425_addendum.json` m.fl. — filer der intet har med Kampsystem at gøre) — vurderet
  som unødvendigt for at nå Chris' konkrete mål ("se om det kan bygges i vores preview") denne
  omgang, når en selvstændig, direkte testbar fil kan leveres langt hurtigere. Kan bygges som en
  opfølgende opgave hvis Chris hellere vil teste via den delte Artifact-URL / med resten af
  navigationen omkring.
- **Ingen produktionsfiler rørt** — hverken `netlify-tool-prod/public/kampsystem.html` eller
  nogen af Netlify-funktionerne. Alt arbejde denne omgang er isoleret til preview-kilden, som
  aftalt ("bygges i vores preview først, så tager vi det videre til live når det virker").
- ~~`build3.py`'s `KAMPSYSTEM_ROSTER`-liste er IKKE opdateret med "Ungsenior"-gruppeflytningen~~
  **RETTET i BYGGERUNDE 2026-09-05** — se nedenfor.
- ~~Kønsseeding (punkt 2's forudsætning) er ikke kørt~~ **KØRT OG FULDFØRT i BYGGERUNDE
  2026-09-05** — se nedenfor.
- **Teknikbane som separat felt (kampbaner + teknikbane hver for sig)** fra punkt 1's fulde
  anbefaling er ikke bygget — kun selve "venter på bane"-fjernelsen og knap-omdøbningen
  ("Send til teknikbane") er bygget denne omgang; den mere ambitiøse to-felts opdeling af
  banetallet er en mulig senere finpudsning.

Status: **A5 + punkt 1, 3, 5, 6 er bygget og testet i preview-kilden. Punkt 2 (kønsbevidst
double-parring) er nu FULDT funktionsdygtig efter BYGGERUNDE 2026-09-05's kønsseeding — se
nedenfor.**

## BYGGERUNDE 2026-09-05 — Chris' testfund fra standalone-filen: Ungsenior-sync, kønsseeding, HÅRD kønsparring i Mixed double, ny "Skal spille"-force — BYGGET I PREVIEW

Chris testede `kampsystem_preview_standalone.html` fra forrige runde og meldte tre ting tilbage i
én besked (med to skærmbilleder af en "Mixed double"-kamp med to rent mandlige hold):

1. "Ungsenior forsvandt."
2. "Det skal være muligt at 'force' spillere til ikke at sidde over i en runde (især 1.
   holdsspillere op til holdkampe osv.)"
3. "Jeg har valgt at christoffer og kenneth KUN skal spille mix. Hvorfor spiller de så herre
   double? Der er noget galt i køn"

**Rod-årsag 1 (Ungsenior forsvandt) — IKKE en ny regression, men den allerede flaggede drift fra
forrige runde blev nu synlig for Chris:** `build3.py`s `KAMPSYSTEM_ROSTER` var aldrig blevet
opdateret med flytningen af Rosa Hinge Carlsson, Sylvester Østberg og Louis Toftlund fra "Senior"
til "Ungsenior" (fjerde runde, 2026-09-03) — kun selve UI'ets gruppe-checkboks-filter fulgte med
dengang, ikke de tre spilleres faktiske `gruppe`-værdi i denne fil. Da forrige rundes standalone-
fil blev bygget direkte fra `build3.py`, manglede Ungsenior-gruppen derfor helt (ingen af de tre
spillere stod i den, og gruppen optrådte slet ikke som checkboks). **Rettet:** de tre spilleres
`"gruppe"` er ændret til `"Ungsenior"` i `build3.py`.

**Rod-årsag 2 (Mixed double-kønsfejl) — en reel, hidtil ukendt fejl, ikke en regression fra
forrige rundes arbejde:** den bløde kønsblandings-funktion fra forrige runde
(`forsoegKoensblanding()`) gælder KUN "double"-kategorien — "mixed"-kategoriens holddannelse
(`formTeams(pools.mixed, filosofi, 'mix', false)`) har ALDRIG haft nogen kønslogik overhovedet,
lige siden Mixed double først blev tilføjet som tredje spilletype (2026-08-31) — den har altid
kun parret efter rating, uanset køn. For "double" er kønsblanding bevidst en BLØD præference
(to rent kønsopdelte hold er en gyldig double-kamp), men for "Mixed double" er kønsbalance en
FORUDSÆTNING for at kategorien overhovedet giver mening — og den regel har aldrig været kodet.
Chris' skærmbillede viste præcis konsekvensen: Kenneth Hasselby + Jonathan Hansen (begge mænd) mod
Christoffer Müller + Rasmus Holmlykke Andersen (også begge mænd), i en kamp mærket "Mixed double".

**Forudsætning løst i samme runde: rigtig kønsdata er nu hentet og seedet, ikke kun kode
forberedt uden effekt (som i forrige runde).** Kønsdata blev hentet direkte fra Nembadmintons
`membersStats(ids)` for alle 382 spillere i `gsb_alle_spillere.json`, matchet PRÆCIST på deres
allerede kendte Nembadminton-`id` (ikke fuzzy navnematch) — 382 af 382 matchede uden undtagelse.
Et separat `koen`-felt ('H'/'D') er tilføjet til alle 382 entries i `gsb_alle_spillere.json`. For
de 61 `KAMPSYSTEM_ROSTER`-spillere i `build3.py` (som ikke har et gemt Nembadminton-id) blev køn i
stedet fundet via fuzzy navnematching mod samme datakilde (håndterer kendte navnevarianter, se
`GSB_NAVNE_ALIAS_OG_ANOMALIER.json`) — 59 af 61 matchede automatisk eller via allerede dokumenterede
manuelle overrides (Michelle Liljengren, de 4 SUT-ungdomspiger). Kun **Andreas Drasbek** og
**August Carl Toftager-Larsen** mangler fortsat køn (samme to spillere der allerede manglede al
BD-rating i tidligere runder — de findes reelt ikke i Nembadmintons system endnu).

**Bygget i `kampsystem_source.html` (kun preview-kilden):**
- Ny funktion `formTeamsMixed(pool, ratingKey, filosofi)` erstatter det gamle
  `formTeams(pools.mixed, filosofi, 'mix', false)`-kald i `genererRunde()`. I modsætning til
  double's BLØDE kønspræference er dette en HÅRD regel: mænd og kvinder splittes i to lister,
  sorteres efter rating, og parres 1:1 (enten "ens niveau" eller "stærk+svag" efter samme
  `filosofi`-valg som resten af systemet) — der kan aldrig dannes et Mixed double-hold med to
  spillere af samme køn. Er der et kønsoverskud (fx flere mænd end kvinder til stede), sidder
  overskuddet over i stedet for at blive fejlparret — valgt via samme `oversidderTaeller`-rotation
  som resten af systemet (nu udvidet til `vaelgFlereOversiddere()`, som håndterer flere
  oversiddere på én gang, ikke kun én ad gangen som den oprindelige `vaelgOversidderIndex`).
  Spillere der endnu mangler et registreret `koen` (kun de to nævnt ovenfor) placeres automatisk i
  "sidder over" for Mixed double, i stedet for at blive gættet på — en tydelig statusbesked
  forklarer hvorfor, hvis det sker.
- **Ny "Skal spille"-force (Chris' punkt 2, "især 1. holdsspillere op til holdkampe"):** nyt
  `tvungenSpil`-felt pr. spiller, med en ny afkrydsningsboks ("Skal spille") i roster-tabellen ud
  for hver spiller. En spiller markeret "Skal spille" bliver aktivt nedprioriteret som
  oversidder-kandidat i ALLE tre relevante steder (`vaelgOversidderIndex` for enkeltspiller-puljer,
  `matchTeams`s hold-niveau-oversidder-valg, og den nye `formTeamsMixed`s kønsoverskuds-valg) —
  men kan ikke gøre generering umulig: er ALLE kandidater i en given oversidder-beslutning
  tvungne, falder valget automatisk tilbage til normal (laveste `oversidderTaeller`) i stedet for
  at fejle. Flaget er, ligesom `oversidderTaeller`, en ren session-hukommelsesting (nulstilles ikke
  fra Sheets endnu) — permanent lagring kan tilføjes hvis det viser sig ønsket løbende.

**Verificering:** `node --check`/`new Function()`-parsing af hele det udtrukne script
(syntaksfejlfri). Alle 9 eksisterende deltest fra forrige runde (`test.js`) stadig bestået
uændret. Den eksisterende `forsoegKoensblanding()`-test (`test_koen.js`, kun "double") stadig
bestået uændret — bekræfter at "double"s bløde præference-logik ikke er rørt. Ny dedikeret test
(`test_mixed_koen_force.js`) reproducerer Chris' PRÆCISE scenarie gennem hele `genererRunde()` (
ikke kun enhedstest af selve funktionen): Kenneth (markeret "Skal spille") + Christoffer + Jonathan
+ Rasmus samt to kvinder og én spiller med ukendt køn, alle sat til kun "Mixed" — resultatet er nu
udelukkende kønsbalancerede hold (Kenneth+Anja, Jonathan+Camilla), Kenneth sidder IKKE over
(tvungenSpil respekteret), og spilleren med ukendt køn sidder korrekt over i stedet for at blive
fejlagtigt parret. Desuden en separat unit-test af selve `formTeamsMixed()` med de 4 ægte spillere
fra Chris' skærmbillede (som alle reelt ER mænd, bekræftet af de nu rigtige data) — alle fire ender
korrekt i "sidder over" (ingen kvinder til at parre med i den mini-pulje), IKKE i to fejlagtige
rent-mandlige hold som før — samt en test af et kønsoverskud (4 mænd/3 kvinder, én mand
"Skal spille") der bekræfter at den tvungne spiller ikke bliver valgt som oversidder.

**Leveret til Chris:** opdateret `kampsystem_preview_standalone.html` (bygget fra det rettede
`build3.py` + det opdaterede `gsb_alle_spillere.json`, indeholder nu Ungsenior-gruppen og korrekt
køn for 59/61 roster-spillere), samt de tre rettede kildefiler (`build3.py`,
`kampsystem_source.html`, `gsb_alle_spillere.json`) skrevet tilbage til
`D:\Dropbox\gsb-claude-preview-kilde\` via enhedsbroen. Ingen produktionsfiler rørt.

**Bevidst IKKE gjort denne omgang:**
- **`tvungenSpil` er ikke gemt til Google Sheets** — samme situation som `oversidderTaeller`,
  nulstilles ved genindlæsning/næste session. Kan tilføjes som en ny `ELO_Spillere`-kolonne hvis
  Chris ønsker det bevaret på tværs af aftener.
- **Andreas Drasbek og August Carl Toftager-Larsen har fortsat intet `koen`-felt** — de findes
  ikke i Nembadmintons medlemsdata (samme to spillere der mangler al BD-rating). De vil altid
  havne i "sidder over" for Mixed double, indtil deres køn er sat manuelt eller de findes i en
  fremtidig datakilde.
- **Selve Claude-artifact-URL'en (hele `gsb_preview.html`-site-shell'en) er fortsat ikke
  genbygget** — samme afgrænsning som forrige runde, en selvstændig standalone-fil er hurtigere at
  teste med.
- **Ingen produktionsfiler rørt** — hverken `netlify-tool-prod/public/kampsystem.html` eller nogen
  Netlify-funktioner. Alt arbejde er isoleret til preview-kilden.

Status: **alle tre af Chris' rapporterede punkter er rettet og verificeret i preview-kilden —
afventer Chris' fornyede test af den opdaterede standalone-fil, før noget kopieres videre til
produktion.**

## Fire nye punkter fra Chris, logget 2026-09-05 (UNDER DISKUSSION, ingen "byg det" givet endnu)

Chris rejste fire nye ting samme dag som han testede standalone-filen fra BYGGERUNDE 2026-09-05
ovenfor, eksplicit som noget "vi lige skal diskutere" — logget her som designforslag, ikke bygget
endnu.

### 1. Standard antal ledige baner — 5 eller 10, nem at vælge mellem

**Ønske:** "Standard antal ledige baner skal være 5 eller 10 (eller en nem måde at vælge mellem)."
I dag er "Ledige baner" (punkt 2) et almindeligt talfelt med `value="4"` og `min="0" max="10"` —
intet hurtigt førvalg, man skal selv skrive tallet.

**Designforslag:** to små "hurtigvalg"-knapper ved siden af talfeltet, "5 baner" og "10 baner",
der sætter feltets værdi med ét klik — det almindelige talfelt bevares uændret for andre tal (fx
6 eller 8, hvis kun en del af hallen er ledig en bestemt aften). Ingen ny datamodel, kun to
knapper + en lille click-handler. Selve standardværdien ved sideindlæsning foreslås sat til 5
(det mindste af de to, mest almindelige udgangspunkt), men kan ligeså let sættes til 10 — Chris
bør bekræfte hvilken af de to der oftest er den rigtige startværdi i praksis.

**Kompleksitet:** meget lav.

### 2. Tydeligt antal valgte spillere

**Ønske:** "Det skal være nemt at se præcis hvor mange spillere der er valgt til træningen."
I dag vises ingen løbende optælling af hvor mange spillere der er markeret "til stede" — man skal
selv tælle krydser i roster-tabellen.

**Designforslag:** en lille, tydelig tæller ved siden af "Vælg alle til stede"/"Fjern alle"-
knapperne i punkt 1, fx "12 til stede" — opdateres live ved hvert flueben-klik (samme steder som
allerede kalder `renderRoster()`/opdaterer `p.tilstede`). Tælleren bør kun tælle spillere i de
AKTIVE grupper (samme `aktivGrupper`-filter som resten af punkt 1), så den matcher hvad man rent
faktisk ser og kan vælge fra. Ingen ny datamodel — ren visning af noget der allerede findes
(`roster.filter(p => p.tilstede && aktivGrupper.has(p.gruppe)).length`).

**Udvidet 2026-09-05, Chris' opfølgning:** "antal spillere til stede må gerne stå nede ved enten
opsætning/lås kampe også potentielt. Så er det nemmere at se når man laver kampe." — samme tal
gentages altså ét eller flere steder LÆNGERE NEDE på siden (punkt 2 "Opsætning for denne runde"
og/eller punkt 3 "Lås/fastsæt kampe"), ikke kun oppe ved selve roster-listen i punkt 1 — netop
fordi man kigger på opsætning/lås-panelerne, ikke roster-tabellen, når man rent faktisk sidder og
sammensætter kampe, og skal ikke behøve at scrolle op for at se tallet. Simpleste implementering:
udtræk selve optællingen til én lille hjælpefunktion (fx `antalTilStedeTekst()`), og indsæt det
samme tal-element flere steder i markup'et (punkt 1, punkt 2's overskrift/underoverskrift, og
punkt 3's `card-sub`-tekst) — alle opdateres samtidig fra samme kilde, hver gang `renderRoster()`
(eller en ny lille `opdaterTilStedeTaeller()`, kaldt fra de samme steder som roster-visningen
allerede opdateres) køres. Ingen grund til at gentage den fulde "12 til stede"-sætning begge/alle
steder — et kort, konsekvent format (fx et lille badge "👥 12") går igen ved punkt 2 og 3's
overskrifter.

**Kompleksitet:** meget lav — samme tælleværdi, blot vist flere steder i markup'et.

### 3. Prioritér doubler over singler når ulige antal ville give oversiddere — ÅBENT DESIGNSPØRGSMÅL

**Ønske:** "Hvis det at generere en single gør at der er flere oversiddere, så skal der hellere
spilles flere doubler. Prioriteten er at alle skal kunne spille, medmindre der specifikt er låst
en single i punkt 3."

**Hvad der sker i dag:** `genererRunde()` fordeler kandidater (spillere med ≥1 valgt kategori) til
PRÆCIS én pulje (single/double/mixed) hver, efter et simpelt "læg i den pulje der lige nu har
færrest spillere"-princip — det balancerer kun puljestørrelser, ikke hvor mange der reelt ender
med at sidde over. Det er ikke det samme: en single-pulje med ulige antal giver ÉN oversidder,
mens en double/mixed-pulje kan give 0, 1 eller 2 oversiddere afhængig af antallet modulo 4 (0 mod
4 = ingen oversiddere; 2 mod 4 = to oversiddere fra selve holdkampsrunden, selvom ingen sidder
over ved holddannelsen). Den nuværende fordeling kan altså sagtens ende med en ulige single-pulje,
selvom der var en oplagt double/mixed-kandidat der kunne være rykket over for at rette op på det.

**Vigtig afgrænsning, allerede opfyldt af eksisterende kode:** eksplicit LÅSTE kampe (punkt 3,
`lockedMatches`) er allerede taget helt ud af `kandidater`-poolen FØR kategori-fordelingen sker
(`explicitte`/`ledige`-filtreringen) — en spiller der er låst til en single rører derfor slet ikke
ved denne del af logikken. Chris' "medmindre der specifikt er låst en single" er altså allerede
opfyldt af den eksisterende arkitektur, ikke noget der skal bygges særskilt.

**Designforslag — en efterbehandlings-fase efter den nuværende fordeling:**
1. Behold den nuværende første fordeling uændret (den er et fornuftigt udgangspunkt for
   puljestørrelser).
2. Beregn et forventet oversidder-tal pr. pulje ud fra puljestørrelsen: single = `n % 2`,
   double/mixed = 0 hvis `n % 4 == 0`, 2 hvis `n % 4 == 2`, 1 hvis `n % 4 == 1`, 3 hvis
   `n % 4 == 3` (afledt af at både holddannelse OG selve kampsætningen kan give én oversidder
   hver).
3. Så længe det samlede forventede oversidder-tal kan reduceres ved at flytte ÉN "fleksibel"
   spiller (en spiller der har valgt MERE END én kategori, og som er i den pulje der skal
   formindskes) til en af deres andre valgte kategorier: flyt den spiller, der giver den største
   forbedring. Ved uafgjort mellem flere lige gode flyt, foretræk at flytte UD AF single og IND I
   double/mixed (Chris' eksplicitte prioritering) frem for omvendt.
4. Gentag til ingen yderligere forbedring er mulig, eller der ikke er flere fleksible spillere at
   flytte (simpelt loft på antal iterationer for at undgå uendelig løkke, fx antal fleksible
   spillere).

**Vigtigt forbehold:** dette er en grådig lokal-søgning, ikke en garanteret globalt optimal
løsning (fuld optimering ville kræve at afprøve alle kombinationer, hvilket bliver uoverskueligt
med mange spillere) — men den fanger præcis det scenarie Chris beskriver (én ekstra single-
oversidder der kunne undgås ved at flytte én fleksibel spiller til double), og forværrer aldrig
det samlede oversiddertal (den flytter kun hvis det er en nettoforbedring).

**Afklaret 2026-09-05: Chris bekræftede "begge holddisciplinerne (anbefalet)"** — en fleksibel
spiller kan flyttes til enten "double" eller "Mixed double", alt efter hvad der giver færrest
oversiddere i alt, ikke kun ren double. Designet er dermed færdigt og klar til bygning, når Chris
giver "byg det".

**Kompleksitet:** middel — kræver en ny efterbehandlings-funktion i `genererRunde()`, men rører
ikke selve pulje-opbygningen, `pairSingles`/`formTeams`/`formTeamsMixed`/`matchTeams` eller nogen
af de øvrige nyere features (oversidderTaeller-rotation, tvungenSpil) — de fungerer uændret på
den justerede pulje-fordeling.

### 4. Vis advarsel når en spiller vælges ind i en redigeret kamp, men allerede står i en anden kamp

**Ønske:** "Hvad sker der når man redigerer en kamp, men spillerne stadig står i en anden kamp der
er genereret? Er der en mulighed for at vise det?"

**Bekræftet ved kodelæsning: dette er reelt et hul i dag, ikke kun en teoretisk bekymring.**
`aabnRedigering()`s `fyldOptioner()`-funktion udelukker kun spillere der allerede er valgt
INDENFOR SAMME redigeringsboks (`valgte`-arrayet) — den kigger IKKE på hvem der i forvejen står i
de ANDRE, allerede viste kamp-kort i runden. Man kan derfor i dag vælge en spiller ind i kamp B's
redigeringsboks, selvom den spiller stadig fremgår af kamp A's kort, uden nogen advarsel — det
giver en spiller der reelt er sat til at spille to kampe samtidig.

**Chris' formulering ("er der en mulighed for at VISE det") peger på visning, ikke automatisk
blokering eller automatisk ombytning** — så det foreslåede design er bevidst det simplest mulige,
der løser det han faktisk beder om:
- I `fyldOptioner()`s options-liste: for hver spiller der allerede optræder i et ANDET, aktuelt
  vist kamp-kort i samme runde (udled det ved at løbe de andre rå kamp-objekter igennem, ikke kun
  denne redigeringsboks' egne valg), tilføj en tydelig markering i selve dropdown-teksten, fx
  "Anna Rudolph (spiller allerede i Bane 2)" — synligt med det samme man åbner dropdownen, uden at
  forhindre valget (Chris kan sagtens ØNSKE at flytte en spiller fra én kamp til en anden, og skal
  ikke blokeres i at gøre det via denne visning alene).
- Ekstra sikkerhedsnet ved selve "Bekræft ændringer": hvis mindst én af de bekræftede spillere
  også findes i et andet af de aktuelt viste kamp-kort, vis en tydelig statusbesked EFTER
  bekræftelsen (fx "OBS: Anna Rudolph optræder nu i både denne kamp og Bane 2 — ret den anden kamp
  manuelt, hvis det ikke er meningen") i stedet for at forhindre selve bekræftelsen. Ren
  synlighed, ingen automatik, som ønsket.
- **Bevidst IKKE foreslået:** automatisk fjernelse af spilleren fra den anden kamp, eller et
  automatisk "byt plads med hvem der var i indgangsslottet i den anden kamp"-flow — det er en
  markant federe funktion (kræver at vide PRÆCIS hvad der skal ske med den fortrængte spiller: sat
  til at sidde over? byttet til den redigerede kamps oprindelige spiller?) og et helt separat
  designspørgsmål, som ikke er det Chris konkret bad om her ("vise det", ikke "ordne det
  automatisk"). Kan tages op som en selvstændig, større feature hvis det viser sig relevant.

**Kompleksitet:** lav — kræver kun at `fyldOptioner()`/`bekraeftRedigering()` får adgang til de
øvrige AKTUELT VISTE kamp-kort i runden (allerede tilgængelige i DOM'en, eller kan holdes i et
array parallelt med de rå match-objekter) for at kunne udlede "hvor ellers optræder denne spiller
lige nu".

**Status for alle fire punkter:** rene designforslag, ingen kode ændret i denne runde. Alle fire
punkter (inkl. punkt 3, efter afklaringen ovenfor) har nu et klart nok design til at bygges —
afventer Chris' "byg det" for det/de ønskede punkter.

## Køn på "custom"-oprettede spillere — BYGGET 2026-09-05

Chris, direkte anmodning (ikke kun diskussion denne gang): "Nu hvor spillet er kønnet, så skal man
kunne vælge om det er en dame eller herre spiller når man skal indføre en 'custom' spiller."
Relevant efter BYGGERUNDE 2026-09-05 ovenfor, hvor `koen` blev en reel, aktivt brugt egenskab
(HÅRD kønsparring i Mixed double) — uden denne rettelse ville enhver manuelt oprettet spiller
(punkt 0's "Opret spiller"-flow, for spillere uden BD-rating) mangle `koen` og derfor ALTID sidde
over i Mixed double, uanset hvilke kategorier de reelt vælger.

**Bygget i `kampsystem_source.html`:**
- Ny "Køn"-dropdown (Herre/Dame/– ukendt –) ved siden af navnefeltet i "Opret spiller"-boksen.
  `opretNySpiller()` sætter den nye spillers `koen`-felt ud fra valget (`null` hvis "– ukendt –"
  efterlades, ingen hård fejl — spilleren kan stadig oprettes og spille alle andre kategorier,
  ligesom før). Feltet nulstilles til "– ukendt –" efter hver oprettelse, ligesom navnefeltet.
- **Fandt og rettede samtidig et beslægtet hul:** `tilfoejFraSoegning()` (søg-og-tilføj fra hele
  klublisten, `GSB_ALLE_SPILLERE`) kopierede IKKE spillerens allerede kendte `koen`-felt over i
  roster-objektet, selvom `gsb_alle_spillere.json` nu har korrekt køn for alle 382 medlemmer (se
  BYGGERUNDE 2026-09-05) — en spiller tilføjet via søgning ville altså fejlagtigt fremstå som
  "ukendt køn" i Kampsystemet, selvom det rent faktisk er registreret. Rettet til at kopiere
  `spiller.koen` med over, samme mønster som `single`/`double`/`mix` allerede gør.

**Verificering:** ny dedikeret test (`test_ny_spiller_koen.js`): opretter en custom spiller som
"Dame" (får korrekt `koen: 'D'`, feltet nulstiller sig bagefter), opretter en anden uden at vælge
køn (`koen: null`, ingen fejl), og tilføjer en kendt spiller fra en simuleret klubliste via
søgefunktionen (arver korrekt `koen: 'D'` fra kildedata) — alle tre bestået. Alle 9 eksisterende
deltest (`test.js`), `test_koen.js` og `test_mixed_koen_force.js` fra tidligere runder stadig
bestået uændret.

**Leveret:** opdateret `kampsystem_source.html` skrevet tilbage til
`D:\Dropbox\gsb-claude-preview-kilde\` via enhedsbroen, samt en opdateret
`kampsystem_preview_standalone.html` sendt til Chris til test. Ingen produktionsfiler rørt.

## BYGGERUNDE 2026-09-05 (tredje runde) — Chris' "byg det" for alle fire diskuterede punkter: baner, tilstede-badge, double-prioritering, redigerings-advarsel

Chris: "Lad os få bygget det hele i previewet" — læst som "byg det" for alle fire punkter fra
"Fire nye punkter fra Chris, logget 2026-09-05"-afsnittet ovenfor, afgrænset til preview-kilden.

**1. Bane-hurtigvalg — bygget:** to nye knapper ("5 baner"/"10 baner") ved siden af "Ledige
baner"-feltet i punkt 2, sætter feltets værdi med ét klik. Standardværdien ved sideindlæsning er
sat til 5 (var 4). Det almindelige talfelt er uændret og virker stadig for alle andre tal.

**2. "Antal til stede"-badge — bygget, udvidet placering:** et lille badge ("👥 N til stede")
tilføjet ved overskrifterne i BÅDE punkt 1, punkt 2 og punkt 3 (Chris' opfølgende ønske om at det
også skal stå ved opsætning/lås-kampe, ikke kun roster-listen) — alle tre opdateres samtidig fra
samme kilde (`opdaterTilStedeBadge()`, kaldt fra `opdaterLaasDropdowns()`, som allerede køres fra
alle steder `p.tilstede`/`aktivGrupper` ændres: flueben-klik, "Vælg alle"/"Fjern alle",
gruppe-checkbokse, søgning/opret-spiller). Tæller kun spillere i de AKTIVE grupper, ligesom resten
af punkt 1.

**3. Prioritér double/mixed frem for single ved ulige antal — bygget:** ny efterbehandlings-fase
i `genererRunde()`, EFTER den oprindelige "mindste pulje"-fordeling. Beregner et forventet
oversiddertal pr. pulje (single: `n % 2`; double/mixed: 0/1/2/3 afhængig af `n % 4`, fordi både
holddannelsen og selve kampsætningen hver kan give én oversidder), og flytter derefter gradvist
"fleksible" spillere (dem der har MERE end én kategori valgt) mellem deres egne valgte kategorier,
så længe det reducerer det SAMLEDE forventede oversiddertal — ved lige gode flyt foretrækkes at
flytte UD AF single (Chris' eksplicitte prioritering), og en spiller kan flyttes til BÅDE double
og mixed (bekræftet af Chris' svar på afklaringsspørgsmålet). En statusbesked viser hvilke
spillere der blev flyttet og hvorfor. Eksplicit LÅSTE kampe (punkt 3's lås-panel) er, som allerede
noteret i designforslaget, helt uden for denne logik (taget ud af `kandidater` længere oppe i
`genererRunde()`), så Chris' regel om ikke at røre låste singler er automatisk opfyldt.

**4. Advarsel ved redigering, hvis en spiller allerede står i en anden kamp — bygget:** nyt
`rundeAlleMatches`-array der holder styr på alle kamp-objekter vist i den aktuelle runde
(bane-kampe + evt. udskiftningskampe, ryddet ved "Nulstil runde"). I redigeringsboksens
spiller-dropdowns markeres enhver spiller der allerede optræder i en ANDEN, aktuelt vist kamp med
en tydelig advarsel direkte i selve valgteksten (fx "Anna Rudolph ⚠ (spiller allerede i Bane 2)")
— ren visning, ingen blokering, som Chris konkret bad om ("er der en mulighed for at VISE det?").
Samme tjek gentages ved selve "Bekræft ændringer": hvis en bekræftet spiller stadig findes i en
anden kamp, vises en tydelig statusbesked efter opdateringen ("OBS: ... optræder nu i mere end én
kamp denne runde — ret den anden kamp manuelt"). Automatisk fjernelse/ombytning er bevidst IKKE
bygget (samme afgrænsning som i det oprindelige designforslag — det er et separat, større
designspørgsmål).

**Verificering:** ny dedikeret test (`test_runde5_features.js`) dækker alle fire punkter:
hurtigvalgsknapperne sætter feltet korrekt, badgen viser samme tal alle tre steder og opdateres
live, en pulje på 9 fleksible spillere (single+double valgt, ingen mix) ender med kun 1
oversidder efter rebalancering (det bedst mulige for et ulige antal delt mellem to
"parvise"-kategorier), og en spiller der allerede findes i en anden vist kamp markeres korrekt med
⚠ i redigeringsboksens dropdown. Alle tidligere tests (`test.js`s 9 deltest, `test_koen.js`,
`test_mixed_koen_force.js`, `test_ny_spiller_koen.js`) stadig bestået uændret — ingen af de
tidligere features er påvirket.

**Leveret:** opdateret `kampsystem_source.html` skrevet tilbage til
`D:\Dropbox\gsb-claude-preview-kilde\`, samt en opdateret `kampsystem_preview_standalone.html`
sendt til Chris. Ingen produktionsfiler rørt.

**Bevidst IKKE gjort:**
- Ingen automatisk fjernelse/ombytning af en spiller der findes i to kampe (punkt 4) — kun
  visning, som eksplicit bedt om.
- Rebalancerings-algoritmen (punkt 3) er en grådig lokal-søgning, ikke en garanteret globalt
  optimal løsning — den fanger det almindelige tilfælde og forværrer aldrig det samlede
  oversiddertal, men afprøver ikke alle mulige kombinationer for meget store/komplekse puljer.
- Standardværdien for "Ledige baner" er sat til 5 (ikke 10) — Chris kan bede om at ændre den, hvis
  10 viser sig at være det mest almindelige udgangspunkt i praksis.

Status: **alle fire punkter er bygget og testet i preview-kilden — afventer Chris' test af den
opdaterede standalone-fil.**

## Bug rapporteret 2026-09-05 (samme dag): 40 spillere + 10 baner gav 14 oversiddere i stedet for 0 — FUNDET OG RETTET

Chris, umiddelbart efter at have testet BYGGERUNDE 2026-09-05 (tredje runde) ovenfor: "Jeg har lige
genereret en runde med 40 spillere og 10 baner. Med 10 doubler giver det 0 oversiddere. Der er
lige nu 14 oversiddere."

**Rod-årsag: en langt større og mere alvorlig udgave af det samme grundproblem som punkt 3's
rebalancering (ovenfor) kun løste delvist.** Punkt 3's rettelse håndterede kun oversiddere fra
ULIGE puljestørrelser (modulo 4/2-resten inden for hver enkelt pulje) — men den oprindelige
kategori-fordeling ("læg hver fleksibel spiller i den pulje der p.t. har færrest spillere") tog
slet ikke højde for at double/mixed bruger banerne DOBBELT så effektivt som single (4 spillere pr.
bane mod kun 2). Med 40 fleksible spillere (single+double begge valgt, som er standard) endte
fordelingen med at sprede dem nogenlunde ligeligt ud over single og double efter puljestørrelse —
hvilket gav LANGT FLERE kampe i alt end de 10 tilgængelige baner kunne rumme (mange 2-mands
single-kampe i stedet for få 4-mands double-kampe). De kampe der ikke kunne få en bane blev sendt
til "sidder over" (jf. punkt 1's "venter på bane er fjernet"-regel fra BYGGERUNDE 2026-09-04) —
og fordi `autoMatches`-rækkefølgen dengang var `[...singleMatches, ...doubleMatches,
...mixedMatches]`, var det navnlig double/mixed-kampene der blev skubbet af banerne først (de stod
sidst i køen), hvilket forværrede tabet yderligere (hver fravalgt double/mixed-kamp sender 4
spillere til "sidder over" i stedet for kun 2 for en single).

**To uafhængige rettelser i `kampsystem_source.html`:**
1. **Kategori-fordelingen prioriterer nu holddisciplinerne som udgangspunkt:** en fleksibel
   spiller (der har BÅDE single og mindst én holddisciplin valgt) sættes ALTID i double eller
   mixed — ALDRIG i single — medmindre single er deres ENESTE valgte kategori. Kun
   single-only-spillere havner nu i single-puljen. Dette er en skærpelse af punkt 3's oprindelige
   "flyt hvis det gavner"-regel, som viste sig utilstrækkelig til at forhindre grove
   baneoverskridelser ved store, fleksible spillerfelter — nu er reglen "brug aldrig single
   medmindre der ikke er noget andet valg", ikke kun "flyt hvis den samlede oversidder-optælling
   forbedres marginalt".
2. **Baneprioritering vendt om:** rækkefølgen i `autoMatches` (som afgør hvilke kampe der først
   får en af de ledige baner, hvis der er flere kampe end baner) er ændret fra
   `[...singleMatches, ...doubleMatches, ...mixedMatches]` til
   `[...doubleMatches, ...mixedMatches, ...singleMatches]` — double/mixed-kampe er nu beskyttet
   og får forrang til banerne, mens single-kampe fravælges FØRST ved baneknaphed (koster kun 2
   spillere pr. fravalgt kamp mod 4 for en fravalgt double/mixed-kamp, så det minimerer det
   samlede antal spillere der ender med at sidde over).

**Verificering:** ny dedikeret test (`test_bane_kapacitet.js`) reproducerer Chris' PRÆCISE tal —
40 spillere med single+double valgt, 10 baner — og bekræfter nu 10 genererede kampe og 0
oversiddere (var tidligere langt flere kampe end baner + 14 oversiddere efter simulering af den
gamle fordelingslogik). Et ekstra scenarie med 41 spillere (ulige) bekræfter det bedst mulige
resultat: 10 kampe + kun 1 oversidder (uundgåeligt ved et ulige antal). Alle tidligere tests
(`test.js`s 9 deltest, `test_koen.js`, `test_mixed_koen_force.js`, `test_ny_spiller_koen.js`,
`test_runde5_features.js`) stadig bestået uændret.

**Leveret:** opdateret `kampsystem_source.html` skrevet tilbage til
`D:\Dropbox\gsb-claude-preview-kilde\`, samt en opdateret `kampsystem_preview_standalone.html`
sendt til Chris. Ingen produktionsfiler rørt.

**Bevidst konsekvens at være opmærksom på:** en spiller der har valgt BÅDE single og double vil nu
som udgangspunkt ALTID havne i double (aldrig i single), selv på aftener hvor der reelt er rigeligt
med baner til at spille en blanding af begge. Hvis Chris på et tidspunkt oplever at han faktisk
gerne vil have NOGLE single-kampe selvom der er plads nok (fx for variation), er det ikke noget
den nuværende logik understøtter — den optimerer udelukkende for færrest mulige oversiddere/bedst
baneudnyttelse. Kan tages op som en separat finjustering, hvis det viser sig at være et reelt
ønske i praksis.

Status: **SUPERSERET — se "OPDATERING 2026-09-05 (fjerde runde)" i `claude/gsb-kampsystem-idebank.md`
(den aktive fil). Chris afviste denne løsning ("uha nej"), fordi den fjerner single som reel
mulighed, hvilket ikke var ønsket.**
