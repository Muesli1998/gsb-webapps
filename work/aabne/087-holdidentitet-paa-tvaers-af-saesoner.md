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

## Mål

1. **Kvantificér årsagsfordelingen bag de 1.353 uafklarede identiteter.** Byg et udtræk (fra
   `086e-regler-dybde-og-fuld-revision.json` og `liga-landskab.db`) der kategoriserer hver af de 1.353 i
   grupper: (a) sandsynlig navnevariation af en kendt klub (samme klub, stavet forskelligt), (b) sandsynlig
   holdnummer-forskydning inden for samme klub, (c) ingen spor af klubben i niveauet nedenunder overhovedet
   (reelt nyt hold, eller klubben findes slet ikke i forvejen i datasættet), (d) andet/uafklaret. Rapportér
   fordelingen med konkrete eksempler pr. kategori — ikke kun et samlet tal.
2. **Byg en klubnavne-normaliserings-/alias-mekanisme for liga-data**, efter samme princip som
   `netlify/lib/navne.js` (Unicode NFC, whitespace-collapse, case-fold, ingen diakritik-stripning, ukendt
   navn → pass-through) — men anvendt på klubnavne i `league_matches`/`league_groups`, ikke spillernavne.
   Byg den som en ny, klart afgrænset tabel/kolonne (fx `club_name_canonical` eller en alias-mappingtabel)
   i `liga-landskab.db` — ikke en ændring af `club_registry`s rå data. Test den konkret mod GSB's egen
   kendte historik (Chris kender GSB's faktiske holdhistorik i detaljer — brug det som facit/ground truth
   før metoden generaliseres til hele datasættet).
3. **Test en udvidet holdnummer-forskydningsregel** for senior: hvis klub X's "n. hold" ikke findes i en
   sæson, men X's "(n+1). hold" fandtes sidste sæson og X's "n. hold" ikke findes i nogen pulje i indeværende
   sæson — undersøg om det er et konkret, gentagne gange forekommende mønster (ikke kun en enkeltstående
   antagelse) før det bruges til at "forbinde" hold på tværs af sæsoner. Rapportér hvor mange af de 1.353
   dette forklarer, med konkrete eksempler.
4. **Genkør 086e's op-/nedrykningsrevision med den forbedrede identitetsmodel** og rapportér den nye
   match-rate (var 131/92 præcise/samme-klub-fund af 1.022 — hvor meget stiger det med bedre matching?).
   Hvis det STADIG er lavt efter dette, er det et ægte, dokumenteret resultat — ikke noget der skal
   presses højere kunstigt.
5. **Dokumentér metoden og facit-status i `statistik/results/086-liga-hierarki-viden-samlet.md`** (det
   levende referencedokument oprettet efter 086e) — opdater afsnit 6 med det faktiske resultat, ikke kun en
   henvisning til denne opgave.

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

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
