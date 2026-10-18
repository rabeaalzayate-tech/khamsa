"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersQuerySchema = exports.changeUserPasswordSchema = exports.updateUserSchema = exports.createUserSchema = exports.userSocialsSchema = void 0;
const zod_1 = require("zod");
const common_types_1 = require("../../types/common.types");
exports.userSocialsSchema = zod_1.z
    .object({
    github: zod_1.z.string().trim().url('Invalid GitHub URL').or(zod_1.z.literal('')).optional().nullable(),
    linkedin: zod_1.z.string().trim().url('Invalid LinkedIn URL').or(zod_1.z.literal('')).optional().nullable(),
    youtube: zod_1.z.string().trim().url('Invalid YouTube URL').or(zod_1.z.literal('')).optional().nullable(),
    facebook: zod_1.z.string().trim().url('Invalid Facebook URL').or(zod_1.z.literal('')).optional().nullable(),
    twitter: zod_1.z.string().trim().url('Invalid Twitter/X URL').or(zod_1.z.literal('')).optional().nullable(),
    tiktok: zod_1.z.string().trim().url('Invalid TikTok URL').or(zod_1.z.literal('')).optional().nullable(),
    website: zod_1.z.string().trim().url('Invalid Website URL').or(zod_1.z.literal('')).optional().nullable(),
    whatsapp: zod_1.z.string().trim().url('Invalid WhatsApp URL').or(zod_1.z.literal('')).optional().nullable(),
    mostaql: zod_1.z.string().trim().url('Invalid Mostaql URL').or(zod_1.z.literal('')).optional().nullable(),
})
    .optional()
    .nullable();
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
    email: zod_1.z.string().trim().email('Invalid email address').toLowerCase(),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    role: zod_1.z.nativeEnum(common_types_1.UserRole).default(common_types_1.UserRole.EDITOR),
    avatar: zod_1.z.string().url('Avatar must be a valid URL').or(zod_1.z.literal('')).optional().nullable(),
    bio: zod_1.z.string().trim().max(1000, 'Bio cannot exceed 1000 characters').optional().nullable(),
    socials: exports.userSocialsSchema,
    isActive: zod_1.z.boolean().default(true),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'Name must be at least 2 characters').max(100).optional(),
    email: zod_1.z.string().trim().email('Invalid email address').toLowerCase().optional(),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .optional(),
    role: zod_1.z.nativeEnum(common_types_1.UserRole).optional(),
    avatar: zod_1.z.string().url('Avatar must be a valid URL').or(zod_1.z.literal('')).optional().nullable(),
    bio: zod_1.z.string().trim().max(1000, 'Bio cannot exceed 1000 characters').optional().nullable(),
    socials: exports.userSocialsSchema,
    isActive: zod_1.z.boolean().optional(),
});
exports.changeUserPasswordSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
});
exports.listUsersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
    search: zod_1.z.string().optional(),
    role: zod_1.z.nativeEnum(common_types_1.UserRole).optional(),
    isActive: zod_1.z.enum(['true', 'false']).transform(val => val === 'true').optional(),
    sort: zod_1.z.enum(['latest', 'oldest', 'name_asc', 'name_desc']).default('latest').optional(),
});
