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

Kun **4+3 > 4+2 > 2+2 > 4 spillere > 4 piger** indgår i formatplaceringen. 3 spillere, 5 spillere, X1, X2, 4-8 spillere og alle ikke-kanoniske signaturer står som **Ikke placeret**; de indgår hverken i hierarkiets x/n eller i formatplaceringen. Tabellen viser fysiske puljer, rækker, poster og GSB-hold:

| Ikke placeret format/signatur | Fysiske puljer | Hold-puljeposter | Rækker | GSB-poster | Holdnavne |
| --- | --- | --- | --- | --- | --- |
| 3 spillere | 38 | 204 | U09 C 3600 (3 spillere) BD; U09 C 3600 (3 spillere) BD (2. halvår); U09 D 3300 (3 spillere) BD; U09 D 3300 (3 spillere) BD (2. halvår); U11 BEGYNDER - 3 spillere; U13 BEGYNDER - 3 spillere; U9 - Begynder - Opstartsturnering - 20.sep; U9 - Begynderholdturnering - Februar; U9 - Begynderholdturnering - Januar; U9 - Begynderholdturnering - Marts; U9 BEGYNDER - 3 spillere; U9 D, 3300 (3 spillere); U9D (3300) - 3 spillere; U9D + U9C - 3 spillere | 8 | &#216;BG Silkeborg 1; &#216;lstykke 1; Auning 1; Badminton Esbjerg 1; Badminton Esbjerg 11; Badminton Esbjerg 2; Badminton Esbjerg 22; BC37 Amager 1; Blans Sundeved 1; Blans Sundeved 2; Borbjerg GU 1; Brabrand 1; Brabrand 11; Brabrand 2; Brabrand 22; Charlottenlund 1; Dalum Hjallese BK 1; Dalum Hjallese BK 2; Drive 1; Drive 2; Dronninglund 1; Elbohallen 1; Elbohallen 1 Beg.; Fredensborg 1; Frederiksberg 1; Gentofte 1; Gentofte 2; Gistrup LKB 1; Gladsaxe Søborg 1; Gladsaxe Søborg 2; Gladsaxe Søborg 3; Gladsaxe Søborg 4; Gladsaxe Søborg 5; Grindsted BK 1; Grindsted BK 1 Geng.; Grønbjerg 1; Graasten 1; Gørding/ Lourup 1; Gørding/ Lourup 1 Beg.; Herlev/Hjorten 1; Hillerød 1; Hillerød 2; Hjørring 1; Hjørring 2; Hjørring 3; Hjørring 4; HOG Badminton, Hinnerup 1; HOG Badminton, Hinnerup 11; Holbæk 1; Hornslet IF 1; Hornslet IF 11; Hornslet IF 2; Hornslet IF 22; Horsens 1; Horsens 11; Hvidovre 1; Højbjerg 1; Højbjerg 11; Højbjerg 2; Højbjerg 22; Højbjerg 3; Højbjerg 33; Højby S&G 1; Islands Brygge 1; KBK Kbh. 1; KMB2010 1; Kolding BK 1; Kolding BK 1 Geng.; Kolt-Hasselager 1; Lillerød 1; Lindholm 1; Lindholm 2; Lindholm 3; Lund 1; Lyngby 1; Lyngby 2; Mejrup G og UF 1; NBK Amager 1; Nørre Djurs BK 1; Odder 1; Odder 2; Odense OBK 1 (Disp); Odense OBK 2; Odense OBK 3; Oksbøl Badminton Klub 1 Beg.; Ribe 1; Ribe 11; Ribe 2; Ribe 22; Ringkøbing 1; Ringsted; Ringsted 1; Rosendal 1; Rosendal 2; Rudersdal; Rudersdal 1; Ry 1; Ry 11; Rødekro 1; Rødekro 2; Sdr. Hygum 1; Sdr. Hygum 11; Sdr. Hygum 2 (U9C hold); Sdr. Hygum 22 (U9C hold); Skjern 1; Skovshoved 1; Skovshoved 2; Skovshoved 3; Solbjerg 1; Solrød Strand 1; Solrød Strand 2; Solrød Strand 3; Sorring 1; Sorring 11; St. Restrup 1; Stavtrup 1; Stavtrup 11; Stavtrup 2; Stavtrup 22; Støvring 1; Støvring 2; Støvring 3; Støvring 5; Støvring 6; Støvring 7; Svenstrup 1; Svenstrup 2; Svenstrup 3; Svenstrup 4; Svenstrup 5; Svenstrup 6; Svenstrup 7; Tarup-Pårup 1; Team Vejleå 1; Team-DFS9 1; Tranbjerg AIA 1; Tranbjerg AIA 11; Tranbjerg AIA 2; Tønder 1; Tønder 2; Valby BC 1; Vamdrup 1; Vejgaard 1; Vester Hassing 1; Viby J 1; Viby J 11; Viby J 2; Viby J 22; Viby J 3; Vinding SF 1; Vinding SF 11; Vinding SF 2 Beg.; Vorbasse 1; Aabenraa 1; Aabenraa 2; Aalborg Triton 1; Aalborg Triton 2; Aalborg Triton 3; Aalborg Triton 4; Aarhus AB 1; Aarhus AB 11; Aarhus AB 2; Aarhus AB 22; Aarhus AB 3; Aarhus AB 33; Aarhus AB 4 |
| 4-8 spillere | 131 | 716 | U09 B 4-8 spillere; U09 D 4-8 spillere; U11 B 4-8 spillere; U11 C 4-8 spillere; U11 D 4-8 spillere; U13 A 4-8 spillere; U13 B 4-8 spillere; U13 C 4-8 spillere; U13 D 4-8 spillere; U13 M 4-8 spillere; U15 A 4-8 spillere; U15 B 4-8 spillere; U15 C 4-8 spillere; U15 D 4-8 spillere; U17 C 4-8 spillere; U17+U19 A 4-8 spillere; U17+U19 B 4-8 spillere; U17+U19 C 4-8 spillere; U17+U19 M 4-8 spillere; U17-19 A 4-8 spillere; U17-19 B 4-8 spillere; U17-19 C 4-8 spillere; U9 D 4-8 spillere | 0 | &#216;BG Silkeborg; &#216;land-Halvrimmen Idrætsklub; &#216;land-Halvrimmen Idrætsklub 1; &#216;land-Halvrimmen Idrætsklub 1 Arentsminde; &#216;land-Halvrimmen Idrætsklub 2; &#216;land-Halvrimmen Idrætsklub 2 Arentsminde; &#216;land-Halvrimmen Idrætsklub Arentsminde; &#216;lstykke; &#216;lstykke 1; &#216;lstykke 2; &#216;nslev-Eskildstrup 1; &#216;nslev-Eskildstrup 2; &#216;ster Hornum 1; &#216;ster Hurup 1; &#216;ster Hurup 2; abc Aalborg; Albertslund; Albertslund 1; Asdal 1; Asdal 2; Assens IF 1; Badminton Esbjerg; Badminton Esbjerg 1; Badminton Esbjerg 2; Badminton Roskilde; Badminton Roskilde 1; Badminton Roskilde 2; Badminton Roskilde 3; Badminton Roskilde 4; Bagterp 1 DGI; Bagterp 2 DGI; Biersted; Bindslev-Tversted; Bindslev-Tversted 1; Bindslev-Tversted 2; Birkerød BK13 1; Bjergby-Mygdal 1; Bjergby-Mygdal 2; Bjergby-Mygdal 2 DGI; Bjergby-Mygdal 3 DGI; Bjergby-Mygdal DGI; BNB Nibe; BNB Nibe 1; BNB Nibe 2; Bramming; Brande; Brande udgået; Bredsten; Brønderslev 1; Brønderslev 2; Brønderslev 3; Bælum-Solbjerg; Bælum-Solbjerg 1; Dall-Ferslev; Dall-Ferslev 1; Dall-Ferslev 2; Doense-Vebbestrup IF 1; Erritsø/Fredericia; Farum 1; Farum 2; Farum 2 /Birkerød; Fjerritslev; Fjerritslev 1; Fjerritslev 2; Fjerritslev 3; Frederikshavn 1; Frederikshavn 1 DGI; Frederikshavn 2; Frederikshavn 2 DGI; Frederikshavn 3; Frederikssund 1; Frederiksværk 1; Frem - Hellebæk 1; Frem - Hellebæk 1 * Trukket; Frem - Hellebæk 2; Gistrup LKB 1; Gjellerup; Gjøl; Glostrup 1; Glumsø; Glumsø 1; Glumsø 2; Greve; Greve 1; Greve 2; Greve 3; Grindsted BK; Grindsted BK 1; Græsted 1; Gug 1; Gug 2; Gødvad, Silkeborg; Hadsund 1; Hadsund 2; Hals 1; Hellevad; Helsingør; Helsingør 1; Herlev/Hjorten; Herlev/Hjorten 1; Herlev/Hjorten 1 *Trukket; Herlev/Hjorten 2; Herlev/Hjorten 3; Herlufsholm 1; Herlufsholm 2; Hillerød 1; Hillerød 2; Hillerød 3; Hillerød 4; Hjerting IF; Hjørring; Hjørring 1; Hjørring 2; Hjørring 3; Hjørring 4; Hjørring 5; Hobro 1; Hobro 2; Holbæk; Holbæk 1; Holbæk 2; Holte; Holte 1; Holte 2; Holte 3; Horne Efterskole, Badminton 1; Horreby 1; Horsens; Humlebæk; Humlebæk 1; Humlebæk 2; Hørsholm; Hørsholm 1; Hørsholm 2; Hørsholm 3; Hørsholm 4; Idestrup 1; Ikast; Ishøj SB 50; Ishøj SB 50 1; Ishøj SB 50 2; Ishøj SB 50 3; Jernløse; Jernløse 1; Jerslev-Sterup 1; Jetsmark; Karlslunde 1; Kirke Hyllinge 1; Kirke Hyllinge 2; Klarup Badminton 1; Klarup Badminton 2; Klokkerholm 1; Klokkerholm 2 DGI; Klokkerholm DGI; Kolding BK; Kraghave 1; Kraghave 2; Kvissel Ravnshøj IF 1; Køge; Køge 1; Køge 2; Køge 3; Langholt; Langholt 1; Langholt 1 DGI; Langhøj; Ledøje-Smørum 1; Ledøje-Smørum 2; Lillerød; Lillerød 1; Lillerød 2; Lillerød 3; Lind KLG; Lind KLG 1; Lind KLG 2; Lindholm 1; Lindholm 2; Lindholm 3; Lindholm 4; Lolland/Falster 1; Løkken; Mariager 1; Middelfart; Mou 1; Møn 1; Møn 2; Møn 3; Måløv 1; Nakskov 1; Nivå-Kokkedal 1; Nivå-Kokkedal 2; Nr. Lyndelse; Nykøbing F 1; Nykøbing Sj.; Nykøbing Sj. 1; Næstved; Næstved 1; Næstved 2; Nørhalne; Osted; Poulstrup Vrejlev; Poulstrup Vrejlev 1 DGI; Ribe; Rosendal 1; Rosendal 2; Rosendal 3; Rudersdal 1; Rudersdal 2; Rødby 1; Rødby 2; Rønde Efterskole 1; Rønde Efterskole 2; Sakskøbing 1; Saltum 1; Saltum 1 DGI; Sejlflod 1; Sejlflod 1 DGI; Sejlflod 2; Sejlflod 2 DGI; Sejlflod 3; Silkeborg BK; Skagen; Skagen 1; Skagen 2; Skalborg SK 1; Skalborg SK 2; Skalborg SK 3; Skallerup/Vennebj. DGI; Skive-Resen; Skovsgård/Brovst; Skovsgård/Brovst 1; Skovsgård/Brovst 2; Slagelse; Slagelse 1; Slagelse 2; Smiff Badminton 1; Solrød Strand 1; Solrød Strand 2; Solrød Strand 3; Solrød Strand 4; Solrød Strand 5; Sorø/Lynge Broby; St. Restrup 1; Stidsholt IF; Stidsholt IF 3; Storstrømmen-Kippinge 1; Strandby/Elling; Strandby/Elling 1; Strandby/Elling 2; Stubbekøbing; Stubbekøbing 1; Stubbekøbing 2; Stubbekøbing 3; Stubbekøbing 4; Stubbekøbing 5; Støvring 1; Støvring 2; Støvring 3; Sulsted 1 Vestbjerg; Sulsted 2 Vestbjerg; Sulsted Vestbjerg; Svenstrup; Svenstrup 1; Svenstrup 2; Sæby; Sæby 1; Sæby DGI; Thorup/Klim; Tingsted; Tingsted 1; Tingsted 2; Tune 1; Tune 2; Tylstrup 1; Tylstrup 2; Taastrup Elite; Taastrup Elite 1; Taastrup Elite 2; Taastrup TIK 1; Ukendt modstander; Ulsted Boldklub, Badmintonafd. 1; Varde; Vejen; Vejle; Vestbjerg; Vester Hassing; Vester Hassing 1; Vester Hornum 1; Viborg; Viborg 1; Viborg 2; Videbæk; Virum 1; Viskinge 2 *Trukket; Vodskov; Vodskov 1; Vodskov 1 DGI; Vordingborg 1; Vrå 1; Vrå 1 DGI; Vrå DGI; Værløse; Værløse 1; Værløse 2; Værløse 3; Værløse 4; Aabybro; Aabybro 1; Aabybro 2; Aalborg Triton 1; Aalborg Triton 2; Aarhus AB; Aars 1; Aars 2 |
| 5 spillere | 5 | 27 | &#216;M 5 Spillere C-række (4si., 3do.); EFTERSKOLETURN. U17/U19A (10.500) - 5 Spillere; EFTERSKOLETURN. U17/U19B (9.000) - 5 Spillere | 0 | Brøruphus Efterskole 1; Efterskolen Play 1; Efterskolen Play 2; Glamsdalen 1 (xtra); Gudenaadalens Efterskole 11; Hjemly Idrætsefterskole 1 (xtra); Hjemly Idrætsefterskole 2 (xtra); Hjemly Idrætsefterskole 3; Rønde Efterskole 11; Rønde Efterskole 12; Rønde Efterskole 2 (xtra); Rønde Efterskole 3 (xtra); Rønde Efterskole 4 (xtra); Rønde Efterskole 5 (xtra); Sportsefterskolen SINE 1 (xtra); Sportsefterskolen SINE 2 (xtra); Sportsefterskolen SINE 3 (xtra); Strib Idrætsefterskole 1 (xtra); Strib Idrætsefterskole 2; Strib Idrætsefterskole 3 (xtra); Tirstrup Idrætsefterskole 11; Vedersø Idrætsefterskole 1 (flyttet fra C); Vivild Idrætsefterskole 11; Vivild Idrætsefterskole 12; Vojens GI 1 (xtra) |
| Ikke-kanonisk signatur: DS2/DD1/HS4/HD2 | 1 | 4 | U11 1. Serie | 0 | Gentofte; KBK Kbh.; Lyngby; Skovshoved |
| Ikke-kanonisk signatur: HS4/HD2 | 17 | 76 | B (4dr.); C (4dr.); Finale U17B 4 drenge; U13B (4dr.) finale; U13C (4dr.) finale; U15C (4dr.) finale; U17 A-række (4 drenge); U17 B-række (4 drenge); U17 B-række 4 drenge; U17B (4dr.) finale; U17C (4dr.) finale | 0 | Albertslund 1; Birkerød BK13 1; Birkerød BK13 2; Brøndby Strand 1; Fredensborg 1; Frederikssund; Frem - Hellebæk; Ganløse 1; Glostrup; Glostrup *Trukket; Glostrup 2; Haslev 1; Haslev 1 *trukket; Haslev 2 *trukket; Helsinge 1; Helsinge 1 *trukket; Helsingør 1; Herlufsholm 1; Herlufsholm 2; Hillerød * Trukket; Hillerød 2; Hillerød 2 *trukket; Hillerød 3; Hillerød 4; Hillerød 4 *Trukket; Holte; Hornbæk 1; Humlebæk; Humlebæk 2; Hørsholm; Ishøj SB 50 * Trukket; Ishøj SB 50 1; Ishøj SB 50 2 *trukket; Kirke Hyllinge 1; Kirke Hyllinge 2; Køge; Køge *Trukket; Køge 1; Næstved 1 *trukket; Osted; Osted 1; Ringsted 1; Ringsted 2; Roskilde HBK 2; Skovlunde 1; Slagelse; Slagelse 1; Solrød Strand 3; Solrød Strand 4 *trukket; Søllerød 1; Taastrup Elite 2; Virum 1; Virum 1 *trukket; Værløse 1; Værløse 2; Værløse 3 * Trukket |
| Ikke-kanonisk signatur: MD1/DS1/DD1/HS1/HD1 | 6 | 25 | U13 B; U13B; U15A; U15B; U17B | 0 | Bellinge IF, Badminton; Dalum Hjallese BK; Fjordager; Fjordager (U13A); Horne Badminton Klub; Korup; Korup 2; Middelfart; Nr. &#197;by; Nr. Lyndelse; Nr. Lyndelse 2; Næsby; Næsby 2; Næsby U17B; Odense OBK |
| Ikke-kanonisk signatur: MD1/DS1/DD1/S3/D2 | 2 | 12 | U15A4+2; U15B4+2 | 0 | Badminton Esbjerg; Brande; Fredericia; Grindsted BK; Horsens; Højbjerg; Kolding BK; Skive-Resen; Varde; Vejle; Videbæk |
| Ikke-kanonisk signatur: MD1/DS2/DD2/HS2/HD2 | 6 | 16 | 8-Nations | 0 | Belgien; Belgium. Belgium; Denmark; Denmark. Denmark; England; England. England; France. France; Frankrig; Germany. Germany; Holland; Netherlands Netherlands; Schweiz; Sverige; Sweden. Sweden; Switzerland. Switzerland; Tyskland |
| Ikke-kanonisk signatur: MD1/S4/D3 | 12 | 77 | U11 2. Serie; U11 3. Serie; U13 2. Serie; U13 2. serie; U13 3. Serie; U15 2. Serie; U15 2. serie; U15 3. Serie; U15 3. serie; U17 2. Serie; U17 2. serie | 6 | BC37 Amager; BC37 Amager udgået; Charlottenlund; Charlottenlund 2; Dragør; Drive; Drive 2; FKIF Frederiksberg; FKIF Frederiksberg trukket; Frederiksberg; Frederiksberg *Trukket; Frederiksberg 2; Frederiksberg 3 udgået; Frederiksberg udgået; Gladsaxe Søborg; Hvidovre; Hvidovre HB2000; Hvidovre HB2000 2; Hvidovre trukket; Hvidovre udgået; Islands Brygge *Trukket; KBK Kbh.; KBK Kbh. 2; KBK Kbh. 3; KMB2010; KMB2010 *Trukket; Lyngby; Lyngby 2; NBK Amager; Skovshoved 2; Valby BC; Vanløse; Vanløse *Trukket |
| Ikke-kanonisk signatur: MD2/DS2/DD1/S4/D2 | 1 | 3 | &#216;M 5 + 3 A | 0 | Rønde Efterskole 11; Rønde Efterskole 12; Vivild Idrætsefterskole 1 |
| Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | 12 | 24 | Kredsmatch BADKBH-BADSJ U11; Kredsmatch BADKBH-BADSJ U13; Kredsmatch BADKBH-BADSJ U15; Kredsmatch BADKBH-BADSJ&#198; U11; Kredsmatch BADKBH-BADSJ&#198; U13; Kredsmatch BADKBH-BADSJ&#198; U15; Kredsmatch BADKBH-BADSJ&#198; U17; Kredsmatch BADSJ&#198; - BADKBH; U11 6+4 | 0 | Badminton København; Badminton Sjælland; Højbjerg; Odense OBK |
| Ikke-kanonisk signatur: S3 | 2 | 9 | U11 X (Begynder); U13 X (Begynder) | 0 | Rødekro 1; Rødekro 2; Toftlund Idrætsfore.; Tønder; Tønder 1; Tønder 2 |
| Ikke-kanonisk signatur: S4/D4 | 3 | 8 | EFTERSKOLEMESTERSKAB 4 SP.-M; EFTERSKOLEMESTERSKAB 4A Spillere; U13 - Begynder - Opstartsturnering - 20.sep | 0 | Efterskolen Play 1; Farsø 1; Rønde Efterskole 3; Rønde Efterskole 4; Stidsholt IF 1; Strib Idrætsefterskole 2; Vejgaard 1 |
| Ikke-kanonisk signatur: S6/D3 | 3 | 14 | &#216;M 6 A/B; U11 2. Serie; U11 3. Serie | 1 | Charlottenlund; Charlottenlund 2; Drive; Frederiksberg; Gladsaxe Søborg; Hvidovre; KBK Kbh. 2 udgået; KBK Kbh. 3; KMB2010; Lyngby 2; Rønde Efterskole 13; Rønde Efterskole 14; Skovshoved 2; Tirstrup Idrætsefterskole 1 |
| Ikke-kanonisk signatur: S8 | 28 | 112 | U09 Finale; U11 -Begynder; U11 Begynder; U11 Begynderrække; U11 S1; U11 S2; U11 SB; U11 begynder; U11S; U11SA; U11SB; U13 -Begynder; U13 Begynder; U13 Begynderrække; U13 S; U15 S; U9 Begynder; U9 Begynderrække; U9S; U9SA; U9SB | 0 | &#197;rslev; Aunslev; Aunslev 2; Bellinge IF, Badminton; Bellinge IF, Badminton 1; Bolbro 2; Dalum Hjallese BK; Dalum Hjallese BK 1; Dalum Hjallese BK 2; Dalum Hjallese BK 3; Fjordager; FYNFGH; FYNFGH 1; FYNFGH 2; Horne Badminton Klub; Horne Badminton Klub 1; Korup; Kullerup/Refsvindinge 1; Kværndrup 1; Kværndrup 2; Langeskov 1; Langeskov 2; Lillerød 1; Middelfart; Middelfart 1; Middelfart 2; Morud 1; Munkebo BK69 1; Munkebo BK69 2; Nr. &#197;by; Nr. Broby; Nr. Broby 1; Nr. Lyndelse; Nr. Lyndelse 1; Nr. Lyndelse 2; Nyborg; Næsby; Næsby 2; Odense BK77; Odense BK77 1; Odense BK77 2; Odense OBK; Odense OBK 1; Odense OBK 2; Odense OBK 3; Odense OBK 5; Odense OBK 6; Ringe; Rise; Solrød Strand 1; Stige; Stige 2; Strib; Strib 1; Søhus; Vindinge Fyn 1; Vissenbjerg; Vissenbjerg 2; Aarup Badmintonklub; Aarup Badmintonklub 1 |
| Uplaceret: 2+2 (ingen brugbar kategorisignatur) | 14 | 67 | &#216;M EFTERSKOLER 2+2 D; U13 A, 5800 (2+2); U13 B, 5200 (2+2); U13 C, 4800 (2+2); U15 A, 6800 (2+2); U15 B, 5400 (2+2); U15 B, 5800 (2+2); U15 C, 5200 (2+2); U15 D, 4800 (2+2); U15 M, 7800 (2+2); U17/U19 B, 6800 (2+2); U17/U19 C, 5800 (2+2); U17/U19 D, 5000 (2+2) | 2 | Badminton Bornholm 1; Badminton Roskilde 1; BC37 Amager 1; BC37 Amager 2; BC37 Amager 3; Drive 1; Drive 2; Drive 3; Drive 4; Frederiksberg 1; Frem - Hellebæk 1; Gentofte 2; Gentofte 3; Gladsaxe Søborg 1; Greve 1; Greve 2; Greve 3; Herlev/Hjorten 1; Holbæk 1; Humlebæk 1; Hvidovre 1; Hvidovre 2; Hvidovre HB2000 1; Hørsholm 1; Islands Brygge 1; Jernløse 1; KBK Kbh. 1; KBK Kbh. 2; KMB2010 2; KMB2010 3; Køge 1; Lyngby 1; Nykøbing F 1; Næstved-Herlufsholm 1; Roskilde/Valby 1; Rønde Efterskole 19; SAIF Kbh. 1; Skovshoved 1; Skovshoved 2; Skrødstrup Efterskole 2; Slagelse/Sorø/Skælskør 1; Slangerup/Holte 1; Solrød Strand 2; Team Sydkysten 1; Team Sydkysten 2; Team Sydkysten 3; Tune 1; Valby BC 2; VBC/FKIF 1; Vivild Idrætsefterskole 19; Værløse 1 |
| Uplaceret: 3 spillere (ingen brugbar kategorisignatur) | 4 | 28 | U09 C-D 3400 (3 spillere) BD; U09 D 3300 (3 spillere) BD; U9 D, 3300 (3 spillere); U9 Dx, 3000 (3 spillere) BD | 4 | BC37 Amager 1; BC37 Amager 2; Birkerød BK13 1; Charlottenlund 1; Drive 1; Drive 2; Gentofte 1; Gladsaxe Søborg 1; Gladsaxe Søborg 2; Gladsaxe Søborg 3; Gladsaxe Søborg 4; Hillerød 1; Holbæk 1; Islands Brygge 1; KBK Kbh. 1; KMB2010 1; Lillerød 1; Lyngby 1; Lyngby 2; Lyngby 3; NBK Amager 1; Ringsted 1; Rudersdal 1; Skovshoved 1; Solrød Strand 1; Team Slagelse/Skælskør 1; Vindinge 1; Værløse 1 |
| Uplaceret: 4 piger (ingen brugbar kategorisignatur) | 33 | 149 | &#216;M 4 PIGER Doubler; &#216;M EFTERSKOLER 4 Piger; &#216;M EFTERSKOLER 4 Piger D1; &#216;M EFTERSKOLER 4 Piger D2; &#216;M EFTERSKOLER 4 Piger beg. (4 doubler); &#216;M EFTERSKOLER X 4 piger; &#216;M EFTSK. U17 C 4 PIGER; &#216;M EFTSK. U17 C 4 PIGER SLUTSPIL; &#216;M efterskoler 4 piger C; &#216;M efterskoler 4 piger C slutspil; &#216;M efterskoler C 4 piger; U11 D, 4200 (4 piger); U11 D, 4200 (4 piger) BD; U13 3400 - 4 piger; U13 C, 4800 (4 piger) BD; U13 D, 4400 (4 piger); U13 D, 4400 (4 piger) BD; U15 B, 5400 (4 piger) BD; U15 C, 4900 (4 piger); U15 D, 4500 (4 piger); U17/U19 C, 5300 (4 piger); U17/U19 D, 4800 (4 piger) BD | 4 | &#216;lstykke 1; 2 fra Pulje 1; Badminton Roskilde 6; Badminton Roskilde 7; BC37 Amager 4; BC37 Amager 5; Birkerød BK13 2; Birkerød BK13 3; Birkerød BK13 4; Brøndby BK 2; Charlottenlund 2; Charlottenlund 3; Dalum Hjallese BK; Dragør 2; Dragør 3; Drive 4; Drive 7; Farum 3; FKIF Frederiksberg 1; FKIF Frederiksberg 2; Frederikssund 1; Gentofte 3; Gentofte 4; Gladsaxe Søborg 4; Gladsaxe Søborg 5; Gladsaxe Søborg 6; Gladsaxe Søborg 7; Gudenaadalens Efterskole 1; Gudenaadalens Efterskole 14; Gudenaadalens Efterskole 15; Gudenaadalens Efterskole 16; Gudenaadalens Efterskole 17; Gudenaadalens Efterskole 18; Gudenaadalens Efterskole 2; Gudenaadalens Efterskole 3; Gudenaadalens Efterskole 4; Gudenaadalens Efterskole 6; Gudenaadalens Efterskole 7; Gudenaadalens Efterskole 8; Gudenaadalens Efterskole 9; Gørlev 1; Herlev/Hjorten 3; Herlev/Hjorten 4; Herlev/Hjorten 5; Hillerød 3; Hillerød 4; HMI, Hou; Holte 2; Hou; Jernløse 3; KBK Kbh. 4; KBK Kbh. 5; KMB2010 2; KMB2010 3; KMB2010 4; KMB2010 5; Køge 3; Ledøje-Smørum 2; Lejre 2; Lundtofte 3; Lyngby 4; Lyngby 7; NBK Amager 2; NBK Amager 3; Nivå-Kokkedal 4; Rudersdal 2; Rødovre 1; Rønde Efterskole; Rønde Efterskole 14; Rønde Efterskole 15; Rønde Efterskole 16; Rønde Efterskole 18; Rønde Efterskole 21; Rønde Efterskole 7; Skovshoved 4; Skovshoved 5; Skrødstrup Efterskole 12; Skrødstrup Efterskole 2; Slagelse 1; Slangerup 2; Solrød Strand 5; Tarup-Pårup; Team Vejleå 3; Tirstrup Idrætsefterskole; Tirstrup Idrætsefterskole 12; Tirstrup Idrætsefterskole 13; Tirstrup Idrætsefterskole 14; Tirstrup Idrætsefterskole 15; Tirstrup Idrætsefterskole 18; Tirstrup Idrætsefterskole 19; Tirstrup Idrætsefterskole 20; Tirstrup Idrætsefterskole 21; Tirstrup Idrætsefterskole 22; Tirstrup Idrætsefterskole 23; Tirstrup Idrætsefterskole 24; Tirstrup Idrætsefterskole 4; Tirstrup Idrætsefterskole 5; Tirstrup Idrætsefterskole 6; Taastrup BC 2; Valby BC 6; Vallensbæk 2; Vallensbæk 3; Vivild Idrætsefterskole; Vivild Idrætsefterskole 10; Vivild Idrætsefterskole 14; Vivild Idrætsefterskole 15; Vivild Idrætsefterskole 16; Vivild Idrætsefterskole 17; Vivild Idrætsefterskole 18; Vivild Idrætsefterskole 5; Værløse 6 |
| Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | 109 | 598 | &#216;M EFTERSKOLER 4 Spillere Beg. 1; &#216;M EFTERSKOLER 4 Spillere Beg. 2; &#216;M EFTERSKOLER 4 Spillere Beg. Do.; &#216;M EFTERSKOLER 4 Spillere D1; &#216;M EFTERSKOLER 4 Spillere D2; &#216;M EFTERSKOLER 4 Spillere D3; &#216;M EFTERSKOLER Valgfag 4 Spillere; &#216;M EFTERSKOLER X 4 spillere; &#216;M efterskoler B 4 spillere; &#216;M efterskoler C 4 spillere; &#216;M efterskoler Cx 4 spillere; &#216;M efterskoler Dx 4 spillere; U 11, Begyndere ikke pointgivende, 4 spillere; U 13, Begyndere ikke pointgivende, 4 spillere; U11 - 3000 (4 spillere); U11 - 3800 (4 spillere); U11 4 spillere Begynder 12-mar.; U11 B, 5600 (4 spillere) BD; U11 C, 5000 (4 spillere); U11 C, 5000 (4 spillere) BD; U11 C-D, 4700 (4 spillere); U11 C-D, 4700 (4 spillere) BD; U11 D, 4400 (4 spillere); U11 D, 4400 (4 spillere) BD; U11 Dx, 4200 (4 spillere); U11 Dx, 4200 (4 spillere) BD; U11A 4 spillere; U13 A, 6400 (4 spillere) BD; U13 A-række 4 spillere; U13 B, 5600 (4 spillere); U13 B, 5600 (4 spillere) BD; U13 C, 5100 (4 spillere); U13 C, 5100 (4 spillere) BD; U13 C-D, 4800 (4 spillere); U13 C-D, 4800 (4 spillere) BD; U13 D 4600 (4 spillere); U13 D, 4600 (4 spillere); U13 D, 4600 (4 spillere) BD; U13 Dx, 4400 (4 spillere); U13 Dx, 4400 (4 spillere) BD; U15 - 5600 (4 spillere); U15 A, 7200 (4 spillere); U15 B, 6200 (4 spillere); U15 B, 6200 (4 spillere) BD; U15 C, 5500 (4 spillere); U15 C-D, 5100 (4 spillere); U15 C-D, 5100 (4 spillere) BD; U15 D 4800 (4 spillere); U15 D, 4800 (4 spillere); U15 D, 4800 (4 spillere) BD; U15 Dx, 4600 (4 spillere); U17/U19 - 8000 (4 spillere); U17/U19 - 9600 4 spillere; U17/U19 A 4 spillere; U17/U19 A, 8200 (4 spillere); U17/U19 B, 7200 (4 spillere); U17/U19 C, 6200 (4 spillere); U17/U19 C, 6200 (4 spillere) BD; U17/U19 C, 6400 (4 spillere); U17/U19 C-D, 5500 (4 spillere); U17/U19 C-D, 5500 (4 spillere) BD; U17/U19 D, 5100 (4 spillere); U17/U19 M, 9600 (4 spillere); U9 - 2500 (4 spillere); U9, Begyndere ikke pointgivende, 4 spillere | 16 | &#197;rslev; &#216;lstykke *Trukket; &#216;lstykke 1; &#216;lstykke 2; &#216;lstykke 3; 1 fra Pulje 1; 1 fra Pulje 1106 - JT 3000/3400; 1 fra Pulje 1119 - BL; 1 fra Pulje 1120 - BL; 1 fra Pulje 1532 - BL; 1 fra Pulje 2; 1 fra Pulje 902 - CV; 2 fra Pulje 1106 - JT 3000/3400; 2 fra Pulje 1119 - BL; 2 fra Pulje 1120 - BL; 2 fra Pulje 1532 - BL; 2 fra Pulje 2; 2 fra Pulje 902 - CV; 3 fra Pulje 1106 - JT 3000/3400; 3 fra Pulje 1119 - BL; 3 fra Pulje 1120 - BL; 3 fra Pulje 1532 - BL; 3 fra Pulje 2; 3 fra Pulje 902 - CV; 4 fra Pulje 1106 - JT 3000/3400; 4 fra Pulje 1119 - BL; 4 fra Pulje 1120 - BL; 4 fra Pulje 1532 - BL; 4 fra Pulje 2; 4 fra Pulje 902 - CV; 5 fra Pulje 1106 - JT 3000/3400; 5 fra Pulje 1532 - BL; 6 fra Pulje 1106 - JT 3000/3400; 6 fra Pulje 1532 - BL; 7 fra Pulje 1106 - JT 3000/3400; 7 fra Pulje 1532 - BL; 8 fra Pulje 1106 - JT 3000/3400; 8 fra Pulje 1532 - BL; 9 fra Pulje 1106 - JT 3000/3400; Badminton Roskilde 1; Badminton Roskilde 2; Badminton Roskilde 3; Badminton Roskilde 4; Badminton Roskilde 5; Badminton Roskilde 6; Bagsværd 1; Ballerup BC58 1; BC37 Amager 2; BC37 Amager 3; BC37 Amager 4; BC37/IBB 1; Birkerød BK13; Birkerød BK13 1; Birkerød BK13 2; BK36 Kbh. 1; Borup 1; Bredballe Idrætsforening, Badmintonafd. 2; Bredballe Idrætsforening, Badmintonafd. 3; Brøndby BK 1; Charlottenlund 1; Charlottenlund 2; Dalum Hjallese BK; Dragør 1; Dragør 2; Drive 1; Drive 2; Drive 3; Drive 4; Drive 5; Drive 6; Espergærde 1; Farum 1; Farum 2; Farum 3; Farum 4; FKIF Frederiksberg 1; Fredensborg 1; Frederiksberg 1; Frederiksberg 2; Frederiksberg 3; Frederikssund 1; Frederikssund 2; Frederikssund 3; Frederiksværk *Trukket; Frem - Hellebæk *Overført; Frem - Hellebæk 1; FYNFGH; Føllenslev 1; Ganløse 1; Gentofte 1; Gentofte 2; Gentofte 3; Gentofte 4; Gladsaxe Søborg 1; Gladsaxe Søborg 2; Gladsaxe Søborg 3; Gladsaxe Søborg 4; Gladsaxe Søborg 5; Gladsaxe Søborg 6; Glostrup 1; Glostrup 2; Glostrup 3; Glumsø 1; Greve 1; Greve 2; Grindsted BK 2; Grindsted BK 3; Græsted 1; Græsted/Gilleleje 1; Græsted/Gilleleje 2; Gudenaadalens Efterskole 1; Gudenaadalens Efterskole 12; Gudenaadalens Efterskole 13; Gudenaadalens Efterskole 2; Gudenaadalens Efterskole 3; Gudenaadalens Efterskole 4; Gudenaadalens Efterskole 5; Gudenaadalens Efterskole 6; Gudenaadalens Efterskole 7; Gudenaadalens Efterskole 8; Gørlev 1; Helsinge 1; Helsinge 2; Helsingør 1; Herfølge 1; Herlev/Hjorten *Overført; Herlev/Hjorten 1; Herlev/Hjorten 2; Herlev/Hjorten 3; Herlev/Hjorten 4; Hillerød *Trukket; Hillerød 1; Hillerød 2; Hillerød 3; HMI, Hou 1; HMI, Hou 2; HMI, Hou 3; Holbæk; Holbæk 1; Holbæk 2; Holbæk 3; Holbæk 4; Holte 1; Holte 2; Holte 3; Hornbæk 1; Humlebæk 1; Humlebæk 2; Humlebæk 3; Hvidovre 1; Hvidovre 2; Hvidovre 3; Hvidovre HB2000 1; Hørsholm 1; Hørsholm 2; Hørsholm 3; Hørsholm 4; Islands Brygge 1; Islands Brygge 2; Islands Brygge 3; Islands Brygge 4; Islands Brygge 5; Jernløse 1; Jernløse 2; Jernløse/Mørkøv 1; Karlslunde 1; Karlslunde 2; KBK Kbh. 2; KBK Kbh. 3; KBK Kbh. 4; Kirke Hyllinge 1; KMB2010 1; KMB2010 2; KMB2010 3; KMB2010 4; KMB2010 5; Kullerup/Refsvindinge; Køge 1; Køge 2; Langeskov; Langeskov 1; Langeskov 2; Ledøje-Smørum 1; Ledøje-Smørum 2; Lejre 1; Lillerød 1; Lillerød 2; Lillerød 3; Lillerød 4; Lundtofte 1; Lundtofte 2; Lyngby 1; Lyngby 2; Lyngby 3; Lyngby 4; Lyngby 5; Lyngby 6; Lynge-Broby 1; Melby 1; Mørkøv 1; Måløv 1; Måløv/Smørum; Nakskov 1; Nakskov 2; NBK Amager 1; NBK Amager 2; Nivå-Kokkedal 1; Nivå-Kokkedal 2; Nivå-Kokkedal 3; Nr. &#197;by; Nykøbing F 1; Nykøbing F 2; Nykøbing Sj. 1; Næstved-Herlufsholm 1; Næstved-Herlufsholm 2; Næstved-Herlufsholm/Sorø 1; Odense OBK; Ringe; Ringsted 1; Ringsted 2; Rudehøj Efterskole 1; Rudehøj Efterskole 2; Rudersdal 1; Rudersdal 2; Rødovre 1; Rønde Efterskole; Rønde Efterskole 1; Rønde Efterskole 14; Rønde Efterskole 15; Rønde Efterskole 16; Rønde Efterskole 17; Rønde Efterskole 18; Rønde Efterskole 2; Rønde Efterskole 3; Rønde Efterskole 4; Rønde Efterskole 5; Rønde Efterskole 6; Rønde Efterskole 7; Rønde Efterskole 8; Sakskøbing 1; Skibby 1; Skovlunde 1; Skovlunde 2; Skovlunde 3; Skovshoved 1; Skovshoved 2; Skovshoved 3; Skrødstrup Efterskole 1; Skrødstrup Efterskole 11; Skrødstrup Efterskole 3; Skrødstrup Efterskole 4; Skrødstrup Efterskole 5; Skrødstrup Efterskole 6; Skælskør/Næstved-Herlufsholm 1; Slagelse 1; Slagelse 2; Slagelse/Sorø/Skælskør 1; Slangerup 1; Slangerup/Skibby 1; Solrød Strand 1; Solrød Strand 2; Solrød Strand 3; Solrød Strand 4; Solrød Strand 5; Sorø 1; Stenløse 1; Strib; Strib 1; Stubbekøbing 1; Stubbekøbing 2; Sædder I. F 1; Team Greve-Vallensbæk 1; Team Slagelse/Skælskør 1; Team Syd U17/19; Team Syd U17/19 1; Team Vejleå 1; Team Vejleå 2; Thorsager Rønde; Thorsager Rønde 1; Thorsager Rønde 2; Thurø Badmintonklub; Tirstrup Idrætsefterskole 1; Tirstrup Idrætsefterskole 13; Tirstrup Idrætsefterskole 14; Tirstrup Idrætsefterskole 15; Tirstrup Idrætsefterskole 16; Tirstrup Idrætsefterskole 17; Tirstrup Idrætsefterskole 18; Tirstrup Idrætsefterskole 19; Tirstrup Idrætsefterskole 2; Tirstrup Idrætsefterskole 20; Tirstrup Idrætsefterskole 3; Tirstrup Idrætsefterskole 4; Toreby Sundby GF 1; Tune 1; Tune 2; Taastrup BC 1; Ubberud; Valby BC 1; Valby BC 2; Valby BC 3; Valby BC 4; Valby BC 5; Vallensbæk 1; Vallensbæk 2; Vanløse 1; Vanløse 2; Varde 3; VBC/FKIF 1; Viby J; Viby J 1; Viby J 2; Vindinge 1; Vindinge 2; Vindinge Fyn; Virum 1; Virum 2; Virum 3; Vissenbjerg; Vivild Idrætsefterskole 1; Vivild Idrætsefterskole 13; Vivild Idrætsefterskole 14; Vivild Idrætsefterskole 15; Vivild Idrætsefterskole 16; Vivild Idrætsefterskole 2; Vivild Idrætsefterskole 3; Vivild Idrætsefterskole 4; Vivild Idrætsefterskole 5; Vivild Idrætsefterskole 6; Vivild Idrætsefterskole 7; Vivild Idrætsefterskole 8; Vivild Idrætsefterskole 9; Vordingborg 1; Værløse; Værløse 1; Værløse 2; Værløse 3; Værløse 3 *Overført; Værløse 4; Værløse 5 |
| Uplaceret: 4+2 (ingen brugbar kategorisignatur) | 16 | 48 | &#216;M EFTSK. U17 B 4+2; &#216;M EFTSK. U17 C 4+2; &#216;M efterskoler 4+2 A; &#216;M efterskoler 4+2 B; &#216;M efterskoler 4+2 C; &#216;M efterskoler 4+2 C slutspil; DM efterskoler - 4+2 B; Finaler - 4 m/k A, B, C og D; LM EFTSK. SLUTSPIL 4+2 E/M; SLUTSPIL DM EFTSK. 4+2 B; U11 (4+2) - maks. 8500 p. holdfællesskab; U17-19 A 4-8+2-4 spillere; U17/U19 M, 14000 (4+2) | 0 | BC37 Amager 1; Gentofte 1; Grønsund; Gudenaadalens Efterskole; Gudenaadalens Efterskole 1; Gørlev 1; Hellebjerg Idrætsefterskole 2; Hjemly Idrætsefterskole; Hjemly Idrætsefterskole 1; Humlebæk 1; KBK Kbh. 1; KMB2010 1; Køge; Lillerød/Hørsholm 1; Mariager Efterskole 1; Nivå-Kokkedal; Rønde Efterskole; Rønde Efterskole 1; Rønde Efterskole 2; Rønde Efterskole 3; Rønde Efterskole 4; Rønde Efterskole 5; Skovshoved 1; Slagelse; Solrød Strand 1; Solrød Strand 2; Solrød Strand 3; Sportsefterskolen SINE 2; Sportsefterskolen SINE 3; Tirstrup Idrætsefterskole 1; Taastrup Elite; Vivild Idrætsefterskole; Vivild Idrætsefterskole 1; Vivild Idrætsefterskole 2; Vivild Idrætsefterskole 3; Vivild Idrætsefterskole 4; Aarhus Efterskole |
| Uplaceret: 4+3 (ingen brugbar kategorisignatur) | 3 | 10 | U13 (4+3) - maks. 11500 p. holdfællesskab; U15 (4+3) - maks. 14000 p. holdfællesskab; U17 4+3 | 0 | Gentofte 1; GSB/LBK 1; Hvidovre 1; LBK/SBK/SLBK 1; Solrød Strand 1; Ukendt modstander 1; Ukendt modstander 2; Værløse 1 |
| Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | 137 | 649 | "4 på Stribe"; &#216;M 4 CD piger; &#216;M 4 D (4 SP.); &#216;M 4 D piger; &#216;M 4 D-1; &#216;M 4 D-2; &#216;M 4 D-3; &#216;M 5 Piger D-række (4si., 3do.); &#216;M 5 Spillere Begynder; &#216;M 5 Spillere D-række (4si., 3do.); &#216;M EFTERSK. 4 B; &#216;M EFTERSKOLER 4 sp. beg. (4 doubler); &#216;M EFTERSKOLER 4 sp. beg. 1 (single/double); &#216;M EFTERSKOLER 4 sp. beg. 2 (single/double); &#216;M EFTERSKOLER 4D (single/double); &#216;M EFTERSKOLER Piger 4D (single/double); &#216;M EFTSK. 4 C; &#216;M EFTSK. 4 C piger; &#216;M EFTSK. 4 Cx / X; &#216;M EFTSK. U17 B 4 SP.; &#216;M EFTSK. U17 C 4 SP.; &#216;M EFTSK. U17 C 4 SP. SLUTSPIL; &#216;M EFTSK. U17 X 4 SP.; &#216;M EFTSK. U17 X 4 SP. SLUTSPIL; &#216;M efterskoler 4 sp. C; &#216;M efterskoler 4 sp. X; &#216;M efterskoler 4 sp. X slutspil; Begynderholdturnering I Vamdrup U11; Begynderholdturnering U11; Begynderholdturnering i Vamdrup U13; Finaler - U17 4 dr. og 4 m/k; Jammerbugt U11D; Jammerbugt U15C; Jammerbugt U15D; Jammerbugt U17C; Kredsmatch BADSJ&#198; - BADKBH; LM EFTSK. SLUTSPIL 4 PI. C; Mikset; U09 Begynderturnering; U11; U11 "4 på stribe"; U11 - Mikset; U11 1.Serie; U11 2. Serie; U11 3. Serie; U11 Begynder; U11 Begynderrække; U11 D 4400 (4 spilllere); U11 SA; U11 X (Begynder); U11B; U11B 4m/k Finale; U11C; U11D; U13 "4 på stribe"; U13 1.Serie; U13 2. Serie; U13 3. Serie; U13 BEG. HOLD; U13 Begynderturnering; U13 Drenge; U13 Pulje 1; U13 Pulje 2; U13/U15 - "4 på stribe"; U13B; U13C; U13C Semifinaler; U13D; U13D 3. - 4. plads; U13Dny; U15 - Mikset; U15 1. Serie; U15 2. Serie; U15 3. Serie; U15 Pulje 1; U15 Pulje 2; U15/17 - Drenge; U15/U17 Drenge; U15/U17 MIX; U15C; U15D; U15D Ny; U15P; U17; U17 1. Serie; U17 2. Serie; U17B; U17BNy; U17C; U17D; U9; U9/U11 BEG. HOLD | 6 | &#216;land-Halvrimmen Idrætsklub 1 Arentsminde; &#216;land-Halvrimmen Idrætsklub 2 Arentsmind; &#216;nslev-Eskildstrup; &#216;nslev-Eskildstrup TRUKKET; &#216;ster Hornum; &#216;ster Hornum 1; &#216;ster Hornum Trukket; &#216;ster Hurup; &#216;ster Hurup 1; &#216;stermarie 1; &#216;stfalster; 2 fra Pulje 4; abc Aalborg; Allinge-S.G. Badminton 1; Amager ABC; Asdal 1; Aunslev; Badminton København; Badminton Sjælland; Bagterp; Bagterp 2 Hjørring; BC37 Amager; Biersted 1; Bindslev-Tversted; Bindslev-Tversted 1; Bindslev-Tversted Trukket; Blans Sundeved 1; Blans Sundeved 2; BNB Nibe; BNB Nibe 1 Trukket; BNB Nibe 2; Bornholm.; Brønderslev; Brønderslev 1; Brønderslev 2; Brønderslev 3; Brønderslev 3 Trukket; Bælum-Solbjerg 1; Charlottenlund; Charlottenlund 2; Charlottenlund 3; Christiansfeld 1; Dall-Ferslev; Djurslands Efterskole; Doense-Vebbestrup IF; Doense-Vebbestrup IF 1; Dragør; Drive; Drive 2; Dronninglund 1; Dybbøl; Fjerritslev; Fjerritslev 1; Fjerritslev 2; Fjordager; FKIF Frederiksberg; FKIF Frederiksberg *udgået*; Frederiksberg; Frederiksberg *udgået*; Frederiksberg 2; Frederiksberg 2 *udgået*; Frederikshavn; Frederikshavn 1; Frederikshavn 2; FYNFGH 1; Gandrup 1 Trukket; Gentofte; Gistrup LKB; Gistrup LKB Trukket; Gjøl; Gladsaxe Søborg; Gladsaxe Søborg *udgået*; Gladsaxe Søborg 2; Gladsaxe Søborg 2 *udgået*; Glumsø 1; Greve 2; Grindsted og Uggerhalne IF; Grindsted og Uggerhalne IF 1; Gudenaadalens Efterskole; Gudenaadalens Efterskole 1; Gudenaadalens Efterskole 12; Gudenaadalens Efterskole 13; Gudenaadalens Efterskole 14; Gudenaadalens Efterskole 15; Gudenaadalens Efterskole 2; Gudenaadalens Efterskole 2 (&#216;M); Gudenaadalens Efterskole 3; Gudenaadalens Efterskole 4; Gudenaadalens Efterskole 5; Gudenaadalens Efterskole 6; Gudenaadalens Efterskole 7; Gug; Haderslev 1; Hadsund; Hadsund 1 Trukket; Hals; Hals 1; Hals 2; Harreslev-Kobbermølle/Sporskifte UF; Hasle IF 1; Herskind Boldklub 1; Hjørring; Hjørring 2; HMI, Hou; HMI, Hou 1; HMI, Hou 2; HMI, Hou 3; HMI, Hou 3 (nr. 3); HMI, Hou 4; HMI, Hou 4 (nr. 2); Hobro; Horreby; Horreby TRUKKET; Hvidovre; Hvidovre HB2000; Hvidovre HB2000 *udgået*; Idestrup; Jarl Arden 1; Jerslev-Sterup; Jetsmark; Jetsmark 1; KBK Kbh.; KBK Kbh. 2; KBK Kbh. 3; KFUM Badminton Kbh.; Klarup Badminton; Klarup Badminton 1; Klarup Badminton 2; Klarup Badminton Trukket; KMB2010; Knudsker 1; Knudsker 2; Knudsker 3; Knudsker 4; Kolind 1; Kolind 2; Korup 1; Kraghave; Kraghave 1; Kraghave 2; Kullerup/Refsvindinge 1; Køge; Lindholm; Lindholm 1; Lindholm 2; Lindholm Trukket; Lindved 1; Lyngby; Lyngby *udgået*; Lyngby 2; Løgstør; Låsby 1; Mariager Efterskole 1; Morud 1; Møn; Møn 1; Møn 2; Nakskov; Nexø 1; Nexø 1 (Trukket); Nexø 2; Nr. Lyndelse; Nustrup Ungdomsforening 1; Nustrup Ungdomsforening 2; Nykøbing F; Nykøbing F 1; Nykøbing F 2; Nørhalne; Nørhalne 1; Odense OBK; Odense OBK 1; Poulsker 1; Poulsker 2; Randers BK 11; Randers BK 9; Rosendal; Rosendal 1; Rødby; Rødby 1; Rødby 2; Rødekro 1; Rødekro 2; Rønde Efterskole; Rønde Efterskole 1; Rønde Efterskole 12; Rønde Efterskole 13; Rønde Efterskole 14; Rønde Efterskole 15; Rønde Efterskole 16; Rønde Efterskole 17; Rønde Efterskole 18; Rønde Efterskole 19; Rønde Efterskole 2; Rønde Efterskole 20; Rønde Efterskole 3; Rønde Efterskole 4; Rønde Efterskole 5; Rønde Efterskole 6; Rønde Efterskole 6 (&#216;M); Rønde Efterskole 7; Rønde Efterskole 7 (&#216;M); Rønde Efterskole 8; Rønde Efterskole 8 (&#216;M); Rønne 1; Rønne 2; Sakskøbing; Sakskøbing 1; Sakskøbing 2; Sakskøbing 3; SIF Assentoft; SIF Assentoft 3; Skagen; Skagen 1; Skalborg SK; Skalborg SK 1; Skanderborg Badminton 1; Skanderborg Badminton 13; Skanderborg Badminton 15; Skibby; Skovsgård/Brovst; Skovsgård/Brovst 1; Skovsgård/Brovst 2; Skovshoved; Skovshoved 2; Skrødstrup Efterskole; Skrødstrup Efterskole 1; Skrødstrup Efterskole 11; Skrødstrup Efterskole 12; Skrødstrup Efterskole 13; Skrødstrup Efterskole 14; Skrødstrup Efterskole 2; Skrødstrup Efterskole 3; Skrødstrup Efterskole 4; St. Restrup; St. Restrup 1; St. Restrup 2; St.Restrup; Stidsholt IF; Stidsholt IF 2; Stidsholt IF 6; Stidsholt IF 7; Stige; Stige 2; Stilling 4; Storstrømmen-Kippinge; Storstrømmen-Kippinge 1; Storstrømmen-Kippinge 2; Strandby/Elling Trukket; Strib 1; Stubbekøbing; Stubbekøbing 1; Stubbekøbing 2; Stubbekøbing 3; Stubbekøbing 4; Støvring; Støvring 1; Støvring 2; Sulsted 1; Sulsted 1 Trukket; Sulsted Vestbjerg; Sundby KFUM; Sundby KFUM *udgået*; Svaneke 1; Svaneke 2; Svenstrup; Sæby 3; Tarup-Pårup; Thorup/Klim; Tingsted; Tirstrup Idrætsefterskole; Tirstrup Idrætsefterskole 1; Tirstrup Idrætsefterskole 12; Tirstrup Idrætsefterskole 13; Tirstrup Idrætsefterskole 14; Tirstrup Idrætsefterskole 15; Tirstrup Idrætsefterskole 16; Tirstrup Idrætsefterskole 17; Tirstrup Idrætsefterskole 18; Tirstrup Idrætsefterskole 19; Tirstrup Idrætsefterskole 2; Tirstrup Idrætsefterskole 20; Tirstrup Idrætsefterskole 3; Tirstrup Idrætsefterskole 3 (&#216;M); Tirstrup Idrætsefterskole 3 (vinder); Tirstrup Idrætsefterskole 4; Tirstrup Idrætsefterskole 4 (&#216;M); Tirstrup Idrætsefterskole 5; Tirstrup Idrætsefterskole 6; Toftlund Idrætsfore.; Tylstrup; Tylstrup 1; Tylstrup 2; Tønder; Taastrup Elite; Ulsted Boldklub, Badmintonafd.; Ulsted Boldklub, Badmintonafd. 1; Vamdrup 1; Vanløse; Vanløse 2; Vanløse 2 *udgået*; Vedsted GF Trukket; Vester Hassing; Vester Hornum; Vivild Idrætsefterskole; Vivild Idrætsefterskole 1; Vivild Idrætsefterskole 10; Vivild Idrætsefterskole 10 (&#216;M); Vivild Idrætsefterskole 10 (nr. 4); Vivild Idrætsefterskole 11; Vivild Idrætsefterskole 11 (&#216;M); Vivild Idrætsefterskole 12; Vivild Idrætsefterskole 13; Vivild Idrætsefterskole 14; Vivild Idrætsefterskole 15; Vivild Idrætsefterskole 2; Vivild Idrætsefterskole 3; Vivild Idrætsefterskole 4; Vivild Idrætsefterskole 4 (&#216;M); Vivild Idrætsefterskole 5; Vivild Idrætsefterskole 5 (&#216;M); Vivild Idrætsefterskole 6; Vivild Idrætsefterskole 6 (&#216;M); Vivild Idrætsefterskole 7; Vivild Idrætsefterskole 7 (&#216;M); Vivild Idrætsefterskole 8; Vivild Idrætsefterskole 8 (&#216;M); Vivild Idrætsefterskole 9; Vivild Idrætsefterskole 9 (&#216;M); Vojens 1; Vonsild 1; Vordingborg; Aabybro; Aabybro 1; Aabybro 2; Aakirkeby 1; Aakirkeby 2; Aakirkeby 3; Aalborg Triton; Aarhus AB; Aarhus AB 1; Aarhus Efterskole; Aars; Aars 1; Aarup Badmintonklub 1 |
| Uplaceret: X1 (ingen brugbar kategorisignatur) | 4 | 31 | U11 Serie X1; U13 Serie X1; U15 Serie X1; U17 Serie X1 | 3 | Amager ABC; BK36 Kbh. *trukket*; Charlottenlund 3; Dragør; Dragør *udgået*; FKIF Frederiksberg; FKIF Frederiksberg 2; FKIF Frederiksberg 2 *udgået*; Gladsaxe Søborg 2; Gladsaxe Søborg 3; Gladsaxe Søborg 3 *udgået*; Hvidovre; Hvidovre HB2000; KBK Kbh. 3; KBK Kbh. 4; KFUM Badminton Kbh.; KFUM Badminton Kbh. *udgået*; KMB2010 2; Lyngby 3; NBK Amager; Rødovre; SMASH *trukket*; Valby BC; Vanløse 3 |
| Uplaceret: X2 (ingen brugbar kategorisignatur) | 3 | 25 | U11 Serie X2; U13 Serie X2; U15 Serie X2 | 3 | Amager ABC 2; BK36 Kbh. *trukket*; Dragør 2; Drive 2; Drive 3 *udgået*; Gladsaxe Søborg 3; Gladsaxe Søborg 4 *trukket*; Gladsaxe Søborg 4 *udgået*; Hvidovre HB2000; Hvidovre HB2000 2; KBK Kbh. 4; KFUM Badminton Kbh. 2 *trukket*; KFUM Badminton Kbh. 2 *udgået*; NBK Amager; Skovshoved 3; Sundby KFUM; Sundby KFUM 2; Tono Kbh.; Valby BC; Valby BC 2; Vanløse 3 |
| X1 | 8 | 60 | U11 Serie X1; U13 Serie X1; U15 Serie X1; U17 Serie X1 | 6 | Amager ABC; BC37 Amager; Charlottenlund 2; Charlottenlund 3; Dragør; FKIF Frederiksberg; FKIF Frederiksberg 2; FKIF Frederiksberg 2 udgået; Gladsaxe Søborg; Gladsaxe Søborg 2; Gladsaxe Søborg 2 *Trukket; Gladsaxe Søborg 2 trukket; Hvidovre 2; Hvidovre HB2000 2; KBK Kbh. 4; KFUM Badminton Kbh.; KFUM Badminton Kbh. *Trukket; KMB2010 2; Lyngby; Lyngby 3; NBK Amager; Rødovre; Sct. Jørgen Kbh.; Skovshoved 2; SMASH; SMASH udgået; Sundby KFUM; Tono Kbh.; Valby BC; Valby BC 2; Vanløse |
| X2 | 6 | 47 | U11 Serie X2; U13 Serie X2; U15 Serie X2 | 1 | Amager ABC; Amager ABC 2; Amager ABC 2 Trukket; BC37 Amager; Dragør 2; Drive 2; FKIF Frederiksberg; Gladsaxe Søborg 3; Hvidovre HB2000; Hvidovre HB2000 3; Hvidovre HB2000 3 *Trukket; Islands Brygge; KFUM Badminton Kbh. 2 udgået; Lyngby 3; Lyngby 4; NBK Amager; Rødovre; Skovshoved 3; SMASH; SMASH *Trukket; Sundby KFUM; Sundby KFUM udgået; Tono Kbh.; Valby BC; Valby BC 1; Valby BC 2; Valby BC 2 udgået; Vanløse |

Reglementets §7 bruger “4-8 spillere” om spillerantallet pr. kamp i et format, der kaldes “4 spillere”. Her holdes 4-8 spiller-puljer adskilt fra 4 spillere. Dataafprøvningen: 131 puljer med 4-8-etiket og 3538 med 4-spillere-etiket; fælles eksakte kategorisignaturer: 1. D · 1. S · 2. D · 2. S · 3. S · 4. S. Signaturfordelinger står i JSON. Dette er kun sammenligning af rå klassifikationer, ikke en sammenlægning.

Niveau udtrækkes fra rækkenavnet. Reglementet 2025/26 §9 stk. 3a, s. 4-6 angiver tallet i rækkenavnet som holdets maksimale samlede niveauklassifikationspoint. Hierarkiet er Christoffers rangering, ikke reglementsbestemt, men stemmer med §12, s. 7. Kun 2025/26 er verificeret; ældre sæsoner afventer kort 130. Bogstavrækkefølgen E > M > A > B > C > C-D > D og derefter numerisk værdi bruges **kun inden for samme format**; hvis navnet indeholder flere bogstaver, bruges det højeste (fx M/A → M). I 1986 forskellige ungdomsrækkenavne blev 941 etiketter udtrukket; 76 indeholder sammensatte bogstavetiketter, og 1045 kunne ikke tolkes. Grupperet liste: `statistik/results/129-uoplyste-niveauer.md`.

| Sæson | Aldersgruppe | GSB hold-puljeposter | GSB-status | Bedste GSB-format | Højeste nationalt | Aktive uplacerede | Udgået/trukket |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2011/2012 | U11 (ID 3) | 4 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 2 | 2 |
| 2011/2012 | U13 (ID 4) | 4 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 2 | 2 |
| 2011/2012 | U15 (ID 5) | 3 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 3 | 0 |
| 2011/2012 | U17 (ID 6) | 1 | ingen aktivt GSB-hold (kun udgået/trukket) | — | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2012/2013 | U11 (ID 3) | 1 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 1 | 0 |
| 2012/2013 | U13 (ID 4) | 2 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 1 | 1 |
| 2012/2013 | U15 (ID 5) | 3 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 3 | 0 |
| 2012/2013 | U17 (ID 6) | 1 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 1 | 0 |
| 2013/2014 | U11 (ID 3) | 2 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 2 | 0 |
| 2013/2014 | U13 (ID 4) | 2 | under højeste format | 4+2 (niveau uafklaret; format 2/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2013/2014 | U15 (ID 5) | 3 | under højeste format | 4 spillere (niveau uafklaret; format 4/5; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 2 | 0 |
| 2013/2014 | U17 (ID 6) | 2 | aktivt GSB-hold, format ikke placeret | — | 4+3 (fastlagt af Christoffer) | 2 | 0 |
| 2014/2015 | U11 (ID 3) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2014/2015 | U13 (ID 4) | 2 | under højeste format | 4+2 (niveau uafklaret; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2014/2015 | U15 (ID 5) | 2 | under højeste format | 4+2 (niveau uafklaret; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2014/2015 | U17 (ID 6) | 2 | ingen aktivt GSB-hold (kun udgået/trukket) | — | 4+3 (fastlagt af Christoffer) | 0 | 2 |
| 2015/2016 | U11 (ID 3) | 2 | under højeste format | 4 spillere (D; format 2/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2015/2016 | U13 (ID 4) | 2 | under højeste format | 4 spillere (B; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2015/2016 | U15 (ID 5) | 1 | under højeste format | 4+2 (M; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2015/2016 | U17 (ID 6) | 1 | ingen aktivt GSB-hold (kun udgået/trukket) | — | 4+3 (fastlagt af Christoffer) | 0 | 1 |
| 2016/2017 | U11 (ID 3) | 2 | under højeste format | 4 spillere (D; format 2/2; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2016/2017 | U13 (ID 4) | 1 | under højeste format | 4 spillere (C; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2016/2017 | U15 (ID 5) | 2 | under højeste format | 4+2 (A; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2016/2017 | U17 (ID 6) | 1 | under højeste format | 4 spillere (B; format 3/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2016/2017 | U17/U19 (ID 18) | 0 | ingen aktivt GSB-hold (kun udgået/trukket) | — | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2017/2018 | U11 (ID 3) | 1 | under højeste format | 4 spillere (D; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2017/2018 | U13 (ID 4) | 2 | under højeste format | 4 spillere (B; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2017/2018 | U15 (ID 5) | 2 | under højeste format | 4 spillere (M; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2017/2018 | U17/U19 (ID 18) | 2 | i højeste format | 4+2 (M/A; format 1/3; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 1 |
| 2018/2019 | U11 (ID 3) | 2 | under højeste format | 4 spillere (C; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2018/2019 | U13 (ID 4) | 1 | under højeste format | 4 spillere (niveau uafklaret; format 2/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2018/2019 | U15 (ID 5) | 1 | under højeste format | 4 spillere (D; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2018/2019 | U17/U19 (ID 18) | 2 | under højeste format | 4 spillere (M; format 2/3; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2019/2020 | U11 (ID 3) | 1 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2019/2020 | U13 (ID 4) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 2/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2019/2020 | U15 (ID 5) | 1 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2020/2021 | U09 (ID 2) | 2 | kun ét format findes | 4 spillere (niveau uafklaret; format 1/1; fastlagt af Christoffer) | 4 spillere (fastlagt af Christoffer) | 0 | 0 |
| 2020/2021 | U11 (ID 3) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2020/2021 | U13 (ID 4) | 2 | under højeste format | 4 spillere (niveau uafklaret; format 2/3; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2020/2021 | U15 (ID 5) | 3 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2021/2022 | U09 (ID 2) | 1 | kun ét format findes | 4 spillere (niveau uafklaret; format 1/1; fastlagt af Christoffer) | 4 spillere (fastlagt af Christoffer) | 0 | 0 |
| 2021/2022 | U11 (ID 3) | 3 | under højeste format | 4 spillere (niveau uafklaret; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
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
| 2024/2025 | U17/U19 (ID 18) | 1 | under højeste format | 4 spillere (D; format 3/4; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2025/2026 | U09 (ID 2) | 8 | aktivt GSB-hold, format ikke placeret | — | ingen placerbart format | 8 | 0 |
| 2025/2026 | U11 (ID 3) | 5 | under højeste format | 4 spillere (C-D; format 3/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2025/2026 | U13 (ID 4) | 12 | under højeste format | 2+2 (A; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2025/2026 | U15 (ID 5) | 9 | under højeste format | 2+2 (A; format 2/4; fastlagt af Christoffer) | 4+3 (fastlagt af Christoffer) | 0 | 0 |
| 2025/2026 | U17/U19 (ID 18) | 3 | under højeste format | 4 spillere (D; format 3/4; fastlagt af Christoffer) | 4+2 (fastlagt af Christoffer) | 0 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U09 (ID 2) | 4 | aktivt GSB-hold, format ikke placeret (kun de endnu spillede/kategoriserede puljer) | kun de endnu spillede/kategoriserede puljer | ingen placerbart format | 4 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U11 (ID 3) | 5 | aktivt GSB-hold, format ikke placeret (kun de endnu spillede/kategoriserede puljer) | kun de endnu spillede/kategoriserede puljer | ingen placerbart format | 5 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U13 (ID 4) | 10 | aktivt GSB-hold, format ikke placeret (kun de endnu spillede/kategoriserede puljer) | kun de endnu spillede/kategoriserede puljer | ingen placerbart format | 6 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U15 (ID 5) | 9 | aktivt GSB-hold, format ikke placeret (kun de endnu spillede/kategoriserede puljer) | kun de endnu spillede/kategoriserede puljer | ingen placerbart format | 7 | 0 |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (ID 18) | 7 | aktivt GSB-hold, format ikke placeret (kun de endnu spillede/kategoriserede puljer) | kun de endnu spillede/kategoriserede puljer | 4+2 (fastlagt af Christoffer) | 4 | 0 |

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
| 2012/2013 | U11 (3) | Gladsaxe Søborg | 2012\|3\|1311 | U11 3. Serie | U11 3. Serie | Ikke-kanonisk signatur: S6/D3 | Uplaceret |  |
| 2012/2013 | U13 (4) | Gladsaxe Søborg | 2012\|4\|1318 | U13 3. Serie | U13 3. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | Uplaceret |  |
| 2012/2013 | U13 (4) | Gladsaxe Søborg 2 trukket | 2012\|4\|1322 | U13 Serie X1 | U13 Serie X1 | X1 | Uplaceret | trukket |
| 2012/2013 | U15 (5) | Gladsaxe Søborg 3 | 2012\|5\|1321 | U15 Serie X2 | U15 Serie X2 | X2 | Uplaceret |  |
| 2012/2013 | U15 (5) | Gladsaxe Søborg | 2012\|5\|1326 | U15 3. Serie | U15 3. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | Uplaceret |  |
| 2012/2013 | U15 (5) | Gladsaxe Søborg 2 | 2012\|5\|1327 | U15 Serie X1 | U15 Serie X1 | X1 | Uplaceret |  |
| 2012/2013 | U17 (6) | Gladsaxe Søborg | 2012\|6\|1329 | U17 2. Serie | U17 2. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | Uplaceret |  |
| 2013/2014 | U11 (3) | Gladsaxe Søborg | 2013\|3\|2644 | U11 3. Serie | Pulje 1 | Ikke-kanonisk signatur: MD1/S4/D3 | Uplaceret |  |
| 2013/2014 | U11 (3) | Gladsaxe Søborg 2 | 2013\|3\|2645 | U11 Serie X1 | Pulje 1 | X1 | Uplaceret |  |
| 2013/2014 | U13 (4) | Gladsaxe Søborg | 2013\|4\|2681 | U13 3. serie | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U13 (4) | Gladsaxe Søborg 2 *Trukket | 2013\|4\|2682 | U13 Serie X1 | Pulje 1 | X1 | Uplaceret | trukket |
| 2013/2014 | U15 (5) | Gladsaxe Søborg | 2013\|5\|2686 | U15 2. serie | Pulje 1 | Ikke-kanonisk signatur: MD1/S4/D3 | Uplaceret |  |
| 2013/2014 | U15 (5) | Gladsaxe Søborg 2 | 2013\|5\|2688 | U15 Serie X1 | Pulje 1 | X1 | Uplaceret |  |
| 2013/2014 | U15 (5) | Gladsaxe Søborg 3 | 2013\|5\|2690 | U15 Serie X3 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2013/2014 | U17 (6) | Gladsaxe Søborg | 2013\|6\|2692 | U17 2. serie | Pulje 1 | Ikke-kanonisk signatur: MD1/S4/D3 | Uplaceret |  |
| 2013/2014 | U17 (6) | Gladsaxe Søborg | 2013\|6\|2693 | U17 Serie X1 | Pulje 1 | X1 | Uplaceret |  |
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
| 2015/2016 | U13 (4) | Gladsaxe Søborg | 2015\|4\|6089 | U13 B Række 4 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 12 inden for format |  |
| 2015/2016 | U13 (4) | Gladsaxe Søborg 2 | 2015\|4\|6091 | U13 D Række 4 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D; plads 30 inden for format |  |
| 2015/2016 | U15 (5) | Gladsaxe Søborg | 2015\|5\|6093 | U15 M Række 4+2 | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau M; plads 1 inden for format |  |
| 2015/2016 | U17 (6) | Gladsaxe Søborg udgået | 2015\|6\|6099 | U17 A Række 4+2 | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau A; plads 2 inden for format | udgået |
| 2016/2017 | U11 (3) | Gladsaxe Søborg | 2016\|3\|7668 | U11 D (4) P1 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D; plads 8 inden for format |  |
| 2016/2017 | U11 (3) | Gladsaxe Søborg | 2016\|3\|9137 | Slutspil U11 D (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D; plads 7 inden for format |  |
| 2016/2017 | U13 (4) | Gladsaxe Søborg | 2016\|4\|7692 | U13 C (4) P2 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C; plads 11 inden for format |  |
| 2016/2017 | U15 (5) | Gladsaxe Søborg | 2016\|5\|7677 | U15 A (4+2) | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau A; plads 1 inden for format |  |
| 2016/2017 | U15 (5) | Gladsaxe Søborg 2 | 2016\|5\|7679 | U15 B (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 5 inden for format |  |
| 2016/2017 | U17 (6) | Gladsaxe Søborg | 2016\|6\|7685 | U17/U19 B (4) P2 | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 4 inden for format |  |
| 2017/2018 | U11 (3) | Gladsaxe Søborg | 2017\|3\|9302 | U11 D (4) P2 | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D; plads 7 inden for format |  |
| 2017/2018 | U13 (4) | Gladsaxe Søborg | 2017\|4\|9291 | U13 B (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 4 inden for format |  |
| 2017/2018 | U13 (4) | Gladsaxe Søborg 2 | 2017\|4\|9296 | U13 C (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C; plads 7 inden for format |  |
| 2017/2018 | U15 (5) | Gladsaxe Søborg 2 | 2017\|5\|9290 | U15 B (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 5 inden for format |  |
| 2017/2018 | U15 (5) | Gladsaxe Søborg 1 | 2017\|5\|9595 | U15 M 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau M; plads 1 inden for format |  |
| 2017/2018 | U17/U19 (18) | Gladsaxe Søborg 2 udgået | 2017\|18\|9288 | U17/19 B (4) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B; plads 4 inden for format | udgået |
| 2017/2018 | U17/U19 (18) | Gladsaxe Søborg 1 | 2017\|18\|9592 | U17/U19 M/A 4+2 | Pulje 1 | 4+2 | fastlagt af Christoffer; niveau M/A; plads 1 inden for format |  |
| 2018/2019 | U11 (3) | Gladsaxe Søborg 1 | 2018\|3\|11279 | U11 C 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C; plads 2 inden for format |  |
| 2018/2019 | U11 (3) | Gladsaxe Søborg 2 | 2018\|3\|11401 | U11 D 4 Spillere P2 | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D; plads 8 inden for format |  |
| 2018/2019 | U13 (4) | Gladsaxe Søborg 1 | 2018\|4\|11418 | U13 CD 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2018/2019 | U15 (5) | Gladsaxe Søborg 1 | 2018\|5\|11427 | U15 D 4 Spillere P2 | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D; plads 18 inden for format |  |
| 2018/2019 | U17/U19 (18) | Gladsaxe Søborg 1 | 2018\|18\|11355 | U17/19 M 4 Spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau M; plads 1 inden for format |  |
| 2018/2019 | U17/U19 (18) | Gladsaxe Søborg 2 | 2018\|18\|11771 | U17/U19 A 4 spillere | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau A; plads 6 inden for format |  |
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
| 2024/2025 | U13 (4) | Gladsaxe Søborg 8 | 2024\|4\|17091 | U13 D, 3200 (4 piger) | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau D / 3200; plads 5 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 3 | 2024\|4\|17094 | U13 C, 4200 (4 spillere) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C / 4200; plads 8 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 2 | 2024\|4\|17117 | U13 B, 5000 (4 spillere) | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau B / 5000; plads 5 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 6 | 2024\|4\|17145 | U13 D 3600 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 3600; plads 12 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 4 | 2024\|4\|17146 | U13 D 3600 (4 spillere). | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 3600; plads 12 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 7 | 2024\|4\|17146 | U13 D 3600 (4 spillere). | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 3600; plads 12 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 5 | 2024\|4\|17147 | U13 D 3600 (4 spillere). | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau D / 3600; plads 12 inden for format |  |
| 2024/2025 | U13 (4) | Gladsaxe Søborg 9 | 2024\|4\|17015 | UGE 38 - U13 D, 3600 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 3600; plads — inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 1 | 2024\|5\|17006 | U15 B, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5400; plads — inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 2 | 2024\|5\|17141 | U15 C 4800 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C / 4800; plads 12 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 3 | 2024\|5\|17143 | U15 D 4000 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4000; plads 17 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 4 | 2024\|5\|17143 | U15 D 4000 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4000; plads 17 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 5 | 2024\|5\|17143 | U15 D 4000 (4 spillere). | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4000; plads 17 inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 7 | 2024\|5\|16998 | UGE 38 - U15 D, 4000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 4000; plads — inden for format |  |
| 2024/2025 | U15 (5) | Gladsaxe Søborg 6 | 2024\|5\|17013 | UGE 38 - U15 C, 4600 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau C / 4600; plads — inden for format |  |
| 2024/2025 | U17/U19 (18) | Gladsaxe Søborg 1 | 2024\|18\|17100 | U17/U19 D, 4600 (4 spillere) | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4600; plads 14 inden for format |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 2 | 2025\|2\|18127 | U09 D 3300 (3 spillere) BD | Pulje 1 | 3 spillere | Uplaceret |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 3 | 2025\|2\|18128 | U09 D 3300 (3 spillere) BD | Pulje 2 | 3 spillere | Uplaceret |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 1 | 2025\|2\|18129 | U09 C 3600 (3 spillere) BD | Pulje 1 | 3 spillere | Uplaceret |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 1 | 2025\|2\|18504 | U09 C 3600 (3 spillere) BD (2. halvår) | Pulje 2 | 3 spillere | Uplaceret |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 3 | 2025\|2\|18506 | U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 1 | 3 spillere | Uplaceret |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 2 | 2025\|2\|18507 | U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 2 | 3 spillere | Uplaceret |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 4 | 2025\|2\|18508 | U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 3 | 3 spillere | Uplaceret |  |
| 2025/2026 | U09 (2) | Gladsaxe Søborg 5 | 2025\|2\|18509 | U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 4 | 3 spillere | Uplaceret |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 5 | 2025\|3\|18133 | U11 4200 (4 piger) BD | Pulje 2 | 4 piger | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 1 | 2025\|3\|18134 | U11 C-D 4800 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C-D / 4800; plads — inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 2 | 2025\|3\|18134 | U11 C-D 4800 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C-D / 4800; plads — inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 3 | 2025\|3\|18135 | U11 D 4600 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4600; plads 7 inden for format |  |
| 2025/2026 | U11 (3) | Gladsaxe Søborg 4 | 2025\|3\|18138 | U11 D 4600 (4 spillere) BD | Pulje 4 | 4 spillere | fastlagt af Christoffer; niveau D / 4600; plads 7 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 1 | 2025\|4\|17987 | U13 A, 6000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6000; plads 1 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 2 | 2025\|4\|17993 | U13 B, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5400; plads 3 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 3 | 2025\|4\|18139 | U13 C 5300 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C / 5300; plads 6 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 8 | 2025\|4\|18141 | U13 D 4400 (4 piger) BD | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau D / 4400; plads 4 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 4 | 2025\|4\|18142 | U13 D 4800 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4800; plads 11 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 7 | 2025\|4\|18142 | U13 D 4800 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 4800; plads 11 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 5 | 2025\|4\|18143 | U13 D 4800 (4 spillere) BD | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 4800; plads 11 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 6 | 2025\|4\|18144 | U13 D 4800 (4 spillere) BD | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau D / 4800; plads 11 inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 7 | 2025\|4\|17982 | Uge 38 - U13 A, 6000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6000; plads — inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 8 | 2025\|4\|17985 | Uge 38 - U13 B, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5400; plads — inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 9 | 2025\|4\|17988 | Uge 38 - U13 C, 5000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau C / 5000; plads — inden for format |  |
| 2025/2026 | U13 (4) | Gladsaxe Søborg 10 | 2025\|4\|17989 | Uge 38 - U13 D, 4800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 4800; plads — inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 3 | 2025\|5\|17978 | U15 C, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau C / 5400; plads 5 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 1 | 2025\|5\|18002 | U15 A, 6800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6800; plads 2 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 7 | 2025\|5\|18119 | U15 D, 4600 (4 piger) | Pulje 1 | 4 piger | fastlagt af Christoffer; niveau D / 4600; plads 3 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 2 | 2025\|5\|18145 | U15 B 6400 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau B / 6400; plads 4 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 4 | 2025\|5\|18148 | U15 C-D 5200 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau C-D / 5200; plads — inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 5 | 2025\|5\|18149 | U15 D 5000 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau D / 5000; plads 13 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 6 | 2025\|5\|18150 | U15 D 5000 (4 spillere) BD | Pulje 2 | 4 spillere | fastlagt af Christoffer; niveau D / 5000; plads 13 inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 6 | 2025\|5\|17991 | Uge 38 - U15 A, 6800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6800; plads — inden for format |  |
| 2025/2026 | U15 (5) | Gladsaxe Søborg 8 | 2025\|5\|17996 | Uge 38 - U15 C, 5400 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau C / 5400; plads — inden for format |  |
| 2025/2026 | U17/U19 (18) | Gladsaxe Søborg 2 | 2025\|18\|18122 | U17/U19 D, 5200 (4 spillere) | Pulje 3 | 4 spillere | fastlagt af Christoffer; niveau D / 5200; plads 13 inden for format |  |
| 2025/2026 | U17/U19 (18) | Gladsaxe Søborg 1 | 2025\|18\|18154 | C-D 5600 (4 spillere) BD | Pulje 1 | 4 spillere | fastlagt af Christoffer; niveau ikke tolket; plads — inden for format |  |
| 2025/2026 | U17/U19 (18) | Gladsaxe Søborg 3 | 2025\|18\|17999 | Uge 38 - U17/U19 D, 5000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 5000; plads — inden for format |  |
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
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 2 | 2026\|4\|19140 | U13 B, 5600 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 3 | 2026\|4\|19142 | U13 C-D, 4800 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 4 | 2026\|4\|19144 | U13 Dx, 4400 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 5 | 2026\|4\|19144 | U13 Dx, 4400 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 6 | 2026\|4\|19146 | U13 D, 4400 (4 piger) BD | Pulje 1 | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 5 | 2026\|4\|18977 | UGE 38 - U13 D, 4600 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 4600; plads — inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 4 | 2026\|4\|19007 | UGE 38 - U13 B, 5200 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5200; plads — inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 3 | 2026\|4\|19008 | UGE 38 - U13 B, 5200 (2+2) | Pulje 2 | 2+2 | fastlagt af Christoffer; niveau B / 5200; plads — inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | Gladsaxe Søborg 3 | 2026\|4\|19009 | UGE 38 - U13 B, 5200 (2+2) | Finale | 2+2 | fastlagt af Christoffer; niveau B / 5200; plads — inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 6 | 2026\|5\|19088 | U15 Dx, 4600 (4 spillere) | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 7 | 2026\|5\|19100 | U15 C, 4900 (4 piger) | Pulje 1 | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 1 | 2026\|5\|19106 | U15 A, 7200 (4 spillere) | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 2 | 2026\|5\|19117 | U15 B, 6200 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 3 | 2026\|5\|19117 | U15 B, 6200 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 4 | 2026\|5\|19118 | U15 C-D, 5100 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 5 | 2026\|5\|19119 | U15 D, 4800 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 1 | 2026\|5\|18984 | UGE 38 - U15 A, 6800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau A / 6800; plads — inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Gladsaxe Søborg 2 | 2026\|5\|18987 | UGE 38 - U15 B, 5800 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau B / 5800; plads — inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 1 | 2026\|18\|18991 | U17/U19 B, 6800 (2+2) | Pulje 2 | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 2 | 2026\|18\|19122 | U17/U19 C-D, 5500 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 3 | 2026\|18\|19122 | U17/U19 C-D, 5500 (4 spillere) BD | Pulje 1 | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 4 | 2026\|18\|19123 | U17/U19 D, 4800 (4 piger) BD | Pulje 1 | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 2 | 2026\|18\|18994 | UGE 38 - U17/U19 B, 6800 (2+2) | Pulje 2 | 2+2 | fastlagt af Christoffer; niveau B / 6800; plads — inden for format |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg | 2026\|18\|18995 | UGE 38 - U17/U19 B, 6800 (2+2) | Finale | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | Uplaceret |  |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | Gladsaxe Søborg 3 | 2026\|18\|18996 | UGE 38 - U17/U19 D, 5000 (2+2) | Pulje 1 | 2+2 | fastlagt af Christoffer; niveau D / 5000; plads — inden for format |  |

### DMU separat

DMU-poster tæller ikke i lokal formatplacering eller region 8-bredde. Unikke GSB-hold deduplikeres inden for sæson/aldersgruppe på råt holdnavn; et hold der også optræder lokalt tælles én gang som hold, men hver DMU-puljepost står stadig på denne separate liste. I alt: **62 DMU-poster**, **34 unikke sæson/aldersgruppe/hold-identiteter**.

| Sæson | Alder | GSB-hold | Format | Niveau | DMU-poster | DMU-puljenøgler | Også lokal række |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2016/2017 | U11 (3) | Gladsaxe Søborg 1 | 4 spillere | D | 2 | 2016\|3\|8987; 2016\|3\|8997 | nej |
| 2016/2017 | U15 (5) | Gladsaxe Søborg 1 | 4+2 | A | 1 | 2016\|5\|8905 | nej |
| 2016/2017 | U17/U19 (18) | Gladsaxe Søborg 1 | 4 spillere | B | 2 | 2016\|18\|8918; 2016\|18\|9019 | nej |
| 2017/2018 | U15 (5) | Gladsaxe Søborg 1 | 4 spillere | M | 2 | 2017\|5\|10543; 2017\|5\|10548 | ja (samme rånavn lokal række) |
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

Samarbejder med slash bevares som én normaliseret enhed. Udgåede/trukne hold er udeladt fra klublisten og vises separat i JSON pr. sæson/aldersgruppe.

### Klubnavnenormalisering — ændrede rå navne

HTML-entiteter er dekodet før normalisering; parentestekst, stjernemarkerede noter, statusmarkører (fx UDGÅET/trukket) og trailing holdnummer fjernes. Normaliseringen ændrede 1142 af 1980 holdnavneforekomster i højeste-format-klublisterne, fordelt på 266 forskellige rå navne (868 rå-navn/sæson-alder-forekomster). Tabellen viser alle ændrede rå-varianter:

| Råt holdnavn | Normaliseret klubnavn | Sæson/aldersgruppe-forekomster |
| --- | --- | --- |
| &#216;lstykke | Ølstykke | 2 |
| &#216;lstykke 1 | Ølstykke | 2 |
| abc Aalborg 1 | abc Aalborg | 8 |
| abc Aalborg 2 | abc Aalborg | 1 |
| abc Aalborg UDG&#197;ET | abc Aalborg | 1 |
| Alminde Viuf 1 | Alminde Viuf | 1 |
| Andst 1 | Andst | 1 |
| Badminton Esbjerg 1 | Badminton Esbjerg | 7 |
| Badminton Esbjerg 2 | Badminton Esbjerg | 4 |
| Badminton Esbjerg 3 | Badminton Esbjerg | 3 |
| Badminton Esbjerg 4 | Badminton Esbjerg | 2 |
| Badminton Esbjerg 5 | Badminton Esbjerg | 1 |
| Badminton i indre By 1 | Badminton i indre By | 1 |
| Badminton Roskilde 1 | Badminton Roskilde | 5 |
| BC37 Amager 1 | BC37 Amager | 8 |
| Bindslev-Tversted 1 | Bindslev-Tversted | 1 |
| Bjergby-Mygdal 1 | Bjergby-Mygdal | 4 |
| Blans Sundeved 1 | Blans Sundeved | 1 |
| Blenstrup 1 | Blenstrup | 1 |
| Blåkilde Efterskole 1 | Blåkilde Efterskole | 3 |
| Blåkilde Efterskole 2 | Blåkilde Efterskole | 1 |
| Brabrand 1 | Brabrand | 2 |
| Brøndby BK 1 | Brøndby BK | 1 |
| Brønderslev 1 | Brønderslev | 6 |
| Brønderslev 2 | Brønderslev | 1 |
| Brørup 1 | Brørup | 1 |
| Brøruphus Efterskole 1 | Brøruphus Efterskole | 3 |
| Brøruphus Efterskole 1 (A) | Brøruphus Efterskole | 1 |
| Brøruphus Efterskole 2 (xtra) | Brøruphus Efterskole | 1 |
| Brøruphus Efterskole 3 | Brøruphus Efterskole | 1 |
| Charlottenlund 1 | Charlottenlund | 3 |
| Dall-Ferslev 1 | Dall-Ferslev | 1 |
| Dall-Ferslev 2 | Dall-Ferslev | 1 |
| Dalum-OBK 1 | Dalum-OBK | 1 |
| Dragør 1 | Dragør | 2 |
| Drive 1 | Drive | 5 |
| Drive 2 | Drive | 2 |
| Dybbøl 1 | Dybbøl | 2 |
| Dybbøl 2 | Dybbøl | 1 |
| Efterskolen Play 1 | Efterskolen Play | 1 |
| Efterskolen Solgården 1 | Efterskolen Solgården | 1 |
| Fanø 1 | Fanø | 1 |
| Farsø 1 | Farsø | 2 |
| Farsø 2 | Farsø | 1 |
| Fjer Fyn 1 | Fjer Fyn | 1 |
| FKIF Frederiksberg 1 | FKIF Frederiksberg | 3 |
| Frederiksberg 1 | Frederiksberg | 3 |
| Frederikssund 1 | Frederikssund | 1 |
| FSK Furesø 1 | FSK Furesø | 1 |
| Furesø 1 | Furesø | 1 |
| Galten FS 1 | Galten FS | 1 |
| Gentofte 1 | Gentofte | 13 |
| Gentofte 2 | Gentofte | 1 |
| Gilleleje 1 | Gilleleje | 1 |
| Gistrup LKB 1 | Gistrup LKB | 2 |
| Gladsaxe Søborg 1 | Gladsaxe Søborg | 6 |
| Gladsaxe Søborg 2 | Gladsaxe Søborg | 3 |
| Glamsdalen 1 | Glamsdalen | 7 |
| Glamsdalen 1 (A) | Glamsdalen | 1 |
| Glamsdalen 2 | Glamsdalen | 5 |
| Glamsdalen 2 (xtra) | Glamsdalen | 1 |
| Glumsø 1 | Glumsø | 1 |
| Greve 1 | Greve | 20 |
| Greve 1 *alders disp. | Greve | 1 |
| Greve 2 | Greve | 3 |
| Grindsted BK 1 | Grindsted BK | 1 |
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
| Hillerød 1 | Hillerød | 18 |
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
| Hjørring 1 | Hjørring | 5 |
| Hjørring 2 | Hjørring | 1 |
| Hobro 1 | Hobro | 1 |
| HOG Badminton, Hinnerup 1 | HOG Badminton, Hinnerup | 6 |
| Holbæk 1 | Holbæk | 5 |
| Horsens 1 | Horsens | 2 |
| Humlebæk 1 | Humlebæk | 2 |
| Hvidovre 1 | Hvidovre | 10 |
| Hvidovre 2 | Hvidovre | 3 |
| Højbjerg 1 | Højbjerg | 32 |
| Højbjerg 1 (2400) | Højbjerg | 1 |
| Højbjerg 2 | Højbjerg | 17 |
| Højbjerg 2 (2400) | Højbjerg | 1 |
| Højbjerg 3 | Højbjerg | 6 |
| Højbjerg 3 (2400) | Højbjerg | 1 |
| Højbjerg 4 | Højbjerg | 3 |
| Hørby Efterskole 1 | Hørby Efterskole | 1 |
| Hørning IF 1 | Hørning IF | 1 |
| Hørsholm 1 | Hørsholm | 1 |
| Haarby Efterskole 1 | Haarby Efterskole | 2 |
| Ikast 1 | Ikast | 9 |
| Ikast 2 | Ikast | 9 |
| Ikast 3 | Ikast | 1 |
| Ishøj SB 50 1 | Ishøj SB 50 | 1 |
| Islands Brygge 1 | Islands Brygge | 4 |
| Jetsmark 1 | Jetsmark | 1 |
| KBK Kbh. 1 | KBK Kbh. | 12 |
| KBK Kbh. 2 | KBK Kbh. | 2 |
| Klarup Badminton 1 | Klarup Badminton | 1 |
| KMB2010 1 | KMB2010 | 4 |
| KMB2010 2 | KMB2010 | 1 |
| KMB2010 3 | KMB2010 | 1 |
| Kolding BK 1 | Kolding BK | 16 |
| Kolding BK 2 | Kolding BK | 5 |
| Kolding BK 3 | Kolding BK | 1 |
| Kolding-Rødekro 1 | Kolding-Rødekro | 1 |
| Køge 1 | Køge | 2 |
| Langhøj 1 | Langhøj | 1 |
| Lejre 1 | Lejre | 1 |
| Lillerød 1 | Lillerød | 20 |
| Lillerød 2 | Lillerød | 3 |
| Lindholm 1 | Lindholm | 1 |
| Lindholm 3 | Lindholm | 1 |
| Lyngby 1 | Lyngby | 13 |
| Lyngby 2 | Lyngby | 4 |
| Middelfart 1 | Middelfart | 1 |
| Nivå-Kokkedal 1 | Nivå-Kokkedal | 1 |
| Nordbyens Badmintonklub 1 | Nordbyens Badmintonklub | 1 |
| Nyborg 1 | Nyborg | 1 |
| Nørager HCI 1 | Nørager HCI | 1 |
| Nørre Nissum Efterskole 1 | Nørre Nissum Efterskole | 1 |
| Odense OBK 1 | Odense OBK | 15 |
| Odense OBK 2 | Odense OBK | 4 |
| Odense OBK 4 | Odense OBK | 1 |
| Oksbøl Badminton Klub 1 | Oksbøl Badminton Klub | 1 |
| Poulstrup Vrejlev 1 | Poulstrup Vrejlev | 1 |
| Randers BK 1 | Randers BK | 1 |
| Rebild Efterskole 1 | Rebild Efterskole | 2 |
| Ribe 1 | Ribe | 1 |
| Rosendal 1 | Rosendal | 1 |
| Rosendal 2 | Rosendal | 1 |
| Roskilde HBK 1 | Roskilde HBK | 4 |
| Rudehøj Efterskole 1 | Rudehøj Efterskole | 1 |
| Rudersdal 1 | Rudersdal | 2 |
| Ry 1 | Ry | 1 |
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
| Sejs-Svejbæk 1 | Sejs-Svejbæk | 1 |
| SIF Assentoft 1 | SIF Assentoft | 2 |
| Sjælsølund SES 1 | Sjælsølund SES | 6 |
| Sjælsølund SES 2 | Sjælsølund SES | 5 |
| Sjælsølund SES 3 | Sjælsølund SES | 2 |
| Skagen 1 | Skagen | 1 |
| Skalborg SK 1 | Skalborg SK | 2 |
| Skalborg SK 2 | Skalborg SK | 1 |
| Skanderborg Badminton 1 | Skanderborg Badminton | 2 |
| Skovshoved 1 | Skovshoved | 18 |
| Skovshoved 2 | Skovshoved | 3 |
| Skovshoved 3 | Skovshoved | 1 |
| Slagelse 1 | Slagelse | 1 |
| Snejbjerg 1 | Snejbjerg | 1 |
| Solbjerg 1 | Solbjerg | 3 |
| Solrød Strand 1 | Solrød Strand | 38 |
| Solrød Strand 2 | Solrød Strand | 16 |
| Sorring 1 | Sorring | 3 |
| Sportsefterskolen SINE 1 | Sportsefterskolen SINE | 6 |
| Sportsefterskolen SINE 1 (M) | Sportsefterskolen SINE | 1 |
| Sportsefterskolen SINE 2 | Sportsefterskolen SINE | 3 |
| Sportsefterskolen SINE 2 (A) | Sportsefterskolen SINE | 1 |
| Sportsefterskolen SINE 3 | Sportsefterskolen SINE | 2 |
| Stavtrup 1 | Stavtrup | 1 |
| Stidsholt IF 1 | Stidsholt IF | 3 |
| Stidsholt IF 2 | Stidsholt IF | 1 |
| Strib Idrætsefterskole 1 | Strib Idrætsefterskole | 7 |
| Strib Idrætsefterskole 1 (A) | Strib Idrætsefterskole | 1 |
| Strib Idrætsefterskole 2 | Strib Idrætsefterskole | 5 |
| Strib Idrætsefterskole 3 | Strib Idrætsefterskole | 4 |
| Støvring 1 | Støvring | 2 |
| Støvring 2 | Støvring | 1 |
| Sundeved Efterskole 1 | Sundeved Efterskole | 4 |
| Svendborg 1 | Svendborg | 1 |
| Svenstrup 1 | Svenstrup | 8 |
| Svenstrup 2 | Svenstrup | 3 |
| Svenstrup 3 | Svenstrup | 3 |
| Sæby 1 | Sæby | 1 |
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
| Team Aarhus ungdom 1 | Team Aarhus ungdom | 1 |
| Thorsager Rønde 1 | Thorsager Rønde | 2 |
| Tirstrup Idrætsefterskole 1 | Tirstrup Idrætsefterskole | 2 |
| Triton-RBK-RIF 1 | Triton-RBK-RIF | 1 |
| Taastrup BC 1 | Taastrup BC | 2 |
| Taastrup Elite 1 | Taastrup Elite | 3 |
| Taastrup TIK 1 | Taastrup TIK | 1 |
| Ukendt modstander 1 | Ukendt modstander | 1 |
| Ukendt modstander 2 | Ukendt modstander | 1 |
| Vanløse 1 | Vanløse | 2 |
| Varde 1 | Varde | 5 |
| Varde 2 | Varde | 1 |
| Vedersø Idrætsefterskole 1 | Vedersø Idrætsefterskole | 3 |
| Vedersø Idrætsefterskole 2 | Vedersø Idrætsefterskole | 1 |
| Vejle 1 | Vejle | 2 |
| Vesterbølle Efterskole 1 | Vesterbølle Efterskole | 1 |
| Viby J 1 | Viby J | 18 |
| Viby J 2 | Viby J | 3 |
| Viby J 3 | Viby J | 1 |
| Viby-Silkeborg 1 | Viby-Silkeborg | 1 |
| Vinding SF 1 | Vinding SF | 2 |
| Vinding SF 1 (2400) | Vinding SF | 1 |
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
| Aalborg Triton 1 | Aalborg Triton | 7 |
| Aalborg Triton 2 | Aalborg Triton | 3 |
| Aalborg Triton 3 | Aalborg Triton | 1 |
| Aarhus AB 1 | Aarhus AB | 11 |
| Aarhus AB 2 | Aarhus AB | 3 |
| Aarhus AB 3 | Aarhus AB | 1 |
| Aars 1 | Aars | 1 |

### Samarbejdshold rapporteret separat (ikke GSB)

| Sæson | Alder | Råt holdnavn | Fysisk pulje | Format | Bogstav/række | Numerisk værdi |
| --- | --- | --- | --- | --- | --- | --- |
| 2020/2021 | U11 (3) | BC37/Gladsaxe Søborg 1 | 2020\|3\|13328 | 4+2 | niveau ikke tolket | — |

## Deltagelsesbredde B — Badminton København

`GSB i x af n` viser både antal og procent. Udgåede/trukne hold tæller ikke i x; de vises særskilt. 2026/2027 er markeret **i gang, ufuldstændig** og indgår ikke i “Samlet over tid”. Samlet over tid summeres afsluttede sæsoner kun inden for samme aldersgruppe.

| Sæson | Aldersgruppe | Rækker uden UGE 38/Kredsmatch | Uden UGE 38, inkl. Kredsmatch | Med UGE 38, uden Kredsmatch | Med UGE 38 og Kredsmatch | Puljer uden UGE 38/Kredsmatch | Puljer uden UGE 38, inkl. Kredsmatch | Udeladte GSB-hold |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2011/2012 | U11 (ID 3) | 2 af 5 (40%) | 2 af 5 uden UGE 38, inkl. Kredsmatch | 2 af 5 inkl. UGE 38, uden Kredsmatch | 2 af 5 inkl. UGE 38 og Kredsmatch | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 2 ({"udgået":2,"trukket":0}) |
| 2011/2012 | U13 (ID 4) | 2 af 5 (40%) | 2 af 5 uden UGE 38, inkl. Kredsmatch | 2 af 5 inkl. UGE 38, uden Kredsmatch | 2 af 5 inkl. UGE 38 og Kredsmatch | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 2 ({"udgået":1,"trukket":1}) |
| 2011/2012 | U15 (ID 5) | 3 af 5 (60%) | 3 af 5 uden UGE 38, inkl. Kredsmatch | 3 af 5 inkl. UGE 38, uden Kredsmatch | 3 af 5 inkl. UGE 38 og Kredsmatch | 3 af 5 (60%) | 3 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2011/2012 | U17 (ID 6) | 0 af 3 (0%) | 0 af 3 uden UGE 38, inkl. Kredsmatch | 0 af 3 inkl. UGE 38, uden Kredsmatch | 0 af 3 inkl. UGE 38 og Kredsmatch | 0 af 3 (0%) | 0 af 3 inkl. Kredsmatch | 1 ({"udgået":1,"trukket":0}) |
| 2012/2013 | U11 (ID 3) | 1 af 5 (20%) | 1 af 5 uden UGE 38, inkl. Kredsmatch | 1 af 5 inkl. UGE 38, uden Kredsmatch | 1 af 5 inkl. UGE 38 og Kredsmatch | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2012/2013 | U13 (ID 4) | 1 af 5 (20%) | 1 af 5 uden UGE 38, inkl. Kredsmatch | 1 af 5 inkl. UGE 38, uden Kredsmatch | 1 af 5 inkl. UGE 38 og Kredsmatch | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 1 ({"udgået":0,"trukket":1}) |
| 2012/2013 | U15 (ID 5) | 3 af 5 (60%) | 3 af 5 uden UGE 38, inkl. Kredsmatch | 3 af 5 inkl. UGE 38, uden Kredsmatch | 3 af 5 inkl. UGE 38 og Kredsmatch | 3 af 5 (60%) | 3 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2012/2013 | U17 (ID 6) | 1 af 3 (33,3%) | 1 af 3 uden UGE 38, inkl. Kredsmatch | 1 af 3 inkl. UGE 38, uden Kredsmatch | 1 af 3 inkl. UGE 38 og Kredsmatch | 1 af 3 (33,3%) | 1 af 3 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2013/2014 | U11 (ID 3) | 2 af 6 (33,3%) | 2 af 6 uden UGE 38, inkl. Kredsmatch | 2 af 6 inkl. UGE 38, uden Kredsmatch | 2 af 6 inkl. UGE 38 og Kredsmatch | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2013/2014 | U13 (ID 4) | 1 af 6 (16,7%) | 1 af 6 uden UGE 38, inkl. Kredsmatch | 1 af 6 inkl. UGE 38, uden Kredsmatch | 1 af 6 inkl. UGE 38 og Kredsmatch | 1 af 6 (16,7%) | 1 af 6 inkl. Kredsmatch | 1 ({"udgået":0,"trukket":1}) |
| 2013/2014 | U15 (ID 5) | 3 af 6 (50%) | 3 af 6 uden UGE 38, inkl. Kredsmatch | 3 af 6 inkl. UGE 38, uden Kredsmatch | 3 af 6 inkl. UGE 38 og Kredsmatch | 3 af 7 (42,9%) | 3 af 7 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2013/2014 | U17 (ID 6) | 2 af 3 (66,7%) | 2 af 3 uden UGE 38, inkl. Kredsmatch | 2 af 3 inkl. UGE 38, uden Kredsmatch | 2 af 3 inkl. UGE 38 og Kredsmatch | 2 af 3 (66,7%) | 2 af 3 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2014/2015 | U11 (ID 3) | 2 af 8 (25%) | 2 af 8 uden UGE 38, inkl. Kredsmatch | 2 af 8 inkl. UGE 38, uden Kredsmatch | 2 af 8 inkl. UGE 38 og Kredsmatch | 2 af 21 (9,5%) | 2 af 21 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2014/2015 | U13 (ID 4) | 2 af 6 (33,3%) | 2 af 6 uden UGE 38, inkl. Kredsmatch | 2 af 6 inkl. UGE 38, uden Kredsmatch | 2 af 6 inkl. UGE 38 og Kredsmatch | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2014/2015 | U15 (ID 5) | 2 af 5 (40%) | 2 af 5 uden UGE 38, inkl. Kredsmatch | 2 af 5 inkl. UGE 38, uden Kredsmatch | 2 af 5 inkl. UGE 38 og Kredsmatch | 2 af 5 (40%) | 2 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2014/2015 | U17 (ID 6) | 0 af 3 (0%) | 0 af 3 uden UGE 38, inkl. Kredsmatch | 0 af 3 inkl. UGE 38, uden Kredsmatch | 0 af 3 inkl. UGE 38 og Kredsmatch | 0 af 3 (0%) | 0 af 3 inkl. Kredsmatch | 2 ({"udgået":2,"trukket":0}) |
| 2015/2016 | U11 (ID 3) | 1 af 4 (25%) | 1 af 5 uden UGE 38, inkl. Kredsmatch | 1 af 4 inkl. UGE 38, uden Kredsmatch | 1 af 5 inkl. UGE 38 og Kredsmatch | 1 af 4 (25%) | 1 af 5 inkl. Kredsmatch | 1 ({"udgået":1,"trukket":0}) |
| 2015/2016 | U13 (ID 4) | 2 af 6 (33,3%) | 2 af 6 uden UGE 38, inkl. Kredsmatch | 2 af 6 inkl. UGE 38, uden Kredsmatch | 2 af 6 inkl. UGE 38 og Kredsmatch | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2015/2016 | U15 (ID 5) | 1 af 6 (16,7%) | 1 af 6 uden UGE 38, inkl. Kredsmatch | 1 af 6 inkl. UGE 38, uden Kredsmatch | 1 af 6 inkl. UGE 38 og Kredsmatch | 1 af 6 (16,7%) | 1 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2015/2016 | U17 (ID 6) | 0 af 4 (0%) | 0 af 4 uden UGE 38, inkl. Kredsmatch | 0 af 4 inkl. UGE 38, uden Kredsmatch | 0 af 4 inkl. UGE 38 og Kredsmatch | 0 af 4 (0%) | 0 af 4 inkl. Kredsmatch | 1 ({"udgået":1,"trukket":0}) |
| 2016/2017 | U11 (ID 3) | 2 af 8 (25%) | 2 af 9 uden UGE 38, inkl. Kredsmatch | 2 af 8 inkl. UGE 38, uden Kredsmatch | 2 af 9 inkl. UGE 38 og Kredsmatch | 2 af 9 (22,2%) | 2 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2016/2017 | U13 (ID 4) | 1 af 8 (12,5%) | 1 af 8 uden UGE 38, inkl. Kredsmatch | 1 af 8 inkl. UGE 38, uden Kredsmatch | 1 af 8 inkl. UGE 38 og Kredsmatch | 1 af 8 (12,5%) | 1 af 8 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2016/2017 | U15 (ID 5) | 2 af 6 (33,3%) | 2 af 6 uden UGE 38, inkl. Kredsmatch | 2 af 6 inkl. UGE 38, uden Kredsmatch | 2 af 6 inkl. UGE 38 og Kredsmatch | 2 af 6 (33,3%) | 2 af 6 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2016/2017 | U17 (ID 6) | 1 af 5 (20%) | 1 af 5 uden UGE 38, inkl. Kredsmatch | 1 af 5 inkl. UGE 38, uden Kredsmatch | 1 af 5 inkl. UGE 38 og Kredsmatch | 1 af 5 (20%) | 1 af 5 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2016/2017 | U17/U19 (ID 18) | 0 af 1 (0%) | 0 af 1 uden UGE 38, inkl. Kredsmatch | 0 af 1 inkl. UGE 38, uden Kredsmatch | 0 af 1 inkl. UGE 38 og Kredsmatch | 0 af 1 (0%) | 0 af 1 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2017/2018 | U11 (ID 3) | 1 af 7 (14,3%) | 1 af 9 uden UGE 38, inkl. Kredsmatch | 1 af 7 inkl. UGE 38, uden Kredsmatch | 1 af 9 inkl. UGE 38 og Kredsmatch | 1 af 8 (12,5%) | 1 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2017/2018 | U13 (ID 4) | 2 af 10 (20%) | 2 af 11 uden UGE 38, inkl. Kredsmatch | 2 af 10 inkl. UGE 38, uden Kredsmatch | 2 af 11 inkl. UGE 38 og Kredsmatch | 2 af 11 (18,2%) | 2 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2017/2018 | U15 (ID 5) | 2 af 9 (22,2%) | 2 af 10 uden UGE 38, inkl. Kredsmatch | 2 af 9 inkl. UGE 38, uden Kredsmatch | 2 af 10 inkl. UGE 38 og Kredsmatch | 2 af 13 (15,4%) | 2 af 14 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2017/2018 | U17/U19 (ID 18) | 1 af 5 (20%) | 1 af 5 uden UGE 38, inkl. Kredsmatch | 1 af 5 inkl. UGE 38, uden Kredsmatch | 1 af 5 inkl. UGE 38 og Kredsmatch | 1 af 6 (16,7%) | 1 af 6 inkl. Kredsmatch | 1 ({"udgået":1,"trukket":0}) |
| 2018/2019 | U11 (ID 3) | 2 af 9 (22,2%) | 2 af 11 uden UGE 38, inkl. Kredsmatch | 2 af 9 inkl. UGE 38, uden Kredsmatch | 2 af 11 inkl. UGE 38 og Kredsmatch | 2 af 9 (22,2%) | 2 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2018/2019 | U13 (ID 4) | 1 af 8 (12,5%) | 1 af 9 uden UGE 38, inkl. Kredsmatch | 1 af 8 inkl. UGE 38, uden Kredsmatch | 1 af 9 inkl. UGE 38 og Kredsmatch | 1 af 10 (10%) | 1 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2018/2019 | U15 (ID 5) | 1 af 10 (10%) | 1 af 11 uden UGE 38, inkl. Kredsmatch | 1 af 10 inkl. UGE 38, uden Kredsmatch | 1 af 11 inkl. UGE 38 og Kredsmatch | 1 af 14 (7,1%) | 1 af 15 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2018/2019 | U17/U19 (ID 18) | 2 af 6 (33,3%) | 2 af 6 uden UGE 38, inkl. Kredsmatch | 2 af 6 inkl. UGE 38, uden Kredsmatch | 2 af 6 inkl. UGE 38 og Kredsmatch | 2 af 8 (25%) | 2 af 8 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2019/2020 | U11 (ID 3) | 1 af 6 (16,7%) | 1 af 8 uden UGE 38, inkl. Kredsmatch | 1 af 6 inkl. UGE 38, uden Kredsmatch | 1 af 8 inkl. UGE 38 og Kredsmatch | 1 af 8 (12,5%) | 1 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2019/2020 | U13 (ID 4) | 2 af 8 (25%) | 2 af 9 uden UGE 38, inkl. Kredsmatch | 2 af 8 inkl. UGE 38, uden Kredsmatch | 2 af 9 inkl. UGE 38 og Kredsmatch | 2 af 11 (18,2%) | 2 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2019/2020 | U15 (ID 5) | 1 af 8 (12,5%) | 1 af 9 uden UGE 38, inkl. Kredsmatch | 1 af 8 inkl. UGE 38, uden Kredsmatch | 1 af 9 inkl. UGE 38 og Kredsmatch | 1 af 9 (11,1%) | 1 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2020/2021 | U09 (ID 2) | 1 af 1 (100%) | 1 af 1 uden UGE 38, inkl. Kredsmatch | 1 af 1 inkl. UGE 38, uden Kredsmatch | 1 af 1 inkl. UGE 38 og Kredsmatch | 1 af 1 (100%) | 1 af 1 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2020/2021 | U11 (ID 3) | 1 af 6 (16,7%) | 1 af 7 uden UGE 38, inkl. Kredsmatch | 1 af 6 inkl. UGE 38, uden Kredsmatch | 1 af 7 inkl. UGE 38 og Kredsmatch | 2 af 8 (25%) | 2 af 9 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2020/2021 | U13 (ID 4) | 2 af 8 (25%) | 2 af 8 uden UGE 38, inkl. Kredsmatch | 2 af 8 inkl. UGE 38, uden Kredsmatch | 2 af 8 inkl. UGE 38 og Kredsmatch | 2 af 11 (18,2%) | 2 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2020/2021 | U15 (ID 5) | 3 af 12 (25%) | 3 af 12 uden UGE 38, inkl. Kredsmatch | 3 af 12 inkl. UGE 38, uden Kredsmatch | 3 af 12 inkl. UGE 38 og Kredsmatch | 3 af 13 (23,1%) | 3 af 13 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2021/2022 | U09 (ID 2) | 1 af 2 (50%) | 1 af 2 uden UGE 38, inkl. Kredsmatch | 1 af 2 inkl. UGE 38, uden Kredsmatch | 1 af 2 inkl. UGE 38 og Kredsmatch | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2021/2022 | U11 (ID 3) | 1 af 7 (14,3%) | 1 af 8 uden UGE 38, inkl. Kredsmatch | 1 af 7 inkl. UGE 38, uden Kredsmatch | 1 af 8 inkl. UGE 38 og Kredsmatch | 3 af 11 (27,3%) | 3 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2021/2022 | U13 (ID 4) | 3 af 9 (33,3%) | 3 af 10 uden UGE 38, inkl. Kredsmatch | 3 af 9 inkl. UGE 38, uden Kredsmatch | 3 af 10 inkl. UGE 38 og Kredsmatch | 4 af 12 (33,3%) | 4 af 13 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2021/2022 | U15 (ID 5) | 5 af 10 (50%) | 5 af 10 uden UGE 38, inkl. Kredsmatch | 5 af 10 inkl. UGE 38, uden Kredsmatch | 5 af 10 inkl. UGE 38 og Kredsmatch | 5 af 13 (38,5%) | 5 af 13 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U09 (ID 2) | 1 af 2 (50%) | 1 af 2 uden UGE 38, inkl. Kredsmatch | 1 af 2 inkl. UGE 38, uden Kredsmatch | 1 af 2 inkl. UGE 38 og Kredsmatch | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U11 (ID 3) | 5 af 6 (83,3%) | 5 af 7 uden UGE 38, inkl. Kredsmatch | 5 af 6 inkl. UGE 38, uden Kredsmatch | 5 af 7 inkl. UGE 38 og Kredsmatch | 6 af 10 (60%) | 6 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U13 (ID 4) | 2 af 8 (25%) | 2 af 9 uden UGE 38, inkl. Kredsmatch | 2 af 8 inkl. UGE 38, uden Kredsmatch | 2 af 9 inkl. UGE 38 og Kredsmatch | 3 af 14 (21,4%) | 3 af 15 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U15 (ID 5) | 5 af 11 (45,5%) | 5 af 11 uden UGE 38, inkl. Kredsmatch | 5 af 11 inkl. UGE 38, uden Kredsmatch | 5 af 11 inkl. UGE 38 og Kredsmatch | 5 af 18 (27,8%) | 5 af 18 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2022/2023 | U17/U19 (ID 18) | 1 af 7 (14,3%) | 1 af 7 uden UGE 38, inkl. Kredsmatch | 1 af 7 inkl. UGE 38, uden Kredsmatch | 1 af 7 inkl. UGE 38 og Kredsmatch | 1 af 12 (8,3%) | 1 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U09 (ID 2) | 1 af 2 (50%) | 1 af 2 uden UGE 38, inkl. Kredsmatch | 1 af 2 inkl. UGE 38, uden Kredsmatch | 1 af 2 inkl. UGE 38 og Kredsmatch | 1 af 2 (50%) | 1 af 2 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U11 (ID 3) | 4 af 6 (66,7%) | 4 af 7 uden UGE 38, inkl. Kredsmatch | 4 af 6 inkl. UGE 38, uden Kredsmatch | 4 af 7 inkl. UGE 38 og Kredsmatch | 5 af 9 (55,6%) | 5 af 10 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U13 (ID 4) | 4 af 10 (40%) | 4 af 11 uden UGE 38, inkl. Kredsmatch | 4 af 10 inkl. UGE 38, uden Kredsmatch | 4 af 11 inkl. UGE 38 og Kredsmatch | 4 af 16 (25%) | 4 af 17 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U15 (ID 5) | 4 af 12 (33,3%) | 4 af 13 uden UGE 38, inkl. Kredsmatch | 4 af 12 inkl. UGE 38, uden Kredsmatch | 4 af 13 inkl. UGE 38 og Kredsmatch | 5 af 20 (25%) | 5 af 21 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2023/2024 | U17/U19 (ID 18) | 2 af 9 (22,2%) | 2 af 9 uden UGE 38, inkl. Kredsmatch | 2 af 9 inkl. UGE 38, uden Kredsmatch | 2 af 9 inkl. UGE 38 og Kredsmatch | 2 af 18 (11,1%) | 2 af 18 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U09 (ID 2) | 1 af 2 (50%) | 1 af 2 uden UGE 38, inkl. Kredsmatch | 1 af 2 inkl. UGE 38, uden Kredsmatch | 1 af 2 inkl. UGE 38 og Kredsmatch | 2 af 3 (66,7%) | 2 af 3 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U11 (ID 3) | 3 af 5 (60%) | 3 af 6 uden UGE 38, inkl. Kredsmatch | 3 af 5 inkl. UGE 38, uden Kredsmatch | 3 af 6 inkl. UGE 38 og Kredsmatch | 5 af 10 (50%) | 5 af 11 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U13 (ID 4) | 5 af 10 (50%) | 5 af 11 uden UGE 38, inkl. Kredsmatch | 6 af 12 inkl. UGE 38, uden Kredsmatch | 6 af 13 inkl. UGE 38 og Kredsmatch | 7 af 24 (29,2%) | 8 af 27 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U15 (ID 5) | 3 af 11 (27,3%) | 3 af 12 uden UGE 38, inkl. Kredsmatch | 5 af 15 inkl. UGE 38, uden Kredsmatch | 5 af 16 inkl. UGE 38 og Kredsmatch | 3 af 18 (16,7%) | 5 af 23 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2024/2025 | U17/U19 (ID 18) | 1 af 9 (11,1%) | 1 af 9 uden UGE 38, inkl. Kredsmatch | 1 af 11 inkl. UGE 38, uden Kredsmatch | 1 af 11 inkl. UGE 38 og Kredsmatch | 1 af 19 (5,3%) | 1 af 21 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U09 (ID 2) | 4 af 4 (100%) | 4 af 4 uden UGE 38, inkl. Kredsmatch | 4 af 4 inkl. UGE 38, uden Kredsmatch | 4 af 4 inkl. UGE 38 og Kredsmatch | 8 af 12 (66,7%) | 8 af 12 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U11 (ID 3) | 3 af 6 (50%) | 3 af 7 uden UGE 38, inkl. Kredsmatch | 3 af 6 inkl. UGE 38, uden Kredsmatch | 3 af 7 inkl. UGE 38 og Kredsmatch | 4 af 13 (30,8%) | 4 af 14 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U13 (ID 4) | 5 af 11 (45,5%) | 5 af 12 uden UGE 38, inkl. Kredsmatch | 9 af 15 inkl. UGE 38, uden Kredsmatch | 9 af 16 inkl. UGE 38 og Kredsmatch | 7 af 18 (38,9%) | 11 af 24 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U15 (ID 5) | 6 af 13 (46,2%) | 6 af 14 uden UGE 38, inkl. Kredsmatch | 8 af 17 inkl. UGE 38, uden Kredsmatch | 8 af 18 inkl. UGE 38 og Kredsmatch | 7 af 25 (28%) | 9 af 33 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2025/2026 | U17/U19 (ID 18) | 2 af 11 (18,2%) | 2 af 11 uden UGE 38, inkl. Kredsmatch | 3 af 13 inkl. UGE 38, uden Kredsmatch | 3 af 13 inkl. UGE 38 og Kredsmatch | 2 af 20 (10%) | 3 af 22 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U09 (ID 2) | 2 af 3 (66,7%) | 2 af 3 uden UGE 38, inkl. Kredsmatch | 2 af 3 inkl. UGE 38, uden Kredsmatch | 2 af 3 inkl. UGE 38 og Kredsmatch | 2 af 3 (66,7%) | 2 af 3 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U11 (ID 3) | 4 af 7 (57,1%) | 4 af 7 uden UGE 38, inkl. Kredsmatch | 4 af 7 inkl. UGE 38, uden Kredsmatch | 4 af 7 inkl. UGE 38 og Kredsmatch | 4 af 8 (50%) | 4 af 8 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U13 (ID 4) | 5 af 12 (41,7%) | 5 af 12 uden UGE 38, inkl. Kredsmatch | 7 af 15 inkl. UGE 38, uden Kredsmatch | 7 af 15 inkl. UGE 38 og Kredsmatch | 5 af 13 (38,5%) | 9 af 19 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U15 (ID 5) | 6 af 15 (40%) | 6 af 15 uden UGE 38, inkl. Kredsmatch | 8 af 20 inkl. UGE 38, uden Kredsmatch | 8 af 20 inkl. UGE 38 og Kredsmatch | 6 af 16 (37,5%) | 8 af 23 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (ID 18) | 3 af 11 (27,3%) | 3 af 11 uden UGE 38, inkl. Kredsmatch | 5 af 15 inkl. UGE 38, uden Kredsmatch | 5 af 15 inkl. UGE 38 og Kredsmatch | 3 af 13 (23,1%) | 6 af 21 inkl. Kredsmatch | 0 ({"udgået":0,"trukket":0}) |

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
| 2024/2025 | U13 (4) | UGE 38 - U13 C, 4000 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2024/2025 | U13 (4) | UGE 38 - U13 D, 3600 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 9 |
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
| 2024/2025 | U15 (5) | UGE 38 - U15 A, 6500 (2+2 | nej — UGE 38 (ekstraordinær turnering) | — |
| 2024/2025 | U15 (5) | UGE 38 - U15 C, 4600 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 6 |
| 2024/2025 | U15 (5) | UGE 38 - U15 D, 4000 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 7 |
| 2024/2025 | U15 (5) | UGE 38 - U15 M, 7800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2024/2025 | U17/U19 (18) | 8600 (4 spillere). | ja | — |
| 2024/2025 | U17/U19 (18) | A, 7800 (2+2) | ja | — |
| 2024/2025 | U17/U19 (18) | D, 4800 (2+2) | ja | — |
| 2024/2025 | U17/U19 (18) | M, 15000 (4+2) | ja | — |
| 2024/2025 | U17/U19 (18) | U17/U19 B, 7200 (4 spillere) | ja | — |
| 2024/2025 | U17/U19 (18) | U17/U19 C, 6000 (4 spillere) | ja | — |
| 2024/2025 | U17/U19 (18) | U17/U19 C-D, 5000 (4 spillere) | ja | — |
| 2024/2025 | U17/U19 (18) | U17/U19 D, 4600 (4 spillere) | ja | Gladsaxe Søborg 1 |
| 2024/2025 | U17/U19 (18) | U17/U19 M, 10000 (4 spillere) | ja | — |
| 2024/2025 | U17/U19 (18) | UGE 38 - A, 7800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2024/2025 | U17/U19 (18) | UGE 38 - C, 5600 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
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
| 2025/2026 | U13 (4) | Uge 38 - U13 A, 6000 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 7 |
| 2025/2026 | U13 (4) | Uge 38 - U13 B, 5400 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 8 |
| 2025/2026 | U13 (4) | Uge 38 - U13 C, 5000 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 9 |
| 2025/2026 | U13 (4) | Uge 38 - U13 D, 4800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 10 |
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
| 2025/2026 | U15 (5) | Uge 38 - U15 A, 6800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 6 |
| 2025/2026 | U15 (5) | Uge 38 - U15 B, 6000 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2025/2026 | U15 (5) | Uge 38 - U15 C, 5400 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 8 |
| 2025/2026 | U15 (5) | Uge 38 - U15 M, 7800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
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
| 2025/2026 | U17/U19 (18) | Uge 38 - U17/U19 A, 7800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2025/2026 | U17/U19 (18) | Uge 38 - U17/U19 D, 5000 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 3 |
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
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | UGE 38 - U13 A, 5800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | UGE 38 - U13 B, 5200 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 3; Gladsaxe Søborg 4 |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | UGE 38 - U13 D, 4600 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 5 |
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
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 A, 6800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 1 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 B, 5800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 2 |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 C, 5200 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 M, 7800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Uge 38 - U15 D, 4800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
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
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 A, 7800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 B, 6800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg; Gladsaxe Søborg 2 |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 C, 5800 (2+2) | nej — UGE 38 (ekstraordinær turnering) | — |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 D, 5000 (2+2) | nej — UGE 38 (ekstraordinær turnering) | Gladsaxe Søborg 3 |

### Rækker i region 8 uden GSB

Listen er pr. sæson og aldersgruppe; klubber er normaliseret fra holdnavnene, og format/niveau er kun vist som data, ikke fortolket ud over parserens resultat.

| Sæson | Alder | Række | Format | Niveau | Antal hold | Klubber |
| --- | --- | --- | --- | --- | --- | --- |
| 2011/2012 | U11 (3) | U11 1.Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | niveau ikke tolket | 4 | Gentofte; KBK Kbh.; Lyngby; Skovshoved |
| 2011/2012 | U11 (3) | U11 Serie X1 | Uplaceret: X1 (ingen brugbar kategorisignatur) | niveau ikke tolket | 8 | Amager ABC; Charlottenlund; Dragør; Gladsaxe Søborg; Hvidovre; KBK Kbh.; KMB2010; Lyngby |
| 2011/2012 | U11 (3) | U11 Serie X2 | Uplaceret: X2 (ingen brugbar kategorisignatur) | niveau ikke tolket | 8 | BK36 Kbh.; Drive; Gladsaxe Søborg; Hvidovre HB2000; KBK Kbh.; NBK Amager; Skovshoved; Valby BC |
| 2011/2012 | U13 (4) | U13 1.Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | niveau ikke tolket | 6 | Charlottenlund; Gentofte; KBK Kbh.; KMB2010; Lyngby; Skovshoved |
| 2011/2012 | U13 (4) | U13 3. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | niveau ikke tolket | 9 | Amager ABC; Charlottenlund; Drive; Frederiksberg; Gladsaxe Søborg; KBK Kbh.; KFUM Badminton Kbh.; Lyngby; Vanløse |
| 2011/2012 | U13 (4) | U13 Serie X2 | Uplaceret: X2 (ingen brugbar kategorisignatur) | niveau ikke tolket | 9 | Amager ABC; Dragør; Drive; Gladsaxe Søborg; Hvidovre HB2000; KFUM Badminton Kbh.; Sundby KFUM; Tono Kbh.; Valby BC |
| 2011/2012 | U15 (5) | U15 1. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | niveau ikke tolket | 6 | Bornholm.; Charlottenlund; Gentofte; KBK Kbh.; KMB2010; Skovshoved |
| 2011/2012 | U15 (5) | U15 2. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | niveau ikke tolket | 8 | Charlottenlund; Dragør; FKIF Frederiksberg; Hvidovre; KBK Kbh.; Lyngby; Sundby KFUM; Vanløse |
| 2011/2012 | U17 (6) | U17 1. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | niveau ikke tolket | 4 | Gentofte; Hvidovre; KBK Kbh.; KMB2010 |
| 2011/2012 | U17 (6) | U17 2. Serie | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | niveau ikke tolket | 9 | BC37 Amager; Charlottenlund; Drive; FKIF Frederiksberg; Gladsaxe Søborg; Hvidovre HB2000; KBK Kbh.; Lyngby; Sundby KFUM |
| 2011/2012 | U17 (6) | U17 Serie X1 | Uplaceret: X1 (ingen brugbar kategorisignatur) | niveau ikke tolket | 7 | Dragør; FKIF Frederiksberg; KFUM Badminton Kbh.; KMB2010; Rødovre; SMASH; Valby BC |
| 2012/2013 | U11 (3) | U11 1. Serie | Ikke-kanonisk signatur: DS2/DD1/HS4/HD2 | niveau ikke tolket | 4 | Gentofte; KBK Kbh.; Lyngby; Skovshoved |
| 2012/2013 | U11 (3) | U11 2. Serie | Ikke-kanonisk signatur: S6/D3 | niveau ikke tolket | 4 | Charlottenlund; KBK Kbh.; KMB2010; Skovshoved |
| 2012/2013 | U11 (3) | U11 Serie X1 | X1 | niveau ikke tolket | 8 | Amager ABC; Charlottenlund; Dragør; Hvidovre; KBK Kbh.; KMB2010; Lyngby; Valby BC |
| 2012/2013 | U11 (3) | U11 Serie X2 | X2 | niveau ikke tolket | 7 | Dragør; FKIF Frederiksberg; Hvidovre HB2000; NBK Amager; Skovshoved; Valby BC; Vanløse |
| 2012/2013 | U13 (4) | U13 1. Serie | 4+3 | niveau ikke tolket | 6 | Bornholm.; Gentofte; KBK Kbh.; KMB2010; Lyngby; Skovshoved |
| 2012/2013 | U13 (4) | U13 2. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | niveau ikke tolket | 7 | Charlottenlund; Dragør; Drive; Frederiksberg; Hvidovre; KBK Kbh.; Skovshoved |
| 2012/2013 | U13 (4) | U13 Serie X1 | X1 | niveau ikke tolket | 10 | Amager ABC; Charlottenlund; FKIF Frederiksberg; Gladsaxe Søborg; Hvidovre HB2000; KBK Kbh.; KFUM Badminton Kbh.; NBK Amager; Valby BC; Vanløse |
| 2012/2013 | U13 (4) | U13 Serie X2 | X2 | niveau ikke tolket | 9 | Amager ABC; BC37 Amager; Dragør; Hvidovre HB2000; Lyngby; Rødovre; Sundby KFUM; Tono Kbh.; Valby BC |
| 2012/2013 | U15 (5) | U15 1. Serie | 4+3 | niveau ikke tolket | 7 | Bornholm.; Gentofte; Hvidovre; KBK Kbh.; KMB2010; Lyngby; Skovshoved |
| 2012/2013 | U15 (5) | U15 2. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | niveau ikke tolket | 4 | Charlottenlund; Dragør; KBK Kbh.; Vanløse |
| 2012/2013 | U17 (6) | U17 1. Serie | 4+3 | niveau ikke tolket | 5 | Bornholm.; Charlottenlund; Gentofte; KBK Kbh.; KMB2010 |
| 2012/2013 | U17 (6) | U17 Serie X1 | X1 | niveau ikke tolket | 5 | FKIF Frederiksberg; KFUM Badminton Kbh.; Rødovre; SMASH; Valby BC |
| 2013/2014 | U11 (3) | U11 1. Serie | 4+2 | niveau ikke tolket | 4 | Gentofte; Hvidovre; Lyngby; Skovshoved |
| 2013/2014 | U11 (3) | U11 2. Serie | Ikke-kanonisk signatur: MD1/S4/D3 | niveau ikke tolket | 6 | Charlottenlund; Dragør; Islands Brygge; KBK Kbh.; KMB2010; Lyngby |
| 2013/2014 | U11 (3) | U11 Serie X2 | X2 | niveau ikke tolket | 8 | Amager ABC; Drive; Islands Brygge; Lyngby; Skovshoved; SMASH; Valby BC; Vanløse |
| 2013/2014 | U11 (3) | U11 Serie X3 | 4 spillere | niveau ikke tolket | 8 | Charlottenlund; Dragør; FKIF Frederiksberg; Hvidovre; KBK Kbh.; Skovshoved; Tono Kbh.; Vanløse |
| 2013/2014 | U13 (4) | U13 1. serie | 4+3 | niveau ikke tolket | 5 | Gentofte; KBK Kbh.; KMB2010; Lyngby; Skovshoved |
| 2013/2014 | U13 (4) | U13 2. serie | Ikke-kanonisk signatur: MD1/S4/D3 | niveau ikke tolket | 5 | Charlottenlund; Frederiksberg; Hvidovre; KBK Kbh.; Skovshoved |
| 2013/2014 | U13 (4) | U13 Serie X1 | X1 | niveau ikke tolket | 8 | Amager ABC; BC37 Amager; Dragør; FKIF Frederiksberg; Gladsaxe Søborg; Hvidovre; KFUM Badminton Kbh.; Lyngby |
| 2013/2014 | U13 (4) | U13 Serie X2 | X2 | niveau ikke tolket | 8 | Amager ABC; Dragør; Drive; Hvidovre HB2000; Rødovre; Skovshoved; Valby BC; Vanløse |
| 2013/2014 | U13 (4) | U13 Serie X3 | 4 spillere | niveau ikke tolket | 8 | Charlottenlund; FKIF Frederiksberg; Hvidovre HB2000; Islands Brygge; KBK Kbh.; Sundby KFUM; Tono Kbh.; Valby BC |
| 2013/2014 | U15 (5) | U15 1. serie | 4+3 | niveau ikke tolket | 4 | Gentofte; KBK Kbh.; Lyngby; Skovshoved |
| 2013/2014 | U15 (5) | U15 3. serie | Ikke-kanonisk signatur: MD1/S4/D3 | niveau ikke tolket | 8 | Charlottenlund; Drive; Frederiksberg; Hvidovre HB2000; KBK Kbh.; Lyngby; NBK Amager |
| 2013/2014 | U15 (5) | U15 Serie X2 | X2 | niveau ikke tolket | 8 | Amager ABC; BC37 Amager; Dragør; Hvidovre HB2000; Islands Brygge; Rødovre; Valby BC; Vanløse |
| 2013/2014 | U17 (6) | U17 1. serie | 4+3 | niveau ikke tolket | 3 | Gentofte; KBK Kbh.; Lyngby |
| 2014/2015 | U11 (3) | &#197;rets U11 Hold - Finaler & Placeringskampe | 4+3 | niveau ikke tolket | 12 | Dybbøl; Greve; Hvidovre; Højbjerg; KBK Kbh.; Kolding BK; Næsby; Odense OBK; Skovshoved; Solrød Strand; Talent Team Nord; Værløse |
| 2014/2015 | U11 (3) | &#197;rets U11 Hold - Indledende Puljer | 4+3 | niveau ikke tolket | 12 | Dybbøl; Greve; Hvidovre; Højbjerg; KBK Kbh.; Kolding BK; Næsby; Odense OBK; Skovshoved; Solrød Strand; Talent Team Nord; Værløse |
| 2014/2015 | U11 (3) | &#197;rets U11 Hold - Semifinaler | 4+3 | niveau ikke tolket | 12 | Dybbøl; Greve; Hvidovre; Højbjerg; KBK Kbh.; Kolding BK; Næsby; Odense OBK; Skovshoved; Solrød Strand; Talent Team Nord; Værløse |
| 2014/2015 | U11 (3) | U 11 2.serie (4+2 A) | 4+2 | niveau ikke tolket | 7 | Charlottenlund; Dragør; Drive; Frederiksberg; KBK Kbh.; KMB2010; NBK Amager |
| 2014/2015 | U11 (3) | U11 1.serie (4+3) | 4+3 | niveau ikke tolket | 6 | Drive; Gentofte; Hvidovre; KBK Kbh.; Lyngby; Skovshoved |
| 2014/2015 | U11 (3) | U11 serie X3 (4 spillere C) | 4 spillere | niveau ikke tolket | 7 | Hvidovre; Hvidovre HB2000; KBK Kbh.; Skovshoved; Tono Kbh.; Valby BC; Vanløse |
| 2014/2015 | U13 (4) | U13 1.serie (4+3) | 4+3 | niveau ikke tolket | 4 | Gentofte; Hvidovre; Lyngby; Skovshoved |
| 2014/2015 | U13 (4) | U13 2.serie (4+2 M) | 4+2 | niveau ikke tolket | 6 | Charlottenlund; Dragør; Drive; KBK Kbh.; Lyngby; Skovshoved |
| 2014/2015 | U13 (4) | U13 serie X1 (4 spillere C) | 4 spillere | niveau ikke tolket | 9 | Amager ABC; Charlottenlund; Drive; FKIF Frederiksberg; Hvidovre HB2000; KFUM Badminton Kbh.; KMB2010; Rødovre; Valby BC |
| 2014/2015 | U13 (4) | U13 serie X3 (4 spillere C) | 4 spillere | niveau ikke tolket | 5 | Amager ABC; Charlottenlund; Dragør; Islands Brygge; Lyngby |
| 2014/2015 | U15 (5) | U15 1.serie (4+3) | 4+3 | niveau ikke tolket | 5 | Gentofte; KBK Kbh.; KMB2010; Lyngby; Skovshoved |
| 2014/2015 | U15 (5) | U15 3.serie (4+2 M) | 4+2 | niveau ikke tolket | 8 | Amager ABC; Charlottenlund; Drive; FKIF Frederiksberg; Frederiksberg; Hvidovre HB2000; Lyngby; Valby BC |
| 2014/2015 | U15 (5) | U15 serie X2 (4 spillere C) | 4 spillere | niveau ikke tolket | 8 | BC37 Amager; Dragør; Hvidovre HB2000; Islands Brygge; Rødovre; Skovshoved; Sundby KFUM; Tono Kbh. |
| 2014/2015 | U17 (6) | U17 1.serie (4+3) | 4+3 | niveau ikke tolket | 5 | Gentofte; Hvidovre; KBK Kbh.; Lyngby; Skovshoved |
| 2014/2015 | U17 (6) | U17 2.serie (4+2 M) | 4+2 | niveau ikke tolket | 11 | Amager ABC; BC37 Amager; Charlottenlund; Dragør; Drive; FKIF Frederiksberg; Gladsaxe Søborg; KBK Kbh.; KFUM Badminton Kbh.; Lyngby; Vanløse |
| 2014/2015 | U17 (6) | U17 serie X1 (4 spillere C) | 4 spillere | niveau ikke tolket | 8 | Charlottenlund; FKIF Frederiksberg; Gladsaxe Søborg; KFUM Badminton Kbh.; Rødovre; Sundby KFUM; Tono Kbh.; Valby BC |
| 2015/2016 | U11 (3) | Kredsmatch | 4+3 | niveau ikke tolket | 6 | Badminton Fyn; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland; Middelfart |
| 2015/2016 | U11 (3) | U11 A Række 4+3 | 4+3 | A | 8 | Dragør; Drive; Hvidovre; KBK Kbh.; Lyngby; NBK Amager; Skovshoved |
| 2015/2016 | U11 (3) | U11 B Række 4 | 4 spillere | B | 10 | Charlottenlund; Dragør; Gentofte; Gladsaxe Søborg; KBK Kbh.; KMB2010; Lyngby; Skovshoved; Valby BC; Vanløse |
| 2015/2016 | U11 (3) | U11 C Række 4 | 4 spillere | C | 7 | Charlottenlund; Dragør; FKIF Frederiksberg; Lyngby; Tono Kbh.; Valby BC; Vanløse |
| 2015/2016 | U13 (4) | U13 A Række 4+2 | 4+2 | A | 8 | Charlottenlund; Dragør; Drive; Frederiksberg; Hvidovre; KBK Kbh.; Lyngby; NBK Amager |
| 2015/2016 | U13 (4) | U13 C Række 4 | 4 spillere | C | 8 | Amager ABC; Charlottenlund; Dragør; FKIF Frederiksberg; Rødovre; Skovshoved; Tono Kbh.; Valby BC |
| 2015/2016 | U13 (4) | U13 E Række 4+3 | 4+3 | E | 4 | Hvidovre; KBK Kbh.; Lyngby; Skovshoved |
| 2015/2016 | U13 (4) | U13 M Række 4+2 | 4+2 | M | 7 | Charlottenlund; KBK Kbh.; KMB2010; Lyngby; Skovshoved; Valby BC; Vanløse |
| 2015/2016 | U15 (5) | U15 A Række 4+2 | 4+2 | A | 7 | Amager ABC; Drive; Frederiksberg; Hvidovre; KBK Kbh.; NBK Amager; Skovshoved |
| 2015/2016 | U15 (5) | U15 B Række 4 | 4 spillere | B | 8 | BC37 Amager; Dragør; Drive; FKIF Frederiksberg; Hvidovre HB2000; KFUM Badminton Kbh.; Valby BC; Vanløse |
| 2015/2016 | U15 (5) | U15 C Række 4 | 4 spillere | C | 10 | Amager ABC; BC37 Amager; Charlottenlund; Dragør; FKIF Frederiksberg; Hvidovre; Hvidovre HB2000; Rødovre; Skovshoved; Tono Kbh. |
| 2015/2016 | U15 (5) | U15 D Række 4 | 4 spillere | D | 5 | Amager ABC; Charlottenlund; Islands Brygge; Skovshoved; Tono Kbh. |
| 2015/2016 | U15 (5) | U15 E Række 4+3 | 4+3 | E | 4 | KBK Kbh.; KMB2010; Lyngby; Skovshoved |
| 2015/2016 | U17 (6) | U17 A Række 4+2 | 4+2 | A | 10 | BC37 Amager; Charlottenlund; Dragør; Drive; FKIF Frederiksberg; Frederiksberg; Gladsaxe Søborg; Lyngby; Valby BC; Vanløse |
| 2015/2016 | U17 (6) | U17 B Række 4 | 4 spillere | B | 8 | Charlottenlund; Drive; FKIF Frederiksberg; KFUM Badminton Kbh.; Rødovre; Sct. Jørgen Kbh.; Tono Kbh. |
| 2015/2016 | U17 (6) | U17 E Række 4+3 | 4+3 | E | 4 | Gentofte; KBK Kbh.; Lyngby; Skovshoved |
| 2015/2016 | U17 (6) | U17/U19 A 4 spillere | 4 spillere | A | 6 | Amager ABC; Helsingør; Herlufsholm; Humlebæk; Måløv; Viskinge |
| 2016/2017 | U11 (3) | Holdturneringsdage for begyndere U11-Herlev | 4 spillere | niveau ikke tolket | 8 | Fredensborg; Greve; Herlev/Hjorten 0 Vært; Herlev/Hjorten Vært; Sydstevns; Såby Badminton; Viby S; Vordingborg |
| 2016/2017 | U11 (3) | Kredsmatch | 4+3 | niveau ikke tolket | 5 | Badminton Fyn; Badminton København; Badminton Midtjylland; Badminton Sjælland; Middelfart |
| 2016/2017 | U11 (3) | U11 (4+3) | 4+3 | niveau ikke tolket | 4 | Hvidovre; KBK Kbh.; Lyngby; Skovshoved |
| 2016/2017 | U11 (3) | U11 A (4) | 4 spillere | A | 3 | Dragør; KBK Kbh.; Skovshoved |
| 2016/2017 | U11 (3) | U11 B (4) | 4 spillere | B | 4 | Gentofte; Lyngby; Skovshoved; Vanløse |
| 2016/2017 | U11 (3) | U11 C (4) | 4 spillere | C | 7 | Amager ABC; Charlottenlund; Drive; FKIF Frederiksberg; Lyngby; NBK Amager; Vanløse |
| 2016/2017 | U11 (3) | U11 D (4) P2 | 4 spillere | D | 7 | Amager ABC; Charlottenlund; FKIF Frederiksberg; Islands Brygge; KMB2010; Tono Kbh.; Valby BC |
| 2016/2017 | U13 (4) | Holdturneringsdage for begyndere U13-Herlev | 4 spillere | niveau ikke tolket | 4 | Fredensborg; Herlev/Hjorten; Kalundborg; Viby S |
| 2016/2017 | U13 (4) | U13 (4+3) | 4+3 | niveau ikke tolket | 6 | Drive; Frederiksberg; Hvidovre; KBK Kbh.; Lyngby; Skovshoved |
| 2016/2017 | U13 (4) | U13 A (4) | 4 spillere | A | 5 | Dragør; KBK Kbh.; Lyngby; NBK Amager; Valby BC udgår |
| 2016/2017 | U13 (4) | U13 B (4) | 4 spillere | B | 8 | Charlottenlund; Dragør; Drive; Frederiksberg; Gentofte; KBK Kbh.; Lyngby; Vanløse |
| 2016/2017 | U13 (4) | U13 C (4) P1 | 4 spillere | C | 7 | Dragør; Drive; FKIF Frederiksberg; KMB2010; Rødovre; Valby BC; Vanløse |
| 2016/2017 | U13 (4) | U13 D (4) | 4 spillere | D | 10 | BC37 Amager; BK36 Kbh.; FKIF Frederiksberg; Hvidovre; Islands Brygge; KFUM Badminton Kbh.; Skovshoved; Valby BC |
| 2016/2017 | U13 (4) | slutspil U13 C (4) | 4 spillere | C | 2 | Hvidovre HB2000; Vanløse |
| 2016/2017 | U15 (5) | U15 (4+3) | 4+3 | niveau ikke tolket | 4 | Hvidovre; KBK Kbh.; Lyngby; Skovshoved |
| 2016/2017 | U15 (5) | U15 A (4) | 4 spillere | A | 6 | Amager ABC; Hvidovre; KBK Kbh.; Lyngby; Skovshoved; Vanløse |
| 2016/2017 | U15 (5) | U15 C (4) | 4 spillere | C | 8 | Amager ABC; Charlottenlund; Dragør; FKIF Frederiksberg; Hvidovre; Hvidovre HB2000; Rødovre; Vanløse |
| 2016/2017 | U15 (5) | U15 D (4) | 4 spillere | D | 10 | Amager ABC; BC37 Amager; Charlottenlund; Drive; FKIF Frederiksberg; Hvidovre HB2000; Islands Brygge; KMB2010; Tono Kbh.; Valby BC |
| 2016/2017 | U17 (6) | U17 (4+3) | 4+3 | niveau ikke tolket | 6 | Drive; Gentofte; KBK Kbh.; KMB2010; Lyngby; Skovshoved |
| 2016/2017 | U17 (6) | U17/U19 A (4+2) | 4+2 | A | 5 | Drive; Gentofte; Hvidovre; KBK Kbh.; Lyngby |
| 2016/2017 | U17 (6) | U17/U19 B (4) P1 | 4 spillere | B | 5 | Amager ABC; Charlottenlund; Dragør; Frederiksberg; Valby BC |
| 2016/2017 | U17 (6) | U17/U19 C (4) | 4 spillere | C | 4 | BC37 Amager; FKIF Frederiksberg; Hvidovre; Rødovre |
| 2016/2017 | U17/U19 (18) | Slutspil U17/U19 B (4) | 4 spillere | B | 2 | Amager ABC; Valby BC |
| 2017/2018 | U11 (3) | Holdturneringsdage for begyndere Hillerød 18/3-18 | 4 spillere | niveau ikke tolket | 3 | Hillerød; Sydstevns; Vindinge |
| 2017/2018 | U11 (3) | Kredsmatch | 4+3 | niveau ikke tolket | 5 | Badminton Fyn; Badminton København; Badminton Midtjylland; Badminton Sjælland; Middelfart |
| 2017/2018 | U11 (3) | Kredsmatch BADKBH-BADSJ&#198; U11 | Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2017/2018 | U11 (3) | U11 4+2 | 4+2 | niveau ikke tolket | 8 | KBK Kbh.; Lillerød-Farum; Lyngby; Skovshoved; Solrød Strand; Taastrup Elite/Vallensbæk |
| 2017/2018 | U11 (3) | U11 B (4) | 4 spillere | B | 8 | Dragør; Drive; Gentofte; Hvidovre; Lyngby; Skovshoved; Vanløse |
| 2017/2018 | U11 (3) | U11 C 4 spillere | 4 spillere | C | 11 | Birkerød BK13; Gentofte; Greve; Hillerød; Holbæk; Jyllinge; Kirke Hyllinge; Måløv; Nykøbing Sj.; Slagelse; Solrød Strand |
| 2017/2018 | U11 (3) | U11 D (4) P1 | 4 spillere | D | 8 | Amager ABC; Frederiksberg; Hvidovre; KBK Kbh.; KMB2010; Skovshoved; Valby BC; Vanløse |
| 2017/2018 | U11 (3) | U11 D (4) P3 | 4 spillere | D | 9 | Amager ABC; Charlottenlund; Dragør; Gentofte; Hvidovre; Islands Brygge; KMB2010; Skovshoved; Valby BC |
| 2017/2018 | U13 (4) | Holdturneringsdage for begyndere Hillerød 18/3-18 | 4 spillere | niveau ikke tolket | 3 | Hillerød; Sydstevns; Vindinge |
| 2017/2018 | U13 (4) | Kredsmatch BADKBH-BADSJ&#198; U13 | Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2017/2018 | U13 (4) | U13 4+3 | 4+3 | niveau ikke tolket | 11 | Drive; Greve; Hillerød; Hvidovre; KBK Kbh.; Lillerød; Lyngby; Skovshoved; Solrød Strand |
| 2017/2018 | U13 (4) | U13 A 4 spillere | 4 spillere | A | 6 | Badminton Roskilde; Fredensborg; Hillerød; Holte; KMB2010; Team Storstrøm |
| 2017/2018 | U13 (4) | U13 D (4 piger) | 4 piger | D | 5 | Amager ABC; Charlottenlund; Islands Brygge; Tono Kbh. |
| 2017/2018 | U13 (4) | U13 D (4) P1 | 4 spillere | D | 8 | Amager ABC; Charlottenlund; Frederiksberg; Hvidovre; KFUM Badminton Kbh.; Tono Kbh.; Valby BC |
| 2017/2018 | U13 (4) | U13 D (4) P2 | 4 spillere | D | 8 | Amager ABC; BC37 Amager; Dragør; FKIF Frederiksberg; Islands Brygge; KBK Kbh.; Skovshoved; Valby BC |
| 2017/2018 | U13 (4) | U13 D (4) P3 | 4 spillere | D | 8 | Amager ABC; BK36 Kbh.; Drive; Hvidovre HB2000; Islands Brygge; KMB2010; Valby BC; Vanløse |
| 2017/2018 | U13 (4) | U13 M/A 4+2 | 4+2 | M/A | 6 | ABC/IBB U13 B; Dragør; Drive; GBK/FBK U13 M/A; KBK Kbh.; Solrød Strand |
| 2017/2018 | U15 (5) | Kredsmatch BADKBH-BADSJ&#198; U15 | Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2017/2018 | U15 (5) | U15 4+3 | 4+3 | niveau ikke tolket | 11 | Greve; Hillerød; Holbæk; KBK Kbh.; Lillerød; Lyngby; Skovshoved; Solrød Strand; Værløse |
| 2017/2018 | U15 (5) | U15 A 4 spillere | 4 spillere | A | 12 | Farum; Greve; Hillerød; KBK Kbh.; Kirke Hyllinge; Lillerød; Måløv; Sorø; Valby BC; Vanløse; Værløse |
| 2017/2018 | U15 (5) | U15 B 4+2 | 4+2 | B | 7 | Charlottenlund; Drive; Hillerød; Ishøj SB 50; Skælskør |
| 2017/2018 | U15 (5) | U15 C (4) | 4 spillere | C | 11 | Amager ABC; Charlottenlund; Drive; FKIF Frederiksberg; Frederiksberg; KFUM Badminton Kbh.; NBK Amager; Rødovre; Valby BC |
| 2017/2018 | U15 (5) | U15 D (4 piger) | 4 piger | D | 4 | Charlottenlund; FKIF Frederiksberg; Islands Brygge; Tono Kbh. |
| 2017/2018 | U15 (5) | U15 D (4) | 4 spillere | D | 11 | Amager ABC; BC37 Amager; BK36 Kbh.; Charlottenlund; FKIF Frederiksberg; Hvidovre; Islands Brygge; Skovshoved; Tono Kbh.; Valby BC |
| 2017/2018 | U15 (5) | U15 M/A 4+2 | 4+2 | M/A | 10 | Dragør; Hillerød; Hvidovre; Hørsholm; KBK Kbh.; KMB2010; Køge; Lyngby |
| 2017/2018 | U17/U19 (18) | U17/19 B (4) | 4 spillere | B | 7 | Amager ABC; Charlottenlund; Drive; Gladsaxe Søborg; Hvidovre; Hvidovre HB2000; Valby BC |
| 2017/2018 | U17/U19 (18) | U17/19 C (4) | 4 spillere | C | 7 | Amager ABC; BC37 Amager; Charlottenlund; FKIF Frederiksberg; Hvidovre HB2000; Rødovre |
| 2017/2018 | U17/U19 (18) | U17/U19 A 4 spillere | 4 spillere | A | 11 | Badminton Roskilde; Dragør; Greve; Græsted; Holte; Solrød Strand; Sorø; Stenløse; Team Storstrøm; Taastrup Elite; Valby BC |
| 2017/2018 | U17/U19 (18) | U17/U19 M 4 spillere | 4 spillere | M | 9 | Farum; Herlev/Hjorten; Herlufsholm; Holbæk; Holte; KBK Kbh.; Lyngby; Skælskør; Værløse |
| 2018/2019 | U11 (3) | Kredsmatch | 4+3 | niveau ikke tolket | 6 | Badminton Fyn; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland; Middelfart |
| 2018/2019 | U11 (3) | Kredsmatch BADKBH-BADSJ U11 | Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2018/2019 | U11 (3) | U11 4+2 | 4+2 | niveau ikke tolket | 5 | Gentofte; Lyngby; Skovshoved; Solrød Strand |
| 2018/2019 | U11 (3) | U11 B 4 Spillere | 4 spillere | B | 5 | Drive; KBK Kbh.; Lyngby; Skovshoved; Vanløse |
| 2018/2019 | U11 (3) | U11 CD 4 Piger | 4 piger | niveau ikke tolket | 5 | FKIF Frederiksberg; Herlev/Hjorten; Solrød Strand; Taastrup Elite; Valby BC |
| 2018/2019 | U11 (3) | U11 CD 4 Spillere | 4 spillere | niveau ikke tolket | 9 | BC37 Amager; Birkerød BK13; Dragør; Espergærde; FKIF Frederiksberg; KBK Kbh.; Kirke Hyllinge; Køge; Skovshoved |
| 2018/2019 | U11 (3) | U11 D 4 Spillere P1 | 4 spillere | D | 7 | BC37 Amager; Frederiksberg; Gentofte; Hvidovre; Islands Brygge; Skovshoved; Valby BC |
| 2018/2019 | U11 (3) | U11 D 4 Spillere P3 | 4 spillere | D | 7 | Charlottenlund; Dragør; FKIF Frederiksberg; Hvidovre; KBK Kbh.; NBK Amager; Skovshoved |
| 2018/2019 | U11 (3) | U11 D 4 Spillere P4 | 4 spillere | D | 7 | Drive; Gentofte; Hvidovre; KMB2010; Rødovre; Valby BC; Vanløse |
| 2018/2019 | U13 (4) | Kredsmatch BADKBH-BADSJ U13 | Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2018/2019 | U13 (4) | U13 4+3 | 4+3 | niveau ikke tolket | 8 | Hillerød; Hvidovre; Lillerød; Lillerød U13 4+3; Lyngby; Skovshoved; Solrød Strand; Solrød Strand U13 4+3 |
| 2018/2019 | U13 (4) | U13 A 4 Spillere | 4 spillere | A | 15 | Badminton Roskilde; Fredensborg; Greve; Hillerød; Holbæk; Hørsholm; KBK Kbh.; Lyngby; Nivå-Kokkedal; Ringsted; Solrød Strand; Sorø; Vanløse; Værløse |
| 2018/2019 | U13 (4) | U13 B 4 Spillere | 4 spillere | B | 5 | Dragør; FKIF Frederiksberg; KBK Kbh.; Lyngby; Valby BC |
| 2018/2019 | U13 (4) | U13 C 4 Spillere | 4 spillere | C | 8 | BC37 Amager; Dragør; Gentofte; Islands Brygge; KFUM Badminton Kbh.; Lyngby; NBK Amager; Skovshoved |
| 2018/2019 | U13 (4) | U13 D 4 Spillere P1 | 4 spillere | D | 7 | BC37 Amager; Dragør; Hvidovre; KBK Kbh.; Lyngby; Valby BC; Vanløse |
| 2018/2019 | U13 (4) | U13 D 4 Spillere P2 | 4 spillere | D | 7 | Charlottenlund; Frederiksberg; Hvidovre; KFUM Badminton Kbh.; KMB2010; SAIF Kbh.; Valby BC |
| 2018/2019 | U13 (4) | U13 D 4 Spillere P3 | 4 spillere | D | 6 | BC37 Amager; Charlottenlund; FKIF Frederiksberg; Islands Brygge; KMB2010; SAIF Kbh. |
| 2018/2019 | U15 (5) | Kredsmatch BADKBH-BADSJ U15 | Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2018/2019 | U15 (5) | U15 4+3 | 4+3 | niveau ikke tolket | 13 | GBK/KMB2010; Greve; Greve U15 4+3; Hillerød; Hillerød U15 4+3; Holbæk; KBK Kbh.; Lillerød; Lyngby; Skovshoved; Solrød Strand; Værløse |
| 2018/2019 | U15 (5) | U15 A 4 Spillere | 4 spillere | A | 23 | Badminton Roskilde; Dragør; Drive; Frem - Hellebæk; Herlev/Hjorten; Hillerød; Holbæk; Holte; KBK Kbh.; Kirke Hyllinge; Køge; Lyngby; Måløv; Ringsted; Solrød Strand; Stenløse; Team Storstrøm; Taastrup Elite/Vallensbæk; Ølstykke |
| 2018/2019 | U15 (5) | U15 AB 4+2 | 4+2 | niveau ikke tolket | 8 | Hørsholm; KBK Kbh.; SKB-Stubbekøbing; Skælskør; Valby BC; Vanløse |
| 2018/2019 | U15 (5) | U15 B 4 Spillere | 4 spillere | B | 6 | BC37 Amager; Charlottenlund; Dragør; Frederiksberg; Hvidovre HB2000; Skovshoved |
| 2018/2019 | U15 (5) | U15 C 4 Spillere | 4 spillere | C | 9 | BC37 Amager; BK36 Kbh.; FKIF Frederiksberg; Gentofte; KMB2010; Lyngby 3 LBK/VSBK; NBK Amager; Skovshoved; Valby BC |
| 2018/2019 | U15 (5) | U15 CD 4 Spillere | 4 spillere | niveau ikke tolket | 6 | BC37 Amager; Drive; FKIF Frederiksberg; Islands Brygge; KBK Kbh.; Vanløse |
| 2018/2019 | U15 (5) | U15 D 4 Spillere P1 | 4 spillere | D | 9 | BC37 Amager; Charlottenlund; Frederiksberg; Gentofte; Islands Brygge; KBK Kbh.; KMB2010; SAIF Kbh.; Valby BC |
| 2018/2019 | U15 (5) | U15 M 4 Spillere | 4 spillere | M | 3 | Gentofte; Herlev/Hjorten; Vanløse |
| 2018/2019 | U15 (5) | U15 MA 4+2 | 4+2 | niveau ikke tolket | 5 | Greve; Hillerød; Hvidovre; Hørsholm; Nordbyens Badmintonklub |
| 2018/2019 | U17/U19 (18) | U17/19 B 4 Spillere | 4 spillere | B | 18 | Ballerup BC58; BC37 Amager; Borup; Charlottenlund; Glumsø; Græsted; Herlev/Hjorten; Holte; Kirke Hyllinge; Køge; Ledøje-Smørum; Lillerød; Næstved; Rudersdal; Slangerup; Sorø; Taastrup TIK |
| 2018/2019 | U17/U19 (18) | U17/19 CD 4 Spillere | 4 spillere | niveau ikke tolket | 7 | Farum; Glostrup; Helsingør; Hillerød; Islands Brygge; Ledøje-Smørum; Stenløse |
| 2018/2019 | U17/U19 (18) | U17/19 MA 4+2 | 4+2 | niveau ikke tolket | 9 | BC37 Amager; Drive; Greve; HB2000/Taastrup Badminton; KBK Kbh.; Nordbyens Badmintonklub |
| 2018/2019 | U17/U19 (18) | U17/U19 C 4 Spillere | 4 spillere | C | 6 | BC37 Amager; Charlottenlund; Dragør; FKIF Frederiksberg; Frederiksberg; Hvidovre HB2000 |
| 2019/2020 | U11 (3) | Kredsmatch 19/20 | 4+3 | niveau ikke tolket | 5 | Badminton Fyn; Badminton København; Badminton Midtjylland; Badminton Sjælland; Middelfart |
| 2019/2020 | U11 (3) | Kredsmatch BADSJ&#198; - BADKBH | Uplaceret: ingen formattekst (ingen brugbar kategorisignatur) | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2019/2020 | U11 (3) | U11 - 3000 - 4 spillere | 4 spillere | niveau ikke tolket | 22 | Badminton i indre By; BC37 Amager; Charlottenlund; Dragør; Drive; FKIF Frederiksberg; Gentofte; Islands Brygge; KMB2010; Lyngby; NBK Amager; SAIF Kbh.; Skovshoved; Vanløse |
| 2019/2020 | U11 (3) | U11 - 3800 - 4 spillere | 4 spillere | niveau ikke tolket | 9 | Charlottenlund; Dragør; Drive; FKIF Frederiksberg; Frederiksberg; KBK Kbh.; Lyngby; Skovshoved |
| 2019/2020 | U11 (3) | U11 - 4+2 | 4+2 | niveau ikke tolket | 3 | Lyngby; Skovshoved; Solrød Strand |
| 2019/2020 | U11 (3) | U11 - 4400 - 4 spillere | 4 spillere | niveau ikke tolket | 5 | BC37 Amager; Gentofte; Hvidovre; KBK Kbh.; Vanløse |
| 2019/2020 | U11 (3) | U11 - 5200 - 4 spillere | 4 spillere | niveau ikke tolket | 5 | FKIF Frederiksberg; Hvidovre; IBB/BC37 Amager; Næstved/Gørlev; Sorø |
| 2019/2020 | U13 (4) | Kredsmatch BADSJ&#198; - BADKBH | Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2019/2020 | U13 (4) | U13 - 3400 - 4 piger | 4 piger | niveau ikke tolket | 11 | BC37 Amager; Gørlev; Herlev/Hjorten; Herlufsholm; Hvidovre; Køge; Lillerød; Nivå-Kokkedal; Solrød Strand; Valby BC; Ølstykke |
| 2019/2020 | U13 (4) | U13 - 3800 - 4 piger | 4 piger | niveau ikke tolket | 6 | BC37 Amager; Charlottenlund; Gentofte; Nivå-Kokkedal; Solrød Strand; Valby BC |
| 2019/2020 | U13 (4) | U13 - 4+3 | 4+3 | niveau ikke tolket | 11 | Gentofte; Hillerød; Lillerød; Lyngby; Ringsted/Værløse; Skovshoved; Solrød Strand; Team København; Vanløse |
| 2019/2020 | U13 (4) | U13 - 4400 - 4 spillere | 4 spillere | niveau ikke tolket | 11 | BC37 Amager; BK36 Kbh.; Charlottenlund; FKIF Frederiksberg; Gentofte; KBK Kbh.; Lyngby; NBK Amager; Skovshoved; Valby BC; Vanløse |
| 2019/2020 | U13 (4) | U13 - 5200 - 4 spillere | 4 spillere | niveau ikke tolket | 4 | FKIF Frederiksberg; Frederiksberg; Hvidovre; KMB2010 |
| 2019/2020 | U13 (4) | U13 - 6200 - 4 spillere | 4 spillere | niveau ikke tolket | 12 | Dragør; Greve; Græsted; Herlev/Hjorten; Hillerød; Jernløse; KBK Kbh.; Ledøje-Smørum; Lyngby; Måløv; Nykøbing Sj. |
| 2019/2020 | U15 (5) | Kredsmatch BADSJ&#198; - BADKBH | Ikke-kanonisk signatur: MD2/DS2/DD2/HS4/HD3 | niveau ikke tolket | 2 | Badminton København; Badminton Sjælland |
| 2019/2020 | U15 (5) | U15 - 12000 - 4+2 | 4+2 | niveau ikke tolket | 9 | Hillerød; Holbæk-Skibby; KBK/KMB2010 kbh.; NBK/BC 37 Amager; Nordbyens Badmintonklub; Ringsted; Team Egedal; Vanløse/FKIF |
| 2019/2020 | U15 (5) | U15 - 4+3 | 4+3 | niveau ikke tolket | 7 | Gentofte; Greve; Hvidovre; Lillerød; Lyngby; Skovshoved; Solrød Strand |
| 2019/2020 | U15 (5) | U15 - 4400 - 4 piger | 4 piger | niveau ikke tolket | 6 | Allinge-S.G. Badminton; BC37 Amager; Charlottenlund; FKIF Frederiksberg; Gentofte; Valby BC |
| 2019/2020 | U15 (5) | U15 - 4400 - 4 spillere | 4 spillere | niveau ikke tolket | 12 | BC37 Amager; Charlottenlund; Dragør; FKIF Frederiksberg; Islands Brygge; KBK Kbh.; KMB2010; SAIF Kbh.; Valby BC; Vanløse |
| 2019/2020 | U15 (5) | U15 - 5200 - 4 spillere | 4 spillere | niveau ikke tolket | 9 | BC37 Amager; Drive; FKIF Frederiksberg; Hvidovre; KBK Kbh.; NBK Amager; SAIF Kbh.; Skovshoved; Valby BC |
| 2019/2020 | U15 (5) | U15 - 7200 - 4 spillere | 4 spillere | niveau ikke tolket | 5 | BC37 Amager; Charlottenlund; Dragør; Gentofte; Valby BC |
| 2019/2020 | U15 (5) | U15 - 8400 - 4 spillere | 4 spillere | niveau ikke tolket | 11 | Badminton Roskilde; Greve; Herlev/Hjorten; Hvidovre; Hørsholm; Kirke Hyllinge; Køge; Lyngby; Nivå-Kokkedal; Solrød Strand |
| 2020/2021 | U11 (3) | Kredsmatch 20-21 | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2020/2021 | U11 (3) | U11 - 2800 - 4 piger | 4 piger | niveau ikke tolket | 8 | FKIF Frederiksberg; Herlev/Hjorten; Islands Brygge; KMB2010; Nivå-Kokkedal; Rødovre; Solrød Strand; Ølstykke |
| 2020/2021 | U11 (3) | U11 - 3800 - 4 spillere | 4 spillere | niveau ikke tolket | 8 | Badminton Roskilde; FKIF Frederiksberg; Herlev/Smørum; Køge; Nivå-Kokkedal; Ringsted; Skovshoved; Solrød Strand |
| 2020/2021 | U11 (3) | U11 - 4400 - 4 spillere | 4 spillere | niveau ikke tolket | 3 | Humlebæk; KBK Kbh.; Værløse |
| 2020/2021 | U11 (3) | U11 3400 4 Spillere | 4 spillere | niveau ikke tolket | 8 | Dragør; Drive; Hvidovre; KBK Kbh.; KMB2010; Lyngby; NBK Amager |
| 2020/2021 | U11 (3) | U11 4+2 | 4+2 | niveau ikke tolket | 4 | BC37/Gladsaxe Søborg; Lyngby; Skovshoved; Solrød Strand |
| 2020/2021 | U13 (4) | U13 - 3800 - 4 piger | 4 piger | niveau ikke tolket | 6 | FKIF Frederiksberg; Hvidovre; Hørsholm; KBK Kbh.; Køge; Nivå-Kokkedal |
| 2020/2021 | U13 (4) | U13 - 4+3 | 4+3 | niveau ikke tolket | 9 | Furesø; Gentofte; Hillerød; Lyngby; Skovshoved; Solrød Strand; Team Metro+ |
| 2020/2021 | U13 (4) | U13 - 6000 - 4 spillere | 4 spillere | niveau ikke tolket | 9 | Græsted; Herlev/Hjorten; KBK Kbh.; KMB2010; Køge; Næstved; Skovshoved; Sorø; Team Vejleå |
| 2020/2021 | U13 (4) | U13 3200 4 Piger | 4 piger | niveau ikke tolket | 5 | BC37 Amager; FKIF Frederiksberg; NBK Amager; Valby BC; Vanløse |
| 2020/2021 | U13 (4) | U13 4400 4 Spillere | 4 spillere | niveau ikke tolket | 9 | BC37 Amager; Dragør; FKIF Frederiksberg; Frederiksberg; Gentofte; Hvidovre HB2000; KBK Kbh.; Skovshoved; Valby BC |
| 2020/2021 | U13 (4) | U13 5200 4 Spillere | 4 spillere | niveau ikke tolket | 5 | BC37 Amager; Drive; FKIF Frederiksberg; Hvidovre; Vanløse |
| 2020/2021 | U15 (5) | U15 - 10t - 4+2 | 4+2 | niveau ikke tolket | 3 | Allinge-S.G. Badminton; Badminton Roskilde; Køge |
| 2020/2021 | U15 (5) | U15 - 12t - 4+2 | 4+2 | niveau ikke tolket | 4 | BC37/Dragør; Hillerød; Holbæk; Nivå-Kokkedal |
| 2020/2021 | U15 (5) | U15 - 4+3 | 4+3 | niveau ikke tolket | 8 | Gentofte; Greve; Hillerød; Hvidovre; Lillerød; Lyngby; Solrød Strand |
| 2020/2021 | U15 (5) | U15 - 4200 - 4 piger | 4 piger | niveau ikke tolket | 5 | BC37 Amager; Charlottenlund; Holbæk; Slagelse; Solrød Strand |
| 2020/2021 | U15 (5) | U15 - 4800 - 4 piger | 4 piger | niveau ikke tolket | 6 | Badminton Roskilde; Hvidovre; Hørsholm; Måløv; Nivå-Kokkedal; Værløse |
| 2020/2021 | U15 (5) | U15 - 5600 - 4 spillere | 4 spillere | niveau ikke tolket | 14 | Drive; Frem - Hellebæk; Greve; Herlev/Hjorten; Jernløse; Jyllinge; Kirke Hyllinge; KMB2010; Lyngby; Nordbyens Badmintonklub; Næstved; Solrød Strand; Vallensbæk |
| 2020/2021 | U15 (5) | U15 - 7600 - 4 spillere | 4 spillere | niveau ikke tolket | 10 | Birkerød BK13; Greve; Kirke Hyllinge; Lyngby; Måløv/Smørum; Nordbyens Badmintonklub; Ringsted; Solrød Strand; Sorø/Slagelse; Vanløse |
| 2020/2021 | U15 (5) | U15 4200 4 Spillere P1 | 4 spillere | niveau ikke tolket | 9 | BC37 Amager; BK36 Kbh.; Charlottenlund; Gentofte; Hvidovre; KBK Kbh.; SAIF Kbh.; Valby BC; Vanløse |
| 2020/2021 | U15 (5) | U15 4800 4 Spillere | 4 spillere | niveau ikke tolket | 11 | BC37 Amager; BK36 Kbh.; Charlottenlund; Dragør; FKIF Frederiksberg; Frederiksberg; Hvidovre; Hvidovre HB2000; KMB2010; NBK Amager; SAIF Kbh. |
| 2021/2022 | U09 (2) | U9 Nye spillere (2700 - 4 spillere) | 4 spillere | niveau ikke tolket | 4 | Frederikssund; Glumsø; Skovshoved; Taastrup BC |
| 2021/2022 | U11 (3) | U11 (2+2) | 2+2 | niveau ikke tolket | 5 | Hvidovre; Lyngby; Skovshoved; Solrød Strand; Team Sjælland |
| 2021/2022 | U11 (3) | U11 - 2700 (4 piger) | 4 piger | niveau ikke tolket | 9 | Charlottenlund; Greve; Herlev/Hjorten; Køge; Lyngby; Nivå-Kokkedal; Rødovre; Solrød Strand; Ølstykke |
| 2021/2022 | U11 (3) | U11 - 3800 (4 spillere) | 4 spillere | niveau ikke tolket | 4 | Hørsholm; Skovshoved; Valby BC; Værløse |
| 2021/2022 | U11 (3) | U11 - 4400 (4 spillere) | 4 spillere | niveau ikke tolket | 3 | Humlebæk; Lillerød; Solrød Strand |
| 2021/2022 | U11 (3) | U11 3400 4 Spillere | 4 spillere | niveau ikke tolket | 7 | Dragør; Drive; FKIF Frederiksberg; Hvidovre; KBK Kbh.; KMB2010; Vanløse |
| 2021/2022 | U11 (3) | U11 Kredsmatch | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2021/2022 | U11 (3) | U11 Nye spillere - 3100 (4 spillere) | 4 spillere | niveau ikke tolket | 9 | Fredensborg; Frederikssund; Glumsø; Holte; Humlebæk; Jernløse; Sorø; Taastrup BC |
| 2021/2022 | U13 (4) | U13 (4+3) | 4+3 | niveau ikke tolket | 6 | Gentofte/KMB2010; Lyngby; Skovshoved; Solrød Strand; Team FKIF/KBK/HBC; Team Nordsjælland |
| 2021/2022 | U13 (4) | U13 - 6000 (4 spillere) | 4 spillere | niveau ikke tolket | 5 | BC37 Amager; Humlebæk; Køge; Solrød Strand; Sorø |
| 2021/2022 | U13 (4) | U13 3100 4 Piger | 4 piger | niveau ikke tolket | 8 | BC37 Amager; Charlottenlund; Gentofte; KBK Kbh.; Køge; Lillerød; Rødovre; Ølstykke |
| 2021/2022 | U13 (4) | U13 3800 4 Spillere | 4 spillere | niveau ikke tolket | 11 | Badminton i indre By; Dragør; Gentofte; Hvidovre; Islands Brygge; KMB2010; Lyngby; Skovshoved; Valby BC; Vanløse |
| 2021/2022 | U13 (4) | U13 4400 4 Spillere | 4 spillere | niveau ikke tolket | 7 | Charlottenlund; Frederiksberg; Gentofte; KBK Kbh.; KMB2010; Lyngby; NBK Amager |
| 2021/2022 | U13 (4) | U13 Kredsmatch | 4+3 | niveau ikke tolket | 4 | Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2021/2022 | U13 (4) | U13 Nye spillere - 3500 (4 spillere) | 4 spillere | niveau ikke tolket | 7 | Fredensborg; Frederikssund; Hornbæk; Hundested; Rødovre; Sorø; Taastrup BC |
| 2021/2022 | U15 (5) | U15 (4+3) | 4+3 | niveau ikke tolket | 11 | FSK Furesø; Gentofte; Greve; Hillerød; Lyngby; NK Lillerød; Skovshoved; Solrød Strand; Team KBK/Drive/Jernløse |
| 2021/2022 | U15 (5) | U15 - 6400 (4 spillere) | 4 spillere | niveau ikke tolket | 10 | Birkerød BK13; Farum; Humlebæk; KBK Kbh.; Kirke Hyllinge; Køge; Måløv/Smørum; Næstved/Herlufsholm; Solrød Strand; Team Storstrøm |
| 2021/2022 | U15 (5) | U15 - 6900 (2+2) | 2+2 | niveau ikke tolket | 7 | BC37 Amager; FSK Furesø; Holbæk; Måløv; Skovshoved; Solrød Strand; Team Vejleå |
| 2021/2022 | U15 (5) | U15 - 7800 (2+2) | 2+2 | niveau ikke tolket | 4 | HBC/KMB2010; Herlev/Hjorten; Lyngby; Solrød Strand |
| 2021/2022 | U15 (5) | U15 5600 4 Spillere | 4 spillere | niveau ikke tolket | 12 | BC37 Amager; BK36 Kbh.; Charlottenlund; Dragør; Drive; Hvidovre; KBK Kbh.; KMB2010; Lyngby; NBK Amager; Valby BC; Vanløse |
| 2022/2023 | U09 (2) | U09 2400 4 Spillere | 4 spillere | niveau ikke tolket | 4 | Gentofte; Hvidovre; Lillerød; Skovshoved |
| 2022/2023 | U11 (3) | U11 4400 4 Spillere | 4 spillere | niveau ikke tolket | 7 | Gentofte; Herlev/Hjorten; KMB2010; Skovshoved; Værløse |
| 2022/2023 | U11 (3) | U11 Kredsmatch | 4+3 | niveau ikke tolket | 4 | Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2022/2023 | U13 (4) | U13 - 3600 (4 piger) | 4 piger | niveau ikke tolket | 10 | KBK Kbh.; KMB2010; Lillerød; Næstved-Herlufsholm; Rødovre; Solrød Strand; Værløse; Ølstykke |
| 2022/2023 | U13 (4) | U13 - 4+3 | 4+3 | niveau ikke tolket | 6 | KBK/Drive/; Lillerød; Skovshoved; Solrød Strand |
| 2022/2023 | U13 (4) | U13 - 5600 (2+2) | 2+2 | niveau ikke tolket | 4 | FSK Furesø; Hvidovre; KMB2010; Skovshoved |
| 2022/2023 | U13 (4) | U13 3000 4 Piger | 4 piger | niveau ikke tolket | 6 | BC37 Amager; Gentofte; Islands Brygge; Skovshoved; Valby BC |
| 2022/2023 | U13 (4) | U13 3800 4 Spillere | 4 spillere | niveau ikke tolket | 16 | BC37 Amager; BK36 Kbh.; Dragør; FKIF Frederiksberg; Frederiksberg; Gentofte; Hvidovre; Islands Brygge; KBK Kbh.; KFUM Badminton Kbh.; KMB2010; Lyngby; Rødovre; SAIF Kbh.; Skovshoved; Vanløse |
| 2022/2023 | U13 (4) | U13 5200 4 Spillere | 4 spillere | niveau ikke tolket | 7 | Badminton Roskilde; Gentofte; Lyngby; Skovshoved; Solrød Strand |
| 2022/2023 | U13 (4) | U13 Kredsmatch | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2022/2023 | U15 (5) | U15 - 4+3 | 4+3 | niveau ikke tolket | 9 | Gentofte; Hillerød; KBK Kbh.; Lyngby; Skovshoved; Solrød Strand |
| 2022/2023 | U15 (5) | U15 - 4000 (2+2) | 2+2 | niveau ikke tolket | 3 | Badminton Roskilde; Drive; NBK Amager |
| 2022/2023 | U15 (5) | U15 - 4000 (4 piger) | 4 piger | niveau ikke tolket | 10 | Hillerød; Jernløse; Kirke Hyllinge; Ledøje-Smørum; Ringsted; Team Vejleå; Valby BC; Vanløse |
| 2022/2023 | U15 (5) | U15 - 4800 (2+2) | 2+2 | niveau ikke tolket | 8 | Birkerød BK13; FKIF Frederiksberg; Holbæk; Islands Brygge; KBK Kbh.; Ølstykke |
| 2022/2023 | U15 (5) | U15 - 5600 (2+2) | 2+2 | niveau ikke tolket | 7 | Badminton Roskilde; BC37 Amager; Gentofte; Herlev/Hjorten; Ledøje-Smørum |
| 2022/2023 | U15 (5) | U15 - 6800 (2+2) | 2+2 | niveau ikke tolket | 11 | FKIF Frederiksberg; Holbæk/Kirke Hyllinge; Hvidovre; Køge; Skovshoved; Solrød Strand; Ølstykke |
| 2022/2023 | U17/U19 (18) | U17/U19 - 10000 (4 spillere) | 4 spillere | niveau ikke tolket | 4 | Gentofte; Hvidovre; Lillerød; Ringsted |
| 2022/2023 | U17/U19 (18) | U17/U19 - 15000 (4+2) | 4+2 | niveau ikke tolket | 8 | BC37 Amager; Herlev/Hjorten; KBK Kbh.; Vanløse/FKIF; Værløse |
| 2022/2023 | U17/U19 (18) | U17/U19 - 6000 (4 spillere) | 4 spillere | niveau ikke tolket | 17 | Badminton Roskilde; Bagsværd; Ballerup BC58; BC37 Amager; Birkerød BK13; Greve; Holte; Hørsholm; Ledøje-Smørum; NBK Amager; Nivå-Kokkedal; Rudersdal; Stenløse; Vanløse; Ølstykke |
| 2022/2023 | U17/U19 (18) | U17/U19 - 6800 (2+2) | 2+2 | niveau ikke tolket | 7 | BC37 Amager; Farum; Herlev/Hjorten; Holbæk/Kirke Hyllinge; Team Vejleå |
| 2022/2023 | U17/U19 (18) | U17/U19 - 8000 (2+2) | 2+2 | niveau ikke tolket | 9 | FKIF/VBC; Herlev/Hjorten; Hillerød; Jernløse; KBK Kbh.; KMB2010; Næstved-Herlufsholm |
| 2022/2023 | U17/U19 (18) | U17/U19 7200 4 Spillere Pulje 1 Ny | 4 spillere | niveau ikke tolket | 4 | Charlottenlund; Drive; FKIF Frederiksberg; KBK Kbh. |
| 2023/2024 | U09 (2) | U09 2800 4 Spillere | 4 spillere | niveau ikke tolket | 7 | BC37 Amager; Drive; Hvidovre; Islands Brygge; KBK Kbh.; KMB2010; Skovshoved |
| 2023/2024 | U11 (3) | U11 - 3600 4 spillere | 4 spillere | niveau ikke tolket | 4 | Charlottenlund; Drive; Holte; KBK Kbh. |
| 2023/2024 | U11 (3) | U11 - 4400 4 spillere | 4 spillere | niveau ikke tolket | 12 | Humlebæk; Hvidovre; KBK Kbh.; Kirke Hyllinge; KMB2010; Lyngby; Skovshoved; Solrød Strand; Team Vindinge/Roskilde; Vanløse |
| 2023/2024 | U11 (3) | U11 Kredsmatch | 4+3 | niveau ikke tolket | 4 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Sjælland |
| 2023/2024 | U13 (4) | U13 - 3000 4 piger | 4 piger | niveau ikke tolket | 7 | FKIF Frederiksberg; Gentofte; Hvidovre; Islands Brygge; KMB2010; Valby BC |
| 2023/2024 | U13 (4) | U13 - 3300 4 spillere | 4 spillere | niveau ikke tolket | 12 | BC37 Amager; BK36 Kbh.; Dragør; Drive; Frederiksberg; Hvidovre; Islands Brygge; Rødovre; Valby BC; Vanløse |
| 2023/2024 | U13 (4) | U13 - 3800 4 spillere | 4 spillere | niveau ikke tolket | 7 | Charlottenlund; FKIF Frederiksberg; Frederiksberg; Islands Brygge; KMB2010; NBK Amager |
| 2023/2024 | U13 (4) | U13 - 4+3 | 4+3 | niveau ikke tolket | 10 | GBK/CBK; Hvidovre; KMB2010/Drive; Lyngby/KBK; Skovshoved; Solrød Strand; Team HJR Sjælland; Værløse |
| 2023/2024 | U13 (4) | U13 - 4800 (2+2) | 2+2 | niveau ikke tolket | 7 | KMB2010; Skovshoved; Værløse; Ølstykke |
| 2023/2024 | U13 (4) | U13 - 6000 (4 spillere) | 4 spillere | niveau ikke tolket | 4 | Badminton Roskilde; KBK Kbh.; Lyngby; Solrød Strand |
| 2023/2024 | U13 (4) | U13 Kredsmatch | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2023/2024 | U15 (5) | U13-U15 - 4000 (2+2) | 2+2 | niveau ikke tolket | 5 | BC37 Amager; Gentofte; Holbæk; Islands Brygge |
| 2023/2024 | U15 (5) | U15 - 3400 4 piger | 4 piger | niveau ikke tolket | 6 | BC37 Amager; FKIF Frederiksberg; Frederiksberg; Gentofte; Skovshoved; Valby BC |
| 2023/2024 | U15 (5) | U15 - 4+3 | 4+3 | niveau ikke tolket | 8 | FKIF Frederiksberg; Gentofte; KBK Kbh.; Solrød Strand; Team Midtsjælland; Værløse |
| 2023/2024 | U15 (5) | U15 - 4800 4 spillere | 4 spillere | niveau ikke tolket | 7 | Drive; Frederiksberg; Islands Brygge; KMB2010; Lyngby; Skovshoved; Vanløse |
| 2023/2024 | U15 (5) | U15 - 5600 (2+2) | 2+2 | niveau ikke tolket | 9 | Badminton Roskilde; BC37 Amager; Frem - Hellebæk; Gentofte; Jernløse; Ledøje-Smørum; Ølstykke |
| 2023/2024 | U15 (5) | U15 - 5600 (4 spillere) | 4 spillere | niveau ikke tolket | 16 | Birkerød BK13; Farum; FKIF Frederiksberg; Gørlev; Holte; Humlebæk; Hørsholm; Jernløse; Skovshoved; Team Slagelse/Skælskør; Vanløse; Værløse |
| 2023/2024 | U15 (5) | U15 - 6400 4 spillere | 4 spillere | niveau ikke tolket | 9 | BC37 Amager; FKIF Frederiksberg; Greve; Humlebæk; KBK Kbh.; KMB2010; Lyngby |
| 2023/2024 | U15 (5) | U15 - 8000 (4 spillere) | 4 spillere | niveau ikke tolket | 7 | Lillerød; Lyngby; Skovshoved; Solrød Strand; Sorø/Nykøbing F. |
| 2023/2024 | U15 (5) | U15 Kredsmatch | 4+3 | niveau ikke tolket | 4 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Sjælland |
| 2023/2024 | U17/U19 (18) | U15 - U17/U19 - 4800 (2+2) | 2+2 | niveau ikke tolket | 6 | Badminton Roskilde; Drive; Gentofte; Køge |
| 2023/2024 | U17/U19 (18) | U17/U19 - 4200 (4 spillere) | 4 spillere | niveau ikke tolket | 13 | Birkerød BK13; Helsingør; Kalundborg; Lejre; Ringsted; Rødovre; SAIF Kbh.; Skovshoved; Team Vejleå; Valby BC; Vanløse |
| 2023/2024 | U17/U19 (18) | U17/U19 - 5600 (2+2) | 2+2 | niveau ikke tolket | 6 | Gørlev; Herlev/Hjorten; Nivå-Kokkedal |
| 2023/2024 | U17/U19 (18) | U17/U19 - 5600 (4 spillere) | 4 spillere | niveau ikke tolket | 15 | Birkerød BK13; BK36 Kbh.; Borup; Charlottenlund; Frem - Hellebæk; Glostrup; Græsted; Helsinge; Holte; Hvidovre HB2000; Ledøje-Smørum; Storstrømmen-Kippinge; Vindinge |
| 2023/2024 | U17/U19 (18) | U17/U19 - 7800 (2+2) | 2+2 | niveau ikke tolket | 14 | BC37 Amager; FKIF Frederiksberg; Greve; Herlev/Hjorten; Hvidovre; KBK Kbh.; KMB2010; Nivå-Kokkedal; Skovshoved; Solrød Strand; Ølstykke |
| 2023/2024 | U17/U19 (18) | U17/U19 - 8000 (4 spillere) | 4 spillere; Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | niveau ikke tolket | 12 | Charlottenlund; Drive; Farum; Humlebæk; KBK Kbh.; KMB2010; Måløv/Smørum; Næstved-Herlufsholm; Solrød Strand; Værløse |
| 2023/2024 | U17/U19 (18) | U17/U19 - 9600 4 spillere | 4 spillere; Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | niveau ikke tolket | 7 | BC37 Amager; Birkerød BK13; Holbæk; Hvidovre/Gentofte; Lyngby |
| 2024/2025 | U09 (2) | U9 C-D 3200 (4 spillere). | 4 spillere | C-D | 3 | KMB2010; Lyngby; Skovshoved |
| 2024/2025 | U11 (3) | U11 (4+2) | 4+2 | niveau ikke tolket | 4 | Gentofte; Hvidovre; Lyngby; Solrød Strand |
| 2024/2025 | U11 (3) | U11 C-D 3400 (4 spillere). | 4 spillere | C-D | 8 | BC37 Amager; Dragør; Drive; Frederiksberg; Gentofte; Islands Brygge; KBK Kbh.; KMB2010 |
| 2024/2025 | U11 (3) | U11 Kredsmatch | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2024/2025 | U13 (4) | U13 (4+3) | 4+3 | niveau ikke tolket | 6 | CBK/GBK/KMB2010; Lyngby/KBK; Solrød Strand; Værløse |
| 2024/2025 | U13 (4) | U13 A, 6000 (4 spillere) | 4 spillere | A | 10 | Drive; FKIF Frederiksberg; Herlev/Hjorten; Holte; Hørsholm; KBK Kbh.; KMB2010; Solrød Strand |
| 2024/2025 | U13 (4) | U13 B, 4700 (2+2) | 2+2 | B | 6 | Badminton Roskilde; Hillerød; KBK Kbh.; Team Slagelse/Skælskør |
| 2024/2025 | U13 (4) | U13 C 3800 (4 piger). | 4 piger | C | 7 | Drive; FKIF Frederiksberg; Gentofte; KBK Kbh.; Nivå-Kokkedal; Solrød Strand |
| 2024/2025 | U13 (4) | U13 C-D, 3800 (4 spillere) | 4 spillere | C-D | 16 | Drive; Glostrup; Gørlev; Hvidovre; Hørsholm; Kirke Hyllinge; KMB2010; Lillerød; NBK Amager; Ringsted; Skibby; Taastrup BC; Vindinge; Virum |
| 2024/2025 | U13 (4) | U13 Kredsmatch | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2024/2025 | U13 (4) | UGE 38 - U13 C, 4000 (2+2) | 2+2 | C | 4 | BC37 Amager; Gentofte; Gørlev; Herlev/Hjorten |
| 2024/2025 | U15 (5) | U15 (4+3) | 4+3 | niveau ikke tolket | 7 | Gentofte; HBC/FKIF; KBK Kbh.; Solrød Strand |
| 2024/2025 | U15 (5) | U15 A 7200 (4 spillere). | 4 spillere | A | 7 | Drive; FKIF Frederiksberg; Gørlev; Humlebæk; KBK Kbh.; KMB2010; Lyngby |
| 2024/2025 | U15 (5) | U15 A, 6500 (2+2) | 2+2 | A | 8 | Badminton Roskilde/Ølstykke; BC37 Amager; Humlebæk; Jernløse; Skovshoved; Solrød Strand |
| 2024/2025 | U15 (5) | U15 B 6000 (4 spillere). | 4 spillere | B | 6 | Dragør; Hvidovre; Hvidovre HB2000; Islands Brygge; Lyngby; Valby BC |
| 2024/2025 | U15 (5) | U15 C, 4200 (4 piger) | 4 piger | C | 11 | Badminton Roskilde; Dragør; Farum; Frem - Hellebæk; Greve; Herlev/Hjorten; Jernløse; Rødovre; Valby BC |
| 2024/2025 | U15 (5) | U15 C-D 4200 (4 spillere). | 4 spillere | C-D | 9 | Drive; Gentofte; Hvidovre; Islands Brygge; KBK Kbh.; Lyngby; NBK Amager; Rødovre; Skovshoved |
| 2024/2025 | U15 (5) | U15 D, 3600 (4 piger) | 4 piger | D | 15 | Birkerød BK13; FKIF Frederiksberg; Frederiksberg; Gentofte; Glostrup; Greve; Herlev/Hjorten; Karlslunde; Skovshoved; Skælskør; Vallensbæk; Værløse |
| 2024/2025 | U15 (5) | U15 Kredsmatch | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2024/2025 | U15 (5) | U15 M, 7800 (2+2) | 2+2 | M | 9 | Badminton Roskilde/Ølstykke; BC37 Amager; KMB2010/Drive; Lillerød; Skovshoved; Team NHRS; Værløse |
| 2024/2025 | U15 (5) | UGE 38 - U15 A, 6500 (2+2 | 2+2 | A | 3 | BC37 Amager; Gentofte; Jernløse |
| 2024/2025 | U15 (5) | UGE 38 - U15 M, 7800 (2+2) | 2+2 | M | 3 | Gentofte; Hvidovre; KMB2010 |
| 2024/2025 | U17/U19 (18) | 8600 (4 spillere). | 4 spillere | niveau ikke tolket | 7 | Birkerød BK13; Drive; Farum; KBK Kbh.; Sorø/Nykøbing F.; Valby BC |
| 2024/2025 | U17/U19 (18) | A, 7800 (2+2) | 2+2 | niveau ikke tolket | 6 | FKIF Frederiksberg; Gentofte; Hvidovre; Lyngby; Skovshoved; Team Vejleå |
| 2024/2025 | U17/U19 (18) | D, 4800 (2+2) | 2+2 | niveau ikke tolket | 7 | Badminton Roskilde; Gentofte; Holbæk; Skovshoved; Solrød Strand |
| 2024/2025 | U17/U19 (18) | M, 15000 (4+2) | 4+2 | niveau ikke tolket | 10 | BC37 Amager; FKIF Frederiksberg; Herlev/Hjorten; KMB2010; Nivå-Kokkedal; Solrød Strand; Team Køge/Holbæk; Værløse |
| 2024/2025 | U17/U19 (18) | U17/U19 B, 7200 (4 spillere) | 4 spillere | B | 10 | BC37 Amager; FKIF Frederiksberg; Holbæk; Hørsholm; KBK Kbh.; Lillerød; NBK Amager; Slangerup |
| 2024/2025 | U17/U19 (18) | U17/U19 C, 6000 (4 spillere) | 4 spillere | C | 19 | Drive; Farum; Frederiksberg; Greve; Helsingør; Humlebæk; KMB2010; Ledøje-Smørum; Nivå-Kokkedal; Rudersdal; Skovshoved; Slagelse; Vanløse; Vindinge; Værløse; Ølstykke |
| 2024/2025 | U17/U19 (18) | U17/U19 C-D, 5000 (4 spillere) | 4 spillere | C-D | 19 | Brøndby BK; Græsted/Gilleleje; Helsinge; Helsingør; Islands Brygge; KBK Kbh.; Køge; Lyngby; NBK Amager; Nordbyens Badmintonklub; Ringsted; Slangerup; Team Vejleå; Værløse; Ønslev-Eskildstrup |
| 2024/2025 | U17/U19 (18) | U17/U19 M, 10000 (4 spillere) | 4 spillere | M | 3 | Holbæk; Hvidovre; Lyngby |
| 2024/2025 | U17/U19 (18) | UGE 38 - A, 7800 (2+2) | 2+2 | niveau ikke tolket | 3 | Gentofte; Herlev/Hjorten; Hvidovre |
| 2024/2025 | U17/U19 (18) | UGE 38 - C, 5600 (2+2) | 2+2 | niveau ikke tolket | 3 | Drive; Herlev/Hjorten; Lyngby |
| 2025/2026 | U11 (3) | U11 (4+2) | 4+2 | niveau ikke tolket | 4 | BC37/IBB; Gentofte; Hvidovre; Solrød Strand |
| 2025/2026 | U11 (3) | U11 B 5600 (4 spillere) BD | 4 spillere | B | 9 | Drive; Greve; Humlebæk; KBK Kbh.; KMB2010; Lillerød; Skovshoved |
| 2025/2026 | U11 (3) | U11 C, 5100 (4 spillere) | 4 spillere | C | 16 | BC37 Amager; Drive; Frederiksberg; Gentofte; Glostrup; Herlev/Hjorten; Holbæk; Holte; Jernløse; Køge; Lillerød; Slangerup; Virum |
| 2025/2026 | U11 (3) | U11 Kredsmatch | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2025/2026 | U13 (4) | U13 (4+3) | 4+3 | niveau ikke tolket | 5 | Gentofte; Køge/Badminton Roskilde; Solrød Strand |
| 2025/2026 | U13 (4) | U13 A 6400 (4 spillere) BD | 4 spillere | A | 8 | Herlev/Hjorten; Humlebæk; KBK Kbh.; KMB2010; Lyngby |
| 2025/2026 | U13 (4) | U13 B, 5800 (4 spillere) | 4 spillere | B | 12 | Badminton Roskilde; Frederiksberg; Frederikssund; Hillerød; Humlebæk; Hørsholm; Islands Brygge; Lillerød; Nakskov/Nykøbing F; Næstved-Herlufsholm |
| 2025/2026 | U13 (4) | U13 C, 4800 (4 piger) | 4 piger | C | 9 | Birkerød BK13; Farum; Frederiksberg; KMB2010; Nivå-Kokkedal; Værløse; Ølstykke |
| 2025/2026 | U13 (4) | U13 C-D 5000 (4 spillere) BD | 4 spillere | C-D | 7 | Drive; Frederiksberg; KMB2010; Lyngby; Valby BC; Vanløse |
| 2025/2026 | U13 (4) | U13 D, 4800 (2+2) | 2+2 | D | 9 | BC37 Amager; Drive; Gentofte; Herlev/Hjorten; Slagelse; Vallensbæk |
| 2025/2026 | U13 (4) | U13 Kredsmatch 2025 | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2025/2026 | U15 (5) | U15 (4+3) | 4+3 | niveau ikke tolket | 7 | HBC/Gentofte; KBK Kbh./Drive; LBK/KMB2010; Solrød Strand; Værløse |
| 2025/2026 | U15 (5) | U15 A, 7200 (4 spillere) | 4 spillere | A | 11 | Badminton Roskilde; Birkerød BK13; Drive; Herlev/Hjorten; Holte; Humlebæk; Hørsholm; Skovshoved; Solrød Strand |
| 2025/2026 | U15 (5) | U15 B, 6000 (2+2) | 2+2 | B | 12 | Badminton Roskilde; Gentofte; Herlev/Hjorten; Jernløse; KBK Kbh.; KMB2010; Måløv; Nakskov/Nykøbing F; Næstved-Herlufsholm; Ølstykke |
| 2025/2026 | U15 (5) | U15 C 5000 (4 piger) BD | 4 piger | C | 9 | FKIF Frederiksberg; Herlev/Hjorten; Hvidovre; Islands Brygge; KBK Kbh.; Køge; Vallensbæk |
| 2025/2026 | U15 (5) | U15 C, 5600 (4 spillere) | 4 spillere | C | 20 | Birkerød BK13; Charlottenlund; Frederikssund; Græsted; Gørlev; Herlev/Hjorten; Holte; Karlslunde; Køge; Lillerød; NBK Amager; Ringsted; Rudersdal; Taastrup BC; Virum; Værløse; Ølstykke |
| 2025/2026 | U15 (5) | U15 D, 5000 (2+2) | 2+2 | D | 8 | Drive; Gentofte; Skovlunde; Skælskør; Slagelse; Solrød Strand |
| 2025/2026 | U15 (5) | U15 Kredsmatch 2025 | 4+3 | niveau ikke tolket | 5 | BADFYN/BADSDRJ; Badminton København; Badminton Midtjylland; Badminton Nordjylland; Badminton Sjælland |
| 2025/2026 | U15 (5) | U15 M, 7800 (2+2) | 2+2 | M | 7 | BC37 Amager; Gentofte; Skovshoved; Solrød Strand; Værløse |
| 2025/2026 | U15 (5) | Uge 38 - U15 B, 6000 (2+2) | 2+2 | B | 7 | Badminton Roskilde; Hvidovre; Islands Brygge; Jernløse; KMB2010; Måløv |
| 2025/2026 | U15 (5) | Uge 38 - U15 M, 7800 (2+2) | 2+2 | M | 4 | Hvidovre; KMB2010; Skovshoved; Solrød Strand |
| 2025/2026 | U17/U19 (18) | A 8400 (4 spillere) BD | 4 spillere | niveau ikke tolket | 7 | Drive; Herlev/Hjorten - Valby; Holbæk; KBK Kbh.; KMB2010; Lyngby; Værløse |
| 2025/2026 | U17/U19 (18) | C 6400 (4 spillere) BD | 4 spillere | niveau ikke tolket | 8 | Charlottenlund; Drive; Hvidovre HB2000; KBK Kbh.; KMB2010; Lyngby; Skovshoved; Vanløse |
| 2025/2026 | U17/U19 (18) | U17/U19 A, 7800 (2+2) | 2+2 | A | 3 | Gentofte; Humlebæk; Skovshoved |
| 2025/2026 | U17/U19 (18) | U17/U19 B, 6800 (2+2) | 2+2 | B | 9 | BC37 Amager; Birkerød BK13; Gørlev; Hvidovre; Køge; Team Bornholm |
| 2025/2026 | U17/U19 (18) | U17/U19 B, 7200 (4 spillere) | 4 spillere | B | 9 | Frem - Hellebæk; Humlebæk; Hørsholm; Lyngby; NBK Amager; Slangerup; Værløse |
| 2025/2026 | U17/U19 (18) | U17/U19 C, 5800 (2+2) | 2+2 | C | 9 | Badminton Roskilde; BC37 Amager; Gentofte; Greve; Holbæk; Lundtofte; Team Bornholm |
| 2025/2026 | U17/U19 (18) | U17/U19 D, 5000 (2+2) | 2+2 | D | 6 | Gentofte; Greve; SAIF Kbh.; Team Sydkysten |
| 2025/2026 | U17/U19 (18) | U17/U19 M, 10000 (4 spillere) | 4 spillere | M | 7 | Farum; Gentofte; Herlev/Hjorten - Birkerød; Værløse |
| 2025/2026 | U17/U19 (18) | U17/U19 M, 15000 (4+2) | 4+2 | M | 9 | BC37 Amager; Greve/Skælskør/Ølstykke; Hvidovre; KMB2010; Lillerød; Skovshoved; Solrød Strand |
| 2025/2026 | U17/U19 (18) | Uge 38 - U17/U19 A, 7800 (2+2) | 2+2 | A | 3 | Herlev/Hjorten; Hvidovre; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U09 (2) | U09 C-D 3400 (3 spillere) BD | Uplaceret: 3 spillere (ingen brugbar kategorisignatur) | C-D | 6 | BC37 Amager; Birkerød BK13; Drive; Gentofte; Holbæk; KBK Kbh. |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 (4+2) - maks. 8500 p. holdfællesskab | Uplaceret: 4+2 (ingen brugbar kategorisignatur) | niveau ikke tolket | 3 | BC37 Amager; KBK Kbh.; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 C, 5000 (4 spillere) BD | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | C | 6 | Drive; Frederiksberg; Hvidovre; KMB2010; Lyngby; NBK Amager |
| 2026/2027 (i gang, ufuldstændig) | U11 (3) | U11 D, 4400 (4 spillere) BD | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | D | 10 | Charlottenlund; Drive; Frederiksberg; Gentofte; Hvidovre; KBK Kbh.; KMB2010; Lyngby; Valby BC |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 (4+3) - maks. 11500 p. holdfællesskab | Uplaceret: 4+3 (ingen brugbar kategorisignatur) | niveau ikke tolket | 4 | Gentofte; GSB/LBK; Hvidovre; Solrød Strand |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 A, 5800 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | A | 5 | BC37 Amager; Hørsholm; KBK Kbh.; Lyngby; Værløse |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 A, 6400 (4 spillere) BD | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | A | 12 | Badminton Roskilde; Drive; Frederiksberg; Gentofte; Herlev/Hjorten; Humlebæk; Islands Brygge; KBK Kbh.; KMB2010; Lillerød; Lyngby; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 C, 4800 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | C | 4 | BC37 Amager; Drive; Herlev/Hjorten; Næstved-Herlufsholm |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 C, 4800 (4 piger) BD | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | C | 5 | Badminton Roskilde; Birkerød BK13; Charlottenlund; Dragør; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 C, 5100 (4 spillere) BD | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | C | 9 | Dragør; Drive; Frederiksberg; Gentofte; Islands Brygge; Lyngby; Skovshoved; Vanløse |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | U13 D, 4600 (4 spillere) BD | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | D | 8 | BC37 Amager; Frederiksberg; Gentofte; Hvidovre HB2000; Islands Brygge; Lyngby; Skovshoved; Vanløse |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | UGE 38 - U13 A, 5800 (2+2) | 2+2 | A | 4 | Drive; Herlev/Hjorten; KMB2010; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 (4+3) - maks. 14000 p. holdfællesskab | Uplaceret: 4+3 (ingen brugbar kategorisignatur) | niveau ikke tolket | 4 | Gentofte; LBK/SBK/SLBK; Solrød Strand; Værløse |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 A, 6800 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | A | 6 | Badminton Roskilde; Drive; KBK Kbh.; Slangerup/Holte; Tune |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 B, 5400 (4 piger) BD | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | B | 4 | FKIF Frederiksberg; KBK Kbh.; KMB2010; Værløse |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 B, 5800 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | B | 5 | Badminton Bornholm; BC37 Amager; Drive; Greve; Islands Brygge |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 C, 5200 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | C | 3 | Drive; Skovshoved; Slagelse/Sorø/Skælskør |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 C, 5500 (4 spillere) | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | C | 15 | Frederikssund; Glostrup; Holte; Humlebæk; Islands Brygge; Lillerød; Måløv; Næstved-Herlufsholm/Sorø; Ringsted; Skovlunde; Slagelse; Slangerup/Skibby; Valby BC; Værløse; Ølstykke |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 D, 4500 (4 piger) | Uplaceret: 4 piger (ingen brugbar kategorisignatur) | D | 10 | Badminton Roskilde; Birkerød BK13; Brøndby BK; Charlottenlund; Gentofte; Hillerød; Lundtofte; Nivå-Kokkedal; Slangerup; Vallensbæk |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 D, 4800 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | D | 5 | BC37 Amager; Greve; Holbæk; Hvidovre; Solrød Strand |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | U15 M, 7800 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | M | 3 | Humlebæk; Roskilde/Valby; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 C, 5200 (2+2) | 2+2 | C | 4 | Dragør; Herlev/Hjorten; KBK Kbh.; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | UGE 38 - U15 M, 7800 (2+2) | 2+2 | M | 3 | Gentofte; LBK/SBK/SLBK; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U15 (5) | Uge 38 - U15 D, 4800 (2+2) | 2+2 | D | 4 | Holbæk; Hvidovre; Lundtofte; Rudersdal |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 A, 8200 (4 spillere) | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | A | 8 | Badminton Roskilde; Birkerød BK13; Herlev/Hjorten; KBK Kbh.; KMB2010; Skovshoved; Slangerup; Solrød Strand |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 B, 7200 (4 spillere) | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | B | 10 | Farum; Holbæk; Jernløse; KMB2010; Køge; Næstved-Herlufsholm; Tune; Vanløse; Værløse; Ølstykke |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 C, 5800 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | C | 6 | Gentofte; Greve; Holbæk; Hvidovre HB2000; Team Sydkysten; Valby BC |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 C, 6200 (4 spillere) BD | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | C | 5 | Charlottenlund; Drive; Islands Brygge; NBK Amager; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 D, 5000 (2+2) | Uplaceret: 2+2 (ingen brugbar kategorisignatur) | D | 6 | Drive; Frederiksberg; Greve; KBK Kbh.; SAIF Kbh.; Team Sydkysten |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 D, 5100 (4 spillere) | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | D | 18 | Ballerup BC58; Dragør; Glostrup; Græsted/Gilleleje; Helsinge; Helsingør; Holbæk; Islands Brygge; Nykøbing Sj.; Ringsted; Rudersdal; Skibby; Skovlunde; Stubbekøbing; Team Slagelse/Skælskør; Team Vejleå; Vallensbæk; Ølstykke |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 M, 14000 (4+2) | Uplaceret: 4+2 (ingen brugbar kategorisignatur) | M | 11 | BC37 Amager; Gentofte; Gørlev; Humlebæk; KBK Kbh.; KMB2010; Lillerød/Hørsholm; Skovshoved; Solrød Strand |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | U17/U19 M, 9600 (4 spillere) | Uplaceret: 4 spillere (ingen brugbar kategorisignatur) | M | 4 | Drive; Holbæk; Solrød Strand; Værløse |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 A, 7800 (2+2) | 2+2 | A | 4 | Herlev/Hjorten; Jernløse; KMB2010; Skovshoved |
| 2026/2027 (i gang, ufuldstændig) | U17/U19 (18) | UGE 38 - U17/U19 C, 5800 (2+2) | 2+2; Uplaceret: 2+2 (ingen brugbar kategorisignatur) | C | 10 | Drive; Greve; Herlev/Hjorten; Holbæk; Jernløse; KBK Kbh.; SAIF Kbh.; Slangerup/Skibby |

### Samlet over tid pr. aldersgruppe (sæsonoptællinger summeret)

| Aldersgruppe | Sæsoner | Rækker/ligaer | Fysiske puljer |
| --- | --- | --- | --- |
| U09 (ID 2) | 6 | 9 af 13 (69,2%) | 14 af 22 (63,6%) |
| U11 (ID 3) | 15 | 31 af 94 (33%) | 39 af 136 (28,7%) |
| U13 (ID 4) | 15 | 35 af 118 (29,7%) | 41 af 163 (25,2%) |
| U15 (ID 5) | 15 | 44 af 129 (34,1%) | 46 af 177 (26%) |
| U17 (ID 6) | 6 | 4 af 21 (19%) | 4 af 21 (19%) |
| U17/U19 (ID 18) | 7 | 9 af 48 (18,8%) | 9 af 84 (10,7%) |

## Optælling

- GSB-hold-puljeposter fundet: **279** = placerede **133** + ikke placerede **53** + udgåede/trukne **12** + DMU-poster **62** + UGE 38-poster **19**.
- Udgået: **9**; trukket: **3**.
- Samarbejdshold rapporteret separat, ikke GSB: **1**.

## Fem stikprøver — puljeliste, placering og bredde

| Sæson | Alder | GSB-puljer | Bedste GSB-format/niveau | Højeste nationalt | Rækker GSB/total | Puljer GSB/total | 125-katalog formatkontrol | Pulje-/formatkontrol |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2011/2012 | U11 (3) | 4 | — | 4+3 (fastlagt af Christoffer) | 2/5 | 2/5 | 0/0 125-format match; 4 fallback/other | 2011\|3\|100: Gladsaxe Søborg 4 *udgået* → Uplaceret: X2 (ingen brugbar kategorisignatur) (udgået)<br>2011\|3\|97: Gladsaxe Søborg → Uplaceret: ingen formattekst (ingen brugbar kategorisignatur)<br>2011\|3\|98: Gladsaxe Søborg 2 → Uplaceret: ingen formattekst (ingen brugbar kategorisignatur)<br>2011\|3\|99: Gladsaxe Søborg 3 *udgået* → Uplaceret: X1 (ingen brugbar kategorisignatur) (udgået) |
| 2016/2017 | U11 (3) | 2 | 4 spillere D  | 4+3 (fastlagt af Christoffer) | 2/8 | 2/9 | 2/2 125-format match; 0 fallback/other | 2016\|3\|7668: Gladsaxe Søborg → 4 spillere<br>2016\|3\|9137: Gladsaxe Søborg → 4 spillere |
| 2020/2021 | U15 (5) | 3 | 4 spillere   | 4+3 (fastlagt af Christoffer) | 3/12 | 3/13 | 2/2 125-format match; 1 fallback/other | 2020\|5\|13470: Gladsaxe Søborg 1 → 4 spillere<br>2020\|5\|13473: Gladsaxe Søborg 2 → 4 spillere<br>2020\|5\|13474: Gladsaxe Søborg 3 → 4 piger |
| 2025/2026 | U11 (3) | 5 | 4 spillere C-D 4800 | 4+3 (fastlagt af Christoffer) | 3/6 | 4/13 | 5/5 125-format match; 0 fallback/other | 2025\|3\|18133: Gladsaxe Søborg 5 → 4 piger<br>2025\|3\|18134: Gladsaxe Søborg 1 → 4 spillere<br>2025\|3\|18134: Gladsaxe Søborg 2 → 4 spillere<br>2025\|3\|18135: Gladsaxe Søborg 3 → 4 spillere<br>2025\|3\|18138: Gladsaxe Søborg 4 → 4 spillere |
| 2026/2027 (i gang, ufuldstændig) | U13 (4) | 10 | — | — | 5/12 | 5/13 | 0/0 125-format match; 10 fallback/other | 2026\|4\|18976: Gladsaxe Søborg 1 → Uplaceret: 2+2 (ingen brugbar kategorisignatur)<br>2026\|4\|19140: Gladsaxe Søborg 2 → Uplaceret: 4 spillere (ingen brugbar kategorisignatur)<br>2026\|4\|19142: Gladsaxe Søborg 3 → Uplaceret: 4 spillere (ingen brugbar kategorisignatur)<br>2026\|4\|19144: Gladsaxe Søborg 4 → Uplaceret: 4 spillere (ingen brugbar kategorisignatur)<br>2026\|4\|19144: Gladsaxe Søborg 5 → Uplaceret: 4 spillere (ingen brugbar kategorisignatur)<br>2026\|4\|19146: Gladsaxe Søborg 6 → Uplaceret: 4 piger (ingen brugbar kategorisignatur)<br>2026\|4\|18977: Gladsaxe Søborg 5 → 2+2<br>2026\|4\|19007: Gladsaxe Søborg 4 → 2+2<br>2026\|4\|19008: Gladsaxe Søborg 3 → 2+2<br>2026\|4\|19009: Gladsaxe Søborg 3 → 2+2 |

Stikprøverne blev sammenholdt med de rå `league_groups`, `league_group_regions`, `league_group_teams`-rækker og 126's fysiske puljeformatkilder. Hver liste viser pool-nøgle, holdnavn, række/pulje og format; 125-formatet blev også sammenholdt direkte for alle sample-puljer der findes i 125-kataloget. Bredde kontrolleres på division- og puljenøgler.

### Særskilt kontrol: U13 2024/25

Format-/niveauprøven forventes: 2+2 A 5600 > 4 spillere B 5000 > C 4200 > D 3600 > 4 piger D 3200. Bedste GSB-format er 2+2 A 5600: true. Formatkontrolrækkefølgen 4+3 > 2+2 > 4 spillere > 4 piger: true. Bredde uden UGE 38 og Kredsmatch: 5 af 10; med UGE 38 uden Kredsmatch: 6 af 12; med begge: 6 af 13. Kontrol 5/10 bestod: true. Alle fem format-/niveauprøver bestod: true. DMU: 5 poster for GSB 1, 2 og 3: true.

Samlet U13-puljepostafstemning: 14 = 8 almindelige region-8-poster + 1 UGE 38-poster + 5 DMU-poster; 9 unikke rå holdnavne i alt. DMU omfatter 3 hold, og 3 spiller også i almindelig region-8-række. DMU-kontrollen er 5 poster for GSB 1, 2 og 3.

## UGE 38 — særskilt ekstraordinær turnering

Christoffers afgørelse, baseret på DGI's “Uge 38 invitation 2026-2027”: UGE 38 er en separat, ekstraordinær 2+2-turnering for U13-U19 med én plads til DMU Hold til vinderen af hver række. Det er ikke en almindelig Badminton København-række. UGE 38 udelades derfor fra formatplacering og bredde; egne rækker vises her. Første sæson i data er **2024/2025**; samtlige sæsoner: 2024/2025, 2025/2026, 2026/2027.

| Sæson | Alder | Format | Rækkenavn | Niveau | Antal hold | GSB-hold | GSB også i normal række? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2024/2025 | U13 (4) | 2+2 | UGE 38 - U13 C, 4000 (2+2) | C | 4 | — | — |
| 2024/2025 | U13 (4) | 2+2 | UGE 38 - U13 D, 3600 (2+2) | D | 3 | Gladsaxe Søborg 9 | Gladsaxe Søborg 9: nej |
| 2024/2025 | U15 (5) | 2+2 | UGE 38 - U15 A, 6500 (2+2 | A | 3 | — | — |
| 2024/2025 | U15 (5) | 2+2 | UGE 38 - U15 C, 4600 (2+2) | C | 4 | Gladsaxe Søborg 6 | Gladsaxe Søborg 6: nej |
| 2024/2025 | U15 (5) | 2+2 | UGE 38 - U15 D, 4000 (2+2) | D | 4 | Gladsaxe Søborg 7 | Gladsaxe Søborg 7: nej |
| 2024/2025 | U15 (5) | 2+2 | UGE 38 - U15 M, 7800 (2+2) | M | 3 | — | — |
| 2024/2025 | U17/U19 (18) | 2+2 | UGE 38 - A, 7800 (2+2) | niveau ikke tolket | 3 | — | — |
| 2024/2025 | U17/U19 (18) | 2+2 | UGE 38 - C, 5600 (2+2) | niveau ikke tolket | 3 | — | — |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 A, 6000 (2+2) | A | 4 | Gladsaxe Søborg 7 | Gladsaxe Søborg 7: ja |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 B, 5400 (2+2) | B | 6 | Gladsaxe Søborg 8 | Gladsaxe Søborg 8: ja |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 C, 5000 (2+2) | C | 3 | Gladsaxe Søborg 9 | Gladsaxe Søborg 9: nej |
| 2025/2026 | U13 (4) | 2+2 | Uge 38 - U13 D, 4800 (2+2) | D | 4 | Gladsaxe Søborg 10 | Gladsaxe Søborg 10: nej |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 A, 6800 (2+2) | A | 6 | Gladsaxe Søborg 6 | Gladsaxe Søborg 6: ja |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 B, 6000 (2+2) | B | 7 | — | — |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 C, 5400 (2+2) | C | 6 | Gladsaxe Søborg 8 | Gladsaxe Søborg 8: nej |
| 2025/2026 | U15 (5) | 2+2 | Uge 38 - U15 M, 7800 (2+2) | M | 4 | — | — |
| 2025/2026 | U17/U19 (18) | 2+2 | Uge 38 - U17/U19 A, 7800 (2+2) | A | 3 | — | — |
| 2025/2026 | U17/U19 (18) | 2+2 | Uge 38 - U17/U19 D, 5000 (2+2) | D | 3 | Gladsaxe Søborg 3 | Gladsaxe Søborg 3: nej |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 A, 5800 (2+2) | A | 4 | — | — |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 B, 5200 (2+2) | B | 9 | Gladsaxe Søborg 3; Gladsaxe Søborg 4 | Gladsaxe Søborg 3: ja; Gladsaxe Søborg 4: ja |
| 2026/2027 | U13 (4) | 2+2 | UGE 38 - U13 D, 4600 (2+2) | D | 4 | Gladsaxe Søborg 5 | Gladsaxe Søborg 5: ja |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 A, 6800 (2+2) | A | 9 | Gladsaxe Søborg 1 | Gladsaxe Søborg 1: ja |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 B, 5800 (2+2) | B | 4 | Gladsaxe Søborg 2 | Gladsaxe Søborg 2: ja |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 C, 5200 (2+2) | C | 4 | — | — |
| 2026/2027 | U15 (5) | 2+2 | UGE 38 - U15 M, 7800 (2+2) | M | 3 | — | — |
| 2026/2027 | U15 (5) | 2+2 | Uge 38 - U15 D, 4800 (2+2) | D | 4 | — | — |
| 2026/2027 | U17/U19 (18) | 2+2 | UGE 38 - U17/U19 A, 7800 (2+2) | A | 4 | — | — |
| 2026/2027 | U17/U19 (18) | Uplaceret: 2+2 (ingen brugbar kategorisignatur); 2+2 | UGE 38 - U17/U19 B, 6800 (2+2) | B | 8 | Gladsaxe Søborg; Gladsaxe Søborg 2 | Gladsaxe Søborg: nej; Gladsaxe Søborg 2: ja |
| 2026/2027 | U17/U19 (18) | Uplaceret: 2+2 (ingen brugbar kategorisignatur); 2+2 | UGE 38 - U17/U19 C, 5800 (2+2) | C | 10 | — | — |
| 2026/2027 | U17/U19 (18) | 2+2 | UGE 38 - U17/U19 D, 5000 (2+2) | D | 4 | Gladsaxe Søborg 3 | Gladsaxe Søborg 3: ja |

Samtidige “4 piger C” og “4 spillere D”-rækker forekommer i 12 sæson/aldersgruppe-kombinationer. Hvor de forekommer, anvendes formatrækkefølgen; bogstaver sammenlignes ikke på tværs af formater. Se JSON-feltet `format_level_crossings`.

## Spørgsmål

- “4-8 spillere” er ikke slået sammen med “4 spillere”. De 131 4-8-puljer har alle signaturen `1. D · 1. S · 2. D · 2. S · 3. S · 4. S`; den samme signatur forekommer i 3.530 af 3.538 4-spillere-puljer. Det viser fælles kampkategorisammensætning i data, men beviser ikke at formatnavnene er synonymer. Signaturtallene og alle rå puljer er i JSON.

## Databaseværn

- gsb-statistik-normalized.db SHA-256: `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e` → `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e`
  Rækketal før/efter: `{"clubs":1,"competitions":462,"extraction_errors":1444,"individual_match_players":67196,"individual_matches":20319,"players":7599,"raw_payloads":2874,"seasons":26,"standings":751,"team_matches":2818,"teams":472}` / `{"clubs":1,"competitions":462,"extraction_errors":1444,"individual_match_players":67196,"individual_matches":20319,"players":7599,"raw_payloads":2874,"seasons":26,"standings":751,"team_matches":2818,"teams":472}`
- liga-landskab.db SHA-256: `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c` → `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c`
  Rækketal før/efter: `{"age_groups":29,"club_registry":796,"fetch_errors":0,"group_type_katalog":8928,"league_group_details":18546,"league_group_match_counts":18546,"league_group_regions":59127,"league_group_teams":96823,"league_groups":18546,"league_match_groups":310137,"league_match_requests":221558,"league_matches":203012,"match_categories":1300474,"match_games":2636258,"regions":33,"standing_indexes":16269}` / `{"age_groups":29,"club_registry":796,"fetch_errors":0,"group_type_katalog":8928,"league_group_details":18546,"league_group_match_counts":18546,"league_group_regions":59127,"league_group_teams":96823,"league_groups":18546,"league_match_groups":310137,"league_match_requests":221558,"league_matches":203012,"match_categories":1300474,"match_games":2636258,"regions":33,"standing_indexes":16269}`

Alle SHA-256 og tabelrækketal er ens før/efter; databaser åbnet `readOnly: true`.
