# Opgave 108 — sæson-varierende pyramide: DAG'en skal vise HVORNÅR strukturen ændrede sig

**Trin:** Videreudvikling (bygger på 104/105/106's nationale styrke-DAG og visning).

**Baggrund:** Christoffer har præciseret hvorfor liga-landskabs-sporet (086-107) overhovedet blev
startet: han kunne ikke følge GSB's egne hold korrekt hen over sæsoner og ligaer, fordi
turneringsstrukturen har ÆNDRET SIG over årene — ikke kun navne (Københavnsserien har heddet tre
forskellige ting), men selve strukturen (Kredsserie Vest havde en variabel 4-8-pladsmodel i 2017/18,
en anden fordeling før sammenlægningen, og en fast 6-pladsmodel i dag).

104/105/106's DAG er et **nu-billede**: den har dækningsnoter i tekst ("2020, 2022–2026", med huller
markeret), men ingen sæson-akse i selve datastrukturen. Den kan ikke i dag svare på "hvordan så
hierarkiet ud i sæson 2015/16?" som et selvstændigt billede — kun "hvad kan vi citere om nutidens
struktur, og hvornår mangler vi kilder". Det er ikke det samme som en pyramide der rent faktisk viser
ændringerne over tid.

## Mål

1. **Giv hver node og kant i DAG'en en explicit sæsongyldighed** (`valid_from_season`,
   `valid_to_season`, eller `null`/åben hvor det fortsætter), baseret på det der allerede er citeret i
   104/105 (og databasens egne observerede sæsoner for hver rå-række/pulje) — ikke ny research, men en
   STRUKTURERING af den viden vi allerede har liggende i 104/105/086/095/096/097.
2. **Dokumentér de konkrete kendte strukturskift som separate, tidsstemplede versioner af samme
   knude/kant** i stedet for én sammenflettet "nutids"-sandhed: Kredsserie Vest 2017/18's 4-8-pladsmodel
   vs. dagens 6-pladsmodel; Københavnsserien-navneskiftene (KS-familien → KBH Serien →
   Københavnsserien, jf. 095/101); ethvert andet skift 086-107 allerede har fundet.
3. **Byg en sæson-vælger/tidslinje i den visuelle gengivelse** (udvid 106's HTML, eller lav en ny
   version) der lader en læser se pyramiden for en VALGT sæson (eller sæsoninterval), ikke kun
   nutidens fulde graf. Hvor en periode er udokumenteret (2010/11–2019/20, 2021/22), skal visningen
   sige det eksplicit for den periode — ikke stille tavse.
4. **Test specifikt mod GSB's egne holds sæson-til-sæson-forløb** (samme accepttest som opgave 101
   brugte for København): kan man nu, med sæson-akse, se PRÆCIS hvornår og hvorfor et GSB-hold ville
   have oplevet et strukturskift (fx et niveau der skiftede navn eller pladstal under dem)? Dette er
   den konkrete anvendelse Christoffer efterspurgte.

## Afgrænsning

**Må røres:** nyt/udvidet script under `statistik/scripts/` (byg videre på 104/105/106's JSON som
kilde), nye outputfiler under `statistik/results/` (fx `108-...json`/`.md`/`.html`).

**Må ikke røres:** `statistik/data/*.db` — denne opgave STRUKTURERER allerede citeret viden fra
104/105/086/095/096/097, den skal ikke selv researche nye reglementskilder (det er 109/110's job).
Hvis en sæsongrænse for et kendt strukturskift ikke kan findes i den allerede dokumenterede viden,
markér det som uafklaret i stedet for at gætte en dato. `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/` må ikke røres.

## Kontekst

- `statistik/results/104-national-styrke-dag.json`/`.md`, `105-national-styrke-dag.json`,
  `105-regionale-oprykningspladser-og-reglementer.md`, `106-national-styrke-dag-visuel.html` — den
  nutids-DAG denne opgave giver en tidsdimension.
- `statistik/results/095-...` (regional puljestruktur), `096-kredsserien-vest-oprindelse.md`,
  `097-pointsystem-historik...` — allerede fundet viden om strukturskift over tid.
- `work/loeste/101-koebenhavn-traadmatching-gsb-facit.md` — GSB-facit-metoden denne opgave genbruger
  som accepttest.

## Kontrol

**Målet:**
```
Hver node/kant i den udvidede DAG har en sæsongyldighed (fra/til, eller markeret åben/uafklaret).
Kendte strukturskift (Kredsserie Vest 2017/18 vs. i dag, Københavnsserien-navneskift) er repræsenteret
  som separate, tidsstemplede versioner, ikke sammenflettet.
Den visuelle gengivelse kan vise pyramiden for en valgt sæson/periode, med udokumenterede perioder
  eksplicit markeret som sådan.
GSB's egne hold er brugt som konkret, efterprøvelig test af at sæson-aksen giver mening.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen ny reglementskilde er opfundet — al sæsongyldighed stammer fra allerede dokumenterede fund
  (104/105/086/095/096/097) eller databasens egne observerede sæsoner.
104/105/106's eksisterende output er ikke ændret, kun bygget videre på i nye filer.
```

**Skøn:** hvordan sæson-vælgeren konkret skal se ud (dropdown, slider, side-by-side-sammenligning af
to sæsoner) er Codex' eget skøn — vælg det mest læsbare, begrund kort i Resultatnoten.

## Ved tvivl

Er sæsongrænsen for et kendt strukturskift uklar (fx præcis hvilken sæson Kredsserie Vest gik fra
4-8-pladsmodellen til 6-pladsmodellen), marker den som uafklaret i stedet for at gætte — det er netop
det opgave 109 skal finde. Er det uklart om et navneskift (fx endnu et Københavnsserien-lignende
tilfælde) er et reelt strukturskift eller bare en administrativ omdøbning uden reel betydning, spørg i
"Spørgsmål".

## Gren

`arbejde/108-saesonvarierende-pyramide`, fra `main`.

---

## Spørgsmål

## Resultatnote

**Resultat — 108:**

- Noder/kanter: 20.150 noder og 13 kanter fra 105, alle tilført sæsongyldighedsmetadata uden ændring af kildeindholdet.
- Kendte skift: Kredsserie Vest 2017/18 variabel 4–8, senere seks-pladsmodel med uafklaret præcis overgang; København-navnefamilien bevaret som observeret skift med uafklarede grænser.
- Visning: ny HTML med sæsonvælger, hulperioder og aggregering af uforbundne noder.
- GSB-accepttest: 101’s ægte 2016/17–2022/23-pause for hold 4 bevares; hold 5 2015/16 og hold 4 2016/17 forbliver eksplicit uafklarede.
- **Kontroloutput:** generatoren kørte; 20.150 noder, 13 kanter, 20.134 foldede uforbundne noder; `git status --short statistik/data/` tom.
- **Hvad blev fravalgt:** ingen ny research, API-kald eller databaseskrivning; 104/105/106 blev ikke ændret.
- **Commits:** udfyldes ved commit.

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
