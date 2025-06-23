<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string | object;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: string;
  iconRight?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
});

const emit = defineEmits<{
  click: [event: Event];
}>();

const tag = computed(() => {
  if (props.href)
    return 'a';
  if (props.to)
    return 'router-link';
  return 'button';
});

const buttonClasses = computed(() => [
  'app-button',
  `app-button--${props.variant}`,
  `app-button--${props.size}`,
  {
    'app-button--disabled': props.disabled || props.loading,
    'app-button--loading': props.loading,
    'app-button--full-width': props.fullWidth,
    'app-button--has-icon-left': props.iconLeft,
    'app-button--has-icon-right': props.iconRight,
  },
]);

function handleClick(event: Event) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit('click', event);
}
</script>

<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :href="href"
    :to="to"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <i v-if="iconLeft" :class="iconLeft" class="app-button__icon app-button__icon--left" />
    <span v-if="$slots.default" class="app-button__text">
      <slot />
    </span>
    <i v-if="iconRight" :class="iconRight" class="app-button__icon app-button__icon--right" />
    <div v-if="loading" class="app-button__spinner" />
  </component>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/mixins';

.app-button {
  @include mixins.button-reset;
  @include mixins.smooth-hover;

  --btn-padding: var(--btn-padding);
  --btn-font-size: var(--btn-f-size);
  --btn-border-radius: var(--btn-b-radius);
  --btn-bg: transparent;
  --btn-color: var(--c-grey-90);
  --btn-border: 1px solid transparent;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: var(--btn-padding);
  font-size: var(--btn-font-size);
  font-weight: 500;
  border-radius: var(--btn-border-radius);
  border: var(--btn-border);
  background: var(--btn-bg);
  color: var(--btn-color);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(&--disabled):not(&--loading) {
    transform: translateY(-1px);
  }

  &--primary {
    --btn-bg: var(--c-primary);
    --btn-color: var(--c-grey-00);

    &:hover {
      --btn-bg: var(--c-primary-dark);
    }
  }

  &--secondary {
    --btn-bg: var(--c-secondary);
    --btn-color: var(--c-grey-00);

    &:hover {
      --btn-bg: var(--c-secondary-dark);
    }
  }

  &--outline-primary {
    --btn-border: 1px solid var(--c-primary);
    --btn-color: var(--c-primary);

    &:hover {
      --btn-bg: var(--c-primary);
      --btn-color: var(--c-grey-00);
    }
  }

  &--outline-secondary {
    --btn-border: 1px solid var(--c-secondary);
    --btn-color: var(--c-secondary);

    &:hover {
      --btn-bg: var(--c-secondary);
      --btn-color: var(--c-grey-00);
    }
  }

  &--ghost {
    --btn-color: var(--c-grey-70);

    &:hover {
      --btn-bg: var(--c-grey-20);
      --btn-color: var(--c-grey-90);
    }
  }

  &--link {
    --btn-color: var(--c-primary);
    padding: 0;

    &:hover {
      --btn-color: var(--c-primary-dark);
    }
  }

  &--sm {
    --btn-padding: var(--btn-padding-sm);
    --btn-font-size: var(--btn-f-size-sm);
  }

  &--lg {
    --btn-padding: 16px 32px;
    --btn-font-size: functions.rem(18);
  }

  &--full-width {
    width: 100%;
  }

  &--disabled,
  &--loading {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      transform: none;
    }
  }

  &--loading {
    .app-button__text {
      opacity: 0;
    }
  }

  &__icon {
    flex-shrink: 0;

    &--left {
      margin-right: -0.25rem;
    }

    &--right {
      margin-left: -0.25rem;
    }
  }

  &__spinner {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
