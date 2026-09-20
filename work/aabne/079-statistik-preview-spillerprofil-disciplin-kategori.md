# Opgave 079 — spillerprofil: kategorier vist pr. disciplin, med sejre/kampe-tal

**Trin:** Forbedring af Klubstatistik Preview, opdaget under brugerfeedback-runde 1 — se
`docs/idebank-statistik.md`, afsnittet "Klubstatistik Preview — brugerfeedback runde 1
(2026-09-20)".

**Gren:** `arbejde/079-statistik-preview-spillerprofil-disciplin-kategori`, jf. `AGENTS.md`.

**Baggrund:** Spillerprofilens "Kategorier spillet"-sektion (bygget i opgave 064) viser i dag rå
`category_raw`-værdier med board-præfiks — "1. HS", "2. HS", "1. D", "2. D" osv., op til tolv rækker
for én spiller. Chris' feedback: det er svært at læse, og board-nummeret er ikke det interessante —
disciplinen er. Ønsket visning for en herrespiller: HS, HD, MD, S, D (fem rækker). For en
damespiller: DS, DD, MD, S, D.

## Mål

1. Aggregér spillerprofilens kategori-sektion på `individual_matches.discipline_raw` i stedet for
   `category_raw` — dvs. slå alle "N. HS"-rækker sammen til én "HS"-række pr. spiller, og
   tilsvarende for de øvrige fem disciplin-værdier (HS/DS/HD/DD/MD/S/D — genbrug samme
   disciplin-liste som opgave 065's Kategori-fane, inkl. "Fri single"/"Fri double" for S/D, se
   `work/loeste/065-statistik-preview-fane-kategori.md` for den fulde begrundelse).
2. En given spiller viser kun de disciplin-rækker vedkommende faktisk har spillet — ikke alle syv
   for alle. En herrespiller der kun har spillet HS/HD/MD skal ikke have tomme DS/DD-rækker.
3. Tilføj sejre/kampe-tal (fx "24S-16T" eller "24-16") ved siden af eller under winrate-baren for
   hver disciplin-række, samme mønster som andre S-T-records i preview'en (fx Hjemme/Ude-fanen fra
   opgave 066).

## Kontekst

Se `profileStats`/`profileHtml` i `klubstatistik-preview/klubstatistik.js` (bygget i opgave 064) —
denne opgave ændrer kategori-aggregeringen der, ikke resten af profilen (KPI'er, hold spillet for,
sæson for sæson, modstandere rører ikke ved dette kort). Genbrug disciplin-listen og
"Fri single"/"Fri double"-navngivningen fra opgave 065 konsekvent, så samme spiller får samme
kategori-navne på tværs af Kategori-fanen og spillerprofilen.

## Afgrænsning

**Må røres:** `klubstatistik-preview/klubstatistik.js` (kun `profileStats`/`profileHtml`-delen og
den tilhørende kategori-rendering), `klubstatistik-preview/styles.css` hvis nye klasser er
nødvendige for sejre/kampe-tallet, `klubstatistik-preview/test_preview.py`.

**Må ikke røres:** øvrige dele af spillerprofilen (KPI'er, hold, sæson, modstandere), øvrige faner,
`statistik/data/gsb-statistik-normalized.db` (læses kun), andre apps.

## Kontrol

**Målet:** for mindst 3 spillere (genbrug evt. Norr Bagge Köhler, Akhila Sureddy, Tobias Geil
Christophersen fra opgave 064's kontrol, så tallene kan krydstjekkes): antal disciplin-rækker
matcher det faktiske antal distinkte `discipline_raw`-værdier spilleren har, ingen rækker med 0
kampe vises, og sejre+tab for hver disciplin-række summer til det korrekte kamptal for den
disciplin (verificér mod en direkte SQL-optælling). Vis de faktiske tal i resultatnoten.

**Værnet:** Kategori-fanen (065) og Klub-karriere-fanen (069) er uændrede — kør deres eksisterende
testassertions og bekræft de stadig består.

**Skøn:** ingen.

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
