import type { PopulatedPost, StrapiPost } from "@/types/strapi";
import type { Props } from "@/types";

/**
 * แปลง Strapi post data เป็น frontmatter สำหรับ BlogPostLayout
 */
export function transformPostToFrontmatter(
  post: PopulatedPost,
  strapiUrl: string = "http://localhost:1337"
): Props["frontmatter"] {
  const attrs = post.attributes;

  // Extract author info
  const authorData = attrs.author?.data?.attributes;
  const authorInfo = {
    name: authorData?.name || authorData?.username || "ITSC Team",
    avatar: authorData?.avatar?.data?.attributes?.url
      ? `${strapiUrl}${authorData.avatar.data.attributes.url}`
      : "",
    description: authorData?.bio || "",
  };

  // Extract tags
  const tags =
    attrs.contentTags?.data
      ?.map((tag) => tag.attributes.name)
      .filter(Boolean) || [];

  // Extract related documents
  const relatedDocuments =
    attrs.file?.map((fileBlock) => ({
      title: fileBlock.title || "Document",
      description: fileBlock.description || "",
      href: fileBlock.file?.data?.attributes?.url
        ? `${strapiUrl}${fileBlock.file.data.attributes.url}`
        : "#",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    })) || [];

  // Find hero image
  const heroImageUrl = getHeroImageUrl(attrs, strapiUrl);

  // Generate description
  const description =
    attrs.description ||
    (attrs.body
      ? String(attrs.body)
          .replace(/[#*_>`]/g, "")
          .slice(0, 160)
      : "");

  return {
    title: attrs.title || "Untitled",
    description,
    publishDate: attrs.publishdate || attrs.publishedAt || attrs.createdAt,
    authorInfo,
    tags,
    image: heroImageUrl
      ? {
          src: heroImageUrl,
          alt: attrs.title || "Header image",
          caption: "",
        }
      : {
          src: "/favicon.svg",
          alt: "placeholder",
          caption: "",
        },
    relatedDocuments,
    breadcrumbLinks: [
      { href: "/", label: "หน้าหลัก" },
      { href: "/posts", label: "บทความ" },
      { label: attrs.title || "Untitled" },
    ],
  };
}

// Helper function to find hero image
function getHeroImageUrl(attrs: any, strapiUrl: string): string | null {
  // Check coverImage first
  if (attrs.coverImage?.data?.attributes?.url) {
    return `${strapiUrl}${attrs.coverImage.data.attributes.url}`;
  }

  // Fallback to first media in contentBlocks
  if (attrs.contentBlocks && Array.isArray(attrs.contentBlocks)) {
    for (const block of attrs.contentBlocks) {
      if (block.__component === "shared.media") {
        const mediaUrl =
          block.image?.data?.attributes?.url ||
          block.file?.data?.attributes?.url;
        if (mediaUrl) {
          return `${strapiUrl}${mediaUrl}`;
        }
      }
    }
  }

  return null;
}

/**
 * แปลง content blocks เป็น HTML
 */
export async function renderContentBlocks(
  contentBlocks: StrapiPost["contentBlocks"],
  strapiUrl: string = "http://localhost:1337"
): Promise<string> {
  if (!contentBlocks?.length) return "";

  const { marked } = await import("marked");
  let html = "";

  for (const block of contentBlocks) {
    // Render markdown content
    if (block.body?.trim()) {
      try {
        html += marked.parse(block.body);
      } catch (error) {
        console.warn("Failed to parse markdown:", error);
        html += `<div class="prose-content">${block.body}</div>`;
      }
    }

    // Render media
    const mediaUrl =
      block.image?.data?.attributes?.url || block.file?.data?.attributes?.url;
    if (mediaUrl) {
      const alt =
        block.image?.data?.attributes?.alternativeText ||
        block.title ||
        "image";
      html += `
        <figure class="my-8">
          <img src="${strapiUrl}${mediaUrl}" alt="${alt}" class="w-full h-auto rounded-lg" loading="lazy" />
          ${
            block.description
              ? `<figcaption class="text-center text-sm text-base-content/60 mt-2">${block.description}</figcaption>`
              : ""
          }
        </figure>
      `;
    }
  }

  return html;
}

/**
 * สร้าง query parameters สำหรับ populate ข้อมูล Strapi
 */
export const STRAPI_POST_POPULATE = {
  populate: "*",
} as const;

/**
 * Format date เป็นภาษาไทย
 */
export function formatThaiDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}
