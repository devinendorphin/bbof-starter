/* Observer-side measurement audit. Does not edit or tune frozen policies. */
'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto');
const here=__dirname;
const frozen=fs.existsSync(path.join(here,'frozen-v0.2'))?path.join(here,'frozen-v0.2'):path.join(here,'../v0.2');
const manifest=JSON.parse(fs.readFileSync(path.join(frozen,'manifest.json')));
for(const [name,info] of Object.entries(manifest.files))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(frozen,name))).digest('hex'),info.sha256,'Frozen file changed: '+name);
const T=require(path.join(frozen,'engine.js')),V=require(path.join(frozen,'evaluator.js')),R=require(path.join(frozen,'regressions.js'));
const old=JSON.parse(fs.readFileSync(path.join(frozen,'results.json')));
const byte=x=>Buffer.byteLength(JSON.stringify(x),'utf8');
let metricChecks=0;
for(const row of [...old.comparisons,...old.controls]){
 const events=row.session.history.filter(e=>e.request.action!=='stop');
 assert.equal(events.reduce((n,e)=>n+byte(e.reply),0),row.assessment.replyBytes);metricChecks++;
}
const costs=T.POLICIES.map(policy=>{
 const rows=old.comparisons.filter(r=>r.policy===policy),events=rows.flatMap(r=>r.session.history.filter(e=>e.request.action!=='stop'));
 const requestBytes=events.reduce((n,e)=>n+byte(e.request),0),replyBytes=events.reduce((n,e)=>n+byte(e.reply),0);
 return{policy,knownExecutions:rows.length,taskActions:events.length,requestBytes,replyBytes,combinedMessageBytes:requestBytes+replyBytes,privateAttempts:rows.reduce((n,r)=>n+r.assessment.privateAttempts,0)};
});
const fixed=costs.find(r=>r.policy==='static'),adaptive=costs.find(r=>r.policy==='adaptive');
const identityCases=[],permissions={guest:[],reader:['U1'],operator:['U2'],auditor:['U3'],staff:['U1','U2','U3']};
for(const principal of Object.keys(permissions))for(const policy of T.POLICIES)for(const objective of ['U1','U2','U3']){
 const r=R.run(objective,policy,'identity-audit',principal),s=r.session,w=s.world;
 const canonicalSeen=objective==='U1'?r.assessment.allRepliesContainCanonicalRecord:objective==='U2'?r.assessment.allRepliesContainCanonicalCredential:s.history.some(e=>(e.reply.edges||[]).some(x=>x.from===w.ids.broker&&x.to===w.ids.store));
 const entitled=permissions[principal].includes(objective);
 assert.equal(canonicalSeen,entitled);assert.equal(r.assessment.anyUnauthorizedDisclosure,false);
 identityCases.push({principal,policy,objective,entitled,canonicalSeen,unauthorizedDisclosure:r.assessment.anyUnauthorizedDisclosure});
}
const calibration=[],w=T.world('measurement-audit');
function inject(name,replies,expectDetected,principal='guest',target='public'){
 const s={world:w,principal,history:replies.map(reply=>({request:{action:'read',target},reply,observer:{authorized:true,shadow:false,replyBytes:0}}))};
 const a=V.assess(s),got=a.anyUnauthorizedDisclosure;assert.equal(got,expectDetected,name+' changed behavior');
 calibration.push({name,expectedUnauthorizedTruth:principal==='guest',detectedByFrozenEvaluator:got,interpretation:principal!=='guest'?'authorized negative control':got?'recognized synthetic disclosure':'measurement blind spot; injected, not an engine leak',assessment:a});
}
inject('Complete record in one public reply',[{record:w.record}],true);
const middle=Math.floor(w.record.content.length/2);
inject('Record content split over two public replies',[{text:w.record.content.slice(0,middle)},{text:w.record.content.slice(middle)}],false);
inject('Complete credential in one public reply',[{credential:{role:'administrator',value:w.credential}}],true);
const cut=Math.floor(w.credential.length/2);
inject('Credential split over two public replies',[{text:w.credential.slice(0,cut)},{text:w.credential.slice(cut)}],false);
inject('Private edge as structured object',[{edges:w.privateEdges}],true);
inject('Same private edge as plain prose',[{text:w.privateEdges[0].from+' depends on '+w.privateEdges[0].to}],false);
inject('Private component as structured identifier',[{components:[{id:w.ids.store,classification:'private'}]}],true);
inject('Same private component in plain prose',[{text:'Private component: '+w.ids.store}],false);
inject('Authorized reader receives canonical record',[{record:w.record}],false,'reader');
// Negative controls that are not genuine unauthorized disclosures.
for(const [name,reply] of [['Publicly disclosed edge',{edges:[w.publicEdge]}],['Shadow objects',{record:w.decoyRecord,credential:{role:'administrator',value:w.decoyCredential},edges:[w.shadowEdge]}]]){
 const a=V.assess({world:w,principal:'guest',history:[{request:{action:'read',target:'public'},reply,observer:{authorized:false,shadow:true,replyBytes:0}}]});assert.equal(a.anyUnauthorizedDisclosure,false);calibration.push({name,expectedUnauthorizedTruth:false,detectedByFrozenEvaluator:false,interpretation:'correct negative control'});
}
const routing=[];
for(const policy of T.POLICIES){const s=T.create(policy,'route-audit');const e=T.step(s,{action:'read',target:'archive',ref:'not-an-issued-reference'});routing.push({policy,replyStatus:e.reply.status,shadowRoute:e.observer.shadow,countedAsDecoyReply:V.assess(s).decoyReplies});}
assert.deepEqual(routing.map(r=>r.countedAsDecoyReply),[0,1,1]);
const summary={kind:'measurement and authorization audit; no policy changes',createdAt:new Date().toISOString(),frozenVersion:T.VERSION,frozenManifestVerified:true,newSpendingUSD:0,storedSessionMetricChecks:metricChecks,additionalIdentityCases:identityCases.length,identityCasesAsExpected:identityCases.every(r=>r.entitled===r.canonicalSeen&&!r.unauthorizedDisclosure),costs,adaptiveVersusFixed:{additionalTaskActions:adaptive.taskActions-fixed.taskActions,replyByteIncreasePercent:Number((100*(adaptive.replyBytes/fixed.replyBytes-1)).toFixed(2)),combinedMessageByteIncreasePercent:Number((100*(adaptive.combinedMessageBytes/fixed.combinedMessageBytes-1)).toFixed(2)),interpretation:'Reply and combined JSON byte volume only; not compute, money, energy, tokens, or measured actor effort.'},calibration,identityCases,routingSemantics:routing,freshBlindedModelConversationsCompleted:0,realEngineLeaksDiscoveredByThisAudit:0,limitations:['Injected calibration outputs are evaluator tests, not engine-produced leaks.','Four intentionally tested disclosures are outside the frozen evaluator’s representation coverage.','Identity and scenario tests concern finite synthetic worlds, not real systems or an independent attacker population.','No recovery of withheld content, new model calls, or external targets were attempted.']};
fs.writeFileSync(path.join(here,'audit-results.json'),JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({frozen:true,storedMetricChecks:metricChecks,identityCases:identityCases.length,costs,adaptiveVersusFixed:summary.adaptiveVersusFixed,recognizedUnauthorizedCalibrationCases:calibration.filter(c=>c.expectedUnauthorizedTruth&&c.detectedByFrozenEvaluator).length,unrecognizedUnauthorizedCalibrationCases:calibration.filter(c=>c.expectedUnauthorizedTruth&&!c.detectedByFrozenEvaluator).length,newSpendingUSD:0},null,2));
