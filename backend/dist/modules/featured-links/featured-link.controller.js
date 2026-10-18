"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedLinkController = void 0;
const featured_link_service_1 = require("./featured-link.service");
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
class FeaturedLinkController {
    // Public handler
    static getPublicFeaturedLinks = (0, async_handler_1.asyncHandler)(async (_req, res) => {
        const links = await featured_link_service_1.FeaturedLinkService.getPublicFeaturedLinks();
        return api_response_1.ApiResponse.success(res, links, 'تم جلب الروابط المميزة بنجاح');
    });
    // Admin handlers
    static getAdminFeaturedLinks = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await featured_link_service_1.FeaturedLinkService.getAdminFeaturedLinks(req.query);
        return api_response_1.ApiResponse.success(res, result, 'تم جلب الروابط المميزة بنجاح');
    });
    static getFeaturedLinkById = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const link = await featured_link_service_1.FeaturedLinkService.getFeaturedLinkById(req.params.id);
        return api_response_1.ApiResponse.success(res, link, 'تم جلب تفاصيل الرابط المميز');
    });
    static createFeaturedLink = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const link = await featured_link_service_1.FeaturedLinkService.createFeaturedLink(req.body);
        return api_response_1.ApiResponse.created(res, link, 'تم إضافة الرابط بنجاح');
    });
    static updateFeaturedLink = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const link = await featured_link_service_1.FeaturedLinkService.updateFeaturedLink(req.params.id, req.body);
        return api_response_1.ApiResponse.success(res, link, 'تم تحديث الرابط بنجاح');
    });
    static toggleActive = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const link = await featured_link_service_1.FeaturedLinkService.toggleActive(req.params.id);
        const message = link.isActive ? 'تم تفعيل الرابط' : 'تم تعطيل الرابط';
        return api_response_1.ApiResponse.success(res, link, message);
    });
    static deleteFeaturedLink = (0, async_handler_1.asyncHandler)(async (req, res) => {
        await featured_link_service_1.FeaturedLinkService.deleteFeaturedLink(req.params.id);
        return api_response_1.ApiResponse.success(res, null, 'تم حذف الرابط بنجاح');
    });
}
exports.FeaturedLinkController = FeaturedLinkController;
