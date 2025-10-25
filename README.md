# Invoice Manager

A full-stack invoice management system built with Nuxt 4, Vue 3, Prisma, and PostgreSQL.

> [en-US](./README.md) | [pt-BR](./README.pt-BR.md)

## Features

- 🔐 **Authentication**: Session-based authentication with admin user
- 📊 **Dashboard**: Overview of invoices and clients with statistics
- 👥 **Client Management**: Full CRUD operations for clients
- 📄 **Invoice Management**: Create, edit, view, and delete invoices
- 🔍 **Advanced Filtering**: Filter invoices by client, date range, and status
- 💰 **Multi-currency Support**: BRL, USD, and CAD
- 🖨️ **Print & Export**: Print invoices or save as PDF
- 🎨 **Modern UI**: Built with NuxtUI and Tailwind CSS

## Tech Stack

- **Frontend**: Nuxt 4, Vue 3 (Composition API), NuxtUI
- **Backend**: Nuxt Server API
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: nuxt-auth-utils (session-based)
- **Styling**: Tailwind CSS via NuxtUI

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Site-Institucional-em-Nuxt
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and update with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/invoice_db?schema=public"
NUXT_SESSION_PASSWORD="change-me-to-a-random-secret-at-least-32-characters-long-please"
```

4. **Setup the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed
```

This will create:
- Admin user: `admin` / `admin123`
- 3 sample clients
- 2 sample invoices

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Database Management

```bash
# Run Prisma Studio (database GUI)
npm run db:studio

# Create a new migration
npm run db:migrate

# Reset database (careful: deletes all data!)
npm run db:reset

# Seed database
npm run db:seed
```

## Project Structure

```
.
├── app/
│   ├── components/        # Vue components
│   │   └── ClientForm.vue
│   ├── layouts/          # Nuxt layouts
│   │   └── default.vue
│   ├── pages/            # Application pages
│   │   ├── index.vue     # Dashboard
│   │   ├── login.vue     # Login page
│   │   ├── clients/      # Client pages
│   │   │   └── index.vue
│   │   └── invoices/     # Invoice pages
│   │       ├── index.vue
│   │       ├── new.vue
│   │       └── [id].vue
│   └── app.vue           # Root component
├── middleware/           # Route middlewares
│   └── auth.ts          # Authentication middleware
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeder
├── server/
│   ├── api/             # API endpoints
│   │   ├── auth/        # Authentication routes
│   │   ├── clients/     # Client CRUD
│   │   ├── dashboard/   # Dashboard stats
│   │   └── invoices/    # Invoice CRUD
│   └── utils/
│       └── prisma.ts    # Prisma client instance
└── nuxt.config.ts       # Nuxt configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Get current session

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create client
- `GET /api/clients/:id` - Get client details
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Invoices
- `GET /api/invoices` - List invoices (supports filters)
- `POST /api/invoices` - Create invoice
- `GET /api/invoices/:id` - Get invoice details
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Features Detail

### Invoice Numbering

Invoices are numbered sequentially per client in the format:
- `C[CLIENT_ID]-[SEQUENTIAL_NUMBER]`
- Example: `C1-1`, `C1-2`, `C2-1`

### Invoice Fields

Each invoice includes:
- Client information
- Issue date (automatic)
- Due date (default: 5 days, customizable)
- Currency (BRL, USD, CAD)
- Line items (description, unit, quantity, unit price)
- Subtotal calculation
- Optional discount (percentage or fixed)
- Optional tax (percentage)
- Total calculation
- Status (pending, paid, overdue, cancelled)
- Notes

### Authentication

The application uses session-based authentication via `nuxt-auth-utils`. All routes except `/login` require authentication.

Default credentials:
- Username: `admin`
- Password: `admin123`

### Printing/PDF Export

Invoices can be printed or saved as PDF using the browser's print functionality. The invoice detail page includes print-optimized styles.

## Database Schema

### User
- Admin authentication

### Client
- Name, address, city, state, zip code, country
- Email, phone
- Related invoices

### Invoice
- Client relation
- Sequential number (per client)
- Dates (issue, due)
- Currency
- Financial data (subtotal, discount, tax, total)
- Status
- Notes

### InvoiceItem
- Invoice relation
- Description, unity, quantity, unit price
- Calculated amount
- Order

## Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## License

MIT

## Author

F2 Sistemas Ltda.
