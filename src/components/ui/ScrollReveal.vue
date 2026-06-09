<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { computed, ref } from 'vue';

interface Props {
  text: string;
  // seconds between each word
  stagger?: number;
}

const props = withDefaults(defineProps<Props>(), {
  stagger: 0.05,
});

const el = ref<HTMLElement | null>(null);
const visible = ref(false);

const { stop } = useIntersectionObserver(
  el,
  ([entry]) => {
    if (entry?.isIntersecting) {
      visible.value = true;
      stop();
    }
  },
  { threshold: 0.2 },
);

const words = computed(() => props.text.split(' '));
</script>

<template>
  <p
    ref="el"
    class="scroll-reveal"
    :class="{ 'scroll-reveal--visible': visible }"
    :style="{ '--sr-stagger': `${stagger}s` }"
  >
    <span
      v-for="(word, i) in words"
      :key="`${i}-${word}`"
      class="scroll-reveal__word"
      :style="{ '--i': i }"
    >{{ word }}</span>
  </p>
</template>

<style lang="scss" scoped>
.scroll-reveal {
  margin: 0;
}

.scroll-reveal__word {
  display: inline-block;
  margin-right: 0.28em;
  opacity: 0;
  transform: translateY(0.4em);
  filter: blur(8px);
  transition:
    opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.6s ease;
  transition-delay: calc(var(--i) * var(--sr-stagger, 0.05s));
}

.scroll-reveal--visible .scroll-reveal__word {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal__word {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>
