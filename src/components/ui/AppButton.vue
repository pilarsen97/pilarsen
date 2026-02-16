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
@use '@/assets/styles/helpers/media';

.app-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: functions.rem(8);
  padding: 12px 24px;
  font: inherit;
  font-size: functions.rem(16);
  font-weight: 600;
  line-height: 1.2;
  border-radius: 16px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--c-grey-10);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  user-select: none;
  -webkit-user-select: none;

  @include media.md-down {
    padding: 10px 20px;
    font-size: functions.rem(15);
  }

  &:hover:not(&--disabled):not(&--loading) {
    transform: translateY(-2px);
  }

  &:active:not(&--disabled):not(&--loading) {
    transform: translateY(0) scale(0.98);
    transition: transform 0.1s ease;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
  }

  // --- Variants ---

  &--primary {
    background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    border-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      left: -100%;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
      transition: left 0.6s ease;
      pointer-events: none;
    }

    &:hover {
      background: linear-gradient(145deg,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.2) 100%
      );
      box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(255, 255, 255, 0.2);

      &::before {
        left: 100%;
      }
    }
  }

  &--secondary {
    background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 50%,
      rgba(255, 255, 255, 0.06) 100%
    );
    border-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      left: -100%;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
      transition: left 0.6s ease;
      pointer-events: none;
    }

    &:hover {
      background: linear-gradient(145deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 50%,
        rgba(255, 255, 255, 0.12) 100%
      );
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1);

      &::before {
        left: 100%;
      }
    }
  }

  &--outline-primary {
    background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 50%,
      rgba(255, 255, 255, 0.06) 100%
    );
    border-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      left: -100%;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
      transition: left 0.6s ease;
      pointer-events: none;
    }

    &:hover {
      background: linear-gradient(145deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 50%,
        rgba(255, 255, 255, 0.12) 100%
      );
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1);

      &::before {
        left: 100%;
      }
    }
  }

  &--outline-secondary {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.15);
    color: var(--c-grey-30);

    &:hover {
      color: var(--c-grey-10);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.25);
    }
  }

  &--ghost {
    color: var(--c-grey-30);

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--c-grey-00);
    }
  }

  &--link {
    color: var(--c-grey-30);
    padding: 0;
    border-radius: 0;

    &:hover {
      color: var(--c-grey-00);
    }
  }

  // --- Sizes ---

  &--sm {
    padding: 8px 16px;
    font-size: functions.rem(14);
  }

  &--lg {
    padding: 16px 32px;
    font-size: functions.rem(18);
  }

  // --- States ---

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

  // --- Children ---

  &__text {
    display: inline-flex;
    align-items: center;
    gap: functions.rem(6);
  }

  &__icon {
    flex-shrink: 0;

    &--left {
      margin-right: functions.rem(-4);
    }

    &--right {
      margin-left: functions.rem(-4);
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
