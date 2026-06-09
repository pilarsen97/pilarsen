<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Aurora from '@/components/ui/Aurora.vue';
import SectionHeader from '@/components/ui/SectionHeader.vue';
import { useAdvantagesData } from '@/composables';

const { eyebrow, titleLead, titleAccent, description, items } = useAdvantagesData();

const iconNames = [
  'lucide:route',
  'lucide:calendar-clock',
  'lucide:layout-grid',
  'lucide:cpu',
  'lucide:users',
  'lucide:target',
];

function isWide(index: number): boolean {
  return index === 0 || index === 5;
}
</script>

<template>
  <section class="advantages">
    <Aurora class="advantages__aurora" :speed="0.5" />
    <div class="advantages__veil" aria-hidden="true" />

    <div class="container advantages__inner">
      <SectionHeader
        :eyebrow="eyebrow"
        :title-lead="titleLead"
        :title-accent="titleAccent"
        :description="description"
      />

      <div class="advantages__grid">
        <article
          v-for="(item, index) in items"
          :key="item.title"
          class="advantage-card"
          :class="{ 'advantage-card--wide': isWide(index) }"
          :style="{ animationDelay: `${index * 90}ms` }"
        >
          <div class="advantage-card__head">
            <div class="advantage-card__icon" aria-hidden="true">
              <Icon :icon="iconNames[index]" />
            </div>
            <span v-if="item.highlight" class="advantage-card__stat">
              {{ item.highlight }}
            </span>
          </div>
          <h3 class="advantage-card__title">
            {{ item.title }}
          </h3>
          <p class="advantage-card__description">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.advantages {
  position: relative;
  padding: functions.rem(100) 0 functions.rem(96);
  background: var(--c-section-dark);
  overflow: hidden;
  isolation: isolate;
  color: var(--c-grey-00);

  @include media.md-down {
    padding: functions.rem(64) 0;
  }

  &__aurora {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  // darken edges so the bento cards stay readable over the aurora
  &__veil {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      radial-gradient(ellipse 90% 60% at 50% 45%, transparent 0%, rgba(var(--c-black-rgb), 0.55) 100%),
      linear-gradient(180deg, var(--c-section-dark) 0%, transparent 18%, transparent 82%, var(--c-section-dark) 100%);
  }

  &__inner {
    position: relative;
    z-index: 2;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: functions.rem(20);
    max-width: var(--w-container);
    margin: 0 auto;

    @include media.lg-down {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include media.sm-down {
      grid-template-columns: 1fr;
      gap: functions.rem(16);
    }
  }
}

.advantage-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: functions.rem(200);
  padding: functions.rem(28);
  border-radius: functions.rem(24);
  background: var(--c-section-card);
  border: 1px solid rgba(var(--c-white-rgb), 0.10);
  box-shadow: 0 24px 80px rgba(var(--c-black-rgb), 0.4);
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(28px);
  animation: advantagesCardFade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(var(--c-violet-strong-rgb), 0.42);
    box-shadow: 0 28px 90px rgba(var(--c-black-rgb), 0.5);
  }

  &--wide {
    grid-column: span 2;

    @include media.sm-down {
      grid-column: span 1;
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: functions.rem(16);
    margin-bottom: functions.rem(20);
  }

  &__icon {
    position: relative;
    flex-shrink: 0;
    width: functions.rem(52);
    height: functions.rem(52);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--c-violet-300);
    isolation: isolate;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(var(--c-violet-rgb), 0.55);
      clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
      z-index: -2;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 1px;
      background: var(--c-section-card);
      clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
      z-index: -1;
    }

    svg {
      width: functions.rem(24);
      height: functions.rem(24);
      stroke-width: 1.5;
    }
  }

  &__stat {
    font-family: var(--f-section-title);
    font-size: functions.rem(40);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--c-violet-400);
    text-shadow: 0 0 32px rgba(var(--c-violet-rgb), 0.5);

    @include media.sm-down {
      font-size: functions.rem(32);
    }
  }

  &__title {
    font-family: var(--f-base, inherit);
    font-size: functions.rem(20);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--c-grey-00);
    margin: 0 0 functions.rem(10);
  }

  &__description {
    font-size: functions.rem(14);
    line-height: 1.55;
    color: rgba(var(--c-white-rgb), 0.62);
    margin: 0;
  }

  &--wide &__title {
    font-size: functions.rem(22);
  }

  &--wide &__stat {
    font-size: functions.rem(48);

    @include media.sm-down {
      font-size: functions.rem(36);
    }
  }
}

@keyframes advantagesCardFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .advantage-card {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .advantage-card:hover {
    transform: none;
  }
}
</style>
