# Opgave 116 — findes spiller-ID-mekanismen også på nationale holdkampsider?

## Baggrund

`statistik/data/gsb-statistik-normalized.db` kobler spillere til kampe via et vedvarende
BadmintonPlayer-ID, udtrukket fra links af formen
`https://badmintonplayer.dk/DBF/Spiller/VisSpiller/#<id>,<sæson>` på kampsiderne (se
`statistik/scripts/extract-individual-browser.mjs` og `extract-all-verified-individual.mjs`,
som henter `a[href*="/DBF/Spiller/VisSpiller/"]` og udtrækker id'et fra href-fragmentet).
Dette ID er stabilt over tid — det er derfor gamle kampe (fx fra 2014) viser en spillers
NUVÆRENDE registrerede navn, ikke navnet som det var dengang: siden gemmer ikke navnet
statisk pr. kamp, kun ID'et, og renderer altid det aktuelt registrerede navn for det ID.

Denne mekanisme er kun udnyttet for GSB's egne kampe (`gsb-statistik-normalized.db`).
`liga-landskab.db` — som dækker HELE landet med `external_match_id` for hver kamp i alle
regioner og sæsoner — gemmer slet ikke spillernavne eller -ID'er, fordi det projekt blev
bygget til liga-struktur (puljer, resultater, kategorier), ikke spillerdata.

Opgave 114 forsøgte at bruge `gsb-statistik-normalized.db` til at verificere faktisk
spillerantal for specifikke efterskolepuljer, men fandt at databasen slet ikke dækker de
relevante kamp-ID'er (kun GSB's egne 2818 kampe er med). Det rejste spørgsmålet om det
overhovedet er teknisk muligt at bygge en tilsvarende, landsdækkende spillerkobling.

## Mål

Undersøg — uden at bygge en fuld scraper — om den samme spiller-ID-mekanisme
(`/DBF/Spiller/VisSpiller/#id`) er til stede på de nationale holdkampsider, dvs. for kampe
UDENFOR GSB, som `liga-landskab.db` allerede har `external_match_id` for.

1. Vælg en lille, spredt stikprøve af `external_match_id`'er fra `liga-landskab.db` — gerne
   fra flere regioner, aldersgrupper og sæsoner, inklusive nogle af de
   efterskolekamp-ID'er der allerede er identificeret i opgave 114's rapport
   (`statistik/results/114-spilleformats-opstillingskrav-verificering.md`).
2. Hent (read-only, én side ad gangen, ingen masse-scraping) den tilsvarende kampside på
   badmintonplayer.dk for hver valgt `external_match_id`, og tjek om siden indeholder
   spillerlinks af samme type (`/DBF/Spiller/VisSpiller/#id`) som GSB-scraperen allerede
   udnytter.
3. Rapportér eksplicit for hver stikprøve: findes spillerlinkene, og kan et stabilt
   spiller-ID udtrækkes på samme måde som for GSB?
4. Hvis mekanismen findes nationalt: vurder groft omfanget af en fremtidig national
   spiller-scraper (hvor mange kamp-ID'er findes i `liga-landskab.db` i alt, som et
   størrelsesestimat — ikke en fuld plan for implementering her).
5. Hvis mekanismen IKKE findes for nogle kamptyper (fx ældre sæsoner, visse regioner):
   dokumentér hvilke, så en fremtidig scraper ved hvilken dækning der realistisk kan
   opnås.

## Afgrænsning

- Byg IKKE en scraper eller datapipeline i denne opgave — kun en undersøgelse af om
  mekanismen findes og i givet fald dens omfang.
- Skriv IKKE til `statistik/data/*.db`.
- Denne opgave besvarer kun "kan det lade sig gøre, og i hvilket omfang" — selve
  implementeringen af en national spillerkobling er en senere, større opgave.

## Kontekst

- `statistik/scripts/extract-individual-browser.mjs`, `extract-all-verified-individual.mjs`
  (eksisterende GSB-mekanisme, genbrug samme udtræksmetode)
- `statistik/data/liga-landskab.db` (kilde til nationale `external_match_id`'er)
- `statistik/results/114-spilleformats-opstillingskrav-verificering.md` (de konkrete
  efterskole-kamp-ID'er der udløste spørgsmålet)
- `statistik/results/016-spiller-id-audit.md` (GSB's egen ID-dækning: 85,2% af 67.196
  relationer har eksternt ID — brug som sammenligningsgrundlag)

## Kontrol

- Alle konklusioner om dækning skal være baseret på faktiske sideopslag, ikke antagelser.
- Marker eksplicit alt der forbliver ubekræftet, jf. statistik/AGENTS.md's "Aldrig gæt".
- Respektér render-gaten fra statistik/AGENTS.md hvis der hentes sider via browser.

## Ved tvivl

Spørg i resultatnoten frem for at antage at mekanismen er ens for alle regioner/perioder —
den er kun bekræftet for GSB's egne kampe indtil nu.

## Gren

arbejde/116-national-spiller-id-mekanisme

## Spørgsmål

(udfyldes hvis noget er uklart under arbejdet)

## Resultatnote

### Kontroloutput

- 9 nationale kampsider blev åbnet én ad gangen med render-gaten fra `statistik/AGENTS.md`.
- 9/9 bestod gaten (forventet kamp-ID i body-teksten og en `Resultat`-linje).
- 8/9 havde `a[href*="/DBF/Spiller/VisSpiller/"]`-links med numeriske ID-fragmenter, der kunne deduplikeres og udtrækkes med samme metode som GSB-scraperen.
- 1/9 (kamp 3757, BADBORN U11, sæson 2011) havde 0 spillerlinks trods korrekt gengivet resultat.
- `liga-landskab.db` indeholder 203.012 distinkte `external_match_id`-værdier.

### Hvad blev gjort

Der blev undersøgt en spredt prøve på tværs af 2010-2026, senior, U09/U11/U15/U17-U19, region 1/2/3/5/8 samt tre efterskole-/DGI-kampe fra opgave 114. Rapporten og JSON-resultatet ligger i `statistik/results/116-national-spiller-id-mekanisme.md` og `.json`.

Fundet er, at mekanismen findes uden for GSB i både senior-, ungdoms-, regionale og efterskolekampe: 8 af 9 sider havde stabile spillerprofil-ID'er. Kamp 3757 dokumenterer samtidig, at ældre ungdomssider kan mangle links helt; dette er en reel, men ikke generaliseret, dækningsbegrænsning.

### Hvad blev fravalgt og hvorfor

Der blev ikke bygget scraper/pipeline, ikke skrevet til databaser og ikke lavet masseindsamling. 203.012 er et størrelsesestimat for fremtidig side-for-side behandling, ikke et løfte om fuld spillerlink-dækning. Den ene negative prøve kan ikke bruges til at konkludere at alle ældre ungdomskampe mangler links.

### Commits

`5e3e2e6` — rapport og kort arkiveret på `arbejde/116-national-spiller-id-mekanisme`.
