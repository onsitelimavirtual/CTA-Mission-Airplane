# Relatório de qualidade — CTA Mission Airplane V4.2

## Cobertura

- 38 testes automatizados do motor, roteamento, regras de missão, câmeras/estrutura de interface e operações de pouso.
- Sintaxe JavaScript verificada em todos os scripts distribuídos.
- Standalone gerado com imagens, CSS e scripts incorporados.
- Verificação em navegador Chromium com dimensões de celular (390×844) e computador (1366×768), usando o Standalone como conteúdo direto por conta de restrição do ambiente contra navegação para URLs locais.
- No teste de interface, o destino São Luís abriu quatro imagens e o botão seguinte trocou a imagem; a tela de voo identificou aeroporto SLZ e a fase de decolagem. Aceleração e subida foram exercitadas por avanço de tempo **simulado**, não por espera de quatro minutos reais.
- Eventos de abertura de pop-up, impacto simulado, dano e pouso de emergência terminaram sem exceção JavaScript nos cenários verificados.
- No teste do pouso normal, os três marcos foram posicionados diretamente pelo harness de QA (sem pilotagem humana), o que acionou a fase de aproximação; o avião encerrou a sequência com altitude e velocidade 0 e tela de chegada. Este teste **não comprova** a experiência de um voo completo em tempo real, as velocidades físicas, nem a precisão geográfica.

## Pontos que ainda exigem homologação

- Voo completo de pelo menos quatro minutos em aparelho físico com piloto humano e sem instrumentação de teste.
- Teste real multiplayer com cinco celulares em redes diferentes, possíveis falhas de conectividade e escala da hospedagem.
- Curvas, transições de câmera, qualidade visual e usabilidade em navegadores Android antigos.
- Normas sobre uso das imagens, acessibilidade, LGPD e contrato de uso para exploração comercial.
- Não há simulação certificada de física aeronáutica nem cálculos de segurança de voo.
