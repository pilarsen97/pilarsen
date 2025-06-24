<script setup lang="ts">
import { onMounted } from 'vue';
import LanguageToggle from '@/components/LanguageToggle.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import ProjectsWorksSection from '@/components/sections/ProjectsWorksSection.vue';
import ServicesSection from '@/components/sections/ServicesSection.vue';
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
      <ProjectsWorksSection :current-lang="currentLang" />
    </main>
  </div>
</template>
