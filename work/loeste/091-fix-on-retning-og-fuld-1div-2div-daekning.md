# Opgave 091 — ret (O)/(N)-retning, udvid til fuld 1./2. divisions-dækning, dokumentér Højbjerg-anomali

**Trin:** Opfølgning på 090, fundet ved Christoffers fortsatte manuelle gennemgang af Trådtavlen. To
observationer fra Christoffer:

> "Det er sket flere gange nu at der er hold der forbliver."
>
> "Jeg har kigget på 1 div osv.. jeg tror faktisk ikke du har NOGEN grundspilshold med? hvis du kigger dem
> igennem, så er det kun hold der enten er i ned eller op rykning... så jeg tror simpelthen du har fjernet
> alle de normale 1. div hold"

Den anden observation er IKKE en regression fra 090 — den gælder allerede den oprindelige 089-afgrænsning
(se Kontekst), men er stadig et reelt problem der skal løses nu. Den første observation pegede os hen på en
konkret bug i 090's (O)/(N)-logik, bekræftet ved kildekode- og databaseopslag (se Baggrund).

**Gren:** `arbejde/091-fix-on-retning-og-fuld-1div-2div-daekning`, fra `main`.

**Baggrund (allerede undersøgt i chatten, genbrug det):**

**Bug 1 — (O)/(N)-retningen i `homeLevelFor()` er byttet om for kvalifikations-/nedrykningsgrupper:**
```js
function homeLevelFor(season,kind,teamName,homes){
 const expected=kind==='liga'?'Ligaen':kind.startsWith('one')?'1. division':'2. division', marker=bdMarker(teamName);
 if(kind!=='liga'&&marker){
  const level=['Ligaen','1. division','2. division'][levelIndex(expected)+(marker==='N'?-1:1)]??'uden for tabel';
  return {level,basis:`BD (${marker})`};
 }
 ...
```
For et hold mærket `(N)` i 1. divisions kvalifikationsgruppe (`oneQual`, `expected='1. division'`) sætter
koden `level = niveauet ÉT OP` (index 1-1=0 → "Ligaen"). Det er bagvendt: `(N)` betyder hold der lige er
rykket NED — for 2011/2012's Odense OBK (N)/Ikast (N) betyder det at de nu HØRER HJEMME i 1. division
(puljens eget niveau), ikke i Ligaen. Fordi det beregnede niveau ("Ligaen") ikke matcher puljens forventede
niveau ("1. division"), bliver rækken stille droppet (`if(home.level!==expected) continue;`) — begge hold
forsvinder helt fra 2011/2012, i alle niveauer. Stikprøve der beviser dette (kør selv for at bekræfte):
```
2011/2012, ALLE niveauer: Odense OBK og Ikast optræder IKKE ÉT ENESTE sted i tabellen, selvom de reelt var
  1. divisions hold den sæson (netop rykket ned fra Ligaen 2010/2011).
```
Ret retningen: et `(N)`-mærket hold i en kvalifikations-/nedrykningsgruppe hører som udgangspunkt hjemme
på PULJENS EGET niveau (det er dér de nu spiller), ikke niveauet ovenover. Tilsvarende skal `(O)` sandsynligvis
IKKE automatisk betyde "ét niveau ned" — undersøg om `(O)`/`(N)` overhovedet altid beskriver bevægelse
MELLEM Ligaen/1./2. division, eller om det nogle gange (eller altid) beskriver bevægelse mellem to
PARALLELLE puljer på SAMME niveau (fx mellem en regional pulje og selve kvalifikationsgruppen inden for 1.
division) — brug faktiske eksempler fra flere sæsoner til at afgøre det empirisk, gæt ikke på én
antagelse igen. Genbrug 2010/2011's Odense OBK 1/Ikast 1 (uden markør, korrekt løst i 090) og 2011/2012's
Odense OBK (N)/Ikast (N) (forkert fjernet nu) som de to vigtigste testcases.

**Bug 2 — `group_type_katalog` klassificerer en 2.-divisions-pulje som 1. divisions "grundspil":**
```
('Kval. til 1. division', 'Kval. til 1. div.', 'grundspil')
```
Denne gruppe (2. divisions hold der spiller sig OP MOD 1. division) får `division_name_raw = 'Kval. til 1.
division'`, som indeholder understrengen "1. division" — `levelFromDivision()` fortolker den derfor som
et 1.-divisions-hjemme-niveau-bevis, selvom deltagerne reelt er 2.-divisions-hold. Tjek om dette forurener
`homes`-kortet (og dermed `homeLevelFor()`s fallback-gren) for de sæsoner det forekommer i, og ret enten
`levelFromDivision()` (mere præcis matching, ikke bare substring) eller selve katalog-rækken.

**Manglende dækning — kun opgave 089's oprindelige afgrænsning, ikke en 090-fejl:**
100% af nuværende "1. division"-rækker stammer fra kun to grupper (`1. divisions kvalifikationsgruppe mod
Ligaen`: 50 rækker, `1. divisions nedrykningsspil mod 2. division`: 63 rækker) — nul rækker for hold der
bare ligger stille i 1. divisions midterfelt. Det var opgave 089's egen afgrænsning (Mål 1 bad kun om de to
grænsegrupper), ikke noget 090 har fjernet. Men det skal udvides nu: `group_type_katalog` viser at 1.
divisions egne puljer ER katalogiseret (`'1. division','Pulje 1','grundspil'` og `'1. division','Pulje
2','grundspil'` findes allerede) — de bruges bare ikke til at generere rækker i dag, kun til intern
hjemme-niveau-validering.

**Højbjerg-anomalien (13/14 → 14/15) — dokumentér, ret IKKE:**
Databaseopslag bekræfter at Højbjerg reelt selv står i Badmintonligaens EGEN grundspilspulje BEGGE sæsoner
(`league_group_id 2792` for 2013 og `4278` for 2014, begge "Badmintonligaen, Grundspil", placering 10). Det
er altså ikke en generator-fejl — tabellen gengiver rå data korrekt. Det er en ægte, uforklaret anomali
(mulig afvist oprykning et andet sted, eller to forvekslede Højbjerg-identiteter — hænger sammen med det
uløste hold-identitetsproblem fra opgave 087). Undersøg IKKE til bunds i denne opgave (afgrænset scope),
men skriv den eksplicit ned som et åbent spor i Resultatnoten, så den ikke skal genopdages.

## Mål

1. **Ret (O)/(N)-retningen** i `homeLevelFor()` baseret på empirisk undersøgelse af flere eksempler (ikke
   kun formodning), test mod 2011/2012 Odense OBK (N)/Ikast (N) (skal nu optræde under "1. division") og
   2010/2011 Odense OBK 1/Ikast 1 (skal fortsat optræde KUN under "Ligaen" — må ikke regrediere).
2. **Ret `levelFromDivision()`/katalog-forureningen** fra "Kval. til 1. division"-puljen der fejlagtigt
   matcher som 1.-divisions-hjemmeniveau.
3. **Udvid tabellen til fuld dækning af 1. og 2. divisions egne hold, sæson for sæson** — ikke kun
   op-/nedrykningsgrupperne. Brug `group_type_katalog`s eksisterende `grundspil`-mærkede puljer for 1./2.
   division (fx `Pulje 1`/`Pulje 2`) som kilde. Et hold der bare ligger stille midt i tabellen skal nu også
   have en række, med `hændelse` fx "forbliver i 1. division (midterfelt)" el.lign. — så en klub ikke
   forsvinder fra Trådtavlen i de sæsoner hvor den hverken op- eller nedrykker.
4. **Dokumentér Højbjerg-anomalien** (13/14 → 14/15, se Baggrund) eksplicit i Resultatnoten som et åbent,
   ikke-løst spor — ændr IKKE dataen for at "løse" den, den gengiver rå data korrekt.
5. **Regenerér** CSV/JSON. Kør samme kontrol som 090 (ingen `(sæson, hold)`-kombination med flere niveauer
   uden dokumenteret undtagelse) OG en ny kontrol: stikprøve mindst 3 kendte, stabile klubber (fx Greve,
   Skovshoved) og bekræft de nu har en sammenhængende række hver sæson de eksisterer i datagrundlaget, uden
   huller der skyldes afgrænsningen fra punkt 3.
6. **Christoffers 87 allerede bekræftede tråde i Trådtavlen** (vedlagt som JSON i chatten, "genereret"
   2026-09-24T20:59) skal IKKE ændres af denne opgave (de ligger kun i hans browser), men vær opmærksom på
   at endnu flere rækker sandsynligvis får nye/ændrede `placering`-værdier når punkt 1-3 er rettet — nævn i
   Resultatnoten hvor stort omfanget af sandsynligt berørte rækker er (grov andel), så Christoffer ved at
   forvente en større runde af genbekræftelser i Trådtavlen efter denne opgave.

## Kontekst

- `work/loeste/090-fix-niveau-duplikering-ligaen-1div.md` — forrige rettelse, hvor (O)/(N)-logikken først
  blev indført (med den nu identificerede fejl).
- `work/loeste/089-manuel-revisionstabel-liga-1div.md` — den oprindelige afgrænsning (kun kval-/
  nedrykningsgrupper for 1./2. division).
- `work/loeste/088a-intern-kortlaegning-og-testcases.md` — `group_type_katalog`.
- Christoffers 87 bekræftede tråde (JSON i denne chat, 2026-09-24T20:59) — til reference/stikprøve, ikke
  noget der skal indlæses eller ændres af scriptet.

## Afgrænsning

**Må røres:** `statistik/scripts/089-generate-liga-1div-revisionstabel.mjs`,
`statistik/results/089-liga-1div-revisionstabel.csv`/`.json`. Evt. rettelser i `group_type_katalog`
(dokumentér i så fald ændringen tydeligt, det er en delt tabel andre opgaver også bruger).

**Må ikke røres:** `statistik/data/*.db` (kun læses — bortset fra evt. `group_type_katalog`-rettelsen,
som er en tabel bygget af os selv i 088a, ikke rå BD-data), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`. Ingen nye API-kald.

## Kontrol

**Målet:**
```
2011/2012: Odense OBK og Ikast optræder korrekt under "1. division" (ikke forsvundet).
2010/2011: Odense OBK 1 og Ikast 1 optræder STADIG kun under "Ligaen" (ingen regression).
1. division og 2. division har nu rækker for hold der bare ligger stille, ikke kun op-/nedrykkere.
Højbjerg-anomalien er dokumenteret i Resultatnoten, ikke ændret i data.
```

**Værnet:**
```
git status --short statistik/data/   tom (eller en tydeligt dokumenteret group_type_katalog-rettelse)
Ingen kald til badmintonplayer.dk/nembadminton.dk.
Ingen (sæson, hold)-kombination med flere niveauer uden dokumenteret undtagelse.
```

**Skøn:** Er det uklart om (O)/(N) beskriver niveau-skift eller pulje-internt skift i et konkret tilfælde —
udelad rækken som "ikke fundet" fremfor at gætte, og nævn det konkrete tilfælde i Resultatnoten.

## Ved tvivl

Spørg i "### Spørgsmål" nedenfor fremfor at gætte — særligt ved (O)/(N)-retningen, hvis flere sæsoners
eksempler peger i forskellige retninger.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

**Leverance:** Generatoren og 089-tabellen er regenereret. Tabellen er
udvidet fra 347 til **632 rækker**: 168 Liga-rækker, 200 1.-divisionsrækker
og 264 2.-divisionsrækker. Alle rækker kommer nu fra holdets egen
grundspilspulje; kvalifikations- og nedrykningsgrupper bruges alene til
`hændelse` og `related_qualification_group_ids`.

**(O)/(N):** Retningsreglen fra 090 er fjernet. Empirien viser, at både
`(O)` og `(N)` beskriver historisk bevægelse, mens holdet hører hjemme på
sin egen grundspilspuljes niveau i den aktuelle sæson. De 165 markerede
grundspilsrækker fordeler sig på `(O)`: 13 Liga, 39 1. division, 72 2.
division og `(N)`: 13 1. division, 28 2. division. Dermed kan en `(N)`
også forekomme i 2. division, og en `(O)` også i 1. division; ingen af
markørerne kan flytte et hold mekanisk ét niveau. 2011/2012 Odense OBK
(N) og Ikast (N) står nu begge i 1. division (placering 1 og 2), mens
2010/2011 Odense OBK 1 og Ikast 1 stadig kun står i Ligaen.

**Katalog-/parsingfejl:** `levelFromDivision()` accepterer nu kun præcise
topniveaunavne (`Badmintonligaen`, `1. division`, `2. division`). Derfor
kan `Kval. til 1. division` ikke længere fejlfortolkes som 1. divisions
grundspil. `group_type_katalog` og databasen er ikke ændret. De 16
bevarede rækker med gruppenavnet `Kval. til 1. div.` kommer fra en eksplicit
`2. division`-kilde og står derfor korrekt som 2. division; en
divisionsstreng der selv begynder `Kval. til 1. division` kan ikke længere
fungere som hjemme-niveaubevis.

**Dækning og værn:** Der er **0** `(sæson, hold)`-kombinationer med flere
niveauer. Greve, Skovshoved og Højbjerg har hver outputrækker i alle 17
sæsoner, hvor de findes i Liga-/1.-/2.-divisions-grundspillet; ingen huller
skyldes længere den gamle kvalifikationsafgrænsning. Otte deltagere i
kvalifikationsgrupper havde ingen entydig grundspilskobling og er ikke
gættet ind; de er listet som `qualification_participants_without_main_group`
i JSON.

**Højbjerg, åbent spor:** Rå data placerer Højbjerg i Ligaens grundspil som
nr. 10 i både 2013/2014 (gruppe 2792) og 2014/2015 (gruppe 4278). Det er
ikke ændret. Det er en ægte, uforklaret data-/holdidentitetsanomali og må
afklares i et senere spor, ikke lappes i revisionstabellen.

**Trådtavle-effekt:** 225 af 347 gamle Trådtavle-nøgler er uændrede; 407
nye nøgler er tilføjet, og 126 gamle nøgler er fjernet eller ændret. De 87
browser-lagrede bekræftelser er ikke rørt, men en stor genbekræftelsesrunde
må forventes.

**Værn:** Ingen API-kald eller databaseskrivninger.
`gsb-statistik-normalized.db` har fortsat SHA-256
`49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`.
