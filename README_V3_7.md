# CTA Mission Airplane V3.7 — Explorar Destinos

© 2026 Nailson Rodrigues de Lima.

## Alterações
- A tela de chegada não mostra mais o desenho vetorial de rua. Em seu lugar há uma galeria visual de paisagens artísticas com aparência fotográfica.
- Dois enquadramentos para cada uma das **seis missões**; setas para navegar e lista dos três pontos do destino.
- Explorar Destinos acessível na tela inicial, no topo, no menu, no painel de voo e após a chegada.
- Novas imagens originais incorporadas ao pacote, sem downloads externos. Não são fotografias reais nem Street View; aparência inspirada nos locais, não é uma reprodução cartográfica exata.
- No treino solo, o voo pausa automaticamente enquanto o explorador fica aberto. No multiplayer o tempo da corrida e a simulação continuam.
- Mantidos motor de voo, câmeras, radar, audio, matemática do voo e classificação de até cinco jogadores.

## Importante para publicar no GitHub e Render
Os arquivos `explorar-*.webp` **devem ser enviados à raiz** junto com `game.js`, `index.html`, `style.css` e `server.js`.
A opção Sala online só funciona pelo endereço `.onrender.com`, que executa o Node.js; pelo GitHub Pages, use Treino local.
Depois do commit, entre em Render > serviço CTA > Manual Deploy > Deploy latest commit.
Se imagens antigas permanecerem por cache, atualize o navegador.

## QA
`node --check game.js`; `node --test tests/quality.test.js`.
A versão de produção comercial ainda exige revisão jurídica e testes em aparelhos reais.

## Correções finais de QA
- Miniaturas de todos os destinos também incorporadas ao HTML Standalone, sem arquivos externos.
- Mensagem clara ao tentar Sala online pelo GitHub Pages: usar Render.
- Galeria permanece no topo da janela após abertura no celular.
