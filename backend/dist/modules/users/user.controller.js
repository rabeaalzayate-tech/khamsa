"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
class UserController {
    static getUserStats = (0, async_handler_1.asyncHandler)(async (_req, res) => {
        const stats = await user_service_1.UserService.getUserStats();
        return api_response_1.ApiResponse.success(res, stats, 'User statistics retrieved successfully');
    });
    static createUser = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.UserService.createUser(req.body);
        return api_response_1.ApiResponse.created(res, user, 'User created successfully');
    });
    static getUsers = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await user_service_1.UserService.getUsers(req.query);
        return api_response_1.ApiResponse.success(res, result, 'Users retrieved successfully');
    });
    static getUserById = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.UserService.getUserById(req.params.id);
        return api_response_1.ApiResponse.success(res, user, 'User retrieved successfully');
    });
    static updateUser = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.UserService.updateUser(req.params.id, req.body, req.user?.userId);
        return api_response_1.ApiResponse.success(res, user, 'User updated successfully');
    });
    static changePassword = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const { password } = req.body;
        const user = await user_service_1.UserService.changePassword(req.params.id, password);
        return api_response_1.ApiResponse.success(res, user, 'User password changed successfully');
    });
    static toggleStatus = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.UserService.toggleStatus(req.params.id, req.user?.userId);
        return api_response_1.ApiResponse.success(res, user, 'User status toggled successfully');
    });
    static deleteUser = (0, async_handler_1.asyncHandler)(async (req, res) => {
        await user_service_1.UserService.deleteUser(req.params.id, req.user?.userId);
        return api_response_1.ApiResponse.success(res, null, 'User deleted successfully');
    });
}
exports.UserController = UserController;
