# Opgave 184 — krydsmåling: kampsystemets ELO mod ranglistepoint

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 4 · **Afhænger af:** Christoffer eksporterer `ELO_Spillere` som CSV; 164 (navnekobling) · **Netværk:** ingen

**Trin:** Afgør, om klubbens træningsrating og BD's ranglistepoint siger det samme om spillerne.

## Gren
`arbejde/184-kryds-elo-vs-ranglistepoint`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Kampsystemet beregner ELO-rating ud fra træningskampe og gemmer i Sheets (`ELO_Spillere`). Ranglistepoint ligger i `rangliste-point.db`.
- Blokering: Christoffer skal eksportere `ELO_Spillere` til en CSV i `gsbData` (Dropbox) og skrive stien i Spørgsmål. Codex og Claude kan ikke læse arket.

## Mål
1. Match spillere via stamdata (164). Tæl matchede, umatchede (hver side) og navnekonflikter.
2. Mål rangkorrelation (Spearman) samlet og pr. disciplin og køn; list de 15 største afvigere begge veje; forklar ikke afvigelser, kun mål dem.
3. Skriv, hvad ELO-skalaen svarer til i ranglistepoint (lineær regression med usikkerhed), kun hvis korrelationen støtter det.
4. Konsekvens for Kampsystemet: kunne ranglistepoint bruges som startværdi for nye spillere? Svar som vurdering.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser, `apps/netlify-prod/`, selve CSV-filen (læs kun).

## Kontrol
- **Målet:** Matchantal, korrelationer med antal, afvigerliste.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). Nul netværkskald. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om startværdi fra ranglistepoint er rimeligt.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Mangler CSV'en, så stop med det samme og skriv det. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
