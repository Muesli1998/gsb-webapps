# Opgave 087 — holdidentitet på tværs af sæsoner

Genereret: 2026-09-23T19:14:03.907Z

## Baseline

086e's 1.353 `new_or_returning`-rækker blev genanalyseret. Alle rå rækker med sæson, niveau, pulje, nuværende råt holdnavn og metodefund ligger i JSON.

| Årsagskategori | Antal |
|---|---:|
| no_trace_of_club_in_lower_levels | 1310 |
| other_or_unresolved | 29 |
| likely_holdnummer_shift | 8 |
| likely_name_variation_or_exact_canonical | 6 |

## Metoder

| Metode | Fund |
|---|---:|
| A — top-down/an­ker uden hårdt oprykningsloft | 43 |
| B — Unicode/NFC + whitespace/case canonicalisering | 6 |
| C — gentaget n→n+1 holdnummermønster | 8 |
| Alle tre enige | 0 |
| Ingen metode | 1310 |

## Enighed og genkørsel

| Kombination | Antal |
|---|---:|
| none | 1310 |
| A-only | 37 |
| A+B | 6 |

086e's 1.022 kandidat-rækker er genkørt med den kombinerede model. Den fulde rækkevise fordeling ligger i JSON under `revisedCandidateSummary`; ingen metode blev brugt som hård constraint.

Metode B gav kun seks lavere-niveau-fund; hele-hierarkiet canonical-søgning er rapporteret separat i 1.353-populationen, fordi canonicalisering med vilje ikke opfinder aliaser. C er et separat signal, ikke identitetsbevis alene. GSB-rækker og konkrete eksempler ligger i JSON.

## Begrænsning

De gemte kilder indeholder ikke en officiel hold-ID-historik eller et komplet register over tilbagetrækninger/navneskift. Derfor er `none` og uenighed dokumenterede datahuller, ikke tvungne identifikationer. Der blev ikke skrevet til nogen database.

## Opfølgende afklaring efter kontrol

### 1. Metode A's faktiske rækkevidde

Den første version kørte ikke en fuld tvungen, unik kaskade. Den målte kun, om der fandtes et direkte tidligere hold i et lavere niveau; derfor er de 43 fund ikke en komplet Liga→1.division→2.division→3.division→Danmarksserien-kaskade. Fordelingen af de 43 direkte spor på kandidatniveau og fundets tidligere niveau ligger i `cascadeByLevel` i JSON. Dette er en metodebegrænsning, ikke evidens for at kaskaden er afprøvet hele vejen.

### 2. Hele-hierarkiet og canonicaliseret kontrol

De 1.310 blev oprindeligt klassificeret efter manglende spor i niveauerne under kandidatens nuværende niveau. Det var altså ikke en fuld søgning i hele hierarkiet. En efterfølgende søgning i alle seniorniveauer i foregående sæson med samme canonicaliserede klub+holdnavn fandt 68 yderligere spor. Det reducerer den kunstigt snævre "ingen spor overhovedet"-gruppe til 1.242, mens 1.285 stadig ikke har et canonical match i hele hierarkiet (de 68 kan overlappe de øvrige metodefund). Alle 68 ligger individuelt i JSON under `wholeHierarchyCanonical`.

### 3. Fredningsregel

**Ja, der findes en beslægtet eksplicit fredningsregel.** I 2026-DH-reglementets §26 stk. 3 står: "Hvis klubbens oprindelige hold i en række skulle være oprykningsberettiget fra den netop afviklede turnering, annulleres en eventuel nedrykning for klubbens højere liggende hold, og begge hold fortsætter således i deres respektive rækker i den følgende turnering." Den er derfor reel, men den er ikke det samme som en generel regel om at alle nedrykningskandidater fredes ved et andet holds tilbagetrækning. Den er ikke brugt til at tvinge nogen identifikation i denne analyse.

## Runde 3 — fuld Metode A-kaskade

Runde 3 byggede den eksplicitte top-down-følgealgoritme på de gemte seniorhold. Teamnoder blev deduplikeret på sæson + niveau + canonical klubnavn + holdnummer, så samme hold via flere puljesider ikke blev talt flere gange. Der blev først søgt entydigt på samme niveau i næste sæson; kun hvis det ikke gav et match, blev der søgt entydigt ét niveau ned. Flertydige kandidater blev ikke tvunget.

| Niveaupar | Forsøg | Samme niveau | Tvang nedad | Flertydige | Intet entydigt match |
|---|---:|---:|---:|---:|---:|
| Ligaen → 1. division | 206 | 138 | 11 | 0 | 57 |
| 1. division → 2. division | 241 | 121 | 17 | 0 | 103 |
| 2. division → 3. division | 387 | 156 | 30 | 0 | 201 |
| 3. division → Danmarksserien | 763 | 285 | 50 | 0 | 428 |
| Danmarksserien → regional lokalserie | 1.091 | 483 | 68 | 0 | 540 |

Kørslens 206 Liga-startpunkter gav **34 unikke kæder med mindst én tvungen nedadgående overgang**. Ingen kæde nåede entydigt helt til Danmarksserien eller regional lokalserie. Der var 0 flertydige overgange efter deduplikering af teamnoderne. Sammenholdt med de 1.285 runde-2-rækker uden hele-hierarki-canonical match ramte kaskaden **4** rækker på samme sæson, niveau og canonicaliserede klub. Det er et overlapstal, ikke et bevis for fuld identitet.

Den fulde kørsel bekræfter derfor, at Metode A kan bygges og køres gennem alle niveaupar, men at den gemte navne-/holdstruktur kun giver få sammenhængende kæder. De fulde kæder og overgangstællinger ligger i `statistik/results/087-round3-cascade.json` og den reproducerbare kode i `statistik/scripts/087-round3-cascade.mjs`.
