/**
 * useServicesData Composable
 * Services section data with automatic localization
 */

import type { LocalizedService, ServiceItem } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

const data: ServiceItem[] = [
  {
    name: 'Разработка сайтов',
    tagline: {
      ru: 'Современные веб-решения',
      en: 'Modern web solutions',
    },
    icon: 'lucide:code-2',
    description: {
      ru: 'Создаю быстрые и красивые веб-сайты на WordPress/Laravel, Vue.js и Nuxt 3. От лендингов до сложных веб-приложений.',
      en: 'I create fast and beautiful websites with WordPress/Laravel, Vue.js and Nuxt 3. From landing pages to complex web applications.',
    },
    features: [
      { ru: 'Адаптивный дизайн', en: 'Responsive design' },
      { ru: 'Высокая производительность', en: 'High performance' },
      { ru: 'SEO-оптимизация', en: 'SEO optimization' },
      { ru: 'Современные технологии', en: 'Modern technologies' },
    ],
  },
  {
    name: 'SEO оптимизация',
    tagline: {
      ru: 'Помогаю сайтам быть выше в поиске',
      en: 'Helping websites rank higher',
    },
    icon: 'lucide:search-check',
    description: {
      ru: 'Помогаю сайтам попадать в топ поисковых систем и привлекать целевой трафик.',
      en: 'I help websites reach the top of search engines and attract targeted traffic.',
    },
    features: [
      { ru: 'Техническая оптимизация', en: 'Technical optimization' },
      { ru: 'Контент-стратегия', en: 'Content strategy' },
      { ru: 'Анализ конкурентов', en: 'Competitor analysis' },
      { ru: 'Отчеты и аналитика', en: 'Reports and analytics' },
    ],
  },
  {
    name: 'Telegram-боты',
    tagline: {
      ru: 'Боты для общения и автоматизации',
      en: 'Bots for communication and automation',
    },
    icon: 'lucide:bot',
    description: {
      ru: 'Создаю Telegram-ботов с регистрацией пользователей, приемом онлайн-платежей и продажей подписок.',
      en: 'I create Telegram bots with user registration, online payments and subscription sales.',
    },
    features: [
      { ru: 'Регистрация в базе данных', en: 'Database registration' },
      { ru: 'Прием онлайн-платежей', en: 'Online payment processing' },
      { ru: 'Продажа подписок', en: 'Subscription sales' },
      { ru: 'Сбор контактов клиентов', en: 'Customer contact collection' },
    ],
  },
  {
    name: 'Обучение детей IT',
    tagline: {
      ru: 'Будущее начинается сегодня',
      en: 'The future starts today',
    },
    icon: 'lucide:graduation-cap',
    description: {
      ru: 'Обучаю детей программированию и веб-разработке в понятной и увлекательной форме.',
      en: 'I teach children programming and web development in an understandable and engaging way.',
    },
    features: [
      { ru: 'Индивидуальный подход', en: 'Individual approach' },
      { ru: 'Практические проекты', en: 'Practical projects' },
      { ru: 'Современные методики', en: 'Modern methodologies' },
      { ru: 'Онлайн и офлайн занятия', en: 'Online and offline classes' },
    ],
  },
];

export function useServicesData() {
  const { localize, currentLang } = useLanguage();

  const title = computed(() =>
    currentLang.value === 'ru' ? 'Чем я могу помочь' : 'How I Can Help',
  );

  const items = computed<LocalizedService[]>(() =>
    data.map(service => ({
      name: service.name,
      tagline: localize(service.tagline),
      icon: service.icon,
      description: localize(service.description),
      features: service.features.map(f => localize(f)),
    })),
  );

  return {
    title,
    items,
    currentLang,
    raw: data,
  };
}
