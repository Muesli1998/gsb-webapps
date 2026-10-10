# Opgave 187 — kandidatnøgletal til bestyrelsesoverblik

Sæson: **2025/26** (`season_id=2025`). Scriptet åbner kun de tre benyttede databaser read-only, sætter `PRAGMA query_only=ON` og foretager ingen netværkskald.

## Afgrænsning og definitioner

- GSB-side findes ved eksakt holdnavn mellem `teams.name_raw` og kampens hjemme-/udehold, for GSB-klub `club_id=1093`.
- Aldersgruppe er turneringskontekst fra `competitions.age_group_id`; det er ikke spillerens alder eller fødselsår.
- Spilleroptællinger er distinct `normalized.players.player_id` på GSB-siden. Fysisk personantal er **ukendt** jf. 164; ID-baserede tal er derfor kun tekniske observationer.
- Først observeret ID er ikke det samme som en ny spiller. Historisk dækning og ID-koblinger kan ikke afklares af dette datasæt alene.
- Celler med færre end fem observationer undertrykkes. Hele fordelinger skjules også når ID-kobling ikke kan bevise fem forskellige personer i cellerne.

## 15 kandidatnøgletal

| # | Nøgletal | 2025/26 | Automatisk opdatering | Forbehold |
|---:|---|---:|---|---|
| 1 | Holdkampe med GSB-hold | 400 holdkampe | Ja, efter sæsonens kampimport | Omfatter alle kampstatusser; fire kampe har api_error. |
| 2 | Kampresultater med browser-verificeret status | 396 / 400 (99,0 %) holdkampe | Ja, efter kampimport og statuskontrol | Dækker statusfeltet, ikke en separat kontrol af hvert resultat. |
| 3 | Hold med mindst én kamp | 73 hold-ID’er | Ja | Tæller hold-ID’er i sæsonen, ikke nødvendigvis aktive hold ved sæsonslut. |
| 4 | Individuelle kampe i GSB-holdkampe | 2921 individuelle kampe | Ja, hvis kampdetaljer er importeret | Tæller single- og doublekampe på begge sider af GSB-holdkampene. |
| 5 | Spilleroptrædener på GSB-siden | 4537 spiller-kamprelationer | Ja, hvis kampdetaljer er importeret | Side bestemt via eksakt holdnavn; tæller en spiller én gang pr. individuel kamp. |
| 6 | Observerede spiller-ID’er på GSB-siden | 289 ID’er | Ja | Ikke et bevist antal fysiske personer; aliaser og ID-koblinger er uafklarede jf. 164. |
| 7 | Gennemsnitlige optrædener pr. observeret spiller-ID | 15,70 optrædener pr. ID | Ja | Gennemsnit af relationer over unikke ID’er; siger ikke noget om fordelingen. |
| 8 | Antal aldersgrupper med GSB-holdkampe | 10 aldersgrupper; under-fem-hold-celler skjult grupper | Ja | Antallet er turneringsgrupper, ikke spilleralder; under-fem-hold-celler skjules. |
| 9 | Observerede spiller-ID pr. aldersgruppe | 10 aldersgrupper; ID/person-celler undertrykt gruppeoversigt | Ja | Aldersgrupper overlapper. ID-tal er ikke fysisk personantal; kan ikke bruges som alderstrin pr. person. |
| 10 | Først observerede spiller-ID’er i forhold til forrige sæson | 100 / 289 (34,6 %) ID’er / sæson-ID’er | Ja, som ID-proxy | Ikke nye personer: manglende kampe, ændrede ID’er og historisk dækning kan ligne tilgang. |
| 11 | Rangliste ID total i liste 288 (10. april 2026) | 182 ID-tal; M/K-fordeling skjult | Ja, ved sammenligneligt snapshot | ID-total er ikke bevist personantal; M/K-celler skjules, fordi personkobling ikke er afklaret. |
| 12 | Gennemsnitlige point samlet i liste 288 | 1.523,7 point pr ID | Ja, ved sammenligneligt snapshot | Afhænger af snapshotdato; parametrene M/K er ikke bekræftet personkøn. |
| 13 | GSB-holdkampenes ligaomfang | 73 hold-ID’er i 73 turneringsrækker hold / turneringsrækker | Ja | Competition ID er sæsonspecifik og svarer til en kilde-/turneringsrække. |
| 14 | Nationalt registreret liga-landskab | 877 puljer; 7.226 holdrækker puljer / holdrækker | Ja, efter landskabsimport | National kontekst, ikke et GSB-resultat; rå pulje- og holdrækker kan indeholde dubletter på tværs af grupper. |
| 15 | GSB-holdkampe fra 2024/25 til 2025/26 | 295 → 400 registrerede holdkampe | Ja | Må ikke fortolkes som vækst uden kontrol af ensartet historisk datadækning. |

SQL-forespørgslerne er med i JSON-filen under hvert nøgletal. De er read-only SELECT-forespørgsler; alle DB-forbindelser er åbnet med `readOnly: true` og `query_only=ON`.

## Fordelinger (kun hvis alle celler er mindst fem)

### Observerede spiller-ID’er pr. aldersgruppe

Fordelingen er undertrykt: ID-til-person-koblingen er uafklaret, så fem-person-grænsen kan ikke verificeres.

### Holdkampe og hold pr. aldersgruppe

Fordelingen er helt undertrykt pga. mindst én celle med færre end fem hold.

### Individuelle kampe pr. observeret ID

Fordelingen er undertrykt: ID-til-person-koblingen er uafklaret, så fem-person-grænsen kan ikke verificeres.

## Forslag til bestyrelsesside

Anbefalede kandidater: **1, 2, 3, 4, 8, 13 og 15**. De beskriver aktivitet og dækningsgrad, størrelse og bredde i holdtilbuddet samt registreret udvikling. Før sæsonudvikling vises, skal kampimportens dækning være sammenlignelig mellem årene. Aldersgrupper er holdturneringens kontekst, ikke spillernes alder.

ID-baserede tal om spillere, køn og tilgang udelades fra bestyrelsessiden indtil afhængighederne 163/164 har fastlagt en persondefinition og stabil kobling. Kort 164 rapporterer fødselsår som ukendt og understreger, at stamdataposter ikke er et fysisk personantal.

Vurdering: Tallene besvarer spørgsmål om omfang og aktivitet. De fastslår ikke sikkert antal unikke personer, spillernes aldersfordeling eller ændring i antal spillere; disse forhold er ukendte i det foreliggende datagrundlag.

## Kørselskontrol

- Unikke spiller-ID’er observeret på GSB-siden: **289** (ikke fysisk personantal).
- Spiller-kamprelationer på GSB-siden: **4.537**.
- Fordelinger med under-fem-celler helt skjult: ageGroups, ageMatchCounts, appearanceHistogram, rankingGender (personkobling ukendt).
- Netværkskald: **0**.
- Output indeholder ingen navne eller konkrete spiller-ID-værdier.
