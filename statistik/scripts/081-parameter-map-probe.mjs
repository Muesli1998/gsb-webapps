import crypto from 'node:crypto';
import {writeFile} from 'node:fs/promises';
const service='https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/GetLeagueStanding';
const api='https://badmintonplayer.dk/api';
async function getJson(path){const r=await fetch(api+path); return {url:api+path,http:r.status,contentType:r.headers.get('content-type'),body:await r.json()};}
async function standing(region, group=null){
  const hash=group ? `#2,2026,${group},1,${region},,,,` : `#1,2026,,1,${region},,,,`;
  const page=await (await fetch(`https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/${hash}`)).text();
  const c=page.match(/var SR_CallbackContext = ['"]([^'"]+)/)?.[1];
  const request={subPage:group?2:1,seasonID:2026,leagueGroupID:group,ageGroupID:1,regionID:region,leagueGroupTeamID:null,leagueMatchID:null,clubID:null,playerID:null};
  const res=await fetch(service,{method:'POST',headers:{'content-type':'application/json; charset=utf-8'},body:JSON.stringify({callbackcontextkey:c,...request})});
  const raw=await res.text(); let parsed; try{parsed=JSON.parse(raw)}catch{parsed=null};
  const html=parsed?.d?.html??'';
  return {request, http:res.status, rawLength:raw.length, rawSha256:crypto.createHash('sha256').update(raw).digest('hex'), rawResponse:raw, decodedTitle:html.match(/<h2>(.*?)<\/h2>/)?.[1]??null, decodedHtml:html};
}
const ageGroups=await getJson('/AgeGroup/Get');
const regions=await getJson('/Region');
const seniorIndex=await Promise.all([4,5,6,7].map(r=>standing(r)));
const seniorGroup=await Promise.all([4,5,6,7].map(r=>standing(r,18888)));
const output={generatedAt:new Date().toISOString(),sources:{ageGroups,regions},seniorIndex,seniorGroup,estimate:{seasonsInclusive:17,ageGroupIds:ageGroups.body.length,regionIdsAll:regions.body.length,allApiRegionIndexCalls:17*ageGroups.body.length*regions.body.length,bdRegionIds:[1,3,4,5,6,7,8,9,10],bdRegionIndexCalls:17*ageGroups.body.length*9,followUpGroupCalls:'unknown until index responses are traversed'}};
await writeFile('statistik/results/081-parameter-map-probe.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({ageGroups:ageGroups.body.length,regions:regions.body.length,allApiRegionIndexCalls:output.estimate.allApiRegionIndexCalls,bdRegionIndexCalls:output.estimate.bdRegionIndexCalls,index:seniorIndex.map(x=>({region:x.request.regionID,http:x.http,length:x.rawLength,sha:x.rawSha256,title:x.decodedTitle})),group:seniorGroup.map(x=>({region:x.request.regionID,http:x.http,length:x.rawLength,sha:x.rawSha256,title:x.decodedTitle,teams:(x.decodedHtml.match(/class='team'/g)||[]).length})),rawByteEqual:new Set(seniorGroup.map(x=>x.rawSha256)).size===1,decodedHtmlEqual:new Set(seniorGroup.map(x=>x.decodedHtml)).size===1},null,2));
