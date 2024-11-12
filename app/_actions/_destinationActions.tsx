"use server";

import { connectToDB } from "../_database/database"; // Adjust your import as needed
import { revalidatePath } from "next/cache";

let dbConnection: any;

const init = async () => {
    if (!dbConnection) {
        dbConnection = await connectToDB();  // Initialize your Prisma client connection
    }
};

// Fetch all destinations, including their associated tours
export const getAllDestinations = async () => {
  await init();

  try {
    const allDestinations = await dbConnection.destination.findMany({
      include: {
        tours: true, // Include the related tours in the result
      },
    });

    // Return destinations with ID as a string (if needed)
    return allDestinations.map((destination: { id: { toString: () => any }; }) => ({
      ...destination,
      id: destination.id.toString(),
    }));
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

// Fetch a single destination by name, including its tours
export const getDestinationByName = async (destinationName: string) => {
  await init();

  try {
    const destination = await dbConnection.destination.findUnique({
      where: { name: destinationName },
      include: {
        tours: true, // Include related tours in the result
      },
    });

    return destination ? { ...destination, id: destination.id.toString() } : null;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

// Delete a destination and its associated tours
export const deleteOneDestination = async (id: string) => {
  await init();

  try {
    const deleted = await dbConnection.destination.delete({
      where: { id: Number(id) },
      include: {
        tours: true, // Ensure deletion of related tours (cascade may handle this automatically depending on DB config)
      },
    });

    revalidatePath('/dashboard/destinations');
    return deleted;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

// Update the name of a destination (no change to related tours)
export const updateDestination = async (id: string, newName: string, p0: string) => {
  await init();

  try {
    const updated = await dbConnection.destination.update({
      where: { id: Number(id) },
      data: { name: newName },
    });

    revalidatePath('/dashboard/destinations');
    return updated;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

// Save a new destination with associated tours
export const saveNewDestination = async (formData: FormData) => {
  const destinationData = {
    name: formData.get("categoryName") as string,
    description: formData.get("description") as string,
    image: formData.get("imageURL") as string,
    tours: [
      {
        name: formData.get("tourName") as string,
        price: parseFloat(formData.get("tourPrice") as string),
      },
    ], // Add tour data from form if needed
  };

  await init();

  try {
    const newDestination = await dbConnection.destination.create({
      data: {
        ...destinationData,
        tours: {
          create: destinationData.tours, // Create related tours for the destination
        },
      },
    });

    revalidatePath('/dashboard/destinations');
    return { destinationID: newDestination.id.toString() };
  } catch (error: any) {
    console.error("An error occurred while saving the new destination:", error.message);
    return { error: error.message };
  }
};
