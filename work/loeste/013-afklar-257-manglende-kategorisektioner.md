# Opgave 013 — afklar de 257 payloads uden kategorisektioner

**Trin:** Test & Validation

Dette er en **undersøgelse og en dokumentationsbeslutning**, ikke et
udtræk. Der hentes ikke nye kampe i denne opgave.

---

## Mål

Afgøre om de 257 payloads uden kategorisektioner (del af de 315
dækningshuller) er en blivende begrænsning, eller om de kan hentes
manuelt via in-app-browseren — og skrive konklusionen ind i
`docs/statistik-plan.md`s afsnit om individuel dækning.

## Kontekst

Opgave 004 konkluderede at ingen automatisk rute (Playwright-rendering
eller BadmintonPlayers webservicelag) virker til masseudtræk af
individuelle kampopstillinger endnu. Det gør spørgsmålet om de 257
payloads dobbelt: er kategorisektionerne reelt fraværende i selve
kilden (siden har aldrig vist dem — en blivende begrænsning), eller
mangler de kun fordi ingen har hentet dem endnu (en manuel opgave, ikke
et blivende hul)?

`statistik/results/individual-coverage-gap-audit.md` og
`CURRENT_VALIDATION_STATUS.md` dokumenterer de 315 huller samlet, men
skelner ikke mellem disse to muligheder for de 257 specifikt.

## Afgrænsning

**Må røres:** `statistik/` — nyt script, ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`, og
`docs/statistik-plan.md` (kun afsnittet "Individuel dækning er lukket").

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave
dokumenterer og anbefaler — den henter ikke nye kampe og skriver ikke
feltværdier. Heller ikke `docs/historik/`, `apps/netlify-prod/` eller
Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "257-\|permanent-gaps\|manuel-opsamling"
```

Skal give mindst én ny rapportfil.

```
grep -c "013" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

Tag en stikprøve på mindst 15-20 af de 257 (gerne sæsonstratificeret, jf.
metoden Christoffer selv brugte til opgave 006). For hver: kamp-ID, hvad
den rå, gemte kilde (payload/browser-udsnit) faktisk viser, og en
konklusion der er enten "blivende — kilden har ingen kategorisektion"
eller "kan hentes manuelt — kilden har data, blot ikke hentet endnu".

```
grep -c "manglende kategorisektioner" docs/statistik-plan.md
```

Skal være mindst 1 efter opgaven — konklusionen skal stå der, ikke kun i
rapportfilen.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/013-afklar-257-manglende-kategorisektioner
```

Må kun vise ændringer i `statistik/` og `docs/statistik-plan.md`.

**Skøn:**

- Konklusionen for hver undersøgt kamp skal begrundes i dens egen rå
  kilde — ikke udledes generelt fra 004's konklusion.
- Er stikprøven blandet (nogle blivende, nogle hentbare), skal
  fordelingen skrives som den er, ikke tvinges til én samlet konklusion.

## Ved tvivl

Viser stikprøven at en betydelig andel kan hentes manuelt, så foreslå
under "Spørgsmål" om en fuld gennemgang af alle 257 bør blive sin egen,
separate opgave — udvid ikke denne opgaves omfang selv til at dække alle
257.

## Gren

`arbejde/013-afklar-257-manglende-kategorisektioner`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Stikprøve (kamp-ID, kildeindhold, konklusion):**

20 sæsonstratificerede kampe er dokumenteret i
`statistik/results/013-manglende-kategorisektioner.md`. Alle 20 gemte,
renderede browsertekster har holdresultat, men ingen kategorisektion. Prøven
rummer både eksplicit afbud/udeblivelse og registrerede holdresultater uden
sådan tekst.

**Anbefaling skrevet ind i docs/statistik-plan.md:**

De 257 behandles som et dokumenteret kildehul i det nuværende materiale,
ikke som en importfejl. Ny manuel indhentning er ikke testet i denne opgave
og kræver en særskilt opgave.

**Commits:** d48c47f
