# Opgave 122 — afklar S4/D2-resten (16.895 + 1.411 ungdomsforekomster) med national spillerdata

## Baggrund

Opgave 115's manuelle rangering af ungdommens holdopstillingsformater fandt en uafklaret
rest: **1.411 forekomster** (ren ungdom, U09-U17/U19, UNG-aggregatet udelukket) med
`category_signature` = S4/D2 (fire ukønnede single-kampe + to ukønnede double-kampe),
UDEN at den tilhørende fritekst indeholder et af de kendte formatord ("4 spillere", "4
piger", osv.). S4/D2 har samme strukturtal som BÅDE:
- den kanoniske "4 spillere"-signatur (som allerede er bekræftet for 16.895 andre
  forekomster, hvor teksten faktisk siger "4 spillere")
- den ukønnede/fejlmærkede variant af "4 piger" (hvis kønnede kanon er DS4/DD2 — samme
  struktur, bare med kønsmærkede koder)

Opgave 114 forsøgte at afgøre dette via `gsb-statistik-normalized.db`, men fandt at den
er GSB-scoped og ikke dækker de relevante kamp-ID'er. Opgave 116 bekræftede at den
nationale spiller-ID-mekanisme også findes uden for GSB, hvilket førte til opgave
119-121's bygning af `statistik/data/national-spillere.db` (203.012 kampe, spillerniveau,
kønsafgørelse via 80 %-flertalsregel). Den database findes nu og bør kunne afgøre S4/D2
-resten direkte.

**Vigtigt om katalogets tal**: `statistik/results/112-spilleformats-katalog-alle-aargange.json`
gentager den samme reelle pulje under flere regionsvisninger (fx "Badminton Danmark", "DGI",
og de enkelte regionale forbund kan alle referere til samme underliggende liga-gruppe). En
naiv summering af `occurrences` overtæller derfor kraftigt — egne forsøg på at genskabe de
1.411 gav enten 37.101 eller 18.461 afhængigt af filter, fordi deduplikeringen ikke er
gennemskuelig fra kataloget alene. DERFOR skal denne opgave arbejde direkte fra
`liga-landskab.db`'s rå tabeller (`match_categories.category_raw`, `league_groups`,
`league_match_groups.external_match_id`), ikke fra det aggregerede 112-katalog, og
deduplikere korrekt pr. unikke `league_group_id` (eller `first_seen_index_id`, hvis det er
den rigtige nøgle — undersøg selv hvilken kolonne der entydigt identificerer en fysisk pulje
uden regionsdubletter).

## Mål

1. **Identificér den faktiske mængde af puljer/kampe** der udgør S4/D2-signaturen for ren
   ungdom (U09-U17/U19, UNG-aggregatet udelukket), dedupliceret korrekt så samme pulje ikke
   tælles flere gange pga. regionsvisninger. Sammenlign dit deduplikerede antal med
   112-katalogets urene tal og forklar forskellen i resultatnoten.
2. **Udskil delmængden UDEN kendt formatord** i den tilhørende fritekst (`division_name_raw`
   / `group_name_raw` / `page_title_raw` — de samme felter 112-scriptet allerede bruger) —
   det er denne delmængde der svarer til opgave 115's "1.411-rest". Rapportér dit korrigerede
   antal, også hvis det afviger fra 1.411.
3. For en solid stikprøve af disse puljers `external_match_id`'er (gerne 50-100, spredt over
   flere sæsoner/regioner/aldersgrupper): slå dem op i `statistik/data/national-spillere.db`
   (`matches`, `player_matches`, `players`) og udtræk:
   - antal DISTINKTE spillere pr. hold i den enkelte kamp
   - kønsfordeling for disse spillere (`players.gender_status`)
4. **Afgør mønsteret**: er kampene overvejende rene pigehold (peger på fejlmærket "4 piger"),
   overvejende drenge/blandet (peger på ægte "4 spillere"), eller en blanding af begge (dvs.
   S4/D2 dækker faktisk to forskellige virkeligheder, og resten kan ikke slås sammen til ét
   format)? Følg `statistik/AGENTS.md`'s "Aldrig gæt" — hvis stikprøven er blandet eller
   uklar, sig det eksplicit i stedet for at tvinge en konklusion.
5. Gør det samme korte tjek for det allerede "bekræftede" 4 spillere-tal (de 16.895 hvor
   teksten siger "4 spillere") som en KONTROL: stemmer deres spillersammensætning overens
   med det man ville forvente (blandet/drenge, ikke rene pigehold)? Det bekræfter at
   metoden i punkt 3-4 faktisk virker, før man lægger vægt på resultatet for den uafklarede
   rest.
6. Rapportér en klar konklusion i resultatnoten: skal S4/D2-resten (eller dele af den)
   lægges til "4 spillere", til "4 piger", eller forblive en selvstændig, uafklaret
   kategori? Giv tal (andele, ikke kun eksempler) som belæg.

## Afgrænsning

- INGEN ny scraping — al nødvendig data findes allerede i `national-spillere.db` (opgave
  119-121) og `liga-landskab.db`.
- Rør IKKE `gsb-statistik-normalized.db`, `liga-landskab.db` eller `national-spillere.db`'s
  indhold — kun læsning. Denne opgave producerer kun en analyse/rapport, ikke en
  databaseændring.
- Ret IKKE `112-generate-spilleformats-katalog.mjs`s kendte `spillefamilie`-bug i denne
  opgave — det er en separat, allerede dokumenteret opgave.
- Gæt IKKE dig til en konklusion hvis stikprøven er uklar — rapportér usikkerheden
  eksplicit i stedet.

## Kontekst

- `work/loeste/115-manuel-rangeringsmetode-og-fund.md` — den oprindelige beskrivelse af
  S4/D2-resten og de kanoniske signaturer for de øvrige formater
- `statistik/results/112-spilleformats-katalog-alle-aargange.json` — kataloget (bruges kun
  til at finde kandidat-puljer, ikke som endelig sandhed pga. regionsdubletter)
- `statistik/data/liga-landskab.db` — kilde til rå `category_raw`, `league_groups`,
  `external_match_id` uden aggregering
- `statistik/data/national-spillere.db` — spillerniveau-data med kønsafgørelse (opgave
  119-121), bruges til at afgøre den faktiske holdsammensætning
- `statistik/scripts/112-generate-spilleformats-katalog.mjs` — indeholder
  `parse046()`/`spillefamilie`-logikken, læs den for at forstå hvordan formatord genkendes
  i fritekst, så du kan genbruge samme keyword-liste konsistent

## Kontrol

- Vis eksplicit hvordan dit deduplikerede antal puljer er talt, så det er reproducerbart
  (ikke bare et endeligt tal).
- Stikprøven i punkt 3 skal være tilfældig eller spredt, ikke udvalgt til at bekræfte en
  bestemt konklusion.
- Kontroltjekket i punkt 5 (de bekræftede "4 spillere") skal rapporteres FØRST, som
  validering af metoden, før den uafklarede rest vurderes.
- Bekræft at alle tre databaser er uændrede efter arbejdet (hash før/efter).

## Ved tvivl

Spørg Christoffer hvis: den korrekte deduplikeringsnøgle for puljer i `liga-landskab.db`
ikke er entydig, hvis stikprøven af S4/D2-resten viser et klart blandet mønster der ikke
kan opløses i "4 spillere" vs. "4 piger" alene, eller hvis kontroltjekket i punkt 5 IKKE
bekræfter den forventede sammensætning for de kendte "4 spillere"-kampe (det ville
betyde metoden i sig selv er upålidelig, og så skal der findes en anden vej før resten
kan afgøres).

## Gren

`arbejde/122-s4d2-rest-afklaring`

## Spørgsmål

(udfyldes hvis noget er uklart under arbejdet)

## Resultatnote

- Arbejdsgren: `arbejde/122-s4d2-rest-afklaring`.
- Analysen læser direkte `liga-landskab.db` råtabeller. Fysisk pulje-nøgle: `(season_id, age_group_id, league_group_id)`; ungdomsfilter `age_group_id IN (2,3,4,5,6,7,18)`, UNG (21) udeladt.
- 6.765 puljer havde match_category-data. 5.093 havde præcis fire S-koder (`1.–4. S`) og to D-koder (`1.–2. D`). 4.318 af disse havde et kendt tekstsignal; 775 havde ingen kendt formatord. Det er den korrigerede deduplikerede rest. 112-katalogets 59.127 region-forekomster og 18.546 katalogpuljer bruges kun som sammenligning, ikke som facit.
- Kontrol blev kørt først: 30 spredte kendte “4 spillere”-puljer; 30/30 havde national spillerdata. Distinkte spillerstatusser: 74 mand, 25 kvinde, 154 ikke afklaret.
- Reststikprøve: 60 spredte puljer; 55/60 havde national spillerdata, 849 gemte spillerrelationer. Distinkte statusser: 142 mand, 69 kvinde, 253 ikke afklaret.
- `player_matches.team_side`, `partner_player_id` og `opponent_player_id` var NULL i de undersøgte nationaldata. Derfor er spillere ikke fordelt på hjemme-/udehold; ingen holdtilhørsforhold er gættet.
- Konklusion: S4/D2-resten kan ikke forsvarligt lægges til hverken “4 spillere” eller “4 piger” på dette datagrundlag. Den forbliver en selvstændig uafklaret kategori.
- Alle tre databaser blev hashkontrolleret før og efter den read-only kørsel; hashene var identiske:
  - `liga-landskab.db`: `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`
  - `national-spillere.db`: `598908DA8CD1F9D468BA3CBD27FE1E2125A99D738579E8E3EA0DF3C0D6960DEF`
  - `gsb-statistik-normalized.db`: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`
- Resultater: `statistik/results/122-s4d2-rest-afklaring.md` og `.json`; reproducerbart script: `statistik/scripts/122-s4d2-rest-afklaring.mjs`.

### Kontroloutput

- Puljetotaler: 6.765 med kategoridata / 5.093 S4/D2 / 4.318 kendt tekst / 775 uden kendt tekst.
- Kontrol: 30 puljer, 30 med spillerdata, 74 mand / 25 kvinde / 154 ikke afklaret.
- Rest: 60 puljer, 55 med spillerdata, 142 mand / 69 kvinde / 253 ikke afklaret.
- Databaser skrevet: 0.
