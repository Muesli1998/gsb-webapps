# Datoanalyse af de 58 browserfejl

De 58 kampe fordeler sig sådan:

- 2018-sæson: 4
- 2019-sæson: 23
- 2020-sæson: 31

For 2019-sæsonen ligger 14 kampe på 21.-22. marts 2020 og 4 på 5. april 2020. For 2020-sæsonen ligger de senere registrerede fejl primært i december 2020 til april 2021.

Det understøtter, at corona-perioden kan forklare en del af problemerne, men datoerne alene beviser ikke om kampene blev aflyst. De skal sammenholdes med stillingens kampantal, holdresultat og eventuelle aflysnings-/walkovertekster.

Den komplette række-for-række liste ligger i `results/browser-no-match-dates.csv`.

## Ekstern kontekst: corona

De officielle kilder fra Badminton Danmark understøtter, at datoerne falder i perioder med suspenderet holdturnering:

- Første nedlukning fra marts 2020 afbrød reelt 2019/2020-sæsonen.
- Holdturneringen blev suspenderet fra 9. december 2020 og var for voksne, motionister og veteraner begrænset ind i foråret 2021.
- Badmintonligaen havde særregler og kunne i perioder fortsætte under restriktioner.
- De generelle corona-restriktioner blev ophævet 1. februar 2022.

Kilder:
- https://badminton.dk/tag/corona/
- https://badminton.dk/2020/12/07/alle-badmintonturneringer-suspenderet-til-og-med-3-januar-2021-og-forskellige-restriktioner-forlaenget-til-28-februar/
- https://www.ssi.dk/-/media/arkiv/subsites/covid19/presse/tidslinje-over-covid-19/covid-19-tidslinje-for-2020-2022-lang-version---version-1---april-2022.pdf

Fortolkning: En browserfejl på en kamp med dato i marts/april 2020 eller december 2020–april 2021 bør først klassificeres som mulig corona-aflysning/suspendering. Den må ikke automatisk tælles som en manglende spillet kamp.

## Resultatkontrol efter browser-retry

Af de 56 genfundne kampsider har 33 resultatfeltet - uden individuelle kampe, 11 er walkover/ikke fremmødt, og 12 har individuelle spillerdata. De 33 falder primært sammen med corona-datoerne og bør klassificeres som aflyst/ikke gennemført, ikke som manglende API-data.

