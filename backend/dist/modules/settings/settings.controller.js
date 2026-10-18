"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const settings_service_1 = require("./settings.service");
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
class SettingsController {
    static getPublicSettings = (0, async_handler_1.asyncHandler)(async (_req, res) => {
        const settings = await settings_service_1.SettingsService.getSettings();
        return api_response_1.ApiResponse.success(res, settings, 'Public settings retrieved');
    });
    static getAdminSettings = (0, async_handler_1.asyncHandler)(async (_req, res) => {
        const settings = await settings_service_1.SettingsService.getSettings();
        return api_response_1.ApiResponse.success(res, settings, 'Admin settings retrieved');
    });
    static updateSettings = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const settings = await settings_service_1.SettingsService.updateSettings(req.body);
        return api_response_1.ApiResponse.success(res, settings, 'Settings updated successfully');
    });
}
exports.SettingsController = SettingsController;
