import { prisma } from '../../config/prisma.config';
import {
  CreateVideoDto,
  UpdateVideoDto,
  PublicVideoQueryDto,
  AdminVideoQueryDto,
} from './video.validation';
import { ContentStatus, PaginatedResult, VideoPlatform } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';

const AUTHOR_SELECT_FIELDS = {
  id: true,
  name: true,
  email: true,
  avatar: true,
};

export class VideoService {
  static async createVideo(
    data: CreateVideoDto,
    authorId: string,
  ): Promise<any> {
    const publishedAt =
      data.status === ContentStatus.PUBLISHED ? new Date() : null;

    const video = await prisma.video.create({
      data: {
        title: data.title,
        description: data.description,
        platform: data.platform as VideoPlatform,
        url: data.url,
        thumbnail: data.thumbnail || null,
        status: (data.status as ContentStatus) || ContentStatus.DRAFT,
        authorId,
        publishedAt,
      },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    return video;
  }

  static async getPublicVideos(
    query: PublicVideoQueryDto,
  ): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const where: any = {
      status: ContentStatus.PUBLISHED,
    };

    if (query.platform) {
      where.platform = query.platform as VideoPlatform;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const orderBy: any =
      query.sort === 'oldest' ? { publishedAt: 'asc' } : { publishedAt: 'desc' };

    const [items, total] = await Promise.all([
      prisma.video.findMany({
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
      prisma.video.count({ where }),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async getPublicVideoById(id: string): Promise<any> {
    const video = await prisma.video.findFirst({
      where: {
        id,
        status: ContentStatus.PUBLISHED,
      },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    return video;
  }

  static async getAdminVideos(
    query: AdminVideoQueryDto,
  ): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const where: any = {};

    if (query.status) {
      where.status = query.status as ContentStatus;
    }

    if (query.platform) {
      where.platform = query.platform as VideoPlatform;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const orderBy: any =
      query.sort === 'oldest' ? { createdAt: 'asc' } : { createdAt: 'desc' };

    const [items, total] = await Promise.all([
      prisma.video.findMany({
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
      prisma.video.count({ where }),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async getVideoById(id: string): Promise<any> {
    const video = await prisma.video.findUnique({
      where: { id },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    return video;
  }

  static async updateVideo(
    id: string,
    data: UpdateVideoDto,
  ): Promise<any> {
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    let publishedAt = video.publishedAt;
    if (
      data.status === ContentStatus.PUBLISHED &&
      video.status !== ContentStatus.PUBLISHED &&
      !video.publishedAt
    ) {
      publishedAt = new Date();
    }

    const updateData: any = {
      publishedAt,
    };

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.platform !== undefined) updateData.platform = data.platform as VideoPlatform;
    if (data.url !== undefined) updateData.url = data.url;
    if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;
    if (data.status !== undefined) updateData.status = data.status as ContentStatus;

    const updated = await prisma.video.update({
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

  static async publishVideo(id: string): Promise<any> {
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    const updated = await prisma.video.update({
      where: { id },
      data: {
        status: ContentStatus.PUBLISHED,
        publishedAt: video.publishedAt || new Date(),
      },
      include: {
        author: {
          select: AUTHOR_SELECT_FIELDS,
        },
      },
    });

    return updated;
  }

  static async unpublishVideo(id: string): Promise<any> {
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    const updated = await prisma.video.update({
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

  static async deleteVideo(id: string): Promise<void> {
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    await prisma.video.delete({
      where: { id },
    });
  }
}
