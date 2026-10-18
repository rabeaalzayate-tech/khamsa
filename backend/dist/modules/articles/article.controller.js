"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const article_service_1 = require("./article.service");
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
class ArticleController {
    // Public handlers
    static getPublicArticles = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await article_service_1.ArticleService.getPublicArticles(req.query);
        return api_response_1.ApiResponse.success(res, result, 'Public articles retrieved');
    });
    static getPublicArticleBySlug = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const article = await article_service_1.ArticleService.getPublicArticleBySlug(req.params.slug);
        return api_response_1.ApiResponse.success(res, article, 'Article details retrieved');
    });
    // Admin handlers
    static getAdminArticles = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await article_service_1.ArticleService.getAdminArticles(req.query);
        return api_response_1.ApiResponse.success(res, result, 'Articles retrieved');
    });
    static getArticleById = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const article = await article_service_1.ArticleService.getArticleById(req.params.id);
        return api_response_1.ApiResponse.success(res, article, 'Article details retrieved');
    });
    static createArticle = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const article = await article_service_1.ArticleService.createArticle(req.body, req.user.userId);
        return api_response_1.ApiResponse.created(res, article, 'Article created successfully');
    });
    static updateArticle = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const article = await article_service_1.ArticleService.updateArticle(req.params.id, req.body);
        return api_response_1.ApiResponse.success(res, article, 'Article updated successfully');
    });
    static publishArticle = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const article = await article_service_1.ArticleService.publishArticle(req.params.id);
        return api_response_1.ApiResponse.success(res, article, 'Article published successfully');
    });
    static unpublishArticle = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const article = await article_service_1.ArticleService.unpublishArticle(req.params.id);
        return api_response_1.ApiResponse.success(res, article, 'Article unpublished successfully');
    });
    static deleteArticle = (0, async_handler_1.asyncHandler)(async (req, res) => {
        await article_service_1.ArticleService.deleteArticle(req.params.id);
        return api_response_1.ApiResponse.success(res, null, 'Article deleted successfully');
    });
}
exports.ArticleController = ArticleController;
