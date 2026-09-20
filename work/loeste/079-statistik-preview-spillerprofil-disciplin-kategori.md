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

Implementeret i `klubstatistik-preview/klubstatistik.js` med disciplin som
aggregeringsnøgle og fælles navngivning (`Fri single`/`Fri double`). Profilen
viser kun discipliner med kampe og viser sejre-tab pr. disciplin. Den nye
record-styling ligger i `styles.css`; browserkontrollen er udvidet i
`test_preview.py`.

Kontrol mod direkte SQL for U9-filteret (`age_group_id=2`) gav:

- Norr Bagge Køhler (`player_id=5425`): Fri double 18 kampe = 7S–11T;
  Fri single 22 kampe = 15S–7T. Preview: 2 disciplinrækker.
- Akhila Sureddy (`player_id=67`): Fri double 19 kampe = 12S–7T;
  DD 1 kamp = 0S–1T; Fri single 20 kampe = 14S–6T. Preview: 3
  disciplinrækker.
- Tobias Geil Christophersen (`player_id=5419`): Fri double 14 kampe =
  9S–5T; Fri single 19 kampe = 10S–9T. Preview: 2 disciplinrækker.

Alle viste rækker har dermed >0 kampe, og sejre+tab matcher SQL-tallene.
Værnet bestod: Kategori-fanen havde 7 rækker med kamptal
`[2222, 1331, 5627, 2231, 3387, 3410, 2105]`; Klub-karriere-assertions
bestod. Den samlede regression gav hjemme/ude `1442/1375`, 40
modstander-rækker, 15 sæsonrækker og 1 API-request.

Kørt og bestået: `python -m py_compile server.py`, `node --check
klubstatistik.js` og `python test_preview.py` (exit code 0). Databasen var
read-only; ingen andre apps eller data blev ændret.
