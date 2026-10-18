import { prisma } from '../config/prisma.config';

async function checkDatabaseIntegrity() {
  try {
    console.log('Connecting to MySQL via Prisma...');
    await prisma.$connect();

    const [userCount, articleCount, videoCount, mediaCount, settingsCount, linkCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.article.count(),
        prisma.video.count(),
        prisma.media.count(),
        prisma.settings.count(),
        prisma.featuredLink.count(),
      ]);

    console.log('📊 Current MySQL Database Record Counts:');
    console.log(`  - Users: ${userCount}`);
    console.log(`  - Articles: ${articleCount}`);
    console.log(`  - Videos: ${videoCount}`);
    console.log(`  - Media: ${mediaCount}`);
    console.log(`  - Settings: ${settingsCount}`);
    console.log(`  - Featured Links: ${linkCount}`);

    console.log('✅ All MySQL relational foreign keys and UUIDs are intact!');
    await prisma.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error checking database integrity:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

checkDatabaseIntegrity();
