# Opgave 044 — undersøg og ret holdidentitet i "winrate pr. hold" (navnekollision på tværs af årgange)

**Trin:** Results (kritisk rettelse — blokerer opgave 042/043's "hold"-tal)

**Gren:** `opgave-044-hold-identitet-navnekollision`, jf. AGENTS.md.

**Baggrund:** opgave 042 og 043's rapporter viser kun "11 GSB-hold" totalt,
men Chris oplyser (2026-09-15) at klubben i 2025-sæsonen alene havde 70
hold tilmeldt holdturneringen på tværs af alle årgange (senior, U09-U19,
veteran). `statistik/sql/schema-normalized.sql` viser at `teams`-tabellen
er bygget med `UNIQUE(season_id, competition_id, name_raw)` — dvs. der
findes formentlig langt flere reelle `team_id`-rækker end 11. Men
`042-results-rapport.mjs` og `043-results-rapport-v2.mjs` grupperer begge
"winrate pr. hold" på `t.name_raw` (kun teksten, fx "Gladsaxe Søborg 1"),
ikke på `team_id`, `competition_id` eller `age_group_id`. Hvis samme
holdnavn ("Gladsaxe Søborg 1") bruges i flere årgange (fx både senior og
U11), kollapser rapporten dem til ét hold — det matcher symptomet
(11 unikke navne på tværs af alt, i stedet for et tal i nærheden af 70).

**Chris' svar (2026-09-15):** flagget som et potentielt problem, ikke
selv undersøgt endnu — kræver bekræftelse før det rettes.

---

## Mål

**Del A — bekræft omfanget, gæt ikke:**
1. Kør `SELECT name_raw, COUNT(DISTINCT team_id) FROM teams GROUP BY
   name_raw ORDER BY 2 DESC` (eller tilsvarende) og vis hvor mange
   distinkte `team_id`-rækker der reelt gemmer sig bag hvert holdnavn
   (fx "Gladsaxe Søborg 1"), og hvilke `age_group_id`/`competition_id`
   de spreder sig over.
2. Tæl det samlede antal distinkte `team_id`-rækker i `teams`-tabellen,
   og sammenlign med de 11 unikke `name_raw`-værdier rapporterne viste.
3. Bekræft eller afkræft eksplicit: er "11 GSB-hold" i opgave 042/043 en
   konsekvens af at gruppere på `name_raw` i stedet for `team_id`, eller
   er der en anden årsag (fx at kun senior-hold rent faktisk har fået
   `gsb_team_id` sat, og ungdoms-/veteranhold generelt mangler den kobling)?
   Undersøg begge hypoteser med SQL, vælg ikke den mest sandsynlige uden
   at have tjekket.
4. Sammenlign resultatet af punkt 2 med Chris' oplysning om ca. 70 hold i
   2025 — er tallet i den rigtige størrelsesorden når man grupperer
   korrekt (giver det mening at 2025 alene har omkring 70, og at det
   samlede antal `team_id`-rækker på tværs af 16 sæsoner er betydeligt
   højere)?

**Del B — ret rapporterne, kun hvis Del A bekræfter en reel navnekollision:**
5. Ret "winrate pr. hold" og "kamptal pr. hold" i BÅDE 042 og 043 (nye
   scripts eller opdatér de eksisterende — vælg selv, men dokumentér
   valget) til at gruppere på en holdidentitet der IKKE kollapser på
   tværs af årgange. Forslag: `name_raw` + årgangsgruppe (samme
   senior/U09-U15/U17-U19/veteran-inddeling som opgave 038/043's
   `age()`-funktion) — ikke rent `team_id`, fordi det ville splitte
   samme fysiske hold op pr. sæson, hvilket giver for mange rækker til
   at være læsbart. Hvis dette forslag viser sig forkert efter Del A's
   fund (fx fordi samme fysiske hold også skifter navn mellem sæsoner),
   stop og spørg i stedet for at gætte videre.
6. "Winrate mod modstanderhold" (opgave 043, punkt 7) skal også
   gennemgås for samme risiko — modstanderens navn er rå tekst
   (`home_name_raw`/`away_name_raw`), så to forskellige klubbers hold
   der tilfældigvis hedder det samme (fx "Skovshoved 1" i to forskellige
   årgange) ville også kollapse. Undersøg om dette reelt sker i data,
   og ret hvis det gør.

## Kontekst

Dette er en potentielt vigtig rettelse — hvis kollisionen er reel, er
"winrate pr. hold"-tallene i både 042 og 043 vildledende (de blander
resultater fra flere reelt forskellige hold under ét). Ret ikke
databasens skema eller `team_id`-tildeling — det ser ud til at være
korrekt bygget allerede (`UNIQUE(season_id, competition_id, name_raw)`).
Problemet er kun i rapport-scriptenes gruppering, ikke i selve dataenes
struktur.

## Afgrænsning

**Må røres:** nyt undersøgelsesscript i `statistik/scripts/` (fx
`044-holdidentitet-audit.mjs`), `statistik/results/044-holdidentitet-audit.md`
(+ `.json`). Hvis Del A bekræfter problemet: `statistik/scripts/
042-results-rapport.mjs`, `statistik/scripts/043-results-rapport-v2.mjs`
(eller nye versioner af dem — dokumentér valget), samt deres
resultatfiler, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning — dette er en
rapporteringsfejl, ikke en datafejl, medmindre Del A viser andet).
`docs/statistik-plan.md`, `docs/BESLUTNINGER.md` røres ikke, medmindre
Del A finder noget der ændrer et af de allerede lukkede Test &
Validation-kriterier — i så fald: stop og spørg, ret ikke selv.

## Kontrol

**Målet:** et eksplicit, talbaseret svar på om og hvor meget "hold"-tallet
i 042/043 er forvrænget af navnekollision, og — hvis bekræftet — rettede
rapporter med et holdantal der giver mening (i den rigtige størrelsesorden
ift. Chris' ~70-hold-oplysning for 2025, akkumuleret fornuftigt over 16
sæsoner).

**Værnet:** ingen ændringer i databasens skema eller rå data.

**Resultatnoten skal angive konkrete tal:** antal distinkte `team_id` vs.
antal distinkte `name_raw`, hvor mange navne er berørt af kollision, og
det rettede holdantal efter fix (hvis relevant).

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
