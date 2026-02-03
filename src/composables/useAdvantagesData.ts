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
      ru: 'Модульный подход',
      en: 'Modular Approach',
    },
    description: {
      ru: 'Дополняем и расширяем функционал без переделки сайта. Меняем дизайн, сохраняя контент',
      en: 'Expand functionality without rebuilding. Change design while keeping content',
    },
    highlight: '30-60%',
  },
  {
    title: {
      ru: 'Высокая скорость',
      en: 'High Speed',
    },
    description: {
      ru: 'Минимум плагинов — пишем функционал сами. Сайты работают в 2-3 раза быстрее',
      en: 'Minimal plugins — we write functionality ourselves. Sites run 2-3x faster',
    },
    highlight: '2-3x',
  },
  {
    title: {
      ru: 'Экономия на редизайне',
      en: 'Redesign Savings',
    },
    description: {
      ru: 'Обновляем внешний вид сайта через 3-6 лет, сохраняя наполнение. Экономия 30-60%',
      en: 'Refresh site appearance after 3-6 years, keeping content. Save 30-60%',
    },
  },
  {
    title: {
      ru: 'Удобная админ-панель',
      en: 'Easy Admin Panel',
    },
    description: {
      ru: 'Добавляйте и редактируйте контент самостоятельно, без навыков программирования',
      en: 'Add and edit content yourself, no programming skills required',
    },
  },
  {
    title: {
      ru: 'Техподдержка',
      en: 'Technical Support',
    },
    description: {
      ru: 'Сопровождаем проект на всех этапах: от разработки до запуска и дальнейшей поддержки',
      en: 'We support the project at all stages: from development to launch and beyond',
    },
  },
  {
    title: {
      ru: '110+ проектов',
      en: '110+ Projects',
    },
    description: {
      ru: 'Опыт с 2012 года. Реализовано более 110 проектов разной сложности',
      en: 'Experience since 2012. Over 110 projects of varying complexity completed',
    },
    highlight: '110+',
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
    currentLang.value === 'ru' ? 'Почему мы' : 'Why Us',
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
    items,
    currentLang,
    raw: data,
  };
}
