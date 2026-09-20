# Opgave 066 — Klubstatistik: Hjemme/Ude-fanen

**Trin:** Preview — se opgave 061's Trin-note. Ligger i `work/future/` med vilje, ikke klar til at
køres før Chris eksplicit siger det, OG før opgave 061 er løst.

**Gren:** `arbejde/066-statistik-preview-fane-hjemme-ude`, jf. `AGENTS.md`.

**Baggrund:** Del af Klubstatistik-siden (se opgave 061). Denne opgave bygger kun "Hjemme/Ude"-
fanens indhold: er klubben stærkere på hjemmebane, for den valgte filtrering.

## Mål

To store pct-tal side om side (samme stil som `.pct-big`/`.team-card` i `analyse.html`), med
S-T-record under hver:

- Hjemme: winrate + antal kampe (sejre/kampe)
- Ude: winrate + antal kampe (sejre/kampe)

Se mockuppens "Hjemme/Ude"-fane for det visuelle facit.

## Kontekst

Hjemme/ude afgøres af hvilken side i `team_matches` GSB-holdet stod på (`home_name_raw` vs.
`away_name_raw`, sammenholdt med `gsb_team_id`/`teams.name_raw`) — se
`statistik/sql/schema-normalized.sql`. Dokumentér i resultatnoten hvordan hjemme/ude er afgjort for
en kamp, hvis det ikke er umiddelbart entydigt fra disse felter (gæt ikke, jf.
`statistik/AGENTS.md`).

## Afgrænsning

**Må røres:** kun `.pane` for Hjemme/Ude. **Må ikke røres:** øvrige faner, andre apps,
`statistik/data/gsb-statistik-normalized.db` (læses kun).

## Kontrol

**Målet:** hjemme-kampe + ude-kampe summer til det samlede antal holdkampe for den valgte
filtrering (verificér og skriv begge tal i resultatnoten).

**Værnet:** ingen ændring af øvrige faners kode.

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor.

### Spørgsmål

## Resultatnote

- **Genudtræk:** De fire BadmintonPlayer-sider blev hentet i den dokumenterede
  in-app-browser/CUA-rute. Alle fire passerede render-gaten (forventet kamp-ID
  og en synlig `Resultat`-linje). Resultater: 506407 GSB hjemme mod Farum 1,
  2-3/1-2; 506413 Kolding BK 1 hjemme mod GSB, 2-3/1-2; 505217 GSB hjemme
  mod Hillerød 1, 2-3/1-2; 505219 GSB hjemme mod KBK Kbh. 1, 5-0/3-0.
  Råpayload-evidens ligger i Dropbox `statistik/results/browser-fallback-retry-066/`.
- **Database:** SHA-256 før skrivning:
  `8630ec05fe769cd261dda2e8cac91cfb2e1fd5090ee8b287ce88a1da971ecd64`.
  Backup: `statistik/results/066-team-matches-before-retry.sql`.
  Kun team_match_id 1, 2, 11 og 12 blev ændret; nye raw_payload_id'er er
  henholdsvis 2875, 2876, 2877 og 2878. Felterne home/away/result/status/
  source_status/raw_payload_id blev opdateret; individuelle rækker blev ikke
  importeret. Databasen stod allerede på den kanoniske Dropbox-sti efter
  skrivningen.
- **Hjemme/Ude:** `renderHomeAway` bruger 076's `isGsbTeamName`-regel og
  ekskluderer kun fremtidige rækker uden entydig side med en synlig note og
  eksterne kamp-ID'er. Efter genudtrækket var der 0 udeladte rækker. For Alle:
  hjemme 1.442 + ude 1.375 = 2.817 holdkampe; SQL-kontrollen gav samme tal.
  Hjemme-recorden var 720S-658T, ude-recorden 558S-749T; øvrige resultater
  uden numerisk score tælles som kampe men ikke som sejr/tab.
- **Kontroller:** `python -m py_compile klubstatistik-preview/server.py`,
  `node --check klubstatistik-preview/klubstatistik.js` og den udvidede
  `python test_preview.py` bestod. Testen rapporterede
  `homeAwayCounts=[1442,1375]`, 7 kategori-rækker, 1 API-kald og 0 udeladte
  hjemme/ude-rækker. Databasen havde efter skrivning 2.817 team_matches,
  0 FK-fejl og 0 dubletter.
- **Statistik-kontroller:** De faste kontroller mod den midlertidige kopi af
  Dropbox-databasen gav `fk=[]`, `dupes=[]`, 0 manglende sider, 2 manglende
  resultater, 751 standings-rækker og 47 corona-rækker. `audit-individual-
  coverage-gaps.mjs` kunne ikke køre, fordi den forventede genererede fil
  `results/browser-individual-parse-report.json` ikke findes på denne maskine;
  øvrige kontroller gennemførte. Kopien blev slettet efter kontrollen.
