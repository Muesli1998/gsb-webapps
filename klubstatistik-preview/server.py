import argparse
import json
import sqlite3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CONFIG = ROOT / "config.local.json"
DB_NAME = Path("statistik") / "data" / "gsb-statistik-normalized.db"


def database_path(config_path: Path) -> Path:
    config = json.loads(config_path.read_text(encoding="utf-8"))
    gsb_data = config.get("gsbData")
    if not gsb_data:
        raise RuntimeError("config.local.json mangler gsbData")
    path = Path(gsb_data) / DB_NAME
    if not path.exists():
        raise RuntimeError(f"Database findes ikke: {path}")
    return path


def rows(db: sqlite3.Connection, query: str, params=()):
    db.row_factory = sqlite3.Row
    return [dict(row) for row in db.execute(query, params)]


def load_data(config_path: Path):
    path = database_path(config_path)
    uri = f"file:{path.as_posix()}?mode=ro"
    with sqlite3.connect(uri, uri=True) as db:
        db.execute("PRAGMA query_only=ON")
        seasons = rows(db, "SELECT season_id AS id, label FROM seasons ORDER BY season_id")
        competitions = rows(
            db,
            """
            SELECT competition_id AS id, season_id AS seasonId,
                   league_group_id AS leagueGroupId, age_group_id AS ageGroupId,
                   name_raw AS name, league_raw AS league, phase_raw AS phase
            FROM competitions ORDER BY season_id DESC, competition_id
            """,
        )
        teams = rows(
            db,
            """
            SELECT t.team_id AS id, t.competition_id AS competitionId,
                   t.season_id AS seasonId, t.name_raw AS name,
                   c.age_group_id AS ageGroupId
            FROM teams t LEFT JOIN competitions c ON c.competition_id=t.competition_id
            WHERE t.club_id=1093
            ORDER BY t.season_id DESC, t.team_id
            """,
        )
        matches = rows(
            db,
            """
            SELECT team_match_id AS teamMatchId, external_match_id AS id, season_id AS seasonId,
                   competition_id AS competitionId, gsb_team_id AS teamId,
                   round_number AS round, round_date AS roundDate,
                   home_name_raw AS home, away_name_raw AS away,
                   result_raw AS result, points_raw AS points, status
            FROM team_matches ORDER BY season_id DESC, round_date, team_match_id
            """,
        )
        players = rows(db, "SELECT player_id AS id, name_raw AS name, external_player_id AS externalPlayerId FROM players ORDER BY player_id")
        individual_matches = rows(
            db,
            """
            SELECT individual_match_id AS id, team_match_id AS teamMatchId,
                   discipline_raw AS discipline, game_number_raw AS gameNumber,
                   category_raw AS category, home_score_raw AS homeScore,
                   away_score_raw AS awayScore, winner_side AS winnerSide,
                   status
            FROM individual_matches ORDER BY team_match_id, individual_match_id
            """,
        )
        player_links = rows(
            db,
            """
            SELECT imp.individual_match_id AS individualMatchId,
                   im.team_match_id AS teamMatchId, imp.player_id AS playerId,
                   imp.side, imp.role
            FROM individual_matches im
            JOIN individual_match_players imp ON imp.individual_match_id=im.individual_match_id
            ORDER BY im.team_match_id, imp.player_id
            """,
        )
    labels = json.loads((ROOT / "statistik" / "agegroup-labels.json").read_text(encoding="utf-8"))
    return {
        "seasons": seasons,
        "ageGroups": {str(key): value for key, value in labels.items()},
        "competitions": competitions,
        "teams": teams,
        "matches": matches,
        "players": players,
        "individualMatches": individual_matches,
        "playerLinks": player_links,
    }


def handler(config_path: Path):
    class PreviewHandler(SimpleHTTPRequestHandler):
        def do_GET(self):
            if self.path == "/api/data":
                try:
                    payload = json.dumps(load_data(config_path), ensure_ascii=False).encode("utf-8")
                except Exception as exc:
                    payload = json.dumps({"error": str(exc)}, ensure_ascii=False).encode("utf-8")
                    self.send_response(500)
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.send_header("Content-Length", str(len(payload)))
                    self.end_headers()
                    self.wfile.write(payload)
                    return
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-store")
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
                return
            super().do_GET()

    return PreviewHandler


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--port", type=int, default=8761)
    args = parser.parse_args()
    if not args.config.exists():
        raise SystemExit(f"Mangler lokal konfiguration: {args.config}")
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler(args.config))
    print(f"Klubstatistik Preview: http://127.0.0.1:{args.port}/klubstatistik.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
