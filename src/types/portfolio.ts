/**
 * Portfolio Types
 * Centralized TypeScript interfaces for portfolio data
 */

// ============================================
// Core Types
// ============================================

export type Language = 'ru' | 'en';

export interface LocalizedText {
  ru: string;
  en: string;
}

// ============================================
// Section Data Types
// ============================================

export interface TechItem {
  name: string;
  icon: string;
  description: LocalizedText;
}

export interface ProjectItem {
  name: string;
  company: string;
  description: LocalizedText;
  logo?: string;
  image?: string;
  tags: string[];
  isAWStudio?: boolean;
  detailsLink?: string;
}

export interface WorkItem {
  title: string;
  description: LocalizedText;
  icon?: string;
  image?: string;
  link?: string;
  tags: string[];
  isAWStudio?: boolean;
}

export interface TeamItem {
  name: string;
  description: LocalizedText;
  logo: string;
  since: string;
  tags: string[];
}

export interface ServiceItem {
  name: string;
  tagline: LocalizedText;
  icon: string;
  description: LocalizedText;
  features: LocalizedText[];
}

// ============================================
// Contact Types
// ============================================

export interface ContactInfo {
  phone: string;
  email: string;
  location: LocalizedText;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactData {
  name: LocalizedText;
  title: LocalizedText;
  logo: string;
  socials: SocialLink[];
  contact: ContactInfo;
  vcard: LocalizedText;
}

// ============================================
// Localized Output Types (for computed properties)
// ============================================

export interface LocalizedService {
  name: string;
  tagline: string;
  icon: string;
  description: string;
  features: string[];
}

export interface LocalizedProject {
  name: string;
  company: string;
  description: string;
  logo?: string;
  image?: string;
  tags: string[];
  isAWStudio?: boolean;
  detailsLink?: string;
}

export interface LocalizedWork {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  link?: string;
  tags: string[];
  isAWStudio?: boolean;
}

export interface LocalizedTeam {
  name: string;
  description: string;
  logo: string;
  since: string;
  tags: string[];
}

export interface LocalizedTech {
  name: string;
  icon: string;
  description: string;
}
