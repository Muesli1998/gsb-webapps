# Opgave 143 — genkør 132 og 138 på rettet regelbog

## Baggrund

Opgave 142 retter sæsonfastlæggelsen og mærker usikre kilder. 132/138-resultaterne skal genkøres mod den regelbog, uden at ændre deres afsluttede baselinefiler.

## Mål

Genberegn regelbogsannotering, formatplacering og København-bredde pr. ungdomssæson/aldersgruppe med 136-parseren og den rettede 142-regelbog; forklar hver forskel mod 132/138.

## Afgrænsning

**Må røres:** nyt `statistik/scripts/143-genkoer-138.mjs`; nye `statistik/results/143-raekkenavne-vs-regelbog.md/.json`, `143-ungdom-i-tal.json`, `143-aendringer-mod-138.md`; dette kort.

**Må ikke røres:** 127/129/130/133/134/136/138/141-resultatfiler eller eksisterende scripts; parser 136; regelbogsfiler (opgave 142 ejer dem); databaser; `apps/netlify-prod/`; `docs/BESLUTNINGER.md`; artifact. Ingen downloads/netværk.

## Mål / arbejdsrækkefølge

1. Genkør 132 på 142-regelbogen; vis hvilke forklaringer skiftede status og hvor mange betingede/afstand- eller kildesæson-usikre forklaringer der er svage.
2. Genkør 138 med 136 og den rettede regelbog; medtag pr. række `regelbog_status`, `regelbog_afstand`, `kilde_saeson_usikker` og `tolkning_regel`, samt 127's `missing_rows` med tolket/uforklaret/afvist-status og sammenligning med 138.
3. Genberegn placering efter format 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger og niveau E > M > A > B > C > C-D > D, tal faldende; UGE 38 udelades. Genberegn bredde som region-8-rækker med mindst ét GSB-hold. Forklar placering/bredde før (127) og efter (143) pr. sæson/aldersgruppe, række for række; ingen uforklarede forskelle. GSB-baseline 279 = 133 + 53 + 12 + 62 + 19 bevares eller afvigelser forklares.
4. Tæl 136-fejlen for bare `A (4+3)` / `Elite`-navne og de fem tidligere fejl; vis 10 eksempler og mulig placeringseffekt. Ret ikke 136.
5. Efterse 25 rækker, hvor placering/bredde ændredes, mod rådata og PDF-side; mindst 10 med regelbogsstatusskift i 142.

## Kontrol

**Målet:** alle forskelle mod 132/138 forklares række for række; rangering og bredde genberegnet pr. sæson/alder; `missing_rows` sammenlignet; stikprøve på 25 rækker.

**Værnet:** DB SHA-256 uændrede: normalized `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`, landscape `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; `git status --short statistik/data/` tom; parser-suite 28/28 uændret; ingen ændring af afsluttede baselinefiler.

**Skøn:** tekstforklaringerne kan læses uden at kende implementeringen.

## Ved tvivl

Ingen niveauafledning fra pointtal. Parserens kendte eksplicit-niveau-fejl rapporteres, ikke rettes. Tvivl skrives nedenfor.

## Gren

`arbejde/142-143-regelbog-rettelse`; start først efter 142-resultatet er vist og afklaret.

## Spørgsmål

Kontrolpunktet om “25 rækker hvor placering/bredde skiftede, mindst 10 med skiftet regelbogsstatus fra 142” kan ikke opfyldes uden at opfinde forskelle: 142's fire statusovergange er senior/veteran; ungdomsstatus og primær kilde for alle regioner i 132/138 er uændret. 0 af 17.140 rækkenavn/scope-poster i 132 skiftede status/forklaring, og 0 af 6.766 ungdomsposter i 138 skiftede regelbogstatus, parserstatus eller 127-placering. Derfor blev 25 eksisterende 138 PDF/rådata-stikprøver genkontrolleret med pdfplumber som ikke-ændringskontrol, men de tæller ikke som ændrede rækker. Chris må afgøre, om denne dokumenterede 0-delta-kontrol accepteres i stedet for det matematisk umulige krav om 25 ændrede rækker/10 ungdomsstatusskift.

## Tilbagefald

(Ingen.)

## Resultat

Genkørte 132/138-logikken på regelbogen fra 142 i nye outputs; eksisterende 132- og 138-filer er urørte. Oprettede `statistik/scripts/143-genkoer-138.mjs`, `statistik/results/143-raekkenavne-vs-regelbog.md/.json`, `143-ungdom-i-tal.json` og `143-aendringer-mod-138.md`.

132: 17.140 rækkenavn/scope-poster før og efter; 0 status-/kilde-/forklaringsændringer. Forklaringer med betinget status: 164; svage (afstand ≥3 eller markeret usikker): 63. 138: 6.766 ungdomsposter og 361 missing_rows før/efter; 0 rækkeforskelle, 0 missing_rows-forskelle. Af de manglende rækker er 202 nu tolket, 157 fortsat uforklarede og 2 afvist fra hovedplacering som UGE 38. Alle 69 sæson/alder-kombinationer blev genberegnet fra GSB-holdenes rangerede format-/niveaufelter og region-8-rækkerne; placering og bredde stemmer med 127 i 69/69, ændringer 0. UGE 38 forbliver udeladt. GSB-baseline: 279 = 133 + 53 + 12 + 62 + 19.

136-fejlen findes i 5 fysiske rækker: tre `A (4+3)` og to `U13/U15 Elite/Mesterrække (4+3)` i 2011/12–2012/13. Ingen af de fem sæson/alder-formatkombinationer har GSB-hold i samme 4+3-format, så mulig intern rækkefølgeændring flytter 0 GSB-bedste placeringer og 0 bredde. Rapporten viser disse fem fund plus fem separate effektkontroller; parseren er uændret.

25/25 138-stikprøver blev åbnet mod angivne PDF-sider med pdfplumber; alle sideintervaller var gyldige og tekst kunne udtrækkes på 6 PDF'er. De opfylder ikke kortets ændringsstikprøvekrav, da ændrede ungdomsrækker ikke findes; dette står ovenfor under Spørgsmål. Databasehashes før/efter er uændrede: normalized `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`, landscape `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; `git status --short statistik/data/` tom. Ingen ændring af 127/129/130/133/138/136-baselines.
