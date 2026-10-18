"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const zlib_1 = __importDefault(require("zlib"));
const client_s3_1 = require("@aws-sdk/client-s3");
const prisma_config_1 = require("../config/prisma.config");
const r2_config_1 = require("../config/r2.config");
async function runBackup() {
    console.log('🚀 Starting Full Automated Backup for Khamsa MySQL Database...');
    const [users, articles, videos, media, settings, featuredLinks] = await Promise.all([
        prisma_config_1.prisma.user.findMany(),
        prisma_config_1.prisma.article.findMany(),
        prisma_config_1.prisma.video.findMany(),
        prisma_config_1.prisma.media.findMany(),
        prisma_config_1.prisma.settings.findMany(),
        prisma_config_1.prisma.featuredLink.findMany(),
    ]);
    const backupData = {
        users,
        articles,
        videos,
        media,
        settings,
        featured_links: featuredLinks,
    };
    const counts = {
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
    const backupPayload = {
        version: '2.0.0',
        appName: 'khamsa_cms',
        timestamp: new Date().toISOString(),
        database: 'khamsa_cms',
        counts,
        data: backupData,
    };
    const jsonString = JSON.stringify(backupPayload, null, 2);
    const compressedBuffer = zlib_1.default.gzipSync(Buffer.from(jsonString, 'utf-8'));
    // 1. Save Local Copy
    const backupsDir = path_1.default.resolve(process.cwd(), 'backups');
    if (!fs_1.default.existsSync(backupsDir)) {
        fs_1.default.mkdirSync(backupsDir, { recursive: true });
    }
    const filenameGz = `khamsa-backup-${timestamp}.json.gz`;
    const filenameJson = `khamsa-backup-${timestamp}.json`;
    const localGzPath = path_1.default.join(backupsDir, filenameGz);
    const localJsonPath = path_1.default.join(backupsDir, filenameJson);
    fs_1.default.writeFileSync(localGzPath, compressedBuffer);
    fs_1.default.writeFileSync(localJsonPath, jsonString);
    console.log(`\n💾 Local Backup Saved:`);
    console.log(`  📁 JSON: ${localJsonPath} (${(jsonString.length / 1024).toFixed(2)} KB)`);
    console.log(`  📦 GZIP: ${localGzPath} (${(compressedBuffer.length / 1024).toFixed(2)} KB)`);
    // 2. Upload to Cloud Storage
    console.log(`\n☁️ Uploading Backup to Cloud Storage...`);
    const cloudKey = `backups/${filenameGz}`;
    try {
        const uploadCommand = new client_s3_1.PutObjectCommand({
            Bucket: r2_config_1.R2_CONFIG.bucketName,
            Key: cloudKey,
            Body: compressedBuffer,
            ContentType: 'application/gzip',
            Metadata: {
                timestamp: backupPayload.timestamp,
                appName: 'khamsa_cms',
                totalRecords: String(Object.values(counts).reduce((acc, curr) => acc + curr, 0)),
            },
        });
        await r2_config_1.r2Client.send(uploadCommand);
        const cloudUrl = `${r2_config_1.R2_CONFIG.publicUrl}/${cloudKey}`;
        console.log(`  ✅ Successfully uploaded to Cloud Storage!`);
        console.log(`  🔗 Key: ${cloudKey}`);
        console.log(`  🌐 URL: ${cloudUrl}`);
    }
    catch (cloudErr) {
        console.error('  ❌ Failed to upload backup to Cloud Storage:', cloudErr);
    }
    await prisma_config_1.prisma.$disconnect();
    console.log('\n✨ Full Backup Process Completed Successfully!');
}
runBackup().catch(err => {
    console.error('❌ Backup Failed with error:', err);
    process.exit(1);
});
