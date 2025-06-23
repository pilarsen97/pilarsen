# Vue 3 Starter Template

A modern Vue 3 + TypeScript + Vite starter template with SCSS and ESLint, designed for rapid development of scalable web applications.

## Features

- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety
- **Vite** for fast development and building
- **SCSS** with comprehensive design system
- **ESLint** with @antfu/eslint-config
- **Bun** as package manager
- **Responsive design** out of the box
- **Dark theme support** ready to implement

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint and fix code
bun run lintfix
```

## Project Structure

```
src/
├── components/          # Vue components
│   └── Header.vue      # Example header component
├── assets/
│   └── styles/         # SCSS architecture
│       ├── app.scss    # Main stylesheet with design tokens
│       ├── components/ # Component-specific styles
│       ├── sections/   # Section-specific styles
│       └── helpers/    # SCSS functions, mixins, variables
├── App.vue             # Root component with examples
└── main.ts             # Application entry point
```

## Design System

The template includes a comprehensive design system with:

- **CSS Custom Properties** for consistent theming
- **Typography scale** with rem functions
- **Color palette** with semantic naming
- **Spacing and layout** tokens
- **Component patterns** for buttons, forms, and navigation
- **Animation curves** and transitions

## Development Guidelines

This template follows Vue 3 and SCSS best practices:

- Use Composition API with `<script setup>`
- Keep templates data-driven (no hardcoded content)
- Follow BEM naming convention for CSS classes
- Use CSS custom properties instead of hardcoded values
- Organize SCSS files by purpose (components, sections, helpers)

## Customization

1. **Colors**: Update CSS custom properties in `src/assets/styles/app.scss`
2. **Typography**: Modify font variables and import your fonts
3. **Components**: Add new components following the established patterns
4. **Styling**: Extend the SCSS architecture in the `styles` directory

## What's Included

- Interactive counter example demonstrating Vue 3 reactivity
- Theme toggle functionality with CSS custom properties
- Responsive header with navigation
- Hero section with call-to-action buttons
- Comprehensive SCSS design system
- TypeScript configuration for strict type checking
- ESLint configuration with auto-fix capability

Perfect for starting new Vue 3 projects with a solid foundation and modern development workflow.
