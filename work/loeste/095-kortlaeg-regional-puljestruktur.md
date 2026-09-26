# Opgave 095 — kortlæg regionernes puljestruktur under Danmarksserien

**Trin:** Research / Internal mapping (analogt med 088a-088c, før 089 kunne bygges)

**Baggrund:** Opgave 094 udvidede DH-hovedturneringen til Ligaen–Danmarksserien og fandt at 22 af 84
"højere-niveau"-huller (teams der forsvinder fra det nationale DH-datasæt i en periode) sandsynligvis
skyldes regionale puljer under Danmarksserien, som slet ikke er dækket endnu. Christoffer har bekræftet
at regionernes puljer er næste skridt.

En undersøgelse pr. `region_id` (denne opgaves forarbejde, se Kontekst) viser at regionsstrukturen er
markant mere uensartet end Ligaen–Danmarksserien, men mindre "huldt" end en første, for smal søgning på
eksakte navnestrenge først antydede — Christoffer rettede undervejs en konkret fejlslutning (København
2016/2017–2021/2022 er IKKE et hul, se nedenfor), hvilket bekræfter hvorfor denne opgave er nødvendig som
research FØR en tabel bygges:

- **Sjælland:** uafbrudt "Sjællandsserien" 2011/2012–2026/2027 under "Badminton Sjælland". Intet hul.
- **København:** IKKE et hul, som først antaget — kun tre forskellige navnefamilier over tid, som skal
  alias-mappes: "KS-Pulje 1/2"/"KS-P1/P2"/"KS Oprykning/Nedrykning" (2011/2012–2017/2018) →
  "KBH Serien P1/P2" (2018/2019–2021/2022) → "Københavnsserien" (2022/2023–2026/2027). Uafbrudt dækning,
  bare under tre navne. (Christoffer bekræftede selv "BADKBH 17/18 hedder KS-PX med X der er 1 og 2" —
  præcis den sæson min første, for smalle strengsøgning misforstod som et hul.)
- **Fyn, Midtjylland, Nordjylland, Sønderjylland:** disse fire regioner har hver deres egne tidlige
  navne — "Fynsserien" (Fyn, 2011/2012–2013/2014), "Jyllandsserien"/"JYLLANDSSERIEN" (kun Midtjylland,
  2011/2012–2013/2014) — mens Nordjylland og Sønderjylland i den tidlige periode ikke har en tydelig
  navngivet regional top-serie, kun lokale "Serie 1/2/3"-puljer. Fra 2016/2017 og frem SMELTER alle fire
  regioner sammen i én fælles "Kredsserien Vest"/"Kredsserie Vest", som optræder identisk (samme sæsoner,
  samme gruppenavne) i alle fire regioners data — det er én delt vestdansk top-serie, ikke fire separate.
  Der er en reel, uafklaret overgangsperiode omkring 2014/2015–2015/2016, hvor hverken de gamle
  regionsnavne eller "Kredsserien Vest" tydeligt optræder for Fyn/Midtjylland/Sønderjylland — det kan være
  en ægte strukturændring (fx en sammenlægningsproces) eller blot endnu et navn denne undersøgelse ikke
  har fundet endnu.
- **Bornholm:** "Bornholmsserien" findes kun 2011/2012–2015/2016. Fra 2016/2017 og frem findes INGEN
  navngivet regional top-serie for Bornholm i dataet, kun "Serie 2/3/4/5". Dette ligner et ægte, uafklaret
  spørgsmål (blev Bornholmsserien nedlagt, lagt sammen med Kredsserien Vest, eller findes den under et
  navn der endnu ikke er identificeret?).
- **Lolland-Falster:** en region jeg havde overset helt i første omgang — "LF-Serien"/"LF Serie 1-3" har
  uafbrudt dækning 2011/2012–2026/2027 under "Badminton Lolland-Falster". Intet hul, men skal tilføjes
  til listen over regioner der skal dækkes (se Kontrol).

Konklusionen efter denne runde: Sjælland, København og Lolland-Falster har reelt UAFBRUDT dækning (blot
med navneskift der skal alias-mappes), mens Fyn/Midtjylland/Nordjylland/Sønderjylland har en ægte
strukturel sammenlægning til "Kredsserien Vest" fra ca. 2016/2017, med en uafklaret overgangsperiode
forinden — og Bornholm har et ægte, endnu uforklaret hul fra 2016/2017. Denne uensartethed (og risikoen
for endnu flere overraskelser af samme slags som København-fejlen) betyder at en direkte udvidelse af
089/092's mønster (`levelFromDivision()` + niveau-overgangslogik) uden denne kortlægning ville være at
gætte på en struktur der ikke er efterprøvet. Jf. `AGENTS.md`s "Aldrig gæt": denne opgave kortlægger
derfor strukturen FØRST, uden at bygge eller ændre nogen tabel.

## Mål

Lav en evidensbaseret kortlægning (ny fil, se Afgrænsning) af regionernes puljestruktur under
Danmarksserien, pr. sæson og pr. region, der besvarer:

1. Hvilke regionale "top-serier" (svarende til Sjællandsserien/Fynsserien/Jyllandsserien/Bornholmsserien/
   Kredsserien Vest/Københavnsserien/LF-Serien) har eksisteret i hvilke sæsoner, under hvilke
   `division_name_raw`-varianter, og hvilken/hvilke `region_id` er de tilknyttet i
   `league_group_regions`?
2. Hvad hedder Fyn/Midtjylland/Sønderjyllands regionale top-serie i overgangsperioden ca.
   2014/2015-2015/2016 (før "Kredsserien Vest" tydeligt ses i alle fire regioner)? Og hvad skete der med
   Bornholmsserien efter 2015/2016? Er der `division_name_raw`-varianter i de sæsoner der reelt ER den
   regionale top-serie under et navn denne undersøgelse endnu ikke har identificeret? Eller mangler
   dataen reelt for de sæsoner/regioner (dokumentér som ukendt, gæt ikke)?
3. Hvordan kobler de regionale top-serier til Danmarksserien ovenfor (oprykning/kvalifikation, analogt
   med 3. division ↔ Danmarksserien-logikken fra 094) og til "Serie 1/2/3..." under sig selv (er der en
   ensartet pointgrænse/niveau-logik, eller varierer det pr. region — jf. de mange varianter som
   "Serie 1 Vest", "Serie 2, 6+4 Nord" osv.)?
4. Er `group_type_katalog` (fra 088a) allerede korrekt for de regionale gruppers `grundspil`/`slutspil`/
   `oprykningsspil`/`nedrykningsspil`/`kvalifikation_op`/`kvalifikation_ned`-klassifikation, eller er der
   samme slags forkortelses-/varianthuller som 093 rettede for "Kval." på nationalt niveau? Stikprøve
   mod kataloget for et udsnit af de identificerede regionale grupper.

## Afgrænsning

**Må røres:** en ny dokumentationsfil, fx `statistik/results/095-regional-puljestruktur-kortlaegning.md`
(og evt. et ledsagende `.json` med de rå fund, hvis det gør efterprøvning nemmere). Ingen ændringer til
`089-generate-liga-1div-revisionstabel.mjs`, `092-hold-identitet-traadmatching.mjs` eller nogen
outputfil fra tidligere opgaver.

**Må ikke røres:** Ingen kode der genererer 089/092's tabeller — denne opgave er research, ikke
implementation. `group_type_katalog` må læses men ikke ændres. `statistik/data/*.db`,
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. Ingen nye API-kald (al undersøgelse sker
mod den lokale `liga-landskab.db`, som allerede har de historiske data).

## Kontekst

- `statistik/data/liga-landskab.db`, tabellerne `league_groups` (`division_name_raw`, `group_name_raw`,
  `season_id`), `league_group_regions` (`region_id`), `regions` (`name`, `parent_id`) — kilden til hele
  denne kortlægning. Opslag bør ske PR. `region_id` (ikke kun på eksakte navnestrenge), da samme
  konkurrence kan skifte navn over tid uden at regionen ændrer sig — jf. Københavns-fejlen ovenfor.
- `statistik/scripts/089-generate-liga-1div-revisionstabel.mjs`s `levelFromDivision()`- og
  niveau-overgangsmønster (`oneQual`/`oneDown`/`twoUp`/`threeUp`/`threeDown`/`dsUp`/`dsDown`) — det
  mønster denne kortlægning skal gøre det muligt at gentage for regionerne, i en SENERE opgave.
- `work/loeste/088a-...`, `088b-...`, `088c-...` — det oprindelige mønster for at kortlægge intern
  struktur (klassificere, opstille regler, menneskelig gennemgang) FØR en tabel bygges; denne opgave
  følger samme rækkefølge for regionerne.
- Opgave 094's Resultatnote — de 22 uforklarede "higher_tier_only_gaps" (`ikke_synlig_i_nationalt_dh_
  datasæt`) er den konkrete anledning til denne opgave.

## Kontrol

**Målet — hvad skal blive sandt:**

```
Kortlægningsfilen dækker samtlige sæsoner 2010/2011-2026/2027 og alle regioner under "Badminton Danmark"
(Sjælland, Fyn, Midtjylland, Nordjylland, Sønderjylland, København, Bornholm, Lolland-Falster) med enten
en identificeret regional top-serie, en dokumenteret forklaring på hvorfor ingen findes den sæson, eller
et åbent, tydeligt mærket spørgsmål — ingen sæson/region-kombination må stå tom uden forklaring.
```

**Værnet — hvad må ikke ændre sig:**

```
git status --short statistik/                    kun den nye kortlægningsfil er tilføjet
Ingen kald til badmintonplayer.dk/nembadminton.dk.
statistik/data/*.db er BYTE-FOR-BYTE uændrede (kun læst).
```

**Skøn** (kan ikke måles):

- Kortlægningen skal være konkret nok til at en efterfølgende opgave kan udvide 089/092's mønster uden
  yderligere gætteri — ikke bare en liste af rå navne, men en tolkning af hvad de betyder, med evidens.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** på hvad et regionsnavn betyder
eller hvorfor et hul findes — særligt ikke overgangsperioden 2014/2015-2015/2016 for Fyn/Midtjylland/
Sønderjylland eller Bornholms forsvinden efter 2015/2016. Er der data der ikke entydigt kan tolkes,
dokumentér det rå fund og lad Christoffer afgøre det, evt. med en visuel stikprøve på badmintonplayer.dk
(som han selv gjorde for 2. divisions kvalifikationsgruppe i opgave 092, og som han allerede har
korrigeret mig én gang undervejs i denne opgaves forarbejde).

## Gren

`arbejde/095-kortlaeg-regional-puljestruktur`, fra `main`.

---

## Spørgsmål

### Uafklaret — vestlig overgang 2014/15–2015/16

Den rå regionsafgrænsede data kan ikke afgøre topniveauet i fem tilfælde:

- Fyn 2014/15: `Kredsserie Fyn` (to grupper) og `Kredsserie 5 (Fyn)` samt Serie 1–3. Navnet giver en kandidat, men data indeholder ingen direkte etikette for forbindelse opad til Danmarksserien.
- Fyn 2015/16: kun `Kvalifikations-række`, Senior B/C og Fynsmesterskab-/Senior Hr.-varianter; ingen `Fynsserien` eller `Kredsserie`.
- Midtjylland 2014/15–2015/16: kun Serie 2/3-varianter.
- Sønderjylland 2014/15–2015/16: Serie-/senior-/motionsvarianter, men ingen navngivet topserie.

Skal disse fem perioder afklares med Christoffers visuelle kildekontrol eller en separat regel-/historikundersøgelse, før en generator forsøger at inkludere dem?

### Uafklaret — Bornholm efter 2015/16

`Bornholmsserien` findes som grundspil i 2011/12–2015/16, men derefter kun Serie 2–5-varianter eller ingen regionstilknyttede seniorgrupper (2017/18–2019/20 og 2026/27). Lokale data afgør ikke, om topserien blev nedlagt, flyttet eller om kildeindekset er ufuldstændigt. Skal dette afklares visuelt/historisk før Bornholm udvides?
## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
Read-only kildedækning:
  region_id: 3, 4, 5, 6, 7, 8, 9, 10
  regioner: 8
  sæsoner: 2010/11–2026/27 (17)
  region×sæson-celler: 136
  regionstilknyttede senior-grupper: 2.990
  rå navngivne topserie-kandidater: 104
  identificerede topserier: 103
  uafklarede struktur-/kildeceller: 25
  celler uden regionstilknyttet seniorgruppe: 12
  (8 i 2010/11 samt Bornholm 2017/18–2019/20 og 2026/27; de 4 Bornholm-celler er indeholdt i de 25 åbne)

liga-landskab.db SHA-256 før/efter:
9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C
9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C

Katalogstikprøve:
  distinkte top-orienterede ander/ukendt-kombinationer: 17
  database-/API-skrivninger: 0
```

**Hvad blev gjort:**

- Kortlagde alle otte Badminton Danmark-regioner ved `region_id`, ikke via en global navnesøgning.
- Skrev en læsbar kortlægning og et komplet JSON-bilag med de rå `division_name_raw`- og `group_name_raw`-værdier pr. region/sæson.
- Dokumenterede de eksplicitte vestlige forbindelser Kredsserie Vest → Danmarksserien og Kredsserie Vest → Serie 1 Vest, og påviste at øvrige regioner ikke kan få samme faste kobling uden mere evidens.
- Stikprøvede `group_type_katalog`; klassiske grund-/slut-/op-/nedrykningsnavne er klassificeret, men 17 regionale kvalifikationsvarianter står fortsat som `andet/ukendt`.

**Hvad blev fravalgt og hvorfor:**

- Ingen ændring af 089/092, `group_type_katalog` eller databasen: opgaven er en researchfase.
- Ingen forklaring blev opfundet for vest-overgangen eller Bornholms manglende topserie efter 2015/16; de står som eksplicitte spørgsmål.

**Commits:** 9998b21 (researchresultat), d2e46ac (resultatnoteformat).