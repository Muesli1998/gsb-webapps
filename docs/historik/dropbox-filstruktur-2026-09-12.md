> **FORÆLDET / HISTORISK.** Denne fil beskriver en git-opsætning med to
> separate repos (`gsb-projekt-docs-backup` og `gsb-kampsystem-kilde`),
> som blev erstattet allerede dagen efter (2026-09-13) af monorepo-
> beslutningen i `docs/BESLUTNINGER.md`. Alt kode og alle dokumenter
> ligger nu i ét repo, `gsb-webapps`. Denne fil er bevaret som historik
> for forløbet, ikke som aktiv reference til nutidens struktur.

# GSB – Dropbox-mappestruktur, fil-konventioner og enhedsadgang

Baggrundsviden om HVOR filerne faktisk ligger og hvordan de håndteres — udskilt fra
`claude/START-HER.md` 2026-09-04, fordi START-HER var ved at blive for langt at læse hver
session. Dette er reference-materiale man slår op i når man rent faktisk arbejder med filer på
Chris' computer, ikke noget der skal genlæses hver samtale. Se `claude/START-HER.md` for de
regler der derimod SKAL læses hver session.

## Dropbox-mappenavne — OMDØBT 2026-08-31, nu selvforklarende

- **`D:\Dropbox\netlify-tool-prod`** (tidligere `netlify-tool-preview`) — dette ER den live
  produktions-deploy (bekræftet fil-for-fil mod Netlifys "Deploy file browser", site
  `stalwart-boba-e7c6fd`, siden også kendt som `gsbmore.netlify.app`). `public/` har de rigtige
  sider, `netlify/functions/` de serverless-funktioner. `build3.py`'s `SRC`-konstant peger herpå.
- **`D:\Dropbox\gsb-claude-preview-kilde`** (tidligere `gsb-preview-bundle-archive`) — kildefilerne
  til selve Claude-previewet (`claude/gsb_preview.html`), inkl. `build3.py`/`build_real.py` og alle
  `*_source.html`-filer. Dette er stedet med de features der KUN findes i Claude-previewet —
  se idébankerne for hvilke, og `claude/gsb-preview-vs-live-status.md` for aktuel status. **Fra
  2026-09-12 er denne mappe også et git-repo** — se afsnittet "Git-versionsstyring" nedenfor.
- **`D:\Dropbox\gsb-claude-projekt-docs-backup`** (ny 2026-09-05) — har fra 2026-09-05 tjent som
  backup-mappe for Claude-projektdokumenter (`claude/*.md` m.fl.), og fra 2026-09-12 tjener den
  DERUDOVER som git-tracket hjemsted for fire konkrete "tunge log"-filer, der er migreret UD af
  Claude Projects. Denne mappe har altså to adskilte roller sideløbende — se afsnittet
  "Git-versionsstyring" nedenfor for den fulde forklaring af begge, og hvordan man kender
  forskel på dem.
- **`netlify-tool` (uden "-prod")** — slettet. Var kun et ufuldstændigt, efterladt sæt.
- Løse rodfiler `GSB_Resultatimport.html` og `gsb-resultatimport-netlify.zip` — også slettet
  (ældre dubletter/eksport af `index.html`-siden alene).

## ⚠️ Regel: "nyest ændret" ≠ "mest fuldstændig"

Der findes flere kandidat-kilder til GSB-sidernes HTML (produktion vs. preview-kilde), og hvilken
mappe der senest blev rørt siger INTET om hvilken der er mest fuldstændig — `netlify-tool-prod`
kan sagtens have et nyere tidsstempel end `gsb-claude-preview-kilde` uden at indeholde flere
features. Tjek altid idébankernes status-linjer ("BYGGET I PREVIEW" vs. "SHIPPET") for at afgøre
hvilken kilde der reelt er mest opdateret til et givent formål — aldrig filens tidsstempel alene.

Ved enhver `gsb_preview.html`-genbygning: byg fra `gsb-claude-preview-kilde`, patch kun med reelt
NYE produktions-ændringer fra `netlify-tool-prod` (verificér med et diff, gæt ikke).

**Baggrund (fejlen der opstod 2026-08-31, lærestykke):** en tidligere genbygning antog fejlagtigt
at den senest-tidsstemplede mappe (dengang navngivet "-preview", hvilket i sig selv var roden til
forvekslingen) automatisk var den mest komplette kilde, og byggede en ny `gsb_preview.html` ud fra
produktions-mappen — hvilket NULSTILLEDE alle preview-only features tilbage til produktionsniveau.
Rettet samme dag ved at bygge fra den feature-rige base i stedet. Mappenavnene er nu omdøbt
netop for at forhindre en gentagelse, men selve tjek-metoden (status-linjer, ikke tidsstempel)
gælder stadig generelt.

**Samme lærestykke gælder projekt-dokumenternes kode-kopier (fundet 2026-09-04):** de uploadede
kode-filer i selve Claude-projektet (`tilmelding.html`, `spillere.js` osv., uden `claude/`-
præfiks) er IKKE automatisk opdaterede — de er statiske snapshots fra 2026-08-28/29 og bekræftet
forældede efter hver shipping-runde. Brug ALDRIG disse som kilde til "hvad er live lige nu" — tjek
altid direkte mod `D:\Dropbox\netlify-tool-prod` via enhedsbroen, eller stol på `gsb-driftlog.md`.

## Kendt hul i Historisk stilling for 24/25 — RETTET 2026-08-31

`stilling_2425_addendum.json` (23 deltagere, roundVals + holdMap, rekonstrueret fra det gamle
Excel-arks Pivot-facit) lå allerede arkiveret, men var ikke koblet ind i `build3.py`'s
stilling-mock — kun i analyse-mock'en. Rettet: `build3.py` indlæser nu addendum-filen og swapper
den ind for `SHEET_2425`, ligesom analyse-mock'en allerede gjorde for Statistik-siden.

## Fil-versionerings-konvention for kandidat-/testkode

Projektets docs er IKKE stedet hvor "den nyeste, rigtige" kode bor — den rolle har
`netlify-tool-prod`.

- Et kandidatforslag til en ægte fil får altid et tydeligt version-/dato-mærke i navnet (fx
  `hent-resultater_v2-kandidat-2026-08-31.js`), ALDRIG samme navn som den rigtige fil.
- Så snart Chris har godkendt og selv fået det kopieret til den rigtige Dropbox-mappe (eller
  Claude har gjort det direkte), fjernes/opdateres kandidatfilen igen — ingen permanente
  dobbeltkopier af samme fil.

## Direkte adgang til Chris' lokale Dropbox-mappe — BEKRÆFTET 2026-08-31

Når linket til Chris' computer er aktivt, kan sessionen læse og skrive direkte i den forbundne
Dropbox-mappe (`D:\Dropbox`) via remote-devices-værktøjerne — ingen shell/device_bash til
rådighed i denne opsætning, kun liste/læse/skrive filer, INGEN omdøbning/sletning af mapper eller
filer (det må Chris selv gøre, fx i Windows Stifinder). Chris foretrækker at Claude opdaterer
filerne direkte der, fremfor kun i projektet.

**Vigtigt fra 2026-09-12:** dette gælder stadig fil-læsning/skrivning generelt, men det er IKKE
det samme som git — ingen Claude-session kan selv køre `git add/commit/push` (bekræftet: intet
`device_bash`-værktøj til rådighed i denne opsætning). Se "Git-versionsstyring" nedenfor for
hvordan de to git-repos i stedet holdes opdateret.

**Sikkerhedsflag, ikke fulgt op endnu:** en fil der navnemæssigt ligner en Google
service-konto-nøgle (`gsbdreamteam-b79726885661.json`) ligger direkte i Dropbox-roden — IKKE
åbnet/læst (credential-lignende filer læses aldrig af Claude). Anbefaling givet 2026-08-31: flyt
den ud af Dropbox til en adgangskode-manager eller kun ind som miljøvariabel i Netlifys
dashboard, hvis den overhovedet er i aktiv brug.

## Løsfiler i Dropbox-roden — oprydningsforslag givet 2026-08-31, ikke udført endnu

Forslag til Chris (afventer hans egen udførelse — Claude kan ikke flytte/slette mapper/filer):
- GSB-relaterede løsfiler (`GSB_Dream_Team_2627.xlsx`, `GSB Holdkampe_...ics`,
  `GSB holdkampe.zip`, `Beregning_hjaelpefane.tsv`, `Søndagstræninger.xlsx`) → saml i den
  eksisterende `GSB Dream Team`-mappe, evt. i en undermappe til rådata/kalender.
- `app.py`, `badmintonplayer_export.py`, `export_videos.py`, `flask_log.txt`, `videos.csv`,
  `templates/`, `.env`, `.env.example`, `.gitignore` — vurderet som et separat, ikke-GSB-webapp-
  projekt (formentlig et lokalt Flask-værktøj + videoeksport). Ikke rørt eller organiseret.
- `GaveMor.pdf` — personlig fil, ikke GSB-relateret. Ikke rørt.
- `gsbdreamteam-b79726885661.json` — se sikkerhedsafsnittet ovenfor.
- Root-`README.md` — ikke læst/vurderet, formentlig en generel Dropbox-note.

## Backup af Claude-projektdokumenter — NY 2026-09-05

Adskilt fra alt ovenstående (som handler om selve GSB-webapp-koden): Claude Projects-dokumenter
(`claude/*.md`, idébanker, spec-filen, driftloggen osv.) har INGEN indbygget versionshistorik —
en fuld `project_write` erstatter hele dokumentet uden mulighed for fortrydelse fra selve
platformen. Det adskiller dem fra filer i `netlify-tool-prod`/`gsb-claude-preview-kilde`, som
Dropbox selv versionerer.

Anledningen: 2026-09-05 blev `claude/gsb-kampsystem-idebank.md` ved en skrivefejl i en anden
Claude-session (en bogstavelig `$(cat existing)`-streng indsat i stedet for det faktiske
indhold) tømt for al historik ned til kun den seneste sektion. Filen blev genskabt fra sessionens
egen samtalekontekst — se `claude/gsb-driftlog.md`s "Trettende runde"-afsnit for det fulde forløb.

- **`D:\Dropbox\gsb-claude-projekt-docs-backup\`** er den nye, foretrukne backupmappe til dette
  formål — ÉN backup pr. dokument, samme filnavn som originalen (fx `gsb-kampsystem-idebank.md`),
  overskrevet ved hver ny backup. Rotation/historik for disse ligger bevidst hos Dropbox' egen
  versionshistorik (ikke hos os) — se `claude/START-HER.md` for hvornår denne mappe skal bruges.
- Bruges KUN når enhedsbroen til Chris' computer er forbundet på skrivetidspunktet. Er den ikke
  forbundet, falder proceduren tilbage til en projekt-doc-backup i `claude/_backups/`
  (`<filnavn>_<ÅÅÅÅ-MM-DD>.md`, højst 2-3 versioner beholdt pr. fil) — se START-HER.md for den
  fulde regel.
- Eksempler på begge typer allerede i brug: `claude/_backups/gsb-kampsystem-idebank_2026-09-05.md`
  (den skadede tilstand, bevaret som historik), `claude/_backups/gsb-kampsystem-idebank_2026-09-05_restored.md`
  (den genskabte, gode tilstand) og `claude/_backups/gsb-driftlog_2026-09-06.md` — alle skrevet
  som projekt-doc-fallback, fordi enhedsbroen ikke var forbundet på skrivetidspunktet.
- **VIGTIGT fra 2026-09-12 — denne mappe har fået en ANDEN rolle ved siden af:** ovenstående
  backup-mekanisme (én overskrevet kopi pr. dokument, for docs der BLIVER I Claude Projects) er
  fortsat gældende og uændret. Men samme mappe indeholder nu OGSÅ fire filer der IKKE længere er
  Claude-project-docs med en backup-kopi liggende ved siden af — de ER selve den autoritative,
  git-versionerede kilde. Forveksl ALDRIG de to roller — se næste afsnit for den fulde
  forklaring og den præcise liste over hvilke fire filer det drejer sig om.

## Git-versionsstyring for de tungeste log-filer — NY 2026-09-12

Chris har (jf. "Chris' eget ønske om rigtig versionsstyring" nedenfor, oprindeligt nævnt
2026-08-31) sat rigtig git-versionsstyring i gang for to afgrænsede formål: de mest churn-tunge,
append-drevne projekt-docs, og selve preview-kildekoden. Dette ERSTATTER ikke resten af denne
fils indhold — Dropbox-mappestrukturen for selve GSB-webapp-koden (`netlify-tool-prod` m.fl.)
består uændret, og de fleste Claude-project-docs (START-HER, roadmap, feature-idébank,
statistik-idébank, spec-filen m.fl.) bliver bevidst LIGGENDE i Claude Projects, netop så enhver
session — også en der ikke er forbundet til Chris' computer — kan læse dem uden videre.

### To adskilte git-repos

1. **`C:\Users\chril\Dropbox\gsb-claude-projekt-docs-backup\`** → privat GitHub-repo
   **`gsb-projekt-docs-backup`**. Indeholder de fire migrerede "tunge log"-filer (se listen
   nedenfor) SAMT fortsætter uændret som backup-destination for andre store project-docs, jf.
   forrige afsnit.
2. **`D:\Dropbox\gsb-claude-preview-kilde\`** → privat GitHub-repo **`gsb-kampsystem-kilde`**.
   Selve preview-kildekoden: `kampsystem_source.html`, `build3.py`,
   `kampsystem_preview_standalone.html` og de øvrige `*_source.html`-filer nævnt ovenfor. Denne
   mappes rolle som "kilde til Claude-previewet" er uændret — den er nu bare OGSÅ git-tracket.

Begge repos er almindelige git-repos i deres respektive Dropbox-mapper — Dropbox' egen
fil-synkronisering og git's versionshistorik kører side om side, de konkurrerer ikke.

### To PowerShell-scripts, kørt af Chris selv

Ingen Claude-session kan køre `git add/commit/push` selv (bekræftet: intet `device_bash`-værktøj
til rådighed her — kun læsning/skrivning af filer via remote-devices-værktøjerne, ingen shell).
Chris har derfor to scripts han selv kører:

- **`setup-git-gsb.ps1`** — engangs-opsætning for begge repos: initialiserer git-tracking i hver
  mappe, opretter de to private GitHub-repos via `gh repo create`, og laver første push. Køres
  kun én gang (eller igen hvis noget skal nulstilles) — hvis Chris allerede har kørt den, er
  opsætningen færdig.
- **`sync-git-gsb.ps1`** — det script Chris kører løbende bagefter, for begge repos i én kørsel:
  `git add -A; git commit; git push`. Dette er den reelle "gem til git nu"-handling — en
  Claude-session kan bede Chris om at køre den, men kan ikke køre den selv.

**Konsekvens for Claude-sessioner:** når en session skriver/opdaterer en af de fire migrerede
filer (se listen nedenfor) via enhedsbroens fil-værktøjer, er ændringen fysisk skrevet til disken
med det samme, men den er IKKE i git-historikken før Chris selv kører `sync-git-gsb.ps1`. Skriv
det til Chris når det er relevant ("filen er opdateret på disk, husk at køre sync-scriptet"),
foreslå ikke selv at "committe" noget.

### De fire migrerede filer og deres nye autoritative placering

Disse fire filer er UDE af Claude Projects (erstattet dér af korte henvisnings-stubs) og lever nu
udelukkende i `C:\Users\chril\Dropbox\gsb-claude-projekt-docs-backup\`:

- `gsb-kampsystem-idebank.md`
- `gsb-driftlog.md`
- `gsb-kampsystem-idebank-historik.md`
- `gsb-driftlog-arkiv-runde8-10.md`

Baggrunden for migreringen: Claude Projects har ingen delvis-skrivnings-API — `project_write`
erstatter altid HELE filen, hvilket er dyrt for store, hyppigt opdaterede logfiler som netop
disse fire. Ved at flytte dem til git-tracked filer på Chris' computer kan fremtidige opdateringer
ske som almindelige, billige tekst-redigeringer (og senere `git commit`) i stedet for en fuld
`project_write` af hele dokumentet hver gang.

**For disse fire filer specifikt:** en Claude-session med enhedsbro til Chris' computer læser og
redigerer dem direkte i `C:\Users\chril\Dropbox\gsb-claude-projekt-docs-backup\` — IKKE via
`project_read`/`project_write`, da de ikke længere er project-docs. Er enhedsbroen ikke
forbundet, er filerne ikke tilgængelige for den session (der er ingen project-doc-fallback for
disse fire specifikt, til forskel fra den generelle backup-regel i forrige afsnit).

### Den doble rolle for `gsb-claude-projekt-docs-backup` — opsummeret, så det ikke forveksles

Samme mappe, to forskellige ting liggende side om side:

1. **De fire filer i listen ovenfor** er HER den eneste, autoritative, git-versionerede kilde —
   der findes ingen "original" andetsteds i Claude Projects (kun en stub-henvisning). Redigér dem
   direkte her.
2. **Enhver anden fil i samme mappe** (fx en fremtidig `gsb-roadmap.md` eller
   `gsb-feature-idebank.md`, hvis/når de vokser sig store nok til at udløse regel D i
   `claude/START-HER.md`s "Store dokumenter"-afsnit) er derimod KUN en pre-ændrings sikkerheds-
   kopi — originalen og den autoritative version af den slags filer forbliver i Claude Projects,
   og filen her overskrives blot ved næste backup, uden selv at være git-relevant i sig selv
   (den ligger ganske vist i et git-repo og bliver dermed også versioneret, men det er en
   bivirkning af placeringen, ikke formålet).

Tommelfingerregel: er filnavnet ét af de fire ovenfor, er kopien her "den rigtige". Er det et
andet filnavn, er kopien her "kun en sikkerhedskopi", og den rigtige fil er i Claude Projects.

## Chris' eget ønske om rigtig versionsstyring

Chris har nævnt (2026-08-31) at han overvejer at flytte til rigtig versionsstyring (git/GitHub) i
stedet for Dropbox-mapper. **Opdatering 2026-09-12: dette er nu sat i gang**, se
"Git-versionsstyring for de tungeste log-filer" ovenfor — men kun for de to afgrænsede formål
beskrevet dér (fire specifikke docs, samt preview-kildekoden), ikke for hele Dropbox-strukturen.
Resten af denne fils indhold om selve GSB-webapp-koden (`netlify-tool-prod` m.fl.) og om den
generelle project-doc-backup-mekanisme gælder fortsat uændret.
