// src/utils/readingTime.ts

/**
 * Estimates the reading time for a given text content.
 * @param content The text content to analyze.
 * @returns The estimated reading time in minutes.
 */
export async function calculateReadingTime(content: string): Promise<number> {
  const wordsPerMinute = 200;
  // Use a regular expression to split by any whitespace character
  const textLength = content.trim().split(/\s+/).length;

  if (textLength > 0) {
    return Math.ceil(textLength / wordsPerMinute);
  }

  return 0;
}
