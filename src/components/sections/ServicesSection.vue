<script setup lang="ts">
import FlipCard from '@/components/FlipCard.vue';
import PatternBackground from '@/components/PatternBackground.vue';
import { useServicesData } from '@/composables';

const { title, items, currentLang } = useServicesData();
</script>

<template>
  <PatternBackground class="services pattern-background--animated">
    <div class="container">
      <h2 class="services__title">
        {{ title }}
      </h2>
      <div class="services__grid">
        <FlipCard
          v-for="(service, index) in items"
          :key="service.name"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1 }"
          :delay="100 * index"
          :front-icon="service.icon"
          :front-title="service.name"
          :front-subtitle="service.tagline"
          :back-title="service.name"
          :back-subtitle="service.tagline"
          :back-description="service.description"
          :features="service.features"
          :lang="currentLang"
        />
      </div>
    </div>
  </PatternBackground>
</template>
