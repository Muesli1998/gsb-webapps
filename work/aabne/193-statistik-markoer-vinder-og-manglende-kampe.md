# Opgave 193 — vinder ud fra resultatmarkør, og find de individuelle kampe, der mangler i databasen

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10.
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** 192 (færdig) · **Netværk:** ingen

**Trin:** Kort 192 behandlede markøren `G` som walkover og A–V som ukendte koder. Det var forkert. Christoffer har rettet reglen, og en gennemgang af tre holdkampe viser, at importen derudover har droppet individuelle kampe uden sætscore. Kortet laver et korrekt vinderkatalog og en liste over de manglende kampe. Det ændrer ingen database.

## Gren
`arbejde/193-markoer-vinder-manglende-kampe`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- **Markøren (fra Christoffer, spillets regler):** `result_marker_raw` er forbogstavet på den klub, der får tildelt sejren i den individuelle kamp. `G` = Gladsaxe Søborg. Ved samme forbogstav i begge klubber står `(1)` for hjemmeholdet og `(2)` for udeholdet. Markøren gælder over sætscoren, når kampen afgøres ved protest, tilbagetrækning eller walkover. Kun forbogstavet er kendt; knyt et bogstav til hjemme- eller udeholdet ved at sammenligne med forbogstavet i holdets navn (`team_matches.home_name_raw`, `away_name_raw`).
- **Målt af Claude (ikke bekræftet af Codex):** af kampe med markør og afledt vinder fra score stemmer ca. 180, 80 modsiger, 40 har tom vinder, 9 har `(1)`/`(2)`. I 26 holdkampe ændrer markøren udfaldet; 23 bliver forenelige med holdresultatet, 3 gør ikke (se næste punkt).
- **Manglende rækker i `individual_matches`:** kampe uden nogen sætscore er ikke importeret. Tre belæg (kampnr. = `team_matches.external_match_id`):
  - 452891 (Lyngby 4 – Gladsaxe Søborg 4, 2024-01-14, resultat 3-4): databasen har 6 rækker; `Golden Set` (begge "Ikke fremmødt", markør G) mangler. Med markøren er der 3-3 i de 6, og golden set giver 3-4.
  - 429489 (Gladsaxe Søborg 4 – BC37 Amager 2, 2022-10-30, 5-1): `2. D` uden scorer, markør G, mangler.
  - 169020 (Hvidovre – Gladsaxe Søborg 2, 2015-01-11, 0-6): `4. S` og `2. D` uden scorer, markør G, mangler.
  - Grov optælling af Claude: i ca. 117 af 2.367 holdkampe er der færre rækker end holdresultatets sum, i alt mindst 244 kampe. Det skal kortet måle ordentligt.
- Golden Set spilles ved 3-3 og tæller som en kamp i holdresultatet.
- "Ikke fremmødt" betyder, at holdet ikke har sat en spiller på holdkortet; kampen tabes automatisk. Pseudo-spilleren "Ikke fremmødt" (`player_id` 176) er ikke en person og skal holdes ude af alle spillertal.
- De fire kampe med `api_error` (505217, 505219, 506407, 506413) ignoreres efter Christoffers beslutning.
- Kort 192's filer (`statistik/results/192-ukendte-vindere.*`) bygger på den forkerte markørforståelse. Læs dem, men brug dem ikke som facit.

## Mål
1. **Markørtabel.** For hver forskellig markørværdi i `individual_matches.result_marker_raw`: antal kampe, og hvilket hold den peger på (hjemme/ude) ud fra holdnavnene. Hver markør, der ikke kan knyttes til hjemme eller ude (fx fordi forbogstavet passer til begge eller ingen), listes som `uafklaret` med kampnumre.
2. **Vinder pr. individuel kamp** for alle kampe i alle sæsoner, efter denne prioritet, med metode i en kolonne:
   - (a) markøren, hvis den er entydig (inkl. `(1)`/`(2)`);
   - (b) ellers sætscoren (som i dag);
   - (c) ellers holdresultatet, når det entydigt afgør de ukendte;
   - (d) ellers `uafklaret` med forklaring.
   Marker for hver kamp, om markør og score er uenige (`markoer_overstyrer_score`), og tæl dem. Der må ikke gættes.
3. **Test mod holdresultatet.** For hver holdkamp: sum af hjemme- og udesejre efter punkt 2 mod `result_raw`. Rapportér hvor mange der stemmer før (kun score) og efter (med markør), og list de holdkampe der stadig afviger, med årsag.
4. **Manglende kampe.** Find holdkampe, hvor antallet af individuelle rækker er lavere end summen i holdresultatet. For hver: antal manglende, hvilken side der manglede sejren (ud fra differencen mellem holdresultatet og summen af de kendte), og om det passer med en `G`/markør, "Ikke fremmødt" eller golden set. Skriv `ukendt`, hvor det ikke kan afgøres. Hold 452891, 429489 og 169020 skal være med og forklares fuldt ud.
5. **Konsekvens.** Hvor mange spillere og hvor mange kampe i 2025/26 påvirkes (kampe der skifter vinder, kampe der bliver tilføjet)? Ændrer det rangeringen i kort 177 og tallene i kort 187 for nogen spiller med mere end 5 pladser? Skriv tallene; ændr ikke 177's eller 187's filer.
6. **Forslag til regel og import.** Hvordan importen bør håndtere kampe uden score (opret række med markør og vinder, uden sæt), golden set og markøren. Foreslå kun; ændr ingen kode eller database.

## Afgrænsning
- **Må røres:** nye filer: `statistik/scripts/193-markoer-vinder.mjs`, `statistik/results/193-markoer-vinder.md`, `statistik/results/193-markoer-vinder.json`, `statistik/results/193-markoer-vinder.csv`, `statistik/results/193-manglende-kampe.csv`; samt dette korts Spørgsmål og Resultat.
- **Må ikke røres:** alle databaser (åbnes read-only: `mode=ro` og `PRAGMA query_only=ON`), 177-, 187- og 192-filerne (kun læsning), `statistik/HASHES.txt`, `apps/netlify-prod/`, `docs/BESLUTNINGER.md`, rodens `AGENTS.md`.
- Ingen netværkskald. Ingen nye pakker.

## Output
- `statistik/scripts/193-markoer-vinder.mjs`
- `statistik/results/193-markoer-vinder.md` (markørtabel, test før/efter, manglende kampe, konsekvens, forslag)
- `statistik/results/193-markoer-vinder.json`
- `statistik/results/193-markoer-vinder.csv` (en række pr. individuel kamp: id, kampnr., dato, markør, vinder, metode, markør/score-uenighed, forklaring)
- `statistik/results/193-manglende-kampe.csv` (en række pr. holdkamp med manglende kampe: kampnr., dato, hold, resultat, antal rækker, antal manglende, formodet årsag, sikkerhed)

## Kontrol
- **Målet:** hver individuel kamp står præcis én gang i `193-markoer-vinder.csv`. 452891, 429489 og 169020 stemmer med holdresultatet, når de manglende kampe lægges til. Antal pr. metode står i rapporten.
- **Værnet:** `node tools/tjek/db-hashes.mjs` afslutter med kode 0 (fem "ja"). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre. Nul netværkskald (skriv tallet 0 i rapporten).
- **Skøn:** (vurdering) om markørreglen er sikker nok til at rette `winner_side` i databasen, hvilke markører Christoffer bør bekræfte, og hvor stor en andel af holdkampene der stemmer efter rettelsen.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Gæt ikke. Kan en regel ikke bekræftes af data, så skriv `uafklaret` eller `ukendt` og forklar hvorfor. Skriv i `## Spørgsmål`.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
