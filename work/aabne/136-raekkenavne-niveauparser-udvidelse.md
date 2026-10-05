# Opgave 136 — udvidelse af rækkenavn- og niveauparseren

**Trin:** Klar til kørsel (Christoffer har gennemgået forslagene 2026-10-05). Forslag 1, 2, 3 og 6 er godkendt. Forslag 4 er endnu ikke besluttet og **implementeres ikke**. Forslag 5 er ikke en implementering, men en **undersøgelse**.

## Baggrund
129 lod 1.045 af 1.986 forskellige rækkenavne stå uden tolkning (3.536 poster). Seks forslag er udsat til gennemgang.

## Forslag til gennemgang (Christoffer markerer)
| # | Forslag | Beslutning |
|---|---------|-----------|
| 1 | Rækkenavn kun med tal: niveau = tallet, sorteret inden for format + alder uden bogstav | ☑ godkendt |
| 2 | Forkortelser: CD, MA, AB tolkes som kombinationsniveauer | ☑ godkendt |
| 3 | "1./2./3. serie" tolkes som niveau 1, 2, 3 | ☑ godkendt |
| 4 | 4+3 og U11 4+2 har ikke noget niveau (rene klubhold, ingen øvre point) | ⏸ ikke besluttet (Christoffer forstod ikke forslaget; se forklaring nedenfor). Implementeres ikke. |
| 5 | X1–X3, Dx, BD: forklares først, når Christoffer har sagt, hvad de betyder | 🔍 skal undersøges (se Mål punkt 3). Ingen tolkning implementeres. |
| 6 | Begynderdage og "Årets U11 Hold" lægges på separate lister, ikke i placering/bredde | ☑ godkendt |

## Forslag 4 forklaret (til Christoffers senere beslutning)
I de rækkenavne vi har set, mangler formatet 4+3 og U11 4+2 et niveau (A, B, C eller et tal). Spørgsmålet er, om det er fordi niveauet er udeladt i navnet, eller fordi de formater slet ikke har niveauer (fordi rene klubhold ikke har øvre pointgrænse). Parseren skal derfor enten (a) give dem "intet niveau, det er normalt" eller (b) give dem "niveau mangler, uforklaret". I dag er de uforklarede. Codex må ikke vælge; den skal i stedet tælle, hvor mange poster det drejer sig om, og vise 20 eksempler pr. format, så Christoffer kan se det.

## Mål
1. Nyt script `statistik/scripts/136-raekkenavn-parser.mjs`, der kun implementerer de godkendte forslag (1, 2, 3 og 6). 129-parseren røres ikke.
2. Skriv `statistik/results/136-parser-effekt.md/.json`: antal forskellige rækkenavne og poster, der nu kan tolkes, pr. forslag, og hvad der stadig ikke kan.
3. Undersøgelse af forslag 5 (X1–X3, Dx, BD): find alle rækkenavne med disse mønstre, tæl poster pr. mønster og pr. sæson/region/alder, vis 10 eksempler pr. mønster, og søg i reglementsarkivet (`statistik/kilder/reglementer/`, register og tekst) efter en forklaring. Skriv hvad der er belagt, og hvad der er gæt. Implementér ingen tolkning. Resultatet gemmes i `statistik/results/136-x-dx-bd-undersoegelse.md`.
4. Tæl forslag 4 som beskrevet ovenfor og skriv det i `136-parser-effekt.md`.
5. Hver nytolket række får `tolkning_regel` (hvilket forslag der gjorde det), så ingen tolkning er anonym.
6. Format- og niveauhierarki fastholdes: 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger; niveau E > M > A > B > C > C-D > D, tal faldende. UGE 38 er særskilt turnering (2+2 med DMU-plads) og indgår ikke i placering/bredde.

## Afgrænsning
- Ingen ændring af 127/129-filer eller databaser.
- Pointskalaer oversættes ikke til bogstaver (jf. 137).
- Forslag 4 og 5 implementeres ikke, heller ikke "for en sikkerheds skyld".

## Kontrol
- **Målet:** hver tolkning peger på et godkendt forslag.
- **Værnet:** databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `readOnly: true`, `git diff --check` uden fejl.
- **Skøn:** stikprøve på 25 nytolkede navne, mindst 3 pr. forslag.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/136-raekkenavn-parser`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, rører ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
