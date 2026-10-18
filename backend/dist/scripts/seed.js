"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_config_1 = require("../config/prisma.config");
const env_config_1 = require("../config/env.config");
const common_types_1 = require("../types/common.types");
const seedDatabase = async () => {
    try {
        console.log('🌱 Connecting to MySQL via Prisma for seeding...');
        await prisma_config_1.prisma.$connect();
        console.log('✅ Connected to MySQL.');
        // 1. Seed Admin User
        const existingAdmin = await prisma_config_1.prisma.user.findUnique({
            where: { email: env_config_1.env.ADMIN_EMAIL.toLowerCase() },
        });
        if (existingAdmin) {
            console.log(`ℹ️  Admin user with email '${env_config_1.env.ADMIN_EMAIL}' already exists.`);
        }
        else {
            const hashedPassword = await bcryptjs_1.default.hash(env_config_1.env.ADMIN_PASSWORD, 12);
            const admin = await prisma_config_1.prisma.user.create({
                data: {
                    name: env_config_1.env.ADMIN_NAME,
                    email: env_config_1.env.ADMIN_EMAIL.toLowerCase(),
                    password: hashedPassword,
                    role: common_types_1.UserRole.ADMIN,
                    isActive: true,
                },
            });
            console.log(`🎉 Created Admin User: ${admin.email} (Role: ${admin.role})`);
        }
        // 2. Seed Initial Platform Settings
        const existingSettings = await prisma_config_1.prisma.settings.findFirst();
        if (existingSettings) {
            console.log('ℹ️  Platform settings already exist.');
        }
        else {
            await prisma_config_1.prisma.settings.create({
                data: {
                    siteName: 'خمسة برمجة بالبلدي',
                    siteDescription: 'منصة لتبسيط البرمجة وعلوم الحاسب باللغة العربية البسيطة',
                    socialLinks: {
                        tiktok: 'https://www.tiktok.com/@5barmaga',
                        youtube: 'https://www.youtube.com/@5barmaga',
                        facebook: 'https://www.facebook.com/5barmaga',
                        github: 'https://github.com/5barmaga',
                    },
                    defaultSeo: {
                        title: 'خمسة برمجة بالبلدي - تعلم البرمجة من الصفر',
                        description: 'مقالات وفيديوهات حصرية لشرح مفاهيم البرمجة وتطوير الويب ببساطة',
                        keywords: ['برمجة', 'javascript', 'typescript', 'خمسة برمجة بالبلدي', 'nodejs'],
                    },
                },
            });
            console.log('🎉 Created Initial Platform Settings.');
        }
        console.log('🌱 Seeding process completed successfully!');
        await prisma_config_1.prisma.$disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        await prisma_config_1.prisma.$disconnect();
        process.exit(1);
    }
};
seedDatabase();
