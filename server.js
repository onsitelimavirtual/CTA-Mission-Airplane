/* CTA Mission Airplane — servidor de salas em memória, sem pacotes externos. */
'use strict';
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const Core=require('./flight-core.js');
const PORT=Number(process.env.PORT)||8080;
const HOST=process.env.HOST||'0.0.0.0';
const ROOT=__dirname;
const MAX_PLAYERS=5,MAX_BODY=2048,TTL=40_000;
const rooms=new Map();
const allowed={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/flight-core.js':'flight-core.js','/game.js':'game.js','/atc-core.js':'atc-core.js','/nav-core.js':'nav-core.js','/math-core.js':'math-core.js','/logo.png':'logo.png','/aviao-cta-pro.svg':'aviao-cta-pro.svg'};
for(const m of Core.missions){allowed['/'+m.id+'.webp']=''+m.id+'.webp';allowed['/cenario-'+m.id+'.webp']='cenario-'+m.id+'.webp'}for(const m of Core.missions){allowed['/explorar-'+m.id+'.webp']='explorar-'+m.id+'.webp';allowed['/explorar-'+m.id+'-detalhe.webp']='explorar-'+m.id+'-detalhe.webp';allowed['/explorar-'+m.id+'-panorama.webp']='explorar-'+m.id+'-panorama.webp';allowed['/explorar-'+m.id+'-aproximacao.webp']='explorar-'+m.id+'-aproximacao.webp'}allowed['/arte-conceito-cta.webp']='arte-conceito-cta.webp';allowed['/arte-panoramica-rio.webp']='arte-panoramica-rio.webp';
const mimes={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'};
function send(res,status,data){if(res.writableEnded)return;res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
function parse(req){return new Promise((resolve,reject)=>{let body='',size=0;req.on('data',b=>{size+=b.length;if(size>MAX_BODY){reject(new Error('Corpo muito grande'));req.destroy();return;}body+=b;});req.on('end',()=>{try{resolve(JSON.parse(body||'{}'))}catch{reject(new Error('JSON inválido'))}});req.on('error',reject);});}
function id(){return crypto.randomBytes(12).toString('hex');}
function roomCode(){return crypto.randomBytes(3).toString('hex').toUpperCase();}
function standings(room){return Core.rankResults([...room.players.values()].map(p=>p.race?.result).filter(Boolean));}
function roomPlayers(room){return [...room.players.values()].map(p=>({id:p.id,name:p.name,state:p.state||null,progress:p.race?.progress||0,incidents:p.race?.incidents||0,finished:!!p.race?.result}));}
function payload(room){return {type:'snapshot',room:room.code,mission:room.mission,players:roomPlayers(room),standings:standings(room),maxPlayers:MAX_PLAYERS,host:room.host,roundId:room.roundId};}
function freshRace(){return {startedAt:0,progress:0,incidents:0,incidentTypes:new Set(),result:null};}
function streamEvent(res,event,data){if(res.destroyed||res.writableEnded)return;res.write('event: '+event+'\ndata: '+JSON.stringify(data)+'\n\n');}
function broadcast(room){const data=payload(room);for(const p of room.players.values())if(p.stream)try{streamEvent(p.stream,'snapshot',data)}catch{p.stream=null}}
function getAuth(data){const room=rooms.get(Core.cleanRoom(data.room));if(!room)return null;const p=room.players.get(String(data.token||''));if(!p)return null;return {room,p};}
function cleanup(){const now=Date.now();for(const room of rooms.values()){for(const [token,p] of room.players){if(now-p.lastSeen>TTL){if(p.stream){try{p.stream.end()}catch{}}room.players.delete(token)}}if(!room.players.size){rooms.delete(room.code);continue}if(![...room.players.values()].some(p=>p.id===room.host))room.host=room.players.values().next().value.id;broadcast(room);}}
const cleanupTimer=setInterval(cleanup,8000);cleanupTimer.unref();
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 const common={'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Permissions-Policy':'geolocation=(), microphone=(), camera=()'};
 for(const[k,v] of Object.entries(common))res.setHeader(k,v);
 if(req.method==='GET'&&allowed[url.pathname]){
   const file=path.join(ROOT,allowed[url.pathname]);try{const stat=fs.statSync(file);res.writeHead(200,{'Content-Type':mimes[path.extname(file)],'Content-Length':stat.size,'Cache-Control':'public, max-age=300'});fs.createReadStream(file).pipe(res)}catch{send(res,404,{error:'Arquivo não encontrado'})}return;
 }
 if(req.method==='GET'&&url.pathname==='/api/health')return send(res,200,{ok:true,service:'CTA Mission Airplane',rooms:rooms.size});
 if(req.method==='GET'&&url.pathname==='/api/stream'){
   const auth=getAuth({room:url.searchParams.get('room'),token:url.searchParams.get('token')});if(!auth)return send(res,403,{error:'Sessão inválida'});
   auth.p.lastSeen=Date.now();res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no'});res.write(': conectado\n\n');if(auth.p.stream){try{auth.p.stream.end()}catch{}}
   auth.p.stream=res;streamEvent(res,'snapshot',payload(auth.room));const interval=setInterval(()=>{if(!res.writableEnded)res.write(': ping\n\n')},12000);interval.unref();req.on('close',()=>{clearInterval(interval);if(auth.p.stream===res)auth.p.stream=null});return;
 }
 if(req.method==='POST'&&url.pathname.startsWith('/api/')){
   const origin=req.headers.origin;const host=req.headers.host;
   if(origin){try{if(new URL(origin).host!==host)return send(res,403,{error:'Origem não autorizada'})}catch{return send(res,403,{error:'Origem inválida'})}}
   if(!(req.headers['content-type']||'').includes('application/json'))return send(res,415,{error:'Envie application/json'});
   let data;try{data=await parse(req)}catch(e){if(!res.destroyed)send(res,400,{error:e.message});return;}
   if(url.pathname==='/api/join'){
     const name=Core.cleanName(data.name),requested=Core.cleanRoom(data.room);
     if(!name)return send(res,400,{error:'Informe um apelido válido'});
     if(requested&&requested.length!==6)return send(res,400,{error:'Código precisa ter seis caracteres'});
     let code=requested||roomCode(),room=rooms.get(code);
     if(!room){if(rooms.size>=100)return send(res,503,{error:'Limite temporário de salas'});room={code,mission:Core.missions.some(m=>m.id===data.mission)?data.mission:'quente',host:null,roundId:id(),players:new Map()};rooms.set(code,room)}
     if(room.players.size>=MAX_PLAYERS)return send(res,409,{error:'Sala completa (máximo cinco jogadores)'});
     const p={token:id(),id:id().slice(0,7),name,stream:null,lastSeen:Date.now(),lastState:0,state:null,race:freshRace()};room.players.set(p.token,p);if(!room.host)room.host=p.id;
     send(res,200,{room:code,token:p.token,playerId:p.id,mission:room.mission,host:room.host,roundId:room.roundId,maxPlayers:MAX_PLAYERS});broadcast(room);return;
   }
   const auth=getAuth(data);if(!auth)return send(res,403,{error:'Sessão inválida ou encerrada'});
   const {room,p}=auth;
   if(url.pathname==='/api/state'){
     const state=Core.safeState(data.state);if(!state)return send(res,422,{error:'Estado do voo inválido'});
     const now=Date.now();if(now-p.lastState<75)return send(res,429,{error:'Atualizações muito frequentes'});
     const old=p.state;if(old){const elapsedSec=Math.max(.075,(now-p.lastState)/1000);if(Core.dist(old,state)>Math.max(17,elapsedSec*48+8))return send(res,422,{error:'Salto de posição incompatível'});}
     p.lastSeen=now;p.lastState=now;p.state=state;
     const race=p.race;if(!race.startedAt)race.startedAt=now;
     if(!race.result){const w=Core.route[race.progress];if(w&&Core.arrival(state,w))race.progress++;
       if(Math.abs(state.x)>=439||Math.abs(state.z)>=439)race.incidentTypes.add('boundary');
       for(const rival of room.players.values()){if(rival===p||!rival.state)continue;const sep=Core.separation(state,rival.state);if(sep.critical){race.incidentTypes.add('collision:'+rival.id);rival.race.incidentTypes.add('collision:'+p.id);}}
       race.incidents=race.incidentTypes.size;
     }
     send(res,200,{ok:true,progress:race.progress,incidents:race.incidents});broadcast(room);return;
   }
   if(url.pathname==='/api/mission'){
     if(p.id!==room.host)return send(res,403,{error:'Somente o anfitrião altera a missão'});
     if(!Core.missions.some(m=>m.id===data.mission))return send(res,422,{error:'Destino inválido'});
     room.mission=data.mission;room.roundId=id();for(const pilot of room.players.values()){pilot.state=null;pilot.lastState=0;pilot.race=freshRace();}
     p.lastSeen=Date.now();send(res,200,{ok:true});broadcast(room);return;
   }
   if(url.pathname==='/api/finish'){
     if(p.race.result)return send(res,200,{ok:true,result:p.race.result,standings:standings(room)});
     if(p.race.progress<3||!p.race.startedAt)return send(res,409,{error:'Os três marcos da rota ainda não foram verificados pelo servidor'});
     const declared=Number(data.incidents);if(!Number.isInteger(declared)||declared<0||declared>50)return send(res,422,{error:'Contagem de incidentes inválida'});
     const elapsed=Math.round((Date.now()-p.race.startedAt)/10)/100;
     if(elapsed<Core.MIN_FLIGHT_SECONDS)return send(res,422,{error:'A missão exige pelo menos 04:00 de voo para validar a chegada.'});
     p.race.result={id:p.id,name:p.name,elapsed,incidents:Math.max(declared,p.race.incidents),finished:true};
     p.lastSeen=Date.now();send(res,200,{ok:true,result:p.race.result,standings:standings(room)});broadcast(room);return;
   }
   if(url.pathname==='/api/leave'){
     if(p.stream){try{p.stream.end()}catch{}}room.players.delete(p.token);if(!room.players.size)rooms.delete(room.code);else {if(room.host===p.id)room.host=room.players.values().next().value.id;broadcast(room)}return send(res,200,{ok:true});
   }
   return send(res,404,{error:'Rota desconhecida'});
 }
 send(res,404,{error:'Não encontrado'});
});
if(require.main===module){server.listen(PORT,HOST,()=>console.log('CTA Mission Airplane em http://localhost:'+PORT));}
module.exports={server,rooms};
