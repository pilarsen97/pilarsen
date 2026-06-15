<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

interface Props {
  /** Hint body shown in the popover */
  text: string;
  /** Accessible label for the trigger */
  label?: string;
}

const props = withDefaults(defineProps<Props>(), { label: '' });

const root = ref<HTMLElement | null>(null);
const btn = ref<HTMLElement | null>(null);
const pop = ref<HTMLElement | null>(null);

const hovered = ref(false);
const pinned = ref(false);
const open = computed(() => hovered.value || pinned.value);

const coords = ref({ top: 0, left: 0, arrow: 0, placement: 'top' as 'top' | 'bottom' });

const ariaLabel = computed(() => props.label || (props.text.length > 60 ? `${props.text.slice(0, 57)}…` : props.text));

async function place(): Promise<void> {
  await nextTick();
  if (!btn.value || !pop.value)
    return;
  const margin = 8;
  const b = btn.value.getBoundingClientRect();
  const p = pop.value.getBoundingClientRect();

  let placement: 'top' | 'bottom' = 'top';
  let top = b.top - p.height - margin;
  if (top < margin) {
    top = b.bottom + margin;
    placement = 'bottom';
  }

  const ideal = b.left + b.width / 2 - p.width / 2;
  const left = Math.max(margin, Math.min(ideal, window.innerWidth - p.width - margin));
  const arrow = Math.max(12, Math.min(b.left + b.width / 2 - left, p.width - 12));

  coords.value = { top, left, arrow, placement };
}

function onScroll(): void {
  place();
}

function toggle(): void {
  pinned.value = !pinned.value;
}

function onEnter(): void {
  hovered.value = true;
}

function onLeave(): void {
  hovered.value = false;
}

function onDocPointer(event: PointerEvent): void {
  if (root.value && !root.value.contains(event.target as Node))
    pinned.value = false;
}

function onKey(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    pinned.value = false;
    hovered.value = false;
    btn.value?.blur();
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    place();
    document.addEventListener('pointerdown', onDocPointer);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
  }
  else {
    document.removeEventListener('pointerdown', onDocPointer);
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('scroll', onScroll, true);
    window.removeEventListener('resize', onScroll);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointer);
  document.removeEventListener('keydown', onKey);
  window.removeEventListener('scroll', onScroll, true);
  window.removeEventListener('resize', onScroll);
});
</script>

<template>
  <span ref="root" class="hint" @mouseenter="onEnter" @mouseleave="onLeave">
    <button
      ref="btn"
      type="button"
      class="hint__btn"
      :class="{ 'is-open': open }"
      :aria-label="ariaLabel"
      :aria-expanded="open"
      @click="toggle"
      @focus="onEnter"
      @blur="onLeave"
    >
      ?
    </button>
    <Transition name="hint">
      <span
        v-if="open"
        ref="pop"
        class="hint__pop"
        :class="`hint__pop--${coords.placement}`"
        role="tooltip"
        :style="{ 'top': `${coords.top}px`, 'left': `${coords.left}px`, '--arrow': `${coords.arrow}px` }"
      >
        {{ text }}
      </span>
    </Transition>
  </span>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';

.hint {
  display: inline-flex;
  margin-left: 5px;
  vertical-align: middle;

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    padding: 0;
    font-family: var(--cap-mono);
    font-size: functions.rem(9);
    font-weight: 600;
    line-height: 1;
    color: var(--cap-ink-3);
    background: transparent;
    border: 1px solid var(--cap-rule-strong);
    border-radius: 50%;
    cursor: help;
    transition: color 0.16s ease, border-color 0.16s ease, background 0.16s ease;

    &:hover,
    &:focus-visible,
    &.is-open {
      color: var(--cap-paper);
      background: var(--cap-red);
      border-color: var(--cap-red);
      outline: none;
    }
  }

  &__pop {
    position: fixed;
    z-index: var(--z-top-30);
    width: max-content;
    max-width: 260px;
    padding: 10px 12px;
    font-family: var(--cap-sans);
    font-size: functions.rem(12);
    font-weight: 400;
    line-height: 1.45;
    letter-spacing: 0;
    text-transform: none;
    text-align: left;
    white-space: normal;
    color: var(--cap-paper);
    background: var(--cap-ink);
    border-radius: 4px;
    box-shadow: 0 6px 24px color-mix(in oklch, var(--cap-ink) 28%, transparent);
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      left: var(--arrow, 50%);
      width: 8px;
      height: 8px;
      margin-left: -4px;
      background: var(--cap-ink);
      transform: rotate(45deg);
    }

    &--top::after {
      bottom: -4px;
    }

    &--bottom::after {
      top: -4px;
    }
  }
}

.hint-enter-active,
.hint-leave-active {
  transition: opacity 0.14s ease, transform 0.14s ease;
}

.hint-enter-from,
.hint-leave-to {
  opacity: 0;
  transform: translateY(2px);
}
</style>
