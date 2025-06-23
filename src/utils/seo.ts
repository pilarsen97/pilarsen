// interface _MetaTag {
//   name?: string;
//   property?: string;
//   content: string;
//   key?: string;
// }

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
}

class SEOManager {
  private defaultConfig: SEOConfig = {
    siteName: 'Studio AW',
    type: 'website',
    locale: 'ru_RU',
    twitterCard: 'summary_large_image',
  };

  setTitle(title: string, suffix = true): void {
    const fullTitle = suffix && this.defaultConfig.siteName
      ? `${title} | ${this.defaultConfig.siteName}`
      : title;

    document.title = fullTitle;
    this.updateMetaTag('property', 'og:title', fullTitle);
    this.updateMetaTag('name', 'twitter:title', fullTitle);
  }

  setDescription(description: string): void {
    this.updateMetaTag('name', 'description', description);
    this.updateMetaTag('property', 'og:description', description);
    this.updateMetaTag('name', 'twitter:description', description);
  }

  setKeywords(keywords: string[]): void {
    this.updateMetaTag('name', 'keywords', keywords.join(', '));
  }

  setImage(imageUrl: string): void {
    this.updateMetaTag('property', 'og:image', imageUrl);
    this.updateMetaTag('name', 'twitter:image', imageUrl);
  }

  setUrl(url: string): void {
    this.updateMetaTag('property', 'og:url', url);

    const canonical = this.getLinkTag('canonical');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
    else {
      this.createLinkTag('canonical', url);
    }
  }

  setType(type: string): void {
    this.updateMetaTag('property', 'og:type', type);
  }

  setSiteName(siteName: string): void {
    this.defaultConfig.siteName = siteName;
    this.updateMetaTag('property', 'og:site_name', siteName);
  }

  setLocale(locale: string): void {
    this.defaultConfig.locale = locale;
    this.updateMetaTag('property', 'og:locale', locale);

    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', locale.split('_')[0]);
  }

  setTwitterCard(card: 'summary' | 'summary_large_image' | 'app' | 'player'): void {
    this.defaultConfig.twitterCard = card;
    this.updateMetaTag('name', 'twitter:card', card);
  }

  setTwitterSite(site: string): void {
    this.defaultConfig.twitterSite = site;
    this.updateMetaTag('name', 'twitter:site', site);
  }

  setTwitterCreator(creator: string): void {
    this.defaultConfig.twitterCreator = creator;
    this.updateMetaTag('name', 'twitter:creator', creator);
  }

  setAll(config: SEOConfig): void {
    if (config.title)
      this.setTitle(config.title);
    if (config.description)
      this.setDescription(config.description);
    if (config.keywords)
      this.setKeywords(config.keywords);
    if (config.image)
      this.setImage(config.image);
    if (config.url)
      this.setUrl(config.url);
    if (config.type)
      this.setType(config.type);
    if (config.siteName)
      this.setSiteName(config.siteName);
    if (config.locale)
      this.setLocale(config.locale);
    if (config.twitterCard)
      this.setTwitterCard(config.twitterCard);
    if (config.twitterSite)
      this.setTwitterSite(config.twitterSite);
    if (config.twitterCreator)
      this.setTwitterCreator(config.twitterCreator);
  }

  private updateMetaTag(type: 'name' | 'property', key: string, content: string): void {
    let meta = this.getMetaTag(type, key);

    if (meta) {
      meta.setAttribute('content', content);
    }
    else {
      meta = document.createElement('meta');
      meta.setAttribute(type, key);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  }

  private getMetaTag(type: 'name' | 'property', key: string): HTMLMetaElement | null {
    return document.querySelector(`meta[${type}="${key}"]`);
  }

  private getLinkTag(rel: string): HTMLLinkElement | null {
    return document.querySelector(`link[rel="${rel}"]`);
  }

  private createLinkTag(rel: string, href: string): void {
    const link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }

  addStructuredData(data: object): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  removeStructuredData(): void {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => script.remove());
  }

  getDefaultConfig(): SEOConfig {
    return { ...this.defaultConfig };
  }
}

export const seo = new SEOManager();

export function createWebsiteStructuredData(config: {
  name: string;
  url: string;
  description?: string;
  logo?: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': config.name,
    'url': config.url,
    'description': config.description,
    'logo': config.logo,
    'sameAs': config.sameAs,
  };
}

export function createOrganizationStructuredData(config: {
  name: string;
  url: string;
  logo?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': config.name,
    'url': config.url,
    'logo': config.logo,
    'address': config.address && {
      '@type': 'PostalAddress',
      ...config.address,
    },
    'contactPoint': config.contactPoint && {
      '@type': 'ContactPoint',
      ...config.contactPoint,
    },
    'sameAs': config.sameAs,
  };
}

export function createBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
}
