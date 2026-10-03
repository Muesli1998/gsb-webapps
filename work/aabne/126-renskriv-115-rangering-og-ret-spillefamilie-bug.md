# Opgave 126 — renskriv opgave 115's holdtype-rangering og ret 112's spillefamilie-bug

## Baggrund

Opgave 115 dokumenterede en manuel ungdomsrangering med én åben post: en uafklaret
S4/D2-rest på 1.411 forekomster (16.895 "4 spillere" + 1.411 uafklaret + de øvrige navngivne
formater). Opgave 122–125 har nu afklaret resten fuldt ud via national spillerdata:

- Opgave 122: den deduplikerede rest (puljenøgle `season_id`/`age_group_id`/`league_group_id`,
  ikke forekomster) er **775 puljer**, ikke 1.411 forekomster — regionsgentagelse i 112's
  katalog overtalte tidligere forsøg.
- Opgave 123: udvidet tekstgenkendelse delte resten i utvetydige varianter (anvendt) og
  tvetydige varianter (`afventer` i en mapping-fil).
- Opgave 124: `player_match_extras` (holdside, makker, sætresultater) genberegnet fra gemt
  kamptekst, ingen ny scraping.
- Opgave 125: Christoffers afgørelser anvendt — `(4)`, `4 m/k` og puljer uden formattekst →
  **4 spillere**; `4-8 spillere` → egen kategori; `4 piger`-tekst vinder over
  holdside-datakriteriet, også for de 126 puljer uden tilstrækkelig datadækning (Christoffers
  seneste afgørelse: "Tekst vinder").

Resultat: de 775 puljer er nu **0 uafklarede**: 4.813 "4 spillere", 135 "4 piger" (tekst),
131 "4-8 spillere", 8 X1, 6 X2 (`statistik/results/125-format-afgoerelser/rapport.md`).

Desuden har opgave 112's `spillefamilie`-felt en kendt bug (dokumenteret i 114/115, bekræftet
stadig uløst i 123's baggrund): feltet er ALTID tekstparset, aldrig afledt af
`category_signature`, selvom `spillefamilie_source` fejlagtigt sættes til
`'kategorisignatur'`. Opgave 123 omgik buggen med nye, separate felter
(`spillefamilie_tekst`/`strukturfamilie`) i sit eget katalog uden at røre 112. Den
underliggende bug i 112-scriptet selv er stadig ikke rettet.

## Mål

1. **Ret 112's `spillefamilie`-bug i selve scriptet**
   (`statistik/scripts/112-generate-spilleformats-katalog.mjs`): når en kombination har en
   `category_signature` der matcher en af opgave 115's kanoniske signaturer (jf. tabellen i
   `work/loeste/115-manuel-rangeringsmetode-og-fund.md`), skal `spillefamilie` afledes af
   signaturen, ikke af tekstmønstret — og `spillefamilie_source` skal fortsætte med kun at
   sige `'kategorisignatur'` når det reelt er sandt. Hvor tekst og signatur er i konflikt,
   brug opgave 115's kønnet-vs-ukønnet-regel (kønnet variant er officiel) og registrér
   konflikten i stedet for at overskrive tavst.
   - Generér et nyt katalog (nye 112-outputfiler, eksplicit markeret som rettet version —
     overskriv IKKE de eksisterende 112-resultatfiler, de er historisk reference; brug fx
     `-v2`-navngivning eller en ny underfolder).
2. **Renskriv opgave 115's ungdomsrangering** til en færdig, autoritativ version
   (`statistik/results/126-rangering-final.md`/`.json`, eller lignende), der:
   - Fjerner "uafklaret S4/D2-rest" som egen linje (den eksisterer ikke længere)
   - Fletter de 775 nu-afklarede puljer korrekt ind i "4 spillere" (4.813 i alt, minus de
     puljer der allerede var talt med i 115's oprindelige 16.895), "4 piger" (135 i alt) og
     en ny linje for "4-8 spillere" (131, egen kategori, placér den i rangeringen efter
     samme type→kønnet→kampe-regel som resten)
   - X1/X2 (14 puljer i alt, fra opgave 123) placeres også i rangeringen eller noteres
     eksplicit som uafklarede tekstvarianter, hvis de ikke kan placeres
   - Bevarer tier-opdelingen (Tier 1/2/3) og kønnet-vs-ukønnet-reglen som i 115
   - Beholder SEN-rangeringen fra 115 uændret (ikke berørt af denne opgave)
3. **Dokumentér kædet herkomst** tydeligt i den nye rapport: 115 → 122 → 123 → 124 → 125 → 126,
   så en læser kan følge hvordan det endelige tal er fremkommet uden at skulle læse alle fem
   mellemliggende kort.

## Afgrænsning

- Rør ikke `gsb-statistik-normalized.db`, `liga-landskab.db` eller eksisterende tabeller i
  `national-spillere.db` (kun læsning). Ingen ny scraping.
- Overskriv ikke 112's eksisterende outputfiler eller 115/122/123/124/125's resultatfiler —
  de er historisk reference. Alt nyt får 126-navne (eller en eksplicit `-v2` på 112's filer,
  hvis det findes mest naturligt — men de oprindelige skal bevares utouched).
- Gæt ikke. Hvis en post ikke klart kan placeres i rangeringen (fx X1/X2 hvis strukturen er
  usikker), markér den som sådan i stedet for at gætte en placering.
- SEN-rangeringen genberegnes ikke; kun ungdomsrangeringen er i scope her.

## Kontekst

- `work/loeste/115-manuel-rangeringsmetode-og-fund.md` — den oprindelige metode og rangering
- `work/loeste/122-s4d2-rest-afklaring.md`, `123-...md`, `124-...md`,
  `125-anvend-formatafgoerelser-og-s4d2-genanalyse.md` — hele kæden af afklaringer
- `statistik/results/125-format-afgoerelser/rapport.md`/`katalog.json` — de endelige
  formatkategorier pr. pulje
- `statistik/scripts/112-generate-spilleformats-katalog.mjs` — scriptet med buggen

## Kontrol

- SHA-256 på de to beskyttede databaser før/efter; rækketal i `national-spillere.db`
  uændrede.
- Bekræft at 112's eksisterende outputfiler er byte-identiske før/efter (ikke rørt).
- Den nye rangerings kategoritotaler skal summe til samme antal ungdomspuljer/-kampe som
  115's oprindelige grundtal (justeret for den nu-afklarede rest), så intet er talt dobbelt
  eller tabt undervejs.
- Stikprøve: vis 5 puljer hvor den gamle `spillefamilie`-bug gav forkert resultat, og
  bekræft at det rettede felt nu matcher `category_signature`.

## Gren

`arbejde/126-renskriv-115-rangering-og-ret-spillefamilie-bug`

## Spørgsmål

## Resultatnote
