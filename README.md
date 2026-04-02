# Eventhub

<!-- [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) -->
[![Vue 3](https://img.shields.io/badge/framework-Vue%203-brightgreen.svg)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/build-vite-yellow.svg)](https://vitejs.dev)

## 🎯 Visão geral

Eventhub é uma aplicação de gerenciamento de eventos (PWA) baseada em Vue 3, com suporte a contas de cliente e administrador. O objetivo é permitir o cadastro de eventos, gerenciamento de orçamentos, alocação de profissionais, relatórios financeiros e controle de serviços em um painel administrativo, além de um fluxo de usuários clientes com pedido de eventos, acompanhamento de orçamentos e perfil.

## 🚀 Tecnologias principais

- Vue 3
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- PrimeVue

## 🧩 Estrutura do projeto

- `src/pages` - telas publicas, cliente e admin
- `src/layouts` - layouts para public, cliente e admin
- `src/store` - estados gerenciados com Pinia (auth, budgets, events, services)
- `src/router` - rotas públicas e protegidas
- `src/mock` - dados de demonstração (usuários, eventos, orçamentos)
- `src/components` - UI reutilizável

## 🛠 Funcionalidades implementadas

### Público
- Página inicial
- Serviços
- Sobre
- Contato
- Login / Cadastro
- Recuperação de senha

### Cliente (`/cliente`)
- Dashboard de cliente
- Solicitação de novo evento
- Meus eventos
- Detalhes dos eventos
- Orçamentos do cliente
- Detalhes dos orçamentos
- Perfil do cliente

### Administrador (`/admin`)
- Dashboard admin
- Agenda de eventos
- Gerenciamento de orçamentos
- Edição/análise de orçamentos
- Gerenciamento de profissionais
- Alocação de equipe para evento
- Relatórios financeiros
- Cadastro e gestão de custos
- Gerenciamento de preços
- Histórico de importações
- Gestão de clientes, tipos de evento e categorias de serviço
- Perfil do admin

## 🔐 Autenticação e controle de acesso

O sistema utiliza dados mock de `src/mock/data.js` (sem backend real):

- `cliente@gmail.com` (role: `cliente`)
- `admin@eventhub.com` (role: `admin`)

Fluxo de autenticação em `src/store/auth.js` e proteção de rotas em `src/router/index.js`.

## ▶️ Como rodar local

```powershell
cd c:\projects\eventhub
npm install
npm run dev
```

Abra `http://localhost:5173` (ou porta exibida no terminal).

## 🧪 Build e preview

```bash
npm run build
npm run preview
```

## 🧩 Como estender

- Adicionar integração de API real (backend Node/Express ou Laravel)
- Substituir `src/mock/data.js` por chamadas reais no `store`
- Inserir autenticação JWT e sessão persistente
- Adicionar testes unitários/integrados (Vitest + Cypress)

## 🎛 Configurações de lint/build

- Vite: `vite.config.js`
- Tailwind: `tailwind.config.js`, `postcss.config.cjs`

## 📌 Observações importantes

- É um projeto demonstrativo. Não há persistência de dados real no momento.
- Para produção, implemente um backend seguro + validação no servidor + tratamento de erros.

## 📄 Licença

MIT

