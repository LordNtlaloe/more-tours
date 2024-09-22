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
        <div className="container-xxl py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h6 className="text-blue-500 text-lg uppercase tracking-wide mb-2">Destinations</h6>
                    <h1 className="text-4xl font-bold text-gray-800">Our Destinations</h1>
                    <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
                </div>
                <div className="flex flex-wrap -mx-4">
                    <div className="lg:w-3/5 px-4 mb-6">
                        <div className="flex flex-wrap -mx-4">
                            {destinationsList.slice(0, 3).map((destination, index) => (
                                <div
                                    key={index}
                                    className={`relative ${index === 0 ? "lg:w-full" : "lg:w-1/2"} px-4 mb-4`}
                                >
                                    <Link href="" className="block overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                        <Image
                                            className="w-full h-60 object-cover"
                                            src={destination.image}
                                            alt={destination.name}
                                            width={500}
                                            height={300}
                                        />
                                        <div className="bg-white text-red-600 font-bold absolute top-0 left-0 m-6 py-1 px-2 rounded">
                                            {destination.discount || "30% OFF"}
                                        </div>
                                        <div className="bg-white text-blue-600 font-bold absolute bottom-0 right-0 m-6 py-1 px-2 rounded">
                                            {destination.name}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-2/5 px-4 mb-6">
                        {destinationsList[3] && (
                            <Link href="" className="relative block h-full overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                <Image
                                    className="w-full h-60 object-cover"
                                    src={destinationsList[3].image}
                                    alt={destinationsList[3].name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className="bg-white text-red-600 font-bold absolute top-0 left-0 m-6 py-1 px-2 rounded">
                                    {destinationsList[3].discount || "20% OFF"}
                                </div>
                                <div className="bg-white text-blue-600 font-bold absolute bottom-0 right-0 m-6 py-1 px-2 rounded">
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
