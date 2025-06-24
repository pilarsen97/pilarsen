<script setup lang="ts">
import type { Language } from '@/composables/usePortfolio';

interface Props {
  currentLang: Language;
}

interface Emits {
  (e: 'toggle'): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="lang-toggle">
    <button class="lang-btn" @click="$emit('toggle')">
      {{ currentLang === 'ru' ? 'EN' : 'RU' }}
    </button>
  </div>
</template>
