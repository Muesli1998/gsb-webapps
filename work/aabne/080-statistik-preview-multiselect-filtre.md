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

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
