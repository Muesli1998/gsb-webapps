# Opgave 005 — kilde til slutstillinger

## Svar

### A. Nembadminton

Den login-frie discovery-kæde gemmer hold, `leagueGroupId` og kampe, men
ingen dokumenteret stillings- eller placeringsrække. Den er derfor kilden
til hvilke puljer der skal undersøges, ikke til selve stillingen.

### B. BadmintonPlayer

Den eksisterende stillingssamling kommer fra BadmintonPlayers dynamiske
`HoldTurnering/Stilling`-side med URL-formatet
`#2,{season},{leagueGroupId},1,,,,1093,`. Rå tabeller gemmes i
`results/browser-standings/`; de indeholder placering, hold, kampe,
sejre, score, sæt og point. ASP.NET-webservice-proxyen, som blev afprøvet
i opgave 004, dokumenterer ingen tilsvarende holdstillingsmetode.

### C. Nuværende dækning

De 736 importerede standingsrækker og 96 GSB-rækker stammer fra denne
browserbaserede BadmintonPlayer-rute. Den skal udvides fra den eksisterende
samling, ikke erstattes af en ny Nembadminton-import.

### D. Playoff

Semifinaler, finale og bronzekamp er ikke en enkelt puljestilling. Slut-
placering skal derfor afledes af de gemte kampresultater, med rå fase- og
resultatevidens bevaret. En manglende bronzekamp må ikke gættes til tredje-
eller fjerdeplads.

## Anbefalet stillingskilde

Brug BadmintonPlayer `Stilling` som kilde til almindelige puljestillinger;
brug Nembadminton kun til discovery af sæson/pulje; afled playoffresultater
separat fra holdkampene. Gem hvert stillingssnapshot som tidsbundet rå
kilde, og markér det kun som endeligt når sæson/pulje er afsluttet eller
kilden eksplicit angiver det.
