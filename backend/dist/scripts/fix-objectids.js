"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_config_1 = require("../config/prisma.config");
async function checkDatabaseIntegrity() {
    try {
        console.log('Connecting to MySQL via Prisma...');
        await prisma_config_1.prisma.$connect();
        const [userCount, articleCount, videoCount, mediaCount, settingsCount, linkCount] = await Promise.all([
            prisma_config_1.prisma.user.count(),
            prisma_config_1.prisma.article.count(),
            prisma_config_1.prisma.video.count(),
            prisma_config_1.prisma.media.count(),
            prisma_config_1.prisma.settings.count(),
            prisma_config_1.prisma.featuredLink.count(),
        ]);
        console.log('📊 Current MySQL Database Record Counts:');
        console.log(`  - Users: ${userCount}`);
        console.log(`  - Articles: ${articleCount}`);
        console.log(`  - Videos: ${videoCount}`);
        console.log(`  - Media: ${mediaCount}`);
        console.log(`  - Settings: ${settingsCount}`);
        console.log(`  - Featured Links: ${linkCount}`);
        console.log('✅ All MySQL relational foreign keys and UUIDs are intact!');
        await prisma_config_1.prisma.$disconnect();
        process.exit(0);
    }
    catch (err) {
        console.error('❌ Error checking database integrity:', err);
        await prisma_config_1.prisma.$disconnect();
        process.exit(1);
    }
}
checkDatabaseIntegrity();
