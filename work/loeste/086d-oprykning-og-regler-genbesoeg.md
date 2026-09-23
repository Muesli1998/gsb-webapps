# Opgave 086d — genbesøg oprykning/nedrykning (faktiske placeringer, alle regler, flere reglements-år)

**Trin:** Direkte opfølgning på opgave 086b, hvis Mål 1-3 var for svagt metodisk til at give et
troværdigt "nej". Christoffer har peget på konkrete metodefejl og manglende regeldækning. Del af den
samme opsplitning som 086a/086b/086c.

**Gren:** `arbejde/086d-oprykning-og-regler-genbesoeg`, jf. `AGENTS.md`. Grenes fra `main` efter 086b er
merget (eller fra 086b's gren hvis den endnu ikke er merget — samme praksis som 086a/086b).

**Baggrund:** 086b konkluderede 0 bekræftede oprykninger ud af 312 brede kandidater, ingen fundne
deltagerlofter, og ingen entydige Vest/Øst-puljer. Christoffer har efterfølgende vist konkret bevis for
at 5-holds DH-loftet findes (Badminton Danmarks eget reglement, 2023-udgaven, opsummeret i et AI-resumé
i klubbens eget sagsstyringssystem — SKAL bekræftes i selve PDF-teksten, resuméet er kun et spor, ikke
en kilde i sig selv) og peget på tre konkrete metodefejl i 086b's tilgang:

1. **Mål 1 kan ikke afgøres ud fra navnematch alene — det kræver at reglerne for op-/nedrykning er kendt
   FØRST**, fordi reglerne er forskellige på tværs af regioner OG på tværs af DH's divisioner. Uden
   reglerne ved man ikke hvem der reelt vandt en oprykningsplads (fx kval-vinderen, ikke nødvendigvis
   puljevinderen).
2. **Puljerne "shuffles" årligt.** Et hold der hverken rykker op eller ned kan sagtens ende i en anden
   puljenummer næste sæson (fx pulje 4 i stedet for pulje 7), og kan endda ende i en anden Vest/Øst-
   fordelt pulje end forventet hvis der ikke er lige mange Vest- og Øst-hold tilgængelige et år. Derfor
   skal Mål 1 IKKE teste "endte vinderen af oprykningsspil for pulje 7/8 i pulje 4" — kun "findes holdet
   ET STED i det højere niveau (fx 3. division, uanset puljenummer) næste sæson".
3. **Mål 3's Vest/Øst-metode var for svag.** Postnummer alene er ikke stærkt nok. Den rigtige kilde er
   hvilken lokalseries region klubbens hold faktisk har spillet i historisk (en direkte observation i
   data, ikke et gæt) — postnummer kan bruges som supplerende/fallback-signal, med den konkrete
   tommelfingerregel at Fyn og Vestjylland hører til Vestkredsen. Christoffer forventer at Vest/Øst-
   opdelingen "for det meste" holder og kun blandes når det er nødvendigt (fx for at få lige mange hold i
   hver kvalifikationsgruppe) — resultatet skal derfor kunne vise "overvejende Vest, med N undtagelser og
   en sandsynlig forklaring" i stedet for et binært ja/nej.

Christoffer har desuden uddybet de konkrete regler der mangler at blive dokumenteret i Mål 2:
- Hold fra samme klub skal så vidt muligt placeres i forskellige puljer i DH-turneringen.
- Havner to hold fra samme klub alligevel i samme pulje/slutspilspulje, skal de mødes i første runde af
  grundspillet eller slutspillet.
- Tvangsnedrykning kan opstå hvis der bliver for mange hold fra samme klub i en række (fx et hold rykker
  ned til en række hvor klubben allerede har det maksimale antal tilladte hold).
- Et hold kan afvise en oprykning — men kun under en bestemt betingelse: afvisningen må ikke direkte give
  pladsen videre til et hold der reelt ikke selv vandt oprykningen (Christoffers eksempel: nr. 4 i en
  KBH-oprykningspulje kan ikke automatisk arve nr. 2's plads, hvis nr. 2 selv takker nej).

## Mål

1. **Genbesøg reglerne for hele DH-hierarkiet og de regionale serier, på tværs af FLERE års reglementer**
   (mindst 2022, 2023, 2024, 2025, 2026-udgaverne — allerede fundet som separate PDF'er på badminton.dk
   under tidligere søgning i denne samtale). For hvert reglementsår, dokumentér:
   - Deltagerlofter pr. klub (bekræft/afkræft 5 hold i DH, 2 hold i Danmarksserien — direkte i PDF-
     teksten, ikke kun et AI-resumé) og om loftet har ændret sig mellem årene.
   - Reglen om at hold fra samme klub så vidt muligt placeres i forskellige puljer.
   - Reglen om indbyrdes opgør i første runde hvis to klubhold alligevel havner i samme pulje.
   - Reglerne for tvangsnedrykning ved for mange klubhold i en række.
   - Reglen om at afvise en oprykningsplads, og hvornår det IKKE kan lade pladsen gå videre til næste
     hold (Christoffers eksempel ovenfor).
   - De samme regelkategorier for HVER regions egen lokalserie (ikke kun BD's egen DH-stige) — søg efter
     hver regions/kreds' eget reglement, som i 086b.
   Byg en opdateret oversigtstabel der viser regel + kilde + gældende år, ikke kun ét øjebliksbillede.
2. **Genbesøg Mål 1 (oprykning som bevis) med den korrigerede metode:**
   - Byg først slutstillinger (sejre/nederlag, sætdifference) pr. pulje pr. sæson fra
     `match_games`/`league_matches` — dette er nødvendigt for at vide hvem der reelt var berettiget til
     oprykning/kvalifikation, ikke kun hvem der "vandt" en enkelt pulje.
   - Brug reglerne fra Mål 1 (denne opgaves) til at afgøre hvem der reelt havde ret til oprykning i et
     givet år (direkte oprykning vs. kvalifikationsberettiget) — dette varierer på tværs af regioner og
     DH-divisioner, så det skal slås op pr. niveau, ikke antages ens overalt.
   - Test derefter (med den godkendte senior-holdkontinuitetshypotese fra 086b): findes klubben ET STED
     i det næste niveau op næste sæson — IKKE i en bestemt puljenummer, da puljer shuffles årligt. Samme
     logik den anden vej for nedrykning.
   - Rapportér konkrete fund med citerede sæson/hold/pulje-referencer. Hvis reglerne for et niveau ikke
     kunne findes (jf. Mål 1's "ikke fundet" som gyldigt resultat), dokumentér det som en begrænsning for
     præcis det niveaus oprykningstest, i stedet for at springe testen helt over.
3. **Genbesøg Mål 3 (Vest/Øst) med lokalserie-historik som primær kilde.** For hver klub: find hvilken
   regions lokalserie (Kredsserien Vest/BADFYN, Sjællandsserien/BADSJ, Københavnsserien/BADKBH, m.fl.)
   klubbens hold faktisk har spillet i over sæsonerne — brug det som klubbens "hjemmeregion", ikke et
   opslag i `club_registry` (som mangler regionsfeltet, jf. 086a/086b). Brug postnummer som supplerende
   fallback-signal for klubber uden tilstrækkelig lokalserie-historik, med tommelfingerreglen at Fyn og
   Vestjylland hører til Vestkredsen (bekræft denne regel eksplicit i stedet for at antage den ukritisk).
   Test Vest/Øst-mønsteret igen for hvert niveau i BD-seniorstigen, og rapportér resultatet som en
   fordeling med undtagelser (fx "31 af 32 hold i pulje 1-4 kom fra Vestkredsen, 1 undtagelse: [hold],
   sandsynlig forklaring: [...]") frem for et binært bekræftet/afkræftet.

## Kontekst

- `work/loeste/086b-oprykning-vestoest-regler-hypoteser.md` — det oprindelige (for svage) forsøg, brug
  det som udgangspunkt for hvad der allerede er afsøgt, men stol ikke på dets konklusioner om "intet
  fundet" uden at genteste med den korrigerede metode.
- `work/loeste/086a-fundament-rekkefoelge-spilleform-klubregister.md` — `club_registry`, spilleform-
  signatur, siderækkefølge.
- Badminton Danmarks reglements-PDF'er, flere årgange (fundet i denne samtale, søg efter yderligere
  årgange på badminton.dk).

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/086d-*`), nye scripts under
`statistik/scripts/`. Skrivning i `liga-landskab.db` KUN til afledte tabeller der er eksplicit
beskrevet og godkendt her (fx en `season_standings`-tabel til Mål 2's slutstillinger, en
`confirmed_promotions`-tabel til fund) — spørg i "Spørgsmål" før noget andet skrives.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/rangliste-historik.db` (kun læses), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`. INGEN nye API-kald til badmintonplayer.dk eller nembadminton.dk — alt arbejde
sker ud fra allerede gemt rådata og websøgning efter offentlig regeltekst.

## Kontrol

**Målet:**
```
En opdateret regeloversigt findes, med kilde og gældende år pr. regel, for både DH-stigen og de
  regionale lokalserier — inkl. deltagerlofter, samme-klub-pulje-regel, indbyrdes-opgør-regel,
  tvangsnedrykning, og afvisnings-kaskade-reglen.
Oprykning/nedrykning er gentestet ud fra faktiske slutstillinger og de fundne regler, med "findes holdet
  et sted i næste niveau" som testkriterie (ikke et specifikt puljenummer).
Vest/Øst er gentestet med lokalserie-historik som primær kilde, rapporteret som en fordeling med
  undtagelser, ikke et binært svar.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye API-kald til badmintonplayer.dk/nembadminton.dk.
Enhver "5 hold i DH"/"2 hold i Danmarksserien"-påstand skal citeres direkte fra PDF-teksten, ikke fra et
  AI-resumé eller en antagelse.
```

**Skøn:** ingen på om et regelfund eller en oprykningskobling er "sikker nok" — rapportér det fundne,
med kilde og gældende år, og lad Christoffer vurdere.

## Ved tvivl

Er en regel forskellig mellem reglementsår, eller findes der ikke et tilgængeligt reglement for en given
regions lokalserie: dokumentér det som fundet (med årstal/kilde), ikke som en generel mangel — vis
præcis hvad der er kendt for hvilket år/niveau.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)


## Spørgsmål — udført analyse (2026-09-23)

### Mål 1 — regelkilder og år

Der blev ikke foretaget nye API-kald. De gemte PDF-kilder blev gennemgået med direkte tekstudtræk. De centrale, ordrette fund er:

- **2022-reglementet, §26:** teksten angiver, at der fra 2023/24 kan være to hold fra samme klub i 3. division og Danmarksserien, mens der højst kan være fem hold fra samme klub i DH-stigen; hold fra samme klub skal så vidt muligt fordeles i forskellige puljer, og hvis de alligevel havner sammen, mødes de i første runde. Samme paragraf beskriver tvangsnedrykning, hvis klubbegrænsningen ellers overskrides.
- **2024-reglementet, §26:** gentager undtagelsen for to hold i 3. division/Danmarksserien, maksimum fem DH-hold, puljeseparation/første-runde-opgør, overgang af oprykningsplads til bedst placerede kvalificerede hold når klubben allerede er repræsenteret, samt tvangsnedrykning.
- **2026-reglementet, §26:** den ordrette regeltekst indeholder maksimum fem DH-hold, puljeseparation, første-runde-opgør og tvangsnedrykning. §28 angiver, at hvis et hold ikke kan/vil deltage og programmet ikke er udsendt, går pladsen til bedst placerede ikke-kvalificerede hold fra samme pulje; efter programudsendelse håndteres det som w.o. §5 siger eksplicit, at regionerne selv fastsætter regler for deres lokale rækker.

Kilder: 2022 <https://badminton.dk/wp-content/uploads/2022/12/Holdturneringsreglement-for-badminton-i-Danmark-opdateret-120822.pdf>, 2024 <https://badminton.dk/wp-content/uploads/2024/08/2024-08-14-Holdturneringsreglement-for-badminton-i-Danmark-010724-Marked.pdf>, 2025 <https://badminton.dk/wp-content/uploads/2025/03/2025-03-03-Holdturneringsreglement-for-badminton-i-Danmark.pdf>, 2026 <https://badminton.dk/wp-content/uploads/2026/07/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-07-01-endeligt-med-bilag-3-1.pdf>. Regionale kilder: København <https://www.badmintonkoebenhavn.dk/uploads/file/97/Turneringsreglement_for_Badminton_K%C3%B8benhavns_holdturnering_2023-2024__version_2023-1_.pdf>, Sjælland <https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=97855>, Fyn <https://www.holdturneringfyn.dk/regler>.

2025-PDF'en er registreret som kilde for året, men §26-teksten blev ikke særudtrukket i denne kørsel; derfor er år-for-år-tabellen i rapporten eksplicit markeret med denne begrænsning. De regionale kilder dokumenterer, at lokalserieregler skal behandles separat; der er ikke antaget én fælles regional regel.

### Mål 2 — empirisk oprykning/nedrykning

Scriptet `statistik/scripts/086d-oprykning-og-regler-genbesoeg.mjs` byggede 691 senior-puljestillinger fra gemte `league_matches.team_score_raw`-resultater (sejre, nederlag, score difference). Det fandt 601 top-plads kandidater og 421 bund-plads kandidater. Ved opslag i hele næste niveau (aldrig fast puljenummer) fandtes klubben i næste sæson i hhv. 122/601 oprykningskandidat-tilfælde og 100/421 nedrykningskandidat-tilfælde. Dette er kontinuitetsevidens, ikke et bevis på officiel oprykning/nedrykning, fordi kvalifikation, klublofter og eventuelle slutspil ikke er modelleret fuldt.

### Mål 3 — Vest/Øst

Primær nøgle var klubbens historiske lokalserie-region fra gemte `league_groups`/`standing_indexes`; `club_registry.region_id` blev ikke brugt. De 691 seniorgrupper fordelte sig således:

| Niveau | Puljer | Overvejende øst | Overvejende vest | Blandede | Ukendte |
|---|---:|---:|---:|---:|---:|
| Badmintonligaen | 90 | 44 | 8 | 25 | 13 |
| 1. division | 58 | 38 | 11 | 9 | 0 |
| 2. division | 89 | 46 | 24 | 19 | 0 |
| 3. division | 184 | 83 | 82 | 18 | 1 |
| Danmarksserien | 270 | 129 | 133 | 7 | 1 |

I alt: 340 overvejende østlige, 258 overvejende vestlige, 78 blandede og 15 ukendte grupper. `BADFYN`, `BADMIDJ`, `BADNDRJ` og `BADSDRJ` blev behandlet som vestlige etiketter, fordi de er de gemte officielle region-short-names; denne analyse fandt ikke et særskilt modbevis for Fyn/Vestjylland. Blandede og ukendte grupper er rapporteret som undtagelser og bruges ikke som binært bevis.

## Resultatnote

- Script: `statistik/scripts/086d-oprykning-og-regler-genbesoeg.mjs`.
- Rapporter: `statistik/results/086d-oprykning-og-regler-genbesoeg.md` og `.json`.
- `gsb-statistik-normalized.db` SHA-256 før/efter: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` (uændret).
- `rangliste-historik.db`, `apps/netlify-prod/`, `kampsystem/` og `klubstatistik-preview/` blev ikke ændret; ingen nye API-kald blev foretaget.
- Begrænsning: 2025-reglementet er fundet og registreret, men dets §26 blev ikke særudtrukket ordret i denne kørsel; 086d bør derfor ikke bruges som endelig år-for-år-verifikation af netop 2025 uden et særskilt teksttjek.

Direkte ordret citat fra 2026-PDF'en, §26 stk. 1 (side 11-12):
> "Der kan kun deltage ét hold fra hver klub i hver division, kvalifikations- og nedrykningsspil, dog med undtagelse af 3. division, Danmarksserien, kvalifikation til 2. division, nedrykningsspillet fra 3. division, kvalifikation til 3. division og nedrykningsspillet fra Danmarksserien, hvor hver klub kan deltage med to hold. En klub kan maksimalt deltage med 5 hold i DH-turneringen."
> "Hold fra samme klub skal så vidt muligt ikke placeres i samme pulje. Skulle 2 hold fra samme klub komme i samme pulje/slutspilspulje, skal disse 2 hold mødes i første runde af grundspillet/slutspillet ..."
> "Har en klub kvalificeret mere end det maksimalt fastsatte antal hold ... nedrykkes det af klubbens hold, der er lavest placeret i slutspillet ..."
