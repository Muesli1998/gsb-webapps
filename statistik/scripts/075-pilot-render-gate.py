import json
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright


REFERENCE_DB = os.environ["PILOT_REFERENCE_DB"]
OUT = Path("results/075-render-gate.json")


def reference_rows():
    db_uri = "file:" + REFERENCE_DB.replace("\\", "/") + "?mode=ro"
    with sqlite3.connect(db_uri, uri=True) as db:
        db.execute("PRAGMA query_only=ON")
        rows = db.execute(
            """
            SELECT tm.external_match_id, tm.season_id, c.league_group_id,
                   tm.result_raw, tm.status
            FROM team_matches tm
            LEFT JOIN competitions c ON c.competition_id = tm.competition_id
            WHERE tm.status = 'browser_verified' AND tm.result_raw IS NOT NULL
              AND tm.external_match_id IN ('337416','494475','494477','505211','506441')
            ORDER BY tm.external_match_id
            """
        ).fetchall()
    if len(rows) != 5:
        raise RuntimeError(f"Expected 5 reference rows, found {len(rows)}")
    return rows


def main():
    rows = reference_rows()
    observations = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page()
        for match_id, season, group_id, expected_result, status in rows:
            url = (
                "https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/"
                f"#5,{season},{group_id},1,8,,{match_id},1093,"
            )
            started = datetime.now(timezone.utc).isoformat()
            error = None
            text = ""
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=30000)
                page.wait_for_timeout(5000)
                text = page.locator("body").inner_text()
            except Exception as exc:
                error = type(exc).__name__ + ": " + str(exc)
            result_lines = [line.strip() for line in text.splitlines() if line.strip().startswith("Resultat")]
            observations.append(
                {
                    "matchId": match_id,
                    "season": season,
                    "leagueGroupId": group_id,
                    "expectedResult": expected_result,
                    "referenceStatus": status,
                    "url": url,
                    "checkedAt": started,
                    "textLength": len(text),
                    "hasExpectedMatchId": str(match_id) in text,
                    "resultLines": result_lines,
                    "renderGate": str(match_id) in text and bool(result_lines),
                    "error": error,
                }
            )
        browser.close()
    report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "route": "fresh Playwright headless Chromium",
        "waitMs": 5000,
        "gate": "expected match ID in rendered body text and a line starting with Resultat",
        "observations": observations,
        "passed": sum(1 for row in observations if row["renderGate"]),
        "attempted": len(observations),
    }
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
