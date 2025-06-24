<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import LanguageToggle from '@/components/LanguageToggle.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
// import TechnologiesSection from '@/components/sections/TechnologiesSection.vue';
import { usePortfolio } from '@/composables/usePortfolio';
import { useSEO } from '@/composables/useSEO';

// Lazy load non-critical sections for better performance
const ProjectsSection = defineAsyncComponent(() => import('@/components/sections/ProjectsSection.vue'));
const ServicesSection = defineAsyncComponent(() => import('@/components/sections/ServicesSection.vue'));
const TeamsSection = defineAsyncComponent(() => import('@/components/sections/TeamsSection.vue'));
const VortexBackground = defineAsyncComponent(() => import('@/components/VortexBackground.vue'));

const {
  currentLang,
  isDark,
  toggleLanguage,
  pageTitle,
} = usePortfolio();

// Initialize SEO optimization
useSEO(currentLang);

onMounted(() => {
  // Apply dark theme to document
  document.documentElement.classList.toggle('dark', isDark.value);

  // Set page title and meta
  document.title = pageTitle.value;
});
</script>

<template>
  <div class="app" :class="{ 'dark-theme': isDark }">
    <LanguageToggle
      :current-lang="currentLang"
      @toggle="toggleLanguage"
    />

    <main class="main">
      <HeroSection :current-lang="currentLang" />

      <Suspense>
        <ServicesSection :current-lang="currentLang" />
        <template #fallback>
          <div class="loading-section">
            <div class="loading-spinner" />
          </div>
        </template>
      </Suspense>

      <!-- <TechnologiesSection :current-lang="currentLang" /> -->

      <Suspense>
        <VortexBackground class="app-background">
          <!-- Projects and Teams sections -->
          <div class="container">
            <ProjectsSection :current-lang="currentLang" />

            <!-- Spacer between sections -->
            <div class="section-spacer" />

            <TeamsSection :current-lang="currentLang" />
          </div>
        </VortexBackground>
        <template #fallback>
          <div class="loading-section">
            <div class="loading-spinner" />
            <p>Loading interactive content...</p>
          </div>
        </template>
      </Suspense>
    </main>
  </div>
</template>

<style scoped>
.app-background {
  min-height: 100vh;
}

.section-spacer {
  height: 6rem;
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
  .section-spacer {
    height: 4rem;
  }

  .loading-section {
    padding: 2rem 0;
    min-height: 150px;
  }
}
</style>
