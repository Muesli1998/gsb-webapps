# Klubstatistik Preview

Dette er den lokale Preview af Klubstatistik. Den må ikke kopieres til
`apps/netlify-prod/` som en del af denne opgave.

## Kør lokalt

1. Opret `config.local.json` i repo-roden ud fra `config.example.json` og
   sæt `gsbData` til den lokale Dropbox-projektrod.
2. Kør fra denne mappe:

   ```powershell
   python server.py
   ```

3. Åbn <http://127.0.0.1:8761/klubstatistik.html>.

Serveren læser databasen read-only og leverer ét samlet JSON-datasæt fra
`/api/data`. Filtrering af aldersgruppe, undergruppe og sæson sker i
browserens in-memory-datasæt; klik på faner eller filtre laver ikke nye
database- eller netværkskald.

Når Preview senere skal kobles på Netlify, skal `server.py` erstattes af en
godkendt host-/funktionsløsning. Den ændring hører til et separat kort.
