"use server"
import { revalidatePath } from "next/cache";
import { connectToDB } from "../_database/database";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

// Initialize the Prisma connection
let dbConnection: any;

const init = async () => {
    if (!dbConnection) {
        dbConnection = await connectToDB();
    }
};

export const saveNewTourRating = async (formData: FormData) => {
    if (!dbConnection) await init();

    try {
        const tourId = formData.get("tourId") as string;
        const userId = formData.get("userId") as string;
        const rating = Number(formData.get("rating"));
        const comment = formData.get("comment");

        // Check if the user has booked the tour
        const bookingCount = await dbConnection.booking.count({
            where: {
                userId: Number(userId),
                tourId: Number(tourId),
            },
        });

        // Check if the user has already rated the tour
        const ratingCount = await dbConnection.review.count({
            where: {
                userId: Number(userId),
                tourId: Number(tourId),
            },
        });

        if (ratingCount >= bookingCount) {
            console.log("User has already rated the tour based on their bookings");
            return { error: "User has already rated the tour based on their bookings" };
        }

        const tour = await dbConnection.tour.findUnique({
            where: { id: Number(tourId) },
        });

        if (!tour) {
            console.log("Tour not found");
            return { error: "Tour not found" };
        }

        // Calculate new overall rating
        const newRatingsCount = (tour.ratingsCount ?? 0) + 1;
        const previousOverallRating = isNaN(tour.overallRating) ? 0 : tour.overallRating;
        const newTotalRating = ((previousOverallRating * (tour.ratingsCount ?? 0)) + rating) / newRatingsCount;

        // Update tour's overall rating and ratings count
        await dbConnection.tour.update({
            where: { id: Number(tourId) },
            data: {
                overallRating: newTotalRating,
                ratingsCount: newRatingsCount,
            },
        });

        // Create a new rating entry
        await dbConnection.review.create({
            data: {
                tourId: Number(tourId),
                userId: Number(userId),
                rating,
                comment,
                createdAt: new Date(),
            },
        });

        return { success: true };
    } catch (error) {
        console.error("An error occurred while saving rating:", error);
        return { error: "Failed to save rating" };
    }
};

export const getAllRatingsByTourId = async (tourId: string) => {
    if (!dbConnection) await init();

    try {
        // Fetch ratings using Prisma
        const ratings = await dbConnection.rating.findMany({
            where: { tourId: tourId }, // Adjust based on your schema
            include: {
                user: true, // Optionally include user data if needed
            },
        });

        // Map the result to include any additional transformations if necessary
        return ratings.map((rating: any) => ({
            ...rating,
            id: rating.id, // Adjust based on your schema if needed
        }));
    } catch (error: any) {
        console.log("An error occurred...", error.message);
        return { error: error.message };
    }
};

export const getAllRatings = async () => {
    if (!dbConnection) await init();

    try {
        // Fetch ratings using Prisma
        const ratings = await dbConnection.rating.findMany({
            include: {
                user: true, 
                categoty: true
            },
        });

        // Map the result to include any additional transformations if necessary
        return ratings.map((rating: any) => ({
            ...rating,
            id: rating.id, // Adjust based on your schema if needed
        }));
    } catch (error: any) {
        console.log("An error occurred...", error.message);
        return { error: error.message };
    }
};