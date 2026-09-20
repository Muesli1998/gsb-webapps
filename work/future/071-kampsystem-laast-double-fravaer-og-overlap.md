# Opgave 071 — fix: låst double accepterer fraværende spiller og overlappende låse

**Trin:** Kampsystem (rettelse af fund fra opgave 057). Ligger i `work/future/`
med vilje, jf. AGENTS.md's prioritetsregel — flyttes først til
`work/aabne/` når Chris beslutter det.

**Gren:** `arbejde/071-kampsystem-laast-double-fravaer-og-overlap`, jf.
AGENTS.md.

**Baggrund:** Fundet under opgave 057 (test af rundefordeling og låste
doubler i preview-kilden), dokumenteret i
`work/loeste/057-kampsystem-rundefordeling-og-laaste-doubler.md`s
resultatnote. Preview-kildens faktiske funktion er `tilfoejLaastKamp`
(opgave 057 fandt at de forventede navne `resolveLockedMatches` ikke
findes). Den eksisterende Set-størrelse-overlapkontrol er allerede
bekræftet korrekt for single-lås (2 navne pr. kamp) — det er double-sagen
(4 navne pr. kamp) og fravær der er i stykker.

**To fund, ordret fra resultatnoten:**

1. **Fravær ignoreres.** Lås en double-kamp med fire navngivne spillere,
   hvor `B2` har `tilstede=false`. Forventet: `B2` afvises, kampen kan ikke
   låses som den er. Faktisk: `B2` er med i den låste kamp uændret
   (`true !== false` i testens assertion).
2. **Overlap mellem to låste doubler accepteres.** Lås først `A1+A2` mod
   `B1+B2`, lås derefter `B1+C1` mod `C2+D1` (deler `B1`). Forventet: den
   anden lås afvises pga. overlap. Faktisk: begge låse accepteres
   (`2 !== 1` i testens assertion).

Begge er allerede dækket af automatiserede tests i
`tools/tests/kampsystem/rundefordeling-laaste-doubler.test.cjs`, scenarie 8
og 9, som i dag fejler netop på disse to punkter (8/10 bestået, 2 fejlet).

## Mål

`tilfoejLaastKamp` afviser (med en fejlbesked, ikke en stille no-op eller en
exception) en låsning der:

- indeholder mindst én spiller med `tilstede=false`, og
- deler mindst én spiller med en allerede oprettet lås — for double gælder
  dette over alle 4 navne i den nye lås mod alle navne i eksisterende låse,
  ikke kun de første 2.

## Afgrænsning

**Må røres:** `kampsystem/kampsystem_source.html` (kun `tilfoejLaastKamp` og
den fælles overlap-/tilstedeværelseskontrol den kalder), test-filen kun til
at bekræfte fixet — testens FACIT for scenarie 8 og 9 må ikke ændres, kun
dens resultat (fra fejlet til bestået).

**Må ikke røres:** `apps/netlify-prod/` (ikke relevant), øvrige
rundefordelingsfunktioner (`pairSingles`, `formTeams`, `formTeamsMixed`,
`reducerGentagelse`, `kaonsbevidstFordeling`, `fordelTilDoubleOgMixed`,
`effektivRating`, `genererRunde`) — de er allerede bekræftet korrekte i
opgave 057 og må ikke regrediere. Rør ikke single-lås-stien hvis den
allerede er korrekt, uden at dokumentere hvorfor ændringen var nødvendig
der også.

## Kontrol

**Målet:**

```
node tools/tests/kampsystem/rundefordeling-laaste-doubler.test.cjs
```

Skal vise **10/10 bestået, 0 fejlet** (var 8/10). Angiv det faktiske tal i
resultatnoten, inkl. bekræftelse af at scenarie 8 (fravær) og scenarie 9
(overlap) begge nu består med deres oprindelige assertions.

**Værnet:**

```
git status --short apps/netlify-prod/
```

Skal være tom. Derudover: de øvrige 8 hidtil bestående scenarier (1-7, 10 —
rundefordeling, gentagelsesundgåelse, tyndt felt omkring en låst double
osv.) skal fortsat bestå uændret — angiv tallet for hele filen samlet, ikke
kun de to rettede scenarier isoleret.

## Ved tvivl

Kræver fixet af double-overlap/fravær at ændre den samme, delte
kontrolfunktion som single-lås allerede bruger korrekt — stop og spørg,
frem for at rette bredt og risikere at ramme single-stien. Single-lås'
eksisterende, bekræftede korrekte adfærd (fra opgave 057) må under ingen
omstændigheder regrediere som en sideeffekt af denne opgave.

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
