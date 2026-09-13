# LOG-ENTRY (klar til indsættelse i claude/gsb-driftlog.md og claude/gsb-kampsystem-idebank.md)

**VIGTIGT:** Projects-værktøjet blev deaktiveret midt i denne session (efter research-fasen, før
selve loggeskridtet) — jeg kunne derfor IKKE skrive denne log ind i de rigtige projekt-docs via
`project_write`, på trods af at det er et krævet trin i opgaven. Denne fil er en stand-in: indsæt
teksten nedenfor i `claude/gsb-kampsystem-idebank.md` (nyt afsnit øverst, efter research-fasens
sidste "trettende runde"-afsnit) og et kort resumé i `claude/gsb-driftlog.md`, næste gang
Projects-værktøjet er tilgængeligt igen. Følg START-HER.md's fulde protokol for store dokumenter
ved den indsættelse (frisk læsning, backup, stop-betingelser) — ingen undtagelse.

---

## OPDATERING 2026-09-07 — kampsystem_source.html GENOPBYGGET 100% FRA DOKUMENTATION efter regression

**Baggrund:** `kampsystem_source.html` i `gsb-claude-preview-kilde` var på et ukendt tidspunkt
regredieret til en 2026-09-01-version (53.822 bytes, kun grundstruktur — ingen 3-faneopdeling,
ingen banekapacitets-planlægger, ingen oversidder-rotation, ingen udskiftningssingle/-double,
ingen tving-til-teknik, ingen gentagelses-undgåelse, ingen Normal rolle, m.fl., alt sammen bygget
2026-09-04/05). Ingen Dropbox-versionshistorik at gendanne fra. Chris bad om 100%
dokumentations-baseret genopbygning.

**Metode:** hele `claude/gsb-kampsystem-idebank-historik.md` og den aktive del af
`claude/gsb-kampsystem-idebank.md` blev læst og brugt til at rekonstruere en kronologisk
feature-liste, med særlig vægt på de fire eksplicitte konfliktpunkter hvor en tidligere version
blev overhalet: (a) "altid double" blev afvist af Chris ("uha nej") og erstattet af den
banekapacitets-bevidste x-søgning (fjerde runde 2026-09-05); (b) "auto-udskiftningsbane" (tolvte
runde) var en misforståelse, erstattet af den korrekte 3-/5-på-banen-model (trettende runde); (c)
"Normal rolle" gik fra tre kategorier til kun single/mix (double altid underforstået); (d) "Skal
spille" flyttet tilbage til Kør runde-fanen. Kun de ENDELIGE versioner er bygget.

**Genopbygget (ny arkitektur, ren rekonstruktion — ikke en kodediff mod den tabte original):**
- Kernemotor (`engine.js`, testet isoleret med Node) + fuld browser-app (`app.js`, ~640 linjer)
  med samme algoritmiske regler som dokumentationen beskriver: Elo K=70/divisor=850,
  `pairSingles`/`formTeams`/`formTeamsMixed` (hård kønsparring i Mixed), `forsoegKoensblanding`
  (blød præference i Double, hold-gennemsnit, øverste ~35%), kønsbevidst double/mixed-t-søgning
  (`kaonsbevidstFordeling`), banekapacitets-bevidst x-søgning (afprøver alle x fleksible-til-single,
  minimerer oversiddere, tie-break: flest kampe, så flest singler), delvist-låst-kamp-reservation
  (reserverer kandidater FØR optimeringen, uløselige tilfælde falder til "sidder over" i stedet for
  at forsvinde), gentagelses-undgåelse (`moedeAntal`, 5-runders rullende vindue), tving-til-teknik
  (`Math.ceil(n/4)`-reservation FØR kategorioptimering), teknik-loft (opportunistisk), udskiftnings-
  single/-double (absorberer præcis 1 ekstra spiller, ingen ratingændring), to rullende 10-runders
  retfærdigheds-tællere (`oversidderHistorik`/`udskiftningsHistorik`), "Bekræft runde" som eneste
  sted tællere ændres (`genererRunde` er ren preview), "Nulstil runde" med korrekt rollback.
- 3-faneopdeling (Kør runde / Spillere / Historik & statistik), A5-fix (lås-dropdowns nulstilles
  til "– auto –" efter tilføjelse), Normal rolle forenklet til single/mix (double altid inkluderet,
  `forudfyldModesFraNormal` sætter altid double:true når aktiv), "Skal spille" og "Tving til
  teknik" på Kør runde-fanens roster-tabel, "↻ Opdater standarder"-knap, bane-hurtigvalg (5/10),
  tilstede-badge (3 steder), H2H (én dropdown + kategori-filter + "makker mest med"), simpel
  kamp-redigering (prompt-baseret — se forbehold nedenfor), kamplog, ratingtabel.
- Roster: 61 spillere genskabt fra `build3.py`s `KAMPSYSTEM_ROSTER`, med to rettelser lagt oven på
  den regredierede base: Rosa Hinge Carlsson/Sylvester Østberg/Louis Toftlund flyttet til gruppen
  "Ungsenior" (var faldet tilbage til "Senior" i den regredierede fil), og et `koen`-felt
  tilføjet pr. spiller. `build3.py` er opdateret til at matche og synkroniseret til Dropbox.

**VIGTIGT FORBEHOLD — hvad er rekonstrueret, ikke bekræftet ægte data:**
- **`koen`-feltet på alle 61 roster-spillere er REKONSTRUERET ud fra fornavns-mønstre, IKKE den
  oprindelige Nembadminton-`memberStats`-seeding fra BYGGERUNDE 2026-09-05.** Den seeding er tabt
  sammen med resten af regressionen (den staged kopi af `gsb_alle_spillere.json` har heller intet
  `koen`-felt). Andreas Drasbek og August Carl Toftager-Larsen er sat til "H" efter Chris' eksplicitte
  bekræftelse i idébanken (niende/tiende runde) — resten er et kvalificeret gæt ud fra danske
  fornavne. **Bør verificeres/rettes af Chris, især for tvetydige navne.**
- **`gsb_alle_spillere.json` (382-spiller klubliste) har IKKE fået et `koen`-felt** i denne
  genopbygning (for stort at rekonstruere pålideligt for alle 382 i denne omgang) — kopierings-
  logikken i `tilfoejFraSoegning()` er bygget til at overtage `koen` når det findes, men indtil
  filen rent faktisk har feltet, vil søgnings-tilføjede spillere mangle køn (samme adfærd som før
  BYGGERUNDE 2026-09-05's seeding).
- **Chris' faktiske `chris_export_40.json`-testfixture (24H/15D/1 ukendt, brugt til at verificere
  t=14/7 mixed+3 double) findes ikke længere** — testet i stedet med et SYNTETISK datasæt med samme
  køns-/antalsfordeling (24H/15D/1 ukendt, alle fleksible). Algoritmen gav korrekt t=14/7 mixed+3
  double på det syntetiske datasæt, hvilket er en matematisk egenskab af antalsfordelingen (ikke af
  de specifikke ratings) — men er IKKE en gengivelse af den historiske, bekræftede fixture.
- **Kamp-redigering ("✎ Rediger kamp") er bygget som en simpel prompt-baseret tekst-editor**, ikke
  den fulde dropdown-baserede UI med live ⚠-advarsler i selve select-elementerne som beskrevet i
  designforslagene — den underliggende regel (intet committes før bekræftelse, `lockedMatches`
  røres aldrig, advarsel hvis en spiller ender i to synlige kampe) er implementeret, men UI-fladen
  er forenklet af tidshensyn.
- **"Eksportér testdata"-knappen er IKKE genopbygget** i denne omgang — var en fejlsøgningsfacilitet,
  ikke en kernefunktion, og udelades bevidst for at holde omfanget realistisk.
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

**Leveret:**
1. `kampsystem_preview_standalone.html` (94.492 bytes, 61-spiller roster indlejret) sendt som
   downloadbar fil.
2. **Backup taget FØR overskrivning:** den gamle (forkerte, regredierede) standalone-fil kopieret
   til `D:\Dropbox\gsb-claude-preview-kilde\kampsystem_preview_standalone_BACKUP_2026-09-07.html`
   (103.336 bytes, byte-for-byte-verificeret læst tilbage). Samme mønster for `build3.py`
   (`build3_BACKUP_2026-09-07.py`, 35.028 bytes).
3. Ny `kampsystem_source.html` (48.758 bytes, med `__ROSTER_JSON__`/`__ALLE_SPILLERE_JSON__`-
   pladsholdere bevaret til build3.py's substitution) skrevet til
   `D:\Dropbox\gsb-claude-preview-kilde\kampsystem_source.html`.
4. Ny `kampsystem_preview_standalone.html` skrevet til samme mappe (overskriver den gamle, efter
   backup i punkt 2).
5. `build3.py`s `KAMPSYSTEM_ROSTER` opdateret (Ungsenior-gruppe + `koen`-felt) og skrevet til
   samme mappe.
6. **Read-back-verifikation udført og bestået for ALLE tre skrevne filer** — hver fil blev læst
   tilbage fra Dropbox umiddelbart efter skrivning og SHA-256-hashet mod den lokale kopi der blev
   sendt: `kampsystem_source.html` (68bf1ccf…), `kampsystem_preview_standalone.html`
   (4a756464…), `build3.py` (9cf7ace2…) — alle tre byte-identiske, størrelser og tidsstempler
   matcher. Ingen af de tidligere sessioners "rapporterede som gennemført, men filen forblev den
   gamle"-fejl er gentaget her.
7. **Rørt IKKE:** `netlify-tool-prod` eller nogen produktionsfiler. **Bygget IKKE og deployet
   IKKE:** Sheets-persistens-kandidatfunktionerne (de findes slet ikke i denne genopbygning —
   se forbehold ovenfor).

**Status:** kernealgoritmen (banekapacitets-planlægger, kønsbevidst Mixed/Double-fordeling,
teknik/udskiftning, gentagelses-undgåelse, Normal rolle, Skal spille) er genopbygget og verificeret
mod alle de tal Chris/dokumentationen har bekræftet historisk. UI'en er en funktionel, men
simplificeret genopbygning (se forbehold) — afventer Chris' egen test af den leverede
standalone-fil, især: (a) at det rekonstruerede `koen`-felt er korrekt for alle 61 spillere, (b) at
kamp-redigerings-flowet (prompt-baseret) er acceptabelt eller skal bygges om til den fulde
dropdown-UI, (c) om Sheets-integrationen skal bygges ind igen i en opfølgende session.
