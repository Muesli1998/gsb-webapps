# Opgave 113 — rangér holdopstillingsformaterne i et hierarki (4+3 > 4+2 > 2+2 > 4 spillere > 4 piger, osv.)

**Trin:** Ny (bygger direkte på 112's katalog — kan IKKE startes før 112 er færdig).

**Baggrund:** Christoffer har givet en konkret rangeringsidé: holdopstillingsformater kan ordnes efter
hvor "stærkt"/"højt" formatet er, hvor flere spillere og flere pige-/dameposter generelt rangerer
højere, fordi det er sværere for en klub at stille et hold med flere piger/damer. Hans eget eksempel:
i U15 står "U15M" foran "4+3"-formatet, og maksimalt "U15A" foran et "2+2"-format — hele vejen ned til
"U15D 2+2". Rangeringen er delvist SYNLIG/dokumenteret (Badminton Danmarks egen holdkampsoversigt viser
formaterne i en bestemt visuel rækkefølge, øverst-til-nederst), og delvist Christoffers egen erfarings-
baserede vurdering (flere spillere/pigepladser = generelt "sværere at stille", ikke en formel, hård
regel i noget reglement).

**Vigtigt:** dette er IKKE en sportslig styrke-sammenligning mellem forskellige spilleform-FAMILIER
(det ville bryde 086c/103/104's "familien er et regelsæt, ikke et styrkeniveau"-princip, som stadig
gælder ubetinget for FAMILIE-niveauet). Denne rangering er noget andet: en rangering af
OPSTILLINGSFORMATER (hvor krævende er formatet at stille et hold til), som et selvstændigt lag ved
siden af familie-klassifikationen — ikke en erstatning for den, og ikke en tilladelse til at
sammenligne to forskellige familiers puljer sportsligt.

## Mål

1. **Byg først en formel-hierarki for hvert niveau/aldersgruppe hvor Badminton Danmarks/DGI's egen
   holdkampsoversigt/reglement faktisk VISER en rækkefølge** (Christoffers eksempel: U15M > 4+3 > ... >
   2+2, ned til U15D 2+2) — websøg efter den officielle visningsorden for hver aldersgruppe, og citer
   kilden (URL + dato), efter samme metode som 105.
2. **For formater/aldersgrupper hvor INGEN officiel visningsorden findes**: brug Christoffers egen
   tommelfingerregel (flere spillere og flere pige-/dameposter rangerer generelt højere, fordi det er
   sværere at stille) som en eksplicit mærket "Christoffers klubkendskab, ikke reglements-bekræftet"-
   rangering — brug den, men camoufler den aldrig som et citat.
3. **Byg én samlet rangeringstabel** der viser, for hvert format fra 112's katalog: dets plads i
   hierarkiet (tal, ikke kun rækkefølge, så der er plads til at indsætte nye formater senere), hvilken
   aldersgruppe/niveau det gælder for, og om rangeringen er reglements-/visnings-baseret eller
   Christoffers egen vurdering.
4. **Vær eksplicit om at rangeringen IKKE må bruges til at sammenligne tværs af spilleform-familier**
   sportsligt (jf. Baggrund) — dokumentér dette som en fast begrænsning i selve outputtet, ikke kun i
   opgavekortet, så en senere bruger af tabellen ikke misforstår den.
5. **Udvid `docs/statistik-plan.md`s "Spilleforms-standard"** med en kort beskrivelse af dette nye,
   selvstændige rangeringslag og dens forhold til familie-standarden — så fremtidigt arbejde ikke
   forveksler de to.

## Afgrænsning

**Må røres:** `docs/statistik-plan.md` (tilføjelse til Spilleforms-standarden), nyt script under
`statistik/scripts/` (bygger videre på 112's katalog-output), nye outputfiler under
`statistik/results/`.

**Må ikke røres:** `statistik/data/*.db`, `103-086c-klassifikation.mjs` (familie-klassifikationen
selv rører denne opgave IKKE — rangeringen er et nyt, sideordnet lag), `104-national-styrke-dag.json`,
`105-national-styrke-dag.json`, `apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`.
Websøgning er tilladt for punkt 1.

## Kontekst

- `work/aabne/112-spilleformats-katalog-alle-aargange.md` og dens resultat — den forudsætning denne
  opgave bygger direkte på. Start ikke denne opgave før 112 er afsluttet.
- `docs/statistik-plan.md`, "Spilleforms-standard" — familie-princippet ("familien er et regelsæt, ikke
  et styrkeniveau") som denne opgaves rangering skal respektere, ikke underminere.
- `statistik/results/046-holdidentitet-ungdom-holdtype-niveau.md` — eksisterende viden om ungdommens
  niveau-bogstaver (A/B/C/D) og holdtype-koder, relevant for at forstå hvordan "U15M"/"U15A"/"U15D"
  hænger sammen med holdtype-koderne.

## Kontrol

**Målet:**
```
Der findes én samlet rangeringstabel, der dækker alle 112's katalogiserede formater pr. aldersgruppe.
Hver rangering er mærket enten "reglements-/visningsbaseret" (med citat) eller "Christoffers
  klubkendskab" — aldrig fremstillet som citeret uden at være det.
Statistik-plan.md's Spilleforms-standard er udvidet med det nye rangeringslag og dets afgrænsning fra
  familie-standarden.
Outputtet siger eksplicit at rangeringen ikke må bruges til at sammenligne tværs af familier.
```

**Værnet:**
```
git status --short statistik/data/   tom
103's familie-klassifikation er uændret.
Ingen rangering uden enten et citat eller en eksplicit "Christoffers klubkendskab"-mærkning.
```

**Skøn:** hvordan man konkret omsætter Christoffers tommelfingerregel til en numerisk rangering for
formater uden nogen officiel visningsorden, er Codex' eget skøn — begrund den valgte logik kort i
Resultatnoten, og brug Christoffers eget eksempel (flere spillere/pigepladser = højere) som den
styrende retningslinje.

## Ved tvivl

Er det uklart hvor et format skal placeres i hierarkiet (fx et sjældent format 112 fandt, som ikke
ligner noget Christoffer har nævnt), spørg i "Spørgsmål" i stedet for at gætte en placering.

## Gren

`arbejde/113-spilleformats-rangering-hierarki`, fra `main`.

---

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
