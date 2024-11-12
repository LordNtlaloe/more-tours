"use client";

import { updateDestination } from "@/app/_actions/_destinationActions";
import { useState } from "react";

import InputText from "../general/InputText";
import { showConfirmationMessage, showToastMessage } from "@/lib/generalFunctions";
import { BeatLoader, ClipLoader } from "react-spinners";
import { useDestinationStore } from "@/lib/Stores/destinationStore";
import { redirect, useRouter } from "next/navigation";

export default function UpdateDestinationForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { showUpdateDestinationModal, setShowUpdateDestinationModal, destinationId, destinationName, destinationDescription, setDestinationID, setDestinationName, setDestinationDescription } = useDestinationStore()
    const router = useRouter()

    const saveDestinationUpdate = async (formData: FormData) => {

        const newName = formData.get("name")
        const newDescription = formData.get("descriptiom")

        if (!newName) {
            showConfirmationMessage("error", "Destination name is required!")
            return
        }
        if (!newDescription) {
            showConfirmationMessage("error", "Destination description is required!")
            return
        }
        if (newName === destinationName) {
            showConfirmationMessage("warning", "Destination name has not changed!")
            return
        }
        if (newDescription === destinationDescription) {
            showConfirmationMessage("warning", "Destination Description has not changed!")
            return
        }

        setIsLoading(true)

        const updatedDestination = await updateDestination(destinationId, newName as string, newDescription as string)
        if (updatedDestination) {
            showToastMessage("success", "Destination saved successfully updated...")
            setDestinationID("")
            setDestinationName("")
            setShowUpdateDestinationModal(false)
            router.push('/dashboard/categories')
        } else {
            setIsLoading(false)
            showConfirmationMessage("error", `An error occured updating destination! ${updateDestination}`)
        }

        setIsLoading(false)

    };
    return (
        <main className="">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="font-bold">Saving Destination</h1>
                    <BeatLoader color="#0a09f5" size={30} />
                    <p className="font-semibold text-sm">please wait...</p>
                </div>
            ) : (
                <form action={(formData: FormData) => {
                    setIsLoading(true)
                    saveDestinationUpdate(formData)
                    setIsLoading(false)
                }

                } className="">

                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold py-4 border-b mb-4">UPDATE CATEGORY</h1>
                        <div>
                            <InputText
                                text="Destination Name"
                                name="name"
                                placeholder=""
                                required={false}
                                type="text"
                                defaultValue={destinationName}
                            />

                        </div>
                        <div>
                            <InputText
                                text="Destination Description"
                                name="description"
                                placeholder=""
                                required={false}
                                type="text"
                                defaultValue={destinationDescription}
                            />

                        </div>

                    </div>

                    {/* Image preview */}

                    <div className="flex items-center justify-end gap-4 py-3 border-t">
                        <button className="bg-blue-600 px-6 text-white py-1 ">
                            Update
                        </button>

                        <button type="button" className="bg-red-600 text-white px-6 rounded py-1" onClick={() => {
                            setShowUpdateDestinationModal(false)
                            setDestinationID("")
                            setDestinationName("")
                            router.push('/dashboard/destinations')
                        }}>
                            Cancel
                        </button>

                    </div>

                </form>
            )}
        </main>

    )
}
