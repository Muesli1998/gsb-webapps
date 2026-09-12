# Rapport: kandidater til mulig tilbagetrækning

Dato: 2026-09-12

## Formål

At finde hold/sæsoner, hvor data kan pege på, at et hold blev trukket eller fik afgørelser efter klage. Dette er en screening og ikke dokumentation af en officiel afgørelse.

## Regel for kandidatflag

Et hold markeres som `possible_withdrawal` hvis en komplet stilling viser 0 holdpoint. Styrken øges hvis der samtidig er 0 sejre, mange `W.O.`/`Ikke fremmødt`-kampe eller ingen registrerede kampe efter en bestemt dato.

Ingen af disse forhold må alene omskrives til “holdet blev trukket”. Det kræver en kilde fra stilling, kamptekst eller officiel afgørelse.

## Resultat af nuværende datasæt

De gemte stillingsudtræk (`results/browser-standing-*.json`) indeholder aktuelt ingen GSB-række med `points = 0`. Derfor kan der ikke rapporteres en bekræftet eller foreløbig 0-point-kandidat fra disse filer endnu.

Det er et dækningsresultat, ikke et bevis på at ingen GSB-hold blev trukket. De fleste kampe er gemt som kampmetadata/fallback-resultater, og mange stillingssider er endnu ikke hentet. Kampkøen indeholder heller ikke stillingspoint for hver gruppe.

## Næste hul der skal lukkes

1. Hent stillingen for hver unik GSB-sæson + `leagueGroupId`.
2. Gem hele rækken for GSB samt alle øvrige hold i gruppen.
3. Beregn kandidatflag ud fra point, sejre, score, walkovers og sidste kampdato.
4. Gem kilde-URL og rå række ved hvert flag.
5. Kontroller kandidater manuelt mod tekst om klage, afgørelse eller tilbagetrækning.

## Felter til fremtidig lagring

`possible_withdrawal`, `withdrawal_confidence`, `withdrawal_evidence_raw`, `appeal_evidence_raw`, `standing_source_url`, `standing_snapshot_date`.

Kilde: lokalt ekstraherede BadmintonPlayer-stillinger og browser-fallback-data i dette repository.
## Screening efter hentning af 97 stillinger

Den strukturerede screening fandt 13 GSB-rækker med 0 point. Flere indeholder den eksplicitte tekst `udgået` eller `trukket` i holdnavnet, hvilket er stærkere evidens end 0 point alene. De to rækker fra 2016/pulje 7652 og 7654 er ved nærmere kontrol ikke tegn på trækning: de har henholdsvis 7 og 6 spillede kampe, kampscore 10-46 og 10-38 samt sætscore 31-94 og 27-78. De tabte altså alle kampe, men kampene blev faktisk spillet.

Se den fulde tabel i `results/standing-gsb-analysis.md`.

## Korrektion af heuristik

0 holdpoint og 0 sejre er ikke i sig selv tegn på tilbagetrækning. Kampscore og sætscore skal kontrolleres først. En række med kampe over 0 og ikke-tomme scorefelter klassificeres som en fuldt spillet, men pointløs sæson, medmindre der findes eksplicit status som trukket eller udgået.

