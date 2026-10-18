import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.config';
import { env } from '../config/env.config';
import { UserRole } from '../types/common.types';

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Connecting to MySQL via Prisma for seeding...');
    await prisma.$connect();
    console.log('✅ Connected to MySQL.');

    // 1. Seed Admin User
    const existingAdmin = await prisma.user.findUnique({
      where: { email: env.ADMIN_EMAIL.toLowerCase() },
    });

    if (existingAdmin) {
      console.log(`ℹ️  Admin user with email '${env.ADMIN_EMAIL}' already exists.`);
    } else {
      const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
      const admin = await prisma.user.create({
        data: {
          name: env.ADMIN_NAME,
          email: env.ADMIN_EMAIL.toLowerCase(),
          password: hashedPassword,
          role: UserRole.ADMIN,
          isActive: true,
        },
      });
      console.log(`🎉 Created Admin User: ${admin.email} (Role: ${admin.role})`);
    }

    // 2. Seed Initial Platform Settings
    const existingSettings = await prisma.settings.findFirst();
    if (existingSettings) {
      console.log('ℹ️  Platform settings already exist.');
    } else {
      await prisma.settings.create({
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
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seedDatabase();
