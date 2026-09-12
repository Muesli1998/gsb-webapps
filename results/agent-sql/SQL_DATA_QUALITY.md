# SQL og datakvalitet

Kilde: results/gsb-historical-2025-2000.jsonl (rå discovery/kampdata). Analysen er reproducerbar via agents/sql/quality-analysis.mjs.

## Dækning
- Rækker/sæsoner: 26; sæsoninterval 2000–2025.
- Flade poster: 472 team-observationer, 462 grupper, 2818 fight-observationer.
- Status: {"error":10,"ok":16}.
- Aldersgrupper og ligaer er optalt i JSON-resultatet.

## Kvalitetsfund
- Match-ID-dubletter på tværs af grupper: 0 nøgle(r); se JSON for alle eksempler. Dette er en potentiel join-/dobbeltregistreringsrisiko.
- Team-dubletter efter (season,name,ageGroupId,leagueGroupId): 0.
- Gruppe-dubletter efter (season,leagueGroupId): 0.
- Manglende felter og datoforskelle (roundDate vs gameTime-dato) er kvantificeret i JSON. Manglende værdier skal behandles som ukendte, ikke udfyldes ved gæt.

## Skemaforslag
1. Bevar stabile identiteter: seasons, league_groups(league_group_id, season, age_group_id, league, team_name), matches(match_id, season, league_group_id, round, round_date, game_time, home_name, guest_name).
2. Opret unik constraint på (season,match_id) hvis kilden kan genbruge IDs mellem sæsoner; ellers dokumentér global unikhed. Opret separat bridge match_group(match_id, season, league_group_id, team_name).
3. Brug nullable sourcefelter og ingest_status/error_message/raw_json/source_fetched_at, så fejlposter ikke forsvinder.
4. Normalisér age_group_id og league_group_id til INTEGER ved indlæsning, men behold råværdi; gem både planlagt runde-dato og faktisk game-time.
5. Idempotent indlæsning bør ske via upsert på kildeidentitet og checksum af raw payload; undgå INSERT OR IGNORE som skjuler ændringer.

Se quality-analysis.json og season-coverage.csv for rå query-lignende resultater. Ingen ændring er foretaget i fællesdatabasen.