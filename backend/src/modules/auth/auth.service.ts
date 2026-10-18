import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma.config';
import { LoginDto, AuthTokens } from './auth.types';
import { ApiError } from '../../utils/api-error';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.util';
import { JwtPayload, UserRole } from '../../types/common.types';

export class AuthService {
  static async login(
    dto: LoginDto,
  ): Promise<{ user: Record<string, unknown>; tokens: AuthTokens }> {
    const user = await prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Your account has been deactivated. Please contact an administrator.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const jwtPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = signAccessToken(jwtPayload);
    const refreshToken = signRefreshToken(jwtPayload);

    const { password: _, ...userSafe } = user;

    return {
      user: userSafe,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  static async refreshToken(
    rawRefreshToken: string,
  ): Promise<{ user: Record<string, unknown>; tokens: AuthTokens }> {
    if (!rawRefreshToken) {
      throw ApiError.unauthorized('Refresh token is required');
    }

    const payload = verifyRefreshToken(rawRefreshToken);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw ApiError.unauthorized('User not found');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Account is deactivated');
    }

    const newPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = signAccessToken(newPayload);
    const refreshToken = signRefreshToken(newPayload);

    const { password: _, ...userSafe } = user;

    return {
      user: userSafe,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  static async getMe(userId: string): Promise<Record<string, unknown>> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const { password: _, ...userSafe } = user;
    return userSafe;
  }
}
