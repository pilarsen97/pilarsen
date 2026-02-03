/**
 * useLanguage Composable
 * Centralized language state management with singleton pattern
 */

import type { Language, LocalizedText } from '@/types/portfolio';
import { computed, ref } from 'vue';

// Singleton state - shared across all components
const currentLang = ref<Language>('ru');

export function useLanguage() {
  /**
   * Toggle between Russian and English
   */
  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru';
  };

  /**
   * Set specific language
   */
  const setLanguage = (lang: Language) => {
    currentLang.value = lang;
  };

  /**
   * Get localized text based on current language
   * @example localize({ ru: 'Привет', en: 'Hello' }) // Returns 'Привет' or 'Hello'
   */
  const localize = <T extends LocalizedText>(text: T): string => {
    return text[currentLang.value];
  };

  /**
   * Create a computed ref for localized text (reactive)
   * @example const greeting = localizedComputed({ ru: 'Привет', en: 'Hello' })
   */
  const localizedComputed = <T extends LocalizedText>(text: T) => {
    return computed(() => text[currentLang.value]);
  };

  return {
    // State (readonly computed to prevent direct mutation)
    currentLang: computed(() => currentLang.value),

    // Actions
    toggleLanguage,
    setLanguage,

    // Utilities
    localize,
    localizedComputed,

    // Convenience getters
    isRussian: computed(() => currentLang.value === 'ru'),
    isEnglish: computed(() => currentLang.value === 'en'),
  };
}
