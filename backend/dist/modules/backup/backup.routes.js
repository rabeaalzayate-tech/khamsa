"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupRoutes = void 0;
const express_1 = require("express");
const backup_controller_1 = require("./backup.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const common_types_1 = require("../../types/common.types");
const router = (0, express_1.Router)();
// Only ADMIN can access or trigger backups
router.use(auth_middleware_1.authenticate);
router.use((0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN));
router.get('/', backup_controller_1.BackupController.getBackups);
router.post('/', backup_controller_1.BackupController.createBackup);
exports.backupRoutes = router;
