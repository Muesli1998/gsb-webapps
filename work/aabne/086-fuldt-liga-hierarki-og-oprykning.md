# Opgave 086 — fuldt liga-hierarki (alle 33 regioner), oprykning som bevis, og ranglistens indførelse i ungdom

**Trin:** Direkte fortsættelse af opgave 085. Stadig undersøgelse/afklaring, med et konkret, allerede
leveret visuelt kort som skabelon (se "Kontekst"), men nu udvidet i tre retninger Christoffer selv har
peget på efter at have set det.

**Gren:** `arbejde/086-fuldt-liga-hierarki-og-oprykning`, jf. `AGENTS.md`.

**Baggrund:** Opgave 085 genparsede siderækkefølgen for tre konkrete eksempelsider (BADDAN SEN, BADKBH
SEN, BADKBH U15) og byggede et visuelt kort ud fra det. Kortet dækker kun de tre sider — ikke alle 33
regioner. Christoffer har set kortet og peget på tre konkrete udvidelser:

1. **Udvid til alle 33 regioner.** Samme metode (genparsing af `standing_indexes.raw_response`) skal
   køres for alle regioners sider, ikke kun de tre eksempler.
2. **Op-/nedrykning som empirisk bevis for niveau-lighed, kun for senior.** Christoffer vurderer at man
   for senior kan regne med at hver regions topkreds (fx Sjællandsserien, Københavnsserien, Kredsserien
   Vest) reelt er "ens" i niveau, fordi oprykning fra dem går til Danmarksserien — dvs. flere regionale
   topkredse fødrer den samme fælles række. Dette skal IKKE antages — det skal testes empirisk: findes
   der faktiske hold der er rykket op fra en regional topkreds til Danmarksserien i kildedataen? Hvis ja,
   kan det bruges som begrundelse for at tegne en pil/forbindelse mellem de regionale topkredse (de
   "fødrer" samme næste niveau). Hvis nej, eller for tyndt datagrundlag, dokumentér det i stedet for at
   tegne forbindelsen.
3. **Ungdom grupperes IKKE med automatiske forbindelser.** For ungdomsrækker (U-grupper) må ens/lignende
   navngivne puljer i forskellige regioner IKKE forbindes med streger/pile som om de var bekræftet
   samme niveau — de skal vises side om side som en gruppe uden linje, medmindre der findes konkret
   op-/nedrykningsbevis mellem specifikke puljer på tværs af sæsoner (samme princip som for senior, men
   Christoffer forventer selv at det bliver sjældnere eller fraværende, og det skal ikke antages i den
   ene eller anden retning).

**Vigtigt — to nye faktiske spørgsmål Christoffer har rejst, som skal undersøges som selvstændige
delmål, ikke antages:**

**A. Hvornår gik ungdomsrækker over til pointbaseret rangliste-pooling?** Christoffer stoppede med at
spille i 2017 og mener bestemt at ungdomsrækker dengang ikke var rangliste-baserede (pointgrænser som
"U15 A, 6800" er et nyere fænomen — puljerne hed dengang formentlig bogstavniveauer som "A", "B", "C",
"D" uden pointgrænse i navnet). Find den faktiske sæson hvor navngivningen skifter fra bogstavniveau til
pointgrænse-format i `division_name_raw`, pr. aldersgruppe. Dette er direkte tjekbart i allerede gemt
data (`league_groups` har `season_id` og rå navne for alle 17 sæsoner) — ingen nye API-kald nødvendige.
Rapportér det fundne skiftetidspunkt (eller dokumentér at det er gradvist/inkonsistent på tværs af
aldersgrupper/regioner, hvis det viser sig at være tilfældet).

**B. Spillerdrevet "holdforskydning" mellem aldersgrupper — er det synligt i data?** Christoffers
hypotese: hvis en klub (fx GSB) har en stærk U13-årgang i en periode, kan det ske at klubben ikke har et
hold i en bestemt U13-pulje en sæson, fordi spillerne allerede er rykket op og spiller U15 i stedet.
Dette er testbart empirisk: `match_categories` har spiller-ID'er og -navne pr. kamp. Undersøg om der er
konkrete, navngivne eksempler (brug GSB som kendt case, samme forsigtighed som `player_link` i opgave
083 — spor spillere via ID, ikke kun navn, og marker usikre koblinger som usikre) hvor de samme spillere
findes i en yngre aldersgruppes kampe én sæson og en ældre aldersgruppes kampe næste sæson, uden at have
spillet den mellemliggende aldersgruppe. Dette er et sidespor i forhold til niveau-hierarkiet, men
direkte efterspurgt — hold det afgrænset til et konkret, dokumenteret udsnit (fx GSB), ikke en
generalisering over hele landskabet.


**Ny, konkret undersøgt detalje (allerede bekræftet under kortlægningen af denne opgave):**
"Spilleform" er ikke skrevet ned som et felt nogen steder, men er empirisk aflæselig fra
`match_categories.category_raw` pr. kamp. Eksempel fra BADKBH SEN 2026/2027: Københavnsserien og
3. Serie har 13 kategorier pr. kamp (inkl. `DS` — damesingle), mens 31./32./33. Serie kun har 10
kategorier (ingen `DS`, kun én `MD`/`DD`). Det bekræfter at 31.-33. Serie er en anden spilleform end
1.-3. Serie/Københavnsserien, selvom de står i samme rækkefølge-liste på siden. Dette skal bruges som et
selvstændigt lag i klassificeringen (se nyt Mål 2a og det udvidede Mål 6 nedenfor) — IKKE antages ud fra
navnet alene (fx at "Serie 31" bare er "en lavere Serie 3").

**Hvordan forbindelser mellem puljer skal besluttes — tre uafhængige lag, ikke ét:**
Christoffer har peget på at der er flere ting der kan "hænge sammen" på samme tid: spilleform (4+3 vs.
4+2 vs. 2+2 vs. motionist-format), niveau inden for samme spilleform (A/B/C/D eller pointgrænser), og
faktisk oprykning/nedrykning mellem konkrete puljer. Disse skal holdes adskilt som tre separate,
uafhængigt dokumenterede lag i stedet for én sammenblandet "forbindelse":

1. **Spilleform (familie).** Afledt af `match_categories`-signaturen (sæt af `category_raw`-værdier pr.
   kamp) for hver pulje, jf. ovenstående. To puljer er kun i samme familie hvis deres kategori-signatur
   er (tilnærmelsesvis) ens. Dette er den yderste, grovkornede gruppering — puljer i forskellige
   familier vises IKKE forbundet på nogen måde, uanset navnelighed.
2. **Niveau inden for samme spilleform.** Kun inden for samme familie: siderækkefølgen (opgave 085) eller
   et bogstav/pointgrænse-mønster i navnet bruges til at ordne puljer lodret. Dette er en formodet
   rækkefølge, ikke en bekræftet sammenlignelighed.
3. **Bekræftet oprykning/nedrykning.** Kun tegnes som en decideret pil/forbindelse i det visuelle kort når
   der er fundet konkrete hold i kildedataen der er flyttet mellem to specifikke puljer fra én sæson til
   den næste (jf. Mål 2-3). Dette er det stærkeste og sjældneste lag.

Det visuelle kort skal adskille disse tre lag visuelt (se udvidet Mål 6): fx farve/form for spilleform-
familie, en tynd/stiplet lodret linje for formodet niveau-rækkefølge inden for familien, og en tyk/farvet
pil kun for bekræftet oprykning. Foreslå selv en konkret farve-/linjekode i "Spørgsmål"-afsnittet — det
skal ikke bare "besluttes" undervejs uden at det fremgår hvorfor.

**Officielle regler er nu en selvstændig kildetype, ikke kun empiri.** Christoffer har spurgt om vi
også skal søge regler online — ja. Badminton Danmarks gældende holdturneringsreglement (fx
`Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-07-01...pdf` på badminton.dk) er
allerede blevet slået op i denne samtale og bekræfter den konkrete mekanik for Danmarksserien ↔
3. division: § 24 stk. 3 giver 4 direkte oprykninger (nr. 1 i hver af de 8 puljer, organiseret i 4
kvalifikationsgrupper A-D), § 24 stk. 4 og § 28 beskriver kvalifikationseventen (nr. 2 og 3 fra hver
kvalifikationsgruppe mødes på tværs af grupperne, sammen med nedrykningskandidater nr. 4-5 fra 3.
divisions nedrykningspuljer), og § 23 stk. 5 giver direkte nedrykning for nr. 6-8 i hver 3. divisions-
pulje. Dette er et konkret eksempel på hvordan officiel regeltekst kan bruges som en TREDJE kildetype
ved siden af (1) siderækkefølge og (2) empirisk fundet holdbevægelse — brug det som skabelon: for hver
"bekræftet oprykning"-forbindelse i kortet, angiv om belægget kommer fra regeltekst, fra faktisk fundne
hold i data, eller begge dele. Regeltekst alene (uden empirisk bekræftelse i vores egne data) bør
markeres tydeligt anderledes end en forbindelse der også er set ske i praksis — reglen fortæller hvad
der SKAL ske, ikke nødvendigvis hvad der historisk er sket i vores datasæt (fx ved regelændringer,
COVID-aflysninger, eller hold der trækker sig).

**Nedrykning, oprykning og kvalifikation er ikke ét lineært spor — de er retninger fra samme node.**
Christoffer har præciseret: nedrykning fra en pulje går til "den ene side", oprykning til "den anden
side", og kvalifikation er et separat mødepunkt der samler hold fra flere puljer (fx 8 hold fra 4
kvalifikationsgrupper i Danmarksserien-eksemplet ovenfor). Kortets nodemodel skal derfor være: hver
pulje-node kan have (a) en opadgående forbindelse (oprykning — til den pulje/det niveau holdet rykker
op til), (b) en nedadgående forbindelse (nedrykning), og (c) en sideværts forbindelse til en delt
kvalifikations-/slutspils-node som flere puljer peger ind i og ud af. Placér disse visuelt som forgreninger
fra puljen, ikke som ekstra trin i selve rækkefølge-kæden — samme princip som at "Finale"/"Bronzekamp"
ikke skal stå som deres eget niveau-trin (allerede besluttet ovenfor), men nu udvidet til at vise
RETNINGEN eksplicit.

## Mål

1. Udvid genparsingen af siderækkefølge (fra opgave 085's metode) til alle 33 regioner, alle
   aldersgrupper, for de sæsoner hvor `standing_indexes.raw_response` er gemt — stadig UDEN nye
   API-kald. Rapportér dækning (hvor mange sider/regioner/sæsoner kunne rekonstrueres, hvor mange kunne
   ikke, og hvorfor).
2. Test empirisk om regionale seniortopkredse "fødrer" Danmarksserien via faktiske
   oprykningshændelser i data (ikke antaget). Rapportér konkrete fundne eksempler eller dokumentér
   fraværet af tilstrækkeligt bevis.
2a. **Afled en "spilleform-signatur" for hver pulje** fra `match_categories.category_raw`-sammensætningen
   pr. kamp (mængden af distinkte kategorikoder, evt. suppleret med antal af hver). Grupper puljer i
   familier ud fra denne signatur — ikke ud fra det rå navnemønster. Rapportér hvor konsistent
   signaturen er inden for en pulje (samme signatur i alle kampe, eller varierer det?), og brug det som
   det yderste lag i klassificeringen, jf. Baggrund ovenfor.
2b. **Slå officielle op-/nedrykningsregler op for HELE hierarkiet, ikke kun Danmarksserien.**
   Danmarksserien ↔ 3. division (§ 23-24, § 28 i det gældende BD-holdturneringsreglement) er kun ÉT
   niveauovergang ud af mange der skal dækkes. Byg en udtømmende liste over de overgange der findes i
   vores data og slå regler op for hver af dem, mindst:
   - Hele BD-seniorstigen: Badmintonligaen ↔ 1. division ↔ 2. division ↔ 3. division ↔ Danmarksserien
     (samme reglement som Danmarksserien-eksemplet dækker formentlig hele stigen — bekræft det, antag
     det ikke).
   - Hver regions egen lokale seriestige under Danmarksserien (Københavnsserien/1.-33. Serie i BADKBH,
     Sjællandsserien/Serie 1-4 i BADSJ, Kredsserien Vest/Serie 1 Vest i BADFYN m.fl., samt de
     tilsvarende DGI-rækker som "Serie A/B/C/D - Double" i DGI-Nordjylland) — disse har med stor
     sandsynlighed HVER SIN region- eller kredsspecifikke reglement/vedtægt, ikke nødvendigvis det
     samme BD-reglement. Søg efter hver regions/kreds' eget reglement (fx på regionens egen hjemmeside,
     jf. mønsteret fra `badmintoninordjylland.dk`'s eget reglement-PDF som allerede er fundet i denne
     samtale) — antag IKKE at BD's regler gælder 1:1 for DGI eller for en lokal kreds.
   - Ungdomsrækkernes egne op-/nedrykningsregler, som med stor sandsynlighed er anderledes end senior
     (og som hænger sammen med spørgsmål A om hvornår pointbaseret pooling blev indført — reglerne kan
     selv have ændret sig over de 17 sæsoner).
   For hver overgang: dokumentér enten den fundne regel (med kilde/paragraf) eller at ingen offentlig
   regeltekst blev fundet — et "ikke fundet" er et gyldigt og vigtigt resultat, ikke en mangel der skal
   gættes udenom. Byg en oversigtstabel (niveau A ↔ niveau B, kilde, hvor mange der rykker direkte,
   hvor mange via kvalifikation) som en konkret leverance under `statistik/results/086-*`, ikke kun
   løst prosa. Brug det som kildetype nummer tre i kortets forbindelser, jf. ovenstående.
3. Test det samme for ungdom, afgrænset og forsigtigt — forvent og accepter et "nej" eller "for tyndt
   grundlag" som gyldigt svar.
4. Besvar spørgsmål A (rangliste-indførelsestidspunkt i ungdom) fra allerede gemt data.
5. Besvar spørgsmål B (spillerdrevet holdforskydning) afgrænset til et konkret, kendt udsnit (GSB),
   med samme forsigtighed som opgave 083's spillerkobling.
6. Udvid det eksisterende visuelle kort (artifact fra opgave 085, se Kontekst) til at dække alle 33
   regioner, med tre visuelt adskilte lag (jf. Baggrund):
   (a) **spilleform-familie** (Mål 2a) vist som farve/gruppe-adskillelse — puljer i forskellige familier
       tegnes ikke i samme kæde eller nær hinanden på en måde der antyder sammenlignelighed;
   (b) **formodet niveau inden for samme familie** (siderækkefølge/navnemønster) vist som en tynd/stiplet
       lodret forbindelse — tydeligt visuelt svagere end (c);
   (c) **bekræftet oprykning/nedrykning** (Mål 2-3) vist som en tydelig, farvet pil — KUN når der er
       fundet konkrete hold-til-hold-bevis, aldrig som en antagelse;
   samt (d) ungdomspuljer grupperet side om side uden automatiske forbindelser medmindre Mål 3 fandt
   bevis, og (e) et separat afsnit der viser fundet fra spørgsmål A og B. Foreslå den konkrete farve-/
   linjekode for (a)-(c) i "Spørgsmål"-afsnittet FØR kortet bygges, så Christoffer kan godkende kodningen
   — byg derefter selve den udvidede visualisering (HTML), da opgave 085 allerede etablerede at dette er
   et konkret, brugt værktøj, ikke kun et forslag.

## Kontekst

- `work/loeste/085-niveau-fra-rekkefoelge-og-skabelon.md` — metoden for genparsing af siderækkefølge,
  og de tre eksempler kortet allerede dækker.
- Det publicerede visuelle kort (artifact) bygget i denne chat ud fra 085's data — vis Christoffers
  chatsession dette hvis du har adgang til den, ellers byg videre på samme visuelle sprog: kæde af
  niveauer med prik/linje, orange stiplet kant for ikke-niveauer (spilletidssider), blå badges for delte
  puljer.
- `statistik/data/liga-landskab.db` — `league_groups`, `league_group_regions`, `standing_indexes`,
  `league_matches`, `match_categories`, `match_games`.
- `statistik/results/077-liga-regelsaet-katalog.md` — GSB's egen klassificering, fortsat brugbar som
  krydstjek.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/086-*`), nye scripts under
`statistik/scripts/`, ny/udvidet visualiserings-HTML under `statistik/results/` (eller tilsvarende sted
for visuelle artefakter i repoet — følg samme konvention som opgave 085 brugte, hvis en sådan blev
etableret). Skrivning i `liga-landskab.db` KUN hvis det følger samme afgrænsning som 085 (kun afledte
kolonner/tabeller der er eksplicit beskrevet og godkendt her — spørg i "Spørgsmål" før noget skrives,
byg det ikke stiltiende undervejs).

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/rangliste-historik.db` (kun læses — relevant for Mål 5's spillerkobling),
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. INGEN nye API-kald til
badmintonplayer.dk eller nembadminton.dk — alt arbejde skal ske ud fra allerede gemt rådata.

## Kontrol

**Målet:**
```
Genparsing af siderækkefølge er udvidet til alle 33 regioner, med rapporteret dækning.
Oprykning mellem regional seniortopkreds og Danmarksserien er testet empirisk, med konkrete eksempler
  eller en dokumenteret konklusion om utilstrækkeligt bevis.
Samme test er forsøgt for ungdom, afgrænset og uden at tvinge et resultat frem.
Sæsonen (eller sæsonintervallet) hvor ungdomsrækker skifter til pointbaseret navngivning er fundet eller
  dokumenteret som ikke entydig.
Et konkret, afgrænset fund om spillerdrevet holdforskydning i GSB findes, med usikre koblinger markeret
  som usikre.
Det visuelle kort er udvidet til alle 33 regioner efter samme principper.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye API-kald til badmintonplayer.dk/nembadminton.dk.
Ingen forbindelse/pil i det visuelle kort uden et konkret, citerbart databelæg (kamp-ID, hold-ID, eller
  sæson-til-sæson-reference) — "det giver mening" er ikke nok.
```

**Skøn:** ingen på om oprykningsbeviset er "nok" til at tegne en forbindelse i ungdom — vis det fundne
(eller det manglende) og lad Christoffer vurdere. Samme regel for spørgsmål A og B: rapportér det
fundne, konkludér ikke hårdere end dataen bærer.

## Ved tvivl

Er det uklart om to regionale rækker faktisk fødrer samme næste niveau, om en pointgrænse-navngivning
reelt markerer starten på rangliste-pooling (frem for blot en navngivningsvariation), eller om en
spillerkobling på tværs af aldersgrupper er den samme person: dokumentér som uafklaret i stedet for at
antage — samme princip som hele resten af projektet.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
