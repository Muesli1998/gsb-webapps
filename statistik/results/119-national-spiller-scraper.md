# Opgave 119 — national spiller-scraper (første delmængde)

Dato: 2026-09-27. Scraperen blev kørt med den eksisterende Playwright-persistent-browserprofil, én kampside ad gangen. Udvalget var bevidst begrænset til 12 kamp-ID’er på tværs af 2010-2026, regioner 1/2/3/5/8, senior, U09/U11/U15/U17-U19 samt tre efterskole-/DGI-eksempler fra opgave 114.

## Kontroloutput

| Måling | Faktisk tal |
|---|---:|
| Forsøgte kampe | 12 |
| Render-gate bestået | 12 |
| Fetch/render-fejl | 0 |
| Kampe med spillerlinks | 11 |
| Kampe uden spillerlinks | 1 (3757, 2011 U11 Bornholm) |
| Unikke spillere | 106 |
| Spiller-kamp-rækker | 173 |
| `gender_status = mand` | 8 |
| `gender_status = kvinde` | 6 |
| `gender_status = ikke afklaret` | 92 |
| `gender_status = aldrig spillet` | 0 |
| Felter med navn indeholdende point/rank i `players` | 0 |

Alle 12 sider indeholdt både det forventede kamp-ID og en linje der starter med `Resultat`. Kamp 3757 blev derfor gemt som en verificeret kamp uden spillerlinks; den blev ikke behandlet som scraperfejl.

## Skema og filer

Scriptet er [119-national-spiller-scraper.mjs](C:/Users/chril/Code/gsb-webapps/statistik/scripts/119-national-spiller-scraper.mjs). Det opretter den separate, read/write-fil `statistik/data/national-spillere.db` med tabellerne:

- `matches`: kampmetadata, URL, render-gate, resultat, runde, holdnavne, rå kontekst og fejlstatus.
- `players`: eksternt spiller-ID, aktuelt viste navn og kønsstatus.
- `player_matches`: spiller-kamp-kobling, disciplin, makker-/modstanderfelter, sætresultat-/walkover-/kontekstfelter og runde. Felter uden entydig parsning står `NULL`; der er ikke gættet.
- `scrape_errors`: én række pr. fejlende kamp.

Rå kampkontekst gemmes begrænset i `matches.context_raw` og `player_matches.context_raw`; der blev ikke skrevet til `gsb-statistik-normalized.db` eller `liga-landskab.db`.

Maskinrapporten ligger i [run-summary.json](C:/Users/chril/Code/gsb-webapps/statistik/results/119-national-spiller-scraper/run-summary.json).

## Kønskontrol

Kontroludtræk viste, at de afklarede værdier følger disciplin-koderne: Peter Høeg Gade (`HS`) → mand, Judith Meulendijks (`DD`) → kvinde, Mathias Boe (`HD`) → mand, Helle Buus Beck (`DD`) → kvinde samt yderligere verificerede HS/HD- og DS/DD-eksempler. De 92 “ikke afklaret” har kun generiske `S`/`D`-koder i den kørte prøve og er derfor ikke navneklassificeret.

`aldrig spillet` optrådte ikke i denne delmængde: scraperen opdager kun spiller-ID’er via en faktisk gengivet kampside, så et ID uden nogen kamp kan ikke opstå i denne første kørselsform. Statusværdien er stadig en del af skemaets eksplicitte kontrolmængde og er ikke brugt som gæt.

## Hvad blev ikke gjort

Der blev ikke kørt en national fuldindsamling af de 203.012 kamp-ID’er, ikke hentet ranglistepoint, ikke rekonstrueret historiske navne, og ingen UI blev bygget. Den næste udvidelse af delmængden kræver en ny beslutning.

## Værnekontrol

SHA-256 efter kørslen (de samme filer blev kun læst):

- `gsb-statistik-normalized.db`: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`
- `liga-landskab.db`: `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`

Begge filer beholdt deres eksisterende størrelse og modifikationstid.
