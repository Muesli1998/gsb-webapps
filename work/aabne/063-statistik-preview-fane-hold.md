# Opgave 063 — Klubstatistik: Hold-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/063-statistik-preview-fane-hold`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne opgave bygger kun "Hold"-fanens
indhold: en sorterbar tabel med winrate og kamptal pr. hold.

## Mål

En tabel, sorterbar på hver kolonne, med én række pr. hold i den valgte filtrering:

| Hold | Aldersgruppe | Holdtype/niveau | Kampe | Winrate |

- "Hold" og "Aldersgruppe" følger holdidentitets-reglen fra opgave 061/`docs/statistik-plan.md`
  (senior/veteran: `name_raw + age_group_id`; ungdom: også holdtype+niveau).
- "Holdtype/niveau" viser "ukendt" ærligt for ungdomshold uden et parset niveau — se
  `statistik/results/046-ungdom-holdtype-niveau-audit.md` for omfanget (28 af 85 kombinationer har
  helt ukendt holdtype+niveau). Vis "—" for senior/veteran (kolonnen er kun relevant for ungdom).
- Winrate vises som bar-fill + procenttal, samme stil som `analyse.html`.

Se mockuppens "Hold"-fane (`work/future/referencer/061-statistik-preview-mockup.html`) for det
visuelle facit, inkl. eksemplet med "ukendt · ukendt".

## Kontekst

Samme datalag som opgave 061/062. Sortering skal være en ren klient-side re-render af den allerede
hentede, filtrerede tabel — intet nyt databasekald ved sortering.

## Afgrænsning

**Må røres:** kun `.pane` for Hold. **Må ikke røres:** øvrige faner, andre apps,
`statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** tabellen sorterer korrekt på mindst to kolonner (test og dokumentér faktiske
før/efter-rækkefølger i resultatnoten). Et ungdomshold med ukendt niveau vises som "ukendt", ikke
skjult og ikke gættet.

**Værnet:** ingen ændring af de øvrige faners kode.

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor — særligt hvis et konkret holds `name_raw + age_group_id +
holdtype + niveau`-kombination er tvetydig (jf. opgave 045/046's note om at samme klubnummer kan
dække to reelt forskellige tilmeldinger). Gæt ikke — dokumentér som uafklaret.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
