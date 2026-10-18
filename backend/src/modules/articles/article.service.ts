import { prisma } from '../../config/prisma.config';
import {
  CreateArticleDto,
  UpdateArticleDto,
  PublicArticleQueryDto,
  AdminArticleQueryDto,
} from './article.validation';
import { ContentStatus, PaginatedResult } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';
import { getUniqueSlug } from '../../utils/slug.util';

const AUTHOR_SELECT_FIELDS = {
  id: true,
  name: true,
  email: true,
  avatar: true,
  bio: true,
  socials: true,
  role: true,
};

export class ArticleService {
  static async createArticle(
    data: CreateArticleDto,
    authorId: string,
  ): Promise<any> {
    const slug = await getUniqueSlug(data.title, data.slug);

    const publishedAt =
      data.status === ContentStatus.PUBLISHED ? new Date() : null;

    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        category: data.category,
        tags: Array.isArray(data.tags) ? data.tags : [],
        authorId,
        status: (data.status as ContentStatus) || ContentStatus.DRAFT,
        isFeatured: Boolean(data.isFeatured),
        seo: data.seo || {},
        publishedAt,
      },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    return article;
  }

  static async getPublicArticles(
    query: PublicArticleQueryDto,
  ): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const where: any = {
      status: ContentStatus.PUBLISHED,
    };

    if (query.category) {
      where.category = query.category;
    }

    if (query.featured !== undefined) {
      where.isFeatured = query.featured;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { excerpt: { contains: query.search } },
      ];
    }

    const orderBy: any =
      query.sort === 'oldest' ? { publishedAt: 'asc' } : { publishedAt: 'desc' };

    const [items, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: AUTHOR_SELECT_FIELDS,
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    // In-memory tag filter if requested (since tags are stored as JSON array in MySQL)
    let filteredItems = items;
    if (query.tag) {
      const targetTag = query.tag.toLowerCase();
      filteredItems = items.filter(item => {
        const tags = Array.isArray(item.tags) ? (item.tags as string[]) : [];
        return tags.some(t => String(t).toLowerCase() === targetTag);
      });
    }

    return createPaginatedResult(filteredItems, total, page, limit);
  }

  static async getPublicArticleBySlug(slug: string): Promise<any> {
    const article = await prisma.article.findFirst({
      where: {
        slug: slug.toLowerCase(),
        status: ContentStatus.PUBLISHED,
      },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    return article;
  }

  static async getAdminArticles(
    query: AdminArticleQueryDto,
  ): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const where: any = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.featured !== undefined) {
      where.isFeatured = query.featured;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { excerpt: { contains: query.search } },
      ];
    }

    const orderBy: any =
      query.sort === 'oldest' ? { createdAt: 'asc' } : { createdAt: 'desc' };

    const [items, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: AUTHOR_SELECT_FIELDS,
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    let filteredItems = items;
    if (query.tag) {
      const targetTag = query.tag.toLowerCase();
      filteredItems = items.filter(item => {
        const tags = Array.isArray(item.tags) ? (item.tags as string[]) : [];
        return tags.some(t => String(t).toLowerCase() === targetTag);
      });
    }

    return createPaginatedResult(filteredItems, total, page, limit);
  }

  static async getArticleById(id: string): Promise<any> {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    return article;
  }

  static async updateArticle(
    id: string,
    data: UpdateArticleDto,
  ): Promise<any> {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    let slug = article.slug;
    if (data.title || data.slug) {
      const targetTitle = data.title || article.title;
      slug = await getUniqueSlug(targetTitle, data.slug, id);
    }

    let publishedAt = article.publishedAt;
    if (
      data.status === ContentStatus.PUBLISHED &&
      article.status !== ContentStatus.PUBLISHED &&
      !article.publishedAt
    ) {
      publishedAt = new Date();
    }

    const updateData: any = {
      slug,
      publishedAt,
    };

    if (data.title !== undefined) updateData.title = data.title;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.coverImage !== undefined) updateData.coverImage = data.coverImage;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured;
    if (data.seo !== undefined) updateData.seo = data.seo;

    const updated = await prisma.article.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    return updated;
  }

  static async publishArticle(id: string): Promise<any> {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        status: ContentStatus.PUBLISHED,
        publishedAt: article.publishedAt || new Date(),
      },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    return updated;
  }

  static async unpublishArticle(id: string): Promise<any> {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        status: ContentStatus.DRAFT,
      },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    return updated;
  }

  static async deleteArticle(id: string): Promise<void> {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    await prisma.article.delete({
      where: { id },
    });
  }
}
