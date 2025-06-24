# Mobile Navigation

## 📖 Overview
Responsive mobile navigation with hamburger menu, smooth animations, and intuitive user experience for mobile and tablet devices.

## 🎯 Goals
- Provide easy navigation on mobile devices
- Maintain design consistency across breakpoints
- Ensure accessibility and usability
- Create smooth, professional animations

## 📱 Design Concept

### Navigation Types
**Option A: Slide-out Drawer**
- Menu slides from right/left
- Overlay background
- Close on outside tap

**Option B: Full-screen Overlay**
- Menu covers entire screen
- Large navigation items
- Animated entrance/exit

**Option C: Drop-down Menu**
- Menu expands below header
- Compact vertical list
- Maintains header visibility

### Hamburger Menu Styles
**Option A: Classic Three Lines**
- Simple and recognizable
- Smooth transition to X

**Option B: Animated Burger**
- Morphing animation
- Bouncy effects
- Modern appearance

**Option C: Minimalist Dots**
- Three dots instead of lines
- Subtle and clean
- Unique visual style

## 🎨 Animation Framework

### Menu Toggle Animation
```scss
// Hamburger to X transformation
.hamburger-line {
  transition: transform 0.3s ease, opacity 0.3s ease;

  &.open {
    &:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    &:nth-child(2) { opacity: 0; }
    &:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
  }
}
```

### Menu Reveal Animation
- **Slide-in**: Menu items slide from right with stagger
- **Fade-in**: Sequential fade with scale effect
- **Elastic**: Bouncy entrance for playful feel
- **Duration**: 300-500ms for smooth feel

### Background Overlay
- **Fade-in**: Dark overlay appears behind menu
- **Blur effect**: Background content becomes blurred
- **Click-to-close**: Tap overlay to close menu

## 🔧 Technical Implementation

### Component Structure
```vue
MobileNavigation.vue
├── HamburgerButton
├── NavigationOverlay
├── NavigationMenu
│   ├── NavigationItem (repeated)
│   └── LanguageToggle
└── BackgroundOverlay
```

### Breakpoint Strategy
```scss
// Mobile navigation shows at:
@media (max-width: 768px) {
  .desktop-nav { display: none; }
  .mobile-nav { display: block; }
}
```

### State Management
```typescript
interface MobileNavState {
  isOpen: boolean;
  activeSection: string;
  scrollDirection: 'up' | 'down';
  isHeaderVisible: boolean;
}
```

## 📱 Navigation Items

### Primary Navigation
- **Главная** (Home) - Scroll to hero
- **О себе** (About) - Scroll to about section
- **Проекты** (Projects) - Scroll to projects
- **Навыки** (Skills) - Scroll to skills/tech
- **Контакты** (Contact) - Scroll to contact

### Secondary Actions
- **Language Toggle** - RU/EN switcher
- **Theme Toggle** - Dark/light mode
- **Resume Download** - PDF download link

### Social Links (Optional)
- **GitHub** - Code portfolio
- **Telegram** - Quick contact
- **LinkedIn** - Professional network

## 🎯 User Experience Features

### Smart Header Behavior
- **Hide on scroll down** - More screen space
- **Show on scroll up** - Easy access to navigation
- **Always visible when menu open** - Clear close option

### Active Section Highlighting
- **Visual indicator** for current section
- **Smooth transitions** between active states
- **Clear hierarchy** in navigation items

### Touch Optimizations
- **Large touch targets** (min 44px)
- **Thumb-friendly** positioning
- **Swipe gestures** for menu control
- **Haptic feedback** on supported devices

## 🔒 Accessibility Features

### Keyboard Navigation
- **Tab order** logical and intuitive
- **Enter/Space** to activate items
- **Escape** to close menu
- **Focus indicators** clearly visible

### Screen Reader Support
- **ARIA labels** for all interactive elements
- **Role attributes** for menu structure
- **Screen reader announcements** for state changes
- **Skip links** for efficient navigation

### Visual Accessibility
- **High contrast** mode support
- **Reduced motion** respect user preferences
- **Focus indicators** meet WCAG standards
- **Color contrast** passes AA guidelines

## 📊 Performance Considerations

### Optimization Strategies
- **CSS transforms** instead of layout changes
- **will-change** property for animated elements
- **Passive event listeners** for scroll
- **Debounced scroll** handlers

### Bundle Size
- **Tree-shaking** unused animations
- **Conditional loading** for advanced features
- **Minimal JavaScript** for core functionality
- **CSS-only** animations where possible

## 🧪 Testing Strategy

### Device Testing
- **iOS Safari** - iPhone/iPad
- **Android Chrome** - Various screen sizes
- **Mobile browsers** - Edge, Firefox, Samsung
- **Tablet landscape/portrait** - Different orientations

### Functionality Testing
- **Menu open/close** - All interaction methods
- **Navigation links** - Smooth scroll behavior
- **Language toggle** - State persistence
- **Orientation change** - Layout adaptation
