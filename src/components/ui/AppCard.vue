<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  shadow?: 1 | 2 | 3 | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  rounded?: boolean;
  bordered?: boolean;
  hover?: boolean;
  glass?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 1,
  padding: 'md',
  rounded: true,
  bordered: false,
  hover: false,
  glass: false,
});

const cardClasses = computed(() => [
  'app-card',
  {
    [`app-card--shadow-${props.shadow}`]: props.shadow !== 'none',
    [`app-card--padding-${props.padding}`]: props.padding !== 'none',
    'app-card--rounded': props.rounded,
    'app-card--bordered': props.bordered,
    'app-card--hover': props.hover,
    'app-card--glass': props.glass,
  },
]);
</script>

<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="app-card__header">
      <slot name="header">
        <h3 v-if="title" class="app-card__title">
          {{ title }}
        </h3>
      </slot>
    </div>

    <div v-if="$slots.default" class="app-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="app-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/mixins';

.app-card {
  background: var(--c-grey-00);
  border-radius: var(--b-radius);
  overflow: hidden;

  &--shadow-1 {
    @include mixins.card-shadow(1);
  }

  &--shadow-2 {
    @include mixins.card-shadow(2);
  }

  &--shadow-3 {
    @include mixins.card-shadow(3);
  }

  &--padding-sm {
    .app-card__header,
    .app-card__body,
    .app-card__footer {
      padding: 1rem;
    }
  }

  &--padding-md {
    .app-card__header,
    .app-card__body,
    .app-card__footer {
      padding: 1.5rem;
    }
  }

  &--padding-lg {
    .app-card__header,
    .app-card__body,
    .app-card__footer {
      padding: 2rem;
    }
  }

  &--rounded {
    border-radius: var(--b-radius-lg);
  }

  &--bordered {
    border: 1px solid var(--c-grey-20);
  }

  &--hover {
    @include mixins.smooth-hover(transform);
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
  }

  &--glass {
    @include mixins.glass-effect;
  }

  &__header {
    border-bottom: 1px solid var(--c-grey-20);

    &:last-child {
      border-bottom: none;
    }
  }

  &__title {
    @include mixins.heading-base;
    font-size: 1.25rem;
    margin: 0;
    color: var(--c-grey-90);
  }

  &__body {
    @include mixins.body-text;
  }

  &__footer {
    border-top: 1px solid var(--c-grey-20);
    background: var(--c-grey-10);

    &:first-child {
      border-top: none;
      background: transparent;
    }
  }
}
</style>
