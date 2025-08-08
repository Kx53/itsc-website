// Strapi API Response Types
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T = Record<string, any>> {
  id: number;
  attributes: T;
}

// Post Types
export interface StrapiPost {
  title: string;
  description?: string;
  publishdate: string;
  slug: string;
  body?: string;
  coverImage?: {
    data?: StrapiEntity<StrapiMedia>;
  };
  author?: {
    data?: StrapiEntity<StrapiAuthor>;
  };
  contentTags?: {
    data?: StrapiEntity<StrapiTag>[];
  };
  contentBlocks?: StrapiContentBlock[];
  file?: StrapiFileBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiAuthor {
  name: string;
  username?: string;
  bio?: string;
  avatar?: {
    data?: StrapiEntity<StrapiMedia>;
  };
}

export interface StrapiTag {
  name: string;
  slug?: string;
}

export interface StrapiMedia {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, any>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
}

// Dynamic Zone Content Blocks
export interface StrapiContentBlock {
  __component: string;
  id: number;
  body?: string;
  title?: string;
  description?: string;
  image?: {
    data?: StrapiEntity<StrapiMedia>;
  };
  file?: {
    data?: StrapiEntity<StrapiMedia>;
  };
}

// Repeatable Component for Files
export interface StrapiFileBlock {
  id: number;
  title: string;
  description?: string;
  file?: {
    data?: StrapiEntity<StrapiMedia>;
  };
}

// Helper type for populated post
export type PopulatedPost = StrapiEntity<StrapiPost>;
