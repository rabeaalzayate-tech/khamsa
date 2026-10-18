"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = exports.validateMongoId = exports.validate = void 0;
const zod_1 = require("zod");
const api_error_1 = require("../utils/api-error");
const validate = (validators) => {
    return async (req, _res, next) => {
        try {
            if (validators.params) {
                const parsedParams = await validators.params.parseAsync(req.params ?? {});
                Object.defineProperty(req, 'params', {
                    value: parsedParams,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            }
            if (validators.query) {
                const parsedQuery = await validators.query.parseAsync(req.query ?? {});
                Object.defineProperty(req, 'query', {
                    value: parsedQuery,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            }
            if (validators.body) {
                req.body = await validators.body.parseAsync(req.body ?? {});
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorDetails = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                next(new api_error_1.ApiError(400, 'Validation failed', errorDetails));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validate = validate;
const validateMongoId = (paramName = 'id') => {
    return (req, _res, next) => {
        const id = req.params[paramName];
        if (typeof id !== 'string' || id.trim().length === 0) {
            return next(api_error_1.ApiError.badRequest(`Invalid ID format for parameter '${paramName}'`));
        }
        next();
    };
};
exports.validateMongoId = validateMongoId;
exports.validateId = exports.validateMongoId;
