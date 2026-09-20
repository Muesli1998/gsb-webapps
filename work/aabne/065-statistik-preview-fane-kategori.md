# Opgave 065 — Klubstatistik: Kategori-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/065-statistik-preview-fane-kategori`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne opgave bygger kun
"Kategori"-fanens indhold: winrate pr. kategori, for den valgte filtrering.

**Afklaret 2026-09-20:** databasen har 5.521 `individual_matches`-rækker med rå
`discipline_raw = 'S'` eller `'D'` (uden HS/DS/HD/DD/MD-opdeling). Claude undersøgte dette direkte i
databasen og fandt at det IKKE er en mangelfuld udtræk/mapping — de stammer udelukkende fra ni
turneringer, alle enten ungdom eller veteran, og INGEN af disse ni optræder nogen steder med
HS/DS/HD/DD/MD: U13 3. Serie (1.452), U11 3. Serie (1.382), U15 Serie X2 (1.341), U09 C (484),
DMU-Hold U17/19 B (373), U17 2. Serie (110), 70+ 1. Serie (232), 60+ 1. Serie (75), SEN+40 20. Serie
(72). Chris' forklaring: dette er hold/rækker der ikke havde nok spillere af begge køn (eller ikke
var gode nok) til at spille i de kønsopdelte "rigtige" rækker, og derfor spiller i en fri/blandet
række i stedet. Der findes desuden intet autoritativt kønsfelt i vores data overhovedet —
`NEMBADMINTON_API_NOTES.md` dokumenterer at `gender`-feltet på spillerobjektet fejler med
"Internal server error" i praksis. En mapping fra S/D til et bestemt køn ville derfor altid være et
gæt, aldrig et opslag — det er udelukket, jf. `statistik/AGENTS.md`s "Aldrig gæt".

**Chris' beslutning:** `S`/`D` mappes IKKE til et køn. De vises som deres egne to kategorier ved
siden af de fem kønsopdelte, navngivet **"Fri single"** og **"Fri double"**.

## Mål

En tabel (samme bar-fill-stil som `analyse.html`):

| Kategori | Kampe | Winrate |

Med rækker for herresingle, damesingle, herredouble, damedouble, mixeddouble, **Fri single**
(`discipline_raw='S'`) og **Fri double** (`discipline_raw='D'`) — syv rækker i alt, samlet for den
aktuelt filtrerede delmængde (aldersgruppe/underfilter/sæson). "Fri single"/"Fri double" vises på
linje med de øvrige fem, ikke som en separat "uafklaret"-sektion — det er ikke uafklarede data, det
er to legitime, navngivne kategorier i sig selv. Se mockuppens "Kategori"-fane for det visuelle
facit på selve tabelstilen (bar-fill osv.); de to nye rækker følger samme stil.

## Kontekst

Kategori/disciplin står i `individual_matches.category_raw`/`discipline_raw` (se
`statistik/sql/schema-normalized.sql`). Brug de rå værdier direkte: `HS`→herresingle,
`DS`→damesingle, `HD`→herredouble, `DD`→damedouble, `MD`→mixeddouble, `S`→Fri single,
`D`→Fri double. Ingen andre `discipline_raw`-værdier er set i data pr. 2026-09-20 — støder
implementeringen på en værdi der ikke er nævnt her, dokumentér den som uafklaret i resultatnoten i
stedet for at gætte en placering, jf. `statistik/AGENTS.md`s "Aldrig gæt".

## Afgrænsning

**Må røres:** kun `.pane` for Kategori. **Må ikke røres:** øvrige faner, andre apps,
`statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** de syv kategoriers kamptal summer til et tal der stemmer med det samlede antal
individuelle kampe for den valgte filtrering (verificér og skriv begge tal i resultatnoten).
Verificér desuden at "Fri single"-tallet alene stemmer med `COUNT(*) FROM individual_matches WHERE
discipline_raw='S'` for samme filtrering, og tilsvarende for "Fri double"/`'D'`.

**Værnet:** ingen ændring af øvrige faners kode.

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
