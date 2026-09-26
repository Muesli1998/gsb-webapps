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

(Ingen ved oprettelse.)

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
(indsæt det faktiske output, ikke en beskrivelse af det)
```

**Hvad blev gjort:**

**Hvad blev fravalgt og hvorfor:**

**Commits:**
