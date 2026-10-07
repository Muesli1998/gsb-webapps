# Opgave 153 — hvor langt tilbage går ranglistepoint, og er versionskalenderne ens?

**Trin:** Fortsætter 152. Lille, afgrænset netværksprøve. Ingen bulkhentning.

## Baggrund
150 og 151 hentede versionslister for sæson 2019–2022 og 2025–2026. Ældste dato fundet er 1. juli 2019, men det er blot den ældste sæson, vi har prøvet. 151 skriver "ikke søgt før seasonid 2019". Vores kampdata går tilbage til 2012/13, så vi skal vide, hvor langt tilbage ranglistepoint findes for ungdomsspillere, og hvor de ældste kampe derfor må stå som "ingen rangliste" i stedet for et tal. Christoffer ved ikke, hvornår ungdom kom på ranglisten; det må ikke gættes, men måles.

152a fandt også, at versionskalenderen er ukendt for 2023/24 og 2024/25, og at det ikke er bevist, at 289 og 292 har samme versionsdatoer som 288.

## Mål (maks. 25 forespørgsler i alt)
1. **Versionslister bagud.** For `seasonid` 2018, 2017, 2016, 2015, 2014, 2013 og 2012 (liste 288, param `M`, ét kald hver, `getversions` true): skriv for hver sæson antal versionsposter, antal daterede, ældste og nyeste dato, eller at listen er tom eller giver HTTP-fejl. Skel mellem "tom liste" (HTTP 200, ingen versioner) og "fejl" (HTTP 500 eller andet). Stop med at gå længere bagud, når to sæsoner i træk er tomme, og skriv at det er stopreglen.
2. **Point i de ældste versioner.** For hver sæson fra punkt 1, der har versioner (højst seks), hent ét GSB-filtreret kald (`clubid` = `1093`, 288/M, side 0) på den ældste version. Skriv antal rækker, om point er udfyldt i alle, og om rækkerne har `player_id`. Skriv også klasseetiketterne (fx om der findes `U13 …`-klasser, så ungdom faktisk er på listen). Det er svaret på, om ungdomsspillere har point i den sæson.
3. **Mangler 2023/24 og 2024/25.** Hent versionslisten for `seasonid` 2023 og 2024 (liste 288/M): antal, ældste og nyeste dato.
4. **Er kalenderne ens på tværs af lister?** Hent versionslisten for `seasonid` 2025 for liste 289 (param `M`) og 292 (param `M`). Sammenlign datoerne med 288's 158 daterede versioner (`statistik/results/150-raa-svar/14-q14-seasonid-2025-getversions.txt`). Skriv antal fælles datoer og de datoer, der kun findes i én liste.
5. **Ugedage.** Tæl for hver sæson med versioner, hvor mange versioner der ligger på hver ugedag, og de typiske huller i dage. Giv et kort resumé: i 2025 lå versionerne mandag, onsdag og fredag, og der var huller på op til 19 dage. Er mønstret det samme i andre sæsoner?
6. **Anbefaling.** Skriv i et par linjer: den ældste sæson, hvor ungdomsspillere har point, og hvilke sæsoner der skal stå som "ingen rangliste" i det senere pointskema.

## Netværksregler
- Maks. **25 forespørgsler i alt** (1 GET for kontekstnøglen, 7 + 2 + 2 versionslister, op til 6 GSB-kald, resten reserve), sekventielt, mindst 2 sekunders pause, backoff ved 429/5xx, stop ved 3 fejl i træk. Hent ny kontekstnøgle, hvis den udløber.
- Kun `badmintonplayer.dk`. Ingen login, ingen cookies, ingen CAPTCHA, ingen samtykkeklik. Ved bot-værn: stop og skriv det i "Spørgsmål".
- Brug 150/151's fungerende request og Value-format `MM/DD/YYYY`. Gem råsvar (kontekstnøgle redigeret ud) i `statistik/results/153-raa-svar/`. Ingen databaser skrives til.

## Output
- `statistik/scripts/153-historisk-raekkevidde.mjs`
- `statistik/results/153-historisk-raekkevidde.md` (punkt 1–6 og forespørgselslog: nr., felter ændret, status, bytes, svarhash)
- `statistik/results/153-historisk-raekkevidde.json`
- `statistik/results/153-raa-svar/`

## Kontrol
- **Målet:** Punkt 1–6 besvaret, eller et tydeligt stop med den fejl, der blev set.
- **Værnet:** Højst 25 forespørgsler (tallet står i loggen, hver med hash). De fire databasers hashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E), alle åbnet readOnly; `rangliste-point.db` fra 152, hvis den findes, må ikke ændres. `git status --short statistik/data/` må ikke vise nye ændringer. `git diff --check` uden fejl.
- **Skøn:** 3 GSB-spillere fra den ældste sæson med point (navn, klasse, point), som Christoffer kan slå op på den offentlige side.

## Afgrænsning
- Ingen bulkhentning, ingen ny database, ingen forventet-vinder-beregning, ingen artifact.
- Ret ikke 136-parseren, 143–152-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke på, hvornår ungdom kom på ranglisten; skriv hvad kilden viser, og gem evidensen.

## Gren
`arbejde/153-historisk-raekkevidde`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
- 2012–2017 returnerer HTTP 200, nul ranglisterækker og én udateret versionspost, "Seneste". Listen er derfor ikke bogstaveligt tom: stopreglen med to helt tomme versionslister blev ikke udløst, og alle syv sæsoner blev prøvet. Ingen dateret kalender fundet er ikke et bevis for, at ungdom aldrig havde point. Anbefalet status i senere pointskema: "ingen dateret rangliste fundet via denne rute", med ukendt årsag. Skal en anden historisk kilde undersøges senere?
- 2018-prøvens klassefelt er SEN eller tomt, ikke U13 mv. Ungdomsdeltagelse er i stedet verificeret på profil-ID, identisk navn, samme sæson og GSB-holdside i national-spillere.db. Ingen alder eller køn er gættet fra navnet.
- 2018-kalenderen indeholder også 2019-07-01. Det er kildens faktiske svar og bevares; der gættes ikke på sæsonoverlap eller årsag.
- Ens kalendere er kun bevist for 2025/26, M, liste 288/289/292. Det beviser ikke kalenderfællesskab for alle sæsoner eller K.
- Promptens budget er 35 mod kortets oprindelige 25; de 13 faktisk brugte kald overholder begge. Ingen ekstra kald var nødvendige.

## Tilbagefald
Slet de nye filer, inklusive `153-raa-svar/`. Ingen database er berørt.

## Resultat
Afsluttet på arbejde/153-historisk-raekkevidde, uden staging, commit eller push. 13 sekventielle kald, alle HTTP 200; mindste interval 2.100 ms. Transport, bot-værn, redaktion og parser/requestkontrakt fra 152/151 er genbrugt uden at ændre de eksisterende scripts. Ingen cookies, login, CAPTCHA-omgåelse eller bulkhentning.

| Sæson-ID / liste M | Versionsposter | Daterede | Ældste | Nyeste |
|---|---:|---:|---|---|
| 2018 / 288 | 142 | 141 | 2018-07-01 | 2019-07-01 |
| 2017–2012 / 288, hver sæson | 1 | 0 | ingen | ingen |
| 2023 / 288 | 130 | 129 | 2023-07-01 | 2024-06-17 |
| 2024 / 288 | 160 | 159 | 2024-07-01 | 2025-06-25 |
| 2025 / 289 | 159 | 158 | 2025-07-01 | 2026-06-29 |
| 2025 / 292 | 159 | 158 | 2025-07-01 | 2026-06-29 |

GSB-filteret på 2018-07-01 gav 28 rækker, alle 28 med point og profil-ID. Det valgte versions-Value `07/01/2018` var bekræftet i svaret. 10 af spillerne matcher eksisterende ungdomskampe i samme sæson på ID, navn og GSB-holdside. Tre offentligt kontrollerbare stikprøver (klassefeltet er tomt): Jonathan W. Hansen, ID 93216, 3.095 point; Oliver Frei, ID 229287, 3.072; Jakob Buus Nyeng, ID 211704, 2.516. Kamp-ID'er og rå klasseetiketter er i rapport/JSON.

Ældste positive ungdomsprøve: 2018/19, 1. juli 2018. Det er ikke et bevist historisk starttidspunkt. 2012–2017 får ingen opdigtede point og mærkes efter anbefalingen i Spørgsmål, ikke som definitivt "ingen rangliste".

Kalenderfællesskab: 289 og 292 har hver præcis 158 fælles datoer med 288's gemte 2025-svar; 0 datoer kun i den ene liste, identiske datosæt. Ugedage og alle afstandshistogrammer står i rapporten. Mandag/onsdag/fredag dominerer, men andre ugedage forekommer. Typiske afstande er 2–3 dage; største hul er 11 dage i 2018, 31 i 2023, 12 i 2024 og 19 i 2025.

Kontrol: `node --check statistik/scripts/153-historisk-raekkevidde.mjs` og offline `node statistik/scripts/153-historisk-raekkevidde.mjs --analyze`. Alle 13 gemte råsvarshashes kontrolleret. Alle fem databaser blev åbnet readOnly; SHA-256 før/efter er identiske. De fire kendte hashes matcher kortet; rangliste-point.db har før = efter `54F2FE25C82C188D5E6412A131081BF341A37AFF17DFF51B5F68A884B6591BC9`. Alle fulde hashes står i rapporten. `git status --short statistik/data/` er tom; `git diff --check` har ingen fejl. Chris' eksisterende ændringer er urørte.

Leverancer: `statistik/scripts/153-historisk-raekkevidde.mjs`, `statistik/results/153-historisk-raekkevidde.md`, `statistik/results/153-historisk-raekkevidde.json`, `statistik/results/153-raa-svar/`. Kortet forbliver i work/aabne/, alt ustaged.
