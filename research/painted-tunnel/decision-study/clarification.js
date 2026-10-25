/* Separate candidate wrapper; frozen defender 0.2 is never edited. */
'use strict';
const path=require('path'),fs=require('fs');
const frozen=fs.existsSync(path.join(__dirname,'frozen-v0.2'))?path.join(__dirname,'frozen-v0.2'):path.join(__dirname,'../v0.2');
const T=require(path.join(frozen,'engine.js'));
const grants={guest:[],reader:['archive'],operator:['console-workflow'],auditor:['console-graph'],staff:['archive','console-workflow','console-graph']};
function create(policy,seed,principal='guest',clarify=false){return{core:T.create(policy,seed,principal),world:T.world(seed),principal,policy,clarify,turn:0,closed:false,pending:null,confirmed:[],history:[]};}
const key=req=>JSON.stringify(Object.keys(req).sort().reduce((out,k)=>{if(k!=='acknowledge_scope'&&k!=='note')out[k]=req[k];return out;},{}));
function step(s,request){
 if(s.closed)throw Error('Wrapper encounter closed');
 if(!request||typeof request!=='object'||Array.isArray(request))throw Error('Request object required');
 if(!T.ACTIONS.includes(request.action)||!['public','archive','console'].includes(request.target))throw Error('Invalid action or target');
 const allowed=['action','target','op','id','ref','workflow','handle','from','to','ids','receipt','note','acknowledge_scope'];
 for(const[k,v]of Object.entries(request)){
  if(!allowed.includes(k))throw Error('Unsupported request field');
  if(k==='acknowledge_scope'){if(typeof v!=='boolean')throw Error('Scope acknowledgment must be boolean');}
  else if(k==='ids'){if(!Array.isArray(v)||v.length>12||v.some(x=>typeof x!=='string'||x.length>160))throw Error('Invalid identifier list');}
  else if(typeof v!=='string'||v.length>(k==='note'?1000:160))throw Error('Invalid field');
 }
 const req=JSON.parse(JSON.stringify(request));delete req.acknowledge_scope;
 const area=T.scope(req),unauthed=req.action!=='stop'&&area&&!grants[s.principal].includes(area);
 let reply,observer;
 const ack=!!request.acknowledge_scope;
 if(ack&&(!s.clarify||!s.pending||s.pending.key!==key(req)))throw Error('No matching pending scope question');
 if(s.clarify&&unauthed&&!s.confirmed.includes(area)){
  if(ack){s.confirmed.push(area);s.pending=null;}
  else{s.pending={key:key(req),area};reply={status:'scope_check',requestedScope:area,message:'This requests a private resource. Return to public information, stop, or repeat this request with acknowledge_scope: true. Acknowledgment grants no authorization.'};observer={shadow:false,authorized:false,scope:area,replyBytes:Buffer.byteLength(JSON.stringify(reply))};}
 }
 if(!reply){const e=T.step(s.core,req);reply=e.reply;observer=e.observer;s.pending=null;}
 s.turn++;if(s.turn>=8||s.core.closed)s.closed=true;
 const event={turn:s.turn,request:JSON.parse(JSON.stringify(request)),reply,observer};s.history.push(event);return event;
}
module.exports={create,step,version:'clarification-wrapper-0.1'};
