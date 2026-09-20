# Opgave 058 — test navnehåndtering og søgning

**Trin:** Kampsystem (kvalitetstest af eksisterende logik)

**Gren:** `opgave-058-kampsystem-navnehaandtering`, jf. AGENTS.md.

**Baggrund:** Dækker `normaliserSoegetekst`, `byNavn` og evt.
`normaliserNoegle`/`officieltNavn`, hvis de findes i preview-kilden i
samme eller lignende form som i `apps/netlify-prod/netlify/lib/navne.js`
— bekræft ved kortlægning, gæt ikke om de to filer deler eller
duplikerer denne logik.

## Mål

Navnehåndterings- og søgefunktionerne har automatiserede tests med et
konkret bestået/fejlet-tal.

**Scenarier (som minimum):**

1. Danske tegn (æ/ø/å) i søgning og opslag.
2. Stort/småt bogstav-uafhængighed.
3. Ekstra/dobbelte mellemrum i inputtet.
4. Mindst 3 konkrete, kendte aliaser genbrugt direkte fra
   `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` — samme datakilde som
   statistik-projektet allerede har kvalificeret, ikke opdigtede
   eksempler.
5. Et navn der ikke findes i rosteret → et forventet, kontrolleret
   fallback/tomt resultat, ikke en ukontrolleret undtagelse.

## Afgrænsning

**Må røres:** `tools/tests/kampsystem/` (ny testfil, fx
`navnehaandtering.test.cjs`), tilhørende resultatfilpar.

**Må ikke røres:** `apps/netlify-prod/`, `kampsystem/kampsystem_source.html`
(kun læses/testes), `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` (kun læses som
testdata-kilde, ikke ændres).

## Kontrol

**Målet:**

```
node --test tools/tests/kampsystem/
```

Konkret X/Y/Z-tal for alle 5 scenarier.

**Værnet:**

```
git status --short kampsystem/ apps/netlify-prod/ GSB_NAVNE_ALIAS_OG_ANOMALIER.json
```

Skal være tom.

## Ved tvivl

Findes `normaliserNoegle`/`officieltNavn` slet ikke i preview-kildens
egen kode (dvs. den bruger en anden/ingen normalisering), så test det
der faktisk findes, og skriv i resultatnoten at preview-kilden mangler
den normalisering produktionens `lib/navne.js` har — det er et fund, ikke
noget der skal opfindes for at få en test til at bestå.

## Spørgsmål

## Resultatnote

Metode: Der er tilføjet `tools/tests/kampsystem/navnehaandtering.test.cjs`.
Testen evaluerer den faktiske inline søge-/opslagskode fra
`kampsystem/kampsystem_source.html` read-only i en VM. Den læser de tre
konkrete aliaspar direkte fra `data/navne-alias.json`, fordi den i kortet
nævnte `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` ikke findes i repoet.

Kortlægning: preview-kilden har `renderSoegning` og eksakt `byNavn`, men
ingen `normaliserNoegle`, `officieltNavn`, `matchKey` eller tilsvarende
aliasopslag. Produktionsfilen `apps/netlify-prod/netlify/lib/navne.js` har
derimod `normaliserNoegle`/`officieltNavn`; den blev kun læst til denne
sammenligning og er ikke ændret.

Direkte kommando:

```text
node tools/tests/kampsystem/navnehaandtering.test.cjs
```

Resultat: `Navnehåndtering: 3 bestået, 2 fejlet`.

Fejlene er:

1. Scenarie 3, inputtet ` Anna ` og `Anna  Hansen` mod roster-navnet
   `Anna Hansen`. Forventet: samme søgeresultat som `Anna`. Faktisk: tomt
   resultat (`''`), fordi preview-søgningen kun lowercaser og ikke trimmer
   eller komprimerer whitespace.
2. Scenarie 4, aliasdata fra `data/navne-alias.json`: `Anja Gunna Thomsen`
   → `Anja Thomsen`, `Jonathan Hansen` → `Jonathan W. Hansen` og
   `Louise Korsby Kofoed` → `Louise Kofoed`. Forventet: opslag på hvert
   alias finder det officielle navn. Faktisk: tomt resultat på første
   alias (`''`); preview-kilden bruger ikke aliasdata.

Scenarie 1 bestod med `Søren Østergaard` og `Mette Åkær`; scenarie 2 bestod
med uppercase-søgning `CHRISTOFFER` og viste samtidig, at `byNavn` er
eksakt (`christoffer müller` giver `undefined`). Scenarie 5 bestod:
ukendt navn gav tomt resultat og `byNavn` gav `undefined` uden exception.

Den foreskrevne katalogkontrol blev kørt:

```text
node --test tools/tests/kampsystem/
```

Resultat: Node test runner fejlede før testkørsel med Windows-fejlen
`Error: spawn EPERM` (`tests 1, pass 0, fail 1`). Den direkte Node-kørsel
ovenfor er derfor den anvendte kontrol og gav 3/5 og 2/5.

Værn:
`git status --short kampsystem/ apps/netlify-prod/ GSB_NAVNE_ALIAS_OG_ANOMALIER.json`
var tom; ingen beskyttede filer eller aliasdata er ændret. Der er ikke
skrevet til databaser.
