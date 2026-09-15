# Opgave 032 — stikprøve af spiller-navnematch-risiko før Results

**Trin:** Test & Validation

Dette er en **stikprøveundersøgelse**, ikke selve koblingsarbejdet.
Formålet er at afgøre om de spillere der kun er koblet via navnematch
udgør en reel risiko for Results-rapportens per-spiller-tal, før den
rapport bygges.

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

**Må røres:** `statistik/` — nyt script, ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`, og
`docs/statistik-plan.md` (kun afsnittet "Spilleridentitet hviler på ID,
ikke navn" og "Status på Test & Validation som helhed", og kun hvis
konklusionen om risiko ændrer sig som følge af denne undersøgelse).

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave måler
og dokumenterer risiko — den retter ikke navne og kobler ikke
manglende ID'er. Heller ikke `docs/historik/`, `apps/netlify-prod/`
eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "032\|spiller-navnematch\|player-name-collision"
```

Skal give mindst én ny rapportfil.

```
grep -c "032" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

Rapporten skal, for hver undersøgt spiller i stikprøven, vise: navn,
antal gemte kampe, hvilke(t) hold/klub(ber) og sæson(er) navnet optræder
i, og en vurdering — med henvisning til det konkrete gemte felt der
begrunder den — af om der er tegn på kollision, tegn på splittelse,
eller ingen af delene.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/032-spiller-navnematch-risiko
```

Må kun vise ændringer i `statistik/` og `docs/statistik-plan.md`.

**Skøn:**

- Prioritér spillere med flest gemte kampe blandt de 2.556 uden ID —
  det er dem en fejl ville have størst effekt på i Results-rapporten.
- En stikprøve på cirka 20-30 spillere er et rimeligt udgangspunkt;
  juster op eller ned med en kort begrundelse, hvis materialet peger på
  noget andet.
- En kollision eller splittelse skal bygge på konkret gemt evidens (fx
  modstridende klub- eller aldersgruppedata for "samme" navn, eller to
  synligt beslægtede navnevarianter med hver sit lille kampantal i
  samme periode) — ikke på formodning.

## Ved tvivl

Kræver en vurdering adgang til data der ikke allerede er gemt (fx en ny
kildehentning for at bekræfte om to navne er samme person), så lad
vurderingen stå som "usikker, kræver ekstern kilde" og skriv det under
"Spørgsmål" i stedet for at hente ny data i denne opgave.

## Gren

`arbejde/032-spiller-navnematch-risiko`

---

## Spørgsmål

## Tilbagefald

## Resultat

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

**Ændrer dette statistik-planens konklusion:** Nej. Fuld ID-kobling er stadig
nødvendig før per-spiller Results-tal kan kaldes identitetsmæssigt sikre.

**Commits:**
