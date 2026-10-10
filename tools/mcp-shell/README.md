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

**Gulv i koden** (gælder uanset tilladelser.json): kun `git`, `node`, `powershell -File`; kun git-underkommandoerne status, diff, log, show, add, commit, switch, merge, branch, pull; aldrig `--force`, `-f`, `-D`, `--hard`, `-c`, `--amend`, `--no-verify`. Der er ingen `push`, `reset`, `clean`, `rm`.

**Låste filer** (`"laas"`): `tools/koer-kort.ps1` og `tools/tjek/db-hashes.mjs` har en SHA-256 i `laas.json`. Ændres filen, afvises kørsel, til du har gennemlæst den og kørt `node server.mjs --laas`.

## Ændre noget

- **Ny tilladelse eller ændret mønster:** ret `tilladelser.json` i installationsmappen. Det virker ved næste kald uden genstart (nye *navne* kræver genstart af Claude Desktop).
- **Husk:** ret også kopien i repoet, så de to ikke driver fra hinanden.
- **Slå netværk/DB-ændring/commit til for `kort_koer`:** tilføj en parameter og et `{"naar": "...", "vaerdi": ["-TillavNetvaerk"]}`-led i `args`. Det er slået fra som standard.
- **Test:** `node --test tools/mcp-shell/server.test.mjs` (kører mod et midlertidigt git-repo). Testet på Linux; Windows ikke testet endnu.

## Hullerne, ærligt

- `kort_koer` kører Codex med fuld adgang. Serveren begrænser ikke, hvad Codex gør inde i kørslen; det gør kortets afgrænsning og efterkontrollen.
- `node_test` kører testkode fra repoet. Hvis nogen kan skrive en testfil, kan den køre. Fjern værktøjet, hvis det er for bredt.
