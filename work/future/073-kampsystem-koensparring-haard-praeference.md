# Opgave 073 — afklar/ret: kønsbalanceret parring er reelt hård, ikke blød

**Trin:** Kampsystem (afklaring + evt. rettelse af fund fra opgave 060).
Ligger i `work/future/` med vilje, jf. AGENTS.md's prioritetsregel —
flyttes først til `work/aabne/` når Chris beslutter det. **Denne opgave er
IKKE en ren bugfix som 070-072** — den kræver et produktvalg af Chris
først, se "Ved tvivl" nedenfor.

**Gren:** `arbejde/073-kampsystem-koensparring-haard-praeference`, jf.
AGENTS.md.

**Baggrund:** Fundet under opgave 060 (test af kønsbevidst
double/mixed-parring i preview-kilden — en feature der KUN findes i
`kampsystem/kampsystem_source.html`, aldrig kopieret til produktion),
dokumenteret i
`work/loeste/060-kampsystem-koensbalanceret-parring.md`s resultatnote.
Chris har tidligere efterspurgt at rene kønsopdelte par undgås "så vidt
muligt", men accepteres ved lavere niveau/når intet bedre findes — dvs.
en BLØD præference, ikke en hård begrænsning. Researchen bag opgave 060
bekræftede der ikke findes nogen badminton- eller round-robin-standard der
kræver dette; det er en lokal GSB-/trænerpræference.

**Fundet, ordret fra resultatnoten (scenarie 3, "blødheds-testen"):** med
herrer på rating 3000/2990 og damer på 1000/990, hvor det ENESTE
kønsblandede par ville give makker-ratinggab på 2000 og 2000, mens et rent
par ville give gab på blot 10 og 10 — valgte algoritmen stadig det
kønsblandede par. Det dokumenterer at præferencen i praksis er **hård**:
den går over rating-fairness i stedet for at give den op, når et rent par
ville være markant bedre matchet.

**Yderligere fund (scenarie 4):** kodesøgningen fandt ingen
niveau-/pointgrænse-tærskel der styrer "lavere rangerede par accepteres
skævere", og ingen mekanisme der undgår et kønsblandet par mod et rent par
på tværs af nettet (den "1 dame/3 herrer"-skævhed Chris tidligere nævnte).
Der findes kun en generel undgå-hvis-muligt-regel.

## Mål

**Dette afsnit kan først udfyldes præcist, når Chris har svaret på
spørgsmålet i "Ved tvivl" nedenfor** — indtil da er nedenstående en skitse,
ikke et facit:

Gør kønspræferencen reelt blød: indfør en tærskel for hvor stort et
makker-ratinggab kønsblanding maksimalt må skabe, sammenlignet med det
bedste rene alternativ, før algoritmen falder tilbage til et rent par.
Den konkrete tærskel/formel skal komme fra Chris, ikke opfindes af den der
løser opgaven.

## Afgrænsning

**Må røres:** `kampsystem/kampsystem_source.html` (kun
`kaonsbevidstFordeling`/`fordelTilDoubleOgMixed`/`formTeams`/
`formTeamsMixed` og den tærskellogik der tilføjes), tilhørende testfil
`tools/tests/kampsystem/koensbalanceret-parring.test.cjs`.

**Må ikke røres:** `apps/netlify-prod/` (featuren findes ikke der),
scenarie 1, 2 og 4's allerede bekræftede korrekte adfærd (præference
virker når et rimeligt blandet alternativ findes; rene puljer
hænger/fejler ikke).

## Kontrol

**Målet:** ny/udvidet version af scenarie 3 i
`koensbalanceret-parring.test.cjs` skal, med samme ekstreme eksempel
(herrer 3000/2990, damer 1000/990), nu vælge det rene par i stedet for det
kønsblandede — angiv det faktiske valg og ratinggabet i resultatnoten.
Kør:

```
node tools/tests/kampsystem/koensbalanceret-parring.test.cjs
```

**Værnet:** scenarie 1 (kønsblandet par foretrækkes når det er rimeligt
matchet) og scenarie 2 (rene puljer accepteres, ingen hang) skal fortsat
give samme resultat som i opgave 060 — angiv tallet for hele filen samlet.

```
git status --short apps/netlify-prod/
```

Skal være tom.

## Ved tvivl

**Stop HELT og spørg Chris, før nogen kode skrives:** opgave 060 fandt
ingen eksisterende niveau-/pointgrænse-tærskel i koden at bygge videre på —
en konkret cap skal derfor besluttes, ikke gættes. Spørg specifikt:

1. Hvad er den maksimalt acceptable makker-ratingforskel (eller
   forholdstal til det rene alternativs gab), før kønsblanding skal give
   op og vælge et rent par i stedet?
2. Skal tærsklen være den samme for alle niveauer, eller — som Chris'
   oprindelige formulering ("accepteres ved lavere niveau") antyder —
   afhænge af spillerens niveau/rating?
3. Er det overhovedet noget der skal rettes nu, eller er det fint at
   præferencen forbliver hård indtil videre (dvs. denne opgave lukkes uden
   kodeændring, kun med en note om at det er en bevidst beslutning)?

Byg ikke en tærskel-formel på egen hånd for at få en test til at bestå.

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
