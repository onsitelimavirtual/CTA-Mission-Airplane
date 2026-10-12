# Correção de imagens para GitHub e Render

Esta versão segue a estrutura que já está publicada em `onsitelimavirtual/CTA-Mission-Airplane`: as imagens `.webp` ficam na pasta raiz do repositório. O `index.html`, `game.js`, `style.css` e `server.js` foram ajustados para trabalhar com esses caminhos.

## Publicação em celular

1. No repositório, escolha o branch `portfoliolimavirtual`.
2. Atualize os seguintes arquivos na raiz: `index.html`, `game.js`, `style.css`, `server.js`.
3. Adicione os arquivos que faltam: `logo.png`, `aviao-cta-pro.svg`, `package.json`, `render.yaml`.
4. As imagens `.webp` que já estão na raiz não precisam ser enviadas de novo.
5. Faça o commit. Como o Render foi ligado por **Public Git Repository**, faça **Manual Deploy > Deploy latest commit** no serviço.
6. Verifique no endereço publicado `https://SEU-SERVICO.onrender.com/logo.png` e `https://SEU-SERVICO.onrender.com/cenario-rio.webp`. Se abrirem, os recursos estáticos devem estar acessíveis.

**Atenção:** o modo solo suporta seis destinos. A versão web com servidor é necessária ao multiplayer. Mapa cartográfico online necessita internet e a representação ilustrada dos locais não é fotogrametria real.
