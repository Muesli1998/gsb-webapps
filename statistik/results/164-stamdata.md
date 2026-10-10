# 164 — stamdata for GSB-spillere

Personposter: **796**; fysisk personantal: **ukendt**. Posterne er review-grundlag med kilde-IDer, ikke en færdig identitetsdatabase.

## Metode og tidligere arbejde

- **scope:** Union af historisk GSB-side i normalized/national, GSB-ranglisteklub og Dream Team-facit. Modstandere uden GSB-evidens er ikke stamdataposter. Globale kildekonflikter og ID-sammenligninger vises særskilt.
- **person_definition:** Én post pr. numerisk profilanker eller uafklaret navnegruppe. Entydige navnekandidater vises samlet til review, men hver sådan kobling forbliver uafklaret; postantal er ikke bevist fysisk personantal. Eksplicit (Ukendt spiller)-placeholder holdes uden for personoptællingen og gemmes separat.
- **normalized_snapshot:** Den aktuelle normalized.players-identifikatorfordeling står i summary.normalized_identity. Kort 016 beskriver et tidligere snapshot og må ikke bruges som dagens ID-dækning.
- **class_definition:** Personklasse er den stærkeste eksisterende kobling: entydig på ID > navn+klub > kun navn > ingen. Hver kobling har egen klasse og uafklaret-flag; en sikker ID-kobling godkender ikke personens øvrige navnekandidater.
- **gender_definition:** Rangliste param M/K, national gender_status og trup-køn; modstridende værdier vælges aldrig. Køn fra navnekandidater er ikke en bekræftet overførsel.
- **birth_year:** ukendt. Ingen kilde har et eksplicit fødselsår. member_number bevares råt; ingen dato/århundrede udledes.
- **national_side:** player_matches.team_side er tomt. Brug kun eksisterende player_match_extras med parse_status=ok og kampoverskrift; 136-parseren er ikke kørt eller ændret.
- **conflicts:** Alle observerede konflikter i ranking_points, national.players, normalized.players og player_matches for GSB-holdoverskrifter. Uobserverede historiske navne og skjulte fysiske navnebrødre: ukendt.

- **016:** Rapportens historiske optælling genbruges som felttælling. Scriptet tæller COUNT(external_player_id)/IS NOT NULL uden at udelukke name:-nøgler; det er derfor ikke i sig selv bevis for numeriske spillerprofil-IDer. Den aktuelle fordeling af rå identifikatorer står i summary.normalized_identity. Årsagen til den tidligere påstand om profil-ID-dækning er ukendt. Ingen ny relationsdækningsaudit køres. Kilde: `statistik/results/016-spiller-id-audit.md; statistik/scripts/audit-player-id-coverage.mjs`.
- **032:** Import kan sammenlægge identiske navne. Forskellige rækker samme dato er ikke kollisionsbevis; nul navnedubletter beviser intet om fysiske personer. Kilde: `work/loeste/032-spiller-navnematch-risiko.md; statistik/results/032-spiller-navnematch-risiko.md, runde 3`.
- **036:** Rapporten mangler i checkout; genfundet i historikken med læsende git show. Den tidligere fulde audit fandt ingen samme-dato/samme-række-indikator; navnesplittelse kan stadig ikke afgøres. Resultatet genbruges, auditten køres ikke igen. Kilde: `work/loeste/036-ungdom-navnematch-fuld-audit.md; git show 07d9a4c65dc204a67416583471b08aa1a3e8240d:statistik/results/036-ungdom-navnematch-fuld-audit.json`.
- **116:** national.external_player_id er det numeriske spillerprofilfragment; ældre sider kan mangle links. Kilde: `work/loeste/116-national-spiller-id-mekanisme.md; statistik/results/116-national-spiller-id-mekanisme.md`.

## Koblingsklasser

| Klasse | Personposter | Koblinger |
|---|---:|---:|
| entydig på ID | 399 | 399 |
| navn+klub | 269 | 632 |
| kun navn | 18 | 22 |
| ingen | 110 | 66 |

Personklassen er den stærkeste kobling; alle navnebaserede koblinger er fortsat uafklarede. Filerne har separate kandidatfelter og evidens pr. kobling.

## Rangliste-playerid og national-ID

Resultat: **delvist** for det målte materiale. 19771/19834 uafhængigt navneparrede entydige kildeposter har samme numeriske ID; 63 har forskellige IDer. 1865 fælles navne er flertydige og kan ikke parres sikkert.

Numerisk rangliste-playerid sammenlignes med national.external_player_id (spillerprofilens URL-fragment). BadmintonID/member_number er et andet felt og en anden identifikator.

Entydighed i hver kildes navneliste beviser ikke samme fysiske person. Navnepar med forskellige IDer kan være navnebrødre, dublerede profiler eller navneændringer. Dette afgøres ikke her. Delvist betyder delvis bekræftelse af koblingerne, ikke et bevis for to forskellige numeriske ID-namespaces.

| Rangliste-playerid | National-ID | Ranglistenavn | Nationalnavn | BadmintonID/member_number |
|---|---|---|---|---|
| 329159 | 329159 | Josefine Bille-Ahmt | Josefine Bille-Ahmt | 130504‑01 |
| 55454 | 55454 | Michelle Christensen | Michelle Christensen | 930609‑21 |
| 10003 | 10003 | Christian Lillelund | Christian Lillelund | 730821‑01 |

Alle par, ID-intersektioner, afvigere og flertydige navne står i JSON. ID-intersektion er en kontrol, ikke et uafhængigt identitetsbevis. Member_number er bevaret råt, også bindestregstypen.

## Vores side

GSB-side kan udledes for **267/271 holdkampe (98.524 %)** og **1582/1582 individuelle rækker (100 %)**.

| Årsag | Holdkampe | Individuelle rækker |
|---|---:|---:|
| tomme hjemme-/udehold; API-fejl eller suspenderet kamp | 4 | 0 |
| GSB-hold-ID → klub-ID + sæson/pulje + eksakt holdnavn → hjemme/ude | 267 | 1582 |

Metoden slår gsb_team_id op i teams, kræver club_id=1093 samt samme sæson og pulje, og matcher derefter holdets eksakte navn mod home_name_raw/away_name_raw. individual_match_players.side giver spillersiden. Der bruges ingen spillernavneliste.

ukendt: schemaet har ikke home_team_id/away_team_id; løsningen bruger hold-ID/klub-ID og eksakt holdnavn, aldrig spillernavne

Målingen gælder normalized DB. Dream Team Resultater-arket og hent-resultater.js er ikke målt eller ændret.

Uafklarede holdkampe:

- 506407: tomme hjemme-/udehold; API-fejl eller suspenderet kamp; status=api_error; hjemme="", ude="".
- 506413: tomme hjemme-/udehold; API-fejl eller suspenderet kamp; status=api_error; hjemme="", ude="".
- 505217: tomme hjemme-/udehold; API-fejl eller suspenderet kamp; status=api_error; hjemme="", ude="".
- 505219: tomme hjemme-/udehold; API-fejl eller suspenderet kamp; status=api_error; hjemme="", ude="".

## Navnekonflikter og manglende stamdata

Konfliktlisten har 3997 rækker og ligger i `164-navnekonflikter.csv`. Numeriske IDer med samme navn er uafklarede: de kan være navnebrødre eller dublerede profiler. Samme ID med flere navne og dokumenterede aliaser listes separat.

Modstridende køn: 0; dokumenterede fødselsår: 0. Begge kønsværdier bevares ved konflikt; feltet er ukendt. Aldersgrupper er kampkontekst. Aktiv betyder observeret GSB-kampdeltagelse; manglende observation er ukendt. Trupmedlemskab står separat.

## Anbefalet struktur og vedligeholdelse (vurdering)

```json
{
  "status": "forslag; ingen tabeller eller databaser oprettet",
  "stamdata": {
    "primary_key": "person_id (intern stabil UUID eller integer; aldrig navn)",
    "fields": [
      "canonical_name",
      "owner",
      "created_at",
      "updated_at",
      "review_status"
    ],
    "rule": "Fødselsår, køn og aktivitet må kun materialiseres fra konfliktfrie dokumenterede observationer; ellers ukendt. Bevar kildeværdier separat."
  },
  "alias": {
    "primary_key": "alias_id",
    "fields": [
      "person_id (nullable for uafklaret kandidat)",
      "name_raw",
      "name_key (NFC + whitespace + lowercase; behold diakritik)",
      "source",
      "season_id",
      "observed_at",
      "valid_from",
      "valid_to",
      "evidence_reference",
      "approval_owner",
      "status"
    ],
    "rule": "Ingen UNIQUE(name_key): navnebrødre skal kunne eksistere. Alias er en observeret eller manuelt godkendt navnevariant, ikke automatisk identitetsbevis."
  },
  "id_kobling": {
    "primary_key": "binding_id",
    "fields": [
      "person_id (nullable)",
      "source_system",
      "id_namespace",
      "external_id (TEXT)",
      "link_class",
      "status (confirmed/candidate/rejected)",
      "valid_from",
      "valid_to",
      "evidence_reference",
      "evidence_sha256",
      "observed_at",
      "reviewed_by"
    ],
    "namespaces": [
      "badmintonplayer.profile (numerisk URL/rangliste-playerid)",
      "badmintonplayer.member_number (BadmintonID/refId; behold rå tegn)",
      "normalized.player_id (intern kilde-ID)",
      "normalized.name_key (navnebaseret kandidat)"
    ],
    "rule": "UNIQUE(namespace,external_id) for aktive bekræftede bindinger; kandidater gemmes separat og må ikke automatisk flette personer. Hver name:-række forbliver uafklaret indtil ekstern identitet er dokumenteret."
  },
  "supporting_observations": {
    "fields": [
      "person_or_binding_id",
      "attribute (gender/birth_year/club/activity/age_group)",
      "value_raw",
      "source",
      "season_id",
      "match_id_or_ranking_version",
      "evidence_reference",
      "observed_at",
      "status"
    ],
    "rule": "Kampens aldersgruppe er kontekst, ikke fødselsår. Klub gemmes med version og rolle (ranglisteklub vs kampklub). Aktivitet kræver GSB-side; fravær er ukendt."
  },
  "ownership": "Foreslået ansvarlig: Christoffer for kanonisk navn, manuelle aliaser og konflikter. Automatisk indlæser ejer observationer, aldrig manuelle afgørelser.",
  "cadence": "Ved hver ugentlig kamp-/ranglisteopdatering indlæses nye IDer, navne, klub- og kønsobservationer. Truplisten gennemgås før hver sæson og ved nye reserver/navneændringer; konflikter sendes til manuel gennemgang.",
  "sources": "Ranglisteversioner med profil-ID, member_number og klub; national spillerlink + parse_status=ok; normalized hold-ID/klub-ID og side; Dream Team-facit og historiske aliaser med manuel proveniens.",
  "prerequisites": "Afklar navnebrødre og modstridende køn; godkend navnebaserede kandidater før de bruges som bekræftede personkoblinger. Afklar om produktets Resultater-ark gemmer hold-/sidefelter før tilsvarende ændring i appen. Kort 036 er genfundet i historikken og beviser kun fravær af den undersøgte indikator."
}
```

Vurdering: felter, identifikatorernes namespaces, kandidatstatus, konfliktregler og ansvar er konkrete nok til et senere bygge-kort. Afklaringerne i prerequisites skal løses før usikre koblinger bekræftes.

## Alle målte totaler og værn

Denne JSON-blok gengiver rapportens totale optællinger direkte fra samme objekt som .json-filen. Detailtal pr. person/kamp og alle sammenligningspar står i .json/.csv.

```json
{
  "summary": {
    "person_records": 796,
    "physical_person_count": "ukendt; navn-only import kan have sammenlagt personer",
    "person_classes": {
      "entydig på ID": 399,
      "navn+klub": 269,
      "kun navn": 18,
      "ingen": 110
    },
    "link_classes": {
      "entydig på ID": 399,
      "navn+klub": 632,
      "kun navn": 22,
      "ingen": 66
    },
    "links": 1119,
    "unresolved_links": 720,
    "roster_records": 44,
    "roster_represented": 44,
    "name_conflict_records": 3997,
    "conflict_classes": {
      "samme navn, flere profil-IDer": 3704,
      "ét profil-ID, flere navne": 271,
      "dokumenteret alias eller navnekandidat": 22
    },
    "gender_conflicts": 0,
    "birth_year_known": 0,
    "activity": {
      "2025/26": {
        "yes": 319,
        "unknown": 477,
        "yes_with_unresolved_identity": 40
      },
      "2026/27": {
        "yes": 125,
        "unknown": 671,
        "yes_with_unresolved_identity": 0
      }
    },
    "unresolved_historical_team_matches": 13,
    "national_side_unresolved_rows_in_gsb_header_matches": 16641,
    "source_counts": {
      "ranking_points": 236762,
      "national_players": 76169,
      "normalized_players": 7599
    },
    "network_calls": 0,
    "unidentified_placeholder_records": 1,
    "normalized_identity": {
      "numeric_profile_ids": 0,
      "name_keys": 5043,
      "missing_ids": 2556,
      "other_ids": 0
    }
  },
  "identity_comparison": {
    "result": "delvist",
    "meaning": "Numerisk rangliste-playerid sammenlignes med national.external_player_id (spillerprofilens URL-fragment). BadmintonID/member_number er et andet felt og en anden identifikator.",
    "caveat": "Entydighed i hver kildes navneliste beviser ikke samme fysiske person. Navnepar med forskellige IDer kan være navnebrødre, dublerede profiler eller navneændringer. Dette afgøres ikke her. Delvist betyder delvis bekræftelse af koblingerne, ikke et bevis for to forskellige numeriske ID-namespaces.",
    "name_matched_unique_pairs": 19834,
    "equal_ids": 19771,
    "different_ids": 63,
    "ambiguous_shared_names": 1865,
    "numeric_id_intersection": 22588,
    "intersection_names_agree": 22352,
    "intersection_names_differ": 236,
    "ranking_ids_without_national": 2756,
    "gsb_numeric_intersection": 399,
    "examples": [
      {
        "ranking_playerid": "329159",
        "national_id": "329159",
        "ranking_names": [
          "Josefine Bille-Ahmt"
        ],
        "national_name": "Josefine Bille-Ahmt",
        "member_numbers": [
          "130504‑01"
        ]
      },
      {
        "ranking_playerid": "55454",
        "national_id": "55454",
        "ranking_names": [
          "Michelle Christensen"
        ],
        "national_name": "Michelle Christensen",
        "member_numbers": [
          "930609‑21"
        ]
      },
      {
        "ranking_playerid": "10003",
        "national_id": "10003",
        "ranking_names": [
          "Christian Lillelund"
        ],
        "national_name": "Christian Lillelund",
        "member_numbers": [
          "730821‑01"
        ]
      }
    ]
  },
  "our_side": {
    "season": "2025/26",
    "club_id": 1093,
    "age_group_ids": [
      2,
      3,
      4,
      5,
      6,
      18
    ],
    "matches": 271,
    "resolved_matches": 267,
    "unresolved_matches": 4,
    "resolved_match_percent": 98.524,
    "unresolved_match_percent": 1.476,
    "individual_rows": 1582,
    "resolved_rows": 1582,
    "unresolved_rows": 0,
    "resolved_row_percent": 100,
    "unresolved_row_percent": 0,
    "matches_with_rows": 254,
    "resolved_matches_without_rows": 13,
    "home_matches": 141,
    "away_matches": 126,
    "reason_counts": [
      {
        "reason": "tomme hjemme-/udehold; API-fejl eller suspenderet kamp",
        "matches": 4,
        "rows": 0
      },
      {
        "reason": "GSB-hold-ID → klub-ID + sæson/pulje + eksakt holdnavn → hjemme/ude",
        "matches": 267,
        "rows": 1582
      }
    ],
    "purely_numeric_side": "ukendt: schemaet har ikke home_team_id/away_team_id; løsningen bruger hold-ID/klub-ID og eksakt holdnavn, aldrig spillernavne",
    "product_limit": "Målingen gælder normalized DB. Dream Team Resultater-arket og hent-resultater.js er ikke målt eller ændret."
  },
  "prior_016": {
    "generatedAt": "2026-09-14T19:41:58.808Z",
    "method": "Read-only aggregation of players.external_player_id through individual_match_players; no name matching or new ID resolution performed.",
    "players": {
      "total": 7599,
      "withId": 5043,
      "withoutId": 2556
    },
    "relations": {
      "total": 67196,
      "distinctPlayers": 7599,
      "withId": 57270,
      "withoutId": 9926
    },
    "bySeason": [
      {
        "season": 2010,
        "relations": 436,
        "withId": 315,
        "withoutId": 121
      },
      {
        "season": 2011,
        "relations": 400,
        "withId": 400,
        "withoutId": 0
      },
      {
        "season": 2012,
        "relations": 3804,
        "withId": 3450,
        "withoutId": 354
      },
      {
        "season": 2013,
        "relations": 4126,
        "withId": 3787,
        "withoutId": 339
      },
      {
        "season": 2014,
        "relations": 4023,
        "withId": 3690,
        "withoutId": 333
      },
      {
        "season": 2015,
        "relations": 4392,
        "withId": 4212,
        "withoutId": 180
      },
      {
        "season": 2016,
        "relations": 4128,
        "withId": 3795,
        "withoutId": 333
      },
      {
        "season": 2017,
        "relations": 4060,
        "withId": 3740,
        "withoutId": 320
      },
      {
        "season": 2018,
        "relations": 4586,
        "withId": 4300,
        "withoutId": 286
      },
      {
        "season": 2019,
        "relations": 3590,
        "withId": 3368,
        "withoutId": 222
      },
      {
        "season": 2020,
        "relations": 1341,
        "withId": 1127,
        "withoutId": 214
      },
      {
        "season": 2021,
        "relations": 4822,
        "withId": 3988,
        "withoutId": 834
      },
      {
        "season": 2022,
        "relations": 5572,
        "withId": 4321,
        "withoutId": 1251
      },
      {
        "season": 2023,
        "relations": 5829,
        "withId": 4837,
        "withoutId": 992
      },
      {
        "season": 2024,
        "relations": 7018,
        "withId": 5437,
        "withoutId": 1581
      },
      {
        "season": 2025,
        "relations": 9069,
        "withId": 6503,
        "withoutId": 2566
      }
    ]
  },
  "prior_036": {
    "generatedAt": "2026-09-15T12:21:35.798Z",
    "relationCount": 8859,
    "playerCount": 2256,
    "duplicateNormalizedNames": [],
    "sameDateSameTypeGroupCount": 0,
    "suspiciousPlayerCount": 0,
    "seasonTable": [
      {
        "season": 2012,
        "relations": 306,
        "players": 124,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2013,
        "relations": 258,
        "players": 100,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2014,
        "relations": 326,
        "players": 114,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2015,
        "relations": 180,
        "players": 63,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2016,
        "relations": 279,
        "players": 101,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2017,
        "relations": 303,
        "players": 125,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2018,
        "relations": 233,
        "players": 63,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2019,
        "relations": 192,
        "players": 77,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2020,
        "relations": 198,
        "players": 84,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2021,
        "relations": 792,
        "players": 285,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2022,
        "relations": 1121,
        "players": 355,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2023,
        "relations": 871,
        "players": 287,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2024,
        "relations": 1425,
        "players": 472,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      },
      {
        "season": 2025,
        "relations": 2375,
        "players": 648,
        "sameDateSameTypePlayers": 0,
        "ratePercent": 0
      }
    ],
    "sameDateSameType": []
  },
  "safeguards": {
    "network_calls": 0,
    "sqlite": {
      "mode": "ro",
      "query_only": 1
    },
    "databases": [
      {
        "database": "gsb-statistik-normalized.db",
        "expected": "49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e",
        "actual": "49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e",
        "after": "49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e",
        "unchanged": true
      },
      {
        "database": "liga-landskab.db",
        "expected": "9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c",
        "actual": "9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c",
        "after": "9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c",
        "unchanged": true
      },
      {
        "database": "rangliste-historik.db",
        "expected": "6e9516db643f88f88946a82cb76ec3b5c686c7d548abf7084b3f60ee3da0316f",
        "actual": "6e9516db643f88f88946a82cb76ec3b5c686c7d548abf7084b3f60ee3da0316f",
        "after": "6e9516db643f88f88946a82cb76ec3b5c686c7d548abf7084b3f60ee3da0316f",
        "unchanged": true
      },
      {
        "database": "national-spillere.db",
        "expected": "1e27c5d81cce8e2d656df2c924e4bf6931eeaaf86348add384ab6d58f7cbac3e",
        "actual": "1e27c5d81cce8e2d656df2c924e4bf6931eeaaf86348add384ab6d58f7cbac3e",
        "after": "1e27c5d81cce8e2d656df2c924e4bf6931eeaaf86348add384ab6d58f7cbac3e",
        "unchanged": true
      },
      {
        "database": "rangliste-point.db",
        "expected": "dabe3a12acecd763e537087f0e16855ad39df298234eb03ff111a3366100d1b9",
        "actual": "dabe3a12acecd763e537087f0e16855ad39df298234eb03ff111a3366100d1b9",
        "after": "dabe3a12acecd763e537087f0e16855ad39df298234eb03ff111a3366100d1b9",
        "unchanged": true
      }
    ],
    "hash_guard_exit_code": 0
  }
}
```

Netværkskald: **0**. Databaser: mode=ro og PRAGMA query_only=ON. SHA-256 før/efter matcher HASHES.txt for alle fem databaser. Ingen git-mutationer eller databaseændringer.

## Stamdatatabel pr. person

| Personnøgle | Kanonisk navn | Alias | Rangliste-ID | National-ID | Normalized-IDer | Klub | Køn | Fødselsår | Aldersgruppe (sæson:ID) | Aktiv 2025/26 | Aktiv 2026/27 | Trup 2026/27 | Klasse |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| id:356311 | Abhilash Vijayannair | ukendt | 356311 | 356311 | 1702 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2024:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:353205 | Achazia Ruah Peddinini Joe | ukendt | 353205 | 353205 | 70 | Gladsaxe Søborg | kvinde | ukendt | 2024:3; 2025:3; 2025:4; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:83626 | Adnan Bacic | ukendt | 83626 | 83626 | 501 | Gladsaxe Søborg | mand | ukendt | 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:355116 | Advika Sawardekar | ukendt | 355116 | 355116 | 1320 | Gladsaxe Søborg | kvinde | ukendt | 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:353316 | Afifa kulsum Baig | ukendt | 353316 | 353316 | 1327 | Gladsaxe Søborg | kvinde | ukendt | 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:356935 | Agnes Flachs von Scholten | ukendt | 356935 | ukendt | ukendt | Gladsaxe Søborg | kvinde | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:210471 | Agnes Nemeth (EU) | ukendt | ukendt | 210471 | 2282 | ukendt | kvinde | ukendt | 2012:1; 2013:1; 2014:1 | ukendt | ukendt | ukendt | navn+klub |
| id:213735 | Agnete Grauslund | ukendt | ukendt | 213735 | 5513 | ukendt | ukendt | ukendt | 2012:5 | ukendt | ukendt | ukendt | navn+klub |
| id:353220 | Ágúst Stensbo Knudsen | ukendt | 353220 | 353220 | 7022 | Gladsaxe Søborg | mand | ukendt | 2024:3; 2024:4; 2025:3; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:337804 | Ahana Mondal | ukendt | ukendt | 337804 | 6481 | ukendt | ukendt | ukendt | 2022:3 | ukendt | ukendt | ukendt | navn+klub |
| id:346148 | Akhila Sureddy | ukendt | 346148 | 346148 | 67 | Gladsaxe Søborg | kvinde | ukendt | 2023:2; 2024:2; 2024:3; 2025:3; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:310280 | Aksel Egedal Kristensen | ukendt | ukendt | 310280 | 6042 | ukendt | ukendt | ukendt | 2019:3; 2021:5; 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:327181 | Aksel Wulff Pedersen | ukendt | ukendt | 327181 | 6094 | ukendt | ukendt | ukendt | 2020:4; 2021:4 | ukendt | ukendt | ukendt | navn+klub |
| id:364319 | Albert Christian Nonno-Nielsen | ukendt | 364319 | 364319 | 7431 | Gladsaxe Søborg | mand | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:364513 | Alberte Nørkær Holmstrup | ukendt | 364513 | 364513 | 7185 | Gladsaxe Søborg | kvinde | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:53208 | Aleksander Juulsgaard | ukendt | 53208 | 53208 | 765 | Gladsaxe Søborg | mand | ukendt | 2025:1; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:337786 | Alemeh Mousavi Hejazi | ukendt | ukendt | 337786 | 6394 | ukendt | ukendt | ukendt | 2022:4 | ukendt | ukendt | ukendt | navn+klub |
| id:85000 | Alexander Bonde Skov | ukendt | ukendt | 85000 | 3610 | ukendt | mand | ukendt | 2012:5; 2013:6; 2015:1; 2016:1; 2016:18; 2016:6; 2017:1; 2026:1 | ukendt | ja | ukendt | navn+klub |
| id:251664 | Alexander Hallberg | ukendt | ukendt | 251664 | 5658 | ukendt | ukendt | ukendt | 2014:3 | ukendt | ukendt | ukendt | navn+klub |
| id:362296 | Alexander Lindholm Boysen | ukendt | 362296 | 362296 | 7201 | Gladsaxe Søborg | mand | ukendt | 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:346147 | Alexander Mejlvang Sand | ukendt | ukendt | 346147 | 6724 | ukendt | ukendt | ukendt | 2023:2 | ukendt | ukendt | ukendt | navn+klub |
| id:265216 | Alexander Riege Klausen | ukendt | ukendt | 265216 | 5752 | ukendt | ukendt | ukendt | 2015:3; 2016:4 | ukendt | ukendt | ukendt | navn+klub |
| id:347938 | Alma Carmel | ukendt | 347938 | 347938 | ukendt | Badminton Roskilde | kvinde | ukendt | 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:346986 | Althea Aurora Marker | ukendt | ukendt | 346986 | ukendt | ukendt | ukendt | ukendt | 2023:2 | ukendt | ukendt | ukendt | ingen |
| id:366991 | Alvin Sejr Føge Lyndrup | ukendt | 366991 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:253144 | Amalie Bredholm | ukendt | ukendt | 253144 | 5688 | ukendt | ukendt | ukendt | 2014:4 | ukendt | ukendt | ukendt | navn+klub |
| id:326044 | Amalie Thomsen | ukendt | 326044 | 326044 | ukendt | NBK Amager | kvinde | ukendt | 2022:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:158752 | Amanda Abildgaard | ukendt | 158752 | 158752 | ukendt | Solrød Strand | kvinde | ukendt | 2017:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:327383 | Amanda Seidler | ukendt | ukendt | 327383 | 2865 | ukendt | kvinde | ukendt | 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:354939 | Amir Tayari | ukendt | ukendt | 354939 | ukendt | ukendt | mand | ukendt | 2024:1 | ukendt | ukendt | ukendt | ingen |
| name:amir tayari | Amir Tayari | ukendt | ukendt | ukendt | 1600 | ukendt | ukendt | ukendt | 2024:1 | ukendt | ukendt | ukendt | ingen |
| id:13445 | Anders Amelung | ukendt | 13445 | 13445 | 369 | Gladsaxe Søborg | mand | ukendt | 2021:1; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:13408 | Anders Brahe | ukendt | ukendt | 13408 | 4582 | ukendt | mand | ukendt | 2012:1; 2013:1 | ukendt | ukendt | ukendt | navn+klub |
| id:358408 | Anders Christiansen | ukendt | 358408 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:34941 | Anders Dyrup | ukendt | 34941 | 34941 | 2672 | Vanløse; Vanløse (g) | mand | ukendt | 2021:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:78232 | Anders Høy Hansen | ukendt | 78232 | 78232 | 3608 | Frederiksberg | mand | ukendt | 2012:1; 2012:6; 2013:1; 2013:6; 2014:1; 2015:1; 2016:1; 2017:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:11110 | Anders Køhler | ukendt | 11110 | 11110 | 881 | Gladsaxe Søborg | mand | ukendt | 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:211888 | Anders Munch Bjerg | ukendt | ukendt | 211888 | 4228 | ukendt | mand | ukendt | 2012:9; 2013:9; 2014:9; 2015:9 | ukendt | ukendt | ukendt | navn+klub |
| id:93118 | Andreas Lyhne Fiehn | ukendt | ukendt | 93118 | 3054 | ukendt | mand | ukendt | 2012:5; 2013:5; 2015:1; 2015:5; 2016:1; 2016:6; 2017:1; 2017:18; 2019:1 | ukendt | ukendt | ukendt | navn+klub |
| id:357668 | Andreas Rask Kragerup | ukendt | 357668 | 357668 | ukendt | Charlottenlund | mand | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:209825 | Andreas Ryun Drasbek | Andreas Drasbek | 209825 | 209825 | ukendt | CBS Sport Badminton; Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ja | entydig på ID |
| id:159453 | Andreas Søegaard | ukendt | ukendt | 159453 | ukendt | ukendt | mand | ukendt | 2017:18 | ukendt | ukendt | ukendt | ingen |
| id:357951 | Aniket Mule | ukendt | 357951 | 357951 | 574 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:325460 | Anja Thomsen | Anja Gunna Thomsen | 325460 | 325460 | 214 | Gladsaxe Søborg | kvinde | ukendt | 2023:1; 2023:11; 2023:9; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:358238 | Anker Engedal Nielsen | ukendt | 358238 | 358238 | 7271 | Gladsaxe Søborg | mand | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:237830 | Anna Berg Siemsen | ukendt | ukendt | 237830 | 5564 | ukendt | ukendt | ukendt | 2013:3; 2014:3; 2015:4; 2016:4 | ukendt | ukendt | ukendt | navn+klub |
| id:364035 | Anna Liu | ukendt | 364035 | ukendt | ukendt | Gladsaxe Søborg | kvinde | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:328195 | Anna Rudolph | ukendt | 328195 | 328195 | 96 | Gladsaxe Søborg; Gladsaxe Søborg (g) | kvinde | ukendt | 2020:2; 2021:3; 2022:3; 2023:4; 2024:4; 2025:5; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:355737 | Anna Xin Lin Liu | ukendt | ukendt | 355737 | 6917 | ukendt | ukendt | ukendt | 2024:3 | ukendt | ukendt | ukendt | navn+klub |
| id:281426 | Anne Gerner Andersen | ukendt | ukendt | 281426 | 3401 | ukendt | kvinde | ukendt | 2016:9; 2017:11; 2017:9; 2018:11; 2018:9 | ukendt | ukendt | ukendt | navn+klub |
| id:166787 | Anne Katrine Raunkjær | ukendt | ukendt | 166787 | 4932 | ukendt | kvinde | ukendt | 2012:9 | ukendt | ukendt | ukendt | navn+klub |
| id:156374 | Anne Madsen | ukendt | 156374 | 156374 | ukendt | Viby J | kvinde | ukendt | 2017:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:157804 | Anne Sofie Bacher | ukendt | ukendt | 157804 | 5476 | ukendt | ukendt | ukendt | 2012:4 | ukendt | ukendt | ukendt | navn+klub |
| id:213731 | Annemette Gath Hansen | ukendt | ukendt | 213731 | 3124 | ukendt | kvinde | ukendt | 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:11; 2014:13; 2014:9; 2015:13; 2015:9; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9; 2018:13; 2018:9; 2019:13; 2019:9 | ukendt | ukendt | ukendt | navn+klub |
| id:166789 | Annette Kørboe | ukendt | 166789 | 166789 | 961 | Gladsaxe Søborg | kvinde | ukendt | 2012:9; 2013:9; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2024:11; 2024:9; 2025:11; 2025:13; 2025:9; 2026:11; 2026:13 | ja | ja | ukendt | entydig på ID |
| id:354902 | Anoop Narayanan | ukendt | 354902 | 354902 | 666 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:364390 | Ansh Yergude | ukendt | 364390 | 364390 | 7215 | Gladsaxe Søborg | mand | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:277778 | Anton Berner | ukendt | 277778 | 277778 | 2440 | Lyngby | mand | ukendt | 2016:3; 2017:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:346416 | Anton Chiramel | ukendt | 346416 | 346416 | 6759 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:320105 | Anton Jørgensen | ukendt | ukendt | 320105 | 5452 | ukendt | mand | ukendt | 2012:3 | ukendt | ukendt | ukendt | navn+klub |
| id:327282 | Anton Krog Søbygaard | ukendt | 327282 | 327282 | 2064 | Glamsdalen | mand | ukendt | 2021:5; 2022:18; 2023:1; 2023:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:296794 | Anton Sevald | ukendt | 296794 | 296794 | 1061 | Gladsaxe Søborg | mand | ukendt | 2021:11; 2021:13; 2022:11; 2022:13; 2023:11; 2024:1; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | entydig på ID |
| id:353219 | Anton Stensbo Knudsen | ukendt | 353219 | 353219 | 76 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:327581 | Anton Aavang Arvidson | ukendt | 327581 | 327581 | 6147 | Gladsaxe Søborg | mand | ukendt | 2021:3; 2022:3; 2023:4; 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:334160 | Arjun Kharwandikar | ukendt | 334160 | 334160 | 7353 | Gladsaxe Søborg | mand | ukendt | 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:352315 | arslan falak | ukendt | 352315 | 352315 | 736 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:355136 | Arthur Bjarnholt Glaring | ukendt | 355136 | 355136 | 6931 | Gladsaxe Søborg | mand | ukendt | 2024:2; 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:332421 | Arthur Esgerd Rohde | ukendt | ukendt | 332421 | 6507 | ukendt | ukendt | ukendt | 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:265180 | Asbjørn Dam Sørensen | ukendt | ukendt | 265180 | 5735 | ukendt | ukendt | ukendt | 2015:4; 2016:4; 2016:5 | ukendt | ukendt | ukendt | navn+klub |
| id:331909 | Asger Kure Weeke | ukendt | ukendt | 331909 | 6199 | ukendt | ukendt | ukendt | 2021:3 | ukendt | ukendt | ukendt | navn+klub |
| id:364351 | Asger Stougaard | ukendt | 364351 | 364351 | 7460 | Gladsaxe Søborg | mand | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:287532 | Ask Unden | ukendt | 287532 | 287532 | 1894 | Gladsaxe Søborg | mand | ukendt | 2017:3; 2018:3; 2021:4; 2022:5; 2023:18; 2023:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:81902 | Aske Andreas Pihl | ukendt | 81902 | 81902 | 3330 | Frederiksberg | mand | ukendt | 2012:6; 2013:1; 2013:6; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:337782 | Asta Skovgaard Andersen | ukendt | ukendt | 337782 | 6516 | ukendt | ukendt | ukendt | 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:356243 | Athena Villegas-Lauth | ukendt | 356243 | 356243 | 6836 | Gladsaxe Søborg | kvinde | ukendt | 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:159500 | August Jonathan Skov | ukendt | ukendt | 159500 | 4572 | ukendt | mand | ukendt | 2013:4 | ukendt | ukendt | ukendt | navn+klub |
| id:253108 | August Markvard Kjærsgaard | ukendt | ukendt | 253108 | 5723 | ukendt | ukendt | ukendt | 2014:5 | ukendt | ukendt | ukendt | navn+klub |
| id:251665 | August Max Larsen | ukendt | ukendt | 251665 | 5648 | ukendt | ukendt | ukendt | 2014:3; 2015:4 | ukendt | ukendt | ukendt | navn+klub |
| id:355149 | August Svane Worsøe Schleien | ukendt | 355149 | 355149 | 6859 | Gladsaxe Søborg | mand | ukendt | 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:344177 | August Toftager-Larsen | ukendt | 344177 | 344177 | 29 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:3; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:367314 | Axel Mestanov | ukendt | 367314 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:365666 | Azam | ukendt | 365666 | 365666 | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | entydig på ID |
| id:335246 | Behzad Hoseinzadeh | ukendt | 335246 | 335246 | 562 | Gladsaxe Søborg; Værløse | mand | ukendt | 2023:1; 2024:1; 2024:9; 2025:1; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:335374 | Bella Claire Bui | ukendt | 335374 | 335374 | 51 | Gladsaxe Søborg; Vallensbæk | kvinde | ukendt | 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:346768 | Benjamin Damgaard Hantsøe | ukendt | 346768 | 346768 | 6679 | Gladsaxe Søborg | mand | ukendt | 2023:4; 2024:5; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:330650 | Benjamin Hinge Carlsson | ukendt | 330650 | 330650 | 8 | Gladsaxe Søborg | mand | ukendt | 2021:2; 2022:3; 2023:3; 2023:4; 2024:4; 2025:4; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:214431 | Benjamin Rasmussen Paranna | ukendt | ukendt | 214431 | 5105 | ukendt | ukendt | ukendt | 2012:6 | ukendt | ukendt | ukendt | navn+klub |
| id:157128 | Bent Horn Andersen | ukendt | 157128 | 157128 | 1133 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:12; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2022:9; 2023:11; 2023:13; 2024:11; 2024:13; 2025:11; 2025:13 | ja | ukendt | ukendt | entydig på ID |
| id:344278 | Bertel Wiborg | ukendt | 344278 | 344278 | ukendt | Charlottenlund | mand | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:324032 | Bertram Hammarkvist | ukendt | ukendt | 324032 | 6077 | ukendt | ukendt | ukendt | 2020:3; 2021:3; 2022:4 | ukendt | ukendt | ukendt | navn+klub |
| id:327290 | Bertram Hjorth Laursen | ukendt | 327290 | 327290 | 201 | Gladsaxe Søborg | mand | ukendt | 2020:2; 2020:3; 2021:3; 2022:3; 2023:4; 2024:4; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:132411 | Bertram Wilhardt Jensen | ukendt | ukendt | 132411 | 3713 | ukendt | mand | ukendt | 2012:3; 2013:3; 2014:4; 2015:4; 2016:5 | ukendt | ukendt | ukendt | navn+klub |
| id:310370 | Bertram Aavang Arvidson | ukendt | 310370 | 310370 | 1889 | Gentofte; Rønde Efterskole; Rønde Efterskole (g) | mand | ukendt | 2019:3; 2020:4; 2021:4; 2022:18; 2022:5; 2023:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:335192 | Bettina Meyer Hansen | ukendt | ukendt | 335192 | 2082 | ukendt | kvinde | ukendt | 2023:1 | ukendt | ukendt | ukendt | navn+klub |
| id:365627 | Bhavya Kavya Sri Singam | ukendt | 365627 | ukendt | ukendt | Gladsaxe Søborg | kvinde | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:364034 | Bhavya Ponugoti | ukendt | 364034 | 364034 | 7404 | Gladsaxe Søborg | kvinde | ukendt | 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:237913 | Birgit Valentin Hansen | ukendt | 237913 | 237913 | 2540 | BK36 Kbh. | kvinde | ukendt | 2012:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:212296 | Birgitte Jakobsen | ukendt | 212296 | 212296 | 1167 | Gladsaxe Søborg | kvinde | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2022:17; 2022:9; 2023:11; 2023:13; 2023:17; 2024:11; 2024:17; 2024:9; 2025:11; 2025:13; 2025:17 | ja | ukendt | ukendt | entydig på ID |
| id:211927 | Bjarne Bak | ukendt | ukendt | 211927 | 4258 | ukendt | mand | ukendt | 2012:9; 2013:9; 2015:9 | ukendt | ukendt | ukendt | kun navn |
| id:7921 | Bjarne Nielsen | ukendt | 7921 | 7921 | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | entydig på ID |
| name:bjarne nielsen | Bjarne Nielsen | ukendt | ukendt | ukendt | 2767 | ukendt | ukendt | ukendt | 2021:9 | ukendt | ukendt | ukendt | ingen |
| id:352316 | Brian Heiner | ukendt | 352316 | 352316 | 615 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:15489 | Brian Oddershede | ukendt | 15489 | 15489 | 366 | Gladsaxe Søborg | mand | ukendt | 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ja | entydig på ID |
| id:8863 | Brian Schou | ukendt | ukendt | 8863 | 3119 | ukendt | mand | ukendt | 2016:9; 2017:9; 2018:9; 2019:9 | ukendt | ukendt | ukendt | kun navn |
| id:255073 | Calle Greisholm | ukendt | ukendt | 255073 | 3403 | ukendt | mand | ukendt | 2016:9; 2017:9; 2018:9 | ukendt | ukendt | ukendt | navn+klub |
| id:199069 | Camilla Edfors Terkildsen | ukendt | 199069 | 199069 | 581 | Gladsaxe Søborg | kvinde | ukendt | 2014:1; 2015:1; 2016:1; 2017:1; 2019:1; 2020:1; 2021:1; 2023:1; 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:86247 | Camilla Steinmetz Bagge | Camilla Bagge | 86247 | 86247 | ukendt | Gladsaxe Søborg (g) | kvinde | ukendt | 2026:1 | ukendt | ja | ja | entydig på ID |
| id:308361 | Carl Emil Grøn | ukendt | 308361 | 308361 | ukendt | KBK Kbh. | mand | ukendt | 2023:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:353278 | Carl Emil Lumholtz | ukendt | 353278 | 353278 | 7016 | Gladsaxe Søborg | mand | ukendt | 2024:3 | ukendt | ukendt | ukendt | entydig på ID |
| id:352976 | Carl Specht Hoelgaard | ukendt | 352976 | 352976 | ukendt | Gladsaxe Søborg | mand | ukendt | 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:363663 | Carl Wilhelm Fiil Sestoft | ukendt | 363663 | 363663 | ukendt | Charlottenlund | mand | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:362626 | Carl Winning Laursen | ukendt | 362626 | 362626 | 7202 | Gladsaxe Søborg | mand | ukendt | 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:363207 | Carl-Emil G Pedersen | ukendt | 363207 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:251688 | Caroline Buhl-Madsen | ukendt | ukendt | 251688 | 5709 | ukendt | ukendt | ukendt | 2014:5 | ukendt | ukendt | ukendt | navn+klub |
| id:327382 | Caroline Palmer Haushøj | ukendt | ukendt | 327382 | 2578 | ukendt | kvinde | ukendt | 2020:5; 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| name:carsten jensen | Carsten Jensen | ukendt | ukendt | ukendt | 1786 | ukendt | ukendt | ukendt | 2024:13 | ukendt | ukendt | ukendt | ingen |
| id:319734 | Carsten Kromann | ukendt | 319734 | 319734 | 3108 | Gladsaxe Søborg | mand | ukendt | 2019:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:5180 | Carsten Nielsen | ukendt | ukendt | 5180 | ukendt | ukendt | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:9; 2018:13; 2018:9; 2019:11; 2019:9 | ukendt | ukendt | ukendt | ingen |
| name:carsten nielsen | Carsten Nielsen | ukendt | ukendt | ukendt | 1059 | ukendt | ukendt | ukendt | 2012:11; 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:11; 2014:13; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:9 | ukendt | ukendt | ukendt | ingen |
| id:238703 | Carsten Nørgaard | ukendt | 238703 | 238703 | ukendt | Gladsaxe Søborg | mand | ukendt | 2013:9; 2015:1; 2016:1; 2016:9; 2017:9; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| name:carsten nørgaard | Carsten Nørgaard | ukendt | ukendt | ukendt | 584 | ukendt | ukendt | ukendt | 2013:9; 2014:9; 2015:1; 2015:9; 2016:1; 2016:9; 2017:9; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:227261 | Carsten Rasmussen | ukendt | 227261 | 227261 | ukendt | Grantoften | mand | ukendt | 2012:9; 2013:9; 2016:9; 2018:9; 2019:9; 2021:9; 2022:9; 2023:9 | ukendt | ukendt | ukendt | entydig på ID |
| name:carsten rasmussen | Carsten Rasmussen | ukendt | ukendt | ukendt | 2127 | ukendt | ukendt | ukendt | 2012:9; 2013:9; 2014:9; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9 | ukendt | ukendt | ukendt | ingen |
| id:337787 | Carsten Yan | ukendt | 337787 | 337787 | 1381 | Gladsaxe Søborg | mand | ukendt | 2022:4; 2023:4; 2024:5; 2025:18; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:275511 | Casper Bjerre Labori Olsen | ukendt | ukendt | 275511 | 2051 | ukendt | mand | ukendt | 2022:1; 2023:1 | ukendt | ukendt | ukendt | navn+klub |
| id:45499 | Casper Hans Lunøe Sørensen | ukendt | ukendt | 45499 | 4406 | ukendt | mand | ukendt | 2014:1 | ukendt | ukendt | ukendt | navn+klub |
| id:337781 | Cecilia Suhr-Virranniemi | ukendt | ukendt | 337781 | 6517 | ukendt | ukendt | ukendt | 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:210882 | Cecilie Gry Beder | ukendt | 210882 | 210882 | 405 | Frederiksberg | kvinde | ukendt | 2012:6; 2013:1; 2013:6; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:346158 | Cecilie Johansen | ukendt | 346158 | 346158 | ukendt | Gladsaxe Søborg | kvinde | ukendt | 2023:2; 2024:3; 2024:4; 2025:3; 2025:4; 2026:4 | ja | ja | ukendt | entydig på ID |
| name:cecilie johansen | Cecilie Johansen | ukendt | ukendt | ukendt | 74 | ukendt | ukendt | ukendt | 2023:2; 2024:3; 2024:4; 2025:3; 2025:4 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:211443 | Cecilie Noer | ukendt | ukendt | 211443 | 5508 | ukendt | ukendt | ukendt | 2012:5 | ukendt | ukendt | ukendt | navn+klub |
| id:331474 | Cecilie Nygård | ukendt | ukendt | 331474 | 6201 | ukendt | ukendt | ukendt | 2021:3; 2022:3 | ukendt | ukendt | ukendt | navn+klub |
| id:364781 | Changsi Cai | ukendt | 364781 | 364781 | 777 | Gladsaxe Søborg | kvinde | ukendt | 2025:1; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:354895 | Chaojun Li | ukendt | 354895 | 354895 | 733 | Gladsaxe Søborg | kvinde | ukendt | 2024:1; 2025:1; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:157517 | Charlotte Neerdal | ukendt | 157517 | 157517 | 729 | Gladsaxe Søborg | kvinde | ukendt | 2012:4; 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:366733 | Charvi Jakku | ukendt | 366733 | 366733 | ukendt | Gladsaxe Søborg | kvinde | ukendt | 2026:18 | ukendt | ja | ukendt | entydig på ID |
| id:328196 | Chastine Christiansen | ukendt | 328196 | 328196 | 170 | Gladsaxe Søborg | kvinde | ukendt | 2020:2; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:362889 | Chayatat Inma | ukendt | 362889 | 362889 | 576 | Gladsaxe Søborg | mand | ukendt | 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:348041 | Chiori Nagatsuka | ukendt | 348041 | 348041 | ukendt | Gladsaxe Søborg | kvinde | ukendt | 2025:1; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| name:chiori nagatsuka | Chiori Nagatsuka | ukendt | ukendt | ukendt | 752 | ukendt | ukendt | ukendt | 2025:1; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:356457 | Christian Kjær | ukendt | 356457 | 356457 | ukendt | Gladsaxe Søborg | mand | ukendt | 2024:1 | ukendt | ukendt | ukendt | entydig på ID |
| name:christian kjær | Christian Kjær | ukendt | ukendt | ukendt | 1019 | ukendt | ukendt | ukendt | 2024:1; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:346762 | Christian Mørch | ukendt | ukendt | 346762 | 6680 | ukendt | ukendt | ukendt | 2023:4 | ukendt | ukendt | ukendt | navn+klub |
| id:352076 | Christian Nedergaard Antvorskov | ukendt | 352076 | 352076 | ukendt | Gladsaxe Søborg; Glostrup | mand | ukendt | ukendt | ukendt | ukendt | ukendt | entydig på ID |
| id:358137 | Christian Nilaus Præstegaard | ukendt | 358137 | 358137 | 7037 | Gladsaxe Søborg | mand | ukendt | 2024:3; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:209944 | Christian Rein Johannessen | ukendt | 209944 | 209944 | 563 | Gladsaxe Søborg | mand | ukendt | 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9; 2026:11 | ja | ja | ukendt | entydig på ID |
| id:158750 | Christian Staal | ukendt | 158750 | 158750 | ukendt | Gladsaxe Søborg | mand | ukendt | 2021:1; 2022:1; 2023:1; 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| name:christian staal | Christian Staal | ukendt | ukendt | ukendt | 466 | ukendt | mand | ukendt | 2021:1; 2022:1; 2023:1; 2024:1; 2025:1 | ja (identitet uafklaret) | ukendt | ja | ingen |
| id:7940 | Christian Thrysøe | ukendt | 7940 | 7940 | 1162 | Gladsaxe Søborg | mand | ukendt | 2012:9; 2013:9; 2014:9; 2015:1; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:11; 2026:11; 2026:13 | ja | ja | ukendt | entydig på ID |
| id:356230 | Christina Liu | ukendt | ukendt | 356230 | 1322 | ukendt | kvinde | ukendt | 2024:4 | ukendt | ukendt | ukendt | navn+klub |
| id:84737 | Christoffer Müller | ukendt | 84737 | 84737 | 341 | Gladsaxe Søborg | mand | ukendt | 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:358560 | Christoffer Niebling Perret-Gentil | ukendt | 358560 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:348036 | Christoffer Ring | ukendt | 348036 | 348036 | 602 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:51948 | Christoffer Thrysøe | ukendt | 51948 | 51948 | 4669 | Lundtofte | mand | ukendt | 2012:1; 2013:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:13982 | Claus Christophersen | ukendt | 13982 | 13982 | 580 | Gladsaxe Søborg | mand | ukendt | 2010:1; 2011:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2022:1; 2023:1; 2023:9; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:272041 | Claus Foss | ukendt | ukendt | 272041 | 3410 | ukendt | mand | ukendt | 2015:1; 2015:9; 2016:9; 2017:9; 2018:9 | ukendt | ukendt | ukendt | navn+klub |
| id:7436 | Claus Lehmann | ukendt | 7436 | 7436 | 2913 | DTU | mand | ukendt | 2019:1; 2019:11; 2019:9; 2020:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:196193 | Claus Starcke | ukendt | 196193 | 196193 | 1200 | Gladsaxe Søborg | mand | ukendt | 2018:11; 2018:9; 2019:11; 2019:9; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2023:11; 2023:13; 2024:11; 2024:13; 2025:11; 2025:13 | ja | ukendt | ukendt | entydig på ID |
| id:362608 | Conrad Lind | ukendt | 362608 | 362608 | 5395 | Gladsaxe Søborg | mand | ukendt | 2025:18 | ja | ukendt | ukendt | entydig på ID |
| id:346226 | Cornelia Holzmann | ukendt | ukendt | 346226 | 1908 | ukendt | kvinde | ukendt | 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:346938 | Cornelia Viola Bender-Jacobsen | ukendt | 346938 | 346938 | 25 | Gladsaxe Søborg | kvinde | ukendt | 2023:3; 2024:4; 2025:4; 2025:5; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:328211 | Cornelius Maagaard Isager-Sally | ukendt | ukendt | 328211 | 6149 | ukendt | ukendt | ukendt | 2020:2; 2021:3 | ukendt | ukendt | ukendt | navn+klub |
| id:211766 | Csenge Virag Varjas | ukendt | ukendt | 211766 | 4052 | ukendt | kvinde | ukendt | 2013:1; 2014:1; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:346223 | Dagmar Sally Birch | ukendt | ukendt | 346223 | 1326 | ukendt | kvinde | ukendt | 2023:3; 2024:4 | ukendt | ukendt | ukendt | navn+klub |
| id:357669 | Daksh Artham | ukendt | 357669 | 357669 | ukendt | Charlottenlund | mand | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:314403 | Dan Mogensen | ukendt | 314403 | 314403 | 5206 | Frederiksberg | mand | ukendt | 2020:17 | ukendt | ukendt | ukendt | entydig på ID |
| id:266342 | Daniel Borgen | ukendt | ukendt | 266342 | ukendt | ukendt | mand | ukendt | 2015:1; 2016:1 | ukendt | ukendt | ukendt | ingen |
| name:daniel borgen | Daniel Borgen | ukendt | ukendt | ukendt | 763 | ukendt | ukendt | ukendt | 2015:1; 2016:1 | ukendt | ukendt | ukendt | ingen |
| id:52937 | Daniel Fritz Berentzen | ukendt | ukendt | 52937 | 4855 | ukendt | mand | ukendt | 2010:1; 2011:1; 2012:1 | ukendt | ukendt | ukendt | navn+klub |
| id:354947 | Daniel Hoang | ukendt | 354947 | 354947 | 560 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:55110 | Daniel Lauritsen | ukendt | ukendt | 55110 | 2734 | ukendt | mand | ukendt | 2019:1; 2020:1; 2021:1 | ukendt | ukendt | ukendt | navn+klub |
| id:157805 | Daniel Søberg Roed | ukendt | ukendt | 157805 | 4076 | ukendt | mand | ukendt | 2012:5; 2013:5; 2015:1; 2016:18; 2016:6 | ukendt | ukendt | ukendt | navn+klub |
| id:267644 | Daniel Varkanen | ukendt | ukendt | 267644 | 4158 | ukendt | mand | ukendt | 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:330835 | David Bataju-Rohde | ukendt | ukendt | 330835 | 6224 | ukendt | ukendt | ukendt | 2021:4; 2022:4; 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:311654 | David Bendix Bie | ukendt | ukendt | 311654 | 2696 | ukendt | mand | ukendt | 2019:5; 2020:5; 2021:1; 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:344263 | David Vad Chawes | ukendt | 344263 | 344263 | 1385 | Gladsaxe Søborg | mand | ukendt | 2023:4; 2024:18; 2024:5; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:362870 | Ditte Hjorth Laursen | ukendt | ukendt | 362870 | 1050 | ukendt | kvinde | ukendt | 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | kun navn |
| id:9964 | Ditte Nyeng | ukendt | 9964 | 9964 | 320 | Gladsaxe Søborg | kvinde | ukendt | 2013:1; 2013:9; 2014:1; 2014:9; 2015:1; 2015:9; 2016:1; 2016:9; 2017:1; 2017:9; 2018:1; 2018:9; 2019:1; 2019:9; 2023:11; 2023:9; 2024:1; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:211692 | Dorte Petersen | ukendt | 211692 | 211692 | 1176 | Gladsaxe Søborg | kvinde | ukendt | 2012:11; 2012:9; 2013:1; 2013:11; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:1; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2022:9; 2023:11; 2023:13; 2024:11; 2024:13; 2025:11; 2025:13; 2025:17; 2026:11 | ja | ja | ukendt | entydig på ID |
| id:10397 | Dorthe Høst Sarup | Dorthe Høst | 10397 | 10397 | 469 | Gladsaxe Søborg | kvinde | ukendt | 2017:1; 2017:9; 2018:1; 2018:9; 2020:1; 2021:1; 2021:9; 2022:1; 2022:9; 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:211930 | Ebba Hansen | ukendt | ukendt | 211930 | 4502 | ukendt | kvinde | ukendt | 2012:9; 2013:9; 2014:9 | ukendt | ukendt | ukendt | navn+klub |
| id:330636 | Ebbe Rokkedal Therkildsen | ukendt | ukendt | 330636 | 6276 | ukendt | ukendt | ukendt | 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:314651 | Ehan Shadat | ukendt | 314651 | 314651 | 6074 | Gladsaxe Søborg | mand | ukendt | 2020:3; 2021:4; 2022:4; 2023:5; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:332131 | Elena Shojaei | ukendt | 332131 | 332131 | 1395 | Gladsaxe Søborg | kvinde | ukendt | 2021:5; 2022:5; 2023:5; 2024:18; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:308299 | Elias Hestehave | ukendt | ukendt | 308299 | 1892 | ukendt | mand | ukendt | 2018:3; 2019:3; 2020:4; 2021:4; 2022:5; 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:348192 | Elisabeth Bakkegaard | ukendt | ukendt | 348192 | 1925 | ukendt | kvinde | ukendt | 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:362078 | Ella Meng | ukendt | 362078 | 362078 | 7402 | Gladsaxe Søborg | kvinde | ukendt | 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:362301 | Ellie Hjorth Laursen | ukendt | ukendt | 362301 | 5432 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:359748 | Emeli Hansen | ukendt | 359748 | ukendt | ukendt | Gladsaxe Søborg | kvinde | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:327408 | Emil Juul Lund | ukendt | ukendt | 327408 | 6071 | ukendt | ukendt | ukendt | 2020:4 | ukendt | ukendt | ukendt | navn+klub |
| id:132410 | Emil Wilhardt Jensen | ukendt | ukendt | 132410 | 4086 | ukendt | mand | ukendt | 2012:5; 2013:5; 2014:6; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:224158 | Emil Zacho Fahrenholtz | ukendt | ukendt | 224158 | 4564 | ukendt | mand | ukendt | 2013:4 | ukendt | ukendt | ukendt | navn+klub |
| id:337780 | Emilie Høgh Haugaard | ukendt | ukendt | 337780 | 6515 | ukendt | ukendt | ukendt | 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:345994 | Emilie Libak Rasmussen | ukendt | ukendt | 345994 | 1913 | ukendt | kvinde | ukendt | 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:335363 | Emilie Reinholdt Amelung | ukendt | 335363 | 335363 | 3 | Gladsaxe Søborg; Gladsaxe Søborg (g) | kvinde | ukendt | 2022:2; 2023:3; 2024:3; 2025:4; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:196575 | Emilie With | ukendt | ukendt | 196575 | 2407 | ukendt | kvinde | ukendt | 2012:6; 2013:1; 2013:6 | ukendt | ukendt | ukendt | navn+klub |
| id:337800 | Emma Zhao | ukendt | ukendt | 337800 | 6458 | ukendt | ukendt | ukendt | 2022:2; 2023:2 | ukendt | ukendt | ukendt | navn+klub |
| id:355157 | Erik Bjarthur Stein Thorsteinsson | ukendt | 355157 | 355157 | 6863 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:308488 | Erik Hui Xi Loo | ukendt | 308488 | 308488 | ukendt | KBK Kbh. | mand | ukendt | 2023:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:84256 | Erik Juul | ukendt | 84256 | 84256 | 510 | Gladsaxe Søborg | mand | ukendt | 2012:5; 2013:6; 2015:1; 2016:1; 2016:18; 2016:6; 2018:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1 | ja | ukendt | ja | entydig på ID |
| id:328253 | Erik Kragh Winther | ukendt | 328253 | 328253 | 121 | Gladsaxe Søborg | mand | ukendt | 2020:2; 2021:3; 2022:3; 2023:4; 2023:5; 2024:4; 2025:18; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:362598 | Eshaal Azam | ukendt | 362598 | 362598 | 175 | Gladsaxe Søborg | kvinde | ukendt | 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:346139 | Ethan You | ukendt | 346139 | 346139 | 6737 | Gladsaxe Søborg | mand | ukendt | 2023:2; 2024:3; 2025:3; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:251809 | Fabian Aagren | ukendt | ukendt | 251809 | 5193 | ukendt | ukendt | ukendt | 2014:4; 2015:4; 2016:5; 2017:5; 2018:18 | ukendt | ukendt | ukendt | navn+klub |
| id:352435 | Fariborz Mosafer | ukendt | 352435 | 352435 | 732 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:355361 | Farshid Attarhamed | ukendt | 355361 | 355361 | ukendt | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| name:farshid attarhamed | Farshid Attarhamed | ukendt | ukendt | ukendt | 686 | ukendt | ukendt | ukendt | 2024:1; 2025:1 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:337801 | Felix Langvad Vajse | ukendt | ukendt | 337801 | 6479 | ukendt | ukendt | ukendt | 2022:3; 2023:3 | ukendt | ukendt | ukendt | navn+klub |
| id:346874 | Francisco Theo Hildebrandt | ukendt | 346874 | 346874 | 6736 | Gladsaxe Søborg | mand | ukendt | 2023:2; 2024:3 | ukendt | ukendt | ukendt | entydig på ID |
| id:5634 | Frank Meldgård | ukendt | ukendt | 5634 | 4954 | ukendt | mand | ukendt | 2012:11 | ukendt | ukendt | ukendt | kun navn |
| id:224185 | Frank Meldgaard | ukendt | ukendt | 224185 | 3645 | ukendt | mand | ukendt | 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9 | ukendt | ukendt | ukendt | navn+klub |
| id:199485 | Frank Nielsen | ukendt | 199485 | 199485 | ukendt | Gladsaxe Søborg | mand | ukendt | 2018:11; 2018:9; 2019:11; 2019:9; 2021:11 | ukendt | ukendt | ukendt | entydig på ID |
| name:frank nielsen | Frank Nielsen | ukendt | ukendt | ukendt | 1204 | ukendt | ukendt | ukendt | 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:11; 2025:13 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:362295 | Franzisca Widyatmoko | ukendt | 362295 | ukendt | ukendt | Gladsaxe Søborg | kvinde | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:358372 | Frede Skov Martinussen | ukendt | ukendt | 358372 | 6974 | ukendt | ukendt | ukendt | 2024:2 | ukendt | ukendt | ukendt | navn+klub |
| id:346146 | Frederik Bach Lund | ukendt | ukendt | 346146 | 6722 | ukendt | ukendt | ukendt | 2023:2 | ukendt | ukendt | ukendt | navn+klub |
| id:361617 | Frederik Ellebæk Steensgaard | ukendt | 361617 | 361617 | 7206 | Gladsaxe Søborg; Gladsaxe Søborg (g) | mand | ukendt | 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:223624 | Frederik Fabricius Dahl | ukendt | ukendt | 223624 | 5590 | ukendt | ukendt | ukendt | 2013:3; 2014:4; 2015:4; 2016:4; 2016:5 | ukendt | ukendt | ukendt | navn+klub |
| id:196238 | Frederik Friis Bek | ukendt | ukendt | 196238 | 5501 | ukendt | ukendt | ukendt | 2012:4 | ukendt | ukendt | ukendt | navn+klub |
| id:277003 | Frederik Kampen Lønborg | ukendt | ukendt | 277003 | 5814 | ukendt | ukendt | ukendt | 2016:4; 2017:4 | ukendt | ukendt | ukendt | navn+klub |
| id:156705 | Frederik Kubach | ukendt | 156705 | 156705 | ukendt | Greve | mand | ukendt | 2017:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:358867 | Frederik Pedersen | ukendt | 358867 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:330836 | Frederik Tuegaard Birk | ukendt | ukendt | 330836 | 6226 | ukendt | ukendt | ukendt | 2021:4; 2022:4 | ukendt | ukendt | ukendt | navn+klub |
| id:211198 | Frederik Windekilde Christensen | ukendt | ukendt | 211198 | 2917 | ukendt | mand | ukendt | 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1 | ukendt | ukendt | ukendt | navn+klub |
| id:293767 | Freja Bygsø | ukendt | ukendt | 293767 | 2868 | ukendt | kvinde | ukendt | 2017:3; 2018:4; 2019:4; 2020:5; 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:322408 | Freja Fan Fuglsang | ukendt | 322408 | 322408 | 1294 | Gladsaxe Søborg | kvinde | ukendt | 2019:3; 2020:3; 2021:4; 2022:4; 2023:5; 2024:4; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:272918 | Freja Louise Volf | ukendt | ukendt | 272918 | 5810 | ukendt | ukendt | ukendt | 2016:4 | ukendt | ukendt | ukendt | navn+klub |
| id:364399 | Frida Bohn Jeppesen | ukendt | ukendt | 364399 | 5434 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:353271 | Georg Engedal Nielsen | ukendt | 353271 | 353271 | 6854 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:4777 | Gert Lazarotti | ukendt | ukendt | 4777 | 4792 | ukendt | mand | ukendt | 2012:11; 2013:13 | ukendt | ukendt | ukendt | navn+klub |
| id:166793 | Gert Poulsen | ukendt | 166793 | 166793 | ukendt | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:9; 2015:13; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:13; 2018:9; 2019:9; 2021:11; 2021:13; 2022:11; 2022:13; 2023:11; 2023:13; 2024:11; 2024:13; 2025:13 | ja | ukendt | ukendt | entydig på ID |
| name:gert poulsen | Gert Poulsen | ukendt | ukendt | ukendt | 1084 | ukendt | ukendt | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:13; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2023:11; 2023:13; 2023:9; 2024:11; 2024:13; 2024:17; 2025:11; 2025:13; 2025:17; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:337358 | Gitte Mathiasen | ukendt | 337358 | 337358 | 393 | Gladsaxe Søborg | kvinde | ukendt | 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:346412 | Gorm Hundebøl | ukendt | ukendt | 346412 | 6745 | ukendt | ukendt | ukendt | 2023:3 | ukendt | ukendt | ukendt | navn+klub |
| id:280903 | Gregers Gorm | ukendt | ukendt | 280903 | 3871 | ukendt | mand | ukendt | 2016:1 | ukendt | ukendt | ukendt | navn+klub |
| id:343986 | Guanyan Chen | ukendt | 343986 | 343986 | ukendt | Gladsaxe Søborg; Islands Brygge | mand | ukendt | 2026:5 | ukendt | ja | ukendt | entydig på ID |
| name:guido mattioni | Guido Mattioni | ukendt | ukendt | ukendt | 5208 | ukendt | ukendt | ukendt | 2020:17 | ukendt | ukendt | ukendt | ingen |
| id:251668 | Gustav Klok Kirring | ukendt | ukendt | 251668 | 5653 | ukendt | ukendt | ukendt | 2014:3 | ukendt | ukendt | ukendt | navn+klub |
| id:333047 | Gustav Kruse Johansen | ukendt | ukendt | 333047 | 6207 | ukendt | ukendt | ukendt | 2021:3; 2022:3 | ukendt | ukendt | ukendt | navn+klub |
| id:347414 | Halfdan Grohganz Føns | ukendt | ukendt | 347414 | 6739 | ukendt | ukendt | ukendt | 2023:2 | ukendt | ukendt | ukendt | navn+klub |
| id:353265 | Halfdan Olrik Fløistrup | ukendt | 353265 | 353265 | 6961 | Gladsaxe Søborg | mand | ukendt | 2024:2; 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:213730 | Hanna B. Sørensen | ukendt | ukendt | 213730 | 3964 | ukendt | kvinde | ukendt | 2012:13; 2012:9; 2013:11; 2013:13; 2014:13; 2015:13; 2016:13 | ukendt | ukendt | ukendt | navn+klub |
| id:1700 | Hannah Clausen | Hannah Phoebe Ejada Clausen; Hannah Phoebeejada Clausen; Hannah Phoebejada Clausen | 1700 | 1700 | 222 | Gladsaxe Søborg | kvinde | ukendt | 2022:1; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:355265 | Hannah Klein (EU) | ukendt | 355265 | 355265 | 1366 | Gladsaxe Søborg | kvinde | ukendt | 2024:1; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:13733 | Hanne Meinertz Hagendal | ukendt | 13733 | 13733 | 540 | Gladsaxe Søborg | kvinde | ukendt | 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:344160 | Hanne Reck | ukendt | 344160 | 344160 | 2084 | Gladsaxe Søborg | kvinde | ukendt | 2023:1; 2024:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:211893 | Hans Arne Christensen | ukendt | ukendt | 211893 | 3911 | ukendt | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:9; 2016:9 | ukendt | ukendt | ukendt | navn+klub |
| id:157129 | Hans Møller | ukendt | ukendt | 157129 | 3111 | ukendt | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9 | ukendt | ukendt | ukendt | navn+klub |
| id:335143 | Hans Schmidt Berthelsen | ukendt | ukendt | 335143 | 6505 | ukendt | ukendt | ukendt | 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:358637 | Hans Schwartzlose | ukendt | 358637 | 358637 | 671 | Gladsaxe Søborg | mand | ukendt | 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:211931 | Hans Thor christensen | ukendt | ukendt | 211931 | 3484 | ukendt | mand | ukendt | 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:9; 2015:9; 2016:11; 2016:9; 2017:9; 2018:13; 2019:17; 2020:17; 2021:17 | ukendt | ukendt | ukendt | navn+klub |
| id:236519 | Harald Greve Høiby | ukendt | ukendt | 236519 | 4554 | ukendt | mand | ukendt | 2013:4 | ukendt | ukendt | ukendt | navn+klub |
| id:224048 | Helena Siyahpour | ukendt | ukendt | 224048 | 5567 | ukendt | ukendt | ukendt | 2013:3 | ukendt | ukendt | ukendt | navn+klub |
| id:157808 | Helene Poulsen | ukendt | ukendt | 157808 | 5606 | ukendt | ukendt | ukendt | 2013:5; 2014:5 | ukendt | ukendt | ukendt | navn+klub |
| id:332132 | Helga Kjersgaard Olesen | ukendt | ukendt | 332132 | 2583 | ukendt | kvinde | ukendt | 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:359047 | Helle Juel-berg | ukendt | 359047 | 359047 | 653 | Gladsaxe Søborg; Gladsaxe Søborg (g) | kvinde | ukendt | 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:212627 | Helle Larsen | ukendt | 212627 | 212627 | ukendt | Gladsaxe Søborg | kvinde | ukendt | 2012:11; 2012:9; 2013:11; 2013:12; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2023:13; 2024:11; 2024:13 | ukendt | ukendt | ukendt | entydig på ID |
| name:helle larsen | Helle Larsen | ukendt | ukendt | ukendt | 1740 | ukendt | ukendt | ukendt | 2012:11; 2012:9; 2013:11; 2013:12; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2021:17; 2021:9; 2022:11; 2022:13; 2022:17; 2023:13; 2023:17; 2024:11; 2024:13 | ukendt | ukendt | ukendt | ingen |
| id:212836 | Helle Mathiasen | ukendt | 212836 | 212836 | 363 | Gladsaxe Søborg | kvinde | ukendt | 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:6445 | Helle Vibeke Bust | ukendt | ukendt | 6445 | 2125 | ukendt | kvinde | ukendt | 2012:11; 2015:11; 2016:11; 2017:11; 2023:9 | ukendt | ukendt | ukendt | navn+klub |
| id:211895 | Helle Willer | ukendt | ukendt | 211895 | 4253 | ukendt | kvinde | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:9 | ukendt | ukendt | ukendt | navn+klub |
| id:340978 | Henrick Villemoes Poulsen | ukendt | 340978 | 340978 | 650 | Gladsaxe Søborg | mand | ukendt | 2023:1; 2024:1; 2025:1; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:212703 | Henrik Bach-Nielsen | ukendt | ukendt | 212703 | 2779 | ukendt | mand | ukendt | 2012:9; 2013:1; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2021:11; 2021:9 | ukendt | ukendt | ukendt | navn+klub |
| id:157084 | Henrik Hjorth | ukendt | ukendt | 157084 | ukendt | ukendt | mand | ukendt | 2013:11; 2014:11; 2014:9; 2015:11; 2015:9; 2016:9 | ukendt | ukendt | ukendt | ingen |
| name:henrik hjorth | Henrik Hjorth | ukendt | ukendt | ukendt | 3902 | ukendt | ukendt | ukendt | 2013:11; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9 | ukendt | ukendt | ukendt | ingen |
| id:12010 | Henrik Ingerslev | ukendt | ukendt | 12010 | 3356 | ukendt | mand | ukendt | 2018:9 | ukendt | ukendt | ukendt | navn+klub |
| id:229013 | henrik perregaard | ukendt | 229013 | 229013 | 1158 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2013:11; 2013:12; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2023:11; 2023:13; 2024:11; 2024:13; 2025:11; 2025:13; 2026:11 | ja | ja | ukendt | entydig på ID |
| id:210510 | Henrik Vilhelmsen | ukendt | 210510 | 210510 | ukendt | BC KVIK Kbh. | mand | ukendt | 2022:9 | ukendt | ukendt | ukendt | entydig på ID |
| name:henrik vilhelmsen | Henrik Vilhelmsen | ukendt | ukendt | ukendt | 1023 | ukendt | ukendt | ukendt | 2022:11; 2022:9 | ukendt | ukendt | ukendt | ingen |
| id:330539 | Henrik Vilhemsen | ukendt | ukendt | 330539 | 2195 | ukendt | mand | ukendt | 2021:11; 2021:9; 2023:11; 2023:9 | ukendt | ukendt | ukendt | kun navn |
| id:320089 | Hjalte Palmqvist | ukendt | 320089 | 320089 | 5298 | Gladsaxe Søborg | mand | ukendt | 2022:5; 2023:18; 2023:5; 2024:18; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:293501 | Hjørdis Hansen | ukendt | 293501 | 293501 | 5207 | Frederiksberg | kvinde | ukendt | 2020:17 | ukendt | ukendt | ukendt | entydig på ID |
| id:291759 | Holger Tscherning Lindholm | Holger Lindholm | 291759 | 291759 | 232 | Vanløse; Vanløse (g) | mand | ukendt | 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:346299 | Hrtivi Thakkar | ukendt | 346299 | 346299 | 1859 | Gentofte | kvinde | ukendt | 2023:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:337811 | Hugo Ehlerth Jørgensen | ukendt | ukendt | 337811 | 6460 | ukendt | ukendt | ukendt | 2022:2 | ukendt | ukendt | ukendt | navn+klub |
| id:362345 | Hugo Logo Lambertsen | ukendt | 362345 | 362345 | 7233 | Gladsaxe Søborg | mand | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:356933 | Ian Park | ukendt | 356933 | 356933 | 212 | Gladsaxe Søborg | mand | ukendt | 2025:18 | ja | ukendt | ukendt | entydig på ID |
| id:355880 | Ida Dam Drabæk | ukendt | 355880 | 355880 | ukendt | Gladsaxe Søborg; KSI Badmintonklub Kbh. | kvinde | ukendt | ukendt | ukendt | ukendt | ukendt | entydig på ID |
| id:345948 | Ida Louise Jørgensen | ukendt | ukendt | 345948 | 1914 | ukendt | kvinde | ukendt | 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:355095 | Idhant Ghosh Dastidar | ukendt | 355095 | 355095 | 6842 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| name:ikke fremmødt | Ikke fremmødt | ukendt | ukendt | ukendt | 176 | ukendt | ukendt | ukendt | 2013:1; 2013:11; 2013:4; 2015:1; 2017:18; 2021:1; 2021:5; 2021:9; 2022:1; 2022:3; 2023:1; 2023:4; 2023:5; 2025:1; 2025:5; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:356141 | Ilyas Ali | ukendt | 356141 | 356141 | 7018 | Gladsaxe Søborg | mand | ukendt | 2024:3 | ukendt | ukendt | ukendt | entydig på ID |
| id:361675 | Ina Bagge Køhler | ukendt | ukendt | 361675 | 5430 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:167944 | Inge Lise Keldsbo | ukendt | ukendt | 167944 | 3974 | ukendt | kvinde | ukendt | 2012:9; 2015:9; 2016:13 | ukendt | ukendt | ukendt | navn+klub |
| id:4839 | Inge May Hansen | ukendt | ukendt | 4839 | 4728 | ukendt | kvinde | ukendt | 2012:13; 2012:9; 2013:13; 2013:9 | ukendt | ukendt | ukendt | navn+klub |
| id:364515 | Ingrid Bech | ukendt | ukendt | 364515 | 7466 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:344337 | Ingvar Forman | ukendt | 344337 | 344337 | 6767 | Gladsaxe Søborg | mand | ukendt | 2023:4; 2024:5; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:4899 | Irene Sterlie | ukendt | 4899 | 4899 | 1111 | Gladsaxe Søborg | kvinde | ukendt | 2012:11; 2012:13; 2012:9; 2013:1; 2013:11; 2013:12; 2013:13; 2013:9; 2014:11; 2014:13; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:13; 2016:9; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:13; 2020:17; 2020:9; 2021:11; 2021:13; 2021:17; 2021:9; 2022:11; 2022:13; 2022:17; 2022:9; 2023:11; 2023:13; 2023:17; 2023:9; 2024:11; 2024:13; 2024:17; 2025:11 | ja (identitet uafklaret) | ukendt | ukendt | entydig på ID |
| id:301851 | Isabella Frisch Erichsen | ukendt | 301851 | 301851 | 2585 | BC37 Amager | kvinde | ukendt | 2019:3; 2021:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:346763 | Isaiah Oluwatobi St Hilaire | ukendt | ukendt | 346763 | 6675 | ukendt | ukendt | ukendt | 2023:4 | ukendt | ukendt | ukendt | navn+klub |
| id:344483 | Isak Riis Stidsen | ukendt | 344483 | 344483 | 6607 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:366775 | Ishal Ali | ukendt | 366775 | 366775 | ukendt | Gladsaxe Søborg | kvinde | ukendt | 2026:4 | ukendt | ja | ukendt | entydig på ID |
| id:334670 | Jacob Bloch Schousboe | ukendt | ukendt | 334670 | 5233 | ukendt | ukendt | ukendt | 2022:18 | ukendt | ukendt | ukendt | navn+klub |
| id:247243 | Jacob Gowland Jørgensen | ukendt | ukendt | 247243 | 4770 | ukendt | mand | ukendt | 2013:9 | ukendt | ukendt | ukendt | navn+klub |
| id:333734 | Jacob Hinge Carlsson | ukendt | ukendt | 333734 | 2771 | ukendt | mand | ukendt | 2021:9 | ukendt | ukendt | ukendt | kun navn |
| id:12358 | Jakob Arfelt | ukendt | ukendt | 12358 | 2284 | ukendt | mand | ukendt | 2010:1; 2011:1; 2012:1 | ukendt | ukendt | ukendt | navn+klub |
| id:211704 | Jakob Buus Nyeng | ukendt | 211704 | 211704 | 2884 | Greve | mand | ukendt | 2013:3; 2014:4; 2015:5; 2016:5; 2017:5; 2018:18; 2019:1; 2020:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:364878 | Jakob Hartvig Thomsen | ukendt | ukendt | 364878 | 635 | ukendt | mand | ukendt | 2025:1 | ja | ukendt | ukendt | navn+klub |
| id:265214 | Jakob Landler | ukendt | ukendt | 265214 | 3875 | ukendt | mand | ukendt | 2015:1; 2016:1 | ukendt | ukendt | ukendt | navn+klub |
| id:346296 | Jakob Lebeck Frederiksen | ukendt | 346296 | 346296 | 205 | Gladsaxe Søborg; Haarby Efterskole | mand | ukendt | 2023:5; 2024:18; 2024:5; 2025:1; 2025:18; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:247241 | Jakob Villadsen | ukendt | ukendt | 247241 | 4766 | ukendt | mand | ukendt | 2013:9 | ukendt | ukendt | ukendt | kun navn |
| id:365297 | Jakob Wiborg | ukendt | 365297 | 365297 | 721 | Lundtofte | mand | ukendt | 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:211952 | Jan Hindsbo | ukendt | 211952 | 211952 | 2199 | Charlottenlund | mand | ukendt | 2012:9; 2013:9; 2014:9; 2015:1; 2015:9; 2016:1; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:212155 | Jan Holzmann Rasmussen | ukendt | 212155 | 212155 | 1782 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:9; 2013:9; 2014:11; 2014:13; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2023:11; 2023:13; 2023:9; 2024:11; 2024:13; 2024:17; 2025:13; 2025:17 | ja | ukendt | ukendt | entydig på ID |
| id:237863 | Jan Høst | ukendt | ukendt | 237863 | 2496 | ukendt | mand | ukendt | 2013:1; 2013:9; 2014:1; 2014:9; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:360676 | Jan Pedersen | ukendt | 360676 | 360676 | ukendt | Gladsaxe Søborg | mand | ukendt | 2025:1 | ja | ukendt | ukendt | entydig på ID |
| name:jan pedersen | Jan Pedersen | ukendt | ukendt | ukendt | 740 | ukendt | ukendt | ukendt | 2025:1; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:337692 | Jan Søborg Meinertz | ukendt | 337692 | 337692 | 572 | Gladsaxe Søborg | mand | ukendt | 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:251432 | Janne Lyhne Abdul | ukendt | ukendt | 251432 | 2476 | ukendt | kvinde | ukendt | 2014:9; 2015:1; 2015:9; 2016:9; 2017:9; 2018:9; 2019:9; 2020:9; 2021:9; 2022:11; 2022:9 | ukendt | ukendt | ukendt | navn+klub |
| id:79425 | Jannik Due | ukendt | ukendt | 79425 | 2611 | ukendt | mand | ukendt | 2019:1; 2020:1; 2021:1 | ukendt | ukendt | ukendt | navn+klub |
| id:344162 | Jannik Farup | ukendt | 344162 | 344162 | 683 | Gladsaxe Søborg | mand | ukendt | 2023:1; 2024:1; 2025:1; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:353421 | Jasmine Abdelqadir | ukendt | 353421 | 353421 | 1324 | Gladsaxe Søborg | kvinde | ukendt | 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:212378 | Jeanette Keilstrup | ukendt | ukendt | 212378 | 3908 | ukendt | kvinde | ukendt | 2012:9; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:9 | ukendt | ukendt | ukendt | navn+klub |
| id:361741 | Jens Antonio Manfredi Willumsen | ukendt | 361741 | 361741 | 7219 | Gladsaxe Søborg | mand | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:337313 | Jens Møller | ukendt | 337313 | 337313 | ukendt | Gladsaxe Søborg | mand | ukendt | 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| name:jens møller | Jens Møller | ukendt | ukendt | ukendt | 488 | ukendt | ukendt | ukendt | 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:157626 | Jens Perregaard | ukendt | ukendt | 157626 | 5127 | ukendt | ukendt | ukendt | 2012:5; 2013:6 | ukendt | ukendt | ukendt | navn+klub |
| id:272040 | Jens Rosendal Hansen | ukendt | ukendt | 272040 | 3862 | ukendt | mand | ukendt | 2015:1; 2016:1 | ukendt | ukendt | ukendt | navn+klub |
| id:213499 | Jens Undén | ukendt | ukendt | 213499 | 3712 | ukendt | mand | ukendt | 2013:3; 2014:4; 2015:4; 2016:5; 2017:5 | ukendt | ukendt | ukendt | navn+klub |
| name:jes rasmussen | Jes Rasmussen | ukendt | ukendt | ukendt | 4714 | ukendt | ukendt | ukendt | 2012:11; 2013:11; 2013:9 | ukendt | ukendt | ukendt | ingen |
| id:211892 | Jesper Hellerøe | ukendt | ukendt | 211892 | 4247 | ukendt | mand | ukendt | 2012:9; 2013:9; 2015:9 | ukendt | ukendt | ukendt | navn+klub |
| id:155947 | Jesper Hyldal | ukendt | 155947 | 155947 | 526 | Gladsaxe Søborg | mand | ukendt | 2012:9; 2013:9; 2014:9; 2015:1; 2015:9; 2016:9; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:1; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9; 2026:11 | ja | ja | ukendt | entydig på ID |
| id:299938 | Jesper Isager-Sally | ukendt | ukendt | 299938 | 2492 | ukendt | mand | ukendt | 2021:9; 2022:9 | ukendt | ukendt | ukendt | kun navn |
| id:212398 | Jesper Norup Johansen | ukendt | ukendt | 212398 | 2246 | ukendt | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2018:11; 2018:9; 2019:11; 2019:13; 2019:9; 2021:11; 2021:9; 2022:11; 2022:13; 2023:13 | ukendt | ukendt | ukendt | navn+klub |
| id:273263 | Jesper Schaarup | ukendt | ukendt | 273263 | 4170 | ukendt | mand | ukendt | 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:337798 | Jesper Yan | ukendt | 337798 | 337798 | 6454 | Gladsaxe Søborg | mand | ukendt | 2022:2; 2023:3; 2024:3; 2025:4; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:13697 | Jimmy Jensen | ukendt | 13697 | 13697 | 1487 | PI København; PI København (g) | mand | ukendt | 2010:1; 2011:1; 2014:1; 2023:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:352963 | Jingyi Victoria Han | ukendt | 352963 | 352963 | 5422 | Gladsaxe Søborg | kvinde | ukendt | 2024:2; 2025:2; 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:226220 | Johan Alexander Hausgaard | ukendt | ukendt | 226220 | 5100 | ukendt | ukendt | ukendt | 2012:6 | ukendt | ukendt | ukendt | navn+klub |
| id:358993 | Johan Lundsbye Smistrup | ukendt | 358993 | 358993 | 6885 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:364410 | Johan Lyck-Andersen | ukendt | ukendt | 364410 | 7432 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:331377 | Johanne Brogaard Baltzer | ukendt | 331377 | 331377 | 1299 | Gentofte | kvinde | ukendt | 2021:2; 2022:3; 2023:3; 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:196239 | Johannes Egtved Møller | ukendt | ukendt | 196239 | 5504 | ukendt | ukendt | ukendt | 2012:4 | ukendt | ukendt | ukendt | navn+klub |
| id:251666 | Johannes Wolff | ukendt | ukendt | 251666 | 5649 | ukendt | ukendt | ukendt | 2014:3 | ukendt | ukendt | ukendt | navn+klub |
| id:211921 | John Kørboe | ukendt | 211921 | 211921 | 962 | Gladsaxe Søborg | mand | ukendt | 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:13; 2024:9; 2025:11; 2025:13; 2025:9; 2026:11; 2026:13 | ja | ja | ukendt | entydig på ID |
| id:310488 | Johnny Hallas | ukendt | ukendt | 310488 | 3131 | ukendt | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2015:11; 2015:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9 | ukendt | ukendt | ukendt | navn+klub |
| id:11532 | Johs Sterlie | ukendt | ukendt | 11532 | 3061 | ukendt | mand | ukendt | 2012:1; 2013:1; 2014:1; 2015:1; 2017:1; 2017:9; 2018:1; 2018:9; 2019:1; 2019:9 | ukendt | ukendt | ukendt | navn+klub |
| id:214374 | Jon Maaløv Holm | ukendt | ukendt | 214374 | 4885 | ukendt | mand | ukendt | 2012:1 | ukendt | ukendt | ukendt | navn+klub |
| id:251667 | Jonas Abildgaard | ukendt | ukendt | 251667 | ukendt | ukendt | ukendt | ukendt | 2014:3 | ukendt | ukendt | ukendt | ingen |
| name:jonas abildgaard | Jonas Abildgaard | ukendt | ukendt | ukendt | 5651 | ukendt | ukendt | ukendt | 2014:3 | ukendt | ukendt | ukendt | ingen |
| id:94962 | Jonas B. L. Petersen | ukendt | ukendt | 94962 | 5500 | ukendt | ukendt | ukendt | 2012:4 | ukendt | ukendt | ukendt | navn+klub |
| id:346563 | Jonas Felk Øster | ukendt | 346563 | 346563 | 5340 | Gladsaxe Søborg | mand | ukendt | 2024:18; 2026:18 | ukendt | ja | ukendt | entydig på ID |
| id:331880 | Jonas Lykke Adamsen | ukendt | ukendt | 331880 | 6280 | ukendt | ukendt | ukendt | 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:60460 | Jonas Møller | ukendt | 60460 | 60460 | ukendt | Klarup Badminton | mand | ukendt | 2018:1 | ukendt | ukendt | ukendt | entydig på ID |
| name:jonas møller | Jonas Møller | ukendt | ukendt | ukendt | 3327 | ukendt | ukendt | ukendt | 2018:1 | ukendt | ukendt | ukendt | ingen |
| id:13532 | Jonas Niebling | ukendt | 13532 | 13532 | 639 | Gladsaxe Søborg | mand | ukendt | 2010:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2023:9; 2024:9; 2025:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:328192 | Jonas P. Hamann | ukendt | ukendt | 328192 | 6106 | ukendt | ukendt | ukendt | 2020:2 | ukendt | ukendt | ukendt | navn+klub |
| id:92509 | Jonas Trusell-Jensen | ukendt | 92509 | 92509 | 228 | Gladsaxe Søborg | mand | ukendt | 2012:5; 2013:6; 2014:1; 2014:6; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:361768 | Jonathan Nielsen | ukendt | 361768 | 361768 | ukendt | Gladsaxe Søborg | mand | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| name:jonathan nielsen | Jonathan Nielsen | ukendt | ukendt | ukendt | 1952 | ukendt | ukendt | ukendt | 2025:2 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:93216 | Jonathan W. Hansen | Jonathan Hansen | 93216 | 93216 | ukendt | Gladsaxe Søborg | mand | ukendt | 2012:4; 2013:5; 2014:5; 2015:1; 2016:1; 2017:1; 2017:18; 2018:1; 2018:18; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ukendt | entydig på ID |
| name:jonathan w. hansen | Jonathan W. Hansen | Jonathan Hansen | ukendt | ukendt | 226 | ukendt | mand | ukendt | 2012:4; 2013:5; 2014:5; 2015:1; 2016:1; 2017:1; 2017:18; 2018:1; 2018:18; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1 | ja (identitet uafklaret) | ukendt | ja | ingen |
| id:159243 | Josefine Guldbæk | ukendt | ukendt | 159243 | 2909 | ukendt | kvinde | ukendt | 2012:3; 2013:4; 2014:4; 2015:4; 2015:5; 2016:5; 2017:18; 2019:1; 2020:1 | ukendt | ukendt | ukendt | navn+klub |
| id:367072 | Josefine Nimal | ukendt | 367072 | ukendt | ukendt | Gladsaxe Søborg | kvinde | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:49674 | Josefine Tusindfryd | ukendt | ukendt | 49674 | 5053 | ukendt | kvinde | ukendt | 2010:1 | ukendt | ukendt | ukendt | navn+klub |
| id:361951 | Josephine Geil Christophersen | ukendt | ukendt | 361951 | 5428 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:330769 | Joshua Pasgaard-Westerman | ukendt | ukendt | 330769 | 6176 | ukendt | ukendt | ukendt | 2021:3 | ukendt | ukendt | ukendt | navn+klub |
| id:58156 | Julie Irby | ukendt | 58156 | 58156 | 1457 | Charlottenlund | kvinde | ukendt | 2013:1; 2014:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:327384 | Julie Isager | ukendt | ukendt | 327384 | 2869 | ukendt | kvinde | ukendt | 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:365629 | Julie Reholt | ukendt | 365629 | ukendt | ukendt | Gladsaxe Søborg | kvinde | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:330917 | Julie Storgaard Scheibel | ukendt | 330917 | 330917 | 204 | Gladsaxe Søborg | kvinde | ukendt | 2021:5; 2025:1; 2025:18 | ja | ukendt | ukendt | entydig på ID |
| id:352962 | Julius Ingvar Anker Mikkelsen | ukendt | 352962 | 352962 | 6963 | Gladsaxe Søborg | mand | ukendt | 2024:2 | ukendt | ukendt | ukendt | entydig på ID |
| id:363334 | Juncheng Yumao | ukendt | 363334 | 363334 | 7299 | Gladsaxe Søborg | mand | ukendt | 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:211949 | Jytte Jessen | ukendt | ukendt | 211949 | 4242 | ukendt | kvinde | ukendt | 2013:9; 2015:9 | ukendt | ukendt | ukendt | navn+klub |
| id:242492 | Kambiz Safiri | ukendt | ukendt | 242492 | 3672 | ukendt | mand | ukendt | 2013:9; 2014:9; 2015:9; 2016:9; 2017:11; 2017:9 | ukendt | ukendt | ukendt | navn+klub |
| id:327385 | Kamille Møller Glendorf | ukendt | ukendt | 327385 | 2867 | ukendt | kvinde | ukendt | 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:13011 | Kanva Simonsen | ukendt | ukendt | 13011 | 4181 | ukendt | kvinde | ukendt | 2014:1; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:358855 | Karen Obling | ukendt | 358855 | 358855 | 1718 | Gladsaxe Søborg | kvinde | ukendt | 2024:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:280998 | Karina Nørgaard | ukendt | 280998 | 280998 | ukendt | Bagsværd; Gladsaxe Søborg | kvinde | ukendt | 2026:11 | ukendt | ja | ukendt | entydig på ID |
| id:211937 | Karl Jørn Nielsen | ukendt | ukendt | 211937 | 4507 | ukendt | mand | ukendt | 2014:9 | ukendt | ukendt | ukendt | kun navn |
| id:352607 | Karla Rifsdal Petersen | ukendt | 352607 | 352607 | ukendt | Badminton Roskilde | kvinde | ukendt | 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:250321 | Kaspar Andreasen | ukendt | ukendt | 250321 | 2224 | ukendt | mand | ukendt | 2023:11; 2023:13; 2023:9 | ukendt | ukendt | ukendt | navn+klub |
| id:287715 | Kasper Buus | ukendt | ukendt | 287715 | ukendt | ukendt | mand | ukendt | 2018:9 | ukendt | ukendt | ukendt | ingen |
| name:kasper buus | Kasper Buus | ukendt | ukendt | ukendt | 2935 | ukendt | ukendt | ukendt | 2017:9; 2018:9; 2020:9 | ukendt | ukendt | ukendt | ingen |
| id:261874 | Kasper Gorm | ukendt | 261874 | 261874 | 5750 | Lyngby | mand | ukendt | 2015:3; 2016:3; 2017:4; 2017:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:157811 | Kasper Just Hjortshøj | ukendt | ukendt | 157811 | 5539 | ukendt | ukendt | ukendt | 2012:5 | ukendt | ukendt | ukendt | navn+klub |
| id:330737 | Kasper Mason | ukendt | ukendt | 330737 | 6129 | ukendt | ukendt | ukendt | 2021:2; 2022:3 | ukendt | ukendt | ukendt | navn+klub |
| id:356303 | Kasper Viktor Petersen | ukendt | 356303 | 356303 | 738 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:211444 | Katharina Rahbek | ukendt | ukendt | 211444 | 5510 | ukendt | kvinde | ukendt | 2012:5 | ukendt | ukendt | ukendt | navn+klub |
| id:280912 | Kathrine Blichsted Brauer | ukendt | 280912 | 280912 | 1691 | Gladsaxe Søborg | kvinde | ukendt | 2016:1; 2018:9; 2019:9; 2021:9; 2024:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:310451 | Kathrine Blichsted Braur | ukendt | ukendt | 310451 | 2489 | ukendt | kvinde | ukendt | 2018:9; 2022:9 | ukendt | ukendt | ukendt | navn+klub |
| id:352900 | Katia Lundby Bresemann | ukendt | 352900 | 352900 | 9 | Gladsaxe Søborg | kvinde | ukendt | 2024:3; 2024:4; 2025:4; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:31186 | Katrine Dehn | ukendt | ukendt | 31186 | ukendt | ukendt | kvinde | ukendt | 2016:1; 2017:1; 2018:1 | ukendt | ukendt | ukendt | ingen |
| name:katrine dehn | Katrine Dehn | ukendt | ukendt | ukendt | 3329 | ukendt | ukendt | ukendt | 2016:1; 2017:1; 2018:1 | ukendt | ukendt | ukendt | ingen |
| id:319834 | Kenn Blæsbjerg Christensen | ukendt | 319834 | 319834 | 296 | Gladsaxe Søborg | mand | ukendt | 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ja | entydig på ID |
| id:7596 | Kenneth Christian Jacobsen | ukendt | ukendt | 7596 | 3839 | ukendt | mand | ukendt | 2012:1; 2013:1; 2013:9; 2014:1; 2014:9; 2015:1; 2015:11; 2015:9; 2016:1 | ukendt | ukendt | ukendt | navn+klub |
| id:11171 | Kenneth Hasselby | ukendt | 11171 | 11171 | 219 | Gladsaxe Søborg | mand | ukendt | 2010:1; 2011:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2016:9; 2017:1; 2017:9; 2018:1; 2018:9; 2019:1; 2019:9; 2020:1; 2020:9; 2021:1; 2021:9; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:11; 2026:9 | ja | ja | ja | entydig på ID |
| id:354945 | Kenneth Jørgensen | ukendt | 354945 | 354945 | ukendt | Gladsaxe Søborg | mand | ukendt | 2024:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:354948 | Kenneth Jørgensen | ukendt | 354948 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| name:kenneth jørgensen | Kenneth Jørgensen | ukendt | ukendt | ukendt | 1602 | ukendt | ukendt | ukendt | 2024:1 | ukendt | ukendt | ukendt | ingen |
| id:7446 | Kent Meiling Sørensen | ukendt | 7446 | 7446 | 1728 | Gladsaxe Søborg | mand | ukendt | 2012:9; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:1; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:13 | ukendt | ukendt | ukendt | entydig på ID |
| id:340979 | Kim Bagge | ukendt | 340979 | 340979 | 728 | Gladsaxe Søborg | mand | ukendt | 2023:1; 2024:1; 2025:1; 2025:11; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:296601 | Kim Hansen | ukendt | ukendt | 296601 | ukendt | ukendt | mand | ukendt | 2017:9 | ukendt | ukendt | ukendt | ingen |
| name:kim hansen | Kim Hansen | ukendt | ukendt | ukendt | 305 | ukendt | ukendt | ukendt | 2017:9 | ukendt | ukendt | ukendt | ingen |
| id:211735 | Kim Jørgensen | ukendt | 211735 | 211735 | ukendt | Gladsaxe Søborg | mand | ukendt | 2014:9 | ukendt | ukendt | ukendt | entydig på ID |
| name:kim jørgensen | Kim Jørgensen | ukendt | ukendt | ukendt | 1026 | ukendt | ukendt | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:13; 2019:9; 2022:11; 2022:13; 2022:9; 2023:11; 2023:13; 2024:11; 2024:13; 2025:11; 2025:13; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:334752 | Kim Kristiansen | ukendt | ukendt | 334752 | 2085 | ukendt | mand | ukendt | 2023:1 | ukendt | ukendt | ukendt | navn+klub |
| id:276515 | Klaus Hestehave | ukendt | ukendt | 276515 | 2766 | ukendt | mand | ukendt | 2016:1; 2018:9; 2019:9; 2020:9; 2021:9 | ukendt | ukendt | ukendt | navn+klub |
| id:355096 | Konrad Bybeck Tosev | ukendt | 355096 | 355096 | 6892 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:278557 | Konrad Juul Wurlitzer | ukendt | ukendt | 278557 | 5910 | ukendt | ukendt | ukendt | 2019:4; 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:327518 | Konrad Kunckel | ukendt | 327518 | 327518 | 6100 | Gladsaxe Søborg | mand | ukendt | 2023:5; 2024:5; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:358016 | Konrad Rosenørn | ukendt | 358016 | 358016 | 7027 | Gladsaxe Søborg | mand | ukendt | 2024:3; 2025:3; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:236390 | Kremena Nikolova (EU) | ukendt | ukendt | 236390 | 2291 | ukendt | kvinde | ukendt | 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1 | ukendt | ukendt | ukendt | navn+klub |
| id:346285 | Kristian Almeida Møller | ukendt | 346285 | 346285 | 82 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:11021 | Kristian Boye Nielsen | ukendt | 11021 | 11021 | 462 | Gladsaxe Søborg | mand | ukendt | 2012:1; 2013:1; 2014:1; 2017:1; 2021:1; 2021:9; 2022:1; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:335043 | Kristian Byrialsen | ukendt | 335043 | 335043 | 2463 | Lyngby | mand | ukendt | 2021:1; 2022:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:155845 | Kristian Larson | ukendt | ukendt | 155845 | 3770 | ukendt | mand | ukendt | 2012:5; 2013:5; 2014:1; 2014:6; 2015:1; 2016:1 | ukendt | ukendt | ukendt | navn+klub |
| id:11896 | Kristian Serup | ukendt | 11896 | 11896 | 551 | Gladsaxe Søborg | mand | ukendt | 2012:1; 2013:1; 2015:1; 2019:9; 2020:9; 2021:9; 2023:9; 2024:9; 2025:1; 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:13929 | Kristine Niss Arfelt | ukendt | ukendt | 13929 | 4995 | ukendt | kvinde | ukendt | 2011:1 | ukendt | ukendt | ukendt | navn+klub |
| id:238708 | Kurt Mehlsen | ukendt | 238708 | 238708 | 2830 | BK36 Kbh. | mand | ukendt | 2014:9; 2015:9; 2016:13; 2016:9; 2018:13; 2018:9; 2019:13; 2019:17; 2020:17; 2021:13; 2021:17; 2021:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:211890 | Kurt Rasmussen | ukendt | ukendt | 211890 | ukendt | ukendt | mand | ukendt | 2012:11 | ukendt | ukendt | ukendt | ingen |
| name:kurt rasmussen | Kurt Rasmussen | ukendt | ukendt | ukendt | 4283 | ukendt | ukendt | ukendt | 2012:11; 2012:9; 2013:11; 2014:11; 2015:11 | ukendt | ukendt | ukendt | ingen |
| id:245883 | KWH | ukendt | 245883 | 245883 | 1490 | ukendt | mand | ukendt | 2023:1; 2024:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:251863 | Kåre Michelsen | ukendt | ukendt | 251863 | 3481 | ukendt | mand | ukendt | 2020:17 | ukendt | ukendt | ukendt | kun navn |
| id:229825 | Lars Bistrup-Sørensen | ukendt | ukendt | 229825 | 4893 | ukendt | mand | ukendt | 2012:1 | ukendt | ukendt | ukendt | navn+klub |
| id:14552 | Lasse Bak | ukendt | 14552 | 14552 | 3335 | Ølstykke | mand | ukendt | 2017:1; 2018:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:265307 | Lasse Bjerregaard Kirt | ukendt | ukendt | 265307 | 5759 | ukendt | mand | ukendt | 2015:3; 2016:3; 2017:4; 2019:5; 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:360805 | Lasse Friberg Andersen | ukendt | 360805 | 360805 | 5385 | Gladsaxe Søborg | mand | ukendt | 2025:18; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:80894 | Lasse Hansen | ukendt | ukendt | 80894 | ukendt | ukendt | ukendt | ukendt | 2012:6 | ukendt | ukendt | ukendt | ingen |
| name:lasse hansen | Lasse Hansen | ukendt | ukendt | ukendt | 2706 | ukendt | ukendt | ukendt | 2012:6 | ukendt | ukendt | ukendt | ingen |
| id:332355 | Lauge Bruhn Elnegaard | ukendt | 332355 | 332355 | 1388 | Gladsaxe Søborg | mand | ukendt | 2021:4; 2022:4; 2023:5; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:329075 | Lauge Juul Hornsgaard | ukendt | 329075 | 329075 | 32 | Gladsaxe Søborg | mand | ukendt | 2021:2; 2022:3; 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:62736 | Lauge Nissen | ukendt | ukendt | 62736 | 1965 | ukendt | mand | ukendt | 2012:1; 2013:1; 2014:1; 2018:1; 2019:1; 2020:1; 2021:1 | ukendt | ukendt | ukendt | navn+klub |
| id:364462 | Laura Budtz Backlund | ukendt | 364462 | 364462 | 190 | Gladsaxe Søborg | kvinde | ukendt | 2025:5; 2026:18 | ja | ja | ukendt | entydig på ID |
| id:162627 | Laura Friestrup-Jensen | ukendt | ukendt | 162627 | 5630 | ukendt | ukendt | ukendt | 2013:5 | ukendt | ukendt | ukendt | navn+klub |
| id:364033 | Laura Holm Simonsen | ukendt | 364033 | 364033 | 7399 | Gladsaxe Søborg | kvinde | ukendt | 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:12944 | Laura Kyndborg | ukendt | 12944 | 12944 | 911 | Gladsaxe Søborg | kvinde | ukendt | 2010:1; 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:320949 | Laura Lucia Bruun | ukendt | 320949 | 320949 | ukendt | NBK Amager | kvinde | ukendt | 2022:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:361898 | Laura Skov Keller-Sørensen | ukendt | 361898 | 361898 | 7177 | Gladsaxe Søborg | kvinde | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:346295 | Laurits Lindegaard Hebeltoft | ukendt | ukendt | 346295 | 6666 | ukendt | ukendt | ukendt | 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:321812 | Laurits Lund Fogsgaard Christensen | ukendt | ukendt | 321812 | ukendt | ukendt | ukendt | ukendt | 2022:5 | ukendt | ukendt | ukendt | ingen |
| id:230091 | Laurits Roland Nielsen | ukendt | ukendt | 230091 | 3978 | ukendt | mand | ukendt | 2013:4; 2014:5; 2015:5; 2018:18 | ukendt | ukendt | ukendt | navn+klub |
| id:332696 | Laurits Schjerning Andersen | ukendt | 332696 | 332696 | 128 | Gladsaxe Søborg | mand | ukendt | 2021:2; 2022:3; 2023:3; 2024:4; 2025:4; 2025:5; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:212382 | Leif Hansen | ukendt | 212382 | 212382 | ukendt | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:13; 2014:9; 2015:13; 2015:9; 2016:13; 2016:9; 2017:9; 2018:13; 2018:9; 2019:9; 2020:13; 2021:13; 2023:13; 2024:13 | ukendt | ukendt | ukendt | entydig på ID |
| name:leif hansen | Leif Hansen | ukendt | ukendt | ukendt | 2227 | ukendt | ukendt | ukendt | 2012:11; 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:11; 2014:13; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:17; 2019:9; 2020:11; 2020:13; 2020:17; 2021:11; 2021:13; 2021:17; 2021:9; 2022:11; 2022:13; 2022:17; 2023:11; 2023:13; 2023:17; 2024:13; 2024:17; 2025:13; 2025:17 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:212624 | Leif V. Hansen | ukendt | ukendt | 212624 | ukendt | ukendt | mand | ukendt | 2012:11; 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:13; 2014:9 | ukendt | ukendt | ukendt | ingen |
| name:leif v. hansen | Leif V. Hansen | ukendt | ukendt | ukendt | 4459 | ukendt | ukendt | ukendt | 2012:11; 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:11; 2014:13; 2014:9 | ukendt | ukendt | ukendt | ingen |
| id:164882 | Leila Soon Jørgensen | ukendt | 164882 | 164882 | 795 | Drive | kvinde | ukendt | 2021:1; 2021:9; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:11; 2024:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:10421 | Lena Bigum Vang | Lena Vang | 10421 | 10421 | 1513 | Gladsaxe Søborg | kvinde | ukendt | 2010:1; 2011:1; 2012:1; 2013:1; 2014:1; 2014:9; 2015:1; 2015:9; 2016:1; 2016:9; 2017:1; 2017:9; 2018:1; 2018:9; 2019:1; 2019:9; 2021:1; 2021:9; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:11; 2024:9 | ukendt | ukendt | ukendt | entydig på ID |
| id:42004 | Lena Remfeldt | ukendt | ukendt | 42004 | 3582 | ukendt | kvinde | ukendt | 2017:1 | ukendt | ukendt | ukendt | navn+klub |
| id:348100 | Lene Offersgaard | ukendt | 348100 | 348100 | 1601 | Gladsaxe Søborg | kvinde | ukendt | 2023:1; 2024:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:14764 | Lene Sørensen | ukendt | 14764 | 14764 | ukendt | Gladsaxe Søborg | kvinde | ukendt | 2011:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1; 2025:1; 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| name:lene sørensen | Lene Sørensen | ukendt | ukendt | ukendt | 461 | ukendt | kvinde | ukendt | 2011:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1; 2025:1; 2025:9 | ja (identitet uafklaret) | ukendt | ja | ingen |
| id:166790 | Lene Thrysøe | ukendt | 166790 | 166790 | 1165 | Gladsaxe Søborg | kvinde | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:1; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:13; 2020:9; 2021:11; 2021:13; 2021:9; 2022:11; 2022:9; 2023:11; 2024:11; 2024:13; 2024:9; 2025:11; 2025:13; 2026:11; 2026:13 | ja | ja | ukendt | entydig på ID |
| id:211889 | Lennart Høy | ukendt | 211889 | 211889 | 1149 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2022:9; 2023:11; 2023:13; 2023:9; 2024:11; 2024:13; 2025:11; 2025:13; 2026:11 | ja | ja | ukendt | entydig på ID |
| id:364514 | Lily Amelia Stanley Jørgensen | ukendt | 364514 | 364514 | 7187 | Gladsaxe Søborg | kvinde | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:16498 | Linda Bækgaard | ukendt | 16498 | 16498 | 471 | Gladsaxe Søborg | kvinde | ukendt | 2012:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1 | ja (identitet uafklaret) | ukendt | ja | entydig på ID |
| id:31258 | Line Irby | ukendt | ukendt | 31258 | 3583 | ukendt | kvinde | ukendt | 2013:1; 2014:1 | ukendt | ukendt | ukendt | navn+klub |
| id:311104 | Line Lindhardt | ukendt | ukendt | 311104 | ukendt | ukendt | kvinde | ukendt | 2019:1 | ukendt | ukendt | ukendt | ingen |
| name:line lindhardt | Line Lindhardt | ukendt | ukendt | ukendt | 3051 | ukendt | ukendt | ukendt | 2019:1 | ukendt | ukendt | ukendt | ingen |
| id:14375 | Line Nielsen | ukendt | 14375 | 14375 | ukendt | Gladsaxe Søborg | kvinde | ukendt | 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| name:line nielsen | Line Nielsen | ukendt | ukendt | ukendt | 218 | ukendt | kvinde | ukendt | 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2024:9; 2025:1; 2025:9 | ja (identitet uafklaret) | ukendt | ja | ingen |
| id:361611 | Linus Berggreen | ukendt | 361611 | 361611 | 7189 | Gladsaxe Søborg | mand | ukendt | 2025:3; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:293768 | Linus Bergström Hesselballe | Linus Bergstrøm Hesselballe | 293768 | 293768 | 476 | Gladsaxe Søborg | mand | ukendt | 2017:3; 2018:3; 2018:4; 2019:4; 2020:5; 2021:5; 2022:1; 2022:18; 2023:1; 2023:18; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:211096 | Lisa Munch Andersen | ukendt | 211096 | 211096 | 1781 | Gladsaxe Søborg | kvinde | ukendt | 2019:11; 2019:9; 2021:11; 2021:13; 2022:11; 2022:13; 2024:11; 2024:13 | ukendt | ukendt | ukendt | entydig på ID |
| id:211897 | Lisbeth Cappelen | ukendt | ukendt | 211897 | 3404 | ukendt | kvinde | ukendt | 2012:1; 2012:9; 2013:9; 2014:9; 2015:1; 2015:9; 2016:9; 2017:9; 2018:9 | ukendt | ukendt | ukendt | navn+klub |
| id:6147 | Lisbeth Laursen | ukendt | 6147 | 6147 | 1080 | Gladsaxe Søborg | kvinde | ukendt | 2012:1; 2012:11; 2012:9; 2013:1; 2013:11; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:9; 2017:1; 2017:11; 2017:9; 2018:1; 2018:11; 2018:9; 2019:11; 2019:13; 2019:9; 2020:13; 2025:11; 2025:13; 2025:17; 2025:9; 2026:13 | ja | ja | ukendt | entydig på ID |
| id:224186 | Liselotte Hermansen | ukendt | 224186 | 224186 | 1164 | Gladsaxe Søborg | kvinde | ukendt | 2012:9; 2013:9; 2015:9; 2019:9; 2020:9; 2021:9; 2022:9; 2023:11; 2024:11; 2024:9; 2025:11 | ja | ukendt | ukendt | entydig på ID |
| id:166767 | Liselotte Seider | ukendt | 166767 | 166767 | 585 | Gladsaxe Søborg | kvinde | ukendt | 2012:9; 2013:9; 2014:9; 2015:1; 2015:9; 2016:9; 2017:1; 2017:9; 2018:1; 2018:9; 2019:1; 2019:11; 2019:9; 2020:1; 2020:11; 2020:9; 2021:1; 2021:11; 2021:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9; 2026:1; 2026:11; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:327770 | Loke Kristiansen | ukendt | ukendt | 327770 | 6278 | ukendt | ukendt | ukendt | 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:255457 | Lotte Hermansen | ukendt | 255457 | 255457 | 1147 | Gladsaxe Søborg | kvinde | ukendt | 2014:11; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2021:11; 2021:9; 2022:11; 2022:9; 2024:11; 2025:11; 2025:13 | ja | ukendt | ukendt | entydig på ID |
| id:9998 | Lotte Knudsen | ukendt | ukendt | 9998 | 3129 | ukendt | kvinde | ukendt | 2016:9; 2017:9; 2018:9; 2019:9 | ukendt | ukendt | ukendt | navn+klub |
| id:314939 | Loui Stenbæk | ukendt | 314939 | 314939 | 6068 | Gladsaxe Søborg | mand | ukendt | 2020:4; 2021:4; 2021:5; 2022:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:330770 | Louis Valdemar Hedegaard Toftlund | Louis Toftlund | 330770 | 330770 | 66 | Gladsaxe Søborg | mand | ukendt | 2021:3; 2022:4; 2023:4; 2024:5; 2025:4; 2025:5; 2026:1; 2026:18 | ja | ja | ja | entydig på ID |
| id:12172 | Louise Korsby Kofoed | Louise Kofoed | 12172 | 12172 | 340 | Gladsaxe Søborg | kvinde | ukendt | 2021:1; 2021:9; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ja | entydig på ID |
| id:337802 | Luc Nørmark Jespersen | ukendt | 337802 | 337802 | 85 | Gladsaxe Søborg | mand | ukendt | 2022:3; 2023:3; 2024:4; 2025:4; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:271678 | Lucas Løndal | ukendt | ukendt | 271678 | 5766 | ukendt | ukendt | ukendt | 2015:3; 2017:4 | ukendt | ukendt | ukendt | navn+klub |
| id:327293 | Ludvig Alexander Rosager Pedas | ukendt | 327293 | 327293 | 93 | Gladsaxe Søborg | mand | ukendt | 2020:2; 2020:3; 2021:3; 2022:3; 2023:4; 2024:4; 2025:5; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:356979 | Ludvig Maunuksela Voss | ukendt | 356979 | 356979 | 5375 | Gladsaxe Søborg | mand | ukendt | 2024:5; 2025:18; 2026:18 | ja | ja | ukendt | entydig på ID |
| id:355141 | Ludvig Rydhof Thor Hansen | ukendt | 355141 | 355141 | 6861 | Gladsaxe Søborg | mand | ukendt | 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:356314 | Lukas Ferdinandsen | ukendt | 356314 | 356314 | 6869 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:346414 | Lukas Glaring | ukendt | 346414 | 346414 | 6747 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:359423 | Lukas Hansen | ukendt | 359423 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:12967 | Luke O´Connor Chen | ukendt | ukendt | 12967 | 3549 | ukendt | mand | ukendt | 2011:1; 2016:1; 2017:1 | ukendt | ukendt | ukendt | navn+klub |
| id:287531 | Lykke Unden | ukendt | 287531 | 287531 | 2871 | Gladsaxe Søborg | kvinde | ukendt | 2017:3; 2018:3; 2018:4; 2022:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:322898 | Mads Baltzer | ukendt | 322898 | 322898 | 6089 | Hjemly Idrætsefterskole (g); KBK Kbh. | mand | ukendt | 2020:4; 2021:4; 2022:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:344335 | Mads Broholm | ukendt | 344335 | 344335 | 11 | Gladsaxe Søborg; Gladsaxe Søborg (g) | mand | ukendt | 2023:3; 2024:4; 2025:4; 2026:18 | ja | ja | ukendt | entydig på ID |
| id:237724 | Mads Holdgaard | ukendt | ukendt | 237724 | ukendt | ukendt | ukendt | ukendt | 2013:3 | ukendt | ukendt | ukendt | ingen |
| name:mads holdgaard | Mads Holdgaard | ukendt | ukendt | ukendt | 5587 | ukendt | ukendt | ukendt | 2013:3 | ukendt | ukendt | ukendt | ingen |
| id:14003 | Mads Kærgaard Wissing | ukendt | ukendt | 14003 | 3271 | ukendt | mand | ukendt | 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1 | ukendt | ukendt | ukendt | navn+klub |
| id:337788 | Mads Kaarsberg Andersen | ukendt | 337788 | 337788 | 6399 | Gladsaxe Søborg | mand | ukendt | 2022:3; 2022:4; 2023:4; 2024:5; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:211708 | Mads Laursen | ukendt | ukendt | 211708 | ukendt | ukendt | ukendt | ukendt | 2012:3 | ukendt | ukendt | ukendt | ingen |
| name:mads laursen | Mads Laursen | ukendt | ukendt | ukendt | 5451 | ukendt | ukendt | ukendt | 2012:3 | ukendt | ukendt | ukendt | ingen |
| id:115724 | Mads Lyhne Bischoff | ukendt | ukendt | 115724 | 4091 | ukendt | mand | ukendt | 2012:5; 2013:6; 2014:1; 2014:6; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:331884 | Mads Scheibel Borgen Paulsen | ukendt | 331884 | 331884 | 6258 | Haarby Efterskole | mand | ukendt | 2021:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:310144 | Mads Vinding | ukendt | ukendt | 310144 | 5964 | ukendt | ukendt | ukendt | 2018:3 | ukendt | ukendt | ukendt | navn+klub |
| id:311268 | Magne Elbrønd-Bek | ukendt | 311268 | 311268 | ukendt | KBK Kbh. | mand | ukendt | 2023:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:339135 | Magne Gjervan Majborn | ukendt | 339135 | 339135 | 41 | Gladsaxe Søborg | mand | ukendt | 2022:3; 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:353204 | Magne Sand Christensen | ukendt | 353204 | 353204 | 7067 | Gladsaxe Søborg | mand | ukendt | 2024:3; 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:340456 | Magnus Filtenborg Lybeck | ukendt | 340456 | 340456 | 6676 | Gladsaxe Søborg | mand | ukendt | 2023:4; 2024:5; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:362925 | Magnus Nørtoft | ukendt | 362925 | 362925 | 622 | Gladsaxe Søborg | mand | ukendt | 2025:1; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:14225 | Maja Simming Jørgensen | ukendt | 14225 | 14225 | 4331 | Hillerød | kvinde | ukendt | 2014:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:223451 | Malte Hvid Ribergaard | ukendt | ukendt | 223451 | 3719 | ukendt | mand | ukendt | 2013:3; 2014:4; 2015:4; 2016:5; 2017:5; 2018:18 | ukendt | ukendt | ukendt | navn+klub |
| id:277770 | Malthe Baltzer | ukendt | 277770 | 277770 | 354 | Gladsaxe Søborg; Gladsaxe Søborg (g) | mand | ukendt | 2016:3; 2017:4; 2019:5; 2020:5; 2021:5; 2022:1; 2022:5; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:355148 | Malthe Egholm Hansen | ukendt | 355148 | 355148 | ukendt | Gladsaxe Søborg | mand | ukendt | 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:61879 | Malthe Mathias Pihl | ukendt | ukendt | 61879 | 4642 | ukendt | mand | ukendt | 2012:1; 2013:1 | ukendt | ukendt | ukendt | navn+klub |
| id:330768 | Manya Bhardwaj | ukendt | 330768 | 330768 | 1390 | Gladsaxe Søborg | kvinde | ukendt | 2021:3; 2021:4; 2022:5; 2023:5; 2024:18; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:308278 | Marcel Yulzari | ukendt | ukendt | 308278 | 3477 | ukendt | mand | ukendt | 2018:13; 2019:17; 2020:17; 2021:17; 2022:17 | ukendt | ukendt | ukendt | kun navn |
| id:242081 | Marcus Langeland Mikkelberg | Marcus Langeland Mikkelberg  | ukendt | 242081 | 4560 | ukendt | mand | ukendt | 2013:4 | ukendt | ukendt | ukendt | navn+klub |
| id:230787 | Maria Hjortshøj | ukendt | ukendt | 230787 | 2465 | ukendt | kvinde | ukendt | 2012:9; 2013:9; 2015:9; 2017:9; 2018:9; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9 | ukendt | ukendt | ukendt | navn+klub |
| id:293764 | Maria Søberg Roed | ukendt | ukendt | 293764 | 2438 | ukendt | kvinde | ukendt | 2017:3; 2018:4; 2019:4; 2020:5; 2021:5; 2022:1; 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:276042 | Marie Gotfred Johansen | ukendt | 276042 | 276042 | 348 | Gladsaxe Søborg | kvinde | ukendt | 2021:1; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9 | ja | ukendt | ja | entydig på ID |
| id:199668 | Marie Louise Kronborg Nielsem | ukendt | ukendt | 199668 | 4057 | ukendt | kvinde | ukendt | 2012:1; 2013:1; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:156754 | Marius Laage Andersen | ukendt | ukendt | 156754 | 5450 | ukendt | ukendt | ukendt | 2012:3 | ukendt | ukendt | ukendt | navn+klub |
| id:328191 | Marius Steenstrup Leth-Espensen | ukendt | 328191 | 328191 | 97 | Gladsaxe Søborg | mand | ukendt | 2020:2; 2021:3; 2022:3; 2023:4; 2024:4; 2025:5; 2026:18 | ja | ja | ukendt | entydig på ID |
| id:331883 | Markus Kruse | ukendt | ukendt | 331883 | 6257 | ukendt | ukendt | ukendt | 2021:4; 2022:5; 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:9869 | Martin Andersen | ukendt | ukendt | 9869 | ukendt | ukendt | mand | ukendt | 2023:1 | ukendt | ukendt | ukendt | ingen |
| name:martin andersen | Martin Andersen | ukendt | ukendt | ukendt | 2100 | ukendt | ukendt | ukendt | 2023:1 | ukendt | ukendt | ukendt | ingen |
| id:212799 | Martin Gath Ridorf-Hansen | ukendt | 212799 | 212799 | 889 | Gladsaxe Søborg | mand | ukendt | 2012:9; 2013:9; 2014:9; 2015:9; 2016:9; 2017:9; 2018:9; 2019:9; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:11; 2025:9; 2026:9 | ja (identitet uafklaret) | ja | ukendt | entydig på ID |
| id:56997 | Martin Nielsen | ukendt | ukendt | 56997 | ukendt | ukendt | mand | ukendt | 2024:1; 2025:1 | ja | ukendt | ukendt | ingen |
| name:martin nielsen | Martin Nielsen | ukendt | ukendt | ukendt | 691 | ukendt | ukendt | ukendt | 2024:1; 2025:1 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:251431 | Martin Roed | ukendt | ukendt | 251431 | ukendt | ukendt | mand | ukendt | 2014:9; 2015:1; 2015:9; 2016:9; 2018:9 | ukendt | ukendt | ukendt | ingen |
| name:martin roed | Martin Roed | ukendt | ukendt | ukendt | 2479 | ukendt | ukendt | ukendt | 2014:9; 2015:1; 2015:9; 2016:9; 2017:9; 2018:9; 2019:9; 2021:9; 2022:11; 2022:9 | ukendt | ukendt | ukendt | ingen |
| id:11600 | Martin Scholkmann | ukendt | ukendt | 11600 | ukendt | ukendt | mand | ukendt | 2014:1 | ukendt | ukendt | ukendt | ingen |
| name:martin scholkmann | Martin scholkmann | ukendt | ukendt | ukendt | 2765 | ukendt | ukendt | ukendt | 2014:1 | ukendt | ukendt | ukendt | ingen |
| id:278001 | Martin Yulzari | ukendt | 278001 | 278001 | 570 | Gladsaxe Søborg | mand | ukendt | 2016:9; 2017:9; 2018:9; 2020:9; 2021:9; 2022:9; 2023:11; 2023:9; 2024:1; 2024:11; 2024:9; 2025:1; 2025:11; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:337810 | Mary Aurora Manfredi Willumsen | ukendt | 337810 | 337810 | 28 | Gladsaxe Søborg | kvinde | ukendt | 2022:2; 2023:3; 2024:3; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:352436 | Maryam Yousefi | ukendt | ukendt | 352436 | 1041 | ukendt | kvinde | ukendt | 2025:9 | ja | ukendt | ukendt | navn+klub |
| id:73630 | Mathias Brænder | ukendt | 73630 | 73630 | 543 | SAIF Kbh. | mand | ukendt | 2022:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:73402 | Mathias Lyhne Bischoff | ukendt | ukendt | 73402 | 4147 | ukendt | mand | ukendt | 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:327292 | Mathilde Francl | ukendt | ukendt | 327292 | 6082 | ukendt | ukendt | ukendt | 2020:3 | ukendt | ukendt | ukendt | navn+klub |
| id:354988 | Matyás Bartosek | ukendt | 354988 | 354988 | 6993 | Gladsaxe Søborg | mand | ukendt | 2024:3; 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:294432 | Maude Marie Stewart | ukendt | ukendt | 294432 | 5901 | ukendt | kvinde | ukendt | 2017:3; 2018:3 | ukendt | ukendt | ukendt | navn+klub |
| id:327771 | Max Kristiansen | ukendt | ukendt | 327771 | 6255 | ukendt | ukendt | ukendt | 2021:4 | ukendt | ukendt | ukendt | navn+klub |
| id:331077 | Maximilian Bybeck Ostenfeld | ukendt | ukendt | 331077 | 6279 | ukendt | ukendt | ukendt | 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:364224 | Mehdi Roshanali | ukendt | 364224 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:367172 | Mehrab Rezaeibenis | ukendt | 367172 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:157127 | Merete Jacobsen | ukendt | 157127 | 157127 | 1169 | Gladsaxe Søborg | kvinde | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2024:11; 2025:11; 2025:13 | ja | ukendt | ukendt | entydig på ID |
| id:346764 | Messum Abbas Mohammad | ukendt | ukendt | 346764 | 6671 | ukendt | ukendt | ukendt | 2023:4 | ukendt | ukendt | ukendt | navn+klub |
| id:14121 | Mette Wisborg | ukendt | ukendt | 14121 | 3793 | ukendt | kvinde | ukendt | 2015:1; 2016:1 | ukendt | ukendt | ukendt | navn+klub |
| id:196577 | Mia Bækgaard Sørensen | ukendt | ukendt | 196577 | 5103 | ukendt | ukendt | ukendt | 2012:6 | ukendt | ukendt | ukendt | navn+klub |
| id:347852 | Mia Elizabeth Toftager | ukendt | 347852 | 347852 | 770 | Gladsaxe Søborg | kvinde | ukendt | 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:212626 | Michael Bjergsted | ukendt | 212626 | 212626 | 1015 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:12; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2023:11; 2023:13; 2024:11; 2024:13; 2024:9; 2025:11; 2025:13; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | entydig på ID |
| id:348035 | Michael Lindbo | ukendt | 348035 | 348035 | 663 | Gladsaxe Søborg | mand | ukendt | 2023:9; 2024:9; 2025:1; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:266344 | Michael Petersen | ukendt | ukendt | 266344 | ukendt | ukendt | mand | ukendt | 2019:9 | ukendt | ukendt | ukendt | ingen |
| name:michael petersen | Michael Petersen | ukendt | ukendt | ukendt | 658 | ukendt | ukendt | ukendt | 2015:9; 2016:9; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13 | ukendt | ukendt | ukendt | ingen |
| id:10804 | Michael Vig | ukendt | ukendt | 10804 | 4049 | ukendt | mand | ukendt | 2014:1; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:212028 | Michael Villiam Nielsen | ukendt | 212028 | 212028 | 809 | Gladsaxe Søborg | mand | ukendt | 2018:9; 2019:9; 2020:1; 2020:9; 2021:1; 2021:9; 2022:1; 2022:9; 2023:11; 2023:9; 2024:1; 2024:11; 2024:9; 2025:11; 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:55454 | Michelle Christensen | Michelle Liljengren | 55454 | 55454 | 260 | Gladsaxe Søborg | kvinde | ukendt | 2022:1; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:275932 | Mikael Monrad Brodersen | ukendt | ukendt | 275932 | 3906 | ukendt | mand | ukendt | 2016:9 | ukendt | ukendt | ukendt | kun navn |
| id:12852 | Mikael Rohde Frost Pedersen | ukendt | ukendt | 12852 | 4998 | ukendt | mand | ukendt | 2010:1; 2011:1 | ukendt | ukendt | ukendt | navn+klub |
| id:353422 | Mikail Abdelqadir | ukendt | 353422 | 353422 | 7012 | Gladsaxe Søborg | mand | ukendt | 2024:3 | ukendt | ukendt | ukendt | entydig på ID |
| id:12604 | Mikkel Colberg | ukendt | ukendt | 12604 | 3072 | ukendt | mand | ukendt | 2015:1; 2018:1; 2019:1 | ukendt | ukendt | ukendt | navn+klub |
| id:225560 | Mikkel Hansson | ukendt | 225560 | 225560 | ukendt | Taastrup TIK | mand | ukendt | 2017:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:69900 | Mikkel Herskind | ukendt | ukendt | 69900 | ukendt | ukendt | mand | ukendt | 2015:1; 2016:1 | ukendt | ukendt | ukendt | ingen |
| name:mikkel herskind | Mikkel Herskind | ukendt | ukendt | ukendt | 3865 | ukendt | ukendt | ukendt | 2015:1; 2016:1 | ukendt | ukendt | ukendt | ingen |
| id:355146 | Mikkel Skov Heimann | ukendt | 355146 | 355146 | 6847 | Gladsaxe Søborg | mand | ukendt | 2024:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:322638 | Mikkel Aarøe | ukendt | ukendt | 322638 | 2408 | ukendt | mand | ukendt | 2021:1; 2022:1 | ukendt | ukendt | ukendt | navn+klub |
| id:299939 | Mikkeline Maagaard Isager-Sally | ukendt | ukendt | 299939 | 5966 | ukendt | ukendt | ukendt | 2018:3; 2019:3; 2019:4 | ukendt | ukendt | ukendt | navn+klub |
| id:328856 | Miko Schiøtt Kongstad | ukendt | ukendt | 328856 | 2416 | ukendt | mand | ukendt | 2022:1 | ukendt | ukendt | ukendt | navn+klub |
| id:327179 | Mille-marie Fischer Andersen | ukendt | ukendt | 327179 | 2580 | ukendt | kvinde | ukendt | 2020:4; 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:353359 | Milo hoppe Kristensen | ukendt | 353359 | 353359 | 7014 | Gladsaxe Søborg | mand | ukendt | 2024:3; 2025:3; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:327186 | Mina Lorin Özden | ukendt | 327186 | 327186 | 398 | Gladsaxe Søborg | kvinde | ukendt | 2020:3; 2021:4; 2022:4; 2023:5; 2024:5; 2025:1; 2025:5; 2026:1; 2026:18 | ja | ja | ja | entydig på ID |
| id:353318 | Mirza Kamran Baig | ukendt | 353318 | 353318 | 7034 | Gladsaxe Søborg | mand | ukendt | 2024:3 | ukendt | ukendt | ukendt | entydig på ID |
| id:367315 | Moein Omran | ukendt | 367315 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| name:mogens busk | Mogens Busk | ukendt | ukendt | ukendt | 2549 | ukendt | ukendt | ukendt | 2022:13 | ukendt | ukendt | ukendt | ingen |
| id:212154 | Mogens Jørgensen | ukendt | 212154 | 212154 | 2229 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:11; 2014:13; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:17; 2020:13; 2020:9; 2021:11; 2021:13; 2021:17; 2022:11; 2022:13; 2022:17; 2023:11; 2023:13; 2023:17; 2024:17 | ukendt | ukendt | ukendt | entydig på ID |
| id:344528 | Mohammad Kumayl Abbas | ukendt | ukendt | 344528 | 6688 | ukendt | ukendt | ukendt | 2023:3 | ukendt | ukendt | ukendt | navn+klub |
| id:339978 | Mohammed Aarshil Azad | ukendt | 339978 | 339978 | 5399 | Gladsaxe Søborg | mand | ukendt | 2022:4; 2023:5; 2024:5; 2025:18 | ja | ukendt | ukendt | entydig på ID |
| id:54468 | Morten Herskind | ukendt | ukendt | 54468 | 4154 | ukendt | mand | ukendt | 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:350836 | Morten Høyrup | ukendt | 350836 | 350836 | 657 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:12759 | Morten Jonas Maltesen | ukendt | ukendt | 12759 | 2616 | ukendt | mand | ukendt | 2018:1; 2019:1; 2020:1; 2021:1; 2021:9 | ukendt | ukendt | ukendt | navn+klub |
| id:307144 | Morten Nielsen | ukendt | 307144 | 307144 | ukendt | Gladsaxe Søborg | mand | ukendt | 2018:9; 2019:9; 2024:11 | ukendt | ukendt | ukendt | entydig på ID |
| name:morten nielsen | Morten Nielsen | ukendt | ukendt | ukendt | 862 | ukendt | ukendt | ukendt | 2018:9; 2019:9; 2020:9; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:11 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:82310 | Morten Nødskov Hansen | ukendt | ukendt | 82310 | 2996 | ukendt | mand | ukendt | 2018:1; 2019:1 | ukendt | ukendt | ukendt | navn+klub |
| id:13216 | Morten Aarøe | ukendt | 13216 | 13216 | 215 | Gladsaxe Søborg | mand | ukendt | 2010:1; 2011:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2021:9; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ja | entydig på ID |
| id:230690 | Nadia Mortensen | Nadia Sawangjai Mortensen | 230690 | 230690 | 350 | Gladsaxe Søborg | kvinde | ukendt | 2023:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:157809 | Naija Dam | ukendt | ukendt | 157809 | 5483 | ukendt | kvinde | ukendt | 2012:4; 2013:5; 2014:5 | ukendt | ukendt | ukendt | navn+klub |
| id:276542 | Najeeb Durrani | ukendt | ukendt | 276542 | 1751 | ukendt | mand | ukendt | 2016:11; 2016:9; 2018:11; 2018:9; 2020:11; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11 | ukendt | ukendt | ukendt | navn+klub |
| id:337805 | Naman Bhardwaj | ukendt | ukendt | 337805 | 6459 | ukendt | ukendt | ukendt | 2022:2 | ukendt | ukendt | ukendt | navn+klub |
| id:361336 | Narvin Krishna Mudragalla | ukendt | 361336 | 361336 | 7212 | Gladsaxe Søborg | mand | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:8692 | Nete Kjær Gabel | ukendt | 8692 | 8692 | 796 | Herlev/Hjorten | kvinde | ukendt | 2024:11; 2024:9; 2025:11; 2025:9; 2026:11; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:355150 | Nicholas Andersen | ukendt | 355150 | 355150 | ukendt | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| name:nicholas andersen | Nicholas Andersen | ukendt | ukendt | ukendt | 6848 | ukendt | ukendt | ukendt | 2024:4; 2025:4 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:20732 | Nicola Cerfontyne | ukendt | ukendt | 20732 | 3554 | ukendt | kvinde | ukendt | 2017:1 | ukendt | ukendt | ukendt | navn+klub |
| id:236518 | Nicolai Dahl Kjellberg | ukendt | ukendt | 236518 | 5585 | ukendt | ukendt | ukendt | 2013:3 | ukendt | ukendt | ukendt | navn+klub |
| id:321739 | Nicolai Kramer | ukendt | 321739 | 321739 | 2442 | Farum; Hvidovre HB2000 | mand | ukendt | 2022:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:115865 | Nicolai Mehlsen | ukendt | ukendt | 115865 | 5096 | ukendt | ukendt | ukendt | 2012:6; 2013:6 | ukendt | ukendt | ukendt | navn+klub |
| id:271627 | Nicoline Amalie Jensen | ukendt | ukendt | 271627 | 3835 | ukendt | kvinde | ukendt | 2015:1; 2016:1 | ukendt | ukendt | ukendt | navn+klub |
| id:18850 | Niels Banemann | ukendt | ukendt | 18850 | 4060 | ukendt | mand | ukendt | 2012:1; 2013:1; 2014:1; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:211539 | Niels Jørgen Madsen | ukendt | 211539 | 211539 | 2574 | Frederiksberg | mand | ukendt | 2020:17 | ukendt | ukendt | ukendt | entydig på ID |
| id:12680 | Niels Monsen | ukendt | ukendt | 12680 | 2402 | ukendt | mand | ukendt | 2010:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2018:1 | ukendt | ukendt | ukendt | navn+klub |
| id:211899 | Niels Tindbæk | ukendt | ukendt | 211899 | 3487 | ukendt | mand | ukendt | 2012:11; 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:11; 2014:13; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:9; 2018:13; 2019:17 | ukendt | ukendt | ukendt | navn+klub |
| id:293765 | Nikolaj Thorslund Hindsbo | ukendt | 293765 | 293765 | 473 | Gladsaxe Søborg | mand | ukendt | 2017:3; 2018:3; 2019:4; 2020:5; 2021:4; 2021:5; 2022:5; 2023:1; 2023:18; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:346284 | Nikolas Yin | ukendt | 346284 | 346284 | 6609 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:212800 | Nils Ole Andersen | ukendt | 212800 | 212800 | 922 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:12; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2022:13; 2023:11; 2023:13; 2023:9; 2024:11; 2024:13; 2025:11; 2025:13; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:215935 | Nisa Tahseen Uddin | ukendt | ukendt | 215935 | 5455 | ukendt | ukendt | ukendt | 2012:3 | ukendt | ukendt | ukendt | navn+klub |
| id:358233 | Noah larsen | ukendt | 358233 | 358233 | ukendt | Gladsaxe Søborg | mand | ukendt | 2024:3; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| name:noah larsen | Noah larsen | ukendt | ukendt | ukendt | 7026 | ukendt | ukendt | ukendt | 2024:3; 2025:4 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:357877 | Noah Aackersberg | ukendt | 357877 | 357877 | ukendt | Gladsaxe Søborg; Glostrup | mand | ukendt | ukendt | ukendt | ukendt | ukendt | entydig på ID |
| id:323815 | Noi Kolka | ukendt | 323815 | 323815 | 6099 | Gladsaxe Søborg | mand | ukendt | 2023:5; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:211894 | Noomi Mortensen | ukendt | 211894 | 211894 | 966 | Gladsaxe Søborg | kvinde | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2022:17; 2022:9; 2023:11; 2023:13; 2023:9; 2024:11; 2024:13; 2024:17; 2024:9; 2025:11; 2025:13; 2025:17; 2025:9; 2026:11; 2026:13 | ja | ja | ukendt | entydig på ID |
| id:355434 | Norr Bagge Køhler | ukendt | 355434 | 355434 | 5425 | Gladsaxe Søborg | mand | ukendt | 2024:2; 2025:2; 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:211940 | Ole F Rasmussen | ukendt | ukendt | 211940 | 4246 | ukendt | mand | ukendt | 2012:9; 2013:9; 2015:9 | ukendt | ukendt | ukendt | kun navn |
| id:95042 | Oliver Dahl Christiansen | ukendt | ukendt | 95042 | 5541 | ukendt | ukendt | ukendt | 2012:5; 2013:5 | ukendt | ukendt | ukendt | navn+klub |
| id:229287 | Oliver Frei | ukendt | 229287 | 229287 | 230 | Gladsaxe Søborg | mand | ukendt | 2013:5; 2014:5; 2015:1; 2016:1; 2016:6; 2017:1; 2017:18; 2018:1; 2018:18; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:155870 | Oliver Guldbæk | ukendt | 155870 | 155870 | 345 | Gladsaxe Søborg; Gladsaxe Søborg (g) | mand | ukendt | 2012:5; 2013:5; 2016:1; 2016:18; 2017:1; 2017:18; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:365637 | Oliver Nielsen | ukendt | 365637 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:353206 | Oliver Rafah Peddinini Joe | ukendt | 353206 | 353206 | 68 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2024:5; 2025:18; 2025:4; 2025:5; 2026:18 | ja | ja | ukendt | entydig på ID |
| id:334090 | Oliver Soon Nielsen | ukendt | 334090 | 334090 | 4 | Gladsaxe Søborg | mand | ukendt | 2021:2; 2022:3; 2023:3; 2024:3; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:157812 | Oliver Theill Jensen | ukendt | ukendt | 157812 | ukendt | ukendt | ukendt | ukendt | 2012:6 | ukendt | ukendt | ukendt | ingen |
| id:358585 | Oliver Walbum | ukendt | 358585 | 358585 | 735 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:346413 | Oscar Bo Dan Ouyang | ukendt | 346413 | 346413 | 6751 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:169458 | Oscar Donovan | ukendt | 169458 | 169458 | 422 | Gladsaxe Søborg | mand | ukendt | 2025:1 | ja | ukendt | ja | entydig på ID |
| id:361998 | Oscar Flyger | ukendt | 361998 | 361998 | 7235 | Gladsaxe Søborg | mand | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:358212 | Oscar Goodley Kortegaard | ukendt | 358212 | 358212 | 6875 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:358663 | Oscar Rugaard Sørensen | ukendt | 358663 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:251042 | Oskar Fabricius Karlsson | ukendt | 251042 | 251042 | 1496 | KMB2010 | mand | ukendt | 2018:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:365036 | Oskar Isbosethsen | ukendt | 365036 | 365036 | 644 | Gladsaxe Søborg | mand | ukendt | 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:366728 | Otto Toftgaard | ukendt | 366728 | 366728 | ukendt | Gladsaxe Søborg | mand | ukendt | 2026:4 | ukendt | ja | ukendt | entydig på ID |
| id:272039 | Pai Rosager Pedas | ukendt | ukendt | 272039 | 2412 | ukendt | mand | ukendt | 2015:1; 2016:1; 2021:9; 2022:1 | ukendt | ukendt | ukendt | navn+klub |
| id:6155 | Palle Stevnsvig | ukendt | ukendt | 6155 | 4702 | ukendt | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9 | ukendt | ukendt | ukendt | kun navn |
| id:302980 | Pelle Emil Jessing Schjøtt | ukendt | ukendt | 302980 | 5962 | ukendt | ukendt | ukendt | 2018:3; 2019:3; 2020:4; 2021:4; 2021:5 | ukendt | ukendt | ukendt | navn+klub |
| id:211941 | Per Garbrecht Rasmussen | ukendt | ukendt | 211941 | 4947 | ukendt | mand | ukendt | 2012:9 | ukendt | ukendt | ukendt | kun navn |
| name:per jensen | Per Jensen | ukendt | ukendt | ukendt | 4713 | ukendt | ukendt | ukendt | 2012:11; 2012:9; 2013:11; 2013:9 | ukendt | ukendt | ukendt | ingen |
| id:212381 | Per Larsen | ukendt | ukendt | 212381 | ukendt | ukendt | mand | ukendt | 2012:9; 2013:9; 2014:9; 2015:9; 2018:9; 2019:9 | ukendt | ukendt | ukendt | ingen |
| name:per larsen | Per Larsen | ukendt | ukendt | ukendt | 2468 | ukendt | ukendt | ukendt | 2012:9; 2013:9; 2014:9; 2015:9; 2018:9; 2019:9; 2022:11; 2022:9 | ukendt | ukendt | ukendt | ingen |
| id:213728 | Per Skjoldner | ukendt | ukendt | 213728 | 4732 | ukendt | mand | ukendt | 2012:13; 2013:13; 2013:9 | ukendt | ukendt | ukendt | navn+klub |
| id:306630 | Per Thygesen | ukendt | 306630 | 306630 | 1201 | Gladsaxe Søborg; Herlev/Hjorten | mand | ukendt | 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2023:11; 2023:13; 2024:11; 2024:13; 2025:11; 2025:13 | ja (identitet uafklaret) | ukendt | ukendt | entydig på ID |
| id:212379 | Per Wengenroth | ukendt | 212379 | 212379 | 1124 | Gladsaxe Søborg | mand | ukendt | 2012:9; 2013:9; 2014:9; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2024:11; 2024:9; 2025:11; 2026:11; 2026:13 | ja | ja | ukendt | entydig på ID |
| id:244806 | Peter Bruhn | ukendt | ukendt | 244806 | 4760 | ukendt | mand | ukendt | 2013:9 | ukendt | ukendt | ukendt | navn+klub |
| id:328407 | Peter Buur Steffensen | ukendt | ukendt | 328407 | 1492 | ukendt | mand | ukendt | 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2019:9; 2020:1 | ukendt | ukendt | ukendt | navn+klub |
| id:239433 | Peter Greve Amdi | ukendt | ukendt | 239433 | 5592 | ukendt | ukendt | ukendt | 2013:3; 2014:4; 2015:4 | ukendt | ukendt | ukendt | navn+klub |
| id:254993 | Peter Gundersen | ukendt | 254993 | 254993 | 629 | Gladsaxe Søborg | mand | ukendt | 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2019:9; 2020:1; 2020:9; 2021:9; 2022:1; 2022:9; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:327291 | Peter Holger Bjørndal Axelsen | ukendt | 327291 | 327291 | 5393 | Gladsaxe Søborg | mand | ukendt | 2020:3; 2021:4; 2022:4; 2023:5; 2024:5; 2025:18 | ja | ukendt | ukendt | entydig på ID |
| id:211942 | Peter Zøylner | ukendt | ukendt | 211942 | 3423 | ukendt | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:9; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:9; 2018:13; 2018:9 | ukendt | ukendt | ukendt | navn+klub |
| id:157807 | Philip Agerlyng | ukendt | ukendt | 157807 | 5548 | ukendt | ukendt | ukendt | 2012:5 | ukendt | ukendt | ukendt | navn+klub |
| id:357627 | Philip Andersen | ukendt | 357627 | 357627 | ukendt | Gladsaxe Søborg | mand | ukendt | 2024:3; 2025:3; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| name:philip andersen | Philip Andersen | ukendt | ukendt | ukendt | 7031 | ukendt | ukendt | ukendt | 2024:3; 2025:3; 2025:4 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:343381 | Philip John Patrick Stack | ukendt | 343381 | 343381 | 751 | Gladsaxe Søborg | mand | ukendt | 2023:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:343399 | Pontus Einar Anker Mikkelsen | ukendt | 343399 | 343399 | 71 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:4; 2025:4; 2025:5; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:213729 | Poul Lindschouw | ukendt | ukendt | 213729 | 4727 | ukendt | mand | ukendt | 2012:13; 2013:13; 2013:9 | ukendt | ukendt | ukendt | kun navn |
| id:365628 | Prabhuji Mudragalla | ukendt | 365628 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:361195 | Qian Zhang | ukendt | 361195 | 361195 | 208 | Gladsaxe Søborg | kvinde | ukendt | 2025:18 | ja | ukendt | ukendt | entydig på ID |
| id:337806 | Qingyi Marie Han | ukendt | 337806 | 337806 | 7 | Gladsaxe Søborg | kvinde | ukendt | 2022:2; 2023:3; 2024:3; 2024:4; 2025:4; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:155894 | Raphael Kongsvig | ukendt | 155894 | 155894 | 2670 | Lyngby | mand | ukendt | 2012:4; 2013:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:344265 | Rasmus Hammershaimb Pedersen | ukendt | 344265 | 344265 | 5377 | Gladsaxe Søborg | mand | ukendt | 2024:5; 2025:18; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:178702 | Rasmus Hedegaard Nielsen | ukendt | ukendt | 178702 | 4119 | ukendt | mand | ukendt | 2012:1; 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:64837 | Rasmus Hemmingsen | ukendt | 64837 | 64837 | 556 | Gladsaxe Søborg | mand | ukendt | 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:94966 | Rasmus Herskind | ukendt | ukendt | 94966 | 3980 | ukendt | mand | ukendt | 2012:4; 2013:4; 2014:5; 2015:5; 2016:6 | ukendt | ukendt | ukendt | navn+klub |
| id:45550 | Rasmus Holmslykke Andersen | Rasmus Holmlykke Andersen | 45550 | 45550 | 339 | Gladsaxe Søborg | mand | ukendt | 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:333098 | Rasmus Kimer Fogtmann | ukendt | 333098 | 333098 | 5337 | Gladsaxe Søborg | mand | ukendt | 2021:4; 2022:5; 2023:5; 2024:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:323878 | Rasmus Kjær | ukendt | 323878 | 323878 | 6431 | Gladsaxe Søborg | mand | ukendt | 2022:5; 2023:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:325700 | Rasmus Kristensen | ukendt | 325700 | 325700 | ukendt | SAIF Kbh. | mand | ukendt | 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| name:rasmus kristensen | Rasmus Kristensen | ukendt | ukendt | ukendt | 954 | ukendt | ukendt | ukendt | 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:93117 | Rasmus Lyhne Fiehn | ukendt | ukendt | 93117 | 3346 | ukendt | mand | ukendt | 2012:4; 2013:5; 2014:5; 2015:1; 2016:1; 2016:6; 2017:1; 2017:18; 2018:1; 2018:18 | ukendt | ukendt | ukendt | navn+klub |
| id:283869 | Raz Matteo Palima | ukendt | ukendt | 283869 | 5803 | ukendt | ukendt | ukendt | 2016:3; 2017:4; 2018:4; 2019:5; 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:14229 | Regina Monsen | ukendt | 14229 | 14229 | 1672 | Charlottenlund | kvinde | ukendt | 2010:1; 2012:1; 2013:1; 2014:1; 2015:1; 2018:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:9262 | Rikke Balschmidt Ebbesen | ukendt | ukendt | 9262 | 4854 | ukendt | kvinde | ukendt | 2012:1 | ukendt | ukendt | ukendt | navn+klub |
| id:12061 | Rikke Krawcyk | ukendt | 12061 | 12061 | 939 | Gladsaxe Søborg | kvinde | ukendt | 2010:1; 2011:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2018:9; 2019:1; 2019:9; 2020:1; 2020:9; 2021:1; 2021:9; 2023:1; 2023:9; 2024:9; 2025:9; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:330775 | Rishi Mandapati | ukendt | 330775 | 330775 | 124 | Gladsaxe Søborg | mand | ukendt | 2021:3; 2022:3; 2023:4; 2024:4; 2025:18; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:365191 | Rishita Rajput | ukendt | 365191 | 365191 | 7415 | Gladsaxe Søborg | kvinde | ukendt | 2025:4; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:344161 | Rosa Føge | ukendt | ukendt | 344161 | 1064 | ukendt | kvinde | ukendt | 2023:1; 2024:1; 2025:9 | ja | ukendt | ukendt | navn+klub |
| id:337784 | Rosa Hinge Carlsson | ukendt | 337784 | 337784 | 92 | Gladsaxe Søborg | kvinde | ukendt | 2022:4; 2023:5; 2024:4; 2024:5; 2025:1; 2025:5; 2026:1; 2026:18 | ja | ja | ja | entydig på ID |
| id:337785 | Ruhani Ahana Mukherjee | ukendt | 337785 | 337785 | 1386 | Gladsaxe Søborg | kvinde | ukendt | 2022:4; 2023:4; 2023:5; 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:356241 | Rumle Pedersen | ukendt | 356241 | 356241 | 5381 | Gladsaxe Søborg | mand | ukendt | 2024:5; 2025:18; 2026:18 | ja | ja | ukendt | entydig på ID |
| id:11720 | Sabina Juul Larsson | ukendt | 11720 | 11720 | 880 | Gladsaxe Søborg | kvinde | ukendt | 2011:1; 2012:1; 2014:1; 2015:1; 2016:1; 2018:1; 2018:9; 2022:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:364493 | Saishiv Prasanna kumar Lavanya | ukendt | ukendt | 364493 | 7453 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:332981 | Sakarias Thornild Berthelsen | ukendt | 332981 | 332981 | ukendt | Gentofte; Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | entydig på ID |
| id:360115 | Salvatore Buccoliero | ukendt | 360115 | 360115 | 1060 | Gladsaxe Søborg | mand | ukendt | 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | entydig på ID |
| id:236446 | Sampath Swamy | ukendt | ukendt | 236446 | 1787 | ukendt | mand | ukendt | 2022:9; 2023:9; 2024:11 | ukendt | ukendt | ukendt | kun navn |
| id:364401 | Samson Emil Bergmann Mølgaard | ukendt | 364401 | 364401 | 7213 | Gladsaxe Søborg | mand | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:364468 | Samuel Lynge | ukendt | ukendt | 364468 | 7439 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:334355 | Samvida Sri Munagala | ukendt | 334355 | 334355 | ukendt | Badminton Roskilde | kvinde | ukendt | 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:335245 | Sanaz saboori | ukendt | 335245 | 335245 | 1607 | Gladsaxe Søborg; Værløse | kvinde | ukendt | 2024:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:355609 | Santosh Kumar | ukendt | 355609 | 355609 | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | entydig på ID |
| id:353423 | Sara keinicke | ukendt | 353423 | 353423 | 1325 | Gladsaxe Søborg | kvinde | ukendt | 2024:4 | ukendt | ukendt | ukendt | entydig på ID |
| id:362871 | Sara Vinding | ukendt | ukendt | 362871 | 1055 | ukendt | kvinde | ukendt | 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | kun navn |
| id:337762 | Sarah Hansen Tulinius | ukendt | ukendt | 337762 | 6520 | ukendt | ukendt | ukendt | 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:40120 | Sarah Zyskind | ukendt | ukendt | 40120 | 3620 | ukendt | kvinde | ukendt | 2016:1; 2017:1 | ukendt | ukendt | ukendt | navn+klub |
| id:354901 | Saritha Soman | ukendt | 354901 | 354901 | 649 | Gladsaxe Søborg | kvinde | ukendt | 2024:1; 2024:9; 2025:1; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:330765 | Saxo Ghotbi | ukendt | ukendt | 330765 | 6127 | ukendt | ukendt | ukendt | 2021:2 | ukendt | ukendt | ukendt | navn+klub |
| id:323997 | Sebastian Almeida Møller | Sebastian Møller | 323997 | 323997 | ukendt | Gladsaxe Søborg | mand | ukendt | 2020:3; 2020:4; 2021:5; 2022:18; 2022:5; 2023:1; 2023:18; 2023:5; 2024:1; 2025:1; 2026:1 | ja | ja | ukendt | entydig på ID |
| name:sebastian almeida møller | Sebastian Almeida Møller | Sebastian Møller | ukendt | ukendt | 460 | ukendt | mand | ukendt | 2020:3; 2020:4; 2021:5; 2022:18; 2022:5; 2023:1; 2023:18; 2023:5; 2024:1; 2025:1 | ja (identitet uafklaret) | ukendt | ja | ingen |
| id:346767 | Sebastian Larsen Lund | ukendt | 346767 | 346767 | 5387 | Gladsaxe Søborg | mand | ukendt | 2023:4; 2024:5; 2025:18; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:355665 | Sebastian Skjødt Heiner | ukendt | ukendt | 355665 | 6959 | ukendt | ukendt | ukendt | 2024:2 | ukendt | ukendt | ukendt | navn+klub |
| id:236520 | Sebastian Woll | ukendt | ukendt | 236520 | 4549 | ukendt | mand | ukendt | 2013:4 | ukendt | ukendt | ukendt | navn+klub |
| id:253158 | Selma Hejl Jensen | ukendt | ukendt | 253158 | 5655 | ukendt | ukendt | ukendt | 2014:3; 2015:3 | ukendt | ukendt | ukendt | navn+klub |
| id:354946 | Sepideh Norouzi | ukendt | 354946 | 354946 | 1599 | DTU; Gladsaxe Søborg | kvinde | ukendt | 2024:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:350952 | Shamil Balakrishnan | ukendt | 350952 | 350952 | 654 | Gladsaxe Søborg | mand | ukendt | 2023:1; 2024:1; 2025:1; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:365657 | Shenai Antony | ukendt | 365657 | 365657 | ukendt | Gladsaxe Søborg | mand | ukendt | 2026:1 | ukendt | ja | ja | entydig på ID |
| id:63971 | Shila Dirand | ukendt | 63971 | 63971 | 4880 | Ledøje-Smørum | kvinde | ukendt | 2012:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:332697 | Siddharth Puthran | ukendt | 332697 | 332697 | 6132 | Gladsaxe Søborg | mand | ukendt | 2021:2; 2022:3; 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:10987 | Signe Aarøe Jørgensen | ukendt | 10987 | 10987 | 465 | Gladsaxe Søborg | kvinde | ukendt | 2010:1; 2011:1; 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2016:9; 2017:1; 2017:9; 2018:1; 2018:9; 2019:1; 2019:9; 2020:1; 2020:9; 2021:1; 2021:9; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1; 2025:9; 2026:11; 2026:9 | ja | ja | ja | entydig på ID |
| id:361524 | Sigrid Friis Følsgaard | ukendt | 361524 | 361524 | 7179 | Gladsaxe Søborg | kvinde | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:237704 | Sigurd Heinager Sørensen | ukendt | ukendt | 237704 | 5631 | ukendt | ukendt | ukendt | 2013:5 | ukendt | ukendt | ukendt | navn+klub |
| id:328213 | Silas Buron | ukendt | 328213 | 328213 | 140 | Gladsaxe Søborg | mand | ukendt | 2020:2; 2021:3; 2022:3; 2024:5; 2025:5; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:49776 | Silas Sebastian Pihl | ukendt | ukendt | 49776 | 3293 | ukendt | mand | ukendt | 2012:1; 2013:1; 2014:1 | ukendt | ukendt | ukendt | navn+klub |
| id:159245 | Silje Buus Nyeng | ukendt | ukendt | 159245 | 3515 | ukendt | kvinde | ukendt | 2012:3; 2013:4; 2014:4; 2015:4; 2015:5; 2016:5; 2017:18 | ukendt | ukendt | ukendt | navn+klub |
| id:343421 | Silje Rømer Andersen | ukendt | 343421 | 343421 | ukendt | Badminton Roskilde | kvinde | ukendt | 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:210883 | Silke Amalie Birch | ukendt | 210883 | 210883 | 403 | Frederiksberg | kvinde | ukendt | 2013:1; 2013:6; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:327177 | Simon Greve Amdi | ukendt | ukendt | 327177 | 6093 | ukendt | ukendt | ukendt | 2020:4 | ukendt | ukendt | ukendt | navn+klub |
| id:241869 | Simon Kristensen | ukendt | 241869 | 241869 | ukendt | Badminton Roskilde; Badminton Roskilde (g) | mand | ukendt | 2017:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:331879 | Simon Vils Pedersen | ukendt | ukendt | 331879 | 5238 | ukendt | ukendt | ukendt | 2021:5; 2022:18 | ukendt | ukendt | ukendt | navn+klub |
| id:58690 | Simone Møller Jensen | ukendt | 58690 | 58690 | 224 | Gladsaxe Søborg | kvinde | ukendt | 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:95182 | Sine Vestergaard | ukendt | 95182 | 95182 | 2881 | Rødby | kvinde | ukendt | 2012:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2020:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:327386 | Siw Miaxoue Licht-Rehm | ukendt | ukendt | 327386 | 2864 | ukendt | kvinde | ukendt | 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:346470 | Smayan Kiran Vaddin | ukendt | 346470 | 346470 | 6761 | Gladsaxe Søborg | mand | ukendt | 2023:3; 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:337799 | Sofia Xiaoyu Geiger | ukendt | 337799 | 337799 | 35 | Gladsaxe Søborg | kvinde | ukendt | 2022:2; 2023:3; 2024:3; 2025:4; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:337783 | Sofie Granau Holm | ukendt | ukendt | 337783 | 1911 | ukendt | kvinde | ukendt | 2022:5; 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:166788 | Sofie Jensen | ukendt | ukendt | 166788 | ukendt | ukendt | kvinde | ukendt | 2012:9; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9 | ukendt | ukendt | ukendt | ingen |
| name:sofie jensen | Sofie Jensen | ukendt | ukendt | ukendt | 3673 | ukendt | ukendt | ukendt | 2012:9; 2013:9; 2014:11; 2014:9; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9 | ukendt | ukendt | ukendt | ingen |
| id:157803 | Sofie Sophia Lyhne | ukendt | ukendt | 157803 | 3500 | ukendt | kvinde | ukendt | 2012:4; 2013:4; 2014:5; 2015:1; 2015:5; 2016:1; 2017:1; 2017:18 | ukendt | ukendt | ukendt | navn+klub |
| id:355072 | Sofus Goodley Kortegaard | ukendt | 355072 | 355072 | 6870 | Gladsaxe Søborg | mand | ukendt | 2024:4; 2025:4 | ja | ukendt | ukendt | entydig på ID |
| id:352565 | Sofus Hansen | ukendt | 352565 | 352565 | 5427 | Gladsaxe Søborg | mand | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:346746 | Sofus Hedegaard Toftlund | ukendt | 346746 | 346746 | 78 | Gladsaxe Søborg | mand | ukendt | 2023:2; 2024:3; 2025:3; 2025:4; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:366377 | Sofus Hein | ukendt | 366377 | 366377 | ukendt | Gladsaxe Søborg | mand | ukendt | 2026:4 | ukendt | ja | ukendt | entydig på ID |
| id:265215 | Sohail Murtaza | ukendt | ukendt | 265215 | 4149 | ukendt | mand | ukendt | 2015:1 | ukendt | ukendt | ukendt | navn+klub |
| id:355355 | Sophia Abrahamsen | ukendt | 355355 | 355355 | ukendt | Gladsaxe Søborg | kvinde | ukendt | 2024:5 | ukendt | ukendt | ukendt | entydig på ID |
| id:362606 | Sophia Rita Giuliani | ukendt | 362606 | 362606 | 168 | Gladsaxe Søborg | kvinde | ukendt | 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:246819 | Sophie Klinte Sundin | ukendt | ukendt | 246819 | 5119 | ukendt | ukendt | ukendt | 2013:6 | ukendt | ukendt | ukendt | navn+klub |
| id:361833 | Sri Mokshita Kolapalli | ukendt | 361833 | 361833 | 7226 | Gladsaxe Søborg | kvinde | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:5010 | Steen Kiorboe | ukendt | 5010 | 5010 | 1081 | Gladsaxe Søborg | mand | ukendt | 2014:11; 2014:13; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:17; 2020:13; 2021:11; 2021:13; 2021:17; 2022:13; 2022:17; 2023:11; 2023:13; 2023:17; 2024:11; 2024:13; 2024:17; 2025:11; 2025:13; 2025:17; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:10559 | Stefan Pedersen | ukendt | ukendt | 10559 | 5045 | ukendt | mand | ukendt | 2010:1 | ukendt | ukendt | ukendt | navn+klub |
| id:210944 | Steffen Bo Madsen | ukendt | 210944 | 210944 | 3254 | Rødby | mand | ukendt | 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:280957 | Steffen Danielsen | ukendt | 280957 | 280957 | 748 | Gladsaxe Søborg | mand | ukendt | 2025:1; 2025:13; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:270179 | Steffen Wad | ukendt | 270179 | 270179 | 1128 | Gladsaxe Søborg | mand | ukendt | 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2023:11; 2023:13; 2023:9; 2024:11; 2024:13; 2024:9; 2025:11; 2025:13 | ja (identitet uafklaret) | ukendt | ukendt | entydig på ID |
| id:46436 | Stine Greve | ukendt | 46436 | 46436 | 2281 | Jernløse | kvinde | ukendt | 2016:1; 2017:1; 2018:1; 2019:1; 2022:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:14568 | Stine Louise Knudsen | ukendt | 14568 | 14568 | 344 | Gladsaxe Søborg; Gladsaxe Søborg (g) | kvinde | ukendt | 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2018:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1; 2025:9; 2026:9 | ja | ja | ja | entydig på ID |
| id:361644 | Stuti Sharma | ukendt | 361644 | 361644 | 7184 | Gladsaxe Søborg | kvinde | ukendt | 2025:3; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:331907 | Svea Lisbeth Bergström Hesselballe | ukendt | 331907 | 331907 | 77 | Gladsaxe Søborg | kvinde | ukendt | 2021:3; 2024:4; 2025:4; 2025:5; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:337792 | Svend Anders Hansen Uhrbrand | ukendt | ukendt | 337792 | 6355 | ukendt | ukendt | ukendt | 2022:3 | ukendt | ukendt | ukendt | navn+klub |
| id:346140 | Svend Arvid Hedemann Christensen | ukendt | ukendt | 346140 | ukendt | ukendt | ukendt | ukendt | 2023:2 | ukendt | ukendt | ukendt | ingen |
| id:211891 | Svend Valentin Rasmussen | ukendt | 211891 | 211891 | 2235 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:13; 2012:9; 2013:11; 2013:13; 2013:9; 2014:11; 2014:13; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:17; 2019:9; 2020:13; 2020:17; 2021:11; 2021:13; 2021:17; 2021:9; 2022:11; 2022:13; 2022:17; 2023:11; 2023:17; 2024:17; 2025:13; 2025:17 | ja (identitet uafklaret) | ukendt | ukendt | entydig på ID |
| id:6227 | Svend Videbæk | ukendt | 6227 | 6227 | 1160 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:9; 2013:1; 2013:11; 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:11; 2016:9; 2017:11; 2017:9; 2018:11; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2021:9; 2022:11; 2022:13; 2022:9; 2023:11; 2023:13; 2024:11; 2024:13; 2024:9; 2025:11; 2025:13 | ja | ukendt | ukendt | entydig på ID |
| id:52578 | Sverre Stütz | ukendt | 52578 | 52578 | 724 | Gladsaxe Søborg; Valby BC | mand | ukendt | 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:346145 | Sylvester Daniel Langstrup Dalsø | ukendt | ukendt | 346145 | 6731 | ukendt | ukendt | ukendt | 2023:2 | ukendt | ukendt | ukendt | navn+klub |
| id:337789 | Sylvester Østberg | ukendt | 337789 | 337789 | 1355 | Gladsaxe Søborg | mand | ukendt | 2022:3; 2022:4; 2023:4; 2024:5; 2025:5 | ja | ukendt | ja | entydig på ID |
| id:294283 | Søren Berggreen | ukendt | 294283 | 294283 | 5205 | Frederiksberg | mand | ukendt | 2020:17 | ukendt | ukendt | ukendt | entydig på ID |
| id:198604 | Søs Stadil | ukendt | 198604 | 198604 | 1788 | Gladsaxe Søborg | kvinde | ukendt | 2021:11; 2021:13; 2022:11; 2022:13; 2022:17; 2023:13; 2024:11 | ukendt | ukendt | ukendt | entydig på ID |
| id:323370 | Tania Tallquist | ukendt | ukendt | 323370 | 3068 | ukendt | kvinde | ukendt | 2019:1 | ukendt | ukendt | ukendt | navn+klub |
| id:11288 | Tanja Willumsen | ukendt | 11288 | 11288 | 554 | Gladsaxe Søborg | kvinde | ukendt | 2024:1; 2025:1; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:346766 | Theodor Christian Riis | ukendt | 346766 | 346766 | 6672 | Gladsaxe Søborg | mand | ukendt | 2023:4; 2024:5; 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:327691 | Theodor Lumby Jessen | Theodor Lumby | 327691 | 327691 | 162 | Gladsaxe Søborg | mand | ukendt | 2024:5; 2025:5; 2026:1; 2026:5 | ja | ja | ja | entydig på ID |
| id:162629 | Theodor Peter Guttesen | ukendt | ukendt | 162629 | 5637 | ukendt | ukendt | ukendt | 2013:5 | ukendt | ukendt | ukendt | navn+klub |
| id:265225 | Thomas Birch Christensen | ukendt | ukendt | 265225 | 3982 | ukendt | mand | ukendt | 2015:5 | ukendt | ukendt | ukendt | navn+klub |
| id:340977 | Thomas Malmros | ukendt | 340977 | 340977 | 762 | Gladsaxe Søborg | mand | ukendt | 2023:1; 2024:1; 2024:9; 2025:1; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:311920 | Thomas Nolfi | ukendt | 311920 | 311920 | 1013 | Gladsaxe Søborg | mand | ukendt | 2025:11; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:310452 | Thomas Stevnsbak Andersen | ukendt | 310452 | 310452 | 1197 | Gladsaxe Søborg | mand | ukendt | 2018:9; 2019:9; 2021:11; 2021:9; 2022:11; 2023:11; 2023:9; 2024:11; 2024:9; 2025:11 | ja | ukendt | ukendt | entydig på ID |
| id:85360 | Thor Pedersen | Thor Percy Hinge Pedersen | 85360 | 85360 | ukendt | Gladsaxe Søborg | mand | ukendt | 2025:1; 2026:1 | ja | ja | ukendt | entydig på ID |
| name:thor pedersen | Thor Pedersen | Thor Percy Hinge Pedersen | ukendt | ukendt | 356 | ukendt | mand | ukendt | 2025:1 | ja (identitet uafklaret) | ukendt | ja | ingen |
| id:305273 | Thorfin Holm | ukendt | 305273 | 305273 | 1033 | Gladsaxe Søborg; Islands Brygge | mand | ukendt | 2025:9; 2026:1 | ja (identitet uafklaret) | ja | ukendt | entydig på ID |
| id:301893 | Thøger Jakobsen | Thøger Eusebius Jakobsen | 301893 | 301893 | 483 | Gladsaxe Søborg | mand | ukendt | 2020:4; 2021:5; 2022:18; 2022:5; 2023:1; 2023:18; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:166792 | Tim Guldbæk | ukendt | 166792 | 166792 | 891 | Gladsaxe Søborg | mand | ukendt | 2012:9; 2013:9; 2014:9; 2015:1; 2015:9; 2016:11; 2016:9; 2017:1; 2017:11; 2017:9; 2018:11; 2018:9; 2019:1; 2019:11; 2019:9; 2020:11; 2020:9; 2021:11; 2021:9; 2022:11; 2022:9; 2023:11; 2023:9; 2024:11; 2024:9; 2025:11; 2025:9; 2026:13; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:15105 | Tina Kærgaard Wissing | ukendt | 15105 | 15105 | 272 | Gladsaxe Søborg | kvinde | ukendt | 2012:1; 2013:1; 2014:1; 2015:1; 2016:1; 2017:1; 2018:1; 2019:1; 2020:1; 2025:1; 2025:9 | ja | ukendt | ukendt | entydig på ID |
| id:13582 | Tina Skov Mikkelsen | ukendt | 13582 | 13582 | 504 | Gladsaxe Søborg | kvinde | ukendt | 2019:1; 2020:1; 2021:1; 2024:9; 2025:1; 2025:9; 2026:1; 2026:9 | ja | ja | ukendt | entydig på ID |
| id:268237 | Tip Andersen | ukendt | ukendt | 268237 | 3678 | ukendt | kvinde | ukendt | 2017:9 | ukendt | ukendt | ukendt | navn+klub |
| id:316241 | Tobias Bach Riber | ukendt | ukendt | 316241 | ukendt | ukendt | ukendt | ukendt | 2023:18 | ukendt | ukendt | ukendt | ingen |
| id:355233 | Tobias Geil Christophersen | ukendt | 355233 | 355233 | 5419 | Gladsaxe Søborg | mand | ukendt | 2024:2; 2025:2; 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:297597 | Tobias Holm-Hansen | ukendt | ukendt | 297597 | 5878 | ukendt | ukendt | ukendt | 2017:4; 2018:4; 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:334655 | Tobias Lerche | ukendt | ukendt | 334655 | 5235 | ukendt | ukendt | ukendt | 2022:18 | ukendt | ukendt | ukendt | navn+klub |
| id:236524 | Tobias Soldath Detlefsen | ukendt | ukendt | 236524 | 5641 | ukendt | ukendt | ukendt | 2013:5; 2014:5 | ukendt | ukendt | ukendt | navn+klub |
| id:156249 | Tobias Weinreich Hansen | ukendt | 156249 | 156249 | 387 | Gladsaxe Søborg | mand | ukendt | 2012:3; 2013:3; 2014:4; 2015:5; 2016:5; 2017:18; 2017:5; 2018:1; 2018:18; 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2024:1; 2025:1; 2026:1 | ja | ja | ja | entydig på ID |
| id:301688 | Tommy Sonne Alstrøm | ukendt | 301688 | 301688 | 715 | Gladsaxe Søborg | mand | ukendt | 2025:1; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:359827 | Torben Larsen | ukendt | 359827 | 359827 | ukendt | Gladsaxe Søborg | mand | ukendt | 2025:9 | ja | ukendt | ukendt | entydig på ID |
| name:torben larsen | Torben Larsen | ukendt | ukendt | ukendt | 965 | ukendt | ukendt | ukendt | 2025:11; 2025:9 | ja (identitet uafklaret) | ukendt | ukendt | ingen |
| id:314827 | Tore Kristian Krogh | ukendt | ukendt | 314827 | 6008 | ukendt | ukendt | ukendt | 2019:5; 2020:5 | ukendt | ukendt | ukendt | navn+klub |
| id:346921 | Tristan Vindevoghel Hansen | ukendt | ukendt | 346921 | 5300 | ukendt | ukendt | ukendt | 2023:18 | ukendt | ukendt | ukendt | navn+klub |
| id:5357 | Tue Abelskov | ukendt | 5357 | 5357 | 1151 | Gladsaxe Søborg | mand | ukendt | 2012:11; 2012:9; 2013:11; 2013:12; 2013:9; 2014:11; 2014:9; 2015:11; 2015:13; 2015:9; 2016:11; 2016:13; 2016:9; 2017:11; 2017:13; 2017:9; 2018:11; 2018:13; 2018:9; 2019:11; 2019:13; 2019:9; 2020:11; 2020:13; 2021:11; 2021:13; 2022:11; 2022:13; 2022:9; 2023:11; 2023:13; 2023:17; 2023:9; 2024:11; 2024:13; 2024:17; 2025:11; 2025:13; 2025:17 | ja (identitet uafklaret) | ukendt | ukendt | entydig på ID |
| id:247242 | Ulla Milsted | ukendt | 247242 | 247242 | 1066 | Gladsaxe Søborg | kvinde | ukendt | 2013:9; 2014:11; 2014:9; 2015:1; 2015:11; 2015:9; 2016:1; 2016:11; 2016:9; 2017:9; 2018:11; 2018:9; 2019:11; 2019:9; 2021:11; 2021:9; 2022:11; 2023:11; 2023:13; 2024:11; 2025:11; 2025:9; 2026:1 | ja | ja | ukendt | entydig på ID |
| id:15082 | Ulrik Nielsen | ukendt | ukendt | 15082 | 3529 | ukendt | mand | ukendt | 2015:1; 2016:1; 2017:1 | ukendt | ukendt | ukendt | navn+klub |
| id:337779 | Valdemar Hougaard Poulsen | ukendt | ukendt | 337779 | 6508 | ukendt | ukendt | ukendt | 2022:5 | ukendt | ukendt | ukendt | navn+klub |
| id:336258 | Valdemar Styner Rostock | ukendt | ukendt | 336258 | 6662 | ukendt | ukendt | ukendt | 2023:5 | ukendt | ukendt | ukendt | navn+klub |
| id:330481 | Varneka Prasanna Kumar Lavanya | ukendt | 330481 | 330481 | 120 | Gladsaxe Søborg | kvinde | ukendt | 2021:3; 2022:4; 2023:4; 2024:5; 2025:5; 2026:18 | ja | ja | ukendt | entydig på ID |
| id:354898 | Victor Adriano Okstoft Carmelo | ukendt | 354898 | 354898 | 1604 | Gladsaxe Søborg | mand | ukendt | 2024:1 | ukendt | ukendt | ukendt | entydig på ID |
| id:301517 | Victor August Drabik Espersen | ukendt | ukendt | 301517 | 2410 | ukendt | mand | ukendt | 2017:4; 2020:5; 2021:1; 2021:5; 2022:1 | ukendt | ukendt | ukendt | navn+klub |
| id:361995 | Victor Jønch Langberg | ukendt | 361995 | 361995 | 6978 | Gladsaxe Søborg | mand | ukendt | 2024:2; 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:357701 | Victor Lundby Bresemann | ukendt | 357701 | ukendt | ukendt | Gladsaxe Søborg | mand | ukendt | ukendt | ukendt | ukendt | ukendt | ingen |
| id:364507 | Vigga Overskov Lohorst | ukendt | ukendt | 364507 | 7465 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:365016 | Viggo Engedal Nielsen | ukendt | ukendt | 365016 | 7441 | ukendt | ukendt | ukendt | 2025:2 | ja | ukendt | ukendt | navn+klub |
| id:236517 | Viggo Kongslev Hilbert | ukendt | ukendt | 236517 | 3744 | ukendt | mand | ukendt | 2013:3; 2014:4; 2015:4; 2016:5; 2017:5 | ukendt | ukendt | ukendt | navn+klub |
| id:310110 | Viktor Bertelsen | ukendt | ukendt | 310110 | ukendt | ukendt | mand | ukendt | 2022:5 | ukendt | ukendt | ukendt | ingen |
| id:347415 | Viktor Rotbøl Torland | ukendt | ukendt | 347415 | 6741 | ukendt | ukendt | ukendt | 2023:2 | ukendt | ukendt | ukendt | navn+klub |
| id:364431 | Vilbert Saxmose Nøddekær | ukendt | ukendt | 364431 | 7214 | ukendt | ukendt | ukendt | 2025:3 | ja | ukendt | ukendt | navn+klub |
| id:287231 | Villads Bjerregaard | ukendt | 287231 | 287231 | 661 | Gladsaxe Søborg | mand | ukendt | 2024:1; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| id:332724 | Villads Markersen | ukendt | ukendt | 332724 | 6181 | ukendt | ukendt | ukendt | 2021:3; 2022:3; 2023:4 | ukendt | ukendt | ukendt | navn+klub |
| id:355145 | Vincent Patrick Stack | ukendt | ukendt | 355145 | 6849 | ukendt | ukendt | ukendt | 2024:4 | ukendt | ukendt | ukendt | navn+klub |
| id:338513 | Vincent Timm Nelbom | ukendt | 338513 | 338513 | ukendt | KBK Kbh. | mand | ukendt | 2023:18 | ukendt | ukendt | ukendt | entydig på ID |
| id:353224 | Vitus Reinholdt Amelung | ukendt | 353224 | 353224 | 5421 | Gladsaxe Søborg | mand | ukendt | 2024:2; 2025:2; 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:346141 | Walter Kjær Kunckel | ukendt | 346141 | 346141 | 6733 | Gladsaxe Søborg | mand | ukendt | 2023:2; 2024:2; 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:362314 | Wilhemina Li Heisterberg | ukendt | 362314 | 362314 | 7178 | Gladsaxe Søborg | kvinde | ukendt | 2025:3 | ja | ukendt | ukendt | entydig på ID |
| id:363178 | Wille Sangild | ukendt | 363178 | 363178 | 7239 | Gladsaxe Søborg | mand | ukendt | 2025:2 | ja | ukendt | ukendt | entydig på ID |
| id:346765 | William Bülow Schou Hansen | ukendt | ukendt | 346765 | 6677 | ukendt | ukendt | ukendt | 2023:4 | ukendt | ukendt | ukendt | navn+klub |
| id:332698 | William Gullberg | ukendt | ukendt | 332698 | 6136 | ukendt | ukendt | ukendt | 2021:2 | ukendt | ukendt | ukendt | navn+klub |
| id:251802 | William Markman Albertsen | ukendt | ukendt | 251802 | 5690 | ukendt | ukendt | ukendt | 2014:4 | ukendt | ukendt | ukendt | navn+klub |
| id:346919 | William Romm Egi | ukendt | 346919 | 346919 | 209 | Gladsaxe Søborg | mand | ukendt | 2023:5; 2024:5; 2025:18 | ja | ukendt | ukendt | entydig på ID |
| id:258242 | William Staal-Christensen | ukendt | ukendt | 258242 | 2393 | ukendt | mand | ukendt | 2014:3; 2015:3; 2016:4; 2017:4 | ukendt | ukendt | ukendt | navn+klub |
| id:362597 | Yasi Mosafer | ukendt | 362597 | 362597 | 172 | Gladsaxe Søborg | kvinde | ukendt | 2025:5 | ja | ukendt | ukendt | entydig på ID |
| id:245964 | Yasmin Kjær Thøgersen | ukendt | ukendt | 245964 | 5580 | ukendt | ukendt | ukendt | 2013:3; 2014:3; 2016:4; 2017:5 | ukendt | ukendt | ukendt | navn+klub |
| id:251584 | Yiting Chen | ukendt | 251584 | 251584 | ukendt | Gladsaxe Søborg | mand | ukendt | 2019:1; 2020:1; 2021:1; 2022:1; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1 | ja | ukendt | ukendt | entydig på ID |
| name:yiting chen | Yiting Chen | ukendt | ukendt | ukendt | 558 | ukendt | mand | ukendt | 2019:1; 2020:1; 2021:1; 2022:1; 2022:9; 2023:1; 2023:9; 2024:1; 2024:9; 2025:1 | ja (identitet uafklaret) | ukendt | ja | ingen |
| id:320667 | Yuan Liang | ukendt | 320667 | 320667 | ukendt | Gladsaxe Søborg; Herlev/Hjorten | mand | ukendt | 2026:1 | ukendt | ja | ukendt | entydig på ID |
| id:328197 | Zayn Bhuiya | ukendt | ukendt | 328197 | 6104 | ukendt | ukendt | ukendt | 2020:2 | ukendt | ukendt | ukendt | navn+klub |
| id:355801 | Aanya Jha | ukendt | 355801 | 355801 | 81 | Gladsaxe Søborg | kvinde | ukendt | 2024:3; 2025:4; 2026:4 | ja | ja | ukendt | entydig på ID |
| id:328375 | Aanya Sarma | ukendt | 328375 | 328375 | 123 | Gladsaxe Søborg | kvinde | ukendt | 2021:3; 2022:3; 2023:3; 2023:4; 2024:4; 2025:5; 2026:5 | ja | ja | ukendt | entydig på ID |
| id:327185 | Aarav Jha | ukendt | ukendt | 327185 | 6227 | ukendt | ukendt | ukendt | 2021:4; 2022:4; 2023:5 | ukendt | ukendt | ukendt | navn+klub |
