"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFeaturedLinkRoutes = exports.publicFeaturedLinkRoutes = void 0;
const express_1 = require("express");
const featured_link_controller_1 = require("./featured-link.controller");
const featured_link_validation_1 = require("./featured-link.validation");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const common_types_1 = require("../../types/common.types");
// ============================================
// Public Featured Links Routes
// ============================================
exports.publicFeaturedLinkRoutes = (0, express_1.Router)();
exports.publicFeaturedLinkRoutes.get('/', featured_link_controller_1.FeaturedLinkController.getPublicFeaturedLinks);
// ============================================
// Admin Featured Links Routes
// ============================================
exports.adminFeaturedLinkRoutes = (0, express_1.Router)();
exports.adminFeaturedLinkRoutes.use(auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN, common_types_1.UserRole.EDITOR));
exports.adminFeaturedLinkRoutes.get('/', (0, validate_middleware_1.validate)({ query: featured_link_validation_1.adminFeaturedLinkQuerySchema }), featured_link_controller_1.FeaturedLinkController.getAdminFeaturedLinks);
exports.adminFeaturedLinkRoutes.post('/', (0, validate_middleware_1.validate)({ body: featured_link_validation_1.createFeaturedLinkSchema }), featured_link_controller_1.FeaturedLinkController.createFeaturedLink);
exports.adminFeaturedLinkRoutes.get('/:id', (0, validate_middleware_1.validateMongoId)('id'), featured_link_controller_1.FeaturedLinkController.getFeaturedLinkById);
exports.adminFeaturedLinkRoutes.patch('/:id', (0, validate_middleware_1.validateMongoId)('id'), (0, validate_middleware_1.validate)({ body: featured_link_validation_1.updateFeaturedLinkSchema }), featured_link_controller_1.FeaturedLinkController.updateFeaturedLink);
exports.adminFeaturedLinkRoutes.patch('/:id/toggle-active', (0, validate_middleware_1.validateMongoId)('id'), featured_link_controller_1.FeaturedLinkController.toggleActive);
exports.adminFeaturedLinkRoutes.delete('/:id', (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN), (0, validate_middleware_1.validateMongoId)('id'), featured_link_controller_1.FeaturedLinkController.deleteFeaturedLink);
