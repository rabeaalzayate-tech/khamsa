"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const prisma_config_1 = require("./prisma.config");
const env_config_1 = require("./env.config");
let isConnected = false;
const connectDatabase = async () => {
    if (isConnected) {
        return;
    }
    try {
        await prisma_config_1.prisma.$connect();
        isConnected = true;
        console.log('✅ MySQL Connected successfully via Prisma');
    }
    catch (error) {
        console.error('❌ MySQL Connection Error:', error);
        if (env_config_1.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
            process.exit(1);
        }
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await prisma_config_1.prisma.$disconnect();
        isConnected = false;
        console.log('MySQL connection closed gracefully.');
    }
    catch (error) {
        console.error('Error closing MySQL connection:', error);
    }
};
exports.disconnectDatabase = disconnectDatabase;
