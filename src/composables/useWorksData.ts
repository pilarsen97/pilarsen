/**
 * useWorksData Composable
 * Works section data with automatic localization
 */

import type { LocalizedWork, WorkItem } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

const data: WorkItem[] = [
  {
    title: 'KPN Volga',
    description: {
      ru: 'Бетонные изделия, парковая мебель для частных и муниципальных пространств',
      en: 'Concrete products, park furniture for private and municipal spaces',
    },
    link: 'https://kpn-volga.com',
    tags: ['WordPress', 'B2B', 'Catalog'],
    isAWStudio: true,
  },
  {
    title: 'KPN City',
    description: {
      ru: 'Бетонные изделия, парковая мебель для частных и муниципальных пространств',
      en: 'Concrete products, park furniture for private and municipal spaces',
    },
    link: 'https://kpn-city.ru',
    tags: ['WordPress', 'B2B', 'Catalog'],
    isAWStudio: true,
  },
  {
    title: 'Global Chemical',
    description: {
      ru: 'Производитель химии и косметики. B2B, B2C',
      en: 'Chemical and cosmetics manufacturer. B2B, B2C',
    },
    link: 'https://globalchemical.ru',
    tags: ['WordPress', 'B2B', 'B2C', 'E-commerce'],
    isAWStudio: true,
  },
  {
    title: 'RCK VLG',
    description: {
      ru: 'Региональный центр компетенции Волгоградской области в сфере производительности труда',
      en: 'Regional Competence Center of Volgograd Region for Labor Productivity',
    },
    link: 'https://rck-vlg.ru',
    tags: ['WordPress', 'Government', 'Corporate'],
    isAWStudio: true,
  },
  {
    title: 'Crasava',
    description: {
      ru: 'Разработка и изготовление рекламно-информационной продукции',
      en: 'Development and production of advertising and information products',
    },
    link: 'https://crasava.ru',
    tags: ['WordPress', 'B2B', 'Manufacturing'],
    isAWStudio: true,
  },
  {
    title: 'Narhozstroy',
    description: {
      ru: 'Загородные дома из премиального клееного бруса',
      en: 'Country houses from premium glued timber',
    },
    link: 'https://narhozstroy.ru',
    tags: ['WordPress', 'Construction', 'Premium'],
    isAWStudio: true,
  },
  {
    title: 'TimeTrial',
    description: {
      ru: 'Разработчик и производитель надувных изделий из ПВХ, ТПУ, AIRDECK с 2000 года',
      en: 'Developer and manufacturer of inflatable products from PVC, TPU, AIRDECK since 2000',
    },
    link: 'https://timetrial.ru',
    tags: ['WordPress', 'Manufacturing', 'E-commerce'],
    isAWStudio: true,
  },
  {
    title: 'El Coche Rent a Car',
    description: {
      ru: 'Аренда автомобилей в Дубае',
      en: 'Car rental in Dubai',
    },
    link: 'https://elcocherentacar.com',
    tags: ['WordPress', 'Rental', 'International'],
    isAWStudio: true,
  },
  {
    title: 'Varikoza Net',
    description: {
      ru: 'Клиника лазерной хирургии',
      en: 'Laser surgery clinic',
    },
    link: 'https://varikoza-net34.ru',
    tags: ['WordPress', 'Medical', 'Landing'],
    isAWStudio: true,
  },
  {
    title: 'Ikra Space',
    description: {
      ru: 'Офисная экосистема, коворкинг, место событий и локальный ориентир',
      en: 'Office ecosystem, coworking, event space and local landmark',
    },
    link: 'https://ikraspace.ru',
    tags: ['WordPress', 'Coworking', 'Corporate'],
    isAWStudio: true,
  },
  {
    title: 'Santeh Ideal',
    description: {
      ru: 'Сантехника и оборудование первоклассных брендов',
      en: 'Plumbing and equipment from premium brands',
    },
    link: 'https://santeh-ideal.ru',
    tags: ['WordPress', 'E-commerce', 'Premium'],
    isAWStudio: true,
  },
  {
    title: 'Agrodepartament',
    description: {
      ru: 'Крупно-оптовая торговля: семена, удобрение и защита, капельное орошение',
      en: 'Wholesale trade: seeds, fertilizers and protection, drip irrigation',
    },
    link: 'https://agrodepartament.ru',
    tags: ['WordPress', 'B2B', 'Agriculture'],
    isAWStudio: true,
  },
  {
    title: 'MRT City',
    description: {
      ru: 'Центр МРТ и КТ',
      en: 'MRI and CT Center',
    },
    link: 'https://mrt-sity.ru',
    tags: ['WordPress', 'Medical', 'Services'],
    isAWStudio: true,
  },
  {
    title: 'Mirarki',
    description: {
      ru: 'Производство навесов из поликарбоната',
      en: 'Production of polycarbonate canopies',
    },
    link: 'https://mirarki.ru',
    tags: ['WordPress', 'Manufacturing', 'Catalog'],
    isAWStudio: true,
  },
  {
    title: 'AutoEva',
    description: {
      ru: 'Интернет-магазин автоковриков EVA',
      en: 'Online store for EVA car mats',
    },
    link: 'https://autoeva.ru',
    tags: ['WordPress', 'E-commerce', 'Auto'],
    isAWStudio: true,
  },
  {
    title: 'Lavrushka Cafe',
    description: {
      ru: 'Кафе',
      en: 'Cafe',
    },
    link: 'https://lavrushkacafe.ru',
    tags: ['WordPress', 'Restaurant', 'Landing'],
    isAWStudio: true,
  },
  {
    title: 'Zodiac Fish',
    description: {
      ru: 'Производитель рыбной продукции',
      en: 'Fish products manufacturer',
    },
    link: 'https://zodiacfish.ru',
    tags: ['WordPress', 'Manufacturing', 'B2B'],
    isAWStudio: true,
  },
  {
    title: 'V-Moll',
    description: {
      ru: 'Мебельный торговый центр',
      en: 'Furniture shopping center',
    },
    link: 'https://v-moll.ru',
    tags: ['WordPress', 'Retail', 'Corporate'],
    isAWStudio: true,
  },
  {
    title: 'Bon Ton',
    description: {
      ru: 'Салон красоты',
      en: 'Beauty salon',
    },
    link: 'https://bon-ton.pro',
    tags: ['WordPress', 'Beauty', 'Services'],
    isAWStudio: true,
  },
  {
    title: 'SQ34',
    description: {
      ru: 'Сеть гостиничных комплексов и СПА',
      en: 'Hotel and SPA chain',
    },
    link: 'https://sq34.ru',
    tags: ['WordPress', 'Hotel', 'Premium'],
    isAWStudio: true,
  },
  {
    title: 'Aqua Complex',
    description: {
      ru: 'Премиум автомойка и детейлинг',
      en: 'Premium car wash and detailing',
    },
    link: 'https://aquacomplex.pro',
    tags: ['WordPress', 'Auto', 'Premium'],
    isAWStudio: true,
  },
  {
    title: 'TTM Centr',
    description: {
      ru: 'Коммерческий транспорт и спецтехника: продажа, ремонт, запчасти',
      en: 'Commercial vehicles and special equipment: sales, repair, spare parts',
    },
    link: 'https://ttm-centr34.ru',
    tags: ['WordPress', 'Auto', 'B2B'],
    isAWStudio: true,
  },
  {
    title: 'Sad Radosti',
    description: {
      ru: 'Изготовление парковых арт-объектов',
      en: 'Production of park art objects',
    },
    link: 'https://sadradosti.ru',
    tags: ['WordPress', 'Art', 'Manufacturing'],
    isAWStudio: true,
  },
];

export function useWorksData() {
  const { localize, currentLang } = useLanguage();

  const title = computed(() =>
    currentLang.value === 'ru' ? 'Работы' : 'Works',
  );

  const subtitle = computed(() =>
    currentLang.value === 'ru'
      ? 'Более 110 реализованных проектов'
      : 'Over 110 completed projects',
  );

  const items = computed<LocalizedWork[]>(() =>
    data.map(work => ({
      title: work.title,
      description: localize(work.description),
      image: work.image,
      link: work.link,
      tags: work.tags,
      isAWStudio: work.isAWStudio,
    })),
  );

  return {
    title,
    subtitle,
    items,
    currentLang,
    raw: data,
  };
}
