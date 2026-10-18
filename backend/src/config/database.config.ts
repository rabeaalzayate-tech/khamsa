import { prisma } from './prisma.config';
import { env } from './env.config';

let isConnected = false;

export const connectDatabase = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  try {
    await prisma.$connect();
    isConnected = true;
    console.log('✅ MySQL Connected successfully via Prisma');
  } catch (error) {
    console.error('❌ MySQL Connection Error:', error);
    if (env.NODE_ENV !== 'test' && !process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    isConnected = false;
    console.log('MySQL connection closed gracefully.');
  } catch (error) {
    console.error('Error closing MySQL connection:', error);
  }
};
