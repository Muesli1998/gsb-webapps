# Opgave 188 — script der kører ét kort ad gangen i Codex (codex exec) med git-værn

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10.  
**Kategori:** generelt · **Bølge:** 1 · **Afhænger af:** — (kan køres nu) · **Netværk:** ingen

**Trin:** Værktøj. Første test: tør-kørsel her, rigtig kørsel af kort 179 bagefter (Christoffer).

## Gren
`arbejde/188-generelt-koer-kort-script`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Christoffer vil køre kort med mindre håndholdt arbejde. `codex exec` kører Codex uden dialog: prompten kan komme på stdin (`codex exec -`), det sidste svar gemmes med `-o <fil>`, standardsandbox er read-only, skriveadgang gives med `--sandbox` (kilde: OpenAI Codex non-interactive mode). `--full-auto` er forældet. Dokumentationen nævner hverken et `cd`-flag eller et separat approvals-flag: scriptet sætter selv arbejdsmappen.
- Sandboxen på denne maskine fejler i interaktiv tilstand (`setup refresh had errors`, se rodens `AGENTS.md`, afsnittet om Codex på Windows). Ukendt: om `codex exec` rammes af samme fejl. Derfor bruger scriptet `--sandbox danger-full-access` og tjekker selv bagefter, hvad der er ændret.
- Gitreglerne i kortene er: Christoffer opretter grenen og committer; Codex kører kun læsende git, ustaged, ingen push. Scriptet opretter grenen (det er mekanisk) og lader Codex' ændringer stå ustaged, medmindre `-Commit` er angivet.

## Mål
1. Skriv `tools/koer-kort.ps1` (Windows PowerShell 5.1-kompatibelt, ingen nye pakker) med parametrene `-Kort <nummer eller liste>`, `-Commit` (valgfri), `-TillavNetvaerk` (valgfri), `-TimeoutMin` (standard 90), `-Toer` (viser kun, hvad der ville ske).
2. **Før start (afbryd med forklaring, hvis noget fejler):** kortet findes i `work/aabne/`; arbejdstræet er rent (`git status --short` tomt); aktuel gren er `main`; `git pull --ff-only` lykkes; grenen, kortet navngiver (første kodeformaterede navn under `## Gren`), findes ikke i forvejen; kortets Netværk-linje er `ingen`, medmindre `-TillavNetvaerk`; en `codex.exe` kan findes (se rodens `AGENTS.md` for stien) og `node` kan køres.
3. **Kør:** opret grenen (`git switch -c`); byg prompten af en fast indledning (følg kortet ordret; kør alle kommandoer med forhøjet adgang; kun læsende git; ingen commit, ingen push, ingen sub-agents; skriv i kortets Spørgsmål og Resultat; stop når du er færdig) plus kortets fulde tekst; kør `codex exec --sandbox danger-full-access -o work/koersler/<nr>/slutsvar.md -` med prompten på stdin og arbejdsmappen sat til repo-roden; gem fuld stdout/stderr i `work/koersler/<nr>/log.txt`; dræb processen efter `-TimeoutMin`.
4. **Efter kørsel:** kør `git status --short`; sammenhold ændrede filer med kortets `Må røres`-linje (forslag: præfiksmatch mod de kodeformaterede stier/mapper i linjen, kortets eget nummer i filnavnet og selve kortfilen) og list alt andet som "uden for afgrænsning"; kør `node tools/tjek/db-hashes.mjs`, hvis den findes (ellers skriv "ikke tjekket: kort 162 mangler"); kør `git diff --check`. Udskriv en kort rapport: gren, antal ændrede filer, afvigelser, hashresultat, sti til slutsvaret.
5. **Commit kun med `-Commit`** og kun hvis ingen afvigelser: `git add` af de navngivne ændrede filer (aldrig `git add -A`), `git commit -m "Kort <nr>: kørt med koer-kort"`. Ingen push, ingen merge. Uden `-Commit` stopper scriptet her, og Christoffer vurderer og committer selv.
6. **Liste af kort:** efter hvert kort gå tilbage til `main` (`git switch main`) og fortsæt kun, hvis det forrige blev committet uden afvigelser. Ved første fejl eller afvigelse stop hele listen og skriv hvorfor. Uden `-Commit` er listen kun tilladt for ét kort.
7. Tilføj `work/koersler/` til `.gitignore`.
8. **Test uden netværk og uden at starte Codex:** kør `-Toer` for 179 og 164 og vis uddraget. Test forkerte tilstande (snavset træ, forkert gren, kort findes ikke, kort med netværk, gren findes allerede) og skriv kommando + output for hver i Resultat.

## Afgrænsning
- **Må røres:** `tools/koer-kort.ps1`, `.gitignore` (kun tilføjelsen), dette korts Spørgsmål og Resultat.
- **Må ikke røres:** alle andre filer, alle databaser, `apps/`, andre kort. Kør IKKE `codex exec` i dette kort og kør ingen andre kort.

## Output
- `tools/koer-kort.ps1`

## Kontrol
- **Målet:** `powershell -File tools/koer-kort.ps1 -Kort 179 -Toer` viser gren, kommando og promptens første 20 linjer og ændrer intet (`git status --short` uændret). Alle fem fejltilstande afbryder med en klar besked og exit-kode ≠ 0.
- **Værnet:** `git diff --stat` viser kun scriptet og `.gitignore`. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om scriptets rapport er så tydelig, at Christoffer kan afgøre commit/ikke commit uden at åbne diffen. Selve `codex exec`-kørslen testes bagefter af Christoffer på kort 179.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Hvis `-Toer` kræver at starte Codex, så ændr scriptet, så det ikke gør. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet scriptet og tilføjelsen i `.gitignore`.

## Resultat
(Udfyldes af Codex.)
