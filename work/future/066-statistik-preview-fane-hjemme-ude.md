# Opgave 066 — Klubstatistik: Hjemme/Ude-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/066-statistik-preview-fane-hjemme-ude`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne opgave bygger kun "Hjemme/Ude"-
fanens indhold: er klubben stærkere på hjemmebane, for den valgte filtrering.

## Mål

To store pct-tal side om side (samme stil som `.pct-big`/`.team-card` i `analyse.html`), med
S-T-record under hver:

- Hjemme: winrate + antal kampe (sejre/kampe)
- Ude: winrate + antal kampe (sejre/kampe)

Se mockuppens "Hjemme/Ude"-fane for det visuelle facit.

## Kontekst

Hjemme/ude afgøres af hvilken side i `team_matches` GSB-holdet stod på (`home_name_raw` vs.
`away_name_raw`, sammenholdt med `gsb_team_id`/`teams.name_raw`) — se
`statistik/sql/schema-normalized.sql`. Dokumentér i resultatnoten hvordan hjemme/ude er afgjort for
en kamp, hvis det ikke er umiddelbart entydigt fra disse felter (gæt ikke, jf.
`statistik/AGENTS.md`).

## Afgrænsning

**Må røres:** kun `.pane` for Hjemme/Ude. **Må ikke røres:** øvrige faner, andre apps,
`statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** hjemme-kampe + ude-kampe summer til det samlede antal holdkampe for den valgte
filtrering (verificér og skriv begge tal i resultatnoten).

**Værnet:** ingen ændring af øvrige faners kode.

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
