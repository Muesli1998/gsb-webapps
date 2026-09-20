# Opgave 069 — Klubstatistik: 🏅 Klub-karriere-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/069-statistik-preview-fane-klubkarriere`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne fane var i det tidligere design et
altid-synligt card, men Chris bad om at den i stedet bliver sin egen fane (den behøver ikke være
synlig hele tiden) — se `work/future/referencer/061-statistik-preview-design.md`, §6.

## Mål

En sorterbar tabel med kolonnerne `Spiller | Ungdom | Senior | Veteran | Total`, hvor
de tre alderskolonner summerer til Total. Tabellen rangeres som standard efter Total
faldende.

**Vigtigt:** dette er en langtidsopgørelse, IKKE filtreret af filterbarens sæson-valg (den kan
aldersgruppe-filteret gælder på tværs af fanerne som beskrevet i designreferencens afsnit 4;
sæson-filteret ignoreres. Se mockuppens "🏅 Klub-karriere"-fane for det visuelle facit.

Denne fanes tal skal stemme med den klub-karriere-linje der vises i den enkelte spillers profil i
opgave 064 ("X sæsoner, Y kampe totalt for klubben") — samme beregning, to steder.

## Kontekst

Kræver en aggregering over ALLE sæsoner pr. spiller (kampe totalt, distinkte sæsoner) — se
`players`/`individual_match_players`/`team_matches` i `statistik/sql/schema-normalized.sql`. Del
beregningen med opgave 064's spillerprofil-kode i stedet for at implementere den to gange
uafhængigt af hinanden — dokumentér i resultatnoten hvordan de to opgaver deler denne logik (fx et
fælles hjælpemodul), eller flag det som en kendt duplikering hvis 064 endnu ikke er løst når denne
opgave køres.

## Afgrænsning

**Må røres:** kun `.pane` for Klub-karriere. **Må ikke røres:** øvrige faner, andre apps,
`statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** top 5-listens kamptal er verificeret mod en uafhængig optælling for mindst 2 af de 5
spillere (dokumentér de faktiske tal i resultatnoten).

**Værnet:** ingen ændring af øvrige faners kode. Hvis opgave 064 allerede er løst: dens
spillerprofil-karriere-linje viser stadig samme tal som denne fane efter denne opgave (stikprøve
mindst 1 spiller).

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor — herunder om aldersgruppe-filteret skal gælde for denne
fane (fx: skal "Ungdom" valgt vise klubbens mest trofaste UNGDOMSSPILLERE, eller er
Klub-karriere-fanen bevidst uafhængig af hele filterbaren, kun sæson-uafhængig). Gæt ikke.

### Spørgsmål

## Resultatnote

- Implementeret som en sorterbar Karriere-tabel med `Spiller | Ungdom |
  Senior | Veteran | Total`. Aldersfilteret respekteres på tværs af fanerne;
  sæsonfilteret ignoreres, så opgørelsen er på tværs af alle sæsoner.
- Beregningen deles med opgave 064's `profileStats`: samme `matchIds`-sæt
  bruges til Total og samme aldersgruppering bruges til de tre kolonner.
  Profilens linje og Karriere-tabellen bruger derfor samme underliggende tal.
- Uafhængig SQL-kontrol af top 5 gav: Kenneth Hasselby 0/326/100 = 426,
  Morten Aarøe 0/314/68 = 382, Leif Hansen 0/0/378 = 378, Noomi Mortensen
  0/4/360 = 364 og Svend Videbæk 0/6/343 = 349 (Ungdom/Senior/Veteran/Total).
- Browserkontrollen viste de samme fem rækker. For de tre første stemte hver
  af de tre alderskolonner med Total, og Kenneth Hasselbys Total 426 stemte
  med spillerprofilens `426 kampe totalt for klubben`.
- Kontroller: `python -m py_compile klubstatistik-preview/server.py`,
  `node --check klubstatistik-preview/klubstatistik.js` og den udvidede
  `python test_preview.py` bestod. Testen beholdt ét API-kald.
