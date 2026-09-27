# Opgave 111 — Bornholms lokalhistorik og regionale pladsbrug

## Metode

Read-only SQL mod `liga-landskab.db` for senior-grundspil. Bornholm søges både som `Bornholmsserien` og alternative rå rækkenavne med Bornholm/serie i navnet. Nabosæson-identitet bruger samme konservative metode som 107: canonicaliseret klubnavn og holdnummer, uden opfundne aliaser. Et match er et konkret spor, ikke automatisk bevis for at en plads blev udnyttet.

## Bornholm efter 2015/16

Der findes 22 Bornholm-topserie-holdrækker i den afgrænsede mapping. Den udvidede navnesøgning fandt 5 rå gruppe-navne/-divisioner med Bornholm-signal: 2011: Bornholmsserien / Pulje 1; 2012: Bornholmsserien / Pulje 1; 2013: Bornholmsserien / Pulje 1; 2014: Bornholmsserien / Pulje 1; 2015: Bornholmsserien / Pulje 1. Databasen giver dermed ikke et entydigt belæg for en fortsættelse under et andet navn efter 2015/16; det forbliver ubekræftet.

## Regionale år-for-år-tal

| Region | Pladstal efter 105 | Regional-noder | Entydige regional→national | Entydige national→regional | Fortolkning |
|---|---|---:|---:|---:|---|
| København | 2 (plus Bornholm-plads ved manglende brug) | 80 | 12 | 15 | Kun konservative spor; øvrige ubekræftede |
| Sjælland | 2 | 256 | 60 | 55 | Kun konservative spor; øvrige ubekræftede |
| Lolland-Falster | 1 (til Sjælland ved manglende brug) | 87 | 1 | 1 | Kun konservative spor; øvrige ubekræftede |
| Bornholm | 1 (til København ved manglende brug) | 22 | 0 | 0 | Kun konservative spor; øvrige ubekræftede |
| Kredsserie Vest | 6 | 1408 | 252 | 57 | Kun konservative spor; øvrige ubekræftede |

Detaljer pr. sæson findes maskinlæsbart i JSON; sæsoner uden regionale grundspilsknuder er ikke udfyldt med nul, fordi fravær i den gemte population ikke alene beviser en ubrugt plads.

## Bornholm-konklusion

Ingen entydig Bornholm→Danmarksserien-tråd blev fundet med den konservative metode i 107-stil. Det er et **ubekræftet/ikke dokumenteret fund**, ikke en påstand om at pladsen aldrig blev brugt. Bornholmsseriens skæbne efter 2015/16 kan heller ikke afgøres alene af de fundne navne i den gemte database.

Maskinlæsbar rapport: `111-bornholm-lokalhistorik.json`.
