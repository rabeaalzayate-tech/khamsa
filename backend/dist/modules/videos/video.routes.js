"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminVideoRoutes = exports.publicVideoRoutes = void 0;
const express_1 = require("express");
const video_controller_1 = require("./video.controller");
const video_validation_1 = require("./video.validation");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const common_types_1 = require("../../types/common.types");
// ============================================
// Public Video Routes
// ============================================
exports.publicVideoRoutes = (0, express_1.Router)();
exports.publicVideoRoutes.get('/', (0, validate_middleware_1.validate)({ query: video_validation_1.publicVideoQuerySchema }), video_controller_1.VideoController.getPublicVideos);
exports.publicVideoRoutes.get('/:id', (0, validate_middleware_1.validateMongoId)('id'), video_controller_1.VideoController.getPublicVideoById);
// ============================================
// Admin Video Routes
// ============================================
exports.adminVideoRoutes = (0, express_1.Router)();
// Both ADMIN and EDITOR can manage videos
exports.adminVideoRoutes.use(auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN, common_types_1.UserRole.EDITOR));
exports.adminVideoRoutes.get('/', (0, validate_middleware_1.validate)({ query: video_validation_1.adminVideoQuerySchema }), video_controller_1.VideoController.getAdminVideos);
exports.adminVideoRoutes.post('/', (0, validate_middleware_1.validate)({ body: video_validation_1.createVideoSchema }), video_controller_1.VideoController.createVideo);
exports.adminVideoRoutes.get('/:id', (0, validate_middleware_1.validateMongoId)('id'), video_controller_1.VideoController.getVideoById);
exports.adminVideoRoutes.patch('/:id', (0, validate_middleware_1.validateMongoId)('id'), (0, validate_middleware_1.validate)({ body: video_validation_1.updateVideoSchema }), video_controller_1.VideoController.updateVideo);
exports.adminVideoRoutes.patch('/:id/publish', (0, validate_middleware_1.validateMongoId)('id'), video_controller_1.VideoController.publishVideo);
exports.adminVideoRoutes.patch('/:id/unpublish', (0, validate_middleware_1.validateMongoId)('id'), video_controller_1.VideoController.unpublishVideo);
exports.adminVideoRoutes.delete('/:id', (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN), (0, validate_middleware_1.validateMongoId)('id'), video_controller_1.VideoController.deleteVideo);
