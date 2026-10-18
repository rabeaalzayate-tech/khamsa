"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFeaturedLinkQuerySchema = exports.updateFeaturedLinkSchema = exports.createFeaturedLinkSchema = void 0;
const zod_1 = require("zod");
exports.createFeaturedLinkSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(2, 'العنوان يجب أن يكون حرفين على الأقل')
        .max(200, 'العنوان لا يمكن أن يتجاوز 200 حرف'),
    image: zod_1.z
        .string()
        .trim()
        .url('رابط الصورة غير صالح'),
    url: zod_1.z
        .string()
        .trim()
        .url('الرابط يجب أن يكون URL صالحاً ومكتملاً (مثال: https://...)'),
    badge: zod_1.z.string().trim().max(50).optional(),
    description: zod_1.z.string().trim().max(300).optional(),
    ctaText: zod_1.z.string().trim().max(50).optional(),
    order: zod_1.z.coerce.number().int().default(0),
    isActive: zod_1.z.boolean().default(true),
});
exports.updateFeaturedLinkSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(2, 'العنوان يجب أن يكون حرفين على الأقل')
        .max(200, 'العنوان لا يمكن أن يتجاوز 200 حرف')
        .optional(),
    image: zod_1.z
        .string()
        .trim()
        .url('رابط الصورة غير صالح')
        .optional(),
    url: zod_1.z
        .string()
        .trim()
        .url('الرابط يجب أن يكون URL صالحاً ومكتملاً (مثال: https://...)')
        .optional(),
    badge: zod_1.z.string().trim().max(50).optional(),
    description: zod_1.z.string().trim().max(300).optional(),
    ctaText: zod_1.z.string().trim().max(50).optional(),
    order: zod_1.z.coerce.number().int().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.adminFeaturedLinkQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(50),
    search: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(['true', 'false', 'all']).optional(),
    sort: zod_1.z.enum(['order_asc', 'latest', 'oldest']).default('order_asc'),
});
