# Opgave 088a — intern kortlægning: gruppetyper, dækning, klub-cap-filter, Roskilde/Gentofte-testcases

**Trin:** Del 1 af 3 (088a/088b/088c) i en ny undersøgelsesrunde udsprunget af at 087's hold-matching gav
svage, forvirrende resultater. En Opus-tænkeagent (godkendt af Christoffer) analyserede antagelserne bag
085-087 og konkluderede at meget af det vi har forsøgt at UDLEDE via matching-heuristikker sandsynligvis
allerede står EKSPLICIT i vores egen, allerede hentede data — vi skal kortlægge det først, før mere
gætte-baseret arbejde. Denne opgave (088a) er den rent interne del: intet nyt hentes, kun det vi allerede
har i `liga-landskab.db` og de rå gemte HTML-svar bruges.

**Gren:** `arbejde/088a-intern-kortlaegning-og-testcases`, fra `main`.

**Baggrund:**

Tre konkrete fund udløste denne opgave:

1. **Ligaens egen op-/nedrykningsstruktur var aldrig undersøgt specifikt** (086e dækkede kun tværgående
   regler som klub-cap og pulje-adskillelse, ikke selve niveaupar-strukturen). Direkte PDF-citat fra
   2026-reglementet (§17-18) viste at nr. 7-8 i Ligaens grundspil BLIVER i Ligaen, nr. 9 spiller
   kvalifikationskamp mod 1. divisions nr. 2, og KUN nr. 10 rykker automatisk og ubetinget ned — dvs. der
   er IKKE et fast antal nedrykkere pr. sæson (1 eller 2, afhængig af en enkelt kamps udfald).
2. **Database-forespørgsel viste at `league_groups.group_name_raw` ofte eksplicit navngiver strukturen**
   — fx for 2024: "Grundspil", "Kvartfinaler", "Semifinaler", "Guldkamp", "Bronzekamp", "Kvalifikationskamp
   liga/1. division", "Kvalifikationskamp nr. 8-9". For 2019: "Nedrykning fra Badmintonligaen" som egen
   gruppe. Navngivningen er dog IKKE konsistent år for år (skifter mellem "Ligakvalifikation",
   "Kvalifikationskamp mod 1. division", "Kvalifikationskamp til Ligaen", "Kvalifikationskamp liga/1.
   division" for beslægtede ting).
3. **Christoffer bekræftede at klub-cap kan FORSKYDE hvilken placering der reelt er "den relevante" i en
   kval-kamp** — konkret eksempel: sidste år var det nr. 2 OG 4 fra 2. divisions oprykningsspil (ikke nr. 2
   og 3), fordi Gentofte allerede havde 2 hold over Gentofte 3, så Gentofte 3's oprykningsret blev sprunget
   over (§26-cap) og nr. 4 trådte i stedet. Dvs. placeringstal er IKKE statiske — de skal filtreres gennem
   klub-cap-berettigelse pr. sæson FØR de bruges til noget som helst. Han nævnte desuden en uforklaret
   anomali: **Badminton Roskilde lå nr. 4 i 3. divisions nedrykningsspil og "burde" have været sikre, men
   endte alligevel i nedrykningskvalspil** — matcher ingen kendt regel endnu.

**Vigtigt princip for denne opgave:** søg først i det vi allerede har (rå HTML-fodnoter, W/O-markeringer,
næste sæsons faktiske puljeindplacering) før noget som helst udledes via matching-heuristik. Næste sæsons
puljeindplacering ER selve facit for hvem der endte hvor, uanset hvilken regel der lå bag.

## Mål

1. **ID-jagt i rå kildedata.** Scan et repræsentativt udsnit af de gemte rå HTML-svar (`raw_source_file`/
   tilsvarende felter i `standing_indexes`/`league_matches`) for stabile hold- eller klub-ID'er der IKKE
   allerede er udtrukket til strukturerede kolonner (fx i href-links, data-attributter, skjulte felter).
   Dette er det billigste, potentielt mest afgørende tjek: hvis et stabilt ID findes, kan store dele af
   087's identitetsproblem forsvinde. Rapportér klart ja/nej, og hvis ja, hvor det ligger og om det er
   stabilt på tværs af sæsoner (test det konkret, fx på GSB).
2. **Byg et komplet katalog over alle `division_name_raw`/`group_name_raw`-kombinationer i hele databasen**
   (alle niveauer, alle regioner, alle 17 sæsoner) med antal forekomster, første/sidste sæson, og antal
   distinkte regioner. Klassificér hver ind i en type: `grundspil`, `slutspil`, `oprykningsspil`,
   `nedrykningsspil`, `kvalifikation_op`, `kvalifikation_ned`, `andet/ukendt`. Byg dette som en tabel
   (`group_type_katalog` eller lignende) i `liga-landskab.db`, klart afgrænset og ny. Flag tvivlstilfælde
   eksplicit til Christoffers godkendelse i "Spørgsmål" — gæt ikke klassifikationen for de uklare.
3. **Byg en dæknings-matrix**: region × sæson × antal divisioner/niveauer × antal hold. Markér tydeligt
   brud (pludselige spring i antal divisioner eller hold) — disse er kandidater for enten
   strukturomlægninger (jf. at Christoffer ikke selv kunne huske hvornår sidst) eller huller i det hentede
   datasæt (ikke det samme som reelt "forsvundne" hold).
4. **Sæson-sanity-tjek**: for mindst 3 kendte sæsoner, bekræft at `season_id` faktisk matcher de rå
   kampdatoer (fx sæson 2019 = kampe i efterår 2019/forår 2020, ikke omvendt).
5. **Scan rå HTML for fodnoter/markeringer** uden for selve resultat-tabellerne — søg efter mønstre som
   "trukket", "udgået", "tvangsnedrykket", "W/O", "walkover", hold med 0 kampe. Byg en liste over fundne
   markeringer med kontekst (hvilket hold, hvilken pulje, hvilken sæson).
6. **Roskilde-testcase (afgrænset, budget: et par timer, stop når forklaret ELLER budgettet er brugt).**
   Undersøg i denne rækkefølge, stop så snart et svar findes:
   a. Vores egne data: parsing af den specifikke sæson/pulje, rå HTML-fodnoter, W/O-markeringer omkring
      Roskilde og de øvrige hold i samme nedrykningsspil.
   b. Om en anden klubs klub-cap-berettigelse eller afbud i samme sæson kan have flyttet grænsen
      (samme mekanisme som Gentofte-sagen, se Mål 7).
   Hvis stadig uforklaret efter a+b: log det som en kendt, uløst anomali i resultatnoten — pres det ikke
   videre, det går videre til 088c (Christoffers direkte kontakt til BD).
7. **Gentofte-testcase (positivt eksempel, valider cap-filter-modellen).** Byg og test en konkret
   cap-filter-model ud fra Christoffers beskrevne Gentofte-eksempel: en klub med allerede 2 hold over et
   givent hold i en oprykningsrække skal have det pågældende holds oprykningsret sprunget over, så næste
   berettigede placering rykker op i stedet. Valider modellen mod den faktiske, kendte Gentofte-sag.
   Rapportér om modellen reproducerer det korrekte, kendte udfald.

## Kontekst

- `statistik/results/086-liga-hierarki-viden-samlet.md` — det samlede facit-dokument, skal opdateres når
  denne opgave er færdig.
- `work/loeste/086e-regler-dybde-og-fuld-revision.md`/`.json`, `work/loeste/087-holdidentitet-paa-tvaers-af-saesoner.md`
  (og dens runde 1-4-tillæg) — den hidtidige, delvist utilstrækkelige tilgang denne opgave skal forbedre
  grundlaget for.
- `statistik/data/liga-landskab.db` — `league_groups`, `league_group_regions`, `league_matches`,
  `match_categories`, `standing_indexes` (rå HTML ligger her eller i tilknyttede rå-fil-referencer).

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/088a-*`), nye scripts under
`statistik/scripts/`, nye afledte tabeller i `liga-landskab.db` (gruppetype-katalog, evt. cap-filter-
resultater) — beskriv dem eksplicit i "Spørgsmål" før de bygges endeligt.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses), `statistik/data/rangliste-historik.db`,
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. **INGEN nye API-kald og INGEN ekstern
websøgning i denne opgave** — 088a er bevidst 100% intern, kun allerede hentet data. Ekstern søgning hører
til 088b/088c, som Christoffer har godkendt separat.

## Kontrol

**Målet:**
```
Der er et klart, dokumenteret svar på om der findes et stabilt hold-/klub-ID i rå kildedata.
Et komplet gruppetype-katalog findes, med tvivlstilfælde flaget til Christoffer, ikke gættet.
En dæknings-matrix identificerer brud (strukturomlægning vs. datahul) uden at forveksle dem.
Roskilde-sagen er undersøgt inden for det afgrænsede budget — enten forklaret, eller logget som kendt,
  uløst anomali klar til 088c.
Gentofte-cap-filter-modellen reproducerer det faktiske, kendte udfald.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye API-kald, ingen ekstern websøgning i denne opgave.
Ingen gruppetype-klassifikation eller cap-filter-konklusion uden enten en direkte kildehenvisning
  (data) eller en eksplicit "uklar, spørg Christoffer"-markering.
```

**Skøn:** ingen på selve klassifikationerne — flag tvivl, gæt ikke. Roskilde-budgettet (et par timer) er
et skøn Codex selv styrer, men stop-reglen er hård: gæt ikke en forklaring frem, log som uløst i stedet.

## Ved tvivl

Er en gruppenavns-type uklar, eller er et databrud i dæknings-matrixen ikke oplagt struktur- vs.
datahul-relateret: dokumentér som uafklaret og spørg Christoffer i "Spørgsmål", i stedet for at antage.
Samme princip som resten af projektet.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)
**Arbejdsnotat før afledt tabel bygges (2026-09-23):** Foreslået tabel er `group_type_katalog` med primærnøgle `(division_name_raw, group_name_raw)`, felterne `group_type`, `classification_basis` (regel/navneord eller `uklar`), `occurrence_count`, `first_season_id`, `last_season_id`, `distinct_region_count` og `generated_at`. Den indeholder kun afledt, genopbyggelig klassifikation; den ændrer ingen importerede råtabeller. Dækningsmatrix, rå-markeringer og cap-testcase skrives først til resultatrapport/JSON, fordi de er analyseresultater frem for stabile grundentiteter.

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`. Opdater desuden
`statistik/results/086-liga-hierarki-viden-samlet.md` med det nye facit om gruppetyper og cap-filteret.)*

### Arbejdsresultat — første interne gennemkørsel (2026-09-23)

- **ID-jagt:** Et jævnt fordelt udsnit på 500 gemte indeks-/puljesider gav 1.409 `ShowStanding('3', ...)`-forekomster. De er `leagueGroupTeamID`, allerede lagret i `league_group_teams`, og er pulje-/sæsonlokale. Der var 0 `clubId`, `data-club-id`, `teamId` eller `data-team-id`-markører. Der er derfor endnu ikke fundet et stabilt tværsæson-klub- eller hold-ID i rå HTML.
- **Gruppetype-katalog:** `group_type_katalog` er oprettet som dokumenteret ovenfor og indeholder 8.928 distinkte `(division_name_raw, group_name_raw)`-kombinationer for 18.546 puljer. 1.757 puljeforekomster (939 distinkte navnekombinationer) er `andet/ukendt`; de er ikke automatisk fortolket.
- **Rå markeringer:** Scan af alle gemte indeks- og puljesider fandt 2.407 træf for `trukket`, `udgået`, `tvangsnedrykket`, `walkover` eller `W/O` på 1.729 sider; kontekstprøver ligger i resultatets JSON.
- **Behov for konkret testcase-reference:** Kortet angiver hverken sæson eller pulje for Roskilde-sagen eller Gentofte-sagen. Den brede tekstsøgning giver mange kandidater, men kan ikke reproducere det kendte udfald uden at gætte. Christoffer bedes derfor angive sæson og mindst én pulje-/gruppenøgle eller den konkrete kamp/placering for hver testcase.

### Testcase-præcisering fra Christoffer (2026-09-24)

- **Roskilde:** sæson 2025/26, `league_group_id=17913`, *3. division — Nedrykning fra 3. division pulje B*, efterfulgt af `league_group_id=17915`, *3. division — Kvalkampe: Nedrykning til DS*. Kampene er `505716` og `505717`.
- **Gentofte:** sæson 2025/26: `17894` (*2. division — Kvalifikation til 1. division*), `17891` (*1. division — Kvalifikationskampe til 1. division*), `17890` (*1. division — Nedrykning fra 1. division*) og `17880` (*Badmintonligaen — Grundspil*). Gentofte 2 havde sikret overlevelse i 1. division og Gentofte 1 i Ligaen. Christoffer oplyser, at kvalkampe først afgøres, når det ordinære slutspil er færdigt.

### Testcase-resultat (2026-09-24)

- **Roskilde:** 17913 har Badminton Roskilde som nr. 4 (4 kampe, 2 vundne, 31-21 i score, 70-48 i sæt, 79 point). I 17915 slog Roskilde Dalum Hjallese 7-6 den 18-04-2026 (`external_match_id=505717`). Der er ingen `trukket`/`udgået`/W/O-markering i den gemte rå HTML for hverken 17913 eller 17915. Datasættet dokumenterer derfor kvalforløbet, men forklarer ikke regelgrundlaget for at nr. 4 skulle i kvalkamp; det sendes til 088b/088c uden gæt.
- **Gentofte:** G1 er nr. 5 i Liga-grundspillet (17880), G2 nr. 3 i 1.-divisions-nedrykningsspillet (17890), og G3 nr. 3 i 2.-divisions-kvalifikationen (17894). G3 er ikke med i 1.-divisions-kvalkampene (17891), mens nr. 4 Lyngby er med. Det stemmer med Christoffers cap-forklaring: G1 og G2 er allerede placeret over G3, og næste berettigede placering træder ind. Datamønstret reproducerer udfaldet, men den præcise juridiske cap-regel og alle grænsetilfælde er 088b's opgave.
