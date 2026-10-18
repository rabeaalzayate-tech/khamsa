"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const api_error_1 = require("../utils/api-error");
const authenticate = (req, _res, next) => {
    try {
        let token;
        // Check Authorization header (Bearer <token>)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
        else if (req.cookies && req.cookies.accessToken) {
            // Check HTTPOnly cookie
            token = req.cookies.accessToken;
        }
        if (!token) {
            return next(api_error_1.ApiError.unauthorized('Authentication token is required'));
        }
        const payload = (0, jwt_util_1.verifyAccessToken)(token);
        req.user = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
