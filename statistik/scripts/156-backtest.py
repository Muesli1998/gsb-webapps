import sqlite3, math, csv, json, collections
import os
D=os.environ.get('GSB_DATA','statistik/data/').rstrip('/')+'/'
n=sqlite3.connect('file:'+D+'gsb-statistik-normalized.db?mode=ro',uri=True)
n.execute("attach 'file:"+D+"rangliste-point.db?mode=ro' as r")
LIST={'S':288,'DS':288,'HS':288,'D':289,'DD':289,'HD':289,'MD':292}
# needs: (match, name_lower, list) -> found points (list of)
needs=collections.defaultdict(list)
for mid,name,lid,st,pts,vd,side in n.execute("select external_match_id,lower(player_name),list_id,status,points,version_date,team_side from r.ranking_needs"):
    if lid is None: continue
    needs[(mid,name,lid)].append((st,pts,vd))
rows=n.execute("""select t.external_match_id,t.round_date,t.season_id,c.age_group_id,im.individual_match_id,im.discipline_raw,im.winner_side,im.status,im.home_score_raw,im.away_score_raw
 from individual_matches im join team_matches t using(team_match_id) left join competitions c on c.competition_id=t.competition_id
 where t.season_id=2025 and t.external_match_id in (select external_match_id from r.ranking_needs)""").fetchall()
cnt=collections.Counter(); data=[]
for mid,date,sea,ag,imid,disc,win,st,hs,as_ in rows:
    cnt['individuelle kampe i behovsregistrets kampe']+=1
    if win not in('home','away'): cnt['udeladt: ingen vinder']+=1; continue
    pl=n.execute("select p.side,pl.name_normalized,pl.name_raw from individual_match_players p join players pl using(player_id) where p.individual_match_id=?",(imid,)).fetchall()
    if any('ikke fremm' in (x[2] or '').lower() for x in pl): cnt['udeladt: ikke fremmødt/walkover']+=1; continue
    if hs in(None,'','0-0') and as_ in(None,'','0-0'): cnt['udeladt: ingen sætresultat']+=1; continue
    lid=LIST.get(disc)
    side={'home':[], 'away':[]}; ok=True; why=None
    for s,nm,raw in pl:
        if s not in side: ok=False; why='ukendt side'; break
        c=needs.get((mid,nm,lid),[])
        f=[x for x in c if x[0]=='found']
        if len(f)>=1: side[s].append(f[0][1])
        elif not c: ok=False; why='spiller ikke i behovsregister'; break
        else:
            sts={x[0] for x in c}
            ok=False; why='ingen point: '+'/'.join(sorted(sts)); break
    nplay=len(pl)
    if ok and (len(side['home'])==0 or len(side['away'])==0 or len(side['home'])!=len(side['away'])): ok=False; why='ufuldstændig opstilling'
    if not ok: cnt['udeladt: '+why]+=1; continue
    h,a=side['home'],side['away']
    data.append(dict(match=mid,date=date,age=ag,disc=disc,n=len(h),home=sum(h),away=sum(a),hmean=sum(h)/len(h),amean=sum(a)/len(a),hmin=min(h),amin=min(a),win=1 if win=='home' else 0))
cnt['med point på alle spillere']=len(data)
print(json.dumps(cnt,ensure_ascii=False,indent=1))
AG={2:'U09',3:'U11',4:'U13',5:'U15',6:'U17',18:'U17/U19',None:'ukendt'}
def wilson(k,n):
    if n==0: return (0,0)
    z=1.96;p=k/n;d=1+z*z/n;c=p+z*z/(2*n);m=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))
    return ((c-m)/d,(c+m)/d)
def diff(r,mode):
    return {'sum':r['home']-r['away'],'mean':r['hmean']-r['amean'],'min':r['hmin']-r['amin']}[mode]
def hit(rs,mode='mean'):
    k=t=ties=0
    for r in rs:
        d=diff(r,mode)
        if d==0: ties+=1; continue
        t+=1; k+= (d>0)==(r['win']==1)
    return k,t,ties
out=[]
def line(lbl,rs):
    k,t,ti=hit(rs); lo,hi=wilson(k,t)
    out.append(f"| {lbl} | {len(rs)} | {t} | {ti} | {k/t*100 if t else 0:.1f} % | {lo*100:.0f}–{hi*100:.0f} % |")
out.append("| Gruppe | Kampe | uden uafgjort | uafgjort point | Højeste point vandt | 95 % interval |\n|---|---:|---:|---:|---:|---:|")
line('Alle',data)
for dsc,nm in [(1,'Single'),(2,'Double')]:
    line(nm,[r for r in data if r['n']==dsc])
for d in ['S','DS','HS','D','DD','HD','MD']:
    rs=[r for r in data if r['disc']==d]
    if rs: line('Disciplin '+d,rs)
for a in [2,3,4,5,6,18,None]:
    rs=[r for r in data if r['age']==a]
    if rs: line('Aldersgruppe '+AG[a],rs)
print('\n'.join(out))
# model
def brier(rs,s,mode,home=0.0):
    b=ll=0
    for r in rs:
        p=1/(1+10**(-(diff(r,mode)+home)/s)); y=r['win']
        b+=(p-y)**2; ll+=-(y*math.log(max(p,1e-9))+(1-y)*math.log(max(1-p,1e-9)))
    return b/len(rs),ll/len(rs)
def fit(rs,mode):
    best=None
    for s in range(20,1500,10):
        b,l=brier(rs,s,mode)
        if best is None or l<best[2]: best=(s,b,l)
    return best
print('\nMODEL')
for lbl,rs in [('Alle',data),('Single',[r for r in data if r['n']==1]),('Double',[r for r in data if r['n']==2])]:
    for mode in (['mean'] if lbl=='Single' else ['mean','sum','min']):
        s,b,l=fit(rs,mode); print(lbl,mode,'s=',s,'Brier=%.4f'%b,'logloss=%.4f'%l,'N=',len(rs),'base Brier=0.25 ll=0.6931')
for d in ['S','D','DD','HD','MD','DS','HS']:
    rs=[r for r in data if r['disc']==d]
    if len(rs)>=30:
        s,b,l=fit(rs,'mean'); print('disc',d,'s=',s,'Brier=%.4f'%b,'ll=%.4f'%l,'N=',len(rs))
# calibration (mean diff, global fit for singles & doubles combined)
s,b,l=fit(data,'mean')
bk=[(0,25),(25,50),(50,100),(100,200),(200,10000)]
print('\nKALIBRERING s=',s)
for lo,hi in bk:
    rs=[r for r in data if lo<=abs(diff(r,'mean'))<hi]
    if not rs: continue
    k=0;pf=0
    for r in rs:
        d=diff(r,'mean')
        # orient to stronger side
        stronger_home = d>=0
        pw=1/(1+10**(-abs(d)/s)); pf+=pw
        k+= (r['win']==1)==stronger_home
    print(f"{lo}-{hi}: N={len(rs)} forudsagt={pf/len(rs)*100:.1f}% faktisk={k/len(rs)*100:.1f}%")
# thresholds
print('\nTRÆSKEL (ens)')
for thr in [0,25,50,75,100,150,200,300]:
    rs=[r for r in data if abs(diff(r,'mean'))>=thr]
    k=sum(((diff(r,'mean')>0)==(r['win']==1)) for r in rs if diff(r,'mean')!=0)
    t=sum(1 for r in rs if diff(r,'mean')!=0)
    print(thr,t,f"{k/t*100:.1f}%" if t else '-')
# halves
ds=sorted(set(r['date'] for r in data if r['date']))
mid=ds[len(ds)//2]; print('\nhalvdel median dato',mid)
for lbl,rs in [('1. halvdel',[r for r in data if r['date'] and r['date']<=mid]),('2. halvdel',[r for r in data if r['date'] and r['date']>mid])]:
    k,t,ti=hit(rs); s,b,l=fit(rs,'mean'); print(lbl,len(rs),'hit %.1f%%'%(k/t*100),'s',s,'Brier %.4f'%b)
# upsets
ups=[r for r in data if diff(r,'mean')!=0 and ((diff(r,'mean')>0)!=(r['win']==1))]
ups.sort(key=lambda r:-abs(diff(r,'mean')))
print('\nOVERRASKELSER'); [print(r['match'],r['date'],r['disc'],round(r['hmean']),round(r['amean']),'vinder','hjemme' if r['win'] else 'ude') for r in ups[:10]]
w=csv.DictWriter(open('156-datasaet.csv','w',newline=''),fieldnames=list(data[0].keys())); w.writeheader(); w.writerows(data)
