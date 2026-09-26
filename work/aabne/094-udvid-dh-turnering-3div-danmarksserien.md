# Opgave 094 — udvid niveaudækning til hele DH-turneringen (Ligaen → Danmarksserien)

**Trin:** Test & Validation / Results

**Baggrund:** Opgave 089/090/091 byggede `089-liga-1div-revisionstabel` for kun Ligaen/1./2. division.
Opgave 092 (med Opfølgning 1, efter 093's katalogrettelse) automatiserede hold-identitets-matching
sæson-til-sæson på den tabel og lukkede alle 42 tvetydige opslag. Christoffer vil i sidste ende have
regionernes puljer med (Sjællandsserien, Fynsserien, Jyllandsserien, Kredsserien Vest, Bornholmsserien
m.fl.), men peger selv på at det første, nødvendige skridt er at udvide til **hele DH-hovedturneringen**
ned til og med Danmarksserien (Ligaen → 1. division → 2. division → 3. division → Danmarksserien) —
regionernes puljer under Danmarksserien er en senere, separat opgave og er **ikke** i scope her.

Christoffers hypotese, som denne opgave skal teste: hold i 3. division og opefter forsvinder ikke fra
tabellen i mere end **én** sæson ad gangen (dvs. rykker de ud af DH-hovedturneringen, er det til
Danmarksserien, og de er tilbage i DH senest sæsonen efter — de "forsvinder" ikke i årevis nedad, i
modsætning til fx et hold der falder helt ud i en regional serie). Denne opgave skal måle om det holder,
ikke bare antage det.

## Mål

1. Udvid `levelFromDivision()` i `statistik/scripts/089-generate-liga-1div-revisionstabel.mjs` (eller en
   navngivet efterfølger — se Spørgsmål 1) til også at genkende `3. division` og `Danmarksserien`,
   inklusive deres kendte varianter i `league_groups.division_name_raw`
   (`3. division (oversidder-runde)`, `3. division (oversidder-runder)`, `Danmarksserien (oversidder-runde)`,
   `Danmarksserien (oversidder-runder)`, `Danmarksserien, Kvalifikationskampe`), analogt med de
   eksisterende mønstre for `Ligaen`/`1. division`/`2. division`.
2. Byg tilsvarende niveau-overgangs-/hændelseslogik for de nye niveaupar (2. div ↔ 3. div, 3. div ↔
   Danmarksserien: oprykning, nedrykning, kvalifikationsgruppe), analogt med den eksisterende logik for
   Liga/1./2. divisions-grænserne (`oneQual`/`oneDown`/`twoUp`-mønstrene i det nuværende script).
3. Genkør 092's kollaps- og matchingscript (`statistik/scripts/092-hold-identitet-traadmatching.mjs`) mod
   den udvidede tabel, så kollapslogikken (`group_type_katalog`) også dækker de nye niveauers
   kvalifikations-/slutspilsgrupper.
4. Mål og rapportér specifikt for hold der optræder i 3. division eller højere i mindst én sæson:
   - Hvor mange sæson-til-sæson-tråde brydes (dvs. holdet er i tabellen én sæson, ude, og tilbage senere)?
   - Af disse brud: hvor mange er præcis ét sæson-hul (i tråd med Christoffers hypotese om
     Danmarksserien-udflugter), og hvor mange er længere/uforklarede?
   - Er der stadig ambiguity_reviews (tvetydige opslag) på de nye niveauer, og hvis ja, hvorfor (ny
     duplikeringsmekanisme, eller samme mønster som 2. divisions kvalifikationsgrupper i 092)?

## Afgrænsning

**Må røres:** `statistik/scripts/089-generate-liga-1div-revisionstabel.mjs` (eller en ny efterfølgerfil,
se Spørgsmål 1), dens outputfiler (`089-liga-1div-revisionstabel.json`/`.csv`), 092's script og
outputfil (`092-traadmatching-forslag.json`), samt denne opgaves egen kortfil.

**Må ikke røres:** Regionernes puljer under Danmarksserien (Sjællandsserien, Fynsserien, Jyllandsserien,
Kredsserien Vest, Bornholmsserien, Københavnsserien m.fl.) — de er tydeligt ude af scope her og hører til
en senere opgave. `group_type_katalog` må læses, men ikke ændres (Guldmatchen/Bronzematchen-fejlen fra
092's Opfølgning 1 er stadig en separat, urelateret opgave). `statistik/data/gsb-statistik-normalized.db`,
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. Ingen nye API-kald.

## Kontekst

- `statistik/scripts/089-generate-liga-1div-revisionstabel.mjs` — den nuværende `levelFromDivision()`
  (kun Ligaen/1./2. division) og niveau-overgangslogikken (`oneQual`/`oneDown`/`twoUp`) der skal udvides
  analogt.
- `statistik/scripts/092-hold-identitet-traadmatching.mjs` — kollaps- og matchinglogikken fra Opfølgning 1,
  som skal genkøres på den udvidede tabel.
- `statistik/data/liga-landskab.db`, tabellen `league_groups` (kolonne `division_name_raw`) — en frisk
  `SELECT DISTINCT division_name_raw FROM league_groups WHERE age_group_id=1` viser at `3. division` og
  `Danmarksserien` har rene, nationalt ensartede navne (i modsætning til regionernes puljer, som har mange
  varianter pr. region) — det er derfor de er valgt som næste skridt før regionerne.
- `docs/statistik-plan.md`, afsnittet "Holdidentitets-standard" — senior/veteran-identitet er
  `name_raw + age_group_id`, uændret af denne opgave; den arbejder stadig på `hold`-feltet i
  revisionstabellen.
- `work/aabne/092-hold-identitet-automatiseret-traadmatching.md`, afsnittet "Opfølgning 1" — mønsteret for
  hvordan same-season-duplikater blev kollapset ved brug af `group_type_katalog`, som denne opgave
  genbruger for de nye niveauer.

## Kontrol

**Målet — hvad skal blive sandt:**

```
089-tabellen udvides til at indeholde Ligaen, 1., 2. og 3. division samt Danmarksserien for alle
sæsoner hvor data findes. Rapportér ny rækkeantal fordelt på niveau.
092's script kører uændret i sin logik (kun mod det udvidede kildedata) og rapporterer:
  - antal kanoniske sæsonknuder, same-season-kollaps, ambiguity_reviews (fordelt på niveau)
  - antal sæson-til-sæson-brud for hold der optræder i 3. division eller højere, fordelt på hul-længde
    (1 sæson vs. >1 sæson)
Facitlisten (166/170 fra 092) må ikke regressere for de eksisterende Ligaen/1./2. divisions-kanter.
```

**Værnet — hvad må ikke ændre sig:**

```
git status --short statistik/data/                                tom
Ingen kald til badmintonplayer.dk/nembadminton.dk.
statistik/data/gsb-statistik-normalized.db er BYTE-FOR-BYTE uændret.
statistik/data/liga-landskab.db er BYTE-FOR-BYTE uændret (kun læst, group_type_katalog ikke rørt).
Regionernes puljer optræder IKKE i outputtet (kontrollér at ingen Sjællandsserien/Fynsserien/
Jyllandsserien/Kredsserien/Bornholmsserien/Københavnsserien-rækker er kommet med).
```

**Skøn** (kan ikke måles):

- Christoffers hypotese om maks. ét sæson-hul til Danmarksserien skal enten bekræftes med et konkret
  tal, eller afkræftes med konkrete modeksempler (hold/sæsoner) han kan kigge på — ikke bare et
  aggregeret "det stemmer nogenlunde".

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** — særligt ved niveau-
overgangslogikken for 3. division/Danmarksserien-grænsen, som ikke er efterprøvet manuelt på samme måde
som Liga/1./2. divisions-grænserne var det i opgave 089-091.

## Gren

`arbejde/094-udvid-dh-turnering-3div-danmarksserien`, fra `main`.

---

## Spørgsmål

1. Skal 089's eksisterende script og filnavn (`089-generate-liga-1div-revisionstabel.mjs` /
   `089-liga-1div-revisionstabel.json`) udvides i sit nuværende navn, selvom det nu dækker mere end
   "1div", eller skal der laves en ny efterfølgerfil (fx `094-...`) der bygger videre på 089's output uden
   at omdøbe det? Christoffer har ikke valgt. (091 udvidede tidligere 089 i samme filnavn uden omdøbning —
   samme mønster kan bruges her, men det er hans valg.)
2. Hvor præcist skal 3. division/Danmarksserien-kvalifikationsgrupperne klassificeres, hvis
   `group_type_katalog` ikke allerede har en ren kategori for dem (fx "Danmarksserien, Kvalifikationskampe")
   — er stikprøve mod badmintonplayer.dk nødvendig her, ligesom Christoffer gjorde visuelt for 2.
   divisions kvalifikationsgruppe under 092's Opfølgning 1?

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
(indsæt det faktiske output, ikke en beskrivelse af det)
```

**Hvad blev gjort:**

**Hvad blev fravalgt og hvorfor:**

**Commits:**
