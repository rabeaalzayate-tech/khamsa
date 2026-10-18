import path from 'path';
import crypto from 'crypto';
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client, R2_CONFIG } from '../../config/r2.config';
import { prisma } from '../../config/prisma.config';
import { ListMediaQueryDto, PresignedUrlDto } from './media.validation';
import { PaginatedResult } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';

const UPLOADER_SELECT_FIELDS = {
  id: true,
  name: true,
  email: true,
  avatar: true,
};

export class MediaService {
  private static generateKey(
    folder: string,
    originalName: string,
  ): { key: string; filename: string } {
    const ext = path.extname(originalName).toLowerCase();
    const hash = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    const filename = `${timestamp}-${hash}${ext}`;
    const cleanFolder = folder.replace(/^\/+|\/+$/g, '') || 'general';
    const key = `${cleanFolder}/${filename}`;
    return { key, filename };
  }

  static async uploadFile(
    file: Express.Multer.File,
    folder: string,
    userId: string,
  ): Promise<any> {
    const { key, filename } = this.generateKey(folder, file.originalname);

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await r2Client.send(command);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('Cloudflare R2 Upload Error:', errorMsg);
      throw ApiError.internal(`Failed to upload file to Cloudflare R2: ${errorMsg}`);
    }

    const publicUrl = `${R2_CONFIG.publicUrl}/${key}`;

    const media = await prisma.media.create({
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

  static async generatePresignedUploadUrl(
    dto: PresignedUrlDto,
    _userId: string,
  ): Promise<{ uploadUrl: string; publicUrl: string; key: string; filename: string }> {
    const { key, filename } = this.generateKey(dto.folder, dto.filename);

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      ContentType: dto.contentType,
    });

    try {
      // Presigned URL valid for 15 minutes (900s)
      const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 900 });
      const publicUrl = `${R2_CONFIG.publicUrl}/${key}`;

      return {
        uploadUrl,
        publicUrl,
        key,
        filename,
      };
    } catch (error) {
      console.error('Failed to generate presigned upload URL:', error);
      throw ApiError.internal('Failed to generate presigned upload URL');
    }
  }

  static async getMediaList(
    query: ListMediaQueryDto,
  ): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const where: any = {};

    if (query.folder) {
      where.key = { startsWith: `${query.folder}/` };
    }

    if (query.mimeType) {
      where.mimeType = query.mimeType;
    }

    const [items, total] = await Promise.all([
      prisma.media.findMany({
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
      prisma.media.count({ where }),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async deleteMedia(id: string): Promise<void> {
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw ApiError.notFound('Media item not found');
    }

    const command = new DeleteObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: media.key,
    });

    try {
      await r2Client.send(command);
    } catch (error) {
      console.warn(`Failed to delete object '${media.key}' from R2:`, error);
    }

    await prisma.media.delete({
      where: { id },
    });
  }
}
