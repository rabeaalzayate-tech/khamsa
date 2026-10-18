"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const media_service_1 = require("./media.service");
const api_response_1 = require("../../utils/api-response");
const api_error_1 = require("../../utils/api-error");
const async_handler_1 = require("../../utils/async-handler");
class MediaController {
    static uploadMedia = (0, async_handler_1.asyncHandler)(async (req, res) => {
        if (!req.file) {
            throw api_error_1.ApiError.badRequest('No image file provided in request');
        }
        const folder = req.body.folder || 'general';
        const media = await media_service_1.MediaService.uploadFile(req.file, folder, req.user.userId);
        return api_response_1.ApiResponse.created(res, media, 'Image uploaded successfully');
    });
    static getPresignedUploadUrl = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await media_service_1.MediaService.generatePresignedUploadUrl(req.body, req.user.userId);
        return api_response_1.ApiResponse.success(res, result, 'Presigned upload URL generated successfully');
    });
    static getMediaList = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await media_service_1.MediaService.getMediaList(req.query);
        return api_response_1.ApiResponse.success(res, result, 'Media items retrieved');
    });
    static deleteMedia = (0, async_handler_1.asyncHandler)(async (req, res) => {
        await media_service_1.MediaService.deleteMedia(req.params.id);
        return api_response_1.ApiResponse.success(res, null, 'Media deleted successfully');
    });
}
exports.MediaController = MediaController;
