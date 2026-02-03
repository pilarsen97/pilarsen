/**
 * useHeroData Composable
 * Hero section data with automatic localization
 */

import type { LocalizedText } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

interface HeroData {
  greeting: LocalizedText;
  description: LocalizedText;
  viewWork: LocalizedText;
  contact: LocalizedText;
}

const data: HeroData = {
  greeting: {
    ru: 'Привет, я Арсен 👋',
    en: 'Hi, I\'m Arsen 👋',
  },
  description: {
    ru: 'Разрабатываю веб-сервисы, ботов, продвигаю сайты и обучаю детей. В IT с 2012',
    en: 'I develop web services, bots, promote websites and teach children. In IT since 2012',
  },
  viewWork: {
    ru: 'Посмотреть работы',
    en: 'View My Work',
  },
  contact: {
    ru: 'Связаться',
    en: 'Contact Me',
  },
};

export function useHeroData() {
  const { localize, currentLang } = useLanguage();

  return {
    // Localized computed properties (auto-update on language change)
    greeting: computed(() => localize(data.greeting)),
    description: computed(() => localize(data.description)),
    viewWorkText: computed(() => localize(data.viewWork)),
    contactText: computed(() => localize(data.contact)),

    // Current language (for conditional rendering if needed)
    currentLang,

    // Raw data (for advanced use cases)
    raw: data,
  };
}
