# Opgave 086c — udvidet visuelt kort

Se [det filtrerbare kort](086c-udvidet-visuelt-kort.html).

- Regioner i kataloget: **33**; med gemte puljer: **25**.
- Pulje-region-forekomster: **59127**; unikke puljer: **18546**.
- Filtrering på region, sæson og aldersgruppe holder kortet læsbart.
- Grå forbindelser er alene dokumentorden inden for samme spilleform-familie. Grøn/blå/stribet er begrænset til dokumenteret regel-/empiribelæg.
- 087 er afsluttet, men kaskaden er 5–8 % pr. niveaupar; den er derfor kun en empirisk underkant.

## Værn

Kun læsning af `liga-landskab.db`; ingen API-kald eller databaseskrivning.

## Rettelse efter visuel kontrol

Den første version samlede alle rækker uden gemte kategorier i én familie. Det var forkert: manglende kategorier er et datahul, ikke et spilleforms-signal. HTML-kortet bruger nu to afgrænsede fallback-regler: (1) slutspils-/spilletidssider arver kun kategorisignaturen fra en entydig grundspilsrække med samme normaliserede rækkenavn i samme region, sæson og aldersgruppe; (2) eksplicitte formatsignaler i rækkenavnet, fx `4+3`, `2+2`, `4 spillere` og `4 piger`, danner hver sin tekstbaserede familie. Rækker uden nogen af de to belæg står fortsat som ukendt og sammenlignes ikke.

Kontrol ved regenerering: **686** rækker arvede entydigt grundspilssignatur, **839** fik eksplicit tekstformatsignal, og **856** forblev ukendte. For BADKBH SEN 2026/27 arver `Københavnsserien - spilletider i slutspillet` den 13-kategorisignatur, som grundspillet i Københavnsserien har; U15-eksemplerne `4+3` og `2+2` ligger nu i forskellige familier.

## Reproducerbar generator (opgave 103)

Klassifikationen kan nu genkøres med `node statistik/scripts/103-086c-klassifikation.mjs`.
Scriptet er en **rekonstruktion**, ikke den oprindelige midlertidige kommando fra opgave 086c;
den oprindelige generator findes ikke i repoets historik. Rekonstruktionen læser kun
`liga-landskab.db`, genskaber kategori-signaturer, anvender de to dokumenterede fallback-regler
i samme rækkefølge og sammenligner hver række med HTML'ens indlejrede godkendte datasæt.

Kontrolkørslen gav 59.127 pulje-region-forekomster, 18.546 unikke
`(sæson, aldersgruppe, puljeid)`-puljer, 686 arvede grundspilssignaturer, 839
tekstsignaler, 856 ukendte og 0 rækkeafvigelser mod HTML'en.
