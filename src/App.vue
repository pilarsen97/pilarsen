<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AppButton, AppCard, AppInput, AppModal } from '@/components/ui';
import { seo } from '@/utils/seo';
import AppHeader from './components/Header.vue';

const currentLang = ref<'ru' | 'en'>('ru');
const isDark = ref(false);
const showModal = ref(false);
const inputValue = ref('');
const projectsCount = ref(150);
const experienceYears = ref(8);


function toggleLanguage() {
  currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru';
}

function toggleTheme() {
  isDark.value = !isDark.value;
}

onMounted(() => {
  seo.setAll({
    title: 'Vue 3 Starter Template',
    description: 'Professional Vue 3 + TypeScript + Vite starter template for modern web applications by Studio AW',
    keywords: ['vue', 'typescript', 'vite', 'starter', 'template', 'studio-aw'],
    url: window.location.href,
    siteName: 'Studio AW',
  });
});
</script>

<template>
  <div class="app" :class="{ 'dark-theme': isDark }">
    <AppHeader />
    <main class="main">
      <section class="hero">
        <div class="container">
          <h1 class="hero__title">
            {{ currentLang === 'ru' ? 'Цифровая студия A&W' : 'Digital Studio A&W' }}
          </h1>
          <p class="hero__description">
            {{ currentLang === 'ru'
              ? 'Создаем современные веб-решения с использованием Vue 3, TypeScript и передовых технологий'
              : 'Creating modern web solutions with Vue 3, TypeScript and cutting-edge technologies'
            }}
          </p>
          <div class="hero__actions">
            <AppButton variant="primary" @click="toggleLanguage">
              {{ currentLang === 'ru' ? 'EN' : 'RU' }}
            </AppButton>
            <AppButton variant="secondary" @click="toggleTheme">
              {{ isDark
                ? (currentLang === 'ru' ? 'Светлая тема' : 'Light theme')
                : (currentLang === 'ru' ? 'Темная тема' : 'Dark theme')
              }}
            </AppButton>
            <AppButton variant="outline-primary" @click="showModal = true">
              {{ currentLang === 'ru' ? 'Показать модал' : 'Show Modal' }}
            </AppButton>
          </div>

          <div class="hero__stats">
            <div class="stats">
              <div class="stats__item">
                <span class="stats__number">{{ projectsCount }}</span>
                <span class="stats__label">
                  {{ currentLang === 'ru' ? 'Проектов' : 'Projects' }}
                </span>
              </div>
              <div class="stats__item">
                <span class="stats__number">{{ experienceYears }}</span>
                <span class="stats__label">
                  {{ currentLang === 'ru' ? 'Лет опыта' : 'Years experience' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo">
        <div class="container">
          <h2>{{ currentLang === 'ru' ? 'Демо компонентов' : 'Component Demo' }}</h2>

          <div class="demo__grid">
            <AppCard
              :title="currentLang === 'ru' ? 'Карточка с тенью' : 'Card with Shadow'"
              :shadow="2"
              hover
            >
              <template #default>
                <p>{{ currentLang === 'ru' ? 'Пример использования карточки с hover эффектом' : 'Example card with hover effect' }}</p>
                <AppInput
                  v-model="inputValue"
                  :label="currentLang === 'ru' ? 'Введите текст' : 'Enter text'"
                  :placeholder="currentLang === 'ru' ? 'Ваш текст...' : 'Your text...'"
                />
              </template>
            </AppCard>
          </div>
        </div>
      </section>
    </main>

    <AppModal
      v-model="showModal"
      :title="currentLang === 'ru' ? 'Модальное окно' : 'Modal Window'"
    >
      <p>{{ currentLang === 'ru' ? 'Это пример модального окна из компонентной библиотеки.' : 'This is an example modal from the component library.' }}</p>
      <template #footer>
        <AppButton variant="ghost" @click="showModal = false">
          {{ currentLang === 'ru' ? 'Закрыть' : 'Close' }}
        </AppButton>
      </template>
    </AppModal>
  </div>
</template>
