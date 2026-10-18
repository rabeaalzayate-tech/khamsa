"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedOrigins = exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
// Load environment variables from .env file
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('production'),
    PORT: zod_1.z.coerce.number().default(5000),
    CLIENT_URL: zod_1.z
        .string()
        .default('https://khamsa-web.vercel.app,http://localhost:3000,http://localhost:3001,*'),
    DATABASE_URL: zod_1.z
        .string()
        .default(process.env.DATABASE_URL || 'mysql://root:@localhost:3306/khamsa_cms'),
    MONGODB_URI: zod_1.z
        .string()
        .optional(),
    JWT_ACCESS_SECRET: zod_1.z
        .string()
        .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters')
        .default(process.env.JWT_ACCESS_SECRET || 'khamsa_jwt_access_super_secret_key_production_grade_32chars!'),
    JWT_REFRESH_SECRET: zod_1.z
        .string()
        .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters')
        .default(process.env.JWT_REFRESH_SECRET || 'khamsa_jwt_refresh_super_secret_key_production_grade_32chars!'),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.string().default('15m'),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('7d'),
    R2_ACCOUNT_ID: zod_1.z.string().default(process.env.R2_ACCOUNT_ID || ''),
    R2_ACCESS_KEY_ID: zod_1.z.string().default(process.env.R2_ACCESS_KEY_ID || ''),
    R2_SECRET_ACCESS_KEY: zod_1.z
        .string()
        .default(process.env.R2_SECRET_ACCESS_KEY || ''),
    R2_BUCKET_NAME: zod_1.z.string().default(process.env.R2_BUCKET_NAME || 'khamsa-cms'),
    R2_PUBLIC_URL: zod_1.z.string().default(process.env.R2_PUBLIC_URL || ''),
    ADMIN_NAME: zod_1.z.string().default(process.env.ADMIN_NAME || 'ربيع شعبان'),
    ADMIN_EMAIL: zod_1.z.string().email().default(process.env.ADMIN_EMAIL || 'admin@khamsa.dev'),
    ADMIN_PASSWORD: zod_1.z.string().min(8).default(process.env.ADMIN_PASSWORD || 'AdminPassword123!'),
    SMTP_HOST: zod_1.z.string().default(process.env.SMTP_HOST || 'smtp.gmail.com'),
    SMTP_PORT: zod_1.z.coerce.number().default(Number(process.env.SMTP_PORT) || 465),
    SMTP_SECURE: zod_1.z.coerce.boolean().default(true),
    SMTP_USER: zod_1.z.string().default(process.env.SMTP_USER || ''),
    SMTP_PASS: zod_1.z.string().default(process.env.SMTP_PASS || ''),
    CONTACT_RECEIVER_EMAIL: zod_1.z.string().email().default(process.env.CONTACT_RECEIVER_EMAIL || 'admin@khamsa.dev'),
});
const parseEnv = () => {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        console.warn('⚠️ Some environment variables are using fallbacks:', result.error.format());
        // Parse with empty object to use all defaults safely
        return envSchema.parse({});
    }
    return result.data;
};
exports.env = parseEnv();
// Helper to get array of allowed origins from CLIENT_URL
const getAllowedOrigins = () => {
    return exports.env.CLIENT_URL.split(',').map(url => url.trim());
};
exports.getAllowedOrigins = getAllowedOrigins;
