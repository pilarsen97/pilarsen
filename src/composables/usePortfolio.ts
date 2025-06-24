import { computed, ref } from 'vue';

export type Language = 'ru' | 'en';

export interface LocalizedText {
  ru: string;
  en: string;
}

export interface TechItem {
  name: string;
  icon: string;
  description: LocalizedText;
}

export interface ProjectItem {
  name: string;
  description: LocalizedText;
  tags: string[];
}

export interface ServiceItem {
  name: string;
  tagline: LocalizedText;
  icon: string;
  description: LocalizedText;
  features: LocalizedText[];
}

// Portfolio data
export const heroData = {
  greeting: {
    ru: 'Привет, я Арсен 👋',
    en: 'Hi, I\'m Arsen 👋',
  },
  description: {
    ru: 'Разрабатываю веб-сервисы, ботов, продвигаю сайты и обучаю детей. В IT с 2012',
    en: 'I develop web services, bots, promote websites and teach children. In IT since 2012',
  },
  viewWork: {
    ru: 'Посмотреть работы',
    en: 'View My Work',
  },
  contact: {
    ru: 'Связаться',
    en: 'Contact Me',
  },
};

export const techData = {
  title: {
    ru: 'Технологии',
    en: 'Technologies',
  },
  items: [
    {
      name: 'Vue.js',
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4L16 28L30 4H24.5L16 18.5L7.5 4H2Z" fill="#4FC08D"/>
        <path d="M6.5 4L16 20.5L25.5 4H20L16 12L12 4H6.5Z" fill="#35495E"/>
      </svg>`,
      description: {
        ru: 'Современный фреймворк для создания интерактивных интерфейсов',
        en: 'Modern framework for building interactive interfaces',
      },
    },
    {
      name: 'Nuxt 3',
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.5 4L30 24H23L15.5 11L8 24H1L12.5 4H18.5Z" fill="#00C58E"/>
        <path d="M15.5 11L23 24H30L18.5 4L15.5 11Z" fill="#108775"/>
      </svg>`,
      description: {
        ru: 'Full-stack фреймворк для Vue.js приложений',
        en: 'Full-stack framework for Vue.js applications',
      },
    },
    {
      name: 'TypeScript',
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#3178C6"/>
        <path d="M18.5 20V24H21.5V20H18.5Z" fill="white"/>
        <path d="M9 12H23V9H9V12Z" fill="white"/>
        <path d="M15 14V24H18V14H15Z" fill="white"/>
        <path d="M20 14H23V17H26V14H29V24H26V20H23V24H20V14Z" fill="white"/>
      </svg>`,
      description: {
        ru: 'Типизированный JavaScript для надежной разработки',
        en: 'Typed JavaScript for reliable development',
      },
    },
    {
      name: 'SCSS',
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#CF649A"/>
        <path d="M22.5 18.5C21.8 18.5 21.2 18.7 20.7 19C20.4 18.4 20.1 17.9 20 17.6C19.8 17.1 19.6 16.8 19.6 16.4C19.6 15.9 19.8 15.3 19.8 15.3S19.7 14.9 19.3 14.9C18.9 14.9 18.6 15.1 18.5 15.4C18.4 15.6 18.2 16 18.1 16.5C17.9 17.4 17.2 18.5 16.4 19.2C16.1 18.9 15.9 18.5 15.9 18.1C15.9 17.1 16.6 16.1 16.6 15C16.6 14.3 16.3 13.9 15.8 13.9C15.5 13.9 15.1 14.1 14.9 14.6C14.7 15.1 14.7 15.7 14.9 16.3C15.1 16.9 15.5 17.5 15.9 18C15.7 18.5 15.3 19.2 14.8 19.7C13.9 20.6 13.1 21 12.7 20.8C12.4 20.7 12.3 20.2 12.5 19.5C12.8 18.5 13.4 17.3 13.4 16.5C13.4 15.9 13.1 15.6 12.7 15.6C12.4 15.6 12.1 15.8 11.9 16.2C11.7 16.6 11.6 17.1 11.8 17.6C12 18.3 12.5 19 13.1 19.5C13.2 19.6 13.3 19.7 13.4 19.8C13.1 20.1 12.7 20.4 12.2 20.6C11.2 21 10.5 20.9 10.2 20.4C9.9 19.9 10.3 19.1 11.1 18.2C11.3 18 11.5 17.8 11.6 17.6C11.8 17.3 11.8 17 11.6 16.9C11.4 16.8 11.1 16.9 10.8 17.2C9.8 18.2 9.3 19.4 9.7 20.2C10.1 21 11.2 21.3 12.6 20.8C13.2 20.6 13.8 20.2 14.3 19.7C14.9 20 15.6 20.1 16.3 19.9C17.3 19.6 18 18.8 18.3 17.8C18.4 17.5 18.4 17.2 18.3 16.9C18.5 16.8 18.7 16.7 18.9 16.7C19.5 16.7 19.8 17.1 19.7 17.8C19.6 18.5 19.2 19.1 18.7 19.5C18.5 19.7 18.4 19.9 18.5 20C18.6 20.1 18.8 20.1 19 19.9C19.8 19.3 20.4 18.4 20.5 17.3C20.6 16.6 20.4 16 20 15.6C20.8 15.4 21.7 15.5 22.4 16C23.4 16.7 23.7 17.9 23.2 18.9C22.7 19.9 21.7 20.5 20.5 20.5C20.1 20.5 19.8 20.4 19.6 20.2C19.5 20.1 19.5 19.9 19.6 19.8C19.7 19.7 19.9 19.7 20.1 19.8C20.6 20 21.2 19.9 21.6 19.5C22 19.1 22.1 18.5 21.8 18C21.5 17.5 20.9 17.3 20.3 17.5C19.9 17.6 19.6 17.9 19.5 18.3C19.4 18.4 19.4 18.5 19.5 18.6C19.6 18.7 19.8 18.7 20 18.6C20.2 18.5 20.4 18.5 20.6 18.6C20.8 18.7 20.9 18.9 20.8 19.1C20.7 19.3 20.5 19.4 20.3 19.3C19.9 19.2 19.6 18.9 19.5 18.5C19.4 18 19.6 17.5 20 17.2C20.6 16.8 21.4 16.9 21.9 17.4C22.4 17.9 22.5 18.6 22.2 19.2C21.8 19.9 21.1 20.3 20.3 20.3C19.9 20.3 19.6 20.2 19.4 20C19.3 19.9 19.3 19.7 19.4 19.6C19.5 19.5 19.7 19.5 19.9 19.6C20.4 19.8 21 19.7 21.4 19.3C21.8 18.9 21.9 18.3 21.6 17.8C21.3 17.3 20.7 17.1 20.1 17.3C19.7 17.4 19.4 17.7 19.3 18.1" fill="white"/>
      </svg>`,
      description: {
        ru: 'Продвинутый CSS препроцессор для стилизации',
        en: 'Advanced CSS preprocessor for styling',
      },
    },
  ] as TechItem[],
};

export const projectsData = {
  title: {
    ru: 'Мои проекты',
    en: 'My Projects',
  },
  items: [
    {
      name: 'A&W Studio',
      description: {
        ru: 'Digital-студия по разработке сайтов и ботов',
        en: 'Digital studio for website and bot development',
      },
      tags: ['Vue.js', 'Nuxt', 'Design', 'Development'],
    },
    {
      name: 'KIBERone',
      description: {
        ru: 'Обучение детей программированию и IT',
        en: 'Teaching children programming and IT',
      },
      tags: ['Education', 'Programming', 'Kids', 'IT'],
    },
  ] as ProjectItem[],
};

export const servicesData = {
  title: {
    ru: 'Мои услуги',
    en: 'My Services',
  },
  items: [
    {
      name: 'Разработка сайтов',
      tagline: {
        ru: 'Современные веб-решения',
        en: 'Modern web solutions',
      },
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="28" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M2 10h28" stroke="currentColor" stroke-width="2"/>
        <circle cx="6" cy="8" r="1" fill="currentColor"/>
        <circle cx="9" cy="8" r="1" fill="currentColor"/>
        <circle cx="12" cy="8" r="1" fill="currentColor"/>
        <path d="M8 16l4 4 8-8" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>`,
      description: {
        ru: 'Создаю быстрые и красивые веб-сайты на WordPress/Laravel, Vue.js и Nuxt 3. От лендингов до сложных веб-приложений.',
        en: 'I create fast and beautiful websites with WordPress/Laravel, Vue.js and Nuxt 3. From landing pages to complex web applications.',
      },
      features: [
        {
          ru: 'Адаптивный дизайн',
          en: 'Responsive design',
        },
        {
          ru: 'Высокая производительность',
          en: 'High performance',
        },
        {
          ru: 'SEO-оптимизация',
          en: 'SEO optimization',
        },
        {
          ru: 'Современные технологии',
          en: 'Modern technologies',
        },
      ],
    },
    {
      name: 'SEO оптимизация',
      tagline: {
        ru: 'Больше клиентов из поиска',
        en: 'More clients from search',
      },
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="21 21l6 6" stroke="currentColor" stroke-width="2"/>
        <path d="M10 14l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M4 28l3-3M28 4l-3 3" stroke="currentColor" stroke-width="1.5"/>
      </svg>`,
      description: {
        ru: 'Помогаю сайтам попадать в топ поисковых систем и привлекать целевой трафик.',
        en: 'I help websites reach the top of search engines and attract targeted traffic.',
      },
      features: [
        {
          ru: 'Техническая оптимизация',
          en: 'Technical optimization',
        },
        {
          ru: 'Контент-стратегия',
          en: 'Content strategy',
        },
        {
          ru: 'Анализ конкурентов',
          en: 'Competitor analysis',
        },
        {
          ru: 'Отчеты и аналитика',
          en: 'Reports and analytics',
        },
      ],
    },
    {
      name: 'Чат-боты и автоматизация',
      tagline: {
        ru: 'Автоматизация бизнес-процессов',
        en: 'Business process automation',
      },
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="24" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="20" cy="14" r="1.5" fill="currentColor"/>
        <path d="M8 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
        <path d="M12 24v4M20 24v4" stroke="currentColor" stroke-width="2"/>
      </svg>`,
      description: {
        ru: 'Создаю Telegram-ботов и системы автоматизации для экономии времени и повышения эффективности.',
        en: 'I create Telegram bots and automation systems to save time and increase efficiency.',
      },
      features: [
        {
          ru: 'Telegram боты',
          en: 'Telegram bots',
        },
        {
          ru: 'Интеграция с CRM',
          en: 'CRM integration',
        },
        {
          ru: 'Обработка заказов',
          en: 'Order processing',
        },
        {
          ru: 'Уведомления и рассылки',
          en: 'Notifications and newsletters',
        },
      ],
    },
    {
      name: 'Обучение детей IT',
      tagline: {
        ru: 'Будущее начинается сегодня',
        en: 'The future starts today',
      },
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20l12-8 12 8" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M6 18v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="16" cy="8" r="2" fill="currentColor"/>
        <path d="M12 16h8M12 20h6" stroke="currentColor" stroke-width="1.5"/>
      </svg>`,
      description: {
        ru: 'Обучаю детей программированию и веб-разработке в понятной и увлекательной форме.',
        en: 'I teach children programming and web development in an understandable and engaging way.',
      },
      features: [
        {
          ru: 'Индивидуальный подход',
          en: 'Individual approach',
        },
        {
          ru: 'Практические проекты',
          en: 'Practical projects',
        },
        {
          ru: 'Современные методики',
          en: 'Modern methodologies',
        },
        {
          ru: 'Онлайн и офлайн занятия',
          en: 'Online and offline classes',
        },
      ],
    },
  ] as ServiceItem[],
};

export function usePortfolio() {
  const currentLang = ref<Language>('ru');
  const isDark = ref(true);

  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru';
  };

  const pageTitle = computed(() =>
    currentLang.value === 'ru' ? 'Арсен - Веб-разработчик' : 'Arsen - Web Developer',
  );

  return {
    currentLang,
    isDark,
    toggleLanguage,
    pageTitle,
    heroData,
    techData,
    servicesData,
    projectsData,
  };
}
