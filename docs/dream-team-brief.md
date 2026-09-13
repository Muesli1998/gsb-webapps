# GSB Dream Team – Projekt-brief

Dette dokument opsummerer arkitektur, beslutninger og faldgruber fra opbygningen af GSB's Dream Team-system, så en ny samtale hurtigt kan sætte sig ind i det.

## Formål
Et fantasy badminton-ligasystem for GSB's seniorafdeling. Deltagere vælger 6 herrer + 4 damer fra klubbens seniortrup. Hver spiller giver 1 point pr. sejr i sin holdkamp (1,5 point hvis spilleren er på GSB 3./4. hold). Hver runde tæller kun de **8 bedste** af en deltagers 10 spilleres resultater (grundet skader/holdsætning, hvor ikke alle 10 nødvendigvis spiller hver runde).

## Systemarkitektur

**To lag:**
1. **Google Sheets** – ét ark pr. sæson, med faste faner (se struktur nedenfor). Al beregning sker via formler i arket.
2. **Netlify (statisk hosting + serverless functions)** – flere HTML-sider der læser/skriver til Google Sheets via en fælles service-konto.

### Google Sheets-fanestruktur (samme for hver sæson)
- **Tilmeldinger**: Tidsstempel, Navn, Herrer (komma-separeret tekst), Damer (komma-separeret tekst), Email
- **Holdoversigt**: Navn, H1-H6, D1-D4, Email — auto-splittet fra Tilmeldinger via formel (se "Split-formel" nedenfor)
- **Resultater**: Runde, Hold, Kategori, Hjemme, Ude, Sæt 1-3, Vinder, Point (Hjemme), Point (Ude) — rå kampdata, én række pr. individuel spiller (se "Doublesplit" nedenfor)
- **Spillerpoint**: Spiller, R1-R11, Sum — auto-summeret fra Resultater via SUMIFS
- **Beregning**: skjult hjælpefane. Én kolonne-blok pr. runde (10 individuelle spiller-opslag + 1 Top8Sum), én række pr. deltager. Bruges fordi Google Sheets ikke pålideligt array-evaluerer INDEX/MATCH med multi-celle lookup_value, når det er indlejret dybt i LARGE/SUMPRODUCT (se "Kendte faldgruber")
- **Stilling**: Plads, Navn, R1-R11, Total — slår Top8Sum op fra Beregning pr. runde

### Netlify-projektstruktur
```
netlify-tool/
  netlify.toml
  package.json (afhængighed: googleapis)
  netlify/functions/
    hent-resultater.js   — henter kampdata fra Nembadminton, skriver til Resultater (🔒 kræver ADMIN_PASSWORD)
    spillere.js          — henter spillerliste fra Spillerpoint (til dropdowns)
    tilmeld.js           — skriver ny tilmelding til Tilmeldinger
    analyse.js           — beregner winrate pr. spiller/hold/kategori fra Resultater
    stilling.js          — henter historisk stilling + hold fra Stilling+Holdoversigt, med runde-filtrering
  public/
    index.html                       — data-indskrivning (Nembadminton-import), 🔒 password-beskyttet
    tilmelding.html                  — tilmeldingsformular (prototype, ikke password-beskyttet)
    analyse.html                     — statistik-dashboard, sæson- + runde-vælger
    stilling.html                    — historisk stilling pr. sæson, med "Vis hold"-funktion
    senior-ungdom-tilmelding.html    — separat værktøj (Google Apps Script backend, ikke Netlify Function)
    seasons.js                       — delt config: sæson → spreadsheetId, samt runde-presets
```

Alle sider har indbyrdes navigation øverst. Alle Netlify Functions bruger samme `GOOGLE_SERVICE_ACCOUNT_JSON`-miljøvariabel (service-konto med skriveadgang til alle sæsoners Google Sheets).

## Datakilde: Nembadminton (uofficielt API)
`hent-resultater.js` henter holdkampdata fra Nembadmintons GraphQL-endpoint (`https://app.nembadminton.dk/graphql`), som scraper badmintonplayer.dk. Ingen login krævet. Query: `badmintonPlayerTeamMatch(input: { leagueMatchId, season })`. Uofficielt og kan ændre sig uden varsel.

## Kendte faldgruber (VIGTIGT — spar tid ved at kende disse på forhånd)

1. **Dansk lokalitet i Google Sheets**: formler skal bruge `;` som argumentadskiller, ikke `,` — men KUN for formler man selv indsætter direkte. Formler der kommer med ved import af en .xlsx-fil bliver auto-konverteret korrekt af Google Sheets.

2. **Array-formler i Google Sheets er upålidelige**: `INDEX/MATCH` med et multi-celle lookup_value indlejret dybt i `LARGE`/`SUMPRODUCT` fejler ofte (`#NUM!`) i Google Sheets, selvom det virker fint i Excel/LibreOffice. Løsning: brug ægte hjælpekolonner (som i Beregning-fanen) i stedet for at forsøge at tvinge array-evaluering med `ARRAYFORMULA`.

3. **`values.append` + `INSERT_ROWS` kan ødelægge formler**: hvis man append'er data til et begrænset kolonneområde (fx kun A:I), mens der findes formler i nabokolonner (J:K), kan Sheets API'et forskyde datakolonnerne uden at forskyde formelkolonnerne. **Løsning brugt her**: find altid først den første tomme række (læs kolonne A), og brug `values.update` direkte på den række i stedet for `append`.

4. **Navnekonsistens mellem Tilmeldinger og Resultater**: Chris har historisk brugt lidt forskellige navneformer i signup-tekst vs. kampresultater (fx "Holger Tscherning Lindholm" vs. "Holger Lindholm"). Skal altid krydstjekkes og rettes ved import af en ny sæsons data — se metode i "Sådan importeres en ny sæson" nedenfor.

5. **Doubler kræver splitning**: Nembadminton-data returnerer 2 spillere pr. side i MD/HD/DD. Kun "vores" side (matchet via klubnavn-hint) splittes til individuelle rækker; modstandersiden forbliver samlet tekst (så Spillerpoint-opslag rammer den enkelte spiller korrekt, uden at fordoble unødvendige rækker).

6. **Hjemme/Ude er ikke det samme som "os"/"modstander"**: GSB er ikke altid hjemmehold. Resultater-fanens Hjemme/Ude-kolonner afspejler ægte banehold, og Point(Hjemme)/Point(Ude) beregnes ift. hvem der reelt vandt — Spillerpoints opslag tjekker derfor BEGGE kolonner.

7. **`#REF!`-fejl i ældre arkiv-filer**: 24/25-sæsonens originale Excel-ark har brækkede formler for runde 8+ (og delvist tidligere runder), fordi Pivot-fanens tal er hårdkodede, frosne værdier fra et tidspunkt hvor arket allerede var i stykker. Chris har accepteret at 24/25 ikke er pålidelig og vil genindtaste den fra badmintonplayer.dk senere — indtil da har `seasons.js` en placeholder for 24/25 uden rigtigt Sheet-ID.

8. **Sikkerhed**: kun `hent-resultater.js` (skriver kampresultater) er password-beskyttet via `ADMIN_PASSWORD`-miljøvariabel tjekket server-side i selve funktionen (ikke kun i UI'et). De andre sider (tilmelding, analyse, stilling) er bevidst åbne — Chris er "ligeglad med hvem der læser" den offentlige data, og vurderer tilmeldings-spam som lav risiko for en klub-intern prototype.

9. **Brug ALDRIG browser-automation til bulk data-indtastning i Google Sheets — brug Sheets API.** Forsøgt og bekræftet upåliteligt (2026-08-29, 24/25-dataimport): Ctrl+C/Ctrl+V virker ikke (clipboard blokeret i browser-automation-miljøet), Tab/Enter navigerer ikke mellem celler i Sheets' gitter (kun museklik/shift-klik virker til range-selection), og selv "skriv et helt script ind i Apps Script-editoren via tastatur" fejler ved store datamængder — editorens auto-indrykning og auto-lukning af parenteser korrumperer koden, og editoren kan blive ustabil/langsom ved meget lange enkelt-linjer. `IMPORTHTML`-formler virker heller ikke til at hente data fra en Claude-artifact-URL (Google's server-side fetcher kan ikke tilgå den). **Løsning**: projektet har allerede en Google service-konto (`GOOGLE_SERVICE_ACCOUNT_JSON`, bruges af Netlify Functions) med skriveadgang til alle sæsoners ark — genbrug denne nøgle (delt direkte med Claude, uden for chatten) til at skrive data via Google Sheets API (`values.update`, se punkt 3) i stedet for browser-styring, når en opgave involverer mere end nogle få celler.

10. **Generel arbejdsmetode**: før der bruges meget tid på begrænset browser-automation (museklik/tastatur-simulering) til en dataopgave — spørg Chris om der findes eller kan sættes en programmatisk adgang op i stedet (API-nøgle, service-konto, osv.). Det er næsten altid hurtigere at få adgang end at kæmpe med UI-automation, og undgår rodede mellemtilstande (som f.eks. delvist udfyldte Sheets-celler eller en halvskrevet Apps Script-fil).

## Aktuelle sæson-ID'er (i seasons.js)
- 2026/27 (nuværende, "levende" ark): `1naV601-lJWqXJ9XZ5ovRwfuaKFWVYaflnLpwf5OUrW4`
- 2025/26 (valideret facit-kopi, "GSB Dream Team 2526 Valideret"): `1ENnMlINI8R03znnKLyKHwzH8XcHZIRTpDAWImoPTEqs`
- 2024/25: ikke sat op endnu (se punkt 7 ovenfor)

## ÅBEN OPGAVE: Claudes cloud-sandkasse kan ikke nå Google APIs (undersøges)
Vi har en service-konto-nøgle (`gsb-sheets-writer@gsbdreamteam.iam.gserviceaccount.com`, delt af Chris 2026-08-29) som burde give Claude skriveadgang til alle sæsoners ark via Sheets API — men Claudes cloud-sandkasse-shell (hvor Python/curl osv. kører) sidder bag en udgående netværks-proxy med en fast domæne-allowliste, og `oauth2.googleapis.com` / `sheets.googleapis.com` er IKKE på den liste. Kald fejler med `403 Forbidden` på CONNECT-niveau (`httplib2.socks.HTTPError: (403, b'Forbidden')`).

**Forsøgt:** Chris tilføjede (efter anmodning) domæner under Admin settings → Capabilities i sin Claude-organisation. Det ændrede ikke noget — proxyens statusendpoint (`http://127.0.0.1:<port>/__agentproxy/status`) viste stadig samme uændrede `noProxy`-liste efter ændringen. Mistanke: "Capabilities" styrer noget andet (fx connector-/værktøjsadgang), ikke selve shell-netværksproxyens allowliste, som nok er en platforms-/deployment-indstilling snarere end noget en bruger kan ændre fra selve Claude-appen.

**Ikke afprøvet endnu / næste skridt at undersøge:**
- Er der en anden indstilling (uden for "Capabilities") der styrer sandkassens udgående netværk?
- Kan opkaldet i stedet foretages via en Netlify Function (som allerede har `GOOGLE_SERVICE_ACCOUNT_JSON` og fungerende netværksadgang) — dvs. Claude kalder en Netlify-endpoint (hvis Netlify-domænet er tilgængeligt fra sandkassen) som selv taler med Google, i stedet for at Claude taler direkte med Google?
- Kan Chris køre et lokalt Python-script (nøglen + `google-api-python-client`) på sin egen maskine i stedet — fjerner problemet helt, men kræver at Chris selv kører scriptet hver gang.
- Er der forskel på om Claude kører i "Cowork cloud sandbox" vs. et miljø knyttet direkte til Chris' computer (device bridge) — sidstnævnte har muligvis en anden netværkspolitik?

**Midlertidig løsning indtil dette er afklaret**: manuel CSV-import (Fil → Importér → Upload i Google Sheets) for engangs-dataopgaver, eller et lokalt script Chris selv kører.

## Sådan importeres en ny sæsons historiske data (fremgangsmåde der virkede for 25/26)
1. Konverter den gamle Excel-fils "Resultater"-fane (kolonner: Spiller, Hold, Kategori, Plads, Hjemme, Ude, Sæt1-3, Vinder, Hjemme?, Point, Runde) til det nye format. Vigtigt: "Spiller"-kolonnen fortæller hvilken af Hjemme/Ude-kolonnerne der er "os"; "Vinder"-kolonnen (1/0) betyder "vores spiller vandt", ikke "hjemmeholdet vandt" — begge skal omregnes korrekt til det nye Hjemme/Ude-vinder-format.
2. Udtræk Tilmeldinger fra "Hold"-fanen. **Tjek for flere tabeller i samme fane** — 24/25-filen havde fx en duplikeret, manuelt kolonnesplittet kopi af de samme 23 deltagere længere nede i arket.
3. Krydstjek alle spillernavne brugt i Herrer/Damer-picks mod de faktiske "Spiller"-navne i Resultater. Byg en rename-liste for uoverensstemmelser (typisk mellemnavne/efternavne der er droppet et af de to steder).
4. Genberegn alle deltageres runde-for-runde-totaler (top-8-af-10-reglen) fra de rå, konverterede kampdata, og sammenlign mod arkets eget (formentlig statiske) facit i Pivot-fanen. Undersøg og forklar eventuelle afvigelser — de kan skyldes fejl i den GAMLE fil, ikke nødvendigvis i konverteringen (se punkt 7 ovenfor).
5. Byg et nyt Google Sheet med samme fanestruktur som ovenfor, importér de rensede data via Sheets API (se punkt 9 og 3 i "Kendte faldgruber" — IKKE browser-automation), og tilføj Sheet-ID'et til `seasons.js`.
