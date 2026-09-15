# Opgave 039 — overlap mellem 035 og tidligere klassifikationer

Kontrol af de 162 ID'er fra opgave 035 mod de bevarede artefakter fra 013
og 006. Opgave 013's JSON/Markdown gemmer kun 20 sæsonstratificerede
stikprøverækker, selv om oversigten angiver 257 payloads i alt.

| Sammenligning | Fund |
|---|---:|
| 035-rækker sammenlignet | 162 |
| Match i 013's bevarede 20-rækkers stikprøve | 5 |
| Match i 006's bevarede 458-rækkers klassifikation | 0 |
| Komplet overlap mod hele 013-populationen (257) | Kan ikke afgøres: fuld ID-liste er ikke bevaret |

De fem dokumenterede 013-overlap er 2286, 96231, 2365, 2396 og 2509.
Alle fem er blandt 035's ungdomsrækker og er de samme ID'er, som opgave
037 undersøgte. Der kan ikke udledes et sikkert svar for de resterende 157
af 035's rækker eller mod de oprindelige 58 uden den fulde 013-kandidatliste.

Derfor er spørgsmålet om 035's 162 er en delmængde af 013's 257+58
**uafklaret ud fra de versionsstyrede data**. Ingen plan- eller
beslutningstekst er omskrevet på dette grundlag.

## Frisk aldersfri SQL-optælling

En ny optælling med samme `NOT EXISTS individual_matches`-kriterium uden
aldersfilter fandt **451** holdkampe uden individuelle rækker:

| Gruppe | Antal |
|---|---:|
| U09–U15 (`age_group_id` 2–5) | 205 |
| Øvrige aldersgrupper | 246 |
| **I alt** | **451** |

Af de 205 ungdomsrækker er **162** `browser_verified`-rækkerne fra opgave
035; de resterende 43 er 39 `browser_verified_no_result` og 4 `api_error`.
Det viser, at 035's 162 er en præcis delmængde af den nuværende, samlede
451-optælling, men rekonstruerer ikke den tabte historiske 013-liste.
