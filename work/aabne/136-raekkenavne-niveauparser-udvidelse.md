# Opgave 136 — udvidelse af rækkenavn- og niveauparseren

**Trin:** ⚠ Afventer Christoffers gennemgang af de seks forslag, før den køres. Codex må ikke starte, før hvert forslag er markeret "godkendt" eller "afvist" nedenfor.

## Baggrund
129 lod 1.045 af 1.986 forskellige rækkenavne stå uden tolkning (3.536 poster). Seks forslag er udsat til gennemgang.

## Forslag til gennemgang (Christoffer markerer)
| # | Forslag | Beslutning |
|---|---------|-----------|
| 1 | Rækkenavn kun med tal: niveau = tallet, sorteret inden for format + alder uden bogstav | ☐ |
| 2 | Forkortelser: CD, MA, AB tolkes som kombinationsniveauer | ☐ |
| 3 | "1./2./3. serie" tolkes som niveau 1, 2, 3 | ☐ |
| 4 | 4+3 og U11 4+2 har ikke noget niveau (rene klubhold, ingen øvre point) | ☐ |
| 5 | X1–X3, Dx, BD: forklares først, når Christoffer har sagt, hvad de betyder | ☐ |
| 6 | Begynderdage og "Årets U11 Hold" lægges på separate lister, ikke i placering/bredde | ☐ |

## Mål (når beslutningerne foreligger)
1. Nyt script `statistik/scripts/136-raekkenavn-parser.mjs`, der kun implementerer de godkendte forslag. 129-parseren røres ikke.
2. Skriv `statistik/results/136-parser-effekt.md/.json`: antal forskellige rækkenavne og poster, der nu kan tolkes, pr. forslag, og hvad der stadig ikke kan.
3. Hver nytolket række får `tolkning_regel` (hvilket forslag der gjorde det), så ingen tolkning er anonym.
4. Format- og niveauhierarki fastholdes: 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger; niveau E > M > A > B > C > C-D > D, tal faldende. UGE 38 er særskilt turnering (2+2 med DMU-plads) og indgår ikke i placering/bredde.

## Afgrænsning
- Ingen ændring af 127/129-filer eller databaser.
- Pointskalaer oversættes ikke til bogstaver (jf. 137).
- Afviste forslag implementeres ikke, heller ikke "for en sikkerheds skyld".

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
