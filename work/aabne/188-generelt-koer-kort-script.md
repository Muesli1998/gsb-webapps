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

Implementeret `tools/koer-kort.ps1` til Windows PowerShell 5.1 uden nye pakker og tilføjet `work/koersler/` til `.gitignore`. Tørkørsel stopper før pull, brancheskrivning eller Codex-start. Den faste prompt indeholder hele kortet efter indledningen. Codex-kørslen logger samlet stdout/stderr og håndterer timeout. Efterkørslen sammenholder status med tilladte stier, forsøger databasehashkontrol hvis scriptet fra kort 162 findes, og kører `git diff --check`. Commit sker kun med `-Commit`; lister kræver `-Commit` og stopper efter første fejl/afvigelse.

Testene blev kørt i en midlertidig PowerShell-proces med en in-memory `git`-funktion for at simulere preflight-tilstande. Ingen Git-skrivekommando blev kørt; `codex exec` blev ikke startet. Det faktiske `git status --short` før og efter testene var identisk:
```
 M .gitignore
?? tools/koer-kort.ps1
```

#### Tørkørsel 179

Kommando: `& tools/koer-kort.ps1 -Kort 179 -Toer`

Output:
```
Kort: 179 (C:\Users\Christoffer\Code\gsb-webapps\work\aabne\179-generelt-snapshot-tests-netlify-funktioner.md)
Aktuel gren: main
Målgren: arbejde/179-generelt-snapshot-tests-netlify-funktioner
Netværk: ingen
Codex: C:\Users\Christoffer\AppData\Local\OpenAI\Codex\bin\2e5e00daee91c61d\codex.exe
Node: v24.21.0
Ville køre: git pull --ff-only
Ville oprette gren: git switch -c arbejde/179-generelt-snapshot-tests-netlify-funktioner
Ville køre: codex exec --sandbox danger-full-access -o work/koersler/179/slutsvar.md -
Prompt — første 20 linjer:
Følg kortet ordret.
Kør alle kommandoer med forhøjet adgang; Christoffer godkender hver gang.
Brug kun læsende git-kommandoer.
Ingen commit, ingen push, ingen sub-agents.
Skriv i kortets Spørgsmål og Resultat.
Stop, når du er færdig.

# Opgave 179 — tests der fastholder nuværende adfærd i navne.js, hent-resultater.js og analyse.js (uden at ændre dem)

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10 (plan: `work/future/000-kortplan-boelger-og-afhaengigheder.md`).
**Kategori:** generelt · **Bølge:** 1 · **Afhænger af:** — (kan køres nu) · **Netværk:** ingen

**Trin:** Sikkerhedsnet før 029 (F1/F2), 026 (admin-gate) og enhver ny feature: ændres adfærd, ser vi det.

## Gren
`arbejde/179-generelt-snapshot-tests-netlify-funktioner`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Ingen af Netlify-funktionerne har automatiske tests. Roadmap og kode review (2026-09-06) beskriver kendte fejl (F1: walkover kollapses til udesejr; F2: `seenMatches.add` for tidligt; F7: cap på 199 spillere).
- `erWalkover(navne)` blev shippet 2026-09-07 og testet isoleret; testen findes ikke i repoet. `navne.js` indeholder 44-navns facit-listen som aliasopslag.
```
EXIT: 0
```

#### Tørkørsel 164

Kommando: `& tools/koer-kort.ps1 -Kort 164 -Toer`

Output:
```
Kort: 164 (C:\Users\Christoffer\Code\gsb-webapps\work\aabne\164-statistik-stamdata-trup-badmintonid-kortlaegning.md)
Aktuel gren: main
Målgren: arbejde/164-statistik-stamdata-trup-badmintonid-kortlaegning
Netværk: ingen
Codex: C:\Users\Christoffer\AppData\Local\OpenAI\Codex\bin\2e5e00daee91c61d\codex.exe
Node: v24.21.0
Ville køre: git pull --ff-only
Ville oprette gren: git switch -c arbejde/164-statistik-stamdata-trup-badmintonid-kortlaegning
Ville køre: codex exec --sandbox danger-full-access -o work/koersler/164/slutsvar.md -
Prompt — første 20 linjer:
Følg kortet ordret.
Kør alle kommandoer med forhøjet adgang; Christoffer godkender hver gang.
Brug kun læsende git-kommandoer.
Ingen commit, ingen push, ingen sub-agents.
Skriv i kortets Spørgsmål og Resultat.
Stop, når du er færdig.

# Opgave 164 — stamdata for GSB-spillere: navne, aliaser og ID'er på tværs af kilderne (kun læsning)

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10 (plan: `work/future/000-kortplan-boelger-og-afhaengigheder.md`).
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** — (kan køres nu) · **Netværk:** ingen

**Trin:** Forberedelse til alle kort, der skal slå en spiller op: 163, 169, 173, 186. Løser også det åbne spørgsmål om "vores side" (BESLUTNINGER 2026-10-04).

## Gren
`arbejde/164-statistik-stamdata-trup-badmintonid-kortlaegning`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Samme person står under flere navne og ID'er: Resultater bruger BD-navne, Dream Team har en 44-navns facit-liste (`data/navne-alias.json`, `apps/netlify-prod/netlify/lib/navne.js`), `national-spillere.db` har spiller-ID'er (kort 116–120), ranglisten har et `playerid` (fx 329159 i 158b), og den normaliserede DB har sine egne spiller-rækker.
- Ukendt: om rangliste-`playerid` er det samme tal som BadmintonID i `national-spillere.db`. 149 og 155 efterlod spørgsmålet åbent. Ukendt: hvordan man strukturelt afgør, hvilken side i en kamp der er GSB, uden en navneliste (BESLUTNINGER 2026-10-04 "vores side").
```
EXIT: 0
```

#### Fejltilstande

1. Snavset arbejdstræ
   Kommando: `& tools/koer-kort.ps1 -Kort 179 -Toer`
   Output: `KOER-KORT: Arbejdstræet er ikke rent. git status --short: M docs/mock-local.md`
   Exitkode: 1.

2. Forkert gren
   Kommando: `& tools/koer-kort.ps1 -Kort 179 -Toer`
   Output: `KOER-KORT: Forkert gren: står på 'arbejde/mock-forkert', forventede 'main'.`
   Exitkode: 1.

3. Kort findes ikke
   Kommando: `& tools/koer-kort.ps1 -Kort 999 -Toer`
   Output: `KOER-KORT: Kort 999 findes ikke entydigt i work/aabne/.`
   Exitkode: 1.

4. Kort kræver netværk uden `-TillavNetvaerk` (kort 172, kun preflight-test; kortet blev ikke kørt)
   Kommando: `& tools/koer-kort.ps1 -Kort 172 -Toer`
   Output: `KOER-KORT: Kortet kræver/angiver netværk ('højst 10 kald'). Brug kun -TillavNetvaerk efter særskilt godkendelse.`
   Exitkode: 1.

5. Målgrenen findes allerede
   Kommando: `& tools/koer-kort.ps1 -Kort 188 -Toer`
   Output: `KOER-KORT: Målgrenen findes allerede: arbejde/188-generelt-koer-kort-script`
   Exitkode: 1.

Alle to tørkørsler sluttede med exit 0; alle fem fejltilstande gav en tydelig forklaring og exit 1. En første test afslørede, at metadata-parseren ikke fangede markdown-formatet `**Netværk:**`; mønstret blev rettet, og hele testserien bestod efter rettelsen.

Git- og netværksafgrænsningen blev overholdt: kun læsende Git i testharnessen, ingen `codex exec`, ingen andre kort blev kørt, og ingen netværkskald blev foretaget.
