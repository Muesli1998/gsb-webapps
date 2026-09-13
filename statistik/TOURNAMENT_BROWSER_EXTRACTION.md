# Browserudtræk af turneringsdata

## Genoptagelsesnote

Seneste test brugte Codex-browserens læsning af den rendere­de DOM på
`https://badmintonplayer.dk/DBF/Turnering/VisResultater/#115342,490920`.
Turnering `115342` og event/program `490920` er bekræftet. Siden indeholdt 77
tabelrækker og viste spillerlinks, klubber, faser, scores og `W.O.`. Dette var
kun det aktuelt viste udsnit, primært én række/event; det er ikke en komplet
turneringseksport. En brugbar udtrækker skal først finde alle event-/række-
varianter og derefter hente hver variant separat. Brug samme side som
reference, hvis arbejdet genoptages efter timeout.

## Verificeret reference

På `VisResultater/#115342,490920` kunne browserens rendere­de DOM læses med følgende felter:

- turneringsnummer og datoer
- rækkevariant (`SEN A` osv.)
- kampnummer
- fase/pulje
- spillerens navn og spiller-ID via profil-link
- spillerens klub
- sætresultat
- `W.O.` som resultatværdi

Referencevisningen indeholdt 77 tabelrækker, heraf konkrete kamprækker med resultater fra finale, semifinaler, kvartfinaler og puljer.

## Udtræksregel

Gem både den rå tekst fra hver tabelrække og de strukturerede felter. En række med `W.O.` må ikke behandles som et almindeligt score-resultat. Kampens fase skal arves fra seneste faseoverskrift (`Pulje`, `Kvartfinaler`, `Semifinaler`, `Finale`). Spillerprofilens URL er kilden til spiller-ID.

## Begrænsning

Dette er browser-observation og ikke endnu en masseimporterbar crawler. Sidens interne webservice kræver stadig de korrekte callback-parametre.
