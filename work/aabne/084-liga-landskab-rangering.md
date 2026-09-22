# Opgave 084 — gennemgå rækkerne: niveau og rangering af hele liga-landskabet

**Trin:** Analyse/feature ovenpå opgave 081's data. Ikke et nyt udtræk — `statistik/data/liga-landskab.db`
er allerede komplet (katalog, stillinger og fulde kampresultater ned til sæt-niveau, se
`work/loeste/081-statistik-alle-ligaer-landskab-katalog.md` for det fulde forløb og de endelige tal).

**Gren:** `arbejde/084-liga-landskab-rangering`, jf. `AGENTS.md`.

**Baggrund:** Opgave 081 gav et komplet råmateriale: 18.546 puljer, 203.012 unikke kampe, 1,3 mio.
kategorirækker (med spiller-ID/navn) og 2,6 mio. sætresultater, på tværs af alle 33 regioner og 17
sæsoner. Det Christoffer reelt vil bruge det til er ikke bare et katalog — det er en gennemgang af
**rækkerne** (puljerne/divisionerne): hvordan de forholder sig til hinanden niveaumæssigt på tværs af
regioner og sæsoner, så GSB's egne hold (og evt. enkeltspillere) kan placeres i den rette kontekst.

Opgave 077 gjorde noget lignende, men kun for GSB's egne 455 kendte kampe/ligaer, og kun ud fra
rå-tekst-mønstre (fx "4600", "5400", bogstavkoder) uden faktiske kampresultater at validere imod. Nu
har vi faktiske resultater for hele landskabet, ikke kun GSB's udsnit — så niveau kan potentielt
underbygges af data (fx hvordan hold der rykker mellem rækker klarer sig), ikke kun af navnemønstre.

**Vigtigt:** dette kort skal IKKE starte med at bygge en algoritme. Det skal starte med at gennemgå
og forstå rækkerne konkret — hvilke divisions-/rækkenavne findes faktisk i datasættet, hvordan hænger
de sammen (er der en kendt hierarki-struktur i Badminton Danmark man kan slå op og bekræfte imod, eller
skal niveauet udledes empirisk fra data), og hvor konsistent/inkonsistent er navngivningen på tværs af
regioner og sæsoner. Det er en undersøgelsesfase, ikke en byggefase, indtil andet er aftalt.

## Mål

1. **Kortlæg de faktiske rækkenavne.** Træk en oversigt over alle unikke `division_name_raw`/
   `group_name_raw`/`page_title_raw`-værdier fra `league_groups` i `liga-landskab.db`, med antal
   forekomster pr. region/sæson. Rapportér mønstre og inkonsistens — ikke en antaget klassifikation.
2. **Undersøg om der findes en officiel/dokumenteret rækkehierarki** for dansk holdbadminton (fx
   Danmarksserien → 1.-8. Serie for senior, eller tilsvarende for ungdom) som de faktiske rækkenavne
   kan mappes til — enten fra allerede kendt materiale i projektet (opgave 077's arbejde,
   `GSB_NAVNE_ALIAS_OG_ANOMALIER.json`) eller fra badmintonplayer.dk/Badminton Danmark selv, hvis det
   findes offentligt. Gæt ikke på et hierarki — find eller udled det fra faktisk kilde/data.
3. **Vurdér om op-/nedrykning kan bruges til at validere/udlede niveau empirisk.** Hvis samme hold
   optræder i flere sæsoner i forskellige rækker, og der er tilstrækkelig navnekontinuitet til at følge
   holdet på tværs af sæsoner (brug samme forsigtighed som `player_link` i opgave 083 — marker usikre
   koblinger som usikre, gæt ikke), kan bevægelsen mellem rækker bruges til at bekræfte en formodet
   rangordning. Test det på et lille, kendt udsnit (fx GSB's egne hold, hvor niveauet allerede delvist
   er kendt fra opgave 077) før det generaliseres.
4. **Foreslå, men byg ikke endnu, en konkret model for "rangeret hold-liste"** — hvad skal den vise (fx
   hold rangeret inden for en aldersgruppe på tværs af regioner, baseret på hvilken række de spiller i
   plus evt. faktisk kampresultat/sætdifference), og hvilken ny tabel/visning det kræver i
   `liga-landskab.db`. Skriv forslaget i "Spørgsmål"-afsnittet og STOP der.

## Kontekst

- `work/loeste/081-statistik-alle-ligaer-landskab-katalog.md` — det fulde forløb, skema og endelige tal
  for kildedataen.
- `statistik/results/077-liga-regelsaet-katalog.md` — GSB's egne 455 klassificerede ligaer/kampe, delvis
  niveau-klassifikation ud fra rå-tekst-mønstre (112 stadig uafklarede, koncentreret i ungdomsrækker).
- `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` — kendte navne-varianter/anomalier, nyttig hvis holdnavne skal
  følges på tværs af sæsoner.
- `statistik/data/rangliste-historik.db` (opgave 083) — individuel ranglistepoint-historik for GSB's
  spillere, mulig fremtidig kobling via `match_categories`s spiller-ID'er.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/084-*`), nye scripts under
`statistik/scripts/`, `statistik/TEST_RUN_LOG.md`. Læsning (ikke skrivning) af `liga-landskab.db`,
`rangliste-historik.db` og `gsb-statistik-normalized.db`.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/liga-landskab.db` (kun læses i denne opgave — ingen nye tabeller/skrivninger endnu, det
kræver godkendelse af forslaget fra Mål 4 først), `statistik/data/rangliste-historik.db` (kun læses),
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`.

## Kontrol

**Målet:**
```
En faktisk oversigt over rækkenavne findes, med forekomster pr. region/sæson — ikke en antaget liste.
Der er enten fundet/bekræftet et officielt rækkehierarki, eller det er dokumenteret at det ikke findes
  offentligt tilgængeligt og derfor må udledes empirisk.
Op-/nedrykning som valideringsmetode er testet på et kendt udsnit, med usikre koblinger markeret som
  sådan, ikke gættet.
Et konkret forslag til rangeret hold-liste-model findes i kortets "Spørgsmål"-afsnit.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/*.db apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye tabeller eller skrivninger til liga-landskab.db eller rangliste-historik.db i dette kort.
```

**Skøn:** ingen på om en rækkenavns-til-niveau-mapping er sikker nok til at bruges uden markering —
usikre mappinger skal markeres som sådan, ikke stille antages korrekte. Samme regel som opgave 083's
`player_link`.

## Ved tvivl

Er det uklart om en rækkes niveau kan fastslås med rimelig sikkerhed (inkonsistent navngivning, ingen
kendt hierarki-kilde, for lidt data til at følge holdet på tværs af sæsoner): dokumentér den som
uafklaret i stedet for at gætte — præcis samme princip som opgave 077's 112 uafklarede rækker og opgave
083's usikre spillerkoblinger.

### Spørgsmål

#### Svar — analyse udført 2026-09-22

**1. Faktisk navnekatalog.** Den read-only analyse i `statistik/scripts/084-analyse-liga-landskab.mjs` læser én række pr. pulje fra `liga_groups` og aggregerer regionerne fra `league_group_regions`. Datasættet indeholder 18.546 puljer, 3.393 distinkte `division_name_raw`-værdier, 3.438 distinkte `group_name_raw`-værdier og 1.337 distinkte `page_title_raw`-værdier. Den fulde liste med forekomster pr. sæson, region og sæson/region-krydstab ligger i `statistik/results/084-liga-landskab-rangering.json`; Markdown-rapporten viser de hyppigste værdier for alle tre felter. Eksempler på rå variation er `Danmarksserien`, `3. division`, `Serie 1 Vest`, alders-/pointformater som `U15 - 4800 (4 spillere)` og playoffnavne som `Finale`, `Bronzekamp` og `5. - 8. plads`. Der findes ikke et regionsnavn i dette skema, kun numeriske `region_id`-værdier.

**2. Officiel hierarkikilde.** Badminton Danmarks holdturneringsreglement dokumenterer den overordnede seniorstruktur, geografiske grupper og oprykning/nedrykning ([reglement 2023](https://badminton.dk/wp-content/uploads/2023/10/Holdturneringsreglement-for-badminton-i-Danmark-051023.pdf), [DH-reglement 2026](https://badminton.dk/wp-content/uploads/2026/02/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-02-25.pdf)). Kilderne bekræfter reglerne, men indeholder ikke en maskinlæsbar historisk mapping fra alle rå `division_name_raw`/`page_title_raw`-tokens til ét niveau. En komplet mapping skal derfor være afledt og evidensmærket, ikke antaget.

**3. Empirisk op-/nedrykningstest.** Der er 455 GSB-koblede holdrækker med mindst én kamp; 142 er senior/veteran (`age_group_id` 1 eller 9). I de 142 rå rækker indeholder 16 eksplicit oprykning/nedrykning og 13 kvalifikation. Et manuelt læsbart udsnit af GSB's førstehold viser Danmarksserien-rækker i 2010–2015, men også flere rækker i samme sæson (fx hovedpulje plus nedrykning/kvalifikation) og skiftende/unnumererede holdnavne. Det viser at bevægelsesmarkører kan bruges som evidens, men ikke at et råt holdnavn alene er en stabil tværsæson-identitet. Ingen usikker kobling er automatisk godkendt.

**4. Foreslået model (ikke bygget).** Behold rådata uændret. Tilføj senere en afledt `league_level_assignments` med sæson, alder, region, pulje, normaliseret niveau/holdtype, confidence, evidencetype og kildehenvisning; en separat `team_identity_links` med metode/confidence/konfliktflag; og en afledt rangvisning der sorterer på dokumenteret niveau, derefter pulje/region og derefter kampresultat/sætdifference. Vis altid datadækning og usikkerhed. Kampdata og fortolkning holdes adskilt, så regler kan forbedres uden ny indsamling.

Konklusionen er et dokumenteret heterogent rålandskab med en bekræftet, men ikke fuldt maskinlæsbar officiel seniorstruktur. Opgave 084 stopper her som aftalt; der er ikke bygget en rangeringsalgoritme eller skrevet til nogen database.

## Resultatnote

Analyse gennemført read-only på `liga-landskab.db`, `gsb-statistik-normalized.db` og `rangliste-historik.db` (sidstnævnte blev kun kontrolleret for tilgængelighed). Resultaterne ligger i `statistik/results/084-liga-landskab-rangering.md` og `.json`; scriptet er `statistik/scripts/084-analyse-liga-landskab.mjs`.

- 18.546 puljer; 3.393 distinkte division-navne; 3.438 distinkte gruppe-navne; 1.337 distinkte sidetitler.
- 455 GSB-holdrækker med kampe; 142 senior/veteran-rækker; 16 med oprykning/nedrykning-token; 13 med kvalifikation-token.
- Officielle kilder bekræfter overordnet seniorhierarki og bevægelsesregler, men ikke en komplet historisk tokenmapping.
- Databasekontrol: `gsb-statistik-normalized.db` SHA-256 før/efter analyse `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` / samme hash efter; ingen SQL-skrivning eller nye tabeller. Den eksisterende untracked backup `statistik/results/050-standings-standings-backup.sql` er ikke rørt.
- Kontrol: outputtet er efterprøvet med samme script efter rettelse af pulje/regions-joinet; puljetallet er 18.546, ikke det tidligere join-multiplicerede mellemresultat 59.127.
