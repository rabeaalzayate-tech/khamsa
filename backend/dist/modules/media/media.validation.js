"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presignedUrlSchema = exports.listMediaQuerySchema = void 0;
const zod_1 = require("zod");
exports.listMediaQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
    folder: zod_1.z.string().optional(),
    mimeType: zod_1.z.string().optional(),
});
exports.presignedUrlSchema = zod_1.z.object({
    filename: zod_1.z.string().trim().min(1, 'Filename is required'),
    contentType: zod_1.z.enum([
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
    ]),
    folder: zod_1.z.enum(['articles', 'videos', 'general', 'settings']).default('general'),
});
