"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const api_error_1 = require("../utils/api-error");
const notFoundHandler = (req, _res, next) => {
    next(api_error_1.ApiError.notFound(`Cannot find ${req.method} ${req.originalUrl} on this server`));
};
exports.notFoundHandler = notFoundHandler;
