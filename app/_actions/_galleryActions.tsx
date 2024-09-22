"use server";

import { connectToDB } from "../_database/database"; // Adjust your import as needed
import { revalidatePath } from "next/cache";

let dbConnection: any;

const init = async () => {
    if (!dbConnection) {
        dbConnection = await connectToDB();  // Initialize your Prisma client connection
    }
};

// Fetch all gallery images including related tours
export const getAllGalleries = async () => {
  await init();

  try {
    const allGalleries = await dbConnection.gallery.findMany({
      include: {
        tour: true, // Include the related tour in the result
      },
    });

    // Return galleries with ID as a string (if needed)
    return allGalleries.map((gallery: { id: { toString: () => any }; }) => ({
      ...gallery,
      id: gallery.id.toString(),
    }));
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

// Fetch gallery images by tourId
export const getGalleriesByTourId = async (tourId: string) => {
  await init();

  try {
    const galleries = await dbConnection.gallery.findMany({
      where: { tourId: Number(tourId) },
    });

    return galleries.map((gallery: { id: { toString: () => any }; }) => ({
      ...gallery,
      id: gallery.id.toString(),
    }));
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

// Delete a gallery image by its ID
export const deleteOneGallery = async (id: string) => {
  await init();

  try {
    const deleted = await dbConnection.gallery.delete({
      where: { id: Number(id) },
    });

    revalidatePath('/dashboard/galleries');
    return deleted;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

// Update an image in the gallery (no change to related tour)
export const updateGallery = async (id: string, newImageUrl: string) => {
  await init();

  try {
    const updated = await dbConnection.gallery.update({
      where: { id: Number(id) },
      data: { image: newImageUrl },
    });

    revalidatePath('/dashboard/galleries');
    return updated;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

// Save a new gallery image for a specific tour
export const saveNewGallery = async (formData: FormData) => {
  const galleryData = {
    image: formData.get("imageURL") as string,
    tourId: Number(formData.get("tourId")), // Assuming the form includes tourId
  };

  await init();

  try {
    const newGallery = await dbConnection.gallery.create({
      data: galleryData,
    });

    revalidatePath('/dashboard/galleries');
    return { galleryID: newGallery.id.toString() };
  } catch (error: any) {
    console.error("An error occurred while saving the new gallery:", error.message);
    return { error: error.message };
  }
};
