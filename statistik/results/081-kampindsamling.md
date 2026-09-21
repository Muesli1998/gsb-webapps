# Opgave 081 — fuld kamp-for-kamp-indsamling

Kørsel afsluttet 2026-09-21 på separat `statistik/data/liga-landskab.db`. Rå API-svar ligger som batchede JSONL-filer under `statistik/data/liga-landskab-raw/`; SQLite gemmer SHA-256 og filreference. `gsb-statistik-normalized.db` blev ikke skrevet.

## Resultat

| Fase/måling | Antal | Status |
|---|---:|---|
| Pulje-matchlistekald (subPage=4) | 18.546 | 18.543 ok, 3 empty, 0 error |
| Pulje-kamp-tilknytninger | 310.137 | svarer til tidligere optælling |
| Globalt deduplikerede kamp-ID’er | 203.012 | samme kamp kan ligge i flere puljer |
| Kampdetailkald (subPage=5) | 203.012 | 203.011 ok, 1 empty, 0 error |
| Kategorier gemt | 1.300.474 | `match_categories` |
| Sæt-score-rækker gemt | 2.636.258 | `match_games` |

De 3 tomme matchlister var `2013:4:2780`, `2013:21:2780` og `2022:1:15442`. Den ene tomme kampdetalje var kamp `433782` (sæson 2022, ageGroupID 9, pulje 15023). Alle requests er gemt i `league_match_requests`.

Det tidligere prisestimat på 310.137 detailkald talte pulje-tilknytninger. Den faktiske kørsel deduplikerede på `external_match_id` og brugte derfor 203.012 detailkald; forskellen er krydspulje-forekomster, som er bevaret i `league_match_groups`.

## Rålagring og integritetskontrol

Rålagringen består af 869 batchede JSONL-filer på 3.782.810.830 bytes. SHA-256 for den normaliserede database efter kørsel er `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; indsamlingsscriptet skriver kun til den separate liga-database.
