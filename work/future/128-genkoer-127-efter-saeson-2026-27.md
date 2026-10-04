# Opgave 128 — genkør GSB's ungdomsformatplacering efter sæson 2026/27

**Trin:** Results

## Mål

Når sæson 2026/27 er afsluttet (forventet omkring maj 2027), genkør opgave 127's beregning og opdatér dens rapport og oversigt med de afsluttede sæsondata.

## Afgrænsning

**Må røres:** `statistik/scripts/127-youth-format-and-kbh-width.mjs` kun hvis sæsonstatus skal markeres afsluttet; `statistik/results/127-gsb-ungdom-formatplacering.md`; `statistik/results/127-gsb-ungdom-formatplacering.json`; denne opgaves Resultatnote.

**Må ikke røres:** databaserne må kun læses; format- og breddeberegningerne må ikke ændres; øvrige scripts, rapporter og projektmapper må ikke ændres.

## Kontekst

Opgave 127 markerer 2026/27 som **i gang, ufuldstændig** og udelader sæsonen fra “Samlet over tid”. Genkør `statistik/scripts/127-youth-format-and-kbh-width.mjs`, når sæsonen faktisk er afsluttet. Forventningen er, at genkørslen kan bevare beregningslogikken og opdatere rapport/oversigt; 2026/27 skal ikke længere stå som igangværende. Den nuværende rapport og metode står i `statistik/results/127-gsb-ungdom-formatplacering.md/.json`.

## Kontrol

**Målet — hvad skal blive sandt:**

```
node --check statistik/scripts/127-youth-format-and-kbh-width.mjs    forventet efter: exit 0
node statistik/scripts/127-youth-format-and-kbh-width.mjs           forventet efter: begge 127-rapporter genberegnet
rg -n '2026/2027.*i gang, ufuldstændig' statistik/results/127-gsb-ungdom-formatplacering.md
                                                                    forventet efter: 0 forekomster for afsluttet sæson
```

**Værnet — hvad må ikke ændre sig:**

```
SHA-256 og tabelrækketal for begge databaser før/efter skal være uændrede; databaser åbnes read-only.
Ingen format- eller breddeberegningslogik ændres.
```

## Ved tvivl

Bekræft først, at sæsonen reelt er afsluttet. Hvis rapporten fortsat udelukker 2026/27 fra oversigten, eller scriptet kræver mere end en sæsonstatusrettelse, stop og skriv spørgsmålet her — udvid ikke opgaven til en metodeændring.

## Gren

`arbejde/128-genkoer-127-efter-saeson-2026-27`, fra opdateret `main`.

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
(udfyldes ved udførelse efter sæsonafslutning)
```

**Hvad blev gjort:**

**Hvad blev fravalgt og hvorfor:**

**Commits:**
