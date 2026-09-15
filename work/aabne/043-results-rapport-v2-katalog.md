# Opgave 043 — Results-rapport v2: fuldt stat-katalog

**Trin:** Results (udvidelse af opgave 042's v1)

**Gren:** `opgave-043-results-rapport-v2-katalog`, jf. AGENTS.md.

**Baggrund:** opgave 042 byggede v1 af Results-rapporten (sæson/hold-
opgørelse, spiller-pr.-kategori). Chris og Claude gennemgik derefter i
chat hvilke statistikker der reelt skal med, og landede på et konkret
stat-katalog — se `docs/statistik-plan.md`s "## Results"-afsnit,
"Stat-katalog v2 (besluttet med Chris 2026-09-15)".

**Chris' svar (2026-09-15):** "Ja tak, det er en fantastisk liste,"
samt et ekstra ønske om at holde øje med spillere med flest kampe
totalt for klubben og over hvor mange sæsoner/år (nu punkt 10 i
kataloget).

---

## Mål

Byg `statistik/results/043-results-rapport-v2.md` (+ `.json`) der dækker
alle ti punkter i `docs/statistik-plan.md`s stat-katalog:

1. Winrate pr. hold (kan genbruges fra 042 hvis strukturen passer).
2. Winrate pr. spiller (kan genbruges fra 042).
3. Winrate pr. sæson (kan genbruges fra 042).
4. Winrate pr. årgang (senior/ungdom/veteran, `age_group_id`-grupperingen
   fra opgave 038 — brug samme fire grupper: Senior/U09-U15/U17-U19/
   Veteran).
5. Winrate pr. kategori (single/double/mixed) — samlet for klubben, ikke
   kun pr. spiller som i 042.
6. Winrate hjemme vs. ude.
7. Winrate mod modstanderhold: for hvert GSB-hold, hvilke modstanderhold
   klubben oftest møder og vind/tab-facit mod dem. Brug
   `home_name_raw`/`away_name_raw` til at identificere modstanderen (den
   part der IKKE matcher `gsb_team_name`, samme normaliseringslogik som
   042's script).
8. Antal kampe (rent aktivitetstal, ikke vind/tab) pr. spiller, hold,
   sæson og årgang.
9. Mest aktive spillere, rangeret på antal kampe (top 25 er nok, men
   angiv det fulde tal i JSON).
10. Klub-karriere-oversigt: for hver spiller, samlet antal kampe for
    klubben på tværs af ALLE sæsoner, samt antal DISTINKTE sæsoner og
    første/sidste sæson spilleren optræder i. Rangér efter samlet
    kampantal.

Bevar 042's "Hvad mangler / kendte huller"-sektion (samme indhold,
opdater kun hvis nye huller opdages undervejs — gæt ikke, dokumentér).

## Kontekst

Dette er en udvidelse, ikke en gentagelse af 042 — 042's fil ændres ikke,
043 er et nyt, mere komplet dokument. Hvis du kan genbruge dele af 042's
script/logik (fx sæson-loop, kategori-klassifikation), gør det — ingen
grund til at genopfinde det der allerede virker.

## Afgrænsning

**Må røres:** nyt script i `statistik/scripts/` (fx
`043-results-rapport-v2.mjs`), `statistik/results/043-results-rapport-v2.md`
(+ `.json`), `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). `statistik/results/
042-results-rapport.*` ændres ikke — den bevares som v1. `docs/statistik-
plan.md` og `docs/BESLUTNINGER.md` røres ikke i denne opgave.

## Kontrol

**Målet:** alle ti punkter i kataloget er dækket med konkrete tal i både
`.md` og `.json`.

**Værnet:** ingen ændringer i databasen eller i opgave 042's resultatfiler.

**Resultatnoten skal angive tal for hvert af de ti punkter** (fx antal
hold, antal spillere med karriere-data, antal modstanderhold identificeret
osv.) — ikke en vurdering af om rapporten er "god nok".

## Resultatnote

Kørt read-only mod normalized DB. Resultatet dækker alle ti katalogpunkter:

- 2.818 holdkampe fordelt på 16 sæsoner og 11 GSB-hold.
- 7.599 spillere og 67.196 spillerrelationer.
- Winrate pr. hold, spiller, sæson, årgang, kategori og hjemme/ude genereret.
- 389 distinkte modstanderhold identificeret.
- Kamptal genereret pr. spiller, hold, sæson og årgang.
- Top-25 mest aktive spillere samt karriereoversigt for alle 7.599 spillere, med distinkte sæsoner og første/sidste sæson.
- Kendte huller videreført: 18 audit-kandidater, 21 uforklarede stillingsrækker, 205 ungdomsholdkampe uden individuelle rækker (46 uden kategorisektion/afbud).

Rapportfiler: `statistik/results/043-results-rapport-v2.md` og `.json`.

**Commits:** afventer commit på denne gren
