/**
 * useStatementData Composable
 * Big positioning statement shown right after the hero.
 */

import type { LocalizedText } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

interface StatementData {
  lead: LocalizedText;
  body: LocalizedText;
  signoff: LocalizedText;
}

const data: StatementData = {
  lead: {
    ru: 'Не просто сайты.',
    en: 'Not just websites.',
  },
  body: {
    ru: 'Генерирую идеи, провожу ресёрч, собираю MVP и проверяю гипотезы и технологии. А дальше веду проект как продукт — вместе со своей командой разработчиков.',
    en: 'I generate ideas, run research, build MVPs and validate hypotheses and tech. Then I drive the project like a product — together with my own dev team.',
  },
  signoff: {
    ru: 'Идея → ресёрч → MVP → команда',
    en: 'Idea → research → MVP → team',
  },
};

export function useStatementData() {
  const { localize, currentLang } = useLanguage();

  return {
    lead: computed(() => localize(data.lead)),
    body: computed(() => localize(data.body)),
    signoff: computed(() => localize(data.signoff)),
    currentLang,
    raw: data,
  };
}
