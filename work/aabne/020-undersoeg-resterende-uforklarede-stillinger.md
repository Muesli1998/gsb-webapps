# Opgave 020 — undersøg de resterende uforklarede stillingsafvigelser

**Trin:** Test & Validation

**OPDATERET 2026-09-15: 019 er lukket UDEN at ændre 015's tal** (se
`work/loeste/019-ret-matching-noegle-stillingskontrol.md` — den planlagte
rettelse virkede ikke, og årsagen viste sig at være dybere end en
matching-key-bug). Der findes derfor ingen "opdateret efter 019"-version
af `results/015-stillingskontrol.json` at vente på — brug de
EKSISTERENDE, oprindelige tal fra opgave 015 direkte. Den oprindelige
spærring nedenfor er ophævet; denne opgave kan køres nu.

---

## Mål

For hver række der i det nuværende `results/015-stillingskontrol.json`
er klassificeret `unexplained_from_current_material`: find en konkret
forklaring i allerede gemt data, eller dokumentér den som reelt
uforklaret.

## Kontekst

Opgave 015 fandt 31 rækker i denne kategori (afvigelse mellem
stillingens kampantal og databasens, uden corona-status og uden
manglende kobling). Opgave 018 og 019 handlede om en helt anden
delmængde (de 24 "no_linked"-rækker) — de 31 er ikke undersøgt af nogen
af dem, og tallet er UÆNDRET (019 rettede intet, se ovenfor). Brug 31
som det aktuelle facit for hvor mange rækker denne opgave skal gennemgå,
ikke som et tal der først skal genberegnes.

**Ikke denne opgaves ansvar:** den nye, dybere spørgsmålsstilling om
holdnummer-stabilitet på tværs af datakilder, som 019 rejste. Det er et
separat, uafklaret spørgsmål (se `statistik/RESEARCH_BACKLOG.md`) — bland
det ikke ind i denne undersøgelse af de 31 uforklarede rækker, medmindre
en konkret af de 31 rækker viser sig at have samme symptom (i så fald:
dokumentér det som endnu et eksempel i backloggen, ikke som en løsning
her).

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

Årsagerne bag `browser_verified_no_result` og de to 2025-`api_error`-kampe
kan ikke afgøres uden ekstern hentning; de er derfor ikke omklassificeret.

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
ls statistik/results/ | grep -i "020\|unexplained-standings"
020-unexplained-standings.md

grep -c "020" statistik/TEST_RUN_LOG.md
1

git status --short statistik/data/
(tom)

Klassifikation: 31 undersøgt; 10 med konkret gemt evidens; 21 fortsat uforklarede.
```

**De undersøgte rækker og deres konklusion:**

Se den fulde række-for-række tabel i `statistik/results/020-unexplained-standings.md`.

**Ændrer dette "Kampantal er holdt op mod stillingerne"s status i docs/statistik-plan.md:**

Nej. Kontrollen er fortsat ikke bestået; undersøgelsen reducerer ikke de
oprindelige afvigelser til en godkendt datakvalitet.

**Commits:**
