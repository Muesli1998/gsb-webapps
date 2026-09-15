# Opgave 032 — stikprøve af spiller-navnematch-risiko før Results

**Trin:** Test & Validation

Dette er en **stikprøveundersøgelse**, ikke selve koblingsarbejdet.
Formålet er at afgøre om de spillere der kun er koblet via navnematch
udgør en reel risiko for Results-rapportens per-spiller-tal, før den
rapport bygges.

---

## GENÅBNET 2026-09-15, runde 3 — samme-dato-tjekket manglede konkurrencetype

Runde 2's script (`scripts/audit-player-name-behavior.mjs`) fandt 7
spillere med kampe på to GSB-hold samme dato og klassificerede dem som
"mistænkte kollisioner". Chris tjekkede manuelt den ene (Konrad
Kunckel, kamp 467888/471218, se "Spørgsmål" nedenfor) og fandt at det
IKKE var en kollision: de to kampe lå i to forskellige rækker/kamptyper
(U15 B 5400 vs. U15 C 4800), og det er normal praksis at spille flere
ungdoms-holdkampe samme dag på tværs af kamptyper.

**Hvorfor det skete:** `competitions`-tabellen har allerede feltet
`league_raw`/`name_raw` (og `age_group_id`), men runde 2's SQL hentede
kun `age_group_id`, ikke `league_raw`/`name_raw`, i sin
samme-dato-gruppering. Havde den taget rækketypen med, ville Konrad
Kunckels "kollision" have vist sig som to forskellige rækker med det
samme.

**Afgrænsning af rettelsen:** de øvrige tjek i projektet der
sammenligner på tværs af kilder (`check-standing-match-counts.mjs`,
`audit-no-linked-standings.mjs`) joiner allerede på `competition_id`
og har derfor ikke samme svaghed — det er isoleret til dette ene
script. Se `statistik/RESEARCH_BACKLOG.md` for den fulde gennemgang.

**Opgave for runde 3:** tilføj `c.league_raw` og `c.name_raw` til
samme-dato-tjekket og genkør det for de resterende 6 spillere (Lasse
Bjerregaard Kirt, Norr Bagge Køhler, Pelle Emil Jessing Schjøtt, Kasper
Gorm, Lasse Friberg Andersen, Sebastian Larsen Lund) — vis for hvert
samme-dato-fund om de to kampe ligger i samme eller forskellig
række/kamptype. Konklusionen "mistænkt kollision" må kun stå, hvis
kampene rent faktisk er i samme række/kamptype (så to-hold-samme-dato
ikke kan forklares af rækkeforskellen alene, sådan som Konrad Kunckels
tilfælde kunne).

---

## GENÅBNET 2026-09-15 — runde 1's hovedbevis var ugyldigt

Runde 1 (arkiveret nedenfor under "Resultat — runde 1") konkluderede
"0 dubletter i `players.name_normalized`, derfor ingen konkret evidens
for navnekollision". Det bevis holder ikke, og opgaven genåbnes derfor
under samme nummer i stedet for at blive lukket.

**Hvorfor:** `scripts/generate-normalized-import.mjs` (linje 49-52)
opretter en spiller uden ekstern ID med
`external_player_id = 'name:' + navn.trim().toLowerCase()` og bruger
`INSERT OR IGNORE` sammen med et in-memory `seenPlayer`-map nøglet på
præcis den samme streng. `sql/schema-normalized.sql` har
`external_player_id TEXT UNIQUE`. Resultatet er at to forskellige
fysiske spillere med identisk navn (efter trim/lowercase) **aldrig kan
blive to rækker** — de tvinges strukturelt sammen i application-koden
til ÉN `player_id`, med begges kampe under det ene ID, allerede ved
import. Der findes derfor ingen mulig kørsel af importen hvor
`name_normalized` kan indeholde en dublet. At SQL'en i runde 1 fandt 0
dubletter beviser altså ikke fravær af kollision — det er et tjek der
strukturelt aldrig kan finde andet end 0, uanset om der reelt er en
kollision eller ej.

Det runde 1 rent faktisk observerede — ingen åbenlyst modstridende
hold/sæson-data for de 25 stikprøvenavne — står stadig som en svag,
anekdotisk observation, men det bærer ikke konklusionen "ingen
kollision fundet" som rapporten gav det.

**Hvad en gyldig undersøgelse kræver:** adfærdsmæssig evidens for at ét
gemt navn dækker over to fysiske personer — ikke database-dubletter,
som import-logikken forhindrer i at kunne opstå. Se det reviderede
"Kontrol"-afsnit nedenfor.

---

## Mål

For en stikprøve af de spillere med flest kampe blandt de 2.556 der
mangler et eksternt BadmintonPlayer-ID (opgave 016): undersøge om deres
navn i databasen dækker over en navnekollision (flere forskellige
fysiske spillere delt om samme gemte navn) eller en navnesplittelse
(samme fysiske spiller optræder under flere stavevarianter som hver sin
"spiller" med hver sit lille kampantal) — og dokumentere om risikoen er
stor nok til at kræve fuld ID-kobling før Results-rapporten bygges.

## Kontekst

Opgave 016 målte at 57.270 af 67.196 spillerrelationer (85,2 %) har et
gemt BadmintonPlayer-ID; 9.926 relationer og 2.556 spillere hviler kun
på navnematch. `docs/statistik-plan.md` (afsnittet "Spilleridentitet
hviler på ID, ikke navn") markerede den resterende kobling som en
separat, endnu ugjort byggeopgave — ikke en afklaret risiko.

Results-rapporten (`docs/statistik-plan.md`, afsnittet "Results") skal
vise "for hver spiller antal kampe og vinderprocent fordelt på
kategori". Dækker et gemt navn reelt over to forskellige fysiske
spillere, blandes deres statistik sammen uden at det er synligt i
selve dækningsprocenten på 85,2 %. Denne opgave måler, ikke antager,
hvor stor den risiko konkret er.

## Afgrænsning

**Må røres:** `statistik/` — nyt/opdateret script, ny rapport under
`statistik/results/` (overskriv eller supplér `032-spiller-navnematch-
risiko.md`), `statistik/TEST_RUN_LOG.md`, og `docs/statistik-plan.md`
(kun afsnittet "Spilleridentitet hviler på ID, ikke navn" og "Status på
Test & Validation som helhed", og kun hvis konklusionen om risiko
ændrer sig som følge af denne undersøgelse).

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave måler
og dokumenterer risiko — den retter ikke navne og kobler ikke
manglende ID'er. Heller ikke `docs/historik/`, `apps/netlify-prod/`
eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "032\|spiller-navnematch\|player-name-collision"
```

Skal give mindst én rapportfil, opdateret til at afspejle runde 2's
faktiske undersøgelse (ikke det ugyldiggjorte dublet-tjek alene).

```
grep -c "032" statistik/TEST_RUN_LOG.md
```

Skal være mindst 2 (runde 1 + runde 2).

**Rapporten skal, for hver undersøgt spiller i stikprøven, bygge på
adfærdsmæssig evidens, fx:**

- Optræder navnet i to aldersgrupper/kategorier der ikke hænger sammen
  for én fysisk person i den relevante periode (fx samtidig Senior og
  U15)?
- Optræder navnet i to kampe på forskellige hold samme dato/runde, hvor
  én person ikke kan have spillet begge (tidsmæssigt umuligt)?
- Er der to næsten-identiske, men ikke ens, navnevarianter med hvert
  sit lille, ikke-overlappende kampantal i samme periode, der tilsammen
  ligner ét sammenhængende spillerforløb (splittelse)?
- Findes der modstridende klub- eller holddata for "samme" navn der
  ikke kan forklares af almindelig holdskift internt i GSB?

Et **0-dubletter-i-name_normalized-tjek alene er IKKE tilstrækkeligt
bevis** og må ikke stå som eneste grundlag for konklusionen — forklar i
rapporten hvorfor, hvis det genbruges som supplerende kontekst.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/032-spiller-navnematch-risiko-runde2
```

Må kun vise ændringer i `statistik/` og `docs/statistik-plan.md`.

**Skøn:**

- Prioritér spillere med flest gemte kampe blandt de 2.556 uden ID —
  det er dem en fejl ville have størst effekt på i Results-rapporten.
- En stikprøve på cirka 20-30 spillere (kan genbruge runde 1's 25) er
  et rimeligt udgangspunkt.
- En kollision eller splittelse skal bygge på konkret gemt evidens for
  adfærd der ikke passer med én fysisk person — ikke på formodning, og
  ikke på et tjek der strukturelt ikke kan finde noget.

## Ved tvivl

Kræver en vurdering adgang til data der ikke allerede er gemt (fx en ny
kildehentning for at bekræfte om to navne er samme person), så lad
vurderingen stå som "usikker, kræver ekstern kilde" og skriv det under
"Spørgsmål" i stedet for at hente ny data i denne opgave.

## Gren

Runde 1: `arbejde/032-spiller-navnematch-risiko` (allerede merget).
Runde 2: `arbejde/032-spiller-navnematch-risiko-runde2` (allerede merget).
Runde 3: `arbejde/032-spiller-navnematch-risiko-runde3`.

## Kontrol — runde 3 (tilføjelse)

Samme værn som runde 2 (`git status --short statistik/data/` tom;
diff kun i `statistik/` og evt. `docs/statistik-plan.md`), plus:

- Scriptet skal for hvert af de 6 resterende samme-dato-fund vise
  `league_raw`/`name_raw` (eller tilsvarende rækkenavn) for begge
  kampe i parret.
- Rapporten skal eksplicit angive, for hvert fund, om det er samme
  række/kamptype (potentiel reel kollision) eller forskellig
  række/kamptype (forklaret af multi-kamp-praksis, som Konrad
  Kunckel).
- `grep -c "032" statistik/TEST_RUN_LOG.md` skal være mindst 3.

---

## Spørgsmål

De syv samme-dato/to-hold-fund kræver ekstern spillerprofil eller holdsedler
for at afgøre om de er reelle navnekollisioner eller registreringsfejl.
Ingen ekstern hentning er foretaget i denne opgave.

**Besvaret 2026-09-15 (Chris, manuelt tjek af Konrad Kunckel,
kamp 467888/471218):** Ikke en kollision. Begge kampe er U15,
27-10-2024, samme runde, men to forskellige rækker/kamptyper (467888:
U15 B 5400, blandet hold; 471218: U15 C 4800, rent drengehold). Chris
bekræfter at det er normal praksis i ungdomsrækkerne at spille flere
holdkampe samme dag på tværs af kamptyper, for at reducere antallet af
weekender med holdkampe. Screenshots fra badmintonplayer.dk af begge
kampe bekræfter dette.

**Metodisk konsekvens:** dette rejser tvivl om værdien af "samme dato,
to hold"-signalet som kollisionsindikator specifikt for U15 og yngre,
hvor det tilsyneladende er almindelig, legitim praksis snarere end en
undtagelse. De øvrige 6 fund (Lasse Bjerregaard Kirt, Norr Bagge
Køhler, Pelle Emil Jessing Schjøtt, Kasper Gorm, Lasse Friberg
Andersen, Sebastian Larsen Lund) er ikke tjekket for samme mønster
endnu. Bemærk desuden at Konrad Kunckels kamppar begge er U15 — og
U15 og yngre er eksplicit uden for dette tekniske trins scope (se
`docs/statistik-plan.md`, "Ikke en del af dette trin").

## Tilbagefald

## Resultat — runde 1 (2026-09-15, GENÅBNET — hovedbevis ugyldigt)

**Kontroloutput:**

```text
ls statistik/results/ | grep -i "032\|spiller-navnematch\|player-name-collision"
032-spiller-navnematch-risiko.md
grep -c "032" statistik/TEST_RUN_LOG.md
1
git status --short statistik/data/
(tom)
```

Stikprøve: 25 spillere med flest gemte kampe blandt 2.556 uden ID.
`players.name_normalized` havde 0 dubletter. Ingen konkret kollision blev
fundet i stikprøven. Navnesplittelse mellem næsten-identiske stavemåder kan
ikke afgøres uden ekstern kilde og er derfor usikker. Rapporten viser navn,
kampe, sæsoner og hold for alle 25.

**Hvorfor dette er utilstrækkeligt (tilføjet ved genåbning):** "0
dubletter i `name_normalized`" er strukturelt garanteret af
`generate-normalized-import.mjs`s get-or-create-på-navn-logik (se
banner ovenfor) — tjekket kan aldrig finde en kollision, uanset om der
er en. Konklusionen "ingen konkret evidens for navnekollision" er
derfor ikke understøttet af det angivne bevis.

**Ændrer dette statistik-planens konklusion:** Nej (uændret fra runde
1 — fuld ID-kobling er fortsat nødvendig før per-spiller Results-tal
kan kaldes identitetsmæssigt sikre; det er nu af en klarere grund: den
reelle kollisionsrisiko er stadig helt uafklaret, ikke "lav og målt").

**Commits (runde 1):** fdd8397 (analyse og rapport), a8d5ead
(arkivering).

## Resultat — runde 2 (udfyldes ved genkørsel)

## Resultat — runde 3

Kontrol: rapportfil og testlog er opdateret; database urørt. Scriptet
inkluderer `c.league_raw` og `c.name_raw`. For de seks resterende spillere
var **0/6** samme-dato-fund i samme række/kamptype; alle seks havde kun
forskellige U13/U15/U09-rækker (detaljer i rapporten). Sammen med Konrads
manuelle afkræftelse er runde 2's 7 mistænkte kollisionsfund nu afkræftet i
det gemte materiale. Navnesplittelse kræver fortsat ekstern kilde.

**Commits:**

75e4b1c

**Kontroloutput:** Rapportfilen findes; `TEST_RUN_LOG.md` indeholder mindst
to 032-poster; `git status --short statistik/data/` var tom. Diffen rammer kun
`statistik/` og kortets tilladte dokumentation.

**Resultat:** 25 spillere undersøgt. 7 havde kampe på to GSB-hold samme dato
(22 kampforekomster), 25/25 havde flere `age_group_id`; ingen navnesplittelse
kunne bekræftes fra gemte felter. De 7 er mistænkte kollisioner og kræver
ekstern kilde. Fuld ID-kobling er fortsat nødvendig.

**Commits:**

71a997b

## Resultat — runde 3 (udfyldes ved genkørsel)
