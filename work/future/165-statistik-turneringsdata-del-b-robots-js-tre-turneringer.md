# Opgave 165 — turneringsdata Del B: robots.txt, JavaScript-filer og tre kendte turneringer (højst 20 kald)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 2 · **Afhænger af:** 162, 171 (Del A skal være kørt og læst) · **Netværk:** højst 20 kald

**Trin:** Første netværkskort for turneringsdata. Svarer på: hvordan finder vi en turneringsklasses kampe, og hvad indeholder de?

## Gren
`arbejde/165-statistik-turneringsdata-del-b-robots-js-tre-turneringer`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Beslutning 2026-10-09 (`docs/BESLUTNINGER.md`): vi må hente åbent fra badmintonplayer.dk uden API-nøgle, i moderat takt, uden login, cookies, CAPTCHA eller samtykkeklik.
- 081 fandt webservicemetoderne `GetTournamentEvents(tournamentclassid)` og `SearchTournamentMatches(tournamentclassid, tournamenteventid)` (spiller-ID, sætscore, runde, W.O.). `SearchTournamentClass` gav HTTP 500 i tre forsøg.
- Kort 171 (Del A) har kortlagt id'er, en katalog over metoder og parametre, JavaScript-adresser fra den gemte HTML og en plan for netop dette kort. Planen i `statistik/results/171-turneringsdata-kortlaegning.md` er facit for rækkefølgen af kald; dette kort gentager den ikke.

## Mål
1. Kør planen fra 171 punkt 6a, i rækkefølgen: (1) `robots.txt` for badmintonplayer.dk. Forbyder den de stier, vi skal bruge, så stop og rapportér. (2) De JavaScript-filer, 171 udpegede, for at læse de rigtige parametre til `SearchTournamentClass`. (3) Tre kendte turneringer fra 171's liste: `GetTournamentEvents` og `SearchTournamentMatches` for hver.
2. Skriv pr. turnering: klasser, events, antal kampe, felter pr. kamp (spiller-ID'er for begge sider? klub? sætscore? runde? W.O.?), én eksempelrække.
3. Sammenlign med eventtabellen: for en GSB-spiller i hver af de tre turneringer — stemmer antal rækker i spillerens eventtabel med antal kampe i turneringssvaret? Hvilket id-tal i eventlinket svarer til `tournamentclassid`? Opdatér ID-modellen fra 171 (afgjort/ukendt).
4. Giv et kaldregnskab: brugte kald, og et estimat for Del C (oversigt over en hel sæson).

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/` (inkl. rå svar).
- **Må ikke røres:** alle databaser (read-only), 136-parseren, regelbogen, gamle scripts, `apps/netlify-prod/`.

## Output
- `statistik/scripts/165-turneringsdata-del-b.mjs`
- `statistik/results/165-turneringsdata-del-b.md/.json`
- `statistik/results/165-raa-svar/`

## Kontrol
- **Målet:** Højst 20 kald (tallet i loggen). `robots.txt` er hentet først og dens indhold citeret i rapporten. For de tre turneringer er felterne beskrevet, og ID-modellen er opdateret med evidens eller "ukendt". Hvert kald står i `calls.jsonl` med status, bytes og hash.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** Tre turneringer, som Christoffer kan slå op på den offentlige side (navn, dato, link-id, antal kampe).

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Forbyder `robots.txt` stierne, eller møder du en udfordringsside (`challenge-platform` o.l.), så stop straks. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive rå svar. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
