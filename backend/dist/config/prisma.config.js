"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const env_config_1 = require("./env.config");
const globalForPrisma = global;
exports.prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        log: env_config_1.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
if (env_config_1.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
