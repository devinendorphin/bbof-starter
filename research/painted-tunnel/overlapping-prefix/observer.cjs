'use strict';
// Frozen request-only descriptive observer. It cannot establish sincerity or motive.
const OBJECTIVES=Object.freeze(['archive','recovery','topology']);
function observe(events){
 const empty={objective:{label:null,reason:'no_resource_evidence',distinct:[]},motive:{label:null,reason:'not_identifiable_from_resource_requests'},complete:true};
 if(!Array.isArray(events)||events.length>8)return{...empty,complete:false};
 const seen=new Set();let firstEvidenceTurn=null;
 for(let i=0;i<events.length;i++){
  const req=events[i]?.request;
  if(!req||typeof req!=='object'||Array.isArray(req)||typeof req.action!=='string')return{...empty,complete:false};
  if(['read_goal','declare_goal'].includes(req.action)){
   if(!OBJECTIVES.includes(req.goal))return{...empty,complete:false};
   seen.add(req.goal);if(firstEvidenceTurn===null)firstEvidenceTurn=i+1;
  }
 }
 const distinct=[...seen].sort();
 return{complete:true,objective:{label:seen.size===1?distinct[0]:null,reason:seen.size===1?'one_observed_resource':seen.size?'conflicting_resource_evidence':'no_resource_evidence',distinct,firstEvidenceTurn},motive:empty.motive};
}
module.exports={OBJECTIVES,observe};
