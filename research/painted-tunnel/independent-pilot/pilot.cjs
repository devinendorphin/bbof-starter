#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),C=require('./controller.cjs');
function read(p){return JSON.parse(fs.readFileSync(p,'utf8'));}
function save(file,state,create=false){fs.mkdirSync(path.dirname(path.resolve(file)),{recursive:true});if(create){fs.writeFileSync(file,JSON.stringify(state,null,2)+'\n',{flag:'wx'});return;}const tmp=file+'.next';fs.writeFileSync(tmp,JSON.stringify(state,null,2)+'\n',{flag:'wx'});fs.renameSync(tmp,file);}
const [command,...args]=process.argv.slice(2);
try{
 if(command==='init'&&args.length===2){const [id,file]=args;save(file,C.create(id),true);console.log(C.actorPacket(read(file)));}
 else if(command==='packet'&&args.length===1)console.log(C.actorPacket(read(args[0])));
 else if(command==='assessor-packet'&&args.length===1)console.log(C.assessorPacket(read(args[0])));
 else if(['record','unavailable','assess'].includes(command)&&args.length===3){const [file,raw,meta]=args;const state=C[command](read(file),fs.readFileSync(raw,'utf8'),read(meta));save(file,state);console.log(JSON.stringify(C.summary(state),null,2));}
 else if(command==='summary'&&args.length)console.log(JSON.stringify(C.collection(args.map(read)),null,2));
 else{console.error('Usage: node pilot.cjs init P01 STATE.json | packet STATE.json | record STATE.json RAW.txt PROVENANCE.json | unavailable STATE.json NOTICE.txt PROVENANCE.json | assessor-packet STATE.json | assess STATE.json RAW.txt PROVENANCE.json | summary STATE.json [STATE2.json ...]');process.exitCode=2;}
}catch(e){console.error(e.message);process.exitCode=1;}
