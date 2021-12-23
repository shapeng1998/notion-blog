import type { FormattedDate } from 'notion-types';

/**
 * Page properties type.
 */
export interface PageProperties {
  [propertyName: string]: any;

  id: string;
  createdTime: string;

  title?: string;
  slug?: string;
  date?: FormattedDate;
  summary?: string;
  tags?: string[];

  /** Published | Idea | Draft | Revise */
  status?: string;

  /** Page | Post */
  type?: string;
}

/**
 * Container page metadatas.
 */
export interface CustomMeta {
  slug?: string;
  date?: string;
  createdTime?: string;
  layout?: string;
  title?: string;
  description?: string;
  type?: 'article' | 'website';
}
