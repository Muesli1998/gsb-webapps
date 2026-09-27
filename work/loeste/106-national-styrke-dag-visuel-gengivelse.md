# Opgave 106 — visuel gengivelse af den nationale styrke-DAG (104+105 samlet)

**Trin:** Videreudvikling (bygger på 086c's visuelle kort-mønster, 104's nationale styrke-DAG, 105's
regionale udvidelse).

**Baggrund:** Opgave 104 byggede den nationale styrke-DAG (DH-stigen: Ligaen↔1.division↔2.↔3.↔
Danmarksserien) som et JSON/MD-dokument — tabeller, ikke en visuel gengivelse. Opgave 105 udvidede
DAG'en i en SEPARAT fil (`105-national-styrke-dag.json`) med fem regionale strukturnoder (Kredsserie
Vest, Sjællandsserien, LF-Serien, Københavnsserien, Bornholmsserien) og deres kanter til
Danmarksserien. Christoffer har spurgt om "lokalserierne er lagt ind i den totale oversigt" og
ønsker nu en visuel gengivelse af HELE strukturen — DH-stigen OG de fem regionale grene samlet i ét
billede — efter samme visuelle sprog som 086c's kort (som Christoffer allerede kender og har
godkendt farve-/linjekoden for).

Dette er en RENDERING-opgave, ikke en ny dataopgave: al data findes allerede i `104-national-styrke-
dag.json` og `105-national-styrke-dag.json`. Opgaven skal IKKE genberegne noget nyt fagligt indhold.

## Mål

1. **Byg en samlet, visuel gengivelse af DAG'en** der viser DH-stigen (Ligaen→1.div→2.div→3.div→
   Danmarksserien) og de fem regionale grene fra 105 samlet i ét hierarkisk billede — Danmarksserien
   i midten/toppen af regionerne, med de familierene DH-kanter og de regionale/strukturelle kanter
   visuelt adskilt (fx farve- eller linjestil-kode, som i 086c), så det ALDRIG ser ud som om
   familiegrænserne er sportsligt sammenlignelige tværs af familie.
2. **Gengiv tydeligt kanttype-forskellen**: `familieren_regeltekst` (sikker, samme spilleform-familie)
   vs. `strukturel_regeltekst` (DH's egen officielle stige, tværs af familie, kun organisatorisk) vs.
   `strukturel_regeltekst_regional` (regionens faste plads til Danmarksserien, kun organisatorisk).
   Brug en tydelig legend, ligesom 086c's.
3. **Vis dækningsgraden/citeringen** ved hover/klik eller i en synlig label pr. kant — hvilken
   reglementsudgave/§ dokumenterer kanten, og for hvilke sæsoner (fra 105's kildedækningstabel), så
   et ukendt/uafklaret hul (fx 2010/11–2019/20, 2021/22) ikke fremstår som dokumenteret bare fordi
   kanten findes.
4. **De ~20.130 uforbundne noder** (enkeltstående puljer/familier uden dokumenteret niveauforhold) skal
   IKKE alle tegnes enkeltvis — det ville være ulæseligt. Vis dem samlet/aggregeret (fx et antal eller
   en foldet gruppe pr. familie/region), med mulighed for at folde ud, hvis det er teknisk simpelt;
   ellers er en tekstnote om antallet nok. Prioritér at DH-stigen + de 5 regionale grene er tydelige og
   læsbare.

## Afgrænsning

**Må røres:** nyt script under `statistik/scripts/` (byg videre på 104/105's output-JSON som datakilde,
ikke egen genberegning), en ny outputfil under `statistik/results/` (fx `106-national-styrke-dag-
visuel.html`, efter samme enkelt-fil-mønster som 086c).

**Må ikke røres:** `statistik/data/*.db` (denne opgave har ingen grund til overhovedet at åbne
databasen — al data kommer fra 104/105's allerede genererede JSON), `104-national-styrke-dag.json`,
`105-national-styrke-dag.json` (læses, ændres ikke), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`.

## Kontekst

- `statistik/results/086c-udvidet-visuelt-kort.html` — det visuelle sprog/mønster Christoffer allerede
  har godkendt (farve-/linjekode for spilleform-familier); genbrug samme designtilgang for konsistens.
- `statistik/results/104-national-styrke-dag.json`/`.md`, `statistik/results/105-national-styrke-dag
  .json`, `statistik/results/105-regionale-oprykningspladser-og-reglementer.md` — al data denne
  opgave skal visualisere; ingen ny research.

## Kontrol

**Målet:**
```
Én samlet HTML-visning viser DH-stigen og alle fem regionale grene fra 105, i ét billede.
Kanttyperne (familieren_regeltekst / strukturel_regeltekst / strukturel_regeltekst_regional) er
  visuelt tydeligt forskellige, med en legend.
Citerings-/dækningsinfo (reglementskilde + hvilke sæsoner) er synlig pr. kant, uden at foregive
  dækning for sæsoner der ikke er fundet.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen ændring i 104- eller 105-JSON'en (kun læst).
Intet nyt fagligt indhold/ingen ny kant er opfundet i denne opgave — alt kommer fra 104/105.
```

**Skøn:** det tekniske valg af rendering-bibliotek/metode (SVG håndbygget, D3, ren HTML/CSS-layout,
eller samme fremgangsmåde som 086c allerede brugte) er Codex' eget skøn — vælg det der giver mest
læsbart resultat med mindst kompleksitet, og begrund kort i Resultatnoten.

## Ved tvivl

Er det uklart hvordan en kant skal placeres visuelt (fx om en regional gren skal tegnes under eller
side om side med DH-stigen), vælg den fremstilling der bedst understreger at det er ADSKILTE
spilleform-familier forbundet af en organisatorisk regel — aldrig en fremstilling der antyder en fælles
styrkeskala. Er det uklart om noget fagligt indhold mangler (fx en kant der burde være der men ikke er
i 104/105's JSON), spørg i "Spørgsmål" i stedet for selv at tilføje den.

## Gren

`arbejde/106-national-styrke-dag-visuel-gengivelse`, fra `main`.

---

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*

### Resultat (2026-09-27)

**Hvad blev gjort:**

- Tilføjede `statistik/scripts/106-generate-national-styrke-dag-visual.mjs`, som kun læser 104- og 105-JSON og genererer én selvstændig HTML-visning.
- HTML'en viser DH-stigen centralt og de fem regionale strukturgrene under Danmarksserien: Kredsserie Vest, Sjællandsserien, LF-Serien, Københavnsserien og Bornholmsserien.
- Tre kanttyper er adskilt med massiv blå, stiplet orange og prikket lilla linje samt legend og foldbare kilde-/dækningskort pr. kant.
- De 20.134 uforbundne noder er bevidst foldet til en talnote, ikke tegnet enkeltvis.

**Kontroloutput:**

- 104-baseline: 20.145 noder og 8 kanter; alle 8 er bevaret i 105.
- Renderet 105-model: 20.150 noder, 13 kanter og 5 regionale strukturkanter.
- HTML-indholdskontrol: 17.819 bytes; alle fem regionalnavne, alle fem DH-niveauer, alle tre tekniske kanttyper og dækningshullerne `2010/11–2019/20` og `2021/22` findes i filen.
- `git diff --exit-code` for begge 104/105-kilde-JSON'er gav ingen forskel.

**Hvad blev fravalgt og hvorfor:**

- Ingen ny kant eller faglig data: renderingen bruger udelukkende de eksisterende JSON-felter.
- Ren HTML/CSS med SVG-lignende linjeforløb blev valgt frem for D3/bibliotek, fordi den har nul afhængigheder og er let at åbne som én fil, i samme enkelt-fils-ånd som 086c.
- Ingen database blev åbnet eller skrevet. `git status --short statistik/data/` viser kun den allerede kendte, ustagede mappe.

**Commits:** udfyldes ved commit.
