PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS seasons (season INTEGER PRIMARY KEY);
CREATE TABLE IF NOT EXISTS teams (id INTEGER PRIMARY KEY AUTOINCREMENT, season INTEGER NOT NULL REFERENCES seasons(season), name TEXT NOT NULL, league TEXT, age_group_id INTEGER, league_group_id INTEGER, UNIQUE(season,name,age_group_id,league_group_id));
CREATE TABLE IF NOT EXISTS matches (match_id INTEGER PRIMARY KEY, season INTEGER NOT NULL REFERENCES seasons(season), team_id INTEGER REFERENCES teams(id), league TEXT, league_group_id INTEGER, round TEXT, round_date TEXT, game_time TEXT, home_name TEXT, guest_name TEXT, raw_json TEXT);
CREATE INDEX IF NOT EXISTS idx_matches_season ON matches(season);
CREATE INDEX IF NOT EXISTS idx_teams_season ON teams(season);
