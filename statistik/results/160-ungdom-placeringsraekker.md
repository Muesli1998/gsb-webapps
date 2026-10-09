# Opgave 160 — ungdomsrækker efter placering

Kald: 20 til badmintonplayer.dk (2 GET + 18 POST); badminton.dk: 0. De analyserede 287-svar er version 09-10-2026. Råsvar og fulde hashes står i JSON.

## 1–2. Seks listeudsnit og faste intervaller

| Aldersgruppe | Køn | ID | Side 0 rækker | Sider | Rækkefordeling | Intervaltest bestået/afprøvet | Afvigere |
|---|---|---:|---:|---:|---|---:|---:|
| U13 | M | 4 | 100 | 19 | U13 M: 24, U13 M-A: 21, U13 A: 55 | 97/100 | 3 |
| U13 | K | 4 | 100 | 8 | U13 M: 24, U13 M-A: 22, U13 A: 54 | 98/100 | 2 |
| U15 | M | 5 | 100 | 20 | U15 E: 25, U15 E-M: 11, U15 M: 64 | 99/100 | 1 |
| U15 | K | 5 | 100 | 8 | U17 E: 1, U15 E: 25, U15 E-M: 11, U15 M: 53, U15 A: 10 | 86/89 | 3 |
| U17 | M | 6 | 100 | 16 | U17 E: 25, U17 E-M: 11, U17 M: 58, U17 A: 6 | 93/94 | 1 |
| U17 | K | 6 | 100 | 7 | U17 E: 23, U17 E-M: 12, U17 M: 44, U17 A: 21 | 77/79 | 2 |

Afvigere vises med navn, rang og række i JSON (`fixed_interval_check.failures`). Grænser er prøvet som fast ranginterval; undtagelsen for placering 1–8 i enkeltlister kræver særskilt disciplinliste-kontrol.

## 3. Pointtærskler

Pointkilde: `rangliste-point.db`, 2026-10-07, lister 288/289/292, param M/K; max af tilgængelige disciplinpoint pr. profile-ID. Testposter: 323; bestået: 322; afviget: 1; uden pointmatch: 0. Fulde enkeltposter i JSON.

## 4. Top-8-undtagelsen

E-rækker uden for top-24 og deres disciplinrang ≤8 findes i `top8_E_outside_287_top24`; kun ID-match i den lokale pointdatabase er belæg. Aldersgruppe kan ikke udledes af pointtabellen alene; 287-filteret er kohortekilden.

## 5. Reservekald

### U09
U09/M (agegroupid 2): 23 rækker på side 0; sidetal og rækker i JSON.

### playerid
To GSB-profiler fra de gemte 159-lister blev afprøvet. Svarrækker og API-metadata står i JSON; placeringstype klassificeres kun når responsens rank kan matches direkte mod 287-udsnittet.

## 6. Anbefaling

Placering kan kun forudsige de faste tiers, hvis de seks aktuel-side-0 lister bekræfter intervallerne. Pointbaserede ungdomsrækker kræver tilmeldingsniveau-point, som ikke står på 287; disciplinpoint er kun en kandidatproxy. Procent/andel og konkrete undtagelser skal læses sammen med de beregnede punktresultater, ikke behandles som en bevist formel.

## Databaser

| Database | Før | Efter | Uændret forventet hash |
|---|---|---|---|

### Reglementets kriterier (som dokumenteret i opgave 159)

- U15/U17: E ved placering 1–24 (med særundtagelse top-8 i den enkelte disciplin), E-M 25–36, M fra 37 med point over tærskel: U15 M >1850/K >1500; U17 M >2150/K >1700.
- U13: M 1–24, M-A 25–48, A fra 49 med point over tærskel M >1525/K >1350. U09/U11/U19 har ifølge kortets kildesammenfatning ikke placeringsrækker.
- Kilden er 2026-09-10-reglementet som opsummeret i 159; ingen nye badminton.dk-kald blev foretaget i denne opgave.

| gsb-statistik-normalized.db | `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` | `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` | ja |
| liga-landskab.db | `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C` | `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C` | ja |
| rangliste-historik.db | `6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F` | `6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F` | ja |
| national-spillere.db | `1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E` | `1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E` | ja |
| rangliste-point.db | `DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9` | `DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9` | ja |

## Detaljerede afvigere

**U13 M:** Felix Klimt-Møllenbach — rang 46, U13 A; Niels Birch Skjold — rang 46, U13 A; Lucas Zheng — rang 48, U13 A.
**U13 K:** Thea Dang — rang 47, U13 A; Nora Lawaetz Nørregaard — rang 48, U13 A.
**U15 M:** Simon Nielsen — rang 25, U15 E.
**U15 K:** Maja Filippa Palada Poulsen — rang 25, U15 E; Johanna Tharathip Andersen — rang 26, U15 E; Josefine Bille-Ahmt — rang 37, U15 E-M.
**U17 M:** Sigurd Bang-Udesen — rang 31, U17 E.
**U17 K:** Liv Plauborg — rang 24, U17 E-M; Signe Filtenborg Larsen — rang 36, U17 M.

## Pointtest pr. aldersgruppe og køn

| Alder | Køn | Testet | Bestået | Afviget | Uden pointmatch |
|---|:---:|---:|---:|---:|---:|
| U13 | K | 52 | 52 | 0 | 0 |
| U13 | M | 52 | 52 | 0 | 0 |
| U15 | K | 54 | 53 | 1 | 0 |
| U15 | M | 64 | 64 | 0 | 0 |
| U17 | K | 43 | 43 | 0 | 0 |
| U17 | M | 58 | 58 | 0 | 0 |

Pointtærskel-afvigelser: U15 K rang 37 Josefine Bille-Ahmt: U15 E-M, max 1835.0 (> 1500), forventet U15 M.

## Top-8-undtagelsen — fulde fund

- U15 M #25 Simon Nielsen: liste 288 rang 1907 (2165.0 point), liste 289 rang 2928 (2242.0 point), liste 292 rang 2443 (1703.0 point); ingen top-8.
- U15 K #25 Maja Filippa Palada Poulsen: liste 288 rang 769 (1892.0 point), liste 289 rang 2083 (1563.0 point), liste 292 rang 2096 (1406.0 point); ingen top-8.
- U15 K #26 Johanna Tharathip Andersen: liste 288 rang 849 (1803.0 point), liste 289 rang 1597 (1808.0 point), liste 292 rang 2039 (1428.0 point); ingen top-8.
- U17 M #31 Sigurd Bang-Udesen: liste 288 rang 1509 (2413.0 point), liste 289 rang 2031 (2557.0 point), liste 292 rang 1225 (2315.0 point); ingen top-8.

Tre opslagseksempler fra de seks lister:

| Navn | Aldersgruppe/køn | Række | Placering |
|---|---|---|---:|
| Conrad Lercke | U13 M | U13 M | 1 |
| Liva Dunfeldt Heckmann | U15 K | U15 E | 2 |
| Marvin Jakob Galan Mogensen | U17 M | U17 E | 1 |

U09-reserve: `agegroupid=2`, gender M, 23 rækker / 1 sider; rækkeetiketter: U11 A 2, U11 A-B 1, U11 B 13, U11 C 7.

playerid-reserve:
- Anja Thomsen (`325460`): svar 1669 / SEN M; 1 række(r), 1 side(r).
- Nikolaj Thorslund Hindsbo (`293765`): svar 5437 / U19 A; 1 række(r), 1 side(r).
Sammenholdt med de gemte GSB-klubsvar fra 159: Anja Thomsen har lokal rang 1 og parentesrang 1669; playerid-svaret er 1669. Nikolaj Thorslund Hindsbo har lokal rang 47 og parentesrang 5437; playerid-svaret er 5437. Dermed returnerer playerid-svaret den fælles placering i parentes, ikke GSB-lokal rang eller kønsplaceringen i den separate ufiltrerede kønsliste.

## Forespørgselslog — alle 20 kald

| Nr. | Forsøg | Kald | Felter / param | HTTP | Bytes | SHA-256 |
|---:|---:|---|---|---:|---:|---|
| 1 | 1 | GET context | `{}`; param `` | 200 | 24149 | `8f37359b2c7e0ce0745957373302a0c1c453fc321d536e92010a407bdd2aa6c7` |
| 2 | 1 | POST U13-M-page0 | `{"agegroupid":"4"}`; param `M` | 200 | 62513 | `ec45954500e6fa1c2404ec7e0d776dbd2228ff934b7061231e610486dac51f86` |
| 3 | 1 | POST U13-K-page0 | `{"agegroupid":"4"}`; param `K` | 200 | 62513 | `ec45954500e6fa1c2404ec7e0d776dbd2228ff934b7061231e610486dac51f86` |
| 4 | 1 | POST U15-M-page0 | `{"agegroupid":"5"}`; param `M` | 200 | 62835 | `3c6a108e3010ea0da20137abcf2530931324b9a7acb74d821eaf71ef1bbe9213` |
| 5 | 1 | POST U15-K-page0 | `{"agegroupid":"5"}`; param `K` | 200 | 62835 | `3c6a108e3010ea0da20137abcf2530931324b9a7acb74d821eaf71ef1bbe9213` |
| 6 | 1 | POST U17-M-page0 | `{"agegroupid":"6"}`; param `M` | 200 | 62866 | `95d86b5d521fbaf981e7437598fcbbfe98b54acb305fcafb6141338613d64dc0` |
| 7 | 1 | POST U17-K-page0 | `{"agegroupid":"6"}`; param `K` | 200 | 62866 | `95d86b5d521fbaf981e7437598fcbbfe98b54acb305fcafb6141338613d64dc0` |
| 8 | 1 | POST U09-M-page0 | `{"agegroupid":"2"}`; param `M` | 200 | 23078 | `52cd3e9034e3c6de9342c7058e3c3b7e664cc69f9cfe7f7b2ceb5e339a19813b` |
| 9 | 1 | POST playerid-GSB-K | `{"playerid":"325460"}`; param `K` | 200 | 5735 | `2cf3a82f5b1bed9a2689173f6f2ec70dd2366077b04206b8646a842e57bcf5b5` |
| 10 | 1 | POST playerid-GSB-M | `{"playerid":"293765"}`; param `M` | 200 | 5761 | `eb63af0ea01982590ddf817c39726137ff3e93ac31925e9afbdef137c52dcc33` |
| 11 | 2 | GET context | `{}`; param `` | 200 | 24149 | `b6ae02eb38db423533bcd3e0f75d641dbf599c4ca9f141aff1fca9752a4428c3` |
| 12 | 2 | POST U13-M-page0 | `{"agegroupid":"4","gender":"M"}`; param `` | 200 | 63638 | `0a43b98706ea82bf515e985fc0bb3766722630a50c85ee9f87875a535d555373` |
| 13 | 2 | POST U13-K-page0 | `{"agegroupid":"4","gender":"K"}`; param `` | 200 | 62577 | `ea3bdbe88c21522b157b8ab4a0ddb36b57c199979ca3560c1365b32f007e2929` |
| 14 | 2 | POST U15-M-page0 | `{"agegroupid":"5","gender":"M"}`; param `` | 200 | 64095 | `749aa881d5764e0570bbf11c510854a2ca16fa98c110603751c613a70345a1e4` |
| 15 | 2 | POST U15-K-page0 | `{"agegroupid":"5","gender":"K"}`; param `` | 200 | 63084 | `2ee68a2585cfce9417dd7d0510d305cc806b74022b187dfd098a86d7978e77f7` |
| 16 | 2 | POST U17-M-page0 | `{"agegroupid":"6","gender":"M"}`; param `` | 200 | 63765 | `dbed24a7571a7b7e3d0ef7c58e4e6b4f28f521a910f2f7e6d0abf3ba57f01bb9` |
| 17 | 2 | POST U17-K-page0 | `{"agegroupid":"6","gender":"K"}`; param `` | 200 | 62993 | `e93f3c941b8719931626febc2a6e33cfbad678bb0f56b06fdfefa81834b1cac3` |
| 18 | 2 | POST U09-M-page0 | `{"agegroupid":"2","gender":"M"}`; param `` | 200 | 17962 | `963acaaeb526728bdc0c1ce510ec0bcb69c86c54b2221428869a2a272f5ff826` |
| 19 | 2 | POST playerid-GSB-K | `{"playerid":"325460","gender":"K"}`; param `` | 200 | 5736 | `fcafa1428deb8658855c7ef77b58df7b91fc5681f462925e581719ae2a6ea25f` |
| 20 | 2 | POST playerid-GSB-M | `{"playerid":"293765","gender":"M"}`; param `` | 200 | 5762 | `08eec50b613b724ee18ac8174c1772c782489a1bbe321f4f6c318c0231db8edc` |

Forsøg 1 brugte fejlagtigt M/K i `param` i stedet for feltet `gender`; de kønsparvise svar blev identiske og er kasseret fagligt. Forsøg 2 brugte `gender=M/K` og tom `param`. Råsvar fra første forsøg er bevaret i `160-raa-svar/attempt-1-param-only/`.


## Schema og kaldslog

Faktiske SQLite-kolonner pr. tabel samt request-felter, HTTP-status, byteantal og SHA-256 er i JSON. Kontekstnøglen blev holdt i hukommelsen og fjernet fra gemte svar.
