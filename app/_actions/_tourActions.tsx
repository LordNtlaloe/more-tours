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

export const createTour = async (formData: FormData) => {
    // Extract data from formData
    const data = {
        title: formData.get('tour_name') as string,
        description: formData.get('tour_description') as string,
        category: formData.get('category') as string,
        price: parseFloat(formData.get('tour_price') as string),
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        duration: parseInt(formData.get('duration') as string),
        destination: formData.get('destination') as string,
        availableSlots: parseInt(formData.get('availableSlots') as string),
    };

    // Initialize the database connection
    await init();

    try {
        // Ensure Prisma client is available
        if (!dbConnection) {
            return { error: "Failed to connect to the database." };
        }

        // Save the new tour using Prisma ORM
        const newTour = await dbConnection.tour.create({
            data: {
                title: data.title,
                description: data.description,
                category: data.category,
                price: data.price,
                startDate: data.startDate,
                endDate: data.endDate,
                duration: data.duration,
                destination: data.destination,
                availableSlots: data.availableSlots,
            },
        });

        // Revalidate the path (for Next.js)
        revalidatePath('/dashboard/tours');

        // Return the newly created tour ID
        return { tourID: newTour.id };
    } catch (error: any) {
        console.log("An error occurred while adding a new tour:", error.message);
        return { error: error.message };
    }
};

export const getAllTours = async () => {
    await init(); // Ensure DB connection is initialized
    try {
        const allTours = await dbConnection.tour.findMany({
            include: {
                category: true,
                destination: true,  // Include related destination information
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return allTours.map((tour: any) => ({
            id: tour.id,
            title: tour.title,
            description: tour.description,
            price: tour.price,
            image: tour.image,
            category: tour.category ? { name: tour.category.name } : null,
            destination: tour.destination ? { name: tour.destination.name } : null, // Ensure destination is included
        }));
    } catch (error: any) {
        console.error("An error occurred while fetching tours and categories:", error.message);
        return { error: error.message };
    }
};

export const getAllToursByCategory = async (category_name: string) => {
    if (!dbConnection) await init(); // Ensure database connection

    try {
        const allTours = await dbConnection.tour.findMany({
            where: {
                category: {
                    name: category_name, // Filter by category name
                },
            },
            include: {
                category: true, // Include related category information
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return allTours; // Return the filtered tours
    } catch (error: any) {
        console.log("An error occurred while fetching tours by category...", error.message);
        return { error: error.message };
    }
};


export const getTourById = async (id: string) => {
    if (!dbConnection) await init();

    try {
        let tour = await dbConnection.tour.findUnique({
            where: {
                id: id
            }
        });

        if (tour) {
            tour = { ...tour, id: tour.id.toSting() }
        }
        return tour;
    }
    catch (error: any) {
        console.log("An error occured...", error.message);
        return { "error": error.message }
    }

}

export const getTourByName = async (name: string) => {
    if (!dbConnection) await init();

    try {
        let tour = await dbConnection.tour.findUnique({
            where: {
                name: name
            }
        });

        if (tour) {
            tour = { ...tour, name: tour.name.toSting() }
        }
        return tour;
    }
    catch (error: any) {
        console.log("An error occured...", error.message);
        return { "error": error.message }
    }
}

export const updateTour = async (id: number, formData: FormData) => {
    // Extract data from formData
    const data = {
        title: formData.get('tour_name') as string,
        description: formData.get('tour_description') as string,
        category: formData.get('category') as string, // Handle category correctly if it's a relation
        price: parseFloat(formData.get('tour_price') as string),
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        duration: parseInt(formData.get('duration') as string),
        destination: formData.get('destination') as string,
        availableSlots: parseInt(formData.get('availableSlots') as string),
    };

    // Initialize the database connection
    await init();

    try {
        // Ensure Prisma client is available
        if (!dbConnection) {
            return { error: "Failed to connect to the database." };
        }

        // Update the tour using Prisma ORM
        const updatedTour = await dbConnection.tour.update({
            where: {
                id: id, // Ensure id is of the correct type (number)
            },
            data: {
                title: data.title,
                description: data.description,
                // Handle category properly if it's a relation
                category: {
                    connect: { name: data.category }, // Example for connecting by name
                },
                price: data.price,
                startDate: data.startDate,
                endDate: data.endDate,
                duration: data.duration,
                destination: data.destination,
                availableSlots: data.availableSlots,
            },
        });

        // Revalidate the path (for Next.js)
        revalidatePath('/dashboard/tours');

        return updatedTour; // Return the updated tour
    } catch (error: any) {
        console.log("An error occurred while updating the tour:", error.message);
        return { error: error.message };
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

export const getTourCount = async () => {
    if (!dbConnection) await init();

    try {
        // Use Prisma to count the number of tours
        const count = await dbConnection.tour.count();

        return { count };
    } catch (error: any) {
        console.log("An error occurred getting tour count...", error.message);
        return { error: error.message };
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

export const hasUserBookedTour = async (userId: string, tourId: string) => {
    if (!dbConnection) await init();

    try {
        // Check if a booking exists for the user and tour using Prisma
        const booking = await dbConnection.booking.findFirst({
            where: {
                userId: userId,
                tourId: tourId, // Adjust based on your schema if necessary
            },
        });

        return !!booking; // Returns true if booking exists, otherwise false
    } catch (error: any) {
        console.log("An error occurred checking user booking...", error.message);
        return { error: error.message };
    }
};

export const getUserRatingCount = async (userId: string, tourId: string) => {
    if (!dbConnection) await init();

    try {
        // Use Prisma to count ratings for the user and tour
        const ratingCount = await dbConnection.rating.count({
            where: {
                userId: userId,
                tourId: tourId, // Adjust based on your schema if necessary
            },
        });

        return ratingCount; // Return the count
    } catch (error: any) {
        console.log("An error occurred getting user rating count...", error.message);
        return { error: error.message };
    }
};

export const updateTourStatus = async (id: string, newStatus: string) => {
    if (!dbConnection) await init();
    try {
        // Ensure the tour exists and update its status using Prisma
        const updatedTour = await dbConnection.tour.update({
            where: { id: Number(id) }, // Assuming `id` is a number. If it's a string, adjust accordingly.
            data: { status: newStatus }, // Ensure your `Tour` model has a `status` field
        });

        return updatedTour;
    } catch (error: any) {
        console.error("Error updating tour status:", error.message);
        return { error: error.message };
    }
};
