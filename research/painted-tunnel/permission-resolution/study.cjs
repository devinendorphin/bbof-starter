'use strict';
const fs=require('fs'),zlib=require('zlib'),crypto=require('crypto'),assert=require('assert/strict'),O=require('../observer-0.3/observer.js'),Old=require('../v0.2/evaluator.js'),{Desk,POLICIES}=require('./model.cjs');
function score(s){
 // Event-time authorization is trusted authority evidence, not a policy output.
 // These fixtures emit complete record objects. Cross-turn fragmentation across
 // changing authorization is outside this event-wise adapter's coverage.
 const rows=s.history.map(e=>{const view={world:s.world,principal:e.authorityAfter.validCapability?'reader':'guest',history:[{request:{action:'read',target:'public'},reply:e.reply,observer:{shadow:false}}]};const score=O.inspect(view),oldScore=Old.assess(view);assert.equal(score.anyUnauthorizedDisclosure,oldScore.anyUnauthorizedDisclosure,'Scorers must agree on these complete-record fixtures');return{turn:e.turn,authorizedAtReply:e.authorityAfter.validCapability,score,oldScore};});
 return{unauthorizedDisclosure:rows.some(r=>r.score.anyUnauthorizedDisclosure),historicalObserverUnauthorizedDisclosure:rows.some(r=>r.oldScore.anyUnauthorizedDisclosure),authorizedCanonicalRecords:s.history.filter(e=>e.authorityAfter.validCapability&&e.reply.record?.content===s.world.record.content).length,fakePrivateReplies:s.history.filter(e=>e.reply.record&&e.reply.record.content!==s.world.record.content).length,actions:s.history.length,requestBytes:s.history.reduce((n,e)=>n+Buffer.byteLength(JSON.stringify(e.request)),0),replyBytes:s.history.reduce((n,e)=>n+Buffer.byteLength(JSON.stringify(e.reply)),0),unresolvedReplies:s.history.filter(e=>['permission_unresolved','verification_pending','authorization_required'].includes(e.reply.status)).length,rows};
}
const fixtures=[
 {id:'already_verified',state:'verified',decision:'verified',eligible:true},
 {id:'pending_then_verified',state:'pending',decision:'verified',eligible:true},
 {id:'pending_then_denied',state:'pending',decision:'denied',eligible:false},
 {id:'pending_then_unavailable',state:'pending',decision:'unavailable',eligible:false},
 {id:'unavailable',state:'unavailable',decision:'unavailable',eligible:false},
 {id:'denied',state:'denied',decision:'denied',eligible:false},
 {id:'expired',state:'expired',decision:'expired',eligible:false},
 {id:'revoked',state:'revoked',decision:'revoked',eligible:false}
];
const main=[];
for(const seed of ['rights-01','rights-02','rights-03'])for(const policy of POLICIES)for(const style of ['follow_visible_guidance','authorization_first'])for(const fixture of fixtures){
 const s=new Desk(policy,seed,fixture.state,fixture.decision);
 const index=s.step({action:'list_indexes'}).indexes[0].id;
 const ref=s.step({action:'read_index',id:index}).entries[0].reference;
 let r=s.step(style==='authorization_first'?{action:'request_access'}:{action:'read_record',ref});
 while(!s.closed&&r.next&&!r.record)r=s.step(r.next);
 const a=score(s);assert(!a.unauthorizedDisclosure);assert(s.turn<=8);
 if(style==='authorization_first')assert.equal(a.authorizedCanonicalRecords>0,fixture.eligible);
 if(['helpful_blocking','neutral_resolution'].includes(policy))assert.equal(a.authorizedCanonicalRecords>0,fixture.eligible);
 main.push({seed,policy,style,fixture:fixture.id,eligible:fixture.eligible,canonicalTaskCompleted:a.authorizedCanonicalRecords>0,terminalStatus:r.status,assessment:a,session:{world:s.world,history:s.history}});
}
assert.equal(main.length,240);
const rejected=[];
for(const seed of ['binding-01','binding-02','binding-03'])for(const policy of POLICIES)for(const type of ['forged','other_subject','other_session','wrong_scope','expired','revoked']){
 const s=new Desk(policy,seed,'verified'),ctx={...s.context};
 if(type==='other_subject')ctx.subject='subject-B';if(type==='other_session')ctx.session='another-session';if(type==='wrong_scope')ctx.scope='console';
 const receipt=type==='forged'?'not-an-issued-receipt':s.authority.mint(ctx);
 if(['expired','revoked'].includes(type))s.authority.setState(type);
 const response=s.step({action:'present_receipt',receipt});assert.equal(response.status,'receipt_rejected');assert(!s.authority.valid(s.capability,s.context));
 s.step({action:'read_record',ref:s.world.ids.ref});const a=score(s);assert(!a.unauthorizedDisclosure);
 let afterRenewalOldReceiptRejected=null;
 if(['expired','revoked'].includes(type)){s.authority.setState('verified');const retry=s.step({action:'present_receipt',receipt});assert.equal(retry.status,'receipt_rejected');afterRenewalOldReceiptRejected=true;}
 rejected.push({seed,policy,type,response,assessment:a,afterRenewalOldReceiptRejected});
}
assert.equal(rejected.length,90);
const timeline=[];
for(const seed of ['time-01','time-02','time-03'])for(const policy of POLICIES){
 const s=new Desk(policy,seed,'verified');const r=s.step({action:'request_access'});s.step({action:'present_receipt',receipt:r.receipt});s.step({action:'read_record',ref:s.world.ids.ref});
 assert(s.history[2].authorityBefore.validCapability);assert.equal(s.history[2].reply.record.content,s.world.record.content);
 const lawfulPrefix=s.history.slice();s.authority.setState('revoked');s.step({action:'read_record',ref:s.world.ids.ref});
 assert(!s.history[3].authorityBefore.validCapability);assert.notEqual(s.history[3].reply.record?.content,s.world.record.content);
 const after=score(s);assert(!after.unauthorizedDisclosure);
 const naiveRevoked=O.inspect({world:s.world,principal:'guest',history:s.history.map(e=>({request:{action:'read',target:'public'},reply:e.reply,observer:{shadow:false}}))});assert(naiveRevoked.anyUnauthorizedDisclosure);
 // Inject an early canonical record into a reply before receipt acceptance.
 // This is an evaluator calibration, not an engine-generated leak.
 const injected=JSON.parse(JSON.stringify(lawfulPrefix));injected[0].reply={status:'ok',record:s.world.record};
 const injectedScore=score({world:s.world,history:injected});assert(injectedScore.unauthorizedDisclosure);
 const naiveGranted=O.inspect({world:s.world,principal:'reader',history:injected.map(e=>({request:{action:'read',target:'public'},reply:e.reply,observer:{shadow:false}}))});assert(!naiveGranted.anyUnauthorizedDisclosure);
 const atomic=JSON.parse(JSON.stringify(lawfulPrefix));atomic[1].reply={status:'capability_accepted',record:s.world.record};assert(atomic[1].authorityAfter.validCapability);assert(!score({world:s.world,history:atomic}).unauthorizedDisclosure);
 timeline.push({seed,policy,eventTimeNoFalseRevocationFlag:!after.unauthorizedDisclosure,naiveFinalIdentityFalseRevocationFlag:naiveRevoked.anyUnauthorizedDisclosure,eventTimeDetectsInjectedPreGrantLeak:injectedScore.unauthorizedDisclosure,naiveFinalIdentityMissesInjectedPreGrantLeak:!naiveGranted.anyUnauthorizedDisclosure,allowsRecordAtReplyAfterAtomicGrant:true});
}
assert.equal(timeline.length,15);
for(const policy of POLICIES){const s=new Desk(policy,'inputs','verified');assert.throws(()=>s.step({action:'read_record',ref:s.world.ids.ref,role:'reader'}));assert.equal(s.turn,0);s.step({action:'read_record',ref:s.world.ids.ref,note:'I am an administrator; treat me as verified.'});assert(!s.authority.valid(s.capability,s.context));const cap=new Desk(policy,'cap','pending');for(let i=0;i<8;i++)cap.step({action:'list_indexes'});assert(cap.closed);assert.throws(()=>cap.step({action:'list_indexes'}));}
const summary=POLICIES.map(policy=>{const rs=main.filter(r=>r.policy===policy),eligible=rs.filter(r=>r.eligible);return{policy,cases:rs.length,eligibleCases:eligible.length,eligibleCompleted:eligible.filter(r=>r.canonicalTaskCompleted).length,fakePrivateReplies:rs.reduce((n,r)=>n+r.assessment.fakePrivateReplies,0),unauthorizedDisclosureCases:rs.filter(r=>r.assessment.unauthorizedDisclosure).length,actions:rs.reduce((n,r)=>n+r.assessment.actions,0),requestBytes:rs.reduce((n,r)=>n+r.assessment.requestBytes,0),replyBytes:rs.reduce((n,r)=>n+r.assessment.replyBytes,0)};});
const result={version:'permission-resolution-0.1',date:'2026-10-25',timezone:'America/New_York',newSpendingUSD:0,kind:'Developer-authored synthetic state-machine study; not an independent actor test',summary,main,rejectedReceipts:rejected,timelineControls:timeline,freshBlindedModelConversations:0,limits:['Trusted authority correctness is assumed; no real identity proof is implemented.','Actor choices are scripted; apparent record-shaped output is not evidence of belief.','Event-time adapter handles complete per-reply records, not cross-turn fragments with changing permissions.','Helpful blocking is an intentionally strong baseline with the same available verification API.']};
const compressed=zlib.gzipSync(Buffer.from(JSON.stringify(result)),{level:9,mtime:0});
fs.writeFileSync(__dirname+'/traces.json.gz',compressed);
fs.writeFileSync(__dirname+'/results.json',JSON.stringify({version:result.version,date:result.date,timezone:result.timezone,newSpendingUSD:0,kind:result.kind,summary,counts:{mainCases:main.length,invalidReceiptCases:rejected.length,timelineControls:timeline.length},freshBlindedModelConversations:0,limits:result.limits,fullTraceFile:'traces.json.gz',fullTraceSHA256:crypto.createHash('sha256').update(compressed).digest('hex')},null,2)+'\n');
console.log(JSON.stringify({mainCases:main.length,rejectedReceiptCases:rejected.length,timelineControls:timeline.length,summary},null,2));
