# Opgave 096 — uddyb undersøgelsen af Kredsserien Vest (sammenlægning ca. 2016/17)

**Trin:** Research / Internal mapping (fortsættelse af 095, denne gang med tilladt websøgning)

**Baggrund:** Opgave 095 kortlagde regionernes puljestruktur og fandt to åbne spørgsmål: overgangen for
Fyn/Midtjylland/Nordjylland/Sønderjylland omkring 2014/15-2015/16, og Bornholmsseriens forsvinden efter
2015/16.

**Bornholm er nu afklaret og kræver ingen yderligere undersøgelse:** Christoffer har bekræftet at
Bornholms hold reelt ikke er stærke nok til en selvstændig topserie, og at deres puljer ikke følger den
normale 6+4-opstilling. Holdsporing i data understøtter dette — de samme klubber (Rønne, Knudsker,
Aakirkeby/Nyvest m.fl.) fortsætter uafbrudt under navnet "Serie 2" fra 2016/17, og ingen Bornholm-klub
optræder nogensinde i Kredsserien Vest eller Danmarksserien. Bornholmsserien blev altså ikke lagt sammen
med noget nationalt — den blev reelt afviklet som selvstændigt navn. Dette punkt lukkes hermed; det kræver
ingen implementation ud over at dokumentere det i den kommende regionsudvidelse af 089/092.

**Kredsserien Vest kræver en dybere undersøgelse.** Et første holdsporingsforsøg (denne opgaves
forarbejde, ikke gemt i en fil endnu) gav et konkret, men foreløbigt fund: flere hold i Kredsserien Vests
allerførste sæson (2016/17) har en eksplicit `(O)`-markør (oprykning) SAMME sæson de først optræder i
Kredsserien Vest — fx "St. Restrup", som 2012-2015 udelukkende spillede i lokale "Serie 1/2/3"-puljer i
Nordjylland uden nogen regional topserie overhovedet. Andre hold har `(N)` (nedrykning) samme sæson,
hvilket kunne betyde de kom ned fra 3. division/Danmarksserien. Det tyder på at Kredsserien Vest blev
oprettet som en NY, sammenlagt top-serie i 2016/17, der samlede forfremmede lokale hold og nedrykkede
nationale hold fra fire regioner (Fyn, Midtjylland, Nordjylland, Sønderjylland) — snarere end en ren
navneændring af de gamle regionsserier (Jyllandsserien, Fynsserien). Men dette er kun stikprøvet på et
håndfuld hold, ikke systematisk, og ingen ekstern kilde er endnu tjekket.

## Mål

1. **Systematisk (O)/(N)-analyse i databasen:** Gennemgå ALLE hold i `Kredsserien Vest`/`Kredsserie Vest`
   for hver sæson 2016/17-2026/27 (ikke kun stikprøver). For hvert hold med `(O)` eller `(N)`-markør:
   find hvor holdet spillede sæsonen før (hvilken division/gruppe, hvilken region), for at bygge et
   fuldstændigt billede af hvor Kredsserien Vests hold kom fra ved opstarten i 2016/17, og om mønsteret
   med tilgang fra lokale Serie 1-puljer og nedrykning fra 3. division/Danmarksserien holder for ALLE
   hold, ikke kun de fire undersøgte.
2. **Præcisér opstartssæsonen:** Er 2016/17 den faktiske første sæson for alle fire regioner samtidig,
   eller er der forskel mellem regionerne (fx startede Midtjylland/Nordjylland/Sønderjylland samtidig,
   mens Fyn fulgte et år senere, eller omvendt)? Brug `league_group_regions` til at se hvilke regioner
   der reelt er knyttet til de tidligste `Kredsserie Vest`-grupper.
3. **Websøgning efter ekstern bekræftelse:** Søg efter officielle kilder (fx Badminton Danmark, Badminton
   Midtjylland, Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland, eller nyhedsarkiver på
   deres hjemmesider) der beskriver oprettelsen/sammenlægningen af "Kredsserien Vest". Mål: bekræfte eller
   afkræfte hypotesen om en organisatorisk sammenlægning omkring 2016, ideelt med en dato eller
   begrundelse. Hvis intet findes, dokumentér det som "ikke fundet" — gæt ikke på en årsag kilderne ikke
   nævner.
4. **Opdatér 095's kortlægningsfil** (`statistik/results/095-regional-puljestruktur-kortlaegning.md`) med
   konklusionerne fra punkt 1-3, og marker Bornholm-punktet som afklaret (jf. Baggrund ovenfor).

## Afgrænsning

**Må røres:** `statistik/results/095-regional-puljestruktur-kortlaegning.md` (opdateres, ikke omskrives
fra bunden — bevar den eksisterende struktur og tilføj/opdater kun de relevante afsnit), en ny fil til de
uddybende fund hvis det gør indholdet mere overskueligt (fx
`statistik/results/096-kredsserien-vest-oprindelse.md`). Ingen ændringer til `089-generate-liga-1div-
revisionstabel.mjs`, `092-hold-identitet-traadmatching.mjs` eller nogen outputfil fra tidligere opgaver.

**Må ikke røres:** Ingen kode der genererer 089/092's tabeller — stadig research, ikke implementation.
`group_type_katalog` må læses men ikke ændres. `statistik/data/*.db`, `apps/netlify-prod/`,
`kampsystem/`, `klubstatistik-preview/`.

**Websøgning — vigtig undtagelse fra den normale regel:** `statistik/AGENTS.md`s princip om ingen nye
API-kald gælder badmintonplayer.dk/nembadminton.dk (kamp- og resultatdata, som altid skal komme fra den
etablerede importpipeline). Almindelig websøgning efter BAGGRUNDSVIDEN om regionsunionernes historie og
struktur (fx på badmintondanmark.dk eller regionsunionernes egne hjemmesider) er tilladt og ønsket i
DENNE opgave — men kun til kontekst/bekræftelse, aldrig som kilde til kamp- eller resultatdata. Alle
websøgningsfund skal citeres med URL, så Christoffer selv kan efterprøve dem.

## Kontekst

- `statistik/results/095-regional-puljestruktur-kortlaegning.md` og
  `statistik/results/095-regional-puljestruktur-raw.json` — 095's fulde kortlægning, herunder de to
  oprindeligt åbne spørgsmål denne opgave bygger videre på.
- `statistik/data/liga-landskab.db`, tabellerne `league_groups`, `league_group_teams`,
  `league_group_regions` — `team_name_raw` bærer `(O)`/`(N)`/`(M)`-suffikser som historiske
  bevægelsesmarkører (jf. opgave 091's fund: de betyder oprykning/nedrykning/anden bevægelse FØR denne
  sæson, ikke en niveau-ændring i selve sæsonen).
- Opgave 095's rapport, afsnit "3. Forbindelser opad og nedad" — de eksplicitte gruppeetiketter
  (`Oprykningsspil fra Kredsserien Vest til Danmarksserien...`, `Nedrykningsspil fra Kredsserien Vest til
  Serie 1...`) som allerede dokumenterer dele af forbindelsen; denne opgave udvider til selve
  opstartssæsonen, hvor den slags etiketter endnu ikke nødvendigvis findes.

## Kontrol

**Målet — hvad skal blive sandt:**

```
Alle hold i Kredsserien Vests startsæson(er) er sporet til deres oprindelse (lokal Serie 1-forfremmelse,
nedrykning fra 3. division/Danmarksserien, eller "ukendt/ikke sporbar"), med et samlet tal for hver
kategori — ikke kun de 4-6 stikprøvede hold.
Mindst ét forsøg på ekstern websøgning er dokumenteret, med enten en fundet kilde (URL + citat) eller en
eksplicit "ikke fundet efter søgning efter X, Y, Z"-note.
095's kortlægningsfil er opdateret til at afspejle konklusionerne, og Bornholm-punktet er markeret afklaret.
```

**Værnet — hvad må ikke ændre sig:**

```
git status --short statistik/data/                     tom
statistik/data/*.db er BYTE-FOR-BYTE uændrede (kun læst).
Ingen kald til badmintonplayer.dk/nembadminton.dk (websøgning til baggrundsviden er OK, se Afgrænsning).
```

**Skøn** (kan ikke måles):

- Konklusionen om Kredsserien Vests oprindelse skal være konkret nok til at afgøre, om en senere
  implementationsopgave kan behandle 2016/17 som "start fra bunden" (ingen kæder ind i tidligere
  Jyllandsserien/Fynsserien-data) eller om nogle hold reelt bør kædes videre fra deres gamle regionale
  topserie.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** på en organisatorisk årsag eller
dato som ingen kilde bekræfter — en ubekræftet hypotese skal stå tydeligt mærket som hypotese, ikke som
fastslået historie.

## Gren

`arbejde/096-kredsserien-vest-oprindelse`, fra `main`.

---

## Spørgsmål

Ingen åbne spørgsmål. Kildesøgningen fandt ikke en officiel etableringsdato eller organisatorisk begrundelse; dette er dokumenteret som et negativt fund i resultatrapporten.
## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
liga-landskab.db SHA-256 før:  9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C
liga-landskab.db SHA-256 efter: 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C
match: true

git status --short --untracked-files=no statistik/data/
(ingen output)

git status --short statistik/data/
?? statistik/data/
```

`statistik/data/` er et allerede eksisterende, ikke versionsstyret datasæt; den sidste linje er derfor ikke skabt af opgaven. SHA-256-kontrollen bekræfter, at databasen er byte-identisk.

**Hvad blev gjort:**

- Læste og sporede alle 161 markerede Kredsserie Vest-forekomster; de svarer til 118 distinkte hold-sæsoner, fordi efterspil kan gentage samme hold. Den komplette verificerbare liste er gemt i `statistik/results/096-kredsserien-vest-oprindelse.json`.
- Sporede alle 11 markerede teams i 2016/17: 5 national nedrykning, 5 Serie 1 Vest-forfremmelser og 1 ukendt.
- Bekræftede at alle fire første grundspilspuljer har regionerne 4, 5, 6 og 7.
- Søgte officielle kilder; dokumenterede fund og negativt fund er i resultatrapporten.
- Opdaterede 095 med Kredsserie Vest-konklusionen og Bornholm som afklaret.

**Hvad blev fravalgt og hvorfor:**

- Ingen organisatorisk startdato eller forklaring er angivet som fakta, fordi ingen fundet officiel kilde dokumenterer den.
- Ingen database-, kode- eller API-ændringer; opgaven er research.

**Commits:**
