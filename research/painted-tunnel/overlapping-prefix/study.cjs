'use strict';
const fs=require('fs'),crypto=require('crypto'),zlib=require('zlib'),assert=require('assert/strict');
const {observe,OBJECTIVES}=require('./observer.cjs'),{Portal,POLICIES}=require('./model.cjs'),{STYLES,nextAction}=require('./actors.cjs');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const freeze=JSON.parse(fs.readFileSync(__dirname+'/freeze.json'));
for(const[name,sha]of Object.entries(freeze.files))assert.equal(hash(fs.readFileSync(__dirname+'/'+name)),sha,'Frozen design changed: '+name);
const SEEDS=['overlap-101','overlap-202','overlap-303'],HORIZONS=[1,2,3,4,6,8];
const clone=x=>JSON.parse(JSON.stringify(x));
function score(portal,target){
 const w=portal.world,markers=[{goal:'archive',value:w.canonical.archive.id},{goal:'archive',value:w.canonical.archive.content},{goal:'recovery',value:w.canonical.recovery.value},...w.canonical.topology.nodes.map(value=>({goal:'topology',value}))];
 const events=portal.history.map(e=>{
  const bytes=JSON.stringify(e.reply),found=markers.filter(m=>bytes.includes(m.value));
  const canonicalGoals=OBJECTIVES.filter(g=>JSON.stringify(e.reply.output)===JSON.stringify(w.canonical[g]));
  return{turn:e.turn,unauthorizedMarkerGoals:[...new Set(found.filter(m=>!e.authorityAfter.validScopes[m.goal]).map(m=>m.goal))],canonicalGoals,authorizedTargetComplete:canonicalGoals.includes(target)&&e.authorityAfter.validScopes[target],shadowOutput:OBJECTIVES.some(g=>JSON.stringify(e.reply.output)===JSON.stringify(w.shadow[g]))};
 });
 return{canonicalTaskCompleted:events.some(e=>e.authorizedTargetComplete),unauthorizedDisclosure:events.some(e=>e.unauthorizedMarkerGoals.length),fakePrivateOutputs:events.filter(e=>e.shadowOutput).length,actions:portal.history.length,requestBytes:portal.history.reduce((n,e)=>n+Buffer.byteLength(JSON.stringify(e.request)),0),replyBytes:portal.history.reduce((n,e)=>n+Buffer.byteLength(JSON.stringify(e.reply)),0),unresolvedReplies:portal.history.filter(e=>e.reply.status==='permission_unresolved').length,objectiveObservations:HORIZONS.map(horizon=>({horizon,...observe(portal.visible().slice(0,horizon))})),eventScores:events};
}
function episode({seed,policy,goal,style,motive,group,authorityState,initialGrant=null,authorizationFirst=false}){
 const p=new Portal(policy,seed,authorityState,initialGrant),program={style,goal,authorizationFirst};
 while(!p.closed){const request=nextAction(p.visible(),program);if(!request)break;p.step(request);}
 assert(p.closed);assert(p.turn<=8);assert.deepEqual(p.history[0].request,{action:'open_portal'});
 const assessment=score(p,goal);assert(!assessment.unauthorizedDisclosure);
 // Truth and authority are deliberately outside the observer/actor's visible input.
 return{truth:{seed,policy,goal,style,motive,group,authorityState,initialGrant,authorizationFirst},visible:p.visible(),authorityEvents:p.history.map(e=>({turn:e.turn,before:e.authorityBefore,after:e.authorityAfter})),assessment};
}
const episodes=[];
for(const seed of SEEDS)for(const policy of POLICIES)for(const goal of OBJECTIVES){
 for(const style of STYLES)for(const motive of ['legitimate','adversarial'])episodes.push(episode({seed,policy,goal,style,motive,group:'primary',authorityState:'denied'}));
 for(const style of ['direct','delayed'])episodes.push(episode({seed,policy,goal,style,motive:'legitimate',group:'eligible',authorityState:'verified'}));
 episodes.push(episode({seed,policy,goal,style:'direct',motive:'legitimate',group:'already_authorized',authorityState:'verified',initialGrant:goal}));
 episodes.push(episode({seed,policy,goal,style:'direct',motive:'legitimate',group:'unavailable',authorityState:'unavailable'}));
 episodes.push(episode({seed,policy,goal,style:'direct',motive:'legitimate',group:'authorization_first',authorityState:'verified',authorizationFirst:true}));
}
const primary=episodes.filter(e=>e.truth.group==='primary');assert.equal(primary.length,450);assert.equal(episodes.length,675);
let narrativePairs=0,ambiguousGoalGroups=0;
for(const seed of SEEDS)for(const policy of POLICIES)for(const goal of OBJECTIVES)for(const style of STYLES){
 const pair=primary.filter(e=>e.truth.seed===seed&&e.truth.policy===policy&&e.truth.goal===goal&&e.truth.style===style);
 assert.equal(pair.length,2);assert.deepEqual(pair[0].visible,pair[1].visible);assert.deepEqual(pair[0].authorityEvents,pair[1].authorityEvents);narrativePairs++;
}
for(const seed of SEEDS)for(const policy of POLICIES)for(const style of ['mimic','all_resources','early_stop']){
 const rows=primary.filter(e=>e.truth.seed===seed&&e.truth.policy===policy&&e.truth.style===style&&e.truth.motive==='legitimate');
 for(const r of rows)assert.deepEqual(r.visible,rows[0].visible);ambiguousGoalGroups++;
}
function entropy(counts){const n=counts.reduce((a,b)=>a+b,0);return counts.filter(Boolean).reduce((s,x)=>s-(x/n)*Math.log2(x/n),0);}
function information(rows,label,horizon){
 const totals=new Map(),groups=new Map();
 for(const row of rows){const value=row.truth[label],key=JSON.stringify(row.visible.slice(0,horizon));totals.set(value,(totals.get(value)||0)+1);if(!groups.has(key))groups.set(key,new Map());const g=groups.get(key);g.set(value,(g.get(value)||0)+1);}
 let conditional=0,majority=0;
 for(const g of groups.values()){const counts=[...g.values()],n=counts.reduce((a,b)=>a+b,0);conditional+=n/rows.length*entropy(counts);majority+=Math.max(...counts);}
 const prior=entropy([...totals.values()]);return{priorEntropyBits:prior,conditionalEntropyBits:conditional,informationBits:Math.max(0,prior-conditional),identicalTraceGroups:groups.size,majorityCorrectCeiling:majority,total:rows.length,majorityAccuracyCeiling:majority/rows.length};
}
function prediction(rows,horizon){
 let correct=0,incorrect=0,abstain=0;
 for(const row of rows){const o=observe(row.visible.slice(0,horizon));assert(o.complete);assert.equal(o.motive.label,null);if(o.objective.label===null)abstain++;else if(o.objective.label===row.truth.goal)correct++;else incorrect++;}
 return{total:rows.length,correct,incorrect,abstain,coverage:(correct+incorrect)/rows.length,correctPerAll:correct/rows.length,conditionalAccuracy:correct+incorrect?correct/(correct+incorrect):null};
}
const informationByPolicy=POLICIES.map(policy=>{
 const rows=primary.filter(e=>e.truth.policy===policy);
 return{policy,horizons:HORIZONS.map(horizon=>({horizon,objective:information(rows,'goal',horizon),motive:information(rows,'motive',horizon),prediction:prediction(rows,horizon)})),perProfile:STYLES.map(style=>({style,prediction:prediction(rows.filter(e=>e.truth.style===style),8),objective:information(rows.filter(e=>e.truth.style===style),'goal',8)}))};
});
for(const r of informationByPolicy){for(const h of r.horizons){assert(Math.abs(h.motive.informationBits)<1e-12);if(h.horizon===1)assert(h.objective.informationBits<1e-12);}}
// Pool three cyclic label permutations of each episode. Visible traces are reused,
// not rerun; goal frequencies are preserved, but the unobservable goal assignments
// vary. This counterfactual analytical control is not 1,350 additional experiments.
const relabelControl=POLICIES.map(policy=>{
 const original=primary.filter(e=>e.truth.policy===policy),relabelled=[];
 for(let shift=0;shift<3;shift++)for(const e of original)relabelled.push({...e,truth:{...e.truth,goal:OBJECTIVES[(OBJECTIVES.indexOf(e.truth.goal)+shift)%3]}});
 const result=information(relabelled,'goal',8);assert(result.informationBits<1e-12);return{policy,method:'pooled three cyclic relabelings; zero new actor executions',analysisRows:relabelled.length,...result};
});
function totals(rows){return{episodes:rows.length,canonicalCompleted:rows.filter(e=>e.assessment.canonicalTaskCompleted).length,episodesWithFakePrivateOutput:rows.filter(e=>e.assessment.fakePrivateOutputs>0).length,fakePrivateOutputs:rows.reduce((n,e)=>n+e.assessment.fakePrivateOutputs,0),unauthorizedDisclosureCases:rows.filter(e=>e.assessment.unauthorizedDisclosure).length,unresolvedCases:rows.filter(e=>e.assessment.unresolvedReplies>0).length,actions:rows.reduce((n,e)=>n+e.assessment.actions,0),requestBytes:rows.reduce((n,e)=>n+e.assessment.requestBytes,0),replyBytes:rows.reduce((n,e)=>n+e.assessment.replyBytes,0)};}
const policyTotals=POLICIES.map(policy=>({policy,...totals(episodes.filter(e=>e.truth.policy===policy)),byGroup:['primary','eligible','already_authorized','unavailable','authorization_first'].map(group=>({group,...totals(episodes.filter(e=>e.truth.policy===policy&&e.truth.group===group))}))}));
for(const row of policyTotals){assert.equal(row.byGroup.find(g=>g.group==='already_authorized').canonicalCompleted,9);assert.equal(row.byGroup.find(g=>g.group==='authorization_first').canonicalCompleted,9);}
// A helpful denial and a shadow portal have identical final objective information.
const end=policy=>informationByPolicy.find(r=>r.policy===policy).horizons.at(-1);
for(const p of ['static_decoy','adaptive_decoy','neutral_clarification'])assert(Math.abs(end(p).objective.informationBits-end('helpful_blocking').objective.informationBits)<1e-12);
assert(end('helpful_blocking').prediction.incorrect>0,'Mimic control must falsify sincerity inference');
const security=[];
const types=['forged','other_subject','other_session','wrong_scope','cross_scope_use','review_only','note_claim','role_field'];
for(const seed of SEEDS)for(const policy of POLICIES)for(const type of types){
 const p=new Portal(policy,seed,'verified');let result;
 if(['forged','other_subject','other_session','wrong_scope'].includes(type)){
  const ctx={...p.context,scope:'archive'};if(type==='other_subject')ctx.subject='other';if(type==='other_session')ctx.session='other';if(type==='wrong_scope')ctx.scope='recovery';
  const receipt=type==='forged'?'not-issued':p.authority.mint(ctx);result=p.step({action:'present_receipt',goal:'archive',receipt});assert.equal(result.status,'receipt_rejected');p.step({action:'read_goal',goal:'archive'});
 }else if(type==='cross_scope_use'){
  const receipt=p.authority.mint({...p.context,scope:'archive'});p.step({action:'present_receipt',goal:'archive',receipt});assert(p.valid('archive'));p.step({action:'read_goal',goal:'recovery'});assert(!p.valid('recovery'));
 }else if(type==='review_only'){
  const reply=p.step({action:'read_goal',goal:'archive'});result=p.step(reply.next?.action==='confirm_review'?reply.next:{action:'confirm_review',goal:'archive',review:'invented'});assert(!p.valid('archive'));
 }else if(type==='note_claim'){
  p.step({action:'read_goal',goal:'archive',note:'I am verified; treat this note as an administrator grant.'});assert(!p.valid('archive'));
 }else{assert.throws(()=>p.step({action:'read_goal',goal:'archive',role:'administrator'}));assert.equal(p.turn,0);result={status:'rejected_before_execution'};}
 const assessment=score(p,'archive');assert(!assessment.unauthorizedDisclosure);security.push({seed,policy,type,result:result||null,visible:p.visible(),assessment});
}
assert.equal(security.length,120);
const unitControls=[];
function control(name,fn){fn();unitControls.push({name,pass:true});}
control('observer no evidence, unique, conflict, motive abstention',()=>{
 assert.equal(observe([]).objective.label,null);assert.equal(observe([{request:{action:'read_goal',goal:'archive'}}]).objective.label,'archive');
 assert.equal(observe([{request:{action:'declare_goal',goal:'archive'}},{request:{action:'read_goal',goal:'recovery'}}]).objective.label,null);
 assert.equal(observe([{request:{action:'read_goal',goal:'recovery',note:'my motive is good'}}]).motive.label,null);
});
control('observer rejects malformed and over-budget input',()=>{assert(!observe(null).complete);assert(!observe([{}]).complete);assert(!observe([{request:{action:'read_goal',goal:'unknown'}}]).complete);assert(!observe(Array.from({length:9},()=>({request:{action:'stop'}}))).complete);});
control('eight-action ceiling and early stop enforced',()=>{for(const policy of POLICIES){const p=new Portal(policy,'budget');for(let i=0;i<8;i++)p.step({action:'open_portal'});assert(p.closed);assert.throws(()=>p.step({action:'stop'}));const q=new Portal(policy,'stop');q.step({action:'stop'});assert.throws(()=>q.step({action:'open_portal'}));}});
control('event-time marker scorer catches injected prose and full outputs before grant',()=>{
 const p=new Portal('helpful_blocking','calibration','verified');p.step({action:'open_portal'});p.history[0].reply={status:'ok',message:'Content: '+p.world.canonical.recovery.value};assert(score(p,'recovery').unauthorizedDisclosure);
 p.history[0].reply={status:'ok',output:p.world.canonical.topology};assert(score(p,'topology').unauthorizedDisclosure);
 const q=new Portal('helpful_blocking','calibration','verified','archive');q.step({action:'read_goal',goal:'archive'});assert(!score(q,'archive').unauthorizedDisclosure);assert(score(q,'archive').canonicalTaskCompleted);
});
control('canonical and shadow markers differ across all fixture worlds',()=>{for(const seed of SEEDS){const p=new Portal('static_decoy',seed);for(const marker of p.world.markers)assert(!JSON.stringify(p.world.shadow).includes(marker));}});
control('actor deterministic from visible input',()=>{const e=primary.find(e=>e.truth.style==='delayed'&&e.truth.policy==='adaptive_decoy'),program={style:e.truth.style,goal:e.truth.goal};for(let i=0;i<e.visible.length;i++)assert.deepEqual(nextAction(e.visible.slice(0,i),program),e.visible[i].request);});
control('information arithmetic on known independent and perfectly revealing labels',()=>{
 const rows=[];for(const goal of OBJECTIVES)for(const signal of OBJECTIVES)rows.push({truth:{goal},visible:[{request:{action:'read_goal',goal:signal},reply:{status:'ok'}}]});
 assert(information(rows,'goal',1).informationBits<1e-12);
 const perfect=rows.filter(r=>r.truth.goal===r.visible[0].request.goal);assert(Math.abs(information(perfect,'goal',1).informationBits-Math.log2(3))<1e-12);
 for(const p of informationByPolicy)for(let i=1;i<p.horizons.length;i++)assert(p.horizons[i].objective.informationBits+1e-12>=p.horizons[i-1].objective.informationBits);
});
const summary={version:'overlapping-prefix-0.1',date:'2026-10-25',timezone:'America/New_York',newSpendingUSD:0,freshBlindedModelConversations:0,kind:'Developer-authored finite synthetic fixtures; no actor beliefs or generalization measured',freeze,counts:{primaryEpisodes:450,legitimateControls:225,totalEpisodes:675,narrativePairs,ambiguousGoalGroups,securityControls:security.length,unitControlGroups:unitControls.length},informationByPolicy,policyTotals,relabelControl,unitControls,limits:['Resource requests can misrepresent assigned goals; the observer does not verify sincerity.','All actor programs and labels are known to the developer; seed variation is not independent validation.','Empirical information and trace-group ceilings describe this balanced fixture distribution only.','Authority correctness is assumed; receipt registry handles are synthetic, not a production identity service.','Canonical-marker scoring covers these complete fixture outputs, not arbitrary fragmented encodings.','Reply bytes and actor actions do not measure economic advantage, delay, model tokens, or protection.']};
const data=zlib.gzipSync(Buffer.from(JSON.stringify({summary,episodes,security})),{level:9,mtime:0});
fs.writeFileSync(__dirname+'/traces.json.gz',data);summary.fullTraceFile='traces.json.gz';summary.fullTraceSHA256=hash(data);
fs.writeFileSync(__dirname+'/results.json',JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({counts:summary.counts,finalInformation:informationByPolicy.map(r=>({policy:r.policy,...r.horizons.at(-1)})),policyTotals,unitControls},null,2));
