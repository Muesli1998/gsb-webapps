# Opgave 110 — luk reglementshullerne 2010/11–2019/20 og 2021/22 for de regionale oprykningspladser

**Trin:** Videreudvikling (bred opfølgning på 105's kildedækningstabel).

**Baggrund:** Opgave 105 dokumenterede de nationale §29-oprykningspladser for sæsonerne 2020/21 og
2022/23-2026/27, samt Kredsserie Vests egne reglementer for 2017/18, 2021 og 2025. Men otte hele
sæsoner har INGEN citeret reglementskilde overhovedet for de regionale pladser: 2010/11-2019/20 (ti
sæsoner) og 2021/22 (én sæson). Christoffer har flere gange gentaget at "vi skal virkelig kigge
reglementerne igennem" som en bredere, fremadrettet indsats — dette er den konkrete fortsættelse af
netop den sætning for de regionale oprykningsregler specifikt (den nationale DH-hovedturnerings egen
reglementsdækning, jf. 086e/088b, er allerede bedre dækket og er IKKE denne opgaves fokus).

## Mål

1. **Websøg systematisk efter DH-reglementsudgaver for 2010/11-2019/20 og 2021/22** — Badminton
   Danmarks eget arkiv/wayback machine/lokalunionernes egne arkiver kan have ældre udgaver som ikke
   er direkte linket fra den nuværende hjemmeside. Citer hver fundet udgave (URL + dato + §-henvisning),
   efter samme metode som 105.
2. **For hver sæson hvor INGEN national udgave findes**: websøg specifikt efter regionale/
   lokalunions-egne reglementer for samme periode (Sjælland, Lolland-Falster, Bornholm, Kredsserie
   Vest/dens forgængere) — nogle gange er den regionale kilde bedre bevaret end den nationale.
3. **Opdatér 105's kildedækningstabel** med hver nyfundet udgave, og bevar de eksisterende otte
   dokumenterede udgaver uændrede. Sæsoner hvor INGEN kilde findes efter en rimelig, dokumenteret
   søgning forbliver markeret som huller — men med en tydeligere note om hvad konkret blev søgt
   (søgeord, arkiver gennemgået), så en senere gennemgang ikke gentager samme forgæves søgning.
4. **Rapportér om den underliggende regel (Vest 6, Sjælland 2, LF 1, København 2, Bornholm 1) reelt
   var uændret i de nu-dækkede huller**, eller om der er tegn på at pladstallene var ANDERLEDES i
   nogle af disse ældre sæsoner (fx færre pladser før en bestemt udvidelse) — dette er vigtigt for
   108's sæson-akse, som har brug for at vide om reglen selv er stabil, ikke kun om vi har en kilde.

## Afgrænsning

**Må røres:** `statistik/results/105-regionale-oprykningspladser-og-reglementer.md`/`.json`
(opdatering af kildedækningstabellen — tilføj, ret ikke eksisterende citerede fund).

**Må ikke røres:** `statistik/data/*.db`, `104-national-styrke-dag.json`, `apps/netlify-prod/`,
`kampsystem/`, `klubstatistik-preview/`. Websøgning er tilladt og central. Ingen kald til Nembadminton/
badmintonplayer.dk's kamp-API'er.

## Kontekst

- `statistik/results/105-regionale-oprykningspladser-og-reglementer.md`/`.json` — kildedækningstabellen
  denne opgave udvider.
- `statistik/results/086e-regler-dybde-og-fuld-revision.md`, `088b-regelgrundlag-pr-niveaupar.md` —
  DH-hovedturneringens egen, allerede bedre dækkede reglementshistorik, til inspiration for
  søgemetode (ikke denne opgaves fokusområde).

## Kontrol

**Målet:**
```
Så mange af de otte udækkede sæsoner som muligt har nu en citeret national ELLER regional kilde.
Sæsoner der forbliver huller efter denne gennemgang har en dokumenteret, konkret beskrivelse af hvad
  der blev søgt og ikke fundet.
Der er taget eksplicit stilling til om selve pladsreglen var stabil eller anderledes i de nu-dækkede
  perioder.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen eksisterende citeret kilde fra 105 er ændret eller fjernet.
Intet pladstal er antaget uændret uden enten en kilde eller en eksplicit "antaget stabilt, ikke
  bekræftet"-markering.
```

**Skøn:** hvor bredt at søge (hvor mange arkiver, hvor langt tilbage i wayback machine) før man
accepterer en sæson som et hul, er Codex' eget skøn — dokumentér kort i Resultatnoten.

## Ved tvivl

Findes en ældre udgave der er svær at datere præcist (ingen tydelig udgivelsesdato), markér den med
det bedste skøn for gyldighedsperiode og sig eksplicit at dateringen er upræcis, i stedet for at
foregive præcision der ikke findes.

## Gren

`arbejde/110-regionale-reglementshuller-2010-2026`, fra `main`.

---

## Spørgsmål

## Resultatnote

**Resultat — 110:**

- Nye nationalt citerede §29-udgaver for de ældre huller: 0.
- Ny regional kilde: Kredsserie Vest-reglement 2021, §16, som dokumenterer den vestlige seks-pladsmodel omkring 2021/22; øvrige regioners pladstal for 2021/22 er ikke fundet.
- 2010/11–2019/20 forbliver et dokumenteret hul for den fulde regionale pladstabel. 2015/16-eksistensen af fælles Kredsserie Vest er videreført fra opgave 109, men er ikke en fuld §29-fordeling.
- 2020/21 og 2022/23–2026/27 beholder 105's eksisterende direkte nationalt dokumenterede tal.
- **Kontroloutput:** ingen databasefiler ændret; eksisterende citerede 105-fund er bevaret; der er ikke interpoleret pladstal.
- **Søgning:** badminton.dk's holdturneringsarkiv, fire vestlige kredses egne arkiver, badmintonpeople.dk's ældre PDF-spor og målrettede søgninger på årstal, §29, Kredsserie Vest og de regionale rækkenavne.
- **Commits:** udfyldes ved commit.

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
