"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedLinkService = void 0;
const prisma_config_1 = require("../../config/prisma.config");
const api_error_1 = require("../../utils/api-error");
const pagination_1 = require("../../utils/pagination");
class FeaturedLinkService {
    /**
     * Public: Get all active featured links sorted by order ASC, then newest
     */
    static async getPublicFeaturedLinks() {
        const links = await prisma_config_1.prisma.featuredLink.findMany({
            where: { isActive: true },
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        });
        return links;
    }
    /**
     * Admin: Get all featured links with optional filtering and pagination
     */
    static async getAdminFeaturedLinks(query) {
        const { page, limit, skip } = (0, pagination_1.getPaginationOptions)({
            page: query.page,
            limit: query.limit,
        });
        const where = {};
        if (query.isActive === 'true') {
            where.isActive = true;
        }
        else if (query.isActive === 'false') {
            where.isActive = false;
        }
        if (query.search) {
            where.OR = [
                { title: { contains: query.search } },
                { url: { contains: query.search } },
            ];
        }
        let orderBy = [{ order: 'asc' }, { createdAt: 'desc' }];
        if (query.sort === 'latest') {
            orderBy = [{ createdAt: 'desc' }];
        }
        else if (query.sort === 'oldest') {
            orderBy = [{ createdAt: 'asc' }];
        }
        const [items, total] = await Promise.all([
            prisma_config_1.prisma.featuredLink.findMany({
                where,
                orderBy,
                skip,
                take: limit,
            }),
            prisma_config_1.prisma.featuredLink.count({ where }),
        ]);
        return (0, pagination_1.createPaginatedResult)(items, total, page, limit);
    }
    /**
     * Get a single featured link by ID
     */
    static async getFeaturedLinkById(id) {
        const link = await prisma_config_1.prisma.featuredLink.findUnique({
            where: { id },
        });
        if (!link) {
            throw api_error_1.ApiError.notFound('الرابط المميز غير موجود');
        }
        return link;
    }
    /**
     * Create a new featured link
     */
    static async createFeaturedLink(data) {
        const link = await prisma_config_1.prisma.featuredLink.create({
            data: {
                title: data.title,
                image: data.image,
                url: data.url,
                badge: data.badge || '',
                description: data.description || '',
                ctaText: data.ctaText || '',
                order: Number(data.order) || 0,
                isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
            },
        });
        return link;
    }
    /**
     * Update an existing featured link
     */
    static async updateFeaturedLink(id, data) {
        const link = await prisma_config_1.prisma.featuredLink.findUnique({
            where: { id },
        });
        if (!link) {
            throw api_error_1.ApiError.notFound('الرابط المميز غير موجود');
        }
        const updateData = {};
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.image !== undefined)
            updateData.image = data.image;
        if (data.url !== undefined)
            updateData.url = data.url;
        if (data.badge !== undefined)
            updateData.badge = data.badge;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.ctaText !== undefined)
            updateData.ctaText = data.ctaText;
        if (data.order !== undefined)
            updateData.order = Number(data.order);
        if (data.isActive !== undefined)
            updateData.isActive = Boolean(data.isActive);
        const updated = await prisma_config_1.prisma.featuredLink.update({
            where: { id },
            data: updateData,
        });
        return updated;
    }
    /**
     * Toggle the active status of a featured link
     */
    static async toggleActive(id) {
        const link = await prisma_config_1.prisma.featuredLink.findUnique({
            where: { id },
        });
        if (!link) {
            throw api_error_1.ApiError.notFound('الرابط المميز غير موجود');
        }
        const updated = await prisma_config_1.prisma.featuredLink.update({
            where: { id },
            data: { isActive: !link.isActive },
        });
        return updated;
    }
    /**
     * Delete a featured link by ID
     */
    static async deleteFeaturedLink(id) {
        const link = await prisma_config_1.prisma.featuredLink.findUnique({
            where: { id },
        });
        if (!link) {
            throw api_error_1.ApiError.notFound('الرابط المميز غير موجود');
        }
        await prisma_config_1.prisma.featuredLink.delete({
            where: { id },
        });
    }
}
exports.FeaturedLinkService = FeaturedLinkService;
