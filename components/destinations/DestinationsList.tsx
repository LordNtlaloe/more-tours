"use client";
import React, { useState, useEffect } from "react";
import { getAllDestinations } from "@/app/_actions/_destinationActions";
import Image from "next/image";
import Link from "next/link";

// Define a type for the destination object
interface Destination {
    image: string;
    name: string;
    discount: string;
}

export default function DestinationsList() {
    const [destinationsList, setDestinationsList] = useState<Destination[]>([]);

    useEffect(() => {
        getDestinationsList();
    }, []);

    const getDestinationsList = async () => {
        const destinations: Destination[] = await getAllDestinations();
        setDestinationsList(destinations);
    };

    return (
        <div className="container-xxl py-5 destination">
            <div className="container mx-auto sm:px-4">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <div className="text-center mb-8" data-wow-delay="0.1s">
                        <h6 className="text-blue-500 text-lg uppercase tracking-wide mb-2">Destinations</h6>
                        <h1 className="text-4xl font-bold text-gray-800">Our Destinations</h1>
                    </div>
                    <h1 className="mb-5">Popular Destination</h1>
                </div>
                <div className="flex flex-wrap g-3">
                    <div className="lg:w-3/5 pr-4 pl-4 md:w-1/2">
                        <div className="flex flex-wrap g-3">
                            {destinationsList.slice(0, 3).map((destination, index) => (
                                <div
                                    key={index}
                                    className={`${index === 0 ? "lg:w-full" : "lg:w-1/2"
                                        } pr-4 pl-4 md:w-full wow zoomIn`}
                                    data-wow-delay={`${index * 0.2 + 0.1}s`}
                                >
                                    <Link className="relative block overflow-hidden" href="">
                                        <Image
                                            className="max-w-full h-auto"
                                            src={destination.image}
                                            alt={destination.name}
                                            width={500}
                                            height={300}
                                        />
                                        <div className="bg-white text-red-600 fw-bold absolute top-0 start-0 m-6 py-1 px-2">
                                            {destination.discount || "30% OFF"}
                                        </div>
                                        <div className="bg-white text-blue-600 fw-bold absolute bottom-0 end-0 m-6 py-1 px-2">
                                            {destination.name}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="lg:w-2/5 pr-4 pl-4 md:w-1/2 wow zoomIn"
                        data-wow-delay="0.7s"
                        style={{ minHeight: "350px" }}
                    >
                        {destinationsList[3] && (
                            <Link className="relative block h-full overflow-hidden" href="">
                                <Image
                                    className="max-w-full absolute w-full h-full"
                                    src={destinationsList[3].image}
                                    alt={destinationsList[3].name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className="bg-white text-red-600 fw-bold absolute top-0 start-0 m-6 py-1 px-2">
                                    {destinationsList[3].discount || "20% OFF"}
                                </div>
                                <div className="bg-white text-blue-600 fw-bold absolute bottom-0 end-0 m-6 py-1 px-2">
                                    {destinationsList[3].name}
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
