<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';

export interface FlipCardProps {
  frontIcon?: string;
  frontTitle: string;
  frontSubtitle?: string;
  backTitle: string;
  backSubtitle?: string;
  backDescription: string;
  features?: string[];
  lang?: 'ru' | 'en';
  className?: string;
}

const props = withDefaults(defineProps<FlipCardProps>(), {
  lang: 'ru',
  features: () => [],
});

const isFlipped = ref(false);

function handleMouseEnter() {
  isFlipped.value = true;
}

function handleMouseLeave() {
  isFlipped.value = false;
}

const flipText = computed(() => props.lang === 'ru' ? 'подробнее' : 'details');
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
        <div v-if="props.frontIcon" class="flip-card__icon">
          <Icon :icon="props.frontIcon" />
        </div>
        <h3 class="flip-card__title">
          {{ props.frontTitle }}
        </h3>
        <p v-if="props.frontSubtitle" class="flip-card__subtitle">
          {{ props.frontSubtitle }}
        </p>
        <!-- Flip Indicator -->
        <div class="flip-indicator">
          <span class="flip-indicator__text">{{ flipText }}</span>
          <span class="flip-indicator__arrow">→</span>
        </div>
      </div>

      <!-- Back Side -->
      <div class="flip-card__back">
        <div class="flip-card__back-header">
          <h3 class="flip-card__back-title">
            {{ props.backTitle }}
          </h3>
          <p v-if="props.backSubtitle" class="flip-card__back-subtitle">
            {{ props.backSubtitle }}
          </p>
        </div>
        <p class="flip-card__back-description">
          {{ props.backDescription }}
        </p>
        <ul v-if="props.features && props.features.length" class="flip-card__features">
          <li v-for="feature in props.features" :key="feature" class="flip-card__feature">
            <span class="flip-card__feature-icon">✓</span>
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/helpers/functions';
@use '../assets/styles/helpers/media';

.flip-card {
  background: transparent;
  width: 100%;
  height: 240px;
  perspective: 1000px;
  cursor: pointer;

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: box-shadow 0.3s ease;
  }

  &__front {
    background: linear-gradient(145deg, var(--c-grey-90) 0%, var(--c-grey-100) 100%);
    color: var(--c-grey-10);

    .flip-card:hover & {
      box-shadow:
        0 8px 32px rgba(var(--c-primary-rgb), 0.15),
        0 0 0 1px rgba(var(--c-primary-rgb), 0.1) inset;
    }
  }

  &__back {
    background: linear-gradient(145deg, var(--c-grey-80) 0%, var(--c-grey-90) 100%);
    color: var(--c-grey-10);
    transform: rotateY(180deg);
    border: 1px solid rgba(255, 255, 255, 0.1);
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    padding: 1.25rem;
    overflow-y: auto;
  }

  &__icon {
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
    border-radius: functions.rem(14);
    transition: all 0.3s ease;

    .flip-card:hover & {
      transform: scale(1.05);
      box-shadow: 0 8px 24px rgba(var(--c-primary-rgb), 0.4);
    }

    svg {
      width: 28px;
      height: 28px;
      color: white;
    }
  }

  &__title {
    font-family: var(--f-headings);
    font-size: functions.rem(20);
    font-weight: 600;
    margin-bottom: 0.35rem;
    color: inherit;
  }

  &__subtitle {
    font-size: functions.rem(13);
    opacity: 0.7;
    color: var(--c-grey-40);
    margin: 0;
  }

  &__back-header {
    margin-bottom: 0.5rem;
    width: 100%;
  }

  &__back-title {
    font-family: var(--f-headings);
    font-size: functions.rem(16);
    font-weight: 600;
    margin-bottom: 0.15rem;
    color: var(--c-primary-light);
  }

  &__back-subtitle {
    font-size: functions.rem(11);
    color: var(--c-grey-50);
    margin: 0;
  }

  &__back-description {
    font-size: functions.rem(13);
    line-height: 1.45;
    margin: 0 0 0.6rem;
    color: var(--c-grey-30);
  }

  &__features {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.3rem 0.5rem;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: functions.rem(11);
    color: var(--c-grey-30);
  }

  &__feature-icon {
    color: var(--c-primary);
    font-weight: bold;
    font-size: functions.rem(10);
  }

  @include media.sm-down {
    height: 220px;

    &__front,
    &__back {
      padding: 1.25rem;
    }

    &__icon {
      width: 48px;
      height: 48px;
      margin-bottom: 0.5rem;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    &__title {
      font-size: functions.rem(18);
    }

    &__subtitle {
      font-size: functions.rem(12);
    }

    &__back-title {
      font-size: functions.rem(14);
    }

    &__back-description {
      font-size: functions.rem(12);
    }

    &__features {
      grid-template-columns: 1fr;
      gap: 0.2rem;
    }

    &__feature {
      font-size: functions.rem(10);
    }
  }
}

// Flip Indicator
.flip-indicator {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  opacity: 0.6;
  transition: all 0.3s ease;

  &__text {
    font-size: functions.rem(10);
    font-weight: 500;
    color: var(--c-grey-50);
    text-transform: lowercase;
  }

  &__arrow {
    font-size: functions.rem(11);
    color: var(--c-grey-50);
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
}
</style>
