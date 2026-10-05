# Mangler og dækningsstatus — opgave 130

Hentedato for registrerede PDF'er: 2026-10-04. Efter runde 6 indeholder registeret 53 PDF'er, samlet 19.388.799 bytes og 567 sider. Alle 53 registrerede lokale filer blev kontrolleret for tilstedeværelse, SHA-256, bytes og sidetal; hashes og bytes stemte med registeret, og faktisk sidetal blev talt fra PDF'erne. Det er egentlige reglementer, tillæg og tydeligt mærkede invitationer/vejledninger. Det er **ikke** en komplet samling af alle offentligt tilgængelige regelsæt 2010-nu.

## Dækning pr. sæson i data

`liga-landskab.db` har sæson-id 2010-2026 (17 sæsoner: 2010/11-2026/27) og 24 navngivne regions-/landsdelsforbindelser med gruppeposter. De 24 er ikke ensbetydende med 24 selvstændige regeludgivere; nogle deler fælles BD/DGI-reglement. “Fælles ungdom” betyder at en national fælleskilde blev fundet, ikke at lokalt udbud eller alle lokale tillæg blev fundet.

| Sæson | Fælles ungdomskilde arkiveret | Senior/veteran/regionale holdregler arkiveret | Status |
|---|---|---|---|
| 2010/11 | Nej | Kun SBKr-årsmødemateriale, ikke et reglement | Ikke i registeret; 6-variant-søgekrav ikke opfyldt |
| 2011/12 | Nej | Nej | Ikke i registeret; 6-variant-søgekrav ikke opfyldt |
| 2012/13 | Nej | Historisk SBKr-reglement fundet, men PDF'en angiver ingen sæson; Sjælland veteran-PDF har titel 2013/14 og brødtekst 2012/13 | Delvis; sæson ikke sikkert fastlagt |
| 2013/14 | Nej; Sjælland ungdomsinvitation arkiveret, henviser til separat SBKr.-reglement | Sjælland veteran-PDF har titel 2013/14, men brødtekst omtaler 2012/13; ikke fuldt regionalt reglement | Delvis; underliggende ungdomsregel ikke fundet |
| 2014/15 | Nej | Ingen bekræftet sæsonkilde i dette arkivudtræk | National ungdoms-PDF ikke fundet efter 6 loggede varianter; lokale celler er ikke seksvariantssøgt |
| 2015/16 | Nej | Badminton København lokalt reglement, version 2015.1, for ungdom/senior/veteran | Delvis; national ungdoms-PDF ikke fundet efter tidligere seks varianter |
| 2016/17 | Ja, nationalt BD/DGI-reglement | Sjællands veteraninvitation fundet; invitationen er ikke selve reglementet | Delvis; national pointskala arkiveret, separat veteranreglement mangler |
| 2017/18 | Nej | Nej | National ungdoms-PDF ikke fundet efter 6 loggede varianter; lokale celler er ikke seksvariantssøgt |
| 2018/19 | Ja, nationalt BD/DGI-reglement | Badminton København, turneringsreglement version 2018-1; Nordjylland ungdomsinvitation og senior Serie 2-4-reglement | Delvis nationalt og regionalt |
| 2019/20 | Ja, nationalt BD/DGI fællesreglement | Badminton København lokalt reglement, version 2019-1; andre regionale celler uafklarede | Delvis |
| 2020/21 | Ja, nationalt BD/DGI-reglement (pointskala endnu ikke indlæst) | Badminton København lokalt reglement, version 2020-0; DGI Jylland ungdomsinvitation fundet, men anonym download gav HTTP 502 | Delvis national ungdom og lokalt København |
| 2021/22 | Nej | En Vest-reglementsfil mærket 2021 er arkiveret, men dokumentet angiver ikke entydigt, hvilken sæson det gælder | National ungdoms-PDF ikke fundet efter 6 loggede varianter; regionale celler er ikke seksvariantssøgt |
| 2022/23 | Ja, nationalt BD/DGI-reglement | Sjælland veteranreglement med dokumentdato 1. september 2022, men sæson ikke angivet | Delvis nationalt/regionalt |
| 2023/24 | Ja, nationalt BD/DGI fællesreglement + DMU-tillæg | Nordjylland senior/veteran (Serie 2/3, VoksenFjer, Single/Double, 3-Runder-Double, Veteran 40+) | Delvis; DH-dokument dateret 2023 er arkiveret, men sæson ikke angivet |
| 2024/25 | Ja, nationalt BD/DGI fællesreglement; både første udgave og martsrevision | Badminton København lokalt; Nordjylland senior/veteran | Delvis nationalt og regionalt; Sjælland-senior-PDF dateret 1. september 2025 har ikke fastlagt anvendelsessæson |
| 2025/26 | Ja, nationalt fællesreglement; original + 8. oktober revision | Nordjysk og vestligt senior/veteran; nationalt DH-årsreglement mangler | Delvis |
| 2026/27 | Ja, nationalt fællesreglement + DMU-tillæg; DGI/BSJ invitation og holdlederfolder; særskilt UGE 38-bilag | DH-reglement + bilag 3 + holdfællesskabstillæg; København lokalt; Nordjylland senior/veteran; Sjælland veteraninvitation | Delvis; flere regioner mangler |

**Opdateret ved opgave 131:** dette afsnit er historisk status for opgave 130. Sæson uden egen kilde kan nu pege på den seneste tidligere kilde for præcis samme målgruppe og område, men kun som **betinget** regelbog; ingen arv bagud før første kilde, ingen krydsning mellem områder/målgrupper, og ingen arv af pointskalaer eller niveautal. Den aktuelle matrix er [regelbog pr. sæson](regelbog-pr-saeson.md), med fuld optælling i [dækningsrapporten](131-regelbog-daekning.md). Historiske beskrivelser nedenfor afspejler opgave 130's daværende metode og er ikke ændret retroaktivt.

## Registerbestand efter type og udgiver/område

De 53 hentede PDF'er fordeler sig sådan efter registerets type (en fil kan være vejledning/invitation, ikke et reglement):

| Type | Antal PDF'er |
|---|---:|
| ungdom | 11 |
| ungdom-DMU | 2 |
| ungdom-invitation | 4 |
| ungdom-senior-veteran | 8 |
| ungdom-klassifikation | 1 |
| ungdom-uge38 | 1 |
| ungdom-vejledning | 1 |
| ungdom-veteran | 1 |
| senior | 9 |
| senior-tillæg | 2 |
| senior-veteran | 7 |
| veteran | 3 |
| veteran-invitation | 2 |
| kontekst-veteran (årsmødemateriale, ikke reglement) | 1 |
| **I alt** | **53** |

Område-/udgiveroptælling (PDF'er, ikke unikke regioner; fælleskilder tæller under deres fulde registerlabel): Badminton Danmark 6; fælles Badminton Danmark + DGI Badminton 12; Badminton Fyn 1; Kredsserien Vest-kredse tilsammen 3; Badminton København 6; Badminton Nordjylland 2; Badminton Nordjylland + DGI Nordjylland 5; Badminton Sjælland (tidl. SBKr.) 5; Badminton Sjælland + DGI Nordsjælland/Midt- og Vestsjælland/Storstrømmen 4; øvrige særskilte DGI-/BSJ-samarbejdslabels 7; Lolland-Falsters Badminton Kreds 1; historisk Sjællands Badminton Kreds 1; samlet 53. Optællingen følger registerets præcise `area`-labels og kan være overlappende på tværs af organisationer; fulde labels pr. fil står i `register.json`.

## Områder uden verificeret lokal dækning i registeret

Databasen indeholder poster knyttet til Badminton Danmark, Bornholm, Midtjylland, Nordjylland, Sønderjylland, Fyn, København, Lolland-Falster og Sjælland samt DGI Bornholm, Fyn, Midtjylland, Nordjylland, Nordsjælland, Nordvest, SdU, Storkøbenhavn, Storstrømmen, Sydvest, Sydøstjylland, Sønderjylland, Vestjylland, Midt- og Vestsjælland og Østjylland (24 region-labels inkl. Badminton Danmark; historiske navne/forbindelser kan overlappe). Lokal regelkildedækning er kun punktvist verificeret. At en region-/sæson-/målgruppekombination ikke står i registeret er ikke bevis på fravær; bortset fra de fire nationale ungdomsår nævnt ovenfor er seks særskilte varianter pr. præcis matrixcelle ikke gennemført.

## Kunne ikke hentes — Christoffer prøver manuelt

Dette er de præcise fundne adresser, hvor der ikke kom et brugbart reglement ud. HTTP 200 alene tæller ikke som hentet fil, hvis svaret er et fejlbillede.

| URL | Titel | Sæson/område/type | Resultat |
|---|---|---|---|
| https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=81920 | DH-reglement (link fra Badminton Danmarks arkivside) | 2019/20; national senior | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=78820 | DMU Hold-tillæg (link fra Badminton Danmarks arkivside) | 2019/20; national ungdom/DMU | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=81955 | Fælles reglement for ungdomsholdturneringen, opdateret 9. juli 2019 | 2019/20; national ungdom | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF. Et separat 2019/20 ungdoms-PDF kunne hentes fra badminton.dk og er arkiveret; dette døde arkivlink er ikke en manglende regelversion. |
| https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=78859 | BadmintonPeople-kandidat, titel ikke tilgængelig | Sæson/område/type kan ikke fastslås fra fejlbilledet | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=81921 | BadmintonPeople-kandidat, titel ikke tilgængelig | Sæson/område/type kan ikke fastslås fra fejlbilledet | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=80284 | BadmintonPeople-kandidat, titel ikke tilgængelig | Sæson/område/type kan ikke fastslås fra fejlbilledet | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=75911 | Reglement for senior-/veteranholdturnering, Badminton Fyn | Dokument omtalt som revideret 1. august 2018; sæson ikke angivet; Fyn, senior/veteran | HTTP 200, `image/png`, 2.916 bytes (`UnknownFile.png`), ikke PDF |
| https://badminton.dk/wp-content/uploads/2025/03/2025-03-03-Holdturneringsreglement-for-badminton-i-Danmark.pdf | Holdturneringsreglement for badminton i Danmark (DH-reglementet), 3. marts 2025 | Dokumentdato 2025-03-03; Badminton Danmark, senior; gældende sæson ikke fastslået | Badminton Danmarks medieindeks viser PDF-tekst, men direkte anonym HTTP GET gav 404; ikke arkiveret |
| https://sites.dgi.dk/media/34207/indbydelse-ungdomsholdturnering-jylland-2020-21-2.pdf | Indbydelse ungdomsholdturnering Jylland | 2020/21; DGI Jylland, ungdom | Direkte anonym GET gav HTTP 502; ingen brugbar PDF blev modtaget. |
| https://sites.dgi.dk/media/51208/reglement-faelles-ht-voksenraekker-2023-2024.pdf | Fælles reglement for voksenrækker 2023/24 | 2023/24; DGI/jyske landsdele, senior/veteran | To direkte anonyme forsøg gav HTTP 502, `text/html`, 183 bytes; ingen PDF-signatur. |
| https://www.dgi.dk/media/51208/reglement-faelles-ht-voksenraekker-2023-2024.pdf | Fælles reglement for voksenrækker 2023/24 (alternativ offentlig værtsadresse) | 2023/24; DGI/jyske landsdele, senior/veteran | Direkte anonymt forsøg gav HTTP 502, `text/html`, 183 bytes; ingen PDF-signatur. |

De tre 2026/27 SharePoint-delingslinks gav hver HTTP 401 anonymt. Filerne er siden leveret manuelt af Christoffer og læst; de står derfor ikke som uløste indhold. Originale adresser/proveniens:

- https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQCHx6MbzkXGQoAuqVGR02xhARaSrJly-hwJwpuBTlGWNUg?e=oollgp
- https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQACSb4rI9bvSJBg9S8GwGbQAdNzXkkPsYg8diCGHOyFQWE?e=yUtfwx
- https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQAhfYAuXdgJQadOumEAiZdMAdh0vEEfFoGDBW9W9mZy7HY?e=NxuTZh

De tre URL’er er listet som en gruppe; én-til-én-koblingen mellem hvert SharePoint-token og filnavn er ikke fastslået.

### Øvrige mangler og afgrænsninger

## Runde 4 — bred søgning og efterprøvede kandidater

Syv agenter arbejdede parallelt på ungdom 2010/11–2013/14 (A), ungdom 2014/15–2017/18 og 2021/22 (B), senior/DH/serier (C), veteran (D), DGI-landsdele (E), Badmintonregioner (F) og Wayback (G). De leverede i alt **132 itemiserede forespørgselsstrenge**. En agentrapport modsagde sig selv om antallet udførte søgninger (54 angivet først, derefter 20; itemiseret liste indeholder 36); derfor er 132 summen af tilgængelige, itemiserede strenge — ikke en uafhængigt verificeret tæller for rå søgemaskinekald. Søgeværktøjet eksponerede ikke resultattal pr. forespørgsel i batch-søgninger; dette er logget som “ikke eksponeret”, ikke gættet. Forespørgsler og søgebegrænsninger står i `statistik/results/130-source-discovery.json`.

Fire nye, offentlige PDF'er blev hentet og valideret (HTTP 200, `%PDF-`, sidetal, SHA-256): DH-reglementets PDF-metadata har creation date 2023-09-01 (sæson ikke angivet); Nordjysk senior/veteran 2023/24; Nordjysk senior/veteran 2024/25; Sjællandsk seniorreglement siger “Pr 1/9-2025” (anvendelsessæson ikke angivet). Registeret steg fra 38 til 42 filer, fra 13.053.079 til 14.479.792 bytes og fra 363 til 439 sider.

Ingen DGI-voksen-PDF kunne hentes fra ID 51208: både `https://sites.dgi.dk/media/51208/reglement-faelles-ht-voksenraekker-2023-2024.pdf` (to forsøg) og `https://www.dgi.dk/media/51208/reglement-faelles-ht-voksenraekker-2023-2024.pdf` (ét forsøg) gav HTTP 502, `text/html`. Fyns `fileID=75911` gav HTTP 200, men `image/png`, 2.916 bytes; det er ikke en PDF. Linket `fileID=101467`, som søgeresultatet tilskrev en 2014/15-veteraninvitation, gav i virkeligheden den allerede registrerede 2026/27-invitation (SHA-identisk); ingen ny fil blev tilføjet.

Kun fire nationale ungdomsår uden registreret fil opfyldte i denne runde seks loggede sæsonsspecifikke varianter: 2014/15, 2015/16, 2017/18 og 2021/22. “Ikke fundet efter seks varianter” beskriver søgningen, ikke bevis for at et dokument aldrig fandtes. For 2010/11–2013/14 var der kun fire nationale varianter pr. sæson; ingen præcis regional sæson×målgruppecelle, DGI-landsdelscelle eller Wayback-søgespor opfyldte seksvarianterskravet. De øvrige manglende felter nedenfor skal derfor læses som **uafklarede/ikke i registeret**, ikke som fastslået fravær.

Nye arkivspor til manuel efterprøvning (ikke downloadet i runde 4): [BadmintonPeople holdturneringsregler](https://badmintonpeople.dk/cms/?cmsid=824&pageid=26170); [Nordjyske historiske “Love og regler”](https://web.archive.org/web/20250711172452/https://badmintonpeople.dk/cms/?cmsid=877&pageid=29571); Wayback [Badminton Danmarks reglementsoversigt, 23.06.2024](https://web.archive.org/web/20240623043057/https://badminton.dk/holdturneringsregler/).

1. **Nationale ungdomsregler:** filer findes for 2016/17, 2018/19, 2019/20, 2020/21, 2022/23, 2023/24, 2024/25, begge fundne 2025/26-versioner og 2026/27. 2020/21-tabellen mangler transskription. Nationale PDF'er blev ikke fundet efter seks loggede varianter for 2014/15, 2015/16, 2017/18 og 2021/22; for 2010/11-2013/14 var der færre end seks nationale varianter pr. sæson. Det fastslår ikke, om alle disse årlige fællesreglementer fandtes.
2. **Nationale seniorregler:** DH-reglement for 2026/27 og en ældre DH-version uden angivet anvendelsessæson er arkiveret. Medieindeksets DH-PDF dateret 3. marts 2025 gav HTTP 404 ved direkte GET; den står ovenfor. En gennemgående sæsonserie 2010/11-2025/26 mangler.
3. **Regioner og landsdele:** dækningen er punktvis. København er repræsenteret 2018/19, 2024/25, 2025/26 og 2026/27; Nordjylland senior/veteran i 2023/24, 2024/25, 2025/26 og 2026/27, senior i 2018/19, ungdomsinvitation 2018/19 samt veteran uden sæson; Sjælland har ungdomsinvitation 2013/14, senior-PDF dateret 1. september 2025 uden fastlagt sæson, veteran-dokument dateret 2022 uden sæson og en 2026/27 invitation; vestlige samarbejdsområder har Kredsserie Vest/Serie 1 Vest-dokument fra 2021 uden entydig sæson og senior/veteran fra uge 43 2025. For øvrige labels er den år-for-år-dækning uafklaret; søgekriteriet er ikke nået for hver konkret celle.
4. **Veteran:** der mangler især komplette sæsonreglementer 2010-2024 og regionale forskelle øst/vest. Dokumentdato eller invitation er ikke behandlet som bevis for anvendelse i en hel sæson.
5. **DGI lokale ungdomsindbydelser:** mangler fortsat for de fleste landsdele/sæsoner. Fælles nationalt reglement fastslår ikke, hvilke lokale rækker der faktisk blev udbudt.
6. **Historiske kredsnavne:** DBF/Badminton Danmark, SBKr., LFBKr., de vestlige kredse og senere regioner er ikke komplet kortlagt år for år.
7. **Wayback:** direkte anonym GET gav HTTP 200 for 2019/20-ungdoms-PDF (capture 2020-01-15; samme størrelse og SHA-256 som den direkte arkiverede fil) og HTTP 200 for snapshotsider af BD-regler (capture 2024-06-23) og København-holdturnering (capture 2024-06-17). En uploads-katalogadresse gav HTTP 404. CDX-listningen gav HTTP 200 med ét snapshot i én kørsel, men en genkørsel timed out; den er ikke en komplet arkivsøgning.

## Runde 3 — søgebredde og matrixstatus

Der blev kørt 100 WebSearch-forespørgsler: 48 nationale søgninger fordelt på 16 sæsoner (2010/11-2025/26) × tre målgrupper, 24 områdesøgninger (én for hver region-/landsdelslabel i `liga-landskab.db`) og 28 indledende eksplorative forespørgsler i batches. Forespørgsler, sæson/målgruppe/område, returnerede resultatref-tal, kandidater og udfald er logget i `statistik/results/130-source-discovery.json`.

Resultattallet for de 72 enkeltforespørgsler er antallet af unikke søgeresultat-referencer, ikke et estimat for hele nettet. For de 28 batch-forespørgsler eksponerede værktøjet ikke separate antal pr. forespørgsel; loggen markerer derfor `result_count: null` med forklaring. Søgningerne udgør ikke seks forskellige varianter pr. præcis sæson×region×målgruppe. Derfor er dækningsmatrixen en status over registrerede dokumenter, ikke en påstand om fravær; celler uden kilde er “ikke i registeret / ikke fuldt undersøgt”, ikke endeligt “mangler”.

## Søgemetode og afgrænsning

- Gennemgået Badminton Danmarks aktuelle holdturneringsside og åbent WordPress-mediearkiv via 13 søgeord: `reglement`, `holdturnering`, `ungdomshold`, `veteran`, `serie`, `kredsserie`, `DH-reglement`, `senior`, `indbydelse`, `tillæg`, `ungdomsholdturnering`, `holdturneringsreglement`, `veteranholdturnering`. Svarantal og kandidater ligger i `statistik/results/130-source-discovery.json`.
- Søgt på BadmintonPeople's historiske BD- og regionale holdturneringssider samt konkrete BadmintonPeople-fil-id'er; døde/ukendte downloads er beskrevet ovenfor.
- Gennemgået offentlige sider for Badminton København, Badminton Sjælland og Badminton i Nordjylland. Fundede links blev hentet langsomt (700 ms mellem downloadkald) og hashkontrolleret.
- Afprøvet Wayback både via CDX og direkte arkiv-URL'er uden login. De direkte HTTP-resultater og capture-tidspunkter står i `statistik/results/130-source-discovery.json`.
- Ingen login, captcha-omgåelse, personoplysningsscraping eller databaseændringer.

### Ny fundliste — runde 3

| Sæson | Område/type | Fund |
|---|---|---|
| 2013/14 | Badminton Sjælland, ungdom | Invitation arkiveret; den henviser til særskilte SBKr.-regler, som fortsat ikke er identificeret. |
| 2016/17 | Nationalt BD/DGI, ungdom | Fællesreglement arkiveret; skemaets rå historiske point er indlæst i `regler-ungdom.json`. |
| 2018/19 | Nordjylland, senior | Regional Serie 2-4-reglement arkiveret og matchet mod offentlig BadmintonPeople-fil. |
| 2020/21 | Nationalt BD/DGI, ungdom | Fællesreglement arkiveret; pointtabellen endnu ikke transskriberet. |

De to leverede manuelle PDF’er udgør 2 nye lokale filer; desuden blev 2 offentlige PDF’er downloadet (2013/14 invitation og 2020/21 ungdomsreglement). Samlet tilføjet i runde 3: 4 PDF’er. Fuldstændige dækningsantal efter type og udgiver står øverst og kan reproduceres fra registeret.

Fortsættelse kræver flere præcise historiske/regionalt offentliggjorte kildelinks eller lokale kopier for hullerne ovenfor. De tre DGI/BSJ-bilag er allerede manuelt leveret og registreret.

## Runde 5 — del 1 og del 3; stop før del 2

### Manuelle filer kontrolleret mod registeret

Begge lokale PDF'er var allerede registreret under deres offentlige BadmintonPeople-kilder; derfor er der ikke oprettet dobbelte registerposter eller nye punktværdier.

| Lokal kopi | Kontrol | Eksisterende registerpost | Resultat |
|---|---|---|---|
| `manuelt/Sjaelland_USU_invitation_holdturnering_2013-14_ver2.pdf` | SHA-256 `1dfd2e7759eff5ed65f55cb9bf8bba12d527d1b86fa88947f12fa69de303a4bd`; 4 sider | `sj-youth-invitation-2013-14`; offentlig kilde `https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=25614` | Byte-identisk med den allerede registrerede Sjællandsinvitation 2013/14. Invitationen henviser til særskilte SBKr.-regler; den er ikke selv reglementet og giver ingen ny pointskala. |
| `manuelt/Reglement_for_ungdomsholdturnering_pdf-2018-07.pdf` | SHA-256 `b29731f0a1b341f44a7676de7f37dea5fa28e176e705db6dbea58abb9faf1fe5`; 10 sider | `bd-dgi-youth-2018-19`; offentlig kilde `https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=77454` | Byte-identisk med det registrerede BD/DGI-reglement 2018/19. Dermed er der ingen forskelle i paragraffer, pointskala eller rækker mellem kopierne. PDF'en selv angiver samarbejdsområder for 2018/2019 og et lokalt 4+3-tillæg for Badminton Sjælland/København; PDF-datoen alene er ikke brugt til at fastsætte sæsonen. De samme skemaer er allerede transskriberet fra registerposten. |

### Del 3 — API og BadmintonPlayer

- GraphQL-introspektion: ét read-only `POST __schema`-forsøg mod `https://app.nembadminton.dk/graphql`. Windows afviste socketforbindelsen før serverkontakt; der kom ingen HTTP-status eller introspektionssvar. Derfor blev der ikke kørt feltforespørgsler eller sample queries, og ingen felter kan rapporteres som fundet i denne runde.
- BadmintonPlayer: read-only DB-opslag valgte `leagueGroupId` 17987 (U13 2025/26), 11418 (U13 2018/19) og 2681 (U13 2013/14). De offentlige `Stilling`-URL'er svarede i browser-/søgevisningen som samme JavaScript-skal (`text/html`); intet reglement, invitation, bilag, PDF-link eller dokumentlink var synligt i sideindholdet.
- Den offentlige [Sæsonplan](https://badmintonplayer.dk/DBF/Turnering/SaesonPlanOld) kunne åbnes, men den synlige side viste kun JavaScript-skal/loginfelter, ikke en historisk dokumentoversigt. Hvor langt holdturneringsarkivet rækker bagud, kunne ikke fastslås fra denne side. Det historiske række-ID fra 2013/14 dokumenterer ikke i sig selv et offentligt dokumentarkiv.
- Det allerede registrerede GetWWWFile-link `fileID=25614` har samme `source_url` og `final_url` i registeret; en omdirigering til BadmintonPlayer er ikke dokumenteret. Den aktuelle webvisning kunne ikke genåbne URL'en og gav ikke en ny live HTTP-status. Ingen omdirigeringsadfærd er derfor udledt.

Fire websøgestrenge og fire direkte sidekontroller blev logget i `statistik/results/130-source-discovery.json`; søgeværktøjet viste ikke resultatantal pr. forespørgsel. Det eneste dokument, som en direkte sidekontrol viste som PDF, var Inbox-kandidaten `https://badmintonpeople.dk/Messages/Inbox/GetFile.aspx?id=7903` (application/pdf, 10 sider i webvisningen); den blev ikke hentet til repoet eller registreret i denne del.

**Stopbetingelsen blev udløst:** Del 3 gav ikke en ny offentlig dokumentrute ud over kendte BadmintonPeople-links. Del 2 (kandidat-downloads, fuldt sidetræ, seksvariantersøgning pr. sæson og eventuel nabo-fileID-gennemgang) blev derfor ikke startet. De eksisterende sæsonhuller i tabellerne ovenfor består uændret; ingen ny sæson/områdecelle er blevet markeret som søgt eller fraværende i runde 5.

Alle fire lokale databaser blev kun læst. SHA-256 før ændringerne: `gsb-statistik-normalized.db` `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; `liga-landskab.db` `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; `national-spillere.db` `1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E`; `rangliste-historik.db` `6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F`. Efter-hashes kontrolleres efter dokumentopdateringen.

## Runde 6 — BadmintonPeople, DGI og dækningsgrænser

### Verificerede downloads og fund

De 28 angivne BadmintonPeople-fileID'er gav 22 rigtige PDF-svar (`application/pdf`, `%PDF-`, over 10 KB) og seks fejlbilleder (`image/png`, 2.916 bytes): 78859, 81920, 81921, 78820, 81955 og 80284. Af de 22 PDF'er blev 10 nye relevante dokumenter arkiveret; to var SHA-identiske med eksisterende registerposter; 10 var irrelevante for regelsamlingen eller uden for perioden (bl.a. mødemateriale/personnavne, individuelle stævneinvitationer og håndbøger fra 2002/2008/09/2009/10). Ingen irrelevant PDF blev gemt i repoet.

Tre PDF'er fundet via de nye søgeresultater blev derefter kontrolleret: fileID 76460 var byte-identisk med den allerede registrerede København 2018/19-PDF (218.678 bytes, 12 sider, SHA `ac969a9e29622ff131ef4ddc274e57dd807ed2a38d81d8dd142738e5184e5089`); fileID 77461 var byte-identisk med Nordjylland 2018/19 (257.259 bytes, 6 sider, SHA `785d14908a99843dd4cee694b33b5e4993424835f203c1148e2abd9de607ada4`); fileID 86810 var ny og er arkiveret som København 2020/21 (228.350 bytes, 13 sider, SHA `c5d809574e2515507af54703e51fdf7a9e764a8db406f8b7a83f03af8812ea8c`). Inbox fileID 7903 var HTTP 200/PDF, men SHA-identisk med den allerede registrerede 2016/17 BD/DGI-ungdomsfil. FileID 77338 var også en byte-identisk 2018/19 København-dublet. Samlet for disse 33 direkte BadmintonPeople-downloads: 27 PDF-svar (11 nye, 6 dubletter, 10 irrelevante) og de seks PNG-fejlbilleder.

### Nye registerposter i runde 6

Runde 6 tilføjede 11 offentlige filer: 10 fra den oprindelige kandidatbatch og København 2020/21 (fileID 86810). Fordelingen er: Badminton København 2015/16, 2019/20 og 2020/21; Kredsserien Vest/Serie 1 Vest (2017-udgave uden fastlagt sæson og 2018/19); Fyn senior/veteran/motion (revideret 2018-08-01, sæson ikke angivet); Sjælland senior (dokumentdato 2023-09-01, sæson ikke angivet); DGI-/vestligt seniorreglement (gældende fra 2020-09-10, sæson ikke angivet); Sjælland veteraninvitation 2016/17; ungdomsklassifikationsreglement opdateret 2017-08-01. Filstier, SHA-256, bytes og sidetal står i `register.json`. Registeret indeholder nu 53 filer, 19.388.799 bytes og 567 sider.

FileID 57569 blev sammenlignet direkte med fileID 58918: førstnævnte er en en-sides invitation til veteranholdturneringen 2016/17, SHA `0a3ff03d17ce5ba0e43811c68d029ff89660bcf7c6f6cf7a5525a2b78dd3c519`; sidstnævnte er ti-siders nationalt BD/DGI-reglement for den pointgivende ungdomsholdturnering 2016/17, SHA `40e102231109c4040899d1b5512a80f09337ebffb3281eba8a4009d4735ac4de`. De er forskellige dokumenter, ikke udgaver af samme reglement. FileID 57569's egen titel/indhold vinder over den misvisende søgeresultat-/metadataetiket “PUH fælles reglement BD-DGI 250216”; den angiver, at veteranreglement findes separat.

FileID 77458 er et ungdomsklassifikationsreglement, opdateret 2017-08-01, der omtaler overgangen 2016/17-2017/18. Det er ikke holdturneringens skema 1/1A, så ingen tal blev tilføjet i `regler-ungdom.json`. København 2020/21-reglementet nævner ungdom, senior og senior+; ungdom følger nationalt reglement, og ingen ny national pointværdi udledes.

### WebSearch, event-sider og sidetræ

Der blev kørt 20 konkrete WebSearch-forespørgsler i denne runde: 12 brede/site-formulerede søgninger, fire med allowed-domain-filter `badmintonpeople.dk` og fire med allowed-domain-filter `dgi.dk`. De 20 forespørgsler og de kandidater de gav, er logget i `statistik/results/130-source-discovery.json`. Værktøjet viste ikke totalresultater pr. forespørgsel; loggen bruger derfor `null` i stedet for gættede tal. 16 søgninger fra en tidligere del af runde 6 kunne ikke rekonstrueres query-for-query i den gemte log ved denne fortsættelse; de tælles ikke med i de 20 dokumenterede søgninger.

BadmintonPeople-siderne for holdturneringsregler og København-kredsen gav dokumentlinks/kildetekst; søgehits førte til nye kontroller af 76460, 77461 og 86810. Der blev også åbnet søge-/CMS-indhold for senior/veteran-sider. DGI-eventadresserne for 2018/19, 2017/18 og 2020/21 kunne ikke læses gennem webvisningen i denne gennemgang; den gamle 2018/19-adresse er tidligere kontrolleret som HTTP 404 efter omdirigering. Den offentlige DGI-side for 2025/26 viste kun eventoplysninger uden synlige regelvedhæftninger. 2026/27-siden eksponerer titler på invitation/reglement/holdlederfolder/UGE 38-materiale i søgeindekset, men ikke downloadable PDF-URL'er i den læsbare sidevisning. De tre manuelle SharePoint-links for 2026/27 står fortsat med HTTP 401 i den tidligere kildehistorik; de filer er allerede leveret lokalt og registreret. DGI's 2020/21 ungdomsinvitation og voksenreglement 2023/24 gav direkte HTTP 502 med HTML-fejlsvar, ikke PDF-signatur; voksenreglementets tekst kan ses i søgeindekset, men filen er ikke arkiveret lokalt.

### Hvad der stadig mangler

Runde 6 forbedrede punktvis dækningen, men gennemførte ikke seks forskellige forespørgselsvarianter for hver sæson × målgruppe × region/landsdel. De manglende nationale ungdomsår, senior-/veteranår og regionale/DGI-celler må derfor fortsat stå som **ikke afklaret**, ikke som udtømmende søgt/fraværende. Den nationale ungdomsskala for 2020/21 er fortsat ikke transskriberet; senior-/veteranregler for mange sæsoner og DGI-/regionale ungdomsinvitationer mangler stadig. 2015/16 København, 2019/20 København og 2020/21 København er nu dokumenteret lokalt; 2016/17 Sjælland-veteran er kun dækket af en invitation, ikke af det underliggende reglement.

Der blev ikke foretaget login, captcha- eller robots-omgåelse, fileID-scanning, personoplysningsarkivering eller databaseændringer. De fire databasehashes er kontrolleret igen efter dokumentredigering; værdierne skal være identiske med før-målingerne i runde 5.
