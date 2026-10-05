# Opgave 148 — ranglistepoint: hvad har vi, hvad mangler vi, og hvordan henter vi resten

**Trin:** Undersøgelse og plan. Ingen hentning, ingen database­ændringer. Formålet er på sigt at kunne regne "forventet vinder" på kampe ud fra spillernes ranglistepoint.

## Baggrund
Christoffer vil gerne kunne beregne forventede udfald (forventet vinder, sandsynligheder) ud fra ranglistepoint. Det kræver point pr. spiller, pr. disciplin og pr. dato (den ranglisteversion, der gjaldt, da kampen blev spillet). Vi har allerede:
- `statistik/data/rangliste-historik.db` med tabellerne `player_link` (679 GSB-spillere koblet til Nembadminton-medlems-ID), `ranking_snapshots` (40.364 rækker: `nembadminton_member_id`, `discipline`, `version_date`, `points`) og `fetch_errors`.
- `individual_match_players.points_at_match` i `gsb-statistik-normalized.db`.
- `statistik/data/national-spillere.db` (ca. 9,8 GB), hvis indhold ikke er beskrevet for dette formål.
- Scripts `call-ranking-points.mjs`, `call-ranking-versions.mjs`, `call-ranking-players.mjs`, `call-ranking-mix.mjs` og noterne i `RESEARCH_BACKLOG.md`/`API_RESEARCH.md`.

Christoffer har på badmintonplayer.dk (Ranglister) fundet, at siden er styret af sin URL-hash, og at forskellige valg giver forskelligt output. Eksempler (alle sæson 2026):

| Hvad | URL |
|---|---|
| Ren rangliste uden sorteringer | `#287,2026,,0,,,,0,,,,15,,,,0,,,,,,` |
| Ren rangliste med Gladsaxe Søborg (klub 1093) | `#287,2026,,0,,,1093,0,,,,15,,,,0,,,,,,` |
| Ungdomsrangliste med Gladsaxe Søborg | `#287,2026,,0,21,,1093,0,,,,15,,,,0,,,,,,` |
| Ungdomsrangliste pr. 02/10/2026 med GSB | `#287,2026,10/02/2026,0,21,,1093,0,,,,15,,,,0,,,,,,` |
| U15 pr. 23/09, Badminton København, damer | `#287,2026,09/23/2026,0,5,K,,0,8,,,15,,,,0,,,,,,` |
| U13 M, herrer | `#287,2026,,0,4,M,,0,,,,15,,,,0,,,,,,` |
| Ren HS-rangliste | `#288,2026,,0,,,,0,,,,15,,,,0,,,,,,M` |
| Ren DS-rangliste | `#288,2026,,0,,,,0,,,,15,,,,0,,,,,,K` |
| Ren HD-rangliste | `#289,2026,,0,,,,0,,,,15,,,,0,,,,,,M` |
| Ren DD-rangliste | `#289,2026,,0,,,,0,,,,15,,,,0,,,,,,K` |
| Ren MD herrer / damer | `#292,2026,,0,,,,0,,,,15,,,,0,,,,,,M` / `…,K` |

Systemet i hashen (Christoffers aflæsning, skal verificeres): første tal er listetype (287 samlet, 288 single, 289 double, 292 mixed), så kommer sæson, ranglisteversion/dato, aldersgruppe-ID (21 = ungdom samlet, 4 = U13, 5 = U15), køn (M/K), klub-ID (1093 = GSB), region (8 = København), og til sidst køn for disciplinlisterne.

## Mål
1. **Hvad har vi allerede?** Lav en opgørelse af `rangliste-historik.db`: antal spillere, discipliner, `version_date`-interval, antal versioner pr. sæson, og dækning pr. sæson og pr. aldersgruppe for GSB-spillere. Hvilke GSB-spillere (fra 679) mangler point i hvilke sæsoner og discipliner?
2. **`points_at_match`:** Hvor stor en del af `individual_match_players` har `points_at_match`, pr. sæson og aldersgruppe, og hvad betyder feltet (point pr. kategori ved kampen, eller et andet tidspunkt)? Hvor stor en del er blank eller 0? Må ikke fortolkes ud over det, kilden viser. Gem evidens (eksempler).
3. **`national-spillere.db`:** Beskriv skema, rækketal, sæsoner og hvilke spillere/discipliner/versioner den dækker (kun skemaliste og tal, ingen fortolkning). Kan den bruges til at finde modstandernes point?
4. **Modstandernes point:** Hvor mange modstandere i ungdomskampene (2025/26 og 2026/27) kan kobles til point i en af kilderne, og hvor mange mangler? Dæk også, hvad der ikke kan kobles (navn uden klub, spillere uden medlems-ID).
5. **Hash-systemet:** Kontrollér Christoffers aflæsning af URL-hashen mod de eksisterende scripts og notater (`call-ranking-*.mjs`, `API_RESEARCH.md`). Hvad svarer hver position til i Nembadmintons API-kald (`GetPlayerRankingListPoints`, versioner, spillere), og hvilke af de 12 eksempel-lister kan hentes uden at gå via siden? Skriv de parametre, der skal til: sæson, version/dato, aldersgruppe, køn, klub, region, disciplin.
6. **Plan:** Foreslå en hentningsplan til et senere kort: hvilke lister og versioner der skal hentes, hvor mange kald, rimelig takt og genoptagelse, hvor data skal gemmes (ny database, ikke de eksisterende), og hvad der er nødvendigt for "forventet vinder" (minimum: point for begge sider i hver kamp pr. disciplin ved kampdatoen).

## Output (nye filer)
- `statistik/results/148-ranglistepoint-inventar.md` (punkt 1–5 med tabeller, og planen i punkt 6)
- `statistik/results/148-ranglistepoint-inventar.json` (de samme tal maskinlæsbart)
- Ingen script er nødvendigt, men et script må gerne ligge i `statistik/scripts/148-inventar.mjs`, hvis opgørelsen køres derfra.

## Kontrol
- **Målet:** Alle seks punkter besvaret. For hvert tal står kilden (tabel og forespørgsel).
- **Værnet:** Ingen hentning (ingen netværk), ingen skrivning til databaser. Databasehashes uændrede: `gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C. `rangliste-historik.db` og `national-spillere.db`: opgiv hash før og efter, de må være uændrede. Alle databaser åbnes `readOnly: true`. `git status --short statistik/data/` tom, `git diff --check` uden fejl. Kør ikke parser-testen (der er ingen parserændring).
- **Skøn:** 10 tilfældige GSB-spillere og 10 modstandere fra 2025/26-ungdomskampe: for hver, kan point findes (ja/nej, kilde, dato), og stemmer `points_at_match` med `ranking_snapshots` for den nærmeste version?

## Afgrænsning
- Ingen netværk, ingen downloads, ingen databaseændringer.
- Ret ikke 136-parseren, 143–147-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.
- Ingen artifact. Ingen forventet-vinder-beregning i denne opgave.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke på, hvad en kolonne eller markør betyder. Er det ukendt, så skriv, at det er ukendt, og gem evidensen.

## Gren
`arbejde/148-ranglistepoint-inventar`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
