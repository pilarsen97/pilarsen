<script setup lang="ts">
import ShinyText from '@/components/ui/ShinyText.vue';

interface Props {
  eyebrow?: string;
  title?: string;
  titleLead?: string;
  titleAccent?: string;
  titleTrail?: string;
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <header class="section-header">
    <div v-if="eyebrow" class="section-header__eyebrow">
      <ShinyText :text="eyebrow" :speed="5" />
    </div>
    <h2 class="section-header__title">
      <template v-if="titleAccent">
        <span v-if="titleLead" class="section-header__word" :style="{ '--i': 0 }">{{ titleLead }}</span>
        <span class="section-header__word section-header__title-accent" :style="{ '--i': 1 }">{{ titleAccent }}</span>
        <span v-if="titleTrail" class="section-header__word section-header__title-trail" :style="{ '--i': 2 }">{{ titleTrail }}</span>
      </template>
      <template v-else>
        {{ title }}
      </template>
    </h2>
    <p v-if="description" class="section-header__description">
      {{ description }}
    </p>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

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
        rgba(var(--c-violet-strong-rgb), 0.9) 50%,
        transparent 100%
      );
      box-shadow: 0 0 12px rgba(var(--c-violet-strong-rgb), 0.55);
    }
  }

  &__title {
    font-family: var(--f-section-title);
    font-size: functions.rem(56);
    line-height: 1.05;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--c-grey-00);
    margin: 0 0 functions.rem(24);

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

  &__word {
    display: inline-block;
    animation: sectionWordReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--i) * 0.12s + 0.1s);

    & + & {
      margin-inline-start: 0.25em;
    }
  }

  &__title-accent {
    background: linear-gradient(
      100deg,
      var(--c-violet-400) 0%,
      var(--c-violet-600) 25%,
      var(--c-violet-300) 50%,
      var(--c-violet-500) 75%,
      var(--c-violet-400) 100%
    );
    background-size: 220% auto;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 36px rgba(var(--c-violet-rgb), 0.45);
    animation:
      sectionWordReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both,
      sectionAccentGradient 6s linear infinite;
    animation-delay: calc(var(--i) * 0.12s + 0.1s);
  }

  &__description {
    font-size: functions.rem(20);
    line-height: 1.55;
    max-width: functions.rem(720);
    margin: 0 auto;
    color: rgba(var(--c-white-rgb), 0.68);
    opacity: 0;
    transform: translateY(16px);
    animation: sectionHeaderFadeUp 0.8s 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;

    @include media.sm-down {
      font-size: functions.rem(16);
    }
  }
}

@keyframes sectionWordReveal {
  from {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes sectionAccentGradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 220% 50%; }
}

@keyframes sectionHeaderFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header__word,
  .section-header__title-accent {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
  }

  .section-header__description {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
