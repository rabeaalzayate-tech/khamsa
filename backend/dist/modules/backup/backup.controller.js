"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupController = void 0;
const backup_service_1 = require("./backup.service");
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
class BackupController {
    static createBackup = (0, async_handler_1.asyncHandler)(async (_req, res) => {
        const backup = await backup_service_1.BackupService.createBackup();
        return api_response_1.ApiResponse.success(res, backup, 'Backup created and uploaded successfully');
    });
    static getBackups = (0, async_handler_1.asyncHandler)(async (_req, res) => {
        const backups = await backup_service_1.BackupService.listBackups();
        return api_response_1.ApiResponse.success(res, backups, 'Backups list retrieved successfully');
    });
}
exports.BackupController = BackupController;
