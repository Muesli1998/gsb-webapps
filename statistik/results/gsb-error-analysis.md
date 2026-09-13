# Analyse af kampdetaljefejl

Fejlprocenterne er beregnet mod alle 2.818 discovery-kampe. Høje tal i 2010
og 2011 er forventelige indikatorer på ældre scraper-/datamodelproblemer og
skal ikke tolkes som manglende kampoversigter.

| Sæson | Kampe | Fejl | Fejlprocent |
|---:|---:|---:|---:|
| 2025 | 400 | 242 | 60,5 % |
| 2024 | 295 | 165 | 55,9 % |
| 2023 | 255 | 127 | 49,8 % |
| 2022 | 227 | 132 | 58,1 % |
| 2021 | 186 | 100 | 53,8 % |
| 2020 | 162 | 131 | 80,9 % |
| 2019 | 125 | 43 | 34,4 % |
| 2018 | 143 | 39 | 27,3 % |
| 2017 | 133 | 45 | 33,8 % |
| 2016 | 147 | 54 | 36,7 % |
| 2015 | 156 | 48 | 30,8 % |
| 2014 | 144 | 53 | 36,8 % |
| 2013 | 134 | 43 | 32,1 % |
| 2012 | 131 | 52 | 39,7 % |
| 2011 | 169 | 159 | 94,1 % |
| 2010 | 11 | 11 | 100,0 % |

Fejltyperne er 1.085 `Internal server error` og 359 `Could not find any
players on match`. De hyppigste modstandere i fejlrapporten er KBK Kbh. 1,
Charlottenlund 2, KBK Kbh. 3, Lyngby 2, Frederiksberg 2 og FKIF Frederiksberg 2.

## Fortolkning

Den simple analyse er nyttig som screening, men en mere sofistikeret version
skal stratificere efter `ageGroupId`, rå `league`, sæson og fejltype. Den skal
også sammenholde med BadmintonPlayer-browserdata, fordi en API-fejl kan dække
over et gyldigt resultat eller en walkover.
