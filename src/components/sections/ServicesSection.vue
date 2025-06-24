<script setup lang="ts">
import FlipCard from '@/components/FlipCard.vue';
import PatternBackground from '@/components/PatternBackground.vue';
import { servicesData } from '@/composables/usePortfolio';
import type { Language } from '@/composables/usePortfolio';

interface Props {
  currentLang: Language;
}

defineProps<Props>();
</script>

<template>
  <PatternBackground class="services pattern-background--animated">
    <div class="container">
      <h2 class="services__title">
        {{ servicesData.title[currentLang] }}
      </h2>
      <div class="services__grid">
        <FlipCard
          v-for="(service, index) in servicesData.items"
          :key="service.name"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1 }"
          :delay="100 * index"
          :front-icon="service.icon"
          :front-title="service.name"
          :front-subtitle="service.tagline[currentLang]"
          :back-title="service.name"
          :back-description="service.description[currentLang]"
        />
      </div>
    </div>
  </PatternBackground>
</template>