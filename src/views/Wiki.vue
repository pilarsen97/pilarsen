<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useWikiData } from '@/composables/useWikiData';

const { pageTitle, pageSubtitle, backText, categories } = useWikiData();
</script>

<template>
  <div class="wiki-page">
    <div class="container">
      <nav class="wiki-page__nav">
        <AppButton variant="ghost" to="/">
          <Icon icon="lucide:arrow-left" />
          {{ backText }}
        </AppButton>
      </nav>

      <header class="wiki-page__header">
        <h1 class="wiki-page__title">
          {{ pageTitle }}
        </h1>
        <p class="wiki-page__subtitle">
          {{ pageSubtitle }}
        </p>
      </header>

      <div class="wiki-page__categories">
        <section v-for="category in categories" :key="category.slug" class="wiki-cat">
          <header class="wiki-cat__header">
            <Icon v-if="category.icon" :icon="category.icon" class="wiki-cat__icon" />
            <div>
              <h2 class="wiki-cat__title">
                {{ category.title }}
              </h2>
              <p v-if="category.description" class="wiki-cat__desc">
                {{ category.description }}
              </p>
            </div>
          </header>

          <ul class="wiki-cat__list">
            <li v-for="article in category.articles" :key="article.slug" class="wiki-cat__item">
              <router-link
                :to="`/wiki/${article.category}/${article.slug}`"
                class="wiki-card"
              >
                <h3 class="wiki-card__title">
                  {{ article.title }}
                  <Icon icon="lucide:arrow-right" class="wiki-card__arrow" />
                </h3>
                <p v-if="article.subtitle" class="wiki-card__subtitle">
                  {{ article.subtitle }}
                </p>
                <p v-if="article.intro" class="wiki-card__intro">
                  {{ article.intro }}
                </p>
              </router-link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.wiki-page {
  min-height: 100vh;
  padding: functions.rem(32) 0 functions.rem(80);
  background: var(--c-grey-100);
  color: var(--c-grey-20);

  @include media.md-down {
    padding: functions.rem(20) 0 functions.rem(48);
  }

  &__nav {
    margin-bottom: functions.rem(32);
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

    @include media.md-down {
      font-size: functions.rem(16);
    }
  }

  &__categories {
    display: flex;
    flex-direction: column;
    gap: functions.rem(48);
  }
}

.wiki-cat {
  &__header {
    display: flex;
    align-items: flex-start;
    gap: functions.rem(16);
    margin-bottom: functions.rem(20);
    padding-bottom: functions.rem(16);
    border-bottom: 1px solid var(--c-grey-90);
  }

  &__icon {
    font-size: functions.rem(32);
    color: var(--c-primary);
    flex-shrink: 0;
  }

  &__title {
    font-size: functions.rem(24);
    font-weight: 700;
    color: var(--c-grey-00);
    margin-bottom: functions.rem(4);
  }

  &__desc {
    color: var(--c-grey-50);
    font-size: functions.rem(14);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: functions.rem(16);
  }
}

.wiki-card {
  display: block;
  padding: functions.rem(20);
  background: rgba(var(--c-white-rgb), 0.02);
  border: 1px solid var(--c-grey-90);
  border-radius: functions.rem(12);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, transform 0.2s, background 0.2s;

  &:hover {
    border-color: var(--c-primary);
    background: rgba(var(--c-white-rgb), 0.04);
    transform: translateY(-2px);

    .wiki-card__arrow { transform: translateX(4px); color: var(--c-primary); }
  }

  &__title {
    display: flex;
    align-items: center;
    gap: functions.rem(8);
    font-size: functions.rem(18);
    font-weight: 600;
    color: var(--c-grey-00);
    margin-bottom: functions.rem(8);
  }

  &__arrow {
    transition: transform 0.2s, color 0.2s;
    color: var(--c-grey-50);
  }

  &__subtitle {
    color: var(--c-grey-40);
    font-size: functions.rem(13);
    margin-bottom: functions.rem(8);
  }

  &__intro {
    color: var(--c-grey-50);
    font-size: functions.rem(13);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
