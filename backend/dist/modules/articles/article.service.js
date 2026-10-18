"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const prisma_config_1 = require("../../config/prisma.config");
const common_types_1 = require("../../types/common.types");
const api_error_1 = require("../../utils/api-error");
const pagination_1 = require("../../utils/pagination");
const slug_util_1 = require("../../utils/slug.util");
const AUTHOR_SELECT_FIELDS = {
    id: true,
    name: true,
    email: true,
    avatar: true,
    bio: true,
    socials: true,
    role: true,
};
class ArticleService {
    static async createArticle(data, authorId) {
        const slug = await (0, slug_util_1.getUniqueSlug)(data.title, data.slug);
        const publishedAt = data.status === common_types_1.ContentStatus.PUBLISHED ? new Date() : null;
        const article = await prisma_config_1.prisma.article.create({
            data: {
                title: data.title,
                slug,
                excerpt: data.excerpt,
                content: data.content,
                coverImage: data.coverImage || null,
                category: data.category,
                tags: Array.isArray(data.tags) ? data.tags : [],
                authorId,
                status: data.status || common_types_1.ContentStatus.DRAFT,
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
    static async getPublicArticles(query) {
        const { page, limit, skip } = (0, pagination_1.getPaginationOptions)({
            page: query.page,
            limit: query.limit,
        });
        const where = {
            status: common_types_1.ContentStatus.PUBLISHED,
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
        const orderBy = query.sort === 'oldest' ? { publishedAt: 'asc' } : { publishedAt: 'desc' };
        const [items, total] = await Promise.all([
            prisma_config_1.prisma.article.findMany({
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
            prisma_config_1.prisma.article.count({ where }),
        ]);
        // In-memory tag filter if requested (since tags are stored as JSON array in MySQL)
        let filteredItems = items;
        if (query.tag) {
            const targetTag = query.tag.toLowerCase();
            filteredItems = items.filter(item => {
                const tags = Array.isArray(item.tags) ? item.tags : [];
                return tags.some(t => String(t).toLowerCase() === targetTag);
            });
        }
        return (0, pagination_1.createPaginatedResult)(filteredItems, total, page, limit);
    }
    static async getPublicArticleBySlug(slug) {
        const article = await prisma_config_1.prisma.article.findFirst({
            where: {
                slug: slug.toLowerCase(),
                status: common_types_1.ContentStatus.PUBLISHED,
            },
            include: {
                author: {
                    select: AUTHOR_SELECT_FIELDS,
                },
            },
        });
        if (!article) {
            throw api_error_1.ApiError.notFound('Article not found');
        }
        return article;
    }
    static async getAdminArticles(query) {
        const { page, limit, skip } = (0, pagination_1.getPaginationOptions)({
            page: query.page,
            limit: query.limit,
        });
        const where = {};
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
        const orderBy = query.sort === 'oldest' ? { createdAt: 'asc' } : { createdAt: 'desc' };
        const [items, total] = await Promise.all([
            prisma_config_1.prisma.article.findMany({
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
            prisma_config_1.prisma.article.count({ where }),
        ]);
        let filteredItems = items;
        if (query.tag) {
            const targetTag = query.tag.toLowerCase();
            filteredItems = items.filter(item => {
                const tags = Array.isArray(item.tags) ? item.tags : [];
                return tags.some(t => String(t).toLowerCase() === targetTag);
            });
        }
        return (0, pagination_1.createPaginatedResult)(filteredItems, total, page, limit);
    }
    static async getArticleById(id) {
        const article = await prisma_config_1.prisma.article.findUnique({
            where: { id },
            include: {
                author: {
                    select: AUTHOR_SELECT_FIELDS,
                },
            },
        });
        if (!article) {
            throw api_error_1.ApiError.notFound('Article not found');
        }
        return article;
    }
    static async updateArticle(id, data) {
        const article = await prisma_config_1.prisma.article.findUnique({
            where: { id },
        });
        if (!article) {
            throw api_error_1.ApiError.notFound('Article not found');
        }
        let slug = article.slug;
        if (data.title || data.slug) {
            const targetTitle = data.title || article.title;
            slug = await (0, slug_util_1.getUniqueSlug)(targetTitle, data.slug, id);
        }
        let publishedAt = article.publishedAt;
        if (data.status === common_types_1.ContentStatus.PUBLISHED &&
            article.status !== common_types_1.ContentStatus.PUBLISHED &&
            !article.publishedAt) {
            publishedAt = new Date();
        }
        const updateData = {
            slug,
            publishedAt,
        };
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.excerpt !== undefined)
            updateData.excerpt = data.excerpt;
        if (data.content !== undefined)
            updateData.content = data.content;
        if (data.coverImage !== undefined)
            updateData.coverImage = data.coverImage;
        if (data.category !== undefined)
            updateData.category = data.category;
        if (data.tags !== undefined)
            updateData.tags = data.tags;
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.isFeatured !== undefined)
            updateData.isFeatured = data.isFeatured;
        if (data.seo !== undefined)
            updateData.seo = data.seo;
        const updated = await prisma_config_1.prisma.article.update({
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
    static async publishArticle(id) {
        const article = await prisma_config_1.prisma.article.findUnique({
            where: { id },
        });
        if (!article) {
            throw api_error_1.ApiError.notFound('Article not found');
        }
        const updated = await prisma_config_1.prisma.article.update({
            where: { id },
            data: {
                status: common_types_1.ContentStatus.PUBLISHED,
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
    static async unpublishArticle(id) {
        const article = await prisma_config_1.prisma.article.findUnique({
            where: { id },
        });
        if (!article) {
            throw api_error_1.ApiError.notFound('Article not found');
        }
        const updated = await prisma_config_1.prisma.article.update({
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
    static async deleteArticle(id) {
        const article = await prisma_config_1.prisma.article.findUnique({
            where: { id },
        });
        if (!article) {
            throw api_error_1.ApiError.notFound('Article not found');
        }
        await prisma_config_1.prisma.article.delete({
            where: { id },
        });
    }
}
exports.ArticleService = ArticleService;
