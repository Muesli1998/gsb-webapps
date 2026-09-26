# Opgave 101 — udvid tråd-matchingen til regionernes puljer, med GSB's egne hold som facit

**Trin:** Videreudvikling / Results (fortsætter 089/092's spor ned i regionerne)

**Baggrund:** Christoffer vil have Statistik klar til at vise for bestyrelsen (primært GSB's egen),
og har præciseret hvad "færdig" konkret betyder her: **ikke** nødvendigvis Preview-siden endnu, men en
sikkerhed for at holdenes identitet er korrekt forbundet hen over sæsonerne — "ihvertfald ... GSB
holdene korrekt henover sæsonerne".

Opgave 089/092 dækker allerede DH-hovedturneringen (Ligaen → Danmarksserien) med automatiseret
tråd-matching, verificeret i 094. Opgave 095 kortlagde regionernes puljestruktur under
Danmarksserien og fandt at **København — GSB's egen region — er den mindst problematiske**:
en DB-kontrol (denne opgaves egen research, 2026-09-26) viser at GSB's seniorhold udelukkende har
spillet i DH-hovedturneringen og Københavns-regionens serier (`KS-Pulje`, `KBH Serien`,
`Københavnsserien`, `1.-33. Serie` m.fl.) — ALDRIG i Kredsserien Vest eller Bornholmsserien. 095's
fund for København er allerede et facit, ikke et åbent spørgsmål:

> KS-familien (`KS-Pulje`, `KS Serie`, `KS-P1/P2`, med Oprykning/Nedrykning), 2011/12–2017/18;
> `KBH Serien P1/P2`, 2018/19–2021/22; `Københavnsserien`, 2022/23–2026/27 — tre dokumenterede
> navnefamilier, ikke et hul.

Denne opgave implementerer DEN mapping i selve tråd-matchingen, med GSB's egne holds
sæson-til-sæson-kontinuitet som den konkrete, efterprøvelige accepttest — ikke Kredsserien Vests
oprindelse eller Bornholms nedlukning, som er en separat, parkeret opgave (se 102 i `work/future/`)
uden praktisk betydning for GSB's egne hold.

## Mål

1. Byg en regions-/periodebevidst udvidelse af 089/092's niveau- og trådlogik for Københavns-regionen
   (`region_id` 8), efter 095's egen anbefaling ("Konsekvens for en senere 089/092-udvidelse"): en
   eksplicit, versioneret mapping fra `(region_id, sæsoninterval, division_name_raw-familie)` til
   regionalt niveau, IKKE et forsøg på én global `levelFromDivision()` for alle regioner.
2. Kobl Københavns-regionens niveauer til DH-hovedturneringens eksisterende niveauer der hvor
   `league_group_regions`/`group_type_katalog` allerede dokumenterer forbindelsen (095 nævner
   konkret: `Københavnsserien / Oprykning til Danmarksserien` fra 2022/23, `Nedrykning til serie 1`
   fra 2025/26) — så et hold der rykker mellem Københavnsserien og Danmarksserien/3. division ikke
   fremstår som et brudt tråd.
3. **Kør den udvidede tråd-matching og verificér SPECIFIKT for GSB's egne hold** (alle
   `team_name_raw LIKE 'Gladsaxe Søborg%'`-rækker i `league_group_teams`, seniorniveau
   `age_group_id=1`, alle sæsoner i databasen): kan hvert GSB-seniorhold følges sammenhængende
   gennem KS-familien → KBH Serien → Københavnsserien-navneskiftene, uden falske brud eller falske
   sammenkoblinger? Rapportér dette som en selvstændig, navngivet kontrol — ikke kun et aggregeret
   tal for alle klubber i regionen.
4. Andre klubbers hold i Københavns-regionen tråd-matches efter samme logik som et sideeffekt, men
   er ikke denne opgaves primære accepttest.

## Afgrænsning

**Må røres:** en ny eller udvidet version af 089/092's generator-scripts (navngiv efter samme mønster,
fx `101-...mjs`, eller udvid eksisterende hvis det er mest naturligt — begge er ok, dokumentér valget),
disses outputfiler, denne opgaves kortfil.

**Må ikke røres:** Kredsserien Vest, Bornholmsserien, og de øvrige regioner ud over København —
de er eksplicit UDENFOR scope her (se opgave 102 for Kredsserien Vest/Bornholm som separat, parkeret
spor). `group_type_katalog` må læses, ikke ændres. `statistik/data/gsb-statistik-normalized.db`,
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. Ingen nye API-kald til
badmintonplayer.dk/nembadminton.dk (websøgning er ikke nødvendig her — 095 har allerede kildebelagt
navnefamilierne via DB-analyse).

## Kontekst

- `statistik/results/095-regional-puljestruktur-kortlaegning.md`, linje 22 (Københavns navnefamilier)
  og "Konsekvens for en senere 089/092-udvidelse".
- `statistik/scripts/089-generate-liga-1div-revisionstabel.mjs` og
  `statistik/scripts/092-hold-identitet-traadmatching.mjs` — den eksisterende logik denne opgave
  udvider, analogt med hvordan 094 udvidede til 3. division/Danmarksserien.
- `docs/statistik-plan.md`, "Holdidentitets-standard" — senior/veteran-identitet er
  `name_raw + age_group_id`, uændret af denne opgave.
- `docs/BESLUTNINGER.md` og denne opgaves egen baggrund for hvorfor København er valgt før
  Kredsserien Vest/Bornholm.

## Kontrol

**Målet — hvad skal blive sandt:**

```
Alle GSB-seniorhold (team_name_raw LIKE 'Gladsaxe Søborg%', age_group_id=1) kan følges sammenhængende
  gennem sæsonerne 2011/12-2026/27, inklusive gennem KS-familien → KBH Serien → Københavnsserien-
  navneskiftene og op/ned mod DH-hovedturneringen, uden uforklarede brud.
Rapportér: antal GSB-hold-tråde total, antal sammenhængende, antal med brud, og for hvert brud:
  er det et ægte hul i kildedata, eller en fejl i matchingen? (Aldrig gæt — dokumentér hvilket.)
```

**Værnet — hvad må ikke ændre sig:**

```
git status --short statistik/data/                                tom
Kredsserien Vest/Bornholmsserien-rækker optræder IKKE i den nye mapping (kontrollér eksplicit).
statistik/data/gsb-statistik-normalized.db er BYTE-FOR-BYTE uændret.
statistik/data/liga-landskab.db er BYTE-FOR-BYTE uændret (kun læst).
089/092's eksisterende facit for DH-hovedturneringen (166/170 fra 092, 2.206 rækker fra 094)
  regredierer ikke.
```

**Skøn** (kan ikke måles):

- Om et resterende, uforklaret brud i GSB's egne holds tråd er en ægte datamangel (fx holdet
  udgik en sæson) eller en matchingfejl, kræver Christoffers egen kendskab til klubbens historie i
  nogle tilfælde — flag dem eksplicit til hans gennemgang i stedet for at gætte.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** — særligt ikke på om et
GSB-holds tilsyneladende brud er en fejl eller en ægte hændelse (holdet meldte afbud en sæson, blev
lagt sammen med et andet hold osv.) uden at kunne pege på konkret evidens.

## Gren

`arbejde/101-koebenhavn-traadmatching-gsb-facit`, fra `main`.

---

## Spørgsmål

**Besvaret af Chris (via Claude), 2026-09-26 — GSB hold 4:** bekræftet fra egen klubviden: GSB havde
i lang tid kun 3 "rigtige" faste seniorhold. Hold 4 var reelt væk i 2016/17-2022/23, ikke en
fortsættelse under et andet nummer/navn. Databasens egne markører understøtter dette direkte: 2015
har en `Gladsaxe Søborg 5 udgået`-række, og 2016 har både `Gladsaxe Søborg 4 udgået` og
`Gladsaxe Søborg 4 trukket` — dvs. et konkret, dokumenteret forsøg på et 4./5. hold i 2015-16 der blev
meldt ud/trukket samme eller næste sæson, efterfulgt af en reelt NY hold 4-tilmelding fra 2023/24.

**Konsekvens for matchingen:** brug IKKE en antagelse om kontinuitet for GSB hold 4 hen over
2016/17-2022/23 — bevar bruddet som det det er (holdet eksisterede ikke i den periode), og markér det
i rapporten som "bekræftet ægte pause, ikke en matchingfejl", med denne besvarelse som kilde i stedet
for en gættet sammenkobling.

De to øvrige same-season-uklarheder (GSB hold 5 i 2015/16, GSB hold 4 i 2016/17: `udgået`/`trukket`-
par) er IKKE eksplicit bekræftet af Chris ud over det ovenstående — de to rækker for hold 4 i 2016/17
(`udgået` og `trukket`) er sandsynligvis to sider af samme afmeldingshændelse snarere end to
forskellige hold, men fortsæt med at dokumentere dem som en uklarhed hvis kilden ikke giver et
utvetydigt facit, i stedet for at gætte at de er identiske.

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
København-mapping: region_id=8, age_group_id=1, kun grundspil.
København-kilder efter mapping: 1.301
DH-kilder fra uændret 089-output: 2.206
Kanoniske sæsonknuder: 3.475
Automatiske nabosæson-kanter: 2.920
Samme-sæson ambiguity reviews: 16

GSB seniorhold: DH + København
  tråde: 7
  sammenhængende mellem observerede sæsoner: 6
  tråde med internt brud: 1
  bekræftede ægte pauser: 1
  uforklarede brud: 0
  same-season-uklarheder: 2
  automatiske DH↔København-overgange: 2

092 DH-baseline læst, ikke ændret: 166/170 automatiske facitkanter,
2.206 kilder.
Kredsserien Vest/Bornholmsserien i mapping: 0/0

gsb-statistik-normalized.db SHA-256 før/efter:
49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E
49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E
liga-landskab.db SHA-256 før/efter:
9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C
9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C
```

**Hvad blev gjort:**

- Tilføjede en selvstændig, versioneret København-parser i
  `101-koebenhavn-traadmatching.mjs` og beholdt 089/092's DH-output som
  uændret input.
- Kortlagde KS-familien (2011/12–2017/18), KBH Serien (2018/19–2021/22),
  Københavnsserien (2022/23–2026/27) og nummererede Serie-rækker uden at
  antage deres indbyrdes styrke.
- Rettede under kørslen en konkret parserfejl, der først udelukkede
  `KS-Pulje 2`/`KS Serie P1` og `Serie 1`-formen. Den rettede kørsel fjerner
  to kunstige GSB-brud.
- Dokumenterede de to direkte, automatiske GSB-overgange mellem København og
  Danmarksserien. GSB hold 4's pause 2016/17–2022/23 er nu eksplicit
  markeret som bekræftet ægte pause, ikke en matchingfejl, med Chris via
  Claude som kilde.

**Hvad blev fravalgt og hvorfor:**

- Ingen ændring til `group_type_katalog`, databaser, Kredsserien Vest,
  Bornholmsserien eller andre regioner.
- Ingen kunstig kontinuitetskant over GSB hold 4's bekræftede pause.
- Ingen automatisk identifikation af de to same-season-uklarheder; den gemte
  evidens afgør ikke entydigt hvilken kilde der er kanonisk.

**Commits:** 079e063 (`Opgave 101: kortlaeg Kobenhavn traadmatching og GSB-brud`);
opfølgningen committes på denne gren efter opdateringen.
