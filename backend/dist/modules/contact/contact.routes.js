"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const contact_validation_1 = require("./contact.validation");
const contact_controller_1 = require("./contact.controller");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = (0, express_1.Router)();
// Anti-spam rate limiter: Max 10 contact messages per 15 minutes per IP
const contactLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: 'تم إرسال عدة رسائل مؤخراً، يرجى الانتظار بضع دقائق قبل إعادة المحاولة.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
router.post('/', contactLimiter, (0, validate_middleware_1.validate)({ body: contact_validation_1.sendContactMessageSchema }), contact_controller_1.sendContactMessageController);
exports.default = router;
