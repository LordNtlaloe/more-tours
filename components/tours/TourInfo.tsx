"use client";

import { getTourById } from "@/app/_actions/_tourActions";
import { MapPin, } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SimilarTours from "./SimilarTours";
import BookTourButton from "./BookTourButton";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import TourBookingForm from "../booking/TourBookingForm";
import TourRatings from "./TourRatings";
import DisplayRatings from "./DisplayRatings"


export default function TourInfo({ id }: { id: string }) {
    const [isLoded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        id && getTour();
    }, []);

    const [tour, setTour] = useState<any>({});
    const getTour = async () => {
        const tourById = await getTourById(id);
        setTour(tourById);
    };


    if (!isLoded) return null



    return (
        <section className="mt-3 p-1 md:p-6 mx-2 md:grid md:grid-cols-3">
            {tour ? (
                <div className="flex gap-4 flex-col col-span-2">
                    <div className="flex">
                        <div>
                            <Image
                                src={'/image_placeholder.jpg'}
                                width={150}
                                height={200}
                                alt="Image"
                                className="rounded-[10px] h-[150px] w-[100px] object-cover mr-2"
                            />
                        </div>
                        <div className="flex flex-col  gap-2 border p-2 pr-6 ml-1 ">
                            <h2 className="bg-primary  p-1 px-3 font-bold">
                                {tour?.category}
                            </h2>
                            <h2 className="md:text-[40px] font-bold text-[20px]">
                                {tour?.tourName}
                            </h2>
                            <h2 className="text-gray-500 flex gap-2 text-sm md:text-base">
                                <MapPin className="text-red-500 shrink-0" />
                                {tour.tourAddress}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <TourRatings isReadOnly={false} isEnabled={true} tour={tour} />
                    </div>
                    <div className="mt-5">
                        <h1 className="text-xl md:text-3xl font-bold mb-3 border-b pb-3">
                            Tour Details
                        </h1>
                        {tour.tourDetails}
                    </div>
                    <DisplayRatings tourId={tour._id} />
                </div>

            ) : (
                "Loading..."
            )}
            <div className="md:border-l md:p-2 mt-4 md:mt-0 borsder-t">
                <div className="hidden md:flex w-full">
                </div>
                <Sheet>
                    <SheetTrigger className="w-full my-3">
                        <BookTourButton tour={tour} />
                    </SheetTrigger>
                    <SheetContent className="bg-white overflow-auto">
                        <SheetHeader>
                            <SheetTitle className="bg-primary/30 p-3 text-center mt-8">Select Date and Time to book Service With Supplier</SheetTitle>
                            <SheetDescription>
                                <TourBookingForm id={tour.id} tourPrice={tour.price} tourName={tour.name} />
                            </SheetDescription>
                        </SheetHeader>

                    </SheetContent>
                </Sheet>
                <div className="mt-4">
                    <h1 className="font-bold text-lg md:text-xl pb-2 border-t mt-6">
                        Similar Tours
                    </h1>
                    <SimilarTours categoryName={tour?.category} />
                </div>
            </div>
        </section>
    )
}
