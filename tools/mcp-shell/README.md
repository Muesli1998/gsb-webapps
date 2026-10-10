# gsb-shell: begrænset shell for Claude

En lille MCP-server (ingen afhængigheder), der kun kan køre de kommandoer, der står i `tilladelser.json`. Kilden ligger her i repoet. **Den kørende kopi ligger udenfor repoet** (`%USERPROFILE%\gsb-shell-mcp`), så ingen kan ændre tilladelserne ved at skrive filer i repoet; man skal kopiere dem derover selv.

## Installation (Windows)

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\gsb-shell-mcp" | Out-Null
Copy-Item tools\mcp-shell\server.mjs, tools\mcp-shell\tilladelser.json "$env:USERPROFILE\gsb-shell-mcp\"
node "$env:USERPROFILE\gsb-shell-mcp\server.mjs" --laas
```

Derefter i Claude Desktop (Indstillinger → Developer → Edit Config), under `mcpServers`:

```json
"gsb-shell": { "command": "node", "args": ["C:\\Users\\Christoffer\\gsb-shell-mcp\\server.mjs"] }
```

Genstart Claude Desktop.

## Hvad der kan køres

Se `tilladelser.json`. Hvert værktøj har faste kommandoer og parametre med et `moenster` (regulært udtryk), som værdierne skal matche. Der køres aldrig gennem en shell, så parametre kan ikke indeholde ekstra kommandoer.

**Gulv i koden** (gælder uanset tilladelser.json):
- Kun `git`, `node` og `powershell`.
- Git: kun underkommandoerne status, diff, log, show, add, commit, switch, merge, branch, pull, og kun de flag, der står i listen i `server.mjs` (`GIT_FLAG`). Alt andet, der starter med `-`, afvises (også `-C`, `-f`, `--force`, `--hard`, `--amend`). Git-hooks slås fra for alle kald.
- `powershell`: skal starte med `-NoProfile -ExecutionPolicy Bypass -File <script>`, og scriptet skal stå på værktøjets `laas`-liste.
- `node`: enten `--test <én testfil under tools/ eller statistik/scripts/>` eller et script på værktøjets `laas`-liste.
- Stier til `git_add`: ingen `..`, ingen absolutte stier, intet under `.git`, ingen jokertegn, og den rigtige sti (efter symlinks/junctions) skal ligge i repoet.
- Kørsler stilles i kø. Et baggrundsjob ad gangen. Mens et job kører, afvises `git_add`, `git_commit` og `git_flet_gren`.
- Output klippes i hukommelsen (10.000 tegn i hver ende); baggrundslog afkortes ved 5 MB.

**Låste filer** (`"laas"`): `tools/koer-kort.ps1` og `tools/tjek/db-hashes.mjs` har en SHA-256 i `laas.json`. Ændres filen, afvises kørsel, til du har gennemlæst den og kørt `node server.mjs --laas`.

## Ændre noget

- **Ny tilladelse eller ændret mønster:** ret `tilladelser.json` i installationsmappen. Det virker ved næste kald uden genstart (nye *navne* kræver genstart af Claude Desktop).
- **Husk:** ret også kopien i repoet, så de to ikke driver fra hinanden.
- **Slå netværk/DB-ændring/commit til for `kort_koer`:** tilføj en parameter og et `{"naar": "...", "vaerdi": ["-TillavNetvaerk"]}`-led i `args`. Det er slået fra som standard.
- **Test:** `node --test tools/mcp-shell/server.test.mjs` (kører mod et midlertidigt git-repo). Kørt på Linux og Windows. Dækker ikke PowerShell-argumentvarianter på Windows eller junctions med rettighedsproblemer; symlink-testen springes over, hvis de ikke kan oprettes.

## Hullerne, ærligt

- **`kort_koer` er en bekvemmelighed med fuld adgang, ikke en sandbox.** Den starter Codex med `--sandbox danger-full-access`. Serveren styrer hvornår og med hvilke parametre, men ikke hvad Codex gør derefter; det begrænser kortets afgrænsning og scriptets efterkontrol. Vil du kun have snæver git-adgang, så fjern `kort_koer` og `tjek_hashes` fra `tilladelser.json`.
- **`node_test` kører testkode fra repoet.** Hvis nogen kan skrive en testfil under `tools/` eller `statistik/scripts/`, kan den køres. Fjern værktøjet, hvis det er for bredt.
- **Låsen** på `koer-kort.ps1` og `db-hashes.mjs` beskytter mod stille ændringer, men gennemlæsning er stadig dit ansvar, før du kører `--laas`.
- **Git-kommandoer ændrer arbejdstræet** (`add`, `commit`, `switch`, `merge`). De er med vilje de eneste skrivende.
