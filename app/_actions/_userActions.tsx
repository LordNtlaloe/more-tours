'use server';

import { connectToDB } from "../_database/database";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

let dbConnection: any;

const init = async () => {
    if (!dbConnection) {
        dbConnection = await connectToDB();  // Fetch the Prisma client connection
    }
};

// Save a new user
export const saveNewUser = async (formData: FormData) => {
    const password = formData.get("userPassword") as string;
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
        email: formData.get("userEmail") as string,
        name: formData.get("name") as string,
        surname: formData.get("userSurname") as string,
        othernames: formData.get("userOtherNames") as string,
        phoneNumber: formData.get("userPhoneNumber") as string,
        password: hashedPassword,
    };

    await init();

    try {
        const newUser = await dbConnection.user.create({ data });
        redirect("/sign-in");
        return { userId: newUser.id.toString() }; // Adjust based on your schema's ID type
    } catch (error: any) {
        console.log("An error occurred saving new user:", error.message);
        return { error: error.message };
    }
};

// Create or update a user from Clerk
export const createOrUpdateUserFromClerk = async (clerkUser: any) => {
    await init();

    const userData = {
        clerkId: clerkUser.id, // Store the Clerk user ID
        email: clerkUser.emailAddresses[0]?.emailAddress, // Assuming there's at least one email
        name: clerkUser.firstName,
        surname: clerkUser.lastName,
        phoneNumber: clerkUser.phoneNumbers[0]?.phoneNumber || null, // Optional
    };

    try {
        // Check if user already exists
        const existingUser = await dbConnection.user.findUnique({
            where: { clerkId: clerkUser.id },
        });

        if (existingUser) {
            // Update existing user
            return await dbConnection.user.update({
                where: { clerkId: clerkUser.id },
                data: userData,
            });
        } else {
            // Create new user
            return await dbConnection.user.create({ data: userData });
        }
    } catch (error: any) {
        console.log("An error occurred saving or updating user:", error.message);
        return { error: error.message };
    }
};

// Get user by email
export const getUserByEmail = async (email: string) => {
    await init();

    try {
        const user = await dbConnection.user.findUnique({ where: { email } });
        return user ? { ...user, id: user.id.toString() } : null;
    } catch (error: any) {
        console.log("An error occurred:", error.message);
        return { error: error.message };
    }
};

// Get all users
export const getAllUsers = async () => {
    await init();

    try {
        const users = await dbConnection.user.findMany();
        return users.map((user: any) => ({ ...user, id: user.id.toString() }));
    } catch (error: any) {
        console.log("An error occurred getting all users:", error.message);
        return { error: error.message };
    }
};

// Delete user
export const deleteUser = async (_clerkId: string) => {
    await init();

    try {
        const user = await dbConnection.user.delete({ where: { clerkId: _clerkId } });
        revalidatePath("/dashboard/users");
        return user;
    } catch (error: any) {
        console.log("An error occurred deleting user:", error.message);
        return { error: error.message };
    }
};

// Update user role
export const updateUserRole = async (_clerkId: string, _newRole: string) => {
    await init();

    try {
        const updatedUser = await dbConnection.user.update({
            where: { clerkId: _clerkId },
            data: { role: _newRole },
        });
        revalidatePath("/dashboard/users");
        return updatedUser;
    } catch (error: any) {
        console.log("An error occurred updating user role:", error.message);
        return { error: error.message };
    }
};

// Get users count
export const getUsersCount = async () => {
    await init();

    try {
        const count = await dbConnection.user.count();
        return { count };
    } catch (error: any) {
        console.log("An error occurred getting users count:", error.message);
        return { error: error.message };
    }
};
