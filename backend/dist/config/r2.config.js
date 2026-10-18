"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.R2_CONFIG = exports.r2Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_config_1 = require("./env.config");
exports.r2Client = new client_s3_1.S3Client({
    region: 'auto',
    endpoint: `https://${env_config_1.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: env_config_1.env.R2_ACCESS_KEY_ID,
        secretAccessKey: env_config_1.env.R2_SECRET_ACCESS_KEY,
    },
});
exports.R2_CONFIG = {
    bucketName: env_config_1.env.R2_BUCKET_NAME || 'khamsa-cms',
    publicUrl: (env_config_1.env.R2_PUBLIC_URL || 'https://pub-f9f474a915314796ac71ef9e5b4b78a0.r2.dev').replace(/\/$/, ''),
};
