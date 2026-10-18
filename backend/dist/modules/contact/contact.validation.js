"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactMessageSchema = void 0;
const zod_1 = require("zod");
exports.sendContactMessageSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100),
    email: zod_1.z.string().trim().email('يرجى إدخال بريد إلكتروني صحيح').toLowerCase(),
    phone: zod_1.z.string().trim().max(30).optional().or(zod_1.z.literal('')),
    subject: zod_1.z.string().trim().min(2, 'الموضوع مطلوب').max(200),
    message: zod_1.z.string().trim().min(5, 'نص الرسالة يجب أن يكون 5 أحرف على الأقل').max(5000),
});
