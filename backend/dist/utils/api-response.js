"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static success(res, data, message = 'Success', statusCode = 200) {
        const responseBody = {
            success: true,
            message,
            data,
        };
        return res.status(statusCode).json(responseBody);
    }
    static created(res, data, message = 'Created successfully') {
        return ApiResponse.success(res, data, message, 201);
    }
    static noContent(res) {
        return res.status(204).send();
    }
    static error(res, message = 'An error occurred', statusCode = 500, errors = []) {
        const responseBody = {
            success: false,
            message,
            errors,
        };
        return res.status(statusCode).json(responseBody);
    }
}
exports.ApiResponse = ApiResponse;
