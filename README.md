# Creative Kibbutz - Modern Website

Modern website for Creative Kibbutz built with Nuxt 4 + NuxtUI.

## Features

- **Nuxt 4** with Composition API
- **NuxtUI** for modern, accessible components
- **Bilingual Support** (English/Portuguese) with i18n
  - Language preference saved in cookie and localStorage
  - Easy language switcher in header
- **JSON-based Content** - All content stored in JSON files for easy management
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern Stack** - Vue 3, TypeScript, Vite

## Project Structure

```
creative-kibbutz-nuxt/
├── app.vue                 # Root component
├── layouts/
│   └── default.vue         # Default layout
├── pages/
│   ├── index.vue           # Homepage
│   └── pages/
│       ├── portfolio.vue   # Portfolio listing
│       ├── contact.vue     # Contact page
│       └── portfolio/
│           └── case/
│               └── [slug].vue  # Case detail page
├── components/
│   ├── TheHeader.vue       # Header with navigation
│   ├── TheFooter.vue       # Footer
│   └── LanguageSwitcher.vue # Language selector
├── i18n/
│   └── locales/
│       ├── en.json         # English translations
│       └── pt.json         # Portuguese translations
├── data/
│   ├── site-config.json    # Site configuration
│   └── cases.json          # Success cases data
└── nuxt.config.ts          # Nuxt configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

```bash
npm install
```

### Development

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Content Management

### Site Configuration

Edit `data/site-config.json` to update:
- Site contact information
- Social media links
- Payment methods

### Cases (Portfolio)

Edit `data/cases.json` to add/update portfolio cases. Each case includes:
- Bilingual title and description
- Category
- About the client
- Problem/Request
- Solution proposed
- Results achieved
- Client feedback

### Translations

Edit translation files in `i18n/locales/`:
- `en.json` - English translations
- `pt.json` - Portuguese translations

## Pages

- **Home** (`/`) - Hero section, features, portfolio preview
- **Portfolio** (`/pages/portfolio`) - All success cases
- **Case Detail** (`/pages/portfolio/case/[slug]`) - Individual case with contact form
- **Contact** (`/pages/contact`) - Contact form and information

## Technologies

- [Nuxt 4](https://nuxt.com/)
- [NuxtUI](https://ui.nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
