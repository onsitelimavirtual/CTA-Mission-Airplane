# CTA Mission Airplane V4.1 — Cabine móvel simplificada

Versão baseada na V4.0, com os seis destinos e as 24 imagens preservados.

## Novidades

- **Modo voo limpo** no celular: HUD de velocidade, altitude e rumo permanece visível, com cronômetro e orientação de rota em uma barra superior.
- **Instrumentos por demanda:** abas Voo, Rota, Radar, CTA e Câmeras. Abrir uma aba não altera a física do voo; tocar em Voo ou fora do painel o fecha.
- **Avisos de conflito preservados:** alerta de proximidade continua visível sem painel aberto, e a aba CTA muda de cor nos riscos previstos.
- **Comandos priorizados:** direção, altitude e velocidade sempre disponíveis; câmera, som, zoom, pausa e recursos adicionais ficam em faixa horizontal rolável.
- **Mapa local:** mantém acesso via câmera Mapa local; não utiliza dados reais de posição ou treinamento aeronáutico.
- **Desktop:** mantém o layout de instrumentos da V4.0.

## Como usar no celular

1. Inicie uma missão. A visualização abre em Voo (sem painéis sobre a aeronave).
2. Toque em Rota, Radar, CTA ou Câmeras para mostrar somente aquele instrumento.
3. Toque em Voo ou no espaço sombreado para fechar.
4. Use o controle direcional e o conjunto inferior. A faixa de botões secundários desliza para os lados.

## Publicação

O pacote completo contém arquivos na raiz; descompacte e envie ao GitHub. Para multiplayer, implante como Web Service Node.js no Render. O Standalone é exclusivamente para treino individual.

**Limitações:** testes automatizados não substituem validação física em Android/iOS; multiplayer em memória, sem autenticação forte e sem alta disponibilidade; imagens artísticas, não fotografias georreferenciadas.

© 2026 Nailson Rodrigues de Lima.
