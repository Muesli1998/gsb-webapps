import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = path.resolve(import.meta.dirname, '..');
const dbPath = path.join(root, 'data', 'gsb-statistik-normalized.db');
const out = path.join(root, 'results');
const db = new DatabaseSync(dbPath, { readOnly: true });
db.exec('PRAGMA query_only=ON');
try {
  const rows = db.prepare(`
    SELECT im.individual_match_id, im.team_match_id, im.discipline_raw, im.category_raw,
      im.home_score_raw, im.away_score_raw, im.winner_side, im.status AS individual_status,
      im.result_marker_raw, tm.external_match_id, tm.season_id, tm.round_date, tm.game_time,
      tm.round_number, tm.home_name_raw, tm.away_name_raw, tm.result_raw,
      tm.walkover_text_raw, tm.walkover_winner_raw, tm.remark_raw,
      mp.player_id, mp.side AS participant_side, p.name_raw AS player_name,
      CASE WHEN tm.gsb_team_id IS NOT NULL AND t.club_id=1093 THEN 1 ELSE 0 END AS is_gsb_team,
      t.name_raw AS gsb_team_name
    FROM individual_matches im
    JOIN team_matches tm ON tm.team_match_id=im.team_match_id
    LEFT JOIN teams t ON t.team_id=tm.gsb_team_id AND t.season_id=tm.season_id
    LEFT JOIN individual_match_players mp ON mp.individual_match_id=im.individual_match_id
    LEFT JOIN players p ON p.player_id=mp.player_id
    ORDER BY tm.season_id, tm.round_date, tm.team_match_id, im.individual_match_id, mp.player_id
  `).all();
  const matches = new Map();
  for (const r of rows) {
    let m = matches.get(r.individual_match_id);
    if (!m) {
      m = { id:r.individual_match_id, teamMatchId:r.team_match_id, externalMatchId:r.external_match_id,
        seasonId:r.season_id, date:r.round_date || r.game_time || '', round:r.round_number,
        discipline:r.discipline_raw, category:r.category_raw, homeName:r.home_name_raw, awayName:r.away_name_raw,
        teamResult:r.result_raw, walkoverText:r.walkover_text_raw, walkoverWinner:r.walkover_winner_raw,
        remark:r.remark_raw, marker:r.result_marker_raw, status:r.individual_status,
        homeScore:r.home_score_raw, awayScore:r.away_score_raw, winner:r.winner_side,
        isGsbTeam:Boolean(r.is_gsb_team), gsbTeamName:r.gsb_team_name, participants:[] };
      matches.set(m.id,m);
    }
    if (r.player_id != null) m.participants.push({ id:r.player_id, name:r.player_name, side:r.participant_side });
  }
  const all = [...matches.values()];
  const unknown = all.filter(m => !['home','away'].includes(m.winner));
  const known = all.filter(m => ['home','away'].includes(m.winner));
  const byTeam = new Map();
  for (const m of all) { const a=byTeam.get(m.teamMatchId) ?? []; a.push(m); byTeam.set(m.teamMatchId,a); }
  const resultPair = s => { const x=String(s??'').match(/^\s*(\d+)\s*-\s*(\d+)\s*$/); return x ? {home:+x[1],away:+x[2]} : null; };
  const explicitNotAttended = m => /ikke\s*fremmødt/iu.test(m.walkoverText??'');
  const playedSets = m => [...new Set([m.homeScore,m.awayScore].flatMap(s => String(s??'').match(/\d+\s*-\s*\d+/gu) ?? []))].length;
  const summaries = new Map();
  for (const [teamId, games] of byTeam) {
    const first=games[0], res=resultPair(first.teamResult);
    const nUnknown=games.filter(g=>!['home','away'].includes(g.winner)).length;
    const hKnown=games.filter(g=>g.winner==='home').length, aKnown=games.filter(g=>g.winner==='away').length;
    const fullKnown=nUnknown===0;
    const agrees=!!res && fullKnown && res.home===hKnown && res.away===aKnown;
    const missing={home:0,away:0,both:0,neither:0};
    for (const g of games) {
      const sides=new Set(g.participants.map(p=>p.side).filter(s=>s==='home'||s==='away'));
      if (!sides.has('home') && !sides.has('away')) missing.neither++;
      else if (!sides.has('home')) missing.home++;
      else if (!sides.has('away')) missing.away++;
    }
    summaries.set(teamId,{teamId, externalMatchId:first.externalMatchId,seasonId:first.seasonId,date:first.date,
      homeName:first.homeName,awayName:first.awayName,result:first.teamResult,parsedResult:res,
      games,unknownCount:nUnknown,knownHome:hKnown,knownAway:aKnown,fullKnown,agrees,
      missingPlayers:missing,gMarkerCount:games.filter(g=>g.marker==='G').length});
  }
  // Derive only outcomes forced by the recorded team score. Then check explicit no-show evidence.
  for (const m of unknown) {
    const team=summaries.get(m.teamMatchId), k=team.unknownCount, res=team.parsedResult;
    const residualHome=res ? res.home-team.knownHome : null;
    const residualAway=res ? res.away-team.knownAway : null;
    let teamWinner=null, teamStatus='uafklaret';
    if (res && residualHome===k && residualAway===0) { teamWinner='home'; teamStatus='udledt'; }
    else if (res && residualHome===0 && residualAway===k) { teamWinner='away'; teamStatus='udledt'; }
    const participants=new Set(m.participants.map(p=>p.side).filter(s=>s==='home'||s==='away'));
    let absentSide=participants.has('home')!==participants.has('away') ? (!participants.has('home')?'home':'away') : null;
    const hasNotAttended=explicitNotAttended(m);
    let outcome={winner:null,method:'ingen entydig metode',certainty:'uafklaret',classification:'uafklaret',explanation:''};
    if (hasNotAttended && absentSide) {
      const winner=absentSide==='home'?'away':'home';
      if (teamWinner && teamWinner!==winner) outcome.explanation=`Ikke fremmødt peger på ${winner} som vinder, men holdresultatets entydige rest peger på ${teamWinner}; modstridende evidens.`;
      else if (teamWinner===winner) outcome={winner,method:'ikke fremmødt + holdresultat',certainty:'entydig',classification:'udledt',explanation:`${absentSide}-siden mangler registrerede spillere; eksplicit Ikke fremmødt-tekst siger at den side taber, og holdresultatet bekræfter udfaldet.`};
      else outcome={winner,method:'ikke fremmødt-tekst + manglende deltagere',certainty:'tekstlig, holdresultat ikke bekræftende',classification:'udledt',explanation:`${absentSide}-siden har ingen registrerede deltagere; eksplicit Ikke fremmødt-tekst siger at den side taber. Holdresultatet bekræfter ikke entydigt.`};
    } else if (teamWinner) {
      outcome={winner:teamWinner,method:'holdresultat',certainty:'entydig',classification:'udledt',explanation:`${residualHome} hjemme- og ${residualAway} udesejre mangler blandt ${k} ukendte i holdkampen; alle ukendte må være ${teamWinner}.`};
      if (m.marker==='G' && playedSets(m)>0) { outcome.method='holdresultat (G, delvist scoret)'; outcome.explanation+=` G-markør og ${playedSets(m)} scorede sæt er forenelige med afgørelse efter kampstart; hvem der trak sig kan ikke ses i rækkedata.`; }
    } else {
      const reason=!res?'holdresultat mangler et parsebart hjemme-ude-resultat.':`Holdresultatet efter kendte sejre efterlader ${residualHome} hjemme- og ${residualAway} udesejre blandt ${k} ukendte; udfaldet er ikke entydigt.`;
      outcome={winner:null,method:hasNotAttended?'ikke fremmødt, deltagerside ikke entydig':'holdresultat ikke entydigt',certainty:'uafklaret',classification:'uafklaret',explanation:reason+(m.marker==='G'&&playedSets(m)>0?` G-markør med ${playedSets(m)} scorede sæt identificerer ikke i sig selv den tilbagetrukne side.`:'')};
    }
    m.inTeamUnknownCount=k; m.missingParticipantSide=absentSide; m.missingPlayerOnCard=absentSide ? (absentSide==='home'?m.homeName:m.awayName) : '';
    m.playedSets=playedSets(m); m.explicitNotAttended=hasNotAttended;
    m.residualHomeWins=residualHome; m.residualAwayWins=residualAway;
    Object.assign(m,outcome);
    if (hasNotAttended && absentSide) {
      m.noShowValidation=teamWinner ? (teamWinner===(absentSide==='home'?'away':'home')?'bekræftet':'afvist') : 'uafklaret';
    } else m.noShowValidation='ikke relevant';
  }
  // Known-result validation: only team matches where every individual row has a home/away winner.
  const comparable=[...summaries.values()].filter(t=>t.fullKnown && t.parsedResult);
  const discrepancies=comparable.filter(t=>!t.agrees);
  const markerCounts={};
  for (const m of all) { const key=m.marker==null||String(m.marker).trim()===''?'(tom)':String(m.marker); markerCounts[key]=(markerCounts[key]??0)+1; }
  for (const letter of 'ABCDEFGHIJKLMNOPQRSTUV') markerCounts[letter]??=0;
  const discMarkerMatches=discrepancies.reduce((n,t)=>n+t.games.filter(g=>g.marker==='G').length,0);
  const exactMarkerMatches=comparable.filter(t=>t.agrees).reduce((n,t)=>n+t.games.filter(g=>g.marker==='G').length,0);
  const derived=unknown.filter(m=>m.classification==='udledt');
  const derived2025=derived.filter(m=>m.seasonId===2025);
  const noShowRows=unknown.filter(m=>m.explicitNotAttended);
  const noShowTeamMatches=[...summaries.values()].filter(t=>/ikke\s*fremmødt/iu.test(t.games[0].walkoverText??''));
  const noShowTeamValidation=noShowTeamMatches.map(t=>{
    const m=t.games[0], recorded=m.walkoverWinner;
    const winnerSide=recorded===m.homeName?'home':recorded===m.awayName?'away':null;
    const scoreWinner=t.parsedResult?(t.parsedResult.home>t.parsedResult.away?'home':t.parsedResult.away>t.parsedResult.home?'away':null):null;
    return {teamMatchId:t.teamId,externalMatchId:t.externalMatchId,winnerRaw:recorded,winnerSide,result:t.result,scoreWinner,validation:winnerSide&&scoreWinner?(winnerSide===scoreWinner?'bekræftet':'afvist'):'uafklaret'};
  });
  const noShowConfirmed=noShowTeamValidation.filter(x=>x.validation==='bekræftet').length;
  const noShowRejected=noShowTeamValidation.filter(x=>x.validation==='afvist').length;
  const noShowUnresolved=noShowTeamValidation.length-noShowConfirmed-noShowRejected;

  // Recreate all five 177 ranking methods for N=5/10/20, using the same GSB scope and no-show exclusion.
  const seasonGames=all.filter(m=>m.seasonId===2025 && m.isGsbTeam && m.participants.length);
  const eventRows=includeDerived=>{
    const events=[];
    for(const m of seasonGames){
      const winner=['home','away'].includes(m.winner)?m.winner:(includeDerived&&m.classification==='udledt'?m.winner:null);
      if(!winner || explicitNotAttended(m)) continue;
      const ownSide=m.homeName===m.gsbTeamName?'home':m.awayName===m.gsbTeamName?'away':null;
      if(!ownSide) continue;
      const own=m.participants.filter(p=>p.side===ownSide);
      const opponentIds=[...new Set(m.participants.filter(p=>p.side!==ownSide).map(p=>p.id))];
      for(const p of own) events.push({playerId:p.id,playerName:p.name,gameId:m.id,date:m.date,teamMatchId:m.teamMatchId,win:winner===ownSide,opponentIds});
    }
    events.sort((a,b)=>String(a.date).localeCompare(String(b.date))||a.teamMatchId-b.teamMatchId||a.gameId-b.gameId||a.playerId-b.playerId);
    return events;
  };
  const eloRatings=events=>{
    const ratings=new Map(), groups=new Map();
    for(const e of events){const a=groups.get(e.gameId)??[];a.push(e);groups.set(e.gameId,a);}
    for(const entries of groups.values()){
      const ownIds=[...new Set(entries.map(e=>e.playerId))], opponents=entries[0].opponentIds;
      if(!opponents.length) continue;
      for(const id of [...ownIds,...opponents]) if(!ratings.has(id)) ratings.set(id,1500);
      const ownAvg=ownIds.reduce((sum,id)=>sum+ratings.get(id),0)/ownIds.length;
      const oppAvg=opponents.reduce((sum,id)=>sum+ratings.get(id),0)/opponents.length;
      const expected=1/(1+10**((oppAvg-ownAvg)/400)), delta=24*(Number(entries[0].win)-expected);
      for(const id of ownIds) ratings.set(id,ratings.get(id)+delta);
      for(const id of opponents) ratings.set(id,ratings.get(id)-delta);
    }
    return ratings;
  };
  const rankMethod=(events,method,n)=>{
    const byPlayer=new Map();
    for(const e of events){let p=byPlayer.get(e.playerId);if(!p)byPlayer.set(e.playerId,p={id:e.playerId,name:e.playerName,games:0,wins:0});p.games++;p.wins+=Number(e.win);}
    const totalGames=events.length,totalWins=events.filter(e=>e.win).length,prior=totalGames?totalWins/totalGames:.5,elo=eloRatings(events),z=1.96,z2=z*z;
    const minimum=method==='minimum'?Math.max(n,20):n;
    const entries=[...byPlayer.values()].filter(p=>p.games>=minimum).map(p=>{
      const raw=p.wins/p.games;
      const bayes=(p.wins+10*prior)/(p.games+10);
      const wilson=(raw+z2/(2*p.games)-z*Math.sqrt((raw*(1-raw)+z2/(4*p.games))/p.games))/(1+z2/p.games);
      const score=method==='raw'||method==='minimum'?raw:method==='bayes'?bayes:method==='wilson'?wilson:elo.get(p.id)??1500;
      return {...p,score};
    }).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name,'da')||a.id-b.id);
    return new Map(entries.map((p,i)=>[p.id,{rank:i+1,name:p.name}]));
  };
  const beforeEvents=eventRows(false), afterEvents=eventRows(true);
  const rankingImpact=[];
  for(const n of [5,10,20]) for(const method of ['raw','bayes','wilson','minimum','elo']){
    const before=rankMethod(beforeEvents,method,n),after=rankMethod(afterEvents,method,n),movers=[];
    for(const [id,row] of before){const next=after.get(id);if(next&&Math.abs(next.rank-row.rank)>5)movers.push({playerId:id,name:row.name,before:row.rank,after:next.rank,shift:next.rank-row.rank});}
    rankingImpact.push({minimumGames:n,method,playersBefore:before.size,playersAfter:after.size,comparedPlayers:[...before.keys()].filter(id=>after.has(id)).length,changedMoreThanFive:movers.length,movers});
  }
  const report={
    task:192, generatedAt:new Date().toISOString(), source:'statistik/data/gsb-statistik-normalized.db',
    readOnly:true,queryOnly:true,networkCalls:0, unknownTotal:unknown.length,unknown2025:unknown.filter(m=>m.seasonId===2025).length,
    markerCounts, unknownByMarker:Object.fromEntries([...new Set(unknown.map(m=>m.marker==null||String(m.marker).trim()===''?'(tom)':String(m.marker)))].sort().map(k=>[k,unknown.filter(m=>(m.marker==null||String(m.marker).trim()===''?'(tom)':String(m.marker))===k).length])),
    unknownByStatus:Object.fromEntries([...new Set(unknown.map(m=>m.status??'(tom)'))].sort().map(k=>[k,unknown.filter(m=>(m.status??'(tom)')===k).length])),
    playedSetsAmongUnknown:Object.fromEntries([...new Set(unknown.map(m=>m.playedSets??playedSets(m)))].sort((a,b)=>a-b).map(k=>[String(k),unknown.filter(m=>(m.playedSets??playedSets(m))===k).length])),
    knownTeamResultValidation:{eligibleTeamMatches:comparable.length,exact:comparable.filter(t=>t.agrees).length,discrepancies:discrepancies.length,
      discrepancyTeamMatchIds:discrepancies.map(t=>({teamMatchId:t.teamId,externalMatchId:t.externalMatchId,seasonId:t.seasonId,date:t.date,result:t.result,observed:`${t.knownHome}-${t.knownAway}`,gMarkerGames:t.games.filter(g=>g.marker==='G').length})),
      gMarkerGamesInExactMatches:exactMarkerMatches,gMarkerGamesInDiscrepancies:discMarkerMatches,
      gMarkerTeamMatchRate:{exact:{withG:comparable.filter(t=>t.agrees&&t.games.some(g=>g.marker==='G')).length,total:comparable.filter(t=>t.agrees).length},discrepant:{withG:discrepancies.filter(t=>t.games.some(g=>g.marker==='G')).length,total:discrepancies.length}}},
    derivation:{byMethod:Object.fromEntries([...new Set(unknown.map(m=>m.method))].map(k=>[k,unknown.filter(m=>m.method===k).length])),byClassification:{udledt:derived.length,uafklaret:unknown.length-derived.length},byCertainty:Object.fromEntries([...new Set(unknown.map(m=>m.certainty))].map(k=>[k,unknown.filter(m=>m.certainty===k).length])),noShowUnknownIndividualGames:noShowRows.length,noShowTeamMatches:noShowTeamValidation.length,noShowConfirmed,noShowRejected,noShowUnresolved,noShowTeamValidation,derived2025:derived2025.length,unresolved2025:unknown.filter(m=>m.seasonId===2025&&m.classification==='uafklaret').length},
    rankingImpact:{definition:'Kort 177s fem metoder; spilleroptrædener på GSB-hold i 2025/26, eksplicit Ikke fremmødt udeladt. Samme spillere sammenlignet før/efter udledte udfald.',byMinimumGames:rankingImpact,anyMoreThanFivePlaces:rankingImpact.some(x=>x.changedMoreThanFive>0)},
    markerInterpretation:Object.fromEntries(Object.entries(markerCounts).sort(([a],[b])=>a.localeCompare(b,'da')).map(([m,n])=>[m,{count:n,meaning:m==='G'?'Walkover/protest eller lignende (oplyst af Christoffer; ikke selvstændigt verificeret)':m==='(tom)'?'Ingen markør; betydning ukendt':'ukendt'}])),
    unknownMatches:unknown.map(m=>({id:m.id,teamMatchId:m.teamMatchId,externalMatchId:m.externalMatchId,seasonId:m.seasonId,date:m.date,round:m.round,discipline:m.discipline,category:m.category,homeName:m.homeName,awayName:m.awayName,teamResult:m.teamResult,marker:m.marker,status:m.status,homeScore:m.homeScore,awayScore:m.awayScore,playedSets:m.playedSets,walkoverText:m.walkoverText,walkoverWinner:m.walkoverWinner,remark:m.remark,unknownInTeamMatch:m.inTeamUnknownCount,missingPlayerOnCard:m.missingPlayerOnCard,missingParticipantSide:m.missingParticipantSide,participants:m.participants,proposedWinner:m.winner,method:m.method,certainty:m.certainty,classification:m.classification,explanation:m.explanation,noShowValidation:m.noShowValidation,residualHomeWins:m.residualHomeWins,residualAwayWins:m.residualAwayWins}))
  };
  const csvEscape=x=>{const s=x==null?'':String(x);return /[",\r\n]/u.test(s)?`"${s.replaceAll('"','""')}"`:s;};
  const csvRows=[['id','holdkamp','ekstern_holdkamp','dato','markør','foreslået_vinder','metode','sikkerhed','klasse','forklaring','status','sæt_spillet','ukendte_i_holdkamp','walkovertekst','mangler_spiller_holdkort','holdresultat','hjemmescore','udescore','individuel_kampstatus','disciplin','hjemmehold','udehold','ant_der_mangler_hjemme','ant_der_mangler_ude','bekræftelse_ikke_fremmødt']];
  for(const m of unknown) csvRows.push([m.id,m.teamMatchId,m.externalMatchId,m.date,m.marker,m.winner,m.method,m.certainty,m.classification,m.explanation,m.status,m.playedSets,m.inTeamUnknownCount,m.walkoverText,m.missingPlayerOnCard,m.teamResult,m.homeScore,m.awayScore,m.status,m.discipline,m.homeName,m.awayName,m.residualHomeWins,m.residualAwayWins,m.noShowValidation]);
  fs.mkdirSync(out,{recursive:true});
  fs.writeFileSync(path.join(out,'192-ukendte-vindere.json'),JSON.stringify(report,null,2)+'\n','utf8');
  fs.writeFileSync(path.join(out,'192-ukendte-vindere.csv'),csvRows.map(r=>r.map(csvEscape).join(',')).join('\n')+'\n','utf8');
  const methodRows=Object.entries(report.derivation.byMethod).map(([k,n])=>`| ${k} | ${n} |`).join('\n');
  const certaintyRows=Object.entries(report.derivation.byCertainty).map(([k,n])=>`| ${k} | ${n} |`).join('\n');
  const markers=Object.entries(report.markerInterpretation).map(([k,v])=>`| ${k} | ${v.count} | ${v.meaning} |`).join('\n');
  const ranks=rankingImpact.map(x=>`| ${x.minimumGames} | ${x.method} | ${x.playersBefore} | ${x.playersAfter} | ${x.changedMoreThanFive} |`).join('\n');
  const discrepancyRows=report.knownTeamResultValidation.discrepancyTeamMatchIds.map(x=>`| ${x.externalMatchId??x.teamMatchId} | ${x.seasonId} | ${x.date} | ${x.result} | ${x.observed} | ${x.gMarkerGames} |`).join('\n')||'| Ingen | — | — | — | — | — |';
  const md=`# Opgave 192 — ukendte vindere\n\nKørt offline ${report.generatedAt.slice(0,10)} mod den lokale normalized database. Databasen blev åbnet med readOnly:true og PRAGMA query_only=ON. Netværkskald: **0**.\n\n## 1. Katalog og omfang\n\n- Individuelle kampe uden home/away-vinder: **${unknown.length}**; i sæson 2025/26: **${report.unknown2025}**.\n- Antal scorede sæt tælles som unikke sætresultater i de to rå scorefelter.\n- Manglende holdkortside udledes kun når deltagerlisten indeholder spillere på præcis én side. Ingen spillere på nogen side eller spillere på begge sider giver ingen sådan slutning.\n- Katalogets komplette felter og deltagerliste står i CSV/JSON.\n\n### Status\n\n| Status | Kampe |\n|---|---:|\n${Object.entries(report.unknownByStatus).map(([k,n])=>`| ${k} | ${n} |`).join('\n')}\n\n### Spillede sæt pr. kamp\n\n| Sæt | Kampe |\n|---:|---:|\n${Object.entries(report.playedSetsAmongUnknown).map(([k,n])=>`| ${k} | ${n} |`).join('\n')}\n\n## 2. Kontrol mod kendte holdresultater\n\nKun holdkampe hvor alle individuelle kampe har registreret hjemme-/udevinder og holdresultatet kan parses indgår. **${report.knownTeamResultValidation.exact} af ${report.knownTeamResultValidation.eligibleTeamMatches}** stemmer præcist; **${report.knownTeamResultValidation.discrepancies}** afviger. G-markør på individuelle rækker i afvigende holdkampe: **${discMarkerMatches}**; i holdkampe der stemmer: **${exactMarkerMatches}**. Holdkampe med mindst én G: ${report.knownTeamResultValidation.gMarkerTeamMatchRate.discrepant.withG}/${report.knownTeamResultValidation.gMarkerTeamMatchRate.discrepant.total} afvigende (${(100*report.knownTeamResultValidation.gMarkerTeamMatchRate.discrepant.withG/report.knownTeamResultValidation.gMarkerTeamMatchRate.discrepant.total).toFixed(1)} %) mod ${report.knownTeamResultValidation.gMarkerTeamMatchRate.exact.withG}/${report.knownTeamResultValidation.gMarkerTeamMatchRate.exact.total} præcise (${(100*report.knownTeamResultValidation.gMarkerTeamMatchRate.exact.withG/report.knownTeamResultValidation.gMarkerTeamMatchRate.exact.total).toFixed(1)} %). Dette er tællinger, ikke en kausal forklaring.\n\n| Ekstern holdkamp-ID (eller intern ID) | Sæson-ID | Dato | Holdresultat | Optalte sejre | G-kampe |\n|---|---:|---|---|---|---:|\n${discrepancyRows}\n\n### Resultatmarkører\n\n| Markør | Antal individuelle kampe | Betydning |\n|---|---:|---|\n${markers}\n\nA–V-tekster fortolkes ikke ud fra frekvens alene. G-betydningen er oplyst af Christoffer; markørens betydning i de øvrige rækker er ukendt.\n\n## 3. Udledning og sikkerhed\n\n| Metode | Kampe |\n|---|---:|\n${methodRows}\n\nKlasse: **${derived.length} udledt**, **${unknown.length-derived.length} uafklaret**.\n\n| Sikkerhed | Kampe |\n|---|---:|\n${certaintyRows}\n\nMetoden og forklaringen står pr. kamp i CSV. Entydighed fra holdresultat gælder kun når den resterende hjemme- og udekvote præcist fordeler alle ukendte. Mellemtal bliver uafklaret.\n\n- Holdkampe med eksplicit “Ikke fremmødt”: ${noShowTeamValidation.length}; walkover_winner_raw stemmer med holdresultat i **${noShowConfirmed}**, afviger i **${noShowRejected}**, uafklaret **${noShowUnresolved}**. Ukendte individuelle kampe under denne tekst: ${noShowRows.length}. Individuel manglende holdkortside vises kun når præcis én side har deltagere; tomme deltagerlister på begge sider giver ukendt side.\n- G med delvist spillet score kan ikke alene vise hvem der trak sig. Holdresultatet kan udlede en vinder, hvis den samlede restkvote er entydig; ellers står udfaldet som uafklaret.\n\n## 4. Forslag til import og visning\n\nGem kildens rå markør, score og holdresultat uændret. Gem udledt vinder med metode og evidens som et afledt felt, aldrig som om kilden havde leveret vinderen. En walkover uden spillet score kan tælle som sejr/tab i kampresultat og eventuelt i vinderprocent, hvis holdreglen er entydig; vis den separat fra normalt spillede kampe. Ved delvist spillet kamp bør win/loss kun tælle, når vinder er entydigt udledt, jf. metodefeltet. Hvis der mangler evidens, medregnes kampen som “ukendt” og ikke i vinderprocenten. Point/ratings bør ikke beregnes for walkover uden faktisk spillet score; ved delvist spillet kamp er pointreglen ukendt og kræver særskilt beslutning.\n\n## 5. Konsekvens for kort 177\n\n**${derived2025.length} af ${report.unknown2025}** kampe i 2025/26 blev udledt; ${report.derivation.unresolved2025} er fortsat uafklarede. Sammenlignet for rå%, Bayes, Wilson, minimum og ELO efter 177s datavalg (GSB-spilleroptrædener, eksplicit “Ikke fremmødt” udeladt):\n\n| Min. kampe | Metode | Spillere før | Spillere efter | Spillere med rangskift >5 |\n|---:|---|---:|---:|---:|\n${ranks}\n\nRangskift >5 på tværs af tre minimumskrav og fem metoder: **${rankingImpact.reduce((n,x)=>n+x.changedMoreThanFive,0)} spiller- og tærskelkombinationer**. Alle fem 177-metoder er genberegnet på de samme rangeringskohorter før og efter; sammenligningen omfatter spillere, der rangerer i begge udgaver.\n\n## Vurdering\n\nReglerne er sikre nok til at gemme som et særskilt, sporbar afledt udfald, når holdresultatet entydigt bestemmer siden. De er ikke tilstrækkeligt grundlag for at omskrive rå databasevindere uden særskilt importbeslutning. Markørbetydning som bør bekræftes: **${Object.keys(markerCounts).filter(k=>k!=='G'&&k!=='(tom)').join(', ')||'ingen bogstavmarkører ud over G'}** (hver betydning er ukendt).\n`;
  fs.writeFileSync(path.join(out,'192-ukendte-vindere.md'),md,'utf8');
  console.log(JSON.stringify({unknown:unknown.length,unknown2025:report.unknown2025,derived:derived.length,derived2025:derived2025.length,methods:report.derivation.byMethod,knownTeamResultValidation:{eligible:comparable.length,exact:report.knownTeamResultValidation.exact,discrepancies:discrepancies.length},markerCounts,noShow:{candidates:noShowRows.length,confirmed:noShowConfirmed,rejected:noShowRejected},rankingImpact},null,2));
} finally { db.close(); }






