"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminVideoQuerySchema = exports.publicVideoQuerySchema = exports.updateVideoSchema = exports.createVideoSchema = exports.isValidPlatformUrl = void 0;
const zod_1 = require("zod");
const common_types_1 = require("../../types/common.types");
const isValidPlatformUrl = (platform, url) => {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
        switch (platform) {
            case common_types_1.VideoPlatform.YOUTUBE:
                return (host === 'youtube.com' ||
                    host === 'm.youtube.com' ||
                    host === 'youtu.be');
            case common_types_1.VideoPlatform.TIKTOK:
                return host === 'tiktok.com' || host === 'vt.tiktok.com' || host === 'vm.tiktok.com';
            case common_types_1.VideoPlatform.FACEBOOK:
                return (host === 'facebook.com' ||
                    host === 'm.facebook.com' ||
                    host === 'fb.watch' ||
                    host === 'web.facebook.com');
            default:
                return false;
        }
    }
    catch {
        return false;
    }
};
exports.isValidPlatformUrl = isValidPlatformUrl;
exports.createVideoSchema = zod_1.z
    .object({
    title: zod_1.z.string().trim().min(3, 'Title must be at least 3 characters').max(200),
    description: zod_1.z
        .string()
        .trim()
        .min(5, 'Description must be at least 5 characters')
        .max(2000),
    platform: zod_1.z.nativeEnum(common_types_1.VideoPlatform),
    url: zod_1.z.string().url('Must be a valid URL'),
    thumbnail: zod_1.z.string().url('Thumbnail must be a valid URL').optional().nullable(),
    status: zod_1.z.nativeEnum(common_types_1.ContentStatus).default(common_types_1.ContentStatus.DRAFT),
})
    .superRefine((data, ctx) => {
    if (!(0, exports.isValidPlatformUrl)(data.platform, data.url)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['url'],
            message: `URL does not match selected platform '${data.platform}'. Expected a valid ${data.platform} URL.`,
        });
    }
});
exports.updateVideoSchema = zod_1.z
    .object({
    title: zod_1.z.string().trim().min(3, 'Title must be at least 3 characters').max(200).optional(),
    description: zod_1.z
        .string()
        .trim()
        .min(5, 'Description must be at least 5 characters')
        .max(2000)
        .optional(),
    platform: zod_1.z.nativeEnum(common_types_1.VideoPlatform).optional(),
    url: zod_1.z.string().url('Must be a valid URL').optional(),
    thumbnail: zod_1.z.string().url('Thumbnail must be a valid URL').optional().nullable(),
    status: zod_1.z.nativeEnum(common_types_1.ContentStatus).optional(),
})
    .superRefine((data, ctx) => {
    if (data.platform && data.url && !(0, exports.isValidPlatformUrl)(data.platform, data.url)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['url'],
            message: `URL does not match selected platform '${data.platform}'. Expected a valid ${data.platform} URL.`,
        });
    }
});
exports.publicVideoQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(1000).default(10),
    search: zod_1.z.string().optional(),
    platform: zod_1.z.nativeEnum(common_types_1.VideoPlatform).optional(),
    sort: zod_1.z.enum(['latest', 'oldest']).default('latest'),
});
exports.adminVideoQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
    search: zod_1.z.string().optional(),
    platform: zod_1.z.nativeEnum(common_types_1.VideoPlatform).optional(),
    status: zod_1.z.nativeEnum(common_types_1.ContentStatus).optional(),
    sort: zod_1.z.enum(['latest', 'oldest']).default('latest'),
});
