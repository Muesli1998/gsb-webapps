# Opgave 123 — udvid formatgenkendelse i teksten og afled strukturfamilie fra kategorisignaturen

## Baggrund

Opgave 122 (`statistik/results/122-s4d2-rest-afklaring.md`) viste at den "uafklarede
S4/D2-rest" fra opgave 115 er 775 deduplikerede ungdomspuljer (nøgle:
`season_id`, `age_group_id`, `league_group_id`; regioner gentager samme pulje og må ikke
tælles med). I en stikprøve på 60 af dem har ca. to tredjedele en tekst der faktisk siger
hvilket format det er, men i en variant som `parse046()` i
`statistik/scripts/112-generate-spilleformats-katalog.mjs` ikke kender. Den kender kun
`x1/x2`, `2+2`, `4+3`, `4+2`, `3 spillere`, `4 piger` og `4 spillere` (med præcis ét
mellemrum-mønster `\b4\s*spillere\b`). Varianter set i stikprøven:

- `4 Sp.` / `4 SP.` (fx "DMU Hold U9 D 4 Sp.", "LM U17 ELITE/MESTER 4 SP.")
- `4B Spillere` / `4C Spillere` / `4 C (4 SP.)` (bogstav mellem tallet og "spillere")
- `4-8 spillere` (fx "U13 B 4-8 spillere")
- `4 m/k` / `4m/k` (mand/kvinde, blandet) og `4 dr hold` (drenge)
- `(4)` bag rækkenavnet (fx "U13 A (4)", "U15 D (4)")
- rene rækkenavne uden formatoplysning ("U13D / Pulje 5", "U13 - Begynderholdturnering")

Ingen af de 60 tekster nævner "piger".

Desuden har opgave 112's `spillefamilie`-felt en kendt fejl (dokumenteret i opgave 114/115):
det er ALTID det tekstparsede holdtype, aldrig afledt af `category_signature`, selvom
`spillefamilie_source` sættes til `'kategorisignatur'` så snart en signatur findes.
Eksempel: en senior-pulje med `1. D · 2. D · 3. D · 4. D · 5. D · 6. D` blev mærket
"4 spillere" fordi de ordene stod et andet sted i råteksten.

## Mål

1. **Kortlæg tekstvarianter først, uden at gætte.** For ungdomspuljerne (aldersgruppe-id
   2, 3, 4, 5, 6, 7, 18; UNG = 21 udeladt som aggregat) med signaturen S4/D2 (fire `S` og
   to `D`-koder, ingen kønnede koder) og uden kendt formatord: lav en tabel over ALLE
   distinkte tekstvarianter der ligner et formatudsagn, med antal puljer pr. variant og 2-3
   eksempler. Kig også på øvrige signaturer med manglende/ukendt `spillefamilie`
   (ungdom og senior), så kortlægningen ikke kun dækker S4/D2.
2. **Del varianterne i to grupper og anvend kun den ene:**
   - *Utvetydige* (anvend): `4 Sp.`/`4 SP.`, `4 spillere` med bogstav imellem
     (`4B Spillere`, `4C Spillere`), samt varianter hvor teksten bogstaveligt siger det
     samme som en allerede kendt token (`4 piger` osv.). Case-insensitive, `&#216`-lignende
     HTML-entiteter bevares som i kilden.
   - *Tvetydige* (anvend IKKE, kun rapportér): `4-8 spillere`, `4 m/k`, `4 dr hold`,
     `(4)` og lignende. Lav et forslag pr. variant, men markér dem "afventer Christoffers
     afgørelse" og skriv dem til en mapping-fil
     (`statistik/results/123-format-tekstgenkendelse/format-mapping.json`) med felterne
     `variant`, `antal_puljer`, `eksempler`, `foreslaaet_format`, `status`
     (`anvendt` / `afventer`), så næste trin kan slå dem til uden ny kode.
3. **Ret afledningen af `spillefamilie`.** Indfør to adskilte felter i stedet for at blande
   dem:
   - `spillefamilie_tekst`: kun hvad teksten bogstaveligt siger (udvidet med de utvetydige
     varianter fra punkt 2)
   - `strukturfamilie`: afledt af `category_signature` alene, via opgave 115's kanoniske
     signaturer (S4/D1 = 3 spillere, S4/D2 = 4 spillere-struktur, S4/D3 = 5 spillere,
     Mix2/DS2/DD1/HS2/HD2 = 4+3, Mix2/DS2/DD1/HS2/HD1 = 2+2, Mix1/DS1/DD1/HS3/HD2 = 4+2,
     DS4/DD2 = 4 piger, samt de ukønnede varianter jf. kønnet-vs-ukønnet-reglen i 115).
     S4/D2 må kun kaldes "4 spillere-struktur", ikke "4 spillere" eller "4 piger", medmindre
     teksten siger det (samme signatur passer på begge).
   - `konflikt`: sand når `spillefamilie_tekst` og `strukturfamilie` peger på forskellige
     formater (fx teksten siger "4 spillere" men signaturen er seks double).
4. **Generér et nyt katalog** som nye filer under `statistik/results/123-format-tekstgenkendelse/`
   (JSON + kort markdown-rapport) med de nye felter. Lad `112-*`-filerne og 112-scriptet
   stå uændret; genbrug dets forespørgsler og hjælpefunktioner (kopiér eller importér), så
   tallene kan sammenlignes.
5. **Rapportér effekten**: hvor mange af de 775 rest-puljer der nu får et tekstformat,
   hvor mange der stadig er uden (og hvad de har til fælles, fx "Begynderholdturnering"),
   hvor mange der venter på Christoffers afgørelse, og hvor mange `konflikt`-rækker der
   findes i alt (fordelt på ungdom/senior).

## Afgrænsning

- Gæt ikke. En variant der ikke bogstaveligt siger et format anvendes ikke (jf.
  `statistik/AGENTS.md`, "Aldrig gæt"). Hvor tvivlen er reel, hører den hjemme i
  mapping-filen som "afventer".
- Ingen ny scraping. Rør ikke `gsb-statistik-normalized.db`, `liga-landskab.db` eller
  `national-spillere.db` (kun læsning).
- Renskriv IKKE opgave 115's holdtype-rangering her. Det er et separat trin, der først
  giver mening når Christoffer har afgjort de tvetydige varianter.
- Ret ikke 112-scriptet eller 112's resultatfiler; alt nyt får 123-navne.

## Kontekst

- `statistik/results/122-s4d2-rest-afklaring.md`/`.json` (775 rest-puljer, 60 stikprøver
  med tekst i `rest_samples`)
- `work/loeste/115-manuel-rangeringsmetode-og-fund.md` (kanoniske signaturer,
  kønnet-vs-ukønnet-regel, tier-metode)
- `statistik/scripts/112-generate-spilleformats-katalog.mjs` (`parse046`, `categorySignature`,
  `freetextFor`) og `statistik/scripts/122-s4d2-rest-afklaring.mjs`
- `statistik/data/liga-landskab.db` (`league_groups`, `match_categories`)

## Kontrol

- Vis hvordan hver tekstvariants antal er talt (dedupliceret pr. fysisk pulje).
- Stikprøvetjek (20 puljer) af at de nyanvendte utvetydige varianter faktisk har den
  forventede signatur (S4/D2 for "4 spillere"); afvigelser rapporteres, ikke skjules.
- Bekræft at alle tre databaser er uændrede (hash før/efter).

## Ved tvivl

Spørg Christoffer om en variant skal i "anvendt" eller "afventer", og hvis den udvidede
genkendelse ændrer et allerede bekræftet tal (fx de 16.895 "4 spillere"-forekomster fra 115).

## Gren

`arbejde/123-format-tekstgenkendelse`

## Spørgsmål

(udfyldes hvis noget er uklart under arbejdet)

## Resultatnote

(udfyldes ved aflevering)
