"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlatform = exports.ContentStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["EDITOR"] = "EDITOR";
})(UserRole || (exports.UserRole = UserRole = {}));
var ContentStatus;
(function (ContentStatus) {
    ContentStatus["DRAFT"] = "DRAFT";
    ContentStatus["PUBLISHED"] = "PUBLISHED";
})(ContentStatus || (exports.ContentStatus = ContentStatus = {}));
var VideoPlatform;
(function (VideoPlatform) {
    VideoPlatform["TIKTOK"] = "TIKTOK";
    VideoPlatform["YOUTUBE"] = "YOUTUBE";
    VideoPlatform["FACEBOOK"] = "FACEBOOK";
})(VideoPlatform || (exports.VideoPlatform = VideoPlatform = {}));
