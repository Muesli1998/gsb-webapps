#!/usr/bin/env python3
"""Bounded, read-only audit of youth placement rows on list 287."""
import argparse, hashlib, html, json, re, sqlite3, time, urllib.error, urllib.request
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RESULTS = ROOT / 'statistik' / 'results'
RAW = RESULTS / '160-raa-svar'
OUT_JSON = RESULTS / '160-ungdom-placeringsraekker.json'
OUT_MD = RESULTS / '160-ungdom-placeringsraekker.md'
PAGE = 'https://badmintonplayer.dk/DBF/Ranglister/'
API = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/GetRankingListPlayers'
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36'
EXPECTED = {
    'gsb-statistik-normalized.db': '49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E',
    'liga-landskab.db': '9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C',
    'rangliste-historik.db': '6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F',
    'national-spillere.db': '1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E',
    'rangliste-point.db': 'DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9',
}
IDS = {'U13': 4, 'U15': 5, 'U17': 6, 'U09': 2}
LIMIT = 20
PAUSE = 2.1
last_request = 0.0
context_key = None
consecutive_failures = 0

def sha(data): return hashlib.sha256(data).hexdigest()
def digest_file(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''): h.update(block)
    return h.hexdigest().upper()

def pace():
    global last_request
    delay = PAUSE - (time.monotonic() - last_request)
    if delay > 0: time.sleep(delay)
    last_request = time.monotonic()

def save_redacted(path, body):
    text = body.decode('utf-8', 'replace')
    if context_key: text = text.replace(context_key, '[REDACTED_CONTEXT_KEY]')
    path.write_text(text, encoding='utf-8')

def fetch_one(method, url, data=None, headers=None, label='', fields={}):
    global consecutive_failures
    pace()
    req = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    status = None; body = b''; error = None
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            status = resp.status; body = resp.read()
    except urllib.error.HTTPError as e:
        status = e.code; body = e.read()
    except Exception as e:
        error = f'{type(e).__name__}: {e}'
    rec = {'n': len(log) + 1, 'method': method, 'label': label, 'url': url,
           'fields_changed': fields, 'status': status, 'bytes': len(body) if status else None,
           'sha256': sha(body) if status else None, 'error': error, 'file': None}
    log.append(rec)
    if status is not None:
        name = f"{rec['n']:02d}-{label}.json" if method == 'POST' else f"{rec['n']:02d}-context-page.html"
        path = RAW / name; save_redacted(path, body); rec['file'] = name
    if status is None or status >= 400:
        consecutive_failures += 1
        if status == 429 or (status is not None and status >= 500): time.sleep(min(30, 2 ** consecutive_failures))
        if consecutive_failures >= 3: raise RuntimeError(f"Three consecutive request errors; stopped after {label}: HTTP {status}, {error or ''}")
    else:
        consecutive_failures = 0
    return rec, body

def get_context():
    global context_key
    rec, body = fetch_one('GET', PAGE, headers={'User-Agent': UA, 'Accept': '*/*'}, label='context', fields={})
    if rec['status'] != 200: raise RuntimeError(f"Fresh context GET failed: HTTP {rec['status']} {rec['error'] or ''}")
    text = body.decode('utf-8', 'replace')
    m = re.search(r"var\s+SR_CallbackContext\s*=\s*'([^']*)'", text)
    if not m: raise RuntimeError('Context key was not found in public page HTML.')
    context_key = m.group(1)

def request_body(list_id='287', param='M', changes=None):
    d = {'callbackcontextkey': context_key, 'rankinglistagegroupid': '15', 'rankinglistid': str(list_id),
         'seasonid': '2026', 'rankinglistversiondate': '', 'agegroupid': '', 'classid': '', 'gender': '',
         'clubid': '', 'searchall': False, 'regionid': '', 'pointsfrom': '', 'pointsto': '', 'rankingfrom': '',
         'rankingto': '', 'birthdatefromstring': '', 'birthdatetostring': '', 'agefrom': '', 'ageto': '',
         'playerid': '', 'param': param, 'pageindex': '0', 'sortfield': '0', 'getversions': True, 'getplayer': True}
    d.update(changes or {})
    return d

def strip_html(s): return html.unescape(re.sub(r'<[^>]+>', ' ', s or '')).replace('\xa0', ' ').strip()
def parse_rows(document):
    try: markup = json.loads(document.decode('utf-8'))['d']['Html']
    except Exception: return [], None, None
    rows = []
    for tr in re.findall(r'<tr\b[^>]*>(.*?)</tr>', markup, re.I | re.S):
        cells = re.findall(r'<(td|th)\b([^>]*)>(.*?)</\1>', tr, re.I | re.S)
        parsed = []
        for _, attrs, content in cells:
            cls = (re.search(r"class\s*=\s*['\"]([^'\"]*)", attrs, re.I) or [None, ''])[1]
            parsed.append((cls, strip_html(content)))
        classes = [x[0] for x in parsed]
        if 'rank' not in classes: continue
        i = classes.index('rank')
        if not parsed[i][1].isdigit(): continue
        overall = None
        if i + 1 < len(parsed) and re.fullmatch(r'\(\d+\)', parsed[i+1][1]): overall = int(parsed[i+1][1][1:-1])
        def cell(name):
            return next((v for c, v in parsed if c == name), None)
        name_cell = next((content for _, attrs, content in cells if re.search(r"class\s*=\s*['\"]name['\"]", attrs, re.I)), '')
        name = strip_html(re.sub(r',\s*[^,]+$', '', name_cell))
        club = strip_html(name_cell).rsplit(',', 1)[1].strip() if ',' in strip_html(name_cell) else None
        pid = re.search(r'VisSpiller/#(\d+)', tr)
        rows.append({'rank': int(parsed[i][1]), 'overall_rank': overall, 'member_number': cell('playerid'),
                     'name': name, 'club': club, 'class': cell('clas'), 'points_display': cell('points'),
                     'profile_id': pid.group(1) if pid else None})
    pages = sorted({int(x) for x in re.findall(r'SelectRankingListPage\((\d+)\)', markup)})
    page_count = max(pages) + 1 if pages else 1
    return rows, page_count, markup

log = []
def do_post(label, param, changes=None):
    if len(log) >= LIMIT: raise RuntimeError('20-call budget reached.')
    d = request_body(param=param, changes=changes)
    fields = {k: v for k, v in (changes or {}).items()}
    payload = json.dumps(d, ensure_ascii=False).encode('utf-8')
    headers = {'User-Agent': UA, 'Accept': '*/*', 'Content-Type': 'application/json; charset=UTF-8',
               'X-Requested-With': 'XMLHttpRequest', 'Origin': 'https://badmintonplayer.dk', 'Referer': PAGE}
    rec, body = fetch_one('POST', API, payload, headers, label, fields)
    rec['list_id'] = '287'; rec['param'] = param
    rows, page_count, markup = parse_rows(body) if rec['status'] == 200 else ([], None, None)
    rec['rows_page0'] = len(rows); rec['page_count'] = page_count
    vm=re.search(r'Version\s*:\s*(\d{2}-\d{2}-\d{4})',markup or '',re.I)
    rec['ranking_version']=vm.group(1) if vm else None
    if rec['status'] == 200 and any(x in body.lower() for x in [b'captcha', b'cloudflare', b'bot detection', b'are you human']):
        rec['bot_guard'] = True
    return rec, rows

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--fetch', action='store_true', help='Make the specified bounded live requests, then analyze.')
    args = parser.parse_args()
    RAW.mkdir(parents=True, exist_ok=True)
    if args.fetch:
        get_context()
        requests = []
        for age, age_id in [('U13',4),('U15',5),('U17',6)]:
            for gender in ['M','K']:
                rec, rows = do_post(f'{age}-{gender}-page0', '', {'agegroupid': str(age_id), 'gender': gender})
                requests.append((rec, rows))
                if rec.get('bot_guard'): raise RuntimeError('Bot/CAPTCHA marker observed; stopped.')
        rec, rows = do_post('U09-M-page0', '', {'agegroupid': '2', 'gender': 'M'}); requests.append((rec, rows))
        # Valid public profile IDs copied from the 159 GSB-filtered 287 rows.
        rec, rows = do_post('playerid-GSB-K', '', {'playerid': '325460', 'gender': 'K'}); requests.append((rec, rows))
        rec, rows = do_post('playerid-GSB-M', '', {'playerid': '293765', 'gender': 'M'}); requests.append((rec, rows))
        (RAW / 'request-log.json').write_text(json.dumps(log, ensure_ascii=False, indent=2), encoding='utf-8')
    else:
        requests = []
        log_path = RAW / 'request-log.json'
        if not log_path.exists(): raise SystemExit('No saved request log; run with --fetch first.')
        log.extend(json.loads(log_path.read_text(encoding='utf-8')))
        for rec in log:
            if rec['method'] == 'POST' and rec.get('file'):
                body = (RAW / rec['file']).read_bytes()
                rows, pc, markup = parse_rows(body); requests.append((rec, rows)); rec['rows_page0']=len(rows); rec['page_count']=pc
                vm=re.search(r'Version\s*:\s*(\d{2}-\d{2}-\d{4})',markup or '',re.I); rec['ranking_version']=vm.group(1) if vm else None
    analyze(requests)

def open_db(name):
    p = ROOT / 'statistik' / 'data' / name
    con = sqlite3.connect(f'file:{p.as_posix()}?mode=ro', uri=True)
    con.execute('PRAGMA query_only=ON')
    if con.execute('PRAGMA query_only').fetchone()[0] != 1: raise RuntimeError(f'{name} is not query_only')
    return p, con

def analyze(requests):
    hashes_before = {n: digest_file(ROOT/'statistik'/'data'/n) for n in EXPECTED}
    dbs = {}; schemas = {}; age_names = {}; points = defaultdict(list)
    for name in EXPECTED:
        p, con = open_db(name); dbs[name] = (p, con)
        tables = [x[0] for x in con.execute("select name from sqlite_master where type='table' order by name")]
        schemas[name] = {t: [x[1] for x in con.execute(f'pragma table_info("{t}")')] for t in tables}
    lig = dbs['liga-landskab.db'][1]
    age_names = {int(i): n for i,n in lig.execute('select age_group_id,name from age_groups')}
    rdb = dbs['rangliste-point.db'][1]
    point_version = '2026-10-07'
    point_rows = rdb.execute("select list_id,param,player_id,rank,points,class from ranking_points where version_date=? and list_id in (288,289,292)", (point_version,)).fetchall()
    for list_id,param,pid,rank,pts,klass in point_rows:
        if pid is not None and pts is not None: points[(str(pid),param)].append({'list_id':list_id,'rank':rank,'points':pts,'class':klass})
    lists=[]; point_test=[]; samples=[]; boundary_details=[]; top8_results=[]
    for rec, rows in requests:
        label=rec['label']
        if label.startswith('U09-') or label.startswith('playerid-'): continue
        age = label.split('-')[0]; gender = label.split('-')[1]
        expected_classes = ({'M':(1,24),'M-A':(25,48),'A':(49,None)} if age=='U13' else {'E':(1,24),'E-M':(25,36),'M':(37,None)})
        counts=Counter((r.get('class') or '(tom række)') for r in rows)
        checks=[]
        for row in rows:
            klass=(row.get('class') or '').replace(age+' ','').strip()
            if klass not in expected_classes: continue
            lo,hi=expected_classes[klass]
            ok=row['rank']>=lo and (hi is None or row['rank']<=hi)
            checks.append({'rank':row['rank'],'name':row['name'],'class':row.get('class'),'expected_interval':[lo,hi],'pass':ok})
            cutoff = 49 if age == 'U13' else 37
            if row['rank'] >= cutoff:
                threshold = ({'U13':{'M':1525,'K':1350},'U15':{'M':1850,'K':1500},'U17':{'M':2150,'K':1700}}[age][gender])
                pr=points.get((str(row.get('profile_id')),gender),[])
                high=max((x['points'] for x in pr),default=None)
                expected = (('A' if age=='U13' else 'M') if high>threshold else ('B' if age=='U13' else 'A')) if high is not None else None
                point_test.append({'age':age,'gender':gender,'rank':row['rank'],'name':row['name'],'profile_id':row.get('profile_id'),'class':row.get('class'),'max_discipline_points':high,'threshold_strictly_greater_than':threshold,'point_rows':pr,'expected_class_from_threshold':(f'{age} {expected}' if expected else None),'testable':high is not None,'pass':(row.get('class')==f'{age} {expected}') if high is not None else None})
            if row.get('class') in ('U15 E','U17 E') and row['rank']>24:
                pr=points.get((str(row.get('profile_id')),gender),[])
                top=[x for x in pr if x['rank'] is not None and x['rank']<=8]
                top8_results.append({'age':age,'gender':gender,'rank_287':row['rank'],'name':row['name'],'profile_id':row.get('profile_id'),'discipline_ranks':pr,'top8_discipline_lists':top,'age_confirmed_by_287_filter':True})
            if len(samples)<3: samples.append({'age':age,'gender':gender,'name':row['name'],'class':row.get('class'),'rank':row['rank'],'profile_id':row.get('profile_id')})
        lists.append({'age':age,'agegroupid':IDS[age],'age_name_from_db':age_names.get(IDS[age]),'gender':gender,'pages':rec.get('page_count'),'rows_page0':len(rows),'class_counts':dict(counts),'fixed_interval_check':{'tested':len(checks),'pass':sum(x['pass'] for x in checks),'fail':sum(not x['pass'] for x in checks),'failures':[x for x in checks if not x['pass']]},'rows':rows})
        bounds=[24,25,36,37,48,49] if age=='U13' else [24,25,36,37]
        boundary_details.append({'age':age,'gender':gender,'boundaries':{str(b):[r for r in rows if r['rank'] in (b,b+1)] for b in bounds},'ties':{str(k):v for k,v in _ties(rows).items() if k in bounds or k+1 in bounds}})
    samples=[]
    for sample_age,sample_gender,sample_rank in [('U13','M',1),('U15','K',2),('U17','M',1)]:
        listing=next((x for x in lists if x['age']==sample_age and x['gender']==sample_gender),None)
        row=next((x for x in (listing or {}).get('rows',[]) if x['rank']==sample_rank),None)
        if row: samples.append({'age':sample_age,'gender':sample_gender,'name':row['name'],'class':row.get('class'),'rank':row['rank'],'profile_id':row.get('profile_id')})
    u09=next(((r,rows) for r,rows in requests if r['label'].startswith('U09-')),None)
    player_queries=[]
    for rec, rows in requests:
        if not rec['label'].startswith('playerid-'): continue
        player_queries.append({'label':rec['label'],'request_fields':rec['fields_changed'],'rows_page0':len(rows),'page_count':rec.get('page_count'),'rows':rows,'reported_player_fields':_reported_player_fields(RAW/rec['file']) if rec.get('file') else None})
    for p,con in dbs.values(): con.close()
    hashes_after={n:digest_file(ROOT/'statistik'/'data'/n) for n in EXPECTED}
    hash_records={n:{'before':hashes_before[n],'after':hashes_after[n],'expected':EXPECTED[n],'unchanged':hashes_before[n]==hashes_after[n]==EXPECTED[n]} for n in EXPECTED}
    prior_path=RAW/'attempt-1-param-only'/'request-log.json'
    prior=json.loads(prior_path.read_text(encoding='utf-8')) if prior_path.exists() else []
    for rec in prior:
        rec['attempt']=1; rec['number']=rec['n']; rec['analysis_use']='discarded: M/K was mistakenly sent as param instead of gender';
        if rec.get('file'): rec['file']='attempt-1-param-only/'+rec['file']
    for rec in log:
        rec['attempt']=2; rec['number']=10+rec['n']; rec['analysis_use']='corrected gender-field probe'
    all_requests=prior+log
    data={'task':160,'requests':all_requests,'new_call_count':len(all_requests),'analysis_call_count':len(log),'lists':lists,'u09_probe':{'request':next((r for r,_ in requests if r['label'].startswith('U09-')),None),'rows':u09[1] if u09 else []},'playerid_probes':player_queries,'point_version':point_version,'point_rows_count':len(point_rows),'point_test':point_test,'top8_E_outside_287_top24':top8_results,'boundary_analysis':boundary_details,'lookup_samples':samples,'db_schemas':schemas,'agegroup_names_readonly':age_names,'database_hashes':hash_records,'notes':['Første forsøg blev kasseret: M/K stod i param i stedet for gender og gav identiske M/K-svar. Andet forsøg anvendte gender-feltet korrekt.','Kategoriundtagelsen top 8 kan kun vurderes blandt spillere med profile-ID-match i rangliste-point.db.','Pointdatabasen har versionsdato 2026-10-07; 287-svar hentes aktuelt og kan derfor være to dage nyere.']}
    OUT_JSON.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    OUT_MD.write_text(render_md(data),encoding='utf-8')

def _ties(rows):
    c=Counter(r['rank'] for r in rows); return {k:[r for r in rows if r['rank']==k] for k,n in c.items() if n>1}
def _reported_player_fields(path):
    try:
        d=json.loads(path.read_text(encoding='utf-8'))['d']
        return {k:d.get(k) for k in ['PlayerID','PlayerNumber','PlayerName']}
    except Exception:return None
def render_md(d):
    observed_version=next((r.get('ranking_version') for r in d['requests'] if r.get('ranking_version')), 'ukendt')
    lines=['# Opgave 160 — ungdomsrækker efter placering','',f"Kald: {d['new_call_count']} til badmintonplayer.dk (2 GET + 18 POST); badminton.dk: 0. De analyserede 287-svar er version {observed_version}. Råsvar og fulde hashes står i JSON.",'','## 1–2. Seks listeudsnit og faste intervaller','','| Aldersgruppe | Køn | ID | Side 0 rækker | Sider | Rækkefordeling | Intervaltest bestået/afprøvet | Afvigere |','|---|---|---:|---:|---:|---|---:|---:|']
    for x in d['lists']:
        lines.append(f"| {x['age']} | {x['gender']} | {x['agegroupid']} | {x['rows_page0']} | {x['pages']} | "+', '.join(f"{k}: {v}" for k,v in x['class_counts'].items())+f" | {x['fixed_interval_check']['pass']}/{x['fixed_interval_check']['tested']} | {x['fixed_interval_check']['fail']} |")
    lines += ['', 'Afvigere vises med navn, rang og række i JSON (`fixed_interval_check.failures`). Grænser er prøvet som fast ranginterval; undtagelsen for placering 1–8 i enkeltlister kræver særskilt disciplinliste-kontrol.','', '## 3. Pointtærskler', '',f"Pointkilde: `rangliste-point.db`, {d['point_version']}, lister 288/289/292, param M/K; max af tilgængelige disciplinpoint pr. profile-ID. Testposter: {len(d['point_test'])}; bestået: {sum(x['pass'] is True for x in d['point_test'])}; afviget: {sum(x['pass'] is False for x in d['point_test'])}; uden pointmatch: {sum(not x['testable'] for x in d['point_test'])}. Fulde enkeltposter i JSON.",'','## 4. Top-8-undtagelsen','','E-rækker uden for top-24 og deres disciplinrang ≤8 findes i `top8_E_outside_287_top24`; kun ID-match i den lokale pointdatabase er belæg. Aldersgruppe kan ikke udledes af pointtabellen alene; 287-filteret er kohortekilden.','', '## 5. Reservekald', '', '### U09',f"U09/M (agegroupid 2): {len(d['u09_probe']['rows'])} rækker på side 0; sidetal og rækker i JSON.",'','### playerid', 'To GSB-profiler fra de gemte 159-lister blev afprøvet. Svarrækker og API-metadata står i JSON; placeringstype klassificeres kun når responsens rank kan matches direkte mod 287-udsnittet.','', '## 6. Anbefaling','', 'Placering kan kun forudsige de faste tiers, hvis de seks aktuel-side-0 lister bekræfter intervallerne. Pointbaserede ungdomsrækker kræver tilmeldingsniveau-point, som ikke står på 287; disciplinpoint er kun en kandidatproxy. Procent/andel og konkrete undtagelser skal læses sammen med de beregnede punktresultater, ikke behandles som en bevist formel.','', '## Databaser', '', '| Database | Før | Efter | Uændret forventet hash |','|---|---|---|---|']
    lines += ['', '### Reglementets kriterier (som dokumenteret i opgave 159)', '', '- U15/U17: E ved placering 1–24 (med særundtagelse top-8 i den enkelte disciplin), E-M 25–36, M fra 37 med point over tærskel: U15 M >1850/K >1500; U17 M >2150/K >1700.', '- U13: M 1–24, M-A 25–48, A fra 49 med point over tærskel M >1525/K >1350. U09/U11/U19 har ifølge kortets kildesammenfatning ikke placeringsrækker.', '- Kilden er 2026-09-10-reglementet som opsummeret i 159; ingen nye badminton.dk-kald blev foretaget i denne opgave.', '']
    for name,x in d['database_hashes'].items(): lines.append(f"| {name} | `{x['before']}` | `{x['after']}` | {'ja' if x['unchanged'] else 'NEJ'} |")
    point_groups=defaultdict(lambda:[0,0,0,0])
    for row in d['point_test']:
        g=point_groups[(row['age'],row['gender'])]; g[0]+=1; g[1]+=row['pass'] is True; g[2]+=row['pass'] is False; g[3]+=not row['testable']
    lines += ['', '## Detaljerede afvigere', '']
    for x in d['lists']:
        failures=x['fixed_interval_check']['failures']
        lines.append(f"**{x['age']} {x['gender']}:** "+('; '.join(f"{z['name']} — rang {z['rank']}, {z['class']}" for z in failures) if failures else 'ingen')+'.')
    lines += ['', '## Pointtest pr. aldersgruppe og køn', '', '| Alder | Køn | Testet | Bestået | Afviget | Uden pointmatch |', '|---|:---:|---:|---:|---:|---:|']
    for (age,gender),g in sorted(point_groups.items()): lines.append(f'| {age} | {gender} | {g[0]} | {g[1]} | {g[2]} | {g[3]} |')
    point_fails=[x for x in d['point_test'] if x['pass'] is False]
    lines += ['', 'Pointtærskel-afvigelser: '+('; '.join(f"{x['age']} {x['gender']} rang {x['rank']} {x['name']}: {x['class']}, max {x['max_discipline_points']} (> {x['threshold_strictly_greater_than']}), forventet {x['expected_class_from_threshold']}" for x in point_fails) if point_fails else 'ingen')+'.', '', '## Top-8-undtagelsen — fulde fund', '']
    for x in d['top8_E_outside_287_top24']:
        allr=', '.join(f"liste {p['list_id']} rang {p['rank']} ({p['points']} point)" for p in x.get('discipline_ranks',[])) or 'ingen pointposter'
        top=', '.join(f"liste {p['list_id']} rang {p['rank']}" for p in x['top8_discipline_lists']) or 'ingen top-8'
        lines.append(f"- {x['age']} {x['gender']} #{x['rank_287']} {x['name']}: {allr}; {top}.")
    lines += ['', 'Tre opslagseksempler fra de seks lister:', '', '| Navn | Aldersgruppe/køn | Række | Placering |', '|---|---|---|---:|']
    for x in d['lookup_samples']: lines.append(f"| {x['name']} | {x['age']} {x['gender']} | {x['class']} | {x['rank']} |")
    u09=d['u09_probe']; u09counts=Counter(r.get('class') or '(tom række)' for r in u09['rows'])
    lines += ['', f"U09-reserve: `agegroupid=2`, gender M, {len(u09['rows'])} rækker / {u09['request'].get('page_count')} sider; rækkeetiketter: "+', '.join(f'{k} {v}' for k,v in u09counts.items())+'.', '', 'playerid-reserve:']
    for x in d['playerid_probes']:
        rr=x['rows'][0] if x['rows'] else {}
        lines.append(f"- {x['reported_player_fields'].get('PlayerName')} (`{x['reported_player_fields'].get('PlayerID')}`): svar {rr.get('rank')} / {rr.get('class')}; {x['rows_page0']} række(r), {x['page_count']} side(r).")
    lines.append('Sammenholdt med de gemte GSB-klubsvar fra 159: Anja Thomsen har lokal rang 1 og parentesrang 1669; playerid-svaret er 1669. Nikolaj Thorslund Hindsbo har lokal rang 47 og parentesrang 5437; playerid-svaret er 5437. Dermed returnerer playerid-svaret den fælles placering i parentes, ikke GSB-lokal rang eller kønsplaceringen i den separate ufiltrerede kønsliste.')
    lines += ['', '## Forespørgselslog — alle 20 kald', '', '| Nr. | Forsøg | Kald | Felter / param | HTTP | Bytes | SHA-256 |', '|---:|---:|---|---|---:|---:|---|']
    for r in d['requests']:
        fields=json.dumps(r.get('fields_changed') or {},ensure_ascii=False,separators=(',',':'))
        lines.append(f"| {r.get('number',r['n'])} | {r.get('attempt','1')} | {r['method']} {r['label']} | `{fields}`; param `{r.get('param','')}` | {r.get('status') or r.get('error')} | {r.get('bytes') or '—'} | `{r.get('sha256') or '—'}` |")
    lines += ['', 'Forsøg 1 brugte fejlagtigt M/K i `param` i stedet for feltet `gender`; de kønsparvise svar blev identiske og er kasseret fagligt. Forsøg 2 brugte `gender=M/K` og tom `param`. Råsvar fra første forsøg er bevaret i `160-raa-svar/attempt-1-param-only/`.', '']
    lines+=['','## Schema og kaldslog','', 'Faktiske SQLite-kolonner pr. tabel samt request-felter, HTTP-status, byteantal og SHA-256 er i JSON. Kontekstnøglen blev holdt i hukommelsen og fjernet fra gemte svar.','']
    return '\n'.join(lines)

if __name__ == '__main__': main()
