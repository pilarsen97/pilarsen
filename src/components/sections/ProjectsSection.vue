<script setup lang="ts">
import type { LocalizedProject, ProjectCategory } from '@/types/portfolio';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useProjectsData } from '@/composables';

const {
  sectionLabel,
  titleParts,
  description,
  stats,
  filters,
  sortLabel,
  viewAllLabel,
  items,
} = useProjectsData();

const activeFilter = ref<'all' | ProjectCategory>('all');

const visibleItems = computed<LocalizedProject[]>(() =>
  activeFilter.value === 'all'
    ? items.value
    : items.value.filter(item => item.category === activeFilter.value),
);

function setFilter(id: 'all' | ProjectCategory) {
  activeFilter.value = id;
}
</script>

<template>
  <section class="projects">
    <header class="projects__header">
      <div class="projects__intro">
        <div class="projects__badge">
          <span class="projects__badge-dot" />
          {{ sectionLabel }}
        </div>
        <h2 class="projects__title">
          {{ titleParts.lead }}
          <span class="projects__title-accent">{{ titleParts.accent }}</span>
        </h2>
        <p class="projects__description">
          {{ description }}
        </p>
      </div>

      <div class="projects__stats">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="projects__stat"
        >
          <div class="projects__stat-icon">
            <Icon :icon="stat.icon" />
          </div>
          <div class="projects__stat-value">
            {{ stat.value }}
          </div>
          <div class="projects__stat-label">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </header>

    <div class="projects__toolbar">
      <div class="projects__filters">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          class="projects__filter"
          :class="{ 'projects__filter--active': activeFilter === filter.id }"
          @click="setFilter(filter.id)"
        >
          {{ filter.label }}
        </button>
      </div>
      <button type="button" class="projects__sort">
        <span>{{ sortLabel }}</span>
        <Icon icon="lucide:arrow-down" />
      </button>
    </div>

    <div class="projects__grid">
      <article
        v-for="project in visibleItems"
        :key="project.name"
        class="project-card"
      >
        <div class="project-card__media">
          <div
            v-if="project.image"
            class="project-card__ambient"
            :style="{ backgroundImage: `url(${project.image})` }"
            aria-hidden="true"
          />
          <div v-if="project.image" class="project-card__image" :style="{ backgroundImage: `url(${project.image})` }" />
          <div v-else class="project-card__image project-card__image--empty">
            <span class="project-card__image-icon">{{ project.logo }}</span>
          </div>
        </div>
        <div class="project-card__body">
          <div class="project-card__category">
            {{ project.categoryLabel }}
          </div>
          <h3 class="project-card__title">
            {{ project.name }}
          </h3>
          <p class="project-card__description">
            {{ project.description }}
          </p>
          <div class="project-card__footer">
            <div class="project-card__tags">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="project-card__tag"
              >
                {{ tag }}
              </span>
            </div>
            <a
              :href="project.detailsLink || '#'"
              class="project-card__action"
              :aria-label="project.name"
              target="_blank"
              rel="noopener"
            >
              <Icon icon="lucide:arrow-right" />
            </a>
          </div>
        </div>
      </article>
    </div>

    <div class="projects__cta">
      <button type="button" class="projects__cta-button">
        <span class="projects__cta-dots">
          <span /><span /><span />
          <span /><span /><span />
        </span>
        <span>{{ viewAllLabel }}</span>
        <span class="projects__cta-arrow">
          <Icon icon="lucide:arrow-right" />
        </span>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

@property --neon-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes neon-spin {
  to { --neon-angle: 360deg; }
}

.projects {
  position: relative;
  width: min(1500px, calc(100% - 30px));
  margin-inline: auto;
  padding: 80px 0 96px;
  color: var(--c-grey-00);

  &__header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 40px;

    @include media.lg-up {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
      gap: 48px;
      align-items: stretch;
    }
  }

  &__intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    align-self: flex-start;
    padding: 8px 16px;
    border: 1px solid rgba(var(--c-violet-strong-rgb), 0.45);
    border-radius: 999px;
    background: rgba(var(--c-violet-rgb), 0.08);
    color: var(--c-grey-00);
    font-size: functions.rem(12);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--c-violet-400);
    box-shadow: 0 0 12px rgba(var(--c-violet-strong-rgb), 0.7);
  }

  &__title {
    font-family: var(--f-section-title);
    font-weight: 700;
    font-size: functions.rem(40);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--c-grey-00);
    margin: 0;

    @include media.md-up {
      font-size: functions.rem(48);
    }

    @include media.xl-up {
      font-size: functions.rem(56);
    }
  }

  &__title-accent {
    display: block;
    background: linear-gradient(120deg, var(--c-violet-400), var(--c-indigo-500));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  &__description {
    color: var(--c-grey-40);
    font-size: functions.rem(16);
    line-height: 1.5;
    max-width: 520px;
    margin: 0;
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    padding: 28px;
    border-radius: 24px;
    border: 1px solid var(--c-overlay-border);
    background: linear-gradient(140deg, rgba(var(--c-white-rgb), 0.04), rgba(var(--c-white-rgb), 0.015));
    backdrop-filter: blur(18px);

    @include media.md-up {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 24px;
      padding: 32px;
    }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__stat-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(var(--c-violet-rgb), 0.16);
    color: var(--c-violet-300);
    font-size: functions.rem(22);
    margin-bottom: 4px;
  }

  &__stat-value {
    font-family: var(--f-headings);
    font-weight: 700;
    font-size: functions.rem(30);
    color: var(--c-grey-00);
    line-height: 1;
  }

  &__stat-label {
    color: var(--c-grey-50);
    font-size: functions.rem(13);
    line-height: 1.35;
  }

  &__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__filter {
    appearance: none;
    border: 1px solid transparent;
    background: rgba(var(--c-white-rgb), 0.04);
    color: var(--c-grey-30);
    padding: 10px 18px;
    border-radius: 999px;
    font-size: functions.rem(14);
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

    &:hover {
      background: rgba(var(--c-white-rgb), 0.08);
      color: var(--c-grey-00);
    }

    &--active {
      background: linear-gradient(135deg, var(--c-violet-600), var(--c-indigo-600));
      color: var(--c-grey-00);
      border-color: rgba(var(--c-violet-strong-rgb), 0.6);
      box-shadow: 0 8px 24px rgba(var(--c-violet-rgb), 0.35);

      &:hover {
        color: var(--c-grey-00);
      }
    }
  }

  &__sort {
    appearance: none;
    background: transparent;
    border: none;
    color: var(--c-grey-30);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: functions.rem(14);
    cursor: pointer;
    padding: 8px 4px;
    transition: color 0.2s ease;

    &:hover {
      color: var(--c-grey-00);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 24px;

    @include media.sm-up {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include media.lg-up {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @include media.xl-up {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  &__cta {
    display: flex;
    justify-content: center;
    margin-top: 48px;
  }

  &__cta-button {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 16px 24px;
    border-radius: 999px;
    border: 1px solid var(--c-overlay-border);
    background: rgba(var(--c-white-rgb), 0.04);
    color: var(--c-grey-00);
    font-size: functions.rem(15);
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

    &:hover {
      background: rgba(var(--c-white-rgb), 0.07);
      border-color: rgba(var(--c-violet-strong-rgb), 0.5);
      transform: translateY(-1px);
    }
  }

  &__cta-dots {
    display: grid;
    grid-template-columns: repeat(3, 4px);
    grid-template-rows: repeat(2, 4px);
    gap: 3px;

    span {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--c-violet-400);
    }
  }

  &__cta-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--c-violet-600), var(--c-indigo-600));
    font-size: functions.rem(14);
  }
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1px;
  background: linear-gradient(160deg, rgba(var(--c-white-rgb), 0.045), rgba(var(--c-white-rgb), 0.015));
  border: 1px solid rgba(var(--c-violet-strong-rgb), 0.12);
  border-radius: 18px;
  overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  backdrop-filter: blur(14px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    border-radius: inherit;
    padding: 1px;
    background: conic-gradient(
      from var(--neon-angle, 0deg),
      transparent 0deg,
      rgba(186, 130, 255, 0.4) 60deg,
      rgba(186, 130, 255, 0.05) 120deg,
      transparent 180deg,
      rgba(186, 130, 255, 0.25) 240deg,
      transparent 360deg
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    animation: neon-spin 16s linear infinite;
    pointer-events: none;
  }

  &:nth-child(4n + 1)::before { animation-delay: -1.7s; animation-duration: 18s; }
  &:nth-child(4n + 2)::before { animation-delay: -6.4s; animation-duration: 14s; }
  &:nth-child(4n + 3)::before { animation-delay: -10.2s; animation-duration: 19s; }
  &:nth-child(4n)::before     { animation-delay: -3.8s; animation-duration: 15s; }

  &:hover {
    border-color: rgba(var(--c-violet-strong-rgb), 0.25);
    transform: translateY(-4px);
    box-shadow: 0 24px 60px rgba(var(--c-black-rgb), 0.4), 0 0 32px rgba(var(--c-violet-rgb), 0.18);
  }

  &__media {
    position: relative;
    aspect-ratio: 16 / 10;
    border-radius: 17px 17px 0 0;
    background: linear-gradient(135deg, rgba(var(--c-violet-rgb), 0.18), rgba(var(--c-indigo-rgb), 0.1));
  }

  &__image {
    position: absolute;
    inset: 0;
    z-index: 2;
    background-size: cover;
    background-position: center;
    border-radius: inherit;
    overflow: hidden;
    -webkit-mask: linear-gradient(to bottom, #000 95%, transparent 100%);
            mask: linear-gradient(to bottom, #000 95%, transparent 100%);

    &--empty {
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(circle at 30% 20%, rgba(var(--c-violet-strong-rgb), 0.28), transparent 60%),
        radial-gradient(circle at 80% 80%, rgba(var(--c-indigo-rgb), 0.25), transparent 55%),
        rgba(var(--c-black-rgb), 0.35);
    }
  }

  &__image-icon {
    font-size: functions.rem(56);
    opacity: 0.55;
  }

  &__ambient {
    position: absolute;
    left: 0;
    right: 0;
    top: 92%;
    height: 30%;
    z-index: 1;
    background-size: 120% auto;
    background-position: center bottom;
    filter: blur(18px) saturate(1.2);
    opacity: 0.6;
    -webkit-mask: linear-gradient(to bottom, #000 0%, transparent 100%);
            mask: linear-gradient(to bottom, #000 0%, transparent 100%);
    pointer-events: none;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 22px 20px;
    flex: 1;
  }

  &__category {
    font-size: functions.rem(12);
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--c-violet-300);
  }

  &__title {
    font-family: var(--f-headings);
    font-size: functions.rem(20);
    font-weight: 700;
    color: var(--c-grey-00);
    margin: 0;
    line-height: 1.25;
  }

  &__description {
    color: var(--c-grey-40);
    font-size: functions.rem(14);
    line-height: 1.5;
    margin: 0;
    flex: 1;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 8px;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &__tag {
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid rgba(var(--c-violet-strong-rgb), 0.25);
    background: rgba(var(--c-violet-rgb), 0.08);
    color: var(--c-grey-20);
    font-size: functions.rem(12);
    font-weight: 500;
    white-space: nowrap;
  }

  &__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid rgba(var(--c-violet-strong-rgb), 0.55);
    color: var(--c-grey-00);
    font-size: functions.rem(16);
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(var(--c-violet-rgb), 0.18);
      border-color: var(--c-violet-400);
      transform: translateX(2px);
    }
  }
}
</style>
