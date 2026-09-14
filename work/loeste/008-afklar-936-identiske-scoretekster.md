# Opgave 008 — afklar de 7 tvetydige score-rækker blandt de 936 identiske

**Trin:** Test & Validation

Dette er **analysearbejde på data der allerede er hentet**, ligesom
opgave 006. Den venter ikke på 004's svar.

---

## Mål

Dokumentere hvad de 7 individuelle rækker med scoreteksten `0-0`, `2-2`
eller `3-3` (hvor hjemme- og udefeltet er identiske) faktisk betyder,
med rå kildeevidens — ikke gætte det.

## Kontekst

`statistik/results/individual-db-audit.md` (genereret 2026-09-13) melder
**936** individuelle rækker hvor `home_score_raw` og `away_score_raw` er
identiske tekstfelter. `TEST_RUN_LOG.md`, afsnittet "reparation af
API-individuelscores", opdeler dem: **926** har værdien `- - -` (allerede
forstået som "ingen score registreret" og ikke rørt af reparationen), og
**7** har lave værdier som `0-0`, `2-2` eller `3-3` — og loggen skriver
selv at de "kræver separat semantisk afklaring", uden at den afklaring
nogensinde blev lavet.

De 7 er noget andet end de allerede dokumenterede tilfælde:

- De er **ikke** de 8 `browser_zero_score`-rækker (dem med rå
  resultatmarkør ved siden af en 0-0-tekst — de er allerede
  klassificeret).
- De er **ikke** kamp 340495 eller de øvrige 4 kampe med `Bemærkning`
  (protest/afbud) fra `team-match-remarks-audit.md` — men det kan vise
  sig at nogle af de 7 rækker hører til samme kampe. Det skal tjekkes,
  ikke antages.

Mulige forklaringer, ingen af dem bekræftet: et reelt spillet sæt der
endte 21-2 og er forkortet forkert i kilden; en administrativ markering
der ligner en score men ikke er en; eller en parserfejl hvor det rigtige
resultat aldrig blev fanget. Opgaven er at finde ud af hvilken det er,
per række, ved at gå tilbage til den gemte rå kilde (payload/API-svar) —
ikke ved at antage et mønster fra de 6 andre.

## Afgrænsning

**Må røres:** `statistik/` — et nyt script og en ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave
**dokumenterer** — den retter ikke feltværdier. Er en rækkes rigtige
betydning klar ud fra kilden, foreslås rettelsen i resultatnoten, men
den udføres ikke her. Heller ikke `docs/historik/`,
`apps/netlify-prod/` eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "identiske-scoretekster\|ambiguous-score"
```

Skal give mindst én ny rapportfil, med præcis 7 rækker dokumenteret.

```
grep -c "008" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

Rapporten skal for hver af de 7 rækker indeholde: kamp-ID, kategori, den
rå kildetekst (payload eller API-svar) den stammer fra, og en
konklusion der enten er "afklaret: [begrundelse]" eller "uafklaret:
[hvad der blev prøvet]".

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
node scripts/audit-individual-db.mjs
```

Skal stadig vise 936 identiske rækker og 20.319 individuelle rækker i
alt — uændret, fordi opgaven ikke skriver til databasen.

```
git diff --stat main..arbejde/008-afklar-936-identiske-scoretekster
```

Må ikke vise ændringer i `apps/`, `kampsystem/`, `docs/historik/` eller
`data/`.

**Skøn:**

- Er kilden for en række tvetydig selv efter at være undersøgt, skal den
  stå som uafklaret med det der blev prøvet — ikke som en gættet
  konklusion der ser afklaret ud.

## Ved tvivl

Peger noget på at flere end de kendte 7 rækker bør undersøges (fx viser
det sig at nogle af de 926 `- - -`-rækker faktisk skjuler samme
problem), så stop og skriv det under "Spørgsmål" fremfor at udvide
opgavens omfang selv.

## Gren

`arbejde/008-afklar-936-identiske-scoretekster`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**De 7 rækker, én linje hver (kamp-ID, kategori, konklusion):**

**Hvad blev fravalgt og hvorfor:**

**Commits:**

## Resultat

- Rapport: `statistik/results/008-identiske-scoretekster.md`.
- Den bevarede API-payload viser præcis syv kamp/kategori-nøgler: 96518/3. HD, 98375/1. HD, 98375/5. HD, 242764/1. HD, 385773/1. DD, 387834/4. HD og 466228/2. DD.
- De fem 0-0-rækker overlapper fem af de otte nuværende `browser_zero_score`-rækker. Dette afviger fra opgavekortets antagelse; rapporten dokumenterer overlap i stedet for at oprette fiktive ekstra rækker.
- Alle syv er `uafklaret`: rå score, markør og browserudsnit bevares, men der er ikke eksplicit `(Ikke fremmødt)`-tekst og markørerne er ikke fortolket.
- Kontrol: `audit-individual-db.mjs` returnerede fortsat 20.319 individuelle rækker og 936 identiske scoretekster. `statistik/data/` er uændret.

**Commits:** afventer commit på denne gren.
