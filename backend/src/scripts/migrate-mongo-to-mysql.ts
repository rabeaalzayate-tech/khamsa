import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function migrateData() {
  console.log('🚀 Starting Data Migration: MongoDB -> MySQL...');

  let usersData: any[] = [];
  let articlesData: any[] = [];
  let videosData: any[] = [];
  let mediaData: any[] = [];
  let settingsData: any[] = [];
  let featuredLinksData: any[] = [];

  const mongoUri = process.env.MONGODB_URI;
  let connectedToMongo = false;

  if (mongoUri) {
    try {
      console.log('📡 Attempting to fetch live data from MongoDB Atlas...');
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      const db = mongoose.connection.db;
      if (db) {
        usersData = await db.collection('users').find({}).toArray();
        articlesData = await db.collection('articles').find({}).toArray();
        videosData = await db.collection('videos').find({}).toArray();
        mediaData = await db.collection('media').find({}).toArray();
        settingsData = await db.collection('settings').find({}).toArray();
        try {
          featuredLinksData = await db.collection('featuredlinks').find({}).toArray();
        } catch {
          featuredLinksData = [];
        }
        connectedToMongo = true;
        console.log('✅ Connected to MongoDB Atlas successfully.');
      }
    } catch (mongoErr) {
      console.warn('⚠️ Could not connect to live MongoDB Atlas:', (mongoErr as Error).message);
      console.log('📂 Falling back to local backup file...');
    } finally {
      if (connectedToMongo) {
        await mongoose.disconnect();
      }
    }
  }

  // If live Mongo didn't return data or failed, load from local backup file
  if (usersData.length === 0) {
    const backupsDir = path.resolve(process.cwd(), 'backups');
    const backupFiles = fs
      .readdirSync(backupsDir)
      .filter(f => f.startsWith('khamsa-backup-') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (backupFiles.length > 0) {
      const firstBackup = backupFiles[0] as string;
      const latestBackupPath = path.join(backupsDir, firstBackup);
      console.log(`📄 Loading data from latest backup: ${firstBackup}`);
      const raw = fs.readFileSync(latestBackupPath, 'utf-8');
      const backupJson = JSON.parse(raw);

      usersData = backupJson.data.users || [];
      articlesData = backupJson.data.articles || [];
      videosData = backupJson.data.videos || [];
      mediaData = backupJson.data.media || [];
      settingsData = backupJson.data.settings || [];
      featuredLinksData = backupJson.data.featuredlinks || backupJson.data.featured_links || [];
    } else {
      throw new Error('No backup files found and MongoDB Atlas could not be reached.');
    }
  }

  console.log(`\n📊 Data to migrate:`);
  console.log(`  - Users: ${usersData.length}`);
  console.log(`  - Articles: ${articlesData.length}`);
  console.log(`  - Videos: ${videosData.length}`);
  console.log(`  - Media: ${mediaData.length}`);
  console.log(`  - Settings: ${settingsData.length}`);
  console.log(`  - Featured Links: ${featuredLinksData.length}`);

  // 1. Migrate Users
  console.log('\n👤 Migrating Users...');
  for (const u of usersData) {
    const id = String(u._id);
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      await prisma.user.create({
        data: {
          id,
          name: u.name,
          email: u.email,
          password: u.password,
          role: u.role === 'ADMIN' ? 'ADMIN' : 'EDITOR',
          avatar: u.avatar || null,
          bio: u.bio || null,
          socials: u.socials || {},
          isActive: u.isActive !== undefined ? Boolean(u.isActive) : true,
          lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt) : null,
          createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
          updatedAt: u.updatedAt ? new Date(u.updatedAt) : new Date(),
        },
      });
      console.log(`  ✓ Inserted User: ${u.email} (${id})`);
    } else {
      console.log(`  ℹ User already exists: ${u.email}`);
    }
  }

  // 2. Migrate Articles
  console.log('\n📝 Migrating Articles...');
  for (const a of articlesData) {
    const id = String(a._id);
    const authorId = String(a.author);
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      await prisma.article.create({
        data: {
          id,
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt || '',
          content: a.content || {},
          coverImage: a.coverImage || null,
          category: a.category || 'عام',
          tags: Array.isArray(a.tags) ? a.tags : [],
          authorId,
          status: a.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
          isFeatured: Boolean(a.isFeatured),
          seo: a.seo || {},
          publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
          createdAt: a.createdAt ? new Date(a.createdAt) : new Date(),
          updatedAt: a.updatedAt ? new Date(a.updatedAt) : new Date(),
        },
      });
      console.log(`  ✓ Inserted Article: ${a.title} (${a.slug})`);
    } else {
      console.log(`  ℹ Article already exists: ${a.slug}`);
    }
  }

  // 3. Migrate Videos
  console.log('\n🎬 Migrating Videos...');
  for (const v of videosData) {
    const id = String(v._id);
    const authorId = String(v.author);
    const existing = await prisma.video.findUnique({ where: { id } });
    if (!existing) {
      let platform: 'TIKTOK' | 'YOUTUBE' | 'FACEBOOK' = 'YOUTUBE';
      const p = String(v.platform || '').toUpperCase();
      if (p === 'TIKTOK') platform = 'TIKTOK';
      else if (p === 'FACEBOOK') platform = 'FACEBOOK';

      await prisma.video.create({
        data: {
          id,
          title: v.title,
          description: v.description || '',
          platform,
          url: v.url,
          thumbnail: v.thumbnail || null,
          status: v.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
          authorId,
          publishedAt: v.publishedAt ? new Date(v.publishedAt) : null,
          createdAt: v.createdAt ? new Date(v.createdAt) : new Date(),
          updatedAt: v.updatedAt ? new Date(v.updatedAt) : new Date(),
        },
      });
      console.log(`  ✓ Inserted Video: ${v.title} (${platform})`);
    } else {
      console.log(`  ℹ Video already exists: ${v.title}`);
    }
  }

  // 4. Migrate Media
  console.log('\n🖼️ Migrating Media...');
  for (const m of mediaData) {
    const id = String(m._id);
    const uploadedById = String(m.uploadedBy);
    const existing = await prisma.media.findUnique({ where: { id } });
    if (!existing) {
      await prisma.media.create({
        data: {
          id,
          filename: m.filename,
          originalName: m.originalName || m.filename,
          mimeType: m.mimeType || 'image/png',
          size: Number(m.size) || 0,
          url: m.url,
          key: m.key,
          uploadedById,
          createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
          updatedAt: m.updatedAt ? new Date(m.updatedAt) : new Date(),
        },
      });
      console.log(`  ✓ Inserted Media: ${m.filename}`);
    } else {
      console.log(`  ℹ Media already exists: ${m.filename}`);
    }
  }

  // 5. Migrate Settings
  console.log('\n⚙️ Migrating Settings...');
  for (const s of settingsData) {
    const id = String(s._id);
    const existing = await prisma.settings.findFirst();
    if (!existing) {
      await prisma.settings.create({
        data: {
          id,
          siteName: s.siteName || 'خمسة برمجة بالبلدي',
          tagline: s.tagline || 'افهمها بالبلدي.. اكتبها بالكود.',
          siteDescription: s.siteDescription || 'منصة المحتوى التقني والبرمجي باللغة العربية',
          language: s.language || 'ar',
          direction: s.direction || 'rtl',
          timezone: s.timezone || 'Africa/Cairo',
          logo: s.logo || null,
          favicon: s.favicon || null,
          socialLinks: s.socialLinks || {},
          contact: s.contact || {},
          defaultSeo: s.defaultSeo || {},
          homepage: s.homepage || {},
          hero: s.hero || {},
          about: s.about || {},
          founder: s.founder || {},
          footer: s.footer || {},
          createdAt: s.createdAt ? new Date(s.createdAt) : new Date(),
          updatedAt: s.updatedAt ? new Date(s.updatedAt) : new Date(),
        },
      });
      console.log(`  ✓ Inserted Settings`);
    } else {
      console.log(`  ℹ Settings already exist.`);
    }
  }

  // 6. Migrate Featured Links
  if (featuredLinksData.length > 0) {
    console.log('\n🔗 Migrating Featured Links...');
    for (const fl of featuredLinksData) {
      const id = String(fl._id);
      const existing = await prisma.featuredLink.findUnique({ where: { id } });
      if (!existing) {
        await prisma.featuredLink.create({
          data: {
            id,
            title: fl.title,
            image: fl.image,
            url: fl.url,
            badge: fl.badge || '',
            description: fl.description || '',
            ctaText: fl.ctaText || '',
            order: Number(fl.order) || 0,
            isActive: fl.isActive !== undefined ? Boolean(fl.isActive) : true,
            createdAt: fl.createdAt ? new Date(fl.createdAt) : new Date(),
            updatedAt: fl.updatedAt ? new Date(fl.updatedAt) : new Date(),
          },
        });
        console.log(`  ✓ Inserted Featured Link: ${fl.title}`);
      }
    }
  }

  console.log('\n🎉 ALL DATA MIGRATED SUCCESSFULLY TO MYSQL!');
}

migrateData()
  .catch(err => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
