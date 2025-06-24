<script setup lang="ts">
import { onMounted } from 'vue';
import LanguageToggle from '@/components/LanguageToggle.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';
import ServicesSection from '@/components/sections/ServicesSection.vue';
import TeamsSection from '@/components/sections/TeamsSection.vue';
import VortexBackground from '@/components/VortexBackground.vue';
// import TechnologiesSection from '@/components/sections/TechnologiesSection.vue';
import { usePortfolio } from '@/composables/usePortfolio';

const {
  currentLang,
  isDark,
  toggleLanguage,
  pageTitle,
} = usePortfolio();

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
      <ServicesSection :current-lang="currentLang" />
      <!-- <TechnologiesSection :current-lang="currentLang" /> -->
      <VortexBackground class="app-background">
        <!-- Projects and Teams sections -->
        <div class="container">
          <ProjectsSection :current-lang="currentLang" />

          <!-- Spacer between sections -->
          <div class="section-spacer" />

          <TeamsSection :current-lang="currentLang" />
        </div>
      </VortexBackground>
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

@media (max-width: 768px) {
  .section-spacer {
    height: 4rem;
  }
}
</style>
