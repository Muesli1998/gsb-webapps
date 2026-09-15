# Opgave 020 — undersøg de resterende uforklarede stillingsafvigelser

**Trin:** Test & Validation

**Skal køres efter opgave 019 er afsluttet, mergeet til main og
`statistik/results/015-stillingskontrol.md/.json` dermed er opdateret med
den rettede matching-nøgle.** Er 019 ikke færdig endnu (heller ikke på
egen umerget gren), så stop og spørg i stedet for at arbejde videre på de
gamle, kendt-forkerte tal.

---

## Mål

For hver række der efter 019's rettelse stadig er klassificeret
`unexplained_from_current_material` i `results/015-stillingskontrol.json`:
find en konkret forklaring i allerede gemt data, eller dokumentér den
som reelt uforklaret.

## Kontekst

Opgave 015 fandt oprindeligt 31 rækker i denne kategori (afvigelse mellem
stillingens kampantal og databasens, uden corona-status og uden manglende
kobling). Opgave 018 og 019 handlede om en anden delmængde (de 24
"no_linked"-rækker, som var en koblingsfejl) — de 31 er ikke undersøgt af
nogen af dem, og tallet kan være ændret af 019's rettede matching, så
brug det NYE tal fra 019's kørsel, ikke 31 som et fast facit.

For hver tilbageværende uforklaret række: undersøg om de linkede
holdkampes gemte felter (`status`, `result_raw`, walkovertekst,
`result_marker_raw`, bemærkningsfelter) indeholder en forklaring der ikke
blev fanget af 015's automatiske statusoptælling — fx enkeltkampe med
`browser_verified_no_result` uden at være corona-relaterede, eller en
tællefejl hvor et antal Golden Set-kampe er talt forskelligt af stillingen
og af databasen.

## Afgrænsning

**Må røres:** `statistik/` — ny rapport under `statistik/results/`,
`statistik/TEST_RUN_LOG.md`, og `docs/statistik-plan.md` (kun afsnittet
"Kampantal er holdt op mod stillingerne", og kun hvis konklusionen om
bestået/ikke bestået ændrer sig som følge af denne undersøgelse).

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave
undersøger og dokumenterer — den retter ikke feltværdier eller
matching-logik (det hører til i 019, som allerede er afsluttet når denne
starter). Heller ikke `docs/historik/`, `apps/netlify-prod/` eller
Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "020\|unexplained-standings"
```

Skal give mindst én ny rapportfil.

```
grep -c "020" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

Rapporten skal for hver undersøgt række vise: sæson, pulje, hold,
afvigelse, og enten en konkret forklaring med henvisning til det gemte
felt der beviser den, eller "fortsat uforklaret".

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/020-undersoeg-resterende-uforklarede-stillinger
```

Må ikke vise ændringer i `apps/`, `kampsystem/`, `docs/historik/` eller
`data/`.

**Skøn:**

- En forklaring skal bygge på et konkret, gemt felt for den specifikke
  kamp — ikke antages ud fra mønsteret i andre rækker.
- Ændrer denne undersøgelse markant på antallet af reelt uforklarede
  rækker, så opdatér konklusionen i `docs/statistik-plan.md` til at
  afspejle det nye, mere præcise billede.

## Ved tvivl

Kræver en forklaring adgang til data der ikke allerede er gemt (fx en ny
kildehentning), så lad rækken stå som uforklaret og skriv det under
"Spørgsmål" i stedet for at hente ny data i denne opgave.

## Gren

`arbejde/020-undersoeg-resterende-uforklarede-stillinger`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**De undersøgte rækker og deres konklusion:**

**Ændrer dette "Kampantal er holdt op mod stillingerne"s status i docs/statistik-plan.md:**

**Commits:**
