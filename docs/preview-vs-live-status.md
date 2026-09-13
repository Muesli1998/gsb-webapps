# GSB – Preview vs. Live status (hvad findes hvor lige nu)

**Formål:** ét sted der viser, feature for feature, om noget kun findes i Claude-previewet
(`claude/gsb_preview.html`), kun i produktion (`D:\Dropbox\netlify-tool-prod`), eller begge
steder — så du hurtigt kan spørge "byg de nye ting i live fra preview" og få et præcist svar på
hvad det dækker. Opdateres HVER GANG noget bygges i det ene sted men ikke det andet — se reglen
i `claude/START-HER.md`.

**Sådan læses tabellen:** 🟢 = live i `netlify-tool-prod` (og formentlig deployet, medmindre
andet står). 🟡 = kun i Claude-previewet, ikke i de rigtige filer. ⚪ = kun idé/design, intet
bygget nogen steder (se `gsb-feature-idebank.md`/`gsb-planlagte-features-spec.md`). 🔴 = tidligere
markeret 🟢, men Chris har bekræftet at det IKKE virker i produktion lige nu (regression).

| Feature/side | Preview | Live | Note/gap |
|---|---|---|---|
| Nav/IA tre-lags-menu + forside | 🟢 (iframe/postMessage-udgave) | 🟢 (rigtig `gsb-nav.js` + `forside.html`, ottende runde) | To forskellige tekniske udgaver, samme design. Ingen gap. |
| Board-position + win%-dedup-fix (Statistik) | 🟢 | 🟢 (niende runde) | Ingen gap. |
| Statistik: sæson-pills, auto-indlæsning, compare/matrix | 🟢 | 🟢 (niende runde) | Ingen gap. |
| Historisk stilling: podie + Hall of Fame | 🟢 | 🟢 (niende runde) | Ingen gap. |
| Betalt/Gratis-tilmelding + MobilePay-UI (B5) | 🟢 | 🟢 (niende runde) | Ingen gap. |
| Podie-filtrering efter betaling + Honorable mentions (B5) | 🟢 | 🟢 (tiende runde) | Ingen gap. Chris' egen opgave (rette betalingsstatus for 24/25+25/26 i Tilmeldinger) er stadig ikke gjort. |
| Rod-redirect (`/` → forside) | n/a (kun relevant for rigtig Netlify-routing) | 🟢 LUKKET (bekræftet live 2026-09-06) | Ellevte runde rettede fixet (`force=true` + `_redirects`) i Dropbox-kilden, men det viste sig aldrig at være overført til selve Netlify — deraf regressionen rapporteret femtende/sekstende runde. Chris uploadede 2026-09-06 `netlify-tool-prod`-mappen manuelt til Netlify og bekræftede at roden nu korrekt lander på `/forside.html`. Se Syttende runde i driftloggen og roadmap-punkt 1 (nu markeret lukket). |
| Kampsystem/ELO — kernefunktion (roster, rundegenerering, ELO-opdatering, Sheets-backend) | 🟢 | 🟢 (syvende/ottende runde, live-testet ellevte runde) | Diffet 2026-09-04 (A6) — kernefunktionen (37 funktioner, K/ELO-konstanter) er identisk. Se næste række for den ene reelle afvigelse fundet. |
| Kampsystem: Ungsenior/Motionist-grupper, checkboks-gruppefilter | 🟢 (rettet 2026-09-04) | 🟢 | A6 diffet 2026-09-04: `kampsystem_source.html` var regredieret siden syvende runde (2026-09-03), manglede multi-gruppe-checkboks-filteret + `MOTIONIST_GRUPPE`. Rettet samme session — kilden matcher nu produktionen. Kun preview-kilde-filen ændret, ingen produktionsfiler rørt. Se A6 i spec-filen og kampsystem-idébanken. Bemærk: selve det publicerede Claude-preview-artifact er ikke genbygget/verificeret fra den rettede kilde endnu. |
| Kampsystem: K-faktor gjort erfarings-afhængig (BD-inspireret) | ⚪ ikke bygget | ⚪ ikke bygget | PARKERET 2026-09-04 — Chris: "det virker fornuftigt for nu", se kampsystem-idébanken. |
| Kampsystem: lås-dropdown nulstiller ikke ved valg (kan vælge samme spiller to gange) | 🟡 rettet (A5) | 🟡 samme bug, ikke rettet endnu | A5 bygget i preview-kilden 2026-09-04, verificeret med jsdom. IKKE kopieret til produktion endnu. |
| Kampsystem: bane-begrænset rundegenerering (ingen "venter på bane") | 🟡 bygget | ⚪ ikke bygget | Bygget 2026-09-04 i preview-kilden — "venter på bane" fjernet, overskydende kampe folder til "sidder over". Se kampsystem-idébanken. |
| Kampsystem: kønsbevidst double-parring i højere pointlag | 🟡 bygget, FULDT virksom | ⚪ ikke bygget | Bygget 2026-09-04 i preview-kilden. Kønsseeding (koen-felt) fuldført 2026-09-05 for alle 382+61 spillere — funktionen er nu reelt aktiv, ikke kun kode uden effekt. Se kampsystem-idébanken. |
| Kampsystem: HÅRD kønsparring i Mixed double (formTeamsMixed) | 🟡 bygget | ⚪ ikke bygget | Bygget 2026-09-05 — rettede en hidtil ukendt bug hvor Mixed double aldrig havde kønslogik (kunne give to rent mandlige/kvindelige hold). Kræver koen-data, nu seedet. Se kampsystem-idébanken (BYGGERUNDE 2026-09-05). |
| Kampsystem: "Skal spille"-force (tvungenSpil, undgå at sidde over) | 🟡 bygget | ⚪ ikke bygget | Bygget 2026-09-05 — ny afkrydsningsboks pr. spiller i roster-tabellen, nedprioriterer spilleren som oversidder-kandidat. Ikke gemt til Sheets endnu (session-hukommelse). Se kampsystem-idébanken. |
| Kampsystem: Ungsenior-gruppeflytning synkroniseret i build3.py | 🟡 rettet 2026-09-05 | 🟢 | build3.py's KAMPSYSTEM_ROSTER manglede Ungsenior-gruppeflytningen fra 2026-09-03 (drift, samme klasse som A6) — rettet 2026-09-05. Se kampsystem-idébanken. |
| Kampsystem: "Nulstil runde" (i stedet for "Nulstil eksempeldata") | 🟡 bygget | ⚪ "Nulstil eksempeldata" findes stadig | Bygget 2026-09-04 i preview-kilden — "Nulstil eksempeldata" er fjernet helt. Se kampsystem-idébanken. |
| Kampsystem: tydeligere oversidder-UI + valg af håndtering | 🟡 bygget | ⚪ ikke bygget | Bygget 2026-09-04 — oversidder-tæller pr. spiller + rotation, fremhævet "sidder over"-kort med antal, "Send til teknikbane"-knap. Se kampsystem-idébanken. |
| Kampsystem: manuel redigering af genererede kampe (byt spiller/skift type) | 🟡 bygget | ⚪ ikke bygget | Bygget 2026-09-04 — "✎ Rediger kamp" + "Bekræft ændringer", rører aldrig `lockedMatches`. Se kampsystem-idébanken. |
| Kampsystem: H2H-redesign ("vælg 1 spiller") + kamplog pr. spiller | 🟡 bygget | ⚪ ikke bygget | Bygget 2026-09-04 — én dropdown + kategori-filter + "makker mest med"-stat. Se kampsystem-idébanken. |
| Kampsystem: trænings-skabeloner (fuld B4-datamodel, Fase 4) | ⚪ ikke bygget | ⚪ ikke bygget | Blokeret af A3 (cheftrænerens skabelon-liste). |
| Søndagstræning | 🟡 (eksempeldata, ingen rigtig backend) | ⚪ findes slet ikke | Bevidst udeladt fra produktions-nav. Kræver: rigtigt Sheets-faneblad + Apps Script-backend, kopiering af siden, tilføjelse til `gsb-nav.js`s `APPS`-liste. |
| Klubstatistik (B3 — ungdom+senior+veteran, adskilt fra Dream Team) | ⚪ kun designet | ⚪ kun designet | Design færdigt i spec-filen, intet kodet nogen steder. A7 (ageGroupId-tabellen) er nu afsluttet, blokerer ikke længere B3. |
| Kampkalender — web + Google Calendar-sync (B1) | ⚪ kun designet | ⚪ kun designet | Design + proof-of-concept færdigt i spec-filen, intet kodet i selve sitet. |
| Ungdomssparring: preview læser rigtig, live data (B2) | 🟢 (kun læsning, skrivning mocket) | n/a (produktionssiden har altid haft sin egen rigtige backend) | Preview er nu "på niveau" med live for læsning; skrivning i previewet er bevidst stadig fake. |
| 24/25-sæson rekonstrueret datasæt | n/a (kun leveret som CSV til Chris) | ⚪ ikke indsat i noget rigtigt Sheet endnu | Leveret, ikke bygget ind i pipeline. |

**Sådan bruger vi den fremover:**
- Når noget bygges i previewet men IKKE i de rigtige filer: markér 🟡, og skriv præcis hvad der
  mangler i "Note/gap" (ikke bare "mangler at blive shippet" — men hvilke konkrete filer/dele).
- Når noget shippes til `netlify-tool-prod`: opdatér rækken til 🟢 samme session, og fjern
  eller opdater gap-noten.
- Når Chris siger noget i retning af "byg de nye features i live fra preview": denne tabel er
  svaret — filtrér på 🟡-rækker, det ER listen.
- Hold selve tabellen kort (én linje pr. feature, detaljerne bor i idébank/kampsystem-idébank/
  driftlog) — hvis en rækkes gap-note vokser forbi et par sætninger, er det et tegn på at
  rækken burde splittes i flere linjer eller detaljen burde flyttes til driftloggen med et
  henvisnings-link herfra.
