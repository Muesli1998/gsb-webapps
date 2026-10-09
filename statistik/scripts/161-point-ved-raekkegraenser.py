#!/usr/bin/env python3
"""Opgave 161: hent manglende 287-randsider og sammenhold med point (read-only)."""
import argparse, csv, hashlib, importlib.util, json, math, pathlib, re, sqlite3, time

ROOT=pathlib.Path(__file__).resolve().parents[2]
RES=ROOT/'statistik'/'results'; RAW159=RES/'159-raa-svar'; RAW=RES/'161-raa-svar'
DB=ROOT/'statistik'/'data'/'rangliste-point.db'; LOG=RAW/'forespoergsler.json'
spec=importlib.util.spec_from_file_location('s159',ROOT/'statistik'/'scripts'/'159-hent287.py')
s159=importlib.util.module_from_spec(spec); spec.loader.exec_module(s159)
BOUNDS={'M':[40,200,400,700,2000,2500,3500,4000,5000,6000], 'K':[40,150,300,500,1000,1200,1700,1900,2400,2600]}
DISC={288:'single',289:'double',292:'mix'}
CLASSES={'M':[('E',1,40),('E-M',41,200),('M',201,400),('M-A',401,700),('A',701,2000),('A-B',2001,2500),('B',2501,3500),('B-C',3501,4000),('C',4001,5000),('C-D',5001,6000),('D',6001,None)],'K':[('E',1,40),('E-M',41,150),('M',151,300),('M-A',301,500),('A',501,1000),('A-B',1001,1200),('B',1201,1700),('B-C',1701,1900),('C',1901,2400),('C-D',2401,2600),('D',2601,None)]}
DBS=['gsb-statistik-normalized.db','liga-landskab.db','rangliste-historik.db','national-spillere.db','rangliste-point.db']
EXPECTED={'gsb-statistik-normalized.db':'49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E','liga-landskab.db':'9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C','rangliste-historik.db':'6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F','national-spillere.db':'1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E','rangliste-point.db':'DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9'}

def digest(b): return hashlib.sha256(b).hexdigest()
def filehash(p):
 h=hashlib.sha256()
 with open(p,'rb') as f:
  for chunk in iter(lambda:f.read(1024*1024),b''): h.update(chunk)
 return h.hexdigest()
def plan():
 req={g:set() for g in BOUNDS}; old={g:set() for g in BOUNDS}; new={g:set() for g in BOUNDS}
 for g,ns in BOUNDS.items():
  for n in ns:
   req[g].update((r-1)//100 for r in range(max(1,n-30),n+31))
 for folder,target in ((RAW159,old),(RAW,new)):
  if folder.exists():
   for p in folder.glob('*.txt'):
    m=re.search(r'ufiltreret-287-([KM])-p(\d+)\.txt$',p.name)
    if m: target[m[1]].add(int(m[2]))
 return req,old,new,{g:sorted(req[g]-old[g]-new[g]) for g in req}
def save_log(calls,check=None,stopped=None):
 RAW.mkdir(parents=True,exist_ok=True)
 LOG.write_text(json.dumps({'task':161,'calls':calls,'filter_hash_check':check,'stopped_reason':stopped},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def fetch():
 req,old,new,missing=plan(); todo=[(g,p) for g in ('K','M') for p in missing[g]]
 print(json.dumps({'required':{g:sorted(req[g]) for g in req},'reused_159':{g:sorted(old[g]&req[g]) for g in old},'already_fetched_161':{g:sorted(new[g]&req[g]) for g in new},'missing':todo},ensure_ascii=False))
 if not todo: return
 RAW.mkdir(parents=True,exist_ok=True); s159.OUT=str(RAW); s159.log=[]; calls=[]
 try: s159.get_ctx()
 except Exception as e: save_log(calls,stopped=f'GET context: {type(e).__name__}: {e}'); raise
 calls.append(dict(s159.log[-1],label='GET context')); used=1; errors=0; check=None; stop=None
 first=('M',1)
 if first not in todo: save_log(calls,stopped='M side 1 ikke manglende; kan ikke udføre filterhash-kontrol.'); return
 todo=[first]+[x for x in todo if x!=first]
 for g,pidx in todo:
  label=f'ufiltreret-287-{g}-p{pidx}'
  while True:
   if used>=35: stop='Kaldloft 35 nået'; break
   try:
    e,data,rows=s159.post(label,287,'',rankinglistagegroupid='15',seasonid='2026',gender=g,pageindex=str(pidx)); used+=1; calls.append(e); save_log(calls,check,stop)
    if e['status']==200 and data is not None:
     rawfile=RAW/e['file']; txt=rawfile.read_text(encoding='utf-8').lower()
     if any(x in txt for x in ('captcha','robot check','verify you are human','bot protection')):
      stop='Muligt botværn/CAPTCHA i svar; stoppet.'; save_log(calls,check,stop); return
     errors=0
     if (g,pidx)==first:
      kfile=RAW159/'01-ufiltreret-287-K-p1.txt'
      if not kfile.exists(): stop='Gemte K side 1 mangler; filterkontrol umulig.'; save_log(calls,stopped=stop); return
      hk=digest(kfile.read_bytes()); hm=digest(rawfile.read_bytes())
      check={'K baseline saved file':'statistik/results/159-raa-svar/01-ufiltreret-287-K-p1.txt','K_redacted_sha256':hk,'M new file':str(rawfile.relative_to(ROOT)),'M_redacted_sha256':hm,'equal':hk==hm,'K_rows':len(s159.parse_rows(json.loads(kfile.read_text(encoding='utf-8'))['d']['Html'])),'M_rows':len(rows)}
      save_log(calls,check,stop); print(json.dumps({'filter_hash_check':check},ensure_ascii=False))
      if hk==hm: stop='K/M svarhash ens; stoppet som krævet.'; save_log(calls,check,stop); return
     break
    errors+=1
    if e['status'] in (429,500,502,503,504): time.sleep(min(30,4*errors))
    if errors>=3: stop=f"Tre fejl i træk; HTTP {e['status']}"; save_log(calls,check,stop); return
    if e['status'] not in (429,500,502,503,504): break
   except Exception as ex:
    errors+=1; save_log(calls,check,f'{type(ex).__name__}: {ex}')
    if errors>=3: stop=f'Tre fejl i træk: {type(ex).__name__}: {ex}'; save_log(calls,check,stop); return
    time.sleep(min(30,4*errors)); break
  if stop: break
 save_log(calls,check,stop); print(json.dumps({'total_calls':len(calls),'stop':stop},ensure_ascii=False))

def rows_from_raw():
 out={}; sources=[]
 for folder in (RAW159,RAW):
  if not folder.exists(): continue
  for p in folder.glob('*.txt'):
   m=re.search(r'ufiltreret-287-([KM])-p(\d+)\.txt$',p.name)
   if not m: continue
   g,pi=m[1],int(m[2])
   try: data=json.loads(p.read_text(encoding='utf-8'))['d']; rr=s159.parse_rows(data['Html'])
   except Exception: continue
   sources.append({'file':str(p.relative_to(ROOT)),'gender':g,'page_index':pi,'rows':len(rr),'pages':s159.pages(data),'sha256':digest(p.read_bytes())})
   for index,r in enumerate(rr):
    r=dict(r); r['gender']=g; r['source_file']=str(p.relative_to(ROOT))
    out[(g,str(r.get('player_id') or f'{p.name}:{index}'))]=r
 return out,sources
def qs(vals,p):
 x=sorted(float(v) for v in vals if v is not None)
 if not x:return None
 i=(len(x)-1)*p; a=math.floor(i); b=math.ceil(i)
 return round(x[a]+(x[b]-x[a])*(i-a),2)
def stat(vals):
 x=[v for v in vals if v is not None];return {'n':len(x),'p25':qs(x,.25),'median':qs(x,.5),'p75':qs(x,.75)}
def add_points(rows):
 uri='file:'+DB.as_posix()+'?mode=ro'; con=sqlite3.connect(uri,uri=True);con.execute('PRAGMA query_only=ON')
 try:
  pm={(str(pid),lid,g):{'points':pts,'name':nm,'club':club,'class':cl,'rank':rk} for lid,g,vd,pid,pts,nm,club,cl,rk in con.execute("SELECT list_id,param,version_date,player_id,points,name,club,class,rank FROM ranking_points WHERE version_date='2026-10-07' AND list_id IN (288,289,292) AND param IN ('M','K')")}
 finally: con.close()
 for r in rows.values():
  g=r['gender']
  d={name:(pm.get((str(r.get('player_id')),lid,g)) or {}).get('points') for lid,name in ((288,'single'),(289,'double'),(292,'mix'))}
  vs=[v for v in d.values() if v is not None];r['discipline_points']=d;r['highest_discipline_points']=max(vs) if vs else None;r['point_match']=bool(vs)
 return rows
def calc_boundaries(rows):
 out=[]
 for g,ns in BOUNDS.items():
  for n in ns:
   lo=max(1,n-30); hi=n+30; window=[r for r in rows.values() if r['gender']==g and lo<=r['local']<=hi]
   a=[r for r in rows.values() if r['gender']==g and lo<=r['local']<=n];b=[r for r in rows.values() if r['gender']==g and n<r['local']<=n+30]
   def val(r,m):return r.get('highest_discipline_points') if m=='highest' else r.get('discipline_points',{}).get(m)
   sa={m:stat([val(r,m) for r in a]) for m in ('highest','single','double','mix')};sb={m:stat([val(r,m) for r in b]) for m in ('highest','single','double','mix')}
   med=sa['highest']['median'];bv=[r for r in b if val(r,'highest') is not None];over=sum(val(r,'highest')>med for r in bv) if med is not None else None
   at_n=sorted([r for r in rows.values() if r['gender']==g and r['local']==n],key=lambda r:r.get('player_id') or '')
   at_n1=sorted([r for r in rows.values() if r['gender']==g and r['local']==n+1],key=lambda r:r.get('player_id') or '')
   out.append({'gender':g,'boundary':n,'window_start':lo,'window_end':hi,'window_rows_found':len(window),'window_rank_span':hi-lo+1,'linked_rows':sum(r['point_match'] for r in window),'linked_share':round(sum(r['point_match'] for r in window)/len(window),4) if window else None,'higher_rank_side':sa,'lower_rank_side':sb,'lower_side_over_upper_median':over,'lower_side_with_points':len(bv),'lower_side_over_share':round(over/len(bv),4) if bv and over is not None else None,'rank_N_players':at_n,'rank_N_plus_1_players':at_n1,'window_players':window,'unmatched_profiles':[{'rank':r['local'],'profile_id':r.get('player_id'),'name':r.get('name')} for r in window if not r['point_match']]})
 return out
def calc_classes(rows):
 out=[]
 for g,defs in CLASSES.items():
  for name,start,end in defs:
   ranks=set(range(start,start+30)) if end is None else set(range(start,min(end,start+29)+1))|set(range(max(start,end-29),end+1))
   sample=[r for r in rows.values() if r['gender']==g and r['local'] in ranks]
   metrics={'highest':stat([r.get('highest_discipline_points') for r in sample])}
   for d in ('single','double','mix'):metrics[d]=stat([r.get('discipline_points',{}).get(d) for r in sample])
   out.append({'gender':g,'class':name,'rank_start':start,'rank_end':end,'sample_unique_players':len(sample),'linked':sum(r['point_match'] for r in sample),'metrics':metrics})
 return out
def youth_rows():
 out=[]
 for g in ('M','K'):
  def add(age,rows,interval):out.append({'age':age,'gender':g,'rows':rows,'interval':interval,'source':'statistik/results/159-tilmeldingsniveau.md; statistik/results/160-ungdom-placeringsraekker.md'})
  add('U9','ukendt præcist; ingen placeringsrækker ifølge 159/160','ukendt i gemte rapporter')
  add('U11','ukendt præcist; ingen placeringsrækker ifølge 159/160','ukendt i gemte rapporter')
  if g=='M':
   add('U13','M; M-A; A','M placering 1–24; M-A 25–48; A fra 49 med >1525 point')
   add('U15','E; E-M; M; A; B; C; D','E placering 1–24 (top-8-undtagelse pr. disciplin); E-M 25–36; M fra 37 hvis >1850; A >1601–1850; B >1375–1600; C >1200–1375; D ≤1200')
   add('U17','E; E-M; M; lavere rækker ukendt','E placering 1–24 (top-8-undtagelse pr. disciplin); E-M 25–36; M fra 37 hvis >2150; lavere punktintervaller ukendt')
  else:
   add('U13','M; M-A; A','M placering 1–24; M-A 25–48; A fra 49 med >1350 point')
   add('U15','E; E-M; M; A; B; C; D','E placering 1–24 (top-8-undtagelse pr. disciplin); E-M 25–36; M fra 37 hvis >1500; A >1350–1500; B >1225–1350; C >1125–1225; D ≤1125')
   add('U17','E; E-M; M; lavere rækker ukendt','E placering 1–24 (top-8-undtagelse pr. disciplin); E-M 25–36; M fra 37 hvis >1700; lavere punktintervaller ukendt')
  add('U19','ukendt præcist; ingen placeringsrækker ifølge 159/160','ukendt i gemte rapporter')
 return out
def analyze():
 rows,sources=rows_from_raw();add_points(rows);req,old,new,missing=plan();bounds=calc_boundaries(rows);classes=calc_classes(rows);youth=youth_rows()
 hashes={n:filehash(ROOT/'statistik'/'data'/n) for n in DBS}
 reqlog=json.loads(LOG.read_text(encoding='utf-8')) if LOG.exists() else {'calls':[],'stopped_reason':'Ingen hentning/log'}
 version='ukendt'; latest_dated='ukendt'
 for p in RAW.glob('*.txt'):
  try:
   vs=json.loads(p.read_text(encoding='utf-8'))['d'].get('Versions',[])
   selected=next((v.get('Text') for v in vs if v.get('Selected')),None)
   dated=next((v.get('Text') for v in vs if v.get('Value')),None)
   if selected: version=selected; latest_dated=dated or 'ukendt'; break
  except Exception: pass
 samples=[]
 for g,rk in [('M',40),('K',40),('M',200)]:
  r=next((r for r in rows.values() if r['gender']==g and r['local']==rk),None)
  if r: samples.append({'gender':g,'rank':rk,'name':r.get('name'),'class':r.get('klass'),'profile_id':r.get('player_id'),'highest_discipline_points':r.get('highest_discipline_points'),'discipline_points':r.get('discipline_points')})
 coverage={}
 for g in ('M','K'):
  ranks={r for b in bounds if b['gender']==g for r in range(b['window_start'],b['window_end']+1)}
  ps=[r for r in rows.values() if r['gender']==g and r['local'] in ranks]
  coverage[g]={'unique_profiles':len(ps),'linked_profiles':sum(r['point_match'] for r in ps),'share':round(sum(r['point_match'] for r in ps)/len(ps),4) if ps else None}
  obj={'task':161,'api_selected_version':version,'api_latest_dated_option':latest_dated,'point_snapshot':'2026-10-07','unique_profiles_analyzed':len(rows),'linkage_by_gender_union':coverage,'page_plan':{'required_0_based':{g:sorted(req[g]) for g in req},'reused_159':{g:sorted(old[g]&req[g]) for g in old},'fetched_161':{g:sorted(new[g]&req[g]) for g in new},'still_missing':missing},'sources':sources,'request_log':reqlog,'boundaries':bounds,'class_point_ranges':classes,'sample_players':samples,'youth_lookup':youth,'point_join':{'database':'rangliste-point.db','table':'ranking_points','join':'287 profile ID = ranking_points.player_id, exact string','lists':{'288':'single','289':'double','292':'mix'},'gender_param':'same K/M','version_date':'2026-10-07','read_only':True},'database_sha256_after':hashes,'database_sha256_before_expected':EXPECTED}
 (RES/'161-point-ved-raekkegraenser.json').write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 with (RES/'161-opslagstabel.csv').open('w',newline='',encoding='utf-8-sig') as f:
  w=csv.writer(f);w.writerow(['raekke','koen','placeringsinterval','hoejeste_point_p25-p75','single_p25-p75','double_p25-p75','mix_p25-p75','antal_randspillere','kilde'])
  for c in classes:
   def fmt(k):
    x=c['metrics'][k];return f"{x['p25']}–{x['p75']} (n={x['n']})" if x['n'] else 'ukendt'
   w.writerow([c['class'],c['gender'],f"{c['rank_start']}–{c['rank_end'] or '∞'}",fmt('highest'),fmt('single'),fmt('double'),fmt('mix'),c['sample_unique_players'],'287 + ranking_points 2026-10-07'])
  w.writerow([]);w.writerow(['alder','koen','raekker','interval','kilde'])
  for y in youth:w.writerow([y['age'],y['gender'],y['rows'],y['interval'],y['source']])
 def trip(x):return f"{x['p25']}/{x['median']}/{x['p75']} (n={x['n']})"
 md=['# Opgave 161 — point ved rækkegrænser','',f"Badmintonplayer-kald: {len(reqlog.get('calls',[]))}; badminton.dk: 0. Alle råsvar uden kontekstnøgle i `statistik/results/161-raa-svar/`.",'','## 1. Sideplan og genbrug','','Vindue pr. grænse er N−30…N og N+1…N+30. Sideindeks er 0-baserede. 159-sider blev genbrugt; kun manglende sider hentet.','', '| Køn | Nødvendige sider | Genbrugt 159 | Nye 161-sider |','|---|---|---|---|']
 for g in ('M','K'):
  new=sorted({int(m[1]) for p in RAW.glob('*.txt') if (m:=re.search(rf'ufiltreret-287-{g}-p(\d+)\.txt$',p.name))}) if RAW.exists() else []
  md.append(f"| {g} | {','.join(map(str,sorted(req[g])))} | {','.join(map(str,sorted(old[g]&req[g])))} | {','.join(map(str,new)) or 'ingen'} |")
 chk=reqlog.get('filter_hash_check');md+=['',('K/M-kontrol: K gemt side 1 SHA-redacted `'+chk['K_redacted_sha256']+'`; M ny side 1 `'+chk['M_redacted_sha256']+'`; ens='+str(chk['equal'])+'.' if chk else 'K/M-hashkontrol ikke udført.'),'','## 2–3. Pointkobling og grænser','','Join: præcis profil-ID-streng fra 287 mod `ranking_points.player_id`; punkter fra 2026-10-07, 288=single, 289=double, 292=mix, samme K/M. Percentiler er lineær interpolation (type 7).','', '| Køn | N/N+1 | Vindue fundet/forventet | Koblet | N-30…N højeste p25/median/p75 | N+1…N+30 højeste p25/median/p75 | N og N+1 højeste point | Lavere side > øvre median |','|---|---:|---:|---:|---|---|---|---:|']
 for b in bounds:
  h=b['higher_rank_side']['highest'];l=b['lower_rank_side']['highest'];r0=b['rank_N_players'];r1=b['rank_N_plus_1_players'];hp=lambda rs:', '.join(str(r.get('highest_discipline_points')) for r in rs) if rs else 'ingen eksakt rank'
  md.append(f"| {b['gender']} | {b['boundary']}/{b['boundary']+1} | {b['window_rows_found']} spillere (rankspænd {b['window_rank_span']}) | {b['linked_rows']}/{b['window_rows_found']} ({b['linked_share']:.1%}) | {trip(h)} | {trip(l)} | {hp(r0)} / {hp(r1)} | {b['lower_side_over_upper_median']}/{b['lower_side_with_points']} ({(b['lower_side_over_share'] or 0):.1%}) |")
 md+=['','Disciplinernes p25/median/p75 og spillere med præcis N og N+1 ligger for hver grænse i JSON (`boundaries`). Rangplaceringer kan være delte; derfor kan flere spillere have samme N, og rangtal kan springes over.','',f"Kobling på unionen af vinduer: M {coverage['M']['linked_profiles']}/{coverage['M']['unique_profiles']} ({coverage['M']['share']:.1%}); K {coverage['K']['linked_profiles']}/{coverage['K']['unique_profiles']} ({coverage['K']['share']:.1%})."]
 low=[b for b in bounds if b['linked_share'] is not None and b['linked_share']<.70]
 md.append('Vinduer med kobling under 70%: '+str(len(low))+'.')
 for b in low:
  missing_names=', '.join(f"{r['rank']} {r['name']} (ID {r['profile_id'] or 'ukendt'})" for r in b['unmatched_profiles'])
  md.append(f"- {b['gender']} {b['boundary']}/{b['boundary']+1}: {b['linked_rows']}/{b['window_rows_found']} koblet; mangler: {missing_names or 'ingen'}.")
 md+=['', '## 4. Empiriske punktområder pr. række og køn','','P25–p75 er fra op til 30 spillere inden for rækkens interval ved nærmeste rand(e); det er en empirisk tilnærmelse, ikke en pointformel.','', '| Køn | Række | Placering | Højeste point p25–p75 | Single | Double | Mix | Randspillere |','|---|---|---:|---|---|---|---|---:|']
 for c in classes:
  def cf(k):
   x=c['metrics'][k];return f"{x['p25']}–{x['p75']} (n={x['n']})" if x['n'] else 'ukendt'
  md.append(f"| {c['gender']} | {c['class']} | {c['rank_start']}–{c['rank_end'] or '∞'} | {cf('highest')} | {cf('single')} | {cf('double')} | {cf('mix')} | {c['sample_unique_players']} |")
 md+=['','Tre opslagseksempler pr. kortets stikprøvekrav:','','| Køn | Placering | Spiller | Række | Højeste disciplinpoint | Single | Double | Mix |','|---|---:|---|---|---:|---:|---:|---:|']
 for s in samples:
  d=s['discipline_points'];md.append(f"| {s['gender']} | {s['rank']} | {s['name']} | {s['class']} | {s['highest_discipline_points']} | {d['single']} | {d['double']} | {d['mix']} |")
 md+=['','## 5. Ungdomsopslagstabel (uden nye kald)','','| Alder | Køn | Rækker | Intervaller fra gemte rapporter |','|---|---|---|---|']
 for y in youth:md.append(f"| {y['age']} | {y['gender']} | {y['rows']} | {y['interval']} |")
 md+=['','Præcise oplysninger, der ikke fremgår af 159/160, står som ukendt. Ingen reglement blev genhentet.','', '## 6. Double og mix','','Reglementnoterne siger, at doublespillerækken beregnes ud fra parrets samlede point divideret med to. Hvis en pointtærskel T er kendt, svarer det til parsum 2T; for voksne er T ukendt, fordi rækken afgøres af placering. De tre disciplinranglistepoint kan ikke sidestilles med det vægtede tilmeldingsniveau uden ukendte koefficienter.','', '## 7. Anbefaling','','Tabellen er kun en grov empirisk pejling: fordelinger på nabogrænser kan overlappe, og den kan ikke give et officielt “skal have X point”. Skarpere svar kræver officielle tilmeldingsniveau-koefficienter og historiske snapshots; double/mix kræver parrets point på den dokumenterede tilmeldingsniveau-skala.','', '## Forespørgselslog','','Fuld log med method, filterfelter, HTTP-status, bytes og rå SHA-256 i JSON `request_log.calls`; alle gemte råsvar har redigeret context key.','', '## Databasekontrol','','Alle fem hashes før arbejdet er kortets forventede værdier; efterhashes står nedenfor og i JSON. SQLite blev åbnet `mode=ro` med `PRAGMA query_only=ON`.']
 for n in DBS:md.append(f"- `{n}`: før `{EXPECTED[n]}`; efter `{hashes[n]}`; {'uændret' if hashes[n]==EXPECTED[n] else 'AFVIGER'}.")
 md+=['','### Forespørgsler: felter, status, bytes og svarhash','','| Nr. | Metode | Felter / filter | Status | Bytes | SHA-256 |','|---:|---|---|---:|---:|---|']
 for i,c in enumerate(reqlog.get('calls',[]),1):
  fields=json.dumps(c.get('changes',{}),ensure_ascii=False,separators=(',',':'))
  if c.get('method')=='POST': fields=f"liste={c.get('list')}, param={c.get('param')!r}, {fields}"
  md.append(f"| {i} | {c.get('method')} | {fields or c.get('label','GET kontekst')} | {c.get('status')} | {c.get('bytes')} | `{c.get('sha256')}` |")
 md=[line.replace('Vindue fundet/forventet','Vindue (spillere; rankspænd)') for line in md]
 md+=['','## Ukendt / begrænsninger','',f"API-valg: {obj['api_selected_version']}; nyeste daterede mulighed: {obj['api_latest_dated_option']}. 159-rapporten angiver 09-10-2026; pointdatabasen er snapshot 2026-10-07. Manglende punktmatch fremgår af JSON; ingen værdi er gættet."]
 (RES/'161-point-ved-raekkegraenser.md').write_text('\n'.join(md)+'\n',encoding='utf-8')
 print(f"Analyserede {len(rows)} unikke kønsplaceringer; {len(bounds)} grænser; {len(classes)} rækker pr. køn.")

if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('mode',choices=['fetch','analyze']);a=ap.parse_args();fetch() if a.mode=='fetch' else analyze()
