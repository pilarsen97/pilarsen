<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import HeroSection from '@/components/sections/HeroSection.vue';

// Lazy load non-critical sections for better performance
const AdvantagesSection = defineAsyncComponent(() => import('@/components/sections/AdvantagesSection.vue'));
const ProjectsSection = defineAsyncComponent(() => import('@/components/sections/ProjectsSection.vue'));
const ServicesSection = defineAsyncComponent(() => import('@/components/sections/ServicesSection.vue'));
const TeamsSection = defineAsyncComponent(() => import('@/components/sections/TeamsSection.vue'));
const TechnologiesSection = defineAsyncComponent(() => import('@/components/sections/TechnologiesSection.vue'));
const VortexBackground = defineAsyncComponent(() => import('@/components/VortexBackground.vue'));
const WorksSection = defineAsyncComponent(() => import('@/components/sections/WorksSection.vue'));
</script>

<template>
  <div>
    <HeroSection />

    <Suspense>
      <ServicesSection />
      <template #fallback>
        <div class="loading-section">
          <div class="loading-spinner" />
        </div>
      </template>
    </Suspense>

    <Suspense>
      <TechnologiesSection />
      <template #fallback>
        <div class="loading-section">
          <div class="loading-spinner" />
        </div>
      </template>
    </Suspense>

    <Suspense>
      <AdvantagesSection />
      <template #fallback>
        <div class="loading-section">
          <div class="loading-spinner" />
        </div>
      </template>
    </Suspense>

    <Suspense>
      <WorksSection />
      <template #fallback>
        <div class="loading-section">
          <div class="loading-spinner" />
        </div>
      </template>
    </Suspense>

    <Suspense>
      <VortexBackground class="app-background">
        <!-- Projects and Teams sections -->
        <div class="container">
          <ProjectsSection />
          <TeamsSection />
        </div>
      </VortexBackground>
      <template #fallback>
        <div class="loading-section">
          <div class="loading-spinner" />
          <p>Loading interactive content...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.app-background {
  min-height: 100vh;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  min-height: 200px;
  color: var(--c-grey-20);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid var(--c-grey-20);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .loading-section {
    padding: 2rem 0;
    min-height: 150px;
  }
}
</style>
