# Strukturguide — nye delprojekter og ny maskine

Denne guide beskriver den struktur, der findes i `gsb-webapps` nu. Den erstatter ikke [AGENTS.md](../AGENTS.md), som fortsat er reglerne for arbejdsform, Git og databaser.

## Hvor hører et nyt projekt hjemme?

Start med at afklare om arbejdet er en ny selvstændig app, en del af en eksisterende app, data, et hjælpeværktøj eller en besluttet opgave. De nuværende mapper viser den praksis, der allerede bruges:

| Behov | Placering i dag | Konkret eksempel |
|---|---|---|
| Deployerbar webapp eller Netlify-funktion | `apps/` | Den faktisk deployede GSB-app ligger i `apps/netlify-prod/`. |
| Kampsystemets preview, kilder, byg og lokale eksempeldata | `kampsystem/` | `build3.py`, `kampsystem_source.html`, CSV-input og previewfiler ligger samlet her. |
| Selvstændig dataindsamling med egne scripts, resultater, SQL og særregler | egen topmappe | `statistik/` har egne `scripts/`, `results/`, `sql/`, `data/` og et lokalt `AGENTS.md`. |
| Små delte tekstdata, der ikke er et selvstændigt system | `data/` | `navne-alias.json` og mindre CSV-/analyseinput. |
| Tværgående engangsværktøj eller test | `tools/` | Git-hjælpere og testværktøjer under `tools/tests/`. |
| Besluttet arbejde før og efter udførelse | `work/` | `work/aabne/` er den aktive kø, `work/loeste/` er udførte kort og `work/future/` er specificerede, men ikke aktive kort. |
| Forklaring, beslutning, plan eller idé | `docs/` | `BESLUTNINGER.md`, statistikplanen og idébankerne. |

### Hvornår får noget sin egen topmappe?

`statistik/` er det konkrete mønster: en topmappe bruges, når et delprojekt har sin egen data-/scriptkæde, egne resultatfiler og særlige arbejdsregler. En enkelt ny side eller funktion i den deployede GSB-app er derimod en del af `apps/netlify-prod/`; en ændring af træningsrundefordelingen hører til i `kampsystem/`.

Opret ikke en ny topmappe alene for en idé eller en lille ændring. Skriv først idéen i den relevante idébank, eller opret et kort i `work/` når Chris har besluttet arbejdet. Hvis placeringen ikke kan udledes af de eksisterende eksempler, er det et beslutningsspørgsmål til Chris — ikke en regel man opfinder under implementeringen.

## Opsæt en ny maskine

### 1. Klon i en almindelig kodeplacering

Klon repoet fra GitHub. Kopiér aldrig en `.git`-mappe fra Dropbox, et zip-arkiv eller en anden maskine.

```powershell
git clone https://github.com/Muesli1998/gsb-webapps.git C:\Users\<bruger>\Code\gsb-webapps
cd C:\Users\<bruger>\Code\gsb-webapps
git status
git remote -v
```

`git status` skal identificere `main`, og `git remote -v` skal vise GitHub som `origin`.

### 2. Opret den lokale sti-konfiguration

Kopiér `config.example.json` til `config.local.json`. Den lokale fil er ignoreret af Git og må indeholde maskinens Dropbox-stier.

```powershell
Copy-Item config.example.json config.local.json
notepad config.local.json
```

Udfyld de eksisterende felter efter maskinen:

- `dropboxRod`: Dropbox-roden på maskinen.
- `gsbData`: `Projects\GSB-Webapps` under denne Dropbox-rod.
- `secrets`: `secrets` under `gsbData`.

Kontrollér at JSON-filen kan læses:

```powershell
Get-Content config.local.json -Raw | ConvertFrom-Json
```

`config.local.json` må aldrig committes.

### 3. Installer og kontrollér køretider

Repoet bruger både Node.js og Python. Installér begge på en ny maskine og kontrollér dem i en ny PowerShell-session:

```powershell
git --version
node --version
python --version
```

Statistikprojektet har Node-afhængigheder registreret i `statistik/package.json` og `statistik/pnpm-lock.yaml`; installér dem fra den mappe med den pakkehåndtering, lockfilen angiver:

```powershell
cd statistik
pnpm install --frozen-lockfile
cd ..
```

### 4. Verificér uden at ændre data

Disse kontroller læser eller syntakstjekker kun filer og er egnede som første maskintest:

```powershell
node --check apps/netlify-prod/netlify/functions/hent-resultater.js
python -m py_compile kampsystem/build3.py
git status --short
```

Hvis de to første kommandoer gennemføres uden fejl, er Node og Python tilgængelige for de relevante delprojekter. `git status --short` skal ikke vise en ændret `config.local.json`; filen er lokalt ignoreret. En egentlig build eller dataimport køres først efter det relevante opgavekort og dets kontroller.

## Daglig arbejdsgang

1. Start med `git pull` på den relevante gren.
2. Læs repoets `AGENTS.md` og eventuelle mere specifikke `AGENTS.md` i delmappen.
3. Arbejd på en gren, når opgaven er uddelegeret via et kort i `work/aabne/`.
4. Kør kortets konkrete kontroller, commit og push grenen.

Tunge databaser, videoer, regneark og nøgler ligger uden for Git i Dropbox. Kode, dokumenter og små tekstdata lever i repoet.
