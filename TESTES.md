**ATUALIZAÇÃO 3.2:** consulte `README_V3_2.md`. Mapa interno agora é inteiramente offline; links externos são opcionais. As descrições anteriores do modo Mapa online referem-se à versão 3.1.

ATUALIZAÇÃO 3.1: Consulte README_ATUALIZACAO_3_1.md e GUIA_VISAO_DE_RUA_E_MAPAS.md. O parecer comercial e testes anteriores continuam sujeitos às ressalvas descritas abaixo.

# CTA Mission Airplane V3.0 — relatório de QA

## Testes automatizados realmente executados

Comando: `node --test tests/quality.test.js` (Node.js 22 no ambiente de desenvolvimento).

| Teste | Entrada/ação | Resultado esperado | Observado |
|---|---|---|---|
| Catálogo | Consultar `Core.missions` | Exatamente seis destinos, três marcos | Aprovado |
| Entrada inválida | Apelidos/salas e rumos negativos | Sanitizar entradas | Aprovado |
| Distância segura | Posições próximas e distantes | Detectar crítico e aviso | Aprovado |
| Estado inválido | Altitude negativa, NaN, infinito | Bloquear estado | Aprovado |
| Servidor até cinco | Criar, entrar, exceder sala | Sexto bloqueado e permissão de anfitrião | Aprovado |
| Interface e identidade | HTML, SVG, câmeras e URL | CTA próprio e cartografia vinculada ao destino | Aprovado (checagem estrutural) |
| Clima, vitória e ranking | Tempos diferentes e incidentes | Clima correto e vitória só sem incidentes | Aprovado |
| Chegada online | Estados transmitidos e três marcos | Impedir chegada sem os marcos, finalizar válida | Aprovado |
| Integridade do pacote | Conferir arquivos de cena, avião e IDs da interface | Não faltar recursos obrigatórios | Aprovado |
| Reinício de rodada | Anfitrião reinicia e convidado é impedido | Alterar ID da rodada e zerar progresso | Aprovado |

**Atenção:** esses testes não são auditoria de segurança ou prova de renderização visual. Captura automatizada de tela em Chromium ficou bloqueada pelo ambiente atual. Não foram realizados ensaios de carga reais, acessibilidade em leitores de tela, teste de conexão com cinco dispositivos físicos simultâneos, nem inspeção visual final em todos os celulares/PCs de produção. Não é correto apresentar essas verificações como aprovadas.

## Testes manuais reprodutíveis (pendentes)

1. Abra o `index.html` em Chrome/Edge/Firefox atuais, aceite os termos e escolha cada destino; confira a mudança de imagens e título, sem mostrar outros destinos.
2. Verifique botões de aceleração, subida, descida, direção, câmera, mapa e reinício. Compare desktop e Android.
3. Voe por aproximadamente 45 segundos, observando o ciclo de condições climáticas, queda de visibilidade na névoa e chuva, e efeito da turbulência.
4. Conclua os três marcos com zero incidentes e valide tempo e classificação; reinicie e provoque separação crítica para validar que o voo com incidente não vence.
5. Em servidor HTTPS de teste, conecte cinco navegadores na mesma sala. Confirme presença no radar, limite de participantes, cronômetros individuais e ranking.
6. Tente trocar a missão como convidado: servidor deve retornar 403. Como anfitrião, reinicie e confirme a sincronização.
7. Desative a rede: o voo artístico deverá funcionar localmente; o mapa online não ficará disponível.
8. Execute revisão de uso de memória, acessibilidade, políticas de dados, consentimento e segurança do servidor antes de distribuição pública.
