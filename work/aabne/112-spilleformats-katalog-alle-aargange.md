# Opgave 112 — fuldt katalog over alle holdkampsopstillings-formater, for hele datasættet og alle aldersgrupper

**Trin:** Ny (bygger på 086c/103's spilleforms-standard, forudsætning for 113's rangering).

**Baggrund:** Christoffer har præciseret hvorfor spilleforms-familie-arbejdet (086c/103) blev startet:
ungdomsholdene kunne ikke følges korrekt, fordi de spiller i forskellige HOLDOPSTILLINGSFORMATER
(hvor mange spillere, hvor mange herre-/dame-/mixed-poster, fx "4 singler", "2 doubler", "2+2",
"4 spillere", "4 piger") — ikke kun forskellige niveauer. 103's klassifikation afgør allerede hvilken
familie en pulje hører til, men der findes IKKE noget samlet, udtømmende KATALOG over alle de formater
der reelt findes i hele datasættet — kun de familier 086c's stikprøve tilfældigt observerede.

Christoffer vil nu have et komplet overblik, FOR HELE datasættet (ikke en stikprøve) og FOR ALLE
aldersgrupper (senior, ungdom U09-U19, veteran) — som forudsætning for at kunne bygge en rangering af
formaterne (opgave 113).

**Vigtigt fund fra denne opgaves forberedelse:** en gennemgang af 086c's egne tekstsignal-fund viser at
nogle af de eksisterende "familier" faktisk er VETERAN-ALDERSGRÆNSER (fx "50+2", "60+4", "40+45" —
disse er alder-/pointtærskler for hvem der må spille, ikke en holdopstillingsform), forkert blandet
sammen med reelle opstillingsformater (4+3, 2+2, 4 spillere, 4 piger) i samme tekstsignal-kategori.
Christoffer har bekræftet at disse SKAL holdes strengt separat: aldersgrænser er en selvstændig
dimension (hvem må spille), ikke en holdopstillingsform, og skal renses ud af formats-kataloget.

## Mål

1. **Byg et udtømmende katalog over alle reelle holdopstillingsformater i HELE datasættet**
   (ikke kun 086c's tekstsignal-stikprøve) — for hver unikke kombination af antal spillere/poster og
   deres køns-/kategorisammensætning (fx "4 herresingler + 4 damesingler", "2 herredouble + 2
   damedouble", "2+2 mixed", "4 spillere blandet"), baseret på de FAKTISK GEMTE `match_categories` for
   hver pulje — den samme kilde 103's klassifikation allerede bruger som primær kilde, men nu brugt til
   at ENUMERERE alle unikke kombinationer i stedet for kun at klassificere familie-tilhørsforhold.
2. **Dæk alle aldersgrupper eksplicit** (senior `age_group_id=1`, veteran 9/11/12/13/17, ungdom
   2/3/4/5/6/18) — rapportér kataloget PR. ALDERSGRUPPE, ikke kun samlet, fordi formaterne kan variere
   markant mellem dem (fx ungdommens "4 spillere"/"2+2"/"4 piger" vs. veteranernes aldersgrænse-koder).
3. **Separer aldersgrænse-koder (50+, 60+ osv.) fra reelle opstillingsformater** eksplicit i kataloget
   — de skal fremgå som en ANDEN kolonne/dimension ("gyldig for spillere X+ år"), ikke som endnu et
   format i selve opstillings-listen. Dette gælder specifikt de tekstsignal-fund som allerede er
   identificeret som problematiske (`50+2`, `60+4`, `40+45`, `35+4`, `17+4` m.fl. — bekræft om `17+4`
   er en aldersgrænse eller noget andet, det er ikke entydigt ud fra navnet alene).
4. **For hvert katalogiseret format, angiv dækning**: hvor mange puljer/rækker/sæsoner bruger det,
   hvilke aldersgrupper, om det er fundet via kategorisignatur (sikkert) eller kun tekstsignal
   (svagere, jf. 103's egen fallback-hierarki) — så 113's rangeringsarbejde kan se hvor solidt hvert
   format er belagt.
5. **Flag eventuelle formater der IKKE kan katalogiseres tydeligt** (utilstrækkelig kategoridata OG
   intet klart tekstsignal) som en selvstændig "ukendt format"-gruppe, med et konkret antal — dette er
   samme "Ukendt format"-kategori 103 allerede har, men skal nu rapporteres eksplicit som en del af
   det fulde katalog, ikke skjules.

## Afgrænsning

**Må røres:** nyt script under `statistik/scripts/` (kan bygge videre på `103-086c-klassifikation.mjs`
og dens `categorySignatures`-logik, men laver en ny ENUMERINGS-rapport, ikke en ændring af 103's
klassifikation selv), nye outputfiler under `statistik/results/`.

**Må ikke røres:** `statistik/data/*.db` (kun læses), `103-086c-klassifikation.mjs`,
`104-national-styrke-dag.json`, `105-national-styrke-dag.json` (alle læses evt. som reference, ændres
ikke), `apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`.

## Kontekst

- `statistik/scripts/103-086c-klassifikation.mjs`, `docs/statistik-plan.md`s "Spilleforms-standard" —
  den eksisterende tre-lags klassifikationsmetode (kategorisignatur → arv → tekstsignal → ukendt) som
  denne opgave bruger, men til enumering i stedet for familie-afgørelse.
- `statistik/results/086c-udvidet-visuelt-kort.html` — de allerede observerede tekstsignal-fund,
  inklusive de formodede aldersgrænse-koder der skal renses ud.
- `statistik/results/046-holdidentitet-ungdom-holdtype-niveau.md` — eksisterende research om
  ungdommens holdtype/niveau-parsing (fx "X1" som holdtype, ikke niveau) — genbrug denne viden i
  stedet for at genopfinde den.

## Kontrol

**Målet:**
```
Der findes et katalog over alle unikke holdopstillingsformater, pr. aldersgruppe, med dækningstal.
Aldersgrænse-koder (50+/60+ osv.) er entydigt separeret fra opstillingsformater i kataloget.
"Ukendt format"-gruppen er rapporteret som et konkret, synligt antal, ikke skjult.
```

**Værnet:**
```
git status --short statistik/data/   tom
103's eksisterende klassifikationsscript er ikke ændret — kun brugt/genbrugt som datakilde.
Intet format er opfundet uden belæg i de faktisk gemte category_raw-værdier eller et tekstsignal i
  rækkenavnet.
```

**Skøn:** hvordan man konkret afgør om en tvetydig kode (fx "17+4") er en aldersgrænse eller et
opstillingsformat, er Codex' eget skøn — undersøg konteksten (hvilken aldersgruppe/pulje den optræder
i) og begrund kort i Resultatnoten; er det stadig uafklaret efter undersøgelsen, spørg i "Spørgsmål".

## Ved tvivl

Er det uklart om en tekstkode er en aldersgrænse eller et opstillingsformat, undersøg hvilken
aldersgruppe den optræder i (en kode der kun ses i veteran-rækker er sandsynligvis en aldersgrænse) —
er det stadig uklart efter det, spørg i stedet for at gætte hvilken kategori den hører til.

## Gren

`arbejde/112-spilleformats-katalog-alle-aargange`, fra `main`.

---

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
