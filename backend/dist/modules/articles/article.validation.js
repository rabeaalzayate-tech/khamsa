"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminArticleQuerySchema = exports.publicArticleQuerySchema = exports.updateArticleSchema = exports.createArticleSchema = exports.articleSeoSchema = void 0;
const zod_1 = require("zod");
const common_types_1 = require("../../types/common.types");
exports.articleSeoSchema = zod_1.z
    .object({
    title: zod_1.z.string().max(100).optional(),
    description: zod_1.z.string().max(250).optional(),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
    canonicalUrl: zod_1.z.string().url('Canonical URL must be a valid URL').optional().or(zod_1.z.literal('')),
    ogTitle: zod_1.z.string().max(100).optional(),
    ogDescription: zod_1.z.string().max(250).optional(),
    ogImage: zod_1.z.string().url('OG Image must be a valid URL').optional().or(zod_1.z.literal('')),
})
    .optional();
exports.createArticleSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(3, 'Title must be at least 3 characters').max(200),
    slug: zod_1.z.string().trim().max(200).optional(),
    excerpt: zod_1.z.string().trim().min(10, 'Excerpt must be at least 10 characters').max(500),
    content: zod_1.z.union([zod_1.z.record(zod_1.z.any()), zod_1.z.string().min(1, 'Content cannot be empty')]),
    coverImage: zod_1.z.string().url('Cover image must be a valid URL').optional().nullable(),
    category: zod_1.z.string().trim().min(2, 'Category must be at least 2 characters'),
    tags: zod_1.z.array(zod_1.z.string().trim()).default([]),
    status: zod_1.z.nativeEnum(common_types_1.ContentStatus).default(common_types_1.ContentStatus.DRAFT),
    isFeatured: zod_1.z.boolean().default(false),
    seo: exports.articleSeoSchema,
});
exports.updateArticleSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(3, 'Title must be at least 3 characters').max(200).optional(),
    slug: zod_1.z.string().trim().max(200).optional(),
    excerpt: zod_1.z.string().trim().min(10, 'Excerpt must be at least 10 characters').max(500).optional(),
    content: zod_1.z.union([zod_1.z.record(zod_1.z.any()), zod_1.z.string().min(1)]).optional(),
    coverImage: zod_1.z.string().url('Cover image must be a valid URL').optional().nullable(),
    category: zod_1.z.string().trim().min(2).optional(),
    tags: zod_1.z.array(zod_1.z.string().trim()).optional(),
    status: zod_1.z.nativeEnum(common_types_1.ContentStatus).optional(),
    isFeatured: zod_1.z.boolean().optional(),
    seo: exports.articleSeoSchema,
});
exports.publicArticleQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(1000).default(10),
    search: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    tag: zod_1.z.string().optional(),
    featured: zod_1.z.enum(['true', 'false']).transform(v => v === 'true').optional(),
    sort: zod_1.z.enum(['latest', 'oldest']).default('latest'),
});
exports.adminArticleQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
    search: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    tag: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(common_types_1.ContentStatus).optional(),
    featured: zod_1.z.enum(['true', 'false']).transform(v => v === 'true').optional(),
    sort: zod_1.z.enum(['latest', 'oldest']).default('latest'),
});
