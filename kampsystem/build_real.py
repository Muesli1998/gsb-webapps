import csv, io, json, re, os

OUT = "/home/claude/gsb-preview"

def read_csv_rows(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    rows = list(csv.reader(io.StringIO(text)))
    return rows

def da_num(s):
    # Danish decimal comma, trailing comma means .0, e.g. "17," -> 17.0, "9,5" -> 9.5
    s = (s or "").strip()
    if s == "":
        return 0
    s = s.replace(",", ".")
    if s.endswith("."):
        s = s[:-1]
    try:
        return float(s)
    except ValueError:
        return 0

# ---------------------------------------------------------------------------
# Resultater (raw match rows) — feeds analyse.html's mock, real analyse.js logic
# runs client-side in JS against this raw data.
# ---------------------------------------------------------------------------
res_rows = read_csv_rows(os.path.join(OUT, "resultater_2526.csv"))
res_data = res_rows[1:]  # skip header
resultater_json = json.dumps(
    [[r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9] if len(r) > 9 else "", r[10] if len(r) > 10 else ""] for r in res_data if r and r[0]],
    ensure_ascii=False,
)
print("resultater rows:", len(res_data))

# ---------------------------------------------------------------------------
# Spillerpoint (known players list) — feeds tilmelding.html player dropdown
# and the "known players" set analyse.js uses to detect individual sides.
# ---------------------------------------------------------------------------
sp_rows = read_csv_rows(os.path.join(OUT, "spillerpoint_2526.csv"))
known_players = [r[0].strip() for r in sp_rows[1:] if r and r[0].strip()]
known_players_json = json.dumps(sorted(known_players, key=lambda s: s.lower()), ensure_ascii=False)
print("known players:", len(known_players))

# ---------------------------------------------------------------------------
# Holdoversigt (picks per participant) — feeds stilling.html "Vis hold"
# ---------------------------------------------------------------------------
hold_rows = read_csv_rows(os.path.join(OUT, "holdoversigt_2526.csv"))
hold_map = {}
for r in hold_rows[1:]:
    if not r or not r[0].strip():
        continue
    navn = r[0].strip()
    picks = [p.strip() for p in r[1:11] if p and p.strip()]
    hold_map[navn] = picks
hold_map_json = json.dumps(hold_map, ensure_ascii=False)
print("holdoversigt participants:", len(hold_map))

# ---------------------------------------------------------------------------
# Stilling (per-round raw scores per participant) — feeds stilling.html
# ---------------------------------------------------------------------------
st_rows = read_csv_rows(os.path.join(OUT, "stilling_2526.csv"))
stilling_data = []
for r in st_rows[1:]:
    if not r or not r[1].strip():
        continue
    navn = r[1].strip()
    roundVals = [da_num(r[2 + i]) if 2 + i < len(r) else 0 for i in range(11)]
    stilling_data.append({"navn": navn, "roundVals": roundVals})
stilling_json = json.dumps(stilling_data, ensure_ascii=False)
print("stilling participants:", len(stilling_data))

with open(os.path.join(OUT, "real_data.json"), "w", encoding="utf-8") as f:
    json.dump({
        "resultater": json.loads(resultater_json),
        "knownPlayers": json.loads(known_players_json),
        "holdMap": hold_map,
        "stilling": stilling_data,
    }, f, ensure_ascii=False)

print("wrote real_data.json")
