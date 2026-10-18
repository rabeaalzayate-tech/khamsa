"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSettingsRoutes = exports.publicSettingsRoutes = void 0;
const express_1 = require("express");
const settings_controller_1 = require("./settings.controller");
const settings_validation_1 = require("./settings.validation");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const common_types_1 = require("../../types/common.types");
// ============================================
// Public Settings Routes
// ============================================
exports.publicSettingsRoutes = (0, express_1.Router)();
exports.publicSettingsRoutes.get('/', settings_controller_1.SettingsController.getPublicSettings);
// ============================================
// Admin Settings Routes
// ============================================
exports.adminSettingsRoutes = (0, express_1.Router)();
// Both ADMIN and EDITOR can view settings in the admin panel
exports.adminSettingsRoutes.get('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN, common_types_1.UserRole.EDITOR), settings_controller_1.SettingsController.getAdminSettings);
// Only ADMIN can update settings
exports.adminSettingsRoutes.patch('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN), (0, validate_middleware_1.validate)({ body: settings_validation_1.updateSettingsSchema }), settings_controller_1.SettingsController.updateSettings);
