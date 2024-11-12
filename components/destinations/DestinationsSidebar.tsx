"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DestinationsSidebar({ destinations }: { destinations: any }) {
    const [selectedItem, setSelectedItem] = useState("");
    const params = useParams()

    useEffect(() => {
        setSelectedItem(params.name as string)
    }, [])

    return (
        <div>
            <div>
                <Link
                    href={"/destination/all"}
                    className="font-bold text-center flex justify-center"
                >
                    <h1
                        className={`destination_sidebar_menu w-full flex items-center justify-center ${selectedItem === "all"
                                ? " md:bg-blue-100 bg-blue-900 shadow-md shadow-sky-300"
                                : ""
                            }`}
                        onClick={() => setSelectedItem("all")}
                    >
                        ALL
                    </h1>
                </Link>
                {destinations?.map((destination: any) => (
                    <Link
                        href={"/destination/" + destination.name}
                        key={destination.id}
                        className={`destination_sidebar_menu ${selectedItem === destination.name
                                ? " md:bg-blue-100 bg-blue-900 shadow-md shadow-sky-400"
                                : ""
                            }`}
                        onClick={() => setSelectedItem(destination.name)}
                    >
                        <Image src={destination.icon} alt="icon" width={30} height={30} />
                        {destination.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
