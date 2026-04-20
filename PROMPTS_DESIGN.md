# Relatório de Design System: "Meu Atleta" - Elite UI

Este documento resume a linguagem visual estabelecida durante o redesign do perfil do atleta, que servirá de guia para as próximas abas (Finanças, Treinos, etc.).

## 1. Princípios Fundamentais
A interface é baseada no conceito **Elite Glass UI**: um dark mode profundo com camadas de vidro, hierarquia cromática rigorosa e tipografia atlética.

## 2. Tokens de Design (Globais)

### Tipografia
- **Títulos de Ação/Destaque:** `font-oswald`, Bold, Uppercase, Tracking-widest.
- **Rótulos e UI Secundaria:** `font-inter`, Semibold/Bold, Uppercase, Tracking-widest.
- **Valores Numéricos:** `font-mono` para precisão (onde aplicável) ou `font-inter` Black para impacto.

### Espaçamento e Geometria
- **Containers Principais:** `rounded-[28px]` ou `rounded-[32px]`.
- **Botões e Cards Internos:** `rounded-[20px]` ou `rounded-[24px]`.
- **Padding Seguro:** Mínimo de `p-6`, ideal `p-8` para grandes áreas.

### Efeitos Glassmorphism
- **Fundo:** `bg-[#14141c]` ou gradientes radiais profundos.
- **Painéis:** `bg-white/5` ou `glass-panel-elite` com `backdrop-blur-xl`.
- **Bordas:** `border-white/5` (extremamente sutis).
- **Sombras:** `shadow-[0_30px_60px_rgba(0,0,0,0.6)]`.

## 3. Estratégia de Cores por Aba
Cada aba possui uma **Cor Regente** que substitui o Amarelo (#f59e0b).

| Aba | Cor Regente | Código Hex | Aplicação |
| :--- | :--- | :--- | :--- |
| **Atleta** | Amber/Yellow | `#f59e0b` | Ícones de ação, glows, bordas de destaque. |
| **Finanças** | Emerald/Green | `#22c55e` | Saldos positivos, cabeçalhos, botões de entrada. |
| **Treinos** | Sky/Blue | `#0ea5e9` | Progresso, calendários de treino. |

## 4. Prompt Global para Novos Componentes
*"Crie um componente seguindo a estética Elite Glass UI: utilize um container com `rounded-[28px]`, fundo `bg-white/5` com `backdrop-blur-xl` e borda `border-white/5`. A tipografia de títulos deve ser `font-oswald` em branco, e as etiquetas em `font-inter` com a cor `#87868B`. Elementos de ação devem utilizar a Cor Regente da aba ([INSERIR COR]) para ícones e estados de hover com glow."*
