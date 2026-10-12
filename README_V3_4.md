# CTA Mission Airplane V3.4 — Câmeras, radar e áudio original

© 2026 Nailson Rodrigues de Lima.

## Correções
- Seletor de cinco câmeras agora também no celular: externa, cabine, asa, superior e mapa local, com indicador 1/5.
- Visão de asa com geometria de janela específica; cockpit distinto, aérea inclinada e mapa interno.
- Radar destaca aeronaves com proximidade crítica/amarela/vermelha; painel visível mostra distância horizontal e vertical e nome.
- Alerta sonoro nos níveis atenção e crítico (não deve ser confundido com alerta aeronáutico real).
- Motor de avião gerado internamente com Web Audio API: intensidade e frequência variam com velocidade; botão Som ligado / Mudo e atalho M; configuração permanece localmente.
- Sem MP3, serviços ou bibliotecas externas. O áudio inicia somente após toque para começar a jogar ou ativar o som, por requisitos dos navegadores móveis.
- Se o navegador não oferece Web Audio API, o jogo permanece funcional sem som.

## Como usar
Abra o Standalone em um navegador moderno. Aceite os termos e inicie uma missão para habilitar o som, caso o dispositivo permita. Use os botões de câmera na faixa superior; toque Som ligado para silenciar.

## Render
Envie a nova versão completa para a branch conectada ao Render, com os arquivos na raiz, depois faça Manual Deploy → Deploy latest commit.

## QA e limitações
A lógica de separação aérea é ficcional; não substitui controle de tráfego real. É necessário testar som em Android e outros aparelhos reais, pois dispositivos podem estar em modo silencioso ou bloquear áudio.
