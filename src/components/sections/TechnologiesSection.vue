<script setup lang="ts">
import FlipCard from '@/components/FlipCard.vue';
import PatternBackground from '@/components/PatternBackground.vue';
import { techData } from '@/composables/usePortfolio';
import type { Language } from '@/composables/usePortfolio';

interface Props {
  currentLang: Language;
}

defineProps<Props>();
</script>

<template>
  <PatternBackground class="technologies pattern-background--animated">
    <div class="container">
      <h2 class="technologies__title">
        {{ techData.title[currentLang] }}
      </h2>
      <div class="technologies__grid">
        <FlipCard
          v-for="(tech, index) in techData.items"
          :key="tech.name"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1 }"
          :delay="100 * index"
          :front-icon="tech.icon"
          :front-title="tech.name"
          :back-title="tech.name"
          :back-description="tech.description[currentLang]"
        />
      </div>
    </div>
  </PatternBackground>
</template>