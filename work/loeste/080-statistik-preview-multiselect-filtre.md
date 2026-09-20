# Opgave 080 — multi-select på sæson- og ungdoms-underfilter

**Trin:** Forbedring af Klubstatistik Preview, opdaget under brugerfeedback-runde 1 — se
`docs/idebank-statistik.md`, afsnittet "Klubstatistik Preview — brugerfeedback runde 1
(2026-09-20)".

**Gren:** `arbejde/080-statistik-preview-multiselect-filtre`, jf. `AGENTS.md`.

**Baggrund:** Filterbaren (bygget i opgave 061) tillader i dag kun ét valg ad gangen for
sæson-dropdownen og for ungdoms-/veteran-underfiltrene. Chris ønsker at kunne vælge flere ad gangen
— fx to eller tre sæsoner samtidig, eller flere ungdoms-årgange samtidig.

## Mål

1. Sæson-filteret (`#season-filter`) skal understøtte at vælge flere sæsoner samtidig, ikke kun
   "Alle sæsoner" eller præcis én. Vælg en UI-mekanik der passer ind i den eksisterende
   filterbar-stil (fx checkboxes i en dropdown, eller en multi-select-liste) — dokumentér valget og
   hvorfor i resultatnoten.
2. Ungdoms-/veteran-underfiltrene (`#youth-filters`/`#veteran-filters`, de pille-formede knapper)
   skal understøtte at flere kan være aktive samtidig, ikke kun én ad gangen.
3. Alle faner (Overblik, Hold, Kategori, Hjemme/Ude, Modstanderhold, Sæson, Spillere,
   Klub-karriere) skal opdatere deres data korrekt til UNIONEN af de valgte sæsoner/underfiltre —
   dvs. "vis data for sæson 2023 ELLER 2024", ikke et skæringspunkt der giver 0 resultater.
4. Datalaget må fortsat kun hente `/api/data`/`data.json` ÉN gang — filtreringen skal ske
   klient-side på det allerede hentede datasæt, samme mønster som resten af preview'en.

## Kontekst

Se `renderFilters`/`state`-objektet i `klubstatistik-preview/klubstatistik.js` (opgave 061) for den
nuværende single-select-implementering. Denne opgave ændrer selve filter-state'en fra enkeltværdi
til sæt (array/Set) og skal derfor opdatere alle faners filtrerings-funktioner, som alle læser fra
samme `state`-filtre — gennemgå hver fane for steder der antager præcis én valgt sæson/ét
underfilter.

## Afgrænsning

**Må røres:** `klubstatistik-preview/klubstatistik.js` (filter-state og alle faners
filtreringslogik), `klubstatistik-preview/klubstatistik.html` (filterbar-markup hvis UI-mekanikken
kræver det), `klubstatistik-preview/styles.css`, `klubstatistik-preview/test_preview.py`.

**Må ikke røres:** selve datalaget/`data.json`-hentningen (fortsat ét kald), `server.py`,
`statistik/data/gsb-statistik-normalized.db`, andre apps.

## Kontrol

**Målet:** vælg mindst 2 sæsoner samtidig og bekræft at Overblik-fanens KPI'er matcher summen af de
to sæsoners data hver for sig (test og dokumentér de faktiske tal). Vælg mindst 2
ungdoms-underfiltre samtidig og bekræft samme princip for Hold-fanen. Test at "0 valgt" og "alle
valgt" begge giver meningsfulde, ikke-tomme resultater.

**Værnet:** `apiRequests`-tallet forbliver 1 efter alle filterkombinationer og faneskift (samme
kontrol som alle tidligere faner). Ingen ændring af `server.py` eller databasen.

**Skøn:** UI-mekanikken for multi-select (checkboxes vs. multi-select-liste vs. toggle-pills) — vælg
det der passer bedst ind i den eksisterende stil, dokumentér valget.

## Ved tvivl

Er det uklart om en given fanes beregning skal være UNION eller SKÆRING af de valgte filtre: stop
og skriv under "Spørgsmål" — antag UNION som udgangspunkt (jf. Målet), men bekræft eksplicit hvis en
fane har en anden naturlig fortolkning (fx sammenligning i stedet for samling — det hører til det
separate, endnu ikke skrevne sammenligningsværktøj, ikke denne opgave).

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

Implementeret på klient-siden i `klubstatistik.js` uden ændring af `/api/data`-
hentningen. Sæsonfilteret er en foldbar menu med checkboxer; tomt valg betyder
alle sæsoner, og flere valgte checkboxer filtrerer som UNION. Ungdoms- og
veteran-pillerne toggler uafhængigt; tomt underfilter betyder alle årgange/
klasser i den valgte hovedgruppe. Sæsonfilteret gælder nu også Sæson- og
Klub-karriere-fanen, så alle faner bruger samme filtrerede udsnit.

Browserkontrol på data fra den lokale Dropbox-konfiguration:

- Alle: `2.817` holdkampe, `472` hold, `462` puljer; KPI'er `50%`, `2.817`,
  `7.598`, `453`.
- Ungdom uden valgt underfilter: `1.353` holdkampe; Hold-fanen havde `1.277`
  samlede kampe i de viste holdrækker.
- To valgte ungdomsårgange: `425` kampe i Hold-fanen, svarende til `98` og
  `327` hver for sig (`425 = 98 + 327`), >0 rækker, og samme
  filtreringsmodel blev brugt på alle faner.
- De to seneste databelagte sæsoner gav samlet `73` holdkampe; hver for sig
  gav de `25` og `48`, og testen bekræftede `73 = 25 + 48`.
- 0 valgte sæsoner gav igen U9-baselinen `105` holdkampe. Alle sæsoner valgt
  gav også `105`; begge tilfælde var ikke-tomme.
- Regressioner bestod: hjemme/ude `[1442, 1375]`, kategori `7` rækker med
  `[2222, 1331, 5627, 2231, 3387, 3410, 2105]`, 40 modstander-rækker,
  6 sæsonrækker i U9-udsnittet og spillerprofil-/karriere-assertions.
- `apiRequests` for hele testforløbet var `1`.

Kørt og bestået: `python -m py_compile server.py test_preview.py`,
`node --check klubstatistik.js` og `python test_preview.py` med den allerede
eksisterende lokale Playwright-runtime (exit code 0). Databasen og
`server.py` blev ikke ændret.
