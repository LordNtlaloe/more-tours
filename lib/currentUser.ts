import { connectToDB } from "./database"; // Ensure this path is correct
import getSession from "./getSession";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getUserSession() {
    return await getSession();
}

export async function getCurrentUser() {
    try {
        const session = await getUserSession();

        if (!session?.user?.email) {
            return null;
        }

        const db = await connectToDB(); // Call connectToDB to get the Prisma client

        const user = await db.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!user) {
            return null;
        }

        const { ...currentUser } = user;

        return currentUser;
    } catch (error) {
        console.log(error);
        return null; // Optionally return null in case of an error
    }
}
