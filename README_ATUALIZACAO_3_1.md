# CTA Mission Airplane V3.1 — Atualização de movimentos e chegada

Copyright © 2026 Nailson Rodrigues de Lima.

## Atualizações nesta versão
- Curvas e subida/descida mais suaves, com inércia e inclinação visual proporcional; suavização da câmera durante manobras.
- Conclusão da terceira etapa registra o tempo imediatamente, aguarda uma transição de 1,1 s e abre o resumo.
- No resumo de chegada, botão **Explorar o destino em visão terrestre ilustrativa**. O desenho é construído por Canvas localmente, sem chamadas a serviços de imagens. As setas mudam o ângulo do panorama.
- A ilustração é **cenográfica** e não mostra a rua ou monumento real: a fidelidade cartográfica exigirá base vetorial e dados de elevação autorizados.
- Mantidas seis missões, multiplayer com até cinco jogadores, meteorologia, radar e classificação por tempo sem incidentes.

## Execução
- Modo solo Standalone: abrir `CTA_Mission_Airplane_Standalone_V3_1.html` diretamente no navegador moderno.
- Modo multiplayer Render: enviar os arquivos da raiz ao repositório, inclusive `server.js`, `game.js`, imagens, `package.json` e `render.yaml`; depois executar manual deploy e conferir `/api/health`.
- Para testes: `npm test` (executado localmente com 11 testes aprovados).

## Limitações e licenças
Esta atualização não introduz mapas ou fotos externos novos no pacote. O botão Mapa continua usando serviço online OpenStreetMap com atribuição. O projeto segue em estágio demonstrativo e não é simulador aeronáutico certificado. Não há avaliação jurídica/comercial final ou homologação em dispositivos reais.
