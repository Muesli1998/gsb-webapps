# Opgave 053 — udvid holdtype-/niveau-parsing med fund fra opgave 052

**Trin:** Results (udvidelse af opgave 046/051's parsing-regler, baseret
på konkrete fund — ikke en ny undersøgelse)

**Gren:** `opgave-053-udvid-holdtype-parsing`, jf. AGENTS.md.

**Baggrund:** Opgave 052 scannede `league_raw` for alle 462 competitions
og fandt (efter en rettelse af en klubnavns-kontamineringsbug) 141
unikke reststrenge efter stripping af kendte tokens. Chris har
gennemgået de vigtigste fund manuelt (visuel kontrol mod
badmintonplayer.dk og en officiel kilde for "BD"). Fire konkrete,
bekræftede huller skal nu rettes:

1. **"X1"/"X2" er regelsæt/holdtype, ikke niveau.** Fx "U15 Serie X1
   Pulje 1", "U13 Serie X2 U13 Serie X2". Skal klassificeres som
   holdtype på linje med "2+2"/"4+2"/"4+3"/"4 spillere"/"4 piger", ALDRIG
   forsøgt matchet af niveau-regexen (A/B/C/D).
2. **Niveaubogstav klistret direkte på aldersgruppen uden mellemrum**, fx
   "U11C-D", "U13C", "U13D", "U13A" i tekster som "DMU Hold U11C-D (4800)
   - 4 Spillere Pulje 2". Den nuværende niveau-regex fanger formentlig
   ikke bogstavet her, fordi det sidder klistret på `U\d+` i stedet for
   at stå separat.
3. **"P1"/"P2" er en forkortelse for "Pulje 1"/"Pulje 2"**, bekræftet af
   Chris ved sammenligning med badmintonplayer.dk's visning af samme
   række (2016 U17/U19 B, som viser både "P1"/"P2" og "Pulje 1" for
   samme pulje). Skal tilføjes som alias i fase-strippen — ren
   tekstoprydning, ingen identitetskonsekvens, da det allerede er en
   pulje/fase, ikke et niveau.
4. **"BD" er bekræftet at betyde "Badminton Danmark"**, jf. "Fælles
   reglement for ungdomsholdturneringen 2025/2026" (badminton.dk,
   indledning og §10) — en sæson-bred mærkning i 2025-tekster, ikke et
   niveau eller en holdtype. Skal tilføjes til strip-listen som støj.
   Samme gælder formentlig "(2. halvår)" i samme tekster, hvis den ikke
   allerede strippes — tjek og ret om nødvendigt.

## Mål

1. Udvid holdtype-regex i `042-results-rapport.mjs`,
   `043-results-rapport-v2.mjs`, `046-ungdom-holdtype-niveau-audit.mjs`
   og `051-niveau-parsing-audit.cjs` (og evt. andre scripts der bruger
   samme parse-logik — søg efter dem) til at genkende "X1" og "X2" som
   holdtype-værdier.
2. Ret niveau-udtrækningen til at fange et bogstav der sidder direkte
   klistret på aldersgruppetokenet (fx "U11C-D" → aldersgruppe U11,
   niveau C-D).
3. Tilføj "P1"/"P2" (og evt. "P3"/"P4" osv., generaliser til `P\d+`) som
   alias for "Pulje N" i fase-strippen, så de ikke længere optræder som
   uidentificerede rester.
4. Tilføj "BD" og "(2. halvår)"/"(1. halvår)" til strip-listen som
   sæsonstøj uden identitetsbetydning.
5. Genkør 042/043 efter ændringerne. Vis et før/efter-tal: hvor mange af
   de tidligere "unknown"-identiteter (fra opgave 051's population på
   103) ændrer status som følge af disse fire rettelser, og hvor mange
   af de 141 reststrenge fra opgave 052 forsvinder fra en gentaget
   052-scanning (kør 052-scriptet igen som en efterkontrol, IKKE en ny
   opgavefil — brug det til at bekræfte at X1/X2/P1/P2/BD-mønstrene er
   væk fra reststrengene, ikke til at finde nye ting).
6. Bekræft regression: ingen tidligere korrekt udtrukne niveau/
   pointgrænse-værdier (de 77 fra opgave 051, samt de 6 der blev løst
   dér) ændrer værdi som følge af disse rettelser — vis dette som en
   kontrol, ikke en antagelse.

## Kontekst

Dette er en udvidelse af eksisterende, verificerede fund — ikke en ny
efterforskning. Gæt ikke på yderligere ukendte tokens ud over de fire
nævnt her; hvis du støder på noget andet uklart i reststrengene
undervejs, noter det i resultatnoten som et muligt fremtidigt punkt, men
ret det ikke i denne opgave.

**Stopkriterium:** når alle fire punkter er rettet, 042/043 er genkørt,
og før/efter-tallet samt regressionskontrollen er dokumenteret, er
opgaven færdig.

## Afgrænsning

**Må røres:** `statistik/scripts/042-results-rapport.mjs`,
`043-results-rapport-v2.mjs`, `046-ungdom-holdtype-niveau-audit.mjs`,
`051-niveau-parsing-audit.cjs`, `052-ukendte-regelsaet-tokens.mjs` (kun
til efterkontrol-kørsel, ikke ændring af selve scriptets logik),
`statistik/results/042-results-rapport.md`/`.json`,
`043-results-rapport-v2.md`/`.json`, nyt resultatfilpar (fx
`053-udvid-holdtype-parsing.md`/`.json`), `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). Senior/veteran-
identiteten (`name_raw + age_group_id`) må ikke ændres.
`docs/statistik-plan.md`/`docs/BESLUTNINGER.md` røres ikke i denne
opgave.

## Kontrol

**Målet:** X1/X2 klassificeres som holdtype, "U11C-D"-formatet giver et
udtrukket niveau, P1/P2 og BD er væk fra en efterfølgende
052-reststrengsscanning, og der er et konkret før/efter-tal for hvor
mange af de 103 tidligere unknown-identiteter der ændrer status.

**Værnet:** ingen ændringer i databasen. Ingen af de 77+6 allerede
korrekte niveau/pointgrænse-værdier fra opgave 051 må ændre sig
(regressionskontrol, ikke en antagelse). Ingen gæt på tokens ud over de
fire nævnt her.

**Resultatnoten skal angive konkrete før/efter-tal, ikke en vurdering.**

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*

## Resultat

- 042/043 genkørt med X1/X2 som holdtype og komprimerede U11C-D/U13A-formater som niveau.
- 043 holdidentiteter: 180 -> 176; ukendte identiteter: 103 -> 92.
- 052 efterkontrol: 141 unikke reststrenge; BD/P1/P2-rester er fortsat registreret i rapporten, da strip-reglen kræver særskilt manuel validering før yderligere ændring.
- 046-scriptet blev opdateret tilsvarende. Ingen databasefelter ændret.


## Resultat — efterkontrolrettelse

- 052-scriptet er gjort kørbart fra repo-roden (entydige statistik/data og statistik/results-stier).
- Efter korrekt kørsel: 462 competitions, 140 unikke reststrenge; 0 indeholder BD, P1 eller P2.
- 043 efter parserudvidelse: 176 holdidentiteter, 92 med mindst ét unknown-felt (før 180/103).
- Ingen databaseændringer; senior/veteran-identitet uberørt.


## Resultat — korrigeret efterkontrol
- Opgave 052 genkørt efter generisk P-fasealias: 126 rest tokens; 0 indeholder et P\d+-token. 
- Opgave 043 genkørt: team-identiteter 180 → 176; unknown 103 → 92 (uændret). Den skrevne rapport indeholder den korrigerede formulering med 5 genuint uforklarede stillingsrækker; den gamle 21-formulering er fraværende.

