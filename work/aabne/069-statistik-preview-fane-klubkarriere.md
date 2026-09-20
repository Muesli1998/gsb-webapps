# Opgave 069 — Klubstatistik: 🏅 Klub-karriere-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/069-statistik-preview-fane-klubkarriere`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne fane var i det tidligere design et
altid-synligt card, men Chris bad om at den i stedet bliver sin egen fane (den behøver ikke være
synlig hele tiden) — se `work/future/referencer/061-statistik-preview-design.md`, §6.

## Mål

En rangeret liste (samme visuelle familie som `stilling.html`s `.hof-list`/`.hof-season`) over
klubbens mest trofaste spillere: navn, antal kampe totalt, antal sæsoner — rangeret på antal kampe.

**Vigtigt:** dette er en langtidsopgørelse, IKKE filtreret af filterbarens sæson-valg (den kan
stadig respektere aldersgruppe-filteret, hvis det giver mening — afklar med Chris hvis det er
uklart, se "Ved tvivl"). Se mockuppens "🏅 Klub-karriere"-fane for det visuelle facit.

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

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
