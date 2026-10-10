# Dream Team: designgrundlag for fire features

## Formål og afgrænsning

Dette notat gør fire idéer fra `docs/idebank-statistik.md` konkrete nok til et valg: hot streak, runde-for-runde-graf, rekordbog og forventede point pr. spiller. Dream Teams eksisterende datakilde er sæsonens Google Sheet. Statistikprojektets SQLite-data er en separat kilde; beslutningen 2026-09-15 erstattede B3's foreslåede Sheets-backend med SQLite, men den beslutning flytter ikke Dream Teams deltagere, picks eller top-8-beregning over i SQLite.

Eksemplerne nedenfor er aflæst fra de versionsstyrede 2025/26-filer `kampsystem/stilling_2526.csv`, `kampsystem/spillerpoint_2526.csv`, `kampsystem/resultater_2526.csv` og `kampsystem/holdoversigt_2526.csv`. De er eksempler på faktiske værdier, ikke en ny validering af hele sæsonen. Point vises med dansk decimal-komma.

## Kandidater

### 1. Hot streak

**Formål og bruger.** En lille forsidevisning af, hvem der har haft en god seneste periode. Dream Team-deltagere kan bruge den som underholdning og samtalestof; spillere kan se deres egne seneste resultater. Idébanken nævner både spillere og deltagere. De bør ikke blandes i samme rangliste: deltagerens runde-score måler fantasyholdet, mens spillerens point måler spillerens sejre.

**Foreslået første definition.** Vis spillere med point i flest på hinanden følgende registrerede runder, og vis perioden og pointene. Kald det en *pointstime*, ikke en vinderstreak: Sheets giver rundevis summer, ikke kampdatoer eller sikker information om ikke-optræden. Alternativt kan forsiden vise bedste deltager-score i seneste afsluttede runde. En rullende vindprocent over seneste N kampe er en anden feature og kræver matchbaseret afgrænsning.

**Datakilde og felter.** I dag: `Spillerpoint` har spillernavn, R1–R11 og Sum; `Resultater` har Runde, Hold, Kategori, Hjemme, Ude, Vinder og point for hver side. `Stilling` har deltagerens R1–R11-score. `Holdoversigt` forbinder deltager med valgte spillere. De eksisterende felter rækker til en pointstime eller deltager-score. Rigtige sejre i kamp-rækkefølge mangler dato/tid eller rækkefølge inden for runden. Et nul i spillerens pointserie kan betyde tab, ingen kamp eller ingen optjent point og kan derfor ikke alene afgrænse en tabt stime.

**Eksempel fra 2025/26.** `spillerpoint_2526.csv` viser Thor Pedersen med 2, 1, 1, 2, 1, 2, 2, 1, 2 og 1 point i R1–R10: ti registrerede runder i træk med mindst ét point. R11 står som 0; materialet afgør ikke, om det var et nederlag eller ingen optjening/optræden. `stilling_2526.csv` viser samtidig, at deltageren Thor fik 17,5 point i R7.

**Kilde fremover.** Den almindelige Dream Team-visning bør fortsat læse sæsonens Sheet. SQLite kan bidrage med kampresultater og datoer, hvis en udgave senere dækker alle relevante GSB-kampe; statistikdatabasen indeholder ikke Dream Team-picks eller deltagerens top-8-score.

**Manglende felter.** Kampdato/-tid og en eksplicit markør for om spilleren var opstillet; historiske spillerpoint på kampdato til ranglistebaseret form. Kampdatoer findes i kampdataene, ikke i Dream Team-arket, og opstilling kræver en pålidelig individuel kampkilde. Ranglistepoint-serien er målet med opgave 169.

**Indsats: lav** for pointstime eller seneste deltager-score; **mellem/høj** for en kampbaseret formindikator. **Risiko: mellem.** Små antal kampe gør udsving store. En registreret nul må ikke præsenteres som et sikkert nederlag eller en afbrudt stime.

### 2. Runde-for-runde-graf

**Formål og bruger.** Gøre sæsonens udvikling synlig for Dream Team-deltagere: sammenligne deltagernes samlede runde-score og eventuelt følge de valgte spilleres point. En deltager kan se, om en placering skyldes jævne runder eller få høje runder.

**Beregning.** Tegn R1–R11 på x-aksen og point på y-aksen. Deltagerlinjen bruger den eksisterende Stilling-score, som allerede er resultatet af top-8-af-10-reglen. En spillerlinje bruger spillerens runde-point fra Spillerpoint. Vis ikke summeret spillerlinje som om den var deltagerens score: fravalgte to spillere og top-8-begrænsningen gør de tal forskellige.

**Datakilde og felter.** I dag: Google Sheets `Stilling` (Navn, R1–R11, Total), `Spillerpoint` (Spiller, R1–R11, Sum) og `Holdoversigt` (deltagerens H1–H6/D1–D4 picks). De samme fantasyfelter findes ikke i statistikdatabasens kampdata; SQLite er derfor ikke nødvendig for denne graf. Mangler i arket er runde-datoer og en eksplicit status for ikke-spillet/ufærdig runde. Det skal afklares, før 0 og tomme celler får samme visuelle betydning.

**Eksempel fra 2025/26.** `stilling_2526.csv` viser deltageren Thor med 20 point i R1, 17,5 i R7 og 1,5 i R11. Det giver en konkret serie på 11 runde-værdier; det lave R11-tal bør vises som registreret score, uden at gætte på årsagen. I samme fil er højeste registrerede deltager-score i R1 20 point (delt af seks deltagere).

**Indsats: lav. Risici: lav/mellem.** Datagrundlaget er allerede aggregeret, men mange spillerlinjer på én graf kan blive uoverskuelige. Deltager- og spillerdiagram bør være to visninger med valgbare serier, ikke ét plot med alle linjer på én gang.

### 3. Rekordbog

**Formål og bruger.** En historisk side til deltagere og spillere med rekorder som højeste deltager-score i en runde, højeste spillerpoint i en runde og eventuelt længste pointstime. Den giver genbesøgsværdi mellem runder og sæsoner.

**Beregning.** Gruppér godkendte sæsoners runde-værdier efter deltager eller spiller, find maksimum, og gem sæson/runde og eventuelle delte rekorder. Første version bør holde sig til rekorder der direkte kan beregnes fra Stilling og Spillerpoint. Matchbaserede rekorder som flest individuelle sejre i træk kræver en separat definition og sikre kampdatoer.

**Datakilde og felter.** I dag: Sheets `Stilling` og `Spillerpoint` rækker for intra-sæsonrekorder; `Holdoversigt` kan koble spillere til deltagere. Livstidsrekorder kræver en sammenlignelig historisk serie pr. sæson og stabile navne. Statistik-SQLite indeholder ikke fantasy-deltagernes valg eller top-8-runder. Opgave 177's resultat afklarer effektivitetens metode, men er ikke en validering af ældre Dream Team-ark.

**Eksempel fra 2025/26.** I `stilling_2526.csv` er topværdien for en deltager i én runde 20 point (R1, seks deltagere deler den). I `spillerpoint_2526.csv` er højeste spiller-total i én runde 3 point; flere spillere nåede den værdi. Det er reelle sæsonrekorder, ikke en påstand om rekorden på tværs af alle sæsoner.

**Manglende felter.** En verificeret historisk scoreserie for alle sæsoner, stabile fulde spillernavne i ældre deltager-/aliasdata og datoer til kamprekorder. 2024/25's gamle Sheet er beskrevet som upålideligt i `docs/dream-team-brief.md`; før en livstidsrekord vises, skal sæsonen rekonstrueres og kontrolleres fra rå resultater efter samme officielle 1/1,5-pointregel og top-8-beregning. Manglende historik kan ikke hentes fra SQLite alene, fordi fantasy-picks ikke findes dér.

**Indsats: mellem** intra-sæsonrekorder, **høj** livstidsrekorder. **Risiko: mellem.** Små deltager- og spillergrupper giver let svingende rekorder; vis sæson, runde, delte rekorder og datadækning.

### 4. Forventede point pr. spiller

**Formål og bruger.** Give deltagere eller trænere et skøn over en spillers forventede fantasybidrag før en runde eller som sammenligning med udfaldet. Det kan hjælpe ved holdvalg, men er ikke det samme som en vurdering af hvem der er “bedst”.

**Foreslået beregning.** For hver planlagt individuel kamp estimeres spillerens vinderchance fra spillerens og modstanderens ranglistepoint på kampdatoen; form kan tilføjes, når den er målt. Forventet fantasybidrag er vinderchance gange fantasyværdien (1 point på GSB 1/2, 1,5 på GSB 3/4). Forventet deltager-score kræver desuden forventet opstilling og behandling af top-8-af-10-reglen. Uden kendt modstander eller opstilling kan der kun gives et spiller-/kampestimat med tydeligt forbehold, ikke et sikkert deltagerestimat.

**Datakilde og felter.** Dream Team-Sheets har tidligere kampresultat, hold, spiller, kategori og fantasy-point, men ikke ranglistepoint ved kampdato, kommende individuelle parringer eller forventet opstilling. Statistik-SQLite har kampe, datoer, spillerrelationer og udfald, men `points_at_match` er beskrevet tomt. Opgave 169 skal levere rangliste-events/pointserier; 170 undersøger formindikator; 173 tester ranglistebaseret forventet vinder og performance. Opgave 163 leverer GSB-holdkampe til 2026/27-databasen, men ikke i sig selv Dream Team-arkets fremtidige individuelle opstillinger.

**Eksempel fra 2025/26 og tal der mangler.** `resultater_2526.csv` indeholder en faktisk GSB 2-række: Christoffer Müller mod Lauge Almlund Højgaard, Vinder=Hjemme, Point (Hjemme)=1 og Point (Ude)=0. Det er et observeret udfald, ikke et forventningsestimat. Rækken indeholder ikke spillernes ranglistepoint ved kampdatoen; derfor er en reel forventet sandsynlighed og forventede point for dette eksempel **ukendt**. Opgave 173 beskriver samme hul i SQLite: ranglistepoint ved kampdato mangler, og opgaverne 169/170 er relevante for at udfylde/teste det.

**Indsats: høj. Risiko: høj.** Ranglistepoint dækker ikke nødvendigvis alle spillere, formdata kan være sparsom, og enkeltkampes tilfældighed er stor. For børn og andre små grupper kan en individuel forventnings-/performanceværdi være ustabil; vis antal kampe og usikkerhed, undlad rangering under en fastlagt minimumsgrænse, og beslut navnevisning før offentliggørelse.

## Afhængigheder og hvad der kan bygges

| Kandidat | Findes i Sheets i dag | Statistik-SQLite / opgaver | Afhængighed og afgrænsning |
|---|---|---|---|
| Hot streak | Ja, som runde-point; spiller- og deltagerstreak kan beregnes på rundeniveau. | 170 er relevant for ranglisteform, ikke nødvendig for fantasy-pointstime. 169 leverer dens pointserie. | Pointstime eller seneste rundes deltager-score kan laves fra eksisterende data. Kampstreak kræver dato/orden og opstillingsstatus. 163/173 er ikke påkrævet til første version. |
| Runde-graf | Ja: Stilling og Spillerpoint har R1–R11; Holdoversigt har picks. | SQLite indeholder ikke fantasy-deltagerens top-8-serie. | Kan bygges fra eksisterende Sheets-data. 163/169/170/173 er ikke påkrævet. |
| Rekordbog | Ja, for 2025/26 intra-sæson rekorder. | SQLite kan levere kampresultater, men ikke Dream Team-deltagerrekorder eller picks. | Intra-sæson-version kan laves nu. Livstidsversion afventer verificeret ældre fantasydata, især 2024/25. Ingen af 163/169/170/173 løser det fantasyhistoriske hul. |
| Forventede point | Nej: kun faktiske point og historiske udfald. | 163: fremtidige GSB holdkampe; 169: rangliste-events/pointserie; 170: formindikator; 173: forventet vinder/performance og validering. | Den fulde metode kræver ranglisteværdier ved kampdato og test. 163 er nyttig for komplet kampkontekst, men ikke nok alene. 169 → 170 er en datakæde; 173 tester grundmetoden. Forventet deltager-score kræver desuden forventet opstilling og top-8-simulering. |

Opgaverne 163, 169, 170 og 173 ligger i `work/future/`; de er ikke udført ved denne opgave og deres data må ikke behandles som allerede tilgængelige. Opgave 177 er afsluttet og giver metodebaggrund om små stikprøver, men validerer ikke forventede fantasy-point.

## Foreslået rækkefølge

1. **Runde-graf.** Den har allerede de nødvendige runde-felter i Sheets og giver den tydeligste brugeroplevelse med lav indsats. Start med deltagerlinjer; tilføj valgte spillerlinjer som særskilt visning.
2. **Rekordbog, sæson 2025/26 først.** Den kan bruge samme validerede runde-felter og afprøve, om historisk format er forståeligt. Begræns første omfang til deltagerens højeste runde-score og spillerens højeste runde-point; livstidsrekorder venter på 2024/25-validering.
3. **Hot streak.** Byg først efter beslutning om definitionen. En enkel pointstime er billig, men skal kaldes pointstime og vise runderne; en matchbaseret stime kræver bedre match- og opstillingsdata.
4. **Forventede point.** Vent på 169/170/173's data og validering, og beslut derefter om resultatet skal være per kamp, per spiller i kommende runde eller et samlet deltagerestimat. 163 alene er ikke en forudsætning for den eksisterende 2025/26-undersøgelse, men er relevant for nye 2026/27-kampe.

## Christoffers valg før bygning

- Vælg om de første to features skal være **runde-graf + sæsonrekordbog** (anbefalet ud fra datadækning og indsats), og bekræft at første version begrænses til verificerede 2025/26-tal.
- Vælg hvad “hot” betyder: point i sammenhængende runder, rullende point pr. spiller, seneste deltager-score eller kampvise sejre. Vælg også om visningen er for spillere, deltagere eller to adskilte områder.
- Vælg om forventede point skal vise kampens sandsynlighed, spillerens fantasybidrag eller deltagerens top-8-forventning. De tre mål har forskellig usikkerhed.
- Vælg navnepolitik for spillere under 18 år, hvis de indgår i en visning. De aktuelle Dream Team-felter har ikke fødselsdato eller aldersgruppe, så alderen kan ikke bestemmes sikkert fra `Spillerpoint`/`Resultater`. SQLite har aldersgruppe for kampdata, men koblingen til fantasyvalg er ikke en del af datamodellen. Skal navne vises for alle, kun for seniorer, eller skal ungdom vises aggregeret/uden navne? Beslutningen om at kilden er offentligt tilgængelig afgør ikke i sig selv denne konkrete præsentation.
- Vælg hvor små stikprøver skal skjules eller mærkes, og om deltager-/spillernavne i rekordbogen skal vises for tidligere sæsoner med delvis dækning.

**Skøn (vurdering):** Dokumentet giver grundlag for at vælge graf og en afgrænset 2025/26-rekordbog som de to første. Det gør også de åbne valg synlige; pointstime og forventede point bør ikke bygges uden først at fastlåse definition og datadækning.