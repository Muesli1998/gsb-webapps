# Opgave 127 — formatplacering og deltagelsesbredde for GSB's ungdom

## Metode og godkendte regler

- GSB er kun råt holdnavn der starter med “Gladsaxe Søborg”; auditens 279 poster/21 varianter.
- “BC37/Gladsaxe Søborg 1” behandles som samarbejdshold separat og tæller ikke som rent GSB.
- BC37-varianter og registry 1087/1232 er ikke GSB.
- Navne med “udgået” eller “trukket” (inkl. stjernemarkering) vises særskilt og tæller ikke som placeret/deltagende.
- Alle rene GSB-hold vises. Sæsonens GSB-placering er bedste aktive format; bredden tæller alle aktive GSB-hold i de deltagende puljer/rækker.
- Andre holdnavne normaliseres ved at fjerne trailing holdnummer, trailing statusmarkeringer og parentestekst. Slash-samarbejder forbliver én klubenhed.
- Kun ungdoms-ID'erne 2, 3, 4, 5, 6, 7, 18; ingen senior. Formatrangering er ikke styrkesammenligning på tværs af spillefamilier.

## Datamodel: pulje og række

Region 8 er **Badminton København** (BADKBH); region 24 er DGI Storkøbenhavn og er ikke medtaget. Regiontilhørsforhold afgøres af `league_group_regions`, ikke sidens titel. En fysisk pulje er `(season_id, age_group_id, league_group_id)`. `league_groups.division_name_raw` er række-/liganavnet; grupper i samme sæson/aldersgruppe med samme nøjagtige værdi samles til én række. `group_name_raw` er puljen/fasen (fx Pulje 1, Pulje 2 eller finale). `league_group_details` indeholder rå detailrespons per fysisk pulje.

Region 8: 784 fysiske puljer fordelt på 568 rækker; manglende rækkenavn: 0. Antal puljer pr. række fordeler sig sådan: 406 rækker med 1 pulje(r); 122 rækker med 2 pulje(r); 30 rækker med 3 pulje(r); 8 rækker med 4 pulje(r); 2 rækker med 6 pulje(r). Detaildata dækker 784/784 puljer. 5182 ungdomspuljer er knyttet til flere regioner; fysisk-puljeoptællingen i København tæller hver nøgle én gang. Række-bredde er hovedtallet, fordi flere puljer under samme divisionsrække ellers ville få bredere deltagelse til at se større ud; fysisk puljebredde vises som supplerende mål.

## Formatplacering A pr. sæson og aldersgruppe

Puljenes format fortsætter med 126's per-pulje-metode (125-afgørelser for S4/D2, ellers kategorisignatur/formattekst). Formatordenen her er **Christoffers rangering, ikke reglementsbestemt**: 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger. Den bruges ikke som sportslig styrkesammenligning på tværs af formater. x/n er formatplacering blandt formater i samme nationale sæson/aldersgruppe. Ved n=1 står “kun ét format findes”. 2026/2027 er **i gang, ufuldstændig**; kun endnu spillede/kategoriserede puljer indgår.

Niveaukilde: Badminton Danmark/DGI Badminton, *Fælles reglement for ungdomsholdturneringen 2025/2026*, §9 og §12 ([officiel PDF](https://badminton.dk/wp-content/uploads/2025/10/Faelles-reglement-for-ungdomsholdturneringen-2025-10-08.pdf)). §9 omtaler klassifikation ved sæsonstart (bogstav eller pointtal) og pointlofter for bestemte holdtyper; §12 beskriver holdtypen før niveau i nummereringsrækkefølgen. Kilden er 2025/26, og historiske thresholds er ikke interpoleret.

Formater uden godkendt plads står som **foreløbig, ikke godkendt**. Tabellen tæller distinkte fysiske puljer nationalt; den er ikke et godkendt hierarki:

| Foreløbigt format | Fysiske puljer | Grundlag/forbehold |
| --- | --- | --- |
| 3 spillere | 38 | forslag: efter 4 spillere og før 4 piger; 4 piger fastholdes som laveste faste format |
| 4-8 spillere | 131 | spænder over flere holdstørrelser; én plads kan ikke udledes af intervallet |
| 5 spillere | 5 | forslag: over 4 spillere; præcis relation til 2+2 afventer godkendelse |
| Ikke-kanonisk signatur: DS2/DD1/HS4/HD2 | 1 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: HS4/HD2 | 17 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: MD1/DS1/DD1/HS1/HD1 | 6 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: MD1/DS1/DD1/S3/D2 | 2 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: MD1/DS2/DD2/HS2/HD2 | 6 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: MD1/S4/D3 | 12 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: MD2/DS2/DD1/S4/D2 | 1 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | 12 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: S3 | 2 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: S4/D4 | 3 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: S6/D3 | 3 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Ikke-kanonisk signatur: S8 | 28 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: 2+2 (ingen brugbar kategorisignatur) | 16 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: 3 spillere (ingen brugbar kategorisignatur) | 4 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: 4 piger (ingen brugbar kategorisignatur) | 33 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | 109 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: 4+2 (ingen brugbar kategorisignatur) | 16 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: 4+3 (ingen brugbar kategorisignatur) | 3 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | 137 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: X1 (ingen brugbar kategorisignatur) | 4 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| Uplaceret: X2 (ingen brugbar kategorisignatur) | 3 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| X1 | 8 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |
| X2 | 6 | signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås |

Niveau udtrækkes fra rækkenavnet. Reglementets 2025/26 §9 siger at holdopstilling tager udgangspunkt i sæsonstartens niveauklassifikation (bogstav eller pointtal) og omtaler maksimale samlede klassifikationspoint i skemaerne; §12 beskriver klubbernes nummerering med holdtyper før niveauorden. Dette dokument bruger A>B>C>D og derefter numerisk værdi faldende **kun inden for samme format**. C-D intervaller og manglende etiketter får ingen opfundet enkeltplads. I 1986 forskellige ungdomsrækkenavne blev 885 etiketter udtrukket; 57 rækkeetiketter har et intervalniveau og 1101 kunne ikke tolkes. Den fulde liste ligger i JSON.

| Sæson | Aldersgruppe | GSB hold-puljeposter | GSB-status | Bedste GSB-format | Højeste nationalt | Aktive uplacerede | Udgået/trukket |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2011/2012 | U11 (ID 3) | 4 | aktivt GSB-hold, format uplaceret | — | 4+3 (fastlagt af Christoffer) | 2 | 2 |
| 2011/2012 | U13 (ID 4) | 4 | aktivt GSB-hold, format uplaceret | — | 4+3 (fastlagt af Christoffer) | 2 | 2 |
| 2011/2012 | U15 (ID 5) | 3 | aktivt GSB-hold, format uplaceret | — | 4+3 (fastlagt af Christoffer) | 3 | 0 |
| 2011/2012 | U17 (ID 6) | 1 | ingen aktivt GSB-hold (kun udgået/trukket) | — | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2012/2013 | U11 (ID 3) | 1 | under højeste format | Ikke-kanonisk signatur: S6/D3 (niveau uafklaret; format foreløbig/8; foreløbig, ikke godkendt) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2012/2013 | U13 (ID 4) | 2 | under højeste format | Ikke-kanonisk signatur: MD1/S4/D3 (niveau uafklaret; format foreløbig/8; foreløbig, ikke godkendt) | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2012/2013 | U15 (ID 5) | 3 | under højeste format | Ikke-kanonisk signatur: MD1/S4/D3 (niveau uafklaret; format foreløbig/8; foreløbig, ikke godkendt) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2012/2013 | U17 (ID 6) | 1 | under højeste format | Ikke-kanonisk signatur: MD1/S4/D3 (niveau uafklaret; format foreløbig/7; foreløbig, ikke godkendt) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2013/2014 | U11 (ID 3) | 2 | under højeste format | Ikke-kanonisk signatur: MD1/S4/D3 (niveau uafklaret; format foreløbig/10; foreløbig, ikke godkendt) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2013/2014 | U13 (ID 4) | 2 | under højeste format | 4+2 (niveau uafklaret; format 2/9; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2013/2014 | U15 (ID 5) | 3 | under højeste format | 4 spillere (niveau uafklaret; format 4/10; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2013/2014 | U17 (ID 6) | 2 | under højeste format | Ikke-kanonisk signatur: MD1/S4/D3 (niveau uafklaret; format foreløbig/7; foreløbig, ikke godkendt) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2014/2015 | U11 (ID 3) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 3/6; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2014/2015 | U13 (ID 4) | 2 | under højeste format | 4+2 (niveau uafklaret; format 2/6; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2014/2015 | U15 (ID 5) | 2 | under højeste format | 4+2 (niveau uafklaret; format 2/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2014/2015 | U17 (ID 6) | 2 | ingen aktivt GSB-hold (kun udgået/trukket) | — | 4+3 (fastlagt af Christoffer) | 0 | 2 |
| 2015/2016 | U11 (ID 3) | 2 | under højeste format | 4 spillere (D; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2015/2016 | U13 (ID 4) | 2 | under højeste format | 4 spillere (B; format 3/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2015/2016 | U15 (ID 5) | 1 | under højeste format | 4+2 (niveau uafklaret; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2015/2016 | U17 (ID 6) | 1 | ingen aktivt GSB-hold (kun udgået/trukket) | — | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2016/2017 | U11 (ID 3) | 2 | under højeste format | 4 spillere (D; format 2/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2016/2017 | U13 (ID 4) | 1 | under højeste format | 4 spillere (C; format 3/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2016/2017 | U15 (ID 5) | 2 | under højeste format | 4+2 (A; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2016/2017 | U17 (ID 6) | 1 | under højeste format | 4 spillere (B; format 3/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2016/2017 | U17/U19 (ID 18) | 0 | ingen aktivt GSB-hold (kun udgået/trukket) | — | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2017/2018 | U11 (ID 3) | 1 | under højeste format | 4 spillere (D; format 3/7; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2017/2018 | U13 (ID 4) | 2 | under højeste format | 4 spillere (B; format 3/7; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2017/2018 | U15 (ID 5) | 2 | under højeste format | 4 spillere (B; format 3/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2017/2018 | U17/U19 (ID 18) | 2 | i højeste format | 4+2 (niveau uafklaret; format 1/3; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 1 |
| 2018/2019 | U11 (ID 3) | 2 | under højeste format | 4 spillere (C; format 3/6; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2018/2019 | U13 (ID 4) | 1 | under højeste format | 4 spillere (niveau uafklaret; format 2/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2018/2019 | U15 (ID 5) | 1 | under højeste format | 4 spillere (D; format 3/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2018/2019 | U17/U19 (ID 18) | 2 | under højeste format | 4 spillere (A; format 2/3; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2019/2020 | U11 (ID 3) | 1 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2019/2020 | U13 (ID 4) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 2/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2019/2020 | U15 (ID 5) | 1 | under højeste format | 4 spillere (niveau uafklaret; format 3/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2020/2021 | U09 (ID 2) | 2 | kun ét format findes | 4 spillere (niveau uafklaret; format 1/1; fastlagt af Christoffer) | 4 spillere (fastlagt af Christoffer) | 0 | 0 |
| 2020/2021 | U11 (ID 3) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2020/2021 | U13 (ID 4) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 2/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2020/2021 | U15 (ID 5) | 3 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2021/2022 | U09 (ID 2) | 1 | kun ét format findes | 4 spillere (niveau uafklaret; format 1/1; fastlagt af Christoffer) | 4 spillere (fastlagt af Christoffer) | 0 | 0 |
| 2021/2022 | U11 (ID 3) | 3 | under højeste format | 4 spillere (niveau uafklaret; format 3/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2021/2022 | U13 (ID 4) | 4 | under højeste format | 4 spillere (niveau uafklaret; format 2/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2021/2022 | U15 (ID 5) | 5 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2022/2023 | U09 (ID 2) | 1 | kun ét format findes | 4 spillere (niveau uafklaret; format 1/1; fastlagt af Christoffer) | 4 spillere (fastlagt af Christoffer) | 0 | 0 |
| 2022/2023 | U11 (ID 3) | 6 | under højeste format | 2+2 (niveau uafklaret; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2022/2023 | U13 (ID 4) | 3 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2022/2023 | U15 (ID 5) | 5 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2022/2023 | U17/U19 (ID 18) | 1 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2023/2024 | U09 (ID 2) | 2 | kun ét format findes | 4 spillere (niveau uafklaret; format 1/1; fastlagt af Christoffer) | 4 spillere (fastlagt af Christoffer) | 0 | 0 |
| 2023/2024 | U11 (ID 3) | 5 | under højeste format | 2+2 (niveau uafklaret; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2023/2024 | U13 (ID 4) | 4 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2023/2024 | U15 (ID 5) | 5 | under højeste format | 2+2 (niveau uafklaret; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2023/2024 | U17/U19 (ID 18) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2024/2025 | U09 (ID 2) | 2 | kun ét format findes | 4 spillere (D; format 1/1; fastlagt af Christoffer) | 4 spillere (fastlagt af Christoffer) | 0 | 0 |
| 2024/2025 | U11 (ID 3) | 5 | under højeste format | 4 spillere (C; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2024/2025 | U13 (ID 4) | 9 | under højeste format | 2+2 (A; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2024/2025 | U15 (ID 5) | 7 | under højeste format | 2+2 (B; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2024/2025 | U17/U19 (ID 18) | 1 | under højeste format | 4 spillere (D; format 3/5; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2025/2026 | U09 (ID 2) | 8 | kun ét format findes | 3 spillere (C; format foreløbig/1; foreløbig, ikke godkendt) | 3 spillere (foreløbig, ikke godkendt) | 0 | 0 |
| 2025/2026 | U11 (ID 3) | 5 | under højeste format | 4 spillere (D; format 3/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2025/2026 | U13 (ID 4) | 12 | under højeste format | 2+2 (A; format 2/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2025/2026 | U15 (ID 5) | 9 | under højeste format | 2+2 (A; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2025/2026 | U17/U19 (ID 18) | 3 | under højeste format | 2+2 (D; format 2/6; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U09 (ID 2) | 4 | aktivt GSB-hold, format uplaceret (kun de endnu spillede/kategoriserede puljer) | kun de endnu spillede/kategoriserede puljer | 3 spillere (foreløbig, ikke godkendt) | 4 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U11 (ID 3) | 5 | aktivt GSB-hold, format uplaceret (kun de endnu spillede/kategoriserede puljer) | kun de endnu spillede/kategoriserede puljer | ingen placerbart format | 5 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U13 (ID 4) | 10 | i højeste format (kun de endnu spillede/kategoriserede puljer) | 2+2 (B; format 1/2; fastlagt af Christoffer; kun de endnu spillede/kategoriserede puljer) | 2+2 (fastlagt af Christoffer) | 6 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U15 (ID 5) | 9 | kun ét format findes (kun de endnu spillede/kategoriserede puljer) | 2+2 (A; format 1/1; fastlagt af Christoffer; kun de endnu spillede/kategoriserede puljer) | 2+2 (fastlagt af Christoffer) | 7 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (ID 18) | 7 | under højeste format (kun de endnu spillede/kategoriserede puljer) | 2+2 (B; format 2/3; fastlagt af Christoffer; kun de endnu spillede/kategoriserede puljer) | 4+2 (fastlagt af Christoffer) | 5 | 0 |

### Alle GSB-hold/puljer

| Sæson | Alder | Råt holdnavn | Fysisk pulje | Række | Pulje/fase | Format | Rang | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2011/2012 | U11 (3) | Gladsaxe Søborg 4 *udgået* | 2011\|3\|100 | U11 Serie X2 | U11 Serie X2 | Uplaceret: X2 (ingen brugbar kategorisignatur) | Uplaceret | udgået |
| 2011/2012 | U11 (3) | Gladsaxe Søborg | 2011\|3\|97 | U11 2. Serie | U11 2. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2011/2012 | U11 (3) | Gladsaxe Søborg 2 | 2011\|3\|98 | U11 3. Serie | U11 3. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2011/2012 | U11 (3) | Gladsaxe Søborg 3 *udgået* | 2011\|3\|99 | U11 Serie X1 | U11 Serie X1 | Uplaceret: X1 (ingen brugbar kategorisignatur) | Uplaceret | udgået |
| 2011/2012 | U13 (4) | Gladsaxe Søborg | 2011\|4\|101 | U13 2. Serie | U13 2. erie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2011/2012 | U13 (4) | Gladsaxe Søborg 2 *udgået* | 2011\|4\|102 | U13 3. Serie | U13 3. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | Uplaceret | udgået |
| 2011/2012 | U13 (4) | Gladsaxe Søborg 3 | 2011\|4\|103 | U13 Serie X1 | U13 Serie X1 | Uplaceret: X1 (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2011/2012 | U13 (4) | Gladsaxe Søborg 4 *trukket* | 2011\|4\|104 | U13 Serie X2 | U13 Serie X2 | Uplaceret: X2 (ingen brugbar kategorisignatur) | Uplaceret | trukket |
| 2011/2012 | U15 (5) | Gladsaxe Søborg | 2011\|5\|106 | U15 3. Serie | U15 3. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2011/2012 | U15 (5) | Gladsaxe Søborg 2 | 2011\|5\|107 | U15 Serie X1 | U15 Serie X1 | Uplaceret: X1 (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2011/2012 | U15 (5) | Gladsaxe Søborg 3 | 2011\|5\|108 | U15 Serie X2 | U15 Serie X2 | Uplaceret: X2 (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2011/2012 | U17 (6) | Gladsaxe Søborg *udgået* | 2011\|6\|110 | U17 2. Serie | U17 2. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | Uplaceret | udgået |
| 2012/2013 | U11 (3) | Gladsaxe Søborg | 2012\|3\|1311 | U11 3. Serie | U11 3. Serie | Ikke-kanonisk signatur: S6/D3 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2012/2013 | U13 (4) | Gladsaxe Søborg | 2012\|4\|1318 | U13 3. Serie | U13 3. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2012/2013 | U13 (4) | Gladsaxe Søborg 2 trukket | 2012\|4\|1322 | U13 Serie X1 | U13 Serie X1 | X1 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format | trukket |
| 2012/2013 | U15 (5) | Gladsaxe Søborg 3 | 2012\|5\|1321 | U15 Serie X2 | U15 Serie X2 | X2 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2012/2013 | U15 (5) | Gladsaxe Søborg | 2012\|5\|1326 | U15 3. Serie | U15 3. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2012/2013 | U15 (5) | Gladsaxe Søborg 2 | 2012\|5\|1327 | U15 Serie X1 | U15 Serie X1 | X1 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2012/2013 | U17 (6) | Gladsaxe Søborg | 2012\|6\|1329 | U17 2. Serie | U17 2. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U11 (3) | Gladsaxe Søborg | 2013\|3\|2644 | U11 3. Serie | Pulje 1 | Ikke-kanonisk signatur: MD1/S4/D3 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U11 (3) | Gladsaxe Søborg 2 | 2013\|3\|2645 | U11 Serie X1 | Pulje 1 | X1 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U13 (4) | Gladsaxe Søborg | 2013\|4\|2681 | U13 3. serie | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U13 (4) | Gladsaxe Søborg 2 *Trukket | 2013\|4\|2682 | U13 Serie X1 | Pulje 1 | X1 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format | trukket |
| 2013/2014 | U15 (5) | Gladsaxe Søborg | 2013\|5\|2686 | U15 2. serie | Pulje 1 | Ikke-kanonisk signatur: MD1/S4/D3 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U15 (5) | Gladsaxe Søborg 2 | 2013\|5\|2688 | U15 Serie X1 | Pulje 1 | X1 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U15 (5) | Gladsaxe Søborg 3 | 2013\|5\|2690 | U15 Serie X3 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U17 (6) | Gladsaxe Søborg | 2013\|6\|2692 | U17 2. serie | Pulje 1 | Ikke-kanonisk signatur: MD1/S4/D3 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U17 (6) | Gladsaxe Søborg | 2013\|6\|2693 | U17 Serie X1 | Pulje 1 | X1 | foreløbig, ikke godkendt; niveau ikke tolket; plads — inden for format |  |
| 2014/2015 | U11 (3) | Gladsaxe Søborg | 2014\|3\|4253 | U11 serie X1 (4 spillere C) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2014/2015 | U11 (3) | Gladsaxe Søborg 2 | 2014\|3\|4254 | U11 serie X2 (4 spillere C) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2014/2015 | U13 (4) | Gladsaxe Søborg | 2014\|4\|4257 | U13 3.serie (4+2 M) | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2014/2015 | U13 (4) | Gladsaxe Søborg 2 | 2014\|4\|4260 | U13 serie X2 (4 spillere C) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2014/2015 | U15 (5) | Gladsaxe Søborg | 2014\|5\|4262 | U15 2.serie (4+2 M) | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2014/2015 | U15 (5) | Gladsaxe Søborg 2 | 2014\|5\|4264 | U15 serie X1 (4 spillere C) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2014/2015 | U17 (6) | Gladsaxe Søborg udgået | 2014\|6\|4266 | U17 2.serie (4+2 M) | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format | udgået |
| 2014/2015 | U17 (6) | Gladsaxe Søborg 2 udgået | 2014\|6\|4267 | U17 serie X1 (4 spillere C) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format | udgået |
| 2015/2016 | U11 (3) | Gladsaxe Søborg udgået | 2015\|3\|6083 | U11 B Række 4 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 3 inden for format | udgået |
| 2015/2016 | U11 (3) | Gladsaxe Søborg | 2015\|3\|6085 | U11 D Række 4 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D; plads 13 inden for format |  |
| 2015/2016 | U13 (4) | Gladsaxe Søborg | 2015\|4\|6089 | U13 B Række 4 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 10 inden for format |  |
| 2015/2016 | U13 (4) | Gladsaxe Søborg 2 | 2015\|4\|6091 | U13 D Række 4 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D; plads 27 inden for format |  |
| 2015/2016 | U15 (5) | Gladsaxe Søborg | 2015\|5\|6093 | U15 M Række 4+2 | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2015/2016 | U17 (6) | Gladsaxe Søborg udgået | 2015\|6\|6099 | U17 A Række 4+2 | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau A; plads 2 inden for format | udgået |
| 2016/2017 | U11 (3) | Gladsaxe Søborg | 2016\|3\|7668 | U11 D (4) P1 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D; plads 8 inden for format |  |
| 2016/2017 | U11 (3) | Gladsaxe Søborg | 2016\|3\|9137 | Slutspil U11 D (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D; plads 7 inden for format |  |
| 2016/2017 | U13 (4) | Gladsaxe Søborg | 2016\|4\|7692 | U13 C (4) P2 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C; plads 11 inden for format |  |
| 2016/2017 | U15 (5) | Gladsaxe Søborg | 2016\|5\|7677 | U15 A (4+2) | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau A; plads 1 inden for format |  |
| 2016/2017 | U15 (5) | Gladsaxe Søborg 2 | 2016\|5\|7679 | U15 B (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 4 inden for format |  |
| 2016/2017 | U17 (6) | Gladsaxe Søborg | 2016\|6\|7685 | U17/U19 B (4) P2 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 4 inden for format |  |
| 2017/2018 | U11 (3) | Gladsaxe Søborg | 2017\|3\|9302 | U11 D (4) P2 | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D; plads 7 inden for format |  |
| 2017/2018 | U13 (4) | Gladsaxe Søborg | 2017\|4\|9291 | U13 B (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 3 inden for format |  |
| 2017/2018 | U13 (4) | Gladsaxe Søborg 2 | 2017\|4\|9296 | U13 C (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C; plads 6 inden for format |  |
| 2017/2018 | U15 (5) | Gladsaxe Søborg 2 | 2017\|5\|9290 | U15 B (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 4 inden for format |  |
| 2017/2018 | U15 (5) | Gladsaxe Søborg 1 | 2017\|5\|9595 | U15 M 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2017/2018 | U17/U19 (18) | Gladsaxe Søborg 2 udgået | 2017\|18\|9288 | U17/19 B (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 3 inden for format | udgået |
| 2017/2018 | U17/U19 (18) | Gladsaxe Søborg 1 | 2017\|18\|9592 | U17/U19 M/A 4+2 | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2018/2019 | U11 (3) | Gladsaxe Søborg 1 | 2018\|3\|11279 | U11 C 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C; plads 2 inden for format |  |
| 2018/2019 | U11 (3) | Gladsaxe Søborg 2 | 2018\|3\|11401 | U11 D 4 Spillere P2 | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D; plads 8 inden for format |  |
| 2018/2019 | U13 (4) | Gladsaxe Søborg 1 | 2018\|4\|11418 | U13 CD 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2018/2019 | U15 (5) | Gladsaxe Søborg 1 | 2018\|5\|11427 | U15 D 4 Spillere P2 | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D; plads 15 inden for format |  |
| 2018/2019 | U17/U19 (18) | Gladsaxe Søborg 1 | 2018\|18\|11355 | U17/19 M 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2018/2019 | U17/U19 (18) | Gladsaxe Søborg 2 | 2018\|18\|11771 | U17/U19 A 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau A; plads 4 inden for format |  |
| 2019/2020 | U11 (3) | Gladsaxe Søborg 1 | 2019\|3\|12798 | U11 - 3400 - 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2019/2020 | U13 (4) | Gladsaxe Søborg 1 | 2019\|4\|12792 | U13 - 3800 - 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2019/2020 | U13 (4) | Gladsaxe Søborg 2 | 2019\|4\|12794 | U13 - 3400 - 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2019/2020 | U15 (5) | Gladsaxe Søborg 1 | 2019\|5\|12784 | U15 - 6200 - 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U09 (2) | Gladsaxe Søborg 1 | 2020\|2\|13487 | U09 2500 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U09 (2) | Gladsaxe Søborg 2 | 2020\|2\|13487 | U09 2500 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U11 (3) | Gladsaxe Søborg 1 | 2020\|3\|13484 | U11 3000 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U11 (3) | Gladsaxe Søborg 2 | 2020\|3\|13485 | U11 3000 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U13 (4) | Gladsaxe Søborg 1 | 2020\|4\|13477 | U13 3800 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U13 (4) | Gladsaxe Søborg 2 | 2020\|4\|13480 | U13 3400 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U15 (5) | Gladsaxe Søborg 1 | 2020\|5\|13470 | U15 6400 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U15 (5) | Gladsaxe Søborg 2 | 2020\|5\|13473 | U15 4200 4 Spillere P2 | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2020/2021 | U15 (5) | Gladsaxe Søborg 3 | 2020\|5\|13474 | U15 3800 4 Piger | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U09 (2) | Gladsaxe Søborg 1 | 2021\|2\|14136 | U09 2700 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U11 (3) | Gladsaxe Søborg 1 | 2021\|3\|14138 | U11 3100 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U11 (3) | Gladsaxe Søborg 2 | 2021\|3\|14139 | U11 3100 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U11 (3) | Gladsaxe Søborg 3 | 2021\|3\|14140 | U11 3100 4 Spillere | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U13 (4) | Gladsaxe Søborg 4 | 2021\|4\|14069 | U13 - 3500 (4 piger) | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U13 (4) | Gladsaxe Søborg 3 | 2021\|4\|14142 | U13 3500 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U13 (4) | Gladsaxe Søborg 2 | 2021\|4\|14143 | U13 3500 4 Spillere | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U13 (4) | Gladsaxe Søborg 1 | 2021\|4\|14147 | U13 5200 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U15 (5) | Gladsaxe Søborg 5 | 2021\|5\|14071 | U15 - 3500 (4 piger) | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U15 (5) | Gladsaxe Søborg 4 | 2021\|5\|14080 | U15 4300 4 Piger | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U15 (5) | Gladsaxe Søborg 1 | 2021\|5\|14081 | U15 7600 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U15 (5) | Gladsaxe Søborg 3 | 2021\|5\|14155 | U15 4300 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2021/2022 | U15 (5) | Gladsaxe Søborg 2 | 2021\|5\|14157 | U15 4800 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U09 (2) | Gladsaxe Søborg 1 | 2022\|2\|14983 | U09 2800 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U11 (3) | Gladsaxe Søborg 1 | 2022\|3\|14960 | U11 - 2+2 | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U11 (3) | Gladsaxe Søborg 6 | 2022\|3\|14984 | U11 2800 4 Piger | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U11 (3) | Gladsaxe Søborg 4 | 2022\|3\|14985 | U11 3000 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U11 (3) | Gladsaxe Søborg 5 | 2022\|3\|14986 | U11 3000 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U11 (3) | Gladsaxe Søborg 3 | 2022\|3\|14987 | U11 3200 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U11 (3) | Gladsaxe Søborg 2 | 2022\|3\|14989 | U11 3600 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U13 (4) | Gladsaxe Søborg 3 | 2022\|4\|14991 | U13 3400 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U13 (4) | Gladsaxe Søborg 2 | 2022\|4\|14992 | U13 3400 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U13 (4) | Gladsaxe Søborg 1 | 2022\|4\|14996 | U13 4400 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U15 (5) | Gladsaxe Søborg 5 | 2022\|5\|14997 | U15 3400 4 Piger | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U15 (5) | Gladsaxe Søborg 4 | 2022\|5\|14999 | U15 4000 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U15 (5) | Gladsaxe Søborg 3 | 2022\|5\|15001 | U15 4800 4 Spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U15 (5) | Gladsaxe Søborg 2 | 2022\|5\|15002 | U15 5600 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U15 (5) | Gladsaxe Søborg 1 | 2022\|5\|15003 | U15 6400 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2022/2023 | U17/U19 (18) | Gladsaxe Søborg 1 | 2022\|18\|15334 | U17/U19 5200 4 Spillere pulje 1 - Ny | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U09 (2) | Gladsaxe Søborg 1 | 2023\|2\|16024 | U09 2400 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U09 (2) | Gladsaxe Søborg 2 | 2023\|2\|16024 | U09 2400 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U11 (3) | Gladsaxe Søborg 1 | 2023\|3\|15949 | U11 - 2+2 | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U11 (3) | Gladsaxe Søborg 4 | 2023\|3\|16026 | U11 - 2900 4 spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U11 (3) | Gladsaxe Søborg 2 | 2023\|3\|16030 | U11 - 3200 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U11 (3) | Gladsaxe Søborg 3 | 2023\|3\|16031 | U11 - 3200 4 spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U11 (3) | Gladsaxe Søborg 5 | 2023\|3\|16044 | U11 - 2800 (4 piger) | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U13 (4) | Gladsaxe Søborg 1 | 2023\|4\|15993 | U13 - 4400 (4 spillere) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U13 (4) | Gladsaxe Søborg 4 | 2023\|4\|16081 | U13 - 3600 4 piger | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U13 (4) | Gladsaxe Søborg 1 | 2023\|4\|16097 | U13 - 5000 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U13 (4) | Gladsaxe Søborg 3 | 2023\|4\|16099 | U13 - 3500 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U15 (5) | Gladsaxe Søborg 1 | 2023\|5\|15955 | U15 - 6600 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U15 (5) | Gladsaxe Søborg 2 | 2023\|5\|16091 | U15 - 4200 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U15 (5) | Gladsaxe Søborg 3 | 2023\|5\|16093 | U15 - 3800 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U15 (5) | Gladsaxe Søborg 4 | 2023\|5\|16094 | U15 - 3800 4 spillere | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U15 (5) | Gladsaxe Søborg 5 | 2023\|5\|16095 | U15 - 4000 4 piger | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U17/U19 (18) | Gladsaxe Søborg 1 | 2023\|18\|16087 | U17/U19 - 6600 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2023/2024 | U17/U19 (18) | Gladsaxe Søborg 2 | 2023\|18\|16088 | U17/U19 - 4800 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2024/2025 | U09 (2) | Gladsaxe Søborg 1 | 2024\|2\|17156 | U9 D 2800 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 2800; plads 4 inden for format |  |
| 2024/2025 | U09 (2) | Gladsaxe Søborg 2 | 2024\|2\|17157 | U9 D 2800 (4 spillere). | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 2800; plads 4 inden for format |  |
| 2024/2025 | U11 (3) | Gladsaxe Søborg 1 | 2024\|3\|17148 | U11 C 4000 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C / 4000; plads 2 inden for format |  |
| 2024/2025 | U11 (3) | Gladsaxe Søborg 5 | 2024\|3\|17151 | U11 D 2800 (4 piger). | Pulje 2 | 4 piger | fastlagt af Christoffer; niveau D / 2800; plads 1 inden for format |  |
| 2024/2025 | U11 (3) | Gladsaxe Søborg 2 | 2024\|3\|17152 | U11 D 3200 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 3200; plads 7 inden for format |  |
| 2024/2025 | U11 (3) | Gladsaxe Søborg 3 | 2024\|3\|17153 | U11 D 3200 (4 spillere). | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 3200; plads 7 inden for format |  |
| 2024/2025 | U11 (3) | Gladsaxe Søborg 4 | 2024\|3\|17154 | U11 D 3200 (4 spillere). | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau D / 3200; plads 7 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 1 | 2024\|4\|17002 | U13 A, 5600 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 5600; plads 1 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 9 | 2024\|4\|17015 | UGE 38 - U13 D, 3600 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 3600; plads 4 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 8 | 2024\|4\|17091 | U13 D, 3200 (4 piger) | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau D / 3200; plads 5 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 3 | 2024\|4\|17094 | U13 C, 4200 (4 spillere) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C / 4200; plads 8 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 2 | 2024\|4\|17117 | U13 B, 5000 (4 spillere) | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau B / 5000; plads 5 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 6 | 2024\|4\|17145 | U13 D 3600 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 3600; plads 12 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 4 | 2024\|4\|17146 | U13 D 3600 (4 spillere). | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 3600; plads 12 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 7 | 2024\|4\|17146 | U13 D 3600 (4 spillere). | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 3600; plads 12 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 5 | 2024\|4\|17147 | U13 D 3600 (4 spillere). | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau D / 3600; plads 12 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 7 | 2024\|5\|16998 | UGE 38 - U15 D, 4000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 4000; plads 4 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 1 | 2024\|5\|17006 | U15 B, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5400; plads 1 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 6 | 2024\|5\|17013 | UGE 38 - U15 C, 4600 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau C / 4600; plads 3 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 2 | 2024\|5\|17141 | U15 C 4800 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C / 4800; plads 12 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 3 | 2024\|5\|17143 | U15 D 4000 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4000; plads 17 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 4 | 2024\|5\|17143 | U15 D 4000 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4000; plads 17 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 5 | 2024\|5\|17143 | U15 D 4000 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4000; plads 17 inden for format |  |
| 2024/2025 | U17/U19 (18) | Gladsaxe Søborg 1 | 2024\|18\|17100 | U17/U19 D, 4600 (4 spillere) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4600; plads 12 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 2 | 2025\|2\|18127 | U09 D 3300 (3 spillere) BD | Pulje 1 | 3 spillere | foreløbig, ikke godkendt; niveau D / 3300; plads 3 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 3 | 2025\|2\|18128 | U09 D 3300 (3 spillere) BD | Pulje 2 | 3 spillere | foreløbig, ikke godkendt; niveau D / 3300; plads 3 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 1 | 2025\|2\|18129 | U09 C 3600 (3 spillere) BD | Pulje 1 | 3 spillere | foreløbig, ikke godkendt; niveau C / 3600; plads 1 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 1 | 2025\|2\|18504 | U09 C 3600 (3 spillere) BD (2. halvår) | Pulje 2 | 3 spillere | foreløbig, ikke godkendt; niveau C / 3600; plads 2 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 3 | 2025\|2\|18506 | U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 1 | 3 spillere | foreløbig, ikke godkendt; niveau D / 3300; plads 4 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 2 | 2025\|2\|18507 | U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 2 | 3 spillere | foreløbig, ikke godkendt; niveau D / 3300; plads 4 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 4 | 2025\|2\|18508 | U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 3 | 3 spillere | foreløbig, ikke godkendt; niveau D / 3300; plads 4 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 5 | 2025\|2\|18509 | U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 4 | 3 spillere | foreløbig, ikke godkendt; niveau D / 3300; plads 4 inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 5 | 2025\|3\|18133 | U11 4200 (4 piger) BD | Pulje 2 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 1 | 2025\|3\|18134 | U11 C-D 4800 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C-D / 4800; plads — inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 2 | 2025\|3\|18134 | U11 C-D 4800 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C-D / 4800; plads — inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 3 | 2025\|3\|18135 | U11 D 4600 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4600; plads 7 inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 4 | 2025\|3\|18138 | U11 D 4600 (4 spillere) BD | Pulje 4 | 4 spillere | fastlagt af Christoffer; niveau D / 4600; plads 7 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 7 | 2025\|4\|17982 | Uge 38 - U13 A, 6000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6000; plads 3 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 8 | 2025\|4\|17985 | Uge 38 - U13 B, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5400; plads 5 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 1 | 2025\|4\|17987 | U13 A, 6000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6000; plads 1 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 9 | 2025\|4\|17988 | Uge 38 - U13 C, 5000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau C / 5000; plads 6 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 10 | 2025\|4\|17989 | Uge 38 - U13 D, 4800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 4800; plads 8 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 2 | 2025\|4\|17993 | U13 B, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5400; plads 4 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 3 | 2025\|4\|18139 | U13 C 5300 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C / 5300; plads 6 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 8 | 2025\|4\|18141 | U13 D 4400 (4 piger) BD | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau D / 4400; plads 4 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 4 | 2025\|4\|18142 | U13 D 4800 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4800; plads 11 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 7 | 2025\|4\|18142 | U13 D 4800 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4800; plads 11 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 5 | 2025\|4\|18143 | U13 D 4800 (4 spillere) BD | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 4800; plads 11 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 6 | 2025\|4\|18144 | U13 D 4800 (4 spillere) BD | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau D / 4800; plads 11 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 3 | 2025\|5\|17978 | U15 C, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau C / 5400; plads 6 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 6 | 2025\|5\|17991 | Uge 38 - U15 A, 6800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6800; plads 3 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 8 | 2025\|5\|17996 | Uge 38 - U15 C, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau C / 5400; plads 7 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 1 | 2025\|5\|18002 | U15 A, 6800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6800; plads 1 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 7 | 2025\|5\|18119 | U15 D, 4600 (4 piger) | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau D / 4600; plads 3 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 2 | 2025\|5\|18145 | U15 B 6400 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B / 6400; plads 3 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 4 | 2025\|5\|18148 | U15 C-D 5200 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C-D / 5200; plads — inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 5 | 2025\|5\|18149 | U15 D 5000 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 5000; plads 12 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 6 | 2025\|5\|18150 | U15 D 5000 (4 spillere) BD | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 5000; plads 12 inden for format |  |
| 2025/2026 | U17/U19 (18) | Gladsaxe Søborg 3 | 2025\|18\|17999 | Uge 38 - U17/U19 D, 5000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 5000; plads 6 inden for format |  |
| 2025/2026 | U17/U19 (18) | Gladsaxe Søborg 2 | 2025\|18\|18122 | U17/U19 D, 5200 (4 spillere) | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau D / 5200; plads 11 inden for format |  |
| 2025/2026 | U17/U19 (18) | Gladsaxe Søborg 1 | 2025\|18\|18154 | C-D 5600 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | Gladsaxe Søborg 3 | 2026\|2\|19114 | U9 Dx, 3000 (3 spillere) BD | Pulje 1 | Uplaceret: 3 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | Gladsaxe Søborg 4 | 2026\|2\|19114 | U9 Dx, 3000 (3 spillere) BD | Pulje 1 | Uplaceret: 3 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | Gladsaxe Søborg 1 | 2026\|2\|19115 | U09 D 3300 (3 spillere) BD | Pulje 1 | Uplaceret: 3 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | Gladsaxe Søborg 2 | 2026\|2\|19115 | U09 D 3300 (3 spillere) BD | Pulje 1 | Uplaceret: 3 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | Gladsaxe Søborg 1 | 2026\|3\|19124 | U11 B, 5600 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | Gladsaxe Søborg 2 | 2026\|3\|19126 | U11 C-D, 4700 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | Gladsaxe Søborg 3 | 2026\|3\|19133 | U11 Dx, 4200 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | Gladsaxe Søborg 4 | 2026\|3\|19133 | U11 Dx, 4200 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | Gladsaxe Søborg 5 | 2026\|3\|19135 | U11 D, 4200 (4 piger) BD | Pulje 1 | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 1 | 2026\|4\|18976 | U13 B, 5200 (2+2) | Pulje 1 | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 5 | 2026\|4\|18977 | UGE 38 - U13 D, 4600 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 4600; plads 3 inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 4 | 2026\|4\|19007 | UGE 38 - U13 B, 5200 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5200; plads 2 inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 3 | 2026\|4\|19008 | UGE 38 - U13 B, 5200 (2+2) | Pulje 2 | 2+2 | fastlagt af Christoffer; niveau B / 5200; plads 2 inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 3 | 2026\|4\|19009 | UGE 38 - U13 B, 5200 (2+2) | Finale | 2+2 | fastlagt af Christoffer; niveau B / 5200; plads 2 inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 2 | 2026\|4\|19140 | U13 B, 5600 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 3 | 2026\|4\|19142 | U13 C-D, 4800 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 4 | 2026\|4\|19144 | U13 Dx, 4400 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 5 | 2026\|4\|19144 | U13 Dx, 4400 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 6 | 2026\|4\|19146 | U13 D, 4400 (4 piger) BD | Pulje 1 | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 1 | 2026\|5\|18984 | UGE 38 - U15 A, 6800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6800; plads 1 inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 2 | 2026\|5\|18987 | UGE 38 - U15 B, 5800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5800; plads 2 inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 6 | 2026\|5\|19088 | U15 Dx, 4600 (4 spillere) | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 7 | 2026\|5\|19100 | U15 C, 4900 (4 piger) | Pulje 1 | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 1 | 2026\|5\|19106 | U15 A, 7200 (4 spillere) | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 2 | 2026\|5\|19117 | U15 B, 6200 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 3 | 2026\|5\|19117 | U15 B, 6200 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 4 | 2026\|5\|19118 | U15 C-D, 5100 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 5 | 2026\|5\|19119 | U15 D, 4800 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 1 | 2026\|18\|18991 | U17/U19 B, 6800 (2+2) | Pulje 2 | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 2 | 2026\|18\|18994 | UGE 38 - U17/U19 B, 6800 (2+2) | Pulje 2 | 2+2 | fastlagt af Christoffer; niveau B / 6800; plads 2 inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg | 2026\|18\|18995 | UGE 38 - U17/U19 B, 6800 (2+2) | Finale | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 3 | 2026\|18\|18996 | UGE 38 - U17/U19 D, 5000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 5000; plads 5 inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 2 | 2026\|18\|19122 | U17/U19 C-D, 5500 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 3 | 2026\|18\|19122 | U17/U19 C-D, 5500 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 4 | 2026\|18\|19123 | U17/U19 D, 4800 (4 piger) BD | Pulje 1 | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | Uplaceret |  |

### DMU separat

DMU-poster tæller ikke i lokal formatplacering eller region 8-bredde. Unikke GSB-hold deduplikeres inden for sæson/aldersgruppe på råt holdnavn; et hold der også optræder lokalt tælles én gang som hold, men hver DMU-puljepost står stadig på denne separate liste. I alt: **62 DMU-poster**, **34 unikke sæson/aldersgruppe/hold-identiteter**.

| Sæson | Alder | GSB-hold | Format | Niveau | DMU-poster | DMU-puljenøgler | Også lokal række |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2016/2017 | U11 (3) | Gladsaxe Søborg 1 | 4 spillere | D | 2 | 2016\|3\|8987; 2016\|3\|8997 | nej |
| 2016/2017 | U15 (5) | Gladsaxe Søborg 1 | 4+2 | A | 1 | 2016\|5\|8905 | nej |
| 2016/2017 | U17/U19 (18) | Gladsaxe Søborg 1 | 4 spillere | B | 2 | 2016\|18\|8918; 2016\|18\|9019 | nej |
| 2017/2018 | U15 (5) | Gladsaxe Søborg 1 | 4 spillere | niveau ikke tolket | 2 | 2017\|5\|10543; 2017\|5\|10548 | ja (samme rånavn lokal række) |
| 2021/2022 | U09 (2) | Gladsaxe Søborg 1 | 4 spillere | niveau ikke tolket | 2 | 2021\|2\|14556; 2021\|2\|14558 | ja (samme rånavn lokal række) |
| 2021/2022 | U13 (4) | Gladsaxe Søborg 1 | 4 spillere | niveau ikke tolket | 3 | 2021\|4\|14731; 2021\|4\|14735; 2021\|4\|14737 | ja (samme rånavn lokal række) |
| 2022/2023 | U11 (3) | Gladsaxe Søborg 1 | 4 spillere | niveau ikke tolket | 1 | 2022\|3\|15528 | ja (samme rånavn lokal række) |
| 2022/2023 | U11 (3) | Gladsaxe Søborg 2 | 4 spillere | niveau ikke tolket | 2 | 2022\|3\|15538; 2022\|3\|15579 | ja (samme rånavn lokal række) |
| 2022/2023 | U13 (4) | Gladsaxe Søborg 2 | 4 spillere | niveau ikke tolket | 3 | 2022\|4\|15698; 2022\|4\|15710; 2022\|4\|15721 | ja (samme rånavn lokal række) |
| 2022/2023 | U15 (5) | Gladsaxe Søborg 1 | 4 spillere | niveau ikke tolket | 3 | 2022\|5\|15620; 2022\|5\|15629; 2022\|5\|15791 | ja (samme rånavn lokal række) |
| 2022/2023 | U17/U19 (18) | Gladsaxe Søborg 1 | 4 spillere | niveau ikke tolket | 2 | 2022\|18\|15662; 2022\|18\|15670 | ja (samme rånavn lokal række) |
| 2023/2024 | U11 (3) | Gladsaxe Søborg 1 | 2+2 | niveau ikke tolket | 1 | 2023\|3\|16527 | ja (samme rånavn lokal række) |
| 2023/2024 | U11 (3) | Gladsaxe Søborg 2 | 4 spillere | niveau ikke tolket | 3 | 2023\|3\|16534; 2023\|3\|16677; 2023\|3\|16680 | ja (samme rånavn lokal række) |
| 2023/2024 | U11 (3) | Gladsaxe Søborg 3 | 4 piger | niveau ikke tolket | 1 | 2023\|3\|16544 | ja (samme rånavn lokal række) |
| 2023/2024 | U17/U19 (18) | Gladsaxe Søborg 1 | 4 spillere | niveau ikke tolket | 2 | 2023\|18\|16610; 2023\|18\|16654 | ja (samme rånavn lokal række) |
| 2024/2025 | U09 (2) | Gladsaxe Søborg 1 | 4 spillere | D / 2800 | 2 | 2024\|2\|17590; 2024\|2\|17650 | ja (samme rånavn lokal række) |
| 2024/2025 | U11 (3) | Gladsaxe Søborg 2 | 4 piger | D / 2800 | 1 | 2024\|3\|17631 | ja (samme rånavn lokal række) |
| 2024/2025 | U11 (3) | Gladsaxe Søborg 1 | 4 spillere | C / 4000 | 1 | 2024\|3\|17809 | ja (samme rånavn lokal række) |
| 2024/2025 | U11 (3) | Gladsaxe Søborg | 4 spillere | C / 4000 | 2 | 2024\|3\|17813; 2024\|3\|17849 | nej |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 1 | 2+2 | A / 5600 | 1 | 2024\|4\|17632 | ja (samme rånavn lokal række) |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 2 | 4 spillere | B / 5000 | 2 | 2024\|4\|17635; 2024\|4\|17674 | ja (samme rånavn lokal række) |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 3 | 4 spillere | C / 4200 | 2 | 2024\|4\|17636; 2024\|4\|17677 | ja (samme rånavn lokal række) |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 1 | 3 spillere | niveau ikke tolket | 1 | 2025\|2\|18733 | ja (samme rånavn lokal række) |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 2 | 3 spillere | niveau ikke tolket | 1 | 2025\|2\|18733 | ja (samme rånavn lokal række) |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 3 | 3 spillere | niveau ikke tolket | 1 | 2025\|2\|18733 | ja (samme rånavn lokal række) |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 1 | 4 spillere | C-D / 4800 | 2 | 2025\|3\|18583; 2025\|3\|18697 | ja (samme rånavn lokal række) |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 4 | 2+2 | A / 6000 | 2 | 2025\|4\|18593; 2025\|4\|18748 | ja (samme rånavn lokal række) |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 5 (2+2 B) | 2+2 | A / 6000 | 1 | 2025\|4\|18594 | nej |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 1 | 4 spillere | C-D / 5000 | 2 | 2025\|4\|18604; 2025\|4\|18702 | ja (samme rånavn lokal række) |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 2 | 4 spillere | D / 4800 | 3 | 2025\|4\|18610; 2025\|4\|18735; 2025\|4\|18739 | ja (samme rånavn lokal række) |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 3 | 4 spillere | D / 4800 | 2 | 2025\|4\|18611; 2025\|4\|18740 | ja (samme rånavn lokal række) |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 2 | 4 spillere | C-D / 5200 | 2 | 2025\|5\|18623; 2025\|5\|18716 | ja (samme rånavn lokal række) |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 1 | 4 spillere | B / 6400 | 2 | 2025\|5\|18632; 2025\|5\|18708 | ja (samme rånavn lokal række) |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 3 | 2+2 | C / 5400 | 2 | 2025\|5\|18762; 2025\|5\|18763 | ja (samme rånavn lokal række) |

### Klubber i højeste format — normaliseret navn og rå holdnavne

| Sæson | Alder | Højeste format | Normaliseret klubenhed | Rå holdnavne |
| --- | --- | --- | --- | --- |
| 2011/2012 | U11 (3) | 4+3 | Greve | Greve 1; Greve 1 *alders disp. |
| 2011/2012 | U11 (3) | 4+3 | Horsens | Horsens |
| 2011/2012 | U11 (3) | 4+3 | Højbjerg | Højbjerg |
| 2011/2012 | U11 (3) | 4+3 | Kolding BK | Kolding BK |
| 2011/2012 | U11 (3) | 4+3 | Roskilde HBK | Roskilde HBK 1 |
| 2011/2012 | U11 (3) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2011/2012 | U11 (3) | 4+3 | Taastrup Elite | Taastrup Elite 1 |
| 2011/2012 | U11 (3) | 4+3 | Værløse | Værløse 1 |
| 2011/2012 | U11 (3) | 4+3 | Aarhus AB | Aarhus AB |
| 2011/2012 | U13 (4) | 4+3 | abc Aalborg | abc Aalborg |
| 2011/2012 | U13 (4) | 4+3 | Blans Sundeved | Blans Sundeved |
| 2011/2012 | U13 (4) | 4+3 | Greve | Greve 1 |
| 2011/2012 | U13 (4) | 4+3 | Herlufsholm | Herlufsholm 1 |
| 2011/2012 | U13 (4) | 4+3 | Hillerød | Hillerød 1 |
| 2011/2012 | U13 (4) | 4+3 | Kolding BK | Kolding BK |
| 2011/2012 | U13 (4) | 4+3 | Lillerød | Lillerød 1 |
| 2011/2012 | U13 (4) | 4+3 | Middelfart | Middelfart |
| 2011/2012 | U13 (4) | 4+3 | Roskilde HBK | Roskilde HBK 1 |
| 2011/2012 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2011/2012 | U13 (4) | 4+3 | St. Restrup | St. Restrup |
| 2011/2012 | U13 (4) | 4+3 | Team Fyn | Team Fyn |
| 2011/2012 | U13 (4) | 4+3 | Aarhus AB | Aarhus AB |
| 2011/2012 | U15 (5) | 4+3 | abc Aalborg | abc Aalborg |
| 2011/2012 | U15 (5) | 4+3 | Erritsø | Erritsø |
| 2011/2012 | U15 (5) | 4+3 | Greve | Greve 1; Greve 2 |
| 2011/2012 | U15 (5) | 4+3 | Herning | Herning |
| 2011/2012 | U15 (5) | 4+3 | Hillerød | Hillerød 1 |
| 2011/2012 | U15 (5) | 4+3 | Holbæk | Holbæk 1 |
| 2011/2012 | U15 (5) | 4+3 | Horsens | Horsens |
| 2011/2012 | U15 (5) | 4+3 | Kolding BK | Kolding BK |
| 2011/2012 | U15 (5) | 4+3 | Lillerød | Lillerød 1 |
| 2011/2012 | U15 (5) | 4+3 | Odense OBK | Odense OBK |
| 2011/2012 | U15 (5) | 4+3 | Roskilde HBK | Roskilde HBK 1 |
| 2011/2012 | U15 (5) | 4+3 | Slagelse | Slagelse 1 |
| 2011/2012 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2011/2012 | U15 (5) | 4+3 | Taastrup TIK | Taastrup TIK 1 |
| 2011/2012 | U15 (5) | 4+3 | Viby J | Viby J |
| 2011/2012 | U15 (5) | 4+3 | Værløse | Værløse 1 |
| 2011/2012 | U15 (5) | 4+3 | Aalborg Triton | Aalborg Triton |
| 2011/2012 | U15 (5) | 4+3 | Aarhus AB | Aarhus AB |
| 2011/2012 | U17 (6) | 4+3 | abc Aalborg | abc Aalborg UDG&#197;ET |
| 2011/2012 | U17 (6) | 4+3 | Greve | Greve 1 |
| 2011/2012 | U17 (6) | 4+3 | Grindsted BK | Grindsted BK |
| 2011/2012 | U17 (6) | 4+3 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole |
| 2011/2012 | U17 (6) | 4+3 | Holbæk | Holbæk 1 |
| 2011/2012 | U17 (6) | 4+3 | Højbjerg | Højbjerg |
| 2011/2012 | U17 (6) | 4+3 | Ikast | Ikast |
| 2011/2012 | U17 (6) | 4+3 | Kolding BK | Kolding BK |
| 2011/2012 | U17 (6) | 4+3 | Lillerød | Lillerød 1; Lillerød 2 |
| 2011/2012 | U17 (6) | 4+3 | Odense OBK | Odense OBK |
| 2011/2012 | U17 (6) | 4+3 | Roskilde HBK | Roskilde HBK 1 |
| 2011/2012 | U17 (6) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2011/2012 | U17 (6) | 4+3 | Sportsefterskolen SINE | Sportsefterskolen SINE |
| 2011/2012 | U17 (6) | 4+3 | Aarhus AB | Aarhus AB |
| 2012/2013 | U11 (3) | 4+3 | Greve | Greve |
| 2012/2013 | U11 (3) | 4+3 | Højbjerg | Højbjerg 1; Højbjerg 2 |
| 2012/2013 | U11 (3) | 4+3 | Kolding BK | Kolding BK |
| 2012/2013 | U11 (3) | 4+3 | Lillerød | Lillerød |
| 2012/2013 | U11 (3) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 2 |
| 2012/2013 | U11 (3) | 4+3 | Værløse | Værløse |
| 2012/2013 | U11 (3) | 4+3 | Ølstykke | &#216;lstykke |
| 2012/2013 | U11 (3) | 4+3 | Aarhus AB | Aarhus AB |
| 2012/2013 | U13 (4) | 4+3 | abc Aalborg | abc Aalborg |
| 2012/2013 | U13 (4) | 4+3 | Bornholm. | Bornholm. |
| 2012/2013 | U13 (4) | 4+3 | Gentofte | Gentofte |
| 2012/2013 | U13 (4) | 4+3 | Greve | Greve |
| 2012/2013 | U13 (4) | 4+3 | Holbæk | Holbæk |
| 2012/2013 | U13 (4) | 4+3 | Horsens | Horsens |
| 2012/2013 | U13 (4) | 4+3 | Højbjerg | Højbjerg |
| 2012/2013 | U13 (4) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2012/2013 | U13 (4) | 4+3 | KMB2010 | KMB2010 |
| 2012/2013 | U13 (4) | 4+3 | Kolding BK | Kolding BK |
| 2012/2013 | U13 (4) | 4+3 | Lillerød | Lillerød |
| 2012/2013 | U13 (4) | 4+3 | Lyngby | Lyngby |
| 2012/2013 | U13 (4) | 4+3 | Middelfart | Middelfart |
| 2012/2013 | U13 (4) | 4+3 | Roskilde HBK | Roskilde HBK |
| 2012/2013 | U13 (4) | 4+3 | Skovshoved | Skovshoved |
| 2012/2013 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand |
| 2012/2013 | U13 (4) | 4+3 | Viby J | Viby J |
| 2012/2013 | U13 (4) | 4+3 | Aarhus AB | Aarhus AB |
| 2012/2013 | U15 (5) | 4+3 | abc Aalborg | abc Aalborg |
| 2012/2013 | U15 (5) | 4+3 | Bornholm. | Bornholm. |
| 2012/2013 | U15 (5) | 4+3 | Dalum Hjallese BK | Dalum Hjallese BK |
| 2012/2013 | U15 (5) | 4+3 | Gentofte | Gentofte |
| 2012/2013 | U15 (5) | 4+3 | Greve | Greve |
| 2012/2013 | U15 (5) | 4+3 | Herning | Herning |
| 2012/2013 | U15 (5) | 4+3 | Hillerød | Hillerød |
| 2012/2013 | U15 (5) | 4+3 | Holbæk | Holbæk |
| 2012/2013 | U15 (5) | 4+3 | Horsens | Horsens |
| 2012/2013 | U15 (5) | 4+3 | Hvidovre | Hvidovre |
| 2012/2013 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2012/2013 | U15 (5) | 4+3 | KMB2010 | KMB2010 |
| 2012/2013 | U15 (5) | 4+3 | Kolding BK | Kolding BK |
| 2012/2013 | U15 (5) | 4+3 | Lillerød | Lillerød |
| 2012/2013 | U15 (5) | 4+3 | Lyngby | Lyngby |
| 2012/2013 | U15 (5) | 4+3 | Middelfart | Middelfart |
| 2012/2013 | U15 (5) | 4+3 | Nr. Lyndelse | Nr. Lyndelse |
| 2012/2013 | U15 (5) | 4+3 | Odense OBK | Odense OBK |
| 2012/2013 | U15 (5) | 4+3 | Roskilde HBK | Roskilde HBK |
| 2012/2013 | U15 (5) | 4+3 | Skovshoved | Skovshoved |
| 2012/2013 | U15 (5) | 4+3 | Slagelse | Slagelse |
| 2012/2013 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand |
| 2012/2013 | U15 (5) | 4+3 | Taastrup TIK | Taastrup TIK |
| 2012/2013 | U15 (5) | 4+3 | Viby J | Viby J |
| 2012/2013 | U15 (5) | 4+3 | Værløse | Værløse |
| 2012/2013 | U15 (5) | 4+3 | Aabenraa | Aabenraa |
| 2012/2013 | U15 (5) | 4+3 | Aarhus AB | Aarhus AB |
| 2012/2013 | U17 (6) | 4+3 | abc Aalborg | abc Aalborg |
| 2012/2013 | U17 (6) | 4+3 | Badminton Esbjerg | Badminton Esbjerg |
| 2012/2013 | U17 (6) | 4+3 | Bornholm. | Bornholm. |
| 2012/2013 | U17 (6) | 4+3 | Charlottenlund | Charlottenlund |
| 2012/2013 | U17 (6) | 4+3 | Gentofte | Gentofte |
| 2012/2013 | U17 (6) | 4+3 | Greve | Greve |
| 2012/2013 | U17 (6) | 4+3 | Holbæk | Holbæk |
| 2012/2013 | U17 (6) | 4+3 | Horsens | Horsens |
| 2012/2013 | U17 (6) | 4+3 | Højbjerg | Højbjerg |
| 2012/2013 | U17 (6) | 4+3 | Ikast | Ikast |
| 2012/2013 | U17 (6) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2012/2013 | U17 (6) | 4+3 | KMB2010 | KMB2010 |
| 2012/2013 | U17 (6) | 4+3 | Kolding BK | Kolding BK |
| 2012/2013 | U17 (6) | 4+3 | Lillerød | Lillerød |
| 2012/2013 | U17 (6) | 4+3 | Odense OBK | Odense OBK |
| 2012/2013 | U17 (6) | 4+3 | Roskilde HBK | Roskilde HBK |
| 2012/2013 | U17 (6) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 2 |
| 2012/2013 | U17 (6) | 4+3 | Taastrup Elite | Taastrup Elite |
| 2012/2013 | U17 (6) | 4+3 | Værløse | Værløse |
| 2012/2013 | U17 (6) | 4+3 | Aarhus AB | Aarhus AB |
| 2013/2014 | U11 (3) | 4+3 | Greve | Greve |
| 2013/2014 | U11 (3) | 4+3 | Holbæk | Holbæk |
| 2013/2014 | U11 (3) | 4+3 | Horsens | Horsens |
| 2013/2014 | U11 (3) | 4+3 | Hvidovre | Hvidovre |
| 2013/2014 | U11 (3) | 4+3 | Højbjerg | Højbjerg |
| 2013/2014 | U11 (3) | 4+3 | Kolding BK | Kolding BK |
| 2013/2014 | U11 (3) | 4+3 | Lillerød | Lillerød |
| 2013/2014 | U11 (3) | 4+3 | Lyngby | Lyngby |
| 2013/2014 | U11 (3) | 4+3 | SBS | SBS |
| 2013/2014 | U11 (3) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 2 |
| 2013/2014 | U11 (3) | 4+3 | Viby J | Viby J |
| 2013/2014 | U13 (4) | 4+3 | abc Aalborg | abc Aalborg |
| 2013/2014 | U13 (4) | 4+3 | Brønderslev | Brønderslev |
| 2013/2014 | U13 (4) | 4+3 | Gentofte | Gentofte |
| 2013/2014 | U13 (4) | 4+3 | Greve | Greve |
| 2013/2014 | U13 (4) | 4+3 | Horsens | Horsens |
| 2013/2014 | U13 (4) | 4+3 | Højbjerg | Højbjerg; Højbjerg 1; Højbjerg 2; Højbjerg 3 |
| 2013/2014 | U13 (4) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2013/2014 | U13 (4) | 4+3 | KMB2010 | KMB2010 |
| 2013/2014 | U13 (4) | 4+3 | Kolding BK | Kolding BK; Kolding BK 1; Kolding BK 2 |
| 2013/2014 | U13 (4) | 4+3 | Lillerød | Lillerød |
| 2013/2014 | U13 (4) | 4+3 | Lyngby | Lyngby |
| 2013/2014 | U13 (4) | 4+3 | Middelfart | Middelfart |
| 2013/2014 | U13 (4) | 4+3 | Måløv | Måløv |
| 2013/2014 | U13 (4) | 4+3 | Odense OBK | Odense OBK |
| 2013/2014 | U13 (4) | 4+3 | Skovshoved | Skovshoved |
| 2013/2014 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand |
| 2013/2014 | U13 (4) | 4+3 | Taastrup Elite | Taastrup Elite |
| 2013/2014 | U13 (4) | 4+3 | Viby J | Viby J |
| 2013/2014 | U13 (4) | 4+3 | Værløse | Værløse |
| 2013/2014 | U15 (5) | 4+3 | abc Aalborg | abc Aalborg; abc Aalborg 1; abc Aalborg 2 |
| 2013/2014 | U15 (5) | 4+3 | Badminton Roskilde | Badminton Roskilde |
| 2013/2014 | U15 (5) | 4+3 | Dalum Hjallese BK | Dalum Hjallese BK |
| 2013/2014 | U15 (5) | 4+3 | Gentofte | Gentofte |
| 2013/2014 | U15 (5) | 4+3 | Greve | Greve; Greve 2 |
| 2013/2014 | U15 (5) | 4+3 | Herlufsholm | Herlufsholm |
| 2013/2014 | U15 (5) | 4+3 | Horsens | Horsens |
| 2013/2014 | U15 (5) | 4+3 | Højbjerg | Højbjerg; Højbjerg 1; Højbjerg 2 |
| 2013/2014 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2013/2014 | U15 (5) | 4+3 | Kolding BK | Kolding BK |
| 2013/2014 | U15 (5) | 4+3 | Lillerød | Lillerød; Lillerød 2 |
| 2013/2014 | U15 (5) | 4+3 | Lyngby | Lyngby |
| 2013/2014 | U15 (5) | 4+3 | Middelfart | Middelfart |
| 2013/2014 | U15 (5) | 4+3 | Odense OBK | Odense OBK |
| 2013/2014 | U15 (5) | 4+3 | Skovshoved | Skovshoved |
| 2013/2014 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand |
| 2013/2014 | U15 (5) | 4+3 | Team Sønderjylland | Team Sønderjylland |
| 2013/2014 | U15 (5) | 4+3 | Taastrup Elite | Taastrup Elite |
| 2013/2014 | U15 (5) | 4+3 | Viby J | Viby J |
| 2013/2014 | U15 (5) | 4+3 | Værløse | Værløse |
| 2013/2014 | U17 (6) | 4+3 | abc Aalborg | abc Aalborg |
| 2013/2014 | U17 (6) | 4+3 | Badminton Roskilde | Badminton Roskilde |
| 2013/2014 | U17 (6) | 4+3 | Gentofte | Gentofte |
| 2013/2014 | U17 (6) | 4+3 | Greve | Greve |
| 2013/2014 | U17 (6) | 4+3 | Herning | Herning |
| 2013/2014 | U17 (6) | 4+3 | Hillerød | Hillerød |
| 2013/2014 | U17 (6) | 4+3 | Holbæk | Holbæk |
| 2013/2014 | U17 (6) | 4+3 | Horsens | Horsens |
| 2013/2014 | U17 (6) | 4+3 | Ikast | Ikast |
| 2013/2014 | U17 (6) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2013/2014 | U17 (6) | 4+3 | Kolding BK | Kolding BK |
| 2013/2014 | U17 (6) | 4+3 | Lyngby | Lyngby |
| 2013/2014 | U17 (6) | 4+3 | Odense OBK | Odense OBK |
| 2013/2014 | U17 (6) | 4+3 | Slagelse | Slagelse |
| 2013/2014 | U17 (6) | 4+3 | Solrød Strand | Solrød Strand |
| 2013/2014 | U17 (6) | 4+3 | Sportsefterskolen SINE | Sportsefterskolen SINE |
| 2013/2014 | U17 (6) | 4+3 | Stidsholt IF | Stidsholt IF |
| 2013/2014 | U17 (6) | 4+3 | Taastrup TIK | Taastrup TIK |
| 2013/2014 | U17 (6) | 4+3 | Viby J | Viby J |
| 2013/2014 | U17 (6) | 4+3 | Værløse | Værløse |
| 2013/2014 | U17 (6) | 4+3 | Aalborg Triton | Aalborg Triton |
| 2013/2014 | U17 (6) | 4+3 | Aarhus AB | Aarhus AB |
| 2014/2015 | U11 (3) | 4+3 | abc Aalborg | abc Aalborg |
| 2014/2015 | U11 (3) | 4+3 | Dybbøl | Dybbøl |
| 2014/2015 | U11 (3) | 4+3 | Greve | Greve; Greve 1 |
| 2014/2015 | U11 (3) | 4+3 | Hvidovre | Hvidovre |
| 2014/2015 | U11 (3) | 4+3 | Højbjerg | Højbjerg; Højbjerg 1; Højbjerg 2 |
| 2014/2015 | U11 (3) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2014/2015 | U11 (3) | 4+3 | Kolding BK | Kolding BK |
| 2014/2015 | U11 (3) | 4+3 | Lyngby | Lyngby |
| 2014/2015 | U11 (3) | 4+3 | Næsby | Næsby |
| 2014/2015 | U11 (3) | 4+3 | Odense OBK | Odense OBK |
| 2014/2015 | U11 (3) | 4+3 | Skovshoved | Skovshoved |
| 2014/2015 | U11 (3) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2014/2015 | U11 (3) | 4+3 | Talent Team Nord | Talent Team Nord |
| 2014/2015 | U11 (3) | 4+3 | Værløse | Værløse; Værløse 1 |
| 2014/2015 | U13 (4) | 4+3 | Brønderslev | Brønderslev; Brønderslev 1 |
| 2014/2015 | U13 (4) | 4+3 | Gentofte | Gentofte |
| 2014/2015 | U13 (4) | 4+3 | Greve | Greve 1 |
| 2014/2015 | U13 (4) | 4+3 | Grindsted BK | Grindsted BK |
| 2014/2015 | U13 (4) | 4+3 | Hvidovre | Hvidovre |
| 2014/2015 | U13 (4) | 4+3 | Højbjerg | Højbjerg; Højbjerg 1; Højbjerg 2 |
| 2014/2015 | U13 (4) | 4+3 | Kolding BK | Kolding BK |
| 2014/2015 | U13 (4) | 4+3 | Lyngby | Lyngby |
| 2014/2015 | U13 (4) | 4+3 | Skovshoved | Skovshoved |
| 2014/2015 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2014/2015 | U13 (4) | 4+3 | Viby J | Viby J; Viby J 1 |
| 2014/2015 | U13 (4) | 4+3 | Værløse | Værløse |
| 2014/2015 | U13 (4) | 4+3 | Aars | Aars |
| 2014/2015 | U15 (5) | 4+3 | abc Aalborg | abc Aalborg |
| 2014/2015 | U15 (5) | 4+3 | Badminton Esbjerg | Badminton Esbjerg |
| 2014/2015 | U15 (5) | 4+3 | Badminton Roskilde | Badminton Roskilde 1 |
| 2014/2015 | U15 (5) | 4+3 | Gentofte | Gentofte |
| 2014/2015 | U15 (5) | 4+3 | Greve | Greve; Greve 1 |
| 2014/2015 | U15 (5) | 4+3 | Hjørring | Hjørring |
| 2014/2015 | U15 (5) | 4+3 | Højbjerg | Højbjerg; Højbjerg 1; Højbjerg 2 |
| 2014/2015 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2014/2015 | U15 (5) | 4+3 | KMB2010 | KMB2010 |
| 2014/2015 | U15 (5) | 4+3 | Kolding BK | Kolding BK; Kolding BK 1; Kolding BK 2 |
| 2014/2015 | U15 (5) | 4+3 | Lillerød | Lillerød; Lillerød 1; Lillerød 2 |
| 2014/2015 | U15 (5) | 4+3 | Lyngby | Lyngby |
| 2014/2015 | U15 (5) | 4+3 | Middelfart | Middelfart |
| 2014/2015 | U15 (5) | 4+3 | Odense OBK | Odense OBK |
| 2014/2015 | U15 (5) | 4+3 | Skovshoved | Skovshoved |
| 2014/2015 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1; Solrød Strand 2 |
| 2014/2015 | U15 (5) | 4+3 | Taastrup Elite | Taastrup Elite 1 |
| 2014/2015 | U15 (5) | 4+3 | Ukendt modstander | Ukendt modstander 1; Ukendt modstander 2 |
| 2014/2015 | U15 (5) | 4+3 | Viby J | Viby J; Viby J 1; Viby J 2 |
| 2014/2015 | U15 (5) | 4+3 | Værløse | Værløse; Værløse 1 |
| 2014/2015 | U17 (6) | 4+3 | Badminton Roskilde | Badminton Roskilde 1 |
| 2014/2015 | U17 (6) | 4+3 | Gentofte | Gentofte |
| 2014/2015 | U17 (6) | 4+3 | Greve | Greve; Greve 1 |
| 2014/2015 | U17 (6) | 4+3 | Herning | Herning |
| 2014/2015 | U17 (6) | 4+3 | Hillerød | Hillerød 1 |
| 2014/2015 | U17 (6) | 4+3 | Hvidovre | Hvidovre |
| 2014/2015 | U17 (6) | 4+3 | Højbjerg | Højbjerg |
| 2014/2015 | U17 (6) | 4+3 | Ikast | Ikast; Ikast 1; Ikast 2 |
| 2014/2015 | U17 (6) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2014/2015 | U17 (6) | 4+3 | Kolding BK | Kolding BK |
| 2014/2015 | U17 (6) | 4+3 | Lyngby | Lyngby |
| 2014/2015 | U17 (6) | 4+3 | Odense OBK | Odense OBK |
| 2014/2015 | U17 (6) | 4+3 | Randers BK | Randers BK |
| 2014/2015 | U17 (6) | 4+3 | Skovshoved | Skovshoved |
| 2014/2015 | U17 (6) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2014/2015 | U17 (6) | 4+3 | Sportsefterskolen SINE | Sportsefterskolen SINE |
| 2014/2015 | U17 (6) | 4+3 | Team Sønderjylland | Team Sønderjylland |
| 2014/2015 | U17 (6) | 4+3 | Viby J | Viby J |
| 2014/2015 | U17 (6) | 4+3 | Værløse | Værløse 1 |
| 2014/2015 | U17 (6) | 4+3 | Aarhus AB | Aarhus AB |
| 2015/2016 | U11 (3) | 4+3 | abc Aalborg | abc Aalborg |
| 2015/2016 | U11 (3) | 4+3 | Dragør | Dragør |
| 2015/2016 | U11 (3) | 4+3 | Drive | Drive |
| 2015/2016 | U11 (3) | 4+3 | Dybbøl | Dybbøl |
| 2015/2016 | U11 (3) | 4+3 | Hvidovre | Hvidovre |
| 2015/2016 | U11 (3) | 4+3 | Højbjerg | Højbjerg |
| 2015/2016 | U11 (3) | 4+3 | KBK Kbh. | KBK Kbh.; KBK Kbh. 2 |
| 2015/2016 | U11 (3) | 4+3 | Kolding BK | Kolding BK |
| 2015/2016 | U11 (3) | 4+3 | Lillerød | Lillerød |
| 2015/2016 | U11 (3) | 4+3 | Lyngby | Lyngby |
| 2015/2016 | U11 (3) | 4+3 | Middelfart | Middelfart |
| 2015/2016 | U11 (3) | 4+3 | NBK Amager | NBK Amager |
| 2015/2016 | U11 (3) | 4+3 | Odense OBK | Odense OBK |
| 2015/2016 | U11 (3) | 4+3 | Skovshoved | Skovshoved |
| 2015/2016 | U11 (3) | 4+3 | Solrød Strand | Solrød Strand |
| 2015/2016 | U13 (4) | 4+3 | Brønderslev | Brønderslev |
| 2015/2016 | U13 (4) | 4+3 | Dybbøl | Dybbøl |
| 2015/2016 | U13 (4) | 4+3 | Greve | Greve |
| 2015/2016 | U13 (4) | 4+3 | Hillerød | Hillerød |
| 2015/2016 | U13 (4) | 4+3 | Hvidovre | Hvidovre |
| 2015/2016 | U13 (4) | 4+3 | Højbjerg | Højbjerg |
| 2015/2016 | U13 (4) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2015/2016 | U13 (4) | 4+3 | Kolding BK | Kolding BK |
| 2015/2016 | U13 (4) | 4+3 | Lyngby | Lyngby |
| 2015/2016 | U13 (4) | 4+3 | Odense OBK | Odense OBK |
| 2015/2016 | U13 (4) | 4+3 | Skovshoved | Skovshoved |
| 2015/2016 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand |
| 2015/2016 | U13 (4) | 4+3 | Viby J | Viby J |
| 2015/2016 | U15 (5) | 4+3 | abc Aalborg | abc Aalborg 1 |
| 2015/2016 | U15 (5) | 4+3 | Hjørring | Hjørring; Hjørring 1 |
| 2015/2016 | U15 (5) | 4+3 | Højbjerg | Højbjerg |
| 2015/2016 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2015/2016 | U15 (5) | 4+3 | KMB2010 | KMB2010 |
| 2015/2016 | U15 (5) | 4+3 | Kolding BK | Kolding BK |
| 2015/2016 | U15 (5) | 4+3 | Lillerød | Lillerød |
| 2015/2016 | U15 (5) | 4+3 | Lyngby | Lyngby |
| 2015/2016 | U15 (5) | 4+3 | Skovshoved | Skovshoved |
| 2015/2016 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand |
| 2015/2016 | U15 (5) | 4+3 | Team Sønderjylland | Team Sønderjylland |
| 2015/2016 | U15 (5) | 4+3 | Viby J | Viby J |
| 2015/2016 | U15 (5) | 4+3 | Værløse | Værløse |
| 2015/2016 | U15 (5) | 4+3 | Aalborg Triton | Aalborg Triton; Aalborg Triton 1 |
| 2015/2016 | U15 (5) | 4+3 | Aars | Aars 1 |
| 2015/2016 | U17 (6) | 4+3 | abc Aalborg | abc Aalborg |
| 2015/2016 | U17 (6) | 4+3 | Gentofte | Gentofte |
| 2015/2016 | U17 (6) | 4+3 | Greve | Greve |
| 2015/2016 | U17 (6) | 4+3 | Ikast | Ikast |
| 2015/2016 | U17 (6) | 4+3 | Kolding BK | Kolding BK |
| 2015/2016 | U17 (6) | 4+3 | Odense OBK | Odense OBK |
| 2015/2016 | U17 (6) | 4+3 | Skovshoved | Skovshoved |
| 2015/2016 | U17 (6) | 4+3 | Solrød Strand | Solrød Strand |
| 2015/2016 | U17 (6) | 4+3 | Sportsefterskolen SINE | Sportsefterskolen SINE |
| 2016/2017 | U11 (3) | 4+3 | Hillerød | Hillerød; Hillerød 1 |
| 2016/2017 | U11 (3) | 4+3 | Hvidovre | Hvidovre |
| 2016/2017 | U11 (3) | 4+3 | Højbjerg | Højbjerg 1; Højbjerg 2 |
| 2016/2017 | U11 (3) | 4+3 | Lillerød | Lillerød; Lillerød 1 |
| 2016/2017 | U11 (3) | 4+3 | Lyngby | Lyngby |
| 2016/2017 | U11 (3) | 4+3 | Middelfart | Middelfart |
| 2016/2017 | U11 (3) | 4+3 | Odense OBK | Odense OBK 1 |
| 2016/2017 | U11 (3) | 4+3 | Skovshoved | Skovshoved |
| 2016/2017 | U11 (3) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2016/2017 | U11 (3) | 4+3 | Team Badminton Esbjerg | Team Badminton Esbjerg 1 |
| 2016/2017 | U11 (3) | 4+3 | Team Aarhus ungdom | Team Aarhus ungdom 1 |
| 2016/2017 | U13 (4) | 4+3 | Brønderslev | Brønderslev 1 |
| 2016/2017 | U13 (4) | 4+3 | Drive | Drive |
| 2016/2017 | U13 (4) | 4+3 | Fjer Fyn | Fjer Fyn 1 |
| 2016/2017 | U13 (4) | 4+3 | Greve | Greve 1 |
| 2016/2017 | U13 (4) | 4+3 | Herning | Herning 1 |
| 2016/2017 | U13 (4) | 4+3 | Hillerød | Hillerød; Hillerød 1 |
| 2016/2017 | U13 (4) | 4+3 | Hvidovre | Hvidovre |
| 2016/2017 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1 |
| 2016/2017 | U13 (4) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2016/2017 | U13 (4) | 4+3 | Kolding BK | Kolding BK 1 |
| 2016/2017 | U13 (4) | 4+3 | Lillerød | Lillerød 1 |
| 2016/2017 | U13 (4) | 4+3 | Lyngby | Lyngby |
| 2016/2017 | U13 (4) | 4+3 | Odense OBK | Odense OBK 1 |
| 2016/2017 | U13 (4) | 4+3 | Skovshoved | Skovshoved |
| 2016/2017 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2016/2017 | U13 (4) | 4+3 | Team Badminton Esbjerg | Team Badminton Esbjerg 1 |
| 2016/2017 | U13 (4) | 4+3 | Viby J | Viby J 1 |
| 2016/2017 | U13 (4) | 4+3 | Værløse | Værløse 1 |
| 2016/2017 | U15 (5) | 4+3 | abc Aalborg | abc Aalborg; abc Aalborg 1 |
| 2016/2017 | U15 (5) | 4+3 | Brønderslev | Brønderslev; Brønderslev 1 |
| 2016/2017 | U15 (5) | 4+3 | Greve | Greve 1 |
| 2016/2017 | U15 (5) | 4+3 | Herning | Herning; Herning 1 |
| 2016/2017 | U15 (5) | 4+3 | Hillerød | Hillerød 1 |
| 2016/2017 | U15 (5) | 4+3 | Hvidovre | Hvidovre |
| 2016/2017 | U15 (5) | 4+3 | Højbjerg | Højbjerg; Højbjerg 1 |
| 2016/2017 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2016/2017 | U15 (5) | 4+3 | Kolding BK | Kolding BK 1; Kolding BK 2 |
| 2016/2017 | U15 (5) | 4+3 | Lillerød | Lillerød 1 |
| 2016/2017 | U15 (5) | 4+3 | Lyngby | Lyngby |
| 2016/2017 | U15 (5) | 4+3 | Skovshoved | Skovshoved |
| 2016/2017 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2016/2017 | U15 (5) | 4+3 | Triton-RBK-RIF | Triton-RBK-RIF; Triton-RBK-RIF 1 |
| 2016/2017 | U15 (5) | 4+3 | Viby J | Viby J; Viby J 1 |
| 2016/2017 | U15 (5) | 4+3 | Værløse | Værløse; Værløse 1 |
| 2016/2017 | U17 (6) | 4+3 | abc Aalborg | abc Aalborg 1 |
| 2016/2017 | U17 (6) | 4+3 | Drive | Drive |
| 2016/2017 | U17 (6) | 4+3 | Gentofte | Gentofte |
| 2016/2017 | U17 (6) | 4+3 | Greve | Greve 1 |
| 2016/2017 | U17 (6) | 4+3 | Hjørring | Hjørring 1 |
| 2016/2017 | U17 (6) | 4+3 | Højbjerg | Højbjerg 1 |
| 2016/2017 | U17 (6) | 4+3 | Ikast | Ikast 1; Ikast 2 |
| 2016/2017 | U17 (6) | 4+3 | KBK Kbh. | KBK Kbh. |
| 2016/2017 | U17 (6) | 4+3 | KMB2010 | KMB2010 |
| 2016/2017 | U17 (6) | 4+3 | Kolding BK | Kolding BK 1 |
| 2016/2017 | U17 (6) | 4+3 | Lillerød | Lillerød 1 |
| 2016/2017 | U17 (6) | 4+3 | Lyngby | Lyngby |
| 2016/2017 | U17 (6) | 4+3 | Odense OBK | Odense OBK 1 |
| 2016/2017 | U17 (6) | 4+3 | Skovshoved | Skovshoved |
| 2016/2017 | U17 (6) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2016/2017 | U17 (6) | 4+3 | Team Sønderjylland | Team Sønderjylland 1 |
| 2016/2017 | U17 (6) | 4+3 | Taastrup Elite | Taastrup Elite 1 |
| 2016/2017 | U17 (6) | 4+3 | Viby J | Viby J 1 |
| 2016/2017 | U17 (6) | 4+3 | Værløse | Værløse; Værløse 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Blåkilde Efterskole | Blåkilde Efterskole 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Brøruphus Efterskole | Brøruphus Efterskole 3 |
| 2016/2017 | U17/U19 (18) | 4+2 | Glamsdalen | Glamsdalen 1; Glamsdalen 2 |
| 2016/2017 | U17/U19 (18) | 4+2 | Grønsund | Grønsund 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Gørlev Idrætsefterskole | Gørlev Idrætsefterskole 1; Gørlev Idrætsefterskole 2 |
| 2016/2017 | U17/U19 (18) | 4+2 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole 1; Hjemly Idrætsefterskole 2; Hjemly Idrætsefterskole 2 (M); Hjemly Idrætsefterskole 3 |
| 2016/2017 | U17/U19 (18) | 4+2 | Højbjerg | Højbjerg 3; Højbjerg 4 |
| 2016/2017 | U17/U19 (18) | 4+2 | Ikast | Ikast 1; Ikast 2 |
| 2016/2017 | U17/U19 (18) | 4+2 | Middelfart | Middelfart 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Nørager HCI | Nørager HCI 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Rudehøj Efterskole | Rudehøj Efterskole 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Rønde Efterskole | Rønde Efterskole 1; Rønde Efterskole 2; Rønde Efterskole 3; Rønde Efterskole 4; Rønde Efterskole 5 |
| 2016/2017 | U17/U19 (18) | 4+2 | Sportsefterskolen SINE | Sportsefterskolen SINE 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Stidsholt IF | Stidsholt IF 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Strib Idrætsefterskole | Strib Idrætsefterskole 1; Strib Idrætsefterskole 2 |
| 2016/2017 | U17/U19 (18) | 4+2 | Team Badminton Esbjerg | Team Badminton Esbjerg 3; Team Badminton Esbjerg 4 |
| 2016/2017 | U17/U19 (18) | 4+2 | Thorsager Rønde | Thorsager Rønde 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Varde | Varde 1 |
| 2016/2017 | U17/U19 (18) | 4+2 | Vivild Idrætsefterskole | Vivild Idrætsefterskole 1; Vivild Idrætsefterskole 2 |
| 2017/2018 | U11 (3) | 4+3 | Middelfart | Middelfart |
| 2017/2018 | U13 (4) | 4+3 | abc Aalborg | abc Aalborg; abc Aalborg 1 |
| 2017/2018 | U13 (4) | 4+3 | Drive | Drive 1 |
| 2017/2018 | U13 (4) | 4+3 | Greve | Greve; Greve 1 |
| 2017/2018 | U13 (4) | 4+3 | Herning | Herning; Herning 1 |
| 2017/2018 | U13 (4) | 4+3 | Hillerød | Hillerød 1 |
| 2017/2018 | U13 (4) | 4+3 | Hvidovre | Hvidovre 1 |
| 2017/2018 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1; Højbjerg 2; Højbjerg 3 |
| 2017/2018 | U13 (4) | 4+3 | KBK Kbh. | KBK Kbh. 1 |
| 2017/2018 | U13 (4) | 4+3 | Kolding BK | Kolding BK; Kolding BK 1 |
| 2017/2018 | U13 (4) | 4+3 | Lillerød | Lillerød 1 |
| 2017/2018 | U13 (4) | 4+3 | Lyngby | Lyngby 1 |
| 2017/2018 | U13 (4) | 4+3 | Odense OBK | Odense OBK; Odense OBK 1 |
| 2017/2018 | U13 (4) | 4+3 | Skovshoved | Skovshoved 1 |
| 2017/2018 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2017/2018 | U13 (4) | 4+3 | Team Badminton Esbjerg | Team Badminton Esbjerg; Team Badminton Esbjerg 1 |
| 2017/2018 | U15 (5) | 4+3 | Greve | Greve 1 |
| 2017/2018 | U15 (5) | 4+3 | Herning | Herning 1 |
| 2017/2018 | U15 (5) | 4+3 | Hillerød | Hillerød; Hillerød 1 |
| 2017/2018 | U15 (5) | 4+3 | Holbæk | Holbæk 1 |
| 2017/2018 | U15 (5) | 4+3 | Højbjerg | Højbjerg 1 |
| 2017/2018 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. 1 |
| 2017/2018 | U15 (5) | 4+3 | Kolding BK | Kolding BK 1 |
| 2017/2018 | U15 (5) | 4+3 | Lillerød | Lillerød; Lillerød 1 |
| 2017/2018 | U15 (5) | 4+3 | Lyngby | Lyngby 1 |
| 2017/2018 | U15 (5) | 4+3 | Odense OBK | Odense OBK 1 |
| 2017/2018 | U15 (5) | 4+3 | Skovshoved | Skovshoved 1 |
| 2017/2018 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2017/2018 | U15 (5) | 4+3 | Team Badminton Esbjerg | Team Badminton Esbjerg 1 |
| 2017/2018 | U15 (5) | 4+3 | Viby J | Viby J 1 |
| 2017/2018 | U15 (5) | 4+3 | Værløse | Værløse 1 |
| 2017/2018 | U15 (5) | 4+3 | Aalborg Triton | Aalborg Triton 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Badminton Roskilde | Badminton Roskilde 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Blåkilde Efterskole | Blåkilde Efterskole 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Brøruphus Efterskole | Brøruphus Efterskole 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Charlottenlund | Charlottenlund 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Drive | Drive 1; Drive 2 |
| 2017/2018 | U17/U19 (18) | 4+2 | Dybbøl | Dybbøl 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Gentofte | Gentofte 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Gladsaxe Søborg | Gladsaxe Søborg 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Glamsdalen | Glamsdalen 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Grønsund | Grønsund 1; Grønsund 2 |
| 2017/2018 | U17/U19 (18) | 4+2 | Gørlev Idrætsefterskole | Gørlev Idrætsefterskole 1; Gørlev Idrætsefterskole 1 (A) |
| 2017/2018 | U17/U19 (18) | 4+2 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole 1; Hjemly Idrætsefterskole 2 |
| 2017/2018 | U17/U19 (18) | 4+2 | HOG Badminton, Hinnerup | HOG Badminton, Hinnerup 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Højbjerg | Højbjerg 1; Højbjerg 2 |
| 2017/2018 | U17/U19 (18) | 4+2 | Hørning IF | Hørning IF 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Ikast | Ikast 1; Ikast 2 |
| 2017/2018 | U17/U19 (18) | 4+2 | Ishøj SB 50 | Ishøj SB 50 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | KBK Kbh. | KBK Kbh. 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Køge | Køge; Køge 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Langhøj | Langhøj 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Rebild Efterskole | Rebild Efterskole 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Ry | Ry 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Rønde Efterskole | Rønde Efterskole 1; Rønde Efterskole 2; Rønde Efterskole 3; Rønde Efterskole 3 (A); Rønde Efterskole 5 |
| 2017/2018 | U17/U19 (18) | 4+2 | Sjælsølund SES | Sjælsølund SES 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Stidsholt IF | Stidsholt IF 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Strib Idrætsefterskole | Strib Idrætsefterskole 1; Strib Idrætsefterskole 2 |
| 2017/2018 | U17/U19 (18) | 4+2 | Team Badminton Esbjerg | Team Badminton Esbjerg 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Vejle | Vejle 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Vesterbølle Efterskole | Vesterbølle Efterskole 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Vorup FB | Vorup FB 1 |
| 2017/2018 | U17/U19 (18) | 4+2 | Ølstykke | &#216;lstykke; &#216;lstykke 1 |
| 2018/2019 | U11 (3) | 4+3 | Middelfart | Middelfart |
| 2018/2019 | U13 (4) | 4+3 | Hillerød | Hillerød 1 |
| 2018/2019 | U13 (4) | 4+3 | Hvidovre | Hvidovre 1 |
| 2018/2019 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1; Højbjerg 2 |
| 2018/2019 | U13 (4) | 4+3 | Lillerød | Lillerød 1 |
| 2018/2019 | U13 (4) | 4+3 | Lillerød U13 4+3 | Lillerød U13 4+3 |
| 2018/2019 | U13 (4) | 4+3 | Lyngby | Lyngby 1 |
| 2018/2019 | U13 (4) | 4+3 | Odense OBK | Odense OBK 1; Odense OBK 2 |
| 2018/2019 | U13 (4) | 4+3 | Skovshoved | Skovshoved 1 |
| 2018/2019 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2018/2019 | U13 (4) | 4+3 | Solrød Strand U13 4+3 | Solrød Strand U13 4+3 |
| 2018/2019 | U13 (4) | 4+3 | Team Badminton Esbjerg | Team Badminton Esbjerg |
| 2018/2019 | U15 (5) | 4+3 | Dybbøl | Dybbøl |
| 2018/2019 | U15 (5) | 4+3 | Greve | Greve 1; Greve 2 |
| 2018/2019 | U15 (5) | 4+3 | Greve U15 4+3 | Greve U15 4+3 |
| 2018/2019 | U15 (5) | 4+3 | Herning | Herning |
| 2018/2019 | U15 (5) | 4+3 | Hillerød | Hillerød 1 |
| 2018/2019 | U15 (5) | 4+3 | Hillerød U15 4+3 | Hillerød U15 4+3 |
| 2018/2019 | U15 (5) | 4+3 | Holbæk | Holbæk 1 |
| 2018/2019 | U15 (5) | 4+3 | Højbjerg | Højbjerg |
| 2018/2019 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. 1 |
| 2018/2019 | U15 (5) | 4+3 | Kolding BK | Kolding BK |
| 2018/2019 | U15 (5) | 4+3 | Lillerød | Lillerød 1 |
| 2018/2019 | U15 (5) | 4+3 | Lyngby | Lyngby 1 |
| 2018/2019 | U15 (5) | 4+3 | Odense OBK | Odense OBK 1; Odense OBK 2 |
| 2018/2019 | U15 (5) | 4+3 | Skovshoved | Skovshoved 1 |
| 2018/2019 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2018/2019 | U15 (5) | 4+3 | Team Badminton Esbjerg | Team Badminton Esbjerg |
| 2018/2019 | U15 (5) | 4+3 | Viby J | Viby J |
| 2018/2019 | U15 (5) | 4+3 | Værløse | Værløse 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | BC37 Amager | BC37 Amager 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Blåkilde Efterskole | Blåkilde Efterskole 1; Blåkilde Efterskole 2 |
| 2018/2019 | U17/U19 (18) | 4+2 | Brøruphus Efterskole | Brøruphus Efterskole 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Drive | Drive 1; Drive 2 |
| 2018/2019 | U17/U19 (18) | 4+2 | Dybbøl | Dybbøl |
| 2018/2019 | U17/U19 (18) | 4+2 | Efterskolen Solgården | Efterskolen Solgården 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Glamsdalen | Glamsdalen 1; Glamsdalen 2 |
| 2018/2019 | U17/U19 (18) | 4+2 | Greve | Greve; Greve 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Grønsund | Grønsund 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Gørlev Idrætsefterskole | Gørlev Idrætsefterskole 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Himmerlands Ungdomsskole | Himmerlands Ungdomsskole 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | HOG Badminton, Hinnerup | HOG Badminton, Hinnerup |
| 2018/2019 | U17/U19 (18) | 4+2 | Højbjerg | Højbjerg |
| 2018/2019 | U17/U19 (18) | 4+2 | Ikast | Ikast 1; Ikast 2 |
| 2018/2019 | U17/U19 (18) | 4+2 | KBK Kbh. | KBK Kbh. 2 |
| 2018/2019 | U17/U19 (18) | 4+2 | Nordbyens Badmintonklub | Nordbyens Badmintonklub 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Nørre Nissum Efterskole | Nørre Nissum Efterskole 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Rebild Efterskole | Rebild Efterskole 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Rønde Efterskole | Rønde Efterskole 1; Rønde Efterskole 1 (&#216;M); Rønde Efterskole 2; Rønde Efterskole 2 (&#216;M); Rønde Efterskole 3; Rønde Efterskole 5; Rønde Efterskole 6 |
| 2018/2019 | U17/U19 (18) | 4+2 | Sjælsølund SES | Sjælsølund SES 1; Sjælsølund SES 2; Sjælsølund SES 3 |
| 2018/2019 | U17/U19 (18) | 4+2 | Sportsefterskolen SINE | Sportsefterskolen SINE 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Stidsholt-VEB | Stidsholt-VEB |
| 2018/2019 | U17/U19 (18) | 4+2 | Strib Idrætsefterskole | Strib Idrætsefterskole 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | Team Badminton Esbjerg | Team Badminton Esbjerg |
| 2018/2019 | U17/U19 (18) | 4+2 | Tst, Tilst | Tst, Tilst |
| 2018/2019 | U17/U19 (18) | 4+2 | Vivild Idrætsefterskole | Vivild Idrætsefterskole 1 (&#216;M) |
| 2019/2020 | U11 (3) | 4+3 | Middelfart | Middelfart |
| 2019/2020 | U13 (4) | 4+3 | Dalum-OBK | Dalum-OBK 1 |
| 2019/2020 | U13 (4) | 4+3 | Gentofte | Gentofte 1 |
| 2019/2020 | U13 (4) | 4+3 | Hillerød | Hillerød 1 |
| 2019/2020 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1; Højbjerg 2; Højbjerg 3 |
| 2019/2020 | U13 (4) | 4+3 | Lillerød | Lillerød 1 |
| 2019/2020 | U13 (4) | 4+3 | Lyngby | Lyngby 1; Lyngby 2 |
| 2019/2020 | U13 (4) | 4+3 | Odense OBK | Odense OBK 1; Odense OBK 2 |
| 2019/2020 | U13 (4) | 4+3 | Skovshoved | Skovshoved 1 |
| 2019/2020 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2019/2020 | U13 (4) | 4+3 | Team Badminton Esbjerg | Team Badminton Esbjerg 1 |
| 2019/2020 | U13 (4) | 4+3 | Team København | Team København 1 |
| 2019/2020 | U13 (4) | 4+3 | Vanløse | Vanløse 1 |
| 2019/2020 | U15 (5) | 4+3 | abc Aalborg | abc Aalborg 1 |
| 2019/2020 | U15 (5) | 4+3 | Gentofte | Gentofte 1 |
| 2019/2020 | U15 (5) | 4+3 | Greve | Greve 1 |
| 2019/2020 | U15 (5) | 4+3 | Herning | Herning 1 |
| 2019/2020 | U15 (5) | 4+3 | Hvidovre | Hvidovre 1 |
| 2019/2020 | U15 (5) | 4+3 | Højbjerg | Højbjerg 1; Højbjerg 2 |
| 2019/2020 | U15 (5) | 4+3 | Kolding BK | Kolding BK 1 |
| 2019/2020 | U15 (5) | 4+3 | Lillerød | Lillerød 1 |
| 2019/2020 | U15 (5) | 4+3 | Lyngby | Lyngby 1 |
| 2019/2020 | U15 (5) | 4+3 | Odense OBK | Odense OBK 1 |
| 2019/2020 | U15 (5) | 4+3 | Skovshoved | Skovshoved 1 |
| 2019/2020 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2019/2020 | U15 (5) | 4+3 | Team Badminton Esbjerg | Team Badminton Esbjerg 1 |
| 2019/2020 | U15 (5) | 4+3 | Viby-Silkeborg | Viby-Silkeborg 1 |
| 2020/2021 | U09 (2) | 4 spillere | Badminton Esbjerg | Badminton Esbjerg 1; Badminton Esbjerg 2; Badminton Esbjerg 3; Badminton Esbjerg 4; Badminton Esbjerg 5 |
| 2020/2021 | U09 (2) | 4 spillere | BC37 Amager | BC37 Amager 1 |
| 2020/2021 | U09 (2) | 4 spillere | Bindslev-Tversted | Bindslev-Tversted 1 |
| 2020/2021 | U09 (2) | 4 spillere | Bjergby-Mygdal | Bjergby-Mygdal 1 |
| 2020/2021 | U09 (2) | 4 spillere | Blans Sundeved | Blans Sundeved 1 |
| 2020/2021 | U09 (2) | 4 spillere | Brabrand | Brabrand 1 |
| 2020/2021 | U09 (2) | 4 spillere | Dragør | Dragør 1 |
| 2020/2021 | U09 (2) | 4 spillere | Dybbøl | Dybbøl 1; Dybbøl 2 |
| 2020/2021 | U09 (2) | 4 spillere | FKIF Frederiksberg | FKIF Frederiksberg 1 |
| 2020/2021 | U09 (2) | 4 spillere | Gladsaxe Søborg | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2020/2021 | U09 (2) | 4 spillere | Graasten | Graasten 1 |
| 2020/2021 | U09 (2) | 4 spillere | Hillerød | Hillerød 1 |
| 2020/2021 | U09 (2) | 4 spillere | Hjørring | Hjørring 1; Hjørring 2 |
| 2020/2021 | U09 (2) | 4 spillere | HOG Badminton, Hinnerup | HOG Badminton, Hinnerup 1 |
| 2020/2021 | U09 (2) | 4 spillere | Humlebæk | Humlebæk 1 |
| 2020/2021 | U09 (2) | 4 spillere | Hvidovre | Hvidovre 1 |
| 2020/2021 | U09 (2) | 4 spillere | Højbjerg | Højbjerg 1; Højbjerg 2; Højbjerg 3; Højbjerg 4 |
| 2020/2021 | U09 (2) | 4 spillere | Klarup Badminton | Klarup Badminton 1 |
| 2020/2021 | U09 (2) | 4 spillere | Skanderborg Badminton | Skanderborg Badminton 1 |
| 2020/2021 | U09 (2) | 4 spillere | Skovshoved | Skovshoved 1 |
| 2020/2021 | U09 (2) | 4 spillere | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2020/2021 | U09 (2) | 4 spillere | Svenstrup | Svenstrup 1 |
| 2020/2021 | U09 (2) | 4 spillere | Sæby | Sæby 1 |
| 2020/2021 | U09 (2) | 4 spillere | Værløse | Værløse 1; Værløse 2 |
| 2020/2021 | U09 (2) | 4 spillere | Aabybro | Aabybro 1 |
| 2020/2021 | U09 (2) | 4 spillere | Aarhus AB | Aarhus AB 1 |
| 2020/2021 | U13 (4) | 4+3 | Furesø | Furesø 1 |
| 2020/2021 | U13 (4) | 4+3 | Gentofte | Gentofte 1 |
| 2020/2021 | U13 (4) | 4+3 | Hillerød | Hillerød 1 |
| 2020/2021 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1 |
| 2020/2021 | U13 (4) | 4+3 | Kolding BK | Kolding BK 3 |
| 2020/2021 | U13 (4) | 4+3 | Lyngby | Lyngby 1; Lyngby 2 |
| 2020/2021 | U13 (4) | 4+3 | Odense OBK | Odense OBK 1 |
| 2020/2021 | U13 (4) | 4+3 | Skovshoved | Skovshoved 1 |
| 2020/2021 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2020/2021 | U13 (4) | 4+3 | Team Metro+ | Team Metro+ 1 |
| 2020/2021 | U13 (4) | 4+3 | Team Nordjylland | Team Nordjylland 1 |
| 2020/2021 | U13 (4) | 4+3 | Team Sydjylland Vest | Team Sydjylland Vest 1 |
| 2020/2021 | U13 (4) | 4+3 | Viby J | Viby J 1 |
| 2020/2021 | U13 (4) | 4+3 | Aarhus AB | Aarhus AB 1 |
| 2020/2021 | U15 (5) | 4+3 | Gentofte | Gentofte 1 |
| 2020/2021 | U15 (5) | 4+3 | Greve | Greve 1 |
| 2020/2021 | U15 (5) | 4+3 | Hillerød | Hillerød 1 |
| 2020/2021 | U15 (5) | 4+3 | Hvidovre | Hvidovre 1 |
| 2020/2021 | U15 (5) | 4+3 | Højbjerg | Højbjerg 1 |
| 2020/2021 | U15 (5) | 4+3 | Kolding BK | Kolding BK 2 |
| 2020/2021 | U15 (5) | 4+3 | Lillerød | Lillerød 1 |
| 2020/2021 | U15 (5) | 4+3 | Lyngby | Lyngby 1; Lyngby 2 |
| 2020/2021 | U15 (5) | 4+3 | Odense OBK | Odense OBK 1 |
| 2020/2021 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2020/2021 | U15 (5) | 4+3 | Team Odense | Team Odense 1 |
| 2020/2021 | U15 (5) | 4+3 | Team Sydjylland Vest | Team Sydjylland Vest 1 |
| 2021/2022 | U09 (2) | 4 spillere | Badminton Esbjerg | Badminton Esbjerg 1; Badminton Esbjerg 2; Badminton Esbjerg 3; Badminton Esbjerg 4 |
| 2021/2022 | U09 (2) | 4 spillere | BC37 Amager | BC37 Amager 1 |
| 2021/2022 | U09 (2) | 4 spillere | Bjergby-Mygdal | Bjergby-Mygdal 1 |
| 2021/2022 | U09 (2) | 4 spillere | Brønderslev | Brønderslev 1 |
| 2021/2022 | U09 (2) | 4 spillere | Charlottenlund | Charlottenlund 1 |
| 2021/2022 | U09 (2) | 4 spillere | Dragør | Dragør 1 |
| 2021/2022 | U09 (2) | 4 spillere | Farsø | Farsø 1 |
| 2021/2022 | U09 (2) | 4 spillere | Frederikssund | Frederikssund 1 |
| 2021/2022 | U09 (2) | 4 spillere | Gladsaxe Søborg | Gladsaxe Søborg 1 |
| 2021/2022 | U09 (2) | 4 spillere | Glumsø | Glumsø 1 |
| 2021/2022 | U09 (2) | 4 spillere | Hadsund | Hadsund 1 |
| 2021/2022 | U09 (2) | 4 spillere | Hadsund 3 U11 2700 piger | Hadsund 3 U11 2700 piger |
| 2021/2022 | U09 (2) | 4 spillere | Hjørring | Hjørring 1 |
| 2021/2022 | U09 (2) | 4 spillere | Hjørring 4 U11 2700 piger | Hjørring 4 U11 2700 piger |
| 2021/2022 | U09 (2) | 4 spillere | Hobro | Hobro 1 |
| 2021/2022 | U09 (2) | 4 spillere | HOG Badminton, Hinnerup | HOG Badminton, Hinnerup 1 |
| 2021/2022 | U09 (2) | 4 spillere | HOG Badminton, Hinnerup 2 U11-2700 4 piger | HOG Badminton, Hinnerup 2 U11-2700 4 piger |
| 2021/2022 | U09 (2) | 4 spillere | Hvidovre | Hvidovre 1; Hvidovre 2 |
| 2021/2022 | U09 (2) | 4 spillere | Højbjerg | Højbjerg 1; Højbjerg 2 |
| 2021/2022 | U09 (2) | 4 spillere | Højbjerg 10 U11-2700 4 piger | Højbjerg 10 U11-2700 4 piger |
| 2021/2022 | U09 (2) | 4 spillere | Højbjerg 9 U11-2700 4 piger | Højbjerg 9 U11-2700 4 piger |
| 2021/2022 | U09 (2) | 4 spillere | Islands Brygge | Islands Brygge 1 |
| 2021/2022 | U09 (2) | 4 spillere | KBK Kbh. | KBK Kbh. 1 |
| 2021/2022 | U09 (2) | 4 spillere | Lejre | Lejre 1 |
| 2021/2022 | U09 (2) | 4 spillere | Lillerød | Lillerød 1 |
| 2021/2022 | U09 (2) | 4 spillere | Rødovre | Rødovre 1 |
| 2021/2022 | U09 (2) | 4 spillere | Sabro | Sabro 1 |
| 2021/2022 | U09 (2) | 4 spillere | SIF Assentoft | SIF Assentoft 1 |
| 2021/2022 | U09 (2) | 4 spillere | Skagen | Skagen 1 |
| 2021/2022 | U09 (2) | 4 spillere | Skalborg SK | Skalborg SK 1; Skalborg SK 2 |
| 2021/2022 | U09 (2) | 4 spillere | Skovshoved | Skovshoved 1 |
| 2021/2022 | U09 (2) | 4 spillere | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2021/2022 | U09 (2) | 4 spillere | Sorring | Sorring 1 |
| 2021/2022 | U09 (2) | 4 spillere | Sorring 2 U11-2700 4 piger | Sorring 2 U11-2700 4 piger |
| 2021/2022 | U09 (2) | 4 spillere | Svenstrup | Svenstrup 1; Svenstrup 3 |
| 2021/2022 | U09 (2) | 4 spillere | Svenstrup 4 U11 2700 piger | Svenstrup 4 U11 2700 piger |
| 2021/2022 | U09 (2) | 4 spillere | Team Gudenåen | Team Gudenåen 1 |
| 2021/2022 | U09 (2) | 4 spillere | Taastrup BC | Taastrup BC 1 |
| 2021/2022 | U09 (2) | 4 spillere | Varde | Varde 1 |
| 2021/2022 | U09 (2) | 4 spillere | Viby J | Viby J 1 |
| 2021/2022 | U09 (2) | 4 spillere | Værløse | Værløse 1 |
| 2021/2022 | U09 (2) | 4 spillere | Aabybro | Aabybro 1 |
| 2021/2022 | U09 (2) | 4 spillere | Aalborg Triton | Aalborg Triton 1; Aalborg Triton 2 |
| 2021/2022 | U09 (2) | 4 spillere | Aarhus AB | Aarhus AB 1 |
| 2021/2022 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1 |
| 2021/2022 | U13 (4) | 4+3 | Kolding BK | Kolding BK 1 |
| 2021/2022 | U13 (4) | 4+3 | Lyngby | Lyngby 1 |
| 2021/2022 | U13 (4) | 4+3 | Odense OBK | Odense OBK 1 |
| 2021/2022 | U13 (4) | 4+3 | Skovshoved | Skovshoved 1 |
| 2021/2022 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2021/2022 | U13 (4) | 4+3 | Team Nordsjælland | Team Nordsjælland 1 |
| 2021/2022 | U13 (4) | 4+3 | Team Sydjylland Vest | Team Sydjylland Vest 1 |
| 2021/2022 | U13 (4) | 4+3 | Viby J | Viby J 1 |
| 2021/2022 | U13 (4) | 4+3 | Aarhus AB | Aarhus AB 1 |
| 2021/2022 | U15 (5) | 4+3 | FSK Furesø | FSK Furesø 1 |
| 2021/2022 | U15 (5) | 4+3 | Gentofte | Gentofte 1 |
| 2021/2022 | U15 (5) | 4+3 | Greve | Greve 1 |
| 2021/2022 | U15 (5) | 4+3 | Hillerød | Hillerød 1 |
| 2021/2022 | U15 (5) | 4+3 | Højbjerg | Højbjerg 1 |
| 2021/2022 | U15 (5) | 4+3 | Lyngby | Lyngby 1; Lyngby 2 |
| 2021/2022 | U15 (5) | 4+3 | NK Lillerød | NK Lillerød |
| 2021/2022 | U15 (5) | 4+3 | Odense OBK | Odense OBK 1; Odense OBK 2 |
| 2021/2022 | U15 (5) | 4+3 | Skovshoved | Skovshoved 1 |
| 2021/2022 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2021/2022 | U15 (5) | 4+3 | Team Nordjylland | Team Nordjylland 1 |
| 2022/2023 | U09 (2) | 4 spillere | Alminde Viuf | Alminde Viuf 1 |
| 2022/2023 | U09 (2) | 4 spillere | Andst | Andst 1 |
| 2022/2023 | U09 (2) | 4 spillere | Bjergby-Mygdal | Bjergby-Mygdal 1 |
| 2022/2023 | U09 (2) | 4 spillere | Brønderslev | Brønderslev 1; Brønderslev 2 |
| 2022/2023 | U09 (2) | 4 spillere | Dall-Ferslev | Dall-Ferslev 1; Dall-Ferslev 2 |
| 2022/2023 | U09 (2) | 4 spillere | Farsø | Farsø 1; Farsø 2 |
| 2022/2023 | U09 (2) | 4 spillere | Frederiksberg | Frederiksberg 1 |
| 2022/2023 | U09 (2) | 4 spillere | Gentofte | Gentofte 1 |
| 2022/2023 | U09 (2) | 4 spillere | Gilleleje | Gilleleje 1 |
| 2022/2023 | U09 (2) | 4 spillere | Gladsaxe Søborg | Gladsaxe Søborg 1 |
| 2022/2023 | U09 (2) | 4 spillere | Grindsted BK | Grindsted BK 1 |
| 2022/2023 | U09 (2) | 4 spillere | Graasten | Graasten 1 |
| 2022/2023 | U09 (2) | 4 spillere | Gug | Gug 1 |
| 2022/2023 | U09 (2) | 4 spillere | Hillerød | Hillerød 1 |
| 2022/2023 | U09 (2) | 4 spillere | Hjørring | Hjørring 1 |
| 2022/2023 | U09 (2) | 4 spillere | HOG Badminton, Hinnerup | HOG Badminton, Hinnerup 1 |
| 2022/2023 | U09 (2) | 4 spillere | Hvidovre | Hvidovre 1; Hvidovre 2 |
| 2022/2023 | U09 (2) | 4 spillere | Højbjerg | Højbjerg 1; Højbjerg 2 |
| 2022/2023 | U09 (2) | 4 spillere | Islands Brygge | Islands Brygge 1 |
| 2022/2023 | U09 (2) | 4 spillere | Jetsmark | Jetsmark 1 |
| 2022/2023 | U09 (2) | 4 spillere | KBK Kbh. | KBK Kbh. 1 |
| 2022/2023 | U09 (2) | 4 spillere | KMB2010 | KMB2010 1 |
| 2022/2023 | U09 (2) | 4 spillere | Lillerød | Lillerød 1 |
| 2022/2023 | U09 (2) | 4 spillere | Lindholm | Lindholm 1; Lindholm 3 |
| 2022/2023 | U09 (2) | 4 spillere | Oksbøl Badminton Klub | Oksbøl Badminton Klub 1 |
| 2022/2023 | U09 (2) | 4 spillere | Rudersdal | Rudersdal 1 |
| 2022/2023 | U09 (2) | 4 spillere | Skanderborg Badminton | Skanderborg Badminton 1 |
| 2022/2023 | U09 (2) | 4 spillere | Skovshoved | Skovshoved 1; Skovshoved 2 |
| 2022/2023 | U09 (2) | 4 spillere | Snejbjerg | Snejbjerg 1 |
| 2022/2023 | U09 (2) | 4 spillere | Solbjerg | Solbjerg 1 |
| 2022/2023 | U09 (2) | 4 spillere | Solrød Strand | Solrød Strand; Solrød Strand 1; Solrød Strand 2 |
| 2022/2023 | U09 (2) | 4 spillere | Sorring | Sorring 1 |
| 2022/2023 | U09 (2) | 4 spillere | Støvring | Støvring 1 |
| 2022/2023 | U09 (2) | 4 spillere | Svenstrup | Svenstrup 1; Svenstrup 2; Svenstrup 3 |
| 2022/2023 | U09 (2) | 4 spillere | Taastrup BC | Taastrup BC 1 |
| 2022/2023 | U09 (2) | 4 spillere | Varde | Varde 1; Varde 2 |
| 2022/2023 | U09 (2) | 4 spillere | Viby J | Viby J 1; Viby J 2 |
| 2022/2023 | U09 (2) | 4 spillere | Vinding SF | Vinding SF 1; Vinding SF 2; Vinding SF 4 |
| 2022/2023 | U09 (2) | 4 spillere | Aabybro | Aabybro 1; Aabybro 2 |
| 2022/2023 | U09 (2) | 4 spillere | Aalborg Triton | Aalborg Triton 1 |
| 2022/2023 | U09 (2) | 4 spillere | Aarhus AB | Aarhus AB 1; Aarhus AB 2 |
| 2022/2023 | U13 (4) | 4+3 | abc Aalborg | abc Aalborg 1 |
| 2022/2023 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1 |
| 2022/2023 | U13 (4) | 4+3 | Lillerød | Lillerød; Lillerød 1 |
| 2022/2023 | U13 (4) | 4+3 | Skovshoved | Skovshoved 1 |
| 2022/2023 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2022/2023 | U13 (4) | 4+3 | Team Sydjylland Vest | Team Sydjylland Vest 1 |
| 2022/2023 | U13 (4) | 4+3 | Viby J | Viby J 1 |
| 2022/2023 | U15 (5) | 4+3 | Gentofte | Gentofte 1 |
| 2022/2023 | U15 (5) | 4+3 | Hillerød | Hillerød; Hillerød 1 |
| 2022/2023 | U15 (5) | 4+3 | Højbjerg | Højbjerg; Højbjerg 1 |
| 2022/2023 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. 1 |
| 2022/2023 | U15 (5) | 4+3 | Kolding BK | Kolding BK; Kolding BK 1 |
| 2022/2023 | U15 (5) | 4+3 | Lyngby | Lyngby 1 |
| 2022/2023 | U15 (5) | 4+3 | Odense OBK | Odense OBK; Odense OBK 1 |
| 2022/2023 | U15 (5) | 4+3 | Skovshoved | Skovshoved 1 |
| 2022/2023 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1; Solrød Strand 2 |
| 2022/2023 | U15 (5) | 4+3 | Team Nordjylland | Team Nordjylland; Team Nordjylland 1 |
| 2022/2023 | U15 (5) | 4+3 | Team Sydjylland Vest | Team Sydjylland Vest; Team Sydjylland Vest 1 |
| 2022/2023 | U15 (5) | 4+3 | Viby J | Viby J; Viby J 1 |
| 2022/2023 | U15 (5) | 4+3 | Aarhus AB | Aarhus AB; Aarhus AB 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | abc Aalborg | abc Aalborg 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | BC37 Amager | BC37 Amager 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Glamsdalen | Glamsdalen 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Grønsund | Grønsund 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Gørlev Idrætsefterskole | Gørlev Idrætsefterskole 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole 1; Hjemly Idrætsefterskole 2; Hjemly Idrætsefterskole 3; Hjemly Idrætsefterskole 4 |
| 2022/2023 | U17/U19 (18) | 4+2 | HOG Badminton, Hinnerup | HOG Badminton, Hinnerup 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Ikast | Ikast 1; Ikast 2 |
| 2022/2023 | U17/U19 (18) | 4+2 | KBK Kbh. | KBK Kbh. 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Kolding BK | Kolding BK 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Rønde Efterskole | Rønde Efterskole 1; Rønde Efterskole 2; Rønde Efterskole 3; Rønde Efterskole 4; Rønde Efterskole 5 |
| 2022/2023 | U17/U19 (18) | 4+2 | Sjælsølund SES | Sjælsølund SES 1; Sjælsølund SES 2 |
| 2022/2023 | U17/U19 (18) | 4+2 | Sportsefterskolen SINE | Sportsefterskolen SINE 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Strib Idrætsefterskole | Strib Idrætsefterskole 1; Strib Idrætsefterskole 2; Strib Idrætsefterskole 3 |
| 2022/2023 | U17/U19 (18) | 4+2 | Sundeved Efterskole | Sundeved Efterskole 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Svenstrup | Svenstrup 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Vedersø Idrætsefterskole | Vedersø Idrætsefterskole 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Vejle | Vejle 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Vivild Idrætsefterskole | Vivild Idrætsefterskole 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Vojens GI | Vojens GI 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | Værløse | Værløse 1 |
| 2023/2024 | U09 (2) | 4 spillere | Badminton Esbjerg | Badminton Esbjerg 1; Badminton Esbjerg 2 |
| 2023/2024 | U09 (2) | 4 spillere | Badminton i indre By | Badminton i indre By 1 |
| 2023/2024 | U09 (2) | 4 spillere | Badminton Roskilde | Badminton Roskilde 1 |
| 2023/2024 | U09 (2) | 4 spillere | BC37 Amager | BC37 Amager 1 |
| 2023/2024 | U09 (2) | 4 spillere | Blenstrup | Blenstrup 1 |
| 2023/2024 | U09 (2) | 4 spillere | Brønderslev | Brønderslev 1 |
| 2023/2024 | U09 (2) | 4 spillere | Brørup | Brørup 1 |
| 2023/2024 | U09 (2) | 4 spillere | Dall-Ferslev 1 U9 | Dall-Ferslev 1 U9 |
| 2023/2024 | U09 (2) | 4 spillere | Drive | Drive 1 |
| 2023/2024 | U09 (2) | 4 spillere | Fanø | Fanø 1 |
| 2023/2024 | U09 (2) | 4 spillere | Frederiksberg | Frederiksberg 1 |
| 2023/2024 | U09 (2) | 4 spillere | Gentofte | Gentofte 1; Gentofte 2 |
| 2023/2024 | U09 (2) | 4 spillere | Gistrup LKB | Gistrup LKB 1 |
| 2023/2024 | U09 (2) | 4 spillere | Gladsaxe Søborg | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2023/2024 | U09 (2) | 4 spillere | Gug | Gug 1 |
| 2023/2024 | U09 (2) | 4 spillere | Hammel | Hammel 1 |
| 2023/2024 | U09 (2) | 4 spillere | HOG Badminton, Hinnerup | HOG Badminton, Hinnerup 1 |
| 2023/2024 | U09 (2) | 4 spillere | Holbæk | Holbæk; Holbæk 1 |
| 2023/2024 | U09 (2) | 4 spillere | Hvidovre | Hvidovre 1 |
| 2023/2024 | U09 (2) | 4 spillere | Højbjerg | Højbjerg 1 (2400); Højbjerg 2 (2400); Højbjerg 3 (2400) |
| 2023/2024 | U09 (2) | 4 spillere | Islands Brygge | Islands Brygge 1 |
| 2023/2024 | U09 (2) | 4 spillere | KBK Kbh. | KBK Kbh. 1 |
| 2023/2024 | U09 (2) | 4 spillere | KMB2010 | KMB2010 1 |
| 2023/2024 | U09 (2) | 4 spillere | Kolding BK | Kolding BK 1 |
| 2023/2024 | U09 (2) | 4 spillere | Køge | Køge; Køge 1 |
| 2023/2024 | U09 (2) | 4 spillere | Lillerød | Lillerød 1 |
| 2023/2024 | U09 (2) | 4 spillere | Lindholm abc Aalborg - U11 | Lindholm abc Aalborg - U11 |
| 2023/2024 | U09 (2) | 4 spillere | Lyngby | Lyngby 1 |
| 2023/2024 | U09 (2) | 4 spillere | Randers BK | Randers BK 1 |
| 2023/2024 | U09 (2) | 4 spillere | Ribe | Ribe 1 |
| 2023/2024 | U09 (2) | 4 spillere | SIF Assentoft | SIF Assentoft 1 |
| 2023/2024 | U09 (2) | 4 spillere | Skovshoved | Skovshoved 1; Skovshoved 2; Skovshoved 3 |
| 2023/2024 | U09 (2) | 4 spillere | Solbjerg | Solbjerg 1 |
| 2023/2024 | U09 (2) | 4 spillere | Solrød Strand | Solrød Strand; Solrød Strand 1; Solrød Strand 2 |
| 2023/2024 | U09 (2) | 4 spillere | Stavtrup | Stavtrup 1 |
| 2023/2024 | U09 (2) | 4 spillere | Støvring | Støvring 1; Støvring 2 |
| 2023/2024 | U09 (2) | 4 spillere | Støvring 3 U9 | Støvring 3 U9 |
| 2023/2024 | U09 (2) | 4 spillere | Svenstrup | Svenstrup 1 |
| 2023/2024 | U09 (2) | 4 spillere | Svenstrup 2 U11D - 4 piger | Svenstrup 2 U11D - 4 piger |
| 2023/2024 | U09 (2) | 4 spillere | Svenstrup 3 U11 | Svenstrup 3 U11 |
| 2023/2024 | U09 (2) | 4 spillere | Varde | Varde 1 |
| 2023/2024 | U09 (2) | 4 spillere | Viby J | Viby J 1 |
| 2023/2024 | U09 (2) | 4 spillere | Vinding SF | Vinding SF 1 (2400) |
| 2023/2024 | U09 (2) | 4 spillere | Ølstykke | &#216;lstykke 1 |
| 2023/2024 | U09 (2) | 4 spillere | Aalborg Triton | Aalborg Triton 1; Aalborg Triton 2 |
| 2023/2024 | U09 (2) | 4 spillere | Aarhus AB | Aarhus AB 1; Aarhus AB 2 |
| 2023/2024 | U13 (4) | 4+3 | Herning | Herning 1 |
| 2023/2024 | U13 (4) | 4+3 | Hvidovre | Hvidovre 1 |
| 2023/2024 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1 |
| 2023/2024 | U13 (4) | 4+3 | Skovshoved | Skovshoved 1 |
| 2023/2024 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2023/2024 | U13 (4) | 4+3 | Team Fyn-Sydjylland | Team Fyn-Sydjylland 1 |
| 2023/2024 | U13 (4) | 4+3 | Team HJR Sjælland | Team HJR Sjælland 1 |
| 2023/2024 | U13 (4) | 4+3 | Team Stor Aalborg | Team Stor Aalborg 2 |
| 2023/2024 | U13 (4) | 4+3 | Viby J | Viby J 1 |
| 2023/2024 | U13 (4) | 4+3 | Værløse | Værløse; Værløse 1 |
| 2023/2024 | U13 (4) | 4+3 | Aarhus AB | Aarhus AB 1 |
| 2023/2024 | U15 (5) | 4+3 | FKIF Frederiksberg | FKIF Frederiksberg 1 |
| 2023/2024 | U15 (5) | 4+3 | Gentofte | Gentofte 1 |
| 2023/2024 | U15 (5) | 4+3 | Højbjerg | Højbjerg 1 |
| 2023/2024 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. 1 |
| 2023/2024 | U15 (5) | 4+3 | Kolding BK | Kolding BK 1 |
| 2023/2024 | U15 (5) | 4+3 | Odense OBK | Odense OBK 1 |
| 2023/2024 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand; Solrød Strand 1 |
| 2023/2024 | U15 (5) | 4+3 | Team Midtsjælland | Team Midtsjælland; Team Midtsjælland 1 |
| 2023/2024 | U15 (5) | 4+3 | Team Sydjylland Vest | Team Sydjylland Vest 1 |
| 2023/2024 | U15 (5) | 4+3 | Team Sydjylland Øst | Team Sydjylland &#216;st 1 |
| 2023/2024 | U15 (5) | 4+3 | Viby J | Viby J 1 |
| 2023/2024 | U15 (5) | 4+3 | Værløse | Værløse 1 |
| 2023/2024 | U15 (5) | 4+3 | Aarhus AB | Aarhus AB 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Efterskolen Play | Efterskolen Play 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Glamsdalen | Glamsdalen 1; Glamsdalen 2 |
| 2023/2024 | U17/U19 (18) | 4+2 | Greve | Greve; Greve 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Gørlev Idrætsefterskole | Gørlev Idrætsefterskole 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole 1; Hjemly Idrætsefterskole 2; Hjemly Idrætsefterskole 3 |
| 2023/2024 | U17/U19 (18) | 4+2 | Horsens | Horsens 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Hørby Efterskole | Hørby Efterskole 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Haarby Efterskole | Haarby Efterskole 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Ikast | Ikast 1; Ikast 2 |
| 2023/2024 | U17/U19 (18) | 4+2 | Kolding BK | Kolding BK 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Rønde Efterskole | Rønde Efterskole 1; Rønde Efterskole 2; Rønde Efterskole 3; Rønde Efterskole 4; Rønde Efterskole 6; Rønde Efterskole 7 |
| 2023/2024 | U17/U19 (18) | 4+2 | Sjælsølund SES | Sjælsølund SES 1; Sjælsølund SES 2 |
| 2023/2024 | U17/U19 (18) | 4+2 | Solrød Strand | Solrød Strand 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Sportsefterskolen SINE | Sportsefterskolen SINE 1; Sportsefterskolen SINE 2 |
| 2023/2024 | U17/U19 (18) | 4+2 | Stidsholt IF | Stidsholt IF 1; Stidsholt IF 2 |
| 2023/2024 | U17/U19 (18) | 4+2 | Strib Idrætsefterskole | Strib Idrætsefterskole 1; Strib Idrætsefterskole 2; Strib Idrætsefterskole 3 |
| 2023/2024 | U17/U19 (18) | 4+2 | Sundeved Efterskole | Sundeved Efterskole 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Svenstrup | Svenstrup 1; Svenstrup 2 |
| 2023/2024 | U17/U19 (18) | 4+2 | Tirstrup Idrætsefterskole | Tirstrup Idrætsefterskole 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Vedersø Idrætsefterskole | Vedersø Idrætsefterskole 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Vojens GI | Vojens GI 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | Aarhus AB | Aarhus AB 1 |
| 2024/2025 | U09 (2) | 4 spillere | Badminton Esbjerg | Badminton Esbjerg 1; Badminton Esbjerg 2; Badminton Esbjerg 3 |
| 2024/2025 | U09 (2) | 4 spillere | Badminton Roskilde | Badminton Roskilde 1 |
| 2024/2025 | U09 (2) | 4 spillere | BC37 Amager | BC37 Amager 1 |
| 2024/2025 | U09 (2) | 4 spillere | Brabrand | Brabrand 1 |
| 2024/2025 | U09 (2) | 4 spillere | Brøndby BK | Brøndby BK 1 |
| 2024/2025 | U09 (2) | 4 spillere | Charlottenlund | Charlottenlund 1 |
| 2024/2025 | U09 (2) | 4 spillere | Drive | Drive 1 |
| 2024/2025 | U09 (2) | 4 spillere | Frederiksberg | Frederiksberg 1 |
| 2024/2025 | U09 (2) | 4 spillere | Galten FS | Galten FS 1 |
| 2024/2025 | U09 (2) | 4 spillere | Gentofte | Gentofte 1 |
| 2024/2025 | U09 (2) | 4 spillere | Gistrup LKB | Gistrup LKB 1 |
| 2024/2025 | U09 (2) | 4 spillere | Gladsaxe Søborg | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2024/2025 | U09 (2) | 4 spillere | Greve | Greve 1 |
| 2024/2025 | U09 (2) | 4 spillere | Gug | Gug 1 |
| 2024/2025 | U09 (2) | 4 spillere | Hillerød | Hillerød 1 |
| 2024/2025 | U09 (2) | 4 spillere | Humlebæk | Humlebæk 1 |
| 2024/2025 | U09 (2) | 4 spillere | Hvidovre | Hvidovre 1 |
| 2024/2025 | U09 (2) | 4 spillere | Højbjerg | Højbjerg 1; Højbjerg 2; Højbjerg 3; Højbjerg 4 |
| 2024/2025 | U09 (2) | 4 spillere | Hørsholm | Hørsholm 1 |
| 2024/2025 | U09 (2) | 4 spillere | Islands Brygge | Islands Brygge 1 |
| 2024/2025 | U09 (2) | 4 spillere | KBK Kbh. | KBK Kbh. 1 |
| 2024/2025 | U09 (2) | 4 spillere | KMB2010 | KMB2010 1; KMB2010 2 |
| 2024/2025 | U09 (2) | 4 spillere | Kolding BK | Kolding BK 1; Kolding BK 2 |
| 2024/2025 | U09 (2) | 4 spillere | Lyngby | Lyngby 1 |
| 2024/2025 | U09 (2) | 4 spillere | Nyborg | Nyborg 1 |
| 2024/2025 | U09 (2) | 4 spillere | Poulstrup Vrejlev | Poulstrup Vrejlev 1 |
| 2024/2025 | U09 (2) | 4 spillere | Rosendal | Rosendal 1; Rosendal 2 |
| 2024/2025 | U09 (2) | 4 spillere | Rudersdal | Rudersdal 1 |
| 2024/2025 | U09 (2) | 4 spillere | Sejs-Svejbæk | Sejs-Svejbæk 1 |
| 2024/2025 | U09 (2) | 4 spillere | Skalborg SK | Skalborg SK 1 |
| 2024/2025 | U09 (2) | 4 spillere | Skovshoved | Skovshoved 1; Skovshoved 2 |
| 2024/2025 | U09 (2) | 4 spillere | Solbjerg | Solbjerg 1 |
| 2024/2025 | U09 (2) | 4 spillere | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2024/2025 | U09 (2) | 4 spillere | Sorring | Sorring 1 |
| 2024/2025 | U09 (2) | 4 spillere | Svendborg | Svendborg 1 |
| 2024/2025 | U09 (2) | 4 spillere | Svenstrup | Svenstrup 1; Svenstrup 3 |
| 2024/2025 | U09 (2) | 4 spillere | Thorsager Rønde | Thorsager Rønde 1 |
| 2024/2025 | U09 (2) | 4 spillere | Vanløse | Vanløse 1 |
| 2024/2025 | U09 (2) | 4 spillere | Varde | Varde 1 |
| 2024/2025 | U09 (2) | 4 spillere | Viby J | Viby J 1; Viby J 2; Viby J 3 |
| 2024/2025 | U09 (2) | 4 spillere | Vinding SF | Vinding SF 1 |
| 2024/2025 | U09 (2) | 4 spillere | Aalborg Triton | Aalborg Triton 1; Aalborg Triton 2; Aalborg Triton 3 |
| 2024/2025 | U09 (2) | 4 spillere | Aarhus AB | Aarhus AB 1; Aarhus AB 2; Aarhus AB 3 |
| 2024/2025 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1; Højbjerg 2 |
| 2024/2025 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2024/2025 | U13 (4) | 4+3 | Team Sydjylland | Team Sydjylland 1 |
| 2024/2025 | U13 (4) | 4+3 | Værløse | Værløse 1 |
| 2024/2025 | U13 (4) | 4+3 | Aalborg Triton | Aalborg Triton 1 |
| 2024/2025 | U15 (5) | 4+3 | Bjergby-Mygdal | Bjergby-Mygdal 1 |
| 2024/2025 | U15 (5) | 4+3 | Gentofte | Gentofte 1 |
| 2024/2025 | U15 (5) | 4+3 | Herning | Herning; Herning 1 |
| 2024/2025 | U15 (5) | 4+3 | Højbjerg | Højbjerg; Højbjerg 1 |
| 2024/2025 | U15 (5) | 4+3 | KBK Kbh. | KBK Kbh. 1 |
| 2024/2025 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand 1; Solrød Strand 2 |
| 2024/2025 | U15 (5) | 4+3 | Team Sydjylland | Team Sydjylland; Team Sydjylland 1 |
| 2024/2025 | U15 (5) | 4+3 | Viby J | Viby J; Viby J 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Badminton Esbjerg | Badminton Esbjerg 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | BC37 Amager | BC37 Amager 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Brøruphus Efterskole | Brøruphus Efterskole 1; Brøruphus Efterskole 2 (xtra) |
| 2024/2025 | U17/U19 (18) | 4+2 | FKIF Frederiksberg | FKIF Frederiksberg 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Glamsdalen | Glamsdalen 1; Glamsdalen 2; Glamsdalen 2 (xtra) |
| 2024/2025 | U17/U19 (18) | 4+2 | Grønsund | Grønsund 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Gørlev Idrætsefterskole | Gørlev Idrætsefterskole 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole 1; Hjemly Idrætsefterskole 2; Hjemly Idrætsefterskole 3 |
| 2024/2025 | U17/U19 (18) | 4+2 | Horsens | Horsens 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Ikast | Ikast 1; Ikast 2 |
| 2024/2025 | U17/U19 (18) | 4+2 | KMB2010 | KMB2010 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Nivå-Kokkedal | Nivå-Kokkedal 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Rønde Efterskole | Rønde Efterskole 1; Rønde Efterskole 2; Rønde Efterskole 4; Rønde Efterskole 5; Rønde Efterskole 6 |
| 2024/2025 | U17/U19 (18) | 4+2 | Sjælsølund SES | Sjælsølund SES 1; Sjælsølund SES 2 |
| 2024/2025 | U17/U19 (18) | 4+2 | Solrød Strand | Solrød Strand 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Sportsefterskolen SINE | Sportsefterskolen SINE 1; Sportsefterskolen SINE 2; Sportsefterskolen SINE 3 |
| 2024/2025 | U17/U19 (18) | 4+2 | Strib Idrætsefterskole | Strib Idrætsefterskole 1; Strib Idrætsefterskole 2; Strib Idrætsefterskole 3 |
| 2024/2025 | U17/U19 (18) | 4+2 | Sundeved Efterskole | Sundeved Efterskole 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Svenstrup | Svenstrup 1; Svenstrup 2 |
| 2024/2025 | U17/U19 (18) | 4+2 | Tirstrup Idrætsefterskole | Tirstrup Idrætsefterskole 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Vedersø Idrætsefterskole | Vedersø Idrætsefterskole 1; Vedersø Idrætsefterskole 2 |
| 2024/2025 | U17/U19 (18) | 4+2 | Vivild Idrætsefterskole | Vivild Idrætsefterskole 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | Vojens GI | Vojens GI 1; Vojens GI 1 (xtra) |
| 2024/2025 | U17/U19 (18) | 4+2 | Værløse | Værløse 1 |
| 2025/2026 | U09 (2) | 3 spillere | Badminton Esbjerg | Badminton Esbjerg 1; Badminton Esbjerg 11; Badminton Esbjerg 2; Badminton Esbjerg 22 |
| 2025/2026 | U09 (2) | 3 spillere | BC37 Amager | BC37 Amager 1 |
| 2025/2026 | U09 (2) | 3 spillere | Brabrand | Brabrand 1; Brabrand 11; Brabrand 2; Brabrand 22 |
| 2025/2026 | U09 (2) | 3 spillere | Charlottenlund | Charlottenlund 1 |
| 2025/2026 | U09 (2) | 3 spillere | Dalum Hjallese BK | Dalum Hjallese BK 1; Dalum Hjallese BK 2 |
| 2025/2026 | U09 (2) | 3 spillere | Drive | Drive 1; Drive 2 |
| 2025/2026 | U09 (2) | 3 spillere | Elbohallen 1 Beg. | Elbohallen 1 Beg. |
| 2025/2026 | U09 (2) | 3 spillere | Fredensborg | Fredensborg 1 |
| 2025/2026 | U09 (2) | 3 spillere | Frederiksberg | Frederiksberg 1 |
| 2025/2026 | U09 (2) | 3 spillere | Gentofte | Gentofte 1; Gentofte 2 |
| 2025/2026 | U09 (2) | 3 spillere | Gistrup LKB | Gistrup LKB 1 |
| 2025/2026 | U09 (2) | 3 spillere | Gladsaxe Søborg | Gladsaxe Søborg 1; Gladsaxe Søborg 2; Gladsaxe Søborg 3; Gladsaxe Søborg 4; Gladsaxe Søborg 5 |
| 2025/2026 | U09 (2) | 3 spillere | Grindsted BK | Grindsted BK 1 |
| 2025/2026 | U09 (2) | 3 spillere | Grindsted BK 1 Geng. | Grindsted BK 1 Geng. |
| 2025/2026 | U09 (2) | 3 spillere | Grønbjerg | Grønbjerg 1 |
| 2025/2026 | U09 (2) | 3 spillere | Hillerød | Hillerød 1; Hillerød 2 |
| 2025/2026 | U09 (2) | 3 spillere | Hjørring | Hjørring 1; Hjørring 2; Hjørring 3; Hjørring 4 |
| 2025/2026 | U09 (2) | 3 spillere | HOG Badminton, Hinnerup | HOG Badminton, Hinnerup 1; HOG Badminton, Hinnerup 11 |
| 2025/2026 | U09 (2) | 3 spillere | Holbæk | Holbæk 1 |
| 2025/2026 | U09 (2) | 3 spillere | Hornslet IF | Hornslet IF 1; Hornslet IF 11; Hornslet IF 2; Hornslet IF 22 |
| 2025/2026 | U09 (2) | 3 spillere | Horsens | Horsens 1; Horsens 11 |
| 2025/2026 | U09 (2) | 3 spillere | Hvidovre | Hvidovre 1 |
| 2025/2026 | U09 (2) | 3 spillere | Højbjerg | Højbjerg 1; Højbjerg 11; Højbjerg 2; Højbjerg 22; Højbjerg 3; Højbjerg 33 |
| 2025/2026 | U09 (2) | 3 spillere | Højby S&G | Højby S&G 1 |
| 2025/2026 | U09 (2) | 3 spillere | Islands Brygge | Islands Brygge 1 |
| 2025/2026 | U09 (2) | 3 spillere | KBK Kbh. | KBK Kbh. 1 |
| 2025/2026 | U09 (2) | 3 spillere | KMB2010 | KMB2010 1 |
| 2025/2026 | U09 (2) | 3 spillere | Kolding BK | Kolding BK 1 |
| 2025/2026 | U09 (2) | 3 spillere | Kolding BK 1 Geng. | Kolding BK 1 Geng. |
| 2025/2026 | U09 (2) | 3 spillere | Lillerød | Lillerød 1 |
| 2025/2026 | U09 (2) | 3 spillere | Lindholm | Lindholm 1; Lindholm 2; Lindholm 3 |
| 2025/2026 | U09 (2) | 3 spillere | Lund | Lund 1 |
| 2025/2026 | U09 (2) | 3 spillere | Lyngby | Lyngby 1; Lyngby 2 |
| 2025/2026 | U09 (2) | 3 spillere | Mejrup G og UF | Mejrup G og UF 1 |
| 2025/2026 | U09 (2) | 3 spillere | NBK Amager | NBK Amager 1 |
| 2025/2026 | U09 (2) | 3 spillere | Odder | Odder 1 |
| 2025/2026 | U09 (2) | 3 spillere | Odense OBK | Odense OBK 1 (Disp); Odense OBK 2; Odense OBK 3 |
| 2025/2026 | U09 (2) | 3 spillere | Oksbøl Badminton Klub 1 Beg. | Oksbøl Badminton Klub 1 Beg. |
| 2025/2026 | U09 (2) | 3 spillere | Ribe | Ribe 1; Ribe 11; Ribe 2; Ribe 22 |
| 2025/2026 | U09 (2) | 3 spillere | Ringkøbing | Ringkøbing 1 |
| 2025/2026 | U09 (2) | 3 spillere | Ringsted | Ringsted; Ringsted 1 |
| 2025/2026 | U09 (2) | 3 spillere | Rosendal | Rosendal 1; Rosendal 2 |
| 2025/2026 | U09 (2) | 3 spillere | Rudersdal | Rudersdal; Rudersdal 1 |
| 2025/2026 | U09 (2) | 3 spillere | Ry | Ry 1; Ry 11 |
| 2025/2026 | U09 (2) | 3 spillere | Rødekro | Rødekro 1 |
| 2025/2026 | U09 (2) | 3 spillere | Sdr. Hygum | Sdr. Hygum 1; Sdr. Hygum 11; Sdr. Hygum 2 (U9C hold); Sdr. Hygum 22 (U9C hold) |
| 2025/2026 | U09 (2) | 3 spillere | Skovshoved | Skovshoved 1; Skovshoved 2; Skovshoved 3 |
| 2025/2026 | U09 (2) | 3 spillere | Solbjerg | Solbjerg 1 |
| 2025/2026 | U09 (2) | 3 spillere | Solrød Strand | Solrød Strand 1; Solrød Strand 2; Solrød Strand 3 |
| 2025/2026 | U09 (2) | 3 spillere | Sorring | Sorring 1; Sorring 11 |
| 2025/2026 | U09 (2) | 3 spillere | St. Restrup | St. Restrup 1 |
| 2025/2026 | U09 (2) | 3 spillere | Stavtrup | Stavtrup 1; Stavtrup 11; Stavtrup 2; Stavtrup 22 |
| 2025/2026 | U09 (2) | 3 spillere | Støvring | Støvring 1; Støvring 2; Støvring 3; Støvring 5; Støvring 6; Støvring 7 |
| 2025/2026 | U09 (2) | 3 spillere | Svenstrup | Svenstrup 1; Svenstrup 2; Svenstrup 3; Svenstrup 4; Svenstrup 5; Svenstrup 6; Svenstrup 7 |
| 2025/2026 | U09 (2) | 3 spillere | Tarup-Pårup | Tarup-Pårup 1 |
| 2025/2026 | U09 (2) | 3 spillere | Team Vejleå | Team Vejleå 1 |
| 2025/2026 | U09 (2) | 3 spillere | Team-DFS9 | Team-DFS9 1 |
| 2025/2026 | U09 (2) | 3 spillere | Tranbjerg AIA | Tranbjerg AIA 1; Tranbjerg AIA 11; Tranbjerg AIA 2 |
| 2025/2026 | U09 (2) | 3 spillere | Valby BC | Valby BC 1 |
| 2025/2026 | U09 (2) | 3 spillere | Vester Hassing | Vester Hassing 1 |
| 2025/2026 | U09 (2) | 3 spillere | Viby J | Viby J 1; Viby J 11; Viby J 2; Viby J 22; Viby J 3 |
| 2025/2026 | U09 (2) | 3 spillere | Vinding SF | Vinding SF 1; Vinding SF 11 |
| 2025/2026 | U09 (2) | 3 spillere | Vinding SF 2 Beg. | Vinding SF 2 Beg. |
| 2025/2026 | U09 (2) | 3 spillere | Ølstykke | &#216;lstykke 1 |
| 2025/2026 | U09 (2) | 3 spillere | Aalborg Triton | Aalborg Triton 1; Aalborg Triton 2; Aalborg Triton 3; Aalborg Triton 4 |
| 2025/2026 | U09 (2) | 3 spillere | Aarhus AB | Aarhus AB 1; Aarhus AB 11; Aarhus AB 2; Aarhus AB 22; Aarhus AB 3; Aarhus AB 33; Aarhus AB 4 |
| 2025/2026 | U13 (4) | 4+3 | Badminton Esbjerg | Badminton Esbjerg 1 |
| 2025/2026 | U13 (4) | 4+3 | Gentofte | Gentofte 1 |
| 2025/2026 | U13 (4) | 4+3 | Højbjerg | Højbjerg 1 |
| 2025/2026 | U13 (4) | 4+3 | Kolding-Rødekro | Kolding-Rødekro 1 |
| 2025/2026 | U13 (4) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2025/2026 | U13 (4) | 4+3 | Team Stor Aalborg | Team Stor Aalborg 1 |
| 2025/2026 | U15 (5) | 4+3 | Herning | Herning 2 |
| 2025/2026 | U15 (5) | 4+3 | Højbjerg | Højbjerg 1 |
| 2025/2026 | U15 (5) | 4+3 | Odense OBK | Odense OBK 4 |
| 2025/2026 | U15 (5) | 4+3 | Solrød Strand | Solrød Strand 1 |
| 2025/2026 | U15 (5) | 4+3 | Team Sydjylland | Team Sydjylland 1 |
| 2025/2026 | U15 (5) | 4+3 | Viby J | Viby J 1 |
| 2025/2026 | U15 (5) | 4+3 | Værløse | Værløse 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Badminton Esbjerg | Badminton Esbjerg 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | BC37 Amager | BC37 Amager 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Glamsdalen | Glamsdalen 1; Glamsdalen 2 |
| 2025/2026 | U17/U19 (18) | 4+2 | Gørlev Idrætsefterskole | Gørlev Idrætsefterskole 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole 1; Hjemly Idrætsefterskole 2; Hjemly Idrætsefterskole 2 (xtra); Hjemly Idrætsefterskole 3; Hjemly Idrætsefterskole 3 (xtra) |
| 2025/2026 | U17/U19 (18) | 4+2 | Hvidovre | Hvidovre 2 |
| 2025/2026 | U17/U19 (18) | 4+2 | Haarby Efterskole | Haarby Efterskole 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Ikast | Ikast 1; Ikast 2; Ikast 3 |
| 2025/2026 | U17/U19 (18) | 4+2 | KMB2010 | KMB2010 3 |
| 2025/2026 | U17/U19 (18) | 4+2 | Kolding BK | Kolding BK 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Lillerød | Lillerød 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Rønde Efterskole | Rønde Efterskole 1; Rønde Efterskole 2; Rønde Efterskole 3; Rønde Efterskole 4; Rønde Efterskole 5; Rønde Efterskole 6 |
| 2025/2026 | U17/U19 (18) | 4+2 | Sjælsølund SES | Sjælsølund SES 1; Sjælsølund SES 2; Sjælsølund SES 3 |
| 2025/2026 | U17/U19 (18) | 4+2 | Skovshoved | Skovshoved 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Solrød Strand | Solrød Strand 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Sportsefterskolen SINE | Sportsefterskolen SINE 1; Sportsefterskolen SINE 2; Sportsefterskolen SINE 3 |
| 2025/2026 | U17/U19 (18) | 4+2 | Strib Idrætsefterskole | Strib Idrætsefterskole 1; Strib Idrætsefterskole 3 |
| 2025/2026 | U17/U19 (18) | 4+2 | Sundeved Efterskole | Sundeved Efterskole 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Vivild Idrætsefterskole | Vivild Idrætsefterskole 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | Vojens GI | Vojens GI 1; Vojens GI 2 |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | 3 spillere | Dronninglund | Dronninglund 1 |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | 3 spillere | Vejgaard | Vejgaard 1 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | Drive | Drive 7 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | Gladsaxe Søborg | Gladsaxe Søborg 3; Gladsaxe Søborg 4; Gladsaxe Søborg 5 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | Holbæk | Holbæk 2 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | Hvidovre | Hvidovre 4 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | KBK Kbh. | KBK Kbh. 6 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | KMB2010 | KMB2010 4 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | Rudersdal | Rudersdal 1 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | Skovshoved | Skovshoved 6 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | Solrød Strand | Solrød Strand 5 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Badminton Roskilde | Badminton Roskilde 2; Badminton Roskilde 3 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Dragør | Dragør 1 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Drive | Drive 6 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | FKIF Frederiksberg | FKIF Frederiksberg 1 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Gentofte | Gentofte 2 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Gladsaxe Søborg | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Greve | Greve 3 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Holbæk | Holbæk 2 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Hvidovre | Hvidovre 4 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | KBK Kbh. | KBK Kbh. 6 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | KMB2010 | KMB2010 5; KMB2010 6 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Lundtofte | Lundtofte 4 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Rudersdal | Rudersdal 1 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | Skovshoved | Skovshoved 4; Skovshoved 5 |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | 4+2 | Brøruphus Efterskole | Brøruphus Efterskole 1 (A) |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | 4+2 | Glamsdalen | Glamsdalen 1 (A) |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | 4+2 | Hjemly Idrætsefterskole | Hjemly Idrætsefterskole 1 (M); Hjemly Idrætsefterskole 2 (A) |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | 4+2 | Rønde Efterskole | Rønde Efterskole 1 (M); Rønde Efterskole 2 (A) |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | 4+2 | Sportsefterskolen SINE | Sportsefterskolen SINE 1 (M); Sportsefterskolen SINE 2 (A) |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | 4+2 | Strib Idrætsefterskole | Strib Idrætsefterskole 1 (A) |

Regions-/kredshold og slash-samarbejder i øverste format vises særskilt, ikke som klubber:

| Sæson | Alder | Format | Type | Enhedsnavn | Rå holdnavne |
| --- | --- | --- | --- | --- | --- |
| 2013/2014 | U15 (5) | 4+3 | slash-samarbejde | Herning/Skive-Resen | Herning/Skive-Resen |
| 2014/2015 | U11 (3) | 4+3 | slash-samarbejde | Lillerød 1 /Hillerød | Lillerød 1 /Hillerød |
| 2014/2015 | U17 (6) | 4+3 | regions-/kredshold | DGI Roskilde | DGI Roskilde |
| 2015/2016 | U11 (3) | 4+3 | regions-/kredshold | Badminton Fyn | Badminton Fyn |
| 2015/2016 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2015/2016 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2015/2016 | U11 (3) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2015/2016 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2015/2016 | U17 (6) | 4+3 | slash-samarbejde | Lolland/Falster | Lolland/Falster |
| 2016/2017 | U11 (3) | 4+3 | regions-/kredshold | Badminton Fyn | Badminton Fyn |
| 2016/2017 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2016/2017 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2016/2017 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2016/2017 | U13 (4) | 4+3 | slash-samarbejde | Holbæk/Badminton Roskilde U13 | Holbæk/Badminton Roskilde U13 |
| 2016/2017 | U15 (5) | 4+3 | slash-samarbejde | Ølstykke-Herlev/Hjorten | &#216;lstykke-Herlev/Hjorten 1 |
| 2017/2018 | U11 (3) | 4+3 | regions-/kredshold | Badminton Fyn | Badminton Fyn |
| 2017/2018 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2017/2018 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2017/2018 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2018/2019 | U11 (3) | 4+3 | regions-/kredshold | Badminton Fyn | Badminton Fyn |
| 2018/2019 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2018/2019 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2018/2019 | U11 (3) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2018/2019 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2018/2019 | U15 (5) | 4+3 | slash-samarbejde | GBK/KMB2010 | GBK/KMB2010 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | slash-samarbejde | HB2000/Taastrup Badminton | HB2000/Taastrup Badminton; HB2000/Taastrup Badminton 1 |
| 2018/2019 | U17/U19 (18) | 4+2 | slash-samarbejde | Horsens/Brædstrup | Horsens/Brædstrup |
| 2019/2020 | U11 (3) | 4+3 | regions-/kredshold | Badminton Fyn | Badminton Fyn |
| 2019/2020 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2019/2020 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2019/2020 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2019/2020 | U13 (4) | 4+3 | slash-samarbejde | ABC Aalborg / Gug | ABC Aalborg / Gug 1 |
| 2019/2020 | U13 (4) | 4+3 | slash-samarbejde | Ringsted/Værløse | Ringsted/Værløse 1 |
| 2020/2021 | U09 (2) | 4 spillere | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten 1 |
| 2020/2021 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2020/2021 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2020/2021 | U11 (3) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2020/2021 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2020/2021 | U11 (3) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2020/2021 | U15 (5) | 4+3 | slash-samarbejde | AB/Viby | AB/Viby 1 |
| 2020/2021 | U15 (5) | 4+3 | slash-samarbejde | Herning/Silkeborg BK | Herning/Silkeborg BK 1 |
| 2020/2021 | U15 (5) | 4+3 | slash-samarbejde | Højbjerg/Horsens | Højbjerg/Horsens 1 |
| 2021/2022 | U09 (2) | 4 spillere | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten 1 |
| 2021/2022 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2021/2022 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2021/2022 | U11 (3) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2021/2022 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2021/2022 | U11 (3) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2021/2022 | U13 (4) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2021/2022 | U13 (4) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2021/2022 | U13 (4) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2021/2022 | U13 (4) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2021/2022 | U13 (4) | 4+3 | slash-samarbejde | Gentofte/KMB2010 | Gentofte/KMB2010 1 |
| 2021/2022 | U13 (4) | 4+3 | slash-samarbejde | Team FKIF/KBK/HBC | Team FKIF/KBK/HBC 1 |
| 2021/2022 | U15 (5) | 4+3 | slash-samarbejde | Højbjerg/Horsens | Højbjerg/Horsens 1 |
| 2021/2022 | U15 (5) | 4+3 | slash-samarbejde | Team KBK/Drive/Jernløse | Team KBK/Drive/Jernløse 1 |
| 2021/2022 | U15 (5) | 4+3 | slash-samarbejde | Vejle/Kolding | Vejle/Kolding 1 |
| 2022/2023 | U09 (2) | 4 spillere | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten; Herlev/Hjorten 1 |
| 2022/2023 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2022/2023 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2022/2023 | U11 (3) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2022/2023 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2022/2023 | U13 (4) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2022/2023 | U13 (4) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2022/2023 | U13 (4) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2022/2023 | U13 (4) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2022/2023 | U13 (4) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2022/2023 | U13 (4) | 4+3 | slash-samarbejde | KBK/Drive/ | KBK/Drive/(Gentofte) 1 |
| 2022/2023 | U13 (4) | 4+3 | slash-samarbejde | Kolding/Fyn | Kolding/Fyn 1 |
| 2022/2023 | U17/U19 (18) | 4+2 | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten 1; Herlev/Hjorten 11; Herlev/Hjorten 2; Herlev/Hjorten 22 |
| 2022/2023 | U17/U19 (18) | 4+2 | slash-samarbejde | Vanløse/FKIF | Vanløse/FKIF 1 |
| 2023/2024 | U09 (2) | 4 spillere | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten; Herlev/Hjorten 1 |
| 2023/2024 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2023/2024 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2023/2024 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2023/2024 | U11 (3) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2023/2024 | U13 (4) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2023/2024 | U13 (4) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2023/2024 | U13 (4) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2023/2024 | U13 (4) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2023/2024 | U13 (4) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2023/2024 | U13 (4) | 4+3 | slash-samarbejde | GBK/CBK | GBK/CBK 1 |
| 2023/2024 | U13 (4) | 4+3 | slash-samarbejde | KMB2010/Drive | KMB2010/Drive 1 |
| 2023/2024 | U13 (4) | 4+3 | slash-samarbejde | Lyngby/KBK | Lyngby/KBK 1 |
| 2023/2024 | U15 (5) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2023/2024 | U15 (5) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2023/2024 | U15 (5) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2023/2024 | U15 (5) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2023/2024 | U17/U19 (18) | 4+2 | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten; Herlev/Hjorten 1; Herlev/Hjorten 2 |
| 2023/2024 | U17/U19 (18) | 4+2 | slash-samarbejde | Team Køge/Skælskør | Team Køge/Skælskør 1 |
| 2023/2024 | U17/U19 (18) | 4+2 | slash-samarbejde | Team-Work Bjergby-Mygdal/Fr.Havn | Team-Work Bjergby-Mygdal/Fr.Havn 1 |
| 2024/2025 | U09 (2) | 4 spillere | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten 1 |
| 2024/2025 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2024/2025 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2024/2025 | U11 (3) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2024/2025 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2024/2025 | U11 (3) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2024/2025 | U13 (4) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2024/2025 | U13 (4) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2024/2025 | U13 (4) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2024/2025 | U13 (4) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2024/2025 | U13 (4) | 4+3 | slash-samarbejde | AB/Horsens | AB/Horsens 1 |
| 2024/2025 | U13 (4) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2024/2025 | U13 (4) | 4+3 | slash-samarbejde | CBK/GBK/KMB2010 | CBK/GBK/KMB2010 1 |
| 2024/2025 | U13 (4) | 4+3 | slash-samarbejde | Lyngby/KBK | Lyngby/KBK 1 |
| 2024/2025 | U13 (4) | 4+3 | slash-samarbejde | OBK/Langeskov | OBK/Langeskov 1 |
| 2024/2025 | U13 (4) | 4+3 | slash-samarbejde | Viby/Grenå | Viby/Grenå 1 |
| 2024/2025 | U15 (5) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2024/2025 | U15 (5) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2024/2025 | U15 (5) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2024/2025 | U15 (5) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2024/2025 | U15 (5) | 4+3 | slash-samarbejde | abc Aalborg/FBK | abc Aalborg/FBK; abc Aalborg/FBK 1 |
| 2024/2025 | U15 (5) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2024/2025 | U15 (5) | 4+3 | slash-samarbejde | HBC/FKIF | HBC/FKIF 1 |
| 2024/2025 | U15 (5) | 4+3 | slash-samarbejde | OBK/Bolbro/KRIF | OBK/Bolbro/KRIF 1 |
| 2024/2025 | U15 (5) | 4+3 | slash-samarbejde | OBK/TPI/Svendborg | OBK/TPI/Svendborg; OBK/TPI/Svendborg 1 |
| 2024/2025 | U15 (5) | 4+3 | slash-samarbejde | Vejle/Kolding | Vejle/Kolding; Vejle/Kolding 1 |
| 2024/2025 | U17/U19 (18) | 4+2 | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten 3 |
| 2024/2025 | U17/U19 (18) | 4+2 | slash-samarbejde | Team Køge/Holbæk | Team Køge/Holbæk 1 |
| 2025/2026 | U09 (2) | 3 spillere | slash-samarbejde | Gørding/ Lourup 1 Beg. | Gørding/ Lourup 1 Beg. |
| 2025/2026 | U09 (2) | 3 spillere | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten 1 |
| 2025/2026 | U11 (3) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2025/2026 | U11 (3) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2025/2026 | U11 (3) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2025/2026 | U11 (3) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2025/2026 | U11 (3) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2025/2026 | U13 (4) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2025/2026 | U13 (4) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2025/2026 | U13 (4) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2025/2026 | U13 (4) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2025/2026 | U13 (4) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2025/2026 | U13 (4) | 4+3 | slash-samarbejde | Horsens/Vinding Badminton | Horsens/Vinding Badminton 1 |
| 2025/2026 | U13 (4) | 4+3 | slash-samarbejde | Køge/Badminton Roskilde | Køge/Badminton Roskilde 1 |
| 2025/2026 | U13 (4) | 4+3 | slash-samarbejde | OBK/Svendborg/Langeskov | OBK/Svendborg/Langeskov 1 |
| 2025/2026 | U13 (4) | 4+3 | slash-samarbejde | Viby/Randers/Grenå | Viby/Randers/Grenå 3 |
| 2025/2026 | U15 (5) | 4+3 | regions-/kredshold | Badminton København | Badminton København |
| 2025/2026 | U15 (5) | 4+3 | regions-/kredshold | Badminton Midtjylland | Badminton Midtjylland |
| 2025/2026 | U15 (5) | 4+3 | regions-/kredshold | Badminton Nordjylland | Badminton Nordjylland |
| 2025/2026 | U15 (5) | 4+3 | regions-/kredshold | Badminton Sjælland | Badminton Sjælland |
| 2025/2026 | U15 (5) | 4+3 | slash-samarbejde | BADFYN/BADSDRJ | BADFYN/BADSDRJ |
| 2025/2026 | U15 (5) | 4+3 | slash-samarbejde | HBC/Gentofte | HBC/Gentofte 1 |
| 2025/2026 | U15 (5) | 4+3 | slash-samarbejde | KBK Kbh./Drive | KBK Kbh./Drive 1 |
| 2025/2026 | U15 (5) | 4+3 | slash-samarbejde | LBK/KMB2010 | LBK/KMB2010 1 |
| 2025/2026 | U15 (5) | 4+3 | slash-samarbejde | Aarhus AB/Randers BK | Aarhus AB/Randers BK 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | slash-samarbejde | Dybbøl/Graasten | Dybbøl/Graasten 1 |
| 2025/2026 | U17/U19 (18) | 4+2 | slash-samarbejde | Greve/Skælskør/Ølstykke | Greve/Skælskør/&#216;lstykke 1 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 2+2 | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten 5; Herlev/Hjorten 6 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | slash-samarbejde | Herlev/Hjorten | Herlev/Hjorten 6; Herlev/Hjorten 7 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | slash-samarbejde | LBK/SBK/SLBK | LBK/SBK/SLBK 2 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | 2+2 | slash-samarbejde | Slangerup/Holte | Slangerup/Holte 2 |

Samarbejder med slash bevares som én normaliseret enhed. Udgåede/trukne hold er udeladt fra klublisten og vises separat i JSON pr. sæson/aldersgruppe.

### Klubnavnenormalisering — ændrede rå navne

HTML-entiteter er dekodet før normalisering; parentestekst, stjernemarkerede noter, statusmarkører (fx UDGÅET/trukket) og trailing holdnummer fjernes. Normaliseringen ændrede 1348 af 2194 holdnavneforekomster i højeste-format-klublisterne, fordelt på 357 forskellige rå navne (1035 rå-navn/sæson-alder-forekomster). Tabellen viser alle ændrede rå-varianter:

| Råt holdnavn | Normaliseret klubnavn | Sæson/aldersgruppe-forekomster |
| --- | --- | --- |
| &#216;lstykke | Ølstykke | 2 |
| &#216;lstykke 1 | Ølstykke | 3 |
| abc Aalborg 1 | abc Aalborg | 8 |
| abc Aalborg 2 | abc Aalborg | 1 |
| abc Aalborg UDG&#197;ET | abc Aalborg | 1 |
| Alminde Viuf 1 | Alminde Viuf | 1 |
| Andst 1 | Andst | 1 |
| Badminton Esbjerg 1 | Badminton Esbjerg | 8 |
| Badminton Esbjerg 11 | Badminton Esbjerg | 1 |
| Badminton Esbjerg 2 | Badminton Esbjerg | 5 |
| Badminton Esbjerg 22 | Badminton Esbjerg | 1 |
| Badminton Esbjerg 3 | Badminton Esbjerg | 3 |
| Badminton Esbjerg 4 | Badminton Esbjerg | 2 |
| Badminton Esbjerg 5 | Badminton Esbjerg | 1 |
| Badminton i indre By 1 | Badminton i indre By | 1 |
| Badminton Roskilde 1 | Badminton Roskilde | 5 |
| Badminton Roskilde 2 | Badminton Roskilde | 1 |
| Badminton Roskilde 3 | Badminton Roskilde | 1 |
| BC37 Amager 1 | BC37 Amager | 9 |
| Bindslev-Tversted 1 | Bindslev-Tversted | 1 |
| Bjergby-Mygdal 1 | Bjergby-Mygdal | 4 |
| Blans Sundeved 1 | Blans Sundeved | 1 |
| Blenstrup 1 | Blenstrup | 1 |
| Blåkilde Efterskole 1 | Blåkilde Efterskole | 3 |
| Blåkilde Efterskole 2 | Blåkilde Efterskole | 1 |
| Brabrand 1 | Brabrand | 3 |
| Brabrand 11 | Brabrand | 1 |
| Brabrand 2 | Brabrand | 1 |
| Brabrand 22 | Brabrand | 1 |
| Brøndby BK 1 | Brøndby BK | 1 |
| Brønderslev 1 | Brønderslev | 6 |
| Brønderslev 2 | Brønderslev | 1 |
| Brørup 1 | Brørup | 1 |
| Brøruphus Efterskole 1 | Brøruphus Efterskole | 3 |
| Brøruphus Efterskole 1 (A) | Brøruphus Efterskole | 1 |
| Brøruphus Efterskole 2 (xtra) | Brøruphus Efterskole | 1 |
| Brøruphus Efterskole 3 | Brøruphus Efterskole | 1 |
| Charlottenlund 1 | Charlottenlund | 4 |
| Dall-Ferslev 1 | Dall-Ferslev | 1 |
| Dall-Ferslev 2 | Dall-Ferslev | 1 |
| Dalum Hjallese BK 1 | Dalum Hjallese BK | 1 |
| Dalum Hjallese BK 2 | Dalum Hjallese BK | 1 |
| Dalum-OBK 1 | Dalum-OBK | 1 |
| Dragør 1 | Dragør | 3 |
| Drive 1 | Drive | 6 |
| Drive 2 | Drive | 3 |
| Drive 6 | Drive | 1 |
| Drive 7 | Drive | 1 |
| Dronninglund 1 | Dronninglund | 1 |
| Dybbøl 1 | Dybbøl | 2 |
| Dybbøl 2 | Dybbøl | 1 |
| Efterskolen Play 1 | Efterskolen Play | 1 |
| Efterskolen Solgården 1 | Efterskolen Solgården | 1 |
| Fanø 1 | Fanø | 1 |
| Farsø 1 | Farsø | 2 |
| Farsø 2 | Farsø | 1 |
| Fjer Fyn 1 | Fjer Fyn | 1 |
| FKIF Frederiksberg 1 | FKIF Frederiksberg | 4 |
| Fredensborg 1 | Fredensborg | 1 |
| Frederiksberg 1 | Frederiksberg | 4 |
| Frederikssund 1 | Frederikssund | 1 |
| FSK Furesø 1 | FSK Furesø | 1 |
| Furesø 1 | Furesø | 1 |
| Galten FS 1 | Galten FS | 1 |
| Gentofte 1 | Gentofte | 14 |
| Gentofte 2 | Gentofte | 3 |
| Gilleleje 1 | Gilleleje | 1 |
| Gistrup LKB 1 | Gistrup LKB | 3 |
| Gladsaxe Søborg 1 | Gladsaxe Søborg | 8 |
| Gladsaxe Søborg 2 | Gladsaxe Søborg | 5 |
| Gladsaxe Søborg 3 | Gladsaxe Søborg | 2 |
| Gladsaxe Søborg 4 | Gladsaxe Søborg | 2 |
| Gladsaxe Søborg 5 | Gladsaxe Søborg | 2 |
| Glamsdalen 1 | Glamsdalen | 7 |
| Glamsdalen 1 (A) | Glamsdalen | 1 |
| Glamsdalen 2 | Glamsdalen | 5 |
| Glamsdalen 2 (xtra) | Glamsdalen | 1 |
| Glumsø 1 | Glumsø | 1 |
| Greve 1 | Greve | 20 |
| Greve 1 *alders disp. | Greve | 1 |
| Greve 2 | Greve | 3 |
| Greve 3 | Greve | 1 |
| Grindsted BK 1 | Grindsted BK | 2 |
| Grønbjerg 1 | Grønbjerg | 1 |
| Grønsund 1 | Grønsund | 5 |
| Grønsund 2 | Grønsund | 1 |
| Graasten 1 | Graasten | 2 |
| Gug 1 | Gug | 3 |
| Gørlev Idrætsefterskole 1 | Gørlev Idrætsefterskole | 7 |
| Gørlev Idrætsefterskole 1 (A) | Gørlev Idrætsefterskole | 1 |
| Gørlev Idrætsefterskole 2 | Gørlev Idrætsefterskole | 1 |
| Hadsund 1 | Hadsund | 1 |
| Hammel 1 | Hammel | 1 |
| Herlufsholm 1 | Herlufsholm | 1 |
| Herning 1 | Herning | 7 |
| Herning 2 | Herning | 1 |
| Hillerød 1 | Hillerød | 19 |
| Hillerød 2 | Hillerød | 1 |
| Himmerlands Ungdomsskole 1 | Himmerlands Ungdomsskole | 1 |
| Hjemly Idrætsefterskole 1 | Hjemly Idrætsefterskole | 7 |
| Hjemly Idrætsefterskole 1 (M) | Hjemly Idrætsefterskole | 1 |
| Hjemly Idrætsefterskole 2 | Hjemly Idrætsefterskole | 6 |
| Hjemly Idrætsefterskole 2 (A) | Hjemly Idrætsefterskole | 1 |
| Hjemly Idrætsefterskole 2 (M) | Hjemly Idrætsefterskole | 1 |
| Hjemly Idrætsefterskole 2 (xtra) | Hjemly Idrætsefterskole | 1 |
| Hjemly Idrætsefterskole 3 | Hjemly Idrætsefterskole | 5 |
| Hjemly Idrætsefterskole 3 (xtra) | Hjemly Idrætsefterskole | 1 |
| Hjemly Idrætsefterskole 4 | Hjemly Idrætsefterskole | 1 |
| Hjørring 1 | Hjørring | 6 |
| Hjørring 2 | Hjørring | 2 |
| Hjørring 3 | Hjørring | 1 |
| Hjørring 4 | Hjørring | 1 |
| Hobro 1 | Hobro | 1 |
| HOG Badminton, Hinnerup 1 | HOG Badminton, Hinnerup | 7 |
| HOG Badminton, Hinnerup 11 | HOG Badminton, Hinnerup | 1 |
| Holbæk 1 | Holbæk | 6 |
| Holbæk 2 | Holbæk | 2 |
| Hornslet IF 1 | Hornslet IF | 1 |
| Hornslet IF 11 | Hornslet IF | 1 |
| Hornslet IF 2 | Hornslet IF | 1 |
| Hornslet IF 22 | Hornslet IF | 1 |
| Horsens 1 | Horsens | 3 |
| Horsens 11 | Horsens | 1 |
| Humlebæk 1 | Humlebæk | 2 |
| Hvidovre 1 | Hvidovre | 11 |
| Hvidovre 2 | Hvidovre | 3 |
| Hvidovre 4 | Hvidovre | 2 |
| Højbjerg 1 | Højbjerg | 33 |
| Højbjerg 1 (2400) | Højbjerg | 1 |
| Højbjerg 11 | Højbjerg | 1 |
| Højbjerg 2 | Højbjerg | 18 |
| Højbjerg 2 (2400) | Højbjerg | 1 |
| Højbjerg 22 | Højbjerg | 1 |
| Højbjerg 3 | Højbjerg | 7 |
| Højbjerg 3 (2400) | Højbjerg | 1 |
| Højbjerg 33 | Højbjerg | 1 |
| Højbjerg 4 | Højbjerg | 3 |
| Højby S&G 1 | Højby S&G | 1 |
| Hørby Efterskole 1 | Hørby Efterskole | 1 |
| Hørning IF 1 | Hørning IF | 1 |
| Hørsholm 1 | Hørsholm | 1 |
| Haarby Efterskole 1 | Haarby Efterskole | 2 |
| Ikast 1 | Ikast | 9 |
| Ikast 2 | Ikast | 9 |
| Ikast 3 | Ikast | 1 |
| Ishøj SB 50 1 | Ishøj SB 50 | 1 |
| Islands Brygge 1 | Islands Brygge | 5 |
| Jetsmark 1 | Jetsmark | 1 |
| KBK Kbh. 1 | KBK Kbh. | 13 |
| KBK Kbh. 2 | KBK Kbh. | 2 |
| KBK Kbh. 6 | KBK Kbh. | 2 |
| Klarup Badminton 1 | Klarup Badminton | 1 |
| KMB2010 1 | KMB2010 | 5 |
| KMB2010 2 | KMB2010 | 1 |
| KMB2010 3 | KMB2010 | 1 |
| KMB2010 4 | KMB2010 | 1 |
| KMB2010 5 | KMB2010 | 1 |
| KMB2010 6 | KMB2010 | 1 |
| Kolding BK 1 | Kolding BK | 17 |
| Kolding BK 2 | Kolding BK | 5 |
| Kolding BK 3 | Kolding BK | 1 |
| Kolding-Rødekro 1 | Kolding-Rødekro | 1 |
| Køge 1 | Køge | 2 |
| Langhøj 1 | Langhøj | 1 |
| Lejre 1 | Lejre | 1 |
| Lillerød 1 | Lillerød | 21 |
| Lillerød 2 | Lillerød | 3 |
| Lindholm 1 | Lindholm | 2 |
| Lindholm 2 | Lindholm | 1 |
| Lindholm 3 | Lindholm | 2 |
| Lund 1 | Lund | 1 |
| Lundtofte 4 | Lundtofte | 1 |
| Lyngby 1 | Lyngby | 14 |
| Lyngby 2 | Lyngby | 5 |
| Mejrup G og UF 1 | Mejrup G og UF | 1 |
| Middelfart 1 | Middelfart | 1 |
| NBK Amager 1 | NBK Amager | 1 |
| Nivå-Kokkedal 1 | Nivå-Kokkedal | 1 |
| Nordbyens Badmintonklub 1 | Nordbyens Badmintonklub | 1 |
| Nyborg 1 | Nyborg | 1 |
| Nørager HCI 1 | Nørager HCI | 1 |
| Nørre Nissum Efterskole 1 | Nørre Nissum Efterskole | 1 |
| Odder 1 | Odder | 1 |
| Odense OBK 1 | Odense OBK | 15 |
| Odense OBK 1 (Disp) | Odense OBK | 1 |
| Odense OBK 2 | Odense OBK | 5 |
| Odense OBK 3 | Odense OBK | 1 |
| Odense OBK 4 | Odense OBK | 1 |
| Oksbøl Badminton Klub 1 | Oksbøl Badminton Klub | 1 |
| Poulstrup Vrejlev 1 | Poulstrup Vrejlev | 1 |
| Randers BK 1 | Randers BK | 1 |
| Rebild Efterskole 1 | Rebild Efterskole | 2 |
| Ribe 1 | Ribe | 2 |
| Ribe 11 | Ribe | 1 |
| Ribe 2 | Ribe | 1 |
| Ribe 22 | Ribe | 1 |
| Ringkøbing 1 | Ringkøbing | 1 |
| Ringsted 1 | Ringsted | 1 |
| Rosendal 1 | Rosendal | 2 |
| Rosendal 2 | Rosendal | 2 |
| Roskilde HBK 1 | Roskilde HBK | 4 |
| Rudehøj Efterskole 1 | Rudehøj Efterskole | 1 |
| Rudersdal 1 | Rudersdal | 5 |
| Ry 1 | Ry | 2 |
| Ry 11 | Ry | 1 |
| Rødekro 1 | Rødekro | 1 |
| Rødovre 1 | Rødovre | 1 |
| Rønde Efterskole 1 | Rønde Efterskole | 7 |
| Rønde Efterskole 1 (&#216;M) | Rønde Efterskole | 1 |
| Rønde Efterskole 1 (M) | Rønde Efterskole | 1 |
| Rønde Efterskole 2 | Rønde Efterskole | 7 |
| Rønde Efterskole 2 (&#216;M) | Rønde Efterskole | 1 |
| Rønde Efterskole 2 (A) | Rønde Efterskole | 1 |
| Rønde Efterskole 3 | Rønde Efterskole | 6 |
| Rønde Efterskole 3 (A) | Rønde Efterskole | 1 |
| Rønde Efterskole 4 | Rønde Efterskole | 5 |
| Rønde Efterskole 5 | Rønde Efterskole | 6 |
| Rønde Efterskole 6 | Rønde Efterskole | 4 |
| Rønde Efterskole 7 | Rønde Efterskole | 1 |
| Sabro 1 | Sabro | 1 |
| Sdr. Hygum 1 | Sdr. Hygum | 1 |
| Sdr. Hygum 11 | Sdr. Hygum | 1 |
| Sdr. Hygum 2 (U9C hold) | Sdr. Hygum | 1 |
| Sdr. Hygum 22 (U9C hold) | Sdr. Hygum | 1 |
| Sejs-Svejbæk 1 | Sejs-Svejbæk | 1 |
| SIF Assentoft 1 | SIF Assentoft | 2 |
| Sjælsølund SES 1 | Sjælsølund SES | 6 |
| Sjælsølund SES 2 | Sjælsølund SES | 5 |
| Sjælsølund SES 3 | Sjælsølund SES | 2 |
| Skagen 1 | Skagen | 1 |
| Skalborg SK 1 | Skalborg SK | 2 |
| Skalborg SK 2 | Skalborg SK | 1 |
| Skanderborg Badminton 1 | Skanderborg Badminton | 2 |
| Skovshoved 1 | Skovshoved | 19 |
| Skovshoved 2 | Skovshoved | 4 |
| Skovshoved 3 | Skovshoved | 2 |
| Skovshoved 4 | Skovshoved | 1 |
| Skovshoved 5 | Skovshoved | 1 |
| Skovshoved 6 | Skovshoved | 1 |
| Slagelse 1 | Slagelse | 1 |
| Snejbjerg 1 | Snejbjerg | 1 |
| Solbjerg 1 | Solbjerg | 4 |
| Solrød Strand 1 | Solrød Strand | 39 |
| Solrød Strand 2 | Solrød Strand | 17 |
| Solrød Strand 3 | Solrød Strand | 1 |
| Solrød Strand 5 | Solrød Strand | 1 |
| Sorring 1 | Sorring | 4 |
| Sorring 11 | Sorring | 1 |
| Sportsefterskolen SINE 1 | Sportsefterskolen SINE | 6 |
| Sportsefterskolen SINE 1 (M) | Sportsefterskolen SINE | 1 |
| Sportsefterskolen SINE 2 | Sportsefterskolen SINE | 3 |
| Sportsefterskolen SINE 2 (A) | Sportsefterskolen SINE | 1 |
| Sportsefterskolen SINE 3 | Sportsefterskolen SINE | 2 |
| St. Restrup 1 | St. Restrup | 1 |
| Stavtrup 1 | Stavtrup | 2 |
| Stavtrup 11 | Stavtrup | 1 |
| Stavtrup 2 | Stavtrup | 1 |
| Stavtrup 22 | Stavtrup | 1 |
| Stidsholt IF 1 | Stidsholt IF | 3 |
| Stidsholt IF 2 | Stidsholt IF | 1 |
| Strib Idrætsefterskole 1 | Strib Idrætsefterskole | 7 |
| Strib Idrætsefterskole 1 (A) | Strib Idrætsefterskole | 1 |
| Strib Idrætsefterskole 2 | Strib Idrætsefterskole | 5 |
| Strib Idrætsefterskole 3 | Strib Idrætsefterskole | 4 |
| Støvring 1 | Støvring | 3 |
| Støvring 2 | Støvring | 2 |
| Støvring 3 | Støvring | 1 |
| Støvring 5 | Støvring | 1 |
| Støvring 6 | Støvring | 1 |
| Støvring 7 | Støvring | 1 |
| Sundeved Efterskole 1 | Sundeved Efterskole | 4 |
| Svendborg 1 | Svendborg | 1 |
| Svenstrup 1 | Svenstrup | 9 |
| Svenstrup 2 | Svenstrup | 4 |
| Svenstrup 3 | Svenstrup | 4 |
| Svenstrup 4 | Svenstrup | 1 |
| Svenstrup 5 | Svenstrup | 1 |
| Svenstrup 6 | Svenstrup | 1 |
| Svenstrup 7 | Svenstrup | 1 |
| Sæby 1 | Sæby | 1 |
| Tarup-Pårup 1 | Tarup-Pårup | 1 |
| Team Badminton Esbjerg 1 | Team Badminton Esbjerg | 7 |
| Team Badminton Esbjerg 3 | Team Badminton Esbjerg | 1 |
| Team Badminton Esbjerg 4 | Team Badminton Esbjerg | 1 |
| Team Fyn-Sydjylland 1 | Team Fyn-Sydjylland | 1 |
| Team Gudenåen 1 | Team Gudenåen | 1 |
| Team HJR Sjælland 1 | Team HJR Sjælland | 1 |
| Team København 1 | Team København | 1 |
| Team Metro+ 1 | Team Metro+ | 1 |
| Team Midtsjælland 1 | Team Midtsjælland | 1 |
| Team Nordjylland 1 | Team Nordjylland | 3 |
| Team Nordsjælland 1 | Team Nordsjælland | 1 |
| Team Odense 1 | Team Odense | 1 |
| Team Stor Aalborg 1 | Team Stor Aalborg | 1 |
| Team Stor Aalborg 2 | Team Stor Aalborg | 1 |
| Team Sydjylland &#216;st 1 | Team Sydjylland Øst | 1 |
| Team Sydjylland 1 | Team Sydjylland | 3 |
| Team Sydjylland Vest 1 | Team Sydjylland Vest | 6 |
| Team Sønderjylland 1 | Team Sønderjylland | 1 |
| Team Vejleå 1 | Team Vejleå | 1 |
| Team Aarhus ungdom 1 | Team Aarhus ungdom | 1 |
| Team-DFS9 1 | Team-DFS9 | 1 |
| Thorsager Rønde 1 | Thorsager Rønde | 2 |
| Tirstrup Idrætsefterskole 1 | Tirstrup Idrætsefterskole | 2 |
| Tranbjerg AIA 1 | Tranbjerg AIA | 1 |
| Tranbjerg AIA 11 | Tranbjerg AIA | 1 |
| Tranbjerg AIA 2 | Tranbjerg AIA | 1 |
| Triton-RBK-RIF 1 | Triton-RBK-RIF | 1 |
| Taastrup BC 1 | Taastrup BC | 2 |
| Taastrup Elite 1 | Taastrup Elite | 3 |
| Taastrup TIK 1 | Taastrup TIK | 1 |
| Ukendt modstander 1 | Ukendt modstander | 1 |
| Ukendt modstander 2 | Ukendt modstander | 1 |
| Valby BC 1 | Valby BC | 1 |
| Vanløse 1 | Vanløse | 2 |
| Varde 1 | Varde | 5 |
| Varde 2 | Varde | 1 |
| Vedersø Idrætsefterskole 1 | Vedersø Idrætsefterskole | 3 |
| Vedersø Idrætsefterskole 2 | Vedersø Idrætsefterskole | 1 |
| Vejgaard 1 | Vejgaard | 1 |
| Vejle 1 | Vejle | 2 |
| Vester Hassing 1 | Vester Hassing | 1 |
| Vesterbølle Efterskole 1 | Vesterbølle Efterskole | 1 |
| Viby J 1 | Viby J | 19 |
| Viby J 11 | Viby J | 1 |
| Viby J 2 | Viby J | 4 |
| Viby J 22 | Viby J | 1 |
| Viby J 3 | Viby J | 2 |
| Viby-Silkeborg 1 | Viby-Silkeborg | 1 |
| Vinding SF 1 | Vinding SF | 3 |
| Vinding SF 1 (2400) | Vinding SF | 1 |
| Vinding SF 11 | Vinding SF | 1 |
| Vinding SF 2 | Vinding SF | 1 |
| Vinding SF 4 | Vinding SF | 1 |
| Vivild Idrætsefterskole 1 | Vivild Idrætsefterskole | 4 |
| Vivild Idrætsefterskole 1 (&#216;M) | Vivild Idrætsefterskole | 1 |
| Vivild Idrætsefterskole 2 | Vivild Idrætsefterskole | 1 |
| Vojens GI 1 | Vojens GI | 4 |
| Vojens GI 1 (xtra) | Vojens GI | 1 |
| Vojens GI 2 | Vojens GI | 1 |
| Vorup FB 1 | Vorup FB | 1 |
| Værløse 1 | Værløse | 18 |
| Værløse 2 | Værløse | 1 |
| Aabybro 1 | Aabybro | 3 |
| Aabybro 2 | Aabybro | 1 |
| Aalborg Triton 1 | Aalborg Triton | 8 |
| Aalborg Triton 2 | Aalborg Triton | 4 |
| Aalborg Triton 3 | Aalborg Triton | 2 |
| Aalborg Triton 4 | Aalborg Triton | 1 |
| Aarhus AB 1 | Aarhus AB | 12 |
| Aarhus AB 11 | Aarhus AB | 1 |
| Aarhus AB 2 | Aarhus AB | 4 |
| Aarhus AB 22 | Aarhus AB | 1 |
| Aarhus AB 3 | Aarhus AB | 2 |
| Aarhus AB 33 | Aarhus AB | 1 |
| Aarhus AB 4 | Aarhus AB | 1 |
| Aars 1 | Aars | 1 |

### Samarbejdshold rapporteret separat (ikke GSB)

| Sæson | Alder | Råt holdnavn | Fysisk pulje | Format | Bogstav/række | Numerisk værdi |
| --- | --- | --- | --- | --- | --- | --- |
| 2020/2021 | U11 (3) | BC37/Gladsaxe Søborg 1 | 2020\|3\|13328 | 4+2 | niveau ikke tolket | — |

## Deltagelsesbredde B — Badminton København

`GSB i x af n` viser både antal og procent. Udgåede/trukne hold tæller ikke i x; de vises særskilt. 2026/2027 er markeret **i gang, ufuldstændig** og indgår ikke i “Samlet over tid”. Samlet over tid summeres afsluttede sæsoner kun inden for samme aldersgruppe.

| Sæson | Aldersgruppe | Rækker uden Kredsmatch | Rækker inkl. Kredsmatch | Puljer uden Kredsmatch | Puljer inkl. Kredsmatch | Udeladte GSB-hold |
| --- | --- | --- | --- | --- | --- | --- |
| 2011/2012 | U11 (ID 3) | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 2 ({"udgået":2,"trukket":0}) |
| 2011/2012 | U13 (ID 4) | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 2 ({"udgået":1,"trukket":1}) |
| 2011/2012 | U15 (ID 5) | 3 af 5 (60%) | 3 af 5 inkl. Kredsmatch | 3 af 5 (60%) | 3 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2011/2012 | U17 (ID 6) | 0 af 3 (0%) | 0 af 3 inkl. Kredsmatch | 0 af 3 (0%) | 0 af 3 inkl. Kredsmatch | 1 ({"udgået":1,"trukket":0}) |
| 2012/2013 | U11 (ID 3) | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2012/2013 | U13 (ID 4) | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 1 ({"udgået":0,"trukket":1}) |
| 2012/2013 | U15 (ID 5) | 3 af 5 (60%) | 3 af 5 inkl. Kredsmatch | 3 af 5 (60%) | 3 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2012/2013 | U17 (ID 6) | 1 af 3 (33,3%) | 1 af 3 inkl. Kredsmatch | 1 af 3 (33,3%) | 1 af 3 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2013/2014 | U11 (ID 3) | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2013/2014 | U13 (ID 4) | 1 af 6 (16,7%) | 1 af 6 inkl. Kredsmatch | 1 af 6 (16,7%) | 1 af 6 inkl. Kredsmatch | 1 ({"udgået":0,"trukket":1}) |
| 2013/2014 | U15 (ID 5) | 3 af 6 (50%) | 3 af 6 inkl. Kredsmatch | 3 af 7 (42,9%) | 3 af 7 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2013/2014 | U17 (ID 6) | 2 af 3 (66,7%) | 2 af 3 inkl. Kredsmatch | 2 af 3 (66,7%) | 2 af 3 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2014/2015 | U11 (ID 3) | 2 af 8 (25%) | 2 af 8 inkl. Kredsmatch | 2 af 21 (9,5%) | 2 af 21 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2014/2015 | U13 (ID 4) | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2014/2015 | U15 (ID 5) | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2014/2015 | U17 (ID 6) | 0 af 3 (0%) | 0 af 3 inkl. Kredsmatch | 0 af 3 (0%) | 0 af 3 inkl. Kredsmatch | 2 ({"udgået":2,"trukket":0}) |
| 2015/2016 | U11 (ID 3) | 1 af 4 (25%) | 1 af 5 inkl. Kredsmatch | 1 af 4 (25%) | 1 af 5 inkl. Kredsmatch | 1 ({"udgået":1,"trukket":0}) |
| 2015/2016 | U13 (ID 4) | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2015/2016 | U15 (ID 5) | 1 af 6 (16,7%) | 1 af 6 inkl. Kredsmatch | 1 af 6 (16,7%) | 1 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2015/2016 | U17 (ID 6) | 0 af 4 (0%) | 0 af 4 inkl. Kredsmatch | 0 af 4 (0%) | 0 af 4 inkl. Kredsmatch | 1 ({"udgået":1,"trukket":0}) |
| 2016/2017 | U11 (ID 3) | 2 af 8 (25%) | 2 af 9 inkl. Kredsmatch | 2 af 9 (22,2%) | 2 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2016/2017 | U13 (ID 4) | 1 af 8 (12,5%) | 1 af 8 inkl. Kredsmatch | 1 af 8 (12,5%) | 1 af 8 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2016/2017 | U15 (ID 5) | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2016/2017 | U17 (ID 6) | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2016/2017 | U17/U19 (ID 18) | 0 af 1 (0%) | 0 af 1 inkl. Kredsmatch | 0 af 1 (0%) | 0 af 1 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2017/2018 | U11 (ID 3) | 1 af 7 (14,3%) | 1 af 9 inkl. Kredsmatch | 1 af 8 (12,5%) | 1 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2017/2018 | U13 (ID 4) | 2 af 10 (20%) | 2 af 11 inkl. Kredsmatch | 2 af 11 (18,2%) | 2 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2017/2018 | U15 (ID 5) | 2 af 9 (22,2%) | 2 af 10 inkl. Kredsmatch | 2 af 13 (15,4%) | 2 af 14 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2017/2018 | U17/U19 (ID 18) | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 1 af 6 (16,7%) | 1 af 6 inkl. Kredsmatch | 1 ({"udgået":1,"trukket":0}) |
| 2018/2019 | U11 (ID 3) | 2 af 9 (22,2%) | 2 af 11 inkl. Kredsmatch | 2 af 9 (22,2%) | 2 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2018/2019 | U13 (ID 4) | 1 af 8 (12,5%) | 1 af 9 inkl. Kredsmatch | 1 af 10 (10%) | 1 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2018/2019 | U15 (ID 5) | 1 af 10 (10%) | 1 af 11 inkl. Kredsmatch | 1 af 14 (7,1%) | 1 af 15 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2018/2019 | U17/U19 (ID 18) | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 2 af 8 (25%) | 2 af 8 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2019/2020 | U11 (ID 3) | 1 af 6 (16,7%) | 1 af 8 inkl. Kredsmatch | 1 af 8 (12,5%) | 1 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2019/2020 | U13 (ID 4) | 2 af 8 (25%) | 2 af 9 inkl. Kredsmatch | 2 af 11 (18,2%) | 2 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2019/2020 | U15 (ID 5) | 1 af 8 (12,5%) | 1 af 9 inkl. Kredsmatch | 1 af 9 (11,1%) | 1 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2020/2021 | U09 (ID 2) | 1 af 1 (100%) | 1 af 1 inkl. Kredsmatch | 1 af 1 (100%) | 1 af 1 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2020/2021 | U11 (ID 3) | 1 af 6 (16,7%) | 1 af 7 inkl. Kredsmatch | 2 af 8 (25%) | 2 af 9 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2020/2021 | U13 (ID 4) | 2 af 8 (25%) | 2 af 8 inkl. Kredsmatch | 2 af 11 (18,2%) | 2 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2020/2021 | U15 (ID 5) | 3 af 12 (25%) | 3 af 12 inkl. Kredsmatch | 3 af 13 (23,1%) | 3 af 13 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2021/2022 | U09 (ID 2) | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2021/2022 | U11 (ID 3) | 1 af 7 (14,3%) | 1 af 8 inkl. Kredsmatch | 3 af 11 (27,3%) | 3 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2021/2022 | U13 (ID 4) | 3 af 9 (33,3%) | 3 af 10 inkl. Kredsmatch | 4 af 12 (33,3%) | 4 af 13 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2021/2022 | U15 (ID 5) | 5 af 10 (50%) | 5 af 10 inkl. Kredsmatch | 5 af 13 (38,5%) | 5 af 13 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U09 (ID 2) | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U11 (ID 3) | 5 af 6 (83,3%) | 5 af 7 inkl. Kredsmatch | 6 af 10 (60%) | 6 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U13 (ID 4) | 2 af 8 (25%) | 2 af 9 inkl. Kredsmatch | 3 af 14 (21,4%) | 3 af 15 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U15 (ID 5) | 5 af 11 (45,5%) | 5 af 11 inkl. Kredsmatch | 5 af 18 (27,8%) | 5 af 18 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U17/U19 (ID 18) | 1 af 7 (14,3%) | 1 af 7 inkl. Kredsmatch | 1 af 12 (8,3%) | 1 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U09 (ID 2) | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U11 (ID 3) | 4 af 6 (66,7%) | 4 af 7 inkl. Kredsmatch | 5 af 9 (55,6%) | 5 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U13 (ID 4) | 4 af 10 (40%) | 4 af 11 inkl. Kredsmatch | 4 af 16 (25%) | 4 af 17 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U15 (ID 5) | 4 af 12 (33,3%) | 4 af 13 inkl. Kredsmatch | 5 af 20 (25%) | 5 af 21 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U17/U19 (ID 18) | 2 af 9 (22,2%) | 2 af 9 inkl. Kredsmatch | 2 af 18 (11,1%) | 2 af 18 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U09 (ID 2) | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 2 af 3 (66,7%) | 2 af 3 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U11 (ID 3) | 3 af 5 (60%) | 3 af 6 inkl. Kredsmatch | 5 af 10 (50%) | 5 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U13 (ID 4) | 6 af 12 (50%) | 6 af 13 inkl. Kredsmatch | 8 af 26 (30,8%) | 8 af 27 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U15 (ID 5) | 5 af 15 (33,3%) | 5 af 16 inkl. Kredsmatch | 5 af 22 (22,7%) | 5 af 23 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U17/U19 (ID 18) | 1 af 11 (9,1%) | 1 af 11 inkl. Kredsmatch | 1 af 21 (4,8%) | 1 af 21 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U09 (ID 2) | 4 af 4 (100%) | 4 af 4 inkl. Kredsmatch | 8 af 12 (66,7%) | 8 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U11 (ID 3) | 3 af 6 (50%) | 3 af 7 inkl. Kredsmatch | 4 af 13 (30,8%) | 4 af 14 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U13 (ID 4) | 9 af 15 (60%) | 9 af 16 inkl. Kredsmatch | 11 af 23 (47,8%) | 11 af 24 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U15 (ID 5) | 8 af 17 (47,1%) | 8 af 18 inkl. Kredsmatch | 9 af 32 (28,1%) | 9 af 33 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U17/U19 (ID 18) | 3 af 13 (23,1%) | 3 af 13 inkl. Kredsmatch | 3 af 22 (13,6%) | 3 af 22 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U09 (ID 2) | 2 af 3 (66,7%) | 2 af 3 inkl. Kredsmatch | 2 af 3 (66,7%) | 2 af 3 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U11 (ID 3) | 4 af 7 (57,1%) | 4 af 7 inkl. Kredsmatch | 4 af 8 (50%) | 4 af 8 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U13 (ID 4) | 7 af 15 (46,7%) | 7 af 15 inkl. Kredsmatch | 9 af 19 (47,4%) | 9 af 19 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U15 (ID 5) | 8 af 20 (40%) | 8 af 20 inkl. Kredsmatch | 8 af 23 (34,8%) | 8 af 23 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (ID 18) | 5 af 15 (33,3%) | 5 af 15 inkl. Kredsmatch | 6 af 21 (28,6%) | 6 af 21 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |

### Række-for-række bevis (region 8)

Alle division-rækker vises, også rækker udeladt fra tælleren; GSB-hold er navngivet.

| Sæson | Alder | division_name_raw | Med i bredde? | Aktive GSB-hold |
| --- | --- | --- | --- | --- |
| 2011/2012 | U11 (3) | U11 1.Serie | ja | — |
| 2011/2012 | U11 (3) | U11 2. Serie | ja | Gladsaxe Søborg |
| 2011/2012 | U11 (3) | U11 3. Serie | ja | Gladsaxe Søborg 2 |
| 2011/2012 | U11 (3) | U11 Serie X1 | ja | — |
| 2011/2012 | U11 (3) | U11 Serie X2 | ja | — |
| 2011/2012 | U13 (4) | U13 1.Serie | ja | — |
| 2011/2012 | U13 (4) | U13 2. Serie | ja | Gladsaxe Søborg |
| 2011/2012 | U13 (4) | U13 3. Serie | ja | — |
| 2011/2012 | U13 (4) | U13 Serie X1 | ja | Gladsaxe Søborg 3 |
| 2011/2012 | U13 (4) | U13 Serie X2 | ja | — |
| 2011/2012 | U15 (5) | U15 1. Serie | ja | — |
| 2011/2012 | U15 (5) | U15 2. Serie | ja | — |
| 2011/2012 | U15 (5) | U15 3. Serie | ja | Gladsaxe Søborg |
| 2011/2012 | U15 (5) | U15 Serie X1 | ja | Gladsaxe Søborg 2 |
| 2011/2012 | U15 (5) | U15 Serie X2 | ja | Gladsaxe Søborg 3 |
| 2011/2012 | U17 (6) | U17 1. Serie | ja | — |
| 2011/2012 | U17 (6) | U17 2. Serie | ja | — |
| 2011/2012 | U17 (6) | U17 Serie X1 | ja | — |
| 2012/2013 | U11 (3) | U11 1. Serie | ja | — |
| 2012/2013 | U11 (3) | U11 2. Serie | ja | — |
| 2012/2013 | U11 (3) | U11 3. Serie | ja | Gladsaxe Søborg |
| 2012/2013 | U11 (3) | U11 Serie X1 | ja | — |
| 2012/2013 | U11 (3) | U11 Serie X2 | ja | — |
| 2012/2013 | U13 (4) | U13 1. Serie | ja | — |
| 2012/2013 | U13 (4) | U13 2. Serie | ja | — |
| 2012/2013 | U13 (4) | U13 3. Serie | ja | Gladsaxe Søborg |
| 2012/2013 | U13 (4) | U13 Serie X1 | ja | — |
| 2012/2013 | U13 (4) | U13 Serie X2 | ja | — |
| 2012/2013 | U15 (5) | U15 1. Serie | ja | — |
| 2012/2013 | U15 (5) | U15 2. Serie | ja | — |
| 2012/2013 | U15 (5) | U15 3. Serie | ja | Gladsaxe Søborg |
| 2012/2013 | U15 (5) | U15 Serie X1 | ja | Gladsaxe Søborg 2 |
| 2012/2013 | U15 (5) | U15 Serie X2 | ja | Gladsaxe Søborg 3 |
| 2012/2013 | U17 (6) | U17 1. Serie | ja | — |
| 2012/2013 | U17 (6) | U17 2. Serie | ja | Gladsaxe Søborg |
| 2012/2013 | U17 (6) | U17 Serie X1 | ja | — |
| 2013/2014 | U11 (3) | U11 1. Serie | ja | — |
| 2013/2014 | U11 (3) | U11 2. Serie | ja | — |
| 2013/2014 | U11 (3) | U11 3. Serie | ja | Gladsaxe Søborg |
| 2013/2014 | U11 (3) | U11 Serie X1 | ja | Gladsaxe Søborg 2 |
| 2013/2014 | U11 (3) | U11 Serie X2 | ja | — |
| 2013/2014 | U11 (3) | U11 Serie X3 | ja | — |
| 2013/2014 | U13 (4) | U13 1. serie | ja | — |
| 2013/2014 | U13 (4) | U13 2. serie | ja | — |
| 2013/2014 | U13 (4) | U13 3. serie | ja | Gladsaxe Søborg |
| 2013/2014 | U13 (4) | U13 Serie X1 | ja | — |
| 2013/2014 | U13 (4) | U13 Serie X2 | ja | — |
| 2013/2014 | U13 (4) | U13 Serie X3 | ja | — |
| 2013/2014 | U15 (5) | U15 1. serie | ja | — |
| 2013/2014 | U15 (5) | U15 2. serie | ja | Gladsaxe Søborg |
| 2013/2014 | U15 (5) | U15 3. serie | ja | — |
| 2013/2014 | U15 (5) | U15 Serie X1 | ja | Gladsaxe Søborg 2 |
| 2013/2014 | U15 (5) | U15 Serie X2 | ja | — |
| 2013/2014 | U15 (5) | U15 Serie X3 | ja | Gladsaxe Søborg 3 |
| 2013/2014 | U17 (6) | U17 1. serie | ja | — |
| 2013/2014 | U17 (6) | U17 2. serie | ja | Gladsaxe Søborg |
| 2013/2014 | U17 (6) | U17 Serie X1 | ja | Gladsaxe Søborg |
| 2014/2015 | U11 (3) | &#197;rets U11 Hold - Finaler & Placeringskampe | ja | — |
| 2014/2015 | U11 (3) | &#197;rets U11 Hold - Indledende Puljer | ja | — |
| 2014/2015 | U11 (3) | &#197;rets U11 Hold - Semifinaler | ja | — |
| 2014/2015 | U11 (3) | U 11 2.serie (4+2 A) | ja | — |
| 2014/2015 | U11 (3) | U11 1.serie (4+3) | ja | — |
| 2014/2015 | U11 (3) | U11 serie X1 (4 spillere C) | ja | Gladsaxe Søborg |
| 2014/2015 | U11 (3) | U11 serie X2 (4 spillere C) | ja | Gladsaxe Søborg 2 |
| 2014/2015 | U11 (3) | U11 serie X3 (4 spillere C) | ja | — |
| 2014/2015 | U13 (4) | U13 1.serie (4+3) | ja | — |
| 2014/2015 | U13 (4) | U13 2.serie (4+2 M) | ja | — |
| 2014/2015 | U13 (4) | U13 3.serie (4+2 M) | ja | Gladsaxe Søborg |
| 2014/2015 | U13 (4) | U13 serie X1 (4 spillere C) | ja | — |
| 2014/2015 | U13 (4) | U13 serie X2 (4 spillere C) | ja | Gladsaxe Søborg 2 |
| 2014/2015 | U13 (4) | U13 serie X3 (4 spillere C) | ja | — |
| 2014/2015 | U15 (5) | U15 1.serie (4+3) | ja | — |
| 2014/2015 | U15 (5) | U15 2.serie (4+2 M) | ja | Gladsaxe Søborg |
| 2014/2015 | U15 (5) | U15 3.serie (4+2 M) | ja | — |
| 2014/2015 | U15 (5) | U15 serie X1 (4 spillere C) | ja | Gladsaxe Søborg 2 |
| 2014/2015 | U15 (5) | U15 serie X2 (4 spillere C) | ja | — |
| 2014/2015 | U17 (6) | U17 1.serie (4+3) | ja | — |
| 2014/2015 | U17 (6) | U17 2.serie (4+2 M) | ja | — |
| 2014/2015 | U17 (6) | U17 serie X1 (4 spillere C) | ja | — |
| 2015/2016 | U11 (3) | Kredsmatch | nej — Kredsmatch | — |
| 2015/2016 | U11 (3) | U11 A Række 4+3 | ja | — |
| 2015/2016 | U11 (3) | U11 B Række 4 | ja | — |
| 2015/2016 | U11 (3) | U11 C Række 4 | ja | — |
| 2015/2016 | U11 (3) | U11 D Række 4 | ja | Gladsaxe Søborg |
| 2015/2016 | U13 (4) | U13 A Række 4+2 | ja | — |
| 2015/2016 | U13 (4) | U13 B Række 4 | ja | Gladsaxe Søborg |
| 2015/2016 | U13 (4) | U13 C Række 4 | ja | — |
| 2015/2016 | U13 (4) | U13 D Række 4 | ja | Gladsaxe Søborg 2 |
| 2015/2016 | U13 (4) | U13 E Række 4+3 | ja | — |
| 2015/2016 | U13 (4) | U13 M Række 4+2 | ja | — |
| 2015/2016 | U15 (5) | U15 A Række 4+2 | ja | — |
| 2015/2016 | U15 (5) | U15 B Række 4 | ja | — |
| 2015/2016 | U15 (5) | U15 C Række 4 | ja | — |
| 2015/2016 | U15 (5) | U15 D Række 4 | ja | — |
| 2015/2016 | U15 (5) | U15 E Række 4+3 | ja | — |
| 2015/2016 | U15 (5) | U15 M Række 4+2 | ja | Gladsaxe Søborg |
| 2015/2016 | U17 (6) | U17 A Række 4+2 | ja | — |
| 2015/2016 | U17 (6) | U17 B Række 4 | ja | — |
| 2015/2016 | U17 (6) | U17 E Række 4+3 | ja | — |
| 2015/2016 | U17 (6) | U17/U19 A 4 spillere | ja | — |
| 2016/2017 | U11 (3) | Holdturneringsdage for begyndere U11-Herlev | ja | — |
| 2016/2017 | U11 (3) | Kredsmatch | nej — Kredsmatch | — |
| 2016/2017 | U11 (3) | Slutspil U11 D (4) | ja | Gladsaxe Søborg |
| 2016/2017 | U11 (3) | U11 (4+3) | ja | — |
| 2016/2017 | U11 (3) | U11 A (4) | ja | — |
| 2016/2017 | U11 (3) | U11 B (4) | ja | — |
| 2016/2017 | U11 (3) | U11 C (4) | ja | — |
| 2016/2017 | U11 (3) | U11 D (4) P1 | ja | Gladsaxe Søborg |
| 2016/2017 | U11 (3) | U11 D (4) P2 | ja | — |
| 2016/2017 | U13 (4) | Holdturneringsdage for begyndere U13-Herlev | ja | — |
| 2016/2017 | U13 (4) | U13 (4+3) | ja | — |
| 2016/2017 | U13 (4) | U13 A (4) | ja | — |
| 2016/2017 | U13 (4) | U13 B (4) | ja | — |
| 2016/2017 | U13 (4) | U13 C (4) P1 | ja | — |
| 2016/2017 | U13 (4) | U13 C (4) P2 | ja | Gladsaxe Søborg |
| 2016/2017 | U13 (4) | U13 D (4) | ja | — |
| 2016/2017 | U13 (4) | slutspil U13 C (4) | ja | — |
| 2016/2017 | U15 (5) | U15 (4+3) | ja | — |
| 2016/2017 | U15 (5) | U15 A (4) | ja | — |
| 2016/2017 | U15 (5) | U15 A (4+2) | ja | Gladsaxe Søborg |
| 2016/2017 | U15 (5) | U15 B (4) | ja | Gladsaxe Søborg 2 |
| 2016/2017 | U15 (5) | U15 C (4) | ja | — |
| 2016/2017 | U15 (5) | U15 D (4) | ja | — |
| 2016/2017 | U17 (6) | U17 (4+3) | ja | — |
| 2016/2017 | U17 (6) | U17/U19 A (4+2) | ja | — |
| 2016/2017 | U17 (6) | U17/U19 B (4) P1 | ja | — |
| 2016/2017 | U17 (6) | U17/U19 B (4) P2 | ja | Gladsaxe Søborg |
| 2016/2017 | U17 (6) | U17/U19 C (4) | ja | — |
| 2016/2017 | U17/U19 (18) | Slutspil U17/U19 B (4) | ja | — |
| 2017/2018 | U11 (3) | Holdturneringsdage for begyndere Hillerød 18/3-18 | ja | — |
| 2017/2018 | U11 (3) | Kredsmatch | nej — Kredsmatch | — |
| 2017/2018 | U11 (3) | Kredsmatch BADKBH-BADSJ&#198; U11 | nej — Kredsmatch | — |
| 2017/2018 | U11 (3) | U11 4+2 | ja | — |
| 2017/2018 | U11 (3) | U11 B (4) | ja | — |
| 2017/2018 | U11 (3) | U11 C 4 spillere | ja | — |
| 2017/2018 | U11 (3) | U11 D (4) P1 | ja | — |
| 2017/2018 | U11 (3) | U11 D (4) P2 | ja | Gladsaxe Søborg |
| 2017/2018 | U11 (3) | U11 D (4) P3 | ja | — |
| 2017/2018 | U13 (4) | Holdturneringsdage for begyndere Hillerød 18/3-18 | ja | — |
| 2017/2018 | U13 (4) | Kredsmatch BADKBH-BADSJ&#198; U13 | nej — Kredsmatch | — |
| 2017/2018 | U13 (4) | U13 4+3 | ja | — |
| 2017/2018 | U13 (4) | U13 A 4 spillere | ja | — |
| 2017/2018 | U13 (4) | U13 B (4) | ja | Gladsaxe Søborg |
| 2017/2018 | U13 (4) | U13 C (4) | ja | Gladsaxe Søborg 2 |
| 2017/2018 | U13 (4) | U13 D (4 piger) | ja | — |
| 2017/2018 | U13 (4) | U13 D (4) P1 | ja | — |
| 2017/2018 | U13 (4) | U13 D (4) P2 | ja | — |
| 2017/2018 | U13 (4) | U13 D (4) P3 | ja | — |
| 2017/2018 | U13 (4) | U13 M/A 4+2 | ja | — |
| 2017/2018 | U15 (5) | Kredsmatch BADKBH-BADSJ&#198; U15 | nej — Kredsmatch | — |
| 2017/2018 | U15 (5) | U15 4+3 | ja | — |
| 2017/2018 | U15 (5) | U15 A 4 spillere | ja | — |
| 2017/2018 | U15 (5) | U15 B (4) | ja | Gladsaxe Søborg 2 |
| 2017/2018 | U15 (5) | U15 B 4+2 | ja | — |
| 2017/2018 | U15 (5) | U15 C (4) | ja | — |
| 2017/2018 | U15 (5) | U15 D (4 piger) | ja | — |
| 2017/2018 | U15 (5) | U15 D (4) | ja | — |
| 2017/2018 | U15 (5) | U15 M 4 spillere | ja | Gladsaxe Søborg 1 |
| 2017/2018 | U15 (5) | U15 M/A 4+2 | ja | — |
| 2017/2018 | U17/U19 (18) | U17/19 B (4) | ja | — |
| 2017/2018 | U17/U19 (18) | U17/19 C (4) | ja | — |
| 2017/2018 | U17/U19 (18) | U17/U19 A 4 spillere | ja | — |
| 2017/2018 | U17/U19 (18) | U17/U19 M 4 spillere | ja | — |
| 2017/2018 | U17/U19 (18) | U17/U19 M/A 4+2 | ja | Gladsaxe Søborg 1 |
| 2018/2019 | U11 (3) | Kredsmatch | nej — Kredsmatch | — |
| 2018/2019 | U11 (3) | Kredsmatch BADKBH-BADSJ U11 | nej — Kredsmatch | — |
| 2018/2019 | U11 (3) | U11 4+2 | ja | — |
| 2018/2019 | U11 (3) | U11 B 4 Spillere | ja | — |
| 2018/2019 | U11 (3) | U11 C 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2018/2019 | U11 (3) | U11 CD 4 Piger | ja | — |
| 2018/2019 | U11 (3) | U11 CD 4 Spillere | ja | — |
| 2018/2019 | U11 (3) | U11 D 4 Spillere P1 | ja | — |
| 2018/2019 | U11 (3) | U11 D 4 Spillere P2 | ja | Gladsaxe Søborg 2 |
| 2018/2019 | U11 (3) | U11 D 4 Spillere P3 | ja | — |
| 2018/2019 | U11 (3) | U11 D 4 Spillere P4 | ja | — |
| 2018/2019 | U13 (4) | Kredsmatch BADKBH-BADSJ U13 | nej — Kredsmatch | — |
| 2018/2019 | U13 (4) | U13 4+3 | ja | — |
| 2018/2019 | U13 (4) | U13 A 4 Spillere | ja | — |
| 2018/2019 | U13 (4) | U13 B 4 Spillere | ja | — |
| 2018/2019 | U13 (4) | U13 C 4 Spillere | ja | — |
| 2018/2019 | U13 (4) | U13 CD 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2018/2019 | U13 (4) | U13 D 4 Spillere P1 | ja | — |
| 2018/2019 | U13 (4) | U13 D 4 Spillere P2 | ja | — |
| 2018/2019 | U13 (4) | U13 D 4 Spillere P3 | ja | — |
| 2018/2019 | U15 (5) | Kredsmatch BADKBH-BADSJ U15 | nej — Kredsmatch | — |
| 2018/2019 | U15 (5) | U15 4+3 | ja | — |
| 2018/2019 | U15 (5) | U15 A 4 Spillere | ja | — |
| 2018/2019 | U15 (5) | U15 AB 4+2 | ja | — |
| 2018/2019 | U15 (5) | U15 B 4 Spillere | ja | — |
| 2018/2019 | U15 (5) | U15 C 4 Spillere | ja | — |
| 2018/2019 | U15 (5) | U15 CD 4 Spillere | ja | — |
| 2018/2019 | U15 (5) | U15 D 4 Spillere P1 | ja | — |
| 2018/2019 | U15 (5) | U15 D 4 Spillere P2 | ja | Gladsaxe Søborg 1 |
| 2018/2019 | U15 (5) | U15 M 4 Spillere | ja | — |
| 2018/2019 | U15 (5) | U15 MA 4+2 | ja | — |
| 2018/2019 | U17/U19 (18) | U17/19 B 4 Spillere | ja | — |
| 2018/2019 | U17/U19 (18) | U17/19 CD 4 Spillere | ja | — |
| 2018/2019 | U17/U19 (18) | U17/19 M 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2018/2019 | U17/U19 (18) | U17/19 MA 4+2 | ja | — |
| 2018/2019 | U17/U19 (18) | U17/U19 A 4 spillere | ja | Gladsaxe Søborg 2 |
| 2018/2019 | U17/U19 (18) | U17/U19 C 4 Spillere | ja | — |
| 2019/2020 | U11 (3) | Kredsmatch 19/20 | nej — Kredsmatch | — |
| 2019/2020 | U11 (3) | Kredsmatch BADSJ&#198; - BADKBH | nej — Kredsmatch | — |
| 2019/2020 | U11 (3) | U11 - 3000 - 4 spillere | ja | — |
| 2019/2020 | U11 (3) | U11 - 3400 - 4 spillere | ja | Gladsaxe Søborg 1 |
| 2019/2020 | U11 (3) | U11 - 3800 - 4 spillere | ja | — |
| 2019/2020 | U11 (3) | U11 - 4+2 | ja | — |
| 2019/2020 | U11 (3) | U11 - 4400 - 4 spillere | ja | — |
| 2019/2020 | U11 (3) | U11 - 5200 - 4 spillere | ja | — |
| 2019/2020 | U13 (4) | Kredsmatch BADSJ&#198; - BADKBH | nej — Kredsmatch | — |
| 2019/2020 | U13 (4) | U13 - 3400 - 4 piger | ja | — |
| 2019/2020 | U13 (4) | U13 - 3400 - 4 spillere | ja | Gladsaxe Søborg 2 |
| 2019/2020 | U13 (4) | U13 - 3800 - 4 piger | ja | — |
| 2019/2020 | U13 (4) | U13 - 3800 - 4 spillere | ja | Gladsaxe Søborg 1 |
| 2019/2020 | U13 (4) | U13 - 4+3 | ja | — |
| 2019/2020 | U13 (4) | U13 - 4400 - 4 spillere | ja | — |
| 2019/2020 | U13 (4) | U13 - 5200 - 4 spillere | ja | — |
| 2019/2020 | U13 (4) | U13 - 6200 - 4 spillere | ja | — |
| 2019/2020 | U15 (5) | Kredsmatch BADSJ&#198; - BADKBH | nej — Kredsmatch | — |
| 2019/2020 | U15 (5) | U15 - 12000 - 4+2 | ja | — |
| 2019/2020 | U15 (5) | U15 - 4+3 | ja | — |
| 2019/2020 | U15 (5) | U15 - 4400 - 4 piger | ja | — |
| 2019/2020 | U15 (5) | U15 - 4400 - 4 spillere | ja | — |
| 2019/2020 | U15 (5) | U15 - 5200 - 4 spillere | ja | — |
| 2019/2020 | U15 (5) | U15 - 6200 - 4 spillere | ja | Gladsaxe Søborg 1 |
| 2019/2020 | U15 (5) | U15 - 7200 - 4 spillere | ja | — |
| 2019/2020 | U15 (5) | U15 - 8400 - 4 spillere | ja | — |
| 2020/2021 | U09 (2) | U09 2500 4 Spillere | ja | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2020/2021 | U11 (3) | Kredsmatch 20-21 | nej — Kredsmatch | — |
| 2020/2021 | U11 (3) | U11 - 2800 - 4 piger | ja | — |
| 2020/2021 | U11 (3) | U11 - 3800 - 4 spillere | ja | — |
| 2020/2021 | U11 (3) | U11 - 4400 - 4 spillere | ja | — |
| 2020/2021 | U11 (3) | U11 3000 4 Spillere | ja | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2020/2021 | U11 (3) | U11 3400 4 Spillere | ja | — |
| 2020/2021 | U11 (3) | U11 4+2 | ja | — |
| 2020/2021 | U13 (4) | U13 - 3800 - 4 piger | ja | — |
| 2020/2021 | U13 (4) | U13 - 4+3 | ja | — |
| 2020/2021 | U13 (4) | U13 - 6000 - 4 spillere | ja | — |
| 2020/2021 | U13 (4) | U13 3200 4 Piger | ja | — |
| 2020/2021 | U13 (4) | U13 3400 4 Spillere | ja | Gladsaxe Søborg 2 |
| 2020/2021 | U13 (4) | U13 3800 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2020/2021 | U13 (4) | U13 4400 4 Spillere | ja | — |
| 2020/2021 | U13 (4) | U13 5200 4 Spillere | ja | — |
| 2020/2021 | U15 (5) | U15 - 10t - 4+2 | ja | — |
| 2020/2021 | U15 (5) | U15 - 12t - 4+2 | ja | — |
| 2020/2021 | U15 (5) | U15 - 4+3 | ja | — |
| 2020/2021 | U15 (5) | U15 - 4200 - 4 piger | ja | — |
| 2020/2021 | U15 (5) | U15 - 4800 - 4 piger | ja | — |
| 2020/2021 | U15 (5) | U15 - 5600 - 4 spillere | ja | — |
| 2020/2021 | U15 (5) | U15 - 7600 - 4 spillere | ja | — |
| 2020/2021 | U15 (5) | U15 3800 4 Piger | ja | Gladsaxe Søborg 3 |
| 2020/2021 | U15 (5) | U15 4200 4 Spillere P1 | ja | — |
| 2020/2021 | U15 (5) | U15 4200 4 Spillere P2 | ja | Gladsaxe Søborg 2 |
| 2020/2021 | U15 (5) | U15 4800 4 Spillere | ja | — |
| 2020/2021 | U15 (5) | U15 6400 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2021/2022 | U09 (2) | U09 2700 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2021/2022 | U09 (2) | U9 Nye spillere (2700 - 4 spillere) | ja | — |
| 2021/2022 | U11 (3) | U11 (2+2) | ja | — |
| 2021/2022 | U11 (3) | U11 - 2700 (4 piger) | ja | — |
| 2021/2022 | U11 (3) | U11 - 3800 (4 spillere) | ja | — |
| 2021/2022 | U11 (3) | U11 - 4400 (4 spillere) | ja | — |
| 2021/2022 | U11 (3) | U11 3100 4 Spillere | ja | Gladsaxe Søborg 1; Gladsaxe Søborg 2; Gladsaxe Søborg 3 |
| 2021/2022 | U11 (3) | U11 3400 4 Spillere | ja | — |
| 2021/2022 | U11 (3) | U11 Kredsmatch | nej — Kredsmatch | — |
| 2021/2022 | U11 (3) | U11 Nye spillere - 3100 (4 spillere) | ja | — |
| 2021/2022 | U13 (4) | U13 (4+3) | ja | — |
| 2021/2022 | U13 (4) | U13 - 3500 (4 piger) | ja | Gladsaxe Søborg 4 |
| 2021/2022 | U13 (4) | U13 - 6000 (4 spillere) | ja | — |
| 2021/2022 | U13 (4) | U13 3100 4 Piger | ja | — |
| 2021/2022 | U13 (4) | U13 3500 4 Spillere | ja | Gladsaxe Søborg 2; Gladsaxe Søborg 3 |
| 2021/2022 | U13 (4) | U13 3800 4 Spillere | ja | — |
| 2021/2022 | U13 (4) | U13 4400 4 Spillere | ja | — |
| 2021/2022 | U13 (4) | U13 5200 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2021/2022 | U13 (4) | U13 Kredsmatch | nej — Kredsmatch | — |
| 2021/2022 | U13 (4) | U13 Nye spillere - 3500 (4 spillere) | ja | — |
| 2021/2022 | U15 (5) | U15 (4+3) | ja | — |
| 2021/2022 | U15 (5) | U15 - 3500 (4 piger) | ja | Gladsaxe Søborg 5 |
| 2021/2022 | U15 (5) | U15 - 6400 (4 spillere) | ja | — |
| 2021/2022 | U15 (5) | U15 - 6900 (2+2) | ja | — |
| 2021/2022 | U15 (5) | U15 - 7800 (2+2) | ja | — |
| 2021/2022 | U15 (5) | U15 4300 4 Piger | ja | Gladsaxe Søborg 4 |
| 2021/2022 | U15 (5) | U15 4300 4 Spillere | ja | Gladsaxe Søborg 3 |
| 2021/2022 | U15 (5) | U15 4800 4 Spillere | ja | Gladsaxe Søborg 2 |
| 2021/2022 | U15 (5) | U15 5600 4 Spillere | ja | — |
| 2021/2022 | U15 (5) | U15 7600 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2022/2023 | U09 (2) | U09 2400 4 Spillere | ja | — |
| 2022/2023 | U09 (2) | U09 2800 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2022/2023 | U11 (3) | U11 - 2+2 | ja | Gladsaxe Søborg 1 |
| 2022/2023 | U11 (3) | U11 2800 4 Piger | ja | Gladsaxe Søborg 6 |
| 2022/2023 | U11 (3) | U11 3000 4 Spillere | ja | Gladsaxe Søborg 4; Gladsaxe Søborg 5 |
| 2022/2023 | U11 (3) | U11 3200 4 Spillere | ja | Gladsaxe Søborg 3 |
| 2022/2023 | U11 (3) | U11 3600 4 Spillere | ja | Gladsaxe Søborg 2 |
| 2022/2023 | U11 (3) | U11 4400 4 Spillere | ja | — |
| 2022/2023 | U11 (3) | U11 Kredsmatch | nej — Kredsmatch | — |
| 2022/2023 | U13 (4) | U13 - 3600 (4 piger) | ja | — |
| 2022/2023 | U13 (4) | U13 - 4+3 | ja | — |
| 2022/2023 | U13 (4) | U13 - 5600 (2+2) | ja | — |
| 2022/2023 | U13 (4) | U13 3000 4 Piger | ja | — |
| 2022/2023 | U13 (4) | U13 3400 4 Spillere | ja | Gladsaxe Søborg 2; Gladsaxe Søborg 3 |
| 2022/2023 | U13 (4) | U13 3800 4 Spillere | ja | — |
| 2022/2023 | U13 (4) | U13 4400 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2022/2023 | U13 (4) | U13 5200 4 Spillere | ja | — |
| 2022/2023 | U13 (4) | U13 Kredsmatch | nej — Kredsmatch | — |
| 2022/2023 | U15 (5) | U15 - 4+3 | ja | — |
| 2022/2023 | U15 (5) | U15 - 4000 (2+2) | ja | — |
| 2022/2023 | U15 (5) | U15 - 4000 (4 piger) | ja | — |
| 2022/2023 | U15 (5) | U15 - 4800 (2+2) | ja | — |
| 2022/2023 | U15 (5) | U15 - 5600 (2+2) | ja | — |
| 2022/2023 | U15 (5) | U15 - 6800 (2+2) | ja | — |
| 2022/2023 | U15 (5) | U15 3400 4 Piger | ja | Gladsaxe Søborg 5 |
| 2022/2023 | U15 (5) | U15 4000 4 Spillere | ja | Gladsaxe Søborg 4 |
| 2022/2023 | U15 (5) | U15 4800 4 Spillere | ja | Gladsaxe Søborg 3 |
| 2022/2023 | U15 (5) | U15 5600 4 Spillere | ja | Gladsaxe Søborg 2 |
| 2022/2023 | U15 (5) | U15 6400 4 Spillere | ja | Gladsaxe Søborg 1 |
| 2022/2023 | U17/U19 (18) | U17/U19 - 10000 (4 spillere) | ja | — |
| 2022/2023 | U17/U19 (18) | U17/U19 - 15000 (4+2) | ja | — |
| 2022/2023 | U17/U19 (18) | U17/U19 - 6000 (4 spillere) | ja | — |
| 2022/2023 | U17/U19 (18) | U17/U19 - 6800 (2+2) | ja | — |
| 2022/2023 | U17/U19 (18) | U17/U19 - 8000 (2+2) | ja | — |
| 2022/2023 | U17/U19 (18) | U17/U19 5200 4 Spillere pulje 1 - Ny | ja | Gladsaxe Søborg 1 |
| 2022/2023 | U17/U19 (18) | U17/U19 7200 4 Spillere Pulje 1 Ny | ja | — |
| 2023/2024 | U09 (2) | U09 2400 4 Spillere | ja | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2023/2024 | U09 (2) | U09 2800 4 Spillere | ja | — |
| 2023/2024 | U11 (3) | U11 - 2+2 | ja | Gladsaxe Søborg 1 |
| 2023/2024 | U11 (3) | U11 - 2800 (4 piger) | ja | Gladsaxe Søborg 5 |
| 2023/2024 | U11 (3) | U11 - 2900 4 spillere | ja | Gladsaxe Søborg 4 |
| 2023/2024 | U11 (3) | U11 - 3200 4 spillere | ja | Gladsaxe Søborg 2; Gladsaxe Søborg 3 |
| 2023/2024 | U11 (3) | U11 - 3600 4 spillere | ja | — |
| 2023/2024 | U11 (3) | U11 - 4400 4 spillere | ja | — |
| 2023/2024 | U11 (3) | U11 Kredsmatch | nej — Kredsmatch | — |
| 2023/2024 | U13 (4) | U13 - 3000 4 piger | ja | — |
| 2023/2024 | U13 (4) | U13 - 3300 4 spillere | ja | — |
| 2023/2024 | U13 (4) | U13 - 3500 4 spillere | ja | Gladsaxe Søborg 3 |
| 2023/2024 | U13 (4) | U13 - 3600 4 piger | ja | Gladsaxe Søborg 4 |
| 2023/2024 | U13 (4) | U13 - 3800 4 spillere | ja | — |
| 2023/2024 | U13 (4) | U13 - 4+3 | ja | — |
| 2023/2024 | U13 (4) | U13 - 4400 (4 spillere) | ja | Gladsaxe Søborg 1 |
| 2023/2024 | U13 (4) | U13 - 4800 (2+2) | ja | — |
| 2023/2024 | U13 (4) | U13 - 5000 4 spillere | ja | Gladsaxe Søborg 1 |
| 2023/2024 | U13 (4) | U13 - 6000 (4 spillere) | ja | — |
| 2023/2024 | U13 (4) | U13 Kredsmatch | nej — Kredsmatch | — |
| 2023/2024 | U15 (5) | U13-U15 - 4000 (2+2) | ja | — |
| 2023/2024 | U15 (5) | U15 - 3400 4 piger | ja | — |
| 2023/2024 | U15 (5) | U15 - 3800 4 spillere | ja | Gladsaxe Søborg 3; Gladsaxe Søborg 4 |
| 2023/2024 | U15 (5) | U15 - 4+3 | ja | — |
| 2023/2024 | U15 (5) | U15 - 4000 4 piger | ja | Gladsaxe Søborg 5 |
| 2023/2024 | U15 (5) | U15 - 4200 4 spillere | ja | Gladsaxe Søborg 2 |
| 2023/2024 | U15 (5) | U15 - 4800 4 spillere | ja | — |
| 2023/2024 | U15 (5) | U15 - 5600 (2+2) | ja | — |
| 2023/2024 | U15 (5) | U15 - 5600 (4 spillere) | ja | — |
| 2023/2024 | U15 (5) | U15 - 6400 4 spillere | ja | — |
| 2023/2024 | U15 (5) | U15 - 6600 (2+2) | ja | Gladsaxe Søborg 1 |
| 2023/2024 | U15 (5) | U15 - 8000 (4 spillere) | ja | — |
| 2023/2024 | U15 (5) | U15 Kredsmatch | nej — Kredsmatch | — |
| 2023/2024 | U17/U19 (18) | U15 - U17/U19 - 4800 (2+2) | ja | — |
| 2023/2024 | U17/U19 (18) | U17/U19 - 4200 (4 spillere) | ja | — |
| 2023/2024 | U17/U19 (18) | U17/U19 - 4800 4 spillere | ja | Gladsaxe Søborg 2 |
| 2023/2024 | U17/U19 (18) | U17/U19 - 5600 (2+2) | ja | — |
| 2023/2024 | U17/U19 (18) | U17/U19 - 5600 (4 spillere) | ja | — |
| 2023/2024 | U17/U19 (18) | U17/U19 - 6600 4 spillere | ja | Gladsaxe Søborg 1 |
| 2023/2024 | U17/U19 (18) | U17/U19 - 7800 (2+2) | ja | — |
| 2023/2024 | U17/U19 (18) | U17/U19 - 8000 (4 spillere) | ja | — |
| 2023/2024 | U17/U19 (18) | U17/U19 - 9600 4 spillere | ja | — |
| 2024/2025 | U09 (2) | U9 C-D 3200 (4 spillere). | ja | — |
| 2024/2025 | U09 (2) | U9 D 2800 (4 spillere). | ja | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2024/2025 | U11 (3) | U11 (4+2) | ja | — |
| 2024/2025 | U11 (3) | U11 C 4000 (4 spillere). | ja | Gladsaxe Søborg 1 |
| 2024/2025 | U11 (3) | U11 C-D 3400 (4 spillere). | ja | — |
| 2024/2025 | U11 (3) | U11 D 2800 (4 piger). | ja | Gladsaxe Søborg 5 |
| 2024/2025 | U11 (3) | U11 D 3200 (4 spillere). | ja | Gladsaxe Søborg 2; Gladsaxe Søborg 3; Gladsaxe Søborg 4 |
| 2024/2025 | U11 (3) | U11 Kredsmatch | nej — Kredsmatch | — |
| 2024/2025 | U13 (4) | U13 (4+3) | ja | — |
| 2024/2025 | U13 (4) | U13 A, 5600 (2+2) | ja | Gladsaxe Søborg 1 |
| 2024/2025 | U13 (4) | U13 A, 6000 (4 spillere) | ja | — |
| 2024/2025 | U13 (4) | U13 B, 4700 (2+2) | ja | — |
| 2024/2025 | U13 (4) | U13 B, 5000 (4 spillere) | ja | Gladsaxe Søborg 2 |
| 2024/2025 | U13 (4) | U13 C 3800 (4 piger). | ja | — |
| 2024/2025 | U13 (4) | U13 C, 4200 (4 spillere) | ja | Gladsaxe Søborg 3 |
| 2024/2025 | U13 (4) | U13 C-D, 3800 (4 spillere) | ja | — |
| 2024/2025 | U13 (4) | U13 D 3600 (4 spillere). | ja | Gladsaxe Søborg 4; Gladsaxe Søborg 5; Gladsaxe Søborg 6; Gladsaxe Søborg 7 |
| 2024/2025 | U13 (4) | U13 D, 3200 (4 piger) | ja | Gladsaxe Søborg 8 |
| 2024/2025 | U13 (4) | U13 Kredsmatch | nej — Kredsmatch | — |
| 2024/2025 | U13 (4) | UGE 38 - U13 C, 4000 (2+2) | ja | — |
| 2024/2025 | U13 (4) | UGE 38 - U13 D, 3600 (2+2) | ja | Gladsaxe Søborg 9 |
| 2024/2025 | U15 (5) | U15 (4+3) | ja | — |
| 2024/2025 | U15 (5) | U15 A 7200 (4 spillere). | ja | — |
| 2024/2025 | U15 (5) | U15 A, 6500 (2+2) | ja | — |
| 2024/2025 | U15 (5) | U15 B 6000 (4 spillere). | ja | — |
| 2024/2025 | U15 (5) | U15 B, 5400 (2+2) | ja | Gladsaxe Søborg 1 |
| 2024/2025 | U15 (5) | U15 C 4800 (4 spillere). | ja | Gladsaxe Søborg 2 |
| 2024/2025 | U15 (5) | U15 C, 4200 (4 piger) | ja | — |
| 2024/2025 | U15 (5) | U15 C-D 4200 (4 spillere). | ja | — |
| 2024/2025 | U15 (5) | U15 D 4000 (4 spillere). | ja | Gladsaxe Søborg 3; Gladsaxe Søborg 4; Gladsaxe Søborg 5 |
| 2024/2025 | U15 (5) | U15 D, 3600 (4 piger) | ja | — |
| 2024/2025 | U15 (5) | U15 Kredsmatch | nej — Kredsmatch | — |
| 2024/2025 | U15 (5) | U15 M, 7800 (2+2) | ja | — |
| 2024/2025 | U15 (5) | UGE 38 - U15 A, 6500 (2+2 | ja | — |
| 2024/2025 | U15 (5) | UGE 38 - U15 C, 4600 (2+2) | ja | Gladsaxe Søborg 6 |
| 2024/2025 | U15 (5) | UGE 38 - U15 D, 4000 (2+2) | ja | Gladsaxe Søborg 7 |
| 2024/2025 | U15 (5) | UGE 38 - U15 M, 7800 (2+2) | ja | — |
| 2024/2025 | U17/U19 (18) | 8600 (4 spillere). | ja | — |
| 2024/2025 | U17/U19 (18) | A, 7800 (2+2) | ja | — |
| 2024/2025 | U17/U19 (18) | D, 4800 (2+2) | ja | — |
| 2024/2025 | U17/U19 (18) | M, 15000 (4+2) | ja | — |
| 2024/2025 | U17/U19 (18) | U17/U19 B, 7200 (4 spillere) | ja | — |
| 2024/2025 | U17/U19 (18) | U17/U19 C, 6000 (4 spillere) | ja | — |
| 2024/2025 | U17/U19 (18) | U17/U19 C-D, 5000 (4 spillere) | ja | — |
| 2024/2025 | U17/U19 (18) | U17/U19 D, 4600 (4 spillere) | ja | Gladsaxe Søborg 1 |
| 2024/2025 | U17/U19 (18) | U17/U19 M, 10000 (4 spillere) | ja | — |
| 2024/2025 | U17/U19 (18) | UGE 38 - A, 7800 (2+2) | ja | — |
| 2024/2025 | U17/U19 (18) | UGE 38 - C, 5600 (2+2) | ja | — |
| 2025/2026 | U09 (2) | U09 C 3600 (3 spillere) BD | ja | Gladsaxe Søborg 1 |
| 2025/2026 | U09 (2) | U09 C 3600 (3 spillere) BD (2. halvår) | ja | Gladsaxe Søborg 1 |
| 2025/2026 | U09 (2) | U09 D 3300 (3 spillere) BD | ja | Gladsaxe Søborg 2; Gladsaxe Søborg 3 |
| 2025/2026 | U09 (2) | U09 D 3300 (3 spillere) BD (2. halvår) | ja | Gladsaxe Søborg 2; Gladsaxe Søborg 3; Gladsaxe Søborg 4; Gladsaxe Søborg 5 |
| 2025/2026 | U11 (3) | U11 (4+2) | ja | — |
| 2025/2026 | U11 (3) | U11 4200 (4 piger) BD | ja | Gladsaxe Søborg 5 |
| 2025/2026 | U11 (3) | U11 B 5600 (4 spillere) BD | ja | — |
| 2025/2026 | U11 (3) | U11 C, 5100 (4 spillere) | ja | — |
| 2025/2026 | U11 (3) | U11 C-D 4800 (4 spillere) BD | ja | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2025/2026 | U11 (3) | U11 D 4600 (4 spillere) BD | ja | Gladsaxe Søborg 3; Gladsaxe Søborg 4 |
| 2025/2026 | U11 (3) | U11 Kredsmatch | nej — Kredsmatch | — |
| 2025/2026 | U13 (4) | U13 (4+3) | ja | — |
| 2025/2026 | U13 (4) | U13 A 6400 (4 spillere) BD | ja | — |
| 2025/2026 | U13 (4) | U13 A, 6000 (2+2) | ja | Gladsaxe Søborg 1 |
| 2025/2026 | U13 (4) | U13 B, 5400 (2+2) | ja | Gladsaxe Søborg 2 |
| 2025/2026 | U13 (4) | U13 B, 5800 (4 spillere) | ja | — |
| 2025/2026 | U13 (4) | U13 C 5300 (4 spillere) BD | ja | Gladsaxe Søborg 3 |
| 2025/2026 | U13 (4) | U13 C, 4800 (4 piger) | ja | — |
| 2025/2026 | U13 (4) | U13 C-D 5000 (4 spillere) BD | ja | — |
| 2025/2026 | U13 (4) | U13 D 4400 (4 piger) BD | ja | Gladsaxe Søborg 8 |
| 2025/2026 | U13 (4) | U13 D 4800 (4 spillere) BD | ja | Gladsaxe Søborg 4; Gladsaxe Søborg 5; Gladsaxe Søborg 6; Gladsaxe Søborg 7 |
| 2025/2026 | U13 (4) | U13 D, 4800 (2+2) | ja | — |
| 2025/2026 | U13 (4) | U13 Kredsmatch 2025 | nej — Kredsmatch | — |
| 2025/2026 | U13 (4) | Uge 38 - U13 A, 6000 (2+2) | ja | Gladsaxe Søborg 7 |
| 2025/2026 | U13 (4) | Uge 38 - U13 B, 5400 (2+2) | ja | Gladsaxe Søborg 8 |
| 2025/2026 | U13 (4) | Uge 38 - U13 C, 5000 (2+2) | ja | Gladsaxe Søborg 9 |
| 2025/2026 | U13 (4) | Uge 38 - U13 D, 4800 (2+2) | ja | Gladsaxe Søborg 10 |
| 2025/2026 | U15 (5) | U15 (4+3) | ja | — |
| 2025/2026 | U15 (5) | U15 A, 6800 (2+2) | ja | Gladsaxe Søborg 1 |
| 2025/2026 | U15 (5) | U15 A, 7200 (4 spillere) | ja | — |
| 2025/2026 | U15 (5) | U15 B 6400 (4 spillere) BD | ja | Gladsaxe Søborg 2 |
| 2025/2026 | U15 (5) | U15 B, 6000 (2+2) | ja | — |
| 2025/2026 | U15 (5) | U15 C 5000 (4 piger) BD | ja | — |
| 2025/2026 | U15 (5) | U15 C, 5400 (2+2) | ja | Gladsaxe Søborg 3 |
| 2025/2026 | U15 (5) | U15 C, 5600 (4 spillere) | ja | — |
| 2025/2026 | U15 (5) | U15 C-D 5200 (4 spillere) BD | ja | Gladsaxe Søborg 4 |
| 2025/2026 | U15 (5) | U15 D 5000 (4 spillere) BD | ja | Gladsaxe Søborg 5; Gladsaxe Søborg 6 |
| 2025/2026 | U15 (5) | U15 D, 4600 (4 piger) | ja | Gladsaxe Søborg 7 |
| 2025/2026 | U15 (5) | U15 D, 5000 (2+2) | ja | — |
| 2025/2026 | U15 (5) | U15 Kredsmatch 2025 | nej — Kredsmatch | — |
| 2025/2026 | U15 (5) | U15 M, 7800 (2+2) | ja | — |
| 2025/2026 | U15 (5) | Uge 38 - U15 A, 6800 (2+2) | ja | Gladsaxe Søborg 6 |
| 2025/2026 | U15 (5) | Uge 38 - U15 B, 6000 (2+2) | ja | — |
| 2025/2026 | U15 (5) | Uge 38 - U15 C, 5400 (2+2) | ja | Gladsaxe Søborg 8 |
| 2025/2026 | U15 (5) | Uge 38 - U15 M, 7800 (2+2) | ja | — |
| 2025/2026 | U17/U19 (18) | A 8400 (4 spillere) BD | ja | — |
| 2025/2026 | U17/U19 (18) | C 6400 (4 spillere) BD | ja | — |
| 2025/2026 | U17/U19 (18) | C-D 5600 (4 spillere) BD | ja | Gladsaxe Søborg 1 |
| 2025/2026 | U17/U19 (18) | U17/U19 A, 7800 (2+2) | ja | — |
| 2025/2026 | U17/U19 (18) | U17/U19 B, 6800 (2+2) | ja | — |
| 2025/2026 | U17/U19 (18) | U17/U19 B, 7200 (4 spillere) | ja | — |
| 2025/2026 | U17/U19 (18) | U17/U19 C, 5800 (2+2) | ja | — |
| 2025/2026 | U17/U19 (18) | U17/U19 D, 5000 (2+2) | ja | — |
| 2025/2026 | U17/U19 (18) | U17/U19 D, 5200 (4 spillere) | ja | Gladsaxe Søborg 2 |
| 2025/2026 | U17/U19 (18) | U17/U19 M, 10000 (4 spillere) | ja | — |
| 2025/2026 | U17/U19 (18) | U17/U19 M, 15000 (4+2) | ja | — |
| 2025/2026 | U17/U19 (18) | Uge 38 - U17/U19 A, 7800 (2+2) | ja | — |
| 2025/2026 | U17/U19 (18) | Uge 38 - U17/U19 D, 5000 (2+2) | ja | Gladsaxe Søborg 3 |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | U09 C-D 3400 (3 spillere) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | U09 D 3300 (3 spillere) BD | ja | Gladsaxe Søborg 1; Gladsaxe Søborg 2 |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | U9 Dx, 3000 (3 spillere) BD | ja | Gladsaxe Søborg 3; Gladsaxe Søborg 4 |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 (4+2) - maks. 8500 p. holdfællesskab | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 B, 5600 (4 spillere) BD | ja | Gladsaxe Søborg 1 |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 C, 5000 (4 spillere) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 C-D, 4700 (4 spillere) BD | ja | Gladsaxe Søborg 2 |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 D, 4200 (4 piger) BD | ja | Gladsaxe Søborg 5 |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 D, 4400 (4 spillere) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 Dx, 4200 (4 spillere) BD | ja | Gladsaxe Søborg 3; Gladsaxe Søborg 4 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 (4+3) - maks. 11500 p. holdfællesskab | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 A, 5800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 A, 6400 (4 spillere) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 B, 5200 (2+2) | ja | Gladsaxe Søborg 1 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 B, 5600 (4 spillere) BD | ja | Gladsaxe Søborg 2 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 C, 4800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 C, 4800 (4 piger) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 C, 5100 (4 spillere) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 C-D, 4800 (4 spillere) BD | ja | Gladsaxe Søborg 3 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 D, 4400 (4 piger) BD | ja | Gladsaxe Søborg 6 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 D, 4600 (4 spillere) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 Dx, 4400 (4 spillere) BD | ja | Gladsaxe Søborg 4; Gladsaxe Søborg 5 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | UGE 38 - U13 A, 5800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | UGE 38 - U13 B, 5200 (2+2) | ja | Gladsaxe Søborg 3; Gladsaxe Søborg 4 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | UGE 38 - U13 D, 4600 (2+2) | ja | Gladsaxe Søborg 5 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 (4+3) - maks. 14000 p. holdfællesskab | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 A, 6800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 A, 7200 (4 spillere) | ja | Gladsaxe Søborg 1 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 B, 5400 (4 piger) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 B, 5800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 B, 6200 (4 spillere) BD | ja | Gladsaxe Søborg 2; Gladsaxe Søborg 3 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 C, 4900 (4 piger) | ja | Gladsaxe Søborg 7 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 C, 5200 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 C, 5500 (4 spillere) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 C-D, 5100 (4 spillere) BD | ja | Gladsaxe Søborg 4 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 D, 4500 (4 piger) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 D, 4800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 D, 4800 (4 spillere) BD | ja | Gladsaxe Søborg 5 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 Dx, 4600 (4 spillere) | ja | Gladsaxe Søborg 6 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 M, 7800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 A, 6800 (2+2) | ja | Gladsaxe Søborg 1 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 B, 5800 (2+2) | ja | Gladsaxe Søborg 2 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 C, 5200 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 M, 7800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Uge 38 - U15 D, 4800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 A, 8200 (4 spillere) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 B, 6800 (2+2) | ja | Gladsaxe Søborg 1 |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 B, 7200 (4 spillere) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 C, 5800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 C, 6200 (4 spillere) BD | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 C-D, 5500 (4 spillere) BD | ja | Gladsaxe Søborg 2; Gladsaxe Søborg 3 |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 D, 4800 (4 piger) BD | ja | Gladsaxe Søborg 4 |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 D, 5000 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 D, 5100 (4 spillere) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 M, 14000 (4+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 M, 9600 (4 spillere) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 A, 7800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 B, 6800 (2+2) | ja | Gladsaxe Søborg; Gladsaxe Søborg 2 |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 C, 5800 (2+2) | ja | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 D, 5000 (2+2) | ja | Gladsaxe Søborg 3 |

### Samlet over tid pr. aldersgruppe (sæsonoptællinger summeret)

| Aldersgruppe | Sæsoner | Rækker/ligaer | Fysiske puljer |
| --- | --- | --- | --- |
| U09 (ID 2) | 6 | 9 af 13 (69,2%) | 14 af 22 (63,6%) |
| U11 (ID 3) | 15 | 31 af 94 (33%) | 39 af 136 (28,7%) |
| U13 (ID 4) | 15 | 40 af 124 (32,3%) | 46 af 170 (27,1%) |
| U15 (ID 5) | 15 | 48 af 137 (35%) | 50 af 188 (26,6%) |
| U17 (ID 6) | 6 | 4 af 21 (19%) | 4 af 21 (19%) |
| U17/U19 (ID 18) | 7 | 10 af 52 (19,2%) | 10 af 88 (11,4%) |

## Optælling

- GSB-hold-puljeposter fundet: **279** = lokalt placerede **171** + lokalt uplacerede **34** + lokalt udgået/trukket **12** + DMU-poster **62**.
- Udgået: **9**; trukket: **3**.
- Samarbejdshold rapporteret separat, ikke GSB: **1**.

## Fem stikprøver — puljeliste, placering og bredde

| Sæson | Alder | GSB-puljer | Bedste GSB-format/niveau | Højeste nationalt | Rækker GSB/total | Puljer GSB/total | 125-katalog formatkontrol | Pulje-/formatkontrol |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2011/2012 | U11 (3) | 4 | — | 4+3 (fastlagt af Christoffer) | 2/5 | 2/5 | 0/0 125-format match; 4 fallback/other | 2011\|3\|100: Gladsaxe Søborg 4 *udgået* → Uplaceret: X2 (ingen brugbar kategorisignatur) (udgået)<br>2011\|3\|97: Gladsaxe Søborg → Uplaceret: ingen formattekst (ingen brugbar kategorisignatur)<br>2011\|3\|98: Gladsaxe Søborg 2 → Uplaceret: ingen formattekst (ingen brugbar kategorisignatur)<br>2011\|3\|99: Gladsaxe Søborg 3 *udgået* → Uplaceret: X1 (ingen brugbar kategorisignatur) (udgået) |
| 2016/2017 | U11 (3) | 2 | 4 spillere D  | 4+3 (fastlagt af Christoffer) | 2/8 | 2/9 | 2/2 125-format match; 0 fallback/other | 2016\|3\|7668: Gladsaxe Søborg → 4 spillere<br>2016\|3\|9137: Gladsaxe Søborg → 4 spillere |
| 2020/2021 | U15 (5) | 3 | 4 spillere   | 4+3 (fastlagt af Christoffer) | 3/12 | 3/13 | 2/2 125-format match; 1 fallback/other | 2020\|5\|13470: Gladsaxe Søborg 1 → 4 spillere<br>2020\|5\|13473: Gladsaxe Søborg 2 → 4 spillere<br>2020\|5\|13474: Gladsaxe Søborg 3 → 4 piger |
| 2025/2026 | U11 (3) | 5 | 4 spillere D 4600 | 4+3 (fastlagt af Christoffer) | 3/6 | 4/13 | 5/5 125-format match; 0 fallback/other | 2025\|3\|18133: Gladsaxe Søborg 5 → 4 piger<br>2025\|3\|18134: Gladsaxe Søborg 1 → 4 spillere<br>2025\|3\|18134: Gladsaxe Søborg 2 → 4 spillere<br>2025\|3\|18135: Gladsaxe Søborg 3 → 4 spillere<br>2025\|3\|18138: Gladsaxe Søborg 4 → 4 spillere |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 10 | 2+2 B 5200 | 2+2 (fastlagt af Christoffer) | 7/15 | 9/19 | 0/0 125-format match; 10 fallback/other | 2026\|4\|18976: Gladsaxe Søborg 1 → Uplaceret: 2+2 (ingen brugbar kategorisignatur)<br>2026\|4\|18977: Gladsaxe Søborg 5 → 2+2<br>2026\|4\|19007: Gladsaxe Søborg 4 → 2+2<br>2026\|4\|19008: Gladsaxe Søborg 3 → 2+2<br>2026\|4\|19009: Gladsaxe Søborg 3 → 2+2<br>2026\|4\|19140: Gladsaxe Søborg 2 → Uplaceret: 4 spillere (ingen brugbar kategorisignatur)<br>2026\|4\|19142: Gladsaxe Søborg 3 → Uplaceret: 4 spillere (ingen brugbar kategorisignatur)<br>2026\|4\|19144: Gladsaxe Søborg 4 → Uplaceret: 4 spillere (ingen brugbar kategorisignatur)<br>2026\|4\|19144: Gladsaxe Søborg 5 → Uplaceret: 4 spillere (ingen brugbar kategorisignatur)<br>2026\|4\|19146: Gladsaxe Søborg 6 → Uplaceret: 4 piger (ingen brugbar kategorisignatur) |

Stikprøverne blev sammenholdt med de rå `league_groups`, `league_group_regions`, `league_group_teams`-rækker og 126's fysiske puljeformatkilder. Hver liste viser pool-nøgle, holdnavn, række/pulje og format; 125-formatet blev også sammenholdt direkte for alle sample-puljer der findes i 125-kataloget. Bredde kontrolleres på division- og puljenøgler.

### Særskilt kontrol: U13 2024/25

Format-/niveauprøven forventes i denne rækkefølge: 2+2 A 5600 > 4 spillere B 5000 > C 4200 > D 3600 > 4 piger D 3200. Region 8 har 13 rækker og 6 GSB-rækker; uden Kredsmatch 12 rækker og 6 GSB-rækker. Alle fem format-/niveauprøver bestod: true.

Samlet U13-puljepostafstemning: 14 = 9 lokalrække-poster + 5 DMU-poster; 9 unikke rå holdnavne i alt, hvor DMU omfatter 3 hold, og alle 3 også optræder i lokal række. Kortets tidligere “14 poster for 9 hold” var en fejl: 14 er samlet lokal+DMU-poster, ikke DMU alene.

## UGE 38 — kildedata og uafklaret betydning

Databasen indeholder 43 ungdoms-puljeposter med “UGE 38” i rækkenavnet; tabellen viser sæson, alder, format, række, puljenavn, holdantal, GSB-hold og om de også optræder i anden række. 43 rå detailresponser gentager “UGE 38” i den viste HTML-tekst. Det beviser rækkenavnet og at der findes pulje-/holddata; det fastslår ikke hvad “UGE 38” organisatorisk betyder eller om det giver adgang til DMU.

| Sæson | Alder | Format | Rækkenavn | Pulje/fase | Hold | GSB | GSB også anden række? | Detalje gentager UGE 38 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2024/2025 | U13 (4) | 2+2 | UGE 38 - U13 C, 4000 (2+2) | Pulje 1 | 4 | — | — | ja; HTML gentager navnet |
| 2024/2025 | U13 (4) | 2+2 | UGE 38 - U13 D, 3600 (2+2) | Pulje 1 | 3 | Gladsaxe Søborg 9 | Gladsaxe Søborg 9: nej | ja; HTML gentager navnet |
| 2024/2025 | U15 (5) | 2+2 | UGE 38 - U15 A, 6500 (2+2 | Pulje 1 | 3 | — | — | ja; HTML gentager navnet |
| 2024/2025 | U15 (5) | 2+2 | UGE 38 - U15 C, 4600 (2+2) | Pulje 1 | 4 | Gladsaxe Søborg 6 | Gladsaxe Søborg 6: nej | ja; HTML gentager navnet |
| 2024/2025 | U15 (5) | 2+2 | UGE 38 - U15 D, 4000 (2+2) | Pulje 1 | 4 | Gladsaxe Søborg 7 | Gladsaxe Søborg 7: nej | ja; HTML gentager navnet |
| 2024/2025 | U15 (5) | 2+2 | UGE 38 - U15 M, 7800 (2+2) | Pulje 1 | 3 | — | — | ja; HTML gentager navnet |
| 2024/2025 | U17/U19 (18) | 2+2 | UGE 38 - A, 7800 (2+2) | Pulje 1 | 3 | — | — | ja; HTML gentager navnet |
| 2024/2025 | U17/U19 (18) | 2+2 | UGE 38 - C, 5600 (2+2) | Pulje 1 | 3 | — | — | ja; HTML gentager navnet |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 A, 6000 (2+2) | Pulje 1 | 4 | Gladsaxe Søborg 7 | Gladsaxe Søborg 7: ja | ja; HTML gentager navnet |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 B, 5400 (2+2) | Pulje 1 | 3 | Gladsaxe Søborg 8 | Gladsaxe Søborg 8: ja | ja; HTML gentager navnet |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 B, 5400 (2+2) | Pulje 2 | 3 | — | — | ja; HTML gentager navnet |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 C, 5000 (2+2) | Pulje 1 | 3 | Gladsaxe Søborg 9 | Gladsaxe Søborg 9: nej | ja; HTML gentager navnet |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 D, 4800 (2+2) | Pulje 1 | 4 | Gladsaxe Søborg 10 | Gladsaxe Søborg 10: nej | ja; HTML gentager navnet |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 A, 6800 (2+2) | Pulje 1 | 3 | Gladsaxe Søborg 6 | Gladsaxe Søborg 6: ja | ja; HTML gentager navnet |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 A, 6800 (2+2) | Pulje 2 | 3 | — | — | ja; HTML gentager navnet |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 B, 6000 (2+2) | Pulje 1 | 3 | — | — | ja; HTML gentager navnet |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 B, 6000 (2+2) | Pulje 2 | 4 | — | — | ja; HTML gentager navnet |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 C, 5400 (2+2) | Pulje 1 | 3 | Gladsaxe Søborg 8 | Gladsaxe Søborg 8: nej | ja; HTML gentager navnet |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 C, 5400 (2+2) | Pulje 2 | 3 | — | — | ja; HTML gentager navnet |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 M, 7800 (2+2) | Pulje 1 | 4 | — | — | ja; HTML gentager navnet |
| 2025/2026 | U17/U19 (18) | 2+2 | Uge 38 - U17/U19 A, 7800 (2+2) | Pulje 1 | 3 | — | — | ja; HTML gentager navnet |
| 2025/2026 | U17/U19 (18) | 2+2 | Uge 38 - U17/U19 D, 5000 (2+2) | Pulje 1 | 3 | Gladsaxe Søborg 3 | Gladsaxe Søborg 3: nej | ja; HTML gentager navnet |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 A, 5800 (2+2) | Pulje 1 | 4 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 B, 5200 (2+2) | Finale | 2 | Gladsaxe Søborg 3 | Gladsaxe Søborg 3: ja | ja; HTML gentager navnet |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 B, 5200 (2+2) | Kampen om 3. pladsen | 2 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 B, 5200 (2+2) | Pulje 1 | 3 | Gladsaxe Søborg 4 | Gladsaxe Søborg 4: ja | ja; HTML gentager navnet |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 B, 5200 (2+2) | Pulje 2 | 2 | Gladsaxe Søborg 3 | Gladsaxe Søborg 3: ja | ja; HTML gentager navnet |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 D, 4600 (2+2) | Pulje 1 | 4 | Gladsaxe Søborg 5 | Gladsaxe Søborg 5: ja | ja; HTML gentager navnet |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 A, 6800 (2+2) | Finale | 2 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 A, 6800 (2+2) | Pulje 1 | 4 | Gladsaxe Søborg 1 | Gladsaxe Søborg 1: ja | ja; HTML gentager navnet |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 A, 6800 (2+2) | Pulje 2 | 3 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 B, 5800 (2+2) | Pulje 1 | 4 | Gladsaxe Søborg 2 | Gladsaxe Søborg 2: ja | ja; HTML gentager navnet |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 C, 5200 (2+2) | Pulje 1 | 4 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 M, 7800 (2+2) | Pulje 1 | 3 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U15 (5) | 2+2 | Uge 38 - U15 D, 4800 (2+2) | Pulje 1 | 4 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U17/U19 (18) | 2+2 | UGE 38 - U17/U19 A, 7800 (2+2) | Pulje 1 | 4 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U17/U19 (18) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | UGE 38 - U17/U19 B, 6800 (2+2) | Finale | 2 | Gladsaxe Søborg | Gladsaxe Søborg: nej | ja; HTML gentager navnet |
| 2026/2027 | U17/U19 (18) | 2+2 | UGE 38 - U17/U19 B, 6800 (2+2) | Pulje 1 | 3 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U17/U19 (18) | 2+2 | UGE 38 - U17/U19 B, 6800 (2+2) | Pulje 2 | 3 | Gladsaxe Søborg 2 | Gladsaxe Søborg 2: ja | ja; HTML gentager navnet |
| 2026/2027 | U17/U19 (18) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | UGE 38 - U17/U19 C, 5800 (2+2) | Finale | 2 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U17/U19 (18) | 2+2 | UGE 38 - U17/U19 C, 5800 (2+2) | Pulje 1 | 4 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U17/U19 (18) | 2+2 | UGE 38 - U17/U19 C, 5800 (2+2) | Pulje 2 | 4 | — | — | ja; HTML gentager navnet |
| 2026/2027 | U17/U19 (18) | 2+2 | UGE 38 - U17/U19 D, 5000 (2+2) | Pulje 1 | 4 | Gladsaxe Søborg 3 | Gladsaxe Søborg 3: ja | ja; HTML gentager navnet |

Samtidige “4 piger C” og “4 spillere D”-rækker forekommer i 11 sæson/aldersgruppe-kombinationer. Hvor de forekommer, anvendes formatrækkefølgen; bogstaver sammenlignes ikke på tværs af formater. Se JSON-feltet `format_level_crossings`.

## Databaseværn

- gsb-statistik-normalized.db SHA-256: `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e` → `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e`
  Rækketal før/efter: `{"clubs":1,"competitions":462,"extraction_errors":1444,"individual_match_players":67196,"individual_matches":20319,"players":7599,"raw_payloads":2874,"seasons":26,"standings":751,"team_matches":2818,"teams":472}` / `{"clubs":1,"competitions":462,"extraction_errors":1444,"individual_match_players":67196,"individual_matches":20319,"players":7599,"raw_payloads":2874,"seasons":26,"standings":751,"team_matches":2818,"teams":472}`
- liga-landskab.db SHA-256: `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c` → `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c`
  Rækketal før/efter: `{"age_groups":29,"club_registry":796,"fetch_errors":0,"group_type_katalog":8928,"league_group_details":18546,"league_group_match_counts":18546,"league_group_regions":59127,"league_group_teams":96823,"league_groups":18546,"league_match_groups":310137,"league_match_requests":221558,"league_matches":203012,"match_categories":1300474,"match_games":2636258,"regions":33,"standing_indexes":16269}` / `{"age_groups":29,"club_registry":796,"fetch_errors":0,"group_type_katalog":8928,"league_group_details":18546,"league_group_match_counts":18546,"league_group_regions":59127,"league_group_teams":96823,"league_groups":18546,"league_match_groups":310137,"league_match_requests":221558,"league_matches":203012,"match_categories":1300474,"match_games":2636258,"regions":33,"standing_indexes":16269}`

Alle SHA-256 og tabelrækketal er ens før/efter; databaser åbnet `readOnly: true`.
