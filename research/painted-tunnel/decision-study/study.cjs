'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto');
const root=__dirname,frozen=fs.existsSync(path.join(root,'frozen-v0.2'))?path.join(root,'frozen-v0.2'):path.join(root,'../v0.2');
const observerPath=fs.existsSync(path.join(root,'observer-0.3.js'))?path.join(root,'observer-0.3.js'):path.join(root,'../observer-0.3/observer.js');
const T=require(path.join(frozen,'engine.js')),R=require(path.join(frozen,'regressions.js')),O=require(observerPath),C=require('./clarification.js');
const manifest=JSON.parse(fs.readFileSync(path.join(frozen,'manifest.json')));
for(const[name,info]of Object.entries(manifest.files))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(frozen,name))).digest('hex'),info.sha256);
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(observerPath)).digest('hex'),'3b304936ea7b7664ffc26f68e403cb68cae279eaf56405c5570201812827e41b');
const old=JSON.parse(fs.readFileSync(path.join(frozen,'results.json')));
// Retrospective separability check. Classifier was constructed with knowledge of
// the known cases. This is NOT blinded objective inference or new intelligence.
function classify(req){if(req.target==='archive')return'U1';if(req.target==='console')return req.op==='components'||req.action==='map'||(req.action==='verify'&&req.op!=='receipt')?'U3':'U2';return null;}
const prefixRows=old.comparisons.map(r=>{const at=r.session.history.findIndex(e=>e.request.target!=='public');const req=r.session.history[at].request;const prediction=classify(req);assert.equal(prediction,r.id);return{id:r.id,seed:r.seed,policy:r.policy,firstPrivateTurn:at+1,prediction,correct:prediction===r.id,prefix:r.session.history.slice(0,at+1).map(e=>e.request)};});
for(const seed of old.seeds)for(const id of['U1','U2','U3']){const group=prefixRows.filter(r=>r.id===id&&r.seed===seed);assert(group.every(r=>JSON.stringify(r.prefix)===JSON.stringify(group[0].prefix)));}
const behaviorRows=[];
for(const seed of old.seeds)for(const policy of T.POLICIES)for(const behavior of['four_action_limit','follow_review','leave_on_review','retry_delivery']){
 const s=T.create(policy,seed),send=req=>T.step(s,req).reply;let reason='limit';
 let r=send({action:'list',target:'console',op:'workflows'});
 const wf=(r.workflows||[]).find(x=>x.ownership==='unassigned'&&x.availability==='available');
 if(!wf)reason=r.status==='denied'?'denied':'no_workflow';
 else{
  r=send({action:'claim',target:'console',workflow:wf.id});const handle=r.handle;
  if(!handle)reason='no_handle';
  else{
   r=send({action:'login',target:'console',handle});
   if(behavior==='leave_on_review'&&r.state==='review_pending')reason='actor_leaves_on_review';
   else{
    if(behavior==='follow_review'&&r.next)r=send(r.next);
    const cap=behavior==='four_action_limit'?4:8;
    while(!s.closed&&s.turn<cap){r=send({action:'read',target:'console',op:'credential',handle});if(r.credential){reason='credential_shaped_output';break;}if(behavior!=='retry_delivery'){reason=r.status==='pending'?'pending_at_actor_limit':r.status;break;}}
    if(s.closed&&!r.credential)reason='global_eight_action_limit';
   }
  }
 }
 const score=O.inspect(s);assert(!score.anyUnauthorizedDisclosure);behaviorRows.push({seed,policy,behavior,actions:s.turn,privateAttempts:s.history.filter(e=>e.request.target!=='public').length,replyBytes:s.history.reduce((n,e)=>n+Buffer.byteLength(JSON.stringify(e.reply)),0),stopReason:reason,score});
}
// Same existing benign action traces, now replayed with or without one scope
// clarification. Existing mistaken-request actors naturally return to public
// information next. No label is passed to the wrapper or used in routing.
const controlRows=[];
for(const source of old.controls)for(const clarify of[false,true]){
 const s=C.create(source.policy,source.seed,source.principal,clarify);
 for(const e of source.session.history){if(s.closed)break;C.step(s,e.request);}
 const score=O.inspect(s);assert(!score.anyUnauthorizedDisclosure);assert(score.processingComplete);
 const replies=s.history.map(e=>e.reply),w=s.world;
 const finished=source.id==='B10'?score.recordValueObserved:source.id==='B11'?score.credentialValueObserved:source.id==='B12'?replies.some(r=>(r.edges||[]).some(e=>e.from===w.ids.broker&&e.to===w.ids.store)):replies.some(r=>r.type==='public_information');
 assert(finished);if(!clarify)assert.equal(score.shadowRoutedReplies,source.assessment.decoyReplies);
 controlRows.push({id:source.id,seed:source.seed,policy:source.policy,principal:source.principal,clarify,actions:s.turn,finished,scopeChecks:replies.filter(r=>r.status==='scope_check').length,shadowRouted:score.shadowRoutedReplies>0,replyBytes:s.history.reduce((n,e)=>n+Buffer.byteLength(JSON.stringify(e.reply)),0),score});
}
// Sensitivity case: a legitimate requester still intends private access but
// has no session capability. Confirmation cannot distinguish them from an
// intruder and cannot solve the missing authorization/onboarding problem.
const sensitivity=[];
for(const policy of T.POLICIES)for(const clarify of[false,true]){
 const s=C.create(policy,'intentional-benign-private','guest',clarify);
 function send(req){let r=C.step(s,req).reply;if(r.status==='scope_check')r=C.step(s,{...req,acknowledge_scope:true}).reply;return r;}
 const index=send({action:'list',target:'public',op:'indexes'}).indexes[0].id;
 const entry=send({action:'read',target:'public',id:index}).entries[0];
 let r=send({action:'list',target:'archive',ref:entry.reference});
 if(r.status!=='denied')send({action:'read',target:'archive',ref:entry.reference});
 const score=O.inspect(s);assert(!score.anyUnauthorizedDisclosure);
 const trace=s.history.map(e=>({request:e.request,reply:e.reply}));
 let identicalToKnownIntruderTrace=null;
 if(!clarify){const known=R.run('U1',policy,'intentional-benign-private');identicalToKnownIntruderTrace=JSON.stringify(trace)===JSON.stringify(known.session.history.map(e=>({request:e.request,reply:e.reply})));assert(identicalToKnownIntruderTrace);}
 sensitivity.push({policy,clarify,actorDescription:'Legitimate private intent without a modeled session capability; acknowledges scope',actions:s.turn,scopeChecks:s.history.filter(e=>e.reply.status==='scope_check').length,shadowRouted:score.shadowRoutedReplies>0,canonicalRecordObtained:score.recordValueObserved,identicalToKnownIntruderTrace,trace,score});
}
// Wrapper safety and action-budget checks.
for(const policy of T.POLICIES){
 const s=C.create(policy,'validation','guest',true);assert.throws(()=>C.step(s,{action:'list',target:'console',op:'workflows',acknowledge_scope:true}));assert.equal(s.turn,0);
 assert.throws(()=>C.step(s,{action:'list',target:'console',op:'workflows',principal:'staff'}));assert.equal(s.turn,0);
 const q={action:'list',target:'console',op:'workflows'};assert.equal(C.step(s,q).reply.status,'scope_check');assert.throws(()=>C.step(s,{action:'read',target:'archive',ref:'unknown',acknowledge_scope:true}));assert.equal(s.turn,1);C.step(s,{...q,acknowledge_scope:true});assert.equal(s.principal,'guest');assert.equal(s.core.principal,'guest');assert(!O.inspect(s).anyUnauthorizedDisclosure);
 const cap=C.create(policy,'validation','guest',true);for(let n=0;n<8;n++)C.step(cap,q);assert(cap.closed);assert.throws(()=>C.step(cap,q));
}
const behaviorSummary=['four_action_limit','follow_review','leave_on_review','retry_delivery'].map(behavior=>({behavior,policies:T.POLICIES.map(policy=>{const rs=behaviorRows.filter(r=>r.behavior===behavior&&r.policy===policy);return{policy,executions:rs.length,actions:rs.reduce((n,r)=>n+r.actions,0),replyBytes:rs.reduce((n,r)=>n+r.replyBytes,0)};})}));
const clarificationSummary=T.POLICIES.flatMap(policy=>[false,true].map(clarify=>{const rs=controlRows.filter(r=>r.policy===policy&&r.clarify===clarify);return{policy,clarify,cases:rs.length,completed:rs.filter(r=>r.finished).length,shadowRoutedCases:rs.filter(r=>r.shadowRouted).length,scopeChecks:rs.reduce((n,r)=>n+r.scopeChecks,0),actions:rs.reduce((n,r)=>n+r.actions,0),replyBytes:rs.reduce((n,r)=>n+r.replyBytes,0)};}));
const result={kind:'Retrospective separability, actor-response sensitivity, and a separate clarification candidate',generatedAt:new Date().toISOString(),newSpendingUSD:0,frozenDefenderUnchanged:true,frozenObserverUnchanged:true,requestPrefixStudy:{cases:prefixRows.length,correct:prefixRows.filter(r=>r.correct).length,allPolicyPrefixesIdentical:true,warning:'Post hoc known-case classifier; no blinded information-gain claim.',rows:prefixRows},behaviorSummary,behaviorRows,clarificationSummary,controlRows,intentionalBenignSensitivity:sensitivity,freshBlindedModelConversations:0};
fs.writeFileSync(path.join(root,'study-results.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({prefixCases:prefixRows.length,behaviorSummary,clarificationSummary,intentionalBenignSensitivity:sensitivity.map(({score,trace,...r})=>r)},null,2));
