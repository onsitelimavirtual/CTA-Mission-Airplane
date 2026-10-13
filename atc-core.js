/* CTA ATC • coordenadas e distâncias em unidades fictícias do jogo. NÃO usar em aviação real. */
(function(root,factory){const m=factory();if(typeof module==='object'&&module.exports)module.exports=m;root.CTAATC=m;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const norm=n=>(n%360+360)%360;
const delta=(a,b)=>(norm(b-a+540)-180);
const speedToWorld=(a)=>{
 const speed=Math.max(0,Number(a.speed)||0);
 // Escala do próprio jogo, sincronizada à física de voo do jogador.
 return a.isAI?speed*.057:3.6+Math.min(speed,260)*.0065;
};
function vector(a){const rad=((Number(a.heading)||0)*Math.PI)/180,v=speedToWorld(a);return{x:Math.sin(rad)*v,z:Math.cos(rad)*v};}
function approach(own,other,horizon=14){
 const ov=vector(own),tv=vector(other),dx=other.x-own.x,dz=other.z-own.z,rvx=tv.x-ov.x,rvz=tv.z-ov.z;
 const dv=rvx*rvx+rvz*rvz;
 const time=dv>1e-8?clamp(-(dx*rvx+dz*rvz)/dv,0,horizon):0;
 const horizontal=Math.hypot(dx+rvx*time,dz+rvz*time);
 const vertical=Math.abs((other.alt-own.alt)+((other.vspeed||0)-(own.vspeed||0))*time);
 const nowHorizontal=Math.hypot(dx,dz),nowVertical=Math.abs(other.alt-own.alt);
 // Thresholds intentionally scaled for this arcade map, NOT metres or real-world separation minima.
 let level='clear';
 if((horizontal<21&&vertical<28)||(nowHorizontal<18&&nowVertical<25))level='critical';
 else if((horizontal<45&&vertical<55)||(nowHorizontal<38&&nowVertical<50))level='warning';
 else if((horizontal<78&&vertical<100)||(nowHorizontal<85&&nowVertical<95))level='advisory';
 return{level,time,horizontal,vertical,nowHorizontal,nowVertical,name:other.name||'Aeronave',id:other.id||'',other};
}
const priority={clear:0,advisory:1,warning:2,critical:3};
function conflict(own,traffic,horizon=14){return (traffic||[]).filter(t=>t&&Number.isFinite(t.x)&&Number.isFinite(t.z)&&Number.isFinite(t.alt)&&Number.isFinite(t.heading)&&Number.isFinite(t.speed))
 .map(t=>approach(own,t,horizon)).sort((a,b)=>priority[b.level]-priority[a.level]||a.time-b.time||a.horizontal-b.horizontal)[0]||null;}
function minimumMargin(own,traffic){let worst=0;for(const t of traffic){const p=approach(own,t);const horizontalPenalty=Math.max(0,(60-p.horizontal)/60),verticalPenalty=Math.max(0,(80-p.vertical)/80);worst+=horizontalPenalty*verticalPenalty*(p.level==='critical'?5:p.level==='warning'?3:1)}return worst;}
function guidance(own,traffic,routeTarget=null){
 const opponents=(traffic||[]).filter(t=>t&&Number.isFinite(t.x)&&Number.isFinite(t.z)&&Number.isFinite(t.alt)&&Number.isFinite(t.heading)&&Number.isFinite(t.speed));
 const nearest=conflict(own,opponents);
 if(!nearest||nearest.level==='clear'||nearest.level==='advisory'){
  const target=routeTarget||null;const heading=target?norm(Math.atan2(target.x-own.x,target.z-own.z)*180/Math.PI):norm(own.heading);
  const headingDiff=delta(own.heading,heading);
  return {level:nearest?.level||'clear',nearest,command:null,text:target?'Rota livre • próximo marco, rumo '+String(Math.round(heading)).padStart(3,'0')+'°':'Espaço monitorado • mantenha a rota',reason:nearest?.level==='advisory'?'Tráfego observado, separação simulada suficiente no momento.':'Sem conflito previsto no horizonte do jogo.',seconds:null,routeHeading:heading,routeError:headingDiff};
 }
 const originRisk=minimumMargin(own,opponents),candidates=[];
 for(const degrees of [-55,-35,35,55]){
  const heading=norm(own.heading+degrees);
  const sim={...own,heading,vspeed:0};
  let risk=minimumMargin(sim,opponents);
  // Check obstacle trade-off against destination path, but prioritize avoiding conflict.
  const course=routeTarget?norm(Math.atan2(routeTarget.x-own.x,routeTarget.z-own.z)*180/Math.PI):own.heading;
  const detour=Math.abs(delta(heading,course))/180;
  candidates.push({type:'heading',target:heading,risk,score:risk*10+detour*.35,offset:degrees});
 }
 for(const sign of [1,-1]){
  const target=clamp(Math.round(own.alt+sign*110),100,650);
  if(Math.abs(target-own.alt)<70)continue;
  const sim={...own,vspeed:sign*17};
  const risk=minimumMargin(sim,opponents);
  candidates.push({type:'altitude',target,risk,score:risk*10+.16,offset:target-own.alt});
 }
 candidates.sort((a,b)=>a.score-b.score||a.risk-b.risk);
 const best=candidates[0];
 if(!best)return {level:nearest.level,nearest,command:null,text:'Atenção: diminua a velocidade e observe o radar.',reason:'Sem manobra simulada disponível nos limites de altitude.',seconds:Math.round(nearest.time),routeHeading:null};
 // Do not assert a completely safe corridor based on simplified dynamics.
 const text=best.type==='heading'?'MUDAR RUMO para '+String(Math.round(best.target)).padStart(3,'0')+'°':'AJUSTAR ALTITUDE para '+Math.round(best.target)+' m';
 return {level:nearest.level,nearest,command:best,text,reason:'Conflito simulado previsto com '+nearest.name+' em aproximadamente '+Math.max(0,Math.round(nearest.time))+' s. Sugestão estimada para aumentar a separação; acompanhe o radar.',seconds:Math.round(nearest.time),routeHeading:null,originRisk};
}
const FLOW=[
 {label:'Corredor Norte',lane:0,alt:285,waypoints:[{x:-160,z:-130},{x:-35,z:10},{x:75,z:130},{x:190,z:180}]},
 {label:'Corredor Sul',lane:1,alt:340,waypoints:[{x:165,z:145},{x:26,z:20},{x:-100,z:-112},{x:-175,z:-175}]},
 {label:'Corredor Leste',lane:2,alt:245,waypoints:[{x:150,z:-165},{x:55,z:-55},{x:-25,z:50},{x:-155,z:170}]},
 {label:'Corredor Oeste',lane:3,alt:395,waypoints:[{x:-145,z:160},{x:-38,z:45},{x:60,z:-48},{x:160,z:-155}]}
];
function stepTraffic(aircraft,dt,route){
 if(!aircraft||!route||!route.waypoints.length||dt<=0)return aircraft;
 const points=route.waypoints;
 let to=points[aircraft.target||0]||points[0];
 if(Math.hypot(to.x-aircraft.x,to.z-aircraft.z)<15){aircraft.target=((aircraft.target||0)+1)%points.length;to=points[aircraft.target];}
 const desired=norm(Math.atan2(to.x-aircraft.x,to.z-aircraft.z)*180/Math.PI);
 aircraft.heading=norm(aircraft.heading+clamp(delta(aircraft.heading,desired),-28*dt,28*dt));
 const theta=aircraft.heading*Math.PI/180,step=speedToWorld({...aircraft,isAI:true})*dt;
 aircraft.x+=Math.sin(theta)*step;aircraft.z+=Math.cos(theta)*step;
 aircraft.alt+=(route.alt-aircraft.alt)*Math.min(1,dt*.26);
 aircraft.vspeed=(route.alt-aircraft.alt)*.26;
 aircraft.isAI=true;return aircraft;
}
return {vector,approach,conflict,guidance,stepTraffic,FLOW,speedToWorld,delta,norm};
});
