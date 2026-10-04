# Mangler og dækningsstatus — opgave 130

Hentedato for registrerede PDF'er: 2026-10-04. Efter runde 2 indeholder registeret 34 PDF'er, samlet 12.032.569 bytes (ca. 11,5 MiB). Det er egentlige reglementer, tillæg og tydeligt mærkede invitationer/vejledninger. Det er **ikke** en komplet samling af alle offentligt tilgængelige regelsæt 2010-nu.

## Dækning pr. sæson i data

`liga-landskab.db` har sæson-id 2010-2026 (17 sæsoner: 2010/11-2026/27) og 24 navngivne regions-/landsdelsforbindelser med gruppeposter. De 24 er ikke ensbetydende med 24 selvstændige regeludgivere; nogle deler fælles BD/DGI-reglement. “Fælles ungdom” betyder at en national fælleskilde blev fundet, ikke at lokalt udbud eller alle lokale tillæg blev fundet.

| Sæson | Fælles ungdomskilde arkiveret | Senior/veteran/regionale holdregler arkiveret | Status |
|---|---|---|---|
| 2010/11 | Nej | Nej; kun SBKr-årsmødemateriale fra 2010/11, ikke et reglement | Mangler begge regeltyper |
| 2011/12 | Nej | Nej | Mangler |
| 2012/13 | Nej | Historisk SBKr-reglement fundet, men PDF'en angiver ingen sæson; Sjælland veteran-PDF har titel 2013/14 og brødtekst 2012/13 | Delvis; sæson ikke sikkert fastlagt |
| 2013/14 | Nej | Sjælland veteran-PDF har titel 2013/14, men brødtekst omtaler 2012/13; ikke fuldt regionalt reglement | Delvis; kildens sæson er modstridende |
| 2014/15 | Nej | Ingen bekræftet sæsonkilde i dette arkivudtræk | Mangler |
| 2015/16 | Nej | Ingen bekræftet København-reglement for sæsonen; arkivfil tidligere fundet via 2015-rute viser 2018/19 på PDF-forsiden | Mangler |
| 2016/17 | Nej | Nej | Mangler |
| 2017/18 | Nej | Nej | Mangler |
| 2018/19 | Ja, nationalt BD/DGI-reglement | Badminton København, turneringsreglement version 2018-1; ungdomsinvitation for Nordjylland/DGI Nordjylland | Delvis nationalt og regionalt |
| 2019/20 | Ja, nationalt BD/DGI fællesreglement | DH/DMU-kilder linkes fra historisk BD-side, men direkte fil-links omdirigerer til `UnknownFile.png` | Delvis |
| 2020/21 | Nej | Ingen arkiveret i dette arbejde | Mangler |
| 2021/22 | Nej | En Vest-reglementsfil mærket 2021 er arkiveret, men dokumentet angiver ikke entydigt, hvilken sæson det gælder | Delvis regionalt; sæsonuklar |
| 2022/23 | Ja, nationalt BD/DGI-reglement | Sjælland veteranreglement med dokumentdato 1. september 2022, men sæson ikke angivet | Delvis nationalt/regionalt |
| 2023/24 | Ja, nationalt BD/DGI fællesreglement + DMU-tillæg | Nej | Delvis nationalt ungdom |
| 2024/25 | Ja, nationalt BD/DGI fællesreglement; både første udgave og martsrevision | Badminton København lokalt reglement | Delvis nationalt og regionalt |
| 2025/26 | Ja, nationalt fællesreglement; original + 8. oktober revision | Nordjysk og vestligt senior/veteran; nationalt DH-årsreglement mangler | Delvis |
| 2026/27 | Ja, nationalt fællesreglement + DMU-tillæg; DGI/BSJ invitation og holdlederfolder; særskilt UGE 38-bilag | DH-reglement + bilag 3 + holdfællesskabstillæg; København lokalt; Nordjylland senior/veteran; Sjælland veteraninvitation | Delvis; flere regioner mangler |

Sæsonår uden fundet kilde må ikke få regler arvet fra nabosæsonen. Tabellen er en status på denne indsamling, ikke bevis på at kilderne ikke eksisterer andre steder.

## Registerbestand efter type og udgiver/område

De 34 hentede PDF'er fordeler sig sådan efter registerets type (en fil kan være vejledning/invitation, ikke et reglement):

| Type | Antal PDF'er |
|---|---:|
| ungdom | 9 |
| ungdom-DMU | 2 |
| ungdom-invitation | 3 |
| ungdom/senior/veteran | 4 |
| ungdom-UGE 38 | 1 |
| ungdom-vejledning | 1 |
| ungdom-veteran | 1 |
| senior | 3 |
| senior-tillæg | 2 |
| senior/veteran | 3 |
| veteran | 3 |
| veteran-invitation | 1 |
| kontekst-veteran (årsmødemateriale, ikke reglement) | 1 |
| **I alt** | **34** |

Område-/udgiveroptælling (PDF'er, ikke unikke regioner; fælleskilder tæller under deres fulde registerlabel): Badminton Danmark 5; fælles Badminton Danmark + DGI Badminton 9; Badminton København 4; Badminton Nordjylland 1; Badminton Nordjylland + DGI Nordjylland 3; Badminton Sjælland (tidl. SBKr.) 4; Badminton Sjælland + tre DGI-landsdele 1; Lolland-Falsters Badminton Kreds 1; vestlige kreds-/landsdelssamarbejder 2; særskilte DGI/BSJ-kilder 4. Summen er 34. Sæson-/dokumentdatoerne og type/region pr. enkeltfil fremgår af `register.json`.

## Områder uden lokal dækning

Databasen indeholder poster knyttet til Badminton Danmark, Bornholm, Midtjylland, Nordjylland, Sønderjylland, Fyn, København, Lolland-Falster og Sjælland samt DGI Bornholm, Fyn, Midtjylland, Nordjylland, Nordsjælland, Nordvest, SdU, Storkøbenhavn, Storstrømmen, Sydvest, Sydøstjylland, Sønderjylland, Vestjylland, Midt- og Vestsjælland og Østjylland (24 region-labels inkl. Badminton Danmark; historiske navne/forbindelser kan overlappe). Lokale regelkilder er kun hentet for København (2018/19, 2025/26, 2026/27), dele af Sjælland (historisk dokumentation og veteraninvitationer 2026/27), Vest (Kredsserie Vest 2021) og Nordjylland (2025/26-2026/27 SH-reglement). For alle øvrige områder mangler komplet sæsonhistorik for ungdomsindbydelser, senior- og veteranregler.

## Kunne ikke hentes — Christoffer prøver manuelt

Dette er de præcise fundne adresser, hvor der ikke kom et brugbart reglement ud. HTTP 200 alene tæller ikke som hentet fil, hvis svaret er et fejlbillede.

| URL | Titel | Sæson/område/type | Resultat |
|---|---|---|---|
| https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=81920 | DH-reglement (link fra Badminton Danmarks arkivside) | 2019/20; national senior | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=78820 | DMU Hold-tillæg (link fra Badminton Danmarks arkivside) | 2019/20; national ungdom/DMU | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=81955 | Fælles reglement for ungdomsholdturneringen, opdateret 9. juli 2019 | 2019/20; national ungdom | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF. Et separat 2019/20 ungdoms-PDF kunne hentes fra badminton.dk og er arkiveret; dette døde arkivlink er ikke en manglende regelversion. |
| https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=75911 | Reglement for senior-/veteranholdturnering, Badminton Fyn | Dokument omtalt som revideret 1. august 2018; sæson ikke angivet; Fyn, senior/veteran | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://badminton.dk/wp-content/uploads/2025/03/2025-03-03-Holdturneringsreglement-for-badminton-i-Danmark.pdf | Holdturneringsreglement for badminton i Danmark (DH-reglementet), 3. marts 2025 | Dokumentdato 2025-03-03; Badminton Danmark, senior; gældende sæson ikke fastslået | Badminton Danmarks medieindeks viser PDF-tekst, men direkte anonym HTTP GET gav 404; ikke arkiveret |
| https://badmintonpeople.dk/cms/?cmsid=877&pageid=29571 | Turneringsreglement for Badminton Nordjyllands holdturnering senior (serie 2-4, 4 spillere single, 4 spillere double) | Sæson ikke oplyst; Nordjylland, senior | Den offentlige kildeside viser et link, men filens måladresse blev ikke eksponeret af browserens linkværktøj. Der foreligger derfor ingen afprøvet fil-URL/statuskode; ingen URL er gættet. |

De tre 2026/27 SharePoint-delingslinks gav hver HTTP 401 anonymt. Filerne er siden leveret manuelt af Christoffer og læst; de står derfor ikke som uløste indhold. Originale adresser/proveniens:

- https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQCHx6MbzkXGQoAuqVGR02xhARaSrJly-hwJwpuBTlGWNUg?e=oollgp
- https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQACSb4rI9bvSJBg9S8GwGbQAdNzXkkPsYg8diCGHOyFQWE?e=yUtfwx
- https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQAhfYAuXdgJQadOumEAiZdMAdh0vEEfFoGDBW9W9mZy7HY?e=NxuTZh

De tre URL’er er listet som en gruppe; én-til-én-koblingen mellem hvert SharePoint-token og filnavn er ikke fastslået.

## Øvrige mangler og afgrænsninger

1. **Nationale ungdomsregler:** der er nu filer for 2018/19, 2019/20, 2022/23, 2023/24, 2024/25, begge fundne 2025/26-versioner og 2026/27. Der mangler 2010/11-2017/18, 2020/21 og 2021/22; det er ikke fastslået om årlige fællesreglementer fandtes i alle disse sæsoner.
2. **Nationale seniorregler:** DH-reglement for 2026/27 er arkiveret. Medieindekset viser desuden en DH-PDF dateret 3. marts 2025, men præcis URL returnerede HTTP 404 ved direkte GET; den er listet ovenfor, ikke registerført som hentet. En gennemgående sæsonserie 2010/11-2025/26 mangler.
3. **Regioner og landsdele:** dækningen er punktvis. København er repræsenteret 2018/19, 2024/25, 2025/26 og 2026/27; Nordjylland 2018/19-invitation, 2025/26-2026/27 senior/veteran samt historisk veteranreglement uden sæson; Sjælland har historiske kilder, veteran-dokument dateret 2022 uden sæson og en 2026/27 invitation; vestlige samarbejdsområder har 2021 senior og 2025/26 senior/veteran. De øvrige databaseområder mangler stadig sæson-for-sæson-regler.
4. **Veteran:** der mangler især komplette sæsonreglementer 2010-2024 og regionale forskelle øst/vest. Dokumentdato eller invitation er ikke behandlet som bevis for anvendelse i en hel sæson.
5. **DGI lokale ungdomsindbydelser:** mangler fortsat for de fleste landsdele/sæsoner. Fælles nationalt reglement fastslår ikke, hvilke lokale rækker der faktisk blev udbudt.
6. **Historiske kredsnavne:** DBF/Badminton Danmark, SBKr., LFBKr., de vestlige kredse og senere regioner er ikke komplet kortlagt år for år.
7. **Wayback:** direkte anonym GET gav HTTP 200 for 2019/20-ungdoms-PDF (capture 2020-01-15; samme størrelse og SHA-256 som den direkte arkiverede fil) og HTTP 200 for snapshotsider af BD-regler (capture 2024-06-23) og København-holdturnering (capture 2024-06-17). En uploads-katalogadresse gav HTTP 404. CDX-listningen gav HTTP 200 med ét snapshot i én kørsel, men en genkørsel timed out; den er ikke en komplet arkivsøgning.

## Søgemetode og afgrænsning

- Gennemgået Badminton Danmarks aktuelle holdturneringsside og åbent WordPress-mediearkiv via 13 søgeord: `reglement`, `holdturnering`, `ungdomshold`, `veteran`, `serie`, `kredsserie`, `DH-reglement`, `senior`, `indbydelse`, `tillæg`, `ungdomsholdturnering`, `holdturneringsreglement`, `veteranholdturnering`. Svarantal og kandidater ligger i `statistik/results/130-source-discovery.json`.
- Søgt på BadmintonPeople's historiske BD- og regionale holdturneringssider samt konkrete BadmintonPeople-fil-id'er; døde/ukendte downloads er beskrevet ovenfor.
- Gennemgået offentlige sider for Badminton København, Badminton Sjælland og Badminton i Nordjylland. Fundede links blev hentet langsomt (700 ms mellem downloadkald) og hashkontrolleret.
- Afprøvet Wayback både via CDX og direkte arkiv-URL'er uden login. De direkte HTTP-resultater og capture-tidspunkter står i `statistik/results/130-source-discovery.json`.
- Ingen login, captcha-omgåelse, personoplysningsscraping eller databaseændringer.

Fortsættelse kræver flere præcise historiske/regionalt offentliggjorte kildelinks eller lokale kopier for hullerne ovenfor. De tre DGI/BSJ-bilag er allerede manuelt leveret og registreret.
