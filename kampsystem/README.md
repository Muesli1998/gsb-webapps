# GSB Webapps Preview — build bundle

Dette er den PRÆCISE opsætning der bygger `gsb_preview.html`, den ene selvstændige
fil der udgør hele preview-app'en (landing + Dream Team + Ungdomssparring +
Søndagstræning, med sæson- og fane-navigation). Ingen server, ingen build-tool,
ingen npm — kun Python 3 (standardbibliotek: `json`, `re`, `base64`, `os`, `csv`).

## Sådan bygger du den (2 kommandoer)

```bash
python3 build_real.py   # kun nødvendigt hvis du ændrer *_2526.csv-filerne — genererer real_data.json
python3 build3.py       # bygger alle _preview.html + gsb_preview.html
```

Output: `gsb_preview.html` — åbn den fil direkte i en browser. Det er hele app'en.

## Arkitektur (kort)

- **Én shell-fil, ikke separate sider.** `gsb_preview.html` er bygget fra
  `shell_template2.html` + et JSON-blob (`pages_b64_v2.json`) med hver undersides
  fulde HTML base64-kodet. Shell'en opretter ét `<iframe srcdoc="...">` pr. side
  ved load og skifter bare hvilket iframe der er synligt (`.active`-klasse) — der
  sker ALDRIG en rigtig browser-navigation, så der er intet "åbn eksternt link"-problem.
- **Navigation mellem sider**: hver underside har sine egne interne `<a href="/x.html">`-
  links. Et lille injiceret script (`NAV_MSG_SCRIPT_TEMPLATE` i `build3.py`) opsnapper
  klik på dem og sender `parent.postMessage({type:'gsbnav', page:'x'}, '*')` i stedet
  for at navigere. Shell'en lytter efter den besked og skifter aktivt iframe.
- **Data er bagt ind, ikke hentet live.** Hver undersides `window.fetch` bliver
  overskrevet (monkey-patched) i et injiceret `<script>`, så kald til
  `/.netlify/functions/...` opsnappes og besvares med data der allerede er bagt
  ind som JSON i selve HTML-filen — INGEN netværkskald sker når man bruger preview'et.
- **Ægte beregningslogik genskabt i JS**: `analyse.js` og `stilling.js`'s rigtige
  aggregerings-/beregningslogik er genimplementeret ordret client-side (se
  `runAnalyse()` og `runStilling()` i `build3.py`) og kører mod de bagte-ind rå
  datarækker — så resultat-formen matcher det rigtige API, selvom beregningen
  sker i browseren i stedet for server-side.

## Filoversigt

| Fil | Rolle |
|---|---|
| `build3.py` | Hovedbuild-scriptet. Læser kilde-HTML, injicerer mock-fetch + navigation, bager data ind, samler shell'en. **Det er her al mock-logik og sæson-branching bor.** |
| `build_real.py` | Genererer `real_data.json` (25/26-data) fra de fire `*_2526.csv`-filer. Kør kun hvis du opdaterer CSV'erne. |
| `real_data.json` | Bagt 25/26-data: `resultater` (rå kamprækker), `knownPlayers`, `holdMap` (Tilmeldinger/picks), `stilling` (runde-for-runde-totaler). **Ikke inkluderet i dette arkiv** — filen er 100% regenererbar ved at køre `python3 build_real.py` mod de fire `*_2526.csv`-filer herunder, som ER arkiveret. |
| `resultater_2425.json` | Bagt 24/25-data (594 rækker, rekonstrueret via Nembadminton-API + krydstjek — se `GSB_DREAM_TEAM_PROJECT_BRIEF.md` i Claude-projektet for metode). **Kun Resultater — ingen Tilmeldinger/Stilling-data for 24/25 endnu**, derfor viser Stilling-siden bevidst tomt for 24/25. |
| `*_source.html` | Rå kilde-HTML for hver side (kopi af de rigtige `public/*.html`-filer, før mock-injektion). |
| `index_real_source.html`, `senior-ungdom-tilmelding_real_source.html` | Reference-kopier af de to filer `build3.py` normalt læser direkte fra Dropbox-mappen (`SRC`-stien, se nedenfor) — inkluderet her så bundlen er selvstændig, hvis du ikke har adgang til den rigtige `netlify-tool/public`-mappe. |
| `shell_template2.html` | Selve shell'en (tab-navigation, iframe-håndtering, lock/gate-overlay for adgangskodebeskyttede sider). |
| `seasons_source.js` | Delt sæson-config — SKAL matche den rigtige `seasons.js` (samme sæson-liste, samme spreadsheetId'er). |
| `*_2526.csv` | Rå CSV-eksport af 25/26-arkets faner (Resultater, Spillerpoint, Holdoversigt, Stilling) — input til `build_real.py`. |
| `pages_b64_v2.json` | Mellemliggende output (base64 pr. side) — bruges af `shell_template2.html`. Regenereres automatisk. |
| `*_preview.html` | Hver enkelt sides færdige (mock-injicerede) HTML — praktisk til at kigge på én side ad gangen, men den rigtige app-oplevelse er `gsb_preview.html`. |

## `SRC`-stien i `build3.py`

Øverst i `build3.py` står:
```python
SRC = "/mnt/user-data/uploads/Dropbox/netlify-tool/public"
```
Det er stien til de RIGTIGE, ikke-mockede kildefiler (`index.html`,
`senior-ungdom-tilmelding.html` læses direkte herfra). Peg den på din egen sti til
`netlify-tool/public`-mappen (eller brug `index_real_source.html` /
`senior-ungdom-tilmelding_real_source.html` fra denne bundle som erstatning, hvis
du ikke har adgang til den rigtige mappe).

## Sådan er 24/25 koblet på (allerede gjort i denne bundle)

`build3.py` har tre grene i både analyse- og stilling-mock'en, matchet på
`spreadsheetId`:
1. **26/27** (`1naV601-...`) → altid tomt (det rigtige ark har ingen data endnu).
2. **24/25** (placeholder `SÆT_2425_SHEET_ID_HER`, matcher `seasons_source.js`) →
   Statistik-siden viser de 594 rigtige (rekonstruerede) rækker; Stilling-siden
   viser bevidst tomt (ingen Tilmeldinger-data for 24/25 endnu).
3. **Alt andet** (dvs. 25/26) → de fulde, rigtige data.

**Når Chris får det rigtige 24/25 Google Sheet-ID** (efter den manuelle CSV-import
er lavet): opdatér `SÆT_2425_SHEET_ID_HER` i BÅDE `seasons_source.js` (linje ~11)
og `SHEET_2425_PLACEHOLDER`-konstanten øverst i `build3.py` til det rigtige ID,
og kør `python3 build3.py` igen. Det er den ENESTE ændring der er nødvendig for at
holde preview'et i sync med det rigtige ark — selve dataen (594 rækker) er allerede
bagt ind og kræver ikke gen-hentning.

## Kendte begrænsninger i preview'et

- Ingen ægte skrivning nogen steder — alle "gem"/"tilmeld"-handlinger er fake
  (returnerer bare success efter en kunstig delay).
- `index.html` (data-indskrivning) bruger ren opdigtet eksempeldata, ikke rigtige tal.
- 24/25's Point(Hjemme)/Point(Ude)-kolonner i `resultater_2425.json` er ikke
  brugt af `runAnalyse()` (den kigger kun på Runde/Hold/Kategori/Hjemme/Ude/Sæt/Vinder),
  så evt. unøjagtighed i dem påvirker IKKE Statistik-preview'et.
</content>
