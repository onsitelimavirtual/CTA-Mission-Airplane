# CTA Mission Airplane V3.6 — Matemática do Voo

Copyright © 2026 Nailson Rodrigues de Lima.

## Como usar
- Abra **📐 Matemática do Voo** no topo do aplicativo (inclusive antes de iniciar a missão), ou no painel inferior durante o voo.
- A aba **Direção** mostra uma bússola ilustrada, seno e cosseno, o rumo atual, velocidade e componentes matemáticas para norte/sul e leste/oeste.
- A aba **Subida** explica tangente e variação de altura com um desenho de triângulo e controle interativo de ângulo.
- A aba **Curvas** explica a inclinação das asas, o raio teórico de curva coordenada e permite alterar o ângulo de referência.
- Há **um desafio de múltipla escolha por aba**, corrigido imediatamente com explicação.
- O painel pode ser fechado sem interromper o voo; não altera comandos, pontuação ou classificação.
- Não depende de biblioteca, API, fontes ou imagens externas. O motor matemático fica em `math-core.js`.

## Precisão e limites
Os valores de velocidade/rumo e inclinação visual do avião são atualizados durante o jogo. As componentes trigonométricas são interpretações ilustrativas. O exemplo de descida usa geometria de trajetória idealizada (tan θ = Δaltura / distância horizontal). O raio da curva é uma estimativa de curva coordenada nivelada (R=v²/(g·tan φ)), **não** a física efetiva do motor do jogo. A simulação não serve para ensino certificado ou operações aeronáuticas reais.

## Instalar no GitHub e Render
Substitua `index.html`, `style.css`, `game.js`, `server.js` e adicione `math-core.js` na raiz do repositório (junto dos arquivos já existentes). No Render faça Manual Deploy → Deploy latest commit.

## Testes
`node --test tests/quality.test.js` e `node --check game.js`, `node --check math-core.js`. Testes práticos de navegador recomendados para celular.
