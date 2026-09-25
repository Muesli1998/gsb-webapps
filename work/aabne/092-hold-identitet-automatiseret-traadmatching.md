# Opgave 092 — automatiseret hold-identitets-matching til Trådtavlen

**Trin:** Test & Validation / Results

**Baggrund:** Opgave 091 udvidede `089-liga-1div-revisionstabel` fra 347 til 632 rækker og rettede
(O)/(N)-retningen. Konsekvensen, dokumenteret i 091's Resultatnote: 225 af 347 gamle Trådtavle-nøgler er
uændrede, 407 nye er tilkommet, 126 gamle er fjernet/ændret — en stor manuel genbekræftelsesrunde venter
Christoffer i hans browser-baserede Trådtavle. Denne opgave forsøger at reducere den manuelle byrde ved at
automatisere selve holdidentitets-matchingen mellem på hinanden følgende sæsoner.

Christoffer har leveret 171 allerede bekræftede tråde (27 kæder, 197 hold-forekomster, 170
sæson-til-sæson-kanter) som facitliste, genereret 2026-09-25T14:57 fra hans Trådtavle — se
`work/aabne/referencer/092-bekraeftede-traade.json`. Manuel efterprøvning af en simpel normaliseringsregel
mod denne facitliste (før denne opgave startes) gav:

```
Regel: normalisér "hold" til "klub + holdnummer" (intet tal i navnet = holdnummer "1"),
fjern KUN (O)/(N)/(M)-suffikset (det er historik, ikke identitet), match to hold i på
hinanden følgende sæsoner hvis deres normaliserede nøgle er ens.

166/170 kanter matcher direkte (97,6%).
De 4 der ikke matcher er alle sponsornavne-skift, ikke normaliseringsfejl:
  - Odense OBK (N) 2019/2020 → RSL ODENSE OBK (O) 2020/2021
  - RSL ODENSE OBK 2024/2025 → Odense OBK 2025/2026
  - Højbjerg 2018/2019 → Højbjerg/Via Biler 2019/2020
  - Højbjerg/Via Biler (M) 2024/2025 → Højbjerg 2025/2026
```

## Mål

Et script der kører den empirisk validerede matchingregel på HELE `089-liga-1div-revisionstabel` (alle tre
niveauer — Ligaen, 1. division, 2. division — alle sæsoner, ikke kun de 27 kæder Christoffer allerede har
bekræftet) og genererer et forslag til hold-identitets-kæder, som Christoffer kan bruge til at fremskynde
genbekræftelsen i sin egen Trådtavle i stedet for at starte helt forfra på de 632 rækker.

## Afgrænsning

**Må røres:** ny fil `statistik/scripts/092-hold-identitet-traadmatching.mjs` (eller tilsvarende navn),
ny outputfil `statistik/results/092-traadmatching-forslag.json`.

**Må ikke røres:** `statistik/data/*.db`, `statistik/results/089-liga-1div-revisionstabel.*` (kun læses),
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. Ingen nye API-kald. Christoffers egen
browser-lagrede Trådtavle røres ikke af scriptet — det er hans, ikke repoets.

## Kontekst

- `statistik/results/089-liga-1div-revisionstabel.json` — kilden, 632 rækker, alle tre niveauer, alle
  sæsoner (2010/2011–2026/2027), efter 091's rettelser.
- `work/aabne/referencer/092-bekraeftede-traade.json` — facitlisten (171 bekræftede tråde / 170 kanter),
  KUN til validering. Indlæs den ikke som datakilde i selve outputtet.
- `work/loeste/091-fix-on-retning-og-fuld-1div-2div-daekning.md` — hvorfor (O)/(N)/(M) betyder historisk
  bevægelse, ikke automatisk niveau-skift; hvorfor Højbjerg-anomalien (10. plads i Ligaens grundspil
  2013/2014 OG 2014/2015) er et åbent, uforklaret spor der ikke må "rettes" af denne opgave.
- `docs/statistik-plan.md`, afsnittet "Holdidentitets-standard" — Ligaen/1./2. division er senior/veteran
  (`age_group_id` 1 m.fl.), så identiteten her er allerede `name_raw`-baseret; denne opgave arbejder på
  `hold`-feltet i revisionstabellen, ikke direkte i databasen.

## Kontrol

**Målet — hvad skal blive sandt:**

```
Kør scriptet mod 089-tabellens fulde 632 rækker, alle tre niveauer, alle sæsoner.
Match-dækning mod facitlisten: forventet ≥166/170 kanter (97,6%), rapportér faktisk tal.
```

**Værnet — hvad må ikke ændre sig:**

```
git status --short statistik/data/          tom
Ingen kald til badmintonplayer.dk/nembadminton.dk.
089-liga-1div-revisionstabel.json/.csv er BYTE-FOR-BYTE uændrede (kun læst).
```

**Skøn** (kan ikke måles):

- De resterende sponsornavne-skift der ikke fanges automatisk, skal være håndterbare at liste manuelt (en
  lille alias-liste), ikke et nyt stort uløst problem.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** — særligt ved tvetydige
sæson-til-sæson-spring hvor flere hold i samme niveau/sæson har næsten ens normaliserede nøgler.

## Gren

`arbejde/092-hold-identitet-traadmatching`, fra `main`.

---

## Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

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
