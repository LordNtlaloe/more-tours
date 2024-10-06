import '@prisma/accelerate';
import { getCurrentUser } from "./currentUser";
import { NextResponse } from "next/server";

const isAdminUser = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (currentUser?.role !== "Admin") {
            return new NextResponse(JSON.stringify({ message: "You are not an admin!" }), { status: 403 });
        }
        // You may return a success response or continue execution if needed
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: "An error occurred" }), { status: 500 });
    }
}

export default isAdminUser;
