<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue: string | number;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  iconLeft?: string;
  iconRight?: string;
  multiline?: boolean;
  rows?: number;
  maxlength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'default',
  multiline: false,
  rows: 3,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  'focus': [event: FocusEvent];
  'blur': [event: FocusEvent];
}>();

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement>();
const isFocused = ref(false);

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);

const tag = computed(() => props.multiline ? 'textarea' : 'input');

const wrapperClasses = computed(() => [
  `app-input--${props.size}`,
  `app-input--${props.variant}`,
  {
    'app-input--focused': isFocused.value,
    'app-input--error': props.error,
    'app-input--disabled': props.disabled,
    'app-input--has-icon-left': props.iconLeft,
    'app-input--has-icon-right': props.iconRight,
  },
]);

const inputClasses = computed(() => [
  'app-input__field',
  {
    'app-input__field--multiline': props.multiline,
  },
]);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  const value = props.type === 'number' ? Number(target.value) : target.value;
  emit('update:modelValue', value);
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true;
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false;
  emit('blur', event);
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
});
</script>

<template>
  <div class="app-input" :class="wrapperClasses">
    <label v-if="label" class="app-input__label" :for="inputId">
      {{ label }}
      <span v-if="required" class="app-input__required">*</span>
    </label>

    <div class="app-input__wrapper">
      <i v-if="iconLeft" :class="iconLeft" class="app-input__icon app-input__icon--left" />

      <component
        :is="tag"
        :id="inputId"
        ref="inputRef"
        :class="inputClasses"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :maxlength="maxlength"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <i v-if="iconRight" :class="iconRight" class="app-input__icon app-input__icon--right" />
    </div>

    <div v-if="error || hint" class="app-input__message">
      <span v-if="error" class="app-input__error">{{ error }}</span>
      <span v-else-if="hint" class="app-input__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/mixins';

.app-input {
  --input-padding: var(--input-padding);
  --input-font-size: var(--input-f-size);
  --input-border-radius: var(--input-b-radius);
  --input-border-color: var(--input-c-border);
  --input-bg: var(--input-c-bg);
  --input-color: var(--input-c-text);

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__label {
    font-size: var(--label-f-size);
    font-weight: 500;
    color: var(--label-c);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__required {
    color: var(--c-error);
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__field {
    width: 100%;
    padding: var(--input-padding);
    font-size: var(--input-font-size);
    border: 1px solid var(--input-border-color);
    border-radius: var(--input-border-radius);
    background: var(--input-bg);
    color: var(--input-color);
    @include mixins.smooth-hover(border-color);

    &::placeholder {
      color: var(--input-c-placeholder);
    }

    @include mixins.input-focus;

    &--multiline {
      resize: vertical;
      min-height: calc(var(--input-font-size) * 1.6 * 3 + var(--input-padding) * 2);
    }
  }

  &__icon {
    position: absolute;
    color: var(--c-grey-60);
    z-index: 1;

    &--left {
      left: 1rem;
    }

    &--right {
      right: 1rem;
    }
  }

  &__message {
    font-size: functions.rem(14);
    min-height: 1.25rem;
  }

  &__error {
    color: var(--c-error);
  }

  &__hint {
    color: var(--c-grey-60);
  }

  &--sm {
    --input-padding: var(--input-padding-sm);
    --input-font-size: var(--input-f-size-sm);
  }

  &--lg {
    --input-padding: 16px 20px;
    --input-font-size: functions.rem(18);
  }

  &--filled {
    .app-input__field {
      background: var(--c-grey-10);
      border-color: transparent;

      &:focus {
        background: var(--c-grey-00);
      }
    }
  }

  &--outlined {
    .app-input__field {
      border-width: 2px;
    }
  }

  &--has-icon-left {
    .app-input__field {
      padding-left: 3rem;
    }
  }

  &--has-icon-right {
    .app-input__field {
      padding-right: 3rem;
    }
  }

  &--error {
    .app-input__field {
      border-color: var(--c-error);

      &:focus {
        border-color: var(--c-error);
        box-shadow: 0 0 0 3px rgba(var(--c-accent-rgb), 0.1);
      }
    }
  }

  &--disabled {
    opacity: 0.6;

    .app-input__field {
      cursor: not-allowed;
    }
  }
}
</style>
