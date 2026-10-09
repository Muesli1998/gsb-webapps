import json, re, time, hashlib, sys, os, html, urllib.request
OUT=os.environ.get('OUT','159-raa-svar')
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36'
PAGE='https://badmintonplayer.dk/DBF/Ranglister/'
SVC='https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/GetRankingListPlayers'
log=[]; ctx=None; last=0.0
def pace():
    global last
    w=2.2-(time.time()-last)
    if w>0: time.sleep(w)
    last=time.time()
def sha(b): return hashlib.sha256(b).hexdigest()
def get_ctx():
    global ctx
    pace()
    r=urllib.request.Request(PAGE,headers={'user-agent':UA,'accept':'*/*'})
    b=urllib.request.urlopen(r,timeout=45).read(); t=b.decode('utf-8','replace')
    m=re.search(r"var SR_CallbackContext = '([^']*)'",t); ctx=m.group(1)
    log.append(dict(n=len(log)+1,method='GET',url=PAGE,status=200,bytes=len(b),sha256=sha(b)))
def body(list_id,param,**ch):
    d=dict(callbackcontextkey=ctx,rankinglistagegroupid='15',rankinglistid=str(list_id),seasonid='2026',rankinglistversiondate='',agegroupid='',classid='',gender='',clubid='',searchall=False,regionid='',pointsfrom='',pointsto='',rankingfrom='',rankingto='',birthdatefromstring='',birthdatetostring='',agefrom='',ageto='',playerid='',param=param,pageindex='0',sortfield='0',getversions=True,getplayer=True)
    d.update(ch); return d
def post(label,list_id,param,**ch):
    pace()
    d=body(list_id,param,**ch)
    req=urllib.request.Request(SVC,data=json.dumps(d).encode(),headers={'user-agent':UA,'accept':'*/*','content-type':'application/json; charset=UTF-8','x-requested-with':'XMLHttpRequest','origin':'https://badmintonplayer.dk','referer':PAGE})
    try:
        b=urllib.request.urlopen(req,timeout=45).read(); st=200
    except urllib.error.HTTPError as e:
        b=e.read(); st=e.code
    t=b.decode('utf-8','replace').replace(ctx,'[REDACTED]')
    fn=f"{len(log)+1:02d}-{label}.txt"; open(os.path.join(OUT,fn),'w',encoding='utf-8').write(t)
    e=dict(n=len(log)+1,method='POST',label=label,changes={k:v for k,v in ch.items()},list=list_id,param=param,status=st,bytes=len(b),sha256=sha(b),file=fn)
    log.append(e)
    try: data=json.loads(b)['d']
    except Exception: return e,None,[]
    return e,data,parse_rows(data.get('Html',''))
def parse_rows(h):
    out=[]
    for tr in re.findall(r'<tr\b[^>]*>([\s\S]*?)</tr>',h,flags=re.I):
        cells=[(m[0],m[1]) for m in re.findall(r"<(?:td|th)\b([^>]*)>([\s\S]*?)</(?:td|th)>",tr,flags=re.I)]
        if not cells: continue
        txt=[html.unescape(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',c)).strip()) for _,c in cells]
        cls=[(re.search(r"class\s*=\s*['\"]([^'\"]*)",a) or [None,''])[1] for a,_ in cells]
        if 'rank' not in cls or not txt[cls.index('rank')].isdigit(): continue
        i=cls.index('rank'); nxt=txt[i+1] if i+1<len(txt) else ''
        overall=int(nxt.strip('()')) if re.fullmatch(r'\(\d+\)',nxt) else None
        nm=txt[cls.index('name')] if 'name' in cls else ''
        pid=re.search(r'VisSpiller/#(\d+)',tr)
        out.append(dict(local=int(txt[i]),overall=overall,member=txt[cls.index('playerid')] if 'playerid' in cls else None,name=nm,klass=txt[cls.index('clas')] if 'clas' in cls else '',points=None,player_id=pid.group(1) if pid else None))
    return out
def pages(data):
    idx=[int(x) for x in re.findall(r'SelectRankingListPage\((\d+)\)',data.get('Html',''))]
    return (max(idx)+1) if idx else 1
