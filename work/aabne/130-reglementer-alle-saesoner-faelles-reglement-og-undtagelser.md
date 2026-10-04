# Opgave 130 — saml alle holdturneringsreglementer og byg et fælles reglement med dokumenterede undtagelser

**Trin:** Ny. Fundament for 127 (ungdomsplacering) og senere senior/veteran-arbejde. Ét stort kort; du må selv planlægge, dele op i faser og tænke dig om undervejs. Ved tvivl: skriv i "Spørgsmål", gæt ikke.

## Baggrund
Christoffer vil kunne slå op, hvilke regler der gjaldt for en given årgang, række, sæson og region, i stedet for at gætte. Konkret kom det op fordi:
- Rækkenavnets tal (fx "U13 A, 5600") er holdets maksimale samlede niveauklassifikationspoint (Fælles reglement for ungdomsholdturneringen 2025/26, §9 stk. 3a, verificeret mod PDF, s. 4-6). Men reglen er kun læst for 2025/26. Vores data dækker mange sæsoner og flere regioner, og skalaer og holdtyper kan have ændret sig.
- Reglementets §12 giver rækkefølgen 4+3, 4+2, 2+2, 4 spillere/4 piger (samme som Christoffers hierarki).
- DMU Hold er finalen. Puljevindere er garanteret udtagelse (§5.3a). "UGE 38" er en ekstra turnering med en plads til DMU, afholdt på Sjælland, og er IKKE beskrevet i Badminton Danmarks reglement. Dens regler står sandsynligvis kun i DGI's egne bilag (se kilder).
- Der er sandsynligvis forskelle mellem regioner (Badminton København, DGI, andre), da kredse/landsdele selv vælger holdtyper og rækker (§2, §4 i reglementet).

Eksisterende opsummering af 2025/26 ungdomsreglementet ligger som spejl i projektet (`claude/reglement-ungdomsholdturnering-2025-26-opsummering.md`). Repoet er kilden; denne opgave skal flytte den kilde ind i repoet.

## Mål
Byg i repoet:
1. **Kildearkiv.** Alle offentligt tilgængelige reglementer for ungdom, senior og veteran, for så mange sæsoner som muligt (mindst så langt tilbage som vores data: tjek `seasons` i databasen), for alle regioner/kredse/landsdele vi har data for, inkl. tillæg (DMU Hold, holdfællesskaber, spilletilladelse/klubskifte, DM Hold, regionale tillæg). Gem hver PDF/side som fil med kilde-URL, hentedato og SHA-256 i et register (`statistik/kilder/reglementer/register.json`). Mapper pr. år/område.
2. **Fælles reglement.** Ét dokument (`statistik/kilder/reglementer/faelles-reglement.md`) pr. emne: holdtyper og spillerantal, aldersgrupper, rækker og niveau (bogstav/point og skalaer), holdsammensætning, DMU Hold-kvalifikation, holdfællesskaber, flere hold fra samme klub, udgåede/trukne hold, point og stillingsregel, spilleperiode, mv. For hver regel: ordlyd (kort citat), gældende sæsoner, kilde med sidetal.
3. **Undtagelser og ændringer.** En tabel pr. emne over forskelle efter sæson, region, aldersgruppe og række (`undtagelser.md` + `undtagelser.json`), hver med kildehenvisning. Tydeligt hvad der er ændret mellem sæsoner (diff af de sæsonvise udgaver).
4. **Opslagsfil til scripts.** Maskinlæsbar `regler-ungdom.json`: for hver sæson og region, de kendte holdtyper, rækkenavne og deres maksimale niveaupoint (skala 1/1A) og bedste-spiller-max. Kun hvad kilderne siger.
5. **Kobling til data (kontrol, ikke ombygning).** Sammenlign skalaerne med de rækkenavne, vi har i `liga-landskab.db` for ungdom (division_name_raw): hvilke rækkenavne kan nu tolkes med sikkerhed ud fra reglementet for den sæson, og hvilke kan ikke? Rapportér tal pr. sæson og region. Ret IKKE 127's filer; skriv resultatet i en egen rapport (`130-reglement-vs-raekkenavne.md`).
6. **Hullisten.** `mangler.md`: sæsoner, regioner og reglementer vi ikke fandt, eller som kun findes bag login/ikke-offentligt, med hvad der mangler og hvor Christoffer evt. kan hente dem.

## Kendte kilder (start her; find selv flere)
Badminton Danmark: `https://badminton.dk/holdturneringsregler/` (aktuelle), plus ældre versioner. Kendte direkte-URL'er:
- Ungdom 2026/27: `https://badminton.dk/wp-content/uploads/2026/07/Faelles-reglement-for-ungdomsholdturneringen-endeligt-300626-1.pdf`
- Ungdom 2025/26 (denne er læst): `.../2025/07/Faelles-reglement-for-ungdomsholdturneringen-2025-2026.pdf`; revideret `.../2025/10/Faelles-reglement-for-ungdomsholdturneringen-2025-10-08.pdf`
- Ungdom 2024/25: `.../2024/10/2024-10-04-Faelles-reglement-for-ungdomsholdturneringen.pdf`; 2023/24: `.../2023/11/Faelles-reglement-for-ungdomsholdturneringen-2023-2024.pdf`; 2019/20: `.../2020/01/Fælles-reglement-for-ungdomsholdturneringen-2019-2020.pdf`
- DMU Hold tillæg: `.../2026/07/Reglement-DMU-HOLD-tillaeg-2026-07-01.pdf`, `.../2024/07/Reglement-tillaeg-til-DMU-Hold.pdf`, `.../2023/07/Tillaegsreglement-til-DMU-Hold-2023-2024-Rev.pdf`
- Senior/DH: `.../2026/07/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-07-01-endeligt-med-bilag-3-1.pdf`, `.../2026/07/Bilag-3-til-DH-reglementet-2026-06-30.pdf`, `.../2026/07/Tillaeg-om-holdfaellesskaber-til-Reglement-for-holdmesterskabet-for-Danmark-i-badminton-2026-06-24-godkendt.pdf`
- Andet: DM Hold Hyggefjer 2026, spilletilladelse og klubskifte (2026-09-16), overdragelse af spilletilladelse, rejserefusion, Vejledning for holdturneringsdommere.
- DMU Hold og kvalifikation: `https://mesterskab.badminton.dk/victor-dmu-hold/` (siden nævner kvalifikation via lokale puljevindere, pladser 2-5 i nogle rækker, og kvalifikationsoversigter som PDF).
- **UGE 38 / DGI Sjælland:** arrangementsside `https://www.dgi.dk/arrangementer/202717105000` (Ungdomsholdturnering Sjælland 2026/27) og tre bilag i DGI's SharePoint:
  - `https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQCHx6MbzkXGQoAuqVGR02xhARaSrJly-hwJwpuBTlGWNUg?e=oollgp`
  - `https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQACSb4rI9bvSJBg9S8GwGbQAdNzXkkPsYg8diCGHOyFQWE?e=yUtfwx`
  - `https://dgidk.sharepoint.com/:b:/s/SPGR-000001015/IQAhfYAuXdgJQadOumEAiZdMAdh0vEEfFoGDBW9W9mZy7HY?e=NxuTZh`
  (Claudes webværktøj kunne ikke hente SharePoint-linkene pga. robots.txt. Hvis du heller ikke kan, så skriv det i `mangler.md`, og Christoffer lægger filerne i `statistik/kilder/reglementer/manuelt/`. Find derefter selv de ældre sæsoners tilsvarende DGI-/regionale bilag, fx via dgi.dk og kredsenes/regionernes hjemmesider.)
- Regioner/kredse: find hjemmesider og reglementer for de regioner, der optræder i `liga-landskab.db` (`regions`, `league_group_regions`), mindst Badminton København og DGI Storkøbenhavn/Sjælland. Wayback Machine (web.archive.org) må bruges til ældre udgaver, hvis det er tilladt fra dit miljø; angiv den arkiverede URL og dato.

7. **Rækkenavne forklaret af reglerne (må ikke gættes).** Brug de indsamlede reglementer og regionale tillæg til at finde ud af, hvad følgende mønstre i rækkenavne i `liga-landskab.db` (division_name_raw, ungdom) betyder, for hver sæson og region. Eksempler fra Badminton København (region 8) er vist i parentes. Skriv resultatet i `statistik/kilder/reglementer/raekkenavne-moenstre.md` med reglen, kilden (sidetal) og en foreslået parserregel pr. mønster. Hvor reglerne ikke forklarer et mønster, skriv "ikke forklaret i kilden" i stedet for at gætte.
   - Tal uden bogstav ("U13 3800 4 Spillere", "U15 - 7600 - 4 spillere"): Er tallet holdets maksimale niveauklassifikationspoint, og hvilke skalaer gjaldt i hvilke sæsoner (3400, 4400, 5200 mv.)? Kan tallet kobles til et bogstav pr. sæson?
   - Forkortelser: "CD" (C-D), "MA" (M/A), "AB", "Dx", "10t"/"12t" (tusinde point?), bogstav i parentes ("(4 spillere C)", "(4+2 M)"), "P1/P2", "Pulje 1 - Ny".
   - "1. Serie / 2. Serie / 3. Serie" (ældre sæsoner, ca. 2011-2014): niveau, og hvordan hænger det sammen med senere A/B/C/D og M?
   - "Serie X1 / X2 / X3", "Nye spillere", "Dx ... BD" og suffikset "BD".
   - "U11 4+2" og 4+3: har reglementet intet niveau (§9 stk. 3d-e i 2025/26)? Gælder det samme for ældre sæsoner?
   - Særlige rækker: "Holdturneringsdage for begyndere" (Herlev, Hillerød) og "Årets U11 Hold" (indledende, semifinaler, finaler): hvad er de (begynderturnering jf. appendiks i reglementet?), og tæller de som almindelige rækker eller som egne turneringer (som DMU og UGE 38)?
   - Hold-fællesskabsrækker ("U11 (4+2) - maks. 8500 p. holdfællesskab").
   Baggrund og de konkrete navne: `statistik/results/129-uoplyste-niveauer.md` (grupperet) og region 8-rækkerne uden niveau i `statistik/results/127-gsb-ungdom-formatplacering.json` (`kbh_width.all_rows`, felt `level.interpretable = false`, `included_in_width = true`). Ændr IKKE 127-filerne i denne opgave; en senere rettelse til niveauudtrækket venter på dette resultat.

## Afgrænsning og regler
- Kun offentligt tilgængelige kilder. Omgå aldrig login, captcha eller robots.txt-blokeringer. Hent roligt (pause mellem kald). Intet scraping af personoplysninger.
- Kun læsning af `statistik/data/*.db` (`readOnly: true`). Rør ikke 127-, 126- eller andre afsluttede resultatfiler.
- Gæt aldrig. Hvad kilden ikke siger, står som "ikke angivet i kilden". Hvor to udgaver er uenige, vis begge med sæson og sidetal.
- Sæsoner uden fundet reglement: skriv ikke en regel ud fra nabosæsoner; markér "ukendt, evt. som sæson X", og list den i `mangler.md`.
- Store PDF'er må committes, hvis de samlet er rimelige (under ca. 100 MB i alt); ellers kun register + hashes + udtrukket tekst. Spørg i "Spørgsmål", hvis du er i tvivl.
- Skriv på dansk, jævnt sprog.

## Kontrol
- Stikprøve: tjek mindst 10 regler i det fælles reglement mod PDF'ens sidetal, herunder skalaerne for U13 2025/26 (4 spillere A 6000, B 5000, C 4200, C-D 3800, D 3600; 4 piger C 3800, D 3200; 2+2 A 5600, B 4700, C 4000, D 3600).
- Registret: hver fil har URL, hentedato, SHA-256, sæson, område og type. Ingen fil uden kilde.
- Rapportér: antal sæsoner × regioner × typer dækket vs. manglende.
- SHA-256 og rækketal for `gsb-statistik-normalized.db` (49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E) og `liga-landskab.db` (9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C) uændrede. `git status --short statistik/data/` viser ingen databasefiler.

## Ved tvivl
Spørg i "Spørgsmål", især om kildernes pålidelighed, hvilke regioner der skal med, og om regler der modsiger hinanden.

## Gren
`arbejde/130-reglementer-faelles-reglement`, fra `main` (efter 129 er merget).

---

## Spørgsmål

1. **Afklaret i runde 2:** Christoffer leverede de tre DGI/BSJ-PDF'er i `statistik/kilder/reglementer/manuelt/`. De oprindelige SharePoint-links gav anonymt HTTP 401; filerne er registreret med SHA-256, læst og indarbejdet. Ingen login eller omgåelse blev brugt.
2. Der er 17 sæson-id'er i `liga-landskab.db` (2010-2026) og 24 region-/landsdelslabels med ungdomspuljer. Efter runde 3 indeholder registret 38 PDF'er fra enkelte år/versioner. Mange nationale og lokale sæson-/områderegler er fortsat ikke i registeret; fravær er ikke fastslået uden seks forespørgselsvarianter pr. præcis matrixcelle. Den aktuelle dækning står i `statistik/kilder/reglementer/mangler.md`.
3. **Afklaret i runde 2:** kontrolværdierne matcher både 2024/25 og den oprindelige 2025/26-udgave. Oktoberrevisionen af 2025/26 har andre værdier. Begge udgaver står særskilt i `regler-ungdom.json`, `faelles-reglement.md` og `undtagelser.md/.json`; intet kontrolår skal rettes.
4. **Afklaret i runde 2:** Badminton Danmarks medieindeks viser en DH-PDF dateret 3. marts 2025, men den fundne præcise URL gav HTTP 404 ved direkte anonym hentning; se `mangler.md`. Den er ikke registreret som hentet. DH-reglement 2026/27 er arkiveret; øvrige år mangler fortsat.
5. Runde 2 udvidede `regler-ungdom.json` til alle sæsonversioner, aldre og formater, der kunne aflæses fra de arkiverede fællesreglementer. Scannede/uklare niveaulabels står null. Lokale tilbud samt nationale mellemår uden kilde er stadig åbne; se `mangler.md`.

## Resultatnote

### Delvis aflevering — 2026-10-04

- Arbejde udført på `arbejde/130-reglementer-faelles-reglement`, baseret på opdateret `main` med 129-commit `2cf4a957498a3ff00952849fcb3df4ad89600842`. Intet push.
- Offentligt kildearkiv: 24 verificerede filer, 8.140.592 bytes, fordelt på ungdom, DMU, nationalt senior, lokale senior/veteran, tillæg og to tydeligt mærkede invitations-/kontekstdokumenter. `register.json` gemmer kilde-URL, endelig URL, hentedato, SHA-256, størrelse, filsti, sæson, område og type.
- Badminton Danmarks offentlige medie-API blev søgt på fire brede søgeord: `reglement` (135 resultater), `ungdomsholdturnering` (10), `holdturneringsreglement` (4), `veteranholdturnering` (0). Kandidaterne gemmes i `statistik/results/130-source-discovery.json`. Badminton DK, BadmintonPeople, Badminton København, Badminton Sjælland, Nordjylland og DGI-sider blev også undersøgt; Wayback CDX-forespørgslen timed out efter 10 sekunder uden snapshotliste.
- Registeret indeholder 24 filer og 8.140.592 bytes. Sæson-/dokumentmærkningerne er 2010/11 (årsmødekontekst), 2018/19 (København version 2018-1), 2019/20, 2021-dokument uden gældende sæson, 2023/24, 2024/25 (2 versioner), 2025/26 (6 dokumenter), 2026/27 (8 dokumenter), samt historiske filer med ukendt eller modstridende sæson. Der er ikke en ubrudt regelserie for nogen disciplin eller region; den detaljerede 17-sæsonstatus står i `mangler.md`.
- Udarbejdet fællesreglement-sammenfatning, undtagelser i MD/JSON, U13-opslagsdata, rækkenavnemønster-rapport og read-only sammenligning. Runde 2 præciserer, at kontrolværdierne findes både i 2024/25 og original 2025/26; oktoberrevisionen af 2025/26 og 2026/27 har andre skalaer.
- Sammenligningsscriptet læste `liga-landskab.db` i `mode=ro` og producerede 298 sæson/regionrækker; 17 sæson-id'er i databasens spænd 2010-2026 (2010 havde ingen ungdomsrækker i det udtræk), 24 regionlabels. U13 eksakt match mod sæsonens officielle format/niveau/point blev fundet i 346/502 rækker i 2024/25, 101/460 i 2025/26 og 80/93 i 2026/27; ikke-match er uafklaret/mismatch, ikke automatisk fejl. Øvrige alderstabeller og lokale tilbud er ikke fuldt fortolket.
- De tre DGI SharePoint-bilag gav HTTP 401 uden login og blev ikke hentet. Historiske 2019 BadmintonPeople-fileID'er omdirigerer til `UnknownFile.png`; 2025/26 DH-URL returnerede HTTP 404; se præcise beskrivelser i `mangler.md`.
- PDF-arkivet blev genåbnet og valideret: alle 24 filer er PDF-signaturfiler; SHA-256 og byte-størrelse matcher registeret for 24/24; 268 samlede PDF-sider. JSON-filerne i register, undtagelser, ungdomsregler og de to 130-resultater kan alle parses. Kontrol mod PDF-sider gav 11/11 målrettede regel-/pointkontroller bestået; 2024/25 U13-pointene var på s. 5-6. Begynderappendiksets fire tekstkontroller på s. 12 bestod efter normalisering af PDF-linjeskift.
- Ved genåbning af PDF-forsiderne blev fire sæson-/titelangivelser præciseret: den offentlige Sjælland-veteraninvitation fileID 101467 er 2026/27; København-filen fileID 76460 er 2018/19, version 2018-1; fileID 25218 angiver ingen sæson og ligger under `ukendt-aar`; fileID 25615 har titel 2013/14, men brødtekst 2012/13 og er derfor markeret som sæsonkonflikt. Registeret har fortsat 24 dokumenter, 8.140.592 bytes og 268 sider; 2026/27 har 8 registrerede PDF'er. Tidligere fejlagtigt navngivne kopier blev fjernet.
- Databaserne blev kun læst. Aktuelle hash og tabellerækketal matcher de kendte værdier registreret i 127-resultatet. `gsb-statistik-normalized.db`: SHA-256 `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`, 103.962 rækker på 11 tabeller (`clubs` 1, `competitions` 462, `extraction_errors` 1.444, `individual_match_players` 67.196, `individual_matches` 20.319, `players` 7.599, `raw_payloads` 2.874, `seasons` 26, `standings` 751, `team_matches` 2.818, `teams` 472). `liga-landskab.db`: SHA-256 `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`, 4.909.082 rækker på 16 tabeller (`age_groups` 29, `club_registry` 796, `fetch_errors` 0, `group_type_katalog` 8.928, `league_group_details` 18.546, `league_group_match_counts` 18.546, `league_group_regions` 59.127, `league_group_teams` 96.823, `league_groups` 18.546, `league_match_groups` 310.137, `league_match_requests` 221.558, `league_matches` 203.012, `match_categories` 1.300.474, `match_games` 2.636.258, `regions` 33, `standing_indexes` 16.269). `git status` viser ingen databasefiler. `statistik/results/127-*` og afsluttede 126/129-output er ikke ændret.
- Opgaven er **ikke lukket**: de åbne spørgsmål ovenfor gør, at kortet bliver i `work/aabne/` og er ikke flyttet til `work/loeste/`. Der er ingen afsluttende påstand om fuld dækning.

### Runde 2 — 2026-10-04

- Arbejdet er fortsat på samme gren `arbejde/130-reglementer-faelles-reglement`, oven på `5e98026`; der er ikke pushet eller amend'et.
- De tre manuelt leverede DGI/BSJ-PDF'er er registreret i `register.json`, hver med kilde til arrangementssiden, hentedato, bytes, SHA-256, område/type og notat om oprindelige SharePoint-links (HTTP 401 anonymt):
  - `Uge_38_invitation_2026-2027.pdf`: 40.284 bytes; SHA-256 `5d4cc108da096aab3fd8daf292d2394d3258c0ab3ecc6677ed8dc35be8d1c80f`; 1 side.
  - `DGIMVS-NSJ_Badminton_Ungdomshold_Holdlederfolder_2026-2027.pdf`: 1.427.044 bytes; SHA-256 `114f71cebfded0361d593ed744279a506ba9e76c6d596e94933c35e4c6e34c21`; 4 sider.
  - `Indbydelse_ungdomsholdturnering_DGI_og_BSJ_2026-2027.pdf`: 256.411 bytes; SHA-256 `e6076e8ef6cbf236569c8eefb35b21736204ef37cfd974537efedf757112e063`; 2 sider.
- De tre bilag er læst. UGE 38 er dokumenteret som separat ekstraordinær 2+2-turnering U13-U19 i uge 38; vinderen får tilbudt DMU-plads, med finale mellem puljevindere hvis flere puljer (invitation s. 1). Lokal invitation dokumenterer holdtyper/runder, 3×15 fra 1. juli 2026 og DMU Hold 24.-25. april 2027 (s. 1-2). Holdlederfolderen er vejledning og ikke et selvstændigt regelsæt (s. 2-4). `raekkenavne-moenstre.md` forklarer nu UGE 38 med kilde og sidetal.
- Nye hentede kilder: nationalt BD/DGI ungdom 2018/19 og 2022/23; Nordjylland/DGI ungdomsinvitation 2018/19; Badminton København lokalt reglement 2024/25; Nordjylland veteranreglement uden sæson; Sjælland veteranreglement med dokumentdato 1. september 2022 men uden fastlagt sæson; og et fælles vestligt senior/veteranreglement gældende fra uge 43 2025. Registeret har nu 34 PDF'er / 12.032.569 bytes. Sæson-/område-/typeoptælling er i `mangler.md` og kan genskabes fra registeret. Medieindekset viste også en 2025 DH-PDF, men den præcise download-URL returnerede 404 og står som mislykket kandidat.
- 2019/20 youth-PDF blev hentet direkte fra Wayback-URL med HTTP 200, 166.682 bytes, PDF-signatur; byte-størrelse og SHA-256 matcher den allerede registrerede direkte fil. Den blev derfor ikke tilføjet som dublet. Wayback-snapshot af BD-regelsiden returnerede HTTP 200, capture 2024-06-23; København-siden returnerede HTTP 200, capture 2024-06-17. Wayback-CDX var ustabil (HTTP 200/ét snapshot i én kørsel, timeout ved genkørsel); se `130-source-discovery.json`.
- WordPress-medie-API'et blev søgt med 13 termer (se `statistik/scripts/130-discover-public-sources.mjs` og `130-source-discovery.json`); resultater omfattede bl.a. 135 resultater for `reglement`, 21 for `holdturnering`, 10 for `ungdomshold`, 17 for `senior`, 9 for `DH-reglement`, 8 for `tillæg`. Dette er kandidatsøgning, ikke bevis på fuldstændighed.
- `regler-ungdom.json` er udvidet til 8 dokumenterede sæsonversioner på 7 sæsoner (2018/19, 2019/20, 2022/23, 2023/24, 2024/25, original 2025/26, revision 8. oktober 2025 og 2026/27). Tabellen dækker de sikkert aflæste alders-/formatrækker. Usikre/scannede niveauetiketter står null, og lokal udbudsmængde er ikke udledt. 2018/19-tabellens pointenhed er særskilt markeret.
- Korrektion til første resultatnote: U13-kontrolværdierne stemmer også med original 2025/26 (samme skala som 2024/25); det er revisionen 8. oktober 2025, der ændrer værdierne. Kortets Spørgsmål 3 er derfor lukket uden at ændre kontrolåret.
- Kildevalidering fangede et Fyn-link med HTTP 200, men `image/png`, 2.916 bytes (`UnknownFile.png`), ikke en PDF. Den ugyldige fil blev ikke registreret som kilde og står i `register.json.failed_candidates` samt `mangler.md`. Derudover står 2019-BadmintonPeople fejlbilledlinks og Nordjyllands seniorlink uden eksponeret filadresse i den nye manuelle opfølgningssektion. Ingen URL er gættet.
- `faelles-reglement.md`, `undtagelser.md/.json`, `mangler.md`, `regler-ungdom.json`, `raekkenavne-moenstre.md` og dette kort er ajourført. Opgaven er stadig delvis: fælles ungdomsregler mangler for 2010/11-2017/18, 2020/21 og 2021/22; der findes ikke dækkende år-for-år-kilder for senior/veteran og de fleste regioner/landsdele. De åbne huller er opremset i `mangler.md`.
- Ingen skrivning til databaserne eller ændring af 127/129-output. Fire uvedkommende lokale ændringer (tre `apps/netlify-prod`-filer og `docs/BESLUTNINGER.md`) er ikke rørt eller medtaget.

### Runde 3 — 2026-10-04

- Registreret de to manuelt leverede PDF'er efter SHA-256-match mod offentlige BadmintonPeople-links: BD/DGI ungdom 2016/17 (10 sider, 450.680 bytes, `40e102231109c4040899d1b5512a80f09337ebffb3281eba8a4009d4735ac4de`) og Nordjylland senior Serie 2-4 2018/19 (6 sider, 257.259 bytes, `785d14908a99843dd4cee694b33b5e4993424835f203c1148e2abd9de607ada4`). 2016/17-skemaets rå point står i `regler-ungdom.json`; de er ikke konverteret til senere pointenheder.
- To offentligt hentede PDF'er føjet til arkivet: Sjælland ungdomsinvitation 2013/14 (4 sider; invitationen henviser til særskilte SBKr.-regler) og nationalt BD/DGI ungdomsreglement 2020/21 (9 sider; pointtabellen mangler endnu maskintransskription). Samlet fire nye PDF'er i denne runde.
- Kørt 100 WebSearch-forespørgsler: 48 nationale sæson/målgruppe-søgninger, 24 søgninger på regionlabels og 28 eksplorative batch-forespørgsler. Søgeloggen ligger i `statistik/results/130-source-discovery.json`. Søgningerne er ikke seks varianter pr. hver kombination af sæson, region og målgruppe; derfor er ikke-fundne matrixceller ikke markeret som endeligt fravær.
- Filer der stadig ikke kunne hentes: DGI Jylland ungdomsinvitation 2020/21 gav HTTP 502; Badminton Fyns senior/veteran-kandidat gav HTTP 200 men PNG-fejlbillede. Nordjylland 2018/19 er fjernet fra ikke-hentet-listen, da offentlig PDF blev verificeret.
- Registeret indeholder nu 38 PDF'er, 13.053.079 bytes og 363 sider. Dækningen er punktvis; de fulde huller og søgebegrænsninger står i `statistik/kilder/reglementer/mangler.md`.

### Runde 4 — 2026-10-04

- Arbejdet er på `arbejde/130-reglementer-runde4`; ingen GitHub-kontakt eller push. De fire eksisterende ændringer i `apps/netlify-prod/` og `docs/BESLUTNINGER.md` blev bevaret og ikke medtaget.
- Syv subagenter søgte parallelt i de afgrænsede spor A-G. Der foreligger 132 itemiserede forespørgselsstrenge; et ungdomsspor modsagde sig selv om sit kørselsantal (54 først, 20 senere, 36 itemiseret), så 132 beskrives som summen af loggede strenge, ikke verificeret rå søgemaskinekald. Batch-søgninger eksponerede ikke pr.-forespørgsel resultattal; de står ikke som gættede værdier.
- Fire nye offentlige PDF'er blev valideret og registreret: nationalt DH (35 sider, 273.429 bytes; sæson ikke angivet, PDF-metadata creation date 2023-09-01), Nordjylland senior/veteran 2023/24 (15 sider, 414.960 bytes), Nordjylland senior/veteran 2024/25 (15 sider, 418.806 bytes) og Sjælland senior (11 sider, 319.518 bytes; PDF siger “Pr 1/9-2025”, hel anvendelsessæson ikke angivet). Registeret er nu 42 PDF'er, 14.479.792 bytes, 439 sider.
- Ikke hentet som PDF: DGI voksenreglement fileID 51208 gav HTTP 502 fra både sites.dgi.dk (to forsøg) og www.dgi.dk; Badminton Fyn fileID 75911 gav HTTP 200, men PNG-fejlbillede 2.916 bytes. BadmintonPeople fileID 101467 viste sig at være identisk med den allerede registrerede 2026/27 veteraninvitation, ikke en ny 2014/15-kilde.
- Ingen ny ungdoms-PDF blev verificeret; `regler-ungdom.json` fik derfor ingen nye sæsonværdier. Seks nationale varianter uden fund blev logget for 2014/15, 2015/16, 2017/18 og 2021/22. Andre regionale sæson-/målgruppehuller er fortsat uafklarede, ikke erklæret manglende, fordi de ikke fik seks varianter hver.
- De to databaser forblev read-only; hashes før og efter matcher henholdsvis `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` og `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`. Opgave 130 er fortsat delvis og bliver i `work/aabne/`.
