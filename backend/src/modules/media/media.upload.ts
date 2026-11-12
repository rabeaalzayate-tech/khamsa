import multer from 'multer';
import { ApiError } from '../../utils/api-error';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        ApiError.badRequest(
          `Invalid file type: ${file.mimetype}. Allowed types: JPEG, PNG, WEBP, AVIF, GIF, MP4, WEBM, OGG, MOV.`,
        ),
      );
    }
  },
});
