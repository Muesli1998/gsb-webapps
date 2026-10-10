# gsb-shell: begrænset shell for Claude (v1.5)

En lille MCP-server (ingen afhængigheder), der kun kan køre de kommandoer, der står i `tilladelser.json`. Kilden ligger her i repoet. **Den kørende kopi ligger udenfor repoet** (`%USERPROFILE%\gsb-shell-mcp`), så ingen kan ændre tilladelserne ved at skrive filer i repoet; man skal kopiere dem derover selv.

## Installation (Windows)

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\gsb-shell-mcp" | Out-Null
Copy-Item tools\mcp-shell\server.mjs, tools\mcp-shell\tilladelser.json "$env:USERPROFILE\gsb-shell-mcp\"
# Kun første gang (indeholder en tom godkendelsesliste; overskriv den ALDRIG senere, så mister du godkendelserne):
Copy-Item tools\mcp-shell\net-kort.json "$env:USERPROFILE\gsb-shell-mcp\"
node "$env:USERPROFILE\gsb-shell-mcp\server.mjs" --laas
```

Derefter i Claude Desktop (Indstillinger → Developer → Edit Config), under `mcpServers`:

```json
"gsb-shell": { "command": "node", "args": ["C:\\Users\\Christoffer\\gsb-shell-mcp\\server.mjs"] }
```

Genstart Claude Desktop (kun nødvendigt ved nye værktøjsnavne eller ændret `server.mjs`). Ved opgradering: kopiér `server.mjs` og `tilladelser.json`, genstart. `--laas` er kun nødvendigt, hvis en låst fil er ændret.

## Hvad der kan køres

Se `tilladelser.json`. Hvert værktøj har faste kommandoer og parametre med et `moenster`. Der køres aldrig gennem en shell.

**Git og kort:** `git_status`, `git_gren`, `git_diff_check`, `git_diff_stat`, `git_log`, `git_add` (eksplicitte stier), `git_commit` (én linje, ingen Co-Authored-By), `git_gendan_fil` (kasserer ændringer i angivne filer), `git_flet_gren` (ff-only, kun `arbejde/...`), `git_skift_main` (kun ren træ), `git_push` (kun `git push origin main`, kun fra main), `git_flyt_kort` (`work/future` til `work/aabne`, staged), `tjek_hashes`, `node_test`.

**Kort:** `kort_koer` (uden netværk og DB-ændring) og `kort_koer_net` (kun kort, hvis præcise indhold Christoffer har godkendt). `net_godkend` (først forhåndsvisning med hash, så godkendelse med hash) og `net_traek` skriver `net-kort.json` og genlåser den selv. På PC: `node server.mjs --godkend <nr> [hash]` (springer kaldloftet over, aldrig blokerede kort). `job_status` og `job_liste` viser baggrundsjobs.

**Gulv i koden** (gælder uanset tilladelser.json):
- Kun `git`, `node` og `powershell`.
- Git: kun de underkommandoer og flag, der står i `GIT_FLAG`. Alt andet, der starter med `-`, afvises. `push` kun som `push origin main`; `restore` kun som `restore -- <stier>`; `mv` kun `work/... til work/...`; `switch` kun `main` eller `arbejde/...`. Hooks slås fra.
- `powershell`: kun `-File <låst script>`. `-TillavDbAendring` afvises altid. `-TillavNetvaerk` kun for værktøjer med `net: true`.
- `node`: enten `--test <én testfil under tools/ eller statistik/scripts/>` eller et låst script.
- Stier: ingen `..`, absolutte stier, `.git`, jokertegn eller symlinks/junctions ud af repoet.
- **`apps/netlify-prod/` kan aldrig ændres via værktøjerne:** stier dér afvises i `git_add`/`git_gendan_fil`/mv; `git_commit` afviser hvis noget dér er staged; `git_flet_gren` og `git_push` afviser, hvis grenen eller det, der pushes, rører mappen; og et job, der efterlader ændringer dér, meldes i `job_status` og revisionsloggen.
- **`blokeredeKort`** i `tilladelser.json` kan hverken køres (uden `-Toer`) eller godkendes via værktøjerne: kort der skriver databaser (163, 169, 175) og kort der rører `apps/netlify-prod/` (025, 026, 028, 029, 178, 180).
- **`maxNetKald`** (400): net_godkend afviser kort, hvor Netværk-linjen nævner et højere tal eller intet tal.
- Kørsler stilles i kø. Et baggrundsjob ad gangen (fælles lås på tværs af serverprocesser). Skrivende værktøjer afvises, mens et job kører.
- Netværkskort: runneren verificerer kortets hash efter sit eget `git pull`; kortets faste del overvåges under kørslen og afbryder jobbet, hvis den ændres. Alle godkendelser, afvisninger og afslutninger skrives i `jobs/net-log.jsonl`.

**Låste filer** (`"laas"`): `tools/koer-kort.ps1`, `tools/tjek/db-hashes.mjs` og `net-kort.json` har en SHA-256 i `laas.json`. Ændres en fil uden for værktøjerne, afvises kørsel, til du har gennemlæst den og kørt `node server.mjs --laas`.

## Test

- `node --test tools/mcp-shell/server.test.mjs` (Linux og Windows, 18 tests, midlertidigt git-repo).
- `node tools/mcp-shell/test-v15.linux.mjs` (58 tests) og `node tools/mcp-shell/test-net.linux.mjs` (29 tests): kun Linux/macOS (bruger `sleep`). Ikke kørt på Windows. `git_gendan_fil` er testet i testrepoet, men ikke i det rigtige.

## Hullerne, ærligt

- **Det hele er tillidsbaseret.** `kort_koer` og `kort_koer_net` starter Codex med `--sandbox danger-full-access`. Serveren styrer hvornår og med hvilke parametre, men ikke hvad Codex gør derefter. Netværksbudget, domænebegrænsning, databaseforbud og Netlify-reglen er regler i kortene plus tjek og opdagelse bagefter, ikke en teknisk mur. Codex kan i princippet redigere `net-kort.json` og `laas.json`; det opdages først ved næste kald, hvis pinnen ikke matcher.
- **`net_godkend` er en bekvemmelighed, ikke en barriere:** Claude-sessionen kalder det kun efter Christoffers ord i chatten, og hashen skal vises først. Forbindes installationsmappen til en Claude-session, er garantien brudt.
- **Kortets hash afhænger af bytes.** Skifter en gren eller `core.autocrlf` linjeskift, ændres hashen, og kortet afvises; godkend det da igen.
- **`node_test` kører testkode fra repoet.** Fjern værktøjet, hvis det er for bredt.
- **Git-kommandoer ændrer arbejdstræet** (`add`, `commit`, `restore`, `switch`, `merge`, `mv`). `git_gendan_fil` kan ikke fortrydes.
- Fase 2 (kort der skriver databaser, med ekstra godkendelse) er ikke bygget.
