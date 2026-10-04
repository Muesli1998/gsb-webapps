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

1. De tre DGI SharePoint-bilag for 2026/27 ender anonymt med HTTP 401. Kan du lægge de tre PDF'er i `statistik/kilder/reglementer/manuelt/`, som kortet foreslår? Jeg vil ikke forsøge at hente dem med login eller omgå adgangskontrollen.
2. Der er 17 sæson-id'er i liga-landskab.db (2010-2026) og 24 region-/landsdelslabels med ungdomspuljer. Kun 24 PDF'er fra enkelte år/versioner kunne hentes i denne kørsel; der mangler stadig nationale og lokale regler i mange sæsoner/områder (se `statistik/kilder/reglementer/mangler.md`). Har du lokale/arkiverede kopier eller bestemte offentlige arkiver, jeg skal undersøge videre, især for 2010/11-2018/19 og 2020/21-2022/23?
3. Kontrolværdierne for U13, som kortet kalder 2025/26, matcher præcist den offentlige 2024/25-udgave (6000/5000/4200/3800/3600 for 4 spillere; 3800/3200 for 4 piger; 5600/4700/4000/3600 for 2+2). Den hentede 2025/26-version (revision 8. oktober) har andre værdier (s. 5-6; se `undtagelser.md`). Skal kortets kontrolår rettes til 2024/25, eller er der en anden konkret 2025/26-version, du mener?
4. Den officielle 2025/26 DH-PDF kunne læses via webindekset, men direkte download af den viste URL gav HTTP 404 i dette miljø. Har du PDF'en lokalt, eller en fungerende officiel direkte URL?
5. Denne aflevering indeholder kun en struktureret U13-pointrække i `regler-ungdom.json`; komplette skemaer for alle aldersgrupper og regionstilbud er ikke udtrukket for hver dokumenteret sæson. Fortsættelse afhænger også af svarene på spørgsmål 1-4, så de manglende værdier ikke udfyldes ved antagelse.

## Resultatnote

### Delvis aflevering — 2026-10-04

- Arbejde udført på `arbejde/130-reglementer-faelles-reglement`, baseret på opdateret `main` med 129-commit `2cf4a957498a3ff00952849fcb3df4ad89600842`. Intet push.
- Offentligt kildearkiv: 24 verificerede filer, 8.140.592 bytes, fordelt på ungdom, DMU, nationalt senior, lokale senior/veteran, tillæg og to tydeligt mærkede invitations-/kontekstdokumenter. `register.json` gemmer kilde-URL, endelig URL, hentedato, SHA-256, størrelse, filsti, sæson, område og type.
- Badminton Danmarks offentlige medie-API blev søgt på fire brede søgeord: `reglement` (135 resultater), `ungdomsholdturnering` (10), `holdturneringsreglement` (4), `veteranholdturnering` (0). Kandidaterne gemmes i `statistik/results/130-source-discovery.json`. Badminton DK, BadmintonPeople, Badminton København, Badminton Sjælland, Nordjylland og DGI-sider blev også undersøgt; Wayback CDX-forespørgslen timed out efter 10 sekunder uden snapshotliste.
- Registeret indeholder 24 filer og 8.140.592 bytes. Sæson-/dokumentmærkningerne er 2010/11 (årsmødekontekst), 2018/19 (København version 2018-1), 2019/20, 2021-dokument uden gældende sæson, 2023/24, 2024/25 (2 versioner), 2025/26 (6 dokumenter), 2026/27 (8 dokumenter), samt historiske filer med ukendt eller modstridende sæson. Der er ikke en ubrudt regelserie for nogen disciplin eller region; den detaljerede 17-sæsonstatus står i `mangler.md`.
- Udarbejdet fællesreglement-sammenfatning, undtagelser i MD/JSON, U13-opslagsdata, rækkenavnemønster-rapport og read-only sammenligning. U13-værdierne i kontrolprompten er bekræftet mod 2024/25 PDF s. 5-6, ikke mod 2025/26. 2025/26- og 2026/27-tal er gengivet separat med sidetal.
- Sammenligningsscriptet læste `liga-landskab.db` i `mode=ro` og producerede 298 sæson/regionrækker; 17 sæson-id'er i databasens spænd 2010-2026 (2010 havde ingen ungdomsrækker i det udtræk), 24 regionlabels. U13 eksakt match mod sæsonens officielle format/niveau/point blev fundet i 346/502 rækker i 2024/25, 101/460 i 2025/26 og 80/93 i 2026/27; ikke-match er uafklaret/mismatch, ikke automatisk fejl. Øvrige alderstabeller og lokale tilbud er ikke fuldt fortolket.
- De tre DGI SharePoint-bilag gav HTTP 401 uden login og blev ikke hentet. Historiske 2019 BadmintonPeople-fileID'er omdirigerer til `UnknownFile.png`; 2025/26 DH-URL returnerede HTTP 404; se præcise beskrivelser i `mangler.md`.
- PDF-arkivet blev genåbnet og valideret: alle 24 filer er PDF-signaturfiler; SHA-256 og byte-størrelse matcher registeret for 24/24; 268 samlede PDF-sider. JSON-filerne i register, undtagelser, ungdomsregler og de to 130-resultater kan alle parses. Kontrol mod PDF-sider gav 11/11 målrettede regel-/pointkontroller bestået; 2024/25 U13-pointene var på s. 5-6. Begynderappendiksets fire tekstkontroller på s. 12 bestod efter normalisering af PDF-linjeskift.
- Ved genåbning af PDF-forsiderne blev fire sæson-/titelangivelser præciseret: den offentlige Sjælland-veteraninvitation fileID 101467 er 2026/27; København-filen fileID 76460 er 2018/19, version 2018-1; fileID 25218 angiver ingen sæson og ligger under `ukendt-aar`; fileID 25615 har titel 2013/14, men brødtekst 2012/13 og er derfor markeret som sæsonkonflikt. Registeret har fortsat 24 dokumenter, 8.140.592 bytes og 268 sider; 2026/27 har 8 registrerede PDF'er. Tidligere fejlagtigt navngivne kopier blev fjernet.
- Databaserne blev kun læst. Aktuelle hash og tabellerækketal matcher de kendte værdier registreret i 127-resultatet. `gsb-statistik-normalized.db`: SHA-256 `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`, 103.962 rækker på 11 tabeller (`clubs` 1, `competitions` 462, `extraction_errors` 1.444, `individual_match_players` 67.196, `individual_matches` 20.319, `players` 7.599, `raw_payloads` 2.874, `seasons` 26, `standings` 751, `team_matches` 2.818, `teams` 472). `liga-landskab.db`: SHA-256 `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`, 4.909.082 rækker på 16 tabeller (`age_groups` 29, `club_registry` 796, `fetch_errors` 0, `group_type_katalog` 8.928, `league_group_details` 18.546, `league_group_match_counts` 18.546, `league_group_regions` 59.127, `league_group_teams` 96.823, `league_groups` 18.546, `league_match_groups` 310.137, `league_match_requests` 221.558, `league_matches` 203.012, `match_categories` 1.300.474, `match_games` 2.636.258, `regions` 33, `standing_indexes` 16.269). `git status` viser ingen databasefiler. `statistik/results/127-*` og afsluttede 126/129-output er ikke ændret.
- Opgaven er **ikke lukket**: de åbne spørgsmål ovenfor gør, at kortet bliver i `work/aabne/` og er ikke flyttet til `work/loeste/`. Der er ingen afsluttende påstand om fuld dækning.
