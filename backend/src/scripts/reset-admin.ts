import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.config';
import { UserRole } from '../types/common.types';

async function resetAdmin() {
  try {
    await prisma.$connect();
    console.log('Connected to MySQL via Prisma');

    const hashedPassword = await bcrypt.hash('AdminPassword123!', 12);

    const user = await prisma.user.upsert({
      where: { email: 'admin@khamsa.dev' },
      update: {
        password: hashedPassword,
        role: UserRole.ADMIN,
        isActive: true,
      },
      create: {
        name: 'Khamsa Admin',
        email: 'admin@khamsa.dev',
        password: hashedPassword,
        role: UserRole.ADMIN,
        isActive: true,
      },
    });

    console.log(`✅ Admin user (${user.email}) reset successfully with password: AdminPassword123!`);
    await prisma.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error resetting admin:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

resetAdmin();
