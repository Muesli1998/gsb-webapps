# Opgave 158B — pointændring vs. kampe

**Status: fuldført.** 392/392 ugeopslag er valideret; alle konklusioner nedenfor bygger på gemte svar og eventtabeller, uden nulpoint for fravær.

## Udvalg

| Spiller | Profil-ID | Liste/parameter | Køn | Eventtabel: turnering / holdkamp / ukendt | Snapshots til stede / 49 |
|---|---:|---|---|---:|---:|
| Josefine Bille-Ahmt | 329159 | 288/K | kvinde | 34 / 6 / 0 | 49 / 49 |
| Benjamin Hinge Carlsson | 330650 | 288/M | mand | 24 / 5 / 0 | 49 / 49 |
| Louis Valdemar Hedegaard Toftlund | 330770 | 289/M | mand | 32 / 12 / 0 | 49 / 49 |
| Theodor Lumby Jessen | 327691 | 288/M | mand | 47 / 14 / 0 | 49 / 49 |
| Anna Rudolph | 328195 | 288/K | kvinde | 43 / 11 / 0 | 49 / 49 |
| Chastine Christiansen | 328196 | 288/K | kvinde | 0 / 1 / 0 | 35 / 49 |
| Sophia Rita Giuliani | 362606 | 288/K | kvinde | 0 / 1 / 0 | 35 / 49 |
| Guanyan Chen | 343986 | 288/M | mand | 50 / 13 / 0 | 49 / 49 |

De to profiler med kun holdkampe i deres eventtabel er Chastine Christiansen og Sophia Rita Giuliani (hver én holdkamprække, nul turneringsrækker). Guanyan Chen har både turneringer og holdkampe. Udvalget: 4 kvinder og 4 mænd.

## Hentning og genoptagelse

Før genoptagelse blev 180/180 tidligere snapshots valideret mod råsvar: `Version:`-datoen svarede til den ønskede mandag, og profil-ID stod i Udskriv-linket. Ugyldige: 0. De resterende 212 opslag blev hentet; i alt 392/392. Samlet brugt: 424/480 inkl. Del A. Kald 207 var et kontekst-GET, hvis HTTP-status ikke blev gemt før checkpointfejlen; det tælles som brugt, status står ukendt. Dets redigerede svar er 21.760 bytes, SHA-256 `B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39`. Calls-loggen blev efterfølgende rekonstrueret for kald 5–206 fra state og råfiler; tidsstempler for disse historiske entries var ikke gemt. Ny logning fra kald 208 er append-only og forudgår parsing/checkpoint.

## a) Eventpoint mod snapshots før/efter

Sammenligningen bruger første numeriske værdi i første del af Point-kolonnen for hver dateret eventrække. Før/efter er nærmeste snapshot strengt før og strengt efter eventdatoen.

| Spiller | Eventrækker m. point | Matcher ugen før | Matcher ugen efter | Begge | Ingen | Ikke sammenlignelige |
|---|---:|---:|---:|---:|---:|---:|
| Josefine Bille-Ahmt | 40 | 31 | 0 | 0 | 9 | 0 |
| Benjamin Hinge Carlsson | 29 | 27 | 0 | 2 | 0 | 0 |
| Louis Valdemar Hedegaard Toftlund | 44 | 37 | 0 | 0 | 7 | 0 |
| Theodor Lumby Jessen | 61 | 49 | 0 | 2 | 10 | 0 |
| Anna Rudolph | 54 | 51 | 0 | 1 | 2 | 0 |
| Chastine Christiansen | 1 | 0 | 0 | 0 | 0 | 1 |
| Sophia Rita Giuliani | 1 | 0 | 0 | 0 | 0 | 1 |
| Guanyan Chen | 63 | 56 | 0 | 0 | 7 | 0 |

**Samlet:** {"ugen_foer":251,"ugen_efter":0,"begge":5,"ingen":35,"ikke_sammenlignelig":2}. Blandt de sammenlignelige eventrækker matcher 251 kun snapshot før, 0 kun snapshot efter, og 5 begge; mønstret støtter entydigt, at Point-værdien er før-event-standen i denne prøve. For 35 rækker matcher værdien ingen af de to snapshots, så feltets betydning kan ikke fastslås for netop de rækker.

## b–d) Ugeklassifikation pr. spiller

Ugeintervallet er (forrige mandagsversion, aktuel mandagsversion]. Kun uger med spillerens række på begge snapshots kan klassificeres; fraværsuger er særskilt og aldrig sat til nul.

### Josefine Bille-Ahmt (329159)

| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |
|---|---:|---:|---:|---|
| 2025-07-28 | 1568 → 1568 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-04 | 1568 → 1568 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-11 | 1568 → 1568 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-18 | 1568 → 1602 | 34 | 4 (17-08-2025 Værløse U13 A [turnering]; 17-08-2025 Værløse U13 A [turnering]; 17-08-2025 Værløse U13 A [turnering]; 17-08-2025 Værløse U13 A [turnering]) | a_aendring_med_event |
| 2025-08-25 | 1602 → 1608 | 6 | 2 (24-08-2025 Lillerød U13 M [turnering]; 24-08-2025 Lillerød U13 M [turnering]) | a_aendring_med_event |
| 2025-09-01 | 1608 → 1608 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-08 | 1608 → 1608 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-15 | 1608 → 1625 | 17 | 3 (14-09-2025 Badminton Danmark U13 M VICTOR LBS i Hinnerup/Hammel SØFTEN KIC U13MD-U15B [turnering]; 14-09-2025 Badminton Danmark U13 M VICTOR LBS i Hinnerup/Hammel SØFTEN KIC U13MD-U15B [turnering]; 14-09-2025 Badminton Danmark U13 M VICTOR LBS i Hinnerup/Hammel SØFTEN KIC U13MD-U15B [turnering]) | a_aendring_med_event |
| 2025-09-22 | 1625 → 1645 | 20 | 2 (20-09-2025 Uge 38 - U13 A, 6000 (2+2) #487678 [holdkamp]; 20-09-2025 Uge 38 - U13 A, 6000 (2+2) #487676 [holdkamp]) | a_aendring_med_event |
| 2025-09-29 | 1645 → 1631 | -14 | 3 (28-09-2025 Aarhus AB U13 M [turnering]; 28-09-2025 Aarhus AB U13 M [turnering]; 28-09-2025 Aarhus AB U13 M [turnering]) | a_aendring_med_event |
| 2025-10-06 | 1631 → 1631 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-13 | 1631 → 1631 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-20 | 1631 → 1631 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-27 | 1631 → 1631 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-03 | 1631 → 1631 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-10 | 1631 → 1631 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-17 | 1631 → 1631 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-24 | 1631 → 1631 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-01 | 1631 → 1633 | 2 | 0 (—) | b_aendring_uden_event |
| 2025-12-08 | 1633 → 1633 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-15 | 1633 → 1633 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-22 | 1633 → 1633 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-29 | 1633 → 1633 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-05 | 1633 → 1643 | 10 | 3 (04-01-2026 Solrød Strand U13 M [turnering]; 04-01-2026 Solrød Strand U13 M [turnering]; 04-01-2026 Solrød Strand U13 M [turnering]) | a_aendring_med_event |
| 2026-01-12 | 1643 → 1643 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-19 | 1643 → 1643 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-26 | 1643 → 1643 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-02 | 1643 → 1643 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-09 | 1643 → 1643 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-16 | 1643 → 1653 | 10 | 2 (15-02-2026 Badminton Roskilde U13 M [turnering]; 15-02-2026 Badminton Roskilde U13 M [turnering]) | a_aendring_med_event |
| 2026-02-23 | 1653 → 1653 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-02 | 1653 → 1681 | 28 | 3 (01-03-2026 Ikast U13 M Ikast: U13M Badmintonhallen, Holing [turnering]; 01-03-2026 Ikast U13 M Ikast: U13M Badmintonhallen, Holing [turnering]; 01-03-2026 Ikast U13 M Ikast: U13M Badmintonhallen, Holing [turnering]) | a_aendring_med_event |
| 2026-03-09 | 1681 → 1681 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-16 | 1681 → 1761 | 80 | 5 (15-03-2026 Badminton Danmark U13 M VICTOR UDM, Brøndby [turnering]; 15-03-2026 Badminton Danmark U13 M VICTOR UDM, Brøndby [turnering]; 15-03-2026 Badminton Danmark U13 M VICTOR UDM, Brøndby [turnering]; 15-03-2026 Badminton Danmark U13 M VICTOR UDM, Brøndby [turnering]; 15-03-2026 Badminton Danmark U13 M VICTOR UDM, Brøndby [turnering]) | a_aendring_med_event |
| 2026-03-23 | 1761 → 1775 | 14 | 1 (17-03-2026 U13 (4+3) #505708 [holdkamp]) | a_aendring_med_event |
| 2026-03-30 | 1775 → 1769 | -6 | 1 (24-03-2026 U13 (4+3) #487688 [holdkamp]) | a_aendring_med_event |
| 2026-04-06 | 1769 → 1783 | 14 | 3 (02-04-2026 Dalum Hjallese BK U13 M [turnering]; 02-04-2026 Dalum Hjallese BK U13 M [turnering]; 02-04-2026 Dalum Hjallese BK U13 M [turnering]) | a_aendring_med_event |
| 2026-04-13 | 1783 → 1771 | -12 | 2 (11-04-2026 DMU Hold U13 (4+3) #506001 [holdkamp]; 12-04-2026 DMU Hold U13 (4+3) #506012 [holdkamp]) | a_aendring_med_event |
| 2026-04-20 | 1771 → 1771 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-27 | 1771 → 1771 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-04 | 1771 → 1771 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-11 | 1771 → 1771 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-18 | 1771 → 1771 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-25 | 1771 → 1880 | 109 | 6 (24-05-2026 Badminton Esbjerg U13 M [turnering]; 24-05-2026 Badminton Esbjerg U13 M [turnering]; 24-05-2026 Badminton Esbjerg U13 M [turnering]; 24-05-2026 Badminton Esbjerg U13 M [turnering]; 24-05-2026 Badminton Esbjerg U13 M [turnering]; 24-05-2026 Badminton Esbjerg U13 M [turnering]) | a_aendring_med_event |
| 2026-06-01 | 1880 → 1880 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-08 | 1880 → 1880 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-15 | 1880 → 1880 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-29 | 1880 → 1842 | -38 | 0 (—) | b_aendring_uden_event |

Uger: {"a_aendring_med_event":14,"b_aendring_uden_event":2,"c_event_uden_aendring":0,"d_ingen_af_delene":32,"ikke_sammenlignelig_fravaer":0}. Fraværsperioder (ingen nulpoint): ingen.

**Alle b) pointændring uden event:**
- 2025-11-24 → 2025-12-01: 1631 → 1633 (Δ 2), ingen eventrække.
- 2026-06-15 → 2026-06-29: 1880 → 1842 (Δ -38), ingen eventrække.

### Benjamin Hinge Carlsson (330650)

| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |
|---|---:|---:|---:|---|
| 2025-07-28 | 1619 → 1619 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-04 | 1619 → 1619 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-11 | 1619 → 1619 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-18 | 1619 → 1619 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-25 | 1619 → 1619 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-01 | 1619 → 1619 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-08 | 1619 → 1619 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-15 | 1619 → 1619 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-22 | 1619 → 1623 | 4 | 2 (20-09-2025 Uge 38 - U13 A, 6000 (2+2) #487679 [holdkamp]; 20-09-2025 Uge 38 - U13 A, 6000 (2+2) #487676 [holdkamp]) | a_aendring_med_event |
| 2025-09-29 | 1623 → 1627 | 4 | 3 (28-09-2025 Jyllinge U13 A [turnering]; 28-09-2025 Jyllinge U13 A [turnering]; 28-09-2025 Jyllinge U13 A [turnering]) | a_aendring_med_event |
| 2025-10-06 | 1627 → 1627 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-13 | 1627 → 1627 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-20 | 1627 → 1636 | 9 | 2 (18-10-2025 Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) [turnering]; 18-10-2025 Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) [turnering]) | a_aendring_med_event |
| 2025-10-27 | 1636 → 1648 | 12 | 1 (26-10-2025 U13 A, 6000 (2+2) #487893 [holdkamp]) | a_aendring_med_event |
| 2025-11-03 | 1648 → 1648 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-10 | 1648 → 1637 | -11 | 3 (09-11-2025 Holte U13 A [turnering]; 09-11-2025 Holte U13 A [turnering]; 09-11-2025 Holte U13 A [turnering]) | a_aendring_med_event |
| 2025-11-17 | 1637 → 1637 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-24 | 1637 → 1637 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-01 | 1637 → 1637 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-08 | 1637 → 1633 | -4 | 2 (03-12-2025 Badminton København U13 M [turnering]; 03-12-2025 Badminton København U13 M [turnering]) | a_aendring_med_event |
| 2025-12-15 | 1633 → 1633 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-22 | 1633 → 1633 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-29 | 1633 → 1633 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-05 | 1633 → 1658 | 25 | 3 (30-12-2025 Solrød Strand U13 A [turnering]; 30-12-2025 Solrød Strand U13 A [turnering]; 30-12-2025 Solrød Strand U13 A [turnering]) | a_aendring_med_event |
| 2026-01-12 | 1658 → 1658 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-19 | 1658 → 1658 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-26 | 1658 → 1658 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-02 | 1658 → 1658 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-09 | 1658 → 1658 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-16 | 1658 → 1658 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-23 | 1658 → 1658 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-02 | 1658 → 1677 | 19 | 3 (01-03-2026 Gladsaxe Søborg U13 A [turnering]; 01-03-2026 Gladsaxe Søborg U13 A [turnering]; 01-03-2026 Gladsaxe Søborg U13 A [turnering]) | a_aendring_med_event |
| 2026-03-09 | 1677 → 1677 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-16 | 1677 → 1677 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-23 | 1677 → 1677 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-30 | 1677 → 1736 | 59 | 6 (29-03-2026 Badminton Danmark U13 A VICTOR DMU, U13A SKOVPARKHALLEN, Nyborg) [turnering]; 29-03-2026 Badminton Danmark U13 A VICTOR DMU, U13A SKOVPARKHALLEN, Nyborg) [turnering]; 29-03-2026 Badminton Danmark U13 A VICTOR DMU, U13A SKOVPARKHALLEN, Nyborg) [turnering]; 29-03-2026 Badminton Danmark U13 A VICTOR DMU, U13A SKOVPARKHALLEN, Nyborg) [turnering]; 29-03-2026 Badminton Danmark U13 A VICTOR DMU, U13A SKOVPARKHALLEN, Nyborg) [turnering]; 29-03-2026 Badminton Danmark U13 A VICTOR DMU, U13A SKOVPARKHALLEN, Nyborg) [turnering]) | a_aendring_med_event |
| 2026-04-06 | 1736 → 1736 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-13 | 1736 → 1736 | 0 | 2 (11-04-2026 DMU Hold U13A 2+2 (6000) #506563 [holdkamp]; 12-04-2026 DMU Hold U13A 2+2 (6000) #506571 [holdkamp]) | c_event_uden_aendring |
| 2026-04-20 | 1736 → 1740 | 4 | 2 (19-04-2026 Nordsjælland U13 A [turnering]; 19-04-2026 Nordsjælland U13 A [turnering]) | a_aendring_med_event |
| 2026-04-27 | 1740 → 1740 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-04 | 1740 → 1740 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-11 | 1740 → 1740 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-18 | 1740 → 1740 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-25 | 1740 → 1740 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-01 | 1740 → 1740 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-08 | 1740 → 1740 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-15 | 1740 → 1740 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-29 | 1740 → 1705 | -35 | 0 (—) | b_aendring_uden_event |

Uger: {"a_aendring_med_event":10,"b_aendring_uden_event":1,"c_event_uden_aendring":1,"d_ingen_af_delene":36,"ikke_sammenlignelig_fravaer":0}. Fraværsperioder (ingen nulpoint): ingen.

**Alle b) pointændring uden event:**
- 2026-06-15 → 2026-06-29: 1740 → 1705 (Δ -35), ingen eventrække.

**Alle c) event uden pointændring:**
- 2026-04-06 → 2026-04-13: 1736 → 1736 (Δ 0); 11-04-2026 DMU Hold U13A 2+2 (6000) #506563 [holdkamp]; 12-04-2026 DMU Hold U13A 2+2 (6000) #506571 [holdkamp].

### Louis Valdemar Hedegaard Toftlund (330770)

| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |
|---|---:|---:|---:|---|
| 2025-07-28 | 1413 → 1413 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-04 | 1413 → 1413 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-11 | 1413 → 1413 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-18 | 1413 → 1413 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-25 | 1413 → 1447 | 34 | 4 (24-08-2025 Nr. Lyndelse U15 B [turnering]; 24-08-2025 Nr. Lyndelse U15 B [turnering]; 24-08-2025 Nr. Lyndelse U15 B [turnering]; 24-08-2025 Nr. Lyndelse U15 B [turnering]) | a_aendring_med_event |
| 2025-09-01 | 1447 → 1447 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-08 | 1447 → 1515 | 68 | 4 (07-09-2025 Dalum Hjallese BK U15 B [turnering]; 07-09-2025 Dalum Hjallese BK U15 B [turnering]; 07-09-2025 Dalum Hjallese BK U15 B [turnering]; 07-09-2025 Dalum Hjallese BK U15 B [turnering]) | a_aendring_med_event |
| 2025-09-15 | 1515 → 1515 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-22 | 1515 → 1535 | 20 | 2 (20-09-2025 Uge 38 - U13 A, 6000 (2+2) #487679 [holdkamp]; 20-09-2025 Uge 38 - U13 A, 6000 (2+2) #487676 [holdkamp]) | a_aendring_med_event |
| 2025-09-29 | 1535 → 1535 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-06 | 1535 → 1555 | 20 | 2 (05-10-2025 Skalborg SK U15 A [turnering]; 05-10-2025 Skalborg SK U15 A [turnering]) | a_aendring_med_event |
| 2025-10-13 | 1555 → 1555 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-20 | 1555 → 1555 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-27 | 1555 → 1555 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-03 | 1555 → 1563 | 8 | 2 (02-11-2025 Slagelse U15 A [turnering]; 02-11-2025 Slagelse U15 A [turnering]) | a_aendring_med_event |
| 2025-11-10 | 1563 → 1563 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-17 | 1563 → 1563 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-24 | 1563 → 1563 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-01 | 1563 → 1600 | 37 | 4 (30-11-2025 Badminton København U15 A KMU 2025 [turnering]; 30-11-2025 Badminton København U15 A KMU 2025 [turnering]; 30-11-2025 Badminton København U15 A KMU 2025 [turnering]; 30-11-2025 Badminton København U15 A KMU 2025 [turnering]) | a_aendring_med_event |
| 2025-12-08 | 1600 → 1614 | 14 | 1 (07-12-2025 U15 B 6400 (4 spillere) BD #493897 [holdkamp]) | a_aendring_med_event |
| 2025-12-15 | 1614 → 1613 | -1 | 0 (—) | b_aendring_uden_event |
| 2025-12-22 | 1613 → 1613 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-29 | 1613 → 1613 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-05 | 1613 → 1615 | 2 | 3 (04-01-2026 Gentofte U15 A [turnering]; 04-01-2026 Gentofte U15 A [turnering]; 04-01-2026 Gentofte U15 A [turnering]) | a_aendring_med_event |
| 2026-01-12 | 1615 → 1623 | 8 | 1 (11-01-2026 U15 A, 6800 (2+2) #487801 [holdkamp]) | a_aendring_med_event |
| 2026-01-19 | 1623 → 1635 | 12 | 2 (18-01-2026 Nykøbing F U15 A [turnering]; 18-01-2026 Nykøbing F U15 A [turnering]) | a_aendring_med_event |
| 2026-01-26 | 1635 → 1635 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-02 | 1635 → 1635 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-09 | 1635 → 1635 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-16 | 1635 → 1635 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-23 | 1635 → 1655 | 20 | 2 (21-02-2026 U15 B 6400 (4 spillere) BD #493917 [holdkamp]; 21-02-2026 U15 B 6400 (4 spillere) BD #493915 [holdkamp]) | a_aendring_med_event |
| 2026-03-02 | 1655 → 1660 | 5 | 2 (01-03-2026 Gladsaxe Søborg U15 A [turnering]; 01-03-2026 Gladsaxe Søborg U15 A [turnering]) | a_aendring_med_event |
| 2026-03-09 | 1660 → 1660 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-16 | 1660 → 1660 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-23 | 1660 → 1670 | 10 | 2 (22-03-2026 U15 B 6400 (4 spillere) BD #493927 [holdkamp]; 22-03-2026 U15 B 6400 (4 spillere) BD #493926 [holdkamp]) | a_aendring_med_event |
| 2026-03-30 | 1670 → 1686 | 16 | 3 (29-03-2026 Badminton Danmark U15 A VICTOR DMU, U15ABCD ØRBÆKHALLEN [turnering]; 29-03-2026 Badminton Danmark U15 A VICTOR DMU, U15ABCD ØRBÆKHALLEN [turnering]; 29-03-2026 Badminton Danmark U15 A VICTOR DMU, U15ABCD ØRBÆKHALLEN [turnering]) | a_aendring_med_event |
| 2026-04-06 | 1686 → 1686 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-13 | 1686 → 1745 | 59 | 4 (11-04-2026 DMU Hold U15B (6400) - 4 Spillere #506126 [holdkamp]; 11-04-2026 DMU Hold U15B (6400) - 4 Spillere #506124 [holdkamp]; 11-04-2026 DMU Hold U15B (6400) - 4 Spillere #506122 [holdkamp]; 12-04-2026 DMU Hold U15B (6400) - 4 Spillere #506729 [holdkamp]) | a_aendring_med_event |
| 2026-04-20 | 1745 → 1745 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-27 | 1745 → 1745 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-04 | 1745 → 1745 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-11 | 1745 → 1745 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-18 | 1745 → 1745 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-25 | 1745 → 1758 | 13 | 3 (24-05-2026 Birkerød BK13 U15 A [turnering]; 24-05-2026 Birkerød BK13 U15 A [turnering]; 24-05-2026 Birkerød BK13 U15 A [turnering]) | a_aendring_med_event |
| 2026-06-01 | 1758 → 1758 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-08 | 1758 → 1758 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-15 | 1758 → 1793 | 35 | 3 (14-06-2026 Taastrup BC U15 A [turnering]; 14-06-2026 Taastrup BC U15 A [turnering]; 14-06-2026 Taastrup BC U15 A [turnering]) | a_aendring_med_event |
| 2026-06-29 | 1793 → 1739 | -54 | 0 (—) | b_aendring_uden_event |

Uger: {"a_aendring_med_event":17,"b_aendring_uden_event":2,"c_event_uden_aendring":0,"d_ingen_af_delene":29,"ikke_sammenlignelig_fravaer":0}. Fraværsperioder (ingen nulpoint): ingen.

**Alle b) pointændring uden event:**
- 2025-12-08 → 2025-12-15: 1614 → 1613 (Δ -1), ingen eventrække.
- 2026-06-15 → 2026-06-29: 1793 → 1739 (Δ -54), ingen eventrække.

### Theodor Lumby Jessen (327691)

| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |
|---|---:|---:|---:|---|
| 2025-07-28 | 1674 → 1674 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-04 | 1674 → 1674 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-11 | 1674 → 1674 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-18 | 1674 → 1674 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-25 | 1674 → 1665 | -9 | 2 (24-08-2025 Humlebæk U15 A [turnering]; 24-08-2025 Humlebæk U15 A [turnering]) | a_aendring_med_event |
| 2025-09-01 | 1665 → 1665 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-08 | 1665 → 1664 | -1 | 2 (07-09-2025 Køge U15 A [turnering]; 07-09-2025 Køge U15 A [turnering]) | a_aendring_med_event |
| 2025-09-15 | 1664 → 1664 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-22 | 1664 → 1664 | 0 | 2 (21-09-2025 Uge 38 - U15 A, 6800 (2+2) #487720 [holdkamp]; 21-09-2025 Uge 38 - U15 A, 6800 (2+2) #487719 [holdkamp]) | c_event_uden_aendring |
| 2025-09-29 | 1664 → 1656 | -8 | 2 (28-09-2025 Jyllinge U15 A [turnering]; 28-09-2025 Jyllinge U15 A [turnering]) | a_aendring_med_event |
| 2025-10-06 | 1656 → 1684 | 28 | 2 (05-10-2025 U15 B 6400 (4 spillere) BD #493887 [holdkamp]; 05-10-2025 U15 B 6400 (4 spillere) BD #493884 [holdkamp]) | a_aendring_med_event |
| 2025-10-13 | 1684 → 1684 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-20 | 1684 → 1684 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-27 | 1684 → 1684 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-03 | 1684 → 1672 | -12 | 2 (02-11-2025 Slagelse U15 A [turnering]; 02-11-2025 Slagelse U15 A [turnering]) | a_aendring_med_event |
| 2025-11-10 | 1672 → 1658 | -14 | 3 (09-11-2025 KMB2010 U15 A [turnering]; 09-11-2025 KMB2010 U15 A [turnering]; 09-11-2025 KMB2010 U15 A [turnering]) | a_aendring_med_event |
| 2025-11-17 | 1658 → 1657 | -1 | 0 (—) | b_aendring_uden_event |
| 2025-11-24 | 1657 → 1700 | 43 | 3 (23-11-2025 Aabenraa U15 A [turnering]; 23-11-2025 Aabenraa U15 A [turnering]; 23-11-2025 Aabenraa U15 A [turnering]) | a_aendring_med_event |
| 2025-12-01 | 1700 → 1728 | 28 | 3 (30-11-2025 Badminton København U15 A KMU 2025 [turnering]; 30-11-2025 Badminton København U15 A KMU 2025 [turnering]; 30-11-2025 Badminton København U15 A KMU 2025 [turnering]) | a_aendring_med_event |
| 2025-12-08 | 1728 → 1712 | -16 | 1 (07-12-2025 U15 B 6400 (4 spillere) BD #493897 [holdkamp]) | a_aendring_med_event |
| 2025-12-15 | 1712 → 1696 | -16 | 2 (14-12-2025 Helsinge U15 A [turnering]; 14-12-2025 Helsinge U15 A [turnering]) | a_aendring_med_event |
| 2025-12-22 | 1696 → 1696 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-29 | 1696 → 1696 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-05 | 1696 → 1696 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-12 | 1696 → 1719 | 23 | 2 (11-01-2026 U15 B 6400 (4 spillere) BD #493907 [holdkamp]; 11-01-2026 U15 B 6400 (4 spillere) BD #493905 [holdkamp]) | a_aendring_med_event |
| 2026-01-19 | 1719 → 1727 | 8 | 3 (18-01-2026 Nykøbing F U15 A [turnering]; 18-01-2026 Nykøbing F U15 A [turnering]; 18-01-2026 Nykøbing F U15 A [turnering]) | a_aendring_med_event |
| 2026-01-26 | 1727 → 1727 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-02 | 1727 → 1727 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-09 | 1727 → 1727 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-16 | 1727 → 1727 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-23 | 1727 → 1747 | 20 | 2 (21-02-2026 U15 B 6400 (4 spillere) BD #493917 [holdkamp]; 21-02-2026 U15 B 6400 (4 spillere) BD #493915 [holdkamp]) | a_aendring_med_event |
| 2026-03-02 | 1747 → 1773 | 26 | 4 (01-03-2026 Gladsaxe Søborg U15 A [turnering]; 01-03-2026 Gladsaxe Søborg U15 A [turnering]; 01-03-2026 Gladsaxe Søborg U15 A [turnering]; 01-03-2026 Gladsaxe Søborg U15 A [turnering]) | a_aendring_med_event |
| 2026-03-09 | 1773 → 1773 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-16 | 1773 → 1781 | 8 | 2 (15-03-2026 Drive U15 A [turnering]; 15-03-2026 Drive U15 A [turnering]) | a_aendring_med_event |
| 2026-03-23 | 1781 → 1788 | 7 | 2 (22-03-2026 U15 B 6400 (4 spillere) BD #493927 [holdkamp]; 22-03-2026 U15 B 6400 (4 spillere) BD #493926 [holdkamp]) | a_aendring_med_event |
| 2026-03-30 | 1788 → 1808 | 20 | 3 (29-03-2026 Badminton Danmark U15 A VICTOR DMU, U15ABCD ØRBÆKHALLEN [turnering]; 29-03-2026 Badminton Danmark U15 A VICTOR DMU, U15ABCD ØRBÆKHALLEN [turnering]; 29-03-2026 Badminton Danmark U15 A VICTOR DMU, U15ABCD ØRBÆKHALLEN [turnering]) | a_aendring_med_event |
| 2026-04-06 | 1808 → 1808 | 0 | 2 (06-04-2026 Solrød Strand U15 A Påsketurnering i Havdrup [turnering]; 06-04-2026 Solrød Strand U15 A Påsketurnering i Havdrup [turnering]) | c_event_uden_aendring |
| 2026-04-13 | 1808 → 1805 | -3 | 3 (11-04-2026 DMU Hold U15B (6400) - 4 Spillere #506122 [holdkamp]; 12-04-2026 DMU Hold U15B (6400) - 4 Spillere #506730 [holdkamp]; 12-04-2026 DMU Hold U15B (6400) - 4 Spillere #506729 [holdkamp]) | a_aendring_med_event |
| 2026-04-20 | 1805 → 1805 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-27 | 1805 → 1805 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-04 | 1805 → 1805 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-11 | 1805 → 1805 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-18 | 1805 → 1825 | 20 | 3 (17-05-2026 Farum U15 A Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U15 A Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U15 A Farum: Specielle tilmeldingsbetingelser [turnering]) | a_aendring_med_event |
| 2026-05-25 | 1825 → 1841 | 16 | 3 (24-05-2026 Birkerød BK13 U15 A [turnering]; 24-05-2026 Birkerød BK13 U15 A [turnering]; 24-05-2026 Birkerød BK13 U15 A [turnering]) | a_aendring_med_event |
| 2026-06-01 | 1841 → 1841 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-08 | 1841 → 1845 | 4 | 4 (07-06-2026 Storstrømmen U15 A Storstrømmen (Tune) [turnering]; 07-06-2026 Storstrømmen U15 A Storstrømmen (Tune) [turnering]; 07-06-2026 Storstrømmen U15 A Storstrømmen (Tune) [turnering]; 07-06-2026 Storstrømmen U15 A Storstrømmen (Tune) [turnering]) | a_aendring_med_event |
| 2026-06-15 | 1845 → 1859 | 14 | 4 (14-06-2026 Taastrup BC U15 A [turnering]; 14-06-2026 Taastrup BC U15 A [turnering]; 14-06-2026 Taastrup BC U15 A [turnering]; 14-06-2026 Taastrup BC U15 A [turnering]) | a_aendring_med_event |
| 2026-06-29 | 1859 → 1803 | -56 | 0 (—) | b_aendring_uden_event |

Uger: {"a_aendring_med_event":22,"b_aendring_uden_event":2,"c_event_uden_aendring":2,"d_ingen_af_delene":22,"ikke_sammenlignelig_fravaer":0}. Fraværsperioder (ingen nulpoint): ingen.

**Alle b) pointændring uden event:**
- 2025-11-10 → 2025-11-17: 1658 → 1657 (Δ -1), ingen eventrække.
- 2026-06-15 → 2026-06-29: 1859 → 1803 (Δ -56), ingen eventrække.

**Alle c) event uden pointændring:**
- 2025-09-15 → 2025-09-22: 1664 → 1664 (Δ 0); 21-09-2025 Uge 38 - U15 A, 6800 (2+2) #487720 [holdkamp]; 21-09-2025 Uge 38 - U15 A, 6800 (2+2) #487719 [holdkamp].
- 2026-03-30 → 2026-04-06: 1808 → 1808 (Δ 0); 06-04-2026 Solrød Strand U15 A Påsketurnering i Havdrup [turnering]; 06-04-2026 Solrød Strand U15 A Påsketurnering i Havdrup [turnering].

### Anna Rudolph (328195)

| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |
|---|---:|---:|---:|---|
| 2025-07-28 | 1698 → 1698 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-04 | 1698 → 1698 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-11 | 1698 → 1698 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-18 | 1698 → 1697 | -1 | 2 (17-08-2025 Værløse U15 M [turnering]; 17-08-2025 Værløse U15 M [turnering]) | a_aendring_med_event |
| 2025-08-25 | 1697 → 1708 | 11 | 3 (24-08-2025 Greve U15 M [turnering]; 24-08-2025 Greve U15 M [turnering]; 24-08-2025 Greve U15 M [turnering]) | a_aendring_med_event |
| 2025-09-01 | 1708 → 1708 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-08 | 1708 → 1717 | 9 | 2 (07-09-2025 Køge U15 M [turnering]; 07-09-2025 Køge U15 M [turnering]) | a_aendring_med_event |
| 2025-09-15 | 1717 → 1697 | -20 | 3 (14-09-2025 Badminton Danmark U15 M VICTOR LBS i Hinnerup/Hammel HAMMEL IC U15M-U17M-U19M- U17/U19A [turnering]; 14-09-2025 Badminton Danmark U15 M VICTOR LBS i Hinnerup/Hammel HAMMEL IC U15M-U17M-U19M- U17/U19A [turnering]; 14-09-2025 Badminton Danmark U15 M VICTOR LBS i Hinnerup/Hammel HAMMEL IC U15M-U17M-U19M- U17/U19A [turnering]) | a_aendring_med_event |
| 2025-09-22 | 1697 → 1675 | -22 | 2 (21-09-2025 Uge 38 - U15 A, 6800 (2+2) #487720 [holdkamp]; 21-09-2025 Uge 38 - U15 A, 6800 (2+2) #487719 [holdkamp]) | a_aendring_med_event |
| 2025-09-29 | 1675 → 1675 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-06 | 1675 → 1675 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-13 | 1675 → 1675 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-20 | 1675 → 1667 | -8 | 3 (18-10-2025 Badminton Danmark U15 M VICTOR DENMARK JUNIOR (U15M Paarup/U15A Paarup to.-Næsby fr.) [turnering]; 18-10-2025 Badminton Danmark U15 M VICTOR DENMARK JUNIOR (U15M Paarup/U15A Paarup to.-Næsby fr.) [turnering]; 18-10-2025 Badminton Danmark U15 M VICTOR DENMARK JUNIOR (U15M Paarup/U15A Paarup to.-Næsby fr.) [turnering]) | a_aendring_med_event |
| 2025-10-27 | 1667 → 1663 | -4 | 1 (25-10-2025 U15 A, 6800 (2+2) #487794 [holdkamp]) | a_aendring_med_event |
| 2025-11-03 | 1663 → 1663 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-10 | 1663 → 1669 | 6 | 3 (09-11-2025 KMB2010 U15 M [turnering]; 09-11-2025 KMB2010 U15 M [turnering]; 09-11-2025 KMB2010 U15 M [turnering]) | a_aendring_med_event |
| 2025-11-17 | 1669 → 1683 | 14 | 1 (16-11-2025 U15 A, 6800 (2+2) #487796 [holdkamp]) | a_aendring_med_event |
| 2025-11-24 | 1683 → 1681 | -2 | 3 (23-11-2025 Næstved-Herlufsholm U15 M [turnering]; 23-11-2025 Næstved-Herlufsholm U15 M [turnering]; 23-11-2025 Næstved-Herlufsholm U15 M [turnering]) | a_aendring_med_event |
| 2025-12-01 | 1681 → 1681 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-08 | 1681 → 1687 | 6 | 3 (03-12-2025 Badminton København U15 E [turnering]; 03-12-2025 Badminton København U15 E [turnering]; 07-12-2025 U15 A, 6800 (2+2) #487798 [holdkamp]) | a_aendring_med_event |
| 2025-12-15 | 1687 → 1686 | -1 | 0 (—) | b_aendring_uden_event |
| 2025-12-22 | 1686 → 1686 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-29 | 1686 → 1662 | -24 | 2 (28-12-2025 Greve U15 M [turnering]; 28-12-2025 Greve U15 M [turnering]) | a_aendring_med_event |
| 2026-01-05 | 1662 → 1662 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-12 | 1662 → 1676 | 14 | 1 (11-01-2026 U15 A, 6800 (2+2) #487801 [holdkamp]) | a_aendring_med_event |
| 2026-01-19 | 1676 → 1676 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-26 | 1676 → 1723 | 47 | 5 (25-01-2026 Badminton Danmark U14 M VICTOR LMU U14M, Viby Badmintonhal [turnering]; 25-01-2026 Badminton Danmark U14 M VICTOR LMU U14M, Viby Badmintonhal [turnering]; 25-01-2026 Badminton Danmark U14 M VICTOR LMU U14M, Viby Badmintonhal [turnering]; 25-01-2026 Badminton Danmark U14 M VICTOR LMU U14M, Viby Badmintonhal [turnering]; 25-01-2026 Badminton Danmark U14 M VICTOR LMU U14M, Viby Badmintonhal [turnering]) | a_aendring_med_event |
| 2026-02-02 | 1723 → 1737 | 14 | 1 (01-02-2026 U15 A, 6800 (2+2) #487804 [holdkamp]) | a_aendring_med_event |
| 2026-02-09 | 1737 → 1737 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-16 | 1737 → 1737 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-23 | 1737 → 1737 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-02 | 1737 → 1737 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-09 | 1737 → 1737 | 0 | 1 (08-03-2026 U15 A, 6800 (2+2) #487807 [holdkamp]) | c_event_uden_aendring |
| 2026-03-16 | 1737 → 1755 | 18 | 3 (15-03-2026 Solrød Strand U15 M [turnering]; 15-03-2026 Solrød Strand U15 M [turnering]; 15-03-2026 Solrød Strand U15 M [turnering]) | a_aendring_med_event |
| 2026-03-23 | 1755 → 1755 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-30 | 1755 → 1745 | -10 | 3 (29-03-2026 Badminton Danmark U15 M VICTOR DMU, U13MB-U15M NYBORGHALLEN [turnering]; 29-03-2026 Badminton Danmark U15 M VICTOR DMU, U13MB-U15M NYBORGHALLEN [turnering]; 29-03-2026 Badminton Danmark U15 M VICTOR DMU, U13MB-U15M NYBORGHALLEN [turnering]) | a_aendring_med_event |
| 2026-04-06 | 1745 → 1745 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-13 | 1745 → 1759 | 14 | 3 (11-04-2026 DMU Hold U15B (6400) - 4 Spillere #506126 [holdkamp]; 11-04-2026 DMU Hold U15B (6400) - 4 Spillere #506124 [holdkamp]; 12-04-2026 DMU Hold U15B (6400) - 4 Spillere #506730 [holdkamp]) | a_aendring_med_event |
| 2026-04-20 | 1759 → 1759 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-27 | 1759 → 1774 | 15 | 3 (26-04-2026 Badminton Danmark U15 M Badminton Danmark (Horsens) [turnering]; 26-04-2026 Badminton Danmark U15 M Badminton Danmark (Horsens) [turnering]; 26-04-2026 Badminton Danmark U15 M Badminton Danmark (Horsens) [turnering]) | a_aendring_med_event |
| 2026-05-04 | 1774 → 1774 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-11 | 1774 → 1781 | 7 | 3 (10-05-2026 Slangerup U15 M [turnering]; 10-05-2026 Slangerup U15 M [turnering]; 10-05-2026 Slangerup U15 M [turnering]) | a_aendring_med_event |
| 2026-05-18 | 1781 → 1793 | 12 | 3 (17-05-2026 Farum U15 M Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U15 M Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U15 M Farum: Specielle tilmeldingsbetingelser [turnering]) | a_aendring_med_event |
| 2026-05-25 | 1793 → 1793 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-01 | 1793 → 1793 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-08 | 1793 → 1793 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-15 | 1793 → 1793 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-29 | 1793 → 1739 | -54 | 0 (—) | b_aendring_uden_event |

Uger: {"a_aendring_med_event":21,"b_aendring_uden_event":2,"c_event_uden_aendring":1,"d_ingen_af_delene":24,"ikke_sammenlignelig_fravaer":0}. Fraværsperioder (ingen nulpoint): ingen.

**Alle b) pointændring uden event:**
- 2025-12-08 → 2025-12-15: 1687 → 1686 (Δ -1), ingen eventrække.
- 2026-06-15 → 2026-06-29: 1793 → 1739 (Δ -54), ingen eventrække.

**Alle c) event uden pointændring:**
- 2026-03-02 → 2026-03-09: 1737 → 1737 (Δ 0); 08-03-2026 U15 A, 6800 (2+2) #487807 [holdkamp].

### Chastine Christiansen (328196)

| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |
|---|---:|---:|---:|---|
| 2025-07-28 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-08-04 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-08-11 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-08-18 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-08-25 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-01 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-08 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-15 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-22 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-29 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-10-06 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-10-13 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-10-20 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-10-27 | ikke på listen → 1071 | ukendt | 1 (25-10-2025 U15 D, 4600 (4 piger) #491814 [holdkamp]) | ikke_sammenlignelig_fravaer |
| 2025-11-03 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-10 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-17 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-24 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-01 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-08 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-15 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-22 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-29 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-05 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-12 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-19 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-26 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-02 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-09 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-16 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-23 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-02 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-09 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-16 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-23 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-30 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-06 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-13 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-20 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-27 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-04 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-11 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-18 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-25 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-01 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-08 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-15 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-29 | 1071 → 1039 | -32 | 0 (—) | b_aendring_uden_event |

Uger: {"a_aendring_med_event":0,"b_aendring_uden_event":1,"c_event_uden_aendring":0,"d_ingen_af_delene":33,"ikke_sammenlignelig_fravaer":14}. Fraværsperioder (ingen nulpoint): 2025-07-21–2025-10-20 (14 uger); tilbage 2025-10-27.

**Alle b) pointændring uden event:**
- 2026-06-15 → 2026-06-29: 1071 → 1039 (Δ -32), ingen eventrække.

### Sophia Rita Giuliani (362606)

| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |
|---|---:|---:|---:|---|
| 2025-07-28 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-08-04 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-08-11 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-08-18 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-08-25 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-01 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-08 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-15 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-22 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-09-29 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-10-06 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-10-13 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-10-20 | ikke på listen → ikke på listen | ukendt | 0 (—) | ikke_sammenlignelig_fravaer |
| 2025-10-27 | ikke på listen → 1071 | ukendt | 1 (25-10-2025 U15 D, 4600 (4 piger) #491814 [holdkamp]) | ikke_sammenlignelig_fravaer |
| 2025-11-03 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-10 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-17 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-24 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-01 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-08 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-15 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-22 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-29 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-05 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-12 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-19 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-26 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-02 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-09 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-16 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-23 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-02 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-09 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-16 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-23 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-30 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-06 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-13 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-20 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-27 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-04 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-11 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-18 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-25 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-01 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-08 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-15 | 1071 → 1071 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-29 | 1071 → 1039 | -32 | 0 (—) | b_aendring_uden_event |

Uger: {"a_aendring_med_event":0,"b_aendring_uden_event":1,"c_event_uden_aendring":0,"d_ingen_af_delene":33,"ikke_sammenlignelig_fravaer":14}. Fraværsperioder (ingen nulpoint): 2025-07-21–2025-10-20 (14 uger); tilbage 2025-10-27.

**Alle b) pointændring uden event:**
- 2026-06-15 → 2026-06-29: 1071 → 1039 (Δ -32), ingen eventrække.

### Guanyan Chen (343986)

| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |
|---|---:|---:|---:|---|
| 2025-07-28 | 1575 → 1575 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-04 | 1575 → 1575 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-11 | 1575 → 1575 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-08-18 | 1575 → 1599 | 24 | 3 (17-08-2025 Værløse U13 A [turnering]; 17-08-2025 Værløse U13 A [turnering]; 17-08-2025 Værløse U13 A [turnering]) | a_aendring_med_event |
| 2025-08-25 | 1599 → 1599 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-01 | 1599 → 1599 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-08 | 1599 → 1599 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-15 | 1599 → 1599 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-09-22 | 1599 → 1609 | 10 | 3 (21-09-2025 Slangerup U13 A [turnering]; 21-09-2025 Slangerup U13 A [turnering]; 21-09-2025 Slangerup U13 A [turnering]) | a_aendring_med_event |
| 2025-09-29 | 1609 → 1641 | 32 | 4 (28-09-2025 Jyllinge U13 A [turnering]; 28-09-2025 Jyllinge U13 A [turnering]; 28-09-2025 Jyllinge U13 A [turnering]; 28-09-2025 Jyllinge U13 A [turnering]) | a_aendring_med_event |
| 2025-10-06 | 1641 → 1621 | -20 | 2 (05-10-2025 U15 B 6400 (4 spillere) BD #493887 [holdkamp]; 05-10-2025 U15 B 6400 (4 spillere) BD #493885 [holdkamp]) | a_aendring_med_event |
| 2025-10-13 | 1621 → 1621 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-10-20 | 1621 → 1672 | 51 | 5 (18-10-2025 Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) [turnering]; 18-10-2025 Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) [turnering]; 18-10-2025 Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) [turnering]; 18-10-2025 Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) [turnering]; 18-10-2025 Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) [turnering]) | a_aendring_med_event |
| 2025-10-27 | 1672 → 1693 | 21 | 2 (26-10-2025 U13 B, 5800 (4 spillere) #491697 [holdkamp]; 26-10-2025 U13 B, 5800 (4 spillere) #491695 [holdkamp]) | a_aendring_med_event |
| 2025-11-03 | 1693 → 1693 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-10 | 1693 → 1693 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-11-17 | 1693 → 1703 | 10 | 1 (15-11-2025 U13 B, 5800 (4 spillere) #491702 [holdkamp]) | a_aendring_med_event |
| 2025-11-24 | 1703 → 1703 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-01 | 1703 → 1703 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-08 | 1703 → 1717 | 14 | 2 (03-12-2025 Badminton København U13 M [turnering]; 03-12-2025 Badminton København U13 M [turnering]) | a_aendring_med_event |
| 2025-12-15 | 1717 → 1717 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-22 | 1717 → 1717 | 0 | 0 (—) | d_ingen_af_delene |
| 2025-12-29 | 1717 → 1717 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-05 | 1717 → 1703 | -14 | 5 (30-12-2025 Solrød Strand U13 A [turnering]; 30-12-2025 Solrød Strand U13 A [turnering]; 30-12-2025 Solrød Strand U13 A [turnering]; 04-01-2026 Gentofte U13 A [turnering]; 04-01-2026 Gentofte U13 A [turnering]) | a_aendring_med_event |
| 2026-01-12 | 1703 → 1715 | 12 | 2 (11-01-2026 U13 B, 5800 (4 spillere) #491705 [holdkamp]; 11-01-2026 U13 B, 5800 (4 spillere) #492644 [holdkamp]) | a_aendring_med_event |
| 2026-01-19 | 1715 → 1715 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-01-26 | 1715 → 1751 | 36 | 5 (25-01-2026 Badminton Danmark U12 A VICTOR LMU - U12A, Haldum Hinnerup Hallen [turnering]; 25-01-2026 Badminton Danmark U12 A VICTOR LMU - U12A, Haldum Hinnerup Hallen [turnering]; 25-01-2026 Badminton Danmark U12 A VICTOR LMU - U12A, Haldum Hinnerup Hallen [turnering]; 25-01-2026 Badminton Danmark U12 A VICTOR LMU - U12A, Haldum Hinnerup Hallen [turnering]; 25-01-2026 Badminton Danmark U12 A VICTOR LMU - U12A, Haldum Hinnerup Hallen [turnering]) | a_aendring_med_event |
| 2026-02-02 | 1751 → 1774 | 23 | 2 (31-01-2026 U13 B, 5800 (4 spillere) #491718 [holdkamp]; 31-01-2026 U13 B, 5800 (4 spillere) #499992 [holdkamp]) | a_aendring_med_event |
| 2026-02-09 | 1774 → 1768 | -6 | 3 (08-02-2026 Greve U13 A [turnering]; 08-02-2026 Greve U13 A [turnering]; 08-02-2026 Greve U13 A [turnering]) | a_aendring_med_event |
| 2026-02-16 | 1768 → 1768 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-02-23 | 1768 → 1768 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-02 | 1768 → 1768 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-09 | 1768 → 1787 | 19 | 2 (08-03-2026 U13 B, 5800 (4 spillere) #492652 [holdkamp]; 08-03-2026 U13 B, 5800 (4 spillere) #492651 [holdkamp]) | a_aendring_med_event |
| 2026-03-16 | 1787 → 1787 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-03-23 | 1787 → 1778 | -9 | 2 (22-03-2026 U15 B 6400 (4 spillere) BD #493921 [holdkamp]; 22-03-2026 U15 B 6400 (4 spillere) BD #493920 [holdkamp]) | a_aendring_med_event |
| 2026-03-30 | 1778 → 1778 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-06 | 1778 → 1816 | 38 | 7 (04-04-2026 BC37 Amager U13 A [turnering]; 04-04-2026 BC37 Amager U13 A [turnering]; 04-04-2026 BC37 Amager U13 A [turnering]; 04-04-2026 BC37 Amager U13 A [turnering]; 06-04-2026 Solrød Strand U13 A Påsketurnering i Karlslunde [turnering]; 06-04-2026 Solrød Strand U13 A Påsketurnering i Karlslunde [turnering]; 06-04-2026 Solrød Strand U13 A Påsketurnering i Karlslunde [turnering]) | a_aendring_med_event |
| 2026-04-13 | 1816 → 1820 | 4 | 0 (—) | b_aendring_uden_event |
| 2026-04-20 | 1820 → 1820 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-04-27 | 1820 → 1835 | 15 | 4 (26-04-2026 Badminton Danmark U13 A Badminton Danmark (Horsens) [turnering]; 26-04-2026 Badminton Danmark U13 A Badminton Danmark (Horsens) [turnering]; 26-04-2026 Badminton Danmark U13 A Badminton Danmark (Horsens) [turnering]; 26-04-2026 Badminton Danmark U13 A Badminton Danmark (Horsens) [turnering]) | a_aendring_med_event |
| 2026-05-04 | 1835 → 1835 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-11 | 1835 → 1835 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-05-18 | 1835 → 1882 | 47 | 6 (17-05-2026 Farum U13 A Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U13 A Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U13 A Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U13 A Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U13 A Farum: Specielle tilmeldingsbetingelser [turnering]; 17-05-2026 Farum U13 A Farum: Specielle tilmeldingsbetingelser [turnering]) | a_aendring_med_event |
| 2026-05-25 | 1882 → 1882 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-01 | 1882 → 1893 | 11 | 3 (31-05-2026 KMB2010 U13 A [turnering]; 31-05-2026 KMB2010 U13 A [turnering]; 31-05-2026 KMB2010 U13 A [turnering]) | a_aendring_med_event |
| 2026-06-08 | 1893 → 1893 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-15 | 1893 → 1893 | 0 | 0 (—) | d_ingen_af_delene |
| 2026-06-29 | 1893 → 1893 | 0 | 0 (—) | d_ingen_af_delene |

Uger: {"a_aendring_med_event":19,"b_aendring_uden_event":1,"c_event_uden_aendring":0,"d_ingen_af_delene":28,"ikke_sammenlignelig_fravaer":0}. Fraværsperioder (ingen nulpoint): ingen.

**Alle b) pointændring uden event:**
- 2026-04-06 → 2026-04-13: 1816 → 1820 (Δ 4), ingen eventrække.

## Samlet konklusion: aktivitetsmål

| Ugekategori | Antal | Fortolkning i denne prøve |
|---|---:|---|
| Pointændring med event (muligt sandt positivt) | 103 | ændring og mindst én eventrække |
| Pointændring uden event (falsk positiv for “spillet”) | 12 | ændring uden eventrække |
| Event uden pointændring (falsk negativ) | 4 | eventrække uden ændring |
| Ingen af delene | 237 | stabilt pointtal og ingen eventrække |
| Ikke sammenlignelig pga. fravær | 28 | mindst ét snapshot uden spillerække; udeladt fra FP/FN |

I denne lille, udvalgte prøve er “pointændring = spillet” ikke tilstrækkeligt som selvstændigt aktivitetsmål, hvis der forekommer b)-uger eller c)-uger. Klassifikationerne er kun mod eventtabellens synlige rækker; årsager til ændring uden event udledes ikke. Pointfald er rapporteret som nettodelta og forklares ikke kausalt uden direkte eventevidens.

## e) Ugentlig hentning og turneringsresultater

For en kendt, afgrænset spillerliste er playerid pr. uge den målrettede metode: 8 spillere kostede 8 POST pr. uge og 392 POST for 49 uger (plus kontekst-GETs). Fuld ranglistesnapshot er langt dyrere: ca. 399 sider pr. version, dvs. ca. 19.551 sidekald for 49 ugentlige versioner. Denne prøve viser pointændringer også uden eventrække, så ugentlig hentning kan være relevant, hvis målet er at følge pointstande præcist; den må ikke bruges som direkte kampindikator uden eventkontrol. Skal dække alle kommende modstandere, kaldtallet afhænger af antallet N af kendte profiler: N POST pr. uge, 49×N pr. sæson; N for den fulde modstanderpopulation er ikke fastlagt her.

Turneringsresultater: de gemte profileres eventtabeller indeholder både turnerings- og holdkamp-rækker samt resultatlinks. For et afgrænset sæt kendte spillere er spillerbaseret hentning direkte observeret og målrettet; om en offentlig oversigtsrute er mere komplet eller billigere kan ikke afgøres af Del B alene.

### Tre efterprøvelige eksempeluger

| Spiller | Eventdato | Event | Snapshot før | Eventpoint | Snapshot efter |
|---|---|---|---|---:|---|
| Josefine Bille-Ahmt | 17-08-2025 | Værløse U13 A | 2025-08-11: 1568 | 1568 | 2025-08-18: 1602 |
| Josefine Bille-Ahmt | 24-08-2025 | Lillerød U13 M | 2025-08-18: 1602 | 1602 | 2025-08-25: 1608 |
| Josefine Bille-Ahmt | 14-09-2025 | Badminton Danmark U13 M VICTOR LBS i Hinnerup/Hammel SØFTEN KIC U13MD-U15B | 2025-09-08: 1608 | 1610 | 2025-09-15: 1625 |
| Benjamin Hinge Carlsson | 20-09-2025 | Uge 38 - U13 A, 6000 (2+2) #487679 | 2025-09-15: 1619 | 1619 | 2025-09-22: 1623 |
| Benjamin Hinge Carlsson | 20-09-2025 | Uge 38 - U13 A, 6000 (2+2) #487676 | 2025-09-15: 1619 | 1619 | 2025-09-22: 1623 |
| Benjamin Hinge Carlsson | 28-09-2025 | Jyllinge U13 A | 2025-09-22: 1623 | 1623 | 2025-09-29: 1627 |
| Benjamin Hinge Carlsson | 18-10-2025 | Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) | 2025-10-13: 1627 | 1627 | 2025-10-20: 1636 |
| Benjamin Hinge Carlsson | 26-10-2025 | U13 A, 6000 (2+2) #487893 | 2025-10-20: 1636 | 1636 | 2025-10-27: 1648 |
| Benjamin Hinge Carlsson | 09-11-2025 | Holte U13 A | 2025-11-03: 1648 | 1648 | 2025-11-10: 1637 |
| Benjamin Hinge Carlsson | 03-12-2025 | Badminton København U13 M | 2025-12-01: 1637 | 1637 | 2025-12-08: 1633 |
| Benjamin Hinge Carlsson | 30-12-2025 | Solrød Strand U13 A | 2025-12-29: 1633 | 1633 | 2026-01-05: 1658 |
| Benjamin Hinge Carlsson | 01-03-2026 | Gladsaxe Søborg U13 A | 2026-02-23: 1658 | 1658 | 2026-03-02: 1677 |
| Benjamin Hinge Carlsson | 29-03-2026 | Badminton Danmark U13 A VICTOR DMU, U13A SKOVPARKHALLEN, Nyborg) | 2026-03-23: 1677 | 1677 | 2026-03-30: 1736 |
| Benjamin Hinge Carlsson | 11-04-2026 | DMU Hold U13A 2+2 (6000) #506563 | 2026-04-06: 1736 | 1736 | 2026-04-13: 1736 |
| Benjamin Hinge Carlsson | 12-04-2026 | DMU Hold U13A 2+2 (6000) #506571 | 2026-04-06: 1736 | 1736 | 2026-04-13: 1736 |
| Benjamin Hinge Carlsson | 19-04-2026 | Nordsjælland U13 A | 2026-04-13: 1736 | 1736 | 2026-04-20: 1740 |
| Louis Valdemar Hedegaard Toftlund | 24-08-2025 | Nr. Lyndelse U15 B | 2025-08-18: 1413 | 1413 | 2025-08-25: 1447 |
| Louis Valdemar Hedegaard Toftlund | 07-09-2025 | Dalum Hjallese BK U15 B | 2025-09-01: 1447 | 1447 | 2025-09-08: 1515 |
| Louis Valdemar Hedegaard Toftlund | 20-09-2025 | Uge 38 - U13 A, 6000 (2+2) #487679 | 2025-09-15: 1515 | 1515 | 2025-09-22: 1535 |
| Louis Valdemar Hedegaard Toftlund | 20-09-2025 | Uge 38 - U13 A, 6000 (2+2) #487676 | 2025-09-15: 1515 | 1515 | 2025-09-22: 1535 |
| Louis Valdemar Hedegaard Toftlund | 05-10-2025 | Skalborg SK U15 A | 2025-09-29: 1535 | 1535 | 2025-10-06: 1555 |
| Louis Valdemar Hedegaard Toftlund | 02-11-2025 | Slagelse U15 A | 2025-10-27: 1555 | 1554 | 2025-11-03: 1563 |
| Louis Valdemar Hedegaard Toftlund | 30-11-2025 | Badminton København U15 A KMU 2025 | 2025-11-24: 1563 | 1562 | 2025-12-01: 1600 |
| Louis Valdemar Hedegaard Toftlund | 07-12-2025 | U15 B 6400 (4 spillere) BD #493897 | 2025-12-01: 1600 | 1600 | 2025-12-08: 1614 |
| Louis Valdemar Hedegaard Toftlund | 04-01-2026 | Gentofte U15 A | 2025-12-29: 1613 | 1613 | 2026-01-05: 1615 |
| Louis Valdemar Hedegaard Toftlund | 11-01-2026 | U15 A, 6800 (2+2) #487801 | 2026-01-05: 1615 | 1615 | 2026-01-12: 1623 |
| Louis Valdemar Hedegaard Toftlund | 18-01-2026 | Nykøbing F U15 A | 2026-01-12: 1623 | 1623 | 2026-01-19: 1635 |
| Louis Valdemar Hedegaard Toftlund | 21-02-2026 | U15 B 6400 (4 spillere) BD #493917 | 2026-02-16: 1635 | 1635 | 2026-02-23: 1655 |
| Louis Valdemar Hedegaard Toftlund | 21-02-2026 | U15 B 6400 (4 spillere) BD #493915 | 2026-02-16: 1635 | 1635 | 2026-02-23: 1655 |
| Louis Valdemar Hedegaard Toftlund | 01-03-2026 | Gladsaxe Søborg U15 A | 2026-02-23: 1655 | 1655 | 2026-03-02: 1660 |
| Louis Valdemar Hedegaard Toftlund | 22-03-2026 | U15 B 6400 (4 spillere) BD #493927 | 2026-03-16: 1660 | 1660 | 2026-03-23: 1670 |
| Louis Valdemar Hedegaard Toftlund | 22-03-2026 | U15 B 6400 (4 spillere) BD #493926 | 2026-03-16: 1660 | 1660 | 2026-03-23: 1670 |
| Louis Valdemar Hedegaard Toftlund | 29-03-2026 | Badminton Danmark U15 A VICTOR DMU, U15ABCD ØRBÆKHALLEN | 2026-03-23: 1670 | 1670 | 2026-03-30: 1686 |
| Louis Valdemar Hedegaard Toftlund | 11-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506126 | 2026-04-06: 1686 | 1686 | 2026-04-13: 1745 |
| Louis Valdemar Hedegaard Toftlund | 11-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506124 | 2026-04-06: 1686 | 1686 | 2026-04-13: 1745 |
| Louis Valdemar Hedegaard Toftlund | 11-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506122 | 2026-04-06: 1686 | 1686 | 2026-04-13: 1745 |
| Louis Valdemar Hedegaard Toftlund | 12-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506729 | 2026-04-06: 1686 | 1736 | 2026-04-13: 1745 |
| Louis Valdemar Hedegaard Toftlund | 24-05-2026 | Birkerød BK13 U15 A | 2026-05-18: 1745 | 1745 | 2026-05-25: 1758 |
| Louis Valdemar Hedegaard Toftlund | 14-06-2026 | Taastrup BC U15 A | 2026-06-08: 1758 | 1758 | 2026-06-15: 1793 |
| Theodor Lumby Jessen | 24-08-2025 | Humlebæk U15 A | 2025-08-18: 1674 | 1674 | 2025-08-25: 1665 |
| Theodor Lumby Jessen | 07-09-2025 | Køge U15 A | 2025-09-01: 1665 | 1665 | 2025-09-08: 1664 |
| Theodor Lumby Jessen | 21-09-2025 | Uge 38 - U15 A, 6800 (2+2) #487720 | 2025-09-15: 1664 | 1664 | 2025-09-22: 1664 |
| Theodor Lumby Jessen | 21-09-2025 | Uge 38 - U15 A, 6800 (2+2) #487719 | 2025-09-15: 1664 | 1664 | 2025-09-22: 1664 |
| Theodor Lumby Jessen | 28-09-2025 | Jyllinge U15 A | 2025-09-22: 1664 | 1664 | 2025-09-29: 1656 |
| Theodor Lumby Jessen | 05-10-2025 | U15 B 6400 (4 spillere) BD #493887 | 2025-09-29: 1656 | 1655 | 2025-10-06: 1684 |
| Theodor Lumby Jessen | 05-10-2025 | U15 B 6400 (4 spillere) BD #493884 | 2025-09-29: 1656 | 1655 | 2025-10-06: 1684 |
| Theodor Lumby Jessen | 02-11-2025 | Slagelse U15 A | 2025-10-27: 1684 | 1683 | 2025-11-03: 1672 |
| Theodor Lumby Jessen | 09-11-2025 | KMB2010 U15 A | 2025-11-03: 1672 | 1671 | 2025-11-10: 1658 |
| Theodor Lumby Jessen | 23-11-2025 | Aabenraa U15 A | 2025-11-17: 1657 | 1657 | 2025-11-24: 1700 |
| Theodor Lumby Jessen | 30-11-2025 | Badminton København U15 A KMU 2025 | 2025-11-24: 1700 | 1700 | 2025-12-01: 1728 |
| Theodor Lumby Jessen | 07-12-2025 | U15 B 6400 (4 spillere) BD #493897 | 2025-12-01: 1728 | 1728 | 2025-12-08: 1712 |
| Theodor Lumby Jessen | 14-12-2025 | Helsinge U15 A | 2025-12-08: 1712 | 1712 | 2025-12-15: 1696 |
| Theodor Lumby Jessen | 11-01-2026 | U15 B 6400 (4 spillere) BD #493907 | 2026-01-05: 1696 | 1696 | 2026-01-12: 1719 |
| Theodor Lumby Jessen | 11-01-2026 | U15 B 6400 (4 spillere) BD #493905 | 2026-01-05: 1696 | 1696 | 2026-01-12: 1719 |
| Theodor Lumby Jessen | 18-01-2026 | Nykøbing F U15 A | 2026-01-12: 1719 | 1719 | 2026-01-19: 1727 |
| Theodor Lumby Jessen | 21-02-2026 | U15 B 6400 (4 spillere) BD #493917 | 2026-02-16: 1727 | 1727 | 2026-02-23: 1747 |
| Theodor Lumby Jessen | 21-02-2026 | U15 B 6400 (4 spillere) BD #493915 | 2026-02-16: 1727 | 1727 | 2026-02-23: 1747 |
| Theodor Lumby Jessen | 01-03-2026 | Gladsaxe Søborg U15 A | 2026-02-23: 1747 | 1747 | 2026-03-02: 1773 |
| Theodor Lumby Jessen | 15-03-2026 | Drive U15 A | 2026-03-09: 1773 | 1773 | 2026-03-16: 1781 |
| Theodor Lumby Jessen | 22-03-2026 | U15 B 6400 (4 spillere) BD #493927 | 2026-03-16: 1781 | 1781 | 2026-03-23: 1788 |
| Theodor Lumby Jessen | 22-03-2026 | U15 B 6400 (4 spillere) BD #493926 | 2026-03-16: 1781 | 1781 | 2026-03-23: 1788 |
| Theodor Lumby Jessen | 29-03-2026 | Badminton Danmark U15 A VICTOR DMU, U15ABCD ØRBÆKHALLEN | 2026-03-23: 1788 | 1788 | 2026-03-30: 1808 |
| Theodor Lumby Jessen | 06-04-2026 | Solrød Strand U15 A Påsketurnering i Havdrup | 2026-03-30: 1808 | 1808 | 2026-04-13: 1805 |
| Theodor Lumby Jessen | 11-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506122 | 2026-04-06: 1808 | 1813 | 2026-04-13: 1805 |
| Theodor Lumby Jessen | 12-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506730 | 2026-04-06: 1808 | 1825 | 2026-04-13: 1805 |
| Theodor Lumby Jessen | 12-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506729 | 2026-04-06: 1808 | 1825 | 2026-04-13: 1805 |
| Theodor Lumby Jessen | 17-05-2026 | Farum U15 A Farum: Specielle tilmeldingsbetingelser | 2026-05-11: 1805 | 1805 | 2026-05-18: 1825 |
| Theodor Lumby Jessen | 24-05-2026 | Birkerød BK13 U15 A | 2026-05-18: 1825 | 1825 | 2026-05-25: 1841 |
| Theodor Lumby Jessen | 07-06-2026 | Storstrømmen U15 A Storstrømmen (Tune) | 2026-06-01: 1841 | 1841 | 2026-06-08: 1845 |
| Theodor Lumby Jessen | 14-06-2026 | Taastrup BC U15 A | 2026-06-08: 1845 | 1845 | 2026-06-15: 1859 |
| Anna Rudolph | 17-08-2025 | Værløse U15 M | 2025-08-11: 1698 | 1698 | 2025-08-18: 1697 |
| Anna Rudolph | 24-08-2025 | Greve U15 M | 2025-08-18: 1697 | 1697 | 2025-08-25: 1708 |
| Anna Rudolph | 07-09-2025 | Køge U15 M | 2025-09-01: 1708 | 1708 | 2025-09-08: 1717 |
| Anna Rudolph | 14-09-2025 | Badminton Danmark U15 M VICTOR LBS i Hinnerup/Hammel HAMMEL IC U15M-U17M-U19M- U17/U19A | 2025-09-08: 1717 | 1717 | 2025-09-15: 1697 |
| Anna Rudolph | 21-09-2025 | Uge 38 - U15 A, 6800 (2+2) #487720 | 2025-09-15: 1697 | 1697 | 2025-09-22: 1675 |
| Anna Rudolph | 21-09-2025 | Uge 38 - U15 A, 6800 (2+2) #487719 | 2025-09-15: 1697 | 1697 | 2025-09-22: 1675 |
| Anna Rudolph | 18-10-2025 | Badminton Danmark U15 M VICTOR DENMARK JUNIOR (U15M Paarup/U15A Paarup to.-Næsby fr.) | 2025-10-13: 1675 | 1675 | 2025-10-20: 1667 |
| Anna Rudolph | 25-10-2025 | U15 A, 6800 (2+2) #487794 | 2025-10-20: 1667 | 1667 | 2025-10-27: 1663 |
| Anna Rudolph | 09-11-2025 | KMB2010 U15 M | 2025-11-03: 1663 | 1663 | 2025-11-10: 1669 |
| Anna Rudolph | 16-11-2025 | U15 A, 6800 (2+2) #487796 | 2025-11-10: 1669 | 1669 | 2025-11-17: 1683 |
| Anna Rudolph | 23-11-2025 | Næstved-Herlufsholm U15 M | 2025-11-17: 1683 | 1683 | 2025-11-24: 1681 |
| Anna Rudolph | 03-12-2025 | Badminton København U15 E | 2025-12-01: 1681 | 1681 | 2025-12-08: 1687 |
| Anna Rudolph | 07-12-2025 | U15 A, 6800 (2+2) #487798 | 2025-12-01: 1681 | 1673 | 2025-12-08: 1687 |
| Anna Rudolph | 28-12-2025 | Greve U15 M | 2025-12-22: 1686 | 1686 | 2025-12-29: 1662 |
| Anna Rudolph | 11-01-2026 | U15 A, 6800 (2+2) #487801 | 2026-01-05: 1662 | 1662 | 2026-01-12: 1676 |
| Anna Rudolph | 25-01-2026 | Badminton Danmark U14 M VICTOR LMU U14M, Viby Badmintonhal | 2026-01-19: 1676 | 1676 | 2026-01-26: 1723 |
| Anna Rudolph | 01-02-2026 | U15 A, 6800 (2+2) #487804 | 2026-01-26: 1723 | 1723 | 2026-02-02: 1737 |
| Anna Rudolph | 08-03-2026 | U15 A, 6800 (2+2) #487807 | 2026-03-02: 1737 | 1737 | 2026-03-09: 1737 |
| Anna Rudolph | 15-03-2026 | Solrød Strand U15 M | 2026-03-09: 1737 | 1737 | 2026-03-16: 1755 |
| Anna Rudolph | 29-03-2026 | Badminton Danmark U15 M VICTOR DMU, U13MB-U15M NYBORGHALLEN | 2026-03-23: 1755 | 1755 | 2026-03-30: 1745 |
| Anna Rudolph | 11-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506126 | 2026-04-06: 1745 | 1745 | 2026-04-13: 1759 |
| Anna Rudolph | 11-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506124 | 2026-04-06: 1745 | 1745 | 2026-04-13: 1759 |
| Anna Rudolph | 12-04-2026 | DMU Hold U15B (6400) - 4 Spillere #506730 | 2026-04-06: 1745 | 1765 | 2026-04-13: 1759 |
| Anna Rudolph | 26-04-2026 | Badminton Danmark U15 M Badminton Danmark (Horsens) | 2026-04-20: 1759 | 1759 | 2026-04-27: 1774 |
| Anna Rudolph | 10-05-2026 | Slangerup U15 M | 2026-05-04: 1774 | 1774 | 2026-05-11: 1781 |
| Anna Rudolph | 17-05-2026 | Farum U15 M Farum: Specielle tilmeldingsbetingelser | 2026-05-11: 1781 | 1781 | 2026-05-18: 1793 |
| Guanyan Chen | 17-08-2025 | Værløse U13 A | 2025-08-11: 1575 | 1575 | 2025-08-18: 1599 |
| Guanyan Chen | 21-09-2025 | Slangerup U13 A | 2025-09-15: 1599 | 1599 | 2025-09-22: 1609 |
| Guanyan Chen | 28-09-2025 | Jyllinge U13 A | 2025-09-22: 1609 | 1609 | 2025-09-29: 1641 |
| Guanyan Chen | 05-10-2025 | U15 B 6400 (4 spillere) BD #493887 | 2025-09-29: 1641 | 1641 | 2025-10-06: 1621 |
| Guanyan Chen | 05-10-2025 | U15 B 6400 (4 spillere) BD #493885 | 2025-09-29: 1641 | 1641 | 2025-10-06: 1621 |
| Guanyan Chen | 18-10-2025 | Badminton Danmark U13 A VICTOR DENMARK JUNIOR (U13A Næsby) | 2025-10-13: 1621 | 1621 | 2025-10-20: 1672 |
| Guanyan Chen | 26-10-2025 | U13 B, 5800 (4 spillere) #491697 | 2025-10-20: 1672 | 1672 | 2025-10-27: 1693 |
| Guanyan Chen | 26-10-2025 | U13 B, 5800 (4 spillere) #491695 | 2025-10-20: 1672 | 1672 | 2025-10-27: 1693 |
| Guanyan Chen | 15-11-2025 | U13 B, 5800 (4 spillere) #491702 | 2025-11-10: 1693 | 1693 | 2025-11-17: 1703 |
| Guanyan Chen | 03-12-2025 | Badminton København U13 M | 2025-12-01: 1703 | 1703 | 2025-12-08: 1717 |
| Guanyan Chen | 30-12-2025 | Solrød Strand U13 A | 2025-12-29: 1717 | 1717 | 2026-01-05: 1703 |
| Guanyan Chen | 04-01-2026 | Gentofte U13 A | 2025-12-29: 1717 | 1725 | 2026-01-05: 1703 |
| Guanyan Chen | 11-01-2026 | U13 B, 5800 (4 spillere) #491705 | 2026-01-05: 1703 | 1695 | 2026-01-12: 1715 |
| Guanyan Chen | 11-01-2026 | U13 B, 5800 (4 spillere) #492644 | 2026-01-05: 1703 | 1695 | 2026-01-12: 1715 |
| Guanyan Chen | 25-01-2026 | Badminton Danmark U12 A VICTOR LMU - U12A, Haldum Hinnerup Hallen | 2026-01-19: 1715 | 1715 | 2026-01-26: 1751 |
| Guanyan Chen | 31-01-2026 | U13 B, 5800 (4 spillere) #491718 | 2026-01-26: 1751 | 1751 | 2026-02-02: 1774 |
| Guanyan Chen | 31-01-2026 | U13 B, 5800 (4 spillere) #499992 | 2026-01-26: 1751 | 1751 | 2026-02-02: 1774 |
| Guanyan Chen | 08-02-2026 | Greve U13 A | 2026-02-02: 1774 | 1774 | 2026-02-09: 1768 |
| Guanyan Chen | 08-03-2026 | U13 B, 5800 (4 spillere) #492652 | 2026-03-02: 1768 | 1768 | 2026-03-09: 1787 |
| Guanyan Chen | 08-03-2026 | U13 B, 5800 (4 spillere) #492651 | 2026-03-02: 1768 | 1768 | 2026-03-09: 1787 |
| Guanyan Chen | 22-03-2026 | U15 B 6400 (4 spillere) BD #493921 | 2026-03-16: 1787 | 1787 | 2026-03-23: 1778 |
| Guanyan Chen | 22-03-2026 | U15 B 6400 (4 spillere) BD #493920 | 2026-03-16: 1787 | 1787 | 2026-03-23: 1778 |
| Guanyan Chen | 04-04-2026 | BC37 Amager U13 A | 2026-03-30: 1778 | 1778 | 2026-04-06: 1816 |
| Guanyan Chen | 06-04-2026 | Solrød Strand U13 A Påsketurnering i Karlslunde | 2026-03-30: 1778 | 1816 | 2026-04-13: 1820 |
| Guanyan Chen | 26-04-2026 | Badminton Danmark U13 A Badminton Danmark (Horsens) | 2026-04-20: 1820 | 1820 | 2026-04-27: 1835 |
| Guanyan Chen | 17-05-2026 | Farum U13 A Farum: Specielle tilmeldingsbetingelser | 2026-05-11: 1835 | 1835 | 2026-05-18: 1882 |
| Guanyan Chen | 31-05-2026 | KMB2010 U13 A | 2026-05-25: 1882 | 1882 | 2026-06-01: 1893 |

## Databaseværn

| Database | SHA-256 før | SHA-256 efter |
|---|---|---|
| gsb-statistik-normalized.db | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E |
| liga-landskab.db | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C |
| rangliste-historik.db | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F |
| national-spillere.db | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E |
| rangliste-point.db | DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9 | DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9 |

Alle hashes er uændrede: true. Alle fem DB:t blev åbnet readOnly med `PRAGMA query_only=ON`; ingen database blev skrevet.

## Forespørgselslog

Den følgende append-only-log indeholder hvert svar med nummer, metode, felter (uden kontekstnøgle), status, bytes, SHA-256 af redigeret svar, filnavn og tidspunkt. For kald 1–4 (Del A) henvises til `statistik/results/158-turneringer.json`; kald 5–206 er rekonstrueret fra tidligere state/råsvar og mangler historiske tidsstempler; kald 207 har ukendt status. Kald 208–424 blev logget før svarbehandling.

| Kald | Metode | Felter | Status | Bytes | SHA-256 | Råsvar |
|---:|---|---|---:|---:|---|---|
| 5 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-005.json.gz |
| 6 | POST | `{"seasonid":2025,"playerid":343986,"rankinglistid":288,"rankinglistplayerid":8337485,"getplayerdata":true}` | 200 | 50168 | 4B0BA42BD0F1E60663DD2C39F5CEF9E29A509F4E64C3F28B677C024289D6A16F | call-006.json.gz |
| 7 | POST | `{"seasonid":2025,"playerid":328196,"rankinglistid":288,"rankinglistplayerid":8327461,"getplayerdata":true}` | 200 | 2878 | 032446E49861D5240AFCD0A5620478AA3601E15506D9639E7C11FF5337C8BAA1 | call-007.json.gz |
| 8 | POST | `{"seasonid":2025,"playerid":362606,"rankinglistid":288,"rankinglistplayerid":8457425,"getplayerdata":true}` | 200 | 3055 | C6B0CE9771C5FB23E1FD466D4CD347CD2B80E93C156358B68699D7211495A3B8 | call-008.json.gz |
| 9 | POST | `{"seasonid":2025,"playerid":355801,"rankinglistid":288,"rankinglistplayerid":8344299,"getplayerdata":true}` | 200 | 24853 | EF86C2A85213A2FFA28412B45E46FF39C37F1CBAA7E78CDD30C6BC888C60D550 | call-009.json.gz |
| 10 | POST | `{"seasonid":2025,"playerid":361644,"rankinglistid":288,"rankinglistplayerid":8455187,"getplayerdata":true}` | 200 | 12664 | C20985ED3AA6A94404A6CA805A415BA15D26BB7F643CE505D7B3D99CE1F835A3 | call-010.json.gz |
| 11 | POST | `{"seasonid":2025,"playerid":346938,"rankinglistid":288,"rankinglistplayerid":8339290,"getplayerdata":true}` | 200 | 53744 | D623BBCB574E3C4311A51EB19C90F421B4819A968EB9C5A02E8858F1CD5C6233 | call-011.json.gz |
| 12 | POST | `{"seasonid":2025,"playerid":353206,"rankinglistid":288,"rankinglistplayerid":8343738,"getplayerdata":true}` | 200 | 28406 | 471475863CF0E3D552ACFD367E2CC3360B31E13FF17F99A9BEFC29561121E85E | call-012.json.gz |
| 13 | POST | `{"seasonid":2025,"playerid":343399,"rankinglistid":288,"rankinglistplayerid":8337333,"getplayerdata":true}` | 200 | 13512 | FA6DF567FEC40CCB7808E98F1EFF65542D77FCFD6D3F690BEDB3775E0DE70C53 | call-013.json.gz |
| 14 | POST | `{"seasonid":2025,"playerid":353220,"rankinglistid":288,"rankinglistplayerid":8343706,"getplayerdata":true}` | 200 | 30973 | D87896B7D7034B5B73CE25084D8C92E48235E35DB25D1456B01AC32620DC558F | call-014.json.gz |
| 15 | POST | `{"seasonid":2025,"playerid":328253,"rankinglistid":288,"rankinglistplayerid":8327388,"getplayerdata":true}` | 200 | 34861 | 2E61762C4D24499879DD969E9B16189624DE70E546E6399BBE6E15BFCCBA88E7 | call-015.json.gz |
| 16 | POST | `{"seasonid":2025,"playerid":346148,"rankinglistid":288,"rankinglistplayerid":8338710,"getplayerdata":true}` | 200 | 50424 | EBC6360572ADC93A183C9C163E7603C97A2E9A5E128E3E0A5A8B6EFF24661436 | call-016.json.gz |
| 17 | POST | `{"seasonid":2025,"playerid":346158,"rankinglistid":288,"rankinglistplayerid":8338716,"getplayerdata":true}` | 200 | 18863 | 2730593EDD4E267F929BD327FA532A90A7D5647DD450BA77F5EB103AE3B57BB0 | call-017.json.gz |
| 18 | POST | `{"seasonid":2025,"playerid":328375,"rankinglistid":288,"rankinglistplayerid":8329039,"getplayerdata":true}` | 200 | 34378 | 6288F02FB399086B3B24003185913FFC84CAFDCFC0F1F9FED30F2314BD5D6F6B | call-018.json.gz |
| 19 | POST | `{"seasonid":2025,"playerid":337802,"rankinglistid":288,"rankinglistplayerid":8334025,"getplayerdata":true}` | 200 | 35483 | 575B6227D6A8AC9F38A0F6FC4F304E4B634A843CA3C69E8BACA97D3B7B754209 | call-019.json.gz |
| 20 | POST | `{"seasonid":2025,"playerid":346285,"rankinglistid":288,"rankinglistplayerid":8338341,"getplayerdata":true}` | 200 | 34599 | F95948417422A07A836B2104D1B58DE60788AB9C6EDC2A1B78CEA4A5E89F61B4 | call-020.json.gz |
| 21 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-021.json.gz |
| 22 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-022.json.gz |
| 23 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-023.json.gz |
| 24 | POST | `{"rankinglistversiondate":"07/21/2025","playerid":"329159","param":"K"}` | 200 | 13037 | B5F1D025FC7E7D3E2600DC1C0AE2F4A37780C15A0D66667A437781BFC70DF386 | call-024.json.gz |
| 25 | POST | `{"rankinglistversiondate":"07/28/2025","playerid":"329159","param":"K"}` | 200 | 13037 | FFDBA22E80F6144905DA297B2F276641FDDABD6E511F4846637BF9A9250D324B | call-025.json.gz |
| 26 | POST | `{"rankinglistversiondate":"08/04/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 9AD3C8078DC024FC20DA192B4C659DF4BA040321BAE4D0F1F52403EE6B6A2070 | call-026.json.gz |
| 27 | POST | `{"rankinglistversiondate":"08/11/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 68442DF3F3B4300A3C1BA67667B798437FF2BF2EFBB29F346F40A8A0916C90E7 | call-027.json.gz |
| 28 | POST | `{"rankinglistversiondate":"08/18/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 50AC6DC28072409FC24A7A992614E9A996BDE2466A069EE7FC3DAB5B72B36B6D | call-028.json.gz |
| 29 | POST | `{"rankinglistversiondate":"08/25/2025","playerid":"329159","param":"K"}` | 200 | 13037 | BEA03B1B06289D783F2275FB5825AE7356A0D8CB54CCE72CC85145DD34AB7EFE | call-029.json.gz |
| 30 | POST | `{"rankinglistversiondate":"09/01/2025","playerid":"329159","param":"K"}` | 200 | 13037 | ADB4C929B012789E56B9A16F635574FF676DCC72E77514335A66002A71C71722 | call-030.json.gz |
| 31 | POST | `{"rankinglistversiondate":"09/08/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 1F4141F13FDACBC6A9F3CDD72C4423E0C4938FCF6F8B9ED5AFEFB68C64CCC12A | call-031.json.gz |
| 32 | POST | `{"rankinglistversiondate":"09/15/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 6AAE548AD71AFA9AD107C9A5F395F00D9CD619924D4575AC4BEB44D9A40AC758 | call-032.json.gz |
| 33 | POST | `{"rankinglistversiondate":"09/22/2025","playerid":"329159","param":"K"}` | 200 | 13037 | AA17C4786051F3360CAC1AB143EDC7FDABDB8B306DFB0866E1E6E6DDDB58633A | call-033.json.gz |
| 34 | POST | `{"rankinglistversiondate":"09/29/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 2C878A8CA90046CE55B0317183C60DB4DB26CC6F9D4FF8318069969E7A9DC1AE | call-034.json.gz |
| 35 | POST | `{"rankinglistversiondate":"10/06/2025","playerid":"329159","param":"K"}` | 200 | 13037 | BF95FC3669E91421581DD96421EE7183125FB389D20B7517C35C21528A11BF98 | call-035.json.gz |
| 36 | POST | `{"rankinglistversiondate":"10/13/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 3BA8B212273A0C3A006ED5A017F90A70E5639B31E893FC60C3DFBC31FD7DAE0B | call-036.json.gz |
| 37 | POST | `{"rankinglistversiondate":"10/20/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 52E2499BCBEF9695595DD489EC778D7D85BAB5293EA65F2BC28942FDF36A21D0 | call-037.json.gz |
| 38 | POST | `{"rankinglistversiondate":"10/27/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 5EDB875DC992EB553BE55DBECA54FB675859C2988052AFD4845F816C81FEB69E | call-038.json.gz |
| 39 | POST | `{"rankinglistversiondate":"11/03/2025","playerid":"329159","param":"K"}` | 200 | 13037 | F4A249CEF3EDC0441CB35A0A0C7F0EE91EAC990E6D7C9D63FAE1BAC38F828E5F | call-039.json.gz |
| 40 | POST | `{"rankinglistversiondate":"11/10/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 8CC4CD839BFBA36E2DB74432FBBDAB508666B75EC1D62E7B7C337DCAE77B5B27 | call-040.json.gz |
| 41 | POST | `{"rankinglistversiondate":"11/17/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 5CBD6CE3045D7856FC476605034A47CAFE1A97A454A9F9D4EFE092B429712197 | call-041.json.gz |
| 42 | POST | `{"rankinglistversiondate":"11/24/2025","playerid":"329159","param":"K"}` | 200 | 13037 | EB75CDF27B04F89BA9B63F094E4332EF1F2CAB08170DDFC69D7CFCFFFE0986A5 | call-042.json.gz |
| 43 | POST | `{"rankinglistversiondate":"12/01/2025","playerid":"329159","param":"K"}` | 200 | 13037 | E40DF4FB32EB7C017440B2C741639097F5703EF793FEF183BEAAA422A17EA5C6 | call-043.json.gz |
| 44 | POST | `{"rankinglistversiondate":"12/08/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 3C5F5DEFC5191C82FF353C6ACC9FA0A7B2971AEA9AB392404D96A5FCA6232F41 | call-044.json.gz |
| 45 | POST | `{"rankinglistversiondate":"12/15/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 2EEA0FACD6B715FBB2D72FA13EDA20E0B82B638B5FCCCBB14A36AB55DF7E075D | call-045.json.gz |
| 46 | POST | `{"rankinglistversiondate":"12/22/2025","playerid":"329159","param":"K"}` | 200 | 13037 | E12E47D675F9441813A0CF31FAC0D5FE5C7CBD8061F4DCA39DB7422461FD5FED | call-046.json.gz |
| 47 | POST | `{"rankinglistversiondate":"12/29/2025","playerid":"329159","param":"K"}` | 200 | 13037 | 38DEA7FC1C2923D72775DB3CB26A4F8F73241952F654D5BF34784D9F642E4A57 | call-047.json.gz |
| 48 | POST | `{"rankinglistversiondate":"01/05/2026","playerid":"329159","param":"K"}` | 200 | 13037 | DDE57560CE35153DDC8C0325D44F028BEDCD88F53D90561639EF91AA72506985 | call-048.json.gz |
| 49 | POST | `{"rankinglistversiondate":"01/12/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 64197369B563960A0493AAC6E5A1FE11F6B7D8FD1088A0CB46149D07E9975E8F | call-049.json.gz |
| 50 | POST | `{"rankinglistversiondate":"01/19/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 850AA40B1E2178EC9F9D6EA6BD09BDCD8BF72FF9FD8C6DDCE8A4100747B83937 | call-050.json.gz |
| 51 | POST | `{"rankinglistversiondate":"01/26/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 08C71ABFD217DFCF602EB5AE741B4575D812A436E053824EE4573B4E69F36C07 | call-051.json.gz |
| 52 | POST | `{"rankinglistversiondate":"02/02/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 73F848FC748DF6C9ACA7299B2CE39A0F0F227C768080959A54AA4BD302DB827F | call-052.json.gz |
| 53 | POST | `{"rankinglistversiondate":"02/09/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 2A94F6844F4DA1D593BA85119F9EB3485044EAD013885D1F8458CE4EDB89C354 | call-053.json.gz |
| 54 | POST | `{"rankinglistversiondate":"02/16/2026","playerid":"329159","param":"K"}` | 200 | 13037 | D12B14020484BF3161E49803B325A8D6CDFC596C85B4428C37BC0A04F423D731 | call-054.json.gz |
| 55 | POST | `{"rankinglistversiondate":"02/23/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 0857D787F0504398F39BC3CAA168A13E4A4AE426E1CAF702B55A5487A5F34728 | call-055.json.gz |
| 56 | POST | `{"rankinglistversiondate":"03/02/2026","playerid":"329159","param":"K"}` | 200 | 13037 | EC74E397C17AD4561A5483EC9A6437BA8DE7F4F09EE2B7CB46829F56B1468F14 | call-056.json.gz |
| 57 | POST | `{"rankinglistversiondate":"03/09/2026","playerid":"329159","param":"K"}` | 200 | 13037 | A3288411F7FD71A3FD3D614E11BA9ABC643F0BE0B8EC8431EC98787BFAEF9A38 | call-057.json.gz |
| 58 | POST | `{"rankinglistversiondate":"03/16/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 4D86825ED2BBE83BE0A345A7508A16B58D55C603D6F6D334B0DE944C2B5A1D50 | call-058.json.gz |
| 59 | POST | `{"rankinglistversiondate":"03/23/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 6A3B99C30FD1296ECAEC7AA1570AC3F7021E13A36EBCF8356375A07B34DA5657 | call-059.json.gz |
| 60 | POST | `{"rankinglistversiondate":"03/30/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 156971C6178EC155D3DB8FAAE306BCDE514D3D461793D5AC479F9FD78793F177 | call-060.json.gz |
| 61 | POST | `{"rankinglistversiondate":"04/06/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 95767ACECA8FE8F8CE9E9D1D87C0361A2ECACF8E13683265E43A8F81200C769F | call-061.json.gz |
| 62 | POST | `{"rankinglistversiondate":"04/13/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 4290AD4EC39B488C60CB3CDDAA0A91A71B53EC147ACA65A140A6621B9B5CA639 | call-062.json.gz |
| 63 | POST | `{"rankinglistversiondate":"04/20/2026","playerid":"329159","param":"K"}` | 200 | 13037 | B228CFD2E8F1E3FE2F272CAD6CF0D5F1CC01A335D9F9C943779053B8B8B35A08 | call-063.json.gz |
| 64 | POST | `{"rankinglistversiondate":"04/27/2026","playerid":"329159","param":"K"}` | 200 | 13037 | E04340E1D25825A67034100ECC7DD0DA327C871B371AC3531E0CFA7CD1CD9EF5 | call-064.json.gz |
| 65 | POST | `{"rankinglistversiondate":"05/04/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 4386AE009844CBEA6EEF6EE0316960548C5572B07BCC658B82546BC45E82BE11 | call-065.json.gz |
| 66 | POST | `{"rankinglistversiondate":"05/11/2026","playerid":"329159","param":"K"}` | 200 | 13037 | C106C5AACEFFAE1ECE98E92E4458CE6620D8F73A0829A2DEF699E5C0A28CCC31 | call-066.json.gz |
| 67 | POST | `{"rankinglistversiondate":"05/18/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 38D783FB7904176E82A6058412A7BDAEE09607A7F25FDC20856BD69A39D9735C | call-067.json.gz |
| 68 | POST | `{"rankinglistversiondate":"05/25/2026","playerid":"329159","param":"K"}` | 200 | 13037 | AC37ABEA2D719DD6918CC36A5D79A3571495F3202DDD72EA873AD6B8F0264FDA | call-068.json.gz |
| 69 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-069.json.gz |
| 70 | POST | `{"rankinglistversiondate":"06/01/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 0BE4DFE23AFD012606741953EF56605A84D88766CB64C61DB092F392978A03B1 | call-070.json.gz |
| 71 | POST | `{"rankinglistversiondate":"06/08/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 1457552D6B54BDEC61FABD9C2908CD8C044C4432BAC6255FD2A768A38E460CBA | call-071.json.gz |
| 72 | POST | `{"rankinglistversiondate":"06/15/2026","playerid":"329159","param":"K"}` | 200 | 13037 | ADA9D8DBAB38FA06DCFB9FE519D0AA9672CD7719818A1C9A6FEFCBF12BE17909 | call-072.json.gz |
| 73 | POST | `{"rankinglistversiondate":"06/29/2026","playerid":"329159","param":"K"}` | 200 | 13037 | 73259116A7A3EF9F9573C2ED36335F198BC8AFD11BACEB2111E5158B74D84A35 | call-073.json.gz |
| 74 | POST | `{"rankinglistversiondate":"07/21/2025","playerid":"330650"}` | 200 | 13047 | 22A972E1677239AB3735F9CE44C74EBC1C8D93C2F6D2A88B3EC6DBF6106647D3 | call-074.json.gz |
| 75 | POST | `{"rankinglistversiondate":"07/28/2025","playerid":"330650"}` | 200 | 13047 | 28A94D4163EB15FCF7B8817F5AF8940428A10A17F72FD5D220F4EBC771C93551 | call-075.json.gz |
| 76 | POST | `{"rankinglistversiondate":"08/04/2025","playerid":"330650"}` | 200 | 13047 | CC5AE2B278809A071F08B256302755B775C8DE7FDEB967FAFD43FE9986F1D7B0 | call-076.json.gz |
| 77 | POST | `{"rankinglistversiondate":"08/11/2025","playerid":"330650"}` | 200 | 13047 | B7C1CAAA755DFCC3C7863BCA93D88E92036BD9DB16F9DDF86D528C25B3E8B315 | call-077.json.gz |
| 78 | POST | `{"rankinglistversiondate":"08/18/2025","playerid":"330650"}` | 200 | 13047 | 21EE7D80C6073A4F2EA83EF5F4DEB93A0E0B5817D428987DFDE6AD1A70E904CB | call-078.json.gz |
| 79 | POST | `{"rankinglistversiondate":"08/25/2025","playerid":"330650"}` | 200 | 13047 | 8F48A578F14D57E9A9B0B4E8FBDDFB261D8E14A219F92B85D2D5D0E61BDA4DAC | call-079.json.gz |
| 80 | POST | `{"rankinglistversiondate":"09/01/2025","playerid":"330650"}` | 200 | 13047 | 74250C45B75078A0489D90CEA02216CFBEF7B1263BCF44134F441E967CDC8434 | call-080.json.gz |
| 81 | POST | `{"rankinglistversiondate":"09/08/2025","playerid":"330650"}` | 200 | 13047 | 8D0AC70AB9303250CD0CD83251BEEC1EDB28A5E751D7640189ED1E616B3119AD | call-081.json.gz |
| 82 | POST | `{"rankinglistversiondate":"09/15/2025","playerid":"330650"}` | 200 | 13047 | A4E66BB5E360F2FC8608EFC5AAB2976D1CD9DAA3946DCB61EADEE48F4125E80E | call-082.json.gz |
| 83 | POST | `{"rankinglistversiondate":"09/22/2025","playerid":"330650"}` | 200 | 13047 | FCEDD24AE18724B94D19E092D5C698C7C086B80C7BE2C9C757364AA5A0F013A5 | call-083.json.gz |
| 84 | POST | `{"rankinglistversiondate":"09/29/2025","playerid":"330650"}` | 200 | 13047 | B62E1A5DABD840C62E0EDEA416C61188DB7DB2B1DAAD6F1F3AF2291FD61CE368 | call-084.json.gz |
| 85 | POST | `{"rankinglistversiondate":"10/06/2025","playerid":"330650"}` | 200 | 13047 | D80159954A9AE31F961E17092EECD8B96094A14B85A86C79864A27AACAE7C068 | call-085.json.gz |
| 86 | POST | `{"rankinglistversiondate":"10/13/2025","playerid":"330650"}` | 200 | 13047 | 3B4DC5048EBB3135368FDF5451717CB1D32C9D824D2D65438FBE007A54D84AED | call-086.json.gz |
| 87 | POST | `{"rankinglistversiondate":"10/20/2025","playerid":"330650"}` | 200 | 13047 | 3A05C8823175431A4B4B7EEAD7DF4200025121192A4CC0A517F812049B8931D4 | call-087.json.gz |
| 88 | POST | `{"rankinglistversiondate":"10/27/2025","playerid":"330650"}` | 200 | 13047 | 0FD278F5170D02BF91EDCD3BB5E5647BC7334979DD77E8BF8FF32C9F838CE15B | call-088.json.gz |
| 89 | POST | `{"rankinglistversiondate":"11/03/2025","playerid":"330650"}` | 200 | 13047 | 79A4D2055707F00C57E65B4027358EC5BF45F47260EBDEB56AF479CFCD4892B5 | call-089.json.gz |
| 90 | POST | `{"rankinglistversiondate":"11/10/2025","playerid":"330650"}` | 200 | 13047 | A65B8FCB41D344D841C5D08B3092A6E9C6CCE026B9B4FB0C468C81F1F9AE549A | call-090.json.gz |
| 91 | POST | `{"rankinglistversiondate":"11/17/2025","playerid":"330650"}` | 200 | 13047 | 76DE5F3679D3C530E1C2804A0A7979CCE979417E2AF8C07A9EDD75EA1056E926 | call-091.json.gz |
| 92 | POST | `{"rankinglistversiondate":"11/24/2025","playerid":"330650"}` | 200 | 13047 | BE9C1730AF34543BF5FD5C7302C9502DDB5F31654AAECA1D2E0D91C4AEB471F1 | call-092.json.gz |
| 93 | POST | `{"rankinglistversiondate":"12/01/2025","playerid":"330650"}` | 200 | 13047 | 0802439F07E539371427B59994AA63D874B42CF126A2635DF6DAA26F670613DC | call-093.json.gz |
| 94 | POST | `{"rankinglistversiondate":"12/08/2025","playerid":"330650"}` | 200 | 13047 | E1E67C6A8B5376EBCAA66617F4B18388357C37878BC267270F9ED15E4C5520A9 | call-094.json.gz |
| 95 | POST | `{"rankinglistversiondate":"12/15/2025","playerid":"330650"}` | 200 | 13047 | 12E1EAE7A8C77D7D0D1153756CE12E3C388AED054B1671F739CA2C3C4B8FFE67 | call-095.json.gz |
| 96 | POST | `{"rankinglistversiondate":"12/22/2025","playerid":"330650"}` | 200 | 13047 | 91614D98AE73B8061F6E7A784C7BDB13B991AD9B9FC567789FA9CD0BAF9C31E7 | call-096.json.gz |
| 97 | POST | `{"rankinglistversiondate":"12/29/2025","playerid":"330650"}` | 200 | 13047 | 1C5C1D5F99D2B3A162B289649DC24D7DA6B2458751EB79681EADD70E4340BBEE | call-097.json.gz |
| 98 | POST | `{"rankinglistversiondate":"01/05/2026","playerid":"330650"}` | 200 | 13047 | 30A37510BF30FCBBF98444678C791DBF280B31405ECBEDF623A3A7E387EF7E4C | call-098.json.gz |
| 99 | POST | `{"rankinglistversiondate":"01/12/2026","playerid":"330650"}` | 200 | 13047 | 89E2C0B138342EED7C2B003B265DF664E924E7D0C0FEACC6A69387A721788F5C | call-099.json.gz |
| 100 | POST | `{"rankinglistversiondate":"01/19/2026","playerid":"330650"}` | 200 | 13047 | 148C8C0A57B442A01C3546BB699C21FBC001093BE81FCFBBF900E1CA99E0DD08 | call-100.json.gz |
| 101 | POST | `{"rankinglistversiondate":"01/26/2026","playerid":"330650"}` | 200 | 13047 | 629020445EB8A8B8FF41B38688D891E99F6DC950D45E0E7194F6A463CB880D0D | call-101.json.gz |
| 102 | POST | `{"rankinglistversiondate":"02/02/2026","playerid":"330650"}` | 200 | 13047 | F03368885DF813EEB8C9FDEEB5440279BF44BD6D096F19FB5FDF104F353FD09D | call-102.json.gz |
| 103 | POST | `{"rankinglistversiondate":"02/09/2026","playerid":"330650"}` | 200 | 13047 | E8A1A4A4C64B1D086E11880BC8F3A55003B3BFFF3A00F991F422E498CC994D0B | call-103.json.gz |
| 104 | POST | `{"rankinglistversiondate":"02/16/2026","playerid":"330650"}` | 200 | 13047 | 7842902030814C5C64B69A9D8E1C4F2BEFF7FB8CC781F4394575F4E314D614CD | call-104.json.gz |
| 105 | POST | `{"rankinglistversiondate":"02/23/2026","playerid":"330650"}` | 200 | 13047 | 6BF3518214C3819B68207DC261A980F57CC1058A70E9DC164F141B7DE5CC924E | call-105.json.gz |
| 106 | POST | `{"rankinglistversiondate":"03/02/2026","playerid":"330650"}` | 200 | 13047 | CBEFE2A0B4177A494F9E54E1FC11382D096282A2E3D06F7E87F8AAE807B7A36C | call-106.json.gz |
| 107 | POST | `{"rankinglistversiondate":"03/09/2026","playerid":"330650"}` | 200 | 13047 | DA8838D43D9584C2210843415BAB15EF204CAD6E4923372102302319CF1CC2E6 | call-107.json.gz |
| 108 | POST | `{"rankinglistversiondate":"03/16/2026","playerid":"330650"}` | 200 | 13047 | 5073A949777F18AC86D41B9E8C4D4BA52B5996C684A866AC24D9FD67A48E4071 | call-108.json.gz |
| 109 | POST | `{"rankinglistversiondate":"03/23/2026","playerid":"330650"}` | 200 | 13047 | F020065850EDDCC03FA650A78D884D16012E09654F03B778A5D141B798890DEB | call-109.json.gz |
| 110 | POST | `{"rankinglistversiondate":"03/30/2026","playerid":"330650"}` | 200 | 13047 | 1C307010578AC9B82C0FBF0CC6DB2FCDCAF8D8017C2864ACF837E5E5FE360EAF | call-110.json.gz |
| 111 | POST | `{"rankinglistversiondate":"04/06/2026","playerid":"330650"}` | 200 | 13047 | FD75FB62F16A8E247EA593DC43CA65A4EFAD354514EBAEF9D96B08C238892D26 | call-111.json.gz |
| 112 | POST | `{"rankinglistversiondate":"04/13/2026","playerid":"330650"}` | 200 | 13047 | 04B28C74F13BD985336B663C8899D4C729E6C6EAF35B853969A8F0F4264E5788 | call-112.json.gz |
| 113 | POST | `{"rankinglistversiondate":"04/20/2026","playerid":"330650"}` | 200 | 13047 | D02651A896789628521E3E05DF3B207A2D18586538373985B0CAAC868872E5AD | call-113.json.gz |
| 114 | POST | `{"rankinglistversiondate":"04/27/2026","playerid":"330650"}` | 200 | 13047 | 5C5AAE3D6F43BA5DEAFDD287E130AC3B193DD12131C45E6CE5C772DFA0BAC430 | call-114.json.gz |
| 115 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-115.json.gz |
| 116 | POST | `{"rankinglistversiondate":"05/04/2026","playerid":"330650"}` | 200 | 13047 | 074214C040F9107F32046C103F4DB5A2DA74F8A4FE49A3507AF6087DA204B66D | call-116.json.gz |
| 117 | POST | `{"rankinglistversiondate":"05/11/2026","playerid":"330650"}` | 200 | 13047 | F937C39EEDB29291BFFE667D1A1DECCC1832F4B2A62DA408B417A8B0C263843A | call-117.json.gz |
| 118 | POST | `{"rankinglistversiondate":"05/18/2026","playerid":"330650"}` | 200 | 13047 | A0A4D3F34932F849856976450A89E751F42D5F173C7CF8857A5FDC1867BCA72B | call-118.json.gz |
| 119 | POST | `{"rankinglistversiondate":"05/25/2026","playerid":"330650"}` | 200 | 13047 | CEEAD387110E9470E3FC4EAC6261E76CF91A1573E85111A4D7FB7D771E51E0EB | call-119.json.gz |
| 120 | POST | `{"rankinglistversiondate":"06/01/2026","playerid":"330650"}` | 200 | 13047 | 035860B788859779E22CA62BDD4B3FAC69A36B78C3D86DD32CA60B02E0951748 | call-120.json.gz |
| 121 | POST | `{"rankinglistversiondate":"06/08/2026","playerid":"330650"}` | 200 | 13047 | 2F95B81ECBCE4EA5B0A1598CC2A7159DC3F9B57D3B5850A21B6DF9171FEC40BE | call-121.json.gz |
| 122 | POST | `{"rankinglistversiondate":"06/15/2026","playerid":"330650"}` | 200 | 13047 | 6BBB664BFABCBF3E80A64A27241265332359862F636D6770C038C5B98C5562BB | call-122.json.gz |
| 123 | POST | `{"rankinglistversiondate":"06/29/2026","playerid":"330650"}` | 200 | 13047 | F51DEF81D7E9FE89E2D01EB43C00BAD5E67993C245BB51B42C365CDFC3E1FD2C | call-123.json.gz |
| 124 | POST | `{"rankinglistid":"289","rankinglistversiondate":"07/21/2025","playerid":"330770"}` | 200 | 13067 | D76F8811FBF794F952093AACCE00285A00FC38B0E63AAD55631CC6332860FEDB | call-124.json.gz |
| 125 | POST | `{"rankinglistid":"289","rankinglistversiondate":"07/28/2025","playerid":"330770"}` | 200 | 13067 | FFD8121B6FBE8AFA316B4EDE2FD6BBC46B9C99ADADE846E6BA7637E52D4D28F3 | call-125.json.gz |
| 126 | POST | `{"rankinglistid":"289","rankinglistversiondate":"08/04/2025","playerid":"330770"}` | 200 | 13067 | 1256472D68E08BB9D4C9DE918CB23BCECCBDD716A4F26A43BC5D072BDF51A71B | call-126.json.gz |
| 127 | POST | `{"rankinglistid":"289","rankinglistversiondate":"08/11/2025","playerid":"330770"}` | 200 | 13067 | 1D061C917E3D2C2C95DF643E7B5EB004BD26CBA591F9324C263AEB847A484BCD | call-127.json.gz |
| 128 | POST | `{"rankinglistid":"289","rankinglistversiondate":"08/18/2025","playerid":"330770"}` | 200 | 13067 | 93B6B026B9CB993DC6E528B4D80895B28E06961DF6F223CB877D9B6CE9F38D68 | call-128.json.gz |
| 129 | POST | `{"rankinglistid":"289","rankinglistversiondate":"08/25/2025","playerid":"330770"}` | 200 | 13067 | 3AFF935F08D00DFD59383B300AA0388D1CB45AFBC309EB89475ACD1757A7B637 | call-129.json.gz |
| 130 | POST | `{"rankinglistid":"289","rankinglistversiondate":"09/01/2025","playerid":"330770"}` | 200 | 13067 | 77643D0246D87DEABA59B3D4B837C79B4206F606042A412B0AC28ACA4BFC2FF5 | call-130.json.gz |
| 131 | POST | `{"rankinglistid":"289","rankinglistversiondate":"09/08/2025","playerid":"330770"}` | 200 | 13067 | 81350EF309DA65E21EB77AAD034FEFB5A51C97B1A8555491E190D66227790C43 | call-131.json.gz |
| 132 | POST | `{"rankinglistid":"289","rankinglistversiondate":"09/15/2025","playerid":"330770"}` | 200 | 13067 | 1A1FA02DC0B6D6A24ECB9274B9501FD310459C3A1F44AA0DD7E7AAECDA3C8BC8 | call-132.json.gz |
| 133 | POST | `{"rankinglistid":"289","rankinglistversiondate":"09/22/2025","playerid":"330770"}` | 200 | 13067 | AB62F3FFBE7A2A44DC94486DCC48511E9AA3CD82B16B6C73E5CEFE668FA83057 | call-133.json.gz |
| 134 | POST | `{"rankinglistid":"289","rankinglistversiondate":"09/29/2025","playerid":"330770"}` | 200 | 13067 | DFBB74D0EC3EABB192C42C631F13C9AC00CC3A8CDCF9A5D389F6FE985937B9E8 | call-134.json.gz |
| 135 | POST | `{"rankinglistid":"289","rankinglistversiondate":"10/06/2025","playerid":"330770"}` | 200 | 13067 | AC90F1F5C9E6B6EFC2066D0FB77AD9698B72249739E2249E7CC8488569FF6125 | call-135.json.gz |
| 136 | POST | `{"rankinglistid":"289","rankinglistversiondate":"10/13/2025","playerid":"330770"}` | 200 | 13067 | 5BC11A101109A0C3F4AF9BFF01AB72B31F2B0CB55E6A168654215DD44EB7937F | call-136.json.gz |
| 137 | POST | `{"rankinglistid":"289","rankinglistversiondate":"10/20/2025","playerid":"330770"}` | 200 | 13067 | 9BC50E8C24735BC4E54BE5D9F1E93CA502C65B63213DD3191146D9CF5CF2D83C | call-137.json.gz |
| 138 | POST | `{"rankinglistid":"289","rankinglistversiondate":"10/27/2025","playerid":"330770"}` | 200 | 13067 | 45C04378DBFDC967D56596A0EC16EE8495F5E97E6F87CEC5E8646F58E6AF220C | call-138.json.gz |
| 139 | POST | `{"rankinglistid":"289","rankinglistversiondate":"11/03/2025","playerid":"330770"}` | 200 | 13067 | 2546D6286593F312C96DF5C98ED9AD4E516F5676E2B89EAEC01D1B114C5FCEBA | call-139.json.gz |
| 140 | POST | `{"rankinglistid":"289","rankinglistversiondate":"11/10/2025","playerid":"330770"}` | 200 | 13067 | 1DDCC3CFF816F30D232DF7A1F2B4C55FF57305C6E626A1F62D89A526FB27EADD | call-140.json.gz |
| 141 | POST | `{"rankinglistid":"289","rankinglistversiondate":"11/17/2025","playerid":"330770"}` | 200 | 13067 | 85B6DC1B73F135048E981495FBDC56640BBE38FE0A9F55460461F10D544BF59E | call-141.json.gz |
| 142 | POST | `{"rankinglistid":"289","rankinglistversiondate":"11/24/2025","playerid":"330770"}` | 200 | 13067 | 86075F3E8A7A7E48679CE22F7E341E93891649814651DE1043F41EA6AC9042E3 | call-142.json.gz |
| 143 | POST | `{"rankinglistid":"289","rankinglistversiondate":"12/01/2025","playerid":"330770"}` | 200 | 13067 | 9BE8C6838DF00607C595524B88A63303F5DE6B24DD232DD41341F7427514BC97 | call-143.json.gz |
| 144 | POST | `{"rankinglistid":"289","rankinglistversiondate":"12/08/2025","playerid":"330770"}` | 200 | 13067 | 166645613AA8BB1A7D4C81586CE8C03185379BA7B20A2A0565A94151681F9081 | call-144.json.gz |
| 145 | POST | `{"rankinglistid":"289","rankinglistversiondate":"12/15/2025","playerid":"330770"}` | 200 | 13067 | 962E96CE7FE3D99B050852B12288311A88F138AB1FF84447FFDE5418CD114CCB | call-145.json.gz |
| 146 | POST | `{"rankinglistid":"289","rankinglistversiondate":"12/22/2025","playerid":"330770"}` | 200 | 13067 | 1B05C74EEE9D33D4F2CDB678540579A8F9EF530E8330D6829E06E6FD54982C62 | call-146.json.gz |
| 147 | POST | `{"rankinglistid":"289","rankinglistversiondate":"12/29/2025","playerid":"330770"}` | 200 | 13067 | 6463FB900BE74AEC5F36B603778F03DB4EDF61F3C44AA273BE22ECA27A12269F | call-147.json.gz |
| 148 | POST | `{"rankinglistid":"289","rankinglistversiondate":"01/05/2026","playerid":"330770"}` | 200 | 13067 | 0BE12764083C8D95FC43DDE6DF76A9D363E6D3E13EF1734589EF856A91EA5B98 | call-148.json.gz |
| 149 | POST | `{"rankinglistid":"289","rankinglistversiondate":"01/12/2026","playerid":"330770"}` | 200 | 13067 | A1CEA0739AA836D34D441256E82B5D42D09942FD4A1DA1CDBB854943298621DE | call-149.json.gz |
| 150 | POST | `{"rankinglistid":"289","rankinglistversiondate":"01/19/2026","playerid":"330770"}` | 200 | 13067 | 59952811CA75F38B75B5F73DF162E7F10F1794AF3CA22D532229F794DD1EF0A5 | call-150.json.gz |
| 151 | POST | `{"rankinglistid":"289","rankinglistversiondate":"01/26/2026","playerid":"330770"}` | 200 | 13067 | 2CAAA84EFF47316B36226BBDC5F82B0EBAFEEC3E4520AE01A8337958EFF91E2F | call-151.json.gz |
| 152 | POST | `{"rankinglistid":"289","rankinglistversiondate":"02/02/2026","playerid":"330770"}` | 200 | 13067 | B1D758087AE7431418C352111D082A25E9FB63EE7B6520DE8D14D8583CE011DA | call-152.json.gz |
| 153 | POST | `{"rankinglistid":"289","rankinglistversiondate":"02/09/2026","playerid":"330770"}` | 200 | 13067 | CCBCB16DDE0C34FDBF95B100FD40022CF7E0AAD834B1D71B479A6F13BC6DBDEE | call-153.json.gz |
| 154 | POST | `{"rankinglistid":"289","rankinglistversiondate":"02/16/2026","playerid":"330770"}` | 200 | 13067 | 5287487E66E968694759438B06BC748B2ED9717B1FF1629EA3BFC9B71218F950 | call-154.json.gz |
| 155 | POST | `{"rankinglistid":"289","rankinglistversiondate":"02/23/2026","playerid":"330770"}` | 200 | 13067 | 45C75C2BF3EB108AFDD91C31F6C3C23238817E3CAD2E183A5F2CB1F4B243DDB5 | call-155.json.gz |
| 156 | POST | `{"rankinglistid":"289","rankinglistversiondate":"03/02/2026","playerid":"330770"}` | 200 | 13067 | 10E6FF7C53189529D74D3368C6D5475E655CC182E56711DC474FF1049D3D6C1D | call-156.json.gz |
| 157 | POST | `{"rankinglistid":"289","rankinglistversiondate":"03/09/2026","playerid":"330770"}` | 200 | 13067 | BAD81FE3D8F2F399514CAF92CB17C0C0F593DC2B0B40B3B123AF8486C0DEE666 | call-157.json.gz |
| 158 | POST | `{"rankinglistid":"289","rankinglistversiondate":"03/16/2026","playerid":"330770"}` | 200 | 13067 | 1E60BF7A16A07DDD3FC5BA161A15062F1E18409AB3AE6FBF392C06A4A168B8FD | call-158.json.gz |
| 159 | POST | `{"rankinglistid":"289","rankinglistversiondate":"03/23/2026","playerid":"330770"}` | 200 | 13067 | BB3EEEDDFA7A895910FAFD0A1FCE5FC6BF1B9242A0A3718060DA93430F33EE69 | call-159.json.gz |
| 160 | POST | `{"rankinglistid":"289","rankinglistversiondate":"03/30/2026","playerid":"330770"}` | 200 | 13067 | 2EFB2927AFA6D1DE10660FE70CD09F9FC82217C090B80B09ECBD49A211B6B750 | call-160.json.gz |
| 161 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-161.json.gz |
| 162 | POST | `{"rankinglistid":"289","rankinglistversiondate":"04/06/2026","playerid":"330770"}` | 200 | 13067 | DB89623FA0915332BCE41B1558CF653519572C5B91232089485707E7FA41FF01 | call-162.json.gz |
| 163 | POST | `{"rankinglistid":"289","rankinglistversiondate":"04/13/2026","playerid":"330770"}` | 200 | 13067 | FC574C09593846EA06896CA9BC0FB12721BA86D5E1F2E086ABAC2917B8FF0742 | call-163.json.gz |
| 164 | POST | `{"rankinglistid":"289","rankinglistversiondate":"04/20/2026","playerid":"330770"}` | 200 | 13067 | 907517C2CF6FF66F9F5AFA9DA5A55EBFCB76BD9F747470531E1B2724B4957EF9 | call-164.json.gz |
| 165 | POST | `{"rankinglistid":"289","rankinglistversiondate":"04/27/2026","playerid":"330770"}` | 200 | 13067 | C53A72371C7313EA9AC5A48220CAC621C52C8FEDCEE98B92719A7941CD533ED2 | call-165.json.gz |
| 166 | POST | `{"rankinglistid":"289","rankinglistversiondate":"05/04/2026","playerid":"330770"}` | 200 | 13067 | 3C21C1EBA7E8161780AA30E09027749D5A3DB878687D3C1E9DD4EAA12ABE6B04 | call-166.json.gz |
| 167 | POST | `{"rankinglistid":"289","rankinglistversiondate":"05/11/2026","playerid":"330770"}` | 200 | 13067 | 9B21FFF83F89333201D97A75B5899534237FAE2F663AC663DB90F5B75D3A79BE | call-167.json.gz |
| 168 | POST | `{"rankinglistid":"289","rankinglistversiondate":"05/18/2026","playerid":"330770"}` | 200 | 13067 | 558E21D6C8416FA82E9A86753AD457D84166E7AEA1617F74031C305B1FCF1933 | call-168.json.gz |
| 169 | POST | `{"rankinglistid":"289","rankinglistversiondate":"05/25/2026","playerid":"330770"}` | 200 | 13067 | 33BEFDB41A8FC0D5B6AB2CBAB6B508590725AF4887C20676525B92FE60BF140A | call-169.json.gz |
| 170 | POST | `{"rankinglistid":"289","rankinglistversiondate":"06/01/2026","playerid":"330770"}` | 200 | 13067 | 6A124A96664001C4C887BFDD06F586DFA756D28470508C30723F83930FB80279 | call-170.json.gz |
| 171 | POST | `{"rankinglistid":"289","rankinglistversiondate":"06/08/2026","playerid":"330770"}` | 200 | 13067 | 2F2EA1B4BBEB1776617D2FD7A9933AA25AC3A407100F08C3577EC26F78A71C12 | call-171.json.gz |
| 172 | POST | `{"rankinglistid":"289","rankinglistversiondate":"06/15/2026","playerid":"330770"}` | 200 | 13067 | D964FB45CCDF66715623FA497BAABEADE65C99C80BAFCA73211E4595A81F534D | call-172.json.gz |
| 173 | POST | `{"rankinglistid":"289","rankinglistversiondate":"06/29/2026","playerid":"330770"}` | 200 | 13067 | 525C1F1DDDFE9DC96B84FBC6276FD9F1D24C274F39A5A1F20B878A0CF3293D48 | call-173.json.gz |
| 174 | POST | `{"rankinglistversiondate":"07/21/2025","playerid":"327691"}` | 200 | 13041 | 41629612E236F3C36B012EC39ED7A33F264621C027B7F809F1A7AE232A1E7693 | call-174.json.gz |
| 175 | POST | `{"rankinglistversiondate":"07/28/2025","playerid":"327691"}` | 200 | 13041 | 1F9F37F77B9411152B76B0449A0C9E3E4016C6033906713EB87E2FB6A166ABE3 | call-175.json.gz |
| 176 | POST | `{"rankinglistversiondate":"08/04/2025","playerid":"327691"}` | 200 | 13041 | 6BF81AE99290600F2F4469B4FF5ABF17D849C2E83BDBFAF05CCEC71E5064BC8B | call-176.json.gz |
| 177 | POST | `{"rankinglistversiondate":"08/11/2025","playerid":"327691"}` | 200 | 13041 | 1C325B23621173E9287D5872B92DB407278A5C4B01D3C485DD2D8F83FCD660C4 | call-177.json.gz |
| 178 | POST | `{"rankinglistversiondate":"08/18/2025","playerid":"327691"}` | 200 | 13041 | DC2CE27394B516E5853014336A4BD0C0A0E96E95E569E0ED6CA92F152EEC0A2E | call-178.json.gz |
| 179 | POST | `{"rankinglistversiondate":"08/25/2025","playerid":"327691"}` | 200 | 13041 | 02443A3A0C6A9287A217A92A1F6151C755E820D7D95AE20AA8EAA57048711064 | call-179.json.gz |
| 180 | POST | `{"rankinglistversiondate":"09/01/2025","playerid":"327691"}` | 200 | 13041 | 861516DD9FE7E57640C1BF684153015D95D04F4F27138541129C765DD00C7743 | call-180.json.gz |
| 181 | POST | `{"rankinglistversiondate":"09/08/2025","playerid":"327691"}` | 200 | 13041 | 4A91B728CFD47E6E1F716AE41CD802CB67812DC17C6DD9F6BBF25E971DB32F82 | call-181.json.gz |
| 182 | POST | `{"rankinglistversiondate":"09/15/2025","playerid":"327691"}` | 200 | 13041 | 9C080969A8853EF9C59A4F831B8304D0DC6ACE489EC5C2D38F3F7C66EBC69C78 | call-182.json.gz |
| 183 | POST | `{"rankinglistversiondate":"09/22/2025","playerid":"327691"}` | 200 | 13041 | B025079F4D78705098C8DC925112E4B88AAF262A022B2029102E57DA38CBC3BC | call-183.json.gz |
| 184 | POST | `{"rankinglistversiondate":"09/29/2025","playerid":"327691"}` | 200 | 13041 | D0E5BCE764DC756E8F8CB4A22D1F41B7FE7AF8D7C12220375F931D53473D3CEE | call-184.json.gz |
| 185 | POST | `{"rankinglistversiondate":"10/06/2025","playerid":"327691"}` | 200 | 13041 | B3896CCEEB3BFB583A57EF29012ADA0017B6C8AE3BDFF21171260CC8F5A864D0 | call-185.json.gz |
| 186 | POST | `{"rankinglistversiondate":"10/13/2025","playerid":"327691"}` | 200 | 13041 | D770889D36BF8BC7A57F56225BAF88E3CA8EA84024D2C592C54FFBAD9335CF04 | call-186.json.gz |
| 187 | POST | `{"rankinglistversiondate":"10/20/2025","playerid":"327691"}` | 200 | 13041 | B97D0BFA7B76AD6A42A3D67D0BBE208B8C07896808FE0F1BC442F177B3EC6012 | call-187.json.gz |
| 188 | POST | `{"rankinglistversiondate":"10/27/2025","playerid":"327691"}` | 200 | 13041 | E117CD1235D3BB0C38E5EDB9A03D43AB3A522AB47838F8D3C0CF9F79CE80993A | call-188.json.gz |
| 189 | POST | `{"rankinglistversiondate":"11/03/2025","playerid":"327691"}` | 200 | 13041 | 0CAE8BC4FB6F3D13AACABBB75DC29EDD29E2325972AFAD9280FA435F245B00DF | call-189.json.gz |
| 190 | POST | `{"rankinglistversiondate":"11/10/2025","playerid":"327691"}` | 200 | 13041 | EFD869643DD9126356B31B87771BBA75F11584C2AC17BA9DAB8F433B78910717 | call-190.json.gz |
| 191 | POST | `{"rankinglistversiondate":"11/17/2025","playerid":"327691"}` | 200 | 13041 | 07294DE6D4CD2148888018A02D454D0AC9C125B8F6CEFEDCAE82A9DCE6E1590E | call-191.json.gz |
| 192 | POST | `{"rankinglistversiondate":"11/24/2025","playerid":"327691"}` | 200 | 13041 | 4CB6408547879F4ED72142DBB4508A1BF444C5FC1E3788912CFB9E9E6E37DC0D | call-192.json.gz |
| 193 | POST | `{"rankinglistversiondate":"12/01/2025","playerid":"327691"}` | 200 | 13041 | 8C8A73105385C9E0BDF16345EB64D3FD1DE86A28E734760845B579CADC9C719B | call-193.json.gz |
| 194 | POST | `{"rankinglistversiondate":"12/08/2025","playerid":"327691"}` | 200 | 13041 | EB3B91A96AF29E02FAC45A7E970BA67984ACF6E054EF773B8246BF2119E9AC1E | call-194.json.gz |
| 195 | POST | `{"rankinglistversiondate":"12/15/2025","playerid":"327691"}` | 200 | 13041 | 956D16CC49D7C4ABD75721E7D538776D0DAFB28696822031BBAAF6D37FDF79D0 | call-195.json.gz |
| 196 | POST | `{"rankinglistversiondate":"12/22/2025","playerid":"327691"}` | 200 | 13041 | E897FBF1C56D1B4DEE6044E13D657302C29F7832160C1CBDA6D41E37DD887CC5 | call-196.json.gz |
| 197 | POST | `{"rankinglistversiondate":"12/29/2025","playerid":"327691"}` | 200 | 13041 | 326B5602FA5906B71A648E69AF83D1CEA9164FC0DCB41BCE7B3A3CE3BE9DA661 | call-197.json.gz |
| 198 | POST | `{"rankinglistversiondate":"01/05/2026","playerid":"327691"}` | 200 | 13041 | BC9643019975F1274D105995D025CC0A1F7BC038103D0B9166474BA62EDEA7A9 | call-198.json.gz |
| 199 | POST | `{"rankinglistversiondate":"01/12/2026","playerid":"327691"}` | 200 | 13041 | 64659A276F5C5514BD993A9B80167BEFC13B7EFCFBA36043CA4B36BA5D67C1C7 | call-199.json.gz |
| 200 | POST | `{"rankinglistversiondate":"01/19/2026","playerid":"327691"}` | 200 | 13041 | 87EDBF9729D2F4A24AF0C3B611A79565D169A3B00C1663D8E6AAA38D9EAB8A4A | call-200.json.gz |
| 201 | POST | `{"rankinglistversiondate":"01/26/2026","playerid":"327691"}` | 200 | 13041 | 70499352CEE935CC9EDFA4A33A8A6B0EFF794018357D090BBCD602A8520FCD77 | call-201.json.gz |
| 202 | POST | `{"rankinglistversiondate":"02/02/2026","playerid":"327691"}` | 200 | 13041 | A39A98F2C8D77F10AADBA3C8AB504CEA4804E1BE2552B42BAF648B72725F6FA3 | call-202.json.gz |
| 203 | POST | `{"rankinglistversiondate":"02/09/2026","playerid":"327691"}` | 200 | 13041 | 6FD56FA02C24EFA4BE728EF4A1CBFBA4E2A3681C4A12A9C31773C4B9AC2DCBBB | call-203.json.gz |
| 204 | POST | `{"rankinglistversiondate":"02/16/2026","playerid":"327691"}` | 200 | 13041 | 1C4CDF934B577DD5A684251121DC311BD991CB8F592DEE466BEF42D8579CE13C | call-204.json.gz |
| 205 | POST | `{"rankinglistversiondate":"02/23/2026","playerid":"327691"}` | 200 | 13041 | 5B8D707C6ED38E9DC58BF151D416747FC8E5CF8A24E0DB89096DEF9300061320 | call-205.json.gz |
| 206 | POST | `{"rankinglistversiondate":"03/02/2026","playerid":"327691"}` | 200 | 13041 | CAC8D2967471A03537BD155E7ED08B8AF4DCF14E8D610A0878039300D9E7CE6B | call-206.json.gz |
| 207 | GET | `{}` | ukendt | 21760 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-207.json.gz |
| 208 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-208.json.gz |
| 209 | POST | `{"rankinglistversiondate":"03/09/2026","playerid":"327691"}` | 200 | 13041 | 38D77B1633AB7B01041537757B0E25AF2E93FCE228E84EBCBA1EAA77BE54302F | call-209.json.gz |
| 210 | POST | `{"rankinglistversiondate":"03/16/2026","playerid":"327691"}` | 200 | 13041 | 255AF97336909702FDF252ACC6C423F6F41AAD58CB120B635D865858C7564AB6 | call-210.json.gz |
| 211 | POST | `{"rankinglistversiondate":"03/23/2026","playerid":"327691"}` | 200 | 13041 | 8C4629E14240FE6954DD4A7A1A20F054A398AFE068E62EDD795DE9A710FAA279 | call-211.json.gz |
| 212 | POST | `{"rankinglistversiondate":"03/30/2026","playerid":"327691"}` | 200 | 13041 | EEA3BDECDC8885F459DD9FE050FB5B1CB9C3BF97958BF8F35D323E398C611948 | call-212.json.gz |
| 213 | POST | `{"rankinglistversiondate":"04/06/2026","playerid":"327691"}` | 200 | 13041 | DA7AF2C039929AC7C4042712933D2F8BF00D40D5848D210B8350DBFA0A3097BB | call-213.json.gz |
| 214 | POST | `{"rankinglistversiondate":"04/13/2026","playerid":"327691"}` | 200 | 13041 | EBDEDDFD1D668EC995E1DE68F4920D1178564A1C09B076F771681653A8F71CE3 | call-214.json.gz |
| 215 | POST | `{"rankinglistversiondate":"04/20/2026","playerid":"327691"}` | 200 | 13041 | F24B7C8D00010E05A2A01F41D80F9BB64D60908262DD3B50082088691DBE6487 | call-215.json.gz |
| 216 | POST | `{"rankinglistversiondate":"04/27/2026","playerid":"327691"}` | 200 | 13041 | CAFBEDEEAFBA9CDB6A4FBECAD4D4298BDB6772550D56EF8D5099B743BABD501F | call-216.json.gz |
| 217 | POST | `{"rankinglistversiondate":"05/04/2026","playerid":"327691"}` | 200 | 13041 | 5D7875A153E48A3B3948F0FF1F4B0B1AC0B721991DAFD51391F39A8CC8605F9D | call-217.json.gz |
| 218 | POST | `{"rankinglistversiondate":"05/11/2026","playerid":"327691"}` | 200 | 13041 | 5366812336DF3977A494B1BEDAA82CEFD30907FCB862148CCE3982B793F472E2 | call-218.json.gz |
| 219 | POST | `{"rankinglistversiondate":"05/18/2026","playerid":"327691"}` | 200 | 13041 | 3C0E2637F319BE3BA2703B86A6F97BFE5A283E630ECCC07FEDB2DE7372C8FE39 | call-219.json.gz |
| 220 | POST | `{"rankinglistversiondate":"05/25/2026","playerid":"327691"}` | 200 | 13041 | 7BC8FB760E49B63E2945ECEA18769AF1BED6BFD91F957C8EACCA25D65BE3E737 | call-220.json.gz |
| 221 | POST | `{"rankinglistversiondate":"06/01/2026","playerid":"327691"}` | 200 | 13041 | 16AA8FB0AAE1AF056D7B5E80A0993DBA3A898541DB92AFE478C360EACC2F1E9B | call-221.json.gz |
| 222 | POST | `{"rankinglistversiondate":"06/08/2026","playerid":"327691"}` | 200 | 13041 | 3552743B7ED5587F7D8E1FD323BAC53ED7B02EC5170537F402DC2F48DB3A901E | call-222.json.gz |
| 223 | POST | `{"rankinglistversiondate":"06/15/2026","playerid":"327691"}` | 200 | 13041 | DF788A44A9ABCBF8BC625948CB926B02956EF993828A89C813F28C409D119A94 | call-223.json.gz |
| 224 | POST | `{"rankinglistversiondate":"06/29/2026","playerid":"327691"}` | 200 | 13041 | 9BF6218B3875B5C9EA88F10EB794F80D262B52C9946C32CBBF1184E3C9BA5A36 | call-224.json.gz |
| 225 | POST | `{"rankinglistversiondate":"07/21/2025","playerid":"328195","param":"K"}` | 200 | 13025 | CB6A06600E0E41B7AFC4B6EE6EB9597C3E414526F5F7CC4A28F320184A591CDA | call-225.json.gz |
| 226 | POST | `{"rankinglistversiondate":"07/28/2025","playerid":"328195","param":"K"}` | 200 | 13025 | FF6A05D0E64A0FA79525FD88A385E2ED347044CD1B0AD23CBA27E87966CBA40D | call-226.json.gz |
| 227 | POST | `{"rankinglistversiondate":"08/04/2025","playerid":"328195","param":"K"}` | 200 | 13025 | EC2717DD97D104893C4E1ABDDF0D0748962F8CC8AE78721CF7684D9F212C7C88 | call-227.json.gz |
| 228 | POST | `{"rankinglistversiondate":"08/11/2025","playerid":"328195","param":"K"}` | 200 | 13025 | FD24A5B01D31DB710503343D4849630D3FCE734BC97F35810777E1A12DF65B58 | call-228.json.gz |
| 229 | POST | `{"rankinglistversiondate":"08/18/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 9014E03187764462CFEA703E69E3317871CB5FE59F7327B5ADBDE7C0C64B7265 | call-229.json.gz |
| 230 | POST | `{"rankinglistversiondate":"08/25/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 2E828C0807D71A802C0197AF0785514A8C57D781BCB512AE23A395D8BD066B98 | call-230.json.gz |
| 231 | POST | `{"rankinglistversiondate":"09/01/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 94B50EF6A9680436F1FEA393FBC630E4F9774B548618060CBC61BB9BA3FA7152 | call-231.json.gz |
| 232 | POST | `{"rankinglistversiondate":"09/08/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 495E3450BF466A5C8CB75A84D3DD3191A554B07C643825DBDCFEDBA09C0BEACC | call-232.json.gz |
| 233 | POST | `{"rankinglistversiondate":"09/15/2025","playerid":"328195","param":"K"}` | 200 | 13025 | A9CD54CB28D367FDC217EC520AFC6A2C18E2C7CC07A8DF412454A3198A933BE9 | call-233.json.gz |
| 234 | POST | `{"rankinglistversiondate":"09/22/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 76B9B2778F4865DD822757239D11993AFCC861651209B59553D649846EB425D2 | call-234.json.gz |
| 235 | POST | `{"rankinglistversiondate":"09/29/2025","playerid":"328195","param":"K"}` | 200 | 13025 | E7E3A7B675C49958D9F568060A5AF7B00B02E7A853144B43394DD6FC30730E6A | call-235.json.gz |
| 236 | POST | `{"rankinglistversiondate":"10/06/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 69E46EBE98471F720B418D8399234173F6CE357271335B9EDB6C06A354618F0F | call-236.json.gz |
| 237 | POST | `{"rankinglistversiondate":"10/13/2025","playerid":"328195","param":"K"}` | 200 | 13025 | A153405930D0E6191287B02A902B4213D76C472A5F0EFC28DCEA5EACF2A76C29 | call-237.json.gz |
| 238 | POST | `{"rankinglistversiondate":"10/20/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 857DC4A4210DAF6AA0F75BCD49E2FF9C7BD94DB5E9B35C6F4E1B9E402DCB32C4 | call-238.json.gz |
| 239 | POST | `{"rankinglistversiondate":"10/27/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 0B843012CDB0B12B310402FB321DDDD6531619D514363C0972FD23BFA1C75B1F | call-239.json.gz |
| 240 | POST | `{"rankinglistversiondate":"11/03/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 9BC89E7E84A1856A0324D884A3BA0E97000D95B7018AA24ED6F9D84C2D5A311C | call-240.json.gz |
| 241 | POST | `{"rankinglistversiondate":"11/10/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 9C2D96791A7028AC3B8482D3D73C4E87CB9684A6F41560064707A652AED6BA56 | call-241.json.gz |
| 242 | POST | `{"rankinglistversiondate":"11/17/2025","playerid":"328195","param":"K"}` | 200 | 13025 | B390C2D91846A6C18B7504D8A8B898DC2DBD7604ECFAADA3FA24EDFA76040CB9 | call-242.json.gz |
| 243 | POST | `{"rankinglistversiondate":"11/24/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 0AC978DEF6FB7ADE9AAE8E2659CAD3480D8E2FFD13240155CFCD41BEC7B18473 | call-243.json.gz |
| 244 | POST | `{"rankinglistversiondate":"12/01/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 309F82AF57943E78E150E7214980BC1C9C163C640637E556135CBA7FE4CB55EE | call-244.json.gz |
| 245 | POST | `{"rankinglistversiondate":"12/08/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 3A9432E1FD31A4996A6560909752D90CFECA79B0A9B0B5439C1335ACEB75E1AF | call-245.json.gz |
| 246 | POST | `{"rankinglistversiondate":"12/15/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 657E5E30D01293F9F7C155D57B7DAA7149DD718727F0AAFD7F17E1985A1BA3B2 | call-246.json.gz |
| 247 | POST | `{"rankinglistversiondate":"12/22/2025","playerid":"328195","param":"K"}` | 200 | 13025 | A857B5CFDF3CBADB5E2C1BF6DFBBA445A6405D7C9C5B7B1863D31104F5BD8870 | call-247.json.gz |
| 248 | POST | `{"rankinglistversiondate":"12/29/2025","playerid":"328195","param":"K"}` | 200 | 13025 | 6F543B371DE16D7CB6B193CFB2F6D98CF242CD65ABC2B41184CA995E6E1A5746 | call-248.json.gz |
| 249 | POST | `{"rankinglistversiondate":"01/05/2026","playerid":"328195","param":"K"}` | 200 | 13025 | F06D11C087C4777ED3F87CEEEDDB5FAA20DFDE9CCA355529C594ABB8F58E5263 | call-249.json.gz |
| 250 | POST | `{"rankinglistversiondate":"01/12/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 5AFD5527E15BD9A94F2F778F98F4E1B8D3DFAF52A45C3EE2649E6522F1A3E0E1 | call-250.json.gz |
| 251 | POST | `{"rankinglistversiondate":"01/19/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 2F0AEFBF57950ADC3A254F02D7C8AF84CF78DDF831817965B82EB7B7BFB9AB57 | call-251.json.gz |
| 252 | POST | `{"rankinglistversiondate":"01/26/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 6D55D05A90A7F471F6723F68A9B35036C7478593F19B77B0904864B1EB9071F2 | call-252.json.gz |
| 253 | POST | `{"rankinglistversiondate":"02/02/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 18EB922637196C832409BD20259CDB2A3C709294A992AEFD36871975BAFD4B4F | call-253.json.gz |
| 254 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-254.json.gz |
| 255 | POST | `{"rankinglistversiondate":"02/09/2026","playerid":"328195","param":"K"}` | 200 | 13025 | C7C14487A466C4B831AFE6EF8FC7678E5DE50766828B3CDF89DA24DC4C1FF193 | call-255.json.gz |
| 256 | POST | `{"rankinglistversiondate":"02/16/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 3BAC76C672444FEECE97C712FBEC5CBF0E66DBE996D43361A2A85B6E52A73BA5 | call-256.json.gz |
| 257 | POST | `{"rankinglistversiondate":"02/23/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 82F55017C57792BB22A7D062E2B8D0B1D951E8BE9C08D82C8E39E8047F52DF73 | call-257.json.gz |
| 258 | POST | `{"rankinglistversiondate":"03/02/2026","playerid":"328195","param":"K"}` | 200 | 13025 | D531ED6E0A082E9D4278A2AFA08AF172E5E93901064EB7EB70D2534F683ED978 | call-258.json.gz |
| 259 | POST | `{"rankinglistversiondate":"03/09/2026","playerid":"328195","param":"K"}` | 200 | 13025 | CE4B21581B88836B4C1CB60096BDEC6058B69BBE9A3777B6CE6880D1851477F4 | call-259.json.gz |
| 260 | POST | `{"rankinglistversiondate":"03/16/2026","playerid":"328195","param":"K"}` | 200 | 13025 | A98FDCE286FB32A243EF12037F5FDA106F9D3B54322B50FB615DDEFB9FAE3D5D | call-260.json.gz |
| 261 | POST | `{"rankinglistversiondate":"03/23/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 34389EC803F6C9023D1715D6B258D56055A73CAA913F09A91F47B344B481E68E | call-261.json.gz |
| 262 | POST | `{"rankinglistversiondate":"03/30/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 29125D0E397491D8890E541B490A54D99462E7706E2D921FE7DE45A21829F349 | call-262.json.gz |
| 263 | POST | `{"rankinglistversiondate":"04/06/2026","playerid":"328195","param":"K"}` | 200 | 13025 | A384D3833A579EB9504CEBD7638D980A0053086F05D5A725EC844BEE5072B226 | call-263.json.gz |
| 264 | POST | `{"rankinglistversiondate":"04/13/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 008B989ADCE7C00098AC3B3A04BE04D06C4C17C7D2F78EA6162DDF11B60A557A | call-264.json.gz |
| 265 | POST | `{"rankinglistversiondate":"04/20/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 86FB4A157ACCEDB84671C8C24CAE586466E0E1E47C017870128997E51AF51B53 | call-265.json.gz |
| 266 | POST | `{"rankinglistversiondate":"04/27/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 68475F1D77145E821E346A4911345D48C5D316491D0A592DD360D77B1D8ACDC0 | call-266.json.gz |
| 267 | POST | `{"rankinglistversiondate":"05/04/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 44FF3E6D9A19F0D16790A208872AD88050D71D7875B744BB28405E878ADCD164 | call-267.json.gz |
| 268 | POST | `{"rankinglistversiondate":"05/11/2026","playerid":"328195","param":"K"}` | 200 | 13025 | EF2E10D38F6F88E2180BCED23FEB243D488F30C2FDC26010ADF74EAEA3FCD225 | call-268.json.gz |
| 269 | POST | `{"rankinglistversiondate":"05/18/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 73C14E3B2ADA68E24D4FDCD5F96307F77420CC5CD800A0C120F53618AE6ADC33 | call-269.json.gz |
| 270 | POST | `{"rankinglistversiondate":"05/25/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 23A29AF1D4E359B456C2312580DA3962E07F2DA174AE71B0E22118BC5922D0B1 | call-270.json.gz |
| 271 | POST | `{"rankinglistversiondate":"06/01/2026","playerid":"328195","param":"K"}` | 200 | 13025 | 94211AEC16720F165305BCDB6C0D05F3EFD0582CF953CDAD204517C16DC54B76 | call-271.json.gz |
| 272 | POST | `{"rankinglistversiondate":"06/08/2026","playerid":"328195","param":"K"}` | 200 | 13025 | B96AEA178ED0C0C3F9A442703C79BC90D7E9B0B25F3D8442FED7656DE0615991 | call-272.json.gz |
| 273 | POST | `{"rankinglistversiondate":"06/15/2026","playerid":"328195","param":"K"}` | 200 | 13025 | C5E2C45931FEAEDDFF5FE1F42679E5C304587EC989E13D154D600094E10C0174 | call-273.json.gz |
| 274 | POST | `{"rankinglistversiondate":"06/29/2026","playerid":"328195","param":"K"}` | 200 | 13025 | A411788FC0339CA542C434F8C0E0E49A502A4873B53CCB072FEA3A89A8D25562 | call-274.json.gz |
| 275 | POST | `{"rankinglistversiondate":"07/21/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 4F89340BA08AFB7D562A5C5F76D0DE9FFB8E8078C283F1E60F2159AAEBD4D34E | call-275.json.gz |
| 276 | POST | `{"rankinglistversiondate":"07/28/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 9020C72099156EF10E5BD6A9A9222A0C6EF8DC9416B0A63219C9043D4AFEC214 | call-276.json.gz |
| 277 | POST | `{"rankinglistversiondate":"08/04/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 2842DD471632598B38743D3A347A2FF5A9D5635DF7ABC7BC25FA658C50C7B1DD | call-277.json.gz |
| 278 | POST | `{"rankinglistversiondate":"08/11/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 1ACED4979CA97B4834B74855557774056BC2340291AF14AFCF448FE4C0AC091A | call-278.json.gz |
| 279 | POST | `{"rankinglistversiondate":"08/18/2025","playerid":"328196","param":"K"}` | 200 | 12319 | E01596E423518D261E38BE0E7472B98130D1256505013FBF76C0F5E85809C0ED | call-279.json.gz |
| 280 | POST | `{"rankinglistversiondate":"08/25/2025","playerid":"328196","param":"K"}` | 200 | 12319 | A39316AF95AB6A35776F67BC7F12A97CB9E0D5856578BEC61AC9BCA9A5FFD7E6 | call-280.json.gz |
| 281 | POST | `{"rankinglistversiondate":"09/01/2025","playerid":"328196","param":"K"}` | 200 | 12319 | AF364E290FF6F6DF8E5FAE8DFEF291521D4383DA7D09C6FA1C6A26065B43C39B | call-281.json.gz |
| 282 | POST | `{"rankinglistversiondate":"09/08/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 465CC4803707B7D46D814574E11C2E98C8C33096DA98EA902D5A5A3064240FC2 | call-282.json.gz |
| 283 | POST | `{"rankinglistversiondate":"09/15/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 7517B69C77C0CA064EE127D29729C45CEC387BAD202AB04A4A8B4417B0B67324 | call-283.json.gz |
| 284 | POST | `{"rankinglistversiondate":"09/22/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 5A5A83B4D00648A465C9E9AE4C4F195EDC9EB71910FB35DDFD4BCEADB86C7CB7 | call-284.json.gz |
| 285 | POST | `{"rankinglistversiondate":"09/29/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 0FA656A656C9AF2AF7B30D9773D0BC082C4F44C4E334038532D86DF0B9A619A7 | call-285.json.gz |
| 286 | POST | `{"rankinglistversiondate":"10/06/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 2683DA8CB68FBD2599AC21E9F1AF6CD119B551EE81A42E7C2EACE6B8170DD833 | call-286.json.gz |
| 287 | POST | `{"rankinglistversiondate":"10/13/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 6A363B85B282DFA19CCC040E8E4FF85FE79ABD5E81D5D11908DB914C34CC1517 | call-287.json.gz |
| 288 | POST | `{"rankinglistversiondate":"10/20/2025","playerid":"328196","param":"K"}` | 200 | 12319 | 8F71EFEBDB2D329FE0E321FB417369943EEDF8E84CF1F6B7861194F7DC3F7113 | call-288.json.gz |
| 289 | POST | `{"rankinglistversiondate":"10/27/2025","playerid":"328196","param":"K"}` | 200 | 13044 | D531BA3592CD7417EF1EAC56596B669FF5D17563BC5892C66217F882F2D0B088 | call-289.json.gz |
| 290 | POST | `{"rankinglistversiondate":"11/03/2025","playerid":"328196","param":"K"}` | 200 | 13044 | AECF3DA0B6D2A121C3DC8A0440A4AF5A6C34197C312ED753DE5B45C7077101F9 | call-290.json.gz |
| 291 | POST | `{"rankinglistversiondate":"11/10/2025","playerid":"328196","param":"K"}` | 200 | 13044 | E761C51EE0C8C9DC4386BFC9B40BE90987FFB278947EB367384F811A3CCB6D98 | call-291.json.gz |
| 292 | POST | `{"rankinglistversiondate":"11/17/2025","playerid":"328196","param":"K"}` | 200 | 13044 | B8D67D3AC9193DCA4EA7F497EF157D0E82873CCE50BE82DD61C545F7DCEEC36C | call-292.json.gz |
| 293 | POST | `{"rankinglistversiondate":"11/24/2025","playerid":"328196","param":"K"}` | 200 | 13044 | 435916605F3DEE68A397D449C4CF956354217C73992FE5BC75E2A0EE5C82B3ED | call-293.json.gz |
| 294 | POST | `{"rankinglistversiondate":"12/01/2025","playerid":"328196","param":"K"}` | 200 | 13044 | F513676936776D0042428B3E83542780D6E94ED5620C06D5DF96897DFC0AF8BE | call-294.json.gz |
| 295 | POST | `{"rankinglistversiondate":"12/08/2025","playerid":"328196","param":"K"}` | 200 | 13044 | BA156C9410A888BCDDAAF58005CC1D3C53C545C1E0EC05E586C86E837181E8E0 | call-295.json.gz |
| 296 | POST | `{"rankinglistversiondate":"12/15/2025","playerid":"328196","param":"K"}` | 200 | 13044 | 6D121E1E37E86E37F4D8AC67C64F9575A52B494F2ADBB20ED93D998D86139E2E | call-296.json.gz |
| 297 | POST | `{"rankinglistversiondate":"12/22/2025","playerid":"328196","param":"K"}` | 200 | 13044 | 0749C2F7BE6D86F1BB8F40C4A2B7F1098FB9E33DC84F2711B47548DB0AC862B6 | call-297.json.gz |
| 298 | POST | `{"rankinglistversiondate":"12/29/2025","playerid":"328196","param":"K"}` | 200 | 13044 | 989CD176AFCE3A2D8FC48B108ECEC851DACE49FF1C8E18DBF7AEF6832B5D7ABE | call-298.json.gz |
| 299 | POST | `{"rankinglistversiondate":"01/05/2026","playerid":"328196","param":"K"}` | 200 | 13044 | E2ED07CEDEF2180185C61919986269460C125B835A0E81CBBA83D044B61C1F55 | call-299.json.gz |
| 300 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-300.json.gz |
| 301 | POST | `{"rankinglistversiondate":"01/12/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 0BA14B08DF205C56DF2D25FCD6E9A3A7115AFE499F17A79C97CA075B0DDA97B3 | call-301.json.gz |
| 302 | POST | `{"rankinglistversiondate":"01/19/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 6433C0997D085504D572FB984ADD6C6625E89AD29690712D9CF889369FD0E5B1 | call-302.json.gz |
| 303 | POST | `{"rankinglistversiondate":"01/26/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 59774E491AD95362E828D0DAFB4BC614FF7DF0550698063EE004C8541E1DE6C0 | call-303.json.gz |
| 304 | POST | `{"rankinglistversiondate":"02/02/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 6DDA5AF082B9EEB43E83FABE93A5ECE45715EE36FB5053567A064C3C48D3DD19 | call-304.json.gz |
| 305 | POST | `{"rankinglistversiondate":"02/09/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 1CA95CDD3663F3718C23D44F0EF575E796B19CFAAF7E7F072F4BC5CFEAC7A4AB | call-305.json.gz |
| 306 | POST | `{"rankinglistversiondate":"02/16/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 122B21E6AFE4C8CD49E655390D9405E713CF91334C20822DC8ACBA96A5870144 | call-306.json.gz |
| 307 | POST | `{"rankinglistversiondate":"02/23/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 16071971A424EA5D5B6CA9BED787602ADE481318405B7797D322D3DC3EBEE3D2 | call-307.json.gz |
| 308 | POST | `{"rankinglistversiondate":"03/02/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 76F92E57605AF673C621F07AFD90CBEDD8781CAB8198BD1DAE8E3FF79C01C602 | call-308.json.gz |
| 309 | POST | `{"rankinglistversiondate":"03/09/2026","playerid":"328196","param":"K"}` | 200 | 13044 | B04CD58DF7BD86CD10AE656B957E508AC9FE28ED0D4ABF3B1251784151912F18 | call-309.json.gz |
| 310 | POST | `{"rankinglistversiondate":"03/16/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 085CEBFBAABFF05385A5922370225DD0CABE16F8D9C3F4400303DC242A8406A3 | call-310.json.gz |
| 311 | POST | `{"rankinglistversiondate":"03/23/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 71CAA96DE264C75D6A9ECCDA1CA0F17FB9F666B76AC60918533C061954ECFACB | call-311.json.gz |
| 312 | POST | `{"rankinglistversiondate":"03/30/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 392D1924F4350D0464E02E1465605A08C808B66C0407549DBADF8DBAB7F9F52A | call-312.json.gz |
| 313 | POST | `{"rankinglistversiondate":"04/06/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 26C39E15FC8511FA899FBA2D5812A81C9406F7E79F6424B8C19D052878D3E77A | call-313.json.gz |
| 314 | POST | `{"rankinglistversiondate":"04/13/2026","playerid":"328196","param":"K"}` | 200 | 13044 | D59F7FAF0244A7D179F330D3C611C0C5A9F1DC529E058FC2C324D5085646A420 | call-314.json.gz |
| 315 | POST | `{"rankinglistversiondate":"04/20/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 37BE810FD8F979A7421FBE793EE0FA02BDF0C51C3D959C09E6CBF0AF3F3E4CCE | call-315.json.gz |
| 316 | POST | `{"rankinglistversiondate":"04/27/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 7F28DBDCE120D931E375C53871CB6AB9D79A623B61B7ED6834AEFB61A744FABE | call-316.json.gz |
| 317 | POST | `{"rankinglistversiondate":"05/04/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 766DCB5F31D78C9423465AAE7B3F9AC4AC9824619D4D7D07710857058D00477F | call-317.json.gz |
| 318 | POST | `{"rankinglistversiondate":"05/11/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 0A7496C5DEA48791614986D656F4D1AA7C62F8E57C62779E01C35026C2649AF7 | call-318.json.gz |
| 319 | POST | `{"rankinglistversiondate":"05/18/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 36BD17D802EB1604A178E0D1B721BB7FDD1AC0797BCB40059C5DE0A67D6B45FC | call-319.json.gz |
| 320 | POST | `{"rankinglistversiondate":"05/25/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 73F4CCCD7C5DE540873D860EDAC1BC6C55CAFD89010C8093691D3873A86A4632 | call-320.json.gz |
| 321 | POST | `{"rankinglistversiondate":"06/01/2026","playerid":"328196","param":"K"}` | 200 | 13044 | AFDDDFEE6F80BC298F26AB24304E536E6848B8216E355B11C4B70284FD98B6A6 | call-321.json.gz |
| 322 | POST | `{"rankinglistversiondate":"06/08/2026","playerid":"328196","param":"K"}` | 200 | 13044 | EF59EF9DFA7F6DA8EB9E6D21EA719F0CA312C99D42AE4103E3E8C80E043C6041 | call-322.json.gz |
| 323 | POST | `{"rankinglistversiondate":"06/15/2026","playerid":"328196","param":"K"}` | 200 | 13044 | 0BA2F8E97A91F738654986894B62483460806790D5DB443C39985859266748FB | call-323.json.gz |
| 324 | POST | `{"rankinglistversiondate":"06/29/2026","playerid":"328196","param":"K"}` | 200 | 13044 | B09CB1EA2362CFC77BA7E39BFA9DB78612C8CB57AF2387E6D0B2C932CB94ED49 | call-324.json.gz |
| 325 | POST | `{"rankinglistversiondate":"07/21/2025","playerid":"362606","param":"K"}` | 200 | 12318 | 57FF998C4A7279B20627756DB1069641B86C739824325C04254681DF35CD5B38 | call-325.json.gz |
| 326 | POST | `{"rankinglistversiondate":"07/28/2025","playerid":"362606","param":"K"}` | 200 | 12318 | F06FA4B1AE3E49398A3E1A406F5B209C805051A53901853606DFFA82CC21E82B | call-326.json.gz |
| 327 | POST | `{"rankinglistversiondate":"08/04/2025","playerid":"362606","param":"K"}` | 200 | 12318 | 47D9B62BC8AE2500F0A14C9B27A58C272F567E1CD94F733F4C34F65C314F2FFF | call-327.json.gz |
| 328 | POST | `{"rankinglistversiondate":"08/11/2025","playerid":"362606","param":"K"}` | 200 | 12318 | C30FEED52A92EF43CBDCC1ACF8D4A88390BFAE20AE95DD35C4E5136FB3939EE2 | call-328.json.gz |
| 329 | POST | `{"rankinglistversiondate":"08/18/2025","playerid":"362606","param":"K"}` | 200 | 12318 | CFD1D6079E2C3282274B0C898D533D1606BB024043ADA38D80228302D7EE3561 | call-329.json.gz |
| 330 | POST | `{"rankinglistversiondate":"08/25/2025","playerid":"362606","param":"K"}` | 200 | 12318 | AD6CB8F79436DB9C395C578BCA6858F8A32E3071FBCBEA073F800A166F8CAB8D | call-330.json.gz |
| 331 | POST | `{"rankinglistversiondate":"09/01/2025","playerid":"362606","param":"K"}` | 200 | 12318 | A8689392D1E65D4058BE321A972DBA64AD3D7C0BEB36579E1247B67CFA8D4B20 | call-331.json.gz |
| 332 | POST | `{"rankinglistversiondate":"09/08/2025","playerid":"362606","param":"K"}` | 200 | 12318 | 80634F80CA96928B37152F2D7648793EFF8D000B8A38646698AFEC81DAB25F5F | call-332.json.gz |
| 333 | POST | `{"rankinglistversiondate":"09/15/2025","playerid":"362606","param":"K"}` | 200 | 12318 | 092ABCA3124A0B3837570EA4CB847F590C129DFEE5E1837E1791C34C204544DD | call-333.json.gz |
| 334 | POST | `{"rankinglistversiondate":"09/22/2025","playerid":"362606","param":"K"}` | 200 | 12318 | EB816665332193A356A31CBA40829E5DC613DD60B170169C7737EC69282C39E3 | call-334.json.gz |
| 335 | POST | `{"rankinglistversiondate":"09/29/2025","playerid":"362606","param":"K"}` | 200 | 12318 | 377C5A54D59441831D20DE8D055D060070D381E182182757AFF04E6369F9460C | call-335.json.gz |
| 336 | POST | `{"rankinglistversiondate":"10/06/2025","playerid":"362606","param":"K"}` | 200 | 12318 | ED83F57C080B4F1D6EAFA90C35F888895B501B7F85750EE1844BD0FB6CB08675 | call-336.json.gz |
| 337 | POST | `{"rankinglistversiondate":"10/13/2025","playerid":"362606","param":"K"}` | 200 | 12318 | F22A128AA8B0740C8656FF423BA0C3300C4B5A5D130531C978C3D59DD8560001 | call-337.json.gz |
| 338 | POST | `{"rankinglistversiondate":"10/20/2025","playerid":"362606","param":"K"}` | 200 | 12318 | 3F186F6E737D6C5CC71B72FABD3AA32BB328A96586B8817B27EDEAC558263AFB | call-338.json.gz |
| 339 | POST | `{"rankinglistversiondate":"10/27/2025","playerid":"362606","param":"K"}` | 200 | 13042 | 6C0703194BC2CB6B04149633E563A457D2F1B3B51CDFEC8F7899015DCE9B3AC0 | call-339.json.gz |
| 340 | POST | `{"rankinglistversiondate":"11/03/2025","playerid":"362606","param":"K"}` | 200 | 13042 | 4C60EF8B310E4B9BD68069B33F82C4EAEE1112564A6D78DAFC7156A05BBF5E18 | call-340.json.gz |
| 341 | POST | `{"rankinglistversiondate":"11/10/2025","playerid":"362606","param":"K"}` | 200 | 13042 | 98CD8E3C2FA349539E220AE1E237B93ECF9AC8ED606E2B524B86A01B6D23EB42 | call-341.json.gz |
| 342 | POST | `{"rankinglistversiondate":"11/17/2025","playerid":"362606","param":"K"}` | 200 | 13042 | 0C140492277B046D6C7984CECC5DC01807A6C3173EFF02008DCADFD41D9F4017 | call-342.json.gz |
| 343 | POST | `{"rankinglistversiondate":"11/24/2025","playerid":"362606","param":"K"}` | 200 | 13042 | B89CF7EAAE4B6E10A6F0A86A54A3B0429972011DA8A8DA0934BCB67206EC509A | call-343.json.gz |
| 344 | POST | `{"rankinglistversiondate":"12/01/2025","playerid":"362606","param":"K"}` | 200 | 13042 | 89FB46CAF0B879D1307BADDFE10223B09E641581FEC127191F46BB157901CD74 | call-344.json.gz |
| 345 | POST | `{"rankinglistversiondate":"12/08/2025","playerid":"362606","param":"K"}` | 200 | 13042 | E2BF091CB5215535C1C0222311D910C8D0FC4DC92B0ED5193633B3206B9F96EC | call-345.json.gz |
| 346 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-346.json.gz |
| 347 | POST | `{"rankinglistversiondate":"12/15/2025","playerid":"362606","param":"K"}` | 200 | 13042 | 9D7EEA9FE500EA35739F26EBBBD99691D93BE02395F2704F56E8FB3DB91C7C5A | call-347.json.gz |
| 348 | POST | `{"rankinglistversiondate":"12/22/2025","playerid":"362606","param":"K"}` | 200 | 13042 | D344846505D2F402E65BF2D16A198517011B770637B8A7F5D489E818D387E7F7 | call-348.json.gz |
| 349 | POST | `{"rankinglistversiondate":"12/29/2025","playerid":"362606","param":"K"}` | 200 | 13042 | C1FA7F853700514F562996FD9109BD79A633E86723A8938341F21DA0DE356F54 | call-349.json.gz |
| 350 | POST | `{"rankinglistversiondate":"01/05/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 4735A7DFF9235ED884A9B8B1004739AC7AC5C7294EBDDB493779AC785B66ED41 | call-350.json.gz |
| 351 | POST | `{"rankinglistversiondate":"01/12/2026","playerid":"362606","param":"K"}` | 200 | 13042 | EEA7EC338B5707FA5DBECF6F43598CB631915D4B44D0180DB2E08285FE9221BB | call-351.json.gz |
| 352 | POST | `{"rankinglistversiondate":"01/19/2026","playerid":"362606","param":"K"}` | 200 | 13042 | A5AF79BCAB6EA401271E7906CB1B0C034F88993DEAF7D5810C0669954366F2AB | call-352.json.gz |
| 353 | POST | `{"rankinglistversiondate":"01/26/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 96EA6EB18C6CB735D7947C12B6F08FE96AB3D9C0A6DABF6042B986D0B47C3423 | call-353.json.gz |
| 354 | POST | `{"rankinglistversiondate":"02/02/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 8C7D034F1A71C55AB40D4EA35C9E297DD47C48CDFF9957CA9ECF65B6CA7AC838 | call-354.json.gz |
| 355 | POST | `{"rankinglistversiondate":"02/09/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 585C3A677E9C303349CC4050A7FC5D06C5B25FF47DA112780979F5B18D166932 | call-355.json.gz |
| 356 | POST | `{"rankinglistversiondate":"02/16/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 215C0E2F84B1C33D7FC73C7A4DC6F243410F0FDF24E00F9BECD12EDD93FF2201 | call-356.json.gz |
| 357 | POST | `{"rankinglistversiondate":"02/23/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 42D17E9CDA3C4254FF4D6419363C44AE56CA99C0FABC83D33925EC3B57599E02 | call-357.json.gz |
| 358 | POST | `{"rankinglistversiondate":"03/02/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 2EA3FD011D215CC352DFCFA10FD2AF37F2A9D6D869E08195389FF64550F892DA | call-358.json.gz |
| 359 | POST | `{"rankinglistversiondate":"03/09/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 63C5DA49A942E162E40410D999B79C3B15DADB24D1CD5D1AAD7A108A43E7618B | call-359.json.gz |
| 360 | POST | `{"rankinglistversiondate":"03/16/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 2DBE2F610D80648AAEDDDA5B91A0D52A7BD7E83DDD8E63605DA161F3799DE8BC | call-360.json.gz |
| 361 | POST | `{"rankinglistversiondate":"03/23/2026","playerid":"362606","param":"K"}` | 200 | 13042 | D9BC84B868EE911AF1B848E957CF00AE744E7FEEC0614EEE955C37F1A9723431 | call-361.json.gz |
| 362 | POST | `{"rankinglistversiondate":"03/30/2026","playerid":"362606","param":"K"}` | 200 | 13042 | C739578FE54C9E4DB667523FF50DA5668E59131E6A5A02D2B4E824CE2B1A399A | call-362.json.gz |
| 363 | POST | `{"rankinglistversiondate":"04/06/2026","playerid":"362606","param":"K"}` | 200 | 13042 | E80B7742E48D353BB28A7899B790A0C2B25ED595F8EDED77462992EB7086B8E1 | call-363.json.gz |
| 364 | POST | `{"rankinglistversiondate":"04/13/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 1078B8FE18AA7D83E34B673047CA9A60E6985B26F00814219AA742A70BA044EC | call-364.json.gz |
| 365 | POST | `{"rankinglistversiondate":"04/20/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 60672C8C2304E6EE90B65D2554C541F5F6BBD8DB38E7920325B6EDFF566E0D21 | call-365.json.gz |
| 366 | POST | `{"rankinglistversiondate":"04/27/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 6B356D81655676844F8476E256368816C861EB587324F471A890D831B468B80B | call-366.json.gz |
| 367 | POST | `{"rankinglistversiondate":"05/04/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 7F0C8046FC62AEED9A5426E673CDBACCF7417E99E4C0552ACD31090E5CE6DFB1 | call-367.json.gz |
| 368 | POST | `{"rankinglistversiondate":"05/11/2026","playerid":"362606","param":"K"}` | 200 | 13042 | C9C51992C9395B36BFA1D2CD678A6A8D6E1ACC52C9E4383FE0FFBEF254D5CA49 | call-368.json.gz |
| 369 | POST | `{"rankinglistversiondate":"05/18/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 343F2FD53D6F2DD123F1D6BA207AB3FADF5BC1E6F3E4581C2B97B07773B60109 | call-369.json.gz |
| 370 | POST | `{"rankinglistversiondate":"05/25/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 7718D9805BEBA506B0EF2C41C548EA32FE595F52AA05CAB92983DD175EBA6E55 | call-370.json.gz |
| 371 | POST | `{"rankinglistversiondate":"06/01/2026","playerid":"362606","param":"K"}` | 200 | 13042 | AC3F969C7272FC33BEE16103FCA50FDFA3F84C1FFD51A0B477689F8074F2918A | call-371.json.gz |
| 372 | POST | `{"rankinglistversiondate":"06/08/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 448583C5FD86EDED06BB8C97F1B9A32FC2D18F5F2CC2AEB90037564A4A4C1C38 | call-372.json.gz |
| 373 | POST | `{"rankinglistversiondate":"06/15/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 5200E359B1317372DFF62AAC989C898CA929C512B2F58024A752FC95C6CDEEA6 | call-373.json.gz |
| 374 | POST | `{"rankinglistversiondate":"06/29/2026","playerid":"362606","param":"K"}` | 200 | 13042 | 1476095DD236CA40BCFD507DF4C8DCD45168E69D27C3475E88648D837998820A | call-374.json.gz |
| 375 | POST | `{"rankinglistversiondate":"07/21/2025","playerid":"343986"}` | 200 | 13014 | 48B26721C566B855430A7B80EB9AB2989C04BE062CD2039366FB686ED4AE3537 | call-375.json.gz |
| 376 | POST | `{"rankinglistversiondate":"07/28/2025","playerid":"343986"}` | 200 | 13014 | 2F9851CDD1C67C72C4F3546B24D5A3CA19F9E43DABD2D5ABD080E1C609ED6E4E | call-376.json.gz |
| 377 | POST | `{"rankinglistversiondate":"08/04/2025","playerid":"343986"}` | 200 | 13014 | 9E8C7998D620C39A54038819970778CB4EDEE77151CD7A80DDC12D8B791D5B92 | call-377.json.gz |
| 378 | POST | `{"rankinglistversiondate":"08/11/2025","playerid":"343986"}` | 200 | 13014 | 26E1BDA9578791F079F5FA54AF9289315A5F31B5ED787A6921BB82E7109BA606 | call-378.json.gz |
| 379 | POST | `{"rankinglistversiondate":"08/18/2025","playerid":"343986"}` | 200 | 13014 | 9EF218A4568F6568D5EF8C5B3C3D655A7CAED949702ED180B42A8EA3223045D5 | call-379.json.gz |
| 380 | POST | `{"rankinglistversiondate":"08/25/2025","playerid":"343986"}` | 200 | 13014 | 7A6B7627780878225FE8EC2E9D048FA5471734ADDFA5CBBE7E425F1953A64AB4 | call-380.json.gz |
| 381 | POST | `{"rankinglistversiondate":"09/01/2025","playerid":"343986"}` | 200 | 13014 | 2818FF793351702C4DE769E4388638E38DA11310066DD3F2829F53A4357E5A96 | call-381.json.gz |
| 382 | POST | `{"rankinglistversiondate":"09/08/2025","playerid":"343986"}` | 200 | 13014 | D54D6CC3C0895791DB7F178EFD06E8EC7BFE7F483FA9B92C067CBCDE086DE4E9 | call-382.json.gz |
| 383 | POST | `{"rankinglistversiondate":"09/15/2025","playerid":"343986"}` | 200 | 13014 | 630796A2682A6DC1DE56273A17B0CD4B218C8A5A210D8B9831FE64B93FDE8AAA | call-383.json.gz |
| 384 | POST | `{"rankinglistversiondate":"09/22/2025","playerid":"343986"}` | 200 | 13014 | 328677C96005FD12CD1C9CDB469894232BF401E9970F70F6F914C76B4D071785 | call-384.json.gz |
| 385 | POST | `{"rankinglistversiondate":"09/29/2025","playerid":"343986"}` | 200 | 13014 | 9A13B4C58AD5B47327C95A46B6829F7E0742A6CC38B7A751F67AC50A1FD2B16A | call-385.json.gz |
| 386 | POST | `{"rankinglistversiondate":"10/06/2025","playerid":"343986"}` | 200 | 13014 | D13CAAA9417E25B1CFA84BF53D65D22887A59A33ED3A9E2F9AA736F014D815DE | call-386.json.gz |
| 387 | POST | `{"rankinglistversiondate":"10/13/2025","playerid":"343986"}` | 200 | 13014 | 125B9CEE91EC04E7C9A7630EA37203D6D19C17AE00881DF617E6E185B28B3EC4 | call-387.json.gz |
| 388 | POST | `{"rankinglistversiondate":"10/20/2025","playerid":"343986"}` | 200 | 13014 | EE814B7F4BDEE77832DCCCE8E74DF0ECF9B30038FF8EAF0A118660EBD581E8BD | call-388.json.gz |
| 389 | POST | `{"rankinglistversiondate":"10/27/2025","playerid":"343986"}` | 200 | 13014 | 3E66DF427BA3A327955AEF33173D54CB8CAC0F495EF39D95C24B9D3BD7A9EFAE | call-389.json.gz |
| 390 | POST | `{"rankinglistversiondate":"11/03/2025","playerid":"343986"}` | 200 | 13014 | 9A0393695C4F8EADB1646D7D0D80A8E2C03CA9955C371649DC91808C046AA796 | call-390.json.gz |
| 391 | POST | `{"rankinglistversiondate":"11/10/2025","playerid":"343986"}` | 200 | 13014 | 331A8B4404B1D44483045199B0F892F12D1FE451B80D7EA9B9B5F4AFDF17978D | call-391.json.gz |
| 392 | GET | `{}` | 200 | 21846 | B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39 | call-392.json.gz |
| 393 | POST | `{"rankinglistversiondate":"11/17/2025","playerid":"343986"}` | 200 | 13014 | AE33CA27FF6F3758F47B4455B76B253F463B84AB2037BB7B7FE2CB1B9E88529A | call-393.json.gz |
| 394 | POST | `{"rankinglistversiondate":"11/24/2025","playerid":"343986"}` | 200 | 13014 | 7B8F451DED24C554ECAC985AF2A525682F7F786F77798B75BCED3FCFDB93ACDD | call-394.json.gz |
| 395 | POST | `{"rankinglistversiondate":"12/01/2025","playerid":"343986"}` | 200 | 13014 | 571BC215322BEDB07F1916DAB21EAB0E8DB105B7210298E33308FD70E2D54EB5 | call-395.json.gz |
| 396 | POST | `{"rankinglistversiondate":"12/08/2025","playerid":"343986"}` | 200 | 13014 | 232317721FEB1D74D83436723C78B7EDA5F4A70E7D087A4566DB44C8CE5ACFAA | call-396.json.gz |
| 397 | POST | `{"rankinglistversiondate":"12/15/2025","playerid":"343986"}` | 200 | 13014 | 7D15C704D7592417EABDE07DB5A4A05F229CF46BB5D7F2E7193DB049588C2EA8 | call-397.json.gz |
| 398 | POST | `{"rankinglistversiondate":"12/22/2025","playerid":"343986"}` | 200 | 13014 | 2B34BCC786B2332ADAA7E6B12E1AD76DA5E2A3ABACB7C267C0C985DD2E2C0370 | call-398.json.gz |
| 399 | POST | `{"rankinglistversiondate":"12/29/2025","playerid":"343986"}` | 200 | 13014 | 4EAAC63C6446EBD6175DFD5488475FE5E6A2C7FE4607D98301FF326539A0B993 | call-399.json.gz |
| 400 | POST | `{"rankinglistversiondate":"01/05/2026","playerid":"343986"}` | 200 | 13014 | 35986C969DD4CDAC2BEA9F20D8AAA4F1BA82347F58AA827436E139492CFC6C78 | call-400.json.gz |
| 401 | POST | `{"rankinglistversiondate":"01/12/2026","playerid":"343986"}` | 200 | 13014 | 3E8204138ECC05EA35874026CA63A653D915238E0743B41934014860328184A6 | call-401.json.gz |
| 402 | POST | `{"rankinglistversiondate":"01/19/2026","playerid":"343986"}` | 200 | 13014 | 2C7C58658888FDE100A7CC7D1B41FF97943FA21F2BD6643739511661614C931C | call-402.json.gz |
| 403 | POST | `{"rankinglistversiondate":"01/26/2026","playerid":"343986"}` | 200 | 13014 | C0FF51410813DD1E9E1214F9B874A70944A391B21BA0B64EB95D2B85E1D65343 | call-403.json.gz |
| 404 | POST | `{"rankinglistversiondate":"02/02/2026","playerid":"343986"}` | 200 | 13014 | 63DBEFFCB2C1F7BB703CB31DBB27B89BA753201E98469437B477674489B10EEB | call-404.json.gz |
| 405 | POST | `{"rankinglistversiondate":"02/09/2026","playerid":"343986"}` | 200 | 13014 | 017DCBC0C6B007D8707466E8C7C6095A311419FBC3D77A9E153F48641F2C1D08 | call-405.json.gz |
| 406 | POST | `{"rankinglistversiondate":"02/16/2026","playerid":"343986"}` | 200 | 13014 | BBFAACC5C25F7CAD09479FE5070215D8CADF2E5ADED299E1A80EE16D619573E6 | call-406.json.gz |
| 407 | POST | `{"rankinglistversiondate":"02/23/2026","playerid":"343986"}` | 200 | 13014 | 31F9D7BC1268EEAFC66B6839DB99E566265D1FDE59019429187DB13E3B6989F2 | call-407.json.gz |
| 408 | POST | `{"rankinglistversiondate":"03/02/2026","playerid":"343986"}` | 200 | 13014 | E465296505D45ACEDFF225F1C35B3A4B7A78221A5558BE000DBD8DDDD80F86F6 | call-408.json.gz |
| 409 | POST | `{"rankinglistversiondate":"03/09/2026","playerid":"343986"}` | 200 | 13014 | 44318A33BECA1233E5996BD9982A2D3C45D0875CEC0F56D035476BB9E0162AAB | call-409.json.gz |
| 410 | POST | `{"rankinglistversiondate":"03/16/2026","playerid":"343986"}` | 200 | 13014 | FBA26BFD9C24B12405AC0557E1588F5C68DF83FF1F9F732AC843FE63694EF6D4 | call-410.json.gz |
| 411 | POST | `{"rankinglistversiondate":"03/23/2026","playerid":"343986"}` | 200 | 13014 | AEEB853747E7BD9C603502D9961707C70087481471739BC7A80BCB30ED284B97 | call-411.json.gz |
| 412 | POST | `{"rankinglistversiondate":"03/30/2026","playerid":"343986"}` | 200 | 13014 | 0A88C94A0A02ED05A323CF825DFFD4637544F8E222EADFFB63F85A016E2EFA47 | call-412.json.gz |
| 413 | POST | `{"rankinglistversiondate":"04/06/2026","playerid":"343986"}` | 200 | 13014 | F6459D4C9FCAC44F92C3A40FBCF84F555DC1623FFB8CEF66273A1485B29FB90A | call-413.json.gz |
| 414 | POST | `{"rankinglistversiondate":"04/13/2026","playerid":"343986"}` | 200 | 13014 | 796E1436F02CB18772139AD42E108CB424BD890B2281E1E185122AC6C31C1AF4 | call-414.json.gz |
| 415 | POST | `{"rankinglistversiondate":"04/20/2026","playerid":"343986"}` | 200 | 13014 | 5C113CD17C81EB97550538BABAA9CE395162835FDB8F642AB73AF49488CA92A5 | call-415.json.gz |
| 416 | POST | `{"rankinglistversiondate":"04/27/2026","playerid":"343986"}` | 200 | 13014 | B315A4F76284FE6D6673FE444A3ADC1DA51642318A35A5AC12B28DC8F197CF5C | call-416.json.gz |
| 417 | POST | `{"rankinglistversiondate":"05/04/2026","playerid":"343986"}` | 200 | 13014 | 4D7D76AC63C95ED9AEA7436F7372CD8EAFF97C37ECB63EA48403DA8B4220D2E5 | call-417.json.gz |
| 418 | POST | `{"rankinglistversiondate":"05/11/2026","playerid":"343986"}` | 200 | 13014 | 184690CE660E746651052FB7E770FDE1791276A3F2B1369DB7BFBA803DD23015 | call-418.json.gz |
| 419 | POST | `{"rankinglistversiondate":"05/18/2026","playerid":"343986"}` | 200 | 13014 | E69C2F9DF1C749017189A940D6E77BB3404FFDC803968F21C4B4CCB6634162D2 | call-419.json.gz |
| 420 | POST | `{"rankinglistversiondate":"05/25/2026","playerid":"343986"}` | 200 | 13014 | 50F0594BA4F9D5BC4911A57216268D62476B8EEC46DF6A3BB9D33421EC5F0CF6 | call-420.json.gz |
| 421 | POST | `{"rankinglistversiondate":"06/01/2026","playerid":"343986"}` | 200 | 13014 | FD5C7E2C77379CFE594ADB9F0AB84E7ECDEC642FB82E309B6E562F1A81982D7C | call-421.json.gz |
| 422 | POST | `{"rankinglistversiondate":"06/08/2026","playerid":"343986"}` | 200 | 13014 | F22F49B969178BA3C77BC539F4D88A7587368B8CB4984613A0E2661F96E49E51 | call-422.json.gz |
| 423 | POST | `{"rankinglistversiondate":"06/15/2026","playerid":"343986"}` | 200 | 13014 | 1F8C4FC93DE621AED29489961822205C759E66A9B8D8B394A1AD0634C6DF4EF8 | call-423.json.gz |
| 424 | POST | `{"rankinglistversiondate":"06/29/2026","playerid":"343986"}` | 200 | 13014 | C7145BD9E6C2AA3B767E9465FDF2B76D613E74F8B07619A6D4D514CD4A087DF3 | call-424.json.gz |

## Kontrolresultater

- Målet: 392/392 snapshots; alle otte spillere har 49 ugeposter, hvor fravær udtrykkeligt markeres uden nulpoint. Svar på a–e står ovenfor.
- Kaldloft: 424/480 samlet.
- Databasehashes: uændrede; se tabellen.
- `git diff --check` skal køres efter kortopdateringen.

## Begrænsninger og status for kald 207

HTTP-status for globalt kald 207 er ukendt, fordi den tidligere proces ikke fik skrevet status til checkpointet. Den redigerede rå GET findes; det nye append-only logformat kunne ikke genskabe en status, som ikke blev gemt dengang. De historiske kald 5–206 har ikke oprindelige timestamps. Uger uden spillerække er ikke konverteret til nulpoint. “Eventpoint før/efter” er en empirisk matchning af værdierne i de observerede tabeller, ikke dokumentation for serverens interne opdateringsøjeblik.
