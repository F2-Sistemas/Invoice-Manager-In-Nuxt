# Invoice Manager - Development Guidelines

## Project Stack
- **Frontend**: Nuxt 4 with Vue 3 Composition API
- **Styling**: Tailwind CSS v4
- **UI Components**: Nuxt UI
- **Backend Database**: PostgreSQL
- **ORM**: Prisma ORM
- **MCP Servers**: nuxt-ui-remote

## General Philosophy
- Apply best practices for each technology
- Write clean, maintainable code
- Avoid unnecessary package dependencies
- Use up-to-date packages with good community acceptance and active maintenance

## Specializations
- **PHP & Laravel**: Expert level
  - Apply well-known PHP PSR standards (PSR-1, PSR-2, PSR-4, PSR-12)
  - Follow Laravel best practices and conventions

- **Vue 3 & Nuxt 4**: Currently studying and specializing
  - Use Composition API when possible
  - Apply Vue 3 best practices

- **TypeScript**: Use whenever possible

## Code Style & Formatting
- **Indentation**: 4 spaces (no tabs)
- **Naming conventions**: Use English for classes, variables, and functions
- **Code formatting**: Well-formatted, readable code
- Follow language-specific style guides

## Git Commits
- Remove references to Claude in commit messages
- Write commits as if they were written by the user directly
- Remove references to Claude in commit messages unless expressly stated otherwise

## Database & ORM (Prisma)
### PostgreSQL Database
- Use PostgreSQL for data persistence
- Follow relational database best practices
- Use migrations for schema changes via Prisma Migrate

### Prisma ORM Best Practices
- Define clear, well-organized schema in `schema.prisma`
- Use proper relationships: one-to-one, one-to-many, many-to-many
- Leverage Prisma Client for type-safe database queries
- Implement proper error handling for database operations
- Use Prisma transactions for complex operations
- Create migrations with descriptive names: `npx prisma migrate dev --name <description>`
- Keep schema.prisma in version control; never commit `.env` with sensitive data
- Use `npx prisma generate` after schema changes to update Prisma Client types

## Nuxt UI Framework
### Core Philosophy
Follow Nuxt UI's three foundational principles:
- **Developer Experience First**: Intuitive APIs with full TypeScript support
- **Beautiful by Default**: Modern, clean design with semantic components
- **Accessible by Default**: WAI-ARIA compliance and keyboard navigation built-in

### Component Architecture
- Built on **Reka UI** (semantic components), **Tailwind CSS v4**, and **Tailwind Variants**
- Use semantic color naming: `primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`
- Migrate `gray` color references to `neutral` terminology
- Components use Slots, Variants, and Compound Variants for flexible styling

### Customization Hierarchy (highest to lowest priority)
1. Component `class` prop (root/base slot only)
2. Component `ui` prop (specific slot overrides)
3. Global `app.config.ts` or `vite.config.ts` theme config
4. Resolved variant styles
5. Default theme definitions

### Installation & Setup
- For Nuxt projects: Install `@nuxt/ui`, register module in `nuxt.config.ts`, import Tailwind and Nuxt UI CSS, wrap app with `UApp` component
- For Vue projects: Use Vite plugin `@nuxt/ui/vite`, install Vue plugin in main.ts
- The `UApp` component is **required** for Toast, Tooltip, and programmatic overlays

### Key Features
- 100+ fully open-source, production-ready components
- 200,000+ icons via Iconify integration
- Automatic WAI-ARIA attributes and keyboard navigation
- Built-in light/dark mode support via CSS variables
- Support for 50+ locales with LTR/RTL text directions

### Styling & Customization
- Use **Tailwind Variants API** for component styling
- Prefer using component `ui` prop for customization over modifying core library
- Leverage Tailwind CSS v4 features and CSS-first configuration
- Enable ESLint auto-fix in VSCode for code standards

### Development Workflow
- Use CLI scaffolding: `nuxt-ui make component`
- Run `pnpm run lint:fix` for code standards
- Execute `pnpm run test` before changes
- Follow Conventional Commits for commit messages
- Use composition API with TypeScript for custom implementations

### Composables
- `defineShortcuts` - Keyboard shortcut management
- `useFormField` - Custom input field integration
- `useOverlay` - Overlay/modal control
- `useToast` - Toast notification management

### Component Naming & References
- All Nuxt UI components are prefixed with `U` (e.g., `UButton`, `UCard`, `UBadge`) but there are exceptions like in `DropdownMenu`
- Built on **Reka UI** primitives for accessibility and semantic HTML
- Use MCP server `nuxt-ui-remote` to reference component APIs before implementation

### DropdownMenu Component
- **Component Name**: `DropdownMenu` and `DropdownMenuItem` (not `UDropdown`)
- **Associated Type**: `DropdownMenuItem`
- **Built on**: Reka UI dropdown menu primitives (https://reka-ui.com/docs/components/dropdown-menu)
- **Nuxt UI Documentation**: https://ui.nuxt.com/docs/components/dropdown-menu
- **Key Features**:
  - Items with structured properties (`label`, `icon`, `avatar`, `kbds`, `type`, `color`, `disabled`, etc.)
  - Support for grouped items using arrays of arrays
  - Keyboard shortcuts via `kbds` property
  - Checkbox items with `type: 'checkbox'` and `checked`/`onUpdateChecked` handling
  - Custom item slots via `slot` property
  - Color variants: `primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`
  - Size variants: `xs`, `sm`, `md`, `lg`, `xl`
- **Usage Pattern**:
  ```typescript
  import type { DropdownMenuItem } from '@nuxt/ui'

  const items: DropdownMenuItem[][] = [
    [{ label: 'Profile', icon: 'i-lucide-user' }],
    [{ label: 'Logout', color: 'error', icon: 'i-lucide-log-out' }],
  ]
  ```

### Documentation Reference
- **Complete Nuxt UI guidelines**: https://ui.nuxt.com/llms-full.txt
- **Nuxt UI implementation docs**: https://ui.nuxt.com/llms.txt
- **Reka UI Foundation**: https://reka-ui.com/docs/components/dropdown-menu

## MCP Servers
### Available MCP Servers
- **nuxt-ui-remote**: Provides access to Nuxt UI components, composables, templates, and documentation
  - Use for referencing component APIs, props, slots, and events
  - Access to component examples and implementation patterns
  - Full Nuxt UI documentation integration

### How to Use MCP Servers
- **For Component References**: Use `mcp__nuxt-ui-remote__get_component(ComponentName)` to fetch complete documentation
  - Example: `get_component('DropdownMenu')` to understand `DropdownMenu` component structure
  - Returns: Name, title, description, category, and full documentation with examples

- **For Component Metadata**: Use `mcp__nuxt-ui-remote__get_component_metadata(ComponentName)` for detailed API info
  - Returns: Props, slots, emits, variants, and type definitions
  - Useful for understanding component configuration options

- **For Documentation Pages**: Use `mcp__nuxt-ui-remote__get_documentation_page(path)` for in-depth guides
  - Example: `/docs/components/dropdown-menu` for DropdownMenu documentation

- **Best Practices**:
  - Always check component documentation via MCP before implementation
  - Verify correct component naming (prefixed with `U`)
  - Reference types from `@nuxt/ui` imports (e.g., `DropdownMenuItem`)
  - Review examples before building custom solutions
  - Leverage available composables and utilities from Nuxt UI ecosystem
