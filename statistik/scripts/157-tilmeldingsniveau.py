import hashlib
import html
import json
import re
import shutil
import sqlite3
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path.cwd()
DATA = ROOT / "statistik" / "data"
OUT = ROOT / "statistik" / "results"
RAW = OUT / "157-raa-svar"
EXPECTED = {
    "gsb-statistik-normalized.db": "49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E",
    "liga-landskab.db": "9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C",
    "rangliste-historik.db": "6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F",
    "national-spillere.db": "1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E",
    "rangliste-point.db": "DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9",
}
SOURCES = [
    ("11-287-gsb-side-0-fra-150.txt", "150-raa-svar/10-q10-clubid-1093-list287.txt"),
    ("12-287-gsb-side-1-fra-150.txt", "150-raa-svar/19-q19-clubid-1093-list287-pageindex-1.txt"),
    ("13-287-gsb-side-2-fra-150.txt", "150-raa-svar/20-q20-clubid-1093-list287-pageindex-2.txt"),
    ("14-287-global-side-0-fra-150.txt", "150-raa-svar/18-q18-baseline-list287-current-page0.txt"),
    ("15-287-U15-K-fra-150.txt", "150-raa-svar/09-q09-agegroupid-5-gender-K-list287.txt"),
]
OFFICIAL_GETS = [
    {"n":1,"url":"https://badminton.dk/wp-content/uploads/2024/08/2024-08-02-Reglement-for-Rangliste_.pdf","status":404,"type":"text/html; charset=UTF-8","bytes":95096,"sha256":"2126fa6d19f746ce94a979f92278116384f11dc912201090936fb03c4fa0fd55","outcome":"HTML-fejlside, ikke PDF"},
    {"n":2,"url":"https://badminton.dk/wp-content/uploads/2024/02/Reglement-for-Rangliste-2023-2024-070224.pdf","status":200,"type":"application/pdf","bytes":190672,"sha256":"1c43dc494dda1534a938ef6c72f69e8ca2d4b07c8e5ec44e9180ffb71b0d7966","pages":13,"outcome":"PDF-signatur og tekst kontrolleret"},
    {"n":3,"url":"https://badminton.dk/2020/06/22/information-om-rangliste-i-forhold-til-saesonskifte/","status":200,"type":"text/html; charset=UTF-8","bytes":190277,"sha256":"75520a932d71e8258d7f017ec4dd1656b38ee1a093d5ce0e72fa0b9c47833c3c","outcome":"Historisk sæsonskifteartikel"},
    {"n":4,"url":"https://badminton.dk/?s=Reglement%20for%20Rangliste","status":200,"type":"text/html; charset=UTF-8","bytes":106477,"sha256":"5f2a622bfaabe26b18dc123e0c149181ef5b3daf4ab9bc0cac328eac5c59b100","outcome":"Offentlig site-søgning"},
    {"n":5,"url":"https://badminton.dk/?s=pointintervalskema","status":200,"type":"text/html; charset=UTF-8","bytes":102114,"sha256":"80346a1521c761f70021d83d7766681a00376af9c78287eb7982b9c69c7936c3","outcome":"Offentlig site-søgning"},
    {"n":6,"url":"https://badminton.dk/?s=tilmeldingsniveau","status":200,"type":"text/html; charset=UTF-8","bytes":101272,"sha256":"e4262f7cfc00db1344108da971a353d87e29a614f10c97b10ce12f9681478929","outcome":"Offentlig site-søgning"},
    {"n":7,"url":"https://badminton.dk/rangliste/","status":200,"type":"text/html; charset=UTF-8","bytes":148634,"sha256":"1c9adc9e9a76b734bccd3888c5d45d45d6a86a51b5e9a2bce7757613f08e4779","outcome":"Landing page linker til 2026/27-reglement"},
    {"n":8,"url":"https://badminton.dk/2024/07/05/faa-overblik-over-ranglistereguleringerne-ved-saesonskiftet-til-2024-2025/","status":200,"type":"text/html; charset=UTF-8","bytes":194182,"sha256":"d3407b778b1d486206b978daa113c22a2146fce6a9bb7a01cf40d4d6636e3751","outcome":"2024/25-reguleringer"},
    {"n":9,"url":"https://badminton.dk/2024/01/26/rangliste-aendring-af-pointintervaller-i-u11-a-b-samt-for-u13-drenge/","status":200,"type":"text/html; charset=UTF-8","bytes":186368,"sha256":"b49ac6779df0629998bbee03d77ddbc2c1fe04ec0ae3fc27ae2d8407eaeac6f9","outcome":"U11/U13-intervaller ændret 29-01-2024"},
    {"n":10,"url":"https://badminton.dk/2023/11/03/raekkeintervalskemaerne-til-ranglisten-er-opdateret/","status":200,"type":"text/html; charset=UTF-8","bytes":184217,"sha256":"b274474f4b7cc9f60a373c727132f9cfd772fb3d36840d32f3b6a8498c834636","outcome":"Ungdomsintervaller opdateret 01-11-2023"},
]
OFFICIAL_RAW_FILES = [
    "01-rangliste-reglement-2024-08.html", "02-rangliste-reglement-2024-02.pdf",
    "03-information-rangliste-saesonskifte-2020.html", "04-site-search-ranglistereglement.html",
    "05-site-search-pointintervalskema.html", "06-site-search-tilmeldingsniveau.html",
    "07-rangliste-landing.html", "08-rangliste-reguleringer-2024-25.html",
    "09-pointintervaller-u11-u13-2024.html", "10-pointintervaller-opdateret-2023.html",
]

def digest(file):
    h = hashlib.sha256()
    with file.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest().upper()

def hash_set():
    return {name: digest(DATA / name) for name in EXPECTED}

def open_db(name):
    uri = (DATA / name).resolve().as_uri() + "?mode=ro"
    con = sqlite3.connect(uri, uri=True)
    con.execute("PRAGMA query_only=ON")
    return con

def html_rows(fragment):
    out = []
    for raw in re.findall(r"<tr\b[^>]*>(.*?)</tr>", fragment or "", re.I | re.S):
        cells = []
        for tag, attrs, body in re.findall(r"<(td|th)\b([^>]*)>(.*?)</\1>", raw, re.I | re.S):
            cls = re.search(r"\bclass\s*=\s*['\"]([^'\"]*)['\"]", attrs, re.I)
            text = html.unescape(re.sub(r"<[^>]+>", " ", body))
            text = re.sub(r"\s+([,.;:])", r"\1", " ".join(text.split()))
            cells.append({"class": cls.group(1).split() if cls else [], "text": text})
        rank_i = next((i for i,c in enumerate(cells) if "rank" in c["class"] and c["text"].isdigit()), None)
        if rank_i is None:
            continue
        def by_class(key):
            return next((c for c in cells if key in c["class"]), {})
        pid = re.search(r"href\s*=\s*['\"][^'\"]*VisSpiller/#(\d+)", raw, re.I)
        glob = next((m.group(1) for c in cells[rank_i+1:] if (m:=re.fullmatch(r"\((\d+)\)", c["text"]))), None)
        out.append({
            "rank_in_filter": int(cells[rank_i]["text"]),
            "global_rank_in_parentheses": int(glob) if glob else None,
            "name_and_club": by_class("name").get("text"),
            "row_class": by_class("clas").get("text"),
            "profile_player_id": pid.group(1) if pid else None,
        })
    return out

def load_response(rel):
    envelope = json.loads((OUT / rel).read_text(encoding="utf-8-sig"))
    data = envelope.get("d", envelope)
    return data, html_rows(data.get("Html", ""))

RAW.mkdir(parents=True, exist_ok=True)
raw_copies = []
for dest, source in SOURCES:
    src = OUT / source
    dst = RAW / dest
    shutil.copyfile(src, dst)
    raw_copies.append({"source":f"statistik/results/{source}","saved":f"statistik/results/157-raa-svar/{dest}","bytes":dst.stat().st_size,"sha256":digest(dst)})
prior = json.loads((OUT / "150-ranglistepilot.json").read_text(encoding="utf-8-sig"))
wanted_saved = {f"statistik/results/{source}" for _, source in SOURCES}
prior_requests = [r for r in prior.get("requests", []) if r.get("saved_response", "").replace("\\", "/") in wanted_saved]
baseline_fields = next((r.get("request_fields", {}) for r in prior_requests if r.get("saved_response", "").endswith("18-q18-baseline-list287-current-page0.txt")), {})
reused_request_log = []
for r in prior_requests:
    fields = {k:v for k,v in (r.get("request_fields") or {}).items() if k != "callbackcontextkey"}
    base = {k:v for k,v in baseline_fields.items() if k != "callbackcontextkey"}
    reused_request_log.append({"source_task":"150","number":r.get("number"),"label":r.get("label"),"method":r.get("method"),"url":r.get("url"),"fields_changed":{k:v for k,v in fields.items() if base.get(k) != v},"status":r.get("status"),"bytes":r.get("response_bytes"),"response_sha256":r.get("response_sha256"),"saved_response":r.get("saved_response"),"callbackcontextkey":"redacted"})
official_raw_responses = [{"saved":f"statistik/results/157-raa-svar/{name}","bytes":(RAW/name).stat().st_size,"sha256":digest(RAW/name)} for name in OFFICIAL_RAW_FILES]

before = hash_set()
for name, expected in EXPECTED.items():
    if before[name] != expected:
        raise RuntimeError(f"Databasehash afviger før læsning: {name} {before[name]}")

schemas = {}
for name in EXPECTED:
    con = open_db(name)
    query_only = con.execute("PRAGMA query_only").fetchone()[0] == 1
    if not query_only:
        raise RuntimeError(f"query_only ikke aktiv for {name}")
    tables = []
    for (table,) in con.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"):
        cols = [r[1] for r in con.execute(f'PRAGMA table_info("{table.replace(chr(34), chr(34)*2)}")')]
        tables.append({"table":table,"columns":cols})
    schemas[name] = {"open_mode":"readOnly","query_only":query_only,"tables":tables}
    if name == "rangliste-point.db":
        schemas[name]["ranking_points_summary"] = {
            "row_count":con.execute("SELECT COUNT(*) FROM ranking_points").fetchone()[0],
            "list_287_rows":con.execute("SELECT COUNT(*) FROM ranking_points WHERE list_id=287").fetchone()[0],
            "snapshots":[dict(version_date=r[0], rows=r[1], list_gender_pairs=r[2]) for r in con.execute("SELECT version_date,COUNT(*),COUNT(DISTINCT list_id||'/'||param) FROM ranking_points GROUP BY version_date ORDER BY version_date")],
            "by_list_param":[dict(list_id=r[0],param=r[1],versions=r[2],first_date=r[3],last_date=r[4],rows=r[5]) for r in con.execute("SELECT list_id,param,COUNT(DISTINCT version_date),MIN(version_date),MAX(version_date),COUNT(*) FROM ranking_points GROUP BY list_id,param ORDER BY list_id,param")]
        }
    con.close()

p0d,p0=load_response("150-raa-svar/10-q10-clubid-1093-list287.txt")
p1d,p1=load_response("150-raa-svar/19-q19-clubid-1093-list287-pageindex-1.txt")
p2d,p2=load_response("150-raa-svar/20-q20-clubid-1093-list287-pageindex-2.txt")
g0d,g0=load_response("150-raa-svar/18-q18-baseline-list287-current-page0.txt")
femd,fem=load_response("150-raa-svar/09-q09-agegroupid-5-gender-K-list287.txt")
pages=[int(x) for x in re.findall(r"SelectRankingListPage\((\d+)\)",p0d.get("Html",""))]
gsb_page_count=max(pages)+1 if pages else None
versions=p0d.get("Versions",[])
dates=sorted({r["version_date"] for r in schemas["rangliste-point.db"]["ranking_points_summary"]["snapshots"]})
d2526=[d for d in dates if "2025-07-01" <= d < "2026-07-01"]
d2627=[d for d in dates if "2026-07-01" <= d < "2027-07-01"]
point_versions=len(dates)
saved_gsb=[*p0,*p1,*p2]
classes={}
for row in saved_gsb:
    classes[row["row_class"] or "(ukendt)"]=classes.get(row["row_class"] or "(ukendt)",0)+1
female_classes={}
for row in fem:
    female_classes[row["row_class"] or "(ukendt)"]=female_classes.get(row["row_class"] or "(ukendt)",0)+1
after=hash_set()
checks={name:{"expected":EXPECTED[name],"before":before[name],"after":after[name],"unchanged":before[name]==after[name]==EXPECTED[name]} for name in EXPECTED}
if not all(x["unchanged"] for x in checks.values()):
    raise RuntimeError("Databasehash ændret eller uventet efter læsning")

missing_gsb_posts=point_versions*(gsb_page_count or 0)-len([p0,p1,p2])
missing_global_posts=point_versions*212-1
result={
    "title":"Opgave 157 — tilmeldingsniveau",
    "generated_at":datetime.now(timezone.utc).isoformat(),
    "status":"stoppet_ved_trin_2",
    "official_gets_to_badminton_dk":OFFICIAL_GETS,
    "badminton_dk_calls":10,
    "badmintonplayer_new_calls":0,
    "badmintonplayer_reused_request_log":reused_request_log,
    "official_raw_responses":official_raw_responses,
    "badmintonplayer_stop_reason":f"287 findes ikke i pointdatabasen for {point_versions} pointversioner. Ved fire GSB-sider pr. version mangler anslået {missing_gsb_posts} POST-sider samt 1 frisk GET (= {missing_gsb_posts+1} kald), over loftet 40. Historiske sidetal er ikke verificeret; ingen kald blev sendt.",
    "saved_150_287_responses_reused":raw_copies,
    "database_hashes_before":before,
    "database_hashes_after":after,
    "database_checks":checks,
    "schemas":schemas,
    "point_versions":{
        "all_dates":dates,"total":point_versions,
        "2025_26":d2526,"2026_27":d2627,
        "list_287_rows_in_db":schemas["rangliste-point.db"]["ranking_points_summary"]["list_287_rows"]
    },
    "saved_list_287":{
        "captured_at":"2026-10-07",
        "selected_version_label":next((v.get("Text") for v in versions if v.get("Selected")),None),
        "menu_includes_2026_10_07":any(v.get("Value")=="10/07/2026" for v in versions),
        "gsb_rows_pages_0_2":len(saved_gsb),
        "gsb_pages_observed":gsb_page_count,
        "saved_pages":[0,1,2],
        "missing_page":[3] if gsb_page_count==4 else [],
        "class_counts":classes,
        "u09_rows":sum(1 for r in saved_gsb if (r["row_class"] or "").startswith("U09")),
        "global_page_0_rows":len(g0),
        "female_filter_rows":len(fem),
        "female_filter_classes":female_classes,
        "public_lookup_examples":p0[:3],
        "playerid_behavior":"Ikke afprøvet for liste 287; HTML-profil-ID beviser ikke POST-filterets semantik.",
        "u09":"U09 ikke fundet i 300 GSB-rækker på gemte side 0-2 eller i gemt K-prøve; ingen særskilt U09-forespørgsel, samlet tilstedeværelse ukendt.",
        "gender":"Kun K-filterprøve gemt, ingen tilsvarende M-prøve; kønssammenligning ikke udført.",
        "rank_semantics":"Filtreret første kolonne er lokal rank; parentes er samlet rank, ifølge 156 Del A."
    },
    "call_estimates":{
        "gsb_filtered_all_versions":{"point_versions":point_versions,"observed_pages_per_version":gsb_page_count,"saved_pages_for_latest":3,"estimated_missing_post_pages":missing_gsb_posts,"fresh_get":1,"estimated_total":missing_gsb_posts+1,"historical_page_counts":"ukendt; estimat holder observerede fire sider konstant"},
        "global_unfiltered_all_versions":{"observed_pages_latest":212,"saved_page_latest":1,"estimated_missing_post_pages":missing_global_posts,"fresh_get":1,"estimated_total":missing_global_posts+1,"historical_page_counts":"ukendt; 212 er seneste observerede sidetal"}
    },
    "formula_tests":{"status":"ikke_kørt (trin 2 stop)","candidates":["bedste disciplin","sum","gennemsnit","kampvægtet sum","gulv/loft pr. disciplin"],"spearman":None,"kendall":None,"pair_order_rate":None,"group_sizes":{"M":None,"K":None}},
    "raw_sources":[{"saved":f"statistik/results/157-raa-svar/{x[0]}","bytes":(RAW/x[0]).stat().st_size,"sha256":digest(RAW/x[0])} for x in SOURCES],
    "official_rules":{
        "document":"Fællesreglement for Ranglisten 2023/24, dateret 07-02-2024, 13 sider",
        "formula":"§5 stk.1 s.3: vægtet gennemsnit af alle aktive kategorier; kategorien med flest point vægter højst; koefficienter/full formel ikke oplyst.",
        "matches":"Appendiks A s.11: alle spillerens kampe indgår i samlet placering. Appendiks B s.12 definerer kampe som enkeltkampe pr. kategori fra sæsonstart til seneste relevante resultat. 2020-artikel beskriver én sæson tilbage i kampantal ved ændringen til 2020/21.",
        "boundaries":"Appendiks A s.9 ungdom pointintervaller pr. køn/årgang; s.11 voksen placeringsintervaller pr. køn; vurdering kvartalsvis. Historisk 2023/24-tal ikke overført til nyere sæsoner.",
        "2026_27_link_found_not_fetched":"https://badminton.dk/wp-content/uploads/2026/09/Reglement-for-Rangliste-2026-09-10.pdf"
    },
    "recommendation":"Få Chris til at vælge én repræsentativ version pr. sæson eller alle eksisterende pointversioner. Med alle 13 versioner overskrider GSB-filterestimatet 40 kald; derfor er reverse engineering ikke udført."
}
(OUT/"157-tilmeldingsniveau.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"json":"statistik/results/157-tilmeldingsniveau.json","point_versions":point_versions,"list_287_rows":result["point_versions"]["list_287_rows_in_db"],"saved_gsb_rows":len(saved_gsb),"gsb_pages":gsb_page_count,"calls_estimate":missing_gsb_posts+1,"hashes_unchanged":all(x["unchanged"] for x in checks.values())},ensure_ascii=False,indent=2))

