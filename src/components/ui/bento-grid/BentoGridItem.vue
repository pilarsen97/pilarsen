<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

const props = withDefaults(defineProps<Props>(), {
  colSpan: 1,
  rowSpan: 1,
});
</script>

<template>
  <div
    class="bento-item"
    :class="[
      props.class,
      `bento-item--col-${props.colSpan}`,
      `bento-item--row-${props.rowSpan}`,
    ]"
  >
    <div class="bento-item__content">
      <div class="bento-item__icon">
        <slot name="icon" />
      </div>
      <div class="bento-item__text">
        <div class="bento-item__title">
          <slot name="title" />
        </div>
        <div class="bento-item__description">
          <slot name="description" />
        </div>
      </div>
    </div>
    <div class="bento-item__highlight">
      <slot name="highlight" />
    </div>
    <div class="bento-item__overlay" />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.bento-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: functions.rem(24);
  border-radius: functions.rem(20);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: functions.rem(180);

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }

  &--col-2 {
    grid-column: span 2;

    @include media.sm-down {
      grid-column: span 1;
    }
  }

  &--row-2 {
    grid-row: span 2;
    min-height: functions.rem(376);

    @include media.sm-down {
      grid-row: span 1;
      min-height: functions.rem(180);
    }
  }

  &__content {
    display: flex;
    gap: functions.rem(16);
    z-index: 1;
    transition: transform 0.3s ease;

    .bento-item:hover & {
      transform: translateX(4px);
    }
  }

  &__icon {
    flex-shrink: 0;
    width: functions.rem(48);
    height: functions.rem(48);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--c-primary, #6366f1) 0%, var(--c-secondary, #8b5cf6) 100%);
    border-radius: functions.rem(14);
    color: white;
    transition: all 0.3s ease;

    .bento-item:hover & {
      transform: scale(1.1);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
    }

    svg,
    :deep(svg) {
      width: functions.rem(24);
      height: functions.rem(24);
    }
  }

  &__text {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: functions.rem(18);
    font-weight: 600;
    color: var(--c-grey-00, #fff);
    margin-bottom: functions.rem(6);
    display: flex;
    align-items: center;
    gap: functions.rem(8);
  }

  &__description {
    font-size: functions.rem(14);
    line-height: 1.5;
    color: var(--c-grey-40, #9ca3af);
  }

  &__highlight {
    position: absolute;
    top: functions.rem(16);
    right: functions.rem(16);
    padding: functions.rem(4) functions.rem(12);
    background: linear-gradient(135deg, var(--c-primary, #6366f1) 0%, var(--c-secondary, #8b5cf6) 100%);
    border-radius: functions.rem(8);
    font-size: functions.rem(14);
    font-weight: 700;
    color: white;
    opacity: 0;
    transform: translateY(-8px);
    transition: all 0.3s ease;
    z-index: 2;

    &:empty {
      display: none;
    }

    .bento-item:hover & {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.05) 0%,
      rgba(139, 92, 246, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;

    .bento-item:hover & {
      opacity: 1;
    }
  }
}
</style>
