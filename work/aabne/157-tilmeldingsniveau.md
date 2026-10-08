# Opgave 157 — kan vi regne tilmeldingsniveauet ud, og hvad kræver en given række?

**Trin:** Bygger på 156 (hvad `rank` på liste 287 betyder). Start først, når 156 er afrapporteret og Del A har svaret.

## Baggrund
- Liste 287 ("samlet"/tilmeldingsniveau) har ingen point, men en placering. Spillere tilmelder sig turneringer efter deres TILMELDINGSNIVEAU (Reglement for Individuelle Turneringer, § 3 stk. 2 og § 4 stk. 5, der også sorterer frasorteringer efter laveste placering i tilmeldingsniveau). Rækkegrænserne ligger i et "Pointintervalskema i Ranglistereglement", som ikke står i individuelle-turneringer-reglementet. Selve beregningsmetoden for tilmeldingsniveau står ikke i de reglementer, jeg kunne læse.
- Christoffers hypotese: tilmeldingsniveauet er en kombination af point i hver disciplin og antal kampe spillet i den disciplin. Vi har point pr. disciplin og version (288/289/292, mange versioner pr. sæson), kampantal pr. disciplin fra kampdata og placering på 287. Vi kan derfor teste kandidatformler mod den observerede rækkefølge.
- På siden står rækken ved siden af navnet (fx SEN M-A, SEN A). Den kan ses som en rækkegrænse i placeringen.

## Mål
1. **Find de officielle regler.** Søg først i repoet (regelbogen, `docs/`, Project-dokumenterne `reglement-ungdomsholdturnering-2025-26-opsummering.md` og `ungdom-pointskalaer-pr-saeson.md`) og derefter på `badminton.dk` efter "Ranglistereglement", "pointintervalskema" og "tilmeldingsniveau". Max **10** kald til `badminton.dk` (kun GET af offentlige PDF'er/sider, sekventielt, mindst 2 sekunder). Skriv: kilde, dato, hvad reglerne siger om (a) beregningen af tilmeldingsniveau, (b) pointintervaller og rækkegrænser pr. sæson og aldersgruppe, (c) hvordan antal kampe indgår. Citer højst korte uddrag og angiv side/paragraf. Findes reglerne ikke, skriv det tydeligt, og gå videre til punkt 2 uden at opfinde en formel.
2. **Datasæt.** Lav en tabel pr. (spiller, version) fra `rangliste-point.db` og de data, 156 (Del A) viste, hvordan 287-rang skal hentes. Hvis 287-rang for flere versioner mangler, så skriv hvor mange kald det vil kræve (version × sider), og stop. Hent ikke ud over 156's budget, før Christoffer godkender. Hvis rang findes for mindst én version pr. sæson, brug den.
3. **Test af kandidatformler.** For en afgrænset gruppe (fx alle seniorspillere på GSB i `rangliste-point.db` og 287-rang for samme version) test, hvor godt hver kandidat reproducerer rækkefølgen på 287 (Spearman- og Kendall-korrelation, og andelen af spillerpar i samme rækkefølge). Kandidater som minimum:
   - bedste disciplins point,
   - sum af point over discipliner,
   - gennemsnit af discipliner,
   - vægtet sum med vægte efter antal kampe i disciplinen (kampe den seneste sæson, fra kampdata),
   - samme med et gulv/loft pr. disciplin.
   Brug også de delte placeringer (fx to gange 889) som kontrol: kandidaten skal give samme værdi til dem. Skriv, hvilken kandidat der passer bedst, og hvor dårligt den passer.
4. **Rækkegrænser.** For hver række (SEN M-A, A, B og de ungdomsrækker, der kan ses i svarene): hvad er den højeste og laveste samlede placering/rang, vi ser i rækken, pr. version? Er grænsen stabil over versioner, eller flytter den sig? Er det en fast placeringsgrænse eller en pointgrænse?
5. **"Hvor mange point skal jeg bruge?"** Når en formel er tilstrækkelig tæt (Spearman ≥ 0,95 på testgruppen) eller rækkegrænserne kan læses som en pointgrænse: lav en lille opslagstabel, som viser et eksempel, hvor mange point i en disciplin (givet de øvrige) der skal til for at nå en bestemt række. Er formlen ikke tæt nok, så skriv det og lav ingen tabel.
6. **Anbefaling.** Hvad kan og kan ikke siges om tilmeldingsniveauet, og hvad kræver det næste (flere versioner, ungdom, Christoffers kendskab til den gamle "vist"-visning)?

## Regler
- Alle databaser readOnly. Ingen skrivning, ingen import.
- Netværk: højst 10 GET-kald til `badminton.dk` (punkt 1) og de kald, 156 har godkendt, til `badmintonplayer.dk`, hvis punkt 2 kræver nogen (skriv antallet før du kører; kør kun, hvis det er højst 40 kald). Sekventielt, mindst 2,1 sekunder, backoff ved 429/5xx, stop ved 3 fejl i træk. Ingen login, cookies, CAPTCHA eller samtykkeklik.
- Gæt ikke på formler eller feltbetydning. Hvor noget ikke kan afgøres, skriv "ukendt".

## Output
- `statistik/scripts/157-tilmeldingsniveau.mjs`
- `statistik/results/157-tilmeldingsniveau.md` (punkt 1–6, tabeller, forespørgselslog)
- `statistik/results/157-tilmeldingsniveau.json`
- `statistik/results/157-raa-svar/`

## Kontrol
- **Målet:** Punkt 1–6 besvaret. Reglerne er fundet og opsummeret, eller det står tydeligt, at de ikke blev fundet. Hver kandidatformel har en korrelation og en andel korrekt rækkefølge, med gruppestørrelsen.
- **Værnet:** Kaldtal i loggen. Alle databasers SHA-256 uændrede (hashes som i kort 156). `git diff --check` uden fejl.
- **Skøn:** Tre spillere, hvor Christoffer kan slå op, at deres placering og række på den offentlige side stemmer med det, rapporten bruger.

## Afgrænsning
- Ingen opdatering af ranglistedata ud over punkt 2's godkendte kald. Ingen artifact, ingen forventet-vinder-beregning.
- Ret ikke 136-parseren, 143–156-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/157-tilmeldingsniveau`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive `157-raa-svar/`. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
