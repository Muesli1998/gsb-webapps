# Opgave 086e — dybdegennemgang af regler over flere år, fuld op-/nedrykningsrevision, og Øst/Vest-renhed pr. pulje

**Trin:** Direkte opfølgning på opgave 086d. Christoffer har gennemgået 086d's resultater og bedt om at
gå markant dybere på tre punkter — brug den nødvendige effort, det er eksplicit godkendt at bruge mere
tid/usage på dette.

**Gren:** `arbejde/086e-regler-dybde-og-fuld-revision`, oprettet fra `main` (086d er allerede merget/i
`work/loeste/` — tjek `git log --oneline -5 main` først for at bekræfte).

**Baggrund:** 086d rettede to metodefejl i 086b (regler skal kendes FØR bevis testes; en pulje-reshuffling
betyder man skal tjekke "findes holdet ET STED i næste niveau", ikke en bestemt puljenummer). Resultatet
var markant bedre end 086b's "0 fundet", men rejste tre nye, konkrete spørgsmål fra Christoffer:

1. Reglementsgennemgangen dækkede kun spredte år (2022/2024/2026 citeret, 2025 §26 ikke verbatim). Det er
   ikke nok — det skal være en grundig gennemgang af FLERE/ALLE tilgængelige år, ikke stikprøver.
2. Kun 122/601 (~20%) topkandidater og 100/421 (~24%) bundkandidater blev fundet i nabo-niveauet. Christoffer
   vurderer at det BURDE være højere — selv med fejlkilder (hold der stopper, trækker sig, navneskift) sker
   det sjældent at det er "andre hold" der rykker i stedet. Hans konkrete forslag: for at forstå de
   resterende ~80%, må man vende undersøgelsen om og tjekke hvilke ANDRE/nye hold der faktisk DUKKER OP i
   nabo-niveauet næste sæson — ikke kun om kandidaten selv findes.
3. Øst/Vest-fordelingen (340 overvejende øst / 258 vest / 78 blandet / 15 ukendt) matcher Christoffers
   forventning kvalitativt (der ER en øst-overvægt i landet, så nogle vestpuljer bliver nødvendigvis blandet
   for at få lige mange hold — fx 7 vest + 1 øst i én pulje). Men "overvejende" er ikke præcist nok: hvor ren
   er hver pulje reelt (hvor mange er 100% rene vs. 80-99% vs. under det)? Og hvorfor er nogle puljer/hold
   "ukendt" — hvad er den konkrete årsag pr. tilfælde (ingen lokalserie-historik fundet, intet postnummer,
   tvetydigt postnummer)?

Christoffer har generelt bedt om MERE dokumentation i detaljen fremover — konkrete lister, begrundelser pr.
tilfælde, ikke kun aggregerede tal — selvom det koster mere usage, fordi det reducerer antallet af
tilbage-og-frem-spørgsmål.

## Mål

1. **Reglement-dybdegennemgang, alle tilgængelige år.** Find og gennemgå (verbatim citat + kildehenvisning
   med år/paragraf/side) ALLE Holdturneringsreglement-udgaver der kan findes (ikke kun 2022/2024/2026 —
   tjek om der findes flere årgange, fx 2019-2027, og dæk dem alle, eller dokumentér eksplicit hvilke der
   IKKE kunne findes/hentes og hvorfor). For hver udgave: uddrag reglerne om (a) maks antal hold pr. klub i
   DH-turneringen og i Danmarksserien specifikt, (b) regler for adskillelse af samme-klub-hold i puljer,
   (c) første-runde-møde-regel ved samme-klub i samme pulje/slutspilspulje, (d) tvangsnedrykning ved for
   mange hold fra samme klub, (e) afslag-på-oprykning og om/hvordan pladsen kan gå videre til næste hold.
   Byg en tabel: regel → år(gange) den gjaldt for → ordret citat → kilde (URL/PDF-navn). Marker eksplicit
   hvis en regel ændrede sig mellem år. Gør det samme for de regionale reglementer (Sjælland, København,
   Fyn, evt. andre) i det omfang de kan findes — regionale regler kan afvige fra DH-stigens.
2. **Fuld op-/nedrykningsrevision — vendt om.** For hver pulje/niveau/sæson-overgang i det datasæt 086d
   allerede byggede (691 rekonstruerede stillinger): find IKKE kun om kandidaten selv findes i næste niveau
   — byg i stedet en fuld liste over ALLE hold der er "nye" i næste niveaus puljer næste sæson (dvs. hold
   der ikke lå i det niveau foregående sæson). Match hvert nyt hold tilbage til hvor det kom fra (samme
   klub+holdnummer i et lavere niveau foregående sæson). Rapportér for hver forventet oprykning/nedrykning:
   fundet præcis som ventet / fundet, men et andet hold fra samme klub-serie / ikke fundet nogen steder
   (hold forsvundet fra systemet) / fundet et helt andet/uventet hold i pladsen. Brug Mål 1's regler til at
   forklare de tilfælde hvor det IKKE er kandidaten selv der rykker (fx klub-hold-cap, afslag-cascade).
   Målet er at kunne sige PRÆCIST hvorfor de ~80% "manglende" tilfælde ikke matcher — ikke bare at rapportere
   procenten.
3. **Øst/Vest — pr.-pulje renhed, ikke kun aggregeret klassifikation.** For hver pulje i det testede
   datasæt: beregn den faktiske fordeling (X hold fra formodet øst, Y fra formodet vest, Z ukendt) og en
   renhedsprocent (majoritetssidens andel). Byg en fordelingstabel (fx: antal puljer der er 100% rene, 80-99%,
   50-79%, under 50%/reelt blandet). For hvert hold klassificeret "ukendt": rapportér den konkrete årsag
   (ingen lokalserie-fund overhovedet / postnummer mangler i `club_registry` / postnummer findes men er i en
   gråzone mellem Vest-/Østkredsen) som en liste, ikke kun et samlet antal. Bekræft eller afkræft eksplicit
   Fyn+Vestjylland=Vestkredsen-tommelfingerreglen ud fra de faktiske lokalserie-fund (ikke antaget).

## Kontekst

- `work/loeste/086d-oprykning-og-regler-genbesoeg.md` — metoden, resultatnoten, og branch/commit
  (`arbejde/086d-oprykning-og-regler-genbesoeg`, commit `01e617f`) dette bygger direkte videre på.
- `work/loeste/086b-oprykning-vestoest-regler-hypoteser.md`, `work/loeste/086a-fundament-rekkefoelge-spilleform-klubregister.md`
  — tidligere trin i samme kæde.
- `statistik/data/liga-landskab.db` — samme tabeller som 086d brugte (`league_matches`, `match_games`,
  `match_categories`, `club_registry`, `league_group_regions`).
- Officielle reglement-PDF'er hos Badminton Danmark (og evt. regionsforbund) — søg bredt, ikke kun de år
  der allerede er fundet.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/086e-*`), nye scripts under
`statistik/scripts/`. Skrivning i `liga-landskab.db` kun til afledte/dokumenterede kolonner, spørg i
"Spørgsmål" før noget skrives.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses), `statistik/data/rangliste-historik.db`,
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. INGEN nye API-kald til badmintonplayer.dk
eller nembadminton.dk — reglement-research er websøgning efter offentlige PDF'er/sider, ikke kald til
badmintonplayer.dk/nembadminton.dk's webservice.

## Kontrol

**Målet:**
```
Reglement-regler for klub-hold-caps, pulje-adskillelse, første-runde-møde, tvangsnedrykning og
  afslag-cascade er dokumenteret med ordrette citater og kildehenvisning for SÅ MANGE tilgængelige år
  som muligt (ikke kun stikprøver), med eksplicit note om hvilke år/regioner der IKKE kunne dækkes.
Den fulde op-/nedrykningsrevision identificerer for hver forventet overgang præcis hvad der skete
  (matchede kandidat / andet hold fra samme klub / forsvundet / uventet), med regelbegrundelse hvor muligt.
Øst/Vest-fordelingen er rapporteret pr. pulje med renhedsprocent og en fordelingstabel, og hvert
  "ukendt"-tilfælde har en konkret, individuel årsag — ikke kun et samlet tal.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye API-kald til badmintonplayer.dk/nembadminton.dk.
Enhver regel-påstand har et citat + kilde; enhver "ikke fundet" har en konkret, individuel begrundelse
  (ikke kun en sum).
```

**Skøn:** ingen på om et "ukendt"-tilfælde reelt kan afklares — dokumentér grundigt og lad Christoffer
vurdere om det er nok. Brug gerne mere tid/output end normalt — det er eksplicit efterspurgt.

## Ved tvivl

Er en reglement-udgave ikke tilgængelig online, eller er en regel tvetydig mellem to kilder: dokumentér
begge dele og lad det stå åbent, i stedet for at antage. Samme forsigtighedsprincip som resten af projektet.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Spørgsmål — udført analyse (2026-09-23)

### Mål 1

Fundne offentlige DH-udgaver: 2020, 2022, 2023-juli, 2023-november, 2024, 2025 og 2026. 2019, 2021 og 2027 blev ikke fundet som særskilte offentlige DH-PDF'er i denne søgning. Den fulde URL-/årsliste og ordrette citater ligger i `statistik/results/086e-regler-dybde-og-fuld-revision.json` og `.md`. 2026 §26 citerer direkte fem-holdsloftet, to-holdsundtagelserne, adskillelse af samme klub, første-runde-opgøret og tvangsnedrykning; §28-citatet dækker afslag-kaskaden. Regionale kilder for København, Sjælland og Fyn er registreret separat, fordi 2023-2026 §5 udtrykkeligt overlader lokale op-/nedrykningsregler til kredsene.

### Mål 2

Der blev rekonstrueret 691 puljestillinger og 1.584 sæson/niveau-overgange. Kandidatklassifikationerne blev: `exact_candidate_found` 131, `same_club_other_team` 92, `not_found_next_level` 378, `candidate_found_lower_level` 188 og `not_found_lower_level` 233. De to retninger giver 1.022 kandidat-rækker (601 top + 421 bund). Alle rå rækker med sæson, niveau, pulje, hold og klassifikation ligger i JSON. Nye hold i næste niveau blev vendt om og klassificeret som `new_from_lower_level` 231 eller `new_or_returning` 1.353; den sidste kategori kræver yderligere kilde-/regeldata for at skelne oprykning fra tilbagekomst eller identitetsændring.

### Mål 3

Renhed pr. pulje: 418 puljer var 100 %, 67 var 80-99 %, 194 var 50-79 %, og 12 var under 50 %. Individuelle holdklassifikationer: 2.413 øst, 2.175 vest, 11 med blandet lokalseriehistorik og 158 ukendte. Alle 158 ukendte har individuel årsag i JSON (`no-local-history-and-no-postcode`, `no-postcode-after-local-history` eller `postcode-outside-classified-range`) med sæson/niveau/pulje/hold.

`BADFYN`, `BADMIDJ`, `BADNDRJ` og `BADSDRJ` forekommer som faktisk gemt lokalseriehistorik og er derfor behandlet som vestlig evidens. Det er ikke en ren navneantagelse; puljer med blanding eller manglende evidens er bevaret som undtagelser.

## Resultatnote

- Script: `statistik/scripts/086e-regler-dybde-og-fuld-revision.mjs`.
- Rapporter: `statistik/results/086e-regler-dybde-og-fuld-revision.md` og `.json`.
- Databaserne blev kun læst. `gsb-statistik-normalized.db` SHA-256 før/efter: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`.
- Ingen nye API-kald. Beskyttede mapper blev ikke ændret.
- Begrænsning: klassifikationen af nye/ændrede hold er empirisk identitetskontinuitet, ikke et officielt afgørelsesregister; klublofter, kvalifikationskampe, afslag og navneskift kan ikke altid skelnes med de gemte data alene.

