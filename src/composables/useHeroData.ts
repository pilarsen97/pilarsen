/**
 * useHeroData Composable
 * Hero section data with automatic localization
 */

import type { LocalizedText } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

interface SocialLink {
  name: string;
  url: string;
  icon?: string;
  customIcon?: boolean;
}

interface HeroData {
  greeting: LocalizedText;
  description: LocalizedText;
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
};

const socialLinks: SocialLink[] = [
  { name: 'Telegram', url: 'https://t.me/pilarsen', icon: 'simple-icons:telegram' },
  { name: 'VK', url: 'https://vk.com/pilarsen', icon: 'simple-icons:vk' },
  { name: 'MAX', url: 'https://max.ru/pilarsen', customIcon: true },
  { name: 'Instagram', url: 'https://instagram.com/pilarsen', icon: 'simple-icons:instagram' },
  { name: 'Phone', url: 'tel:+79000000000', icon: 'lucide:phone' },
];

export function useHeroData() {
  const { localize, currentLang } = useLanguage();

  return {
    // Localized computed properties (auto-update on language change)
    greeting: computed(() => localize(data.greeting)),
    description: computed(() => localize(data.description)),

    // Social links
    socialLinks,

    // Current language (for conditional rendering if needed)
    currentLang,

    // Raw data (for advanced use cases)
    raw: data,
  };
}
