"use client";

import { getTourById } from "@/app/_actions/_tourActions";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SimilarTours from "./SimilarTours";
import BookTourButton from "./BookTourButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import TourRatings from "./TourRatings";
import DisplayRatings from "./DisplayRatings";
import TourBookingForm from "../booking/TourBookingForm";

const TourInfo = ({ id }: { id: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tour, setTour] = useState<any>({});

  useEffect(() => {
    setIsLoaded(true);
    if (id) {
      getTour();
    }
  }, [id]);

  const getTour = async () => {
    const tourById = await getTourById(id);
    console.log("Tour Data:", tourById);
    setTour(tourById);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <section className="mt-10 px-4 md:px-16 lg:px-24 xl:px-32 py-10 bg-gray-50">
      {tour?.id ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20">
          {/* Left Section */}
          <div className="relative flex flex-col-reverse p-4 rounded-lg bg-gradient-to-t from-gray-800 to-transparent sm:p-0 lg:row-start-1 lg:bg-white shadow-lg">
            <h1 className="mt-2 text-xl font-semibold text-white sm:text-gray-900 md:text-3xl">
              {tour.title}
            </h1>
            <p className="text-sm leading-4 font-medium text-white sm:text-gray-500 dark:sm:text-gray-400">
              {tour.category?.name} - {tour.destination?.name}
            </p>
          </div>

          {/* Image Section */}
          <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:grid-cols-4 lg:gap-6 lg:col-start-1 lg:row-start-1">
            <div className="w-full h-60 sm:col-span-2 lg:h-72 lg:col-span-full">
              <Image
                src={tour.image}
                width={800}
                height={400}
                alt="Tour Image"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Ratings Section */}
          <dl className="mt-4 flex items-center text-xs font-medium">
            <dt className="sr-only">Reviews</dt>
            <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
              <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className="mr-1 stroke-current dark:stroke-indigo-500"
              >
                <path
                  d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                4.89 <span className="text-gray-400 font-normal">(128)</span>
              </span>
            </dd>
            <dt className="sr-only">Location</dt>
            <dd className="flex items-center">
              <svg width="2" height="2" fill="currentColor" className="mx-3 text-gray-300">
                <circle cx="1" cy="1" r="1" />
              </svg>
              <MapPin className="text-gray-400" />
              {tour.destination?.name}
            </dd>
          </dl>

          {/* Description Section */}
          <div className="mt-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 border-b pb-2">
              About the Tour
            </h1>
            <p className="text-gray-700 leading-relaxed text-base">{tour.description}</p>
          </div>

          {/* Booking Section */}
          <div className="mt-8 lg:mt-10">
            <Sheet>
              <SheetTrigger className="w-full">
                <BookTourButton tour={tour} />
              </SheetTrigger>
              <SheetContent className="bg-white rounded-lg shadow-lg p-6">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold text-center">
                    Book Your Tour
                  </SheetTitle>
                  <SheetDescription className="text-center mt-2 text-gray-600">
                    Select a date and time to proceed with the booking
                  </SheetDescription>
                </SheetHeader>
                <TourBookingForm
                  id={tour.id}
                  tourPrice={tour.price}
                  tourName={tour.title}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Similar Tours Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Similar Tours</h2>
            <SimilarTours categoryName={tour.category} />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl">Loading...</div>
      )}
    </section>
  );
};

export default TourInfo;
