"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const api_error_1 = require("../utils/api-error");
const env_config_1 = require("../config/env.config");
const errorHandler = (err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    let statusCode = 500;
    let message = 'Internal server error';
    let errors = [];
    if (err instanceof api_error_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    }
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation failed';
        errors = err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
        }));
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = 'Validation failed';
        errors = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message,
        }));
    }
    else if (err instanceof mongoose_1.default.Error.CastError) {
        statusCode = 400;
        message = `Invalid format for '${err.path}': ${err.value}`;
        errors = [{ field: err.path, message: `Invalid value provided for ${err.path}` }];
    }
    else if ('code' in err && err.code === 11000) {
        statusCode = 409;
        const mongoErr = err;
        const fields = mongoErr.keyValue ? Object.keys(mongoErr.keyValue).join(', ') : 'field';
        message = `Duplicate value entered for ${fields}. It must be unique.`;
        errors = [{ field: fields, message: `A record with this ${fields} already exists.` }];
    }
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }
    else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token has expired';
    }
    else if (err.name === 'MulterError') {
        statusCode = 400;
        message = err.message;
    }
    else {
        // Unexpected internal error
        console.error('💥 Unexpected Server Error:', err);
        message = err.message || 'Internal server error';
    }
    const responsePayload = {
        success: false,
        message,
        ...(errors.length > 0 ? { errors } : {}),
        ...(env_config_1.env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    res.status(statusCode).json(responsePayload);
};
exports.errorHandler = errorHandler;
