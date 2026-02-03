/**
 * useContactData Composable
 * Contact information with automatic localization
 */

import type { ContactData, SocialLink } from '@/types/portfolio';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

const data: ContactData = {
  name: {
    ru: 'Арсен',
    en: 'Arsen',
  },
  title: {
    ru: 'Веб-разработчик',
    en: 'Web Developer',
  },
  logo: '👨‍💻',
  socials: [
    {
      name: 'VK',
      url: 'https://vk.com/pilarsen',
      icon: 'simple-icons:vk',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/pilarsen',
      icon: 'simple-icons:telegram',
    },
  ],
  contact: {
    phone: '+7 (XXX) XXX-XX-XX',
    email: 'hello@pilarsen.dev',
    location: {
      ru: 'Россия',
      en: 'Russia',
    },
  },
  vcard: {
    ru: 'Добавить в контакты',
    en: 'Add to Contacts',
  },
};

export interface LocalizedContact {
  name: string;
  title: string;
  logo: string;
  socials: SocialLink[];
  contact: {
    phone: string;
    email: string;
    location: string;
  };
  vcardText: string;
}

export function useContactData() {
  const { localize, currentLang } = useLanguage();

  // Individual computed properties
  const name = computed(() => localize(data.name));
  const title = computed(() => localize(data.title));
  const location = computed(() => localize(data.contact.location));
  const vcardText = computed(() => localize(data.vcard));

  // Full localized contact object
  const contact = computed<LocalizedContact>(() => ({
    name: localize(data.name),
    title: localize(data.title),
    logo: data.logo,
    socials: data.socials,
    contact: {
      phone: data.contact.phone,
      email: data.contact.email,
      location: localize(data.contact.location),
    },
    vcardText: localize(data.vcard),
  }));

  // Page title for SEO
  const pageTitle = computed(() =>
    currentLang.value === 'ru' ? 'Арсен - Веб-разработчик' : 'Arsen - Web Developer',
  );

  return {
    // Individual fields
    name,
    title,
    logo: data.logo,
    socials: data.socials,
    phone: data.contact.phone,
    email: data.contact.email,
    location,
    vcardText,
    pageTitle,

    // Full object
    contact,
    currentLang,
    raw: data,
  };
}
