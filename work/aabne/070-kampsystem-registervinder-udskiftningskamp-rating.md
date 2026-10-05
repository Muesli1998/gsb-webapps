# Opgave 070 — fix: `registerVinder` ændrer rating på en udskiftningskamp

**Trin:** Kampsystem (rettelse af fund fra opgave 056). Ligger i `work/future/`
med vilje — se `AGENTS.md`s prioritetsregel: statistik har førsteprioritet
indtil Prod Push, og dette er hverken data-tab, i-stykker-i-produktion eller
blokerende for statistik. Flyttes først til `work/aabne/` når Chris beslutter
det.

**Gren:** `arbejde/070-kampsystem-registervinder-udskiftningskamp-rating`,
jf. AGENTS.md.

**Baggrund:** Fundet under opgave 056 (test af `opdaterRating`/kategoriintegritet
i preview-kilden `kampsystem/kampsystem_source.html`), dokumenteret i
`work/loeste/056-kampsystem-elo-rating-kategoriintegritet.md`s resultatnote.

Preview-kildens faktiske funktion er `registerVinder` (opgave 056 fandt at de
i det oprindelige kort forventede navne `opdaterRating`/`expectedScore` ikke
findes — de faktiske funktioner er `registerVinder`, `forventetVind` og
`eloAendring`, omkring linje 646).

**Fundet fejl, ordret fra resultatnoten:** en `single`-kamp med
`m.udskiftning=true`, begge spillere rating 1500, side A vinder. Forventet:
ingen ratingændring for nogen. Faktisk: `registerVinder` ændrer A til 1535 og
B til 1465 — helt som en almindelig kamp. Testen der beviser dette
(`5 udskiftningskamp ingen ændring`) findes allerede i
`tools/tests/kampsystem/elo-runde.test.cjs` og fejler i dag med
`Expected values to be strictly equal: 1535 !== 1500`.

## Mål

`registerVinder` tjekker `m.udskiftning` (eller den kaldende kontekst gør det
før `registerVinder` kaldes — vælg selv, begrund i resultatnoten) og springer
al ratingændring over for alle deltagere, uanset resultat, når flaget er sat.
Kampen skal stadig registreres/vises som spillet — kun ratingdelen af
sideeffekten skal udelades.

## Afgrænsning

**Må røres:** `kampsystem/kampsystem_source.html` (kun `registerVinder` og,
hvis nødvendigt, det opkald der sender `m` videre til den — ikke andre
funktioner), `tools/tests/kampsystem/elo-runde.test.cjs` (kun hvis den
eksisterende test skal justeres for at ramme den rigtige kodesti — dens
FACIT, at ratingen skal være uændret, må ikke ændres).

**Må ikke røres:** `apps/netlify-prod/` (denne feature findes ikke der —
bekræft ved kortlægning at det stadig er tilfældet, skriv det i
resultatnoten hvis det har ændret sig), øvrige funktioner i
`kampsystem_source.html` (`forventetVind`, `eloAendring`, kategori-
integritets-logikken fra opgave 056 — de er allerede bekræftet korrekte og
må ikke regrediere).

## Kontrol

**Målet:**

```
node tools/tests/kampsystem/elo-runde.test.cjs
```

(direkte Node-kørsel — `node --test` gav `spawn EPERM` på Windows i opgave
056/057/058/060, brug samme direkte kørsel). Kategoriintegritetens 11
scenarier skal nu vise **11/11 bestået, 0 fejlet** (var 10/11), inkl.
scenarie 5. Skriv det konkrete tal i resultatnoten.

**Værnet:**

```
git status --short apps/netlify-prod/
```

Skal være tom. Derudover: de 13 oprindelige beregningstests i samme fil skal
stadig vise **13/13 bestået** — angiv det faktiske tal, ikke kun "stadig
bestået". Kategoriintegritetens øvrige 10 tidligere bestående scenarier
(mixed-kun-mix, double-kun-double, fallback-lækage, ratingKey-sanity osv.)
skal forblive bestående — angiv tallet for hele filen samlet.

## Ved tvivl

Er det uklart om tjekket for `m.udskiftning` hører bedst i `registerVinder`
selv eller i den kaldende kode (så `registerVinder` slet ikke bliver kaldt
for udskiftningskampe) — stop og spørg, gæt ikke. Begge kan i princippet
opfylde Målet, men de har forskellige konsekvenser for om andre kaldere af
`registerVinder` også skal opdateres.

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
