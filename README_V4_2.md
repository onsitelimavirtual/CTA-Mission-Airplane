# CTA Mission Airplane V4.2 — voos, aeroportos e emergências

**© 2026 Nailson Rodrigues de Lima.**

## Evoluções implementadas

- **Sete destinos:** Rio Quente, Fernando de Noronha, Rio de Janeiro, Miami, Fortaleza, Brasília e **São Luís (MA)**.
- **Aeroportos de referência nas missões:** Santos Dumont **SDU** (Rio de Janeiro), Aeroporto Internacional de Brasília **BSB** (Brasília) e Marechal Cunha Machado **SLZ** (São Luís). Também há identificação de aeroportos associados aos outros destinos. Nomes e códigos são referências educativas; os locais das pistas dentro da simulação são fictícios.
- **Quatro vistas por destino:** 28 imagens artísticas de exploração no total, incluindo quatro novas imagens de São Luís. As imagens não são fotografias verificadas ou restituição geográfica real.
- **Fases do voo:** aceleração na pista, subida, cruzeiro, aproximação, toque e desaceleração em pista simulada.
- **Velocidade e resposta:** indicação até 320 kt e ajuste mais rápido de potência; movimento ainda é recreativo, não física de aeronave certificada.
- **Colisão:** detecção automática de aeronaves muito próximas em três dimensões, avaria visual e redução de velocidade. O botão **💥 Avaria** permite demonstrar uma falha após a decolagem.
- **Pouso forçado:** manobra assistida em área simulada ao ocorrer dano; conclusão não entra no ranking de chegada limpa.
- **Janelas de pontos turísticos:** abrem com uma imagem grande ao chegar aos dois primeiros pontos no modo solo. O terceiro desencadeia aproximação para o pouso; a tela de chegada oferece a galeria completa. No multiplayer, as imagens são acessadas manualmente para não interromper outros jogadores.
- **Partida com pelo menos 4 minutos:** a regra da V3.9 foi preservada. O backend só registra uma chegada após três marcos, 4 minutos de atividade e estado final com altitude <= 15 e velocidade <= 60 (unidades simuladas).
- Preserva as câmeras, Central CTA, radar, meteorologia e **Matemática do Voo**.

## Instalação — versão online Render

1. Extraia `CTA_Mission_Airplane_V4_2_COMPLETO_RENDER_STANDALONE.zip`.
2. Envie os arquivos e as pastas `tests/` para a **raiz** da branch ligada ao Render. Não publique apenas o ZIP fechado.
3. Confira `index.html`, `style.css`, `game.js`, `flight-core.js`, `flight-ops.js`, `server.js`, `math-core.js`, `atc-core.js`, `nav-core.js` e as imagens `.webp` na raiz.
4. No Render: **Web Service / Deploys / Manual Deploy / Deploy latest commit**. Comandos: `npm install` e `node server.js`; health check: `/api/health`.
5. O multiplayer funciona somente pelo endereço `.onrender.com` (ou outro servidor Node apropriado), não em `github.io`.

## Standalone

Abra `CTA_Mission_Airplane_Standalone_V4_2.html` em um navegador atual. Modo individual e imagens incorporadas funcionam sem internet; salas online exigem servidor.

## Limitações e cuidados

**Simulador recreativo**, não representa procedimento real de decolagem, aproximação ou pouso, cálculo de performance, separação ATC, altitude de terreno ou resposta realista de uma aeronave após colisão. Os aeroportos e pontos turísticos aparecem como referência cultural. Não usar para navegação/treinamento aeronáutico certificado. Segurança, termos, direitos autorais e privacidade ainda exigem validação adicional antes da comercialização pública.
