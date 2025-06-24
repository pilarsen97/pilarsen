import type { Ref } from 'vue';
import { computed, watch } from 'vue';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export function useSEO(currentLang: Ref<'ru' | 'en'>) {
  const seoData = computed(() => ({
    ru: {
      title: 'Арсен - Веб-разработчик | Studio AW',
      description: 'Профессиональная разработка сайтов, SEO-оптимизация и создание чат-ботов. Веб-разработчик с опытом с 2012 года. Vue.js, TypeScript, современные технологии.',
      keywords: [
        'веб-разработка',
        'создание сайтов',
        'Vue.js',
        'TypeScript',
        'SEO',
        'чат-боты',
        'Studio AW',
        'Арсен',
        'фронтенд',
        'разработчик',
      ],
      ogImage: '/og-image.jpg',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
    en: {
      title: 'Arsen - Web Developer | Studio AW',
      description: 'Professional website development, SEO optimization and chatbot creation. Web developer with experience since 2012. Vue.js, TypeScript, modern technologies.',
      keywords: [
        'web development',
        'website creation',
        'Vue.js',
        'TypeScript',
        'SEO',
        'chatbots',
        'Studio AW',
        'Arsen',
        'frontend',
        'developer',
      ],
      ogImage: '/og-image.jpg',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
  }));

  function updateMetaTag(name: string, content: string, type: 'name' | 'property' = 'name') {
    let meta = document.querySelector(`meta[${type}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(type, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  function setTitle(title: string) {
    document.title = title;
  }

  function updateSEO(data: SEOData) {
    // Update title
    setTitle(data.title);

    // Update basic meta tags
    updateMetaTag('description', data.description);
    updateMetaTag('keywords', data.keywords.join(', '));

    // Update Open Graph tags
    updateMetaTag('og:title', data.title, 'property');
    updateMetaTag('og:description', data.description, 'property');
    updateMetaTag('og:url', window.location.href, 'property');
    updateMetaTag('og:type', data.ogType || 'website', 'property');

    if (data.ogImage) {
      updateMetaTag('og:image', data.ogImage, 'property');
    }

    // Update Twitter Card tags
    updateMetaTag('twitter:card', data.twitterCard || 'summary_large_image');
    updateMetaTag('twitter:title', data.title);
    updateMetaTag('twitter:description', data.description);

    if (data.ogImage) {
      updateMetaTag('twitter:image', data.ogImage);
    }

    // Update language
    document.documentElement.lang = currentLang.value;
  }

  // Watch for language changes and update SEO
  watch(currentLang, (lang) => {
    const data = seoData.value[lang];
    updateSEO(data);
  }, { immediate: true });

  // Add structured data for better search results
  function addStructuredData() {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Arsen',
      'jobTitle': 'Web Developer',
      'worksFor': {
        '@type': 'Organization',
        'name': 'Studio AW',
      },
      'description': currentLang.value === 'ru'
        ? 'Веб-разработчик с опытом с 2012 года'
        : 'Web developer with experience since 2012',
      'knowsAbout': [
        'Vue.js',
        'TypeScript',
        'Web Development',
        'SEO',
        'Frontend Development',
      ],
      'url': window.location.origin,
      'sameAs': [
        // Add social media links when available
      ],
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  // Add structured data on mount
  addStructuredData();

  return {
    seoData,
    updateSEO,
    addStructuredData,
  };
}
