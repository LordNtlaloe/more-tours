import React, { useState, useEffect } from 'react'
import { getAllToursByCategory } from '@/app/_actions/_tourActions'
import { BeatLoader } from "react-spinners";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import Link from "next/link";
import Image from 'next/image';

export default function SimilarTours(category: any) {
    const [tours, setTours] = useState<any>([]);

    useEffect(() => {
        getSimilarTours()
    }, [category])

    const getSimilarTours = async () => {
        const tours = await getAllToursByCategory(category.name);
        setTours(tours);
    }

    return (
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-col ">
            {tours.length > 0 ? (
                tours?.map((tour: any) => (
                    <Link href={"/tour/" + tour.id} key={tour.id}>
                        <div className=" p-2 hover:border hover:shadow-md hover:shadow-sky-400 cursor-pointer hover:scale-105 transition-all">
                            <div className="md:flex  gap-2">
                                <Image
                                    src={tour.image}
                                    height={80}
                                    width={80}
                                    alt="Image"
                                    className="rounded-[5px] object-cover"
                                />
                                <div>
                                    <h2 className="font-bold">{tour.title}</h2>
                                    <h2 className="text-sm text-gray-400">
                                        {tour.description}
                                    </h2>
                                    <h2 className="text-xs text-gray-400 font-bold">
                                        {tour.category.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div>
                    <LoadingSpinner />
                </div>
            )}
        </div>

    )
}
