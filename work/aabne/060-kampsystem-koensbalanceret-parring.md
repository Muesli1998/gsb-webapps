# Opgave 060 — test kønsbalanceret double-parring som blød præference

**Trin:** Kampsystem (kvalitetstest af en feature der KUN findes i
preview-kilden, aldrig kopieret til produktion)

**Gren:** `opgave-060-kampsystem-koensbalanceret-parring`, jf. AGENTS.md.

**Baggrund:** `kampsystem/kampsystem_source.html` har en
"Kønsbevidst double/mixed"-sektion (`formTeams(spillere, filosofi,
blandKoen)`, `formTeamsMixed`, m.fl.) bygget 2026-09-04, som slet ikke
findes i `apps/netlify-prod/`. Chris har efterspurgt at rene
kønsopdelte par (2 herrer mod 2 herrer, eller 2 damer mod 2 damer) så
vidt muligt undgås, men accepteres ved lavere niveau/når intet bedre
findes.

**Vigtig afklaring fra research (2026-09-19), skal styre hvordan denne
opgave testes:** der findes ingen badminton- eller round-robin-standard
der kræver dette — det er en lokal GSB-/trænerpræference. Den skal derfor
testes og behandles som en **BLØD præference**, ikke en hård
begrænsning: koden må ALDRIG tvinge en markant dårligere ratingmatch
eller en ekstra oversidder bare for at opnå kønsblanding. Er det
tilfældet i den nuværende kode, er det et fund der skal dokumenteres, ikke
en fejl der skal rettes som en del af denne opgave.

## Mål

Kønsparrings-logikken har automatiserede tests der besvarer: (a) virker
præferencen når et blandet alternativ findes, (b) er den reelt blød (går
den aldrig ud over rating-fairness for at opnå det), og (c) hænger/fejler
den aldrig når kønsblanding er umuligt.

**Scenarier (som minimum):**

1. En pulje med både mænd og kvinder tilgængelige, hvor mindst ét
   kønsblandet par kan dannes uden større ratingafvigelse — bekræft at
   algoritmen rent faktisk foretrækker det blandede par frem for et
   rent par.
2. En pulje der KUN har mænd eller KUN kvinder tilgængelige — bekræft
   koden accepterer det rene par og returnerer et resultat, i stedet
   for at fejle, hænge, eller udelade spillere. Høj prioritet: dette er
   den ene test i hele suiten der tjekker mod en uendelig løkke/hang,
   ikke kun et forkert facit.
3. **Blødheds-testen:** opstil en pulje hvor det ENESTE kønsblandede par
   der kan dannes ville kræve en urimeligt stor ratingforskel (langt
   over hvad et rent par ville give), mens et rimeligt matchet rent par
   findes. Undersøg og dokumentér hvad koden rent faktisk vælger — hvis
   den vælger det dårlige, kønsblandede match, er det et fund (reelt en
   hård begrænsning, ikke en blød), ikke noget testen selv skal afgøre
   er "forkert".
4. Søg konkret i koden efter en pointgrænse/niveau-tærskel der styrer
   "lavere rangerede par accepteres skævere". Findes den ikke, skriv det
   som et fund under Spørgsmål ("kun en generel undgå-hvis-muligt-regel
   fundet, ingen niveau-afhængig undtagelse") — opfind ikke en tærskel
   selv.

**Eksplicit IKKE en del af denne opgave (log i stedet, byg ikke):** at
undgå et kønsblandet par mod et rent par på tværs af nettet (den
"1 dame 3 herrer"-type skævhed Chris nævnte) — researchen fandt ingen
tegn på at denne mekanisme findes i koden overhovedet. Bekræft blot ved
kortlægning om den findes eller ej, og skriv fundet i resultatnoten —
byg den ikke som en del af denne opgave, uanset hvor let det ser ud til
at være.

## Afgrænsning

**Må røres:** `tools/tests/kampsystem/` (ny testfil, fx
`koensbalanceret-parring.test.cjs`), tilhørende resultatfilpar.

**Må ikke røres:** `apps/netlify-prod/` (ikke relevant — featuren findes
ikke der), `kampsystem/kampsystem_source.html` (kun læses/testes, rettes
ikke uanset hvad testene finder — inkl. blødheds-testen i punkt 3).

## Kontrol

**Målet:**

```
node --test tools/tests/kampsystem/
```

Konkret X/Y/Z-tal for alle 4 scenarier, inkl. et eksplicit svar
("blød"/"reelt hård, se fund X") for scenarie 3.

**Værnet:**

```
git status --short kampsystem/ apps/netlify-prod/
```

Skal være tom.

## Ved tvivl

Er det uklart om et fundet mønster (fx scenarie 3's resultat) betyder at
featuren skal ændres, er det IKKE en beslutning for denne opgave — skriv
det som et klart, konkret fund i resultatnoten (med tal/eksempel) og lad
Chris tage stilling til om det skal rettes i en senere, selvstændig
opgave.

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst)*
