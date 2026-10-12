# CTA Mission Airplane V3.2 — Edição offline aprimorada

© 2026 Nailson Rodrigues de Lima

## Novidades
- Mapa esquemático do jogo criado integralmente com Canvas 2D, em tempo real, com posição do avião e três pontos de missão. Funciona offline e não faz solicitações a provedores de mapas.
- Link externo para OpenStreetMap mantido apenas para acesso **voluntário**. O mapa interno é **fictício, não representa ruas reais e não deve ser usado como mapa aeronáutico**.
- Câmera externa, panorâmica e superior com zoom ajustável por botões +/− ou atalhos Z/X; cinco vistas mantidas.
- Ao completar a missão, passeio terrestre cenográfico ampliado: esquerda/direita, avançar/voltar, variação de perspectivas e marcações da via; tudo gerado no navegador sem arquivos externos.
- Interface adaptada em celulares com novos botões; respeita preferência de redução de movimento.
- Mesmas seis missões, clima, ranking e salas multiplayer de até 5 pessoas.

## Uso
- Individual sem conexão: abrir **CTA_Mission_Airplane_Standalone_V3_2.html** em navegador moderno.
- Multiplayer: enviar todos os arquivos descompactados para a raiz do GitHub e configurar Render Web Service com `node server.js`, branch do repositório. Conexão online e servidor continuam indispensáveis para partidas com mais de um jogador.
- Testes `node --test tests/quality.test.js`, `node --check game.js`, `node --check server.js`.

## Limitações
- Arte urbana e mapa offline são cenográficos, não constituem reprodução geográfica ou fotográfica de lugares reais.
- Os termos e o contrato permanecem minutas para revisão antes da comercialização. Servidor requer fortalecimento de segurança, privacidade, classificação etária e testes de carga.
- Sem homologação visual em todos os dispositivos. Não é simulador aeronáutico certificado.
