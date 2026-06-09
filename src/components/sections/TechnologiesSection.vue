<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { IconCloud } from '@/components/ui/icon-cloud';
import SectionHeader from '@/components/ui/SectionHeader.vue';
import { useTechData } from '@/composables';

const { eyebrow, titleLead, titleAccent, description, items, currentLang } = useTechData();

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
  <section class="technologies">
    <div class="technologies__bg" aria-hidden="true" />
    <div class="technologies__lines" aria-hidden="true" />
    <div class="technologies__glow technologies__glow--a" aria-hidden="true" />
    <div class="technologies__glow technologies__glow--b" aria-hidden="true" />

    <div class="container technologies__inner">
      <SectionHeader
        :eyebrow="eyebrow"
        :title-lead="titleLead"
        :title-accent="titleAccent"
        :description="description"
      />

      <!-- Icon Cloud (centered visual) -->
      <div class="technologies__cloud">
        <IconCloud
          :images="imageUrls"
          :size="320"
        />
      </div>

      <!-- Tech Grid with hover descriptions -->
      <div class="technologies__grid">
        <article
          v-for="(tech, index) in items"
          :key="tech.name"
          class="tech-card"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <div class="tech-card__icon">
            <Icon :icon="tech.icon" />
          </div>
          <span class="tech-card__name">{{ tech.name }}</span>
          <div class="tech-card__overlay">
            <p class="tech-card__description">
              {{ tech.description }}
            </p>
          </div>
        </article>
      </div>

      <p class="technologies__footer">
        {{ footerText }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.technologies {
  position: relative;
  padding: functions.rem(120) 0 functions.rem(80);
  background: var(--c-section-dark);
  overflow: hidden;
  isolation: isolate;
  color: var(--c-grey-00);

  @include media.md-down {
    padding: functions.rem(72) 0 functions.rem(48);
  }

  &__bg {
    position: absolute;
    inset: 0;
    z-index: -3;
    background:
      radial-gradient(circle at 50% 25%, rgba(var(--c-violet-rgb), 0.16), transparent 40%),
      radial-gradient(circle at 50% 78%, rgba(var(--c-indigo-rgb), 0.14), transparent 46%),
      var(--c-section-dark);
  }

  // animated blueprint mesh — distinct from the dotted / aurora neighbours
  &__lines {
    position: absolute;
    inset: -60px 0;
    z-index: -2;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(var(--c-violet-strong-rgb), 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(var(--c-violet-strong-rgb), 0.07) 1px, transparent 1px);
    background-size: 54px 54px;
    mask-image: radial-gradient(ellipse 78% 68% at 50% 42%, var(--c-black) 28%, transparent 86%);
    animation: technologiesGridDrift 26s linear infinite;
  }

  &__glow {
    position: absolute;
    z-index: -1;
    width: functions.rem(620);
    height: functions.rem(620);
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.55;
    pointer-events: none;
    animation: technologiesGlow 16s ease-in-out infinite;

    &--a {
      top: functions.rem(120);
      right: 4%;
      background: radial-gradient(circle, rgba(var(--c-violet-rgb), 0.40), transparent 70%);
    }

    &--b {
      bottom: functions.rem(40);
      left: 6%;
      background: radial-gradient(circle, rgba(var(--c-indigo-rgb), 0.34), transparent 70%);
      animation-delay: -8s;
    }
  }

  &__inner {
    position: relative;
    z-index: 1;
  }

  &__cloud {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto functions.rem(48);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: functions.rem(12);
    max-width: functions.rem(880);
    margin: 0 auto;

    @include media.md-down {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @include media.sm-down {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__footer {
    text-align: center;
    margin-top: functions.rem(40);
    font-size: functions.rem(14);
    color: rgba(var(--c-white-rgb), 0.45);
  }
}

.tech-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: functions.rem(10);
  padding: functions.rem(14) functions.rem(16);
  min-height: functions.rem(58);
  background: rgba(var(--c-white-rgb), 0.03);
  border-radius: functions.rem(16);
  border: 1px solid rgba(var(--c-white-rgb), 0.08);
  cursor: default;
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease, box-shadow 0.28s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: technologiesCardFade 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;

  &:hover {
    background: rgba(var(--c-white-rgb), 0.06);
    border-color: rgba(var(--c-violet-strong-rgb), 0.42);
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(var(--c-black-rgb), 0.45);

    .tech-card__overlay {
      opacity: 1;
      visibility: visible;
    }
  }

  &__icon {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: functions.rem(34);
    height: functions.rem(34);
    border-radius: functions.rem(10);
    background: linear-gradient(135deg, rgba(var(--c-indigo-rgb), 0.28) 0%, rgba(var(--c-violet-rgb), 0.28) 100%);
    border: 1px solid rgba(var(--c-violet-strong-rgb), 0.22);
    color: var(--c-violet-300);
    transition: color 0.28s ease;

    svg {
      width: functions.rem(18);
      height: functions.rem(18);
    }

    .tech-card:hover & {
      color: var(--c-grey-00);
    }
  }

  &__name {
    font-weight: 600;
    color: var(--c-grey-10);
    font-size: functions.rem(14);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    padding: functions.rem(14) functions.rem(16);
    background: linear-gradient(135deg, var(--c-surface-overlay) 0%, var(--c-surface-dark-hover) 100%);
    backdrop-filter: blur(6px);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.28s ease, visibility 0.28s ease;
    z-index: 2;
  }

  &__description {
    margin: 0;
    font-size: functions.rem(12);
    line-height: 1.45;
    color: rgba(var(--c-white-rgb), 0.82);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@keyframes technologiesCardFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes technologiesGlow {
  0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.5; }
  50% { transform: translate3d(0, -20px, 0); opacity: 0.8; }
}

@keyframes technologiesGridDrift {
  from { background-position: 0 0, 0 0; }
  to { background-position: 54px 54px, 54px 54px; }
}

@media (prefers-reduced-motion: reduce) {
  .tech-card {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .technologies__glow,
  .technologies__lines {
    animation: none;
  }

  .tech-card:hover {
    transform: none;
  }
}
</style>
