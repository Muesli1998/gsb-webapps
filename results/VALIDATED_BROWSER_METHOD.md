# Valideret BadmintonPlayer-browsermetode

## Reference

Kamp 337416 (2018, pulje 11355) blev åbnet i den eksisterende Codex In-app Browser/CUA-kontekst.

## Sekvens der virkede

1. Brug den allerede åbne in-app-browserfane med BadmintonPlayer.
2. Åbn kamp-URL'en direkte:
   `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,2018,11355,1,8,,337416,1093,`
3. Vent cirka 2,5 sekunder på dynamisk rendering.
4. Læs accessibility tree/browser snapshot, ikke kun statisk HTML.
5. Godkend kun siden når følgende er synligt:
   - Kampnr med det forventede ID
   - Runde og dato
   - Hjemmehold og udehold
   - Resultat og point
   - mindst én individuel kampsektion eller dokumenteret walkover
6. Spillerlinks findes som links til `/DBF/Spiller/VisSpiller/#<playerId>`.
7. Sætresultater og golden set står som separate tekstblokke under kategorierne.

## Hvad der ikke virkede

Playwright med ny persistent browserkontekst og samme hash-URL returnerede ofte kun standardskallen på cirka 292 tegn. Statisk `body.innerText` og almindelige anchor-udtræk kan derfor ikke alene bruges som succesflag.

## Implementationsregel

En fremtidig extractor skal bruge den fungerende browser/CUA-kontekst eller reproducere dens fulde sideinitialisering. Den skal afvise standardskallen og gemme rå accessibility tree/DOM sammen med URL, tidspunkt og valideringsstatus.

## Evidens

- 337416 viste fuld kamp: Team Storstrøm 1 – Gladsaxe Søborg 1, 4-3, point 2-1.
- Kampen indeholdt spillerlinks, individuelle kategorier, sæt og golden set.
- Den samme kamp blev ikke korrekt gengivet af den efterfølgende Playwright-bulk-kørsel.
