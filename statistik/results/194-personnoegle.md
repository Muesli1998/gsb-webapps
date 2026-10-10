# Opgave 194 — personnøgle, runde 2

Netværkskald: **0**. Normalized, rangliste-point og national-databaser blev åbnet read-only med mode=ro og PRAGMA query_only=ON.

## Regel for sikker

R1 sikker: én kandidat-ID; eksakt fuldt navn i normalized data og ranglistedata samme sæson med GSB-klub; samt enten national kamp på GSB-siden samme sæson eller ID-bundet, eksakt navngivet 154-rå eventrække der viser spilleren i en kamp med GSB. Ingen anden kandidat må opfylde reglen, og ingen normalized-kollision må forekomme. R2 sandsynlig kræver én 164 kandidat og GSB-kontekst, men opfylder ikke R1. Manglende/ambig evidens er uafklaret.

## Omfang

GSB-ID'er alle sæsoner: 677; GSB-ID'er 2025/26: 289; øvrige ID'er: 6922; total: 7599.

## Før og efter

| Klasse | 191 | 194 |
|---|---:|---:|---:|
| sikker | 0 | 1 |
| sandsynlig | 617 | 616 |
| uafklaret | 6982 | 6923 |
| navnebroedre | 0 | 58 |
| samme_person | 0 | 0 |
| ikke_person | 0 | 1 |

Ændrede ID'er: 60. De største ændringer (maks. 30; sorteret navn/ID):
- 66 Louis Valdemar Hedegaard Toftlund: sandsynlig → sikker (R1: entydigt eksakt navn + ranglisteklub GSB i samme sæson + national GSB-kamp eller ID-bundet 154-holdkamp; ingen ID-kollision)
- 176 Ikke fremmødt: uafklaret → ikke_person (pseudo-spiller; ikke person)
- 1600 Amir Tayari: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 2767 Bjarne Nielsen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1786 Carsten Jensen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1059 Carsten Nielsen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 584 Carsten Nørgaard: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 2127 Carsten Rasmussen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 74 Cecilie Johansen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 752 Chiori Nagatsuka: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1019 Christian Kjær: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 466 Christian Staal: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 763 Daniel Borgen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 686 Farshid Attarhamed: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1204 Frank Nielsen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1084 Gert Poulsen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 5208 Guido Mattioni: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1740 Helle Larsen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 3902 Henrik Hjorth: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1023 Henrik Vilhelmsen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 740 Jan Pedersen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 488 Jens Møller: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 4714 Jes Rasmussen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 5651 Jonas Abildgaard: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 3327 Jonas Møller: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1952 Jonathan Nielsen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 226 Jonathan W. Hansen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 2935 Kasper Buus: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 3329 Katrine Dehn: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- 1602 Kenneth Jørgensen: uafklaret → navnebroedre (R3: flere eksakte identitetskandidater; ingen valgt)
- Resterende ændringer ikke listet: 30.

## Klasseantal for GSB

Alle sæsoner: {"sikker":1,"sandsynlig":616,"uafklaret":1,"navnebroedre":58,"samme_person":0,"ikke_person":1}.
2025/26: {"sikker":1,"sandsynlig":261,"uafklaret":0,"navnebroedre":26,"samme_person":0,"ikke_person":1}.

## Dækning og konflikter

GSB-kampoptrædener 2025/26: 4537; optrædener på sikker ID: 28 (0.62 %).
Konflikter: 0; se JSON.

## Skøn (vurdering)

Vurdering: 0,62 % sikker kampdækning er ikke tilstrækkelig til at vise spillertal uden forbehold.

## Stikprøve

Tilfældig-rækkefølge via stabil SHA-256 sortering; sikker 1/15, uafklaret 15/15. Sikker-koblinger, som separat co-occurrence-kontrol ikke afviste: 1/1.

### Sikker
- 66 Louis Valdemar Hedegaard Toftlund: id:330770; normalized navn=Louis Valdemar Hedegaard Toftlund | sæsoner=2021|2022|2023|2024|2025 | klubkontekst=Gladsaxe Søborg | id:330770 rangliste=7 national_GSB_kampe=0 | 164_kandidater=330770 | events=id:330770 154=match:487676 158=profil Louis Valdemar Hedegaard Toftlund 158b=profil Louis Valdemar Hedegaard Toftlund | regel=R1: entydigt eksakt navn + ranglisteklub GSB i samme sæson + national GSB-kamp eller ID-bundet 154-holdkamp; ingen ID-kollision

### Uafklaret
- 1784 Stig Bisgaard: kandidater ukendt; normalized navn=Stig Bisgaard | sæsoner=2018|2019|2024|2025 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 682 Henrik Søltoft: kandidater ukendt; normalized navn=Henrik Søltoft | sæsoner=2012|2013|2014|2015|2016|2017|2018|2019|2020|2021|2022|2024|2025 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 261 Simone Lykke Suhr: kandidater ukendt; normalized navn=Simone Lykke Suhr | sæsoner=2012|2013|2020|2021|2024|2025 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 4990 Folmer Christoffersen: kandidater ukendt; normalized navn=Folmer Christoffersen | sæsoner=2012 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 4478 Harry Pearson: kandidater ukendt; normalized navn=Harry Pearson | sæsoner=2014 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 7110 Aksel Kampmann: kandidater ukendt; normalized navn=Aksel Kampmann | sæsoner=2024 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 6040 André Tornslev: kandidater ukendt; normalized navn=André Tornslev | sæsoner=2019|2020 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 4449 Pernille Toft: kandidater ukendt; normalized navn=Pernille Toft | sæsoner=2012|2013|2014 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 5023 Christian Klinge: kandidater ukendt; normalized navn=Christian Klinge | sæsoner=2011 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 2033 Kåre Marling Kiib: kandidater ukendt; normalized navn=Kåre Marling Kiib | sæsoner=2023 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 3808 Jacob Rasmussen: kandidater ukendt; normalized navn=Jacob Rasmussen | sæsoner=2013|2016 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 3357 Peter Dyhrberg: kandidater ukendt; normalized navn=Peter Dyhrberg | sæsoner=2018 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 1546 Jacob Grenaa Nielsen: kandidater ukendt; normalized navn=Jacob Grenaa Nielsen | sæsoner=2024 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 1536 Silje Nielsen: kandidater ukendt; normalized navn=Silje Nielsen | sæsoner=2024 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens
- 5928 Mads Folmann: kandidater ukendt; normalized navn=Mads Folmann | sæsoner=2017 | klubkontekst=modstander | 164_kandidater=ingen | events=intet ID-match i 154/158/158b | regel=ingen: utilstrækkelig/ikke-entydig evidens

## Manuel gennemgang

CSV-rækker: 27. Indeholder uafklarede/navnebrødre på GSB-siden i 2025/26 samt de otte trupnavne; valgkolonnen er tom.

## Forslag til brug

Start med en versionsstyret mappingfil til manuel review; flyt kun godkendte bindinger til en normalized-DB mappingtabel med kilde, status, evidensreference og gyldighed.

## Kontroltal

Koblingsrækker: 7599; GSB ID'er 2025/26: 289; konflikter: 0; netværkskald: 0.

