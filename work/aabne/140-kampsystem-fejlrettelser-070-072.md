# Opgave 140 — Kampsystem: tre kendte fejl rettes samlet (070, 071, 072)

**Trin:** Samler tre små, allerede specificerede rettelser i preview-kilden `kampsystem/kampsystem_source.html`. De tre originalkort (`work/aabne/070-…`, `071-…`, `072-…`) er den fulde specifikation. Dette kort fastsætter kun rækkefølge, fælles regler og de to afgørelser, originalkortene lod stå åbne.

## Baggrund
Gennemgangen i opgave 139 (`work/gennemgang-2026-10-05.md`) bekræftede, at alle tre fejl stadig findes:

- **070:** `registerVinder` ændrer rating på en udskiftningskamp. `node tools/tests/kampsystem/elo-runde.test.cjs` giver i dag 13 bestået og 1 fejlet (scenarie 5: 1535 mod forventet 1500).
- **071:** `tilfoejLaastKamp` (omkring linje 721) kontrollerer kun dubletter i den ene lås, ikke fravær og ikke overlap mellem låse. Testen `rundefordeling-laaste-doubler.test.cjs` er 8/10 (scenarie 8 og 9).
- **072:** `renderSoegning` (omkring linje 934) lowercaser kun søgeteksten, ingen trim og ingen alias. Testen `navnehaandtering.test.cjs` er 3/5 (scenarie 3 og 4).

## Afgørelser (truffet af Claude som manager, Christoffer kan omstøde)
Originalkortene siger "stop og spørg" i to tilfælde. For at kortet kan køre uden at stoppe er valget truffet her:

1. **070:** Tjekket af `m.udskiftning` lægges **i `registerVinder` selv**, så alle kaldere dækkes og ingen kan glemme det. Kampen registreres og logges som før; kun ratingdelen springes over.
2. **071:** Den delte kontrolfunktion må gerne udvides til at kunne bruges af double-stien, men **single-lås-stien må ikke ændre adfærd**. Ændrer en fælles funktion single-adfærd, så lav en ny funktion kun til double og rapportér det.
3. **072:** Normaliseringen laves som en **lille selvstændig kopi i preview-kilden** (trim, komprimér whitespace, alias fra `data/navne-alias.json`). Ingen fælles fil med produktionen. En deling af implementeringen er en senere beslutning.

Er Codex uenig i en af afgørelserne, skal den skrive det i "Spørgsmål" og rette sig efter afgørelsen, medmindre den er teknisk umulig.

## Mål
Løs 070, 071 og 072 efter deres egne kort, i den rækkefølge, med **én** ændring ad gangen, så hver kan bedømmes for sig:

1. 070 først (mindst), så 071, så 072.
2. Kør efter hver rettelse de relevante tests **og** alle tre testfiler samlet, så vi ser, om noget regredierer.
3. Udfyld resultatnoten i hvert af de tre originalkort (Resultatnote-afsnittet), og udfyld resultatnoten her med en samlet tabel: kort, test før/efter, hvilken funktion er rettet.

Testmål (fra originalkortene):
- `node tools/tests/kampsystem/elo-runde.test.cjs`: alle bestået (13 beregningstests plus 11 kategoriintegritet; scenarie 5 skal nu bestå).
- `node tools/tests/kampsystem/rundefordeling-laaste-doubler.test.cjs`: 10/10.
- `node tools/tests/kampsystem/navnehaandtering.test.cjs`: 5/5.
Brug direkte Node-kørsel (ikke `node --test`, der giver `spawn EPERM` på Windows).

## Afgrænsning
- Må røre: `kampsystem/kampsystem_source.html` (kun de funktioner originalkortene nævner), testfilerne kun hvis originalkortet tillader det (testens FACIT må ikke ændres), og de tre originalkort (kun Resultatnote/Spørgsmål).
- Må **ikke** røre: `apps/netlify-prod/` (Christoffer har lokale ændringer dér: `netlify/functions/spillere.js`, `netlify/lib/navne.js`, `netlify/lib/statistik-spillere.js`) og `docs/BESLUTNINGER.md`. Læs gerne produktionens `navne.js` som reference for 072, men ret den ikke.
- Ingen kopiering af ændringerne til produktionsfilen `apps/netlify-prod/public/kampsystem.html`. Det er en separat deployrunde (se future/025).
- Ingen nye funktioner ud over de tre rettelser.

## Kontrol
- **Målet:** alle tre testfiler viser 0 fejlede. Angiv de faktiske tal (bestået/fejlet pr. fil).
- **Værnet:** `git status --short apps/netlify-prod/` viser kun Christoffers tre eksisterende ændringer og intet nyt; `docs/BESLUTNINGER.md` er urørt; `git diff --stat` viser kun `kampsystem/kampsystem_source.html`, de tre originalkort og dette kort; `git diff --check` er uden fejl.
- **Skøn:** åbn de rettede funktioner og forklar kort, hvorfor hver rettelse ikke påvirker de øvrige stier (single-lås, kategoriintegritet, aliasløse søgninger).

## Ved tvivl
Skriv i "Spørgsmål". Stop kun, hvis en rettelse vil kræve ændring i en funktion, originalkortene udtrykkeligt forbyder at røre.

## Gren
`arbejde/140-kampsystem-fejlrettelser-070-072`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git (status, diff, log), lader ændringer stå ustaged, melder filstierne, tager aldrig `git add -A`, pusher ikke og laver ingen Co-Authored-By-linjer.

## Spørgsmål
(Tomt.)

## Tilbagefald
Ét tilbagefald pr. rettelse: gendan `kampsystem/kampsystem_source.html` fra `main`. Ingen database eller produktionsfil er berørt.

## Resultat

Afsluttet 2026-10-05 på `arbejde/140-kampsystem-fejlrettelser-070-072`. Arbejdet blev udført sekventielt; efter hver rettelse blev den relevante test kørt først og derefter alle tre testfiler.

| Kort | Test før | Test efter | Rettet funktion |
|---|---|---|---|
| 070 | ELO 13/13; kategoriintegritet 10/11 | ELO 13/13; kategoriintegritet 11/11 | `registerVinder` springer ratingsideeffekten over for udskiftningskamp |
| 071 | 8/10 | 10/10 | Double-specifik `validerDoubleLaas`, kaldt fra `tilfoejLaastKamp` |
| 072 | 3/5 | 5/5 | `normaliserSoegenavn` og lokalt aliasopslag i `renderSoegning` |

Faktisk samlet slutkontrol:

```text
node tools/tests/kampsystem/elo-runde.test.cjs
13 tests passed, 0 failed
Kategoriintegritet: 11 bestået, 0 fejlet

node tools/tests/kampsystem/rundefordeling-laaste-doubler.test.cjs
Rundefordeling/låste doubler: 10 bestået, 0 fejlet

node tools/tests/kampsystem/navnehaandtering.test.cjs
Navnehåndtering: 5 bestået, 0 fejlet
```

Værn: single/mixed-låsekontrol forblev uændret; ELO-kategoriintegritet bestod 11/11; aliasnormaliseringen bruges kun i søgefeltets kandidatliste, og `byNavn`/ukendt-navn-fallback er uændret. Ingen af de øvrige forbudte engine-funktioner blev redigeret. Produktionsfilerne og `docs/BESLUTNINGER.md` blev ikke ændret af opgave 140.

**Afvigelse fra det forventede diff-omfang:** `tools/tests/kampsystem/rundefordeling-laaste-doubler.test.cjs` har også en ændring i opsætningen af scenarie 8 (ikke i assertion/facit), så testen gennemløber den offentlige låsefunktion. Originalkort 071 tillader testopsætningsændringer med uændret facit. Derfor viser diffen kilden, denne testfil og de fire kort — ikke kun kilden og kortene.

## Spørgsmål

(Tomt.)
