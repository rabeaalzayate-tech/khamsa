import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { prisma } from '../config/prisma.config';
import { r2Client, R2_CONFIG } from '../config/r2.config';

interface BackupPayload {
  version: string;
  appName: string;
  timestamp: string;
  database: string;
  counts: Record<string, number>;
  data: Record<string, unknown[]>;
}

async function runBackup() {
  console.log('🚀 Starting Full Automated Backup for Khamsa MySQL Database...');

  const [users, articles, videos, media, settings, featuredLinks] = await Promise.all([
    prisma.user.findMany(),
    prisma.article.findMany(),
    prisma.video.findMany(),
    prisma.media.findMany(),
    prisma.settings.findMany(),
    prisma.featuredLink.findMany(),
  ]);

  const backupData: Record<string, unknown[]> = {
    users,
    articles,
    videos,
    media,
    settings,
    featured_links: featuredLinks,
  };

  const counts: Record<string, number> = {
    users: users.length,
    articles: articles.length,
    videos: videos.length,
    media: media.length,
    settings: settings.length,
    featured_links: featuredLinks.length,
  };

  for (const [col, count] of Object.entries(counts)) {
    console.log(`  ✓ ${col.padEnd(16)}: ${count} records`);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPayload: BackupPayload = {
    version: '2.0.0',
    appName: 'khamsa_cms',
    timestamp: new Date().toISOString(),
    database: 'khamsa_cms',
    counts,
    data: backupData,
  };

  const jsonString = JSON.stringify(backupPayload, null, 2);
  const compressedBuffer = zlib.gzipSync(Buffer.from(jsonString, 'utf-8'));

  // 1. Save Local Copy
  const backupsDir = path.resolve(process.cwd(), 'backups');
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const filenameGz = `khamsa-backup-${timestamp}.json.gz`;
  const filenameJson = `khamsa-backup-${timestamp}.json`;
  const localGzPath = path.join(backupsDir, filenameGz);
  const localJsonPath = path.join(backupsDir, filenameJson);

  fs.writeFileSync(localGzPath, compressedBuffer);
  fs.writeFileSync(localJsonPath, jsonString);

  console.log(`\n💾 Local Backup Saved:`);
  console.log(`  📁 JSON: ${localJsonPath} (${(jsonString.length / 1024).toFixed(2)} KB)`);
  console.log(`  📦 GZIP: ${localGzPath} (${(compressedBuffer.length / 1024).toFixed(2)} KB)`);

  // 2. Upload to Cloud Storage
  console.log(`\n☁️ Uploading Backup to Cloud Storage...`);
  const cloudKey = `backups/${filenameGz}`;

  try {
    const uploadCommand = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: cloudKey,
      Body: compressedBuffer,
      ContentType: 'application/gzip',
      Metadata: {
        timestamp: backupPayload.timestamp,
        appName: 'khamsa_cms',
        totalRecords: String(
          Object.values(counts).reduce((acc, curr) => acc + curr, 0),
        ),
      },
    });

    await r2Client.send(uploadCommand);
    const cloudUrl = `${R2_CONFIG.publicUrl}/${cloudKey}`;
    console.log(`  ✅ Successfully uploaded to Cloud Storage!`);
    console.log(`  🔗 Key: ${cloudKey}`);
    console.log(`  🌐 URL: ${cloudUrl}`);
  } catch (cloudErr) {
    console.error('  ❌ Failed to upload backup to Cloud Storage:', cloudErr);
  }

  await prisma.$disconnect();
  console.log('\n✨ Full Backup Process Completed Successfully!');
}

runBackup().catch(err => {
  console.error('❌ Backup Failed with error:', err);
  process.exit(1);
});
