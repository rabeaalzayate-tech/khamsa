"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminArticleRoutes = exports.publicArticleRoutes = void 0;
const express_1 = require("express");
const article_controller_1 = require("./article.controller");
const article_validation_1 = require("./article.validation");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const common_types_1 = require("../../types/common.types");
// ============================================
// Public Article Routes
// ============================================
exports.publicArticleRoutes = (0, express_1.Router)();
exports.publicArticleRoutes.get('/', (0, validate_middleware_1.validate)({ query: article_validation_1.publicArticleQuerySchema }), article_controller_1.ArticleController.getPublicArticles);
exports.publicArticleRoutes.get('/:slug', article_controller_1.ArticleController.getPublicArticleBySlug);
// ============================================
// Admin Article Routes
// ============================================
exports.adminArticleRoutes = (0, express_1.Router)();
// Both ADMIN and EDITOR can manage articles
exports.adminArticleRoutes.use(auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN, common_types_1.UserRole.EDITOR));
exports.adminArticleRoutes.get('/', (0, validate_middleware_1.validate)({ query: article_validation_1.adminArticleQuerySchema }), article_controller_1.ArticleController.getAdminArticles);
exports.adminArticleRoutes.post('/', (0, validate_middleware_1.validate)({ body: article_validation_1.createArticleSchema }), article_controller_1.ArticleController.createArticle);
exports.adminArticleRoutes.get('/:id', (0, validate_middleware_1.validateMongoId)('id'), article_controller_1.ArticleController.getArticleById);
exports.adminArticleRoutes.patch('/:id', (0, validate_middleware_1.validateMongoId)('id'), (0, validate_middleware_1.validate)({ body: article_validation_1.updateArticleSchema }), article_controller_1.ArticleController.updateArticle);
exports.adminArticleRoutes.patch('/:id/publish', (0, validate_middleware_1.validateMongoId)('id'), article_controller_1.ArticleController.publishArticle);
exports.adminArticleRoutes.patch('/:id/unpublish', (0, validate_middleware_1.validateMongoId)('id'), article_controller_1.ArticleController.unpublishArticle);
// Only ADMIN can delete articles (or ADMIN and EDITOR per requirements)
exports.adminArticleRoutes.delete('/:id', (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN), (0, validate_middleware_1.validateMongoId)('id'), article_controller_1.ArticleController.deleteArticle);
