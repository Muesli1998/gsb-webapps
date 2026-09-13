# GSB Webapps — Opus-strategisk-review: opskrift og genbrugelig prompt

**Formål:** Et periodisk (manuelt igangsat) review af alle GSB Webapps-idébanker, features og
roadmap-status, der bruger Opus' stærkere ræsonnement til selve prioriterings-/edge-case-arbejdet,
men holder Opus' token-forbrug nede ved at lade billigere modeller (Sonnet/Haiku) læse og
kondensere de store rå-dokumenter først. Outputtet er en levende roadmap-fil,
`claude/gsb-roadmap.md`, som opdateres hver gang reviewet køres — ikke bare et løst engangsnotat.

**Igangsættes KUN når Chris eksplicit beder om det** — matcher standing-reglen i
`claude/START-HER.md` om at Opus-brug altid skal spørges om først, aldrig ske automatisk. Denne
fil er opskriften/prompten, ikke en trigger, og kører ikke af sig selv.

**Skal kunne køre uden en forbundet computer.** Reviewet må ikke kræve at enhedsbroen til Chris'
computer (og dermed den lokale Dropbox) er forbundet i den session der kører det — det er typisk
en anden samtale/session der har enheden forbundet. Alt der reelt kræver enhedsbroen (Klynge G
nedenfor) er derfor valgfrit og fejler aldrig reviewet, det noteres blot som "ikke tjekket".

## Hvornår er dette relevant

Brug denne opskrift når Chris vil have et samlet overblik: "hvad er næste trin", "er der noget
der bør ændres/forbedres på tværs", eller vil have `gsb-roadmap.md` opdateret — til forskel fra
det automatiserede, dokument-mekaniske sundhedstjek der allerede kører hver 2. uge (det tjekker
filstørrelser/backup-antal/dokumentkort, ikke indhold eller prioritering).

Første omgang dækker kun dokument-/idélaget, ikke selve de byggede filer (`gsb_preview.html`,
`analyse.js`) — Opus kan pege på at et af dem bør have sit eget code-review, men laver ikke det
review i denne omgang.

## Trin 1 — billige subagents kondenserer hver dokumentklynge

Spawn parallelle subagents (model: Sonnet som standard, Haiku for de rene bulk-læse-klynger hvor
der ikke skal vurderes meget) — én pr. klynge, alle i samme besked (parallelt, ikke sekventielt):

- **Klynge A — Kampsystem:** `claude/gsb-kampsystem-idebank.md` + `claude/gsb-kampsystem-idebank-historik.md`
- **Klynge B — Statistik:** `claude/gsb-statistik-idebank.md`
- **Klynge C — Øvrige features:** `claude/gsb-feature-idebank.md` + `claude/generel-idebank.md`
- **Klynge D — Drift/status:** `claude/gsb-driftlog.md` + `claude/gsb-preview-vs-live-status.md`
- **Klynge E — Spec & reference:** `claude/gsb-planlagte-features-spec.md` + `NEMBADMINTON_API_NOTES.md` + `GSB_NAVNE_ALIAS_OG_ANOMALIER.json` + `claude/gsb-dropbox-filstruktur.md` + `GSB_DREAM_TEAM_PROJECT_BRIEF.md`
- **Klynge F — Uden for selve projektet (hukommelse):** memory-filerne `/areas/gsb-dream-team.md`
  og `/areas/gsb-season-infrastructure.md`

Backup-filer (`claude/_backups/*`, `claude/_arkiv/*`) er IKKE en del af input — de er historiske
kopier, ikke aktuel status.

Brief-skabelon pr. subagent (udfyld de konkrete filnavne for den klynge):

> Læs [de angivne filer] fra GSB Webapps-projektet (Projects-værktøjet/`project_read`, eller
> `memory_read` for hukommelsesfiler). Skriv et kort, struktureret resumé (maks ca. 250 ord) med
> felterne: **Status** (1-2 sætninger), **Seneste beslutninger/ændringer**, **Åbne
> spørgsmål/blokeringer**, **Noget der virker forældet/redundant/modstridende med andre filer**.
> Byg intet, foreslå intet at bygge — kun observation og resumé. Returnér kun resuméet.

## Trin 1b — Klynge G: selve Dropbox-mappen (valgfrit, kræver forbundet enhed)

Dette trin er IKKE en subagent — det er ét-to billige kald direkte fra den orkestrerende session,
lige før Trin 1 spawnes:

1. Kald `get_device_info` (eller tilsvarende device-info-kald). Er der en forbundet mappe der
   matcher Dropbox-backup-stien beskrevet i `claude/gsb-dropbox-filstruktur.md`
   (`D:\Dropbox\gsb-claude-projekt-docs-backup\` eller tilsvarende)?
2. **Hvis ja:** list mappens indhold (`device_list_dir`) og sammenlign kort med det der er
   beskrevet i `gsb-dropbox-filstruktur.md` — navngivningskonvention, om filerne der forventes at
   ligge der reelt gør det, om noget virker forældet. Denne observation tilføjes som "Klynge G" i
   input til Opus i Trin 2, på samme korte format som de andre resuméer.
3. **Hvis nej (ingen enhed forbundet, eller ingen matchende mappe):** spring trinnet over uden
   fejl. Klynge G's bidrag til Opus-prompten bliver da blot: "Dropbox ikke tjekket denne kørsel —
   ingen enhed forbundet." Resten af reviewet kører upåvirket.

## Trin 1c — frisk læsning af den eksisterende roadmap (hvis den findes)

Før Opus spawnes: kald `project_read` på `claude/gsb-roadmap.md`. Findes filen endnu ikke (fx
allerførste kørsel), noteres det til Opus som "ingen eksisterende roadmap — dette er
førsteudkastet". Findes den, indsættes dens fulde, friske indhold som ekstra input i Trin 2 —
Opus skal opdatere/forny den, ikke skrive en ny fra bunden og ikke mindes om en ældre kopi fra
tidligere i samtalen.

## Trin 2 — én Opus-subagent laver selve syntesen

Når alle klynge-resuméer (inkl. Klynge G's resultat eller fravær, og den friske roadmap fra
Trin 1c) er samlet, spawnes ÉN subagent med `model: opus`. Prompten skal være selvstændig
(Opus-subagenten husker intet fra samtalen) og indeholde:

1. Kort projekt-kontekst (GSB Webapps — flere separate værktøjer til Gladsaxe Søborg
   Badmintonklub).
2. Instruks om selv at læse `claude/START-HER.md` frisk (kort fil — giver Opus de aktuelle
   regler/dokumentkort direkte, i stedet for endnu et resumé-lag).
3. Alle klynge-resuméerne fra Trin 1 og 1b, samt den eksisterende roadmap (eller besked om at der
   ingen er) fra Trin 1c — indsat direkte som tekst. Opus skal IKKE selv genlæse de store rå-filer
   eller selv forsøge at tilgå enhedsbroen.
4. Selve opgaven: **producér en opdateret, fuld version af roadmap-dokumentet** — en prioriteret,
   løbende liste over næste trin på tværs af alle initiativer (afvej værdi mod indsats, og mod
   projektets "intet bygges uden Chris' go-ahead"-kultur). Ved en eksisterende roadmap: bevar det
   der stadig er retvisende, markér det der er blevet forældet/afsluttet siden sidst, tilføj nyt.
   Derudover, som separate afsnit i outputtet (ikke selve roadmappen):
   - Redundans/modstrid på tværs af dokumenter.
   - Strukturelle forbedringer (opdeling, forældede afsnit, brudte krydsreferencer).
   - Er Klynge G tjekket denne gang: uoverensstemmelser mellem det dokumenterede og det faktiske
     Dropbox-indhold, hvis nogen.
   - Kun hvor der er en konkret, ikke-triviel pointe: edge cases/designspørgsmål ved specifikke
     idéer — ikke fuld gennemtænkning af hver idé for sig (det er den separate, dybere
     Opus-feature-gennemgang beskrevet i START-HER.md, kun for én idé ad gangen).
   - Flag eksplicit hvis noget peger på at `gsb_preview.html` eller `analyse.js` bør have sit eget
     code-review — uden selv at lave det i denne omgang.
5. **Hårde grænser (gentag eksplicit i prompten):** Ingen `project_write`/`project_delete`. Opus
   returnerer kun tekst — selve skrivningen til `claude/gsb-roadmap.md` foretages af den
   orkestrerende session i Trin 3, ikke af Opus-subagenten.

## Trin 3 — efter Opus svarer: skriv roadmap-filen efter de normale sikkerhedsregler

`claude/gsb-roadmap.md` er en almindelig projekt-doc og skal opdateres efter de samme regler som
enhver anden fuld genskrivning i `claude/START-HER.md` — ingen undtagelse fordi indholdet kommer
fra Opus:

1. Frisk `project_read` af `claude/gsb-roadmap.md` LIGE før skrivning (ikke genbrug af læsningen
   fra Trin 1c, hvis der er gået tid/andre kald imellem).
2. Er filen over ca. 1.500 ord: tag backup af det friske indhold først (Dropbox hvis enheden er
   forbundet, ellers `claude/_backups/gsb-roadmap_<ÅÅÅÅ-MM-DD>.md`), præcis som START-HER.md's
   regel D.
3. Skriv Opus' forslag til `claude/gsb-roadmap.md` — ingen placeholder-tekst, alt bevaret indhold
   skal stå fysisk i teksten.
4. Kør stop-betingelserne fra regel F (længde ikke uventet meget kortere, ingen placeholder-
   mønstre, forventede overskrifter stadig til stede). Fejler noget: STOP og flag det til Chris.
5. De øvrige afsnit fra Opus' svar (redundans, struktur, Dropbox-uoverensstemmelser,
   code-review-flag) præsenteres for Chris i selve samtalen — de er ikke en del af roadmap-filen,
   og intet af det implementeres uden en separat go-ahead-samtale bagefter.
