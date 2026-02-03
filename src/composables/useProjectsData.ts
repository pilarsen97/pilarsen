/**
 * useProjectsData Composable
 * Projects section data with automatic localization
 */

import type { LocalizedProject, ProjectItem } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

const data: ProjectItem[] = [
  // ═══════════════════════════════════════════════════════════════════
  // ОСНОВНЫЕ ПАРТНЁРЫ — Наша команда как аутсорсинговый IT-отдел
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'GlobalChemical',
    company: 'globalchemical.ru',
    description: {
      ru: 'Производитель химии и косметики. B2B/B2C интернет-магазин с каталогом 5000+ товаров, интеграцией 1C и системой дистрибьюторских цен.',
      en: 'Chemical and cosmetics manufacturer. B2B/B2C e-commerce with 5000+ product catalog, 1C integration and distributor pricing system.',
    },
    logo: '🧪',
    tags: ['WordPress', 'WooCommerce', 'B2B', 'B2C', '1C'],
    isAWStudio: true,
    detailsLink: 'https://globalchemical.ru',
  },
  {
    name: 'Рустерс',
    company: 'roosters-pizza.ru',
    description: {
      ru: 'Сеть доставки пиццы в Волгограде. Разработали интернет-магазин с онлайн-заказом, внутреннюю CRM для управления заказами, отчёты и интеграцию с 1C.',
      en: 'Pizza delivery chain in Volgograd. Built e-commerce with online ordering, internal CRM for order management, reports and 1C integration.',
    },
    logo: '🍕',
    tags: ['Vue.js', 'Nuxt', 'Laravel', 'CRM', '1C'],
    isAWStudio: true,
    detailsLink: 'https://roosters-pizza.ru',
  },
  {
    name: 'ITA',
    company: 'ita.gg',
    description: {
      ru: 'Системный интегратор полного цикла для компьютерных клубов. Разрабатываем веб-платформу, интеграции с игровыми сервисами и систему управления клубами.',
      en: 'Full-cycle system integrator for computer clubs. Building web platform, gaming service integrations and club management system.',
    },
    logo: '🎮',
    tags: ['Vue.js', 'Node.js', 'Integration', 'B2B', 'Gaming'],
    isAWStudio: true,
    detailsLink: 'https://ita.gg',
  },
  {
    name: 'MP Profit',
    company: 'mpprofit.ru',
    description: {
      ru: 'SaaS-платформа для оцифровки работы магазинов на маркетплейсах. Аналитика продаж, управление остатками, автоматизация ценообразования.',
      en: 'SaaS platform for digitizing marketplace store operations. Sales analytics, inventory management, pricing automation.',
    },
    logo: '📊',
    tags: ['SaaS', 'Vue.js', 'Analytics', 'Marketplace', 'API'],
    isAWStudio: true,
    detailsLink: 'https://mpprofit.ru',
  },

  // ═══════════════════════════════════════════════════════════════════
  // СОБСТВЕННЫЕ СТАРТАПЫ — Продуктовая разработка
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'E-commerce платформа',
    company: 'Собственный продукт',
    description: {
      ru: 'Модульный движок для интернет-магазинов: Nuxt + Laravel. Веб-сайт, Telegram mini app, CRM, чат-бот. B2B и B2C с AI-аналитикой и масштабируемыми интеграциями.',
      en: 'Modular e-commerce engine: Nuxt + Laravel. Website, Telegram mini app, CRM, chatbot. B2B and B2C with AI analytics and scalable integrations.',
    },
    logo: '🛒',
    tags: ['Nuxt', 'Laravel', 'Telegram', 'AI', 'SaaS'],
    isAWStudio: false,
  },
  {
    name: 'Платформа доставки еды',
    company: 'Собственный продукт',
    description: {
      ru: 'Полный цикл для доставки: веб-сайт с онлайн-заказом, бэкенд с логистикой, CRM для операторов и курьеров. Интеграция с кассами и платёжными системами.',
      en: 'Complete delivery solution: website with online ordering, backend with logistics, CRM for operators and couriers. POS and payment system integration.',
    },
    logo: '🚴',
    tags: ['Vue.js', 'Laravel', 'CRM', 'Logistics', 'POS'],
    isAWStudio: false,
  },
  {
    name: 'Агрегатор товаров с кешбеком',
    company: 'Собственный продукт',
    description: {
      ru: 'Telegram bot + mini app для товаров с кешбеком за отзывы. Удобный поиск по маркетплейсам, рейтинг продавцов, автоматизация условий выплат.',
      en: 'Telegram bot + mini app for cashback products. Marketplace search, seller ratings, automated payout conditions.',
    },
    logo: '💰',
    tags: ['Telegram Bot', 'Mini App', 'Node.js', 'Cashback'],
    isAWStudio: false,
  },
];

export function useProjectsData() {
  const { localize, currentLang } = useLanguage();

  const title = computed(() =>
    currentLang.value === 'ru' ? 'Проекты' : 'Projects',
  );

  const items = computed<LocalizedProject[]>(() =>
    data.map(project => ({
      name: project.name,
      company: project.company,
      description: localize(project.description),
      logo: project.logo,
      image: project.image,
      tags: project.tags,
      isAWStudio: project.isAWStudio,
      detailsLink: project.detailsLink,
    })),
  );

  return {
    title,
    items,
    currentLang,
    raw: data,
  };
}
