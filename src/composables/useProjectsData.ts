/**
 * useProjectsData Composable
 * Projects section data with automatic localization
 */

import type { LocalizedProject, LocalizedText, ProjectCategory, ProjectItem } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

const categoryLabels: Record<ProjectCategory, LocalizedText> = {
  website: { ru: 'Веб-сайт', en: 'Website' },
  telegram: { ru: 'Telegram-бот', en: 'Telegram bot' },
  webapp: { ru: 'Веб-приложение', en: 'Web application' },
  service: { ru: 'Сервис', en: 'Service' },
  infra: { ru: 'Инфраструктура', en: 'Infrastructure' },
};

const data: ProjectItem[] = [
  {
    name: 'Агрегатор товаров с кешбеком',
    company: 'Собственный продукт',
    category: 'telegram',
    categoryLabel: categoryLabels.telegram,
    description: {
      ru: 'Telegram bot и mini app для товаров с кешбеком за отзывы. Поиск по маркетплейсам, рейтинг продавцов, автоматизация выплат.',
      en: 'Telegram bot and mini app for cashback products: marketplace search, seller ratings, automated payouts.',
    },
    logo: '💰',
    tags: ['Telegram API', 'Node.js', 'Vue.js'],
    isAWStudio: false,
  },
  {
    name: 'ITA',
    company: 'ita.gg',
    category: 'service',
    categoryLabel: categoryLabels.service,
    description: {
      ru: 'Системный интегратор полного цикла для компьютерных клубов: веб-платформа, интеграции с игровыми сервисами и система управления.',
      en: 'Full-cycle system integrator for computer clubs: web platform, gaming integrations and management system.',
    },
    logo: '🎮',
    tags: ['Vue.js', 'Node.js', 'B2B'],
    isAWStudio: true,
    detailsLink: 'https://ita.gg',
  },
  {
    name: 'E-commerce платформа',
    company: 'Собственный продукт',
    category: 'webapp',
    categoryLabel: categoryLabels.webapp,
    description: {
      ru: 'Модульный движок для интернет-магазинов: веб-сайт, Telegram mini app, CRM и чат-бот. B2B и B2C с AI-аналитикой.',
      en: 'Modular e-commerce engine: website, Telegram mini app, CRM and chatbot. B2B and B2C with AI analytics.',
    },
    logo: '🛒',
    tags: ['Nuxt', 'Laravel', 'AI'],
    isAWStudio: false,
  },
  {
    name: 'Рустерс',
    company: 'roosters-pizza.ru',
    category: 'website',
    categoryLabel: categoryLabels.website,
    description: {
      ru: 'Полноценный интернет-магазин сети доставки пиццы с онлайн-заказом, внутренней CRM и интеграцией 1C.',
      en: 'Full pizza delivery e-commerce with online ordering, internal CRM and 1C integration.',
    },
    logo: '🍕',
    image: '/roosters-cover.png',
    tags: ['Vue.js', 'Laravel', '1C'],
    isAWStudio: true,
    detailsLink: 'https://roosters-pizza.ru',
  },
  {
    name: 'GlobalChemical',
    company: 'globalchemical.ru',
    category: 'website',
    categoryLabel: categoryLabels.website,
    description: {
      ru: 'B2B/B2C интернет-магазин производителя химии и косметики с каталогом 5000+ товаров и интеграцией 1C.',
      en: 'B2B/B2C e-commerce for a chemicals manufacturer with a 5000+ product catalog and 1C integration.',
    },
    logo: '🧪',
    tags: ['WordPress', 'WooCommerce', '1C'],
    isAWStudio: true,
    detailsLink: 'https://globalchemical.ru',
  },
  {
    name: 'Платформа доставки еды',
    company: 'Собственный продукт',
    category: 'service',
    categoryLabel: categoryLabels.service,
    description: {
      ru: 'Полный цикл доставки: веб-сайт с заказом, бэкенд с логистикой, CRM для операторов и курьеров, интеграция с кассами.',
      en: 'End-to-end delivery: ordering website, logistics backend, CRM for operators and couriers, POS integration.',
    },
    logo: '🚴',
    tags: ['Vue.js', 'Laravel', 'CRM'],
    isAWStudio: false,
  },
];

export interface ProjectFilter {
  id: 'all' | ProjectCategory;
  label: string;
}

export interface ProjectStat {
  icon: string;
  value: string;
  label: string;
}

export function useProjectsData() {
  const { localize, currentLang } = useLanguage();

  const sectionLabel = computed(() => currentLang.value === 'ru' ? 'Работы' : 'Works');

  const titleParts = computed(() => currentLang.value === 'ru'
    ? { lead: 'Проекты, которыми', accent: 'я горжусь' }
    : { lead: 'Projects I am', accent: 'proud of' },
  );

  const description = computed(() => currentLang.value === 'ru'
    ? 'Каждый проект — это решение конкретной задачи, созданное с вниманием к деталям, архитектуре и результату.'
    : 'Every project is a solution to a concrete problem, built with care for detail, architecture and outcome.',
  );

  const title = computed(() => currentLang.value === 'ru' ? 'Проекты' : 'Projects');

  const stats = computed<ProjectStat[]>(() => [
    {
      icon: 'lucide:package',
      value: '110+',
      label: currentLang.value === 'ru' ? 'Реализованных проектов' : 'Delivered projects',
    },
    {
      icon: 'lucide:users',
      value: '30+',
      label: currentLang.value === 'ru' ? 'Довольных клиентов' : 'Happy clients',
    },
    {
      icon: 'lucide:code-2',
      value: '2012',
      label: currentLang.value === 'ru' ? 'В разработке с' : 'Building since',
    },
    {
      icon: 'lucide:rocket',
      value: '100%',
      label: currentLang.value === 'ru' ? 'Фокус на результате и качестве' : 'Focus on results and quality',
    },
  ]);

  const filters = computed<ProjectFilter[]>(() => [
    { id: 'all', label: currentLang.value === 'ru' ? 'Все проекты' : 'All projects' },
    { id: 'website', label: currentLang.value === 'ru' ? 'Веб-сайты' : 'Websites' },
    { id: 'telegram', label: currentLang.value === 'ru' ? 'Telegram-боты' : 'Telegram bots' },
    { id: 'webapp', label: currentLang.value === 'ru' ? 'Веб-приложения' : 'Web apps' },
    { id: 'service', label: currentLang.value === 'ru' ? 'Сервисы' : 'Services' },
    { id: 'infra', label: currentLang.value === 'ru' ? 'Инфраструктура' : 'Infrastructure' },
  ]);

  const sortLabel = computed(() => currentLang.value === 'ru' ? 'Сначала новые' : 'Newest first');

  const viewAllLabel = computed(() => currentLang.value === 'ru' ? 'Посмотреть все проекты' : 'View all projects');

  const items = computed<LocalizedProject[]>(() =>
    data.map(project => ({
      name: project.name,
      company: project.company,
      description: localize(project.description),
      category: project.category,
      categoryLabel: localize(project.categoryLabel),
      logo: project.logo,
      image: project.image,
      tags: project.tags,
      isAWStudio: project.isAWStudio,
      detailsLink: project.detailsLink,
    })),
  );

  return {
    title,
    sectionLabel,
    titleParts,
    description,
    stats,
    filters,
    sortLabel,
    viewAllLabel,
    items,
    currentLang,
    raw: data,
  };
}
