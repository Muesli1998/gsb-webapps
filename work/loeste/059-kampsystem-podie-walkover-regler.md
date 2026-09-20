# Opgave 059 — test podie- og walkover-reglerne (Dream Team-siden af produktionen)

**Trin:** Kampsystem-testsuiten, men OBS: denne opgave tester
`apps/netlify-prod/netlify/functions/stilling.js`s `erPodieBerettiget` og
`hent-resultater.js`s `erWalkover` — det er Dream Team/Stilling-logik,
ikke selve Kampsystemets ELO/rundefordeling, og har ingen kendt
modsvarighed i `kampsystem/kampsystem_source.html`.

**Gren:** `opgave-059-podie-walkover-regler`, jf. AGENTS.md.

**Baggrund:** Chris har bedt om at ALT Kampsystem-relateret test rettes
mod preview-kilden fremfor produktionen, fordi Kampsystemets
rundefordelings-/ELO-kode er divergeret så meget at produktionen ikke er
sammenlignelig længere. Podie/walkover-reglerne hører imidlertid til
Dream Team-siden (B5-featuren), som IKKE er en del af den divergens —
der findes ingen preview-kilde-udgave af `stilling.js`/`hent-resultater.js`
at teste imod i stedet. **Er den antagelse forkert (fx findes der en
tilsvarende, egen preview-kilde for Dream Team/Stilling et andet sted),
stop og spørg under Spørgsmål før du går videre.**

Dette er stadig read-only test af produktionskode, samme regel som
opgave 054: ingen ændringer i `apps/netlify-prod/` under nogen
omstændigheder.

## Mål

`erPodieBerettiget` og `erWalkover` har automatiserede tests, baseret på
RIGTIGE eksempeltekster fra `resultater_2526.csv`/`resultater_2425.json`
— ikke opdigtede.

**Scenarier (som minimum):**

1. De konkrete betalings-tekster der reelt forekommer i
   Tilmeldinger-kolonnen (fx "Ja", "Betalt", blank, "Gratis", "Nej") og
   deres forventede sandt/falsk-udfald ifølge den dokumenterede regel i
   `docs/planlagte-features-spec.md`s B5-afsnit (case-insensitivt,
   blank = podie-berettiget som standard).
2. De konkrete navnetekster/mønstre i rå kampdata der udløser
   `erWalkover`, hentet direkte fra faktiske forekomster i
   `resultater_2526.csv`/`resultater_2425.json` — ikke opfundne
   eksempler.

## Afgrænsning

**Må røres:** `tools/tests/kampsystem/` (eller en mere passende sti hvis
du vurderer disse to funktioner hører bedre hjemme et andet sted, fx en
`tools/tests/dreamteam/`-mappe — begrund kort i resultatnoten hvis du
afviger fra `kampsystem/`), tilhørende resultatfilpar.

**Må ikke røres:** `apps/netlify-prod/` (kun læses/testes, under INGEN
omstændigheder rettes — samme hårde regel som opgave 054),
`kampsystem/`-mappen (ikke relevant for denne opgave).

## Kontrol

**Målet:**

```
node --test tools/tests/kampsystem/
```

Konkret X/Y/Z-tal for begge funktioners scenarier.

**Værnet:**

```
git status --short apps/netlify-prod/
```

Skal være tom.

## Ved tvivl

Er `behandlKampData` i `hent-resultater.js` ikke eksporteret via
`module.exports`, og du er i tvivl om at tilføje en ren
eksport-tilføjelse (ingen adfærdsændring) er inden for denne opgaves
afgrænsning eller ej — stop og spørg, gæt ikke. Brug i så fald hellere
samme `vm`-udtræksteknik som opgave 054/055 til at teste den uden at
røre filen.

## Spørgsmål

`kampsystem/resultater_2526.csv` har kolonnerne Runde, Hold, Kategori,
Hjemme, Ude, Sæt 1–3, Vinder og point — ingen Betaling-kolonne.
`kampsystem/resultater_2425.json` er tilsvarende rå kampdata uden
betalingsfelter. Jeg kan derfor ikke hente de krævede faktiske forekomster
af `Ja`, `Betalt`, blank, `Gratis` og `Nej` fra de to angivne kilder uden at
opfinde eksempler eller bruge en anden datakilde. Hvor ligger den faktiske
Tilmeldinger-eksport med betalingskolonnen, eller skal kortet ændres til at
teste de dokumenterede regelværdier i `docs/planlagte-features-spec.md`
i stedet?

Afklaret 2026-09-20: Der kan ikke fremskaffes en historisk
Tilmeldinger-eksport med verificerbare MobilePay-kilder. Testen bruger
derfor de dokumenterede betalingsværdier fra B5-specifikationen, mens
walkover-teksterne stadig udtrækkes direkte fra de rå kampdata.

## Resultatnote

Metode: Der er tilføjet `tools/tests/kampsystem/podie-walkover.test.cjs`.
Testen læser `erPodieBerettiget` fra `apps/netlify-prod/netlify/functions/stilling.js`
og `erWalkover` fra `apps/netlify-prod/netlify/functions/hent-resultater.js`
read-only via VM-udtræk. Ingen produktionsfil er ændret.

Der findes ingen separat preview-udgave af disse Dream Team/Stilling-
funktioner: `kampsystem/stilling_source.html` er en historisk stillingsside,
men indeholder ikke funktionerne. Derfor er produktionskilden den relevante
testkilde for dette kort.

Betaling: Da der ikke findes betalingsfelter i
`kampsystem/resultater_2526.csv` eller `kampsystem/resultater_2425.json`,
bruges B5-specifikationens dokumenterede værdier som testcases — ikke som
påståede historiske MobilePay-forekomster. De 9 cases var blank, whitespace,
`Ja`/`ja`, `Betalt`/`BETALT`, `Gratis`, `Nej` og `Afventer`.

Walkover: Testen udtrak 4 unikke faktiske tekstvarianter fra de rå data:
`(Ikke fremmødt)`, `Ikke fremmødt`, `Ikke fremmødt / Ida Steen Mahler` og
`Ikke fremmødt / Ikke fremmødt`. Den kontrollerede også 5 faktiske almindelige
navnetekster som negative cases.

Direkte kommando:

```text
node tools/tests/kampsystem/podie-walkover.test.cjs
```

Resultat:
`Podie: 9/9 bestået, 0 fejlet`
`Walkover: 9/9 bestået, 0 fejlet`

Den foreskrevne katalogkontrol blev kørt:

```text
node --test tools/tests/kampsystem/
```

Resultat: Node test runner fejlede før testkørsel med Windows-fejlen
`Error: spawn EPERM` (`tests 1, pass 0, fail 1`). Den direkte Node-kørsel
ovenfor er derfor den anvendte kontrol.

Værn:
`git status --short apps/netlify-prod/` var tom. Der er ikke skrevet til
databaser eller ændret i `kampsystem/`.
