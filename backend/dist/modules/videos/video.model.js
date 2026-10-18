"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const mongoose_1 = require("mongoose");
const common_types_1 = require("../../types/common.types");
const videoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Video title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
        index: true,
    },
    description: {
        type: String,
        required: [true, 'Video description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    platform: {
        type: String,
        enum: Object.values(common_types_1.VideoPlatform),
        required: [true, 'Platform is required'],
        index: true,
    },
    url: {
        type: String,
        required: [true, 'Video URL is required'],
        trim: true,
    },
    thumbnail: {
        type: String,
        trim: true,
        default: null,
    },
    status: {
        type: String,
        enum: Object.values(common_types_1.ContentStatus),
        default: common_types_1.ContentStatus.DRAFT,
        index: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
        index: true,
    },
    publishedAt: {
        type: Date,
        default: null,
        index: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(_doc, ret) {
            delete ret['__v'];
            return ret;
        },
    },
});
videoSchema.index({ status: 1, publishedAt: -1 });
videoSchema.index({ status: 1, platform: 1, publishedAt: -1 });
exports.Video = (0, mongoose_1.model)('Video', videoSchema);
