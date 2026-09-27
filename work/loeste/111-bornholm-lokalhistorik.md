# Opgave 111 — Bornholms lokalhistorik: pladsbrug og regionale op-/nedrykningstal

**Trin:** Ny (formaliserer idébank-noten fra opgave 105, per Christoffers eget udskudte forslag).

**Baggrund:** Under opgave 105 blev det klart at Bornholm har 1 fast oprykningsplads til
Danmarksserien, som "historisk set næsten aldrig" er blevet brugt (Christoffers egen erindring, ikke
endnu bekræftet mod databasen eller reglementet). 105 fandt også at Bornholmsserien kun forekommer i
databasens rå puljedata 2011/12-2015/16 — hvad der skete efter det (nedlagt? omdøbt? sammenlagt med
noget andet?) er ikke undersøgt. Dette blev dengang eksplicit lagt uden for 105's scope og noteret i
`docs/idebank-statistik.md` (2026-09-27) som en fremtidig, selvstændig opgave. Christoffer har nu
bekræftet at den skal bygges.

## Mål

1. **Undersøg Bornholms konkrete, historiske brug af Danmarksserie-pladsen** i den periode databasen
   dækker: er der nogensinde et Bornholmsk hold der optræder i Danmarksserien i sæsonen efter et
   Bornholmsk topseriehold? Brug samme tråd-matchingsmetode som opgave 107 (Metode A/B/C fra 087),
   ikke en ny metode fra bar mark.
2. **Undersøg hvad der skete med Bornholmsserien efter 2015/16** i landskabsdataen — nedlagt, omdøbt,
   sammenlagt med en anden regions serie, eller fortsat men under et andet rækkenavn/regelsæt der ikke
   matcher 105's regex-mønster (`^bornholmsserien$`)? Udvid søgningen til andre mulige rækkenavne hvis
   det er relevant.
3. **Byg de detaljerede, år-for-år regionale op-/nedrykningstal** for ALLE fem regioner (ikke kun
   Bornholm) — hvor mange hold rykkede faktisk op/ned mellem regionens topserie og Danmarksserien/3.
   division hver sæson, sammenlignet med de fastlagte pladstal fra 105 (Vest 6, Sjælland 2+1, LF 1,
   København 2+1, Bornholm 1)? Var pladserne fuldt udnyttet, eller står der ubrugte pladser (som
   Christoffer forventer for Bornholm)?
4. **Rapportér separat pr. region**, med samme ærlige "ubekræftet er et gyldigt udfald"-tilgang som
   opgave 107 — undlad at presse et mønster frem hvis dataen er for tynd (Bornholm har kun 22
   registrerede regionale grundspilsknuder ifølge 107).

## Afgrænsning

**Må røres:** nyt script under `statistik/scripts/`, nye outputfiler under `statistik/results/`,
evt. en tilføjelse til `105-regionale-oprykningspladser-og-reglementer.md` hvis Bornholmsseriens
efter-2015/16-skæbne kaster nyt lys på den eksisterende regionale struktur.

**Må ikke røres:** `statistik/data/*.db` (kun læses — ren analyse, ingen skrivning), `104-national-
styrke-dag.json`, `105-national-styrke-dag.json` (læses, ændres ikke uden eksplicit grund fra Mål 2),
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. Ingen kald til Nembadminton/
badmintonplayer.dk's kamp-API'er.

## Kontekst

- `statistik/results/107-holdtracking-over-regionsgraenser.md`/`.json`/`.mjs` — metoden (A/B/C) og
  scriptet denne opgave genbruger og udvider.
- `statistik/results/105-regionale-oprykningspladser-og-reglementer.md` — Bornholms dokumenterede
  regel og den observerede 2011/12-2015/16-afgrænsning.
- `docs/idebank-statistik.md`, "Lokalhistorik for regionale oprykningspladser (noteret 2026-09-27)" —
  den oprindelige idé denne opgave nu bygger.

## Kontrol

**Målet:**
```
Der er taget stilling til om et Bornholms-hold faktisk er sporet til Danmarksserien (ja/nej/
  ubekræftet, med konkret belæg).
Bornholmsseriens skæbne efter 2015/16 er undersøgt og rapporteret (fundet forklaring, eller
  dokumenteret uafklaret).
Der findes en år-for-år op-/nedrykningstabel for alle fem regioner, sammenlignet med 105's pladstal.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen skrivning til nogen database.
Samme metodiske disciplin som 107: ingen hold-identitet postuleret uden Metode A/B/C eller klar
  begrundelse.
```

**Skøn:** hvor langt tilbage i alternative rækkenavne man skal søge for at afklare Bornholmsseriens
skæbne efter 2015/16, er Codex' eget skøn.

## Ved tvivl

Er et fund tvetydigt (fx et hold der kan være enten et Bornholmsk hold under nyt navn, eller et helt
andet hold), markér som ubekræftet i stedet for at gætte. Se Metode A/B/C's egen forsigtighed fra 087/
107 som skabelon.

## Gren

`arbejde/111-bornholm-lokalhistorik`, fra `main`.

---

## Spørgsmål

## Resultatnote

**Resultat — 111:**

- Bornholm→Danmarksserien: ingen entydig konservativ tråd fundet; status er ubekræftet, ikke et bevis på ubrugt plads.
- Bornholmsserien efter 2015/16: den udvidede navnesøgning gav intet entydigt alternativt rækkenavn med fortsættelse; skæbnen forbliver uafklaret i den gemte database.
- Alle fem regioner er opgjort sæson for sæson i `111-bornholm-lokalhistorik.json`; kun konkrete 107-metode A-spor tælles som entydige.
- **Kontroloutput:** `node statistik/scripts/111-bornholm-lokalhistorik.mjs`; database åbnet read-only; `git status --short statistik/data/` tom.
- **Hvad blev fravalgt:** ingen nye API-kald, ingen databaseskrivning, ingen alias-gæt.
- **Commits:** udfyldes ved commit.

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
