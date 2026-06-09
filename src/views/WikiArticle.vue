<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppButton from '@/components/ui/AppButton.vue';
import WikiTree from '@/components/wiki/WikiTree.vue';
import { useWikiData } from '@/composables/useWikiData';

const route = useRoute();
const { findArticle, findCategory, backToWikiText, localize } = useWikiData();

const article = computed(() =>
  findArticle(String(route.params.category), String(route.params.slug)),
);

const category = computed(() =>
  article.value ? findCategory(article.value.category) : null,
);
</script>

<template>
  <div class="wiki-article">
    <div class="container">
      <nav class="wiki-article__nav">
        <AppButton variant="ghost" to="/wiki">
          <Icon icon="lucide:arrow-left" />
          {{ backToWikiText }}
        </AppButton>
      </nav>

      <template v-if="article && category">
        <header class="wiki-article__header">
          <span class="wiki-article__category">
            <Icon v-if="category.icon" :icon="category.icon" />
            {{ localize(category.title) }}
          </span>
          <h1 class="wiki-article__title">
            {{ localize(article.title) }}
          </h1>
          <p v-if="article.subtitle" class="wiki-article__subtitle">
            {{ localize(article.subtitle) }}
          </p>
          <p v-if="article.intro" class="wiki-article__intro">
            {{ localize(article.intro) }}
          </p>
        </header>

        <article class="wiki-article__content">
          <template v-for="(block, idx) in article.blocks" :key="idx">
            <h2
              v-if="block.kind === 'heading' && (block.level ?? 2) === 2"
              class="wiki-article__h2"
            >
              {{ localize(block.text) }}
            </h2>
            <h3
              v-else-if="block.kind === 'heading' && block.level === 3"
              class="wiki-article__h3"
            >
              {{ localize(block.text) }}
            </h3>

            <p v-else-if="block.kind === 'paragraph'" class="wiki-article__p">
              {{ localize(block.text) }}
            </p>

            <WikiTree v-else-if="block.kind === 'tree'" :sections="block.sections" />

            <aside
              v-else-if="block.kind === 'callout'"
              class="wiki-callout"
              :class="`wiki-callout--${block.tone ?? 'info'}`"
            >
              <h4 v-if="block.title" class="wiki-callout__title">
                {{ localize(block.title) }}
              </h4>
              <p class="wiki-callout__text">
                {{ localize(block.text) }}
              </p>
            </aside>
          </template>
        </article>
      </template>

      <div v-else class="wiki-article__not-found">
        <h1>404</h1>
        <p>Article not found</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.wiki-article {
  min-height: 100vh;
  padding: functions.rem(32) 0 functions.rem(80);
  background: var(--c-grey-100);
  color: var(--c-grey-20);

  @include media.md-down {
    padding: functions.rem(20) 0 functions.rem(48);
  }

  &__nav {
    margin-bottom: functions.rem(24);
  }

  &__header {
    max-width: functions.rem(860);
    margin: 0 auto functions.rem(40);
  }

  &__category {
    display: inline-flex;
    align-items: center;
    gap: functions.rem(6);
    color: var(--c-primary);
    font-size: functions.rem(13);
    font-weight: 500;
    margin-bottom: functions.rem(12);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__title {
    font-size: functions.rem(36);
    font-weight: 700;
    color: var(--c-grey-00);
    margin-bottom: functions.rem(12);
    line-height: 1.2;

    @include media.md-down {
      font-size: functions.rem(28);
    }
  }

  &__subtitle {
    color: var(--c-grey-40);
    font-size: functions.rem(15);
    margin-bottom: functions.rem(16);
  }

  &__intro {
    color: var(--c-grey-30);
    font-size: functions.rem(16);
    line-height: 1.6;
  }

  &__content {
    max-width: functions.rem(860);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: functions.rem(20);
  }

  &__h2 {
    font-size: functions.rem(22);
    font-weight: 700;
    color: var(--c-grey-00);
    margin-top: functions.rem(16);
  }

  &__h3 {
    font-size: functions.rem(18);
    font-weight: 600;
    color: var(--c-grey-10);
    margin-top: functions.rem(8);
  }

  &__p {
    color: var(--c-grey-30);
    font-size: functions.rem(15);
    line-height: 1.6;
  }

  &__not-found {
    text-align: center;
    padding: functions.rem(80) 0;
    color: var(--c-grey-50);
  }
}

.wiki-callout {
  padding: functions.rem(16) functions.rem(20);
  border-radius: functions.rem(8);
  border-left: 3px solid var(--c-primary);
  background: rgba(var(--c-white-rgb), 0.03);

  &--info { border-left-color: var(--c-status-info); }
  &--warning { border-left-color: var(--c-status-warning); }
  &--tip { border-left-color: var(--c-primary); }

  &__title {
    font-size: functions.rem(14);
    font-weight: 700;
    color: var(--c-grey-00);
    margin-bottom: functions.rem(6);
  }

  &__text {
    color: var(--c-grey-30);
    font-size: functions.rem(14);
    line-height: 1.6;
  }
}
</style>
