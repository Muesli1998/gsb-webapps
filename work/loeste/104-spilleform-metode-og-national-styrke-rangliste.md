# Opgave 104 — formaliseret spilleform-metode og national styrke-rangliste

**Trin:** Videreudvikling (bygger direkte på 086/086a/086c-d/086e og deres facit-dokument).

**Baggrund:** Christoffer bad efter 086c om at få to ting på plads for hele liga-landskabet:
(1) en formaliseret, dokumenteret METODE for hvordan man ud fra kildedata (rækkenavn, kategorisignatur,
region, sæson, aldersgruppe) afgør en pulje/rækkes spilleform-familie — ikke kun 086c's engangsberegning,
men en skreven standard der kan genbruges og vedligeholdes, ligesom holdidentitets-standarden i
`docs/statistik-plan.md`; (2) en rangliste af ALLE niveauer/rækker nationalt, fra stærkeste til svageste
— altså at gøre 086's "formodet niveau" til en konkret, nummereret rangorden, ikke kun en gruppering.

Christoffer har eksplicit bekræftet begge dele: metoden skal formaliseres og dokumenteres (ikke kun
være en kodesnip i 086c), og ranglisten skal dække ALLE rækker/niveauer nationalt (Badmintonligaen ned
til lokale serier) — ikke kun København/GSB.

**Vigtigt — dette bygger på 086c's allerede committede/reproducerede script (se opgave 103, som skal
være afsluttet før eller sideløbende med denne).** Genbrug 103's klassifikationslogik som fundamentet
for metoden — opfind ikke en ny klassifikationsmetode fra bunden.

**Vigtig, forventelig begrænsning — sig det højt i stedet for at tvinge en rangorden:** en fuld national
rangliste kræver at man kan sammenligne rækker på TVÆRS af spilleform-familier og regioner. Det kan man
kun hvor der findes konkret belæg (regeltekst eller empiri om oprykning/nedrykning, jf. 086d/086e) der
forbinder to niveauer. To parallelle regionale serier uden nogen dokumenteret forbindelse til hinanden
eller til et fælles overliggende niveau kan IKKE fair rangordnes indbyrdes — de skal placeres som
sideordnede/uafgjorte, ikke gættes ind i en vilkårlig rækkefølge. Ranglisten skal derfor modellere dette
eksplicit (fx niveau-lag med en delvis ordning/DAG, ikke en tvungen lineær liste), og dokumentere hvor
den er en total orden (fx hele DH-hovedturneringens stige: Badmintonligaen → 1. division → Danmarksserien
→ regional Serie 1 → Serie 2 → …) og hvor den kun er en partial orden med uforbundne grene.

## Mål

1. **Formalisér spilleform-metoden som et dokument**, i samme stil som "Holdidentitets-standard" i
   `docs/statistik-plan.md` — en afsnit der kan læses selvstændigt og anvendes på al fremtidig data.
   Skriv reglerne op fra 086c/103's faktiske logik: hvornår arves en kategorisignatur fra en
   grundspilsrække (samme rækkenavn, region, sæson, aldersgruppe), hvornår udledes familien af et
   tekstsignal i rækkenavnet (`4+3`, `2+2`, `4 spillere`, `4 piger` osv.), og hvornår forbliver en
   række eksplicit ukendt. Beslut og dokumentér om dette skal stå i `docs/statistik-plan.md` selv
   (sideordnet med Holdidentitets-standarden) eller i et nyt, selvstændigt dokument der linkes fra
   begge steder — Codex vælger og begrunder kort.
2. **Byg en national styrke-rangliste over alle niveauer**, funderet i:
   - DH-hovedturneringens allerede kendte, dokumenterede stige (Badmintonligaen → 1. division →
     Danmarksserien → regionale serier, jf. `statistik/results/086-liga-hierarki-viden-samlet.md`).
   - 086d/086e/087's konkrete opryknings-/nedrykningsbelæg for at forbinde regionale niveauer til
     hinanden og til DH-stigen, hvor sådant belæg findes.
   - Spilleform-familien fra Mål 1 som den øverste, ufravigelige adskillelse — ALDRIG ranger to rækker
     i forskellige familier mod hinanden (fx en 4+3-ungdomsrække kan ikke "være stærkere end" en
     2+2-ungdomsrække — de er ikke sammenlignelige).
3. **Modellér ranglisten som en delvis ordning, ikke tvunget lineær.** Hvor to niveauer ikke har
   dokumenteret forbindelse (direkte eller via en kæde af oprykning/nedrykning), skal de stå som
   sideordnede/uafgjorte i outputtet — aldrig gættet ind i en rækkefølge uden belæg.
4. Lever ranglisten som et konkret, læsbart output (dokument og/eller udvidelse af 086c's visuelle
   kort med en niveau-rangordning — Codex vælger format, begrunder kort) samt et maskinlæsbart format
   (JSON) andre fremtidige opgaver kan bygge videre på.

## Afgrænsning

**Må røres:** `docs/statistik-plan.md` (tilføjelse, ikke omskrivning af eksisterende afsnit) ELLER et
nyt dokument under `docs/` for spilleform-metoden (vælg én, begrund kort), nyt/udvidet script under
`statistik/scripts/`, nye outputfiler under `statistik/results/`, evt. en udvidelse af
`statistik/results/086c-udvidet-visuelt-kort.html` hvis Codex vælger at vise ranglisten der.

**Må ikke røres:** `statistik/data/*.db` (kun læses), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`. Ingen nye API-kald — al klassifikation og rangordning skal kunne udledes af
allerede indhentet, gemt data (086a/086c/086d/086e/087/089/101's outputs).

## Kontekst

- `docs/statistik-plan.md`, "Holdidentitets-standard"-afsnittet — stilistisk forbillede for hvordan en
  formaliseret standard skrives og placeres.
- `statistik/results/086-liga-hierarki-viden-samlet.md` — det samlede facit for DH-stigen, reglement,
  oprykning/nedrykning.
- `work/loeste/086c-udvidet-visuelt-kort.md` + `statistik/results/086c-udvidet-visuelt-kort.md`/`.html`
  — spilleform-klassifikationens nuværende, verificerede tilstand.
- `work/aabne/103-086c-generatorscript-eftertilfoejelse.md` — det committede script denne opgave skal
  bygge videre på.
- `work/loeste/086d-oprykning-og-regler-genbesoeg.md`, `086e-regler-dybde-og-fuld-revision.md`,
  `087-holdidentitet-paa-tvaers-af-saesoner.md` (eller `work/loeste/` hvis afsluttet) — belæg for
  forbindelser mellem niveauer.

## Kontrol

**Målet:**
```
En formaliseret spilleform-metode er skrevet op som et selvstændigt, læsbart dokument-afsnit.
En national rangliste findes som output, dækker alle 33 regioners rækker.
Ranglisten er en DAG/delvis ordning, ikke en tvunget lineær rækkefølge — uforbundne niveauer er
  eksplicit markeret som uafgjorte, ikke gættet.
DH-hovedturneringens kendte stige er korrekt repræsenteret som en total orden i ranglisten.
Ingen rangordning mellem to forskellige spilleform-familier.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen ny API-kald.
086c's allerede godkendte klassifikation ændres ikke af dette kort (kun genbruges/udvides).
```

**Skøn:** dokumentplacering (Mål 1) og outputformat for ranglisten (Mål 4) er Codex' eget valg,
begrundet kort i Resultatnoten. Alt andet følger direkte af allerede dokumenteret belæg — intet
gættes.

## Ved tvivl

Er det uklart om to niveauer reelt er forbundet (fx et tyndt/blandet belæg fra 086e): behandl dem som
IKKE forbundet (uafgjort/sideordnet) i ranglisten, og spørg Christoffer i "Spørgsmål" nedenfor i stedet
for at gætte en forbindelse. Det er bedre at vise "vi ved det ikke" end en forkert rangorden.

## Gren

`arbejde/104-spilleform-metode-og-national-styrke-rangliste`, fra `main` (efter 103 er merget).

---

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*

### Stop: DH-stigens regeltekst krydser spilleform-familier

Den read-only DAG-kørsel viser, at kravene om både (a) en total orden for hele
DH-stigen og (b) aldrig at rangere forskellige spilleform-familier ikke kan
opfyldes samtidigt med den gemte kategoridata:

| Nationalt niveau | Distinkte gemte familiesignaturer |
|---|---:|
| Badmintonligaen | 2 (6 og 9 kategorier) |
| 1. division | 2 (9 og 13 kategorier) |
| 2. division | 1 (13 kategorier) |
| 3. division | 1 (13 kategorier) |
| Danmarksserien | 1 (13 kategorier) |

Der er derfor dokumenterede, familierene kanter for `1. division → 2. division
→ 3. division → Danmarksserien`, men Badmintonligaen kan ikke knyttes til
1. division uden at bruge en 9-kategori-familie, mens hovedkæden nedenunder er
13 kategorier. Generatoren har derfor med vilje ikke tvunget én sammenhængende
DH-rangliste.

**Christoffers beslutning behøves:** Skal en eksplicit DH-regeltekst kunne give
et separat *strukturelt niveauforhold* på tværs af spilleform-familier (tydeligt
mærket "ikke sportsligt sammenlignelig"), eller skal DAG'en fortsat respektere
familiegrænsen absolut og vise DH som to uforbundne komponenter? Indtil svar
bliver der ikke tilføjet en tværfamilie-kant.

### Christoffers svar (2026-09-27) — godkendt, snæver strukturel undtagelse

Ja: DH-hovedturneringens officielt navngivne stige må få en særskilt
strukturel regeltekst-kant på tværs af de gemte kategorisignaturer. Forskellen
mellem Ligaen/1. division og resten af DH-stigen er her et artefakt af, hvor
mange kampkategorier der spilles på niveauet, ikke en reelt inkompatibel
konkurrenceform. Undtagelsen gælder **kun** Ligaen ↔ 1. division ↔ 2. division
↔ 3. division ↔ Danmarksserien. Den er ikke en generel licens til at forbinde
andre spilleform-familier: fx forbliver `4+3` og `2+2` absolut adskilte.

Implementering: repræsentér disse som tydeligt mærkede
`strukturel_regeltekst`-kanter mellem særskilte DH-strukturnoder, så de ikke
fejlagtigt læses som en sportslig tværfamilie-rangering.

## Resultatnote

**Hvad blev gjort:**

- Formaliserede spilleforms-standarden i `docs/statistik-plan.md`, placeret
  ved siden af Holdidentitets-standarden, fordi begge er tværgående,
  vedligeholdte fortolkningsregler for statistikarbejdet.
- Tilføjede den reproducerbare generator
  `statistik/scripts/104-generate-national-styrke-dag.mjs` og dens læsbare
  Markdown- og JSON-output.
- Modellen har 20.145 noder fra alle 33 regioner, 59.127
  pulje-region-forekomster og 18.546 unikke puljer. Den indeholder fire
  familierene regeltekst-kanter og fire særskilte
  `strukturel_regeltekst`-kanter for den officielle DH-stige.
- Den strukturelle undtagelse er repræsenteret med egne DH-strukturnoder;
  den er ikke en rangering mellem kategorisignaturer. Alle andre
  spilleform-familiegrænser er fortsat absolutte.

**Kontroloutput:**

- 103-regressionskontrol: 59.127 forekomster, 18.546 unikke puljer, 686
  arvede familier, 839 tekstsignaler, 856 ukendte og 0 afvigelser fra 086c.
- DAG-kontrol: 8 kanter i alt; 4 `familieren_regeltekst` og 4
  `strukturel_regeltekst`. Alle fire strukturkanter har begge endepunkter i
  den snævre `national_dh_structural_exception`-scope.
- SHA-256 før/efter: `gsb-statistik-normalized.db`
  `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`;
  `liga-landskab.db`
  `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`.
  Ingen databaseskrivning og ingen nye API-kald.

**Hvad blev fravalgt og hvorfor:**

- Regionale niveauer, ungdom og alle ikke-dokumenterede overgange forbliver
  uforbundne/sideordnede. 104 opfinder ikke kanter ud fra navne eller tynde
  holdspor.
- Ingen generel undtagelse for forskellige spilleform-familier: kun den
  officielt dokumenterede DH-stige er tilføjet som struktur.

**Commits:** `049073b` samt efterfølgende afsluttende commit på denne gren.
