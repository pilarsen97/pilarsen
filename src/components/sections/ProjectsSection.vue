<script setup lang="ts">
import type { Language, ProjectItem } from '@/composables/usePortfolio';
import Project3DCard from '@/components/Project3DCard.vue';
import { projectsData } from '@/composables/usePortfolio';

interface Props {
  currentLang: Language;
}

defineProps<Props>();

function handleShowDetails(project: ProjectItem) {
  console.log('Show details for:', project.name);
  // TODO: Implement details modal or navigation
}
</script>

<template>
  <section class="projects">
    <h2 class="projects__title">
      {{ projectsData.title[currentLang] }}
    </h2>
    <div class="projects__grid">
      <div
        v-for="(project, index) in projectsData.items"
        :key="project.name"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="200 * index"
      >
        <Project3DCard
          :project="project"
          :current-lang="currentLang"
          @show-details="handleShowDetails"
        />
      </div>
    </div>
  </section>
</template>
