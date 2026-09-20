# Opgave 067 — Klubstatistik: Modstanderhold-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/067-statistik-preview-fane-modstanderhold`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Chris ville have denne med i v1 (ikke
skubbet til en senere iteration), selvom den kræver flere JOIN'er end de øvrige faner.

## Mål

En sorterbar tabel: Modstanderhold | Kampe | Winrate mod dem — for hvilke hold klubben typisk
vinder/taber mod, inden for den valgte filtrering. Se mockuppens "Modstanderhold"-fane for det
visuelle facit.

## Kontekst

Modstanderholdets navn står i `team_matches.home_name_raw`/`away_name_raw` (den side der IKKE er
GSB-holdet). Modstanderhold har ikke samme `age_group_id`/holdidentitets-behov som GSB's egne hold
(de er ikke i `teams`-tabellen på samme måde) — brug det rå modstandernavn som det står, men
dokumentér i resultatnoten hvordan ens/lignende modstandernavne (fx samme klub, forskellige
holdnumre over tid) håndteres, hvis det er relevant for den data du ser.

## Afgrænsning

**Må røres:** kun `.pane` for Modstanderhold. **Må ikke røres:** øvrige faner, andre apps,
`statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** tabellen sorterer korrekt på kampe og på winrate (test og dokumentér faktiske
før/efter-rækkefølger).

**Værnet:** ingen ændring af øvrige faners kode.

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

Implementeret i `klubstatistik-preview/` med rå modstandernavne fra den side af
`team_matches` der ikke matcher GSB-holdets rå navn. Tabellen kan sorteres på
Modstanderhold, Kampe og Winrate mod dem. Filtre og sortering arbejder på det
allerede hentede datasæt; browserkontrollen registrerede 1 API-kald.

Browserkontrol på det valgte U9-udsnit:

- 39 modstanderhold blev vist.
- Før sortering: `Badminton Esbjerg 1 — 2 kampe — 50%`, `Badminton i indre By 1 — 1 — 0%`, `BC37 Amager 1 — 6 — 50%`.
- Efter sortering på Kampe: `Tranbjerg AIA 1 — 1 — 0%`, `Vinding SF 2 — 1 — 0%`, `Tarup-Paarup 1 — 1 — 0%`.
- Efter sortering på Winrate: `Gentofte 2 — 2 — 0%`, `Valby BC 1 — 3 — 0%`, `Skovshoved 3 — 3 — 0%`.

Read-only datakontrol på hele databasen: 2.818 holdkampe; 2.805 har en
entydig eksakt GSB-side og 2.678 af disse har et parsebart resultat. 13 rækker
har uafklaret hjemme/ude-side, og 127 af de entydige rækker har ikke et
numerisk resultat; de vises derfor ikke i modstandertabellen i stedet for at
blive klassificeret ved gæt. De øvrige faner bestod den eksisterende
regressionstest, og `apps/netlify-prod/`, `kampsystem/` og databasen blev ikke
ændret.
