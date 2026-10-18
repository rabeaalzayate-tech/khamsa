"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueSlug = exports.generateSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
const prisma_config_1 = require("../config/prisma.config");
const generateSlug = (text) => {
    // slugify handles latin and removes special chars
    // For Arabic, we clean special symbols while preserving arabic words
    const baseSlug = text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s\u0621-\u064A-]/g, '') // Keep Arabic and alphanumeric
        .replace(/[\s_-]+/g, '-') // Replace spaces with hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    return baseSlug || (0, slugify_1.default)(text, { lower: true, strict: true, trim: true }) || `post-${Date.now()}`;
};
exports.generateSlug = generateSlug;
const getUniqueSlug = async (title, customSlug, excludeId) => {
    const baseSlug = customSlug ? (0, exports.generateSlug)(customSlug) : (0, exports.generateSlug)(title);
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (true) {
        const existing = await prisma_config_1.prisma.article.findFirst({
            where: {
                slug: uniqueSlug,
                ...(excludeId ? { id: { not: excludeId } } : {}),
            },
        });
        if (!existing) {
            break;
        }
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
    }
    return uniqueSlug;
};
exports.getUniqueSlug = getUniqueSlug;
