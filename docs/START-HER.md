# START HER — kondenseret regelsæt for GSB Webapps-projektet

Læses ved starten af enhver session i dette projekt, sammen med `GSB_DREAM_TEAM_PROJECT_BRIEF.md`
og `claude/gsb-feature-idebank.md` (jf. Project Instructions).

**OPDATERET 2026-09-04 — trimmet:** denne fil var ved at blive for lang at læse hver session.
Baggrundsviden om Dropbox-mappestruktur, fil-versionering, enhedsadgang og løsfil-oprydning er
flyttet til `claude/gsb-dropbox-filstruktur.md` — slå den op når du rent faktisk arbejder med
filer på Chris' computer, men den behøver ikke genlæses hver samtale. Det der er tilbage her er
kun det der reelt er relevant for EVERY session.

**OPDATERET 2026-09-05 — nyt afsnit om store dokumenter:** to konkrete hændelser (en
placeholder-tekst der ødelagde et dokument ved en fuld genskrivning, og et helt dokument der gik
tabt uden gendannelsesmulighed — se `gsb-kampsystem-idebank.md` for et bekræftet, konkret
eksempel) har vist at fuld-genskrivnings-mekanismen for projekt-docs er en reel risiko. Nyt afsnit
nedenfor dækker det.

**OPDATERET 2026-09-07 — temp-fil til hurtige noter:** enkeltstående idéer i chatten udløste
hidtil hele backup-protokollen for én linje. Nyt afsnit nedenfor beskriver `gsb-temp-noter.md`
som et billigt mellemlag, der er bevidst UNDTAGET reglerne i "Store dokumenter".

## Standing regel — vigtigst af alt

**Intet bygges, kodes eller deployes uden Chris' eksplicitte, utvetydige "byg det"-signal for
det specifikke punkt.** At en idé står beskrevet, endda med færdigt design, betyder IKKE at den
må implementeres. Denne regel gælder hele projektet, ikke kun idébanken.

Undtagelser der løbende opdateres i `gsb-feature-idebank.md`'s egen STANDING REGEL-boks —
tjek den for den aktuelle, præcise liste over hvad der konkret ER givet go-ahead til.

## Feature-planlægning — Opus-gennemgang kun hvis Chris siger ja, aldrig automatisk

For ikke-trivielle, algoritmisk komplekse feature-idéer (Kampsystemets matchnings-/fordelingslogik
er det tydeligste eksempel — se den lange historik af "byg → Chris tester → fandt kant-tilfælde →
ret"-runder i `gsb-kampsystem-idebank.md`/`gsb-kampsystem-idebank-historik.md`) KAN en uafhængig
Opus-subagent bruges til at gennemgå idéen for edge cases/uklare punkter/designspørgsmål, FØR der
bygges noget.

- **Spørg altid Chris først, brug den ALDRIG automatisk.** Opus er markant dyrere end Sonnet —
  samme "byg det"-princip som resten af projektet, blot anvendt på selve modelvalget/
  token-forbruget: Claude foreslår at bruge Opus til gennemgangen og venter på Chris' ja, før en
  sådan subagent rent faktisk spawnes.
- **Kun for reelt komplekse idéer** — ikke simple UI-tilføjelser (en badge, en knap, en
  dropdown), hvor der ikke er meget at gennemtænke, og hvor det bare koster ekstra uden at give
  noget igen.
- Opus-gennemgangen bygger intet selv — kun en liste af edge cases/opklarende spørgsmål/et
  designforslag til Chris. Selve implementeringen sker altid i den almindelige (Sonnet-)session.
- Erstatter IKKE test med Chris' rigtige data — flere af de historiske Kampsystem-bugs kunne kun
  findes ved faktisk test (fx det specifikke 40-spiller/10-bane kønsskæve fremmøde), ikke ved
  mere gennemtænkning alene.
- Samme princip gælder det bredere strategiske review på tværs af hele projektet, se
  `claude/gsb-opus-strategisk-review-prompt.md` og `claude/gsb-roadmap.md` nedenfor.

## Dokumentkort — hvad er hvad

- **`GSB_DREAM_TEAM_PROJECT_BRIEF.md`** — arkitektur-reference for selve Dream Team-scoringen
  (Tilmeldinger → Holdoversigt → Resultater → Spillerpoint → Beregning → Stilling). Læs først
  ved spørgsmål om hvordan noget FAKTISK virker i dag. **Bemærk:** ikke opdateret siden
  2026-08-29 og afspejler hverken Kampsystem, nav/IA-omlægningen eller B5-betaling — brug
  driftloggen/status-tabellen for aktuel status, ikke denne fil, indtil den er opdateret.
- **`claude/gsb-feature-idebank.md`** — feature-idéer der ikke er statistik/spilleranalyse og ikke
  Kampsystem: Tilmelding, nav/IA, Søndagstræning, Kampkalender, Betaling. Status-linje pr. afsnit.
- **`claude/gsb-statistik-idebank.md`** — al statistik-/spilleranalyse-/rankings-relateret
  idéarbejde (Board-position/win%-dedup, sæson-sammenligning, B3-baggrund, 24/25-data-
  rekonstruktion, "værdi"/"effektivitet"-ranking, Hot streak). Samme type arbejde genbruges på
  tværs af flere features, derfor samlet ét sted.
- **`claude/gsb-kampsystem-idebank.md`** — alt om ELO-rating/Kampsystem-appen (B4). **Flyttet til
  git/Dropbox 2026-09-12 — se "Tunge logs flyttet til git" nedenfor; kun stub tilbage her.**
- **`claude/gsb-driftlog.md`** — kronologisk log, runde for runde, over hvad der faktisk ER
  shippet til de rigtige `netlify-tool-prod`-filer og testet der. Tjek denne for "hvad er
  live/shippet lige nu". **Flyttet til git/Dropbox 2026-09-12 — se "Tunge logs flyttet til git"
  nedenfor; kun stub tilbage her.**
- **`claude/gsb-roadmap.md`** — tværgående, prioriteret liste over næste skridt på tværs af ALLE
  initiativer. Levende dokument, opdateres ved det periodiske Opus-strategiske-review
  (`claude/gsb-opus-strategisk-review-prompt.md`), ikke ved hver enkelt byggerunde. Tjek denne
  for "hvad bør ske herefter" — til forskel fra driftloggen ("hvad er sket/live").
- **`claude/gsb-planlagte-features-spec.md`** — features der ER konkret aftalt i detalje, men
  endnu ikke bygget. DEL A (skal testes), DEL B (klar til bygning), DEL C (baggrundsviden),
  DEL 0 (bekræftede tekniske fakta, kun til opslag).
- **`claude/generel-idebank.md`** — ikke-GSB-specifikke kuriositeter.
- **`NEMBADMINTON_API_NOTES.md`** — samlet, ren teknisk API-reference. Genbrug fremfor at
  gen-undersøge fra bunden.
- **`GSB_NAVNE_ALIAS_OG_ANOMALIER.json`** — navnematching mellem forskellige kilders stavemåder.
- **`claude/gsb_preview.html`** — selve den byggede Claude-preview.
- **`claude/gsb-preview-vs-live-status.md`** — én tabel: er en feature 🟢 live, 🟡 kun i
  previewet, eller ⚪ kun en idé. Tjek/opdatér den hver gang noget shippes/bygges, se reglen
  nedenfor.
- **`claude/gsb-dropbox-filstruktur.md`** — Dropbox-mappenavne, fil-versionerings-konvention,
  enhedsadgang, løsfil-oprydning, samt (fra 2026-09-05) den nye backup-mappe til projekt-docs.
  Slås op ved behov, ikke standard-læsning.
- **`claude/gsb-opus-strategisk-review-prompt.md`** — opskriften/prompten til det periodiske,
  Chris-igangsatte Opus-strategiske-review der producerer/opdaterer `gsb-roadmap.md`. Slås op
  ved behov (når reviewet skal køres), ikke standard-læsning.
- **`claude/gsb-temp-noter.md`** — kortlivet samle-fil til hurtige noter fra chatten, INDEN de
  sorteres ind i de rigtige idébanker. Ikke en kilde i sig selv, og ikke standard-læsning — se
  reglen nedenfor for hvordan den bruges og tømmes.
- **`claude/gsb-kampsystem-idebank-historik.md`** — historisk arkiv for Kampsystem-idébanken.
  **Flyttet til git/Dropbox 2026-09-12 — se "Tunge logs flyttet til git" nedenfor; kun stub
  tilbage her.**
- **`claude/_arkiv/gsb-driftlog-arkiv-runde8-10.md`** — arkiveret driftlog, runde 8-10.
  **Flyttet til git/Dropbox 2026-09-12 — se "Tunge logs flyttet til git" nedenfor; kun stub
  tilbage her.**

## Tunge logs flyttet til git (2026-09-12)

Claude Projects har ingen delvis-skrivning ("in-place patch") — enhver opdatering af en
projekt-doc kræver at Claude læser og genskriver HELE filen (jf. "Filhåndtering" og "Store
dokumenter" nedenfor). For de fire tungeste, mest append-drevne logfiler i projektet var det ved
at blive et reelt token-/tidsproblem hver gang de skulle opdateres. Disse fire filer er derfor
flyttet ud af Claude Projects og ind i en git-tracket mappe på Chris' Windows-computer:

- `claude/gsb-kampsystem-idebank.md` → nu på `D:\Dropbox\gsb-claude-projekt-docs-backup\gsb-kampsystem-idebank.md`
- `claude/gsb-driftlog.md` → nu på `D:\Dropbox\gsb-claude-projekt-docs-backup\gsb-driftlog.md`
- `claude/gsb-kampsystem-idebank-historik.md` → nu på `D:\Dropbox\gsb-claude-projekt-docs-backup\gsb-kampsystem-idebank-historik.md`
- `claude/_arkiv/gsb-driftlog-arkiv-runde8-10.md` → nu på `D:\Dropbox\gsb-claude-projekt-docs-backup\gsb-driftlog-arkiv-runde8-10.md`

Mappen er et git-repo, pushet til et privat GitHub-repo ved navn `gsb-projekt-docs-backup`. De
tilbageværende entries for disse fire filer i Claude Projects er nu kun korte "stub"-pointere til
denne git-mappe — IKKE den fulde historik. De mindre, hyppigt læste regel-/reference-filer
(denne fil, `gsb-roadmap.md`, `gsb-feature-idebank.md`, `gsb-statistik-idebank.md`,
`gsb-planlagte-features-spec.md` m.fl.) BLIVER i Claude Projects, netop så enhver session — også
en der ikke er forbundet til Chris' computer — altid kan læse dem.

**Kendt, accepteret trade-off — ikke en fejl:** indhold der kun findes i git/Dropbox kan KUN
læses af en session der har enhedsbroen forbundet til Chris' computer. En session uden den
forbindelse (fx fra Chris' telefon, eller hvis desktop-appen ikke kører) kan IKKE læse den fulde
historik i disse fire filer — kun deres korte stub i Claude Projects. Dette er bevidst valgt for
at spare token/tid på de fire tungeste filer, ikke en overset begrænsning.

**Fremtidig opdatering af en af disse fire git-trackede filer:**
- En session med enhedsbroen forbundet læser filen (fx via
  `mcp__remote-devices__device_stage_files` + `Read`, eller beder Chris køre sin egen sync).
- Ændringen laves som en diff-baseret redigering (`Edit`), ALDRIG ved at hele filen skrives om
  fra bunden i én stor tekstblok — netop det denne fil-flytning skulle undgå.
- Der findes ikke noget `device_bash`-værktøj i dette miljø (bekræftet fravær, ikke en midlertidig
  mangel) — INGEN session kan selv køre `git add/commit/push`. Enten beder man Chris køre sit eget
  `sync-git-gsb.ps1`-script for at committe og pushe ændringen, eller også noteres det tydeligt at
  ændringen er lavet lokalt men endnu ikke synkroniseret (pending sync), så det ikke glemmes.

## Preview vs. live — hold status synlig, ikke kun i prosa

- **Når noget bygges KUN i previewet:** opdatér rækken i `gsb-preview-vs-live-status.md` til 🟡,
  med en konkret gap-note (hvilke filer/dele mangler i produktion).
- **Når noget shippes til `netlify-tool-prod`:** opdatér rækken til 🟢 i SAMME session som selve
  shipningen, ikke som en efterfølgende oprydning.

## Filhåndtering — hold docs små, opdatér efter emne

Claudes projekt-docs har INGEN in-place-patch — enhver ændring kræver at HELE filen genskrives.
Derfor er projektet splittet efter EMNE, ikke mekanisk "én fil pr. feature":
- Runde-opdateringer/bug-fixes → `gsb-driftlog.md`.
- Kampsystem/ELO → `gsb-kampsystem-idebank.md`.
- Statistik/spilleranalyse/rankings (uanset hvilken feature) → `gsb-statistik-idebank.md`.
- Ren Nembadminton-API-teknik → `NEMBADMINTON_API_NOTES.md`.
- Resten (Tilmelding, nav/IA, Søndagstræning, Kampkalender, Betaling) → `gsb-feature-idebank.md`.
- Splittes kun når et emne reelt er blevet stort/aktivt nok til selv at være et churn-problem
  (som Kampsystem og Statistik/Analyse har vist sig at være) — ikke som en generel regel om én
  fil pr. feature.
- Når noget er FÆRDIGT (shippet, eller flyttet til spec-filen som B-punkt), trim afsnittet i
  idébanken til en kort status-pointer i stedet for at lade den fulde byggehistorik blive
  stående.
- **Enkeltstående, hurtige noter fra chatten går IKKE direkte i disse filer** — se næste afsnit.

## Hurtige noter i chatten — temp-fil, ikke direkte i idébank

Én enkelt idé i chatten udløste hidtil hele protokollen i "Store dokumenter" nedenfor (frisk
læsning + evt. backup + genskrivning af en stor idébank-fil) — spild af tid/tokens for én linje.
I stedet går hurtige noter i **`claude/gsb-temp-noter.md`**: en lille, kortlivet samle-fil, ikke
en autoritativ kilde.

- **Skrivning til temp-filen er UNDTAGET fra backup-reglerne (D) i "Store dokumenter" nedenfor**,
  uanset filens størrelse — den er bevidst disponibel. Mistes den, mistes kun et par dages
  usorterede noter, ikke den autoritative idébank. Frisk læsning (B) og ingen placeholder (A)
  gælder stadig, men er billige for en lille fil.
- Hver note tilføjes kort med dato og et emne-hint, fx `- [2026-09-07] Kampsystem: ...`, så
  sorteringen ved tømning er hurtig.
- **Tøm ALDRIG temp-filen automatisk.** Foreslå tømning til Chris når filen vokser sig stor
  (tommelfingerregel: omkring 15-20 noter, eller når den nærmer sig et par hundrede ord) — eller
  når Chris selv beder om det (fx "saml temp ind"). Vent på et udtrykkeligt ja, før tømningen
  udføres.
- **Ved tømning:** læs temp-filen frisk, sortér hver note til den rigtige idébank efter
  emne-inddelingen i "Filhåndtering" ovenfor, og skriv dem ind i målfilerne — HER gælder den
  fulde protokol i "Store dokumenter" nedenfor uden undtagelse (frisk læsning af målfilen,
  størrelsestjek, backup hvis over grænsen, stop-betingelser). Når alle noter er flyttet,
  nulstilles temp-filen til tom/kun header — denne sidste skrivning kræver ingen backup (samme
  undtagelse som ovenfor).

## Store dokumenter — ingen data må gå tabt ved en fuld genskrivning

Fordi projekt-docs ikke har in-place-patch (se ovenfor), er enhver opdatering en fuld
genskrivning af hele filen — og der findes INGEN indbygget versionshistorik/fortryd for
projekt-viden (bekræftet, ikke antaget). En fejl her er derfor ikke automatisk gendannelig. To
konkrete hændelser har vist konsekvensen: en placeholder-tekst ("[resten uændret]"/
"$(cat existing)") indsat i stedet for det faktiske indhold, og et helt dokument tabt uden
gendannelsesmulighed.

**A. Ingen placeholder, nogensinde, i nogen fil.** En fuld genskrivning må ALDRIG indeholde
stedfortræder-tekst for indhold der skal bevares — hverken "[uændret]", "[resten uændret]",
"$(cat ...)", "// unchanged", "..." ved et afsnitsskel eller lignende. Alt der skal bevares,
skal stå fysisk og fuldt ud i teksten der sendes til `project_write`. Gælder ALLE filer,
uanset størrelse — ingen undtagelser.

**B. Altid frisk læsning, samme tur.** Før enhver fuld genskrivning: kald `project_read` på
filen IGEN i samme tur — byg aldrig den nye version ud fra en kopi tidligere i samtalen. Dette
kald er også det der bruges til størrelsestjekket i C.

**C. Størrelsestjek — dynamisk, IKKE en fast liste over filnavne.** Mål filens længde ud fra det
`project_read` netop returnerede. Er den over ca. 1.500 ord (~9.000-10.000 tegn), gælder D+E+F
nedenfor. Dette er bevidst uafhængigt af hvilken fil det er — en helt ny idébank-fil oprettet til
en fremtidig feature kvalificerer automatisk den dag den vokser forbi grænsen, uden at denne
fil skal opdateres med et nyt filnavn.

**D. Backup før skrivning, for filer over grænsen (C).** Skriv en kopi af det FRISKE indhold
(fra B, før noget ændres) til Dropbox-mappen `D:\Dropbox\gsb-claude-projekt-docs-backup\`, under
SAMME filnavn som originalen (fx `gsb-driftlog.md`) — IKKE tidsstemplet, så Dropbox's egen
versionshistorik automatisk holder styr på tidligere versioner (efter dit abonnements
retention-periode). Kræver at enhedsbroen til Chris' computer er forbundet i øjeblikket.
**Er den ikke forbundet:** skriv i stedet en tidsstemplet kopi som en projekt-doc,
`claude/_backups/<filnavn>_<ÅÅÅÅ-MM-DD>.md`, og behold kun de seneste 2-3 af den slags pr. fil
(slet ældre, aldrig den nyeste eller selve hovedfilen). Kun EFTER backuppen er skrevet (den ene
eller den anden vej), skrives den nye version til den rigtige fil.

**E. Sub-agent til selve flet-arbejdet, for filer over grænsen (C) — PÅKRÆVET, ikke valgfrit.**
For filer over grænsen SKAL selve genskrivningen uddelegeres til en sub-agent (via `Agent`-værktøjet)
med et snævert opdrag: læs hele filen (frisk, jf. B), indsæt/opdatér præcis det beskrevne, skriv hele
det nye dokument til Dropbox-backup (D) og derefter til selve filen (`project_write`) — eksplicit
instrueret i regel A, og bedt om selv at rapportere størrelse/hash-verifikation tilbage. Formålet er
IKKE kun kvalitet — det er at undgå at hele det store dokuments indhold skal læses ind i og skrives ud
af selve hovedsamtalens kontekst (typisk to gange: én gang ved læsning, én gang ved skrivning), hvilket
er en direkte og unødvendig token-/usage-omkostning i hovedsessionen. At gøre det selv i stedet for at
uddelegere er en fejl, ikke bare en gråzone — også selvom opgaven virker simpel eller hastende. For
filer under grænsen er almindelig direkte redigering (med A+B) fint, ingen sub-agent nødvendig.

**F. Stop-betingelser efter skrivning, for filer over grænsen (C).** Efter `project_write`:
tjek at den nye længde ikke er markant kortere end den gamle (>15-20%) uden at det var en
bevidst oprydning/split, at ingen af regel A's placeholder-mønstre optræder i den nye tekst, og
at afsnitsoverskrifter andre filer eksplicit henviser til (fx "se X, BYGGERUNDE ...") stadig
findes. Slår noget af dette fejl: STOP, opgaven er IKKE færdig — flag det til Chris i stedet for
at fortsætte eller antage det nok er fint.

## Synkronisering mellem idébank og spec-fil

Der er INGEN automatisk sammenhæng mellem idébankerne og `gsb-planlagte-features-spec.md` — kun
Claude der husker at opdatere begge, hver gang en feature-diskussion rykker sig.
- Så snart en feature er aftalt i detalje (scope/arkitektur låst), FLYTTES den til spec-filen
  som et DEL A/B-punkt, og idébankens afsnit erstattes af en kort henvisning ("Landet som Bx, se
  spec-filen"). B1, B3, B4 er skabelonen.
- Så snart et konkret, blokerende spørgsmål dukker op for en næsten-aftalt feature, får det sit
  eget nummererede DEL A-punkt, med feature-afsnittet henvisende til det som blokering.
- Dette skal ske LØBENDE, under selve samtalen — ikke som en separat oprydningsrunde bagefter.
