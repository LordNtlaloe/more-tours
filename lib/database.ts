import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectToDB = async () => {
    try{
        await prisma.$connect();
        console.log("Connection Established With MySQL...");
        return prisma;
    }
    catch(error: any){
        console.log("INIT: Failed To Connect To MySQL...")
    }
}