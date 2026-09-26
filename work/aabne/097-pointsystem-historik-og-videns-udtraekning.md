# Opgave 097 — pointsystem-historik for ungdom, og bred videns-udtrækning fra Badminton Danmark

**Trin:** Videreudvikling / Research

**Baggrund:** `docs/statistik-plan.md` markerer "Turnerings- og spillerprofil-sporet samt historiske
ranglistepoint" som fortsat Videreudvikling — ikke løst, ikke afvist, bare ikke taget hul på endnu.
Opgave 096 viste at offentlige kreds-/klub-årsberetninger og referater rent faktisk indeholder konkrete,
citerbare forklaringer på strukturændringer som databasen alene ikke kan give (fx harmoniserings-
beslutningen bag Kredsserien Vest, fundet i en 2014/15-årsberetning). Christoffer vil nu bruge samme
metode bredere: dels et konkret spørgsmål (hvornår og hvorfor skiftede pointsystemet for ungdom fra det
gamle til det nye — det har direkte betydning for hvordan klubben sætter hold i ungdomsrækker), dels en
løsere "lad os se hvad vi finder"-udtrækning af viden fra Badminton Danmark/DBF's offentlige dokumenter
om ranglistesystemer og holdturneringen generelt, i tilfælde af at der ligger nyttige guldkorn til de
andre GSB-webapp-projekter (Dream Team, Kampsystem, Statistik-previewet).

Bemærk: U09-U15 er IKKE udskudt eller udenfor scope generelt — de har været en del af datasættet siden
opgave 033-038 (se `docs/statistik-plan.md`, "Ungdomsstatus"). Det er specifikt de historiske
ranglistepoint og turnerings-/spillerprofilsporet der har stået som uafklaret Videreudvikling, ikke
ungdomsdata generelt. `statistik/AGENTS.md`s ordlyd "U15 og yngre er udskudt" i afsnittet "Uden for dette
projekt" er derfor forældet i forhold til `docs/statistik-plan.md` og bør rettes i en senere,
separat oprydningsopgave — den rettes ikke her, for ikke at blande dokumentoprydning ind i denne opgaves
research.

## Mål

1. **Pointsystem-skiftet for ungdom:** find og dokumentér, med citerede kilder (URL, dato, uddrag),
   hvornår Badminton Danmark/DBF skiftede fra det gamle til det nye pointsystem for
   ungdomsrækker (U09-U19), og hvorfor (hvad var begrundelsen — fx bedre niveaudeling, færre
   walkovers, tilpasning til seniorsystemet, andet). Beskriv konkret hvad der ændrede sig i selve
   beregningen/strukturen (ikke kun at "noget ændrede sig"), og hvordan det påvirkede holdopsætning/
   rækkeinddeling for ungdom, hvis det fremgår af kilderne.
2. **Bred videns-udtrækning fra Badminton Danmark/DBF's dokumenter:** i samme ombæring som pkt. 1 —
   dvs. mens der alligevel søges i kreds-/klub-/forbunds-årsberetninger, referater, reglementer og
   nyhedsarkiver — notér alt af potentiel værdi til de øvrige GSB-webapp-projekter, som ikke
   nødvendigvis er søgt direkte efter. Eksempler på hvad der kunne være interessant (ikke en
   udtømmende liste, og intet af dette må gættes eller antages fundet hvis det ikke er det):
   - Ændringer i ranglistesystemet for senior (point, kategorier, opdateringsfrekvens) —
     relevant for Dream Team/Kampsystemets ELO-seeding.
   - Ændringer i selve holdturneringsstrukturen (divisioner, oprykning/nedrykning-regler,
     puljeinddeling) ud over det allerede kortlagte i opgave 094-096.
   - Officielle definitioner/regler for walkover, protest, aflysning — relevant for
     `statistik/AGENTS.md`s "Walkover kræver eksplicit tekst"-princip og de 309 uafklarede
     `result_marker_raw`-værdier.
   - Andet organisatorisk der kunne forklare mønstre vi allerede har set uden forklaring
     (fx corona-perioden, U09-fejlene i "Blivende undtagelser").
3. **Rapportér guldkorn separat og tydeligt fra hovedspørgsmålet** (pkt. 1), så Christoffer selv kan
   vurdere om noget er værd at forfølge i et af de andre projekter — denne opgave implementerer intet
   baseret på fundene, den samler og citerer dem.

## Afgrænsning

**Må røres:** kun denne opgaves egne outputfiler (`statistik/results/097-...md`/`.json` el. lign.) og
denne kortfil. Intet kode ændres. Ingen eksisterende resultatfiler fra 089-096 røres.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db`, `statistik/data/liga-landskab.db`
(ingen af dem må ændres — dette er ren dokument-/websøgning, ikke databasearbejde). `apps/netlify-prod/`,
`kampsystem/`, `klubstatistik-preview/`. Ingen ændringer til `statistik/AGENTS.md`s forældede
U15-ordlyd (se Baggrund) — det er en separat oprydningsopgave. Ingen implementering af fund fra pkt. 2 —
kun dokumentation af dem.

## Kontekst

- `docs/statistik-plan.md`, afsnittet "Ungdomsstatus" og linjen "Turnerings- og spillerprofil-sporet samt
  historiske ranglistepoint er fortsat Videreudvikling" — denne opgave er første skridt i det spor.
- `work/aabne/096-kredsserien-vest-oprindelse.md` og `statistik/results/096-kredsserien-vest-oprindelse.md`
  — metoden denne opgave genbruger: scoped undtagelse fra "ingen nye API-kald" til at tillade almindelig
  websøgning (IKKE kald til badmintonplayer.dk/nembadminton.dk for kamp-/resultatdata — det forbud
  gælder stadig uændret), med krav om URL-citat for alt, og eksplicit "Ikke fundet"-markering frem for
  gæt, hvis intet officielt bekræfter noget.
- `statistik/AGENTS.md`, "Walkover kræver eksplicit tekst" og de 309 uafklarede `result_marker_raw`-
  værdier — relevant baggrund hvis pkt. 2 støder på noget der forklarer disse.
- Badminton Danmarks (tidligere DBF's) egen hjemmeside, reglementer og nyhedsarkiv, samt regionale
  kredses hjemmesider/årsberetninger (jf. 096's fund af Badminton Midtjyllands årsberetninger) er de
  primære forventede kildetyper.

## Kontrol

**Målet — hvad skal blive sandt:**

```
En rapport der for pointsystem-skiftet (ungdom) enten:
  a) navngiver årstal/sæson + kilde-URL + citeret uddrag der bekræfter hvornår og hvorfor, eller
  b) eksplicit skriver "ikke fundet" med hvad der blev søgt efter og hvor, hvis intet officielt
     bekræfter det — ikke en gætning fremstillet som fund.
En separat "Guldkorn"-sektion med 0 eller flere fund fra pkt. 2, hver med kilde-URL og en kort
begrundelse for hvilket GSB-projekt det kunne være relevant for — ikke en implementering.
```

**Værnet — hvad må ikke ændre sig:**

```
git status --short statistik/data/                                tom
Ingen kald til badmintonplayer.dk/nembadminton.dk (websøgning er kun tilladt mod andre kilder,
  jf. 096's præcedens).
statistik/data/gsb-statistik-normalized.db er BYTE-FOR-BYTE uændret.
statistik/data/liga-landskab.db er BYTE-FOR-BYTE uændret.
Ingen kodefiler i apps/netlify-prod/, kampsystem/, klubstatistik-preview/ er rørt.
```

**Skøn** (kan ikke måles):

- Hvilke "guldkorn" fra pkt. 2 der reelt er værd at forfølge er Christoffers vurdering, ikke noget der
  kan facit-tjekkes — rapportér bredt men markér tydeligt hvad der er en sikker kilde-baseret oplysning
  vs. en mulig relevans-vurdering.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** — hverken på årstal for
pointsystem-skiftet, på begrundelser der ikke er kildebelagt, eller på om et guldkorn fra pkt. 2 rent
faktisk er korrekt hvis kilden er tvetydig.

## Gren

`arbejde/097-pointsystem-historik-og-videns-udtraekning`, fra `main`.

**Bemærk til Codex:** denne opgave må gerne løses med subagenter (fx én der graver i pointsystem-historikken, én der bredt scanner kreds-/forbundsdokumenter for guldkorn) — der er ingen afhængighed mellem pkt. 1 og pkt. 2 der kræver sekventielt arbejde. Saml alt i den ene rapport og citér kilder uanset hvilken subagent der fandt dem.

---

## Spørgsmål

Ingen åbne spørgsmål. Manglende historisk dokumentation er angivet som “ikke fundet” i resultatrapporten i stedet for at blive udfyldt med antagelser.

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
gsb-statistik-normalized.db SHA-256 før:  49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E
liga-landskab.db SHA-256 før:              9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C

Efter (bekræftet før commit): samme to SHA-256-værdier.
git status --short --untracked-files=no statistik/data/
(ingen output)

git status --short --untracked-files=no apps/netlify-prod kampsystem klubstatistik-preview/
(ingen output)
```

`statistik/data/` er et eksisterende, ikke versionsstyret datasæt. Hashkontrollen bekræfter, at begge databaser er byte-identiske.

**Hvad blev gjort:**

- Dokumenterede med officielle kilder pointsystemskiftet for ungdomsholdturneringen til 2019/20, dets begrundelse og den konkrete forskel mellem klassifikationsholdpoint og niveaupointintervaller.
- Registrerede de dokumenterede nuancer og senere regelændringer uden at udlede en stærkere konklusion end kilderne bærer.
- Samlede 7 separate, kildebelagte guldkorn om ranglisteversionering, ungdomsintervaller, corona, protester, trækning/udeblivelse, U17/U19 og afgørelsesarkiv.

**Hvad blev fravalgt og hvorfor:**

- Ingen kamp- eller resultatopslag mod badmintonplayer.dk eller nembadminton.dk; de var uden for undtagelsen.
- Ingen implementation, databaseændring eller ændring af eksisterende walkoverprincipper; opgaven er kun research.
- Ikke-fundne historiske forklaringer er angivet eksplicit i stedet for antaget.

**Commits:**
