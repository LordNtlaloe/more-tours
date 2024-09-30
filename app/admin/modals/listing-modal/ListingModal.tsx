"use client";
import React, { useEffect, useState } from 'react';
import ModalLayout from '../../layout/ModalLayout';
import Input from '@/components/general/Input';
import Select from '@/components/general/Select';
import { optionLocations, optionTypes } from '@/data/data';
import Button from '@/components/general/Button';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getListingById } from '@/app/(pages)/details/[id]/service';
import { updateListing } from '../../(pages)/listings/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { postImages } from './service';

interface ListingModalProps {
    handleHideModal: () => void;
    listingId: string;
}

interface FormData {
    name: string;
    desc: string;
    location: string;
    type: string;
    pricePerNight: number;
    beds: number;
    hasFreeWifi: boolean;
    imageUrls?: string[];
}

const ListingModal: React.FC<ListingModalProps> = ({ handleHideModal, listingId }) => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;

    const [images, setImages] = useState<File[]>([]);
    const router = useRouter();

    const { data: listing } = useQuery({
        queryFn: () => getListingById(listingId),
        queryKey: ["admin", "listings", { listingId }]
    });

    const { mutateAsync, isPending: isPendingMutation } = useMutation({
        mutationFn: ({ listingId, body }: { listingId: string; body: FormData }) =>
            updateListing({ listingId, body }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (Object.keys(errors)?.length > 0) {
            Object.keys(errors).map((key) => {
                toast.error(errors[key as keyof FormData]?.message as string);
            });
        }
    }, [errors]);

    useEffect(() => {
        reset({ ...listing });
    }, [
        listing?.name,
        listing?.desc,
        listing?.beds,
        listing?.type,
        listing?.hasFreeWifi,
        listing?.location,
        listing?.pricePerNight,
    ]);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages((prev) => [...prev, e.target.files![0]]);
        }
    };

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
        }
    };

    const onSubmit = async (data: FormData) => {
        const imageUrls = await Promise.all(
            images.map((image, idx) => uploadImage(image, idx))
        );
    
        // Filter out undefined values
        const filteredImageUrls = imageUrls.filter((url): url is string => url !== undefined);
    
        const body: FormData = { ...data };
        if (filteredImageUrls.length > 0) {
            body.imageUrls = filteredImageUrls;
        } else if (listing?.imageUrls) {
            body.imageUrls = listing.imageUrls;
        }
    
        const updatedListing = await mutateAsync({ listingId, body });
        toast.success("Redirecting to listing...");
        router.push(`/details/${updatedListing.id}`);
    };
    

    return (
        <ModalLayout document="listing" handleHideModal={handleHideModal}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full px-4 py-6 flex flex-col items-center gap-8"
            >
                <Input
                    className="w-[300px] px-2 py-3 rounded-xl"
                    type="text"
                    placeholder="Grand Hotel"
                    register={register("name")}
                />
                <Input
                    className="w-[300px] px-2 py-3 rounded-xl"
                    type="text"
                    placeholder="The hotel was great..."
                    register={register("desc")}
                />
                <Select register={register("location")} data={optionLocations} />
                <Select register={register("type")} data={optionTypes} />
                <Input
                    className="w-[300px] px-2 py-3 rounded-xl"
                    type="number"
                    placeholder="$249.00"
                    register={register("pricePerNight", { valueAsNumber: true })}
                    step={0.01}
                />
                <Input
                    className="w-[300px] px-2 py-3 rounded-xl"
                    type="number"
                    register={register("beds", { valueAsNumber: true })} placeholder={''}                />
                <div className="text-slate-400 rounded-md ml-4 w-2/3 flex gap-4">
                    <label htmlFor="freeWifi">Free Wifi</label>
                    <Input
                        className="h-4 w-4"
                        type="checkbox"
                        register={register("hasFreeWifi")}
                        id="freeWifi" placeholder={''}                    />
                </div>
                <label className="text-slate-400 rounded-md w-2/3 ml-4" htmlFor="images">
                    Upload Images
                </label>
                <input type="file" onChange={handleImage} style={{ display: "none" }} id="images" />
                <Button disabled={isPendingMutation} label="Submit" />
            </form>
        </ModalLayout>
    );
};

export default ListingModal;
