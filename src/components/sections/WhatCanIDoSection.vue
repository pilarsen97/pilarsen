<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useWhatCanIDoData } from '@/composables';

const {
  eyebrow,
  titleLead,
  titleAccent,
  description,
  more,
  ctaText,
  ctaLabel,
  services,
  benefits,
} = useWhatCanIDoData();
</script>

<template>
  <section class="what-can-i-do" aria-labelledby="what-can-i-do-title">
    <div class="what-can-i-do__bg" aria-hidden="true" />
    <div class="what-can-i-do__glow what-can-i-do__glow--a" aria-hidden="true" />
    <div class="what-can-i-do__glow what-can-i-do__glow--b" aria-hidden="true" />

    <div class="container what-can-i-do__inner">
      <header class="section-header">
        <div class="section-header__eyebrow">
          {{ eyebrow }}
        </div>
        <h2 id="what-can-i-do-title" class="section-header__title">
          {{ titleLead }}
          <span class="section-header__title-accent">{{ titleAccent }}</span>
        </h2>
        <p class="section-header__description">
          {{ description }}
        </p>
      </header>

      <div class="services-grid">
        <article
          v-for="(service, index) in services"
          :key="service.icon"
          class="service-card"
          :style="{ animationDelay: `${index * 110}ms` }"
        >
          <div class="service-card__icon">
            <Icon :icon="service.icon" />
          </div>
          <h3 class="service-card__title">
            {{ service.title }}
          </h3>
          <p class="service-card__description">
            {{ service.description }}
          </p>
          <ul class="service-card__list">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="service-card__item"
            >
              <span class="service-card__dot" aria-hidden="true" />
              {{ feature }}
            </li>
          </ul>
          <a
            :href="`#service-${index}`"
            class="service-card__link"
            :aria-label="`${more}: ${service.title}`"
          >
            <Icon icon="lucide:arrow-right" />
          </a>
        </article>
      </div>

      <div class="benefits-panel">
        <div
          v-for="(benefit, index) in benefits"
          :key="benefit.icon"
          class="benefit-item"
          :style="{ animationDelay: `${index * 80 + 200}ms` }"
        >
          <div class="benefit-item__icon" aria-hidden="true">
            <Icon :icon="benefit.icon" />
          </div>
          <div class="benefit-item__body">
            <h4 class="benefit-item__title">
              {{ benefit.title }}
            </h4>
            <p class="benefit-item__text">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="what-can-i-do__cta">
        <p class="what-can-i-do__cta-text">
          {{ ctaText }}
        </p>
        <AppButton variant="primary" size="lg" to="/services">
          <Icon icon="lucide:layout-grid" />
          {{ ctaLabel }}
          <Icon icon="lucide:arrow-right" />
        </AppButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

// Section-scoped aliases pointing at global tokens (kept for readability within the section)
:where(.what-can-i-do) {
  --section-bg: var(--c-section-dark);
  --section-bg-card: var(--c-section-card);
  --section-fg: var(--c-grey-00);
  --section-fg-rgb: var(--c-white-rgb);
  --section-fg-muted: rgba(var(--section-fg-rgb), 0.68);
  --section-fg-soft: rgba(var(--section-fg-rgb), 0.48);

  // Brighter violet accent (vivid than --c-violet-500)
  --section-accent: var(--c-violet-bright);
  --section-accent-rgb: var(--c-violet-bright-rgb);
  --section-accent-border-rgb: var(--c-violet-bright-border-rgb);
}

.what-can-i-do {
  position: relative;
  padding: functions.rem(120) 0 functions.rem(80);
  background: var(--section-bg);
  overflow: hidden;
  isolation: isolate;
  color: var(--section-fg);

  @include media.md-down {
    padding: functions.rem(72) 0 functions.rem(48);
  }

  &__bg {
    position: absolute;
    inset: 0;
    z-index: -2;
    background:
      radial-gradient(circle at 50% 40%, rgba(var(--c-violet-rgb), 0.18), transparent 36%),
      radial-gradient(circle at 50% 65%, rgba(var(--c-indigo-rgb), 0.16), transparent 42%),
      radial-gradient(circle at 1px 1px, rgba(var(--c-violet-strong-rgb), 0.08) 1px, transparent 0),
      var(--section-bg);
    background-size: auto, auto, 22px 22px, auto;
  }

  &__glow {
    position: absolute;
    z-index: -1;
    width: functions.rem(640);
    height: functions.rem(640);
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.6;
    pointer-events: none;
    animation: floatGlow 14s ease-in-out infinite;

    &--a {
      top: functions.rem(280);
      left: 8%;
      background: radial-gradient(circle, rgba(var(--c-violet-rgb), 0.42), transparent 70%);
    }

    &--b {
      bottom: functions.rem(40);
      right: 6%;
      background: radial-gradient(circle, rgba(var(--c-violet-rgb), 0.32), transparent 70%);
      animation-delay: -7s;
    }
  }

  &__inner {
    position: relative;
    z-index: 1;
  }
}

.section-header {
  text-align: center;
  max-width: functions.rem(960);
  margin: 0 auto functions.rem(64);

  @include media.md-down {
    margin-bottom: functions.rem(40);
  }

  &__eyebrow {
    position: relative;
    display: inline-block;
    padding-bottom: functions.rem(10);
    color: rgba(var(--c-white-rgb), 0.78);
    font-size: functions.rem(12);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: functions.rem(2);
    margin-bottom: functions.rem(32);

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(var(--section-accent-rgb), 0.9) 50%,
        transparent 100%
      );
      box-shadow: 0 0 12px rgba(var(--section-accent-rgb), 0.55);
    }
  }

  &__title {
    font-family: var(--f-section-title);
    font-size: functions.rem(56);
    line-height: 1.05;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--section-fg);
    margin: 0 0 functions.rem(24);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s 0.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;

    @include media.lg-down {
      font-size: functions.rem(40);
    }

    @include media.md-down {
      font-size: functions.rem(32);
    }

    @include media.sm-down {
      font-size: functions.rem(26);
    }
  }

  &__title-accent {
    color: var(--c-violet-500);
    text-shadow: 0 0 32px rgba(var(--c-violet-rgb), 0.55);
  }

  &__description {
    font-size: functions.rem(20);
    line-height: 1.55;
    max-width: functions.rem(720);
    margin: 0 auto;
    color: var(--section-fg-muted);
    opacity: 0;
    transform: translateY(16px);
    animation: fadeUp 0.8s 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;

    @include media.sm-down {
      font-size: functions.rem(16);
    }
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: functions.rem(20);
  margin: 0 auto functions.rem(48);
  max-width: var(--w-container);

  @include media.lg-down {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include media.sm-down {
    grid-template-columns: 1fr;
    gap: functions.rem(16);
  }
}

.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: functions.rem(440);
  padding: functions.rem(28) functions.rem(28) functions.rem(96);
  border-radius: functions.rem(24);
  background: var(--section-bg-card);
  border: 1px solid rgba(var(--c-white-rgb), 0.10);
  box-shadow: 0 24px 80px rgba(var(--c-black-rgb), 0.45);
  transition: transform 280ms ease, border-color 280ms ease, box-shadow 280ms ease;
  overflow: hidden;
  isolation: isolate;
  opacity: 0;
  transform: translateY(28px);
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  color: var(--section-fg);
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(var(--section-accent-border-rgb), 0.42);
    box-shadow: 0 24px 80px rgba(var(--c-black-rgb), 0.5);
  }

  @include media.sm-down {
    min-height: auto;
    padding: functions.rem(28);
    border-radius: functions.rem(28);
  }

  &__icon {
    position: absolute;
    bottom: -5%;
    left: -5%;
    width: 70%;
    aspect-ratio: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(var(--section-accent-rgb), 0.05);
    pointer-events: none;
    z-index: 0;

    svg {
      width: 100%;
      height: 100%;
      stroke-width: 1;
    }
  }

  &__title {
    font-family: var(--f-base, inherit);
    font-size: functions.rem(22);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--c-grey-00);
    text-shadow: 0 0 20px rgba(var(--c-white-rgb), 0.14);
    margin: 0;
    position: relative;
    z-index: 1;
  }

  &__description {
    font-size: functions.rem(14);
    line-height: 1.55;
    color: rgba(var(--c-white-rgb), 0.62);
    white-space: pre-line;
    margin: functions.rem(12) 0 0;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: functions.rem(24) 0 0;
    display: flex;
    flex-direction: column;
    gap: functions.rem(12);
  }

  &__item {
    display: flex;
    align-items: center;
    gap: functions.rem(10);
    font-size: functions.rem(14);
    color: rgba(var(--c-white-rgb), 0.72);
  }

  &__dot {
    width: functions.rem(6);
    height: functions.rem(6);
    border-radius: 50%;
    background: var(--section-accent);
    flex-shrink: 0;
    box-shadow: 0 0 12px rgba(var(--section-accent-rgb), 0.7);
  }

  &__link {
    position: absolute;
    right: functions.rem(24);
    bottom: functions.rem(24);
    width: functions.rem(48);
    height: functions.rem(48);
    border-radius: 50%;
    background: rgba(var(--c-white-rgb), 0.03);
    border: 1px solid rgba(var(--section-accent-border-rgb), 0.6);
    color: rgba(var(--c-white-rgb), 0.92);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 280ms ease, transform 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
    text-decoration: none;

    svg {
      width: functions.rem(20);
      height: functions.rem(20);
      transition: transform 280ms ease;
    }

    &:hover,
    &:focus-visible {
      background: rgba(var(--section-accent-rgb), 0.18);
      border-color: rgba(var(--section-accent-border-rgb), 0.9);
      transform: translateY(-4px);
      box-shadow: 0 0 36px rgba(var(--section-accent-rgb), 0.45);
      outline: none;

      svg {
        transform: translateX(4px);
      }
    }
  }
}

.benefits-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: functions.rem(32);
  padding: functions.rem(28) functions.rem(40);
  border-radius: functions.rem(28);
  background: var(--c-surface-panel);
  border: 1px solid var(--c-overlay-strong);
  backdrop-filter: blur(12px);

  @include media.lg-down {
    grid-template-columns: repeat(2, 1fr);
    gap: functions.rem(24);
    padding: functions.rem(24) functions.rem(28);
  }

  @include media.sm-down {
    grid-template-columns: 1fr;
    padding: functions.rem(20);
    gap: functions.rem(20);
  }
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: functions.rem(16);
  opacity: 0;
  transform: translateY(16px);
  animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;

  &__icon {
    position: relative;
    flex-shrink: 0;
    width: functions.rem(48);
    height: functions.rem(48);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--c-violet-400);
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
      background: var(--section-bg-card);
      clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
      z-index: -1;
    }

    svg {
      width: functions.rem(22);
      height: functions.rem(22);
      stroke-width: 1.5;
    }
  }

  &__body {
    min-width: 0;
  }

  &__title {
    font-family: var(--f-headings, inherit);
    font-size: functions.rem(15);
    font-weight: 600;
    color: var(--section-fg);
    margin: 0 0 functions.rem(4);
  }

  &__text {
    font-size: functions.rem(13);
    line-height: 1.5;
    color: var(--section-fg-soft);
    margin: 0;
  }
}

.what-can-i-do__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: functions.rem(16);
  margin-top: functions.rem(48);
  text-align: center;

  &-text {
    font-size: functions.rem(15);
    color: var(--section-fg-muted);
    margin: 0;
  }
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatGlow {
  0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.55; }
  50% { transform: translate3d(0, -18px, 0); opacity: 0.85; }
}

@media (prefers-reduced-motion: reduce) {
  .section-header__title,
  .section-header__description,
  .service-card,
  .benefit-item {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .what-can-i-do__glow {
    animation: none;
  }

  .service-card:hover {
    transform: none;
  }
}
</style>
