# GSB Badmintonresultater

Lille lokal webapp der viser badmintonresultater fra badmintonplayer.dk,
filtreret til Gladsaxe Søborg-kampe (hold med "Gladsaxe" eller "GSB" i navnet).

## Opsætning

1. Installer afhængigheder:

   ```
   pip install flask requests python-dotenv
   ```

2. Opret en `.env`-fil i denne mappe (kopi af `.env.example`) med din
   badmintonplayer.dk-login:

   ```
   BP_EMAIL=din@email.dk
   BP_PASSWORD=dit-kodeord
   ```

   Alternativt kan du sætte `BP_EMAIL` og `BP_PASSWORD` som almindelige
   miljøvariabler. `.env`-filen bliver ikke committet til git (den står i
   `.gitignore`).

## Kør appen

```
python app.py
```

Åbn derefter [http://localhost:5000](http://localhost:5000) i din browser.

Første sidevisning logger ind på badmintonplayer.dk og henter dine kampe -
det kan tage nogle sekunder. Resultatet gemmes i `data_cache.json`, så
efterfølgende sidevisninger er hurtige og ikke logger ind igen.

Klik på **"Opdater data"** (eller gå til `/opdater`) for at tvinge en frisk
hentning fra badmintonplayer.dk.

## Filer

- `app.py` - Flask-appen
- `templates/index.html` - forsidens layout
- `data_cache.json` - lokal cache af seneste hentede data (auto-genereret)
- `badmintonplayer_export.py` - det oprindelige CSV-eksportscript (uafhængigt af webappen)
