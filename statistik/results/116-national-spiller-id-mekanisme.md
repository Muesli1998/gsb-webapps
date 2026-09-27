# Opgave 116 — national spiller-ID-mekanisme

Dato: 2026-09-27. Undersøgelsen brugte den eksisterende render-gate: den gengivne body-tekst skulle indeholde det forventede kamp-ID og mindst én linje, der begynder med `Resultat`. Der blev åbnet én kampside ad gangen på den eksisterende `Stilling/#5,...`-rute. Ingen database blev skrevet, og der blev ikke bygget en scraper.

## Stikprøve

| Kamp | Sæson / alder | Region | Række | Render-gate | Spillerlinks | Unikke ID'er | Konklusion |
|---|---|---:|---|---|---:|---:|---|
| 22818 | 2010 / senior | 1 | Badmintonligaen | bestået, `Resultat 5-1` | 18 | 18 | ID kan udtrækkes |
| 337416 | 2018 / U17-U19 | 8 | DGI-MVS U17/U19 | bestået, `Resultat 4-3` | 20 | 8 | ID kan udtrækkes |
| 3757 | 2011 / U11 | 3 | BADBORN U11 | bestået, `Resultat 5-1` | 0 | 0 | Ingen spillerlinks på siden |
| 499797 | 2025 / U17-U19 | 1 | Efterskole U17/U19 (114) | bestået, `Resultat 2-5` | 20 | 10 | ID kan udtrækkes |
| 503838 | 2025 / U17-U19 | 2 | ØM U17/U19 (114) | bestået, `Resultat 3-4` | 20 | 10 | ID kan udtrækkes |
| 505128 | 2025 / U11 | 5 | U11 Nordjylland | bestået, `Resultat 2-4` | 16 | 9 | ID kan udtrækkes |
| 471218 | 2024 / U15 | 8 | U15 København | bestået, `Resultat 5-1` | 16 | 8 | ID kan udtrækkes |
| 505211 | 2025 / U09 | 8 | U09 Sjælland (114-relateret pulje) | bestået, `Resultat 0-5` | 10 | 5 | ID kan udtrækkes |
| 512925 | 2026 / U17-U19 | 1 | Efterskole U17/U19 (114) | bestået, `Resultat 2-6` | 24 | 10 | ID kan udtrækkes |

For links blev samme selector som GSB-udtrækket brugt: `a[href*="/DBF/Spiller/VisSpiller/"]`. ID'et blev taget fra fragmentet efter `#`; gentagne links til samme spiller blev deduplikeret. Eksempel fra kamp 499797: `http://www.badmintonplayer.dk/DBF/Spiller/VisSpiller/#322953` (Rasmus Erbou). Eksempel fra kamp 22818: `.../#12057` (Joachim Fischer).

## Fund

8 af 9 sider havde links af den nationale spillerprofiltype, og alle 8 havde numeriske, gentagne ID-fragmenter som kan udtrækkes på præcis samme måde som i `extract-individual-browser.mjs`. Det gælder senior, ungdom, København, Nordjylland, Sjælland og efterskole-/DGI-kampe i stikprøven. De tre efterskolekontroller fra opgave 114 (499797, 503838 og 512925) havde alle spillerlinks.

Den ældre Bornholm U11-kamp 3757 (sæson 2011) bestod render-gaten og havde et resultat, men ingen spillerlinks overhovedet. Det er konkret dokumenteret manglende dækning for denne kamptype/årgang; stikprøven kan ikke afgøre om fraværet gælder alle ældre ungdomskampe eller kun denne kamp. Ingen side var en standardskal eller uafgørbar.

## Omfang

`liga-landskab.db` indeholder 203.012 distinkte `external_match_id`-værdier. Det er det grove øvre omfang for en fremtidig national side-for-side spillerudtrækning; det er ikke et løfte om at alle sider har spillerlinks. En national pipeline skal håndtere mindst to udfald: numeriske profiler-links og korrekt gengivne kampe uden spillerlinks. Den skal også genbruge render-gaten og registrere årgang-/regionvariationer i dækningen.

## Afgrænsning og begrænsninger

Der blev ikke lavet masseindsamling, ingen nye scripts eller tabeller blev bygget, og `statistik/data/*.db` blev kun læst for metadata og totaloptælling. Resultatet er en 9-siders, spredt stikprøve — ikke en dækningsprocent for alle 203.012 kampe. Særligt ældre ungdomsdækning er kun repræsenteret af kamp 3757 og skal undersøges særskilt før en national scraper antager fuld dækning.
