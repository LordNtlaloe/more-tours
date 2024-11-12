"use client"
import React, { useState } from 'react';
import { DialogClose } from '../ui/dialog';
import { getDestinationByName, saveNewDestination } from '@/app/_actions/_destinationActions';
import Image from 'next/image';
import InputText from '../general/InputText';
import { clearAllFields, showConfirmationMessage, showToastMessage } from "@/lib/generalFunctions";
import { BeatLoader } from "react-spinners";
import { useDestinationStore } from "@/lib/Stores/destinationStore";

export default function NewDestinationForm() {
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { showAddNewDestinationModal, setShowNewDestinationModal } = useDestinationStore()

    const handleImageChange = (e: any) => {
        const imageSelected = e.target.files[0];
        if (imageSelected) {
            setImage(imageSelected);
            setImagePreview(URL.createObjectURL(imageSelected) as any)
        }
        else {
            setImage("");
            setImagePreview(null)
        }
    }

    const validateInputs = (formData: FormData): boolean => {
        const name = formData.get("name");
        const description = formData.get("destination");

        if (name === "" || description === "" || image === "") {
            return false;
        }
        return true;
    }

    const saveDestination = async (formData: FormData) => {
        const destination = await getDestinationByName(formData.get("name") as string);
        if (destination.length > 0) {
            showConfirmationMessage("error", `Destination "${formData.get('name')}" already exists!!`)
            return
        }
        if (validateInputs(formData)) {
            showConfirmationMessage("error", "Both destination name and icon are required!")
            return
        }
        setIsLoading(true);

        let imageURL;

        if (image) {
            const imageData = new FormData()
            imageData.append("file", image);
            imageData.append("upload_preset", "");

            try {
                const response = await fetch(
                    "",
                    {
                        method: "POST",
                        body: imageData,
                    }
                )
                const uploadedImageData = await response.json();
                imageURL = uploadedImageData.secure_url;
            }
            catch (error) {
                showConfirmationMessage("error", `Error uploading image: ${error}. Please verify you have internet connectivity`)
                setImage("")
                setImagePreview(null)
                setIsLoading(false)
                return
            }
        }
        else {
            setIsLoading(false)
            showConfirmationMessage("error", "Image is required...")
        }
        formData.append('imageURL', imageURL);
        const newDestination = await saveNewDestination(formData);
        if (newDestination) {
            showToastMessage("success", "Destination saved successfully...")
            //Reset input fields...
            clearAllFields()
            setImagePreview(null)
        } else {
            setIsLoading(false)
            showConfirmationMessage("error", `An error occured saving new destination! ${newDestination}`)
        }

        setIsLoading(false)
    }

    return (
        <main className="">
            <h1 className="text-lg font-semibold py-4 border-b mb-4">ADD NEW CATEGORY</h1>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="font-bold">Saving Destination</h1>
                    <BeatLoader color="#0a09f5" size={30} />
                    <p className="font-semibold text-sm">please wait...</p>
                </div>
            ) : (
                <form action={(formData: FormData) => {
                    setIsLoading(true)
                    saveDestination(formData)
                    setIsLoading(false)
                }

                } className="">

                    <div className="flex flex-col">
                        <div>
                            <InputText
                                text="Destination Name"
                                name="name"
                                placeholder=""
                                required={false}
                                type="text"
                            />

                        </div>
                        <div>
                            <InputText
                                text="Destination Description"
                                name="description"
                                placeholder=""
                                required={false}
                                type="text"
                            />

                        </div>

                        <div className="grid grid-cols-3 mb-8 gap-3 mt-5">
                            <div className=" col-span-2">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="file_input"
                                >
                                    Image Icon
                                </label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    type="file"
                                    name="destinationIcon"
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={handleImageChange}
                                />
                                <p
                                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                    id="file_input_help"
                                >
                                    PNG, JPG or JPEG.
                                </p>
                            </div>
                            <div className="h-20 flex items-center justify-center w-full border py-4 rounded bg-gray-300 ">
                                {imagePreview && (
                                    <Image src={imagePreview} height={60} width={60} alt="icon" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Image preview */}

                    <div className="flex items-center justify-end gap-4 py-3 border-t">
                        <button className="bg-blue-600 px-6 text-white py-1 ">Save</button>

                        <button type="button" className="bg-red-600 text-white px-6 rounded py-1" onClick={() => setShowNewDestinationModal(false)}>
                            Cancel
                        </button>

                    </div>

                </form>
            )}
        </main>
    )
}
