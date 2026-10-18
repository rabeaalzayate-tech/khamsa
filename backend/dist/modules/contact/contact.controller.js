"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactMessageController = void 0;
const async_handler_1 = require("../../utils/async-handler");
const api_response_1 = require("../../utils/api-response");
const contact_service_1 = require("./contact.service");
exports.sendContactMessageController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await contact_service_1.contactService.sendContactMessage(req.body);
    return api_response_1.ApiResponse.success(res, result, result.message, 200);
});
