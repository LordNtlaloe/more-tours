import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const config = {
    runtime: 'nodejs',
};

export const connectToDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connection Established With MySQL...");
        return prisma; // Return the PrismaClient instance
    } catch (error) {
        console.log("INIT: Failed To Connect To MySQL...");
        throw error; // Handle the error gracefully
    }
}
