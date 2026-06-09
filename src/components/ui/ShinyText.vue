<script setup lang="ts">
interface Props {
  text: string;
  // seconds for one shimmer sweep
  speed?: number;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  speed: 4,
  disabled: false,
});
</script>

<template>
  <span
    class="shiny-text"
    :class="{ 'shiny-text--disabled': disabled }"
    :style="{ '--shiny-duration': `${speed}s` }"
  >
    {{ text }}
  </span>
</template>

<style scoped>
.shiny-text {
  display: inline-block;
  background: linear-gradient(
    110deg,
    rgba(var(--c-white-rgb), 0.55) 35%,
    rgba(var(--c-white-rgb), 1) 50%,
    rgba(var(--c-white-rgb), 0.55) 65%
  );
  background-size: 220% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: shinyTextSweep var(--shiny-duration, 4s) linear infinite;
}

.shiny-text--disabled {
  animation: none;
}

@keyframes shinyTextSweep {
  0% { background-position: 220% 0; }
  100% { background-position: -120% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .shiny-text {
    animation: none;
  }
}
</style>
