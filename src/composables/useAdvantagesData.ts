/**
 * useAdvantagesData Composable
 * USP/Advantages section data with automatic localization
 */

import type { LocalizedText } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

interface AdvantageData {
  title: LocalizedText;
  description: LocalizedText;
  highlight?: string;
}

const data: AdvantageData[] = [
  {
    title: {
      ru: 'Полный цикл',
      en: 'Full cycle',
    },
    description: {
      ru: 'Веду продукт от идеи и ресёрча до запуска и поддержки — без подрядчиков-посредников',
      en: 'I own the product from idea and research to launch and support — no middlemen',
    },
    highlight: '0→1',
  },
  {
    title: {
      ru: '13 лет в разработке',
      en: '13 years building',
    },
    description: {
      ru: 'Коммерческие проекты с 2012 года — вижу решения, которые работают вдолгую',
      en: 'Commercial projects since 2012 — I see solutions that hold up long-term',
    },
    highlight: '2012',
  },
  {
    title: {
      ru: '110+ проектов',
      en: '110+ projects',
    },
    description: {
      ru: 'Сайты, боты, e-commerce и сервисы для бизнеса разного масштаба',
      en: 'Websites, bots, e-commerce and services for businesses of every size',
    },
    highlight: '110+',
  },
  {
    title: {
      ru: 'Инженерный подход',
      en: 'Engineering approach',
    },
    description: {
      ru: 'Проектирую архитектуру под задачу, а не собираю из плагинов — быстрее и надёжнее',
      en: 'I design architecture for the task instead of stacking plugins — faster and more reliable',
    },
    highlight: '2-3x',
  },
  {
    title: {
      ru: 'Команда под масштаб',
      en: 'A team for scale',
    },
    description: {
      ru: 'Большие проекты веду с собственной командой разработчиков',
      en: 'I run large projects with my own dev team',
    },
  },
  {
    title: {
      ru: 'За результат, а не за часы',
      en: 'Outcome over hours',
    },
    description: {
      ru: 'Думаю про бизнес-задачу: ищу решение, проверяю гипотезы и довожу до результата',
      en: 'I focus on the business problem: find the solution, test hypotheses, deliver the result',
    },
  },
];

export interface LocalizedAdvantageItem {
  title: string;
  description: string;
  highlight?: string;
}

export function useAdvantagesData() {
  const { localize, currentLang } = useLanguage();

  const title = computed(() =>
    currentLang.value === 'ru' ? 'Почему я' : 'Why Me',
  );

  const eyebrow = computed(() =>
    currentLang.value === 'ru' ? 'Преимущества' : 'Advantages',
  );

  const titleLead = computed(() =>
    currentLang.value === 'ru' ? 'Почему' : 'Why',
  );

  const titleAccent = computed(() =>
    currentLang.value === 'ru' ? 'я' : 'me',
  );

  const description = computed(() =>
    currentLang.value === 'ru'
      ? 'Опыт с 2012 года и подход, в котором я отвечаю за весь путь продукта — от идеи до результата.'
      : 'Experience since 2012 and an approach where I own the whole product journey — from idea to outcome.',
  );

  const items = computed<LocalizedAdvantageItem[]>(() =>
    data.map(item => ({
      title: localize(item.title),
      description: localize(item.description),
      highlight: item.highlight,
    })),
  );

  return {
    title,
    eyebrow,
    titleLead,
    titleAccent,
    description,
    items,
    currentLang,
    raw: data,
  };
}
