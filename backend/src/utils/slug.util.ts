import slugify from 'slugify';
import { prisma } from '../config/prisma.config';

export const generateSlug = (text: string): string => {
  // slugify handles latin and removes special chars
  // For Arabic, we clean special symbols while preserving arabic words
  const baseSlug = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s\u0621-\u064A-]/g, '') // Keep Arabic and alphanumeric
    .replace(/[\s_-]+/g, '-')              // Replace spaces with hyphen
    .replace(/^-+|-+$/g, '');              // Remove leading/trailing hyphens

  return baseSlug || slugify(text, { lower: true, strict: true, trim: true }) || `post-${Date.now()}`;
};

export const getUniqueSlug = async (
  title: string,
  customSlug?: string,
  excludeId?: string,
): Promise<string> => {
  const baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.article.findFirst({
      where: {
        slug: uniqueSlug,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (!existing) {
      break;
    }

    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};
