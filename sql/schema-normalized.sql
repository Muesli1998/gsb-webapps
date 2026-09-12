PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS seasons (
  season_id INTEGER PRIMARY KEY,
  label TEXT
);
CREATE TABLE IF NOT EXISTS clubs (
  club_id INTEGER PRIMARY KEY,
  badmintonplayer_id INTEGER,
  nembadminton_id INTEGER,
  name_raw TEXT NOT NULL,
  name_normalized TEXT
);
CREATE TABLE IF NOT EXISTS competitions (
  competition_id INTEGER PRIMARY KEY AUTOINCREMENT,
  season_id INTEGER NOT NULL REFERENCES seasons(season_id),
  league_group_id TEXT NOT NULL,
  age_group_id INTEGER,
  name_raw TEXT,
  league_raw TEXT,
  phase_raw TEXT,
  source_url TEXT,
  UNIQUE(season_id, league_group_id, age_group_id)
);
CREATE TABLE IF NOT EXISTS teams (
  team_id INTEGER PRIMARY KEY AUTOINCREMENT,
  club_id INTEGER REFERENCES clubs(club_id),
  season_id INTEGER NOT NULL REFERENCES seasons(season_id),
  competition_id INTEGER REFERENCES competitions(competition_id),
  name_raw TEXT NOT NULL,
  UNIQUE(season_id, competition_id, name_raw)
);
CREATE TABLE IF NOT EXISTS team_matches (
  team_match_id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_match_id TEXT NOT NULL UNIQUE,
  season_id INTEGER NOT NULL REFERENCES seasons(season_id),
  competition_id INTEGER REFERENCES competitions(competition_id),
  gsb_team_id INTEGER REFERENCES teams(team_id),
  round_number INTEGER,
  round_date TEXT,
  game_time TEXT,
  home_name_raw TEXT,
  away_name_raw TEXT,
  result_raw TEXT,
  points_raw TEXT,
  status TEXT NOT NULL DEFAULT 'unknown',
  walkover_text_raw TEXT,
  source_status TEXT,
  raw_payload_id INTEGER
);
CREATE TABLE IF NOT EXISTS players (
  player_id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_player_id TEXT UNIQUE,
  name_raw TEXT NOT NULL,
  name_normalized TEXT
);
CREATE TABLE IF NOT EXISTS individual_matches (
  individual_match_id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_match_id INTEGER NOT NULL REFERENCES team_matches(team_match_id),
  discipline_raw TEXT,
  game_number_raw TEXT,
  category_raw TEXT,
  home_score_raw TEXT,
  away_score_raw TEXT,
  winner_side TEXT,
  status TEXT DEFAULT 'unknown'
);
CREATE TABLE IF NOT EXISTS individual_match_players (
  individual_match_id INTEGER NOT NULL REFERENCES individual_matches(individual_match_id),
  player_id INTEGER NOT NULL REFERENCES players(player_id),
  side TEXT,
  pair_number INTEGER,
  role TEXT,
  points_at_match TEXT,
  PRIMARY KEY(individual_match_id, player_id, side, pair_number)
);
CREATE TABLE IF NOT EXISTS standings (
  standing_id INTEGER PRIMARY KEY AUTOINCREMENT,
  competition_id INTEGER NOT NULL REFERENCES competitions(competition_id),
  team_name_raw TEXT NOT NULL,
  snapshot_date TEXT,
  snapshot_type TEXT DEFAULT 'final',
  position INTEGER,
  matches_played INTEGER,
  wins INTEGER,
  draws INTEGER,
  losses INTEGER,
  score_raw TEXT,
  sets_raw TEXT,
  points INTEGER,
  set_points INTEGER,
  source_url TEXT,
  UNIQUE(competition_id, snapshot_date, team_name_raw)
);
CREATE TABLE IF NOT EXISTS raw_payloads (
  raw_payload_id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_key TEXT UNIQUE,
  source_system TEXT NOT NULL,
  endpoint_or_url TEXT,
  retrieved_at TEXT,
  payload_json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS extraction_errors (
  error_id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_system TEXT NOT NULL,
  season_id INTEGER,
  external_match_id TEXT,
  team_name_raw TEXT,
  error_type TEXT,
  error_message TEXT,
  fallback_status TEXT,
  retrieved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_team_matches_season ON team_matches(season_id);
CREATE INDEX IF NOT EXISTS idx_team_matches_gsb_team ON team_matches(gsb_team_id);
CREATE INDEX IF NOT EXISTS idx_individual_matches_team ON individual_matches(team_match_id);
CREATE INDEX IF NOT EXISTS idx_match_players_player ON individual_match_players(player_id);
CREATE INDEX IF NOT EXISTS idx_standings_competition ON standings(competition_id);

-- Added after initial import: explicit winner for verified walkovers
-- team_matches.walkover_winner_raw is added by scripts/add-walkover-winner.mjs
