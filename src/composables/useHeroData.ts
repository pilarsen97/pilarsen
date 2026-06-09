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

interface CtaLink {
  label: LocalizedText;
  url: string;
  external?: boolean;
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
    ru: 'Создаю цифровые продукты — от идеи до запуска. В IT с 2012.',
    en: 'I build digital products — from idea to launch. In IT since 2012.',
  },
};

// Primary actions (hybrid: clients → discuss, HR → CV).
const ctaPrimary: CtaLink = {
  label: { ru: 'Обсудить проект', en: 'Discuss a project' },
  url: 'https://t.me/pilarsen',
  external: true,
};

const ctaSecondary: CtaLink = {
  label: { ru: 'Скачать CV', en: 'Download CV' },
  url: '/cv-arsen.pdf',
  external: true,
};

const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/pilarsen97', icon: 'simple-icons:github' },
  { name: 'Telegram', url: 'https://t.me/pilarsen', icon: 'simple-icons:telegram' },
  { name: 'VK', url: 'https://vk.com/pilarsen', icon: 'simple-icons:vk' },
  { name: 'MAX', url: 'https://max.ru/u/f9LHodD0cOIgi8ReTXs_hh9sgGfawFv3oHHducwb7iueyhUrqyoDpTdWWDo', customIcon: true },
  { name: 'Phone', url: 'tel:+79093929129', icon: 'lucide:phone' },
];

export function useHeroData() {
  const { localize, currentLang } = useLanguage();

  return {
    // Localized computed properties (auto-update on language change)
    greeting: computed(() => localize(data.greeting)),
    description: computed(() => localize(data.description)),

    // Calls to action
    ctaPrimary: computed(() => ({ ...ctaPrimary, label: localize(ctaPrimary.label) })),
    ctaSecondary: computed(() => ({ ...ctaSecondary, label: localize(ctaSecondary.label) })),

    // Social links
    socialLinks,

    // Current language (for conditional rendering if needed)
    currentLang,

    // Raw data (for advanced use cases)
    raw: data,
  };
}
