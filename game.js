(()=>{'use strict';
const C=window.CTACore;const F=window.CTAMath;const ATC=window.CTAATC;const NAV=window.CTANav;const asset=name=>(window.CTAEmbeddedImages&&window.CTAEmbeddedImages[name])||name;const $=id=>document.getElementById(id);const TWO=Math.PI*2;
const D={
 terms:`<h3>1. Finalidade recreativa</h3><p>O <strong>CTA Mission Airplane</strong> é um jogo de voo panorâmico, desafios meteorológicos, competição por menor tempo sem incidentes e coordenação fictícia de tráfego aéreo. Os destinos são cenários 3D <strong>estilizados e interpretativos</strong>, e não réplicas geográficas ou mapas de navegação.</p><h3>2. Segurança</h3><p>Não utilizar para pilotagem, controle aéreo real, formação certificada, despacho ou decisões aeronáuticas. Alertas de separação, velocidades, altitudes e radar são <strong>mecânicas do jogo</strong>.</p><h3>3. Regras de convivência</h3><p>Nas salas online, escolha apelidos adequados, respeite outros participantes e não compartilhe códigos com desconhecidos. É vedado assediar outros jogadores ou usar indevidamente o serviço.</p><h3>4. Direitos autorais</h3><p>Copyright © 2026 Nailson Rodrigues de Lima. Elementos gráficos produzidos para este projeto não autorizam uso indevido de imagens ou marcas de terceiros. Nomes de lugares são referências geográficas e culturais.</p><h3>5. Disponibilidade e idade</h3><p>A operação online depende de servidor e conexão. Não há garantia de disponibilidade permanente. Menores devem participar sob orientação dos responsáveis. O produto está em versão inicial e pode conter erros.</p>`,
 privacy:`<h3>1. Informações tratadas</h3><p>A versão local utiliza apelido de exibição, escolhas de destino, pontuação em memória, melhor tempo limpo por destino armazenado localmente e o registro do aceite em <code>localStorage</code> (data, versão e aceite). Não exige conta, e-mail, telefone, câmera, microfone ou geolocalização do dispositivo.</p><h3>2. Sala online</h3><p>Ao entrar numa sala, o servidor recebe seu apelido, identificador aleatório de sessão, código da sala e estado simulado da aeronave (posição, altitude, velocidade e direção). Outros participantes da sala recebem apelido e estado da aeronave. O servidor de referência mantém esses dados em memória temporária, com expiração de participantes inativos. Não grava banco de dados nem armazena o texto do contrato como assinatura remota.</p><h3>3. Mapa local e link externo</h3><p>O mapa do jogo é desenhado no próprio navegador e não solicita serviços externos. Somente ao selecionar explicitamente o link para OpenStreetMap o navegador acessará o site externo, que poderá receber dados técnicos de conexão.</p><h3>4. Operação do serviço</h3><p>O servidor que hospeda a aplicação poderá ter seus próprios registros de conexão, IP e regras de retenção, definidos pelo operador. Este pacote não implementa autenticação de contas, consentimento parental verificável nem mecanismo para solicitações legais de titulares.</p><h3>5. Controle local</h3><p>É possível apagar o aceite nas configurações de armazenamento do navegador. O encerramento da sessão remove dados da sala em memória, ou estes expiram automaticamente. Para implantação pública, é necessária revisão jurídica e de segurança, especialmente com adolescentes.</p>`,
 contract:`<h3>Contrato digital de uso — versão 3.0 (minuta)</h3><p><strong>Partes:</strong> autor/operador identificado na implantação e usuário que manifesta aceite dentro do aplicativo.</p><h3>Objeto</h3><p>Permissão pessoal, não exclusiva e revogável para acessar a demonstração recreativa do jogo, observados os Termos de Uso e a Política de Privacidade.</p><h3>Aceite eletrônico</h3><p>Ao marcar a caixa de concordância e clicar em “Iniciar missão”, o navegador registra localmente a manifestação de aceite, data/hora e versão dos documentos. Esse ato <strong>não constitui assinatura eletrônica avançada ou qualificada</strong>, não autentica a identidade e não substitui os procedimentos aplicáveis a contratos comerciais.</p><h3>Limitações e responsabilidades</h3><p>Não se oferece serviço aeronáutico, voo real, garantia de ausência de erros ou disponibilidade contínua. O usuário é responsável por utilizar apenas o ambiente recreativo, proteger seu código de sala e observar regras de respeito.</p><h3>Vigência e alterações</h3><p>A licença demonstrativa vigora enquanto o serviço estiver disponível. Alterações substanciais devem exigir novo aceite. Condições comerciais, foro e qualificação completa das partes dependem de personalização e revisão humana antes de comercialização.</p><p><strong>Autor:</strong> Nailson Rodrigues de Lima • <strong>Documento:</strong> CTA-MA-3.0 • <strong>Data:</strong> 11/10/2026.</p>`,
 help:`<h3>Matemática do Voo</h3><p>Abra o botão 📐 para acompanhar os exemplos de seno, cosseno e tangente. O painel não altera os comandos nem a classificação da missão.</p><h3>Comandos</h3><p><strong>Z/X:</strong> zoom da câmera; <strong>W/S:</strong> acelerar/reduzir; <strong>↑/↓:</strong> subir/descer (nunca marcha a ré); <strong>←/→ ou A/D:</strong> virar; <strong>P:</strong> piloto automático; <strong>C:</strong> alternar entre cinco câmeras; <strong>M:</strong> ativar/silenciar som (externa, cabine, panorâmica, satélite, mapa); <strong>Espaço:</strong> pausar (somente modo solo). No celular, mantenha os botões pressionados.</p><h3>Missões e vitória</h3><p>Vence quem visitar os três marcos sem incidentes no menor tempo. Neblina, chuva, turbulência e visibilidade crítica afetam o voo. Quem sofrer incidente pode concluir, mas fica fora da disputa de vitória. Os resultados online são demonstrativos. Visite os três marcos panorâmicos do destino. Aproxime-se do marcador branco/dourado mantendo altitude próxima da recomendada. O radar mostra sua posição e os demais aviões na área. Alertas são parte do jogo, não possuem valor aeronáutico real.</p><h3>Modo online</h3><p>Inicie a aplicação pelo servidor Node.js do pacote, gere ou informe um código de seis caracteres, escolha um apelido e entre na sala. Até cinco jogadores podem pilotar simultaneamente. Apenas quem criou a sala altera o destino. Todos compartilham o mesmo cenário e aparecem no radar.</p><h3>Representação visual</h3><p>Os cenários panorâmicos usam artes ilustrativas e geometria do jogo; o passeio após chegada é gerado por desenho vetorial e não reproduz ruas reais. Imagens e fotografias georreferenciadas futuras dependerão de fontes e licenças verificadas. O mapa local do jogo é um esquema fictício, desenhado sem internet, e não reproduz vias nem coordenadas reais de voo. Há um link opcional para consultar o OpenStreetMap, que requer internet.</p>`
};
const state={incidents:0,incidentKeys:new Set(),weatherId:'clear',lastWeather:'clear',finishPending:false,standings:[],running:false,paused:false,online:false,mode:'solo',mission:C.missions[0],player:{...C.START},waypoint:0,score:0,auto:false,camera:0,keys:new Set(),ai:[],others:[],id:'',token:'',room:'',host:'',roundId:'',stream:null,lastSend:0,lastPenalty:0,lastWarn:0,elapsed:0,lastTime:0,toastTimer:null,frame:0,sky:new Map(),hudTimer:0,missionDone:false,missionChangeStamp:'',audio:false,muted:false,lastBeep:-999,proximityLevel:"clear",motion:{yaw:0,vertical:0,bank:0,pitch:0},cameraPose:null,cameraZoom:1,frameDt:.016,arrivalTimer:null,atcPrediction:null,atcDirective:null,atcTick:0,atcLastLevel:"clear"};
const ctx=$('world').getContext('2d',{alpha:false}),radarCtx=$('radar').getContext('2d');
// Motor do avião: Web Audio API nativa (sem arquivos de áudio, dependências ou internet).
const AudioClass=window.AudioContext||window.webkitAudioContext;
let engineAudio=null;
try{state.muted=localStorage.getItem('cta_ma_muted')==='true'}catch{}
function audioUI(){const button=$('soundBtn');if(!button)return;const available=!!AudioClass;button.textContent=!available?'🔇 Áudio indisponível':state.muted?'🔇 Mudo':'🔊 Som ligado';button.setAttribute('aria-pressed',String(!state.muted&&available));button.setAttribute('aria-label',state.muted?'Ativar som do avião':'Silenciar som do avião');button.disabled=!available}
function makeEngineAudio(){
 if(engineAudio||!AudioClass)return;
 try{const context=new AudioClass();const master=context.createGain();master.gain.value=0;master.connect(context.destination);
 const low=context.createBiquadFilter();low.type='lowpass';low.frequency.value=360;low.Q.value=.6;low.connect(master);
 const bass=context.createOscillator();bass.type='sawtooth';bass.frequency.value=46;const bassGain=context.createGain();bassGain.gain.value=.52;bass.connect(bassGain);bassGain.connect(low);bass.start();
 const prop=context.createOscillator();prop.type='triangle';prop.frequency.value=93;const propGain=context.createGain();propGain.gain.value=.25;prop.connect(propGain);propGain.connect(low);prop.start();
 const sampleRate=context.sampleRate;const buffer=context.createBuffer(1,Math.round(sampleRate*.7),sampleRate);const data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.32;
 const wind=context.createBufferSource();wind.buffer=buffer;wind.loop=true;const windFilter=context.createBiquadFilter();windFilter.type='lowpass';windFilter.frequency.value=460;const windGain=context.createGain();windGain.gain.value=.08;wind.connect(windFilter);windFilter.connect(windGain);windGain.connect(master);wind.start();
 engineAudio={context,master,low,bass,prop,windFilter,windGain};
 }catch(err){engineAudio=null;state.muted=true;audioUI();console.warn('Audio não pôde ser iniciado:',err)}
}
function unlockAudio(){if(state.muted||!AudioClass)return;makeEngineAudio();if(engineAudio&&engineAudio.context.state==='suspended'){void engineAudio.context.resume().catch(()=>{})}updateEngineAudio()}
function updateEngineAudio(){if(!engineAudio)return;const a=engineAudio,now=a.context.currentTime;const speed=state.player.speed;const throttle=Math.min(1,Math.max(0,(speed-65)/195));const active=state.running&&!state.paused&&!state.missionDone&&!state.muted;
 a.master.gain.setTargetAtTime(active?.043+throttle*.036:0,now,.16);
 a.bass.frequency.setTargetAtTime(39+throttle*43,now,.20);
 a.prop.frequency.setTargetAtTime(85+throttle*93,now,.18);
 a.low.frequency.setTargetAtTime(230+throttle*570,now,.24);
 a.windFilter.frequency.setTargetAtTime(420+throttle*1200,now,.18);
 a.windGain.gain.setTargetAtTime(.07+throttle*.18,now,.2)
}
function toggleMute(){state.muted=!state.muted;try{localStorage.setItem('cta_ma_muted',String(state.muted))}catch{}audioUI();if(!state.muted)unlockAudio();updateEngineAudio();toast(state.muted?'Som do avião desligado':'Som do avião ligado')}
function trafficBeep(level){if(!engineAudio||state.muted||engineAudio.context.state!=='running')return;
 const a=engineAudio.context,now=a.currentTime;const beep=a.createOscillator(),gain=a.createGain();beep.type='sine';beep.frequency.setValueAtTime(level==='critical'?880:590,now);gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(level==='critical'?.065:.035,now+.025);gain.gain.exponentialRampToValueAtTime(.001,now+(level==='critical'?.28:.18));beep.connect(gain);gain.connect(a.destination);beep.start(now);beep.stop(now+.32)
}

const pane=$('side'),welcome=$('welcome');let winW=1280,winH=720,pr=1;
const scenicImages={};for(const m of C.missions){const img=new Image();img.src=asset('cenario-'+m.id+'.webp');scenicImages[m.id]=img}
function updateMap(){const m=state.mission;$('mapDestination').textContent='◈ CARTOGRAFIA • '+m.short;$('osmLink').href='https://www.openstreetmap.org/?mlat='+m.lat+'&mlon='+m.lon+'#map=13/'+m.lat+'/'+m.lon;const pois=$('routeGeopoints');if(pois){pois.replaceChildren();const coords=C.landmarksGeo[m.id]||[];m.landmarks.forEach((name,i)=>{const a=document.createElement('span');const pt=coords[i]||[m.lat,m.lon];a.textContent=(i+1)+' · '+name+' ('+pt[0].toFixed(3)+', '+pt[1].toFixed(3)+')';pois.appendChild(a)})}if(state.camera===4)drawLocalMap()}

function drawLocalMap(){
 const canvas=$('localMapCanvas');if(!canvas)return;
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height,m=state.mission,p=state.player;
 const pad=54,zoom=state.cameraZoom,scaleX=(w-pad*2)/480*zoom,scaleY=(h-pad*2)/480*zoom;
 const centerX=(1-1/zoom)*p.x,centerZ=(1-1/zoom)*p.z;
 const px=x=>w/2+(x-centerX)*scaleX,py=z=>h/2-(z-centerZ)*scaleY;
 c.clearRect(0,0,w,h);const grad=c.createLinearGradient(0,0,w,h);grad.addColorStop(0,'#173e57');grad.addColorStop(1,'#0d3043');c.fillStyle=grad;c.fillRect(0,0,w,h);
 // Desenho esquemático gerado internamente; nunca apresentado como ruas ou relevo verdadeiro.
 c.save();c.beginPath();c.rect(pad,pad,w-2*pad,h-2*pad);c.clip();
 for(let x=-240;x<240;x+=20)for(let z=-240;z<240;z+=20){
  const land=landType(m.theme,x+10,z+10)!=='sea';
  c.fillStyle=land?(((x+z)/20|0)%2?'#477b6b':'#3e7064'):'#23738d';
  c.fillRect(px(x),py(z+20),Math.ceil(20*scaleX)+.3,Math.ceil(20*scaleY)+.3);
 }
 c.lineWidth=1.3;c.strokeStyle='#d9ecdf26';
 for(let n=-200;n<=200;n+=40){c.beginPath();c.moveTo(px(n),py(-240));c.lineTo(px(n),py(240));c.moveTo(px(-240),py(n));c.lineTo(px(240),py(n));c.stroke()}
 const route=[C.START,...C.route];c.save();c.strokeStyle='#ffdd91';c.lineWidth=4;c.setLineDash([9,7]);c.beginPath();route.forEach((v,i)=>i?c.lineTo(px(v.x),py(v.z)):c.moveTo(px(v.x),py(v.z)));c.stroke();c.restore();
 C.route.forEach((wp,i)=>{const x=px(wp.x),y=py(wp.z);c.beginPath();c.arc(x,y,i===state.waypoint?13:10,0,TWO);c.fillStyle=i<state.waypoint?'#69e6a5':i===state.waypoint?'#ffda80':'#c8e3ee';c.fill();c.lineWidth=3;c.strokeStyle='#0b2338';c.stroke();c.fillStyle='#071e2e';c.textAlign='center';c.font='bold 13px Arial';c.fillText(String(i+1),x,y+4);c.textAlign='left';c.font='bold 14px Arial';c.lineWidth=3;c.strokeStyle='#0a2b3d';c.strokeText(m.landmarks[i],x+16,y-11);c.fillStyle='#fff8de';c.fillText(m.landmarks[i],x+16,y-11)});
 const hx=px(p.x),hy=py(p.z),theta=p.heading*Math.PI/180;
 c.save();c.translate(hx,hy);c.rotate(theta);c.shadowColor='#67dff4';c.shadowBlur=15;c.fillStyle='#7af0fb';c.strokeStyle='#053144';c.lineWidth=2.4;c.beginPath();c.moveTo(0,-18);c.lineTo(11,13);c.lineTo(0,7);c.lineTo(-11,13);c.closePath();c.fill();c.stroke();c.restore();
 c.restore();c.fillStyle='#08283bdc';c.fillRect(0,0,w,38);c.fillRect(0,h-35,w,35);c.fillStyle='#edfaff';c.font='bold 17px Arial';c.fillText('◈ MAPA LOCAL DA MISSÃO • '+m.short.toUpperCase(),14,25);
 c.font='12px Arial';c.fillStyle='#cff1fa';c.fillText('Rota simulada, sem escala geográfica • Coordenadas reais apenas no painel informativo',14,h-12);
}

function renderFeatured(){const root=$('featuredMissions');root.replaceChildren();for(const m of C.missions){const b=document.createElement('button');b.type='button';b.className='featured-card'+(m.id===state.mission.id?' active':'');b.dataset.dest=m.id;b.innerHTML='<img loading=lazy alt=""><span></span>';b.querySelector('img').src=asset('explorar-'+m.id+'.webp');b.querySelector('span').textContent=m.short;b.title=m.tag;b.onclick=()=>selectMission(m.id);root.appendChild(b)}}
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('visible');clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>e.classList.remove('visible'),3400)}
function alert(t,kind=''){const el=$('alertBanner');el.textContent=t;el.className='alert '+kind}
function showDoc(which){$('dialogLayer').querySelector('.dialog').classList.remove('explorer-mode');const titles={terms:'Termos de Uso',privacy:'Política de Privacidade',contract:'Contrato Digital',help:'Manual de pilotagem'};$('dialogTitle').textContent=titles[which]||which;$('dialogContent').innerHTML=D[which]||'';$('dialogLayer').classList.remove('hidden');$('dialogOk').focus()}
function closeDialog(){$('dialogLayer').classList.add('hidden');$('dialogLayer').querySelector('.dialog').classList.remove('explorer-mode');if(state.galleryPausedByExplorer){state.paused=false;state.galleryPausedByExplorer=false;updateEngineAudio();$('pauseBtn').textContent='Ⅱ Pausar';}}
function readName(){return C.cleanName($('pilotName').value)||'Piloto 1'}
function selectMission(id,reset=true){const mission=C.missions.find(m=>m.id===id)||C.missions[0];state.mission=mission;$('destSelect').value=mission.id;renderDestinations();renderFeatured();renderFlightDestinations();updateMap();if(reset)resetFlight();updateHud();if(state.running)toast('Novo destino: '+mission.short)}
function resetFlight(){if(state.arrivalTimer){clearTimeout(state.arrivalTimer);state.arrivalTimer=null}state.motion={yaw:0,vertical:0,bank:0,pitch:0};state.cameraPose=null;state.scenery={lastHeading:45,worldYaw:45,visibleYaw:45,visibleAlt:280,viewShiftX:0,viewShiftY:0};state.player={...C.START};state.waypoint=0;state.score=0;state.elapsed=0;state.lastEarlyNotice=0;state.incidents=0;state.incidentKeys.clear();state.weatherId='clear';state.lastWeather='clear';state.finishPending=false;state.standings=[];state.missionDone=false;state.ai=[
 {id:'AI-1',name:'Voo Sol',x:-34,z:35,alt:280,speed:112,heading:196,target:0,color:'#ffd289'},
 {id:'AI-2',name:'Voo Azul',x:103,z:-52,alt:340,speed:115,heading:288,target:1,color:'#f2a6a6'},
 {id:'AI-3',name:'Voo Verde',x:76,z:110,alt:360,speed:105,heading:240,target:2,color:'#b5e79e'},
 {id:'AI-4',name:'Voo Prata',x:-114,z:67,alt:235,speed:97,heading:110,target:3,color:'#e7ddff'}];state.ai.forEach((a,i)=>{a.isAI=true;a.target=i===0?1:0;a.flow=ATC.FLOW[i].label});state.atcPrediction=null;state.atcDirective=null;state.atcTick=0;state.atcLastLevel='clear';$('atcExecute').disabled=true;state.lastPenalty=0;state.lastWarn=0;state.lastBeep=-999;state.proximityLevel='clear';state.sky.clear();$('incidentVal').textContent='✓ 0 incidentes';$('clockVal').textContent='00:00';$('raceHint').textContent='Tempo mínimo de missão: 04:00 • 3 marcos';renderRaceboard();updateATC();alert('Início! Três trechos de voo. Duração mínima: 04:00, sem incidentes.')}
function renderDestinations(){const root=$('destinationList');root.replaceChildren();for(const m of C.missions){const b=document.createElement('button');b.className='destination'+(state.mission.id===m.id?' selected':'');b.innerHTML='<img class="destination-photo" alt=""><div><strong></strong><span></span></div>';b.querySelector('.destination-photo').src=asset('explorar-'+m.id+'.webp');b.querySelector('strong').textContent=m.name;b.querySelector('div span').textContent=m.tag;b.onclick=()=>chooseDest(m.id);root.appendChild(b)}}
async function chooseDest(id){if(state.online&&state.id!==state.host){toast('Somente o anfitrião pode alterar o destino');return}if(state.online){try{await post('/api/mission',{room:state.room,token:state.token,mission:id})}catch(e){toast('Falha ao alterar destino: '+e.message);return}}selectMission(id);pane.classList.add('hidden')}
function updateNavigator(){
 const p=state.player;
 const n=NAV.flightGuide(p,C.route,state.waypoint,state.elapsed,C.weatherAt(state.elapsed).speedFactor,C.MIN_FLIGHT_SECONDS,C.worldSpeed);
 if(!n)return;
 const danger=['warning','critical'].includes(state.atcPrediction?.level);
 $('navPhase').textContent=n.finished?'MISSÃO CONCLUÍDA':n.legLabel+' • '+n.step+'/3';
 $('navCommand').textContent=n.finished?'✓ CHEGADA REGISTRADA':danger?'⚠ VERIFIQUE A CENTRAL CTA':'RUMO '+String(Math.round(n.heading)).padStart(3,'0')+'° • '+(n.courseAligned?'ALINHADO':n.action+' '+Math.round(Math.abs(n.headingError))+'°');
 $('navAltitude').textContent=n.finished?'Todos os pontos visitados':n.altitudeAligned?'✓ Altitude adequada':'↕ '+n.altitudeAction+' '+Math.round(Math.abs(n.altitudeDelta))+' m';
 $('navCompass').style.transform='rotate('+((n.headingError+360)%360)+'deg)';
 const legETA=Math.ceil(n.distance/Math.max(.1,C.worldSpeed(p.speed)*C.weatherAt(state.elapsed).speedFactor));
 $('navWaypointETA').textContent=n.finished?'Concluído':C.msClock(legETA);
 $('navTotalETA').textContent=n.finished?'Concluído':'≈ '+C.msClock(n.etaSeconds);
 for(let k=0;k<3;k++){
  const e=$('navStep'+(k+1)),isDone=k<state.waypoint,isCurrent=k===state.waypoint;
  e.textContent=(k+1)+' · '+(isDone?'Concluído':isCurrent?'Em curso':'A seguir');
  e.dataset.status=isDone?'done':isCurrent?'current':'pending';
 }
 const follow=$('navFollow');follow.setAttribute('aria-pressed',String(state.auto));follow.textContent=state.auto?'✓ Desativar rota assistida':'✈ Ativar rota assistida';follow.disabled=!state.running||state.missionDone;
}

// V4.1 — os instrumentos móveis são uma camada de apresentação e não modificam a física.
function setMobileFlightPanel(panel='none'){
 const allowed=['none','route','radar','atc','camera'];if(!allowed.includes(panel))panel='none';
 const area=$('flightArea');const current=area.dataset.mobilePanel||'none';
 if(panel===current&&panel!=='none')panel='none';
 area.dataset.mobilePanel=panel;
 for(const b of document.querySelectorAll('.mobile-flight-tab')){let active=b.dataset.panel===panel;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))}
 const cover=$('mobilePanelBackdrop');cover.hidden=(panel==='none');
 if(panel==='atc'){$('atcPanel').dataset.expanded='true';$('atcToggle').setAttribute('aria-expanded','true');$('atcToggle').textContent='⌃'}
 if(panel==='radar')requestAnimationFrame(()=>drawRadar());
}
function updateMobileFlightSummary(){
 const command=$('navCommand'),stage=$('navPhase');
 if(command)$('mobileFlightCommand').textContent=command.textContent||'Siga a rota';
 if(stage)$('mobileFlightStage').textContent=stage.textContent||'PRÓXIMO PONTO';
 $('mobileFlightTime').textContent=$('clockVal').textContent;
}
function initMobileCockpit(){
 $('flightArea').dataset.mobilePanel='none';
 for(const btn of document.querySelectorAll('.mobile-flight-tab'))btn.onclick=()=>setMobileFlightPanel(btn.dataset.panel);
 $('mobilePanelBackdrop').onclick=()=>setMobileFlightPanel('none');
}
function updateHud(){const p=state.player;const wp=C.route[Math.min(state.waypoint,2)];$('speedVal').innerHTML=Math.round(p.speed)+' <em>kt</em>';const throttle=$('throttleHint');if(throttle)throttle.textContent=(state.keys.has('faster')?'▲ ACELERANDO':state.keys.has('slower')?'▼ REDUZINDO':'VELOCIDADE DE CRUZEIRO');$('altVal').innerHTML=Math.round(p.alt)+' <em>m</em>';$('hdgVal').innerHTML=String(Math.round(C.norm(p.heading))).padStart(3,'0')+' <em>°</em>';$('scoreVal').textContent=state.score;$('missionProgress').textContent=state.waypoint+'/3';$('progressFill').style.width=(100*state.waypoint/3)+'%';$('destName').textContent=state.mission.name;$('objectiveText').textContent=state.missionDone?'Missão completa! Todos os pontos foram visitados.':`Próximo: ${state.mission.landmarks[state.waypoint]||'Fim'} — altitude sugerida ${wp.alt} m`;$('distVal').textContent=state.missionDone?'Concluído':Math.round(C.dist(p,wp))+' unidades até o próximo marco';$('radarCount').textContent=(state.online?state.others.length+1:state.ai.length+1)+' / 5';$('clockVal').textContent=C.msClock(state.elapsed);$('incidentVal').textContent=(state.incidents?'⚠ '+state.incidents+' incidente(s)':'✓ Sem incidentes');$('incidentVal').classList.toggle('bad',state.incidents>0);updateMathPanel();updateNavigator();updateMobileFlightSummary();}
function allPlanes(){return state.online?state.others:state.ai}
function checkSafety(){
 const p=state.player;let critical=false,warning=false,nearest=null;
 for(const other of allPlanes()){
  if(!other||!Number.isFinite(other.x)||!Number.isFinite(other.z)||!Number.isFinite(other.alt)||other.id===state.id)continue;
  const sep=C.separation(p,other);
  if(!nearest||sep.horizontal<nearest.horizontal)nearest={...sep,name:other.name||'Outra aeronave'};
  if(sep.warning)warning=true;if(sep.critical)critical=true;
 }
 const level=critical?'critical':warning?'warning':nearest&&nearest.horizontal<125&&nearest.vertical<130?'nearby':'clear';
 const panel=$('trafficAlert'),summary=$('trafficSummary'),dist=$('trafficDistance');
 panel.dataset.level=level;
 if(level==='clear'){
  summary.textContent='Radar monitorando o espaço aéreo';dist.textContent=nearest?'Tráfego mais próximo: '+Math.round(nearest.horizontal)+' m':'Nenhuma aeronave identificada';
 }else{
  summary.textContent=(level==='critical'?'⛔ RISCO DE COLISÃO':level==='warning'?'⚠ AERONAVE MUITO PRÓXIMA':'✈ TRÁFEGO NAS PROXIMIDADES')+' • '+nearest.name;
  dist.textContent='Distância horizontal: '+Math.round(nearest.horizontal)+' m • vertical: '+Math.round(nearest.vertical)+' m';
 }
 if((critical||warning)&&(level!==state.proximityLevel||state.elapsed-state.lastBeep>(critical?3.8:7))){
  state.lastBeep=state.elapsed;trafficBeep(level);
 }
 state.proximityLevel=level;
 if(critical){alert('⚠ PROXIMIDADE CRÍTICA! Altere rumo ou altitude.','danger');$('safetyVal').textContent='CRÍTICO';registerIncident('traffic','Separação crítica entre aeronaves');if(state.elapsed-state.lastPenalty>6){state.lastPenalty=state.elapsed;state.score=Math.max(0,state.score-50)}}
 else if(warning){alert('⚠ Tráfego próximo: confira o radar','warn');$('safetyVal').textContent='ATENÇÃO'}
 else{$('safetyVal').textContent=level==='nearby'?'TRÁFEGO':'SEGURO';if(!state.missionDone){const guidance=state.atcPrediction;if(guidance&&['warning','critical'].includes(guidance.level))alert('📡 CTA PREVÊ CONFLITO • '+guidance.text,'warn');else alert(state.auto?'Piloto automático • rota assistida':'Siga os marcadores até o destino')}}
 return {warning,critical,nearest:nearest?.horizontal??Infinity,level};
}
function registerIncident(kind,message){if(state.incidentKeys.has(kind))return;state.incidentKeys.add(kind);state.incidents++;state.score=Math.max(0,state.score-100);$('incidentVal').textContent='⚠ '+state.incidents+' incidente(s)';$('incidentVal').classList.add('bad');toast('INCIDENTE: '+message+' • corrida comprometida');}
function updateWeather(){const w=C.weatherAt(state.elapsed);state.weatherId=w.id;if(w.id!==state.lastWeather){state.lastWeather=w.id;toast(w.icon+' Mudança de tempo: '+w.label);}
 $('weatherName').textContent=w.label;$('weatherIcon').textContent=w.icon;$('visibilityVal').textContent='Visibilidade '+Math.round(w.visibility*100)+'%';$('weatherStatus').dataset.weather=w.id;$('weatherFx').dataset.weather=w.id;
 $('weatherFx').style.setProperty('--weather-opacity',w.id==='fog'?.54:w.id==='lowvis'?.77:w.id==='rain'?.52:0);
 return w;}
function renderRaceboard(){const root=$('raceRows');if(!root)return;root.replaceChildren();const done=state.standings||[];if(!done.length){root.textContent='Nenhuma chegada ainda';return}done.slice(0,5).forEach((r,i)=>{const row=document.createElement('div');row.className='race-entry';row.textContent=(r.incidents>0?'⚠':'🏅')+' '+r.name+' — '+C.msClock(r.elapsed)+(r.incidents?' • fora da vitória':'');root.appendChild(row)});}
function renderFlightDestinations(){const root=$('flightDestinations');if(!root)return;root.replaceChildren();for(const m of C.missions){const b=document.createElement('button');b.type='button';b.className='flight-dest'+(m.id===state.mission.id?' active':'');const img=document.createElement('img');img.src=asset('explorar-'+m.id+'.webp');img.alt='';const label=document.createElement('span');label.textContent=m.short;b.append(img,label);b.title=m.name;b.onclick=()=>{if(state.running)chooseDest(m.id);else selectMission(m.id)};root.appendChild(b)}}
function localRecord(){if(state.incidents||!state.missionDone)return;try{const key='cta_clean_best_v3';const records=JSON.parse(localStorage.getItem(key)||'{}');const existing=Number(records[state.mission.id]);if(!Number.isFinite(existing)||existing<=0||state.elapsed<existing){records[state.mission.id]=Math.round(state.elapsed*100)/100;localStorage.setItem(key,JSON.stringify(records));toast('🏆 Novo melhor tempo limpo!')}}catch{}}
async function finishRace(){if(state.finishPending)return;state.finishPending=true;if(state.online){try{try{await post('/api/state',{room:state.room,token:state.token,state:{...state.player}})}catch(e){if(String(e.message).includes('frequentes')){await new Promise(r=>setTimeout(r,115));await post('/api/state',{room:state.room,token:state.token,state:{...state.player}})}else throw e}const res=await post('/api/finish',{room:state.room,token:state.token,incidents:state.incidents});if(res.standings)state.standings=res.standings;renderRaceboard()}catch(e){toast('Classificação indisponível: '+e.message)}}else{state.standings=[{name:readName(),elapsed:state.elapsed,incidents:state.incidents,finished:true}];localRecord();renderRaceboard()}}
function nudgeControl(k){if(!state.running||state.paused||state.missionDone)return;const p=state.player;if(state.auto&&['left','right','up','down'].includes(k))setAuto(false);if(k==='faster')p.speed=C.clamp(p.speed+16,65,260);if(k==='slower')p.speed=C.clamp(p.speed-16,65,260);if(k==='left')p.heading=C.norm(p.heading-3.5);if(k==='right')p.heading=C.norm(p.heading+3.5);if(k==='up')p.alt=C.clamp(p.alt+7,85,650);if(k==='down')p.alt=C.clamp(p.alt-7,85,650);updateHud();}
function smoothRate(current,target,response,dt){const alpha=1-Math.exp(-response*dt);return current+(target-current)*alpha}
function update(dt){if(!state.running||state.paused||state.missionDone)return;state.elapsed+=dt;const weather=updateWeather();const p=state.player;const m=state.motion;const key=k=>state.keys.has(k);const turn=(key('left')?-1:0)+(key('right')?1:0);const climb=(key('up')?1:0)+(key('down')?-1:0);
 if((turn||climb)&&state.atcDirective)cancelATCDirective();if(state.auto&&(turn||climb))setAuto(false);if(key('faster'))p.speed=C.clamp(p.speed+62*dt,65,260);if(key('slower'))p.speed=C.clamp(p.speed-62*dt,65,260);
 let targetYaw=turn*NAV.turnRate(p.speed),targetVertical=climb*40;
 if(state.auto){const w=C.route[state.waypoint];const err=C.turnDelta(p.heading,C.bearing(p,w));targetYaw=C.clamp(err*.92,-35,35);targetVertical=C.clamp((w.alt-p.alt)*.54,-25,25)}
 if(state.atcDirective&&!turn&&!climb&&!state.auto){
  const dir=state.atcDirective;
  if(dir.type==='heading'){const e=C.turnDelta(p.heading,dir.target);targetYaw=C.clamp(e*1.65,-39,39);targetVertical=0;if(Math.abs(e)<5)cancelATCDirective()}
  else {const e=dir.target-p.alt;targetVertical=C.clamp(e*.72,-33,33);targetYaw=0;if(Math.abs(e)<9)cancelATCDirective()}
  if(state.elapsed>=dir.until)cancelATCDirective();
 }

 m.yaw=smoothRate(m.yaw,targetYaw,3.8,dt);m.vertical=smoothRate(m.vertical,targetVertical,4.5,dt);
 m.bank=smoothRate(m.bank,C.clamp(m.yaw*.79,-32,32),3.2,dt);m.pitch=smoothRate(m.pitch,-C.clamp(m.vertical*.3,-16,16),4.2,dt);
 p.heading=C.norm(p.heading+m.yaw*dt);p.alt=C.clamp(p.alt+m.vertical*dt,85,650);
 if(weather.id==='turbulence'){p.heading=C.norm(p.heading+(Math.sin(state.elapsed*4.7)*3.5+Math.cos(state.elapsed*2.1)*2)*dt);p.alt=C.clamp(p.alt+Math.sin(state.elapsed*6)*9*dt,85,650);m.bank+=Math.sin(state.elapsed*5)*.08;}
 const h=p.heading*Math.PI/180,speed=C.worldSpeed(p.speed)*dt*weather.speedFactor;p.x+=Math.sin(h)*speed;p.z+=Math.cos(h)*speed;
 if(Math.abs(p.x)>440||Math.abs(p.z)>440){p.x=C.clamp(p.x,-440,440);p.z=C.clamp(p.z,-440,440);if(!state.auto)registerIncident('boundary','Rota ultrapassou a área de operação')}
 if(!state.online)updateAI(dt);state.atcTick+=dt;if(state.atcTick>.33){updateATC(state.atcTick);state.atcTick=0}if(p.alt<95&&weather.severity>=2)registerIncident('unsafe_alt','Altitude insuficiente com meteorologia adversa');checkSafety();
 const wp=C.route[state.waypoint];
 // Proteção contra atalhos: o último marco só conta a partir de 04:00 de voo ativo.
 // A rota física foi ampliada para ocupar naturalmente mais do que esse tempo.
 const finalTooSoon=state.waypoint===C.route.length-1&&state.elapsed<C.MIN_FLIGHT_SECONDS;
 if(wp&&C.arrival(p,wp)&&finalTooSoon&&(!state.lastEarlyNotice||state.elapsed-state.lastEarlyNotice>12)){
  state.lastEarlyNotice=state.elapsed;
  toast('Aproximação antecipada: continue voando pelo circuito até 04:00.');
 }
 if(wp&&C.arrival(p,wp)&&!finalTooSoon){state.score+=200;const name=state.mission.landmarks[state.waypoint];state.waypoint++;toast('✓ '+name+' — +200 pontos');if(state.waypoint>=3){state.missionDone=true;updateEngineAudio();state.score+=300;state.auto=false;$('autoBtn').classList.remove('on');alert(state.incidents?'⚠ Chegada registrada com incidentes':'🏆 Chegada limpa! Tempo registrado');void finishRace();const arrivedMission=state.mission.id;state.arrivalTimer=setTimeout(()=>{if(state.mission.id===arrivedMission&&state.missionDone)showVictory()},1100);}}
 state.hudTimer+=dt;if(state.hudTimer>.13){updateEngineAudio();updateHud();state.hudTimer=0}
 if(state.online&&performance.now()-state.lastSend>220){state.lastSend=performance.now();void sendState();}}
function updateAI(dt){
 // Quatro corredores simulados de tráfego; as aeronaves percorrem trajetórias independentes.
 for(let i=0;i<state.ai.length;i++)ATC.stepTraffic(state.ai[i],dt,ATC.FLOW[i]);
}
function cancelATCDirective(){state.atcDirective=null;$('atcExecute').textContent='✈ Executar sugestão'}
function updateATC(dt=0){
 const p=state.player,targets=allPlanes();const waypoint=C.route[Math.min(state.waypoint,2)];
 const own={...p,vspeed:state.motion.vertical,isAI:false};
 const assessment=ATC.guidance(own,targets,waypoint);
 state.atcPrediction=assessment;
 const level=assessment.level||'clear',risk=level==='warning'||level==='critical';
 const box=$('atcPanel');box.dataset.level=level;const mobileCTA=$('mobileAtcButton');if(mobileCTA)mobileCTA.dataset.alert=level;
 $('atcLevel').textContent=level==='critical'?'⛔ RISCO CRÍTICO':level==='warning'?'⚠ CONFLITO PREVISTO':level==='advisory'?'● TRÁFEGO OBSERVADO':'✓ ROTA LIVRE';
 $('atcInstruction').textContent=assessment.text;
 $('atcReason').textContent=assessment.reason;
 $('atcContact').textContent=assessment.nearest?'Tráfego: '+assessment.nearest.name:'Nenhuma aeronave em conflito';
 $('atcETA').textContent=assessment.seconds!==null?'Aproximação prevista: '+assessment.seconds+' s':'Destino: '+(state.mission.landmarks[state.waypoint]||'Fim da missão');
 const execute=$('atcExecute');execute.disabled=!risk||!assessment.command||!state.running||state.missionDone;
 execute.textContent=state.atcDirective?'✓ Ajustando aeronave':'✈ Executar sugestão';
 if(risk&&level!==state.atcLastLevel&&state.running){toast('CENTRAL CTA: '+assessment.text);trafficBeep(level)}
 state.atcLastLevel=level;
 return assessment;
}
function executeATC(){const a=state.atcPrediction;if(!a||!a.command||!state.running||state.missionDone)return;
 if(state.auto)setAuto(false);
 state.atcDirective={type:a.command.type,target:a.command.target,until:state.elapsed+18};
 toast('CTA • '+a.text+' • Comando assistido em execução');updateATC();
}
function routeBriefing(){const next=C.route[Math.min(state.waypoint,2)];if(!next||state.missionDone){toast('Missão concluída');return}
 const bearing=Math.round(C.bearing(state.player,next));toast('ROTA • '+state.mission.landmarks[state.waypoint]+' | Rumo '+String(bearing).padStart(3,'0')+'° | Altitude '+next.alt+' m');
}
const DESTINATION_STORIES={
 quente:{lead:'Águas quentes e refúgios verdes do Cerrado',desc:'Rio Quente, em Goiás, é conhecido pelo turismo de águas termais e pela paisagem do Cerrado. Explore uma interpretação artística da região.',detail:'A cena destaca piscinas termais, vegetação exuberante e paisagens de lazer.'},
 noronha:{lead:'Mar cristalino e ilhas rochosas',desc:'Fernando de Noronha reúne baías, praias e formações rochosas marcantes no Atlântico.',detail:'Observe os tons turquesa do mar e os morros da ilha em uma representação artística.'},
 rio:{lead:'Montanhas, praias e uma das baías mais famosas do Brasil',desc:'O Rio de Janeiro combina praias, morros e marcos como o Cristo Redentor e o Pão de Açúcar.',detail:'O destaque é a integração entre o relevo, o litoral e a cidade.'},
 miami:{lead:'Praias urbanas, palmeiras e arquitetura costeira',desc:'Miami, na Flórida, é conhecida pelas praias, avenidas arborizadas e edifícios próximos ao mar.',detail:'O panorama evoca a atmosfera de Miami Beach e seu litoral ensolarado.'},
 fortaleza:{lead:'Praias, calçadões e o litoral do Ceará',desc:'Fortaleza é marcada pela orla urbana, pelas praias e pela cultura cearense.',detail:'A paisagem mostra uma interpretação da extensa orla e de sua arquitetura.'},
 brasilia:{lead:'Arquitetura moderna e espaços monumentais',desc:'Brasília reúne monumentos e eixos urbanos que representam a arquitetura modernista brasileira.',detail:'O panorama é inspirado no conjunto monumental e seus espelhos-d’água.'}
};
let explorerMissionId='',explorerSlide=0;
function showVictory(){showDoc('help');$('dialogTitle').textContent='🏁 Chegada ao destino';$('dialogContent').innerHTML='<div class="victory-result"><h3>'+(state.incidents?'Chegada registrada com incidentes':'🏆 Missão concluída sem incidentes!')+'</h3><p>Você visitou os três pontos de <strong id="victoryDestination"></strong>.</p><p>⏱ Tempo: <b>'+C.msClock(state.elapsed)+'</b> · Incidentes: <b>'+state.incidents+'</b> · Pontos: <strong id="victoryScore"></strong></p><button type="button" id="openGroundTour" class="btn primary victory-explore-btn">🌎 Explorar imagens do destino →</button><p class="explore-small">Paisagens artísticas com aparência fotográfica, inspiradas no local. Não são fotografias de rua reais.</p></div>';$('victoryDestination').textContent=state.mission.name;$('victoryScore').textContent=state.score;$('openGroundTour').onclick=()=>openDestinationExplorer(state.mission.id);}
function openGroundTour(){openDestinationExplorer(state.mission.id)}
function openDestinationExplorer(id=state.mission.id){
 if(!$('dialogLayer').classList.contains('hidden')){ /* conserva a partida e substitui o conteúdo atual */ }
 if(state.running&&!state.missionDone&&!state.online&&!state.paused){state.paused=true;state.galleryPausedByExplorer=true;updateEngineAudio();$('pauseBtn').textContent='▶ Retomar'}
 explorerMissionId=C.missions.some(m=>m.id===id)?id:state.mission.id;explorerSlide=0;
 $('dialogLayer').querySelector('.dialog').classList.add('explorer-mode');
 $('dialogTitle').textContent='🌎 Explorar destinos';$('dialogLayer').classList.remove('hidden');renderExplorer();$('dialogOk').focus({preventScroll:true});$('dialogContent').scrollTop=0;
}
function renderExplorer(){
 const m=C.missions.find(x=>x.id===explorerMissionId)||state.mission,story=DESTINATION_STORIES[m.id];
 const photos=['explorar-'+m.id+'.webp','explorar-'+m.id+'-detalhe.webp','explorar-'+m.id+'-panorama.webp','explorar-'+m.id+'-aproximacao.webp'].map(asset);
 const titles=['Vista geral','Paisagem local','Novo panorama','Detalhe aproximado'];
 const wrapper=$('dialogContent');wrapper.replaceChildren();
 const main=document.createElement('section');main.className='explorer-layout';
 main.innerHTML=`<div class="explorer-top"><div><span class="explorer-eyebrow">DESTINO ${m.id==='miami'?'INTERNACIONAL':'TURÍSTICO'} • GALERIA ARTÍSTICA</span><h3 id="explorerName"></h3><p id="explorerLead"></p></div><span class="explorer-counter" id="explorerCounter"></span></div><div class="explorer-stage"><img id="explorerPhoto" alt="Representação artística com aparência fotográfica" loading="eager"><div class="explorer-photo-shade"></div><div class="explorer-photo-label"><strong id="explorerSlideLabel"></strong><span id="explorerSlideNumber"></span></div><button type="button" class="explorer-arrow prev" id="explorerPrev" aria-label="Imagem anterior">‹</button><button type="button" class="explorer-arrow next" id="explorerNext" aria-label="Próxima imagem">›</button></div><div class="explorer-controls" id="explorerThumbs" role="group" aria-label="Escolher uma das quatro imagens"><button type="button" id="explorerPhoto0" class="explorer-thumb" aria-label="Mostrar vista geral"><img alt="Vista geral"></button><button type="button" id="explorerPhoto1" class="explorer-thumb" aria-label="Mostrar paisagem local"><img alt="Paisagem local"></button><button type="button" id="explorerPhoto2" class="explorer-thumb" aria-label="Mostrar novo panorama"><img alt="Novo panorama"></button><button type="button" id="explorerPhoto3" class="explorer-thumb" aria-label="Mostrar detalhe aproximado"><img alt="Detalhe aproximado"></button><span class="explorer-counter-small" id="explorerSlideCount"></span></div><p class="explorer-about" id="explorerDescription"></p><div class="explorer-landmarks"><h4>📍 Pontos turísticos da missão</h4><div id="explorerLandmarkList"></div></div><p class="explorer-legal">Imagens geradas especialmente para o jogo: representam artisticamente os destinos, não são fotografias reais, Street View nem mapas exatos. O passeio não utiliza APIs ou imagens externas.</p><div class="explorer-bottom"><button type="button" id="explorerChooseMission" class="btn primary"></button><button type="button" id="explorerReturn" class="btn minor">↩ Voltar ao jogo</button></div><div class="explorer-city-heading">CONHEÇA OUTRO DESTINO</div><div class="explorer-cities" id="explorerCities"></div>`;
 wrapper.appendChild(main);
 $('explorerName').textContent=m.name;$('explorerLead').textContent=story.lead;$('explorerDescription').textContent=story.desc;
 $('explorerLandmarkList').replaceChildren();m.landmarks.forEach((name,i)=>{let s=document.createElement('span');s.textContent=(i+1)+' · '+name;$('explorerLandmarkList').appendChild(s)});
 for(let i=0;i<photos.length;i++){let thumb=$('explorerPhoto'+i);thumb.querySelector('img').src=photos[i];thumb.querySelector('img').alt=titles[i]+' de '+m.name;thumb.onclick=()=>{explorerSlide=i;paintExplorerImage()}};
 $('explorerPrev').onclick=()=>{explorerSlide=(explorerSlide-1+photos.length)%photos.length;paintExplorerImage()};$('explorerNext').onclick=()=>{explorerSlide=(explorerSlide+1)%photos.length;paintExplorerImage()};
 $('explorerReturn').onclick=closeDialog;
 let action=$('explorerChooseMission');action.textContent=state.running?'✈ Voltar à missão em andamento':'✈ Escolher este destino para voar';action.onclick=()=>{if(!state.running)selectMission(m.id,false);closeDialog()};
 let cities=$('explorerCities');for(const city of C.missions){const b=document.createElement('button');b.type='button';b.className='explorer-city'+(city.id===m.id?' chosen':'');b.innerHTML='<img loading="lazy" alt=""><span></span>';b.querySelector('img').src=asset('explorar-'+city.id+'.webp');b.querySelector('img').alt='Paisagem artística de '+city.short;b.querySelector('span').textContent=city.short;b.onclick=()=>{explorerMissionId=city.id;explorerSlide=0;renderExplorer();$('dialogContent').scrollTop=0};cities.appendChild(b)}
 function paintExplorerImage(){let img=$('explorerPhoto');img.src=photos[explorerSlide];img.alt=titles[explorerSlide]+' — imagem artística inspirada em '+m.name;$('explorerSlideLabel').textContent=titles[explorerSlide];$('explorerSlideNumber').textContent=(explorerSlide+1)+' / '+photos.length;$('explorerSlideCount').textContent='Imagem '+(explorerSlide+1)+' de '+photos.length;$('explorerCounter').textContent=photos.length+' VISÕES';for(let i=0;i<photos.length;i++){$('explorerPhoto'+i).classList.toggle('active',i===explorerSlide);$('explorerPhoto'+i).setAttribute('aria-pressed',String(i===explorerSlide))}}paintExplorerImage();
}

const cameraLabels=['Perseguição externa','Cabine do piloto','Vista da asa','Vista aérea superior','Mapa local'];
function selectCamera(index){state.camera=C.clamp(index,0,4);state.cameraPose=null;const label=$('cameraMode');if(label)label.textContent='📷 '+String(state.camera+1)+'/5 • '+cameraLabels[state.camera];if($('cameraBtn'))$('cameraBtn').textContent='📷 '+String(state.camera+1)+'/5';$('flightArea').dataset.cameraMode=String(state.camera);const geo=$('geoMapOverlay');geo.classList.toggle('hidden',state.camera!==4);if(state.camera===4){setMobileFlightPanel('none');updateMap();drawLocalMap()} for(const b of document.querySelectorAll('[data-camera]')){const active=Number(b.dataset.camera)===state.camera;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));}toast('Câmera '+cameraLabels[state.camera]);}
function changeZoom(delta){state.cameraZoom=C.clamp(Math.round((state.cameraZoom+delta)*100)/100,.55,2.4);const label=$('zoomStatus');if(label)label.textContent=Math.round(state.cameraZoom*100)+'%';const mapLabel=$('mapZoomStatus');if(mapLabel)mapLabel.textContent=Math.round(state.cameraZoom*100)+'%';if(state.camera===4)drawLocalMap();toast('Zoom real da câmera: '+Math.round(state.cameraZoom*100)+'%')}
function changeCamera(){selectCamera((state.camera+1)%cameraLabels.length)}
function setAuto(v){state.auto=!!v;$('autoBtn').classList.toggle('on',state.auto);$('autoBtn').setAttribute('aria-pressed',String(state.auto));updateNavigator();toast(state.auto?'Rota assistida ativada':'Controle manual ativado')}
function setMode(mode){if(mode==='online'&&window.CTAOfflineOnly){toast('Multiplayer indisponível neste endereço. Use a versão no Render.');return}state.mode=mode;$('soloTab').classList.toggle('selected',mode==='solo');$('onlineTab').classList.toggle('selected',mode==='online');$('soloTab').setAttribute('aria-pressed',String(mode==='solo'));$('onlineTab').setAttribute('aria-pressed',String(mode==='online'));$('onlineControls').classList.toggle('hidden',mode!=='online')}
function docAccept(){try{localStorage.setItem('cta_ma_agreement',JSON.stringify({version:'3.7',accepted:true,at:new Date().toISOString()}));}catch{}}
async function post(url,data){const ctl=new AbortController();const timeout=setTimeout(()=>ctl.abort(),5000);try{const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:ctl.signal});if(!(res.headers.get('Content-Type')||'').includes('application/json'))throw Error('Multiplayer indisponível neste endereço: abra o jogo pelo servidor Node.js no Render (.onrender.com), ou selecione Treino local.');const body=await res.json();if(!res.ok)throw Error(body.error||'Erro '+res.status);return body}finally{clearTimeout(timeout)}}
async function connect(){const room=C.cleanRoom($('roomCode').value);if(room&&room.length!==6)throw Error('O código da sala precisa ter 6 caracteres.');const resp=await post('/api/join',{name:readName(),room,mission:state.mission.id});state.room=resp.room;state.token=resp.token;state.id=resp.playerId;state.host=resp.host;state.roundId=resp.roundId;$('roomCode').value=resp.room;if(resp.mission!==state.mission.id)selectMission(resp.mission);
 state.stream=new EventSource('/api/stream?room='+encodeURIComponent(state.room)+'&token='+encodeURIComponent(state.token));state.stream.addEventListener('snapshot',e=>{let d;try{d=JSON.parse(e.data)}catch{return}if(d.room!==state.room)return;state.host=d.host;if(d.roundId&&state.roundId&&d.roundId!==state.roundId){resetFlight();toast('Nova rodada sincronizada pelo anfitrião')}if(d.roundId)state.roundId=d.roundId;const newMission=d.mission;if(state.mission.id!==newMission)selectMission(newMission);if(Array.isArray(d.standings)){state.standings=d.standings;renderRaceboard()}state.others=d.players.filter(x=>x.id!==state.id&&x.state).map(x=>({...x.state,id:x.id,name:x.name}));updateHud();$('networkPill').textContent='● Sala '+state.room+' ('+d.players.length+'/5)';});state.stream.onerror=()=>{if(state.online){$('networkPill').textContent='● Reconectando...';alert('Conexão da sala instável; tentando reconectar','warn')}};
 state.online=true;$('networkPill').textContent='● Sala '+state.room;toast('Sala online: '+state.room+' • compartilhe o código');}
async function sendState(){if(!state.online||!state.token)return;try{await post('/api/state',{room:state.room,token:state.token,state:{...state.player}})}catch(e){if(!String(e.message).includes('frequentes')){$('networkPill').textContent='● Conexão instável'}}}
function leave(){if(state.stream){state.stream.close();state.stream=null}if(state.online&&state.token){const body=JSON.stringify({room:state.room,token:state.token});fetch('/api/leave',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true}).catch(()=>{})}state.online=false;state.others=[];state.id='';state.token='';state.room='';state.roundId='';$('networkPill').textContent='● Modo local'}
async function start(){const err=$('startError');err.textContent='';if(!$('acceptTerms').checked){err.textContent='Para jogar, leia e aceite os três documentos.';return}const name=readName();if(!name){err.textContent='Informe um apelido.';return}const button=$('startGame');button.disabled=true;unlockAudio();try{state.running=false;leave();selectMission($('destSelect').value);if(state.mode==='online')await connect();docAccept();state.running=true;state.paused=false;updateEngineAudio();welcome.classList.add('hidden');document.body.classList.add('flight-active');setMobileFlightPanel('none');$('pauseBtn').textContent='Ⅱ Pausar';alert('Bons voos, '+name+'!');updateHud()}catch(e){err.textContent='Não foi possível iniciar: '+e.message+' Verifique se o servidor Node.js está iniciado.';}finally{button.disabled=false}}
function returnHome(){state.running=false;state.paused=false;updateEngineAudio();state.keys.clear();leave();document.body.classList.remove('flight-active');setMobileFlightPanel('none');welcome.classList.remove('hidden');pane.classList.add('hidden')}
function diag(){const lines=[['Matemática do Voo',!!window.CTAMath],['Canvas 2D',!!ctx],['Radar 2D',!!radarCtx],['Destinos',C.missions.length===6],['Marcos da rota',C.route.length===3],['Eventos meteorológicos',C.WEATHER.length===5],['Vitória limpa',typeof C.raceEligible==='function'],['Coordenadas válidas',Number.isFinite(state.player.x)],['Modo online',state.online?'Sala '+state.room:'Somente quando ativado'],['Conexão',navigator.onLine?'Navegador online':'Navegador offline'],['Mapa esquemático sem internet',!!$('localMapCanvas')],['Apoio touchscreen',('ontouchstart'in window)?'Detectado':'Teclado/mouse'],['Web Audio API',AudioClass?'Disponível':'Não disponível'],['Som do avião',state.muted?'Mudo':'Ativo'],['Câmeras',cameraLabels.length]];$('dialogTitle').textContent='Diagnóstico do ambiente';$('dialogContent').innerHTML='';const box=$('dialogContent');for(const [name,value] of lines){const line=document.createElement('p');line.textContent=name+': '+(value===true?'OK':value===false?'Indisponível':value);box.appendChild(line)}$('dialogLayer').classList.remove('hidden')}

/* Matemática do Voo: painel explicativo independente da lógica da missão. */
let mathTopic='heading',mathAnswered={};
function openMath(){const panel=$('mathPanel');panel.classList.remove('hidden');panel.setAttribute('aria-hidden','false');pickMathTopic(mathTopic);$('mathClose').focus();}
function closeMath(){const panel=$('mathPanel');panel.classList.add('hidden');panel.setAttribute('aria-hidden','true');}
function pickMathTopic(topic){if(!F.questions[topic])return;mathTopic=topic;
 for(const b of document.querySelectorAll('[data-math-topic]')){const active=b.dataset.mathTopic===topic;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
 for(const item of document.querySelectorAll('[data-math-lesson]'))item.classList.toggle('hidden',item.dataset.mathLesson!==topic);
 const quiz=F.questions[topic];$('mathQuestion').textContent=quiz.question;const choices=$('mathAnswers');choices.replaceChildren();
 quiz.answers.forEach((name,index)=>{const b=document.createElement('button');b.type='button';b.className='math-answer';b.textContent=String.fromCharCode(65+index)+'. '+name;b.addEventListener('click',()=>answerMath(topic,index));choices.appendChild(b)});
 $('mathFeedback').textContent='Escolha uma resposta.';$('mathFeedback').dataset.result='waiting';
 updateMathPanel();
}
function answerMath(topic,index){if(!F.questions[topic]||topic!==mathTopic)return;const right=F.check(topic,index);const buttons=[...$('mathAnswers').children];for(const [i,b] of buttons.entries()){b.classList.toggle('correct',i===F.questions[topic].correct);b.classList.toggle('wrong',i===index&&!right);b.disabled=true;}
 $('mathFeedback').textContent=(right?'✓ Isso mesmo! ':'↗ Quase! ')+F.questions[topic].reason;$('mathFeedback').dataset.result=right?'correct':'wrong';mathAnswered[topic]=right;}
function updateMathPanel(){if($('mathPanel').classList.contains('hidden'))return;const p=state.player,component=F.components(p.speed,p.heading),heading=C.norm(p.heading);const fmt=n=>Math.round(n).toLocaleString('pt-BR');
 if(mathTopic==='heading'){
  const r=heading*Math.PI/180,x=160+Math.sin(r)*79,y=119-Math.cos(r)*79;
  $('mathHeadingArrow').setAttribute('x2',String(x));$('mathHeadingArrow').setAttribute('y2',String(y));
  $('mathEastLeg').setAttribute('x2',String(x));$('mathEastLeg').setAttribute('y2','119');
  $('mathNorthLeg').setAttribute('x1',String(x));$('mathNorthLeg').setAttribute('x2',String(x));$('mathNorthLeg').setAttribute('y1','119');$('mathNorthLeg').setAttribute('y2',String(y));
  $('mathHeadingLabel').textContent='Rumo '+fmt(heading)+'°';$('mathHeadingNow').textContent='Rumo '+fmt(heading)+'° · '+fmt(p.speed)+' kt';
  $('mathVectorValues').textContent=(component.east>=0?'Leste':'Oeste')+': '+fmt(Math.abs(component.east))+' kt · '+(component.north>=0?'Norte':'Sul')+': '+fmt(Math.abs(component.north))+' kt';
 }else if(mathTopic==='slope'){
  const a=Number($('mathAngle').value),result=F.slope(1000,a),visY=204-(25+a*7.8);
  $('mathAngleValue').textContent=a+'°';$('mathSlopeHeight').textContent=a+'° → '+fmt(result.height)+' m de variação de altura a cada 1.000 m';
  $('mathSlopeFigureLabel').textContent='Δh = '+fmt(result.height)+' m';$('mathSlopeFigureLabel').setAttribute('y',String(Math.max(57,visY-13)));
  $('mathSlopePath').setAttribute('y2',String(visY));$('mathSlopePlane').setAttribute('transform','translate(290 '+visY+') rotate(-'+a+')');
  $('mathVerticalNow').textContent='Seu avião: altitude '+fmt(p.alt)+' m · '+(state.motion.vertical>1?'subindo':state.motion.vertical< -1?'descendo':'nivelado');
 }else if(mathTopic==='turn'){
  const a=Number($('mathBankAngle').value),r=F.turnRadius(p.speed,a);
  $('mathBankPlane').setAttribute('transform','rotate('+a+' 160 154)');$('mathBankFigureLabel').textContent='Inclinação de referência: '+a+'°';$('mathBankValue').textContent=a+'°';
  $('mathTurnRadius').textContent='Raio teórico: '+fmt(r)+' m, a '+fmt(p.speed)+' kt';
  $('mathBankNow').textContent='No jogo: inclinação visual '+fmt(state.motion.bank)+'°';
 }
}
function initMath(){for(const id of ['mathHeaderBtn','mathDockBtn','mathWelcomeBtn'])$(id).addEventListener('click',openMath);
 $('mathClose').addEventListener('click',closeMath);document.querySelectorAll('[data-math-topic]').forEach(b=>b.addEventListener('click',()=>pickMathTopic(b.dataset.mathTopic)));
 $('mathAngle').addEventListener('input',updateMathPanel);$('mathBankAngle').addEventListener('input',updateMathPanel);
 pickMathTopic('heading');}

function bind(){for(const m of C.missions){const o=document.createElement('option');o.value=m.id;o.textContent=m.name;$('destSelect').appendChild(o)}renderDestinations();$('destSelect').onchange=e=>selectMission(e.target.value,false);$('soloTab').onclick=()=>setMode('solo');$('onlineTab').onclick=()=>setMode('online');$('newRoom').onclick=()=>{if(globalThis.crypto&&crypto.getRandomValues){const bytes=new Uint8Array(6);crypto.getRandomValues(bytes);$('roomCode').value=Array.from(bytes,n=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[n%32]).join('');toast('Código criado. Compartilhe apenas com convidados.')}else{$('roomCode').value='';toast('Clique Iniciar para o servidor criar um código seguro.')}};$('startGame').onclick=start;$('navFollow').onclick=()=>{if(state.running&&!state.missionDone)setAuto(!state.auto)};$('soundBtn').onclick=toggleMute;$('atcExecute').onclick=executeATC;$('atcRoute').onclick=routeBriefing;$('atcToggle').onclick=()=>{const p=$('atcPanel'),open=p.dataset.expanded!=='true';p.dataset.expanded=String(open);$('atcToggle').setAttribute('aria-expanded',String(open));$('atcToggle').textContent=open?'⌃':'⌄'};for(const id of ['exploreHeaderBtn','exploreWelcomeBtn','exploreDockBtn','exploreSideBtn'])$(id).onclick=()=>openDestinationExplorer(state.mission.id);
 $('menuBtn').onclick=()=>pane.classList.toggle('hidden');$('closeSide').onclick=()=>pane.classList.add('hidden');$('restartBtn').onclick=async()=>{if(state.online){if(state.id!==state.host){toast('Somente o anfitrião reinicia a corrida online');return}try{await post('/api/mission',{room:state.room,token:state.token,mission:state.mission.id})}catch(e){toast('Falha no reinício: '+e.message);return}}resetFlight();pane.classList.add('hidden');updateHud();toast('Nova corrida iniciada')};$('homeBtn').onclick=returnHome;$('globeBtn').onclick=()=>{selectCamera(4);pane.classList.add('hidden');};
 for(const b of document.querySelectorAll('[data-camera]'))b.onclick=()=>selectCamera(Number(b.dataset.camera));$('cameraBtn').onclick=changeCamera;$('zoomInBtn').onclick=()=>changeZoom(.16);$('zoomOutBtn').onclick=()=>changeZoom(-.16);$('mapClose').onclick=()=>selectCamera(0);$('mapZoomInBtn').onclick=()=>changeZoom(.16);$('mapZoomOutBtn').onclick=()=>changeZoom(-.16);$('autoBtn').onclick=()=>setAuto(!state.auto);$('pauseBtn').onclick=()=>{if(state.online){toast('Pausa compartilhada indisponível no multiplayer');return}state.paused=!state.paused;updateEngineAudio();$('pauseBtn').textContent=state.paused?'▶ Retomar':'Ⅱ Pausar';alert(state.paused?'Voo pausado':'Voo retomado')};$('qaBtn').onclick=diag;$('helpBtn').onclick=()=>showDoc('help');
 for(const b of document.querySelectorAll('[data-doc]'))b.onclick=e=>{e.preventDefault();showDoc(b.dataset.doc)};$('closeDialog').onclick=closeDialog;$('dialogOk').onclick=closeDialog;$('dialogLayer').onclick=e=>{if(e.target===$('dialogLayer'))closeDialog()};
 const km={KeyW:'faster',KeyS:'slower',KeyA:'left',KeyD:'right',ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};document.addEventListener('keydown',e=>{if(e.target.matches('input,select,textarea'))return;if(km[e.code]){if(!state.keys.has(km[e.code]))nudgeControl(km[e.code]);state.keys.add(km[e.code]);e.preventDefault()}else if(!e.repeat&&e.code==='KeyP'){setAuto(!state.auto)}else if(!e.repeat&&e.code==='KeyC'){changeCamera()}else if(!e.repeat&&e.code==='KeyM'){toggleMute()}else if(!e.repeat&&e.code==='KeyG'){if(state.running&&!state.missionDone)setAuto(!state.auto)}else if(!e.repeat&&e.code==='KeyZ'){changeZoom(.16)}else if(!e.repeat&&e.code==='KeyX'){changeZoom(-.16)}else if(!e.repeat&&e.code==='Space'){$('pauseBtn').click();e.preventDefault()}else if(e.code==='Escape'){closeDialog();closeMath();setMobileFlightPanel('none');pane.classList.add('hidden')}});document.addEventListener('keyup',e=>{if(km[e.code])state.keys.delete(km[e.code])});window.addEventListener('blur',()=>state.keys.clear());for(const b of document.querySelectorAll('[data-hold]')){const k=b.dataset.hold;const off=e=>{state.keys.delete(k);b.classList.remove('active');if(e&&b.hasPointerCapture(e.pointerId))b.releasePointerCapture(e.pointerId)};b.addEventListener('pointerdown',e=>{e.preventDefault();nudgeControl(k);state.keys.add(k);b.classList.add('active');b.setPointerCapture(e.pointerId)});b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off);b.addEventListener('lostpointercapture',()=>{state.keys.delete(k);b.classList.remove('active')})}
 initMobileCockpit();initMath();window.addEventListener('resize',resize);audioUI();selectCamera(0);window.addEventListener('pagehide',()=>{if(state.stream)state.stream.close()});resize();updateHud();draw();}
/* Motor gráfico: projeção 3D em Canvas, geometria e texturas procedurais originais. */
const S={faces:[],labels:[],land:[],sceneId:'',meshCache:[],sunAngle:0};
const v=(x,y,z)=>({x,y,z});const add=(a,b)=>v(a.x+b.x,a.y+b.y,a.z+b.z);const sub=(a,b)=>v(a.x-b.x,a.y-b.y,a.z-b.z);const mul=(a,m)=>v(a.x*m,a.y*m,a.z*m);const dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;const cross=(a,b)=>v(a.y*b.z-a.z*b.y,a.z*b.x-a.x*b.z,a.x*b.y-a.y*b.x);const unit=a=>{const l=Math.hypot(a.x,a.y,a.z)||1;return mul(a,1/l)};
function resize(){const r=$('world').getBoundingClientRect();pr=Math.min(window.devicePixelRatio||1,1.65);winW=Math.max(1,r.width);winH=Math.max(1,r.height);$('world').width=Math.round(winW*pr);$('world').height=Math.round(winH*pr);ctx.setTransform(pr,0,0,pr,0,0);const rad=$('radar');const dpr=Math.min(devicePixelRatio||1,2);rad.width=Math.round(300*dpr);rad.height=Math.round(230*dpr);radarCtx.setTransform(dpr,0,0,dpr,0,0)}
function deterministic(x,z,k=0){let h=Math.sin(x*127.1+z*311.7+k*74.7)*43758.5453123;return h-Math.floor(h)}
function landType(theme,x,z){if(theme==='resort')return 'land';if(theme==='island'){const e=((x+2)/157)**2+((z+4)/119)**2;return e<1+.045*Math.sin(x*.05)?'land':'sea'}if(theme==='rio')return x*.75+z*.3>75?'sea':'land';if(theme==='miami')return x*.8+z*.1>15?'sea':'land';return x*.4+z*.9>100?'sea':'land'}
function shade(hex,amount){if(typeof hex!=='string'||hex[0]!=='#')return hex;const n=parseInt(hex.slice(1),16),r=Math.max(0,Math.min(255,(n>>16)+amount)),g=Math.max(0,Math.min(255,((n>>8)&255)+amount)),b=Math.max(0,Math.min(255,(n&255)+amount));return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}
function groundLevel(theme,x,z){const noise=deterministic(x*.13,z*.13,7)*6+deterministic(x*.04,z*.04,8)*10;let h=noise; if(theme==='rio')h+=Math.max(0,32-Math.hypot(x-55,z+10))*1.05+Math.max(0,24-Math.hypot(x-25,z+66))*.9; else if(theme==='island')h+=Math.max(0,36-Math.hypot(x-24,z+2))*1.55+Math.max(0,22-Math.hypot(x+92,z-34))*.8; else if(theme==='miami')h*=.4; else if(theme==='fortaleza')h*=.55; else if(theme==='resort')h*=.5; return Math.round(h*10)/10}
function face(points,color,stroke=null){S.meshCache.push({p:points,c:color,s:stroke})}
function prism(x,z,w,d,height,colors,baseY=0){const y=baseY+height;const p=[v(x-w/2,baseY,z-d/2),v(x+w/2,baseY,z-d/2),v(x+w/2,baseY,z+d/2),v(x-w/2,baseY,z+d/2)];const t=p.map(a=>v(a.x,y,a.z));face([p[0],p[1],t[1],t[0]],colors[1]);face([p[1],p[2],t[2],t[1]],colors[2]);face([p[2],p[3],t[3],t[2]],colors[1]);face([p[3],p[0],t[0],t[3]],colors[2]);face(t,colors[0]);return {bottom:p,top:t}}
function tower(x,z,h=30,baseY=0){prism(x,z,5,5,h,['#d1e7e7','#96cbdc','#6d9eb8'],baseY);prism(x,z,8,8,3,['#bedce5','#c6c7bc','#758e95'],baseY+h);}
function cone(x,z,r,h,color,tip,baseY=0){const sides=7,pts=[];for(let i=0;i<sides;i++){const a=TWO*i/sides;pts.push(v(x+Math.cos(a)*r,baseY,z+Math.sin(a)*r))}const peak=v(x+(tip||0),baseY+h,z);for(let i=0;i<sides;i++)face([pts[i],pts[(i+1)%sides],peak],i%2===0?color:shade(color,-20))}
function pool(x,z,r,baseY=0){const corners=[v(x-r,baseY+.25,z-r*.5),v(x+r,baseY+.25,z-r*.5),v(x+r,baseY+.25,z+r*.5),v(x-r,baseY+.25,z+r*.5)];const rim=corners.map(p=>v(p.x+Math.sign(p.x-x)*2,baseY+.23,p.z+Math.sign(p.z-z)*2));face(rim,'#f1e8cf');face(corners,'#46dcdf');face([v(x-r*.6,baseY+.5,z),v(x-r*.1,baseY+.5,z-r*.2),v(x+r*.4,baseY+.5,z+r*.2),v(x+r*.6,baseY+.5,z)],'#d9fff2')}
function palm(x,z,size=1,baseY=0){const h=14*size;const trunk='#a98757';prism(x,z,1.4*size,1.4*size,h,[trunk,'#8d714f','#bd9b6a'],baseY);for(let i=0;i<7;i++){const a=TWO*i/7;const tip=v(x+Math.cos(a)*h*.85,baseY+h*.48,z+Math.sin(a)*h*.85);face([v(x,baseY+h,z),v(x+Math.cos(a+.28)*h*.34,baseY+h*.87,z+Math.sin(a+.28)*h*.34),tip,v(x+Math.cos(a-.25)*h*.34,baseY+h*.87,z+Math.sin(a-.25)*h*.34)],i%2?'#207b5f':'#3f9b6c')}}
function makeScene(){S.sceneId=state.mission.id;S.meshCache=[];S.labels=[];const theme=state.mission.theme;
 const shades={sea:['#0f719f','#1788bb','#2a9ece','#1889b5'],land:['#557f63','#628c6d','#6c9775','#5d8b66'],beach:['#d9c58f','#e7d6a8','#f0deae','#d5c48b'],accent:['#69d8dc','#8ce9ea','#f6f1bb']};
 const size=20;for(let x=-260;x<260;x+=size)for(let z=-260;z<260;z+=size){const midX=x+size*.5,midZ=z+size*.5,a=landType(theme,midX,midZ),index=Math.floor(deterministic(x,z,2)*4);let color=shades[a][index];let coastNearby=0;for(const d of [[size,0],[-size,0],[0,size],[0,-size]])if(landType(theme,midX+d[0],midZ+d[1])==='sea')coastNearby++;if(a==='land'&&coastNearby)color=shades.beach[index];
 const h00=a==='sea'?-1.4+Math.sin((x+state.elapsed*20)*.06)*.8+deterministic(x,z,4)*.5:groundLevel(theme,x,z);const h10=a==='sea'?-1.3+Math.sin((x+size+state.elapsed*20)*.06)*.8+deterministic(x+2,z,4)*.5:groundLevel(theme,x+size,z);const h11=a==='sea'?-1.2+Math.sin((x+size+z+size+state.elapsed*16)*.04)*.7+deterministic(x+2,z+2,4)*.5:groundLevel(theme,x+size,z+size);const h01=a==='sea'?-1.4+Math.sin((z+size+state.elapsed*16)*.05)*.7+deterministic(x,z+2,4)*.5:groundLevel(theme,x,z+size);
 face([v(x,h00,z),v(x+size,h10,z),v(x+size,h11,z+size),v(x,h01,z+size)],color,a==='sea'?'#6bcff926':'#ffffff14');
 if(a==='sea'&&deterministic(x,z,11)>.8)face([v(x+3,Math.max(h00,h10)+.15,z+4),v(x+size-2,Math.max(h00,h10)+.2,z+6),v(x+size-6,Math.max(h11,h01)+.15,z+8),v(x+5,Math.max(h11,h01)+.1,z+7)],'#aaf8ff2a');}
 for(let i=0;i<86;i++){const x=deterministic(i*8,6,3)*410-205,z=deterministic(i*4,83,1)*410-205;if(landType(theme,x,z)!=='land')continue;const y=groundLevel(theme,x,z);const likelyCity=(theme==='rio'||theme==='miami'||theme==='fortaleza');if(likelyCity){if(deterministic(i,5)<.18)continue;const w=5+deterministic(i,4)*8,h=(theme==='miami'?24:12)+deterministic(i,36)*(theme==='miami'?78:42);const city=[['#d9ecf3','#93b8c8','#5c90a8'],['#f2e6d6','#c7c9b6','#8e9fa8'],['#d4f1fb','#8fd0df','#5a95b1'],['#f6d3c2','#d4a89f','#9f7f74']];prism(x,z,w,w*.9,h,city[i%4],y);}else if(deterministic(i,15)>.34){const h=12+deterministic(i,19)*22;cone(x,z,11,h,'#5e9674',0,y)}}
 for(let i=0;i<28;i++){const x=deterministic(i,27,5)*430-215,z=deterministic(i,28,3)*430-215;if(landType(theme,x,z)==='land')palm(x,z,.65+deterministic(i,34)*.8,groundLevel(theme,x,z))}
 if(theme==='island'){cone(24,-2,31,82,'#788981',0,groundLevel(theme,24,-2));cone(-92,34,25,38,'#697f74',0,groundLevel(theme,-92,34));}
 if(theme==='rio'){cone(71,3,30,94,'#5d8c7b',0,groundLevel(theme,71,3));cone(31,-67,38,72,'#627b70',0,groundLevel(theme,31,-67));const by=groundLevel(theme,-49,-44);prism(-49,-44,17,15,18,['#929c9d','#6f8582','#566a73'],by);prism(-49,-44,4,5,39,['#dfe7db','#d3d5c6','#b4b6aa'],by+18);face([v(-49,by+57,-44),v(-65,by+54,-44),v(-65,by+48,-44),v(-33,by+48,-44),v(-33,by+54,-44)],'#edece1')}
 if(theme==='resort'){for(const [px,pz,r] of [[-49,-44,23],[13,10,22],[91,81,23]])pool(px,pz,r,groundLevel(theme,px,pz));for(let i=0;i<6;i++){const x=-50+(i%3)*14,z=-72+Math.floor(i/3)*15;prism(x,z,10,6,8,['#edb983','#bc8f63','#b1a37d'],groundLevel(theme,x,z))}}
 if(theme==='miami'){for(let i=0;i<4;i++){const x=-64+i*9,z=-45-i*2;prism(x,z,7,7,68+i*7,['#d1edf4','#a3b9cf','#76aab6'],groundLevel(theme,x,z));}}
 if(theme==='fortaleza'){for(let i=0;i<12;i++){const x=-90+i*15,z=80-i*2;if(landType(theme,x,z)==='land'){const y=groundLevel(theme,x,z);prism(x,z,5,5,4,['#eccb9c','#b7a58f','#d1a37f'],y);face([v(x-7,y+5,z-7),v(x+7,y+5,z-7),v(x,y+9,z)],i%2?'#ffd968':'#eb9586')}}}
 if(theme!=='resort'){for(let i=0;i<5;i++){const x=40+i*18,z=-50-i*16;if(landType(theme,x,z)==='sea'){const y=groundLevel(theme,x,z)+.4;face([v(x,y,z),v(x+16,y,z),v(x+9,y,z+2),v(x,y,z+2)],'#83d7e3')}}}
 S.labels=C.route.map((p,i)=>({...p,name:state.mission.landmarks[i]}));}
let camPos,camF,camRight,camUp,focal;
function setCamera(){
 const p=state.player,h=p.heading*Math.PI/180,fx=Math.sin(h),fz=Math.cos(h),zx=state.cameraZoom;
 let eye,target;
 if(state.camera===0){ // perseguição alinhada ao rumo, aproximando com zoom
  eye=v(p.x-fx*103/zx,p.alt+45/zx,p.z-fz*103/zx);
  target=v(p.x+fx*52,p.alt-45+state.motion.pitch*.48,p.z+fz*52);
 }else if(state.camera===1){ // visão do para-brisa, sem marchas para trás
  eye=v(p.x+fx*5,p.alt+5,p.z+fz*5);
  target=v(p.x+fx*170,p.alt-44+state.motion.pitch*.72,p.z+fz*170);
 }else if(state.camera===2){ // vista da asa lateral, gira com o avião
  eye=v(p.x-fx*118/zx+fz*79/zx,p.alt+72/zx,p.z-fz*118/zx-fx*79/zx);
  target=v(p.x+fx*35,p.alt-33,p.z+fz*35);
 }else if(state.camera===3){ // vista superior, acompanha rumo
  eye=v(p.x-fx*43/zx,p.alt+230/zx,p.z-fz*43/zx);
  target=v(p.x+fx*30,p.alt-32,p.z+fz*30);
 }else{
  eye=v(p.x,p.alt+500/zx,p.z-20/zx);target=v(p.x,p.alt-100,p.z+10);
 }
 const ease=1-Math.exp(-7*state.frameDt);
 if(!state.cameraPose){state.cameraPose={eye,target}}else{
  const old=state.cameraPose;old.eye=add(old.eye,mul(sub(eye,old.eye),ease));old.target=add(old.target,mul(sub(target,old.target),ease));
 }
 camPos=state.cameraPose.eye;camF=unit(sub(state.cameraPose.target,camPos));camRight=unit(cross(v(0,1,0),camF));camUp=unit(cross(camF,camRight));
 // field-of-view also zooms the cockpit; externally camera displacement and plane sprite follow the same zoom factor.
 focal=Math.min(winW*1.05,winH*1.45)*(state.camera===1?zx:1);
}
function project(point){const d=sub(point,camPos),depth=dot(d,camF);if(depth<4)return null;return {x:winW*.5+focal*dot(d,camRight)/depth,y:winH*.50-focal*dot(d,camUp)/depth,d:depth}}
function queuedPolygon(points,color,stroke=null){const p=points.map(project);if(p.some(q=>!q))return;const depth=p.reduce((a,b)=>a+b.d,0)/p.length;S.faces.push({p,color,stroke,depth})}
function line3(a,b,color,width=2,dashed=false){const A=project(a),B=project(b);if(!A||!B)return;ctx.save();ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.lineTo(B.x,B.y);ctx.strokeStyle=color;ctx.lineWidth=width;if(dashed)ctx.setLineDash([8,9]);ctx.stroke();ctx.restore()}
function rotated(p,heading,local){const h=heading*Math.PI/180,c=Math.cos(h),s=Math.sin(h);return v(p.x+local.x*c+local.z*s,p.alt+local.y,p.z-local.x*s+local.z*c)}
function planeGeometry(p,heading,color='#e6f5ff'){const r=(x,y,z)=>rotated(p,heading,v(x*.78,y*.78,z*.78));const parts=[
 [[[-1.8,0,7],[1.8,0,7],[1.6,0,-10],[-1.6,0,-10]],'#d9eaf1'],
 [[[-1.8,.1,7],[0,.3,14],[1.8,.1,7]],'#fbffff'],
 [[[-1.5,.3,4],[1.5,.3,4],[1.25,.3,-8],[-1.25,.3,-8]],color],
 [[[-1.3,.3,5],[0,.38,7],[1.3,.3,5]],'#25506a'],
 [[[-1,0,2],[-14,-.9,-4],[-12,-.9,-5],[-1,0,-2]],'#d2e6ee'],
 [[[1,0,2],[14,-.9,-4],[12,-.9,-5],[1,0,-2]],'#f4ffff'],
 [[[-1,.4,-8],[-6.2,.1,-12],[-5,.1,-13],[-1,.4,-11]],'#bfd7e0'],
 [[[1,.4,-8],[6.2,.1,-12],[5,.1,-13],[1,.4,-11]],'#e8f8fc'],
 [[[0,.3,-11],[0,7,-12],[0,.8,-15]],'#337da1']];
 for(const [vertices,c]of parts)queuedPolygon(vertices.map(a=>r(...a)),c);
}
// A paisagem não segue o avião; ela passa na direção oposta do olhar.
// Rumo contínuo (sem reiniciar em 0°/360°) e amortecimento impedem inversões e saltos.
function updateSceneryTracking(){
 const s=state.scenery,p=state.player;
 const delta=C.turnDelta(s.lastHeading,p.heading);
 s.lastHeading=p.heading;s.worldYaw+=delta;
 const dt=state.running&&!state.paused&&!state.missionDone?state.frameDt:Math.max(.001,state.frameDt);
 const ease=1-Math.exp(-10*Math.max(0.001,dt));
 s.visibleYaw+=(s.worldYaw-s.visibleYaw)*ease;
 s.visibleAlt+=(p.alt-s.visibleAlt)*ease;
}
function drawSceneryClouds(yaw,alt){
 // Nuvens próximas se deslocam mais que o fundo: profundidade sem imagens externas.
 const move=(yaw-45)*3.4, rise=(alt-280)*.15;
 ctx.save();
 for(let i=0;i<13;i++){
  const rw=35+deterministic(i,23,4)*89;
  const rh=10+deterministic(i,72,8)*24;
  const period=winW+rw*4;
  const dx=((i*197+deterministic(i,13)*157-move*1.36)%period+period)%period-rw*2;
  const dy=winH*(.1+deterministic(i,19,2)*.34)+rise;
  const c=ctx.createRadialGradient(dx,dy,3,dx,dy,rw);
  c.addColorStop(0,'rgba(246,253,255,.14)');c.addColorStop(.45,'rgba(234,248,255,.08)');c.addColorStop(1,'rgba(231,247,255,0)');
  ctx.save();ctx.translate(dx,dy);ctx.scale(1,rh/rw);ctx.translate(-dx,-dy);
  ctx.fillStyle=c;ctx.fillRect(dx-rw,dy-rw,rw*2,rw*2);ctx.restore();
 }
 ctx.restore();
}
function drawSky(){
 const image=scenicImages[state.mission.id],p=state.player,s=state.scenery;
 if(image&&image.complete&&image.naturalWidth){
  // Uma arte simples vira uma faixa panorâmica reversível e contínua:
  // virar DIREITA -> terreno vai ESQUERDA; virar ESQUERDA -> terreno vai DIREITA.
  // Repetições espelhadas evitam saltos quando o avião completa 360°.
  const ratio=Math.max(winW/image.width,winH/image.height)*1.50*Math.pow(state.cameraZoom,.08);
  const tw=image.width*ratio,th=image.height*ratio;
  const headingChange=s.visibleYaw-45;
  const yawParallax=-headingChange*tw/220;
  const h=s.visibleYaw*Math.PI/180;
  // Pequena translação lateral é independente da rotação da câmera.
  const lateralWorld=(p.x+111)*Math.cos(h)-(p.z+111)*Math.sin(h);
  const sideways=-lateralWorld*.22;
  const verticalDrift=(s.visibleAlt-280)*.24-state.motion.pitch*5.2;
  const originX=(winW-tw)*.5+yawParallax+sideways;
  const dy=C.clamp((winH-th)*.50+verticalDrift,winH-th,0);
  const roll=-state.motion.bank*Math.PI/180*.20;
  ctx.save();ctx.translate(winW*.5,winH*.5);ctx.rotate(roll);
  const overscan=Math.max(winW,winH)*.22;
  const localOrigin=originX-winW*.5;
  // Reduz numericamente deslocamentos imensos mantendo a paridade das imagens.
  const period=2*tw,wrappedOrigin=((localOrigin%period)+period)%period;
  const first=Math.floor((-winW*.5-overscan-wrappedOrigin)/tw);
  const last=Math.ceil((winW*.5+overscan-wrappedOrigin)/tw);
  for(let i=first;i<=last;i++){
   const x=wrappedOrigin+i*tw;
   if(Math.abs(i%2)===1){ctx.save();ctx.translate(x+tw,0);ctx.scale(-1,1);ctx.drawImage(image,0,dy-winH*.5,tw,th);ctx.restore()}
   else ctx.drawImage(image,x,dy-winH*.5,tw,th);
  }
  ctx.restore();
  // Offset também serve para auditoria no QA; não contém informações pessoais.
  s.viewShiftX=yawParallax;s.viewShiftY=dy;
  drawSceneryClouds(s.visibleYaw,s.visibleAlt);
  const wash=ctx.createLinearGradient(0,0,0,winH);wash.addColorStop(0,'rgba(8,35,65,.045)');wash.addColorStop(.72,'rgba(3,22,36,.10)');wash.addColorStop(1,'rgba(4,26,36,.30)');ctx.fillStyle=wash;ctx.fillRect(0,0,winW,winH);
  return;
 }
 // O movimento continua sem imagens: terreno vetorial 3D gira com a câmera.
 const g=ctx.createLinearGradient(0,0,0,winH);g.addColorStop(0,'#0d2446');g.addColorStop(.24,'#215b8d');g.addColorStop(.56,'#5ca9d5');g.addColorStop(.8,'#b9e4f6');g.addColorStop(1,'#e8ebd7');ctx.fillStyle=g;ctx.fillRect(0,0,winW,winH);
 drawSceneryClouds(s.visibleYaw,s.visibleAlt);
}
function drawWingView(){if(state.camera!==2)return;const w=winW,h=winH;ctx.save();
 // Geometria de asa vista da janela, fixa à aeronave; o terreno se move com o rumo.
 const b=C.clamp(state.motion.bank,-30,30)*.33;
 ctx.translate(w*.75,h*.78);ctx.rotate(b*Math.PI/180);
 const wing=ctx.createLinearGradient(-w*.14,-h*.16,w*.22,h*.10);wing.addColorStop(0,'#f8ffff');wing.addColorStop(.46,'#bdd4e3');wing.addColorStop(1,'#476f91');ctx.fillStyle=wing;
 ctx.beginPath();ctx.moveTo(-w*.12,h*.04);ctx.lineTo(w*.44,-h*.37);ctx.lineTo(w*.49,-h*.29);ctx.lineTo(w*.1,h*.12);ctx.lineTo(-w*.20,h*.15);ctx.closePath();ctx.fill();ctx.strokeStyle='#072f56';ctx.lineWidth=3;ctx.stroke();
 ctx.fillStyle='#0f79a0';ctx.beginPath();ctx.moveTo(w*.37,-h*.318);ctx.lineTo(w*.46,-h*.36);ctx.lineTo(w*.45,-h*.275);ctx.lineTo(w*.34,-h*.247);ctx.closePath();ctx.fill();
 ctx.restore();}

function drawCockpit(){if(state.camera!==1)return;const w=winW,h=winH;ctx.save();ctx.fillStyle='#091827ec';ctx.beginPath();ctx.moveTo(0,h*.84);ctx.quadraticCurveTo(w*.5,h*.73,w,h*.84);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();ctx.fill();ctx.strokeStyle='#7eacba';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,h*.83);ctx.quadraticCurveTo(w*.5,h*.72,w,h*.83);ctx.stroke();for(let i=-1;i<=1;i++){const x=w*.5+i*Math.min(160,w*.22),y=h*.9;ctx.beginPath();ctx.arc(x,y,Math.min(40,w*.10),0,TWO);ctx.fillStyle='#092c40';ctx.fill();ctx.strokeStyle='#70dbea';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+20,y-9);ctx.stroke();}ctx.fillStyle='#d9f9ff';ctx.textAlign='center';ctx.font='bold 13px Segoe UI,Arial';ctx.fillText('CTA • PAINEL DE VOO',w*.5,h*.975);ctx.restore()}
function sceneObjects(){S.faces.length=0;for(const m of S.meshCache)queuedPolygon(m.p,m.c,m.s);
 const shadowPlanes=[state.player,...allPlanes()].filter(a=>Number.isFinite(a.x)&&Number.isFinite(a.alt));for(const a of shadowPlanes){const y=Math.max(-1,Math.min(groundLevel(state.mission.theme,a.x,a.z)+.3,a.alt-6));const sh=project(v(a.x,y,a.z));if(sh){ctx.save();ctx.fillStyle='rgba(5,20,32,.18)';ctx.beginPath();ctx.ellipse(sh.x,sh.y,18,8,0,0,TWO);ctx.fill();ctx.restore();}}
 const self=state.player;if(state.camera===2)planeGeometry(self,self.heading,'#fbf5e9');for(const a of allPlanes())if(Number.isFinite(a.x)&&Number.isFinite(a.alt))planeGeometry(a,a.heading,a.color||'#ffdf96');
 S.faces.sort((a,b)=>b.depth-a.depth);
 for(const f of S.faces){ctx.beginPath();ctx.moveTo(f.p[0].x,f.p[0].y);for(let i=1;i<f.p.length;i++)ctx.lineTo(f.p[i].x,f.p[i].y);ctx.closePath();ctx.fillStyle=f.color;ctx.fill();if(f.stroke){ctx.strokeStyle=f.stroke;ctx.lineWidth=1;ctx.stroke()}}
}
function drawMarkers(){const route=C.route;for(let i=0;i<route.length;i++){const w=route[i],active=i===state.waypoint;const base=project(v(w.x,3,w.z)),top=project(v(w.x,Math.max(w.alt,110)+28,w.z));if(base&&top){ctx.save();ctx.strokeStyle=i<state.waypoint?'#a3ffc599':active?'#ffe0a8dd':'#98b8d9a8';ctx.lineWidth=active?3:1.3;ctx.setLineDash(active?[6,5]:[4,8]);ctx.beginPath();ctx.moveTo(base.x,base.y);ctx.lineTo(top.x,top.y);ctx.stroke();ctx.restore()}
 const s=project(v(w.x,w.alt+24,w.z));if(!s||s.x<5||s.x>winW-5||s.y<5||s.y>winH-5)continue;
 ctx.save();ctx.translate(s.x,s.y);ctx.lineWidth=2;ctx.strokeStyle=i<state.waypoint?'#8cffc1':active?'#ffe39a':'#b5eaff';ctx.fillStyle=active?'#ffdf84':'#d4edff';ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(10,0);ctx.lineTo(0,12);ctx.lineTo(-10,0);ctx.closePath();ctx.stroke();if(active){ctx.beginPath();ctx.arc(0,0,20+Math.sin(state.elapsed*3)*2,0,TWO);ctx.stroke();}ctx.font='bold 12px Segoe UI,Arial';const label=(i+1)+'. '+state.mission.landmarks[i];const width=ctx.measureText(label).width;ctx.fillStyle='#071d30db';ctx.fillRect(-width/2-9,19,width+18,23);ctx.fillStyle='#eff9ff';ctx.textAlign='center';ctx.fillText(label,0,35);ctx.restore()}}
function drawMotionCues(){
 if(!state.running||state.camera===4)return;
 const intensity=C.clamp((state.player.speed-90)/170,0,1);
 const turnShift=(state.scenery.visibleYaw-45)*2.4;
 const advance=state.elapsed*state.player.speed*.20;
 ctx.save();ctx.strokeStyle='rgba(226,249,255,'+(0.05+intensity*.13)+')';ctx.lineWidth=1.1;
 for(let i=0;i<22;i++){
  const x=((i*173-turnShift*(.7+i%4*.15)+advance*.45)%(winW+100)+(winW+100))%(winW+100)-50;
  const y=((i*107+advance*.25)%(winH+100)+(winH+100))%(winH+100)-50;
  const len=5+intensity*24;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-len*.1,y+len*.72);ctx.stroke();
 }ctx.restore();
}
function drawFlightLines(){const w=C.route[state.waypoint];if(w&&!state.missionDone)line3(v(state.player.x,state.player.alt,state.player.z),v(w.x,w.alt,w.z),'#e6f6ff92',2,true)}
function drawRadar(){const r=radarCtx,w=300,h=230;r.clearRect(0,0,w,h);r.fillStyle='#061a28';r.fillRect(0,0,w,h);const cx=150,cy=114,scale=.54;r.strokeStyle='#235c66';r.lineWidth=1;for(const k of [37,73,108]){r.beginPath();r.arc(cx,cy,k,0,TWO);r.stroke()}r.beginPath();r.moveTo(0,cy);r.lineTo(w,cy);r.moveTo(cx,0);r.lineTo(cx,h);r.stroke();r.save();r.beginPath();r.rect(0,0,w,h);r.clip();const p=state.player;const at=o=>[cx+(o.x-p.x)*scale,cy-(o.z-p.z)*scale];
 r.beginPath();r.strokeStyle='#ffdb8f7c';r.lineWidth=1.4;r.setLineDash([5,5]);let track=[p,...C.route.slice(state.waypoint)];track.forEach((q,i)=>{const [x,y]=at(q);if(i===0)r.moveTo(x,y);else r.lineTo(x,y)});r.stroke();r.setLineDash([]);
 C.route.slice(state.waypoint).forEach((q,i)=>{const[x,y]=at(q);r.strokeStyle='#e4dc97';r.strokeRect(x-5,y-5,10,10);r.fillStyle='#fff4a1';r.font='10px Arial';r.fillText(String(i+state.waypoint+1),x+9,y-5)});
 const airplanes=allPlanes();for(const a of airplanes){if(!Number.isFinite(a.x)||!Number.isFinite(a.z))continue;const [x,y]=at(a);const traffic=C.separation(p,a);const predicted=ATC.approach({...p,isAI:false},a),danger=traffic.critical||predicted.level==='critical',warn=traffic.warning||predicted.level==='warning';r.fillStyle=danger?'#ff526b':warn?'#ffbd56':'#ffcf7c';if(danger||warn){r.beginPath();r.arc(x,y,danger?11:8,0,TWO);r.lineWidth=2;r.strokeStyle=r.fillStyle;r.stroke()}r.beginPath();r.arc(x,y,4,0,TWO);r.fill();r.strokeStyle=danger?'#ff526b':'#ffd27f';r.beginPath();r.moveTo(x,y);r.lineTo(x+Math.sin(a.heading*Math.PI/180)*13,y-Math.cos(a.heading*Math.PI/180)*13);r.stroke();r.font='10px Segoe UI,Arial';r.fillText(a.name||'Tráfego',x+7,y-7);
 // Projeção curta da trajetória baseada no rumo atual, não em planos de voo reais.
 const vv=ATC.vector(a);r.beginPath();r.setLineDash([3,4]);r.strokeStyle=danger?'#ff7286':warn?'#ffd078':'#8badb5';r.moveTo(x,y);r.lineTo(x+vv.x*7*scale,y-vv.z*7*scale);r.stroke();r.setLineDash([])}
 r.fillStyle='#63f1f3';r.strokeStyle='#63f1f3';r.lineWidth=2;r.beginPath();r.arc(cx,cy,5,0,TWO);r.fill();r.beginPath();const heading=p.heading*Math.PI/180;r.moveTo(cx,cy);r.lineTo(cx+Math.sin(heading)*18,cy-Math.cos(heading)*18);r.stroke();r.restore();r.fillStyle='#b6e1e9';r.font='10px Arial';r.fillText('N',cx-3,10);r.fillText('ALCANCE: 200 m (jogo)',8,h-8)}
function updateAircraftOverlay(){const holder=$('planeVisual');if(!holder)return;const visible=[0,3].includes(state.camera);holder.style.display=visible?'block':'none';if(!visible)return;const turn=state.motion.bank;const pitch=state.motion.pitch;const scale=(state.camera===0?1:state.camera===3?.73:.48)*state.cameraZoom;const yaw=C.clamp(state.motion.yaw*.82,-38,38);holder.style.transform=`translate(-50%,-50%) rotate(${turn.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg) rotateX(${pitch.toFixed(2)}deg) scale(${scale.toFixed(3)})`;holder.classList.toggle('overhead',state.camera===3)}
function render(){if(!winW||!winH)return;updateAircraftOverlay();updateSceneryTracking();drawSky();if(S.sceneId!==state.mission.id)makeScene();setCamera();ctx.save();ctx.globalAlpha=(scenicImages[state.mission.id]?.complete&&scenicImages[state.mission.id]?.naturalWidth)?.88:1;sceneObjects();ctx.restore();const fog=ctx.createLinearGradient(0,winH*.46,0,winH);fog.addColorStop(0,'rgba(220,248,255,0)');fog.addColorStop(.65,'rgba(207,240,248,.06)');fog.addColorStop(1,'rgba(12,28,46,.1)');ctx.fillStyle=fog;ctx.fillRect(0,0,winW,winH);drawFlightLines();drawMotionCues();drawMarkers();drawCockpit();drawWingView();drawRadar();if(state.camera===4&&state.frame%4===0)drawLocalMap();if(state.paused&&state.running){ctx.fillStyle='#061b2f9c';ctx.fillRect(0,0,winW,winH);ctx.fillStyle='white';ctx.font='bold 32px Segoe UI,Arial';ctx.textAlign='center';ctx.fillText('VOO PAUSADO',winW/2,winH/2)}}
function draw(t){const dt=state.lastTime?Math.min(.05,(t-state.lastTime)/1000):.016;state.lastTime=t||performance.now();state.frameDt=dt;state.frame++;if(state.running)update(dt);render();requestAnimationFrame(draw)}
resetFlight();renderFeatured();renderFlightDestinations();updateMap();bind();})();
