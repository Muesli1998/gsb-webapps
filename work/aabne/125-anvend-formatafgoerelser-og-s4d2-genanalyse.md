# Opgave 125 — anvend Christoffers formatafgørelser og genkør S4/D2-analysen med holdside

## Baggrund

Opgave 123 lod 247 rest-puljer stå som `afventer` (`statistik/results/123-format-tekstgenkendelse/format-mapping.json`).
Opgave 124 har lagt `team_side` i `player_match_extras` (`national-spillere.db`).
Christoffer har afgjort:

- **`(4)`** (34 puljer) → `4 spillere`
- **Puljer uden formattekst** (S4/D2-struktur, ingen tekstvariant) → `4 spillere`
- **`4-8 spillere`** (131) → egen kategori `4-8 spillere`, IKKE `4 spillere`
- **`4 m/k`** (82) → egen kategori `4 m/k`, IKKE `4 spillere` (rettelse af 123's forslag "4 spillere?")
- **Øvrige varianter i mappingen** (fx `4 dr hold`, hvis de findes): egen kategori med variantens egen tekst; ingen sammenlægning
- `4 piger` afgøres IKKE ud fra teksten alene, men ud fra data (se Mål 2).

Stikprøve fra Claude (holdsider pr. kamp i S4/D2-puljer, kun spillere med kendt køn): `4 piger`-tekst er ca. 99 % rene pigehold; øvrige varianter er blandede.

## Mål

1. Opdatér mappingen (ny fil `statistik/results/125-format-afgoerelser/format-mapping.json`, opgave 123's fil forbliver uændret) og generér et nyt katalog med endeligt `format` pr. fysisk pulje (`season_id`, `age_group_id`, `league_group_id`). Behold `tekstvariant` og `strukturfamilie` som separate felter.
2. Genkør S4/D2-analysen med `team_side`: for hver S4/D2-pulje (ungdom, aldersgruppe 2,3,4,5,6,7,18), tæl holdsider pr. kamp som `kun kvinder` / `kun mænd` / `blandet` / `ukendt køn` (kendt køn = `players.gender_status` mand/kvinde; `ikke afklaret`, `modstridende data` og rækker uden `team_side` tæller som ukendt). Rapportér pr. pulje andelen af hver, og en foreslået klassifikation (fx "overvejende piger") som Christoffer kan godkende. Sæt ikke `4 piger` på en pulje uden at vise andelene og dækningen.
3. Rapportér dækning: hvor stor en del af holdsiderne der har kendt køn, og hvor mange puljer der ikke kan afgøres.
4. Opdatér tallene for den uafklarede rest (775 før 123) og angiv hvor mange puljer der nu er afklaret / egen kategori / stadig uafklaret.

## Afgrænsning

- Gæt ikke køn ud fra navne. Ingen ny scraping. Ingen ændringer i `gsb-statistik-normalized.db`, `liga-landskab.db` eller eksisterende tabeller i `national-spillere.db` (kun læsning).
- Renskriv IKKE opgave 115's rangering; det er næste kort.
- Ret ikke 112- eller 123-filer.

## Kontrol

- SHA-256 på de to beskyttede databaser før/efter; rækketal på `players`, `matches`, `player_matches`, `player_match_extras` uændrede.
- Stikprøve på 10 puljer: vis at klassificeringen kan genskabes manuelt fra `context_raw`/`player_match_extras`.
- Tallene for `4 spillere`, `4 piger` og de egne kategorier skal summe til antal S4/D2-puljer.

## Gren

`arbejde/125-formatafgoerelser-s4d2-genanalyse`

## Spørgsmål

## Resultatnote
