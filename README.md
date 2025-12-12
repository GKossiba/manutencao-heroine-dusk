Heroine Dusk – Projeto de Manutenção

Este repositório contém uma versão do jogo Heroine Dusk utilizada para atividades de manutenção de software, com foco em refatoração e melhoria de manutenibilidade, sem alteração do comportamento original do jogo.

📌 Como executar o projeto

O projeto não possui dependências externas nem etapa de build.

Passos:

Clone o repositório:

git clone https://github.com/GKossiba/manutencao-heroine-dusk

cd release 

python -m http.server 8080 

🔧 Alterações realizadas

As modificações tiveram como objetivo reduzir complexidade, melhorar organização e facilitar manutenção, mantendo o funcionamento original.

1. Refatoração de combat.js

Remoção de cadeias extensas de if/else.

Separação da lógica de validação e execução das ações de combate.

Introdução de funções menores (canAttack, canHeal, etc.).

Uso de estrutura baseada em dados (INPUT_ACTIONS).

Redução da complexidade ciclomática.

2. Refatoração de action.js

Separação da função action_render() em responsabilidades menores.

Isolamento da renderização de botões de combate, feitiços e opções de interação.

Substituição de condicionais repetidas por estruturas iterativas.

Correção de problemas de renderização introduzidos durante a refatoração.

3. Refatoração de atlas.js

Substituição de valores literais por constantes simbólicas (tiles, músicas, backgrounds).

Padronização de nomenclaturas.

Organização dos dados para melhorar legibilidade.

Manutenção total do layout e comportamento dos mapas originais.
