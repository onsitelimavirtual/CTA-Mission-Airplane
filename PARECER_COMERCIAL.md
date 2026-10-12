ATUALIZAÇÃO 3.1: Consulte README_ATUALIZACAO_3_1.md e GUIA_VISAO_DE_RUA_E_MAPAS.md. O parecer comercial e testes anteriores continuam sujeitos às ressalvas descritas abaixo.

# Parecer de prontidão comercial — CTA Mission Airplane V3.0

**Data:** 11/10/2026  
**Resultado:** **protótipo funcional para demonstração/piloto controlado; não homologado como serviço público comercial**.

## O que foi implementado e testado em código

- Seis missões fixas, incluindo Brasília; três marcos por missão.
- Controle de aeronave, cinco modos de câmera, radar, até quatro tráfegos simulados no modo local e salas online de no máximo cinco jogadores.
- Imagens dos destinos aplicadas em cartões selecionáveis e nos cenários artísticos; avião vetorial original.
- Mapa geográfico online vinculado à missão selecionada, por incorporação do OpenStreetMap com atribuição; não representa a posição real do avião nem aerofotogrametria 3D.
- Evento de névoa, chuva, turbulência e baixa visibilidade com impacto na visibilidade, velocidade e rumo/altitude; cronômetro, registro de incidentes, elegibilidade de vitória e ranking.
- Backend HTTP/SSE com verificação básica de estados, progresso sequencial e classificação registrada pelo servidor.
- Tela de aceite de Termos, Política e Contrato (sem validação de identidade ou assinatura avançada).

## Itens que impedem chamar de produto comercial homologado

| Critério | Situação | Tratamento necessário |
|---|---|---|
| Voo e cenário fidedigno | Ilustrativo, sem terreno real fotogramétrico | Adquirir fontes geoespaciais autorizadas, construir motor e validar precisão |
| Ranking contra trapaça | Verificação básica de progresso, cliente ainda calcula movimento/incidentes | Simulação de voo autoritativa no servidor e auditoria anti-fraude |
| Multiplayer em produção | HTTP/SSE funcional em memória, sem infraestrutura de alta disponibilidade | HTTPS, autenticação, limitação por IP, métricas, backup/retomada e testes de carga |
| Segurança de credenciais | Token de sessão simples (inclusive query de SSE) | Controles contra abuso, rotação e proteção de tokens, auditoria externa |
| Proteção de crianças/adolescentes | Orientação e aceite simples | Revisão jurídica, idade/responsáveis, moderação e relatórios adequados |
| LGPD e contratos | Modelos de referência | Identificar responsável e contato, retenção, bases legais e validação jurídica |
| Cartografia pública online | Incorporação sob regras do provedor, sem SLA | Provedor com licença/garantia adequadas para escala comercial |
| Direitos autorais e marca | Copyright no produto, imagens aprovadas | Conferir documentação dos direitos e disponibilidade do nome/marca |
| Acessibilidade e desempenho | Interface responsiva elaborada, não homologada | Testes em Android, Windows, teclado, leitores de tela, GPUs diferentes e WCAG |
| Pagamento/assinatura | Não implementados | Sistema autorizado de cobrança e evidência contratual quando necessário |

## Critério recomendado de liberação

1. Verificação humana de todas as seis missões e dos cinco jogadores em uma rede externa estável.
2. Auditoria básica de segurança, privacidade e abuso, com implantação TLS e logs mínimos.
3. Validação de nome/marca, contratos, licenças de dados e adequação a menores.
4. Testes de UX, QA visual, desempenho e acessibilidade nos aparelhos de destino.
5. Piloto monitorado, correções, versão candidata e homologação.

O pacote **não faz promessa de navegação real, radar aéreo real ou reconstrução cartográfica fiel em 3D**. Essa diferenciação deve permanecer em campanhas comerciais e termos.
