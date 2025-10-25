# Sistema de Gerenciamento de Invoices

Um sistema fullstack de gerenciamento de faturas construído com Nuxt 4, Vue 3, Prisma e PostgreSQL.

> [en-US](./README.md) | [pt-BR](./README.pt-BR.md)

## Funcionalidades

- 🔐 **Autenticação**: Autenticação baseada em sessão com usuário admin
- 📊 **Dashboard**: Visão geral de invoices e clientes com estatísticas
- 👥 **Gestão de Clientes**: Operações CRUD completas para clientes
- 📄 **Gestão de Invoices**: Criar, editar, visualizar e excluir invoices
- 🔍 **Filtros Avançados**: Filtrar invoices por cliente, intervalo de datas e status
- 💰 **Suporte Multi-moeda**: BRL, USD e CAD
- 🖨️ **Imprimir & Exportar**: Imprimir invoices ou salvar como PDF
- 🎨 **Interface Moderna**: Construído com NuxtUI e Tailwind CSS

## Stack Tecnológica

- **Frontend**: Nuxt 4, Vue 3 (Composition API), NuxtUI
- **Backend**: Nuxt Server API
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: nuxt-auth-utils (baseado em sessão)
- **Estilização**: Tailwind CSS via NuxtUI

## Pré-requisitos

- Node.js 18+
- Banco de dados PostgreSQL
- npm ou yarn

## Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd Site-Institucional-em-Nuxt
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Copie `.env.example` para `.env` e atualize com suas credenciais PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/invoice_db?schema=public"
NUXT_SESSION_PASSWORD="mude-para-um-segredo-aleatorio-de-pelo-menos-32-caracteres"
```

4. **Configure o banco de dados**

```bash
# Gerar client do Prisma
npx prisma generate

# Executar migrations
npm run db:migrate

# Popular o banco de dados com dados iniciais
npm run db:seed
```

Isso criará:
- Usuário admin: `admin` / `admin123`
- 3 clientes de exemplo
- 2 invoices de exemplo

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## Gerenciamento do Banco de Dados

```bash
# Executar Prisma Studio (GUI do banco de dados)
npm run db:studio

# Criar uma nova migration
npm run db:migrate

# Resetar banco de dados (cuidado: deleta todos os dados!)
npm run db:reset

# Popular banco de dados
npm run db:seed
```

## Estrutura do Projeto

```
.
├── app/
│   ├── components/        # Componentes Vue
│   │   └── ClientForm.vue
│   ├── layouts/          # Layouts Nuxt
│   │   └── default.vue
│   ├── pages/            # Páginas da aplicação
│   │   ├── index.vue     # Dashboard
│   │   ├── login.vue     # Página de login
│   │   ├── clients/      # Páginas de clientes
│   │   │   └── index.vue
│   │   └── invoices/     # Páginas de invoices
│   │       ├── index.vue
│   │       ├── new.vue
│   │       └── [id].vue
│   └── app.vue           # Componente raiz
├── middleware/           # Middlewares de rota
│   └── auth.ts          # Middleware de autenticação
├── prisma/
│   ├── schema.prisma    # Schema do banco de dados
│   └── seed.ts          # Seeder do banco de dados
├── server/
│   ├── api/             # Endpoints da API
│   │   ├── auth/        # Rotas de autenticação
│   │   ├── clients/     # CRUD de clientes
│   │   ├── dashboard/   # Estatísticas do dashboard
│   │   └── invoices/    # CRUD de invoices
│   └── utils/
│       └── prisma.ts    # Instância do cliente Prisma
└── nuxt.config.ts       # Configuração do Nuxt
```

## Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Obter sessão atual

### Clientes
- `GET /api/clients` - Listar todos os clientes
- `POST /api/clients` - Criar cliente
- `GET /api/clients/:id` - Obter detalhes do cliente
- `PUT /api/clients/:id` - Atualizar cliente
- `DELETE /api/clients/:id` - Deletar cliente

### Invoices
- `GET /api/invoices` - Listar invoices (suporta filtros)
- `POST /api/invoices` - Criar invoice
- `GET /api/invoices/:id` - Obter detalhes do invoice
- `PUT /api/invoices/:id` - Atualizar invoice
- `DELETE /api/invoices/:id` - Deletar invoice

### Dashboard
- `GET /api/dashboard/stats` - Obter estatísticas do dashboard

## Detalhes das Funcionalidades

### Numeração de Invoices

Os invoices são numerados sequencialmente por cliente no formato:
- `C[ID_CLIENTE]-[NUMERO_SEQUENCIAL]`
- Exemplo: `C1-1`, `C1-2`, `C2-1`

### Campos do Invoice

Cada invoice inclui:
- Informações do cliente
- Data de emissão (automática)
- Data de vencimento (padrão: 5 dias, customizável)
- Moeda (BRL, USD, CAD)
- Itens de linha (descrição, unidade, quantidade, preço unitário)
- Cálculo de subtotal
- Desconto opcional (porcentagem ou fixo)
- Taxa opcional (porcentagem)
- Cálculo de total
- Status (pendente, pago, vencido, cancelado)
- Notas

### Autenticação

A aplicação usa autenticação baseada em sessão via `nuxt-auth-utils`. Todas as rotas exceto `/login` requerem autenticação.

Credenciais padrão:
- Usuário: `admin`
- Senha: `admin123`

### Impressão/Exportação PDF

Os invoices podem ser impressos ou salvos como PDF usando a funcionalidade de impressão do navegador. A página de detalhes do invoice inclui estilos otimizados para impressão.

## Schema do Banco de Dados

### User
- Autenticação do admin

### Client
- Nome, endereço, cidade, estado, CEP, país
- Email, telefone
- Invoices relacionados

### Invoice
- Relação com cliente
- Número sequencial (por cliente)
- Datas (emissão, vencimento)
- Moeda
- Dados financeiros (subtotal, desconto, taxa, total)
- Status
- Notas

### InvoiceItem
- Relação com invoice
- Descrição, unidade, quantidade, preço unitário
- Valor calculado
- Ordem

## Build para Produção

```bash
# Build da aplicação
npm run build

# Preview do build de produção
npm run preview
```

## Licença

MIT

## Autor

F2 Sistemas Ltda.
