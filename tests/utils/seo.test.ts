import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createOrganizationStructuredData, createWebsiteStructuredData, seo } from '@/utils/seo';

// Mock DOM methods
const mockQuerySelector = vi.fn();
const mockAppendChild = vi.fn();
const mockSetAttribute = vi.fn();
const mockRemove = vi.fn();

Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true,
});

Object.defineProperty(document, 'createElement', {
  value: (tagName: string) => ({
    setAttribute: mockSetAttribute,
    remove: mockRemove,
    tagName: tagName.toUpperCase(),
    textContent: '',
  }),
  writable: true,
});

Object.defineProperty(document, 'head', {
  value: { appendChild: mockAppendChild },
  writable: true,
});

Object.defineProperty(document, 'title', {
  value: '',
  writable: true,
});

describe('sEO Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.title = '';
  });

  describe('seo.setTitle', () => {
    it('should set document title correctly', () => {
      seo.setTitle('Test Page');
      expect(document.title).toBe('Test Page | Studio AW');
    });

    it('should set title without suffix when specified', () => {
      seo.setTitle('Test Page', false);
      expect(document.title).toBe('Test Page');
    });
  });

  describe('seo.setDescription', () => {
    it('should update meta description tags', () => {
      mockQuerySelector.mockReturnValue(null);

      seo.setDescription('Test description');

      expect(mockAppendChild).toHaveBeenCalledTimes(3); // description, og:description, twitter:description
    });
  });

  describe('seo.setKeywords', () => {
    it('should set keywords meta tag', () => {
      mockQuerySelector.mockReturnValue(null);

      seo.setKeywords(['vue', 'typescript', 'vite']);

      expect(mockAppendChild).toHaveBeenCalled();
    });
  });

  describe('seo.setAll', () => {
    it('should set multiple SEO properties at once', () => {
      mockQuerySelector.mockReturnValue(null);

      const config = {
        title: 'Test Page',
        description: 'Test description',
        keywords: ['test', 'page'],
        image: 'https://example.com/image.jpg',
      };

      seo.setAll(config);

      expect(document.title).toBe('Test Page | Studio AW');
      expect(mockAppendChild).toHaveBeenCalledTimes(8); // Multiple meta tags
    });
  });

  describe('createWebsiteStructuredData', () => {
    it('should create correct website structured data', () => {
      const config = {
        name: 'Studio AW',
        url: 'https://studio-aw.ru',
        description: 'Digital agency',
        logo: 'https://studio-aw.ru/logo.png',
      };

      const result = createWebsiteStructuredData(config);

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Studio AW',
        'url': 'https://studio-aw.ru',
        'description': 'Digital agency',
        'logo': 'https://studio-aw.ru/logo.png',
        'sameAs': undefined,
      });
    });
  });

  describe('createOrganizationStructuredData', () => {
    it('should create correct organization structured data', () => {
      const config = {
        name: 'Studio AW',
        url: 'https://studio-aw.ru',
        address: {
          streetAddress: '123 Main St',
          addressLocality: 'Moscow',
          addressRegion: 'Moscow',
          postalCode: '123456',
          addressCountry: 'RU',
        },
        contactPoint: {
          telephone: '+7-123-456-7890',
          contactType: 'customer service',
          email: 'info@studio-aw.ru',
        },
      };

      const result = createOrganizationStructuredData(config);

      expect(result['@type']).toBe('Organization');
      expect(result.name).toBe('Studio AW');
      expect(result.address['@type']).toBe('PostalAddress');
      expect(result.contactPoint['@type']).toBe('ContactPoint');
    });
  });
});
