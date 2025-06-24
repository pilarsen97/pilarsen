<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  className?: string;
}

defineProps<Props>();

const patternRef = ref<HTMLElement>();

onMounted(() => {
  if (patternRef.value) {
    const _pattern = patternRef.value;
    const patternSize = 60;
    const dotSize = 1;

    // Create SVG pattern
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const patternElement = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');

    patternElement.setAttribute('id', 'dot-pattern');
    patternElement.setAttribute('x', '0');
    patternElement.setAttribute('y', '0');
    patternElement.setAttribute('width', patternSize.toString());
    patternElement.setAttribute('height', patternSize.toString());
    patternElement.setAttribute('patternUnits', 'userSpaceOnUse');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', (patternSize / 2).toString());
    circle.setAttribute('cy', (patternSize / 2).toString());
    circle.setAttribute('r', dotSize.toString());
    circle.setAttribute('fill', 'currentColor');
    circle.setAttribute('opacity', '0.3');

    patternElement.appendChild(circle);
    defs.appendChild(patternElement);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'url(#dot-pattern)');

    svg.appendChild(defs);
  }
});
</script>

<template>
  <div
    ref="patternRef"
    class="pattern-background"
    :class="className"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pattern-background {
  position: relative;
  overflow: hidden;
  color: var(--c-grey-40);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, var(--c-grey-60) 1.5px, transparent 1.5px);
    background-size: 50px 50px;
    opacity: 0.3;
    z-index: 0;
    mask: radial-gradient(ellipse 100% 60% at center, black 50%, transparent 100%);
    -webkit-mask: radial-gradient(ellipse 100% 60% at center, black 50%, transparent 100%);
  }

  // Animated dots variation
  &--animated::before {
    animation: pattern-drift 8s ease-in-out infinite;
  }

  // Content should be above pattern
  > * {
    position: relative;
    z-index: 1;
  }
}

@keyframes pattern-drift {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -5px);
  }
  50% {
    transform: translate(-5px, 10px);
  }
  75% {
    transform: translate(-10px, -10px);
  }
}

// Dark theme adjustments
.dark-theme .pattern-background {
  &::before {
    background-image: radial-gradient(circle, var(--c-grey-20) 1.5px, transparent 1.5px);
    opacity: 0.15;
  }
}
</style>
