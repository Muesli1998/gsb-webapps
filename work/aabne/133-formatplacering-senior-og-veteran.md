# Opgave 133 — formatplacering og bredde for senior og veteran (som 127 for ungdom)

**Trin:** Samme metode som 127, men for senior og veteran. Kan køre uafhængigt af 131, men bør kende regelbogen, hvis den er merget.

## Baggrund
127 lavede format- og bredde-analysen for ungdom (formathierarki, GSB's placering, bredde = rækker i region 8 hvor GSB har mindst ét hold). Senior og veteran mangler tilsvarende. Scriptet er `statistik/scripts/127-youth-format-and-kbh-width.mjs`.

## Mål
1. Kopiér metoden fra 127 til et nyt script `statistik/scripts/133-senior-veteran-placering.mjs`. Ret ikke 127-scriptet.
2. For senior og veteran, pr. sæson: GSB's hold, række, placering og antal hold i rækken, samt bredde (rækker i Badminton København med mindst ét GSB-hold).
3. Rangér rækkerne efter niveau, hvor rækkenavnene tillader det. Hvor niveau ikke kan afgøres, så skriv "ikke fastlagt", ikke et gæt.
4. Skriv `statistik/results/133-senior-veteran-placering.json` og `.md` med de samme felter som 127, så artifacten kan bruge dem.
5. Liste over rækkenavne, der ikke kunne tolkes (som 129), med antal poster.

## Afgrænsning
- Hierarkiet for ungdomsformater (4+3 > 4+2 > …) gælder ikke for senior/veteran. Find rækkernes egen struktur (fx række 1–4, serier, Danmarksserie) i data og skriv antagelserne i resultatnoten.
- Ingen ændring af databaser eller af 127/129-filer.
- Ingen nye downloads.

## Kontrol
- **Målet:** alle sæsoner med GSB senior/veteran-hold er med; tal summerer til antal poster i databasen.
- **Værnet:** databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `readOnly: true`, `git diff --check` uden fejl.
- **Skøn:** stikprøve på 15 hold mod rå-data.

## Ved tvivl
Skriv i "Spørgsmål". Især hvis senior-struktur ikke svarer til 127's antagelser.

## Gren
`arbejde/133-senior-veteran-placering`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, rører ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
