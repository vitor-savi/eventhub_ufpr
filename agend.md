# EVENTHUB - Padrões de Design (agend.md)

Cores:
- Primária: #6C63FF
- Secundária: #F5F5F5
- Texto: #333333

Fonte:
- Inter, sans-serif

Espaçamento:
- Utilizar escala do Tailwind (margins, paddings, gap)

Componentes obrigatórios:
- Sempre utilizar `BaseButton` para botões e `BaseInput` para campos de entrada.

Comportamento e acessibilidade:
- Componentes devem expor props para classes e slots.
- Botões devem ter foco visível e estados (hover, active).

Layout:
- Utilizar layouts separados por tipo de sessão: pública, cliente, admin.

Paleta e ícones:
- Usar PrimeVue/PrimeIcons para ícones quando necessário.
