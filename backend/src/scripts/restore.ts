import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { prisma } from '../config/prisma.config';

interface BackupPayload {
  version: string;
  appName: string;
  timestamp: string;
  database: string;
  counts: Record<string, number>;
  data: Record<string, unknown[]>;
}

async function runRestore() {
  const targetArg = process.argv[2];
  const backupsDir = path.resolve(process.cwd(), 'backups');

  let targetFilePath = targetArg;

  if (!targetFilePath) {
    if (!fs.existsSync(backupsDir)) {
      throw new Error(`Backups directory does not exist: ${backupsDir}`);
    }

    const files = fs
      .readdirSync(backupsDir)
      .filter(f => f.startsWith('khamsa-backup-') && (f.endsWith('.json') || f.endsWith('.json.gz')))
      .sort()
      .reverse();

    if (files.length === 0) {
      throw new Error('No backup files found in backups directory.');
    }

    targetFilePath = path.join(backupsDir, files[0] as string);
    console.log(`ℹ️ No file specified. Auto-selected latest backup: ${files[0]}`);
  }

  if (!targetFilePath || !fs.existsSync(targetFilePath)) {
    throw new Error(`Backup file not found at: ${targetFilePath}`);
  }

  console.log(`🚀 Starting Database Restore to MySQL from: ${targetFilePath}`);

  const rawBuffer = fs.readFileSync(targetFilePath);
  let jsonString = '';

  if (targetFilePath.endsWith('.gz')) {
    jsonString = zlib.gunzipSync(rawBuffer).toString('utf-8');
  } else {
    jsonString = rawBuffer.toString('utf-8');
  }

  const backup: BackupPayload = JSON.parse(jsonString);
  console.log(`📦 Backup Created At: ${backup.timestamp} (${backup.appName})`);

  // Restore Users
  if (Array.isArray(backup.data.users)) {
    console.log(`  🔄 Restoring users (${backup.data.users.length} items)...`);
    for (const u of backup.data.users as any[]) {
      const id = String(u.id || u._id);
      await prisma.user.upsert({
        where: { id },
        create: {
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
        update: {
          name: u.name,
          email: u.email,
          password: u.password,
          role: u.role === 'ADMIN' ? 'ADMIN' : 'EDITOR',
          avatar: u.avatar || null,
          bio: u.bio || null,
          socials: u.socials || {},
          isActive: u.isActive !== undefined ? Boolean(u.isActive) : true,
          lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt) : null,
        },
      });
    }
    console.log(`  ✅ Users restored.`);
  }

  // Restore Articles
  if (Array.isArray(backup.data.articles)) {
    console.log(`  🔄 Restoring articles (${backup.data.articles.length} items)...`);
    for (const a of backup.data.articles as any[]) {
      const id = String(a.id || a._id);
      const authorId = String(a.authorId || a.author);
      await prisma.article.upsert({
        where: { id },
        create: {
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
        update: {
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt || '',
          content: a.content || {},
          coverImage: a.coverImage || null,
          category: a.category || 'عام',
          tags: Array.isArray(a.tags) ? a.tags : [],
          status: a.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
          isFeatured: Boolean(a.isFeatured),
          seo: a.seo || {},
          publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
        },
      });
    }
    console.log(`  ✅ Articles restored.`);
  }

  // Restore Videos
  if (Array.isArray(backup.data.videos)) {
    console.log(`  🔄 Restoring videos (${backup.data.videos.length} items)...`);
    for (const v of backup.data.videos as any[]) {
      const id = String(v.id || v._id);
      const authorId = String(v.authorId || v.author);
      let platform: 'TIKTOK' | 'YOUTUBE' | 'FACEBOOK' = 'YOUTUBE';
      const p = String(v.platform || '').toUpperCase();
      if (p === 'TIKTOK') platform = 'TIKTOK';
      else if (p === 'FACEBOOK') platform = 'FACEBOOK';

      await prisma.video.upsert({
        where: { id },
        create: {
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
        update: {
          title: v.title,
          description: v.description || '',
          platform,
          url: v.url,
          thumbnail: v.thumbnail || null,
          status: v.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
          publishedAt: v.publishedAt ? new Date(v.publishedAt) : null,
        },
      });
    }
    console.log(`  ✅ Videos restored.`);
  }

  // Restore Media
  if (Array.isArray(backup.data.media)) {
    console.log(`  🔄 Restoring media (${backup.data.media.length} items)...`);
    for (const m of backup.data.media as any[]) {
      const id = String(m.id || m._id);
      const uploadedById = String(m.uploadedById || m.uploadedBy);
      await prisma.media.upsert({
        where: { id },
        create: {
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
        update: {
          filename: m.filename,
          originalName: m.originalName || m.filename,
          mimeType: m.mimeType || 'image/png',
          size: Number(m.size) || 0,
          url: m.url,
          key: m.key,
        },
      });
    }
    console.log(`  ✅ Media restored.`);
  }

  // Restore Settings
  if (Array.isArray(backup.data.settings) && backup.data.settings.length > 0) {
    console.log(`  🔄 Restoring settings...`);
    const s = backup.data.settings[0] as any;
    const id = String(s.id || s._id);
    await prisma.settings.upsert({
      where: { id },
      create: {
        id,
        siteName: s.siteName || 'خمسة برمجة بالبلدي',
        tagline: s.tagline || 'افهمها بالبلدي.. اكتبها بالكود.',
        siteDescription: s.siteDescription || 'منصة لتبسيط البرمجة',
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
      update: {
        siteName: s.siteName || 'خمسة برمجة بالبلدي',
        tagline: s.tagline || 'افهمها بالبلدي.. اكتبها بالكود.',
        siteDescription: s.siteDescription || 'منصة لتبسيط البرمجة',
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
      },
    });
    console.log(`  ✅ Settings restored.`);
  }

  await prisma.$disconnect();
  console.log('\n✨ Database Restore to MySQL Completed Successfully!');
}

runRestore().catch(err => {
  console.error('❌ Restore Failed with error:', err);
  process.exit(1);
});
