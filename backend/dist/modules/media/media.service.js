"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const r2_config_1 = require("../../config/r2.config");
const prisma_config_1 = require("../../config/prisma.config");
const api_error_1 = require("../../utils/api-error");
const pagination_1 = require("../../utils/pagination");
const UPLOADER_SELECT_FIELDS = {
    id: true,
    name: true,
    email: true,
    avatar: true,
};
class MediaService {
    static generateKey(folder, originalName) {
        const ext = path_1.default.extname(originalName).toLowerCase();
        const hash = crypto_1.default.randomBytes(16).toString('hex');
        const timestamp = Date.now();
        const filename = `${timestamp}-${hash}${ext}`;
        const cleanFolder = folder.replace(/^\/+|\/+$/g, '') || 'general';
        const key = `${cleanFolder}/${filename}`;
        return { key, filename };
    }
    static async uploadFile(file, folder, userId) {
        const { key, filename } = this.generateKey(folder, file.originalname);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: r2_config_1.R2_CONFIG.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        try {
            await r2_config_1.r2Client.send(command);
        }
        catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            console.error('Cloudflare R2 Upload Error:', errorMsg);
            throw api_error_1.ApiError.internal(`Failed to upload file to Cloudflare R2: ${errorMsg}`);
        }
        const publicUrl = `${r2_config_1.R2_CONFIG.publicUrl}/${key}`;
        const media = await prisma_config_1.prisma.media.create({
            data: {
                filename,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                url: publicUrl,
                key,
                uploadedById: userId,
            },
            include: {
                uploadedBy: {
                    select: UPLOADER_SELECT_FIELDS,
                },
            },
        });
        return media;
    }
    static async generatePresignedUploadUrl(dto, _userId) {
        const { key, filename } = this.generateKey(dto.folder, dto.filename);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: r2_config_1.R2_CONFIG.bucketName,
            Key: key,
            ContentType: dto.contentType,
        });
        try {
            // Presigned URL valid for 15 minutes (900s)
            const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(r2_config_1.r2Client, command, { expiresIn: 900 });
            const publicUrl = `${r2_config_1.R2_CONFIG.publicUrl}/${key}`;
            return {
                uploadUrl,
                publicUrl,
                key,
                filename,
            };
        }
        catch (error) {
            console.error('Failed to generate presigned upload URL:', error);
            throw api_error_1.ApiError.internal('Failed to generate presigned upload URL');
        }
    }
    static async getMediaList(query) {
        const { page, limit, skip } = (0, pagination_1.getPaginationOptions)({
            page: query.page,
            limit: query.limit,
        });
        const where = {};
        if (query.folder) {
            where.key = { startsWith: `${query.folder}/` };
        }
        if (query.mimeType) {
            where.mimeType = query.mimeType;
        }
        const [items, total] = await Promise.all([
            prisma_config_1.prisma.media.findMany({
                where,
                include: {
                    uploadedBy: {
                        select: UPLOADER_SELECT_FIELDS,
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma_config_1.prisma.media.count({ where }),
        ]);
        return (0, pagination_1.createPaginatedResult)(items, total, page, limit);
    }
    static async deleteMedia(id) {
        const media = await prisma_config_1.prisma.media.findUnique({
            where: { id },
        });
        if (!media) {
            throw api_error_1.ApiError.notFound('Media item not found');
        }
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: r2_config_1.R2_CONFIG.bucketName,
            Key: media.key,
        });
        try {
            await r2_config_1.r2Client.send(command);
        }
        catch (error) {
            console.warn(`Failed to delete object '${media.key}' from R2:`, error);
        }
        await prisma_config_1.prisma.media.delete({
            where: { id },
        });
    }
}
exports.MediaService = MediaService;
