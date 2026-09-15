# Opgave 029 — ret F1 (walkover kollapses til udesejr) og F2 (seenMatches.add for tidligt) i analyse.js

**Kategori:** Dream Team/Statistik-siden
**Status:** work/future/ — IKKE aktiv. Flyttes til work/aabne/ først når
Chris giver signal, jf. AGENTS.md's prioritetsregel.

---

## Mål

Ret to bekræftede, aktive bugs i `apps/netlify-prod/netlify/functions/analyse.js`
(Dream Teams Statistik-side — IKKE `statistik/`-SQLite-projektet, som er
et andet, allerede adskilt initiativ) fundet i
`docs/analyse-js-code-review-2026-09-06.md`. Begge er bekræftet stadig
til stede i den live fil (efterset 2026-09-15, linjenumre nedenfor).

## Kontekst

**F1 (linje 109):** `const hjemmeWon = vinder === 'Hjemme';` — enhver
værdi der ikke er præcis strengen `'Hjemme'` (inkl. `'?'`, som
`hent-resultater.js` skriver ved en walkover) tolkes som udesejr, ikke
som ukendt. Konsekvens: en walkover hvor GSB var hjemmehold og
modstanderen udeblev bliver registreret som **tabt** i stedet for vundet,
med ca. 50% chance for at være vendt på hovedet pr. walkover. Hænger
sammen med `docs/roadmap.md`s punkt 2 (walkover-fix i
`hent-resultater.js`, allerede shippet) — de to bør rettes/verificeres
sammen, ellers retter man kun halvdelen af kæden.

**F2 (linje 128):** `seenMatches.add(matchKey)` sker ubetinget, FØR det
tjekkes om nogen af siderne (`hjemmeIsIndividual`/`udeIsIndividual`) er
en kendt GSB-spiller. Er første række for et board et ukendt navn på
begge sider (fx en walkover hvor det er GSB's side der er "Ikke
fremmødt" — den streng står aldrig i `Spillerpoint`), forbruges nøglen
uden at der tælles noget, og boardet forsvinder sporløst fra
hold-/kategoritotaler.

Se den fulde review-rapport (`docs/analyse-js-code-review-2026-09-06.md`,
afsnit F1 og F2) for simulerede eksempler og alvorlighedsvurdering.

## Afgrænsning

**Må røres:** `apps/netlify-prod/netlify/functions/analyse.js` alene.

**Må ikke røres:** `hent-resultater.js` (allerede rettet, jf. roadmap
punkt 2 — denne opgave verificerer blot at de to fixes spiller sammen,
den ændrer ikke den fil igen), `statistik/`, Google Sheets-indholdet.

## Kontrol

**Målet:**

```
grep -n "hjemmeWon = vinder === 'Hjemme'" apps/netlify-prod/netlify/functions/analyse.js
```

Skal enten give nul træf (erstattet af en tre-tilstands-logik), eller stå
i en kontekst hvor en tredje, eksplicit "ukendt"-gren findes lige før/efter.

```
grep -n "seenMatches.add(matchKey)" apps/netlify-prod/netlify/functions/analyse.js
```

Skal stå INDEN i den betingede blok der tjekker
`hjemmeIsIndividual || udeIsIndividual`, ikke før den.

Manuel testcase: simulér en `Resultater`-række med `Vinder: '?'` (eller
tom) og bekræft at boardet nu tælles som "ukendt/ikke medregnet", ikke
automatisk som udesejr.

**Værnene:**

```
git diff --stat main..arbejde/029-dreamteam-analyse-js-f1-f2-fix
```

Skal KUN vise `apps/netlify-prod/netlify/functions/analyse.js`.

Kør en regressionstest mod et KENDT, allerede korrekt resultatsæt (fx en
tidligere valideret sæson) og bekræft at win%-tallene er UÆNDREDE for
alle rækker der IKKE er walkovers — kun walkover-/ukendt-håndteringen må
ændre sig.

**Skøn:**

- En "ukendt" vinder skal IKKE tælles som hverken sejr eller nederlag for
  nogen af siderne — den skal falde helt ud af optællingen med et
  synligt spor (fx en logget/talt "ukendt"-kategori), ikke bare stille
  ignoreres på en anden måde.

## Ved tvivl

Er det uklart hvordan en "ukendt" vinder skal vises i den færdige
statistikrapport (helt udeladt, eller vist som et separat "uafklaret"-tal),
så stop og skriv det under "Spørgsmål" — det er et produktvalg, ikke kun
en kodefejl.

## Gren

`arbejde/029-dreamteam-analyse-js-f1-f2-fix`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Regressionstest mod kendt sæson — uændrede tal bekræftet:**

**Commits:**
