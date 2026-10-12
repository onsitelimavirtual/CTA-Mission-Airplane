# CTA Mission Airplane V3.8 — Publicação multiplayer no Render

Este pacote possui todos os arquivos necessários à versão web e ao servidor Node.js. O HTML Standalone é exclusivamente para treino individual offline e não cria salas multiplayer.

## 1. GitHub

1. Abra o repositório público `https://github.com/onsitelimavirtual/CTA-Mission-Airplane`.
2. Selecione a branch `portfoliolimavirtual` (a branch utilizada nas implantações anteriores; confirme a selecionada no painel do Render).
3. Faça uma cópia de segurança e envie **todos os arquivos extraídos** do ZIP completo à raiz do repositório. Não envie o ZIP fechado nem coloque tudo dentro de outra pasta.
4. Na raiz devem existir `index.html`, `style.css`, `game.js`, `flight-core.js`, `math-core.js`, `atc-core.js`, `server.js`, `package.json`, `render.yaml`, `logo.png`, `aviao-cta-pro.svg` e **todos os arquivos `.webp`**. Nesta edição, as imagens ficam diretamente na raiz, NÃO em `assets/`.
5. Confirme a gravação em **Commit changes**. Caso escolha o ZIP menor de atualização, mantenha os demais arquivos que já estejam presentes na versão V3.7/V3.8.

## 2. Configuração do Render

Abra https://dashboard.render.com/ → escolha seu **Web Service** do CTA → **Deploys → Manual Deploy → Deploy latest commit**. Verifique o branch do serviço e que coincide com o branch que você atualizou no GitHub. Em novo serviço, use:

- Runtime: `Node`
- Root Directory: vazio (arquivos na raiz)
- Build Command: `npm install`
- Start Command: `node server.js`
- Health Check Path: `/api/health`
- Branch: `portfoliolimavirtual` se esta for sua branch de publicação
- Plano `Free`: somente testes/demonstração

## 3. Verificação

1. Abra `https://SEU-SERVICO.onrender.com/api/health`. A resposta deve conter `"ok":true`.
2. Abra `https://SEU-SERVICO.onrender.com/` e selecione `Treino local` para verificar as seis missões.
3. Para multiplayer, **use o endereço do Render**, não o `github.io`. Crie uma sala com `Sala online`, compartilhe o código de seis caracteres e peça que até quatro pessoas entrem no mesmo endereço do Render.
4. Confira a Central CTA, botão **Executar sugestão**, radar e exploração de destinos.

**Atenção:** a opção `Sala online` aberta no GitHub Pages devolve HTML em vez de JSON, pois o GitHub Pages não executa `server.js`. O Render gratuito pode suspender serviços ociosos; os dados da sessão são temporários e podem desaparecer após reinício/redeploy.

## 4. Teste local

```sh
node --test tests/quality.test.js
node server.js
```

A aplicação é uma simulação recreativa e não um sistema de segurança aeronáutica. Para uso comercial público, aplicar revisão jurídica e reforços de segurança, privacidade, autenticação e infraestrutura.

© 2026 Nailson Rodrigues de Lima.
