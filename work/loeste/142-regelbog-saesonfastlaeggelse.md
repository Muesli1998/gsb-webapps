# Opgave 142 — regelbogens sæsonfastlæggelse

## Baggrund

Verifikation i `statistik/results/134-regelbog-verifikation.md` fandt to afvigelser blandt 40 felter (#7 og #9) samt 14 uklare. Flere kilde-PDF'er angiver kun dokument-/revisionsdato, ikke anvendelsessæson; én veteran-PDF modsiger sig selv. Filnavn, mappe og registermetadata er ikke PDF-evidens.

## Mål

Håndhæv, at en regelbogspost kun er `bekraeftet`, når dens primære PDF selv angiver én entydig sæson; ellers markeres kilde-sæsonen usikker, og posten kan højst være `betinget`.

## Afgrænsning

**Må røres:** `statistik/kilder/reglementer/kilde-saesonoverstyring.json` (ny), `statistik/scripts/131-byg-regelbog.mjs`, genereret `regelbog-pr-saeson.json/.md` og `131-regelbog-daekning.md`, `slaa-op-regelbog.mjs` hvis mærket ikke vises, `statistik/results/142-regelbog-foer-efter.md`, dette kort.

**Må ikke røres:** `register.json` medmindre der bevises en ren dataenkelt-fejl; 127/129/130/133/134/136/138/141-resultater; databaser; `apps/netlify-prod/`; `docs/BESLUTNINGER.md`. Ingen downloads/netværk.

## Mål / arbejdsrækkefølge

1. Dokumentér hvordan register og generator sætter sæsonfastlæggelse/status. Identificér auditrapportens #7 og #9 med alle felter og forklar deres nuværende status.
2. Gennemgå alle 53 register-PDF'er med `pdfplumber`; registrér PDF-sidetal, kort citat, selvangivet sæson(er), registerets sæson og dom: entydig / ikke angivet / modstrid. Ingen sæson udledes af metadata, sti eller dato.
3. Anvend usikre kildebeslutninger via en eksplicit overstyringsfil, medmindre en registerfejl er beviseligt ren og entydig. Usikre kilder kan højst give `betinget`; sæt `kilde_saeson_usikker: true` og kort begrundelse på posterne. De er svage uanset afstand. Bevar `pointskala_arv: "ingen"`.
4. Genbyg regelbogen, markdown og dækningsrapport. Skriv alle statusændringer felt for felt i `statistik/results/142-regelbog-foer-efter.md`.
5. Kontrollér særskilt national ungdom (BD+DGI) og København-ungdom. Gentag de samme 40 stikprøvefelter fra 134 uden at ændre 134-rapporten; redovis nu afklarede og fortsat uklare felter.
6. Opdatér opslagsscriptet, hvis nødvendigt, og vis fem opslagseksempler.

## Kontrol

**Målet:** #7 og #9 må ikke længere stå bekræftet uden entydig PDF-sæson; alle overgange skal være forklaret felt for felt; 40-feltsstikprøven gentaget.

**Værnet:** DB SHA-256 før/efter er normalized `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` og landscape `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; `git status --short statistik/data/` tom; `pointskala_arv` fortsat `ingen` i alle poster; 28 parser-tests uændrede.

**Skøn:** 10 udvalgte før/efter-felter sammenholdt direkte med kildetekst.

## Ved tvivl

PDF-datoer beviser ikke sæson. Ved tvetydighed beholdes usikkerhed, og spørgsmålet skrives nedenfor; sæson gættet ud fra filnavn, mappe eller metadata tæller ikke.

## Gren

`arbejde/142-143-regelbog-rettelse`. 142 udføres og rapporteres færdig, før 143 påbegyndes.

## Spørgsmål

De 14 felter #11–18, #20–22, #24–25 og #40 fra den gentagne stikprøve er fortsat uklare, fordi PDF'erne ikke dokumenterer anvendelsessæson entydigt eller selvmodsiger sig. Ingen sæson er udledt af dato, registersti eller filnavn. De står fortsat betingede/usikre, indtil der findes direkte sæsonevidens.

## Tilbagefald

(Ingen.)

## Resultat

Gennemgik alle 53 register-PDF'er med pdfplumber og indførte 19 eksplicitte kildeoverstyringer (10 for regelbogskæder, 9 for øvrige/supplerende kilder). Rettede én ren registerfejl: `nordjylland-veteran-historic` angiver på PDF s. 1 “GÆLDENDE FOR SÆSONEN 2018-2019”, så registerets sæson er nu 2018/19 med citat som evidens. Oprettede `statistik/results/142-regelbog-foer-efter.md` med kilde-for-kilde audit, feltændringer og kontroller.

Før genbygning reproducerede generatoren baseline nøjagtigt: 918 poster, 41 bekræftet / 96 betinget / 781 ingen, entries identiske; 53 registerkilder valideret. Efter kanonisering er der 765 poster: 37 bekræftet / 96 betinget / 632 ingen. 68 poster er markeret med usikker kilde-sæson og alle er svage; i alt 80 betingede poster er svage. `pointskala_arv="ingen"` i 765/765.

Fire statusovergange fra bekræftet til betinget: 2013/14 veteran Sjælland (PDF modsiger sig selv); 2018/19 senior West-kredsserie; 2025/26 senior West; 2025/26 veteran West. De sidste tre kilder har kun dokument-/ikrafttrædelsesdato eller ingen sæsontekst. I de samme 40 stikprøvefelter fra 134 blev #7 og #9 rettet til betinget/usikker; 14 tidligere uklare felter forblev uklare, 0 blev afklaret. National ungdom og København-ungdom har hver 17 felter før/efter med uændret primær kilde-ID og status pr. sæson (0 forskelle).

Opslagseksempler: 2025/26 West senior → betinget, afstand 0, usikker; 2018/19 West-kredsserie → betinget, afstand 0, usikker; 2013/14 Sjælland veteran → betinget, usikker; 2025/26 national ungdom → bekræftet; 2025/26 Sjælland veteran → betinget/usikker, afstand 3. Parserkontrol: 28/28 uændrede cases bestod. Scriptets syntax, baselineverifikation, genbygning, databashashes og `git diff --check` bestod; `git status --short statistik/data/` var tom. Fuld audit og hashværdier står i resultatrapporten.
