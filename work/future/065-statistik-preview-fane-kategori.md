# Opgave 065 — Klubstatistik: Kategori-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/065-statistik-preview-fane-kategori`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne opgave bygger kun
"Kategori"-fanens indhold: winrate pr. kategori (single/double/mixed), for den valgte filtrering.

## Mål

En tabel (samme bar-fill-stil som `analyse.html`):

| Kategori | Kampe | Winrate |

Med rækker for herresingle, damesingle, herredouble, damedouble, mixeddouble — samlet for den
aktuelt filtrerede delmængde (aldersgruppe/underfilter/sæson). Se mockuppens "Kategori"-fane for det
visuelle facit.

## Kontekst

Kategori står i `individual_matches.category_raw`/`discipline_raw` (se
`statistik/sql/schema-normalized.sql`). Brug de rå kategoriværdier direkte — gæt ikke en mapping der
ikke allerede er dokumenteret; hvis en kategoriværdi er uklar, dokumentér den som uafklaret i
resultatnoten i stedet for at gætte, jf. `statistik/AGENTS.md`s "Aldrig gæt".

## Afgrænsning

**Må røres:** kun `.pane` for Kategori. **Må ikke røres:** øvrige faner, andre apps,
`statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** de fem kategoriers kamptal summer til et tal der stemmer med det samlede antal
individuelle kampe for den valgte filtrering (verificér og skriv begge tal i resultatnoten).

**Værnet:** ingen ændring af øvrige faners kode.

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
