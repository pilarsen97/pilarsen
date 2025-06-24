# Hero Lamp Effect

## 📖 Overview
Dramatic lamp effect that creates a spotlight illuminating the hero title from above, inspired by Inspira UI components.

## 🎯 Goals
- Create visual focus on hero title
- Add dynamic lighting effect
- Enhance modern, professional appearance
- Improve visual hierarchy and attention

## 🎨 Design Concept

### Visual Elements
- **Lamp beam**: Triangular light beam from top center
- **Glow effect**: Radial gradient creating soft illumination
- **Subtle animation**: Gentle flickering for living effect
- **Layered lighting**: Multiple light sources for depth

### Color Scheme
- **Light theme**: White/transparent lighting
- **Dark theme**: Red accent lighting matching brand colors
- **Smooth transitions**: Seamless theme switching

## 🔧 Technical Implementation

### Component Structure
```
LampEffect.vue
├── lamp-effect__beam (triangular beam)
├── lamp-effect__glow (radial gradient)
└── slot content (hero title and text)
```

### CSS Techniques
- **CSS triangles**: Border tricks for light beam shape
- **Radial gradients**: Soft glow effects
- **CSS filters**: Blur for realistic lighting
- **Z-index layering**: Proper content stacking
- **Keyframe animations**: Subtle flickering effect

### Responsive Design
- **Mobile optimization**: Smaller beam and glow on mobile
- **Performance considerations**: GPU-accelerated animations
- **Fallback support**: Graceful degradation for older browsers

## 🎭 Animation Details

### Lamp Flicker Effect
```scss
@keyframes lamp-flicker {
  0%, 100% { opacity: 1; transform: scale(1); }
  25% { opacity: 0.8; transform: scale(1.05); }
  50% { opacity: 1; transform: scale(0.95); }
  75% { opacity: 0.9; transform: scale(1.02); }
}
```

### Duration & Easing
- **4 seconds**: Complete flicker cycle
- **ease-in-out**: Natural light variation
- **Infinite loop**: Continuous subtle animation

## 🌙 Theme Integration

### Light Theme
- Subtle white/transparent beams
- Minimal contrast for elegance
- Focus on typography enhancement

### Dark Theme
- Red accent lighting (brand colors)
- Higher contrast for drama
- Enhanced visibility and impact

## 📱 Performance Optimizations
- **GPU acceleration**: transform and opacity animations
- **Minimal repaints**: Absolute positioning
- **Efficient filters**: Optimized blur values
- **Responsive scaling**: Device-appropriate sizing

## 🎯 Success Metrics
- Increased time spent on hero section
- Improved visual hierarchy perception
- Enhanced brand recognition
- Better mobile engagement
