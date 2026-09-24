# Opgave 089 — manuel revisionstabel: Ligaen ↔ 1. division, sæson for sæson

**Trin:** Ny type opgave i kæden: ikke mere undersøgelse/udledning, men et KONKRET, dobbelttjekbart
datasæt Christoffer selv kan gå igennem og rette. Christoffers ord: "vi skal ikke bygge noget før vi er
sikre... det vi KAN potentielt gøre er at der bliver loadet alle resultater ind i en tabel hvor jeg så kan
gå ind og dobbelttjekke at ting er korrekt... simpelthen tvinge det igennem manuelt." Starter med
Ligaen↔1. division, fordi strukturen her nu er kendt med sikkerhed (§17-18, jf. `086-liga-hierarki-
viden-samlet.md`).

**Gren:** `arbejde/089-manuel-revisionstabel-liga-1div`, fra `main`.

**Baggrund:** Vi ved nu at Ligaens nr. 10 rykker automatisk ned, nr. 9 spiller kvalifikationskamp mod 1.
divisions nr. 2 (fra dens "Kvalifikation til Badmintonligaen"-gruppe), og at 1. division selv har
nedrykningsspil (mod 2. division) og et kvalifikationslag. `league_groups` har allerede de præcise
gruppe-ID'er for hver sæson (fundet i denne chat, fx 2025: Ligaens "Kvalifikationskamp liga/1.
division" = `17886`, 1. divisions "Kvalifikation til Badmintonligaen" = `17889`, "Nedrykning fra 1.
division" = `17890`). Gruppenavngivningen varierer år for år (se `group_type_katalog` fra 088a) — brug
den til at finde den rette gruppe pr. sæson, gæt ikke ud fra navnemønster alene.

## Mål

1. **For hver sæson (så mange af de 17 som dataen dækker for netop disse niveauer):** rekonstruér
   Ligaens grundspilsstilling (placering 1-10), 1. divisions stilling for BÅDE dens
   "oprykningsspil"/kvalifikationsgruppe (mod Ligaen) og dens nedrykningsspil-gruppe (mod 2. division), OG
   **2. divisions oprykningsspil/kvalifikationsgruppe** (dem der spiller sig op mod/i konkurrence med 1.
   divisions nedrykningskandidater) — ud fra de faktiske kampresultater i `league_matches`/
   `match_categories` (samme metode som opgave 086d's standings-rekonstruktion — genbrug det script hvis
   det stadig findes og passer). Formålet er at kunne verificere BÅDE at de rigtige hold rykker ned fra 1.
   division OG at de rigtige hold rykker op fra 2. division til 1. division — ikke kun den ene retning.
2. **Byg én samlet, menneskeligt læsbar tabel** (CSV eller lignende, én række pr. sæson pr. hold-hændelse)
   med disse kolonner:
   - `sæson`
   - `hold` (rå navn som det står i kilden)
   - `niveau_denne_sæson` (Ligaen / 1. division / 2. division — kun 2. divisions oprykningsspil/kvalifikationshold er med, ikke hele 2. division)
   - `placering` (i grundspil/nedrykningsspil, som relevant)
   - `hændelse` (fx "automatisk nedrykning", "kvalifikationskamp mod 1.divisions nr. 2",
     "automatisk oprykning", "kvalifikationskamp mod Ligaens nr. 9", "forbliver i Ligaen (nr. 7-8)")
   - `kval_modstander` (hvis relevant, hold-navn)
   - `kval_resultat` (fx "7-6 sejr", "tabt", tomt hvis ikke relevant)
   - `niveau_næste_sæson_algoritme` (hvad 087/088's metoder konkluderede holdet endte på, eller "ikke fundet")
   - `niveau_næste_sæson_faktisk` (det faktiske niveau holdet rent faktisk spillede på næste sæson, hvis
     det kan findes direkte — dette er facit uanset algoritme)
   - `christoffer_bekræftet` (TOM kolonne — Christoffer udfylder selv: ja/nej/kommentar)
3. **Udfyld IKKE `christoffer_bekræftet`-kolonnen** — den er til hans egen brug. Gæt heller ikke i
   `niveau_næste_sæson_faktisk` hvis det ikke entydigt kan findes — skriv "ikke fundet" frem for at gætte.
4. **Lever tabellen som RÅ DATA (CSV + JSON), ikke som det endelige review-værktøj.** Denne opgave
   bygger og leverer datasættet i `statistik/results/089-liga-1div-revisionstabel.csv` (samme indhold også
   som `.json`, samme rækker/kolonner, til nemmere viderebehandling). **Det interaktive review-værktøj
   Christoffer faktisk skal bruge, bygges IKKE i denne opgave** — det bygges af manager-Claude ovenpå dette
   datasæt (et redigerbart regneark/interaktiv side han kan klikke, sortere og markere i direkte). Denne
   opgaves eneste leverance er et korrekt, komplet, let-forståeligt råt datasæt — ikke UI.

## Kontekst

- `statistik/results/086-liga-hierarki-viden-samlet.md` — §17-18-strukturen og hele det samlede facit.
- `work/loeste/086d-oprykning-og-regler-genbesoeg.md` — metoden til standings-rekonstruktion fra
  kampresultater, genbrug scriptet hvis det passer.
- `work/loeste/088a-intern-kortlaegning-og-testcases.md` — `group_type_katalog`-tabellen, brug den til
  at finde de rette grupper pr. sæson uden at gætte på navnemønster.
- De konkrete gruppe-ID'er fundet i denne chat for 2020-2026 (se Baggrund) som skabelon/startpunkt.

## Afgrænsning

**Må røres:** ny fil `statistik/results/089-liga-1div-revisionstabel.csv` (eller aftalt format), evt.
nye scripts under `statistik/scripts/`. Ingen database-skrivninger.

**Må ikke røres:** `statistik/data/*.db` (kun læses), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`. Ingen nye API-kald, ingen ekstern websøgning nødvendig for denne opgave (ren
intern data).

## Kontrol

**Målet:**
```
Én komplet, læsbar tabel for Ligaen↔1. division dækker alle sæsoner hvor data findes, med både
  algoritmens konklusion og (hvor findeligt) det faktiske udfald som separate kolonner.
Ingen gættede værdier i "faktisk"-kolonnen — "ikke fundet" i stedet for et gæt.
Filen er let for Christoffer selv at åbne og redigere.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen kald til badmintonplayer.dk/nembadminton.dk.
Hver række kan spores tilbage til konkrete league_group_id/match-ID'er (angiv dem gerne i en skjult/ekstra
  kolonne til fejlfinding, hvis det ikke gør tabellen uoverskuelig).
```

**Skøn:** formatvalg (CSV vs. andet) hvis der er tvivl — spørg i "Spørgsmål".

## Ved tvivl

Er en sæsons gruppestruktur uklar eller afviger fra mønsteret (fx manglende data, en gruppe der ikke kan
identificeres entydigt via `group_type_katalog`): udelad rækken og noter det i Resultatnoten som en
manglende sæson, i stedet for at gætte.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
