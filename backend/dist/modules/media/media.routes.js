"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRoutes = void 0;
const express_1 = require("express");
const media_controller_1 = require("./media.controller");
const media_validation_1 = require("./media.validation");
const media_upload_1 = require("./media.upload");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const common_types_1 = require("../../types/common.types");
const router = (0, express_1.Router)();
// Both ADMIN and EDITOR can upload, view, and delete media
router.use(auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(common_types_1.UserRole.ADMIN, common_types_1.UserRole.EDITOR));
router.get('/', (0, validate_middleware_1.validate)({ query: media_validation_1.listMediaQuerySchema }), media_controller_1.MediaController.getMediaList);
router.post('/', media_upload_1.upload.single('file'), media_controller_1.MediaController.uploadMedia);
router.post('/presigned-url', (0, validate_middleware_1.validate)({ body: media_validation_1.presignedUrlSchema }), media_controller_1.MediaController.getPresignedUploadUrl);
router.delete('/:id', (0, validate_middleware_1.validateMongoId)('id'), media_controller_1.MediaController.deleteMedia);
exports.mediaRoutes = router;
