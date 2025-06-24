<script setup lang="ts">
import type { Language } from '@/composables/usePortfolio';
import { worksData } from '@/composables/usePortfolio';

interface Props {
  currentLang: Language;
}

defineProps<Props>();
</script>

<template>
  <section class="works">
    <h2 class="works__title">
      {{ worksData.title[currentLang] }}
    </h2>
    <div class="works__grid">
      <div
        v-for="(work, index) in worksData.items"
        :key="work.title"
        v-motion
        class="work-card"
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="200 * (index + 4)"
      >
        <h3 class="work-card__title">
          {{ work.title }}
        </h3>
        <p class="work-card__description">
          {{ work.description[currentLang] }}
        </p>
        <div class="work-card__tags">
          <span v-for="tag in work.tags" :key="tag" class="work-card__tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
