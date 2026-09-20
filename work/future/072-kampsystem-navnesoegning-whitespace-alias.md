# Opgave 072 — fix: navnesøgning ignorerer whitespace og aliasdata

**Trin:** Kampsystem (rettelse af fund fra opgave 058). Ligger i `work/future/`
med vilje, jf. AGENTS.md's prioritetsregel — flyttes først til
`work/aabne/` når Chris beslutter det.

**Gren:** `arbejde/072-kampsystem-navnesoegning-whitespace-alias`, jf.
AGENTS.md.

**Baggrund:** Fundet under opgave 058 (test af navnehåndtering/søgning i
preview-kilden), dokumenteret i
`work/loeste/058-kampsystem-navnehaandtering.md`s resultatnote. Preview-
kildens faktiske søgefunktion er `renderSoegning` + eksakt `byNavn`. Den
har INGEN `normaliserNoegle`/`officieltNavn`/alias-opslag — det har kun
produktionsfilen `apps/netlify-prod/netlify/lib/navne.js`. Det er selve
manglen på denne normalisering i preview-kilden, der er fundet.

**To fund, ordret fra resultatnoten:**

1. **Whitespace normaliseres ikke.** Input ` Anna ` eller `Anna  Hansen`
   (ekstra/dobbelte mellemrum) mod rosternavnet `Anna Hansen`. Forventet:
   samme søgeresultat som ved "Anna". Faktisk: tomt resultat (`''`), fordi
   søgningen kun lowercaser, ikke trimmer eller komprimerer whitespace.
2. **Aliasdata bruges ikke.** Kendte aliaser fra `data/navne-alias.json`
   (fx `Anja Gunna Thomsen` → `Anja Thomsen`) slår ikke igennem. Forventet:
   opslag på aliasset finder det officielle navn. Faktisk: tomt resultat på
   selve aliasopslaget.

Begge er allerede dækket af automatiserede tests i
`tools/tests/kampsystem/navnehaandtering.test.cjs` (i dag 3/5 bestået, 2
fejlet — scenarie 3 og 4).

**Bemærk:** opgavekortet for 058 nævnte `GSB_NAVNE_ALIAS_OG_ANOMALIER.json`
som datakilde, men den findes ikke i repoet — 058 brugte i stedet
`data/navne-alias.json`. Brug samme faktiske fil, ikke det oprindeligt
antagede filnavn.

## Mål

Preview-kildens navnesøgning (`renderSoegning`/`byNavn` eller den kaldende
kode omkring dem):

1. Trimmer og komprimerer whitespace i søgeinput før match (så
   ` Anna `/`Anna  Hansen` matcher som "Anna Hansen").
2. Slår aliaser fra `data/navne-alias.json` op og finder det officielle
   navn, når et alias søges eller matches direkte.

## Afgrænsning

**Må røres:** `kampsystem/kampsystem_source.html` (kun `renderSoegning`,
`byNavn` og evt. en ny, lille normaliserings-/aliasopslagsfunktion omkring
dem), `tools/tests/kampsystem/navnehaandtering.test.cjs` (kun til at
bekræfte fixet — testens FACIT må ikke ændres).

**Må ikke røres:** `apps/netlify-prod/` (kun læses til reference for hvordan
`normaliserNoegle`/`officieltNavn` allerede er løst i produktion — kopiér
gerne tilgangen, men rediger ikke selve filen), `data/navne-alias.json`
(kun læses som testdata-kilde), scenarie 1, 2 og 5's allerede bestående
adfærd (danske tegn, case-uafhængighed, ukendt-navn-fallback).

## Kontrol

**Målet:**

```
node tools/tests/kampsystem/navnehaandtering.test.cjs
```

Skal vise **5/5 bestået, 0 fejlet** (var 3/5). Angiv det faktiske tal i
resultatnoten.

**Værnet:**

```
git status --short apps/netlify-prod/ GSB_NAVNE_ALIAS_OG_ANOMALIER.json
```

Skal være tom (bemærk: filen i denne kommando er det oprindeligt antagede
navn — hvis den stadig ikke findes, nævn `data/navne-alias.json` i stedet
og bekræft den heller ikke er ændret). Derudover: scenarie 1, 2 og 5 skal
forblive bestående uændret — angiv tallet for hele filen samlet.

## Ved tvivl

Er det uklart om alias-normaliseringen skal porteres 1:1 fra produktionens
`normaliserNoegle`/`officieltNavn`, eller implementeres som en ny,
selvstændig funktion i preview-kilden (fordi de to filer i dag tilsyneladende
ikke deler denne logik) — stop og spørg Chris om han vil have dem til at
dele implementering (fx via en fælles fil begge inkluderer) eller om en
uafhængig kopi i preview-kilden er fint for nu.

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
