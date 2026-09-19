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

*(udfyldes når opgaven er løst)*
