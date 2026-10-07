# Opgave 150 — ranglistepilot

Status: completed_probe. Forespørgsler: 20/20.

## Forespørgselslog

| Nr. | Kald/filter | HTTP | Bytes | SHA-256 |
|---:|---|---:|---:|---|
| 1 | GET frisk Ranglister-side | 200 | 24149 | 6387864dd5ce8a4ededb5696fa28628e2e1538b192e8c630a2be523e6ca92b1e |
| 2 | baseline liste 288 param=M version/current side 0 | 200 | 81492 | b361c3bf8255721b5086a9db1541ed48b4d739cbe3b00602afb9c36acd224561 |
| 3 | version=30-09-2026 | 500 | 91 | 2167b7b80b4dd880b96b3c76818d5f30bc2734b8b0b80f249357570e529e2664 |
| 4 | version=30-09-2026 retry 2 | 500 | 91 | 2167b7b80b4dd880b96b3c76818d5f30bc2734b8b0b80f249357570e529e2664 |
| 5 | version=30-09-2026 retry 3 | 500 | 91 | 2167b7b80b4dd880b96b3c76818d5f30bc2734b8b0b80f249357570e529e2664 |
| 6 | frisk GET til fortsættelse | 200 | 24149 | 9180c56864749684feb844d3d6ddfcfd98d328da74f1d1e08a32bb8ef4d33343 |
| 7 | version Value=10/01/2026 | 200 | 81514 | 1cbda2cff2d34f12cb128530cac58b6792044eaf4d812892da784ea892aa63e7 |
| 8 | pageindex=1 baseline288 | 200 | 81791 | dc61930bbbe0a5f180de717c2e7024d6a8c7832e791623101bad74e4b519f3ef |
| 9 | agegroupid=5 gender=K list287 | 200 | 63023 | f17dc3578b93def61e071edd2679073a3e37cc525c3c5641f5661a9d69a1aca8 |
| 10 | clubid=1093 list287 | 200 | 63502 | 77eb56334edc2e54bc7384cdffb9af3a89ffedf980a65653d83197270669341d |
| 11 | regionid=8 list287 | 200 | 62229 | d281aab2b2e0fb947545e19edf5aeb83319ca019be1ddadd6ab0ade3bef08a9c |
| 12 | list289 param=M | 200 | 81612 | 28c8c8d192b63df9474a88042a74218d7f9edb7039d7f00cfeec2aa2f16ffaf3 |
| 13 | list292 param=M | 200 | 81648 | 7d448d138d2c1c002a37a594f8d319561b226e7542111895ae84f2c662f4c5a7 |
| 14 | seasonid=2025 getversions | 200 | 88746 | c4b3a57ee4dfca6c8b430c3151fa51239510d44a5e8c75f9e05ec01411f0d4d7 |
| 15 | season2025 version Value=12/31/2025 | 200 | 88837 | 79940bbfb34153f978c7f630c88434e5f6a23f5a7193577e829a37d047f10e70 |
| 16 | seasonid=2022 getversions | 200 | 87277 | f8d0efa8eff2c7f7fa6271b866ae4049e5cdc846197952df4f25b7be2860bf6c |
| 17 | frisk GET før afsluttende filtre | 200 | 24149 | 1f1ea49b88918f7ddcbec88f6bb72722d8115f04391c840f4b354f3a704cd57b |
| 18 | baseline list287 current page0 | 200 | 59349 | 4ccabd67fe5ce1d80c2f9cdc02e654783f5c998bbf6bdb9977d7caf156c67668 |
| 19 | clubid=1093 list287 pageindex=1 | 200 | 63630 | ca7ded06d122106ddb561f5210e59f00c451d7dd589ebdaf2b718f8fe97f3a83 |
| 20 | clubid=1093 list287 pageindex=2 | 200 | 63897 | 3b077c110cabd7b50ad739832e02f0051920374ae504f7bf637708edeb87b959 |

## Fund

{
  "baseline_list288": {
    "rows": 100,
    "pages": 99,
    "points_populated": 100,
    "first_five": [
      {
        "rank": 1,
        "prior_rank": "(1)",
        "member_number": "970427‑02",
        "name": "Anders Antonsen",
        "club": "Aarhus AB",
        "class": "SEN E",
        "points": 4975,
        "player_id": "79451"
      },
      {
        "rank": 2,
        "prior_rank": "(2)",
        "member_number": "980925‑15",
        "name": "Toma Junior Popov (EU)",
        "club": "Solrød Strand",
        "class": "SEN E",
        "points": 4930,
        "player_id": "163508"
      },
      {
        "rank": 3,
        "prior_rank": "(3)",
        "member_number": "970111‑02",
        "name": "Rasmus Gemke",
        "club": "Hvidovre",
        "class": "SEN E",
        "points": 4900,
        "player_id": "77864"
      },
      {
        "rank": 4,
        "prior_rank": "(4)",
        "member_number": "000616‑18",
        "name": "Nhat Nguyen (udl.)",
        "club": null,
        "class": "",
        "points": 4880,
        "player_id": "324838"
      },
      {
        "rank": 5,
        "prior_rank": "(5)",
        "member_number": "011125‑13",
        "name": "Brian Yang (udl.)",
        "club": "Gentofte",
        "class": "",
        "points": 4835,
        "player_id": "328579"
      }
    ]
  },
  "dated_version_value_test": {
    "value": "10/01/2026",
    "status": 200,
    "rowset_changed_vs_baseline": true,
    "common_player_ids": 99,
    "baseline_rows": 100,
    "dated_rows": 100
  },
  "pagination": {
    "request_pageindex": "1",
    "status": 200,
    "page0_rows": 100,
    "page1_rows": 100,
    "rows_differ": true,
    "common_player_ids": 0,
    "last_page_index_linked_from_page0": 98,
    "page_count_if_zero_based": 99
  },
  "list287_unfiltered": {
    "rows": 100,
    "pages": 212,
    "first_five": [
      {
        "rank": 1,
        "prior_rank": null,
        "member_number": "970427‑02",
        "name": "Anders Antonsen",
        "club": "Aarhus AB",
        "class": "SEN E",
        "points": null,
        "player_id": "79451"
      },
      {
        "rank": 2,
        "prior_rank": null,
        "member_number": "920306‑08",
        "name": "Kim Astrup Sørensen",
        "club": "Hvidovre",
        "class": "SEN E",
        "points": null,
        "player_id": "47081"
      },
      {
        "rank": 3,
        "prior_rank": null,
        "member_number": "980925‑15",
        "name": "Toma Junior Popov (EU)",
        "club": "Solrød Strand",
        "class": "SEN E",
        "points": null,
        "player_id": "163508"
      },
      {
        "rank": 4,
        "prior_rank": null,
        "member_number": "020311‑01",
        "name": "Mads Vestergaard",
        "club": "Højbjerg",
        "class": "SEN E",
        "points": null,
        "player_id": "3019"
      },
      {
        "rank": 5,
        "prior_rank": null,
        "member_number": "970111‑02",
        "name": "Rasmus Gemke",
        "club": "Hvidovre",
        "class": "SEN E",
        "points": null,
        "player_id": "77864"
      }
    ]
  },
  "agegroup_filter": {
    "requested_agegroupid": "5",
    "requested_gender": "K",
    "rows": 100,
    "classes_returned": [
      "U15 A",
      "U15 E",
      "U15 E-M",
      "U15 M",
      "U17 E"
    ],
    "rowset_changed_vs_unfiltered287": true,
    "all_rows_match_U15_label": false,
    "comparison": {
      "rows_a": 100,
      "rows_b": 100,
      "exact_same_order_and_values": false,
      "common_player_ids": 0,
      "ids_added_in_b": 100,
      "ids_removed_in_b": 100,
      "common_ids_with_rank_or_points_changed": 0,
      "changed_examples": []
    }
  },
  "gsb_club_filter": {
    "rows_by_page": [
      {
        "label": "clubid=1093 list287",
        "rows": 100
      },
      {
        "label": "clubid=1093 list287 pageindex=1",
        "rows": 100
      },
      {
        "label": "clubid=1093 list287 pageindex=2",
        "rows": 100
      }
    ],
    "unique_rows_pages0to2": 300,
    "pages_implied_by_response": 4,
    "pages_retrieved": 3,
    "unfetched_pageindices": [
      3
    ],
    "only_gladsaxe_soborg_club_labels": true,
    "distinct_clubs": [
      "Gladsaxe Søborg",
      "Gladsaxe Søborg (g)"
    ],
    "rows_with_numeric_points": 0,
    "rows_with_profile_player_id": 300
  },
  "region_filter": {
    "rows": 100,
    "distinct_clubs": [
      "BC37 Amager",
      "Charlottenlund",
      "Drive",
      "Gentofte",
      "Gentofte (g)",
      "Hvidovre",
      "Hvidovre (g)",
      "KBK Kbh.",
      "KBK Kbh. (g)",
      "KMB2010",
      "KMB2010 (g)",
      "Lyngby",
      "NBK Amager",
      "Skovshoved",
      "Skovshoved (g)"
    ],
    "comparison_vs_unfiltered287": {
      "rows_a": 100,
      "rows_b": 100,
      "exact_same_order_and_values": false,
      "common_player_ids": 36,
      "ids_added_in_b": 64,
      "ids_removed_in_b": 64,
      "common_ids_with_rank_or_points_changed": 36,
      "changed_examples": [
        {
          "player_id": "47081",
          "before": {
            "rank": 2,
            "points": null
          },
          "after": {
            "rank": 1,
            "points": null
          }
        },
        {
          "player_id": "77864",
          "before": {
            "rank": 5,
            "points": null
          },
          "after": {
            "rank": 2,
            "points": null
          }
        },
        {
          "player_id": "29269",
          "before": {
            "rank": 7,
            "points": null
          },
          "after": {
            "rank": 3,
            "points": null
          }
        },
        {
          "player_id": "352371",
          "before": {
            "rank": 10,
            "points": null
          },
          "after": {
            "rank": 4,
            "points": null
          }
        },
        {
          "player_id": "163381",
          "before": {
            "rank": 13,
            "points": null
          },
          "after": {
            "rank": 5,
            "points": null
          }
        }
      ]
    }
  },
  "other_lists": [
    {
      "label": "list289 param=M",
      "status": 200,
      "rows": 100,
      "first_five": [
        {
          "rank": 1,
          "prior_rank": "(1)",
          "member_number": "970713‑10",
          "name": "Ben Lane (udl.)",
          "club": "Aarhus AB",
          "class": "",
          "points": 4965,
          "player_id": "80581"
        },
        {
          "rank": 2,
          "prior_rank": "(2)",
          "member_number": "020311‑01",
          "name": "Mads Vestergaard",
          "club": "Højbjerg",
          "class": "SEN E",
          "points": 4945,
          "player_id": "3019"
        },
        {
          "rank": 2,
          "prior_rank": "(2)",
          "member_number": "000802‑01",
          "name": "Daniel Lundgaard",
          "club": "Skovshoved",
          "class": "SEN E",
          "points": 4945,
          "player_id": "1311"
        },
        {
          "rank": 4,
          "prior_rank": "(4)",
          "member_number": "890215‑01",
          "name": "Anders Skaarup Rasmussen",
          "club": "KBK Kbh.",
          "class": "SEN E",
          "points": 4920,
          "player_id": "29269"
        },
        {
          "rank": 4,
          "prior_rank": "(4)",
          "member_number": "920306‑08",
          "name": "Kim Astrup Sørensen",
          "club": "Hvidovre",
          "class": "SEN E",
          "points": 4920,
          "player_id": "47081"
        }
      ]
    },
    {
      "label": "list292 param=M",
      "status": 200,
      "rows": 100,
      "first_five": [
        {
          "rank": 1,
          "prior_rank": "(1)",
          "member_number": "940220‑01",
          "name": "Mathias Christiansen",
          "club": "Skagen",
          "class": "SEN E",
          "points": 4995,
          "player_id": "59946"
        },
        {
          "rank": 2,
          "prior_rank": "(2)",
          "member_number": "990112‑11",
          "name": "Thom Mark Gicquel",
          "club": "Skælskør",
          "class": "",
          "points": 4985,
          "player_id": "163434"
        },
        {
          "rank": 3,
          "prior_rank": "(3)",
          "member_number": "951109‑12",
          "name": "Marvin Emil Seidel (EU)",
          "club": "Hvidovre",
          "class": "SEN E",
          "points": 4880,
          "player_id": "352371"
        },
        {
          "rank": 4,
          "prior_rank": "(4)",
          "member_number": "020311‑01",
          "name": "Mads Vestergaard",
          "club": "Højbjerg",
          "class": "SEN E",
          "points": 4865,
          "player_id": "3019"
        },
        {
          "rank": 5,
          "prior_rank": "(5)",
          "member_number": "990207‑01",
          "name": "Jesper Toft",
          "club": "Højbjerg",
          "class": "SEN E",
          "points": 4845,
          "player_id": "86982"
        }
      ]
    }
  ],
  "season2025": {
    "status": 200,
    "versions_count": 159,
    "dated_versions": 158,
    "selected_value": "12/31/2025",
    "selected_version_rows": [
      {
        "rank": 1,
        "prior_rank": "(1)",
        "member_number": "970427‑02",
        "name": "Anders Antonsen",
        "club": "Aarhus AB",
        "class": "SEN E",
        "points": 4995,
        "player_id": "79451"
      },
      {
        "rank": 2,
        "prior_rank": "(2)",
        "member_number": "980925‑15",
        "name": "Toma Junior Popov (EU)",
        "club": "Skælskør",
        "class": "SEN E",
        "points": 4930,
        "player_id": "163508"
      },
      {
        "rank": 3,
        "prior_rank": "(3)",
        "member_number": "940104‑12",
        "name": "Viktor Axelsen",
        "club": "Skovshoved",
        "class": "SEN E",
        "points": 4850,
        "player_id": "59158"
      },
      {
        "rank": 4,
        "prior_rank": "(4)",
        "member_number": "970111‑02",
        "name": "Rasmus Gemke",
        "club": "Hvidovre",
        "class": "SEN E",
        "points": 4847,
        "player_id": "77864"
      },
      {
        "rank": 5,
        "prior_rank": "(5)",
        "member_number": "000616‑18",
        "name": "Nhat Nguyen (udl.)",
        "club": "Skælskør",
        "class": "",
        "points": 4845,
        "player_id": "324838"
      },
      {
        "rank": 6,
        "prior_rank": "(6)",
        "member_number": "011125‑13",
        "name": "Brian Yang (udl.)",
        "club": "Gentofte",
        "class": "",
        "points": 4840,
        "player_id": "328579"
      },
      {
        "rank": 7,
        "prior_rank": "(7)",
        "member_number": "000425‑18",
        "name": "Arnaud Merkle (EU)",
        "club": "Gentofte",
        "class": "SEN E",
        "points": 4825,
        "player_id": "213529"
      },
      {
        "rank": 8,
        "prior_rank": "(8)",
        "member_number": "020202‑01",
        "name": "Magnus Johannesen",
        "club": "Hjørring",
        "class": "SEN E",
        "points": 4784,
        "player_id": "2972"
      },
      {
        "rank": 9,
        "prior_rank": "(9)",
        "member_number": "021214‑06",
        "name": "Joakim Oldorff (EU)",
        "club": "Skælskør",
        "class": "SEN E",
        "points": 4745,
        "player_id": "232616"
      },
      {
        "rank": 10,
        "prior_rank": "(10)",
        "member_number": "970824‑01",
        "name": "Mads Christophersen",
        "club": "Skovshoved",
        "class": "SEN E",
        "points": 4715,
        "player_id": "81169"
      },
      {
        "rank": 11,
        "prior_rank": "(11)",
        "member_number": "010520‑11",
        "name": "Sathish Karunakaran (udl.)",
        "club": "Greve",
        "class": "",
        "points": 4700,
        "player_id": "355746"
      },
      {
        "rank": 11,
        "prior_rank": "(11)",
        "member_number": "940226‑18",
        "name": "Kalle Koljonen (EU)",
        "club": "Skælskør",
        "class": "",
        "points": 4700,
        "player_id": "60083"
      },
      {
        "rank": 13,
        "prior_rank": "(13)",
        "member_number": "961124‑13",
        "name": "Ygor Coelho (udl.)",
        "club": "Aalborg Triton",
        "class": "SEN E-M",
        "points": 4628,
        "player_id": "250876"
      },
      {
        "rank": 14,
        "prior_rank": "(14)",
        "member_number": "950125‑15",
        "name": "Mark Caljouw (EU)",
        "club": "Skælskør",
        "class": "SEN E",
        "points": 4603,
        "player_id": "66142"
      },
      {
        "rank": 15,
        "prior_rank": "(15)",
        "member_number": "000702‑10",
        "name": "Julien Carraggi (EU)",
        "club": "Hvidovre",
        "class": "SEN E",
        "points": 4582,
        "player_id": "213539"
      },
      {
        "rank": 16,
        "prior_rank": "(16)",
        "member_number": "950802‑01",
        "name": "Victor Svendsen",
        "club": "Hjørring",
        "class": "SEN E",
        "points": 4553,
        "player_id": "69610"
      },
      {
        "rank": 17,
        "prior_rank": "(17)",
        "member_number": "030505‑16",
        "name": "Enogat Roy (EU)",
        "club": "Solrød Strand (g)",
        "class": "SEN E-M",
        "points": 4416,
        "player_id": "335690"
      },
      {
        "rank": 17,
        "prior_rank": "(17)",
        "member_number": "030120‑02",
        "name": "Victor Ørding Kauffmann",
        "club": "Gentofte",
        "class": "SEN E-M",
        "points": 4416,
        "player_id": "91606"
      },
      {
        "rank": 19,
        "prior_rank": "(19)",
        "member_number": "920609‑02",
        "name": "Rasmus Messerschmidt",
        "club": "Hillerød",
        "class": "SEN E-M",
        "points": 4407,
        "player_id": "48886"
      },
      {
        "rank": 20,
        "prior_rank": "(20)",
        "member_number": "040214‑01",
        "name": "Jakob Houe Andersen",
        "club": "Højbjerg",
        "class": "SEN E-M",
        "points": 4394,
        "player_id": "156109"
      },
      {
        "rank": 21,
        "prior_rank": "(21)",
        "member_number": "060629‑01",
        "name": "William Bøgebjerg",
        "club": "Greve",
        "class": "SEN E-M",
        "points": 4377,
        "player_id": "197402"
      },
      {
        "rank": 22,
        "prior_rank": "(22)",
        "member_number": "950226‑20",
        "name": "Felix Burestedt (EU)",
        "club": "Solrød Strand",
        "class": "SEN E-M",
        "points": 4356,
        "player_id": "66689"
      },
      {
        "rank": 23,
        "prior_rank": "(23)",
        "member_number": "980516‑18",
        "name": "Joran Kweekel (EU)",
        "club": "Solrød Strand",
        "class": "SEN E-M",
        "points": 4345,
        "player_id": "317469"
      },
      {
        "rank": 24,
        "prior_rank": "(24)",
        "member_number": "981105‑18",
        "name": "Dimitar Yanakiev (EU)",
        "club": "Hvidovre",
        "class": "SEN E-M",
        "points": 4334,
        "player_id": "342033"
      },
      {
        "rank": 25,
        "prior_rank": "(25)",
        "member_number": "930821‑14",
        "name": "Kim Bruun",
        "club": "Badminton Roskilde",
        "class": "SEN E-M",
        "points": 4314,
        "player_id": "56896"
      },
      {
        "rank": 26,
        "prior_rank": "(26)",
        "member_number": "970630‑01",
        "name": "Ditlev Jæger Holm",
        "club": "Værløse",
        "class": "SEN E-M",
        "points": 4306,
        "player_id": "80361"
      },
      {
        "rank": 26,
        "prior_rank": "(26)",
        "member_number": "860116‑01",
        "name": "Hans-Kristian Solberg Vittinghus",
        "club": "Hvidovre (g)",
        "class": "SEN E-M",
        "points": 4306,
        "player_id": "14903"
      },
      {
        "rank": 28,
        "prior_rank": "(28)",
        "member_number": "961030‑19",
        "name": "Karan Rajan Rajarajan",
        "club": "KBK Kbh.",
        "class": "SEN E-M",
        "points": 4254,
        "player_id": "272325"
      },
      {
        "rank": 29,
        "prior_rank": "(29)",
        "member_number": "030116‑01",
        "name": "Mads Juel Møller",
        "club": "Højbjerg",
        "class": "SEN E-M",
        "points": 4250,
        "player_id": "3255"
      },
      {
        "rank": 30,
        "prior_rank": "(30)",
        "member_number": "030325‑01",
        "name": "Christopher Vittoriani",
        "club": "Skovshoved",
        "class": "SEN E-M",
        "points": 4205,
        "player_id": "3269"
      },
      {
        "rank": 31,
        "prior_rank": "(31)",
        "member_number": "951010‑01",
        "name": "David Kim Kristensen",
        "club": "Greve",
        "class": "SEN E-M",
        "points": 4136,
        "player_id": "70867"
      },
      {
        "rank": 32,
        "prior_rank": "(32)",
        "member_number": "970226‑03",
        "name": "Jeppe Bruun Christensen",
        "club": "KBK Kbh. (g)",
        "class": "SEN E-M",
        "points": 4129,
        "player_id": "78581"
      },
      {
        "rank": 33,
        "prior_rank": "(33)",
        "member_number": "910415‑01",
        "name": "Steffen Rasmussen",
        "club": "Nr. Broby",
        "class": "SEN E-M",
        "points": 4102,
        "player_id": "41491"
      },
      {
        "rank": 34,
        "prior_rank": "(34)",
        "member_number": "020405‑03",
        "name": "Matthias Kicklitz (EU)",
        "club": "Gentofte",
        "class": "SEN E-M",
        "points": 4043,
        "player_id": "3049"
      },
      {
        "rank": 35,
        "prior_rank": "(35)",
        "member_number": "070531‑01",
        "name": "Phillip Kryger Boe",
        "club": "Odense OBK",
        "class": "",
        "points": 4019,
        "player_id": "233783"
      },
      {
        "rank": 36,
        "prior_rank": "(36)",
        "member_number": "980926‑16",
        "name": "Elias Bracke (EU)",
        "club": "Hillerød",
        "class": "SEN E-M",
        "points": 3982,
        "player_id": "328510"
      },
      {
        "rank": 37,
        "prior_rank": "(37)",
        "member_number": "040323‑01",
        "name": "Mikkel Langemark",
        "club": "Skovshoved",
        "class": "SEN E-M",
        "points": 3959,
        "player_id": "92587"
      },
      {
        "rank": 38,
        "prior_rank": "(38)",
        "member_number": "050818‑04",
        "name": "Mads Emil Monke",
        "club": "Højbjerg",
        "class": "SEN E-M",
        "points": 3953,
        "player_id": "236101"
      },
      {
        "rank": 39,
        "prior_rank": "(39)",
        "member_number": "020325‑02",
        "name": "Mathias Solgaard",
        "club": "Skælskør",
        "class": "SEN E-M",
        "points": 3946,
        "player_id": "3032"
      },
      {
        "rank": 40,
        "prior_rank": "(40)",
        "member_number": "981101‑07",
        "name": "Søren Hald",
        "club": "Odense OBK",
        "class": "SEN E-M",
        "points": 3942,
        "player_id": "86129"
      },
      {
        "rank": 41,
        "prior_rank": "(41)",
        "member_number": "010522‑06",
        "name": "Magnus Klinggaard Andersen",
        "club": "Aarhus AB",
        "class": "SEN E-M",
        "points": 3941,
        "player_id": "155869"
      },
      {
        "rank": 42,
        "prior_rank": "(42)",
        "member_number": "990219‑01",
        "name": "Mads Thøgersen",
        "club": "Værløse",
        "class": "SEN E-M",
        "points": 3920,
        "player_id": "87098"
      },
      {
        "rank": 43,
        "prior_rank": "(43)",
        "member_number": "960424‑16",
        "name": "Milan Dratva (EU)",
        "club": "Kolding BK",
        "class": "SEN E-M",
        "points": 3912,
        "player_id": "282099"
      },
      {
        "rank": 44,
        "prior_rank": "(44)",
        "member_number": "000616‑12",
        "name": "Markus Barth",
        "club": "Værløse",
        "class": "SEN E-M",
        "points": 3886,
        "player_id": "213896"
      },
      {
        "rank": 45,
        "prior_rank": "(45)",
        "member_number": "040523‑02",
        "name": "Niklas Lynge Olesen",
        "club": "Værløse (g)",
        "class": "SEN E-M",
        "points": 3885,
        "player_id": "236652"
      },
      {
        "rank": 46,
        "prior_rank": "(46)",
        "member_number": "020329‑16",
        "name": "Gustav Bjørkler (EU)",
        "club": "Skagen",
        "class": "SEN E-M",
        "points": 3883,
        "player_id": "317513"
      },
      {
        "rank": 47,
        "prior_rank": "(47)",
        "member_number": "070415‑01",
        "name": "Salomon Adam Thomasen",
        "club": "Højbjerg",
        "class": "",
        "points": 3882,
        "player_id": "243882"
      },
      {
        "rank": 48,
        "prior_rank": "(48)",
        "member_number": "910612‑08",
        "name": "Maxime Moreels (EU)",
        "club": "Holbæk",
        "class": "SEN E-M",
        "points": 3867,
        "player_id": "328643"
      },
      {
        "rank": 49,
        "prior_rank": "(49)",
        "member_number": "021118‑05",
        "name": "Marcus Kruse Pedersen",
        "club": "Holbæk",
        "class": "SEN E-M",
        "points": 3865,
        "player_id": "229469"
      },
      {
        "rank": 50,
        "prior_rank": "(50)",
        "member_number": "050716‑02",
        "name": "Nikolaj Søgaard",
        "club": "Kolding BK",
        "class": "SEN E-M",
        "points": 3850,
        "player_id": "228178"
      },
      {
        "rank": 51,
        "prior_rank": "(51)",
        "member_number": "080407‑01",
        "name": "Frederik Hinding",
        "club": "Odense OBK",
        "class": "",
        "points": 3842,
        "player_id": "272027"
      },
      {
        "rank": 52,
        "prior_rank": "(52)",
        "member_number": "000414‑02",
        "name": "Jonas Jæger",
        "club": "Lillerød",
        "class": "SEN E-M",
        "points": 3841,
        "player_id": "693"
      },
      {
        "rank": 53,
        "prior_rank": "(53)",
        "member_number": "050314‑01",
        "name": "Alexander Ringbæk",
        "club": "Hillerød",
        "class": "SEN E-M",
        "points": 3835,
        "player_id": "210207"
      },
      {
        "rank": 54,
        "prior_rank": "(54)",
        "member_number": "010605‑05",
        "name": "Simon Bay",
        "club": "Lillerød",
        "class": "SEN E-M",
        "points": 3833,
        "player_id": "132254"
      },
      {
        "rank": 55,
        "prior_rank": "(55)",
        "member_number": "980521‑04",
        "name": "Frederik Fibiger",
        "club": "Slagelse",
        "class": "SEN E-M",
        "points": 3822,
        "player_id": "84285"
      },
      {
        "rank": 56,
        "prior_rank": "(56)",
        "member_number": "051220‑02",
        "name": "Sebastian Mikkelsen",
        "club": "Solrød Strand",
        "class": "SEN E-M",
        "points": 3809,
        "player_id": "215418"
      },
      {
        "rank": 57,
        "prior_rank": "(57)",
        "member_number": "030530‑01",
        "name": "Nikolaj Lassen",
        "club": "Aarhus AB",
        "class": "SEN E-M",
        "points": 3760,
        "player_id": "132281"
      },
      {
        "rank": 58,
        "prior_rank": "(58)",
        "member_number": "001018‑03",
        "name": "Mads Sørensen",
        "club": "abc Aalborg",
        "class": "SEN E-M",
        "points": 3747,
        "player_id": "1686"
      },
      {
        "rank": 59,
        "prior_rank": "(59)",
        "member_number": "031228‑01",
        "name": "Alexander Pedersen",
        "club": "Lillerød",
        "class": "SEN E-M",
        "points": 3740,
        "player_id": "164952"
      },
      {
        "rank": 60,
        "prior_rank": "(60)",
        "member_number": "051128‑03",
        "name": "Sebastian Lassen Nielsen",
        "club": "Langhøj",
        "class": "SEN E-M",
        "points": 3735,
        "player_id": "251230"
      },
      {
        "rank": 60,
        "prior_rank": "(60)",
        "member_number": "000202‑03",
        "name": "Victor Nexø",
        "club": "Aalborg Triton",
        "class": "SEN E-M",
        "points": 3735,
        "player_id": "267"
      },
      {
        "rank": 62,
        "prior_rank": "(62)",
        "member_number": "980721‑28",
        "name": "Shaun Ekengren (EU)",
        "club": "Jernløse",
        "class": "SEN E-M",
        "points": 3732,
        "player_id": "287015"
      },
      {
        "rank": 63,
        "prior_rank": "(63)",
        "member_number": "930701‑03",
        "name": "Michael Svejsø",
        "club": "KBK Kbh.",
        "class": "SEN E-M",
        "points": 3728,
        "player_id": "55896"
      },
      {
        "rank": 64,
        "prior_rank": "(64)",
        "member_number": "980130‑04",
        "name": "Jakob Godt Hansen",
        "club": "Aarhus AB",
        "class": "SEN E-M",
        "points": 3721,
        "player_id": "83051"
      },
      {
        "rank": 65,
        "prior_rank": "(65)",
        "member_number": "030730‑01",
        "name": "Jacob Thyge",
        "club": "Greve",
        "class": "SEN E-M",
        "points": 3720,
        "player_id": "91821"
      },
      {
        "rank": 66,
        "prior_rank": "(66)",
        "member_number": "090428‑01",
        "name": "Christopher Mads Kunckel",
        "club": "Gentofte",
        "class": "",
        "points": 3715,
        "player_id": "276250"
      },
      {
        "rank": 67,
        "prior_rank": "(67)",
        "member_number": "020618‑01",
        "name": "Marcus Viscovich",
        "club": "Gentofte",
        "class": "SEN E-M",
        "points": 3714,
        "player_id": "3127"
      },
      {
        "rank": 68,
        "prior_rank": "(68)",
        "member_number": "040326‑10",
        "name": "Sanjeevi Padmanabhan Vasudevan",
        "club": "Langhøj (g)",
        "class": "SEN E-M",
        "points": 3707,
        "player_id": "331998"
      },
      {
        "rank": 69,
        "prior_rank": "(69)",
        "member_number": "070930‑01",
        "name": "Simon Rasmussen",
        "club": "Gentofte",
        "class": "",
        "points": 3702,
        "player_id": "250116"
      },
      {
        "rank": 70,
        "prior_rank": "(70)",
        "member_number": "771014‑02",
        "name": "Casper Lund",
        "club": "Gug",
        "class": "SEN E-M",
        "points": 3700,
        "player_id": "11576"
      },
      {
        "rank": 71,
        "prior_rank": "(71)",
        "member_number": "881024‑02",
        "name": "Gabriel Ulldahl (EU)",
        "club": "Aalborg Triton (g)",
        "class": "SEN E-M",
        "points": 3693,
        "player_id": "25471"
      },
      {
        "rank": 72,
        "prior_rank": "(72)",
        "member_number": "090127‑01",
        "name": "Maximilian Ørding Kauffmann",
        "club": "Gentofte",
        "class": "",
        "points": 3690,
        "player_id": "262320"
      },
      {
        "rank": 73,
        "prior_rank": "(73)",
        "member_number": "740802‑01",
        "name": "Peter Rasmussen",
        "club": "Gentofte",
        "class": "SEN E-M",
        "points": 3689,
        "player_id": "10313"
      },
      {
        "rank": 74,
        "prior_rank": "(74)",
        "member_number": "970417‑02",
        "name": "Mikkel Enghøj",
        "club": "Værløse",
        "class": "SEN E-M",
        "points": 3680,
        "player_id": "79296"
      },
      {
        "rank": 75,
        "prior_rank": "(75)",
        "member_number": "980629‑01",
        "name": "Emil Langemark",
        "club": "Skovshoved",
        "class": "SEN E-M",
        "points": 3677,
        "player_id": "84709"
      },
      {
        "rank": 76,
        "prior_rank": "(76)",
        "member_number": "020730‑01",
        "name": "Jacob Hjorth Jensen",
        "club": "Hvidovre",
        "class": "SEN E-M",
        "points": 3675,
        "player_id": "3159"
      },
      {
        "rank": 77,
        "prior_rank": "(77)",
        "member_number": "060418‑04",
        "name": "Romeo Makboul (EU)",
        "club": "Langhøj",
        "class": "SEN E-M",
        "points": 3670,
        "player_id": "274910"
      },
      {
        "rank": 78,
        "prior_rank": "(78)",
        "member_number": "030708‑03",
        "name": "Jonas Kudsk",
        "club": "Greve",
        "class": "SEN E-M",
        "points": 3663,
        "player_id": "115748"
      },
      {
        "rank": 79,
        "prior_rank": "(79)",
        "member_number": "020303‑01",
        "name": "Malthe Mølbjerg Nielsen",
        "club": "Aalborg Triton",
        "class": "SEN E-M",
        "points": 3656,
        "player_id": "3008"
      },
      {
        "rank": 80,
        "prior_rank": "(80)",
        "member_number": "950315‑06",
        "name": "Mads Selmer Christensen",
        "club": "Odense OBK",
        "class": "SEN E-M",
        "points": 3654,
        "player_id": "66976"
      },
      {
        "rank": 81,
        "prior_rank": "(81)",
        "member_number": "920123‑03",
        "name": "Rune Christtreu",
        "club": "Hjørring",
        "class": "SEN E-M",
        "points": 3648,
        "player_id": "46297"
      },
      {
        "rank": 82,
        "prior_rank": "(82)",
        "member_number": "920427‑02",
        "name": "Aske Høgsted Lauritsen",
        "club": "Solrød Strand",
        "class": "SEN E-M",
        "points": 3641,
        "player_id": "48099"
      },
      {
        "rank": 83,
        "prior_rank": "(83)",
        "member_number": "890718‑03",
        "name": "Thomas Fynbo",
        "club": "Karlslunde",
        "class": "SEN E-M",
        "points": 3640,
        "player_id": "31488"
      },
      {
        "rank": 84,
        "prior_rank": "(85)",
        "member_number": "740414‑01",
        "name": "Gregers Schytt",
        "club": "Frederiksberg",
        "class": "SEN E-M",
        "points": 3634,
        "player_id": "10218"
      },
      {
        "rank": 85,
        "prior_rank": "(86)",
        "member_number": "980725‑01",
        "name": "Mickey Lykkegren",
        "club": "Aarhus Akademisk",
        "class": "SEN E-M",
        "points": 3631,
        "player_id": "85019"
      },
      {
        "rank": 86,
        "prior_rank": "(88)",
        "member_number": "050807‑01",
        "name": "Martin Harbo Andersen",
        "club": "Badminton Esbjerg",
        "class": "SEN E-M",
        "points": 3622,
        "player_id": "226295"
      },
      {
        "rank": 86,
        "prior_rank": "(88)",
        "member_number": "020205‑02",
        "name": "Axel Henrik Parkhøi",
        "club": "Skovshoved",
        "class": "SEN E-M",
        "points": 3622,
        "player_id": "2976"
      },
      {
        "rank": 88,
        "prior_rank": "(91)",
        "member_number": "980612‑10",
        "name": "Oliver Lee Nowak",
        "club": "Badminton Esbjerg",
        "class": "SEN E-M",
        "points": 3617,
        "player_id": "84525"
      },
      {
        "rank": 89,
        "prior_rank": "(92)",
        "member_number": "980809‑02",
        "name": "Anders Junker",
        "club": "Grindsted BK",
        "class": "SEN E-M",
        "points": 3613,
        "player_id": "85187"
      },
      {
        "rank": 90,
        "prior_rank": "(94)",
        "member_number": "950128‑05",
        "name": "Patrick Bjerregaard",
        "club": "Solrød Strand",
        "class": "SEN E-M",
        "points": 3603,
        "player_id": "66183"
      },
      {
        "rank": 91,
        "prior_rank": "(95)",
        "member_number": "950818‑07",
        "name": "Rasmus Rylander",
        "club": "KMB2010",
        "class": "SEN E-M",
        "points": 3602,
        "player_id": "69929"
      },
      {
        "rank": 92,
        "prior_rank": "(96)",
        "member_number": "920725‑01",
        "name": "Kasper Dinesen",
        "club": "Solrød Strand",
        "class": "SEN E-M",
        "points": 3601,
        "player_id": "49785"
      },
      {
        "rank": 93,
        "prior_rank": "(97)",
        "member_number": "090323‑01",
        "name": "Elias Martin",
        "club": "Værløse",
        "class": "",
        "points": 3597,
        "player_id": "280999"
      },
      {
        "rank": 94,
        "prior_rank": "(98)",
        "member_number": "110119‑01",
        "name": "Marvin Jakob Galan Mogensen",
        "club": "Jernløse",
        "class": "",
        "points": 3594,
        "player_id": "289785"
      },
      {
        "rank": 95,
        "prior_rank": "(100)",
        "member_number": "930424‑03",
        "name": "Rasmus Carøe Christensen",
        "club": "Viborg",
        "class": "SEN E-M",
        "points": 3590,
        "player_id": "54565"
      },
      {
        "rank": 96,
        "prior_rank": "(101)",
        "member_number": "960331‑07",
        "name": "Thomas Jensen",
        "club": "Badminton Esbjerg",
        "class": "SEN E-M",
        "points": 3583,
        "player_id": "73557"
      },
      {
        "rank": 97,
        "prior_rank": "(102)",
        "member_number": "970726‑02",
        "name": "Patrick Seitzberg Abildgaard",
        "club": "KMB2010",
        "class": "SEN E-M",
        "points": 3573,
        "player_id": "80754"
      },
      {
        "rank": 97,
        "prior_rank": "(102)",
        "member_number": "050917‑05",
        "name": "Jens Frederik Guldbrandt",
        "club": "Aarhus AB",
        "class": "SEN M",
        "points": 3573,
        "player_id": "250412"
      },
      {
        "rank": 99,
        "prior_rank": "(104)",
        "member_number": "040906‑15",
        "name": "Emil Dantler (EU)",
        "club": "Højbjerg",
        "class": "SEN M",
        "points": 3563,
        "player_id": "335595"
      },
      {
        "rank": 100,
        "prior_rank": "(105)",
        "member_number": "940101‑06",
        "name": "Jacob Nilsson (EU)",
        "club": "Solrød Strand",
        "class": "SEN E-M",
        "points": 3556,
        "player_id": "59082"
      }
    ],
    "changed_vs_current_season_baseline": true
  },
  "season2022": {
    "status": 200,
    "versions_count": 138,
    "dated_versions": 137,
    "newest": {
      "label": "19-06-2023",
      "value": "06/19/2023",
      "selected": false
    },
    "oldest": {
      "label": "01-07-2022",
      "value": "07/01/2022",
      "selected": false
    }
  }
}

## Filterresultater

[
  {
    "number": 2,
    "label": "baseline liste 288 param=M version/current side 0",
    "status": 200,
    "response_bytes": 81492,
    "response_sha256": "b361c3bf8255721b5086a9db1541ed48b4d739cbe3b00602afb9c36acd224561",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":3,\"clubs\":38,\"dated_versions\":41}"
  },
  {
    "number": 3,
    "label": "version=30-09-2026",
    "status": 500,
    "response_bytes": 91,
    "response_sha256": "2167b7b80b4dd880b96b3c76818d5f30bc2734b8b0b80f249357570e529e2664",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2026",
      "rankinglistversiondate": "30-09-2026",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "HTTP 500"
  },
  {
    "number": 4,
    "label": "version=30-09-2026 retry 2",
    "status": 500,
    "response_bytes": 91,
    "response_sha256": "2167b7b80b4dd880b96b3c76818d5f30bc2734b8b0b80f249357570e529e2664",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2026",
      "rankinglistversiondate": "30-09-2026",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "HTTP 500"
  },
  {
    "number": 5,
    "label": "version=30-09-2026 retry 3",
    "status": 500,
    "response_bytes": 91,
    "response_sha256": "2167b7b80b4dd880b96b3c76818d5f30bc2734b8b0b80f249357570e529e2664",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2026",
      "rankinglistversiondate": "30-09-2026",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "HTTP 500"
  },
  {
    "number": 7,
    "label": "version Value=10/01/2026",
    "status": 200,
    "response_bytes": 81514,
    "response_sha256": "1cbda2cff2d34f12cb128530cac58b6792044eaf4d812892da784ea892aa63e7",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2026",
      "rankinglistversiondate": "10/01/2026",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":3,\"clubs\":37,\"dated_versions\":41}"
  },
  {
    "number": 8,
    "label": "pageindex=1 baseline288",
    "status": 200,
    "response_bytes": 81791,
    "response_sha256": "dc61930bbbe0a5f180de717c2e7024d6a8c7832e791623101bad74e4b519f3ef",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "1",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":3,\"clubs\":49,\"dated_versions\":41}"
  },
  {
    "number": 9,
    "label": "agegroupid=5 gender=K list287",
    "status": 200,
    "response_bytes": 63023,
    "response_sha256": "f17dc3578b93def61e071edd2679073a3e37cc525c3c5641f5661a9d69a1aca8",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "287",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "5",
      "classid": "",
      "gender": "K",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":5,\"clubs\":45,\"dated_versions\":41}"
  },
  {
    "number": 10,
    "label": "clubid=1093 list287",
    "status": 200,
    "response_bytes": 63502,
    "response_sha256": "77eb56334edc2e54bc7384cdffb9af3a89ffedf980a65653d83197270669341d",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "287",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "1093",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":14,\"clubs\":2,\"dated_versions\":41}"
  },
  {
    "number": 11,
    "label": "regionid=8 list287",
    "status": 200,
    "response_bytes": 62229,
    "response_sha256": "d281aab2b2e0fb947545e19edf5aeb83319ca019be1ddadd6ab0ade3bef08a9c",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "287",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "8",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":5,\"clubs\":15,\"dated_versions\":41}"
  },
  {
    "number": 12,
    "label": "list289 param=M",
    "status": 200,
    "response_bytes": 81612,
    "response_sha256": "28c8c8d192b63df9474a88042a74218d7f9edb7039d7f00cfeec2aa2f16ffaf3",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "289",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":2,\"clubs\":36,\"dated_versions\":41}"
  },
  {
    "number": 13,
    "label": "list292 param=M",
    "status": 200,
    "response_bytes": 81648,
    "response_sha256": "7d448d138d2c1c002a37a594f8d319561b226e7542111895ae84f2c662f4c5a7",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "292",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":3,\"clubs\":41,\"dated_versions\":41}"
  },
  {
    "number": 14,
    "label": "seasonid=2025 getversions",
    "status": 200,
    "response_bytes": 88746,
    "response_sha256": "c4b3a57ee4dfca6c8b430c3151fa51239510d44a5e8c75f9e05ec01411f0d4d7",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2025",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":3,\"clubs\":42,\"dated_versions\":158}"
  },
  {
    "number": 15,
    "label": "season2025 version Value=12/31/2025",
    "status": 200,
    "response_bytes": 88837,
    "response_sha256": "79940bbfb34153f978c7f630c88434e5f6a23f5a7193577e829a37d047f10e70",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2025",
      "rankinglistversiondate": "12/31/2025",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":3,\"clubs\":38,\"dated_versions\":158}"
  },
  {
    "number": 16,
    "label": "seasonid=2022 getversions",
    "status": 200,
    "response_bytes": 87277,
    "response_sha256": "f8d0efa8eff2c7f7fa6271b866ae4049e5cdc846197952df4f25b7be2860bf6c",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "288",
      "seasonid": "2022",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "M",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":3,\"clubs\":37,\"dated_versions\":137}"
  },
  {
    "number": 18,
    "label": "baseline list287 current page0",
    "status": 200,
    "response_bytes": 59349,
    "response_sha256": "4ccabd67fe5ce1d80c2f9cdc02e654783f5c998bbf6bdb9977d7caf156c67668",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "287",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "",
      "pageindex": "0",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":2,\"clubs\":31,\"dated_versions\":41}"
  },
  {
    "number": 19,
    "label": "clubid=1093 list287 pageindex=1",
    "status": 200,
    "response_bytes": 63630,
    "response_sha256": "ca7ded06d122106ddb561f5210e59f00c451d7dd589ebdaf2b718f8fe97f3a83",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "287",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "1093",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "",
      "pageindex": "1",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":20,\"clubs\":1,\"dated_versions\":41}"
  },
  {
    "number": 20,
    "label": "clubid=1093 list287 pageindex=2",
    "status": 200,
    "response_bytes": 63897,
    "response_sha256": "3b077c110cabd7b50ad739832e02f0051920374ae504f7bf637708edeb87b959",
    "request_fields": {
      "callbackcontextkey": "[REDACTED]",
      "rankinglistagegroupid": "15",
      "rankinglistid": "287",
      "seasonid": "2026",
      "rankinglistversiondate": "",
      "agegroupid": "",
      "classid": "",
      "gender": "",
      "clubid": "1093",
      "searchall": false,
      "regionid": "",
      "pointsfrom": "",
      "pointsto": "",
      "rankingfrom": "",
      "rankingto": "",
      "birthdatefromstring": "",
      "birthdatetostring": "",
      "agefrom": "",
      "ageto": "",
      "playerid": "",
      "param": "",
      "pageindex": "2",
      "sortfield": "0",
      "getversions": true,
      "getplayer": true
    },
    "result": "{\"rows\":100,\"classes\":14,\"clubs\":1,\"dated_versions\":41}"
  }
]

## ID-kobling (pilotens hentede udsnit)

{
  "gsb": [
    {
      "source_id": "name:mina lorin özden",
      "player_id": 398,
      "name": "Mina Lorin Özden",
      "season": 2025,
      "age_group_id": 5,
      "match_id": "493887",
      "date": "2025-10-05",
      "discipline": "D",
      "team": "Gladsaxe Søborg 2",
      "national_external_player_id": "327186",
      "candidate_ids_checked": [
        "name:mina lorin özden",
        "327186"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 152,
          "prior_rank": "(11031)",
          "member_number": "100123‑07",
          "name": "Mina Lorin Özden",
          "club": "Gladsaxe Søborg",
          "class": "U17 B",
          "points": null,
          "player_id": "327186"
        }
      ]
    },
    {
      "source_id": "name:anton stensbo knudsen",
      "player_id": 76,
      "name": "Anton Stensbo Knudsen",
      "season": 2025,
      "age_group_id": 4,
      "match_id": "487694",
      "date": "2025-09-21",
      "discipline": "HD",
      "team": "Gladsaxe Søborg 9",
      "national_external_player_id": "353219",
      "candidate_ids_checked": [
        "name:anton stensbo knudsen",
        "353219"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 189,
          "prior_rank": "(13158)",
          "member_number": "131020‑05",
          "name": "Anton Stensbo Knudsen",
          "club": "Gladsaxe Søborg",
          "class": "U15 C",
          "points": null,
          "player_id": "353219"
        }
      ]
    },
    {
      "source_id": "name:aanya jha",
      "player_id": 81,
      "name": "Aanya Jha",
      "season": 2025,
      "age_group_id": 4,
      "match_id": "487698",
      "date": "2025-09-21",
      "discipline": "DD",
      "team": "Gladsaxe Søborg 10",
      "national_external_player_id": "355801",
      "candidate_ids_checked": [
        "name:aanya jha",
        "355801"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 212,
          "prior_rank": "(14387)",
          "member_number": "141005‑04",
          "name": "Aanya Jha",
          "club": "Gladsaxe Søborg",
          "class": "U13 B",
          "points": null,
          "player_id": "355801"
        }
      ]
    },
    {
      "source_id": "name:rishi mandapati",
      "player_id": 124,
      "name": "Rishi Mandapati",
      "season": 2025,
      "age_group_id": 18,
      "match_id": "494348",
      "date": "2026-02-22",
      "discipline": "D",
      "team": "Gladsaxe Søborg 1",
      "national_external_player_id": "330775",
      "candidate_ids_checked": [
        "name:rishi mandapati",
        "330775"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 158,
          "prior_rank": "(11562)",
          "member_number": "120507‑04",
          "name": "Rishi Mandapati",
          "club": "Gladsaxe Søborg",
          "class": "U15 B",
          "points": null,
          "player_id": "330775"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 5428,
      "name": "Josephine Geil Christophersen",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505305",
      "date": "2026-03-22",
      "discipline": "S",
      "team": "Gladsaxe Søborg 5",
      "national_external_player_id": "361951",
      "candidate_ids_checked": [
        "361951"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": null,
      "player_id": 5430,
      "name": "Ina Bagge Køhler",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505305",
      "date": "2026-03-22",
      "discipline": "D",
      "team": "Gladsaxe Søborg 5",
      "national_external_player_id": "361675",
      "candidate_ids_checked": [
        "361675"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": null,
      "player_id": 5432,
      "name": "Ellie Hjorth Laursen",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505300",
      "date": "2026-03-08",
      "discipline": "D",
      "team": "Gladsaxe Søborg 5",
      "national_external_player_id": "362301",
      "candidate_ids_checked": [
        "362301"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": null,
      "player_id": 5434,
      "name": "Frida Bohn Jeppesen",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505305",
      "date": "2026-03-22",
      "discipline": "D",
      "team": "Gladsaxe Søborg 5",
      "national_external_player_id": "364399",
      "candidate_ids_checked": [
        "364399"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": null,
      "player_id": 5419,
      "name": "Tobias Geil Christophersen",
      "season": 2025,
      "age_group_id": 3,
      "match_id": "493271",
      "date": "2026-01-11",
      "discipline": "D",
      "team": "Gladsaxe Søborg 3",
      "national_external_player_id": "355233",
      "candidate_ids_checked": [
        "355233"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 173,
          "prior_rank": "(12174)",
          "member_number": "170829‑01",
          "name": "Tobias Geil Christophersen",
          "club": "Gladsaxe Søborg",
          "class": "U11 A-B",
          "points": null,
          "player_id": "355233"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 5421,
      "name": "Vitus Reinholdt Amelung",
      "season": 2025,
      "age_group_id": 3,
      "match_id": "493260",
      "date": "2025-11-16",
      "discipline": "D",
      "team": "Gladsaxe Søborg 3",
      "national_external_player_id": "353224",
      "candidate_ids_checked": [
        "353224"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 202,
          "prior_rank": "(13672)",
          "member_number": "170427‑02",
          "name": "Vitus Reinholdt Amelung",
          "club": "Gladsaxe Søborg",
          "class": "U11 B",
          "points": null,
          "player_id": "353224"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 5422,
      "name": "Jingyi Victoria Han",
      "season": 2025,
      "age_group_id": 3,
      "match_id": "492734",
      "date": "2025-10-26",
      "discipline": "D",
      "team": "Gladsaxe Søborg 5",
      "national_external_player_id": "352963",
      "candidate_ids_checked": [
        "352963"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 266,
          "prior_rank": "(17932)",
          "member_number": "170112‑02",
          "name": "Jingyi Victoria Han",
          "club": "Gladsaxe Søborg",
          "class": "U11 C",
          "points": null,
          "player_id": "352963"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 5425,
      "name": "Norr Bagge Køhler",
      "season": 2025,
      "age_group_id": 3,
      "match_id": "493271",
      "date": "2026-01-11",
      "discipline": "D",
      "team": "Gladsaxe Søborg 3",
      "national_external_player_id": "355434",
      "candidate_ids_checked": [
        "355434"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 179,
          "prior_rank": "(12688)",
          "member_number": "170601‑01",
          "name": "Norr Bagge Køhler",
          "club": "Gladsaxe Søborg",
          "class": "U11 B",
          "points": null,
          "player_id": "355434"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 5427,
      "name": "Sofus Hansen",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "494480",
      "date": "2025-12-07",
      "discipline": "D",
      "team": "Gladsaxe Søborg 1",
      "national_external_player_id": "352565",
      "candidate_ids_checked": [
        "352565"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 215,
          "prior_rank": "(14493)",
          "member_number": "170224‑02",
          "name": "Sofus Hansen",
          "club": "Gladsaxe Søborg",
          "class": "U11 B",
          "points": null,
          "player_id": "352565"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 7219,
      "name": "Jens Antonio Manfredi Willumsen",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "493225",
      "date": "2025-11-16",
      "discipline": "S",
      "team": "Gladsaxe Søborg 2",
      "national_external_player_id": "361741",
      "candidate_ids_checked": [
        "361741"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 248,
          "prior_rank": "(16747)",
          "member_number": "170322‑03",
          "name": "Jens Antonio Manfredi Willumsen",
          "club": "Gladsaxe Søborg",
          "class": "U11 C",
          "points": null,
          "player_id": "361741"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 7453,
      "name": "Saishiv Prasanna kumar Lavanya",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505252",
      "date": "2026-03-08",
      "discipline": "D",
      "team": "Gladsaxe Søborg 2",
      "national_external_player_id": "364493",
      "candidate_ids_checked": [
        "364493"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": null,
      "player_id": 7226,
      "name": "Sri Mokshita Kolapalli",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505299",
      "date": "2026-03-08",
      "discipline": "S",
      "team": "Gladsaxe Søborg 5",
      "national_external_player_id": "361833",
      "candidate_ids_checked": [
        "361833"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": null,
      "player_id": 7235,
      "name": "Oscar Flyger",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "493235",
      "date": "2025-11-16",
      "discipline": "D",
      "team": "Gladsaxe Søborg 3",
      "national_external_player_id": "361998",
      "candidate_ids_checked": [
        "361998"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 290,
          "prior_rank": "(19941)",
          "member_number": "170317‑01",
          "name": "Oscar Flyger",
          "club": "Gladsaxe Søborg",
          "class": "U11 D",
          "points": null,
          "player_id": "361998"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 7431,
      "name": "Albert Christian Nonno-Nielsen",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505284",
      "date": "2026-03-22",
      "discipline": "D",
      "team": "Gladsaxe Søborg 4",
      "national_external_player_id": "364319",
      "candidate_ids_checked": [
        "364319"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 293,
          "prior_rank": "(20257)",
          "member_number": "170706‑08",
          "name": "Albert Christian Nonno-Nielsen",
          "club": "Gladsaxe Søborg",
          "class": "U11 D",
          "points": null,
          "player_id": "364319"
        }
      ]
    },
    {
      "source_id": null,
      "player_id": 7432,
      "name": "Johan Lyck-Andersen",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505284",
      "date": "2026-03-22",
      "discipline": "S",
      "team": "Gladsaxe Søborg 4",
      "national_external_player_id": "364410",
      "candidate_ids_checked": [
        "364410"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": null,
      "player_id": 7439,
      "name": "Samuel Lynge",
      "season": 2025,
      "age_group_id": 2,
      "match_id": "505256",
      "date": "2026-02-01",
      "discipline": "S",
      "team": "Gladsaxe Søborg 4",
      "national_external_player_id": "364468",
      "candidate_ids_checked": [
        "364468"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    }
  ],
  "opponents": [
    {
      "source_id": "308423",
      "name": "Esmeralda Ansel-Henry",
      "match_id": "494335",
      "date": "2025-10-05",
      "age_group_id": 18,
      "opponent_team": "Vanløse 2",
      "candidate_ids_checked": [
        "308423"
      ],
      "normalized_club_checked": "vanløse",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "362615",
      "name": "Aarav Pandey",
      "match_id": "492136",
      "date": "2025-11-16",
      "age_group_id": 18,
      "opponent_team": "Charlottenlund 1",
      "candidate_ids_checked": [
        "362615"
      ],
      "normalized_club_checked": "charlottenlund",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "352105",
      "name": "Magne Theilgaard",
      "match_id": "494112",
      "date": "2026-03-08",
      "age_group_id": 5,
      "opponent_team": "Valby BC 3",
      "candidate_ids_checked": [
        "352105"
      ],
      "normalized_club_checked": "valby bc",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "348076",
      "name": "Mathilde Stensen Bhatia",
      "match_id": "492732",
      "date": "2025-10-26",
      "age_group_id": 3,
      "opponent_team": "KBK Kbh. 3",
      "candidate_ids_checked": [
        "348076"
      ],
      "normalized_club_checked": "kbk kbh.",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "332669",
      "name": "Sigfus Christian Sayk",
      "match_id": "494348",
      "date": "2026-02-22",
      "age_group_id": 18,
      "opponent_team": "FKIF Frederiksberg 1",
      "candidate_ids_checked": [
        "332669"
      ],
      "normalized_club_checked": "fkif frederiksberg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "359577",
      "name": "Filip Hauwert",
      "match_id": "493967",
      "date": "2025-10-05",
      "age_group_id": 5,
      "opponent_team": "Skovshoved 4",
      "candidate_ids_checked": [
        "359577"
      ],
      "normalized_club_checked": "skovshoved",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "330789",
      "name": "Marius Carstens-Hawaleschka",
      "match_id": "493897",
      "date": "2025-12-07",
      "age_group_id": 5,
      "opponent_team": "FKIF Frederiksberg 1",
      "candidate_ids_checked": [
        "330789"
      ],
      "normalized_club_checked": "fkif frederiksberg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "337317",
      "name": "Anders Hvidegaard",
      "match_id": "493917",
      "date": "2026-02-22",
      "age_group_id": 5,
      "opponent_team": "Skovshoved 3",
      "candidate_ids_checked": [
        "337317"
      ],
      "normalized_club_checked": "skovshoved",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "358721",
      "name": "Freya Pedersen",
      "match_id": "493222",
      "date": "2025-10-26",
      "age_group_id": 2,
      "opponent_team": "Skovshoved 2",
      "candidate_ids_checked": [
        "358721"
      ],
      "normalized_club_checked": "skovshoved",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "346284",
      "name": "Nikolas Yin",
      "match_id": "492918",
      "date": "2025-12-07",
      "age_group_id": 4,
      "opponent_team": "Gladsaxe Søborg 4",
      "candidate_ids_checked": [
        "346284"
      ],
      "normalized_club_checked": "gladsaxe søborg",
      "link_result": "id_match",
      "id_match_count": 1,
      "name_club_candidate_count": 1,
      "sample_ranking_rows": [
        {
          "rank": 216,
          "prior_rank": "(14509)",
          "member_number": "130322‑05",
          "name": "Nikolas Yin",
          "club": "Gladsaxe Søborg",
          "class": "U15 C",
          "points": null,
          "player_id": "346284"
        }
      ]
    },
    {
      "source_id": "335873",
      "name": "Emma Blomkvist Møller",
      "match_id": "487720",
      "date": "2025-09-21",
      "age_group_id": 5,
      "opponent_team": "Herlev/Hjorten 1",
      "candidate_ids_checked": [
        "335873"
      ],
      "normalized_club_checked": "herlev/hjorten",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "350810",
      "name": "Saravana Vel Selvakumaran",
      "match_id": "506503",
      "date": "2026-04-12",
      "age_group_id": 4,
      "opponent_team": "Nyborg 1",
      "candidate_ids_checked": [
        "350810"
      ],
      "normalized_club_checked": "nyborg",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "356024",
      "name": "Norr Togo Bjarrum",
      "match_id": "493258",
      "date": "2025-11-16",
      "age_group_id": 3,
      "opponent_team": "Charlottenlund 1",
      "candidate_ids_checked": [
        "356024"
      ],
      "normalized_club_checked": "charlottenlund",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "359237",
      "name": "Dante Lindberg Hansen",
      "match_id": "494087",
      "date": "2025-10-26",
      "age_group_id": 5,
      "opponent_team": "Charlottenlund 2",
      "candidate_ids_checked": [
        "359237"
      ],
      "normalized_club_checked": "charlottenlund",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "361458",
      "name": "Bille Noel Stavnsbjerg Andersen",
      "match_id": "505300",
      "date": "2026-03-08",
      "age_group_id": 2,
      "opponent_team": "Drive 1",
      "candidate_ids_checked": [
        "361458"
      ],
      "normalized_club_checked": "drive",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "359000",
      "name": "Ludvig Lykke Svendsen",
      "match_id": "492954",
      "date": "2026-01-11",
      "age_group_id": 4,
      "opponent_team": "Drive 5",
      "candidate_ids_checked": [
        "359000"
      ],
      "normalized_club_checked": "drive",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "336747",
      "name": "Bendix Hjort",
      "match_id": "489573",
      "date": "2026-02-01",
      "age_group_id": 5,
      "opponent_team": "Team Bornholm 1",
      "candidate_ids_checked": [
        "336747"
      ],
      "normalized_club_checked": "team bornholm",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "359460",
      "name": "Oskar Spurr Pihlkjær",
      "match_id": "494477",
      "date": "2025-10-26",
      "age_group_id": 2,
      "opponent_team": "Skovshoved 1",
      "candidate_ids_checked": [
        "359460"
      ],
      "normalized_club_checked": "skovshoved",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "362155",
      "name": "Albert Hechmann",
      "match_id": "493614",
      "date": "2026-01-11",
      "age_group_id": 4,
      "opponent_team": "Islands Brygge 3",
      "candidate_ids_checked": [
        "362155"
      ],
      "normalized_club_checked": "islands brygge",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    },
    {
      "source_id": "357754",
      "name": "Oliver Bendixen",
      "match_id": "505988",
      "date": "",
      "age_group_id": 3,
      "opponent_team": "Auning 1",
      "candidate_ids_checked": [
        "357754"
      ],
      "normalized_club_checked": "auning",
      "link_result": "not_found_in_pilot_responses",
      "id_match_count": 0,
      "name_club_candidate_count": 0,
      "sample_ranking_rows": []
    }
  ],
  "rule": "Eksakt ID-match mellem profilens player_id fra VisSpiller-link og enten statistikspillernes source-ID eller national-spillere.db external_player_id. Navn+klub-kandidat kræver begge felter efter normalisering. GSB-stikprøven sammenlignes med alle 3 GSB-filter-sider; modstanderstikprøven med alle hentede succesfulde sider. Ikke fundet er afgrænset til disse svar.",
  "searched_rows": {
    "list288_baseline_page0": 100,
    "list287_baseline_page0": 100,
    "gsb_club_rows_unique_pages0to2": 300,
    "all_successful_response_rows": 1400
  },
  "counts": {
    "gsb": {
      "id_match": 12,
      "name_and_club_candidate": 0,
      "not_found_in_pilot_responses": 8
    },
    "opponents": {
      "id_match": 1,
      "name_and_club_candidate": 0,
      "not_found_in_pilot_responses": 19
    }
  }
}

## Plan og afgrænsninger

{
  "list_ids": [
    287,
    288,
    289,
    292
  ],
  "known_page_counts": {
    "list287_unfiltered_2026": 212,
    "list288_HS_M_2026": 99,
    "list287_GSB_2026": 4
  },
  "gsb_pages_fetched": 3,
  "gsb_pageindex3_fetched": false,
  "observed_dated_version_counts": {
    "season2026_list288": 41,
    "season2025_list288": 158,
    "season2022_list288": 137
  },
  "full_harvest_request_count": "Præcist tal ukendt: versions- og sidetal varierer mellem liste/sæson. De afprøvede liste-288-versioner indeholdt 41, 158 og 137 daterede snapshots for hhv. seasonid 2026, 2025 og 2022; konkrete sidetal varierede også (bl.a. 99 sider for liste 288 HS/M 2026 og 212 for ufiltreret liste 287 2026). Før fuld estimering skal antal versioner og sider tælles pr. liste/sæson/filter. Beregn derefter summen af liste × snapshot × side, plus versionskald og eventuelle filtre.",
  "pacing": "sekventielt, mindst 2 sekunder mellem kald; gem og hash hvert svar; checkpoint pr. liste/version/side; stop ved botværn eller tre fejl i træk.",
  "storage": "ny separat rangliste-database, aldrig skriv til de fire eksisterende databaser.",
  "expected_winner_minimum": "ranglistepoint for begge hold/spillere på begge sider i hver kamp pr. disciplin, fra seneste versionsdato på eller før kampdato; uafklarede ID/navne/klub-koblinger må ikke gættes."
}

## Databaser

{
  "before": {
    "gsb-statistik-normalized.db": "49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E",
    "liga-landskab.db": "9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C",
    "rangliste-historik.db": "6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F",
    "national-spillere.db": "1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E"
  },
  "after": {
    "gsb-statistik-normalized.db": "49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E",
    "liga-landskab.db": "9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C",
    "rangliste-historik.db": "6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F",
    "national-spillere.db": "1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E"
  },
  "unchanged": true
}

## Spørgsmål

rankinglistversiondate fungerer, når den præcise Value-formatstreng sendes: 10/01/2026 og 12/31/2025 gav HTTP 200. Den tidligere Text-formatstreng gav 3×HTTP 500.
agegroupid=5 + gender=K ændrede rækkerne fra ufiltreret liste 287: 100 rækker blev returneret; klasseetiketterne skal læses i rapporten. Om ID 5 semantisk er U15 kan ikke bekræftes alene ud fra parameterens navn.
GSB-listen viser 4 sider, men kun sideindex 0–2 blev hentet inden 20-kaldsgrænsen; sideindex 3 er ikke undersøgt. De 8 ikke-fundne GSB-stikprøver er derfor kun ikke fundet i hentede sider.
Liste 287 returnerede profil-ID på de 300 hentede GSB-rækker, men ingen numeriske pointværdier i pointkolonnen. Liste 288 viste point, men det er ikke bevist, at dens tal erstatter de manglende point i liste 287.
Samlet versionsoversigt viste seneste datoer for seasonid 2022; ældre end den ældste returnerede dato er ikke afprøvet.
ID-kobling i de hentede prøver: GSB 12 ID / 0 navn+klub / 8 ikke fundet; modstandere 1 / 0 / 19. Se afgrænsningen til de hentede sider i rapporten.
