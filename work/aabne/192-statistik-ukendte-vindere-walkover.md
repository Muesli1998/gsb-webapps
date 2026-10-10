# Opgave 192 — ukendte vindere: klassificér og udled vinderen ved walkover, tilbagetrækning og protest

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10.
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** — (kan køres nu) · **Netværk:** ingen

**Trin:** Kort 177 udelukkede 116 individuelle kampe i 2025/26, fordi `winner_side` er tom. Christoffer har forklaret, hvorfor: det er afgørelser uden en normalt spillet kamp. Kortet finder ud af, hvilke vindere der kan udledes sikkert.

## Gren
`arbejde/192-ukendte-vindere`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- **Rettet 2026-10-10 (Christoffer):** resultatmarkøren i `individual_matches.result_marker_raw` er **forbogstavet på den klub, der får tildelt sejren i kampen** (`G` = Gladsaxe Søborg). Den er ikke en kode for walkover. Er begge klubbers forbogstav ens, står `(1)` for hjemmeholdet og `(2)` for udeholdet. Markøren gælder over sætscoren, når kampen afgøres ved protest, tilbagetrækning eller walkover (fx kamp 169020, hvor Hvidovre står foran i alle scorede sæt, men Gladsaxe får sejren, fordi Hvidovre brugte ulovlige spillere). Kamp 486756: `1. HD` 21-6 og 12-21 med markør `G` betyder, at Gladsaxe får sejren, efter at Charlottenlund-parret trak sig. Kort 193 bygger videre på dette. Den oprindelige tekst om walkover/protest er erstattet.
- Teksten "Ikke fremmødt" betyder, at holdet ikke har sat en spiller på holdkortet. Så tabes kampen automatisk.
- Data i `gsb-statistik-normalized.db`: `individual_matches` har `winner_side` (`home`/`away`/tom), `result_marker_raw` (bogstaver; `G` er hyppigst), `status`, `home_score_raw`, `away_score_raw` (sæt adskilt af bindestreg). `team_matches` har `result_raw` (fx `5-3`, hjemmehold først), `walkover_text_raw`, `walkover_winner_raw`, `remark_raw`. 967 individuelle kampe har tom `winner_side`; 116 af dem er i 2025/26. Kun 7 af de 116 kan afledes entydigt af holdresultatet, hvis man kun tæller kampe i holdkampe med én ukendt.
- Andre bogstaver end `G` (A–V) er forbogstaver på de øvrige klubber (fx B = Brøndby, H = Hvidovre). Rapporten i `192-ukendte-vindere.md` behandler dem som ukendte koder og er derfor forældet på dette punkt; se kort 193.
- Kort 177 og 187 bruger kun kampe med kendt vinder. Hot streak, spillerstatistik og rekordbog skal kunne tælle disse kampe med.

## Mål
1. **Katalog over alle 967 kampe uden vinder** (alle sæsoner): markør, status, "Ikke fremmødt" i walkover-tekst, antal spillede sæt i scoretekst, antal ukendte i samme holdkamp, og hvem der mangler en spiller på holdkortet (se `individual_match_players`).
2. **Test af reglerne på kampe med kendt vinder.** For holdkampe, hvor alle individuelle kampe har en vinder: stemmer summen af hjemme- og udesejre med `result_raw`? Hvor ofte? Hvilke holdkampe afviger, og er `G`-kampe over- eller underrepræsenteret blandt dem? Beskriv markørerne A–V med antal, og skriv "ukendt" for dem, du ikke kan forklare med evidens.
3. **Udledning pr. kamp** med metode og sikkerhed:
   - (a) holdresultatet: når antallet af ukendte i holdkampen er `k`, og `h − kendte hjemmesejre` er lig med `k` eller 0, er alle ukendte hhv. hjemme eller ude. Er det et mellemtal, er det `uafklaret`; skriv hvor mange hjemme- og udesejre der mangler.
   - (b) "Ikke fremmødt": den side, der mangler en spiller på holdkortet, taber. Verificér mod holdresultatet og skriv antal der bekræftes og afviser.
   - (c) tilbagetrækning midt i kampen (`G` og delvist spillet): vinderen er den modsatte side af den, der trak sig; brug holdresultatet til at afgøre sagen, og skriv `uafklaret`, hvor det ikke kan.
   Der må ikke gættes: kun afledninger, der følger entydigt af evidens, markeres `udledt`; resten `uafklaret` med forklaring.
4. **Forslag til regel** for senere import og visning: hvordan en walkover skal tælles (vinder, point, med eller uden i vindprocent), og hvilke kampe der kun kan tælles som "ukendt".
5. **Konsekvens for kort 177.** Hvor mange af de 116 kampe i 2025/26 bliver `udledt`, og ændrer det rangeringen af nogen spiller med mere end 5 pladser? Skriv tallene; ændr ikke 177's filer.

## Afgrænsning
- **Må røres:** nye filer: `statistik/scripts/192-ukendte-vindere.mjs`, `statistik/results/192-ukendte-vindere.md`, `statistik/results/192-ukendte-vindere.json`, `statistik/results/192-ukendte-vindere.csv`; samt dette korts Spørgsmål og Resultat.
- **Må ikke røres:** alle databaser (åbnes read-only: `mode=ro` og `PRAGMA query_only=ON`), 177-filerne (kun læsning), `statistik/HASHES.txt`, `apps/netlify-prod/`, `docs/BESLUTNINGER.md`, rodens `AGENTS.md`.
- Ingen netværkskald. Ingen nye pakker.

## Output
- `statistik/scripts/192-ukendte-vindere.mjs`
- `statistik/results/192-ukendte-vindere.md` (tal, regler, markører, forslag, konsekvens for 177)
- `statistik/results/192-ukendte-vindere.json`
- `statistik/results/192-ukendte-vindere.csv` (en række pr. kamp: id, holdkamp, dato, markør, foreslået vinder, metode, sikkerhed, forklaring)

## Kontrol
- **Målet:** alle 967 kampe står i CSV'en med en klasse (`udledt` eller `uafklaret`). Antal pr. metode og pr. sikkerhed står i rapporten. Test 2 har tal for, hvor ofte summen af vindere stemmer med holdresultatet.
- **Værnet:** `node tools/tjek/db-hashes.mjs` afslutter med kode 0 (fem "ja"). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre. Nul netværkskald (skriv tallet 0 i rapporten).
- **Skøn:** (vurdering) om reglerne er sikre nok til at lægge udledte vindere ind i databasen, og hvilken markørbetydning Christoffer bør bekræfte (liste over de bogstaver, du ikke kunne forklare).

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Gæt ikke. Hvis en regel ikke kan bekræftes af data, så skriv `uafklaret` og forklar hvorfor. Skriv i `## Spørgsmål`.

## Spørgsmål
Markørbetydninger der mangler bekræftelse: A(1), B(6), C(9), D(23), F(28), H(19), I(1), K(15), L(4), N(1), P(4), R(3), S(12), T(4), V(18), samt (1)(5), (2)(4) og Ø(2). Betydningen er ukendt. E, J, M, O, Q og U forekommer 0 gange. Kan Christoffer bekræfte de observerede markører?

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
967 ukendte kampe katalogiseret i CSV, alle med klasse; 889 udledt og 78 uafklaret. For 2025/26: 112 udledt af 116, 4 uafklaret. Udledningsmetoder: holdresultat entydigt 878 (heraf 11 G med delvist scorede sæt), holdresultat ikke entydigt 69, og Ikke fremmødt med deltagersiden ukendt 9. Sikkerhed: entydig 889, uafklaret 78.

Af 2.048 kendte holdkampe med parsebart resultat stemmer individuelle sejre præcist i 1.908; 140 afviger. G ses i 17/140 (12,1 %) afvigende holdkampe mod 34/1.908 (1,8 %) præcise. For 117 holdkampe med Ikke fremmødt stemmer walkover_winner_raw med holdresultatet i 110, afviger i 0 og er uafklaret i 7. A-V-antal står i rapporten; ikke-G betydning er ukendt.

Ingen af de sammenlignelige spillere flyttede sig mere end 5 pladser i kort 177s raw, Bayes, Wilson, minimum- eller ELO-rangering (N=5/10/20). Netværkskald: 0. Databaser urørt, read-only. Vurdering: gem udledninger som sporbare afledte værdier; skriv ikke rå databasevindere uden en særskilt importbeslutning.
