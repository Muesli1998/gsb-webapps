# Opgave 042 — første Results-rapport (klubbredt datasæt)

**Trin:** Results (første trin efter at Test & Validation blev erklæret
lukket 2026-09-15, jf. `docs/BESLUTNINGER.md`)

**Gren:** `opgave-042-results-rapport-v1`, jf. AGENTS.md.

**Baggrund:** Test & Validation er nu lukket for hele datasættet (senior,
U09-U15, U17/U19, veteran) — se `docs/statistik-plan.md`s afsnit "Status
på Test & Validation som helhed" og `docs/BESLUTNINGER.md`s post
"Test & Validation officielt lukket (hele datasættet)". Næste trin i
`docs/statistik-plan.md`s "Rækkefølge" er Results.

**Chris' svar (2026-09-15):** "gå videre til næste trin" — Results-arbejdet
starter nu.

---

## Mål

Byg den første Results-rapport, jf. `docs/statistik-plan.md`s afsnit
"## Results":

1. For hver sæson: klubbens hold, antal kampe, vundne og tabte
   (holdkampsniveau, `team_matches`), for hele det klubbrede datasæt
   (senior, U09-U15, U17/U19, veteran) — ikke kun senior.
2. For hver spiller: antal kampe og vinderprocent, fordelt på kategori
   (single/double/mixed — brug samme kategori-inddeling som den
   eksisterende individuel-klassifikation bruger), på tværs af sæsoner.
3. En eksplicit "hvad mangler / kendte huller"-sektion i rapporten, der
   nævner (mindst):
   - de 18 uafklarede audit-kandidater fra opgave 006 (hvis stadig
     uafklarede — tjek `statistik/results/006-afvigelse-klassifikation.json`
     og evt. senere opgaver der har rørt dem),
   - de 21 genuint uforklarede stillingsrækker (opgave 020/040),
   - enhver anden kendt begrænsning i `docs/statistik-plan.md`s "Kendte
     begrænsninger"-afsnit (hvis et sådant findes — ellers spring over).
   Formålet er at rapporten er ærlig om sin egen usikkerhed, ikke at
   blokere på den.
4. Output: et nyt script i `statistik/scripts/` (fx
   `042-results-rapport.mjs`) der genererer rapporten som både
   `statistik/results/042-results-rapport.md` (læsbar) og
   `statistik/results/042-results-rapport.json` (strukturerede tal, en
   pr. sæson og en pr. spiller).

## Kontekst

Dette er en ny type opgave sammenlignet med 033-041 — de var alle
undersøgende/verificerende (datakvalitet). 042 er det første egentlige
"produkt"-trin: en rapport der bruger det nu-verificerede datasæt til
noget, ikke bare tester det. Der er ikke krav om et bestemt visuelt
format endnu (det kommer i Preview-trinnet) — fokus er at tallene er
rigtige og at rapportens dækning/huller er eksplicit dokumenteret.

## Afgrænsning

**Må røres:** nyt script i `statistik/scripts/` (fx
`042-results-rapport.mjs`), `statistik/results/042-results-rapport.md`
(+ `.json`), `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). Ingen af de
eksisterende resultatfiler fra 006-041 ændres. `docs/statistik-plan.md`
og `docs/BESLUTNINGER.md` røres ikke i denne opgave — hvis rapporten
afslører noget der bør ændre planens beskrivelse af datasættet, stop og
spørg i stedet for selv at rette.

## Kontrol

**Målet:** to komplette outputs (sæson-niveau og spiller-niveau) der
dækker hele det klubbrede datasæt, plus en eksplicit "hvad mangler"-liste
med konkrete tal (ikke kun ord som "nogle" eller "få").

**Værnet:** ingen ændringer i databasen eller i eksisterende
resultatfiler/planer.

**Resultatnoten skal angive tal, ikke vurderinger** — fx antal sæsoner
dækket, antal hold, antal spillere, antal kendte huller nævnt.

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
