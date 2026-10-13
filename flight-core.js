/* CTA Mission Airplane — lógica testável e compartilhada com navegador/Node. */
(function(root,factory){const x=factory();if(typeof module==='object'&&module.exports)module.exports=x;root.CTACore=x;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const missions=[
 {id:'quente',name:'Rio Quente — Goiás',short:'Rio Quente',icon:'♨️',theme:'resort',tag:'Cerrado, piscinas termais e natureza',landmarks:['Parque das Águas','Jardins do Cerrado','Circuito de Piscinas'],lat:-17.7749,lon:-48.7599},
 {id:'noronha',name:'Fernando de Noronha — Pernambuco',short:'Fernando de Noronha',icon:'🏝️',theme:'island',tag:'Ilhas, baías e mar turquesa',landmarks:['Baía do Sancho','Morro do Pico','Praia do Leão'],lat:-3.8538,lon:-32.4233},
 {id:'rio',name:'Rio de Janeiro — RJ',short:'Rio de Janeiro',icon:'⛰️',theme:'rio',tag:'Cristo, Pão de Açúcar e Copacabana',landmarks:['Cristo Redentor','Pão de Açúcar','Praia de Copacabana'],lat:-22.9068,lon:-43.1729},
 {id:'miami',name:'Miami — Estados Unidos',short:'Miami',icon:'🌴',theme:'miami',tag:'Skyline, Miami Beach e baía',landmarks:['Downtown Miami','Biscayne Bay','Miami Beach'],lat:25.7617,lon:-80.1918},
 {id:'fortaleza',name:'Fortaleza — Ceará',short:'Fortaleza',icon:'☀️',theme:'fortaleza',tag:'Orla, praias e sol tropical',landmarks:['Praia de Iracema','Beira-Mar','Praia do Futuro'],lat:-3.7319,lon:-38.5267},
 {id:'saoluis',name:'São Luís — Maranhão',short:'São Luís',icon:'🌅',theme:'saoluis',tag:'Centro Histórico, cultura e orla',landmarks:['Centro Histórico','Palácio dos Leões','Praia do Calhau'],lat:-2.5297,lon:-44.3028},
 {id:'brasilia',name:'Brasília — Distrito Federal',short:'Brasília',icon:'🏛️',theme:'brasilia',tag:'Congresso, Catedral e Lago Paranoá',landmarks:['Congresso Nacional','Catedral Metropolitana','Ponte JK'],lat:-15.7939,lon:-47.8828}
];
// Rota turística em três trechos amplos, dentro do mapa local do simulador.
// Projetada para ~5 a 6 min em velocidade de cruzeiro, sem encerrar em segundos.
const START={x:-205,z:-205,alt:280,heading:45,speed:138};
const route=[{x:-185,z:200,alt:280},{x:185,z:-195,alt:310},{x:-190,z:190,alt:250}];
const MIN_FLIGHT_SECONDS=240;
// Escala recreativa: aceleração mantém sua utilidade sem encurtar a missão a poucos segundos.
const worldSpeed=(indicatedKnots)=>3.6+Math.max(0,Math.min(320,Number(indicatedKnots)||0))*.0065;
const routeLength=()=>[START,...route].reduce((sum,p,i,pts)=>i?sum+Math.hypot(p.x-pts[i-1].x,p.z-pts[i-1].z):0,0);
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const norm=a=>(a%360+360)%360;
const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const bearing=(a,b)=>norm(Math.atan2(b.x-a.x,b.z-a.z)*180/Math.PI);
const turnDelta=(from,to)=>(norm(to-from+540)-180);
const separation=(a,b)=>({horizontal:dist(a,b),vertical:Math.abs(a.alt-b.alt),warning:dist(a,b)<33&&Math.abs(a.alt-b.alt)<45,critical:dist(a,b)<17&&Math.abs(a.alt-b.alt)<25});
const cleanName=v=>typeof v==='string'?v.replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,18):'';
const cleanRoom=v=>typeof v==='string'?v.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6):'';
const safeState=s=>{
 if(!s||typeof s!=='object')return null;
 for(const k of ['x','z','alt','heading','speed'])if(typeof s[k]!=='number'||!Number.isFinite(s[k]))return null;
 if(Math.abs(s.x)>2000||Math.abs(s.z)>2000||s.alt<0||s.alt>3000||s.speed<0||s.speed>600)return null;
 return {x:Math.round(s.x*10)/10,z:Math.round(s.z*10)/10,alt:Math.round(s.alt),heading:Math.round(norm(s.heading)),speed:Math.round(s.speed)};
};

const WEATHER=[
 {id:'clear',label:'Céu aberto',icon:'☀',severity:0,visibility:1,speedFactor:1},
 {id:'fog',label:'Névoa',icon:'☁',severity:1,visibility:.52,speedFactor:.93},
 {id:'rain',label:'Chuva forte',icon:'☂',severity:2,visibility:.62,speedFactor:.88},
 {id:'turbulence',label:'Turbulência',icon:'≋',severity:2,visibility:.86,speedFactor:.9},
 {id:'lowvis',label:'Visibilidade crítica',icon:'⚠',severity:3,visibility:.28,speedFactor:.78}
];
const WEATHER_CYCLE=[7,9,10,10,10,9];
function weatherAt(seconds){let t=Math.max(0,Number(seconds)||0)%WEATHER_CYCLE.reduce((a,b)=>a+b,0);for(let i=0;i<WEATHER_CYCLE.length;i++){if(t<WEATHER_CYCLE[i])return WEATHER[Math.min(i,4)];t-=WEATHER_CYCLE[i]}return WEATHER[0]}
function rankResults(results){return results.filter(p=>p&&p.finished&&Number.isFinite(p.elapsed)&&p.elapsed>=MIN_FLIGHT_SECONDS).sort((a,b)=>((a.incidents||0)>0)-((b.incidents||0)>0)||a.elapsed-b.elapsed)}
function msClock(seconds){const s=Math.max(0,Math.floor(seconds||0));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function raceEligible(result){return !!result&&!!result.finished&&result.incidents===0&&Number.isFinite(result.elapsed)&&result.elapsed>=MIN_FLIGHT_SECONDS}
// Coordenadas de referência aproximadas, para contexto educativo; não são waypoints de navegação.
const landmarksGeo={
 quente:[[-17.772,-48.758],[-17.780,-48.764],[-17.776,-48.753]],
 noronha:[[-3.851,-32.448],[-3.850,-32.423],[-3.871,-32.438]],
 rio:[[-22.9519,-43.2105],[-22.9486,-43.1566],[-22.9711,-43.1843]],
 miami:[[25.774,-80.190],[25.787,-80.166],[25.794,-80.132]],
 fortaleza:[[-3.719,-38.512],[-3.725,-38.493],[-3.750,-38.453]],
 brasilia:[[-15.799,-47.866],[-15.798,-47.866],[-15.828,-47.827]],
 saoluis:[[-2.532,-44.303],[-2.527,-44.307],[-2.493,-44.245]]
};

function arrival(p,wp){return dist(p,wp)<=18&&Math.abs(p.alt-wp.alt)<110;}
return {missions,route,START,MIN_FLIGHT_SECONDS,worldSpeed,routeLength,clamp,norm,dist,bearing,turnDelta,separation,cleanName,cleanRoom,safeState,arrival,WEATHER,weatherAt,rankResults,raceEligible,msClock,landmarksGeo};
});
