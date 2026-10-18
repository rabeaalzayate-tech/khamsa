"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_config_1 = require("../config/prisma.config");
const common_types_1 = require("../types/common.types");
async function resetAdmin() {
    try {
        await prisma_config_1.prisma.$connect();
        console.log('Connected to MySQL via Prisma');
        const hashedPassword = await bcryptjs_1.default.hash('AdminPassword123!', 12);
        const user = await prisma_config_1.prisma.user.upsert({
            where: { email: 'admin@khamsa.dev' },
            update: {
                password: hashedPassword,
                role: common_types_1.UserRole.ADMIN,
                isActive: true,
            },
            create: {
                name: 'Khamsa Admin',
                email: 'admin@khamsa.dev',
                password: hashedPassword,
                role: common_types_1.UserRole.ADMIN,
                isActive: true,
            },
        });
        console.log(`✅ Admin user (${user.email}) reset successfully with password: AdminPassword123!`);
        await prisma_config_1.prisma.$disconnect();
        process.exit(0);
    }
    catch (err) {
        console.error('Error resetting admin:', err);
        await prisma_config_1.prisma.$disconnect();
        process.exit(1);
    }
}
resetAdmin();
