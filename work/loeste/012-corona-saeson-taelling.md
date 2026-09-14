# Opgave 012 — corona-sæsontælling

**Trin:** Test & Validation

Dette er en **undersøgelse**, ikke en byggeopgave. Resultatet er en
dokumenteret vurdering af hvor mange kampe der reelt mangler pga. corona
— ikke en rettelse af databasen.

---

## Mål

Afgøre om corona-aflyste kampe er underrapporteret i den nuværende
klassifikation, og dokumentere fordelingen pr. sæson.

## Kontekst

`statistik/results/CURRENT_VALIDATION_STATUS.md` nævner to forskellige
corona-tal: 47 rækker har status `corona_suspended` bredt i data
(linje 9), men kun 2 kampe (387862, 387864) står i den snævre liste over
"resterende dokumenterede huller" (linje 16-17). Ingen af de to tal er
holdt op mod hvor mange kampe der faktisk skulle være spillet i de
sæsoner hvor corona ramte badminton i Danmark — sæson 2019/20 (afkortet
af nedlukningen i marts 2020) og sæson 2020/21 (stort set aflyst/udskudt
frem til foråret 2021).

Risikoen: corona-aflyste kampe kan gemme sig inde i de 315 dækningshuller
eller de 458 hold/individ-afvigelser, klassificeret som noget andet (fx
"reel uoverensstemmelse" i opgave 006's kategorier), fordi ingen
specifikt har kigget efter de to sæsoner som gruppe.

## Afgrænsning

**Må røres:** `statistik/` — nyt script, ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave
dokumenterer — den omklassificerer ikke rækker. Heller ikke
`docs/historik/`, `apps/netlify-prod/` eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "corona-saeson\|covid-season"
```

Skal give mindst én ny evidensfil.

```
grep -c "012" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

Rapporten skal for hver sæson fra sæsonen før 2019/20 til sæsonen efter
2020/21 (eller den fulde tilgængelige periode, hvis kortere) vise:
antal GSB-holdkampe i databasen, og hvor mange af dem der allerede er
markeret `corona_suspended`. For 2019/20 og 2020/21 specifikt: en
krydstabel over hvor mange af de 315 dækningshuller og de 458
afvigelser (jf. opgave 006's syv kategorier) der falder i netop disse to
sæsoner, sammenlignet med deres andel i andre sæsoner.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom. Databasen må ikke ændres.

```
node scripts/check-normalized-db.mjs
```

Skal give samme resultat som før opgaven.

```
git diff --stat main..arbejde/012-corona-saeson-taelling
```

Må ikke vise ændringer uden for `statistik/`.

**Skøn:**

- Sammenligningen skal bruge faktiske runde- og holdtal fra de allerede
  gemte data, ikke en antaget "normal" kampmængde pr. sæson, medmindre en
  pålidelig kilde for det allerede findes i `statistik/` eller `docs/`.
- Et tal der viser "ingen synlig corona-effekt ud over de kendte 47" er
  et brugbart resultat — det skal ikke tvinges til at finde et problem.

## Ved tvivl

Kan det forventede kampantal pr. sæson ikke udledes pålideligt (fx fordi
der ikke findes en officiel kampplan-kilde at sammenligne med), så stop
og skriv præcis hvad der mangler, fremfor at gætte et baseline-tal.

## Gren

`arbejde/012-corona-saeson-taelling`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Fordeling pr. sæson (2019/20 og 2020/21 specifikt):**

2019/20: 125 registrerede holdkampe, 18 `corona_suspended`, 1 dækningshul og 18 afvigelser.
2020/21: 162 registrerede holdkampe, 29 `corona_suspended`, 0 dækningshuller og 10 afvigelser.
De syv afvigelseskategorier pr. sæson står i `statistik/results/012-corona-saeson-taelling.md`.

**Konklusion — er corona underrapporteret, og i givet fald hvor meget:**

Alle 47 eksisterende `corona_suspended`-rækker ligger i de to corona-sæsoner.
Der er ikke et målbart signal om yderligere corona blandt de eksisterende 315
dækningshuller, da kun ét ligger i sæson 2019 og ingen i sæson 2020. En
kvantificering af aldrig-registrerede aflysninger kan ikke laves uden en lokal
officiel kampplan eller stillingskilde med forventede kampantal.

**Commits:** 874bb40
