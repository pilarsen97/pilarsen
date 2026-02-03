<script lang="ts" setup>
withDefaults(
  defineProps<{
    reverse?: boolean;
    pauseOnHover?: boolean;
    vertical?: boolean;
    repeat?: number;
    duration?: string;
    gap?: string;
  }>(),
  {
    pauseOnHover: true,
    vertical: false,
    repeat: 4,
    duration: '40s',
    gap: '1rem',
  },
);
</script>

<template>
  <div
    class="marquee"
    :class="{
      'marquee--vertical': vertical,
      'marquee--pause-on-hover': pauseOnHover,
    }"
    :style="{
      '--duration': duration,
      '--gap': gap,
    }"
  >
    <div
      v-for="index in repeat"
      :key="index"
      class="marquee__content"
      :class="{
        'marquee__content--vertical': vertical,
        'marquee__content--reverse': reverse,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.marquee {
  --duration: 40s;
  --gap: 1rem;

  display: flex;
  flex-direction: row;
  gap: var(--gap);
  overflow: hidden;
  padding: 0.5rem 0;

  &--vertical {
    flex-direction: column;
  }

  &--pause-on-hover:hover .marquee__content {
    animation-play-state: paused;
  }

  &__content {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: space-around;
    gap: var(--gap);
    animation: marquee-horizontal var(--duration) linear infinite;

    &--vertical {
      flex-direction: column;
      animation-name: marquee-vertical;
    }

    &--reverse {
      animation-direction: reverse;
    }
  }
}

@keyframes marquee-horizontal {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
}
</style>
