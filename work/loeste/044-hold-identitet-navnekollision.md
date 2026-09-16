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
selv undersøgt endnu — kræver bekræftelse før det rettes. Chris har
efterfølgende delt et konkret bilag (se "Bilag" nedenfor) fra
BadmintonPlayer/Nembadmintons egen holdoversigt for GSB 2025/2026, som
bekræfter mønsteret direkte: "Gladsaxe Søborg 1" optræder som reelt
forskellige hold i U09, U11, U13, U15, U17/U19, SEN, SEN+40, SEN+50,
SEN+60 og SEN+70 — samme navn, ti forskellige fysiske hold.

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

## Bilag — Chris' facitliste for GSB 2025/2026 (fra BadmintonPlayer/Nembadmintons holdoversigt)

Brug dette som sanity check for Del A/B, IKKE som en påstand om at hver
linje her skal matche 1:1 med en `team_id`-række (fx tæller "DMU
Holdtræf" og "BD-liga" for samme holdnavn/årgang muligvis som ÉN fysisk
hold-tilmelding der optræder i to konkurrencer samme sæson — det er
forventet og ikke i sig selv en fejl, jf. Kontekst-afsnittet). Det
vigtige er totalbilledet: mange forskellige hold deler numre på tværs af
årgange.

```
U09
Gladsaxe Søborg 1  DMU Holdtræf U9 - 3 Spillere U9 DMU holdtræf
Gladsaxe Søborg 1  U09 C 3600 (3 spillere) BD (2. halvår) Pulje 2
Gladsaxe Søborg 1  U09 C 3600 (3 spillere) BD Pulje 1
Gladsaxe Søborg 2  DMU Holdtræf U9 - 3 Spillere U9 DMU holdtræf
Gladsaxe Søborg 2  U09 D 3300 (3 spillere) BD (2. halvår) Pulje 2
Gladsaxe Søborg 2  U09 D 3300 (3 spillere) BD Pulje 1
Gladsaxe Søborg 3  DMU Holdtræf U9 - 3 Spillere U9 DMU holdtræf
Gladsaxe Søborg 3  U09 D 3300 (3 spillere) BD (2. halvår) Pulje 1
Gladsaxe Søborg 3  U09 D 3300 (3 spillere) BD Pulje 2
Gladsaxe Søborg 4  U09 D 3300 (3 spillere) BD (2. halvår) Pulje 3
Gladsaxe Søborg 5  U09 D 3300 (3 spillere) BD (2. halvår) Pulje 4
U11
Gladsaxe Søborg 1  DMU Hold U11C-D (4800) - 4 Spillere Pulje 2
Gladsaxe Søborg 1  DMU Hold U11C-D (4800) - 4 Spillere Finaleslutspil (1. - 4. plads)
Gladsaxe Søborg 1  U11 C-D 4800 (4 spillere) BD Pulje 1
Gladsaxe Søborg 2  U11 C-D 4800 (4 spillere) BD Pulje 1
Gladsaxe Søborg 3  U11 D 4600 (4 spillere) BD Pulje 1
Gladsaxe Søborg 4  U11 D 4600 (4 spillere) BD Pulje 4
Gladsaxe Søborg 5  U11 4200 (4 piger) BD Pulje 2
U13
Gladsaxe Søborg 1  DMU Hold U13C-D (5000) - 4 Spillere Pulje 2
Gladsaxe Søborg 1  DMU Hold U13C-D (5000) - 4 Spillere Placeringskampe 9. - 12. plads (3'ere)
Gladsaxe Søborg 1  U13 A, 6000 (2+2) Pulje 1
Gladsaxe Søborg 2  DMU Hold U13D (4800) - 4 Spillere Pulje 4
Gladsaxe Søborg 2  DMU Hold U13D (4800) - 4 Spillere Kvartfinale 2 (nr. 1 fra pulje 3 og 4)
Gladsaxe Søborg 2  DMU Hold U13D (4800) - 4 Spillere 5. - 8. plads
Gladsaxe Søborg 2  U13 B, 5400 (2+2) Pulje 1
Gladsaxe Søborg 3  DMU Hold U13D (4800) - 4 Spillere Pulje 5
Gladsaxe Søborg 3  DMU Hold U13D (4800) - 4 Spillere Placeringskampe 9. - 16. plads (2'ere i puljen)
Gladsaxe Søborg 3  U13 C 5300 (4 spillere) BD Pulje 1
Gladsaxe Søborg 4  DMU Hold U13A 2+2 (6000) Pulje 1
Gladsaxe Søborg 4  DMU Hold U13A 2+2 (6000) 3. - 4. plads (2'ere)
Gladsaxe Søborg 4  U13 D 4800 (4 spillere) BD Pulje 1
Gladsaxe Søborg 5  DMU Hold U13A 2+2 (6000) Pulje 2
Gladsaxe Søborg 5  U13 D 4800 (4 spillere) BD Pulje 2
Gladsaxe Søborg 6  U13 D 4800 (4 spillere) BD Pulje 3
Gladsaxe Søborg 7  U13 D 4800 (4 spillere) BD Pulje 1
Gladsaxe Søborg 7  Uge 38 - U13 A, 6000 (2+2) Pulje 1
Gladsaxe Søborg 8  U13 D 4400 (4 piger) BD Pulje 1
Gladsaxe Søborg 8  Uge 38 - U13 B, 5400 (2+2) Pulje 1
Gladsaxe Søborg 9  Uge 38 - U13 C, 5000 (2+2) Pulje 1
Gladsaxe Søborg 10 Uge 38 - U13 D, 4800 (2+2) Pulje 1
U15
Gladsaxe Søborg 1  DMU Hold U15B (6400) - 4 Spillere Pulje 4
Gladsaxe Søborg 1  DMU Hold U15B (6400) - 4 Spillere Finaleslutspil (1. - 4. plads)
Gladsaxe Søborg 1  U15 A, 6800 (2+2) Pulje 1
Gladsaxe Søborg 2  DMU Hold U15C-D (5200) - 4 Spillere Pulje 1
Gladsaxe Søborg 2  DMU Hold U15C-D (5200) - 4 Spillere Finaleslutspil (1. - 4. plads)
Gladsaxe Søborg 2  U15 B 6400 (4 spillere) BD Pulje 1
Gladsaxe Søborg 3  DMU Hold U15C 2+2 (5400) Pulje 2
Gladsaxe Søborg 3  DMU Hold U15C 2+2 (5400) Finaleslutspil (1. - 4. plads)
Gladsaxe Søborg 3  U15 C, 5400 (2+2) Pulje 1
Gladsaxe Søborg 4  U15 C-D 5200 (4 spillere) BD Pulje 1
Gladsaxe Søborg 5  U15 D 5000 (4 spillere) BD Pulje 1
Gladsaxe Søborg 6  U15 D 5000 (4 spillere) BD Pulje 2
Gladsaxe Søborg 6  Uge 38 - U15 A, 6800 (2+2) Pulje 1
Gladsaxe Søborg 7  U15 D, 4600 (4 piger) Pulje 1
Gladsaxe Søborg 8  Uge 38 - U15 C, 5400 (2+2) Pulje 1
U17/U19
Gladsaxe Søborg 1  C-D 5600 (4 spillere) BD Pulje 1
Gladsaxe Søborg 2  U17/U19 D, 5200 (4 spillere) Pulje 3
Gladsaxe Søborg 3  Uge 38 - U17/U19 D, 5000 (2+2) Pulje 1
SEN
Gladsaxe Søborg    Danmarksserien Pulje 7
Gladsaxe Søborg    Danmarksserien Kvalifikation til 3. division pulje D
Gladsaxe Søborg 2  Københavnsserien Pulje 1
Gladsaxe Søborg 2  Københavnsserien Oprykning til Danmarksserien
Gladsaxe Søborg 3  2. Serie Pulje 1
Gladsaxe Søborg 4  3. Serie Pulje 2
Gladsaxe Søborg 5  31. Serie Pulje 1
Gladsaxe Søborg 6  32. Serie Pulje 1
SEN+40
Gladsaxe Søborg 1  Eliteserien Pulje 1
Gladsaxe Søborg 2  1. Serie Pulje 1
Gladsaxe Søborg 3  3. Serie Pulje 1
Gladsaxe Søborg 4  4. Serie Pulje 1
SEN+50
Gladsaxe Søborg 1  Eliteserien Pulje 1
Gladsaxe Søborg 2  1. Serie Pulje 1
Gladsaxe Søborg 3  2. Serie Pulje 1
Gladsaxe Søborg 4  4. Serie Pulje 1
SEN+60
Gladsaxe Søborg 1  Eliteserien Pulje 1
Gladsaxe Søborg 2  1. Serie Pulje 1
SEN+70
Gladsaxe Søborg 1  70+ Eliteserien Pulje 1
```

Bemærk: dette bilag dækker kun 2025/2026-sæsonen (Chris' eksempel — "70
hold tilmeldt" i 2025). Databasen dækker 16 sæsoner, så det samlede
antal distinkte `team_id`-rækker forventes at være markant højere end 70
— brug bilaget til at validere STRUKTUREN (navnekollision på tværs af
årgange er reel og udbredt) og størrelsesordenen for én sæson, ikke som
et facit for hele databasens samlede holdantal.

## Resultatnote

Del A bekræfter navnekollisionen: `teams` har 472 rækker og 472 distinkte
`team_id`, men kun 11 distinkte `name_raw`; 10 af 11 navne er berørt af, at
samme rånavn dækker flere team-ID'er. Sæson 2025 alene har 77 distinkte
team-ID'er. 2.818 holdkampe har 455 distinkte koblede GSB-team-ID'er.

Del B blev udført med en aldersgruppering i fire brede buckets (Senior/
U09-U15/U17-U19/Veteran — foreslået i opgavekortets Del B, punkt 5): 27
holdidentiteter i rapporterne (mod 11 rånavne). Modstanderopgørelsen i
043 brugte tilsvarende modstander + bred aldersgruppe (639 identiteter).
Se `statistik/results/044-holdidentitet-audit.md`/`.json` for Del A's
fulde tal.

**Commits:** `dae8c23` (på grenen `opgave-044-hold-identitet-navnekollision`,
aldrig merget separat).

**Pointer-note (2026-09-16, tilføjet af Claude ved arkivering):**
Del B's fire-buckets-gruppering viste sig at være for grov — Chris'
eget bilag (se ovenfor) viser at fx "Gladsaxe Søborg 1" er FIRE forskellige
fysiske hold i selve U09-U15-bucketen alene (ét pr. U09/U11/U13/U15), og
samme mønster gælder Veteran-bucketen (SEN+40/50/60/70). Forslaget i
Del B, punkt 5 var Claudes eget, og var en fejl. Opgave 045 rettede dette
ved at bruge den SPECIFIKKE `age_group_id` i stedet for de fire brede
buckets (58 holdidentiteter, 980 modstanderidentiteter). Denne opgaves
Del B-kode (`042`/`043` med fire-buckets-gruppering) blev aldrig selvstændigt
merget til `main` — grenen blev overhalet af opgave 045, som blev
grenet direkte fra `main` og derfor implementerede rettelsen forfra med
det korrekte, finkornede niveau. Del A's måletal ovenfor (472 vs. 11,
77 i 2025) forbliver gyldige og er årsagen til at problemet blev fundet
og rettet — kun Del B's konkrete kode er erstattet.
