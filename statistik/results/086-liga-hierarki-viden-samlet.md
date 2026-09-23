# Liga-hierarki — samlet viden (levende dokument)

**Formål:** Dette er IKKE en opgave-resultatnote. Det er et levende referencedokument der samler den
faktiske, bekræftede viden opgave 085/086a/086b/086d/086e har fundet om hvordan Badminton Danmarks
liga-hierarki (regioner, niveauer, op-/nedrykning, spilleform) reelt hænger sammen. Opgave-kortene i
`work/loeste/` beskriver PROCESSEN (hvad blev undersøgt, hvornår, af hvem) — dette dokument beskriver
FACIT, som det ser ud lige nu, og opdateres når ny viden kommer til. Ret det direkte når noget ændrer sig
— det er ikke en historik, det er den aktuelle status.

Sidst opdateret: 2026-09-23 (efter opgave 086e).

## 1. Tre-lags forbindelsesmodel (godkendt princip)

Når puljer/rækker skal relateres til hinanden visuelt eller analytisk, adskilles tre helt forskellige
typer "sammenhæng" — de må ALDRIG blandes sammen til én "forbindelse":

1. **Spilleform/format-familie** — den groveste gruppering. Udledes empirisk fra
   `match_categories.category_raw`-sammensætningen pr. pulje (antal/typer af kategorier pr. kamp — fx
   13 kategorier inkl. damesingle for Københavnerserien/3. Serie vs. 10 kategorier uden damesingle for
   31./32./33. Serie i samme region/sæson). Dette er ALDRIG skrevet ned eksplicit noget sted i
   kildedataen, men er en reel, stabil forskel i turneringsform. Puljer i forskellig spilleform-familie
   er ikke sammenlignelige, uanset niveau-formodning.
2. **Formodet niveau inden for samme spilleform** — fra siderækkefølge (`display_order`, opgave 085)
   eller bogstav-/pointgrænse-navngivningsmønster. En formodning, ikke en bekræftet ligestilling.
3. **Bekræftet op-/nedrykning** — kun tegnet når der findes konkret data-belæg (kamp-/hold-ID,
   sæson-til-sæson-spor) ELLER direkte citat fra officielt reglement. Marker altid hvilken kildetype
   (data / regeltekst / begge).

## 2. Forgrenings-model for op-/nedrykning (bekræftet eksempel)

Op-/nedrykning er IKKE en lineær kæde — hver puljeknude kan have en opadgående forbindelse
(oprykning), en nedadgående (nedrykning), og en sidelæns forbindelse til en delt
kvalifikations-/slutspilsknude som flere puljer fødrer til/fra.

Konkret bekræftet eksempel (Danmarksserien ↔ 3. division, jf. Badminton Danmarks
Holdturneringsreglement §23 stk. 5, §24 stk. 3-4, §28): 4 kvalifikationsgrupper (A-D), hver af 2
puljer. 1.-pladser rykker direkte op (4 i alt på tværs af grupperne). 2./3.-pladser krydsspiller mod en
anden gruppes 2./3.-plads i et kvalifikationsstævne sammen med nedrykningskandidater (4.-5.-plads) fra
3. divisions egne nedrykningspuljer. 6.-8.-plads i 3. division nedrykker direkte.

## 3. Reglement — dokumenterede regler på tværs af år (opgave 086e)

7 offentlige DH-reglementsudgaver fundet og citeret: **2020, 2022, 2023 (juli + november), 2024, 2025,
2026**. 2019, 2021 og 2027 findes IKKE som selvstændige PDF'er (endnu ikke bekræftet om de aldrig har
eksisteret, eller blot ikke er online).

Bekræftede regler (§26/§28, variation mellem år endnu ikke fuldt kortlagt pr. paragraf — se
`086e-regler-dybde-og-fuld-revision.md`/`.json` for de ordrette citater pr. år):
- Maks antal hold pr. klub i DH-turneringen, med en to-holds-undtagelse i visse sammenhænge.
- Hold fra samme klub skal så vidt muligt placeres i forskellige puljer.
- Havner to samme-klub-hold i samme pulje/slutspilspulje alligevel, skal de mødes i allerførste runde.
- Tvangsnedrykning ved for mange hold fra samme klub på ét niveau.
- Afslag-på-oprykning kan IKKE bare kaskade til næste hold i rækken, hvis det hold selv ikke ville have
  vundet oprykningen (§28).

## 4. Op-/nedrykning — empirisk test (opgave 086d + 086e)

691 rekonstruerede puljestillinger, 1.022 kandidat-overgange testet (metode: "findes holdet ET STED i
nabo-niveauet næste sæson", IKKE en bestemt puljenummer — puljer reshuffles årligt):

- 131 præcise fund (kandidaten selv findes i nabo-niveauet)
- 92 fund, men et andet hold fra samme klub-serie
- 378 ikke fundet i næste (højere) niveau
- 188 fundet i lavere niveau
- 233 ikke fundet i lavere niveau

**Vendt analyse** (hvilke hold er reelt NYE i nabo-niveauet, sporet tilbage): 231 kunne spores til et
lavere niveau året før. **1.353 nye/tilbagevendende hold-identiteter kunne IKKE afklares** — dette er nu
den reelt begrænsende faktor, ikke reglerne eller metoden: **det er svært at spore hold-identitet på
tværs af sæsoner** (holdnummerskift, klubnavne-varianter, hold der nedlægges/genopstår). Se afsnit 6 —
dette er en åben, selvstændig undersøgelse.

## 5. Øst/Vest — puljerenhed (opgave 086d + 086e)

For BD's seniorstige (kun senior — ingen tilsvarende national ungdoms- eller veteran-liga):
- 418 puljer (60%): 100% rene (kun formodet øst ELLER kun formodet vest)
- 67 puljer (10%): 80-99% rene
- 194 puljer (28%): 50-79% — den forventede "blandes kun når nødvendigt"-zone
- 12 puljer (2%): under 50% — reelt blandede

158 hold er klassificeret "ukendt" med en individuel, dokumenteret årsag hver (se
`086e-regler-dybde-og-fuld-revision.json`) — ikke gættet.

Fyn+Vestjylland = "Vestkredsen"-tommelfingerreglen: status endnu ikke eksplicit ja/nej-bekræftet på
tværs af hele datasættet — brug lokalserie-historik som primær kilde, postnummer kun som fallback.

## 6. ÅBEN, KRITISK UNDERSØGELSE: hold-identitet på tværs af sæsoner

`league_matches.home_team_id`/`away_team_id` er IKKE stabile på tværs af sæsoner (bekræftet ved at spore
Gladsaxe Søborg gennem alle 17 sæsoner — ID'erne er sæson-specifikke kamp-registrerings-ID'er, ikke
klub-identitet). Den nuværende arbejdshypotese (opgave 086b, senior-only) — "samme klubnavn + samme
holdnummer i to på hinanden følgende sæsoner = samme hold" — er IKKE tilstrækkelig: 1.353 af 1.584
"nye" hold i nabo-niveauer kunne ikke afklares med denne metode.

Der findes allerede et beslægtet, fungerende mønster i repoet for et lignende problem: `netlify/lib/navne.js`
+ `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` løser navne-normalisering/alias for SPILLERE (Unicode NFC,
whitespace-collapse, case-fold, ingen diakritik-stripning, ukendt navn → pass-through). Samme princip
bør genbruges — men for KLUBNAVNE, ikke spillernavne, og formentlig med et par ekstra dimensioner
(holdnummer-forskydning når et lavere-numereret hold nedlægges, klub-sammenlægninger).

Se opgave 087 (`work/aabne/087-holdidentitet-paa-tvaers-af-saesoner.md`) for den planlagte, dedikerede
undersøgelse af dette.


### Opgave 087-resultat (2026-09-23)

Tre uafhængige metoder blev kørt på 1.353 `new_or_returning`-rækker fra 086e. Metode A (top-down-anker) fandt 43, metode B (forsigtig Unicode/NFC/case/whitespace-canonicalisering uden opfundne aliaser) fandt 6, og metode C (verificerbart n→n+1-holdnummermønster) fandt 8. 1.310 rækker havde ingen metodefund; 29 havde kun et separat/uafklaret spor. Metoderne var aldrig alle enige; 6 havde A+B-enighed. GSB havde ingen rækker i netop denne 1.353-population, så GSB-facitkalibrering skal ske på en separat, eksplicit population.

086e's 1.022 kandidat-rækker blev genkørt med den kombinerede model; den fulde rækkevise fordeling og konkrete eksempler ligger i `statistik/results/087-holdidentitet-paa-tvaers-af-saesoner.json`. Resultatet dokumenterer, at de fleste resterende identiteter ikke kan løses sikkert fra de gemte kilder alene. Ingen database blev ændret.
## Kilder / relaterede opgaver

`work/loeste/085-niveau-fra-rekkefoelge-og-skabelon.md`, `086a-fundament-rekkefoelge-spilleform-klubregister.md`,
`086b-oprykning-vestoest-regler-hypoteser.md`, `086d-oprykning-og-regler-genbesoeg.md`,
`086e-regler-dybde-og-fuld-revision.md` (+ tilhørende `.json`-rapporter i `statistik/results/`).

### Metodekontrol efter 087-gennemgang (2026-09-23)

Den første 087-kørsel var ikke en fuld tvungen kaskade: Metode A lavede kun direkte lavere-niveau-opslag. De 1.310 "ingen spor" var derfor defineret relativt til niveauerne under kandidatens aktuelle niveau, ikke hele hierarkiet. En efterfølgende canonicaliseret søgning i hele foregående sæsons seniorhierarki fandt 68 ekstra spor. 087-resultatet skal derfor læses som et dokumenteret begrænset matchforsøg, ikke som en endelig forklaring på 97 % af populationen. Fredningsreglen i 2026 §26 stk. 3 er dokumenteret, men er specifik og blev ikke brugt til automatisk identifikation.

### Runde 3: faktisk kaskadekørsel i opgave 087 (2026-09-23)

Den fulde top-down-model blev nu kørt på deduplikerede seniorholdnoder. Der var 206 Liga-startpunkter, 34 unikke kæder med mindst én tvungen nedadgående overgang og 0 kæder, der nåede entydigt til Danmarksserien eller regional lokalserie. Tvungen nedadgående succes pr. niveaupar var: Liga→1. division 11/206, 1.→2. division 17/241, 2.→3. division 30/387, 3.→Danmarksserien 50/763 og Danmarksserien→regional lokalserie 68/1.091. Kaskaden ramte 4 af de 1.285 runde-2-rækker uden hele-hierarki-canonical match; resultatet er et overlapstal, ikke fuld identitetsverifikation. Ingen database blev ændret.
