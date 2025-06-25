# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Arsen's portfolio website built with Vue 3 + TypeScript + Vite. It showcases web development skills, projects, and experience since 2012. The project uses a comprehensive SCSS design system enhanced with Inspira UI components for modern animations and interactions.

**🎯 Portfolio Content:**
- Personal introduction: "Привет, я Арсен 👋"
- Experience: Web services, bots, website promotion, and children's IT education since 2012
- Technologies: WordPress/Laravel, Vue.js, Nuxt 3, TypeScript, SCSS
- Services: Website development, SEO optimization, chatbot development, children's IT education
- Projects: A&W Studio, KIBERone

**📚 UI Library Integration:**
- **Inspira UI** (https://inspira-ui.com/): For animated components and modern interactions
- Copy-paste approach from Inspira UI documentation
- **@vueuse/motion**: For declarative animations
- **Key Components**: LampEffect, FlipCard, PatternBackground

## Development Commands

- `bun run dev` - Start development server with Vite
- `bun run build` - Build for production (runs TypeScript check + Vite build)
- `bun run preview` - Preview production build locally
- `bun run lintfix` - Run ESLint with auto-fix

## Project Architecture

This starter template provides a solid foundation for Vue 3 applications with:

### Tech Stack
- **Frontend**: Vue 3 with Composition API and `<script setup>` syntax
- **Build Tool**: Vite with TypeScript support
- **Styling**: SCSS with a comprehensive design system
- **Linting**: ESLint with @antfu/eslint-config (enforces semicolons and single quotes)

### Project Structure
- `src/App.vue` - Main application component with section imports
- `src/components/` - Vue components organized by type:
  - `FlipCard.vue` - Interactive flip cards for services/tech
  - `LampEffect.vue` - Hero section dramatic lighting effect
  - `LanguageToggle.vue` - RU/EN language switcher
  - `PatternBackground.vue` - Animated dot pattern background
  - `sections/` - Main page sections (Hero, Services, Projects)
  - `ui/` - Reusable UI components
- `src/composables/` - Vue 3 composables:
  - `usePortfolio.ts` - Central portfolio data management
- `src/assets/styles/` - SCSS files organized by purpose:
  - `app.scss` - Main stylesheet with CSS custom properties and glass effects
  - `components/` - Component-specific styles
  - `sections/` - Section-specific styles
  - `helpers/` - SCSS functions, mixins, variables
- `docs/` - Feature planning and documentation

### Styling System
The project uses a comprehensive design system defined in `app.scss` with CSS custom properties for:
- Typography (Unbounded for headings, Wix Madefor Display for body)
- Color palette (neutral grays, white accents for glass effects)
- Glass design system (glassmorphism buttons, 3D text effects)
- Spacing and border radius tokens
- Z-index management
- Animation curves and lamp effects

### Key Configuration
- Vite config includes path alias: `@styles` → `src/assets/styles`
- ESLint enforces semicolons and single quotes
- TypeScript strict mode enabled
- SCSS with modern module system (`@use` instead of `@import`)

### Component Architecture
- **Layout Components**: Language toggle, responsive design patterns
- **Interactive Components**: 
  - `FlipCard.vue` - Hover-to-flip cards with "подробнее" indicator
  - `LampEffect.vue` - Dramatic top-down lighting effect for hero
  - `PatternBackground.vue` - Animated dot patterns with SVG generation
- **Section Components**: Hero with lamp effect, Services with flip cards, Projects showcase
- **Data Management**: Centralized portfolio data in `usePortfolio.ts` composable
- **Styling**: Apple liquid glass design system with 3D text effects and glassmorphism

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
