/**
 * Wiki Types
 */

import type { LocalizedText } from './portfolio';

export type WikiNodeVariant = 'primary' | 'accent' | 'success' | 'warning' | 'muted';

export interface WikiTreeNode {
  name: string;
  desc?: LocalizedText;
  tag?: LocalizedText;
  variant?: WikiNodeVariant;
  highlight?: boolean;
  children?: WikiTreeNode[];
}

export interface WikiTreeSection {
  root: WikiTreeNode;
  separatorAfter?: boolean;
}

export type WikiBlock
  = | { kind: 'heading'; text: LocalizedText; level?: 2 | 3 }
    | { kind: 'paragraph'; text: LocalizedText }
    | { kind: 'tree'; sections: WikiTreeSection[] }
    | { kind: 'callout'; tone?: 'info' | 'warning' | 'tip'; title?: LocalizedText; text: LocalizedText };

export interface WikiArticle {
  slug: string;
  category: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  intro?: LocalizedText;
  blocks: WikiBlock[];
}

export interface WikiCategory {
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  icon?: string;
}

export interface LocalizedWikiArticle {
  slug: string;
  category: string;
  title: string;
  subtitle?: string;
  intro?: string;
}

export interface LocalizedWikiCategory {
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  articles: LocalizedWikiArticle[];
}
