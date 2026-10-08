# Opgave 155 — hvordan henter vi kampene i sæson 2026/27? (undersøgelse, ingen skrivning)

**Trin:** Undersøgelse og plan. Ingen skrivning til databaser. Højst en lille netværksprøve (se nedenfor). Kører først efter 154 er færdig, så databasehashes ikke ændres under 154.

## Baggrund
`statistik/CODEX_EXTRACTION_SKILL.md` beskriver udtræk af holdkampe, men siger selv, at der ikke er bevist en importvej for en ny sæson: de gamle importscripts er historiske delruter, den friske automatiserede browserrute fejlede render-gaten i opgave 004, og holdresultater er ikke fulde individuelle opstillinger. Spiller- og kategoridata kommer fra browser-fallback og fra de nationale scrapere (`119-national-spiller-scraper.mjs`, `120-national-spiller-scraper.mjs`) til `national-spillere.db`. Sæson 2026/27 er i gang (første kampe i september), men normaliseret DB har ingen 2026/27-holdkampe med individuelle rækker. Vi vil bruge kampene til ranglistepoint ("forventet vinder") og aktuelle modstandere.

## Mål
1. **Hvad er i databasen nu for 2026/27?** (readOnly, `gsb-statistik-normalized.db`, `liga-landskab.db`, `national-spillere.db`): antal sæsoner/puljer/hold/holdkampe for `season_id` 2026 (og 2025 til sammenligning), antal kampe med dato, resultat, individuelle rækker, og hvor mange af GSB-ungdomskampene. Hvilke runder er allerede spillet (efter datoen), og hvilke mangler.
2. **Hvordan blev 2025/26 hentet?** Følg sporet i `TEST_RUN_LOG.md`, `statistik/results/` (fx 004-udtraeksvej, VALIDATED_BROWSER_METHOD, COMPLETE_RESULT_FALLBACK_METHOD), `docs/statistik-plan.md` og scriptene. Skriv en kronologisk opskrift: kilde → rute → script → filer → import → kontrol, med navn på hvert script og dets effekt (læser/skriver, hvilke filer/tabeller). Markér, hvad der er kodebekræftet, og hvad der er bevist ved en kørsel.
3. **Hvilke ruter virker i dag?** Test med højst **10 kald i alt** (Nembadminton GraphQL og/eller badmintonplayer.dk): (a) API-kæden `badmintonPlayerTeams` → `TeamFights` → `TeamMatch` for én GSB-pulje i 2026/27, (b) én kendt spillet 2026/27-kamp: giver ruten resultat og spillere, eller kun holdresultat? Skriv for hver rute, hvad den leverer, og hvad den ikke gør. Hvis en rute kræver en browser (render-gate), så skriv det uden at køre den.
4. **Hvem skal hentes?** Overvej tre omfang og regn kaldtal for hvert: (A) kun GSB-holdkampe, (B) GSB-puljer, hvor alle hold og alle runder i puljen medtages (så modstanderes øvrige kampe også kendes), (C) hele landet for ungdom. Brug tal for 2025/26 som reference (antal puljer, kampe pr. pulje, kald pr. kamp i den rute, der blev brugt).
5. **Hvordan holder vi det opdateret?** Foreslå en genoptagelig, idempotent opdateringsrutine: hvad der hentes ugentligt, hvordan nye og ændrede kampe findes (sæson + kamp-ID som nøgle), hvordan fejl og kendte undtagelser (fire U09-kampe, to corona, protestkamp 340495) bevares, og hvilke efter-import-kontroller der skal køre (`statistik/AGENTS.md`, afsnit "Databasen"), plus kopien til Dropbox-stien i `config.local.json`.
6. **Forslag til kort 156** (udførelse): afgrænsning, kaldbudget, hvilke scripts der skal ændres eller nyskrives, hvilke tabeller der skrives til, tilbagefald (kopi af databaserne før import), og hvad Christoffer skal godkende.

## Regler
- Netværk: kun til punkt 3, højst **10 kald**, sekventielt, mindst 2,1 sekunder, backoff ved 429/5xx, stop ved 3 fejl i træk eller botværn. Kun Nembadminton GraphQL (`app.nembadminton.dk/graphql`) og `badmintonplayer.dk`. Ingen login, ingen cookies, ingen CAPTCHA, ingen samtykkeklik. Gem rå svar i `statistik/results/155-raa-svar/` (kontekstnøgle redigeret ud).
- Alle databaser åbnes readOnly. Ingen import, ingen opdatering af kø- eller statusfiler, ingen kørsel af de gamle importscripts (`sync-*`, `import-*`, `build-normalized-db.mjs`, `run-*-fallback`).
- Gæt ikke på felters betydning; skriv "ukendt" og gem evidensen.

## Output
- `statistik/scripts/155-undersoegelse.mjs` (kun hvis noget køres; ellers ingen)
- `statistik/results/155-kampe-2026-27.md` (punkt 1–6, tabeller, forespørgselslog)
- `statistik/results/155-kampe-2026-27.json`
- `statistik/results/155-raa-svar/`

## Kontrol
- **Målet:** Punkt 1–6 besvaret. Opskriften i punkt 2 skelner mellem kodebekræftet og kørselsbevist. Forslaget i punkt 6 kan bruges som kort 156 uden yderligere antagelser.
- **Værnet:** Højst 10 forespørgsler (tallet står i loggen). Alle databasers SHA-256 uændrede før og efter: `gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E; `rangliste-point.db` rapporteres, men må ikke ændres. `git diff --check` uden fejl.
- **Skøn:** Fem 2026/27-GSB-kampe (dato, pulje, hold, resultat), som Christoffer kan slå op på den offentlige side.

## Afgrænsning
- Ingen hentning ud over de ti prøvekald, ingen import, ingen artifact, ingen forventet-vinder-beregning.
- Ret ikke 136-parseren, 143–154-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/155-kampe-2026-27`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive `155-raa-svar/`. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
