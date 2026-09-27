# Opgave 112 — dump og publicér det eksisterende register over holdkampsopstillings-felter, for hele datasættet

**Trin:** Ny (bygger på 046/103/086c's allerede eksisterende parsing/klassifikation; forudsætning for
113's rangering).

**Baggrund:** Christoffer har efterspurgt et fuldt katalog over alle holdkampsopstillings-formater
(4 singler, 2+2, 4 spillere, 4 piger osv.), for HELE datasættet og ALLE aldersgrupper — som
forudsætning for en rangering af formaterne (opgave 113). En gennemgang før dette kort blev skrevet
viste at de rå byggeklodser allerede findes og er langt mindre end ventet:

- Hele `liga-landskab.db` har kun **46 distinkte `category_raw`-koder** i alt (`1. HS`, `2. DD`,
  `1. MD`, `4. S` osv. — nummererede single/double/mixed-poster). 103's klassifikationsscript bygger
  allerede en "kategorisignatur" (den sorterede mængde af disse koder) pr. pulje internt.
- Opgave 046 har allerede et fungerende parse-script (`046-ungdom-holdtype-niveau-audit.mjs`) der
  udtrækker `holdtype` (4+3/4+2/2+2/4 spillere/4 piger/X1/X2), `niveau` (A/B/C/D/M) og `pointgraense`
  fra rå tekst.
- Christoffer har selv opremset fire felter han husker findes: **Aldersgruppe, Niveau, Spillefamilie,
  Point**. Denne opgave bekræfter at der findes MINDST fire til: **Sæson** (`season_id`), **Region**
  (`region_id`), **Gruppetype** (grundspil/slutspil/kvalifikation/spilletider, fra
  `group_type_katalog`), og **Kategorisignatur** (de rå `category_raw`-koder — mere pålideligt end
  holdtype-teksten, når de findes).

Denne opgave er derfor IKKE en ny kortlægningsopgave — det er en DUMP/RAPPORT-opgave: kør den logik
der allerede findes (046's parsing + 103's kategorisignatur-logik) hen over HELE datasættet, i stedet
for kun GSB's egne kampe (046/077's tidligere scope) eller 086c's stikprøve, og publicér resultatet
som ét samlet, læsbart katalog. Der skal IKKE opfindes ny parsing-logik fra bunden, kun genbruges og
udvides til fuld dækning.

## Mål

1. **Kør 046's holdtype/niveau/pointgrænse-parsing og 103's kategorisignatur-logik over ALLE rækker i
   `liga-landskab.db`** — alle sæsoner, alle `age_group_id`, alle `region_id` — ikke kun GSB's egne
   kampe (046/077's tidligere scope var GSB-only). Dette er en udvidelse af eksisterende scripts'
   dækning, ikke en ny metode.
2. **For hver unik række, gem de otte felter**: Sæson, Region, Aldersgruppe, Niveau, Spillefamilie
   (holdtype), Point(grænse), Gruppetype (grundspil/slutspil/kval/spilletider), og Kategorisignatur
   (den sorterede `category_raw`-mængde, hvor den findes for puljen).
3. **Ethvert stykke tekst i kilden der IKKE kan forklares af de otte felter ovenfor, skal i et
   selvstændigt FRITEKST-felt** — ikke tabes, ikke tvinges ind i et af de kendte felter. Dette dækker
   fx uklare tokens som dem opgave 052 allerede har fundet (`X1`, `KS-P1`, "Uge 38" m.fl.) samt
   eventuelle nye, endnu uidentificerede tekststumper i den fulde nationale dataset (som er langt
   større end 052's GSB-only-scan).
4. **Skil aldersgrænse-koder klart fra Spillefamilie-feltet.** Kontrollér specifikt om nogen af
   veteran-aldersgrænserne (50+, 60+ m.fl.) optræder i selve `category_raw`-kategorisignaturen, eller
   kun i rå rækketekst (division_name_raw/league_raw) uden om Spillefamilie-parsingen — hvis de kun
   optræder i rå tekst, bekræft det og dokumentér at Spillefamilie-feltet allerede er rent; hvis de
   viser sig at kunne blande sig ind i Spillefamilie-parsingen for enkelte rækker, ret det og
   dokumentér rettelsen.
5. **Publicér ét samlet katalog** (ikke kun rå tabel-dumps) der viser, for hver kombination af de otte
   felter: hvor mange puljer/rækker/sæsoner den bruges i, hvilke aldersgrupper og regioner den
   forekommer i, og om Spillefamilien er fundet via kategorisignatur (sikkert, jf. 103's fallback-
   hierarki), tekstsignal (svagere), eller er "Ukendt format". Rapportér FRITEKST-restens omfang som
   et konkret, synligt antal — ikke skjult i en total.

## Afgrænsning

**Må røres:** nyt script under `statistik/scripts/` (skal bygge videre på/genbruge
`046-ungdom-holdtype-niveau-audit.mjs` og `103-086c-klassifikation.mjs`'s logik, ikke genopfinde
parsing fra bunden), nye outputfiler under `statistik/results/`.

**Må ikke røres:** `statistik/data/*.db` (kun læses), `046-ungdom-holdtype-niveau-audit.mjs`,
`103-086c-klassifikation.mjs` (begge læses/genbruges som logik-kilde, ændres ikke — denne opgave må
gerne IMPORTERE/kopiere deres funktioner ind i det nye script, men ikke redigere de eksisterende
filer), `104-national-styrke-dag.json`, `105-national-styrke-dag.json`, `apps/netlify-prod/`,
`kampsystem/`, `klubstatistik-preview/`.

## Kontekst

- `statistik/scripts/046-ungdom-holdtype-niveau-audit.mjs`, `statistik/results/046-...md`/`.json` —
  den eksisterende holdtype/niveau/pointgrænse-parser (GSB-only scope, skal udvides til alle klubber).
- `statistik/scripts/103-086c-klassifikation.mjs` — kategorisignatur-logikken (allerede dataset-bredt,
  ikke GSB-only).
- `statistik/results/052-ukendte-regelsaet-tokens.md`/`.json` — den eksisterende (GSB-only) liste over
  uforklarede tekststumper, som denne opgaves fritekst-felt skal udvide til hele datasættet.
- `docs/statistik-plan.md`s "Spilleforms-standard" — familie-klassifikationens fallback-hierarki, som
  denne opgave rapporterer dækningen af, men ikke ændrer.

## Kontrol

**Målet:**
```
Kataloget dækker ALLE sæsoner, ALLE aldersgrupper og ALLE regioner i liga-landskab.db — ikke kun GSB.
Alle otte felter (Sæson, Region, Aldersgruppe, Niveau, Spillefamilie, Point, Gruppetype,
  Kategorisignatur) er udfyldt hvor de findes belæg for det.
Uforklaret tekst lander i et synligt fritekst-felt, med et konkret, rapporteret antal — intet tabes.
Der er taget eksplicit stilling til om aldersgrænse-koder kan blande sig ind i Spillefamilie-feltet.
```

**Værnet:**
```
git status --short statistik/data/   tom
046 og 103's eksisterende scripts/output er ikke ændret — kun genbrugt/importeret som logik.
Intet felt er gættet udfyldt uden belæg — mangler belæg for et felt, er det tomt/ukendt, ikke gættet.
```

**Skøn:** hvordan man teknisk bedst genbruger 046/103's parsing (import af funktioner, eller en
bevidst duplikeret men dokumenteret kopi, hvis modulstrukturen gør import besværlig) er Codex' eget
skøn — dokumentér valget kort i Resultatnoten.

## Ved tvivl

Er det uklart om en tekststump hører til et af de otte kendte felter eller skal i fritekst, foretræk
fritekst — det er billigere at rydde en fejlagtig fritekst-post op senere end at skjule den i et forkert
felt. Er det uklart om en aldersgrænse-kode er "lækket" ind i Spillefamilie-feltet for en konkret
række, undersøg den enkelte række konkret i stedet for at antage et mønster for hele datasættet.

## Gren

`arbejde/112-spilleformats-katalog-alle-aargange`, fra `main`.

---

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
