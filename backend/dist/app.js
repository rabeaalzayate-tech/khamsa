"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const env_config_1 = require("./config/env.config");
const database_config_1 = require("./config/database.config");
const prisma_config_1 = require("./config/prisma.config");
const routes_1 = require("./routes");
const rate_limiter_middleware_1 = require("./middlewares/rate-limiter.middleware");
const not_found_middleware_1 = require("./middlewares/not-found.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const api_response_1 = require("./utils/api-response");
const createApp = () => {
    const app = (0, express_1.default)();
    // Trust reverse proxy (Cloudflare, Nginx, etc.)
    app.set('trust proxy', 1);
    // Security headers
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        crossOriginEmbedderPolicy: false,
    }));
    // CORS configuration
    const allowedOrigins = (0, env_config_1.getAllowedOrigins)();
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin ||
                allowedOrigins.includes(origin) ||
                allowedOrigins.includes('*') ||
                origin.endsWith('.vercel.app')) {
                callback(null, true);
            }
            else {
                callback(new Error(`CORS origin '${origin}' not allowed`));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));
    // Rate Limiting
    app.use('/api', rate_limiter_middleware_1.apiLimiter);
    // Body parsers
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, cookie_parser_1.default)());
    // Response compression
    app.use((0, compression_1.default)());
    // Request Logging (exclude logging in test mode)
    if (env_config_1.env.NODE_ENV !== 'test') {
        app.use((0, morgan_1.default)(env_config_1.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
            skip: (req) => req.url === '/health',
        }));
    }
    // DB Connection Middleware for Serverless / Cloud
    app.use(async (_req, _res, next) => {
        try {
            await (0, database_config_1.connectDatabase)();
            next();
        }
        catch (err) {
            console.error('Database connection middleware error:', err);
            next(err);
        }
    });
    // Root endpoint
    app.get('/', (_req, res) => {
        return api_response_1.ApiResponse.success(res, {
            name: 'Khamsa CMS API',
            brand: 'خمسة برمجة بالبلدي',
            version: '1.0.0',
            databaseEngine: 'MySQL',
            status: 'online',
            endpoints: {
                health: '/health',
                apiHealth: '/api/v1/health',
                articles: '/api/v1/public/articles',
                videos: '/api/v1/public/videos',
                settings: '/api/v1/public/settings',
            },
        }, 'Welcome to Khamsa CMS API');
    });
    // Health Check Endpoint
    app.get('/health', async (_req, res) => {
        let dbStatus = 'disconnected';
        try {
            await prisma_config_1.prisma.$queryRaw `SELECT 1`;
            dbStatus = 'connected';
        }
        catch {
            dbStatus = 'disconnected';
        }
        return api_response_1.ApiResponse.success(res, {
            environment: env_config_1.env.NODE_ENV,
            database: dbStatus,
            databaseEngine: 'MySQL',
            timestamp: new Date().toISOString(),
        }, 'API is healthy');
    });
    // Central API routes
    app.use('/api/v1', routes_1.apiRoutes);
    // 404 Handler
    app.use(not_found_middleware_1.notFoundHandler);
    // Centralized Error Handler
    app.use(error_middleware_1.errorHandler);
    return app;
};
exports.createApp = createApp;
