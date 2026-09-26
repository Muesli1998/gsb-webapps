import re, base64, csv, io, json, os
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
SRC = REPO_ROOT / "apps" / "netlify-prod" / "public"
OUT = SCRIPT_DIR / "dist" / "preview"
OUT.mkdir(parents=True, exist_ok=True)

def read(name):
    with open(SRC / name, encoding="utf-8") as f:
        return f.read()

def read_out(name):
    with open(SCRIPT_DIR / name, encoding="utf-8") as f:
        return f.read()

def read_csv_rows(name):
    return list(csv.reader(io.StringIO(read_out(name))))

def da_num(value):
    value = (value or "").strip().replace(",", ".")
    if value.endswith("."):
        value = value[:-1]
    try:
        return float(value) if value else 0
    except ValueError:
        return 0

def build_real_data():
    result_rows = read_csv_rows("resultater_2526.csv")[1:]
    resultater = [
        [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8],
         row[9] if len(row) > 9 else "", row[10] if len(row) > 10 else ""]
        for row in result_rows if row and row[0]
    ]

    player_rows = read_csv_rows("spillerpoint_2526.csv")[1:]
    known_players = sorted(
        [row[0].strip() for row in player_rows if row and row[0].strip()],
        key=str.lower,
    )

    hold_map = {}
    for row in read_csv_rows("holdoversigt_2526.csv")[1:]:
        if row and row[0].strip():
            hold_map[row[0].strip()] = [pick.strip() for pick in row[1:11] if pick and pick.strip()]

    stilling = []
    for row in read_csv_rows("stilling_2526.csv")[1:]:
        if len(row) > 1 and row[1].strip():
            stilling.append({
                "navn": row[1].strip(),
                "roundVals": [da_num(row[2 + index]) if 2 + index < len(row) else 0 for index in range(11)],
            })

    return {
        "resultater": resultater,
        "knownPlayers": known_players,
        "holdMap": hold_map,
        "stilling": stilling,
    }

REAL = build_real_data()

RESULTATER_2425 = json.loads(read_out("resultater_2425.json"))

ADDENDUM_2425 = json.loads(read_out("stilling_2425_addendum.json"))

# Alle 382 GSB-medlemmer med BD-rating (single/double/mix, kan være null), hentet 2026-09-02
# via samme union-af-highestPointGain + batch-membersStats-metode som KAMPSYSTEM_ROSTER — bruges
# af Kampsystemets søg/tilføj-system (søg en spiller der ikke er i den faste trup, træk dem ind
# for denne runde). Ikke begrænset til Kampsystemets nuværende grupper.
GSB_ALLE_SPILLERE = json.loads(read_out("gsb_alle_spillere.json"))
GSB_ALLE_SPILLERE_JSON = json.dumps(GSB_ALLE_SPILLERE, ensure_ascii=False)

RESULTATER_JSON = json.dumps(REAL["resultater"], ensure_ascii=False)
RESULTATER_2425_JSON = json.dumps(RESULTATER_2425, ensure_ascii=False)
KNOWN_PLAYERS_JSON = json.dumps(REAL["knownPlayers"], ensure_ascii=False)

# Sæson 26/27's rigtige seniortrup, fra klubbens Zakobo-eksport
# ("Zakobo  1150 Senior Turnering.xlsx", modtaget 2026-08-31). Kun navne er
# taget med — Zakobo-filen har også mail/tlf/adresse, som IKKE skal med i
# preview-mock'en. Bruges KUN til tilmelding.html's spillerdropdown (ikke til
# analyse.html's KNOWN_PLAYERS-matching, som stadig skal bruge det historiske
# 25/26-datasæt for at kunne genkende gamle kampresultater).
#
# Zakobo-filen har INGEN kønskolonne. Køn er udledt af historiske kampresultater
# (HS/DS/HD/DD-kategorierne i 24/25+25/26-Resultater fortæller entydigt hvilket
# køn en spiller er, MD (mixed double) er løst ved iterativ udelukkelse ift.
# allerede kendte køn), plus navne-alias-listen fra
# GSB_NAVNE_ALIAS_OG_ANOMALIER.json (Zakobo bruger fulde navne, Resultater
# bruger ofte kortere/andre stavemåder af samme spiller — fx "Rasmus Holmlykke
# Andersen" i Zakobo er samme person som "Rasmus Holmslykke Andersen" i
# Resultater, en hidtil udokumenteret variant af samme mønster).
#
# 7 spillere har INGEN kamphistorik overhovedet (nye for 26/27) og er derfor
# gættet ud fra dansk/skandinavisk navnekonvention, IKKE bekræftet af data —
# markeret med "?" her og skal tjekkes af Chris:
#   Andreas Drasbek (M?), Camilla Bagge (K?), Louis Toftlund (M?),
#   Michelle Liljengren (K?), Sverre Stütz (M?), Sylvester Østberg (M?),
#   Theodor Lumby (M?)
PLAYERS_2627_HERRER = [
    "Adnan Bacic", "Andreas Drasbek", "Brian Oddershede", "Christian Staal",
    "Christoffer Müller", "Erik Juul", "Jonas Trusell-Jensen",
    "Jonathan Hansen", "Kenn Blæsbjerg Christensen", "Kenneth Hasselby",
    "Linus Bergström Hesselballe", "Louis Toftlund", "Malthe Baltzer",
    "Morten Aarøe", "Oliver Frei", "Oliver Guldbæk", "Oscar Donovan",
    "Oskar Isbosethsen", "Rasmus Holmlykke Andersen", "Sebastian Møller",
    "Sverre Stütz", "Sylvester Østberg", "Theodor Lumby",
    "Thor Percy Hinge Pedersen", "Thøger Jakobsen", "Tobias Weinreich Hansen",
    "Yiting Chen",
]
PLAYERS_2627_DAMER = [
    "Anja Gunna Thomsen", "Camilla Bagge", "Gitte Mathiasen",
    "Hannah Phoebe Ejada Clausen", "Helle Mathiasen", "Lene Sørensen",
    "Linda Bækgaard", "Line Nielsen", "Louise Korsby Kofoed",
    "Marie Gotfred Johansen", "Michelle Liljengren", "Mina Lorin Özden",
    "Nadia Mortensen", "Rosa Hinge Carlsson", "Signe Aarøe Jørgensen",
    "Stine Louise Knudsen",
]
PLAYERS_2627_HERRER_JSON = json.dumps(sorted(PLAYERS_2627_HERRER), ensure_ascii=False)
PLAYERS_2627_DAMER_JSON = json.dumps(sorted(PLAYERS_2627_DAMER), ensure_ascii=False)

# Kampsystem (B4-prototype) — spillertrup til rundefordelings-demoen. Senior (43, samme liste som
# PLAYERS_2627_*) + SUT ungdom (18, fra Chris' uploadede SUT 2627.xlsx, 2026-09-01) + 8 OPDIGTEDE
# veteran-eksempelnavne (ingen rigtig veteranliste endnu — tydeligt mærket "(eksempel)" i UI'et).
#
# RATINGS OPDATERET 2026-09-02 (to runder samme dag) til RIGTIGE Badminton Danmark-point, hentet
# live via membersStats(ids).single/.double/.mix (Nembadminton clubhouseId 331, spiller-ID'er
# fundet via union af highestPointGain på tværs af HS/DS/HD/DD/MxH/MxD, matchet på navn inkl.
# kendte alias — se GSB_NAVNE_ALIAS_OG_ANOMALIER.json). "mix" er nu et RIGTIGT gemt felt (ikke
# længere et klient-beregnet gennemsnit af single/double): rigtig mix-rating hvis fundet, ellers
# samme værdi som double (Chris' eksplicitte fallback-regel), ellers null.
#
# Anden rettelsesrunde (samme dag) løste: Michelle Liljengren hedder nu Michelle Christensen
# (BadmintonID/refId 930609-21 uændret — bekræftet identitet via refId på tværs af 3 "Christensen"-
# kandidater), og de 4 SUT-ungdomspiger blev seedet fra Chris' egne rangliste-screenshots
# (badmintonplayer.dk), da de ikke kunne findes via highestPointGain-unionen (formentlig fordi de
# har absolutte point men endnu ingen "point gain"-historik).
#
# NULL BETYDER "INGEN VÆRDI ENDNU" — IKKE et opdigtet placeholder-tal (Chris' eksplicitte regel
# 2026-09-02: har en spiller ikke spillet en disciplin, skal feltet stå tomt/null, ikke gættes).
# Reelt stadig manglende data (null i mindst ét felt):
#   - Andreas Drasbek (Senior) — single/double/mix stadig ALLE null (ingen BD-match fundet
#     overhovedet i gsb_alle_spillere.json), men Chris har 2026-09-05 bekræftet køn manuelt: "Herre".
#   - August Carl Toftager-Larsen (SUT Ungdom) — fandtes heller ikke i BD-unionen, men Chris har
#     2026-09-05 sendt et skærmbillede af hans rangliste-opslag (spiller-ID 140817-03, Gladsaxe
#     Søborg, sæson 26/27, U13 A-række): Single 1636 (48 kampe), Double 1449 (36 kampe),
#     tilmeldingsniveau ved sæsonstart 1560. Der var INGEN Mixed-rangliste på opslaget, så "mix" er
#     sat til samme værdi som "double" efter den sædvanlige fallback-regel ovenfor. Chris bekræftede
#     efterfølgende (2026-09-05, opfølgende besked) at August også er herre — "koen" er derfor sat
#     til "H". NB: 1636/1449 er U13-ratings, altså en anden (yngre) række end
#     Senior-tallene i resten af denne liste — samme talskala (BD-point), men ikke nødvendigvis
#     direkte sammenlignelig styrkemæssigt. Brugt uændret, som Chris selv lagde dem frem.
#   - Camilla Bagge, Christian Staal, Kenneth Hasselby, Lene Sørensen, Line Nielsen,
#     Signe Aarøe Jørgensen (alle Senior) — kun SINGLE er null (double/mix er rigtige tal) — ingen
#     registreret singlekamp hos Nembadminton.
# De 8 fiktive "Veteran (eksempel)"-spillere er FJERNET 2026-09-03 (Chris: "Veteran eksemplet skal
# fjernes"). Gruppen "SUT Ungdom (eksempel)" er samtidig omdøbt til det rigtige gruppenavn
# "SuperUng Teen" (ikke længere markeret som eksempel-data).
#
# NB (uændret, endnu ikke implementeret): real-data-skalaen (~1300-3300) er markant større end de
# gamle eksempeltal (~950-1850) — Elo-formlens divisor (400) og K-faktor (32) er IKKE genkalibreret
# til den nye skala endnu. Chris har noteret 2026-09-02 at K-værdien skal rettes; foreslået (ikke
# implementeret) mekanisk skala-bevarende justering: divisor 400→~850, K 32→~70. Se
# idébanken/spec-filen for status.
KAMPSYSTEM_ROSTER = [
    {"navn": 'Adnan Bacic', "gruppe": 'Senior', "single": 1912, "double": 1468, "mix": 1660, "koen": 'H'},
    {"navn": 'Andreas Drasbek', "gruppe": 'Senior', "single": None, "double": None, "mix": None, "koen": 'H'},
    {"navn": 'Anja Gunna Thomsen', "gruppe": 'Senior', "single": 1988, "double": 2663, "mix": 2906, "koen": 'D'},
    {"navn": 'Brian Oddershede', "gruppe": 'Senior', "single": 2684, "double": 2861, "mix": 2246, "koen": 'H'},
    {"navn": 'Camilla Bagge', "gruppe": 'Senior', "single": None, "double": 2290, "mix": 2340, "koen": 'D'},
    {"navn": 'Christian Staal', "gruppe": 'Senior', "single": None, "double": 2453, "mix": 2234, "koen": 'H'},
    {"navn": 'Christoffer Müller', "gruppe": 'Senior', "single": 2896, "double": 2917, "mix": 2929, "koen": 'H'},
    {"navn": 'Erik Juul', "gruppe": 'Senior', "single": 2377, "double": 2398, "mix": 1287, "koen": 'H'},
    {"navn": 'Gitte Mathiasen', "gruppe": 'Senior', "single": 2236, "double": 2263, "mix": 2315, "koen": 'D'},
    {"navn": 'Hannah Phoebe Ejada Clausen', "gruppe": 'Senior', "single": 2491, "double": 2383, "mix": 2384, "koen": 'D'},
    {"navn": 'Helle Mathiasen', "gruppe": 'Senior', "single": 2056, "double": 2420, "mix": 2116, "koen": 'D'},
    {"navn": 'Jonas Trusell-Jensen', "gruppe": 'Senior', "single": 3271, "double": 3201, "mix": 3201, "koen": 'H'},
    {"navn": 'Jonathan Hansen', "gruppe": 'Senior', "single": 3314, "double": 3021, "mix": 3021, "koen": 'H'},
    {"navn": 'Kenn Blæsbjerg Christensen', "gruppe": 'Senior', "single": 3112, "double": 3097, "mix": 2912, "koen": 'H'},
    {"navn": 'Kenneth Hasselby', "gruppe": 'Senior', "single": None, "double": 3196, "mix": 3125, "koen": 'H'},
    {"navn": 'Lene Sørensen', "gruppe": 'Senior', "single": None, "double": 2282, "mix": 2321, "koen": 'D'},
    {"navn": 'Linda Bækgaard', "gruppe": 'Senior', "single": 2168, "double": 2276, "mix": 2041, "koen": 'D'},
    {"navn": 'Line Nielsen', "gruppe": 'Senior', "single": None, "double": 2409, "mix": 2708, "koen": 'D'},
    {"navn": 'Linus Bergström Hesselballe', "gruppe": 'Senior', "single": 1647, "double": 1665, "mix": 1665, "koen": 'H'},
    {"navn": 'Louis Toftlund', "gruppe": 'Ungsenior', "single": 1817, "double": 1739, "mix": 1463, "koen": 'H'},
    {"navn": 'Louise Korsby Kofoed', "gruppe": 'Senior', "single": 2060, "double": 2275, "mix": 2359, "koen": 'D'},
    {"navn": 'Malthe Baltzer', "gruppe": 'Senior', "single": 2900, "double": 2900, "mix": 2900, "koen": 'H'},
    {"navn": 'Marie Gotfred Johansen', "gruppe": 'Senior', "single": 2268, "double": 2262, "mix": 2384, "koen": 'D'},
    {"navn": 'Michelle Liljengren', "gruppe": 'Senior', "single": 2486, "double": 2621, "mix": 2621, "koen": 'D'},
    {"navn": 'Mina Lorin Özden', "gruppe": 'Senior', "single": 1468, "double": 1491, "mix": 1303, "koen": 'D'},
    {"navn": 'Morten Aarøe', "gruppe": 'Senior', "single": 3240, "double": 3291, "mix": 3059, "koen": 'H'},
    {"navn": 'Nadia Mortensen', "gruppe": 'Senior', "single": 2313, "double": 2290, "mix": 2363, "koen": 'D'},
    {"navn": 'Oliver Frei', "gruppe": 'Senior', "single": 3088, "double": 3013, "mix": 2940, "koen": 'H'},
    {"navn": 'Oliver Guldbæk', "gruppe": 'Senior', "single": 2753, "double": 2722, "mix": 2689, "koen": 'H'},
    {"navn": 'Oscar Donovan', "gruppe": 'Senior', "single": 2730, "double": 2763, "mix": 2763, "koen": 'H'},
    {"navn": 'Oskar Isbosethsen', "gruppe": 'Senior', "single": 1700, "double": 1694, "mix": 1694, "koen": 'H'},
    {"navn": 'Rasmus Holmlykke Andersen', "gruppe": 'Senior', "single": 3047, "double": 3080, "mix": 2728, "koen": 'H'},
    {"navn": 'Rosa Hinge Carlsson', "gruppe": 'Ungsenior', "single": 1635, "double": 1351, "mix": 1157, "koen": 'D'},
    {"navn": 'Sebastian Møller', "gruppe": 'Senior', "single": 1918, "double": 1904, "mix": 1877, "koen": 'H'},
    {"navn": 'Signe Aarøe Jørgensen', "gruppe": 'Senior', "single": None, "double": 2226, "mix": 2296, "koen": 'D'},
    {"navn": 'Stine Louise Knudsen', "gruppe": 'Senior', "single": 1998, "double": 2243, "mix": 2258, "koen": 'D'},
    {"navn": 'Sverre Stütz', "gruppe": 'Senior', "single": 1679, "double": 1793, "mix": 1496, "koen": 'H'},
    {"navn": 'Sylvester Østberg', "gruppe": 'Ungsenior', "single": 1827, "double": 1575, "mix": 1405, "koen": 'H'},
    {"navn": 'Theodor Lumby', "gruppe": 'Senior', "single": 1803, "double": 1577, "mix": 1376, "koen": 'H'},
    {"navn": 'Thor Percy Hinge Pedersen', "gruppe": 'Senior', "single": 2675, "double": 2854, "mix": 2482, "koen": 'H'},
    {"navn": 'Thøger Jakobsen', "gruppe": 'Senior', "single": 1602, "double": 1650, "mix": 1372, "koen": 'H'},
    {"navn": 'Tobias Weinreich Hansen', "gruppe": 'Senior', "single": 3046, "double": 3030, "mix": 3030, "koen": 'H'},
    {"navn": 'Yiting Chen', "gruppe": 'Senior', "single": 2315, "double": 2420, "mix": 2420, "koen": 'H'},
    {"navn": 'Anna Rudolph', "gruppe": 'SuperUng Teen', "single": 1770, "double": 1495, "mix": 1225, "koen": 'D'},
    {"navn": 'August Carl Toftager-Larsen', "gruppe": 'SuperUng Teen', "single": 1636, "double": 1449, "mix": 1449, "koen": 'H'},
    {"navn": 'Benjamin Hinge Carlsson', "gruppe": 'SuperUng Teen', "single": 1705, "double": 1712, "mix": 1497, "koen": 'H'},
    {"navn": 'Bertram Hjorth Laursen', "gruppe": 'SuperUng Teen', "single": 1542, "double": 1556, "mix": 1354, "koen": 'H'},
    {"navn": 'Emilie Reinholdt Amelung', "gruppe": 'SuperUng Teen', "single": 1691, "double": 1502, "mix": 1502, "koen": 'D'},
    {"navn": 'Freja Fan Fuglsang', "gruppe": 'SuperUng Teen', "single": 1395, "double": 1303, "mix": 1165, "koen": 'D'},
    {"navn": 'Guanyan Chen', "gruppe": 'SuperUng Teen', "single": 1937, "double": 1547, "mix": 1547, "koen": 'H'},
    {"navn": 'Katia Lundby Bresemann', "gruppe": 'SuperUng Teen', "single": 1771, "double": 1436, "mix": 1436, "koen": 'D'},
    {"navn": 'Lasse Friberg Andersen', "gruppe": 'SuperUng Teen', "single": 1697, "double": 1272, "mix": 1272, "koen": 'H'},
    {"navn": 'Lauge Juul Hornsgaard', "gruppe": 'SuperUng Teen', "single": 1916, "double": 1774, "mix": 1520, "koen": 'H'},
    {"navn": 'Ludvig Alexander Rosager Pedas Rosager', "gruppe": 'SuperUng Teen', "single": 1741, "double": 1697, "mix": 1547, "koen": 'H'},
    {"navn": 'Mads Balmer Broholm', "gruppe": 'SuperUng Teen', "single": 2010, "double": 1622, "mix": 1409, "koen": 'H'},
    {"navn": 'Magne Gjervan Majborn', "gruppe": 'SuperUng Teen', "single": 1697, "double": 1579, "mix": 1361, "koen": 'H'},
    {"navn": 'Marius Steenstrup Leth-Espensen', "gruppe": 'SuperUng Teen', "single": 2028, "double": 1740, "mix": 1508, "koen": 'H'},
    {"navn": 'Oliver Soon Nielsen', "gruppe": 'SuperUng Teen', "single": 1698, "double": 1719, "mix": 1719, "koen": 'H'},
    {"navn": 'Qingyi Marie Han', "gruppe": 'SuperUng Teen', "single": 1505, "double": 1247, "mix": 1247, "koen": 'D'},
    {"navn": 'Sakarias Thornild Berthelsen', "gruppe": 'SuperUng Teen', "single": 1799, "double": 1698, "mix": 1501, "koen": 'H'},
    {"navn": 'Silas Due Buron', "gruppe": 'SuperUng Teen', "single": 1522, "double": 1378, "mix": 1290, "koen": 'H'},
]
KAMPSYSTEM_ROSTER_JSON = json.dumps(KAMPSYSTEM_ROSTER, ensure_ascii=False)

HOLD_MAP_JSON = json.dumps(REAL["holdMap"], ensure_ascii=False)
STILLING_JSON = json.dumps(REAL["stilling"], ensure_ascii=False)
# 24/25 Historisk stilling — rekonstrueret fra det gamle Excel-arks Pivot-facit,
# arkiveret som stilling_2425_addendum.json (23 deltagere, roundVals + holdMap).
# Ikke del af real_data.json/build_real.py, fordi den ikke kommer fra 25/26-CSV'erne.
STILLING_2425_JSON = json.dumps(ADDENDUM_2425["stilling_2425"], ensure_ascii=False)
HOLD_MAP_2425_JSON = json.dumps(ADDENDUM_2425["holdMap_2425"], ensure_ascii=False)

# Real 24/25 Sheet-ID (chrille1998@gmail.com's Google account, sæson 2024/25) —
# swapped in on 2026-08-30 once the sheet was manually built and Chris shared the URL.
# Must match seasons_source.js's spreadsheetId for 2024/25. Keep these two in sync.
SHEET_2425_PLACEHOLDER = "1YYNv2DDxvyFEZLMO4A64tsaIQ6Hyr_mWQu-dyKzf4Bo"

# Old flat per-page <header><nav>...</nav></header> is now redundant — the new
# three-layer shell (app row + page row) is the single source of navigation
# truth in this preview, so we hide each page's own inline nav rather than
# surgically rewriting five slightly different header markups.
HIDE_OLD_NAV_CSS = '<style>header nav{display:none!important;}</style>'

NAV_MSG_SCRIPT_TEMPLATE = """
<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="/"]').forEach(function(a) {
    var href = a.getAttribute('href');
    var map = {
      '/index.html': { app: 'dreamteam', page: 'index' },
      '/tilmelding.html': { app: 'dreamteam', page: 'tilmelding' },
      '/analyse.html': { app: 'dreamteam', page: 'analyse' },
      '/stilling.html': { app: 'dreamteam', page: 'stilling' },
      '/senior-ungdom-tilmelding.html': { app: 'ungdom', page: 'senior' },
      '/sondagstraening.html': { app: 'sondag', page: 'sondag' },
      '/kampsystem.html': { app: 'kampsystem', page: 'kampsystem' },
      '/': { app: 'landing', page: 'landing' },
    };
    if (map[href]) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        parent.postMessage({ type: 'gsbnav', app: map[href].app, page: map[href].page }, '*');
      });
    }
  });
});
</script>
"""

PREVIEW_BANNER_REAL = """
<div style="background:#1f5c3f;color:#eaf3ee;font-size:0.76rem;text-align:center;padding:5px 10px;font-family:'Segoe UI',system-ui,sans-serif;">
  PREVIEW &middot; rigtige data l&aelig;st fra 2025/26-arket (valideret facit-s&aelig;son) &middot; intet skrives til Google Sheets
</div>
"""

PREVIEW_BANNER_MOCK = """
<div style="background:#3a5570;color:#eef1f6;font-size:0.76rem;text-align:center;padding:5px 10px;font-family:'Segoe UI',system-ui,sans-serif;">
  PREVIEW &middot; viser eksempeldata (ikke fra Google Sheets), intet skrives nogen steder
</div>
"""

PREVIEW_BANNER_TILMELDING_2627 = """
<div style="background:#1f5c3f;color:#eaf3ee;font-size:0.76rem;text-align:center;padding:5px 10px;font-family:'Segoe UI',system-ui,sans-serif;">
  PREVIEW &middot; spillerlisten er den rigtige 26/27-seniortrup (Zakobo-eksport) &middot; intet skrives til Google Sheets
</div>
"""

def inject_head(html, extra):
    return html.replace("</head>", extra + "\n</head>", 1)

def inject_after_body(html, extra):
    return html.replace("<body>", "<body>" + extra, 1)

# ---------------------------------------------------------------------------
# 1. index.html — unchanged synthetic mock (writes to sheets, not a read-test)
# ---------------------------------------------------------------------------
index_html = read("index.html")
index_mock = """
<script>
(function() {
  var origFetch = window.fetch;
  window.fetch = function(url, opts) {
    if (typeof url === 'string' && url.indexOf('/.netlify/functions/hent-resultater') === 0) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          var rows = [
            [1, 'GSB 1', 'HS', 'Holger Lindholm', 'Thor Pedersen', '21-18', '19-21', '21-16', 'Hjemme'],
            [1, 'GSB 1', 'DS', 'Anja Thomsen', 'Line Nielsen', '21-14', '21-17', '', 'Hjemme'],
            [1, 'GSB 2', 'HD', 'Jonathan W. Hansen', 'Kenn Blæsbjerg Christensen', 'Malthe Baltzer', 'Christoffer Müller', '18-21', 'Ude'],
          ];
          var wroteToSheet = !!(opts && JSON.parse(opts.body).spreadsheetId);
          resolve({
            ok: true,
            json: function() {
              return Promise.resolve({
                rows: rows, rowsAdded: rows.length, matchErrors: [],
                sheetsResult: wroteToSheet ? { updatedRange: 'Resultater!A2:K4' } : null,
              });
            },
          });
        }, 550);
      });
    }
    return origFetch(url, opts);
  };
})();
</script>
"""
index_html = inject_head(index_html, index_mock + NAV_MSG_SCRIPT_TEMPLATE + HIDE_OLD_NAV_CSS)
index_html = inject_after_body(index_html, PREVIEW_BANNER_MOCK)

# ---------------------------------------------------------------------------
# 2. tilmelding.html — RIGTIG 26/27-seniortrup fra klubbens Zakobo-eksport
#    (modtaget 2026-08-31, se PLAYERS_2627 ovenfor). 26/27's Spillerpoint-ark
#    er stadig tomt (ingen kampe spillet endnu), så spillere.js's rigtige
#    Netlify-funktion ville give en tom liste — mock'en her erstatter det
#    kald med den faktiske tilmeldte trup, så tilmeldingsflowet kan
#    forhåndsvises retvisende for den nye sæson. PRØVES KUN I PREVIEW —
#    rører ikke rigtig tilmelding.html/spillere.js eller det rigtige ark.
# ---------------------------------------------------------------------------
tilmelding_html = read_out("tilmelding_source.html")
tilmelding_mock = """
<script>
(function() {
  var origFetch = window.fetch;
  window.fetch = function(url, opts) {
    if (typeof url === 'string' && url.indexOf('/.netlify/functions/spillere') === 0) {
      return Promise.resolve({ ok: true, json: function() { return Promise.resolve({ herrer: __HERRER__, damer: __DAMER__ }); } });
    }
    if (typeof url === 'string' && url.indexOf('/.netlify/functions/tilmeld') === 0) {
      return new Promise(function(resolve) {
        setTimeout(function() { resolve({ ok: true, json: function() { return Promise.resolve({ ok: true }); } }); }, 450);
      });
    }
    return origFetch(url, opts);
  };
})();
</script>
""".replace("__HERRER__", PLAYERS_2627_HERRER_JSON).replace("__DAMER__", PLAYERS_2627_DAMER_JSON)
tilmelding_html = inject_head(tilmelding_html, tilmelding_mock + NAV_MSG_SCRIPT_TEMPLATE + HIDE_OLD_NAV_CSS)
tilmelding_html = inject_after_body(tilmelding_html, PREVIEW_BANNER_TILMELDING_2627)

# ---------------------------------------------------------------------------
# 3. analyse.html — REAL Resultater rows, real analyse.js aggregation logic
#    reimplemented verbatim in client JS, run against the real data.
# ---------------------------------------------------------------------------
analyse_html = read_out("analyse_source.html")
seasons_js = read_out("seasons_source.js")

analyse_mock = """
<script>
""" + seasons_js + """
</script>
<script>
(function() {
  var origFetch = window.fetch;
  var RESULTATER = __RESULTATER__;   // [runde,hold,kategori,hjemme,ude,s1,s2,s3,vinder,ptH,ptU]
  var KNOWN_PLAYERS = new Set(__KNOWN_PLAYERS__);

  function withPct(obj) {
    var total = obj.wins + obj.losses;
    var out = {}; for (var k in obj) out[k] = obj[k];
    out.total = total;
    out.winPct = total > 0 ? Math.round((obj.wins / total) * 1000) / 10 : null;
    return out;
  }

  function runAnalyse(rundeMin, rundeMax, ikkeSlutspilHold) {
    var exempt = ikkeSlutspilHold || {};
    var rows = RESULTATER.filter(function(r) {
      if (!r[0]) return false;
      if (exempt[r[1]]) return true; // hold uden slutspil: altid med, uanset runde-filter
      return Number(r[0]) >= rundeMin && Number(r[0]) <= rundeMax;
    });

    var playerStats = {}, teamStats = {}, categoryStats = {}, matrixStats = {}, seenMatches = {};
    function ensurePlayer(name) {
      if (!playerStats[name]) playerStats[name] = { wins: 0, losses: 0, byHoldCategory: {} };
      return playerStats[name];
    }
    function ensureHoldCat(obj, hold, cat) {
      var key = hold + '|' + cat;
      if (!obj.byHoldCategory[key]) obj.byHoldCategory[key] = { wins: 0, losses: 0, positions: [] };
      return obj.byHoldCategory[key];
    }
    function ensureMatrix(hold, cat) {
      if (!matrixStats[hold]) matrixStats[hold] = {};
      if (!matrixStats[hold][cat]) matrixStats[hold][cat] = { wins: 0, losses: 0 };
      return matrixStats[hold][cat];
    }

    var SINGLES_KATS = { HS: true, DS: true };
    function rowsPerBoard(kat) { return SINGLES_KATS[kat] ? 1 : 2; }
    var groupRowIdx = {};

    rows.forEach(function(r) {
      var runde = r[0], hold = r[1], kategori = r[2], hjemme = r[3], ude = r[4],
          s1 = r[5], s2 = r[6], s3 = r[7], vinder = r[8];
      if (!hold || !kategori) return;

      var groupKey = runde + '|' + hold + '|' + kategori;
      var idxInGroup = groupRowIdx[groupKey] || 0;
      var boardPosition = Math.floor(idxInGroup / rowsPerBoard(kategori)) + 1;
      groupRowIdx[groupKey] = idxInGroup + 1;

      var hjemmeIsIndividual = hjemme && hjemme.indexOf(' / ') === -1 && KNOWN_PLAYERS.has(hjemme.trim());
      var udeIsIndividual = ude && ude.indexOf(' / ') === -1 && KNOWN_PLAYERS.has(ude.trim());
      var hjemmeWon = vinder === 'Hjemme';

      if (hjemmeIsIndividual) {
        var p1 = ensurePlayer(hjemme.trim()); var c1 = ensureHoldCat(p1, hold, kategori);
        if (hjemmeWon) { p1.wins++; c1.wins++; } else { p1.losses++; c1.losses++; }
        c1.positions.push({ runde: Number(runde), position: boardPosition });
      }
      if (udeIsIndividual) {
        var p2 = ensurePlayer(ude.trim()); var c2 = ensureHoldCat(p2, hold, kategori);
        if (!hjemmeWon) { p2.wins++; c2.wins++; } else { p2.losses++; c2.losses++; }
        c2.positions.push({ runde: Number(runde), position: boardPosition });
      }

      var matchKey = runde + '|' + hold + '|' + kategori + '|' + boardPosition;
      if (!seenMatches[matchKey]) {
        seenMatches[matchKey] = true;
        if (!teamStats[hold]) teamStats[hold] = { wins: 0, losses: 0 };
        if (!categoryStats[kategori]) categoryStats[kategori] = { wins: 0, losses: 0 };
        var mCell = ensureMatrix(hold, kategori);
        if (hjemmeIsIndividual || udeIsIndividual) {
          var weWon = hjemmeIsIndividual ? hjemmeWon : !hjemmeWon;
          if (weWon) { teamStats[hold].wins++; categoryStats[kategori].wins++; mCell.wins++; }
          else { teamStats[hold].losses++; categoryStats[kategori].losses++; mCell.losses++; }
        }
      }
    });

    var playersOut = Object.keys(playerStats).map(function(navn) {
      var s = playerStats[navn];
      var byHC = {};
      Object.keys(s.byHoldCategory).forEach(function(k) { byHC[k] = withPct(s.byHoldCategory[k]); });
      var out = withPct(s); out.navn = navn; out.byHoldCategory = byHC;
      return out;
    }).sort(function(a, b) { return b.total - a.total; });

    var teamsOut = Object.keys(teamStats).map(function(hold) {
      var out = withPct(teamStats[hold]); out.hold = hold; return out;
    }).sort(function(a, b) { return a.hold.localeCompare(b.hold); });

    var categoriesOut = Object.keys(categoryStats).map(function(kategori) {
      var out = withPct(categoryStats[kategori]); out.kategori = kategori; return out;
    }).sort(function(a, b) { return a.kategori.localeCompare(b.kategori); });

    var matrixOut = {};
    Object.keys(matrixStats).forEach(function(hold) {
      matrixOut[hold] = {};
      Object.keys(matrixStats[hold]).forEach(function(kategori) {
        matrixOut[hold][kategori] = withPct(matrixStats[hold][kategori]);
      });
    });

    return { players: playersOut, teams: teamsOut, categories: categoriesOut, matrix: matrixOut, totalRows: rows.length, rundeMin: rundeMin, rundeMax: rundeMax };
  }

  var RESULTATER_2425 = __RESULTATER_2425__; // 594 rows, reconstructed via Nembadminton API + krydstjek — kun Statistik-brugbar (ingen Tilmeldinger-data)
  var SHEET_2627 = '1naV601-lJWqXJ9XZ5ovRwfuaKFWVYaflnLpwf5OUrW4'; // current season — genuinely empty right now
  var SHEET_2526 = '1ENnMlINI8R03znnKLyKHwzH8XcHZIRTpDAWImoPTEqs'; // validated facit season — real data below
  var SHEET_2425 = '__SHEET_2425_PLACEHOLDER__'; // matches seasons_source.js — update BOTH when Chris finishes the real 24/25 sheet

  window.fetch = function(url, opts) {
    if (typeof url === 'string' && url.indexOf('/.netlify/functions/analyse') === 0) {
      var u = new URL(url, 'https://gsb-preview.local/');
      var spreadsheetId = u.searchParams.get('spreadsheetId');
      var rundeMin = parseInt(u.searchParams.get('rundeMin') || '1', 10);
      var rundeMax = parseInt(u.searchParams.get('rundeMax') || '11', 10);
      var exemptParam = u.searchParams.get('ikkeSlutspilHold') || '';
      var exemptObj = {};
      exemptParam.split(',').forEach(function(h) { if (h) exemptObj[h] = true; });
      var result;
      if (spreadsheetId === SHEET_2627) {
        // Real 26/27 sheet has no Resultater rows yet — this mirrors that faithfully.
        result = { players: [], teams: [], categories: [], matrix: {}, totalRows: 0, rundeMin: rundeMin, rundeMax: rundeMax };
      } else if (spreadsheetId === SHEET_2425) {
        var savedRows = RESULTATER; RESULTATER = RESULTATER_2425;
        result = runAnalyse(rundeMin, rundeMax, exemptObj);
        RESULTATER = savedRows;
      } else {
        result = runAnalyse(rundeMin, rundeMax, exemptObj);
      }
      return Promise.resolve({ ok: true, json: function() { return Promise.resolve(result); } });
    }
    return origFetch(url, opts);
  };
})();
</script>
""".replace("__RESULTATER__", RESULTATER_JSON).replace("__RESULTATER_2425__", RESULTATER_2425_JSON).replace("__KNOWN_PLAYERS__", KNOWN_PLAYERS_JSON).replace("__SHEET_2425_PLACEHOLDER__", SHEET_2425_PLACEHOLDER)

analyse_html = re.sub(r'<script src="/seasons\.js"></script>\n?', '', analyse_html)
analyse_html = inject_head(analyse_html, analyse_mock + NAV_MSG_SCRIPT_TEMPLATE + HIDE_OLD_NAV_CSS)
analyse_html = inject_after_body(analyse_html, PREVIEW_BANNER_REAL)

# ---------------------------------------------------------------------------
# 4. stilling.html — REAL Stilling + Holdoversigt data, real stilling.js logic
# ---------------------------------------------------------------------------
stilling_html = read_out("stilling_source.html")
stilling_mock = """
<script>
""" + seasons_js + """
</script>
<script>
(function() {
  var origFetch = window.fetch;
  var STILLING = __STILLING__;       // [{navn, roundVals:[11]}]
  var HOLD_MAP = __HOLD_MAP__;       // navn -> picks[]
  var STILLING_2425 = __STILLING_2425__;   // 23 deltagere, rekonstrueret fra det gamle Excel-arks Pivot-facit
  var HOLD_MAP_2425 = __HOLD_MAP_2425__;

  function runStilling(rundeMin, rundeMax) {
    var participants = STILLING.map(function(p) {
      var selected = p.roundVals.slice(rundeMin - 1, rundeMax);
      var total = Math.round(selected.reduce(function(a, b) { return a + b; }, 0) * 10) / 10;
      return { navn: p.navn, picks: HOLD_MAP[p.navn] || [], roundVals: p.roundVals, total: total };
    });
    participants.sort(function(a, b) { return b.total - a.total; });
    participants.forEach(function(p, i) { p.plads = i + 1; });
    return { participants: participants, rundeMin: rundeMin, rundeMax: rundeMax };
  }

  var SHEET_2627 = '1naV601-lJWqXJ9XZ5ovRwfuaKFWVYaflnLpwf5OUrW4'; // current season — genuinely empty right now
  var SHEET_2526 = '1ENnMlINI8R03znnKLyKHwzH8XcHZIRTpDAWImoPTEqs'; // validated facit season — real data below
  var SHEET_2425 = '__SHEET_2425_PLACEHOLDER__'; // matches seasons_source.js — update BOTH when Chris finishes the real 24/25 sheet

  window.fetch = function(url, opts) {
    if (typeof url === 'string' && url.indexOf('/.netlify/functions/stilling') === 0) {
      var u = new URL(url, 'https://gsb-preview.local/');
      var spreadsheetId = u.searchParams.get('spreadsheetId');
      var rundeMin = parseInt(u.searchParams.get('rundeMin') || '1', 10);
      var rundeMax = parseInt(u.searchParams.get('rundeMax') || '11', 10);
      var result;
      if (spreadsheetId === SHEET_2627) {
        // Ægte 26/27-ark har ingen Stilling/Holdoversigt-rækker endnu.
        result = { participants: [], rundeMin: rundeMin, rundeMax: rundeMax };
      } else if (spreadsheetId === SHEET_2425) {
        var savedStilling = STILLING, savedHoldMap = HOLD_MAP;
        STILLING = STILLING_2425; HOLD_MAP = HOLD_MAP_2425;
        result = runStilling(rundeMin, rundeMax);
        STILLING = savedStilling; HOLD_MAP = savedHoldMap;
      } else {
        result = runStilling(rundeMin, rundeMax);
      }
      return Promise.resolve({ ok: true, json: function() { return Promise.resolve(result); } });
    }
    return origFetch(url, opts);
  };
})();
</script>
""".replace("__STILLING__", STILLING_JSON).replace("__HOLD_MAP__", HOLD_MAP_JSON).replace("__STILLING_2425__", STILLING_2425_JSON).replace("__HOLD_MAP_2425__", HOLD_MAP_2425_JSON).replace("__SHEET_2425_PLACEHOLDER__", SHEET_2425_PLACEHOLDER)

stilling_html = re.sub(r'<script src="/seasons\.js"></script>\n?', '', stilling_html)
stilling_html = inject_head(stilling_html, stilling_mock + NAV_MSG_SCRIPT_TEMPLATE + HIDE_OLD_NAV_CSS)
stilling_html = inject_after_body(stilling_html, PREVIEW_BANNER_REAL)

# ---------------------------------------------------------------------------
# 5. senior-ungdom-tilmelding.html — B2 (aftalt 2026-08-31): LIVE rigtig data,
#    samme login-frie Apps Script SCRIPT_URL som produktionssiden selv kalder.
#    LÆSNING (GET, listen af tilmeldinger) går nu direkte til det rigtige
#    endpoint — ingen hemmelig nøgle involveret. SKRIVNING (POST, "Tilmeld"-
#    knappen) forbliver bevidst mocket: B2 handlede om at VISE rigtige data i
#    previewet, ikke om at lade preview-besøgende skrive rigtige tilmeldinger
#    til jeres live Google Sheet/Apps Script ved et uheld. Flag til Chris hvis
#    write-siden også skal gå live — ikke en del af det aftalte B2-scope.
# ---------------------------------------------------------------------------
senior_html = read("senior-ungdom-tilmelding.html")
senior_write_mock = """
<script>
(function() {
  var origFetch = window.fetch;
  var SCRIPT_URL_FRAGMENT = '/macros/s/AKfycbxCyM4u9iwJqPaEIzm9Qmk-UKSAxxwoU7yWgZbpZZUhL02jblL9UKsuwGYurIxdqV2L/exec';
  window.fetch = function(url, opts) {
    if (typeof url === 'string' && url.indexOf(SCRIPT_URL_FRAGMENT) !== -1 && opts && opts.method === 'POST') {
      // Kun POST (tilmeld/afbud) mockes — GET (læsning af rigtige tilmeldinger) går live igennem.
      return new Promise(function(resolve) {
        setTimeout(function() { resolve({ ok: true, json: function() { return Promise.resolve({ ok: true }); } }); }, 350);
      });
    }
    return origFetch(url, opts);
  };
})();
</script>
"""
senior_html = inject_head(senior_html, senior_write_mock + NAV_MSG_SCRIPT_TEMPLATE + HIDE_OLD_NAV_CSS)
senior_html = inject_after_body(senior_html, PREVIEW_BANNER_REAL)

# ---------------------------------------------------------------------------
# 6. sondagstraening.html — brand new, no real backend yet. Pure client-side
#    mock: example players, in-memory status, nothing persisted anywhere.
# ---------------------------------------------------------------------------
sondag_html = read_out("sondag_source.html")
sondag_html = inject_head(sondag_html, NAV_MSG_SCRIPT_TEMPLATE)
sondag_html = inject_after_body(sondag_html, PREVIEW_BANNER_MOCK)

# ---------------------------------------------------------------------------
# 7. landing.html — new "vælg app" root page.
# ---------------------------------------------------------------------------
landing_html = read_out("landing_source.html")
landing_html = inject_after_body(landing_html, PREVIEW_BANNER_MOCK)

# ---------------------------------------------------------------------------
# 8. kampsystem.html — B4-prototype (ELO + rundefordeling). Chris bad 2026-08-31
#    om at få en første, fungerende demo ind i previewet nu, som en 4. hoved-
#    kategori — KUN senior + eksempel-veteraner denne omgang, ikke ungdom.
#    Ren client-side eksempeldata, ingen rigtig backend/Sheets-integration
#    endnu (se KAMPSYSTEM_ROSTER ovenfor for hvad der stadig er simplificeret).
# ---------------------------------------------------------------------------
kampsystem_html = read_out("kampsystem_source.html")
kampsystem_html = kampsystem_html.replace("__ROSTER_JSON__", KAMPSYSTEM_ROSTER_JSON)
kampsystem_html = kampsystem_html.replace("__ALLE_SPILLERE_JSON__", GSB_ALLE_SPILLERE_JSON)
kampsystem_html = inject_head(kampsystem_html, NAV_MSG_SCRIPT_TEMPLATE)
kampsystem_html = inject_after_body(kampsystem_html, PREVIEW_BANNER_MOCK)

# ---------------------------------------------------------------------------
# Write outputs + base64 for embedding
# ---------------------------------------------------------------------------
pages = {
    "landing": landing_html,
    "index": index_html,
    "tilmelding": tilmelding_html,
    "analyse": analyse_html,
    "stilling": stilling_html,
    "senior": senior_html,
    "sondag": sondag_html,
    "kampsystem": kampsystem_html,
}

b64 = {}
for key, html in pages.items():
    with open(os.path.join(OUT, f"{key}_preview.html"), "w", encoding="utf-8") as f:
        f.write(html)
    b64[key] = base64.b64encode(html.encode("utf-8")).decode("ascii")

with open(os.path.join(OUT, "pages_b64_v2.json"), "w") as f:
    json.dump(b64, f)

shell = read_out("shell_template2.html")
shell = shell.replace("__PAGES_B64_JSON__", json.dumps(b64))
with open(os.path.join(OUT, "gsb_preview.html"), "w", encoding="utf-8") as f:
    f.write(shell)

print("done", {k: len(v) for k, v in pages.items()}, "shell bytes:", len(shell))  # noqa
