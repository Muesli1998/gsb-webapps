# Opgave 068 — Klubstatistik: Sæson-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/068-statistik-preview-fane-saeson`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne opgave bygger kun
"Sæson"-fanens indhold: udvikling i winrate og kamptal over tid, for den valgte aldersgruppe.

## Mål

En tabel: Sæson | Kampe | Winrate (bar-fill), én række pr. sæson, for den valgte
aldersgruppe/underfilter. Se mockuppens "Sæson"-fane for det visuelle facit.

## Kontekst

Sæson står i `seasons`/`team_matches.season_id` (se `statistik/sql/schema-normalized.sql`). Denne
fane er IKKE begrænset af det øvrige sæson-dropdown i filterbaren (opgave 061) — den viser
udviklingen HEN OVER sæsonerne, så den skal hente alle sæsoner uafhængigt af filterbarens
sæsonvalg, men respektere aldersgruppe/underfilter-valget. Dokumentér i resultatnoten hvordan dette
er skilt ad i datalaget, hvis det kræver en anden forespørgsel end resten af siden.

## Afgrænsning

**Må røres:** kun `.pane` for Sæson. **Må ikke røres:** øvrige faner, andre apps,
`statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** antal sæsoner i tabellen stemmer med antal distinkte sæsoner i databasen for den valgte
aldersgruppe (verificér og skriv tallet i resultatnoten).

**Værnet:** ingen ændring af øvrige faners kode, og filterbarens eget sæson-dropdown (til de øvrige
faner) fungerer stadig uændret.

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
