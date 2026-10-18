"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
const env_config_1 = require("../../config/env.config");
const isProduction = env_config_1.env.NODE_ENV === 'production';
const getCookieOptions = (maxAgeMs) => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: maxAgeMs,
    path: '/',
});
// Access token cookie maxAge: 15 mins (900,000 ms)
const ACCESS_TOKEN_COOKIE_OPTIONS = getCookieOptions(15 * 60 * 1000);
// Refresh token cookie maxAge: 7 days (7 * 24 * 60 * 60 * 1000 ms)
const REFRESH_TOKEN_COOKIE_OPTIONS = getCookieOptions(7 * 24 * 60 * 60 * 1000);
class AuthController {
    static login = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const { user, tokens } = await auth_service_1.AuthService.login(req.body);
        res.cookie('accessToken', tokens.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
        res.cookie('refreshToken', tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
        return api_response_1.ApiResponse.success(res, {
            user,
            accessToken: tokens.accessToken,
        }, 'Logged in successfully');
    });
    static logout = (0, async_handler_1.asyncHandler)(async (_req, res) => {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
        });
        return api_response_1.ApiResponse.success(res, null, 'Logged out successfully');
    });
    static refresh = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const rawRefreshToken = (req.cookies && req.cookies.refreshToken) ||
            (req.body && req.body.refreshToken);
        const { user, tokens } = await auth_service_1.AuthService.refreshToken(rawRefreshToken);
        res.cookie('accessToken', tokens.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
        res.cookie('refreshToken', tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
        return api_response_1.ApiResponse.success(res, {
            user,
            accessToken: tokens.accessToken,
        }, 'Token refreshed successfully');
    });
    static getMe = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const user = await auth_service_1.AuthService.getMe(req.user.userId);
        return api_response_1.ApiResponse.success(res, user, 'Current user profile');
    });
}
exports.AuthController = AuthController;
