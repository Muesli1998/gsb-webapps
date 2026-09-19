# Opgave 056 — test ELO-ratingopdatering og mix/double-kategoriintegritet

**Trin:** Kampsystem (kvalitetstest af eksisterende logik)

**Gren:** `opgave-056-kampsystem-elo-kategoriintegritet`, jf. AGENTS.md.

**Baggrund:** Afhænger af opgave 055 (samme testfil/samme mål-fil,
`kampsystem/kampsystem_source.html`). `opdaterRating` er selve
penge-funktionen i Kampsystemet — den er ikke testet endnu. Chris har
desuden bedt specifikt om at få testet at en Mix-double-kamp ikke ved en
fejl kategoriseres/opdateres som en almindelig Double-kamp (eller
omvendt) — en stille sammenblanding af de to ratingfelter ville se ud som
om systemet virker, mens det reelt flytter point til/fra forkert kategori.

**Kontekst:** se `docs/kampsystem-testplan.md`s afsnit 1 og 3 for den
oprindelige funktionsliste og scenarie-udgangspunkt — brug den som
udgangspunkt, ikke som facit, da den blev skrevet mod produktionsfilen.

## Mål

`opdaterRating`, `expectedScore` og ratingKey-håndteringen omkring dem er
dækket af automatiserede tests i `tools/tests/kampsystem/`, med et
konkret bestået/fejlet-tal, og testene beviser konkret at mix- og
double-ratings aldrig blandes sammen.

**Scenarier der som minimum skal dækkes (udvid gerne, men disse er ikke
valgfrie):**

1. Lige ratings → forventet ~50/50, delta tæt på 0.
2. Klar favorit vinder → lille positiv delta til vinderen.
3. Klar underdog vinder ("upset") → stor positiv delta til vinderen.
4. Ekstreme ratingforskelle (fx 1000 vs. 2500) — ingen overflow/
   underflow, ingen urimelig delta.
5. Udskiftningskamp (`m.udskiftning=true`) → ingen ratingændring for
   nogen deltager, uanset resultat.
6. En eller flere deltagere uden rating i den spillede kategori
   (`_hasRating===false` el. tilsvarende i preview-kildens faktiske
   implementering) → ingen ratingændring, kampen registreres stadig.
7. Nulsumskonsistens: vinderens gevinst og taberens tab er eksakt
   hinandens modsatte, for alle tre ratingKeys (single/double/mix).
8. **Kategoriintegritet, mixed:** en mixed-kamp opdaterer KUN `mix` for
   alle 4 deltagere. Sæt `double` og `mix` til vidt forskellige
   starttal, kør en mixed-kamp, assert at `double` er uændret for alle
   4 deltagere.
9. **Kategoriintegritet, double:** en ren double-kamp opdaterer KUN
   `double`, aldrig `mix`, for alle 4 deltagere — samme opsætning,
   modsat retning.
10. **Fallback-lækage:** en spiller med en reel `double`-rating men
    `mix: null`, sat ind i en mixed-kamp — skal ramme den dokumenterede
    null-safe-fallback-regel (midlertidig effektiv rating KUN til
    parringen, ingen skrivning til noget rigtigt felt), IKKE stille
    bruge `double`-tallet som stedfortræder for `mix`. Bekræft ved at
    sætte `double` til en usædvanlig, let genkendelig værdi og assert
    at den værdi ikke dukker op i `mix` efter kampen.
11. Bekræft ratingKey-opslagstabellen (den der oversætter kamptype til
    hvilket felt der skal læses/skrives) bruges konsekvent alle de
    steder koden rent faktisk slår den op — en grep-baseret
    sanity-tjek er fint som supplement til de funktionelle tests, ikke
    en erstatning for dem.

## Afgrænsning

**Må røres:** `tools/tests/kampsystem/` (ny testfil, fx
`elo-kategoriintegritet.test.cjs`, eller en udvidelse af den
eksisterende hvis det giver bedre mening — vælg selv, begrund kort i
resultatnoten), et resultatfilpar under `work/loeste/`- eller
`statistik/results/`-lignende sti (vælg noget der matcher repoets øvrige
struktur og navngiv tydeligt).

**Må ikke røres:** `apps/netlify-prod/` (ikke relevant for denne
opgave — testes slet ikke), `kampsystem/kampsystem_source.html` (læses/
testes, rettes ikke, uanset hvad testene finder).

## Kontrol

**Målet:**

```
node --test tools/tests/kampsystem/
```

Skal vise et konkret X kørt / Y bestået / Z fejlet-tal for alle 11
scenarier ovenfor, med fulde fejlbeskeder for evt. fejlede tests.

**Værnet:**

```
git status --short kampsystem/ apps/netlify-prod/
```

Skal være tom.

## Ved tvivl

Finder du en reel bug (fx at `mix` og `double` faktisk blandes sammen et
sted) — dokumentér den præcist (fil, linje, input, forventet vs. faktisk
output) i resultatnoten. Ret den IKKE som en del af denne opgave; det er
Chris' beslutning hvornår og hvordan.

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst)*
