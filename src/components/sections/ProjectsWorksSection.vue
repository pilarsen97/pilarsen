<script setup lang="ts">
import type { Language } from '@/composables/usePortfolio';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';
import WorksSection from '@/components/sections/WorksSection.vue';
import VortexBackground from '@/components/VortexBackground.vue';

interface Props {
  currentLang: Language;
}

defineProps<Props>();
</script>

<template>
  <VortexBackground id="projects-works" class="projects-works-section">
    <div class="container">
      <ProjectsSection :current-lang="currentLang" />

      <!-- Spacer between sections -->
      <div class="section-spacer" />

      <WorksSection :current-lang="currentLang" />
    </div>
  </VortexBackground>
</template>

<style lang="scss" scoped>
.projects-works-section {
  padding: 6rem 0;
  background: var(--c-grey-90);
  position: relative;
}

.section-spacer {
  height: 6rem;
}
</style>
