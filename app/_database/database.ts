import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connection established with MySQL...');
    return prisma;
  } catch (error: any) {
    console.log('INIT: Failed to connect to DB...', error.message);
    throw new Error('Failed to connect to the database.');
  }
};
