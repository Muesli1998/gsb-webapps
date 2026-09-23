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
