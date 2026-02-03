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

      <!-- Icon Cloud (centered) -->
      <div class="technologies__cloud">
        <IconCloud
          :images="imageUrls"
          :size="320"
        />
      </div>

      <!-- Tech Grid with hover descriptions -->
      <div class="technologies__grid">
        <div
          v-for="tech in items"
          :key="tech.name"
          class="tech-card"
        >
          <Icon :icon="tech.icon" class="tech-card__icon" />
          <span class="tech-card__name">{{ tech.name }}</span>
          <div class="tech-card__tooltip">
            {{ tech.description }}
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
  &__cloud {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__footer {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.9rem;
    color: var(--c-grey-50);
    font-style: italic;
  }
}

.tech-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--b-radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: default;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);

    .tech-card__tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) scale(1);
    }
  }

  &__icon {
    width: 1.125rem;
    height: 1.125rem;
    color: var(--c-grey-30);
    flex-shrink: 0;
    transition: color 0.2s ease;

    .tech-card:hover & {
      color: var(--c-primary, #6366f1);
    }
  }

  &__name {
    font-weight: 500;
    color: var(--c-grey-10);
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__tooltip {
    position: fixed;
    top: 50%;
    left: 1rem;
    right: 1rem;
    transform: translateY(-50%) scale(0.95);
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem 1.25rem;
    background: rgba(30, 30, 40, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--b-radius-sm);
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--c-grey-10);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 100;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
}
</style>
