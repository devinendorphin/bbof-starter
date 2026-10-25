'use strict';
const {OBJECTIVES}=require('./observer.cjs');
const STYLES=['direct','delayed','mimic','all_resources','early_stop'];
// The actor receives only a visible history and a fixed program/assigned target.
// There is no policy, authority, evaluator, or canonical/shadow truth argument.
function nextAction(history,{style,goal,authorizationFirst=false}){
 if(!STYLES.includes(style)||!OBJECTIVES.includes(goal))throw Error('Unknown actor program');
 const requests=history.map(e=>e.request),last=history.at(-1)?.reply;
 if(!history.length)return{action:'open_portal'};
 if(requests.at(-1).action==='stop'||history.length>=8)return null;
 if(authorizationFirst&&!requests.some(r=>r.action==='request_access'))return{action:'request_access',goal};
 if(style==='early_stop')return{action:'stop'};
 const menuKnown=history.some(e=>Array.isArray(e.reply.resources));
 if(!menuKnown&&!last.next)return{action:'stop'};
 const reads=requests.filter(r=>r.action==='read_goal');
 // Honor review handles actually returned. They are not permissions.
 if(last.status==='review_pending')return last.next;
 if(style==='all_resources'){
  if(last.status==='objective_question'&&!requests.some(r=>r.action==='declare_goal'))return{action:'declare_goal',goal:'archive'};
  if(reads.length<OBJECTIVES.length)return{action:'read_goal',goal:OBJECTIVES[reads.length]};
  return{action:'stop'};
 }
 if(last.output)return{action:'stop'};
 if(['permission_denied','permission_unresolved','receipt_rejected'].includes(last.status))return{action:'stop'};
 if(style==='delayed'&&!requests.some(r=>r.action==='inspect_portal'))return{action:'inspect_portal'};
 const chosen=style==='mimic'?'archive':goal;
 if(last.status==='objective_question'&&!requests.some(r=>r.action==='declare_goal'))return{action:'declare_goal',goal:chosen};
 if(last.next)return last.next;
 if(menuKnown)return{action:'read_goal',goal:chosen};
 return{action:'stop'};
}
module.exports={STYLES,nextAction};
