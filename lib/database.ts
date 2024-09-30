import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectToDB = async () => {
    try {
      await prisma.$connect();
      console.log("Connection Established With MySQL...");
      return prisma; // Return the PrismaClient instance
    } catch (error) {
      console.log("INIT: Failed To Connect To MySQL...");
      throw error; // You may want to handle the error more gracefully in your application
    }
  }
  