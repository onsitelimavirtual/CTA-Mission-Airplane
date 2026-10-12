# CTA Mission Airplane V3.8

# CTA Mission Airplane V3.8 — Inteligência de tráfego simulado

## Novidades

- **Central CTA**: nova área de orientações de voo com previsão de aproximação, identificação do tráfego e indicação de tempo para o ponto de maior proximidade na simulação.
- **Quatro corredores de tráfego** no modo individual. Aviões virtuais percorrem trajetórias com rumos, velocidade e níveis de voo próprios.
- **Manobras sugeridas**: mudar rumo, subir ou descer em altitude. O módulo examina diferentes manobras em relação a todos os contatos e sugere a de menor risco estimado, respeitando limites do jogo.
- **Executar sugestão**: botão ativa a manobra assistida e pode ser interrompido com as setas. Se a previsão mudar, observe a nova orientação.
- **Próximo marco**: consulta rápida de rumo e altitude do ponto turístico atual.
- **Radar**: exibe trajetória pontilhada do jogador e as projeções dos contatos; alertas preventivos também podem aparecer antes de uma separação crítica.
- **Multiplayer**: previsões usam as posições transmitidas dos pilotos conectados; não há tráfego de IA adicional nas salas online.

## Aviso de segurança e precisão
Este é um jogo educativo. As distâncias, altitudes, velocidades, limiares de risco e corredores da central CTA são **inteiramente fictícios e simplificados**. Não correspondem a regras de separação de tráfego aéreo, aeronaves reais, ATC de aeroportos, dados ADS-B ou orientações de segurança de voo. A previsão linear não reproduz turbulência, intenção dos demais pilotos, limitações reais de desempenho ou desvios futuros; portanto a recomendação não garante a ausência de incidente.

## Modo offline / Render
A análise de tráfego não exige serviços externos; o motor está no arquivo `atc-core.js`, incorporado ao Standalone. O multiplayer continua dependendo de um Web Service Node.js como o Render. No GitHub Pages use o modo individual.

## Atualização do GitHub
Substitua `index.html`, `style.css`, `game.js`, `server.js` e envie **também** o arquivo novo `atc-core.js` na raiz do repositório. Preserve `flight-core.js`, `math-core.js`, `logo.png`, `aviao-cta-pro.svg` e todos os arquivos `.webp` da V3.7. Depois use Manual Deploy → Deploy latest commit no Render. Para evitar erros de atualização parcial, pode enviar o pacote completo da V3.8.

## Arquivos
- `CTA_Mission_Airplane_Standalone_V3_8.html`: arquivo HTML único para uso individual sem internet.
- `index.html`, `style.css`, `flight-core.js`, `math-core.js`, `atc-core.js`, `game.js`, `server.js`: implantação no Render.
- `tests/quality.test.js`: testes automatizados (`node --test tests/quality.test.js`).
- Imagens `*.webp`, `logo.png` e aeronave SVG: manter todos na raiz.
