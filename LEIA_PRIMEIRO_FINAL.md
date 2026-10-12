# CTA Mission Airplane — Entrega final V3.8

**Autor:** Nailson Rodrigues de Lima • © 2026.

## Como instalar

- **Treino individual:** abra `CTA_Mission_Airplane_Standalone_V3_8.html` no navegador. Não exige um servidor ou bibliotecas externas.
- **Multiplayer:** envie **todos os arquivos extraídos** deste ZIP à raiz da branch `portfoliolimavirtual` de `onsitelimavirtual/CTA-Mission-Airplane`, sem pastas adicionais. Confirme que a branch conectada ao Render coincide. Os `.webp`, `logo.png` e `aviao-cta-pro.svg` devem ficar na raiz, junto do `index.html`.
- **No Render:** serviço CTA → Deploys → Manual Deploy → Deploy latest commit. Verifique `https://SEU-SERVICO.onrender.com/api/health`. Para jogar online use o endereço `.onrender.com`, não o GitHub Pages.
- **Configuração de servidor:** Node >=22, `npm install` (não há pacotes npm externos), `node server.js`, health check `/api/health`.

## Recursos

Seis missões, cenários ilustrativos, cinco câmeras, som de motor/Mudo, controles suavizados, zoom, radar, Matemática do Voo, exploração de destinos e Central CTA com quatro rotas de tráfego no modo local e manobras preventivas sugeridas. O multiplayer comporta até cinco participantes em uma sala, com sincronização temporária em memória.

## QA nesta entrega

- 23/23 testes automatizados aprovados.
- Verificações de sintaxe nos cinco scripts JS aprovadas.
- 36/36 URLs/recursos responderam HTTP 200 no servidor local.
- A tentativa de inspeção visual automática no Chromium neste ambiente foi bloqueada por `ERR_BLOCKED_BY_ADMINISTRATOR`; isso não equivale a uma reprovação do jogo. Faça teste manual no celular e computador após publicar.
- `package.json` passou a declarar a versão `3.8.0`; teste Standalone passou a referenciar o arquivo correto da V3.8.

**Limitações:** o CTA é um jogo educativo, não um sistema de prevenção de colisões certificado. O tráfego, as altitudes e as manobras são simplificações recreativas. Render gratuito pode suspender o serviço e reiniciar sessões. Para venda pública, avaliar segurança, LGPD, direitos das imagens e homologação técnica.

Para mais detalhes, leia `INSTRUCOES_RENDER.md` e `README_V3_8.md`.
