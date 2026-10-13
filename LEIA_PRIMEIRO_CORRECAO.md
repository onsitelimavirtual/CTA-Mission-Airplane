# CTA Mission Airplane V4.1 — Correção da identificação no navegador

**Problema identificado:** o arquivo HTML da V4.1 mantinha na tela inicial a frase “EDIÇÃO 4.0”. Os recursos novos da V4.1 já estavam presentes.

**Correção:** cabeçalho inicial e título da aba agora mostram V4.1; Standalone ajustado; servidor Render configurado para não armazenar em cache o HTML inicial.

## Atualização rápida

1. Na branch `portfoliolimavirtual`, substitua **index.html** e **server.js** pelos arquivos do ZIP de correção. Não é necessário apagar as 24 imagens nem substituir `game.js` ou `style.css` se já estiver usando a V4.1.
2. Faça `Commit changes`.
3. No Render, entre no Web Service e execute `Deploys` → `Manual Deploy` → `Deploy latest commit`.
4. Atualize a página do jogo. No Chrome Android, use o menu ⋮ → Recarregar ou abra em uma aba anônima para testar a atualização.
5. Para o GitHub Pages, certifique-se de que ele publica a mesma branch e diretório raiz; a alteração só aparece depois que o GitHub Pages terminar a implantação. O cache da infraestrutura GitHub Pages não é controlado por este ajuste do Render.

Se a versão online ainda exibir 4.0, a publicação atual está antiga, ou você está acessando outro endereço/branch.

Para jogar **individualmente sem publicar**, abra `CTA_Mission_Airplane_Standalone_V4_1.html`.
