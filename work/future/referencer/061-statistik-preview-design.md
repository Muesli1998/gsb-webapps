# Preview-siden for `statistik/` — visuelt forslag (v3, 2026-09-19)

Kopieret ind i repoet som facit-reference for opgave 061–069 (Klubstatistik-siden). Udarbejdet i en
separat Claude-session (chrille1998@gmail.com's "GSB Webapps"-projekt på claude.ai), godkendt af
Chris. Denne fil er en KOPI til reference — den kanoniske, evt. videre redigerede udgave ligger i
det claude.ai-projekt, ikke her. Rediger denne kopi ikke som om den var kilden.

**Klikbar mockup (samme mappe):** `061-statistik-preview-mockup.html` — statisk HTML med
eksempeldata, i sitets rigtige farver/klasser.

---

**Status: udkast, mockup bygget, intet rettet i `apps/netlify-prod/`.** Skrevet efter direkte
læsning af repoet — `AGENTS.md`, `docs/statistik-plan.md`, `docs/BESLUTNINGER.md`,
`docs/planlagte-features-spec.md` (B3), `statistik/sql/schema-normalized.sql`,
`apps/netlify-prod/public/{gsb-nav.js, forside.html, analyse.html, stilling.html}`.

## 1. Hvad dette bygger på

- **Backend:** `statistik/`-projektets SQLite-database (2.818 holdkampe, 20.319 individuelle
  kategorier, 67.196 spillerrelationer, klubbredt: senior + U09–U19 + veteran). Test & Validation er
  lukket (2026-09-15). Dette er IKKE B3's oprindelige Google Sheets/`AlleResultater`-plan — den
  backend-beslutning er allerede taget (`docs/BESLUTNINGER.md`, 2026-09-15).
- **Frontend-designet der genbruges (B3, stadig gældende):** ny selvstændig top-level side i nav'en,
  ét samlet datasæt for hele klubben med et Alle/Ung/Sen/Vet-faneskifte som klient-side filter, skal
  ligne resten af sitet visuelt.
- **Statistik-katalog v2** (besluttet med Chris 2026-09-15, `docs/statistik-plan.md`): 10 stats.
  Alle er med i v1 af Preview.
- **Rækkefølge:** Preview bygges FØRST når Results-rapporten og "Skillen" er færdige.

## 2. Placering i nav'en

```
🏠 Forside   🏆 GSB Dream Team   🎾 Ungdomssparring   📈 Klubstatistik   ⚡ Kampsystem
```

- Nøgle/label: `klubstatistik` / `📈 Klubstatistik`.
- Ingen sider under selve nav-punktet. Ingen kode-gate.
- Forsidens `app-grid` får et femte kort, samme mønster som de tre eksisterende.

## 3. Sidens overordnede struktur — fane pr. statistik-type

Chris ønsker en fane-struktur, én fane pr. statistik-type, med detaljer nestet under den fane de
hører til (fx spillerprofilen under Spillere). Alle/Ung/Sen/Vet-filtret ligger fast øverst og
gælder tværs af alle faner.

Otte faner: Overblik, Hold, Spillere, Kategori, Hjemme/Ude, Modstanderhold, Sæson,
🏅 Klub-karriere.

## 4. Alle/Ung/Sen/Vet-faneskiftet + underfiltre

- Pills, single-select: `[ Alle ] [ Ungdom ] [ Senior ] [ Veteran ]`.
- Klient-side filter over ét hentet datasæt. `age_group_id`-gruppering:
  - Senior: 1
  - Ungdom: 2, 3, 4, 5, 6, 18 (U9=2, U11=3, U13=4, U15=5, U17=6, U17/U19=18 — jf.
    `statistik/agegroup-labels.json`)
  - Veteran: 9 (40+), 11 (50+), 12 (55+), 13 (60+), 17 (70+), plus evt. 16 (Motionist)
  - Alle: ingen filtrering
- **Underfiltre (tilføjet efter mockup-feedback):** når "Ungdom" er valgt, vises et sekundært
  årgangsfilter (U9–U17/U19). Når "Veteran" er valgt, vises et sekundært klassefilter
  (40+/50+/55+/60+/70+/Motionist).

## 5. Holdidentitet i UI'et

`docs/statistik-plan.md` (2026-09-16): "hold" må ALDRIG grupperes på `name_raw` alene.

- Senior/veteran: ét kort/tabelrække pr. `name_raw + age_group_id`.
- Ungdom: ét kort/tabelrække pr. `name_raw + age_group_id + holdtype + niveau/pointgrænse`.
  Undertekst viser holdtype/niveau for ungdom (fx "U15 · 4 spillere"). Et manglende niveau er ikke
  automatisk en fejl (nogle lokalunioner bruger navngivne serier uden bogstav, jf.
  `docs/statistik-plan.md`s note 2026-09-17) — vis "ukendt" ærligt.

## 6. Klub-karriere-oversigt — egen fane, plus i spiller-drilldown

- Egen fane (`🏅 Klub-karriere`), IKKE et altid-synligt card (ændret efter Chris' feedback på
  mockuppen).
- Samtidig en linje i spiller-profilen under Spillere-fanen: "X sæsoner, Y kampe totalt for
  klubben" — samme underliggende tal som Klub-karriere-fanen, to sammenhænge.

## 7. Spillerprofilen — udvidet efter Chris' feedback

Da Chris så mockuppen, bad han om markant mere end en tynd inline-udvidelse: "at kunne trykke på
spilleren og se en oversigt over kategorier spillet, hold spillet på, osv. — alle de ting fokuseret
på en enkelt spiller." Den udvidede spillerprofil (stadig en udvidende tabelrække, ikke en modal)
indeholder:

1. Header: navn + nuværende hold/gruppe.
2. KPI-strip: kampe, winrate, antal hold spillet på, antal sæsoner i klubben.
3. Kategorier spillet (winrate pr. single/double/mixed).
4. Hold spillet for (liste med periode + S-T-record pr. hold).
5. Board-tendens (kronologisk boardposition-sekvens, genbrugt fra `analyse.html`s validerede
   `runAnalyse`-algoritme).
6. Hyppigste modstandere (sejr/tab-facit, farvet).
7. Sæson for sæson (tabel) + klub-karriere-totalen.

## 8. Beslutninger på de åbne spørgsmål (2026-09-19)

1. Ikon/label: `📈 Klubstatistik` — besluttet.
2. Modstanderhold-tabellen: med i v1 — besluttet.
3. Spillergrænse: ingen hardkodet minimumsgrænse ved lancering — alle spillere vises som standard,
   med en justerbar "min. antal kampe"-kontrol bygget ind fra start.
4. Klub-karriere-placering: egen fane (revideret efter mockup-feedback), plus del af
   spillerprofilen.

## 9. Farver, typografi, komponenter — alt genbrugt, intet nyt

| Element | Kilde | Genbruges som |
|---|---|---|
| Header, `:root`-farvevariabler | `analyse.html`/`stilling.html` | Uændret |
| `.card` | alle sider | Sektionsopdeling pr. fane |
| Intern fanerække (8 faner) | `gsb-nav.js`s to-lags mønster | Otte statistik-faner |
| `.team-cards`/`.team-card` | `analyse.html` | Overblik-fanens hold-kort |
| `.bar-cell`/`.bar-track`/`.bar-fill`/`.pct` | `analyse.html` | Winrate i tabeller |
| `.season-pill`/`.checked` | `analyse.html` | Alle/Ung/Sen/Vet-filter + underfiltre |
| `tr.player-row` + udvidet detail-row | `analyse.html` (udbygget) | Spillerprofil |
| `.hof-list`/`.hof-season` | `stilling.html` | Klub-karriere-fanens liste |

Ingen nye ikoner/farvefamilier — kun 📈 (nav) og 🏅 (klub-karriere-fane).

## 10. Hvad dette forslag IKKE gør

- Ingen kode er skrevet eller ændret i `apps/netlify-prod/` — kun mockuppen (statisk, eksempeldata).
- Rører ikke Dream Teams `analyse.html`/Spillerpoint-flow.
- Tager ikke stilling til Results-rapportens indhold.
