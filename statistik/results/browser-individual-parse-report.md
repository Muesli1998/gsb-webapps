# Browser-individuelparser – dækningsaudit

Genereret: 2026-09-13T07:52:05.873Z

- Unikke payloads: **2816**
- Med holdresultat: **2680**
- Med kategorisektioner: **2424**
- Med mindst én scoret kategori: **2326**
- Med mindst ét spillerfelt: **2416**
- Med eksplicit no-play-/walkovertekst: **360**
- No-result men kategorier: **1**
- No-result uden kategorier: **135**

Parseren arbejder kun på gemt dynamisk browsertekst. Den bruger kategorioverskrifter, blank/tab-separatoren mellem hjemme- og udeholdets spillere og scorelinjer efter kategorien. En kategori uden scores bevares som spilleropstilling uden kampresultat. Rapporten er en dry-run; ingen SQLite-rækker ændres.

- Kategorier med 0-0-sæt: **8**
- Kategorier med rå resultatmarkør (fx K/V/G/D): **309**
- Golden Set-kategorier: **138**
