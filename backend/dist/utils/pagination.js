"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginatedResult = exports.getPaginationOptions = void 0;
const getPaginationOptions = (params) => {
    const parsedPage = typeof params.page === 'string' ? parseInt(params.page, 10) : params.page || 1;
    const parsedLimit = typeof params.limit === 'string' ? parseInt(params.limit, 10) : params.limit || 10;
    const maxLimit = params.maxLimit || 100;
    const page = Math.max(1, isNaN(parsedPage) ? 1 : parsedPage);
    const limit = Math.min(maxLimit, Math.max(1, isNaN(parsedLimit) ? 10 : parsedLimit));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};
exports.getPaginationOptions = getPaginationOptions;
const createPaginatedResult = (items, total, page, limit) => {
    const totalPages = Math.ceil(total / limit) || 1;
    return {
        items,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
};
exports.createPaginatedResult = createPaginatedResult;
