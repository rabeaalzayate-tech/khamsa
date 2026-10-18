import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z
    .string()
    .default('https://khamsa-web.vercel.app,http://localhost:3000,http://localhost:3001,*'),
  DATABASE_URL: z
    .string()
    .default(process.env.DATABASE_URL || 'mysql://root:@localhost:3306/khamsa_cms'),
  MONGODB_URI: z
    .string()
    .optional(),
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters')
    .default(process.env.JWT_ACCESS_SECRET || 'khamsa_jwt_access_super_secret_key_production_grade_32chars!'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters')
    .default(process.env.JWT_REFRESH_SECRET || 'khamsa_jwt_refresh_super_secret_key_production_grade_32chars!'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  R2_ACCOUNT_ID: z.string().default(process.env.R2_ACCOUNT_ID || ''),
  R2_ACCESS_KEY_ID: z.string().default(process.env.R2_ACCESS_KEY_ID || ''),
  R2_SECRET_ACCESS_KEY: z
    .string()
    .default(process.env.R2_SECRET_ACCESS_KEY || ''),
  R2_BUCKET_NAME: z.string().default(process.env.R2_BUCKET_NAME || 'khamsa-cms'),
  R2_PUBLIC_URL: z.string().default(process.env.R2_PUBLIC_URL || ''),
  ADMIN_NAME: z.string().default(process.env.ADMIN_NAME || 'ربيع شعبان'),
  ADMIN_EMAIL: z.string().email().default(process.env.ADMIN_EMAIL || 'admin@khamsa.dev'),
  ADMIN_PASSWORD: z.string().min(8).default(process.env.ADMIN_PASSWORD || 'AdminPassword123!'),
  SMTP_HOST: z.string().default(process.env.SMTP_HOST || 'smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().default(Number(process.env.SMTP_PORT) || 465),
  SMTP_SECURE: z.coerce.boolean().default(true),
  SMTP_USER: z.string().default(process.env.SMTP_USER || ''),
  SMTP_PASS: z.string().default(process.env.SMTP_PASS || ''),
  CONTACT_RECEIVER_EMAIL: z.string().email().default(process.env.CONTACT_RECEIVER_EMAIL || 'admin@khamsa.dev'),
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

export const env = parseEnv();

// Helper to get array of allowed origins from CLIENT_URL
export const getAllowedOrigins = (): string[] => {
  return env.CLIENT_URL.split(',').map(url => url.trim());
};
