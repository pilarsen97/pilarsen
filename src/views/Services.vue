<script setup lang="ts">
import type { ServiceApp } from '@/types/services';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useLanguage } from '@/composables';

const { isRussian, localize } = useLanguage();
const isRu = isRussian;

const t = computed(() => isRu.value
  ? {
      back: 'На главную',
      index: 'Указатель',
      title: 'Сервисы',
      subtitle: 'Небольшие веб-инструменты, которые решают конкретные задачи. Открыты для всех и бесплатны.',
      active: 'активен',
      planned: 'в планах',
    }
  : {
      back: 'Home',
      index: 'Directory',
      title: 'Services',
      subtitle: 'Small web tools that solve concrete problems. Open to everyone and free to use.',
      active: 'active',
      planned: 'planned',
    },
);

const apps = computed<ServiceApp[]>(() => [
  {
    slug: 'capital-calc',
    icon: '',
    to: '/services/capital-calc',
    status: 'live',
    title: { ru: 'Калькулятор капитала', en: 'Capital calculator' },
    tag: { ru: 'Финансы', en: 'Finance' },
    description: {
      ru: 'Рост капитала и пассивного дохода: ставка, инфляция, крупные траты.',
      en: 'Capital and passive-income growth: rate, inflation, large expenses.',
    },
  },
  {
    slug: 'mortgage',
    icon: '',
    status: 'soon',
    title: { ru: 'Ипотечный калькулятор', en: 'Mortgage calculator' },
    tag: { ru: 'Финансы', en: 'Finance' },
    description: {
      ru: 'Платежи, переплата и график погашения.',
      en: 'Payments, overpayment and amortization schedule.',
    },
  },
  {
    slug: 'deposit',
    icon: '',
    status: 'soon',
    title: { ru: 'Калькулятор вкладов', en: 'Deposit calculator' },
    tag: { ru: 'Финансы', en: 'Finance' },
    description: {
      ru: 'Сравнение вкладов с капитализацией и пополнениями.',
      en: 'Compare deposits with compounding and top-ups.',
    },
  },
  {
    slug: 'budget',
    icon: '',
    status: 'soon',
    title: { ru: 'Личный бюджет', en: 'Personal budget' },
    tag: { ru: 'Продуктивность', en: 'Productivity' },
    description: {
      ru: 'Планирование доходов и расходов по категориям.',
      en: 'Plan income and expenses by category.',
    },
  },
]);

function num(i: number): string {
  return String(i + 1).padStart(2, '0');
}
</script>

<template>
  <div class="dir instrument">
    <div class="container dir__inner">
      <div class="dir__top">
        <RouterLink to="/" class="backlink">
          <span class="backlink__arrow" aria-hidden="true">←</span>
          {{ t.back }}
        </RouterLink>
        <span class="dir__meta">{{ t.index }} · {{ apps.length }}</span>
      </div>

      <header class="dir__head">
        <h1 class="dir__title">
          {{ t.title }}
        </h1>
        <p class="dir__lead">
          {{ t.subtitle }}
        </p>
      </header>

      <ul class="dir__list">
        <li v-for="(app, i) in apps" :key="app.slug">
          <component
            :is="app.to ? 'router-link' : 'div'"
            :to="app.to"
            class="entry"
            :class="app.status === 'live' ? 'entry--live' : 'entry--soon'"
          >
            <span class="entry__num">{{ num(i) }}</span>

            <div class="entry__body">
              <h2 class="entry__name">
                {{ localize(app.title) }}
              </h2>
              <p class="entry__meta">
                <span v-if="app.tag" class="entry__tag">{{ localize(app.tag) }}</span>
                <span v-if="app.tag" class="entry__sep" aria-hidden="true">·</span>
                {{ localize(app.description) }}
              </p>
            </div>

            <div class="entry__status">
              <span
                class="status"
                :class="app.status === 'live' ? 'status--live' : 'status--soon'"
              >
                <span v-if="app.status === 'live'" class="status__dot" aria-hidden="true" />
                {{ app.status === 'live' ? t.active : t.planned }}
              </span>
              <span v-if="app.to" class="entry__arrow" aria-hidden="true">→</span>
            </div>
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.dir {
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
    padding-bottom: 56px;

    @include media.md-down {
      padding-bottom: 36px;
    }
  }

  &__meta {
    font-family: var(--cap-mono);
    font-size: functions.rem(11);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cap-ink-3);

    @include media.md-down {
      display: none;
    }
  }

  &__head {
    max-width: 56ch;
    margin-bottom: 48px;

    @include media.md-down {
      margin-bottom: 32px;
    }
  }

  &__title {
    font-family: var(--cap-display);
    font-weight: 600;
    font-size: clamp(44px, 8vw, 84px);
    line-height: 0.94;
    letter-spacing: -0.03em;
    color: var(--cap-ink);
    margin: 0 0 18px;
  }

  &__lead {
    font-size: functions.rem(17);
    line-height: 1.6;
    color: var(--cap-ink-2);
    margin: 0;

    @include media.sm-down {
      font-size: functions.rem(15);
    }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--cap-rule-strong);
  }
}

.entry {
  display: grid;
  grid-template-columns: functions.rem(64) 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 28px 8px;
  border-bottom: 1px solid var(--cap-rule);
  text-decoration: none;
  color: inherit;
  position: relative;

  @include media.sm-down {
    grid-template-columns: functions.rem(40) 1fr;
    gap: 16px;
    padding: 22px 4px;
  }

  &__num {
    font-family: var(--cap-mono);
    font-size: functions.rem(13);
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--cap-ink-3);
    transition: color 0.18s ease;
  }

  &__body {
    min-width: 0;
  }

  &__name {
    font-family: var(--cap-display);
    font-weight: 600;
    font-size: clamp(20px, 3.2vw, 30px);
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--cap-ink);
    margin: 0 0 7px;
    transition: color 0.18s ease;
  }

  &__meta {
    font-size: functions.rem(14);
    line-height: 1.5;
    color: var(--cap-ink-3);
    margin: 0;
  }

  &__tag {
    font-family: var(--cap-mono);
    font-size: functions.rem(11.5);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--cap-ink-2);
  }

  &__sep {
    margin: 0 8px;
    color: var(--cap-rule-strong);
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-self: end;

    @include media.sm-down {
      grid-column: 2;
      justify-self: start;
      margin-top: 14px;
    }
  }

  &__arrow {
    font-size: functions.rem(20);
    color: var(--cap-ink-3);
    transition: transform 0.18s ease, color 0.18s ease;

    @include media.sm-down {
      display: none;
    }
  }

  // ---- live entry: interactive ----
  &--live {
    cursor: pointer;

    &:hover {
      .entry__num {
        color: var(--cap-red);
      }

      .entry__name {
        color: var(--cap-red);
      }

      .entry__arrow {
        transform: translateX(6px);
        color: var(--cap-red);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--cap-red);
      outline-offset: -2px;
    }
  }

  // ---- planned entry: muted ----
  &--soon {
    .entry__name {
      color: var(--cap-ink-2);
    }
  }
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--cap-mono);
  font-size: functions.rem(11);
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &--live {
    color: var(--cap-red);
  }

  &--soon {
    color: var(--cap-ink-3);
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cap-red);
    animation: capLive 2.4s ease-in-out infinite;
  }
}

@keyframes capLive {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

@media (prefers-reduced-motion: reduce) {
  .status__dot {
    animation: none;
  }
}
</style>
