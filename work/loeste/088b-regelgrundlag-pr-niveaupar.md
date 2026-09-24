# Opgave 088b — regelgrundlag pr. niveaupar, alle udgaver, inkl. bilag

**Trin:** Del 2 af 3 (088a/088b/088c). Forudsætter ikke nødvendigvis 088a er færdig, men bruger gerne
088a's gruppetype-katalog hvis det foreligger, til at vide PRÆCIST hvilke niveaupar der reelt findes
kvalifikations-/oprykningsspil/nedrykningsspil-strukturer for, i stedet for at gætte hvilke der er
relevante.

**Gren:** `arbejde/088b-regelgrundlag-pr-niveaupar`, fra `main`.

**Baggrund:** 086e dokumenterede tværgående regler (klub-cap, pulje-adskillelse, første-runde-møde,
afslag-kaskade) over 7 reglement-udgaver, men undersøgte ALDRIG den specifikke op-/nedrykningsSTRUKTUR
for hvert enkelt niveaupar. Et konkret eksempel viste hvor galt det kan gå uden det: Ligaen/1. divisions
struktur (§17-18) blev først fundet ved denne opgaves forarbejde, og viste at antagelsen om "fast antal
nedrykkere" var forkert (kun 1 er garanteret, en 2. afhænger af en kvalifikationskamps udfald).
Christoffer har desuden bekræftet at 1. division/2. division har en lignende kval-struktur (nr. 6-7 fra
nedrykning mod nr. 2-3 fra oprykning — men også dette tal kan forskydes af klub-cap, jf. Gentofte-sagen
i 088a).

**Vigtigt:** klub-cap-filteret fra 088a skal anvendes OVEN PÅ denne opgaves fundne regler, ikke i stedet
for. 088b finder SELVE reglen (hvem spiller mod hvem, ved hvilken placering); 088a's cap-filter afgør
om den nominelle placering reelt er berettiget den sæson.

## Mål

1. **Find og citer ordret den specifikke op-/nedrykningsstruktur for HVERT niveaupar** i BD's
   seniorholdturnering (Ligaen↔1.division, 1.↔2.division, 2.↔3.division, 3.division↔Danmarksserien,
   Danmarksserien↔regionale topkredse), for hver af de 7 allerede fundne reglement-udgaver (2020, 2022,
   2023 juli+november, 2024, 2025, 2026), plus forsøg at finde 2019/2021/2027 via Wayback Machine
   (godkendt ekstern kilde, se Afgrænsning). Byg en tabel: niveaupar → år → paragraf → ordret citat →
   antal automatiske op-/nedrykkere → antal kval-afgjorte pladser → hvem spiller mod hvem (placering).
   Marker eksplicit hvor strukturen ÆNDREDE SIG mellem år.
2. **Find og læs bilagene til DH-reglementet**, ikke kun hoveddokumentet (2026-udgaven hedder eksplicit
   "...med bilag 3" — der findes altså mindst 3 bilag). Undersøg om bilagene indeholder uddybende eller
   afvigende regler for op-/nedrykning der ikke står i selve hovedparagrafferne. Citer ordret hvis fundet.
3. **Byg samme tabel for de regionale niveauer under Danmarksserien**, i det omfang det er praktisk muligt
   inden for denne opgaves ramme — men PRIORITÉR BD-stigen (Ligaen ned til Danmarksserien) højt, og
   regionale lokalserier lavt/udskyd hvis tiden ikke rækker (Opus' anbefaling: regionale reglementer kan
   vente til BD-stigens niveauer er stabile — det er OK at stoppe her og lade regionale reglementer være
   en fremtidig opgave, dokumentér i så fald det eksplicit i Resultatnoten i stedet for at forsøge et
   ufuldstændigt hastværk).
4. **Rapportér eksplicit hvilke niveaupar/år der IKKE kunne findes eller bekræftes**, i stedet for at lade
   det stå som en stiltiende antagelse.

## Kontekst

- `work/loeste/086e-regler-dybde-og-fuld-revision.md`/`.json` — de 7 allerede fundne reglement-udgaver og
  deres URL'er, samt den tværgående regeltekst (cap, adskillelse, første-runde, afslag-kaskade).
- `work/aabne/088a-intern-kortlaegning-og-testcases.md` (eller `work/loeste/` hvis afsluttet) —
  gruppetype-kataloget der viser hvilke niveaupar der faktisk HAR kval-/oprykningsspil/nedrykningsspil-
  strukturer i vores data, så denne opgave kan målrette researchen præcist.
- Det bekræftede §17-18-citat for Ligaen/1.division (fundet i denne chatsamtale, ikke tidligere i noget
  kort) — brug som skabelon for hvordan resten af niveauparrene skal dokumenteres.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/088b-*`). Ingen database-skrivninger i denne
opgave (ren research/dokumentation).

**Må ikke røres:** `statistik/data/*.db` (kun læses, ingen skrivninger overhovedet fra dette kort),
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. **Ekstern websøgning ER godkendt af
Christoffer for denne opgave** — badminton.dk (inkl. bilag), Wayback Machine (web.archive.org) for
manglende år, BD's øvrige offentlige sider. INGEN kald til badmintonplayer.dk/nembadminton.dk's
turnerings-API — det er stadig ude af scope, uanset kilde.

## Kontrol

**Målet:**
```
Hvert niveaupar på BD-stigen har en dokumenteret, citeret struktur for hver reglement-udgave den findes i.
Ændringer i strukturen mellem år er eksplicit markeret, ikke antaget uændret.
Bilagene er læst og deres eventuelle indhold om op-/nedrykning er citeret eller eksplicit udelukket.
Manglende dækning (niveaupar/år der ikke kunne findes) er rapporteret som en liste, ikke skjult.
```

**Værnet:**
```
git status --short statistik/data/   tom (ingen databaseskrivninger fra dette kort)
Ingen kald til badmintonplayer.dk/nembadminton.dk.
Enhver strukturpåstand har et paragrafnummer + ordret citat + kilde-URL.
```

**Skøn:** ingen — enten findes citatet, eller niveauparret/året rapporteres som ikke-dækket.

## Ved tvivl

Er en reglement-udgave ikke tilgængelig (heller ikke via Wayback Machine), eller er en formulering
tvetydig mellem to kilder: dokumentér begge dele og lad det stå åbent. Samme princip som resten af
projektet.


### Roskilde-mål tilføjet efter 088a (2026-09-24)

Undersøg specifikt 2025/26-sagen: Badminton Roskilde blev nr. 4 i `league_group_id=17913` (*3. division — Nedrykning fra 3. division pulje B*) og vandt derefter kvalkamp `505717` 7-6 i `league_group_id=17915` (*Kvalkampe: Nedrykning til DS*). 088a fandt ingen `trukket`/`udgået`/W/O-markør i gemt HTML. Find den konkrete paragraf eller regel, som fastlægger hvem der går i dette nedrykningskval-spil. Test særligt klub-cap-effekt, afslag-kaskade efter §28 og andre relevante regler. Kan reglementet ikke forklare den, skal 088c få den som et konkret BD-spørgsmål.
### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

- Rapport: `statistik/results/088b-regelgrundlag-pr-niveaupar.md`.
- Roskilde-sagen er forklaret direkte: 2025 §23 stk. 4 gør nr. 4 og 5 i hvert
  3.-divisions-nedrykningsspil kvalifikationsberettigede. Kamp 505717 kræver derfor ikke en
  cap-/afslagsforklaring.
- BD-stigens fem niveaupar er dokumenteret med 2025 som fuld ordret baseline og med fundne
  2020/2022/2023-juli/2023-november/2024/2026-udgaver samt eksplicitte 2019/2021/2027-huller.
  Ligaens dokumenterede ændringer er 2020 → 2025 → 2026; 3.divisions 4-5/event og DS 5-6/event er
  bekræftet i 2020, 2022, 2025 og 2026.
- 2026-bilag 1-3, holdfællesskabstillæg og holdsætningsvejledninger er kontrolleret; ingen ændrer
  §§17-29. Regional op-/nedrykning er kredsbestemt efter §5 stk. 2 og er eksplicit udskudt.
- `statistik/results/086-liga-hierarki-viden-samlet.md` afsnit 3 er opdateret. Ingen database blev
  skrevet, og ingen badmintonplayer.dk/nembadminton.dk-kald blev foretaget.
