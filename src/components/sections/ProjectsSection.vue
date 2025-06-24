<script setup lang="ts">
import { projectsData } from '@/composables/usePortfolio';
import type { Language } from '@/composables/usePortfolio';

interface Props {
  currentLang: Language;
}

defineProps<Props>();
</script>

<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="projects__title">
        {{ projectsData.title[currentLang] }}
      </h2>
      <div class="projects__grid">
        <div
          v-for="(project, index) in projectsData.items"
          :key="project.name"
          v-motion
          class="project-card"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="200 * index"
        >
          <h3 class="project-card__title">
            {{ project.name }}
          </h3>
          <p class="project-card__description">
            {{ project.description[currentLang] }}
          </p>
          <div class="project-card__tags">
            <span v-for="tag in project.tags" :key="tag" class="project-card__tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>