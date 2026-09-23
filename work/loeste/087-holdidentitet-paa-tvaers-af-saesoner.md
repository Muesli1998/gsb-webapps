# Opgave 087 — hold-identitet på tværs af sæsoner (klubnavne-normalisering + holdnummer-forskydning)

**Trin:** Selvstændig, dedikeret undersøgelse udsprunget af opgave 086e's mest markante fund: 1.353 af
1.584 "nye" hold i nabo-niveauer kunne IKKE afklares med den nuværende hypotese om hold-identitet.
Dette er nu selve flaskehalsen for al fremtidig op-/nedrykningsanalyse — det er "KAMPvigtigt" (Christoffers
egne ord) at få styr på, ikke en finjustering.

**Gren:** `arbejde/087-holdidentitet-paa-tvaers-af-saesoner`, fra `main` (086e er allerede merget,
commit `9b03d56`).

**Baggrund:** `league_matches.home_team_id`/`away_team_id` er bekræftet IKKE stabile på tværs af sæsoner
(opgave 086b — sporet gennem Gladsaxe Søborgs 17 sæsoner, ID'erne nulstiller/vokser friskt hver sæson).
Den nuværende arbejdshypotese ("samme klubnavn + samme holdnummer i to på hinanden følgende sæsoner =
samme hold", senior-only, jf. opgave 086b) er for simpel: 086e's fulde revision viste at langt de fleste
"nye" hold i et niveau ikke kunne matches tilbage til noget i niveauet under, hverken som "kandidaten selv"
eller "et andet hold fra samme klub".

Sandsynlige årsager, alle utestede indtil videre:
- Klubnavne skrives forskelligt år for år i kildedataen (samme problem som allerede løst for SPILLERnavne
  i `GSB_NAVNE_ALIAS_OG_ANOMALIER.json`/`netlify/lib/navne.js` — men det arbejde dækker kun spillere,
  ikke klubber).
- Holdnummer-forskydning: hvis en klubs "1. hold" nedlægges/rykker ekstra langt ned, kan "2. hold" blive
  det nye "1. hold" næste sæson uden at det er samme fysiske hold-identitet, eller omvendt.
- Klub-sammenlægninger/-opløsninger/-navneskift over årene (kendt fænomen i dansk badminton, ikke
  undersøgt systematisk her).
- Reelt nye hold (klubben starter et hold op der ikke fandtes før) — disse SKAL forblive uafklarede, det
  er ikke en fejl, men en ægte "nyt hold"-hændelse.

**Christoffers konkrete metodeforslag — "tvunget nedad fra toppen":** Badmintonligaen (topniveauet) har
ingen Øst/Vest-splittelse og et lille, lukket hold-antal pr. sæson. Det gør den til et markant nemmere
udgangspunkt end at forsøge at matche alle 1.022 kandidater på én gang: for Ligaen er søgerummet lille
nok til at man kan lave en FULD liste af samtlige hold i Ligaen én sæson, se hvilke af dem der IKKE er i
Ligaen næste sæson (kun ganske få nedrykkere pr. år, jf. reglementet), og dermed "tvinge" en sikker
identifikation af hvor de er landet i 1. division (begge puljer). Når 1. divisions hold-identiteter
dermed er kendte med høj sikkerhed, gentages samme øvelse ét niveau nedad (1. division → 2. division),
og så videre nedad gennem hele stigen, til man til sidst når Danmarksserien ↔ regionernes lokalserier.
Pointen: brug de SMÅ, lukkede niveauer øverst som en "anker" der forplanter sikkerhed nedad, i stedet for
at forsøge at løse hele identitetsproblemet fladt på én gang. Dette skal testes som en selvstændig metode
(Metode A nedenfor), ikke antages at virke — men er en lovende, konkret tilgang værd at prioritere højt.

**Test flere metoder parallelt og sammenlign bagefter — eksplicit godkendt at bruge ekstra usage på
dette.** I stedet for at vælge én metode på forhånd: byg 2-3 uafhængige metoder, kør dem hver for sig,
og sammenlign resultaterne. Hvor metoderne er enige, er det stærkt bevis for korrekt identifikation.
Hvor de er uenige eller kun én metode finder et match, marker det som lavere sikkerhed og vis det.

## Mål

**Byg og kør mindst tre uafhængige identifikationsmetoder, sammenlign dem, brug enighed som signal om
sikkerhed. Det er eksplicit godkendt at bruge god tid/usage på dette.**

1. **Kvantificér årsagsfordelingen bag de 1.353 uafklarede identiteter (baseline, før metoderne bygges).**
   Byg et udtræk (fra `086e-regler-dybde-og-fuld-revision.json` og `liga-landskab.db`) der kategoriserer
   hver af de 1.353 i grupper: (a) sandsynlig navnevariation af en kendt klub, (b) sandsynlig
   holdnummer-forskydning inden for samme klub, (c) ingen spor af klubben i niveauet nedenunder overhovedet
   (reelt nyt hold, eller klubben findes slet ikke i forvejen i datasættet), (d) andet/uafklaret. Rapportér
   fordelingen med konkrete eksempler pr. kategori — ikke kun et samlet tal.
2. **Metode A — "tvunget nedad fra toppen" (Christoffers forslag, prioriteres højt).** Start ved
   Badmintonligaen (lille, lukket hold-antal, ingen Øst/Vest-splittelse). For hver sæsonovergang: lav en
   fuld liste af ALLE hold i Ligaen, identificér hvilke der IKKE er i Ligaen næste sæson, og "tving" en
   sikker identifikation af hvor de lander i 1. division (begge puljer under ét, ikke pr. puljenummer —
   reshuffling gælder stadig). Brug den nu kendte 1. divisions-identitet som anker og gentag øvelsen ét
   niveau nedad ad gangen (1. div → 2. div → 3. div → Danmarksserien → regionale lokalserier).

   **Vigtig korrektion (Christoffer):** reglementets kendte op-/nedrykningsantal pr. niveau er IKKE en
   hård grænse — hold kan trække sig, hvilket ændrer det faktiske antal der reelt flytter niveau en given
   sæson. Brug det forventede antal som en vejledende forventning, ikke en hård constraint der udelukker
   matches. Undersøg desuden EMPIRISK (ikke antaget) om reglementet har en "fredningsregel": hvis et hold
   trækker sig fra det niveau det skulle være rykket TIL, bliver en ellers-nedrykket kandidat fra niveauet
   ovenover så "fredet" (dvs. forbliver på niveauet i stedet for at rykke ned), for at niveauet stadig
   fyldes op korrekt? Led efter dette i reglement-citaterne fra 086e (og evt. flere paragraffer/år hvis
   det ikke allerede er dækket) — dokumentér om reglen findes, og i så fald præcis hvordan den virker, før
   den bruges som forklaring på et konkret, observeret tilfælde i data.
3. **Metode B — klubnavne-normaliserings-/alias-mekanisme**, efter samme princip som `netlify/lib/navne.js`
   (Unicode NFC, whitespace-collapse, case-fold, ingen diakritik-stripning, ukendt navn → pass-through) —
   men anvendt på klubnavne i `league_matches`/`league_groups`, ikke spillernavne. Byg den som en ny, klart
   afgrænset tabel/kolonne (fx `club_name_canonical` eller en alias-mappingtabel) i `liga-landskab.db` —
   ikke en ændring af `club_registry`s rå data. Test den konkret mod GSB's egen kendte historik (Chris
   kender GSB's faktiske holdhistorik i detaljer — brug det som facit/ground truth først).
4. **Metode C — holdnummer-forskydningsregel.** Test om det er et konkret, gentagne gange forekommende
   mønster (ikke en enkeltstående antagelse) at klub X's "n. hold" forsvinder mens "(n+1). hold" fandtes
   sidste sæson og "n. hold" ikke findes nogen steder i indeværende sæson. Rapportér hvor mange af de 1.353
   dette forklarer, med konkrete eksempler.
5. **Sammenlign metode A, B og C direkte mod hinanden.** For hver af de 1.353 (og gerne også de allerede
   "løste" 131+92 fra 086e, som en sanity check): hvilke metoder finder et match, og er de ENIGE om samme
   match? Byg en oversigt: enige (alle/flere metoder finder samme match — høj sikkerhed), uenige (metoderne
   finder forskellige matches — flag til manuel/Christoffer-vurdering), kun én metode finder noget (middel
   sikkerhed), ingen metode finder noget (reelt uafklaret, eller reelt nyt hold).
6. **Genkør 086e's op-/nedrykningsrevision med den kombinerede, sammenlignede identitetsmodel** og
   rapportér den nye match-rate (var 131/92 præcise/samme-klub-fund af 1.022 — hvor meget stiger det?).
   Hvis det STADIG er lavt efter dette, er det et ægte, dokumenteret resultat — ikke noget der skal presses
   højere kunstigt.
7. **Dokumentér metoden, sammenligningen og facit-status i `statistik/results/086-liga-hierarki-viden-samlet.md`**
   (det levende referencedokument) — opdater afsnit 6 med det faktiske resultat, inkl. hvilken metode der
   viste sig mest pålidelig og hvorfor.

## Kontekst

- `statistik/results/086-liga-hierarki-viden-samlet.md` — det levende referencedokument denne opgave skal
  opdatere (afsnit 6 specifikt).
- `work/loeste/086e-regler-dybde-og-fuld-revision.md` + `statistik/results/086e-regler-dybde-og-fuld-revision.json`
  — kilden til de 1.353 uafklarede identiteter.
- `work/loeste/086b-oprykning-vestoest-regler-hypoteser.md` — den oprindelige, nu utilstrækkelige
  holdkontinuitets-hypotese.
- `netlify/lib/navne.js`, `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` — eksisterende, fungerende mønster for
  navne-normalisering (for spillere) der skal genbruges konceptuelt, ikke kopieres direkte.
- `docs/statistik-plan.md` (2026-09-16-beslutningen: "hold" må aldrig grupperes på `name_raw` alene) —
  beslægtet, allerede vedtaget princip for holdidentitet i UI-sammenhæng, værd at kende men ikke
  nødvendigvis direkte genbrugeligt her (den beslutning gælder navn+aldersgruppe+niveau inden for ÉN
  sæson, ikke identitet PÅ TVÆRS af sæsoner).

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/087-*`), nye scripts under
`statistik/scripts/`, opdatering af `statistik/results/086-liga-hierarki-viden-samlet.md`. Skrivning i
`liga-landskab.db` KUN til nye, klart afgrænsede afledte kolonner/tabeller til navnenormalisering —
spørg i "Spørgsmål" før noget skrives, byg det ikke stiltiende undervejs.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses), `statistik/data/rangliste-historik.db`,
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. INGEN nye API-kald til badmintonplayer.dk
eller nembadminton.dk.

## Kontrol

**Målet:**
```
De 1.353 uafklarede identiteter er kategoriseret med konkrete eksempler pr. kategori, ikke kun et tal.
En klubnavne-normaliserings-mekanisme findes, er testet mod GSB's kendte historik som facit, og er
  anvendt på hele datasættet.
Match-raten for op-/nedrykningsrevisionen er genberegnet med den forbedrede model, og forskellen til
  086e's oprindelige tal er rapporteret ærligt (også hvis den stadig er lav).
Det levende referencedokuments afsnit 6 er opdateret med det faktiske resultat.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye API-kald til badmintonplayer.dk/nembadminton.dk.
Enhver klub-alias-kobling har en begrundelse (streng-lighed efter normalisering, eller eksplicit
  bekræftet af Christoffer) — ingen gættede koblinger.
```

**Skøn:** ingen på om en navnevariation reelt er "samme klub" — hvis det er tvivlsomt, marker som usikker
og lad Christoffer bekræfte, brug GSB's egen historik som kalibrering af hvor sikker metoden skal være
før den bruges bredt.

## Ved tvivl

Er det uklart om to klubnavne i forskellige sæsoner er samme klub, eller om et holdnummer-skift dækker
over samme fysiske hold: dokumentér som uafklaret i stedet for at antage. Samme princip som resten af
projektet.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Spørgsmål — udført analyse (2026-09-23)

- Baseline: 1.353 `new_or_returning`-rækker fra 086e.
- Metode A fandt 43, metode B 6 og metode C 8. Kombinationer: 1.310 uden fund, 37 A-only, 6 A+B. Ingen A+B+C-enighed.
- Årsagsfordeling: 6 `likely_name_variation_or_exact_canonical`, 8 `likely_holdnummer_shift`, 1.310 `no_trace_of_club_in_lower_levels`, 29 `other_or_unresolved`. Konkrete eksempler ligger i JSON.
- 086e's kandidatpopulation på 1.022 blev genkørt med den kombinerede model og gemt række for række i `revisedCandidateSummary`.
- GSB-facitkalibrering gav 0 rækker i netop 1.353-populationen; der blev derfor ikke opfundet en GSB-konklusion ud fra en tom stikprøve.
- Der blev ikke skrevet til `liga-landskab.db`; canonicalisering er implementeret som en read-only afledt metode i scriptet, ikke som en stiltiende databasekolonne.

- `statistik/results/086-liga-hierarki-viden-samlet.md` er opdateret i afsnit 6.
- `gsb-statistik-normalized.db` SHA-256 før/efter: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` (uændret).
- Ingen nye API-kald; beskyttede mapper og databaser er urørte.
- Begrænsning: Metode A er en empirisk top-down-kontinuitetsmodel og bruger ikke et hårdt reglementstal. Metode B opfinder ingen aliaser; Metode C er kun et signal, ikke automatisk identitetsbevis.

## Opfølgning — eksplicit algoritme for en RIGTIG Metode A-kaskade (runde 3)

Den kørte Metode A fandt kun enkelt-hop-spor (43, med overlap, ikke tolkbare som unikke kæder) — den
oprindelige, prosa-beskrevne idé om en fuld, tvunget kaskade top-down er reelt ALDRIG blevet implementeret
endnu. Det er sandsynligvis her den største resterende gevinst ligger. Her er den skrevet som en
eksplicit, trin-for-trin algoritme i stedet for prosa, for at undgå fortolkningsrum:

```
for hvert par af på-hinanden-følgende sæsoner (S, S+1), øverste niveau (Ligaen) og nedad:

  niveau = Ligaen
  kendte_identiteter[niveau][S] = { alle hold i niveau, sæson S }  # fuld liste, ikke kun kandidater

  while niveau har et niveau nedenunder:
    naeste_niveau = niveau + 1  # fx 1. division, begge puljer under ét

    # 1. Find hvem der IKKE er i "niveau" i sæson S+1, blandt dem der VAR der i sæson S
    forsvundne = kendte_identiteter[niveau][S] - alle_hold[niveau][S+1]

    # 2. For hvert forsvundet hold: søg det i naeste_niveau, sæson S+1 (canonicaliseret navn,
    #    hele naeste_niveau, ikke en bestemt pulje)
    for hold in forsvundne:
      kandidater = find(hold.klub_canonical, naeste_niveau, S+1)
      if len(kandidater) == 1:
        match(hold -> kandidater[0], sikkerhed="høj", metode="A-kaskade", niveau_par=(niveau,naeste_niveau))
      elif len(kandidater) > 1:
        # flertydigt — hvilket af klubbens X hold i naeste_niveau er DET rigtige?
        # brug holdnummer-heuristik (Metode C) som tie-breaker, ellers marker uafklaret+flertydig
        ...

    # 3. Nu er naeste_niveau, sæson S+1's identiteter delvist kendt (dem der kom fra niveau ovenover).
    #    Resten af naeste_niveau, sæson S+1 er enten (a) hold der var der i forvejen i sæson S
    #    (identificeres direkte, samme niveau, canonicaliseret navn) eller (b) hold der er nye/kom
    #    nedefra (løses når kaskaden når HERTIL i næste iteration, fra niveauet under).
    kendte_identiteter[naeste_niveau][S] = alle_hold[naeste_niveau][S]
    niveau = naeste_niveau

  # gentag heltal nedad indtil Danmarksserien ↔ regionale lokalserier
```

**Krav til rapporteringen af denne kørsel:**
1. Rapportér ANTAL UNIKKE KÆDER (ikke enkelt-hop-spor) — en kæde er en fuld, sammenhængende sti for ét
   hold gennem så mange niveauer/sæsoner som den kan følges, ikke ét tal pr. niveau-par.
2. Rapportér niveau-for-niveau hvor kaskaden reelt lykkes vs. hvor den løber tør (fx "successrate 80% fra
   Ligaen→1.div, men kun 20% fra 3.div→Danmarksserien fordi der er langt flere klubber/mere navnestøj på
   det niveau").
3. Rapportér antal flertydige tilfælde (>1 kandidat i næste_niveau) og hvordan de blev håndteret.
4. Sammenlign SLUTRESULTATET (efter fuld kaskade) med Metode B/C og det udvidede søgeresultat fra runde 2
   (68 nye spor, 1.285 stadig uafklarede) — hvor mange af de 1.285 løser den fulde kaskade?

Hvis den fulde kaskade STADIG kun finder få hundrede eller færre, er det et ærligt, endeligt resultat —
ikke noget der skal presses. Men algoritmen skal være afprøvet i sin fulde, tiltænkte form først.

## Runde 4 — klub-navneskift/-fusioner (Christoffers hypotese, konkret eksempel: Vendsyssel)

Runde 3's fulde kaskade gav et konsistent lavt resultat (5-8%) på tværs af ALLE niveaupar — for stabilt
til at være en scope-/søgefejl, men det forklarer ikke HVORFOR raten er lav. Christoffer peger på en
konkret, sandsynlig forklaring: rene klub-NAVNESKIFT og -FUSIONER, som canonical-normalisering (Metode B)
aldrig kan fange, fordi de nye og gamle navne ikke minder om hinanden tekstligt (fx "Vendsyssel" som en
fusion af Frederikshavn/Skagen/en tredje klub — ikke en stavevariant af noget).

**Vigtigt designprincip for denne runde:** en bekræftet klub-omdøbning/fusion er en egenskab ved
KLUBBEN, ikke ved det enkelte hold. Når "Vendsyssel = Frederikshavn (+ evt. flere)" er bekræftet, gælder
det automatisk for ALLE den klubs hold på ALLE niveauer og i ALLE sæsoner — ikke kun det hold der
oprindeligt udløste fundet. Byg alias-tabellen sådan (klub_id/klub_canonical → liste af historiske navne,
ikke hold_id → hold_id), adskilt fra Metode B's tekst-normalisering.

### Mål (runde 4)

1. **Byg en kompakt, menneskeligt læsbar oversigt over Badmintonligaen, år for år, alle 17 sæsoner** —
   kun klubnavne/holdnavne, ingen anden data. Skal kunne læses og vurderes af Christoffer på et par
   minutter.
2. **List de ~195 uafklarede Ligaen→1.division-overgange fra runde 3 eksplicit** (Ligaen havde 206
   forsøg, kun 11 blev tvunget ned). For hver: vis hvilke hold der REELT var i 1. division den
   efterfølgende sæson (ikke kun dem der matcher canonical-tærsklen — også "nær-kandidater" der blev
   afvist), så Christoffer kan genkende en fusion/omdøbning ud fra egen viden.
3. **Websøg efter kendte klub-sammenlægninger/navneskift i dansk badminton** (fx "Vendsyssel Badminton
   historie Frederikshavn Skagen", og generelt efter regionale klubfusioner) som et forspring, inden
   Christoffer gennemgår listen manuelt. Dette er research på åbne kilder, IKKE et kald til
   badmintonplayer.dk/nembadminton.dk, og er derfor inden for afgrænsningen.
4. **Byg en klub-niveau alias-/fusionstabel** i `liga-landskab.db`, klart adskilt fra Metode B's
   tekst-canonicalisering — kun bekræftede koblinger (fra Christoffer eller en citerbar kilde), ingen
   gættede. Anvend den på ALLE den pågældende klubs hold, alle niveauer, alle sæsoner.
5. **Genkør runde 3's kaskade med alias-tabellen anvendt**, start ved Ligaen og arbejd nedad ét niveau ad
   gangen (som Christoffer foreslog), og rapportér den nye succesrate pr. niveaupar sammenlignet med
   runde 3's tal. Forvent at dette primært løfter de øverste niveauer markant (Ligaen er lille og
   Christoffer kender den bedst) og propagerer nedad i mindre grad efterhånden.

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*


## Opfølgende spørgsmål — metodekontrol (2026-09-23)

1. **Metode A:** Første version kørte ikke en fuld tvungen unik kaskade. Den lavede kun direkte lavere-niveau-opslag. De 43 fund er derfor ikke dokumentation for at Liga→1. division→2. division→3. division→Danmarksserien blev gennemløbet som en sikker kaskade; `cascadeByLevel` i JSON viser præcis hvilke direkte spor der blev fundet.
2. **"Intet spor":** De 1.310 blev først søgt i niveauerne under den aktuelle kandidat. En udvidet søgning i hele foregående sæsons seniorhierarki med canonicaliserede navne fandt 68 yderligere spor. Den oprindelige 97 %-formulering var derfor for bred; 1.285 har stadig intet canonical match i hele hierarkiet, med overlap til de øvrige metodefund.
3. **Fredning:** Ja, 2026 §26 stk. 3 siger: "Hvis klubbens oprindelige hold i en række skulle være oprykningsberettiget fra den netop afviklede turnering, annulleres en eventuel nedrykning for klubbens højere liggende hold, og begge hold fortsætter således i deres respektive rækker i den følgende turnering." Det er en specifik klub-/oprykningssituation, ikke en generel tilbagetrækningsregel, og den blev ikke brugt som automatisk identitetsbevis.

Resultatrapporten og det levende liga-hierarki-dokument er opdateret med denne afgrænsning.

## Spørgsmål — udført analyse runde 3 (2026-09-23)

Den eksplicitte Metode A-kaskade er nu faktisk kørt. Teamnoder blev deduplikeret på sæson, niveau, canonical klubnavn og holdnummer. Der blev først brugt entydigt samme-niveau-match i næste sæson; ved intet samme-niveau-match blev ét niveau ned forsøgt. Flertydige kandidater blev ikke tvunget.

| Niveaupar | Forsøg | Samme niveau | Tvang nedad | Flertydige | Intet entydigt match |
|---|---:|---:|---:|---:|---:|
| Ligaen → 1. division | 206 | 138 | 11 | 0 | 57 |
| 1. division → 2. division | 241 | 121 | 17 | 0 | 103 |
| 2. division → 3. division | 387 | 156 | 30 | 0 | 201 |
| 3. division → Danmarksserien | 763 | 285 | 50 | 0 | 428 |
| Danmarksserien → regional lokalserie | 1.091 | 483 | 68 | 0 | 540 |

Der blev fundet 206 Liga-startpunkter, 34 unikke kæder med mindst én tvungen nedadgående overgang, 0 kæder der nåede entydigt til Danmarksserien/regional lokalserie og 0 flertydige overgange efter deduplikering. Kaskaden ramte 4 af runde 2's 1.285 rækker uden hele-hierarki-canonical match på samme sæson, niveau og canonicaliserede klub. Resultatet er et dokumenteret lavt matchtal, ikke en tvungen identitet.

## Resultatnote — runde 3

- Script: `statistik/scripts/087-round3-cascade.mjs`.
- Rapporter: `statistik/results/087-round3-cascade.md` og `.json`.
- Database/API: kun read-only database, 0 nye API-kald, 0 databaseændringer.
- Konklusion: den fulde kaskade er afprøvet; 34 unikke tvungne kæder og 4 overlap med runde-2-populationen, men ingen fulde kæder til Danmarksserien/lokalserie.
