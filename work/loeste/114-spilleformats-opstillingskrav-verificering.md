# Opgave 114 — verificér efterskole-formaterne (4 spillere-variant vs. faktisk spillerantal) og kobl til gsb-statistik-normalized.db

## Baggrund

Under en manuel gennemgang af opgave 112/113's katalog (session 2026-09-27) blev flere
konkrete fund gjort, som skal dokumenteres og delvist efterprøves:

1. **112-bug (allerede kendt, IKKE rettet her)**: `spillefamilie`-feltet i
   `statistik/scripts/112-generate-spilleformats-katalog.mjs` er altid det tekst-genkendte
   mønster fra `division_name_raw`/`group_name_raw`, ikke afledt af `category_signature`,
   selvom `spillefamilie_source` fejlagtigt viser "kategorisignatur" når en signatur findes
   ved siden af. Dette skal rettes i en senere, større 112-opdatering — ikke denne opgave.

2. **Reelt manglende category_raw-data (allerede undersøgt, bekræftet)**: Codex undersøgte
   read-only 8 konkrete puljer uden kategorisignatur og fandt at 7/8 reelt mangler
   `match_categories`-data i kilden (0 kampe med category_raw), mens kontrolpuljen
   (11035, Kredsserie Vest 2018) havde category_raw for alle 28 kampe. Konklusion: det er
   ægte datamangel, ikke et join-problem i 112.

3. **Officielle/kanoniske signaturer for de seks navngivne ungdomsformater** (udledt ved at
   filtrere combinations på `spillefamilie === token` og se hvilken `category_signature`
   der dominerer inden for ren ungdom, U09-U17/U19, UNG udelukket som aggregat):
   - **4+3**: Mix2/DS2/DD1/HS2/HD2 (9 kampe) — 100% entydig
   - **3 spillere**: S4/D1 (5 kampe) — 100% entydig
   - **4 spillere**: S4/D2 (6 kampe) — 100% dominerende
   - **2+2**: Mix2/DS2/DD1/HS2/HD1 (8 kampe) — 96% dominerende
   - **4+2**: Mix1/DS1/DD1/HS3/HD2 (8 kampe, kønnet) — 76% officiel; 17% er samme reelle
     kampe men uden kønsmærkning i kilden (Mix1/DS1/DD1/S3/D2) og bør folkes ind som
     samme format
   - **4 piger**: DS4/DD2 (6 kampe, kønnet) — 53% officiel; 47% er samme reelle kampe uden
     kønsmærkning (S4/D2) og bør foldes ind som samme format
   - Regel etableret: hvor et navngivet format optræder med både en kønnet og en ukønnet
     signaturvariant med samme Mix/DS/DD-tal, er den kønnede den officielle, og den
     ukønnede er en mærkningsinkonsekvens i kilden — IKKE et separat format.

4. **Uafklaret rest**: en gruppe på 1411 forekomster med signatur S4/D2 (samme struktur som
   "4 spillere"-kanonen) UDEN at teksten indeholder et af de seks kendte formatord. Det kan
   være fejlmærkede "4 piger"-rækker (S4/D2 er identisk struktur med "4 piger"s ukønnede
   variant) eller ægte "4 spillere". Kan IKKE afgøres fra `liga-landskab.db` alene, da den
   ikke indeholder spillernavne/køn.

5. **To formater identificeret ved DGI-efterskoleturneringer, endnu ikke verificeret mod
   faktisk spillerantal**:
   - S4/D4 (8 kampe): teksten siger "4 SP."/"4 spillere" — men ANTAGELSEN om at det reelt
     er 4 spillere (ikke flere) er IKKE testet mod faktisk spillerdata. Christoffer
     efterspurgte eksplicit at dette skal verificeres, ikke antages.
   - S4/D3 (7 kampe): teksten siger eksplicit "**5 Spillere**" ("EFTERSKOLETURN. 5
     Spillere", "5 Spillere C række 4si. 3do.") — dette er et hidtil ukatalogiseret,
     syvende navngivet format.

6. **Mulig datakilde til verificering fundet**: `statistik/data/gsb-statistik-normalized.db`
   har `individual_match_players`/`players`/`individual_matches`/`team_matches` med
   spillernavne pr. kamp og `team_matches.external_match_id`, som i teorien matcher
   `liga-landskab.db`'s `external_match_id`. To kendte begrænsninger, IKKE afklarede:
   - `team_matches` er filtreret på `gsb_team_id` — er databasen kun GSB's egne kampe,
     eller findes der bredere data? Efterskolemesterskaber involverer højst sandsynligt
     ikke GSB, så denne database dækker muligvis slet ikke de relevante puljer.
   - Der er intet kønsfelt nogen steder — kun `name_raw`/`name_normalized`. Køn skulle i
     givet fald udledes af fornavn (upålideligt, kræver egen metode/validering).

## Mål

1. Undersøg om `gsb-statistik-normalized.db` (eller en anden kilde i repoet) faktisk
   indeholder data for de konkrete efterskole-puljer identificeret i punkt 5 (find de
   konkrete `external_match_id`'er i `liga-landskab.db` for S4D4- og S4D3-puljerne, slå dem
   op i `gsb-statistik-normalized.db.team_matches.external_match_id`). Sig eksplicit ja/nej
   — gæt ikke.
2. Hvis data findes: tæl faktisk distinkte spillere pr. holdkamp for disse puljer og
   sammenlign med den tekst-antagede spillerstørrelse (4 for S4D4, 5 for S4D3). Bekræft
   eller afkræft antagelsen eksplicit.
3. Test SAMME metode på punkt 4's uafklarede rest (1411 forekomster, signatur S4/D2, ingen
   af de seks kendte formatord i teksten, ren ungdom U09-U17/U19). Find konkrete
   external_match_id'er for en stikprøve af disse puljer, slå dem op i
   `gsb-statistik-normalized.db` på samme måde, og forsøg at afgøre om der reelt er tale om
   et fuldt pigehold (dvs. skulle have været klassificeret som "4 piger") eller om det er
   ægte kønsblandet "4 spillere". Der er intet kønsfelt, så dette kræver at udlede køn af
   `name_raw`/`name_normalized` — vær eksplicit om hvor usikker den udledning er, og drag
   ikke en skråsikker konklusion hvis navnene er tvetydige. Hvis stikprøven slet ikke findes
   i databasen (samme GSB-scoping-problem som punkt 2), sig det klart i stedet for at gætte.
4. Hvis data IKKE findes (sandsynligt pga. GSB-scoping): undersøg om der findes en bredere,
   ikke-GSB-scoped kilde i repoet med spillernavne/roster-data der kunne dække dette
   fremover, og rapportér hvad der findes/mangler. Byg ikke en ny scraper i denne opgave.
5. Dokumentér hele fundet — inkl. punkt 1-6 ovenfor fra denne opgavebeskrivelse, samt de nye
   fund fra denne opgave — som en samlet statusrapport, så det kan bruges direkte i den
   senere samlede dokumentation af spilleformats-arbejdet (112/113-komplekset).
6. Registrér "5 spillere" som et syvende kendt navngivet ungdomsformat i den dokumentation
   (ikke i selve 112-scriptet endnu — det er en senere opdatering).

## Afgrænsning

- Ret IKKE 112-scriptets `spillefamilie`-bug i denne opgave.
- Byg IKKE en ny scraper eller datapipeline for spillernavne/køn.
- Antag IKKE at data mangler — undersøg det konkret read-only, ligesom den tidligere
  category_raw-undersøgelse.
- Denne opgave er dokumentation og verificering, ikke en ombygning af 113's
  rangeringsscript (det scoring-baserede forsøg i `113-generate-spilleformats-rangering.mjs`
  er afvist af Christoffer og skal ikke bruges som grundlag).

## Kontekst

- statistik/results/112-spilleformats-katalog-alle-aargange.json (kildekatalog)
- statistik/data/liga-landskab.db (kategorisignaturer, ingen spillerdata)
- statistik/data/gsb-statistik-normalized.db (mulig spillerdata, GSB-scoped — verificér
  omfang)
- statistik/scripts/046-ungdom-holdtype-niveau-audit.mjs, 103-086c-klassifikation.mjs
  (eksisterende parsing-logik der ligger til grund for 112)

## Kontrol

- Alle konklusioner om "data findes"/"data findes ikke" skal være baseret på faktiske
  forespørgsler mod databaserne, ikke antagelser.
- Marker eksplicit alt der forbliver ubekræftet, jf. statistik/AGENTS.md's "Aldrig gæt".

## Ved tvivl

Spørg i resultatnoten frem for at gætte, særligt omkring hvorvidt GSB-scoping i
gsb-statistik-normalized.db er absolut eller om der findes upstream-data uden filteret.

## Gren

arbejde/114-spilleformats-opstillingskrav-verificering

## Spørgsmål

(udfyldes hvis noget er uklart under arbejdet)

## Resultatnote

- Kontrol udført read-only mod `liga-landskab.db` og `gsb-statistik-normalized.db`.
- Efterskole-stikprøve: puljerne 18170 (80 kamp-ID’er), 18173 (13), 18413 (3), 18415 (10) og 19062 (3) gav 109 distinkte kamp-ID-forekomster i liga-landskabet og 0 match i `gsb-statistik-normalized.db.team_matches`.
- S4D4/“4 spillere” kan derfor ikke verificeres med spillerdata; S4D3/“5 spillere” er dokumenteret af den rå rækketekst, men ikke verificeret med spillerrelationer.
- S4/D2-restens stikprøve: 18500 (6), 18520 (3), 18566 (3) og 19156 (1) gav 13 kamp-ID’er og 0 GSB-match; køn og spillerantal er ubekræftet.
- Ingen bred, ikke-GSB-scoped spiller-/rosterkilde blev fundet i repoet.
- “5 spillere” er registreret som syvende navngivne ungdomsformat i rapporten; 112-scriptet er ikke ændret.
- Filer: `statistik/results/114-spilleformats-opstillingskrav-verificering.md` og `.json`.
- Spørgsmål: ingen nye metodiske uklarheder; den manglende GSB-dækning er rapporteret som begrænsning.
- Commit: `c3a022a` (rapport og kortarkivering).
