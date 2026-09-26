# Opgave 100 — skriv en strukturguide (nye projekter, ny maskine)

**Trin:** Videreudvikling / Dokumentation

**Baggrund:** `AGENTS.md`s oprindelige "Næste skridt"-liste fra 13. september
2026-omlægningen nævnte en strukturguide der aldrig blev skrevet — bekræftet
2026-09-26 (ingen fil i `docs/` matcher). Chris vurderede samme dag at det er
"måske en meget god idé" nu hvor repoet har eksisteret et stykke tid og flere
delprojekter (Dream Team, Kampsystem, Statistik) er i gang.

## Mål

Skriv `docs/struktur-guide.md` (eller andet navn hvis noget mere rammende
findes — se Spørgsmål) der besvarer to konkrete spørgsmål, baseret på hvordan
repoet RENT FAKTISK ser ud i dag, ikke en idealiseret version:

1. **Hvor hører et nyt projekt/delprojekt hjemme?** Med udgangspunkt i
   `AGENTS.md`s eksisterende mappestruktur (`apps/`, `kampsystem/`,
   `statistik/`, `data/`, `tools/`, `work/`) — hvornår får noget sin egen
   topmappe (som `statistik/`) vs. hvornår hører det til i en eksisterende
   mappe? Brug de eksisterende delprojekter som konkrete eksempler på
   beslutninger der allerede er taget, fremfor at opfinde nye regler.
2. **Hvordan sættes en ny maskine op?** En konkret, afprøvelig tjekliste:
   `git clone`, `config.local.json` (kopieret fra `config.example.json` og
   udfyldt), node/python-installation, hvordan man verificerer at det virker
   (fx hvilket script man kan køre for at bekræfte opsætningen).

## Afgrænsning

**Må røres:** ny fil `docs/struktur-guide.md`, denne opgaves kortfil. Evt. en
henvisning til den nye fil tilføjet i `AGENTS.md` ét sted (fx mappestruktur-
afsnittet), som en enkelt linje — ikke en omskrivning af `AGENTS.md`.

**Må ikke røres:** ingen andre dokumenter omskrives. Ingen kode. Ingen
databaser. Denne opgave dokumenterer den EKSISTERENDE struktur — den beslutter
ikke nye strukturregler undervejs. Er noget uklart eller udokumenteret i dag
(fx en beslutning der aldrig blev skrevet ned), så skriv det som et åbent
spørgsmål i stedet for at opfinde et svar.

## Kontekst

- `AGENTS.md`, "Mappestruktur"-afsnittet og "Næste skridt"-punkt 5 (nu
  omskrevet til status, se commit 2026-09-26).
- `config.example.json` — formatet en ny maskines `config.local.json` skal
  følge.
- De tre eksisterende delprojekter (`apps/netlify-prod/`, `kampsystem/`,
  `statistik/`) som konkrete eksempler.

## Kontrol

**Målet — hvad skal blive sandt:**

```
docs/struktur-guide.md findes og besvarer begge spørgsmål fra Mål-afsnittet
  med konkrete, eksisterende eksempler — ikke abstrakte principper alene.
```

**Værnet — hvad må ikke ændre sig:**

```
git diff --stat   viser KUN docs/struktur-guide.md, maks én linje i AGENTS.md,
  og kortfilen.
Ingen eksisterende dokumenter omskrevet.
```

**Skøn** (kan ikke måles):

- Om guiden er tilpas konkret uden at blive en gentagelse af hele AGENTS.md —
  Chris vurderer selv efter læsning.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** på
regler der ikke allerede fremgår af hvordan repoet faktisk er organiseret.

## Gren

`arbejde/100-strukturguide`, fra `main`.

---

## Spørgsmål

Ingen åbne spørgsmål. Den gamle `tools/setup-git-gsb.ps1` indeholder historiske Dropbox-repoer og bruges derfor ikke som aktuel opsætningsvej i guiden.

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
docs/struktur-guide.md: findes
Guideafsnit: 3 (placering, maskinopsætning, daglig arbejdsgang)
Ændrede filer: docs/struktur-guide.md og dette opgavekort
AGENTS.md: 0 ændrede linjer
Øvrige eksisterende dokumenter: 0 ændrede filer
```

**Hvad blev gjort:**

- Skrev en guide med eksisterende mapper som konkrete eksempler og et beslutningskriterium for selvstændige delprojekter.
- Tilføjede en afprøvelig maskintjekliste for klon, lokal konfiguration, Node/Python, statistikafhængigheder og syntakstjek.

**Hvad blev fravalgt og hvorfor:**

- AGENTS.md er ikke ændret; guiden kan findes direkte under `docs/` uden at udvide den centrale instruks.
- Det gamle setup-script beskrives ikke som aktiv metode, fordi det indeholder historiske stier og repoer.

**Commits:**
