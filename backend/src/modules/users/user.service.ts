import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma.config';
import { CreateUserDto, UpdateUserDto, ListUsersQueryDto } from './user.validation';
import { PaginatedResult, UserRole } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';

export class UserService {
  static async getUserStats(): Promise<{
    total: number;
    admins: number;
    editors: number;
    active: number;
    inactive: number;
  }> {
    const [total, admins, editors, active, inactive] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({ where: { role: UserRole.EDITOR } }),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { isActive: false } }),
    ]);

    return { total, admins, editors, active, inactive };
  }

  static async createUser(data: CreateUserDto): Promise<Record<string, unknown>> {
    const existing = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existing) {
      throw ApiError.conflict('A user with this email address already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        role: (data.role as UserRole) || UserRole.EDITOR,
        avatar: data.avatar || null,
        bio: data.bio || null,
        socials: data.socials || {},
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    const { password: _, ...userSafe } = user;
    return userSafe;
  }

  static async getUsers(query: ListUsersQueryDto): Promise<PaginatedResult<Record<string, unknown>>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const where: any = {};

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

    let orderBy: any = { createdAt: 'desc' };
    if (query.sort === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else if (query.sort === 'name_asc') {
      orderBy = { name: 'asc' };
    } else if (query.sort === 'name_desc') {
      orderBy = { name: 'desc' };
    }

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    const sanitizedItems = items.map(({ password: _, ...userSafe }) => userSafe);
    return createPaginatedResult(sanitizedItems, total, page, limit);
  }

  static async getUserById(id: string): Promise<Record<string, unknown>> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const { password: _, ...userSafe } = user;
    return userSafe;
  }

  static async updateUser(
    id: string,
    data: UpdateUserDto,
    currentUserId?: string,
  ): Promise<Record<string, unknown>> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    // Check email uniqueness if changing email
    if (data.email && data.email.toLowerCase() !== user.email) {
      const existing = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase() },
      });
      if (existing && existing.id !== id) {
        throw ApiError.conflict('A user with this email address already exists');
      }
    }

    // Prevent demoting or deactivating the last active ADMIN
    if (
      user.role === UserRole.ADMIN &&
      ((data.role && data.role !== UserRole.ADMIN) || data.isActive === false)
    ) {
      const activeAdminCount = await prisma.user.count({
        where: {
          role: UserRole.ADMIN,
          isActive: true,
        },
      });

      if (activeAdminCount <= 1) {
        throw ApiError.badRequest('Cannot demote or deactivate the last active administrator');
      }
    }

    // Prevent demoting or deactivating yourself
    if (currentUserId && currentUserId === id) {
      if (data.role && data.role !== UserRole.ADMIN) {
        throw ApiError.badRequest('Cannot demote your own administrator privileges');
      }
      if (data.isActive === false) {
        throw ApiError.badRequest('Cannot deactivate your own administrator account');
      }
    }

    const updatePayload: any = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.email !== undefined) updatePayload.email = data.email.toLowerCase();
    if (data.role !== undefined) updatePayload.role = data.role as UserRole;
    if (data.avatar !== undefined) updatePayload.avatar = data.avatar;
    if (data.bio !== undefined) updatePayload.bio = data.bio;
    if (data.socials !== undefined) updatePayload.socials = data.socials;
    if (data.isActive !== undefined) updatePayload.isActive = data.isActive;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatePayload,
    });

    const { password: _, ...userSafe } = updatedUser;
    return userSafe;
  }

  static async changePassword(id: string, newPassword: string): Promise<Record<string, unknown>> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    const { password: _, ...userSafe } = updatedUser;
    return userSafe;
  }

  static async toggleStatus(id: string, currentUserId?: string): Promise<Record<string, unknown>> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const nextStatus = !user.isActive;

    if (user.role === UserRole.ADMIN && !nextStatus) {
      const activeAdminCount = await prisma.user.count({
        where: {
          role: UserRole.ADMIN,
          isActive: true,
        },
      });

      if (activeAdminCount <= 1) {
        throw ApiError.badRequest('Cannot deactivate the last active administrator');
      }
    }

    if (currentUserId && currentUserId === id && !nextStatus) {
      throw ApiError.badRequest('Cannot deactivate your own administrator account');
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive: nextStatus },
    });

    const { password: _, ...userSafe } = updatedUser;
    return userSafe;
  }

  static async deleteUser(id: string, currentUserId?: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    // Prevent deleting the last ADMIN
    if (user.role === UserRole.ADMIN) {
      const adminCount = await prisma.user.count({
        where: { role: UserRole.ADMIN },
      });

      if (adminCount <= 1) {
        throw ApiError.badRequest('Cannot delete the last administrator account');
      }
    }

    // Prevent deleting own account
    if (currentUserId && currentUserId === id) {
      throw ApiError.badRequest('Cannot delete your own administrator account');
    }

    await prisma.user.delete({
      where: { id },
    });
  }
}
