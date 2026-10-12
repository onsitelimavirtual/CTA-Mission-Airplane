/* CTA Mission Airplane • Matemática do Voo • funções puras, sem dependências */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.CTAMath=api})(typeof globalThis==='undefined'?this:globalThis,function(){'use strict';
const toRad=d=>d*Math.PI/180;
const number=(n,lo,hi)=>Number.isFinite(Number(n))?Math.max(lo,Math.min(hi,Number(n))):lo;
function components(speedKnots,headingDeg){const speed=number(speedKnots,0,10000),r=toRad(number(headingDeg,-36000,36000));return {east:speed*Math.sin(r),north:speed*Math.cos(r),speed,heading:headingDeg};}
function slope(distanceMeters,angleDeg){const distance=number(distanceMeters,0,100000),angle=number(angleDeg,0,89);return {horizontal:distance,angle,height:distance*Math.tan(toRad(angle))};}
function turnRadius(speedKnots,bankDeg){const speed=number(speedKnots,0,10000)*0.514444,bank=Math.abs(number(bankDeg,-89,89));return bank<.001?Infinity:speed*speed/(9.80665*Math.tan(toRad(bank)));}
const questions={heading:{question:'Com rumo de 90° (leste), qual direção recebe toda a velocidade horizontal?',answers:['Norte','Leste','Oeste'],correct:1,reason:'A 90°, sen(90°)=1 e cos(90°)=0: o vetor aponta para leste.'},slope:{question:'A 3° de descida e 1.000 m de distância horizontal, qual é a perda de altura aproximada?',answers:['5 m','500 m','52 m'],correct:2,reason:'tan(3°) × 1.000 ≈ 52,4 m.'},turn:{question:'Mantendo a mesma velocidade, uma inclinação maior das asas produz, em uma curva coordenada idealizada:',answers:['Curva mais fechada','Curva mais aberta','Nenhuma mudança'],correct:0,reason:'Na fórmula R=v²/(g·tan φ), aumentar φ reduz o raio da curva.'}};
function check(topic,index){const q=questions[topic];return !!q&&Number.isInteger(index)&&index===q.correct;}
return {components,slope,turnRadius,questions,check};
});