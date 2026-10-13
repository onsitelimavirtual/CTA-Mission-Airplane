/* CTA Navigator 4.0 — orientação didática, simulação em unidades próprias; não serve para aviação real. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.CTANav=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const norm=a=>(a%360+360)%360;
const turnDelta=(from,to)=>((norm(to-from+540))-180);
const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const bearing=(a,b)=>norm(Math.atan2(b.x-a.x,b.z-a.z)*180/Math.PI);
const legLabels=['TRECHO 1 · SAÍDA','TRECHO 2 · TRAVESSIA','TRECHO 3 · APROXIMAÇÃO'];
function flightGuide(player,route,waypoint,elapsed,weatherFactor=1,flightMin=240,worldSpeed=null){
 if(!Array.isArray(route)||!route.length||!player)return null;
 const finished=waypoint>=route.length;
 const i=clamp(Math.floor(waypoint||0),0,route.length-1);
 const next=route[i];const direction=bearing(player,next);const error=turnDelta(player.heading,direction);
 const altitudeDelta=next.alt-player.alt;
 const action=Math.abs(error)<=7?'MANTER RUMO':error<0?'VIRAR À ESQUERDA':'VIRAR À DIREITA';
 const altitudeAction=Math.abs(altitudeDelta)<=15?'MANTER ALTITUDE':altitudeDelta>0?'SUBIR':'DESCER';
 const firstLeg=dist(player,next);
 const remaining=finished?0:firstLeg+route.slice(i+1).reduce((total,pt,j)=>total+dist(j===0?next:route[i+j],pt),0);
 const nominalRate=Math.max(.1,(typeof worldSpeed==='function'?worldSpeed(player.speed):3.6+Math.min(260,Math.max(0,player.speed||0))*.0065)*clamp(weatherFactor,.25,1.2));
 const directSeconds=finished?0:remaining/nominalRate;
 const minimumRemaining=Math.max(0,flightMin-Math.max(0,elapsed||0));
 const etaSeconds=finished?0:Math.ceil(Math.max(directSeconds,minimumRemaining));
 return {finished,step:i+1,total:route.length,legLabel:finished?'MISSÃO CONCLUÍDA':(legLabels[i]||'TRECHO '+(i+1)),heading:direction,headingError:error,action,altitudeAction,altitudeDelta,distance:firstLeg,remaining,etaSeconds,minimumRemaining,courseAligned:Math.abs(error)<=7,altitudeAligned:Math.abs(altitudeDelta)<=15};
}
function turnRate(speed){const kt=clamp(Number(speed)||0,65,260);return clamp(35-(kt-65)*.055,23,35)}
return {flightGuide,turnRate,bearing,turnDelta};
});
