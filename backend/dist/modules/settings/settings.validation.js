"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingsSchema = exports.footerSchema = exports.founderSchema = exports.aboutContentSchema = exports.heroContentSchema = exports.homepageSchema = exports.defaultSeoSchema = exports.contactSchema = exports.socialLinksSchema = void 0;
const zod_1 = require("zod");
exports.socialLinksSchema = zod_1.z
    .object({
    tiktok: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    youtube: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    facebook: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    github: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    linkedin: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    whatsapp: zod_1.z.string().optional().or(zod_1.z.literal('')),
    email: zod_1.z.string().email('Must be a valid email').optional().or(zod_1.z.literal('')),
    phone: zod_1.z.string().optional().or(zod_1.z.literal('')),
})
    .optional();
exports.contactSchema = zod_1.z
    .object({
    email: zod_1.z.string().email('Must be a valid email').optional().or(zod_1.z.literal('')),
    phone: zod_1.z.string().optional().or(zod_1.z.literal('')),
    whatsapp: zod_1.z.string().optional().or(zod_1.z.literal('')),
    contactMessage: zod_1.z.string().max(1000).optional().or(zod_1.z.literal('')),
})
    .optional();
exports.defaultSeoSchema = zod_1.z
    .object({
    title: zod_1.z.string().max(100).optional(),
    description: zod_1.z.string().max(300).optional(),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
    ogTitle: zod_1.z.string().max(100).optional().or(zod_1.z.literal('')),
    ogDescription: zod_1.z.string().max(300).optional().or(zod_1.z.literal('')),
    ogImage: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    canonicalUrl: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
})
    .optional();
exports.homepageSchema = zod_1.z
    .object({
    showHero: zod_1.z.boolean().optional(),
    showWhyKhamsa: zod_1.z.boolean().optional(),
    showPhilosophy: zod_1.z.boolean().optional(),
    showFounder: zod_1.z.boolean().optional(),
    showServices: zod_1.z.boolean().optional(),
    showArticles: zod_1.z.boolean().optional(),
    showVideos: zod_1.z.boolean().optional(),
    showSocial: zod_1.z.boolean().optional(),
    showFinalCTA: zod_1.z.boolean().optional(),
})
    .optional();
exports.heroContentSchema = zod_1.z
    .object({
    heroTitle: zod_1.z.string().max(150).optional(),
    heroSubtitle: zod_1.z.string().max(200).optional(),
    heroDescription: zod_1.z.string().max(1000).optional(),
    primaryButtonText: zod_1.z.string().max(50).optional(),
    primaryButtonUrl: zod_1.z.string().max(200).optional(),
    secondaryButtonText: zod_1.z.string().max(50).optional(),
    secondaryButtonUrl: zod_1.z.string().max(200).optional(),
})
    .optional();
exports.aboutContentSchema = zod_1.z
    .object({
    aboutTitle: zod_1.z.string().max(150).optional(),
    aboutShortDescription: zod_1.z.string().max(500).optional(),
    aboutStory: zod_1.z.string().max(3000).optional(),
    aboutMission: zod_1.z.string().max(1000).optional(),
    aboutVision: zod_1.z.string().max(1000).optional(),
    aboutGoal: zod_1.z.string().max(1000).optional(),
    aboutMessage: zod_1.z.string().max(500).optional(),
})
    .optional();
exports.founderSchema = zod_1.z
    .object({
    founderName: zod_1.z.string().max(100).optional(),
    founderRole: zod_1.z.string().max(150).optional(),
    founderBio: zod_1.z.string().max(2000).optional(),
    founderImage: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    founderLinkedIn: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    founderGitHub: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
})
    .optional();
exports.footerSchema = zod_1.z
    .object({
    footerDescription: zod_1.z.string().max(500).optional(),
    footerCopyright: zod_1.z.string().max(200).optional(),
    footerShowSocials: zod_1.z.boolean().optional(),
    footerShowNavigation: zod_1.z.boolean().optional(),
})
    .optional();
exports.updateSettingsSchema = zod_1.z.object({
    siteName: zod_1.z.string().trim().min(2, 'Site name must be at least 2 characters').max(100).optional(),
    tagline: zod_1.z.string().trim().max(200).optional(),
    siteDescription: zod_1.z
        .string()
        .trim()
        .min(5, 'Site description must be at least 5 characters')
        .max(1000)
        .optional(),
    language: zod_1.z.string().max(10).optional(),
    direction: zod_1.z.enum(['rtl', 'ltr']).optional(),
    timezone: zod_1.z.string().max(50).optional(),
    logo: zod_1.z.string().url('Logo must be a valid URL').optional().nullable(),
    favicon: zod_1.z.string().url('Favicon must be a valid URL').optional().nullable(),
    socialLinks: exports.socialLinksSchema,
    contact: exports.contactSchema,
    defaultSeo: exports.defaultSeoSchema,
    homepage: exports.homepageSchema,
    hero: exports.heroContentSchema,
    about: exports.aboutContentSchema,
    founder: exports.founderSchema,
    footer: exports.footerSchema,
});
