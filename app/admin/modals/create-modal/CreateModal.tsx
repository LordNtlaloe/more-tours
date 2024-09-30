"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import Input from '@/components/general/Input'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./schema"
import Select from "@/components/general/Select"
import { optionLocations, optionTypes } from "@/data/data"
import Button from "@/components/general/Button"
import { toast } from "react-hot-toast"
import { createNewListing, postImages } from "./service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import ModalLayout from "../../layout/ModalLayout"
import { z } from "zod"

// Define your form data type based on the schema
type FormData = z.infer<typeof schema>;

interface CreateModalProps {
    handleHideModal: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ handleHideModal }) => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;
    const router = useRouter();
    const [images, setImages] = useState<File[]>([]); // Define the images state as an array of File objects
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state

    // React Query mutation for creating a new listing
    const { mutateAsync } = useMutation({
        mutationFn: async ({ data, imageUrls }: { data: FormData, imageUrls: string[] }) => createNewListing(data, imageUrls),
        mutationKey: ["listings"]
    });

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
            beds: 5,
            hasFreeWifi: false,
            type: "luxury",
            location: "dubai",
            pricePerNight: 123
        }
    });

    // Error handling for form validation
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((key) => {
                toast.error(errors[key as keyof FormData]?.message as string);
            });
        }
    }, [errors]);

    // Handle image file selection
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImages((prev) => [...prev, e.target.files![0]]);
        }
    };

    // Function to upload images
    const uploadImage = async (image: File, idx: number): Promise<string | undefined> => {
        if (!image) return;

        const toastId = toast.loading(`Image ${idx + 1} is being uploaded`);

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const imageUrl = await postImages(CLOUD_NAME, formData);
            toast.success(`Successfully uploaded image ${idx + 1}`);
            toast.dismiss(toastId);
            return imageUrl;
        } catch (error) {
            console.error(error);
            toast.dismiss(toastId);
            toast.error(`Failed to upload image ${idx + 1}`);
        }
    };

    // Submit handler for the form
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!images.length) return toast.error("You must upload at least one image!");

        // Set isLoading to true when form submission begins
        setIsLoading(true);

        try {
            // Upload images and get their URLs
            const imageUrls = await Promise.all(images.map((image, idx) => uploadImage(image, idx)));

            // Filter out any undefined image URLs
            const validImageUrls = imageUrls.filter(Boolean) as string[];

            if (!validImageUrls.length) return toast.error("Image upload failed. Please try again.");

            // Create new listing with form data and image URLs
            const newListing = await mutateAsync({ data, imageUrls: validImageUrls });
            toast.success("Redirecting to listing...");
            router.push(`/details/${newListing.id}`);
        } catch (error) {
            toast.error("An error occurred while creating the listing.");
        } finally {
            // Set isLoading to false after the submission process completes
            setIsLoading(false);
        }
    };

    return (
        <ModalLayout
            isCreating
            document="listing"
            handleHideModal={handleHideModal}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-6 flex flex-col items-center gap-8">
                <Input
                    type="text"
                    className="text-slate-400 w-[400px] outline-none p-2"
                    register={register("name")}
                    placeholder="Arabian Paradise"
                />
                <Input
                    type="text"
                    className="text-slate-400 w-[400px] outline-none p-2"
                    register={register("desc")}
                    placeholder="This hotel is amazing. It has this view...."
                />
                <Select
                    data={optionLocations}
                    className="text-slate-400 w-[400px] outline-none p-2 ml-2"
                    register={register("location")}
                />
                <Select
                    data={optionTypes}
                    className="text-slate-400 w-[400px] outline-none p-2 ml-2"
                    register={register("type")}
                />
                <Input
                    type="number"
                    className="text-slate-400 w-[400px] outline-none p-2"
                    register={register("pricePerNight", { valueAsNumber: true })}
                    step={0.01}
                    placeholder="$249.00"
                />
                <div className="text-slate-400 ml-4 w-[400px] flex items-center gap-4">
                    <label htmlFor="freeWifi">Free Wifi</label>
                    <Input
                        register={register("hasFreeWifi")}
                        type="checkbox"
                        id="freeWifi"
                        className="w-4 h-4" placeholder={""} />
                </div>
                <label className="text-slate-400 w-[400px] ml-4" htmlFor="images">Upload images</label>
                <input
                    onChange={handleImage}
                    type="file"
                    className="text-slate-400"
                    style={{ display: "none" }}
                    id="images"
                />
                <Button
                    disabled={isLoading} // Disable button when loading
                    className="w-[400px] bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
                    label={isLoading ? "Submitting..." : "Submit"} // Show submitting text when loading
                />
            </form>
        </ModalLayout>
    );
};

export default CreateModal;
