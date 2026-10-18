"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_config_1 = require("../../config/prisma.config");
const api_error_1 = require("../../utils/api-error");
const jwt_util_1 = require("../../utils/jwt.util");
class AuthService {
    static async login(dto) {
        const user = await prisma_config_1.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
        });
        if (!user) {
            throw api_error_1.ApiError.unauthorized('Invalid email or password');
        }
        if (!user.isActive) {
            throw api_error_1.ApiError.forbidden('Your account has been deactivated. Please contact an administrator.');
        }
        const isMatch = await bcryptjs_1.default.compare(dto.password, user.password);
        if (!isMatch) {
            throw api_error_1.ApiError.unauthorized('Invalid email or password');
        }
        // Update lastLoginAt
        await prisma_config_1.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        const jwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = (0, jwt_util_1.signAccessToken)(jwtPayload);
        const refreshToken = (0, jwt_util_1.signRefreshToken)(jwtPayload);
        const { password: _, ...userSafe } = user;
        return {
            user: userSafe,
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }
    static async refreshToken(rawRefreshToken) {
        if (!rawRefreshToken) {
            throw api_error_1.ApiError.unauthorized('Refresh token is required');
        }
        const payload = (0, jwt_util_1.verifyRefreshToken)(rawRefreshToken);
        const user = await prisma_config_1.prisma.user.findUnique({
            where: { id: payload.userId },
        });
        if (!user) {
            throw api_error_1.ApiError.unauthorized('User not found');
        }
        if (!user.isActive) {
            throw api_error_1.ApiError.forbidden('Account is deactivated');
        }
        const newPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = (0, jwt_util_1.signAccessToken)(newPayload);
        const refreshToken = (0, jwt_util_1.signRefreshToken)(newPayload);
        const { password: _, ...userSafe } = user;
        return {
            user: userSafe,
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }
    static async getMe(userId) {
        const user = await prisma_config_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw api_error_1.ApiError.notFound('User not found');
        }
        const { password: _, ...userSafe } = user;
        return userSafe;
    }
}
exports.AuthService = AuthService;
