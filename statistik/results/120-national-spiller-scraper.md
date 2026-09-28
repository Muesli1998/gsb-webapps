# Opgave 120 — driftslog og pilotbeslutninger

Dette er en løbende driftslog for den første nationale scraper-etape. Den separate database `statistik/data/national-spillere.db` er den eneste database, der skrives til. `gsb-statistik-normalized.db` og `liga-landskab.db` er read-only.

## Beslutninger undervejs

- Første afprøvning var sekventiel med én Playwright-side. Det fulgte kortets oprindelige én-side-ad-gangen-regel, men gav for lav gennemløbshastighed til hele populationen.
- Efter Christoffers udtrykkelige tilladelse blev parallelitet afprøvet med disjunkte indeksintervaller, én separat browserprofil pr. proces og samme render-gate i hver proces.
- Render-gaten kræver kamp-ID på den renderede side og en synlig linje begyndende med `Resultat`. Timeout var 5 sekunder; pause mellem sider var 100 ms.
- Tre-processers pilot: 2.122 forsøg; 2.029 OK/no-player-links og 3 render-gate-fejl pr. proces samlet 3; målt samlet takt ca. 326 kamp-ID/minut.
- Ti-processers pilot: 1.425 forsøg, 1.315 OK, 100 uden spillerlinks og 10 render-gate-fejl; målt takt ca. 360 kamp-ID/minut. Det var kun ca. 10,5 % hurtigere end tre processer og gav proportionalt flere gate-fejl.
- Fem-processers pilot: 2.256 forsøg, 1.947 OK, 303 uden spillerlinks og 6 render-gate-fejl; målt takt ca. 360 kamp-ID/minut. Det var under 15 % hurtigere end tre processer, så de to ekstra processer blev stoppet efter brugerens regel.
- Den natlige kørsel fortsætter derfor med tre processer (`final01`–`final03`) og genoptagelige checkpoints. Allerede registrerede kamp-ID’er springes over.

## Pilotstatus

De tre aktive processer bruger hver sin profil (`.browser-state-final01`–`03`) og hver sit interval i den fulde liste. Logfilerne ligger i `statistik/results/120-national-spiller-scraper/final01.log`–`final03.log`. Processerne har 12 timers øvre tidsgrænse, men afslutter tidligere når deres interval er tømt.

## Kontrolprincip

`render_gate_failed` og `no_player_links` er gemte, adskilte statusser; de skjules ikke som succes. Fetch-fejl og SQLite-låse skal overvåges særskilt. En senere genkørsel kan bruge samme intervaller og profiler; `scrape_progress` gør den genoptagelig.

## Render-gate-diagnose og pause

Ved statuskontrol viste de seneste 100 forsøg pr. proces `render_gate_failed`. Et isoleret kald til kamp 235818 med 15 sekunders ventetid viste HTTP 200, korrekt kamp-ID og `Resultat 4-2`; 5 sekunder var derfor for kort ved den aktuelle svartid. Scriptet er rettet til 15 sekunders standard-timeout og kan genforsøge eksisterende `render_gate_failed`-rækker med `RETRY_RENDER_GATE=1`. Efter genforsøget faldt den aktive fejlstatus til 5 rækker. Kørslen blev derefter pauset efter brugerens besked.

Checkpoint ved pause: 113.926 rækker, heraf 99.492 `ok`, 14.429 `no_player_links` og 5 `render_gate_failed`; 62.105 spillere og 2.013.460 spiller-kamprelationer. Ingen proces kører nu.

## Ikke-eksisterende kampnumre

Nogle sider viser eksplicit teksten “kampnummer findes ikke”. De behandles som et forventet, dokumenteret ikke-fundet-udfald: kamp-ID’et bliver stående i status/loggen, og serien fortsætter til næste ID. Et isoleret kontrolkald for kamp `513382` bekræftede denne tekst. Det er ikke en grund til at stoppe hele kørslen.

## Hurtig håndtering af manglende kampnumre

Render-gaten blev udvidet til også at slippe igennem straks, når den renderede side indeholder “kampnummer findes ikke”. Det registreres fortsat som en ikke-fundet/gate-fejl, men venter ikke længere 15 sekunder. Et kontroludsnit af `finish03b` viser ca. 0,6 sekunder pr. sådan ID mod 15 sekunders timeout.

## Endelig første kørsel

Alle 203.012 distinkte kamp-ID’er fra `liga-landskab.db` er nu forsøgt via den renderede browser-rute. Den endelige status i `national-spillere.db` er:

- 164.569 `ok`
- 38.397 `no_player_links`
- 46 `render_gate_failed`
- 0 `fetch_error`
- 76.169 distinkte spillere
- 3.400.576 spiller-kamprelationer

De 46 resterende gate-ID’er er: `61631, 513381, 513382, 513383, 515418, 517041, 517042, 517044, 517045, 517046, 517047, 517048, 517049, 517050, 517051, 517053, 517054, 517378, 517379, 517380, 517381, 517382, 517383, 517384, 517385, 517386, 517387, 517388, 517389, 517390, 517391, 517392, 517393, 517394, 517395, 517396, 517397, 517398, 517399, 517400, 517401, 518270, 518369, 518375, 518386, 518389`.

De gemmes separat i `scrape_progress`/`matches` og kan genkøres senere. Beskyttede databaser `gsb-statistik-normalized.db` og `liga-landskab.db` blev kun læst.

## Afslutning af render-gate-listen

De 46 tidligere `render_gate_failed`-rækker blev genkørt med tidlig genkendelse af “kampnummer findes ikke”. Alle 46 viste den tekst og er nu klassificeret som `match_not_found`. Den endelige status er derfor 164.569 `ok`, 38.397 `no_player_links`, 46 `match_not_found` og 0 `render_gate_failed`/`fetch_error`.

## Afsluttende værn

Aktuelle SHA-256-kontroller efter kørslen: `gsb-statistik-normalized.db` = `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; `liga-landskab.db` = `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`. Begge filer har uændrede, historiske modificationstider og blev kun åbnet read-only af scraperen.
