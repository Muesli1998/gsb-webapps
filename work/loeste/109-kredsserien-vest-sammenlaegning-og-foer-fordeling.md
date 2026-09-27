# Opgave 109 — Kredsserie Vest: find sammenlægningssæsonen og før-fordelingen

**Trin:** Videreudvikling (dedikeret opfølgning på 105's uafklarede punkter, forudsætning for 108's
sæson-akse).

**Baggrund:** Opgave 105 fandt at Kredsserie Vest allerede eksisterede i en 2015-kilde
(Badminton Midtjyllands årsberetning), og at 2017/18-reglementet havde en variabel 4-8-pladsmodel
(afhængig af antal vestlige nedrykkere fra 3. division) — forskelligt fra dagens faste 6-pladsmodel.
Men 105 kunne IKKE finde: (a) den præcise sæson/beslutning hvor Kredsserie Vest blev etableret som
samlet struktur for de fire vestlige kredse, og (b) den ældre, separate fordeling mellem de vestlige
kredse FØR sammenlægningen (Christoffer erindrer Fyn fik 1 plads, og 4-5 pladser blev delt mellem
"jyllandskredsene" — præcist hvilke og hvordan er ikke bekræftet). Christoffer har selv nævnt at dette
allerede blev fundet én gang tidligere i projektet via websøgning (måske i en anden opgave end 096,
som allerede handlede om Kredsserie Vests oprindelse men uden held).

Dette er en dedikeret genopsamling af PRÆCIS disse to uafklarede punkter fra 096/105 — ikke en bred
reglement-gennemgang (det er 110's opgave).

## Mål

1. **Gennemgå 096-kredsserien-vest-oprindelse.md's egen research igen** for at se om sæsonen/
   beslutningen faktisk blev fundet der og bare ikke blev bragt videre til 105 — hvis den allerede
   findes i projektet, er opgaven en dokumentationsopgave, ikke en ny søgning.
2. **Websøg specifikt efter Kredsserie Vests etableringssæson**: Badminton Danmarks/de vestjyske
   lokalunioners (Badminton Midtjylland, -Nordjylland, -Sønderjylland, -Fyn) egne nyhedsarkiver,
   årsberetninger, generalforsamlingsreferater omkring 2015-2017 (2015-kilden viser den findes da,
   2017/18-reglementet viser den variable model) — find det konkrete år/den konkrete beslutning, citer
   kilden (URL + dato), efter samme metode som 096/105.
3. **Websøg specifikt efter den ældre, FØR-sammenlægning-fordeling**: gamle reglementer eller
   kredsdokumenter for Fyn, Midtjylland, Nordjylland, Sønderjylland enkeltvis, fra før den fælles
   Kredsserie Vest-struktur (før ca. 2015). Bekræft eller afkræft Christoffers erindring (Fyn: 1 plads,
   4-5 delt mellem jyllandskredsene) med konkret kildetekst.
4. **Er ingen af de to punkter findbare efter en rimelig, dokumenteret søgning**: dokumentér tydeligt
   HVAD der blev søgt (søgeord, kilder gennemgået, tidsrum), og markér som varigt uafklaret i stedet
   for at blive ved i det uendelige — det er et acceptabelt udfald, ikke en fejl.
5. **Opdatér `105-regionale-oprykningspladser-og-reglementer.md`/`.json`** med det fundne (eller det
   bekræftet uafklarede), og videregiv sæsongrænsen (hvis fundet) til brug i opgave 108's sæson-akse.

## Afgrænsning

**Må røres:** `statistik/results/105-regionale-oprykningspladser-og-reglementer.md`/`.json`
(opdatering — tilføj fund, ret ikke eksisterende citerede fund), et nyt/udvidet script under
`statistik/scripts/`.

**Må ikke røres:** `statistik/data/*.db` (kun læses, om overhovedet), `104-national-styrke-dag.json`
(uændret), `apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. Websøgning er tilladt og
central for denne opgave. Ingen kald til Nembadminton/badmintonplayer.dk's kamp-API'er.

## Kontekst

- `statistik/results/096-kredsserien-vest-oprindelse.md` — tidligere forsøg, tjek FØRST om svaret
  allerede ligger her uudnyttet.
- `statistik/results/105-regionale-oprykningspladser-og-reglementer.md`/`.json` — de to konkrete
  uafklarede punkter denne opgave forsøger at lukke.
- `work/aabne/108-saesonvarierende-pyramide.md` — den opgave der har brug for resultatet herfra.

## Kontrol

**Målet:**
```
Enten er sammenlægningssæsonen fundet og citeret, eller den er dokumenteret som uafklaret med den
  konkrete søgning der blev udført.
Enten er før-fordelingen (Fyn/jyllandskredsene) fundet og citeret, eller dokumenteret som uafklaret
  med den konkrete søgning der blev udført.
105's filer er opdateret med fundet (eller det bekræftet uafklarede), uden at ændre allerede citerede
  fund.
```

**Værnet:**
```
git status --short statistik/data/   tom
Intet tal eller sæsonår er gættet — kun citeret eller markeret uafklaret.
```

**Skøn:** hvor mange forskellige søgestrategier/kildetyper der er rimeligt at afprøve før man opgiver
og markerer uafklaret, er Codex' eget skøn — dokumentér kort i Resultatnoten hvad der blev afprøvet.

## Ved tvivl

Findes en kilde der antyder et årstal men er tvetydig (fx en årsberetning der nævner strukturen uden
at sige om det er dens første år), markér det som "tidligst observeret i kilde X, ikke nødvendigvis
etableringsåret" i stedet for at antage det er samme ting.

## Gren

`arbejde/109-kredsserien-vest-sammenlaegning-og-foer-fordeling`, fra `main`.

---

## Spørgsmål

## Resultatnote

**Resultat — 109:**

- Tidligste dokumenterede eksistens: 2014/15 (kilde dateret 24. marts 2015); præcis etableringssæson ikke fundet.
- Før-fordeling Fyn/jyllandskredse: uafklaret efter dokumenteret søgning i 2010–2016-kilder.
- **Kontroloutput:** `node statistik/scripts/109-kredsserien-vest-sammenlaegning.mjs`; JSON skrevet; `git status --short statistik/data/` tom.
- **Hvad blev gjort:** 105-rapporten opdateret med kilder og grænse.
- **Hvad blev fravalgt:** ingen interpolation, databaseændring eller API-kald.
- **Commits:** `7e6d49d`.

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*

