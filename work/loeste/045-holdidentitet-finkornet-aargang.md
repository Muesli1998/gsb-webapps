# Opgave 045 — hold-identitet skal bruge specifik årgang, ikke de fire grove buckets

**Trin:** Results (fortsat rettelse af opgave 044 — 044's fix var utilstrækkelig)

**Gren:** `opgave-045-holdidentitet-finkornet-aargang`, jf. AGENTS.md.

**Baggrund:** opgave 044 bekræftede navnekollisionen (472 distinkte
`team_id` mod kun 11 `name_raw`) og rettede "winrate pr. hold"/"kamptal
pr. hold" i 042 og 043 til at gruppere på `name_raw` + en aldersgruppe.
Men den aldersgruppe der blev brugt er den GROVE 4-buckets-inddeling fra
opgave 038/043 (`Senior`/`U09-U15`/`U17-U19`/`Veteran`) — det var Claudes
eget forslag i opgavekortet, og det var en fejl.

Chris' bilag (2026-09-15, GSB 2025/2026-holdoversigt) viser at "Gladsaxe
Søborg 1" er FIRE forskellige fysiske hold inden for selve
"U09-U15"-bucketen alene (ét i U09, ét i U11, ét i U13, ét i U15) — de
kollapser derfor stadig sammen med den nuværende rettelse. Samme problem
gælder "Veteran"-bucketen (SEN+40/50/60/70's hver sit "hold 1" bliver
til én identitet). Resultatet: 27 holdidentiteter i den rettede rapport
er stadig for lavt til at være korrekt, jf. bilagets ca. 48 tydeligt
forskellige hold i 2025 alene på tværs af alle årgange.

**Chris' bilag genbruges fra opgave 044** — se `work/loeste/
044-hold-identitet-navnekollision.md`s "Bilag"-afsnit for den fulde
liste.

---

## Mål

1. Erstat den grove `age()`-bucket-funktion (brugt i 042 og 043's
   hold-identitet, IKKE i deres øvrige aldersgruppe-brug som fx opgave
   038's Test & Validation-arbejde — rør ikke den brug) med den
   SPECIFIKKE `age_group_id`-værdi eller et læsbart navn for den
   (fx "U09", "U11", "U13", "U15", "U17/U19", "Senior", "SEN+40",
   "SEN+50", "SEN+60", "SEN+70" — brug samme mapping som allerede er
   dokumenteret i `docs/statistik-plan.md`/opgave 037-038: 1=Senior,
   2/3/4/5=U09/U11/U13/U15, 6=U17, 18=U19, 9/11/12/13/17=veterangrupper).
   Bekræft den præcise id→navn-mapping direkte i databasen (`SELECT
   DISTINCT age_group_id, league_raw FROM competitions`) i stedet for at
   tage den for givet — der kan være uddybet/ændret siden opgave 037/038.
2. Ny hold-identitet: `name_raw + specifik årgangs-værdi fra punkt 1`.
3. **Bekræft eksplicit, med SQL, at dette korrekt SLÅR SAMMEN de
   tilfælde der SKAL slås sammen** (grundspil/slutspil af samme hold
   samme sæson, og DMU-holdtræf vs. BD-liga for samme hold/årgang/sæson)
   — altså at disse deler samme `age_group_id` selvom de har forskellig
   `competition_id`/`league_raw`. Hvis det viser sig at DMU-holdtræf og
   BD-liga registrerer FORSKELLIGE `age_group_id`-værdier for samme
   fysiske hold (hvilket ville betyde de fejlagtigt splittes af denne
   rettelse), stop og spørg — gæt ikke på om det er korrekt at slå dem
   sammen alligevel.
4. Genkør 042 og 043 med den finkornede hold-identitet. Rapportér det
   nye samlede holdantal, og et par konkrete eksempler (fx hvor mange
   forskellige "Gladsaxe Søborg 1"-identiteter findes nu, sammenlignet
   med bilagets ca. 8-10 for 2025 alene: U09, U11, U13, U15, U17/U19,
   Senior/SEN+40/50/60/70 — ikke alle numre findes i alle årgange, men
   listen skal ligne bilagets struktur).
5. Samme rettelse for 043's "winrate mod modstanderhold" (opponent-
   identiteten skal også bruge specifik årgang, ikke de fire buckets).

## Kontekst

Dette er IKKE en ny undersøgelse af om navnekollisionen er reel — det er
allerede bekræftet i opgave 044. Det er en korrektion af hvor finkornet
den valgte gruppering er. Formålet er at ramme "det rigtige hold", ikke
mere finkornet end det (fx `team_id` alene ville splitte samme fysiske
hold op PR. SÆSON, hvilket Chris ikke har bedt om og som ville gøre
rapporten ubrugeligt detaljeret).

## Afgrænsning

**Må røres:** `statistik/scripts/042-results-rapport.mjs`,
`statistik/scripts/043-results-rapport-v2.mjs` (eller nye versioner),
deres resultatfiler, nyt undersøgelsesscript/resultat i
`statistik/scripts/`/`statistik/results/` for punkt 1 og 3's
bekræftelse (fx `045-aargang-mapping-bekraeftelse.mjs`/`.md`/`.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). Den brede
4-buckets `age()`-funktion må fortsat bruges hvor den allerede er
korrekt anvendt andre steder (fx opgave 038's Test & Validation-arbejde,
043's "winrate pr. årgang"-punkt 4 i stat-kataloget, som bevidst ER de
fire brede grupper, ikke hold-identiteten) — ret KUN hold- og
modstander-identiteten. `docs/statistik-plan.md`, `docs/BESLUTNINGER.md`
røres ikke, medmindre punkt 3 finder noget der ændrer et lukket Test &
Validation-kriterium — stop og spørg i så fald.

## Kontrol

**Målet:** hold-identiteten i 042/043 bruger specifik årgang, ikke de
fire brede buckets, og det resulterende holdantal er i den rigtige
størrelsesorden ift. Chris' bilag (markant højere end 27, men lavere end
472 — grundspil/slutspil og DMU/BD-liga-varianter af samme hold skal
stadig kollapse sammen).

**Værnet:** ingen ændringer i databasen. Den brede `age()`-brug andre
steder i kodebasen er urørt.

**Resultatnoten skal angive:** det bekræftede antal distinkte specifikke
årgangs-værdier, det nye samlede holdantal, og en eksplicit bekræftelse
af at grundspil/slutspil- og DMU/BD-liga-varianter korrekt kollapser
(eller en forklaring hvis de ikke gør).

## Resultatnote

Databasekontrol bekræftede 12 distinkte `age_group_id`-værdier og 59
distinkte `name_raw + age_group_id`-identiteter i `teams`. 70 identitetsgrupper
har flere competitions, hvilket dokumenterer at grundspil/slutspil-varianter
med samme sæson, navn og årgang kollapser korrekt; mappingen viser samme
age_group_id på tværs af de undersøgte DMU/BD-varianter.

042 og 043 er genkørt med specifik numerisk `age_group_id` i holdidentiteten.
De nye rapporter viser 58 identiteter i de registrerede holdkampe (043 har
980 modstanderidentiteter efter samme rettelse). Den brede fire-buckets
`age()` bruges fortsat uændret til årgangsstatistikken.

**Commits:** afventer commit på denne gren
