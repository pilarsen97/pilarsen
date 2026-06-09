<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLanguage } from '@/composables';

interface Props {
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
}
defineProps<Props>();

const model = defineModel<number>({ required: true });

const { currentLang } = useLanguage();
const focused = ref(false);

function group(value: number): string {
  return new Intl.NumberFormat(currentLang.value === 'ru' ? 'ru-RU' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(value);
}

const display = ref(group(model.value));

// Re-format on value OR language change (separators differ between ru-RU / en-US),
// but never while the field is focused — that would fight the user's typing.
watch([model, currentLang], () => {
  if (!focused.value)
    display.value = group(model.value);
});

function onInput(event: Event): void {
  const raw = (event.target as HTMLInputElement).value.replace(/\D/g, '');
  const num = raw ? Number.parseInt(raw, 10) : 0;
  model.value = num;
  display.value = group(num);
}

function onFocus(): void {
  focused.value = true;
}

function onBlur(): void {
  focused.value = false;
  display.value = group(model.value);
}
</script>

<template>
  <div class="money-input" :class="{ 'money-input--focused': focused }">
    <span class="money-input__suffix" aria-hidden="true">₽</span>
    <input
      :id="id"
      :value="display"
      type="text"
      inputmode="numeric"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      class="money-input__field"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    >
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';

.money-input {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--cap-paper);
  border: 1px solid var(--cap-rule-strong);
  border-radius: 2px;
  transition: border-color 0.16s ease, box-shadow 0.16s ease;

  &--focused {
    border-color: var(--cap-red);
    box-shadow: inset 0 -2px 0 0 var(--cap-red);
  }

  &__suffix {
    padding-left: 12px;
    font-family: var(--cap-mono);
    font-size: functions.rem(13);
    color: var(--cap-ink-3);
    pointer-events: none;
  }

  &__field {
    width: 100%;
    padding: 11px 12px 11px 6px;
    font-family: var(--cap-mono);
    font-size: functions.rem(16);
    font-weight: 500;
    font-feature-settings: 'tnum' 1;
    letter-spacing: -0.01em;
    color: var(--cap-ink);
    background: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: var(--cap-ink-3);
    }
  }
}
</style>
