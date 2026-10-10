# Opgave 182 — Søndagstræning: afklaring og produktionsplan

## Hvad previewet gør i dag

Kernevisningen ligger i [`kampsystem/sondag_source.html`](../kampsystem/sondag_source.html). Den viser datoen for den kommende søndag, en liste med deltagere, tællere for “Kommer”, “Afbud” og “Ikke svaret”, samt knapper hvor hvert svar kan sættes eller nulstilles. Ved afbud kan man indtaste en valgfri kommentar. Koden indeholder otte eksempelnavne; de tre første er på forhånd sat til “Kommer”, den fjerde til “Afbud” med eksempelkommentaren “Skader knæ”, og de sidste fire står uden svar.

Tilstanden ligger alene i JavaScript-objektet `state` i den åbne side. Der er ingen `localStorage`, `sessionStorage`, netværkskald eller backend i `sondag_source.html`. Genindlæsning genskaber eksempeltilstanden, og svar/kommentarer deles ikke mellem brugere. Datoen beregnes i browseren; hvis siden åbnes en søndag, viser funktionen søndagen en uge senere.

Previewets gate og placering er beskrevet i [`kampsystem/shell_template2.html`](../kampsystem/shell_template2.html): den fælles kode `sondag2026` er indlejret i klientkoden, og oplåsning ligger i `sessionStorage`. Det er kun en visuel adgangsbarriere; koden kan læses i kildekoden og beskytter ikke backend eller data. [`kampsystem/landing_source.html`](../kampsystem/landing_source.html) linker til siden. Produktionsnav'en [`apps/netlify-prod/public/gsb-nav.js`](../apps/netlify-prod/public/gsb-nav.js) indeholder ikke Søndagstræning. Produktionsstatus i [`docs/preview-vs-live-status.md`](preview-vs-live-status.md) siger tilsvarende, at der ikke findes en rigtig backend, og at den er udeladt fra nav'en.

## Beslutninger, der mangler

### 1. Spillerliste

| Mulighed | Fordele | Ulemper |
|---|---|---|
| Stamdata fra kort 164, med en særskilt markering af hvem der er med i søndagsgruppen | Én navne-/ID-kilde på tværs af værktøjer; kan mindske dubletter ved navneskift; kan vedligeholdes centralt. | Stamdata er klubdata, ikke nødvendigvis medlemskab af netop denne lukkede gruppe. Kort 164 dokumenterer uafklarede identiteter og medlemskab; det er ikke i sig selv en færdig søndagsliste. Kræver en gruppe-markering og en ejer af den. |
| Spillerpoint-arket som kilde | Findes allerede og kan være praktisk, hvis gruppen præcis følger den dækkede trup. | Det er Dream Team-data og kan mangle eller medtage forkerte søndagsspillere. Kanoniske navne og adgang/eksponering skal afklares; kobling til arket er ikke undersøgt her. |
| Egen administreret Søndagstræning-liste i et dedikeret Sheet-faneblad | Gruppens afgrænsning er eksplicit og kan opdateres uden at ændre klubbrede stamdata. | Endnu en liste at vedligeholde; giver risiko for navne-/ID-afvigelser, hvis den ikke bruger stabile ID'er fra stamdata. |

**Forslag:** Brug stamdata som identitetsgrundlag, hvis kort 164 leverer egnede stabile nøgler, og lad en særskilt gruppekolonne eller -tabel afgøre deltagelse. Hvis gruppen ikke er repræsenteret dér, må Christoffer levere eller bekræfte selve listen. Brug ikke Spillerpoint som facit uden at kontrollere gruppens dækning.

### 2. Historik

| Mulighed | Fordele | Ulemper |
|---|---|---|
| Gem kun den aktuelle søndag; overskriv eller nulstil ved ny dato | Mindst datamængde og enklest brugerflade; svar har kort levetid. | Ingen mulighed for at se tidligere fremmøde eller rette et svar efter træningsdatoen. Regler for nulstilling skal være tydelige. |
| Gem én række pr. spiller pr. søndag i Google Sheets | Matcher preview-notens foreslåede Netlify-endpoint + Sheet; let for en administrator at inspicere og rette; datoer kan beholdes. | Kræver adgangsstyring på endpointet og disciplin omkring kolonner/duplikater; Sheets er ikke en database med stærke transaktioner. Historikken indeholder fremmøde og afbudskommentarer, så adgang og slettefrist skal fastlægges. |
| Gem historik i SQLite | Skema, unikke nøgler og forespørgsler kan håndhæves; passende hvis løsningen senere får rapportering. | Produktionshosting kræver en vedvarende database og backup-/migrationsplan; det er væsentligt mere drift end denne lille funktion. Statistikprojektets SQLite er ikke automatisk et passende produktionslager. |

**Forslag:** Hvis historik ønskes, start med et dedikeret Google Sheet, én række pr. søndag og spiller, og fastlæg hvem der kan læse den og hvornår gamle rækker slettes. Hvis historik ikke har et konkret formål, så gem kun den aktuelle søndag og undlad kommentarer eller slet dem efter datoen.

### 3. Adgang

| Mulighed | Fordele | Ulemper |
|---|---|---|
| Ét fælles kodeord | Enkel adgang for gruppen; lille ændring i brugerflow. | Koden kan deles videre, kan ikke knyttes til en person og kræver rotation ved læk. En klient-side gate alene beskytter ikke backend eller data. |
| Personlig login pr. bruger | Svar og ændringer kan knyttes til en konto; adgang kan tilbagekaldes for én person. | Kræver identitets-/kontosystem, invitationer, support og mere sikkerhedskonfiguration. Det er ikke implementeret i det viste preview. |
| Individuelle invitationstokens | Ingen fælles kode at dele; token kan udstedes og tilbagekaldes pr. person. | Token-håndtering og genudstedelse kræves; tabte/videresendte links er en risiko, og identiteten er stadig kun så sikker som linket. |

**Forslag:** Vælg adgang ud fra hvor fortrolige fremmøde og afbud er. En delt kode kan være en enkel første løsning, men API'et skal stadig kontrollere adgang på serversiden, og forventningen om at koden kan deles skal være accepteret. Personligt login er det stærkere valg, hvis svar skal være personligt ansvarlige eller gruppen er følsom. Den eksisterende preview-gate kan ikke genbruges som databeskyttelse.

## Produktionsplan

Ingen produktionsfiler ændres som del af dette kort. Når Christoffer har valgt spillerkilde, historik og adgang, kan implementeringen deles sådan:

1. **Lås datamodel og adgangsbeslutninger.** Bekræft den faktiske søndagsgruppe, stabile spiller-ID'er, om tidligere søndage gemmes, kommentarernes formål/levetid og hvem der må se svar. Definér API-kontrakt, validering, datoformat/tidszone og en unik nøgle for dato + spiller.
2. **Byg dataflow uden for live-sitet.** Opret Sheet-faneblad eller godkendt lager, hvis det valgte design kræver det. Byg Netlify Function(er) til at hente og gemme svar. Funktionerne validerer dato, spiller-ID og status; afviser ukendte spillere; kontrollerer adgang server-side; og gemmer hemmeligheder i Netlify-miljøvariabler. Browseren må ikke have servicekonto-nøgler eller være eneste adgangskontrol.
3. **Portér og tilslut siden.** Kopiér `kampsystem/sondag_source.html` til en ny produktionsside, fx `apps/netlify-prod/public/soendagstraening.html`. Fjern eksempelnavne, forhåndssvar og preview-noten; hent spillere og status fra endpointet, send ændringer dertil, vis vent-/fejlstatus, og håndtér tom/fejlet forbindelse. Tilføj siden til `apps/netlify-prod/public/gsb-nav.js` og brug den valgte gate. Tilføj kun nye Netlify-funktioner i `apps/netlify-prod/netlify/functions/`; produktionskonfigurationen bruger allerede `netlify/functions` og `public` ifølge `apps/netlify-prod/netlify.toml`.
4. **Afprøv på en isoleret Netlify Deploy Preview.** Kontrollér adgang før og efter oplåsning, direkte URL, at uautoriserede læse- og skrivekald afvises, kendt/ukendt spiller, alle tre statustilstande, valgfri kommentar, dobbeltklik/genindlæsning, samtidige svar, skift af søndagsdato, søndag efter midnat, mobilvisning, tom liste, backend-fejl og at nav-link/gate ikke påvirker andre apps. Kontrollér også, at ingen hemmeligheder ligger i HTML/JS eller browserens svar.
5. **Udrul kontrolleret.** Gem den nuværende produktionsdeploy som kendt rollback-punkt. Deploy de godkendte filer og miljøvariabler samlet. Verificér på produktionsdomænet med en kontrolleret testbruger/svar, bekræft at data lander ét sted én gang, og fjern testsvar bagefter. Åbn først for gruppen når både gate og svarflow er kontrolleret.
6. **Tilbagerulning.** Hvis gate, dataflow eller brugerflade fejler, gendan den forrige Netlify-deploy via deploy-historikken; fjern Søndagstræning-linket ved at genudrulle den tidligere nav-fil. Behold historiske data urørt under rollback, så de ikke slettes ved et deploy. Slå eventuelle nye miljøvariabler fra efter rollback, hvis de ikke bruges af andre funktioner. Undersøg fejl før et nyt forsøg.

**Vurdering af arbejdsstørrelse:** Trin 1 er én afklarings-/designrunde. Trin 2–3 bør være mindst én implementeringsrunde, muligvis opdelt hvis adgang eller datamodel kræver ekstra opsætning. Trin 4 er én særskilt QA-runde. Trin 5 kræver en konkret deploybeslutning og adgang til Netlify. Altså kan hvert trin beskrives særskilt, men det er ikke sikkert, at ét Codex-kald kan udføre hvert trin uden eksterne valg eller konfiguration.

## Spørgsmål til Christoffer

1. Hvilken præcis liste definerer søndagsgruppen? Skal stamdata fra 164 være identitetskilde med en separat gruppemarkering, og hvem vedligeholder markeringen?
2. Skal svar kun gælde den kommende søndag, eller skal der gemmes historik? Hvis historik: må den ligge i Google Sheets, hvem må læse den, og hvor længe beholdes afbudskommentarer?
3. Skal adgang være fælles kodeord, personlige konti eller individuelle invitationstokens? Er det acceptabelt, at en delt kode kan videresendes, når selve data-API'et også adgangskontrolleres server-side?

## Resultat

Previewkoden er fundet og gennemgået: siden er `kampsystem/sondag_source.html`, preview-skallen/gaten er `kampsystem/shell_template2.html`, og produktionens nav er `apps/netlify-prod/public/gsb-nav.js`. Siden indeholder 8 eksempelspillere, 3 eksempel-“Kommer”, 1 eksempel-“Afbud” og 4 uden svar. Status og kommentarer er kun i JavaScript-hukommelsen; der er ingen persistens eller backend i siden. De tre grundspørgsmål har hver 3 beskrevne muligheder med fordele/ulemper. Planen har 6 trin inkl. test og rollback. De 3 ubesvarede valg står ovenfor. Ingen kode eller produktionsfiler er ændret.
