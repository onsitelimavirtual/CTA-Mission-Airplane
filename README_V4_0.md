# CTA Mission Airplane — Versão 4.0

## Evolução sobre a V3.9
- **24 visões de exploração**: quatro imagens por destino para os seis destinos originais, sem inclusão de novas cidades.
- Os arquivos adicionais `explorar-<id>-panorama.webp` e `explorar-<id>-aproximacao.webp` são imagens extraídas de duas artes originais geradas para o projeto; **não são fotos de rua ou registros geográficos certificados**.
- Galeria com quatro miniaturas, navegação anterior/próxima, contadores `1/4` a `4/4`, e troca entre os seis destinos.
- Navegação guiada por rumo, altitude e previsão de trecho, com opção de rota assistida.
- Controle de curva suavizado com taxa de manobra dependente da velocidade.
- Mantidos os 3 pontos por missão, 4 minutos mínimos, chuva/névoa/turbulência, Central CTA, áudio, 5 câmeras, Matemática do Voo e multiplayer com até 5 pessoas no Render.

## Implantação
Extraia o ZIP completo e envie seu conteúdo para a raiz do repositório na branch publicada. O Web Service Node.js deve iniciar com `node server.js`. Em seguida, no Render, execute Manual Deploy → Deploy latest commit.

## Aviso
Os cenários são artísticos; as orientações são simulação educativa, nunca orientação aeronáutica real. O Standalone usa recursos embutidos e não aceita participantes online.
