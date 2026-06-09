/**
 * useWhatCanIDoData Composable
 * "What I can help with" section — services, benefits and CTA copy (bilingual).
 */

import type { LocalizedText } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

interface ServiceItem {
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
}

interface BenefitItem {
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
}

interface WhatCanIDoContent {
  eyebrow: LocalizedText;
  titleLead: LocalizedText;
  titleAccent: LocalizedText;
  description: LocalizedText;
  more: LocalizedText;
  ctaText: LocalizedText;
  ctaLabel: LocalizedText;
  services: ServiceItem[];
  benefits: BenefitItem[];
}

const data: WhatCanIDoContent = {
  eyebrow: { ru: 'Чем я могу помочь', en: 'What I can help with' },
  titleLead: { ru: 'Превращаю идеи в', en: 'I turn ideas into' },
  titleAccent: { ru: 'работающие продукты', en: 'working products' },
  description: {
    ru: 'Создаю производительные веб-сайты, надёжные серверные решения, Telegram-боты и сложные IT-системы, которые приносят результат.',
    en: 'I build high-performance websites, reliable server solutions, Telegram bots and complex IT systems that deliver results.',
  },
  more: { ru: 'Подробнее', en: 'Learn more' },
  ctaText: {
    ru: 'Бесплатные веб-приложения, которые я создаю',
    en: 'Free web apps I build',
  },
  ctaLabel: { ru: 'Открыть сервисы', en: 'Open services' },
  services: [
    {
      icon: 'lucide:globe',
      title: { ru: 'Веб-сайты', en: 'Websites' },
      description: {
        ru: 'Современные, быстрые и масштабируемые сайты под любые задачи бизнеса.',
        en: 'Modern, fast and scalable websites for any business need.',
      },
      features: [
        { ru: 'Корпоративные сайты', en: 'Corporate websites' },
        { ru: 'Интернет-магазины', en: 'Online stores' },
        { ru: 'Лендинги и промо-сайты', en: 'Landing & promo pages' },
        { ru: 'Сложные веб-сервисы', en: 'Complex web services' },
      ],
    },
    {
      icon: 'lucide:server',
      title: { ru: 'Серверы и инфраструктура', en: 'Servers & infrastructure' },
      description: {
        ru: 'Настраиваю надёжную инфраструктуру, которая работает стабильно и безопасно.',
        en: 'I set up reliable infrastructure that runs stably and securely.',
      },
      features: [
        { ru: 'VPS / Dedicated / Cloud', en: 'VPS / Dedicated / Cloud' },
        { ru: 'Docker / CI-CD / DevOps', en: 'Docker / CI-CD / DevOps' },
        { ru: 'Настройка и оптимизация', en: 'Setup & optimization' },
        { ru: 'Мониторинг / Безопасность', en: 'Monitoring / Security' },
      ],
    },
    {
      icon: 'lucide:send',
      title: { ru: 'Telegram-боты и Mini Apps', en: 'Telegram bots & Mini Apps' },
      description: {
        ru: 'Создаю ботов и мини-приложения любой сложности для автоматизации и взаимодействия с пользователями.',
        en: 'I build bots and mini-apps of any complexity for automation and user engagement.',
      },
      features: [
        { ru: 'Telegram-боты', en: 'Telegram bots' },
        { ru: 'Mini Apps & Web Apps', en: 'Mini Apps & Web Apps' },
        { ru: 'Интеграции и платежи', en: 'Integrations & payments' },
        { ru: 'Админ-панели и CRM', en: 'Admin panels & CRM' },
      ],
    },
    {
      icon: 'lucide:code-2',
      title: { ru: 'IT-проекты под ключ', en: 'Turnkey IT projects' },
      description: {
        ru: 'Разрабатываю сложные IT-системы и веб-сервисы, объединяя технологии, дизайн и бизнес-логику.',
        en: 'I develop complex IT systems and web services, combining technology, design and business logic.',
      },
      features: [
        { ru: 'Веб-приложения', en: 'Web applications' },
        { ru: 'SaaS-платформы', en: 'SaaS platforms' },
        { ru: 'API и интеграции', en: 'APIs & integrations' },
        { ru: 'Индивидуальные решения', en: 'Custom solutions' },
      ],
    },
  ],
  benefits: [
    {
      icon: 'lucide:shield',
      title: { ru: 'Надёжность', en: 'Reliability' },
      description: {
        ru: 'Пишу чистый, поддерживаемый код и продумываю архитектуру.',
        en: 'I write clean, maintainable code and think through architecture.',
      },
    },
    {
      icon: 'lucide:zap',
      title: { ru: 'Скорость', en: 'Speed' },
      description: {
        ru: 'Оптимизирую процессы и делаю проекты быстрыми.',
        en: 'I optimize processes and make projects fast.',
      },
    },
    {
      icon: 'lucide:lock',
      title: { ru: 'Безопасность', en: 'Security' },
      description: {
        ru: 'Защищаю данные и строю отказоустойчивые системы.',
        en: 'I protect data and build resilient systems.',
      },
    },
    {
      icon: 'lucide:rocket',
      title: { ru: 'Результат', en: 'Results' },
      description: {
        ru: 'Фокус на том, что приносит реальную пользу бизнесу.',
        en: 'Focused on what brings real value to the business.',
      },
    },
  ],
};

export function useWhatCanIDoData() {
  const { localize, currentLang } = useLanguage();

  return {
    eyebrow: computed(() => localize(data.eyebrow)),
    titleLead: computed(() => localize(data.titleLead)),
    titleAccent: computed(() => localize(data.titleAccent)),
    description: computed(() => localize(data.description)),
    more: computed(() => localize(data.more)),
    ctaText: computed(() => localize(data.ctaText)),
    ctaLabel: computed(() => localize(data.ctaLabel)),
    services: computed(() =>
      data.services.map(service => ({
        icon: service.icon,
        title: localize(service.title),
        description: localize(service.description),
        features: service.features.map(feature => localize(feature)),
      })),
    ),
    benefits: computed(() =>
      data.benefits.map(benefit => ({
        icon: benefit.icon,
        title: localize(benefit.title),
        description: localize(benefit.description),
      })),
    ),
    currentLang,
  };
}
