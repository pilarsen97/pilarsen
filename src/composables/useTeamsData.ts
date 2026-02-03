/**
 * useTeamsData Composable
 * Teams section data with automatic localization
 */

import type { LocalizedTeam, TeamItem } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

const currentYear = new Date().getFullYear();

const data: TeamItem[] = [
  {
    name: 'Digital студия A&W',
    description: {
      ru: 'Разработка сайтов и веб-сервисов, SEO оптимизация и продвижение, боты и автоматизация',
      en: 'Website and web service development, SEO optimization and promotion, bots and automation',
    },
    logo: '🎨',
    since: `2012 - ${currentYear}`,
    tags: ['Web Development', 'SEO', 'Bots', 'Automation'],
  },
  {
    name: 'KIBERmax',
    description: {
      ru: 'IT образование для детей и взрослых, мастер-классы для всех, обучение для предпринимателей и бизнеса',
      en: 'IT education for children and adults, masterclasses for everyone, training for entrepreneurs and business',
    },
    logo: '🎓',
    since: `2019 - ${currentYear}`,
    tags: ['Education', 'IT Training', 'Adults', 'Kids', 'Business'],
  },
];

export function useTeamsData() {
  const { localize, currentLang } = useLanguage();

  const title = computed(() =>
    currentLang.value === 'ru' ? 'С кем работаю' : 'Who I Work With',
  );

  const items = computed<LocalizedTeam[]>(() =>
    data.map(team => ({
      name: team.name,
      description: localize(team.description),
      logo: team.logo,
      since: team.since,
      tags: team.tags,
    })),
  );

  return {
    title,
    items,
    currentLang,
    raw: data,
  };
}
