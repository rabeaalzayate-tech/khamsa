"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_config_1 = require("./config/env.config");
const database_config_1 = require("./config/database.config");
const backup_service_1 = require("./modules/backup/backup.service");
const http_1 = __importDefault(require("http"));
const startServer = async () => {
    // Connect to Database
    await (0, database_config_1.connectDatabase)();
    // Start Automated Daily Cloud Backup Scheduler
    backup_service_1.BackupService.startDailyBackupScheduler();
    const app = (0, app_1.createApp)();
    const server = http_1.default.createServer(app);
    server.listen(env_config_1.env.PORT, () => {
        console.log(`
🚀 ===============================================
   Khamsa CMS API is running!
   Brand: خمسة برمجة بالبلدي
   Environment: ${env_config_1.env.NODE_ENV}
   Port: ${env_config_1.env.PORT}
   Base URL: http://localhost:${env_config_1.env.PORT}/api/v1
   Health Check: http://localhost:${env_config_1.env.PORT}/health
🚀 ===============================================
    `);
    });
    const gracefulShutdown = async (signal) => {
        console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
        server.close(async () => {
            console.log('HTTP server closed.');
            await (0, database_config_1.disconnectDatabase)();
            console.log('Graceful shutdown completed. Exiting process.');
            process.exit(0);
        });
        // Force close after 10 seconds if hanging
        setTimeout(() => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
    };
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('unhandledRejection', (reason) => {
        console.error('💥 Unhandled Rejection at Promise:', reason);
    });
    process.on('uncaughtException', (error) => {
        console.error('💥 Uncaught Exception thrown:', error);
        process.exit(1);
    });
};
startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
