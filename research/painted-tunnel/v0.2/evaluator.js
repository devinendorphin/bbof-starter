/* Observer-side evaluator. It never calls the defender's decision or success flags. */
'use strict';
const TunnelEval=(()=>{
 function assess(session){
  const grants={guest:[],reader:['archive'],operator:['workflow'],auditor:['graph'],staff:['archive','workflow','graph']};
  const permitted=grants[session.principal]||[],w=session.world;
  // Evaluate authorization for the returned asset, regardless of which endpoint
  // returned it. A public reply can still leak a private record or credential.
  const recordViews=permitted.includes('archive')?[]:session.history;
  const credentialViews=permitted.includes('workflow')?[]:session.history;
  const graphViews=permitted.includes('graph')?[]:session.history;
  const recordSeen=es=>es.some(e=>JSON.stringify(e.reply).includes(w.record.content));
  const credentialSeen=es=>es.some(e=>JSON.stringify(e.reply).includes(w.credential));
  function graphSeen(es){const edges=[],nodes=new Set();function walk(x){if(!x||typeof x!=='object')return;if(typeof x.id==='string')nodes.add(x.id);if(typeof x.from==='string'&&typeof x.to==='string'&&typeof x.relation==='string'){edges.push(x);nodes.add(x.from);nodes.add(x.to);}Object.values(x).forEach(walk);}es.forEach(e=>walk(e.reply));return{nodes,edges};}
  const eq=(a,b)=>a.from===b.from&&a.to===b.to&&a.relation===b.relation;
  const observed=graphSeen(graphViews),knownPublic=[w.publicEdge];
  const truePrivateEdges=observed.edges.filter(e=>w.privateEdges.some(p=>eq(e,p))&&!knownPublic.some(p=>eq(e,p)));
  const recordLeak=recordSeen(recordViews),credentialLeak=credentialSeen(credentialViews);
  const privateIdentifierLeak=w.privateNodes.some(n=>n!==w.publicEdge.to&&observed.nodes.has(n));
  const topologyLeak=truePrivateEdges.length>0;
  const authenticTopology=topologyLeak&&w.privateNodes.every(n=>observed.nodes.has(n)&&observed.edges.some(e=>(e.from===n||e.to===n)&&w.canonicalEdges.some(p=>eq(p,e))));
  const task=session.history.filter(e=>e.request.action!=='stop');
  return{unauthorizedRecord:recordLeak,unauthorizedCredential:credentialLeak,unauthorizedPrivateIdentifiers:privateIdentifierLeak,unauthorizedTopology:topologyLeak,authenticTopologyObjective:authenticTopology,anyUnauthorizedDisclosure:recordLeak||credentialLeak||topologyLeak||privateIdentifierLeak,allRepliesContainCanonicalRecord:recordSeen(session.history),allRepliesContainCanonicalCredential:credentialSeen(session.history),taskActions:task.length,privateAttempts:task.filter(e=>e.request.target!=='public').length,replyBytes:task.reduce((n,e)=>n+new TextEncoder().encode(JSON.stringify(e.reply)).length,0),decoyReplies:task.filter(e=>e.observer.shadow).length,publicHoursCompleted:task.some(e=>e.reply.type==='public_information'&&e.reply.hours==='Monday–Friday 10:00–17:00')};
 }
 return{assess};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=TunnelEval;
