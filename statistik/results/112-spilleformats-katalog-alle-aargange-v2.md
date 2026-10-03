# Opgave 112 — spilleformats-katalog for alle årgange

## Dækning

| Felt | Tal |
|---|---:|
| Pulje-region-forekomster | 59127 |
| Unikke puljer (sæson, aldersgruppe, pulje-id) | 18546 |
| Sæsoner | 17 (2010/2027) |
| Aldersgrupper | 17 |
| Regioner | 25 |
| Distinkte category_raw-koder | 46 |
| Feltkombinationer | 17845 |
| Forekomster med synlig fritekst-rest | 59127 |
| Distinkte fritekst-rester | 13852 |

Fritekst er den rå resterende række-/pulje-/sidetekst efter kun dokumenterede felter er fjernet. Den indgår ikke i kombinationsnøglen; hvert katalogfelt viser i JSON antal og eksempler på sine rester.

## Sikkerhed for spillefamilie

| Kilde | Forekomster |
|---|---:|
| kategorisignatur | 44432 |
| tekstsignal | 9030 |
| ukendt | 5665 |

Kategorisignaturen er den sorterede rå mængde af category_raw-koder og er den stærkeste evidens. Tekstsignal er 046-parserens genkendte holdtype. Ukendt betyder, at hverken kategorier eller et tekstsignal foreligger.

## Veteran-kontrol

Ingen veteran-aldersgrænsekode forekommer i nogen kategorisignatur. Læk til Spillefamilie-feltet: **0**. Aldersgrænser bevares derfor kun i rå kildetekst/aldersgruppe, ikke som spillefamilie.

## Mest brugte feltkombinationer

| Sæson | Region | Aldersgruppe | Niveau | Spillefamilie | Point | Gruppetype | Kategorisignatur | Forekomster | Friteksttyper |
|---|---|---|---|---|---:|---|---|---:|---:|
| 2023/2024 | 1 Badminton Danmark | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 112 | 112 |
| 2023/2024 | 2 DGI | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 112 | 112 |
| 2020/2021 | 4 Badminton Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 5 Badminton Nordjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 6 Badminton Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 17 DGI Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 18 DGI Nordjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 23 DGI SdU | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 27 DGI Sydvest | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 28 DGI Sydøstjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 29 DGI Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 30 DGI Vestjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2020/2021 | 32 DGI Østjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2021/2022 | 5 Badminton Nordjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2021/2022 | 18 DGI Nordjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 111 | 111 |
| 2019/2020 | 4 Badminton Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 5 Badminton Nordjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 6 Badminton Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 17 DGI Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 18 DGI Nordjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 23 DGI SdU | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 27 DGI Sydvest | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 28 DGI Sydøstjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 29 DGI Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 30 DGI Vestjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2019/2020 | 32 DGI Østjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 110 | 110 |
| 2021/2022 | 4 Badminton Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 108 | 108 |
| 2021/2022 | 6 Badminton Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 108 | 108 |
| 2021/2022 | 17 DGI Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 108 | 108 |
| 2021/2022 | 27 DGI Sydvest | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 108 | 108 |
| 2021/2022 | 28 DGI Sydøstjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 108 | 108 |
| 2021/2022 | 29 DGI Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 108 | 108 |
| 2021/2022 | 30 DGI Vestjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 108 | 108 |
| 2021/2022 | 32 DGI Østjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 108 | 108 |
| 2022/2023 | 4 Badminton Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 6 Badminton Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 17 DGI Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 23 DGI SdU | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 27 DGI Sydvest | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 28 DGI Sydøstjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 29 DGI Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 30 DGI Vestjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 32 DGI Østjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 84 | 84 |
| 2022/2023 | 1 Badminton Danmark | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 75 | 75 |
| 2022/2023 | 2 DGI | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 75 | 75 |
| 2023/2024 | 4 Badminton Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 6 Badminton Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 17 DGI Midtjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 23 DGI SdU | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 27 DGI Sydvest | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 28 DGI Sydøstjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 29 DGI Sønderjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 30 DGI Vestjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 32 DGI Østjylland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 73 | 73 |
| 2023/2024 | 1 Badminton Danmark | UNG | ukendt | 4 spillere | ukendt | slutspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 65 | 65 |
| 2023/2024 | 2 DGI | UNG | ukendt | 4 spillere | ukendt | slutspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 65 | 65 |
| 2021/2022 | 1 Badminton Danmark | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 63 | 63 |
| 2021/2022 | 2 DGI | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 63 | 63 |
| 2021/2022 | 10 Badminton Sjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 58 | 56 |
| 2022/2023 | 1 Badminton Danmark | UNG | ukendt | 4 spillere | ukendt | slutspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 55 | 55 |
| 2022/2023 | 2 DGI | UNG | ukendt | 4 spillere | ukendt | slutspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 55 | 55 |
| 2020/2021 | 10 Badminton Sjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 54 | 54 |
| 2019/2020 | 10 Badminton Sjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 48 | 48 |
| 2019/2020 | 19 DGI Nordsjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 48 | 48 |
| 2019/2020 | 31 DGI Midt- og Vestsjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 48 | 48 |
| 2020/2021 | 19 DGI Nordsjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 48 | 48 |
| 2020/2021 | 25 DGI Storstrømmen | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 48 | 48 |
| 2020/2021 | 31 DGI Midt- og Vestsjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 48 | 48 |
| 2021/2022 | 1 Badminton Danmark | UNG | ukendt | 4 spillere | ukendt | andet/ukendt | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 48 | 48 |
| 2021/2022 | 2 DGI | UNG | ukendt | 4 spillere | ukendt | andet/ukendt | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 48 | 48 |
| 2021/2022 | 25 DGI Storstrømmen | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 46 | 46 |
| 2021/2022 | 19 DGI Nordsjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 45 | 42 |
| 2021/2022 | 31 DGI Midt- og Vestsjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 45 | 42 |
| 2022/2023 | 25 DGI Storstrømmen | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 44 | 44 |
| 2023/2024 | 10 Badminton Sjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 42 | 42 |
| 2023/2024 | 19 DGI Nordsjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 42 | 42 |
| 2023/2024 | 31 DGI Midt- og Vestsjælland | UNG | ukendt | 4 spillere | ukendt | grundspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 42 | 42 |
| 2022/2023 | 1 Badminton Danmark | UNG | ukendt | 4 spillere | ukendt | andet/ukendt | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 41 | 41 |
| 2022/2023 | 2 DGI | UNG | ukendt | 4 spillere | ukendt | andet/ukendt | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 41 | 41 |
| 2022/2023 | 1 Badminton Danmark | U13 | ukendt | 4 spillere | ukendt | slutspil | 1. D · 1. S · 2. D · 2. S · 3. S · 4. S | 40 | 40 |

Det maskinlæsbare katalog indeholder alle 17845 kombinationer med antal, antal unikke puljer og fritekst-eksempler. De 59127 rå kilderekorder duplikeres ikke i git-artefaktet: [112-spilleformats-katalog-alle-aargange.json](112-spilleformats-katalog-alle-aargange.json).
