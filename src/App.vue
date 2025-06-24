<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { seo } from '@/utils/seo';

const currentLang = ref<'ru' | 'en'>('ru');
const isDark = ref(false);

function toggleLanguage() {
  currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru';
}

function toggleTheme() {
  isDark.value = !isDark.value;
}

onMounted(() => {
  seo.setAll({
    title: 'Арсен - Веб-разработчик',
    description: 'Портфолио веб-разработчика Арсена. Создание современных веб-сайтов и приложений.',
    keywords: ['веб-разработчик', 'портфолио', 'арсен', 'сайты', 'разработка'],
    url: window.location.href,
    siteName: 'Арсен - Портфолио',
  });
});
</script>

<template>
  <div class="app" :class="{ 'dark-theme': isDark }">
    <!-- Language Toggle -->
    <div class="lang-toggle">
      <button @click="toggleLanguage" class="lang-btn">
        {{ currentLang === 'ru' ? 'EN' : 'RU' }}
      </button>
      <button @click="toggleTheme" class="theme-btn">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>

    <main class="main">
      <!-- Portfolio content will be added here -->
      <section class="hero">
        <div class="container">
          <h1 class="hero__title">
            {{ currentLang === 'ru' ? 'Портфолио в разработке' : 'Portfolio Under Development' }}
          </h1>
          <p class="hero__description">
            {{ currentLang === 'ru'
              ? 'Скоро здесь будет мое портфолио'
              : 'My portfolio will be here soon'
            }}
          </p>
        </div>
      </section>
    </main>
  </div>
</template>
