<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LanguageToggle from '@/components/LanguageToggle.vue';
import { useContactData, useLanguage, useSEO } from '@/composables';

const { currentLang, toggleLanguage } = useLanguage();
const { pageTitle } = useContactData();

// Dark theme state (always dark for this portfolio)
const isDark = ref(true);

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
      <router-view />
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
