# Opgave 095 — regional puljestruktur under Danmarksserien

**Status:** research mod den lokale, read-only `liga-landskab.db`. Ingen API-kald og ingen tabelgeneratorer er ændret.

## Metode og dækning

- Afgrænsning: `age_group_id = 1` og de otte poster i `regions` med `parent_id = 1`:
  Bornholm (3), Midtjylland (4), Nordjylland (5), Sønderjylland (6), Fyn (7), København (8), Lolland-Falster (9) og Sjælland (10).
- `league_group_regions.region_id` er brugt til alle opslag. Navnestrenge er kun brugt bagefter til at beskrive den rå, allerede regionsafgrænsede struktur.
- Det rå, komplette bilag er [095-regional-puljestruktur-raw.json](095-regional-puljestruktur-raw.json): 2.990 regionstilknyttede senior-grupper, 136 region×sæson-celler fra 2010/11 til 2026/27.
- Fordeling af celler: 104 med en rå, navngivet topserie-kandidat; 103 er tilstrækkeligt identificeret, mens `Kredsserie Fyn` i 2014/15 står som et eksplicit, men stadig uafklaret overgangsfund. Der er 25 uafklarede struktur-/kildeceller og 8 uden nogen regionsknyttet seniorgruppe (alle regioner i 2010/11). Ingen celle er uomtalt nedenfor.

## 1. Topserier pr. region og sæson

| Region (`region_id`) | Navngivet topserie i rådata | Uafklaret eller manglende kildegrundlag |
|---|---|---|
| Badminton Bornholm (3) | `Bornholmsserien`, 2011/12–2015/16 (én `Pulje 1`, `grundspil` hvert år) | 2016/17 har kun `Serie 2`/`Serie 3`; 2017/18–2019/20 har ingen regionstilknyttede seniorgrupper; 2020/21–2025/26 har kun Serie 2–5-varianter; 2026/27 har ingen grupper. Ingen af disse rånavne beviser en afløser for Bornholmsserien. |
| Badminton Midtjylland (4) | `JYLLANDSSERIEN`/`Jyllandsserien`, 2011/12–2013/14; `Kredsserie Vest`/`Kredsserien Vest`, 2016/17–2026/27 | 2014/15–2015/16: kun Serie 2/3-varianter; ingen rå `Jyllandsserien` eller `Kredsserie Vest`. |
| Badminton Nordjylland (5) | `Kredsserie Vest`/`Kredsserien Vest`, 2016/17–2026/27 | 2011/12–2015/16: ingen eksplicit navngivet topserie. Rådata har bl.a. `Herre Senior A`, `Herre B`, `Serie 1` og i 2011/12–2013/14 gruppeetiketten `Oprykning til Jyllandsserien`; det dokumenterer ikke alene hvilken grundspilsrække der var topniveauet. |
| Badminton Sønderjylland (6) | `Kredsserie Vest`/`Kredsserien Vest`, 2016/17–2026/27 | 2011/12–2015/16: `Holdturnering Serie 1/2/3`, senere `Serie 1/2/3` og i 2015/16 senior-/motionsnavne. Ingen entydig topserie-label. |
| Badminton Fyn (7) | `Fynsserien`, 2011/12–2013/14; `Kredsserie Vest`/`Kredsserien Vest`, 2016/17–2026/27 | 2014/15 har `Kredsserie Fyn` (to grupper) samt `Kredsserie 5 (Fyn)` og Serie 1–3; 2015/16 har senior A/B/C- og Fynsmesterskab-navne, men ingen `Fynsserien`/`Kredsserie`. Overgangen kan ikke navngives sikkert. |
| Badminton København (8) | KS-familien (`KS-Pulje`, `KS Serie`, `KS-P1/P2`, med Oprykning/Nedrykning), 2011/12–2017/18; `KBH Serien P1/P2`, 2018/19–2021/22; `Københavnsserien`, 2022/23–2026/27 | Ingen efter 2010/11. Dette er tre dokumenterede navnefamilier, ikke et hul. |
| Badminton Lolland-Falster (9) | `LF-Serien`/`LF - Serien`/`LF-serien`, 2011/12–2025/26; `LF Serie`, 2026/27 | Ingen efter 2010/11. LF-Serien har både grundspils- og, i relevante år, slut-/op-/nedrykningsgrupper. |
| Badminton Sjælland (10) | `Sjællandsserien`, 2011/12–2026/27 | Ingen efter 2010/11. Slutspilsnavne varierer, men grundspilsnavnet er uafbrudt. |

Den delte vestlige struktur er synlig som samme Kredsserie Vest-/Kredsserien Vest-navne under region 4–7 i samme sæsoner. Rapporten siger kun, at grupperne er knyttet til flere `region_id`er; den antager ikke, at hver region har en separat vestlig række.

## 2. De to åbne strukturspørgsmål

### Fyn, Midtjylland og Sønderjylland, 2014/15–2015/16

| Region | 2014/15 rå fund | 2015/16 rå fund | Konklusion |
|---|---|---|---|
| Fyn | `Kredsserie Fyn` (2 grupper), `Kredsserie 5 (Fyn)`, Serie 1–3 | `Kvalifikations-række`, Senior B/C, Senior Hr. A/B Fynsmesterskab og Senior Hr. B-række | `Kredsserie Fyn` er en navngivet kandidat i 2014/15; data afgør ikke dens præcise placering mod Danmarksserien, og 2015/16 har ingen tilsvarende entydig label. |
| Midtjylland | Serie 2 (3 grupper), Serie 3 (3) | Serie 2 (3), Serie 3 (2) | Ingen rå topserie-label; ikke muligt at slutte at Serie 2 er topniveau. |
| Sønderjylland | Serie 2/`Serie2` og Serie 3 | Senior-/motionsrækker samt Senior Serie 2/3 | Ingen rå topserie-label. |

Det bekræfter en overgang i de gemte data, men **hverken dens organisatoriske årsag eller topniveauet i de uafklarede år kan bestemmes herfra**.

### Bornholm efter 2015/16 — afklaret

Dette punkt er afklaret efter opgave 096. Christoffers domænekendskab og holdsporing peger samme vej: Rønne, Knudsker, Aakirkeby/Nyvest m.fl. fortsætter under `Serie 2` fra 2016/17, og ingen Bornholm-klub forekommer i Kredsserie Vest eller Danmarksserien. `Bornholmsserien` blev dermed ikke lagt ind i en national eller vestlig topserie; det selvstændige serienavn blev udfaset. Dataene viser fortsat Serie 2/3 i 2016/17, ingen regionstilknyttede seniorgrupper i 2017/18–2019/20 og Serie 2–5-varianter derefter. Dette er afklaret som regionalt scope, ikke som en dokumenteret organisatorisk beslutningsdato.

## 3. Forbindelser opad og nedad

Den vestlige struktur har eksplicitte gruppeetiketter, som dokumenterer en treleddet forbindelse i de år hvor de forekommer:

- `Kredsserie Vest` → Danmarksserien: fx 2019/20 `Oprykningsspil fra Kredsserien Vest til Danmarksserien Pulje 1/2` (`oprykningsspil`), og 2021/22 `Oprykning til Danmarksserie pulje 1/2`.
- Kredsserie Vest → Serie 1 Vest: fx 2019/20 `Nedrykningsspil fra Kredsserien Vest til Serie 1 Pulje 1/2` (`nedrykningsspil`). Den modsatte retning står også eksplicit i `Serie 1 Vest` som `Oprykningsspil ... til Kredsserien Vest`.
- København har fra 2022/23 `Københavnsserien / Oprykning til Danmarksserien` (`oprykningsspil`) og fra 2025/26 `Nedrykning til serie 1` (`nedrykningsspil`).

Sjællandsserien og LF-Serien har velklassificerede `Oprykning`/`Nedrykning`-navne, men de angiver ikke altid mål-/kildeniveauet. De er derfor ikke nok til at kode en fast DS- eller Serie 1-forbindelse uden videre kontrol. Der findes heller ikke en ensartet pointgrænse eller rækkeform: de rå underliggende navne varierer mellem fx `Serie 1 Vest`, `Serie 2 (4+2)`, `Serie 2, 6+4 Nord`, senior-/herre-/double-rækker og blandede Serie 1–2/2–3-rækker.

## 4. `group_type_katalog`-stikprøve

De klassiske topserieforløb er overvejende rigtigt katalogiseret: Bornholmsserien (5/5 topgruppeforekomster) er `grundspil`; Sjællandsserien har 32 `grundspil`, 13 `oprykningsspil`, 14 `nedrykningsspil` og 2 `slutspil`; LF-familien har 21 `grundspil`, 5 `oprykningsspil`, 5 `nedrykningsspil` og 2 `slutspil` i stikprøven.

Kataloget er dog ikke komplet for regional kvalifikation. Der er **17 distinkte** top-orienterede kombinationer med `andet/ukendt`, herunder:

- `KS-nedryk` og `KS-opryk` (København),
- `Kvalifikation til Kredsserien Vest / Kvalifikation Pulje A–D`,
- `Kredsserie Vest / Kvalifikation til Danmarksserien Vest Pulje 1/2`,
- `Kredsserien Vest / Kvalkamp` og `Kvalifikation til Danmarksserien pulje A/B`,
- `Kvalifikation til Kredsserien Vest (runde 12) / Kvalifikationsevent kamp 9/14/15/16`.

Det er samme type variant-/forkortelseshul som 093 fandt, men denne opgave ændrer bevidst ikke kataloget. En senere implementationsopgave skal afklare om disse er `kvalifikation_op`, `kvalifikation_ned` eller en neutral kvalifikation før klassifikation automatiseres.

## Konsekvens for en senere 089/092-udvidelse

En senere generator skal være regions- og periodebevidst: den må ikke forsøge én global `levelFromDivision()` for alle rækker under Danmarksserien. Et muligt næste trin er en eksplicit, versioneret mapping fra `(region_id, season interval, division_name_raw family)` til regionalt niveau, hvor de 25 åbne celler forbliver ekskluderet, indtil de er afklaret.
## Opfølgning fra opgave 096 — Kredsserie Vest

Opgave 096 har gennemgået samtlige markerede `(O)`/`(N)`-hold i de vestlige Kredsserie-data 2016/17–2026/27. I den første komplette datasætsæson, 2016/17, er alle fire grundspilspuljer koblet til **samme** fire regioner: Midtjylland (4), Nordjylland (5), Sønderjylland (6) og Fyn (7). De 11 markerede startteams fordeler sig på 5 dokumenterede nedrykninger fra Danmarksserien/3. division, 5 dokumenterede Serie 1 Vest-forfremmelser og 1 ukendt (Lystrup). Det dokumenterer startfeltets blandede tilgang, men ikke oprettelsesdatoen.

Ekstern kildekontrol fandt et Midtjylland-dokument fra 2015, som allerede omtaler `Kredsserien Vest`, og fælles vestlige reglementer for de fire regioner. Der er **ikke fundet** en officiel kilde, som fastslår en organisatorisk sammenlægning i 2016/17 eller dens begrundelse. Derfor er 2016/17 første komplette observation i dette datasæt, ikke en bekræftet oprettelsesdato. Den fulde metode, sæsontabel, holdspor og links ligger i [096-kredsserien-vest-oprindelse.md](096-kredsserien-vest-oprindelse.md).
