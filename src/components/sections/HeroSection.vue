<script setup lang="ts">
import { heroData } from '@/composables/usePortfolio';
import type { Language } from '@/composables/usePortfolio';

interface Props {
  currentLang: Language;
}

defineProps<Props>();
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero__content">
        <h1
          v-motion
          class="hero__title"
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="200"
        >
          {{ heroData.greeting[currentLang] }}
        </h1>
        <p
          v-motion
          class="hero__description"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="400"
        >
          {{ heroData.description[currentLang] }}
        </p>
        <div
          v-motion
          class="hero__actions"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="600"
        >
          <a href="#projects" class="button button--primary">
            {{ heroData.viewWork[currentLang] }}
          </a>
          <a href="#contact" class="button button--secondary">
            {{ heroData.contact[currentLang] }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>