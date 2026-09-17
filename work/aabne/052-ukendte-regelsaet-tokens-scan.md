# Opgave 052 — find ukendte regelsæt-/holdtype-tokens i hele databasen (read-only)

**Trin:** Results (undersøgelse, ikke en rettelse — afklarer omfanget af
opgave 046/051's holdtype/niveau-parsing før evt. opgave 053 udvider den)

**Gren:** `opgave-052-ukendte-regelsaet-tokens`, jf. AGENTS.md.

**Baggrund:** Chris' visuelle gennemgang af to opgave 051-identiteter
afklarede at "X1" (fx "U17 Serie X1 Pulje 1") er et **regelsæt/holdtype**,
ikke et niveau — på linje med "4+3"/"4+2"/"2+2"/"4 spillere", som vores
parsing i `042`/`043`/`046`/`051` ikke kender. Se
`docs/statistik-plan.md`s note fra 2026-09-17 under Holdidentitets-
standarden for den fulde baggrund. Der er sandsynligvis flere tilsvarende
huller vi ikke har opdaget endnu, både fordi vi kun har set en brøkdel af
teksterne manuelt, og fordi hele Danmark (fx Vestserien/Kredsserien Vest,
som dækker Nordjylland, Midtjylland, Sønderjylland og Fyn) kan bruge andre
betegnelser end dem vi kender fra Sjælland/København.

Denne opgave er **ikke** en rettelse af parsingen — det er en kortlægning,
så vi ved hvad der reelt findes i teksterne, før vi beslutter hvad der skal
udvides.

## Mål

1. Hent `league_raw` og `name_raw` for ALLE rækker i `competitions` (ikke
   kun ungdom — kør scanningen for hele tabellen, men marker i output
   hvilken `age_group_id` hver tekst hører til, så senior/veteran kan
   skelnes fra ungdom).
2. For hver tekst: fjern (strip) alt vi allerede genkender:
   - Aldersgruppe-tokens: `U\d+`, `SEN+?\d*`, `SEN\+\d+` osv.
   - Pulje/fase-ord: "Pulje N", "Kvartfinale", "Semifinale", "Finale",
     "Finaleslutspil", "Placeringskampe", "Oprykning", "Nedrykning",
     "Grundspil", "Slutspil" og lignende — brug de mønstre der allerede
     findes i `042`/`043`/`046`/`051`'s scripts som udgangspunkt, ret
     ikke selve mønstrene i denne opgave.
   - Kendte holdtype-tokens: "2+2", "4+2", "4+3", "4 spillere",
     "3 spillere", "4 piger".
   - Niveau-bogstaver: A/B/C/D (evt. "C-D", "M").
   - Pointgrænser (3-5-cifrede tal).
   - Rent numeriske/tomme rester og almindelige fyldord ("Række",
     "Serie" alene, bindestreger, parenteser).
3. Saml de **ikke-tomme rester** der er tilbage efter stripping, grupperet
   efter unik reststreng, med: antal forekomster, mindst ét eksempel på
   den fulde originaltekst den kommer fra, og hvilke sæsoner/kredse
   (season_id-spænd) den optræder i.
4. Sortér listen efter hyppighed (flest forekomster øverst). Kategorisér
   groft (uden at gætte for hårdt) om resten ligner: (a) et nyt
   regelsæt/holdtype-ord (som "X1"), (b) en niveau-variant vi ikke
   genkender (fx småbogstaver, "M-række"), (c) støj/formateringsfejl (fx
   dobbelt mellemrum, en tastefejl), eller (d) andet/uklart.

## Kontekst

Formålet er at få en **komplet liste**, ikke at rette noget. Gæt ikke på
hvad en ukendt rest betyder — rapporter den som den er, med eksempler, så
et menneske (Chris) eller en senere opgave kan slå det op i regelbøgerne.

**Stopkriterium:** når alle rækker i `competitions` er gennemgået én gang
og resultatet er skrevet til fil, er opgaven færdig. Forsøg IKKE at slå
noget op på internettet, og forsøg IKKE at rette parsing-scripts i denne
omgang — det er en efterfølgende opgave, hvis relevant.

## Afgrænsning

**Må røres:** nyt undersøgelsesscript (fx
`statistik/scripts/052-ukendte-regelsaet-tokens.mjs`) og nyt
resultatfilpar (`statistik/results/052-ukendte-regelsaet-tokens.md`/
`.json`), `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning), alle eksisterende
`04x`/`05x`-scripts og deres resultatfiler, `docs/statistik-plan.md`/
`docs/BESLUTNINGER.md`.

## Kontrol

**Målet:** en fil der lister samtlige unikke "rest-tokens" efter
stripping, sorteret efter hyppighed, med antal forekomster, mindst ét
eksempel på fuld originaltekst, og et season_id-spænd pr. rest.

**Værnet:** ingen ændringer i databasen eller i eksisterende
parsing-scripts. Ingen gæt på hvad en ukendt rest betyder — kun
observation og forsigtig grov kategorisering (a-d).

**Resultatnoten skal angive et konkret antal unikke rest-tokens fundet,
og liste de 15-20 hyppigste med eksempel og kategori — ikke en
vurdering af hvor "færdig" parsing-dækningen er.**

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
