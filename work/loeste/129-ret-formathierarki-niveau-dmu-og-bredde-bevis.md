# Opgave 129 — ret formathierarkiet i 127, tilføj niveau i formatet, skil DMU ud og vis bevis for bredde

**Trin:** Ny. Retter og udvider 127 (`statistik/results/127-gsb-ungdom-formatplacering.json/.md`, scriptet `statistik/scripts/127-youth-format-and-kbh-width.mjs`). Bygger på 126 og 127.

## Baggrund

Christoffer gennemgik 127 for U13 2024/25 og fandt fire problemer:

1. **Formatrækkefølgen er forkert.** 127 bruger 126's rækkefølge, hvor "4 piger" (plads 4) står over "4 spillere" (plads 7). Christoffers hierarki er **4+3 > 4+2 > 2+2 > 4 spillere > 4 piger** (det samme som i det parkerede kort 113). Ved samme format afgør rækkeniveauet.
2. **Rækkeniveauet i navnet bruges ikke.** Navne som "U13 A, 5600 (2+2)", "U13 B, 5000", "U13 C, 4200", "U13 D, 3600" indeholder bogstav og tal. Fælles reglement for ungdomsholdturneringen 2025/26 §9 bekræfter niveauklassifikation ved sæsonstart (bogstav eller pointtal) og pointlofter for angivne holdtyper; det dokumenterer ikke automatisk fortolkningen af alle historiske rækkenavne. Bogstav og tal rangeres derfor kun inden for samme format, med historiske afvigelser dokumenteret frem for interpoleret.
3. **DMU-hold blandes med Badminton Københavns egne rækker.** DMU Hold er en national finaleturnering (Danmarks mesterskab for ungdomshold, puljevindere er garanteret deltagelse), ikke en region 8-række. I U13 2024/25 er der 9 GSB-poster i region 8 (GSB 1–9) og 5 DMU-poster (GSB 1, 2 og 3 fordelt på pulje, placeringskamp og finale): 14 GSB-poster i alt for 9 unikke rå holdnavne. DMU-posterne skal stå separat. Den tidligere formulering “14 poster for 9 hold” som DMU-tal var forkert.
4. **"Klubber i det format" indeholder ikke-klubber.** Fx "Badminton København", "Badminton Midtjylland", "BADFYN/BADSDRJ", "CBK/GBK/KMB2010", som er kreds-/regionshold eller samarbejder. Rækken "U13 Kredsmatch" tæller med i bredde-nævneren, selvom GSB ikke kan deltage i den.

Christoffer vil også se **bevis for bredden** i Badminton København: for hver sæson og aldersgruppe en liste over alle rækker og hvilke GSB er med i, så tallene kan dobbelttjekkes. Kontroleksempel U13 2024/25 (region 8): 13 rækker i alt, GSB i 6 (A 5600 2+2, B 5000 4 spillere, C 4200 4 spillere, D 3600 4 spillere, D 3200 4 piger, UGE 38 D 3600 2+2).

## Mål

1. **Fast formathierarki:** 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger. Placeringen "x af n" regnes ud fra dette hierarki, ikke 126's rækkefølge. For formater uden fastlagt plads (3 spillere, 5 spillere, S4/D4, ikke-kanoniske signaturer, 4-8 spillere, X1, X2): foreslå en foreløbig plads efter tommelfingerreglen "flere spillere = højere, 4 piger lavest", mærket tydeligt "foreløbig, ikke godkendt", og list dem med antal poster i Spørgsmål, så Christoffer kan godkende. 126's egne filer ændres IKKE.
2. **Niveau i formatet:** udtræk bogstav (A/B/C/D, også "C-D") og tal fra rækkenavnet. Rangér hold inden for samme format efter bogstav (A > B > C > D) og dernæst tal. Rangér IKKE på tværs af formater efter niveau. Rapportér hvor mange rækkenavne der ikke kan tolkes. Spørgsmålet "4 piger C over 4 spillere D" er ikke afgjort; lad hierarkiet (format først) styre og nævn tilfældene som kommentar.
3. **DMU separat:** puljer hvis række hedder "DMU …" udgår af både formatplaceringen og bredden i region 8 og rapporteres i en egen tabel pr. sæson og aldersgruppe (GSB-hold, format, niveau). Tæl unikke GSB-hold (ét hold, der spiller både i region 8 og DMU, tæller som ét).
4. **Kreds- og samarbejdshold:** rækker med "Kredsmatch" udgår af bredde-nævneren (rapportér begge tal). I listen "Klubber i højeste format": mærk regions-/kredshold og slash-samarbejder særskilt og læg dem i en egen kolonne eller liste, så "klubber" kun er klubber.
5. **UGE 38:** list alle rækker med "UGE 38" i navnet (sæsoner, aldersgrupper, formater, puljenavne, antal hold, om GSB-holdet også optræder i en anden række samme sæson). Find i data hvad det betyder (række-/puljenavne, `league_group_details`). Reglementet nævner ikke "uge 38" ifølge første søgning. Gæt IKKE; skriv hvad data viser, og hvad der stadig er uklart. Christoffers hypotese (ikke bekræftet): rækker for hold med få kampe, evt. direkte adgang til DMU.
6. **Bredde-bevis:** for hver sæson og aldersgruppe gem og vis listen over alle rækker i region 8 med markering af hvilke GSB er med i og hvilke GSB-hold. Tilføj den som tabel i rapporten og felt i JSON. Kontrollér U13 2024/25 mod eksemplet ovenfor.
7. **Opdater** `127`-rapporten og JSON, så de afspejler 1–6, og skriv ændringerne i kortets Resultatnote. Genkørsel af 127-scriptet skal stadig give samme GSB-hold (279 poster eller forklarede forskelle).

## Afgrænsning

- Ungdom kun (aldersgruppe-ID 2, 3, 4, 5, 6, 7, 18). Intet senior.
- Databaser kun læst (`readOnly`). Rør ikke `statistik/data/*.db`, 126-filer eller andre afsluttede resultatfiler.
- Hierarkiet er Christoffers eget (ikke et reglementskrav). Skriv det i rapporten som "Christoffers rangering, ikke reglementsbestemt".
- Placering må ikke bruges til sportslig styrke på tværs af formater.
- Brug fysiske puljer som enhed for puljetal og rækkenavn (division_name_raw, samlet pr. sæson og aldersgruppe) som enhed for bredde, som i 127.

## Kontrol

- U13 2024/25: placering efter hierarkiet giver 2+2 (A 5600) > 4 spillere (B 5000, C 4200, D 3600) > 4 piger (D 3200); 8 almindelige region-8-GSB-poster + 1 separat UGE 38-post + 5 DMU-poster = 14 poster i alt for 9 unikke rå holdnavne. DMU-listen viser de 5 poster, 3 unikke hold, alle tre også i almindelige rækker. Bredde uden UGE 38 og Kredsmatch: 5/10; med UGE 38 men uden Kredsmatch: 6/12; med begge: 6/13.
- Optælling: GSB-hold fundet = placeret + uplaceret + udgået/trukket + DMU + UGE 38 (alle poster går op).
- SHA-256 og rækketal for `gsb-statistik-normalized.db` og `liga-landskab.db` uændrede (49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E og 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C).
- `git status --short statistik/data/` viser ingen databasefiler.

## Ved tvivl

Spørg i "Spørgsmål" frem for at gætte, især om foreløbige formatpladser, tolkning af rækkenavne og UGE 38.

## Gren

`arbejde/129-formathierarki-niveau-dmu-bredde-bevis`, fra `main`.

---

## Spørgsmål

### Fortsat afklaring / forslag til godkendelse

- Formater uden godkendt hierarkiplads står i rapporten som **foreløbig, ikke godkendt**. Optællingen er nationale, deduplikerede fysiske puljer (ikke regionforekomster): 3 spillere 38; 4-8 spillere 131; 5 spillere 5; ikke-kanoniske signaturer: DS2/DD1/HS4/HD2 1, HS4/HD2 17, MD1/DS1/DD1/HS1/HD1 6, MD1/DS1/DD1/S3/D2 2, MD1/DS2/DD2/HS2/HD2 6, MD1/S4/D3 12, MD2/DS2/DD1/S4/D2 1, MD2/DS2/DD2/HS4/HD3 12, S3 2, S4/D4 3, S6/D3 3, S8 28; uplaceret med formattekst: 2+2 16, 3 spillere 4, 4 piger 33, 4 spillere 109, 4+2 16, 4+3 3, ingen formattekst 137, X1 4, X2 3; X1 8 og X2 6. Forslag: 3 spillere mellem 4 spillere og 4 piger; 5 spillere over 4 spillere, men præcis relation til 2+2 uafklaret. 4-8 spillere overlapper holdstørrelser, og signaturer/ukendte formater dokumenterer ikke et sikkert spillerantal; de har ingen bestemt foreløbig slot. Christoffer bedes godkende eller ændre forslagene.
- Niveau: 1.986 distinkte ungdomsrækkenavne; parseren udtrak 885 niveauetiketter, heraf 57 intervaller (fx C-D), som ikke får en enkelt rang, og 1.101 rækkenavne kunne ikke tolkes som A/B/C/D eller interval. De rå navne og udtræk ligger i JSON. Reglementet 2025/26 §9 understøtter niveauklassifikation ved sæsonstart (bogstav eller pointtal) og pointlofter for angivne formater, men beviser ikke at alle historiske navnes pointtal følger samme sæsons tærskler.
- “4 piger C” og “4 spillere D” forekommer samtidig i 10 kombinationer: 2015/16 U13, 2015/16 U15, 2017/18 U13, 2017/18 U15, 2018/19 U13, 2018/19 U15, 2024/25 U13, 2024/25 U15, 2025/26 U13 og 2025/26 U15. Formatordenen styrer; niveau sammenlignes ikke på tværs af formater.
- UGE 38: 43 ungdoms-puljeposter i data, alle 43 tilhørende rå detailrespons gentager UGE 38-teksten. Rækkenavne, sæson/alder, format, puljenavn, holdantal, GSB og overlap til andre rækker er listet i rapport/JSON. Data forklarer ikke, hvad UGE 38 organisatorisk betyder, eller om det giver adgang til DMU; hypotesen om få kampe/direkte adgang er ikke bekræftet.

## Resultatnote

### Leveret

- Opdateret `statistik/scripts/127-youth-format-and-kbh-width.mjs` samt 127's JSON- og Markdown-rapporter. Ingen 126-filer blev ændret. Databaser åbnes `readOnly: true`.
- Nyt fast hierarki er Christoffers rangering, ikke reglementsbestemt: 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger. Niveau rangeres kun inden for samme format: A>B>C>D, derefter numerisk værdi faldende; C-D og ufortolkelige niveauer får ingen opfundet enkeltplads. DMU fjernes fra lokal placering og region 8-bredde; Kredsmatch udelades af hovednævneren, men begge bredde-denominatorer rapporteres.
- Formater uden fast plads er mærket foreløbige/ikke godkendte og opgjort som nationale deduplikerede fysiske puljer i rapporten. Klubnavne i højeste format er adskilt fra regions-/kredshold og slash-samarbejder. Række-for-række-breddebevis og alle 43 UGE 38-poster indgår.

### Kontroloutput

- U13 2024/25-formatstikprøve bestået med fulde rå rækkenavne: `U13 A, 5600 (2+2)` → 2+2/A/5600; `U13 B, 5000 (4 spillere)` → 4 spillere/B/5000; `U13 C, 4200 (4 spillere)` → 4 spillere/C/4200; `U13 D 3600 (4 spillere).` → 4 spillere/D/3600; `U13 D, 3200 (4 piger)` → 4 piger/D/3200. Rækkefølge efter format og niveau bestod.
- U13 2024/25 region 8: 13 division-rækker, 6 med GSB; uden Kredsmatch 12 rækker, 6 med GSB. Regionens GSB-poster er hold 1–9 (9 poster); DMU har 5 poster for hold 1, 2 og 3 (3 unikke hold), alle tre genfindes lokalt. Totalen er 14 poster for 9 unikke rå holdnavne — den tidligere forventning om 14 DMU-poster var forkert.
- Fem stikprøver kontrolleret mod deres fysiske puljelister, formater og bredde (rækker; puljer; 125-katalog match): 2011/12 U11 (4 GSB-poster, ingen brugbart placeret format; 2/5; 2/5; 0/0); 2016/17 U11 (2, bedste GSB 4 spillere D; 2/8; 2/9; 2/2); 2020/21 U15 (3, bedste GSB 4 spillere uden tolket niveau; 3/12; 3/13; 2/2); 2025/26 U11 (5, bedste GSB 4 spillere D/4600; 3/6; 4/13; 5/5); 2026/27 U13 (10, bedste GSB 2+2 B/5200; 7/15; 9/19; 0/0). 2026/27 er markeret i gang/ufuldstændig.
- Samlet efter færdiggørelsen: **279 = 133 placerede + 53 ikke placerede + 12 udgåede/trukne + 62 DMU-poster + 19 UGE 38-poster**. Af de 12 lokale udgåede/trukne er 9 udgået og 3 trukket. DMU-listen deduplikerer til 34 sæson/alder/hold-identiteter.
- Datamodel: region 8 er Badminton København; 784 fysiske puljer fordelt på 568 division-rækker, 0 manglende rækkenavne, detailrespons for 784/784 puljer. Region 8 rækkeoptælling er hovedtal; fysisk puljebredde er supplerende.
- UGE 38: 43 poster, alle med detailrespons der gentager teksten; betydningen er stadig ukendt.
- Databaser før/efter er ens. `gsb-statistik-normalized.db` SHA-256 `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; rækketal: `clubs=1, competitions=462, extraction_errors=1444, individual_match_players=67196, individual_matches=20319, players=7599, raw_payloads=2874, seasons=26, standings=751, team_matches=2818, teams=472`.
- `liga-landskab.db` SHA-256 `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; rækketal: `age_groups=29, club_registry=796, fetch_errors=0, group_type_katalog=8928, league_group_details=18546, league_group_match_counts=18546, league_group_regions=59127, league_group_teams=96823, league_groups=18546, league_match_groups=310137, league_match_requests=221558, league_matches=203012, match_categories=1300474, match_games=2636258, regions=33, standing_indexes=16269`.
- Kontroller kørt: `node --check statistik/scripts/127-youth-format-and-kbh-width.mjs` — bestået; `node statistik/scripts/127-youth-format-and-kbh-width.mjs` — exit 0, GSB-balance, U13 bredde-/formatstikprøve, DMU-deduplicering og DB-værn bestod. `git status --short statistik/data/` — ingen databasefiler.

Rapportfilerne blev genåbnet efter generering; ovenstående U13-, DMU-, format-, UGE 38- og databaseværdier matcher indholdet. Kortet er flyttet til `work/loeste/` efter beståede kontroller.

### Færdiggørelse

- U13-kontrollen blev rettet fra 6/11 til **5/10** efter verificering af kildedata: region 8 har 13 rækker, heraf 2 UGE 38 og 1 Kredsmatch. Varianterne er **6/12** (UGE 38 med, Kredsmatch fra) og **6/13** (begge med). Den sjette GSB-række, `UGE 38 - U13 D, 3600 (2+2)` med Gladsaxe Søborg 9, står på den separate UGE 38-liste og tæller hverken i placering eller bredde. Den anden UGE 38-række er `UGE 38 - U13 C, 4000 (2+2)` uden GSB.
- UGE 38 behandles nu som særskilt ekstraordinær 2+2-turnering for U13-U19 med en DMU Hold-plads til vinderen af hver række, jf. Christoffers afgørelse baseret på DGI's “Uge 38 invitation 2026-2027”; det er ikke en almindelig Badminton København-række. Data har 43 fysiske puljer fordelt på 30 sæson/alder/række-poster, og 19 GSB-hold-puljeposter. Første observerede sæson er 2024/25; UGE 38 findes i 2024/25, 2025/26 og 2026/27.
- Formatplaceringen bruger kun 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger. 3 spillere, 5 spillere, X1, X2, 4-8 spillere og alle ikke-kanoniske signaturer er “Ikke placeret”; rapporten angiver antal fysiske puljer, hold-puljeposter, rækker, GSB-poster og holdnavne.
- 4-8-kontrollen: alle **131** 4-8-puljer har signaturen `1. D · 1. S · 2. D · 2. S · 3. S · 4. S`; samme signatur forekommer i **3.530 af 3.538** 4-spillere-puljer. De er fortsat separate etiketter uden sammenlægning: de delte kampsignaturer viser overlap i kategoridata, men kan ikke alene afgøre om formatnavnene er synonymer. Dette er dokumenteret under Spørgsmål i den nye rapport.
- Uoplyste niveauer grupperet i `statistik/results/129-uoplyste-niveauer.md`: 1.101 forskellige rækkenavne, 3.655 poster i seks mønstergrupper, sorteret efter poster med op til tre eksempler pr. gruppe. Det er gruppering, ikke niveaugætning.
- Reglementsnoten angiver §9 stk. 3a, s. 4-6 (maksimale samlede niveauklassifikationspoint i rækkenavnet) og §12, s. 7 (hierarkiet stemmer med nummereringsrækkefølgen). Kun 2025/26 er verificeret; ældre sæsoner afventer kort 130.
- Genkørsel bestået: 279 GSB-poster = 133 placerede + 53 ikke placerede + 12 udgåede/trukne + 62 DMU + 19 UGE 38. U13-kontrollerne bestod: formatsample, 4+3/2+2/4 spillere/4 piger-rækkefølge, bedste GSB-format 2+2 A 5600, bredde 5/10 med varianterne 6/12 og 6/13 samt 5 DMU-poster for GSB 1, 2 og 3. De fem øvrige sæson/alder-stikprøver genkørt; 2026/27 står stadig “i gang, ufuldstændig”.
- Databaserne forblev read-only. `gsb-statistik-normalized.db`: SHA-256 `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; rækketal uændrede: `clubs=1, competitions=462, extraction_errors=1444, individual_match_players=67196, individual_matches=20319, players=7599, raw_payloads=2874, seasons=26, standings=751, team_matches=2818, teams=472`. `liga-landskab.db`: SHA-256 `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; rækketal uændrede: `age_groups=29, club_registry=796, fetch_errors=0, group_type_katalog=8928, league_group_details=18546, league_group_match_counts=18546, league_group_regions=59127, league_group_teams=96823, league_groups=18546, league_match_groups=310137, league_match_requests=221558, league_matches=203012, match_categories=1300474, match_games=2636258, regions=33, standing_indexes=16269`.
- Rapportfilerne og niveaulisten blev genåbnet; ovenstående centrale tal stemmer med de gemte filer. `node --check statistik/scripts/127-youth-format-and-kbh-width.mjs` og `node statistik/scripts/127-youth-format-and-kbh-width.mjs` bestod. `git status --short statistik/data/` viste ingen databasefiler.

## Spørgsmål

- **4-8 spillere kontra 4 spillere:** data viser identisk S4/D2-signatur for alle 131 4-8-puljer, og denne signatur er dominerende blandt 4-spillere-puljerne (3.530/3.538). De sammenlægges ikke; signaturens overlap fastslår ikke i sig selv at etiketterne betyder det samme.
