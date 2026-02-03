# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Arsen's portfolio website built with Vue 3 + TypeScript + Vite. It showcases web development skills, projects, and experience since 2012. The project uses a comprehensive SCSS design system enhanced with Inspira UI components for modern animations and interactions.

**Portfolio Content:**
- Personal introduction: "Привет, я Арсен" (bilingual RU/EN)
- Experience: Web services, bots, website promotion, and children's IT education since 2012
- Services: Website development, SEO optimization, chatbot development, children's IT education
- Projects: A&W Studio, KIBERone

**UI Library Integration:**
- **Inspira UI** (https://inspira-ui.com/): Copy-paste components for animations
- **@vueuse/motion**: Declarative animations
- **motion-v**: Motion primitives

## Development Commands

```bash
bun run dev          # Start dev server (port 3000, auto-opens browser)
bun run build        # TypeScript check + Vite production build
bun run preview      # Preview production build
bun run lintfix      # ESLint with auto-fix

# Testing (Vitest)
bun run test         # Run tests in watch mode
bun run test:ui      # Run tests with UI
bun run test:coverage # Run tests with coverage report
```

## Project Architecture

### Tech Stack
- **Vue 3** with Composition API and `<script setup>` syntax
- **Vue Router** for page navigation (Home `/`, Me `/me`)
- **Vite** with TypeScript, SCSS, and Tailwind CSS v4
- **ESLint** with @antfu/eslint-config (enforces semicolons and single quotes)
- **Vitest** for unit testing with happy-dom environment

### Key Architecture Patterns

**Routing**: `src/router/index.ts` defines routes, views in `src/views/`

**Data Management**: Modular composables architecture in `src/composables/`
- **Core**: `useLanguage.ts` - Singleton language state management with `localize()` helper
- **Section composables**: Each section has its own data composable:
  - `useHeroData.ts` - Hero section text and CTAs
  - `useTechData.ts` - Technologies stack
  - `useServicesData.ts` - Services with flip cards
  - `useProjectsData.ts` - Portfolio projects
  - `useWorksData.ts` - Work examples
  - `useTeamsData.ts` - Teams/organizations
  - `useContactData.ts` - Contact information
- **Types**: All interfaces in `src/types/portfolio.ts`
- **Icons**: Using `@iconify/vue` - icons loaded from CDN (lucide, simple-icons, heroicons)

**Composable Usage Pattern**:
```ts
// Import specific composable
import { useHeroData } from '@/composables';

// Get auto-localized computed properties
const { greeting, description } = useHeroData();

// Use in template (auto-updates on language change)
<h1>{{ greeting }}</h1>
```

**SCSS Global Injection**: Vite automatically injects helpers into all SCSS files:
```ts
// vite.config.ts - helpers available globally without @use
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "src/assets/styles/helpers" as *;`
    }
  }
}
```

### Path Aliases
```ts
'@'           → 'src/'
'@/components' → 'src/components/'
'@/assets'    → 'src/assets/'
'@/styles'    → 'src/assets/styles/'
```

### SCSS Helpers System (`src/assets/styles/helpers/`)
- **functions**: `rem($pixels)` - px to rem conversion, `hexToRGB($hex)`
- **media**: Breakpoint mixins (`xs-down`, `sm-up`, `md-only`, `lg-up`, etc.)
- **vars**: Breakpoints ($xs: 375px, $sm: 576px, $md: 720px, $lg: 992px, $xl: 1360px, $xxl: 1920px)
- **mixins**: Reusable style patterns

## Code Quality Standards

### Vue Component Standards
- **NEVER hardcode content in template** - all text, links, images must be in reactive data (ref/reactive)
- Use `v-for` for dynamic lists instead of hardcoded HTML elements
- All component content should be configurable through reactive variables
- Keep templates clean and data-driven

### SCSS Coding Standards

#### BEM Naming Convention:
- **Block**: `.component-name`
- **Element**: `.component-name__element` (double underscore)
- **Modifier**: `.component-name--modifier` (double dash)

#### Required File Imports:
```scss
@use '../helpers/functions'; // When using functions
@use '../helpers/media'; // When using media
@use '../helpers/mixins'; // When using mixins
```

#### Selector Organization (MANDATORY ORDER):
1. **Basic styles** (no nesting)
2. **Media mixins** for the selector
3. **Pseudo-classes and pseudo-selectors**
   - Media mixins for pseudo elements
4. **Modifiers** (`&--modifier`)
   - Media mixins for modifiers
5. **Child tags** (`span`, `img`, etc.)
   - Media mixins for tags

#### Nesting Rules:
- **NEVER** nest elements inside blocks (`.block .block__element` ❌)
- **ONLY fold/nest**:
  - Media mixins (`@include media.lg-up {}`)
  - Pseudo selectors (`:hover`, `::before`)
  - Modifiers (`&--modifier`)
  - Simple single-use tags (`span`, `img`)
- **Media mixins ALWAYS come last** in any nested group

### Typography & Sizing
- **Font Size Functions**: `functions.rem(16)` - Convert pixels to rem
- **Font Family Variables**: Use `var(--f-base)`, `var(--f-headings)`, `var(--f-icons)`

### CSS Custom Properties System
- Always use CSS custom properties instead of hardcoded values
- Color variables: `var(--c-primary)`, `var(--c-secondary)`, etc.
- Layout variables: `var(--w-container)`, `var(--b-radius-sm)`, etc.

## Commit Message Guidelines

- **Keep commit messages concise** (50 characters max for title)
- **NO AI agent mentions** - never reference Claude, AI assistance, or generated content in commits
- **Use conventional format**: `type: brief description`
- **Examples**:
  - `feat: add teams section with positioned badges`
  - `fix: resolve SCSS media import error`
  - `style: update team card layout and spacing`
  - `refactor: remove unused logo components`

## Code Quality Rules

- **Pre-commit hook**: Run `bun lintfix` before every commit to ensure code quality
- **ESLint compliance**: All code must pass linting checks before committing
- **Clean commits**: No unused variables, proper function declarations, organized imports
