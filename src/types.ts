// src/types.ts

// Interface for individual breadcrumb links
export interface BreadcrumbLink {
  href?: string;
  label: string;
  icon?: string;
}

// Interface for related documents
export interface Document {
  title: string;
  description: string;
  href: string;
  icon: string;
}

// Interface for author information
export interface Author {
  name: string;
  description: string;
  avatar: string;
}

// Main props interface for blog posts, referencing the other interfaces
export interface Props {
  frontmatter: {
    title: string;
    description: string;
    publishDate: string;
    authorInfo: Author;
    tags: string[];
    image: {
      src: string;
      alt: string;
      caption?: string;
    };
    relatedDocuments: Document[];
    breadcrumbLinks: BreadcrumbLink[];
  };
}
