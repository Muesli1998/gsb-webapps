# Terra-review: GSB holdkampsdata, 2026-09-12

## Vurdering

Projektet har et brugbart grundlag for GSB's holdkampdatabase fra discovery og de første browser-fallbacks, men det er **ikke klar til en resultatoversigt med spillerfiltre endnu**. Den centrale blokering er ikke mangel på en datamodel; den er, at individuelle data fra browseren endnu ikke kan masseudtrækkes med en valideret metode.

## Hvad der er verificeret

- Nembadminton-discovery fandt 2.818 deduplikerede holdkampe i 462 grupper.
- SQLite indeholder 1.374 API-komplette holdkampe, 14.216 individuelle kampe og 49.986 relationer mellem individuelle kampe og navnebaserede spillere.
- 97 BadmintonPlayer-stillinger er bevaret som rå tekst og HTML-tabeller. SQLite indeholder nu 736 stillingsrækker.
- Fallback-køen indeholder 420 `verified` og 1.022 bevidst udskudte U15-eller-yngre rækker.
- 45 kampe med `Resultat: -` og corona-datoer er klassificeret `corona_suspended`, mens rå kilde og oprindelig status er bevaret.
- De 56 tidligere browserfejl er genbesøgt. 11 havde resultater eller walkover-information; 45 havde ikke spillet individuelle kampe.

## Vigtige fejl og usikkerheder

1. **Bulk-udtrækket for 420 kampe er ugyldigt.** Alle filer i `results/individual-browser-all/` indeholder den dynamiske standardskal, ikke kampdetaljer. De må ikke importeres eller bruges til statistik.
2. **De to resterende corona-kampe er ikke konsekvent opdateret.** Brugeren har identificeret 387862 og 387864 som corona-lukkede, men køen viser dem stadig som `browser_no_match_id`. Status og dokumentation skal bringes i overensstemmelse med den bekræftede beslutning.
3. **Nogle rapporter er forældede.** `coverage-report.*` og `standing-coverage-gap.*` blev genereret før browser-hentning af 97 stillinger og før fallback-retry. De må ikke bruges som statusgrundlag før de regenereres.
4. **Spilleridentiteter fra API-importen er navn-baserede.** De kan ikke behandles som sikre personidentiteter på tværs af stavevarianter, før der findes en dokumenteret kobling til BadmintonPlayer-spiller-ID.
5. **Slutspilsstilllinger kræver kampbaseret aggregation.** Pulje 2016/9019 og 2022/15670 viser placering, men ingen sæsonaggregater; semifinaler, finale og bronzekamp skal summeres fra kampene.

## Konkrete næste Luna-steps

1. Opdater de to corona-kampe i kø, database og log, og regenerér alle dækning-/afvigelsesrapporter fra aktuel SQLite og kø.
2. Gør browserextractoren robust: navigér via den dokumenterede fungerende visning, vent på kampens `Kampnr` og `Resultat`, og afvis enhver side uden en reel kampsektion eller dokumenteret walkover.
3. Reproducer først metoden på 5--10 referencekampe med allerede kendte resultater og sammenlign felterne med de gemte browserbeviser.
4. Kør derefter kun validerede, genoptagelige batches for kampene, som mangler individuelle data. Gem rå DOM-udtræk, valideringsstatus og fejlkategori.
5. Parse validerede kampudtræk til `individual_matches` og `individual_match_players`; deduplikér mod eksisterende API-rækker på holdkamp + kategori/rang + spillersider, og behold begge kilder ved konflikt.
6. Byg først derefter en ny afvigelsesrapport pr. sæson/pulje/hold, der sammenholder stillingens kampantal med faktiske, spillede holdkampe.

## Klar til UI?

En første hold- og stillingsoversigt kan bygges efter opdaterede rapporter, men spiller-, kategori- og sætsortering bør vente på trin 2--5. UI'et skal vise datastatus (`komplet`, `delvis`, `corona_suspended`, `walkover`, `ukendt`) frem for at lade ufuldstændige kampe indgå lydløst i statistik.
