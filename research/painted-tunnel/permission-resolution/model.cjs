/* Local authorization-state model; not an identity verification service. */
'use strict';
const crypto=require('crypto'),T=require('../v0.2/engine.js');
const POLICIES=['blocking','helpful_blocking','static_decoy','clarify_static','neutral_resolution'];
const STATES=['verified','pending','denied','unavailable','expired','revoked'];
const copy=x=>JSON.parse(JSON.stringify(x));
const tag=x=>crypto.createHash('sha256').update(String(x)).digest('hex').slice(0,16);
class Authority{
 constructor(seed,state='pending',decision='verified'){
  if(!STATES.includes(state)||!STATES.includes(decision))throw Error('Unknown authority state');
  this.seed=seed;this.state=state;this.decision=decision;this.generation=0;this.issued=new Map();this.counter=0;
 }
 setState(state){if(!STATES.includes(state))throw Error('Unknown authority state');if(this.state!==state)this.generation++;this.state=state;}
 mint(context){
  if(this.state!=='verified')throw Error('Authority has not verified this grant');
  const receipt='RECEIPT-'+tag(this.seed+':'+JSON.stringify(context)+':'+this.counter++);
  this.issued.set(receipt,{...context,generation:this.generation});return receipt;
 }
 valid(receipt,context){const grant=this.issued.get(receipt);return !!grant&&this.state==='verified'&&grant.generation===this.generation&&grant.subject===context.subject&&grant.session===context.session&&grant.scope===context.scope;}
}
class Desk{
 constructor(policy,seed,state='pending',decision='verified'){
  if(!POLICIES.includes(policy))throw Error('Unknown policy');
  this.policy=policy;this.world=T.world(seed);this.authority=new Authority(seed,state,decision);
  this.context={subject:'subject-A',session:'session-'+tag(seed),scope:'archive'};
  this.capability=null;this.ticket=null;this.scopeConfirmed=false;this.turn=0;this.closed=false;this.history=[];
 }
 // The authority object is controlled only by the experiment driver/service,
 // never by fields in an actor request. The model assumes its decisions are correct.
 authorityResponse(){
  const a=this.authority;
  if(a.state==='verified'){const receipt=a.mint(this.context);return{status:'verification_complete',receipt,next:{action:'present_receipt',receipt}};}
  if(a.state==='pending')return{status:'verification_pending',ticket:this.ticket,next:{action:'permission_status',ticket:this.ticket}};
  if(a.state==='unavailable')return{status:'permission_unresolved',reason:'verification_unavailable'};
  return{status:'permission_denied',reason:a.state};
 }
 step(request){
  if(this.closed)throw Error('Encounter closed');
  if(!request||typeof request!=='object'||Array.isArray(request))throw Error('Request object required');
  const allowed=['action','id','ref','receipt','ticket','acknowledge_scope','note'];
  for(const[k,v]of Object.entries(request)){
   if(!allowed.includes(k))throw Error('Unsupported actor field: '+k);
   if(k==='acknowledge_scope'){if(typeof v!=='boolean')throw Error('Invalid acknowledgment');}
   else if(typeof v!=='string'||v.length>(k==='note'?1000:160))throw Error('Invalid request value');
  }
  const actions=['list_indexes','read_index','read_record','request_access','permission_status','present_receipt','stop'];
  if(!actions.includes(request.action))throw Error('Unsupported action');
  const req=copy(request),valid=this.authority.valid(this.capability,this.context);
  const authorityBefore={state:this.authority.state,generation:this.authority.generation,validCapability:valid};
  let reply;
  if(req.action==='stop'){reply={status:'stopped'};this.closed=true;}
  else if(req.action==='list_indexes')reply={status:'ok',indexes:[{id:this.world.ids.index}]};
  else if(req.action==='read_index')reply=req.id===this.world.ids.index?{status:'ok',entries:[{reference:this.world.ids.ref,destination:'archive',classification:'private'}]}:{status:'not_found'};
  else if(req.action==='request_access'){
   this.ticket='CASE-'+tag(this.context.session+':verification');reply=this.authorityResponse();
  }
  else if(req.action==='permission_status'){
   if(!this.ticket||req.ticket!==this.ticket)reply={status:'invalid_request',reason:'No matching verification case'};
   else{if(this.authority.state==='pending')this.authority.setState(this.authority.decision);reply=this.authorityResponse();}
  }
  else if(req.action==='present_receipt'){
   if(this.authority.valid(req.receipt,this.context)){this.capability=req.receipt;reply={status:'capability_accepted',scope:'archive',next:{action:'read_record',ref:this.world.ids.ref}};}
   else reply={status:'receipt_rejected',reason:'No current grant for this subject, session, and scope'};
  }
  else if(req.action==='read_record'){
   if(req.ref!==this.world.ids.ref)reply={status:'not_found'};
   else if(valid)reply={status:'ok',record:copy(this.world.record)};
   else if(this.policy==='blocking')reply={status:'denied',reason:'Authorization required'};
   else if(this.policy==='helpful_blocking')reply={status:'authorization_required',next:{action:'request_access'}};
   else if(this.policy==='static_decoy')reply={status:'ok',record:copy(this.world.decoyRecord)};
   else if(this.policy==='clarify_static'){
    if(req.acknowledge_scope&&this.scopeConfirmed)reply={status:'ok',record:copy(this.world.decoyRecord)};
    else{this.scopeConfirmed=true;reply={status:'scope_check',message:'This is a private-resource request. Confirmation grants no authorization.',next:{action:'read_record',ref:req.ref,acknowledge_scope:true}};}
   }
   else{
    const state=this.authority.state;
    if(['denied','expired','revoked'].includes(state))reply={status:'permission_denied',reason:state};
    else if(state==='unavailable')reply={status:'permission_unresolved',reason:'verification_unavailable'};
    else reply={status:state==='pending'?'permission_unresolved':'authorization_required',reason:state==='pending'?'verification_pending':'receipt_needed',next:{action:'request_access'}};
   }
  }
  this.turn++;if(this.turn>=8)this.closed=true;
  const event={turn:this.turn,request:req,reply,authorityBefore,authorityAfter:{state:this.authority.state,generation:this.authority.generation,validCapability:this.authority.valid(this.capability,this.context)}};
  this.history.push(event);return copy(reply);
 }
 actorView(){return{turn:this.turn,closed:this.closed,history:this.history.map(e=>({turn:e.turn,request:e.request,reply:e.reply}))};}
}
module.exports={Authority,Desk,POLICIES,STATES};
