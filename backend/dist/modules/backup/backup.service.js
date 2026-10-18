"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const zlib_1 = __importDefault(require("zlib"));
const client_s3_1 = require("@aws-sdk/client-s3");
const r2_config_1 = require("../../config/r2.config");
const prisma_config_1 = require("../../config/prisma.config");
class BackupService {
    /**
     * Generates a full database backup from MySQL, compresses with GZIP, saves locally and uploads to Cloud Storage.
     */
    static async createBackup() {
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
        const timestampIso = new Date().toISOString();
        const timestampFormatted = timestampIso.replace(/[:.]/g, '-');
        const totalRecords = Object.values(counts).reduce((acc, curr) => acc + curr, 0);
        const backupPayload = {
            version: '2.0.0',
            databaseEngine: 'MySQL',
            appName: 'khamsa_cms',
            timestamp: timestampIso,
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
        const filenameGz = `khamsa-backup-${timestampFormatted}.json.gz`;
        const localGzPath = path_1.default.join(backupsDir, filenameGz);
        fs_1.default.writeFileSync(localGzPath, compressedBuffer);
        // 2. Upload to Cloud Storage
        const cloudKey = `backups/${filenameGz}`;
        try {
            const uploadCommand = new client_s3_1.PutObjectCommand({
                Bucket: r2_config_1.R2_CONFIG.bucketName,
                Key: cloudKey,
                Body: compressedBuffer,
                ContentType: 'application/gzip',
                Metadata: {
                    timestamp: timestampIso,
                    appName: 'khamsa_cms',
                    totalRecords: String(totalRecords),
                },
            });
            await r2_config_1.r2Client.send(uploadCommand);
        }
        catch (err) {
            console.error('Failed to upload backup to Cloud Storage:', err);
        }
        const cloudUrl = `${r2_config_1.R2_CONFIG.publicUrl}/${cloudKey}`;
        return {
            filename: filenameGz,
            key: cloudKey,
            url: cloudUrl,
            sizeBytes: compressedBuffer.length,
            timestamp: timestampIso,
            totalRecords,
            counts,
        };
    }
    /**
     * Lists available backups from Cloud Storage (with local fallback).
     */
    static async listBackups() {
        const backups = [];
        // Try listing from Cloud Storage
        try {
            const listCommand = new client_s3_1.ListObjectsV2Command({
                Bucket: r2_config_1.R2_CONFIG.bucketName,
                Prefix: 'backups/khamsa-backup-',
            });
            const res = await r2_config_1.r2Client.send(listCommand);
            if (res.Contents && res.Contents.length > 0) {
                for (const item of res.Contents) {
                    if (!item.Key)
                        continue;
                    const filename = path_1.default.basename(item.Key);
                    backups.push({
                        filename,
                        key: item.Key,
                        url: `${r2_config_1.R2_CONFIG.publicUrl}/${item.Key}`,
                        sizeBytes: item.Size || 0,
                        timestamp: item.LastModified ? item.LastModified.toISOString() : new Date().toISOString(),
                        totalRecords: 0,
                        counts: {},
                    });
                }
            }
        }
        catch (cloudErr) {
            console.warn('Could not list backups from Cloud Storage, falling back to local files:', cloudErr);
        }
        // If cloud storage returned nothing, read local backups folder
        if (backups.length === 0) {
            const backupsDir = path_1.default.resolve(process.cwd(), 'backups');
            if (fs_1.default.existsSync(backupsDir)) {
                const files = fs_1.default.readdirSync(backupsDir).filter(f => f.startsWith('khamsa-backup-'));
                for (const file of files) {
                    const stats = fs_1.default.statSync(path_1.default.join(backupsDir, file));
                    backups.push({
                        filename: file,
                        key: `backups/${file}`,
                        url: `${r2_config_1.R2_CONFIG.publicUrl}/backups/${file}`,
                        sizeBytes: stats.size,
                        timestamp: stats.mtime.toISOString(),
                        totalRecords: 0,
                        counts: {},
                    });
                }
            }
        }
        // Sort descending by timestamp
        return backups.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    /**
     * Starts a daily recurring backup scheduler.
     */
    static startDailyBackupScheduler() {
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        console.log('⏰ Automated Daily Backup Scheduler initialized.');
        setInterval(async () => {
            try {
                console.log('⏰ Running automated daily backup...');
                const backup = await BackupService.createBackup();
                console.log(`✅ Daily automated backup complete: ${backup.filename}`);
            }
            catch (err) {
                console.error('❌ Daily automated backup failed:', err);
            }
        }, TWENTY_FOUR_HOURS);
    }
}
exports.BackupService = BackupService;
