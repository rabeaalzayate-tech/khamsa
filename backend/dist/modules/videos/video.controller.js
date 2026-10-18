"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const video_service_1 = require("./video.service");
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
class VideoController {
    // Public handlers
    static getPublicVideos = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await video_service_1.VideoService.getPublicVideos(req.query);
        return api_response_1.ApiResponse.success(res, result, 'Public videos retrieved');
    });
    static getPublicVideoById = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const video = await video_service_1.VideoService.getPublicVideoById(req.params.id);
        return api_response_1.ApiResponse.success(res, video, 'Video details retrieved');
    });
    // Admin handlers
    static getAdminVideos = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await video_service_1.VideoService.getAdminVideos(req.query);
        return api_response_1.ApiResponse.success(res, result, 'Videos retrieved');
    });
    static getVideoById = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const video = await video_service_1.VideoService.getVideoById(req.params.id);
        return api_response_1.ApiResponse.success(res, video, 'Video details retrieved');
    });
    static createVideo = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const video = await video_service_1.VideoService.createVideo(req.body, req.user.userId);
        return api_response_1.ApiResponse.created(res, video, 'Video created successfully');
    });
    static updateVideo = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const video = await video_service_1.VideoService.updateVideo(req.params.id, req.body);
        return api_response_1.ApiResponse.success(res, video, 'Video updated successfully');
    });
    static publishVideo = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const video = await video_service_1.VideoService.publishVideo(req.params.id);
        return api_response_1.ApiResponse.success(res, video, 'Video published successfully');
    });
    static unpublishVideo = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const video = await video_service_1.VideoService.unpublishVideo(req.params.id);
        return api_response_1.ApiResponse.success(res, video, 'Video unpublished successfully');
    });
    static deleteVideo = (0, async_handler_1.asyncHandler)(async (req, res) => {
        await video_service_1.VideoService.deleteVideo(req.params.id);
        return api_response_1.ApiResponse.success(res, null, 'Video deleted successfully');
    });
}
exports.VideoController = VideoController;
