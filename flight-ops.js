/* CTA Mission Airplane V4.2 — fases e falhas RECREATIVAS, NÃO procedimentos aeronáuticos. */
(function(root,factory){const f=factory();if(typeof module==='object'&&module.exports)module.exports=f;root.CTAFlightOps=f;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const AIRPORTS={
 quente:{code:'CLV',name:'Aeroporto de Caldas Novas',city:'Rio Quente (via Caldas Novas)',runway:45},
 noronha:{code:'FEN',name:'Aeroporto de Fernando de Noronha',city:'Fernando de Noronha',runway:100},
 rio:{code:'SDU',name:'Aeroporto Santos Dumont',city:'Rio de Janeiro',runway:20},
 miami:{code:'MIA',name:'Aeroporto Internacional de Miami',city:'Miami',runway:90},
 fortaleza:{code:'FOR',name:'Aeroporto Internacional de Fortaleza',city:'Fortaleza',runway:125},
 brasilia:{code:'BSB',name:'Aeroporto Internacional de Brasília — Presidente Juscelino Kubitschek',city:'Brasília',runway:110},
 saoluis:{code:'SLZ',name:'Aeroporto Internacional de São Luís — Marechal Cunha Machado',city:'São Luís',runway:60}
};
const phases={roll:'🛫 ACELERAÇÃO NA PISTA',climb:'↗ SUBIDA INICIAL',cruise:'✈ CRUZEIRO E ROTA',approach:'⬇ APROXIMAÇÃO',flare:'🛬 TOQUE E DESACELERAÇÃO',emergency:'🚨 POUSO FORÇADO',landed:'✓ POUSO CONCLUÍDO',forced:'⚠ POUSO FORÇADO CONCLUÍDO'};
function toward(a,b,maxDelta){return a+Math.sign(b-a)*Math.min(Math.abs(b-a),Math.max(0,maxDelta))}
// Retorna dados de fase; altitudes são relativas à pista do jogo, não MSL real.
function animate(phase,phaseSeconds,player,dt){let p={...player};let next=phase;let done=false;
 if(phase==='roll'){p.speed=toward(p.speed,117,5.8*dt);p.alt=0;if(phaseSeconds>=19){next='climb';p.speed=Math.max(p.speed,113)}}
 else if(phase==='climb'){p.speed=toward(p.speed,145,4*dt);p.alt=toward(p.alt,280,9.5*dt);if(p.alt>=275){next='cruise'}}
 else if(phase==='approach'){p.speed=toward(p.speed,119,3.7*dt);p.alt=toward(p.alt,26,12.5*dt);if(phaseSeconds>=14&&p.alt<=32)next='flare'}
 else if(phase==='flare'){p.speed=toward(p.speed,0,8*dt);p.alt=toward(p.alt,0,4.2*dt);if(phaseSeconds>=16&&p.alt<=1){next='landed';p.alt=0;p.speed=0;done=true}}
 else if(phase==='emergency'){p.speed=toward(p.speed,96,4*dt);p.alt=toward(p.alt,0,Math.max(8,p.alt/17)*dt);if(phaseSeconds>=22&&p.alt<=12){next='forced';p.alt=0;p.speed=0;done=true}}
 return {phase:next,player:p,done};}
function collisionSeverity(a,b){const h=Math.hypot(a.x-b.x,a.z-b.z),v=Math.abs(a.alt-b.alt);if(h>=10||v>=15)return 0;return Math.round(Math.max(20,Math.min(80,40+(10-h)*3+(15-v)*.75)));}
function landingEligible(elapsed,waypointCount,phase,damage){return elapsed>=240&&waypointCount>=3&&phase==='landed'&&damage<100}
return {AIRPORTS,phases,toward,animate,collisionSeverity,landingEligible};
});
