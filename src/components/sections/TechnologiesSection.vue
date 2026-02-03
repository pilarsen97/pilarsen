<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import PatternBackground from '@/components/PatternBackground.vue';
import { IconCloud } from '@/components/ui/icon-cloud';
import { useTechData } from '@/composables';

const { title, subtitle, items, currentLang } = useTechData();

// SimpleIcons slugs for the cloud
const iconSlugs = [
  'wordpress',
  'vuedotjs',
  'nuxtdotjs',
  'laravel',
  'typescript',
  'php',
  'graphql',
  'telegram',
  'grafana',
  'gitlab',
  'openai',
  'docker',
  'tailwindcss',
  'sass',
  'postgresql',
  'mysql',
  'redis',
  'nodedotjs',
  'vite',
  'figma',
];

// Generate SimpleIcons URLs (white icons for dark background)
const imageUrls = computed(() =>
  iconSlugs.map(slug => `https://cdn.simpleicons.org/${slug}/ffffff`),
);

const footerText = computed(() =>
  currentLang.value === 'ru'
    ? 'и другие современные инструменты'
    : 'and other modern tools',
);
</script>

<template>
  <PatternBackground class="technologies pattern-background--animated">
    <div class="container">
      <div class="technologies__header">
        <h2 class="technologies__title">
          {{ title }}
        </h2>
        <p class="technologies__subtitle">
          {{ subtitle }}
        </p>
      </div>

      <div class="technologies__content">
        <!-- Icon Cloud -->
        <div class="technologies__cloud">
          <IconCloud
            :images="imageUrls"
            :size="400"
          />
        </div>

        <!-- Tech List -->
        <div class="technologies__list">
          <div
            v-for="tech in items"
            :key="tech.name"
            class="technologies__item"
          >
            <div class="technologies__item-header">
              <Icon :icon="tech.icon" class="technologies__item-icon" />
              <span class="technologies__item-name">{{ tech.name }}</span>
            </div>
            <span class="technologies__item-desc">{{ tech.description }}</span>
          </div>
        </div>
      </div>

      <p class="technologies__footer">
        {{ footerText }}
      </p>
    </div>
  </PatternBackground>
</template>

<style lang="scss" scoped>
.technologies {
  &__content {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 3rem;
    align-items: center;
    margin-top: 2rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }

  &__cloud {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: var(--b-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.1);
    }
  }

  &__item-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__item-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--c-grey-30);
    flex-shrink: 0;
  }

  &__item-name {
    font-weight: 600;
    color: var(--c-grey-10);
    font-size: 1rem;
  }

  &__item-desc {
    font-size: 0.875rem;
    color: var(--c-grey-40);
    line-height: 1.4;
  }

  &__footer {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.9rem;
    color: var(--c-grey-50);
    font-style: italic;
  }
}
</style>
