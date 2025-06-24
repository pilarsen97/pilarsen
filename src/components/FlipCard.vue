<script setup lang="ts">
import { ref } from 'vue';

export interface FlipCardProps {
  frontIcon?: string;
  frontTitle: string;
  frontSubtitle?: string;
  backTitle: string;
  backDescription: string;
  className?: string;
}

const props = defineProps<FlipCardProps>();

const isFlipped = ref(false);

function handleMouseEnter() {
  isFlipped.value = true;
}

function handleMouseLeave() {
  isFlipped.value = false;
}
</script>

<template>
  <div
    class="flip-card"
    :class="props.className"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="flip-card__inner"
      :class="{ 'flip-card__inner--flipped': isFlipped }"
    >
      <!-- Front Side -->
      <div class="flip-card__front">
        <div v-if="props.frontIcon" class="flip-card__icon" v-html="props.frontIcon" />
        <h3 class="flip-card__title">
          {{ props.frontTitle }}
        </h3>
        <p v-if="props.frontSubtitle" class="flip-card__subtitle">
          {{ props.frontSubtitle }}
        </p>
        <!-- Flip Indicator -->
        <div class="flip-indicator">
          <span class="flip-indicator__text">подробнее</span>
          <span class="flip-indicator__arrow">→</span>
        </div>
      </div>

      <!-- Back Side -->
      <div class="flip-card__back">
        <h3 class="flip-card__back-title">
          {{ props.backTitle }}
        </h3>
        <p class="flip-card__back-description">
          {{ props.backDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/helpers/functions';

.flip-card {
  background: transparent;
  width: 100%;
  height: 280px;
  perspective: 1000px;
  cursor: pointer;

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;

    &--flipped {
      transform: rotateY(180deg);
    }
  }

  &__front,
  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: var(--b-radius-lg);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--c-grey-80);
  }

  &__front {
    background: var(--c-grey-90);
    color: var(--c-grey-10);
  }

  &__back {
    background: linear-gradient(135deg, var(--c-grey-80) 0%, var(--c-grey-90) 100%);
    color: var(--c-grey-10);
    transform: rotateY(180deg);
    border: 1px solid var(--c-grey-70);
  }

  &__icon {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 48px;
      height: 48px;
    }
  }

  &__title {
    font-family: var(--f-headings);
    font-size: functions.rem(24);
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: inherit;
  }

  &__subtitle {
    font-size: functions.rem(14);
    opacity: 0.8;
    color: var(--c-grey-40);
    margin: 0;
  }

  &__back-title {
    font-family: var(--f-headings);
    font-size: functions.rem(20);
    font-weight: 600;
    margin-bottom: 1rem;
    color: inherit;
  }

  &__back-description {
    font-size: functions.rem(16);
    line-height: 1.5;
    margin: 0;
    color: inherit;
    opacity: 0.95;
  }
}

// Flip Indicator
.flip-indicator {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  opacity: 0.7;
  transition: all 0.3s ease;

  &__text {
    font-size: functions.rem(11);
    font-weight: 500;
    color: var(--c-grey-40);
    text-transform: lowercase;
  }

  &__arrow {
    font-size: functions.rem(12);
    color: var(--c-grey-40);
    animation: stretch-arrow 1.5s ease-in-out infinite;
    transform-origin: left center;
  }

  .flip-card:hover & {
    opacity: 0;
    transform: scale(0.8);
  }
}

@keyframes stretch-arrow {
  0%, 100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.3);
  }
}

.flip-card {
  // Hover effects
  &:hover &__inner {
    &:not(.flip-card__inner--flipped) {
      transform: rotateY(5deg) scale(1.02);
    }
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    height: 250px;

    &__front,
    &__back {
      padding: 1.5rem;
    }

    &__icon {
      font-size: 2.5rem;
    }

    &__title {
      font-size: functions.rem(20);
    }

    &__back-title {
      font-size: functions.rem(18);
    }

    &__back-description {
      font-size: functions.rem(14);
    }
  }
}
</style>
