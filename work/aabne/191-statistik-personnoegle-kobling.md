# Opgave 191 — personnøgle: kobl hvert spiller-ID i kampdata til én person

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10 ("personnøgler SKAL fikses").
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** 164 (færdig) · **Netværk:** ingen

**Trin:** Fundament for alt, der tæller spillere: spillertal, hot streak, rekordbog, bestyrelsesoverblik (187), formindikator (170) og ranglistekobling (173). Kortet bygger kun en koblingstabel som filer; det ændrer ingen database.

## Gren
`arbejde/191-personnoegle`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- `gsb-statistik-normalized.db` har et eget `players.player_id`, som er bygget ud fra navne (`name:...`-nøgler). Kort 164 målte: 0 numeriske profil-ID'er, 5.043 `name:`-nøgler, 63 entydige navnepar med forskellige ID'er, 1.865 flertydige fælles navne. Et `player_id` er derfor ikke en person: navnebrødre kan være lagt sammen, og én person kan ligge som flere ID'er.
- 164 har en kolonne `Personnøgle` i `statistik/results/164-stamdata.md/.csv/.json` (fx `id:84737` eller `name:thor pedersen`). Den dækker stamdata, ikke koblingen fra kampdata (`individual_match_players.player_id`) til personen.
- Rangliste-ID (ranglistedatabasen) og national-ID (`national-spillere.db`) er samme tal for de personer, hvor begge findes (164).
- 7 af trupnavnene på 44 har ingen valgt identitet: Christian Staal, Jonathan W. Hansen, Lene Sørensen, Line Nielsen, Sebastian Almeida Møller, Thor Pedersen, Yiting Chen. Linda Bækgaard har et ID, men er markeret uafklaret. Christoffer vil gennemgå dem manuelt, når koblingen er lavet.
- 289 forskellige spiller-ID'er står på GSB-siden i 2025/26 (kort 177 og 187). Antallet er ikke et personantal.
- Fødselsår, alder og køn må ikke gættes. "ukendt" er et gyldigt svar.

## Mål
Lav en koblingstabel fra hvert `players.player_id`, der optræder i kampdata for GSB, til en personnøgle, med klasse og evidens.

1. **Omfang.** Først alle spiller-ID'er på GSB-siden i alle sæsoner i normalized DB (side bestemt som i kort 187); derefter, hvis tiden rækker, alle øvrige ID'er. Rapportér begge tal.
2. **Evidens, der må bruges** (brug kun gemte filer og de fem databaser read-only): navn og aliaser (164), klub på kampsiden, sæson og aldersgruppe, ranglistedatabasen og `national-spillere.db` (ID, klub, køn), og de gemte eventtabeller fra 154/158/158b. Spiller-ID'er på hver side af samme holdkamp, i samme kamp eller samme runde kan bruges til at afvise, at to ID'er er samme person (én person kan ikke stå på to pladser i samme kampslutning).
3. **Klasser** pr. normalized `player_id`:
   - `sikker`: præcis ét kandidat-ID, og mindst to uafhængige evidenser (fx navn plus klub, plus ranglisteoptræden i samme sæson).
   - `sandsynlig`: ét kandidat-ID, men kun én evidens eller en mindre afvigelse (stavning).
   - `uafklaret`: flere kandidater eller ingen. Skriv alle kandidater med evidens, og vælg ingen.
   - `navnebroedre`: evidens for, at ét normalized ID dækker flere personer (fx samme navn på to forskellige køn, to klubber samme dag, eller to ID'er i samme kamp). Skriv dem som separate personer, hvis evidensen kan adskille dem; ellers `uafklaret`.
   - `samme_person`: flere normalized ID'er, der med evidens er samme person; giv dem samme personnøgle.
4. **Truppen.** Alle 44 trupnavne skal have en klasse. For de 7 ukendte: vis kandidater, ID'er, klubber, sæsoner og aldersgrupper i en tabel Christoffer kan afgøre manuelt. Vælg ikke for ham.
5. **Konflikttjek.** En personnøgle må ikke dække to normalized ID'er, der står på hver sin side eller på to pladser i samme kamp. Rapportér antal konflikter (mål: 0) og list dem.
6. **Forslag til brug.** Skriv i rapporten, hvordan koblingen bør bruges af senere kort (en mappingtabel i normalized DB eller en fil?). Foreslå kun; ændr ingen database.

## Afgrænsning
- **Må røres:** nye filer: `statistik/scripts/191-personnoegle.mjs`, `statistik/results/191-personnoegle.md`, `statistik/results/191-personnoegle.json`, `statistik/results/191-personnoegle-kobling.csv`, `statistik/results/191-personnoegle-uafklaret.csv`; samt dette korts Spørgsmål og Resultat.
- **Må ikke røres:** alle databaser (åbnes read-only: `mode=ro` og `PRAGMA query_only=ON`), 164-filerne (kun læsning), `statistik/HASHES.txt`, `apps/netlify-prod/`, `docs/BESLUTNINGER.md`, rodens `AGENTS.md`.
- Ingen netværkskald. Ingen nye pakker.

## Output
- `statistik/scripts/191-personnoegle.mjs`
- `statistik/results/191-personnoegle.md` (tal pr. klasse, konflikter, truppetabel, forslag til brug)
- `statistik/results/191-personnoegle.json`
- `statistik/results/191-personnoegle-kobling.csv` (en række pr. normalized `player_id`: id, navn, personnøgle, klasse, evidens, kandidat-ID'er)
- `statistik/results/191-personnoegle-uafklaret.csv` (kun `uafklaret` og `navnebroedre`, til manuel gennemgang)

## Kontrol
- **Målet:** hvert GSB-spiller-ID i 2025/26 (289) står præcis én gang i koblingen. Antal pr. klasse står i rapporten. Alle 44 trupnavne har en klasse. Konflikttjekket giver 0 konflikter, eller hver konflikt er listet.
- **Værnet:** `node tools/tjek/db-hashes.mjs` afslutter med kode 0 (fem "ja"). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre. Nul netværkskald (skriv tallet 0 i rapporten).
- **Skøn:** (vurdering) hvor stor en andel af GSB-kampene der kan knyttes til en `sikker` eller `sandsynlig` person, og om den er stor nok til at spillertal kan vises uden forbehold. Stikprøve: vis 10 tilfældige `sikker`-koblinger og 10 `uafklaret` med evidens.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Gæt ikke. Er to ID'er muligvis samme person, så vælg `uafklaret` og skriv kandidaterne. "ukendt" er et gyldigt svar. Skriv i `## Spørgsmål`.

## Spørgsmål
- Ukendt: De navnebaserede kandidat-ID’er i 164 er ikke godkendt som personkoblinger. Christoffer skal afgøre kandidaterne i rapportens trupoversigt, især de 7 nævnte navne og Linda Bækgaard. Ingen er valgt her.

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
- Koblingstabellen indeholder 7.599 normalized player-ID’er: 677 på GSB-siden i alle sæsoner, heraf 289 i 2025/26, samt 6.910 øvrige ID’er. For 2025/26 er 262 sandsynlige og 27 uafklarede; for alle GSB-sæsoner er 617 sandsynlige og 60 uafklarede. Ingen sikre koblinger, samme_person eller navnebroedre kunne bevises. På tværs af alle kampdata: 617 sandsynlige og 6.982 uafklarede.
- Alle 44 trupnavne har en klasse; 15 står uafklaret, herunder de 7 navne uden valgt identitet og Linda. Kandidat-ID’er og kampkontekst står i rapporten. 0 personnøglekonflikter. Netværkskald: 0.
- Vurdering: 88,36 % af alle GSB-optrædener og 90,19 % i 2025/26 har en sandsynlig kandidat; 0 % er sikre. Kandidaterne er ikke godkendte personidentiteter, så datagrundlaget rækker ikke til spillertal uden forbehold. Stikprøve: 0 sikre tilgængelige; 10 deterministisk udvalgte uafklarede kandidater med evidens står i rapporten.
- Kontrol: 5/5 databasehashes matcher; `git diff --check` uden fejl. Ingen databaser ændret. Forslag: behold filen som review-kilde; indlæs først godkendte koblinger i en mappingtabel.
