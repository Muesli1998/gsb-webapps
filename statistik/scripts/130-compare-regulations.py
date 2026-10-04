"""Read-only row-name coverage comparison for task 130."""
from __future__ import annotations

import json
import re
import sqlite3
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DB = ROOT / "statistik" / "data" / "liga-landskab.db"
OUT = ROOT / "statistik" / "results"
YOUTH_NAMES = {"U08", "U09", "U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "U18", "U19", "U17/U19", "U23", "UNG"}
U13_TABLES = {
    2024: {"4 spillere": {"A": 6000, "B": 5000, "C": 4200, "C-D": 3800, "D": 3600}, "4 piger": {"C": 3800, "D": 3200}, "2+2": {"A": 5600, "B": 4700, "C": 4000, "D": 3600}},
    2025: {"4 spillere": {"A": 6400, "B": 5800, "C": 5300, "C-D": 5000, "D": 4800}, "4 piger": {"C": 4800, "D": 4400}, "2+2": {"A": 6000, "B": 5400, "C": 5000, "D": 4800}},
    2026: {"4 spillere": {"A": 6400, "B": 5600, "C": 5100, "C-D": 4800, "D": 4600, "Dx": 4400}, "4 piger": {"C": 4800, "D": 4400}, "2+2": {"A": 5800, "B": 5200, "C": 4800, "D": 4600}},
}
SOURCES = {
    2019: "fælles ungdom 2019/20",
    2023: "fælles ungdom 2023/24",
    2024: "fælles ungdom 2024/25 (første udgave + martsrevision)",
    2025: "fælles ungdom 2025/26 (original + revision 8. oktober)",
    2026: "fælles ungdom 2026/27",
}


def u13_match(season: int, title: str | None) -> tuple[bool, str]:
    if season not in U13_TABLES or not title:
        return False, "ingen tabuleret U13-kilde for denne sæson"
    text = title.replace("&#197;", "Å").replace("&#198;", "Æ").replace("&#216;", "Ø")
    if not re.search(r"\bU\s*13\b", text, re.I):
        return False, "ikke U13-label"
    if re.search(r"4\s*piger", text, re.I):
        family = "4 piger"
    elif re.search(r"2\s*\+\s*2", text, re.I):
        family = "2+2"
    elif re.search(r"4\s*spillere", text, re.I):
        family = "4 spillere"
    else:
        return False, "format ikke entydigt nævnt"
    match = re.search(r"\b(C-D|DX|[ABCDM])\b", text, re.I)
    if not match:
        return False, "niveau ikke entydigt nævnt"
    level = match.group(1).upper()
    num_matches = [int(n) for n in re.findall(r"\b\d{4,5}\b", text)]
    expected = U13_TABLES[season][family].get(level)
    if expected is None:
        return False, f"niveau {level} findes ikke i sæsonens {family}-tabel"
    if expected not in num_matches:
        return False, f"sæsonstabel siger {expected}; navnet har {num_matches or 'intet pointtal'}"
    return True, f"{family} {level} {expected} matcher sæsonskema"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(f"file:{DB.as_posix()}?mode=ro", uri=True)
    con.execute("PRAGMA query_only=ON")
    ages = {int(i): str(name) for i, name in con.execute("SELECT age_group_id,name FROM age_groups")}
    youth_ids = [i for i, name in ages.items() if name in YOUTH_NAMES]
    marks = ",".join("?" for _ in youth_ids)
    rows = con.execute(f"""
      SELECT g.season_id,g.age_group_id,g.league_group_id,g.division_name_raw,
             r.region_id,r.name
      FROM league_groups g
      JOIN league_group_regions x USING(season_id,age_group_id,league_group_id)
      JOIN regions r USING(region_id)
      WHERE g.age_group_id IN ({marks})
      ORDER BY g.season_id,r.region_id,g.age_group_id,g.league_group_id
    """, youth_ids).fetchall()
    groups: dict[tuple[int, int, str], dict] = {}
    for season, age_id, lgid, title, rid, region in rows:
        key = (season, rid, region)
        if key not in groups:
            groups[key] = {"season_id": season, "season": f"{season}/{str(season+1)[-2:]}", "region_id": rid, "region": region, "youth_pool_rows": 0, "distinct_division_names": set(), "u13_rows": 0, "u13_exact_source_matches": 0, "u13_not_matched": []}
        item = groups[key]
        item["youth_pool_rows"] += 1
        if title:
            item["distinct_division_names"].add(title)
        if age_id == 4:
            item["u13_rows"] += 1
            matched, reason = u13_match(season, title)
            if matched:
                item["u13_exact_source_matches"] += 1
            else:
                item["u13_not_matched"].append({"division_name_raw": title, "reason": reason})
    result_rows = []
    for item in groups.values():
        item["distinct_division_names"] = len(item["distinct_division_names"])
        item["rule_source_status"] = "national common youth PDF found" if item["season_id"] in SOURCES else "no verified season-specific common youth PDF in archive"
        item["local_offer_status"] = "unknown unless separate regional source is recorded"
        result_rows.append(item)
    result = {
        "generated_at": date.today().isoformat(),
        "database": "statistik/data/liga-landskab.db",
        "read_only": True,
        "youth_age_groups_included": sorted(YOUTH_NAMES),
        "rule_source_seasons": SOURCES,
        "u13_tables": U13_TABLES,
        "method": "Pool/group rows joined to league_group_regions and regions; unique division names counted per season/region. U13 is called source-matching only when age, format, letter and the season-specific official point value all occur in the raw name. This is not a general parser for other ages or unarchived seasons.",
        "rows": result_rows,
    }
    json_path = OUT / "130-reglement-vs-raekkenavne.json"
    json_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    totals = defaultdict(lambda: {"pools": 0, "regions": 0, "u13": 0, "u13_match": 0})
    for row in result_rows:
        t = totals[row["season_id"]]
        t["pools"] += row["youth_pool_rows"]
        t["regions"] += 1
        t["u13"] += row["u13_rows"]
        t["u13_match"] += row["u13_exact_source_matches"]
    lines = ["# Reglementer holdt mod rækkenavne i liga-landskab.db", "", f"Genereret {result['generated_at']} fra read-only database. Joinet omfatter {len(youth_ids)} aldersgruppe-id'er og {len(result_rows)} sæson/regionskombinationer. Rækkeposter er fysiske `league_groups`-poster; de blandes ikke med forekomster fra andre rapporter.", "", "## Antal ungdomspulje-poster pr. sæson og region", "", "| Sæson | Region | Puljeposter | Unikke rå rækkenavne | U13 poster | U13 eksakt matchet til officiel pointtabel | Regelsæsonkilde |", "|---|---|---:|---:|---:|---:|---|"]
    for row in sorted(result_rows, key=lambda x: (x["season_id"], x["region_id"])):
        source = SOURCES.get(row["season_id"], "mangler")
        lines.append(f"| {row['season']} | {row['region']} | {row['youth_pool_rows']} | {row['distinct_division_names']} | {row['u13_rows']} | {row['u13_exact_source_matches']} | {source} |")
    lines += ["", "## Fortolkning og begrænsninger", "", "Tabellen viser databaseforekomster og en snæver U13-krydstjekning, ikke fuld regelmæssig fortolkning af alle rækker. De officielle ungdomsregler siger, at kredse/landsdele selv vælger holdtyper og rækker. Derfor kan en matchende national pointgrænse støtte en fortolkning af et U13-navn, men kan ikke bevise at alle lokale betegnelser eller undtagelser er dækket.", "", "`u13_exact_source_matches` kræver, at navnet rummer U13, et eksplicit format, et eksplicit niveau og den sæsonbestemte pointværdi fra PDF-tabellen. Tal, som kun ligner en niveaugrænse, match ikke. For U09/U11/U15/U17/U19-tabellerne, UGE 38, DMU, begyndere, regionale navne og alle sæsoner uden hentet PDF står der ikke en fortolket total her; de er uafklarede, ikke automatisk ugyldige.", "", "Kilder og præcise sidehenvisninger: [raekkenavne-moenstre.md](../kilder/reglementer/raekkenavne-moenstre.md), [register.json](../kilder/reglementer/register.json), [mangler.md](../kilder/reglementer/mangler.md).", ""]
    md_path = OUT / "130-reglement-vs-raekkenavne.md"
    md_path.write_text("\n".join(lines), encoding="utf-8")
    print(json.dumps({"json": str(json_path.relative_to(ROOT)), "markdown": str(md_path.relative_to(ROOT)), "saison_region_pairs": len(result_rows), "season_totals": totals}, ensure_ascii=False, default=dict, indent=2))
    con.close()


if __name__ == "__main__":
    main()
