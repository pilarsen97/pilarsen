# Inspira UI Documentation for Portfolio Project

## Overview
Inspira UI is a **copy-paste component library** for Vue 3 & Nuxt, inspired by Aceternity UI and Magic UI. It provides 100+ beautiful components with animations and modern design patterns.

## Key Characteristics
- **Copy-paste approach** - No npm package, copy components directly
- **Built with modern stack**: shadcn-vue, @vueuse/motion, TailwindCSS
- **Animation-focused**: Rich motion effects
- **Mobile-first and responsive**
- **Open Source**: MIT license

## Required Dependencies
```bash
# Core dependencies for Inspira UI components
npm install @vueuse/core @vueuse/motion
npm install clsx tailwind-merge
npm install @inspira-ui/plugins --save-dev

# Optional for icons
npm install @iconify/vue
```

## Installation Steps

### 1. Prerequisites
- Vue 3 or Nuxt 3 project ✅ (we have this)
- TailwindCSS installed and configured
- Node.js 16+ ✅

### 2. Setup Motion Support
Add motion plugin to main.ts:
```typescript
import { MotionPlugin } from '@vueuse/motion';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(MotionPlugin);
app.mount('#app');
```

### 3. Configure TailwindCSS
Update tailwind.config.js:
```javascript
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Inspira UI uses extended Tailwind config
    }
  },
  plugins: [
    require('@inspira-ui/plugins')
  ]
};
```

## Component Categories

### Layout & Structure
- Container layouts
- Grid systems
- Flex layouts

### Interactive Elements
- Animated buttons with hover effects
- Form inputs with floating labels
- Navigation components

### Backgrounds & Effects
- Aurora animated backgrounds
- Gradient effects
- Particle systems
- Interactive animations

### UI Components
- Cards with hover animations
- Modals and overlays
- Progress indicators
- Tooltips

## Usage Pattern

### 1. Browse & Copy
1. Visit https://inspira-ui.com/components
2. Find the component you need
3. Copy the Vue component code
4. Copy the CSS/Tailwind styles

### 2. Component Structure
```vue
<script setup lang="ts">
import { useMotion } from '@vueuse/motion';
import { ref } from 'vue';
// Component-specific imports
</script>

<template>
  <!-- Copied component template -->
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
```

### 3. Integration with Our Design System
```vue
<template>
  <section class="hero">
    <!-- Our existing classes -->
    <InspiraAnimatedButton
      class="hero__cta" <!-- Our BEM classes --
    >
      @click="handleClick"
      >
      Get Started
    </InspiraAnimatedButton>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  // Our existing SCSS

  &__cta {
    // Override Inspira UI styles with our design tokens
    border-radius: var(--b-radius-sm);

    // Customize colors to match our system
    --inspira-primary: var(--c-primary);
  }
}
</style>
```

## Integration Strategy for Our Portfolio

### 1. Selective Enhancement
- Keep our existing SCSS design system
- Use Inspira UI for **interactive elements** and **animations**
- Enhance specific sections (hero, projects, contact)

### 2. Component Organization
```
src/
├── components/
│   ├── inspira/          # Copied Inspira UI components
│   │   ├── AnimatedButton.vue
│   │   ├── HoverCard.vue
│   │   └── FloatingForm.vue
│   ├── sections/         # Our portfolio sections
│   │   ├── Hero.vue
│   │   ├── Projects.vue
│   │   └── Contact.vue
```

### 3. Styling Approach
- Maintain our CSS custom properties
- Override Inspira UI Tailwind classes with our SCSS
- Use our color palette and typography

## Best Components for Portfolio

### For Hero Section
- Animated backgrounds (Aurora, particles)
- Glowing buttons
- Typewriter text effects

### For Projects Section
- Hover cards with smooth animations
- Image reveal effects
- 3D card tilts

### For Contact Section
- Floating label forms
- Interactive buttons
- Loading animations

## Implementation Workflow

1. **Start small**: Choose 1-2 components
2. **Install dependencies**: Add motion and utility packages
3. **Copy component**: From Inspira UI website
4. **Customize styles**: Match our design system
5. **Test thoroughly**: Ensure animations work smoothly

## Resources
- **Website**: https://inspira-ui.com/
- **Components**: https://inspira-ui.com/components
- **GitHub**: https://github.com/unovue/inspira-ui
- **Installation**: https://inspira-ui.com/getting-started/installation

## Notes for Development
- Components are **copied**, not imported from npm
- Each component may have specific dependencies
- Always test animations on different devices
- Customize colors/typography to match our brand
- Maintain accessibility standards
