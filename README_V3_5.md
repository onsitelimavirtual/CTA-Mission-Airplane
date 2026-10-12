# CTA Mission Airplane V3.5 — panorama reage ao avião

© 2026 Nailson Rodrigues de Lima.

## Correções
- Ao virar à direita, o cenário panorâmico se desloca à esquerda. Ao virar à esquerda, desloca-se à direita.
- O deslocamento utiliza direção contínua, inclusive quando o rumo atravessa 359° → 0° ou realiza voltas completas; sem inverter após ~90° como na versão anterior.
- Repetição espelhada da arte panorâmica impede fundos vazios ou saltos bruscos na borda.
- Na subida e na descida, o enquadramento vertical da paisagem se ajusta suavemente.
- O avião inclina na direção da curva, enquanto o horizonte gira no sentido oposto.
- Nuvens e sinais visuais de velocidade acompanham o movimento com paralaxe própria; a geometria tridimensional continua ancorada na posição do avião.
- Mantidos áudio e mudo, alertas de proximidade, cinco câmeras, seis destinos e sala online para até cinco pilotos.

## Importante
O panorama é uma ilustração repetida de forma espelhada para simular um campo de visão amplo; não é uma fotografia 360° georreferenciada. O mapa permanece esquemático offline.

## Publicar no Render
Na branch configurada, substitua `game.js` e `index.html` com os arquivos do ZIP de correção. Faça **Manual Deploy → Deploy latest commit** no Render e atualize a página, preferencialmente com limpeza do cache.

## Testes
Executar `node --test tests/quality.test.js` e `node --check game.js`. Testar as teclas ← → ↑ ↓ nas perspectivas Externa e Cabine, inclusive ao completar uma curva.
