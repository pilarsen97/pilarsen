<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useWorksData } from '@/composables';

const { pageTitle, subtitle, backText, items } = useWorksData();
</script>

<template>
  <div class="works-page">
    <div class="container">
      <nav class="works-page__nav">
        <AppButton variant="ghost" to="/">
          <Icon icon="lucide:arrow-left" />
          {{ backText }}
        </AppButton>
      </nav>

      <header class="works-page__header">
        <h1 class="works-page__title">
          {{ pageTitle }}
        </h1>
        <p class="works-page__subtitle">
          {{ subtitle }}
        </p>
      </header>

      <div class="works-page__grid">
        <a
          v-for="(work, index) in items"
          :key="work.title"
          v-motion
          class="works-page__card work-card work-card--full"
          :href="work.link"
          target="_blank"
          rel="noopener noreferrer"
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 50, duration: 400 } }"
        >
          <div v-if="work.isAWStudio" class="work-card__badge">A&W</div>
          <div class="work-card__icon">
            <Icon :icon="work.icon || 'lucide:globe'" />
          </div>
          <div class="work-card__content">
            <h3 class="work-card__title">
              {{ work.title }}
              <Icon icon="heroicons:arrow-top-right-on-square" class="work-card__link-icon" />
            </h3>
            <p class="work-card__description">
              {{ work.description }}
            </p>
          </div>
          <div class="work-card__tags">
            <span v-for="tag in work.tags" :key="tag" class="work-card__tag">
              {{ tag }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/components/work-card';

.work-card--full {
  width: 100%;

  .work-card__description {
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    overflow: visible;
  }
}
</style>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.works-page {
  min-height: 100vh;
  padding: functions.rem(32) 0 functions.rem(80);
  background: var(--c-grey-100);

  @include media.md-down {
    padding: functions.rem(20) 0 functions.rem(48);
  }

  &__nav {
    margin-bottom: functions.rem(32);

    @include media.md-down {
      margin-bottom: functions.rem(20);
    }
  }

  &__header {
    text-align: center;
    margin-bottom: functions.rem(48);

    @include media.md-down {
      margin-bottom: functions.rem(32);
    }
  }

  &__title {
    font-size: functions.rem(42);
    font-weight: 700;
    color: var(--c-grey-00);
    margin-bottom: functions.rem(12);

    @include media.md-down {
      font-size: functions.rem(32);
    }
  }

  &__subtitle {
    font-size: functions.rem(18);
    color: var(--c-grey-40);
    margin: 0;

    @include media.md-down {
      font-size: functions.rem(16);
    }
  }

  &__grid {
    column-count: 4;
    column-gap: functions.rem(16);

    @include media.xl-down {
      column-count: 3;
    }

    @include media.md-down {
      column-count: 2;
    }

    @include media.sm-down {
      column-count: 1;
    }
  }

  &__card {
    break-inside: avoid;
    margin-bottom: functions.rem(16);
  }
}
</style>
