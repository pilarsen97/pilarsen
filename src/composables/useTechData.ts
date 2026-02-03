/**
 * useTechData Composable
 * Technologies section data with automatic localization
 */

import type { LocalizedTech, TechItem } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

const data: TechItem[] = [
  {
    name: 'WordPress',
    icon: 'simple-icons:wordpress',
    description: {
      ru: 'Для сайтов малого и среднего уровня сложности. Собственные наработки вместо плагинов — сайты быстрее в 2-3 раза и безопаснее.',
      en: 'For small and medium complexity websites. Custom solutions instead of plugins — sites are 2-3x faster and more secure.',
    },
  },
  {
    name: 'Vue.js',
    icon: 'simple-icons:vuedotjs',
    description: {
      ru: 'Прогрессивный JavaScript-фреймворк для интерактивных интерфейсов. Используем для SPA, админ-панелей и сложных форм.',
      en: 'Progressive JavaScript framework for interactive interfaces. Used for SPAs, admin panels and complex forms.',
    },
  },
  {
    name: 'Nuxt 3',
    icon: 'simple-icons:nuxtdotjs',
    description: {
      ru: 'Full-stack фреймворк на Vue.js. SSR для SEO, статическая генерация, серверные API. Идеален для интернет-магазинов.',
      en: 'Full-stack Vue.js framework. SSR for SEO, static generation, server APIs. Perfect for e-commerce.',
    },
  },
  {
    name: 'Laravel',
    icon: 'simple-icons:laravel',
    description: {
      ru: 'PHP-фреймворк для веб-приложений. REST API, CRM-системы, интеграции с 1C и платёжными сервисами.',
      en: 'PHP framework for web applications. REST APIs, CRM systems, 1C and payment integrations.',
    },
  },
  {
    name: 'TypeScript',
    icon: 'simple-icons:typescript',
    description: {
      ru: 'Типизированный JavaScript для надёжной разработки. Меньше багов, проще поддержка и масштабирование проектов.',
      en: 'Typed JavaScript for reliable development. Fewer bugs, easier maintenance and project scaling.',
    },
  },
  {
    name: 'PHP',
    icon: 'simple-icons:php',
    description: {
      ru: 'Серверный язык для бэкенда. WordPress темы, Laravel приложения, интеграции с внешними сервисами и API.',
      en: 'Server-side language for backend. WordPress themes, Laravel apps, external service and API integrations.',
    },
  },
  {
    name: 'GraphQL',
    icon: 'simple-icons:graphql',
    description: {
      ru: 'Язык запросов для API. Гибкая выборка данных, меньше запросов к серверу, типизированная схема.',
      en: 'API query language. Flexible data fetching, fewer server requests, typed schema.',
    },
  },
  {
    name: 'grammY',
    icon: 'simple-icons:telegram',
    description: {
      ru: 'Фреймворк для Telegram-ботов на TypeScript. Middleware, сессии, inline-режим, webhooks.',
      en: 'Telegram bot framework for TypeScript. Middleware, sessions, inline mode, webhooks.',
    },
  },
  {
    name: 'Telegram Mini Apps',
    icon: 'simple-icons:telegram',
    description: {
      ru: 'Веб-приложения внутри Telegram. Платежи, авторизация, интеграция с ботом и нативный UX.',
      en: 'Web apps inside Telegram. Payments, auth, bot integration and native UX.',
    },
  },
  {
    name: 'Grafana',
    icon: 'simple-icons:grafana',
    description: {
      ru: 'Мониторинг и визуализация метрик. Дашборды для отслеживания производительности и бизнес-показателей.',
      en: 'Metrics monitoring and visualization. Dashboards for tracking performance and business KPIs.',
    },
  },
  {
    name: 'GitLab CI/CD',
    icon: 'simple-icons:gitlab',
    description: {
      ru: 'Автоматизация деплоя и тестирования. Пайплайны для сборки, проверки кода и выкатки на сервер.',
      en: 'Automated deployment and testing. Pipelines for builds, code checks and server deployment.',
    },
  },
  {
    name: 'AI Agents',
    icon: 'lucide:bot',
    description: {
      ru: 'Интеграция ИИ в проекты. Claude, GPT, автоматизация задач, генерация контента и аналитика.',
      en: 'AI integration in projects. Claude, GPT, task automation, content generation and analytics.',
    },
  },
];

export function useTechData() {
  const { localize, currentLang } = useLanguage();

  const title = computed(() =>
    currentLang.value === 'ru' ? 'С чем работаю' : 'What I Work With',
  );

  const subtitle = computed(() =>
    currentLang.value === 'ru'
      ? 'Проверенные и гибкие инструменты'
      : 'Proven and flexible tools',
  );

  const description = computed(() =>
    currentLang.value === 'ru'
      ? 'Мы не полагаемся на множество сторонних плагинов. Вместо этого используем собственные наработки, что делает сайты быстрее и безопаснее. Благодаря модульной архитектуре, функционал можно дополнять без полной переделки проекта.'
      : 'We don\'t rely on many third-party plugins. Instead, we use our own solutions, making sites faster and more secure. Thanks to modular architecture, functionality can be extended without complete project rebuild.',
  );

  const items = computed<LocalizedTech[]>(() =>
    data.map(item => ({
      name: item.name,
      icon: item.icon,
      description: localize(item.description),
    })),
  );

  return {
    title,
    subtitle,
    description,
    items,
    currentLang,
    raw: data,
  };
}
