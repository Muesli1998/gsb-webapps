# Mangler og dækningsstatus — opgave 130

Hentedato for registrerede PDF'er: 2026-10-04. Registeret indeholder 24 filer, samlet 8.140.592 bytes (ca. 7,8 MiB). Det omfatter egentlige reglementer, tillæg og enkelte tydeligt mærkede invitations-/kontekstdokumenter. Det er **ikke** en komplet samling af alle offentligt tilgængelige regelsæt 2010-nu; det er kun de filer, hvis URL og indhold kunne verificeres og hentes i dette arbejdsmiljø.

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
| 2018/19 | Nej | Badminton København, turneringsreglement version 2018-1 | Delvis regionalt |
| 2019/20 | Ja, nationalt BD/DGI fællesreglement | DH/DMU-kilder linkes fra historisk BD-side, men direkte fil-links omdirigerer til `UnknownFile.png` | Delvis |
| 2020/21 | Nej | Ingen arkiveret i dette arbejde | Mangler |
| 2021/22 | Nej | En Vest-reglementsfil mærket 2021 er arkiveret, men dokumentet angiver ikke entydigt, hvilken sæson det gælder | Delvis regionalt; sæsonuklar |
| 2022/23 | Nej | Nej | Mangler |
| 2023/24 | Ja, nationalt BD/DGI fællesreglement + DMU-tillæg | Nej | Delvis nationalt ungdom |
| 2024/25 | Ja, nationalt BD/DGI fællesreglement; både første udgave og martsrevision | Nej | Delvis nationalt ungdom |
| 2025/26 | Ja, nationalt fællesreglement; original + 8. oktober revision | Nordjysk senior/veteran-reglement; DH-filen optræder i søgning, men direkte download her returnerede HTTP 404 | Delvis |
| 2026/27 | Ja, nationalt fællesreglement + DMU-tillæg | DH-reglement + bilag 3 + holdfællesskabstillæg; København lokalt; Nordjylland senior/veteran; Sjælland veteraninvitation (ikke fuldt reglement) | Delvis; flere regioner mangler |

Sæsonår uden fundet kilde må ikke få regler arvet fra nabosæsonen. Tabellen er en status på denne indsamling, ikke bevis på at kilderne ikke eksisterer andre steder.

## Områder uden lokal dækning

Databasen indeholder poster knyttet til Badminton Danmark, Bornholm, Midtjylland, Nordjylland, Sønderjylland, Fyn, København, Lolland-Falster og Sjælland samt DGI Bornholm, Fyn, Midtjylland, Nordjylland, Nordsjælland, Nordvest, SdU, Storkøbenhavn, Storstrømmen, Sydvest, Sydøstjylland, Sønderjylland, Vestjylland, Midt- og Vestsjælland og Østjylland (24 region-labels inkl. Badminton Danmark; historiske navne/forbindelser kan overlappe). Lokale regelkilder er kun hentet for København (2018/19, 2025/26, 2026/27), dele af Sjælland (historisk dokumentation og veteraninvitationer 2026/27), Vest (Kredsserie Vest 2021) og Nordjylland (2025/26-2026/27 SH-reglement). For alle øvrige områder mangler komplet sæsonhistorik for ungdomsindbydelser, senior- og veteranregler.

## Konkret utilgængeligt eller uafklaret

1. **DGI/Badminton Sjælland 2026/27 SharePoint-bilag (tre filer):** anonyme delingslinks endte med HTTP **401 Unauthorized** og nul filbytes på redirects til SharePoint `AllItems.aspx`. Ingen login/cookies blev brugt. De kunne derfor ikke gemmes eller sidekontrolleres:
   - `Indbydelse ungdomsholdturnering DGI og BSJ 2026-2027.pdf`
   - `DGIMVS-NSJ_Badminton_Ungdomshold_Holdlederfolder_2026-2027 ...pdf`
   - `Uge 38 invitation 2026-2027.pdf`
   DGI-arrangementssiden kunne ses offentligt, men dens vedhæftninger blev ikke eksponeret som direkte filadresser i den tilgængelige tekst. Deres indhold gengives ikke her. De ligger heller ikke i repoet under `claude/uge-38-og-dgi-sjaelland-2026-27.md`; den henviste spejlfil blev ikke fundet lokalt.
2. **BadmintonPeople 2019 links:** den historiske officielle holdturneringsside linker til DH, DMU og ungdomsreglement opdateret 9. juli 2019. De udledte fil-id'er 81920, 78820 og 81955 returnerede `UnknownFile.png` (HTTP 200, `image/png`, 2.916 bytes), ikke PDF. De er derfor ikke registerført som regelsæt.
3. **2025/26 DH-reglement:** officiel søge-/PDF-visning viste en 34-siders 2025/26 DH-fil, men den direkte hentning af det viste URL returnerede HTTP 404 i downloaderen. Den er ikke lokalarkiveret og tæller ikke som en registreret fil.
4. **Wayback Machine:** CDX-endpointet blev afprøvet anonymt, men den forespørgsel der blev gennemført gav ingen brugbar snapshotliste. Det beviser ikke, at arkivet er tomt. Der foreligger derfor ingen Wayback-kopier i registeret.
5. **Ældre nationale ungdomsregler og versioner:** der mangler 2010/11-2018/19 og 2020/21-2022/23. 2019/20 PDF er fundet. Eksistensen af fællesreglementet i de manglende år er ikke fastslået.
6. **Ældre navne/kredsgrænser:** DBF/Badminton Danmark, Sjællands Badminton Kreds/SBKr., LFBKr., de fire vestlige kredse og senere regionsnavne er ikke komplet mappet år for år. Ingen automatisk historisk navnefusion er lavet.
7. **Veteran:** der mangler især komplette sæsonreglementer for 2010-2024 og regionale forskelle vest/øst. Et invitationsbrev eller en årsberetning er ikke behandlet som fuldt reglement.
8. **DGI lokale ungdomsindbydelser:** mangler for alle landsdele og sæsoner, også hvor fælles BD/DGI-reglement findes. Det fælles reglement siger selv, at lokalt udvalg vælger administration og udbud; derfor kan man ikke udlede hvilke rækker en region konkret udskrev.

## Søgemetode og afgrænsning

- Gennemgået Badminton Danmarks aktuelle holdturneringsside og åbent WordPress-mediearkiv via søgeord som `reglement`, `ungdomsholdturnering` og `holdturneringsreglement` (135 medieresultater for bred søgning `reglement`; pagineret respons).
- Søgt på BadmintonPeople's historiske BD- og regionale holdturneringssider samt konkrete BadmintonPeople-fil-id'er; døde/ukendte downloads er beskrevet ovenfor.
- Gennemgået offentlige sider for Badminton København, Badminton Sjælland og Badminton i Nordjylland. Fundede links blev hentet langsomt (700 ms mellem downloadkald) og hashkontrolleret.
- Afprøvet Wayback CDX uden login; ingen anvendelige snapshots fundet i denne kørsel.
- Ingen login, captcha-omgåelse, personoplysningsscraping eller databaseændringer.

Fortsættelse kræver enten at Christoffer lægger SharePoint-bilag og eventuelle historiske filer i `statistik/kilder/reglementer/manuelt/`, eller at en offentlig, fungerende kilde-URL til de manglende sæson-/regionreglementer identificeres.
