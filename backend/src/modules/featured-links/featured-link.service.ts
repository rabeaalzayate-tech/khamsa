import { prisma } from '../../config/prisma.config';
import {
  CreateFeaturedLinkDto,
  UpdateFeaturedLinkDto,
  AdminFeaturedLinkQueryDto,
} from './featured-link.validation';
import { PaginatedResult } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';
import { sanitizeFeaturedLink, fixMojibake, resolveFeaturedImage } from '../../utils/text-encoding';

export class FeaturedLinkService {
  /**
   * Public: Get all active featured links sorted by order ASC, then newest
   */
  static async getPublicFeaturedLinks(): Promise<any[]> {
    const links = await prisma.featuredLink.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return links.map(sanitizeFeaturedLink);
  }

  /**
   * Admin: Get all featured links with optional filtering and pagination
   */
  static async getAdminFeaturedLinks(
    query: AdminFeaturedLinkQueryDto,
  ): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const where: any = {};

    if (query.isActive === 'true') {
      where.isActive = true;
    } else if (query.isActive === 'false') {
      where.isActive = false;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { url: { contains: query.search } },
      ];
    }

    let orderBy: any = [{ order: 'asc' }, { createdAt: 'desc' }];
    if (query.sort === 'latest') {
      orderBy = [{ createdAt: 'desc' }];
    } else if (query.sort === 'oldest') {
      orderBy = [{ createdAt: 'asc' }];
    }

    const [items, total] = await Promise.all([
      prisma.featuredLink.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.featuredLink.count({ where }),
    ]);

    return createPaginatedResult(items.map(sanitizeFeaturedLink), total, page, limit);
  }

  /**
   * Get a single featured link by ID
   */
  static async getFeaturedLinkById(id: string): Promise<any> {
    const link = await prisma.featuredLink.findUnique({
      where: { id },
    });

    if (!link) {
      throw ApiError.notFound('الرابط المميز غير موجود');
    }

    return sanitizeFeaturedLink(link);
  }

  /**
   * Create a new featured link
   */
  static async createFeaturedLink(
    data: CreateFeaturedLinkDto,
  ): Promise<any> {
    const link = await prisma.featuredLink.create({
      data: {
        title: fixMojibake(data.title),
        image: resolveFeaturedImage(data.image, data.url),
        url: data.url,
        badge: data.badge ? fixMojibake(data.badge) : '',
        description: data.description ? fixMojibake(data.description) : '',
        ctaText: data.ctaText ? fixMojibake(data.ctaText) : '',
        order: Number(data.order) || 0,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    return sanitizeFeaturedLink(link);
  }

  /**
   * Update an existing featured link
   */
  static async updateFeaturedLink(
    id: string,
    data: UpdateFeaturedLinkDto,
  ): Promise<any> {
    const link = await prisma.featuredLink.findUnique({
      where: { id },
    });

    if (!link) {
      throw ApiError.notFound('الرابط المميز غير موجود');
    }

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = fixMojibake(data.title);
    if (data.image !== undefined) updateData.image = resolveFeaturedImage(data.image, data.url ?? link.url);
    if (data.url !== undefined) updateData.url = data.url;
    if (data.badge !== undefined) updateData.badge = fixMojibake(data.badge);
    if (data.description !== undefined) updateData.description = fixMojibake(data.description);
    if (data.ctaText !== undefined) updateData.ctaText = fixMojibake(data.ctaText);
    if (data.order !== undefined) updateData.order = Number(data.order);
    if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive);

    const updated = await prisma.featuredLink.update({
      where: { id },
      data: updateData,
    });

    return sanitizeFeaturedLink(updated);
  }

  /**
   * Toggle the active status of a featured link
   */
  static async toggleActive(id: string): Promise<any> {
    const link = await prisma.featuredLink.findUnique({
      where: { id },
    });

    if (!link) {
      throw ApiError.notFound('الرابط المميز غير موجود');
    }

    const updated = await prisma.featuredLink.update({
      where: { id },
      data: { isActive: !link.isActive },
    });

    return updated;
  }

  /**
   * Delete a featured link by ID
   */
  static async deleteFeaturedLink(id: string): Promise<void> {
    const link = await prisma.featuredLink.findUnique({
      where: { id },
    });

    if (!link) {
      throw ApiError.notFound('الرابط المميز غير موجود');
    }

    await prisma.featuredLink.delete({
      where: { id },
    });
  }
}
