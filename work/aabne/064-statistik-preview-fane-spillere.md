# Opgave 064 — Klubstatistik: Spillere-fanen og spillerprofilen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst. **Dette er den mest komplekse af de
otte fane-opgaver** — overvej at bede om ekstra tid/en separat gennemgang før den sættes i kø.

**Gren:** `arbejde/064-statistik-preview-fane-spillere`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne opgave har to dele: (1) selve
spillertabellen, (2) den udvidede spillerprofil der åbner når man klikker en spiller — Chris'
eksplicitte ønske var "at kunne trykke på spilleren og se en oversigt over kategorier spillet, hold
spillet på, osv. — alle de ting fokuseret på en enkelt spiller".

## Mål

**Del 1 — spillertabel:**

1. Søgefelt (filtrerer klient-side på spillernavn) + sorterbar tabel: Spiller | Kampe | Sejre |
   Winrate (bar-fill), for alle spillere i den valgte filtrering.
2. **Ingen hardkodet minimumsgrænse** — alle spillere vises som standard, inklusive en spiller med
   1 kamp og 100%. I stedet: en synlig, justerbar kontrol ("min. antal kampe", fx 3/5/10, slået fra
   som standard) der er en ægte klient-side filter-parameter i koden — ikke en fast regel i
   databaseforespørgslen. Se mockuppens `.min-games-toggle` for den tilsigtede UI.

**Del 2 — spillerprofil (klik på en spiller):**

Når man klikker en spillerrække, folder en udvidet visning ud under rækken (samme mekanik som
`analyse.html`s `tr.player-detail-row`, men med markant mere indhold — se
`work/future/referencer/061-statistik-preview-mockup.html`, fanen "Spillere", Jonas
Trusell-Jensen-eksemplet, for det fulde visuelle facit). Den skal indeholde, for netop den spiller,
inden for den aktuelt valgte filtrering:

1. En kort header: navn + nuværende hold/gruppe.
2. En KPI-strip: kampe (i valgt filter), winrate, antal hold spillet på, antal sæsoner i klubben.
3. **Kategorier spillet**: winrate pr. kategori (single/double/mixed) for spilleren, bar-fill-stil.
4. **Hold spillet for**: liste over hold spilleren har spillet på, med periode (sæson(er)) og
   S-T-record pr. hold — dette skal vise en spiller der er rykket mellem hold, fx GSB 2 → GSB 1.
5. **Board-tendens**: kronologisk boardposition-sekvens for den valgte sæson, genbrug
   board-position-udledningen der allerede findes og er valideret i `analyse.html`s `runAnalyse`
   (samme algoritme: `Math.floor(række-index-i-gruppen / rækker-pr-board) + 1`, med dedup-nøglen
   `runde|hold|kategori|boardPosition` — IKKE den ældre, buggede sæt-score-baserede nøgle, se
   `docs/gsb-statistik-idebank.md`s "Board-position pr. kamp"-afsnit for baggrunden).
6. **Hyppigste modstandere**: kort liste over de hold/spillere denne spiller har mødt oftest, med
   sejr/tab-facit (grøn for overvægt af sejre, rød for overvægt af tab, jf. mockuppens `.o-rec.win`/
   `.o-rec.loss`).
7. **Sæson for sæson**: kompakt tabel (sæson, hold, kampe, winrate) plus en linje med
   klub-karriere-totalen ("X sæsoner, Y kampe totalt for klubben" — samme tal som opgave 069's
   Klub-karriere-fane, men for denne ene spiller).

## Kontekst

- Datalag: samme som opgave 061. Modstander-opslag (punkt 6) og sæson-for-sæson (punkt 7) kræver
  sandsynligvis en let ekstra aggregering pr. spiller — dokumentér i resultatnoten hvordan det er
  hentet/beregnet, og om det er en engangsberegning ved sidehentning eller en on-demand-beregning
  ved klik.
- `individual_matches` + `individual_match_players` (se `statistik/sql/schema-normalized.sql`) er
  de centrale tabeller for kategori-, board- og modstander-data. `players.external_player_id` vs.
  navnematch: læs `statistik/results/016-spiller-id-audit.md` og
  `statistik/results/032-spiller-navnematch-risiko.md` — 85,2 % af spillerrelationerne har et
  eksternt ID, resten er navnematch. Denne opgave behøver ikke løse ID-koblingen, men skal ikke
  fejle eller vise forkerte tal for de navnematch-koblede spillere; dokumentér hvis noget er
  usikkert af den grund.

## Afgrænsning

**Må røres:** kun `.pane` for Spillere, inkl. spillerprofil-visningen. **Må ikke røres:**
`analyse.html`s egen `runAnalyse`-funktion (læs/genbrug logikken, kopiér den ikke ind og lav en
divergerende anden-udgave — hvis den skal genbruges bogstaveligt, del den ud i et fælles
script/modul i stedet, og sig det i resultatnoten), øvrige faner, `statistik/data/gsb-statistik-normalized.db`
(læses kun).

## Kontrol

**Målet:** min. 3 forskellige spillere testet manuelt — spillerprofilen viser korrekte,
efterprøvede tal for kategori-winrate, hold-liste og sæson-for-sæson (dokumentér de faktiske tal i
resultatnoten, ikke kun "det ser rigtigt ud"). Min.-kampe-kontrollen filtrerer klient-side uden nyt
databasekald.

**Værnet:** `analyse.html`s eksisterende board-position-beregning/dedup-nøgle er uændret (0 ændrede
linjer i `analyse.html`, hvis logikken genbruges via deling i stedet for kopi).

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor — særligt om hvor grænsen går for hvor meget der bør
forhåndsberegnes ved sidehentning vs. beregnes ved klik (performance-afvejning), og om en
navnematch-koblet spillers modstander-/holddata er usikker nok til at flage synligt i UI'et.

### Spørgsmål

1. Skal kategori-winrates grupperes efter de rå `category_raw`-værdier (fx `1. HS`,
   `1. HD`, `1. MD`, Golden Set-varianter), eller skal de normaliseres til familierne
   single/double/mixed? Hvis de normaliseres: hvilke præcise regler gælder for HS/S,
   HD/D, DD, MD og Golden Set?
2. Board-trenden kræver `Math.floor(rowIndexInGroup / rowsPerBoard) + 1` og dedup efter
   `runde|hold|kategori|boardPosition`, men den normaliserede database har ikke et
   dokumenteret source-row/order-felt. Må `individual_match_id` bruges som rækkefølge,
   eller findes der en anden autoritativ rækkefølge/kilde, som skal anvendes?
3. Skal navnematch-koblede spillere (uden `external_player_id`) markeres synligt i
   spillerlisten/profilen, og skal deres hold-/modstanderdata vises med en usikkerheds-
   markering? Auditten viser 2.556 spillere uden ekstern ID og 9.926 sådanne relationer.
4. Skal “modstandere” tælles som individuelle kampe mod spillere eller som holdmøder
   mod modstanderhold? Den nuværende prototype viser modstående spillere og tæller
   individuelle kampe.

**Chris' svar (2026-09-20):**

1. **Kategori-normalisering:** Brug de rå `category_raw`-værdier direkte, samme princip som opgave 065 fik besked på. Ingen normalisering til single/double/mixed i denne opgave.
2. **Board-rækkefølge:** Gæt ikke en ny rækkefølge ud fra `individual_match_id`. Genbrug den faktiske forespørgsel/rækkefølge `analyse.html`s `runAnalyse` selv bruger (samme datakilde/SQL), i stedet for at opfinde en ny ordning. Er den eksisterende rækkefølge i `analyse.html` selv udokumenteret/uverificeret, dokumentér det som en kendt usikkerhed i resultatnoten i stedet for at antage `individual_match_id` er ækvivalent.
3. **Navnematch-usikkerhed:** Ja, flag det synligt (en rolig markør, ikke en advarsel) i profilen når spilleren ikke har `external_player_id`.
4. **Modstandertælling:** Individuelle modstandere/kampe, ikke modstanderhold. Holdniveau er allerede dækket af opgave 067.

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
