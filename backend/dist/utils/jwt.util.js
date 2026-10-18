"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const api_error_1 = require("./api-error");
const signAccessToken = (payload) => {
    const options = {
        expiresIn: env_config_1.env.JWT_ACCESS_EXPIRES_IN,
    };
    return jsonwebtoken_1.default.sign(payload, env_config_1.env.JWT_ACCESS_SECRET, options);
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (payload) => {
    const options = {
        expiresIn: env_config_1.env.JWT_REFRESH_EXPIRES_IN,
    };
    return jsonwebtoken_1.default.sign(payload, env_config_1.env.JWT_REFRESH_SECRET, options);
};
exports.signRefreshToken = signRefreshToken;
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_config_1.env.JWT_ACCESS_SECRET);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw api_error_1.ApiError.unauthorized('Access token has expired');
        }
        throw api_error_1.ApiError.unauthorized('Invalid access token');
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_config_1.env.JWT_REFRESH_SECRET);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw api_error_1.ApiError.unauthorized('Refresh token has expired');
        }
        throw api_error_1.ApiError.unauthorized('Invalid refresh token');
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
