"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const prisma_config_1 = require("../../config/prisma.config");
const common_types_1 = require("../../types/common.types");
const api_error_1 = require("../../utils/api-error");
const pagination_1 = require("../../utils/pagination");
const AUTHOR_SELECT_FIELDS = {
    id: true,
    name: true,
    email: true,
    avatar: true,
};
class VideoService {
    static async createVideo(data, authorId) {
        const publishedAt = data.status === common_types_1.ContentStatus.PUBLISHED ? new Date() : null;
        const video = await prisma_config_1.prisma.video.create({
            data: {
                title: data.title,
                description: data.description,
                platform: data.platform,
                url: data.url,
                thumbnail: data.thumbnail || null,
                status: data.status || common_types_1.ContentStatus.DRAFT,
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
    static async getPublicVideos(query) {
        const { page, limit, skip } = (0, pagination_1.getPaginationOptions)({
            page: query.page,
            limit: query.limit,
        });
        const where = {
            status: common_types_1.ContentStatus.PUBLISHED,
        };
        if (query.platform) {
            where.platform = query.platform;
        }
        if (query.search) {
            where.OR = [
                { title: { contains: query.search } },
                { description: { contains: query.search } },
            ];
        }
        const orderBy = query.sort === 'oldest' ? { publishedAt: 'asc' } : { publishedAt: 'desc' };
        const [items, total] = await Promise.all([
            prisma_config_1.prisma.video.findMany({
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
            prisma_config_1.prisma.video.count({ where }),
        ]);
        return (0, pagination_1.createPaginatedResult)(items, total, page, limit);
    }
    static async getPublicVideoById(id) {
        const video = await prisma_config_1.prisma.video.findFirst({
            where: {
                id,
                status: common_types_1.ContentStatus.PUBLISHED,
            },
            include: {
                author: {
                    select: AUTHOR_SELECT_FIELDS,
                },
            },
        });
        if (!video) {
            throw api_error_1.ApiError.notFound('Video not found');
        }
        return video;
    }
    static async getAdminVideos(query) {
        const { page, limit, skip } = (0, pagination_1.getPaginationOptions)({
            page: query.page,
            limit: query.limit,
        });
        const where = {};
        if (query.status) {
            where.status = query.status;
        }
        if (query.platform) {
            where.platform = query.platform;
        }
        if (query.search) {
            where.OR = [
                { title: { contains: query.search } },
                { description: { contains: query.search } },
            ];
        }
        const orderBy = query.sort === 'oldest' ? { createdAt: 'asc' } : { createdAt: 'desc' };
        const [items, total] = await Promise.all([
            prisma_config_1.prisma.video.findMany({
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
            prisma_config_1.prisma.video.count({ where }),
        ]);
        return (0, pagination_1.createPaginatedResult)(items, total, page, limit);
    }
    static async getVideoById(id) {
        const video = await prisma_config_1.prisma.video.findUnique({
            where: { id },
            include: {
                author: {
                    select: AUTHOR_SELECT_FIELDS,
                },
            },
        });
        if (!video) {
            throw api_error_1.ApiError.notFound('Video not found');
        }
        return video;
    }
    static async updateVideo(id, data) {
        const video = await prisma_config_1.prisma.video.findUnique({
            where: { id },
        });
        if (!video) {
            throw api_error_1.ApiError.notFound('Video not found');
        }
        let publishedAt = video.publishedAt;
        if (data.status === common_types_1.ContentStatus.PUBLISHED &&
            video.status !== common_types_1.ContentStatus.PUBLISHED &&
            !video.publishedAt) {
            publishedAt = new Date();
        }
        const updateData = {
            publishedAt,
        };
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.platform !== undefined)
            updateData.platform = data.platform;
        if (data.url !== undefined)
            updateData.url = data.url;
        if (data.thumbnail !== undefined)
            updateData.thumbnail = data.thumbnail;
        if (data.status !== undefined)
            updateData.status = data.status;
        const updated = await prisma_config_1.prisma.video.update({
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
    static async publishVideo(id) {
        const video = await prisma_config_1.prisma.video.findUnique({
            where: { id },
        });
        if (!video) {
            throw api_error_1.ApiError.notFound('Video not found');
        }
        const updated = await prisma_config_1.prisma.video.update({
            where: { id },
            data: {
                status: common_types_1.ContentStatus.PUBLISHED,
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
    static async unpublishVideo(id) {
        const video = await prisma_config_1.prisma.video.findUnique({
            where: { id },
        });
        if (!video) {
            throw api_error_1.ApiError.notFound('Video not found');
        }
        const updated = await prisma_config_1.prisma.video.update({
            where: { id },
            data: {
                status: common_types_1.ContentStatus.DRAFT,
            },
            include: {
                author: {
                    select: AUTHOR_SELECT_FIELDS,
                },
            },
        });
        return updated;
    }
    static async deleteVideo(id) {
        const video = await prisma_config_1.prisma.video.findUnique({
            where: { id },
        });
        if (!video) {
            throw api_error_1.ApiError.notFound('Video not found');
        }
        await prisma_config_1.prisma.video.delete({
            where: { id },
        });
    }
}
exports.VideoService = VideoService;
