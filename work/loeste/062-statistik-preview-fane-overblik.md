# Opgave 062 — Klubstatistik: Overblik-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 (struktur/nav/datalag) er løst.

**Gren:** `arbejde/062-statistik-preview-fane-overblik`, jf. `AGENTS.md`. Grenes ud fra 061's gren
eller `main` afhængigt af hvad der er flettet på løsningstidspunktet.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061 for den fælles kontekst: mockup, design,
datalag, holdidentitets-regel). Denne opgave bygger kun "Overblik"-fanens indhold.

## Mål

Overblik-fanen viser, for den valgte aldersgruppe/underfilter/sæson:

1. Fire KPI-felter: samlet winrate, samlet antal holdkampe, antal spillere, antal hold — alle
   beregnet for den aktuelt filtrerede delmængde af datalaget (se opgave 061), ikke faste tal.
2. Et grid af hold-kort (samme mønster som `analyse.html`s `.team-cards`/`.team-card`): ét kort pr.
   hold i den valgte filtrering, med holdnavn, aldersgruppe-label, winrate (stort tal) og
   S-T-record + kamptal. Respekter holdidentitets-reglen fra opgave 061 — et ungdomshold viser
   holdtype/niveau i undertekst, ikke kun aldersgruppe.

Se `work/future/referencer/061-statistik-preview-mockup.html`, fanen "Overblik", for det visuelle
facit (eksempeldata deri — de fire KPI-tal og hold-kortene skal komme fra rigtige beregninger her).

## Kontekst

- Datakilde: `team_matches` + `teams` + `competitions` (for `age_group_id`) i
  `statistik/sql/schema-normalized.sql`. `team_matches.result_raw`/`points_raw` afgør sejr/tab —
  læs `statistik/AGENTS.md`s "Aldrig gæt"-afsnit, hvis en kamps udfald ikke er umiddelbart klart
  fra disse felter.
- "Antal spillere" og "antal hold" skal tælles inden for den samme filtrerede delmængde som
  resten af fanen — ikke klubbens totaltal uafhængigt af filter.

## Afgrænsning

**Må røres:** kun `.pane` for Overblik i den side opgave 061 opretter, og evt. den delte
datalags-kode hvis den mangler et felt denne fane skal bruge (i så fald: udvid, lav ikke en
parallel datakilde).

**Må ikke røres:** øvrige faner (062–069's øvrige paner), `analyse.html`, `stilling.html`, øvrige
apps, `statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** de fire KPI-tal og hold-kortenes tal ændrer sig korrekt når filterbaren skifter (test
mod mindst to forskellige filterkombinationer og dokumentér de faktiske tal i resultatnoten, ikke
kun at "det virker").

**Værnet:** ingen ændring i `analyse.html`s eller `stilling.html`s egne tal/beregninger (kør deres
eksisterende kontroller hvis nogen findes, ellers stikprøve manuelt).

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

2026-09-20: Byggede Overblik-panelet i den eksisterende lokale
`klubstatistik-preview`-side. Datalaget blev udvidet med spillerrelationer
fra samme `/api/data`-respons; ingen parallel datakilde eller ekstra kald
blev indført. KPI’er og holdkort beregnes klient-side for det filtrerede
udsnit. Ungdomsrækker uden separate holdtype-/niveaufelter vises som
`ukendt · ukendt`; der er ikke gættet eller skjult data.

Faktiske browserkontroltal fra den read-only lokale DB:

- Alle: **50%** samlet winrate, **2.818** holdkampe, **7.599** spillere,
  **453** holdkort med kampe.
- Ungdom: **51%**, **1.354** holdkampe, **3.364** spillere, **229** holdkort.
- Ungdom + U9: **45%**, **105** holdkampe, **312** spillere, **19** holdkort.

Kontrollen viste, at holdkortsamlingen ændrede sig mellem Alle, Ungdom og
U9, faneklik viste Hold-panelet og skjulte Overblik-panelet, og der blev kun
registreret **1** `/api/data`-request efter alle filter- og faneklik.
`python -m py_compile server.py test_preview.py` og Node `--check`
bestod. `git status --short apps/netlify-prod/ kampsystem/` var tom; ingen
ændringer blev skrevet til databasen eller andre apps. Den visuelle lighed
med mockuppen er en vurdering.
