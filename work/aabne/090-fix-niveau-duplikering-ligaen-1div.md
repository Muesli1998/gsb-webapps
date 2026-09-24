# Opgave 090 — fix niveau-duplikering ved Ligaen/1. divisions kvalifikationsgrænse (089-datasæt)

**Trin:** Rettelse af opgave 089's datasæt, fundet ved Christoffers manuelle gennemgang i Trådtavlen
(review-værktøjet bygget ovenpå 089). Christoffer: "2010/11 er der 2 odense OBK. Det er forkert. Jeg ved
godt at det er fordi de er med i 'kvalifikation til badmintonligaen', men de ER jo i badmintonligaen, og
skulle bare spille mod 1 div nr 2..... Liganavnene ændrer sig en smule gennem årene."

**Gren:** `arbejde/090-fix-niveau-duplikering-ligaen-1div`, fra `main`.

**Baggrund (allerede undersøgt i chatten, genbrug det):**

For 2010/2011 er `league_group_id=420` ("Kvalifikation til Badmintonligaen") en ÉN samlet firehold-pulje
(ikke en simpel 2-holds kvalkamp):
```
Deltagere i pulje 420: Aarhus AB 1, Ikast 1, Odense OBK 1, Solrød Strand 1
Deltagere i Ligaens grundspil (pulje 398): ... Odense OBK 1 (#9), Ikast 1 (#10) ...
```
Odense OBK 1 og Ikast 1 er ALTSÅ Ligaens egne hold (nr. 9 og 10) der spiller MED i denne pulje mod to
1. divisions-hold (Aarhus AB 1, Solrød Strand 1). 089-generatoren har fejlagtigt givet Odense OBK 1 (og
formentlig Ikast 1) en EKSTRA række med `niveau_denne_sæson = "1. division"`, selvom de allerede har deres
rigtige række under `niveau_denne_sæson = "Ligaen"`. Samme hold optræder dermed to gange i samme sæson
under to forskellige niveauer — det er en fejl i klassificeringen, ikke i data.

En stikprøve på gruppenavne nær denne grænse viser at strukturen ændrer sig meget hen over årene (jf.
Christoffers observation) — IKKE kun navnet, men formentlig også selve puljeformen:
```
2010-2018: "Ligakvalifikation(sspillet)" under division "Badmintonligaen" (fx league_group_id 1078,
  2181, 3596, 5232, 6890, 8750, 10369, 12046) — mistænkt for at være samme firehold-puljeform som 2010.
2019+: opsplittet i to separate grupper, én tagget under division "Badmintonligaen" (fx "Kvalifikationskamp
  mod 1. division") og én under "1. division" (fx "Kvalifikation til Badmintonligaen") — uklart om disse to
  altid beskriver PRÆCIS samme kampe (dubleret pr. division) eller reelt forskellige puljer/år for år.
2021 (sæson 2021/2022's data, group_id 13947 og 14461) er et selvstændigt problem: `home_name_raw`/
  `away_name_raw` indeholder her forurenet data — kontaktperson-navn/e-mail/telefon er limet fast på
  holdnavnet, fx "Aarhus AB Thomas Damgaard dambassen@hotmail.com 20245424" i stedet for bare "Aarhus AB".
  Det er ikke undersøgt hvor mange andre sæsoner/grupper der er ramt af samme forurening — det vil også
  ødelægge navnematching i Trådtavlen (087's og denne opgaves logik), så det bør renses generelt, ikke kun
  lappes lokalt.
```

**VIGTIGT — forveksl ikke dette med et helt andet, RIGTIGT signal:** `league_group_teams.team_name_raw`
(bemærk: en anden tabel end `league_matches`, som ikke har dem) bærer ofte ægte BD-annotationer
`(O)` og `(N)` direkte på holdnavnet, fx `"Horsens (O)"`, `"Højbjerg 2 (N)"`. Det er BD's egen markering af
om holdet er en **O**prykker (kommet op i puljen nedefra) eller **N**edrykker (kommet ned i puljen
ovenfra) — altså PRÆCIS det signal der kan bruges til at afgøre et holds oprindelse/hjemme-niveau i en
blandet pulje. Det er IKKE støj som kontaktinfo-forureningen ovenfor, og skal IKKE renses væk på samme
måde — det skal tværtimod bruges aktivt som klassificeringssignal hvor det findes (og bevares synligt,
fx i `hændelse`-teksten). Stikprøven på 2010/2011's pulje 420 viser at (O)/(N) IKKE er udfyldt for alle
sæsoner/puljer (ingen af de 4 hold i pulje 420 har suffikset) — så det er et supplerende signal, ikke en
universel løsning, men det skal undersøges og bruges hvor det er til stede, før man falder tilbage på den
mere generelle "egen hovedpulje"-logik i Mål 2.

## Mål

1. **Kortlæg, sæson for sæson, den faktiske deltager-struktur** i alle grupper nær Ligaen/1. divisions
   kvalifikationsgrænse (brug `group_type_katalog` fra 088a til at finde kandidatgrupperne, men VERIFICÉR
   med faktiske deltagerlister fra `league_matches` — stol ikke på gruppenavnet alene, jf. 2021-eksemplet).
   For hver sæson: er det (a) én samlet pulje der blander Ligaen- og 1. divisions-hold, (b) to adskilte
   grupper der reelt beskriver de samme kampe (duplikeret pr. division), eller (c) en ren 2-holds kvalkamp
   uden overlap? Dokumentér dette eksplicit i Resultatnoten som en lille tabel — det er i sig selv
   værdifuld viden for fremtidige opgaver.
2. **Ret klassificeringslogikken i `089-generate-liga-1div-revisionstabel.mjs`:** et holds
   `niveau_denne_sæson` skal afgøres af hvilket niveaus EGEN grundspils-/hovedpulje det hører til den
   sæson — ikke af hvilken pulje-række det blev fundet i. Brug `(O)`/`(N)`-suffikset fra
   `league_group_teams.team_name_raw` som primært signal hvor det findes (en `(N)`-mærket deltager i en
   blandet pulje er typisk IKKE hjemhørende i puljens niveau, men på vej ned fra niveauet ovenfor — og
   omvendt for `(O)`); fald kun tilbage på "hvilken pulje er holdets egen hovedpulje"-logikken hvor
   suffikset mangler. Et hold der optræder som "gæst" i en anden niveau-puljes kvalifikationsgruppe (fordi
   det er dens modstander) skal IKKE have en ekstra række under det niveau — den krydsniveau-relation skal
   udelukkende fremgå via `hændelse`/`kval_modstander`/`kval_resultat` på dets EGEN (hjemme-niveau) række,
   præcis som Ligaens nr. 9/10-rækker allerede gør. Gælder symmetrisk hvis samme mønster findes ved 1./2.
   divisions-grænsen (undersøg det, byg ikke kun til 2010-eksemplet).
3. **Rens `home_name_raw`/`away_name_raw` for indlejret KONTAKTINFO** (navn+e-mail+telefonnummer limet på
   holdnavnet) FØR de bruges til niveau-klassificering eller navnematching. Find omfanget (hvilke
   sæsoner/grupper er ramt) og dokumentér det i Resultatnoten, så det ikke skal genopdages senere. Denne
   rensning må gerne lægges som en lille, selvstændig, genbrugelig hjælpefunktion i scriptet (eller et
   sted i `statistik/scripts/` der oplagt bliver brugt igen). **Forveksl IKKE dette med `(O)`/`(N)`
   BD-annotationerne i `league_group_teams`** (se Baggrund) — de er et rigtigt signal og skal bevares/
   bruges, ikke fjernes. De to ting ligner hinanden overfladisk (begge er "noget i en parentes/hale efter
   holdnavnet") men skal behandles modsat: kontaktinfo væk, (O)/(N) bevares og bruges aktivt.
4. **Regenerér** `statistik/results/089-liga-1div-revisionstabel.csv`/`.json` med rettelsen. Efter
   rettelsen må INGEN `(sæson, hold)`-kombination optræde under to forskellige `niveau_denne_sæson`-værdier
   i samme sæson, medmindre det er en dokumenteret, reel undtagelse (angiv i så fald hvorfor i
   Resultatnoten i stedet for at undertrykke den).
5. **Ryd IKKE Christoffers `christoffer_bekræftet`-kolonne / hans bekræftede tråde** — de findes kun i
   browserens localStorage i Trådtavlen (ikke i denne fil), så denne opgave påvirker dem ikke direkte, men
   vær opmærksom på at holdenes ID i Trådtavlen er `sæson||niveau||placering||hold` — hvis regenerering
   ændrer `placering`-numre for berørte rækker (fordi en falsk ekstra række forsvinder), kan nogle af hans
   allerede bekræftede tråde i værktøjet pege på et ID der ikke længere findes. Nævn dette eksplicit og
   tydeligt i Resultatnoten, så Christoffer/manager-Claude ved at nogle tråde kan kræve at blive
   genbekræftet efter opdateringen.

## Kontekst

- `work/loeste/089-manuel-revisionstabel-liga-1div.md` — kortet og resultatnoten for det datasæt der
  rettes her.
- `work/loeste/088a-intern-kortlaegning-og-testcases.md` — `group_type_katalog`-tabellen.
- `statistik/results/086-liga-hierarki-viden-samlet.md` — §17-18-strukturen (facit for MODERNE sæsoner —
  husk at ældre sæsoners regler kan have været anderledes, jf. firehold-puljen i 2010).
- Konkrete gruppe-id'er fundet i denne chat (se Baggrund ovenfor) som startpunkt for undersøgelsen.

## Afgrænsning

**Må røres:** `statistik/scripts/089-generate-liga-1div-revisionstabel.mjs`,
`statistik/results/089-liga-1div-revisionstabel.csv`/`.json`. Evt. en ny lille hjælpefil til
navnerensning under `statistik/scripts/` hvis det giver bedre struktur.

**Må ikke røres:** `statistik/data/*.db` (kun læses), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`. Ingen nye API-kald.

## Kontrol

**Målet:**
```
Intet hold optræder to gange under samme sæson med forskelligt niveau, medmindre det er en dokumenteret
  undtagelse forklaret i Resultatnoten.
Krydsniveau-kvalifikationsrelationer er stadig synlige, nu udelukkende via hændelse/kval_modstander/
  kval_resultat på holdets EGEN niveau-række.
Holdnavne er renset for indlejret kontaktinfo, med omfanget af forureningen dokumenteret.
Sæson-for-sæson-kortlægningen af puljestrukturen (pulje vs. duplikeret vs. ren kvalkamp) er skrevet ned.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen kald til badmintonplayer.dk/nembadminton.dk.
Stikprøve: 2010/2011 — Odense OBK 1 og Ikast 1 optræder KUN under "Ligaen"; Aarhus AB 1 og
  Solrød Strand 1 optræder KUN under "1. division".
Stikprøve: find en sæson/pulje med et `(N)`-mærket hold (fx "Højbjerg 2 (N)" eller "Team Roskilde (N)" i
  `league_group_teams`) og bekræft at det klassificeres som hjemhørende i niveauet OVER puljen, ikke i
  puljens eget niveau — og at `(O)`/`(N)` selv ikke er blevet renset væk som var det kontaktinfo-støj.
```

**Skøn:** Hvis en sæsons puljestruktur er for uklar til entydigt at afgøre hjemme-niveau for et hold
(sjældne tilfælde, fx delt data eller manglende gruppe) — udelad rækken som "ikke fundet"/manglende sæson
fremfor at gætte, samme princip som i 089.

## Ved tvivl

Spørg i "### Spørgsmål" nedenfor fremfor at gætte — særligt hvis 1./2. divisions-grænsen viser et andet
mønster end Ligaen/1. divisions-grænsen, eller hvis rensning af kontaktinfo er tvetydig (fx et holdnavn
der reelt indeholder et tal der ligner et telefonnummer).

### Spørgsmål

089-generatoren og de CSV/JSON-filer, dette kort udtrykkeligt skal rette,
er ikke på `main`: de findes kun på den umergede gren
`arbejde/089-manuel-revisionstabel-liga-1div` (commits `0685e30` og
`bdfb223`). 090 er oprettet fra `main` som angivet, men kan derfor ikke
regenerere eller rette 089-datasættet uden at få disse filer ind først.

**Afklaring nødvendig:** Skal 089 først fast-forward-merges til `main`, eller
skal 090 bevidst baseres på/cherry-picke 089-commitsene, før rettelsen laves?
Jeg kopierer ikke den umergede leverance ind manuelt uden denne afklaring.

## Resultatnote

(Udfyldes ved lukning.)
