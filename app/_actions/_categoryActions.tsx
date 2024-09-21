"use server";

import { connectToDB } from "../_database/database"; // Adjust your import as needed
import { revalidatePath } from "next/cache";

let dbConnection: any;

const init = async () => {
    if (!dbConnection) {
        dbConnection = await connectToDB();  // Fetch the Prisma client connection
    }
};

export const getAllCategories = async () => {
  await init();

  try {
    const allCategories = await dbConnection.category.findMany(); // Assuming 'category' is your model name
    return allCategories.map((category: { id: { toString: () => any; }; }) => ({
      ...category,
      id: category.id.toString(), // Adjust based on your schema's ID type
    }));
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

export const getCategoryByName = async (categoryName: string) => {
  await init();

  try {
    const category = await dbConnection.category.findUnique({
      where: { name: categoryName },
    });
    return category ? { ...category, id: category.id.toString() } : null;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

export const deleteOneCategory = async (id: string) => {
  await init();

  try {
    const deleted = await dbConnection.category.delete({
      where: { id: Number(id) }, // Adjust based on your ID type
    });
    revalidatePath('/dashboard/categories');
    return deleted;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

export const updateCategory = async (id: string, newName: string) => {
  await init();

  try {
    const updated = await dbConnection.category.update({
      where: { id: Number(id) }, // Adjust based on your ID type
      data: { name: newName },
    });
    revalidatePath('/dashboard/categories');
    return updated;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    return { error: error.message };
  }
};

export const saveNewCategory = async (formData: FormData) => {
  const data = {
    name: formData.get("categoryName") as string,
    icon: formData.get("iconURL") as string,
  };

  await init();

  try {
    const newCategory = await dbConnection.category.create({
      data,
    });
    revalidatePath('/dashboard/categories');
    return { categoryID: newCategory.id }; // Adjust based on your schema
  } catch (error: any) {
    console.error("An error occurred while saving new category:", error.message);
    return { error: error.message };
  }
};
