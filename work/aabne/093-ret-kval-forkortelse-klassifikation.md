# Opgave 093 — ret klassifikationsfejl for "Kval."-forkortelser i group_type_katalog

**Trin:** Test & Validation

**Baggrund:** Under opgave 092's Opfølgning 1 (se `work/aabne/092-hold-identitet-automatiseret-traadmatching.md`,
gren `arbejde/092-hold-identitet-traadmatching`) forsøgte Codex at bruge `group_type_katalog` (bygget i
088a) til at afgøre hvilken af flere samme-sæson-rækker for et hold der er den kanoniske grundspilsrække.
Det blokerede: kataloget klassificerer fx `2. division / Kval. til 1. div.` som `grundspil`, selvom det er
en kvalifikationsgruppe.

Rodårsagen er fundet og er en præcis, lokaliseret regex-fejl i
`statistik/scripts/088a-intern-kortlaegning.mjs`, funktionen `classify()`:

```
if (/(kvalifikation|kvalkampe)/.test(s)) { ... }
```

Denne test kræver det fulde ord "kvalifikation" eller "kvalkampe" — den matcher IKKE forkortelsen "Kval."
eller sammensætninger som "Kvalpulje"/"Kvalkamp". Rækker med disse forkortede navne falder derfor igennem
til sidste regel (`/(grundspil|pulje|serie|division|ligaen)/`), som rammer på ordet "division"/"pulje" i
navnet og fejlklassificerer dem som `grundspil`.

Stikprøve mod nuværende `liga-landskab.db` viser 19 kombinationer ramt af præcis denne fejl, bl.a.:

```
('Kval - 5+3', 'Pulje 1', 'grundspil')
('2. division', 'Kval. til 1. div.', 'grundspil')
('DMU H 6000 - 4 spillere', 'Kvalpulje A'/'Kvalpulje B', 'grundspil')  (flere DMU-aldersklasser, samme mønster)
('Kredsserien Vest', 'Kvalkamp', 'grundspil')
('Kval-rækken 5+3'/'Kval-rækken 5 + 3', 'Pulje 1', 'grundspil')
```

Dette er en anden, konkret fejl end den tidligere kendte Guldmatchen/Bronzematchen-fejlklassificering
(samme funktion, men den fejl skyldes ordvalg i selve kildeteksten — ikke behandlet af denne opgave,
medmindre en oplagt, lige så snæver rettelse falder naturligt ud af samme arbejde; gæt ikke det ind,
spørg hvis det er tvetydigt).

## Mål

Ret `classify()` i `statistik/scripts/088a-intern-kortlaegning.mjs` så forkortelsen "Kval." (med punktum,
inklusiv sammensætninger som "Kvalpulje", "Kvalkamp", "Kval-rækken") fanges af samme gren som
"kvalifikation"/"kvalkampe", FØR fallback-reglen til `grundspil`. Kør scriptet igen for at genopbygge
`group_type_katalog`-tabellen i `statistik/data/liga-landskab.db` med den rettede klassifikation, og
regenerér `statistik/results/088a-intern-kortlaegning.md`/`.json`.

## Afgrænsning

**Må røres:** `statistik/scripts/088a-intern-kortlaegning.mjs`, `statistik/results/088a-intern-kortlaegning.md`,
`statistik/results/088a-intern-kortlaegning.json`, og — kun via scriptets egen genkørsel, ikke manuel
redigering — tabellen `group_type_katalog` i `statistik/data/liga-landskab.db`. Det er en tabel bygget af
os selv i 088a, ikke rå BD-data (jf. 091's note om samme tabel), så en genkørsel af det rettede script er
tilladt, men ingen anden tabel i databasen må ændres.

**Må ikke røres:** Alle andre tabeller i `liga-landskab.db` (rå importerede data), `statistik/data/gsb-statistik-normalized.db`,
`statistik/results/089-liga-1div-revisionstabel.*`, `apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`.
Ingen nye API-kald.

## Kontekst

- `statistik/scripts/088a-intern-kortlaegning.mjs` — kilden til fejlen, `classify()`-funktionen omkring
  linje 12–24.
- `work/loeste/088a-intern-kortlaegning-og-testcases.md` — den oprindelige opgave der byggede kataloget.
- `work/aabne/092-hold-identitet-automatiseret-traadmatching.md`, afsnittet "Opfølgning 1" og
  "### Spørgsmål" — den blokerede opgave der fandt behovet. Når 093 er løst, kan 092 genoptages og bruge
  det rettede katalog.

## Kontrol

**Målet — hvad skal blive sandt:**

```
Efter genkørsel: de 19 nu-kendte "Kval."-forkortelses-kombinationer klassificeres IKKE længere som
`grundspil` — de skal ligge under `kvalifikation_op`/`kvalifikation_ned`/`andet/ukendt` alt efter retning,
samme logik som allerede gælder for det fulde ord "kvalifikation". Rapportér det faktiske antal og deres
nye klassifikation.
```

**Værnet — hvad må ikke ændre sig:**

```
git status --short statistik/data/liga-landskab.db   (kun denne fils indhold må ændre sig via scriptets
  egen genkørsel — ingen anden fil i statistik/data/ må røres)
Rækker der allerede var korrekt klassificeret (fx fulde "kvalifikation"-ord, Kvartfinaler/Semifinaler/
  Guldkamp/Bronzekamp under slutspil) er UÆNDREDE efter rettelsen.
Ingen kald til badmintonplayer.dk/nembadminton.dk.
```

**Skøn** (kan ikke måles):

- Er der stadig tvivlsomme "Kval"-lignende navne efter rettelsen (fx en forkortelse regex'en ikke fanger),
  skal de ende i `andet/ukendt`, ikke gættes ind i en kategori.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** — særligt om en ny variant af
"Kval"-forkortelsen bør tælles som `kvalifikation_op` eller `kvalifikation_ned`, hvis retningen ikke er
entydig ud fra navnet alene.

## Gren

`arbejde/093-ret-kval-forkortelse-klassifikation`, fra `main`.

---

## Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
Katalog før genkørsel: 8.928 rækker
`Kval`-kombinationer fejlklassificeret som `grundspil`: 19

Kørsel: node statistik/scripts/088a-intern-kortlaegning.mjs --write-db
Katalog efter genkørsel: 8.928 rækker

Typeforskel mod den tidligere classifier: 19
  fra `grundspil`: 19
  til `andet/ukendt`: 19
  uventede ikke-`Kval`-ændringer: 0

De 19 rækker har nu `classification_basis`:
  `kvalifikation uden retning`

Kontrolrækker efter genkørsel:
  Badmintonligaen / Kvartfinaler: slutspil
  Badmintonligaen / Semifinaler: slutspil
  Badmintonligaen / Guldkamp: slutspil
  Badmintonligaen / Bronzekamp: slutspil

Tabeltællinger før/efter (andre tabeller): uændrede
  league_groups: 18.546
  league_group_teams: 96.823
  league_matches: 203.012
  match_categories: 1.300.474
  match_games: 2.636.258
  standing_indexes: 16.269
  group_type_katalog: 8.928

SHA-256 før/efter:
  gsb-statistik-normalized.db:
  49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E
  089-liga-1div-revisionstabel.json:
  DDF63BE29D6B886CB6814C76C28D462C87B5F7EF76E56DCB116DD261A2316DC1
  089-liga-1div-revisionstabel.csv:
  3FE906E116B3E5500ED97715D973392B40E3A3592A41D4C830FFC15ACCB568EA
  liga-landskab.db før: 4E5E5FD734BDAF574CDD86D991ADB8B1341931250F14B0788EDE982646A9C3BC
  liga-landskab.db efter: 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C
  (forventet ændring: kun genopbygget group_type_katalog)
```

**Hvad blev gjort:** Udvidede kvalifikationsgrenen i `classify()` med
`Kval.`, `Kvalpulje`, `Kvalkamp` og `Kval-rækken` før den brede
grundspils-fallback. Den eksisterende retningslogik blev bevaret, så alle
19 navne uden utvetydig op-/nedrykningsretning lander som `andet/ukendt`
frem for at blive gættet som op eller ned. Scriptet genopbyggede derefter
kun `group_type_katalog` og regenererede 088a-rapporten i begge formater.

**Hvad blev fravalgt og hvorfor:** Guldmatchen/Bronzematchen-fejlen er ikke
ændret. Den er en selvstændig navneklassifikationsfejl og var udtrykkeligt
uden for opgaven. Ingen rå importtabel, 089-resultat eller ekstern kilde er
rørt.

**Commits:**
