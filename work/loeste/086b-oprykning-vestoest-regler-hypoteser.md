# Opgave 086b — oprykning som bevis, Vest/Øst på hvert niveau, officielle regler, ungdom-rangliste, holdforskydning

**Trin:** Empiri- og hypotesearbejde, bygger på opgave 086a's fundament (fuld siderækkefølge,
spilleform-signatur, klub-register). Dette er den del hvor "gæt aldrig"-disciplinen vejer tungest — flere
delspørgsmål kan legitimt ende med "utilstrækkeligt bevis", og det er et gyldigt resultat, ikke en
mangel. Del 2 af 3 i opsplitningen af det oprindelige 086-kort.

**Gren:** `arbejde/086b-oprykning-vestoest-regler-hypoteser`, jf. `AGENTS.md`. Forudsætter at opgave
086a er merget til `main` (eller ranker denne gren ovenpå 086a's gren, hvis 086a stadig er åben —
afklar rækkefølgen med Christoffer før du starter hvis det er uklart).

**Baggrund (opdateret efter 086a's afslutning):** Opgave 086a hentede et klub → hjemmeregion-register
via `SearchClubInfo`, men endpointet leverer kun klubnavn og postnummer — IKKE hjemmeregion.
`club_registry.region_id` er derfor `NULL` for alle 796 klubber, korrekt uden gæt. Det betyder Mål 3's
Vest/Øst-sporing (og Mål 1's "hvilke lokale hold rykkede op")  IKKE kan slå region op direkte i
`club_registry` — brug i stedet en af disse to metoder (eller begge, og sammenlign): (a) postnummer-
mønstre fra `club_registry.postal_code` sammenholdt med `regions`-tabellens kendte geografi, eller
(b) hvilke regionale ligaer/puljer klubbens hold historisk har spillet i (dvs. udled klubbens
"hjemmeregion" empirisk fra hvor de allerede findes i `league_matches`/`league_groups`, i stedet for fra
et eksternt opslag). Metode (b) er formentlig den mest robuste, da den bygger på faktisk spilleaktivitet
snarere end en administrativ adresse, som ikke nødvendigvis følger den sportslige regionsinddeling. Marker
tydeligt i resultatdokumentet hvilken metode der blev brugt for hvert fund.

Efter at have set det visuelle kort fra opgave 085 har Christoffer rejst en række konkrete,
empirisk testbare spørgsmål om hvordan puljer reelt hænger sammen. Ingen af dem skal besvares ved at
"det giver mening" — kun ved faktisk fundet databelæg, regeltekst, eller en dokumenteret konklusion om
at beviset er for tyndt.

**Tre uafhængige forbindelseslag — hold dem adskilt:**
1. **Spilleform (familie)** — fra opgave 086a's signatur. To puljer er kun sammenlignelige hvis de har
   (tilnærmelsesvis) samme signatur.
2. **Formodet niveau inden for samme spilleform** — fra siderækkefølgen (086a) eller bogstav/pointgrænse
   i navnet. En formodning, ikke en bekræftet sammenlignelighed.
3. **Bekræftet oprykning/nedrykning** — kun når konkrete hold er fundet flyttet mellem to specifikke
   puljer fra én sæson til den næste, eller når en officiel regel eksplicit beskriver overgangen (marker
   altid hvilken af de to kilder — eller begge — der ligger bag).

**Holdkontinuitet — en godkendt arbejdshypotese for SENIOR, ikke et databevis.** `home_team_id` er
bekræftet ustabilt på tværs af sæsoner (opgave 086a). Christoffer har godkendt: for SENIOR specifikt kan
samme klub + samme holdnummer (fx "Gladsaxe Søborg 1") i to på hinanden følgende sæsoner antages at være
samme hold, uden yderligere bevis. Dette gælder IKKE for ungdom, hvor holdsammensætning er langt mere
flydende (jf. Mål 5's egen hypotese om spillerforskydning). Marker denne hypotese tydeligt som en
antagelse hver gang den bruges, adskilt fra klub-registrets (086a) rigtige data.

**Nedrykning, oprykning og kvalifikation er retninger fra samme node, ikke ét lineært spor.** Hver
pulje kan have en opadgående forbindelse (oprykning), en nedadgående (nedrykning), og en sideværts
forbindelse til en delt kvalifikations-/slutspils-node som flere puljer peger ind i og ud af — bekræftet
konkret eksempel: Danmarksserien ↔ 3. division har 4 kvalifikationsgrupper (A-D), hver bestående af 2
puljer, hvor nr. 1 rykker direkte op, nr. 2/3 mødes på tværs af grupperne i en kvalifikationsevent
sammen med nedrykningskandidater (nr. 4-5) fra 3. divisions nedrykningspuljer, og nr. 6-8 rykker direkte
ned (§ 23 stk. 5, § 24 stk. 3-4, § 28 i det gældende BD-holdturneringsreglement, allerede opslået).

## Mål

1. **Test empirisk om regionale seniortopkredse "fødrer" Danmarksserien** via faktiske
   oprykningshændelser i data. Model: 4 kvalifikationsgrupper à 2 puljer (ikke 8 separate bokse, ikke
   én samlet boks), med kval-noder der kan modtage forbindelser fra to niveauer samtidig (oprykning
   nedefra + nedrykning ovenfra). Rapportér konkrete fundne eksempler eller dokumentér utilstrækkeligt
   bevis.
2. **Slå officielle op-/nedrykningsregler op for HELE seniorhierarkiet, ikke kun Danmarksserien ↔
   3. division:**
   - Hele BD-seniorstigen: Badmintonligaen ↔ 1. division ↔ 2. division ↔ 3. division ↔ Danmarksserien
     — bekræft om samme reglement dækker hele stigen, antag det ikke.
   - Hver regions egen lokale seriestige (Københavnsserien/BADKBH, Sjællandsserien/BADSJ, Kredsserien
     Vest/BADFYN m.fl., DGI's egne rækker) — søg efter hver regions/kreds' eget reglement (jf. mønsteret
     fra Nordjyllands eget reglement-PDF, allerede fundet). Antag IKKE at BD's regler gælder 1:1.
   - Ungdommens egne op-/nedrykningsregler.
   - Christoffer har desuden nævnt konkrete deltager-lofter (fx maks. 5 hold pr. klub i DH-turneringen,
     maks. 2 hold pr. klub i Danmarksserien) — bekræft disse tal i regelteksten og notér dem, de er
     relevante for et fremtidigt "hvor mange hold må en klub have"-tjek.
   For hver overgang: dokumentér den fundne regel (med kilde/paragraf) eller at ingen offentlig
   regeltekst blev fundet. Byg en konkret oversigtstabel (niveau A ↔ niveau B, kilde, antal direkte,
   antal via kvalifikation) i `statistik/results/086b-*`, ikke kun løs prosa.
3. **Test om Danmarksseriens puljer 1-4 vs. 5-8 splitter Vest/Øst, og udvid testen til HVERT niveau i
   BD-seniorstigen** (Badmintonligaen, 1., 2., 3. division, Danmarksserien). Christoffers erfaring: 3.
   division Vest i pulje 1-2, Øst i 3-4; 2. division Vest i pulje 1, Øst i pulje 2; 1. division samme
   mønster; Badmintonligaen forventes IKKE at have en generel geografisk opdeling. Brug holdkontinuitet
   (senior-hypotesen ovenfor) og klub-registret (086a) til at spore hvor hold historisk kom fra.
   Rapportér det faktiske mønster pr. niveau — bekræftet, blandet, eller ikke bekræftet — og brug KUN
   bekræftede fund til at forbinde en lokalseries topkreds til en specifik kvalifikationsgruppe/pulje.
   **Gælder kun senior (age_group_id 1).** Ingen overhængende national liga for ungdom (kun DMU) eller
   veteran (koncentreret i Badminton København). Anvend IKKE denne model på ungdom eller veteran. Hvis
   det er let at bekræfte at veteranrækker (age_group_id 8-14, 17, 19, 22, 28) reelt er koncentreret i
   BADKBH, er det en fin sidebemærkning — ikke et mål i sig selv.
4. **Test det samme spørgsmål (om puljer på tværs af regioner reelt "hænger sammen") for ungdom,
   afgrænset og forsigtigt.** Forvent og accepter "nej" eller "for tyndt grundlag" som gyldigt svar.
   Ungdomspuljer må IKKE forbindes automatisk ud fra navnelighed — kun ved konkret op-/
   nedrykningsbevis mellem specifikke puljer på tværs af sæsoner.
5. **Hvornår gik ungdomsrækker over til pointbaseret rangliste-pooling?** Find den faktiske sæson hvor
   `division_name_raw` skifter fra bogstavniveau (A/B/C/D) til pointgrænse-format (fx "U15 A, 6800"),
   pr. aldersgruppe — direkte tjekbart i allerede gemt data, ingen nye kald. Rapportér det fundne
   skiftetidspunkt, eller dokumentér at det er gradvist/inkonsistent på tværs af aldersgrupper/regioner.
6. **Spillerdrevet "holdforskydning" mellem aldersgrupper — synligt i data?** Christoffers hypotese: en
   stærk årgang (fx GSB's U13) kan mangle et hold i en yngre aldersgruppe en sæson, fordi spillerne
   allerede spiller i en ældre aldersgruppe. Brug `match_categories`' spiller-ID'er (samme forsigtighed
   som `player_link` i opgave 083 — spor på ID, ikke kun navn). Afgræns til GSB som konkret, kendt
   udsnit — ikke en generalisering over hele landskabet.

## Kontekst

- `work/loeste/086a-*.md` (når afsluttet) — siderækkefølge for alle 33 regioner, spilleform-signatur,
  `club_registry`-tabellen.
- `work/loeste/085-niveau-fra-rekkefoelge-og-skabelon.md`, `work/loeste/084-liga-landskab-rangering.md`.
- Badminton Danmarks gældende holdturneringsreglement (allerede delvist opslået i denne samtale, fx
  `badminton.dk/wp-content/uploads/2026/07/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-07-01-endeligt-med-bilag-3-1.pdf`)
  og eksempel på et regionalt eget reglement (`badmintoninordjylland.dk`).
- `statistik/results/084-liga-landskab-rangering.md`, `077-liga-regelsaet-katalog.md`.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/086b-*`), nye scripts under
`statistik/scripts/`. Skrivning i `liga-landskab.db` KUN til afledte tabeller der er eksplicit
beskrevet og godkendt her (fx en `confirmed_promotions`-tabel til Mål 1/3's fund) — spørg i
"Spørgsmål" før noget andet skrives.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/rangliste-historik.db` (kun læses — relevant for Mål 6), `apps/netlify-prod/`,
`kampsystem/`, `klubstatistik-preview/`. INGEN nye API-kald til badmintonplayer.dk eller
nembadminton.dk — al empiri skal komme fra allerede gemt rådata (inkl. 086a's klub-register) og
websøgning efter offentlig regeltekst.

## Kontrol

**Målet:**
```
Oprykning mellem regional seniortopkreds og Danmarksserien er testet empirisk (4-kvalgruppe-model), med
  konkrete eksempler eller en dokumenteret konklusion om utilstrækkeligt bevis.
En oversigtstabel over officielle op-/nedrykningsregler for hele seniorhierarkiet findes, med kilde pr.
  overgang eller en dokumenteret "ikke fundet".
Vest/Øst-mønsteret er testet empirisk for hvert niveau i BD-seniorstigen, med et rapporteret resultat
  pr. niveau (bekræftet/blandet/ikke bekræftet).
Samme grundspørgsmål er forsøgt for ungdom, uden at tvinge et resultat frem.
Sæsonen hvor ungdomsrækker skifter til pointbaseret navngivning er fundet eller dokumenteret som ikke
  entydig.
Et konkret, afgrænset fund om spillerdrevet holdforskydning i GSB findes, med usikre koblinger markeret.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye API-kald til badmintonplayer.dk/nembadminton.dk.
Ingen "bekræftet oprykning" uden et konkret, citerbart databelæg (kamp-/hold-referencer) eller en
  citeret paragraf fra en offentlig regeltekst — "det giver mening" er ikke nok.
```

**Skøn:** ingen på om et oprykningsbevis, et Vest/Øst-mønster, eller en spillerkobling er "sikkert nok".
Rapportér det fundne, konkludér ikke hårdere end dataen/kilden bærer, og lad Christoffer vurdere.

## Ved tvivl

Er det uklart om to regionale rækker faktisk fødrer samme næste niveau, om en pointgrænse-navngivning
reelt markerer starten på rangliste-pooling, eller om en spillerkobling på tværs af aldersgrupper er
samme person: dokumentér som uafklaret i stedet for at antage.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*

## Spørgsmål — udført analyse

### Metode og værn

Analysen brugte kun allerede gemte data i `statistik/data/liga-landskab.db`, `gsb-statistik-normalized.db` og `rangliste-historik.db` (ingen nye API-kald). `gsb-statistik-normalized.db` havde SHA-256 før/efter `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; beskyttede stier var rene. Scriptet er `statistik/scripts/086b-oprykning-vestoest-regler-hypoteser.mjs`; tal og eksempler ligger i `statistik/results/086b-oprykning-vestoest-regler-hypoteser.md/.json`.

### Mål 1 — regional seniortopkreds og Danmarksserien

Der er 94 GSB-seniorrækker. En bred kandidat-søgning på samme normaliserede klub/holdnavn i på hinanden følgende sæsoner fandt 312 mulige overgange, bl.a. mellem lokale serier, kvalifikationsrækker, Danmarksserien og nedrykningsrækker. Populationen er for bred til at være et oprykningsbevis, fordi samme navn forekommer i flere samtidige puljer og holdnummeret ikke er en stabil nøgle. Ingen overgang er derfor markeret som bekræftet. 4-kvalifikationsmodellen er kompatibel med den citerede DH-regeltekst, men den gemte empiri alene dokumenterer ikke hvilke regionale topkredse der føder hvilken kvalifikationsgruppe.

### Mål 2 — officielle regler

Kildetabellen i resultatrapporten har en kilde eller et eksplicit “ikke fundet” pr. område. Badminton Danmarks reglementsindeks bekræfter en fælles DH-kilde for seniorstigen og en separat ungdomskilde. Den konkrete 3. division–Danmarksserien-overgang er allerede dokumenteret i repoets 084/086-kildegrundlag (§23 stk. 5, §24 stk. 3–4 og §28). Badminton København §§8–12, Badminton Sjælland §5/§8/Appendix 1 og Holdturnering Fyn §§12–13 giver regionale eksempler. De nævnte lofter på maks. 5 DH-hold og maks. 2 Danmarksseriehold blev ikke eksplicit fundet i de undersøgte offentlige tekster og står derfor som “ikke fundet”.

### Mål 3 — Vest/Øst

`club_registry.region_id` er NULL. Den afprøvede er en eksplicit postal heuristik (`<5000` øst, `>=5000` vest) efter eksakt normaliseret klubnavn. Den gav ingen helt øst-/vestklassificerede puljer: 3. division 44 blandede/142 ukendte, Danmarksserien 61/210, Badmintonligaen 0/93, 1. division 5/57 og 2. division 23/67 (blandet/ukendt). Resultatet er derfor “ikke bekræftet”; der bygges ingen Vest/Øst-forbindelse. Pulje 1–4/5–8-resultaterne og rå eksempler findes i JSON, men ukendte/mixede grupper bruges ikke som bevis.

### Mål 4 — ungdom

Ingen identisk normaliseret `division_name_raw`-tekst forekom på tværs af regioner i den afgrænsede søgning (0 kandidater). Det er ikke et bevis for, at ungdomsrækker ikke hænger sammen; det betyder kun, at der ikke er et sikkert råtekstsignal. Ungdomspuljer forbindes ikke automatisk.

### Mål 5 — bogstav/pointnavngivning

Rådata viser pointformat tidligst i sæson 2019 for age_group_id 2–5 og 18/21, mens bogstavformat fortsætter til senere sæsoner. Senior (1) har pointformat fra 2023. For øvrige aldersgrupper er pointformat ikke fundet. Der er altså ikke én global skiftedato; skiftet er aldersgruppe- og rækkeafhængigt.

### Mål 6 — GSB-spillerforskydning

Der er 80.928 kategori-spillerrækker fra GSB-kampe, 9.676 distinkte spiller-ID’er og 1.405 ID’er, der optræder i mere end én aldersgruppe i samme sæson. Det er et konkret ID-baseret signal om mulig aldersgruppe-overlap/forskydning, ikke årsagsbevis; navn-only links er ikke brugt. Eksempler og sæson/age-lister ligger i JSON.

### Foreløbig konklusion

Mål 1, 3 og 4 giver ikke tilstrækkeligt databevis til automatiske forbindelser. Mål 2 giver kildesteder og flere dokumenterede regionale regler, men ikke alle historiske overgangsparagraffer i én maskinlæsbar tabel. Mål 5 viser et gradvist/inkonsistent skifte. Mål 6 viser et målbart spiller-ID-signal, som kan bruges til en senere manuel/regelbaseret analyse.

## Resultatnote

- Script: `statistik/scripts/086b-oprykning-vestoest-regler-hypoteser.mjs`
- Rapport: `statistik/results/086b-oprykning-vestoest-regler-hypoteser.md/.json`
- Værn: normaliseret DB uændret; ingen nye API-kald; ingen skrivning til `liga-landskab.db`.
- Kontroltal: 94 GSB-seniorrækker, 312 overgangskandidater, 0 ungdoms-råtekst-kandidater, 80.928 spillerrelationer, 9.676 spiller-ID’er, 1.405 multi-age/sæson-ID’er.
