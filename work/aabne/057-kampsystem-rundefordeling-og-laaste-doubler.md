# Opgave 057 — test rundefordelingens rene funktioner og låste doubler

**Trin:** Kampsystem (kvalitetstest af eksisterende logik)

**Gren:** `opgave-057-kampsystem-rundefordeling-laaste-doubler`, jf.
AGENTS.md.

**Baggrund:** Dækker `pairSingles`, `formTeams`, `matchTeams`,
`matchKey`, `fallbackRating`, `wrapForRound` samt låsemekanismen
(`resolveLockedMatches`/`tilfoejLaastKamp` eller den faktiske navngivning
i preview-kilden — bekræft ved kortlægning, gæt ikke). Chris har bedt
specifikt om test af låste doubler, ikke kun låste single-kampe.

## Mål

De rene rundefordelingsfunktioner og lås-mekanismen har automatiserede
tests med et konkret bestået/fejlet-tal.

**Scenarier, rundefordeling (som minimum):**

1. Lige/ulige antal spillere → korrekt antal kampe + korrekt antal
   "sidder over".
2. 0 spillere, 1 spiller — grænsetilfælde.
3. Stort felt (40+ spillere) — ingen dubletter, ingen udeladte.
4. "Ens" vs. "blandet" holdfilosofi giver hver for sig internt
   konsistente resultater.
5. Gentagelses-undgåelse: en kamp identisk med sidste runde swappes; to
   identiske kampe i træk forsøges begge swappet uden at introducere en
   ny dublet et andet sted — den kendte, dokumenterede begrænsning skal
   gøres eksplicit med en test der VISER den, ikke skjuler den.
6. Spillere med flere valgte kategorier (single/double/mix) fordeles til
   den mindst fyldte pulje — test at fordelingen faktisk bliver mere
   jævn, ikke bare at koden kører uden fejl.

**Scenarier, låste doubler (nye, ikke tidligere testet):**

7. Lås en double-kamp manuelt (4 navngivne spillere) — bekræft den
   kommer uændret med i den endelige runde, uanset hvad
   auto-algoritmen ville have foreslået.
8. Lås en kamp hvor én af de 4 spillere ikke er markeret "til stede" —
   skal afvises/give en fejlbesked, ikke stille inkludere en fraværende
   spiller.
9. Lås to kampe der deler mindst én spiller blandt deres i alt 8 navne
   — skal afvises ved oprettelse (den eksisterende
   Set-størrelse-kontrol, som allerede er bekræftet for single, skal
   testes eksplicit for double, hvor sættet har 4 navne pr. kamp i
   stedet for 2).
10. Lås én double-kamp og lad resten af det tilgængelige felt være for
    tyndt til at fylde puljerne op omkring den — skal håndteres uden
    crash (færre auto-kampe er acceptabelt, en uhåndteret undtagelse er
    ikke).

**Åbent spørgsmål der skal afklares ved kortlægning, ikke gættes:** er en
låst kamp kun bindende for den ene runde den blev oprettet i, eller
forbliver den låst til den fjernes manuelt igen? Læs koden grundigt.
Findes svaret ikke utvetydigt i koden, stop og skriv det under
Spørgsmål — byg ikke en test der antager et facit koden ikke selv hævder.

## Afgrænsning

**Må røres:** `tools/tests/kampsystem/` (ny testfil, fx
`rundefordeling-laaste-doubler.test.cjs`), tilhørende resultatfilpar.

**Må ikke røres:** `apps/netlify-prod/`, `kampsystem/kampsystem_source.html`
(kun læses/testes).

## Kontrol

**Målet:**

```
node --test tools/tests/kampsystem/
```

Konkret X/Y/Z-tal for alle 10 scenarier, med fulde fejlbeskeder ved fejl.

**Værnet:**

```
git status --short kampsystem/ apps/netlify-prod/
```

Skal være tom.

## Ved tvivl

Maks. 2 forsøg pr. scenarie på at få en test til at afspejle koden
korrekt. Lykkes det ikke tredje gang, stop og skriv scenariet under
Spørgsmål med hvad du har prøvet — byg ikke en tredje, mere kreativ
tilgang på egen hånd.

## Spørgsmål

## Resultatnote

Metode: Der er tilføjet `tools/tests/kampsystem/rundefordeling-laaste-doubler.test.cjs`.
Testen indlæser og evaluerer den inline JavaScript-kilde fra
`kampsystem/kampsystem_source.html` read-only i en VM. Kortlægningen viste, at
preview-kilden bruger `pairSingles`, `formTeams`, `formTeamsMixed`,
`reducerGentagelse`, `kaonsbevidstFordeling`, `fordelTilDoubleOgMixed`,
`effektivRating`, `tilfoejLaastKamp`, `reserverLaasteKampe` og `genererRunde`.
De i kortets baggrund nævnte navne `matchKey`, `fallbackRating` og
`wrapForRound` findes ikke i denne kilde; fallback-logikken ligger i
`effektivRating`.

Direkte kommando:

```text
node tools/tests/kampsystem/rundefordeling-laaste-doubler.test.cjs
```

Resultat: `Rundefordeling/låste doubler: 8 bestået, 2 fejlet`.

De to fejl er:

1. Scenarie 8, input: fire navngivne spillere i en låst double, hvor `B2`
   har `tilstede=false`. Forventet: `B2` afvises og er ikke i den genererede
   runde. Faktisk: `B2` er med i den låste kamp (`true !== false`).
2. Scenarie 9, input: først låses `A1+A2` mod `B1+B2`, derefter
   `B1+C1` mod `C2+D1`. Forventet: anden lås afvises på overlap. Faktisk:
   begge låse accepteres (`2 !== 1`).

Scenarie 5 målte gentagelsesomkostningen før/efter og bekræftede, at den
konkrete swap reducerede omkostningen og bevarede fire unikke spillere.
Scenarie 10 bekræftede, at et tyndt felt omkring én låst double ikke giver
exception. Låsen blev bevaret i den genererede runde.

Det åbne spørgsmål er afklaret i koden: `lockedMatches` lever på modulniveau
og ændres kun af `tilfoejLaastKamp` og `fjernLaastKamp`; en lås er derfor
bindende på efterfølgende genereringer, indtil den fjernes manuelt.

Den foreskrevne katalogkontrol blev også kørt:

```text
node --test tools/tests/kampsystem/
```

Resultat: kontrolrunneren fejlede før testkørsel med Windows-fejlen
`Error: spawn EPERM` fra Node test runner (`tests 1, pass 0, fail 1`). Den
direkte Node-kørsel ovenfor er den anvendte testkørsel og gav de konkrete
8/10- og 2/10-tal.

Værn:
`git status --short kampsystem/ apps/netlify-prod/` var tom; ingen filer i
de beskyttede områder er ændret. Der er heller ikke skrevet til databaser.
