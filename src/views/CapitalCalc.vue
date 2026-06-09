<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import CapitalCalculator from '@/components/services/CapitalCalculator.vue';
import { useLanguage } from '@/composables';

const { isRussian } = useLanguage();
const isRu = isRussian;

const t = computed(() => isRu.value
  ? {
      back: 'Все сервисы',
      kicker: 'capital.calc',
      live: 'работает',
      title: 'Калькулятор капитала',
      subtitle: 'Модель роста капитала и пассивного дохода: реинвестирование под заданную ставку, индексация доходов и расходов, инфляция и крупные разовые траты.',
    }
  : {
      back: 'All services',
      kicker: 'capital.calc',
      live: 'live',
      title: 'Capital calculator',
      subtitle: 'A model of capital and passive-income growth: reinvestment at a chosen rate, indexed income and expenses, inflation and large one-time outlays.',
    },
);
</script>

<template>
  <div class="calc-screen instrument">
    <div class="container calc-screen__inner">
      <div class="calc-screen__top">
        <RouterLink to="/services" class="backlink">
          <span class="backlink__arrow" aria-hidden="true">←</span>
          {{ t.back }}
        </RouterLink>
        <span class="calc-screen__meta">RUB ₽ · v1.0</span>
      </div>

      <header class="masthead">
        <div class="masthead__kicker">
          <span class="masthead__code">{{ t.kicker }}</span>
          <span class="masthead__live">
            <span class="masthead__dot" aria-hidden="true" />
            {{ t.live }}
          </span>
        </div>
        <h1 class="masthead__title">
          {{ t.title }}
        </h1>
        <p class="masthead__lead">
          {{ t.subtitle }}
        </p>
      </header>

      <CapitalCalculator />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.calc-screen {
  min-height: 100vh;
  padding: 28px 0 96px;
  background: var(--cap-paper);
  color: var(--cap-ink);

  @include media.md-down {
    padding: 20px 0 56px;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 28px;
  }

  &__meta {
    font-family: var(--cap-mono);
    font-size: functions.rem(11);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--cap-ink-3);

    @include media.xs-down {
      display: none;
    }
  }
}

.backlink {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cap-mono);
  font-size: functions.rem(12);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--cap-ink-2);
  text-decoration: none;
  transition: color 0.16s ease;

  &__arrow {
    transition: transform 0.16s ease;
  }

  &:hover {
    color: var(--cap-red);

    .backlink__arrow {
      transform: translateX(-3px);
    }
  }
}

.masthead {
  max-width: 60ch;
  margin-bottom: 36px;

  @include media.md-down {
    margin-bottom: 28px;
  }

  &__kicker {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
  }

  &__code {
    font-family: var(--cap-mono);
    font-size: functions.rem(12);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cap-red);
  }

  &__live {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--cap-mono);
    font-size: functions.rem(11);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--cap-ink-3);
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cap-red);
    animation: capLive 2.4s ease-in-out infinite;
  }

  &__title {
    font-family: var(--cap-display);
    font-weight: 600;
    font-size: clamp(34px, 6vw, 56px);
    line-height: 1;
    letter-spacing: -0.025em;
    color: var(--cap-ink);
    margin: 0 0 16px;
  }

  &__lead {
    font-size: functions.rem(16);
    line-height: 1.6;
    color: var(--cap-ink-2);
    margin: 0;

    @include media.sm-down {
      font-size: functions.rem(14.5);
    }
  }
}

@keyframes capLive {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

@media (prefers-reduced-motion: reduce) {
  .masthead__dot {
    animation: none;
  }
}
</style>
