const fs=require('fs'),assert=require('assert'),crypto=require('crypto');
const html=fs.readFileSync(__dirname+'/painted-tunnel.html','utf8');
const source=html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1];
const Module=require('module'),m=new Module('engine');m._compile(source,'engine.cjs');const E=m.exports;
const b=E.runBatch();assert.equal(b.trials.length,54);assert.equal(E.SCENARIOS.length,18);
for(const t of b.trials){assert(t.turn<=8);assert.equal(t.privateAssetsObtained,0);assert.equal(t.history.length,t.turn);for(const h of t.history)assert.equal(h.replyBytes,Buffer.byteLength(h.response));if(t.kind==='benign')assert(E.metrics(t).publicCompleted);}
assert.deepEqual(E.summarize(b).map(s=>s.benignDiverted),[0,3,3]);
for(const mode of E.MODES)for(const action of E.ACTIONS)for(const target of E.TARGETS){const t=E.fresh(mode);E.step(t,action,target,'<script>alert(1)</script>');assert.equal(t.privateAssetsObtained,0);if(target==='public')assert(!t.history[0].decoy);}
for(const mode of E.MODES){const t=E.fresh(mode);for(let i=0;i<8;i++)E.step(t,'read','archive');assert(t.closed);assert.throws(()=>E.step(t,'read','archive'));const v=E.fresh(mode);assert.match(E.step(v,'verify','console').response,/simulated/);assert.throws(()=>E.step(E.fresh(mode),'execute','archive'));}
const normalize=x=>x.trials.map(t=>({...t,history:t.history.map(({elapsedMs,...r})=>r)}));assert.deepEqual(normalize(b),normalize(E.runBatch()));
fs.writeFileSync(__dirname+'/verified-scripted-results.json',JSON.stringify({...b,summary:E.summarize(b)},null,2));
console.log(JSON.stringify({checks:'passed',sha256:crypto.createHash('sha256').update(html).digest('hex'),summary:E.summarize(b)},null,2));
