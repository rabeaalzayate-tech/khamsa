"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_config_1 = require("../../config/prisma.config");
const common_types_1 = require("../../types/common.types");
const api_error_1 = require("../../utils/api-error");
const pagination_1 = require("../../utils/pagination");
class UserService {
    static async getUserStats() {
        const [total, admins, editors, active, inactive] = await Promise.all([
            prisma_config_1.prisma.user.count(),
            prisma_config_1.prisma.user.count({ where: { role: common_types_1.UserRole.ADMIN } }),
            prisma_config_1.prisma.user.count({ where: { role: common_types_1.UserRole.EDITOR } }),
            prisma_config_1.prisma.user.count({ where: { isActive: true } }),
            prisma_config_1.prisma.user.count({ where: { isActive: false } }),
        ]);
        return { total, admins, editors, active, inactive };
    }
    static async createUser(data) {
        const existing = await prisma_config_1.prisma.user.findUnique({
            where: { email: data.email.toLowerCase() },
        });
        if (existing) {
            throw api_error_1.ApiError.conflict('A user with this email address already exists');
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 12);
        const user = await prisma_config_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email.toLowerCase(),
                password: hashedPassword,
                role: data.role || common_types_1.UserRole.EDITOR,
                avatar: data.avatar || null,
                bio: data.bio || null,
                socials: data.socials || {},
                isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
            },
        });
        const { password: _, ...userSafe } = user;
        return userSafe;
    }
    static async getUsers(query) {
        const { page, limit, skip } = (0, pagination_1.getPaginationOptions)({
            page: query.page,
            limit: query.limit,
        });
        const where = {};
        if (query.role) {
            where.role = query.role;
        }
        if (query.isActive !== undefined) {
            where.isActive = query.isActive;
        }
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { email: { contains: query.search } },
            ];
        }
        let orderBy = { createdAt: 'desc' };
        if (query.sort === 'oldest') {
            orderBy = { createdAt: 'asc' };
        }
        else if (query.sort === 'name_asc') {
            orderBy = { name: 'asc' };
        }
        else if (query.sort === 'name_desc') {
            orderBy = { name: 'desc' };
        }
        const [items, total] = await Promise.all([
            prisma_config_1.prisma.user.findMany({
                where,
                orderBy,
                skip,
                take: limit,
            }),
            prisma_config_1.prisma.user.count({ where }),
        ]);
        const sanitizedItems = items.map(({ password: _, ...userSafe }) => userSafe);
        return (0, pagination_1.createPaginatedResult)(sanitizedItems, total, page, limit);
    }
    static async getUserById(id) {
        const user = await prisma_config_1.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw api_error_1.ApiError.notFound('User not found');
        }
        const { password: _, ...userSafe } = user;
        return userSafe;
    }
    static async updateUser(id, data, currentUserId) {
        const user = await prisma_config_1.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw api_error_1.ApiError.notFound('User not found');
        }
        // Check email uniqueness if changing email
        if (data.email && data.email.toLowerCase() !== user.email) {
            const existing = await prisma_config_1.prisma.user.findUnique({
                where: { email: data.email.toLowerCase() },
            });
            if (existing && existing.id !== id) {
                throw api_error_1.ApiError.conflict('A user with this email address already exists');
            }
        }
        // Prevent demoting or deactivating the last active ADMIN
        if (user.role === common_types_1.UserRole.ADMIN &&
            ((data.role && data.role !== common_types_1.UserRole.ADMIN) || data.isActive === false)) {
            const activeAdminCount = await prisma_config_1.prisma.user.count({
                where: {
                    role: common_types_1.UserRole.ADMIN,
                    isActive: true,
                },
            });
            if (activeAdminCount <= 1) {
                throw api_error_1.ApiError.badRequest('Cannot demote or deactivate the last active administrator');
            }
        }
        // Prevent demoting or deactivating yourself
        if (currentUserId && currentUserId === id) {
            if (data.role && data.role !== common_types_1.UserRole.ADMIN) {
                throw api_error_1.ApiError.badRequest('Cannot demote your own administrator privileges');
            }
            if (data.isActive === false) {
                throw api_error_1.ApiError.badRequest('Cannot deactivate your own administrator account');
            }
        }
        const updatePayload = {};
        if (data.name !== undefined)
            updatePayload.name = data.name;
        if (data.email !== undefined)
            updatePayload.email = data.email.toLowerCase();
        if (data.role !== undefined)
            updatePayload.role = data.role;
        if (data.avatar !== undefined)
            updatePayload.avatar = data.avatar;
        if (data.bio !== undefined)
            updatePayload.bio = data.bio;
        if (data.socials !== undefined)
            updatePayload.socials = data.socials;
        if (data.isActive !== undefined)
            updatePayload.isActive = data.isActive;
        const updatedUser = await prisma_config_1.prisma.user.update({
            where: { id },
            data: updatePayload,
        });
        const { password: _, ...userSafe } = updatedUser;
        return userSafe;
    }
    static async changePassword(id, newPassword) {
        const user = await prisma_config_1.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw api_error_1.ApiError.notFound('User not found');
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
        const updatedUser = await prisma_config_1.prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
        const { password: _, ...userSafe } = updatedUser;
        return userSafe;
    }
    static async toggleStatus(id, currentUserId) {
        const user = await prisma_config_1.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw api_error_1.ApiError.notFound('User not found');
        }
        const nextStatus = !user.isActive;
        if (user.role === common_types_1.UserRole.ADMIN && !nextStatus) {
            const activeAdminCount = await prisma_config_1.prisma.user.count({
                where: {
                    role: common_types_1.UserRole.ADMIN,
                    isActive: true,
                },
            });
            if (activeAdminCount <= 1) {
                throw api_error_1.ApiError.badRequest('Cannot deactivate the last active administrator');
            }
        }
        if (currentUserId && currentUserId === id && !nextStatus) {
            throw api_error_1.ApiError.badRequest('Cannot deactivate your own administrator account');
        }
        const updatedUser = await prisma_config_1.prisma.user.update({
            where: { id },
            data: { isActive: nextStatus },
        });
        const { password: _, ...userSafe } = updatedUser;
        return userSafe;
    }
    static async deleteUser(id, currentUserId) {
        const user = await prisma_config_1.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw api_error_1.ApiError.notFound('User not found');
        }
        // Prevent deleting the last ADMIN
        if (user.role === common_types_1.UserRole.ADMIN) {
            const adminCount = await prisma_config_1.prisma.user.count({
                where: { role: common_types_1.UserRole.ADMIN },
            });
            if (adminCount <= 1) {
                throw api_error_1.ApiError.badRequest('Cannot delete the last administrator account');
            }
        }
        // Prevent deleting own account
        if (currentUserId && currentUserId === id) {
            throw api_error_1.ApiError.badRequest('Cannot delete your own administrator account');
        }
        await prisma_config_1.prisma.user.delete({
            where: { id },
        });
    }
}
exports.UserService = UserService;
