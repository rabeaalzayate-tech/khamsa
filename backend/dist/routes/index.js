"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/users/user.routes");
const article_routes_1 = require("../modules/articles/article.routes");
const video_routes_1 = require("../modules/videos/video.routes");
const media_routes_1 = require("../modules/media/media.routes");
const settings_routes_1 = require("../modules/settings/settings.routes");
const featured_link_routes_1 = require("../modules/featured-links/featured-link.routes");
const backup_routes_1 = require("../modules/backup/backup.routes");
const contact_routes_1 = __importDefault(require("../modules/contact/contact.routes"));
const prisma_config_1 = require("../config/prisma.config");
const api_response_1 = require("../utils/api-response");
const router = (0, express_1.Router)();
// Health Check: /api/v1/health
router.get('/health', async (_req, res) => {
    let dbStatus = 'disconnected';
    try {
        await prisma_config_1.prisma.$queryRaw `SELECT 1`;
        dbStatus = 'connected';
    }
    catch {
        dbStatus = 'disconnected';
    }
    return api_response_1.ApiResponse.success(res, {
        status: 'online',
        database: dbStatus,
        databaseEngine: 'MySQL',
        timestamp: new Date().toISOString(),
    }, 'API v1 is healthy');
});
// ============================================
// Auth Routes: /api/v1/auth
// ============================================
router.use('/auth', auth_routes_1.authRoutes);
// ============================================
// Public Routes: /api/v1/public
// ============================================
const publicRouter = (0, express_1.Router)();
publicRouter.use('/articles', article_routes_1.publicArticleRoutes);
publicRouter.use('/videos', video_routes_1.publicVideoRoutes);
publicRouter.use('/settings', settings_routes_1.publicSettingsRoutes);
publicRouter.use('/featured-links', featured_link_routes_1.publicFeaturedLinkRoutes);
publicRouter.use('/contact', contact_routes_1.default);
router.use('/public', publicRouter);
// ============================================
// Admin Routes: /api/v1/admin
// ============================================
const adminRouter = (0, express_1.Router)();
adminRouter.use('/users', user_routes_1.userRoutes);
adminRouter.use('/articles', article_routes_1.adminArticleRoutes);
adminRouter.use('/videos', video_routes_1.adminVideoRoutes);
adminRouter.use('/featured-links', featured_link_routes_1.adminFeaturedLinkRoutes);
adminRouter.use('/media', media_routes_1.mediaRoutes);
adminRouter.use('/settings', settings_routes_1.adminSettingsRoutes);
adminRouter.use('/backups', backup_routes_1.backupRoutes);
router.use('/admin', adminRouter);
exports.apiRoutes = router;
