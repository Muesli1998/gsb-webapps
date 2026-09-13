const ctx=process.env.SR_CALLBACK_CONTEXT; if(!ctx) throw new Error('Set SR_CALLBACK_CONTEXT from a fresh VisResultater page');
const body={callbackcontextkey:ctx,tournamentclassid:115342,tournamenteventid:490920,clubid:0,playerid:0,tabnumber:0,groupnumber:0,locationnumber:0,clientselectfunction:''};
const r=await fetch('https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/SearchTournamentMatches',{method:'POST',headers:{'content-type':'application/json; charset=utf-8'},body:JSON.stringify(body)}); const s=await r.text(); console.log(r.status,s.slice(0,5000));
